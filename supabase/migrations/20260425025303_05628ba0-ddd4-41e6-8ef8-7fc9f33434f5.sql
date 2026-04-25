-- Explicitly deny SELECT access to leads via the client API.
-- Lead data (name, email, phone, message) is PII and must not be readable
-- by anonymous or authenticated users. Backend/admin access happens through
-- the Cloud dashboard using the service role, which bypasses RLS.
CREATE POLICY "Deny all client reads on leads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (false);

-- Same protection for newsletter subscribers (email is PII).
CREATE POLICY "Deny all client reads on newsletter_subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO anon, authenticated
USING (false);