/**
 * Source-guard test: ManualConfigModal must use the shared useCopyToClipboard
 * hook (which delegates to src/shared/utils/clipboard.ts for HTTP/HTTPS fallback)
 * rather than re-implementing the navigator.clipboard + execCommand fallback
 * inline.
 *
 * Rationale: duplicated inline fallbacks drift from the canonical helper.
 * Two known divergences in the previous inline copy:
 *   1. `window.isSecureContext` gate skipped navigator.clipboard on some
 *      browsers that allow it in non-secure contexts.
 *   2. No `finally` cleanup if execCommand threw after appendChild succeeded,
 *      leaking a hidden textarea in the DOM.
 *
 * The shared helper handles both correctly. This test pins the migration.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(__dirname, "../../src/shared/components/ManualConfigModal.tsx");

describe("ManualConfigModal — clipboard migration to shared hook", () => {
  const src = readFileSync(FILE, "utf8");

  it("imports useCopyToClipboard from the shared hooks barrel", () => {
    assert.match(
      src,
      /useCopyToClipboard/,
      "expected ManualConfigModal to consume the shared useCopyToClipboard hook"
    );
  });

  it("does not call navigator.clipboard directly (delegated to the hook)", () => {
    assert.doesNotMatch(
      src,
      /navigator\.clipboard/,
      "ManualConfigModal must not call navigator.clipboard directly; use the shared hook"
    );
  });

  it("does not call document.execCommand('copy') inline (delegated to the hook)", () => {
    assert.doesNotMatch(
      src,
      /document\.execCommand\(\s*["']copy["']\s*\)/,
      "ManualConfigModal must not inline the execCommand fallback; use the shared hook"
    );
  });

  it("does not gate on window.isSecureContext (the shared helper does the right thing)", () => {
    assert.doesNotMatch(
      src,
      /isSecureContext/,
      "ManualConfigModal must not gate on isSecureContext; the shared helper handles fallback correctly"
    );
  });
});
