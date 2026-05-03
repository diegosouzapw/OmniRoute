import type {
  CavemanConfig,
  CavemanRule,
  CompressionResult,
  CompressionMode,
  CompressionStats,
} from "./types.ts";
import { DEFAULT_CAVEMAN_CONFIG } from "./types.ts";
import { CAVEMAN_RULES, getRulesForContext } from "./cavemanRules.ts";
import { extractPreservedBlocks, restorePreservedBlocks } from "./preservation.ts";
import { createCompressionStats, estimateCompressionTokens } from "./stats.ts";
import { validateCompression } from "./validation.ts";
import { mapTextContent } from "./messageContent.ts";
import { detectCompressionLanguage } from "./languageDetector.ts";

interface ChatMessage {
  role: string;
  content?: string | Array<{ type: string; text?: string }>;
  [key: string]: unknown;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  [key: string]: unknown;
}

const RULE_KEYWORDS: Record<string, string[]> = {
  redundant_phrasing: ["make sure", "be sure"],
  redundant_because: ["due to the fact", "the reason is because"],
  redundant_directive: ["it is important", "you should", "remember to"],
  pleasantries: [
    "sure",
    "certainly",
    "of course",
    "happy to",
    "thanks",
    "thank you",
    "glad to help",
    "glad to",
    "no problem",
    "you're welcome",
    "youre welcome",
    "absolutely",
  ],
  polite_framing: [
    "please",
    "kindly",
    "could you please",
    "would you please",
    "can you please",
    "i would like you",
    "i want you",
    "i need you",
  ],
  hedging: [
    "it seems like",
    "it appears that",
    "i think that",
    "i believe that",
    "probably",
    "possibly",
    "maybe it",
  ],
  verbose_instructions: [
    "provide a detailed",
    "give me a comprehensive",
    "write an in-depth",
    "create a thorough",
    "explain in detail",
  ],
  filler_adverbs: ["basically", "essentially", "actually", "literally", "simply", "currently"],
  filler_phrases: ["i want to", "i need to", "i'd like to", "i'm looking for"],
  redundant_openers: ["hi there", "hello", "good morning", "hey"],
  verbose_requests: ["i was wondering", "would it be possible"],
  leader_phrases: [
    "i'll",
    "i will",
    "i can",
    "i'd",
    "let me",
    "you can",
    "we will",
    "we can",
    "let's",
  ],
  self_reference: ["i am trying to", "i am working on", "i have been"],
  excessive_gratitude: ["thank you so much", "thanks in advance", "i really appreciate"],
  qualifier_removal: ["a bit", "a little", "somewhat", "kind of", "sort of"],
  softeners: ["if possible", "when you get a chance", "at your convenience", "just wondering"],
  uncertainty_fillers: ["i guess", "i suppose", "more or less", "in a way"],
  assistant_fillers: ["here's", "below is", "this is"],
  compound_collapse: ["and any potential"],
  explanatory_prefix: [
    "the function appears to be handling",
    "the code seems to",
    "the class is",
    "this module is",
  ],
  question_to_directive: [
    "can you explain why",
    "could you show me how",
    "would you tell me",
    "can you tell me",
  ],
  context_setup: ["i have the following code", "here is my code", "below is the code"],
  intent_clarification: [
    "what i'm trying to do",
    "my objective is to",
    "what i need is",
    "i'm aiming to",
  ],
  background_removal: ["as you may know", "as we discussed earlier"],
  meta_commentary: ["note that", "keep in mind", "remember that"],
  purpose_statement: ["for the purpose of", "with the goal of", "in an effort to", "for every"],
  list_conjunction: ["and also", "as well as"],
  purpose_phrases: ["in order to", "so as to"],
  redundant_quantifiers: ["each and every", "any and all"],
  all_quantifier: ["any and all"],
  verbose_connectors: ["furthermore", "additionally", "moreover", "in addition"],
  transition_removal: ["on the other hand", "in contrast", "however"],
  emphasis_removal: ["very", "really", "extremely", "highly", "quite"],
  passive_voice: [
    "is being used",
    "is being called",
    "is being generated",
    "was created",
    "was generated",
    "was implemented",
  ],
  repeated_context: [
    "as we discussed earlier",
    "as mentioned before",
    "as previously stated",
    "as i said before",
  ],
  repeated_question: [
    "same question as before",
    "i asked this earlier",
    "this is the same question",
  ],
  reestablished_context: ["going back to the code above", "referring back to", "returning to"],
  summary_replacement: ["to summarize", "in summary of our conversation", "to recap"],
  ultra_abbreviations: ["database"],
  ultra_config_abbreviation: ["configuration"],
  ultra_function_abbreviation: ["function"],
  ultra_request_abbreviation: ["request"],
  ultra_response_abbreviation: ["response"],
  ultra_implementation_abbreviation: ["implementation"],
  ultra_authentication_abbreviation: ["authentication"],
  ultra_authorization_abbreviation: ["authorization"],
  ultra_application_abbreviation: ["application"],
  ultra_dependency_abbreviation: ["dependency", "dependencies"],
  ultra_common_abbreviations: [
    "implementation",
    "authentication",
    "authorization",
    "application",
    "dependency",
    "dependencies",
  ],
};

const ARTICLE_HINT_RE = /\b(?:a|an|the)\b/;

function shouldAttemptRule(ruleName: string, lowerText: string): boolean {
  if (ruleName === "articles") {
    ARTICLE_HINT_RE.lastIndex = 0;
    return ARTICLE_HINT_RE.test(lowerText);
  }

  const keywords = RULE_KEYWORDS[ruleName];
  return !keywords || keywords.some((keyword) => lowerText.includes(keyword));
}

export function applyRulesToText(
  text: string,
  rules: CavemanRule[]
): { text: string; appliedRules: string[] } {
  let result = text;
  const lowerResult = text.toLowerCase();
  const appliedRules: string[] = [];

  for (const rule of rules) {
    if (!shouldAttemptRule(rule.name, lowerResult)) continue;

    const before = result;
    const { pattern, replacement } = rule;
    if (typeof replacement === "function") {
      const fn = replacement;
      result = result.replace(pattern, (...args) => {
        const match = args[0];
        return fn(match, ...args.slice(1, -2));
      });
    } else {
      result = result.replace(pattern, replacement);
    }
    if (result !== before) {
      appliedRules.push(rule.name);
    }
  }

  return { text: result, appliedRules };
}

function cleanupArtifacts(text: string): string {
  let result = text;
  if (result.includes("  ")) result = result.replace(/  +/g, " ");
  if (/[\t ]+[,.;:!?]/.test(result)) result = result.replace(/\s+([,.;:!?])/g, "$1");
  if (/[.!?]{2,}/.test(result)) result = result.replace(/([.!?]){2,}/g, "$1");
  if (/[ \t]\n/.test(result)) result = result.replace(/[ \t]+$/gm, "");
  if (result.endsWith(" ") || result.endsWith("\t")) result = result.trimEnd();
  if (result.includes("\n\n\n")) result = result.replace(/\n{3,}/g, "\n\n");
  if (result.startsWith("\n")) result = result.replace(/^\n+/, "");
  if (result.endsWith("\n")) result = result.replace(/\n+$/, "");
  return result;
}

function recapitalizeSentences(text: string): string {
  return text.replace(/(^|[.!?]\s+|\n+\s*)([a-z])/g, (_match, prefix: string, char: string) => {
    return `${prefix}${char.toUpperCase()}`;
  });
}

function createCavemanStats(
  originalTokens: number,
  compressedTokens: number,
  techniquesUsed: string[],
  rulesApplied: string[] | undefined,
  durationMs: number
): CompressionStats {
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 10000) / 100
      : 0;
  return {
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed,
    mode: "standard",
    timestamp: Date.now(),
    ...(rulesApplied && rulesApplied.length > 0 ? { rulesApplied } : {}),
    durationMs,
  };
}

function compileUserPreservePatterns(patterns: string[]): {
  patterns: RegExp[];
  warnings: string[];
} {
  const compiled: RegExp[] = [];
  const warnings: string[] = [];
  for (const pattern of patterns) {
    try {
      compiled.push(new RegExp(pattern, "g"));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      warnings.push(`Invalid preservePatterns regex ignored: ${pattern} (${message})`);
    }
  }
  return { patterns: compiled, warnings };
}

const PROTECTED_STRUCTURE_RE =
  /```|~~~|`|https?:\/\/|\[[^\]\n]+\]\([^) \n]+(?:\s+"[^"]*")?\)|^#{1,6}\s+|^\s*\|.*\|\s*$|\$\$|\\\[|\\begin\{|^\s*#(?:set|show|let|import|include)\b|\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b|\bprocess\.env\.[A-Za-z_][A-Za-z0-9_]*\b|\$[A-Z_][A-Z0-9_]*\b|\b\d+(?:\.\d+){1,3}(?:[-+][A-Za-z0-9.-]+)?\b|\b[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)+\(\)?|\b[A-Za-z_$][\w$]*\s*\([^()\n]*\)|(?:^|\s)(?:\.{0,2}\/[A-Za-z0-9_@./-]+|[A-Za-z]:\\[A-Za-z0-9_.\\/-]+)|\b(?:TypeError|ReferenceError|SyntaxError|RangeError|URIError|EvalError|Error|Exception):[^\n]+/im;
const PROTECTED_STRUCTURE_PREFILTER_RE = /[`~\[\]\|$#\\/:_()0-9]/;

function hasProtectedStructure(text: string): boolean {
  if (!PROTECTED_STRUCTURE_PREFILTER_RE.test(text)) return false;
  PROTECTED_STRUCTURE_RE.lastIndex = 0;
  return PROTECTED_STRUCTURE_RE.test(text);
}

export function cavemanCompress(
  body: ChatRequestBody,
  options?: Partial<CavemanConfig>
): CompressionResult {
  const startMs = performance.now();
  const config: CavemanConfig = { ...DEFAULT_CAVEMAN_CONFIG, ...options };

  const emptyResult = (): CompressionResult => ({
    body: body as unknown as Record<string, unknown>,
    compressed: false,
    stats: createCompressionStats(
      body as unknown as Record<string, unknown>,
      body as unknown as Record<string, unknown>,
      "standard" as CompressionMode,
      []
    ),
  });

  if (!config.enabled) {
    return emptyResult();
  }

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return emptyResult();
  }

  let totalOriginalTokens = 0;
  let totalCompressedTokens = 0;
  const allAppliedRules: string[] = [];
  const validationWarnings: string[] = [];
  const validationErrors: string[] = [];
  let fallbackApplied = false;
  let preservedBlockCount = 0;
  const customPreservation = compileUserPreservePatterns(config.preservePatterns ?? []);
  validationWarnings.push(...customPreservation.warnings);

  const compressedMessages = body.messages.map((msg): ChatMessage => {
    if (typeof msg.content !== "string" && !Array.isArray(msg.content)) {
      return msg;
    }

    const contentStr =
      typeof msg.content === "string"
        ? msg.content
        : msg.content
            .map((part) =>
              part && typeof part === "object" && "text" in part && typeof part.text === "string"
                ? part.text
                : ""
            )
            .filter(Boolean)
            .join("\n");
    totalOriginalTokens += estimateCompressionTokens(contentStr);

    if (!contentStr || contentStr.length < config.minMessageLength) {
      totalCompressedTokens += estimateCompressionTokens(contentStr);
      return msg;
    }

    if (!config.compressRoles.includes(msg.role as "user" | "assistant" | "system")) {
      totalCompressedTokens += estimateCompressionTokens(contentStr);
      return msg;
    }

    const compressTextPart = (textPart: string): string => {
      if (!textPart || textPart.length < config.minMessageLength) return textPart;

      const shouldPreserve =
        customPreservation.patterns.length > 0 || hasProtectedStructure(textPart);
      const { text: extractedText, blocks } = shouldPreserve
        ? extractPreservedBlocks(textPart, {
            preservePatterns: customPreservation.patterns,
          })
        : { text: textPart, blocks: [] };
      preservedBlockCount += blocks.length;

      const detectedLanguage = config.autoDetectLanguage
        ? detectCompressionLanguage(textPart)
        : (config.language ?? "en");
      const enabledPacks = config.enabledLanguagePacks ?? ["en", detectedLanguage];
      const language = enabledPacks.includes(detectedLanguage)
        ? detectedLanguage
        : enabledPacks.includes("en")
          ? "en"
          : detectedLanguage;
      const rules = getRulesForContext(msg.role, config.intensity, language).filter(
        (rule) => !config.skipRules.includes(rule.name)
      );
      const { text: rulesApplied, appliedRules } = applyRulesToText(extractedText, rules);
      allAppliedRules.push(...appliedRules);

      const normalized = cleanupArtifacts(recapitalizeSentences(rulesApplied));
      const cleaned =
        blocks.length > 0
          ? cleanupArtifacts(restorePreservedBlocks(normalized, blocks))
          : normalized;
      if (shouldPreserve || blocks.length > 0) {
        const validation = validateCompression(textPart, cleaned);
        validationWarnings.push(...validation.warnings);
        if (!validation.valid) {
          validationErrors.push(...validation.errors);
          fallbackApplied = true;
          return textPart;
        }
      }

      return cleaned;
    };

    const compressedMessage = mapTextContent(msg, compressTextPart) as ChatMessage;
    const cleaned =
      typeof compressedMessage.content === "string"
        ? compressedMessage.content
        : Array.isArray(compressedMessage.content)
          ? compressedMessage.content
              .map((part) =>
                part && typeof part === "object" && "text" in part && typeof part.text === "string"
                  ? part.text
                  : ""
              )
              .filter(Boolean)
              .join("\n")
          : contentStr;
    totalCompressedTokens += estimateCompressionTokens(cleaned);

    return compressedMessage;
  });

  const durationMs = performance.now() - startMs;
  const uniqueRules = [...new Set(allAppliedRules)];
  const stats = createCavemanStats(
    totalOriginalTokens,
    totalCompressedTokens,
    uniqueRules.length > 0 ? ["caveman-rules"] : [],
    uniqueRules.length > 0 ? uniqueRules : undefined,
    Math.round(durationMs * 100) / 100
  );
  if (validationWarnings.length > 0) stats.validationWarnings = [...new Set(validationWarnings)];
  if (validationErrors.length > 0) stats.validationErrors = [...new Set(validationErrors)];
  if (fallbackApplied) stats.fallbackApplied = true;
  if (preservedBlockCount > 0) stats.preservedBlockCount = preservedBlockCount;

  const compressed = totalCompressedTokens < totalOriginalTokens;

  const result: CompressionResult = {
    body: { ...body, messages: compressedMessages } as unknown as Record<string, unknown>,
    compressed,
    stats,
  };

  return result;
}
