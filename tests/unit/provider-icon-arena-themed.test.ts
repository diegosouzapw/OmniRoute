/**
 * Arena (lmarena) theme-aware provider icons must stay wired to the static SVGs
 * under public/providers/arena-{light,dark}.svg.
 */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const providerIconSrc = readFileSync(join(root, "src/shared/components/ProviderIcon.tsx"), "utf8");

test("ProviderIcon maps lmarena (and lma) to arena light/dark SVGs", () => {
  assert.ok(
    providerIconSrc.includes('light: "/providers/arena-light.svg"'),
    "must reference arena-light.svg"
  );
  assert.ok(
    providerIconSrc.includes('dark: "/providers/arena-dark.svg"'),
    "must reference arena-dark.svg"
  );
  assert.ok(providerIconSrc.includes("lmarena:"), "must register wire id lmarena");
  assert.ok(providerIconSrc.includes("lma:"), "must register alias lma");
});

test("arena theme SVG assets exist under public/providers/", () => {
  assert.ok(existsSync(join(root, "public/providers/arena-light.svg")));
  assert.ok(existsSync(join(root, "public/providers/arena-dark.svg")));
});
