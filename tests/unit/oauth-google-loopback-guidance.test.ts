import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { buildGoogleLoopbackHint } from "../../src/lib/oauth/utils/googleLoopbackHint";
import { PASTE_CREDENTIAL_PROVIDERS } from "../../src/lib/oauth/pasteCredentials";

// Sibling of oauth-lan-loopback-guidance.test.ts, for the OTHER loopback family.
//
// Google providers (antigravity / agy) do not use a fixed foreign port like codex:
// OAuthModal builds `http://127.0.0.1:<dashboardPort>/callback`. On a LAN origin that
// 127.0.0.1 is the *browser's* machine, so Google's firstparty/nativeapp consent never
// releases the code — it does not even redirect. The screen just hangs.
//
// That makes the manual panel's advice actively wrong: it told the operator to wait for
// a redirect and paste the callback URL, but no redirect ever arrives and there is
// nothing to paste. The remedy is the local login helper (which emits a credential blob
// the Step 2 field DOES accept) or an SSH forward of the dashboard port.

const here = dirname(fileURLToPath(import.meta.url));
const readSrc = (rel: string) => readFileSync(resolve(here, "../../src", rel), "utf8");
const readCatalog = (locale: string) =>
  JSON.parse(readFileSync(resolve(here, `../../src/i18n/messages/${locale}.json`), "utf8"));

const LAN = { hostname: "192.168.0.15", port: "20128", protocol: "http:" };

test("the callback rides the DASHBOARD port, not a fixed provider port", () => {
  const hint = buildGoogleLoopbackHint("antigravity", LAN);

  // Mirrors OAuthModal's GOOGLE_OAUTH_PROVIDERS redirectUri branch.
  assert.equal(hint.redirectUri, "http://127.0.0.1:20128/callback");
  assert.equal(hint.dashboardPort, "20128");
  assert.equal(hint.dashboardHost, "192.168.0.15");
});

test("a SINGLE forward is enough — unlike codex, there is no second port", () => {
  const hint = buildGoogleLoopbackHint("antigravity", LAN);

  assert.equal(hint.tunnelCommand, "ssh -L 20128:127.0.0.1:20128 <user>@192.168.0.15");
  assert.doesNotMatch(hint.tunnelCommand, /1455/);
  assert.equal(hint.localDashboardUrl, "http://localhost:20128");
});

test("antigravity gets the local login helper as the recommended path", () => {
  assert.equal(
    buildGoogleLoopbackHint("antigravity", LAN).helperCommand,
    "npx omniroute login antigravity"
  );
});

test("agy gets NO helper command — the CLI only mints antigravity blobs", () => {
  // bin/cli/commands/login.mjs pins PROVIDER = "antigravity", and
  // parsePastedCredentials() rejects a blob whose provider !== the route provider.
  // Offering `omniroute login antigravity` on the agy dialog would send the operator
  // to a blob that is guaranteed to be refused.
  const hint = buildGoogleLoopbackHint("agy", LAN);

  assert.equal(hint.helperCommand, null);
  // ...but agy IS still allowed to paste a blob, so the tunnel path must stay.
  assert.ok(PASTE_CREDENTIAL_PROVIDERS.has("agy"));
  assert.equal(hint.tunnelCommand, "ssh -L 20128:127.0.0.1:20128 <user>@192.168.0.15");
});

test("an empty location.port resolves from the protocol", () => {
  assert.equal(
    buildGoogleLoopbackHint("antigravity", { hostname: "10.0.0.9", port: "", protocol: "https:" })
      .dashboardPort,
    "443"
  );
  assert.equal(
    buildGoogleLoopbackHint("antigravity", { hostname: "10.0.0.9", port: "", protocol: "http:" })
      .dashboardPort,
    "80"
  );
});

test("OAuthModal threads the Google hint into the manual panel", () => {
  const modal = readSrc("shared/components/OAuthModal.tsx");

  assert.match(modal, /buildGoogleLoopbackHint/, "the modal must build the Google hint");
  assert.match(
    modal,
    /googleHint=\{/,
    "the manual panel must receive the hint so it can render the real commands"
  );
});

test("the notice replaces the stale paste-the-URL advice with the two remedies", () => {
  const panels = readSrc("shared/components/OAuthModalPanels.tsx");

  assert.match(
    panels,
    /googleLoopbackWhatHappens/,
    "the notice must state that the consent hangs (no redirect to copy)"
  );
  assert.match(panels, /helperCommand/, "the helper command must be rendered when available");
  assert.match(panels, /tunnelCommand/, "the tunnel command must be rendered");
});

const LOCALES = readdirSync(resolve(here, "../../src/i18n/messages"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.slice(0, -5));

test("the stale googleOAuthWarning key is GONE from every locale", () => {
  // Its EN value was corrected when the login helper shipped (#5203), but a changed
  // English value does not invalidate existing translations and `i18n:sync-ui` only
  // fills keys that are ABSENT — so 39 locales kept the original "copy the full URL
  // and paste it below" text, advice that cannot work for this provider family.
  // The key's meaning changed, so it is renamed rather than edited: a new key cannot
  // inherit a stale translation.
  const survivors = LOCALES.filter(
    (l) => readCatalog(l).oauthModal?.googleOAuthWarning !== undefined
  );
  assert.deepEqual(
    survivors,
    [],
    `these locales still carry the renamed-away key: ${survivors.join(", ")}`
  );
});

test("en + pt-BR carry real copy for every new googleLoopback key; the rest are pending", () => {
  const panels = readSrc("shared/components/OAuthModalPanels.tsx");
  const used = [
    ...new Set(
      [...panels.matchAll(/t(?:\.rich)?\("(googleLoopback[A-Za-z0-9]*)"/g)].map((m) => m[1])
    ),
  ];
  assert.ok(used.length >= 5, `expected several new keys, saw ${used.length}`);

  for (const locale of LOCALES) {
    const cat = readCatalog(locale).oauthModal ?? {};
    for (const key of used) {
      const v = cat[key];
      assert.equal(typeof v, "string", `${locale}.json is missing oauthModal.${key}`);
      if (locale === "en" || locale === "pt-BR") {
        assert.doesNotMatch(
          v,
          /^__MISSING__:/,
          `${locale}.${key} must be hand-written, not a pending sentinel`
        );
      }
    }
  }
});

test("the hand-written copy never tells the operator to copy a callback URL", () => {
  for (const locale of ["en", "pt-BR"]) {
    const cat = readCatalog(locale).oauthModal ?? {};
    const blob = Object.entries(cat)
      .filter(([k]) => k.startsWith("googleLoopback"))
      .map(([, v]) => String(v))
      .join(" ");
    assert.doesNotMatch(
      blob,
      /copie o URL completo|copy the full URL|copy that full URL/i,
      `${locale} still instructs copying a callback URL that never arrives`
    );
  }
});
