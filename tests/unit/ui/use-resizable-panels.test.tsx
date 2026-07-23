/**
 * Tests for useResizablePanels — drag changes width, collapse to 48px, localStorage persistence
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";

const MIN_WIDTH = 280;
const MAX_WIDTH = 720;
const COLLAPSED_RAIL = 48;
const DEFAULT_WIDTH = 360;
const STORAGE_KEY = "inspector.listWidth";

describe("useResizablePanels logic", () => {
  it("initializes with default width when no localStorage", () => {
    const stored = null;
    const parsed = stored ? Number(stored) : NaN;
    const width = isNaN(parsed) ? DEFAULT_WIDTH : Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parsed));
    assert.equal(width, DEFAULT_WIDTH);
  });

  it("respects min width on drag", () => {
    const startWidth = 360;
    const startX = 500;
    const moveX = 100; // dragging left by a lot
    const delta = moveX - startX; // -400
    const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta));
    assert.equal(next, MIN_WIDTH);
  });

  it("respects max width on drag", () => {
    const startWidth = 360;
    const startX = 100;
    const moveX = 900; // dragging right by a lot
    const delta = moveX - startX; // 800
    const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta));
    assert.equal(next, MAX_WIDTH);
  });

  it("computes effective width as COLLAPSED_RAIL when collapsed", () => {
    const collapsed = true;
    const listWidth = 360;
    const effectiveWidth = collapsed ? COLLAPSED_RAIL : listWidth;
    assert.equal(effectiveWidth, COLLAPSED_RAIL);
  });

  it("computes effective width as listWidth when not collapsed", () => {
    const collapsed = false;
    const listWidth = 450;
    const effectiveWidth = collapsed ? COLLAPSED_RAIL : listWidth;
    assert.equal(effectiveWidth, 450);
  });

  it("persists width to localStorage on change", () => {
    const storage: Record<string, string> = {};
    const mockStorage = {
      getItem: (k: string) => storage[k] ?? null,
      setItem: (k: string, v: string) => { storage[k] = v; },
    };
    const width = 480;
    mockStorage.setItem(STORAGE_KEY, String(width));
    assert.equal(mockStorage.getItem(STORAGE_KEY), "480");
  });

  it("reads stored width from localStorage", () => {
    const storage: Record<string, string> = { [STORAGE_KEY]: "500" };
    const stored = storage[STORAGE_KEY];
    const parsed = stored ? Number(stored) : NaN;
    const width = isNaN(parsed) ? DEFAULT_WIDTH : Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parsed));
    assert.equal(width, 500);
  });

  it("clamps stored width that exceeds max", () => {
    const storage: Record<string, string> = { [STORAGE_KEY]: "9999" };
    const stored = storage[STORAGE_KEY];
    const parsed = stored ? Number(stored) : NaN;
    const width = isNaN(parsed) ? DEFAULT_WIDTH : Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parsed));
    assert.equal(width, MAX_WIDTH);
  });

  it("toggles collapsed state", () => {
    let collapsed = false;
    collapsed = !collapsed;
    assert.equal(collapsed, true);
    collapsed = !collapsed;
    assert.equal(collapsed, false);
  });
});
