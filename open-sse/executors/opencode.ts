import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";
import {
  injectReasoningContentForThinkingModel,
  isThinkingMessageModel,
} from "../utils/reasoningContentInjector.ts";
import { runWithProxyContext } from "../utils/proxyFetch.ts";
import { forwardOpencodeClientHeaders } from "../utils/opencodeHeaders.ts";

/**
 * Per-account proxy configuration, persisted by NoAuthAccountCard under
 * `providerSpecificData.accountProxies` (keyed by the account id, which the UI
 * stores in `providerSpecificData.fingerprints`). Same shape mimocode uses.
 */
export interface OpencodeAccountProxyConfig {
  fingerprint: string;
  proxy: {
    type: string;
    host: string;
    port: number;
    username?: string;
    password?: string;
  } | null;
}

/** Runtime rotation/cooldown state for one "OpenCode Free" account. */
interface OpencodeAccountState {
  /** Account id (UI: providerSpecificData.fingerprints[i]); "" for the default direct account. */
  fingerprint: string;
  cooldownUntil: number;
  consecutiveFails: number;
  /** Resolved proxy config for this account (null = direct egress). */
  proxy: OpencodeAccountProxyConfig["proxy"];
}

const OPENCODE_COOLDOWN_BASE_MS = 5_000;
const OPENCODE_COOLDOWN_MAX_MS = 60_000;

const EFFORT_LEVELS = ["low", "medium", "high", "max"] as const;

/**
 * Parse a DeepSeek V4 Pro model string with an effort-level suffix.
 * e.g. "deepseek-v4-pro-low" → { baseModel: "deepseek-v4-pro", effort: "low" }
 * Returns null if the model doesn't match the pattern.
 */
function parseDeepSeekEffortLevel(model: string): { baseModel: string; effort: string } | null {
  const m = String(model || "");
  const matchedLevel = EFFORT_LEVELS.find((level) => m.endsWith(`-${level}`));
  if (!matchedLevel) return null;
  const baseModel = m.slice(0, -matchedLevel.length - 1);
  if (baseModel.toLowerCase() !== "deepseek-v4-pro") return null;
  return { baseModel: "deepseek-v4-pro", effort: matchedLevel };
}

export class OpencodeExecutor extends BaseExecutor {
  _requestFormat: string | null = null;

  /**
   * Per-account rotation state, rebuilt from credentials on each request. The
   * default entry (fingerprint "") represents the single anonymous account with
   * no configured proxy — preserves the historical direct pass-through when the
   * user has not configured any per-account proxy.
   */
  private accounts: OpencodeAccountState[] = [
    { fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null },
  ];
  private nextAccountIdx = 0;

  constructor(provider: string) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  /**
   * Rebuild `accounts` from `providerSpecificData.fingerprints` +
   * `providerSpecificData.accountProxies`. Each configured account id becomes a
   * rotation slot carrying its own proxy. When the user configured no accounts
   * at all, the single default direct account is kept (backward compatible).
   */
  private syncAccountsFromCredentials(credentials: ProviderCredentials): void {
    const psd = credentials?.providerSpecificData;
    const fingerprints = Array.isArray(psd?.fingerprints)
      ? (psd!.fingerprints as unknown[]).filter((f): f is string => typeof f === "string")
      : [];

    const accountProxies = psd?.accountProxies as OpencodeAccountProxyConfig[] | undefined;
    const proxyMap = Array.isArray(accountProxies)
      ? new Map(accountProxies.map((ap) => [ap.fingerprint, ap.proxy ?? null] as const))
      : null;

    if (fingerprints.length === 0) {
      // No configured accounts — keep a single direct account.
      this.accounts = [{ fingerprint: "", cooldownUntil: 0, consecutiveFails: 0, proxy: null }];
      this.nextAccountIdx = 0;
      return;
    }

    const previous = new Map(this.accounts.map((a) => [a.fingerprint, a] as const));
    this.accounts = fingerprints.map((fp) => {
      const prior = previous.get(fp);
      return {
        fingerprint: fp,
        cooldownUntil: prior?.cooldownUntil ?? 0,
        consecutiveFails: prior?.consecutiveFails ?? 0,
        proxy: proxyMap ? (proxyMap.get(fp) ?? null) : null,
      };
    });
    if (this.nextAccountIdx >= this.accounts.length) this.nextAccountIdx = 0;
  }

  private isAccountReady(account: OpencodeAccountState): boolean {
    return account.cooldownUntil <= Date.now();
  }

  /** Round-robin pick, skipping accounts in cooldown; falls back to the next index. */
  private pickAccount(): OpencodeAccountState {
    for (let i = 0; i < this.accounts.length; i++) {
      const idx = (this.nextAccountIdx + i) % this.accounts.length;
      const acct = this.accounts[idx];
      if (this.isAccountReady(acct)) {
        this.nextAccountIdx = (idx + 1) % this.accounts.length;
        return acct;
      }
    }
    const fallbackIdx = this.nextAccountIdx % this.accounts.length;
    this.nextAccountIdx = (this.nextAccountIdx + 1) % this.accounts.length;
    return this.accounts[fallbackIdx];
  }

  private markCooldown(account: OpencodeAccountState): void {
    account.consecutiveFails++;
    const backoff = Math.min(
      OPENCODE_COOLDOWN_BASE_MS * Math.pow(2, account.consecutiveFails - 1),
      OPENCODE_COOLDOWN_MAX_MS
    );
    account.cooldownUntil = Date.now() + backoff + Math.random() * 1000;
  }

  private markSuccess(account: OpencodeAccountState): void {
    account.consecutiveFails = 0;
  }

  /** Mask an account id for logs (UI calls it a fingerprint). */
  private static maskAccountId(fingerprint: string): string {
    if (!fingerprint) return "direct";
    return `${fingerprint.slice(0, 8)}…`;
  }

  async execute(input: ExecuteInput) {
    this._requestFormat = getModelTargetFormat(this.provider, input.model) || "openai";
    try {
      this.syncAccountsFromCredentials(input.credentials);

      const hasProxies = this.accounts.some((a) => a.proxy !== null);
      // Fast path: no multi-account proxy wiring configured → original behavior.
      if (this.accounts.length === 1 && !hasProxies) {
        return await super.execute(input);
      }

      const { log } = input;
      let lastResult: Awaited<ReturnType<BaseExecutor["execute"]>> | null = null;

      for (let attempt = 0; attempt < this.accounts.length; attempt++) {
        const account = this.pickAccount();
        const masked = OpencodeExecutor.maskAccountId(account.fingerprint);
        // #5217 (Gap 2): promoted debug→info so the per-request account/proxy
        // rotation selection is visible in the Console log view at the default
        // APP_LOG_LEVEL=info (users could not see which account/proxy was used).
        // Token stays masked — never log the full account id.
        log?.info?.(
          "OPENCODE",
          `dispatch via account ${masked} (idx ${attempt + 1}/${this.accounts.length})` +
            (account.proxy
              ? ` through proxy ${account.proxy.host}:${account.proxy.port}`
              : " direct")
        );

        // Pin egress to this account's proxy for the whole BaseExecutor dispatch
        // (incl. its intra-URL 429 retries). skipUpstreamRetry lets THIS loop own
        // the cross-account 429 fallback instead of BaseExecutor's same-key retry.
        const result = await runWithProxyContext(account.proxy, () =>
          super.execute({ ...input, skipUpstreamRetry: true })
        );
        lastResult = result;

        const status = result.response.status;
        if (status === 429) {
          this.markCooldown(account);
          log?.warn?.("OPENCODE", `Rate limited (429) on account ${masked}, rotating to next…`);
          continue;
        }

        this.markSuccess(account);
        return result;
      }

      // All accounts returned 429 (or errored) — surface the last response.
      return lastResult ?? (await super.execute(input));
    } finally {
      this._requestFormat = null;
    }
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void urlIndex;
    void credentials;

    const base = this.config.baseUrl;
    switch (this._requestFormat) {
      case "claude":
        return `${base}/messages`;
      case "openai-responses":
        return `${base}/responses`;
      case "gemini":
        return `${base}/models/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
      default:
        return `${base}/chat/completions`;
    }
  }

  buildHeaders(
    credentials: ProviderCredentials | null,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string
  ) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const key = credentials?.apiKey || credentials?.accessToken;

    if (key) {
      if (this._requestFormat === "claude") {
        headers["x-api-key"] = key;
      } else {
        headers["Authorization"] = `Bearer ${key}`;
      }
    }

    if (this._requestFormat === "claude") {
      headers["anthropic-version"] = "2023-06-01";
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    // Opt-in (#5997): synthesize OpenCode CLI identity headers the client did not send.
    // Cloudflare in front of opencode.ai/zen/go 403s server-side (VPS) requests lacking
    // CLI identity, but the forward-only default is deliberate — fabricating a WRONG
    // value risks upstream rejection (#5720 regressed with "opencode/local"), and this
    // is deployment-specific. So it stays OFF by default and the VPS operator enables it
    // with OPENCODE_SYNTHESIZE_CLI_HEADERS=true (values env-overridable). Client-supplied
    // headers always take precedence.
    const synthesizeCli = /^(1|true|yes|on)$/i.test(
      process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS?.trim() ?? ""
    );
    const cliDefaults = synthesizeCli
      ? (() => {
          const providerId = this.config?.id || this.provider || "opencode";
          const envUAKey = `${providerId.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_USER_AGENT`;
          return {
            userAgent:
              process.env[envUAKey]?.trim() ||
              process.env.OPENCODE_USER_AGENT?.trim() ||
              "opencode-cli/1.0.0",
            client: process.env.OPENCODE_CLIENT?.trim() || "cli",
            project: process.env.OPENCODE_PROJECT?.trim() || "default",
          };
        })()
      : undefined;

    if (clientHeaders || cliDefaults) {
      forwardOpencodeClientHeaders(headers, clientHeaders ?? {}, {
        synthesizeRequestId: true,
        cliDefaults,
      });
    }

    void model;

    return headers;
  }

  transformRequest(
    model: string,
    body: any,
    stream: boolean,
    credentials: ProviderCredentials
  ): any {
    let modifiedBody = super.transformRequest(model, body, stream, credentials);
    // 9router#1442: OpenCode upstreams (e.g. kimi-k2.6 via opencode-go) return
    // 400 "Extra inputs are not permitted, field: 'client_metadata'" — an
    // OpenAI-Codex/Claude-CLI passthrough field with no equivalent here. The
    // DefaultExecutor strip only covers cerebras/mistral, and OpencodeExecutor
    // extends BaseExecutor directly, so nothing removed it on this path.
    if (
      modifiedBody &&
      typeof modifiedBody === "object" &&
      !Array.isArray(modifiedBody) &&
      Object.prototype.hasOwnProperty.call(modifiedBody, "client_metadata")
    ) {
      delete (modifiedBody as Record<string, unknown>).client_metadata;
    }
    if (
      modifiedBody &&
      typeof modifiedBody === "object" &&
      Array.isArray(modifiedBody.tools) &&
      modifiedBody.tools.length > 128
    ) {
      modifiedBody.tools = modifiedBody.tools.slice(0, 128);
    }
    if (modifiedBody && typeof modifiedBody === "object" && !Array.isArray(modifiedBody)) {
      const mb = modifiedBody as Record<string, unknown>;
      const parsed = parseDeepSeekEffortLevel(model);
      if (parsed) {
        mb.model = parsed.baseModel;
        if (mb.reasoning_effort === undefined) {
          mb.reasoning_effort = parsed.effort;
        }
      }
    }
    // #1543 / upstream PR #1099: thinking-mode upstreams routed through OpenCode
    // (DeepSeek V4 Flash, Kimi, MiniMax, ...) require reasoning_content echoed
    // back on assistant messages, or they 400 with "reasoning_content must be
    // passed back". OpenAI clients drop it across turns, so we inject a
    // placeholder for the affected model families.
    if (isThinkingMessageModel(model)) {
      modifiedBody = injectReasoningContentForThinkingModel(modifiedBody);
    }
    return modifiedBody;
  }
}
