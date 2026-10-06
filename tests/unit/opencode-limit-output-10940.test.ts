import { describe, it } from "node:test";
import assert from "node:assert";

/**
 * Regression guard for #10940: OpenCode rejects a generated config with
 * "Missing key provider.omniroute.models.{model}.limit.output" whenever a
 * model has no catalog metadata (no `context_length`, no
 * `max_output_tokens`) and no existing user override. `limit.output` is a
 * REQUIRED field in OpenCode's v1 provider schema, so it must always be
 * emitted — even when nothing is known about the model.
 */
describe("opencode config generator — limit.output always emitted (#10940)", () => {
  function makeCatalogResponse(models: unknown[]): unknown {
    return { object: "list", data: models };
  }

  function stubFetchOnce(body: unknown, status = 200) {
    const original = globalThis.fetch;
    // @ts-ignore — globalThis.fetch signature is compatible for our purposes
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;
    return {
      restore: () => {
        globalThis.fetch = original;
      },
    };
  }

  it("RED-proving case: a model with NO context_length and NO max_output_tokens still gets a numeric limit.output", async () => {
    // This model has no metadata whatsoever beyond its id — exactly the
    // shape that used to leave `entry.limit` undefined entirely (issue #10940).
    const stub = stubFetchOnce(
      makeCatalogResponse([{ id: "metadataless-model", owned_by: "someProvider" }])
    );
    try {
      const { generateOpencodeConfig } = await import(
        "../../src/lib/cli-helper/config-generator/opencode.ts"
      );
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
      });
      const cfg = JSON.parse(out);
      const entry = cfg.provider.omniroute.models["metadataless-model"];
      assert.ok(entry, "model entry must exist in the generated config");
      assert.ok(entry.limit, "entry.limit must be present even without catalog metadata");
      assert.strictEqual(
        typeof entry.limit.output,
        "number",
        `entry.limit.output must be a number, got ${JSON.stringify(entry.limit?.output)}`
      );
      assert.ok(entry.limit.output > 0, "entry.limit.output must be a positive number");
      // context defaults to 128k when unknown to satisfy OpenCode's required limit.context schema (#11035).
      assert.strictEqual(entry.limit.context, 128_000);
    } finally {
      stub.restore();
    }
  });

  it("honors the catalog's max_output_tokens when present", async () => {
    const stub = stubFetchOnce(
      makeCatalogResponse([
        { id: "has-output-meta", owned_by: "someProvider", max_output_tokens: 4096 },
      ])
    );
    try {
      const { generateOpencodeConfig } = await import(
        "../../src/lib/cli-helper/config-generator/opencode.ts"
      );
      const out = await generateOpencodeConfig({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
      });
      const cfg = JSON.parse(out);
      const entry = cfg.provider.omniroute.models["has-output-meta"];
      assert.strictEqual(entry.limit.output, 4096);
    } finally {
      stub.restore();
    }
  });
});
