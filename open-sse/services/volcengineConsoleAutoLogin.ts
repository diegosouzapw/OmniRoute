/**
 * VolcengineConsoleAutoLogin — session-based phone/SMS-code login for the
 * Volcano Engine console.
 *
 * Unlike InAppLoginService (which opens a headful browser and requires the
 * operator to complete login inside a browser on the server machine), this
 * service drives a headless Chromium through the console's 手机号登录 (phone +
 * SMS verification code) flow:
 *
 *   1. startLogin(phone) — navigate to the login page, switch to the phone
 *      tab, fill the phone number, click 获取验证码. If the console demands an
 *      image captcha, a screenshot is captured for the dashboard to render.
 *   2. submitCode(code, captcha?) — fill the SMS code (and image captcha when
 *      requested), click 登录 / 注册, then poll the browser context for the
 *      console session cookies (digest / AccountID / csrfToken / userInfo).
 *   3. cancel() / resendCode() — lifecycle helpers.
 *
 * The service only extracts credentials; persisting/binding them to provider
 * connections stays in the dashboard API layer (volcenginePlanBinding.ts).
 *
 * Selector strategy: the console login page is built with Arco Design and
 * exposes stable element ids (#Tel_input, #Code_input, #VerificatonCodeInput).
 * Every interaction goes through multi-candidate selector lists so a single
 * frontend rename does not break the flow. When a candidate list misses or
 * risk-control (slider) is detected, the session degrades to
 * `fallback_manual` and the caller can fall back to the pre-existing
 * headful-browser flow.
 */

import { randomUUID } from "crypto";
import { matchesCookieDomain } from "../utils/cookieDomain";

// ─── Public types ───────────────────────────────────────────────────────────

export type VolcLoginPhase =
  | "starting"
  | "sending_code"
  | "waiting_code"
  | "captcha_required"
  | "submitting"
  | "mfa_waiting"
  | "identity_required"
  | "success"
  | "error"
  | "timeout"
  | "cancelled"
  | "fallback_manual";

export interface VolcLoginSessionView {
  sessionId: string;
  phase: VolcLoginPhase;
  phoneMasked: string;
  error: string | null;
  /** data:image/png;base64 screenshot of the image captcha, when required */
  captchaImage: string | null;
  /** epoch ms — earliest time a resend should be offered */
  resendAvailableAt: number;
  createdAt: number;
  updatedAt: number;
  /** True while the console demands an MFA step-up code (second SMS code) */
  mfaRequired?: boolean;
  /** Identity options scraped from /auth/login/select_identity, when required */
  identityOptions?: Array<{ index: number; label: string }>;
  /** Credentials (console cookies) — only present after success */
  credentials?: Record<string, string>;
  /** Set by the API layer after binding plans (not part of this service) */
  binding?: unknown;
}

export interface StartOptions {
  /** Total session timeout in ms (default 300_000) */
  timeout?: number;
}

export interface SubmitCodeOptions {
  /** Extra wait for cookie polling after submit (default 90_000) */
  timeout?: number;
}

/** Injectable delays — tests shrink these to keep the suite fast. */
export interface ServiceDelays {
  pageSettleMs?: number;
  tabSwitchMs?: number;
  sendCodeSettleMs?: number;
  pollIntervalMs?: number;
  resendCooldownMs?: number;
}

// ─── Config ─────────────────────────────────────────────────────────────────

const LOGIN_URL = "https://console.volcengine.com/auth/login";
/** Landing page the manual headful flow uses — the console app issues the
 * remaining session cookies (AccountID/userInfo) once it runs. */
const ARK_CONSOLE_URL =
  "https://console.volcengine.com/ark/region:cn-beijing/subscription/coding-plan";

/** Cookie names required for a valid console session (mirrors tokenExtractionConfig) */
const REQUIRED_COOKIES = ["digest", "AccountID", "csrfToken", "userInfo"] as const;

const DEFAULT_SESSION_TIMEOUT = 300_000;
const SUBMIT_COOKIE_TIMEOUT = 90_000;
const CAPTURE_POLL_INTERVAL = 1_000;
const RESEND_COOLDOWN_MS = 60_000;
const MAX_ACTIVE_SESSIONS = 2;

/** Multi-candidate selectors — first visible candidate wins. */
const SELECTORS = {
  phoneTab: ['.arco-tabs-header-title:has-text("手机号登录")', "text=手机号登录"],
  phoneInput: ["#Tel_input", 'input[name="Tel"]', 'input[placeholder*="手机号"]'],
  smsCodeInput: ["#Code_input", 'input[placeholder*="请输入验证码"]'],
  sendCodeButton: ['button:has-text("获取验证码")', "text=获取验证码"],
  loginButton: ['button:has-text("登录 / 注册")', 'button:has-text("登录")'],
  imageCaptchaInput: ["#VerificatonCodeInput", "input.verify-input"],
  captchaShot: [".arco-modal", '[class*="captcha"]', '[class*="verify"]'],
  /** Risk-control slider / popup heuristics */
  riskControl: [
    '[class*="secsdk-captcha"]',
    "#captcha_popup",
    '[class*="captcha-slider"]',
    '[class*="drag"] [class*="slider"]',
  ],
  /** MFA step-up modal (需要额外认证): a SECOND 6-digit SMS code is required */
  mfaModal: ['.arco-modal:has-text("需要额外认证")', "text=需要额外认证"],
  mfaInput: ["#VerificatonCodeInput", ".arco-modal input.verify-input", ".arco-modal input"],
  mfaConfirmButton: ['button:has-text("好的")', '.arco-modal button:has-text("确定")'],
  mfaResendButton: ['button:has-text("重发校验码")'],
  /** TOTP binding modal (绑定MFA设备) — needs interactive Google Authenticator setup */
  mfaBindModal: ['.arco-modal:has-text("绑定MFA设备")'],
  /** Identity selection page (/auth/login/select_identity) — the phone maps to
   *  multiple accounts; the user must pick which identity to log in as.
   *  Structure verified against the real auth bundle (vconsole-auth 1.0.0.2837,
   *  module 12173 + chunk 202): ul[class*=accountUl] > li[class*=accountLi] >
   *  div[class*=item] (click target) with the identity text in [class*=identity];
   *  submit is button[type=submit] ("登录") inside [class*=selectPlatformIdentity].
   *  .arco-list-item is kept as a fallback for future Arco-based redesigns. */
  identityList: ['ul[class*="accountUl"] li[class*="accountLi"]', ".arco-list-item"],
  identityItem: ['li[class*="accountLi"] > [class*="item"]', ".arco-list-item"],
  identitySubmitButton: [
    '[class*="selectPlatformIdentity"] button[type="submit"]',
    'button[type="submit"]:has-text("登录")',
    'button:has-text("登录")',
  ],
} as const;

/** URL marker for the console's identity-selection page */
const IDENTITY_URL_PATTERN = /\/auth\/login\/select_identity/i;

const BROWSER_CONTEXT_OPTIONS = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  viewport: { width: 1280, height: 800 },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

// ─── Minimal playwright structural types ──────────────────────────────────
// Playwright is an optional runtime dep (dynamically imported), so we model
// only the API surface this service drives instead of importing its types.

interface PwLocator {
  first(): PwLocator;
  isVisible(options?: { timeout?: number }): Promise<boolean>;
  click(options?: unknown): Promise<void>;
  fill(value: string): Promise<void>;
  isDisabled(): Promise<boolean>;
  screenshot(options?: { type?: string }): Promise<Buffer>;
  textContent(options?: { timeout?: number }): Promise<string | null>;
  count(): Promise<number>;
  nth(index: number): PwLocator;
}

interface PwPage {
  setDefaultTimeout(timeout: number): void;
  goto(url: string, options?: { waitUntil?: string; timeout?: number }): Promise<unknown>;
  locator(selector: string): PwLocator;
  screenshot(options?: { type?: string }): Promise<Buffer>;
  url(): string;
  content(): Promise<string>;
}

interface PwContext {
  newPage(): Promise<PwPage>;
  cookies(): Promise<Array<{ name: string; domain: string; value: string }>>;
}

interface PwBrowser {
  newContext(options?: Record<string, unknown>): Promise<PwContext>;
  close(): Promise<void>;
}

interface PwModule {
  chromium: {
    launch(options?: { headless?: boolean; args?: string[]; channel?: string }): Promise<PwBrowser>;
  };
}

// ─── Session record (internal) ──────────────────────────────────────────────

interface ActiveSession {
  sessionId: string;
  phone: string;
  phase: VolcLoginPhase;
  error: string | null;
  captchaImage: string | null;
  resendAvailableAt: number;
  createdAt: number;
  updatedAt: number;
  timeoutMs: number;
  credentials: Record<string, string> | null;
  /** Binding outcome set by the API layer via withBinding() */
  binding?: unknown;
  cancelled: boolean;
  /** Identity options scraped from the select_identity page */
  identityOptions: Array<{ index: number; label: string }> | null;
  // Playwright handles — never serialized
  browser: PwBrowser | null;
  context: PwContext | null;
  page: PwPage | null;
}

export function maskPhone(phone: string): string {
  if (phone.length < 7) return "***";
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
}

/** Normalize a CN mobile number: strip +86/86 prefix, spaces, dashes. */
export function normalizePhone(raw: string): string | null {
  const trimmed = String(raw || "")
    .trim()
    .replace(/[\s-]/g, "");
  const bare = trimmed.replace(/^\+?86/, "");
  return /^1\d{10}$/.test(bare) ? bare : null;
}

/**
 * Whether a cookie's `domain` belongs to the Volcengine console.
 *
 * Cookie domains must be matched by exact host or dot-boundary suffix, never by
 * substring: `domain.includes("volcengine.com")` also accepted
 * `volcengine.com.attacker.tld` and `notvolcengine.com`, so a cookie named
 * `digest`/`AccountID`/`csrfToken`/`userInfo` set by a look-alike host was
 * harvested as an operator credential and persisted as a provider connection
 * (CodeQL js/incomplete-url-substring-sanitization #860/#861). Mirrors
 * `isAdobeCookieDomain` in adobeFireflyBrowserLogin.ts.
 */
export function isVolcengineCookieDomain(domain: string | undefined): boolean {
  return matchesCookieDomain(domain, "volcengine.com");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Service ────────────────────────────────────────────────────────────────

export class VolcengineConsoleAutoLoginService {
  private sessions = new Map<string, ActiveSession>();
  /** sessionId → bind promise set by the API layer to dedupe lazy binding */
  private bindInFlight = new Map<string, Promise<unknown>>();
  /** Injectable for tests — resolves the playwright module instead of `import("playwright")`. */
  private readonly loadPlaywright: () => Promise<PwModule>;
  private readonly delays: Required<ServiceDelays>;

  constructor(
    loadPlaywright: () => Promise<PwModule> = async () => import("playwright"),
    delays: ServiceDelays = {}
  ) {
    this.loadPlaywright = loadPlaywright;
    this.delays = {
      pageSettleMs: delays.pageSettleMs ?? 2_500,
      tabSwitchMs: delays.tabSwitchMs ?? 1_000,
      sendCodeSettleMs: delays.sendCodeSettleMs ?? 2_000,
      pollIntervalMs: delays.pollIntervalMs ?? CAPTURE_POLL_INTERVAL,
      resendCooldownMs: delays.resendCooldownMs ?? RESEND_COOLDOWN_MS,
    };
  }

  // ─── Queries ─────────────────────────────────────────────────────────────

  getActiveSessionCount(): number {
    let count = 0;
    for (const session of this.sessions.values()) {
      if (!isTerminal(session.phase)) count++;
    }
    return count;
  }

  getStatus(sessionId: string): VolcLoginSessionView | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    return this.toView(session);
  }

  /**
   * Lazy binding hook used by the API layer: the route stores a promise here
   * so concurrent status polls do not double-bind the same credentials.
   */
  async withBinding<T>(
    sessionId: string,
    bind: (credentials: Record<string, string>) => Promise<T>
  ): Promise<VolcLoginSessionView | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    if (session.phase !== "success" || !session.credentials) {
      return this.toView(session);
    }
    if (session.binding !== undefined) return this.toView(session);

    let inFlight = this.bindInFlight.get(sessionId);
    if (!inFlight) {
      inFlight = bind(session.credentials)
        .then((binding: unknown) => {
          session.binding = binding;
          return binding;
        })
        .catch((error: unknown) => {
          // Persist the failure so status polls do not retry forever.
          session.binding = { error: errorMessage(error) };
          return session.binding;
        })
        .finally(() => {
          this.bindInFlight.delete(sessionId);
        });
      this.bindInFlight.set(sessionId, inFlight);
    }
    await inFlight;
    return this.toView(session);
  }

  // ─── Lifecycle ───────────────────────────────────────────────────────────

  async startLogin(
    phone: string,
    options?: StartOptions
  ): Promise<{ ok: true; session: VolcLoginSessionView } | { ok: false; error: string }> {
    const normalized = normalizePhone(phone);
    if (!normalized) {
      return { ok: false, error: "Invalid phone number (expected an 11-digit CN mobile number)" };
    }

    this.expireSessions();

    for (const session of this.sessions.values()) {
      if (session.phone === normalized && !isTerminal(session.phase)) {
        await this.cancel(session.sessionId);
      }
    }
    if (this.getActiveSessionCount() >= MAX_ACTIVE_SESSIONS) {
      return { ok: false, error: "Too many concurrent Volcano login sessions" };
    }

    let playwright: PwModule;
    try {
      playwright = await this.loadPlaywright();
    } catch {
      return {
        ok: false,
        error: "Playwright is not installed. Use manual browser login instead.",
      };
    }

    const session: ActiveSession = {
      sessionId: randomUUID(),
      phone: normalized,
      phase: "starting",
      error: null,
      captchaImage: null,
      resendAvailableAt: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      timeoutMs: options?.timeout || DEFAULT_SESSION_TIMEOUT,
      credentials: null,
      cancelled: false,
      identityOptions: null,
      browser: null,
      context: null,
      page: null,
    };
    this.sessions.set(session.sessionId, session);

    try {
      // Prefer the playwright-managed Chromium; fall back to the system Chrome
      // channel on machines without `npx playwright install` browsers (dev laptops).
      try {
        session.browser = await playwright.chromium.launch({
          headless: true,
          args: ["--disable-blink-features=AutomationControlled"],
        });
      } catch (launchError) {
        if (!/Executable doesn't exist/.test(String(launchError))) throw launchError;
        session.browser = await playwright.chromium.launch({
          headless: true,
          channel: "chrome",
          args: ["--disable-blink-features=AutomationControlled"],
        });
      }
      session.context = await session.browser.newContext(BROWSER_CONTEXT_OPTIONS);
      session.page = await session.context.newPage();
      session.page.setDefaultTimeout(15_000);

      await session.page.goto(LOGIN_URL, { waitUntil: "domcontentloaded", timeout: 30_000 });
      await sleep(this.delays.pageSettleMs);

      // Switch to the phone-code login tab
      const tab = await this.firstVisible(session.page, SELECTORS.phoneTab);
      if (!tab) throw new SelectorMissError("phone tab");
      await tab.click();
      await sleep(this.delays.tabSwitchMs);

      // Fill the phone number
      const phoneInput = await this.firstVisible(session.page, SELECTORS.phoneInput);
      if (!phoneInput) throw new SelectorMissError("phone input");
      await phoneInput.fill(normalized);

      // Send the SMS code
      const sendBtn = await this.firstVisible(session.page, SELECTORS.sendCodeButton);
      if (!sendBtn) throw new SelectorMissError("send-code button");
      await sendBtn.click();

      session.phase = "sending_code";
      session.resendAvailableAt = Date.now() + this.delays.resendCooldownMs;
      await sleep(this.delays.sendCodeSettleMs);

      // Risk-control slider → degrade to the manual headful flow
      const risk = await this.firstVisible(session.page, SELECTORS.riskControl);
      if (risk) {
        session.captchaImage = await this.shot(session.page);
        session.phase = "fallback_manual";
        session.error =
          "Volcano risk control (slider captcha) was triggered in headless mode. Use manual browser login.";
        await this.closeBrowser(session);
        return { ok: true, session: this.toView(session) };
      }

      // Image captcha may be required before the SMS is sent
      const captchaInput = await this.firstVisible(session.page, SELECTORS.imageCaptchaInput);
      if (captchaInput) {
        session.captchaImage = await this.shot(session.page);
        session.phase = "captcha_required";
      } else {
        session.phase = "waiting_code";
      }
      return { ok: true, session: this.toView(session) };
    } catch (error) {
      await this.closeBrowser(session);
      session.phase = error instanceof SelectorMissError ? "fallback_manual" : "error";
      session.error = errorMessage(error);
      if (session.phase === "fallback_manual") {
        session.error = `${session.error}. The login page layout may have changed — use manual browser login.`;
      }
      return { ok: true, session: this.toView(session) };
    }
  }

  async submitCode(
    sessionId: string,
    code: string,
    captcha?: string,
    options?: SubmitCodeOptions
  ): Promise<VolcLoginSessionView | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    const fromMfa = session.phase === "mfa_waiting";
    if (session.phase !== "waiting_code" && session.phase !== "captcha_required" && !fromMfa) {
      return this.toView(session);
    }

    const smsCode = String(code || "").trim();
    if (!/^\d{4,6}$/.test(smsCode)) {
      session.error = "Invalid SMS code";
      return this.toView(session);
    }
    if (session.phase === "captcha_required" && !String(captcha || "").trim()) {
      session.error = "Image captcha is required";
      return this.toView(session);
    }

    const page = session.page;
    if (!page) {
      session.phase = "error";
      session.error = "Browser session is gone — restart the login";
      return this.toView(session);
    }

    try {
      if (fromMfa) {
        // MFA step-up (需要额外认证): fill the SECOND code into the modal
        // input and confirm with 好的.
        const mfaInput = await this.firstVisible(page, SELECTORS.mfaInput);
        if (!mfaInput) throw new SelectorMissError("mfa code input");
        await mfaInput.fill(smsCode);

        const confirmBtn = await this.firstVisible(page, SELECTORS.mfaConfirmButton);
        if (!confirmBtn) throw new SelectorMissError("mfa confirm button");
        await confirmBtn.click();
      } else {
        const codeInput = await this.firstVisible(page, SELECTORS.smsCodeInput);
        if (!codeInput) throw new SelectorMissError("sms code input");
        await codeInput.fill(smsCode);

        if (captcha) {
          const captchaInput = await this.firstVisible(page, SELECTORS.imageCaptchaInput);
          if (captchaInput) await captchaInput.fill(String(captcha).trim());
        }

        const loginBtn = await this.firstVisible(page, SELECTORS.loginButton);
        if (!loginBtn) throw new SelectorMissError("login button");
        await loginBtn.click();
      }

      session.phase = "submitting";
      session.error = null;
      session.captchaImage = null;

      return await this.pollUntilResolved(session, {
        timeoutMs: options?.timeout || SUBMIT_COOKIE_TIMEOUT,
        fromMfa,
        detectIdentity: true,
      });
    } catch (error) {
      session.phase = error instanceof SelectorMissError ? "fallback_manual" : "error";
      session.error = errorMessage(error);
      await this.closeBrowser(session);
      return this.toView(session);
    }
  }

  /**
   * Pick an identity on the console's /auth/login/select_identity page and
   * finish the login. `index` maps to the identityOptions list previously
   * returned in the session view.
   */
  async selectIdentity(
    sessionId: string,
    index: number,
    options?: SubmitCodeOptions
  ): Promise<VolcLoginSessionView | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    if (session.phase !== "identity_required") {
      return this.toView(session);
    }
    const page = session.page;
    if (!page) {
      session.phase = "error";
      session.error = "Browser session is gone — restart the login";
      return this.toView(session);
    }

    try {
      // Click the requested identity card (the page pre-selects the first one,
      // so only non-zero indexes need an explicit click).
      if (index > 0) {
        const itemSelector = await this.identityItemSelector(page);
        if (!itemSelector) throw new SelectorMissError("identity item");
        const items = page.locator(itemSelector);
        const count = await items.count();
        if (index < 0 || index >= count) {
          session.error = `Identity index ${index} is out of range (${count} options)`;
          return this.toView(session);
        }
        await items.nth(index).click();
        await sleep(this.delays.tabSwitchMs);
      }

      // Submit the selection (button[type=submit] “登录” on the identity card)
      const submitBtn = await this.firstVisible(page, SELECTORS.identitySubmitButton);
      if (!submitBtn) throw new SelectorMissError("identity submit button");
      await submitBtn.click();

      session.phase = "submitting";
      session.error = null;
      session.identityOptions = null;

      return await this.pollUntilResolved(session, {
        timeoutMs: options?.timeout || SUBMIT_COOKIE_TIMEOUT,
        fromMfa: false,
        detectIdentity: false,
      });
    } catch (error) {
      session.phase = error instanceof SelectorMissError ? "fallback_manual" : "error";
      session.error = errorMessage(error);
      await this.closeBrowser(session);
      return this.toView(session);
    }
  }

  /** First clickable identity-item selector that matches at least one element. */
  private async identityItemSelector(page: PwPage): Promise<string | null> {
    for (const selector of SELECTORS.identityItem) {
      try {
        const count = await page.locator(selector).count();
        if (count > 0) return selector;
      } catch {
        // try next candidate
      }
    }
    return null;
  }

  /**
   * Shared post-submit loop: waits for console cookies, watching for MFA
   * step-up, identity selection, TOTP binding, and console error toasts.
   */
  private async pollUntilResolved(
    session: ActiveSession,
    opts: { timeoutMs: number; fromMfa: boolean; detectIdentity: boolean }
  ): Promise<VolcLoginSessionView> {
    const page = session.page;
    if (!page) {
      session.phase = "error";
      session.error = "Browser session is gone — restart the login";
      return this.toView(session);
    }

    const deadline = Date.now() + opts.timeoutMs;
    let pollCount = 0;
    let navigatedAfterLogin = false;
    while (Date.now() < deadline) {
      if (session.cancelled) {
        session.phase = "cancelled";
        await this.closeBrowser(session);
        return this.toView(session);
      }
      if (Date.now() - session.createdAt > session.timeoutMs) {
        session.phase = "timeout";
        session.error = "Login timed out";
        await this.closeBrowser(session);
        return this.toView(session);
      }

      const cookies = await session.context.cookies();
      const credentials: Record<string, string> = {};
      for (const cookie of cookies as Array<{ name: string; domain: string; value: string }>) {
        if (
          REQUIRED_COOKIES.includes(cookie.name as (typeof REQUIRED_COOKIES)[number]) &&
          isVolcengineCookieDomain(cookie.domain)
        ) {
          credentials[cookie.name] = cookie.value;
        }
      }
      if (REQUIRED_COOKIES.every((name) => credentials[name])) {
        session.credentials = credentials;
        session.phase = "success";
        await this.closeBrowser(session);
        return this.toView(session);
      }

      // TOTP binding modal (绑定MFA设备) — needs interactive Google
      // Authenticator setup that cannot be driven headlessly.
      const bindModal = await this.firstVisible(page, SELECTORS.mfaBindModal);
      if (bindModal) {
        session.phase = "fallback_manual";
        session.error =
          "The console requires binding an MFA device (Google Authenticator). Use manual browser login to complete the one-time setup.";
        await this.closeBrowser(session);
        return this.toView(session);
      }

      // MFA step-up modal (需要额外认证) — a second SMS code is required;
      // hand control back to the user instead of timing out.
      if (!opts.fromMfa) {
        const mfaModal = await this.firstVisible(page, SELECTORS.mfaModal);
        if (mfaModal) {
          session.phase = "mfa_waiting";
          session.error = null;
          session.resendAvailableAt = Date.now() + this.delays.resendCooldownMs;
          return this.toView(session);
        }
      } else if (pollCount >= 5) {
        // Wrong MFA code → the modal stays up; after a grace window hand
        // control back so the user can enter the latest code.
        const mfaModal = await this.firstVisible(page, SELECTORS.mfaModal);
        if (mfaModal) {
          session.phase = "mfa_waiting";
          session.error = "The MFA code was not accepted — enter the latest code";
          session.resendAvailableAt = Date.now() + this.delays.resendCooldownMs;
          return this.toView(session);
        }
      }

      // Identity selection page (/auth/login/select_identity) — the phone
      // maps to multiple accounts; scrape the options and let the user pick.
      if (opts.detectIdentity && IDENTITY_URL_PATTERN.test(page.url())) {
        const options = await this.scrapeIdentityOptions(page);
        if (options.length > 0) {
          session.phase = "identity_required";
          session.error = null;
          session.identityOptions = options;
          return this.toView(session);
        }
      }

      // Login redirected away from /auth/login but cookies are incomplete →
      // the console app may need to run once to issue AccountID/userInfo.
      // Give it the same landing page the manual flow uses.
      if (!navigatedAfterLogin && pollCount >= 2 && !page.url().includes("/auth/login")) {
        navigatedAfterLogin = true;
        try {
          await page.goto(ARK_CONSOLE_URL, {
            waitUntil: "domcontentloaded",
            timeout: 30_000,
          });
        } catch {
          // navigation is best-effort; keep polling cookies
        }
      }

      // Console error toast (e.g. wrong SMS code) → surface it early
      const toast = await page
        .locator('.arco-message-error, [class*="message-error"]')
        .first()
        .textContent({ timeout: 250 })
        .catch(() => null);
      if (toast && /验证码|密码|错误|失败|频繁/.test(toast)) {
        session.phase = "error";
        session.error = toast.trim().slice(0, 120);
        await this.closeBrowser(session);
        return this.toView(session);
      }

      await sleep(this.delays.pollIntervalMs);
      pollCount++;
    }

    session.phase = "timeout";
    session.error = await this.timeoutDiagnostics(session);
    await this.closeBrowser(session);
    return this.toView(session);
  }

  /** First identity-list selector that matches at least one element. */
  private async identityListSelector(page: PwPage): Promise<string | null> {
    for (const selector of SELECTORS.identityList) {
      try {
        const count = await page.locator(selector).count();
        if (count > 0) return selector;
      } catch {
        // try next candidate
      }
    }
    return null;
  }

  /** Scrape identity options from the select_identity page, in document order. */
  private async scrapeIdentityOptions(
    page: PwPage
  ): Promise<Array<{ index: number; label: string }>> {
    const selector = await this.identityListSelector(page);
    if (!selector) return [];
    const items = page.locator(selector);
    const count = await items.count();
    const options: Array<{ index: number; label: string }> = [];
    for (let i = 0; i < count; i++) {
      const text =
        (await items
          .nth(i)
          .textContent()
          .catch(() => "")) || "";
      const label = text.replace(/\s+/g, " ").trim();
      if (label) options.push({ index: i, label: label.slice(0, 100) });
    }
    return options;
  }

  /**
   * Build a diagnostic message for the cookie-poll timeout: page URL, cookies
   * collected so far, and any blocking modal. Keeps future debugging cheap.
   * When stuck on the identity-selection page, also dumps the page HTML to
   * /tmp so a selector miss can be fixed from ground truth in one shot.
   */
  private async timeoutDiagnostics(session: ActiveSession): Promise<string> {
    const parts = ["Timed out waiting for the console session cookies"];
    try {
      if (session.page) {
        parts.push(`url=${session.page.url()}`);
        const cookies = (await session.context.cookies()) as Array<{
          name: string;
          domain: string;
        }>;
        const present = REQUIRED_COOKIES.filter((name) =>
          cookies.some((c) => c.name === name && isVolcengineCookieDomain(c.domain))
        );
        parts.push(
          `cookies=[${present.join(",") || "none of digest/AccountID/csrfToken/userInfo"}]`
        );
        const bindModal = await this.firstVisible(session.page, SELECTORS.mfaBindModal);
        if (bindModal) parts.push("blocked by 绑定MFA设备 modal");
        const mfaModal = await this.firstVisible(session.page, SELECTORS.mfaModal);
        if (mfaModal) parts.push("blocked by 需要额外认证 modal");
        const risk = await this.firstVisible(session.page, SELECTORS.riskControl);
        if (risk) parts.push("blocked by risk-control slider");
        if (IDENTITY_URL_PATTERN.test(session.page.url())) {
          const dump = await this.dumpPageHtml(session);
          if (dump) parts.push(`identityPageHtml=${dump}`);
        }
      }
    } catch {
      // diagnostics are best-effort
    }
    return parts.join(" · ");
  }

  /** Best-effort page HTML dump for debugging selector misses. */
  private async dumpPageHtml(session: ActiveSession): Promise<string | null> {
    try {
      const { writeFile } = await import("fs/promises");
      const path = `/tmp/omniroute-volc-select-identity-${session.sessionId.slice(0, 8)}.html`;
      await writeFile(path, await session.page.content(), "utf8");
      return path;
    } catch {
      return null;
    }
  }

  async resendCode(sessionId: string): Promise<VolcLoginSessionView | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    const fromMfa = session.phase === "mfa_waiting";
    if (session.phase !== "waiting_code" && session.phase !== "captcha_required" && !fromMfa) {
      return this.toView(session);
    }
    if (Date.now() < session.resendAvailableAt) {
      return this.toView(session);
    }
    const page = session.page;
    if (!page) {
      session.phase = "error";
      session.error = "Browser session is gone — restart the login";
      return this.toView(session);
    }

    try {
      // In the MFA step-up modal the button is 重发校验码; on the login form
      // it counts down ("60s后重发" etc.) — try the fresh label first, then
      // any 重发/重新获取 variant.
      const resendSelectors = fromMfa
        ? [...SELECTORS.mfaResendButton]
        : [
            'button:has-text("获取验证码")',
            'button:has-text("重发")',
            'button:has-text("重新获取")',
            'button:has-text("重新发送")',
          ];
      const btn = await this.firstVisible(page, resendSelectors);
      if (!btn) throw new SelectorMissError("resend button");
      const disabled = await btn.isDisabled().catch(() => false);
      if (disabled) {
        session.error = "Resend is still cooling down on the login page";
        return this.toView(session);
      }
      await btn.click();
      session.resendAvailableAt = Date.now() + this.delays.resendCooldownMs;
      await sleep(this.delays.sendCodeSettleMs);

      if (fromMfa) {
        // Stay in mfa_waiting — the modal persists until a valid code lands.
        session.phase = "mfa_waiting";
        session.error = null;
        return this.toView(session);
      }

      const captchaInput = await this.firstVisible(page, SELECTORS.imageCaptchaInput);
      if (captchaInput) {
        session.captchaImage = await this.shot(page);
        session.phase = "captcha_required";
      } else {
        session.captchaImage = null;
        session.phase = "waiting_code";
      }
      session.error = null;
      return this.toView(session);
    } catch (error) {
      session.phase = "error";
      session.error = errorMessage(error);
      await this.closeBrowser(session);
      return this.toView(session);
    }
  }

  async cancel(sessionId: string): Promise<VolcLoginSessionView | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    if (isTerminal(session.phase)) return this.toView(session);
    session.cancelled = true;
    session.phase = "cancelled";
    await this.closeBrowser(session);
    return this.toView(session);
  }

  // ─── Internals ───────────────────────────────────────────────────────────

  private toView(session: ActiveSession): VolcLoginSessionView {
    const view: VolcLoginSessionView = {
      sessionId: session.sessionId,
      phase: session.phase,
      phoneMasked: maskPhone(session.phone),
      error: session.error,
      captchaImage: session.phase === "captcha_required" ? session.captchaImage : null,
      resendAvailableAt: session.resendAvailableAt,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
    if (session.phase === "mfa_waiting") view.mfaRequired = true;
    if (session.phase === "identity_required" && session.identityOptions) {
      view.identityOptions = session.identityOptions;
    }
    if (session.phase === "success" && session.credentials) view.credentials = session.credentials;
    if (session.binding !== undefined) view.binding = session.binding;
    return view;
  }

  private async closeBrowser(session: ActiveSession): Promise<void> {
    try {
      await session.browser?.close?.();
    } catch {
      // browser may already be gone
    } finally {
      session.browser = null;
      session.context = null;
      session.page = null;
    }
  }

  /** Screenshot for captcha rendering; null when capture fails. */
  private async shot(page: PwPage): Promise<string | null> {
    try {
      const target = await this.firstVisible(page, SELECTORS.captchaShot);
      const buffer: Buffer | null = target
        ? await target.screenshot({ type: "png" })
        : await page.screenshot({ type: "png" });
      return buffer ? `data:image/png;base64,${buffer.toString("base64")}` : null;
    } catch {
      return null;
    }
  }

  private async firstVisible(
    page: PwPage,
    selectors: readonly string[]
  ): Promise<PwLocator | null> {
    for (const selector of selectors) {
      try {
        const locator = page.locator(selector).first();
        if (await locator.isVisible({ timeout: 2_000 })) return locator;
      } catch {
        // try next candidate
      }
    }
    return null;
  }

  /** Close and drop sessions past their TTL; keep terminal ones briefly for status reads. */
  private expireSessions(): void {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      const age = now - session.createdAt;
      const terminal = isTerminal(session.phase);
      if (terminal && age > 10 * 60_000) {
        this.sessions.delete(id);
      } else if (!terminal && age > session.timeoutMs + 60_000) {
        session.phase = "timeout";
        session.error = "Session expired";
        void this.closeBrowser(session);
        this.sessions.delete(id);
      }
    }
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

class SelectorMissError extends Error {
  constructor(element: string) {
    super(`Login page element not found: ${element}`);
  }
}

function isTerminal(phase: VolcLoginPhase): boolean {
  return (
    phase === "success" ||
    phase === "error" ||
    phase === "timeout" ||
    phase === "cancelled" ||
    phase === "fallback_manual"
  );
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// ─── Singleton ──────────────────────────────────────────────────────────────

export const volcengineConsoleAutoLoginService = new VolcengineConsoleAutoLoginService();
