import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression guards for v3.8.8 screen-fix Phase 1 (quick wins).
const root = join(import.meta.dirname, "../..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

test("search-tools: export modal mounts on exportOpen (not by default) without invalid isOpen prop", () => {
  const src = read("src/app/(dashboard)/dashboard/search-tools/components/SearchToolsTopBar.tsx");
  assert.ok(src.includes("{exportOpen && exportState != null && ("), "modal guarded by exportOpen");
  assert.equal(/<ExportCodeModal[^>]*\bisOpen=/.test(src), false, "no invalid isOpen prop on ExportCodeModal");
});

test("memory: tabs ordered memories -> engine -> playground", () => {
  const src = read("src/app/(dashboard)/dashboard/memory/page.tsx");
  assert.ok(src.includes('["memories", "engine", "playground"]'), "TABS order is memories, engine, playground");
});

test("shared Select: renders children and guards placeholder/options when children present", () => {
  const src = read("src/shared/components/Select.tsx");
  assert.ok(src.includes("{children}"), "renders children passed by callers");
  assert.ok(src.includes("!children && placeholder"), "placeholder guarded by !children");
  assert.ok(src.includes("!children &&\n            options.map") || src.includes("!children &&"), "options guarded by !children");
});

test("logs: proxy/console tabs removed (dedicated menu pages exist)", () => {
  const src = read("src/app/(dashboard)/dashboard/logs/page.tsx");
  assert.equal(/value:\s*"proxy-logs"/.test(src), false, "proxy-logs tab removed");
  assert.equal(/value:\s*"console"/.test(src), false, "console tab removed");
  assert.equal(src.includes("<ProxyLogger"), false, "ProxyLogger not rendered here");
  assert.equal(src.includes("<ConsoleLogViewer"), false, "ConsoleLogViewer not rendered here");
  assert.equal(src.includes("SegmentedControl"), false, "SegmentedControl removed (single tab left)");
});
