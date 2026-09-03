import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";

interface WebpackStats {
  hasErrors(): boolean;
  toJson(options: Record<string, boolean>): {
    errors?: unknown[];
    warnings?: unknown[];
  };
}

interface WebpackCompiler {
  run(callback: (error?: Error | null, stats?: WebpackStats) => void): void;
  close(callback: (error?: Error | null) => void): void;
}

type WebpackFactory = (config: Record<string, unknown>) => WebpackCompiler;

const require = createRequire(import.meta.url);
const { webpack } = require("next/dist/compiled/webpack/webpack") as {
  webpack: WebpackFactory;
};

function renderIssue(issue: unknown): string {
  if (typeof issue === "string") return issue;
  if (issue && typeof issue === "object" && "message" in issue) {
    return String((issue as { message: unknown }).message);
  }
  return JSON.stringify(issue);
}

async function compileRuntimeRequireModules(): Promise<string[]> {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webpack-create-require-"));
  const sourcePaths = [
    "src/lib/db/adapters/runtimeRequire.ts",
    "src/lib/machineToken.ts",
    "open-sse/services/browserPool.ts",
    "open-sse/utils/tlsClient.ts",
  ] as const;
  const entries: Record<string, string> = {};

  try {
    for (const sourcePath of sourcePaths) {
      const source = fs.readFileSync(path.resolve(sourcePath), "utf8");
      const output = transpileModule(source, {
        compilerOptions: {
          module: ModuleKind.ESNext,
          target: ScriptTarget.ES2022,
        },
        fileName: sourcePath,
      }).outputText;
      const entryName = path.basename(sourcePath, ".ts");
      // Next's server compilation feeds SWC output through javascript/auto.
      // A .mjs fixture would take Webpack's javascript/esm parser path and miss
      // the createRequire warning emitted by the production build.
      const entryPath = path.join(tempDir, `${entryName}.js`);
      fs.writeFileSync(entryPath, output, "utf8");
      entries[entryName] = entryPath;
    }

    const compiler = webpack({
      devtool: false,
      entry: entries,
      externals: [
        "../../src/lib/db/proxies",
        "@/shared/utils/runtimeTimeouts",
        "better-sqlite3",
        "bun:sqlite",
        "sql.js",
        "sqlite-vec",
        "playwright",
        "wreq-js",
        // browserPool.ts imports `./obscura.ts`. The isolated webpack compile
        // has no repo tree, so treat the sibling as external instead of
        // erroring "Can't resolve './obscura.ts'".
        "./obscura.ts",
      ],
      externalsPresets: { node: true },
      mode: "development",
      module: {
        parser: {
          javascript: {
            createRequire: true,
          },
        },
        rules: [
          {
            test: /\.js$/,
            type: "javascript/auto",
          },
        ],
      },
      output: {
        filename: "[name].js",
        path: path.join(tempDir, "dist"),
      },
      target: "node",
    });

    const stats = await new Promise<WebpackStats>((resolve, reject) => {
      compiler.run((error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new Error("Webpack completed without stats"));
          return;
        }
        resolve(result);
      });
    });

    await new Promise<void>((resolve, reject) => {
      compiler.close((error) => (error ? reject(error) : resolve()));
    });

    const report = stats.toJson({ all: false, errors: true, warnings: true });
    assert.equal(stats.hasErrors(), false, (report.errors ?? []).map(renderIssue).join("\n"));
    return (report.warnings ?? []).map(renderIssue);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("Webpack does not warn while parsing optional runtime modules", async () => {
  const warnings = await compileRuntimeRequireModules();
  const runtimeModuleWarnings = warnings.filter(
    (warning) =>
      warning.includes("module.createRequire failed parsing argument") ||
      warning.includes("Critical dependency: the request of a dependency is an expression") ||
      warning.includes(
        "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
      )
  );

  assert.deepEqual(runtimeModuleWarnings, []);
});
