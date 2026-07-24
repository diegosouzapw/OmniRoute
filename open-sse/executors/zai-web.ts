/**
 * ZaiWebExecutor — Z.ai consumer chat (chat.z.ai).
 *
 * This is distinct from the API-key `zai` / `glm` providers at api.z.ai.
 * The current consumer frontend keeps its Bearer JWT in localStorage, creates
 * a remote chat through /api/v1/chats/new, then sends signed completion
 * requests to /api/v2/chat/completions. The completion endpoint also requires
 * a browser-issued captcha_verify_param. OmniRoute obtains it through the
 * browser-backed transport by default; a caller-supplied proof keeps the
 * lower-overhead direct HTTP path available.
 *
 * Response frames use Z.ai's internal SSE envelope:
 * `{"type":"chat:completion","data":{"delta_content":"...","phase":"answer"}}`.
 */
import { Buffer } from "node:buffer";
import { createHash, createHmac, randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { browserBackedChat } from "../services/browserBackedChat.ts";
import {
  makeExecutorErrorResult as makeErrorResult,
  normalizeCookie,
  sanitizeErrorMessage,
} from "../utils/error.ts";
import { CursorImageError, extractImageUrls, resolveCursorImages } from "../utils/cursorImages.ts";

const BASE_URL = "https://chat.z.ai";
const NEW_CHAT_URL = `${BASE_URL}/api/v1/chats/new`;
const CHAT_URL = `${BASE_URL}/api/v2/chat/completions`;
const DEFAULT_MODEL = "GLM-5.1";
const DEFAULT_FE_VERSION = "prod-fe-1.1.79";
const CLIENT_PROTOCOL_VERSION = "0.0.1";
const SIGNATURE_KEY = "key-@@@@)))()((9))-xxxx&&&%%%%%";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
const FE_VERSION_CACHE_TTL_MS = 15 * 60 * 1000;

let cachedFeVersion: { value: string; expiresAt: number } | null = null;

interface NewChatRequest {
  payload: Record<string, unknown>;
  userMessageId: string;
}

export type ZaiReasoningEffort = "high" | "max";

export interface ZaiThinkingConfig {
  enabled: boolean;
  effort: ZaiReasoningEffort;
  effortSupported: boolean;
  supported: boolean;
}

export interface ZaiModelCapabilities {
  mcp: boolean;
  reasoningEffort: boolean;
  returnFc: boolean;
  thinking: boolean;
  vision: boolean;
  vlmTools: boolean;
  vlmWebSearch: boolean;
  vlmWebsiteMode: boolean;
  webSearch: boolean;
}

export interface ZaiVlmConfig {
  toolsEnabled: boolean;
  webSearchEnabled: boolean;
  websiteModeEnabled: boolean;
}

const NO_ZAI_MODEL_CAPABILITIES: ZaiModelCapabilities = Object.freeze({
  mcp: false,
  reasoningEffort: false,
  returnFc: false,
  thinking: false,
  vision: false,
  vlmTools: false,
  vlmWebSearch: false,
  vlmWebsiteMode: false,
  webSearch: false,
});

/**
 * Verified against chat.z.ai/api/models (prod-fe-1.1.79).
 * `returnFc` is the site's internal function-call result capability; it is
 * distinct from accepting caller-supplied OpenAI `tools`.
 */
const ZAI_MODEL_CAPABILITIES: Record<string, ZaiModelCapabilities> = {
  "glm-5.2": {
    mcp: true,
    reasoningEffort: true,
    returnFc: true,
    thinking: true,
    vision: false,
    vlmTools: false,
    vlmWebSearch: false,
    vlmWebsiteMode: false,
    webSearch: true,
  },
  "glm-5.1": {
    mcp: true,
    reasoningEffort: false,
    returnFc: true,
    thinking: true,
    vision: false,
    vlmTools: false,
    vlmWebSearch: false,
    vlmWebsiteMode: false,
    webSearch: true,
  },
  "glm-5-turbo": {
    mcp: true,
    reasoningEffort: false,
    returnFc: true,
    thinking: true,
    vision: false,
    vlmTools: false,
    vlmWebSearch: false,
    vlmWebsiteMode: false,
    webSearch: true,
  },
  "glm-5v-turbo": {
    mcp: false,
    reasoningEffort: false,
    returnFc: true,
    thinking: true,
    vision: true,
    vlmTools: true,
    vlmWebSearch: true,
    vlmWebsiteMode: true,
    webSearch: true,
  },
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function browserFailureDetail(body: Buffer): string {
  const raw = body.toString("utf8").trim();
  if (!raw) return "";
  try {
    const parsed = asRecord(JSON.parse(raw));
    const error = asRecord(parsed?.error);
    const detail = error?.message ?? parsed?.detail ?? parsed?.message;
    if (typeof detail === "string") return sanitizeErrorMessage(detail).slice(0, 500);
  } catch {
    // Non-JSON upstream errors are still useful after sanitizing and bounding them.
  }
  return sanitizeErrorMessage(raw).slice(0, 500);
}

export function describeZaiBrowserFailure(result: {
  status: number;
  body: Buffer;
  observedPostUrls?: string[];
  timing: { captureResponseMs: number; totalMs: number };
}): string {
  const status = result.status > 0 ? String(result.status) : "no matching response";
  const timing = `capture ${result.timing.captureResponseMs}ms, total ${result.timing.totalMs}ms`;
  const observed =
    result.observedPostUrls && result.observedPostUrls.length > 0
      ? ` Observed POST targets: ${result.observedPostUrls.join(", ")}.`
      : "";
  const detail =
    browserFailureDetail(result.body) ||
    (result.status === 0
      ? `The page did not issue the expected authenticated chat completion request.${observed}`
      : "The browser response body was empty.");
  return `Z.ai browser transport failed (${status}; ${timing}): ${detail}`;
}

function parseCredentialJson(raw: string): Record<string, unknown> | null {
  if (!raw.trim().startsWith("{")) return null;
  try {
    return asRecord(JSON.parse(raw));
  } catch {
    return null;
  }
}

/** Extract the localStorage Bearer token, while accepting legacy token= input. */
export function extractZaiToken(rawCredential: string): string {
  const trimmed = rawCredential.trim();
  const json = parseCredentialJson(trimmed);
  if (json) {
    const token = json.token ?? json.accessToken ?? json.access_token;
    return typeof token === "string" ? token.trim() : "";
  }

  const bearer = trimmed.match(/^(?:Authorization:\s*)?Bearer\s+(.+)$/i);
  if (bearer) return bearer[1].trim();

  const normalized = normalizeCookie(trimmed);
  if (!normalized) return "";
  const match = normalized.match(/(?:^|;\s*)token=([^;]+)/);
  if (match) return match[1].trim();
  return normalized.includes(";") || normalized.includes("=") ? "" : normalized;
}

/** Read the short-lived browser CAPTCHA proof from supported input locations. */
export function extractZaiCaptchaVerifyParam(value: unknown): string {
  const record = asRecord(value);
  if (record) {
    const direct =
      record.captcha_verify_param ?? record.captchaVerifyParam ?? record.zaiCaptchaVerifyParam;
    if (typeof direct === "string" && direct.trim()) return direct.trim();
    const nested = asRecord(record.providerSpecificData);
    if (nested) return extractZaiCaptchaVerifyParam(nested);
    return "";
  }

  if (typeof value !== "string") return "";
  const json = parseCredentialJson(value);
  if (json) return extractZaiCaptchaVerifyParam(json);
  const match = value.match(/(?:^|;\s*)captcha_verify_param=([^;]+)/);
  return match?.[1]?.trim() ?? "";
}

export function extractZaiUserId(token: string): string {
  const payload = token.split(".")[1];
  if (!payload) return "";
  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof decoded?.id === "string" ? decoded.id : "";
  } catch {
    return "";
  }
}

export function buildZaiSignature(input: {
  prompt: string;
  requestId: string;
  timestamp: number | string;
  userId: string;
}): string {
  const timestamp = String(input.timestamp);
  const sortedPayload = Object.entries({
    timestamp,
    requestId: input.requestId,
    user_id: input.userId,
  })
    .sort(([left], [right]) => left.localeCompare(right))
    .join(",");
  const encodedPrompt = Buffer.from(input.prompt, "utf8").toString("base64");
  const bucket = Math.floor(Number(timestamp) / (5 * 60 * 1000));
  const derivedKey = createHmac("sha256", SIGNATURE_KEY).update(String(bucket)).digest("hex");
  return createHmac("sha256", derivedKey)
    .update(`${sortedPayload}|${encodedPrompt}|${timestamp}`)
    .digest("hex");
}

export function parseZaiFrontendVersion(html: string): string | null {
  return html.match(/\/frontend\/(prod-fe-\d+(?:\.\d+)*)\/assets\//)?.[1] ?? null;
}

function textContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .flatMap((part) => {
      const record = asRecord(part);
      if (!record || (record.type !== "text" && record.type !== "input_text")) return [];
      const text = record.text ?? record.content;
      return typeof text === "string" ? [text] : [];
    })
    .join("\n");
}

function latestUserPrompt(messages: Array<{ role: string; content: unknown }>): string {
  for (let index = messages.length - 1; index >= 0; index--) {
    if (messages[index]?.role !== "user") continue;
    return textContent(messages[index].content);
  }
  return "";
}

function browserPrompt(messages: Array<{ role: string; content: unknown }>): string {
  const folded = foldMessages(messages);
  if (folded.length === 1 && folded[0]?.role === "user") return folded[0].content;
  return folded.map((message) => `${message.role.toUpperCase()}:\n${message.content}`).join("\n\n");
}

function collectZaiImageUrls(messages: Array<{ role: string; content: unknown }>): string[] {
  return messages.flatMap((message) =>
    message.role === "user" ? extractImageUrls(message.content) : []
  );
}

function zaiImageFileName(mimeType: string, index: number): string {
  const normalized = mimeType.toLowerCase().split(";")[0].trim();
  const extension =
    normalized === "image/jpeg"
      ? "jpg"
      : normalized === "image/svg+xml"
        ? "svg"
        : normalized.startsWith("image/")
          ? normalized.slice("image/".length).replace(/[^a-z0-9]/g, "") || "png"
          : "png";
  return `omniroute-image-${index + 1}.${extension}`;
}

function unprefixedModelId(modelId: string): string {
  return modelId.trim().split("/").at(-1) || modelId.trim();
}

function browserModelName(modelId: string): string {
  const unprefixed = unprefixedModelId(modelId);
  if (unprefixed.toLowerCase() === "glm-5.2") return "GLM-5.2";
  if (unprefixed.toLowerCase() === "glm-5v-turbo") return "GLM-5V-Turbo";
  return unprefixed;
}

export function getZaiModelCapabilities(modelId: string): ZaiModelCapabilities {
  return (
    ZAI_MODEL_CAPABILITIES[unprefixedModelId(modelId).toLowerCase()] ?? NO_ZAI_MODEL_CAPABILITIES
  );
}

function getFeatureOption(body: Record<string, unknown>, key: string): unknown {
  if (body[key] !== undefined) return body[key];
  return asRecord(body.features)?.[key];
}

/** Resolve each model's Deep Think control; only GLM-5.2 accepts High/Max effort. */
export function resolveZaiThinkingConfig(
  modelId: string,
  body: Record<string, unknown>
): ZaiThinkingConfig {
  const capabilities = getZaiModelCapabilities(modelId);
  const supported = capabilities.thinking;
  const reasoning = asRecord(body.reasoning);
  const rawEffort =
    typeof body.reasoning_effort === "string"
      ? body.reasoning_effort.trim().toLowerCase()
      : typeof reasoning?.effort === "string"
        ? reasoning.effort.trim().toLowerCase()
        : "";
  const disabled = body.enable_thinking === false || rawEffort === "none" || rawEffort === "off";
  const effort: ZaiReasoningEffort =
    rawEffort === "low" || rawEffort === "medium" || rawEffort === "high" ? "high" : "max";

  return {
    supported,
    enabled: supported && !disabled,
    effort,
    effortSupported: capabilities.reasoningEffort,
  };
}

/** Resolve GLM-5V-Turbo's visible Web Search and Tools controls. */
export function resolveZaiVlmConfig(modelId: string, body: Record<string, unknown>): ZaiVlmConfig {
  const capabilities = getZaiModelCapabilities(modelId);
  const toolsOption = getFeatureOption(body, "vlm_tools_enable");
  const webSearchOption =
    getFeatureOption(body, "vlm_web_search_enable") ??
    getFeatureOption(body, "auto_web_search") ??
    getFeatureOption(body, "web_search");
  const webSearchEnabled =
    webSearchOption === true || (webSearchOption !== false && capabilities.vlmWebSearch);
  return {
    toolsEnabled: capabilities.vlmTools && toolsOption !== false,
    webSearchEnabled: capabilities.webSearch && webSearchEnabled,
    websiteModeEnabled: capabilities.vlmWebsiteMode,
  };
}

async function selectZaiBrowserModel(
  page: import("playwright").Page,
  modelName: string
): Promise<void> {
  const selector = page.locator('[aria-label="Select a model"]').first();
  await selector.waitFor({ state: "visible", timeout: 10_000 });
  if ((await selector.innerText()).includes(modelName)) return;

  // The landing-page hero animation can remain above the already-visible
  // selector and make coordinate-based clicks time out. Dispatch the click on
  // the control itself, as we do for the Deep Think menu trigger below.
  await selector.evaluate((element) => (element as HTMLElement).click());
  const menu = page.locator('[role="menu"]').filter({ hasText: modelName }).first();
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  const modelButton = menu.locator("button").filter({ hasText: modelName }).first();
  await modelButton.evaluate((element) => (element as HTMLElement).click());
  await page
    .locator('[aria-label="Select a model"]')
    .filter({ hasText: modelName })
    .first()
    .waitFor({ state: "visible", timeout: 5_000 });
}

async function setZaiBrowserToggle(
  page: import("playwright").Page,
  label: "Deep think" | "Tools" | "Web search",
  dataAttribute: "data-autothink" | "data-selected",
  enabled: boolean
): Promise<void> {
  const wrapper = page.locator(`[aria-label^="${label} "]`).first();
  await wrapper.waitFor({ state: "visible", timeout: 5_000 });
  const button = wrapper.locator(`button[${dataAttribute}]`).first();
  const current = (await button.getAttribute(dataAttribute)) === "true";
  if (current !== enabled) await button.click({ timeout: 5_000 });
}

async function setZaiBrowserWebSearch(
  page: import("playwright").Page,
  enabled: boolean
): Promise<void> {
  const labelledWrapper = page.locator('[aria-label^="Web search "]').first();
  if ((await labelledWrapper.count()) > 0) {
    await setZaiBrowserToggle(page, "Web search", "data-selected", enabled);
    return;
  }

  // Text-model UI: the globe button has no accessible label. Anchor the
  // lookup to the adjacent upload button instead of relying on generated IDs.
  const button = page
    .locator("#upload-file-button")
    .locator("xpath=../../../following-sibling::div//button[@data-active]")
    .first();
  await button.waitFor({ state: "visible", timeout: 5_000 });
  const current = (await button.getAttribute("data-active")) === "true";
  if (current !== enabled) {
    await button.click({ timeout: 5_000 });
    // The same control also opens the search-mode popover. Close it so it
    // cannot retain focus or cover the composer controls during submission.
    await page.keyboard.press("Escape");
  }
}

async function configureZaiBrowserEffort(
  page: import("playwright").Page,
  config: ZaiThinkingConfig
): Promise<void> {
  const trigger = page
    .locator("[data-dropdown-menu-trigger]")
    .filter({ hasText: "Deep Think" })
    .first();
  await trigger.waitFor({ state: "visible", timeout: 10_000 });
  try {
    // The landing-page intro can leave a transparent animation layer over this
    // already-visible trigger in headless Chromium. A DOM click targets the
    // stable trigger itself instead of the temporary layer at its coordinates.
    await trigger.evaluate((element) => (element as HTMLElement).click());
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`open menu: ${message}`);
  }

  const menu = page.locator('[role="menu"]').filter({ hasText: "Deep Think" }).first();
  await menu.waitFor({ state: "visible", timeout: 5_000 });
  const toggle = menu.locator('[role="switch"]').first();
  const checked = (await toggle.getAttribute("aria-checked")) === "true";

  if (!config.enabled) {
    if (checked) {
      try {
        await toggle.click({ timeout: 5_000 });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`disable toggle: ${message}`);
      }
    }
  } else {
    if (!checked) {
      try {
        await toggle.click({ timeout: 5_000 });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`enable toggle: ${message}`);
      }
    }
    const effortButton = menu.locator("button").filter({
      hasText: config.effort === "high" ? "High" : "Max",
    });
    if ((await effortButton.getAttribute("data-selected")) !== "true") {
      try {
        // The same landing-page animation that can cover the model selector
        // can also intercept this menu item's coordinate click.
        await effortButton.evaluate((element) => (element as HTMLElement).click());
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`select ${config.effort}: ${message}`);
      }
    }
  }

  if (await menu.isVisible()) {
    await page.keyboard.press("Escape");
  }
}

async function configureZaiBrowserRequest(
  page: import("playwright").Page,
  input: {
    modelId: string;
    thinking: ZaiThinkingConfig;
    vlm: ZaiVlmConfig;
  }
): Promise<void> {
  const runStage = async (name: string, action: () => Promise<void>): Promise<void> => {
    try {
      await action();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`${name}: ${message}`);
    }
  };

  await runStage("model selection", () =>
    selectZaiBrowserModel(page, browserModelName(input.modelId))
  );

  if (input.thinking.effortSupported) {
    await runStage("Deep Think effort", () => configureZaiBrowserEffort(page, input.thinking));
  } else if (input.thinking.supported) {
    await runStage("Deep Think toggle", () =>
      setZaiBrowserToggle(page, "Deep think", "data-autothink", input.thinking.enabled)
    );
  }

  const capabilities = getZaiModelCapabilities(input.modelId);
  if (capabilities.webSearch) {
    await runStage("web search toggle", () =>
      setZaiBrowserWebSearch(page, input.vlm.webSearchEnabled)
    );
  }
  if (capabilities.vlmTools) {
    await runStage("tools toggle", () =>
      setZaiBrowserToggle(page, "Tools", "data-selected", input.vlm.toolsEnabled)
    );
  }
}

function resolveCaptchaVerifyParam(
  credentials: ProviderCredentials,
  body: Record<string, unknown>
): string {
  return (
    extractZaiCaptchaVerifyParam(body) ||
    extractZaiCaptchaVerifyParam(credentials.providerSpecificData) ||
    extractZaiCaptchaVerifyParam(credentials.apiKey) ||
    extractZaiCaptchaVerifyParam(credentials.accessToken)
  );
}

/**
 * One parsed delta out of a z.ai SSE frame: either a content/reasoning chunk
 * or a signal that the stream has finished.
 */
export interface ZaiDelta {
  content: string;
  reasoning: string;
  done: boolean;
}

/** Parse an already OpenAI-shaped `{choices:[{delta}]}` pass-through frame. */
function parseOpenAiShapedFrame(choices: Array<Record<string, unknown>>): ZaiDelta {
  const delta = (choices[0]?.delta ?? {}) as Record<string, unknown>;
  const finishReason = choices[0]?.finish_reason;
  return {
    content: typeof delta.content === "string" ? delta.content : "",
    reasoning: typeof delta.reasoning_content === "string" ? delta.reasoning_content : "",
    done: finishReason != null,
  };
}

/** Parse the z.ai / chatglm internal `{data:{delta_content,phase,done}}` envelope. */
function parseInternalEnvelopeFrame(
  frame: Record<string, unknown>,
  data: Record<string, unknown>
): ZaiDelta | null {
  const phase = String(data.phase ?? "");
  const deltaContent = data.delta_content ?? data.edit_content ?? data.content;
  const done =
    data.done === true ||
    phase === "done" ||
    phase === "finish" ||
    String(frame.type ?? "") === "chat:completion:finish";

  if (typeof deltaContent === "string" && deltaContent) {
    const isThinking = phase === "thinking";
    return {
      content: isThinking ? "" : deltaContent,
      reasoning: isThinking ? deltaContent : "",
      done,
    };
  }
  if (done) return { content: "", reasoning: "", done: true };
  return null;
}

/**
 * Parse a single decoded z.ai SSE `data:` JSON payload into a normalized
 * delta. Handles both the internal `{data:{delta_content,phase,done}}`
 * envelope and a pass-through OpenAI-shaped `{choices:[{delta}]}` frame.
 */
export function parseZaiFrame(raw: unknown): ZaiDelta | null {
  if (!raw || typeof raw !== "object") return null;
  const frame = raw as Record<string, unknown>;

  const choices = frame.choices as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(choices) && choices.length > 0) {
    return parseOpenAiShapedFrame(choices);
  }

  const data = (frame.data ?? frame) as Record<string, unknown>;
  return parseInternalEnvelopeFrame(frame, data);
}

export function foldMessages(
  messages: Array<{ role: string; content: unknown }>
): Array<{ role: string; content: string }> {
  return messages.map((m) => ({
    role: m.role,
    content: textContent(m.content),
  }));
}

/** Split a chunk of decoded SSE text into complete `data:` payload strings. */
function extractSseDataPayloads(buffer: { text: string }, incoming: string): string[] {
  buffer.text += incoming;
  const lines = buffer.text.split("\n");
  buffer.text = lines.pop() || "";
  const payloads: string[] = [];
  for (const line of lines) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    payloads.push(data);
  }
  return payloads;
}

/** Parse a raw SSE payload string into a normalized delta, or null if unusable. */
function parseSsePayload(data: string): ZaiDelta | null {
  try {
    return parseZaiFrame(JSON.parse(data));
  } catch {
    return null;
  }
}

/**
 * Read the upstream SSE body to completion, invoking `onDelta` for every
 * parsed delta. Returns true when `onDelta` signalled the stream ended
 * (returned true), false when the body was exhausted without a done delta.
 */
async function drainSseDeltas(
  sourceBody: ReadableStream<Uint8Array>,
  onDelta: (delta: ZaiDelta) => boolean
): Promise<boolean> {
  const decoder = new TextDecoder();
  const reader = sourceBody.getReader();
  const buffer = { text: "" };
  while (true) {
    const { done, value } = await reader.read();
    if (done) return false;
    const payloads = extractSseDataPayloads(buffer, decoder.decode(value, { stream: true }));
    for (const raw of payloads) {
      const delta = parseSsePayload(raw);
      if (delta && onDelta(delta)) return true;
    }
  }
}

type ChunkEmitter = (
  controller: ReadableStreamDefaultController,
  delta: Record<string, unknown>,
  finish?: string | null
) => void;

/** Emit role/reasoning/content/stop chunks for one delta. Returns true when the stream ended. */
function emitDeltaChunks(
  controller: ReadableStreamDefaultController,
  delta: ZaiDelta,
  emitChunk: ChunkEmitter,
  roleState: { emitted: boolean }
): boolean {
  if (!roleState.emitted && (delta.content || delta.reasoning)) {
    roleState.emitted = true;
    emitChunk(controller, { role: "assistant", content: "" });
  }
  if (delta.reasoning) emitChunk(controller, { reasoning_content: delta.reasoning });
  if (delta.content) emitChunk(controller, { content: delta.content });
  if (delta.done) {
    emitChunk(controller, {}, "stop");
    controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
    controller.close();
    return true;
  }
  return false;
}

export class ZaiWebExecutor extends BaseExecutor {
  constructor() {
    super("zai-web", { id: "zai-web", baseUrl: BASE_URL });
  }

  private async resolveFrontendVersion(signal?: AbortSignal | null): Promise<string> {
    if (cachedFeVersion && cachedFeVersion.expiresAt > Date.now()) {
      return cachedFeVersion.value;
    }
    let version = DEFAULT_FE_VERSION;
    try {
      const response = await fetch(`${BASE_URL}/`, {
        headers: { Accept: "text/html", "User-Agent": USER_AGENT },
        signal,
      });
      if (response.ok) {
        version = parseZaiFrontendVersion(await response.text()) ?? version;
      }
    } catch {
      // The current verified version remains a safe fallback when homepage probing fails.
    }
    cachedFeVersion = { value: version, expiresAt: Date.now() + FE_VERSION_CACHE_TTL_MS };
    return version;
  }

  private buildZaiHeaders(
    token: string,
    options: {
      accept: "application/json" | "text/event-stream";
      frontendVersion?: string;
      signature?: string;
    }
  ): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: options.accept,
      "Accept-Language": "en-US",
      "User-Agent": USER_AGENT,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
      Authorization: `Bearer ${token}`,
    };
    if (options.frontendVersion) headers["X-FE-Version"] = options.frontendVersion;
    if (options.signature) headers["X-Signature"] = options.signature;
    return headers;
  }

  private buildCompletionUrl(input: {
    requestId: string;
    timestamp: number;
    token: string;
    userId: string;
  }): string {
    const now = new Date(input.timestamp);
    const params = new URLSearchParams({
      timestamp: String(input.timestamp),
      requestId: input.requestId,
      user_id: input.userId,
      version: CLIENT_PROTOCOL_VERSION,
      platform: "web",
      token: input.token,
      user_agent: USER_AGENT,
      language: "en-US",
      languages: "en-US,en",
      timezone: "UTC",
      cookie_enabled: "true",
      screen_width: "1280",
      screen_height: "800",
      screen_resolution: "1280x800",
      viewport_height: "800",
      viewport_width: "1280",
      viewport_size: "1280x800",
      color_depth: "24",
      pixel_ratio: "1",
      current_url: `${BASE_URL}/`,
      pathname: "/",
      search: "",
      hash: "",
      host: "chat.z.ai",
      hostname: "chat.z.ai",
      protocol: "https:",
      referrer: "",
      title: "Z.ai - Advanced AI Chatbot & Agent powered by GLM-5.2",
      timezone_offset: "0",
      local_time: now.toISOString(),
      utc_time: now.toUTCString(),
      is_mobile: "false",
      is_touch: "false",
      max_touch_points: "0",
      browser_name: "Chrome",
      os_name: "Mac OS",
      signature_timestamp: String(input.timestamp),
    });
    return `${CHAT_URL}?${params.toString()}`;
  }

  private buildNewChatBody(
    messages: Array<{ role: string; content: unknown }>,
    modelId: string,
    enableThinking: boolean,
    reasoningEffort: ZaiReasoningEffort,
    vlmConfig: ZaiVlmConfig
  ): NewChatRequest {
    const prompt = latestUserPrompt(messages);
    const userMessageId = randomUUID();
    return {
      userMessageId,
      payload: {
        chat: {
          id: "",
          title: "New Chat",
          models: [modelId],
          params: {},
          history: {
            messages: {
              [userMessageId]: {
                id: userMessageId,
                parentId: null,
                childrenIds: [],
                role: "user",
                content: prompt,
                timestamp: Math.floor(Date.now() / 1000),
                models: [modelId],
              },
            },
            currentId: userMessageId,
          },
          tags: [],
          flags: [],
          features: [
            {
              server: "tool_selector_h",
              status: "hidden",
              type: "tool_selector",
            },
          ],
          mcp_servers: [],
          enable_thinking: enableThinking,
          reasoning_effort: reasoningEffort,
          auto_web_search: vlmConfig.webSearchEnabled,
          message_version: 1,
          extra: {
            vlm_tools_enable: vlmConfig.toolsEnabled,
            vlm_web_search_enable: vlmConfig.websiteModeEnabled && vlmConfig.webSearchEnabled,
            vlm_website_mode: vlmConfig.websiteModeEnabled,
          },
          timestamp: Date.now(),
          type: "default",
        },
      },
    };
  }

  private buildRequestBody(input: {
    body: Record<string, unknown>;
    captchaVerifyParam: string;
    chatId: string;
    messages: Array<{ role: string; content: unknown }>;
    modelId: string;
    prompt: string;
    userMessageId: string;
    enableThinking: boolean;
    reasoningEffort: ZaiReasoningEffort;
    reasoningEffortSupported: boolean;
    vlmConfig: ZaiVlmConfig;
  }): Record<string, unknown> {
    const params = Object.fromEntries(
      ["temperature", "top_p", "max_tokens", "stop"]
        .filter((key) => input.body[key] !== undefined)
        .map((key) => [key, input.body[key]])
    );
    const features: Record<string, unknown> = {
      image_generation: false,
      web_search: false,
      // The live frontend moves the visible search toggle into the VLM flag
      // while a model is in website mode; text models use auto_web_search.
      auto_web_search: input.vlmConfig.websiteModeEnabled
        ? false
        : input.vlmConfig.webSearchEnabled,
      preview_mode: true,
      flags: [],
      vlm_tools_enable: input.vlmConfig.toolsEnabled,
      vlm_web_search_enable: input.vlmConfig.websiteModeEnabled && input.vlmConfig.webSearchEnabled,
      vlm_website_mode: input.vlmConfig.websiteModeEnabled,
      enable_thinking: input.enableThinking,
    };
    if (input.enableThinking && input.reasoningEffortSupported) {
      features.reasoning_effort = input.reasoningEffort;
    }
    return {
      stream: true,
      model: input.modelId,
      messages: foldMessages(input.messages),
      signature_prompt: input.prompt,
      params,
      extra: {
        vlm_tools_enable: input.vlmConfig.toolsEnabled,
        vlm_web_search_enable:
          input.vlmConfig.websiteModeEnabled && input.vlmConfig.webSearchEnabled,
        vlm_website_mode: input.vlmConfig.websiteModeEnabled,
      },
      features,
      variables: {},
      chat_id: input.chatId,
      id: randomUUID(),
      current_user_message_id: input.userMessageId,
      current_user_message_parent_id: null,
      background_tasks: {
        title_generation: true,
        tags_generation: true,
      },
      captcha_verify_param: input.captchaVerifyParam,
    };
  }

  private async createRemoteChat(input: {
    messages: Array<{ role: string; content: unknown }>;
    modelId: string;
    token: string;
    enableThinking: boolean;
    reasoningEffort: ZaiReasoningEffort;
    vlmConfig: ZaiVlmConfig;
    signal?: AbortSignal | null;
    originalBody: unknown;
  }): Promise<
    { chatId: string; userMessageId: string } | { errorResult: ReturnType<typeof makeErrorResult> }
  > {
    const { userMessageId, payload } = this.buildNewChatBody(
      input.messages,
      input.modelId,
      input.enableThinking,
      input.reasoningEffort,
      input.vlmConfig
    );
    let response: Response;
    try {
      response = await fetch(NEW_CHAT_URL, {
        method: "POST",
        headers: this.buildZaiHeaders(input.token, {
          accept: "application/json",
        }),
        body: JSON.stringify(payload),
        signal: input.signal,
      });
    } catch (error) {
      const message = sanitizeErrorMessage(
        error instanceof Error ? error.message : "unknown network error"
      );
      return {
        errorResult: makeErrorResult(
          502,
          `Z.ai chat creation failed: ${message}`,
          input.originalBody,
          NEW_CHAT_URL
        ),
      };
    }
    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return {
        errorResult: makeErrorResult(
          response.status,
          `Z.ai chat creation error: ${sanitizeErrorMessage(errorText)}`,
          input.originalBody,
          NEW_CHAT_URL
        ),
      };
    }
    const result = asRecord(await response.json().catch(() => null));
    const chatId = typeof result?.id === "string" ? result.id : "";
    if (!chatId) {
      return {
        errorResult: makeErrorResult(
          502,
          "Z.ai chat creation returned no chat id",
          input.originalBody,
          NEW_CHAT_URL
        ),
      };
    }
    return { chatId, userMessageId };
  }

  /** Drain the streaming response body into an OpenAI-shaped SSE ReadableStream. */
  private buildStreamingBody(
    sourceBody: ReadableStream<Uint8Array>,
    modelId: string,
    emitChunk: ChunkEmitter,
    signal: AbortSignal | null | undefined
  ): ReadableStream {
    return new ReadableStream({
      async start(controller) {
        const roleState = { emitted: false };
        try {
          const ended = await drainSseDeltas(sourceBody, (delta) =>
            emitDeltaChunks(controller, delta, emitChunk, roleState)
          );
          if (ended) return; // emitDeltaChunks already sent [DONE] and closed
          if (!roleState.emitted) emitChunk(controller, { role: "assistant", content: "" });
          emitChunk(controller, {}, "stop");
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          if (!signal?.aborted) {
            try {
              controller.error(err);
            } catch {
              /* controller already closed */
            }
          }
        }
      },
    });
  }

  /** Drain the response body and aggregate all deltas into a single answer/reasoning pair. */
  private async collectNonStreaming(
    sourceBody: ReadableStream<Uint8Array>
  ): Promise<{ answer: string; reasoning: string }> {
    let answer = "";
    let reasoning = "";
    await drainSseDeltas(sourceBody, (delta) => {
      if (delta.reasoning) reasoning += delta.reasoning;
      if (delta.content) answer += delta.content;
      return delta.done;
    });
    return { answer, reasoning };
  }

  /** POST the chat request upstream. Returns either the upstream Response or an error result. */
  private async fetchUpstream(
    completionUrl: string,
    reqHeaders: Record<string, string>,
    reqBody: Record<string, unknown>,
    body: unknown,
    signal: AbortSignal | null | undefined
  ): Promise<{ upstream: Response } | { errorResult: ReturnType<typeof makeErrorResult> }> {
    let upstream: Response;
    try {
      upstream = await fetch(completionUrl, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal,
      });
    } catch (err) {
      const message = sanitizeErrorMessage(
        err instanceof Error ? err.message : "unknown network error"
      );
      return {
        errorResult: makeErrorResult(502, `Z.ai fetch failed: ${message}`, body, CHAT_URL),
      };
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return {
        errorResult: makeErrorResult(
          upstream.status,
          `Z.ai error: ${sanitizeErrorMessage(errText)}`,
          body,
          CHAT_URL
        ),
      };
    }
    return { upstream };
  }

  private async fetchThroughBrowser(input: {
    body: unknown;
    messages: Array<{ role: string; content: unknown }>;
    modelId: string;
    imageUrls: string[];
    signal?: AbortSignal | null;
    thinkingConfig: ZaiThinkingConfig;
    token: string;
    vlmConfig: ZaiVlmConfig;
  }): Promise<
    | {
        upstream: Response;
        auditHeaders: Record<string, string>;
        auditBody: Record<string, unknown>;
      }
    | { errorResult: ReturnType<typeof makeErrorResult> }
  > {
    let attachments: NonNullable<Parameters<typeof browserBackedChat>[0]["attachments"]>;
    try {
      const images = await resolveCursorImages(input.imageUrls);
      attachments = images.map((image, index) => ({
        name: zaiImageFileName(image.mimeType, index),
        mimeType: image.mimeType,
        buffer: image.data,
      }));
    } catch (error) {
      const message =
        error instanceof CursorImageError
          ? error.message
          : sanitizeErrorMessage(error instanceof Error ? error.message : "invalid image input");
      return {
        errorResult: makeErrorResult(
          error instanceof CursorImageError ? error.status : 400,
          `Z.ai image input error: ${message}`,
          input.body,
          CHAT_URL
        ),
      };
    }

    const poolKey = `zai-web:${createHash("sha256")
      .update(input.token)
      .digest("hex")
      .slice(0, 24)}`;
    let result: Awaited<ReturnType<typeof browserBackedChat>>;
    try {
      result = await browserBackedChat({
        poolKey,
        chatUrl: CHAT_URL,
        chatPageUrl: `${BASE_URL}/?model=${encodeURIComponent(browserModelName(input.modelId))}`,
        userMessage: browserPrompt(input.messages),
        localStorage: { token: input.token },
        localStorageOrigin: BASE_URL,
        cookieDomain: "chat.z.ai",
        chatUrlMatchDomain: "chat.z.ai",
        userAgent: USER_AGENT,
        locale: "en-US",
        timezone: "Asia/Seoul",
        inputSelector: "#chat-input",
        submitButtonSelector: '[aria-label="Send Message"] button:not([disabled])',
        submitButtonMode: "dom",
        attachments,
        beforeSubmit: (page) =>
          configureZaiBrowserRequest(page, {
            modelId: input.modelId,
            thinking: input.thinkingConfig,
            vlm: input.vlmConfig,
          }),
        postSubmitWaitMs: 30_000,
        signal: input.signal,
        reuseContext: true,
      });
    } catch (error) {
      const message = sanitizeErrorMessage(
        error instanceof Error ? error.message : "browser transport unavailable"
      );
      return {
        errorResult: makeErrorResult(
          502,
          `Z.ai browser transport failed: ${message}`,
          input.body,
          CHAT_URL
        ),
      };
    }

    if (result.status < 200 || result.status >= 300) {
      return {
        errorResult: makeErrorResult(
          result.status || 502,
          describeZaiBrowserFailure(result),
          input.body,
          CHAT_URL
        ),
      };
    }

    return {
      upstream: new Response(new Uint8Array(result.body), {
        status: result.status,
        headers: {
          "Content-Type": result.contentType || "text/event-stream",
        },
      }),
      auditHeaders: {
        Authorization: "Bearer [REDACTED]",
        "X-OmniRoute-Transport": "browser",
      },
      auditBody: {
        browser_backed: true,
        image_count: attachments.length,
        model: input.modelId,
        messages: foldMessages(input.messages),
        enable_thinking: input.thinkingConfig.enabled,
        auto_web_search: input.vlmConfig.websiteModeEnabled
          ? false
          : input.vlmConfig.webSearchEnabled,
        vlm_tools_enable: input.vlmConfig.toolsEnabled,
        vlm_web_search_enable:
          input.vlmConfig.websiteModeEnabled && input.vlmConfig.webSearchEnabled,
        vlm_website_mode: input.vlmConfig.websiteModeEnabled,
        ...(input.thinkingConfig.enabled && input.thinkingConfig.effortSupported
          ? { reasoning_effort: input.thinkingConfig.effort }
          : {}),
      },
    };
  }

  private makeChunkEmitter(id: string, created: number, modelId: string): ChunkEmitter {
    return (controller, delta, finish = null) => {
      const chunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model: modelId,
        choices: [{ index: 0, delta, finish_reason: finish }],
      };
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
    };
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, model, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;

    const rawCredential = String(credentials?.apiKey ?? credentials?.accessToken ?? "").trim();
    const token = extractZaiToken(rawCredential);
    if (!token) {
      return makeErrorResult(
        400,
        'Missing Z.ai web-session credential — copy the "token" value from chat.z.ai Local Storage.',
        body,
        CHAT_URL
      );
    }

    const captchaVerifyParam = resolveCaptchaVerifyParam(credentials, bodyObj);
    const messages = (bodyObj.messages as Array<{ role: string; content: unknown }>) || [];
    const prompt = latestUserPrompt(messages);
    const imageUrls = collectZaiImageUrls(messages);
    if (!prompt && imageUrls.length === 0) {
      return makeErrorResult(400, "Z.ai requires at least one user message", body, CHAT_URL);
    }

    const modelId = (bodyObj.model as string) || model || DEFAULT_MODEL;
    if (imageUrls.length > 0 && !getZaiModelCapabilities(modelId).vision) {
      return makeErrorResult(
        400,
        `Z.ai model ${unprefixedModelId(modelId)} does not accept image input; use GLM-5V-Turbo.`,
        body,
        CHAT_URL
      );
    }
    const userId = extractZaiUserId(token);
    if (!userId) {
      return makeErrorResult(
        400,
        "Invalid Z.ai web-session credential — its JWT payload does not contain the required user id.",
        body,
        CHAT_URL
      );
    }
    const thinkingConfig = resolveZaiThinkingConfig(modelId, bodyObj);
    const vlmConfig = resolveZaiVlmConfig(modelId, bodyObj);
    let upstream: Response;
    let auditHeaders: Record<string, string>;
    let auditBody: Record<string, unknown>;

    if (captchaVerifyParam && imageUrls.length === 0) {
      const frontendVersion = await this.resolveFrontendVersion(signal);
      const createdChat = await this.createRemoteChat({
        messages,
        modelId,
        token,
        enableThinking: thinkingConfig.enabled,
        reasoningEffort: thinkingConfig.effort,
        vlmConfig,
        signal,
        originalBody: body,
      });
      if ("errorResult" in createdChat) return createdChat.errorResult;

      const timestamp = Date.now();
      const requestId = randomUUID();
      const signature = buildZaiSignature({ prompt, requestId, timestamp, userId });
      const completionUrl = this.buildCompletionUrl({ requestId, timestamp, token, userId });
      const reqHeaders = this.buildZaiHeaders(token, {
        accept: "text/event-stream",
        frontendVersion,
        signature,
      });
      const reqBody = this.buildRequestBody({
        body: bodyObj,
        captchaVerifyParam,
        chatId: createdChat.chatId,
        messages,
        modelId,
        prompt,
        userMessageId: createdChat.userMessageId,
        enableThinking: thinkingConfig.enabled,
        reasoningEffort: thinkingConfig.effort,
        reasoningEffortSupported: thinkingConfig.effortSupported,
        vlmConfig,
      });
      const fetched = await this.fetchUpstream(completionUrl, reqHeaders, reqBody, body, signal);
      if ("errorResult" in fetched) return fetched.errorResult;
      upstream = fetched.upstream;
      auditHeaders = {
        ...reqHeaders,
        Authorization: "Bearer [REDACTED]",
        "X-Signature": "[REDACTED]",
      };
      auditBody = {
        ...reqBody,
        captcha_verify_param: "[REDACTED]",
      };
    } else {
      const fetched = await this.fetchThroughBrowser({
        body,
        imageUrls,
        messages,
        modelId,
        signal,
        thinkingConfig,
        token,
        vlmConfig,
      });
      if ("errorResult" in fetched) return fetched.errorResult;
      ({ upstream, auditHeaders, auditBody } = fetched);
    }

    const id = `chatcmpl-zai-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);
    const sourceBody = upstream.body ?? new ReadableStream({ start: (c) => c.close() });
    const emitChunk = this.makeChunkEmitter(id, created, modelId);
    if (wantStream) {
      const outStream = this.buildStreamingBody(sourceBody, modelId, emitChunk, signal);
      return {
        response: new Response(outStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: CHAT_URL,
        headers: auditHeaders,
        transformedBody: auditBody,
      };
    }

    let answer: string;
    let reasoning: string;
    try {
      ({ answer, reasoning } = await this.collectNonStreaming(sourceBody));
    } catch (error) {
      const message = sanitizeErrorMessage(
        error instanceof Error ? error.message : "invalid upstream stream"
      );
      return makeErrorResult(502, `Z.ai stream failed: ${message}`, body, CHAT_URL);
    }
    const message: Record<string, unknown> = { role: "assistant", content: answer };
    if (reasoning) message.reasoning_content = reasoning;
    const completion = {
      id,
      object: "chat.completion",
      created,
      model: modelId,
      choices: [{ index: 0, message, finish_reason: "stop" }],
    };
    return {
      response: new Response(JSON.stringify(completion), {
        headers: { "Content-Type": "application/json" },
      }),
      url: CHAT_URL,
      headers: auditHeaders,
      transformedBody: auditBody,
    };
  }
}
