# OpenCode Integration (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Status:** Općenito dostupno.
> **Publika:** Operateri koji povezuju OpenCode s OmniRoute implementacijom.
> **Izvor istine (konfiguracijska shema):** `src/shared/services/opencodeConfig.ts`
> **Izvor istine (npm paket):** `@omniroute/opencode-provider/` (radni prostor koji se može objaviti)

[OpenCode](https://opencode.ai) je agentski CLI/stolni AI klijent. Svoj katalog pružatelja čita iz `~/.config/opencode/opencode.json` (ili `opencode.jsonc`) i slijedi shemu na adresi `https://opencode.ai/config.json`. OmniRoute se OpenCodeu predstavlja kao jedan od tih pružatelja — svaki zahtjev prolazi kroz standardno OpenAI-kompatibilno `/v1` sučelje OmniRoutea, pa OpenCode automatski koristi prednosti Auto-Combo usmjeravanja, prekidača strujnog kruga, pravila za ključeve, opservabilnosti itd.

Postoje **dva podržana načina integracije**. Odaberite jedan — oba generiraju istu konfiguraciju.

---

## 1. način — CLI generator (bez npm instalacije)

Preporučuje se krajnjim korisnicima. Isporučuje se s OmniRouteom. Izravno zapisuje `opencode.json`.

```bash
# Nakon instaliranja OmniRoutea (npm i -g @omniroute/cli ili lokalni klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI u pozadini poziva `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), pa postojeći `opencode.json` zadržava ostale pružatelje i komentare. Unos za OmniRoute dodaje se ili zamjenjuje atomski.

Rezultirajuća datoteka (zadani katalog modela):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<vaš-ključ>",
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

## 2. način — npm paket `@omniroute/opencode-provider`

Preporučuje se kada konfiguraciju skriptirate iz Nodea/TS-a (CI procesi, monorepozitoriji, prilagođeni tijekovi instalacije).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Neobavezno: nadjačajte katalog modela izložen OpenCodeu
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Za nedestruktivno spajanje s postojećom datotekom replicirajte `mergeOpenCodeConfigText()` iz `opencodeConfig.ts` ili pozovite CLI generator.

Cjeloviti API potražite u [README-u paketa](../../@omniroute/opencode-provider/README.md).

---

## Što izvršno okruženje zapravo radi

Oba načina proizvode isti `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Tijekom izvođenja OpenCode učitava `@ai-sdk/openai-compatible` (koji je već prijelazna ovisnost OpenCodea) i konfigurira ga pomoću `baseURL` + `apiKey`. Od tog trenutka:

```
OpenCode korisničko sučelje/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI sučelje OmniRoutea)
         → OmniRoute rukovatelj /v1/chat/completions  (open-sse/handlers/chatCore.ts)
            → kombinirano usmjeravanje / Auto-Combo / izvršitelj
               → nadređeni pružatelj
```

Dodatak nikada ne pristupa HTTP-u. On samo generira konfiguraciju.

---

## Zadane postavke kataloga modela

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Možete ih nadjačati putem `models: [...]`. Preporučeni dodaci:

- `"auto"` — omogućuje OmniRouteov [Auto-Combo](../routing/AUTO-COMBO.md) usmjerivač bez potrebe za konfiguracijom. Omogućuje OpenCodeu da odabere „najbolji dostupni model” bez ručnog definiranja kataloga.
- `"<combo-name>"` — bilo koja kombinacija koju ste definirali na nadzornoj ploči; OmniRoute je razrješava transparentno.

---

## Normalizacija URL-a

Pomoćna funkcija prihvaća oba oblika i generira točno jedan `/v1`:

| Ulaz                           | Izlaz (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Ova deduplikacija je **najčešći uzrok neispravnosti** u starijim konfiguracijama. Ako imate `opencode.json` iz verzije prije v3.8.0 koji upućuje na `/v1/v1/...`, ponovno pokrenite generator ili ponovno pozovite `createOmniRouteProvider`.

---

## Načini autentifikacije

| Postavka OmniRoutea                         | Preporučena vrijednost za `apiKey`                                         |
| ------------------------------------------- | -------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (zadano za lokalno) | `sk_omniroute` (doslovna zamjenska vrijednost)                             |
| `REQUIRE_API_KEY=true`                      | Stvarni API ključ za pojedinog korisnika iz Nadzorna ploča → API ključevi. |

Za klijente u stilu Anthropica koji šalju `x-api-key` + `anthropic-version`, OmniRouteov `extractApiKey` također prihvaća ključ iz `x-api-key`. OpenCode koristi OpenAI sučelje, pa će uvijek slati `Authorization: Bearer ${apiKey}` — ovdje se ne primjenjuje poseban slučaj za Anthropic.

---

## Otklanjanje poteškoća

| Simptom                                                 | Uzrok                                                                           | Rješenje                                                                                                           |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `404` na svakom zahtjevu s URL-om koji sadrži `/v1/v1/` | Zastarjela konfiguracija dodatka prije v3.8 koja je dvaput dodavala `/v1`.      | Ponovno je generirajte putem 1. ili 2. načina.                                                                     |
| `401 Invalid API key`                                   | OmniRoute ima `REQUIRE_API_KEY=true`, a ključ nije poznat.                      | Izradite ključ na nadzornoj ploči ili postavite `REQUIRE_API_KEY=false` (samo lokalno) i koristite `sk_omniroute`. |
| Popis modela prazan je u korisničkom sučelju OpenCodea  | Sva 4 zadana modela skrivena su u postavkama vidljivosti pružatelja OmniRoutea. | Proslijedite `models: ["auto", ...]` kako bi se prikazali oni koje ste omogućili.                                  |
| OpenCode vraća 500 uz `cannot read property 'models'`   | Starije verzije OpenCodea (< 0.1.x) nisu prihvaćale ugrađeni `models`.          | Nadogradite OpenCode na verziju koja slijedi v1 shemu (`opencode.ai/config.json`).                                 |

---

## Vidi također

- [Referenca API-ja](../reference/API_REFERENCE.md) — cjelovit pregled OmniRoute REST sučelja
- [Auto-Combo](../routing/AUTO-COMBO.md) — što znači `model: "auto"`
- [README za `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Izvor: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
