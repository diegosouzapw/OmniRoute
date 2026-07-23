import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1263: `tailscale up` was built without ever reading
// process.env.TAILSCALE_AUTHKEY, so on a pre-authenticated / headless daemon the login
// waited for an interactive auth URL and timed out. The arg builder must include
// `--auth-key=<key>` when the env var is set, and omit it otherwise.
const { tailscaleUpArgs } = await import("../../src/lib/tailscaleTunnel.ts");

test("#1263: includes --auth-key when an auth key is provided", () => {
  const args = tailscaleUpArgs("my-host", "tskey-auth-abc123");
  assert.ok(args.includes("--auth-key=tskey-auth-abc123"), "expected --auth-key in args");
  assert.ok(args.includes("up"));
  assert.ok(args.includes("--accept-routes"));
  assert.ok(args.includes("--hostname=my-host"));
});

test("#1263: omits --auth-key when no key is provided", () => {
  const args = tailscaleUpArgs("my-host", undefined);
  assert.equal(
    args.some((a) => a.startsWith("--auth-key")),
    false,
    "no auth-key arg when key is absent"
  );
});

test("#1263: omits --hostname when no hostname is provided", () => {
  const args = tailscaleUpArgs(undefined, "tskey-auth-abc123");
  assert.equal(
    args.some((a) => a.startsWith("--hostname")),
    false,
    "no hostname arg when hostname is absent"
  );
  assert.ok(args.includes("--auth-key=tskey-auth-abc123"));
});
