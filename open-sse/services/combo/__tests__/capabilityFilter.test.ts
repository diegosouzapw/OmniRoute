import { describe, expect, it } from "vitest";
import {
  evaluateTargetsByRequestCompatibility,
  filterTargetsByRequestCompatibility,
} from "../requestCapabilities.ts";

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

describe("request capability filtering", () => {
  it("keeps only the confirmed vision target and preserves the legacy fallback helper", () => {
    const targets = [target("mistral/pixtral-12b-latest"), target("mistral/ministral-14b-latest")];

    const filtered = filterTargetsByRequestCompatibility(targets, imageBody, noopLog);
    const evaluated = evaluateTargetsByRequestCompatibility(targets, imageBody);

    expect(filtered.map((entry) => entry.modelStr)).toEqual(["mistral/pixtral-12b-latest"]);
    expect(evaluated.compatibleTargets.map((entry) => entry.modelStr)).toEqual([
      "mistral/pixtral-12b-latest",
    ]);
    expect(evaluated.requestRejected).toBe(false);
    expect(evaluated.rejectionReason).toBeNull();
  });

  it("flags a total miss as rejectable when no configured target supports the request", () => {
    const targets = [target("mistral/ministral-14b-latest"), target("groq/llama-3.1-8b-instant")];

    const evaluated = evaluateTargetsByRequestCompatibility(targets, imageBody);

    expect(evaluated.compatibleTargets).toEqual([]);
    expect(evaluated.requestRejected).toBe(true);
    expect(evaluated.rejectionReason).toContain("image input");
  });
});
