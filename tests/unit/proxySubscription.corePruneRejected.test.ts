/**
 * Core verification prunes rejected nodes: when the native check names an
 * offending node, the node is dropped, the candidate is re-rendered and the
 * check runs again (bounded); anything else keeps the previous behaviour
 * (warning, adopted file untouched).
 *
 * The check runner is injected (never the real binary). The only
 * adapter-shaped strings below live in the small stub helper marked as such:
 * the rejection token shape is owned by the sing-box adapter
 * (see `resolveOffendingTag`); every assertion uses core/node language.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const syncMod = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
const renderersMod = await import("../../src/lib/proxySubscription/coreConfig/renderers.ts");
const adapterMod = await import("../../src/lib/proxySubscription/coreConfig/singbox.ts");
import type { RunCheck } from "../../src/lib/proxySubscription/coreConfig/apply.ts";

const { generateCoreConfigIntention, MAX_PRUNE_ATTEMPTS } = syncMod;
const { OFFENDING_RESOLVERS, DEFAULT_CORE } = renderersMod;
const { resolveOffendingTag } = adapterMod;

const ENDPOINTS = "socks5://127.0.0.1:1080 selector=a\nsocks5://127.0.0.1:1081 selector=b";

function feed(names: string[]): { nodes: never[]; needsCore: never[]; format: string } {
  return {
    nodes: [],
    needsCore: names.map((name, i) => ({
      name,
      source: {
        kind: "object" as const,
        value: { type: "vless", server: `203.0.113.${i + 1}`, server_port: 443, uuid: `u-${i}` },
      },
    })) as never[],
    format: "v2ray-json",
  };
}

function setup(): { dir: string; target: string; binary: string; before: Buffer } {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-prune-"));
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const binary = path.join(dir, "sing-box");
  fs.writeFileSync(binary, "#!/bin/sh\nexit 1\n");
  fs.chmodSync(binary, 0o755);
  return { dir, target, binary, before: fs.readFileSync(target) };
}

/**
 * Adapter-token stub (see module header): fails the check while any victim
 * node is still rendered, naming its position with the adapter's token;
 * passes once every victim is gone. A victim-free error fakes a rejection
 * the core cannot attribute; an out-of-range position fakes one the table
 * does not own.
 */
function rejecting(
  victims: string[],
  calls: string[][],
  opts?: { freeError?: string; foreignPosition?: number }
): RunCheck {
  return async (_bin, args) => {
    calls.push(args);
    const candidate = args[args.length - 1];
    const outbounds = JSON.parse(fs.readFileSync(candidate, "utf8")).outbounds as Array<{
      tag: string;
    }>;
    if (opts?.freeError) {
      throw Object.assign(new Error("Command failed"), { stderr: opts.freeError });
    }
    if (opts?.foreignPosition !== undefined) {
      throw Object.assign(new Error("Command failed"), {
        stderr: `FATAL initialize outbound[${opts.foreignPosition}]: rejected field value`,
      });
    }
    for (const victim of victims) {
      const index = outbounds.findIndex((o) => o.tag.startsWith(`omniroute-${victim}`));
      if (index >= 0) {
        throw Object.assign(new Error("Command failed"), {
          stderr: `FATAL initialize outbound[${index}]: rejected field value`,
        });
      }
    }
    return { stdout: "", stderr: "" };
  };
}

function nodeTags(target: string): string[] {
  const outbounds = JSON.parse(fs.readFileSync(target, "utf8")).outbounds as Array<{
    tag: string;
  }>;
  return outbounds
    .map((o) => o.tag)
    .filter((t) => t.startsWith("omniroute-node-"))
    .map((t) => t.replace(/-[0-9a-f]{6}(-\d+)?$/, ""));
}

async function sub(
  target: string,
  binary: string,
  runCheck: RunCheck,
  maxPruneAttempts?: number
): Promise<string | null> {
  process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = binary;
  try {
    return (
      await generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS, id: "s-prune" },
        feed(["node-a", "node-b", "node-c"]) as never,
        { runCheck, ...(maxPruneAttempts !== undefined ? { maxPruneAttempts } : {}) }
      )
    ).warning;
  } finally {
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
  }
}

test("rejected node is pruned and the check runs again (one rejection)", async (t) => {
  const { dir, target, binary, before } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const calls: string[][] = [];
  const warning = await sub(target, binary, rejecting(["node-b"], calls));
  assert.ok(warning?.includes("pruned:1:core_rejected"), `got: ${warning}`);
  assert.deepEqual(nodeTags(target).sort(), ["omniroute-node-a", "omniroute-node-c"]);
  assert.ok(!fs.readFileSync(target, "utf8").includes("omniroute-node-b"));
  assert.equal(calls.length, 2);
  void before;
});

test("two rejections take two rounds", async (t) => {
  const { dir, target, binary } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const calls: string[][] = [];
  const warning = await sub(target, binary, rejecting(["node-a", "node-c"], calls));
  assert.ok(warning?.includes("pruned:2:core_rejected"), `got: ${warning}`);
  assert.deepEqual(nodeTags(target), ["omniroute-node-b"]);
  assert.equal(calls.length, 3);
});

test("attempt bound keeps the previous behaviour", async (t) => {
  const { dir, target, binary, before } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const calls: string[][] = [];
  const warning = await sub(target, binary, rejecting(["node-a", "node-b"], calls), 1);
  assert.ok(warning?.includes("check_failed"), `got: ${warning}`);
  assert.ok(!warning?.includes("pruned:"));
  assert.deepEqual(fs.readFileSync(target), before);
  assert.equal(calls.length, 2);
});

test("rejection without a named node keeps the previous behaviour", async (t) => {
  const { dir, target, binary, before } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const calls: string[][] = [];
  const warning = await sub(
    target,
    binary,
    rejecting([], calls, { freeError: "FATAL: configuration missing" })
  );
  assert.ok(warning?.includes("check_failed"), `got: ${warning}`);
  assert.deepEqual(fs.readFileSync(target), before);
  assert.equal(calls.length, 1);
});

test("rejection naming a position the table does not own keeps the previous behaviour", async (t) => {
  const { dir, target, binary, before } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const calls: string[][] = [];
  const warning = await sub(target, binary, rejecting([], calls, { foreignPosition: 99 }));
  assert.ok(warning?.includes("check_failed"), `got: ${warning}`);
  assert.deepEqual(fs.readFileSync(target), before);
  assert.equal(calls.length, 1);
});

test("pruning every node stops before an empty render (adopted file intact)", async (t) => {
  const { dir, target, binary, before } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const calls: string[][] = [];
  const warning = await sub(target, binary, rejecting(["node-a", "node-b", "node-c"], calls));
  assert.ok(warning?.includes("check_failed"), `got: ${warning}`);
  assert.deepEqual(fs.readFileSync(target), before);
  assert.equal(calls.length, 3);
});

test("prune budget defaults to eight", () => {
  assert.equal(MAX_PRUNE_ATTEMPTS, 8);
});

test("core registry resolves through the default core adapter", () => {
  assert.equal(OFFENDING_RESOLVERS[DEFAULT_CORE], resolveOffendingTag);
});

test("adapter maps the first named position to the owned node tag", () => {
  const table = [null, "node-b", "node-c"];
  const mark = resolveOffendingTag("FATAL initialize outbound[1]: rejected field value", table);
  assert.equal(mark?.tag, "node-b");
});

test("adapter ignores unowned positions, unknown indexes and free errors", () => {
  const table: Array<string | null> = [null, "node-b"];
  assert.equal(resolveOffendingTag("FATAL initialize outbound[0]: rejected", table), null);
  assert.equal(resolveOffendingTag("FATAL initialize outbound[7]: rejected", table), null);
  assert.equal(resolveOffendingTag("FATAL: configuration missing", table), null);
  const first = resolveOffendingTag("outbound[1] then outbound[0]", table);
  assert.equal(first?.tag, "node-b");
});
