import test from "node:test";
import assert from "node:assert/strict";
import { prepareConnectionModelTest } from "../../src/lib/providerModels/prepareConnectionModelTest.ts";

test("missing account catalog is synced and re-read before testing", async () => {
  let synced = false;
  const result = await prepareConnectionModelTest("codex", "new-account", "codex/gpt-6-luna", {
    load: async () => (synced ? [{ id: "gpt-6-luna" }] : []),
    sync: async (_provider, id) => {
      assert.equal(id, "new-account");
      synced = true;
      return true;
    },
  });
  assert.equal(result, null);
  assert.equal(synced, true);
});
test("known catalog excludes unsupported model without bypassing permissions", async () => {
  const result = await prepareConnectionModelTest("codex", "account", "gpt-missing", {
    load: async () => [{ id: "gpt-6-luna" }],
    sync: async () => {
      throw Error("must not sync");
    },
  });
  assert.equal(result?.status, 422);
});
test("failed sync reports catalog failure rather than missing credentials", async () => {
  const result = await prepareConnectionModelTest("codex", "account", "gpt-6-luna", {
    load: async () => [],
    sync: async () => false,
  });
  assert.equal(result?.status, 503);
  assert.match(result!.message, /catalog/);
});
test("non-subscription tests need no catalog", async () => {
  assert.equal(
    await prepareConnectionModelTest("openai", "account", "gpt-6-luna", {
      load: async () => {
        throw Error("must not load");
      },
      sync: async () => false,
    }),
    null
  );
});
test("concurrent tests share one sync for the same account", async () => {
  let calls = 0;
  let synced = false;
  const deps = {
    load: async () => (synced ? [{ id: "gpt-6-luna" }] : []),
    sync: async () => {
      calls++;
      await new Promise((resolve) => setTimeout(resolve, 10));
      synced = true;
      return true;
    },
  };
  const results = await Promise.all(
    [1, 2].map(() => prepareConnectionModelTest("codex", "parallel", "gpt-6-luna", deps))
  );
  assert.deepEqual(results, [null, null]);
  assert.equal(calls, 1);
});
