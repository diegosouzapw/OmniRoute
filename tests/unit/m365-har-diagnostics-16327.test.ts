import assert from "node:assert/strict";
import { it } from "node:test";
import { extractM365CredentialFromHar } from "../../src/shared/utils/m365HarImport.ts";

const prefix = "wss://m365.cloud.microsoft/m365Copilot/Chathub/";
const har = (...urls: string[]) =>
  JSON.stringify({ log: { entries: urls.map((url) => ({ request: { url } })) } });

it("preserves missingFields diagnostics for trusted ChatHub entries", () => {
  assert.deepEqual(extractM365CredentialFromHar(har(`${prefix}user@tenant`)), {
    ok: false,
    error: "missingFields",
  });
  assert.deepEqual(extractM365CredentialFromHar(har(`${prefix}?access_token=synthetic`)), {
    ok: false,
    error: "missingFields",
  });
});

it("reports malformed path encoding without throwing or echoing the credential", () => {
  assert.deepEqual(extractM365CredentialFromHar(har(`${prefix}%ZZ?access_token=synthetic`)), {
    ok: false,
    error: "unparsableUrl",
  });
});

it("does not discard a valid credential when a later matching entry is incomplete", () => {
  const result = extractM365CredentialFromHar(
    har(`${prefix}user@tenant?access_token=synthetic`, `${prefix}user@tenant`)
  );
  assert.equal(result.ok, true);
});
