// tests/unit/max-tools-limit-env.test.ts
// #13190: MAX_TOOLS_LIMIT must be operator-overridable via OMNIROUTE_MAX_TOOLS_LIMIT
// (positive integers only) while staying 128 when unset. The constant resolves at
// module load, so each case needs its own module record — the query suffix forces a
// fresh tsx/esm instance (same technique as task-routing-config-restore-8601.test.ts).
import { test } from "node:test";
import assert from "node:assert/strict";

const MODULE_PATH = "../../open-sse/config/constants.ts";
const ORIGINAL_ENV = process.env.OMNIROUTE_MAX_TOOLS_LIMIT;

function setEnv(value: string | undefined) {
  if (value === undefined) delete process.env.OMNIROUTE_MAX_TOOLS_LIMIT;
  else process.env.OMNIROUTE_MAX_TOOLS_LIMIT = value;
}

async function loadMaxToolsLimit(value: string | undefined): Promise<number> {
  setEnv(value);
  try {
    const bust = (value ?? "unset").replace(/[^a-zA-Z0-9]/g, "_");
    const mod = await import(`${MODULE_PATH}?maxToolsLimit=${bust}`);
    return mod.MAX_TOOLS_LIMIT;
  } finally {
    setEnv(ORIGINAL_ENV);
  }
}

test("#13190: OMNIROUTE_MAX_TOOLS_LIMIT unset keeps the 128 default", async () => {
  assert.equal(await loadMaxToolsLimit(undefined), 128);
});

test("#13190: OMNIROUTE_MAX_TOOLS_LIMIT=512 raises the cap", async () => {
  assert.equal(await loadMaxToolsLimit("512"), 512);
});

test("#13190: non-positive-integer overrides fall back to the 128 default", async () => {
  assert.equal(await loadMaxToolsLimit("0"), 128);
  assert.equal(await loadMaxToolsLimit("-4"), 128);
  assert.equal(await loadMaxToolsLimit("12.5"), 128);
  assert.equal(await loadMaxToolsLimit("abc"), 128);
});
