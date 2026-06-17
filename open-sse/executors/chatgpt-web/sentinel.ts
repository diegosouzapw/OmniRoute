import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "../base.ts";
import { OMNIROUTE_VERSION } from "@/shared/constants/version.ts";
import { getProxyForAccount } from "../../utils/proxyFallback.ts";
import { HttpsProxyAgent } from "https-proxy-agent";
import crypto, { randomBytes, randomUUID } from "node:crypto";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usage/callLogArtifacts.ts";
import { streamWithTimeout } from "../../utils/stream.ts";
import { ANTIGRAVITY_CONFIG } from "../../config/errorConfig.ts";
import {
  storeChatGptImage,
  getChatGptImageConversationContext,
  __resetChatGptImageCacheForTesting,
  type ChatGptImageConversationContext,
} from "../../services/chatgptImageCache.ts";

import {
  CHATGPT_BASE,
  CHATGPT_USER_AGENT,
  OAI_CLIENT_VERSION,
  browserHeaders,
  oaiHeaders,
} from "./constants.ts";
import { buildSessionCookieHeader } from "./session.ts";

export const SENTINEL_PREPARE_URL = `${CHATGPT_BASE}/backend-api/sentinel/chat-requirements/prepare`;

export const SENTINEL_CR_URL = `${CHATGPT_BASE}/backend-api/sentinel/chat-requirements`;

// ─── /backend-api/sentinel/chat-requirements ────────────────────────────────

export interface ChatRequirements {
  /** Returned by /chat-requirements (the "real" chat requirements token). */
  token?: string;
  /** Returned by /chat-requirements/prepare (sent as a prerequisite header). */
  prepare_token?: string;
  persona?: string;
  proofofwork?: {
    required?: boolean;
    seed?: string;
    difficulty?: string;
  };
  turnstile?: {
    required?: boolean;
    dx?: string;
  };
}

async function prepareChatRequirements(
  accessToken: string,
  accountId: string | null,
  sessionId: string,
  deviceId: string,
  cookie: string,
  dplInfo: { dpl: string; scriptSrc: string },
  signal: AbortSignal | null | undefined,
  log?: { warn?: (tag: string, msg: string) => void } | null
): Promise<ChatRequirements> {
  const config = buildPrekeyConfig(CHATGPT_USER_AGENT, dplInfo.dpl, dplInfo.scriptSrc);
  const prekey = await buildPrepareToken(config, log);

  const headers: Record<string, string> = {
    ...browserHeaders(),
    ...oaiHeaders(sessionId, deviceId),
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    Cookie: buildSessionCookieHeader(cookie),
    Priority: "u=1, i",
  };
  if (accountId) headers["chatgpt-account-id"] = accountId;

  // Stage 1: POST /chat-requirements/prepare → { prepare_token, ... }
  const prepResp = await tlsFetchChatGpt(SENTINEL_PREPARE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ p: prekey }),
    timeoutMs: 30_000,
    signal,
  });
  if (prepResp.status === 401 || prepResp.status === 403) {
    throw new SentinelBlockedError(`Sentinel /prepare blocked (HTTP ${prepResp.status})`);
  }
  if (prepResp.status >= 400) {
    throw new Error(`Sentinel /prepare failed (HTTP ${prepResp.status})`);
  }
  let prepData: ChatRequirements = {};
  try {
    prepData = JSON.parse(prepResp.text || "{}") as ChatRequirements;
  } catch {
    console.warn("[chatgpt-web] chat requirements prep JSON parse failed");
    /* keep empty */
  }
  // Stage 2: POST /chat-requirements with the prepare_token in the body. This
  // is the call that actually returns the chat-requirements-token used on the
  // conversation request.
  if (!prepData.prepare_token) {
    return prepData; // pass through whatever we got — caller handles missing fields
  }

  const crBody: Record<string, unknown> = { p: prekey, prepare_token: prepData.prepare_token };
  const crResp = await tlsFetchChatGpt(SENTINEL_CR_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(crBody),
    timeoutMs: 30_000,
    signal,
  });
  if (crResp.status === 401 || crResp.status === 403) {
    throw new SentinelBlockedError(`Sentinel /chat-requirements blocked (HTTP ${crResp.status})`);
  }
  if (crResp.status >= 400) {
    // Fall back to whatever /prepare returned — some accounts may not need stage 2.
    return prepData;
  }
  try {
    const crData = JSON.parse(crResp.text || "{}") as ChatRequirements;
    // Merge: prepare_token from stage 1, everything else from stage 2.
    return { ...crData, prepare_token: prepData.prepare_token };
  } catch {
    console.warn("[chatgpt-web] chat requirements response JSON parse failed");
    return prepData;
  }
}

export class SentinelBlockedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SentinelBlockedError";
  }
}

// ─── Proof-of-work solver ──────────────────────────────────────────────────
// Mimics the openai-sentinel / chat2api algorithm. The browser sends a base64-encoded
// JSON config string; the server combines it with a seed and expects a SHA3-512 hash
// whose hex-prefix is ≤ the difficulty target.
//
// Reference: github.com/leetanshaj/openai-sentinel, github.com/lanqian528/chat2api
// Returns "gAAAAAB" + base64 of the winning config (server-recognised prefix).

// ─── DPL / script-src cache (warmup) ────────────────────────────────────────
// Sentinel's prekey check inspects whether config[5]/config[6] reference a real
// chatgpt.com deployment (DPL hash + a script URL from the HTML). We GET / once
// per hour to scrape these — same trick chat2api uses.

export interface DplInfo {
  dpl: string;
  scriptSrc: string;
  expiresAt: number;
}

export let dplCache: DplInfo | null = null;

export const DPL_TTL_MS = 60 * 60 * 1000;

async function fetchDpl(
  cookie: string,
  signal: AbortSignal | null | undefined
): Promise<{ dpl: string; scriptSrc: string }> {
  if (dplCache && Date.now() < dplCache.expiresAt) {
    return { dpl: dplCache.dpl, scriptSrc: dplCache.scriptSrc };
  }
  const headers: Record<string, string> = {
    ...browserHeaders(),
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    Cookie: buildSessionCookieHeader(cookie),
  };
  const response = await tlsFetchChatGpt(`${CHATGPT_BASE}/`, {
    method: "GET",
    headers,
    timeoutMs: 20_000,
    signal,
  });
  const html = response.text || "";
  const dplMatch = html.match(/data-build="([^"]+)"/);
  const dpl = dplMatch ? `dpl=${dplMatch[1]}` : `dpl=${OAI_CLIENT_VERSION.replace(/^prod-/, "")}`;
  const scriptMatch = html.match(/<script[^>]+src="(https?:\/\/[^"]*\.js[^"]*)"/);
  const scriptSrc =
    scriptMatch?.[1] ?? `${CHATGPT_BASE}/_next/static/chunks/webpack-${randomHex(16)}.js`;
  dplCache = { dpl, scriptSrc, expiresAt: Date.now() + DPL_TTL_MS };
  return { dpl, scriptSrc };
}

export function randomHex(n: number): string {
  return randomBytes(Math.ceil(n / 2))
    .toString("hex")
    .slice(0, n);
}

// ─── Browser fingerprint key lists (used in prekey config[10..12]) ─────────
// Chosen to look like real navigator/document/window inspection. The unicode
// MINUS SIGN (U+2212) in the navigator strings matches what `Object.toString()`
// produces in real browsers — Sentinel checks for it.

export const NAVIGATOR_KEYS = [
  "webdriver−false",
  "geolocation",
  "languages",
  "language",
  "platform",
  "userAgent",
  "vendor",
  "hardwareConcurrency",
  "deviceMemory",
  "permissions",
  "plugins",
  "mediaDevices",
];

export const DOCUMENT_KEYS = [
  "_reactListeningkfj3eavmks",
  "_reactListeningo743lnnpvdg",
  "location",
  "scrollingElement",
  "documentElement",
];

export const WINDOW_KEYS = [
  "webpackChunk_N_E",
  "__NEXT_DATA__",
  "chrome",
  "history",
  "screen",
  "navigation",
  "scrollX",
  "scrollY",
];

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildPrekeyConfig(userAgent: string, dpl: string, scriptSrc: string): unknown[] {
  const screenSizes = [3000, 4000, 3120, 4160] as const;
  const cores = [8, 16, 24, 32] as const;
  const dateStr = new Date().toString();
  const perfNow = performance.now();
  const epochOffset = Date.now() - perfNow;

  return [
    pick(screenSizes),
    dateStr,
    4294705152,
    0, // mutated by solver
    userAgent,
    scriptSrc,
    dpl,
    "en-US",
    "en-US,en",
    0, // mutated by solver
    pick(NAVIGATOR_KEYS),
    pick(DOCUMENT_KEYS),
    pick(WINDOW_KEYS),
    perfNow,
    randomUUID(),
    "",
    pick(cores),
    epochOffset,
  ];
}

/**
 * Build the `p` (prekey) value sent in the chat-requirements POST body.
 *
 * Format: "<prefix>" + base64(JSON(config)), with a PoW solver loop mutating
 * config[3] to find a hash whose hex prefix is ≤ the target difficulty.
 * Mirrors chat2api / openai-sentinel.
 *   - prepare:      prefix="gAAAAAC", seed=""           (target "0fffff")
 *   - chat-requirements: prefix="gAAAAAB", seed=<server seed>  (target=difficulty)
 *
 * Submitting an unsolved token still works on low-friction accounts, so we
 * fall back to that after exhausting the iteration budget — but emit a warn
 * log so production can see when it happens.
 */
// PoW solvers run up to 100k–500k SHA3-512 hashes. To avoid blocking the
// Node event loop on a busy server, we yield with `setImmediate` every
// POW_YIELD_EVERY iterations — roughly every ~5ms of work — so concurrent
// requests and I/O still get scheduled. Wall time is approximately the same
// as the synchronous version; what changes is fairness, not throughput.
export const POW_YIELD_EVERY = 1000;

export function yieldToEventLoop(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

export interface PowOptions {
  config: unknown[];
  seed: string;
  target: string;
  prefix: string;
  maxIter: number;
  label: string;
  log?: { warn?: (tag: string, msg: string) => void } | null;
}

async function solvePow(opts: PowOptions): Promise<string> {
  const cfg = [...opts.config];
  for (let i = 0; i < opts.maxIter; i++) {
    if (i > 0 && i % POW_YIELD_EVERY === 0) await yieldToEventLoop();
    cfg[3] = i;
    const json = JSON.stringify(cfg);
    const b64 = Buffer.from(json).toString("base64");
    const hash = createHash("sha3-512")
      .update(opts.seed + b64)
      .digest("hex");
    if (opts.target && hash.slice(0, opts.target.length) <= opts.target) {
      return `${opts.prefix}${b64}`;
    }
  }
  opts.log?.warn?.(
    "CGPT-WEB",
    `PoW (${opts.label}) exhausted ${opts.maxIter} iterations against target=${opts.target || "<empty>"}; submitting unsolved token (Sentinel may reject)`
  );
  const b64 = Buffer.from(JSON.stringify(cfg)).toString("base64");
  return `${opts.prefix}${b64}`;
}

async function buildPrepareToken(
  config: unknown[],
  log?: { warn?: (tag: string, msg: string) => void } | null
): Promise<string> {
  return solvePow({
    config,
    seed: "",
    target: "0fffff",
    prefix: "gAAAAAC",
    maxIter: 100_000,
    label: "prepare",
    log,
  });
}

async function solveProofOfWork(
  seed: string,
  difficulty: string,
  config: unknown[],
  log?: { warn?: (tag: string, msg: string) => void } | null
): Promise<string> {
  return solvePow({
    config,
    seed,
    target: (difficulty || "").toLowerCase(),
    prefix: "gAAAAAB",
    maxIter: 500_000,
    label: "conversation",
    log,
  });
}
