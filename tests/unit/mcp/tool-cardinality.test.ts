/**
 * Tests for MCP tool manifest cardinality reduction (TV5 / F4.3).
 *
 * The pure function `reduceToolManifest` takes a tool manifest + a profile
 * and returns a reduced manifest announcing fewer tools to the model,
 * saving tokens in the tool-manifest portion of the context window.
 *
 * The live MCP server registration loop is UNCHANGED — this is a pure
 * utility; activation is a follow-up task.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  reduceToolManifest,
  estimateManifestTokens,
  type ToolManifestEntry,
  type ToolProfile,
} from "../../../open-sse/mcp-server/toolCardinality.ts";

// ---------------------------------------------------------------------------
// Synthetic manifest — 10 tools across 3 scopes
// ---------------------------------------------------------------------------

const SYNTHETIC_TOOLS: ToolManifestEntry[] = [
  { name: "tool_read_a", description: "Read resource A", scopes: ["read:x"] },
  { name: "tool_read_b", description: "Read resource B", scopes: ["read:x"] },
  { name: "tool_read_c", description: "Read resource C with extra detail", scopes: ["read:x"] },
  { name: "tool_write_a", description: "Write resource A", scopes: ["write:y"] },
  { name: "tool_write_b", description: "Write resource B", scopes: ["write:y"] },
  { name: "tool_write_c", description: "Write resource C", scopes: ["write:y"] },
  { name: "tool_admin_a", description: "Admin action A", scopes: ["admin:z"] },
  { name: "tool_admin_b", description: "Admin action B", scopes: ["admin:z"] },
  { name: "tool_multi", description: "Multi-scope tool", scopes: ["read:x", "write:y"] },
  { name: "tool_no_scope", description: "Tool with no scopes declared", scopes: [] },
];

// Object-keyed variant (name → entry)
const SYNTHETIC_TOOLS_MAP: Record<string, ToolManifestEntry> = Object.fromEntries(
  SYNTHETIC_TOOLS.map((t) => [t.name, t])
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function names(result: ToolManifestEntry[] | Record<string, ToolManifestEntry>): string[] {
  const entries = Array.isArray(result) ? result : Object.values(result);
  return entries.map((t) => t.name).sort();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("reduceToolManifest — allowScopes filter (array input)", () => {
  test("returns ONLY read:x tools when profile has allowScopes=['read:x']", () => {
    const profile: ToolProfile = { name: "reader", allowScopes: ["read:x"] };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile);

    assert.ok(Array.isArray(result), "result should be an array");
    const resultNames = names(result as ToolManifestEntry[]);

    // Must include the three read:x tools + multi (which has read:x as one scope)
    assert.ok(resultNames.includes("tool_read_a"), "should include tool_read_a");
    assert.ok(resultNames.includes("tool_read_b"), "should include tool_read_b");
    assert.ok(resultNames.includes("tool_read_c"), "should include tool_read_c");
    assert.ok(resultNames.includes("tool_multi"), "should include tool_multi (has read:x)");

    // Must NOT include write:y-only or admin:z-only tools
    assert.ok(!resultNames.includes("tool_write_a"), "should NOT include tool_write_a");
    assert.ok(!resultNames.includes("tool_admin_a"), "should NOT include tool_admin_a");

    // Count strictly less than full manifest
    assert.ok(
      (result as ToolManifestEntry[]).length < SYNTHETIC_TOOLS.length,
      `reduced count (${(result as ToolManifestEntry[]).length}) must be < full count (${SYNTHETIC_TOOLS.length})`
    );
  });

  test("estimated tokens of reduced manifest strictly smaller than full manifest", () => {
    const profile: ToolProfile = { name: "reader", allowScopes: ["read:x"] };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];

    const fullTokens = estimateManifestTokens(SYNTHETIC_TOOLS);
    const reducedTokens = estimateManifestTokens(result);

    assert.ok(
      reducedTokens < fullTokens,
      `reduced tokens (${reducedTokens}) must be < full tokens (${fullTokens})`
    );
  });
});

describe("reduceToolManifest — allowScopes filter (object/map input)", () => {
  test("returns a Record when given a Record input", () => {
    const profile: ToolProfile = { name: "reader", allowScopes: ["read:x"] };
    const result = reduceToolManifest(SYNTHETIC_TOOLS_MAP, profile);

    assert.ok(!Array.isArray(result), "result should be a Record");
    const resultNames = names(result as Record<string, ToolManifestEntry>);

    assert.ok(resultNames.includes("tool_read_a"), "should include tool_read_a");
    assert.ok(!resultNames.includes("tool_write_a"), "should NOT include tool_write_a");
    assert.ok(
      Object.keys(result as Record<string, ToolManifestEntry>).length < SYNTHETIC_TOOLS.length
    );
  });
});

describe("reduceToolManifest — allowTools and denyTools", () => {
  test("allowTools explicitly includes named tools regardless of scope", () => {
    const profile: ToolProfile = {
      name: "allow-list-test",
      allowScopes: ["read:x"],
      allowTools: ["tool_admin_a"], // admin tool explicitly allowed even without admin:z scope
    };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];
    const resultNames = names(result);

    assert.ok(resultNames.includes("tool_admin_a"), "allowTools should force-include tool_admin_a");
    assert.ok(resultNames.includes("tool_read_a"), "read:x tools should still be included");
    assert.ok(!resultNames.includes("tool_write_a"), "write:y tools should still be excluded");
  });

  test("denyTools removes a tool even if its scope would be allowed", () => {
    const profile: ToolProfile = {
      name: "deny-test",
      allowScopes: ["read:x"],
      denyTools: ["tool_read_b"],
    };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];
    const resultNames = names(result);

    assert.ok(!resultNames.includes("tool_read_b"), "denyTools should remove tool_read_b");
    assert.ok(resultNames.includes("tool_read_a"), "other read:x tools should still be included");
  });

  test("denyTools takes priority over allowTools (deny wins)", () => {
    const profile: ToolProfile = {
      name: "deny-over-allow",
      allowScopes: ["read:x"],
      allowTools: ["tool_read_b"],
      denyTools: ["tool_read_b"],
    };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];
    const resultNames = names(result);

    assert.ok(!resultNames.includes("tool_read_b"), "deny should beat allow for tool_read_b");
  });
});

describe("reduceToolManifest — maxTools cap", () => {
  test("maxTools caps count deterministically", () => {
    const profile: ToolProfile = {
      name: "capped",
      allowScopes: ["read:x", "write:y", "admin:z"],
      maxTools: 3,
    };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];
    assert.equal(result.length, 3, "exactly 3 tools when maxTools=3");
  });

  test("maxTools is deterministic — same input always produces same output", () => {
    const profile: ToolProfile = {
      name: "det",
      allowScopes: ["read:x", "write:y", "admin:z"],
      maxTools: 4,
    };
    const r1 = names(reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[]);
    const r2 = names(reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[]);
    assert.deepEqual(r1, r2, "same call produces same subset");
  });

  test("maxTools keeps allowTools-listed tools first, then fills from name-sorted rest", () => {
    const profile: ToolProfile = {
      name: "priority-cap",
      allowScopes: ["read:x", "write:y"],
      allowTools: ["tool_write_a"], // must be in final result even though write:y tools come later alphabetically
      maxTools: 2,
    };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];
    const resultNames = names(result);

    assert.equal(result.length, 2, "exactly 2 tools");
    assert.ok(resultNames.includes("tool_write_a"), "allow-listed tool_write_a must be kept");
  });

  test("maxTools larger than available tools returns all available tools unchanged", () => {
    const profile: ToolProfile = {
      name: "big-cap",
      allowScopes: ["read:x"],
      maxTools: 999,
    };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];
    // Only read:x tools pass the scope filter; maxTools doesn't shrink further
    const readXCount = SYNTHETIC_TOOLS.filter(
      (t) => t.scopes && t.scopes.includes("read:x")
    ).length;
    assert.equal(result.length, readXCount);
  });
});

describe("reduceToolManifest — allow-everything profile", () => {
  test("profile with no allowScopes/allowTools = no filtering, returns full manifest", () => {
    const profile: ToolProfile = { name: "superuser" };
    const result = reduceToolManifest(SYNTHETIC_TOOLS, profile) as ToolManifestEntry[];

    assert.equal(result.length, SYNTHETIC_TOOLS.length, "all tools should be kept");
    assert.deepEqual(names(result), names(SYNTHETIC_TOOLS), "same tools as input");
  });

  test("allow-everything object input also returns full manifest", () => {
    const profile: ToolProfile = { name: "superuser" };
    const result = reduceToolManifest(SYNTHETIC_TOOLS_MAP, profile) as Record<
      string,
      ToolManifestEntry
    >;
    assert.equal(
      Object.keys(result).length,
      Object.keys(SYNTHETIC_TOOLS_MAP).length,
      "all keys preserved"
    );
  });
});

describe("reduceToolManifest — immutability", () => {
  test("original array manifest is not mutated after call", () => {
    const copy = SYNTHETIC_TOOLS.map((t) => ({ ...t, scopes: [...(t.scopes ?? [])] }));
    const profile: ToolProfile = { name: "reader", allowScopes: ["read:x"] };

    reduceToolManifest(copy, profile);

    assert.equal(copy.length, SYNTHETIC_TOOLS.length, "original length unchanged");
    assert.deepEqual(
      copy.map((t) => t.name),
      SYNTHETIC_TOOLS.map((t) => t.name),
      "original order and names unchanged"
    );
  });

  test("original map manifest is not mutated after call", () => {
    const copyMap = Object.fromEntries(
      Object.entries(SYNTHETIC_TOOLS_MAP).map(([k, v]) => [
        k,
        { ...v, scopes: [...(v.scopes ?? [])] },
      ])
    );
    const keysBeforeCall = Object.keys(copyMap).sort();

    const profile: ToolProfile = { name: "reader", allowScopes: ["read:x"] };
    reduceToolManifest(copyMap, profile);

    assert.deepEqual(Object.keys(copyMap).sort(), keysBeforeCall, "original map keys unchanged");
  });
});

describe("estimateManifestTokens", () => {
  test("empty manifest returns 0", () => {
    assert.equal(estimateManifestTokens([]), 0);
  });

  test("larger manifest has more tokens than smaller manifest", () => {
    const small = SYNTHETIC_TOOLS.slice(0, 2);
    const large = SYNTHETIC_TOOLS;
    assert.ok(estimateManifestTokens(large) > estimateManifestTokens(small));
  });

  test("accepts Record input as well as array", () => {
    const arrTokens = estimateManifestTokens(SYNTHETIC_TOOLS);
    const mapTokens = estimateManifestTokens(SYNTHETIC_TOOLS_MAP);
    // Same tools, so token estimates should be very close (maybe tiny diff due to key serialization)
    assert.ok(typeof arrTokens === "number" && arrTokens > 0);
    assert.ok(typeof mapTokens === "number" && mapTokens > 0);
  });
});
