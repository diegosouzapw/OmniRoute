const LANGUAGE_HINTS: Record<string, RegExp[]> = {
  "pt-BR": [/\b(?:voce|você|preciso|arquivo|codigo|código|erro|falha|obrigado)\b/i],
  es: [/\b(?:necesito|archivo|codigo|código|error|fallo|gracias|puedes)\b/i],
  de: [/\b(?:ich|datei|fehler|bitte|kannst|konfiguration|danke)\b/i],
  fr: [/\b(?:fichier|erreur|merci|peux|configuration|besoin)\b/i],
  ja: [/[\u3040-\u30ff]/],
};

export function detectCompressionLanguage(text: string): string {
  for (const [language, patterns] of Object.entries(LANGUAGE_HINTS)) {
    if (patterns.some((pattern) => pattern.test(text))) return language;
  }
  return "en";
}

export function listSupportedCompressionLanguages(): string[] {
  return ["en", ...Object.keys(LANGUAGE_HINTS)];
}
