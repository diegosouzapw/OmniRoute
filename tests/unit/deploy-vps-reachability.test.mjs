import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const workflow = readFileSync(".github/workflows/deploy-vps.yml", "utf8");
const block = workflow.match(
  /      - name: Check VPS SSH reachability from runner[\s\S]*?        run: \|\n([\s\S]*?)(?=\n      - name:)/
)?.[1];
assert.ok(block, "the real reachability step must exist");
const script = block
  .split("\n")
  .map((line) => line.replace(/^          /, ""))
  .join("\n");

for (const reachable of [false, true]) {
  test(`real deploy preflight ${reachable ? "allows a reachable host" : "fails when deployment never starts"}`, () => {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-deploy-preflight-"));
    try {
      // No network: replace only the timeout boundary, retaining the workflow's shell.
      writeFileSync(join(dir, "timeout"), `#!/bin/sh\nexit ${reachable ? 0 : 1}\n`, {
        mode: 0o755,
      });
      const output = join(dir, "outputs");
      const result = spawnSync("bash", ["-c", script], {
        encoding: "utf8",
        timeout: 5000,
        env: {
          ...process.env,
          PATH: `${dir}:${process.env.PATH}`,
          VPS_HOST: "fixture.invalid",
          GITHUB_OUTPUT: output,
        },
      });
      assert.equal(result.signal, null);
      if (reachable) assert.equal(result.status, 0, result.stderr);
      else
        assert.equal(
          result.status,
          1,
          "an unreachable host must not report a successful deployment workflow"
        );
      assert.equal(readFileSync(output, "utf8").trim(), `reachable=${reachable}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
