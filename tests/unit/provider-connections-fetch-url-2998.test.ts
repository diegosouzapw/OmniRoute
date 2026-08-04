import assert from "node:assert/strict";
import test from "node:test";

import { getProviderConnectionsRequestUrl } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";

test("provider detail requests only the exact provider when no aliases are configured", () => {
  assert.equal(getProviderConnectionsRequestUrl("openai"), "/api/providers?provider=openai");
});

test("provider detail keeps alias-backed pages on the unfiltered request", () => {
  assert.equal(getProviderConnectionsRequestUrl("alibaba"), "/api/providers");
  assert.equal(getProviderConnectionsRequestUrl("kimi-coding"), "/api/providers");
});
