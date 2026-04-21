import { AntigravityExecutor } from "./antigravity.ts";
import { GeminiCLIExecutor } from "./gemini-cli.ts";
import { GithubExecutor } from "./github.ts";
import { QoderExecutor } from "./qoder.ts";
import { KiroExecutor } from "./kiro.ts";
import { CodexExecutor } from "./codex.ts";
import { CursorExecutor } from "./cursor.ts";
import { DefaultExecutor } from "./default.ts";
import { CloudflareAIExecutor } from "./cloudflare-ai.ts";
import { OpencodeExecutor } from "./opencode.ts";
import { VertexExecutor } from "./vertex.ts";
import { CliproxyapiExecutor } from "./cliproxyapi.ts";
import { PerplexityWebExecutor } from "./perplexity-web.ts";
import { GrokWebExecutor } from "./grok-web.ts";
import { PollinationsExecutor } from "./pollinations.ts";
import { PuterExecutor } from "./puter.ts";
import { GitLabExecutor } from "./gitlab.ts";
import { AzureAIExecutor } from "./azure-ai.ts";
import { AzureOpenAIExecutor } from "./azure-openai.ts";
import { BedrockExecutor } from "./bedrock.ts";
import { SagemakerExecutor } from "./sagemaker.ts";
import { DataRobotExecutor } from "./datarobot.ts";
import { WatsonxExecutor } from "./watsonx.ts";
import { OciExecutor } from "./oci.ts";
import { SapExecutor } from "./sap.ts";
import { CodeBuddyExecutor } from "./codebuddy.ts";
import { ReplicateExecutor } from "./replicate.ts";
import { NousResearchExecutor } from "./nous-research.ts";
import { AmpExecutor } from "./amp.ts";
import { ZedExecutor } from "./zed.ts";
import { TraeExecutor } from "./trae.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";

const executors = {
  antigravity: new AntigravityExecutor(),
  "gemini-cli": new GeminiCLIExecutor(),
  github: new GithubExecutor(),
  qoder: new QoderExecutor(),
  kiro: new KiroExecutor(),
  codex: new CodexExecutor(),
  cursor: new CursorExecutor(),
  cu: new CursorExecutor(), // Alias for cursor
  "cloudflare-ai": new CloudflareAIExecutor(),
  cf: new CloudflareAIExecutor(), // Alias
  "opencode-zen": new OpencodeExecutor("opencode-zen"),
  "opencode-go": new OpencodeExecutor("opencode-go"),
  vertex: new VertexExecutor(),
  cliproxyapi: new CliproxyapiExecutor(),
  cpa: new CliproxyapiExecutor(), // Alias
  "perplexity-web": new PerplexityWebExecutor(),
  "pplx-web": new PerplexityWebExecutor(), // Alias
  "grok-web": new GrokWebExecutor(),
  pollinations: new PollinationsExecutor(),
  puter: new PuterExecutor(),
  "gitlab-duo": new GitLabExecutor("gitlab-duo"),
  "gitlab-duo-oauth": new GitLabExecutor("gitlab-duo-oauth"),
  "azure-ai": new AzureAIExecutor("azure-ai"),
  "azure-openai": new AzureOpenAIExecutor("azure-openai"),
  bedrock: new BedrockExecutor("bedrock"),
  sagemaker: new SagemakerExecutor("sagemaker"),
  datarobot: new DataRobotExecutor("datarobot"),
  watsonx: new WatsonxExecutor("watsonx"),
  oci: new OciExecutor("oci"),
  sap: new SapExecutor("sap"),
  codebuddy: new CodeBuddyExecutor("codebuddy"),
  replicate: new ReplicateExecutor("replicate"),
  "nous-research": new NousResearchExecutor("nous-research"),
  amp: new AmpExecutor("amp"),
  zed: new ZedExecutor("zed"),
  trae: new TraeExecutor("trae"),
};

const executorFactories = {
  antigravity: (provider) => executors.antigravity,
  "gemini-cli": (provider) => executors["gemini-cli"],
  github: (provider) => executors.github,
  qoder: (provider) => executors.qoder,
  kiro: (provider) => new KiroExecutor(provider),
  codex: (provider) => executors.codex,
  cursor: (provider) => executors.cursor,
  "cloudflare-ai": (provider) => executors["cloudflare-ai"],
  opencode: (provider) => new OpencodeExecutor(provider),
  vertex: (provider) => executors.vertex,
  cliproxyapi: (provider) => executors.cliproxyapi,
  "perplexity-web": (provider) => executors["perplexity-web"],
  "grok-web": (provider) => executors["grok-web"],
  pollinations: (provider) => executors.pollinations,
  puter: (provider) => executors.puter,
  gitlab: (provider) => new GitLabExecutor(provider),
  "azure-ai": (provider) => new AzureAIExecutor(provider),
  "azure-openai": (provider) => new AzureOpenAIExecutor(provider),
  bedrock: (provider) => new BedrockExecutor(provider),
  sagemaker: (provider) => new SagemakerExecutor(provider),
  datarobot: (provider) => new DataRobotExecutor(provider),
  watsonx: (provider) => new WatsonxExecutor(provider),
  oci: (provider) => new OciExecutor(provider),
  sap: (provider) => new SapExecutor(provider),
  codebuddy: (provider) => new CodeBuddyExecutor(provider),
  replicate: (provider) => new ReplicateExecutor(provider),
  "nous-research": (provider) => new NousResearchExecutor(provider),
  amp: (provider) => new AmpExecutor(provider),
  zed: (provider) => new ZedExecutor(provider),
  trae: (provider) => new TraeExecutor(provider),
};

const defaultCache = new Map();
const specializedCache = new Map();

function getExecutorAlias(provider) {
  const entry = getRegistryEntry(provider);
  const executor = entry?.executor;
  if (executor && executorFactories[executor]) {
    return executor;
  }
  if (executors[provider]) {
    return provider;
  }
  return null;
}

export function getExecutor(provider) {
  const executorAlias = getExecutorAlias(provider);
  if (executorAlias) {
    const cacheKey = `${executorAlias}:${provider}`;
    if (!specializedCache.has(cacheKey)) {
      specializedCache.set(cacheKey, executorFactories[executorAlias](provider));
    }
    return specializedCache.get(cacheKey);
  }
  if (!defaultCache.has(provider)) defaultCache.set(provider, new DefaultExecutor(provider));
  return defaultCache.get(provider);
}

export function hasSpecializedExecutor(provider) {
  return !!getExecutorAlias(provider);
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
export { CloudflareAIExecutor } from "./cloudflare-ai.ts";
export { OpencodeExecutor } from "./opencode.ts";
export { CliproxyapiExecutor } from "./cliproxyapi.ts";
export { VertexExecutor } from "./vertex.ts";
export { PerplexityWebExecutor } from "./perplexity-web.ts";
export { GrokWebExecutor } from "./grok-web.ts";
export { PollinationsExecutor } from "./pollinations.ts";
export { PuterExecutor } from "./puter.ts";
export { GitLabExecutor } from "./gitlab.ts";
export { AzureAIExecutor } from "./azure-ai.ts";
export { AzureOpenAIExecutor } from "./azure-openai.ts";
export { BedrockExecutor } from "./bedrock.ts";
export { SagemakerExecutor } from "./sagemaker.ts";
export { DataRobotExecutor } from "./datarobot.ts";
export { WatsonxExecutor } from "./watsonx.ts";
export { OciExecutor } from "./oci.ts";
export { SapExecutor } from "./sap.ts";
export { CodeBuddyExecutor } from "./codebuddy.ts";
export { ReplicateExecutor } from "./replicate.ts";
export { NousResearchExecutor } from "./nous-research.ts";
export { AmpExecutor } from "./amp.ts";
export { ZedExecutor } from "./zed.ts";
export { TraeExecutor } from "./trae.ts";
