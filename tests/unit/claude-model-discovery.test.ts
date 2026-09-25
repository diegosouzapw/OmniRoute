import test from "node:test";
import assert from "node:assert/strict";
import { fetchClaudeDiscoveryModels } from "../../src/app/api/providers/[id]/models/discovery/claude.ts";

const auth = { accessToken: "oauth-test", apiKey: "" };

test("Claude catalog accepts new IDs, drops invalid records and deduplicates", async () => {
  const models = await fetchClaudeDiscoveryModels({
    ...auth,
    fetchImpl: async () =>
      Response.json({
        data: [
          { id: "claude-future-model", display_name: "Future model" },
          { id: "claude-future-model" },
          { id: "https://untrusted.invalid" },
          { id: "claude-image", type: "image" },
          { id: 1 },
        ],
        has_more: false,
      }),
  });
  assert.deepEqual(
    models.map((m) => m.id),
    ["claude-future-model"]
  );
  assert.equal(models[0].inputTokenLimit, undefined);
});

test("Claude discovery rejects malformed, empty and incomplete catalogs", async () => {
  for (const payload of [
    {},
    { data: [], has_more: false },
    { data: [{ id: "claude-new" }], has_more: true },
  ]) {
    await assert.rejects(
      fetchClaudeDiscoveryModels({ ...auth, fetchImpl: async () => Response.json(payload) })
    );
  }
});

test("Claude discovery rejects failed later pages instead of returning a partial catalog", async () => {
  let calls = 0;
  await assert.rejects(
    fetchClaudeDiscoveryModels({
      ...auth,
      fetchImpl: async () => {
        calls++;
        return calls === 1
          ? Response.json({
              data: [{ id: "claude-first" }],
              has_more: true,
              last_id: "claude-first",
            })
          : new Response("private failure", { status: 401 });
      },
    }),
    /HTTP 401/
  );
  assert.equal(calls, 2);
});

test("Claude discovery bounds repeated and endlessly advancing pagination", async () => {
  for (const repeat of [true, false]) {
    let calls = 0;
    await assert.rejects(
      fetchClaudeDiscoveryModels({
        ...auth,
        fetchImpl: async () => {
          calls++;
          return Response.json({
            data: [{ id: `claude-${calls}` }],
            has_more: true,
            last_id: repeat ? "same" : `cursor-${calls}`,
          });
        },
      }),
      /pagination/
    );
    assert.equal(calls, repeat ? 2 : 10);
  }
});

test("Claude discovery requires credentials without making an anonymous request", async () => {
  await assert.rejects(
    fetchClaudeDiscoveryModels({
      accessToken: "",
      apiKey: "",
      fetchImpl: async () => {
        assert.fail("unexpected network");
      },
    }),
    /credentials/
  );
});
