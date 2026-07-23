import test from "node:test";
import assert from "node:assert/strict";

// #5298: `/dashboard/context` had only sub-routes and no parent page, so RSC
// prefetches of the bare parent 404'd. The new parent page redirects to a
// canonical sub-route; this guards the pure route resolver it uses.
const { resolveContextRoute } =
  await import("../../../src/app/(dashboard)/dashboard/context/page.tsx");

test("#5298: resolveContextRoute defaults the bare parent to the canonical sub-route", () => {
  assert.equal(resolveContextRoute(undefined), "/dashboard/context/settings");
  assert.equal(resolveContextRoute(""), "/dashboard/context/settings");
});

test("#5298: resolveContextRoute maps a known tab to its sub-route", () => {
  assert.equal(resolveContextRoute("ultra"), "/dashboard/context/ultra");
  assert.equal(resolveContextRoute("session-dedup"), "/dashboard/context/session-dedup");
  assert.equal(resolveContextRoute("llmlingua"), "/dashboard/context/llmlingua");
});

test("#5298: resolveContextRoute falls back to the default for an unknown tab", () => {
  assert.equal(resolveContextRoute("bogus"), "/dashboard/context/settings");
});
