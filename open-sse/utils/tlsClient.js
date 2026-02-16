import { createRequire } from "module";

const require = createRequire(import.meta.url);

let createSession;
try {
  ({ createSession } = require("wreq-js"));
} catch {
  createSession = null;
}

/**
 * Get proxy URL from environment variables.
 * Priority: HTTPS_PROXY > HTTP_PROXY > ALL_PROXY
 */
function getProxyFromEnv() {
  return (
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.ALL_PROXY ||
    process.env.all_proxy ||
    undefined
  );
}

/**
 * TLS Client — Chrome 124 TLS fingerprint spoofing via wreq-js
 * Singleton instance used to disguise Node.js TLS handshake as Chrome browser.
 *
 * wreq-js natively supports proxy — TLS fingerprinting works through proxy.
 * Proxy URL is read from environment variables (HTTPS_PROXY, HTTP_PROXY, ALL_PROXY).
 */
class TlsClient {
  constructor() {
    this.session = null;
    this.available = !!createSession;
  }

  async getSession() {
    if (!this.available) return null;
    if (this.session) return this.session;

    const proxy = getProxyFromEnv();
    const sessionOpts = {
      browser: "chrome_124",
      os: "macos",
    };
    if (proxy) {
      sessionOpts.proxy = proxy;
      console.log(`[TlsClient] Using proxy: ${proxy}`);
    }

    this.session = await createSession(sessionOpts);
    console.log("[TlsClient] Session created (Chrome 124 TLS fingerprint)");
    return this.session;
  }

  /**
   * Fetch with Chrome 124 TLS fingerprint.
   * wreq-js Response is already fetch-compatible (headers, text(), json(), clone(), body).
   */
  async fetch(url, options = {}) {
    const session = await this.getSession();
    if (!session) throw new Error("wreq-js not available");

    const method = (options.method || "GET").toUpperCase();

    const wreqOptions = {
      method,
      headers: options.headers,
      body: options.body,
      redirect: options.redirect === "manual" ? "manual" : "follow",
    };

    // Pass signal through if available
    if (options.signal) {
      wreqOptions.signal = options.signal;
    }

    const response = await session.fetch(url, wreqOptions);
    return response;
  }

  async exit() {
    if (this.session) {
      await this.session.close();
      this.session = null;
    }
  }
}

export default new TlsClient();
