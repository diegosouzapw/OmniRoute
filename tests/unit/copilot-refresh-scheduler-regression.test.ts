import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "copilot-refresh-regression-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const health = await import("../../src/lib/tokenHealthCheck.ts");

const originalFetch = globalThis.fetch;
let refreshCalls = 0;

globalThis.fetch = (async (input) => {
  const url = String(input);

  if (/\/user(?:\?|$)/.test(url) && !url.includes("copilot_internal")) {
    return new Response("{}", {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  assert.match(url, /copilot_internal\/v2\/token/);
  refreshCalls++;

  return new Response(
    JSON.stringify({
      token: "synthetic-copilot-token",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}) as typeof fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("Copilot refresh scheduler boundaries", async (t) => {
  const scenarios = [
    {
      name: "healthy token: no refresh",
      expirySeconds: 3600,
      status: "active",
      expected: 0,
    },
    {
      name: "near expiry: refresh required",
      expirySeconds: 60,
      status: "active",
      expected: 1,
    },
    {
      name: "expired connection: recovery probe",
      expirySeconds: 3600,
      status: "expired",
      expected: 1,
    },
    {
      name: "missing Copilot token: refresh required",
      expirySeconds: null,
      status: "active",
      expected: 1,
    },
  ];

  for (const scenario of scenarios) {
    await t.test(scenario.name, async () => {
      const connection = await db.createProviderConnection({
        provider: "github",
        authType: "oauth",
        name: `Regression ${scenario.name}`,
        accessToken: "synthetic-github-access-token",
        refreshToken: null,
        providerSpecificData: {
          copilotToken: scenario.expirySeconds === null ? null : "existing-copilot-token",
          copilotTokenExpiresAt:
            scenario.expirySeconds === null
              ? null
              : Math.floor(Date.now() / 1000) + scenario.expirySeconds,
        },
        testStatus: scenario.status,
        isActive: true,
      });

      refreshCalls = 0;
      await health.checkConnection(connection);

      console.log(
        `ORACLE ${scenario.name}: expected=${scenario.expected} observed=${refreshCalls}`
      );

      assert.equal(refreshCalls, scenario.expected);
    });
  }
});
