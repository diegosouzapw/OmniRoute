#!/usr/bin/env node

/**
 * Compares OMNIROUTE_BASE_PATH at container start against BUILD_OMNIROUTE_BASE_PATH
 * recorded during the image build. When they differ and the image was built for the
 * domain root, rewrites the standalone bundle before Next.js starts.
 *
 * Hard Rule #13: the subpath is read only from process.env (or an injected env
 * object in tests). Never accept it as a CLI argument or interpolate it into a
 * shell sed/awk invocation — see scripts/docker/patch-basepath.sh.
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { normalizeBasePath } from "../build/normalizeBasePath.mjs";
import { patchStandaloneBasePath } from "./patch-standalone-base-path.mjs";

const SENTINEL = "BUILD_OMNIROUTE_BASE_PATH";

function readBakedBasePath(appRoot) {
  const sentinelPath = path.join(appRoot, SENTINEL);
  if (!fs.existsSync(sentinelPath)) return "";
  return normalizeBasePath(fs.readFileSync(sentinelPath, "utf8"));
}

function writeBakedBasePath(appRoot, basePath) {
  fs.writeFileSync(path.join(appRoot, SENTINEL), `${basePath}\n`);
}

/**
 * @param {object} [opts]
 * @param {string} [opts.appRoot]
 * @param {NodeJS.ProcessEnv} [opts.env]
 */
export function ensureDockerBasePath(opts = {}) {
  const appRoot = opts.appRoot || process.cwd();
  const runtime = normalizeBasePath(opts.env?.OMNIROUTE_BASE_PATH ?? process.env.OMNIROUTE_BASE_PATH);
  const baked = readBakedBasePath(appRoot);

  if (runtime === baked) {
    return { action: "noop", runtime, baked };
  }

  if (!runtime && baked) {
    throw new Error(
      `This OmniRoute image was built for subpath ${baked}, but OMNIROUTE_BASE_PATH is unset. ` +
        `Set OMNIROUTE_BASE_PATH=${baked} or rebuild without the build-arg.`
    );
  }

  const patchResult = patchStandaloneBasePath({
    appRoot,
    fromBasePath: baked,
    toBasePath: runtime,
  });
  writeBakedBasePath(appRoot, runtime);
  return { action: "patched", runtime, baked, patchResult };
}

function main() {
  try {
    const result = ensureDockerBasePath();
    if (result.action === "patched") {
      const { patchResult, runtime } = result;
      console.log(
        `[ensure-docker-base-path] Applied runtime subpath ${runtime} ` +
          `(manifests=${patchResult.patchedManifests}, textFiles=${patchResult.patchedTextFiles})`
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[ensure-docker-base-path] ${message}`);
    console.error(
      "[ensure-docker-base-path] Rebuild the image with the same subpath, e.g.\n" +
        "  docker compose build --build-arg OMNIROUTE_BASE_PATH=/omniroute"
    );
    process.exit(1);
  }
}

const isEntrypoint =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isEntrypoint) {
  main();
}
