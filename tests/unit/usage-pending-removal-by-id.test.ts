import test from "node:test";
import assert from "node:assert/strict";

const { trackPendingRequest, getPendingById, getPendingRequests, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");

const MODEL = "removal-model";
const PROVIDER = "removal-provider";
const CONN = "removal-conn";
const MODEL_KEY = `${MODEL} (${PROVIDER})`;

// Variadic cast: compiles against the 5-arg RED signature (extra arg ignored
// at runtime) and the 6-arg GREEN signature (id honored) alike, so this file
// is byte-identical across the RED-then-GREEN cycle.
const trackEnd = (
  model: string,
  provider: string,
  connectionId: string | null,
  id?: string
): void => {
  (trackPendingRequest as (...args: unknown[]) => unknown)(
    model,
    provider,
    connectionId,
    false,
    undefined,
    id
  );
};

test("out-of-order finish removes the finished entry by id, survivor stays listed", () => {
  clearPendingRequests();
  try {
    const firstId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    const secondId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    assert.ok(firstId && secondId, "both started requests should produce ids");
    assert.notEqual(firstId, secondId, "concurrent attempts must carry distinct ids");
    assert.equal(getPendingById().size, 2);
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 2);

    // Second finishes first: only its own entry must leave.
    trackEnd(MODEL, PROVIDER, CONN, secondId);

    assert.equal(getPendingById().has(secondId), false, "finished entry must be removed");
    assert.equal(getPendingById().has(firstId), true, "survivor must stay listed");
    assert.equal(
      getPendingRequests().details[CONN]?.[MODEL_KEY]?.length,
      1,
      "bucket must hold exactly the survivor"
    );
    assert.equal(
      getPendingRequests().details[CONN]?.[MODEL_KEY]?.[0]?.id,
      firstId,
      "bucket entry must be the survivor"
    );
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 1);
    assert.equal(getPendingRequests().byAccount[CONN]?.[MODEL_KEY], 1);
  } finally {
    clearPendingRequests();
  }
});

test("finish without id keeps the oldest-first removal", () => {
  clearPendingRequests();
  try {
    const firstId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    const secondId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    assert.ok(firstId && secondId);

    trackPendingRequest(MODEL, PROVIDER, CONN, false);

    assert.equal(getPendingById().has(firstId), false, "oldest entry must leave");
    assert.equal(getPendingById().has(secondId), true, "newest entry must stay");
  } finally {
    clearPendingRequests();
  }
});

test("finish with unknown id removes no live entry", () => {
  clearPendingRequests();
  try {
    const firstId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    const secondId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    assert.ok(firstId && secondId);

    trackEnd(MODEL, PROVIDER, CONN, "no-such-id");

    assert.equal(getPendingById().has(firstId), true, "no live entry may be taken");
    assert.equal(getPendingById().has(secondId), true, "no live entry may be taken");
    assert.equal(getPendingRequests().details[CONN]?.[MODEL_KEY]?.length, 2);
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 2, "counter must not move");
    assert.equal(getPendingRequests().byAccount[CONN]?.[MODEL_KEY], 2);
  } finally {
    clearPendingRequests();
  }
});

test("second withdraw of the same id is a no-op (counter stays put)", () => {
  clearPendingRequests();
  try {
    const firstId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    const secondId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    assert.ok(firstId && secondId);

    trackEnd(MODEL, PROVIDER, CONN, secondId);
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 1);

    // Disconnect-vs-completion double-withdraw: id already gone.
    trackEnd(MODEL, PROVIDER, CONN, secondId);

    assert.equal(getPendingById().has(firstId), true, "survivor must stay listed");
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 1, "counter must not drift");
    assert.equal(
      getPendingRequests().byAccount[CONN]?.[MODEL_KEY],
      1,
      "account counter must not drift"
    );
    assert.equal(getPendingRequests().details[CONN]?.[MODEL_KEY]?.length, 1);
  } finally {
    clearPendingRequests();
  }
});

test("second withdraw of a lone request leaves no phantom count", () => {
  clearPendingRequests();
  try {
    const onlyId = trackPendingRequest(MODEL, PROVIDER, CONN, true);
    assert.ok(onlyId);

    trackEnd(MODEL, PROVIDER, CONN, onlyId);
    trackEnd(MODEL, PROVIDER, CONN, onlyId);

    assert.equal(getPendingRequests().byModel[MODEL_KEY], 0, "no phantom model count");
    assert.equal(getPendingRequests().byAccount[CONN]?.[MODEL_KEY], 0, "no phantom account count");
    assert.equal(getPendingRequests().details[CONN]?.[MODEL_KEY], undefined);
  } finally {
    clearPendingRequests();
  }
});
