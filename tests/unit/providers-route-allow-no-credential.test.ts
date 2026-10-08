import test from "node:test";
import assert from "node:assert/strict";

// Regression: POST /api/providers referenced providerAllowsOptionalApiKey without
// importing it (introduced with `--allow-no-credential`, 06090d3c). The check sits
// behind `allowNoCredential === true`, so the route only threw a ReferenceError
// (HTTP 500) for that request shape; every other create path stayed green.

import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-providers-route-nocred-"));
process.env.DATA_DIR = DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/providers/route.ts");

test.after(() => {
  core.resetDbInstance();
});

function post(body: Record<string, unknown>) {
  return route.POST(
    new Request("http://localhost/api/providers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test("allowNoCredential on a provider that requires a key is refused with 400, not a ReferenceError", async () => {
  const res = await post({ provider: "openai", name: "no-cred", allowNoCredential: true });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: unknown };
  assert.match(JSON.stringify(body), /does not allow a connection without a credential/);
});

test("allowNoCredential on a provider that allows an optional key passes the optional-key gate", async () => {
  const res = await post({
    provider: "ollama-local",
    name: "no-cred-local",
    allowNoCredential: true,
  });
  assert.notEqual(res.status, 500, "must not 500 (ReferenceError) on the allowNoCredential branch");
  const text = JSON.stringify(await res.json().catch(() => ({})));
  assert.doesNotMatch(text, /does not allow a connection without a credential/);
});
