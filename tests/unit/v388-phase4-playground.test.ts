import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression guards for v3.8.8 Playground screen fixes (Phase 4).
const root = join(import.meta.dirname, "../..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

test("playground config: adds Provider + Model selects reusing translator hooks", () => {
  const src = read("src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx");
  assert.ok(src.includes("useProviderOptions"), "reuses useProviderOptions");
  assert.ok(src.includes("useAvailableModels"), "reuses useAvailableModels");
  assert.ok(src.includes('update("provider"'), "writes provider into ConfigState");
  assert.ok(src.includes("provider?: string"), "ConfigState gains provider");
});

test("playground compare: prompt input + rAF throttle + user message in request", () => {
  const src = read("src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx");
  assert.ok(src.includes("requestAnimationFrame"), "throttles stream updates via rAF");
  assert.ok(/role:\s*"user"/.test(src), "request body includes a user message");
  assert.ok(src.includes("setPrompt"), "has a prompt input control");
});

test("playground build: wizard with 3 modes reusing editors; BuildTab keeps handlers", () => {
  const wiz = read("src/app/(dashboard)/dashboard/playground/components/tabs/build/BuildWizard.tsx");
  assert.ok(wiz.includes('"tools"') && wiz.includes('"json"') && wiz.includes('"both"'), "three modes");
  assert.ok(wiz.includes("ToolsBuilder") && wiz.includes("StructuredOutputEditor"), "reuses both editors");
  const tab = read("src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx");
  assert.ok(tab.includes("<BuildWizard"), "BuildTab mounts BuildWizard");
  assert.ok(tab.includes("runRequest") && tab.includes("sendToolResult"), "BuildTab preserves run/tool handlers");
});

test("playground build i18n: playground.build keys present with en/pt parity", () => {
  const en = JSON.parse(read("src/i18n/messages/en.json"));
  const pt = JSON.parse(read("src/i18n/messages/pt-BR.json"));
  const ek = Object.keys(en.playground?.build ?? {});
  const pk = Object.keys(pt.playground?.build ?? {});
  assert.ok(ek.length >= 10, `expected >=10 build keys, got ${ek.length}`);
  assert.deepEqual(ek.sort(), pk.sort(), "en/pt-BR playground.build keys must match");
});
