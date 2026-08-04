import { test } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

// #4055: the LiveWS sidecar launcher re-spawns itself with `node --import tsx`.
// Without `cwd` at the package root, a launch from outside the package dir
// (global npm / homebrew, or a systemd/launchd unit started from $HOME) fails
// with `ERR_MODULE_NOT_FOUND: Cannot find package 'tsx'` and, even from the
// package dir, cannot resolve the tsconfig `@/*` path aliases. The spawn must
// therefore pin `cwd` to the package root (the dir above `scripts/`).
const mod = await import("../../scripts/start-ws-server.mjs");

test("#4055: resolvePackageRoot points at the dir above scripts/", () => {
  const scriptUrl = pathToFileURL(
    "/opt/homebrew/lib/node_modules/omniroute/scripts/start-ws-server.mjs"
  ).href;
  assert.equal(
    mod.resolvePackageRoot(scriptUrl),
    "/opt/homebrew/lib/node_modules/omniroute"
  );
});

test("#4055: the bootstrap spawn pins cwd to the package root so tsx + @/ aliases resolve", () => {
  const scriptUrl = pathToFileURL(
    "/opt/homebrew/lib/node_modules/omniroute/scripts/start-ws-server.mjs"
  ).href;
  const spec = mod.buildSidecarSpawn(scriptUrl, { PATH: "/usr/bin" });

  // The whole point of #4055: cwd must be the package root, not inherited from
  // wherever the process manager launched us.
  assert.equal(spec.options.cwd, "/opt/homebrew/lib/node_modules/omniroute");

  // Spawn shape is preserved: node --import tsx <self>.
  assert.equal(spec.command, process.execPath);
  assert.deepEqual(spec.args, [
    "--import",
    "tsx",
    "/opt/homebrew/lib/node_modules/omniroute/scripts/start-ws-server.mjs",
  ]);

  // Bootstrap guard + auto-start suppression are still wired through the env.
  assert.equal(spec.options.env.OMNIROUTE_LIVE_WS_BOOTSTRAPPED, "1");
  assert.equal(spec.options.env.OMNIROUTE_ENABLE_LIVE_WS, "0");
  // Caller env is preserved.
  assert.equal(spec.options.env.PATH, "/usr/bin");
  assert.equal(spec.options.stdio, "inherit");
});
