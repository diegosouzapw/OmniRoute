// DuckDuckGo anti-abuse challenge solver + FE signals (pure of module state).
// SECURITY: solveDuckDuckGoChallenge runs upstream-supplied JS in a vm sandbox with a
// 5s timeout (see inline note). Extracted verbatim from duckduckgo-web.ts.
import { createHash } from "node:crypto";
import vm from "node:vm";
import { parseFragment, serialize } from "parse5";

// WARNING: the contents of this template literal are NOT TypeScript — they are plain
// script-mode JavaScript executed via `vm.runInContext`. `vm.runInContext` compiles in
// script (non-module) mode, so an `export` keyword anywhere in here is a hard
// SyntaxError that kills the whole solver. A refactor that mass-added `export` to the
// five `function` declarations below silently broke every DuckDuckGo chat request
// (solve threw -> unsolved challenge sent -> HTTP 418 ERR_CHALLENGE). Do not add
// `export`/`import` to this string; `duckduckgo-challenge-split.test.ts` guards this.
export const CHALLENGE_STUBS = String.raw`
var __ua = __DDG_REAL_UA__;
var __HTML_LOOKUP = __DDG_HTML_LOOKUP__;
// Browser-fidelity shims for the DDG "am I a real browser" probes.
// In a browser every built-in stringifies as native code; under a plain vm
// context the user-land re-declarations below would otherwise leak their source.
function __nativeFn(fn, name){
  Object.defineProperty(fn, 'name', { value: name, configurable: true });
  fn.toString = function(){ return 'function ' + name + '() { [native code] }'; };
  return fn;
}
__nativeFn(parseInt, 'parseInt');
__nativeFn(parseFloat, 'parseFloat');
__nativeFn(isNaN, 'isNaN');
__nativeFn(encodeURIComponent, 'encodeURIComponent');
__nativeFn(decodeURIComponent, 'decodeURIComponent');
// NOTE: do NOT seal Math. Real Chromium reports Object.isSealed(Math) === false,
// and at least one challenge variant probes exactly that; sealing it here made
// the vector differ from the browser by one and failed the challenge.
function __makeHtmlElement(tag) {
  var state = { _innerHTML: '', _qsaCount: 0, _cssText: '' };
  // Instantiate against the real per-tag constructor so
  // document.createElement('div') instanceof HTMLDivElement holds.
  var el = Object.create(__ctorForTag(tag).prototype);
  Object.assign(el, {
    tagName: String(tag).toUpperCase(), nodeName: String(tag).toUpperCase(), nodeType: 1,
    children: [], childNodes: [], classList: [], dataset: {},
    offsetWidth: 1, offsetHeight: 1, clientWidth: 1, clientHeight: 1, scrollHeight: 1, scrollWidth: 1,
    getBoundingClientRect: function(){ return { x: 0, y: 0, top: 0, left: 0, right: 1, bottom: 1, width: 1, height: 1, toJSON: function(){ return {}; } }; },
    setAttribute: function(){}, removeAttribute: function(){},
    getAttribute: function(a){ if(a==='srcdoc') return state._srcdoc||''; return null; },
    hasAttribute: function(){ return false; }, appendChild: function(c){ return c; }, removeChild: function(c){ return c; },
    addEventListener: function(){}, removeEventListener: function(){}, querySelector: function(){ return null; },
    querySelectorAll: function(s){ if (s === '*') { return __makeNodeList(state._qsaCount); } return __makeNodeList(0); },
    cloneNode: function(){ return __makeHtmlElement(tag); }
  });
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
function __parseCssDisplay(cssText){ if(!cssText) return ''; var m = String(cssText).match(/(?:^|;)\s*display\s*:\s*([^;]+)/i); return m ? String(m[1]).trim() : ''; }
function __getComputedStyle(el){ var cssText = el && el.style && el.style.cssText || ''; var display = __parseCssDisplay(cssText); return { getPropertyValue: function(name){ if(String(name).toLowerCase()==='display') return display; return ''; }, cssText: cssText, display: display }; }
var __ifMeta = __mkObj('meta', { getAttribute: function(a){ return a==='content' ? "default-src 'none'; script-src 'unsafe-inline';" : null; }, hasAttribute: function(a){ return a==='content'; }, tagName: 'META', nodeName: 'META' });
var __ifDoc = __mkObj('iframeDoc', { querySelector: function(s){ if (s && s.indexOf('Content-Security-Policy') !== -1) return __ifMeta; if (s === 'meta') return __ifMeta; return null; }, querySelectorAll: function(s){ if (s && s.indexOf('Content-Security-Policy') !== -1) return [__ifMeta]; if (s === 'meta') return [__ifMeta]; return []; }, getElementsByTagName: function(t){ return t && t.toLowerCase()==='meta' ? [__ifMeta] : []; }, body: __mkObj('iframeBody'), head: __mkObj('iframeHead'), documentElement: __mkObj('iframeRoot'), createElement: function(){ return __mkObj('elem', {setAttribute:function(){}, appendChild:function(){}, removeChild:function(){}, getAttribute:function(){return null;}, hasAttribute:function(){return false;}}); }, cookie: '', readyState: 'complete' });
var __iframeEl = __mkObj('iframe', { contentDocument: __ifDoc, contentWindow: __mkObj('iframeWin', { document: __ifDoc, top: undefined, parent: undefined }), document: __ifDoc, getAttribute: function(a){ if (a==='sandbox') return 'allow-scripts allow-same-origin'; if (a==='srcdoc') return ''; if (a==='id') return 'jsa'; return null; }, hasAttribute: function(a){ return a==='sandbox'||a==='id'; }, tagName: 'IFRAME', nodeName: 'IFRAME', id: 'jsa' });
// document.body keeps a LIVE children collection: challenges append a node and
// assert body.children.length grew by exactly 1, then remove it again.
var __bodyKids = [];
Object.defineProperty(__bodyKids, 'constructor', { value: HTMLCollection, enumerable: false, configurable: true });
var __body = __mkObj('body', {
  appendChild: function(c){ __bodyKids.push(c); return c; },
  removeChild: function(c){ var i = __bodyKids.indexOf(c); if (i !== -1) __bodyKids.splice(i, 1); return c; },
  contains: function(c){ return __bodyKids.indexOf(c) !== -1; },
  querySelector: function(s){ return s === '#jsa' ? __iframeEl : null; },
  querySelectorAll: function(s){ return s === '#jsa' ? [__iframeEl] : __makeNodeList(0); },
  children: __bodyKids, childNodes: __bodyKids,
  tagName: 'BODY', nodeName: 'BODY', nodeType: 1
});
var document = __mkObj('document', { querySelector: function(s){ if (s === '#jsa') return __iframeEl; if (s && s.indexOf('Content-Security-Policy') !== -1) return __ifMeta; return null; }, querySelectorAll: function(s){ if (s === '#jsa') return [__iframeEl]; if (s && s.indexOf('Content-Security-Policy') !== -1) return [__ifMeta]; return __makeNodeList(__bodyKids.length + 3); }, getElementById: function(id){ return id==='jsa' ? __iframeEl : null; }, getElementsByTagName: function(t){ if(t&&t.toLowerCase()==='iframe') return [__iframeEl]; return []; }, getElementsByClassName: function(){ return []; }, body: __body, head: __mkObj('head'), documentElement: __mkObj('root'), createElement: function(tag){ return __makeHtmlElement(tag||'div'); }, createTextNode: function(t){ return {nodeType:3, nodeValue:String(t||''), textContent:String(t||'')}; }, cookie: '', readyState: 'complete', title: '', addEventListener: function(){}, removeEventListener: function(){} });
  var window = __mkObj('window', { document: document, __DDG_BE_VERSION__: 1, __DDG_FE_CHAT_HASH__: 1, navigator: __mkObj('navigator', { userAgent: __ua, webdriver: false, language: 'en-US', languages: ['en-US','en'], platform: 'Linux x86_64', vendor: 'Google Inc.', appVersion: '5.0 (X11)', cookieEnabled: true, onLine: true, hardwareConcurrency: 8, deviceMemory: 8 }), innerWidth: 1280, innerHeight: 800, outerWidth: 1280, outerHeight: 800, devicePixelRatio: 1, screen: __mkObj('screen', { width:1920, height:1080, availWidth:1920, availHeight:1080, colorDepth:24, pixelDepth:24 }), location: __mkObj('location', { href:'https://duck.ai/', origin:'https://duck.ai', host:'duck.ai', hostname:'duck.ai', protocol:'https:', pathname:'/' }), performance: __mkObj('perf', { now: function(){ return 0; }, timeOrigin: 0 }), history: __mkObj('history', { length: 1, state: null }), addEventListener: function(){}, removeEventListener: function(){}, dispatchEvent: function(){return true;}, setTimeout: function(fn){ try{fn();}catch(e){} return 0; }, clearTimeout: function(){}, hasOwnProperty: function(k){ if (k==='__DDG_BE_VERSION__'||k==='__DDG_FE_CHAT_HASH__') return true; return Object.prototype.hasOwnProperty.call(this,k); } });
window.top = window; window.self = window; window.window = window; window.parent = window; window.globalThis = window;
// Object.prototype.toString.call(window) must be "[object Window]".
try { window[Symbol.toStringTag] = 'Window'; } catch (e) {}
// In a browser a sloppy-mode function called with no receiver gets the global
// object, and challenges assert (function(){return this;})() === window.
// In a vm context that is the context's own global, so alias it to window.
try {
  var __g = (function(){ return this; })();
  if (__g && __g !== window) {
    Object.defineProperty(__g, Symbol.toStringTag, { value: 'Window', configurable: true });
    // Copy by VALUE, not via accessors. Two reasons:
    //  1) the var top/self/navigator/... declarations further down are hoisted,
    //     so those names already exist on the vm global and an "in" guard would
    //     skip them, leaving window.navigator undefined;
    //  2) accessors closing over the window binding would recurse once it is
    //     rebound to __g below.
    // The stub window is static, so a value copy is equivalent.
    var __winStub = window;
    for (var __k in __winStub) {
      try { __g[__k] = __winStub[__k]; } catch (e) {}
    }
    // hasOwnProperty is probed for the __DDG_* markers; keep the stub's version.
    try { __g.hasOwnProperty = function(k){ return __winStub.hasOwnProperty(k); }; } catch (e) {}
    window = __g;
    window.top = window; window.self = window; window.window = window; window.parent = window; window.globalThis = window;
  }
} catch (e) {}
var top = window, self = window, parent = window, navigator = window.navigator, location = window.location, screen = window.screen, performance = window.performance, history = window.history;
var __R = null, __E = null;
// Real DOM constructor chain. Some DDG challenge variants assert
// HTMLDivElement.prototype instanceof HTMLElement and
// HTMLElement.prototype instanceof Element, so these cannot be flat
// unrelated stubs — the prototype links have to be real.
function __DomClass(name, parent){
  var c = function(){};
  if (parent) c.prototype = Object.create(parent.prototype);
  c.prototype.constructor = c;
  Object.defineProperty(c, 'name', { value: name, configurable: true });
  c.toString = function(){ return 'function ' + name + '() { [native code] }'; };
  return c;
}
var EventTarget = __DomClass('EventTarget', null);
var Node = __DomClass('Node', EventTarget);
var Element = __DomClass('Element', Node);
var HTMLElement = __DomClass('HTMLElement', Element);
var HTMLDivElement = __DomClass('HTMLDivElement', HTMLElement);
var HTMLIFrameElement = __DomClass('HTMLIFrameElement', HTMLElement);
var HTMLLIElement = __DomClass('HTMLLIElement', HTMLElement);
var HTMLUnknownElement = __DomClass('HTMLUnknownElement', HTMLElement);
var Document = __DomClass('Document', Node);
var HTMLDocument = __DomClass('HTMLDocument', Document);
var NodeList = __DomClass('NodeList', null);
var HTMLCollection = __DomClass('HTMLCollection', null);
// Map a tag name to the constructor a browser would use, so
// document.createElement('div') instanceof HTMLDivElement holds.
function __ctorForTag(tag){
  var t = String(tag||'div').toLowerCase();
  if (t === 'div') return HTMLDivElement;
  if (t === 'iframe') return HTMLIFrameElement;
  if (t === 'li') return HTMLLIElement;
  return HTMLElement;
}
// A NodeList-like: array-shaped but NOT a real Array, with .constructor.name
// === 'NodeList' — challenges check both !Array.isArray(x) and the ctor name.
function __makeNodeList(length){
  var nl = Object.create(NodeList.prototype);
  var n = length|0;
  for (var i = 0; i < n; i++) nl[i] = __makeHtmlElement('div');
  Object.defineProperty(nl, 'length', { value: n, enumerable: false, configurable: true });
  nl.item = function(i){ return this[i] || null; };
  nl.forEach = function(fn, thisArg){ for (var i = 0; i < n; i++) fn.call(thisArg, this[i], i, this); };
  nl[Symbol.iterator] = function(){ var i = 0, self = this; return { next: function(){ return i < n ? { value: self[i++], done: false } : { value: undefined, done: true }; } }; };
  return nl;
}
function __HTMLClass(name){ var c = function(){}; c.prototype = __mkObj(name+'.proto'); return c; }
// NOTE: HTMLElement / HTMLDivElement / HTMLIFrameElement / Element / Node /
// Document / HTMLDocument / NodeList are defined above via __DomClass with a
// REAL prototype chain — do not redeclare them here or the instanceof probes break.
var Window = __HTMLClass('Window'), Event = __HTMLClass('Event'), MouseEvent = __HTMLClass('MouseEvent'), KeyboardEvent = __HTMLClass('KeyboardEvent'), TouchEvent = __HTMLClass('TouchEvent'), XMLHttpRequest = __HTMLClass('XMLHttpRequest'), WebSocket = __HTMLClass('WebSocket'), Image = __HTMLClass('Image'), FormData = __HTMLClass('FormData'), Blob = __HTMLClass('Blob'), File = __HTMLClass('File'), FileReader = __HTMLClass('FileReader'), URL = __HTMLClass('URL'), URLSearchParams = __HTMLClass('URLSearchParams'), Headers = __HTMLClass('Headers'), Request = __HTMLClass('Request'), Response = __HTMLClass('Response');
var fetch = function(){ return Promise.resolve(__mkObj('resp', {ok:true, status:200, json:function(){return Promise.resolve({});}, text:function(){return Promise.resolve('');}})); };
var getComputedStyle = __getComputedStyle;
`;

export function countHtmlElements(node: unknown): number {
  if (!node || typeof node !== "object") return 0;
  const record = node as { nodeName?: string; childNodes?: unknown[] };
  const own = record.nodeName && record.nodeName !== "#document-fragment" ? 1 : 0;
  let childCount = 0;
  for (const child of record.childNodes ?? []) {
    childCount += countHtmlElements(child);
  }
  return own + childCount;
}

export function buildHtmlLookup(js: string): Record<string, { html: string; count: number }> {
  const lookup: Record<string, { html: string; count: number }> = {};
  const seen = new Set<string>();
  const pattern = /(['"])(<[^'"]{1,400}?)\1/g;
  for (const match of js.matchAll(pattern)) {
    const html = match[2];
    if (seen.has(html)) continue;
    seen.add(html);
    const fragment = parseFragment(html);
    // `count` backs `element.querySelectorAll('*').length` for an element whose
    // innerHTML is `html`. `querySelectorAll('*')` on a container returns its
    // DESCENDANTS, and `countHtmlElements` already excludes the `#document-fragment`
    // root, so the fragment's element count IS the descendant count. The former
    // `- 1` undercounted by one (verified against a real browser: for
    // `<li><div></li><li></div` Chromium reports 3, this returned 2), which
    // corrupted every probe that multiplies by that length.
    lookup[html] = {
      html: serialize(fragment),
      count: countHtmlElements(fragment),
    };
  }
  return lookup;
}

export function sha256Base64(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("base64");
}

// Shape of the object a DDG challenge program resolves to.
type DuckDuckGoChallengeResult = {
  client_hashes?: unknown;
  meta?: unknown;
  [key: string]: unknown;
};

/**
 * Origin the solved challenge claims to come from. The duck.ai frontend stamps
 * `meta.origin` with its own origin and the upstream cross-checks it.
 */
export const DUCKDUCKGO_CHALLENGE_ORIGIN = "https://duck.ai";

/**
 * `meta.stack` mimics the frontend's captured Error stack. The upstream only
 * requires a plausible stack that points at the duck.ai bundle — verified by
 * ablation: a generic bundle path is accepted, omitting the field is not.
 */
function buildChallengeStack(origin: string, bundlePath: string): string {
  const url = `${origin}${bundlePath}`;
  return `Error\nat l (${url}:2:1695625)\nat async ${url}:2:1519117`;
}

export async function solveDuckDuckGoChallenge(
  challenge: string,
  userAgent: string,
  options: { origin?: string; bundlePath?: string } = {}
): Promise<string> {
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
  const startedAt = Date.now();
  const result = (await vm.runInContext(js, context, {
    timeout: 5000,
  })) as DuckDuckGoChallengeResult;
  const elapsedMs = Date.now() - startedAt;
  const clientHashes = Array.isArray(result.client_hashes) ? result.client_hashes : [];
  if (clientHashes.length === 0)
    throw new Error("DuckDuckGo challenge returned empty client_hashes");
  clientHashes[0] = userAgent;
  result.client_hashes = clientHashes.map((hash) => sha256Base64(String(hash)));

  // The real frontend augments the challenge's own `meta` with origin / stack /
  // duration before sending it back. Omitting them yields 418 ERR_CHALLENGE even
  // when every client_hash is correct (confirmed by capturing a real browser's
  // x-vqd-hash-1 header, which always carries all three).
  const origin = options.origin ?? DUCKDUCKGO_CHALLENGE_ORIGIN;
  const bundlePath = options.bundlePath ?? "/dist/duckai-dist/entry.duckai.js";
  const meta = (result.meta ?? {}) as Record<string, unknown>;
  result.meta = {
    ...meta,
    origin,
    stack: buildChallengeStack(origin, bundlePath),
    duration: String(elapsedMs),
  };

  return Buffer.from(JSON.stringify(result), "utf8").toString("base64");
}

export function makeDuckDuckGoFeSignals(): string {
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
