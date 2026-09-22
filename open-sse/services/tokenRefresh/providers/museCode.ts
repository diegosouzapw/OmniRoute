// Extracted-style provider module — see ../shared.ts for provenance notes.
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import type { RefreshLogger } from "../shared.ts";

const MUSE_CODE_MINT_URL = "https://api.meta.ai/muse-code/key";
const MUSE_CODE_API_VERSION = "1.0.0";
const MUSE_CODE_USER_AGENT = "muse-code";

type MintOutcome =
  | { status: "ok"; mint: Record<string, unknown> }
  | { status: "transient" }
  | { status: "unrecoverable"; code: string };

async function runMintFetch(oidcToken: string, proxyConfig: unknown): Promise<Response> {
  return runWithProxyContext(proxyConfig, () =>
    fetch(MUSE_CODE_MINT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${oidcToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-version": MUSE_CODE_API_VERSION,
        "User-Agent": MUSE_CODE_USER_AGENT,
      },
      body: JSON.stringify({ show_subs_upsell: false }),
    })
  );
}

/**
 * Map a non-2xx mint response to its refresh outcome.
 *
 * 401 means the OIDC token itself is dead (expired/revoked). Re-minting can
 * never succeed with it → force re-login instead of retrying forever.
 *
 * 429 RATE-LIMIT DECISION: re-minting is idempotent and the existing api_key
 * never expires, so a throttled re-mint must NOT fail the connection. Return
 * `transient` so the caller keeps the stored credential and the next refresh
 * cycle retries.
 */
function resolveMintFailure(
  response: Response,
  bodyText: string,
  log: RefreshLogger
): MintOutcome {
  if (response.status === 401) {
    log?.error?.("TOKEN_REFRESH", "Muse Code refresh 401 — OIDC token invalid, re-login required", {
      status: response.status,
    });
    return { status: "unrecoverable", code: "invalid_oidc_token" };
  }

  if (response.status === 429) {
    log?.warn?.("TOKEN_REFRESH", "Muse Code re-mint rate-limited (429); keeping stored api_key", {
      status: response.status,
      retryAfter: response.headers?.get?.("retry-after") || null,
    });
    return { status: "transient" };
  }

  log?.error?.("TOKEN_REFRESH", "Failed to refresh Muse Code token", {
    status: response.status,
    error: bodyText,
  });
  return { status: "transient" };
}

/**
 * Parse a 2xx mint body.
 *
 * Same fail-closed contract as the login mint path
 * (src/lib/oauth/providers/muse-code.ts): meta.ai can answer 200 without an
 * api_key when the subscription/payment state blocks minting.
 */
async function parseMintBody(response: Response, log: RefreshLogger): Promise<MintOutcome> {
  let mint: Record<string, unknown>;
  try {
    mint = await response.json();
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Malformed Muse Code mint response: ${error.message}`);
    return { status: "transient" };
  }

  if (!mint?.api_key) {
    log?.error?.("TOKEN_REFRESH", "Muse Code mint response missing api_key; re-login required", {
      is_subs_active: mint?.is_subs_active,
      require_payment: mint?.require_payment,
    });
    return { status: "unrecoverable", code: "mint_failed_no_api_key" };
  }

  return { status: "ok", mint };
}

function buildMintResult(mint: Record<string, unknown>, oidcToken: string, log: RefreshLogger) {
  log?.info?.("TOKEN_REFRESH", "Successfully refreshed Muse Code token", {
    user_email: mint.user_email,
    subs_tier: mint.subs_tier,
  });

  return {
    accessToken: mint.api_key,
    // Meta does not return a replacement OIDC token from the mint endpoint, so
    // the same OIDC token remains the refresh handle. Keep any new one if the
    // response ever starts including one.
    refreshToken: mint.refresh_token || oidcToken,
    providerSpecificData: {
      user_email: mint.user_email,
      user_id: mint.user_id,
      subs_tier: mint.subs_tier,
    },
  };
}

/**
 * Refresh Muse Code (Meta) credentials.
 *
 * Muse Code has no OAuth `refresh_token` and no published key expiry. The OIDC
 * access token captured at device-flow login is stored as the "refresh token";
 * "refreshing" means re-minting the Muse Code API key via
 * `POST /muse-code/key` with `Authorization: Bearer <oidc>`. The mint is
 * idempotent — Meta returns the same `api_key` for the same account — so the
 * operation is safe to repeat and a rate-limited re-mint is non-fatal because
 * the already-stored api_key keeps working.
 *
 * @returns {Promise<{accessToken, refreshToken, providerSpecificData}|{error, code}|null>}
 *   `{ error: "unrecoverable_refresh_error" }` when the OIDC token is rejected
 *   (caller must force re-login); `null` for transient failures (network, 429).
 */
export async function refreshMuseCodeToken(
  oidcToken: string,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  if (!oidcToken || typeof oidcToken !== "string") {
    return { error: "unrecoverable_refresh_error", code: "no_refresh_token" };
  }

  let response: Response;
  try {
    response = await runMintFetch(oidcToken, proxyConfig);
  } catch (error) {
    log?.error?.("TOKEN_REFRESH", `Network error refreshing Muse Code token: ${error.message}`);
    return null;
  }

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    const failure = resolveMintFailure(response, bodyText, log);
    return failure.status === "unrecoverable"
      ? { error: "unrecoverable_refresh_error", code: failure.code }
      : null;
  }

  const outcome = await parseMintBody(response, log);
  if (outcome.status === "unrecoverable") {
    return { error: "unrecoverable_refresh_error", code: outcome.code };
  }
  if (outcome.status === "transient") {
    return null;
  }

  return buildMintResult(outcome.mint, oidcToken, log);
}
