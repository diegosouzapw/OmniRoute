import type { RegistryEntry } from "../../shared.ts";

export const huggingchatProvider: RegistryEntry = {
  id: "huggingchat",
  // Distinct alias: "hc" belongs to the hackclub provider; huggingchat is
  // addressed by its own id to avoid the alias collision.
  alias: "huggingchat",
  format: "openai",
  executor: "huggingchat",
  baseUrl: "https://huggingface.co/chat/conversation",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    // Sweep 2026-06-30: final HuggingChat production catalog shortlist.
    // Only concrete provider/model entries are registered here; router entries are excluded.
    {
      id: "baidu/ERNIE-4.5-VL-424B-A47B-Base-PT",
      name: "ERNIE 4.5 VL 424B A47B Base PT",
      supportsVision: true,
    },
    {
      id: "CohereLabs/c4ai-command-r7b-12-2024",
      name: "Command R7B 12-2024",
      toolCalling: true,
    },
    {
      id: "CohereLabs/command-a-reasoning-08-2025",
      name: "Command A Reasoning 08-2025",
      toolCalling: true,
    },
    {
      id: "CohereLabs/command-a-vision-07-2025",
      name: "Command A Vision 07-2025",
      supportsVision: true,
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Pro",
      name: "DeepSeek V4 Pro",
      toolCalling: true,
      supportsReasoning: true,
    },
    { id: "deepseek-ai/DeepSeek-V4-Flash", name: "DeepSeek V4 Flash", toolCalling: true },
    {
      id: "google/gemma-4-31B-it",
      name: "Gemma 4 31B",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "google/gemma-4-26B-A4B-it",
      name: "Gemma 4 26B A4B",
      supportsVision: true,
      toolCalling: true,
    },
    { id: "inclusionAI/Ling-2.6-1T", name: "Ling 2.6 1T", toolCalling: true },
    {
      id: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
      name: "Llama 4 Scout 17B 16E Instruct",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      name: "Llama 4 Maverick 17B 128E Instruct FP8",
      supportsVision: true,
    },
    {
      id: "MiniMaxAI/MiniMax-M3",
      name: "MiniMax M3",
      supportsVision: true,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "moonshotai/Kimi-K2.7-Code",
      name: "Kimi K2.7 Code",
      supportsVision: true,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "moonshotai/Kimi-K2.6",
      name: "Kimi K2.6",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
      name: "NVIDIA Nemotron 3 Ultra 550B A55B NVFP4",
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "openai/gpt-oss-120b",
      name: "GPT-OSS 120B",
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "openai/gpt-oss-20b",
      name: "GPT-OSS 20B",
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "Qwen/Qwen3.5-122B-A10B",
      name: "Qwen3.5 122B A10B",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "Qwen/Qwen3.5-397B-A17B",
      name: "Qwen3.5 397B A17B",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "Qwen/Qwen3.6-27B",
      name: "Qwen3.6 27B",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "Qwen/Qwen3.6-35B-A3B",
      name: "Qwen3.6 35B A3B",
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "stepfun-ai/Step-3.7-Flash",
      name: "Step 3.7 Flash",
      supportsVision: true,
      toolCalling: true,
    },
    { id: "XiaomiMiMo/MiMo-V2.5-Pro", name: "MiMo V2.5 Pro", toolCalling: true },
    {
      id: "zai-org/GLM-5.2",
      name: "GLM 5.2",
      toolCalling: true,
      supportsReasoning: true,
    },
  ],
};
