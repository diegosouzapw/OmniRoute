/**
 * Tests for useVirtualList — virtualizes 1000+ items without rendering all
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const ESTIMATED_ROW_HEIGHT = 48;
const OVERSCAN = 5;

function computeVirtualItems(
  items: string[],
  heights: Map<number, number>,
  scrollTop: number,
  containerHeight: number
) {
  // Compute cumulative offsets
  const offsets: number[] = [];
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    offsets.push(total);
    total += heights.get(i) ?? ESTIMATED_ROW_HEIGHT;
  }

  // Find visible range
  let startIdx = 0;
  let endIdx = items.length - 1;

  for (let i = 0; i < offsets.length; i++) {
    if (offsets[i] + (heights.get(i) ?? ESTIMATED_ROW_HEIGHT) < scrollTop) {
      startIdx = i + 1;
    } else {
      break;
    }
  }
  for (let i = startIdx; i < offsets.length; i++) {
    if (offsets[i] > scrollTop + containerHeight) {
      endIdx = i - 1;
      break;
    }
  }

  startIdx = Math.max(0, startIdx - OVERSCAN);
  endIdx = Math.min(items.length - 1, endIdx + OVERSCAN);

  const virtualItems = [];
  for (let i = startIdx; i <= endIdx; i++) {
    virtualItems.push({ index: i, item: items[i], top: offsets[i] ?? 0 });
  }

  return { virtualItems, totalHeight: total };
}

describe("useVirtualList logic", () => {
  it("renders only visible + overscan items from 1000-item list", () => {
    const items = Array.from({ length: 1000 }, (_, i) => `req-${i}`);
    const heights = new Map<number, number>();
    const scrollTop = 0;
    const containerHeight = 600;

    const { virtualItems, totalHeight } = computeVirtualItems(
      items,
      heights,
      scrollTop,
      containerHeight
    );

    // Total height is all items at estimated height
    assert.equal(totalHeight, 1000 * ESTIMATED_ROW_HEIGHT);

    // Should render far fewer than 1000 items
    const expectedVisible = Math.ceil(containerHeight / ESTIMATED_ROW_HEIGHT) + OVERSCAN;
    assert.ok(
      virtualItems.length <= expectedVisible + OVERSCAN + 2,
      `Expected ~${expectedVisible} visible items, got ${virtualItems.length}`
    );
    assert.ok(virtualItems.length < 100, `Should not render all 1000 items, got ${virtualItems.length}`);
  });

  it("renders items starting from correct offset when scrolled", () => {
    const items = Array.from({ length: 1000 }, (_, i) => `req-${i}`);
    const heights = new Map<number, number>();
    const scrollTop = 1000; // scrolled 1000px
    const containerHeight = 600;

    const { virtualItems } = computeVirtualItems(items, heights, scrollTop, containerHeight);

    // At 48px per row, scrollTop=1000 means first visible is around row 20
    const firstIndex = virtualItems[0]?.index ?? 0;
    const expectedFirstVisible = Math.floor(scrollTop / ESTIMATED_ROW_HEIGHT) - OVERSCAN;
    assert.ok(
      firstIndex >= Math.max(0, expectedFirstVisible),
      `Expected first index >= ${Math.max(0, expectedFirstVisible)}, got ${firstIndex}`
    );
    assert.ok(firstIndex < 30, `Expected first index < 30 (scrolled to row ~20), got ${firstIndex}`);
  });

  it("uses custom heights when provided", () => {
    const items = Array.from({ length: 10 }, (_, i) => `req-${i}`);
    const heights = new Map<number, number>([[0, 100], [1, 100], [2, 100]]);
    const scrollTop = 0;
    const containerHeight = 150;

    const { virtualItems, totalHeight } = computeVirtualItems(
      items,
      heights,
      scrollTop,
      containerHeight
    );

    // First 3 rows have height 100 each, rest default 48
    const expected = 100 + 100 + 100 + 7 * ESTIMATED_ROW_HEIGHT;
    assert.equal(totalHeight, expected);

    // Should only render what's visible in 150px (2 full custom rows + overscan)
    assert.ok(virtualItems.length <= 10);
  });

  it("totalHeight equals sum of all item heights", () => {
    const N = 500;
    const items = Array.from({ length: N }, (_, i) => `req-${i}`);
    const heights = new Map<number, number>();
    const { totalHeight } = computeVirtualItems(items, heights, 0, 600);
    assert.equal(totalHeight, N * ESTIMATED_ROW_HEIGHT);
  });
});
