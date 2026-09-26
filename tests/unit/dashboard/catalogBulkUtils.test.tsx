import { describe, expect, it } from "vitest";
import {
  buildModelBatches,
  dedupeComboTargets,
  dedupeModelTargets,
  runWithConcurrency,
} from "@/app/(dashboard)/dashboard/models/catalogBulkUtils";

function deferred() {
  let resolve: () => void = () => undefined;
  const promise = new Promise<void>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

async function settle() {
  for (let index = 0; index < 5; index += 1) await Promise.resolve();
}

describe("dedupeModelTargets", () => {
  it("drops exact (providerId, modelId) duplicates and keeps first-seen order", () => {
    expect(
      dedupeModelTargets([
        { providerId: "alpha", modelId: "chat" },
        { providerId: "beta", modelId: "chat" },
        { providerId: "alpha", modelId: "chat" },
        { providerId: "alpha", modelId: "embed" },
      ])
    ).toEqual([
      { providerId: "alpha", modelId: "chat" },
      { providerId: "beta", modelId: "chat" },
      { providerId: "alpha", modelId: "embed" },
    ]);
  });

  it("does not merge pairs that only collide when joined with a separator", () => {
    expect(
      dedupeModelTargets([
        { providerId: "a:b", modelId: "c" },
        { providerId: "a", modelId: "b:c" },
      ])
    ).toHaveLength(2);
  });
});

describe("dedupeComboTargets", () => {
  it("drops duplicate combo names", () => {
    expect(
      dedupeComboTargets([{ comboName: "one" }, { comboName: "two" }, { comboName: "one" }])
    ).toEqual([{ comboName: "one" }, { comboName: "two" }]);
  });
});

describe("buildModelBatches", () => {
  it("groups by provider and splits each provider into chunks of at most 100 ids", () => {
    const targets = [
      ...Array.from({ length: 230 }, (_, index) => ({ providerId: "big", modelId: `m${index}` })),
      { providerId: "small", modelId: "only" },
    ];
    const batches = buildModelBatches(targets);
    expect(batches.map((batch) => [batch.providerId, batch.modelIds.length])).toEqual([
      ["big", 100],
      ["big", 100],
      ["big", 30],
      ["small", 1],
    ]);
    expect(batches[2].modelIds[0]).toBe("m200");
  });

  it("honours a custom batch size", () => {
    const batches = buildModelBatches(
      [
        { providerId: "p", modelId: "a" },
        { providerId: "p", modelId: "b" },
        { providerId: "p", modelId: "c" },
      ],
      2
    );
    expect(batches.map((batch) => batch.modelIds)).toEqual([["a", "b"], ["c"]]);
  });
});

describe("runWithConcurrency", () => {
  it("never runs more than the limit at once and processes every item", async () => {
    const gates = [deferred(), deferred(), deferred(), deferred()];
    const started: number[] = [];
    let inFlight = 0;
    let maxInFlight = 0;
    const controller = new AbortController();

    const run = runWithConcurrency([0, 1, 2, 3], 2, controller.signal, async (item) => {
      started.push(item);
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await gates[item].promise;
      inFlight -= 1;
    });

    await settle();
    expect(started).toEqual([0, 1]);
    gates[1].resolve();
    await settle();
    expect(started).toEqual([0, 1, 2]);
    gates[0].resolve();
    gates[2].resolve();
    gates[3].resolve();
    await run;

    expect(started).toEqual([0, 1, 2, 3]);
    expect(maxInFlight).toBe(2);
  });

  it("stops scheduling new items once the signal aborts", async () => {
    const gates = [deferred(), deferred(), deferred()];
    const started: number[] = [];
    const controller = new AbortController();

    const run = runWithConcurrency([0, 1, 2], 1, controller.signal, async (item) => {
      started.push(item);
      await gates[item].promise;
    });

    await settle();
    controller.abort();
    gates[0].resolve();
    await run;

    expect(started).toEqual([0]);
  });
});
