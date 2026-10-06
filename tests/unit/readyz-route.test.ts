import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";

import {
  markServerStarting,
  markServerReady,
  markServerStopping,
} from "../../src/lib/serverLifecycle.ts";

const readyz = await import("../../src/app/readyz/route.ts");
const healthz = await import("../../src/app/healthz/route.ts");

test("/readyz matches /healthz lifecycle for GET and HEAD", async () => {
  assert.equal(readyz.dynamic, "force-dynamic");
  markServerStarting();

  const startingReady = await readyz.GET();
  const startingHealth = await healthz.GET();
  assert.equal(startingReady.status, 503);
  assert.equal(startingHealth.status, 503);
  assert.equal(await startingReady.text(), "starting\n");
  assert.equal(await startingHealth.text(), "starting\n");

  markServerReady();
  const ready = await readyz.GET();
  assert.equal(ready.status, 200);
  assert.equal(ready.headers.get("Cache-Control"), "no-store");
  assert.equal(ready.headers.get("Content-Type"), "text/plain; charset=utf-8");
  assert.equal(await ready.text(), "ok\n");

  const readyHead = await readyz.HEAD();
  assert.equal(readyHead.status, 200);
  assert.equal(await readyHead.text(), "");

  markServerStopping();
  const stopping = await readyz.GET();
  assert.equal(stopping.status, 503);
  assert.equal(await stopping.text(), "stopping\n");
  const stoppingHealth = await healthz.GET();
  assert.equal(stoppingHealth.status, 503);
});

test("/readyz is omitted from the centralized auth proxy matcher", () => {
  const proxySource = fs.readFileSync("src/proxy.ts", "utf8");
  const matcherBlock = proxySource.match(/matcher:\s*\[([\s\S]*?)\]/)?.[1];
  assert.ok(matcherBlock, "proxy matcher configuration must remain discoverable");
  assert.equal(/["']\/readyz/.test(matcherBlock), false);
  assert.equal(/["']\/healthz/.test(matcherBlock), false);
});

test("/readyz re-exports the /healthz handlers and declares its route config locally", () => {
  const source = fs.readFileSync("src/app/readyz/route.ts", "utf8");
  assert.match(source, /from ["']\.\.\/healthz\/route["']/);
  assert.match(source, /export const dynamic = ["']force-dynamic["']/);
  assert.doesNotMatch(source, /export\s*\{[^}]*\bdynamic\b[^}]*\}\s*from/);
  assert.equal(/monitoring/i.test(source), false);
  assert.equal(/sqlite/i.test(source), false);
});
