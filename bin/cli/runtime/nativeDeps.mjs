import {
  existsSync,
  readFileSync,
  writeFileSync,
  openSync,
  readSync,
  closeSync,
  mkdirSync,
} from "node:fs";
import { join, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { platform as osPlatform } from "node:os";
import { resolveDataDir } from "../data-dir.mjs";

const BETTER_SQLITE3_VERSION = "12.10.1";

// #14355: better-sqlite3's own install script writes here on npm 11+ once
// the script is actually permitted to run — see ensureRuntimeDir()'s
// allowScripts field below. Kept as its own named packages this file's
// `pkgs` list may grow to cover, rather than hardcoding "better-sqlite3"
// inline at every call site.
const ALLOW_SCRIPTS_PACKAGES = ["better-sqlite3"];

function runtimeDir() {
  return join(resolveDataDir(), "runtime");
}

function runtimeModules() {
  return join(runtimeDir(), "node_modules");
}

/**
 * Name of the prebuilt binary better-sqlite3 ships for this platform, e.g.
 * `linux-x64.node`. Musl-based Linux uses a distinct `linuxmusl-` prefix.
 * Mirrors the lookup `prebuild-install`/`node-gyp-build` perform at require
 * time. Canonical definition lives here (the runtime module); `doctor.mjs`
 * re-exports it so both commands agree on the same binary-layout logic
 * (#14355 — they used to diverge and report contradictory results for the
 * same install).
 */
export function prebuiltBinaryName(
  platform = process.platform,
  arch = process.arch,
  report = process.report
) {
  let prefix = platform;
  if (platform === "linux") {
    let isMusl = false;
    try {
      // glibc builds expose `glibcVersionRuntime`; musl builds do not.
      isMusl = !report?.getReport?.()?.header?.glibcVersionRuntime;
    } catch {
      isMusl = false;
    }
    prefix = isMusl ? "linuxmusl" : "linux";
  }
  return `${prefix}-${arch}.node`;
}

export function ensureRuntimeDir() {
  const dir = runtimeDir();
  mkdirSync(dir, { recursive: true });
  const pkgPath = join(dir, "package.json");
  if (!existsSync(pkgPath)) {
    writeFileSync(
      pkgPath,
      JSON.stringify(
        {
          name: "omniroute-runtime",
          version: "1.0.0",
          private: true,
          description: "User-writable runtime deps for OmniRoute (native binaries)",
          // #14355: npm 11+ rejects `--allow-scripts=<pkg>` as a CLI flag for
          // project-scoped installs ("Add the entries to the 'allowScripts'
          // field in package.json, or to .npmrc, instead") — this is the
          // only way npm now accepts to run better-sqlite3's install script,
          // which is what actually produces the native binary.
          allowScripts: ALLOW_SCRIPTS_PACKAGES,
        },
        null,
        2
      )
    );
  } else {
    // #14355: retrofit `allowScripts` into a runtime dir created by an older
    // OmniRoute version, so an existing install picks up the fix on the next
    // repair/runtime-check without the user having to delete the directory.
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      const existing = Array.isArray(pkg.allowScripts) ? pkg.allowScripts : [];
      const missing = ALLOW_SCRIPTS_PACKAGES.filter((name) => !existing.includes(name));
      if (missing.length > 0) {
        pkg.allowScripts = [...existing, ...missing];
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      }
    } catch {
      // Corrupt/unreadable package.json — leave it alone; npmInstallRuntime's
      // own failure path already surfaces stderr when the install fails.
    }
  }
  return dir;
}

export function getRuntimeNodeModules() {
  return runtimeModules();
}

export function hasModule(name) {
  return existsSync(join(runtimeModules(), name, "package.json"));
}

/**
 * Probe whether a native addon (.node) file can actually be dlopen'd by the Node runtime that
 * is going to load it. Runs in a throwaway subprocess so a real ABI mismatch (which can segfault
 * the process instead of throwing) never takes down the caller — only the probe subprocess.
 */
function probeNativeBinaryLoadable(binary) {
  try {
    const res = spawnSync(
      process.execPath,
      [
        "-e",
        "try { require(process.argv[1]); process.exit(0); } catch (e) { process.exit(1); }",
        binary,
      ],
      { timeout: 10_000, stdio: "ignore" }
    );
    // status === 0 means require() (and therefore dlopen) succeeded. Anything else — a thrown
    // ERR_DLOPEN_FAILED/NODE_MODULE_VERSION mismatch (status 1) or a crash (status null with a
    // signal, e.g. SIGSEGV) — means the binary is not safe to load.
    return res.status === 0;
  } catch {
    return false;
  }
}

export function isBetterSqliteBinaryValid() {
  const betterSqliteDir = join(runtimeModules(), "better-sqlite3");
  // #14355: newer better-sqlite3 versions ship prebuilt binaries under
  // prebuilds/<platform>-<arch>.node instead of (or as well as) the
  // node-gyp build/Release layout. Checking only the latter reported
  // valid: false for a binary that was genuinely present and loadable —
  // doctor.mjs already got this right for its own check; both now share
  // prebuiltBinaryName() so they can't diverge again.
  const candidates = [
    join(betterSqliteDir, "build", "Release", "better_sqlite3.node"),
    join(betterSqliteDir, "prebuilds", prebuiltBinaryName()),
  ];
  const binary = candidates.find((candidate) => existsSync(candidate));
  if (!binary) return false;
  try {
    const fd = openSync(binary, "r");
    const buf = Buffer.alloc(4);
    readSync(fd, buf, 0, 4, 0);
    closeSync(fd);
    const magic = buf.toString("hex");
    const os = osPlatform();
    let formatOk;
    if (os === "linux")
      formatOk = magic.startsWith("7f454c46"); // ELF
    else if (os === "darwin")
      formatOk = magic.startsWith("cffaedfe") || magic.startsWith("cefaedfe"); // Mach-O
    else if (os === "win32")
      formatOk = magic.startsWith("4d5a"); // PE/MZ
    else formatOk = true;
    if (!formatOk) return false;
    // File-format magic bytes alone do not guarantee the binary was built for the Node ABI
    // (NODE_MODULE_VERSION) that will load it — a stale/foreign-ABI binary passes the header
    // check and then crashes (segfault) on load instead of triggering a rebuild. Actually
    // attempt to load it, isolated in a subprocess.
    return probeNativeBinaryLoadable(binary);
  } catch {
    return false;
  }
}

export function npmInstallRuntime(pkgs, opts = {}) {
  const cwd = ensureRuntimeDir();
  const isWin = osPlatform() === "win32";
  const isBun = Boolean(process.versions.bun);

  let exe, args, displayCmd;
  if (isBun) {
    const bunArgs = ["add", ...pkgs, "--trust"];
    [exe, args] = isWin ? ["cmd.exe", ["/c", "bun", ...bunArgs]] : ["bun", bunArgs];
    displayCmd = `bun ${bunArgs.join(" ")}`;
  } else {
    // #14355: npm 11+ hard-rejects `--allow-scripts=<pkg>` for project-scoped
    // installs (EALLOWSCRIPTS: "Add the entries to the 'allowScripts' field
    // in package.json, or to .npmrc, instead"). ensureRuntimeDir() now writes
    // that field into the runtime package.json, which every npm version that
    // recognizes install-script restrictions at all honors — so the CLI flag
    // is no longer needed and, on npm 11+, actively breaks the install.
    const npmArgs = [
      "install",
      ...pkgs,
      "--no-audit",
      "--no-fund",
      "--prefer-online",
      "--save-exact",
    ];
    [exe, args] = isWin ? ["cmd.exe", ["/c", "npm", ...npmArgs]] : ["npm", npmArgs];
    displayCmd = `npm ${npmArgs.join(" ")}`;
  }

  if (!opts.silent) {
    process.stdout.write(`[omniroute][runtime] ${displayCmd}\n`);
  }
  // #14355: `stdio: "ignore"` in silent mode was swallowing npm's own error
  // output on failure too, leaving only a generic "install failed" message
  // with no indication of *why* (e.g. the EALLOWSCRIPTS error this issue was
  // filed over). Pipe stderr even when silent, and only surface it if the
  // install actually failed — the happy path stays quiet.
  const res = spawnSync(exe, args, {
    cwd,
    stdio: opts.silent ? ["ignore", "ignore", "pipe"] : "inherit",
    timeout: opts.timeout ?? 180_000,
    shell: false,
    env: { ...process.env },
  });
  if (opts.silent && res.status !== 0 && res.stderr && res.stderr.length > 0) {
    process.stderr.write(res.stderr);
  }
  return res.status === 0;
}

/**
 * Ensure better-sqlite3 is installed and valid in the runtime dir.
 * Returns { betterSqlite: boolean }.
 */
export function ensureBetterSqliteRuntime({ silent = false, force = false } = {}) {
  ensureRuntimeDir();
  const valid = hasModule("better-sqlite3") && isBetterSqliteBinaryValid();
  if (valid && !force) {
    if (!silent) process.stdout.write("[omniroute][runtime] better-sqlite3 OK\n");
    return { betterSqlite: true };
  }
  if (!silent) {
    process.stdout.write(
      `[omniroute][runtime] Installing better-sqlite3@${BETTER_SQLITE3_VERSION} into runtime...\n`
    );
  }
  const ok = npmInstallRuntime([`better-sqlite3@${BETTER_SQLITE3_VERSION}`], { silent });
  if (!ok && !silent) {
    process.stderr.write(
      "[omniroute][runtime] better-sqlite3 install failed.\n" +
        "  This usually means npm install scripts are blocked.\n" +
        "  Try: npm install-scripts approve better-sqlite3\n"
    );
  }
  return { betterSqlite: ok && hasModule("better-sqlite3") && isBetterSqliteBinaryValid() };
}

/**
 * Build an env object with NODE_PATH extended to include the runtime node_modules.
 */
export function buildEnvWithRuntime(baseEnv = process.env) {
  const runtimeNm = runtimeModules();
  const existing = baseEnv.NODE_PATH || "";
  const parts = [runtimeNm, existing].filter(Boolean);
  return { ...baseEnv, NODE_PATH: parts.join(sep === "\\" ? ";" : ":") };
}
