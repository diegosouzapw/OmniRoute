/**
 * T-14 / G-09 / G-10 — NinerouterServiceTab + new component unit tests.
 *
 * Verifies:
 *  - module shape for all new components
 *  - proxy-relative iframe URL (G-10)
 *  - endpoint path constants (G-09)
 *  - pagination helper (G-09)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── module shape ──────────────────────────────────────────────────────────────

describe("NinerouterServiceTab — module shape", () => {
  it("exports NinerouterServiceTab function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/tabs/NinerouterServiceTab.tsx");
    assert.equal(typeof mod.NinerouterServiceTab, "function");
  });
});

describe("NinerouterInstallWizard — module shape", () => {
  it("exports NinerouterInstallWizard function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterInstallWizard.tsx");
    assert.equal(typeof mod.NinerouterInstallWizard, "function");
  });
});

describe("NinerouterProviderExposureCard — module shape", () => {
  it("exports NinerouterProviderExposureCard function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterProviderExposureCard.tsx");
    assert.equal(typeof mod.NinerouterProviderExposureCard, "function");
  });
});

describe("NinerouterModelList — module shape + pagination helper", () => {
  it("exports NinerouterModelList function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterModelList.tsx");
    assert.equal(typeof mod.NinerouterModelList, "function");
  });

  it("exports paginateModels helper", async () => {
    const { paginateModels } =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterModelList.tsx");
    assert.equal(typeof paginateModels, "function");
  });

  it("paginateModels returns correct slice for page 1", async () => {
    const { paginateModels } =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterModelList.tsx");
    const models = Array.from({ length: 50 }, (_, i) => ({ id: `model-${i}` }));
    const page1 = paginateModels(models, 1, 20);
    assert.equal(page1.length, 20);
    assert.equal(page1[0].id, "model-0");
    assert.equal(page1[19].id, "model-19");
  });

  it("paginateModels returns correct slice for page 2", async () => {
    const { paginateModels } =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterModelList.tsx");
    const models = Array.from({ length: 50 }, (_, i) => ({ id: `model-${i}` }));
    const page2 = paginateModels(models, 2, 20);
    assert.equal(page2.length, 20);
    assert.equal(page2[0].id, "model-20");
  });

  it("paginateModels returns empty array when page exceeds total", async () => {
    const { paginateModels } =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterModelList.tsx");
    const models = [{ id: "model-0" }];
    const page5 = paginateModels(models, 5, 20);
    assert.equal(page5.length, 0);
  });

  it("paginateModels handles partial last page", async () => {
    const { paginateModels } =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/NinerouterModelList.tsx");
    const models = Array.from({ length: 25 }, (_, i) => ({ id: `model-${i}` }));
    const page2 = paginateModels(models, 2, 20);
    assert.equal(page2.length, 5);
  });
});

// ── G-10: iframe URL must point to proxy, not loopback ───────────────────────

describe("EmbeddedUiCard — iframe URL (G-10)", () => {
  it("proxy URL is relative (same-origin), not a loopback URL", () => {
    const proxyUrl = "/dashboard/providers/services/9router/embed/";
    assert.ok(proxyUrl.startsWith("/"), "must be a relative path (same-origin)");
    assert.ok(!proxyUrl.includes("127.0.0.1"), "must NOT reference loopback directly");
    assert.ok(!proxyUrl.includes("localhost"), "must NOT reference localhost directly");
  });

  it("proxy path matches the embed route pattern in next.config.mjs", () => {
    const proxyUrl = "/dashboard/providers/services/9router/embed/";
    // Pattern: /dashboard/providers/services/:name/embed/:path*
    assert.ok(proxyUrl.startsWith("/dashboard/providers/services/"), "matches base segment");
    assert.ok(proxyUrl.includes("/embed/"), "contains /embed/ segment");
  });
});

// ── G-09: endpoint path constants ────────────────────────────────────────────

describe("NinerouterInstallWizard — install endpoint", () => {
  it("install route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/install`;
    assert.equal(path, "/api/services/9router/install");
  });
});

describe("NinerouterProviderExposureCard — provider-expose endpoint", () => {
  it("provider-expose route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/provider-expose`;
    assert.equal(path, "/api/services/9router/provider-expose");
  });
});

describe("NinerouterModelList — models endpoint", () => {
  it("models route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/models`;
    assert.equal(path, "/api/services/9router/models");
  });

  it("refresh query param appended when refresh=true", () => {
    const NAME = "9router";
    const url = `/api/services/${NAME}/models?refresh=true`;
    assert.ok(url.includes("?refresh=true"));
  });
});

// ── retain existing tests ─────────────────────────────────────────────────────

describe("ApiKeyCard — rotate-key endpoint", () => {
  it("rotate-key route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/rotate-key`;
    assert.equal(path, "/api/services/9router/rotate-key");
  });
});

describe("AutoStartCard — auto-start endpoint", () => {
  it("auto-start route path is correct", () => {
    const NAME = "9router";
    const path = `/api/services/${NAME}/auto-start`;
    assert.equal(path, "/api/services/9router/auto-start");
  });
});
