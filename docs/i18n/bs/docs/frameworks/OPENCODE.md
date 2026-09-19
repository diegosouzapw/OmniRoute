# OPENCODE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

# OpenCode integracija

> **Status:** Općenito dostupno.
> **Publika:** Operateri koji povezuju OpenCode sa OmniRoute implementacijom.
> **Izvor istine (config schema):** `src/shared/services/opencodeConfig.ts`
> **Izvor istine (npm paket):** `@omniroute/opencode-provider/` (objavljivi radni prostor)

[OpenCode](https://opencode.ai) je agentski CLI/desktop AI klijent. On čita svoj katalog provajdera iz `~/.config/opencode/opencode.json` (ili `opencode.jsonc`) i prati šemu na `https://opencode.ai/config.json`. OmniRoute se izlaže OpenCode-u kao jedan od tih provajdera — svaki zahtjev prolazi kroz OmniRoute-ovu standardnu OpenAI-kompatibilnu `/v1` površinu, tako da OpenCode automatski ima koristi od Auto-Combo rutiranja, prekidača strujnog kola (circuit breakers), politika ključeva, opservabilnosti, itd.

Postoje **dva podržana puta integracije**. Odaberite jedan — oni generišu istu konfiguraciju.

---

## Put 1 — CLI generator (bez npm instalacije)

Preporučeno za krajnje korisnike. Isporučuje se uz OmniRoute. Upisuje `opencode.json` na licu mjesta.

```bash
# Nakon instalacije OmniRoute (npm i -g @omniroute/cli ili lokalni klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

U pozadini, CLI poziva `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), tako da postojeći `opencode.json` zadržava svoje druge provajdere i komentare. OmniRoute unos se dodaje/zamjenjuje atomski.

Rezultujuća datoteka (podrazumijevani katalog modela):

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

## Put 2 — npm paket `@omniroute/opencode-provider`

Preporučeno kada skriptujete konfiguraciju iz Node/TS (CI cjevovodi, monorepos, prilagođeni tokovi instalatera).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Opcionalno: nadjačajte katalog modela izložen OpenCode-u
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Za nedestruktivno spajanje sa postojećom datotekom, replicirajte `mergeOpenCodeConfigText()` iz `opencodeConfig.ts` ili pozovite CLI generator.

Pogledajte [README paketa](../../@omniroute/opencode-provider/README.md) za puni API.

---

## Šta runtime zapravo radi

Obje putanje proizvode isti `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. U runtime-u, OpenCode učitava `@ai-sdk/openai-compatible` (koji je već tranzitivna zavisnost OpenCode-a) i konfiguriše ga sa `baseURL` + `apiKey`. Od tog trenutka:

```
OpenCode UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI površina)
         → OmniRoute /v1/chat/completions handler     (open-sse/handlers/chatCore.ts)
            → combo rutiranje / Auto-Combo / izvršilac
               → upstream provider
```

Plugin nikada ne dira HTTP. On samo emituje konfiguraciju.

---

## Podrazumijevane vrijednosti kataloga modela

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Možete napraviti nadjačavanje (override) putem `models: [...]`. Preporučeni dodaci:

- `"auto"` — prikazuje OmniRoute-ov [Auto-Combo](../routing/AUTO-COMBO.md) zero-config ruter. Omogućava OpenCode-u da odabere "najbolji dostupni model" bez da vi hard-kodirate katalog.
- `"<combo-name>"` — bilo koji combo koji ste definisali na kontrolnoj tabli; OmniRoute ga transparentno razrješava.

---

## Normalizacija URL-a

Pomoćni alat (helper) prihvata oba oblika i emituje tačno jedan `/v1`:

| Ulaz                           | Izlaz (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Ova deduplikacija je **najčešći uzrok kvara** viđen u starijim konfiguracijama. Ako imate `opencode.json` od prije v3.8.0 koji pokazuje na `/v1/v1/...`, ponovo pokrenite generator ili ponovo pozovite `createOmniRouteProvider`.

---

## Režimi autentifikacije

| OmniRoute postavka                                   | Preporučena `apiKey` vrijednost                                   |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (podrazumijevano za lokalno) | `sk_omniroute` (literal placeholder)                              |
| `REQUIRE_API_KEY=true`                               | Stvarni API ključ po korisniku sa kontrolne table → API ključevi. |

Za klijente u Anthropic stilu koji šalju `x-api-key` + `anthropic-version`, OmniRoute-ov `extractApiKey` takođe uvažava ključ iz `x-api-key`. OpenCode koristi OpenAI površinu, tako da će uvijek slati `Authorization: Bearer ${apiKey}` — ovdje se ne primjenjuje nikakav poseban slučaj za Anthropic.

---

## Rješavanje problema

| Simptom                                                  | Uzrok                                                                                | Rješenje                                                                                                             |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `404` na svakom zahtjevu sa URL-om koji sadrži `/v1/v1/` | Zastarela konfiguracija iz plugina prije v3.8 koja je dvostruko dodala sufiks `/v1`. | Ponovo generišite putem Putanje 1 ili 2.                                                                             |
| `401 Invalid API key`                                    | OmniRoute ima `REQUIRE_API_KEY=true`, a ključ je nepoznat.                           | Kreirajte ključ na kontrolnoj tabli ili postavite `REQUIRE_API_KEY=false` (samo lokalno) i koristite `sk_omniroute`. |
| Lista modela prazna u OpenCode UI-u                      | Sva 4 podrazumijevana modela su skrivena u vidljivosti OmniRoute provajdera.         | Proslijedite `models: ["auto", ...]` da biste prikazali one koje ste omogućili.                                      |
| OpenCode 500 sa `cannot read property 'models'`          | Stariji OpenCode (< 0.1.x) nije prihvatao inline `models`.                           | Nadogradite OpenCode na verziju koja prati v1 šemu (`opencode.ai/config.json`).                                      |

## Vidi također

- [API referenca](../reference/API_REFERENCE.md) — kompletna OmniRoute REST površina
- [Auto-Combo](../routing/AUTO-COMBO.md) — šta znači `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Izvor: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
