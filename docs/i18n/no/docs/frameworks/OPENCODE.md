# OpenCode Integration (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Generelt tilgjengelig.
> **Målgruppe:** Operatører som kobler OpenCode til en OmniRoute-distribusjon.
> **Autoritativ kilde (konfigurasjonsskjema):** `src/shared/services/opencodeConfig.ts`
> **Autoritativ kilde (npm-pakke):** `@omniroute/opencode-provider/` (publiserbart arbeidsområde)

[OpenCode](https://opencode.ai) er en agentbasert KI-klient for kommandolinjen og skrivebordet. Den leser leverandørkatalogen sin fra `~/.config/opencode/opencode.json` (eller `opencode.jsonc`) og følger skjemaet på `https://opencode.ai/config.json`. OmniRoute eksponerer seg for OpenCode som en av disse leverandørene – hver forespørsel går gjennom OmniRoutes standardiserte OpenAI-kompatible `/v1`-grensesnitt, slik at OpenCode automatisk drar nytte av Auto-Combo-ruting, effektbrytere, nøkkelpolicyer, observerbarhet osv.

Det finnes **to støttede integrasjonsmåter**. Velg én – de genererer den samme konfigurasjonen.

---

## Alternativ 1 – CLI-generator (ingen npm-installasjon)

Anbefales for sluttbrukere. Følger med OmniRoute. Skriver `opencode.json` direkte.

```bash
# Etter installasjon av OmniRoute (npm i -g @omniroute/cli eller lokal klone)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Bak kulissene kaller CLI-verktøyet `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), slik at en eksisterende `opencode.json` beholder de andre leverandørene og kommentarene sine. OmniRoute-oppføringen legges til eller erstattes atomisk.

Resulterende fil (standard modellkatalog):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<din-nøkkel>",
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

## Alternativ 2 – npm-pakken `@omniroute/opencode-provider`

Anbefales når du automatiserer konfigurasjonen fra Node/TS (CI-prosesser, monorepoer, egendefinerte installasjonsflyter).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Valgfritt: overstyr modellkatalogen som eksponeres for OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

For en ikke-destruktiv sammenslåing med en eksisterende fil kan du replikere `mergeOpenCodeConfigText()` fra `opencodeConfig.ts` eller kalle CLI-generatoren.

Se [pakkens README](../../@omniroute/opencode-provider/README.md) for hele API-et.

---

## Hva kjøretidsmiljøet faktisk gjør

Begge alternativene produserer den samme `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Under kjøring laster OpenCode inn `@ai-sdk/openai-compatible` (som allerede er en transitiv avhengighet for OpenCode) og konfigurerer den med `baseURL` + `apiKey`. Derfra:

```
OpenCode-grensesnitt/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoutes OpenAI-grensesnitt)
         → OmniRoutes /v1/chat/completions-håndterer  (open-sse/handlers/chatCore.ts)
            → kombinasjonsruting / Auto-Combo / eksekveringsmotor
               → oppstrømsleverandør
```

Programtillegget kommuniserer aldri via HTTP. Det genererer bare konfigurasjon.

---

## Standardverdier for modellkatalogen

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Du kan overstyre via `models: [...]`. Anbefalte tillegg:

- `"auto"` — gjør OmniRoutes [Auto-Combo](../routing/AUTO-COMBO.md), en konfigurasjonsfri ruter, tilgjengelig. Lar OpenCode velge «den beste tilgjengelige modellen» uten at du må hardkode katalogen.
- `"<combo-name>"` — enhver kombinasjon du har definert i kontrollpanelet; OmniRoute løser den transparent.

---

## URL-normalisering

Hjelpefunksjonen godtar begge former og genererer nøyaktig én `/v1`:

| Inndata                        | Utdata (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Denne dedupliseringen er **den vanligste feilkilden** i eldre konfigurasjoner. Hvis du har en `opencode.json` fra før v3.8.0 som peker til `/v1/v1/...`, kjør generatoren på nytt eller kall `createOmniRouteProvider` igjen.

---

## Autentiseringsmoduser

| OmniRoute-innstilling                     | Anbefalt verdi for `apiKey`                                   |
| ----------------------------------------- | ------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (standard lokalt) | `sk_omniroute` (bokstavelig plassholder)                      |
| `REQUIRE_API_KEY=true`                    | En ekte API-nøkkel per bruker fra Kontrollpanel → API-nøkler. |

For Anthropic-lignende klienter som sender `x-api-key` + `anthropic-version`, godtar OmniRoutes `extractApiKey` også nøkkelen fra `x-api-key`. OpenCode bruker OpenAI-grensesnittet og sender derfor alltid `Authorization: Bearer ${apiKey}` — ingen Anthropic-spesialbehandling gjelder her.

---

## Feilsøking

| Symptom                                                     | Årsak                                                                             | Løsning                                                                                                     |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `404` på alle forespørsler med URL som inneholder `/v1/v1/` | Utdatert konfigurasjon fra et programtillegg før v3.8 som la til `/v1` to ganger. | Generer på nytt via metode 1 eller 2.                                                                       |
| `401 Invalid API key`                                       | OmniRoute har `REQUIRE_API_KEY=true`, og nøkkelen er ukjent.                      | Opprett nøkkelen i kontrollpanelet, eller angi `REQUIRE_API_KEY=false` (kun lokalt) og bruk `sk_omniroute`. |
| Modellisten er tom i OpenCode-grensesnittet                 | Alle de fire standardmodellene er skjult i OmniRoutes leverandørsynlighet.        | Bruk `models: ["auto", ...]` for å vise modellene du har aktivert.                                          |
| OpenCode 500 med `cannot read property 'models'`            | Eldre OpenCode (< 0.1.x) godtok ikke innebygd `models`.                           | Oppgrader OpenCode til en versjon som følger v1-skjemaet (`opencode.ai/config.json`).                       |

---

## Se også

- [API-referanse](../reference/API_REFERENCE.md) — hele OmniRoute REST-grensesnittet
- [Auto-Combo](../routing/AUTO-COMBO.md) — hva `model: "auto"` betyr
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Kilde: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
