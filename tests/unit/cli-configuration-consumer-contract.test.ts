import assert from "node:assert/strict";
import test from "node:test";
import { buildSkillMarkdown } from "../../src/lib/agentSkills/generator.ts";
import { parseOpenapi } from "../../src/lib/agentSkills/openapiParser.ts";
import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";

test("generated CLI skill uses header previews and original-input dry-run application", () => {
  const { body } = buildSkillMarkdown("omni-cli-tools", {
    openapi: parseOpenapi(),
    cliRegistry: { commands: new Map(), families: new Map() },
  });
  const section = (method: string, path: string) =>
    body.split(`### ${method} ${path}\n`)[1]?.split("\n### ")[0] || "";
  const preview = section("GET", "/api/cli-tools/config");
  assert.ok(preview.includes("x-omniroute-config-api-key: <configuration-api-key>"));
  assert.ok(!preview.includes("?apiKey="));
  assert.ok(preview.includes("must not be"));
  for (const endpoint of ["config", "apply"]) {
    const example = section("POST", `/api/cli-tools/${endpoint}`);
    const payload = JSON.parse(example.match(/-d '(.*)'/)?.[1] || "{}");
    assert.equal(payload.toolId, "claude");
    assert.equal(payload.apiKey, "<configuration-api-key>");
    assert.equal(payload.content, undefined);
    assert.equal(payload.dryRun, endpoint === "apply" ? true : undefined);
  }
});

test("configuration examples preserve unrelated bearer and dashboard-session authentication", () => {
  assert.deepEqual(buildApiOperationExample({ path: "/api/models", method: "GET" }, false), [
    "curl https://localhost:20128/api/models \\",
    '  -H "Authorization: Bearer $OMNIROUTE_TOKEN"',
  ]);
  const login = buildApiOperationExample({ path: "/api/auth/login", method: "POST" }, true).join(
    "\n"
  );
  assert.ok(login.includes("-c cookie.jar"));
  assert.ok(!login.includes("OMNIROUTE_TOKEN"));
  const mutation = buildApiOperationExample(
    { path: "/api/auth/logout", method: "POST" },
    true
  ).join("\n");
  assert.ok(mutation.includes("-b cookie.jar"));
  assert.ok(mutation.includes("x-omniroute-csrf: $CSRF_TOKEN"));
  const read = buildApiOperationExample({ path: "/api/auth/status", method: "GET" }, true).join(
    "\n"
  );
  assert.ok(read.includes("-b cookie.jar"));
  assert.ok(!read.includes("CSRF_TOKEN"));
});
