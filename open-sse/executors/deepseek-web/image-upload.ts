import { createHash } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { z } from "zod";
import { fetchRemoteMedia } from "@/shared/network/remoteImageFetch";
import { sniffCursorImageFormat } from "../../utils/cursorImages.ts";
import { detectMediaParts } from "../../utils/mediaParts.ts";

const UPLOAD_PATH = "/api/v0/file/upload_file";
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
const MAX_IMAGES = 10;
const CACHE_TTL_MS = 30 * 60 * 1000;
const cachedFiles = new Map<string, { id: string; expiresAt: number }>();
const fileSchema = z
  .object({ id: z.string().min(1).max(256), status: z.string().optional() })
  .passthrough();
const envelopeSchema = z
  .object({
    code: z.number().optional(),
    data: z
      .object({ biz_code: z.number().optional(), biz_data: z.unknown().optional() })
      .passthrough(),
  })
  .passthrough();

export class DeepSeekImageError extends Error {
  constructor(
    message: string,
    readonly status = 502
  ) {
    super(message);
    this.name = "DeepSeekImageError";
  }
}

export interface ImageUploadOptions {
  messages: ReadonlyArray<{ role?: string; content?: unknown }>;
  headers: Record<string, string>;
  createPowHeader: (targetPath: string, signal: AbortSignal) => Promise<string>;
  signal?: AbortSignal | null;
  // Injectable timing keeps processing/timeout tests independent of wall-clock sleeps.
  timeoutMs?: number;
  pollMs?: number;
}

async function readEnvelope(response: Response): Promise<unknown> {
  if (!response.ok) {
    await response.body?.cancel();
    throw new DeepSeekImageError(
      `DeepSeek image request failed (HTTP ${response.status})`,
      response.status
    );
  }
  const result = envelopeSchema.safeParse(await response.json());
  if (!result.success) throw new DeepSeekImageError("Invalid DeepSeek image response");
  const { code, data } = result.data;
  if ((code !== undefined && code !== 0) || (data.biz_code !== undefined && data.biz_code !== 0)) {
    throw new DeepSeekImageError("DeepSeek rejected the image request", code === 40003 ? 401 : 502);
  }
  return data.biz_data;
}

function parseFile(value: unknown): z.infer<typeof fileSchema> {
  const result = fileSchema.safeParse(value);
  if (!result.success) throw new DeepSeekImageError("DeepSeek image response has no file ID");
  return result.data;
}

export async function resolveDeepSeekImages(
  messages: ImageUploadOptions["messages"],
  signal?: AbortSignal
) {
  const refs = [
    ...new Set(
      detectMediaParts(messages)
        .filter((p) => p.kind === "image")
        .map((p) => p.ref)
    ),
  ];
  if (refs.length > MAX_IMAGES)
    throw new DeepSeekImageError("DeepSeek supports at most 10 images per request", 400);
  const images: Array<{ data: Uint8Array<ArrayBuffer>; mime: string; filename: string }> = [];
  let total = 0;
  for (const ref of refs) {
    signal?.throwIfAborted();
    let data: Buffer<ArrayBuffer>;
    if (ref.startsWith("data:")) {
      const comma = ref.indexOf(",");
      const header = ref.slice(0, comma);
      const payload = ref.slice(comma + 1);
      if (
        !/^data:image\/(?:png|jpe?g|gif|webp);base64$/i.test(header) ||
        !payload ||
        payload.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4 ||
        !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)
      ) {
        throw new DeepSeekImageError(
          "Expected a base64 PNG, JPEG, GIF or WebP image (maximum 20 MiB)",
          400
        );
      }
      data = Buffer.from(payload, "base64");
      if (data.toString("base64").replace(/=+$/, "") !== payload.replace(/=+$/, "")) {
        throw new DeepSeekImageError("Invalid base64 image", 400);
      }
    } else {
      if (!ref.startsWith("https://"))
        throw new DeepSeekImageError("Image URLs must use HTTPS", 400);
      try {
        const result = await fetchRemoteMedia(ref, {
          guard: "public-only",
          pinDns: true,
          enforceHttps: true,
          maxBytes: MAX_IMAGE_BYTES,
          signal,
        });
        data = result.buffer;
      } catch (error) {
        if (signal?.aborted) throw error;
        throw new DeepSeekImageError("Could not fetch the image from a public HTTPS URL", 400);
      }
    }
    const format = sniffCursorImageFormat(data);
    if (!format || data.length === 0 || data.length > MAX_IMAGE_BYTES)
      throw new DeepSeekImageError("Invalid image or image exceeds 20 MiB", 400);
    total += data.length;
    if (total > MAX_TOTAL_BYTES)
      throw new DeepSeekImageError("Images exceed the 50 MiB request limit", 400);
    images.push({
      data,
      mime: `image/${format}`,
      filename: `image-${images.length + 1}.${format === "jpeg" ? "jpg" : format}`,
    });
  }
  return images;
}

/** Files belong to the authenticated account; only processed IDs are cached, never image bytes. */
export async function uploadDeepSeekImages(options: ImageUploadOptions): Promise<string[]> {
  const imageParts = detectMediaParts(options.messages).filter((p) => p.kind === "image");
  if (!imageParts.length) return [];
  const timeout = AbortSignal.timeout(options.timeoutMs ?? 120_000);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  try {
    const images = await resolveDeepSeekImages(options.messages, signal);
    const ids: string[] = [];
    for (const image of images) {
      signal.throwIfAborted();
      const key = createHash("sha256")
        .update(options.headers.Authorization ?? "")
        .update(image.data)
        .digest("hex");
      const cached = cachedFiles.get(key);
      if (cached && cached.expiresAt > Date.now()) {
        ids.push(cached.id);
        continue;
      }
      cachedFiles.delete(key);
      const pow = await options.createPowHeader(UPLOAD_PATH, signal);
      const headers = new Headers(options.headers);
      headers.delete("Content-Type");
      headers.set("X-DS-PoW-Response", pow);
      headers.set("x-file-size", String(image.data.byteLength));
      const form = new FormData();
      form.append("file", new Blob([image.data], { type: image.mime }), image.filename);
      // Serialize once so the TLS/proxy transports receive matching boundary
      // headers and bytes. Passing FormData directly loses the boundary in wreq.
      const multipart = new Request(`https://chat.deepseek.com${UPLOAD_PATH}`, {
        method: "POST",
        body: form,
      });
      headers.set("Content-Type", multipart.headers.get("Content-Type")!);
      const payload = await multipart.arrayBuffer();
      signal.throwIfAborted();
      let file = parseFile(
        await readEnvelope(
          await fetch(`https://chat.deepseek.com${UPLOAD_PATH}`, {
            method: "POST",
            headers,
            body: payload,
            signal,
          })
        )
      );
      while (file.status !== "SUCCESS") {
        if (file.status && /FAIL|ERROR|REJECT|INVALID|UNSUPPORT/.test(file.status))
          throw new DeepSeekImageError("DeepSeek could not process the image");
        await delay(options.pollMs ?? 1000, undefined, { signal });
        const polled = await readEnvelope(
          await fetch(
            `https://chat.deepseek.com/api/v0/file/fetch_files?file_ids=${encodeURIComponent(file.id)}`,
            { headers: options.headers, signal }
          )
        );
        const result = z.object({ files: z.array(fileSchema) }).safeParse(polled);
        if (!result.success) throw new DeepSeekImageError("Invalid DeepSeek file status response");
        const found = result.data.files.find((entry) => entry.id === file.id);
        if (!found) throw new DeepSeekImageError("DeepSeek file status response omitted the image");
        file = found;
      }
      if (cachedFiles.size >= 256) cachedFiles.delete(cachedFiles.keys().next().value!);
      cachedFiles.set(key, { id: file.id, expiresAt: Date.now() + CACHE_TTL_MS });
      ids.push(file.id);
    }
    return ids;
  } catch (error) {
    if (timeout.aborted && !options.signal?.aborted)
      throw new DeepSeekImageError("DeepSeek image processing timed out", 504);
    throw error;
  }
}
