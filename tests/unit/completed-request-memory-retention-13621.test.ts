import test from "node:test";
import assert from "node:assert/strict";

const completed = await import("../../src/lib/usage/completedRequestDetails.ts");

function makeDetail(
  id: string,
  payload: unknown,
  streamChunks: {
    provider?: string[];
    openai?: string[];
    client?: string[];
  } | null = null
) {
  return {
    id,
    model: "fixture-model",
    provider: "fixture-provider",
    connectionId: "fixture-connection",
    startedAt: Date.now(),
    clientRequest: payload,
    providerRequest: payload,
    providerResponse: payload,
    clientResponse: payload,
    streamChunks,
  };
}

test.beforeEach(() => {
  completed.clearCompletedDetails();
});

test.after(() => {
  completed.clearCompletedDetails();
});

test("#13621 completed cache retains a detached preview, not the large source string", () => {
  const hugeBacking = `prefix-${"x".repeat(4 * 1024 * 1024)}-secret-tail`;
  // Deliberately pass a slice backed by the large source string. The production
  // failure retained this backing allocation even though the visible preview
  // was only ~1.2 KiB.
  const sliced = hugeBacking.slice(7, 7 + 1200);

  completed.storeCompletedDetail(makeDetail("detached-preview", { prompt: sliced }));

  const stored = completed.getCompletedDetails().get("detached-preview");
  assert.ok(stored);
  const prompt = (stored!.clientRequest as { prompt: string }).prompt;
  assert.equal(prompt, sliced);
  assert.equal(prompt.includes("secret-tail"), false);

  const stats = completed.getCompletedDetailsCacheStats();
  assert.equal(stats.entries, 1);
  assert.ok(stats.bytes < 32 * 1024, `expected a bounded preview, got ${stats.bytes} bytes`);
});

test("#13621 replacing one cached id does not double-count retained bytes", () => {
  completed.storeCompletedDetail(makeDetail("same-id", { prompt: "first" }));
  const first = completed.getCompletedDetailsCacheStats();

  completed.storeCompletedDetail(makeDetail("same-id", { prompt: "z".repeat(5000) }));
  const second = completed.getCompletedDetailsCacheStats();

  assert.equal(second.entries, 1);
  assert.ok(second.bytes <= completed.MAX_COMPLETED_DETAILS_BYTES);
  assert.ok(second.bytes < first.bytes + 16 * 1024, "replacement must replace byte accounting");
});

test("#13621 completed stream diagnostics are capped per stage", () => {
  const chunks = Array.from({ length: 100 }, (_, i) => `${i}:${"s".repeat(5000)}`);

  completed.storeCompletedDetail(
    makeDetail(
      "stream-bounded",
      { prompt: "ok" },
      { provider: chunks, openai: chunks, client: chunks }
    )
  );

  const stored = completed.getCompletedDetails().get("stream-bounded");
  assert.ok(stored?.streamChunks);
  for (const stage of ["provider", "openai", "client"] as const) {
    const values = stored!.streamChunks?.[stage];
    assert.ok(values);
    assert.equal(values!.length, 65, `${stage} keeps 64 chunks plus a truncation marker`);
    assert.equal(values![0], chunks[0]);
    assert.match(values![64], /^\[TRUNCATED_STREAM_CHUNKS: 36\]$/);
  }
});

test("#13621 clearing completed diagnostics resets byte accounting", () => {
  completed.storeCompletedDetail(makeDetail("clear-me", { prompt: "hello" }));
  assert.ok(completed.getCompletedDetailsCacheStats().bytes > 0);

  completed.clearCompletedDetails();

  assert.equal(completed.getCompletedDetailsCacheStats().entries, 0);
  assert.equal(completed.getCompletedDetailsCacheStats().bytes, 0);
});
