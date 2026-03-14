import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_LOG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-console-log-levels-"));
const TEST_LOG_PATH = path.join(TEST_LOG_DIR, "app.log");

const originalLogFilePath = process.env.LOG_FILE_PATH;
process.env.LOG_FILE_PATH = TEST_LOG_PATH;

const route = await import("../../src/app/api/logs/console/route.ts");

test.after(() => {
  if (originalLogFilePath === undefined) {
    delete process.env.LOG_FILE_PATH;
  } else {
    process.env.LOG_FILE_PATH = originalLogFilePath;
  }
  fs.rmSync(TEST_LOG_DIR, { recursive: true, force: true });
});

test("console log API normalizes numeric pino levels correctly", async () => {
  fs.writeFileSync(
    TEST_LOG_PATH,
    [
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 30,
        module: "probe",
        msg: "info entry",
      }),
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 40,
        module: "probe",
        msg: "warn entry",
      }),
    ].join("\n") + "\n",
    "utf8"
  );

  const response = await route.GET(
    new Request("http://localhost/api/logs/console?level=info&limit=10")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.map((entry) => entry.level),
    ["info", "warn"]
  );
});
