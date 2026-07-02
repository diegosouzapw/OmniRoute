import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Source-level parity check (#241): AntigravityToolCard must surface
// API-Key-compatible / custom OpenAI-compatible providers in its model picker.
// Those provider groups in <ModelSelectModal> are derived from `modelAliases`
// — without the prop, custom-keyed providers are silently hidden even when
// active. The fix mirrors the pattern already used by every sibling CLI tool
// card (Codex, Claude, Cline, Kilo, Droid, OpenClaw, HermesAgent).

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARD_PATH = resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/cli-code/components/AntigravityToolCard.tsx"
);

describe("AntigravityToolCard model alias wiring", () => {
  const source = readFileSync(CARD_PATH, "utf8");

  it("declares modelAliases state", () => {
    expect(source).toMatch(/useState\(\{\}\)/);
    expect(source).toMatch(/setModelAliases/);
  });

  it("fetches /api/models/alias when expanded", () => {
    expect(source).toContain('fetch("/api/models/alias")');
    expect(source).toMatch(/fetchModelAliases\s*\(\s*\)/);
  });

  it("passes modelAliases prop to ModelSelectModal", () => {
    // Regression guard for upstream parity: the prop is what unlocks the
    // API-Key-compatible / passthrough provider groups in the picker.
    expect(source).toMatch(/modelAliases=\{modelAliases\}/);
  });
});
