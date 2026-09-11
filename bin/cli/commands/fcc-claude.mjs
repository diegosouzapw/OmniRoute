/**
 * omniroute fcc-claude — Free-Claude-Code 风格 launcher，移植自方案一 PoC。
 *
 * 功能：
 *   1. 启动 claude 二进制，指向本地或远程 OmniRoute（支持 omni.paibao.ai）
 *   2. Anthropic Messages API 流式客户端，支持 fallback chain
 *   3. 双上游版本追踪（OmniRoute + FCC GitHub）
 *
 * 用法：
 *   omniroute fcc-claude [options] [claude args...]
 *   omniroute fcc-claude --remote https://omni.paibao.ai
 *   omniroute fcc-claude --fallback models.json "帮我写个 bug"
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { t } from "../i18n.mjs";
import { resolveActiveContext } from "../contexts.mjs";
import { quoteShellArgs } from "../utils/winShellArgs.mjs";
import {
  buildClaudeEnv,
  resolveLaunchTarget,
  resolveClaudeSpawn,
  quoteClaudeArgs,
} from "./launch.mjs";

const DATA_DIR = join(os.homedir(), ".omni-fcc-poc");
const FALLBACK_CONFIG_PATH = join(DATA_DIR, "fallback.json");
const VERSION_CACHE_PATH = join(DATA_DIR, "version-cache.json");

// ─── 默认 fallback 链（FCC 风格） ───────────────────────────────────────────

const DEFAULT_FALLBACK_MODELS = [
  "auto/best-coding",
  "auto/best-chat",
  "auto/fast",
];

/**
 * 加载 fallback 配置（JSON 文件或默认值）。
 * 格式：{ "models": ["auto/best-coding", ...], "strategy": "priority" }
 */
export function loadFallbackChain(opts = {}) {
  if (opts.models) {
    return { models: opts.models, strategy: opts.strategy || "priority" };
  }
  try {
    const raw = readFileSync(FALLBACK_CONFIG_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { models: DEFAULT_FALLBACK_MODELS, strategy: "priority" };
  }
}

// ─── Anthropic Messages 流式客户端（FCC ProviderExecutor 移植） ─────────────

/**
 * 流式调用 Anthropic Messages API，支持 fallback chain。
 * 对应 FCC 的 ProviderExecutor.stream_messages()。
 *
 * @param {Array} messages  Anthropic messages 数组
 * @param {string} model    主模型 ID
 * @param {string} baseUrl  OmniRoute base URL（不含 /v1）
 * @param {string|undefined} authToken  Bearer token
 * @param {string[]} fallbackModels  fallback 模型链
 * @param {object} options  额外参数（max_tokens, temperature, reasoning_effort 等）
 * @yields {string} SSE 原始行
 */
export async function* streamMessages(
  messages,
  model,
  baseUrl,
  authToken,
  fallbackModels = [],
  options = {}
) {
  const allModels = [model, ...fallbackModels];
  let lastError = null;

  for (let i = 0; i < allModels.length; i++) {
    const currentModel = allModels[i];
    const isFallback = i > 0;

    if (isFallback) {
      console.error(
        `\x1b[33m[fcc-claude] fallback: ${allModels[i - 1]} → ${currentModel}\x1b[0m`
      );
    }

    const body = {
      model: currentModel,
      messages,
      stream: true,
      ...options,
    };

    try {
      const url = `${baseUrl.replace(/\/+$/, "")}/v1/messages`;
      const headers = {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      };
      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(120_000),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let newlineIdx;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          yield line + "\n";
        }
      }

      if (buffer) yield buffer;
      return; // 成功

    } catch (err) {
      lastError = err;
      console.error(
        `\x1b[33m[fcc-claude] WARN\x1b[0m Model ${currentModel} failed: ${err.message}`
      );
      if (i < allModels.length - 1) continue;
      throw new Error(`All models exhausted. Last: ${err.message}`);
    }
  }
}

/**
 * 直接流式测试（CLI 模式）：像 fcc-claude 一样但用于非交互测试。
 * 用法：omniroute fcc-claude --test "hello"
 */
export async function runTestCommand(opts = {}) {
  const { baseUrl, authToken } = resolveLaunchTarget(opts);
  const prompt = opts.test || opts.prompt || "Say hi";
  const chain = loadFallbackChain(opts);
  const fallbackModels = chain.models?.slice(1) || [];

  console.error(`[fcc-claude] Testing → ${baseUrl} model=${chain.models[0]}`);
  if (fallbackModels.length) console.error(`[fcc-claude] Fallback: ${fallbackModels.join(" → ")}`);

  try {
    for await (const line of streamMessages(
      [{ role: "user", content: prompt }],
      chain.models[0],
      baseUrl,
      authToken,
      fallbackModels
    )) {
      process.stdout.write(line);
    }
    console.error("\n[fcc-claude] ✓ test passed");
    return 0;
  } catch (err) {
    console.error(`\n[fcc-claude] ✖ test failed: ${err.message}`);
    return 1;
  }
}

// ─── 双上游版本追踪（移植自 PoC） ────────────────────────────────────────────

/**
 * 从两个上游获取最新版本并缓存（TTL 1h）。
 * 返回 { omniRoute, fcc } 结构。
 */
export async function fetchUpstreamVersions() {
  const now = Date.now();
  let cache = {};
  try {
    const raw = readFileSync(VERSION_CACHE_PATH, "utf8");
    cache = JSON.parse(raw);
    if (cache._fetchedAt && now - cache._fetchedAt < 60 * 60 * 1000) {
      return cache;
    }
  } catch {
    /* fresh start */
  }

  // 上游 1：本地/远程 OmniRoute 版本
  let omniVersion = null;
  try {
    const res = await fetch("http://localhost:20128/api/monitoring/health", {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const json = await res.json();
      omniVersion = json.version || json.system?.version || null;
    }
  } catch {
    /* unreachable */
  }

  // 上游 2：FCC GitHub（releases 或最近 commit）
  let fccVersion = null;
  try {
    const res = await fetch(
      "https://api.github.com/repos/Alishahryar1/free-claude-code/releases/latest",
      { signal: AbortSignal.timeout(5000) }
    );
    if (res.ok) {
      const json = await res.json();
      fccVersion = json.tag_name || null;
    } else {
      const commitRes = await fetch(
        "https://api.github.com/repos/Alishahryar1/free-claude-code/commits?per_page=1",
        { signal: AbortSignal.timeout(5000) }
      );
      if (commitRes.ok) {
        const json = await commitRes.json();
        if (Array.isArray(json) && json.length > 0) {
          fccVersion = json[0].sha.slice(0, 8);
        }
      }
    }
  } catch {
    /* unreachable */
  }

  cache = {
    _fetchedAt: now,
    omniRoute: { running: omniVersion, source: "health-api" },
    fcc: { latestRelease: fccVersion, source: "github-api" },
  };

  try {
    const dir = join(os.homedir(), ".omni-fcc-poc");
    if (!existsSync(dir)) require("node:fs").mkdirSync(dir, { recursive: true });
    require("node:fs").writeFileSync(VERSION_CACHE_PATH, JSON.stringify(cache, null, 2));
  } catch {
    /* non-fatal */
  }

  return cache;
}

export async function runVersionStatusCommand() {
  const cache = await fetchUpstreamVersions();
  console.log("\n=== OmniRoute × FCC 双上游版本状态 ===\n");
  console.log(`OmniRoute 运行中: ${cache.omniRoute.running || "不可达"}`);
  console.log(`FCC 最新: ${cache.fcc.latestRelease || "不可达"}`);
  console.log();
}

// ─── 主 launcher（复用 launch.mjs 的 buildClaudeEnv + resolveLaunchTarget） ─

/**
 * `omniroute fcc-claude [options] [claude args...]`
 *
 * 与 `omniroute launch` 的区别：
 *   - 内置 fallback chain（模型失败自动切换）
 *   - 支持 --test 模式（非交互流式测试）
 *   - 支持 --check-updates（双上游版本检查）
 */
export async function runFccClaude(opts = {}, claudeArgs = []) {
  // --check-updates 和 --test 是特殊模式，不走 claude spawn
  if (opts.checkUpdates) {
    await runVersionStatusCommand();
    return 0;
  }

  if (opts.test || opts.prompt) {
    return await runTestCommand({
      ...opts,
      test: opts.test || opts.prompt,
    });
  }

  // 正常模式：启动 claude 二进制
  const { baseUrl, authToken } = resolveLaunchTarget(opts);

  // Health check
  try {
    const res = await fetch(`${baseUrl}/api/monitoring/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
  } catch {
    console.error(
      (t("launch.notRunning") || "OmniRoute is not reachable at {url}.").replace("{url}", baseUrl)
    );
    return 1;
  }

  // 加载 fallback 链并打印
  const chain = loadFallbackChain(opts);
  const fallbackModels = chain.models?.slice(1) || [];
  if (fallbackModels.length) {
    console.error(
      `[fcc-claude] fallback chain: ${chain.models.join(" → ")}`
    );
  }

  // 构建 claude 环境（复用 launch.mjs 的 buildClaudeEnv）
  const env = buildClaudeEnv(process.env, baseUrl, authToken);

  // 找 claude 二进制
  const { command, shell } = await resolveClaudeSpawn(process.platform);

  console.error(`[fcc-claude] launching ${command} → ${baseUrl}`);

  const child = spawn(command, quoteClaudeArgs(claudeArgs, process.platform), {
    env,
    stdio: "inherit",
    shell,
    ...(process.platform === "win32" ? { windowsHide: true } : {}),
  });

  child.on("error", (err) => {
    if (err.code === "ENOENT") {
      console.error(
        `"${command}" not found. Install with: npm install -g @anthropic-ai/claude-code`
      );
    } else {
      console.error(String(err.message || err));
    }
    process.exit(127);
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

export function registerFccClaude(program) {
  program
    .command("fcc-claude")
    .description(
      "FCC-style launcher: Claude Code with built-in fallback chain and dual-upstream version tracking"
    )
    .option("--port <port>", "OmniRoute port (default: 20128)", "20128")
    .option("--remote <url>", "Remote OmniRoute URL (e.g. https://omni.paibao.ai)")
    .option("--token <token>", "Auth token (ANTHROPIC_AUTH_TOKEN)")
    .option("--api-key <key>", "Alias for --token")
    .option(
      "--models <ids>",
      "Fallback model chain, comma-separated (e.g. auto/best-coding,auto/best-chat,auto/fast)"
    )
    .option("--fallback <file>", "Path to fallback config JSON file")
    .option("--test <prompt>", "Non-interactive stream test mode")
    .option("--prompt <prompt>", "Alias for --test")
    .option("--check-updates", "Check dual-upstream versions and exit")
    .allowUnknownOption(true)
    .allowExcessArguments(true)
    .argument("[claudeArgs...]", "arguments passed through to the claude binary")
    .action(async (claudeArgs, opts) => {
      const merged = {
        ...opts,
        models: opts.models ? opts.models.split(",").map((s) => s.trim()) : undefined,
      };
      process.exitCode = await runFccClaude(merged, claudeArgs ?? []);
    });
}
