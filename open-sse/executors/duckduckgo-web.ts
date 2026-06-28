import { createHash, generateKeyPairSync, randomUUID } from "node:crypto";
import vm from "node:vm";
import { parseFragment, serialize } from "parse5";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { prepareToolMessages, buildToolAwareResult } from "../translator/webTools.ts";
import type { Session } from "../services/sessionPool/session.ts";
import { tryBackedChat } from "../services/browserBackedChat.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export const DUCKDUCKGO_BASE = "https://duckduckgo.com";
// #4037: the live DuckDuckGo AI Chat backend is served from duckduckgo.com. The
// status/chat fetches, Origin, and Referer must all use this host so the request's
// same-origin triplet (host + Origin + Referer) stays consistent with
// `Sec-Fetch-Site: same-origin`; pointing them at duck.ai produced an inconsistent
// triplet the backend rejected with HTTP 400.
const AUTH_TOKEN_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/auth/token`;
const COUNTRY_URL = `${DUCKDUCKGO_BASE}/country.json`;
export const STATUS_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/status`;
export const CHAT_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/chat`;
const DEFAULT_FE_VERSION = "serp_20260424_180649_ET-0bdc33b2a02ebf8f235def65d887787f694720a1";
// #4037: the real served x-fe-version token has a 20-hex tail (e.g.
// `serp_20250401_100419_ET-19d438eb199b2bf7c300`); the previous `{40}` requirement
// never matched the live token, so the scrape silently fell back to DEFAULT_FE_VERSION.
// Bounded `{20,40}` keeps the pattern ReDoS-safe.
export const FE_VERSION_PATTERN = /serp_\d{8}_\d{6}_[A-Z]{2}-[0-9a-f]{20,40}/;
const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

export const FAKE_HEADERS: Record<string, string> = {
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  Origin: DUCKDUCKGO_BASE,
  Pragma: "no-cache",
  Referer: `${DUCKDUCKGO_BASE}/`,
  Priority: "u=1, i",
  "Sec-Ch-Ua": '"Chromium";v="149", "Not-A.Brand";v="24", "Google Chrome";v="149"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Linux"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent": DEFAULT_USER_AGENT,
};

const SEEDED_COOKIES: ReadonlyArray<readonly [string, string]> = [
  ["5", "1"],
  ["ah", "wt-wt"],
  ["dcs", "1"],
  ["dcm", "3"],
  ["isRecentChatOn", "1"],
];

function shouldUseBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

interface DuckDuckGoVqdHeaders {
  vqd4: string | null;
  vqdHash1: string | null;
}

interface DuckDuckGoAuthHeaders {
  vqd4: string | null;
  vqdHash1: string | null;
}

interface DuckDuckGoModelCapabilities {
  reasoningEffort: string | null;
}

type DuckDuckGoChallengeResult = {
  client_hashes?: unknown;
  [key: string]: unknown;
};

let durablePublicKey: JsonWebKey | null = null;

const CHALLENGE_STUBS = String.raw`
var __ua = __DDG_REAL_UA__;
var __HTML_LOOKUP = __DDG_HTML_LOOKUP__;
function __makeHtmlElement(tag) {
  var state = { _innerHTML: '', _qsaCount: 0, _cssText: '' };
  var el = {
    tagName: String(tag).toUpperCase(), nodeName: String(tag).toUpperCase(), nodeType: 1,
    children: [], childNodes: [], classList: [], dataset: {},
    offsetWidth: 1, offsetHeight: 1, clientWidth: 1, clientHeight: 1, scrollHeight: 1, scrollWidth: 1,
    getBoundingClientRect: function(){ return { x: 0, y: 0, top: 0, left: 0, right: 1, bottom: 1, width: 1, height: 1, toJSON: function(){ return {}; } }; },
    setAttribute: function(){}, removeAttribute: function(){},
    getAttribute: function(a){ if(a==='srcdoc') return state._srcdoc||''; return null; },
    hasAttribute: function(){ return false; }, appendChild: function(c){ return c; }, removeChild: function(c){ return c; },
    addEventListener: function(){}, removeEventListener: function(){}, querySelector: function(){ return null; },
    querySelectorAll: function(s){ if (s === '*') { var arr = []; arr.length = state._qsaCount; return arr; } return []; },
    cloneNode: function(){ return __makeHtmlElement(tag); }
  };
  Object.defineProperty(el, 'style', { value: new Proxy({}, { set: function(t, k, v){ t[k] = v; if (k === 'cssText') state._cssText = String(v); return true; }, get: function(t, k){ if (k === 'cssText') return state._cssText; return t[k] || ''; } }), enumerable: true, configurable: true });
  Object.defineProperty(el, 'innerHTML', { get: function(){ return state._innerHTML; }, set: function(v){ var key = String(v); var entry = __HTML_LOOKUP && __HTML_LOOKUP[key]; if (entry) { state._innerHTML = String(entry.html); state._qsaCount = entry.count|0; } else { state._innerHTML = key; state._qsaCount = 0; } }, enumerable: true, configurable: true });
  Object.defineProperty(el, 'outerHTML', { get: function(){ return '<' + tag + '>' + state._innerHTML + '</' + tag + '>'; }, enumerable: true });
  Object.defineProperty(el, 'srcdoc', { get: function(){ return state._srcdoc||''; }, set: function(v){ state._srcdoc = String(v); }, enumerable: true });
  Object.defineProperty(el, 'contentWindow', { get: function(){ var w = {}; w.document = __ifDoc; w.Proxy = Proxy; w.self = w; w.top = w; w.parent = w; w.window = w; return w; }, enumerable: true });
  Object.defineProperty(el, 'contentDocument', { get: function(){ return __ifDoc; }, enumerable: true });
  return el;
}
function __mkObj(name, base) {
  base = base || {};
  return new Proxy(base, {
    get: function(t, k) {
      if (k in t) return t[k];
      if (k === Symbol.toPrimitive) return function(){ return ''; };
      if (k === Symbol.iterator) return undefined;
      if (k === 'then' || k === 'catch' || k === 'finally') return undefined;
      if (k === 'constructor') return Object;
      if (k === 'toString' || k === 'valueOf') return function(){ return '[object ' + name + ']'; };
      if (k === 'length') return 0;
      if (k === 'nodeType') return 1;
      if (k === 'tagName' || k === 'nodeName') return 'DIV';
      if (k === 'innerHTML' || k === 'outerHTML' || k === 'textContent' || k === 'innerText' || k === 'value') return '';
      if (k === 'children' || k === 'childNodes' || k === 'classList') return [];
      // Real numeric layout values for the DDG challenge DOM probes.
      if (k === 'offsetWidth' || k === 'offsetHeight' || k === 'clientWidth' || k === 'clientHeight' || k === 'scrollHeight' || k === 'scrollWidth') return 1;
      if (k === 'getBoundingClientRect') return function(){ return { x: 0, y: 0, top: 0, left: 0, right: 1, bottom: 1, width: 1, height: 1, toJSON: function(){ return {}; } }; };
      if (typeof k === 'string' && (k.indexOf('get') === 0 || k.indexOf('query') === 0 || k.indexOf('find') === 0)) return function(){ return k === 'querySelectorAll' || k === 'getElementsByTagName' || k === 'getElementsByClassName' ? [] : null; };
      return function(){ return __mkObj(name + '.' + String(k)); };
    },
    has: function(t, k){ return k in t; }, set: function(t, k, v){ t[k] = v; return true; }
  });
}
function __parseCssDisplay(cssText){ if(!cssText) return ''; var m = String(cssText).match(/(?:^|;)\\s*display\\s*:\\s*([^;]+)/i); return m ? String(m[1]).trim() : ''; }
function __getComputedStyle(el){ var cssText = el && el.style && el.style.cssText || ''; var display = __parseCssDisplay(cssText); return { getPropertyValue: function(name){ if(String(name).toLowerCase()==='display') return display; return ''; }, cssText: cssText, display: display }; }
var __ifMeta = __mkObj('meta', { getAttribute: function(a){ return a==='content' ? "default-src 'none'; script-src 'unsafe-inline';" : null; }, hasAttribute: function(a){ return a==='content'; }, tagName: 'META', nodeName: 'META' });
var __ifDoc = __mkObj('iframeDoc', { querySelector: function(s){ if (s && s.indexOf('Content-Security-Policy') !== -1) return __ifMeta; if (s === 'meta') return __ifMeta; return null; }, querySelectorAll: function(s){ if (s && s.indexOf('Content-Security-Policy') !== -1) return [__ifMeta]; if (s === 'meta') return [__ifMeta]; return []; }, getElementsByTagName: function(t){ return t && t.toLowerCase()==='meta' ? [__ifMeta] : []; }, body: __mkObj('iframeBody'), head: __mkObj('iframeHead'), documentElement: __mkObj('iframeRoot'), createElement: function(){ return __mkObj('elem', {setAttribute:function(){}, appendChild:function(){}, removeChild:function(){}, getAttribute:function(){return null;}, hasAttribute:function(){return false;}}); }, cookie: '', readyState: 'complete' });
var __iframeEl = __mkObj('iframe', { contentDocument: __ifDoc, contentWindow: __mkObj('iframeWin', { document: __ifDoc, top: undefined, parent: undefined }), document: __ifDoc, getAttribute: function(a){ if (a==='sandbox') return 'allow-scripts allow-same-origin'; if (a==='srcdoc') return ''; if (a==='id') return 'jsa'; return null; }, hasAttribute: function(a){ return a==='sandbox'||a==='id'; }, tagName: 'IFRAME', nodeName: 'IFRAME', id: 'jsa' });
var document = __mkObj('document', { querySelector: function(s){ if (s === '#jsa') return __iframeEl; if (s && s.indexOf('Content-Security-Policy') !== -1) return __ifMeta; return null; }, querySelectorAll: function(s){ if (s === '#jsa') return [__iframeEl]; if (s && s.indexOf('Content-Security-Policy') !== -1) return [__ifMeta]; return []; }, getElementById: function(id){ return id==='jsa' ? __iframeEl : null; }, getElementsByTagName: function(t){ if(t&&t.toLowerCase()==='iframe') return [__iframeEl]; return []; }, getElementsByClassName: function(){ return []; }, body: __mkObj('body', {appendChild:function(){}, removeChild:function(){}, querySelector:function(s){return s==='#jsa'?__iframeEl:null;}, querySelectorAll:function(s){return s==='#jsa'?[__iframeEl]:[];}}), head: __mkObj('head'), documentElement: __mkObj('root'), createElement: function(tag){ return __makeHtmlElement(tag||'div'); }, createTextNode: function(t){ return {nodeType:3, nodeValue:String(t||''), textContent:String(t||'')}; }, cookie: '', readyState: 'complete', title: '', addEventListener: function(){}, removeEventListener: function(){} });
  var window = __mkObj('window', { document: document, __DDG_BE_VERSION__: 1, __DDG_FE_CHAT_HASH__: 1, navigator: __mkObj('navigator', { userAgent: __ua, webdriver: false, language: 'en-US', languages: ['en-US','en'], platform: 'Linux x86_64', vendor: 'Google Inc.', appVersion: '5.0 (X11)', cookieEnabled: true, onLine: true, hardwareConcurrency: 8, deviceMemory: 8 }), innerWidth: 1280, innerHeight: 800, outerWidth: 1280, outerHeight: 800, devicePixelRatio: 1, screen: __mkObj('screen', { width:1920, height:1080, availWidth:1920, availHeight:1080, colorDepth:24, pixelDepth:24 }), location: __mkObj('location', { href:'https://duck.ai/', origin:'https://duck.ai', host:'duck.ai', hostname:'duck.ai', protocol:'https:', pathname:'/' }), performance: __mkObj('perf', { now: function(){ return 0; }, timeOrigin: 0 }), history: __mkObj('history', { length: 1, state: null }), addEventListener: function(){}, removeEventListener: function(){}, dispatchEvent: function(){return true;}, setTimeout: function(fn){ try{fn();}catch(e){} return 0; }, clearTimeout: function(){}, hasOwnProperty: function(k){ if (k==='__DDG_BE_VERSION__'||k==='__DDG_FE_CHAT_HASH__') return true; return Object.prototype.hasOwnProperty.call(this,k); } });
window.top = window; window.self = window; window.window = window; window.parent = window; window.globalThis = window;
var top = window, self = window, parent = window, navigator = window.navigator, location = window.location, screen = window.screen, performance = window.performance, history = window.history;
var __R = null, __E = null;
function __HTMLClass(name){ var c = function(){}; c.prototype = __mkObj(name+'.proto'); return c; }
var HTMLElement = __HTMLClass('HTMLElement'), HTMLDivElement = __HTMLClass('HTMLDivElement'), HTMLIFrameElement = __HTMLClass('HTMLIFrameElement'), HTMLDocument = __HTMLClass('HTMLDocument'), Document = __HTMLClass('Document'), Element = __HTMLClass('Element'), Node = __HTMLClass('Node'), Window = __HTMLClass('Window'), Event = __HTMLClass('Event'), MouseEvent = __HTMLClass('MouseEvent'), KeyboardEvent = __HTMLClass('KeyboardEvent'), TouchEvent = __HTMLClass('TouchEvent'), XMLHttpRequest = __HTMLClass('XMLHttpRequest'), WebSocket = __HTMLClass('WebSocket'), Image = __HTMLClass('Image'), FormData = __HTMLClass('FormData'), Blob = __HTMLClass('Blob'), File = __HTMLClass('File'), FileReader = __HTMLClass('FileReader'), URL = __HTMLClass('URL'), URLSearchParams = __HTMLClass('URLSearchParams'), Headers = __HTMLClass('Headers'), Request = __HTMLClass('Request'), Response = __HTMLClass('Response');
var fetch = function(){ return Promise.resolve(__mkObj('resp', {ok:true, status:200, json:function(){return Promise.resolve({});}, text:function(){return Promise.resolve('');}})); };
var getComputedStyle = __getComputedStyle;
`;

function extractDuckDuckGoContent(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const record = data as Record<string, unknown>;
  const content = record.content;
  if (typeof content === "string") return content;
  const message = record.message;
  if (typeof message === "string") return message;
  return "";
}

function parseDuckDuckGoDataLine(line: string): unknown | null {
  if (!line.startsWith("data: ")) return null;
  try {
    return JSON.parse(line.slice(6));
  } catch (error) {
    void error;
    return null;
  }
}

function parseDuckDuckGoError(body: string): { type?: unknown; overrideCode?: unknown } | null {
  try {
    return JSON.parse(body) as { type?: unknown; overrideCode?: unknown };
  } catch (error) {
    void error;
    return null;
  }
}

function splitSetCookieHeader(header: string): string[] {
  const cookies: string[] = [];
  let start = 0;
  for (let index = 0; index < header.length; index++) {
    if (header[index] !== ",") continue;
    const rest = header.slice(index + 1);
    if (/^\s*[^=;\s]+\s*=/.test(rest)) {
      cookies.push(header.slice(start, index).trim());
      start = index + 1;
    }
  }
  cookies.push(header.slice(start).trim());
  return cookies.filter(Boolean);
}

function collectSetCookieHeaders(headers: Headers): string[] {
  const getSetCookie = (headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  if (typeof getSetCookie === "function") return getSetCookie.call(headers);
  const combined = headers.get("set-cookie");
  return combined ? splitSetCookieHeader(combined) : [];
}

function applySetCookie(cookieJar: Map<string, string>, setCookie: string): void {
  const pair = setCookie.split(";", 1)[0]?.trim();
  if (!pair) return;
  const separator = pair.indexOf("=");
  if (separator <= 0) return;
  cookieJar.set(pair.slice(0, separator), pair.slice(separator + 1));
}

function serializeCookieJar(cookieJar: Map<string, string>): string {
  return Array.from(cookieJar.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

function mergeHeadersCaseInsensitive(
  ...sources: Array<Record<string, string> | undefined>
): Record<string, string> {
  const merged: Record<string, string> = {};
  const canonicalNames = new Map<string, string>();
  for (const source of sources) {
    if (!source) continue;
    for (const [name, value] of Object.entries(source)) {
      const lowerName = name.toLowerCase();
      const previousName = canonicalNames.get(lowerName);
      if (previousName) delete merged[previousName];
      canonicalNames.set(lowerName, name);
      merged[name] = value;
    }
  }
  return merged;
}

function normalizeDuckDuckGoModel(model: string | undefined): string {
  if (!model) return "gpt-4o-mini";
  const clean = model.startsWith("duckduckgo-web/") ? model.slice("duckduckgo-web/".length) : model;
  if (clean === "claude-3-5-haiku-20241022") return "claude-haiku-4-5";
  if (clean === "llama-4-scout") return "meta-llama/Llama-4-Scout-17B-16E-Instruct";
  if (clean === "mistral-small-2501") return "mistral-small-2603";
  if (clean === "gpt-oss-120b") return "tinfoil/gpt-oss-120b";
  return clean;
}

function getDuckDuckGoModelCapabilities(model: string): DuckDuckGoModelCapabilities {
  if (model === "gpt-5-mini") return { reasoningEffort: "minimal" };
  if (model === "claude-haiku-4-5") return { reasoningEffort: "low" };
  if (model === "tinfoil/gpt-oss-120b") return { reasoningEffort: "low" };
  return { reasoningEffort: null };
}

function countHtmlElements(node: unknown): number {
  if (!node || typeof node !== "object") return 0;
  const record = node as { nodeName?: string; childNodes?: unknown[] };
  const own = record.nodeName && record.nodeName !== "#document-fragment" ? 1 : 0;
  let childCount = 0;
  for (const child of record.childNodes ?? []) {
    childCount += countHtmlElements(child);
  }
  return own + childCount;
}

function buildHtmlLookup(js: string): Record<string, { html: string; count: number }> {
  const lookup: Record<string, { html: string; count: number }> = {};
  const seen = new Set<string>();
  const pattern = /(['"])(<[^'"]{1,400}?)\1/g;
  for (const match of js.matchAll(pattern)) {
    const html = match[2];
    if (seen.has(html)) continue;
    seen.add(html);
    const fragment = parseFragment(html);
    lookup[html] = {
      html: serialize(fragment),
      count: Math.max(0, countHtmlElements(fragment) - 1),
    };
  }
  return lookup;
}

function sha256Base64(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("base64");
}

async function solveDuckDuckGoChallenge(challenge: string, userAgent: string): Promise<string> {
  // SECURITY NOTE: This function executes base64-decoded JavaScript from duck.ai via vm.runInContext.
  // The challenge code is upstream-supplied (supply-chain surface). It is sandboxed with a 5s timeout
  // to limit DoS risk. This is intentional for the DDG challenge solver to work.
  const js = Buffer.from(challenge, "base64").toString("utf8");
  const stubs = CHALLENGE_STUBS.replace("__DDG_REAL_UA__", JSON.stringify(userAgent)).replace(
    "__DDG_HTML_LOOKUP__",
    JSON.stringify(buildHtmlLookup(js))
  );
  const context = vm.createContext({});
  vm.runInContext(stubs, context, { timeout: 5000 });
  const result = (await vm.runInContext(js, context, {
    timeout: 5000,
  })) as DuckDuckGoChallengeResult;
  const clientHashes = Array.isArray(result.client_hashes) ? result.client_hashes : [];
  if (clientHashes.length === 0)
    throw new Error("DuckDuckGo challenge returned empty client_hashes");
  clientHashes[0] = userAgent;
  result.client_hashes = clientHashes.map((hash) => sha256Base64(String(hash)));
  return Buffer.from(JSON.stringify(result), "utf8").toString("base64");
}

function makeDuckDuckGoFeSignals(): string {
  const start = Date.now() - 3000;
  let delta = 80 + Math.floor(Math.random() * 101);
  const events: Array<Record<string, unknown>> = [{ name: "onboarding_impression_1", delta }];
  delta += 120 + Math.floor(Math.random() * 141);
  events.push({ name: "onboarding_impression_2", delta });
  delta += 200 + Math.floor(Math.random() * 301);
  events.push({ name: "startNewChat", delta });
  const keyEvents = 6 + Math.floor(Math.random() * 13);
  for (let i = 0; i < keyEvents; i++) {
    delta += 40 + Math.floor(Math.random() * 141);
    events.push({ name: "user_input", delta });
  }
  delta += 120 + Math.floor(Math.random() * 231);
  events.push({ name: "user_submit", delta });
  const payload = {
    start,
    events,
    end: Math.max(delta + 20 + Math.floor(Math.random() * 71), 3000),
  };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

function extractDuckDuckGoFeVersion(html: string): string | null {
  return html.match(FE_VERSION_PATTERN)?.[0] ?? null;
}

function getDurablePublicKey(): JsonWebKey {
  if (!durablePublicKey) {
    const { publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicExponent: 0x10001,
    });
    durablePublicKey = {
      ...publicKey.export({ format: "jwk" }),
      alg: "RSA-OAEP-256",
      ext: true,
      key_ops: ["encrypt"],
      use: "enc",
    };
  }
  return durablePublicKey;
}

function buildDuckDuckGoPayload(
  model: string,
  messages: Array<Record<string, unknown>>,
  canUseTools = true
): Record<string, unknown> {
  const capabilities = getDuckDuckGoModelCapabilities(model);
  const payload: Record<string, unknown> = {
    model,
    metadata: {
      toolChoice: {
        NewsSearch: false,
        VideosSearch: false,
        LocalSearch: false,
        WeatherForecast: false,
      },
    },
    messages,
    canUseTools,
    ...(capabilities.reasoningEffort ? { reasoningEffort: capabilities.reasoningEffort } : {}),
    canUseApproxLocation: null,
    canDelegateImageGeneration: null,
    durableStream: {
      messageId: randomUUID(),
      conversationId: randomUUID(),
      publicKey: getDurablePublicKey(),
    },
  };
  return payload;
}

function normalizeDuckDuckGoError(status: number, body: string): string {
  const parsed = parseDuckDuckGoError(body);
  if (parsed) {
    const type = typeof parsed.type === "string" ? parsed.type : "";
    const overrideCode = typeof parsed.overrideCode === "string" ? parsed.overrideCode : "";
    if (type === "ERR_CHALLENGE" || type === "ERR_BN_LIMIT") {
      const codeSuffix = overrideCode ? ` (${overrideCode})` : "";
      return (
        `DuckDuckGo AI Chat anti-abuse challenge failed: ${type}${codeSuffix}. ` +
        "Retry later or from a less rate-limited IP; DuckDuckGo is rejecting this anonymous session."
      );
    }
    if (type) return `DuckDuckGo AI Chat error: ${type}`;
  }

  return `DuckDuckGo AI Chat returned HTTP ${status}`;
}

/**
 * DuckDuckGoWebExecutor handles anonymous, free access to DuckDuckGo AI Chat.
 *
 * Authentication flow:
 * 1. GET /duckchat/v1/status → get x-vqd-hash-1 header (VQD token)
 * 2. POST /duckchat/v1/chat with VQD header + model + messages
 * 3. Parse NDJSON SSE stream and transform to OpenAI format
 *
 * VQD tokens are per-request; no caching or cleanup needed.
 */
export class DuckDuckGoWebExecutor extends BaseExecutor {
  protected poolConfig = {
    minSessions: 2,
    maxSessions: 5,
    cooldownBase: 1000,
    cooldownMax: 10000,
    cooldownJitter: 500,
    requestTimeout: 30000,
    requestJitter: 50,
  };

  constructor() {
    super("duckduckgo-web", { baseUrl: DUCKDUCKGO_BASE });
  }

  private warmed = false;
  private seeded = false;
  private feVersion = DEFAULT_FE_VERSION;
  private pendingVqdHash1: string | null = null;
  private readonly cookieJar = new Map<string, string>();

  private buildRequestHeaders(extra: Record<string, string> = {}): Record<string, string> {
    const headers = { ...FAKE_HEADERS, ...extra };
    const cookie = serializeCookieJar(this.cookieJar);
    return cookie ? { ...headers, Cookie: cookie } : headers;
  }

  private rememberResponseCookies(response: Response): void {
    for (const cookie of collectSetCookieHeaders(response.headers)) {
      applySetCookie(this.cookieJar, cookie);
    }
  }

  private seedBrowserCookies(): void {
    for (const [name, value] of SEEDED_COOKIES) {
      if (!this.cookieJar.has(name)) this.cookieJar.set(name, value);
    }
  }

  private async warmFetch(
    url: string,
    headers: Record<string, string>,
    signal: AbortSignal
  ): Promise<Response | null> {
    try {
      const response = await fetch(url, { headers, signal });
      this.rememberResponseCookies(response);
      return response;
    } catch (error) {
      void error;
      return null;
    }
  }

  async testConnection(
    _credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      const resp = await fetch(STATUS_URL, {
        method: "GET",
        headers: this.buildRequestHeaders({
          Accept: "*/*",
          "Cache-Control": "no-store",
          "x-vqd-accept": "1",
        }),
        signal: mergedSignal,
      });
      this.rememberResponseCookies(resp);

      clearTimeout(timeout);

      return (
        resp.ok &&
        (resp.headers.get("x-vqd-4") !== null || resp.headers.get("x-vqd-hash-1") !== null)
      );
    } catch {
      return false;
    }
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, body, stream, signal, upstreamExtraHeaders } = input;
    const upstreamModel = normalizeDuckDuckGoModel(model);
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawMessages = Array.isArray((body as { messages?: unknown[] } | null)?.messages)
      ? ((body as { messages: unknown[] }).messages as Array<Record<string, unknown>>)
      : [];
    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(
      bodyObj,
      rawMessages
    );
    const messages = effectiveMessages as Array<Record<string, unknown>>;
    const isStreaming = stream !== false;
    const upstreamHeaders = upstreamExtraHeaders || {};

    const errorResponse = (status: number, message: string): Response =>
      new Response(JSON.stringify({ error: { message } }), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    if (messages.length === 0) {
      return errorResponse(400, "No messages provided");
    }

    // Browser-backed path: opt-in via OMNIROUTE_BROWSER_POOL=on or
    // WEB_COOKIE_USE_BROWSER=1. Routes the chat through a shared
    // Playwright/Cloakbrowser page so DDG's VQD challenge is solved by
    // a real browser. Latency is dominated by page navigation + AI wait
    // (~10-25s), but it's the only way to get HTTP 200 from this
    // environment once the Node vm solver hits its anti-bot ceiling.
    if (shouldUseBrowserBacked()) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      const userText = extractDuckDuckGoContent(lastUser ?? { content: "" });
      const result = await tryBackedChat({
        poolKey: "duckduckgo-web",
        chatPageUrl: "https://duck.ai/chat",
        chatUrl: CHAT_URL,
        chatUrlMatchDomain: "duck.ai",
        userMessage: userText || "Reply with OK",
        inputSelector: "textarea",
        submitButtonSelector: "button[aria-label='Ask']",
        signal: signal ?? null,
        postSubmitWaitMs: 15000,
      });
      if (result.status > 0) {
        // Wrap the captured body as a Response so processResponse
        // (already a streaming/non-streaming transformer) can be
        // reused unchanged.
        const upstreamResp = new Response(result.body, {
          status: result.status,
          headers: {
            "Content-Type": result.contentType || "text/event-stream",
          },
        });
        return await this.processResponse(upstreamResp, isStreaming, hasTools, requestedTools);
      }
      // status 0 means no response captured (selector/navigation error).
      return errorResponse(502, "Browser-backed chat captured no upstream response");
    }

    // Acquire session from pool for fingerprint rotation
    const pool = this.getPool();
    let session: Session | null;
    try {
      session = pool ? await pool.acquireBlocking(10_000) : null;
    } catch {
      session = null;
    }
    const sessionHeaders = session ? session.buildHeaders() : {};

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      const sendChat = async (vqdHeaders: DuckDuckGoAuthHeaders): Promise<Response> => {
        const payload = buildDuckDuckGoPayload(upstreamModel, messages);
        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: mergeHeadersCaseInsensitive(
            sessionHeaders,
            this.buildRequestHeaders(),
            upstreamHeaders,
            {
              Accept: "text/event-stream",
              "Content-Type": "application/json",
              "x-ddg-journey-id": randomUUID().replaceAll("-", ""),
              "x-fe-signals": makeDuckDuckGoFeSignals(),
              "x-fe-version": this.feVersion,
              ...(vqdHeaders.vqd4 ? { "x-vqd-4": vqdHeaders.vqd4 } : {}),
              ...(vqdHeaders.vqdHash1 ? { "x-vqd-hash-1": vqdHeaders.vqdHash1 } : {}),
            }
          ),
          body: JSON.stringify(payload),
          signal: mergedSignal,
        });
        this.rememberResponseCookies(response);
        this.rememberChallengeHeader(response);
        return response;
      };

      if (mergedSignal.aborted) {
        clearTimeout(timeout);
        return errorResponse(499, "Request cancelled");
      }

      await this.warmSession(mergedSignal);
      await this.seedChallengeChain(upstreamModel, mergedSignal);
      const vqdHeaders = await this.acquireAuthHeaders(mergedSignal);
      if (!vqdHeaders.vqd4 && !vqdHeaders.vqdHash1) {
        clearTimeout(timeout);
        return errorResponse(503, "Failed to acquire VQD token");
      }

      let chatResponse = await sendChat(vqdHeaders);

      if (chatResponse.status === 418) {
        this.pendingVqdHash1 = null;
        const freshVqd = await this.acquireAuthHeaders(mergedSignal);
        if (freshVqd.vqd4 || freshVqd.vqdHash1) {
          chatResponse = await sendChat(freshVqd);
        }
      }

      clearTimeout(timeout);

      if (chatResponse.status === 429) {
        if (pool && session) pool.reportCooldown(session);
        return await this.processResponse(chatResponse, isStreaming, hasTools, requestedTools);
      }

      if (chatResponse.status === 401 || chatResponse.status === 403) {
        this.pendingVqdHash1 = null;
        const freshVqd = await this.acquireAuthHeaders(mergedSignal);
        if (freshVqd.vqd4 || freshVqd.vqdHash1) {
          const retryResponse = await sendChat(freshVqd);
          return await this.processResponse(retryResponse, isStreaming, hasTools, requestedTools);
        }
        return errorResponse(503, "Service unavailable");
      }

      if (chatResponse.status >= 500) {
        if (pool && session) pool.reportDead(session);
        return errorResponse(502, "Upstream error");
      }

      const result = await this.processResponse(
        chatResponse,
        isStreaming,
        hasTools,
        requestedTools
      );

      // Report pool status based on response
      if (pool && session) {
        if (chatResponse.status === 429) {
          pool.reportCooldown(session);
        } else if (chatResponse.status >= 500) {
          pool.reportDead(session);
        } else {
          pool.reportSuccess(session);
        }
      }

      return result;
    } catch (error) {
      if (pool && session) {
        pool.reportCooldown(session);
      }

      if (error instanceof DOMException && error.name === "AbortError") {
        return errorResponse(499, "Request cancelled");
      }

      return errorResponse(
        500,
        sanitizeErrorMessage(error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      session?.release();
    }
  }

  private async acquireVqdHeaders(signal: AbortSignal): Promise<DuckDuckGoVqdHeaders> {
    try {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");

      const resp = await fetch(STATUS_URL, {
        method: "GET",
        headers: this.buildRequestHeaders({
          Accept: "*/*",
          "Cache-Control": "no-store",
          "x-vqd-accept": "1",
        }),
        signal,
      });
      this.rememberResponseCookies(resp);

      if (!resp.ok) return { vqd4: null, vqdHash1: null };
      return {
        vqd4: resp.headers.get("x-vqd-4"),
        vqdHash1: resp.headers.get("x-vqd-hash-1"),
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      return { vqd4: null, vqdHash1: null };
    }
  }

  private async acquireAuthHeaders(signal: AbortSignal): Promise<DuckDuckGoAuthHeaders> {
    if (this.pendingVqdHash1) {
      const challenge = this.pendingVqdHash1;
      this.pendingVqdHash1 = null;
      try {
        return {
          vqd4: null,
          vqdHash1: await solveDuckDuckGoChallenge(challenge, FAKE_HEADERS["User-Agent"]),
        };
      } catch (error) {
        void error;
      }
    }

    const headers = await this.acquireVqdHeaders(signal);
    if (headers.vqdHash1) {
      try {
        return {
          vqd4: headers.vqd4,
          vqdHash1: await solveDuckDuckGoChallenge(headers.vqdHash1, FAKE_HEADERS["User-Agent"]),
        };
      } catch (error) {
        void error;
        return headers;
      }
    }
    return headers;
  }

  private rememberChallengeHeader(response: Response): void {
    const nextHash = response.headers.get("x-vqd-hash-1");
    if (nextHash) this.pendingVqdHash1 = nextHash;
  }

  private async warmSession(signal: AbortSignal): Promise<void> {
    if (this.warmed || signal.aborted) return;
    this.warmed = true;
    this.seedBrowserCookies();
    const homepageResponse = await this.warmFetch(
      `${DUCKDUCKGO_BASE}/`,
      this.buildRequestHeaders({
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      }),
      signal
    );
    if (homepageResponse) {
      try {
        const homepageHtml = await homepageResponse.clone().text();
        const feVersion = extractDuckDuckGoFeVersion(homepageHtml);
        if (feVersion) this.feVersion = feVersion;
      } catch (error) {
        void error;
      }
    }
    await this.warmFetch(COUNTRY_URL, this.buildRequestHeaders({ Accept: "*/*" }), signal);
    await this.warmFetch(AUTH_TOKEN_URL, this.buildRequestHeaders({ Accept: "*/*" }), signal);
    await this.warmFetch(
      `${DUCKDUCKGO_BASE}/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1`,
      this.buildRequestHeaders({
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Origin: DUCKDUCKGO_BASE,
        Referer: `${DUCKDUCKGO_BASE}/`,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      }),
      signal
    );
  }

  private async seedChallengeChain(model: string, signal: AbortSignal): Promise<void> {
    if (this.seeded || signal.aborted) return;
    this.seeded = true;
    const seedMessages = [{ role: "user", content: "hi" }];
    const previousPending = this.pendingVqdHash1;
    try {
      const vqdHeaders = await this.acquireAuthHeaders(signal);
      if (!vqdHeaders.vqd4 && !vqdHeaders.vqdHash1) {
        this.pendingVqdHash1 = previousPending;
        return;
      }
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: mergeHeadersCaseInsensitive(this.buildRequestHeaders(), {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
          "x-ddg-journey-id": randomUUID().replaceAll("-", ""),
          "x-fe-signals": makeDuckDuckGoFeSignals(),
          "x-fe-version": this.feVersion,
          ...(vqdHeaders.vqd4 ? { "x-vqd-4": vqdHeaders.vqd4 } : {}),
          ...(vqdHeaders.vqdHash1 ? { "x-vqd-hash-1": vqdHeaders.vqdHash1 } : {}),
        }),
        body: JSON.stringify(buildDuckDuckGoPayload(model, seedMessages, false)),
        signal,
      });
      this.rememberResponseCookies(response);
      if (response.ok) this.rememberChallengeHeader(response);
      else this.pendingVqdHash1 = previousPending;
      await response.body?.cancel().catch(() => {});
    } catch (error) {
      void error;
      this.pendingVqdHash1 = previousPending;
    }
  }

  private async processResponse(
    response: Response,
    streaming: boolean,
    hasTools?: boolean,
    requestedTools?: unknown
  ): Promise<Response> {
    if (!response.ok) {
      const body = await response.text();
      return new Response(
        JSON.stringify({ error: { message: normalizeDuckDuckGoError(response.status, body) } }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (streaming) {
      if (!response.body) {
        return new Response(JSON.stringify({ error: { message: "No response body" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          const text = new TextDecoder().decode(chunk);
          const lines = text.split("\n");

          for (const line of lines) {
            if (!line.trim()) continue;
            if (line === "[DONE]") {
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              continue;
            }

            const data = parseDuckDuckGoDataLine(line);
            const content = extractDuckDuckGoContent(data);
            if (content) {
              const openaiFormat = {
                choices: [
                  {
                    delta: { content },
                    index: 0,
                  },
                ],
              };
              const encoded = new TextEncoder().encode(`data: ${JSON.stringify(openaiFormat)}\n\n`);
              controller.enqueue(encoded);
            }
          }
        },
      });

      const transformedBody = response.body.pipeThrough(transformStream);
      return new Response(transformedBody, {
        headers: { "Content-Type": "text/event-stream" },
      });
    } else {
      const text = await response.text();
      let fullContent = "";

      const lines = text.split("\n");
      for (const line of lines) {
        if (!line.trim() || line === "[DONE]") continue;

        fullContent += extractDuckDuckGoContent(parseDuckDuckGoDataLine(line));
      }

      const openaiResponse = hasTools
        ? (() => {
            const { content, toolCalls, finishReason } = buildToolAwareResult(
              fullContent,
              requestedTools,
              "ddg"
            );
            const message: Record<string, unknown> = { role: "assistant", content };
            if (toolCalls) {
              message.tool_calls = toolCalls;
              message.content = null;
            }
            return { choices: [{ index: 0, message, finish_reason: finishReason }] };
          })()
        : {
            choices: [
              {
                message: { content: fullContent, role: "assistant" },
                index: 0,
                finish_reason: "stop",
              },
            ],
          };

      return new Response(JSON.stringify(openaiResponse), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

export const duckduckgoWebExecutor = new DuckDuckGoWebExecutor();
