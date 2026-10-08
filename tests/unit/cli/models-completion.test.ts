import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

async function invoke(args: string[], dataDir: string) {
  const moduleUrl = new URL("../../../bin/cli/commands/completion.mjs", import.meta.url).href;
  const modelsUrl = new URL("../../../bin/cli/commands/models.mjs", import.meta.url).href;
  const child = spawn(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `const {Command}=await import('commander'); const {registerCompletion}=await import(process.argv[1]); const {registerModels}=await import(process.argv[3]); const program=new Command().option('--base-url <url>').option('--api-key <key>', '', 'fixture-model-api-key'); registerCompletion(program); registerModels(program); await program.parseAsync(JSON.parse(process.argv[2]),{from:'user'});`,
      moduleUrl,
      JSON.stringify(args),
      modelsUrl,
    ],
    {
      env: {
        ...process.env,
        DATA_DIR: dataDir,
        HOME: dataDir,
        OMNIROUTE_CLI_TOKEN: "fixture",
        OMNIROUTE_API_KEY: "ambient-not-used",
        OMNIROUTE_BASE_URL: "http://127.0.0.1:1",
      },
    }
  );
  let out = "";
  let err = "";
  child.stdout.on("data", (chunk) => {
    out += chunk;
  });
  child.stderr.on("data", (chunk) => {
    err += chunk;
  });
  const code = await new Promise<number | null>((resolve, reject) => {
    child.once("close", resolve);
    child.once("error", reject);
  });
  return { out, err, code };
}

for (const status of [200, 401])
  test(`model completion refresh preserves catalog/auth semantics (${status})`, async () => {
    const dataDir = mkdtempSync(join(tmpdir(), "omniroute-model-completion-"));
    const cache = join(dataDir, "completion-cache.json");
    const previous = JSON.stringify({ models: ["keep-on-failure"], ts: 123 });
    writeFileSync(cache, previous);
    const requests: string[] = [];
    const server = createServer((req, res) => {
      requests.push(req.url || "");
      const models = req.url?.includes("models");
      res.writeHead(models ? status : 200, { "content-type": "application/json" });
      res.end(
        JSON.stringify(
          models ? { data: [{ id: "manual/model" }], error: "secret-do-not-print" } : {}
        )
      );
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    try {
      const result = await invoke(
        ["--base-url", `http://127.0.0.1:${address.port}`, "completion", "refresh", "--quiet"],
        dataDir
      );
      assert.equal(result.code, status === 200 ? 0 : 4, result.err);
      assert.ok(requests.includes("/api/v1/models"));
      assert.ok(!requests.includes("/api/models"));
      assert.ok(!result.err.includes("secret-do-not-print"));
      if (status === 200)
        assert.deepEqual(JSON.parse(readFileSync(cache, "utf8")).models, ["manual/model"]);
      else assert.equal(readFileSync(cache, "utf8"), previous);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      rmSync(dataDir, { recursive: true, force: true });
    }
  });

test("all shell completion scripts advertise manual model commands", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-model-shell-"));
  try {
    for (const shell of ["bash", "zsh", "fish"]) {
      const result = await invoke(["completion", shell], dataDir);
      assert.equal(result.code, 0);
      assert.ok(result.out.includes("manual add edit remove"), shell);
      const branch =
        shell === "bash"
          ? /^\s*models\).*COMPREPLY/gm
          : shell === "zsh"
            ? /^\s*models\).*_arguments/gm
            : /^complete .*__fish_seen_subcommand_from models'/gm;
      assert.equal([...result.out.matchAll(branch)].length, 1, `${shell} has one model branch`);
      if (shell === "bash" && process.platform !== "win32") {
        const output = execFileSync("/bin/bash", ["--noprofile", "--norc"], {
          input:
            result.out +
            '\nCOMP_WORDS=(omniroute models "")\nCOMP_CWORD=2\n_omniroute\nprintf "%s\\n" "${COMPREPLY[@]}"\n',
          encoding: "utf8",
          timeout: 5000,
          env: { PATH: "/usr/bin:/bin" },
        });
        assert.deepEqual(output.trim().split("\n"), ["manual", "add", "edit", "remove"]);
      }
    }
  } finally {
    rmSync(dataDir, { recursive: true, force: true });
  }
});

test("installed completion includes models registered after completion", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-model-install-"));
  try {
    const result = await invoke(["completion", "install", "bash"], dataDir);
    assert.equal(result.code, 0, result.err);
    const script = readFileSync(join(dataDir, ".bash_completion.d", "omniroute"), "utf8");
    assert.match(script, /manual add edit remove/);
  } finally {
    rmSync(dataDir, { recursive: true, force: true });
  }
});
