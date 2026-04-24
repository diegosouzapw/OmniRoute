import { AntigravityExecutor } from "./antigravity.ts";
import { GeminiCLIExecutor } from "./gemini-cli.ts";
import { GithubExecutor } from "./github.ts";
import { QoderExecutor } from "./qoder.ts";
import { KiroExecutor } from "./kiro.ts";
import { CodexExecutor } from "./codex.ts";
import { CursorExecutor } from "./cursor.ts";
import { DefaultExecutor } from "./default.ts";
import { PollinationsExecutor } from "./pollinations.ts";
import { CloudflareAIExecutor } from "./cloudflare-ai.ts";
import { OpencodeExecutor } from "./opencode.ts";
import { PuterExecutor } from "./puter.ts";
import { VertexExecutor } from "./vertex.ts";
import { CliproxyapiExecutor } from "./cliproxyapi.ts";
import { PerplexityWebExecutor } from "./perplexity-web.ts";
import { GrokWebExecutor } from "./grok-web.ts";
import { BlackboxWebExecutor } from "./blackbox-web.ts";
import { MuseSparkWebExecutor } from "./muse-spark-web.ts";
import { AzureOpenAIExecutor } from "./azure-openai.ts";
import { GitlabExecutor } from "./gitlab.ts";
import { NlpCloudExecutor } from "./nlpcloud.ts";
import { PetalsExecutor } from "./petals.ts";

const executors = {
  antigravity: new AntigravityExecutor(),
  "gemini-cli": new GeminiCLIExecutor(),
  github: new GithubExecutor(),
  qoder: new QoderExecutor(),
  kiro: new KiroExecutor(),
  "amazon-q": new KiroExecutor("amazon-q"),
  codex: new CodexExecutor(),
  cursor: new CursorExecutor(),
  cu: new CursorExecutor(), // Alias for cursor
  "azure-openai": new AzureOpenAIExecutor(),
  gitlab: new GitlabExecutor(),
  "gitlab-duo": new GitlabExecutor("gitlab-duo"),
  nlpcloud: new NlpCloudExecutor(),
  petals: new PetalsExecutor(),
  pollinations: new PollinationsExecutor(),
  pol: new PollinationsExecutor(), // Alias
  "cloudflare-ai": new CloudflareAIExecutor(),
  cf: new CloudflareAIExecutor(), // Alias
  "opencode-zen": new OpencodeExecutor("opencode-zen"),
  "opencode-go": new OpencodeExecutor("opencode-go"),
  puter: new PuterExecutor(),
  pu: new PuterExecutor(), // Alias
  vertex: new VertexExecutor(),
  "vertex-partner": new VertexExecutor(),
  cliproxyapi: new CliproxyapiExecutor(),
  cpa: new CliproxyapiExecutor(), // Alias
  "perplexity-web": new PerplexityWebExecutor(),
  "pplx-web": new PerplexityWebExecutor(), // Alias
  "grok-web": new GrokWebExecutor(),
  "blackbox-web": new BlackboxWebExecutor(),
  "bb-web": new BlackboxWebExecutor(), // Alias
  "muse-spark-web": new MuseSparkWebExecutor(),
  "ms-web": new MuseSparkWebExecutor(), // Alias
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
export { QoderExecutor } from "./qoder.ts";
export { KiroExecutor } from "./kiro.ts";
export { CodexExecutor } from "./codex.ts";
export { CursorExecutor } from "./cursor.ts";
export { DefaultExecutor } from "./default.ts";
export { PollinationsExecutor } from "./pollinations.ts";
export { CloudflareAIExecutor } from "./cloudflare-ai.ts";
export { OpencodeExecutor } from "./opencode.ts";
export { PuterExecutor } from "./puter.ts";
export { CliproxyapiExecutor } from "./cliproxyapi.ts";
export { VertexExecutor } from "./vertex.ts";
export { PerplexityWebExecutor } from "./perplexity-web.ts";
export { GrokWebExecutor } from "./grok-web.ts";
export { BlackboxWebExecutor } from "./blackbox-web.ts";
export { MuseSparkWebExecutor } from "./muse-spark-web.ts";
export { AzureOpenAIExecutor } from "./azure-openai.ts";
export { GitlabExecutor } from "./gitlab.ts";
export { NlpCloudExecutor } from "./nlpcloud.ts";
export { PetalsExecutor } from "./petals.ts";
