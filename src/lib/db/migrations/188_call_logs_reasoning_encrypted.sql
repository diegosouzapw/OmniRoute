-- Encrypted-reasoning observability: record that reasoning happened, how
-- long it took, and which effort was requested — on Responses API upstreams
-- that encrypt their reasoning (opaque item, no readable summary). Today such
-- rows store NULL reasoning_source/reasoning_chars/tokens_reasoning.
--
-- reasoning_source gains 'encrypted' (extends the 116 inventory below).
-- Duration and efforts live in the new nullable columns; readers stay intact.
-- NEVER store encrypted_content/signature/data — presence flag, duration and
-- effort VALUES only.
--   reasoning_source: NULL | 'usage' | 'content' | 'think' | 'encrypted'
--   reasoning_duration_ms    : NULL when unknown (e.g. non-streaming, cut stream),
--                              else wall-clock added→done delta in ms (sum over items)
--   reasoning_effort_requested: NULL when absent, else client effort value verbatim
--   reasoning_effort_upstream : NULL when absent/stripped, else effort actually sent
--   reasoning_encrypted       : NULL unknown/pre-migration, else 1 when an opaque
--                              reasoning item was seen (never 0: NULL by default,
--                              strict additive)
ALTER TABLE call_logs ADD COLUMN reasoning_duration_ms INTEGER DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN reasoning_effort_requested TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN reasoning_effort_upstream TEXT DEFAULT NULL;
ALTER TABLE call_logs ADD COLUMN reasoning_encrypted INTEGER DEFAULT NULL;
