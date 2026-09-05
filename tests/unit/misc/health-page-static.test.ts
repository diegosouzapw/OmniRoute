import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const pagePath = path.join(repoRoot, "src/app/(dashboard)/dashboard/health/page.tsx");

function readPage() {
  return fs.readFileSync(pagePath, "utf8");
}

test("health page leads with a plain-language verdict and a collapsible advanced section", () => {
  const source = readPage();

  // Verdict header with plain-language states
  assert.match(source, /healthVerdictReady/);
  assert.match(source, /healthVerdictCoolingDown/);
  assert.match(source, /healthVerdictActionRequired/);

  // No hardcoded English outcomes in the verdict header
  assert.doesNotMatch(source, /OmniRoute is ready/);

  // Collapsible "Advanced diagnostics" section
  assert.match(source, /advancedDiagnosticsTitle/);
  assert.match(source, /setShowAdvanced/);
  assert.match(source, /showAdvanced \? t\("hide"\) : t\("show"\)/);
});
