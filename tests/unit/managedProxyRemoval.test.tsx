// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { expect, test, vi } from "vitest";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
const sandbox = assertManagedFixture();
const state = vi.hoisted(() => ({
  running: false,
  calls: [] as string[],
  failCheck: false,
  failStart: false,
}));
vi.mock("../../src/lib/services/managedProxy/runtime", () => ({
  isManagedRunning: () => state.running,
  checkNative: async () => {
    state.calls.push("check");
    if (state.failCheck) throw new Error("synthetic-check");
  },
  startManaged: async () => {
    state.calls.push("start");
    if (state.failStart) {
      state.failStart = false;
      throw new Error("synthetic-start");
    }
    state.running = true;
  },
  stopManaged: async () => {
    state.calls.push("stop");
    state.running = false;
  },
}));
vi.mock("../../src/lib/services/managedProxy/install", () => ({
  installManagedCore: async (_core: string, _root: string, allowDownload: boolean) => {
    expect(allowDownload).toBe(false);
    state.calls.push("existing-binary");
    return "synthetic-binary";
  },
}));
const { saveManagedProxy, managedEntries } =
  await import("../../src/lib/services/managedProxy/manager");
const { removeManagedProxy } = await import("../../src/lib/services/managedProxy/remove");
const sourceLink = "vless://11111111-1111-4111-8111-111111111111@example.invalid:443?security=tls";
async function fixture() {
  const root = fs.mkdtempSync(path.join(sandbox, "remove-"));
  let port = 24000;
  const deps = {
    install: async () => "synthetic-binary",
    check: async () => {},
    start: async () => {},
    stop: async () => {},
    allocate: async () => ++port,
    running: () => false,
  };
  const first = await saveManagedProxy(
    { core: "singbox", name: "first", sourceLink },
    async (entry) => entry,
    root,
    deps
  );
  const second = await saveManagedProxy(
    { core: "singbox", name: "second", sourceLink },
    async (entry) => entry,
    root,
    deps
  );
  return { root, first, second };
}
function snapshot(root: string) {
  return ["sources.json", "config.json"].map((name) =>
    fs.readFileSync(path.join(root, "singbox", name), "utf8")
  );
}

for (const running of [false, true]) {
  test(`delete rebuilds remaining listeners without download and preserves ${running ? "running" : "stopped"} state`, async () => {
    const { root, first, second } = await fixture();
    Object.assign(state, { running, calls: [], failCheck: false, failStart: false });
    try {
      let committed = false;
      await removeManagedProxy(
        "singbox",
        first.id,
        async () => {
          committed = true;
        },
        root
      );
      expect(committed).toBe(true);
      expect(managedEntries("singbox", root)).toEqual([second]);
      expect(state.running).toBe(running);
      expect(state.calls).toEqual(
        running ? ["existing-binary", "check", "stop", "start"] : ["stop"]
      );
      const config = JSON.parse(fs.readFileSync(path.join(root, "singbox", "config.json"), "utf8"));
      expect(config.inbounds).toHaveLength(1);
      expect(config.inbounds[0].listen_port).toBe(second.port);
      await removeManagedProxy("singbox", second.id, async () => {}, root);
      expect(managedEntries("singbox", root)).toEqual([]);
      expect(fs.existsSync(path.join(root, "singbox", "config.json"))).toBe(false);
      expect(state.running).toBe(false);
      expect(fs.existsSync(path.join(root, "singbox", "delete-candidate.json"))).toBe(false);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }, 5000);
}

for (const stage of ["check", "start", "commit"] as const) {
  test(`delete ${stage} failure restores sources/config and prior running process`, async () => {
    const { root, first, second } = await fixture();
    Object.assign(state, {
      running: true,
      calls: [],
      failCheck: stage === "check",
      failStart: stage === "start",
    });
    const before = snapshot(root);
    try {
      await expect(
        removeManagedProxy(
          "singbox",
          first.id,
          async () => {
            if (stage === "commit") throw new Error("synthetic-commit");
          },
          root
        )
      ).rejects.toThrow(`synthetic-${stage}`);
      expect(snapshot(root)).toEqual(before);
      expect(managedEntries("singbox", root)).toEqual([first, second]);
      expect(state.running).toBe(true);
      expect(fs.existsSync(path.join(root, "singbox", "delete-candidate.json"))).toBe(false);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }, 5000);
}
