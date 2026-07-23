import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..");
const providersPage = readFileSync(
  join(repoRoot, "src/app/(dashboard)/dashboard/providers/page.tsx"),
  "utf8"
);

test("provider Learn more link uses the maintained documentation entry point", () => {
  assert.match(
    providersPage,
    /href="https:\/\/github\.com\/diegosouzapw\/OmniRoute#-documentation"/,
    "the provider help CTA should open the maintained GitHub documentation section"
  );
});

test("provider Learn more link does not use the retired documentation host", () => {
  assert.doesNotMatch(
    providersPage,
    /https:\/\/docs\.omniroute\.io\/providers/,
    "docs.omniroute.io/providers is no longer reachable"
  );
});
