import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  decryptPayload,
  encryptPayload,
  loadFactoryCliCredentials,
  syncFactoryCliCredentials,
  type FactoryCliIo,
} from "../../open-sse/services/factory/localCredentials.ts";

const FAKE_KEYCHAIN: FactoryCliIo = { readKeychainKey: async () => null };

test("Factory local sync preserves encrypted fields and rejects a newer Droid login", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-sync-"));
  try {
    const key = Buffer.alloc(32, 42);
    fs.writeFileSync(path.join(directory, "auth.v2.key"), key.toString("base64"), { mode: 0o600 });
    const storePath = path.join(directory, "auth.v2.file");
    const original = encryptPayload(
      {
        access_token: "old-access",
        refresh_token: "old-refresh",
        active_organization_id: "org_one",
        preference: "keep-this-field",
      },
      key
    );
    assert.ok(original);
    fs.writeFileSync(storePath, original, { mode: 0o600 });

    const loaded = await loadFactoryCliCredentials(directory, FAKE_KEYCHAIN);
    assert.equal(loaded?.accessToken, "old-access");
    assert.equal(loaded?.activeOrganizationId, "org_one");
    assert.equal(loaded?.rawPayload?.preference, "keep-this-field");

    const expected = {
      backend: "file" as const,
      fileName: "auth.v2.file" as const,
      preRefreshAccessToken: "old-access",
      preRefreshRefreshToken: "old-refresh",
      activeOrganizationId: "org_one",
    };
    const updated = await syncFactoryCliCredentials(
      directory,
      expected,
      {
        ...loaded!,
        accessToken: "rotated-access",
        refreshToken: "rotated-refresh",
      },
      FAKE_KEYCHAIN
    );
    assert.equal(updated, "updated");
    const reread = await loadFactoryCliCredentials(directory, FAKE_KEYCHAIN);
    assert.equal(reread?.accessToken, "rotated-access");
    assert.equal(reread?.refreshToken, "rotated-refresh");
    assert.equal(reread?.rawPayload?.preference, "keep-this-field");
    assert.equal(fs.statSync(storePath).mode & 0o777, 0o600);

    const replacement = encryptPayload(
      {
        access_token: "different-login",
        refresh_token: "different-refresh",
        active_organization_id: "org_other",
      },
      key
    );
    assert.ok(replacement);
    fs.writeFileSync(storePath, replacement, { mode: 0o600 });
    const before = fs.readFileSync(storePath);
    assert.equal(
      await syncFactoryCliCredentials(
        directory,
        expected,
        {
          ...loaded!,
          accessToken: "unsafe-access",
          refreshToken: "unsafe-refresh",
        },
        FAKE_KEYCHAIN
      ),
      "conflict"
    );
    assert.deepEqual(fs.readFileSync(storePath), before);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("Factory encrypted store rejects non-canonical Base64", () => {
  const key = Buffer.alloc(32, 7);
  const payload = encryptPayload({ access_token: "access", refresh_token: "refresh" }, key);
  assert.ok(payload);
  assert.equal(decryptPayload(payload, key)?.access_token, "access");
  assert.equal(decryptPayload(`${payload}#`, key), null);
});
