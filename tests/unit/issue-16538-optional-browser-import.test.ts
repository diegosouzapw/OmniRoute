import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build, stop } from "esbuild";

const root = fileURLToPath(new URL("../../", import.meta.url));
const temporary = mkdtempSync(path.join(os.tmpdir(), "omni-browser-pack-"));
after(() => {
  stop();
  rmSync(temporary, { recursive: true, force: true });
});
const browserLogin = "open-sse/vendor/codex-chatgpt-web/browser-login.ts";
let sequence = 0;

async function fixture(entry = browserLogin) {
  const dir = path.join(temporary, String(sequence++));
  mkdirSync(dir, { recursive: true });
  const output = path.join(dir, "entry.mjs");
  await build({
    entryPoints: [path.join(root, entry)],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    logLevel: "silent",
  });
  return { dir, url: pathToFileURL(output).href, data: path.join(dir, "data") };
}

function run(f: Awaited<ReturnType<typeof fixture>>, code: string, nodePath = "") {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", code], {
    cwd: f.dir,
    env: { ...process.env, NODE_PATH: nodePath, DATA_DIR: f.data, NODE_OPTIONS: "" },
    encoding: "utf8",
    timeout: 30_000,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

const fakePackage = `exports.chromium = { launch: async () => ({
  newPage: async () => ({ goto: async () => {}, evaluate: async () => "complete" }),
  close: async () => {}
}) };`;

function installPack(f: Awaited<ReturnType<typeof fixture>>) {
  const member = path.join(f.data, "packs/browser-runtime/node_modules/playwright-core");
  mkdirSync(member, { recursive: true });
  writeFileSync(path.join(member, "package.json"), JSON.stringify({ main: "index.cjs" }));
  writeFileSync(path.join(member, "index.cjs"), fakePackage);
  return member;
}

test("browser login metadata imports without the optional browser runtime", async () => {
  const f = await fixture();
  run(
    f,
    `import assert from "node:assert/strict";
    const mod = await import(${JSON.stringify(f.url)});
    assert.equal(mod.loginVerificationMarkerPath("state.json"), "state.json.verified.json");`
  );
});

test("connection storage paths do not require the optional browser runtime", async () => {
  const f = await fixture("open-sse/executors/chatgpt-web-codex/storageState.ts");
  run(
    f,
    `import assert from "node:assert/strict";
    const mod = await import(${JSON.stringify(f.url)});
    assert.match(mod.connectionRuntimePaths("test-connection").storageStatePath, /storage-state\.json$/);`
  );
});

test("launcher descriptors import without the optional browser runtime", async () => {
  const f = await fixture("open-sse/vendor/codex-chatgpt-web/launcher-browser-host.ts");
  run(
    f,
    `import assert from "node:assert/strict";
    const mod = await import(${JSON.stringify(f.url)});
    assert.equal(mod.LAUNCHER_BROWSER_HOST_KIND, "codex-web-gpt-launcher");`
  );
});

test("missing runtime fails only when the browser feature is requested, with pack guidance", async () => {
  const f = await fixture();
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  run(
    f,
    `import assert from "node:assert/strict";
    const mod = await import(${JSON.stringify(f.url)});
    await assert.rejects(mod.checkBrowserEngine({ chromeExecutablePath: ${JSON.stringify(chrome)} }),
      /browser-runtime.*install/i);`
  );
});

test("browser feature resolves an installed pack without NODE_PATH", async () => {
  const f = await fixture();
  installPack(f);
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  run(
    f,
    `const mod = await import(${JSON.stringify(f.url)});
    await mod.checkBrowserEngine({ chromeExecutablePath: ${JSON.stringify(chrome)} });`
  );
});

test("a pack installed after a failed attempt is usable without restarting", async () => {
  const f = await fixture();
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  const member = path.join(f.data, "packs/browser-runtime/node_modules/playwright-core");
  run(
    f,
    `import assert from "node:assert/strict";
    import { mkdirSync, writeFileSync } from "node:fs";
    const mod = await import(${JSON.stringify(f.url)});
    const config = { chromeExecutablePath: ${JSON.stringify(chrome)} };
    await assert.rejects(mod.checkBrowserEngine(config), /browser-runtime.*install/i);
    mkdirSync(${JSON.stringify(member)}, { recursive: true });
    writeFileSync(${JSON.stringify(path.join(member, "package.json"))}, '{"main":"index.cjs"}');
    writeFileSync(${JSON.stringify(path.join(member, "index.cjs"))}, ${JSON.stringify(fakePackage)});
    await mod.checkBrowserEngine(config);`
  );
});

test("installed pack takes precedence over a bundled copy", async () => {
  const f = await fixture();
  installPack(f);
  const bundled = path.join(f.dir, "node_modules/playwright-core");
  mkdirSync(bundled, { recursive: true });
  writeFileSync(path.join(bundled, "package.json"), '{"main":"index.cjs"}');
  writeFileSync(path.join(bundled, "index.cjs"), 'throw new Error("bundled copy must not load")');
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  run(
    f,
    `const mod = await import(${JSON.stringify(f.url)});
    await mod.checkBrowserEngine({ chromeExecutablePath: ${JSON.stringify(chrome)} });`
  );
});

test("control: NODE_PATH alone does not resolve an ESM package import", async () => {
  const f = await fixture();
  const member = installPack(f);
  run(
    f,
    `import assert from "node:assert/strict";
    await assert.rejects(import("playwright-core"), { code: "ERR_MODULE_NOT_FOUND" });`,
    path.dirname(member)
  );
});

test("browser worker imports without resolving playwright-core", async () => {
  const f = await fixture();
  const worker = pathToFileURL(
    path.join(root, "open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts")
  ).href;
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      path.join(root, "node_modules/tsx/dist/esm/index.mjs"),
      "--input-type=module",
      "-e",
      `
      import { registerHooks } from "node:module";
      import assert from "node:assert/strict";
      registerHooks({ resolve(specifier, context, next) {
        if (specifier === "playwright-core") {
          const error = new Error("Optional playwright-core is absent");
          error.code = "ERR_MODULE_NOT_FOUND";
          throw error;
        }
        return next(specifier, context);
      } });
      const mod = await import(${JSON.stringify(worker)});
      assert.equal(typeof mod.closeChatGptBrowserWorkers, "function");
    `,
    ],
    {
      cwd: f.dir,
      env: { ...process.env, NODE_PATH: "", DATA_DIR: f.data, NODE_OPTIONS: "" },
      encoding: "utf8",
      timeout: 120_000,
    }
  );
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr || result.stdout);
});

test("normal bundled dependency remains usable when no pack is installed", async () => {
  const f = await fixture();
  const bundled = path.join(f.dir, "node_modules/playwright-core");
  mkdirSync(bundled, { recursive: true });
  writeFileSync(path.join(bundled, "package.json"), '{"main":"index.cjs"}');
  writeFileSync(path.join(bundled, "index.cjs"), fakePackage);
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  run(
    f,
    `const mod = await import(${JSON.stringify(f.url)});
    await mod.checkBrowserEngine({ chromeExecutablePath: ${JSON.stringify(chrome)} });`
  );
});

test("pack guidance handles the packaged Turbopack external-import error", async () => {
  const f = await fixture();
  const bundled = path.join(f.dir, "node_modules/playwright-core");
  mkdirSync(bundled, { recursive: true });
  writeFileSync(path.join(bundled, "package.json"), '{"main":"index.cjs"}');
  const message =
    "Failed to load external module playwright-core: Error [ERR_MODULE_NOT_FOUND]: " +
    "Cannot find package 'playwright-core' imported from packaged/server/chunks/runtime.js";
  writeFileSync(path.join(bundled, "index.cjs"), `throw new Error(${JSON.stringify(message)});`);
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  run(
    f,
    `import assert from "node:assert/strict";
    const mod = await import(${JSON.stringify(f.url)});
    await assert.rejects(mod.checkBrowserEngine({ chromeExecutablePath: ${JSON.stringify(chrome)} }),
      /browser-runtime.*install/i);`
  );
});

test("a broken bundled dependency is not reported as a missing browser pack", async () => {
  const f = await fixture();
  const bundled = path.join(f.dir, "node_modules/playwright-core");
  mkdirSync(bundled, { recursive: true });
  writeFileSync(path.join(bundled, "package.json"), '{"main":"index.cjs"}');
  writeFileSync(
    path.join(bundled, "index.cjs"),
    'const error = new Error("Unrelated dependency failed"); error.code = "ERR_MODULE_NOT_FOUND"; throw error;'
  );
  const chrome = path.join(f.dir, "fake-chrome");
  writeFileSync(chrome, "fixture");
  run(
    f,
    `import assert from "node:assert/strict";
    const mod = await import(${JSON.stringify(f.url)});
    await assert.rejects(mod.checkBrowserEngine({ chromeExecutablePath: ${JSON.stringify(chrome)} }),
      /Unrelated dependency failed/);`
  );
});
