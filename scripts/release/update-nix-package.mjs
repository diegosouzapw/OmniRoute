#!/usr/bin/env node
/**
 * update-nix-package — point the Nix package (nix/omniroute.nix) at a published npm version.
 *
 * Writes nix/package.json (the published manifest minus `workspaces` and `devDependencies`),
 * regenerates nix/package-lock.json from it, and updates the tarball hash in
 * nix/omniroute.nix. Needs npm and registry access, not Nix. Run it after each npm release.
 *
 * Usage: node scripts/release/update-nix-package.mjs [version]   (default: latest)
 * Exit: 0 updated · 1 npm/lockfile failure · 2 bad usage.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const NIX_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "nix");

function npm(args, cwd) {
  // `npm view … time` lists every release, which outgrows the default 1 MB buffer.
  const maxBuffer = 64 * 1024 * 1024;
  return execFileSync("npm", args, {
    cwd,
    encoding: "utf8",
    maxBuffer,
    stdio: ["ignore", "pipe", "inherit"],
  });
}

const arg = process.argv[2];
if (arg && !/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(arg)) {
  console.error("Usage: node scripts/release/update-nix-package.mjs [version]");
  process.exit(2);
}

const tmp = mkdtempSync(join(tmpdir(), "omniroute-nix-"));
try {
  const version = arg || npm(["view", "omniroute", "version"]).trim();
  const info = JSON.parse(
    npm(["view", `omniroute@${version}`, "dist.integrity", "time", "--json"])
  );
  const integrity = info["dist.integrity"];
  const publishedAt = info.time?.[version];
  if (!integrity?.startsWith("sha512-") || !publishedAt) {
    throw new Error(`omniroute@${version} has no sha512 integrity or publish time on npm`);
  }

  const [{ filename }] = JSON.parse(
    npm(["pack", `omniroute@${version}`, "--json", `--pack-destination=${tmp}`])
  );
  execFileSync("tar", ["-xzf", join(tmp, filename), "-C", tmp, "package/package.json"]);
  const manifest = JSON.parse(readFileSync(join(tmp, "package", "package.json"), "utf8"));
  delete manifest.workspaces;
  delete manifest.devDependencies;
  const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`;

  const lockDir = join(tmp, "lock");
  mkdirSync(lockDir);
  writeFileSync(join(lockDir, "package.json"), manifestJson);
  const flags = ["--ignore-scripts", "--legacy-peer-deps", "--no-audit", "--no-fund"];
  // `--before` resolves the versions that were current when this release was published.
  npm(["install", "--package-lock-only", `--before=${publishedAt}`, ...flags], lockDir);
  // The Nix build installs offline. Conflicting `overrides` make npm fetch registry
  // metadata even with a complete lockfile, so fail here instead of in `nix build`.
  npm(["ci", "--offline", "--dry-run", `--cache=${join(tmp, "empty-cache")}`, ...flags], lockDir);

  const nixFile = join(NIX_DIR, "omniroute.nix");
  const nix = readFileSync(nixFile, "utf8");
  if (!/hash = "sha512-[^"]*";/.test(nix)) throw new Error(`no sha512 hash line in ${nixFile}`);
  writeFileSync(join(NIX_DIR, "package.json"), manifestJson);
  copyFileSync(join(lockDir, "package-lock.json"), join(NIX_DIR, "package-lock.json"));
  writeFileSync(nixFile, nix.replace(/hash = "sha512-[^"]*";/, `hash = "${integrity}";`));
  console.log(`Nix package updated to omniroute@${version}.`);
} catch (err) {
  console.error(`update-nix-package: ${err.message}`);
  process.exitCode = 1;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
