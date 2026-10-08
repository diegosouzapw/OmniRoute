/**
 * GET /api/combos/auto logs the variants it skips instead of failing silently.
 *
 * Each of the four variant families (named, template, suffix, family) builds
 * every entry from the same candidate pool. When one build fails the route
 * leaves that variant out of the list but must say so: a single warning line
 * per request names the skipped variants and the first error. With no failure
 * the route stays quiet and the payload matches the unfixed baseline.
 *
 * Failure injection poisons one scoring weight pack through the shared
 * modePacks module (plain mutable export, no module mock needed): every
 * variant resolves its weights from a pack synchronously, so a throwing pack
 * makes exactly the builds that use it fail while the rest succeed. The
 * offline pack only feeds the named variant, the reliability pack only the
 * tiered suffix variant, and the cost pack a template-only id.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skipped-variants-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "skipped-variants-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modePacks = await import("../../open-sse/services/autoCombo/modePacks.ts");
const combosAutoRoute = await import("../../src/app/api/combos/auto/route.ts");

const PACKS = modePacks.MODE_PACKS as Record<string, unknown>;
const SAVED_PACKS: Record<string, unknown> = {};
for (const key of Object.keys(PACKS)) SAVED_PACKS[key] = PACKS[key];

function poisonPack(pack: string, message: string): void {
  Object.defineProperty(PACKS, pack, {
    configurable: true,
    enumerable: true,
    get() {
      throw new Error(message);
    },
  });
}

function restorePacks(): void {
  for (const key of Object.keys(SAVED_PACKS)) {
    Object.defineProperty(PACKS, key, {
      configurable: true,
      enumerable: true,
      value: SAVED_PACKS[key],
      writable: true,
    });
  }
}

function watchWarnings(): { lines: string[]; stop: () => void } {
  const lines: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  return {
    lines,
    stop: () => {
      console.warn = original;
    },
  };
}

function skippedLines(lines: string[]): string[] {
  return lines.filter((line) => line.includes("auto combo variants skipped"));
}

async function callRoute(): Promise<{ status: number; combos: Array<{ id: string }> }> {
  const res = await combosAutoRoute.GET(new Request("http://localhost/api/combos/auto"));
  return { status: res.status, combos: (await res.json()).combos };
}

test.after(() => {
  restorePacks();
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

test("stays quiet when every variant builds", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  restorePacks();

  const watcher = watchWarnings();
  try {
    const { status, combos } = await callRoute();
    assert.equal(status, 200);
    assert.ok(combos.length > 1);
    assert.equal(skippedLines(watcher.lines).length, 0);
  } finally {
    watcher.stop();
  }
});

async function expectSkipped(pack: string, ids: string[], notIds: string[] = []): Promise<void> {
  await settingsDb.updateSettings({ requireLogin: false });
  restorePacks();
  const { combos: baseline } = await callRoute();
  for (const id of ids) assert.ok(baseline.map((combo) => combo.id).includes(id));

  poisonPack(pack, `injected failure for ${pack}`);
  const watcher = watchWarnings();
  try {
    const { status, combos } = await callRoute();
    const present = combos.map((combo) => combo.id);
    assert.equal(status, 200);
    for (const id of ids) assert.ok(!present.includes(id));
    for (const id of notIds) assert.ok(present.includes(id));
    const lines = skippedLines(watcher.lines);
    assert.equal(lines.length, 1);
    for (const id of ids) assert.equal(lines[0].split(id).length - 1, 1, `${id} named once`);
    assert.ok(lines[0].includes(`injected failure for ${pack}`));
  } finally {
    watcher.stop();
    restorePacks();
  }
}

test("logs one line naming the skipped named variant", async () => {
  // auto/offline is built by both the named and the template loop: still one mention.
  await expectSkipped("offline-friendly", ["auto/offline"], ["auto/fast"]);
});

test("logs one line naming the skipped template variant", async () => {
  await expectSkipped("cost-saver", ["auto/best-free"], ["auto/fast"]);
});

test("logs one line naming the skipped tiered suffix variant", async () => {
  await expectSkipped("reliability-first", ["auto/coding:reliable"], ["auto/coding:fast"]);
});

test("a variant that fails once and builds in a later loop is kept and not reported", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  restorePacks();
  let calls = 0;
  Object.defineProperty(PACKS, "offline-friendly", {
    configurable: true,
    enumerable: true,
    get() {
      calls += 1;
      if (calls === 1) throw new Error("transient failure");
      return SAVED_PACKS["offline-friendly"];
    },
  });
  const watcher = watchWarnings();
  try {
    const { combos } = await callRoute();
    assert.ok(combos.map((combo) => combo.id).includes("auto/offline"));
    assert.equal(skippedLines(watcher.lines).length, 0);
  } finally {
    watcher.stop();
    restorePacks();
  }
});

test("keeps the payload identical to the unfixed baseline", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  restorePacks();
  const { combos } = await callRoute();
  const ids = combos.map((combo) => combo.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes("auto/coding"));
  assert.ok(ids[0] === "auto");
});

test("logs the first error on a single bounded line", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  restorePacks();
  poisonPack("offline-friendly", `first\nsecond\tline ${"x".repeat(1000)}`);
  const watcher = watchWarnings();
  try {
    const { status } = await callRoute();
    assert.equal(status, 200);
    const lines = skippedLines(watcher.lines);
    assert.equal(lines.length, 1);
    assert.ok(!/[\r\n\t]/.test(lines[0]));
    assert.ok(lines[0].includes("first second line"));
    assert.ok(lines[0].length < 450);
  } finally {
    watcher.stop();
    restorePacks();
  }
});
