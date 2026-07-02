import crypto from "crypto";

interface Message {
  role: string;
  content: string | unknown[];
}

interface PrefixAnalysis {
  prefixEndIdx: number;
  prefixHash: string;
  prefixTokens: number;
  prefixType: "system_only" | "system_and_tools" | "system_tools_history";
  confidence: number;
}

function normalizeContent(content: string | unknown[]): string {
  if (typeof content === "string") return content;
  return JSON.stringify(content);
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function analyzePrefix(messages: Message[]): PrefixAnalysis {
  if (!Array.isArray(messages) || messages.length === 0) {
    return {
      prefixEndIdx: -1,
      prefixHash: "",
      prefixTokens: 0,
      prefixType: "system_only",
      confidence: 0,
    };
  }

  let prefixEndIdx = -1;
  let prefixType: PrefixAnalysis["prefixType"] = "system_only";
  let confidence = 0.5;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const role = msg.role || "user";

    if (role === "system") {
      prefixEndIdx = i;
      prefixType = "system_only";
      confidence = 0.9;
    } else if (role === "tool" || (role === "assistant" && Array.isArray(msg.content))) {
      prefixEndIdx = i;
      prefixType = "system_and_tools";
      confidence = 0.8;
    } else if (role === "assistant") {
      prefixEndIdx = i;
      prefixType = "system_tools_history";
      confidence = 0.7;
    } else {
      break;
    }
  }

  const prefixMessages = messages.slice(0, prefixEndIdx + 1);
  const prefixText = prefixMessages.map((m) => normalizeContent(m.content)).join("\n");
  const prefixHash = crypto.createHash("sha256").update(prefixText).digest("hex");
  const prefixTokens = estimateTokens(prefixText);

  return {
    prefixEndIdx,
    prefixHash,
    prefixTokens,
    prefixType,
    confidence,
  };
}

export function shouldInjectCacheControl(analysis: PrefixAnalysis, minTokens = 1024): boolean {
  return analysis.prefixTokens >= minTokens && analysis.confidence >= 0.7;
}

export function generatePromptCacheKey(messages: Message[]): string {
  const analysis = analyzePrefix(messages);
  if (analysis.prefixHash) {
    return `omni-${analysis.prefixHash.slice(0, 32)}`;
  }
  return "";
}
