import test from "node:test";
import assert from "node:assert/strict";

const {
  resolveFivediveTarget,
  validateFivediveBaseUrl,
  buildFivediveAuthArgs,
  buildFivedivePinArgs,
  withPrivilege,
  renderCommand,
} = await import("../../../bin/cli/commands/setup-5dive.mjs");

test("5dive target resolves the Anthropic surface ROOT (5dive appends nothing)", () => {
  assert.equal(
    resolveFivediveTarget({ remote: "https://omniroute.example.test/v1" }).baseUrl,
    "https://omniroute.example.test"
  );
  assert.equal(
    resolveFivediveTarget({ remote: "https://omniroute.example.test/" }).baseUrl,
    "https://omniroute.example.test"
  );
});

test("5dive target falls back to the local server when no context and no --remote", () => {
  // Same resolution order as the sibling setup-* recipes: an active context (or
  // its PORT-derived default) is what the local fallback comes from.
  const previous = process.env.PORT;
  process.env.PORT = "20200";
  try {
    assert.equal(resolveFivediveTarget({}).baseUrl, "http://localhost:20200");
  } finally {
    if (previous === undefined) delete process.env.PORT;
    else process.env.PORT = previous;
  }
});

test("5dive target takes the API key from flags before the environment", () => {
  assert.equal(
    resolveFivediveTarget({ remote: "https://x.test", apiKey: "sk_flag" }).apiKey,
    "sk_flag"
  );
  assert.equal(
    resolveFivediveTarget({ remote: "https://x.test", "api-key": "sk_dash" }).apiKey,
    "sk_dash"
  );
});

test("base URL check mirrors 5dive: https anywhere, http only on loopback", () => {
  assert.equal(validateFivediveBaseUrl("https://omniroute.example.test").ok, true);
  assert.equal(validateFivediveBaseUrl("http://127.0.0.1:20128").ok, true);
  assert.equal(validateFivediveBaseUrl("http://localhost:20128").ok, true);
  assert.equal(validateFivediveBaseUrl("http://[::1]:20128").ok, true);

  const lan = validateFivediveBaseUrl("http://192.168.0.15:20128");
  assert.equal(lan.ok, false);
  // A private LAN is still off-box: the refusal has to say why, not just "no".
  assert.match(lan.reason, /plaintext/);

  assert.equal(validateFivediveBaseUrl("ftp://omniroute.example.test").ok, false);
  assert.equal(validateFivediveBaseUrl("").ok, false);
});

test("auth argv carries all four value flags and never the key itself", () => {
  const args = buildFivediveAuthArgs({
    baseUrl: "https://omniroute.example.test",
    profile: "omniroute",
    model: "failover-demo",
  });
  assert.deepEqual(args, [
    "agent",
    "auth",
    "set",
    "claude",
    "--provider=openai",
    "--base-url=https://omniroute.example.test",
    "--api-key=-",
    "--auth-profile=omniroute",
    "--model=failover-demo",
  ]);
  // `--api-key=-` is the stdin sentinel: the secret must not be reachable in `ps`.
  assert.ok(!args.some((a) => a.startsWith("--api-key=") && a !== "--api-key=-"));
});

test("auth argv honours a non-default BYO provider id", () => {
  const args = buildFivediveAuthArgs({
    baseUrl: "https://omniroute.example.test",
    profile: "p",
    model: "m",
    provider: "zai",
  });
  assert.ok(args.includes("--provider=zai"));
});

test("the per-seat model pin is a separate command, because the pin outranks the profile", () => {
  assert.deepEqual(buildFivedivePinArgs("orfail", "failover-demo"), [
    "agent",
    "config",
    "orfail",
    "set",
    "model=failover-demo",
  ]);
});

test("privilege wrapper only reaches for sudo when it has to", () => {
  assert.deepEqual(withPrivilege("5dive", ["agent"], { isRoot: true, useSudo: true }), [
    "5dive",
    ["agent"],
  ]);
  assert.deepEqual(withPrivilege("5dive", ["agent"], { isRoot: false, useSudo: false }), [
    "5dive",
    ["agent"],
  ]);
  assert.deepEqual(withPrivilege("5dive", ["agent"], { isRoot: false, useSudo: true }), [
    "sudo",
    ["5dive", "agent"],
  ]);
});

test("rendered commands stay copy-pasteable when a value needs quoting", () => {
  assert.equal(
    renderCommand("5dive", ["agent", "auth", "set", "--base-url=https://a.test"]),
    "5dive agent auth set --base-url=https://a.test"
  );
  assert.equal(renderCommand("5dive", ["--model=my model"]), "5dive '--model=my model'");
});
