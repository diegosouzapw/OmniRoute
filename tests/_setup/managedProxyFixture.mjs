import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Called before importing any application module, including in standalone tests.
export function assertManagedFixture() {
  assert.equal(process.env.GITHUB_ACTIONS, "true", "Managed runtime tests are hosted-only");
  if (!process.env.MANAGED_PROXY_FIXTURE_ROOT) {
    const artifacts = path.join(process.cwd(), "_artifacts");
    fs.mkdirSync(artifacts, { recursive: true });
    const owned = fs.mkdtempSync(path.join(artifacts, "managed-fixture-"));
    for (const key of Object.keys(process.env))
      if (!["PATH", "SystemRoot", "WINDIR", "PATHEXT", "COMSPEC"].includes(key))
        delete process.env[key];
    Object.assign(process.env, {
      GITHUB_ACTIONS: "true",
      CI: "true",
      NODE_ENV: "test",
      MANAGED_PROXY_FIXTURE_ROOT: owned,
      STORAGE_ENCRYPTION_KEY: "synthetic-managed-fixture-key",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
    });
    for (const key of [
      "DATA_DIR",
      "HOME",
      "USERPROFILE",
      "APPDATA",
      "LOCALAPPDATA",
      "TEMP",
      "TMP",
      "XDG_CONFIG_HOME",
      "XDG_CACHE_HOME",
      "XDG_DATA_HOME",
    ]) {
      process.env[key] = path.join(owned, key.toLowerCase());
      fs.mkdirSync(process.env[key], { recursive: true });
    }
    process.env.SQLITE_FILE = process.env.OMNIROUTE_SQLITE_FILE = path.join(
      process.env.DATA_DIR,
      "storage.sqlite"
    );
    process.once("exit", () => fs.rmSync(owned, { recursive: true, force: true }));
  }
  assert.equal(process.env.NODE_ENV, "test");
  const root = process.env.MANAGED_PROXY_FIXTURE_ROOT;
  assert.ok(root && fs.existsSync(root), "Owned fixture root is required");
  const canonical = fs.realpathSync(root);
  assert.equal(
    process.platform === "win32" ? canonical.toLowerCase() : canonical,
    process.platform === "win32" ? path.resolve(root).toLowerCase() : path.resolve(root)
  );
  for (const key of [
    "DATA_DIR",
    "SQLITE_FILE",
    "OMNIROUTE_SQLITE_FILE",
    "HOME",
    "USERPROFILE",
    "APPDATA",
    "LOCALAPPDATA",
    "TEMP",
    "TMP",
    "XDG_CONFIG_HOME",
    "XDG_CACHE_HOME",
    "XDG_DATA_HOME",
  ]) {
    const relative = path.relative(root, process.env[key] || "");
    assert.ok(
      relative && !relative.startsWith("..") && !path.isAbsolute(relative),
      `${key} must be fixture-owned`
    );
  }
  assert.equal(process.env.STORAGE_ENCRYPTION_KEY, "synthetic-managed-fixture-key");
  assert.equal(process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR, undefined);
  return root;
}
