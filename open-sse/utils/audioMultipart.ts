/**
 * A `.opus` file is Opus audio in an Ogg container (RFC 7845) — the same bytes
 * a client would otherwise name `.ogg`. Whisper-compatible upstreams pick the
 * decoder from the *filename* and their allow-list
 * (`flac, m4a, mp3, mp4, mpeg, mpga, oga, ogg, wav, webm`) has no `opus`, so
 * `note.opus` 400s while byte-identical `note.ogg` succeeds. Since
 * `/v1/audio/speech` emits `audio/opus` for `response_format=opus`, clients
 * round-tripping their own voice notes hit this constantly. Relabel to the
 * container that actually describes the bytes.
 */
function normalizeUploadExtension(name: string): string {
  return name.replace(/\.opus$/i, ".ogg");
}

export function getUploadedFileName(file: Blob & { name?: unknown }): string {
  return typeof file.name === "string" && file.name.length > 0
    ? normalizeUploadExtension(file.name)
    : "audio.wav";
}

/**
 * `body` is `Uint8Array<ArrayBuffer>`, not bare `Uint8Array`: `new Uint8Array(n)`
 * is always ArrayBuffer-backed, and only that narrower form satisfies `BodyInit`
 * (the bare type widens to `ArrayBufferLike`, which admits `SharedArrayBuffer`).
 */
export async function buildMultipartBody(
  file: Blob & { name?: unknown },
  fields: Record<string, string>,
  fileFieldName = "file"
): Promise<{ body: Uint8Array<ArrayBuffer>; contentType: string }> {
  const boundary = "----OmniRouteAudioBoundary" + Date.now().toString(36);
  const parts: Uint8Array[] = [];
  const encoder = new TextEncoder();

  for (const [name, value] of Object.entries(fields)) {
    parts.push(
      encoder.encode(
        `--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`
      )
    );
  }

  const fileName = getUploadedFileName(file)
    .replace(/["]/g, "_")
    .replace(/[\r\n]/g, "_");
  const fileBytes = new Uint8Array(await file.arrayBuffer());
  parts.push(
    encoder.encode(
      `--${boundary}\r\nContent-Disposition: form-data; name="${fileFieldName}"; filename="${fileName}"\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`
    )
  );
  parts.push(fileBytes);
  parts.push(encoder.encode(`\r\n--${boundary}--\r\n`));

  const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
  const body = new Uint8Array(totalLength);
  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.length;
  }

  return { body, contentType: "multipart/form-data; boundary=" + boundary };
}
