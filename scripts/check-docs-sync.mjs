#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const packageJsonPath = path.resolve(cwd, "package.json");
const openApiPath = path.resolve(cwd, "docs/openapi.yaml");
const changelogPath = path.resolve(cwd, "CHANGELOG.md");
const llmPath = path.resolve(cwd, "llm.txt");
const i18nDocsPath = path.resolve(cwd, "docs/i18n");

function readText(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${path.relative(cwd, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function extractOpenApiVersion(content) {
  const lines = content.split(/\r?\n/);
  let inInfoBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inInfoBlock) {
      if (trimmed === "info:") {
        inInfoBlock = true;
      }
      continue;
    }

    if (line.length > 0 && !line.startsWith(" ")) {
      break;
    }

    const match = line.match(/^\s{2}version:\s*["']?([^"'\s]+)["']?\s*$/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function extractChangelogSections(content) {
  const headings = [...content.matchAll(/^##\s+\[([^\]]+)\](?:\s+[-—–].*)?$/gm)];
  return headings.map((match) => match[1]);
}

function stripTopHeading(content) {
  return content.replace(/^# .+\r?\n+/, "");
}

function extractI18nMirrorBody(content) {
  const separator = content.match(/^---\s*$/m);
  if (!separator || separator.index === undefined) {
    return null;
  }

  return content.slice(separator.index + separator[0].length).replace(/^\r?\n+/, "");
}

function normalizeMirrorBody(content) {
  return content.replace(/\r\n/g, "\n").trim();
}

function isSemver(value) {
  // Accept X.Y.Z and X.Y.Z-prerelease.N (e.g. 3.0.0-rc.1, 3.0.0-beta.2)
  return /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(value);
}

let hasFailure = false;

function fail(message) {
  hasFailure = true;
  console.error(`[docs-sync] FAIL - ${message}`);
}

function checkI18nMirrorFile(fileName, sourcePath) {
  if (!fs.existsSync(i18nDocsPath)) {
    fail("docs/i18n directory is missing");
    return;
  }

  const sourceBody = normalizeMirrorBody(stripTopHeading(readText(sourcePath)));
  const locales = fs
    .readdirSync(i18nDocsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let checked = 0;
  for (const locale of locales) {
    const targetPath = path.join(i18nDocsPath, locale, fileName);
    if (!fs.existsSync(targetPath)) {
      fail(`docs/i18n/${locale}/${fileName} is missing`);
      continue;
    }

    const body = extractI18nMirrorBody(readText(targetPath));
    if (body === null) {
      fail(`docs/i18n/${locale}/${fileName} is missing the i18n mirror separator`);
      continue;
    }

    if (normalizeMirrorBody(body) !== sourceBody) {
      fail(`docs/i18n/${locale}/${fileName} differs from root ${fileName}`);
      continue;
    }

    checked += 1;
  }

  if (checked > 0) {
    console.log(`[docs-sync] ${fileName} i18n mirrors match root content: ${checked} locales`);
  }
}

try {
  const packageJson = JSON.parse(readText(packageJsonPath));
  const packageVersion = packageJson.version;

  if (!isSemver(packageVersion)) {
    fail(`package.json version is not valid semver: "${packageVersion}"`);
  } else {
    console.log(`[docs-sync] package.json version: ${packageVersion}`);
  }

  const openApiVersion = extractOpenApiVersion(readText(openApiPath));
  if (!openApiVersion) {
    fail("could not extract docs/openapi.yaml info.version");
  } else if (openApiVersion !== packageVersion) {
    fail(`OpenAPI version (${openApiVersion}) differs from package.json (${packageVersion})`);
  } else {
    console.log(`[docs-sync] openapi.yaml info.version matches: ${openApiVersion}`);
  }

  const changelogSections = extractChangelogSections(readText(changelogPath));
  if (changelogSections.length === 0) {
    fail("CHANGELOG.md has no version sections");
  } else {
    if (changelogSections[0] !== "Unreleased") {
      fail('CHANGELOG.md first section must be "## [Unreleased]"');
    } else {
      console.log("[docs-sync] changelog has top Unreleased section");
    }

    const semverSections = changelogSections.filter((section) => isSemver(section));
    if (semverSections.length === 0) {
      fail("CHANGELOG.md has no semver release section");
    } else if (semverSections[0] !== packageVersion) {
      fail(
        `Latest changelog release (${semverSections[0]}) differs from package.json (${packageVersion})`
      );
    } else {
      console.log(
        `[docs-sync] latest changelog release matches package version: ${packageVersion}`
      );
    }
  }

  checkI18nMirrorFile("llm.txt", llmPath);
  checkI18nMirrorFile("CHANGELOG.md", changelogPath);
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (hasFailure) {
  process.exit(1);
}

console.log("[docs-sync] PASS - documentation version sync is consistent.");
