import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Regression guard for #6145: the onboarding success-screen "Open provider
// details" link must route by `connection.id` (the node id the
// `/dashboard/providers/[id]` route expects), NOT `connection.provider` (the
// provider slug/type). The old code produced `/dashboard/providers/<provider-slug>`
// which 404s for openai-compatible / anthropic-compatible providers.
//
// #6166 refactored the inline `href={`/dashboard/providers/${connection.id}`}`
// literal into the tested `buildProviderDetailsHref(connection)` helper (its
// id-based routing + null-safety is guarded behaviorally in
// `provider-onboarding-href.test.ts`). This guard now tracks that refactor: the
// wizard must delegate to the helper and must NOT reintroduce a raw
// `connection.provider` URL.

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const wizard = readFileSync(
  join(
    repoRoot,
    "src/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingWizard.tsx"
  ),
  "utf8"
);

test("#6145: provider-details link routes through buildProviderDetailsHref (id-based helper)", () => {
  assert.match(
    wizard,
    /buildProviderDetailsHref\(connection\)/,
    "the details link must be built by the tested buildProviderDetailsHref helper (routes by connection.id)"
  );
});

test("#6145: provider-details link must NOT use connection.provider (404s for compat providers)", () => {
  assert.doesNotMatch(
    wizard,
    /href=\{`\/dashboard\/providers\/\$\{connection\.provider\}`\}/,
    "connection.provider is the slug/type, not the node id — it 404s"
  );
});
