/**
 * Regression guards for the Electron desktop application removal.
 *
 * The Electron app (electron/, electron-builder.json, the electron:* npm scripts,
 * the ELECTRON_* env vars and every docs/ops surface that documented it) was
 * removed at the operator's request. Nothing may reintroduce it:
 *
 *  - no `electron/` source tree or electron-builder config;
 *  - no electron dependency anywhere in package.json / lockfile manifests;
 *  - no electron npm script or ELECTRON_* env var in the runtime env plumbing;
 *  - no electron job/step in CI workflows;
 *  - no electron guide in docs/ (canonical or i18n mirror), no electron row in
 *    REPOSITORY_MAP.md / meta.json / llm.txt mirrors, no ELECTRON_* row in
 *    docs/reference/ENVIRONMENT.md.
 *
 * When a future change intentionally reintroduces a desktop shell, delete/replace
 * these assertions in the same PR — do not weaken them silently.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const readIfExists = (rel: string): string | null => {
  try {
    return fs.readFileSync(path.join(ROOT, rel), "utf8");
  } catch {
    return null;
  }
};

test("no Electron source tree, builder config or electron npm scripts remain", () => {
  assert.ok(!fs.existsSync(path.join(ROOT, "electron")), "electron/ directory must not exist");
  assert.ok(
    !fs.existsSync(path.join(ROOT, "electron-builder.json")),
    "electron-builder.json must not exist"
  );
  assert.ok(
    !fs.existsSync(path.join(ROOT, "scripts", "electron")),
    "scripts/electron/ must not exist"
  );

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")) as {
    scripts: Record<string, string>;
    devDependencies?: Record<string, string>;
    dependencies?: Record<string, string>;
  };

  for (const script of Object.keys(pkg.scripts)) {
    assert.ok(
      !script.toLowerCase().includes("electron"),
      `npm script "${script}" still references electron`
    );
    assert.ok(
      !pkg.scripts[script]?.includes("electron-builder"),
      `npm script "${script}" still invokes electron-builder`
    );
  }

  for (const depName of [
    ...Object.keys(pkg.devDependencies ?? {}),
    ...Object.keys(pkg.dependencies ?? {}),
  ]) {
    assert.ok(!depName.includes("electron"), `package.json still depends on "${depName}"`);
  }
});

test("no ELECTRON_* env var survives in the env plumbing or runtime code", () => {
  for (const rel of [
    ".env.example",
    "scripts/build/runtime-env.mjs",
    "scripts/dev/run-next.mjs",
    "scripts/build/bootstrap-env.mjs",
    "scripts/build/uninstall.mjs",
  ]) {
    const content = readIfExists(rel);
    assert.ok(content !== null, `${rel} must exist`);
    const hits = content.match(/ELECTRON_[A-Z_]+/g) ?? [];
    assert.deepEqual(hits, [], `${rel} still references ELECTRON_* vars: ${hits.join(", ")}`);
  }
});

test("no electron step or job remains in CI workflows", () => {
  const dir = path.join(ROOT, ".github", "workflows");
  const offenders: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".yml") && !file.endsWith(".yaml")) continue;
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    if (/electron/i.test(content) && file !== "electron-release.yml") {
      offenders.push(file);
    }
  }
  assert.ok(
    !fs.existsSync(path.join(dir, "electron-release.yml")),
    "electron-release.yml workflow must not exist"
  );
  assert.deepEqual(offenders, [], `CI workflows still reference electron: ${offenders.join(", ")}`);
});

test("no Electron guide remains in docs/ canonical or i18n mirrors", () => {
  const offenders: string[] = [];
  for (const rel of [
    "docs/guides/ELECTRON_GUIDE.md",
    "docs/i18n/am/docs/guides/ELECTRON_GUIDE.md",
  ]) {
    assert.ok(!fs.existsSync(path.join(ROOT, rel)), `${rel} must not exist`);
  }
  const docsRoot = path.join(ROOT, "docs");
  for (const dir of fs.readdirSync(docsRoot, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const base = dir.name === "i18n" ? path.join(docsRoot, "i18n") : docsRoot;
    for (const langDir of dir.name === "i18n" ? fs.readdirSync(base) : ["."]) {
      const guidesDir = path.join(base, langDir, dir.name === "i18n" ? "docs/guides" : "guides");
      if (!fs.existsSync(guidesDir)) continue;
      for (const guide of fs.readdirSync(guidesDir)) {
        if (guide.toLowerCase().includes("electron")) {
          offenders.push(path.relative(ROOT, path.join(guidesDir, guide)));
        }
      }
    }
  }
  assert.deepEqual(offenders, [], `electron guides still present: ${offenders.join(", ")}`);
});

test("dashboard docs metadata and reference maps have no electron rows", () => {
  const meta = JSON.parse(readIfExists("docs/guides/meta.json") ?? "{}") as {
    guides?: Array<{ file?: string; id?: string }>;
  };
  const metaEntries = JSON.stringify(meta);
  assert.ok(!/electron/i.test(metaEntries), "docs/guides/meta.json still references electron");

  for (const rel of [
    "docs/architecture/REPOSITORY_MAP.md",
    "docs/architecture/CODEBASE_DOCUMENTATION.md",
    "docs/reference/ENVIRONMENT.md",
    "README.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
  ]) {
    const content = readIfExists(rel);
    if (content === null) continue;
    assert.ok(!/electron/i.test(content), `${rel} still references electron`);
  }
});
