import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("../../scripts/check/check-pack-boot.mjs", import.meta.url));

function fixture(t, { name = "omniroute" } = {}) {
  const root = mkdtempSync(join(tmpdir(), "omni-existing-tarball-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, "package.json"), JSON.stringify({ name, version: "1.2.3" }));
  const packed = JSON.parse(
    execFileSync("npm", ["pack", "--json", "--ignore-scripts"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
  );
  const tarball = join(root, packed[0].filename);
  const sha256 = createHash("sha256").update(readFileSync(tarball)).digest("hex");
  const commands = join(root, "npm-commands.jsonl");
  const bin = join(root, "bin");
  mkdirSync(bin);
  // Stop deliberately at the install boundary: these are selection/digest CLI
  // controls, not a claim that the real product tarball booted successfully.
  writeFileSync(
    join(bin, "npm"),
    `#!${process.execPath}
const fs = require('node:fs'); const crypto = require('node:crypto');
const args = process.argv.slice(2);
const input = args.at(-1);
fs.writeFileSync(process.env.TEST_ORIGINAL_TARBALL, 'replaced after validation');
fs.appendFileSync(process.env.TEST_NPM_COMMANDS, JSON.stringify({args,
  sha256: fs.existsSync(input) ? crypto.createHash('sha256').update(fs.readFileSync(input)).digest('hex') : null}) + '\\n');
process.exit(42);
`
  );
  chmodSync(join(bin, "npm"), 0o700);
  const run = (args) =>
    spawnSync(process.execPath, [script, ...args], {
      cwd: root,
      encoding: "utf8",
      timeout: 20000,
      env: {
        ...process.env,
        PATH: `${bin}:${process.env.PATH}`,
        TEST_NPM_COMMANDS: commands,
        TEST_ORIGINAL_TARBALL: tarball,
      },
    });
  return { root, tarball, sha256, commands, run };
}

test("the public CLI installs the supplied verified bytes without requiring dist or repacking", (t) => {
  const input = fixture(t);
  const child = input.run(["--tarball", input.tarball, "--sha256", input.sha256]);
  assert.equal(child.error, undefined, child.error?.message);
  assert.equal(child.status, 1, "the deliberately failed install must fail the gate");
  const commands = readFileSync(input.commands, "utf8").trim().split("\n").map(JSON.parse);
  assert.equal(commands.length, 1, "only install is allowed, never a second npm pack");
  assert.deepEqual(commands[0].args.slice(0, 3), ["install", "-g", "--prefix"]);
  assert.equal(commands[0].sha256, input.sha256);
  assert.notEqual(commands[0].args.at(-1), input.tarball, "install must use an isolated snapshot");
  assert.equal(readFileSync(input.tarball, "utf8"), "replaced after validation");
  assert.match(child.stdout + child.stderr, new RegExp(input.sha256));
});

test("the public CLI rejects a mismatched digest before any install or pack", (t) => {
  const input = fixture(t);
  const child = input.run(["--tarball", input.tarball, "--sha256", "0".repeat(64)]);
  assert.equal(child.status, 1, child.stdout + child.stderr);
  assert.match(child.stderr, /SHA-256 mismatch/);
  assert.equal(existsSync(input.commands), false);
});

test("unknown, repeated, incomplete and malformed flags fail closed before npm", (t) => {
  const input = fixture(t);
  for (const args of [
    ["--tarball", input.tarball],
    ["--sha256", input.sha256],
    ["--tarball"],
    ["--unknown", "anything"],
    ["--tarball", input.tarball, "--sha256", "not-a-digest"],
    ["--tarball", input.tarball, "--tarball", input.tarball, "--sha256", input.sha256],
    ["--tarball", input.tarball, "--sha256", input.sha256, "--sha256", input.sha256],
  ]) {
    const child = input.run(args);
    assert.equal(child.status, 1, child.stdout + child.stderr);
    assert.equal(existsSync(input.commands), false);
  }
});

test("missing, directory, symlink and corrupt tarball inputs cannot reach install", (t) => {
  const input = fixture(t);
  const symlink = join(input.root, "symlink.tgz");
  symlinkSync(input.tarball, symlink);
  const corrupt = join(input.root, "corrupt.tgz");
  writeFileSync(corrupt, "not a tarball");
  const corruptHash = createHash("sha256").update(readFileSync(corrupt)).digest("hex");
  for (const [filename, sha256] of [
    [join(input.root, "missing.tgz"), input.sha256],
    [input.root, input.sha256],
    [symlink, input.sha256],
    [corrupt, corruptHash],
  ]) {
    const child = input.run(["--tarball", filename, "--sha256", sha256]);
    assert.equal(child.status, 1, child.stdout + child.stderr);
    assert.equal(existsSync(input.commands), false);
  }
});

test("the supplied archive version must match the candidate package version", (t) => {
  const input = fixture(t);
  writeFileSync(
    join(input.root, "package.json"),
    JSON.stringify({ name: "omniroute", version: "9.9.9" })
  );
  const child = input.run(["--tarball", input.tarball, "--sha256", input.sha256]);
  assert.equal(child.status, 1, child.stdout + child.stderr);
  assert.match(child.stderr, /identity\/version mismatch/);
  assert.equal(existsSync(input.commands), false);
});

test("a different package name cannot substitute for OmniRoute even with a matching version and digest", (t) => {
  const input = fixture(t, { name: "not-omniroute" });
  const child = input.run(["--tarball", input.tarball, "--sha256", input.sha256]);
  assert.equal(child.status, 1, child.stdout + child.stderr);
  assert.match(child.stderr, /identity\/version mismatch/);
  assert.equal(existsSync(input.commands), false);
});

test("the default CLI still requires a built tree rather than silently skipping the gate", (t) => {
  const input = fixture(t);
  const child = input.run([]);
  assert.equal(child.status, 2, child.stdout + child.stderr);
  assert.match(child.stderr, /dist\/server\.js missing/);
  assert.equal(existsSync(input.commands), false);
});
