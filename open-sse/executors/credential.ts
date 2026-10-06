import { assertCommonChatGptWebProviderAvailable } from "@/shared/constants/chatgptWebRetirement";
import { assertMicrosoftDesignerWebProviderAvailable } from "@/shared/constants/designerWebRetirement";
import { assertRuntimeProviderAvailable } from "@/shared/constants/providerRetirement";
import type { BaseExecutor } from "./base.ts";
import { getDefaultExecutor } from "./defaultResolver.ts";

type CredentialExecutorLoader = () => Promise<BaseExecutor>;

const specializedCredentialExecutors: Record<string, CredentialExecutorLoader> = {
  antigravity: () => import("./antigravity.ts").then((m) => new m.AntigravityExecutor()),
  agy: () => import("./antigravity.ts").then((m) => new m.AntigravityExecutor()),
  github: () => import("./github.ts").then((m) => new m.GithubExecutor()),
  "ghe-copilot": () => import("./ghe-copilot.ts").then((m) => new m.GheCopilotExecutor()),
  kiro: () => import("./kiro.ts").then((m) => new m.KiroExecutor()),
  "amazon-q": () => import("./kiro.ts").then((m) => new m.KiroExecutor("amazon-q")),
  codex: () => import("./codex.ts").then((m) => new m.CodexExecutor()),
  cursor: () => import("./cursor.ts").then((m) => new m.CursorExecutor()),
  cu: () => import("./cursor.ts").then((m) => new m.CursorExecutor()),
  "cursor-api": () => import("./cursor.ts").then((m) => new m.CursorExecutor("cursor-api")),
  cua: () => import("./cursor.ts").then((m) => new m.CursorExecutor("cursor-api")),
  trae: () => import("./trae.ts").then((m) => new m.TraeExecutor()),
  gitlab: () => import("./gitlab.ts").then((m) => new m.GitlabExecutor()),
  "gitlab-duo": () => import("./gitlab.ts").then((m) => new m.GitlabExecutor("gitlab-duo")),
  "zed-hosted": () => import("./zed-hosted.ts").then((m) => new m.ZedHostedExecutor()),
  "grok-cli": () => import("./grok-cli.ts").then((m) => new m.GrokCliExecutor()),
  gc: () => import("./grok-cli.ts").then((m) => new m.GrokCliExecutor()),
  auggie: () => import("./auggie.ts").then((m) => new m.AuggieExecutor()),
  xai: () => import("./xai.ts").then((m) => new m.XaiExecutor()),
  "xai-oauth": () => import("./xai.ts").then((m) => new m.XaiExecutor("xai-oauth")),
  xao: () => import("./xai.ts").then((m) => new m.XaiExecutor("xai-oauth")),
};

const credentialExecutorCache = new Map<string, Promise<BaseExecutor>>();

/** Resolve only executors with credential-refresh behavior, without loading the chat registry. */
export async function getCredentialRefreshExecutor(provider: string): Promise<BaseExecutor> {
  assertMicrosoftDesignerWebProviderAvailable(provider);
  assertRuntimeProviderAvailable(provider);
  assertCommonChatGptWebProviderAvailable(provider);

  let executor = credentialExecutorCache.get(provider);
  if (!executor) {
    const specializedLoader = specializedCredentialExecutors[provider];
    executor = specializedLoader
      ? specializedLoader()
      : Promise.resolve(getDefaultExecutor(provider));
    executor = executor.catch((error) => {
      credentialExecutorCache.delete(provider);
      throw error;
    });
    credentialExecutorCache.set(provider, executor);
  }
  return executor;
}
