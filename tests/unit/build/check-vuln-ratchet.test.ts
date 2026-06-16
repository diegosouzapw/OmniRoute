// tests/unit/build/check-vuln-ratchet.test.ts
// TDD unit tests for scripts/check/check-vuln-ratchet.mjs — Task 7.2 osv-scanner.
//
// Strategy: test the two exported pure functions without spawning osv-scanner
// or touching the filesystem. All fixtures are synthetic.
//   - parseOsvJson()      — parses osv-scanner --format json output
//   - extractSeverity()   — extracts severity from a vulnerability entry
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  parseOsvJson,
  extractSeverity,
  evaluateVulnRatchet,
  readBaselineVulnValue,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../../scripts/check/check-vuln-ratchet.mjs";

type RatchetVerdict = { regressed: boolean; improved: boolean };
const evaluate = evaluateVulnRatchet as (current: number, baseline: number) => RatchetVerdict;
const readBaseline = readBaselineVulnValue as (p?: string) => number | null;

const SCRIPT_PATH = fileURLToPath(
  new URL("../../../scripts/check/check-vuln-ratchet.mjs", import.meta.url)
);

// ---------------------------------------------------------------------------
// Fixtures — JSON sintético com formato do osv-scanner --format json
// ---------------------------------------------------------------------------

/** Resultado vazio (nenhuma vulnerabilidade encontrada). */
function makeEmptyResult() {
  return { results: [] };
}

/** Um pacote com 1 vulnerabilidade, sem groups. */
function makeResultOnePkg(vulnCount: number) {
  const vulnerabilities = Array.from({ length: vulnCount }, (_, i) => ({
    id: `GHSA-fake-${i + 1}`,
    aliases: [],
    affected: [],
  }));
  return {
    results: [
      {
        packages: [
          {
            package: { name: "lodash", version: "4.17.0", ecosystem: "npm" },
            vulnerabilities,
          },
        ],
      },
    ],
  };
}

/** Dois pacotes em dois resultados, sem groups. */
function makeResultTwoPkgs() {
  return {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-a", version: "1.0.0", ecosystem: "npm" },
            vulnerabilities: [
              { id: "GHSA-aaa-1", aliases: [], affected: [] },
              { id: "GHSA-aaa-2", aliases: [], affected: [] },
            ],
          },
        ],
      },
      {
        packages: [
          {
            package: { name: "pkg-b", version: "2.0.0", ecosystem: "npm" },
            vulnerabilities: [
              { id: "GHSA-bbb-1", aliases: [], affected: [] },
            ],
          },
        ],
      },
    ],
  };
}

/** Pacote com groups para deduplicação. */
function makeResultWithGroups() {
  return {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-c", version: "3.0.0", ecosystem: "npm" },
            // 3 vulnerabilidades mas apenas 2 grupos (1 foi deduplicado)
            vulnerabilities: [
              { id: "GHSA-ccc-1", aliases: [], affected: [] },
              { id: "GHSA-ccc-2", aliases: [], affected: [] },
              { id: "GHSA-ccc-3", aliases: [], affected: [] },
            ],
            groups: [
              { ids: ["GHSA-ccc-1"] },
              { ids: ["GHSA-ccc-2", "GHSA-ccc-3"] }, // grupo deduplicado
            ],
          },
        ],
      },
    ],
  };
}

/** Pacote com severidade em database_specific.severity. */
function makeResultWithDbSeverity() {
  return {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-sev", version: "1.0.0", ecosystem: "npm" },
            vulnerabilities: [
              {
                id: "GHSA-sev-1",
                database_specific: { severity: "HIGH" },
                aliases: [],
                affected: [],
              },
              {
                id: "GHSA-sev-2",
                database_specific: { severity: "CRITICAL" },
                aliases: [],
                affected: [],
              },
              {
                id: "GHSA-sev-3",
                database_specific: { severity: "low" }, // lowercase
                aliases: [],
                affected: [],
              },
            ],
          },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// parseOsvJson — input inválido
// ---------------------------------------------------------------------------

test("parseOsvJson: null retorna vulnCount=0", () => {
  const result = parseOsvJson(null);
  assert.equal(result.vulnCount, 0);
  assert.deepEqual(result.bySeverity, {});
});

test("parseOsvJson: undefined retorna vulnCount=0", () => {
  const result = parseOsvJson(undefined as unknown as null);
  assert.equal(result.vulnCount, 0);
});

test("parseOsvJson: objeto sem results retorna vulnCount=0", () => {
  const result = parseOsvJson({ other: [] } as unknown as { results: never[] });
  assert.equal(result.vulnCount, 0);
});

test("parseOsvJson: results não-array retorna vulnCount=0", () => {
  const result = parseOsvJson({ results: "invalid" } as unknown as { results: never[] });
  assert.equal(result.vulnCount, 0);
});

// ---------------------------------------------------------------------------
// parseOsvJson — resultado vazio
// ---------------------------------------------------------------------------

test("parseOsvJson: results vazio retorna vulnCount=0", () => {
  const result = parseOsvJson(makeEmptyResult());
  assert.equal(result.vulnCount, 0);
  assert.deepEqual(result.bySeverity, {});
});

test("parseOsvJson: result sem packages retorna vulnCount=0", () => {
  const result = parseOsvJson({ results: [{ other: "data" }] } as unknown as { results: { packages: never[] }[] });
  assert.equal(result.vulnCount, 0);
});

// ---------------------------------------------------------------------------
// parseOsvJson — contagem básica
// ---------------------------------------------------------------------------

test("parseOsvJson: 1 pacote com 1 vuln retorna vulnCount=1", () => {
  const result = parseOsvJson(makeResultOnePkg(1));
  assert.equal(result.vulnCount, 1);
});

test("parseOsvJson: 1 pacote com 3 vulns retorna vulnCount=3", () => {
  const result = parseOsvJson(makeResultOnePkg(3));
  assert.equal(result.vulnCount, 3);
});

test("parseOsvJson: 2 pacotes em 2 results retorna vulnCount=3 (2+1)", () => {
  const result = parseOsvJson(makeResultTwoPkgs());
  assert.equal(result.vulnCount, 3);
});

// ---------------------------------------------------------------------------
// parseOsvJson — deduplicação via groups
// ---------------------------------------------------------------------------

test("parseOsvJson: usa groups.length quando groups tem menos entradas que vulnerabilities", () => {
  // 3 vulns, 2 grupos => vulnCount=2 (deduplicado)
  const result = parseOsvJson(makeResultWithGroups());
  assert.equal(result.vulnCount, 2);
});

test("parseOsvJson: usa vulnerabilities.length quando groups está ausente", () => {
  // Sem groups => conta vulnerabilities diretamente
  const result = parseOsvJson(makeResultOnePkg(5));
  assert.equal(result.vulnCount, 5);
});

test("parseOsvJson: groups vazio não causa deduplicação (usa vulnerabilities)", () => {
  const json = {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-d", version: "1.0.0", ecosystem: "npm" },
            vulnerabilities: [
              { id: "GHSA-d-1", aliases: [], affected: [] },
              { id: "GHSA-d-2", aliases: [], affected: [] },
            ],
            groups: [], // vazio — não deve deduplicar
          },
        ],
      },
    ],
  };
  const result = parseOsvJson(json);
  assert.equal(result.vulnCount, 2);
});

// ---------------------------------------------------------------------------
// parseOsvJson — severidade
// ---------------------------------------------------------------------------

test("parseOsvJson: coleta severidade de database_specific.severity", () => {
  const result = parseOsvJson(makeResultWithDbSeverity());
  assert.equal(result.vulnCount, 3);
  assert.ok("HIGH" in result.bySeverity, "deve ter HIGH");
  assert.ok("CRITICAL" in result.bySeverity, "deve ter CRITICAL");
  assert.ok("LOW" in result.bySeverity, "deve ter LOW (normalizado para uppercase)");
});

test("parseOsvJson: vuln sem severidade conta como UNKNOWN", () => {
  const json = makeResultOnePkg(1);
  // Vuln sem database_specific.severity e sem severity array
  const result = parseOsvJson(json);
  assert.ok("UNKNOWN" in result.bySeverity, "vuln sem severidade deve ser UNKNOWN");
});

// ---------------------------------------------------------------------------
// extractSeverity
// ---------------------------------------------------------------------------

test("extractSeverity: null retorna UNKNOWN", () => {
  assert.equal(extractSeverity(null), "UNKNOWN");
});

test("extractSeverity: objeto vazio retorna UNKNOWN", () => {
  assert.equal(extractSeverity({}), "UNKNOWN");
});

test("extractSeverity: usa database_specific.severity quando presente", () => {
  const vuln = { database_specific: { severity: "HIGH" } };
  assert.equal(extractSeverity(vuln), "HIGH");
});

test("extractSeverity: normaliza database_specific.severity para uppercase", () => {
  const vuln = { database_specific: { severity: "critical" } };
  assert.equal(extractSeverity(vuln), "CRITICAL");
});

test("extractSeverity: usa severity[0].type quando database_specific ausente", () => {
  const vuln = { severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L" }] };
  assert.equal(extractSeverity(vuln), "CVSS_V3");
});

test("extractSeverity: database_specific.severity tem precedência sobre severity[]", () => {
  const vuln = {
    database_specific: { severity: "HIGH" },
    severity: [{ type: "CVSS_V2", score: "AV:N/AC:L/Au:N/C:P/I:P/A:P" }],
  };
  assert.equal(extractSeverity(vuln), "HIGH");
});

test("extractSeverity: severity array vazio retorna UNKNOWN", () => {
  const vuln = { severity: [] };
  assert.equal(extractSeverity(vuln), "UNKNOWN");
});

test("extractSeverity: severity[0] sem type retorna UNKNOWN", () => {
  const vuln = { severity: [{ score: "AV:N/AC:L" }] };
  assert.equal(extractSeverity(vuln), "UNKNOWN");
});

test("extractSeverity: database_specific.severity vazia retorna UNKNOWN", () => {
  const vuln = { database_specific: { severity: "" } };
  assert.equal(extractSeverity(vuln), "UNKNOWN");
});

// ---------------------------------------------------------------------------
// evaluateVulnRatchet — ratchet direction:down (cycle-end: flip to blocking)
// Regression when measured > baseline; baseline=10 → 11+ blocks, 10 passes.
// ---------------------------------------------------------------------------

test("evaluateVulnRatchet: medida == baseline passa (10 vs 10)", () => {
  const r = evaluate(10, 10);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateVulnRatchet: uma a mais que o baseline é regressão (11 vs 10)", () => {
  const r = evaluate(11, 10);
  assert.equal(r.regressed, true, "a single new vulnerability must block");
  assert.equal(r.improved, false);
});

test("evaluateVulnRatchet: menos que o baseline é melhoria", () => {
  const r = evaluate(5, 10);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateVulnRatchet: zero contra baseline não-zero é melhoria máxima", () => {
  const r = evaluate(0, 13);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateVulnRatchet: comparação inteira estrita — qualquer aumento regride", () => {
  assert.equal(evaluate(11, 10).regressed, true);
  assert.equal(evaluate(10, 10).regressed, false);
  assert.equal(evaluate(9, 10).regressed, false);
});

// ---------------------------------------------------------------------------
// readBaselineVulnValue — leitura tolerante do quality-baseline.json
// ---------------------------------------------------------------------------

function withTmpBaseline(content: string | null, fn: (p: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vuln-baseline-"));
  const p = path.join(dir, "quality-baseline.json");
  if (content !== null) fs.writeFileSync(p, content);
  try {
    fn(p);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("readBaselineVulnValue: lê metrics.vulnCount.value", () => {
  withTmpBaseline(JSON.stringify({ metrics: { vulnCount: { value: 10 } } }), (p) => {
    assert.equal(readBaseline(p), 10);
  });
});

test("readBaselineVulnValue: arquivo ausente retorna null (SKIP gracioso)", () => {
  assert.equal(readBaseline("/tmp/does-not-exist-99999/quality-baseline.json"), null);
});

test("readBaselineVulnValue: métrica ausente retorna null", () => {
  withTmpBaseline(JSON.stringify({ metrics: {} }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineVulnValue: value não-numérico retorna null", () => {
  withTmpBaseline(JSON.stringify({ metrics: { vulnCount: { value: "10" } } }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineVulnValue: JSON inválido retorna null (não lança)", () => {
  withTmpBaseline("{ not valid json", (p) => {
    assert.equal(readBaseline(p), null);
  });
});

// ---------------------------------------------------------------------------
// --ratchet end-to-end: binary-absent SKIP exits 0 (a missing measurement never
// blocks). Runs the script with an empty PATH so osv-scanner is unresolvable.
// ---------------------------------------------------------------------------

test("--ratchet com osv-scanner ausente (PATH vazio) faz SKIP e sai 0", () => {
  const res = spawnSync(process.execPath, [SCRIPT_PATH, "--ratchet", "--quiet"], {
    encoding: "utf8",
    // Empty PATH → `which`/`osv-scanner` unresolvable → findOsvScanner() returns null.
    env: { ...process.env, PATH: "/nonexistent-bin-dir" },
    timeout: 30_000,
  });
  assert.equal(res.status, 0, "binary-absent SKIP must exit 0 even with --ratchet");
  assert.match(res.stdout, /vulnCount=SKIP reason=binary-absent/);
});
