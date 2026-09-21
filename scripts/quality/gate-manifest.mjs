#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const VALIDATION_ALIAS = /^(check(?::|$)|test(?::|$)|quality:|lint(?::|$)|typecheck:)/;
const DISPOSITIONS = new Set(["separately-invoked", "maintenance"]);

// Inventory membership does not imply execution, requiredness or acceptance.
// Profiles select executable aliases; other aliases remain explicitly separate.
export function validateManifest(manifest, scripts) {
  const errors = [];
  if (manifest?.schemaVersion !== 1) errors.push("unsupported manifest schema");
  if (!Array.isArray(manifest?.aliases)) return [...errors, "missing aliases"];
  const entries = new Map();
  for (const entry of manifest.aliases) {
    if (!entry || typeof entry.name !== "string" || !VALIDATION_ALIAS.test(entry.name)) {
      errors.push("invalid validation alias");
      continue;
    }
    if (entries.has(entry.name)) errors.push(`duplicate alias: ${entry.name}`);
    entries.set(entry.name, entry);
    if (!Object.hasOwn(scripts, entry.name)) errors.push(`removed alias: ${entry.name}`);
    else if (entry.command !== scripts[entry.name]) errors.push(`command drift: ${entry.name}`);
    if (!DISPOSITIONS.has(entry.disposition)) errors.push(`invalid disposition: ${entry.name}`);
  }
  for (const name of Object.keys(scripts).filter((name) => VALIDATION_ALIAS.test(name))) {
    if (!entries.has(name)) errors.push(`unmapped alias: ${name}`);
  }
  if (
    !manifest.profiles ||
    typeof manifest.profiles !== "object" ||
    Array.isArray(manifest.profiles)
  ) {
    return [...errors, "missing profiles"];
  }
  if (Object.keys(manifest.profiles).length === 0) errors.push("empty profiles");
  for (const [name, profile] of Object.entries(manifest.profiles)) {
    if (!profile || typeof profile.description !== "string" || !profile.description.trim()) {
      errors.push(`missing profile description: ${name}`);
    }
    if (!Array.isArray(profile?.aliases) || profile.aliases.length === 0) {
      errors.push(`empty profile: ${name}`);
      continue;
    }
    const seen = new Set();
    for (const alias of profile.aliases) {
      if (seen.has(alias)) errors.push(`duplicate profile member: ${name}/${alias}`);
      seen.add(alias);
      const entry = entries.get(alias);
      if (!entry) errors.push(`unknown profile member: ${name}/${alias}`);
      if (entry?.disposition === "maintenance")
        errors.push(`maintenance in scan: ${name}/${alias}`);
    }
  }
  return errors;
}

export function readManifest(root = process.cwd()) {
  const manifest = JSON.parse(
    readFileSync(resolve(root, "config/quality/gate-manifest.json"), "utf8")
  );
  const { scripts } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
  const errors = validateManifest(manifest, scripts);
  if (errors.length) throw new Error(errors.join("\n"));
  return { manifest, scripts };
}

export function resolveProfile(manifest, scripts, name) {
  const errors = validateManifest(manifest, scripts);
  if (errors.length) throw new Error(errors.join("\n"));
  if (!Object.hasOwn(manifest.profiles, name)) throw new Error(`unknown profile: ${name}`);
  return manifest.profiles[name].aliases.map((alias) => ({
    name: alias,
    cmd: [process.platform === "win32" ? "npm.cmd" : "npm", "run", "--silent", alias],
  }));
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    const { manifest } = readManifest();
    console.log(
      JSON.stringify(
        {
          schemaVersion: manifest.schemaVersion,
          aliases: manifest.aliases.length,
          profiles: Object.fromEntries(
            Object.entries(manifest.profiles).map(([name, profile]) => [
              name,
              profile.aliases.length,
            ])
          ),
          releaseAcceptance: false,
        },
        null,
        2
      )
    );
  } catch (error) {
    console.error(`[gate-manifest] ${error.message}`);
    process.exitCode = 1;
  }
}
