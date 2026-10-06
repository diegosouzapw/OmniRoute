import test from "node:test";
import assert from "node:assert/strict";

// #10081 — CLI commands swallowed a non-2xx into a benign-looking outcome:
//   * `keys add` aborted on any 4xx, so a missing route (404) stranded the user
//     even though the local SQLite fallback right below would have worked.
//   * `providers test-all` reported OAuth connections as FAILED (and persisted
//     that verdict) because getProviderApiKey() throws for them by design.
//   * `combo list` printed "No combos configured" when the HTTP call failed,
//     which is indistinguishable from genuine emptiness.

const { isRouteUnavailableStatus } = await import("../../bin/cli/api.mjs");

test("isRouteUnavailableStatus separates 'route missing' from real client errors", () => {
  // Server does not serve this route -> the caller may fall back locally.
  for (const status of [404, 405, 501]) {
    assert.equal(isRouteUnavailableStatus(status), true, `${status} should be route-unavailable`);
  }

  // Genuine client errors must stay fatal — retrying locally would hide a real
  // problem (bad credential, insufficient scope, conflict, invalid payload).
  for (const status of [400, 401, 403, 409, 422, 429]) {
    assert.equal(isRouteUnavailableStatus(status), false, `${status} should stay fatal`);
  }

  // Server-side failures are handled by the existing retry path, not here.
  for (const status of [500, 502, 503]) {
    assert.equal(isRouteUnavailableStatus(status), false, `${status} should stay fatal`);
  }
});

test("keys add falls through to the local DB only for route-unavailable statuses", async () => {
  const source = await import("node:fs").then((fs) =>
    fs.readFileSync(new URL("../../bin/cli/commands/keys.mjs", import.meta.url), "utf8")
  );

  // The guard must exclude route-unavailable statuses, otherwise the
  // openOmniRouteDb() fallback below it is unreachable while the server is up.
  assert.match(
    source,
    /res\.status >= 400 && res\.status < 500 && !isRouteUnavailableStatus\(res\.status\)/,
    "keys add should not abort on a missing route"
  );
});

test("providers test-all skips connections it cannot probe instead of failing them", async () => {
  const source = await import("node:fs").then((fs) =>
    fs.readFileSync(new URL("../../bin/cli/commands/providers.mjs", import.meta.url), "utf8")
  );

  // Non-apikey connections return early as skipped, before getProviderApiKey().
  const nonApiKeyGuard = source.indexOf('if (connection.authType !== "apikey")');
  const getKeyCall = source.indexOf("const apiKey = getProviderApiKey(connection);");
  assert.ok(nonApiKeyGuard > -1, "expected a non-apikey guard in runProviderTest");
  assert.ok(
    nonApiKeyGuard < getKeyCall,
    "the guard must run before getProviderApiKey(), which throws for OAuth"
  );

  // An "unsupported" probe must not overwrite a good test_status with a failure.
  assert.match(source, /if \(result\.unsupported\) \{[\s\S]*?skipped: true/);
});

test("combo list reports a transport failure instead of 'No combos configured'", async () => {
  const source = await import("node:fs").then((fs) =>
    fs.readFileSync(new URL("../../bin/cli/commands/combo.mjs", import.meta.url), "utf8")
  );

  assert.match(source, /listError = listRes\.status/, "a failed list must be recorded");
  // The error branch has to be checked before the empty-list branch, otherwise
  // the misleading "no combos" message still wins.
  const errorBranch = source.indexOf("if (listError) {");
  const emptyBranch = source.indexOf('console.log(t("combo.noCombos"))');
  assert.ok(errorBranch > -1 && emptyBranch > -1);
  assert.ok(errorBranch < emptyBranch, "listError must be handled before the empty-list message");
});
