import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup as reactRenderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../src/i18n/messages/en.json" with { type: "json" };
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";
import NoAuthProviderCard from "../../src/shared/components/NoAuthProviderCard.tsx";
import NoAuthAccountCard from "../../src/shared/components/NoAuthAccountCard.tsx";

const PLAIN = enMessages.noAuthProvider.description;

function renderBanner(providerId: keyof typeof NOAUTH_PROVIDERS) {
  return reactRenderToStaticMarkup(
    React.createElement(
      NextIntlClientProvider,
      { locale: "en", timeZone: "UTC", messages: { noAuthProvider: enMessages.noAuthProvider } },
      React.createElement(NoAuthProviderCard, { providerId, enabled: true })
    )
  );
}

test("a no-auth banner includes the provider notice when one is stored", () => {
  const html = renderBanner("cloudflare-playground");

  assert.match(html, /ready to use immediately/);
  assert.match(html, /Requires Playwright with a Chromium browser on first request/);
});

test("a no-auth banner stays the plain ready message when the provider has no notice or auth hint", () => {
  const html = renderBanner("duckduckgo-web");

  assert.match(html, new RegExp(PLAIN.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(html, /DuckDuckGo AI Chat is anonymous/);
});

test("an account no-auth banner includes the stored notice beside the account message", () => {
  const html = reactRenderToStaticMarkup(
    React.createElement(
      NextIntlClientProvider,
      { locale: "en", timeZone: "UTC", messages: { noAuthProvider: enMessages.noAuthProvider } },
      React.createElement(NoAuthAccountCard, {
        providerId: "opencode",
        providerName: "OpenCode",
        generateAccountId: () => "account-1",
      })
    )
  );

  assert.match(html, /Ready to use/);
  assert.match(html, /requests that do not match the OpenCode client contract/);
});
