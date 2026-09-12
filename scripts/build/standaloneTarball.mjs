#!/usr/bin/env node
/**
 * Deterministic tar.gz primitives for the shared web build (issue #10321,
 * Stage 8).
 *
 * Why not shell out to system tar: the restore step runs on every desktop
 * matrix leg including Windows, where bsdtar's long-path behavior on deep
 * node_modules trees is not guaranteed. Node's fs layer already proves it can
 * produce and consume this exact tree on Windows today (the legacy per-leg
 * `npm run build` writes it with the same fs), so a pure-Node reader keeps the
 * extraction on the one path layer we know works.
 *
 * Format: ustar with GNU LongLink ('L') entries for paths > 100 chars,
 * typeflag '2' for symlinks, mtime/uid/gid zeroed and modes normalized to
 * 0644/0755 (exec bit only) so the archive of a given tree is byte-identical
 * on every machine.
 */

import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs";
import path from "node:path";
import { once } from "node:events";
import { createGunzip, createGzip } from "node:zlib";
import { normalizeSymlinkTarget } from "./standaloneManifest.mjs";

const BLOCK = 512;

function octal(value, length) {
  return value.toString(8).padStart(length - 1, "0") + "\0";
}

function headerFor(name, size, typeflag, linkname = "", prefix = "", mode = 0o644) {
  const buf = Buffer.alloc(BLOCK, 0);
  buf.write(name.slice(0, 100), 0, 100, "utf8");
  buf.write(octal(typeflag === "5" ? 0o755 : mode, 8), 100);
  buf.write(octal(0, 8), 108); // uid
  buf.write(octal(0, 8), 116); // gid
  buf.write(octal(size, 12), 124);
  buf.write(octal(0, 12), 136); // mtime = 0 for determinism
  buf.write("        ", 148); // checksum placeholder: spaces
  buf.write(typeflag, 156);
  buf.write(linkname.slice(0, 100), 157, 100, "utf8");
  buf.write("ustar\0", 257, 6, "utf8");
  buf.write("00", 263, 2, "utf8");
  buf.write(prefix.slice(0, 155), 345, 155, "utf8");
  let sum = 0;
  for (const byte of buf) sum += byte;
  buf.write(sum.toString(8).padStart(6, "0") + "\0 ", 148);
  return buf;
}

function dataPad(size) {
  const pad = (BLOCK - (size % BLOCK)) % BLOCK;
  return Buffer.alloc(pad, 0);
}

function longLinkEntry(name) {
  const payload = Buffer.from(name + "\0", "utf8");
  return Buffer.concat([
    headerFor("././@LongLink", payload.length, "L"),
    payload,
    dataPad(payload.length),
  ]);
}

/** Emit header (with LongLink/prefix handling) for one entry. */
function entryHeader(relPath, size, typeflag, linkname, mode) {
  const out = [];
  if (relPath.length > 100) {
    const slash = relPath.slice(0, 155).lastIndexOf("/");
    const prefix = slash > 0 ? relPath.slice(0, slash) : "";
    const name = prefix ? relPath.slice(slash + 1) : relPath;
    if (name.length > 100) {
      out.push(longLinkEntry(relPath));
      name = relPath.slice(0, 100);
    }
    out.push(headerFor(name, size, typeflag, linkname, prefix, mode));
  } else {
    out.push(headerFor(relPath, size, typeflag, linkname, undefined, mode));
  }
  return Buffer.concat(out);
}

function* walkFiles(root, current = root) {
  const children = fs
    .readdirSync(current, { withFileTypes: true })
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const child of children) {
    const abs = path.join(current, child.name);
    const rel = path.relative(root, abs).split(path.sep).join("/");
    if (child.isSymbolicLink()) {
      // Same portability normalization as the manifest (issue #11979): an
      // absolute symlink target survives this exact tree on the packing
      // machine, but not the tar round trip to another OS/checkout path.
      // Packing the relative form here is what makes the *restored* symlink
      // actually resolve, not just what makes the manifest comparison match.
      const normalized = normalizeSymlinkTarget(root, rel, fs.readlinkSync(abs));
      if (!normalized.ok) {
        throw new Error(`standalone tarball: ${normalized.reason}`);
      }
      yield { rel, symlink: normalized.value };
    } else if (child.isDirectory()) {
      yield* walkFiles(root, abs);
    } else if (child.isFile()) {
      yield { rel, abs };
    }
  }
}

/** Write a buffer, respecting gzip backpressure. */
async function writeWithBackpressure(stream, buf) {
  if (!stream.write(buf)) await once(stream, "drain");
}

/** Stream one file's bytes into the archive (no whole-file buffering). */
function pipeFileInto(gz, failure, abs) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(abs, { autoClose: true });
    const onDrain = () => stream.resume();
    const detach = () => gz.removeListener("drain", onDrain);
    stream.on("error", (err) => {
      detach();
      reject(err);
    });
    stream.on("data", (chunk) => {
      if (!gz.write(chunk)) stream.pause();
    });
    gz.on("drain", onDrain);
    stream.on("end", () => {
      detach();
      resolve();
    });
  });
}

/** Pack `srcDir` into a deterministic gzipped tarball at `outFile`. */
export async function createTarGz(srcDir, outFile) {
  const out = createWriteStream(outFile);
  const gz = createGzip({ level: 1 });
  gz.pipe(out);

  const failure = new Promise((_, reject) => {
    gz.on("error", reject);
    out.on("error", reject);
  });

  try {
    for (const entry of walkFiles(srcDir)) {
      if (entry.symlink !== undefined) {
        if (entry.symlink.length > 100) {
          throw new Error(`symlink target too long for ustar: ${entry.rel} -> ${entry.symlink}`);
        }
        await writeWithBackpressure(gz, entryHeader(entry.rel, 0, "2", entry.symlink));
        continue;
      }
      const st = fs.statSync(entry.abs);
      const size = st.size;
      const mode = st.mode & 0o111 ? 0o755 : 0o644;
      await writeWithBackpressure(gz, entryHeader(entry.rel, size, "0", undefined, mode));
      if (size > 0) await Promise.race([pipeFileInto(gz, failure, entry.abs), failure]);
      const pad = (BLOCK - (size % BLOCK)) % BLOCK;
      if (pad > 0) await writeWithBackpressure(gz, Buffer.alloc(pad, 0));
    }
    await writeWithBackpressure(gz, Buffer.alloc(BLOCK * 2, 0)); // terminator
    await Promise.race([
      new Promise((resolve, reject) => {
        out.on("finish", resolve);
        out.on("error", reject);
        gz.end();
      }),
      failure,
    ]);
  } catch (err) {
    gz.destroy();
    out.destroy();
    throw err;
  }
}

// ─── extraction ──────────────────────────────────────────────────────────────────

/**
 * Promise-based byte source over a gunzip stream. `read(n)` waits until `n`
 * bytes are buffered (or EOF); `readSome()` returns whatever is available, for
 * streaming large payloads into files without whole-file buffering.
 */
class BlockSource {
  constructor(stream) {
    this.buffer = Buffer.alloc(0);
    this.error = null;
    this.ended = false;
    this.waiter = null;
    stream.on("data", (chunk) => {
      this.buffer = this.buffer.length === 0 ? chunk : Buffer.concat([this.buffer, chunk]);
      this.notify();
    });
    stream.on("end", () => {
      this.ended = true;
      this.notify();
    });
    stream.on("error", (err) => {
      this.error = err;
      this.notify();
    });
  }

  notify() {
    if (this.waiter) {
      const waiter = this.waiter;
      this.waiter = null;
      waiter();
    }
  }

  readSome() {
    return new Promise((resolve, reject) => {
      const attempt = () => {
        if (this.error) return reject(this.error);
        if (this.buffer.length > 0) {
          const out = this.buffer;
          this.buffer = Buffer.alloc(0);
          return resolve(out);
        }
        if (this.ended) return resolve(null);
        this.waiter = attempt;
      };
      attempt();
    });
  }

  unshift(buf) {
    if (buf && buf.length > 0) this.buffer = Buffer.concat([buf, this.buffer]);
  }

  async read(n) {
    let acc = null;
    let remaining = n;
    while (remaining > 0) {
      const chunk = await this.readSome();
      if (chunk === null) return null; // EOF before n bytes
      if (chunk.length > remaining) {
        acc = acc
          ? Buffer.concat([acc, chunk.subarray(0, remaining)])
          : chunk.subarray(0, remaining);
        this.unshift(chunk.subarray(remaining));
        remaining = 0;
      } else {
        acc = acc ? Buffer.concat([acc, chunk]) : chunk;
        remaining -= chunk.length;
      }
    }
    return acc ?? Buffer.alloc(0);
  }
}

function parseOctal(header, offset, length) {
  const raw = header.toString("utf8", offset, offset + length).replace(/[\0 ]+$/, "");
  return raw.length === 0 ? 0 : Number.parseInt(raw, 8);
}

function cstring(header, offset, length) {
  const raw = header.toString("utf8", offset, offset + length);
  const nul = raw.indexOf("\0");
  return nul === -1 ? raw : raw.slice(0, nul);
}

function checksumMatches(header) {
  const stored = parseOctal(header, 148, 8);
  const probe = Buffer.from(header);
  probe.fill(" ", 148, 156); // checksum field counts as spaces while summing
  let sum = 0;
  for (const byte of probe) sum += byte;
  return sum === stored;
}

/** Stream exactly `size` bytes from the reader into `outStream`. */
async function copyN(reader, size, outStream) {
  let remaining = size;
  while (remaining > 0) {
    const chunk = await reader.readSome();
    if (chunk === null) {
      throw new Error(`unexpected EOF after ${size - remaining} of ${size} bytes`);
    }
    const take = chunk.length > remaining ? chunk.subarray(0, remaining) : chunk;
    if (chunk.length > remaining) reader.unshift(chunk.subarray(remaining));
    remaining -= take.length;
    if (!outStream.write(take)) await once(outStream, "drain");
  }
}

/**
 * Extract a tarball written by `createTarGz` (ustar + GNU LongLink) into
 * `destDir`. Returns the number of entries written.
 */
export async function extractTarGz(archiveFile, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const src = createReadStream(archiveFile);
  const gunzip = createGunzip();
  src.pipe(gunzip);
  const reader = new BlockSource(gunzip);

  const zeros = Buffer.alloc(BLOCK);
  let longName = null;
  let longLink = null;
  let entries = 0;

  for (;;) {
    const header = await reader.read(BLOCK);
    if (header === null) break; // tolerate archives missing the final zero blocks
    if (header.equals(zeros)) {
      const second = await reader.read(BLOCK);
      if (second !== null && !second.equals(zeros)) {
        throw new Error("corrupt archive: data after terminator block");
      }
      break;
    }
    if (!checksumMatches(header)) {
      throw new Error(`tar header checksum mismatch at entry #${entries + 1}`);
    }

    let name = cstring(header, 0, 100);
    const size = parseOctal(header, 124, 12);
    const typeflag = String.fromCharCode(header[156] || 0x30);
    let linkname = cstring(header, 157, 100);
    const prefix = cstring(header, 345, 155);
    if (prefix) name = `${prefix}/${name}`;
    if (longName !== null) {
      name = longName;
      longName = null;
    }
    if (longLink !== null) {
      linkname = longLink;
      longLink = null;
    }

    const pad = (BLOCK - (size % BLOCK)) % BLOCK;

    if (typeflag === "L" || typeflag === "K") {
      const payload = await reader.read(size);
      if (payload === null) throw new Error("unexpected EOF in LongLink payload");
      const value = cstring(payload, 0, payload.length);
      if (typeflag === "L") longName = value;
      else longLink = value;
      if (pad > 0) await reader.read(pad);
      continue;
    }

    const target = safeJoin(destDir, name);

    if (typeflag === "5") {
      fs.mkdirSync(target, { recursive: true });
    } else if (typeflag === "2") {
      if (linkname.length === 0) throw new Error(`symlink entry ${name} has empty target`);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.rmSync(target, { force: true });
      // Standalone node_modules symlinks are always file symlinks (npm
      // bin-links, package aliasing); an explicit type hint removes
      // Windows' undocumented auto-detect ambiguity for CreateSymbolicLink.
      fs.symlinkSync(linkname, target, "file");
    } else if (typeflag === "1") {
      const sourceAbs = safeJoin(destDir, linkname);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(sourceAbs, target);
    } else {
      // Regular file ("0" or "\0"). The packer never stores directory entries,
      // so parent directories are materialized here.
      fs.mkdirSync(path.dirname(target), { recursive: true });
      const sink = createWriteStream(target, { flags: "w" });
      const finished = once(sink, "finish");
      sink.on("error", (err) => gunzip.destroy(err));
      await copyN(reader, size, sink);
      sink.end();
      await finished;
      const storedMode = parseOctal(header, 100, 8);
      if (storedMode) fs.chmodSync(target, storedMode);
    }
    if (pad > 0) {
      const skip = await reader.read(pad);
      if (skip === null) throw new Error(`unexpected EOF in padding of ${name}`);
    }
    entries += 1;
  }

  src.destroy();
  return { entries };
}

function safeJoin(destDir, name) {
  const normalized = path.normalize(name).split(path.sep).join("/");
  if (normalized.startsWith("/") || normalized.split("/").includes("..")) {
    throw new Error(`unsafe tar entry path: ${name}`);
  }
  return path.join(destDir, ...normalized.split("/"));
}
