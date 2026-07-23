import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatCompressionAnnotation,
  formatCompressionMeta,
} from "../../../open-sse/services/compression/planResolution.ts";
import type { CompressionStats } from "../../../open-sse/services/compression/types.ts";

function makeStats(overrides: Partial<CompressionStats> = {}): CompressionStats {
  return {
    originalTokens: 847,
    compressedTokens: 312,
    savingsPercent: 63.16,
    techniquesUsed: ["caveman"],
    mode: "standard",
    timestamp: 0,
    ...overrides,
  };
}

describe("formatCompressionAnnotation", () => {
  it("returns empty string when no rulesApplied and no techniquesUsed", () => {
    const stats = makeStats({ rulesApplied: [], techniquesUsed: [] });
    assert.equal(formatCompressionAnnotation(stats), "");
  });

  it("returns empty string when rulesApplied is absent", () => {
    const stats = makeStats({ rulesApplied: undefined, techniquesUsed: [] });
    assert.equal(formatCompressionAnnotation(stats), "");
  });

  it("aggregates rulesApplied counts deterministically", () => {
    const stats = makeStats({
      rulesApplied: [
        "filler",
        "filler",
        "filler",
        "filler",
        "filler",
        "filler",
        "filler",
        "filler",
        "dedup",
        "dedup",
      ],
      techniquesUsed: ["caveman"],
    });
    const result = formatCompressionAnnotation(stats);
    assert.ok(result.includes("tokens=847->312"), `missing token range in: ${result}`);
    assert.ok(result.includes("fillerx8"), `missing fillerx8 in: ${result}`);
    assert.ok(result.includes("dedupx2"), `missing dedupx2 in: ${result}`);
  });

  it("is ASCII-only so it survives HTTP header (X-OmniRoute-Compression) construction", () => {
    // Regression: the annotation is appended to the X-OmniRoute-Compression response
    // header, a latin-1 ByteString. A non-ASCII char (e.g. U+2192 →) throws at
    // Headers/Response construction → 500 on every compressed response with rules.
    const stats = makeStats({
      rulesApplied: ["filler", "filler", "dedup"],
      techniquesUsed: ["caveman"],
    });
    const value = `standard; source=auto; ${formatCompressionAnnotation(stats)}`;
    for (const ch of value) {
      assert.ok(
        ch.codePointAt(0)! <= 0xff,
        `non-latin1 char ${JSON.stringify(ch)} in header value: ${value}`
      );
    }
    // Must not throw at real Headers/Response construction.
    assert.doesNotThrow(() => new Headers({ "X-OmniRoute-Compression": value }));
    const res = new Response(null, { headers: { "X-OmniRoute-Compression": value } });
    assert.equal(res.headers.get("X-OmniRoute-Compression"), value);
  });

  it("orders rule counts descending by count", () => {
    const stats = makeStats({
      rulesApplied: ["dedup", "filler", "filler", "filler"],
      techniquesUsed: [],
    });
    const result = formatCompressionAnnotation(stats);
    const fillerIdx = result.indexOf("fillerx3");
    const dedupIdx = result.indexOf("dedupx1");
    assert.ok(
      fillerIdx < dedupIdx,
      `filler (count=3) should appear before dedup (count=1): ${result}`
    );
  });

  it("is deterministic (same input → same output)", () => {
    const stats = makeStats({
      rulesApplied: ["filler", "dedup", "filler"],
      techniquesUsed: [],
    });
    assert.equal(formatCompressionAnnotation(stats), formatCompressionAnnotation(stats));
  });

  it("bounds high-cardinality rule telemetry before it reaches an HTTP response header", () => {
    const stats = makeStats({
      rulesApplied: Array.from(
        { length: 1_000 },
        (_, index) => `rtk:custom-filter:${index.toString().padStart(4, "0")}`
      ),
      techniquesUsed: ["rtk-filter"],
    });

    const annotation = formatCompressionAnnotation(stats);
    assert.ok(
      Buffer.byteLength(annotation) <= 768,
      `annotation is ${Buffer.byteLength(annotation)} bytes`
    );
    assert.ok(annotation.endsWith(", ..."), `expected truncation marker in: ${annotation}`);
    assert.doesNotThrow(
      () => new Response(null, { headers: { "X-OmniRoute-Compression": annotation } })
    );
  });

  it("replaces non-ASCII and control characters before constructing the header", () => {
    const annotation = formatCompressionAnnotation(
      makeStats({ rulesApplied: ["rtk:one\r\nx-injected: yes", "rtk:two\u0000", "rtk:café"] })
    );

    assert.doesNotMatch(annotation, /[^\x20-\x7e]/);
    assert.ok(
      annotation.includes("rtk:caf?x1"),
      `expected a sanitized rule name in: ${annotation}`
    );
    assert.doesNotThrow(
      () => new Response(null, { headers: { "X-OmniRoute-Compression": annotation } })
    );
  });

  it("prefix mode; source=X is never mutated by appending the annotation", () => {
    const plan = { mode: "standard" as const, stackedPipeline: [], source: "auto" as const };
    const prefix = formatCompressionMeta(plan);
    assert.equal(prefix, "standard; source=auto");

    const stats = makeStats({ rulesApplied: ["filler", "dedup"], techniquesUsed: [] });
    const annotation = formatCompressionAnnotation(stats);
    const combined = `${prefix}; ${annotation}`;
    assert.ok(combined.startsWith("standard; source=auto"), `prefix mutated: ${combined}`);
  });
});
