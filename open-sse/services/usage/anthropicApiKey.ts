/**
 * usage/anthropicApiKey.ts — rate-limit quota for an Anthropic API key.
 *
 * The Claude Code OAuth fetcher (usage/claude.ts) reads /api/oauth/usage and
 * does not apply to a platform.claude.com API key. Anthropic exposes no usage
 * endpoint to a plain key (the organizations usage API wants an admin key),
 * but every /v1/messages response carries the per-minute rate-limit windows in
 * headers. One minimal request reads them.
 */

import { type UsageQuota } from "./quota.ts";

const MESSAGES_URL = "https://api.anthropic.com/v1/messages";

const WINDOWS = [
  { key: "requests", header: "requests", label: "Requests" },
  { key: "input_tokens", header: "input-tokens", label: "Input tokens" },
  { key: "output_tokens", header: "output-tokens", label: "Output tokens" },
  { key: "tokens", header: "tokens", label: "Tokens" },
] as const;

function readWindow(headers: Headers, name: string): UsageQuota | null {
  const limit = Number(headers.get(`anthropic-ratelimit-${name}-limit`));
  const remaining = Number(headers.get(`anthropic-ratelimit-${name}-remaining`));
  if (!Number.isFinite(limit) || limit <= 0 || !Number.isFinite(remaining)) return null;
  const used = Math.max(0, limit - remaining);
  return {
    used,
    total: limit,
    remaining,
    remainingPercentage: Math.round((remaining / limit) * 100),
    resetAt: headers.get(`anthropic-ratelimit-${name}-reset`),
    unlimited: false,
    fractionReported: true,
    quotaSource: "retrieveUserQuota",
  };
}

export async function getAnthropicApiKeyUsage(apiKey: string | undefined) {
  if (!apiKey) return { message: "Anthropic API key not available. Add a key to view usage." };
  let response: Response;
  try {
    response = await fetch(MESSAGES_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1,
        messages: [{ role: "user", content: "hi" }],
      }),
    });
  } catch {
    return { message: "Anthropic usage request failed." };
  }
  if (!response.ok) {
    return { message: `Anthropic usage request returned ${response.status}` };
  }
  const quotas: Record<string, UsageQuota> = {};
  for (const window of WINDOWS) {
    const quota = readWindow(response.headers, window.header);
    if (quota) quotas[window.key] = { ...quota, displayName: window.label };
  }
  if (Object.keys(quotas).length === 0) {
    return { message: "Anthropic response carried no rate-limit headers." };
  }
  return { plan: "API key", quotas };
}
