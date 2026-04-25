-- Length and sanity constraints on leads
ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT leads_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT leads_phone_len CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT leads_event_type_len CHECK (event_type IS NULL OR char_length(event_type) <= 100),
  ADD CONSTRAINT leads_location_len CHECK (location IS NULL OR char_length(location) <= 150),
  ADD CONSTRAINT leads_message_len CHECK (char_length(message) BETWEEN 10 AND 2000),
  ADD CONSTRAINT leads_guest_count_range CHECK (guest_count IS NULL OR (guest_count >= 0 AND guest_count <= 100000));

-- Newsletter constraints + dedupe
ALTER TABLE public.newsletter_subscribers
  ADD CONSTRAINT newsletter_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT newsletter_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_unique
  ON public.newsletter_subscribers (lower(email));