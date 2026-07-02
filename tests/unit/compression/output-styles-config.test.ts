import { test } from "node:test";
import assert from "node:assert/strict";
import { compressionSettingsUpdateSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import type { CompressionConfig } from "../../../open-sse/services/compression/types.ts";

test("schema accepts a valid outputStyles selection", () => {
  const parsed = compressionSettingsUpdateSchema.parse({
    outputStyles: [
      { id: "terse-prose", level: "full" },
      { id: "less-code", level: "lite" },
    ],
  });
  assert.equal(parsed.outputStyles?.length, 2);
});

test("schema rejects an invalid level", () => {
  assert.throws(() =>
    compressionSettingsUpdateSchema.parse({
      outputStyles: [{ id: "terse-prose", level: "extreme" }],
    })
  );
});

test("CompressionConfig type carries outputStyles", () => {
  const cfg: Pick<CompressionConfig, "outputStyles"> = {
    outputStyles: [{ id: "terse-prose", level: "full" }],
  };
  assert.equal(cfg.outputStyles?.[0]?.id, "terse-prose");
});
