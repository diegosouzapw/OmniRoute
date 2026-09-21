# OpenCode Integration (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Allmänt tillgänglig.
> **Målgrupp:** Operatörer som kopplar OpenCode till en OmniRoute-distribution.
> **Sanningskälla (konfigurationsschema):** `src/shared/services/opencodeConfig.ts`
> **Sanningskälla (npm-paket):** `@omniroute/opencode-provider/` (publicerbar arbetsyta)

[OpenCode](https://opencode.ai) är en agentbaserad AI-klient för CLI och skrivbord. Den läser sin leverantörskatalog från `~/.config/opencode/opencode.json` (eller `opencode.jsonc`) och följer schemat på `https://opencode.ai/config.json`. OmniRoute exponerar sig för OpenCode som en av dessa leverantörer — varje begäran går genom OmniRoutes standardiserade OpenAI-kompatibla `/v1`-gränssnitt, så OpenCode får automatiskt fördelarna med Auto-Combo-dirigering, kretsbrytare, nyckelpolicyer, observerbarhet osv.

Det finns **två integrationsvägar som stöds**. Välj en — de genererar samma konfiguration.

---

## Väg 1 — CLI-generator (ingen npm-installation)

Rekommenderas för slutanvändare. Medföljer OmniRoute. Skriver `opencode.json` direkt.

```bash
# Efter installation av OmniRoute (npm i -g @omniroute/cli eller lokal klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Bakom kulisserna anropar CLI:t `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), så en befintlig `opencode.json` behåller sina övriga leverantörer och kommentarer. OmniRoute-posten läggs till eller ersätts atomärt.

Resulterande fil (standardkatalog för modeller):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
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

## Väg 2 — npm-paketet `@omniroute/opencode-provider`

Rekommenderas när du skriptar konfigurationen från Node/TS (CI-pipelines, monorepon, anpassade installationsflöden).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Valfritt: åsidosätt modellkatalogen som exponeras för OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

För en icke-destruktiv sammanslagning med en befintlig fil kan du återskapa `mergeOpenCodeConfigText()` från `opencodeConfig.ts` eller anropa CLI-generatorn.

Se [paketets README](../../@omniroute/opencode-provider/README.md) för hela API:t.

---

## Vad körningen faktiskt gör

Båda vägarna producerar samma `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Vid körning läser OpenCode in `@ai-sdk/openai-compatible` (som redan är ett transitivt beroende till OpenCode) och konfigurerar det med `baseURL` + `apiKey`. Därefter:

```
OpenCode-gränssnitt/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoutes OpenAI-gränssnitt)
         → OmniRoutes hanterare för /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → kombinationsdirigering / Auto-Combo / exekverare
               → uppströmsleverantör
```

Pluginen hanterar aldrig HTTP. Den genererar endast konfiguration.

---

## Standardvärden för modellkatalogen

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Du kan åsidosätta detta via `models: [...]`. Rekommenderade tillägg:

- `"auto"` — gör OmniRoutes [Auto-Combo](../routing/AUTO-COMBO.md), en router utan konfiguration, tillgänglig. Låter OpenCode välja ”den bästa tillgängliga modellen” utan att du hårdkodar katalogen.
- `"<combo-name>"` — valfri kombination som du har definierat i instrumentpanelen; OmniRoute matchar den transparent.

---

## URL-normalisering

Hjälpfunktionen accepterar båda formerna och genererar exakt en `/v1`:

| Indata                         | Utdata (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Denna deduplicering är **det vanligaste felet** i äldre konfigurationer. Om du har en `opencode.json` från före v3.8.0 som pekar på `/v1/v1/...` ska du köra generatorn igen eller anropa `createOmniRouteProvider` på nytt.

---

## Autentiseringslägen

| OmniRoute-inställning                     | Rekommenderat värde för `apiKey`                              |
| ----------------------------------------- | ------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (standard lokalt) | `sk_omniroute` (bokstavlig platshållare)                      |
| `REQUIRE_API_KEY=true`                    | En riktig API-nyckel per användare från Dashboard → API Keys. |

För klienter av Anthropic-typ som skickar `x-api-key` + `anthropic-version` godtar OmniRoutes `extractApiKey` även nyckeln från `x-api-key`. OpenCode använder OpenAI-gränssnittet, så det skickar alltid `Authorization: Bearer ${apiKey}` — inget särskilt Anthropic-fall gäller här.

---

## Felsökning

| Symptom                                                     | Orsak                                                                                      | Åtgärd                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `404` för varje begäran med en URL som innehåller `/v1/v1/` | Inaktuell konfiguration från ett plugin före v3.8 som lade till suffixet `/v1` två gånger. | Generera om via väg 1 eller 2.                                                                                  |
| `401 Invalid API key`                                       | OmniRoute har `REQUIRE_API_KEY=true` och nyckeln är okänd.                                 | Skapa nyckeln i instrumentpanelen eller ange `REQUIRE_API_KEY=false` (endast lokalt) och använd `sk_omniroute`. |
| Modellistan är tom i OpenCodes användargränssnitt           | Alla fyra standardmodeller är dolda genom OmniRoutes leverantörssynlighet.                 | Skicka `models: ["auto", ...]` för att visa de modeller du har aktiverat.                                       |
| OpenCode 500 med `cannot read property 'models'`            | Äldre OpenCode (< 0.1.x) godtog inte infogade `models`.                                    | Uppgradera OpenCode till en version som följer v1-schemat (`opencode.ai/config.json`).                          |

---

## Se även

- [API-referens](../reference/API_REFERENCE.md) — hela OmniRoute REST-ytan
- [Auto-Combo](../routing/AUTO-COMBO.md) — vad `model: "auto"` betyder
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Källa: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
