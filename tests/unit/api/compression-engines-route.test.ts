import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

describe("GET /api/compression/engines", () => {
  let GET: () => Promise<Response>;

  before(async () => {
    const mod = await import("../../../src/app/api/compression/engines/route.ts");
    GET = mod.GET;
  });

  it("returns an engines array", async () => {
    const res = await GET();
    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as { engines: unknown[] };
    assert.ok(Array.isArray(body.engines), "response should have an engines array");
    assert.ok(body.engines.length > 0, "engines array should be non-empty");
  });

  it("includes headroom and caveman engines", async () => {
    const res = await GET();
    const body = (await res.json()) as { engines: Array<{ id: string }> };
    const ids = body.engines.map((e) => e.id);
    assert.ok(ids.includes("headroom"), `engines should include headroom, got: ${ids.join(", ")}`);
    assert.ok(ids.includes("caveman"), `engines should include caveman, got: ${ids.join(", ")}`);
  });

  it("headroom entry has non-empty configSchema and numeric stackPriority", async () => {
    const res = await GET();
    const body = (await res.json()) as {
      engines: Array<{
        id: string;
        configSchema: Array<{ key: string }>;
        stackPriority: unknown;
      }>;
    };
    const headroom = body.engines.find((e) => e.id === "headroom");
    assert.ok(headroom, "headroom engine should be present");
    assert.ok(
      Array.isArray(headroom.configSchema) && headroom.configSchema.length > 0,
      "headroom configSchema should be a non-empty array"
    );
    assert.strictEqual(
      typeof headroom.stackPriority,
      "number",
      "headroom stackPriority should be a number"
    );
  });

  it("headroom configSchema includes the 'minRows' field key", async () => {
    const res = await GET();
    const body = (await res.json()) as {
      engines: Array<{
        id: string;
        configSchema: Array<{ key: string }>;
      }>;
    };
    const headroom = body.engines.find((e) => e.id === "headroom");
    assert.ok(headroom, "headroom engine should be present");
    const hasMinRows = headroom.configSchema.some((f) => f.key === "minRows");
    assert.ok(
      hasMinRows,
      `headroom configSchema should contain a field with key 'minRows', got keys: ${headroom.configSchema.map((f) => f.key).join(", ")}`
    );
  });
});
