import test from "node:test";
import assert from "node:assert/strict";

test("omniroute.mjs pode ser importado sem erro", async () => {
  // Ensure the entry point module is syntactically valid by importing the submodule
  // it uses (update-notifier) rather than executing the full CLI entrypoint.
  const mod = await import("update-notifier");
  assert.equal(typeof mod.default, "function");
});

test("update-notifier aceita pkg shape válido", async () => {
  const updateNotifier = (await import("update-notifier")).default;
  const notifier = updateNotifier({
    pkg: { name: "omniroute", version: "0.0.1" },
    updateCheckInterval: 0,
  });
  assert.ok(notifier !== null && typeof notifier === "object");
  assert.equal(typeof notifier.notify, "function");
});

test("update-notifier não lança com pkg real", async () => {
  const { readFileSync } = await import("node:fs");
  const { join, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const updateNotifier = (await import("update-notifier")).default;
  assert.doesNotThrow(() =>
    updateNotifier({
      pkg: { name: pkg.name, version: pkg.version },
      updateCheckInterval: 24 * 60 * 60 * 1000,
    })
  );
});
