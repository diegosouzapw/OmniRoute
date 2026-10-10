/**
 * /home route — the namespaces its client components use must be delivered.
 *
 * Companion to i18n-route-provider-coverage.test.ts (which checks that a
 * provider layout exists and mounts the right set) and to
 * i18n-route-namespaces.test.ts (which checks map freshness). This file
 * asserts the property that actually broke in #14835: the set the analyzer
 * computes for the /home route covers every namespace its client components
 * use, and the keys named in the bug report resolve to real copy.
 *
 * The namespace list is derived from the real import closure of
 * src/app/(dashboard)/home/, so a component that starts using a new
 * namespace is picked up automatically without editing this file.
 *
 * NOTE ON A SEAM THAT WAS CONSIDERED AND DROPPED: rendering the route
 * through a real NextIntlClientProvider does not work in this harness —
 * next-intl resolves messages from the app's request config, so the
 * provider's `messages` prop is ignored (a sentinel value passed as
 * `messages` never reaches the output). Such a test would assert nothing.
 * Provider scoping is therefore covered statically by the two files above.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  analyzeRouteNamespaces,
  closureNamespaces,
  walkFiles,
  HOME_ROUTE_DIR,
  REPO_ROOT,
} from "../../scripts/i18n/lib/routeNamespacesAnalyzer.mjs";
import { pickMessages } from "../../src/i18n/pickMessages";

const routeNamespaces = JSON.parse(
  readFileSync(join(REPO_ROOT, "src", "i18n", "routeNamespaces.generated.json"), "utf8")
) as { home: string[]; chrome: string[] };

const EN = JSON.parse(
  readFileSync(join(REPO_ROOT, "src", "i18n", "messages", "en.json"), "utf8")
) as Record<string, unknown>;

/** Namespaces used by a client component under the /home route. */
const HOME_NAMESPACES = [...closureNamespaces(walkFiles(HOME_ROUTE_DIR))].sort();

test("the /home route's namespace closure is non-trivial", () => {
  // Guards the assertions below from going vacuous if detection breaks.
  assert.ok(HOME_NAMESPACES.includes("home"));
  assert.ok(HOME_NAMESPACES.includes("providers"));
  assert.ok(HOME_NAMESPACES.length > 5);
});

test("every namespace used under /home is in the home set", () => {
  const missing = HOME_NAMESPACES.filter((ns) => !routeNamespaces.home.includes(ns));
  assert.deepEqual(
    missing,
    [],
    "/home renders these namespaces as raw dotted keys — its provider omits them"
  );
});

test("the home set is derived from the /home route subtree", () => {
  // Regression: #14835 computed `home` from the sibling dashboard/ directory,
  // which both missed namespaces used under home/ and left the route itself
  // without a provider.
  const fresh = analyzeRouteNamespaces();
  assert.deepEqual(fresh.home, routeNamespaces.home, "run `npm run gen:i18n-routes`");
  const missing = HOME_NAMESPACES.filter((ns) => !fresh.home.includes(ns));
  assert.deepEqual(missing, []);
});

test("the keys from the bug report resolve to real copy", () => {
  const messages = pickMessages(EN, routeNamespaces.home) as Record<
    string,
    Record<string, unknown>
  >;
  const reported: Array<[string, string]> = [
    ["home", "quickStart"],
    ["home", "step1Title"],
    ["home", "fullDocs"],
    ["kimiSponsorBanner", "cta"],
    ["cheaperInferenceSponsorBanner", "cta"],
    ["vscodeCopilotBanner", "cta"],
  ];
  for (const [namespace, key] of reported) {
    const value = messages[namespace]?.[key];
    assert.equal(typeof value, "string", `${namespace}.${key} must be delivered to /home`);
    assert.notEqual(value, `${namespace}.${key}`, `${namespace}.${key} rendered as a raw key`);
  }
});

test("the home set includes the dashboard chrome namespaces", () => {
  // Nested providers REPLACE, so a set missing chrome would break the shell.
  const missing = routeNamespaces.chrome.filter((ns) => !routeNamespaces.home.includes(ns));
  assert.deepEqual(missing, [], "home set must cover the shared dashboard shell");
});
