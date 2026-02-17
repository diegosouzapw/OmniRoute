import { AntigravityExecutor } from "./antigravity.ts";
import { GeminiCLIExecutor } from "./gemini-cli.ts";
import { GithubExecutor } from "./github.ts";
import { KiroExecutor } from "./kiro.ts";
import { CodexExecutor } from "./codex.ts";
import { CursorExecutor } from "./cursor.ts";
import { DefaultExecutor } from "./default.ts";

const executors = {
  antigravity: new AntigravityExecutor(),
  "gemini-cli": new GeminiCLIExecutor(),
  github: new GithubExecutor(),
  kiro: new KiroExecutor(),
  codex: new CodexExecutor(),
  cursor: new CursorExecutor(),
  cu: new CursorExecutor(), // Alias for cursor
};

const defaultCache = new Map();

export function getExecutor(provider) {
  if (executors[provider]) return executors[provider];
  if (!defaultCache.has(provider)) defaultCache.set(provider, new DefaultExecutor(provider));
  return defaultCache.get(provider);
}

export function hasSpecializedExecutor(provider) {
  return !!executors[provider];
}

export { BaseExecutor } from "./base.ts";
export { AntigravityExecutor } from "./antigravity.ts";
export { GeminiCLIExecutor } from "./gemini-cli.ts";
export { GithubExecutor } from "./github.ts";
export { KiroExecutor } from "./kiro.ts";
export { CodexExecutor } from "./codex.ts";
export { CursorExecutor } from "./cursor.ts";
export { DefaultExecutor } from "./default.ts";
