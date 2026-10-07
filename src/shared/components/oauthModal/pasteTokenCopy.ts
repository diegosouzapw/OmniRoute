const PASTE_TAB_KEYS: Record<string, string> = {
  "grok-cli": "tabImportAuthJson",
  claude: "tabPasteSetupToken",
};

const PASTE_DESCRIPTION_KEYS: Record<string, string> = {
  "devin-desktop": "devinDesktopPasteDescription",
  "grok-cli": "grokAuthJsonDescription",
  claude: "claudeSetupTokenDescription",
};

const PASTE_PLACEHOLDER_KEYS: Record<string, string> = {
  claude: "claudeSetupTokenPlaceholder",
};

/** `oauthModal` message keys for a provider's paste-token tab, description and input placeholder. */
export function getPasteTokenCopyKeys(provider: string) {
  return {
    tab: PASTE_TAB_KEYS[provider] ?? "tabPasteApiKey",
    description: PASTE_DESCRIPTION_KEYS[provider] ?? "devinPasteDescription",
    placeholder: PASTE_PLACEHOLDER_KEYS[provider] ?? "apiTokenPlaceholder",
  };
}
