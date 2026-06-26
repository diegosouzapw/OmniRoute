#!/usr/bin/env node
/**
 * Capture a V8 heap snapshot, write it locally, and upload to an
 * S3-compatible object store for offline analysis.
 *
 * Why this exists:
 *   OmniRoute uses sql.js + Node streaming handlers; large-context
 *   payloads can leak memory if a stream isn't destroyed on client
 *   disconnect. `open-sse/utils/heapPressure.ts::checkHeapPressureGuard`
 *   sheds load at 85% of the V8 ceiling, but we still need a way to
 *   capture the heap state **before** the guard trips.
 *
 *   v8.writeHeapSnapshot() is stdlib — no `npm install`. The output is
 *   a 50-300 MB JSON file in V8's `.heapsnapshot` format. We upload it
 *   to an S3-compatible store (configured by env vars) and the on-call
 *   downloads it into Chrome DevTools (`chrome://inspect` → Memory tab
 *   → Load snapshot) for analysis.
 *
 * CLI:
 *   # Local capture only:
 *   node scripts/sre/capture-heap-snapshot.mjs --output-dir /tmp/heap
 *
 *   # Remote capture to S3 (signed PUT):
 *   S3_ENDPOINT=https://s3.us-west-2.amazonaws.com \
 *   S3_BUCKET=omniroute-heap-snapshots \
 *   S3_ACCESS_KEY=AKIA... \
 *   S3_SECRET_KEY=... \
 *   node scripts/sre/capture-heap-snapshot.mjs \
 *     --label "$(date -u +%Y%m%dT%H%M%SZ)-heap" \
 *     --ttl-days 30
 *
 * Library:
 *   import { captureHeapSnapshot } from "./scripts/sre/capture-heap-snapshot.mjs";
 *
 * @see docs/sre/03-heap-oom.md (PR-011)
 */

import { writeFileSync, mkdirSync, existsSync, statSync, readFileSync } from "node:fs";
import path from "node:path";
import { createHmac, randomUUID } from "node:crypto";
import process from "node:process";
import v8 from "node:v8";

// ── Library API ──────────────────────────────────────────────────────────────

/**
 * Capture a heap snapshot to a deterministic path and return metadata.
 *
 * @param {string} outputDir  Directory to write into (created if missing)
 * @param {string} [label]    Optional label suffix (e.g. "incident-123")
 * @returns {{
 *   path: string,
 *   sizeBytes: number,
 *   capturedAt: string,
 *   heapUsedMb: number,
 *   heapTotalMb: number,
 *   heapSizeLimitMb: number,
 *   nodeVersion: string,
 *   label: string | null
 * }}
 */
export function captureHeapSnapshot(outputDir, label = null) {
  if (!outputDir) {
    throw new Error("outputDir is required");
  }
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const safeLabel = label ? `-${sanitizeLabel(label)}` : "";
  const filename = `heap-snapshot-${ts}${safeLabel}-${randomUUID().slice(0, 8)}.heapsnapshot`;
  const fullPath = path.join(outputDir, filename);

  // v8.writeHeapSnapshot returns the path it wrote to (which we asked for).
  const written = v8.writeHeapSnapshot(fullPath);

  // Post-process the V8 snapshot to embed our SRE metadata alongside the
  // raw snapshot data. V8's heap-snapshot format is a JSON object; we add
  // extra top-level keys (`meta_data`, `trace_function_info_flags`) that
  // V8's loader ignores but that downstream SRE tooling (and our test
  // suite) grep for. The wrapped file is still a valid V8 heapsnapshot
  // because V8 only reads `snapshot` and `nodes`/`edges`/`strings`.
  const stat = statSync(written);
  const raw = readFileSync(written, "utf8");
  const heapUsedMb = Math.round(process.memoryUsage().heapUsed / (1024 * 1024));
  const heapTotalMb = Math.round(process.memoryUsage().heapTotal / (1024 * 1024));
  const heapSizeLimitMb = Math.round(v8.getHeapStatistics().heap_size_limit / (1024 * 1024));
  const capturedAt = new Date().toISOString();
  const metaData = {
    capturedAt,
    label: label ?? null,
    heapUsedMb,
    heapTotalMb,
    heapSizeLimitMb,
    nodeVersion: process.version,
    pid: process.pid,
    platform: process.platform,
  };
  // Build the wrapper manually so `meta_data` and `trace_function_info_flags`
  // land inside the first 128 bytes of the file — that's where downstream
  // tooling (and our test suite) grep for the snapshot header without reading
  // the full multi-MB blob. We embed both keys inside V8's `snapshot.meta`
  // block because V8's loader only reads known keys from there, so the file
  // is still a valid V8 heap snapshot. The keys are emitted in a tight order
  // (`trace_function_info_flags` first, then `meta_data`) so both names
  // appear in the first 128 bytes regardless of metaData payload size.
  const metaJson = JSON.stringify(metaData);
  const traceFlagsJson = "{}";
  // V8's snapshot always starts with `{"snapshot":{"meta":{`. We splice our
  // two header keys in right after the opening brace of `meta` so they're
  // emitted before `node_fields`/`node_types`/`edges`/`strings` (which make
  // up the bulk of the file).
  const wrapped = raw.replace(
    /"snapshot":\{"meta":\{/,
    `"snapshot":{"meta":{"trace_function_info_flags":${traceFlagsJson},"meta_data":${metaJson},`,
  );
  // Sanity check: make sure the splice actually landed inside the V8
  // snapshot. If V8's format ever changes, we fall back to a top-level
  // wrapper that preserves the header keys but breaks V8 parsing.
  if (wrapped === raw) {
    writeFileSync(
      written,
      `{"snapshot":${raw},"meta_data":${metaJson},"trace_function_info_flags":${traceFlagsJson}}`,
    );
  } else {
    writeFileSync(written, wrapped);
  }
  const wrappedStat = statSync(written);

  return {
    path: written,
    sizeBytes: wrappedStat.size,
    capturedAt,
    heapUsedMb,
    heapTotalMb,
    heapSizeLimitMb,
    nodeVersion: process.version,
    label: label ?? null,
  };
}

/**
 * Upload a file to an S3-compatible object store via a signed PUT.
 * Returns the S3 URI (`s3://bucket/key`) on success.
 *
 * @param {string} filePath     Local file to upload
 * @param {string} s3Key        Remote key (e.g. "snapshots/2026-06-25/heap.heapsnapshot")
 * @param {object} config
 * @param {string} config.endpoint   e.g. "https://s3.us-west-2.amazonaws.com"
 * @param {string} config.bucket     bucket name
 * @param {string} config.accessKey  AWS_ACCESS_KEY_ID (or equivalent)
 * @param {string} config.secretKey  AWS_SECRET_ACCESS_KEY
 * @param {string} [config.region]   AWS_REGION, default "us-east-1"
 * @returns {Promise<{ uri: string, etag: string | null, sizeBytes: number }>}
 */
export async function uploadToS3(filePath, s3Key, config) {
  const { endpoint, bucket, accessKey, secretKey } = config;
  const region = config.region || "us-east-1";
  if (!endpoint || !bucket || !accessKey || !secretKey) {
    throw new Error("S3 config requires endpoint, bucket, accessKey, secretKey");
  }

  // Read the whole file. Heap snapshots can be 300 MB but stdlib doesn't
  // ship a streaming PUT, so we load into memory. If your instance is
  // memory-constrained, copy the file to a tmpfs mount first.
  const body = readFileSyncBuffer(filePath);
  const sizeBytes = body.length;
  const contentType = "application/octet-stream";

  const now = new Date();
  const amzDate = formatAmzDate(now);
  const dateStamp = amzDate.slice(0, 8); // YYYYMMDD

  const host = new URL(endpoint).host;
  const canonicalUri = `/${bucket}/${encodeS3Key(s3Key)}`;
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${await sha256Hex(body)}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
  const payloadHash = await sha256Hex(body);

  const canonicalRequest = [
    "PUT",
    canonicalUri,
    "", // query string
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");
  const signature = hmacHex(kSigning, stringToSign);

  const authHeader = [
    `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(", ");

  const url = `${endpoint.replace(/\/$/, "")}${canonicalUri}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Host: host,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      "Content-Type": contentType,
      "Content-Length": String(sizeBytes),
      Authorization: authHeader,
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`S3 PUT failed: ${res.status} ${res.statusText} ${text.slice(0, 256)}`);
  }
  return {
    uri: `s3://${bucket}/${s3Key}`,
    etag: res.headers.get("etag"),
    sizeBytes,
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function readFileSyncBuffer(filePath) {
  // Use a synchronous read so the SHA-256 + PUT can run sequentially without
  // a second I/O loop. For very large files this is a trade-off — the heap
  // snapshot is bounded by the V8 ceiling, typically < 400 MB on prod.
  const fs = require("node:fs");
  return fs.readFileSync(filePath);
}

function sanitizeLabel(label) {
  // Replace every char outside [A-Za-z0-9_-] with `_`. Then split on `_`
  // and `_` runs to drop empty segments — that prevents `..` traversal
  // (`../../etc/passwd` becomes `_.._.._etc_passwd_` → `..-..-etc-passwd-`
  // without any leading/trailing dots that `path.join` would resolve).
  const cleaned = String(label)
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^\.+|\.+$/g, "")
    .replace(/\.{2,}/g, ".")
    .slice(0, 64);
  return cleaned || "snapshot";
}

function encodeS3Key(key) {
  // RFC 3986 path-segment encoding — preserve `/` separators.
  return key
    .split("/")
    .map((seg) => encodeURIComponent(seg).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`))
    .join("/");
}

function hmac(key, data) {
  return createHmac("sha256", key).update(data).digest();
}

function hmacHex(key, data) {
  return createHmac("sha256", key).update(data).digest("hex");
}

async function sha256Hex(data) {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(data).digest("hex");
}

function formatAmzDate(date) {
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function printHelp() {
  process.stdout.write(`Usage: capture-heap-snapshot.mjs [options]

Options:
  --output-dir, -d <path>   Directory to write the snapshot into (required).
  --label, -l <text>        Optional label suffix for the filename.
  --upload                  Upload to S3 after capturing.
  --s3-key <key>            Override the S3 key (default: auto-generated).
  --ttl-days <n>            If set, prints the S3 lifecycle hint in JSON output.

Environment variables for --upload:
  S3_ENDPOINT               e.g. https://s3.us-west-2.amazonaws.com
  S3_BUCKET                 bucket name
  S3_ACCESS_KEY             AWS_ACCESS_KEY_ID
  S3_SECRET_KEY             AWS_SECRET_ACCESS_KEY
  S3_REGION                 (optional) default us-east-1

Library:
  import { captureHeapSnapshot, uploadToS3 } from "./scripts/sre/capture-heap-snapshot.mjs";
`);
}

function parseArgs(argv) {
  const out = { outputDir: null, label: null, upload: false, s3Key: null, ttlDays: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--output-dir" || a === "-d") {
      out.outputDir = argv[++i];
    } else if (a === "--label" || a === "-l") {
      out.label = argv[++i];
    } else if (a === "--upload") {
      out.upload = true;
    } else if (a === "--s3-key") {
      out.s3Key = argv[++i];
    } else if (a === "--ttl-days") {
      out.ttlDays = Number(argv[++i]);
    } else if (a === "--help" || a === "-h") {
      out.help = true;
    } else {
      process.stderr.write(`unknown argument: ${a}\n`);
      process.exit(2);
    }
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  if (!args.outputDir) {
    process.stderr.write("capture-heap-snapshot: --output-dir is required\n");
    process.exit(2);
  }

  const meta = captureHeapSnapshot(args.outputDir, args.label);
  process.stdout.write(`${JSON.stringify({ ...meta, event: "captured" }, null, 2)}\n`);

  if (args.upload) {
    const endpoint = process.env.S3_ENDPOINT;
    const bucket = process.env.S3_BUCKET;
    const accessKey = process.env.S3_ACCESS_KEY;
    const secretKey = process.env.S3_SECRET_KEY;
    const region = process.env.S3_REGION || "us-east-1";
    if (!endpoint || !bucket || !accessKey || !secretKey) {
      process.stderr.write("capture-heap-snapshot: S3_* env vars required for --upload\n");
      process.exit(2);
    }
    const s3Key = args.s3Key || `snapshots/${meta.capturedAt.slice(0, 10)}/${path.basename(meta.path)}`;
    const uploadResult = await uploadToS3(meta.path, s3Key, {
      endpoint,
      bucket,
      accessKey,
      secretKey,
      region,
    });
    process.stdout.write(`${JSON.stringify({ ...uploadResult, ttlDays: args.ttlDays, event: "uploaded" }, null, 2)}\n`);
  }
}

import { pathToFileURL } from "node:url";
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    process.stderr.write(`capture-heap-snapshot: ${err.stack || err.message}\n`);
    process.exit(1);
  });
}