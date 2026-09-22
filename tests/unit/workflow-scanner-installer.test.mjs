import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";

test(
  "pinned actionlint download separates release tag from installer version",
  { skip: process.platform === "win32" },
  () => {
    const workflow = readFileSync(
      new URL("../../.github/workflows/quality.yml", import.meta.url),
      "utf8"
    );
    const assignment = workflow.match(/^\s*(ACTIONLINT_VERSION=v\d+\.\d+\.\d+)$/m)?.[1];
    const command = workflow
      .split("\n")
      .find((line) => line.includes("bash <(curl") && line.includes("download-actionlint.bash"))
      ?.trim();
    assert.ok(assignment);
    assert.ok(command);
    const installer = [
      "#!/usr/bin/env bash",
      '[[ "$1" =~ ^[0-9]+\\.[0-9]+\\.[0-9]+$ ]] || exit 17',
      "printf 'installed-version=%s\\n' \"$1\"",
    ].join("\n");
    const shell = [
      "set -euo pipefail",
      assignment,
      "curl() {",
      '  [[ "$2" == "https://raw.githubusercontent.com/rhysd/actionlint/${ACTIONLINT_VERSION}/scripts/download-actionlint.bash" ]] || return 18',
      '  printf "%s\\n" "$QG_TEST_INSTALLER"',
      "}",
      command,
    ].join("\n");
    const result = spawnSync("bash", ["-c", shell], {
      encoding: "utf8",
      timeout: 10_000,
      env: { ...process.env, QG_TEST_INSTALLER: installer },
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.equal(result.stdout.trim(), `installed-version=${assignment.split("=v")[1]}`);
  }
);
