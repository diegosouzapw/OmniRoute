import test from "node:test";
import assert from "node:assert/strict";

import { codex } from "../../src/lib/oauth/providers/codex.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";

function idToken(authInfo: Record<string, unknown>): string {
  const payload = Buffer.from(
    JSON.stringify({ email: "member@example.test", "https://api.openai.com/auth": authInfo })
  ).toString("base64url");
  return `header.${payload}.signature`;
}

test("Codex OAuth binds to the token account even when organizations include a team", () => {
  const mapped = codex.mapTokens(
    {
      access_token: "access",
      refresh_token: "refresh",
      id_token: idToken({
        chatgpt_account_id: "selected-account",
        chatgpt_plan_type: "free",
        chatgpt_user_id: "user-1",
        organizations: [
          { id: "team-organization", is_default: false, role: "member", title: "Team Workspace" },
        ],
      }),
      expires_in: 3600,
    },
    {}
  );

  assert.equal(mapped.providerSpecificData.workspaceId, "selected-account");
  assert.equal(mapped.providerSpecificData.workspacePlanType, "free");
  const headers = new CodexExecutor().buildHeaders({
    accessToken: mapped.accessToken,
    providerSpecificData: mapped.providerSpecificData,
  });
  assert.equal(headers["chatgpt-account-id"], "selected-account");
});
