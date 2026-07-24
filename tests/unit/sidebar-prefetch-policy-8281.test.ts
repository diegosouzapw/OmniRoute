import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const SIDEBAR = "src/shared/components/Sidebar.tsx";

test("#8281: dashboard navigation opts out of automatic route prefetch", async () => {
  const source = await readFile(SIDEBAR, "utf8");

  const internalLink = source.match(/<Link\s+[\s\S]*?href=\{item\.href\}[\s\S]*?>/);
  assert.ok(internalLink, "expected the sidebar's internal navigation Link");
  assert.match(internalLink[0], /prefetch=\{false\}/);

  const logoLink = source.match(/<Link\s+href="\/home"[\s\S]*?>/);
  assert.ok(logoLink, "expected the sidebar logo home Link");
  assert.match(logoLink[0], /prefetch=\{false\}/);
});
