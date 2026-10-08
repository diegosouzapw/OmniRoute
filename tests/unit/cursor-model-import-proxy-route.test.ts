import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-discovery-"));
process.env.DATA_DIR = dataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { setProxyForLevel } = await import("../../src/lib/db/settings.ts");
const { proxyFetch } = await import("../../open-sse/utils/proxyFetch.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("Cursor model import sends AvailableModels through the configured proxy", async () => {
  const connection = await createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "Cursor discovery test",
    accessToken: "cursor-session-token",
    providerSpecificData: { autoFetchModels: true },
    isActive: true,
  });
  await setProxyForLevel("provider", "cursor", { type: "http", host: "127.0.0.1", port: 1 });
  let directRequests = 0;
  let proxiedRequests = 0;
  globalThis.fetch = (url, init) =>
    proxyFetch(url, init, {
      nativeFetch: async () => {
        directRequests++;
        return Response.json({ models: [{ name: "bypassed-proxy-model" }] });
      },
      undiciFetch: async () => {
        proxiedRequests++;
        return Response.json({ models: [{ name: "proxied-model" }] });
      },
    });

  const response = await GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = await response.json();
  assert.equal(directRequests, 0, "AvailableModels must not bypass the configured proxy");
  assert.ok(proxiedRequests > 0);
  assert.equal(body.source, "api");
  assert.ok(body.models?.some((model: { id: string }) => model.id === "proxied-model"));
});
