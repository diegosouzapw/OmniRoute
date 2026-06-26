/**
 * TDD for PR-012 — `src/app/api/v1/slo/*` route handlers.
 *
 * These are HTTP-shape tests, not behaviour tests. They validate that
 * each endpoint returns the documented JSON envelope with the right
 * status code and the right top-level fields.
 *
 * The endpoints are wrapped in pure-function helpers (see the
 * `__TEST_*` exports on each route module) so this test doesn't have to
 * spin up Next.js. We import the helpers and call them with synthetic
 * Request / context objects.
 *
 * 10 assertions across 4 describe blocks.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/api/slo.test.ts
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import {
  GET as listSlos,
  type SloListResponse,
} from "../../../../src/app/api/v1/slo/route.ts";
import {
  GET as getSlo,
  type SloDetailResponse,
} from "../../../../src/app/api/v1/slo/[sloId]/route.ts";
import {
  GET as getBurn,
  type BurnResponse,
} from "../../../../src/app/api/v1/slo/[sloId]/burn/route.ts";

before(() => {
  // Default off — these tests verify behaviour without depending on
  // real telemetry.
  delete process.env.SLO_TRACKER_ENABLED;
});

after(() => {
  delete process.env.SLO_TRACKER_ENABLED;
});

describe("GET /api/v1/slo (list)", () => {
  it("returns the catalog with the expected envelope shape", async () => {
    const res = await listSlos();
    assert.equal(res.status, 200);
    const body = (await res.json()) as SloListResponse;
    assert.equal(body.catalog_size, 5);
    assert.equal(typeof body.enabled, "boolean");
    assert.ok(Array.isArray(body.slos));
    assert.equal(body.slos.length, 5);
    // Each entry has the documented fields.
    for (const entry of body.slos) {
      assert.ok(entry.slo_id);
      assert.ok(entry.objective);
      assert.ok(entry.target > 0 && entry.target <= 1);
      assert.ok(["1h", "6h", "24h", "7d", "30d"].includes(entry.window));
      assert.ok(entry.description.length > 0);
      assert.ok(entry.owner.length > 0);
      // current is null when the tracker is disabled.
      assert.equal(entry.current, null);
    }
  });

  it("returns enabled=false when SLO_TRACKER_ENABLED is unset", async () => {
    delete process.env.SLO_TRACKER_ENABLED;
    const res = await listSlos();
    const body = (await res.json()) as SloListResponse;
    assert.equal(body.enabled, false);
  });

  it("sets enabled=true when SLO_TRACKER_ENABLED=true", async () => {
    process.env.SLO_TRACKER_ENABLED = "true";
    try {
      const res = await listSlos();
      const body = (await res.json()) as SloListResponse;
      assert.equal(body.enabled, true);
      // Each entry now has a populated `current`.
      for (const entry of body.slos) {
        assert.ok(entry.current, `expected current to be populated for ${entry.slo_id}`);
        assert.equal(entry.current!.slo_id, entry.slo_id);
        assert.equal(entry.current!.target, entry.target);
      }
    } finally {
      delete process.env.SLO_TRACKER_ENABLED;
    }
  });
});

describe("GET /api/v1/slo/[sloId] (detail)", () => {
  it("returns 404 for an unknown SLO id", async () => {
    const res = await getSlo(new Request("http://x/slo/SLO-999"), {
      params: Promise.resolve({ sloId: "SLO-999" }),
    });
    assert.equal(res.status, 404);
    const body = (await res.json()) as { error: { code: string } };
    assert.equal(body.error.code, "slo_not_found");
  });

  it("returns 400 when sloId path param is missing", async () => {
    const res = await getSlo(new Request("http://x/slo/"), {
      params: Promise.resolve({ sloId: "" }),
    });
    assert.equal(res.status, 400);
  });

  it("returns the full envelope for a known SLO", async () => {
    const res = await getSlo(new Request("http://x/slo/SLO-001"), {
      params: Promise.resolve({ sloId: "SLO-001" }),
    });
    assert.equal(res.status, 200);
    const body = (await res.json()) as SloDetailResponse;
    assert.equal(body.slo.slo_id, "SLO-001");
    assert.equal(body.slo.target, 0.999);
    assert.equal(typeof body.enabled, "boolean");
    assert.ok(Array.isArray(body.alerts));
    assert.ok(body.budget);
    assert.equal(body.budget.slo_id, "SLO-001");
  });
});

describe("GET /api/v1/slo/[sloId]/burn (burn-rate series)", () => {
  it("returns a series of the requested length with the right window", async () => {
    const res = await getBurn(
      new Request("http://x/slo/SLO-001/burn?window=1h&samples=60"),
      { params: Promise.resolve({ sloId: "SLO-001" }) }
    );
    assert.equal(res.status, 200);
    const body = (await res.json()) as BurnResponse;
    assert.equal(body.window, "1h");
    assert.equal(body.slo_id, "SLO-001");
    assert.equal(body.points.length, 60);
    assert.ok(body.summary);
    assert.equal(typeof body.summary.peak_burn, "number");
    assert.equal(typeof body.summary.mean_burn, "number");
    assert.equal(typeof body.summary.current_burn, "number");
  });

  it("rejects an invalid window with 400", async () => {
    const res = await getBurn(new Request("http://x/slo/SLO-001/burn?window=2h"), {
      params: Promise.resolve({ sloId: "SLO-001" }),
    });
    assert.equal(res.status, 400);
    const body = (await res.json()) as { error: { code: string } };
    assert.equal(body.error.code, "invalid_window");
  });

  it("returns 404 for an unknown SLO id", async () => {
    const res = await getBurn(new Request("http://x/slo/SLO-999/burn"), {
      params: Promise.resolve({ sloId: "SLO-999" }),
    });
    assert.equal(res.status, 404);
  });

  it("clamps samples to the documented [1, 500] range", async () => {
    const tooFew = await getBurn(new Request("http://x/slo/SLO-001/burn?samples=0"), {
      params: Promise.resolve({ sloId: "SLO-001" }),
    });
    const body = (await tooFew.json()) as BurnResponse;
    assert.equal(body.points.length, 60); // default

    const tooMany = await getBurn(new Request("http://x/slo/SLO-001/burn?samples=10000"), {
      params: Promise.resolve({ sloId: "SLO-001" }),
    });
    const body2 = (await tooMany.json()) as BurnResponse;
    assert.equal(body2.points.length, 500);
  });
});
