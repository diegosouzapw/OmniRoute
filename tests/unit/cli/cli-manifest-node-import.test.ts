import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const manifestUrl = new URL("../../../bin/cli/cli-manifest.mjs", import.meta.url).href;
const contract = JSON.parse(
  readFileSync(new URL("../../../config/cli-tools-manifest.json", import.meta.url), "utf8")
);
const expectedTargets = Object.entries(contract.tools)
  .filter(([, entry]) => (entry as { surfaces: { run: boolean } }).surfaces.run)
  .map(([id]) => id);

for (const wrappedUrl of [false, true]) {
  test(`manifest loads in plain Node with ${wrappedUrl ? "a bundled URL wrapper" : "the native URL"}`, () => {
    const script = `
      import { URL as NativeURL } from "node:url";
      if (${wrappedUrl}) {
        // Bundlers can replace URL with an object that is not a Node URL instance.
        globalThis.URL = class URL {
          constructor(input, base) { this.href = new NativeURL(input, base).href; }
          toString() { return this.href; }
          get [Symbol.toStringTag]() { return "URL"; }
        };
      }
      const manifest = await import(${JSON.stringify(manifestUrl)});
      console.log(JSON.stringify({
        targets: manifest.listManifestTargets("run"),
        alias: manifest.resolveManifestTarget("aider"),
        frozen: Object.isFrozen(manifest.CLI_TARGET_MANIFEST),
      }));
    `;
    const output = execFileSync(process.execPath, ["--input-type=module", "--eval", script], {
      encoding: "utf8",
      timeout: 15000,
      env: { ...process.env, NODE_OPTIONS: "" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    assert.deepEqual(JSON.parse(output), {
      targets: expectedTargets,
      alias: "aider",
      frozen: true,
    });
  });
}
