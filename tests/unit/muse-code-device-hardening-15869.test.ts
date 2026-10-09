import assert from "node:assert/strict";
import test from "node:test";
import { museCode } from "../../src/lib/oauth/providers/muse-code.ts";
import { MUSE_CODE_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";

const device = {
  device_code: "fixture-device",
  user_code: "ABCD-EFGH",
  verification_uri: "https://auth.meta.com/device",
  verification_uri_complete: "https://auth.meta.com/device?user_code=ABCD-EFGH",
  expires_in: 600,
  interval: 5,
};
const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function respond(data: unknown, status = 200): void {
  globalThis.fetch = async () => Response.json(data, { status });
}

for (const field of ["verification_uri", "verification_uri_complete"]) {
  for (const url of [
    "http://auth.meta.com/device",
    "https://attacker.invalid/device",
    "https://auth.meta.com.attacker.invalid/device",
    "https://user:password@auth.meta.com/device",
    "https://auth.meta.com:8443/device",
    "javascript:alert(1)",
  ]) {
    test(`rejects unsafe ${field}: ${url}`, async () => {
      respond({ ...device, [field]: url });
      await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG), /authorization URL/i);
    });
  }
}

for (const expiresIn of [0, -1, null, "600", 86401, 1e300]) {
  test(`rejects invalid device expiry ${String(expiresIn)}`, async () => {
    respond({ ...device, expires_in: expiresIn });
    await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG), /expiry/i);
  });
}

test("valid device URLs and plain-only links remain supported", async () => {
  respond(device);
  assert.deepEqual(await museCode.requestDeviceCode(MUSE_CODE_CONFIG), device);
  const { verification_uri_complete: _complete, ...plainOnly } = device;
  respond(plainOnly);
  const result = await museCode.requestDeviceCode(MUSE_CODE_CONFIG);
  assert.equal(result.verification_uri, device.verification_uri);
  assert.equal(result.verification_uri_complete, "");
});

test("device request rejects a response without any verification link", async () => {
  respond({ ...device, verification_uri: "", verification_uri_complete: "" });
  await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG), /authorization URL/i);
});

for (const error of [
  "authorization_pending",
  "slow_down",
  "access_denied",
  "expired_token",
  "invalid_grant",
]) {
  test(`polling preserves ${error} while dropping upstream free text`, async () => {
    respond(
      {
        error,
        error_description: "credential-fixture-do-not-expose",
        message: "secret-fixture",
        arbitrary: true,
      },
      400
    );
    const result = await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code);
    assert.equal(result.ok, false);
    assert.equal(result.data.error, error);
    assert.ok(!JSON.stringify(result).includes("fixture"));
    assert.equal(result.data.message, undefined);
    assert.equal(result.data.arbitrary, undefined);
  });
}

for (const error of ["attacker-secret-fixture", "constructor", "toString", "__proto__"]) {
  test(`polling maps unrecognized error ${error} to a fixed code`, async () => {
    respond({ error, error_description: "upstream-secret-fixture" }, 400);
    const result = await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code);
    assert.deepEqual(result, { ok: false, data: { error: "invalid_response" } });
  });
}

for (const payload of [null, [], "upstream-secret-fixture"]) {
  test(`polling rejects non-object JSON ${JSON.stringify(payload)}`, async () => {
    respond(payload);
    assert.deepEqual(await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code), {
      ok: false,
      data: { error: "invalid_response" },
    });
  });
}

test("non-JSON and network errors do not escape through the polling result", async () => {
  globalThis.fetch = async () => new Response("upstream-secret-fixture", { status: 502 });
  assert.deepEqual(await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code), {
    ok: false,
    data: { error: "invalid_response" },
  });
  globalThis.fetch = async () => {
    throw new Error("network-secret-fixture");
  };
  assert.deepEqual(await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code), {
    ok: false,
    data: { error: "network_error" },
  });
  await assert.rejects(museCode.requestDeviceCode(MUSE_CODE_CONFIG), (error: Error) => {
    assert.equal(error.message, "Muse Code device authorization request failed.");
    return true;
  });
});

test("device and poll requests reject redirects and have a bounded abort signal", async () => {
  globalThis.fetch = async (_url, init) => {
    assert.equal(init?.redirect, "error");
    assert.ok(init?.signal instanceof AbortSignal);
    return Response.json(device);
  };
  await museCode.requestDeviceCode(MUSE_CODE_CONFIG);
  await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code);
});

test("successful polling retains renewable token fields only", async () => {
  respond({
    access_token: "dca:fixture",
    expires_in: 600,
    token_type: "Bearer",
    error_description: "upstream-secret-fixture",
    arbitrary: true,
  });
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code);
  assert.deepEqual(result, {
    ok: true,
    data: { access_token: "dca:fixture", expires_in: 600, token_type: "Bearer" },
  });
  const mapped = museCode.mapTokens(result.data);
  assert.equal(mapped.refreshToken, "dca:fixture");
  assert.equal(mapped.providerSpecificData.dcaToken, "dca:fixture");
});

test("HTTP failure never accepts a body carrying an access token", async () => {
  respond({ access_token: "dca:fixture", error: "access_denied" }, 403);
  const result = await museCode.pollToken(MUSE_CODE_CONFIG, device.device_code);
  assert.equal(result.ok, false);
  assert.equal(result.data.access_token, undefined);
  assert.equal(result.data.error, "access_denied");
});
