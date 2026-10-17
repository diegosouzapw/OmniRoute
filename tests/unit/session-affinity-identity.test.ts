import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-identity-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("SQLite affinity resolves the stored account identity before a colliding connection id", () => {
  const now = Date.now();
  const selected = {
    id: "local-b",
    provider: "codex",
    authType: "oauth",
    providerSpecificData: {
      workspaceId: "synthetic-workspace",
      chatgptUserId: "synthetic-user",
    },
  };
  // Digest computed with the existing usage-account identity boundaries.
  const record = {
    connectionId: "local-a",
    accountIdentity: "",
    createdAt: new Date(now).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 60_000).toISOString(),
  };
  record.accountIdentity = crypto
    .createHash("sha256")
    .update(
      JSON.stringify([
        "oauth",
        "codex",
        "workspace",
        "synthetic-workspace",
        "user",
        "synthetic-user",
      ])
    )
    .digest("hex");
  const key = `codex:${crypto.createHash("sha256").update("codex:identity-session").digest("hex")}`;
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("session_account_affinity", key, JSON.stringify(record));
  const plan = pin.planSessionAffinityConnection(
    "codex",
    "identity-session",
    [
      { ...selected, id: "local-a", providerSpecificData: { chatgptUserId: "other-user" } },
      selected,
    ],
    60_000
  );
  assert.equal(plan?.connection.id, selected.id);
  affinity.touchSessionAccountAffinity("identity-session", "codex", now + 1, 60_000);
  assert.equal(
    affinity.getSessionAccountAffinity("identity-session", "codex", 60_000)?.accountIdentity,
    record.accountIdentity
  );
});
