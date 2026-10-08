import assert from "node:assert/strict";
import test from "node:test";
import { buildSkillMarkdown } from "../../src/lib/agentSkills/generator.ts";
import { parseOpenapi } from "../../src/lib/agentSkills/openapiParser.ts";
import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";
import { resolveOmniRouteBaseUrl } from "../../src/shared/utils/resolveOmniRouteBaseUrl.ts";

test("generated CLI skill uses header previews and original-input dry-run application", () => {
  const { body, references } = buildSkillMarkdown("omni-cli-tools", {
    openapi: parseOpenapi(),
    cliRegistry: { commands: new Map(), families: new Map() },
  });
  // #14293 moved oversized endpoint sections out of SKILL.md into
  // references/endpoints.md, so the examples may live in either document.
  const docs = [body, ...references.map((reference) => reference.content)].join("\n");
  const section = (method: string, path: string) =>
    docs.split(`### ${method} ${path}\n`)[1]?.split("\n### ")[0] || "";
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
  const baseUrl = resolveOmniRouteBaseUrl();
  assert.deepEqual(buildApiOperationExample({ path: "/api/models", method: "GET" }, false), [
    `curl ${baseUrl}/api/models \\`,
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

test("configuration examples track the configured loopback port instead of a hardcoded 20128", () => {
  const savedPort = process.env.PORT;
  const savedBaseUrl = process.env.BASE_URL;
  const savedOmniBaseUrl = process.env.OMNIROUTE_BASE_URL;
  delete process.env.BASE_URL;
  delete process.env.OMNIROUTE_BASE_URL;
  try {
    process.env.PORT = "37128";
    const example = buildApiOperationExample({ path: "/api/models", method: "GET" }, false).join(
      "\n"
    );
    assert.ok(example.includes("http://localhost:37128/api/models"), example);
    assert.ok(!example.includes("20128"), example);
  } finally {
    if (savedPort === undefined) delete process.env.PORT;
    else process.env.PORT = savedPort;
    if (savedBaseUrl === undefined) delete process.env.BASE_URL;
    else process.env.BASE_URL = savedBaseUrl;
    if (savedOmniBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = savedOmniBaseUrl;
  }
});
