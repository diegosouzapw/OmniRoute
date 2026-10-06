import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const validator = path.resolve(here, "../../scripts/docs/validate-svg.mjs");

test("SVG validator ignores Mermaid data-id attributes when checking duplicate IDs", () => {
  const fixtureDir = mkdtempSync(path.join(tmpdir(), "omniroute-svg-validator-"));
  const fixture = path.join(fixtureDir, "mermaid.svg");
  writeFileSync(
    fixture,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" role="img" aria-label="Fixture">' +
      "<desc>Fixture diagram.</desc>" +
      '<path id="edge-a" data-id="edge-a" d="M0 0L10 10"/>' +
      '<g data-id="edge-a"><path d="M0 10L10 0"/></g>' +
      "</svg>"
  );

  try {
    const result = spawnSync(process.execPath, [validator, fixture], { encoding: "utf8" });
    assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
    assert.match(result.stdout, /PASS/);
    assert.doesNotMatch(`${result.stdout}${result.stderr}`, /WARN/);
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("SVG validator rejects duplicate XML id attributes", () => {
  const fixtureDir = mkdtempSync(path.join(tmpdir(), "omniroute-svg-validator-"));
  const fixture = path.join(fixtureDir, "duplicate.svg");
  writeFileSync(
    fixture,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">' +
      '<path id="edge-a" d="M0 0L10 10"/><path id="edge-a" d="M0 10L10 0"/>' +
      "</svg>"
  );

  try {
    const result = spawnSync(process.execPath, [validator, fixture], { encoding: "utf8" });
    assert.equal(result.status, 1, `${result.stdout}${result.stderr}`);
    assert.match(result.stderr, /duplicate IDs: edge-a/);
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("SVG validator adds explicit accessible naming when requested for a generated diagram", () => {
  const fixtureDir = mkdtempSync(path.join(tmpdir(), "omniroute-svg-validator-"));
  const fixture = path.join(fixtureDir, "auto-combo.svg");
  writeFileSync(
    fixture,
    '<svg id="diagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" ' +
      'role="graphics-document document"><rect width="10" height="10"/></svg>'
  );

  try {
    const result = spawnSync(
      process.execPath,
      [
        validator,
        "--fix-a11y",
        "--title",
        "Auto-Combo scoring",
        "--description",
        "How OmniRoute scores eligible routing targets with 15 factors.",
        fixture,
      ],
      { encoding: "utf8" }
    );
    assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);

    const repeated = spawnSync(
      process.execPath,
      [
        validator,
        "--fix-a11y",
        "--title",
        "Auto-Combo scoring",
        "--description",
        "How OmniRoute scores eligible routing targets with 15 factors.",
        fixture,
      ],
      { encoding: "utf8" }
    );
    assert.equal(repeated.status, 0, `${repeated.stdout}${repeated.stderr}`);

    const updated = readFileSync(fixture, "utf8");
    assert.match(updated, /role="img"/);
    assert.match(updated, /aria-labelledby="auto-combo-title auto-combo-desc"/);
    assert.match(updated, /<title id="auto-combo-title">Auto-Combo scoring<\/title>/);
    assert.match(
      updated,
      /<desc id="auto-combo-desc">How OmniRoute scores eligible routing targets with 15 factors\.<\/desc>/
    );
    assert.equal([...updated.matchAll(/id="auto-combo-title"/g)].length, 1);
    assert.equal([...updated.matchAll(/id="auto-combo-desc"/g)].length, 1);
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
