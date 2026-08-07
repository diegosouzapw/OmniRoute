import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const ENV_KEY = "OMNIROUTE_PROVIDER_PROBE_TIMEOUT_MS";
const originalValue = process.env[ENV_KEY];

async function freshImport() {
  // Force a fresh module evaluation so the env var read at module scope is re-applied.
  const modUrl = `../../src/shared/network/safeOutboundFetch.ts?t=${Date.now()}-${Math.random()}`;
  return import(modUrl);
}

describe("safeOutboundFetch — provider probe timeout (validationRead / modelsProbe)", () => {
  afterEach(() => {
    if (originalValue === undefined) delete process.env[ENV_KEY];
    else process.env[ENV_KEY] = originalValue;
  });

  it("defaults validationRead and modelsProbe to 8000ms when no env override is set", async () => {
    delete process.env[ENV_KEY];
    const { SAFE_OUTBOUND_FETCH_PRESETS } = await freshImport();
    assert.equal(SAFE_OUTBOUND_FETCH_PRESETS.validationRead.timeoutMs, 8000);
    assert.equal(SAFE_OUTBOUND_FETCH_PRESETS.modelsProbe.timeoutMs, 8000);
  });

  it("honors OMNIROUTE_PROVIDER_PROBE_TIMEOUT_MS when set to a valid value", async () => {
    process.env[ENV_KEY] = "12000";
    const { SAFE_OUTBOUND_FETCH_PRESETS } = await freshImport();
    assert.equal(SAFE_OUTBOUND_FETCH_PRESETS.validationRead.timeoutMs, 12000);
    assert.equal(SAFE_OUTBOUND_FETCH_PRESETS.modelsProbe.timeoutMs, 12000);
  });

  it("falls back to the 8000ms default when the env value is invalid or too low", async () => {
    process.env[ENV_KEY] = "not-a-number";
    const invalid = await freshImport();
    assert.equal(invalid.SAFE_OUTBOUND_FETCH_PRESETS.modelsProbe.timeoutMs, 8000);

    process.env[ENV_KEY] = "500"; // below the 1000ms floor
    const tooLow = await freshImport();
    assert.equal(tooLow.SAFE_OUTBOUND_FETCH_PRESETS.modelsProbe.timeoutMs, 8000);
  });

  it("leaves validationWrite and modelsPagination unaffected by the probe timeout override", async () => {
    process.env[ENV_KEY] = "12000";
    const { SAFE_OUTBOUND_FETCH_PRESETS } = await freshImport();
    assert.equal(SAFE_OUTBOUND_FETCH_PRESETS.validationWrite.timeoutMs, 15000);
    assert.equal(SAFE_OUTBOUND_FETCH_PRESETS.modelsPagination.timeoutMs, 15000);
  });
});
