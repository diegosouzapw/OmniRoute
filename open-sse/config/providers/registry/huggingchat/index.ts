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
      capabilities: { supportsVision: true },
    },
    {
      id: "CohereLabs/c4ai-command-r7b-12-2024",
      name: "Command R7B 12-2024",
      capabilities: { supportsTools: true },
    },
    {
      id: "CohereLabs/command-a-reasoning-08-2025",
      name: "Command A Reasoning 08-2025",
      capabilities: { supportsTools: true },
    },
    {
      id: "CohereLabs/command-a-vision-07-2025",
      name: "Command A Vision 07-2025",
      capabilities: { supportsVision: true },
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Pro",
      name: "DeepSeek V4 Pro",
      capabilities: { supportsTools: true, supportsReasoning: true },
    },
    {
      id: "deepseek-ai/DeepSeek-V4-Flash",
      name: "DeepSeek V4 Flash",
      capabilities: { supportsTools: true },
    },
    {
      id: "google/gemma-4-31B-it",
      name: "Gemma 4 31B",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "google/gemma-4-26B-A4B-it",
      name: "Gemma 4 26B A4B",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "inclusionAI/Ling-2.6-1T",
      name: "Ling 2.6 1T",
      capabilities: { supportsTools: true },
    },
    {
      id: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
      name: "Llama 4 Scout 17B 16E Instruct",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      name: "Llama 4 Maverick 17B 128E Instruct FP8",
      capabilities: { supportsVision: true },
    },
    {
      id: "MiniMaxAI/MiniMax-M3",
      name: "MiniMax M3",
      capabilities: { supportsVision: true, supportsTools: true, supportsReasoning: true },
    },
    {
      id: "moonshotai/Kimi-K2.7-Code",
      name: "Kimi K2.7 Code",
      capabilities: { supportsVision: true, supportsTools: true, supportsReasoning: true },
    },
    {
      id: "moonshotai/Kimi-K2.6",
      name: "Kimi K2.6",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
      name: "NVIDIA Nemotron 3 Ultra 550B A55B NVFP4",
      capabilities: { supportsTools: true, supportsReasoning: true },
    },
    {
      id: "openai/gpt-oss-120b",
      name: "GPT-OSS 120B",
      capabilities: { supportsTools: true, supportsReasoning: true },
    },
    {
      id: "openai/gpt-oss-20b",
      name: "GPT-OSS 20B",
      capabilities: { supportsTools: true, supportsReasoning: true },
    },
    {
      id: "Qwen/Qwen3.5-122B-A10B",
      name: "Qwen3.5 122B A10B",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "Qwen/Qwen3.5-397B-A17B",
      name: "Qwen3.5 397B A17B",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "Qwen/Qwen3.6-27B",
      name: "Qwen3.6 27B",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "Qwen/Qwen3.6-35B-A3B",
      name: "Qwen3.6 35B A3B",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "stepfun-ai/Step-3.7-Flash",
      name: "Step 3.7 Flash",
      capabilities: { supportsVision: true, supportsTools: true },
    },
    {
      id: "XiaomiMiMo/MiMo-V2.5-Pro",
      name: "MiMo V2.5 Pro",
      capabilities: { supportsTools: true },
    },
    {
      id: "zai-org/GLM-5.2",
      name: "GLM 5.2",
      capabilities: { supportsTools: true, supportsReasoning: true },
    },
  ],
};
