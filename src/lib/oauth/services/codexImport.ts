/**
 * Codex (OpenAI) bulk-import normalization
 *
 * Accepts the JSON shape produced by Codex CLI / common token-export tools and
 * returns a {@link createProviderConnection} payload (or a typed error).
 *
 * Pure: no I/O, no network. Safe to unit-test.
 *
 * Ported from decolua/9router#1257 (beaaan).
 */

const REQUIRED_FIELDS = ["access_token", "refresh_token"] as const;

/** 10 days — the typical OpenAI access-token lifetime when no `expired` is supplied. */
const DEFAULT_EXPIRY_MS = 10 * 24 * 60 * 60 * 1000;

const BASE64_BLOCK_SIZE = 4;

// ── Types ─────────────────────────────────────────────────────────────────────

export type CodexImportPayload = {
  provider: "codex";
  authType: "oauth";
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  email: string;
  expiresAt: string;
  testStatus: "active";
  providerSpecificData?: {
    chatgptAccountId?: string;
    chatgptPlanType?: string;
  };
};

export type NormalizeOk = { ok: true; payload: CodexImportPayload };
export type NormalizeErr = { ok: false; error: string };
export type NormalizeResult = NormalizeOk | NormalizeErr;

export type FlattenOk = { ok: true; records: unknown[] };
export type FlattenErr = { ok: false; error: string };
export type FlattenResult = FlattenOk | FlattenErr;

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * Decode a JWT payload to a plain object (no signature verification).
 *
 * Mirrors the helper in `providers.ts` but is kept local so this module has no
 * runtime dependency on the larger OAuth module graph.
 */
function decodeJwtPayload(jwt: unknown): Record<string, unknown> | null {
  try {
    if (!jwt || typeof jwt !== "string") return null;
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const missingPadding =
      (BASE64_BLOCK_SIZE - (base64.length % BASE64_BLOCK_SIZE)) % BASE64_BLOCK_SIZE;
    const padded = base64 + "=".repeat(missingPadding);
    return JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

/**
 * Decode a Codex JWT (id_token, or a bare ChatGPT access token — both carry
 * the same `https://api.openai.com/auth` custom claim) into account info.
 *
 * Exported so other Codex import paths (e.g. the bare-access-token import at
 * `/api/oauth/codex/import-token`, #1290) can reuse this decode logic instead
 * of duplicating an inline JWT decode.
 */
export function extractCodexAccountInfo(idToken: string): {
  email?: string;
  chatgptAccountId?: string;
  chatgptPlanType?: string;
} {
  const payload = decodeJwtPayload(idToken);
  if (!payload) return {};
  const chatgpt =
    (payload["https://api.openai.com/auth"] as Record<string, unknown>) || {};
  return {
    email: typeof payload.email === "string" ? payload.email : undefined,
    chatgptAccountId:
      typeof chatgpt.chatgpt_account_id === "string"
        ? chatgpt.chatgpt_account_id
        : undefined,
    chatgptPlanType:
      typeof chatgpt.chatgpt_plan_type === "string"
        ? chatgpt.chatgpt_plan_type
        : undefined,
  };
}

function pickString(...candidates: (string | undefined)[]): string | undefined {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
  }
  return undefined;
}

function parseExpiry(value: unknown): string | undefined {
  if (typeof value === "string" && value) {
    const ms = Date.parse(value);
    if (Number.isFinite(ms)) return new Date(ms).toISOString();
  }
  return undefined;
}

function parseAccessTokenExp(accessToken: string): string {
  const payload = decodeJwtPayload(accessToken);
  const exp = payload && typeof payload.exp === "number" ? payload.exp : null;
  if (exp && Number.isFinite(exp)) {
    return new Date(exp * 1000).toISOString();
  }
  return new Date(Date.now() + DEFAULT_EXPIRY_MS).toISOString();
}

/**
 * Codex CLI persists tokens to `auth.json` with the OAuth fields nested under
 * a `tokens` object: `{ auth_mode, OPENAI_API_KEY, tokens: { id_token, ... } }`.
 * Flatten that into the same shape as a simple top-level export so the rest of
 * the normalizer can stay unchanged.
 */
function unwrapCodexAuthJson(rec: Record<string, unknown>): Record<string, unknown> {
  const tokens = rec.tokens as Record<string, unknown> | undefined;
  if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
    return rec;
  }
  if (typeof tokens.access_token !== "string") return rec;
  // Tokens take priority; carry through siblings (email / account_id / expired)
  // only when the nested object doesn't already define them.
  return { ...rec, ...tokens };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Normalize a single raw record from an uploaded JSON file into a
 * `createProviderConnection` payload.
 *
 * @param input — single record from the uploaded JSON
 */
export function normalizeCodexImportRecord(input: unknown): NormalizeResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Record is not an object" };
  }

  const rec = unwrapCodexAuthJson(input as Record<string, unknown>);

  // Allow type field to be missing or "codex"; reject anything else explicitly so
  // users don't accidentally import claude/gemini exports through this path.
  if (rec.type !== undefined && rec.type !== null && rec.type !== "codex") {
    return { ok: false, error: `Unsupported type: ${String(rec.type)}` };
  }

  for (const f of REQUIRED_FIELDS) {
    if (typeof rec[f] !== "string" || !rec[f]) {
      return { ok: false, error: `Missing required field: ${f}` };
    }
  }

  const accessToken = String(rec.access_token);
  const refreshToken = String(rec.refresh_token);
  const idToken = typeof rec.id_token === "string" ? rec.id_token : undefined;

  // Prefer JWT-derived account info, fall back to top-level fields.
  const fromJwt = idToken ? extractCodexAccountInfo(idToken) : {};
  const email = pickString(fromJwt.email, rec.email as string | undefined);

  if (!email) {
    return { ok: false, error: "Missing email (and id_token does not contain one)" };
  }

  const chatgptAccountId = pickString(
    fromJwt.chatgptAccountId,
    rec.account_id as string | undefined,
  );
  const chatgptPlanType = pickString(fromJwt.chatgptPlanType);

  const expiresAt =
    parseExpiry(rec.expired) ?? parseAccessTokenExp(accessToken);

  const providerSpecificData: CodexImportPayload["providerSpecificData"] = {};
  if (chatgptAccountId) providerSpecificData.chatgptAccountId = chatgptAccountId;
  if (chatgptPlanType) providerSpecificData.chatgptPlanType = chatgptPlanType;

  const payload: CodexImportPayload = {
    provider: "codex",
    authType: "oauth",
    accessToken,
    refreshToken,
    email,
    expiresAt,
    testStatus: "active",
  };
  if (idToken) payload.idToken = idToken;
  if (Object.keys(providerSpecificData).length > 0) {
    payload.providerSpecificData = providerSpecificData;
  }

  return { ok: true, payload };
}

/**
 * Flatten the user-uploaded JSON into an array of candidate records.
 * Accepts a single record or an array; rejects anything else.
 */
export function flattenCodexImportPayload(parsed: unknown): FlattenResult {
  if (Array.isArray(parsed)) {
    return { ok: true, records: parsed };
  }
  if (parsed && typeof parsed === "object") {
    return { ok: true, records: [parsed] };
  }
  return { ok: false, error: "JSON must be an object or an array of objects" };
}
