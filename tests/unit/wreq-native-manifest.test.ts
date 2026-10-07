import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import { syncStandaloneExtraModules } from "../../scripts/build/assembleStandalone.mjs";
import {
  PACK_ARTIFACT_REQUIRED_PATHS,
  PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS,
} from "../../scripts/build/pack-artifact-policy.ts";
import {
  WREQ_JS_NATIVE_BINDINGS,
  resolveWreqJsNativeBinding,
} from "../../scripts/build/wreqJsNative.mjs";

const ROOT = process.cwd();
const MANIFEST_PATH = join(ROOT, "config/release/wreq-js-native-manifest.json");
const INVENTORY_PATH = join(ROOT, "config/release/wreq-js-rust-license-inventory.json");
const NATIVE_NOTICES_PATH = join(ROOT, "config/release/wreq-js-rust-notices.md");

const RELEASE_EVIDENCE_PATHS = [
  "config/release/wreq-js-native-manifest.json",
  "config/release/wreq-js-rust-license-inventory.json",
  "config/release/wreq-js-rust-notices.md",
];

interface NativeAddon {
  target: string;
  package: string;
  version: string;
  platform: string;
  arch: string;
  libc?: string;
  tarball: string;
  integrity: string;
  path: string;
  size: number;
  sha256: string;
}

interface NativeManifest {
  package: string;
  version: string;
  license: string;
  source: { commit: string; licenseSha256: string };
  npm: { integrity: string };
  nativeAddons: NativeAddon[];
  rust: {
    cargoLockPackages: number;
    normalClosureUnionPackages: number;
    compileOnlyUnionPackages: number;
    boringSsl: { sourceCommit: string; licenseSha256: string; modified: boolean };
  };
}

interface CargoComponent {
  name: string;
  version: string;
  license: string;
  targets: string[];
}

interface RustLicenseInventory {
  component: { name: string; version: string; sourceCommit: string };
  targetNormalClosureCounts: Record<string, number>;
  normalClosure: {
    uniquePackages: number;
    unknownLicenses: number;
    licenseExpressionCounts: Record<string, number>;
    components: CargoComponent[];
  };
  compileOnlyClosure: {
    uniquePackages: number;
    components: CargoComponent[];
  };
  embeddedComponents: Array<{ name: string; sourceCommit: string; modified: boolean }>;
  limitations: string[];
}

const EXPECTED_BINARY_HASHES: Record<string, [number, string]> = {
  "@wreq-js/binding-android-arm64": [
    9_746_720,
    "10cfed8b7f8ce5767d74188bcc2c249f9b0102e8ae90b381b85ec53fbd84c59f",
  ],
  "@wreq-js/binding-darwin-arm64": [
    7_754_432,
    "f426855858e4c661361a93440ed5fd5bd1e4f6926b3b1c0bf8449bdfe35d0936",
  ],
  "@wreq-js/binding-darwin-x64": [
    8_249_144,
    "ef00da7db372d5a71403a17f8067655f7313ae58816150ec4a00680546b35f27",
  ],
  "@wreq-js/binding-linux-arm64-gnu": [
    8_669_896,
    "5a515d02c9693f1440aa88da7a6a09332fb93844f66590e6eb1be582284a96e2",
  ],
  "@wreq-js/binding-linux-arm64-musl": [
    8_530_208,
    "85dd40b3059b9fb1fc11923e0fca98ab2fff7bfe850aeb4dc18f8812e7125b07",
  ],
  "@wreq-js/binding-linux-x64-gnu": [
    9_110_176,
    "32be0fe79325ee55216ac844130997ae24ff3df15570357194a8e7c6ae262743",
  ],
  "@wreq-js/binding-linux-x64-musl": [
    9_036_248,
    "34c43f6694dfa5c749771f14bd19a4d4823707d428bc12d7d141ffa3176dccd6",
  ],
  "@wreq-js/binding-win32-arm64-msvc": [
    6_994_432,
    "c853e10e272f31d3e5bf3e14cf64a3bfb41ef94d428f895cb73a67f0c58c46fa",
  ],
  "@wreq-js/binding-win32-x64-msvc": [
    8_003_584,
    "2659898ee73ab64bb1ec4b4b1dd0c1e1d50f7dc579bad456d8bcad84349b01d4",
  ],
};

test("wreq-js 3.2 manifest pins all nine audited native addons to package-lock", () => {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as NativeManifest;
  const packageLock = JSON.parse(readFileSync(join(ROOT, "package-lock.json"), "utf8")) as {
    packages: Record<
      string,
      {
        version?: string;
        integrity?: string;
        license?: string;
        os?: string[];
        cpu?: string[];
        libc?: string[];
      }
    >;
  };

  assert.equal(manifest.package, "wreq-js");
  assert.equal(manifest.version, "3.2.0");
  assert.equal(manifest.license, "MIT");
  assert.equal(manifest.source.commit, "0d52d5fa252841aeef34d4d063b1766a59612bf7");
  assert.equal(manifest.rust.cargoLockPackages, 229);
  assert.equal(manifest.rust.boringSsl.modified, true);
  assert.equal(manifest.nativeAddons.length, 9);

  assert.deepEqual(
    manifest.nativeAddons.map((entry) => entry.package).sort(),
    WREQ_JS_NATIVE_BINDINGS.map((entry) => entry.packageName).sort()
  );

  for (const addon of manifest.nativeAddons) {
    const helper = WREQ_JS_NATIVE_BINDINGS.find((entry) => entry.packageName === addon.package);
    assert.ok(helper, `${addon.package}: build helper entry`);
    assert.equal(addon.target, helper.target, `${addon.package}: target`);
    assert.equal(addon.path, helper.fileName, `${addon.package}: binary path`);
    assert.equal(addon.platform, helper.platform, `${addon.package}: platform`);
    assert.equal(addon.arch, helper.arch, `${addon.package}: arch`);
    assert.equal(addon.libc, helper.libc, `${addon.package}: libc`);

    const lock = packageLock.packages[`node_modules/${addon.package}`];
    assert.equal(lock.version, addon.version, `${addon.package}: lock version`);
    assert.equal(lock.integrity, addon.integrity, `${addon.package}: lock integrity`);
    assert.equal(lock.license, "MIT", `${addon.package}: lock license`);
    assert.deepEqual(lock.os, [addon.platform], `${addon.package}: lock platform`);
    assert.deepEqual(lock.cpu, [addon.arch], `${addon.package}: lock arch`);
    if (addon.libc) {
      assert.deepEqual(
        lock.libc,
        [addon.libc === "gnu" ? "glibc" : addon.libc],
        `${addon.package}: lock libc`
      );
    }

    assert.deepEqual(
      [addon.size, addon.sha256],
      EXPECTED_BINARY_HASHES[addon.package],
      `${addon.package}: audited binary receipt`
    );
    assert.match(addon.tarball, /^https:\/\/registry\.npmjs\.org\//);

    const installedBinary = join(ROOT, "node_modules", ...addon.package.split("/"), addon.path);
    if (existsSync(installedBinary)) {
      const bytes = readFileSync(installedBinary);
      assert.equal(bytes.byteLength, addon.size, `${addon.package}: installed byte size`);
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        addon.sha256,
        `${addon.package}: installed sha256`
      );
    }
  }

  const current = resolveWreqJsNativeBinding({
    platform: process.platform === "android" ? "android" : process.platform,
    arch: process.arch,
  });
  if (current) {
    const installedBinary = join(
      ROOT,
      "node_modules",
      ...current.packageName.split("/"),
      current.fileName
    );
    if (existsSync(installedBinary)) {
      const expected = EXPECTED_BINARY_HASHES[current.packageName];
      const bytes = readFileSync(installedBinary);
      assert.equal(bytes.byteLength, expected[0], "installed host binding byte size");
      assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        expected[1],
        "installed host binding sha256"
      );
    }
  }
});

test("Cargo license inventory separates 153 runtime packages from 43 compile-only packages", () => {
  const inventory = JSON.parse(readFileSync(INVENTORY_PATH, "utf8")) as RustLicenseInventory;
  const notices = readFileSync(NATIVE_NOTICES_PATH, "utf8");

  assert.equal(inventory.component.name, "wreq-js");
  assert.equal(inventory.component.version, "3.2.0");
  assert.equal(inventory.normalClosure.uniquePackages, 153);
  assert.equal(inventory.normalClosure.components.length, 153);
  assert.equal(
    Object.values(inventory.normalClosure.licenseExpressionCounts).reduce(
      (sum, count) => sum + count,
      0
    ),
    153
  );
  assert.equal(inventory.normalClosure.unknownLicenses, 0);
  assert.equal(inventory.compileOnlyClosure.uniquePackages, 43);
  assert.equal(inventory.compileOnlyClosure.components.length, 43);

  const componentKey = (component: CargoComponent): string =>
    `${component.name}@${component.version}`;
  const normalKeys = new Set(inventory.normalClosure.components.map(componentKey));
  const compileOnlyKeys = new Set(inventory.compileOnlyClosure.components.map(componentKey));
  assert.equal(normalKeys.size, 153);
  assert.equal(compileOnlyKeys.size, 43);
  assert.deepEqual(
    [...normalKeys].filter((key) => compileOnlyKeys.has(key)),
    []
  );

  for (const [target, expected] of Object.entries(inventory.targetNormalClosureCounts)) {
    assert.equal(
      inventory.normalClosure.components.filter((component) => component.targets.includes(target))
        .length,
      expected,
      `${target}: normal closure count`
    );
  }

  for (const component of inventory.normalClosure.components) {
    assert.ok(
      notices.includes(`| \`${componentKey(component)}\` | \`${component.license}\` |`),
      `${componentKey(component)}: notice inventory row`
    );
  }
  assert.match(notices, /BoringSSL@91a66a59b6c1435120ff83e245d7719411294386/);
  assert.match(notices, /modified Apache-2\.0 work/);
  assert.match(notices, /UNICODE LICENSE V3/);
  assert.match(notices, /Community Data License Agreement - Permissive - Version 2\.0/);
  assert.match(notices, /<!-- END WREQ NOTICE BUNDLE -->\s*$/);
  assert.equal(
    inventory.limitations.some((item) => item.includes("post-LTO")),
    true
  );
});

test("npm, standalone, Electron, and container assembly carry the wreq license evidence", async () => {
  const packageJson = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
    files: string[];
  };
  for (const relativePath of RELEASE_EVIDENCE_PATHS) {
    assert.equal(packageJson.files.includes(relativePath), true, `${relativePath}: npm files`);
    assert.equal(
      PACK_ARTIFACT_ROOT_ALLOWED_EXACT_PATHS.includes(relativePath),
      true,
      `${relativePath}: pack allowlist`
    );
    assert.equal(
      PACK_ARTIFACT_REQUIRED_PATHS.includes(relativePath),
      true,
      `${relativePath}: pack required`
    );
  }

  const topLevelNotices = readFileSync(join(ROOT, "THIRD_PARTY_NOTICES.md"), "utf8");
  assert.match(topLevelNotices, /^## wreq-js 3\.2\.0 native transport$/m);
  assert.match(topLevelNotices, /Copyright \(c\) 2025 will-work-for-meal/);
  assert.match(topLevelNotices, /Copyright \(c\) 2025 Oleksandr Herasymov/);
  assert.match(topLevelNotices, /wreq-js-rust-notices\.md/);

  const fixtureRoot = mkdtempSync(join(tmpdir(), "omniroute-wreq-notices-source-"));
  const outputRoot = mkdtempSync(join(tmpdir(), "omniroute-wreq-notices-output-"));
  try {
    const copiedPaths = ["THIRD_PARTY_NOTICES.md", ...RELEASE_EVIDENCE_PATHS];
    for (const relativePath of copiedPaths) {
      const target = join(fixtureRoot, relativePath);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, `${relativePath}: receipt\n`);
    }
    const changed = await syncStandaloneExtraModules(
      fixtureRoot,
      undefined,
      { log: () => undefined },
      outputRoot
    );
    assert.equal(changed, true);
    for (const relativePath of copiedPaths) {
      assert.equal(
        readFileSync(join(outputRoot, relativePath), "utf8"),
        `${relativePath}: receipt\n`,
        `${relativePath}: shared standalone/Electron/container assembly`
      );
    }
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
    rmSync(outputRoot, { recursive: true, force: true });
  }
});

test("Electron installs the Linux arm64 binding inside the platform matrix job", () => {
  const workflow = readFileSync(join(ROOT, ".github/workflows/electron-release.yml"), "utf8");
  const webBuildStart = workflow.indexOf("\n  web-build:");
  const buildStart = workflow.indexOf("\n  build:");
  const releaseStart = workflow.indexOf("\n  release:");

  assert.ok(webBuildStart >= 0, "web-build job exists");
  assert.ok(buildStart > webBuildStart, "matrix build job follows web-build");
  assert.ok(releaseStart > buildStart, "release job follows matrix build");

  const webBuildJob = workflow.slice(webBuildStart, buildStart);
  const matrixBuildJob = workflow.slice(buildStart, releaseStart);
  const bindingStep = "Install Linux arm64 wreq binding for cross-package";

  assert.doesNotMatch(webBuildJob, new RegExp(bindingStep));
  assert.match(
    matrixBuildJob,
    new RegExp(
      `${bindingStep}[\\s\\S]*?if: matrix\\.platform == 'linux'[\\s\\S]*?@wreq-js/binding-linux-arm64-gnu@3\\.2\\.0`
    )
  );
  assert.doesNotMatch(matrixBuildJob, /--package-lock=false/);
  assert.match(matrixBuildJob, /git diff --exit-code -- package\.json package-lock\.json/);
  assert.match(
    matrixBuildJob,
    /tests\/unit\/wreq-native-manifest\.test\.ts/,
    "the cross-installed binding must be verified against the audited binary manifest"
  );
  assert.ok(
    matrixBuildJob.indexOf(bindingStep) <
      matrixBuildJob.indexOf("Build Next.js standalone (legacy per-leg fallback)"),
    "cross-arch binding must exist before either fallback build or shared-bundle hydration"
  );
});
