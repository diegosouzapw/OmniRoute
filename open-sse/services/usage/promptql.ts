/**
 * PromptQL project credit summary → UsageQuota for Limits page.
 *
 * Live GraphQL (data.pro.ql.app):
 *   query getCreditSummary($project_id: uuid!) {
 *     promptql_project_credit_summary(where: {project_id: {_eq: $project_id}}) {
 *       remaining_credits_usd_micros
 *       total_drawn_usd_micros
 *       available_credits_usd_micros
 *       total_olus_used
 *       last_drawdown_at
 *     }
 *   }
 *
 * Micros → USD: remaining_credits_usd_micros / 1_000_000  (e.g. 46370444 → $46.37)
 */
import { type UsageQuota, parseResetTime } from "./quota.ts";

const CREDITS_GQL =
  process.env.PROMPTQL_CREDITS_ENDPOINT || "https://data.pro.ql.app/v1/graphql";

function normalizePromptQlToken(raw: string): string {
  return (raw || "").trim().replace(/^Bearer\s+/i, "").trim();
}

function extractProjectIdFromToken(token: string): string {
  try {
    const part = token.split(".")[1];
    if (!part) return "";
    const json = JSON.parse(
      Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
    ) as Record<string, unknown>;
    const hasura = json["https://promptql.hasura.io"];
    if (hasura && typeof hasura === "object" && !Array.isArray(hasura)) {
      const id = (hasura as Record<string, unknown>)["x-hasura-project-id"];
      if (typeof id === "string" && id.trim()) return id.trim();
    }
  } catch {
    /* ignore */
  }
  return "";
}

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
  // Prefer available as total; if zero, derive total = remaining + drawn
  const total = available > 0 ? available : remaining + drawn;
  const used = Math.max(0, Math.min(total, drawn > 0 ? drawn : total - remaining));
  const rem = remaining > 0 ? remaining : Math.max(0, total - used);
  return {
    used,
    total,
    remaining: rem,
    remainingPercentage: total > 0 ? Math.round((rem / total) * 1000) / 10 : 0,
    resetAt: parseResetTime(row.last_drawdown_at) /* last activity, not a hard reset */,
    unlimited: false,
    currency: "USD",
    displayName: "PromptQL credits (USD)",
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

export async function getPromptQlUsage(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null
) {
  const token = normalizePromptQlToken(apiKey || "");
  if (!token) {
    return { message: "PromptQL JWT not available. Paste a Bearer token to view credits." };
  }
  const projectId =
    readPs(providerSpecificData, ["projectId", "project_id", "x-hasura-project-id"]) ||
    extractProjectIdFromToken(token);
  if (!projectId) {
    return {
      message:
        "Missing projectId for PromptQL credits. Set providerSpecificData.projectId or use a JWT with x-hasura-project-id.",
    };
  }

  try {
    const res = await fetch(CREDITS_GQL, {
      method: "POST",
      headers: {
        accept: "application/graphql-response+json, application/json",
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
        origin: "https://prompt.ql.app",
        referer: "https://prompt.ql.app/",
        "hasura-client-name": "hasura-console",
      },
      body: JSON.stringify({
        query: GET_CREDIT_SUMMARY,
        variables: { project_id: projectId },
        operationName: "getCreditSummary",
      }),
    });
    if (!res.ok) {
      return {
        message: `PromptQL credits HTTP ${res.status}`,
        plan: "PromptQL",
      };
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
      return {
        message: json.errors.map((e) => e.message).join("; "),
        plan: "PromptQL",
      };
    }
    const row = json.data?.promptql_project_credit_summary?.[0];
    if (!row) {
      return {
        message: "No credit summary for this project.",
        plan: "PromptQL",
      };
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
  } catch (err) {
    return {
      message: `PromptQL credits failed: ${err instanceof Error ? err.message : String(err)}`,
      plan: "PromptQL",
    };
  }
}
