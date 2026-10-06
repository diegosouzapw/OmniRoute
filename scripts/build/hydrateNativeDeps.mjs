#!/usr/bin/env node
/**
 * Platform hydration for the shared Next standalone web build (issue #10321,
 * Stage 8).
 *
 * The standalone bundle is built ONCE on ubuntu and restored on every desktop
 * matrix leg. Everything except install-machine-forked optional packages is
 * platform-independent:
 *
 *  - Bundled-for-all (verify only): better-sqlite3 v13 ships Node-API prebuilds
 *    for 8 platforms, and onnxruntime-node ships `bin/napi-v6/<os>/<arch>`.
 *  - Install-machine-forked (hydrate): `@img/sharp-*`, `@img/sharp-libvips-*`,
 *    `@ngrok/ngrok-*`, `@wreq-js/binding-*`, and macOS-only `fsevents` resolve
 *    to whichever platform ran `npm ci`. The ubuntu-built tree carries the
 *    linux forks; each leg replaces them with the forks from its OWN install.
 */

import fs from "node:fs";
import path from "node:path";

import { resolveWreqJsNativeBinding } from "./wreqJsNative.mjs";

/** Scope prefixes whose members are install-machine-forked. */
export const HYDRATED_SCOPES = [
  "@img/sharp-",
  "@img/sharp-libvips-",
  "@ngrok/ngrok-",
  "@wreq-js/binding-",
];

/** Standalone packages that are not forked but must never be platform-forked. */
export const HYDRATED_ROOT_PACKAGES = ["fsevents"];

/**
 * onnxruntime-node does not publish a darwin-x64 binary for napi-v6 (only
 * linux/win32 x64 + darwin arm64), so existence cannot be asserted there.
 */
export const BUNDLED_EXEMPTIONS = new Set(["onnxruntime-node:darwin-x64"]);

function platformTriple(platform, arch) {
  return { dash: `${platform}-${arch}` };
}

function rmrf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function copyDir(from, to) {
  fs.cpSync(from, to, { recursive: true, verbatimSymlinks: false, force: true });
}

function directMemberNames(nodeModulesDir, scope) {
  const scopeDir = path.join(nodeModulesDir, ...scope.split("/").slice(0, -1));
  const prefix = scope.split("/").pop();
  try {
    return fs
      .readdirSync(scopeDir)
      .filter((name) => name.startsWith(prefix))
      .map((name) => `${scope.slice(0, scope.lastIndexOf("/"))}/${name}`);
  } catch {
    return [];
  }
}

/**
 * Replace install-machine-forked packages inside the restored standalone tree
 * with the forks resolved by THIS machine's node_modules.
 *
 * @param {{standaloneNodeModules: string, sourceNodeModules: string}} opts
 * @returns {{replaced: string[], removed: string[], copied: string[]}}
 */
export function hydratePlatformNatives({ standaloneNodeModules, sourceNodeModules }) {
  const replaced = [];
  const removed = [];
  const copied = [];

  const forkedNames = new Set();
  for (const scope of HYDRATED_SCOPES) {
    for (const name of directMemberNames(sourceNodeModules, scope)) forkedNames.add(name);
    for (const name of directMemberNames(standaloneNodeModules, scope)) forkedNames.add(name);
  }
  for (const pkg of HYDRATED_ROOT_PACKAGES) {
    if (fs.existsSync(path.join(sourceNodeModules, pkg))) forkedNames.add(pkg);
    if (fs.existsSync(path.join(standaloneNodeModules, pkg))) forkedNames.add(pkg);
  }

  for (const name of forkedNames) {
    const standalonePath = path.join(standaloneNodeModules, ...name.split("/"));
    const sourcePath = path.join(sourceNodeModules, ...name.split("/"));
    const hadIt = fs.existsSync(standalonePath);
    const hasIt = fs.existsSync(sourcePath);
    if (hadIt) rmrf(standalonePath);
    if (!hasIt) {
      if (hadIt) removed.push(name);
      continue; // e.g. fsevents on non-darwin legs: simply absent everywhere.
    }
    copyDir(sourcePath, standalonePath);
    copied.push(name);
    if (hadIt) replaced.push(name);
  }
  return { replaced, removed, copied };
}

/**
 * Assert that every bundled native dependency can service `platform`/`arch`.
 *
 * @returns {{ok: true} | {ok: false, errors: string[]}}
 */
export function verifyBundledNatives({ nodeModulesDir, platform, arch }) {
  const errors = [];
  const triple = platformTriple(platform, arch);

  const sqlitePrebuild = path.join(
    nodeModulesDir,
    "better-sqlite3",
    "prebuilds",
    `${triple.dash}.node`
  );
  if (!fs.existsSync(sqlitePrebuild))
    errors.push(`better-sqlite3: missing prebuild ${triple.dash}.node`);

  const wreqBinding = resolveWreqJsNativeBinding({
    platform,
    arch,
    libc: platform === "linux" ? "gnu" : undefined,
  });
  if (!wreqBinding) {
    errors.push(`wreq-js: unsupported target ${triple.dash}`);
  } else {
    const wreqBinary = path.join(
      nodeModulesDir,
      ...wreqBinding.packageName.split("/"),
      wreqBinding.fileName
    );
    if (!fs.existsSync(wreqBinary)) {
      errors.push(`wreq-js: missing ${wreqBinding.packageName}/${wreqBinding.fileName}`);
    }
  }

  const exempt = BUNDLED_EXEMPTIONS.has(`onnxruntime-node:${triple.dash}`);
  if (!exempt) {
    const onnxDir = path.join(nodeModulesDir, "onnxruntime-node", "bin", "napi-v6", platform, arch);
    if (!fs.existsSync(onnxDir))
      errors.push(`onnxruntime-node: missing ${platform}/${arch} binary`);
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
