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

// #10815 — a profile ARN identifies the CodeWhisperer profile, not the account: two
// distinct social (Google/GitHub) Builder ID accounts share the same ARN, so matching
// on it alone made the second login overwrite the first connection.
const SHARED_PROFILE_ARN = "arn:aws:codewhisperer:us-east-1:1:profile/SHARED";

const firstSocialAccount = {
  id: "social-account-1",
  authType: "oauth",
  name: null,
  email: null,
  providerSpecificData: {
    profileArn: SHARED_PROFILE_ARN,
    authMethod: "imported",
    provider: "Github",
  },
};

test("findKiroConnectionByIdentity does not match a shared profile ARN without an account identifier", () => {
  const match = findKiroConnectionByIdentity([firstSocialAccount], {
    authType: "oauth",
    profileArn: SHARED_PROFILE_ARN,
    email: null,
  });
  assert.equal(match, null);
});

test("findKiroConnectionByIdentity treats diverging emails on a shared profile ARN as distinct accounts", () => {
  const stored = { ...firstSocialAccount, id: "social-a", email: "a@example.com" };
  const match = findKiroConnectionByIdentity([stored], {
    authType: "oauth",
    profileArn: SHARED_PROFILE_ARN,
    email: "b@example.com",
  });
  assert.equal(match, null);
});

test("findKiroConnectionByIdentity still matches the same account on a shared profile ARN", () => {
  const stored = { ...firstSocialAccount, id: "social-a", email: "a@example.com" };
  const match = findKiroConnectionByIdentity([stored], {
    authType: "oauth",
    profileArn: SHARED_PROFILE_ARN,
    email: "a@example.com",
  });
  assert.equal(match?.id, "social-a");
});
