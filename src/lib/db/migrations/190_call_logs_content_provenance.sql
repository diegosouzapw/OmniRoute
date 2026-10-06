-- Per-request rendered-content presence plus usage provenance (additive, nullable).
-- Additive and nullable; readers stay intact.
--
-- has_content: NULL when unknown (pre-migration, non-2xx, logging disabled,
-- or non-text output), else 1 when client-visible content was rendered,
-- else 0 for an empty success. NULL is never a "no content" claim.
-- usage_provenance: NULL when unknown (pre-migration, non-2xx), else
-- 'reported' (provider metering), 'estimated' (local estimate), 'absent'.
ALTER TABLE call_logs ADD COLUMN has_content INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN usage_provenance TEXT DEFAULT NULL;
