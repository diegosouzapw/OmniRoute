/**
 * #7938 — Trust Cert must gate empty sudo the same way as Remove CA / Repair.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isSudoPasswordRequired } from "../../src/mitm/dns/dnsConfig.ts";

const certRoute = await import("../../src/app/api/tools/agent-bridge/cert/route.ts");
const serverRoute = await import("../../src/app/api/tools/agent-bridge/server/route.ts");

function skipWhenSudoNotRequired() {
  if (process.platform === "win32") return true;
  if (!isSudoPasswordRequired()) return true;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  return isRootUser;
}

test("POST /cert returns 400 Missing sudoPassword when sudo is required and none supplied", async () => {
  if (skipWhenSudoNotRequired()) return;

  const res = await certRoute.POST(
    new Request("http://127.0.0.1/api/tools/agent-bridge/cert", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Missing sudoPassword/);
});

test("POST /server trust-cert returns 400 Missing sudoPassword when sudo is required", async () => {
  if (skipWhenSudoNotRequired()) return;

  const res = await serverRoute.POST(
    new Request("http://127.0.0.1/api/tools/agent-bridge/server", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "trust-cert" }),
    })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Missing sudoPassword/);
});
