#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  PACK_ARTIFACT_REQUIRED_PATHS,
  findMissingArtifactPaths,
  findUnexpectedArtifactPaths,
} from "./pack-artifact-policy.ts";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);
const ROOT: string = join(__dirname, "..");
const npmCommand: string = process.platform === "win32" ? "npm.cmd" : "npm";

function runPackDryRun(): any {
  const npmExecPath = process.env.npm_execpath;
  const command = npmExecPath ? process.execPath : npmCommand;
  const args = [
    ...(npmExecPath ? [npmExecPath] : []),
    "pack",
    "--dry-run",
    "--json",
    "--ignore-scripts",
  ];

  const output = execFileSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  const jsonStart = output.indexOf("[");
  const jsonEnd = output.lastIndexOf("]");
  const jsonPayload =
    jsonStart >= 0 && jsonEnd > jsonStart ? output.slice(jsonStart, jsonEnd + 1) : output;
  const parsed = JSON.parse(jsonPayload);
  const packReport = Array.isArray(parsed) ? parsed[0] : null;

  if (!packReport || !Array.isArray(packReport.files)) {
    throw new Error("npm pack --dry-run --json did not return the expected files[] payload.");
  }

  return packReport;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 1024) {
    return `${bytes || 0} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

try {
  const packReport = runPackDryRun();
  const artifactPaths: string[] = packReport.files.map((file: any) => file.path);
  const unexpectedPaths: string[] = findUnexpectedArtifactPaths(artifactPaths, {
    exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  });
  const missingRequiredPaths: string[] = findMissingArtifactPaths(
    artifactPaths,
    PACK_ARTIFACT_REQUIRED_PATHS
  );

  console.log("📦 npm pack artifact summary");
  console.log(`   File:          ${packReport.filename}`);
  console.log(`   Entry count:   ${packReport.entryCount}`);
  console.log(`   Packed size:   ${formatBytes(packReport.size)}`);
  console.log(`   Unpacked size: ${formatBytes(packReport.unpackedSize)}`);

  if (unexpectedPaths.length > 0) {
    console.error("\n❌ Unexpected files were found in the npm publish artifact:");
    for (const unexpectedPath of unexpectedPaths) {
      console.error(`   - ${unexpectedPath}`);
    }
  }

  if (missingRequiredPaths.length > 0) {
    console.error("\n❌ Required runtime files are missing from the npm publish artifact:");
    for (const missingPath of missingRequiredPaths) {
      console.error(`   - ${missingPath}`);
    }
  }

  if (unexpectedPaths.length > 0 || missingRequiredPaths.length > 0) {
    process.exit(1);
  }

  console.log("\n✅ Pack artifact policy check passed.");
} catch (error) {
  console.error(`\n❌ Pack artifact validation failed: ${error.message}`);
  process.exit(1);
}
