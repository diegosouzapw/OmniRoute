/**
 * U7 (#9654 Wave 2): adaptive virtual-lanes feature flag — env-wins resolution
 * and boot warm.
 *
 * Contract under test:
 *  - resolveAdaptiveVirtualLanesFlag: env (`"1"`|`"true"`) > DB override >
 *    default(false); env wins even when set to an explicit "off" value.
 *  - warmAdaptiveVirtualLanesIntoRuntime: only a DB-sourced state folds into
 *    the runtime env (`"1"`/`"0"`); env/default sources are no-ops.
 *
 * Run: bun test tests/unit/admission-virtual-lanes-flag.test.ts
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ADAPTIVE_VIRTUAL_LANES_FLAG_KEY,
  resolveAdaptiveVirtualLanesFlag,
  warmAdaptiveVirtualLanesIntoRuntime,
} from "../../../src/lib/admissionVirtualLanes.ts";

const emptyEnv = {};
const noOverride = (): string | undefined => undefined;

describe("resolveAdaptiveVirtualLanesFlag", () => {
  it('env "1" enables and reports env, winning over a DB override', () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: { [ADAPTIVE_VIRTUAL_LANES_FLAG_KEY]: "1" },
      getOverride: () => "false",
    });
    assert.deepEqual(state, { enabled: true, source: "env" });
  });

  it('env "true" enables (runtime-compatible truthiness)', () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: { [ADAPTIVE_VIRTUAL_LANES_FLAG_KEY]: "true" },
      getOverride: noOverride,
    });
    assert.deepEqual(state, { enabled: true, source: "env" });
  });

  it('env "0" is an explicit off that still wins over the DB', () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: { [ADAPTIVE_VIRTUAL_LANES_FLAG_KEY]: "0" },
      getOverride: () => "true",
    });
    assert.deepEqual(state, { enabled: false, source: "env" });
  });

  it("DB override enables when env is absent", () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: emptyEnv,
      getOverride: () => "true",
    });
    assert.deepEqual(state, { enabled: true, source: "db" });
  });

  it('DB override "1" enables when env is absent', () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: emptyEnv,
      getOverride: () => "1",
    });
    assert.deepEqual(state, { enabled: true, source: "db" });
  });

  it("DB override disables when env is absent", () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: emptyEnv,
      getOverride: () => "false",
    });
    assert.deepEqual(state, { enabled: false, source: "db" });
  });

  it("defaults to disabled when neither env nor DB is set", () => {
    const state = resolveAdaptiveVirtualLanesFlag({
      env: emptyEnv,
      getOverride: noOverride,
    });
    assert.deepEqual(state, { enabled: false, source: "default" });
  });
});

describe("warmAdaptiveVirtualLanesIntoRuntime", () => {
  it('folds a DB-sourced enable into the runtime env as "1"', async () => {
    let reloaded = false;
    let foldedEnv: NodeJS.ProcessEnv | undefined;
    const materialized = await warmAdaptiveVirtualLanesIntoRuntime({
      resolve: () => ({ enabled: true, source: "db" }),
      reload: (options) => {
        reloaded = true;
        foldedEnv = options.env;
      },
    });

    assert.equal(materialized, true);
    assert.equal(reloaded, true, "must reload the runtime when the DB is the source");
    assert.equal(foldedEnv?.[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY], "1");
  });

  it('folds a DB-sourced disable into the runtime env as "0"', async () => {
    let foldedEnv: NodeJS.ProcessEnv | undefined;
    const materialized = await warmAdaptiveVirtualLanesIntoRuntime({
      resolve: () => ({ enabled: false, source: "db" }),
      reload: (options) => {
        foldedEnv = options.env;
      },
    });

    assert.equal(materialized, true);
    assert.equal(foldedEnv?.[ADAPTIVE_VIRTUAL_LANES_FLAG_KEY], "0");
  });

  it("no-op when the source is env (operator env wins, nothing to fold)", async () => {
    const materialized = await warmAdaptiveVirtualLanesIntoRuntime({
      resolve: () => ({ enabled: true, source: "env" }),
      reload: () => {
        throw new Error("must not reload when env is the source");
      },
    });
    assert.equal(materialized, false);
  });

  it("no-op when the source is default", async () => {
    const materialized = await warmAdaptiveVirtualLanesIntoRuntime({
      resolve: () => ({ enabled: false, source: "default" }),
      reload: () => {
        throw new Error("must not reload when the default applies");
      },
    });
    assert.equal(materialized, false);
  });
});
