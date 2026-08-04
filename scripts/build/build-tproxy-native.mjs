/**
 * Best-effort build of the TPROXY IP_TRANSPARENT native addon so the production
 * build can copy `build/Release/transparent.node` into the standalone bundle
 * (assembleStandalone's NATIVE_ASSET_ENTRIES). Called from build-next-isolated.mjs
 * before the standalone is assembled.
 *
 * IP_TRANSPARENT is Linux-only, so this is a no-op everywhere else. A missing C
 * toolchain is NOT fatal — the TPROXY capture mode degrades gracefully when the
 * addon is absent (transparentSocket.ts returns "unavailable"). Every effectful
 * seam (platform/run/exists) is injectable so the decision logic is unit-testable.
 *
 * Hard Rule #13: the command + args are a fixed allowlist (no interpolation of
 * external/runtime values); `cwd` is derived from `projectRoot`, never user input.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * @param {string} projectRoot
 * @param {{ platform?: string, run?: (cmd:string, args:string[], cwd:string) => void,
 *           exists?: (p:string) => boolean }} [opts]
 * @returns {{ built: boolean, reason?: string }}
 */
export function buildTproxyNative(projectRoot, opts = {}) {
  const platform = opts.platform ?? process.platform;
  const run = opts.run ?? defaultRun;
  const exists = opts.exists ?? existsSync;

  if (platform !== "linux") {
    return { built: false, reason: "non-linux host (IP_TRANSPARENT is Linux-only)" };
  }

  const nativeDir = path.join(projectRoot, "src", "mitm", "tproxy", "native");
  if (!exists(path.join(nativeDir, "binding.gyp"))) {
    return { built: false, reason: "native sources absent (binding.gyp not found)" };
  }

  const out = path.join(nativeDir, "build", "Release", "transparent.node");
  try {
    run("npx", ["--yes", "node-gyp", "rebuild"], nativeDir);
  } catch (err) {
    return { built: false, reason: `toolchain/build failed: ${err?.message ?? String(err)}` };
  }
  if (!exists(out)) {
    return { built: false, reason: "node-gyp produced no transparent.node" };
  }
  return { built: true };
}

/** @type {(cmd: string, args: string[], cwd: string) => void} */
function defaultRun(cmd, args, cwd) {
  execFileSync(cmd, args, { cwd, stdio: "inherit" });
}
