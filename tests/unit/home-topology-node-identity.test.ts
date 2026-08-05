// Regression coverage for four defects an operator hit on the live /home topology.
// All four survived earlier work because each one is invisible until you look at a real
// instance: the icon bug needs a compatible node with NO icon_url, the ordering bug needs
// a provider whose id sorts early but was added last, and the error bugs need two
// providers failing at once.
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveCompatibleStaticIcon } from "../../src/shared/utils/compatibleProviderId.ts";
import {
  compareTopologyProviders,
  selectDrawnErrorProviders,
} from "../../src/app/(dashboard)/home/topologyUtils.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

describe("compat node icon resolution", () => {
  // The operator's two nodes both have an EMPTY icon_url. ProviderIcon only consulted
  // `fallbackText` when a src had been supplied AND failed to load, so an empty src
  // skipped it entirely and fell through to the generic circle-plus glyph. The providers
  // page looked correct only because it hand-rolled its own static-image branch outside
  // the shared component — the fragmentation this fixes.
  test("anthropic-compatible node without icon_url resolves to the bundled logo", () => {
    assert.equal(
      resolveCompatibleStaticIcon("anthropic-compatible-6f2a", null),
      "/providers/anthropic-m.png"
    );
  });

  test("claude-code-compatible node resolves to the same anthropic logo", () => {
    assert.equal(
      resolveCompatibleStaticIcon("anthropic-compatible-cc-91bd", null),
      "/providers/anthropic-m.png"
    );
  });

  test("openai-compatible node distinguishes chat from responses by apiType", () => {
    assert.equal(
      resolveCompatibleStaticIcon("openai-compatible-chat-1", "chat"),
      "/providers/oai-cc.png"
    );
    assert.equal(
      resolveCompatibleStaticIcon("openai-compatible-responses-1", "responses"),
      "/providers/oai-r.png"
    );
  });

  test("a registry provider is left to the normal resolution chain", () => {
    // Returning a compat image for a built-in would mislabel it; null means "not mine".
    assert.equal(resolveCompatibleStaticIcon("anthropic", null), null);
    assert.equal(resolveCompatibleStaticIcon("openai", null), null);
  });

  test("the bundled images this maps to actually exist", () => {
    // A mapping to a missing file would still render a broken image rather than a logo,
    // so assert the assets are really in the repo.
    for (const asset of ["anthropic-m.png", "oai-cc.png", "oai-r.png"]) {
      assert.ok(
        fs.existsSync(path.join(repoRoot, "public", "providers", asset)),
        `public/providers/${asset} must exist`
      );
    }
  });
});

describe("topology provider ordering", () => {
  // The old comparator sorted on the provider ID. A compatible node's generated id starts
  // with "anthropic-compatible-", which sorts ahead of nearly every catalog provider, so a
  // newly added node seized the first ring slot and pushed everyone round — while the node
  // DISPLAYED its operator-chosen name, making the jump look arbitrary.
  test("a newly added provider goes last, not first", () => {
    const providers = [
      { provider: "openai", name: "OpenAI" },
      { provider: "zhipu", name: "Zhipu" },
      { provider: "anthropic-compatible-new", name: "Zulu Gateway", createdAt: "2026-07-28T10:00:00Z" },
    ];
    const sorted = [...providers].sort(compareTopologyProviders);
    assert.equal(
      sorted[sorted.length - 1].provider,
      "anthropic-compatible-new",
      "the most recently created provider must occupy the last slot"
    );
  });

  test("providers added later sort after providers added earlier", () => {
    const providers = [
      { provider: "anthropic-compatible-b", name: "Second", createdAt: "2026-07-26T17:51:44Z" },
      { provider: "anthropic-compatible-a", name: "First", createdAt: "2026-07-25T16:46:58Z" },
    ];
    const sorted = [...providers].sort(compareTopologyProviders);
    assert.deepEqual(
      sorted.map((p) => p.name),
      ["First", "Second"]
    );
  });

  test("built-ins (no createdAt) stay ahead of operator-added nodes, ordered by name", () => {
    const providers = [
      { provider: "anthropic-compatible-x", name: "Added", createdAt: "2026-07-25T00:00:00Z" },
      { provider: "zhipu", name: "Zhipu" },
      { provider: "openai", name: "OpenAI" },
    ];
    const sorted = [...providers].sort(compareTopologyProviders);
    assert.deepEqual(
      sorted.map((p) => p.name),
      ["OpenAI", "Zhipu", "Added"]
    );
  });

  test("ordering is stable and total — equal keys never compare non-zero both ways", () => {
    const a = { provider: "same", name: "Same", createdAt: "2026-07-25T00:00:00Z" };
    const b = { provider: "same", name: "Same", createdAt: "2026-07-25T00:00:00Z" };
    assert.equal(compareTopologyProviders(a, b), 0);
    assert.equal(compareTopologyProviders(b, a), 0);
  });
});

describe("topology ring order honours operator priority", () => {
  // 9Router lays its ring out in connection-priority order, so a node's position carries
  // operational meaning. Adopted here via `global_priority` — the only priority column that
  // is comparable across providers (`priority` restarts at 1 inside every provider, so
  // several providers each own a "1").
  test("a lower priority number sorts earlier", () => {
    const providers = [
      { provider: "gemini", name: "Gemini", priority: 7 },
      { provider: "kiro", name: "Kiro", priority: 2 },
      { provider: "codex", name: "Codex", priority: 4 },
    ];
    assert.deepEqual(
      [...providers].sort(compareTopologyProviders).map((p) => p.name),
      ["Kiro", "Codex", "Gemini"]
    );
  });

  test("a ranked provider precedes an unranked one regardless of name or age", () => {
    // Global priority is sparse — most connections leave it unset. If "unset" were treated
    // as 0 (or any numeric default) the unranked majority would float to the front and bury
    // the few the operator actually ranked.
    const providers = [
      { provider: "anthropic", name: "Anthropic" },
      { provider: "zhipu", name: "Zhipu", priority: 5 },
      { provider: "compat-new", name: "New Gateway", createdAt: "2026-07-28T10:00:00Z" },
    ];
    assert.deepEqual(
      [...providers].sort(compareTopologyProviders).map((p) => p.name),
      ["Zhipu", "Anthropic", "New Gateway"]
    );
  });

  test("providers on the same priority fall back to the createdAt rules", () => {
    // Same tier, so the age tiers still decide: built-ins (no createdAt) alphabetically
    // first, then operator-added nodes oldest to newest.
    const providers = [
      { provider: "compat-b", name: "Added Later", priority: 3, createdAt: "2026-07-27T00:00:00Z" },
      { provider: "compat-a", name: "Added First", priority: 3, createdAt: "2026-07-25T00:00:00Z" },
      { provider: "openai", name: "OpenAI", priority: 3 },
    ];
    assert.deepEqual(
      [...providers].sort(compareTopologyProviders).map((p) => p.name),
      ["OpenAI", "Added First", "Added Later"]
    );
  });

  test("a non-positive or non-finite priority counts as unset, not as best", () => {
    // 0 / NaN must not outrank a real priority of 1 — otherwise a column default or a bad
    // parse would seize the first slot.
    const providers = [
      { provider: "real", name: "Real", priority: 1 },
      { provider: "zeroed", name: "Zeroed", priority: 0 },
      { provider: "nan", name: "NaN", priority: Number.NaN },
    ];
    assert.equal([...providers].sort(compareTopologyProviders)[0].name, "Real");
  });
});

describe("multiple simultaneous error providers", () => {
  // The API returned ONE errorProvider, chosen by max timestamp, so providers overwrote
  // each other: the count could never exceed 1, and only one red edge could ever exist.
  // The operator saw the red line vanish when a second provider failed, and come back when
  // that second provider succeeded — the overwrite, observed from the outside.
  const drawn = ["pix4k", "ericding", "openai"];

  test("two failing providers are both reported, not just the newest", () => {
    const result = selectDrawnErrorProviders(["pix4k", "ericding"], drawn);
    assert.deepEqual([...result].sort(), ["ericding", "pix4k"]);
    assert.equal(result.size, 2, "the count under the title must be able to exceed 1");
  });

  test("one provider erroring does not clear another provider's error", () => {
    // This is the operator's exact report: ericding is broken; pix4k succeeding must not
    // silently un-red ericding.
    const before = selectDrawnErrorProviders(["ericding"], drawn);
    assert.ok(before.has("ericding"));
    const after = selectDrawnErrorProviders(["ericding"], drawn);
    assert.ok(after.has("ericding"), "ericding stays red while pix4k is healthy");
    assert.equal(after.has("pix4k"), false);
  });

  test("an error for a provider not drawn on the graph is not counted", () => {
    // The count came from all-time call_logs with no connection check, so a provider whose
    // connection was disabled still contributed 1 while no red node existed to explain it.
    const result = selectDrawnErrorProviders(["deleted-provider"], drawn);
    assert.equal(result.size, 0);
  });

  test("provider ids are matched case-insensitively", () => {
    // Node keys are lowercased; the API returns whatever call_logs stored.
    const result = selectDrawnErrorProviders(["PIX4K"], drawn);
    assert.deepEqual([...result], ["pix4k"]);
  });

  test("missing or malformed input degrades to no errors, never throws", () => {
    assert.equal(selectDrawnErrorProviders(undefined, drawn).size, 0);
    assert.equal(selectDrawnErrorProviders([], drawn).size, 0);
    assert.equal(selectDrawnErrorProviders(["", "  "], drawn).size, 0);
  });
});
