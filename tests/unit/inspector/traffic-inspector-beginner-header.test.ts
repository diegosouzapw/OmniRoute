import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const pagePath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/tools/traffic-inspector/page.tsx"
);
const clientPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/tools/traffic-inspector/TrafficInspectorPageClient.tsx"
);
const enPath = path.join(repoRoot, "src/i18n/messages/en.json");

test("Traffic Inspector page passes translated title, subtitle, and purpose", () => {
  const pageSource = fs.readFileSync(pagePath, "utf8");
  assert.match(pageSource, /title=\{t\("trafficInspector"\)\}/);
  assert.match(pageSource, /subtitle=\{t\("trafficInspectorSubtitle"\)\}/);
  assert.match(pageSource, /purpose=\{t\("trafficInspectorPurpose"\)\}/);
});

test("Traffic Inspector client renders purpose-first header when props are provided", () => {
  const clientSource = fs.readFileSync(clientPath, "utf8");
  assert.match(clientSource, /title\s*&&/);
  assert.match(clientSource, /subtitle\s*&&/);
  assert.match(clientSource, /purpose\s*&&/);
});

test("Traffic Inspector beginner i18n keys exist in en.json", () => {
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  assert.equal(en.sidebar.trafficInspector, "Traffic Inspector");
  assert.equal(
    en.sidebar.trafficInspectorSubtitle,
    "Inspect request and response traffic from your apps"
  );
  assert.equal(
    typeof en.sidebar.trafficInspectorPurpose,
    "string"
  );
  assert.ok(en.sidebar.trafficInspectorPurpose.length > 20);
});
