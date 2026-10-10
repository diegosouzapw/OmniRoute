import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Worker } from "node:worker_threads";

/**
 * Smoke-starts the optional LLMLingua ONNX worker from the real standalone artifact (#12796).
 *
 * The artifact lives inside the checkout, so Node could silently resolve the optional
 * packages from the repository's root node_modules. The probe therefore asserts every
 * specifier resolves INSIDE the standalone tree, i.e. the shipped closure is complete.
 */
const ROOT = join(import.meta.dirname, "..", "..");
const STANDALONE = join(ROOT, ".build", "next", "standalone");
const WORKER_DIR = join(STANDALONE, "open-sse", "services", "compression", "engines", "llmlingua");
const WORKER_FILE = join(WORKER_DIR, "onnxWorker.js");
const OPTIONAL_SPECIFIERS = [
  "@atjsh/llmlingua-2",
  "@huggingface/transformers",
  "js-tiktoken/lite",
  "js-tiktoken/ranks/o200k_base",
];
const hasOptionals = existsSync(
  join(ROOT, "node_modules", "@atjsh", "llmlingua-2", "package.json")
);
const skip = process.env.RUN_STANDALONE_INT !== "1" ? "set RUN_STANDALONE_INT=1" : false;

if (!skip) {
  assert.ok(existsSync(join(STANDALONE, "server.js")), "run npm run build before the smoke test");
}

type Reply = { id: number; ok: boolean; text: string };

/** Run one worker file and collect its first message; execArgv: [] drops the tsx loader. */
function runWorker(file: string, message: unknown, env?: NodeJS.ProcessEnv): Promise<unknown> {
  const worker = new Worker(pathToFileURL(file), { execArgv: [], env: env ?? process.env });
  return new Promise<unknown>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("worker did not reply within 60s")), 60_000);
    worker.once("message", (reply) => {
      clearTimeout(timer);
      resolve(reply);
    });
    worker.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    if (message !== undefined) worker.postMessage(message);
  }).finally(() => worker.terminate());
}

function isInside(parent: string, child: string): boolean {
  const rel = relative(parent, child);
  return rel !== "" && !rel.startsWith("..") && !rel.startsWith(sep);
}

test(
  "standalone LLMLingua worker is absent when optional deps are not installed",
  {
    skip: skip || (hasOptionals ? "optional LLMLingua deps installed" : false),
  },
  () => {
    assert.equal(existsSync(WORKER_FILE), false, "slim builds must not ship a worker entry");
  }
);

test(
  "standalone LLMLingua worker resolves its optional closure from the artifact",
  {
    skip: skip || (hasOptionals ? false : "optional LLMLingua deps not installed"),
  },
  async () => {
    assert.equal(existsSync(WORKER_FILE), true, "colocate-standalone must bundle onnxWorker.js");
    const scope = JSON.parse(readFileSync(join(WORKER_DIR, "package.json"), "utf8"));
    assert.equal(scope.type, "module");

    // The probe must live beside the worker so bare specifiers resolve exactly as the worker's do.
    const probe = join(WORKER_DIR, `.llmlingua-smoke-probe-${process.pid}.js`);
    writeFileSync(
      probe,
      [
        'import { parentPort } from "node:worker_threads";',
        `const specifiers = ${JSON.stringify(OPTIONAL_SPECIFIERS)};`,
        "const resolved = {};",
        "for (const specifier of specifiers) {",
        "  resolved[specifier] = import.meta.resolve(specifier);",
        "  await import(specifier);",
        "}",
        "parentPort.postMessage(resolved);",
        "",
      ].join("\n")
    );
    try {
      const resolved = (await runWorker(probe, undefined)) as Record<string, string>;
      for (const specifier of OPTIONAL_SPECIFIERS) {
        const file = fileURLToPath(resolved[specifier]);
        assert.ok(
          isInside(join(STANDALONE, "node_modules"), file),
          `${specifier} resolved outside the standalone artifact: ${file}`
        );
      }
    } finally {
      rmSync(probe, { force: true });
    }
  }
);

test(
  "standalone LLMLingua worker answers the worker protocol offline",
  {
    skip: skip || (hasOptionals ? false : "optional LLMLingua deps not installed"),
  },
  async () => {
    // An explicit empty modelPath forces offline mode: no download, the model load fails,
    // and the worker must still reply fail-open with the original text for the same id.
    const modelPath = mkdtempSync(join(tmpdir(), "llmlingua-smoke-model-"));
    const dataDir = mkdtempSync(join(tmpdir(), "llmlingua-smoke-data-"));
    try {
      const text = "OmniRoute standalone LLMLingua worker smoke test.";
      const reply = (await runWorker(
        WORKER_FILE,
        { id: 7, text, modelPath },
        { ...process.env, DATA_DIR: dataDir }
      )) as Reply;
      assert.deepEqual(reply, { id: 7, ok: false, text });
    } finally {
      rmSync(modelPath, { recursive: true, force: true });
      rmSync(dataDir, { recursive: true, force: true });
    }
  }
);
