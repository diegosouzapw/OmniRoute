import test from "node:test";
import assert from "node:assert/strict";
import { guideSettingsSaveSchema } from "../../src/shared/validation/schemas.ts";

// Regression for #3552: every CLI tool card (Default/Antigravity/Cline/Droid/Kilo/OpenClaw)
// posts `apiKey: !cloudEnabled ? "sk_omniroute" : null` when saving the OpenCode/CLI config.
// `apiKey: z.string().optional()` rejects `null` (Zod: "expected string, received null"), so
// the whole save 400'd in cloud mode. The real key is resolved server-side from keyId, so a
// null/absent apiKey is legitimate — the schema must normalize null → undefined.

test("#3552 apiKey: null is accepted and normalized to undefined", () => {
  const r = guideSettingsSaveSchema.safeParse({
    baseUrl: "http://localhost:20128/v1",
    apiKey: null,
    model: "cx/gpt-5.5",
  });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
  if (r.success) assert.equal(r.data.apiKey, undefined, "null must become undefined");
});

test("#3552 a real apiKey string is preserved", () => {
  const r = guideSettingsSaveSchema.safeParse({
    apiKey: "sk-640ee8098385abef",
    model: "cx/gpt-5.5",
  });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
  if (r.success) assert.equal(r.data.apiKey, "sk-640ee8098385abef");
});

test("#3552 omitted apiKey still validates (regression)", () => {
  const r = guideSettingsSaveSchema.safeParse({ model: "cx/gpt-5.5" });
  assert.equal(r.success, true, r.success ? "" : JSON.stringify(r.error?.issues));
});

test("#3552 a non-string, non-null apiKey is still rejected", () => {
  const r = guideSettingsSaveSchema.safeParse({ apiKey: 123, model: "cx/gpt-5.5" });
  assert.equal(r.success, false);
});
