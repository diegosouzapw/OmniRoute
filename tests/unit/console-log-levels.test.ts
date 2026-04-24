import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_LOG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-console-log-levels-"));
const TEST_LOG_PATH = path.join(TEST_LOG_DIR, "app.log");

const originalLogFilePath = process.env.APP_LOG_FILE_PATH;
process.env.APP_LOG_FILE_PATH = TEST_LOG_PATH;

const route = await import("../../src/app/api/logs/console/route.ts");

test.after(() => {
  if (originalLogFilePath === undefined) {
    delete process.env.APP_LOG_FILE_PATH;
  } else {
    process.env.APP_LOG_FILE_PATH = originalLogFilePath;
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
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.map((entry) => entry.level),
    ["info", "warn"]
  );
});

test("console log API filters by component, time window, and result limit", async () => {
  fs.writeFileSync(
    TEST_LOG_PATH,
    [
      JSON.stringify({
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        level: "warn",
        component: "router",
        msg: "too old",
      }),
      "not-json",
      JSON.stringify({
        time: new Date().toISOString(),
        level: "debug",
        component: "router",
        msg: "below level",
      }),
      JSON.stringify({
        time: new Date().toISOString(),
        level: "error",
        component: "router-core",
        msg: "match one",
      }),
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "fatal",
        module: "router-worker",
        msg: "match two",
      }),
    ].join("\n") + "\n",
    "utf8"
  );

  const response = await route.GET(
    new Request("http://localhost/api/logs/console?level=warn&component=router&limit=1")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.length, 1);
  assert.equal(body[0].level, "fatal");
  assert.equal(body[0].timestamp !== undefined, true);
});

test("console log API returns an empty list for a missing file and surfaces read errors", async () => {
  fs.rmSync(TEST_LOG_PATH, { force: true });

  const missingResponse = await route.GET(new Request("http://localhost/api/logs/console"));
  assert.equal(missingResponse.status, 200);
  assert.deepEqual(await missingResponse.json(), []);

  const brokenPath = path.join(TEST_LOG_DIR, "dir-log");
  fs.mkdirSync(brokenPath, { recursive: true });
  process.env.APP_LOG_FILE_PATH = brokenPath;

  try {
    const brokenResponse = await route.GET(new Request("http://localhost/api/logs/console"));
    assert.equal(brokenResponse.status, 500);
    const payload = (await brokenResponse.json()) as any;
    assert.equal(typeof payload.error, "string");
    assert.equal(payload.error.length > 0, true);
  } finally {
    process.env.APP_LOG_FILE_PATH = TEST_LOG_PATH;
  }
});
