#!/usr/bin/env node
/** Explicitly paid, loopback-only probe. Receipts contain digests/statuses, never response text. */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { z } from "zod";

const contextSchema = z
  .object({
    baseUrl: z.literal("http://127.0.0.1:20428"),
    owner: z.string().min(1),
    stranger: z.string().min(1),
    cliToken: z.string().min(1),
  })
  .strict();

export function validateVideoLiveContext(value: unknown) {
  return contextSchema.parse(value);
}

function digest(value: string | Buffer) {
  return createHash("sha256").update(value).digest("hex");
}

export async function executeVideoLiveSmoke(directory: string, executeReal: boolean) {
  if (!executeReal) return { status: "HOLD", reason: "EXPLICIT_REAL_EXECUTION_REQUIRED" };
  const resolved = fs.realpathSync(directory);
  if (
    !/^omniroute-video-live-[A-Za-z0-9]+$/.test(path.basename(resolved)) ||
    path.dirname(resolved) !== "/tmp"
  )
    throw new Error("Private prepared directory required");
  const context = validateVideoLiveContext(
    JSON.parse(fs.readFileSync(path.join(resolved, "client-context.json"), "utf8"))
  );
  const startedAt = new Date().toISOString();
  if (execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim()) {
    throw new Error("Freeze and commit the candidate before real execution");
  }
  const audioFile = path.join(resolved, "speech.wav");
  try {
    execFileSync(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "lavfi",
        "-i",
        "flite=text='The blue screen is visible. The test number is seven.'",
        "-ac",
        "1",
        "-ar",
        "16000",
        "-y",
        audioFile,
      ],
      { timeout: 30_000, stdio: "ignore" }
    );
    const audio = fs.readFileSync(audioFile);
    const form = new FormData();
    form.set("file", new Blob([audio]), "speech.wav");
    form.set("model", "deepgram/nova-3");
    form.set("response_format", "verbose_json");
    const response = await fetch(`${context.baseUrl}/v1/audio/transcriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${context.owner}` },
      body: form,
      signal: AbortSignal.timeout(120_000),
    });
    const body = await response.text();
    let text = "";
    try {
      const parsed: unknown = JSON.parse(body);
      text = z.object({ text: z.string() }).parse(parsed).text;
    } catch {
      /* status-only failure */
    }
    const result = {
      kind: "video-live-stt-preflight",
      candidateSha: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      startedAt,
      finishedAt: new Date().toISOString(),
      status: response.ok && /blue/i.test(text) && /seven|7/i.test(text) ? "PASS" : "FAIL",
      httpStatus: response.status,
      model: "deepgram/nova-3",
      mediaDigest: digest(audio),
      responseDigest: digest(body),
      recognizedBlue: /blue/i.test(text),
      recognizedSeven: /seven|7/i.test(text),
      scope: "real-stt-endpoint-only; not video hotpath or release acceptance",
    };
    fs.writeFileSync(
      path.join(resolved, "stt-preflight-receipt.json"),
      JSON.stringify(result, null, 2) + "\n",
      { mode: 0o600 }
    );
    // Speech is generated/non-private, but even that input is temporary.
    return result;
  } finally {
    if (fs.existsSync(audioFile)) fs.unlinkSync(audioFile);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  executeVideoLiveSmoke(process.env.DATA_DIR || "", process.argv.includes("--execute-real"))
    .then((result) => {
      console.log(JSON.stringify(result));
      if (result.status === "FAIL") process.exitCode = 1;
    })
    .catch(() => {
      console.error("Live STT preflight failed; no raw payload or credential printed.");
      process.exitCode = 1;
    });
}
