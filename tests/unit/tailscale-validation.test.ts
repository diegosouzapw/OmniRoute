import assert from "node:assert/strict";
import test from "node:test";

import { tailscaleEnableSchema } from "../../src/app/api/tunnels/tailscale/routeUtils.ts";
import { buildWindowsTailscaleInstallCommand } from "../../src/lib/tailscaleTunnel.ts";

test("tailscale enable accepts only valid TCP ports", () => {
  assert.equal(tailscaleEnableSchema.safeParse({ port: 1 }).success, true);
  assert.equal(tailscaleEnableSchema.safeParse({ port: 65535 }).success, true);
  assert.equal(tailscaleEnableSchema.safeParse({ port: 0 }).success, false);
  assert.equal(tailscaleEnableSchema.safeParse({ port: 65536 }).success, false);
});

test("Windows installer command escapes apostrophes in MSI paths", () => {
  assert.equal(
    buildWindowsTailscaleInstallCommand("C:\\Users\\O'Brien\\tailscale-setup.msi"),
    "Start-Process msiexec -ArgumentList '/i','C:\\Users\\O''Brien\\tailscale-setup.msi','TS_NOLAUNCH=true','/quiet','/norestart' -Verb RunAs -Wait"
  );
});
