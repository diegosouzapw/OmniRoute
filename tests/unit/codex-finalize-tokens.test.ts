import test from "node:test";
import assert from "node:assert/strict";

import { finalizeTokens } from "@/lib/oauth/providers";

/** Build a fake (unsigned) JWT whose payload carries the given claims. */
function makeIdToken(payload: Record<string, unknown>): string {
  const b64 = (obj: unknown) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  return `${b64({ alg: "none", typ: "JWT" })}.${b64(payload)}.sig`;
}

test("finalizeTokens(codex) maps device-flow tokens and extracts email + workspace from id_token", async () => {
  const idToken = makeIdToken({
    email: "user@example.com",
    "https://api.openai.com/auth": {
      chatgpt_account_id: "acc-123",
      chatgpt_plan_type: "plus",
      chatgpt_user_id: "cu-1",
      user_id: "u-1",
      organizations: [],
    },
  });

  const tokenData = await finalizeTokens("codex", {
    access_token: "at-1",
    refresh_token: "rt-1",
    id_token: idToken,
    expires_in: 3600,
  });

  assert.equal(tokenData.accessToken, "at-1");
  assert.equal(tokenData.refreshToken, "rt-1");
  assert.equal(tokenData.idToken, idToken);
  assert.equal(tokenData.expiresIn, 3600);
  assert.equal(tokenData.email, "user@example.com");
  // No organizations → workspace falls back to chatgpt_account_id (Ponto de atenção #1:
  // the deviceauth flow can't request id_token_add_organizations).
  assert.equal(tokenData.providerSpecificData.workspaceId, "acc-123");
  assert.equal(tokenData.providerSpecificData.workspacePlanType, "plus");
});

test("finalizeTokens(codex) prefers a team org when plan_type is free", async () => {
  const idToken = makeIdToken({
    email: "team@example.com",
    "https://api.openai.com/auth": {
      chatgpt_account_id: "personal-acc",
      chatgpt_plan_type: "free",
      chatgpt_user_id: "cu-2",
      user_id: "u-2",
      organizations: [
        { id: "team-acc", is_default: false, role: "member", title: "Acme Team" },
      ],
    },
  });

  const tokenData = await finalizeTokens("codex", {
    access_token: "at-2",
    id_token: idToken,
    expires_in: 60,
  });

  assert.equal(tokenData.email, "team@example.com");
  assert.equal(tokenData.providerSpecificData.workspaceId, "team-acc");
  assert.equal(tokenData.providerSpecificData.workspacePlanType, "team");
});

test("finalizeTokens(codex) tolerates a missing id_token (no metadata)", async () => {
  const tokenData = await finalizeTokens("codex", {
    access_token: "at-3",
    refresh_token: "rt-3",
    expires_in: 120,
  });

  assert.equal(tokenData.accessToken, "at-3");
  assert.equal(tokenData.email, null);
  assert.equal(tokenData.providerSpecificData.workspaceId, null);
});
