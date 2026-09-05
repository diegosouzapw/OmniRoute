/**
 * grokResetCredits.ts — live read / redeem of Grok reset cards.
 *
 * POST grok.com/prod_mc_billing.ConsumerUiSvc/GetRemainingResets with the
 * grok-cli OAuth bearer. Decode failure / HTTP miss returns null so callers
 * omit bankedResetCredits rather than faking a zero. A decoded empty DATA
 * frame with grpc-status 0 is a real zero and must be returned as count 0.
 *
 * Redeem: POST .../RedeemReset with ConsumerRedeemResetReq.token_id as
 * protobuf field 10 (live X500 2026-09-05: fake field-10 → grpc-status 9
 * "does not exist"; field 1 / empty → grpc-status 3 "Invalid token_id").
 * Token ids stay server-side and are never logged.
 */
import {
  decodeGrokGrpcWebRpc,
  decodeGrokResetCreditsFrame,
  encodeGrpcWebRequest,
  encodeRedeemResetRequest,
  type GrokResetCreditToken,
  type GrokResetCreditsSnapshot,
} from "./grokResetCreditsFrame.ts";

const GROK_RESET_CREDITS_URL =
  "https://grok.com/prod_mc_billing.ConsumerUiSvc/GetRemainingResets";
const GROK_REDEEM_RESET_URL = "https://grok.com/prod_mc_billing.ConsumerUiSvc/RedeemReset";
const GRPC_WEB_EMPTY_REQUEST_FRAME = Buffer.from([0, 0, 0, 0, 0]);
const FETCH_TIMEOUT_MS = 8_000;
const REDEEM_TIMEOUT_MS = 15_000;

export type GrokResetCreditOutcome = "reset" | "alreadyRedeemed";
export type GrokRedeemMappedStatus = GrokResetCreditOutcome | "noCredit";

export class GrokResetCreditError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "GrokResetCreditError";
    this.status = status;
    this.code = code;
  }
}

export type PublicGrokResetCredit = {
  selectionToken: string;
  expiresAt: string | null;
};

function grokRpcHeaders(accessToken: string): Record<string, string> {
  return {
    Authorization: ["Bearer", accessToken].join(" "),
    "Content-Type": "application/grpc-web+proto",
    "X-Grpc-Web": "1",
  };
}

function expirySortValue(expiresAt: string | null): number {
  if (!expiresAt) return Number.POSITIVE_INFINITY;
  const ms = Date.parse(expiresAt);
  return Number.isFinite(ms) ? ms : Number.POSITIVE_INFINITY;
}

function toPublicCredits(tokens: GrokResetCreditToken[]): PublicGrokResetCredit[] {
  return tokens
    .map((token, index) => ({ token, index }))
    .sort(
      (left, right) =>
        expirySortValue(left.token.expiresAt) - expirySortValue(right.token.expiresAt) ||
        left.index - right.index
    )
    .map(({ token }) => ({
      selectionToken: token.tokenId,
      expiresAt: token.expiresAt,
    }));
}

async function postGrokRpc(
  url: string,
  accessToken: string,
  payload: Buffer,
  fetchImpl: typeof fetch,
  timeoutMs: number
): Promise<{ grpcStatus: string; grpcMessage: string | null }> {
  const response = await fetchImpl(url, {
    method: "POST",
    headers: grokRpcHeaders(accessToken),
    body: new Uint8Array(encodeGrpcWebRequest(payload)),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) {
    throw new GrokResetCreditError(
      response.status,
      "grok_reset_credit_upstream_error",
      `Grok reset-credit API returned HTTP ${response.status}.`
    );
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return decodeGrokGrpcWebRpc(
    buffer,
    response.headers.get("grpc-status"),
    response.headers.get("grpc-message")
  );
}

export function mapGrokRedeemGrpcStatus(
  grpcStatus: string,
  grpcMessage: string | null
): GrokRedeemMappedStatus {
  if (grpcStatus === "0") return "reset";
  const message = (grpcMessage ?? "").toLowerCase();
  if (grpcStatus === "9") {
    return message.includes("already") ? "alreadyRedeemed" : "noCredit";
  }
  if (grpcStatus === "3" && message.includes("token_id")) {
    return "noCredit";
  }
  throw new GrokResetCreditError(
    502,
    "unknown_reset_credit_response",
    grpcMessage ? `Grok reset failed: ${grpcMessage}` : `Grok reset failed (grpc-status ${grpcStatus})`
  );
}

function throwMappedRedeemStatus(outcome: GrokRedeemMappedStatus): GrokResetCreditOutcome {
  if (outcome === "noCredit") {
    throw new GrokResetCreditError(409, "no_credit", "No Grok reset credits are available.");
  }
  return outcome;
}

export async function fetchGrokResetCredits(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<GrokResetCreditsSnapshot | null> {
  if (!accessToken) return null;
  try {
    const response = await fetchImpl(GROK_RESET_CREDITS_URL, {
      method: "POST",
      headers: grokRpcHeaders(accessToken),
      body: GRPC_WEB_EMPTY_REQUEST_FRAME,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const decoded = decodeGrokResetCreditsFrame(Buffer.from(await response.arrayBuffer()));
    return decoded.ok ? decoded.snapshot : null;
  } catch {
    return null;
  }
}

async function loadInventory(
  accessToken: string,
  fetchImpl: typeof fetch
): Promise<{ credits: PublicGrokResetCredit[]; availableCount: number }> {
  const response = await fetchImpl(GROK_RESET_CREDITS_URL, {
    method: "POST",
    headers: grokRpcHeaders(accessToken),
    body: GRPC_WEB_EMPTY_REQUEST_FRAME,
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new GrokResetCreditError(
      response.status,
      "grok_reset_credit_upstream_error",
      `Grok remaining-resets returned HTTP ${response.status}.`
    );
  }
  const decoded = decodeGrokResetCreditsFrame(Buffer.from(await response.arrayBuffer()));
  if (!decoded.ok) {
    throw new GrokResetCreditError(502, "grok_reset_credit_decode_failed", "Grok remaining-resets decode failed.");
  }
  const credits = toPublicCredits(decoded.tokens);
  return { credits, availableCount: credits.length };
}

export async function listGrokResetCreditTokens(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<{ credits: PublicGrokResetCredit[]; availableCount: number }> {
  if (!accessToken) {
    throw new GrokResetCreditError(401, "grok_access_token_missing", "Grok OAuth access token is missing.");
  }
  return loadInventory(accessToken, fetchImpl);
}

export async function consumeGrokResetCredit(
  accessToken: string,
  options: { tokenId?: string } = {},
  fetchImpl: typeof fetch = fetch
): Promise<GrokResetCreditOutcome> {
  if (!accessToken) {
    throw new GrokResetCreditError(401, "grok_access_token_missing", "Grok OAuth access token is missing.");
  }

  const requested = options.tokenId?.trim() ?? "";
  let selectedTokenId = requested;
  if (!selectedTokenId) {
    const inventory = await loadInventory(accessToken, fetchImpl);
    selectedTokenId = inventory.credits[0]?.selectionToken ?? "";
  }
  if (!selectedTokenId) {
    throw new GrokResetCreditError(409, "no_credit", "No Grok reset credits are available.");
  }

  const rpc = await postGrokRpc(
    GROK_REDEEM_RESET_URL,
    accessToken,
    encodeRedeemResetRequest(selectedTokenId),
    fetchImpl,
    REDEEM_TIMEOUT_MS
  );
  return throwMappedRedeemStatus(mapGrokRedeemGrpcStatus(rpc.grpcStatus, rpc.grpcMessage));
}
