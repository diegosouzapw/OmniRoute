/**
 * U7 (#9654 Wave 2) — route-level acceptance for the adaptive virtual-lanes flag.
 *
 * Ticket acceptance: "flag appears in GET /api/settings/feature-flags; env
 * still wins." Exercises the GET + PUT handlers directly (JWT cookie auth),
 * asserting the env-wins source reporting and the requiresRestart surface.
 *
 * Run: bun test tests/unit/feature-flags-route-virtual-lanes.test.ts
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after, before } from "node:test";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ff-vl-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { GET, PUT } = await import("../../../src/app/api/settings/feature-flags/route.ts");
const { removeFeatureFlagOverride, setFeatureFlagOverride } =
  await import("../../../src/lib/db/featureFlags");
const { ADAPTIVE_VIRTUAL_LANES_FLAG_KEY } = await import("../../../src/lib/admissionVirtualLanes.ts");

const ORIGINAL_ENV_VALUE = process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY];

type FlagPayload = {
  key: string;
  label: string;
  type: string;
  defaultValue: string;
  effectiveValue: string;
  source: string;
  requiresRestart: boolean;
};

async function authCookie(): Promise<string> {
  process.env.JWT_SECRET = "test-feature-flags-route-secret";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: "test-user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

async function buildGetRequest(): Promise<Request> {
  const cookie = await authCookie();
  return new Request("http://localhost/api/settings/feature-flags", {
    headers: { cookie },
  });
}

async function buildPutRequest(value: string): Promise<Request> {
  const cookie = await authCookie();
  return new Request("http://localhost/api/settings/feature-flags", {
    method: "PUT",
    headers: { cookie, "Content-Type": "application/json" },
    body: JSON.stringify({ key: ADAPTIVE_VIRTUAL_LANES_FLAG_KEY, value }),
  });
}

async function getFlag(): Promise<FlagPayload> {
  const res = await GET(await buildGetRequest());
  assert.equal(res.status, 200);
  const json = (await res.json()) as { flags: FlagPayload[] };
  const flag = json.flags.find((f) => f.key === ADAPTIVE_VIRTUAL_LANES_FLAG_KEY);
  assert.ok(flag, `flag ${ADAPTIVE_VIRTUAL_LANES_FLAG_KEY} must appear in GET`);
  return flag;
}

before(() => {
  removeFeatureFlagOverride(ADAPTIVE_VIRTUAL_LANES_FLAG_KEY);
});

after(() => {
  if (ORIGINAL_ENV_VALUE === undefined) {
    delete process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY];
  } else {
    process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY] = ORIGINAL_ENV_VALUE;
  }
  removeFeatureFlagOverride(ADAPTIVE_VIRTUAL_LANES_FLAG_KEY);
});

test("flag appears in GET with the requiresRestart boolean surface (default off)", async () => {
  delete process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY];
  const flag = await getFlag();
  assert.equal(flag.type, "boolean");
  assert.equal(flag.defaultValue, "false");
  assert.equal(flag.requiresRestart, true, "runtime reads env at construction — restart required");
  assert.equal(flag.effectiveValue, "false");
  assert.equal(flag.source, "default");
});

test('env wins over a DB override in GET (env "1" + DB false -> env)', async () => {
  process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY] = "1";
  setFeatureFlagOverride(ADAPTIVE_VIRTUAL_LANES_FLAG_KEY, "false");
  const flag = await getFlag();
  assert.equal(flag.effectiveValue, "true");
  assert.equal(flag.source, "env");
});

test('env explicit off still wins in GET (env "0" + DB true -> env off)', async () => {
  process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY] = "0";
  setFeatureFlagOverride(ADAPTIVE_VIRTUAL_LANES_FLAG_KEY, "true");
  const flag = await getFlag();
  assert.equal(flag.effectiveValue, "false");
  assert.equal(flag.source, "env");
});

test("DB override enables when env is absent (source db)", async () => {
  delete process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY];
  setFeatureFlagOverride(ADAPTIVE_VIRTUAL_LANES_FLAG_KEY, "true");
  const flag = await getFlag();
  assert.equal(flag.effectiveValue, "true");
  assert.equal(flag.source, "db");
});

test("PUT response reports env-wins truth when env is set (operator toggle cannot lie)", async () => {
  process.env[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY] = "0";
  const res = await PUT(await buildPutRequest("true"));
  assert.equal(res.status, 200);
  const json = (await res.json()) as { effectiveValue: string; source: string };
  assert.equal(json.effectiveValue, "false", 'env "0" must still win over a dashboard PUT "true"');
  assert.equal(json.source, "env");
});
