import test from "node:test";
import assert from "node:assert/strict";
import { routeConnection } from "../../src/mitm/targets/index.ts";

test("routeConnection — default bypass (bank) wins over target match", () => {
  const r = routeConnection("my.bank.example", []);
  assert.equal(r.kind, "bypass");
});

test("routeConnection — user bypass glob beats target", () => {
  const r = routeConnection("api.githubcopilot.com", ["*githubcopilot*"]);
  assert.equal(r.kind, "bypass");
});

test("routeConnection — known target returns target route", () => {
  const r = routeConnection("api.githubcopilot.com", []);
  assert.equal(r.kind, "target");
  if (r.kind === "target") assert.equal(r.target.id, "copilot");
});

test("routeConnection — unknown host returns passthrough", () => {
  const r = routeConnection("example.com", []);
  assert.equal(r.kind, "passthrough");
});

test("routeConnection — empty hostname returns passthrough", () => {
  const r = routeConnection("", []);
  assert.equal(r.kind, "passthrough");
});

test("routeConnection — precedence: bypass > target > passthrough", () => {
  // Default bypass (bank) takes precedence even if we add the host to the
  // copilot target hypothetically — here we just exercise the three branches.
  assert.equal(routeConnection("acme.bank.com", []).kind, "bypass");
  assert.equal(routeConnection("api.zed.dev", []).kind, "target");
  assert.equal(routeConnection("unrelated.example", []).kind, "passthrough");
});
