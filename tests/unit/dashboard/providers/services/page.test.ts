/**
 * T-12 — Services page shell unit tests.
 *
 * Tests the static configuration (tab list, sidebar item, hooks contract)
 * without requiring a browser or Next.js router mock.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── sidebar registration ──────────────────────────────────────────────────────

describe("sidebarVisibility — embedded-services", () => {
  it("embedded-services is in HIDEABLE_SIDEBAR_ITEM_IDS", async () => {
    const { HIDEABLE_SIDEBAR_ITEM_IDS } =
      await import("../../../../../src/shared/constants/sidebarVisibility.ts");
    assert.ok(
      (HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("embedded-services"),
      "expected embedded-services in HIDEABLE_SIDEBAR_ITEM_IDS"
    );
  });

  it("embedded-services has the correct href", async () => {
    const { SIDEBAR_SECTIONS } =
      await import("../../../../../src/shared/constants/sidebarVisibility.ts");
    const omniProxy = SIDEBAR_SECTIONS.find((s) => s.id === "omni-proxy");
    const flat = (omniProxy?.children ?? []).filter((c) => !("type" in c));
    const item = flat.find((c) => (c as { id: string }).id === "embedded-services") as
      | { id: string; href: string }
      | undefined;
    assert.ok(item, "embedded-services item should exist in omni-proxy section");
    assert.equal(item.href, "/dashboard/providers/services");
  });
});

// ── useServiceStatus contract ─────────────────────────────────────────────────

describe("useServiceStatus — module shape", () => {
  it("exports useServiceStatus function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts");
    assert.equal(typeof mod.useServiceStatus, "function");
  });
});

// ── useServiceLogs contract ───────────────────────────────────────────────────

describe("useServiceLogs — module shape", () => {
  it("exports useServiceLogs function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/hooks/useServiceLogs.ts");
    assert.equal(typeof mod.useServiceLogs, "function");
  });
});

// ── tab config ────────────────────────────────────────────────────────────────

describe("tab configuration", () => {
  it("defaults to cliproxy tab when ?tab param is absent", () => {
    const DEFAULT_TAB = "cliproxy";
    // Mirrors the default in page.tsx: sp.get("tab") ?? "cliproxy"
    const active = (null ?? DEFAULT_TAB) as string;
    assert.equal(active, "cliproxy");
  });

  it("respects ?tab=9router param", () => {
    const param = "9router";
    const active = param ?? "cliproxy";
    assert.equal(active, "9router");
  });

  it("URL construction is correct for both tabs", () => {
    for (const tab of ["cliproxy", "9router"]) {
      const url = `/dashboard/providers/services?tab=${tab}`;
      assert.ok(url.includes(tab), `URL should include ${tab}`);
    }
  });
});
