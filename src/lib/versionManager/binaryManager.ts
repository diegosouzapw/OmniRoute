import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import { getChecksums, getReleaseByVersion } from "./releaseChecker.ts";

const execFileAsync = promisify(execFile);
const DEFAULT_DATA_DIR = process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");

type Platform = "linux" | "darwin" | "windows" | "freebsd";
type Arch = "amd64" | "arm64";

function detectPlatform(): Platform {
  const p = process.platform;
  if (p === "linux") return "linux";
  if (p === "darwin") return "darwin";
  if (p === "win32") return "windows";
  return "linux";
}

function detectArch(): Arch {
  const a = process.arch;
  if (a === "x64") return "amd64";
  if (a === "arm64") return "arm64";
  return "amd64";
}

export function getAssetName(platform?: Platform, arch?: Arch): string {
  const plat = platform || detectPlatform();
  const arc = arch || detectArch();
  return `CLIProxyAPI_{version}_${plat}_${arc}${plat === "windows" ? ".zip" : ".tar.gz"}`;
}

export function getTargetPlatform(): { platform: Platform; arch: Arch } {
  return { platform: detectPlatform(), arch: detectArch() };
}

async function downloadFile(url: string, dest: string, signal?: AbortSignal): Promise<void> {
  const res = await fetch(url, { signal });
  if (!res.ok || !res.body) throw new Error(`Download failed: ${res.status}`);
  const fileStream = fsSync.createWriteStream(dest);
  await pipeline(res.body as unknown as NodeJS.ReadableStream, fileStream);
}

async function extractTarGz(archivePath: string, destDir: string): Promise<void> {
  await execFileAsync("tar", ["xzf", archivePath, "-C", destDir]);
}

async function extractZip(archivePath: string, destDir: string): Promise<void> {
  await execFileAsync("unzip", ["-o", archivePath, "-d", destDir]);
}

async function verifyChecksum(filePath: string, expectedSha256: string): Promise<boolean> {
  const hash = crypto.createHash("sha256");
  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (data: Buffer) => hash.update(data));
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  return hash.digest("hex").toLowerCase() === expectedSha256.toLowerCase();
}

function findBinaryInDir(dir: string): string | null {
  const candidates = ["cli-proxy-api", "cli-proxy-api.exe", "CLIProxyAPI", "CLIProxyAPI.exe"];
  for (const name of candidates) {
    if (fsSync.existsSync(path.join(dir, name))) return path.join(dir, name);
  }
  return null;
}

export async function downloadRelease(
  version: string,
  targetDir: string,
  signal?: AbortSignal
): Promise<string> {
  const release = await getReleaseByVersion(version);
  if (!release) throw new Error(`Version ${version} not found`);

  const { platform, arch } = getTargetPlatform();
  const ext = platform === "windows" ? ".zip" : ".tar.gz";
  const assetName = `CLIProxyAPI_${release.version}_${platform}_${arch}${ext}`;
  const asset = release.assets.find((a) => a.name === assetName);
  if (!asset) throw new Error(`No asset for ${platform}/${arch}`);

  const versionDir = path.join(targetDir, `cliproxyapi-${version}`);
  await fs.mkdir(versionDir, { recursive: true });

  const archivePath = path.join(versionDir, assetName);
  await downloadFile(asset.url, archivePath, signal);

  const checksums = await getChecksums(version);
  if (checksums.size > 0) {
    const expected = checksums.get(assetName);
    if (expected) {
      const valid = await verifyChecksum(archivePath, expected);
      if (!valid) {
        await fs.unlink(archivePath);
        throw new Error(`SHA256 checksum mismatch for ${assetName}`);
      }
    }
  }

  if (platform === "windows") {
    await extractZip(archivePath, versionDir);
  } else {
    await extractTarGz(archivePath, versionDir);
  }

  await fs.unlink(archivePath).catch(() => {});

  const binary = findBinaryInDir(versionDir);
  if (!binary) throw new Error(`Binary not found in extracted archive`);

  await fs.chmod(binary, 0o755);
  return binary;
}

export async function installVersion(version: string, dataDir?: string): Promise<string> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const binDir = path.join(dir, "bin");
  await fs.mkdir(binDir, { recursive: true });

  const binary = await downloadRelease(version, binDir);

  const symlinkPath = path.join(binDir, "cliproxyapi");
  try {
    await fs.unlink(symlinkPath);
  } catch {}
  if (process.platform === "win32") {
    await fs.copyFile(binary, symlinkPath);
  } else {
    await fs.symlink(binary, symlinkPath);
  }

  return symlinkPath;
}

export async function getCurrentBinaryPath(dataDir?: string): Promise<string | null> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const symlinkPath = path.join(dir, "bin", "cliproxyapi");
  try {
    const real = await fs.realpath(symlinkPath);
    return fsSync.existsSync(real) ? real : null;
  } catch {
    return null;
  }
}

export async function getInstalledVersions(dataDir?: string): Promise<string[]> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const binDir = path.join(dir, "bin");
  try {
    const entries = await fs.readdir(binDir);
    return entries
      .filter(
        (e) => e.startsWith("cliproxyapi-") && fsSync.statSync(path.join(binDir, e)).isDirectory()
      )
      .map((e) => e.replace("cliproxyapi-", ""));
  } catch {
    return [];
  }
}

export async function rollbackVersion(dataDir?: string): Promise<string | null> {
  const versions = await getInstalledVersions(dataDir);
  if (versions.length < 2) return null;

  versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  const previous = versions[1];

  const dir = dataDir || DEFAULT_DATA_DIR;
  const binDir = path.join(dir, "bin");
  const oldBinary = findBinaryInDir(path.join(binDir, `cliproxyapi-${previous}`));
  if (!oldBinary) return null;

  const symlinkPath = path.join(binDir, "cliproxyapi");
  try {
    await fs.unlink(symlinkPath);
  } catch {}
  if (process.platform === "win32") {
    await fs.copyFile(oldBinary, symlinkPath);
  } else {
    await fs.symlink(oldBinary, symlinkPath);
  }

  return previous;
}

export async function removeVersion(version: string, dataDir?: string): Promise<boolean> {
  const dir = dataDir || DEFAULT_DATA_DIR;
  const versionDir = path.join(dir, "bin", `cliproxyapi-${version}`);
  try {
    await fs.rm(versionDir, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}
