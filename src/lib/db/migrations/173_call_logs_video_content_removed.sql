-- 173: mark call-log rows whose persisted client-request snapshot had its
-- video transcript content structurally redacted (#12150 P2 surface 2).
--
-- Set to 1 by the call-log write path when the video-bridge guardrail observed
-- and rewrote video parts on this request (see videoBridgeObserved in
-- open-sse/handlers/chatCore.ts). resolvePreviousResponseState
-- (src/lib/db/responsesContinuationStore.ts) refuses to rehydrate a row so
-- marked: the stored snapshot carries [redacted-video-transcript] placeholders
-- in place of the client's real cues, so reconstructing a continuation off it
-- would forward the placeholder text upstream as if it were real history.
-- Failing closed makes the client resend full history instead, exactly like a
-- real previous_response_not_found.
--
-- Default 0 (NOT NULL): every existing and non-video row is "nothing removed".

ALTER TABLE call_logs ADD COLUMN video_content_removed INTEGER NOT NULL DEFAULT 0;
