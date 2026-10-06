// Regression guard for the #10246 follow-up: `resolveOpencodeConfigDir` has exactly ONE
// implementation, in `src/shared/services/opencodeConfigPath.ts`.
//
// #10246 moved the canonical resolvers into `opencodeConfigPath.ts` and left a thin wrapper
// `resolveOpencodeConfigDir` behind in `cliRuntime.ts`. That wrapper lost its last consumer in
// the same commit and became a dead export — which is what pushed the `check:dead-code` ratchet
// to 410 (baseline 409) and made every PR on `release/v3.8.50` born red on that gate.
//
// Worse than the ratchet: the wrapper returned `path.dirname()` of the canonical value, i.e.
// `~/.config` instead of `~/.config/opencode`. Two same-named exports with DIFFERENT return
// values is a live foot-gun — a future caller importing from `cliRuntime` instead of
// `opencodeConfigPath` would silently write the OpenCode config one directory too high.
//
// This test pins both halves: the canonical resolver's contract, and the absence of the
// divergent re-export.

import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { resolveOpencodeConfigDir } from "@/shared/services/opencodeConfigPath";
import * as cliRuntime from "@/shared/services/cliRuntime";

test("#10246 canonical resolveOpencodeConfigDir returns the XDG opencode directory", () => {
  assert.equal(
    resolveOpencodeConfigDir({ XDG_CONFIG_HOME: "/xdg" }, "/home/u"),
    path.join("/xdg", "opencode")
  );
  // No XDG_CONFIG_HOME → `<home>/.config/opencode` on every platform (#3330: OpenCode reads
  // XDG even on Windows, where it uses %USERPROFILE%\.config and never %APPDATA%).
  assert.equal(
    resolveOpencodeConfigDir({}, "/home/u"),
    path.join("/home/u", ".config", "opencode")
  );
  // A blank/whitespace XDG_CONFIG_HOME must fall back, not produce a relative path.
  assert.equal(
    resolveOpencodeConfigDir({ XDG_CONFIG_HOME: "   " }, "/home/u"),
    path.join("/home/u", ".config", "opencode")
  );
});

test("#10246 cliRuntime does NOT re-export a divergent resolveOpencodeConfigDir", () => {
  assert.equal(
    (cliRuntime as Record<string, unknown>).resolveOpencodeConfigDir,
    undefined,
    "cliRuntime must not re-export resolveOpencodeConfigDir — the wrapper returned the PARENT " +
      "directory (path.dirname of the canonical value), so importing it by name would write the " +
      "OpenCode config one level too high. Import it from opencodeConfigPath instead."
  );
});

test("#10246 cliRuntime still exposes the config PATH helpers it owns", () => {
  // The path helpers legitimately stay on cliRuntime (they have live consumers) — this guard
  // must not be read as "cliRuntime should stop exporting OpenCode helpers entirely".
  assert.equal(typeof cliRuntime.resolveOpencodeConfigPath, "function");
  assert.equal(typeof cliRuntime.getOpenCodeConfigPath, "function");
});
