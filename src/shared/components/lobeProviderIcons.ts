import type { CSSProperties, ElementType } from "react";

import Ai21MonoIcon from "@lobehub/icons/es/Ai21/components/Mono";
import AlibabaColorIcon from "@lobehub/icons/es/Alibaba/components/Color";
import AlibabaMonoIcon from "@lobehub/icons/es/Alibaba/components/Mono";
import AnthropicMonoIcon from "@lobehub/icons/es/Anthropic/components/Mono";
import AntigravityColorIcon from "@lobehub/icons/es/Antigravity/components/Color";
import AntigravityMonoIcon from "@lobehub/icons/es/Antigravity/components/Mono";
import AssemblyAIColorIcon from "@lobehub/icons/es/AssemblyAI/components/Color";
import AssemblyAIMonoIcon from "@lobehub/icons/es/AssemblyAI/components/Mono";
import AutomaticColorIcon from "@lobehub/icons/es/Automatic/components/Color";
import AutomaticMonoIcon from "@lobehub/icons/es/Automatic/components/Mono";
import AwsColorIcon from "@lobehub/icons/es/Aws/components/Color";
import AwsMonoIcon from "@lobehub/icons/es/Aws/components/Mono";
import AzureColorIcon from "@lobehub/icons/es/Azure/components/Color";
import AzureMonoIcon from "@lobehub/icons/es/Azure/components/Mono";
import AzureAIColorIcon from "@lobehub/icons/es/AzureAI/components/Color";
import AzureAIMonoIcon from "@lobehub/icons/es/AzureAI/components/Mono";
import BaiduColorIcon from "@lobehub/icons/es/Baidu/components/Color";
import BaiduMonoIcon from "@lobehub/icons/es/Baidu/components/Mono";
import BailianColorIcon from "@lobehub/icons/es/Bailian/components/Color";
import BailianMonoIcon from "@lobehub/icons/es/Bailian/components/Mono";
import BasetenMonoIcon from "@lobehub/icons/es/Baseten/components/Mono";
import BedrockColorIcon from "@lobehub/icons/es/Bedrock/components/Color";
import BedrockMonoIcon from "@lobehub/icons/es/Bedrock/components/Mono";
import BflMonoIcon from "@lobehub/icons/es/Bfl/components/Mono";
import CerebrasColorIcon from "@lobehub/icons/es/Cerebras/components/Color";
import CerebrasMonoIcon from "@lobehub/icons/es/Cerebras/components/Mono";
import ClaudeCodeColorIcon from "@lobehub/icons/es/ClaudeCode/components/Color";
import ClaudeCodeMonoIcon from "@lobehub/icons/es/ClaudeCode/components/Mono";
import ClineMonoIcon from "@lobehub/icons/es/Cline/components/Mono";
import CloudflareColorIcon from "@lobehub/icons/es/Cloudflare/components/Color";
import CloudflareMonoIcon from "@lobehub/icons/es/Cloudflare/components/Mono";
import CodexColorIcon from "@lobehub/icons/es/Codex/components/Color";
import CodexMonoIcon from "@lobehub/icons/es/Codex/components/Mono";
import CohereColorIcon from "@lobehub/icons/es/Cohere/components/Color";
import CohereMonoIcon from "@lobehub/icons/es/Cohere/components/Mono";
import ComfyUIColorIcon from "@lobehub/icons/es/ComfyUI/components/Color";
import ComfyUIMonoIcon from "@lobehub/icons/es/ComfyUI/components/Mono";
import CursorMonoIcon from "@lobehub/icons/es/Cursor/components/Mono";
import DbrxColorIcon from "@lobehub/icons/es/Dbrx/components/Color";
import DbrxMonoIcon from "@lobehub/icons/es/Dbrx/components/Mono";
import DeepInfraColorIcon from "@lobehub/icons/es/DeepInfra/components/Color";
import DeepInfraMonoIcon from "@lobehub/icons/es/DeepInfra/components/Mono";
import DeepSeekColorIcon from "@lobehub/icons/es/DeepSeek/components/Color";
import DeepSeekMonoIcon from "@lobehub/icons/es/DeepSeek/components/Mono";
import ElevenLabsMonoIcon from "@lobehub/icons/es/ElevenLabs/components/Mono";
import ExaColorIcon from "@lobehub/icons/es/Exa/components/Color";
import ExaMonoIcon from "@lobehub/icons/es/Exa/components/Mono";
import FalColorIcon from "@lobehub/icons/es/Fal/components/Color";
import FalMonoIcon from "@lobehub/icons/es/Fal/components/Mono";
import FeatherlessColorIcon from "@lobehub/icons/es/Featherless/components/Color";
import FeatherlessMonoIcon from "@lobehub/icons/es/Featherless/components/Mono";
import FireworksColorIcon from "@lobehub/icons/es/Fireworks/components/Color";
import FireworksMonoIcon from "@lobehub/icons/es/Fireworks/components/Mono";
import FriendliMonoIcon from "@lobehub/icons/es/Friendli/components/Mono";
import GeminiColorIcon from "@lobehub/icons/es/Gemini/components/Color";
import GeminiMonoIcon from "@lobehub/icons/es/Gemini/components/Mono";
import GeminiCLIColorIcon from "@lobehub/icons/es/GeminiCLI/components/Color";
import GeminiCLIMonoIcon from "@lobehub/icons/es/GeminiCLI/components/Mono";
import GithubCopilotMonoIcon from "@lobehub/icons/es/GithubCopilot/components/Mono";
import GoogleColorIcon from "@lobehub/icons/es/Google/components/Color";
import GoogleMonoIcon from "@lobehub/icons/es/Google/components/Mono";
import GrokMonoIcon from "@lobehub/icons/es/Grok/components/Mono";
import GroqMonoIcon from "@lobehub/icons/es/Groq/components/Mono";
import HuggingFaceColorIcon from "@lobehub/icons/es/HuggingFace/components/Color";
import HuggingFaceMonoIcon from "@lobehub/icons/es/HuggingFace/components/Mono";
import HyperbolicColorIcon from "@lobehub/icons/es/Hyperbolic/components/Color";
import HyperbolicMonoIcon from "@lobehub/icons/es/Hyperbolic/components/Mono";
import IBMMonoIcon from "@lobehub/icons/es/IBM/components/Mono";
import InferenceMonoIcon from "@lobehub/icons/es/Inference/components/Mono";
import JinaMonoIcon from "@lobehub/icons/es/Jina/components/Mono";
import KiloCodeMonoIcon from "@lobehub/icons/es/KiloCode/components/Mono";
import KimiColorIcon from "@lobehub/icons/es/Kimi/components/Color";
import KimiMonoIcon from "@lobehub/icons/es/Kimi/components/Mono";
import LambdaMonoIcon from "@lobehub/icons/es/Lambda/components/Mono";
import LmStudioMonoIcon from "@lobehub/icons/es/LmStudio/components/Mono";
import MetaColorIcon from "@lobehub/icons/es/Meta/components/Color";
import MetaMonoIcon from "@lobehub/icons/es/Meta/components/Mono";
import MetaAIColorIcon from "@lobehub/icons/es/MetaAI/components/Color";
import MetaAIMonoIcon from "@lobehub/icons/es/MetaAI/components/Mono";
import MinimaxColorIcon from "@lobehub/icons/es/Minimax/components/Color";
import MinimaxMonoIcon from "@lobehub/icons/es/Minimax/components/Mono";
import MistralColorIcon from "@lobehub/icons/es/Mistral/components/Color";
import MistralMonoIcon from "@lobehub/icons/es/Mistral/components/Mono";
import MoonshotMonoIcon from "@lobehub/icons/es/Moonshot/components/Mono";
import MorphColorIcon from "@lobehub/icons/es/Morph/components/Color";
import MorphMonoIcon from "@lobehub/icons/es/Morph/components/Mono";
import NanoBananaColorIcon from "@lobehub/icons/es/NanoBanana/components/Color";
import NanoBananaMonoIcon from "@lobehub/icons/es/NanoBanana/components/Mono";
import NebiusMonoIcon from "@lobehub/icons/es/Nebius/components/Mono";
import NousResearchMonoIcon from "@lobehub/icons/es/NousResearch/components/Mono";
import NovitaColorIcon from "@lobehub/icons/es/Novita/components/Color";
import NovitaMonoIcon from "@lobehub/icons/es/Novita/components/Mono";
import NvidiaColorIcon from "@lobehub/icons/es/Nvidia/components/Color";
import NvidiaMonoIcon from "@lobehub/icons/es/Nvidia/components/Mono";
import OllamaMonoIcon from "@lobehub/icons/es/Ollama/components/Mono";
import OpenAIMonoIcon from "@lobehub/icons/es/OpenAI/components/Mono";
import OpenClawColorIcon from "@lobehub/icons/es/OpenClaw/components/Color";
import OpenClawMonoIcon from "@lobehub/icons/es/OpenClaw/components/Mono";
import OpenCodeMonoIcon from "@lobehub/icons/es/OpenCode/components/Mono";
import OpenRouterMonoIcon from "@lobehub/icons/es/OpenRouter/components/Mono";
import PerplexityColorIcon from "@lobehub/icons/es/Perplexity/components/Color";
import PerplexityMonoIcon from "@lobehub/icons/es/Perplexity/components/Mono";
import PoeColorIcon from "@lobehub/icons/es/Poe/components/Color";
import PoeMonoIcon from "@lobehub/icons/es/Poe/components/Mono";
import QoderColorIcon from "@lobehub/icons/es/Qoder/components/Color";
import QoderMonoIcon from "@lobehub/icons/es/Qoder/components/Mono";
import QwenColorIcon from "@lobehub/icons/es/Qwen/components/Color";
import QwenMonoIcon from "@lobehub/icons/es/Qwen/components/Mono";
import RecraftMonoIcon from "@lobehub/icons/es/Recraft/components/Mono";
import ReplicateMonoIcon from "@lobehub/icons/es/Replicate/components/Mono";
import RunwayMonoIcon from "@lobehub/icons/es/Runway/components/Mono";
import SambaNovaColorIcon from "@lobehub/icons/es/SambaNova/components/Color";
import SambaNovaMonoIcon from "@lobehub/icons/es/SambaNova/components/Mono";
import SearchApiMonoIcon from "@lobehub/icons/es/SearchApi/components/Mono";
import SiliconCloudColorIcon from "@lobehub/icons/es/SiliconCloud/components/Color";
import SiliconCloudMonoIcon from "@lobehub/icons/es/SiliconCloud/components/Mono";
import SnowflakeColorIcon from "@lobehub/icons/es/Snowflake/components/Color";
import SnowflakeMonoIcon from "@lobehub/icons/es/Snowflake/components/Mono";
import StabilityColorIcon from "@lobehub/icons/es/Stability/components/Color";
import StabilityMonoIcon from "@lobehub/icons/es/Stability/components/Mono";
import TavilyColorIcon from "@lobehub/icons/es/Tavily/components/Color";
import TavilyMonoIcon from "@lobehub/icons/es/Tavily/components/Mono";
import TogetherColorIcon from "@lobehub/icons/es/Together/components/Color";
import TogetherMonoIcon from "@lobehub/icons/es/Together/components/Mono";
import TopazLabsMonoIcon from "@lobehub/icons/es/TopazLabs/components/Mono";
import UpstageColorIcon from "@lobehub/icons/es/Upstage/components/Color";
import UpstageMonoIcon from "@lobehub/icons/es/Upstage/components/Mono";
import V0MonoIcon from "@lobehub/icons/es/V0/components/Mono";
import VeniceColorIcon from "@lobehub/icons/es/Venice/components/Color";
import VeniceMonoIcon from "@lobehub/icons/es/Venice/components/Mono";
import VercelMonoIcon from "@lobehub/icons/es/Vercel/components/Mono";
import VertexAIColorIcon from "@lobehub/icons/es/VertexAI/components/Color";
import VertexAIMonoIcon from "@lobehub/icons/es/VertexAI/components/Mono";
import VllmColorIcon from "@lobehub/icons/es/Vllm/components/Color";
import VllmMonoIcon from "@lobehub/icons/es/Vllm/components/Mono";
import VolcengineColorIcon from "@lobehub/icons/es/Volcengine/components/Color";
import VolcengineMonoIcon from "@lobehub/icons/es/Volcengine/components/Mono";
import VoyageColorIcon from "@lobehub/icons/es/Voyage/components/Color";
import VoyageMonoIcon from "@lobehub/icons/es/Voyage/components/Mono";
import WorkersAIColorIcon from "@lobehub/icons/es/WorkersAI/components/Color";
import WorkersAIMonoIcon from "@lobehub/icons/es/WorkersAI/components/Mono";
import XAIMonoIcon from "@lobehub/icons/es/XAI/components/Mono";
import XiaomiMiMoMonoIcon from "@lobehub/icons/es/XiaomiMiMo/components/Mono";
import XinferenceColorIcon from "@lobehub/icons/es/Xinference/components/Color";
import XinferenceMonoIcon from "@lobehub/icons/es/Xinference/components/Mono";
import ZAIMonoIcon from "@lobehub/icons/es/ZAI/components/Mono";
import ZhipuColorIcon from "@lobehub/icons/es/Zhipu/components/Color";
import ZhipuMonoIcon from "@lobehub/icons/es/Zhipu/components/Mono";

type LobeIconComponent = ElementType<{
  "aria-label"?: string;
  className?: string;
  size?: number | string;
  style?: CSSProperties;
}>;

type LobeIconEntry = {
  color?: LobeIconComponent;
  mono: LobeIconComponent;
};

const LOBE_ICON_COMPONENTS = {
  Ai21: { mono: Ai21MonoIcon },
  Alibaba: { mono: AlibabaMonoIcon, color: AlibabaColorIcon },
  Anthropic: { mono: AnthropicMonoIcon },
  Antigravity: { mono: AntigravityMonoIcon, color: AntigravityColorIcon },
  AssemblyAI: { mono: AssemblyAIMonoIcon, color: AssemblyAIColorIcon },
  Automatic: { mono: AutomaticMonoIcon, color: AutomaticColorIcon },
  Aws: { mono: AwsMonoIcon, color: AwsColorIcon },
  Azure: { mono: AzureMonoIcon, color: AzureColorIcon },
  AzureAI: { mono: AzureAIMonoIcon, color: AzureAIColorIcon },
  Baidu: { mono: BaiduMonoIcon, color: BaiduColorIcon },
  Bailian: { mono: BailianMonoIcon, color: BailianColorIcon },
  Baseten: { mono: BasetenMonoIcon },
  Bedrock: { mono: BedrockMonoIcon, color: BedrockColorIcon },
  Bfl: { mono: BflMonoIcon },
  Cerebras: { mono: CerebrasMonoIcon, color: CerebrasColorIcon },
  ClaudeCode: { mono: ClaudeCodeMonoIcon, color: ClaudeCodeColorIcon },
  Cline: { mono: ClineMonoIcon },
  Cloudflare: { mono: CloudflareMonoIcon, color: CloudflareColorIcon },
  Codex: { mono: CodexMonoIcon, color: CodexColorIcon },
  Cohere: { mono: CohereMonoIcon, color: CohereColorIcon },
  ComfyUI: { mono: ComfyUIMonoIcon, color: ComfyUIColorIcon },
  Cursor: { mono: CursorMonoIcon },
  Dbrx: { mono: DbrxMonoIcon, color: DbrxColorIcon },
  DeepInfra: { mono: DeepInfraMonoIcon, color: DeepInfraColorIcon },
  DeepSeek: { mono: DeepSeekMonoIcon, color: DeepSeekColorIcon },
  ElevenLabs: { mono: ElevenLabsMonoIcon },
  Exa: { mono: ExaMonoIcon, color: ExaColorIcon },
  Fal: { mono: FalMonoIcon, color: FalColorIcon },
  Featherless: { mono: FeatherlessMonoIcon, color: FeatherlessColorIcon },
  Fireworks: { mono: FireworksMonoIcon, color: FireworksColorIcon },
  Friendli: { mono: FriendliMonoIcon },
  Gemini: { mono: GeminiMonoIcon, color: GeminiColorIcon },
  GeminiCLI: { mono: GeminiCLIMonoIcon, color: GeminiCLIColorIcon },
  GithubCopilot: { mono: GithubCopilotMonoIcon },
  Google: { mono: GoogleMonoIcon, color: GoogleColorIcon },
  Grok: { mono: GrokMonoIcon },
  Groq: { mono: GroqMonoIcon },
  HuggingFace: { mono: HuggingFaceMonoIcon, color: HuggingFaceColorIcon },
  Hyperbolic: { mono: HyperbolicMonoIcon, color: HyperbolicColorIcon },
  IBM: { mono: IBMMonoIcon },
  Inference: { mono: InferenceMonoIcon },
  Jina: { mono: JinaMonoIcon },
  KiloCode: { mono: KiloCodeMonoIcon },
  Kimi: { mono: KimiMonoIcon, color: KimiColorIcon },
  Lambda: { mono: LambdaMonoIcon },
  LmStudio: { mono: LmStudioMonoIcon },
  Meta: { mono: MetaMonoIcon, color: MetaColorIcon },
  MetaAI: { mono: MetaAIMonoIcon, color: MetaAIColorIcon },
  Minimax: { mono: MinimaxMonoIcon, color: MinimaxColorIcon },
  Mistral: { mono: MistralMonoIcon, color: MistralColorIcon },
  Moonshot: { mono: MoonshotMonoIcon },
  Morph: { mono: MorphMonoIcon, color: MorphColorIcon },
  NanoBanana: { mono: NanoBananaMonoIcon, color: NanoBananaColorIcon },
  Nebius: { mono: NebiusMonoIcon },
  NousResearch: { mono: NousResearchMonoIcon },
  Novita: { mono: NovitaMonoIcon, color: NovitaColorIcon },
  Nvidia: { mono: NvidiaMonoIcon, color: NvidiaColorIcon },
  Ollama: { mono: OllamaMonoIcon },
  OpenAI: { mono: OpenAIMonoIcon },
  OpenClaw: { mono: OpenClawMonoIcon, color: OpenClawColorIcon },
  OpenCode: { mono: OpenCodeMonoIcon },
  OpenRouter: { mono: OpenRouterMonoIcon },
  Perplexity: { mono: PerplexityMonoIcon, color: PerplexityColorIcon },
  Poe: { mono: PoeMonoIcon, color: PoeColorIcon },
  Qoder: { mono: QoderMonoIcon, color: QoderColorIcon },
  Qwen: { mono: QwenMonoIcon, color: QwenColorIcon },
  Recraft: { mono: RecraftMonoIcon },
  Replicate: { mono: ReplicateMonoIcon },
  Runway: { mono: RunwayMonoIcon },
  SambaNova: { mono: SambaNovaMonoIcon, color: SambaNovaColorIcon },
  SearchApi: { mono: SearchApiMonoIcon },
  SiliconCloud: { mono: SiliconCloudMonoIcon, color: SiliconCloudColorIcon },
  Snowflake: { mono: SnowflakeMonoIcon, color: SnowflakeColorIcon },
  Stability: { mono: StabilityMonoIcon, color: StabilityColorIcon },
  Tavily: { mono: TavilyMonoIcon, color: TavilyColorIcon },
  Together: { mono: TogetherMonoIcon, color: TogetherColorIcon },
  TopazLabs: { mono: TopazLabsMonoIcon },
  Upstage: { mono: UpstageMonoIcon, color: UpstageColorIcon },
  V0: { mono: V0MonoIcon },
  Venice: { mono: VeniceMonoIcon, color: VeniceColorIcon },
  Vercel: { mono: VercelMonoIcon },
  VertexAI: { mono: VertexAIMonoIcon, color: VertexAIColorIcon },
  Vllm: { mono: VllmMonoIcon, color: VllmColorIcon },
  Volcengine: { mono: VolcengineMonoIcon, color: VolcengineColorIcon },
  Voyage: { mono: VoyageMonoIcon, color: VoyageColorIcon },
  WorkersAI: { mono: WorkersAIMonoIcon, color: WorkersAIColorIcon },
  XAI: { mono: XAIMonoIcon },
  XiaomiMiMo: { mono: XiaomiMiMoMonoIcon },
  Xinference: { mono: XinferenceMonoIcon, color: XinferenceColorIcon },
  ZAI: { mono: ZAIMonoIcon },
  Zhipu: { mono: ZhipuMonoIcon, color: ZhipuColorIcon },
} satisfies Record<string, LobeIconEntry>;

const LOBE_PROVIDER_ALIASES = {
  ai21: "Ai21",
  alibaba: "Alibaba",
  alicode: "Alibaba",
  "alicode-intl": "Alibaba",
  "amazon-q": "Aws",
  anthropic: "Anthropic",
  antigravity: "Antigravity",
  assemblyai: "AssemblyAI",
  "aws-polly": "Aws",
  azure: "Azure",
  "azure-ai": "AzureAI",
  "azure-openai": "AzureAI",
  baidu: "Baidu",
  "bailian-coding-plan": "Bailian",
  baseten: "Baseten",
  bedrock: "Bedrock",
  bfl: "Bfl",
  "black-forest-labs": "Bfl",
  cerebras: "Cerebras",
  claude: "ClaudeCode",
  cline: "Cline",
  cloudflare: "Cloudflare",
  "cloudflare-ai": "WorkersAI",
  codestral: "Mistral",
  codex: "Codex",
  cohere: "Cohere",
  comfyui: "ComfyUI",
  copilot: "GithubCopilot",
  cursor: "Cursor",
  databricks: "Dbrx",
  deepinfra: "DeepInfra",
  deepseek: "DeepSeek",
  elevenlabs: "ElevenLabs",
  exa: "Exa",
  "exa-search": "Exa",
  fal: "Fal",
  "fal-ai": "Fal",
  featherless: "Featherless",
  "featherless-ai": "Featherless",
  fireworks: "Fireworks",
  "fireworks-ai": "Fireworks",
  friendli: "Friendli",
  friendliai: "Friendli",
  gemini: "Gemini",
  "gemini-cli": "GeminiCLI",
  github: "GithubCopilot",
  "github-copilot": "GithubCopilot",
  glm: "Zhipu",
  "glm-cn": "Zhipu",
  glmt: "Zhipu",
  "google-pse-search": "Google",
  grok: "Grok",
  "grok-web": "Grok",
  groq: "Groq",
  "hugging-face": "HuggingFace",
  huggingface: "HuggingFace",
  hyperbolic: "Hyperbolic",
  ibm: "IBM",
  "inference-net": "Inference",
  jina: "Jina",
  "jina-ai": "Jina",
  kilocode: "KiloCode",
  kimi: "Kimi",
  "kimi-coding": "Kimi",
  "kimi-coding-apikey": "Kimi",
  lambda: "Lambda",
  "lambda-ai": "Lambda",
  "lm-studio": "LmStudio",
  lmstudio: "LmStudio",
  "meta-llama": "Meta",
  minimax: "Minimax",
  "minimax-cn": "Minimax",
  mistral: "Mistral",
  mistralai: "Mistral",
  moonshot: "Moonshot",
  morph: "Morph",
  "muse-spark-web": "MetaAI",
  nanobanana: "NanoBanana",
  nebius: "Nebius",
  "nous-research": "NousResearch",
  nousresearch: "NousResearch",
  novita: "Novita",
  nvidia: "Nvidia",
  ollama: "Ollama",
  "ollama-cloud": "Ollama",
  openai: "OpenAI",
  openclaw: "OpenClaw",
  opencode: "OpenCode",
  "opencode-go": "OpenCode",
  "opencode-zen": "OpenCode",
  "open-router": "OpenRouter",
  openrouter: "OpenRouter",
  perplexity: "Perplexity",
  "perplexity-search": "Perplexity",
  "perplexity-web": "Perplexity",
  poe: "Poe",
  qoder: "Qoder",
  qwen: "Qwen",
  recraft: "Recraft",
  replicate: "Replicate",
  runwayml: "Runway",
  sambanova: "SambaNova",
  sdwebui: "Automatic",
  searchapi: "SearchApi",
  "searchapi-search": "SearchApi",
  siliconflow: "SiliconCloud",
  snowflake: "Snowflake",
  stability: "Stability",
  "stability-ai": "Stability",
  tavily: "Tavily",
  "tavily-search": "Tavily",
  together: "Together",
  topaz: "TopazLabs",
  upstage: "Upstage",
  v0: "V0",
  "v0-vercel": "V0",
  venice: "Venice",
  "vercel-ai-gateway": "Vercel",
  vertex: "VertexAI",
  "vertex-partner": "VertexAI",
  vertexai: "VertexAI",
  vllm: "Vllm",
  volcengine: "Volcengine",
  voyage: "Voyage",
  "voyage-ai": "Voyage",
  watsonx: "IBM",
  "workers-ai": "WorkersAI",
  workersai: "WorkersAI",
  xai: "XAI",
  "xiaomi-mimo": "XiaomiMiMo",
  xiaomimimo: "XiaomiMiMo",
  xinference: "Xinference",
  zai: "ZAI",
  zhipu: "Zhipu",
} satisfies Record<string, keyof typeof LOBE_ICON_COMPONENTS>;

export function getLobeProviderIcon(
  providerId: string,
  type: "mono" | "color" = "color"
): LobeIconComponent | null {
  const iconKey = LOBE_PROVIDER_ALIASES[providerId.toLowerCase()];
  if (!iconKey) return null;

  const entry = LOBE_ICON_COMPONENTS[iconKey];
  return type === "color" && entry.color ? entry.color : entry.mono;
}
