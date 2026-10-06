import { afterEach, describe, expect, it } from "vitest";

import { _injectPipeline, embedTransformers } from "../embedding/transformersLocal";

describe("optional Transformers backend in UI tests", () => {
  afterEach(() => {
    _injectPipeline(null);
  });

  it("reports an unavailable backend without downloading a model", async () => {
    _injectPipeline(null);

    const result = await embedTransformers("offline test");

    expect(result).toMatchObject({
      source: "transformers",
      reason: "model_load_failed",
      message: "Optional Transformers runtime is unavailable in UI unit tests",
    });
  });

  it("uses an injected pipeline without the optional runtime", async () => {
    _injectPipeline(async () => ({ data: new Float32Array([1, 2]), dims: [1, 2] }));

    const result = await embedTransformers("offline test");

    expect(result).toMatchObject({ source: "transformers", dimensions: 2 });
    if (!("vector" in result)) {
      throw new Error(`Expected an embedding vector, received ${result.reason}`);
    }
    expect(Array.from(result.vector)).toEqual([1, 2]);
  });
});
