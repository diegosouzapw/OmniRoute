-- 154_call_logs_response_id.sql
-- Index a completed OpenAI Responses API call by the response id it returned
-- to the client (real upstream id, or OmniRoute's own synthesized `resp_`
-- id — see normalizeResponsesId in open-sse/handlers/responseSanitizer.ts).
-- Lets a later request's `previous_response_id` resolve back to this row's
-- already-captured call-log artifact (full, untruncated request/response
-- pipeline payloads) instead of duplicating conversation content into a
-- second store. See src/lib/db/responsesContinuationStore.ts.

ALTER TABLE call_logs ADD COLUMN response_id TEXT DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_cl_response_id ON call_logs(response_id);
