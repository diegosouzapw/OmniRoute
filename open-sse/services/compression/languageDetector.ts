const LANGUAGE_HINTS: Record<string, RegExp[]> = {
  "pt-BR": [/\b(?:voce|você|preciso|arquivo|codigo|código|erro|falha|obrigado)\b/i],
  // NOTE: English-ambiguous words are intentionally excluded — "error" (es) and
  // "configuration" (fr) are identical in English and would misclassify English text.
  // Spanish/French keep their distinctive native spellings (fallo / erreur, etc).
  es: [/\b(?:necesito|archivo|codigo|código|fallo|gracias|puedes)\b/i],
  de: [/\b(?:ich|datei|fehler|bitte|kannst|konfiguration|danke)\b/i],
  fr: [/\b(?:fichier|erreur|merci|peux|besoin)\b/i],
  ja: [/[\u3040-\u30ff]/],
  id: [/\b(?:saya|kamu|anda|dengan|untuk|yang|tidak|bisa|terima\s+kasih|dari)\b/i],
};

/**
 * Score each language by the NUMBER of native-keyword hits and pick the highest
 * (English-ambiguous words are excluded from the hint lists, so a lone shared word
 * never misclassifies English). Highest score wins; ties keep the earlier language;
 * zero hits → English. (B-LANG-DETECTOR)
 */
export function detectCompressionLanguage(text: string): string {
  // CJK disambiguation: Han ideographs (U+4E00–U+9FFF) are shared by Chinese and Japanese, but
  // kana (U+3040–U+30FF) is Japanese-exclusive. Text with Han and no kana is Chinese (zh); text
  // with kana falls through to the scorer below, where the `ja` kana hint catches it. Keeping zh
  // out of the additive scorer means a Han-heavy Japanese sentence is never misread as Chinese.
  if (/[一-鿿]/.test(text) && !/[぀-ヿ]/.test(text)) {
    return "zh";
  }

  let best = "en";
  let bestScore = 0;
  for (const [language, patterns] of Object.entries(LANGUAGE_HINTS)) {
    let score = 0;
    for (const pattern of patterns) {
      const global = pattern.flags.includes("g")
        ? pattern
        : new RegExp(pattern.source, pattern.flags + "g");
      const matches = text.match(global);
      if (matches) score += matches.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = language;
    }
  }
  return best;
}

export function listSupportedCompressionLanguages(): string[] {
  // zh is detected via the CJK Han/kana disambiguation in detectCompressionLanguage rather than a
  // keyword hint (so it stays out of the additive scorer), hence it is listed explicitly here.
  return ["en", "zh", ...Object.keys(LANGUAGE_HINTS)];
}
