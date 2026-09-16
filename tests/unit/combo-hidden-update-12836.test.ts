import assert from "node:assert/strict";
import test from "node:test";

const { updateComboSchema } = await import("../../src/shared/validation/schemas/combo.ts");

test("updateComboSchema accepts and retains isHidden-only updates", () => {
  const hidden = updateComboSchema.safeParse({ isHidden: true });
  assert.equal(hidden.success, true);
  if (hidden.success) assert.equal(hidden.data.isHidden, true);

  const visible = updateComboSchema.safeParse({ isHidden: false });
  assert.equal(visible.success, true);
  if (visible.success) assert.equal(visible.data.isHidden, false);
});

test("updateComboSchema retains isHidden in mixed updates", () => {
  const result = updateComboSchema.safeParse({ description: "fixture", isHidden: true });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.description, "fixture");
    assert.equal(result.data.isHidden, true);
  }
});

test("updateComboSchema rejects invalid isHidden values and still rejects empty updates", () => {
  for (const value of ["true", 1, null]) {
    assert.equal(updateComboSchema.safeParse({ isHidden: value }).success, false);
  }

  assert.equal(updateComboSchema.safeParse({}).success, false);
});
