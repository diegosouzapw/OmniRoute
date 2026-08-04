/**
 * PromptQL project credit summary → UsageQuota for Limits page.
 *
 * Live GraphQL (data.pro.ql.app) — captured from prompt.ql.app SPA (ge_balance.txt):
 *   POST https://data.pro.ql.app/v1/graphql
 *   query getCreditSummary($project_id: uuid!) {
 *     promptql_project_credit_summary(where: {project_id: {_eq: $project_id}}) {
 *       remaining_credits_usd_micros   // e.g. 28484763 → $28.48 left
 *       total_drawn_usd_micros         // e.g. 21515237 → $21.52 used
 *       available_credits_usd_micros   // e.g. 50000000 → $50.00 total
 *       total_olus_used
 *       last_drawdown_at
 *     }
 *   }
 *
 * Browser SPA often uses session cookies (credentials:include). Headless OmniRoute
 * uses the playground JWT (Bearer). We send Bearer always when present and Cookie
 * when providerSpecificData.cookie is stored.
 */
import { type UsageQuota } from "./quota.ts";
import {
  normalizePromptQlToken,
  looksLikeUuid,
  extractProjectIdFromToken,
  decodeJwtPayload,
  issuerHostIsTrusted,
} from "../promptql/jwt.ts";

// Re-exported for backward compatibility — external/test consumers previously
// imported extractProjectIdFromToken from this module (module split for
// file-size cap + dedup with open-sse/executors/promptql.ts — see PR #7911 review).
export { extractProjectIdFromToken };

const CREDITS_GQL =
  process.env.PROMPTQL_CREDITS_ENDPOINT || "https://data.pro.ql.app/v1/graphql";

const GET_CREDIT_SUMMARY = `
query getCreditSummary($project_id: uuid!) {
  promptql_project_credit_summary(where: {project_id: {_eq: $project_id}}) {
    project_id
    available_credits_usd_micros
    total_topup_usd_micros
    total_drawn_usd_micros
    remaining_credits_usd_micros
    total_olus_used
    last_drawdown_at
  }
}`;

export function microsToUsd(micros: unknown): number {
  const n = typeof micros === "number" ? micros : Number(micros);
  if (!Number.isFinite(n)) return 0;
  return Math.round((n / 1_000_000) * 100) / 100;
}

export function buildPromptQlCreditsQuota(row: {
  available_credits_usd_micros?: number | null;
  total_drawn_usd_micros?: number | null;
  remaining_credits_usd_micros?: number | null;
  last_drawdown_at?: string | null;
}): UsageQuota {
  const available = microsToUsd(row.available_credits_usd_micros ?? 0);
  const remaining = microsToUsd(row.remaining_credits_usd_micros ?? 0);
  const drawn = microsToUsd(row.total_drawn_usd_micros ?? 0);
  // available = wallet top-line (e.g. $50); remaining + drawn should sum ≈ available
  const total = available > 0 ? available : remaining + drawn;
  const used = Math.max(0, Math.min(total, drawn > 0 ? drawn : Math.max(0, total - remaining)));
  const rem = remaining > 0 ? remaining : Math.max(0, total - used);
  const remainingPercentage =
    total > 0 ? Math.round((rem / total) * 1000) / 10 : rem > 0 ? 100 : 0;
  return {
    used,
    total,
    remaining: rem,
    remainingPercentage,
    // last_drawdown is activity, not a hard reset — omit so UI doesn't show a false "Resets in…"
    resetAt: null,
    unlimited: false,
    currency: "USD",
    displayName: "Credits (USD)",
  };
}

function readPs(data: unknown, keys: string[]): string {
  if (!data || typeof data !== "object") return "";
  const rec = data as Record<string, unknown>;
  for (const k of keys) {
    const v = rec[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

/**
 * data.pro.ql.app getCreditSummary accepts DDN/lux project JWTs (aud=project UUID).
 * Playground enrich-tokens (iss=enrich-token) are rejected with access-denied.
 * Prefer lux/ddn tokens for credits; fall back to apiKey when it is already DDN-shaped.
 */
function collectCreditsTokens(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (raw: string) => {
    const t = normalizePromptQlToken(raw);
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push(t);
  };
  // Explicit credits tokens first
  push(readPs(providerSpecificData, ["luxJwt", "ddnToken", "projectToken", "creditsToken", "luxToken"]));
  push(apiKey || "");
  // Also allow nested vibeProxy bag (forward-compat)
  if (providerSpecificData && typeof providerSpecificData.vibeProxy === "object") {
    push(readPs(providerSpecificData.vibeProxy as Record<string, unknown>, ["luxJwt", "ddnToken"]));
  }
  // Prefer DDN/lux tokens for data.pro.ql.app over enrich-tokens
  return out.sort((a, b) => (isLikelyDdnToken(a) ? 0 : 1) - (isLikelyDdnToken(b) ? 0 : 1));
}

function isLikelyDdnToken(token: string): boolean {
  const json = decodeJwtPayload(token);
  if (!json) return false;
  const iss = typeof json.iss === "string" ? json.iss : "";
  if (issuerHostIsTrusted(iss)) return true;
  if (iss.toLowerCase().includes("enrich-token")) return false;
  const aud = json.aud;
  if (typeof aud === "string" && looksLikeUuid(aud)) return true;
  return false;
}

export async function getPromptQlUsage(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null,
  connectionProjectId?: string | null
) {
  const cookie = readPs(providerSpecificData, ["cookie", "sessionCookie", "authCookie"]);
  const tokens = collectCreditsTokens(apiKey, providerSpecificData);
  if (!tokens.length && !cookie) {
    return { message: "PromptQL JWT not available. Paste a Bearer token to view credits." };
  }
  const projectId =
    readPs(providerSpecificData, ["projectId", "project_id", "x-hasura-project-id"]) ||
    (typeof connectionProjectId === "string" ? connectionProjectId.trim() : "") ||
    (tokens.length ? extractProjectIdFromToken(tokens[0]!) : "");
  if (!projectId) {
    return {
      message:
        "Missing projectId for PromptQL credits. Set providerSpecificData.projectId, or use a playground JWT (x-hasura-project-id) or a DDN JWT whose aud is the project UUID.",
    };
  }

  try {
    const headersBase: Record<string, string> = {
      accept: "application/graphql-response+json, application/json",
      "content-type": "application/json",
      origin: "https://prompt.ql.app",
      referer: "https://prompt.ql.app/",
      "hasura-client-name": "hasura-console",
    };
    if (cookie) headersBase.cookie = cookie;

    // Try each token (DDN first). Enrich-only accounts get a clear dual-token message.
    let lastError = "";
    const tryTokens = tokens.length ? tokens : [""];
    for (const token of tryTokens) {
      const headers = { ...headersBase };
      if (token) headers.authorization = `Bearer ${token}`;
      else if (!cookie) continue;

      const res = await fetch(CREDITS_GQL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: GET_CREDIT_SUMMARY,
          variables: { project_id: projectId },
          operationName: "getCreditSummary",
        }),
      });
      if (!res.ok) {
        const bodyText = await res.text().catch(() => "");
        lastError = `HTTP ${res.status}${bodyText ? `: ${bodyText.slice(0, 200)}` : ""}`;
        continue;
      }
      const json = (await res.json()) as {
        data?: {
          promptql_project_credit_summary?: Array<{
            available_credits_usd_micros?: number;
            total_drawn_usd_micros?: number;
            remaining_credits_usd_micros?: number;
            total_olus_used?: number;
            last_drawdown_at?: string | null;
          }>;
        };
        errors?: Array<{ message?: string }>;
      };
      if (json.errors?.length) {
        lastError = json.errors.map((e) => e.message).join("; ");
        // access-denied on enrich-token → try next token
        if (/unauthorized|access-denied|JWT/i.test(lastError)) continue;
        return { message: lastError, plan: "PromptQL" };
      }
      const row = json.data?.promptql_project_credit_summary?.[0];
      if (!row) {
        lastError = "No credit summary for this project (empty promptql_project_credit_summary).";
        continue;
      }
      const credits = buildPromptQlCreditsQuota(row);
      return {
        plan: "PromptQL",
        quotas: {
          credits,
        },
        olusUsed: row.total_olus_used,
        remainingUsd: credits.remaining,
        drawnUsd: credits.used,
        availableUsd: credits.total,
      };
    }

    // All tokens failed — if we only had enrich-token, explain dual-token requirement.
    const onlyEnrich =
      tokens.length > 0 && tokens.every((t) => !isLikelyDdnToken(t));
    if (onlyEnrich) {
      return {
        message:
          "PromptQL credits need a DDN/project JWT (iss=auth.pro.hasura.io, aud=project UUID) — the playground enrich-token works for chat only. Store the DDN token as providerSpecificData.luxJwt (or paste it once so the app saves it), then refresh Limits.",
        plan: "PromptQL",
      };
    }
    return {
      message: lastError
        ? `PromptQL credits failed: ${lastError}`
        : "PromptQL credits failed with no usable token.",
      plan: "PromptQL",
    };
  } catch (err) {
    return {
      message: `PromptQL credits failed: ${err instanceof Error ? err.message : String(err)}`,
      plan: "PromptQL",
    };
  }
}
