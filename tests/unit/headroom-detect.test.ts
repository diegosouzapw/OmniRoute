import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildPythonSearchPath,
  resolvePythonCandidates,
  PYTHON_CANDIDATES,
} from "../../src/lib/headroom/detect.ts";

// Regression guard for upstream 9router#2353 — Headroom could not detect a
// python interpreter managed by mise / pyenv / conda because those tools only
// add their shim dirs to PATH via interactive-shell activation, which the
// non-interactive server process never runs.

test("buildPythonSearchPath includes env-manager shim dirs derived from HOME", () => {
  const path = buildPythonSearchPath({ HOME: "/home/dev", PATH: "/usr/bin" });
  const segments = path.split(":");
  assert.ok(segments.includes("/home/dev/.local/share/mise/shims"), "mise shims");
  assert.ok(segments.includes("/home/dev/.pyenv/shims"), "pyenv shims");
  assert.ok(segments.includes("/home/dev/.asdf/shims"), "asdf shims");
  assert.ok(segments.includes("/home/dev/.local/bin"), "user local bin (pipx/uv)");
  // still preserves the caller's PATH and the classic EXTRA_BINS
  assert.ok(segments.includes("/usr/bin"), "inherited PATH preserved");
  assert.ok(segments.includes("/opt/homebrew/bin"), "homebrew bin preserved");
});

test("buildPythonSearchPath honors CONDA_PREFIX and custom manager roots", () => {
  const path = buildPythonSearchPath({
    HOME: "/home/dev",
    CONDA_PREFIX: "/opt/conda/envs/ml",
    PYENV_ROOT: "/custom/pyenv",
    MISE_DATA_DIR: "/custom/mise",
  });
  const segments = path.split(":");
  assert.ok(segments.includes("/opt/conda/envs/ml/bin"), "active conda env bin");
  assert.ok(segments.includes("/custom/pyenv/shims"), "PYENV_ROOT override");
  assert.ok(segments.includes("/custom/mise/shims"), "MISE_DATA_DIR override");
});

test("buildPythonSearchPath is robust when HOME/PATH are absent", () => {
  const path = buildPythonSearchPath({});
  const segments = path.split(":").filter(Boolean);
  // no empty segments, still returns the static EXTRA_BINS
  assert.ok(segments.includes("/usr/bin"));
  assert.ok(!path.includes("::"), "no empty path segments");
});

test("resolvePythonCandidates puts HEADROOM_PYTHON override first", () => {
  const candidates = resolvePythonCandidates({ HEADROOM_PYTHON: "/opt/py/bin/python" });
  assert.equal(candidates[0], "/opt/py/bin/python");
  // default candidates still follow
  assert.ok(candidates.includes("python3"));
});

test("resolvePythonCandidates returns the default list when no override", () => {
  const candidates = resolvePythonCandidates({});
  assert.deepEqual(candidates, [...PYTHON_CANDIDATES]);
});
