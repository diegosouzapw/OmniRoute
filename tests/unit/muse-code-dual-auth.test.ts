import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { resolveStaticProviderCatalogEntry } from "../../src/lib/providers/catalog.ts";
import { supportsDualAuthProvider } from "../../src/shared/constants/providers.ts";

test("Muse Code is exposed as same-id dual auth", () => {
  assert.equal(supportsDualAuthProvider("muse-code"), true);
  const entry = resolveStaticProviderCatalogEntry("muse-code");
  assert.ok(entry);
  assert.equal(entry.oauthProviderId, "muse-code");
  assert.equal(entry.displayAuthType, "oauth");
  assert.equal(entry.toggleAuthType, "oauth");
});

test("Muse Code is wired through client and server non-PKCE device flow", async () => {
  const [modal, route] = await Promise.all([
    readFile("src/shared/components/OAuthModal.tsx", "utf8"),
    readFile("src/app/api/oauth/[provider]/[action]/route.ts", "utf8"),
  ]);

  const modalList = modal.slice(
    modal.indexOf("const DEVICE_CODE_PROVIDERS"),
    modal.indexOf("const TOKEN_PASTE_PROVIDERS")
  );
  const routeList = route.slice(
    route.indexOf("const NO_PKCE_DEVICE_CODE_PROVIDERS"),
    route.indexOf("const RETIRED_PKCE_PROVIDERS")
  );

  assert.match(modalList, /["']muse-code["']/);
  assert.match(routeList, /["']muse-code["']/);
});
