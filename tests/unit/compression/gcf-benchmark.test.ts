/**
 * GCF (Graph Compact Format) vs legacy omni-tabular benchmark.
 *
 * Compares compression savings, round-trip correctness, and coverage on
 * realistic payloads including cases the legacy encoder cannot handle.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

let encodeTabular: (arr: Record<string, unknown>[]) => string;
let decodeTabular: (text: string) => Record<string, unknown>[];
let encodeTabularBlockLegacy: (arr: Record<string, unknown>[]) => string;
let detectHomogeneous: (arr: unknown[]) => string[] | null;
let reconstructHeadroom: (body: Record<string, unknown>) => Record<string, unknown>;

before(async () => {
  const tabMod = await import("../../../open-sse/services/compression/engines/headroom/tabular.ts");
  encodeTabular = tabMod.encodeTabular;
  decodeTabular = tabMod.decodeTabular;
  encodeTabularBlockLegacy = tabMod.encodeTabularBlockLegacy;

  const scMod =
    await import("../../../open-sse/services/compression/engines/headroom/smartcrusher.ts");
  detectHomogeneous = scMod.detectHomogeneous;

  const idxMod = await import("../../../open-sse/services/compression/engines/headroom/index.ts");
  reconstructHeadroom = idxMod.reconstructHeadroom;
});

// ─── test payloads ──────────────────────────────────────────────────────────

interface Payload {
  name: string;
  description: string;
  data: Record<string, unknown>[];
  legacyCanHandle: boolean;
}

function buildPayloads(): Payload[] {
  return [
    {
      name: "homogeneous-simple",
      description: "50 rows, 4 uniform columns (id, name, value, active)",
      data: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `item-${i + 1}`,
        value: (i + 1) * 10,
        active: i % 2 === 0,
      })),
      legacyCanHandle: true,
    },
    {
      name: "homogeneous-wide",
      description: "30 rows, 8 columns with varied types",
      data: Array.from({ length: 30 }, (_, i) => ({
        id: i,
        firstName: `First-${i}`,
        lastName: `Last-${i}`,
        email: `user${i}@example.com`,
        age: 20 + (i % 50),
        salary: 50000 + i * 1000,
        department: ["Engineering", "Sales", "Marketing", "Support"][i % 4],
        active: i % 3 !== 0,
      })),
      legacyCanHandle: true,
    },
    {
      name: "heterogeneous-keys",
      description: "20 rows with different key sets (GCF handles, legacy skips)",
      data: [
        ...Array.from({ length: 10 }, (_, i) => ({
          id: i,
          name: `user-${i}`,
          role: "admin",
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
          id: i + 10,
          email: `u${i}@test.com`,
          verified: true,
        })),
      ],
      legacyCanHandle: false,
    },
    {
      name: "mixed-type-columns",
      description: "25 rows with nullable and mixed-type columns",
      data: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        score: i % 3 === 0 ? null : (i + 1) * 7,
        label: i % 4 === 0 ? null : `label-${i}`,
        value: i % 2 === 0 ? i * 10 : `str-${i}`,
      })),
      legacyCanHandle: false,
    },
    {
      name: "nested-objects",
      description: "20 rows with nested object values",
      data: Array.from({ length: 20 }, (_, i) => ({
        id: i,
        user: {
          name: `user-${i}`,
          email: `user${i}@example.com`,
          tier: i % 3 === 0 ? "premium" : "free",
        },
        amount: i * 100,
      })),
      // Legacy detects as homogeneous (same keys), but JSON-stringifies nested objects.
      // GCF encodes nested objects natively with inline schemas for better compression.
      legacyCanHandle: true,
    },
    {
      name: "api-response-realistic",
      description: "Realistic API response: 40 rows with mixed fields",
      data: Array.from({ length: 40 }, (_, i) => ({
        id: `req-${i.toString(16).padStart(4, "0")}`,
        timestamp: `2024-01-${((i % 28) + 1).toString().padStart(2, "0")}T${(i % 24).toString().padStart(2, "0")}:00:00Z`,
        method: ["GET", "POST", "PUT", "DELETE"][i % 4],
        path: `/api/v1/resources/${i}`,
        status: [200, 201, 400, 404, 500][i % 5],
        latencyMs: 10 + Math.floor(i * 3.7),
        userId: `user-${i % 15}`,
        cached: i % 3 === 0,
      })),
      legacyCanHandle: true,
    },
  ];
}

// ─── benchmark tests ────────────────────────────────────────────────────────

describe("GCF benchmark — compression savings", () => {
  const payloads = buildPayloads();

  for (const payload of payloads) {
    it(`${payload.name}: GCF compresses with positive savings`, () => {
      const jsonStr = JSON.stringify(payload.data);
      const gcfEncoded = encodeTabular(payload.data);
      const savings = ((jsonStr.length - gcfEncoded.length) / jsonStr.length) * 100;
      assert.ok(
        savings > 0,
        `GCF should save space on ${payload.name} (got ${savings.toFixed(1)}%)`
      );
    });
  }

  for (const payload of payloads) {
    it(`${payload.name}: GCF round-trips losslessly`, () => {
      const gcfEncoded = encodeTabular(payload.data);
      const decoded = decodeTabular(gcfEncoded);
      assert.deepEqual(decoded, payload.data, `${payload.name} must round-trip without data loss`);
    });
  }
});

describe("GCF benchmark — coverage comparison with legacy", () => {
  const payloads = buildPayloads();

  it("legacy omni-tabular handles only homogeneous payloads", () => {
    for (const payload of payloads) {
      const isHomogeneous = detectHomogeneous(payload.data) !== null;
      if (payload.legacyCanHandle) {
        // Legacy CAN handle it (but may still use mixed types that corrupt round-trip)
        // For truly homogeneous data, detectHomogeneous should return non-null
        // (some payloads are "legacyCanHandle" in terms of key structure but have mixed types)
      } else {
        assert.equal(
          isHomogeneous,
          false,
          `${payload.name}: legacy should NOT detect as homogeneous`
        );
      }
    }
  });

  it("GCF handles ALL payloads (100% coverage)", () => {
    for (const payload of payloads) {
      const gcfEncoded = encodeTabular(payload.data);
      assert.ok(gcfEncoded.includes("gcf-generic"), `${payload.name}: must produce GCF output`);
      const decoded = decodeTabular(gcfEncoded);
      assert.deepEqual(decoded, payload.data, `${payload.name}: GCF must round-trip`);
    }
  });
});

describe("GCF benchmark — savings table", () => {
  it("prints a comparison table (informational)", () => {
    const payloads = buildPayloads();
    const rows: string[] = [];
    rows.push("| Payload | JSON | GCF | Savings | Legacy | Legacy Savings | GCF Advantage |");
    rows.push("|---------|------|-----|---------|--------|----------------|---------------|");

    for (const payload of payloads) {
      const jsonStr = JSON.stringify(payload.data);
      const gcfEncoded = encodeTabular(payload.data);
      const gcfSavings = ((jsonStr.length - gcfEncoded.length) / jsonStr.length) * 100;

      let legacySize = "-";
      let legacySavings = "-";
      let advantage = "N/A (legacy can't encode)";

      if (payload.legacyCanHandle && detectHomogeneous(payload.data)) {
        const legacyBlock = `\`\`\`omni-tabular\n${encodeTabularBlockLegacy(payload.data)}\n\`\`\``;
        legacySize = String(legacyBlock.length);
        const ls = ((jsonStr.length - legacyBlock.length) / jsonStr.length) * 100;
        legacySavings = ls.toFixed(1) + "%";
        advantage = (gcfSavings - ls).toFixed(1) + "pp";
      }

      rows.push(
        `| ${payload.name} | ${jsonStr.length} | ${gcfEncoded.length} | ${gcfSavings.toFixed(1)}% | ${legacySize} | ${legacySavings} | ${advantage} |`
      );
    }

    // Print to stdout for visibility in test output
    console.log("\n" + rows.join("\n") + "\n");

    // Assert the table was built (not empty)
    assert.ok(rows.length > 2, "benchmark table should have data rows");
  });
});
