/**
 * sing-box installer adapter for the ServiceSupervisor framework.
 *
 * sing-box is a universal proxy platform that natively provides Linux TPROXY,
 * REDIRECT, and TUN interfaces with zero-copy TCP/UDP transparent proxying.
 * Running sing-box as an embedded service provides transparent network
 * interception for IDEs without requiring native C N-API compilation or
 * root node-gyp build steps on the main application.
 *
 * `install()` downloads the real, official sing-box release binary from
 * GitHub (https://github.com/SagerNet/sing-box/releases) and verifies its
 * SHA256 against a checksum pinned in {@link SINGBOX_CHECKSUMS} before ever
 * writing it to disk or letting the supervisor spawn it — there is no mock
 * binary path. Only {@link SINGBOX_PINNED_VERSION} has a known-good checksum;
 * any other requested version is rejected rather than downloaded unverified.
 *
 * Binary location: $DATA_DIR/services/singbox/sing-box
 * Config location: $DATA_DIR/services/singbox/config.json
 * DB row:          version_manager WHERE tool = 'singbox'
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { pipeline } from "node:stream/promises";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { getTargetPlatform, buildExtractZipCommand } from "@/lib/versionManager/binaryManager.ts";
import { InstallError } from "./utils";

const execFileAsync = promisify(execFile);

export const SINGBOX_DEFAULT_PORT = 20140;
export const SINGBOX_INSTALL_DIR = path.join(DATA_DIR, "services", "singbox");

/**
 * Pinned sing-box release (https://github.com/SagerNet/sing-box/releases/tag/v1.14.1).
 * Only this version has a verified checksum in {@link SINGBOX_CHECKSUMS} below —
 * `install()` refuses any other version rather than downloading an unverified
 * binary. Bump both together after manually downloading the new release and
 * recording its published SHA256 for every supported platform/arch.
 */
export const SINGBOX_PINNED_VERSION = "1.14.1";

/**
 * SHA256 of the official `sing-box-<version>-<platform>-<arch>.{tar.gz,zip}`
 * release asset, keyed by `<platform>-<arch>`. Verified 2026-09-16 against
 * the GitHub Releases API `assets[].digest` field and by downloading and
 * hashing the linux-amd64 and darwin-arm64 archives locally.
 */
const SINGBOX_CHECKSUMS: Record<string, string> = {
  "linux-amd64": "12cb2816b52febb356f6a885b740cc8758c3f30b8ae0ca8edba80f0d2d35343f",
  "linux-arm64": "6060b42fa84c5dcaeae1799af7f61b0f1ae4855d9d5ddc9e02baba17154b3ae2",
  "darwin-amd64": "b34381b047106fe84895df14f7aaae06f3182130b728006944deb0d59d8590c3",
  "darwin-arm64": "b9024642ef7b4848252df5469b7f60ef3c18bb5e217a16a0934f0174f8ad11b4",
  "windows-amd64": "5197f16d492d93202dc623622149a6ed040f8eca263128f91d603f2b901baa89",
};

export interface InstallResult {
  installedVersion: string;
  installPath: string;
  durationMs: number;
}

export interface SpawnArgs {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  cwd: string;
}

function getSingboxInstallDir(): string {
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, "services", "singbox")
    : SINGBOX_INSTALL_DIR;
}

export function getBinPath(): string {
  const dir = getSingboxInstallDir();
  const binName = process.platform === "win32" ? "sing-box.exe" : "sing-box";
  return path.join(dir, binName);
}

export function getConfigPath(): string {
  return path.join(getSingboxInstallDir(), "config.json");
}

export function generateDefaultSingboxConfig(
  tproxyPort = SINGBOX_DEFAULT_PORT,
  _targetHttpPort = 20128
): Record<string, unknown> {
  return {
    log: {
      level: "warn",
      timestamp: true,
    },
    inbounds: [
      {
        type: "tproxy",
        tag: "tproxy-in",
        listen: "127.0.0.1",
        listen_port: tproxyPort,
        sniff: true,
      },
      {
        type: "mixed",
        tag: "mixed-in",
        listen: "127.0.0.1",
        listen_port: tproxyPort + 1,
      },
    ],
    outbounds: [
      {
        type: "direct",
        tag: "direct",
      },
    ],
  };
}

export async function getInstalledVersion(): Promise<string | null> {
  try {
    const manifestPath = path.join(getSingboxInstallDir(), "package.json");
    if (!fs.existsSync(manifestPath)) return null;
    const raw = fs.readFileSync(manifestPath, "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return typeof parsed.version === "string" ? parsed.version : null;
  } catch {
    return null;
  }
}

export async function getLatestVersion(): Promise<string | null> {
  return SINGBOX_PINNED_VERSION;
}

function assetPlatformArch(): {
  platform: "linux" | "darwin" | "windows";
  arch: "amd64" | "arm64";
} {
  const { platform, arch } = getTargetPlatform();
  if (platform === "freebsd") {
    throw new InstallError(
      `sing-box has no pinned checksum for platform "${platform}"`,
      "sing-box não tem checksum verificado para esta plataforma (FreeBSD).",
      500
    );
  }
  return { platform, arch };
}

function assetFileName(version: string, platform: string, arch: string): string {
  const ext = platform === "windows" ? "zip" : "tar.gz";
  return `sing-box-${version}-${platform}-${arch}.${ext}`;
}

async function downloadToFile(url: string, dest: string): Promise<void> {
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok || !res.body) {
    throw new InstallError(
      `sing-box download failed: HTTP ${res.status} for ${url}`,
      "Falha ao baixar o binário do sing-box. Verifique a conexão e tente novamente.",
      503
    );
  }
  await pipeline(res.body as unknown as NodeJS.ReadableStream, fs.createWriteStream(dest));
}

async function sha256File(filePath: string): Promise<string> {
  const hash = crypto.createHash("sha256");
  await new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  return hash.digest("hex");
}

async function extractArchive(
  archivePath: string,
  destDir: string,
  platform: string
): Promise<void> {
  if (platform === "windows") {
    const { command, args } = buildExtractZipCommand("win32", archivePath, destDir);
    await execFileAsync(command, args);
  } else {
    await execFileAsync("tar", ["xzf", archivePath, "-C", destDir]);
  }
}

/**
 * Downloads the pinned sing-box release, verifies its SHA256 against
 * {@link SINGBOX_CHECKSUMS}, extracts it and returns the path to the real
 * `sing-box`/`sing-box.exe` binary inside the extracted archive.
 */
async function downloadRealBinary(version: string, workDir: string): Promise<string> {
  const { platform, arch } = assetPlatformArch();
  const key = `${platform}-${arch}`;
  const expectedSha256 = SINGBOX_CHECKSUMS[key];
  if (!expectedSha256) {
    throw new InstallError(
      `No pinned sing-box checksum for ${key} (only ${Object.keys(SINGBOX_CHECKSUMS).join(", ")} are verified)`,
      `sing-box não tem checksum verificado para ${key}.`,
      500
    );
  }
  if (version !== SINGBOX_PINNED_VERSION) {
    throw new InstallError(
      `sing-box version "${version}" has no pinned checksum — only ${SINGBOX_PINNED_VERSION} is verified`,
      `Apenas a versão fixada do sing-box (${SINGBOX_PINNED_VERSION}) tem checksum verificado.`,
      400
    );
  }

  fs.mkdirSync(workDir, { recursive: true });
  const fileName = assetFileName(version, platform, arch);
  const archivePath = path.join(workDir, fileName);
  const url = `https://github.com/SagerNet/sing-box/releases/download/v${version}/${fileName}`;

  await downloadToFile(url, archivePath);

  const actualSha256 = await sha256File(archivePath);
  if (actualSha256.toLowerCase() !== expectedSha256.toLowerCase()) {
    fs.unlinkSync(archivePath);
    throw new InstallError(
      `sing-box checksum mismatch for ${fileName}: expected ${expectedSha256}, got ${actualSha256}`,
      "Falha na verificação de integridade do binário do sing-box baixado.",
      500
    );
  }

  const extractDir = path.join(workDir, `sing-box-${version}-${platform}-${arch}`);
  fs.rmSync(extractDir, { recursive: true, force: true });
  await extractArchive(archivePath, workDir, platform);
  fs.unlinkSync(archivePath);

  const binName = platform === "windows" ? "sing-box.exe" : "sing-box";
  const binaryPath = path.join(extractDir, binName);
  if (!fs.existsSync(binaryPath)) {
    throw new InstallError(
      `sing-box binary not found at ${binaryPath} after extraction`,
      "Binário do sing-box não encontrado após a extração do pacote.",
      500
    );
  }
  return binaryPath;
}

export async function install(version = SINGBOX_PINNED_VERSION): Promise<InstallResult> {
  const startMs = Date.now();
  // The shared install route defaults an omitted body to the literal string
  // "latest" (see handleServiceInstall) — resolve that to the one pinned,
  // checksum-verified release so a plain POST with no body still works.
  // Any OTHER explicit version string still hits the pinned-checksum guard
  // in downloadRealBinary() and is rejected.
  const resolvedVersion = version === "latest" ? SINGBOX_PINNED_VERSION : version;
  const installDir = getSingboxInstallDir();
  fs.mkdirSync(installDir, { recursive: true });

  const downloadedBinary = await downloadRealBinary(resolvedVersion, installDir);
  const binPath = getBinPath();
  fs.copyFileSync(downloadedBinary, binPath);
  fs.chmodSync(binPath, 0o755);
  fs.rmSync(path.dirname(downloadedBinary), { recursive: true, force: true });

  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(generateDefaultSingboxConfig(), null, 2), "utf8");
  }

  const manifestPath = path.join(installDir, "package.json");
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      { name: "omniroute-singbox-host", version: resolvedVersion, private: true },
      null,
      2
    ),
    "utf8"
  );

  await upsertVersionManagerTool({
    tool: "singbox",
    installedVersion: resolvedVersion,
    binaryPath: binPath,
    status: "stopped",
    port: SINGBOX_DEFAULT_PORT,
  });

  return {
    installedVersion: resolvedVersion,
    installPath: installDir,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install(SINGBOX_PINNED_VERSION);
}

export function resolveSpawnArgs(port: number): SpawnArgs {
  const binPath = getBinPath();
  const configPath = getConfigPath();

  return {
    command: binPath,
    args: ["run", "-c", configPath],
    env: {
      ...process.env,
      SINGBOX_PORT: String(port),
    },
    cwd: getSingboxInstallDir(),
  };
}
