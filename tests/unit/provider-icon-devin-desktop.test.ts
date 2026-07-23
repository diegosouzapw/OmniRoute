import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [providerIconSource, lobeProviderIconsSource] = await Promise.all([
  readFile(new URL("../../src/shared/components/ProviderIcon.tsx", import.meta.url), "utf8"),
  readFile(new URL("../../src/shared/components/lobeProviderIcons.ts", import.meta.url), "utf8"),
]);

test("devin-desktop skips the nonexistent local SVG on first render", () => {
  const knownSvgs = providerIconSource.match(/const KNOWN_SVGS = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(knownSvgs, "expected ProviderIcon KNOWN_SVGS declaration");
  assert.doesNotMatch(knownSvgs[1], /["']devin-desktop["']/);
});

test("devin-desktop resolves to the existing Devin lobe icon", () => {
  assert.match(lobeProviderIconsSource, /["']devin-desktop["']:\s*["']Devin["']/);
  assert.doesNotMatch(lobeProviderIconsSource, /["']devin-desktop["']:\s*["']Windsurf["']/);
});
