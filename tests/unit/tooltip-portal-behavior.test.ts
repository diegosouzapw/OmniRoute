/**
 * Issue #2352 — Tooltip must render in a React portal by default so it can
 * escape ancestor stacking contexts (modal `overflow-hidden`). Without the
 * portal, tooltips in the combo edit modal were clipped.
 *
 * Browser DOM is not available in this Node test runner, so this regression
 * guard verifies the source-level contract: (1) the component opts into a
 * portal by default, (2) the createPortal target is document.body, (3) the
 * `multiline` opt-out replaces the `whitespace-nowrap` clamp.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLTIP_SRC = path.resolve(__dirname, "../../src/shared/components/Tooltip.tsx");

const src = fs.readFileSync(TOOLTIP_SRC, "utf8");

test("#2352 Tooltip imports createPortal from react-dom", () => {
  assert.ok(
    /createPortal\s*\}\s*from\s+"react-dom"/.test(src),
    "Tooltip must import createPortal so it can break out of clipping ancestors"
  );
});

test("#2352 Tooltip exposes usePortal prop defaulted to true", () => {
  const propTrue = /usePortal\s*=\s*true/;
  const propDecl = /usePortal\s*\?:\s*boolean/;
  assert.ok(propDecl.test(src), "TooltipProps must declare optional usePortal prop");
  assert.ok(
    propTrue.test(src),
    "usePortal must default to true (the unsafe-by-default was the bug)"
  );
});

test("#2352 Tooltip portal target is document.body", () => {
  assert.ok(
    /createPortal\([^)]+,\s*document\.body\)/.test(src),
    "Portal target must be document.body so the tooltip escapes overflow:hidden ancestors"
  );
});

test("#2352 multiline prop swaps whitespace-nowrap for wrap-friendly classes", () => {
  assert.ok(
    /multiline\s*\?\s*"max-w-xs whitespace-normal break-words"\s*:\s*"whitespace-nowrap"/.test(src),
    "multiline=true must enable wrapping; default keeps the legacy single-line layout"
  );
});

test("#2352 portal tooltip uses fixed positioning (not absolute)", () => {
  // When portaled to document.body, absolute positioning relative to the
  // trigger no longer works — we need fixed coords computed from the
  // trigger's getBoundingClientRect().
  assert.ok(
    /portalEnabled[\s\S]{0,200}?`fixed\b/.test(src),
    "Portal-rendered tooltip must use position:fixed to align with computed coords"
  );
});

test("#2352 portal tooltip clamps to viewport bounds (overflow-aware)", () => {
  // Make sure the layout effect prevents the tooltip from running off the
  // right or left edge of the screen — that's the user's screenshot bug.
  assert.ok(
    /maxLeft|minLeft|window\.innerWidth/.test(src),
    "Portal tooltip must clamp horizontally so a trigger near the viewport edge stays visible"
  );
});
