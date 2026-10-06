import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * POST /api/cli-tools/apply writes host CLI config files. Inside a container
 * with no bind mount that write is thrown away with the container, so the route
 * must refuse with a structured 422 instead of reporting success.
 */

const routePath = path.join(process.cwd(), "src/app/api/cli-tools/apply/route.ts");
const originalEnv = { ...process.env };
const tempDirs = new Set<string>();

async function importRoute(label: string) {
  return import(`${pathToFileURL(routePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

test.afterEach(restoreEnv);

// The auth guard reads settings, which opens the SQLite singleton. Releasing it
// before the temp dirs go away keeps the node:test runner from hanging on an
// open handle (see AGENTS.md → "Database Handles in Tests").
test.after(async () => {
  try {
    const { resetDbInstance } = await import("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {
    // the DB was never opened
  }
  for (const dir of tempDirs)
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function applyRequest(body: Record<string, unknown>) {
  return new Request("http://localhost:20128/api/cli-tools/apply", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ toolId: "codex", apiKey: "sk-test", ...body }),
  });
}

test("refuses with 422 and does not write when the target is container-ephemeral", async () => {
  // OMNIROUTE_CONTAINER forces detection; the fake HOME has no bind mount, so
  // the target classifies as ephemeral.
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-apply-ephemeral-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "1";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;
  delete process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;

  const { POST } = await importRoute("ephemeral");
  const response = await POST(applyRequest({}));

  assert.equal(response.status, 422);
  const body = await response.json();
  assert.equal(body.containerEphemeralTarget, true);
  assert.equal(body.hostSetupCommand, "omniroute setup-codex");
  assert.match(body.error, /Refusing to write/);
  assert.match(body.error, /omniroute connect/);
  // Nothing may hit disk.
  assert.equal(fs.existsSync(path.join(fakeHome, ".codex")), false);
});

test("the 422 body carries no stack trace", async () => {
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-apply-stack-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "1";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;

  const { POST } = await importRoute("nostack");
  const body = await (await POST(applyRequest({}))).json();

  assert.ok(!body.error.includes("at /"), "error must not leak a stack trace");
  assert.ok(!body.error.includes(".ts:"), "error must not leak source locations");
});

test("dry-run still previews the config inside a container", async () => {
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-apply-dry-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "1";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;

  const { POST } = await importRoute("dryrun");
  const response = await POST(applyRequest({ dryRun: true }));

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.dryRun, true);
});

test("OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE lets the write through", async () => {
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-apply-override-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "1";
  process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = "true";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;

  const { POST } = await importRoute("override");
  const response = await POST(applyRequest({}));

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.ok(fs.existsSync(body.configPath), `expected ${body.configPath} to be written`);
});

test("the dashboard's guide-settings writer refuses the same way", async () => {
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-guide-ephemeral-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "1";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;
  delete process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;

  const guideRoute = path.join(
    process.cwd(),
    "src/app/api/cli-tools/guide-settings/[toolId]/route.ts"
  );
  const { POST } = await import(`${pathToFileURL(guideRoute).href}?case=guide-${Date.now()}`);

  const response = await POST(
    new Request("http://localhost:20128/api/cli-tools/guide-settings/continue", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ baseUrl: "http://localhost:20128/v1", model: "glm/glm-5.2" }),
    }),
    { params: Promise.resolve({ toolId: "continue" }) }
  );

  assert.equal(response.status, 422);
  const body = await response.json();
  assert.equal(body.containerEphemeralTarget, true);
  assert.equal(body.hostSetupCommand, "omniroute setup-continue");
  assert.equal(fs.existsSync(path.join(fakeHome, ".continue")), false);
});

test("a host environment applies the config normally", async () => {
  const fakeHome = fs.mkdtempSync(path.join(os.tmpdir(), "or-apply-host-"));
  tempDirs.add(fakeHome);
  process.env.OMNIROUTE_CONTAINER = "0";
  process.env.HOME = fakeHome;
  process.env.USERPROFILE = fakeHome;

  const { POST } = await importRoute("host");
  const response = await POST(applyRequest({}));

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
});
