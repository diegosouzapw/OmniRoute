/**
 * Shared FAKE_CREDS fixture for the web-cookie executor sweep.
 *
 * Extracted out of tests/unit/executor-web-cookie-sweep.test.ts (issue #14480) so
 * a focused regression test can import the exact per-provider fake-credential
 * value the sweep uses WITHOUT importing the sweep test file itself — importing
 * that file also registers (and runs) its own `describe()` sweep over all 26
 * WEB_COOKIE_PROVIDERS as a side effect of module load, which defeats the point
 * of a small, fast, isolated regression test.
 *
 * Per-provider fake-credential strings that pass the executor's own
 * input-validation gate without making a real upstream call succeed.
 * Each executor parses a different cookie/header — the goal is only
 * to short-circuit the network call with a synthetic 401/403/4xx/5xx,
 * not to actually authenticate.
 */
export const FAKE_CREDS: Record<string, string> = {
  "grok-web": "sso=fake-audit-sweep",
  "gemini-web": "__Secure-1PSID=fake-audit-sweep",
  "perplexity-web": "__Secure-next-auth.session-token=fake-audit-sweep",
  "blackbox-web": "__Secure-authjs.session-token=fake-audit-sweep",
  "muse-spark-web": "ecto_1_sess=fake-audit-sweep",
  "claude-web": "sessionKey=fake-audit-sweep",
  "deepseek-web": "userToken=fake-audit-sweep",
  "copilot-web": "fake-audit-sweep",
  "t3-web": "fake-audit-sweep",
  "inner-ai": "fake-audit-sweep user@example.com",
  "adapta-web": "__client=fake-audit-sweep",
  huggingchat: "hf-chat=fake-audit-sweep",
  "poe-web": "p-b=fake-audit-sweep",
  "venice-web": "fake-audit-sweep",
  "v0-vercel-web": "fake-audit-sweep",
  "kimi-web": "fake-audit-sweep",
  "doubao-web": "sessionid=fake-audit-sweep; ttwid=fake-audit-sweep; s_v_web_id=verify_fake",
  "duckduckgo-web": "",
  "veoaifree-web": "",
  "tencent-aistudio-web": "",
};
