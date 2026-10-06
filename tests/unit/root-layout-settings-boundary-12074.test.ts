import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-layout-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const core = await import("../../src/lib/db/core.ts");
const { getRootLayoutSettings } = await import("../../src/lib/db/rootLayoutSettings.ts");

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
  delete process.env.INITIAL_PASSWORD;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("root layout imports the read-only settings leaf", () => {
  const layoutSource = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf8");
  const leafSource = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/rootLayoutSettings.ts"),
    "utf8"
  );
  const coreSource = fs.readFileSync(path.join(process.cwd(), "src/lib/db/core.ts"), "utf8");
  const singletonSource = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/singleton.ts"),
    "utf8"
  );

  assert.match(
    layoutSource,
    /import \{ getRootLayoutSettings \} from "@\/lib\/db\/rootLayoutSettings";/
  );
  assert.doesNotMatch(layoutSource, /@\/lib\/db\/settings/);
  assert.match(leafSource, /from "\.\/singleton"/);
  assert.doesNotMatch(
    leafSource,
    /db\/settings|\.\/core|runtimeSettings|tokenHealth|providerModels/
  );
  assert.doesNotMatch(leafSource, /\b(?:INSERT|UPDATE|DELETE|REPLACE)\b/i);
  assert.match(coreSource, /from "\.\/singleton"/);
  assert.doesNotMatch(singletonSource, /db\/settings|\.\/core|readCache|runtimeSettings/);
});

test("root layout settings reader does not initialize the database", async () => {
  process.env.INITIAL_PASSWORD = "must-not-trigger-startup";

  assert.deepEqual(await getRootLayoutSettings(), {
    instanceName: "OmniRoute",
    customFaviconUrl: "",
    customFaviconBase64: "",
  });
  assert.equal(fs.existsSync(path.join(TEST_DATA_DIR, "storage.sqlite")), false);
});

test("root layout settings reader returns only the persisted metadata fields", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
  );

  insert.run("instanceName", JSON.stringify("Route Lab"));
  insert.run("customFaviconUrl", JSON.stringify("https://example.com/favicon.png"));
  insert.run("customFaviconBase64", JSON.stringify("data:image/png;base64,AA=="));
  insert.run("proxyEnabled", JSON.stringify(false));

  assert.deepEqual(await getRootLayoutSettings(), {
    instanceName: "Route Lab",
    customFaviconUrl: "https://example.com/favicon.png",
    customFaviconBase64: "data:image/png;base64,AA==",
  });
});

test("root layout settings reader is read-only and falls back safely", async () => {
  process.env.INITIAL_PASSWORD = "must-not-trigger-onboarding";
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('settings', 'instanceName', ?)"
  ).run("not-json");

  assert.deepEqual(await getRootLayoutSettings(), {
    instanceName: "OmniRoute",
    customFaviconUrl: "",
    customFaviconBase64: "",
  });

  const onboardingRows = db
    .prepare(
      "SELECT key FROM key_value WHERE namespace = 'settings' AND key IN ('setupComplete', 'requireLogin')"
    )
    .all();
  assert.deepEqual(onboardingRows, []);
});
