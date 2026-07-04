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

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const wizard = readFileSync(
  join(
    repoRoot,
    "src/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingWizard.tsx"
  ),
  "utf8"
);

test("#6145: provider-details link routes by connection.id (matches the [id] route)", () => {
  assert.match(
    wizard,
    /href=\{`\/dashboard\/providers\/\$\{connection\.id\}`\}/,
    "the details link must build the URL from connection.id"
  );
});

test("#6145: provider-details link must NOT use connection.provider (404s for compat providers)", () => {
  assert.doesNotMatch(
    wizard,
    /href=\{`\/dashboard\/providers\/\$\{connection\.provider\}`\}/,
    "connection.provider is the slug/type, not the node id — it 404s"
  );
});
