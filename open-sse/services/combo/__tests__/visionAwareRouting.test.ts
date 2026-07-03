/**
 * Regression: combo routing must not send an image request to a model that is
 * not confirmed vision-capable.
 */
import { afterAll, describe, expect, it } from "vitest";

const core = await import("../../../../src/lib/db/core.ts");
const { getResolvedModelCapabilities } = await import("../../../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../combo.ts");

afterAll(() => {
  core.resetDbInstance();
});

describe("vision-aware combo routing", () => {
  it("Pixtral resolves supportsVision=true via model-id heuristic (no synced data)", () => {
    expect(getResolvedModelCapabilities("mistral/pixtral-12b-latest").supportsVision).toBe(true);
  });

  it("a text-only Mistral model is NOT a vision false-positive", () => {
    expect(getResolvedModelCapabilities("mistral/ministral-14b-latest").supportsVision).not.toBe(
      true
    );
  });

  function target(modelStr: string) {
    return {
      kind: "model" as const,
      stepId: modelStr,
      executionKey: modelStr,
      modelStr,
      provider: modelStr.includes("/") ? modelStr.split("/")[0] : modelStr,
      providerId: null,
      connectionId: null,
      weight: 1,
      label: null,
    };
  }

  const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

  const imageBody = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          {
            type: "image_url",
            image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB" },
          },
        ],
      },
    ],
  };

  it("image request: combo drops the non-vision target, keeps the vision target", () => {
    const out = filterTargetsByRequestCompatibility(
      [target("mistral/pixtral-12b-latest"), target("mistral/ministral-14b-latest")],
      imageBody,
      noopLog
    );
    const ids = out.map((entry) => entry.modelStr);
    expect(ids).toContain("mistral/pixtral-12b-latest");
    expect(ids).not.toContain("mistral/ministral-14b-latest");
  });

  it("image request with NO confirmed-vision target: keep all (legacy fallback)", () => {
    const out = filterTargetsByRequestCompatibility(
      [target("mistral/ministral-14b-latest"), target("groq/llama-3.1-8b-instant")],
      imageBody,
      noopLog
    );
    expect(out).toHaveLength(2);
  });

  it("text-only request: targets are untouched by the vision filter", () => {
    const out = filterTargetsByRequestCompatibility(
      [target("mistral/ministral-14b-latest")],
      { messages: [{ role: "user", content: "hello" }] },
      noopLog
    );
    expect(out).toHaveLength(1);
  });

  it("large output request: unknown maxOutputTokens does not filter a target", () => {
    const out = filterTargetsByRequestCompatibility(
      [target("openai-compatible-local/custom-large-output-model"), target("openai/gpt-4o-mini")],
      { messages: [{ role: "user", content: "hello" }], max_tokens: 32000 },
      noopLog
    );
    const ids = out.map((entry) => entry.modelStr);

    expect(ids).toEqual(["openai-compatible-local/custom-large-output-model"]);
  });
});
