import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { createRequire } from "node:module";

import {
  getServerLifecyclePhase,
  markServerReady,
  markServerStopping,
} from "../../src/lib/serverLifecycle.ts";

const routeModule = await import("../../src/app/healthz/route.ts");
const require = createRequire(import.meta.url);
const { getMiddlewareMatchers } = require("next/dist/build/analysis/get-page-static-info.js");
const {
  getMiddlewareRouteMatcher,
} = require("next/dist/shared/lib/router/utils/middleware-route-matcher.js");

test("/healthz follows the native server lifecycle without static caching", async () => {
  assert.equal(routeModule.dynamic, "force-dynamic");
  assert.equal(getServerLifecyclePhase(), "starting");

  const starting = await routeModule.GET(new Request("http://localhost/healthz"));
  assert.equal(starting.status, 503);
  assert.equal(starting.headers.get("Cache-Control"), "no-store");
  assert.equal(starting.headers.get("Content-Type"), "text/plain; charset=utf-8");
  assert.equal(starting.headers.get("Content-Length"), "9");
  assert.equal(await starting.text(), "starting\n");

  markServerReady();
  const ready = await routeModule.GET(new Request("http://localhost/healthz"));
  assert.equal(ready.status, 200);
  assert.equal(ready.headers.get("Content-Length"), "3");
  assert.equal(await ready.text(), "ok\n");

  const readyHead = await routeModule.HEAD(
    new Request("http://localhost/healthz", { method: "HEAD" })
  );
  assert.equal(readyHead.status, 200);
  assert.equal(readyHead.headers.get("Content-Length"), "3");
  assert.equal(await readyHead.text(), "");

  markServerStopping();
  const stopping = await routeModule.GET(new Request("http://localhost/healthz"));
  assert.equal(stopping.status, 503);
  assert.equal(stopping.headers.get("Content-Length"), "9");
  assert.equal(await stopping.text(), "stopping\n");

  const stoppingHead = await routeModule.HEAD(
    new Request("http://localhost/healthz", { method: "HEAD" })
  );
  assert.equal(stoppingHead.status, 503);
  assert.equal(stoppingHead.headers.get("Content-Length"), "9");
  assert.equal(await stoppingHead.text(), "");

  markServerReady();
  assert.equal(getServerLifecyclePhase(), "stopping");
});

test("native startup and shutdown hooks drive the health lifecycle", () => {
  const startupSource = fs.readFileSync("src/instrumentation-node.ts", "utf8");
  const registerStart = startupSource.indexOf("export async function registerNodejs");
  const markStarting = startupSource.indexOf("markServerStarting();", registerStart);
  const firstStartupAwait = startupSource.indexOf("await ", registerStart);
  const markReady = startupSource.lastIndexOf("markServerReady();");

  assert.ok(markStarting > registerStart && markStarting < firstStartupAwait);
  assert.ok(markReady > firstStartupAwait);
  assert.equal(startupSource.slice(markReady).trim(), "markServerReady();\n}");

  const shutdownSource = fs.readFileSync("src/lib/gracefulShutdown.ts", "utf8");
  const drainingFlag = shutdownSource.indexOf("state.shuttingDown = true;");
  const markStopping = shutdownSource.indexOf("markServerStopping();", drainingFlag);
  const drainAwait = shutdownSource.indexOf("await waitForDrain();", drainingFlag);

  assert.ok(markStopping > drainingFlag && markStopping < drainAwait);
});

test("/healthz bypasses the centralized auth proxy matcher", () => {
  const proxySource = fs.readFileSync("src/proxy.ts", "utf8");
  const matcherBlock = proxySource.match(/matcher:\s*\[([\s\S]*?)\]/)?.[1];
  assert.ok(matcherBlock, "proxy matcher configuration must remain discoverable");

  const configuredMatchers = Array.from(
    matcherBlock.matchAll(/[\"']([^\"']+)[\"']/g),
    (match) => match[1]
  );
  const matcher = getMiddlewareRouteMatcher(getMiddlewareMatchers(configuredMatchers, "/"));

  assert.equal(matcher("/healthz", { headers: {} }), false);
  assert.equal(matcher("/api/system/version", { headers: {} }), true);
});
