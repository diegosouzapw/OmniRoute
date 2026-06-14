import test from "node:test";
import assert from "node:assert/strict";

import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";

// #3493 — five public OAuth client_ids were migrated from string literals to
// resolvePublicCred() (Hard Rule #11). These assertions guard that the embedded
// masked-byte defaults still decode to the exact public client_ids, so the OAuth
// flows are byte-for-byte unchanged, and that env overrides still win.

const EXPECTED_CLIENT_IDS: Record<string, string> = {
  claude_id: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
  codex_id: "app_EMoamEEZ73f0CkXaXp7hrann",
  qwen_id: "f0304373b74a44d2b584a3fb70ca9e56",
  kimi_id: "17e5f671-d194-4dfb-9706-5516cb48c098",
  github_copilot_id: "Iv1.b507a08c87ecfe98",
};

test("#3493 embedded public client_ids decode to their original literals", () => {
  for (const [key, expected] of Object.entries(EXPECTED_CLIENT_IDS)) {
    assert.equal(
      resolvePublicCred(key as never),
      expected,
      `${key} must decode to its public client_id (OAuth flow unchanged)`
    );
  }
});

test("#3493 env override takes priority over the embedded default", () => {
  const prev = process.env.CLAUDE_OAUTH_CLIENT_ID;
  process.env.CLAUDE_OAUTH_CLIENT_ID = "custom-override-id";
  try {
    assert.equal(
      resolvePublicCred("claude_id" as never, "CLAUDE_OAUTH_CLIENT_ID"),
      "custom-override-id"
    );
  } finally {
    if (prev === undefined) delete process.env.CLAUDE_OAUTH_CLIENT_ID;
    else process.env.CLAUDE_OAUTH_CLIENT_ID = prev;
  }
});

test("#3493 the migrated OAuth/registry configs resolve to the expected client_ids", async () => {
  const { CLAUDE_CONFIG, CODEX_CONFIG, QWEN_CONFIG } = await import(
    "../../src/lib/oauth/constants/oauth.ts"
  );
  // Only assert when env doesn't override (CI/dev may set these); skip the assert
  // for any that are env-overridden so the test stays deterministic.
  if (!process.env.CLAUDE_OAUTH_CLIENT_ID) {
    assert.equal(CLAUDE_CONFIG.clientId, EXPECTED_CLIENT_IDS.claude_id);
  }
  if (!process.env.CODEX_OAUTH_CLIENT_ID) {
    assert.equal(CODEX_CONFIG.clientId, EXPECTED_CLIENT_IDS.codex_id);
  }
  if (!process.env.QWEN_OAUTH_CLIENT_ID) {
    assert.equal(QWEN_CONFIG.clientId, EXPECTED_CLIENT_IDS.qwen_id);
  }
});
