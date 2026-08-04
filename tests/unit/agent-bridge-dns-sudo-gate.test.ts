/**
 * #7938 — Agent Bridge DNS toggle must not spawn `sudo -S` with an empty password.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isSudoPasswordRequired } from "../../src/mitm/dns/dnsConfig.ts";

const dnsRoute = await import(
  "../../src/app/api/tools/agent-bridge/agents/[id]/dns/route.ts"
);

function makeDnsRequest(body: Record<string, unknown> = { enabled: true }) {
  return new Request("http://127.0.0.1/api/tools/agent-bridge/agents/cursor/dns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST .../[id]/dns returns 400 Missing sudoPassword when sudo is required and none supplied", async () => {
  if (process.platform === "win32") return;
  if (!isSudoPasswordRequired()) return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;

  const res = await dnsRoute.POST(makeDnsRequest({ enabled: true }), {
    params: { id: "cursor" },
  });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Missing sudoPassword/);
});

test("POST .../[id]/dns returns 400 for whitespace-only sudoPassword", async () => {
  if (process.platform === "win32") return;
  if (!isSudoPasswordRequired()) return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;

  const res = await dnsRoute.POST(makeDnsRequest({ enabled: true, sudoPassword: "   " }), {
    params: { id: "cursor" },
  });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Missing sudoPassword/);
});
