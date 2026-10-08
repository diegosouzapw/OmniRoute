# OpenCode Integration (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Stav:** Obecně dostupné.
> **Cílová skupina:** Operátoři propojující OpenCode s nasazením OmniRoute.
> **Zdroj pravdy (schéma konfigurace):** `src/shared/services/opencodeConfig.ts`
> **Zdroj pravdy (balíček npm):** `@omniroute/opencode-provider/` (publikovatelný pracovní prostor)

[OpenCode](https://opencode.ai) je agentní AI klient pro CLI a desktop. Načítá svůj katalog poskytovatelů ze souboru `~/.config/opencode/opencode.json` (nebo `opencode.jsonc`) a řídí se schématem na adrese `https://opencode.ai/config.json`. OmniRoute se vůči OpenCode prezentuje jako jeden z těchto poskytovatelů — každý požadavek prochází standardním rozhraním OmniRoute kompatibilním s OpenAI na cestě `/v1`, takže OpenCode automaticky využívá směrování Auto-Combo, jističe, zásady pro klíče, observabilitu atd.

Existují **dva podporované způsoby integrace**. Vyberte si jeden — oba vygenerují stejnou konfiguraci.

---

## Způsob 1 — generátor CLI (bez instalace přes npm)

Doporučeno pro koncové uživatele. Dodává se s OmniRoute. Zapíše změny přímo do souboru `opencode.json`.

```bash
# Po instalaci OmniRoute (npm i -g @omniroute/cli nebo místní klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI na pozadí volá `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), takže existující soubor `opencode.json` si zachová ostatní poskytovatele i komentáře. Položka OmniRoute se přidá nebo atomicky nahradí.

Výsledný soubor (výchozí katalog modelů):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<váš-klíč>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Způsob 2 — balíček npm `@omniroute/opencode-provider`

Doporučeno, pokud konfiguraci skriptujete z Node/TS (kanály CI, monorepozitáře, vlastní instalační postupy).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Volitelné: přepište katalog modelů zpřístupněný službě OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Pro nedestruktivní sloučení s existujícím souborem replikujte `mergeOpenCodeConfigText()` z `opencodeConfig.ts` nebo zavolejte generátor CLI.

Úplné API najdete v [README balíčku](../../@omniroute/opencode-provider/README.md).

---

## Co běhové prostředí ve skutečnosti dělá

Oba způsoby vytvoří stejnou hodnotu `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Za běhu OpenCode načte `@ai-sdk/openai-compatible` (již jde o tranzitivní závislost OpenCode) a nakonfiguruje jej pomocí `baseURL` + `apiKey`. Odtud pokračuje tok následovně:

```
Uživatelské rozhraní/agent OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (rozhraní OmniRoute kompatibilní s OpenAI)
         → obslužná rutina OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → kombinované směrování / Auto-Combo / vykonavatel
               → nadřazený poskytovatel
```

Plugin nikdy nepracuje přímo s HTTP. Pouze generuje konfiguraci.

---

## Výchozí nastavení katalogu modelů

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Můžete je přepsat pomocí `models: [...]`. Doporučené možnosti:

- `"auto"` — zpřístupní bezkonfigurační router [Auto-Combo](../routing/AUTO-COMBO.md) služby OmniRoute. Umožňuje OpenCode vybrat „nejlepší dostupný model“, aniž byste museli katalog pevně zadávat.
- `"<combo-name>"` — libovolná kombinace, kterou jste definovali v dashboardu; OmniRoute ji transparentně vyhodnotí.

---

## Normalizace URL

Pomocná funkce přijímá obě podoby a vždy vytvoří právě jednu koncovku `/v1`:

| Vstup                          | Výstup (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Tato deduplikace řeší **nejčastější příčinu nefunkčnosti** starších konfigurací. Pokud máte soubor `opencode.json` z doby před verzí v3.8.0, který odkazuje na `/v1/v1/...`, spusťte generátor znovu nebo znovu zavolejte `createOmniRouteProvider`.

---

## Režimy ověřování

| Nastavení OmniRoute                                   | Doporučená hodnota `apiKey`                           |
| ----------------------------------------------------- | ----------------------------------------------------- |
| `REQUIRE_API_KEY=false` (výchozí pro lokální použití) | `sk_omniroute` (doslovný zástupný symbol)             |
| `REQUIRE_API_KEY=true`                                | Skutečný uživatelský klíč API z Dashboard → API Keys. |

U klientů ve stylu Anthropic, kteří odesílají `x-api-key` + `anthropic-version`, funkce `extractApiKey` služby OmniRoute akceptuje také klíč z `x-api-key`. OpenCode používá rozhraní OpenAI, takže vždy odešle `Authorization: Bearer ${apiKey}` — zde se neuplatňuje žádný zvláštní případ pro Anthropic.

---

## Řešení problémů

| Příznak                                                             | Příčina                                                                                | Řešení                                                                                                      |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `404` u každého požadavku s URL obsahující `/v1/v1/`                | Zastaralá konfigurace z pluginu před verzí v3.8, který přidával `/v1` dvakrát.         | Znovu ji vygenerujte pomocí postupu 1 nebo 2.                                                               |
| `401 Invalid API key`                                               | OmniRoute má nastaveno `REQUIRE_API_KEY=true` a klíč není známý.                       | Vytvořte klíč v dashboardu nebo nastavte `REQUIRE_API_KEY=false` (pouze lokálně) a použijte `sk_omniroute`. |
| Seznam modelů v uživatelském rozhraní OpenCode je prázdný           | Všechny 4 výchozí modely jsou v nastavení viditelnosti poskytovatele OmniRoute skryté. | Předejte `models: ["auto", ...]`, abyste zpřístupnili modely, které jste povolili.                          |
| OpenCode vrací chybu 500 s hlášením `cannot read property 'models'` | Starší verze OpenCode (< 0.1.x) nepřijímaly vložené `models`.                          | Upgradujte OpenCode na verzi, která odpovídá schématu v1 (`opencode.ai/config.json`).                       |

---

## Viz také

- [Referenční dokumentace API](../reference/API_REFERENCE.md) — kompletní rozhraní OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — co znamená `model: "auto"`
- [README balíčku `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Zdrojový kód: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
