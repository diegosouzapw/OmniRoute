/**
 * Veo video generation via Google Flow (labs.google/flow) — request orchestration.
 *
 * ⚠️ #10285 — DISABLED pending a viable transport (Hard Rule #18). Live probes
 * against https://aisandbox-pa.googleapis.com confirmed two independent wire-surface
 * defects the #4769 PENDING LIVE VALIDATION flag anticipated: (1) the submit/poll
 * paths in googleFlow.ts (`GOOGLE_FLOW_SUBMIT_PATH`/`GOOGLE_FLOW_POLL_PATH`) 404 —
 * the real working endpoint is undocumented (`POST /v1/video:batchAsyncGenerateVideoText`);
 * (2) even on that working endpoint, the stored Cloud Code OAuth bearer is rejected
 * (401 UNAUTHENTICATED — the cclog/cloud-platform scopes do not grant aisandbox-pa).
 * gflow-cli's own docs confirm only a headed-browser reCAPTCHA session works for
 * mutation endpoints, which cannot run headlessly. Until a viable server-side
 * transport is found and live-validated, fail fast with a clear diagnostic instead
 * of forwarding to the known-wrong path and surfacing a raw HTML 404. The pure
 * transformation helpers (googleFlow.ts) remain fully unit-tested
 * (google-flow-video-4569.test.ts) for whenever the wire surface is fixed and this
 * handler is restored to actually submit/poll.
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { getVideoProvider } from "../../config/videoRegistry.ts";

const FALLBACK_UNSUPPORTED_REASON =
  "Google Flow video generation requires a browser-session transport and is not " +
  "supported over the stored OAuth bearer.";

interface GoogleFlowHandlerArgs {
  model: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null;
  log?: { info?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void };
}

export async function handleGoogleFlowVideoGeneration(
  _args: GoogleFlowHandlerArgs
): Promise<{ success: false; status: number; error: string }> {
  // #10285 — fail fast: the submit/poll wire surface is live-confirmed broken and no
  // server-side credential transport can satisfy the working endpoint (see the module
  // doc above). Do not forward to the known-wrong path / surface a raw HTML 404.
  return {
    success: false,
    status: 501,
    error: sanitizeErrorMessage(
      getVideoProvider("googleflow")?.unsupportedReason || FALLBACK_UNSUPPORTED_REASON
    ),
  };
}
