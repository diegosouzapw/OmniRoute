/**
 * Agent Card Endpoint — /.well-known/agent.json
 *
 * Serves the OmniRoute A2A Agent Card for discovery by other agents.
 * Conforms to A2A Protocol v0.3.
 *
 * The Agent Card is dynamically generated to include the current version
 * from package.json and skills based on available combos.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getFleetSkills } from "@/lib/conductor/fleetSkills";
import { getBaseUrl } from "@/lib/wellKnown";

const PACKAGE_VERSION = process.env.npm_package_version || "1.8.1";

/**
 * GET /.well-known/agent.json
 *
 * Returns the OmniRoute Agent Card that describes this gateway's
 * capabilities as an A2A agent.
 */
export async function GET(request?: NextRequest) {
  // Conductor PRD RF2: fleet skills from the OmniConductor hub (cached ~60s; [] when
  // the hub is unset/offline — the card stays valid without the fleet section).
  const fleetSkills = await getFleetSkills();
  const baseUrl = getBaseUrl(request);
  const agentCard = {
    name: "OmniRoute AI 网关",
    description:
      "智能 AI 路由网关，支持 36+ 个提供者、智能回退、配额跟踪、" +
      "格式转换和自动管理组合。根据成本、延迟、配额可用性" +
      "和任务要求将 AI 请求路由到最优提供者。",
    url: `${baseUrl}/a2a`,
    version: PACKAGE_VERSION,
    capabilities: {
      streaming: true,
      pushNotifications: false,
    },
    skills: [
      {
        id: "smart-routing",
        name: "智能请求路由",
        description:
          "基于配额、成本、延迟和可靠性将 AI 请求路由到最优提供者。" +
          "支持基于组合的路由，包含多种策略：优先级、加权、轮询、成本优化。",
        tags: ["routing", "llm", "optimization", "fallback"],
        examples: [
          "将此编码任务路由到最快的可用模型",
          "将此次审查发送给预算 $0.50 以下的分析模型",
          "查找有可用配额的最便宜提供者",
        ],
      },
      {
        id: "quota-management",
        name: "配额与成本管理",
        description:
          "跨 36+ 个提供者跟踪和管理 API 配额，" +
          "配额耗尽时自动回退。提供实时成本跟踪和预算执行。",
        tags: ["quota", "cost", "monitoring", "budget"],
        examples: ["检查所有提供者的剩余配额", "哪个提供者有最多可用配额？", "生成今天的成本报告"],
      },
      {
        id: "provider-discovery",
        name: "提供者发现",
        description:
          "发现能够处理请求能力的提供者，" +
          "如聊天、图像、音频、搜索、嵌入、重排序或视频。" +
          "报告可用性、健康状态、配置状态和推荐提供者。",
        tags: ["providers", "discovery", "capabilities", "health"],
        examples: [
          "哪些提供者可以处理图像生成？",
          "查找健康的嵌入提供者",
          "哪些本地提供者已配置？",
        ],
      },
      {
        id: "cost-analysis",
        name: "成本分析",
        description:
          "按提供者和模型分析使用成本，比较最近时段，" + "并返回可供代理执行的成本节省机会。",
        tags: ["cost", "usage", "analytics", "optimization"],
        examples: ["这周花了多少钱？", "哪个提供者花费最多？", "建议过去 30 天的成本节省机会"],
      },
      {
        id: "health-report",
        name: "健康报告",
        description:
          "将提供者健康状态、断路器状态、速率限制队列、" +
          "锁定和遥测汇总为结构化报告，供编排使用。",
        tags: ["health", "monitoring", "resilience", "telemetry"],
        examples: ["一切都健康吗？", "报告降级的提供者和重试时机", "汇总活跃的速率限制和锁定"],
      },
      {
        id: "list-capabilities",
        name: "列出能力",
        description:
          "返回 42 个 OmniRoute 代理技能的完整目录（22 API + 20 CLI）" +
          "以及 SKILL.md 文档的原始 URL。",
        tags: ["discovery", "capabilities"],
        examples: ["你能做什么？", "列出你的技能", "展示能力"],
      },
      ...fleetSkills,
    ],
    authentication: {
      schemes: ["api-key"],
      apiKeyHeader: "Authorization",
    },
  };

  return NextResponse.json(agentCard, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  });
}
