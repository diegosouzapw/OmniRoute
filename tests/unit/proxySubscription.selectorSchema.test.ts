import test from "node:test";
import assert from "node:assert/strict";

const schema = await import("../../src/lib/proxySubscription/schema.ts");
const { proxySubscriptionCreateSchema, proxySubscriptionUpdateSchema, firstIssueMessage } = schema;

test("create accepts control fields, clamps gap, coerces", () => {
  const parsed = proxySubscriptionCreateSchema.safeParse({
    name: "core",
    url: "http://127.0.0.1:8080/list",
    controlUrl: "http://127.0.0.1:9090",
    controlSecret: "s3cret",
    selectorMinGapSeconds: 30,
  });
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.controlUrl, "http://127.0.0.1:9090");
    assert.equal(parsed.data.controlSecret, "s3cret");
    assert.equal(parsed.data.selectorMinGapSeconds, 30);
  }
});

test("create clamps gap to [0, 3600], defaults 60", () => {
  const a = proxySubscriptionCreateSchema.safeParse({ name: "n", url: "u" });
  assert.equal(a.success, true);
  if (a.success) assert.equal(a.data.selectorMinGapSeconds, 60);
  const b = proxySubscriptionCreateSchema.safeParse({
    name: "n",
    url: "u",
    selectorMinGapSeconds: 99999,
  });
  assert.equal(b.success, true);
  if (b.success) assert.equal(b.data.selectorMinGapSeconds, 3600);
  const c = proxySubscriptionCreateSchema.safeParse({
    name: "n",
    url: "u",
    selectorMinGapSeconds: -5,
  });
  assert.equal(c.success, true);
  if (c.success) assert.equal(c.data.selectorMinGapSeconds, 0);
});

test("create rejects non-http control_url with first-field-wins 400", () => {
  for (const bad of ["socks5://127.0.0.1:1080", "file:///x", "not a url", "ftp://h/x"]) {
    const parsed = proxySubscriptionCreateSchema.safeParse({
      name: "n",
      url: "u",
      controlUrl: bad,
    });
    assert.equal(parsed.success, false, bad);
    if (!parsed.success) {
      assert.match(firstIssueMessage(parsed.error), /controlUrl/i, bad);
    }
  }
});

test("create rejects non-loopback non-allowlisted control host", () => {
  const parsed = proxySubscriptionCreateSchema.safeParse({
    name: "n",
    url: "u",
    controlUrl: "http://192.168.1.1:9090",
  });
  assert.equal(parsed.success, false);
});

test("update accepts control fields partially, rejects bad url", () => {
  const ok = proxySubscriptionUpdateSchema.safeParse({ controlUrl: "http://127.0.0.1:9090" });
  assert.equal(ok.success, true);
  const bad = proxySubscriptionUpdateSchema.safeParse({ controlUrl: "gopher://x" });
  assert.equal(bad.success, false);
  const gap = proxySubscriptionUpdateSchema.safeParse({ selectorMinGapSeconds: "45" });
  assert.equal(gap.success, true);
  if (gap.success) assert.equal(gap.data.selectorMinGapSeconds, 45);
});

test("update with empty controlUrl clears it", () => {
  const parsed = proxySubscriptionUpdateSchema.safeParse({ controlUrl: "   " });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.controlUrl, null);
});
