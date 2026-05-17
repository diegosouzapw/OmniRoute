import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { validateBinaryMagic, platformBinaryLabel } from "../../../bin/cli/runtime/magicBytes.mjs";

const dir = mkdtempSync(join(tmpdir(), "magic-test-"));

test("detects ELF", () => {
  const p = join(dir, "fake.so");
  writeFileSync(p, Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0, 0, 0, 0]));
  assert.equal(validateBinaryMagic(p), "elf");
});

test("detects Mach-O 64-bit BE", () => {
  const p = join(dir, "fake.dylib");
  writeFileSync(p, Buffer.from([0xfe, 0xed, 0xfa, 0xcf, 0, 0, 0, 0]));
  assert.equal(validateBinaryMagic(p), "macho");
});

test("detects Mach-O LE", () => {
  const p = join(dir, "fake-le.dylib");
  writeFileSync(p, Buffer.from([0xcf, 0xfa, 0xed, 0xfe, 0, 0, 0, 0]));
  assert.equal(validateBinaryMagic(p), "macho-le");
});

test("detects Mach-O fat binary", () => {
  const p = join(dir, "fake.fat");
  writeFileSync(p, Buffer.from([0xca, 0xfe, 0xba, 0xbe, 0, 0, 0, 0]));
  assert.equal(validateBinaryMagic(p), "macho-fat");
});

test("detects PE (MZ)", () => {
  const p = join(dir, "fake.node");
  writeFileSync(p, Buffer.from([0x4d, 0x5a, 0, 0, 0, 0, 0, 0]));
  assert.equal(validateBinaryMagic(p), "pe");
});

test("returns null for non-binary", () => {
  const p = join(dir, "fake.txt");
  writeFileSync(p, "hello world", "utf-8");
  assert.equal(validateBinaryMagic(p), null);
});

test("returns null for missing file", () => {
  assert.equal(validateBinaryMagic(join(dir, "nope.bin")), null);
});

test("returns null for too-short file", () => {
  const p = join(dir, "short.bin");
  writeFileSync(p, Buffer.from([0x7f, 0x45]));
  assert.equal(validateBinaryMagic(p), null);
});

test("platformBinaryLabel matches process.platform", () => {
  const expected =
    process.platform === "win32" ? "pe" : process.platform === "darwin" ? "macho" : "elf";
  assert.equal(platformBinaryLabel(), expected);
});

test.after(() => rmSync(dir, { recursive: true, force: true }));
