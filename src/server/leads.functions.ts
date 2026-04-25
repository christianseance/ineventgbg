import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Server-side schema (mirrors client + extra hardening)
const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  event_type: z.string().trim().max(100).optional().or(z.literal("")),
  event_date: z.string().trim().max(20).optional().or(z.literal("")),
  guest_count: z.string().trim().max(10).optional().or(z.literal("")),
  location: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  newsletter_opt_in: z.boolean(),
  // Honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

// Simple in-memory rate limiter (per worker instance)
// 5 submissions per IP per 10 min — good enough as a first line; CAPTCHA can be added later.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  // Opportunistic cleanup
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const fresh = v.filter((t) => now - t < WINDOW_MS);
      if (fresh.length === 0) ipHits.delete(k);
      else ipHits.set(k, fresh);
    }
  }
  return false;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    // Reject honeypot hits silently (pretend success)
    if (data.website && data.website.length > 0) {
      return { ok: true as const };
    }

    const ip =
      getRequestIP({ xForwardedFor: true }) ??
      getRequestHeader("cf-connecting-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return {
        ok: false as const,
        error: "För många förfrågningar. Försök igen om en stund.",
      };
    }

    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      event_type: data.event_type || null,
      event_date: data.event_date || null,
      guest_count: data.guest_count ? Number(data.guest_count) : null,
      location: data.location || null,
      message: data.message,
      newsletter_opt_in: data.newsletter_opt_in,
    });

    if (error) {
      console.error("submitLead insert error:", error);
      return { ok: false as const, error: "Kunde inte skicka. Försök igen." };
    }

    if (data.newsletter_opt_in) {
      // Best-effort; ignore unique conflict
      const { error: nlErr } = await supabaseAdmin
        .from("newsletter_subscribers")
        .insert({ email: data.email, source: "contact_form" });
      if (nlErr && !/duplicate|unique/i.test(nlErr.message)) {
        console.warn("newsletter insert warning:", nlErr.message);
      }
    }

    return { ok: true as const };
  });
