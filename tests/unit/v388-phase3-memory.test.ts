import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression guards for v3.8.8 Memory screen fixes (Phase 3).
const root = join(import.meta.dirname, "../..");
const read = (p: string) => readFileSync(join(root, p), "utf8");
const en = JSON.parse(read("src/i18n/messages/en.json"));
const pt = JSON.parse(read("src/i18n/messages/pt-BR.json"));

test("memory: health auto-checks on mount + 30s polling", () => {
  const src = read("src/app/(dashboard)/dashboard/memory/components/tabs/MemoriesTab.tsx");
  assert.ok(src.includes("void checkHealth();"), "calls checkHealth from an effect");
  assert.ok(src.includes("setInterval"), "polls health periodically");
});

test("memory: page wires enable/disable toggle via useMemorySettings", () => {
  const src = read("src/app/(dashboard)/dashboard/memory/page.tsx");
  assert.ok(src.includes("useMemorySettings"), "uses the settings hook");
  assert.ok(/role="switch"/.test(src), "renders a switch control");
  assert.ok(src.includes("save({ enabled:"), "persists enabled via save()");
});

test("memory: vector store shows install hint when backend is none", () => {
  const src = read("src/app/(dashboard)/dashboard/memory/components/MemoryEngineStatus.tsx");
  assert.ok(src.includes('status.vectorStore.backend === "none"'), "branches on backend none");
  assert.ok(src.includes("engine.vectorStoreInstallHint"), "renders the install-hint key");
});

test("memory i18n: memoryEnabled + engine.vectorStoreInstallHint present in en + pt-BR", () => {
  assert.ok(en.memory?.memoryEnabled && pt.memory?.memoryEnabled, "memoryEnabled in both locales");
  assert.ok(
    en.memory?.engine?.vectorStoreInstallHint && pt.memory?.engine?.vectorStoreInstallHint,
    "vectorStoreInstallHint in both locales"
  );
});
