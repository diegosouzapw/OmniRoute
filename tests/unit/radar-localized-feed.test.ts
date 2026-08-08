import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { RadarFeedSchema } from "../../src/lib/radar/feedSchema.ts";

const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/radar-feed-canonical.json", import.meta.url), "utf8")
) as Record<string, unknown>;

test("RadarFeedSchema accepts D25 localized setup and quirk text with English fallback", () => {
  const localized = structuredClone(fixture) as {
    models: Array<{ setup: { steps: unknown[] } | null }>;
    quirks: Array<{ title: unknown; body: unknown }>;
  };
  localized.models[0]!.setup!.steps[0] = { en: "Create an account", pt: "Crie uma conta" };
  localized.quirks = [
    {
      slug: "shared-pool",
      title: { en: "Shared quota", pt: "Cota compartilhada" },
      body: { en: "Models share one pool." },
      severity: "info",
      targets: [{ provider: "groq", modelGlob: null }],
    },
  ];
  const parsed = RadarFeedSchema.parse(localized);
  assert.deepEqual(parsed.models[0]!.setup!.steps[0], {
    en: "Create an account",
    pt: "Crie uma conta",
  });
});
