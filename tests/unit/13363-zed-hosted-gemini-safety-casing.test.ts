/**
 * Issue #13363: zed-hosted Gemini models reject safety threshold "OFF" and
 * function-calling mode "VALIDATED"
 *
 * Zed's Google proxy (crates/google_ai/src/google_ai.rs) only accepts:
 *   - Safety thresholds: BLOCK_NONE, BLOCK_LOW_AND_ABOVE, etc. (not "OFF")
 *   - FunctionCallingMode: auto, any, none (lowercase, not VALIDATED/AUTO/etc.)
 *
 * The fix adds a normalizeForZedProxy() pass in the zed-hosted executor that
 * maps Google-native values to the Zed-accepted equivalents before forwarding.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Replicate the normalization logic from zed-hosted.ts so we can unit-test
 * it without importing the full executor (which has side effects / DB deps).
 */
function normalizeForZedProxy(req: Record<string, unknown>): Record<string, unknown> {
  if (Array.isArray(req.safetySettings)) {
    req.safetySettings = req.safetySettings.map(
      (s: Record<string, unknown>) =>
        s.threshold === "OFF" ? { ...s, threshold: "BLOCK_NONE" } : s
    );
  }

  const tc = req.toolConfig as Record<string, unknown> | undefined;
  if (tc && typeof tc === "object") {
    const fcc = tc.functionCallingConfig as Record<string, unknown> | undefined;
    if (fcc && typeof fcc === "object" && typeof fcc.mode === "string") {
      const mode = fcc.mode;
      if (mode === "VALIDATED" || mode === "AUTO") fcc.mode = "auto";
      else if (mode === "ANY") fcc.mode = "any";
      else if (mode === "NONE") fcc.mode = "none";
    }
  }

  return req;
}

describe("Issue #13363 — normalizeForZedProxy", () => {
  describe("safety settings threshold mapping", () => {
    it("maps OFF to BLOCK_NONE", () => {
      const req = {
        safetySettings: [
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
        ],
      };
      const result = normalizeForZedProxy(req);
      for (const s of result.safetySettings as Array<Record<string, unknown>>) {
        assert.equal(s.threshold, "BLOCK_NONE");
      }
    });

    it("preserves non-OFF thresholds unchanged", () => {
      const req = {
        safetySettings: [
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_LOW_AND_ABOVE" },
        ],
      };
      const result = normalizeForZedProxy(req);
      assert.equal(
        (result.safetySettings as Array<Record<string, unknown>>)[0].threshold,
        "BLOCK_LOW_AND_ABOVE"
      );
    });

    it("leaves req without safetySettings untouched", () => {
      const req = { model: "gemini-3-flash" };
      const result = normalizeForZedProxy(req);
      assert.equal(result.safetySettings, undefined);
      assert.equal(result.model, "gemini-3-flash");
    });
  });

  describe("function calling mode mapping", () => {
    it("maps VALIDATED to auto", () => {
      const req = {
        toolConfig: { functionCallingConfig: { mode: "VALIDATED" } },
      };
      const result = normalizeForZedProxy(req);
      assert.equal(
        (result.toolConfig as Record<string, unknown>).functionCallingConfig,
        (result.toolConfig as Record<string, unknown>).functionCallingConfig
      );
      assert.equal(
        (
          (result.toolConfig as Record<string, unknown>)
            .functionCallingConfig as Record<string, unknown>
        ).mode,
        "auto"
      );
    });

    it("maps AUTO to auto", () => {
      const req = {
        toolConfig: { functionCallingConfig: { mode: "AUTO" } },
      };
      const result = normalizeForZedProxy(req);
      assert.equal(
        (
          (result.toolConfig as Record<string, unknown>)
            .functionCallingConfig as Record<string, unknown>
        ).mode,
        "auto"
      );
    });

    it("maps ANY to any", () => {
      const req = {
        toolConfig: { functionCallingConfig: { mode: "ANY" } },
      };
      const result = normalizeForZedProxy(req);
      assert.equal(
        (
          (result.toolConfig as Record<string, unknown>)
            .functionCallingConfig as Record<string, unknown>
        ).mode,
        "any"
      );
    });

    it("maps NONE to none", () => {
      const req = {
        toolConfig: { functionCallingConfig: { mode: "NONE" } },
      };
      const result = normalizeForZedProxy(req);
      assert.equal(
        (
          (result.toolConfig as Record<string, unknown>)
            .functionCallingConfig as Record<string, unknown>
        ).mode,
        "none"
      );
    });

    it("preserves already-lowercase modes", () => {
      const req = {
        toolConfig: { functionCallingConfig: { mode: "auto" } },
      };
      const result = normalizeForZedProxy(req);
      assert.equal(
        (
          (result.toolConfig as Record<string, unknown>)
            .functionCallingConfig as Record<string, unknown>
        ).mode,
        "auto"
      );
    });

    it("leaves req without toolConfig untouched", () => {
      const req = { contents: [] };
      const result = normalizeForZedProxy(req);
      assert.equal(result.toolConfig, undefined);
    });
  });

  describe("full Gemini request normalization", () => {
    it("normalizes a complete Gemini request as it would arrive from openaiToGeminiRequest", () => {
      const geminiRequest = {
        model: "gemini-3-flash",
        contents: [{ role: "user", parts: [{ text: "Say hi" }] }],
        safetySettings: [
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
        ],
        toolConfig: {
          functionCallingConfig: { mode: "VALIDATED" },
        },
      };

      const result = normalizeForZedProxy(geminiRequest);

      // All safety thresholds mapped to BLOCK_NONE
      for (const s of result.safetySettings as Array<Record<string, unknown>>) {
        assert.equal(s.threshold, "BLOCK_NONE", `Expected BLOCK_NONE for ${s.category}`);
      }

      // Tool calling mode mapped to lowercase
      assert.equal(
        (
          (result.toolConfig as Record<string, unknown>)
            .functionCallingConfig as Record<string, unknown>
        ).mode,
        "auto"
      );
    });
  });
});
