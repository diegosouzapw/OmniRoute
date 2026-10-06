import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";

// The dashboard leaderboard labels its rows under a "Name" column but only had the
// API key id to show. GET /api/gamification/leaderboard now attaches the key's
// display name per entry. The enrichment is route-local: the shared getTopN helper
// and the federation endpoint keep returning id-only rows, and no key material
// (key, key_hash, key_prefix, machine_id, ...) may ever ride along with the name.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-leaderboard-names-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "leaderboard-names-route-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const displayNames = await import("../../../src/lib/db/apiKeys/displayNames.ts");
const gamificationDb = await import("../../../src/lib/db/gamification.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const leaderboardRoute = await import("../../../src/app/api/gamification/leaderboard/route.ts");
const federationRoute =
  await import("../../../src/app/api/gamification/federation/leaderboard/route.ts");
const { NextRequest } = await import("next/server");

const SCOPE = "global";
const FEDERATION_TOKEN = "federation-test-token";
const KEY_MATERIAL_FIELDS = [
  "key",
  "keyHash",
  "key_hash",
  "keyPrefix",
  "key_prefix",
  "machineId",
  "machine_id",
  "scopes",
  "allowedModels",
];

let namedKeyId = "";
const orphanKeyId = "orphan-key-with-no-api-key-row";

async function leaderboardJson(query = `?scope=${SCOPE}&limit=50`) {
  const response = await leaderboardRoute.GET(
    new NextRequest(`http://localhost/api/gamification/leaderboard${query}`)
  );
  assert.equal(response.status, 200);
  return (await response.json()) as {
    entries: Array<Record<string, unknown>>;
    myRank: number | null;
    neighbors: unknown;
  };
}

before(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  await settingsDb.updateSettings({ requireLogin: false });

  const created = await apiKeysDb.createApiKey("Alpha billing key", "machine-alpha");
  namedKeyId = created.id;

  gamificationDb.updateScore(namedKeyId, SCOPE, 500);
  gamificationDb.updateScore(orphanKeyId, SCOPE, 250);

  const tokenHash = crypto
    .pbkdf2Sync(FEDERATION_TOKEN, "omniroute-federation-salt", 120000, 32, "sha256")
    .toString("hex");
  gamificationDb.connectServer(
    "federation-test-server",
    "Federation test server",
    "http://federation.test",
    tokenHash
  );
});

after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("GET /api/gamification/leaderboard — API key display names", () => {
  it("attaches the API key name to each entry and null when the key is unknown", async () => {
    const { entries } = await leaderboardJson();

    const named = entries.find((e) => e.apiKeyId === namedKeyId);
    const orphan = entries.find((e) => e.apiKeyId === orphanKeyId);
    assert.ok(named, "named key must be on the leaderboard");
    assert.ok(orphan, "orphan key must be on the leaderboard");

    assert.equal(named.name, "Alpha billing key");
    assert.equal(named.score, 500);
    assert.equal(orphan.name, null);
    assert.equal(orphan.score, 250);
  });

  it("exposes only the display name — never key material", async () => {
    const { entries } = await leaderboardJson();
    assert.ok(entries.length >= 2);

    for (const entry of entries) {
      assert.deepEqual(Object.keys(entry).sort(), [
        "apiKeyId",
        "name",
        "scope",
        "score",
        "updatedAt",
      ]);
      for (const field of KEY_MATERIAL_FIELDS) {
        assert.equal(field in entry, false, `${field} must not be exposed`);
      }
    }
  });

  it("keeps rank/neighbors behaviour and limit validation unchanged", async () => {
    const { myRank, neighbors } = await leaderboardJson(
      `?scope=${SCOPE}&limit=50&apiKeyId=${namedKeyId}`
    );
    assert.equal(myRank, 1);
    assert.ok(neighbors && typeof neighbors === "object");

    const bad = await leaderboardRoute.GET(
      new NextRequest("http://localhost/api/gamification/leaderboard?limit=0")
    );
    assert.equal(bad.status, 400);
  });

  it("leaves the shared getTopN helper id-only", () => {
    const rows = gamificationDb.getTopN(SCOPE, 50) as Array<Record<string, unknown>>;
    assert.ok(rows.length >= 2);
    for (const row of rows) {
      assert.equal("name" in row, false, "getTopN must not carry names");
    }
  });

  it("leaves the federation leaderboard id-only", async () => {
    const response = await federationRoute.GET(
      new NextRequest(`http://localhost/api/gamification/federation/leaderboard?scope=${SCOPE}`, {
        headers: { Authorization: `Bearer ${FEDERATION_TOKEN}` },
      })
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as { entries: Array<Record<string, unknown>> };
    assert.ok(body.entries.length >= 2);
    for (const entry of body.entries) {
      assert.deepEqual(Object.keys(entry).sort(), ["apiKeyId", "score"]);
    }
  });
});

describe("getApiKeyDisplayNames", () => {
  it("returns names only for ids that exist and skips blanks", () => {
    const names = displayNames.getApiKeyDisplayNames([namedKeyId, orphanKeyId, "", namedKeyId]);
    assert.equal(names.size, 1);
    assert.equal(names.get(namedKeyId), "Alpha billing key");
    assert.equal(names.has(orphanKeyId), false);
  });

  it("returns an empty map for an empty id list", () => {
    assert.equal(displayNames.getApiKeyDisplayNames([]).size, 0);
  });
});
