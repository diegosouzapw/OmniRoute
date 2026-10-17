#!/usr/bin/env node
/** Explicit opt-in: prepare an isolated ZCode worker; never edit the installed source. */
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const SUPPORTED_ZCODE_SHA256 =
  "fad4c35c4c36ec210d8a06d3fa0e77de23c8545e2eb6ff90aea1eb38d1e6275f";
const sha256 = (text) => createHash("sha256").update(text).digest("hex");

export function patchZcodeImageProtocol(source) {
  const before =
    'm.object({role:m.literal("user"),content:m.string()}).strict(),m.object({role:m.literal("assistant"),content:m.string(),toolCalls:';
  const content =
    'm.union([m.string(),m.array(m.discriminatedUnion("type",[m.object({type:m.literal("text"),text:m.string()}).strict(),m.object({type:m.literal("image"),dataUrl:m.string().startsWith("data:image/"),mediaType:m.enum(["image/png","image/jpeg","image/webp","image/gif"])}).strict()])).min(1)])';
  if (source.split(before).length !== 2)
    throw new Error("Unsupported ZCode protocol: expected exactly one user-message schema");
  return source.replace(before, before.replace("content:m.string()", `content:${content}`));
}

export function prepareZcodeImageRuntime(sourceFile, outputDirectory) {
  const sourcePath = resolve(sourceFile);
  const outputPath = resolve(outputDirectory);
  if (outputPath === dirname(sourcePath) || outputPath.startsWith(dirname(sourcePath) + "/"))
    throw new Error("Output must be isolated from the installed ZCode runtime");
  const original = readFileSync(sourcePath, "utf8");
  if (sha256(original) !== SUPPORTED_ZCODE_SHA256)
    throw new Error("Unsupported ZCode build: review the protocol patch before updating");
  const patched = patchZcodeImageProtocol(original);
  const target = join(outputPath, "zcode.cjs");
  if (existsSync(outputPath)) {
    if (!existsSync(target) || sha256(readFileSync(target)) !== sha256(patched))
      throw new Error("Output already exists with different contents");
  } else {
    mkdirSync(dirname(outputPath), { recursive: true, mode: 0o700 });
    cpSync(dirname(sourcePath), outputPath, { recursive: true, dereference: false });
    writeFileSync(target, patched, { mode: 0o600 });
  }
  const receipt = {
    sourceSha256: sha256(original),
    patchedSha256: sha256(patched),
    entry: target,
    patch: "user-text-and-image-v1",
  };
  writeFileSync(
    join(outputPath, "omniroute-image-patch.json"),
    JSON.stringify(receipt, null, 2) + "\n",
    { mode: 0o600 }
  );
  return receipt;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length !== 4)
    throw new Error(
      "Usage: node scripts/ops/zcode-image-runtime.mjs <installed-zcode.cjs> <isolated-output-directory>"
    );
  console.log(JSON.stringify(prepareZcodeImageRuntime(process.argv[2], process.argv[3])));
}
