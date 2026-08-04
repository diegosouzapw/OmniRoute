import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ensureDockerBasePath } from "../../scripts/docker/ensure-docker-base-path.mjs";

function makeStandaloneRoot(basePath = "") {
  const appRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-docker-base-"));
  const distRoot = path.join(appRoot, ".build", "next");
  fs.mkdirSync(path.join(distRoot, "server"), { recursive: true });
  fs.writeFileSync(
    path.join(distRoot, "routes-manifest.json"),
    JSON.stringify({ basePath })
  );
  fs.writeFileSync(
    path.join(distRoot, "server", "chunk.js"),
    `export const config={basePath:"${basePath}"};`
  );
  fs.writeFileSync(path.join(appRoot, "BUILD_OMNIROUTE_BASE_PATH"), `${basePath}\n`);
  return appRoot;
}

test("ensureDockerBasePath is a no-op when runtime matches the baked sentinel", () => {
  const appRoot = makeStandaloneRoot("");
  const result = ensureDockerBasePath({ appRoot, env: { OMNIROUTE_BASE_PATH: "" } });
  assert.equal(result.action, "noop");
});

test("ensureDockerBasePath patches a root image when a subpath is configured", () => {
  const appRoot = makeStandaloneRoot("");
  const result = ensureDockerBasePath({ appRoot, env: { OMNIROUTE_BASE_PATH: "/omniroute" } });
  assert.equal(result.action, "patched");
  assert.equal(fs.readFileSync(path.join(appRoot, "BUILD_OMNIROUTE_BASE_PATH"), "utf8"), "/omniroute\n");
  const manifest = JSON.parse(
    fs.readFileSync(path.join(appRoot, ".build", "next", "routes-manifest.json"), "utf8")
  );
  assert.equal(manifest.basePath, "/omniroute");
});

test("ensureDockerBasePath rejects unset runtime on subpath images", () => {
  const appRoot = makeStandaloneRoot("/omniroute");
  assert.throws(
    () => ensureDockerBasePath({ appRoot, env: {} }),
    /built for subpath/
  );
});
