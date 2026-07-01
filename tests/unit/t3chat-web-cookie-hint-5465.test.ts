import test from "node:test";
import assert from "node:assert/strict";

// #5465 — t3.chat's add-credential form showed the generic, circular cookie
// hint ("Required cookie: convex-session-id + Cookie header. Paste the Cookie
// header value…"). t3.chat needs a localStorage value AND the Cookie header, so
// that copy is confusing. A step-by-step DevTools hint (t3ChatWebCookieHint)
// already shipped translated in every locale but was never wired to the UI.
const { getWebSessionCredentialHint } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");
const { WEB_SESSION_CREDENTIAL_REQUIREMENTS } =
  await import("../../src/shared/providers/webSessionCredentials.ts");

const T3_HINT =
  "Open t3.chat → DevTools → Application → Local Storage → https://t3.chat, copy 'convex-session-id'. Then open DevTools → Network, copy the full Cookie header from any chat request. Paste both values in the fields below.";

/** Minimal translator stub mimicking next-intl's `t` + `t.has`. */
function makeTranslator(messages: Record<string, string>) {
  const t = ((key: string, values?: Record<string, unknown>) => {
    const raw = messages[key];
    if (raw === undefined) return key;
    return values
      ? Object.entries(values).reduce(
          (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
          raw
        )
      : raw;
  }) as any;
  t.has = (key: string) => key in messages;
  return t;
}

test("t3.chat add-credential hint uses the step-by-step DevTools copy, not the circular generic one (#5465)", () => {
  const t = makeTranslator({
    t3ChatWebCookieHint: T3_HINT,
    webCookieCredentialHint:
      "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.",
  });

  const hint = getWebSessionCredentialHint(
    t,
    WEB_SESSION_CREDENTIAL_REQUIREMENTS["t3-web"],
    "t3.chat",
    false
  );

  assert.equal(hint, T3_HINT);
  assert.ok(hint && hint.includes("Local Storage"), "must explain the localStorage step");
  assert.ok(
    hint && !hint.includes("Required cookie: convex-session-id + Cookie header"),
    "must not fall back to the circular generic cookie hint"
  );
});

test("t3-web requirement now carries the hintKey override (#5465)", () => {
  const req = WEB_SESSION_CREDENTIAL_REQUIREMENTS["t3-web"] as { hintKey?: string };
  assert.equal(req.hintKey, "t3ChatWebCookieHint");
});

test("cookie providers without a hintKey still use the generic hint (#5465 regression guard)", () => {
  const t = makeTranslator({
    webCookieCredentialHint:
      "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.",
  });
  // adapta-web is a cookie provider with no hintKey.
  const hint = getWebSessionCredentialHint(
    t,
    WEB_SESSION_CREDENTIAL_REQUIREMENTS["adapta-web"],
    "adapta",
    false
  );
  assert.ok(hint && hint.startsWith("Required cookie: __client"));
});
