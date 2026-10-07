import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// The two new i18n keys are present in every locale catalog and wired to the
// production code that reads them: the operator-egress flag description (keyed
// by the flag definition) and the operator-provided member line (rendered by
// the component). The runtime falls back to English for an absent key, so this
// test pins the translated presence — 67 catalogs, no silent English-only
// feature. Both halves are asserted: the locale files AND the code that names
// them, so the test fails without either side of the PR.

import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

const MESSAGES_DIR = path.join(process.cwd(), "src", "i18n", "messages");

test("operator-egress keys are present in all 67 locale catalogs and wired to code", () => {
  // Code side: the flag definition names the description key the locales carry.
  const definition = FEATURE_FLAG_DEFINITIONS.find(
    (d) => d.key === "PROXY_OPERATOR_EGRESS_ENABLED"
  );
  assert.ok(definition, "PROXY_OPERATOR_EGRESS_ENABLED is defined");
  assert.equal(definition.descriptionI18nKey, "featureFlagProxyOperatorEgressDescription");

  // Component side: the member lines render the operator key (fails on the base
  // component, which never names it).
  const component = fs.readFileSync(
    path.join(
      process.cwd(),
      "src",
      "app",
      "(dashboard)",
      "dashboard",
      "settings",
      "components",
      "PoolMemberEgressLines.tsx"
    ),
    "utf8"
  );
  assert.ok(
    component.includes("poolMemberEgressOperator"),
    "PoolMemberEgressLines renders poolMemberEgressOperator"
  );

  // Locale side: every catalog carries both keys.
  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
  assert.equal(files.length, 67);
  const missing: string[] = [];
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8")) as Record<
      string,
      unknown
    >;
    if (typeof data.featureFlagProxyOperatorEgressDescription !== "string") {
      missing.push(`${file}:featureFlagProxyOperatorEgressDescription`);
    }
    const registry = data.proxyRegistry as Record<string, unknown> | undefined;
    if (typeof registry?.poolMemberEgressOperator !== "string") {
      missing.push(`${file}:proxyRegistry.poolMemberEgressOperator`);
    }
  }
  assert.deepEqual(missing, []);
});
