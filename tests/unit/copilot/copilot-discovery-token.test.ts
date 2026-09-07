import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveCopilotDiscoveryToken } from "../../../src/lib/providerModels/copilotDiscoveryToken.ts";

test("test 8: raw accessToken wins over exchanged copilotToken", () => {
  assert.equal(
    resolveCopilotDiscoveryToken({
      accessToken: "gho_raw",
      copilotToken: "tid_exchanged",
    }),
    "gho_raw"
  );
  assert.equal(
    resolveCopilotDiscoveryToken({ accessToken: "", copilotToken: "tid_exchanged" }),
    "tid_exchanged"
  );
  assert.equal(resolveCopilotDiscoveryToken({ accessToken: "  ", copilotToken: "  " }), null);
});

test("test 8: github and ghe discovery both prefer raw accessToken via helper", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/providers/[id]/models/route.ts"),
    "utf8"
  );
  const helperSrc = fs.readFileSync(
    path.join(process.cwd(), "src/lib/providerModels/copilotDiscoveryToken.ts"),
    "utf8"
  );
  assert.doesNotMatch(helperSrc, /src\/app\/api/);
  const calls = source.match(/resolveCopilotDiscoveryToken\(\s*\{[\s\S]*?\}\s*\)/g) ?? [];
  assert.equal(calls.length, 2, "github and ghe branches must both call the helper");
  for (const call of calls) {
    assert.match(call, /accessToken/);
    assert.match(call, /copilotToken:\s*psd\.copilotToken/);
  }
  assert.doesNotMatch(
    source,
    /toNonEmptyString\(psd\.copilotToken\)\s*\|\|\s*toNonEmptyString\(accessToken\)/
  );
});
