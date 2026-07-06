import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Quarentena de flakes de concorrência (plano melhorias v3.8.46, P0.3).
// Os arquivos em tests/unit/serial/ falham sob contenção de CPU (--test-concurrency>1
// com a suíte inteira) mas passam isolados — classe glm-3580 / quota-division /
// provider-health-autopilot, que custava re-runs de ~28min por rodada de CI.
// Este guard garante que a quarentena continua ligada em TODOS os runners.

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pkg = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
const scripts: Record<string, string> = pkg.scripts;

const SERIAL_GLOB = 'tests/unit/serial/**/*.test.ts';

test("test:unit:serial existe e roda o diretório de quarentena com concurrency=1", () => {
  const s = scripts["test:unit:serial"];
  assert.ok(s, "script test:unit:serial deve existir");
  assert.ok(s.includes("--test-concurrency=1"), "quarentena deve rodar serial");
  assert.ok(s.includes(SERIAL_GLOB), "quarentena deve apontar para tests/unit/serial/");
});

test("todos os runners paralelos terminam com o passo serial", () => {
  for (const key of ["test:unit", "test:unit:ci", "test:unit:fast", "test:coverage:runner"]) {
    assert.ok(
      scripts[key].endsWith("&& npm run test:unit:serial"),
      `${key} deve encadear o passo serial no fim`
    );
  }
  for (const [key, shard] of [
    ["test:unit:ci:shard", "$TEST_SHARD"],
    ["test:unit:shard:1", "1/2"],
    ["test:unit:shard:2", "2/2"],
  ] as const) {
    const s = scripts[key];
    const serialPart = s.slice(s.lastIndexOf("&&"));
    assert.ok(serialPart.includes("--test-concurrency=1"), `${key}: passo serial ausente`);
    assert.ok(
      serialPart.includes(`--test-shard=${shard}`),
      `${key}: o passo serial deve ser SHARDADO (${shard}) — sem isso os dois shards rodam ` +
        `os mesmos arquivos ao mesmo tempo e recriam a colisão que a quarentena elimina`
    );
    assert.ok(serialPart.includes(SERIAL_GLOB), `${key}: glob da quarentena ausente`);
  }
});

test("os globs paralelos NÃO capturam tests/unit/serial/ (sem dupla execução)", () => {
  const parallel = scripts["test:unit"].split("&& npm run test:unit:serial")[0];
  assert.ok(!parallel.includes("serial"), "parte paralela não deve referenciar serial/");
  // o glob de subdiretórios é uma brace-list explícita — 'serial' não pode entrar nela
  const braceList = parallel.match(/tests\/unit\/\{([^}]+)\}/)?.[1] ?? "";
  assert.ok(!braceList.split(",").includes("serial"), "brace-list não deve conter 'serial'");
});

test("a quarentena contém os 3 flakes conhecidos e os gates de discovery/TIA a conhecem", () => {
  const files = readdirSync(path.join(ROOT, "tests/unit/serial"));
  for (const f of [
    "glm-coding-plan-monthly-3580.test.ts",
    "quota-division-blocks.test.ts",
    "provider-health-autopilot.test.ts",
    "combo-health-autopilot.test.ts",
  ]) {
    assert.ok(files.includes(f), `${f} deve estar na quarentena`);
  }
  const discovery = readFileSync(path.join(ROOT, "scripts/check/check-test-discovery.mjs"), "utf8");
  assert.ok(discovery.includes(SERIAL_GLOB), "check-test-discovery deve listar o glob serial");
  const tia = readFileSync(path.join(ROOT, "scripts/quality/build-test-impact-map.mjs"), "utf8");
  assert.ok(tia.includes(SERIAL_GLOB), "build-test-impact-map deve listar o glob serial");
});
