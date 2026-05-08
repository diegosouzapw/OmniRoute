/**
 * Query specificity / complexity detection types for Manifest routing integration.
 */

export interface SpecificityResult {
  score: number;
  breakdown: SpecificityBreakdown;
  rulesTriggered: string[];
  inputTokens: number;
  confidence: number;
}

export interface SpecificityBreakdown {
  codeComplexity: number;
  mathComplexity: number;
  reasoningDepth: number;
  contextSize: number;
  toolCalling: number;
  domainSpecificity: number;
}

export interface SpecificityRule {
  name: string;
  category: keyof SpecificityBreakdown;
  weight: number;
  detect(input: RuleInput): RuleMatch | null;
}

export interface RuleInput {
  messages: Array<{ role?: string; content?: string | unknown }>;
  systemPrompt?: string;
  tools?: Array<{
    function?: { name: string; description?: string; parameters?: unknown };
  }>;
  model?: string;
}

export interface RuleMatch {
  score: number;
  evidence: string;
}

export type SpecificityLevel = "trivial" | "simple" | "moderate" | "complex" | "expert";
