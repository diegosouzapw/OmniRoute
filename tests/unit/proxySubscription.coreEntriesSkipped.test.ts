/**
 * Entries skipped during generation surface as a dedicated warning.
 *
 * A generation that drops entries (bad listener lines, unusable nodes,
 * pruned nodes the core check rejects, shaped nodes the renderer drops)
 * warns once with CORE_CONFIG_ENTRIES_SKIPPED and a counts-only detail;
 * a clean generation stays silent (null warning).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const syncMod = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
import type { RunCheck } from "../../src/lib/proxySubscription/coreConfig/apply.ts";

const { generateCoreConfigIntention } = syncMod;

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

function setup(): { dir: string; target: string; binary: string } {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-skipped-"));
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const binary = path.join(dir, "sing-box");
  fs.writeFileSync(binary, "#!/bin/sh\nexit 1\n");
  fs.chmodSync(binary, 0o755);
  return { dir, target, binary };
}

function rejecting(victims: string[]): RunCheck {
  return async (_bin, args) => {
    const candidate = args[args.length - 1];
    const outbounds = JSON.parse(fs.readFileSync(candidate, "utf8")).outbounds as Array<{
      tag: string;
    }>;
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

async function verifiedWarning(
  target: string,
  binary: string,
  victims: string[]
): Promise<string | null> {
  process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = binary;
  try {
    return (
      await generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS, id: "s-skipped" },
        feed(["node-a", "node-b", "node-c"]) as never,
        { runCheck: rejecting(victims) }
      )
    ).warning;
  } finally {
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
  }
}

test("one pruned node warns with the dedicated code and count 1", async (t) => {
  const { dir, target, binary } = setup();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const warning = await verifiedWarning(target, binary, ["node-b"]);
  assert.ok(warning?.includes("CORE_CONFIG_ENTRIES_SKIPPED"), `got: ${warning}`);
  const parsed = JSON.parse(warning!);
  assert.equal(parsed.code, "CORE_CONFIG_ENTRIES_SKIPPED");
  assert.equal(parsed.detail, "skipped:1:core_rejected=1");
});

test("beside path merges model and render skips with an exact detail", async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-mixed-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const cap: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => void cap.push(args.map(String).join(" "));
  try {
    const warning = await generateCoreConfigIntention(
      {
        coreConfigPath: target,
        localCoreEndpoint:
          "socks5://127.0.0.1:1080 selector=g1\nsocks5://127.0.0.1:1081 selector=g2\nhttp://192.168.1.10:8080 selector=lan",
      },
      {
        nodes: [],
        needsCore: [
          {
            name: "shared",
            source: { kind: "uri", value: "vless://u@10.9.0.1:443#shared" },
          },
        ] as never[],
        format: "lines",
      }
    );
    assert.ok(warning.warning?.includes("CORE_CONFIG_ENTRIES_SKIPPED"), `got: ${warning.warning}`);
    const parsed = JSON.parse(warning.warning!);
    assert.equal(
      parsed.detail,
      "skipped:4:empty_group=2,invalid_endpoint=1,source_not_singbox_shape=1"
    );
    assert.equal(cap.length, 1);
    assert.ok(cap[0].includes("empty_group=2"));
    assert.ok(cap[0].includes("invalid_endpoint=1"));
    assert.ok(cap[0].includes("source_not_singbox_shape=1"));
  } finally {
    console.warn = orig;
  }
});

test("verified path keeps the same detail as the beside path", async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-verified-parity-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const binary = path.join(dir, "sing-box");
  fs.writeFileSync(binary, "#!/bin/sh\nexit 0\n");
  fs.chmodSync(binary, 0o755);
  process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = binary;
  try {
    const intention = await generateCoreConfigIntention(
      {
        coreConfigPath: target,
        localCoreEndpoint:
          "socks5://127.0.0.1:1080 selector=g1\nsocks5://127.0.0.1:1081 selector=g2\nhttp://192.168.1.10:8080 selector=lan",
        id: "s-parity",
      },
      {
        nodes: [],
        needsCore: [
          {
            name: "shared",
            source: { kind: "uri", value: "vless://u@10.9.0.1:443#shared" },
          },
        ] as never[],
        format: "lines",
      },
      { runCheck: async () => ({ stdout: "", stderr: "" }) }
    );
    assert.ok(
      intention.warning?.includes("CORE_CONFIG_ENTRIES_SKIPPED"),
      `got: ${intention.warning}`
    );
    // model.skipped is the array already spread into initialSkipped. Counting
    // both reports 6 (empty_group=3, invalid_endpoint=2) instead of 4.
    assert.equal(
      JSON.parse(intention.warning!).detail,
      "skipped:4:empty_group=2,invalid_endpoint=1,source_not_singbox_shape=1",
      "model.skipped is already inside initialSkipped; the warning must not count it twice"
    );
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
    const beside = await generateCoreConfigIntention(
      {
        coreConfigPath: path.join(dir, "core-beside.json"),
        localCoreEndpoint:
          "socks5://127.0.0.1:1080 selector=g1\nsocks5://127.0.0.1:1081 selector=g2\nhttp://192.168.1.10:8080 selector=lan",
      },
      {
        nodes: [],
        needsCore: [
          {
            name: "shared",
            source: { kind: "uri", value: "vless://u@10.9.0.1:443#shared" },
          },
        ] as never[],
        format: "lines",
      }
    );
    assert.equal(JSON.parse(beside.warning!).detail, JSON.parse(intention.warning!).detail);
  } finally {
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
  }
});

test("clean generation stays silent", async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-clean-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const cap: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => void cap.push(args.map(String).join(" "));
  try {
    const warning = (
      await generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
        feed(["node-a", "node-b", "node-c"]) as never
      )
    ).warning;
    assert.equal(warning, null);
    assert.equal(cap.length, 0);
  } finally {
    console.warn = orig;
  }
});

test("rendered message shows the fixed phrase with the raw counts beside it", () => {
  const dir = new URL("../../src/i18n/messages/", import.meta.url);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 60, `expected the full locale set, got ${files.length}`);
  const failures: string[] = [];
  for (const file of files) {
    const parsed = JSON.parse(
      fs.readFileSync(new URL(`../../src/i18n/messages/${file}`, import.meta.url), "utf8")
    );
    const value = parsed?.settings?.proxySubscription?.error?.CORE_CONFIG_ENTRIES_SKIPPED;
    if (typeof value !== "string" || value.length === 0) {
      failures.push(`${file}: CORE_CONFIG_ENTRIES_SKIPPED missing`);
    } else if (value.includes("{count") || value.includes("{dominant")) {
      failures.push(`${file}: message still takes parameters the screen never passes`);
    }
  }
  assert.deepEqual(failures, [], `invalid messages:\n${failures.join("\n")}`);
  const en = JSON.parse(
    fs.readFileSync(new URL("../../src/i18n/messages/en.json", import.meta.url), "utf8")
  );
  assert.equal(
    en.settings.proxySubscription.error.CORE_CONFIG_ENTRIES_SKIPPED,
    "Some entries were skipped during generation. See the server log."
  );
});
