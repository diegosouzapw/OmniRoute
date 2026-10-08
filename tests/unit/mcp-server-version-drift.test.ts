/**
 * Regression for the MCP server version drift (OmniRoute deep review, 2026-09-29).
 *
 * `createMcpServer()` set its advertised version to
 * `process.env.npm_package_version || "1.8.1"`. The MCP server is launched by the
 * omniroute CLI (`bin/mcp-server.mjs` via `node --import`), not an npm script, so
 * the env var is unset and the stale literal shipped in the MCP `initialize`
 * handshake (`serverInfo.version`). It must resolve the authoritative package
 * version (APP_CONFIG.version) regardless of launch path.
 *
 * The env var is deleted BEFORE the server module is imported so the defect
 * reproduces independent of the test runner, and restored afterward so it never
 * leaks into other tests sharing the process. The version is read through the
 * public client handshake (`getServerVersion()`), not an internal SDK field, so
 * the test verifies the observable `serverInfo` the server actually advertises.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { APP_CONFIG } from "../../src/shared/constants/appConfig.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const PREV_NPM_PACKAGE_VERSION = process.env.npm_package_version;
delete process.env.npm_package_version;

after(() => {
  resetDbInstance();
  if (PREV_NPM_PACKAGE_VERSION === undefined) delete process.env.npm_package_version;
  else process.env.npm_package_version = PREV_NPM_PACKAGE_VERSION;
});

test("MCP initialize advertises the real package version without npm_package_version", async () => {
  const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const server = createMcpServer();
  const client = new Client({ name: "version-drift-test", version: "1.0.0" });
  await server.connect(serverTransport);
  await client.connect(clientTransport);

  // Public API: the serverInfo the server advertised during the initialize handshake.
  const advertised = client.getServerVersion();

  await client.close();
  await server.close();

  assert.equal(
    advertised?.version,
    APP_CONFIG.version,
    "MCP serverInfo must report the real version"
  );
  assert.notEqual(advertised?.version, "1.8.1", "must not ship the stale fallback literal");
});
