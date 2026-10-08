/**
 * Regression for the agent-card version drift (OmniRoute deep review, 2026-09-29).
 *
 * The two A2A agent-card routes resolved their advertised version as
 * `process.env.npm_package_version || "1.8.1"`. The published CLI (`omniroute
 * serve`) is NOT launched through an npm script, so `npm_package_version` is
 * unset at runtime and the stale `"1.8.1"` literal shipped while the real
 * package was 3.8.x. The card must resolve the authoritative version from
 * package.json (APP_CONFIG.version) regardless of how the process was launched.
 *
 * The env var is deleted at module scope, BEFORE either route is imported, so
 * the module-load-time version constant resolves under the CLI launch path and
 * the test reproduces the real defect independent of the test runner.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import type { NextRequest } from "next/server";
import { APP_CONFIG } from "../../src/shared/constants/appConfig.ts";

const PREV_NPM_PACKAGE_VERSION = process.env.npm_package_version;
delete process.env.npm_package_version;

after(() => {
  // Restore the global so deleting it does not leak into other tests in the process.
  if (PREV_NPM_PACKAGE_VERSION === undefined) delete process.env.npm_package_version;
  else process.env.npm_package_version = PREV_NPM_PACKAGE_VERSION;
});

function makeCardRequest(url: string): NextRequest {
  const request = new Request(url) as unknown as NextRequest;
  Object.defineProperty(request, "nextUrl", { value: new URL(url), configurable: true });
  return request;
}

test("agent.json advertises the real package version without npm_package_version", async () => {
  const { GET } = await import("../../src/app/.well-known/agent.json/route.js");
  const response = await GET(makeCardRequest("https://gateway.example.com/.well-known/agent.json"));
  const body = (await response.json()) as { version: string };
  assert.equal(body.version, APP_CONFIG.version, "card must report the real package version");
  assert.notEqual(body.version, "1.8.1", "must not ship the stale fallback literal");
});

test("agent-card.json advertises the real package version without npm_package_version", async () => {
  const { GET } = await import("../../src/app/.well-known/agent-card.json/route.js");
  const response = await GET(
    makeCardRequest("https://gateway.example.com/.well-known/agent-card.json")
  );
  const body = (await response.json()) as { version: string };
  assert.equal(body.version, APP_CONFIG.version, "card must report the real package version");
  assert.notEqual(body.version, "1.8.1", "must not ship the stale fallback literal");
});
