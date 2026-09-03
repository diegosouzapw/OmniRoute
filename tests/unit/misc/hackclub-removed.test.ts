/**
 * #11176 — Hack Club AI (hackclub) must be FULLY removed from the live catalogs.
 *
 * PR #11118/#11123 removed the provider from the open-sse REGISTRY, but the
 * canonical shared catalog (`src/shared/constants/providers/`) kept the entry,
 * so the dashboard, the alias resolver, the icon set, the onboarding i18n
 * strings and the generated provider reference kept advertising a provider the
 * router can no longer serve. This test pins the complete removal:
 *
 *   1. no canonical catalog (API-key / web-cookie / OAuth / no-auth / local /
 *      search / audio / upstream-proxy / cloud-agent / system) has a `hackclub` entry;
 *   2. no provider in any catalog claims the `hc` alias (it belonged to hackclub);
 *   3. the provider/catalog source trees carry no `hackclub` mention at all
 *      (structural grep — catches comments referencing it as a living provider);
 *   4. the icon registry and the shipped SVG asset are gone;
 *   5. the onboarding i18n description key is gone (en + all locale mirrors).
 *
 * Historical mentions intentionally KEPT (release records, not catalog):
 * CHANGELOG.md, docs/i18n/*\/CHANGELOG.md, and the removal migration
 * src/lib/db/migrations/162_remove_hackclub_provider.sql (it IS the removal).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  OAUTH_PROVIDERS,
  FREE_PROVIDERS,
  NOAUTH_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
} from "../../../src/shared/constants/providers.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const CATALOGS: Record<string, Record<string, { id?: string; alias?: string }>> = {
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  OAUTH_PROVIDERS: OAUTH_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  FREE_PROVIDERS: FREE_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  NOAUTH_PROVIDERS: NOAUTH_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  LOCAL_PROVIDERS: LOCAL_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  SEARCH_PROVIDERS: SEARCH_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  AUDIO_ONLY_PROVIDERS: AUDIO_ONLY_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  UPSTREAM_PROXY_PROVIDERS: UPSTREAM_PROXY_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  CLOUD_AGENT_PROVIDERS: CLOUD_AGENT_PROVIDERS as Record<string, { id?: string; alias?: string }>,
  SYSTEM_PROVIDERS: SYSTEM_PROVIDERS as Record<string, { id?: string; alias?: string }>,
};

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|mts|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

test("hackclub is absent from every canonical provider catalog", () => {
  for (const [name, catalog] of Object.entries(CATALOGS)) {
    assert.equal(
      "hackclub" in catalog,
      false,
      `${name} still contains a hackclub entry (#11176)`
    );
  }
});

test("no provider in any catalog claims the `hc` alias (it belonged to hackclub)", () => {
  const holders: string[] = [];
  for (const [name, catalog] of Object.entries(CATALOGS)) {
    for (const [key, p] of Object.entries(catalog)) {
      if (p?.alias === "hc" || key === "hc") holders.push(`${name}:${key}`);
    }
  }
  assert.deepEqual(holders, [], `alias "hc" still claimed by: ${holders.join(", ")}`);
});

test("no hackclub mention survives in the provider/catalog source trees", () => {
  const scopedDirs = [
    path.join(ROOT, "src", "shared", "constants", "providers"),
    path.join(ROOT, "open-sse", "config"),
  ];
  const offenders: string[] = [];
  for (const dir of scopedDirs) {
    for (const file of walk(dir)) {
      if (/hack\s*club|hackclub/i.test(fs.readFileSync(file, "utf8"))) {
        offenders.push(path.relative(ROOT, file));
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `hackclub mentions left in catalog sources: ${offenders.join(", ")}`
  );
});

test("hackclub icon registration and shipped SVG asset are gone", () => {
  const iconSource = fs.readFileSync(
    path.join(ROOT, "src", "shared", "components", "ProviderIcon.tsx"),
    "utf8"
  );
  assert.equal(
    /hackclub/i.test(iconSource),
    false,
    "ProviderIcon.tsx still registers hackclub (#11176)"
  );
  assert.equal(
    fs.existsSync(path.join(ROOT, "public", "providers", "hackclub.svg")),
    false,
    "public/providers/hackclub.svg still shipped (#11176)"
  );
});

test("onboarding i18n description for hackclub is gone from every locale", () => {
  const messagesDir = path.join(ROOT, "src", "i18n", "messages");
  const offenders: string[] = [];
  for (const file of fs.readdirSync(messagesDir)) {
    if (!file.endsWith(".json")) continue;
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8"));
    const descriptions = messages?.providers?.onboardingProviderDescriptions;
    if (descriptions && "hackclub" in descriptions) offenders.push(file);
  }
  assert.deepEqual(
    offenders,
    [],
    `onboardingProviderDescriptions.hackclub still present in: ${offenders.join(", ")}`
  );
});
