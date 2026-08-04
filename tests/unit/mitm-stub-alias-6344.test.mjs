// Regression test for #6344 — the 3.8.45 Turbopack-default flip shipped the
// @/mitm/manager build stub to every npm/Electron/VPS artifact, breaking Agent
// Bridge start ("MITM manager stub reached at runtime"). The stub alias must be
// opt-in (Docker sets OMNIROUTE_MITM_STUB=1); a default production build must
// bundle the REAL manager.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { shouldStubMitmManager, mitmManagerAliasFor } = await import(
  "../../scripts/build/mitm-stub-flag.mjs"
);

describe("mitm manager stub alias (#6344)", () => {
  it("default env does NOT stub the manager (npm/Electron/VPS builds get the real module)", () => {
    assert.equal(shouldStubMitmManager({}), false);
    assert.deepEqual(mitmManagerAliasFor({}), {});
  });

  it("OMNIROUTE_MITM_STUB=1 opts into the stub (Docker graceful degradation, #3390)", () => {
    assert.equal(shouldStubMitmManager({ OMNIROUTE_MITM_STUB: "1" }), true);
    assert.deepEqual(mitmManagerAliasFor({ OMNIROUTE_MITM_STUB: "1" }), {
      "@/mitm/manager": "./src/mitm/manager.stub.ts",
    });
  });

  it("next.config.mjs derives the turbopack alias from the flag (no unconditional stub)", () => {
    const config = readFileSync(new URL("../../next.config.mjs", import.meta.url), "utf8");
    assert.match(config, /mitmManagerAliasFor/, "next.config.mjs must use mitmManagerAliasFor()");
    assert.doesNotMatch(
      config,
      /^\s*"@\/mitm\/manager":\s*"\.\/src\/mitm\/manager\.stub\.ts",?\s*$/m,
      "next.config.mjs must not hardcode the @/mitm/manager stub alias"
    );
  });

  it("the Dockerfile keeps Docker on the stub via OMNIROUTE_MITM_STUB=1", () => {
    const dockerfile = readFileSync(new URL("../../Dockerfile", import.meta.url), "utf8");
    assert.match(dockerfile, /^ENV OMNIROUTE_MITM_STUB=1$/m);
  });
});
