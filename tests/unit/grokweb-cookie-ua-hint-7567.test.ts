import test from "node:test";
import assert from "node:assert/strict";
import type { ProviderMessageTranslator } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerCredentialText.ts";

// #7567 — grok-web's add-connection dialog showed the generic, uninformative
// cookie hint ("Required cookie: sso + sso-rw. Paste the Cookie header
// value…") even though the real failure mode (403 from a pasted cf_clearance
// pinned to a different IP/User-Agent/TLS fingerprint) is only resolvable by
// also filling the Custom User-Agent field under Advanced Settings and reusing
// the same IP/proxy. A dedicated hintKey (grokWebCookieHint) now overrides the
// generic copy on the ADD flow, following the exact #5465 (t3.chat) pattern.
const { getWebSessionCredentialHint } = await import(
  "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts"
);
const { WEB_SESSION_CREDENTIAL_REQUIREMENTS } = await import(
  "../../src/shared/providers/webSessionCredentials.ts"
);

const GROK_HINT =
  "grok.com's cf_clearance cookie is pinned to the IP, User-Agent, and TLS fingerprint of the browser where you copied it — pasting it from a different machine/IP causes a 403. Paste sso and sso-rw here, then open Advanced Settings and fill Custom User-Agent with the EXACT User-Agent string of that same browser, and use the same IP/proxy for this connection.";

const GENERIC_COOKIE_HINT_TEMPLATE =
  "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.";

/** Minimal translator stub mimicking next-intl's `t` + `t.has`. */
function makeTranslator(messages: Record<string, string>): ProviderMessageTranslator {
  const t = ((key: string, values?: Record<string, unknown>) => {
    const raw = messages[key];
    if (raw === undefined) return key;
    return values
      ? Object.entries(values).reduce(
          (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
          raw
        )
      : raw;
  }) as ProviderMessageTranslator;
  t.has = (key: string) => key in messages;
  return t;
}

test("grok-web requirement carries the grokWebCookieHint override (#7567)", () => {
  const req = WEB_SESSION_CREDENTIAL_REQUIREMENTS["grok-web"] as { hintKey?: string };
  assert.equal(req.hintKey, "grokWebCookieHint");
});

test("grok-web add-connection hint explains cf_clearance IP/UA/TLS pinning and the Custom User-Agent fix (#7567)", () => {
  const t = makeTranslator({
    grokWebCookieHint: GROK_HINT,
    webCookieCredentialHint: GENERIC_COOKIE_HINT_TEMPLATE,
  });

  const hint = getWebSessionCredentialHint(
    t,
    WEB_SESSION_CREDENTIAL_REQUIREMENTS["grok-web"],
    "Grok",
    false
  );

  assert.equal(hint, GROK_HINT);
  assert.ok(hint && hint.includes("User-Agent"), "must mention User-Agent");
  assert.ok(hint && hint.includes("IP"), "must mention IP pinning");
  assert.ok(hint && hint.includes("cf_clearance"), "must mention cf_clearance");
});

test("grok-web add-connection hint does not fall back to the generic circular cookie hint (#7567)", () => {
  const t = makeTranslator({
    grokWebCookieHint: GROK_HINT,
    webCookieCredentialHint: GENERIC_COOKIE_HINT_TEMPLATE,
  });

  const hint = getWebSessionCredentialHint(
    t,
    WEB_SESSION_CREDENTIAL_REQUIREMENTS["grok-web"],
    "Grok",
    false
  );

  assert.ok(
    hint && !hint.includes("Required cookie: sso + sso-rw"),
    "must not fall back to the generic single-cookie template"
  );
});

test("grok-web edit-connection flow is unaffected by the new hintKey (#7567 regression guard)", () => {
  const t = makeTranslator({
    grokWebCookieHint: GROK_HINT,
    webCookieEditHint: "Leave blank to keep the current session cookie. Required cookie: {credential}.",
  });

  const hint = getWebSessionCredentialHint(
    t,
    WEB_SESSION_CREDENTIAL_REQUIREMENTS["grok-web"],
    "Grok",
    true
  );

  assert.ok(
    hint && hint.startsWith("Leave blank to keep the current session cookie."),
    "editing=true must keep the generic edit-flow copy, not the new hintKey"
  );
  assert.ok(hint && !hint.includes("cf_clearance"), "edit flow must not surface the new add-flow hint");
});

test("grok-web hintFallback is used verbatim when the translation key is missing (#7567)", () => {
  const t = makeTranslator({
    // grokWebCookieHint intentionally absent — t.has() must return false.
    webCookieCredentialHint: GENERIC_COOKIE_HINT_TEMPLATE,
  });

  const requirement = WEB_SESSION_CREDENTIAL_REQUIREMENTS["grok-web"] as {
    hintFallback?: string;
  };
  assert.ok(requirement.hintFallback, "grok-web must define a hintFallback");

  const hint = getWebSessionCredentialHint(t, WEB_SESSION_CREDENTIAL_REQUIREMENTS["grok-web"], "Grok", false);

  assert.equal(hint, requirement.hintFallback);
});
