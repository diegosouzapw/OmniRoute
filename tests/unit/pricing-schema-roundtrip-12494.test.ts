import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { pricingFieldsSchema, updatePricingSchema } from "@/shared/validation/schemas/pricing";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";

const root = join(import.meta.dirname, "../..");
const pricingTab = readFileSync(
  join(root, "src/app/(dashboard)/dashboard/settings/components/PricingTab.tsx"),
  "utf8"
);

describe("pricing schema GET → PATCH round-trip (#12494)", () => {
  it("accepts a sync-written pricing entry verbatim", () => {
    const entry = {
      input: 0.5,
      output: 1.5,
      cached: 0.1,
      cache_creation: 0.2,
      reasoning: 3,
      mode: "image",
      input_cost_per_second: 0.01,
      output_cost_per_second: 0.02,
      input_cost_per_image: 0.003,
      output_cost_per_image: 0.004,
      input_cost_per_pixel: 0.000001,
      output_cost_per_pixel: 0.000002,
      input_cost_per_character: 0.0001,
      output_cost_per_character: 0.0002,
      input_cost_per_video_per_second: 0.05,
      output_cost_per_video_per_second: 0.06,
      search_unit_cost: 0.001,
      ocr_cost_per_page: 0.002,
    };
    assert.deepEqual(pricingFieldsSchema.parse(entry), entry);
  });

  it("updatePricingSchema accepts a provider map with sync-written entries", () => {
    const body = {
      "openai/gpt-4o": {
        "gpt-4o": { input: 2, output: 4, mode: "chat" },
        "gpt-4o-audio": { input_cost_per_second: 0.01, mode: "audio" },
      },
    };
    assert.deepEqual(updatePricingSchema.parse(body), body);
  });

  it("still rejects unknown keys (strict stays strict)", () => {
    assert.equal(pricingFieldsSchema.safeParse({ input: 1, nope: 1 }).success, false);
  });

  it("still rejects invalid values", () => {
    assert.equal(pricingFieldsSchema.safeParse({ input: -1 }).success, false);
    assert.equal(pricingFieldsSchema.safeParse({ search_unit_cost: "free" }).success, false);
    assert.equal(pricingFieldsSchema.safeParse({ mode: "" }).success, false);
  });
});

describe("pricing save surfaces actionable errors (#12494)", () => {
  it("renders the validation envelope's field details instead of [object Object]", () => {
    const body = {
      error: {
        message: "Invalid request",
        details: [{ field: "openai.gpt-4o.mode", message: "Unrecognized key 'mode'" }],
      },
    };
    assert.equal(
      extractApiErrorMessage(body, "fallback"),
      "Invalid request: openai.gpt-4o.mode: Unrecognized key 'mode'"
    );
  });

  it("keeps the plain-string and message-only behaviors intact", () => {
    assert.equal(extractApiErrorMessage({ error: "boom" }, "fallback"), "boom");
    assert.equal(
      extractApiErrorMessage({ error: { message: "Invalid request origin" } }, "fallback"),
      "Invalid request origin"
    );
  });

  it("PricingTab funnels save/reset failures through extractApiErrorMessage", () => {
    assert.match(pricingTab, /extractApiErrorMessage\(errorPayload, t\("saveFailed"\)\)/);
    assert.match(pricingTab, /extractApiErrorMessage\(errorPayload, t\("resetFailed"\)\)/);
    assert.doesNotMatch(pricingTab, /errorPayload\.error \|\|/);
  });
});
