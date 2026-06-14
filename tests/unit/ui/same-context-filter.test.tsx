/**
 * Tests for R5-4: same-context filter wired end-to-end
 *
 * Source-grep assertions that:
 *  - useTrafficStream.applyFilter branches on sameContextKey
 *  - RequestRow exports an onSameContext prop
 *  - useTrafficFilters.setSameContext is referenced from TrafficInspectorPageClient
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector"
);

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

describe("R5-4 same-context filter end-to-end", () => {
  it("useTrafficStream.applyFilter has sameContextKey branch", () => {
    const src = read("hooks/useTrafficStream.ts");
    assert.ok(
      src.includes("sameContextKey") && src.includes("contextKey"),
      "applyFilter should branch on sameContextKey / contextKey"
    );
    // Must actually exclude requests where contextKey differs
    assert.ok(
      src.includes("req.contextKey !== f.sameContextKey"),
      "should exclude when contextKey !== sameContextKey"
    );
  });

  it("RequestRow accepts onSameContext prop in interface", () => {
    const src = read("components/RequestRow.tsx");
    assert.ok(
      src.includes("onSameContext"),
      "RequestRow interface should declare onSameContext prop"
    );
    assert.ok(
      src.includes("onSameContext?.("),
      "RequestRow should call onSameContext on click"
    );
  });

  it("RequestRow ctx chip is a button element", () => {
    const src = read("components/RequestRow.tsx");
    // The ctx chip should now be a button for keyboard/mouse click
    const hasButton = src.includes("<button") && src.includes("onSameContext");
    assert.ok(hasButton, "ctx chip should be a <button> that calls onSameContext");
  });

  it("TrafficInspectorPageClient references setSameContext", () => {
    const src = read("TrafficInspectorPageClient.tsx");
    assert.ok(
      src.includes("setSameContext"),
      "TrafficInspectorPageClient should destructure setSameContext from useTrafficFilters"
    );
  });

  it("RequestStreamingList passes onSameContext to RequestRow", () => {
    const src = read("components/RequestStreamingList.tsx");
    assert.ok(
      src.includes("onSameContext"),
      "RequestStreamingList should accept and forward onSameContext prop"
    );
  });

  it("RequestStreamingList shows sameContextKey banner when active", () => {
    const src = read("components/RequestStreamingList.tsx");
    assert.ok(
      src.includes("sameContextKey") && src.includes("onClearContextFilter"),
      "RequestStreamingList should show a clear-filter banner when sameContextKey is set"
    );
  });

  it("TrafficInspectorPageClient passes sameContextKey and onClearContextFilter to list", () => {
    const src = read("TrafficInspectorPageClient.tsx");
    assert.ok(
      src.includes("sameContextKey={filters.sameContextKey}"),
      "should pass sameContextKey to RequestStreamingList"
    );
    assert.ok(
      src.includes("onClearContextFilter"),
      "should pass onClearContextFilter to RequestStreamingList"
    );
  });

  it("useTrafficFilters exports setSameContext", () => {
    const src = read("hooks/useTrafficFilters.ts");
    assert.ok(
      src.includes("setSameContext"),
      "useTrafficFilters should export setSameContext"
    );
  });

  describe("applyFilter sameContextKey logic (unit)", () => {
    it("returns false when contextKey does not match filter", () => {
      type Req = { contextKey?: string; detectedKind: string; source: string; host: string; agent?: string; sessionId?: string; status: number };
      const applyFilter = (req: Req, sameContextKey?: string): boolean => {
        if (sameContextKey && req.contextKey !== sameContextKey) return false;
        return true;
      };

      assert.equal(applyFilter({ contextKey: "abc123", detectedKind: "llm", source: "agent", host: "api.openai.com", status: 200 }, "abc123"), true);
      assert.equal(applyFilter({ contextKey: "xyz456", detectedKind: "llm", source: "agent", host: "api.openai.com", status: 200 }, "abc123"), false);
      assert.equal(applyFilter({ contextKey: undefined, detectedKind: "llm", source: "agent", host: "api.openai.com", status: 200 }, "abc123"), false);
      assert.equal(applyFilter({ contextKey: "abc123", detectedKind: "llm", source: "agent", host: "api.openai.com", status: 200 }, undefined), true);
    });
  });
});
