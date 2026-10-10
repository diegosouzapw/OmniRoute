import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-15869-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "muse-fixture-encryption-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { buildOAuthConnectionCreatePayload } =
  await import("../../src/lib/oauth/connectionPersistence.ts");
const { museCode } = await import("../../src/lib/oauth/providers/muse-code.ts");
const { refreshMuseCodeToken } =
  await import("../../open-sse/services/tokenRefresh/providers/museCode.ts");
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("DCA-only and minted connections survive database reload and can remint", async () => {
  for (const mintInitially of [false, true]) {
    globalThis.fetch = async () =>
      mintInitially
        ? Response.json({ api_key: "LLM|initial-fixture", base_url: "https://api.meta.ai/v1" })
        : new Response("unavailable", { status: 503 });
    const tokens = { access_token: "dca:renewable-fixture", expires_in: 600 };
    const mapped = museCode.mapTokens(tokens, await museCode.postExchange(tokens));
    const created = await providers.createProviderConnection(
      buildOAuthConnectionCreatePayload("muse-code", mapped, null)
    );
    core.resetDbInstance();
    const reloaded = (await providers.getProviderConnections({ provider: "muse-code" })).find(
      (connection) => connection.id === created.id
    );
    assert.ok(reloaded);
    assert.equal(reloaded.refreshToken, "dca:renewable-fixture");
    assert.equal(reloaded.providerSpecificData.dcaToken, "dca:renewable-fixture");
    globalThis.fetch = async (_url, init) => {
      assert.equal(
        (init?.headers as Record<string, string>).Authorization,
        "Bearer dca:renewable-fixture"
      );
      return Response.json({ api_key: "LLM|renewed-fixture", base_url: "https://api.meta.ai/v1" });
    };
    const renewed = await refreshMuseCodeToken(
      reloaded.refreshToken,
      reloaded.providerSpecificData,
      null
    );
    assert.equal(renewed?.accessToken, "LLM|renewed-fixture");
    assert.equal(renewed?.refreshToken, "dca:renewable-fixture");
  }
});
