/**
 * Gemini Live WebSocket file-mode audio transcription.
 *
 * NOTE: This operates in FILE mode, not realtime: it transcribes an uploaded
 * audio file by converting it to 16kHz mono PCM, streaming it to Gemini Live
 * (bidiGenerateContent) over WebSocket, and collecting the finalized
 * inputTranscription. Interim hypotheses are intentionally omitted.
 */

import { Buffer } from "node:buffer";
import { spawn } from "node:child_process";
import WebSocket from "ws";
import { sleep } from "../utils/sleep.ts";

export interface GeminiLiveCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

export interface GeminiLiveTranscribeOptions {
  model: string;
  audioBuffer: Buffer;
  prompt?: string;
  language?: string;
  baseUrl?: string;
}

export class GeminiLiveError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "GeminiLiveError";
    this.status = status;
  }
}

/**
 * Detect if a buffer is already a 16kHz 16-bit mono PCM WAV file.
 * If so, extracts the raw PCM sample bytes without running FFmpeg.
 */
export function extractPcmFrom16kWav(buffer: Buffer): Buffer | null {
  if (buffer.length < 44) return null;
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
    return null;
  }

  let offset = 12;
  let isPcm16k = false;

  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkDataOffset = offset + 8;

    if (chunkId === "fmt ") {
      if (chunkSize < 16) return null;
      const audioFormat = buffer.readUInt16LE(chunkDataOffset); // 1 = PCM
      const numChannels = buffer.readUInt16LE(chunkDataOffset + 2); // 1 = mono
      const sampleRate = buffer.readUInt32LE(chunkDataOffset + 4); // 16000
      const bitsPerSample = buffer.readUInt16LE(chunkDataOffset + 14); // 16

      if (audioFormat === 1 && numChannels === 1 && sampleRate === 16000 && bitsPerSample === 16) {
        isPcm16k = true;
      } else {
        return null;
      }
    } else if (chunkId === "data") {
      if (isPcm16k) {
        const dataEnd = Math.min(chunkDataOffset + chunkSize, buffer.length);
        return buffer.subarray(chunkDataOffset, dataEnd);
      }
    }

    // Chunks in WAV are 2-byte aligned
    offset = chunkDataOffset + chunkSize + (chunkSize % 2);
  }

  return null;
}

/**
 * Convert arbitrary audio data (MP3, WAV, AAC, etc.) to 16kHz mono 16-bit LE PCM using FFmpeg.
 */
export async function convertToPcm16k(audioBuffer: Buffer): Promise<Buffer> {
  const existingPcm = extractPcmFrom16kWav(audioBuffer);
  if (existingPcm && existingPcm.length > 0) {
    return existingPcm;
  }

  return new Promise<Buffer>((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      "pipe:0",
      "-f",
      "s16le",
      "-acodec",
      "pcm_s16le",
      "-ac",
      "1",
      "-ar",
      "16000",
      "pipe:1",
    ]);

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    ffmpeg.stdout.on("data", (chunk: Buffer) => stdoutChunks.push(chunk));
    ffmpeg.stderr.on("data", (chunk: Buffer) => stderrChunks.push(chunk));

    ffmpeg.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "ENOENT") {
        reject(
          new GeminiLiveError(
            "FFmpeg is required for converting audio to 16kHz PCM, but was not found on PATH.",
            500
          )
        );
      } else {
        reject(new GeminiLiveError(`FFmpeg process error: ${err.message}`, 500));
      }
    });

    ffmpeg.on("close", (code) => {
      if (code !== 0) {
        const stderrMsg = Buffer.concat(stderrChunks).toString("utf-8").trim();
        reject(
          new GeminiLiveError(
            `FFmpeg audio conversion failed (exit code ${code}): ${stderrMsg || "unknown error"}`,
            400
          )
        );
      } else {
        resolve(Buffer.concat(stdoutChunks));
      }
    });

    ffmpeg.stdin.end(audioBuffer);
  });
}

const DEFAULT_GEMINI_LIVE_WS_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

export function resolveLiveWsUrlAndHeaders(
  credentials: GeminiLiveCredentials,
  configuredBaseUrl?: string
): { url: string; headers: Record<string, string> } {
  const base =
    (typeof credentials?.providerSpecificData?.baseUrl === "string" &&
      credentials.providerSpecificData.baseUrl.trim()) ||
    configuredBaseUrl ||
    DEFAULT_GEMINI_LIVE_WS_URL;

  const wsUrl = new URL(base);
  const headers: Record<string, string> = {};

  const apiKey =
    typeof credentials.apiKey === "string" && credentials.apiKey.trim().length > 0
      ? credentials.apiKey.trim()
      : null;
  const accessToken =
    typeof credentials.accessToken === "string" && credentials.accessToken.trim().length > 0
      ? credentials.accessToken.trim()
      : null;

  if (apiKey) {
    wsUrl.searchParams.set("key", apiKey);
    headers["x-goog-api-key"] = apiKey;
  } else if (accessToken) {
    wsUrl.searchParams.set("access_token", accessToken);
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    throw new GeminiLiveError("No credentials for Gemini Live transcription", 401);
  }

  return { url: wsUrl.toString(), headers };
}

/**
 * Transcribe an audio file using Gemini Live WebSocket (bidiGenerateContent).
 *
 * NOTE: This operates in FILE mode, not realtime: it collects the finalized
 * inputTranscription from the upstream session and returns the complete text
 * when done. Interim hypotheses are intentionally omitted.
 */
export async function geminiLiveTranscribe(
  credentials: GeminiLiveCredentials,
  options: GeminiLiveTranscribeOptions
): Promise<string> {
  const pcmBuffer = await convertToPcm16k(options.audioBuffer);

  const { url, headers } = resolveLiveWsUrlAndHeaders(credentials, options.baseUrl);

  return new Promise<string>((resolve, reject) => {
    let ws: WebSocket | null = null;
    let isSettled = false;
    let audioStreamEnded = false;
    let finishTimer: NodeJS.Timeout | null = null;
    let maxWaitTimer: NodeJS.Timeout | null = null;
    const transcripts: string[] = [];

    const cleanup = () => {
      if (finishTimer) {
        clearTimeout(finishTimer);
        finishTimer = null;
      }
      if (maxWaitTimer) {
        clearTimeout(maxWaitTimer);
        maxWaitTimer = null;
      }
      if (ws) {
        try {
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close(1000);
          }
        } catch {
          /* ignore close errors */
        }
      }
    };

    const settleResolve = (text: string) => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      resolve(text);
    };

    const settleReject = (err: Error) => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      reject(err);
    };

    // Overall safety timeout (120 seconds for processing up to 4-min file)
    maxWaitTimer = setTimeout(() => {
      settleReject(new GeminiLiveError("Gemini Live transcription timed out", 504));
    }, 120_000);

    try {
      ws = new WebSocket(url, { headers });
    } catch (err) {
      settleReject(
        new GeminiLiveError(
          `Failed to initialize WebSocket: ${err instanceof Error ? err.message : String(err)}`,
          500
        )
      );
      return;
    }

    const scheduleFinish = (delayMs = 300) => {
      if (finishTimer) clearTimeout(finishTimer);
      finishTimer = setTimeout(() => {
        const text = transcripts
          .map((t) => t.trim())
          .filter(Boolean)
          .join(" ")
          .trim();
        settleResolve(text);
      }, delayMs);
    };

    const streamAudio = async () => {
      try {
        const CHUNK_SIZE = 3200; // 100ms at 16kHz 16-bit mono
        for (let offset = 0; offset < pcmBuffer.length; offset += CHUNK_SIZE) {
          if (!ws || ws.readyState !== WebSocket.OPEN) {
            throw new GeminiLiveError("WebSocket disconnected while streaming audio", 500);
          }
          const chunk = pcmBuffer.subarray(offset, Math.min(offset + CHUNK_SIZE, pcmBuffer.length));
          ws.send(
            JSON.stringify({
              realtimeInput: {
                audio: {
                  data: chunk.toString("base64"),
                  mimeType: "audio/pcm;rate=16000",
                },
              },
            })
          );
          if (ws.bufferedAmount > 65536) {
            await sleep(15);
          }
        }

        // End of audio stream
        if (ws && ws.readyState === WebSocket.OPEN) {
          audioStreamEnded = true;
          ws.send(
            JSON.stringify({
              realtimeInput: {
                audioStreamEnd: true,
              },
            })
          );
          // Wait up to 5 seconds after stream end if no turnComplete arrives (e.g. music-only or silence)
          scheduleFinish(5000);
        }
      } catch (err) {
        settleReject(err instanceof Error ? err : new Error(String(err)));
      }
    };

    ws.on("open", () => {
      const rawModel = options.model || "gemini-3.5-transcribe-live";
      const modelName = rawModel.startsWith("models/") ? rawModel : `models/${rawModel}`;

      const setupMessage: Record<string, unknown> = {
        setup: {
          model: modelName,
          generationConfig: {
            responseModalities: ["TEXT"],
          },
          inputAudioTranscription: {
            languageCodes:
              typeof options.language === "string" && options.language.trim()
                ? [options.language.trim()]
                : [],
          },
          ...(typeof options.prompt === "string" && options.prompt.trim()
            ? {
                systemInstruction: {
                  parts: [{ text: options.prompt.trim() }],
                },
              }
            : {}),
        },
      };

      ws!.send(JSON.stringify(setupMessage));
    });

    ws.on("message", (raw) => {
      try {
        const data = JSON.parse(raw.toString());

        // Check for error payload from server
        if (data.error) {
          const code = typeof data.error.code === "number" ? data.error.code : 500;
          const msg = data.error.message || "Gemini Live upstream error";
          settleReject(new GeminiLiveError(msg, code));
          return;
        }

        // Setup complete → start streaming audio
        if (data.setupComplete || data.setup_complete) {
          streamAudio().catch(settleReject);
          return;
        }

        // Collect server content
        const serverContent = data.serverContent || data.server_content;
        if (serverContent) {
          const inputTranscription =
            serverContent.inputTranscription || serverContent.input_transcription;
          if (inputTranscription?.text && typeof inputTranscription.text === "string") {
            transcripts.push(inputTranscription.text);
          }

          const isTurnComplete =
            Boolean(serverContent.turnComplete) ||
            Boolean(serverContent.turn_complete) ||
            Boolean(serverContent.generationComplete) ||
            Boolean(serverContent.generation_complete);

          if (isTurnComplete && audioStreamEnded) {
            scheduleFinish(250);
          }
        }
      } catch {
        /* ignore JSON parse errors for non-json frames */
      }
    });

    ws.on("error", (err: Error) => {
      let status = 500;
      const statusMatch = /Unexpected server response: (\d{3})/.exec(err.message);
      if (statusMatch) {
        status = parseInt(statusMatch[1], 10);
      } else if (/quota|429|resource_exhausted/i.test(err.message)) {
        status = 429;
      } else if (/401|unauthorized|unauthenticated/i.test(err.message)) {
        status = 401;
      } else if (/403|forbidden/i.test(err.message)) {
        status = 403;
      }
      settleReject(new GeminiLiveError(`Gemini Live WebSocket error: ${err.message}`, status));
    });

    ws.on("close", (code, reason) => {
      if (isSettled) return;
      if (audioStreamEnded) {
        scheduleFinish(0);
      } else {
        const reasonStr = reason ? reason.toString() : "";
        settleReject(
          new GeminiLiveError(
            `Gemini Live connection closed unexpectedly (code: ${code}${reasonStr ? `, reason: ${reasonStr}` : ""})`,
            code === 1008 || code === 4429 ? 429 : 502
          )
        );
      }
    });
  });
}
