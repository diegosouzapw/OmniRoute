import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
import type { ActivationDependencies } from "../../src/lib/services/managedProxy/manager.ts";

const sandbox = assertManagedFixture();
const { saveManagedProxy, managedEntries } =
  await import("../../src/lib/services/managedProxy/manager.ts");
const UUID = "11111111-1111-4111-8111-111111111111";
const sourceLink = `vless://${UUID}@example.invalid:443?security=tls`;
function snapshot(root: string) {
  return ["config.json", "sources.json", "activation.json"].map((name) =>
    fs.readFileSync(path.join(root, "singbox", name), "utf8")
  );
}
function fixture() {
  const root = fs.mkdtempSync(path.join(sandbox, "manager-"));
  const calls: string[] = [];
  let port = 24000;
  let running = false;
  const deps: ActivationDependencies = {
    install: async () => {
      calls.push("install");
      return "synthetic-binary";
    },
    check: async () => {
      calls.push("check");
    },
    start: async () => {
      calls.push("start");
      running = true;
    },
    stop: async () => {
      calls.push("stop");
      running = false;
    },
    allocate: async () => ++port,
    running: () => running,
  };
  return { root, calls, deps };
}
const input = { core: "singbox" as const, name: "first", sourceLink };
const commit = async (entry: { id: string; name: string; port: number; core: string }) => entry;

test(
  "save commits after readiness, encrypts source, preserves update identity and excludes both cores",
  { timeout: 3000 },
  async () => {
    const { root, calls, deps } = fixture();
    try {
      const first = await saveManagedProxy(input, commit, root, deps);
      assert.deepEqual(calls, ["install", "check", "stop", "start"]);
      const manifest = snapshot(root)[1];
      assert.ok(!manifest.includes(UUID));
      assert.ok(manifest.includes("enc:v1:"));
      let started = false;
      const updated = await saveManagedProxy(
        { ...input, id: first.id, name: "updated" },
        async (entry) => {
          assert.equal(started, true, "registry mutation must follow readiness");
          return entry;
        },
        root,
        {
          ...deps,
          allocate: async () => {
            throw new Error("Update must reuse its port");
          },
          start: async (...args) => {
            started = true;
            await deps.start(...args);
          },
        }
      );
      assert.equal(updated.id, first.id);
      assert.equal(updated.port, first.port);
      assert.deepEqual(managedEntries("singbox", root), [{ ...first, name: "updated" }]);
      fs.mkdirSync(path.join(root, "xray"));
      fs.writeFileSync(
        path.join(root, "xray", "sources.json"),
        JSON.stringify({
          version: 1,
          entries: [
            {
              id: "22222222-2222-4222-8222-222222222222",
              name: "opposite",
              port: 25000,
              sourceEnc: JSON.parse(manifest).entries[0].sourceEnc,
            },
          ],
        }),
        "utf8"
      );
      const next = await saveManagedProxy({ ...input, name: "second" }, commit, root, {
        ...deps,
        allocate: async (excluded) => {
          assert.ok(excluded.has(25000));
          assert.ok(excluded.has(first.port));
          return 25001;
        },
        start: async (...args) => {
          assert.deepEqual(
            args[3].map((listener) => listener.port),
            [first.port, 25001]
          );
          await deps.start(...args);
        },
      });
      assert.notEqual(next.id, first.id);
      assert.notEqual(next.port, first.port);
      assert.equal(managedEntries("singbox", root).length, 2);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
);

for (const stage of ["install", "check", "start", "commit"] as const) {
  for (const wasRunning of [false, true]) {
    test(
      `${stage} failure restores previous encrypted config and ${wasRunning ? "running" : "stopped"} state`,
      { timeout: 3000 },
      async () => {
        const { root, calls, deps } = fixture();
        try {
          const prior = await saveManagedProxy(input, commit, root, deps);
          if (!wasRunning) await deps.stop("singbox");
          const before = snapshot(root);
          calls.length = 0;
          let failedOnce = false;
          let committed = false;
          const nextDeps = { ...deps };
          if (stage !== "commit") {
            const fail = async () => {
              calls.push(`failed-${stage}`);
              if (!failedOnce) {
                failedOnce = true;
                throw new Error(`synthetic-${stage}`);
              }
              return "synthetic-binary";
            };
            if (stage === "install") nextDeps.install = fail;
            if (stage === "check")
              nextDeps.check = async () => {
                await fail();
              };
            if (stage === "start")
              nextDeps.start = async (...args) => {
                await fail();
                await deps.start(...args);
              };
          }
          await assert.rejects(
            saveManagedProxy(
              { ...input, id: prior.id, name: "replacement" },
              async () => {
                committed = true;
                throw new Error("synthetic-commit");
              },
              root,
              nextDeps
            ),
            new RegExp(`synthetic-${stage}`)
          );
          assert.equal(committed, stage === "commit");
          assert.deepEqual(snapshot(root), before);
          assert.equal(deps.running?.("singbox"), wasRunning);
          assert.deepEqual(managedEntries("singbox", root), [prior]);
          assert.ok(
            !fs
              .readdirSync(path.join(root, "singbox"))
              .some((name) => name.startsWith("candidate-"))
          );
          if (stage === "check" || stage === "install") assert.ok(!calls.includes("stop"));
        } finally {
          fs.rmSync(root, { recursive: true, force: true });
        }
      }
    );
  }
}

test(
  "unsupported input fails before installation and service paths remain local-only",
  { timeout: 2000 },
  async () => {
    const { root, deps, calls } = fixture();
    try {
      await assert.rejects(
        saveManagedProxy(
          { ...input, sourceLink: `${sourceLink}&allowInsecure=1` },
          commit,
          root,
          deps
        )
      );
      assert.deepEqual(calls, []);
      for (const file of [
        "src/server/authz/routeGuard.ts",
        "src/shared/constants/spawnCapablePrefixes.ts",
      ])
        assert.ok(
          fs.readFileSync(path.join(process.cwd(), file), "utf8").includes('"/api/services/"')
        );
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
);
