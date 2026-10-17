import { getCodexBackendIdentityHeaders } from "../config/codexClient.ts";
import { isCodexFreePlan } from "../config/codexPlan.ts";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";

const IMAGE_MODELS = new Set(["gpt-image-2", "gpt-image-2.5-sunburst", "gpt-image-2.5-flare"]);
const BODY_FIELDS = new Set([
  "model",
  "prompt",
  "n",
  "size",
  "quality",
  "background",
  "response_format",
  "image",
  "images",
]);
const WARNING =
  "Requested image model, account entitlement and output dimensions are not verified by HTTP success; inspect the original output.";
type ReferenceImage = { bytes: Buffer; mime: string };
const MAX_REFERENCE_BYTES = 20 * 1024 * 1024;

// The route's existing validation imports the credential DB; keep this transport state-free.
function parseInlineReference(value: unknown): ReferenceImage | null {
  if (typeof value !== "string" || value.length > Math.ceil(MAX_REFERENCE_BYTES / 3) * 4 + 64)
    return null;
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/i.exec(value);
  if (!match || match[2].length % 4 !== 0) return null;
  const bytes = Buffer.from(match[2], "base64");
  return bytes.toString("base64") === match[2] ? { bytes, mime: match[1].toLowerCase() } : null;
}

function validateReferences(images: ReferenceImage[]): string | null {
  if (images.length > 5) return "Codex Images accepts at most 5 reference images";
  let total = 0;
  for (const image of images) {
    const mime = image.mime.trim().toLowerCase();
    const bytes = image.bytes;
    total += bytes.length;
    if (total > MAX_REFERENCE_BYTES)
      return "Codex Images references exceed the 20 MiB decoded limit";
    const valid =
      mime === "image/png"
        ? bytes.length >= 8 &&
          bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
        : mime === "image/jpeg"
          ? bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
          : mime === "image/webp" &&
            bytes.length >= 12 &&
            bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
            bytes.subarray(8, 12).toString("ascii") === "WEBP";
    if (!valid) return "Codex Images reference content must match PNG, JPEG or WebP MIME";
  }
  return null;
}
type Metadata = { warning: string; imagegenRequestId?: string; requestId?: string };
type Result =
  | { success: true; data: Record<string, unknown>; metadata: Metadata }
  | { success: false; status: number; error: string; retryable: false; metadata: Metadata };

/** Explicit image engines only; hosted chat orchestration remains a separate transport. */
export function isCodexImagesModel(model: string): boolean {
  return IMAGE_MODELS.has(model);
}

type Failure = { status: number; error: string };
const validationError = (error: string): Failure => ({ status: 400, error });
function validateRequest(
  provider: string,
  model: string,
  body: Record<string, unknown>
): Failure | null {
  if (provider !== "codex" || !isCodexImagesModel(model))
    return validationError("Unsupported dedicated Codex image model");
  if (!body || typeof body !== "object" || Array.isArray(body))
    return validationError("Invalid Codex Images request body");
  if (Object.keys(body).some((key) => !BODY_FIELDS.has(key)))
    return validationError(
      "Unsupported Codex Images parameter; masks and output-format controls are not supported"
    );
  if (typeof body.prompt !== "string" || !body.prompt.trim())
    return validationError("Prompt is required for Codex Images");
  if (body.n !== undefined && body.n !== 1)
    return validationError("Codex Images supports n=1 only");
  if (body.response_format !== undefined && body.response_format !== "b64_json")
    return validationError("Codex Images returns original b64_json only");
  return validateOptions(body);
}
function validateOptions(body: Record<string, unknown>): Failure | null {
  if (
    body.size !== undefined &&
    (typeof body.size !== "string" || !/^(?:auto|[1-9]\d{0,4}x[1-9]\d{0,4})$/.test(body.size))
  )
    return validationError("Invalid Codex Images size; use auto or WIDTHxHEIGHT");
  if (
    body.quality !== undefined &&
    !["low", "medium", "high", "auto"].includes(body.quality as string)
  )
    return validationError("Unsupported Codex Images quality");
  if (
    body.background !== undefined &&
    !["transparent", "opaque", "auto"].includes(body.background as string)
  )
    return validationError("Unsupported Codex Images background");
  return null;
}
function prepareReferences(
  body: Record<string, unknown>,
  referenceImages: ReferenceImage[] | undefined,
  operation: "generations" | "edits" | undefined
): Failure | { references: ReferenceImage[]; endpoint: string } {
  const hasImage = Object.hasOwn(body, "image");
  const hasImages = Object.hasOwn(body, "images");
  if ((hasImage && hasImages) || (referenceImages !== undefined && (hasImage || hasImages)))
    return validationError("Ambiguous Codex image references; supply one reference set");
  const images = decodeReferences(body, referenceImages, hasImage, hasImages);
  if ("error" in images) return images;
  if (
    !Array.isArray(images) ||
    images.some(
      (image) => !image || !Buffer.isBuffer(image.bytes) || typeof image.mime !== "string"
    )
  )
    return validationError(
      "Invalid Codex reference; use inline PNG, JPEG or WebP bytes, not remote URLs or file IDs"
    );
  const references = images as ReferenceImage[];
  const referenceError = validateReferences(references);
  if (referenceError) return validationError(referenceError);
  const endpoint = operation ?? (references.length ? "edits" : "generations");
  const mismatch = operationMismatch(endpoint, references.length, hasImage || hasImages);
  if (mismatch) return validationError(mismatch);
  return { references, endpoint };
}
function decodeReferences(
  body: Record<string, unknown>,
  referenceImages: ReferenceImage[] | undefined,
  hasImage: boolean,
  hasImages: boolean
): Failure | Array<ReferenceImage | null> {
  if (referenceImages !== undefined) return referenceImages;
  {
    if (hasImages && !Array.isArray(body.images))
      return validationError("Codex Images images must be an array");
    const candidates = hasImages ? (body.images as unknown[]) : hasImage ? [body.image] : [];
    return candidates.map((value) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const ref = value as Record<string, unknown>;
        if (Object.keys(ref).length !== 1 || !Object.hasOwn(ref, "image_url")) return null;
        return parseInlineReference(ref.image_url);
      }
      return parseInlineReference(value);
    });
  }
}
function operationMismatch(endpoint: string, count: number, supplied: boolean): string | null {
  if (
    !["generations", "edits"].includes(endpoint) ||
    (endpoint === "edits" && !count) ||
    (endpoint === "generations" && count) ||
    (supplied && !count)
  )
    return "Reference images do not match the Codex Images operation";
  return null;
}

function resolveEndpoint(baseUrl: string, endpoint: string): Failure | URL {
  let url: URL;
  try {
    url = new URL(baseUrl);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.hash ||
      !/\/codex\/responses\/?$/.test(url.pathname)
    )
      return { status: 500, error: "Codex Images requires a configured Codex Responses endpoint" };
    url.pathname = url.pathname.replace(/\/responses\/?$/, `/images/${endpoint}`);
  } catch {
    return { status: 500, error: "Invalid Codex Images provider endpoint" };
  }
  return url;
}
function readPayload(data: unknown): Failure | Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data))
    return {
      status: 502,
      error: "Codex Images returned invalid image JSON; do not resubmit an unknown outcome",
    };
  const payload = data as Record<string, unknown>;
  if (
    !Number.isSafeInteger(payload.created) ||
    (payload.created as number) < 0 ||
    !Array.isArray(payload.data) ||
    !payload.data.length ||
    payload.data.some((item) => !item || typeof item.b64_json !== "string" || !item.b64_json.trim())
  )
    return {
      status: 502,
      error: "Codex Images returned no usable image data; do not resubmit an unknown outcome",
    };
  return payload;
}

type Credentials =
  | { accessToken?: string; apiKey?: string; providerSpecificData?: Record<string, unknown> }
  | null
  | undefined;
function buildWire(
  model: string,
  body: Record<string, unknown>,
  references: ReferenceImage[],
  credentials: Credentials,
  token: string
) {
  const upstreamBody: Record<string, unknown> = { model, prompt: body.prompt, n: 1 };
  for (const key of ["size", "quality", "background"])
    if (body[key] !== undefined) upstreamBody[key] = body[key];
  if (references.length)
    upstreamBody.images = references.map((image) => ({
      image_url: `data:${image.mime.trim().toLowerCase()};base64,${image.bytes.toString("base64")}`,
    }));
  const headers: Record<string, string> = {
    ...getCodexBackendIdentityHeaders(),
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const workspaceId = credentials?.providerSpecificData?.workspaceId;
  if (typeof workspaceId === "string" && workspaceId) {
    headers["chatgpt-account-id"] = workspaceId;
    headers.session_id = workspaceId;
  }
  return { upstreamBody, headers };
}
function captureRequestIds(response: Response, metadata: Metadata) {
  for (const [header, key] of [
    ["x-codex-imagegen-request-id", "imagegenRequestId"],
    ["x-request-id", "requestId"],
  ] as const) {
    const id = response.headers.get(header);
    if (id && /^[A-Za-z0-9._:-]{1,200}$/.test(id)) metadata[key] = id;
  }
}

type CodexImagesOptions = {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials?: {
    accessToken?: string;
    apiKey?: string;
    providerSpecificData?: Record<string, unknown>;
  } | null;
  log?: {
    info: (tag: string, message: string) => void;
    warn: (tag: string, message: string) => void;
    error: (tag: string, message: string) => void;
  } | null;
  referenceImages?: ReferenceImage[];
  operation?: "generations" | "edits";
  signal?: AbortSignal | null;
};

type Fail = (status: number, error: string) => Result;
async function submitCodexImage(
  url: URL,
  upstreamBody: Record<string, unknown>,
  headers: Record<string, string>,
  signal: AbortSignal | null,
  timeout: AbortSignal,
  metadata: Metadata,
  log: CodexImagesOptions["log"],
  fail: Fail
): Promise<Result> {
  const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;
  log?.info("IMAGE", "Submitting one dedicated Codex Images request; inputs and account withheld");
  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify(upstreamBody),
      signal: requestSignal,
    });
    captureRequestIds(response, metadata);
    if (!response.ok) {
      await response.body?.cancel();
      return fail(
        response.status,
        `Codex Images provider rejected the request (HTTP ${response.status}); details withheld`
      );
    }
    const payload = readPayload(await response.json());
    if ("error" in payload && "status" in payload)
      return fail(payload.status as number, payload.error as string);
    log?.warn("IMAGE", WARNING);
    return { success: true, data: payload, metadata };
  } catch {
    if (signal?.aborted)
      return fail(499, "Codex Images request cancelled; outcome may be unknown, do not resubmit");
    if (timeout.aborted)
      return fail(504, "Codex Images request timed out; outcome may be unknown, do not resubmit");
    return fail(
      502,
      "Codex Images request or response failed; outcome may be unknown, do not resubmit"
    );
  }
}
function validateCredentials(credentials: Credentials): Failure | string {
  const token = credentials?.accessToken || credentials?.apiKey;
  if (!token)
    return {
      status: 401,
      error: "Codex credentials missing accessToken — reconnect the Codex provider",
    };
  if (isCodexFreePlan(credentials?.providerSpecificData))
    return { status: 403, error: "Codex Images requires a paid ChatGPT/Codex plan" };
  return token;
}

/** Single JSON POST through the selected fetch/proxy context, never upload, retry or fallback. */
export async function handleCodexImages({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  referenceImages,
  operation,
  signal = null,
}: CodexImagesOptions): Promise<Result> {
  const metadata: Metadata = { warning: WARNING };
  const fail = (status: number, error: string): Result => {
    log?.error("IMAGE", `Codex Images request failed (${status}); details and inputs withheld`);
    return { success: false, status, error, retryable: false, metadata };
  };
  const requestError = validateRequest(provider, model, body);
  if (requestError) return fail(requestError.status, requestError.error);
  const prepared = prepareReferences(body, referenceImages, operation);
  if ("error" in prepared) return fail(prepared.status, prepared.error);
  const { references, endpoint } = prepared;
  const token = validateCredentials(credentials);
  if (typeof token !== "string") return fail(token.status, token.error);
  const url = resolveEndpoint(providerConfig.baseUrl, endpoint);
  if (!(url instanceof URL)) return fail(url.status, url.error);
  const { upstreamBody, headers } = buildWire(model, body, references, credentials, token);
  if (signal?.aborted) return fail(499, "Codex Images request cancelled before submission");
  const timeoutMs = getConfiguredTimeout();
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0 || timeoutMs > 0xffffffff)
    return fail(500, "Invalid Codex Images timeout configuration");
  const timeout = AbortSignal.timeout(timeoutMs);
  return submitCodexImage(url, upstreamBody, headers, signal, timeout, metadata, log, fail);
}
