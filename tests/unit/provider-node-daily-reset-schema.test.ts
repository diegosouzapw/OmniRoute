import test from "node:test";
import assert from "node:assert/strict";

const { createProviderNodeSchema, updateProviderNodeSchema } =
  await import("../../src/shared/validation/schemas/provider.ts");

const BASE = {
  name: "Moonshot native",
  prefix: "mnative",
  baseUrl: "https://api.moonshot.cn/v1",
};

test("updateProviderNodeSchema accepts IANA timezone + hour 0", () => {
  const result = updateProviderNodeSchema.safeParse({
    ...BASE,
    dailyQuotaResetTimezone: "Asia/Shanghai",
    dailyQuotaResetHour: 0,
  });
  assert.equal(result.success, true);
});

test("updateProviderNodeSchema rejects unknown timezone", () => {
  const result = updateProviderNodeSchema.safeParse({
    ...BASE,
    dailyQuotaResetTimezone: "Shanghai",
    dailyQuotaResetHour: 0,
  });
  assert.equal(result.success, false);
});

test("updateProviderNodeSchema rejects hour 24", () => {
  const result = updateProviderNodeSchema.safeParse({
    ...BASE,
    dailyQuotaResetTimezone: "Asia/Shanghai",
    dailyQuotaResetHour: 24,
  });
  assert.equal(result.success, false);
});

test("updateProviderNodeSchema accepts omitted reset clock", () => {
  const result = updateProviderNodeSchema.safeParse(BASE);
  assert.equal(result.success, true);
});

test("createProviderNodeSchema accepts IANA timezone + hour", () => {
  const result = createProviderNodeSchema.safeParse({
    ...BASE,
    apiType: "chat",
    type: "openai-compatible",
    dailyQuotaResetTimezone: "UTC",
    dailyQuotaResetHour: 0,
  });
  assert.equal(result.success, true);
});
