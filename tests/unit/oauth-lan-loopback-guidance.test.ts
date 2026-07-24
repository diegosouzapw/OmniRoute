import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  buildPkceLoopbackMismatchHint,
  buildPkceLoopbackMismatchWarning,
} from "../../src/lib/oauth/utils/pkceLoopbackWarning";

// Follow-up to #8046. The LAN-IP guard already STOPS the doomed flow, but it
// surfaced its explanation as one long English sentence rendered in the generic
// red "Connection failed" step — the operator had to parse prose to work out
// that BOTH the dashboard port AND the provider's fixed callback port have to be
// forwarded, and the command shipped with `<port>`/`<omniroute-host>` placeholders
// they had to resolve by hand.
//
// buildPkceLoopbackMismatchHint() returns the same diagnosis as STRUCTURED data
// (what happened / why / the exact copy-pasteable command) so the modal can render
// an organized panel instead of a wall of text.

const here = dirname(fileURLToPath(import.meta.url));
const readSrc = (rel: string) => readFileSync(resolve(here, "../../src", rel), "utf8");

const LAN = { hostname: "192.168.0.15", port: "20128", protocol: "http:" };

test("hint reports the provider's fixed callback port alongside the dashboard port", () => {
  const hint = buildPkceLoopbackMismatchHint("codex", LAN);

  assert.equal(hint.provider, "codex");
  assert.equal(hint.redirectUri, "http://localhost:1455/auth/callback");
  assert.equal(hint.callbackPort, 1455);
  assert.equal(hint.dashboardPort, "20128");
  assert.equal(hint.dashboardHost, "192.168.0.15");
});

test("tunnel command forwards BOTH ports and reuses the detected host", () => {
  const hint = buildPkceLoopbackMismatchHint("codex", LAN);

  // The dashboard port makes the origin true-localhost (so the callback-server
  // branch runs at all); the provider's fixed port is where the browser is sent
  // back to. Forwarding only one of the two still fails.
  assert.equal(
    hint.tunnelCommand,
    "ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15"
  );
  assert.equal(hint.localDashboardUrl, "http://localhost:20128");
});

test("xai-oauth and grok-cli carry their own distinct callback ports", () => {
  assert.equal(buildPkceLoopbackMismatchHint("xai-oauth", LAN).callbackPort, 56121);
  assert.equal(buildPkceLoopbackMismatchHint("grok-cli", LAN).callbackPort, 56122);
  assert.match(
    buildPkceLoopbackMismatchHint("grok-cli", LAN).tunnelCommand,
    /-L 56122:127\.0\.0\.1:56122/
  );
});

test("unknown provider degrades to dashboard-only forwarding, never an invalid flag", () => {
  const hint = buildPkceLoopbackMismatchHint("some-future-pkce-provider", LAN);

  assert.equal(hint.callbackPort, null);
  assert.equal(hint.tunnelCommand, "ssh -L 20128:127.0.0.1:20128 <user>@192.168.0.15");
  assert.doesNotMatch(hint.tunnelCommand, /null|undefined|NaN/);
});

test("an empty location.port resolves from the protocol instead of leaking ':'", () => {
  const plain = buildPkceLoopbackMismatchHint("codex", {
    hostname: "10.0.0.9",
    port: "",
    protocol: "http:",
  });
  assert.equal(plain.dashboardPort, "80");
  assert.equal(plain.localDashboardUrl, "http://localhost:80");

  const tls = buildPkceLoopbackMismatchHint("codex", {
    hostname: "10.0.0.9",
    port: "",
    protocol: "https:",
  });
  assert.equal(tls.dashboardPort, "443");
});

test("a dashboard already on the callback port emits a single -L flag", () => {
  const hint = buildPkceLoopbackMismatchHint("codex", {
    hostname: "172.16.4.4",
    port: "1455",
    protocol: "http:",
  });

  assert.equal(hint.tunnelCommand, "ssh -L 1455:127.0.0.1:1455 <user>@172.16.4.4");
});

test("the flat warning string is still exported for non-UI callers", () => {
  // Kept so the API route / logs keep a one-line form; the modal uses the hint.
  const msg = buildPkceLoopbackMismatchWarning("codex");
  assert.match(msg, /localhost:1455/);
  assert.match(msg, /LAN IP/i);
});

test("OAuthModal renders the structured panel instead of the generic error step", () => {
  const modal = readSrc("shared/components/OAuthModal.tsx");

  assert.match(
    modal,
    /else if \(isLocalhost\) \{[\s\S]{0,300}buildPkceLoopbackMismatchHint/,
    "the isLocalhost arm of PKCE_CALLBACK_SERVER_PROVIDERS must build the structured hint"
  );
  assert.match(
    modal,
    /setStep\("loopback-mismatch"\)/,
    "the guard must route to its own dedicated step, not the generic red error step"
  );
  assert.match(
    modal,
    /OAuthLoopbackMismatchPanel/,
    "the dedicated step must render the organized panel component"
  );
});

test("the panel yields to the paste-token tab, like the generic error step does", () => {
  // grok-cli sits in BOTH PKCE_CALLBACK_SERVER_PROVIDERS and TOKEN_PASTE_PROVIDERS,
  // so a user who hits the LAN guard and then switches to "Import auth.json" would
  // otherwise see the paste form and this panel stacked on top of each other.
  const modal = readSrc("shared/components/OAuthModal.tsx");

  assert.match(
    modal,
    /step === "loopback-mismatch" &&[^\n]*!showPasteToken/,
    "the loopback-mismatch step must be hidden while the paste-token tab is active"
  );
});

test("the panel is i18n-driven — no hardcoded English prose in the component", () => {
  const panels = readSrc("shared/components/OAuthModalPanels.tsx");
  const panel = panels.slice(panels.indexOf("export function OAuthLoopbackMismatchPanel"));

  assert.ok(panel.length > 0, "OAuthLoopbackMismatchPanel should exist in OAuthModalPanels.tsx");
  assert.match(panel, /t\("loopbackMismatch/, "panel copy must come from the oauthModal catalog");
  // The command itself must be copy-pasteable, like the other panels' fields.
  assert.match(panel, /copy\(/, "the tunnel command needs a copy-to-clipboard affordance");
});

test("en + pt-BR catalogs define every loopbackMismatch key the panel reads", () => {
  const panels = readSrc("shared/components/OAuthModalPanels.tsx");
  const used = new Set(
    [...panels.matchAll(/t(?:\.rich)?\("(loopbackMismatch[A-Za-z0-9]*)"/g)].map((m) => m[1])
  );
  assert.ok(used.size >= 6, `expected the panel to use several keys, saw ${used.size}`);

  for (const locale of ["en", "pt-BR"]) {
    const cat = JSON.parse(
      readFileSync(resolve(here, `../../src/i18n/messages/${locale}.json`), "utf8")
    );
    for (const key of used) {
      assert.ok(
        typeof cat.oauthModal?.[key] === "string" && cat.oauthModal[key].length > 0,
        `${locale}.json is missing oauthModal.${key}`
      );
    }
  }
});
