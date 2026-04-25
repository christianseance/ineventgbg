import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Blocked file extensions — executables, scripts, installers
const BLOCKED_EXTENSIONS = [
  "exe", "bat", "cmd", "com", "msi", "scr", "pif", "vbs", "vbe", "js", "jse",
  "wsf", "wsh", "ps1", "psm1", "sh", "bash", "zsh", "app", "dmg", "deb", "rpm",
  "apk", "jar", "war", "ear", "dll", "so", "dylib", "lnk", "reg", "hta",
];

// Allowed MIME types — common docs, images, archives
const ALLOWED_MIME_PREFIXES = [
  "image/",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/x-zip-compressed",
];

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

const attachmentSchema = z
  .object({
    name: z.string().min(1).max(255),
    mime: z.string().min(1).max(150),
    size: z.number().int().min(1).max(MAX_FILE_BYTES),
    base64: z.string().min(1).max(Math.ceil((MAX_FILE_BYTES * 4) / 3) + 1024),
  })
  .nullable()
  .optional();

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
  attachment: attachmentSchema,
});

function isBlockedFilename(name: string): boolean {
  const lower = name.toLowerCase();
  // Check all extensions in case of double-extension tricks like "file.pdf.exe"
  const parts = lower.split(".");
  if (parts.length < 2) return false;
  return parts.slice(1).some((ext) => BLOCKED_EXTENSIONS.includes(ext));
}

function isAllowedMime(mime: string): boolean {
  const lower = mime.toLowerCase();
  return ALLOWED_MIME_PREFIXES.some((p) => lower.startsWith(p));
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
}

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

    // Handle attachment upload (if any)
    let attachmentPath: string | null = null;
    let attachmentName: string | null = null;
    let attachmentSize: number | null = null;
    let attachmentMime: string | null = null;

    if (data.attachment) {
      const a = data.attachment;
      if (isBlockedFilename(a.name)) {
        return { ok: false as const, error: "Filtypen är inte tillåten." };
      }
      if (!isAllowedMime(a.mime)) {
        return { ok: false as const, error: "Filformatet stöds inte." };
      }

      let bytes: Uint8Array;
      try {
        const binary = atob(a.base64);
        bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      } catch {
        return { ok: false as const, error: "Filen kunde inte läsas." };
      }

      if (bytes.byteLength > MAX_FILE_BYTES) {
        return { ok: false as const, error: "Filen är för stor (max 10 MB)." };
      }

      const safeName = sanitizeFilename(a.name);
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

      const { error: upErr } = await supabaseAdmin.storage
        .from("lead-attachments")
        .upload(path, bytes, { contentType: a.mime, upsert: false });

      if (upErr) {
        console.error("attachment upload error:", upErr);
        return { ok: false as const, error: "Filen kunde inte laddas upp." };
      }

      attachmentPath = path;
      attachmentName = a.name;
      attachmentSize = a.size;
      attachmentMime = a.mime;
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
      attachment_path: attachmentPath,
      attachment_name: attachmentName,
      attachment_size: attachmentSize,
      attachment_mime: attachmentMime,
    });

    if (error) {
      console.error("submitLead insert error:", error);
      // Try to clean up the uploaded file
      if (attachmentPath) {
        await supabaseAdmin.storage.from("lead-attachments").remove([attachmentPath]);
      }
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
