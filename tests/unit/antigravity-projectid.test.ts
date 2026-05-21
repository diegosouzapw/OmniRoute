import { describe, it } from "node:test";
import assert from "node:assert";
import { updateProviderConnectionSchema } from "../../src/shared/validation/schemas.js";

describe("Antigravity Project ID Schema Validation", () => {
  it("should accept projectId and providerSpecificData.projectId", () => {
    const result = updateProviderConnectionSchema.safeParse({
      projectId: "anti-project",
      providerSpecificData: { projectId: "anti-project" },
    });
    assert.strictEqual(result.success, true);
  });

  it("should accept null projectId and preserve nested null through JSON serialization", () => {
    const payload = {
      projectId: null,
      providerSpecificData: { projectId: null },
    };

    const serialized = JSON.stringify(payload);
    assert.match(serialized, /"projectId":null/);

    const result = updateProviderConnectionSchema.safeParse(payload);
    assert.strictEqual(result.success, true);
  });
});
