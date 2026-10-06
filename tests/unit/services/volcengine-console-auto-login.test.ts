import test from "node:test";
import assert from "node:assert/strict";

import {
  VolcengineConsoleAutoLoginService,
  maskPhone,
  normalizePhone,
} from "../../../open-sse/services/volcengineConsoleAutoLogin.ts";

// ─── Fake playwright ────────────────────────────────────────────────────────

interface FakeState {
  visible: Set<string>;
  disabled: Set<string>;
  fills: Record<string, string>;
  clicks: string[];
  /** Returns the cookie jar; tests swap this to simulate login progress */
  cookiesFn: () => Array<{ name: string; domain: string; value: string }>;
  toastText: string | null;
  browserClosed: boolean;
  /** Current page URL — tests move it off /auth/login to simulate redirect */
  url: string;
  gotoCalls: string[];
  /** selector → list of item texts (identity list etc.) */
  lists: Record<string, string[]>;
}

function makeFakePlaywright() {
  const state: FakeState = {
    visible: new Set<string>(),
    disabled: new Set<string>(),
    fills: {},
    clicks: [],
    cookiesFn: () => [],
    toastText: null,
    browserClosed: false,
    url: "https://console.volcengine.com/auth/login",
    gotoCalls: [],
    lists: {},
  };

  class FakeLocator {
    constructor(
      private page: FakePage,
      private selector: string,
      private idx = -1
    ) {}
    first() {
      return this;
    }
    nth(index: number) {
      return new FakeLocator(this.page, this.selector, index);
    }
    async count() {
      return (this.page.state.lists[this.selector] || []).length;
    }
    async isVisible() {
      return this.page.state.visible.has(this.selector);
    }
    async isDisabled() {
      return this.page.state.disabled.has(this.selector);
    }
    async click() {
      const suffix = this.idx >= 0 ? `[${this.idx}]` : "";
      this.page.state.clicks.push(`${this.selector}${suffix}`);
    }
    async fill(value: string) {
      this.page.state.fills[this.selector] = value;
    }
    async screenshot() {
      return Buffer.from("fake-png");
    }
    async textContent() {
      if (this.idx >= 0) return (this.page.state.lists[this.selector] || [])[this.idx] ?? null;
      return this.page.state.toastText;
    }
  }

  class FakePage {
    constructor(public state: FakeState) {}
    setDefaultTimeout() {}
    async goto(url: string) {
      this.state.gotoCalls.push(url);
      this.state.url = url;
    }
    url() {
      return this.state.url;
    }
    locator(selector: string) {
      return new FakeLocator(this, selector);
    }
    async screenshot() {
      return Buffer.from("fake-page-png");
    }
  }

  const page = new FakePage(state);

  const context = {
    newPage: async () => page,
    cookies: async () => state.cookiesFn(),
  };

  const browser = {
    newContext: async () => context,
    close: async () => {
      state.browserClosed = true;
    },
  };

  return {
    chromium: { launch: async () => browser },
    __state: state,
  };
}

function fastService(fake: ReturnType<typeof makeFakePlaywright>) {
  return new VolcengineConsoleAutoLoginService(async () => fake, {
    pageSettleMs: 1,
    tabSwitchMs: 1,
    sendCodeSettleMs: 1,
    pollIntervalMs: 1,
    resendCooldownMs: 20,
  });
}

const PHONE_TAB = '.arco-tabs-header-title:has-text("手机号登录")';
const PHONE_INPUT = "#Tel_input";
const SEND_CODE_BTN = 'button:has-text("获取验证码")';
const SMS_CODE_INPUT = "#Code_input";
const LOGIN_BTN = 'button:has-text("登录 / 注册")';
const CAPTCHA_INPUT = "#VerificatonCodeInput";
const CAPTCHA_MODAL = ".arco-modal";
const MFA_MODAL = '.arco-modal:has-text("需要额外认证")';
const MFA_INPUT = "#VerificatonCodeInput";
const MFA_CONFIRM_BTN = 'button:has-text("好的")';
const MFA_RESEND_BTN = 'button:has-text("重发校验码")';
const MFA_BIND_MODAL = '.arco-modal:has-text("绑定MFA设备")';
const IDENTITY_LIST = 'ul[class*="accountUl"] li[class*="accountLi"]';
const IDENTITY_ITEM = 'li[class*="accountLi"] > [class*="item"]';
const IDENTITY_SUBMIT = '[class*="selectPlatformIdentity"] button[type="submit"]';

const FULL_COOKIES = [
  { name: "digest", domain: ".volcengine.com", value: "d1" },
  { name: "AccountID", domain: ".volcengine.com", value: "a1" },
  { name: "csrfToken", domain: ".volcengine.com", value: "c1" },
  { name: "userInfo", domain: ".volcengine.com", value: "u1" },
];

function happyPathVisible(fake: ReturnType<typeof makeFakePlaywright>) {
  fake.__state.visible.add(PHONE_TAB);
  fake.__state.visible.add(PHONE_INPUT);
  fake.__state.visible.add(SEND_CODE_BTN);
  fake.__state.visible.add(SMS_CODE_INPUT);
  fake.__state.visible.add(LOGIN_BTN);
}

// ─── Pure helpers ───────────────────────────────────────────────────────────

test("normalizePhone strips +86/86 prefixes, spaces and dashes", () => {
  assert.equal(normalizePhone("+8613800000000"), "13800000000");
  assert.equal(normalizePhone("8613800000000"), "13800000000");
  assert.equal(normalizePhone("138-0000 0000"), "13800000000");
  assert.equal(normalizePhone(" 13800000000 "), "13800000000");
  assert.equal(normalizePhone("12345"), null);
  assert.equal(normalizePhone("23800000000"), null);
  assert.equal(normalizePhone(""), null);
});

test("maskPhone keeps only head/tail digits", () => {
  assert.equal(maskPhone("13800000000"), "138****0000");
  assert.equal(maskPhone("1234567"), "123****4567");
  assert.equal(maskPhone("123"), "***");
});

// ─── startLogin ─────────────────────────────────────────────────────────────

test("startLogin rejects an invalid phone number", async () => {
  const fake = makeFakePlaywright();
  const service = fastService(fake);
  const result = await service.startLogin("not-a-phone");
  assert.equal(result.ok, false);
  assert.match((result as { error: string }).error, /Invalid phone/i);
});

test("startLogin drives the phone tab and sends the SMS code", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const result = await service.startLogin("+8613800000000");
  assert.equal(result.ok, true);
  const session = (result as { session: { sessionId: string; phase: string } }).session;
  assert.equal(session.phase, "waiting_code");

  assert.equal(fake.__state.fills[PHONE_INPUT], "13800000000");
  assert.ok(fake.__state.clicks.includes(PHONE_TAB));
  assert.ok(fake.__state.clicks.includes(SEND_CODE_BTN));
});

test("startLogin degrades to fallback_manual when selectors miss", async () => {
  const fake = makeFakePlaywright();
  // nothing visible → phone tab not found
  const service = fastService(fake);

  const result = await service.startLogin("13800000000");
  assert.equal(result.ok, true);
  const session = (result as { session: { phase: string } }).session;
  assert.equal(session.phase, "fallback_manual");
  assert.ok(fake.__state.browserClosed, "browser must close on fallback");
});

test("startLogin reports captcha_required with a screenshot when the console demands one", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  fake.__state.visible.add(CAPTCHA_INPUT);
  fake.__state.visible.add(CAPTCHA_MODAL);
  const service = fastService(fake);

  const result = await service.startLogin("13800000000");
  assert.equal(result.ok, true);
  const session = (result as { session: { phase: string; captchaImage: string | null } }).session;
  assert.equal(session.phase, "captcha_required");
  assert.match(session.captchaImage || "", /^data:image\/png;base64,/);
});

test("startLogin degrades to fallback_manual on risk-control slider", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  fake.__state.visible.add('[class*="secsdk-captcha"]');
  const service = fastService(fake);

  const result = await service.startLogin("13800000000");
  assert.equal(result.ok, true);
  const session = (result as { session: { phase: string; error: string | null } }).session;
  assert.equal(session.phase, "fallback_manual");
  assert.match(session.error || "", /risk control/i);
  assert.ok(fake.__state.browserClosed);
});

test("startLogin replaces a stale session for the same phone", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const first = await service.startLogin("13800000000");
  const firstId = (first as { session: { sessionId: string } }).session.sessionId;
  const second = await service.startLogin("13800000000");
  const secondId = (second as { session: { sessionId: string } }).session.sessionId;

  assert.notEqual(firstId, secondId);
  assert.equal(service.getStatus(firstId)?.phase, "cancelled");
  assert.equal(service.getStatus(secondId)?.phase, "waiting_code");
});

// ─── submitCode ─────────────────────────────────────────────────────────────

test("submitCode completes login when all console cookies land", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  // Cookies complete after the first poll
  fake.__state.cookiesFn = () => FULL_COOKIES;

  const session = await service.submitCode(started.session.sessionId, "123456");
  assert.equal(session?.phase, "success");
  assert.deepEqual(Object.keys(session?.credentials || {}).sort(), [
    "AccountID",
    "csrfToken",
    "digest",
    "userInfo",
  ]);
  assert.equal(fake.__state.fills[SMS_CODE_INPUT], "123456");
  assert.ok(fake.__state.clicks.includes(LOGIN_BTN));
  assert.ok(fake.__state.browserClosed, "browser must close after success");
});

test("submitCode rejects a malformed code without touching the page", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  const before = fake.__state.clicks.length;

  const session = await service.submitCode(started.session.sessionId, "abc");
  assert.equal(session?.phase, "waiting_code");
  assert.equal(session?.error, "Invalid SMS code");
  assert.equal(fake.__state.clicks.length, before, "no click on malformed code");
});

test("submitCode requires the image captcha in captcha_required phase", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  fake.__state.visible.add(CAPTCHA_INPUT);
  fake.__state.visible.add(CAPTCHA_MODAL);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  const session = await service.submitCode(started.session.sessionId, "123456");
  assert.equal(session?.phase, "captcha_required");
  assert.equal(session?.error, "Image captcha is required");
});

test("submitCode surfaces console error toasts early", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.toastText = "验证码错误，请重新输入";

  const session = await service.submitCode(started.session.sessionId, "000000", undefined, {
    timeout: 500,
  });
  assert.equal(session?.phase, "error");
  assert.match(session?.error || "", /验证码错误/);
  assert.ok(fake.__state.browserClosed);
});

test("submitCode times out when cookies never arrive", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  const session = await service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 50,
  });
  assert.equal(session?.phase, "timeout");
  assert.ok(fake.__state.browserClosed);
});

// ─── MFA step-up (需要额外认证) ──────────────────────────────────────────

test("submitCode transitions to mfa_waiting when the console demands MFA", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  // After the login click the MFA step-up modal appears (no cookies yet).
  // (click-state baseline captured implicitly)
  fake.__state.cookiesFn = () => [
    { name: "digest", domain: ".volcengine.com", value: "d1" },
    { name: "csrfToken", domain: ".volcengine.com", value: "c1" },
  ];
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  // Simulate: login button clicked → MFA modal opens
  assert.ok(fake.__state.clicks.length > 0, "login flow clicked through");
  fake.__state.visible.add(MFA_MODAL);
  fake.__state.visible.add(MFA_INPUT);
  fake.__state.visible.add(MFA_CONFIRM_BTN);

  const session = await service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 2_000,
  });
  assert.equal(session?.phase, "mfa_waiting");
  assert.equal(session?.mfaRequired, true);
  assert.equal(session?.error, null);
  assert.ok(!fake.__state.browserClosed, "browser must stay open while MFA is pending");
});

test("submitCode completes login from mfa_waiting with the second code", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  // First submit → MFA modal opens
  fake.__state.visible.add(MFA_MODAL);
  fake.__state.visible.add(MFA_INPUT);
  fake.__state.visible.add(MFA_CONFIRM_BTN);
  fake.__state.cookiesFn = () => [
    { name: "digest", domain: ".volcengine.com", value: "d1" },
    { name: "csrfToken", domain: ".volcengine.com", value: "c1" },
  ];
  const mfa = await service.submitCode(started.session.sessionId, "111111", undefined, {
    timeout: 2_000,
  });
  assert.equal(mfa?.phase, "mfa_waiting");

  // Second submit from mfa_waiting: modal closes, all cookies land
  fake.__state.visible.delete(MFA_MODAL);
  fake.__state.cookiesFn = () => FULL_COOKIES;
  const done = await service.submitCode(started.session.sessionId, "222222");
  assert.equal(done?.phase, "success");
  assert.equal(fake.__state.fills[MFA_INPUT], "222222");
  assert.ok(fake.__state.clicks.includes(MFA_CONFIRM_BTN));
  assert.ok(fake.__state.browserClosed);
});

test("submitCode returns to mfa_waiting when the MFA code is rejected", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.visible.add(MFA_MODAL);
  fake.__state.visible.add(MFA_INPUT);
  fake.__state.visible.add(MFA_CONFIRM_BTN);
  fake.__state.cookiesFn = () => [];
  const mfa = await service.submitCode(started.session.sessionId, "111111", undefined, {
    timeout: 2_000,
  });
  assert.equal(mfa?.phase, "mfa_waiting");

  // Modal still up after submitting a wrong second code → retry state
  const retry = await service.submitCode(started.session.sessionId, "222222", undefined, {
    timeout: 2_000,
  });
  assert.equal(retry?.phase, "mfa_waiting");
  assert.match(retry?.error || "", /not accepted/i);
});

test("submitCode degrades to fallback_manual for the TOTP binding modal", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.visible.add(MFA_BIND_MODAL);
  fake.__state.cookiesFn = () => [];
  const session = await service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 2_000,
  });
  assert.equal(session?.phase, "fallback_manual");
  assert.match(session?.error || "", /binding an MFA device/i);
  assert.ok(fake.__state.browserClosed);
});

test("submitCode navigates to the ark console page when the redirect leaves cookies incomplete", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  // Login redirected to the console home, cookies only complete AFTER the
  // console app runs (simulated by completing the jar on goto).
  fake.__state.url = "https://console.volcengine.com/";
  fake.__state.cookiesFn = () => [
    { name: "digest", domain: ".volcengine.com", value: "d1" },
    { name: "csrfToken", domain: ".volcengine.com", value: "c1" },
  ];

  const submitPromise = service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 2_000,
  });
  // Complete the cookies once the service navigates to the ark page
  const waitNav = new Promise<void>((resolve) => {
    const iv = setInterval(() => {
      if (fake.__state.gotoCalls.some((u) => u.includes("/ark/"))) {
        clearInterval(iv);
        fake.__state.cookiesFn = () => FULL_COOKIES;
        resolve();
      }
    }, 5);
  });
  await waitNav;
  const session = await submitPromise;
  assert.equal(session?.phase, "success");
  assert.ok(
    fake.__state.gotoCalls.some((u) => u.includes("/ark/")),
    "must navigate to the ark console page to finish cookie issuance"
  );
});

test("resendCode from mfa_waiting clicks the modal resend button and stays in mfa", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake); // resendCooldownMs: 20ms

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.visible.add(MFA_MODAL);
  fake.__state.visible.add(MFA_INPUT);
  fake.__state.visible.add(MFA_CONFIRM_BTN);
  fake.__state.cookiesFn = () => [];
  const mfa = await service.submitCode(started.session.sessionId, "111111", undefined, {
    timeout: 2_000,
  });
  assert.equal(mfa?.phase, "mfa_waiting");

  // Wait out the 20ms cooldown, then resend must click 重发校验码 (not 获取验证码)
  await new Promise((resolve) => setTimeout(resolve, 30));
  fake.__state.visible.add(MFA_RESEND_BTN);
  const resent = await service.resendCode(started.session.sessionId);
  assert.equal(resent?.phase, "mfa_waiting");
  assert.ok(fake.__state.clicks.includes(MFA_RESEND_BTN), "must click the MFA resend button");
});

test("submitCode ignores unknown sessions", async () => {
  const fake = makeFakePlaywright();
  const service = fastService(fake);
  assert.equal(await service.submitCode("missing", "123456"), null);
});

// ─── Identity selection (/auth/login/select_identity) ───────────────────

test("submitCode transitions to identity_required on the select_identity page", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  // SMS code accepted → redirected to identity selection with the REAL page
  // structure: ul[class*=accountUl] > li[class*=accountLi]
  fake.__state.url = "https://console.volcengine.com/auth/login/select_identity/";
  fake.__state.lists[IDENTITY_LIST] = [
    "主账号 company-main (ID:1000)",
    "子账号 yangsiyuan (ID:2000)",
  ];
  fake.__state.cookiesFn = () => [
    { name: "digest", domain: ".volcengine.com", value: "d1" },
    { name: "csrfToken", domain: ".volcengine.com", value: "c1" },
  ];

  const session = await service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 2_000,
  });
  assert.equal(session?.phase, "identity_required");
  assert.deepEqual(session?.identityOptions, [
    { index: 0, label: "主账号 company-main (ID:1000)" },
    { index: 1, label: "子账号 yangsiyuan (ID:2000)" },
  ]);
  assert.ok(!fake.__state.browserClosed, "browser must stay open while identity is pending");
});

test("selectIdentity clicks the chosen identity and the submit button, then completes login", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.url = "https://console.volcengine.com/auth/login/select_identity/";
  fake.__state.lists[IDENTITY_LIST] = [
    "主账号 company-main (ID:1000)",
    "子账号 yangsiyuan (ID:2000)",
  ];
  fake.__state.lists[IDENTITY_ITEM] = ["item-0", "item-1"];
  fake.__state.visible.add(IDENTITY_SUBMIT);
  const select = await service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 2_000,
  });
  assert.equal(select?.phase, "identity_required");

  // Choosing identity #1: item click + submit click fire, cookies complete
  fake.__state.cookiesFn = () => FULL_COOKIES;
  fake.__state.url = "https://console.volcengine.com/console/home";
  const done = await service.selectIdentity(started.session.sessionId, 1);
  assert.equal(done?.phase, "success");
  assert.ok(fake.__state.clicks.includes(`${IDENTITY_ITEM}[1]`), "must click identity item 1");
  assert.ok(fake.__state.clicks.includes(IDENTITY_SUBMIT), "must click the submit button");
  assert.equal(done?.identityOptions, undefined);
  assert.ok(fake.__state.browserClosed);
});

test("selectIdentity with index 0 skips the item click (page pre-selects the first identity)", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.url = "https://console.volcengine.com/auth/login/select_identity/";
  fake.__state.lists[IDENTITY_LIST] = [
    "主账号 company-main (ID:1000)",
    "子账号 yangsiyuan (ID:2000)",
  ];
  fake.__state.lists[IDENTITY_ITEM] = ["item-0", "item-1"];
  fake.__state.visible.add(IDENTITY_SUBMIT);
  await service.submitCode(started.session.sessionId, "123456", undefined, { timeout: 2_000 });

  fake.__state.cookiesFn = () => FULL_COOKIES;
  fake.__state.url = "https://console.volcengine.com/console/home";
  const done = await service.selectIdentity(started.session.sessionId, 0);
  assert.equal(done?.phase, "success");
  assert.ok(
    !fake.__state.clicks.some((c) => c.startsWith(IDENTITY_ITEM)),
    "index 0 must not click an item — the page pre-selects it"
  );
  assert.ok(fake.__state.clicks.includes(IDENTITY_SUBMIT));
});

test("selectIdentity rejects an out-of-range index", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.url = "https://console.volcengine.com/auth/login/select_identity/";
  fake.__state.lists[IDENTITY_LIST] = ["主账号 company-main (ID:1000)"];
  fake.__state.lists[IDENTITY_ITEM] = ["item-0"];
  fake.__state.visible.add(IDENTITY_SUBMIT);
  const select = await service.submitCode(started.session.sessionId, "123456", undefined, {
    timeout: 2_000,
  });
  assert.equal(select?.phase, "identity_required");

  const session = await service.selectIdentity(started.session.sessionId, 5);
  assert.equal(session?.phase, "identity_required");
  assert.match(session?.error || "", /out of range/i);
  assert.ok(!fake.__state.browserClosed, "session must survive a bad index");
});

test("selectIdentity surfaces an MFA step-up triggered by the identity submit", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.url = "https://console.volcengine.com/auth/login/select_identity/";
  fake.__state.lists[IDENTITY_LIST] = ["主账号 company-main (ID:1000)"];
  fake.__state.lists[IDENTITY_ITEM] = ["item-0"];
  fake.__state.visible.add(IDENTITY_SUBMIT);
  await service.submitCode(started.session.sessionId, "123456", undefined, { timeout: 2_000 });

  // Identity submit triggers ANOTHER MFA step-up
  fake.__state.visible.add(MFA_MODAL);
  fake.__state.visible.add(MFA_INPUT);
  fake.__state.visible.add(MFA_CONFIRM_BTN);
  fake.__state.cookiesFn = () => [];
  const session = await service.selectIdentity(started.session.sessionId, 0);
  assert.equal(session?.phase, "mfa_waiting");
  assert.equal(session?.mfaRequired, true);
});

test("selectIdentity is ignored outside the identity_required phase", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  const session = await service.selectIdentity(started.session.sessionId, 0);
  assert.equal(session?.phase, "waiting_code");
});

// ─── cancel / resend ────────────────────────────────────────────────────────

test("cancel aborts an active session and closes the browser", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  const session = await service.cancel(started.session.sessionId);
  assert.equal(session?.phase, "cancelled");
  assert.ok(fake.__state.browserClosed);
  assert.equal(service.getStatus(started.session.sessionId)?.phase, "cancelled");
});

test("resendCode respects the cooldown window", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  const clicksBefore = fake.__state.clicks.filter((c) => c === SEND_CODE_BTN).length;

  const session = await service.resendCode(started.session.sessionId);
  assert.equal(session?.phase, "waiting_code");
  const clicksAfter = fake.__state.clicks.filter((c) => c === SEND_CODE_BTN).length;
  assert.equal(clicksAfter, clicksBefore, "resend must not click during cooldown");
});

test("resendCode clicks again once the cooldown passed", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake); // resendCooldownMs: 20ms

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };

  // Still inside the 20ms cooldown → no second click
  await service.resendCode(started.session.sessionId);
  let clicks = fake.__state.clicks.filter((c) => c === SEND_CODE_BTN).length;
  assert.equal(clicks, 1, "resend must not click during cooldown");

  // Cooldown elapsed → click fires and phase resets to waiting_code
  await new Promise((resolve) => setTimeout(resolve, 30));
  const session = await service.resendCode(started.session.sessionId);
  clicks = fake.__state.clicks.filter((c) => c === SEND_CODE_BTN).length;
  assert.equal(clicks, 2, "resend clicks the send-code button after cooldown");
  assert.equal(session?.phase, "waiting_code");
  assert.equal(session?.error, null);
});

// ─── withBinding ────────────────────────────────────────────────────────────

test("withBinding binds once and reuses the result across polls", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.cookiesFn = () => FULL_COOKIES;
  const submitted = await service.submitCode(started.session.sessionId, "123456");
  assert.equal(submitted?.phase, "success");

  let bindCalls = 0;
  const bind = async () => {
    bindCalls++;
    return { results: [{ plan: "coding", ok: true }] };
  };

  const [a, b] = await Promise.all([
    service.withBinding(started.session.sessionId, bind),
    service.withBinding(started.session.sessionId, bind),
  ]);
  await service.withBinding(started.session.sessionId, bind);

  assert.equal(bindCalls, 1, "concurrent bind calls are deduped");
  assert.deepEqual((a as { binding: unknown }).binding, {
    results: [{ plan: "coding", ok: true }],
  });
  assert.deepEqual((b as { binding: unknown }).binding, {
    results: [{ plan: "coding", ok: true }],
  });
});

test("withBinding records bind failures without retrying forever", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  fake.__state.cookiesFn = () => FULL_COOKIES;
  await service.submitCode(started.session.sessionId, "123456");

  let bindCalls = 0;
  const view = await service.withBinding(started.session.sessionId, async () => {
    bindCalls++;
    throw new Error("boom");
  });
  await service.withBinding(started.session.sessionId, async () => {
    bindCalls++;
    throw new Error("boom-2");
  });

  assert.equal(bindCalls, 1, "failed bind is recorded, not retried");
  assert.deepEqual((view as { binding: unknown }).binding, { error: "boom" });
});

test("withBinding returns the view unchanged before success", async () => {
  const fake = makeFakePlaywright();
  happyPathVisible(fake);
  const service = fastService(fake);

  const started = (await service.startLogin("13800000000")) as {
    session: { sessionId: string };
  };
  let bindCalls = 0;
  const view = await service.withBinding(started.session.sessionId, async () => {
    bindCalls++;
    return { results: [] };
  });
  assert.equal(bindCalls, 0);
  assert.equal(view?.phase, "waiting_code");
});
