import test from "node:test";
import assert from "node:assert/strict";
import {
  createProviderNodeSchema,
  updateProviderNodeSchema,
} from "../../src/shared/validation/schemas/provider.ts";

// Regression for #13066: saving an edit to a custom OpenAI-compatible node failed
// with a generic "Invalid request" whenever the optional daily-quota reset fields
// were left blank. The dashboard sends both as `null`, and the two schemas
// disagreed about that: `dailyQuotaResetHour` was `.optional().nullable()`, while
// `dailyQuotaResetTimezone` was only `.optional()`. So `null` passed for the hour
// and was rejected for the timezone, and the whole PUT 400'd on a field the user
// had not touched. The failure surfaced while changing the API type, which made
// it look as though changing the API type was broken.
//
// The storage layer has always coerced these to null (`data.dailyQuotaResetTimezone
// || null` in db/providers/nodes.ts), so accepting null costs nothing downstream.

const base = {
  name: "My node",
  prefix: "mynode",
  apiType: "chat" as const,
  baseUrl: "https://example.invalid/v1",
};

test("update accepts a null timezone alongside a null hour (#13066)", () => {
  const result = updateProviderNodeSchema.safeParse({
    ...base,
    dailyQuotaResetTimezone: null,
    dailyQuotaResetHour: null,
  });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("create accepts the same null pair (#13066)", () => {
  const result = createProviderNodeSchema.safeParse({
    ...base,
    dailyQuotaResetTimezone: null,
    dailyQuotaResetHour: null,
  });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("a null timezone is accepted on its own, not only beside a null hour", () => {
  // The two fields are independent; the pairing above is just what the dashboard
  // happens to send. A fix that only tolerated the pair would still reject this.
  const result = updateProviderNodeSchema.safeParse({
    ...base,
    dailyQuotaResetTimezone: null,
    dailyQuotaResetHour: 3,
  });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("the fields stay optional and blank-string still passes", () => {
  assert.equal(updateProviderNodeSchema.safeParse({ ...base }).success, true);
  assert.equal(
    updateProviderNodeSchema.safeParse({ ...base, dailyQuotaResetTimezone: "" }).success,
    true
  );
});

test("a real timezone still round-trips", () => {
  const result = updateProviderNodeSchema.safeParse({
    ...base,
    dailyQuotaResetTimezone: "Asia/Ho_Chi_Minh",
    dailyQuotaResetHour: 0,
  });
  assert.equal(result.success, true, JSON.stringify(result.error?.issues));
});

test("an unknown timezone is still rejected", () => {
  // Accepting null must not widen the field into accepting anything: the IANA
  // check is the reason this schema exists.
  const result = updateProviderNodeSchema.safeParse({
    ...base,
    dailyQuotaResetTimezone: "Mars/Olympus_Mons",
  });
  assert.equal(result.success, false);
});

test("an out-of-range hour is still rejected", () => {
  const result = updateProviderNodeSchema.safeParse({
    ...base,
    dailyQuotaResetHour: 24,
  });
  assert.equal(result.success, false);
});
