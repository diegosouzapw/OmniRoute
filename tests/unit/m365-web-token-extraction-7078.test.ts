// Issue #7078 — Microsoft 365 Copilot web token extraction must accept the current
// m365.cloud.microsoft endpoint (and legacy substrate.office.com / copilot.microsoft.com),
// not just the old substrate.office.com WS host. Verifies access_token + chathubPath parse.
import test from "node:test";
import assert from "node:assert/strict";

const B = await import("../../src/lib/providers/validation/webProvidersB.ts");
const extract = (raw: string) => B.extractM365CredentialParts(raw, {});

test("#7078 m365.cloud.microsoft wss URL extracts access_token + chathubPath", () => {
  const raw =
    "wss://m365.cloud.microsoft/m365Copilot/Chathub/user@tenant.example.com?access_token=TOKEN123";
  const parts = extract(raw);
  assert.equal(parts.accessToken, "TOKEN123");
  assert.equal(parts.chathubPath, "user@tenant.example.com");
});

test("#7078 regional subdomain m365.cloud.microsoft also accepted", () => {
  const raw =
    "wss://eu.m365.cloud.microsoft/m365Copilot/Chathub/user@tenant?access_token=TOKEN456";
  const parts = extract(raw);
  assert.equal(parts.accessToken, "TOKEN456");
  assert.equal(parts.chathubPath, "user@tenant");
});

test("#7078 legacy substrate.office.com still works (no regression)", () => {
  const raw =
    "wss://substrate.office.com/m365Copilot/Chathub/user@tenant?access_token=LEGACY";
  const parts = extract(raw);
  assert.equal(parts.accessToken, "LEGACY");
  assert.equal(parts.chathubPath, "user@tenant");
});

test("#7078 key/value string form still parsed", () => {
  const raw = "access_token=KV;chathubPath=user@tenant";
  const parts = extract(raw);
  assert.equal(parts.accessToken, "KV");
  assert.equal(parts.chathubPath, "user@tenant");
});

test("#7078 m365.cloud.microsoft with explicit :443 port still extracts (hostname, not host)", () => {
  const raw =
    "wss://m365.cloud.microsoft:443/m365Copilot/Chathub/user@tenant?access_token=TOKENPORT";
  const parts = extract(raw);
  assert.equal(parts.accessToken, "TOKENPORT");
  assert.equal(parts.chathubPath, "user@tenant");
});
