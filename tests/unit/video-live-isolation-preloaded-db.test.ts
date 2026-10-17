import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { prepareVideoLiveIsolation } from "../../scripts/ad-hoc/video-live-isolation.ts";

test("preparation refuses a previously loaded database without changing its client keys", async () => {
  const source = fs.mkdtempSync(path.join(os.tmpdir(), "video-preloaded-source-"));
  const previousDataDir = process.env.DATA_DIR;
  const previousApiKeySecret = process.env.API_KEY_SECRET;
  process.env.DATA_DIR = source;
  process.env.API_KEY_SECRET = "synthetic-video-isolation-test-secret";
  process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
  process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  const db = await import("../../src/lib/db/core.ts");
  const keys = await import("../../src/lib/db/apiKeys.ts");
  let prepared: string | undefined;
  try {
    const existing = await keys.createApiKey("synthetic-existing-client", "isolated-test", []);
    const before = (await keys.getApiKeys()).map((key) => key.id);
    assert.ok(before.includes(existing.id));
    await assert.rejects(async () => {
      const result = await prepareVideoLiveIsolation(source);
      prepared = result.directory;
    }, /Private homologation preparation failed/);
    assert.deepEqual(
      (await keys.getApiKeys()).map((key) => key.id),
      before
    );
    assert.equal(process.env.DATA_DIR, source);
  } finally {
    db.resetDbInstance();
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    if (previousApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
    else process.env.API_KEY_SECRET = previousApiKeySecret;
    if (prepared) fs.rmSync(prepared, { recursive: true, force: true });
    fs.rmSync(source, { recursive: true, force: true });
  }
});
