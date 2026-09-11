import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const home = read("../../../src/app/(dashboard)/dashboard/HomePageClient.tsx");
const homeUtils = read("../../../src/app/(dashboard)/dashboard/homePageClientUtils.ts");
const globalsCss = read("../../../src/app/globals.css");
const layout = read("../../../src/app/layout.tsx");
const card = read("../../../src/shared/components/Card.tsx");
const header = read("../../../src/shared/components/Header.tsx");
const sidebar = read("../../../src/shared/components/Sidebar.tsx");
const dataTable = read("../../../src/shared/components/DataTable.tsx");

test("#11899 HomePageClient keeps the Apple bento quick-start grid", () => {
  assert.match(home, /BENTO_CARD/);
  assert.match(homeUtils, /rounded-\[18px\]/);
  assert.match(homeUtils, /bg-\[#F5F5F7\]/);
  assert.match(home, /max-w-\[980px\]/);
  assert.match(home, /gap-12/);
});

test("#11899 shared chrome keeps liquid-glass classes", () => {
  assert.match(card, /glass-card/);
  assert.match(header, /glass-header/);
  assert.match(sidebar, /glass-sidebar/);
  assert.match(dataTable, /var\(--glass-blur-sm\)/);
  assert.match(globalsCss, /--glass-blur:\s*blur\(20px\)/);
  assert.match(globalsCss, /--ease-spring:/);
});

test("#11899 layout pairs JetBrains Mono for code/data", () => {
  assert.match(layout, /JetBrains_Mono/);
  assert.match(layout, /--font-jetbrains/);
  assert.match(layout, /jetbrainsMono\.variable/);
});
