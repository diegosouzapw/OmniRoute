#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const candidates = [
  path.join(cwd, 'coverage', 'coverage-summary.json'),
  path.join(cwd, 'coverage', 'coverage-final.json'),
];

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    return null;
  }
}

function computeFromDetailed(data) {
  const sums = {
    statements: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
    functions: { covered: 0, total: 0 },
    lines: { covered: 0, total: 0 },
  };

  for (const file of Object.values(data)) {
    const totals = file.total || file;
    if (totals && typeof totals === 'object') {
      for (const key of ['statements', 'branches', 'functions', 'lines']) {
        const item = totals[key] || (file[key] && (file[key].total != null ? file[key] : null));
        if (item) {
          const covered = item.covered ?? item.coveredLines ?? 0;
          const total = item.total ?? item.totalLines ?? 0;
          sums[key].covered += covered;
          sums[key].total += total;
        }
      }
    }
  }

  const pct = {};
  for (const k of ['statements', 'branches', 'functions', 'lines']) {
    pct[k] = sums[k].total ? (sums[k].covered / sums[k].total) * 100 : 100;
  }
  return pct;
}

let data = null;
let foundPath = null;
for (const p of candidates) {
  if (fs.existsSync(p)) {
    data = readJson(p);
    foundPath = p;
    break;
  }
}

if (!data) {
  console.error('No coverage file found at coverage/coverage-summary.json or coverage/coverage-final.json');
  process.exit(2);
}

let pct = null;
if (data.total && data.total.statements && typeof data.total.statements.pct === 'number') {
  pct = {
    statements: data.total.statements.pct,
    branches: data.total.branches.pct,
    functions: data.total.functions.pct,
    lines: data.total.lines.pct,
  };
} else if (data.total && data.total.statements && data.total.statements.total != null) {
  pct = {
    statements: (data.total.statements.covered / data.total.statements.total) * 100,
    branches: (data.total.branches.covered / data.total.branches.total) * 100,
    functions: (data.total.functions.covered / data.total.functions.total) * 100,
    lines: (data.total.lines.covered / data.total.lines.total) * 100,
  };
} else {
  pct = computeFromDetailed(data);
}

const thresholds = { statements: 75, branches: 70, functions: 75, lines: 75 };
let ok = true;
console.log(`Coverage file used: ${foundPath}`);
for (const key of Object.keys(thresholds)) {
  const actual = Math.round((pct[key] ?? 0) * 100) / 100;
  const need = thresholds[key];
  const pass = (actual >= need);
  console.log(`${key.padEnd(10)}: ${String(actual).padStart(6)}%  (minimum: ${need}%)  ${pass ? 'PASS' : 'FAIL'}`);
  if (!pass) ok = false;
}

if (!ok) {
  console.error('Coverage thresholds not met.');
  process.exit(1);
}
console.log('Coverage thresholds met.');
process.exit(0);
