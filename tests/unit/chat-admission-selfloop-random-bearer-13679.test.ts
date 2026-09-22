// #13679 (PR C): the self-loop admission bypass bearer must never fall back to the
// predictable literal "sk_omniroute" when OMNIROUTE_API_KEY/ROUTER_API_KEY are unset.
//
// Root cause: `resolveSelfLoopBearer()` in chatAdmissionIdentity.ts returned the checked-in
// literal `"sk_omniroute"` as its final fallback. Anyone who read the source (or the public
// repo) knew this value and could send `x-omniroute-admission-bypass: internal` +
// `Authorization: Bearer sk_omniroute` to skip the heavyweight admission/queueing lease —
// not an auth bypass (see chatBodyAdmission.ts::admitChatRequest), but still a predictable
// shared secret that should not be a hardcoded literal.
import test from "node:test";
import assert from "node:assert/strict";

const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");

const SELF_LOOP_ENV_KEYS = ["OMNIROUTE_API_KEY", "ROUTER_API_KEY"] as const;
function withSelfLoopEnv(env: Partial<Record<(typeof SELF_LOOP_ENV_KEYS)[number], string>>) {
  const saved = new Map<string, string | undefined>();
  for (const key of SELF_LOOP_ENV_KEYS) {
    saved.set(key, process.env[key]);
    if (env[key] === undefined) delete process.env[key];
    else process.env[key] = env[key];
  }
  return () => {
    for (const key of SELF_LOOP_ENV_KEYS) {
      const value = saved.get(key);
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

test("resolveSelfLoopBearer never falls back to the predictable sk_omniroute literal", () => {
  const restore = withSelfLoopEnv({});
  try {
    const bearer = resolveSelfLoopBearer();
    assert.notEqual(
      bearer,
      "sk_omniroute",
      "resolveSelfLoopBearer() fell back to the checked-in literal — a shared secret anyone " +
        "reading the source knows, instead of a per-process random value"
    );
  } finally {
    restore();
  }
});

test("resolveSelfLoopBearer's generated fallback is stable within the same process", () => {
  const restore = withSelfLoopEnv({});
  try {
    const first = resolveSelfLoopBearer();
    const second = resolveSelfLoopBearer();
    assert.equal(
      first,
      second,
      "the generated self-loop bearer must be memoized for the process lifetime — the same " +
        "in-process caller (audioBridgeHelpers/visionBridgeHelpers) and verifier " +
        "(isInternalAdmissionBypass) must agree on the value"
    );
  } finally {
    restore();
  }
});

test("resolveSelfLoopBearer's generated fallback has enough entropy to resist guessing", () => {
  const restore = withSelfLoopEnv({});
  try {
    const bearer = resolveSelfLoopBearer();
    assert.ok(
      bearer.length >= 32,
      `generated self-loop bearer is too short to be a random secret: "${bearer}" (${bearer.length} chars)`
    );
  } finally {
    restore();
  }
});

test("resolveSelfLoopBearer still prefers OMNIROUTE_API_KEY over the generated fallback", () => {
  const restore = withSelfLoopEnv({ OMNIROUTE_API_KEY: "omni-key" });
  try {
    assert.equal(resolveSelfLoopBearer(), "omni-key");
  } finally {
    restore();
  }
});
