import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  parseSizeLimitResults,
  measureViaFileStat,
  runSizeLimit,
  evaluateBundleSizeRatchet,
  readBaselineBundleSizeValue,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../../scripts/check/check-bundle-size.mjs";

type RatchetVerdict = { regressed: boolean; improved: boolean };
const evaluateSize = evaluateBundleSizeRatchet as (
  current: number,
  baseline: number
) => RatchetVerdict;
const readSizeBaseline = readBaselineBundleSizeValue as (p?: string) => number | null;

// ---------------------------------------------------------------------------
// parseSizeLimitResults
// ---------------------------------------------------------------------------

test("parseSizeLimitResults: soma os campos size de cada entrada", () => {
  const results = [
    { name: "entry-a", size: 1024, passed: true },
    { name: "entry-b", size: 2048, passed: true },
  ];
  assert.equal(parseSizeLimitResults(results), 3072);
});

test("parseSizeLimitResults: ignora entradas sem campo size", () => {
  const results = [
    { name: "entry-a", size: 500 },
    { name: "entry-b" }, // sem size
  ];
  assert.equal(parseSizeLimitResults(results), 500);
});

test("parseSizeLimitResults: lança TypeError para argumento não-array", () => {
  assert.throws(
    () => parseSizeLimitResults({ name: "x", size: 100 } as unknown as never[]),
    TypeError
  );
});

test("parseSizeLimitResults: lança Error quando nenhuma entrada tem size", () => {
  const results = [{ name: "entry-a" }, { name: "entry-b" }];
  assert.throws(() => parseSizeLimitResults(results), Error);
});

test("parseSizeLimitResults: array vazio lança Error (sem medições)", () => {
  assert.throws(() => parseSizeLimitResults([]), Error);
});

test("parseSizeLimitResults: aceita size=0 como medição válida", () => {
  const results = [{ name: "empty-entry", size: 0 }];
  assert.equal(parseSizeLimitResults(results), 0);
});

// ---------------------------------------------------------------------------
// measureViaFileStat (fallback de leitura direta de arquivo)
// ---------------------------------------------------------------------------

function makeTmpConfig(dir: string, entries: { name: string; path: string }[]): string {
  const configPath = path.join(dir, ".size-limit.json");
  fs.writeFileSync(configPath, JSON.stringify(entries));
  return configPath;
}

function writeTmpFile(dir: string, name: string, content: string): string {
  const p = path.join(dir, name);
  fs.writeFileSync(p, content);
  return p;
}

test("measureViaFileStat: soma bytes de arquivos existentes", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bundle-size-test-"));
  const content = "hello world!"; // 12 bytes
  writeTmpFile(dir, "entry.mjs", content);
  const configPath = makeTmpConfig(dir, [{ name: "Entry", path: "entry.mjs" }]);

  const { total, entries, allMissing } = measureViaFileStat(configPath, dir);

  assert.equal(total, Buffer.byteLength(content));
  assert.equal(allMissing, false);
  assert.equal(entries.length, 1);
  assert.equal(entries[0]!.size, Buffer.byteLength(content));
});

test("measureViaFileStat: arquivo ausente é registrado com size null sem lançar", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bundle-size-test-"));
  const configPath = makeTmpConfig(dir, [{ name: "Missing", path: "does-not-exist.mjs" }]);

  const { total, entries, allMissing } = measureViaFileStat(configPath, dir);

  assert.equal(total, 0);
  assert.equal(allMissing, true);
  assert.equal(entries[0]!.size, null);
});

test("measureViaFileStat: allMissing=false quando pelo menos um arquivo existe", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bundle-size-test-"));
  writeTmpFile(dir, "present.mjs", "data");
  const configPath = makeTmpConfig(dir, [
    { name: "Present", path: "present.mjs" },
    { name: "Missing", path: "missing.mjs" },
  ]);

  const { allMissing, entries } = measureViaFileStat(configPath, dir);

  assert.equal(allMissing, false);
  assert.equal(entries.filter((e) => e.size !== null).length, 1);
});

test("measureViaFileStat: soma múltiplos arquivos existentes", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bundle-size-test-"));
  const a = "AAA"; // 3 bytes
  const b = "BBBBB"; // 5 bytes
  writeTmpFile(dir, "a.mjs", a);
  writeTmpFile(dir, "b.mjs", b);
  const configPath = makeTmpConfig(dir, [
    { name: "A", path: "a.mjs" },
    { name: "B", path: "b.mjs" },
  ]);

  const { total } = measureViaFileStat(configPath, dir);

  assert.equal(total, Buffer.byteLength(a) + Buffer.byteLength(b));
});

test("measureViaFileStat: config ausente retorna allMissing=true e total=0", () => {
  const { total, entries, allMissing } = measureViaFileStat(
    "/tmp/nonexistent/.size-limit.json",
    "/tmp"
  );
  assert.equal(total, 0);
  assert.equal(allMissing, true);
  assert.deepEqual(entries, []);
});

// ---------------------------------------------------------------------------
// runSizeLimit — comportamento quando o binário não existe
// ---------------------------------------------------------------------------

test("runSizeLimit: lança com code SL_NO_BIN quando binário não existe", () => {
  assert.throws(
    () => runSizeLimit("/tmp", "/nonexistent/path/size-limit"),
    (err: unknown) => {
      assert.ok(err instanceof Error);
      assert.equal((err as NodeJS.ErrnoException & { code?: string }).code, "SL_NO_BIN");
      return true;
    }
  );
});

// ---------------------------------------------------------------------------
// evaluateBundleSizeRatchet — ratchet direction:down (Etapa 2: flip to blocking)
// Regression when measured > baseline; baseline=5601 (gzip via @size-limit/file).
// ---------------------------------------------------------------------------

test("evaluateBundleSizeRatchet: medido == baseline passa (5601 vs 5601)", () => {
  const r = evaluateSize(5601, 5601);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateBundleSizeRatchet: um byte a mais que o baseline é regressão", () => {
  const r = evaluateSize(5602, 5601);
  assert.equal(r.regressed, true, "any size increase must block");
  assert.equal(r.improved, false);
});

test("evaluateBundleSizeRatchet: menor que o baseline é melhoria", () => {
  const r = evaluateSize(5000, 5601);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateBundleSizeRatchet: comparação inteira estrita — qualquer aumento regride", () => {
  assert.equal(evaluateSize(5602, 5601).regressed, true);
  assert.equal(evaluateSize(5601, 5601).regressed, false);
  assert.equal(evaluateSize(5600, 5601).regressed, false);
});

// ---------------------------------------------------------------------------
// readBaselineBundleSizeValue — leitura tolerante do quality-baseline.json
// ---------------------------------------------------------------------------

function withTmpBundleBaseline(content: string | null, fn: (p: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bundle-baseline-"));
  const p = path.join(dir, "quality-baseline.json");
  if (content !== null) fs.writeFileSync(p, content);
  try {
    fn(p);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("readBaselineBundleSizeValue: lê metrics.bundleSize.value", () => {
  withTmpBundleBaseline(JSON.stringify({ metrics: { bundleSize: { value: 5601 } } }), (p) => {
    assert.equal(readSizeBaseline(p), 5601);
  });
});

test("readBaselineBundleSizeValue: arquivo ausente retorna null (SKIP gracioso)", () => {
  assert.equal(readSizeBaseline("/tmp/does-not-exist-77777/quality-baseline.json"), null);
});

test("readBaselineBundleSizeValue: métrica ausente retorna null", () => {
  withTmpBundleBaseline(JSON.stringify({ metrics: {} }), (p) => {
    assert.equal(readSizeBaseline(p), null);
  });
});

test("readBaselineBundleSizeValue: value não-numérico retorna null", () => {
  withTmpBundleBaseline(JSON.stringify({ metrics: { bundleSize: { value: "5601" } } }), (p) => {
    assert.equal(readSizeBaseline(p), null);
  });
});

test("readBaselineBundleSizeValue: JSON inválido retorna null (não lança)", () => {
  withTmpBundleBaseline("not json at all", (p) => {
    assert.equal(readSizeBaseline(p), null);
  });
});
