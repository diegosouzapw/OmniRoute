/**
 * Regression for #13679 PR A: verifyCloudSignature() must not fail open when a
 * present X-Cloud-Sig cannot be verified (no local OMNIROUTE_CLOUD_SYNC_SECRET).
 *
 * Before this fix: a garbage/forged X-Cloud-Sig header was ALWAYS accepted when
 * the local secret was unset ("we can't verify, but the server is at least
 * trying — pass through"). That let a MITM on the CLOUD_URL channel, or a
 * misconfigured/compromised CLOUD_URL, forge any signature value and have it
 * accepted — defeating the point of the signature check for any install that
 * hasn't issued a shared secret yet.
 *
 * Fix (owner decision 2026-09-15, PR A):
 *  (b) unconditional: a PRESENT-but-unverifiable signature is now rejected,
 *      regardless of the opt-in enforce flag below.
 *  (a) opt-in only (OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE=true, default OFF):
 *      also rejects a payload carrying NO signature at all. Default stays
 *      legacy pass-through for v3.8.x peers that haven't rotated in a shared
 *      secret yet — the default flips to enforced in v3.9.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const ORIGINAL_SECRET = process.env.OMNIROUTE_CLOUD_SYNC_SECRET;
const ORIGINAL_ENFORCE = process.env.OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE;

function restoreEnv() {
  if (ORIGINAL_SECRET === undefined) delete process.env.OMNIROUTE_CLOUD_SYNC_SECRET;
  else process.env.OMNIROUTE_CLOUD_SYNC_SECRET = ORIGINAL_SECRET;
  if (ORIGINAL_ENFORCE === undefined) delete process.env.OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE;
  else process.env.OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE = ORIGINAL_ENFORCE;
}

test.after(restoreEnv);

test("issue #13679: a present-but-unverifiable X-Cloud-Sig is rejected even without a local secret", async () => {
  delete process.env.OMNIROUTE_CLOUD_SYNC_SECRET;
  delete process.env.OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE;
  try {
    const { verifyCloudSignature } = await import(
      `../../../src/lib/cloudSync.ts?case=13679-forged-${Date.now()}-${Math.random()}`
    );
    const rawBody = JSON.stringify({ providers: [{ id: "evil", accessToken: "stolen" }] });
    const forgedSig = "0".repeat(64);

    assert.equal(
      verifyCloudSignature(rawBody, forgedSig),
      false,
      "a garbage X-Cloud-Sig must be REJECTED even when the local secret is unset (fail-open closed)"
    );
  } finally {
    restoreEnv();
  }
});

test("issue #13679: legacy peers with NO X-Cloud-Sig header still pass by default (v3.8.x back-compat)", async () => {
  delete process.env.OMNIROUTE_CLOUD_SYNC_SECRET;
  delete process.env.OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE;
  try {
    const { verifyCloudSignature } = await import(
      `../../../src/lib/cloudSync.ts?case=13679-legacy-${Date.now()}-${Math.random()}`
    );
    const rawBody = JSON.stringify({ providers: [] });

    assert.equal(
      verifyCloudSignature(rawBody, null),
      true,
      "an unsigned payload from a legacy peer must still pass through by default in v3.8.x"
    );
  } finally {
    restoreEnv();
  }
});

test("issue #13679: OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE=true rejects an unsigned payload too", async () => {
  delete process.env.OMNIROUTE_CLOUD_SYNC_SECRET;
  process.env.OMNIROUTE_CLOUD_SYNC_ENFORCE_SIGNATURE = "true";
  try {
    const { verifyCloudSignature } = await import(
      `../../../src/lib/cloudSync.ts?case=13679-enforced-${Date.now()}-${Math.random()}`
    );
    const rawBody = JSON.stringify({ providers: [] });

    assert.equal(
      verifyCloudSignature(rawBody, null),
      false,
      "with the opt-in enforce flag set, an unsigned payload must be rejected"
    );
  } finally {
    restoreEnv();
  }
});
