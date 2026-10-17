import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { gunzipSync } from "node:zlib";
import AdmZip from "adm-zip";
import { Parser } from "tar";
import { officialRelease } from "./releases";
import type { ManagedCore } from "./config";

const MAX_ARCHIVE = 128 * 1024 * 1024;
const MAX_EXPANDED = 384 * 1024 * 1024;
const MAX_ENTRIES = 2000;

function safeName(name: string): string {
  if (
    !name ||
    name.includes("\\") ||
    name.includes(":") ||
    name.includes("\0") ||
    name.startsWith("/") ||
    name.split("/").includes("..")
  )
    throw new Error("Unsafe core archive path");
  return name;
}

/** Read only the expected binary, never materialize archive paths or run bundled scripts. */
export async function archiveExecutable(
  bytes: Buffer,
  archiveName: string,
  executable: string
): Promise<Buffer> {
  let count = 0,
    expanded = 0;
  const found: Buffer[] = [];
  function audit(name: string, size: number) {
    safeName(name);
    if (
      ++count > MAX_ENTRIES ||
      !Number.isSafeInteger(size) ||
      size < 0 ||
      (expanded += size) > MAX_EXPANDED
    )
      throw new Error("Core archive exceeds extraction limits");
  }
  if (archiveName.endsWith(".zip")) {
    const archive = new AdmZip(bytes);
    for (const entry of archive.getEntries()) {
      audit(entry.entryName, entry.header.size);
      const unixType = (entry.header.attr >>> 16) & 0xf000;
      if (![0, 0x8000, 0x4000].includes(unixType))
        throw new Error("Core archive contains a link or special file");
      if (!entry.isDirectory && path.posix.basename(entry.entryName) === executable) {
        const data = entry.getData();
        if (data.length !== entry.header.size) throw new Error("Core archive binary size mismatch");
        found.push(data);
      }
    }
  } else {
    const tar = gunzipSync(bytes, { maxOutputLength: MAX_EXPANDED });
    await new Promise<void>((resolve, reject) => {
      const parser = new Parser({ strict: true, maxMetaEntrySize: 64 * 1024 });
      parser.on("error", reject);
      parser.on("end", resolve);
      parser.on("entry", (entry) => {
        try {
          audit(entry.path, entry.size);
          if (!["File", "Directory"].includes(entry.type))
            throw new Error("Core archive contains a link or special file");
          if (entry.type === "File" && path.posix.basename(entry.path) === executable) {
            const chunks: Buffer[] = [];
            entry.on("data", (chunk: Buffer) => chunks.push(chunk));
            entry.on("end", () => found.push(Buffer.concat(chunks)));
          } else entry.resume();
        } catch (error) {
          parser.abort(error as Error);
          reject(error);
        }
      });
      parser.end(tar);
    });
  }
  return uniqueExecutable(found);
}

function uniqueExecutable(found: Buffer[]): Buffer {
  if (found.length !== 1 || found[0].length === 0 || found[0].length > MAX_EXPANDED)
    throw new Error("Core archive must contain exactly one executable");
  return found[0];
}

async function download(url: string): Promise<Buffer> {
  const response = await fetch(url, { signal: AbortSignal.timeout(120000), redirect: "follow" });
  if (!response.ok || !response.body)
    throw new Error(`Official core download failed: HTTP ${response.status}`);
  const destination = new URL(response.url || url);
  if (
    destination.protocol !== "https:" ||
    ![
      "github.com",
      "release-assets.githubusercontent.com",
      "objects.githubusercontent.com",
    ].includes(destination.hostname)
  )
    throw new Error("Unexpected core download destination");
  const length = Number(response.headers.get("content-length") || 0);
  if (length > MAX_ARCHIVE) throw new Error("Core archive exceeds download limit");
  let total = 0;
  const chunks: Buffer[] = [];
  const reader = response.body.getReader();
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      total += next.value.length;
      if (total > MAX_ARCHIVE) throw new Error("Core archive exceeds download limit");
      chunks.push(Buffer.from(next.value));
    }
  } finally {
    await reader.cancel();
  }
  return Buffer.concat(chunks);
}

async function regularPrivateDirectory(directory: string): Promise<void> {
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  const info = await fs.lstat(directory);
  if (!info.isDirectory() || info.isSymbolicLink())
    throw new Error("Managed core directory must not be a link");
}

export async function installManagedCore(
  core: ManagedCore,
  root: string,
  allowDownload = true
): Promise<string> {
  const release = officialRelease(core);
  const directory = path.join(root, "binaries", core, release.version);
  await regularPrivateDirectory(path.join(root, "binaries"));
  await regularPrivateDirectory(path.join(root, "binaries", core));
  const binaryPath = path.join(directory, release.executable);
  try {
    const metadata = JSON.parse(await fs.readFile(path.join(directory, "verified.json"), "utf8"));
    const info = await fs.lstat(binaryPath);
    const bytes = await fs.readFile(binaryPath);
    if (
      !info.isFile() ||
      info.isSymbolicLink() ||
      metadata.archiveSha256 !== release.sha256 ||
      metadata.binarySha256 !== createHash("sha256").update(bytes).digest("hex")
    )
      throw new Error("Installed core verification failed");
    return binaryPath;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      throw new Error(
        "Installed core verification failed; remove only the damaged managed version before retrying"
      );
  }
  if (!allowDownload)
    throw new Error("Managed core verified binary is missing; save a proxy to install it");
  const bytes = await download(release.url);
  if (createHash("sha256").update(bytes).digest("hex") !== release.sha256)
    throw new Error("Official core archive SHA-256 mismatch");
  const executable = await archiveExecutable(bytes, release.asset, release.executable);
  const temporary = await fs.mkdtemp(path.join(root, "binaries", core, ".install-"));
  try {
    await fs.writeFile(path.join(temporary, release.executable), executable, {
      mode: 0o700,
      flag: "wx",
    });
    await fs.writeFile(
      path.join(temporary, "verified.json"),
      JSON.stringify({
        archiveSha256: release.sha256,
        binarySha256: createHash("sha256").update(executable).digest("hex"),
      }),
      { encoding: "utf8", mode: 0o600, flag: "wx" }
    );
    await fs.rename(temporary, directory);
    return binaryPath;
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
}
