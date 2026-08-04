/**
 * Veo video generation via Google Flow (labs.google/flow) — request orchestration.
 *
 * Uses the Google account OAuth bearer + Cloud Code projectId that the Antigravity
 * provider already establishes — no separate OAuth flow is added. Submits the
 * documented Veo `predictLongRunning` body to Google's AI Sandbox endpoint, polls
 * the long-running operation, and returns the MP4 (base64 or URL).
 *
 * ⚠️ PENDING LIVE VALIDATION (Hard Rule #18): the AI-Sandbox host/path and the
 * Cloud-Code request envelope cannot be unit-tested — they require a real Google
 * Flow account + a captured HAR. The wire surface is isolated to the two path
 * constants (`GOOGLE_FLOW_SUBMIT_PATH`/`GOOGLE_FLOW_POLL_PATH`) and the `project`
 * wrap below, so confirming a captured HAR is a one-line change. The pure
 * transformation helpers are fully unit-tested (google-flow-video-4569.test.ts).
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  GOOGLE_FLOW_POLL_PATH,
  GOOGLE_FLOW_SUBMIT_PATH,
  buildGoogleFlowSubmitBody,
  normalizeFlowVideoParams,
  parseFlowOperationName,
  parseFlowOperationResult,
  resolveFlowAccessToken,
  resolveFlowProjectId,
} from "./googleFlow.ts";

interface GoogleFlowHandlerArgs {
  model: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null;
  log?: { info?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void };
}

const POLL_INTERVAL_MS = 10_000;
const MAX_WAIT_MS = 5 * 60 * 1000;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function handleGoogleFlowVideoGeneration({
  model,
  providerConfig,
  body,
  credentials,
  log,
}: GoogleFlowHandlerArgs) {
  const token = resolveFlowAccessToken(credentials);
  if (!token) {
    return {
      success: false,
      status: 401,
      error:
        "Missing Google OAuth token for Google Flow. Connect a Google account in Providers (the Antigravity/Cloud Code connection) first.",
    };
  }

  const projectId = resolveFlowProjectId(credentials);
  if (!projectId) {
    return {
      success: false,
      status: 400,
      error:
        "Missing Google projectId for Google Flow. Please reconnect OAuth in Providers so OmniRoute can fetch your Cloud Code project.",
    };
  }

  const params = normalizeFlowVideoParams(body);
  const submitBody = buildGoogleFlowSubmitBody(params);
  // PENDING LIVE VALIDATION: Cloud-Code envelope wraps the Veo body with `project`/`model`.
  const wireBody = { ...submitBody, project: projectId, model };

  const baseUrl = providerConfig.baseUrl.replace(/\/$/, "");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    log?.info?.(
      "VIDEO",
      `googleflow/${model} (veo) | submitting | aspect: ${params.aspectRatio ?? "default"}`
    );
    const submitRes = await fetch(`${baseUrl}${GOOGLE_FLOW_SUBMIT_PATH}`, {
      method: "POST",
      headers,
      body: JSON.stringify(wireBody),
    });
    if (!submitRes.ok) {
      const errorText = await submitRes.text();
      return {
        success: false,
        status: submitRes.status,
        error: sanitizeErrorMessage(`Google Flow submit failed: ${errorText.slice(0, 300)}`),
      };
    }

    const operationName = parseFlowOperationName(await submitRes.json());
    if (!operationName) {
      return { success: false, status: 502, error: "Google Flow did not return an operation name" };
    }

    const deadline = Date.now() + MAX_WAIT_MS;
    while (Date.now() < deadline) {
      await sleep(POLL_INTERVAL_MS);
      const pollRes = await fetch(`${baseUrl}${GOOGLE_FLOW_POLL_PATH}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ operationName }),
      });
      if (!pollRes.ok) {
        const errorText = await pollRes.text();
        return {
          success: false,
          status: pollRes.status,
          error: sanitizeErrorMessage(`Google Flow poll failed: ${errorText.slice(0, 300)}`),
        };
      }

      const result = parseFlowOperationResult(await pollRes.json());
      if (!result.done) continue;
      if (result.error) {
        return { success: false, status: 502, error: sanitizeErrorMessage(result.error) };
      }
      const item = result.base64
        ? { b64_json: result.base64, format: result.format }
        : { url: result.url, format: result.format };
      return {
        success: true,
        data: { created: Math.floor(Date.now() / 1000), data: [item] },
      };
    }

    return { success: false, status: 504, error: "Google Flow video generation timed out" };
  } catch (err) {
    const e = (err ?? {}) as { message?: string; status?: number };
    log?.error?.("VIDEO", `Google Flow generation failed: ${e.message}`);
    return {
      success: false,
      status: typeof e.status === "number" ? e.status : 502,
      error: sanitizeErrorMessage(e.message || "Google Flow generation failed"),
    };
  }
}
