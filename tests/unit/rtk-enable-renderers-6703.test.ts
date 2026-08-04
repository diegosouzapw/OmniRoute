import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  rtkConfigSchema,
  compressionSettingsUpdateSchema,
} from "../../src/shared/validation/compressionConfigSchemas.ts";
import { DEFAULT_RTK_CONFIG } from "../../open-sse/services/compression/types.ts";

// Regression for #6703: rtkConfigSchema uses Zod .strict() but was missing the
// `enableRenderers` field that DEFAULT_RTK_CONFIG (and the RTK engine's own
// configSchema) already define. The frontend reads DEFAULT_RTK_CONFIG (which
// carries enableRenderers), sends the full object back on save, and .strict()
// rejects the unknown key → HTTP 400 "Unrecognized key: enableRenderers".
// This broke PUT /api/settings/compression, POST /api/context/rtk/test, and
// PUT /api/context/rtk/config.

describe("RTK config schema — enableRenderers (#6703)", () => {
  it("accepts enableRenderers on the strict rtkConfigSchema", () => {
    assert.equal(rtkConfigSchema.safeParse({ enableRenderers: false }).success, true);
    assert.equal(rtkConfigSchema.safeParse({ enableRenderers: true }).success, true);
  });

  it("accepts the full DEFAULT_RTK_CONFIG without stripping fields", () => {
    const result = rtkConfigSchema.safeParse(DEFAULT_RTK_CONFIG);
    assert.equal(result.success, true, JSON.stringify(result.error?.issues));
    assert.equal(result.data.enableRenderers, false);
  });

  it("rejects a genuinely unknown key (strict mode still enforced)", () => {
    assert.equal(rtkConfigSchema.safeParse({ totallyBogusKey: true }).success, false);
  });

  it("accepts rtkConfig with enableRenderers through the settings-update schema", () => {
    // Mirrors the PUT /api/settings/compression payload from the bug report.
    const result = compressionSettingsUpdateSchema.safeParse({
      rtkConfig: { ...DEFAULT_RTK_CONFIG, enableRenderers: false },
    });
    assert.equal(result.success, true, JSON.stringify(result.error?.issues));
  });
});
