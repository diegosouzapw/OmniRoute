/**
 * LoginManager — Electron BrowserWindow-based web login for cookie providers
 *
 * Opens a native Electron window navigated to the provider's login page.
 * Polls the session cookie store for target cookies after login completes.
 *
 * Events:
 *   "status" — { status: string, message: string, providerId: string }
 *     status values: starting, navigating, waiting, polling, complete, error, cancelled
 */

const { BrowserWindow, session } = require("electron");
const { EventEmitter } = require("events");
const path = require("path");

// In production, the tokenExtractionConfig is bundled under open-sse/services/.
// We resolve relative to the Electron resources path.
let TOKEN_EXTRACTION_CONFIGS = null;
function getConfigs() {
  if (TOKEN_EXTRACTION_CONFIGS) return TOKEN_EXTRACTION_CONFIGS;
  try {
    const mod = require("../open-sse/services/tokenExtractionConfig");
    TOKEN_EXTRACTION_CONFIGS = mod.TOKEN_EXTRACTION_CONFIGS;
  } catch {
    // Fallback: try from app resources
    try {
      const mod = require("./open-sse/services/tokenExtractionConfig");
      TOKEN_EXTRACTION_CONFIGS = mod.TOKEN_EXTRACTION_CONFIGS;
    } catch {}
  }
  return TOKEN_EXTRACTION_CONFIGS;
}

class LoginManager extends EventEmitter {
  constructor() {
    super();
    this.window = null;
    this.activeProviderId = null;
    this.resolvePromise = null;
    this.rejectPromise = null;
    this.timeoutId = null;
    this.isCompleted = false;
    this.pollIntervalId = null;
    this.loginSession = null;
  }

  /**
   * Start a login flow for a web-cookie provider.
   * @param {string} providerId - e.g. "claude-web", "chatgpt-web"
   * @param {object} [options]
   * @param {number} [options.timeout] - Total timeout in ms (default: config or 300s)
   * @returns {Promise<{success: boolean, credentials?: Record<string, string>, error?: string}>}
   */
  startLogin(providerId, options = {}) {
    const configs = getConfigs();
    if (!configs) {
      return Promise.resolve({
        success: false,
        error: "tokenExtractionConfig module not found",
      });
    }

    const extractionConfig = configs.get(providerId);
    if (!extractionConfig) {
      return Promise.resolve({
        success: false,
        error: `No extraction config for provider: ${providerId}`,
      });
    }

    if (this.activeProviderId) {
      return Promise.resolve({
        success: false,
        error: "A login process is already in progress",
      });
    }

    this.activeProviderId = providerId;
    this.isCompleted = false;

    const timeout = options.timeout || extractionConfig.pollingConfig.timeout || 300_000;
    const minLoginTime = extractionConfig.pollingConfig.minLoginTime || 5000;
    const pollInterval = extractionConfig.pollingConfig.pollInterval || 1000;

    return new Promise((resolve, reject) => {
      this.resolvePromise = resolve;
      this.rejectPromise = reject;

      this.emit("status", {
        providerId,
        status: "starting",
        message: `Opening ${extractionConfig.displayName} login...`,
      });

      try {
        this._openLoginWindow(providerId, extractionConfig, timeout, minLoginTime, pollInterval);
      } catch (err) {
        this._cleanup();
        this.emit("status", {
          providerId,
          status: "error",
          message: `Failed to open window: ${err.message}`,
        });
        resolve({ success: false, error: err.message });
      }
    });
  }

  /**
   * Open the Electron BrowserWindow for login
   */
  _openLoginWindow(providerId, config, timeout, minLoginTime, pollInterval) {
    this.window = new BrowserWindow({
      width: 1000,
      height: 750,
      title: `Login - ${config.displayName}`,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        session: session.fromPartition(`login-${providerId}-${Date.now()}`),
      },
      show: true,
      autoHideMenuBar: true,
    });

    const winSession = this.window.webContents.session;

    // Track navigation for success URL detection
    let navigatedToLogin = false;
    const startTime = Date.now();

    this.window.webContents.on("did-navigate", (_event, url) => {
      if (this.isCompleted) return;

      try {
        const parsedUrl = new URL(url);
        // Check if we've navigated away from the login page (successful login)
        if (navigatedToLogin && config.successUrlPattern) {
          if (config.successUrlPattern.test(url)) {
            this.emit("status", {
              providerId,
              status: "detected",
              message: "Login page redirect detected — extracting cookies...",
            });
          }
        }
        if (!navigatedToLogin) {
          navigatedToLogin = true;
        }

        this.emit("status", {
          providerId,
          status: "navigating",
          message: `Navigated to ${parsedUrl.hostname}`,
        });
      } catch {
        // ignore bad URLs
      }
    });

    // Load the login page
    this.emit("status", {
      providerId,
      status: "navigating",
      message: `Loading ${config.loginUrl}...`,
    });
    this.window.loadURL(config.loginUrl);

    // Show window when ready
    this.window.once("ready-to-show", () => {
      this.window.show();
    });

    // Handle window close by user
    this.window.on("closed", () => {
      if (!this.isCompleted) {
        this._cleanup();
        this.emit("status", {
          providerId,
          status: "cancelled",
          message: "Login window closed by user",
        });
        if (this.resolvePromise) {
          this.resolvePromise({ success: false, error: "Login window closed" });
        }
      }
    });

    // Start polling for cookies after minLoginTime has elapsed
    this.timeoutId = setTimeout(() => {
      if (this.isCompleted) return;
      this._startPolling(providerId, config, winSession, pollInterval, startTime, minLoginTime);
    }, minLoginTime);

    // Overall timeout
    this._timeoutTimer = setTimeout(() => {
      if (!this.isCompleted) {
        this._cleanup();
        this.emit("status", {
          providerId,
          status: "error",
          message: "Login timed out",
        });
        if (this.resolvePromise) {
          this.resolvePromise({ success: false, error: "Login timed out" });
        }
      }
    }, timeout);
  }

  /**
   * Poll the Electron session cookie store for the target cookies
   */
  _startPolling(providerId, config, winSession, pollInterval, startTime, minLoginTime) {
    const maxPolls = Math.floor(config.pollingConfig.timeout / pollInterval);
    let pollCount = 0;

    const poll = () => {
      if (this.isCompleted) return;
      pollCount++;

      // Emit progress every 30 polls
      if (pollCount % 30 === 0) {
        const elapsed = Math.round((Date.now() - startTime) / 60000);
        this.emit("status", {
          providerId,
          status: "waiting",
          message: `Waiting for login... (${elapsed}m)`,
        });
      }

      winSession.cookies
        .get({})
        .then((cookies) => {
          if (this.isCompleted) return;

          const tokenSources = config.tokenSources;
          const credentials = {};

          // Collect all cookie-based sources
          const cookieSources = tokenSources.filter((s) => s.type === "cookie");
          for (const source of cookieSources) {
            const domain = source.domain || undefined;
            const matched = cookies.find(
              (c) => c.name === source.name && (!domain || c.domain.includes(domain.replace(/^\./, "")))
            );
            if (matched) {
              credentials[source.name] = matched.value;
            }
          }

          // Check localStorage-based tokens via executeJavaScript
          const storageSources = tokenSources.filter(
            (s) => s.type === "localStorage" || s.type === "sessionStorage"
          );

          if (storageSources.length > 0 && this.window && !this.window.isDestroyed()) {
            // Execute JS to extract all localStorage/sessionStorage tokens
            const storageType = storageSources[0].type === "localStorage" ? "localStorage" : "sessionStorage";
            const keys = storageSources.map((s) => s.key);
            const js = `(() => {
              const res = {};
              ${JSON.stringify(keys)}.forEach(k => {
                try { res[k] = ${storageType}.getItem(k); } catch {}
              });
              return res;
            })()`;

            this.window.webContents
              .executeJavaScript(js)
              .then((values) => {
                if (values && typeof values === "object") {
                  Object.assign(credentials, values);
                }
                this._checkCredentials(providerId, credentials, cookieSources, storageSources, poll, pollInterval);
              })
              .catch(() => {
                this._checkCredentials(providerId, credentials, cookieSources, storageSources, poll, pollInterval);
              });
          } else {
            this._checkCredentials(providerId, credentials, cookieSources, storageSources, poll, pollInterval);
          }
        })
        .catch(() => {
          if (!this.isCompleted) {
            this.pollIntervalId = setTimeout(poll, pollInterval);
          }
        });
    };

    // Start first poll
    this.pollIntervalId = setTimeout(poll, 0);
  }

  /**
   * Check if we have all required credentials, otherwise continue polling
   */
  _checkCredentials(providerId, credentials, cookieSources, storageSources, poll, pollInterval) {
    if (this.isCompleted) return;

    // Collect the required source names/keys
    const requiredKeys = [
      ...cookieSources.map((s) => s.name),
      ...storageSources.map((s) => s.key),
    ];
    const foundKeys = Object.keys(credentials);
    const allFound = requiredKeys.every((k) => foundKeys.includes(k));

    if (allFound && foundKeys.length > 0) {
      // Success — all credentials extracted
      this._completeLogin(providerId, foundKeys.reduce((acc, k) => {
        acc[k] = credentials[k];
        return acc;
      }, {}));
    } else if (!this.isCompleted) {
      // Continue polling using the configured interval
      this.pollIntervalId = setTimeout(poll, pollInterval);
    }
  }

  /**
   * Complete the login flow successfully
   */
  _completeLogin(providerId, credentials) {
    this._cleanup();
    this.emit("status", {
      providerId,
      status: "complete",
      message: "Credentials extracted successfully",
    });
    if (this.resolvePromise) {
      this.resolvePromise({ success: true, credentials });
    }
  }

  /**
   * Cancel the current login flow
   */
  cancel() {
    if (!this.activeProviderId) return;
    this._cleanup();
    this.emit("status", {
      providerId: this.activeProviderId,
      status: "cancelled",
      message: "Login cancelled",
    });
    if (this.resolvePromise) {
      this.resolvePromise({ success: false, error: "Login cancelled" });
    }
  }

  /**
   * Clean up all resources
   */
  _cleanup() {
    this.isCompleted = true;
    this.activeProviderId = null;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this._timeoutTimer) {
      clearTimeout(this._timeoutTimer);
      this._timeoutTimer = null;
    }
    if (this.pollIntervalId) {
      clearTimeout(this.pollIntervalId);
      this.pollIntervalId = null;
    }
    if (this.window && !this.window.isDestroyed()) {
      this.window.close();
    }
    this.window = null;
    this.loginSession = null;
  }

  /**
   * Get the active provider ID, if any
   */
  getActiveProvider() {
    return this.activeProviderId;
  }
}

module.exports = { LoginManager, loginManager: new LoginManager() };
