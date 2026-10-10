/**
 * Flight-ledger charge after handleChat Accept rewrite.
 *
 * tryAcquireFlight only - no queue. Unstamped streaming bodies are 413.
 * Over STREAM_CEILING is 413. Full ledger is 503 flight_bytes_budget.
 *
 * effectiveStream follows chatCore order: Accept rewrite, then explicit
 * stream aliases, then usage-command / compact exemptions, then
 * resolveStreamFlag. Usage commands skip the generic flag so mixed Accept
 * on /v1/messages stays JSON.
 */
import {
  acceptHeaderForcesStream,
  resolveExplicitStreamAlias,
  resolveStreamFlag,
} from "@omniroute/open-sse/utils/aiSdkCompat.ts";
import { isCompactResponsesEndpoint } from "@omniroute/open-sse/executors/codex.ts";
import { shouldUseNativeCodexPassthrough } from "@omniroute/open-sse/handlers/chatCore/passthroughHelpers.ts";
import { detectFormatFromUrl } from "@omniroute/open-sse/services/provider.ts";
import { getTaskRoutingConfig } from "@omniroute/open-sse/services/taskAwareRouter.ts";

import { extractApiKey } from "@/sse/services/auth";
import { resolveRoutingModel } from "@/sse/handlers/resolveRoutingModel";
import { NON_OAUTH_MODEL_PREFIX } from "@/sse/handlers/chatHelpers";
import { extractLastUserText, isInternalUsageCommand } from "@/lib/usage/internalUsageCommand";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { getCachedSettings } from "@/lib/db/readCache";
import {
  extractUngatedClientApiKey,
  resolvePlaygroundTestKey,
} from "@/shared/utils/apiKeyPolicy";

import { estimateFlightBytes } from "./admissionBudget";
import {
  CHAT_HARD_MAX_BODY_BYTES,
  perConnectionAdmissionController,
  type ChatAdmissionController,
  type ChatAdmissionLease,
} from "./chatBodyAdmission";
import { resolveSessionId } from "./chatAdmissionIdentity";
import {
  chatAdmissionRejectionResponse,
  flightBytesBudgetRejectionResponse,
  flightCeilingExceededResponse,
} from "./chatAdmissionResponses";
import { readRecordedBodyBytes } from "./recordedBodyBytes";

let testFlightController: ChatAdmissionController | null = null;

/** Serial-test seam: charge against an injected controller, not the process singleton. */
export function setFlightChargeControllerForTests(
  controller: ChatAdmissionController | null
): void {
  testFlightController = controller;
}

export type FlightChargeAdmissionContext = {
  attachFlightLease(lease: ChatAdmissionLease): void;
};

type ChargeLog = { debug: (tag: string, msg: string) => void };

function overlayExplicitStreamAlias(body: Record<string, unknown>): Record<string, unknown> {
  const alias = resolveExplicitStreamAlias(body);
  if (alias === undefined) return body;
  const next: Record<string, unknown> = { ...body, stream: alias };
  delete next.non_stream;
  delete next.disable_stream;
  delete next.disable_streaming;
  delete next.streaming;
  return next;
}

function requestPathname(request: Request): string {
  try {
    return new URL(request.url, "http://omniroute.local").pathname;
  } catch {
    return "";
  }
}

async function isNativeCodexCompactExempt(
  request: Request,
  body: Record<string, unknown>
): Promise<boolean> {
  const pathname = requestPathname(request);
  if (!isCompactResponsesEndpoint(pathname)) return false;

  const routingModel = resolveRoutingModel(request, body as { model?: string | null });
  if (typeof routingModel !== "string") return false;
  const trimmed = routingModel.trim();
  const slash = trimmed.indexOf("/");
  const provider = (slash === -1 ? trimmed : trimmed.slice(0, slash)).trim();
  if (provider !== "codex" && provider !== "chatgpt-web-codex") return false;
  const remainder = slash === -1 ? "" : trimmed.slice(slash + 1).trim();
  if (remainder === "") return false;
  if (NON_OAUTH_MODEL_PREFIX.test(remainder)) return false;

  try {
    const settings = await getCachedSettings();
    if (settings.stripModelPrefix === true) return false;
  } catch {
    return false;
  }
  if (getTaskRoutingConfig().enabled === true) return false;

  return shouldUseNativeCodexPassthrough({
    provider,
    sourceFormat: detectFormatFromUrl(body, request.url),
    endpointPath: pathname,
    body,
    headers: request.headers,
  });
}

async function resolveEffectiveStream(
  request: Request,
  body: Record<string, unknown>
): Promise<boolean> {
  if (isInternalUsageCommand(extractLastUserText(body))) {
    return body.stream === true;
  }
  if (await isNativeCodexCompactExempt(request, body)) {
    return false;
  }

  const apiKey =
    extractApiKey(request) ||
    extractUngatedClientApiKey(request) ||
    (await resolvePlaygroundTestKey(request));
  let streamDefaultMode: unknown;
  if (apiKey) {
    try {
      streamDefaultMode = (await getApiKeyMetadata(apiKey))?.streamDefaultMode;
    } catch {
      streamDefaultMode = undefined;
    }
  }

  return resolveStreamFlag(body.stream, request.headers.get("accept") || "", detectFormatFromUrl(body, request.url), {
    userAgent: request.headers.get("user-agent"),
    streamDefaultMode,
  });
}

export async function chargeFlightForChat(
  request: Request,
  admissionContext: FlightChargeAdmissionContext,
  effectiveStream: boolean
): Promise<Response | null> {
  const recorded = readRecordedBodyBytes(request);
  if (recorded === null) {
    if (!effectiveStream) return null;
    return chatAdmissionRejectionResponse(413, CHAT_HARD_MAX_BODY_BYTES);
  }

  const sessionId = resolveSessionId(request);
  const controller =
    testFlightController ?? perConnectionAdmissionController.getController(sessionId);
  const charge = estimateFlightBytes(recorded, effectiveStream, controller.maxFlightBytes);
  if (charge === Number.POSITIVE_INFINITY) {
    return flightCeilingExceededResponse();
  }
  if (charge === 0) return null;

  const lease = controller.tryAcquireFlight(charge);
  if (!lease) {
    controller.recordShed("flight_bytes_budget", sessionId);
    return flightBytesBudgetRejectionResponse(controller.retryAfterSeconds(0));
  }
  admissionContext.attachFlightLease(lease);
  return null;
}

export async function applyAcceptStreamAndChargeFlight(
  request: Request,
  body: Record<string, unknown>,
  admissionContext: FlightChargeAdmissionContext,
  log?: ChargeLog
): Promise<{ body: Record<string, unknown>; rejection: Response | null }> {
  const acceptHeader = request.headers.get("accept") || "";
  let nextBody = body;
  if (acceptHeaderForcesStream(acceptHeader, body.stream)) {
    nextBody = { ...body, stream: true };
    log?.debug(
      "STREAM",
      "Accept: text/event-stream header -> overriding stream=true (body had no stream field)"
    );
  }
  nextBody = overlayExplicitStreamAlias(nextBody);
  const effectiveStream = await resolveEffectiveStream(request, nextBody);
  return {
    body: nextBody,
    rejection: await chargeFlightForChat(request, admissionContext, effectiveStream),
  };
}
