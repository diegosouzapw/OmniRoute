import test from "node:test";
import assert from "node:assert/strict";

import { findKiroConnectionByIdentity } from "@/lib/oauth/kiroConnectionIdentity";

const connections = [
  {
    id: "profile-match",
    authType: "oauth",
    name: "Kiro profile",
    email: "profile@example.com",
    providerSpecificData: { profileArn: "arn:aws:codewhisperer:us-east-1:1:profile/A" },
  },
  {
    id: "builder-match",
    authType: "oauth",
    name: "Kiro Builder ID",
    providerSpecificData: { clientId: "builder-client" },
  },
  {
    id: "email-match",
    authType: "oauth",
    name: "Kiro Social",
    email: "social@example.com",
    providerSpecificData: {},
  },
  {
    id: "name-match",
    authType: "apikey",
    name: "Kiro API Key (us-east-1, abc123)",
    providerSpecificData: { authMethod: "api_key" },
  },
];

test("findKiroConnectionByIdentity prefers an exact trimmed profile ARN", () => {
  const match = findKiroConnectionByIdentity(connections, {
    profileArn: " arn:aws:codewhisperer:us-east-1:1:profile/A ",
    clientId: "builder-client",
  });
  assert.equal(match?.id, "profile-match");
});

test("findKiroConnectionByIdentity deduplicates profileless Builder ID by clientId", () => {
  const match = findKiroConnectionByIdentity(connections, { clientId: " builder-client " });
  assert.equal(match?.id, "builder-match");
});

test("findKiroConnectionByIdentity falls back to email and API-key fingerprint name", () => {
  assert.equal(
    findKiroConnectionByIdentity(connections, { email: "SOCIAL@EXAMPLE.COM" })?.id,
    "email-match"
  );
  assert.equal(
    findKiroConnectionByIdentity(connections, {
      name: "kiro api key (us-east-1, ABC123)",
    })?.id,
    "name-match"
  );
});

test("findKiroConnectionByIdentity never matches empty identity values", () => {
  assert.equal(findKiroConnectionByIdentity(connections, {}), null);
});

test("findKiroConnectionByIdentity never overwrites a different authentication type", () => {
  assert.equal(
    findKiroConnectionByIdentity(connections, {
      authType: "apikey",
      profileArn: "arn:aws:codewhisperer:us-east-1:1:profile/A",
      email: "profile@example.com",
    }),
    null
  );
  assert.equal(
    findKiroConnectionByIdentity(connections, {
      authType: "oauth",
      name: "Kiro API Key (us-east-1, abc123)",
    }),
    null
  );
});
