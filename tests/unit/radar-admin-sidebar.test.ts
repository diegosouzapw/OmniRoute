import test from "node:test";
import assert from "node:assert/strict";

import {
  SIDEBAR_SECTIONS,
  getSectionItems,
  resolveRuntimeSidebarSections,
} from "../../src/shared/constants/sidebarVisibility.ts";
import { getRadarAdminUrl } from "../../src/lib/radar/links.ts";

const ORIGINAL_RADAR_ADMIN_URL = process.env.RADAR_ADMIN_URL;

test.beforeEach(() => {
  delete process.env.RADAR_ADMIN_URL;
});

test.after(() => {
  if (ORIGINAL_RADAR_ADMIN_URL === undefined) delete process.env.RADAR_ADMIN_URL;
  else process.env.RADAR_ADMIN_URL = ORIGINAL_RADAR_ADMIN_URL;
});

function runtimeCostsItems(input: unknown) {
  const sections = resolveRuntimeSidebarSections(SIDEBAR_SECTIONS, {
    radarAdminUrl: input,
  });
  const costs = sections.find((section) => section.id === "costs");
  assert.ok(costs, "costs section must exist");
  return getSectionItems(costs);
}

test("G17: missing RADAR_ADMIN_URL has no public default", () => {
  assert.equal(getRadarAdminUrl(), null);
  assert.equal(
    runtimeCostsItems(null).some((item) => item.id === "radar-admin"),
    false
  );
});

test("G17: accepts an HTTPS tunnel URL and inserts owner link immediately after Radar", () => {
  process.env.RADAR_ADMIN_URL = "https://radar-admin.example.test/ops";

  const url = getRadarAdminUrl();
  assert.equal(url, "https://radar-admin.example.test/ops");

  const items = runtimeCostsItems(url);
  const radarIndex = items.findIndex((item) => item.id === "radar");
  const adminItem = items[radarIndex + 1];

  assert.equal(adminItem.id, "radar-admin");
  assert.equal(adminItem.href, url);
  assert.equal(adminItem.external, true);
  assert.equal(adminItem.labelFallback, "Radar Admin ↗");
});

test("G17: accepts an HTTP loopback URL used by an SSH local-forward tunnel", () => {
  process.env.RADAR_ADMIN_URL = "http://127.0.0.1:9351";
  assert.equal(getRadarAdminUrl(), "http://127.0.0.1:9351/");
});

test("G17: rejects unsafe or non-tunnel URL shapes and keeps the sidebar inert", () => {
  const rejected = [
    "javascript:alert(1)",
    "https://owner:secret@radar-admin.example.test",
    "http://radar-admin.example.test:9351",
    "http://127.0.0.1.evil.example:9351",
    "not-a-url",
  ];

  for (const candidate of rejected) {
    process.env.RADAR_ADMIN_URL = candidate;
    assert.equal(getRadarAdminUrl(), null, candidate);
    assert.equal(
      runtimeCostsItems(candidate).some((item) => item.id === "radar-admin"),
      false,
      candidate
    );
  }
});

test("G17: runtime injection never mutates the canonical static sections", () => {
  const before = getSectionItems(SIDEBAR_SECTIONS.find((section) => section.id === "costs")!);
  resolveRuntimeSidebarSections(SIDEBAR_SECTIONS, {
    radarAdminUrl: "https://radar-admin.example.test",
  });
  const after = getSectionItems(SIDEBAR_SECTIONS.find((section) => section.id === "costs")!);

  assert.equal(
    before.some((item) => item.id === "radar-admin"),
    false
  );
  assert.deepEqual(after, before);
});
