import test from "node:test";
import assert from "node:assert/strict";
import {
  computeLogsSignature,
  resolveInitialVisibility,
  shouldAutoRefresh,
  shouldTriggerInfiniteScroll,
} from "../../src/shared/components/requestLoggerSignature.ts";

const PAGE_SIZE = 50;

test("shouldAutoRefresh: polls only while recording AND on the first page", () => {
  assert.equal(shouldAutoRefresh(true, PAGE_SIZE, PAGE_SIZE), true); // exactly first page
  assert.equal(shouldAutoRefresh(true, 10, PAGE_SIZE), true);
  assert.equal(shouldAutoRefresh(false, 10, PAGE_SIZE), false); // not recording
  assert.equal(shouldAutoRefresh(true, PAGE_SIZE + 1, PAGE_SIZE), false); // scrolled past page 1
  assert.equal(shouldAutoRefresh(true, 500, PAGE_SIZE), false); // deep history window
});

// #4269: the IntersectionObserver sentinel (rootMargin 200px) is already visible on
// mount when the first page does not fill the scroll container, which fired a "ghost"
// loadMore — growing the window to limit>PAGE_SIZE and permanently pausing auto-refresh
// (shouldAutoRefresh returns false once limit>pageSize). Infinite-scroll loadMore must
// only fire after a REAL user scroll.
test("shouldTriggerInfiniteScroll: does NOT fire on mount before the user scrolls (#4269)", () => {
  assert.equal(
    shouldTriggerInfiniteScroll({
      isIntersecting: true,
      hasMore: true,
      loading: false,
      hasScrolled: false,
    }),
    false
  );
});

test("shouldTriggerInfiniteScroll: fires once the user has actually scrolled", () => {
  assert.equal(
    shouldTriggerInfiniteScroll({
      isIntersecting: true,
      hasMore: true,
      loading: false,
      hasScrolled: true,
    }),
    true
  );
});

test("shouldTriggerInfiniteScroll: never fires when not intersecting / no more / loading", () => {
  const base = { isIntersecting: true, hasMore: true, loading: false, hasScrolled: true };
  assert.equal(shouldTriggerInfiniteScroll({ ...base, isIntersecting: false }), false);
  assert.equal(shouldTriggerInfiniteScroll({ ...base, hasMore: false }), false);
  assert.equal(shouldTriggerInfiniteScroll({ ...base, loading: true }), false);
});

test("computeLogsSignature: stable across identical snapshots", () => {
  const snapshot = [
    { id: "a", status: 200, duration: 12, tokens: { out: 5 } },
    { id: "b", status: 200, duration: 30, tokens: { out: 9 } },
  ];
  assert.equal(computeLogsSignature(snapshot), computeLogsSignature(structuredClone(snapshot)));
});

test("computeLogsSignature: changes when an in-progress request updates", () => {
  const before = [{ id: "a", status: 0, duration: 0, tokens: { out: 0 } }];
  const afterStatus = [{ id: "a", status: 200, duration: 0, tokens: { out: 0 } }];
  const afterDuration = [{ id: "a", status: 0, duration: 42, tokens: { out: 0 } }];
  const afterTokens = [{ id: "a", status: 0, duration: 0, tokens: { out: 7 } }];
  const base = computeLogsSignature(before);
  assert.notEqual(computeLogsSignature(afterStatus), base);
  assert.notEqual(computeLogsSignature(afterDuration), base);
  assert.notEqual(computeLogsSignature(afterTokens), base);
});

test("computeLogsSignature: detects additions and deletions", () => {
  const one = [{ id: "a", status: 200, duration: 1, tokens: { out: 1 } }];
  const two = [...one, { id: "b", status: 200, duration: 1, tokens: { out: 1 } }];
  assert.notEqual(computeLogsSignature(one), computeLogsSignature(two));
});

test("computeLogsSignature: non-array input collapses to empty", () => {
  assert.equal(computeLogsSignature(undefined), "");
  assert.equal(computeLogsSignature(null), "");
  assert.equal(computeLogsSignature({ error: "boom" }), "");
  assert.equal(computeLogsSignature([]), "");
});

test("computeLogsSignature: missing tokens defaults out to 0", () => {
  assert.equal(
    computeLogsSignature([{ id: "a", status: 200, duration: 5 }]),
    "a:200:5:0"
  );
});

test("resolveInitialVisibility: visible by default when document is absent (SSR)", () => {
  const original = (globalThis as any).document;
  try {
    delete (globalThis as any).document;
    assert.equal(resolveInitialVisibility(), true);
  } finally {
    if (original !== undefined) (globalThis as any).document = original;
  }
});

test("resolveInitialVisibility: mirrors document.visibilityState when present", () => {
  const original = (globalThis as any).document;
  try {
    (globalThis as any).document = { visibilityState: "hidden" };
    assert.equal(resolveInitialVisibility(), false);
    (globalThis as any).document = { visibilityState: "visible" };
    assert.equal(resolveInitialVisibility(), true);
  } finally {
    if (original === undefined) delete (globalThis as any).document;
    else (globalThis as any).document = original;
  }
});
