/** Trusted ingress body-byte stamp for rebuilt chat Requests. */
export const RECORDED_BODY_BYTES_HEADER = "x-omniroute-recorded-body-bytes";

const recordedBodyBytesMap = new WeakMap<Request, number>();

export function recordBodyBytes(request: Request, bytes: number): void {
  recordedBodyBytesMap.set(request, bytes);
}

export function readRecordedBodyBytes(request: Request): number | null {
  const fromMap = recordedBodyBytesMap.get(request);
  if (typeof fromMap === "number") {
    return fromMap;
  }
  const header = request.headers.get(RECORDED_BODY_BYTES_HEADER);
  if (header === null) return null;
  const trimmed = header.trim();
  if (!/^(0|[1-9]\d*)$/.test(trimmed)) return null;
  const parsed = Number(trimmed);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function stampRecordedBodyBytes(request: Request, bytes: number): Request {
  recordBodyBytes(request, bytes);
  request.headers.set(RECORDED_BODY_BYTES_HEADER, String(bytes));
  return request;
}

export function rebuildRequest(request: Request, body: Uint8Array): Request {
  const headers = new Headers(request.headers);
  // The inbound value may be absent or dishonest. Let the runtime derive the correct value.
  headers.delete("content-length");
  headers.delete(RECORDED_BODY_BYTES_HEADER);
  return new Request(request.url, {
    method: request.method,
    headers,
    body,
    signal: request.signal,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
}
