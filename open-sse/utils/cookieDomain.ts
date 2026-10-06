/**
 * Cookie-domain matching for browser-driven credential capture.
 *
 * Every in-app / console login flow harvests cookies out of a Playwright
 * context and persists them as operator credentials, so "is this cookie from
 * the site I sent the browser to?" is an authorization decision. A substring
 * test is not one: `domain.includes("example.com")` also accepts
 * `example.com.attacker.tld` and `notexample.com`, which lets a look-alike host
 * hand us cookies we then store as the operator's real credentials
 * (CodeQL js/incomplete-url-substring-sanitization).
 *
 * A cookie domain is matched by exact host or dot-boundary suffix — nothing
 * else. Leading dots (the RFC 6265 "domain-matches any subdomain" spelling) and
 * case are normalized away on both sides.
 */
export function matchesCookieDomain(
  cookieDomain: string | undefined,
  expectedDomain: string | undefined
): boolean {
  const expected = normalizeCookieDomain(expectedDomain);
  if (!expected) return false;

  const actual = normalizeCookieDomain(cookieDomain);
  if (!actual) return false;

  return actual === expected || actual.endsWith(`.${expected}`);
}

function normalizeCookieDomain(domain: string | undefined): string {
  return String(domain || "")
    .trim()
    .replace(/^\.+/, "")
    .toLowerCase();
}
