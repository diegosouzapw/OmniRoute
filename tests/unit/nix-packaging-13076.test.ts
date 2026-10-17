/**
 * #13076 — structural guards for the Nix package (flake.nix, nix/*, the updater script).
 *
 * There is no Nix on CI or on most dev boxes, so `nix build` itself is NOT exercised here. These
 * tests parse the checked-in files and pin the decisions that the branch history shows were each
 * a real build bug, so none of them can regress silently:
 *   - 7844b70 → 2b75089  the fixed-output `npm install -g` derivation ignored `overrides`
 *                        (packaged adm-zip 0.5.x against a ^0.6 pin); the package now uses
 *                        buildNpmPackage + importNpmLock from a generated lockfile
 *   - 29da9dc            the packaged Node must be 24 (Node 22's npm rewrites the lockfile)
 *   - 25574de            the tarball hash must match the registry's dist.integrity format
 *   - lockfile           workspace/`link` entries cannot resolve offline in the Nix sandbox
 * A green run proves the files still have the shape the build relies on, not that Nix accepts them.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (relative: string) => fs.readFileSync(path.join(ROOT, relative), "utf8");
const readJson = (relative: string) => JSON.parse(read(relative));

const nix = read("nix/omniroute.nix");
const flake = read("flake.nix");
const updater = read("scripts/release/update-nix-package.mjs");
const manifest = readJson("nix/package.json");
const lock = readJson("nix/package-lock.json");
const lockPackages: Record<string, Record<string, unknown>> = lock.packages;

// --- tiny semver subset (no extra dependency): exact, ^, >=, >, <=, <, ||, space-joined sets ----
type Version = [number, number, number];
function parseVersion(text: string): Version {
  // Partial versions (">=22", "<23") are padded with zeros, as in engines ranges.
  const match = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?/.exec(text.trim());
  assert.ok(match, `unsupported version ${text}`);
  return [Number(match[1]), Number(match[2] ?? 0), Number(match[3] ?? 0)];
}
function compare(a: Version, b: Version): number {
  for (let i = 0; i < 3; i += 1) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}
function satisfiesComparator(version: Version, comparator: string): boolean {
  const caret = /^\^(\d+\.\d+\.\d+)$/.exec(comparator);
  if (caret) {
    const low = parseVersion(caret[1]);
    const high: Version =
      low[0] > 0 ? [low[0] + 1, 0, 0] : low[1] > 0 ? [0, low[1] + 1, 0] : [0, 0, low[2] + 1];
    return compare(version, low) >= 0 && compare(version, high) < 0;
  }
  const op = /^(>=|<=|>|<|=)?(\d+(?:\.\d+){0,2})$/.exec(comparator);
  assert.ok(op, `unsupported comparator ${comparator}`);
  const order = compare(version, parseVersion(op[2]));
  switch (op[1]) {
    case ">=":
      return order >= 0;
    case "<=":
      return order <= 0;
    case ">":
      return order > 0;
    case "<":
      return order < 0;
    default:
      return order === 0;
  }
}
function satisfies(version: string, range: string): boolean {
  const parsed = parseVersion(version);
  return range.split("||").some((set) =>
    set
      .trim()
      .split(/\s+/)
      .every((comparator) => satisfiesComparator(parsed, comparator))
  );
}

test("#13076 the package is built with buildNpmPackage + importNpmLock, not the abandoned fixed-output derivation", () => {
  assert.match(nix, /\bbuildNpmPackage\s*\{/);
  assert.match(nix, /npmDeps\s*=\s*importNpmLock\s*\{/);
  assert.match(nix, /npmConfigHook\s*=\s*importNpmLock\.npmConfigHook/);
  // The FOD approach needed a hand-maintained outputHash and `npm install -g` with network access.
  assert.doesNotMatch(nix, /outputHash|outputHashAlgo|outputHashMode/);
  assert.doesNotMatch(nix, /npm\s+install\s+-g/);
  assert.doesNotMatch(nix, /fetchNpmDeps|npmDepsHash/);
  assert.match(nix, /dontNpmBuild\s*=\s*true/);
});

test("#13076 the flake packages the Node 24 toolchain, independent of the dev shell's Node", () => {
  const callPackage =
    /packages\.default\s*=\s*pkgs\.callPackage\s+\.\/nix\/omniroute\.nix\s*\{([^}]*)\}/.exec(flake);
  assert.ok(callPackage, "packages.default must be pkgs.callPackage ./nix/omniroute.nix { … }");
  assert.match(callPackage[1], /nodejs\s*=\s*pkgs\.nodejs_24\s*;/);
  // The dev shell binds `nodejs = pkgs.nodejs_22` for hacking on the source; the package must never
  // fall back to that variable (npm 10 rewrites the lockfile and node-gyp then needs Python).
  assert.doesNotMatch(callPackage[1], /nodejs_22/);
  assert.doesNotMatch(callPackage[1], /nodejs\s*=\s*nodejs\s*;/);
  assert.match(flake, /packages\.omniroute\s*=\s*self\.packages\.\$\{system\}\.default/);
  // nix/omniroute.nix must take `nodejs` as an argument and hand it to buildNpmPackage.
  assert.match(nix, /^\s*nodejs,\s*$/m);
  assert.match(nix, /inherit nodejs;/);

  const major = Number(/nodejs_(\d+)/.exec(callPackage[1])![1]);
  assert.equal(major, 24);
  assert.ok(
    satisfies(`${major}.0.0`, manifest.engines.node),
    `Node ${major} must satisfy the published engines range ${manifest.engines.node}`
  );
});

test("#13076 every installed bin is wrapped so the pinned nodejs (node + npm) is on PATH", () => {
  // Architecture decision: keep buildNpmPackage's lib/node_modules layout + bin links and only wrap
  // them with `wrapProgram --prefix PATH`, because the CLI spawns bare "node"/"npm" in places.
  assert.match(nix, /^\s*makeWrapper,\s*$/m, "makeWrapper must be a callPackage argument");
  assert.match(nix, /nativeBuildInputs\s*=\s*\[\s*makeWrapper\s*\]/);
  const postInstall = /postInstall\s*=\s*''([\s\S]*?)'';/.exec(nix);
  assert.ok(postInstall, "postInstall hook missing");
  assert.match(postInstall[1], /wrapProgram\s+"\$bin"/);
  assert.match(postInstall[1], /--prefix PATH :\s*\$\{lib\.makeBinPath\s*\[\s*nodejs\s*\]\}/);
  // It wraps everything under $out/bin, which must cover every bin the manifest declares.
  assert.match(postInstall[1], /for bin in \$out\/bin\/\*/);
  const bins = Object.entries(manifest.bin as Record<string, string>);
  assert.deepEqual(bins.map(([name]) => name).sort(), ["omniroute", "omniroute-reset-password"]);
  const shipped = manifest.files as string[];
  for (const [name, target] of bins) {
    assert.ok(
      shipped.some((entry) => !entry.startsWith("!") && target.startsWith(entry)),
      `bin ${name} (${target}) must be inside the published files`
    );
  }
});

test("#13076 the manifest, lockfile and tarball hash the derivation references stay consistent", () => {
  assert.match(nix, /package\s*=\s*lib\.importJSON\s+\.\/package\.json;/);
  assert.match(nix, /cp \$\{\.\/package\.json\} package\.json/);
  assert.match(nix, /cp \$\{\.\/package-lock\.json\} package-lock\.json/);
  assert.match(nix, /packageLock\s*=\s*lib\.importJSON\s+\.\/package-lock\.json;/);
  for (const file of ["nix/package.json", "nix/package-lock.json", "nix/omniroute.nix"]) {
    assert.ok(fs.existsSync(path.join(ROOT, file)), `${file} must exist`);
  }

  assert.equal(manifest.name, "omniroute");
  assert.equal(lock.name, manifest.name);
  assert.equal(lock.version, manifest.version);
  assert.equal(lockPackages[""].version, manifest.version);
  assert.match(
    nix,
    /url\s*=\s*"https:\/\/registry\.npmjs\.org\/omniroute\/-\/omniroute-\$\{package\.version\}\.tgz"/
  );
  assert.match(nix, /sourceRoot\s*=\s*"package"/);

  const hashes = [...nix.matchAll(/\bhash\s*=\s*"(sha512-[^"]*)";/g)];
  assert.equal(
    hashes.length,
    1,
    "exactly one tarball hash (the updater rewrites that single line)"
  );
  const digest = Buffer.from(hashes[0][1].slice("sha512-".length), "base64");
  assert.equal(digest.length, 64, "an SRI sha512 hash decodes to 64 bytes");
  assert.equal(digest.toString("base64"), hashes[0][1].slice("sha512-".length));
});

test("#13076 the generated manifest has no workspaces/devDependencies and the lockfile resolves offline", () => {
  assert.equal("workspaces" in manifest, false);
  assert.equal("devDependencies" in manifest, false);
  assert.equal(lock.lockfileVersion, 3);
  assert.equal("workspaces" in lockPackages[""], false);
  assert.equal("devDependencies" in lockPackages[""], false);

  const broken: string[] = [];
  for (const [location, entry] of Object.entries(lockPackages)) {
    if (location === "") continue;
    const resolved = String(entry.resolved ?? "");
    const integrity = String(entry.integrity ?? "");
    // workspace members / local links are what `npm ci --offline` could not resolve in the sandbox
    if (entry.link === true || !resolved.startsWith("https://registry.npmjs.org/")) {
      broken.push(`${location}: resolved=${resolved || "<none>"}`);
    } else if (!integrity.startsWith("sha512-")) {
      // importNpmLock fetches each dependency by this integrity
      broken.push(`${location}: integrity=${integrity || "<none>"}`);
    }
  }
  assert.deepEqual(broken, []);
});

test("#13076 npm flags keep the sandbox build offline and script-free", () => {
  assert.match(nix, /npmFlags\s*=\s*\["--legacy-peer-deps"\]/);
  assert.match(nix, /npmRebuildFlags\s*=\s*\["--ignore-scripts"\]/);
  assert.match(nix, /npmPackFlags\s*=\s*\["--ignore-scripts"\]/);
});

test("#13076 better-sqlite3 ships its binary in the tarball, so --ignore-scripts leaves it usable on Node 24", () => {
  const entry = lockPackages["node_modules/better-sqlite3"];
  assert.ok(entry, "better-sqlite3 must be in the generated lockfile");
  // No install script ⇒ nothing downloads or compiles at install time (no prebuild-install, node-gyp,
  // or Python), which is what `npmRebuildFlags = ["--ignore-scripts"]` relies on.
  assert.equal(entry.hasInstallScript, undefined);
  assert.equal(entry.optional, true);
  const engines = entry.engines as { node: string };
  assert.ok(
    satisfies("24.0.0", engines.node),
    `better-sqlite3 engines ${engines.node} must allow Node 24`
  );
  assert.ok(
    satisfies("24.0.0", manifest.engines.node) && !satisfies("23.0.0", manifest.engines.node),
    "the engines range the package is pinned against excludes odd/unsupported Node majors"
  );
  assert.match(nix, /npmRebuildFlags\s*=\s*\["--ignore-scripts"\]/);
});

test("#13076 package overrides survive into the lockfile (adm-zip pin) and direct ones use $name", () => {
  const overrides = manifest.overrides as Record<string, unknown>;
  assert.equal(overrides["adm-zip"], "^0.6.1");
  assert.ok(satisfies(String(lockPackages["node_modules/adm-zip"].version), "^0.6.1"));

  // Every string override whose package is hoisted in the lockfile must resolve inside its range —
  // the original FOD packaged adm-zip 0.5.18 against the ^0.6 pin because it ignored `overrides`.
  let checked = 0;
  for (const [name, range] of Object.entries(overrides)) {
    if (typeof range !== "string") continue;
    const entry = lockPackages[`node_modules/${name}`];
    if (!entry) continue;
    checked += 1;
    assert.ok(
      satisfies(String(entry.version), range),
      `${name}@${entry.version} must satisfy override ${range}`
    );
  }
  assert.ok(checked >= 10, `expected to verify many overrides, verified ${checked}`);

  // importNpmLock rewrites `dependencies` to store paths; npm then rejects (EOVERRIDE) a string
  // override that differs from its direct dependency, so those are rewritten to "$name".
  assert.match(nix, /builtins\.isString value && package\.dependencies \? \$\{name\}/);
  assert.match(nix, /then "\\\$\$\{name\}"/);
  assert.match(nix, /overrides\s*=\s*lib\.mapAttrs/);
  const dependencies = manifest.dependencies as Record<string, string>;
  for (const [name, range] of Object.entries(overrides)) {
    if (typeof range === "string" && name in dependencies) {
      assert.equal(dependencies[name], range, `${name}: direct dependency must equal its override`);
    }
  }
});

test("#13076 the updater script stays shell-free, validates the version and rewrites the one hash line", () => {
  // Hard Rule #13: runtime values reach child processes as argv, never through a shell string.
  assert.match(updater, /execFileSync\("npm", args/);
  assert.doesNotMatch(updater, /\bexec\(|\bexecSync\(|shell:\s*true/);
  assert.doesNotMatch(updater, /execFileSync\(`/);

  const versionGuard = /arg && !(\/\^[^\n]+\$\/)\.test\(arg\)/.exec(updater);
  assert.ok(versionGuard, "the CLI argument must be validated with a version regex");
  const versionPattern = new RegExp(versionGuard[1].slice(1, -1));
  assert.ok(versionPattern.test(manifest.version));
  assert.ok(versionPattern.test("3.9.0-rc.1"));
  assert.equal(versionPattern.test("3.8.51; rm -rf /"), false);
  assert.equal(versionPattern.test("latest"), false);

  // What it strips and where it writes: only nix/, only the generated files.
  assert.match(updater, /delete manifest\.workspaces;/);
  assert.match(updater, /delete manifest\.devDependencies;/);
  assert.match(updater, /--ignore-scripts/);
  assert.match(updater, /--legacy-peer-deps/);
  assert.match(updater, /"ci", "--offline", "--dry-run"/);
  const hashLine = /\/hash = "sha512-\[\^"\]\*";\//;
  assert.match(updater, hashLine);
  assert.equal(nix.match(/hash = "sha512-[^"]*";/g)?.length, 1);
  for (const target of ["omniroute.nix", "package.json", "package-lock.json"]) {
    assert.ok(fs.existsSync(path.join(ROOT, "nix", target)), `updater target nix/${target} exists`);
  }
});
