import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeProviderSpecificDataForResponse } from "../../src/lib/providers/requestDefaults.ts";

test("sanitizeProviderSpecificDataForResponse strips volcConsoleCookie and volcCsrfToken", () => {
  const input = {
    autoSync: true,
    autoFetchModels: true,
    volcConsoleCookie: "session=secret123; AccountID=acc456",
    volcCsrfToken: "csrf-token-xyz",
    volcApiKeyId: 1001,
    volcPlanKind: "coding",
  };

  const sanitized = sanitizeProviderSpecificDataForResponse(input);
  assert.ok(sanitized);
  assert.equal(sanitized.autoSync, true);
  assert.equal(sanitized.autoFetchModels, true);
  assert.equal(sanitized.volcApiKeyId, 1001);
  assert.equal(sanitized.volcPlanKind, "coding");
  assert.equal(sanitized.volcConsoleCookie, undefined);
  assert.equal(sanitized.volcCsrfToken, undefined);
  assert.equal("volcConsoleCookie" in sanitized, false);
  assert.equal("volcCsrfToken" in sanitized, false);
});
