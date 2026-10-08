import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Ajv from "ajv";

const schema = JSON.parse(
  readFileSync(
    new URL("../../config/quality/release-acceptance.schema.json", import.meta.url),
    "utf8"
  )
);

function compile() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  return ajv.compile(schema);
}

test("version 1 requires cause when status is classified by a prerequisite", () => {
  const validate = compile();
  const missingCause = JSON.parse(
    readFileSync(
      new URL("../fixtures/release-acceptance/failed-pack-boot.json", import.meta.url),
      "utf8"
    )
  );
  delete missingCause.gates[1].cause;
  assert.equal(validate(missingCause), false);
});

test("unknown top-level gate field is invalid in version 1", () => {
  const validate = compile();
  const extra = JSON.parse(
    readFileSync(
      new URL("../fixtures/release-acceptance/verified.json", import.meta.url),
      "utf8"
    )
  );
  extra.gates[0].unexpected = true;
  assert.equal(validate(extra), false);
});

test("evidence member rejects parent traversal", () => {
  const validate = compile();
  const report = JSON.parse(
    readFileSync(new URL("../fixtures/release-acceptance/verified.json", import.meta.url), "utf8")
  );
  report.gates[0].evidence[0].member = "foo/../../etc/passwd";
  assert.equal(validate(report), false);
  report.gates[0].evidence[0].member = "..";
  assert.equal(validate(report), false);
  report.gates[0].evidence[0].member = "foo/..";
  assert.equal(validate(report), false);
  report.gates[0].evidence[0].member = String.raw`foo\..\x`;
  assert.equal(validate(report), false);
});

test("empty required_gates cannot be VERIFIED", () => {
  const validate = compile();
  const report = JSON.parse(
    readFileSync(new URL("../fixtures/release-acceptance/verified.json", import.meta.url), "utf8")
  );
  report.required_gates = [];
  report.gates = [];
  report.evidence_errors = [];
  report.verdict = "VERIFIED";
  assert.equal(validate(report), false);
});

test("empty required_gates is valid when UNVERIFIED", () => {
  const validate = compile();
  const report = JSON.parse(
    readFileSync(new URL("../fixtures/release-acceptance/verified.json", import.meta.url), "utf8")
  );
  report.required_gates = [];
  report.gates = [];
  report.evidence_errors = [
    {
      code: "empty_required_set",
      gate: { gate_id: "schema", suite_id: null, shard_index: null, shard_total: null },
      detail: "required_gates is empty",
    },
  ];
  report.verdict = "UNVERIFIED";
  assert.equal(validate(report), true, JSON.stringify(validate.errors));
});

test("unknown extensions field is invalid in version 1", () => {
  const validate = compile();
  const extra = JSON.parse(
    readFileSync(
      new URL("../fixtures/release-acceptance/verified.json", import.meta.url),
      "utf8"
    )
  );
  extra.gates[0].extensions = { unexpected: true };
  assert.equal(validate(extra), false);
});

test("known-answer fixtures validate", () => {
  const validate = compile();
  for (const name of [
    "verified.json",
    "failed-pack-boot.json",
    "unverified-required-skipped.json",
    "infra-pack-boot.json",
  ]) {
    const report = JSON.parse(
      readFileSync(new URL(`../fixtures/release-acceptance/${name}`, import.meta.url), "utf8")
    );
    assert.equal(validate(report), true, `${name}: ${JSON.stringify(validate.errors)}`);
  }
});
