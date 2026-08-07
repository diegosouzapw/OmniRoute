import test from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

import { assembleStandalone } from "../../scripts/build/assembleStandalone.mjs";

const REQUIRED_RUNTIME_PACKAGES = [
  "@atjsh/llmlingua-2",
  "@huggingface/transformers",
  "@tensorflow/tfjs",
  "js-tiktoken",
];

function mkPkg(
  nodeModulesDir: string,
  name: string,
  manifest: Record<string, unknown> = {},
  files: Record<string, string> = {}
): void {
  const packageDir = join(nodeModulesDir, name);
  mkdirSync(packageDir, { recursive: true });

  writeFileSync(
    join(packageDir, "package.json"),
    JSON.stringify({
      name,
      version: "1.0.0",
      ...manifest,
    })
  );

  for (const [relativePath, content] of Object.entries(files)) {
    const filePath = join(packageDir, relativePath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
  }
}

function buildLlmlinguaRoot(
  rootDir: string,
  transformersVersion = "3.5.2"
): void {
  const rootNm = join(rootDir, "node_modules");

  mkPkg(
    rootNm,
    "@atjsh/llmlingua-2",
    {
      dependencies: {
        "es-toolkit": "^1.38.0",
      },
      peerDependencies: {
        "@huggingface/transformers": "*",
        "@tensorflow/tfjs": "*",
        "js-tiktoken": "*",
      },
    },
    {
      "dist/index.js": "export const llmlingua = true;\n",
    }
  );

  mkPkg(rootNm, "es-toolkit");

  mkPkg(rootNm, "@tensorflow/tfjs", {
    dependencies: {
      "@tensorflow/tfjs-core": "4.22.0",
    },
  });
  mkPkg(rootNm, "@tensorflow/tfjs-core", {
    dependencies: {
      long: "^5.0.0",
    },
  });
  mkPkg(rootNm, "long");

  mkPkg(rootNm, "js-tiktoken", {
    dependencies: {
      "base64-js": "^1.5.1",
    },
  });
  mkPkg(rootNm, "base64-js");

  mkPkg(rootNm, "@huggingface/transformers", {
    version: transformersVersion,
    dependencies: {
      "onnxruntime-node": "1.21.0",
    },
  });
  mkPkg(rootNm, "onnxruntime-node");
}

function createStandalone(rootDir: string): {
  distDir: string;
  standaloneDir: string;
} {
  const distDir = join(rootDir, ".build", "next");
  const standaloneDir = join(distDir, "standalone");

  mkdirSync(join(standaloneDir, "node_modules"), {
    recursive: true,
  });

  writeFileSync(
    join(standaloneDir, "package.json"),
    JSON.stringify({ name: "standalone-test" })
  );

  return { distDir, standaloneDir };
}

test("#9166 standalone assembly includes the complete LLMLingua runtime closure", () => {
  const root = mkdtempSync(
    join(tmpdir(), "omniroute-docker-llmlingua-9166-")
  );

  try {
    buildLlmlinguaRoot(root);
    const { distDir, standaloneDir } = createStandalone(root);

    assembleStandalone({
      distDir,
      outDir: standaloneDir,
      projectRoot: root,
      copyNatives: true,
    });

    for (const packageName of [
      ...REQUIRED_RUNTIME_PACKAGES,
      "es-toolkit",
      "@tensorflow/tfjs-core",
      "long",
      "base64-js",
      "onnxruntime-node",
    ]) {
      assert.ok(
        existsSync(
          join(standaloneDir, "node_modules", packageName, "package.json")
        ),
        `${packageName} must be present in the standalone runtime`
      );
    }

    assert.ok(
      existsSync(
        join(
          standaloneDir,
          "node_modules",
          "@atjsh",
          "llmlingua-2",
          "dist",
          "index.js"
        )
      ),
      "the complete LLMLingua package payload must be copied"
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("#9166 standalone assembly never overwrites an already pinned transformers instance", () => {
  const root = mkdtempSync(
    join(tmpdir(), "omniroute-docker-llmlingua-pinned-9166-")
  );

  try {
    buildLlmlinguaRoot(root, "4.2.0");
    const { distDir, standaloneDir } = createStandalone(root);

    mkPkg(
      join(standaloneDir, "node_modules"),
      "@huggingface/transformers",
      {
        version: "3.5.2",
      }
    );

    assembleStandalone({
      distDir,
      outDir: standaloneDir,
      projectRoot: root,
      copyNatives: true,
    });

    const targetManifest = JSON.parse(
      readFileSync(
        join(
          standaloneDir,
          "node_modules",
          "@huggingface",
          "transformers",
          "package.json"
        ),
        "utf8"
      )
    );

    assert.equal(
      targetManifest.version,
      "3.5.2",
      "standalone's pinned transformers version must not be overwritten"
    );

    assert.ok(
      existsSync(
        join(
          standaloneDir,
          "node_modules",
          "onnxruntime-node",
          "package.json"
        )
      ),
      "missing dependencies from the transformers closure must still be copied"
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("#9166 Docker explicitly installs and validates LLMLingua optionals", () => {
  const dockerfile = readFileSync(
    new URL("../../Dockerfile", import.meta.url),
    "utf8"
  );

  const builderStart = dockerfile.indexOf("FROM base AS builder");
  const runnerStart = dockerfile.indexOf("FROM base AS runner-base");

  assert.ok(builderStart >= 0, "Docker builder stage must exist");
  assert.ok(runnerStart > builderStart, "Docker runner stage must follow builder");

  const builder = dockerfile.slice(builderStart, runnerStart);

  assert.match(
    builder,
    /npm ci\b[^\n]*--include=optional/,
    "Docker dependency installation must explicitly include optional dependencies"
  );

  assert.doesNotMatch(
    builder,
    /npm ci\b[^\n]*--omit=optional/,
    "Docker must not omit optional dependencies"
  );

  assert.match(
    builder,
    /createRequire\(['"]\/app\/\.build\/next\/standalone\/package\.json['"]\)/,
    "Docker validation must resolve packages from the standalone package context"
  );

  assert.match(
    builder,
    /resolved\.startsWith\(standaloneRoot\)/,
    "Docker validation must reject packages resolved from the builder root"
  );

  assert.match(
    builder,
    /await import\(pathToFileURL\(resolved\)\.href\)/,
    "Docker validation must import each packaged LLMLingua dependency"
  );

  assert.ok(
    builder.includes("require.resolve('onnxruntime-node')"),
    "Docker validation must resolve the native ONNX runtime"
  );

  assert.match(
    builder,
    /await import\(pathToFileURL\(onnxRuntime\)\.href\)/,
    "Docker validation must load the ONNX runtime and its native binding"
  );

  for (const packageName of REQUIRED_RUNTIME_PACKAGES) {
    assert.ok(
      builder.includes(packageName),
      `Docker standalone validation must include ${packageName}`
    );
  }
});
