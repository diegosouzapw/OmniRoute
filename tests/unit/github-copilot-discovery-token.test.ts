import { test } from "node:test";
import assert from "node:assert/strict";

import {
  fetchGitHubCopilotModels,
  GITHUB_COPILOT_MODELS_URL,
} from "../../open-sse/services/githubCopilotModels.ts";

// Regression guard for the Copilot catalog-discovery token fix.
//
// The full entitled Copilot model catalog (incl. grok-4.x and mai-code) is only
// unlocked when `copilot-integration-id: copilot-developer-cli` rides on a RAW
// GitHub Bearer token. The exchanged copilot_internal/v2/token bearer is minted
// without the developer-cli identity and unlocks only the narrower default set,
// silently dropping grok/mai. So discovery in
// src/app/api/providers/[id]/models/route.ts now prefers the raw accessToken over
// psd.copilotToken. These tests pin the two halves of the contract:
//   (a) fetchGitHubCopilotModels sends whatever token it is given as
//       `Authorization: Bearer *** on api.githubcopilot.com/models, and
//   (b) a /responses-only entitled model (grok/mai shape) is preserved, not
//       filtered out, when the live catalog returns it.

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test("fetchGitHubCopilotModels sends the given token as Authorization: Bearer", async () => {
  let seenUrl = "";
  let seenAuth: string | null = null;
  let seenIntegrationId: string | null = null;

  const result = await fetchGitHubCopilotModels({
    token: "gho_raw_github_token",
    fetchImpl: (async (url: string, init?: RequestInit) => {
      seenUrl = String(url);
      const headers = new Headers(init?.headers as HeadersInit);
      seenAuth = headers.get("authorization");
      seenIntegrationId = headers.get("copilot-integration-id");
      return jsonResponse({
        data: [
          { id: "gpt-5.6", capabilities: { type: "chat" } },
          // grok/mai are /responses-only; they must survive discovery.
          { id: "grok-4.6", capabilities: { type: "chat" }, supported_endpoints: ["/responses"] },
          { id: "mai-code-1.1-flash", supported_endpoints: ["/responses"] },
        ],
      });
    }) as typeof fetch,
  });

  assert.equal(seenUrl, GITHUB_COPILOT_MODELS_URL);
  // The raw token is presented verbatim — the unlock lever.
  assert.equal(seenAuth, "Bearer gho_raw_github_token");
  // The developer-cli integration id is what unlocks the full catalog.
  assert.equal(seenIntegrationId, "copilot-developer-cli");
  assert.equal(result.source, "api");
});

test("fetchGitHubCopilotModels keeps /responses-only entitled models (grok/mai)", async () => {
  const result = await fetchGitHubCopilotModels({
    token: "gho_raw_github_token",
    fetchImpl: (async () =>
      jsonResponse({
        data: [
          { id: "grok-4.6", capabilities: { type: "chat" }, supported_endpoints: ["/responses"] },
          { id: "mai-code-1.1-flash", supported_endpoints: ["/responses"] },
        ],
      })) as typeof fetch,
  });

  assert.equal(result.source, "api");
  const ids = new Set(result.models.map((m) => m.id));
  assert.ok(ids.has("grok-4.6"), "grok-4.6 must survive discovery");
  assert.ok(ids.has("mai-code-1.1-flash"), "mai-code must survive discovery");
});
