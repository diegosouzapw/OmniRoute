import assert from "node:assert/strict";
import { test } from "node:test";

import { formatTelegramGatewayError } from "../../../src/lib/telegram/errorMessage";

test("Telegram gateway failures do not expose paths, secrets, or stack traces", () => {
  const error = new Error(
    "provider failed at /home/operator/omniroute/provider.ts access_token=super-secret\n" +
      "    at dispatch (/home/operator/omniroute/route.ts:42:1)"
  );

  const message = formatTelegramGatewayError(error);

  assert.match(message, /^⚠️ Gateway error: /);
  assert.doesNotMatch(message, /\/home\/operator/);
  assert.doesNotMatch(message, /super-secret/);
  assert.doesNotMatch(message, /at dispatch/);
});
