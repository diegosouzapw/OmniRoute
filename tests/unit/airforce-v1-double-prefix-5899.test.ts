/**
 * Regression for #5899 (PR #5920): the OpenAI-compatible models-discovery URL
 * builder must strip a trailing `/v1` UNCONDITIONALLY before appending
 * `/v1/models`. A gateway baseUrl like ".../v1/chat/completions" was reduced to
 * ".../v1" (the old `else if` skipped the /v1 strip once `/chat/completions`
 * matched) and then produced ".../v1/v1/models" — a 308 redirect that blocked
 * model discovery. The fix converts the `/v1` strip to an independent `if`
 * (guarding against a literal "scheme://v1" authority) in BOTH the general
 * discovery path and the `provider === "openai"` custom-base-URL path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-5899-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5899 openai gateway baseUrl ending in /v1/chat/completions never probes /v1/v1/models", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "airforce-gateway",
    apiKey: "sk-airforce",
    providerSpecificData: { baseUrl: "https://api.airforce/v1/chat/completions" },
  });

  const requestedUrls: string[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    requestedUrls.push(u);
    // The correctly-stripped candidate must be the one that serves models.
    if (u === "https://api.airforce/v1/models") {
      return Response.json({ object: "list", data: [{ id: "gpt-4o" }, { id: "gpt-5" }] });
    }
    // The double-prefixed URL upstream answered with a 308 redirect (#5899).
    if (u === "https://api.airforce/v1/v1/models") {
      return new Response(null, { status: 308, headers: { location: u } });
    }
    return new Response("not found", { status: 404 });
  };

  try {
    await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(
    requestedUrls.includes("https://api.airforce/v1/models"),
    `expected a request to the correctly-stripped /v1/models URL; got: ${JSON.stringify(requestedUrls)}`
  );
  assert.ok(
    !requestedUrls.includes("https://api.airforce/v1/v1/models"),
    `must never probe the double-prefixed /v1/v1/models URL; got: ${JSON.stringify(requestedUrls)}`
  );
});
