import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const providerAssetsDir = join(root, "public/providers");

const LOCAL_SVG_IDS_WITHOUT_PROVENANCE = [
  "api-airforce",
  "apikey",
  "bazaarlink",
  "brave-search",
  "brave",
  "byteplus",
  "cartesia",
  "cheaperinference",
  "chipotle",
  "clarifai",
  "command-code",
  "digitalocean",
  "docker-model-runner",
  "droid",
  "duckduckgo-web",
  "freebuff",
  "gitlab-duo",
  "gitlab",
  "haiper",
  "ideogram",
  "inworld",
  "kilo-gateway",
  "kilocode",
  "leonardo",
  "modal",
  "modelscope",
  "nimble-search",
  "nlpcloud",
  "oauth",
  "oci",
  "opencode",
  "openference",
  "playht",
  "qianfan",
  "qiniu",
  "qwencloud",
  "sap",
  "scaleway",
  "searxng-search",
  "serper-search",
  "soniox",
  "synthetic",
  "unorouter",
  "wandb",
  "youcom-search",
];

const LOCAL_PNG_IDS_WITHOUT_PROVENANCE = [
  "adapta-web",
  "agentrouter",
  "aimlapi",
  "anthropic-m",
  "blackbox-web",
  "blackbox",
  "cliproxyapi",
  "dahl",
  "empower",
  "gigachat",
  "inner-ai",
  "ironclaw",
  "kie",
  "lemonade",
  "linkup-search",
  "llamafile",
  "llamagate",
  "logfare",
  "maritalk",
  "nanobot",
  "nanogpt",
  "nscale",
  "oai-cc",
  "oai-r",
  "piapi",
  "predibase",
  "reka",
  "zeroclaw",
];

const CLI_AND_THEME_SVG_IDS_WITHOUT_PROVENANCE = [
  "arena-light",
  "arena-dark",
  "opencode-light",
  "opencode-dark",
];
const CLI_PNG_IDS_WITHOUT_PROVENANCE = ["omp", "letta"];

const retiredAssetNames = [
  ...LOCAL_SVG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.svg`),
  ...LOCAL_PNG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.png`),
  ...CLI_AND_THEME_SVG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.svg`),
  ...CLI_PNG_IDS_WITHOUT_PROVENANCE.map((id) => `${id}.png`),
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const retiredFilenamePattern = new RegExp(
  `(^|[^A-Za-z0-9_.-])(${retiredAssetNames.map(escapeRegExp).join("|")})([^A-Za-z0-9_.-]|$)`,
  "m"
);

const SKIPPED_DIRECTORY_NAMES = new Set([
  ".cache",
  ".next",
  "coverage",
  "dist",
  "dist-electron",
  "node_modules",
  "playwright-report",
  "test-results",
]);
const SKIPPED_ROOT_DIRECTORY_NAMES = new Set([...SKIPPED_DIRECTORY_NAMES, ".claude", ".git"]);
const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".py",
  ".sh",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);

function collectTextFiles(absolutePath) {
  const files = [];

  for (const entry of readdirSync(absolutePath, { withFileTypes: true })) {
    const entryPath = join(absolutePath, entry.name);
    const relativePath = relative(root, entryPath);
    if (
      entry.isDirectory() &&
      !SKIPPED_DIRECTORY_NAMES.has(entry.name) &&
      relativePath !== "public/providers"
    ) {
      files.push(...collectTextFiles(entryPath));
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

const rootTextFiles = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => join(root, entry.name));
const referenceRoots = readdirSync(root, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      !entry.name.startsWith("_") &&
      !SKIPPED_ROOT_DIRECTORY_NAMES.has(entry.name)
  )
  .map((entry) => entry.name);
const AUDITED_REFERENCE_FILES = [
  ...rootTextFiles,
  ...referenceRoots.flatMap((directory) => collectTextFiles(join(root, directory))),
];

test("provider bundle retires exactly the 79 unresolved assets and keeps the generic icon", () => {
  assert.equal(retiredAssetNames.length, 79);
  assert.equal(new Set(retiredAssetNames).size, 79);

  for (const assetName of retiredAssetNames) {
    assert.equal(
      existsSync(join(providerAssetsDir, assetName)),
      false,
      `${assetName} must not be distributed without provenance`
    );
  }

  const distributedAssets = readdirSync(providerAssetsDir).filter((name) =>
    [".jpg", ".png", ".svg"].includes(extname(name))
  );
  // v3.8.51 /merge-batch: 148 was this PR's own non-target baseline; three sibling
  // provenance PRs (#11735, #11736, #11711) landed first and independently retired
  // 6 further unproven files this PR never targeted (freebuff-dark.svg,
  // freebuff-light.svg, freebuff.png, openvecta.svg, picoclaw.jpg, zoocode.png),
  // so the real pre-fix count was 142, not 148. This fix retires the unresolved
  // Nimble asset as well, leaving 141 distributed assets.
  assert.equal(distributedAssets.length, 141, "all 141 non-target assets must remain");
  assert.ok(distributedAssets.includes("cli-generic.svg"));
});

test("tracked source and documentation surfaces have no retired asset reference", async () => {
  const readConcurrency = 64;

  for (let offset = 0; offset < AUDITED_REFERENCE_FILES.length; offset += readConcurrency) {
    const batch = AUDITED_REFERENCE_FILES.slice(offset, offset + readConcurrency);
    const contents = await Promise.all(batch.map((filePath) => readFile(filePath, "utf8")));

    for (const [index, content] of contents.entries()) {
      const match = content.match(retiredFilenamePattern);
      assert.equal(match, null, `${relative(root, batch[index])} still references ${match?.[2]}`);
    }
  }
});
