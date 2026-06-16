import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function readSrc(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function assertInOrder(source: string, labels: string[]) {
  let lastIndex = -1;
  for (const label of labels) {
    const index = source.indexOf(label);
    assert.notEqual(index, -1, `Expected to find ${label}`);
    assert.ok(index > lastIndex, `Expected ${label} to appear after previous marker`);
    lastIndex = index;
  }
}

test("Appearance page keeps theme color above branding and removes sidebar item controls", () => {
  const source = readSrc("src/app/(dashboard)/dashboard/settings/components/AppearanceTab.tsx");

  assert.doesNotMatch(source, /SidebarVisibilitySetting/);
  assertInOrder(source, ['t("themeAccent")', 't("whitelabeling")']);
});

test("Usage Token Buffer lives in AI settings instead of General storage", () => {
  const aiPage = readSrc("src/app/(dashboard)/dashboard/settings/ai/page.tsx");
  const generalStorage = readSrc(
    "src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx"
  );

  assert.match(aiPage, /UsageTokenBufferTab/);
  assert.doesNotMatch(generalStorage, /storageUsageTokenBuffer/);
});

test("Global Routing page renders top-level modules in the requested order", () => {
  const page = readSrc("src/app/(dashboard)/dashboard/settings/routing/page.tsx");
  const routingTab = readSrc("src/app/(dashboard)/dashboard/settings/components/RoutingTab.tsx");

  assertInOrder(page, [
    "<ComboDefaultsTab",
    "<ModelAliasesUnified",
    "<FallbackChainsEditor",
    "<ModelRoutingSection",
    "<RoutingTab",
    "<BackgroundDegradationTab",
  ]);

  assertInOrder(routingTab, [
    't("routingZeroConfigTitle")',
    't("systemTransforms")',
    't("cliFingerprint")',
    't("routingClientCacheControlTitle")',
    't("routingAntigravitySignatureTitle")',
    't("lkgpToggleTitle")',
    't("adaptiveVolumeRouting")',
  ]);
});
