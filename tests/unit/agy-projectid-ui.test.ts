import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";

const modalPath =
  "src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx";
const source = readFileSync(modalPath, "utf8");

describe("Antigravity Project ID UI support", () => {
  it("declares a single consolidated Antigravity provider gate", () => {
    assert.ok(
      source.includes('const isAntigravityFamily = provider === "antigravity";'),
      "isAntigravityFamily must target the consolidated antigravity provider"
    );
    assert.equal(
      source.includes('provider === "agy"'),
      false,
      "the removed agy provider must not have its own UI branch"
    );
  });

  it("does not keep the old supportsGoogleProjectId alias", () => {
    assert.equal(source.includes("supportsGoogleProjectId"), false);
  });

  it("uses antigravityProjectIdLabel for Antigravity-family providers", () => {
    assert.ok(
      source.includes('label={t("antigravityProjectIdLabel")}'),
      "projectId label must use Antigravity-family copy"
    );
  });

  it("no longer renders a client-profile selector (CLI-only identity)", () => {
    assert.equal(
      source.includes("antigravityClientProfileLabel"),
      false,
      "the IDE/CLI profile selector was removed when the provider was consolidated"
    );
    assert.equal(
      source.includes("ANTIGRAVITY_CLIENT_PROFILE_OPTIONS"),
      false,
      "profile option constants were removed with the CLI-only identity"
    );
  });

  it("uses isAntigravityFamily for the Antigravity-family save path", () => {
    assert.ok(
      source.includes("if (isAntigravityFamily) {"),
      "the Antigravity save path must use isAntigravityFamily"
    );
  });
});
