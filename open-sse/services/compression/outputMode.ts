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

/**
 * Shared boundary clause — appended to every intensity level.
 * Tells the model which contexts warrant a temporary return to normal style,
 * matching the caveman skill's SHARED_BOUNDARIES contract
 * (https://github.com/JuliusBrussee/caveman).
 */
export const SHARED_BOUNDARIES =
  "Code blocks, file paths, commands, errors, URLs: keep exact. Security warnings, irreversible action confirmations, multi-step ordered sequences: write normal. Resume terse style after. Active every response until user asks for normal mode.";

export const CAVEMAN_INSTRUCTION_BY_LANGUAGE = {
  en: {
    lite: `Respond concise. Drop filler, pleasantries, hedging. Keep full sentences, technical terms, code, errors, URLs, and identifiers exact. ${SHARED_BOUNDARIES}`,
    full: `Respond terse like smart caveman. Drop articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging. Fragments OK. Short synonyms (big not extensive, fix not implement). Keep all technical substance, code, errors, URLs, identifiers exact. ${SHARED_BOUNDARIES}`,
    ultra: `Respond ultra terse. Maximum compression. Telegraphic. Abbreviate (DB/auth/config/req/res/fn/impl), strip conjunctions, arrows for causality (X → Y). One word when one word enough. Never abbreviate code symbols, API names, error strings, URLs, or identifiers. ${SHARED_BOUNDARIES}`,
  },
  "pt-BR": {
    lite: `Responda conciso. Remova enrolacao, cortesias e incerteza. Preserve termos tecnicos, codigo, erros, URLs e identificadores exatamente. ${SHARED_BOUNDARIES}`,
    full: `Responda seco e compacto. Frases curtas OK. Preserve todo conteudo tecnico, codigo, erros, URLs e identificadores exatamente. ${SHARED_BOUNDARIES}`,
    ultra: `Responda ultra compacto. Use prosa tecnica curta e abreviacoes comuns como DB/auth/config/req/res/fn. Nunca abrevie simbolos de codigo, APIs, erros, URLs ou identificadores. ${SHARED_BOUNDARIES}`,
  },
  hu: {
    lite: `Válaszolj tömören. Hagyd el a tölteléket, udvariaskodást és bizonytalanságot. Tartsd meg a teljes mondatokat, technikai kifejezéseket, kódot, hibákat, URL-eket és azonosítókat pontosan. ${SHARED_BOUNDARIES}`,
    full: `Válaszolj tömören, mint egy okos barlanglakó. Hagyd el a tölteléket, udvariaskodást és körülírást. Rövid mondatok és töredékek rendben. Tartsd meg minden technikai tartalmat, kódot, hibát, URL-t és azonosítót pontosan. ${SHARED_BOUNDARIES}`,
    ultra: `Válaszolj ultra tömören. Maximális tömörítés, távirati stílus. Használj gyakori rövidítéseket (DB/auth/config/req/res/fn/impl), és hagyd el a felesleges kötőszavakat. Soha ne rövidíts kódszimbólumokat, API-neveket, hibaüzeneteket, URL-eket vagy azonosítókat. ${SHARED_BOUNDARIES}`,
  },
  es: {
    lite: `Responde conciso. Quita relleno, cortesias y dudas. Conserva terminos tecnicos, codigo, errores, URLs e identificadores exactos. ${SHARED_BOUNDARIES}`,
    full: `Responde seco y compacto. Fragmentos OK. Conserva todo el contenido tecnico, codigo, errores, URLs e identificadores exactos. ${SHARED_BOUNDARIES}`,
    ultra: `Responde ultra compacto. Usa prosa tecnica corta y abreviaturas comunes como DB/auth/config/req/res/fn. Nunca abrevies simbolos de codigo, APIs, errores, URLs o identificadores. ${SHARED_BOUNDARIES}`,
  },
  de: {
    lite: `Antworte knapp. Entferne Fuellwoerter, Hoeflichkeit und Unsicherheit. Bewahre Fachbegriffe, Code, Fehler, URLs und Bezeichner exakt. ${SHARED_BOUNDARIES}`,
    full: `Antworte sehr knapp. Fragmente OK. Bewahre alle technischen Inhalte, Code, Fehler, URLs und Bezeichner exakt. ${SHARED_BOUNDARIES}`,
    ultra: `Antworte ultra knapp. Nutze kurze technische Prosa und uebliche Abkuerzungen wie DB/auth/config/req/res/fn. Code-Symbole, APIs, Fehler, URLs und Bezeichner nie abkuerzen. ${SHARED_BOUNDARIES}`,
  },
  fr: {
    lite: `Reponds concis. Retire remplissage, politesses et hesitations. Garde termes techniques, code, erreurs, URLs et identifiants exacts. ${SHARED_BOUNDARIES}`,
    full: `Reponds tres compact. Fragments OK. Garde tout le contenu technique, code, erreurs, URLs et identifiants exacts. ${SHARED_BOUNDARIES}`,
    ultra: `Reponds ultra compact. Utilise une prose technique courte et des abreviations communes comme DB/auth/config/req/res/fn. N'abrege jamais symboles de code, APIs, erreurs, URLs ou identifiants. ${SHARED_BOUNDARIES}`,
  },
  ja: {
    lite: `簡潔に回答。冗長表現、挨拶、曖昧表現を削る。技術用語、コード、エラー、URL、識別子は正確に保持。${SHARED_BOUNDARIES}`,
    full: `短く圧縮して回答。断片文可。技術内容、コード、エラー、URL、識別子は正確に保持。${SHARED_BOUNDARIES}`,
    ultra: `超短く回答。DB/auth/config/req/res/fn など一般的な略語は可。コード記号、API名、エラー文字列、URL、識別子は省略しない。${SHARED_BOUNDARIES}`,
  },
  id: {
    lite: `Jawab ringkas. Hapus pengisi, salam sopan santun, keraguan. Pertahankan istilah teknis, kode, error, URL, & identifier secara persis. ${SHARED_BOUNDARIES}`,
    full: `Jawab sangat singkat ala caveman pintar. Hapus kata pengisi (hanya/sangat/sebenarnya), salam sopan santun. Kalimat pendek/tidak lengkap OK. Gunakan sinonim pendek. Pertahankan semua substansi teknis, kode, error, URL, & identifier secara persis. ${SHARED_BOUNDARIES}`,
    ultra: `Jawab ultra singkat. Kompresi maksimal. Gunakan singkatan umum (DB/auth/config/req/res/fn/impl), hilangkan kata hubung, gunakan panah untuk kausalitas (X → Y). Satu kata jika cukup. Jangan singkat simbol kode, nama API, string error, URL, atau identifier. ${SHARED_BOUNDARIES}`,
  },
  vi: {
    lite: `Trả lời súc tích. Bỏ từ đệm, sáo rỗng, rào đón. Giữ nguyên câu hoàn chỉnh, thuật ngữ kỹ thuật, code, lỗi, URL và định danh. ${SHARED_BOUNDARIES}`,
    full: `Trả lời cộc lốc như người tối cổ thông minh. Bỏ mạo từ, từ đệm, sáo rỗng, rào đón. Chấp nhận câu rút gọn. Dùng từ đồng nghĩa ngắn. Giữ nguyên mọi nội dung kỹ thuật, code, lỗi, URL và định danh. ${SHARED_BOUNDARIES}`,
    ultra: `Trả lời cực kỳ cộc lốc. Nén tối đa. Như điện tín. Viết tắt (DB/auth/config/req/res/fn/impl), bỏ liên từ, dùng mũi tên cho quan hệ nhân quả (X → Y). Một từ nếu một từ là đủ. Không bao giờ viết tắt ký hiệu code, tên API, chuỗi lỗi, URL hoặc định danh. ${SHARED_BOUNDARIES}`,
  },
  it: {
    lite: `Rispondi conciso. Togli riempitivi, convenevoli e incertezze. Mantieni termini tecnici, codice, errori, URL e identificatori esatti. ${SHARED_BOUNDARIES}`,
    full: `Rispondi secco e compatto. Frammenti OK. Mantieni tutto il contenuto tecnico, codice, errori, URL e identificatori esatti. ${SHARED_BOUNDARIES}`,
    ultra: `Rispondi ultra compatto. Usa prosa tecnica breve e abbreviazioni comuni come DB/auth/config/req/res/fn. Mai abbreviare simboli di codice, API, errori, URL o identificatori. ${SHARED_BOUNDARIES}`,
  },
  ru: {
    lite: `Отвечай кратко. Убирай воду, любезности и оговорки. Технические термины, код, ошибки, URL и идентификаторы сохраняй точно. ${SHARED_BOUNDARIES}`,
    full: `Отвечай сухо и сжато. Фрагменты допустимы. Всё техническое содержимое, код, ошибки, URL и идентификаторы сохраняй точно. ${SHARED_BOUNDARIES}`,
    ultra: `Отвечай ультракратко. Короткая техническая проза и общепринятые сокращения вроде DB/auth/config/req/res/fn. Никогда не сокращай символы кода, API, строки ошибок, URL или идентификаторы. ${SHARED_BOUNDARIES}`,
  },
  zh: {
    lite: `回答要简洁。去掉废话、客套和含糊措辞。技术术语、代码、错误、URL 和标识符保持原样。${SHARED_BOUNDARIES}`,
    full: `回答干脆紧凑。可用短句。所有技术内容、代码、错误、URL 和标识符保持原样。${SHARED_BOUNDARIES}`,
    ultra: `回答极度紧凑。用简短技术表述和常见缩写如 DB/auth/config/req/res/fn。绝不缩写代码符号、API 名、错误串、URL 或标识符。${SHARED_BOUNDARIES}`,
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

  // Check idempotency before bypass so the marker in an already-injected system
  // message doesn't trigger a false-positive bypass (e.g. SHARED_BOUNDARIES keywords).
  const alreadyApplied = messages.some(
    (message) =>
      message.role === "system" &&
      typeof message.content === "string" &&
      message.content.includes(CAVEMAN_OUTPUT_MARKER)
  );
  if (alreadyApplied) return { body, applied: false, skippedReason: "already_applied" };

  if (config.autoClarity !== false) {
    const bypass = shouldBypassCavemanOutputMode(messages);
    if (bypass) return { body, applied: false, skippedReason: bypass };
  }

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
