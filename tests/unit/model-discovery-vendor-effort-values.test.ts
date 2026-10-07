import { test } from "node:test";
import assert from "node:assert/strict";
import {
  detectDefaultThinkingEffort,
  detectSupportedThinkingEfforts,
  normalizeDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";

// Vendor-route catalogs (e.g. Merge Gateway `/v1/models`) nest per-route reasoning capability under
// `vendors.<vendor>.capabilities.reasoning` with the route's accepted effort
// levels in `effort_values` (docs.merge.dev, "Effort levels per route"). The
// same canonical model declares DIFFERENT vocabularies per vendor route, and
// unpinned requests self-narrow to a route honoring the requested level when
// one exists — so the synced vocabulary is the INTERSECTION across routes:
// a level outside the intersection can be silently adjusted (or 400 on pinned
// requests) on the route a request actually lands on.

function mergeRecord(vendorEfforts: Record<string, string[] | undefined>) {
  return {
    id: "zai/glm-5.3-flash",
    vendors: Object.fromEntries(
      Object.entries(vendorEfforts).map(([vendor, efforts]) => [
        vendor,
        { capabilities: { reasoning: { effort_values: efforts } } },
      ])
    ),
  };
}

test("vendor-route effort_values from a single vendor route is parsed into supportedThinkingEfforts", () => {
  assert.deepEqual(detectSupportedThinkingEfforts(mergeRecord({ zai: ["low", "high", "max"] })), [
    "low",
    "high",
    "max",
  ]);
});

test("vendor-route effort_values from multiple vendor routes intersects across routes", () => {
  assert.deepEqual(
    detectSupportedThinkingEfforts(
      mergeRecord({
        zai: ["low", "high", "max"],
        baseten: ["low", "medium", "high", "xhigh"],
        makora: ["low", "high", "max"],
      })
    ),
    ["low", "high"]
  );
});

test("vendor routes without effort_values (no effort control) are excluded from the intersection", () => {
  // fireworks: no effort_values key at all — "no effort control" per the docs.
  const record = {
    id: "moonshot/kimi-k3",
    vendors: {
      moonshot: { capabilities: { reasoning: { effort_values: ["low", "max"] } } },
      fireworks: { capabilities: { reasoning: {} } },
    },
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "max"]);
});

test("a malformed vendor entry is dropped individually; no throw on garbage vendors", () => {
  const record = {
    id: "vendor/garbage",
    vendors: {
      good: { capabilities: { reasoning: { effort_values: ["low", "high"] } } },
      bad: "not-an-object",
      worse: { capabilities: { reasoning: { effort_values: 42 } } },
    },
  };
  assert.doesNotThrow(() => detectSupportedThinkingEfforts(record));
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "high"]);
});

test("no vendors key degrades to undefined (legacy behavior preserved)", () => {
  assert.equal(detectSupportedThinkingEfforts({ id: "plain/model" }), undefined);
  assert.equal(
    detectSupportedThinkingEfforts({ id: "plain/model", vendors: "not-a-map" }),
    undefined
  );
});

test("effort synonyms are normalized inside effort_values", () => {
  assert.deepEqual(detectSupportedThinkingEfforts(mergeRecord({ zai: ["low", "extra", "max"] })), [
    "low",
    "xhigh",
    "max",
  ]);
});

test("vendor-route defaultThinkingEffort falls back to the intersected vocabulary's highest tier (rank-based)", () => {
  // max survives both routes → default max.
  const withMax = mergeRecord({
    zai: ["low", "high", "max"],
    makora: ["none", "low", "high", "max"],
  });
  assert.equal(detectDefaultThinkingEffort(withMax), "max");
  // max only on one route → the intersection's highest (high) is the default.
  const withoutSharedMax = mergeRecord({
    zai: ["low", "high", "max"],
    baseten: ["low", "medium", "high"],
  });
  assert.equal(detectDefaultThinkingEffort(withoutSharedMax), "high");
  // Vendor arrays are not guaranteed sorted: first-route order must not
  // decide the default — the canonical rank does.
  const unsorted = mergeRecord({
    zai: ["max", "low", "high"],
    makora: ["high", "low", "max"],
  });
  assert.equal(detectDefaultThinkingEffort(unsorted), "max");
});

test("vendor-route default is skipped when a higher-precedence declared shape wins the list", () => {
  // Flat import field pins the vocabulary to ["low"]; the vendors
  // intersection must not inject a default outside it.
  const pinnedFlat = {
    ...mergeRecord({ zai: ["low", "high", "max"] }),
    supportedThinkingEfforts: ["low"],
  };
  assert.equal(detectDefaultThinkingEffort(pinnedFlat), undefined);
  // Same for the nested #7694 shape winning the list.
  const pinnedNested = {
    ...mergeRecord({ zai: ["low", "high", "max"] }),
    reasoning: { supported_efforts: ["low"] },
  };
  assert.equal(detectDefaultThinkingEffort(pinnedNested), undefined);
});

test("disjoint vendor vocabularies produce an authoritative empty list (no fall-through)", () => {
  const disjoint = mergeRecord({ a: ["low"], b: ["high"] });
  assert.deepEqual(detectSupportedThinkingEfforts(disjoint), []);
  // And no default can be derived from an empty intersection.
  assert.equal(detectDefaultThinkingEffort(disjoint), undefined);
});

test("a malformed entry inside effort_values is dropped individually, not the whole route", () => {
  const record = {
    id: "vendor/partial",
    vendors: {
      a: { capabilities: { reasoning: { effort_values: ["low", 42, "high"] } } },
      b: { capabilities: { reasoning: { effort_values: ["low", "high", "max"] } } },
    },
  };
  assert.deepEqual(detectSupportedThinkingEfforts(record), ["low", "high"]);
});

test("explicit default_effort keeps precedence over the vendor-route fallback", () => {
  const record = {
    ...mergeRecord({ zai: ["low", "high", "max"] }),
    reasoning: { default_effort: "high" },
  };
  assert.equal(detectDefaultThinkingEffort(record), "high");
});

test("normalizeDiscoveredModels threads the intersected vendor-route vocabulary into synced models", () => {
  const models = normalizeDiscoveredModels([
    {
      id: "zai/glm-5.3-flash",
      vendors: {
        zai: { capabilities: { reasoning: { effort_values: ["low", "high", "max"] } } },
        baseten: { capabilities: { reasoning: { effort_values: ["low", "high", "xhigh"] } } },
      },
    },
  ]);
  const synced = models.find((model) => model.id === "zai/glm-5.3-flash");
  assert.deepEqual(synced?.supportedThinkingEfforts, ["low", "high"]);
  assert.equal(synced?.defaultThinkingEffort, "high");
});
