import { DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG, type CavemanOutputModeConfig } from "./types.ts";
import { extractTextContent } from "./messageContent.ts";

interface ChatMessage {
  role: string;
  content?: string | unknown[];
  [key: string]: unknown;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  instructions?: string;
  [key: string]: unknown;
}

export interface CavemanOutputModeResult {
  body: ChatRequestBody;
  applied: boolean;
  skippedReason?: string;
}

const CAVEMAN_INSTRUCTION_BY_LANGUAGE = {
  en: {
    lite: "Respond concise. Drop filler, pleasantries, hedging. Keep full sentences, technical terms, code, errors, URLs, and identifiers exact.",
    full: "Respond terse like smart caveman. Drop articles, filler, pleasantries, hedging. Fragments OK. Keep all technical substance, code, errors, URLs, identifiers exact.",
    ultra:
      "Respond ultra terse. Use short technical prose, arrows for causality, common abbreviations like DB/auth/config/req/res/fn. Never abbreviate code symbols, API names, error strings, URLs, or identifiers.",
  },
  "pt-BR": {
    lite: "Responda conciso. Remova enrolacao, cortesias e incerteza. Preserve termos tecnicos, codigo, erros, URLs e identificadores exatamente.",
    full: "Responda seco e compacto. Frases curtas OK. Preserve todo conteudo tecnico, codigo, erros, URLs e identificadores exatamente.",
    ultra:
      "Responda ultra compacto. Use prosa tecnica curta e abreviacoes comuns como DB/auth/config/req/res/fn. Nunca abrevie simbolos de codigo, APIs, erros, URLs ou identificadores.",
  },
  es: {
    lite: "Responde conciso. Quita relleno, cortesias y dudas. Conserva terminos tecnicos, codigo, errores, URLs e identificadores exactos.",
    full: "Responde seco y compacto. Fragmentos OK. Conserva todo el contenido tecnico, codigo, errores, URLs e identificadores exactos.",
    ultra:
      "Responde ultra compacto. Usa prosa tecnica corta y abreviaturas comunes como DB/auth/config/req/res/fn. Nunca abrevies simbolos de codigo, APIs, errores, URLs o identificadores.",
  },
  de: {
    lite: "Antworte knapp. Entferne Fuellwoerter, Hoeflichkeit und Unsicherheit. Bewahre Fachbegriffe, Code, Fehler, URLs und Bezeichner exakt.",
    full: "Antworte sehr knapp. Fragmente OK. Bewahre alle technischen Inhalte, Code, Fehler, URLs und Bezeichner exakt.",
    ultra:
      "Antworte ultra knapp. Nutze kurze technische Prosa und uebliche Abkuerzungen wie DB/auth/config/req/res/fn. Code-Symbole, APIs, Fehler, URLs und Bezeichner nie abkuerzen.",
  },
  fr: {
    lite: "Reponds concis. Retire remplissage, politesses et hesitations. Garde termes techniques, code, erreurs, URLs et identifiants exacts.",
    full: "Reponds tres compact. Fragments OK. Garde tout le contenu technique, code, erreurs, URLs et identifiants exacts.",
    ultra:
      "Reponds ultra compact. Utilise une prose technique courte et des abreviations communes comme DB/auth/config/req/res/fn. N'abrege jamais symboles de code, APIs, erreurs, URLs ou identifiants.",
  },
  ja: {
    lite: "簡潔に回答。冗長表現、挨拶、曖昧表現を削る。技術用語、コード、エラー、URL、識別子は正確に保持。",
    full: "短く圧縮して回答。断片文可。技術内容、コード、エラー、URL、識別子は正確に保持。",
    ultra:
      "超短く回答。DB/auth/config/req/res/fn など一般的な略語は可。コード記号、API名、エラー文字列、URL、識別子は省略しない。",
  },
} as const;

const CAVEMAN_OUTPUT_MARKER = "[OmniRoute Caveman Output Mode]";

export function shouldBypassCavemanOutputMode(messages: ChatMessage[]): string | null {
  const text = messages
    .slice(-3)
    .map((message) => extractTextContent(message.content).toLowerCase())
    .join("\n");

  if (!text.trim()) return null;
  if (
    /\b(security|vulnerability|exploit|credential leak|secret leak|malware|phishing)\b/.test(text)
  ) {
    return "security_warning";
  }
  if (/\b(delete|drop table|truncate|destroy|wipe|irreversible|permanently remove)\b/.test(text)) {
    return "irreversible_action";
  }
  if (
    /\b(clarify|explain in detail|more detail|step by step|why exactly|what do you mean)\b/.test(
      text
    )
  ) {
    return "clarification_requested";
  }
  if (
    /\b(first|then|after that|before|rollback|backup)\b[\s\S]{0,240}\b(delete|drop|migrate|deploy|release)\b/.test(
      text
    )
  ) {
    return "order_sensitive_sequence";
  }
  return null;
}

export function buildCavemanOutputInstruction(
  config: CavemanOutputModeConfig,
  language = "en"
): string {
  const intensity = config.intensity ?? "full";
  const instructions =
    CAVEMAN_INSTRUCTION_BY_LANGUAGE[language as keyof typeof CAVEMAN_INSTRUCTION_BY_LANGUAGE] ??
    CAVEMAN_INSTRUCTION_BY_LANGUAGE.en;
  return `${CAVEMAN_OUTPUT_MARKER}\n${instructions[intensity]}`;
}

export function applyCavemanOutputMode(
  body: ChatRequestBody,
  options?: Partial<CavemanOutputModeConfig>,
  language = "en"
): CavemanOutputModeResult {
  const config: CavemanOutputModeConfig = {
    ...DEFAULT_CAVEMAN_OUTPUT_MODE_CONFIG,
    ...options,
  };
  if (!config.enabled) return { body, applied: false, skippedReason: "disabled" };

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    const instruction = buildCavemanOutputInstruction(config, language);
    if (typeof body.instructions === "string") {
      if (body.instructions.includes(CAVEMAN_OUTPUT_MARKER)) {
        return { body, applied: false, skippedReason: "already_applied" };
      }
      return {
        body: {
          ...body,
          instructions: `${body.instructions.trim()}\n\n${instruction}`,
        },
        applied: true,
      };
    }
    if (typeof body.input === "string" || Array.isArray(body.input)) {
      return { body: { ...body, instructions: instruction }, applied: true };
    }
    return { body, applied: false, skippedReason: "no_messages" };
  }

  if (config.autoClarity !== false) {
    const bypass = shouldBypassCavemanOutputMode(messages);
    if (bypass) return { body, applied: false, skippedReason: bypass };
  }

  const alreadyApplied = messages.some(
    (message) =>
      message.role === "system" &&
      typeof message.content === "string" &&
      message.content.includes(CAVEMAN_OUTPUT_MARKER)
  );
  if (alreadyApplied) return { body, applied: false, skippedReason: "already_applied" };

  const instruction = buildCavemanOutputInstruction(config, language);
  const nextMessages = [...messages];
  const first = nextMessages[0];

  if (first?.role === "system" && typeof first.content === "string") {
    nextMessages[0] = {
      ...first,
      content: `${first.content.trim()}\n\n${instruction}`,
    };
  } else {
    nextMessages.unshift({ role: "system", content: instruction });
  }

  return { body: { ...body, messages: nextMessages }, applied: true };
}
