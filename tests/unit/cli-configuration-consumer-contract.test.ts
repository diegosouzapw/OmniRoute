import assert from "node:assert/strict";
import test from "node:test";
import { buildSkillMarkdown } from "../../src/lib/agentSkills/generator.ts";
import { parseOpenapi } from "../../src/lib/agentSkills/openapiParser.ts";
import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";
import {
  DEFAULT_OMNIROUTE_BASE_URL,
  resolveOmniRouteBaseUrl,
} from "../../src/shared/utils/resolveOmniRouteBaseUrl.ts";

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
  const baseUrl = DEFAULT_OMNIROUTE_BASE_URL;
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

/** Runs `fn` with the base-url env vars forced to `vars`, restoring them afterwards. */
function withBaseUrlEnv(vars: Record<string, string | undefined>, fn: () => void): void {
  const keys = ["PORT", "API_PORT", "DASHBOARD_PORT", "BASE_URL", "OMNIROUTE_BASE_URL"];
  const saved = new Map(keys.map((key) => [key, process.env[key]]));
  try {
    for (const key of keys) {
      const value = vars[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fn();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

// A caller that wants the operator's configured host still gets it (#15778) — but it
// now has to ask for it, by passing the resolver's result as the baseUrl argument.
test("configuration examples track the configured loopback port when given one", () => {
  withBaseUrlEnv({ PORT: "37128" }, () => {
    const example = buildApiOperationExample(
      { path: "/api/models", method: "GET" },
      false,
      resolveOmniRouteBaseUrl()
    ).join("\n");
    assert.ok(example.includes("http://localhost:37128/api/models"), example);
    assert.ok(!example.includes("20128"), example);
  });
});

// The generator commits its output and `check:agent-skills-sync` diff-gates it, so the
// default must not vary with the machine. Reading process.env down in the example
// builders is what drifted all 20 SKILL.md files and blocked every PR into the branch.
test("generated examples ignore ambient base-url env so committed output is reproducible", () => {
  const canonical = buildApiOperationExample({ path: "/api/models", method: "GET" }, false).join(
    "\n"
  );
  assert.ok(canonical.includes(`${DEFAULT_OMNIROUTE_BASE_URL}/api/models`), canonical);

  for (const vars of [
    { PORT: "37128" },
    { API_PORT: "41999" },
    { DASHBOARD_PORT: "42000" },
    { BASE_URL: "https://ops.internal.example" },
    { OMNIROUTE_BASE_URL: "https://omni.example:8443" },
  ]) {
    withBaseUrlEnv(vars, () => {
      const actual = buildApiOperationExample({ path: "/api/models", method: "GET" }, false).join(
        "\n"
      );
      assert.equal(actual, canonical, `env ${JSON.stringify(vars)} leaked into the example`);
    });
  }
});

// The /api/cli-tools/* examples take the same baseUrl argument, so pin them too.
test("configuration-API examples are reproducible and still accept an explicit host", () => {
  withBaseUrlEnv({ OMNIROUTE_BASE_URL: "https://omni.example:8443" }, () => {
    const pinned = buildApiOperationExample(
      { path: "/api/cli-tools/config", method: "GET" },
      false
    ).join("\n");
    assert.ok(pinned.includes(`${DEFAULT_OMNIROUTE_BASE_URL}/api/cli-tools/config`), pinned);
    assert.ok(!pinned.includes("omni.example"), pinned);

    const explicit = buildApiOperationExample(
      { path: "/api/cli-tools/config", method: "GET" },
      false,
      "https://omni.example:8443"
    ).join("\n");
    assert.ok(explicit.includes("https://omni.example:8443/api/cli-tools/config"), explicit);
  });
});
