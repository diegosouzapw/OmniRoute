import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = process.cwd();

// This regression occurs only after Turbopack compiles a Linux-built bundle.
// Run explicitly: RUN_CLI_COMPILED_PLATFORM_TESTS=1 node --import tsx/esm --test
// tests/integration/cli-runtime-compiled-platform-16547.test.ts
// It simulates platform reads; it does not replace a native Windows spawn smoke.
test(
  "#16547 compiled CLI shell selection preserves runtime platform and extension",
  {
    skip: process.env.RUN_CLI_COMPILED_PLATFORM_TESTS !== "1" || process.platform !== "linux",
    timeout: 900_000,
  },
  async (t) => {
    const fixture = fs.mkdtempSync(path.join(root, "tests/fixtures/cli-platform-"));
    t.after(() => fs.rmSync(fixture, { recursive: true, force: true }));
    // Hardlinks isolate the Linux build root without copying gigabytes or changing installed files.
    execFileSync("cp", [
      "-al",
      path.join(root, "node_modules"),
      path.join(fixture, "node_modules"),
    ]);
    const source = fs.readFileSync(path.join(root, "src/shared/services/cliRuntime.ts"), "utf8");
    const parsed = ts.createSourceFile("cliRuntime.ts", source, ts.ScriptTarget.Latest, true);
    const names = new Set(["isWindows", "shouldUseShellForCommand"]);
    const statements = parsed.statements.filter(
      (statement) =>
        ts.isVariableStatement(statement) &&
        statement.declarationList.declarations.some(
          (declaration) => ts.isIdentifier(declaration.name) && names.has(declaration.name.text)
        )
    );
    assert.equal(statements.length, 2, "extract both real production declarations");
    const helpers = ts.transpileModule(
      statements.map((statement) => statement.getText(parsed)).join("\n"),
      { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }
    ).outputText;
    fs.mkdirSync(path.join(fixture, "app/api/probe"), { recursive: true });
    fs.writeFileSync(path.join(fixture, "package.json"), '{"private":true}');
    fs.writeFileSync(
      path.join(fixture, "next.config.mjs"),
      `export default { turbopack: { root: ${JSON.stringify(fixture)} } };\n`
    );
    fs.writeFileSync(
      path.join(fixture, "app/layout.js"),
      "export default function Layout({children}) { return <html><body>{children}</body></html>; }"
    );
    fs.writeFileSync(
      path.join(fixture, "app/api/probe/route.js"),
      helpers +
        `\nexport const dynamic = "force-dynamic";
export function GET(request) {
  const command = new URL(request.url).searchParams.get("command");
  return Response.json({ useShell: shouldUseShellForCommand(command) });
}\n`
    );
    try {
      execFileSync(
        process.execPath,
        [require.resolve("next/dist/bin/next"), "build", "--experimental-build-mode=compile"],
        {
          cwd: fixture,
          env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
          timeout: 840_000,
          maxBuffer: 16 * 1024 * 1024,
          stdio: "pipe",
        }
      );
    } catch (error) {
      if (error instanceof Error && "stdout" in error) t.diagnostic(String(error.stdout));
      if (error instanceof Error && "stderr" in error) t.diagnostic(String(error.stderr));
      throw error;
    }
    const artifact = path.join(fixture, ".next/server/app/api/probe/route.js");
    const runner = path.join(fixture, "probe.cjs");
    const commands = [
      "tool.cmd",
      "tool.bat",
      "TOOL.CMD",
      "tool.exe",
      "tool",
      String.raw`C:\Name With Spaces\tool.cmd`,
      String.raw`C:\Name With Spaces\tool.exe`,
    ];
    // Load Next before mocking the platform, so only the actual handler's reads change.
    fs.writeFileSync(
      runner,
      `const route = require(process.argv[2]).routeModule.userland.GET;
const original = Object.getOwnPropertyDescriptor(process, "platform");
(async () => {
  const results = [];
  try {
    for (const platform of ["linux", "win32", "darwin"]) {
      Object.defineProperty(process, "platform", { value: platform, configurable: true });
      for (const command of ${JSON.stringify(commands)}) {
        const response = await route(new Request("http://localhost/api/probe?command=" + encodeURIComponent(command)));
        results.push({ platform, command, ...(await response.json()) });
      }
    }
  } finally { Object.defineProperty(process, "platform", original); }
  console.log(JSON.stringify(results));
})().catch((error) => { console.error(error); process.exitCode = 1; });\n`
    );
    const rows: { platform: string; command: string; useShell?: boolean }[] = JSON.parse(
      execFileSync(process.execPath, [runner, artifact], { encoding: "utf8", timeout: 60_000 })
    );
    assert.equal(rows.length, 21);
    for (const row of rows) {
      await t.test(`${row.platform}: ${row.command}`, () => {
        const wrapper = /\.(?:cmd|bat)$/i.test(row.command);
        assert.equal(row.useShell, row.platform === "win32" && wrapper);
      });
    }
  }
);
