import test from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";

test("hackclub provider is removed from REGISTRY", () => {
  assert.equal("hackclub" in REGISTRY, false);
});
