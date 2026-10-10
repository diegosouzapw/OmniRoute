import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";

const workflow = load(
  readFileSync(new URL("../../.github/workflows/npm-publish.yml", import.meta.url), "utf8")
);
const producer = workflow.jobs.publish;
const consumer = workflow.jobs["stage-npm"];
const packIndex = producer.steps.findIndex((step) =>
  step.run?.includes("npm pack --ignore-scripts")
);
const bootIndex = producer.steps.findIndex((step) => step.run?.includes("npm run check:pack-boot"));

test("publication packs once before boot and transfers its independent digest", () => {
  assert.ok(
    packIndex >= 0 && packIndex < bootIndex,
    "the uploaded pack must exist before boot validation"
  );
  assert.equal(
    producer.steps.filter((step) => step.run?.includes("npm pack --ignore-scripts")).length,
    1
  );
  assert.equal(producer.outputs.tarball_sha256, "${{ steps.npm_tarball.outputs.sha256 }}");
  const pack = producer.steps[packIndex];
  assert.equal(pack.id, "npm_tarball");
  assert.match(pack.run, /sha256sum/);
  assert.match(pack.run, /GITHUB_OUTPUT/);
});

test("boot validates the existing tarball and digest instead of silently repacking", () => {
  const boot = producer.steps[bootIndex];
  assert.match(boot.run, /--tarball "\$TARBALL" --sha256 "\$EXPECTED_SHA"/);
  assert.equal(boot.env.EXPECTED_SHA, "${{ steps.npm_tarball.outputs.sha256 }}");
});

test("producer checks that validated bytes have not changed before upload", () => {
  const uploadIndex = producer.steps.findIndex((step) => step.with?.name === "npm-tarball");
  const checkIndex = producer.steps.findIndex(
    (step) => step.name === "Verify validated tarball before upload"
  );
  assert.ok(checkIndex > bootIndex && checkIndex < uploadIndex);
  const check = producer.steps[checkIndex];
  assert.equal(check.env.EXPECTED_SHA, "${{ steps.npm_tarball.outputs.sha256 }}");
  assert.match(check.run, /sha256sum --check --strict/);
});

const modes = consumer.steps.filter((step) => step.name?.startsWith("Publish to npm ("));
assert.equal(modes.length, 3);

for (const step of modes) {
  for (const scenario of [
    "approved",
    "changed",
    "missing-digest",
    "malformed-digest",
    "missing-file",
    "symlink",
  ]) {
    test(`${step.name}: ${scenario} bytes ${scenario === "approved" ? "reach npm unchanged" : "fail before npm"}`, (t) => {
      const directory = mkdtempSync(join(tmpdir(), "omni-publish-bytes-"));
      t.after(() => rmSync(directory, { recursive: true, force: true }));
      const original = "bytes approved by the producer";
      const digest = createHash("sha256").update(original).digest("hex");
      const tarball = join(directory, "omniroute-1.2.3.tgz");
      if (scenario === "symlink") {
        writeFileSync(join(directory, "other.tgz"), original);
        symlinkSync(join(directory, "other.tgz"), tarball);
      } else if (scenario !== "missing-file") {
        writeFileSync(tarball, scenario === "changed" ? "different bytes" : original);
      }
      const calls = join(directory, "npm-calls.json");
      // Execute the actual workflow shell. The sole external side effect (npm)
      // is intercepted; this is not a registry or product boot acceptance test.
      writeFileSync(
        join(directory, "npm"),
        `#!/usr/bin/env node
import fs from 'node:fs';
fs.writeFileSync(process.env.PUBLISH_CALLS, JSON.stringify(process.argv.slice(2)));
`,
        { mode: 0o755 }
      );
      const child = spawnSync("bash", ["-c", step.run], {
        cwd: directory,
        encoding: "utf8",
        timeout: 10000,
        env: {
          ...process.env,
          PATH: `${directory}:${process.env.PATH}`,
          VERSION: "1.2.3",
          TAG: "next",
          EXPECTED_SHA:
            scenario === "missing-digest"
              ? ""
              : scenario === "malformed-digest"
                ? "not-a-digest"
                : digest,
          PUBLISH_CALLS: calls,
          GITHUB_STEP_SUMMARY: join(directory, "summary.md"),
        },
      });
      assert.equal(child.error, undefined, child.error?.message);
      if (scenario !== "approved") {
        assert.notEqual(child.status, 0, child.stdout + child.stderr);
        assert.throws(() => readFileSync(calls), { code: "ENOENT" });
      } else {
        assert.equal(child.status, 0, child.stdout + child.stderr);
        assert.equal(step.env.EXPECTED_SHA, "${{ needs.publish.outputs.tarball_sha256 }}");
        const args = JSON.parse(readFileSync(calls, "utf8"));
        assert.ok(args.includes("omniroute-1.2.3.tgz"));
        assert.ok(args.includes("--ignore-scripts"));
        assert.ok(args.includes("--provenance"));
      }
    });
  }
}
