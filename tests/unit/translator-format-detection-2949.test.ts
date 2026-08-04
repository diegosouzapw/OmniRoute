import test from "node:test";
import assert from "node:assert/strict";

import { detectFormat, detectFormatFromUrl } from "../../open-sse/services/provider.ts";

test("detectFormatFromUrl accepts a relative /messages endpoint", () => {
  assert.equal(
    detectFormatFromUrl(
      { messages: [{ role: "user", content: "validate this model" }] },
      "/v1/messages"
    ),
    "claude"
  );
});

test("detectFormat recognizes the kebab-case anthropic-version body field", () => {
  assert.equal(
    detectFormat({
      messages: [{ role: "user", content: "validate this model" }],
      "anthropic-version": "2023-06-01",
    }),
    "claude"
  );
});
