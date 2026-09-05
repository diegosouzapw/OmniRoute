import assert from "node:assert/strict";
import { test } from "node:test";

import {
  firstProviderConnectionId,
  providerSetupConnectionUrl,
  providerConnectionsRequestUrl,
} from "../../../src/lib/radar/setupConnections.ts";

test("providerConnectionsRequestUrl filters the existing providers API", () => {
  assert.equal(
    providerConnectionsRequestUrl("openrouter/custom"),
    "/api/providers?provider=openrouter%2Fcustom"
  );
});

test("firstProviderConnectionId selects a real connection id, never the provider slug", () => {
  assert.equal(
    firstProviderConnectionId(
      [
        { id: "connection-disabled", provider: "groq", isActive: false },
        { id: "connection-active", provider: "groq", isActive: true },
      ],
      "groq"
    ),
    "connection-active"
  );
  assert.equal(firstProviderConnectionId([], "groq"), null);
});

test("providerSetupConnectionUrl targets the real provider form with an explicit action", () => {
  assert.equal(
    providerSetupConnectionUrl("openrouter/custom"),
    "/dashboard/providers/openrouter%2Fcustom?action=add-api-key"
  );
});
