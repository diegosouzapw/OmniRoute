import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import i18nConfig from "../../config/i18n.json" with { type: "json" };

interface G4fProviderMetadata {
  hasFree?: boolean;
  freeNote?: string;
  authHint?: string;
  notice?: {
    text?: string;
    apiKeyUrl?: string;
  };
}

interface ProviderMessages {
  providers?: {
    onboardingProviderDescriptions?: Record<string, string>;
  };
}

const here = dirname(fileURLToPath(import.meta.url));
const messagesDir = resolve(here, "../../src/i18n/messages");
const localeFiles = readdirSync(messagesDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

const G4F_PROVIDERS = [
  "g4f-groq",
  "g4f-gemini",
  "g4f-pollinations",
  "g4f-ollama",
  "g4f-nvidia",
] as const;

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");

test("g4f.space metadata describes conditional access and the remote data boundary", () => {
  for (const id of G4F_PROVIDERS) {
    const metadata = (APIKEY_PROVIDERS as Record<string, G4fProviderMetadata>)[id];
    assert.ok(metadata, `${id} metadata must exist`);
    assert.equal(metadata.hasFree, false, `${id} must not advertise a stable free tier`);

    assert.match(metadata.freeNote ?? "", /proof-of-work cake credits/i, `${id} cake path`);
    assert.match(metadata.freeNote ?? "", /member API key/i, `${id} member-key alternative`);
    assert.match(metadata.freeNote ?? "", /limits vary/i, `${id} dynamic limits`);
    assert.doesNotMatch(
      metadata.freeNote ?? "",
      /no-key|free tier is gone|member (?:api )?key is required|5 requests? per minute/i,
      `${id} must not publish the retired access claims`
    );

    assert.match(metadata.authHint ?? "", /g4f\.dev\/chat/i, `${id} anonymous onboarding`);
    assert.match(metadata.authHint ?? "", /g4f\.dev\/members\.html/i, `${id} member onboarding`);

    assert.match(
      metadata.notice?.text ?? "",
      /remote third-party gateway/i,
      `${id} remote-service notice`
    );
    assert.match(
      metadata.notice?.text ?? "",
      /prompts and request metadata leave OmniRoute/i,
      `${id} data-boundary notice`
    );
    assert.match(
      metadata.notice?.text ?? "",
      /Terms and Privacy links were unavailable/i,
      `${id} policy-status notice`
    );
    assert.equal(metadata.notice?.apiKeyUrl, "https://g4f.dev/members.html");
  }
});

test("every shipped locale gives both g4f.space access paths without a fixed quota", () => {
  assert.ok(
    localeFiles.length >= i18nConfig.locales.length,
    `expected the ${i18nConfig.locales.length} configured locales, found ${localeFiles.length}`
  );

  for (const file of localeFiles) {
    const catalog = JSON.parse(
      readFileSync(resolve(messagesDir, file), "utf8")
    ) as ProviderMessages;
    const descriptions = catalog.providers?.onboardingProviderDescriptions;

    for (const id of G4F_PROVIDERS) {
      const description = descriptions?.[id];
      assert.equal(typeof description, "string", `${file} is missing ${id}`);
      assert.match(description ?? "", /g4f\.space/i, `${file} ${id} remote gateway`);
      assert.match(description ?? "", /g4f\.dev\/chat/i, `${file} ${id} anonymous access`);
      assert.match(description ?? "", /g4f\.dev\/members\.html/i, `${file} ${id} member access`);
      assert.doesNotMatch(
        description ?? "",
        /(^|\D)5(\D|$)/,
        `${file} ${id} must not promise the retired five-request quota`
      );
    }
  }
});
