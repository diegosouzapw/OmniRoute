import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

export function smokeModel(target) {
  return target === "aider" ? "gpt-4o-mini" : `smoke/${target}`;
}

export function classifySmokeResult(execution, requests, marker, target) {
  if (execution.code === 127) return "HOLD-missing-binary";
  if (execution.timedOut) return "HOLD-timeout";
  if (execution.code !== 0 || !execution.stdout.includes(marker)) return "FAIL";
  const expectedPath = target === "codex" ? "/v1/responses" : "/v1/chat/completions";
  const valid =
    requests.length > 0 &&
    requests.every(
      (receipt) =>
        receipt.method === "POST" &&
        receipt.path === expectedPath &&
        receipt.model === smokeModel(target) &&
        receipt.statusCode === 200 &&
        receipt.responseFinished === true &&
        receipt.authenticated === true
    );
  return valid ? "PASS" : "FAIL";
}

/** Deliberately exclude provider credentials, proxies, loader hooks, and user configuration. */
export function buildSmokeEnvironment(temporary, token, binDir = "", inherited = process.env) {
  const env = {};
  for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "LANG", "LC_ALL"]) {
    if (inherited[key]) env[key] = inherited[key];
  }
  if (binDir) env.PATH = `${binDir}${path.delimiter}${env.PATH || ""}`;
  const locations = {
    HOME: "home",
    USERPROFILE: "home",
    XDG_CONFIG_HOME: "config",
    XDG_DATA_HOME: "data",
    XDG_CACHE_HOME: "cache",
    XDG_STATE_HOME: "state",
    CODEX_HOME: "codex",
    GEMINI_CLI_HOME: "gemini",
    QWEN_HOME: "qwen",
    DATA_DIR: "omniroute",
    TMPDIR: "tmp",
  };
  for (const [key, suffix] of Object.entries(locations)) {
    env[key] = path.join(temporary, suffix);
    mkdirSync(env[key], { recursive: true, mode: 0o700 });
  }
  return {
    ...env,
    TEMP: env.TMPDIR,
    TMP: env.TMPDIR,
    OMNIROUTE_SMOKE_KEY: token,
    OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED: "1",
    OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV: "1",
    OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
    OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    STORAGE_ENCRYPTION_KEY: "omniroute-smoke-storage-sentinel-not-a-real-key",
    OPENCODE_DISABLE_AUTOUPDATE: "true",
    OPENCODE_DISABLE_SHARE: "true",
    OPENCODE_DISABLE_MODELS_FETCH: "true",
    LITELLM_LOCAL_MODEL_COST_MAP: "True",
    PYTHONUNBUFFERED: "1",
    NO_COLOR: "1",
    DO_NOT_TRACK: "1",
  };
}

function signalProcess(child, signal, processGroup) {
  try {
    if (processGroup && child.pid) process.kill(-child.pid, signal);
    else child.kill(signal);
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
}

/** A dedicated POSIX process group lets cancellation include CLI helper processes. */
export function runProcess(args, { env, cwd, timeoutMs = 180_000, killGraceMs = 1_000 } = {}) {
  return new Promise((resolve) => {
    const processGroup = process.platform !== "win32";
    const child = spawn(process.execPath, args, {
      cwd,
      env,
      detached: processGroup,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let terminationSignal = null;
    let settled = false;
    let escalationTimer;
    let drainTimer;
    const append = (current, chunk) => `${current}${chunk}`.slice(-256 * 1024);
    child.stdout.on("data", (chunk) => {
      stdout = append(stdout, chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr = append(stderr, chunk);
    });
    const timer = setTimeout(() => {
      timedOut = true;
      terminationSignal = "SIGTERM";
      signalProcess(child, "SIGTERM", processGroup);
      escalationTimer = setTimeout(() => {
        terminationSignal = "SIGKILL";
        signalProcess(child, "SIGKILL", processGroup);
      }, killGraceMs);
    }, timeoutMs);
    const finish = (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      clearTimeout(escalationTimer);
      clearTimeout(drainTimer);
      // A helper may inherit pipes but outlive its parent. It belongs only to
      // this dedicated group and must not survive harness teardown.
      if (processGroup) signalProcess(child, "SIGKILL", true);
      child.stdout.destroy();
      child.stderr.destroy();
      resolve({ code, stdout, stderr, timedOut, terminationSignal, processGroup });
    };
    child.once("error", (error) => {
      stderr = append(stderr, `Process could not start (${error.code || "unknown"})`);
      finish(error.code === "ENOENT" ? 127 : 1);
    });
    child.once("exit", (code, signal) => {
      drainTimer = setTimeout(() => finish(code ?? (signal ? 1 : 0)), 250);
    });
    child.once("close", (code, signal) => finish(code ?? (signal ? 1 : 0)));
  });
}
