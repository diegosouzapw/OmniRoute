import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-export-bun-"));
process.env.DATA_DIR = dir;
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-bun-export-key";
const core = await import("../../src/lib/db/core.ts");
const dbDest = await import("../../src/lib/db/logExportDestinations.ts");
const runner = await import("../../src/lib/logExport/runner.ts");
const secrets = await import("../../src/lib/logExport/secrets.ts");
const fixture = await import("./fixtures/logExportTestDestination.ts");

test.after(() => {
  runner.__setLogExportChildOptionsForTest(null);
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("R4 Bun compatibility exports in-process, warns once, and preserves send-failure cursor", async () => {
  fixture.register();
  const db = core.getDbInstance();
  for (let i = 0; i < 6; i++)
    db.prepare("INSERT INTO call_logs (id, timestamp, status) VALUES (?, ?, 200)").run(
      `bun-${i}`,
      "2026-10-13T00:00:00Z"
    );
  const originalBun = Object.getOwnPropertyDescriptor(process.versions, "bun");
  if (!originalBun)
    Object.defineProperty(process.versions, "bun", {
      configurable: true,
      value: "simulated-bun-selection",
    });
  const warnings: string[] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.join(" "));
  let spawned = false;
  runner.__setLogExportChildOptionsForTest({
    modulePath: path.join(import.meta.dirname, "fixtures/logExportTestDestination.ts"),
    onSpawn: () => {
      spawned = true;
    },
  });
  try {
    for (const mode of ["records", "fail"]) {
      const output = path.join(dir, `${mode}.jsonl`);
      const dest = dbDest.createLogExportDestination({
        name: "Bun fixture",
        type: fixture.testDestination.id,
        enabled: true,
        batchSize: 2,
        maxRowsPerRun: 10,
        includeBodies: false,
        config: secrets.encryptDestinationConfig(fixture.testDestination.id, {
          secret: "synthetic-bun-secret",
          mode,
          output,
        }),
      });
      const result = await runner.runDestinationExport(dest);
      assert.equal(result.success, mode === "records", result.error ?? "");
      assert.equal(result.exported, mode === "records" ? 6 : 2);
      assert.equal(
        dbDest.getLogExportDestination(dest.id)?.cursorRowId,
        mode === "records" ? 6 : 2
      );
      assert.equal(result.error?.includes("synthetic-bun-secret") ?? false, false);
      const info = JSON.parse(fs.readFileSync(`${output}.process`, "utf8")) as { pid: number };
      assert.equal(info.pid, process.pid, "must reuse the previous in-process path under Bun");
    }
    assert.equal(spawned, false);
    assert.equal(
      warnings.filter((message) => message.includes("Bun compatibility mode")).length,
      1
    );
    assert.match(warnings.join("\n"), /isolation is unavailable/);
  } finally {
    console.warn = warn;
    if (!originalBun) Reflect.deleteProperty(process.versions, "bun");
  }
});
