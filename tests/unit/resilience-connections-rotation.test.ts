// Rotation attribution on the resilience/connections route: rotation section
// present from a recorded snapshot, null when absent (nominal multi-process
// case — never a "rotation" degradation), repeat reads side-effect free.
import test from "node:test";
import assert from "node:assert/strict";

import { createProviderConnection } from "../../src/lib/db/providers.ts";
import { recordRotationSnapshot, maskAccountId } from "../../open-sse/executors/accountRotation.ts";

process.env.ROTATION_ATTRIBUTION = "true";

const { GET } = await import("../../src/app/api/resilience/connections/route.ts");

function makeReq(query = ""): Request {
  return new Request(`http://localhost/api/resilience/connections${query}`);
}

test("rotation section reflects a recorded snapshot, repeat reads identical", async () => {
  const created = await createProviderConnection({
    provider: "opencode",
    authType: "none",
    name: "rotation-conn",
    priority: 1,
  });
  const id = created.id as string;
  const fp = "abcdef1234567890";
  const future = Date.now() + 60_000;
  recordRotationSnapshot(id, [
    { masked: maskAccountId(fp), ready: false, cooldownUntilMs: future, consecutiveFails: 2 },
    { masked: maskAccountId(""), ready: true, cooldownUntilMs: null, consecutiveFails: 0 },
  ]);
  const first = (await (await GET(makeReq())).json()) as {
    connections: Array<{
      id: string;
      rotation: Array<{
        masked: string;
        ready: boolean;
        cooldownUntilMs: number | null;
        consecutiveFails: number;
      }> | null;
    }>;
    meta: { degraded: string[] };
  };
  const conn = first.connections.find((c) => c.id === id);
  assert.ok(conn, "connection should exist");
  assert.ok(conn!.rotation, "rotation should be present");
  assert.equal(conn!.rotation!.length, 2);
  assert.equal(conn!.rotation![0].masked, maskAccountId(fp));
  assert.ok(!conn!.rotation![0].masked.includes(fp.slice(8)));
  assert.equal(conn!.rotation![0].consecutiveFails, 2);
  assert.equal(conn!.rotation![1].masked, "direct");
  const second = (await (await GET(makeReq())).json()) as typeof first;
  assert.deepEqual(
    second.connections.find((c) => c.id === id)!.rotation,
    conn!.rotation,
    "repeat reads must be identical (no implicit reset)"
  );
  assert.ok(!second.meta.degraded.includes("rotation"), "snapshot read must not degrade");
});

test("missing snapshot yields rotation null without rotation degradation", async () => {
  const created = await createProviderConnection({
    provider: "opencode",
    authType: "none",
    name: "rotation-absent-conn",
    priority: 1,
  });
  const id = created.id as string;
  const body = (await (await GET(makeReq())).json()) as {
    connections: Array<{ id: string; rotation: unknown }>;
    meta: { degraded: string[] };
  };
  const conn = body.connections.find((c) => c.id === id);
  assert.ok(conn, "connection should exist");
  assert.equal(conn!.rotation, null);
  assert.ok(
    !body.meta.degraded.includes("rotation"),
    "absence is nominal (multi-process), not a degradation"
  );
});
