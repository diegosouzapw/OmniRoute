import type { CavemanRule } from "./types.ts";
import { loadAllRulesForLanguage } from "./ruleLoader.ts";

const CAVEMAN_RULES: CavemanRule[] = [
  // ── Category 1: Filler Removal (10+ rules) ──────────────────────────

  {
    name: "redundant_phrasing",
    pattern:
      /\b(?:make sure to|be sure to|due to the fact that|the reason is because|it is important to|you should|remember to)\b\s*/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        "make sure to": "ensure ",
        "be sure to": "ensure ",
        "due to the fact that": "because ",
        "the reason is because": "because ",
        "it is important to": "",
        "you should": "",
        "remember to": "",
      };
      return map[match.trim().toLowerCase()] ?? "";
    },
    context: "all",
    category: "structural",
    minIntensity: "full",
    description: "Replace verbose stock phrases with shorter equivalents.",
  },
  {
    name: "pleasantries",
    pattern:
      /(?<!make\s)(?<!be\s)\b(?:i'?d be happy to|i would be happy to|i'?d be glad to|i would be glad to|glad to help|happy to|thank you|thanks|no problem|you'?re welcome|absolutely|certainly|of course|sure)\b[,.!?\s]*/gi,
    replacement: "",
    context: "all",
    category: "filler",
    minIntensity: "lite",
    description: "Drop conversational acknowledgements that do not change request meaning.",
  },
  {
    name: "polite_framing",
    pattern:
      /\b(?:please|kindly|could you please|would you please|can you please|I would like you to|I want you to|I need you to)\b\s*/gi,
    replacement: "",
    context: "all",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "hedging",
    pattern:
      /\b(?:it seems like|it appears that|I think that|I believe that|probably|possibly|maybe it)\b\s*/gi,
    replacement: "",
    context: "all",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "verbose_instructions",
    pattern:
      /\b(?:provide a detailed explanation of|give me a comprehensive explanation of|write an in-depth explanation of|create a thorough explanation of|provide a detailed|give me a comprehensive|write an in-depth|create a thorough|explain in detail)\b/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        "provide a detailed explanation of": "explain ",
        "give me a comprehensive explanation of": "explain ",
        "write an in-depth explanation of": "explain ",
        "create a thorough explanation of": "explain ",
        "provide a detailed": "provide ",
        "give me a comprehensive": "give ",
        "write an in-depth": "write ",
        "create a thorough": "create ",
        "explain in detail": "explain ",
      };
      const lower = match.toLowerCase();
      return map[lower] ?? match;
    },
    context: "all",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "filler_adverbs",
    pattern: /(?<![a-z])\b(?:basically|essentially|actually|literally|simply|currently)\b\s*/gi,
    replacement: "",
    context: "all",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "articles",
    pattern: /\b(?:[Aa]n|[Aa]|[Tt]he)\s+(?=[a-z])/g,
    replacement: "",
    context: "all",
    category: "terse",
    minIntensity: "full",
    description: "Remove English articles from prose while protected technical tokens stay intact.",
  },
  {
    name: "filler_phrases",
    pattern: /^(?:I want to|I need to|I'd like to|I'm looking for)\b\s*/gim,
    replacement: "",
    context: "user",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "redundant_openers",
    pattern: /^(?:Hi there|Hello|Good morning|Hey)\s*[,.!?\s]?\s*/gim,
    replacement: "",
    context: "user",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "verbose_requests",
    pattern: /\b(?:I was wondering if you could|Would it be possible to)\b\s*/gi,
    replacement: "",
    context: "user",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "leader_phrases",
    pattern: /^(?:i'?ll|i will|i can|i'?d|let me|you can|we will|we can|let'?s)\s+(?=[a-z])/gim,
    replacement: "",
    context: "all",
    category: "terse",
    minIntensity: "full",
    description: "Remove leading helper phrases before the actual instruction or answer.",
  },
  {
    name: "self_reference",
    pattern: /^(?:I am trying to|I am working on|I have been)\b\s*/gim,
    replacement: "",
    context: "user",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "excessive_gratitude",
    pattern: /\b(?:Thank you so much|Thanks in advance|I really appreciate)\b[,.!?\s]*/gi,
    replacement: "",
    context: "all",
    category: "filler",
    minIntensity: "lite",
  },
  {
    name: "qualifier_removal",
    pattern: /\b(?:a bit|a little|somewhat|kind of|sort of)\b\s*/gi,
    replacement: "",
    context: "all",
    category: "filler",
    minIntensity: "lite",
  },

  // ── Category 2: Context Condensation (8+ rules) ──────────────────────

  {
    name: "compound_collapse",
    pattern: /\band any potential\b/gi,
    replacement: "",
    context: "all",
    category: "context",
    minIntensity: "full",
  },
  {
    name: "explanatory_prefix",
    pattern:
      /\b(?:The function appears to be handling|The code seems to|The class is|This module is)\b/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        "the function appears to be handling": "Function:",
        "the code seems to": "Code:",
        "the class is": "Class:",
        "this module is": "Module:",
      };
      return map[match.toLowerCase()] ?? match;
    },
    context: "all",
    category: "context",
    minIntensity: "lite",
  },
  {
    name: "question_to_directive",
    pattern:
      /\b(?:Can you explain why|Could you show me how|Would you tell me|Can you tell me)\b\s*/gi,
    replacement: (match: string): string => {
      const trimmed = match.trimEnd().toLowerCase();
      const map: Record<string, string> = {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how ",
        "would you tell me": "Tell me ",
        "can you tell me": "Tell me ",
      };
      return map[trimmed] ?? match;
    },
    context: "user",
    category: "context",
    minIntensity: "lite",
  },
  {
    name: "context_setup",
    pattern: /\b(?:I have the following code|Here is my code|Below is the code)\b\s*[:.]?\s*/gi,
    replacement: "Code:",
    context: "user",
    category: "context",
    minIntensity: "lite",
  },
  {
    name: "intent_clarification",
    pattern:
      /\b(?:What I'm trying to do is|My objective is to|What I need is|I'm aiming to)\b\s*/gi,
    replacement: "Goal:",
    context: "user",
    category: "context",
    minIntensity: "lite",
  },
  {
    name: "background_removal",
    pattern: /\b(?:As you may know,?\s*|As we discussed earlier,?\s*)/gi,
    replacement: "",
    context: "all",
    category: "context",
    minIntensity: "lite",
  },
  {
    name: "meta_commentary",
    pattern: /^(?:Note that|Keep in mind that|Remember that)\b\s*/gim,
    replacement: "",
    context: "all",
    category: "context",
    minIntensity: "lite",
  },
  {
    name: "purpose_statement",
    pattern: /\b(?:for the purpose of|with the goal of|in an effort to|for every)\b/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        "for the purpose of": "for",
        "with the goal of": "to",
        "in an effort to": "to",
        "for every": "per",
      };
      return map[match.toLowerCase()] ?? match;
    },
    context: "all",
    category: "context",
    minIntensity: "lite",
  },

  // ── Category 3: Structural Compression (7+ rules) ────────────────────

  {
    name: "list_conjunction",
    pattern: /,\s*and also\s+|,\s*as well as\s+/gi,
    replacement: ", ",
    context: "all",
    category: "structural",
    minIntensity: "full",
  },
  {
    name: "purpose_phrases",
    pattern: /\b(?:in order to|so as to)\b\s*/gi,
    replacement: "to ",
    context: "all",
    category: "structural",
    minIntensity: "lite",
  },
  {
    name: "redundant_quantifiers",
    pattern: /\b(?:each and every single|each and every|any and all)\b/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        "each and every single": "each",
        "each and every": "each",
        "any and all": "all",
      };
      return map[match.toLowerCase()] ?? match;
    },
    context: "all",
    category: "structural",
    minIntensity: "full",
  },
  {
    name: "verbose_connectors",
    pattern: /\b(?:furthermore|additionally|moreover|in addition)\b\s*/gi,
    replacement: "also ",
    context: "all",
    category: "structural",
    minIntensity: "lite",
  },
  {
    name: "transition_removal",
    pattern: /^(?:On the other hand,?\s*|In contrast,?\s*|However,?\s*)/gim,
    replacement: "",
    context: "all",
    category: "structural",
    minIntensity: "lite",
  },
  {
    name: "emphasis_removal",
    pattern: /\b(?:very|really|extremely|highly|quite)\s+(?=[a-z])/gi,
    replacement: "",
    context: "all",
    category: "structural",
    minIntensity: "lite",
  },
  {
    name: "passive_voice",
    pattern:
      /\b(?:is being used|is being called|is being generated|was created|was generated|was implemented)\b/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        "is being used": "uses",
        "is being called": "calls",
        "is being generated": "generated",
        "was created": "created",
        "was generated": "generated",
        "was implemented": "implemented",
      };
      return map[match.toLowerCase()] ?? match;
    },
    context: "all",
    category: "structural",
    minIntensity: "full",
  },

  // ── Category 4: Multi-Turn Dedup (5+ rules) ─────────────────────────

  {
    name: "repeated_context",
    pattern:
      /\b(?:As we discussed earlier|As mentioned before|As previously stated|As I said before)\b[,.]?\s*/gi,
    replacement: "See above. ",
    context: "all",
    category: "dedup",
    minIntensity: "lite",
  },
  {
    name: "repeated_question",
    pattern:
      /\b(?:Same question as before|I asked this earlier|This is the same question)\b[,.]?\s*/gi,
    replacement: "[same question] ",
    context: "user",
    category: "dedup",
    minIntensity: "lite",
  },
  {
    name: "reestablished_context",
    pattern: /\b(?:Going back to the code above|Referring back to|Returning to)\b\s*/gi,
    replacement: "Re: ",
    context: "all",
    category: "dedup",
    minIntensity: "lite",
  },
  {
    name: "summary_replacement",
    pattern:
      /\b(?:To summarize what we've discussed|In summary of our conversation|To recap)\b[,.]?\s*/gi,
    replacement: "Summary: ",
    context: "assistant",
    category: "dedup",
    minIntensity: "lite",
  },

  // ── Category 5: Ultra Abbreviations ─────────────────────────────────

  {
    name: "ultra_abbreviations",
    pattern:
      /\b(?:database|configuration|function|request|response|implementation|authentication|authorization|application|dependency|dependencies)\b/gi,
    replacement: (match: string): string => {
      const map: Record<string, string> = {
        database: "DB",
        configuration: "config",
        function: "fn",
        request: "req",
        response: "res",
        implementation: "impl",
        authentication: "auth",
        authorization: "authz",
        application: "app",
        dependency: "dep",
        dependencies: "deps",
      };
      return map[match.toLowerCase()] ?? match;
    },
    context: "all",
    category: "ultra",
    minIntensity: "ultra",
  },
];

const INTENSITY_RANK = { lite: 0, full: 1, ultra: 2 } as const;

export function getRulesForContext(
  context: string,
  intensity: "lite" | "full" | "ultra" = "full",
  language = "en"
): CavemanRule[] {
  const rank = INTENSITY_RANK[intensity] ?? INTENSITY_RANK.full;
  const fileRules = language ? loadAllRulesForLanguage(language) : [];
  const rules = fileRules.length > 0 ? fileRules : CAVEMAN_RULES;
  const selected = rules.filter((rule) => {
    const minRank = INTENSITY_RANK[rule.minIntensity ?? "lite"];
    return (rule.context === "all" || rule.context === context) && minRank <= rank;
  });
  return selected.length > 0
    ? selected
    : CAVEMAN_RULES.filter((rule) => {
        const minRank = INTENSITY_RANK[rule.minIntensity ?? "lite"];
        return (rule.context === "all" || rule.context === context) && minRank <= rank;
      });
}

export function getRuleByName(name: string): CavemanRule | undefined {
  return CAVEMAN_RULES.find((rule) => rule.name === name);
}

export function getCavemanRuleMetadata() {
  const intensities = ["lite", "full", "ultra"] as const;
  return CAVEMAN_RULES.map((rule) => ({
    name: rule.name,
    context: rule.context,
    category: rule.category ?? "terse",
    minIntensity: rule.minIntensity ?? "lite",
    intensities: intensities.filter(
      (intensity) => INTENSITY_RANK[intensity] >= INTENSITY_RANK[rule.minIntensity ?? "lite"]
    ),
    description: rule.description ?? rule.name.replace(/_/g, " "),
  }));
}

export { CAVEMAN_RULES };
