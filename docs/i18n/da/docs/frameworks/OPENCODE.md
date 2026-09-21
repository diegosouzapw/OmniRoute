# OpenCode Integration (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Generelt tilgængelig.
> **Målgruppe:** Driftsansvarlige, der forbinder OpenCode med en OmniRoute-installation.
> **Autoritativ kilde (konfigurationsskema):** `src/shared/services/opencodeConfig.ts`
> **Autoritativ kilde (npm-pakke):** `@omniroute/opencode-provider/` (publicerbart workspace)

[OpenCode](https://opencode.ai) er en agentbaseret AI-klient til CLI og desktop. Den læser sit udbyderkatalog fra `~/.config/opencode/opencode.json` (eller `opencode.jsonc`) og følger skemaet på `https://opencode.ai/config.json`. OmniRoute præsenterer sig for OpenCode som en af disse udbydere — hver anmodning går gennem OmniRoutes standardmæssige OpenAI-kompatible `/v1`-grænseflade, så OpenCode automatisk får fordel af Auto-Combo-routing, circuit breakers, nøglepolitikker, observerbarhed osv.

Der er **to understøttede integrationsmetoder**. Vælg én — de genererer den samme konfiguration.

---

## Metode 1 — CLI-generator (ingen npm-installation)

Anbefales til slutbrugere. Leveres med OmniRoute. Skriver direkte til `opencode.json`.

```bash
# Efter installation af OmniRoute (npm i -g @omniroute/cli eller lokal klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Bag kulisserne kalder CLI'en `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), så en eksisterende `opencode.json` beholder sine øvrige udbydere og kommentarer. OmniRoute-posten tilføjes eller erstattes atomisk.

Resulterende fil (standardmodelkatalog):

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

## Metode 2 — npm-pakken `@omniroute/opencode-provider`

Anbefales, når du automatiserer konfigurationen fra Node/TS (CI-pipelines, monorepos, brugerdefinerede installationsforløb).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Valgfrit: Tilsidesæt modelkataloget, der eksponeres for OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Hvis du vil foretage en ikke-destruktiv fletning med en eksisterende fil, skal du replikere `mergeOpenCodeConfigText()` fra `opencodeConfig.ts` eller kalde CLI-generatoren.

Se pakkens [README](../../@omniroute/opencode-provider/README.md) for det komplette API.

---

## Hvad runtime-miljøet rent faktisk gør

Begge metoder producerer den samme `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Under kørsel indlæser OpenCode `@ai-sdk/openai-compatible` (som allerede er en transitiv afhængighed i OpenCode) og konfigurerer den med `baseURL` + `apiKey`. Derefter:

```
OpenCode-brugerflade/-agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoutes OpenAI-grænseflade)
         → OmniRoutes handler til /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → kombinationsrouting / Auto-Combo / eksekveringsmotor
               → ekstern udbyder
```

Pluginet håndterer aldrig HTTP. Det genererer kun konfiguration.

---

## Standarder for modelkataloget

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Du kan tilsidesætte dem via `models: [...]`. Anbefalede tilføjelser:

- `"auto"` — viser OmniRoutes konfigurationsfri router [Auto-Combo](../routing/AUTO-COMBO.md). Gør det muligt for OpenCode at vælge "den bedste tilgængelige model", uden at du behøver at hardkode kataloget.
- `"<combo-name>"` — enhver kombination, du har defineret i dashboardet; OmniRoute slår den automatisk op.

---

## URL-normalisering

Hjælpefunktionen accepterer begge former og tilføjer præcis én `/v1`:

| Input                          | Output (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Denne deduplikering er **den mest almindelige årsag til fejl** i ældre konfigurationer. Hvis du har en `opencode.json` fra før v3.8.0, som peger på `/v1/v1/...`, skal du køre generatoren igen eller kalde `createOmniRouteProvider` på ny.

---

## Godkendelsestilstande

| OmniRoute-indstilling                        | Anbefalet værdi for `apiKey`                                 |
| -------------------------------------------- | ------------------------------------------------------------ |
| `REQUIRE_API_KEY=false` (standard for lokal) | `sk_omniroute` (bogstavelig pladsholder)                     |
| `REQUIRE_API_KEY=true`                       | En rigtig brugerspecifik API-nøgle fra Dashboard → API Keys. |

For klienter i Anthropic-stil, der sender `x-api-key` + `anthropic-version`, accepterer OmniRoutes `extractApiKey` også nøglen fra `x-api-key`. OpenCode bruger OpenAI-grænsefladen, så den sender altid `Authorization: Bearer ${apiKey}` — der gælder ingen særlig Anthropic-undtagelse her.

---

## Fejlfinding

| Symptom                                                        | Årsag                                                                        | Løsning                                                                                               |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `404` på alle anmodninger med en URL, der indeholder `/v1/v1/` | Forældet konfiguration fra et plugin før v3.8, som tilføjede `/v1` to gange. | Generér den igen via sti 1 eller 2.                                                                   |
| `401 Invalid API key`                                          | OmniRoute har `REQUIRE_API_KEY=true`, og nøglen er ukendt.                   | Opret nøglen i dashboardet, eller angiv `REQUIRE_API_KEY=false` (kun lokalt), og brug `sk_omniroute`. |
| Modellisten er tom i OpenCode-brugerfladen                     | Alle 4 standardmodeller er skjult i OmniRoutes udbydersynlighed.             | Angiv `models: ["auto", ...]` for at vise dem, du har aktiveret.                                      |
| OpenCode 500 med `cannot read property 'models'`               | Ældre OpenCode (< 0.1.x) accepterede ikke indlejrede `models`.               | Opgradér OpenCode til en version, der følger v1-skemaet (`opencode.ai/config.json`).                  |

---

## Se også

- [API-reference](../reference/API_REFERENCE.md) — hele OmniRoute REST-grænsefladen
- [Auto-Combo](../routing/AUTO-COMBO.md) — hvad `model: "auto"` betyder
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Kilde: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
