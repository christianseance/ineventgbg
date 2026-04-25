-- Add attachment column to leads
ALTER TABLE public.leads
  ADD COLUMN attachment_path text,
  ADD COLUMN attachment_name text,
  ADD COLUMN attachment_size integer,
  ADD COLUMN attachment_mime text;

-- Create private bucket for lead attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('lead-attachments', 'lead-attachments', false, 10485760)
ON CONFLICT (id) DO NOTHING;

-- No public read; admin (service role) bypasses RLS automatically.
-- Block all anon/authenticated access to objects in this bucket explicitly.
CREATE POLICY "Deny client reads on lead-attachments"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny client writes on lead-attachments"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (false);