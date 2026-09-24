import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PLUGIN_ID } from "../src/options.js";

// OpenCode 2.0.12 local installs (`file://` directory) never read
// package.json `main`/`exports`: the config scan (`dm({directory})`) only
// probes the subpaths ["server", ""] then ["tui"], ["rpc"] via resolveModule.
// With only `dist/index.js` present the scan yields `{}` and the plugin is
// silently dropped — no `loading plugin`, no error. The package root must
// therefore expose a `server.*` entrypoint re-exporting the built plugin.
const testsDir = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(testsDir, "..");
const serverEntry = join(pkgDir, "server.js");
const distEntry = join(pkgDir, "dist", "index.js");
const require = createRequire(import.meta.url);

describe("root server entrypoint (opencode file:// installs)", () => {
  it("ships a root server.js re-exporting the built plugin", () => {
    assert.ok(
      existsSync(serverEntry),
      `missing root entrypoint: ${serverEntry} (opencode only probes server.*/index.* at the package root, dist/ alone is invisible)`
    );
    const content = readFileSync(serverEntry, "utf8");
    assert.ok(content.includes("./dist/index.js"), "server.js must re-export ./dist/index.js");
    assert.ok(content.includes("export"), "server.js must re-export the plugin");
  });

  it("package.json files ships the root entrypoint", () => {
    const pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")) as {
      files?: string[];
    };
    assert.ok(
      Array.isArray(pkg.files) && pkg.files.includes("server.js"),
      `package.json "files" must include "server.js", got: ${JSON.stringify(pkg.files)}`
    );
  });

  it("host-style probe require.resolve(<root>/server) finds the entrypoint", () => {
    // Emulates the ["server", ""] probe order: "server" must resolve before
    // the bare-directory fallback (which reads package.json main).
    let resolved: string;
    try {
      resolved = require.resolve(join(pkgDir, "server"));
    } catch {
      assert.fail(`host probe for "server" found nothing under ${pkgDir}`);
    }
    assert.ok(
      resolved === serverEntry || resolved.endsWith(join("opencode-plugin-v2", "server.js")),
      `probe must resolve to the root server.js, got: ${resolved}`
    );
  });

  it(
    "root entrypoint exposes the plugin (id + setup)",
    { skip: !existsSync(distEntry) ? "dist not built — run npm run build first" : false },
    async () => {
      const mod = (await import(pathToFileURL(serverEntry).href)) as {
        default?: { id?: unknown; setup?: unknown };
      };
      assert.ok(mod.default, "server.js must have a default export");
      assert.equal(mod.default?.id, PLUGIN_ID);
      assert.equal(typeof mod.default?.setup, "function");
    }
  );
});
