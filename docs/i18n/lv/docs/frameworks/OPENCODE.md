# OpenCode Integration (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Statuss:** Vispārēji pieejams.
> **Mērķauditorija:** Operatori, kuri savieno OpenCode ar OmniRoute izvietojumu.
> **Patiesais avots (konfigurācijas shēma):** `src/shared/services/opencodeConfig.ts`
> **Patiesais avots (npm pakotne):** `@omniroute/opencode-provider/` (publicējama darbvieta)

[OpenCode](https://opencode.ai) ir aģentisks CLI/darbvirsmas MI klients. Tas nolasa savu nodrošinātāju katalogu no `~/.config/opencode/opencode.json` (vai `opencode.jsonc`) un izmanto shēmu vietnē `https://opencode.ai/config.json`. OmniRoute sevi pakalpojumā OpenCode piedāvā kā vienu no šiem nodrošinātājiem — katrs pieprasījums plūst caur OmniRoute standarta, ar OpenAI saderīgo `/v1` saskarni, tādēļ OpenCode automātiski izmanto Auto-Combo maršrutēšanas, ķēdes pārtraucēju, atslēgu politiku, novērojamības u.c. priekšrocības.

Tiek atbalstīti **divi integrācijas veidi**. Izvēlieties vienu — abi ģenerē vienādu konfigurāciju.

---

## 1. veids — CLI ģenerators (bez npm instalēšanas)

Ieteicams galalietotājiem. Iekļauts OmniRoute komplektācijā. Pārraksta `opencode.json` tā pašreizējā atrašanās vietā.

```bash
# Pēc OmniRoute instalēšanas (npm i -g @omniroute/cli vai lokāls klons)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Fonā CLI izsauc `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), tādēļ esošajā `opencode.json` tiek saglabāti citi nodrošinātāji un komentāri. OmniRoute ieraksts tiek atomāri pievienots vai aizstāts.

Iegūtais fails (noklusējuma modeļu katalogs):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<jūsu-atslēga>",
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

## 2. veids — npm pakotne `@omniroute/opencode-provider`

Ieteicams, ja konfigurāciju skriptējat no Node/TS (CI konveijeri, monorepozitoriji, pielāgotas instalēšanas plūsmas).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Neobligāti: aizstājiet OpenCode pieejamo modeļu katalogu
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Lai veiktu nesagraujošu sapludināšanu ar esošu failu, atkārtojiet `mergeOpenCodeConfigText()` no `opencodeConfig.ts` vai izsauciet CLI ģeneratoru.

Pilnu API aprakstu skatiet [pakotnes README](../../@omniroute/opencode-provider/README.md).

---

## Ko izpildlaika vide faktiski dara

Abi veidi izveido vienādu `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Izpildlaikā OpenCode ielādē `@ai-sdk/openai-compatible` (kas jau ir OpenCode tranzitīvā atkarība) un konfigurē to ar `baseURL` + `apiKey`. Tālāk:

```
OpenCode lietotāja saskarne/aģents
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI saskarne)
         → OmniRoute /v1/chat/completions apdarinātājs (open-sse/handlers/chatCore.ts)
            → kombinētā maršrutēšana / Auto-Combo / izpildītājs
               → augšupējais nodrošinātājs
```

Spraudnis nekad neveic HTTP pieprasījumus. Tas tikai ģenerē konfigurāciju.

---

## Modeļu kataloga noklusējumi

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Varat tos pārrakstīt, izmantojot `models: [...]`. Ieteicamie papildinājumi:

- `"auto"` — padara pieejamu OmniRoute [Auto-Combo](../routing/AUTO-COMBO.md) maršrutētāju, kam nav nepieciešama konfigurācija. Ļauj OpenCode izvēlēties „labāko pieejamo modeli”, neveicot kataloga vērtību tiešu iestatīšanu kodā.
- `"<combo-name>"` — jebkura kombinācija, ko esat definējis informācijas panelī; OmniRoute to atrisina pārskatāmi.

---

## URL normalizācija

Palīgfunkcija pieņem abas formas un izvada tieši vienu `/v1`:

| Ievade                         | Izvade (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Šī dublikātu novēršana attiecas uz **visbiežāk sastopamo problēmu** vecākās konfigurācijās. Ja jums ir `opencode.json`, kas izveidots pirms v3.8.0 un norāda uz `/v1/v1/...`, atkārtoti palaidiet ģeneratoru vai vēlreiz izsauciet `createOmniRouteProvider`.

---

## Autentifikācijas režīmi

| OmniRoute iestatījums                            | Ieteicamā `apiKey` vērtība                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (lokāli pēc noklusējuma) | `sk_omniroute` (literāla viettura vērtība)                                          |
| `REQUIRE_API_KEY=true`                           | Īsta katram lietotājam paredzēta API atslēga no informācijas paneļa → API atslēgas. |

Anthropic stila klientiem, kas nosūta `x-api-key` un `anthropic-version`, OmniRoute funkcija `extractApiKey` pieņem arī atslēgu no `x-api-key`. OpenCode izmanto OpenAI saskarni, tādēļ tas vienmēr nosūtīs `Authorization: Bearer ${apiKey}` — šeit nav piemērojams neviens īpašs Anthropic gadījums.

---

## Problēmu novēršana

| Pazīme                                               | Cēlonis                                                                                | Risinājums                                                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `404` katram pieprasījumam, kura URL satur `/v1/v1/` | Novecojusi konfigurācija no spraudņa pirms v3.8, kas divreiz pievienoja `/v1`.         | Atkārtoti ģenerējiet, izmantojot 1. vai 2. ceļu.                                                                            |
| `401 Invalid API key`                                | OmniRoute iestatījums ir `REQUIRE_API_KEY=true`, un atslēga nav zināma.                | Izveidojiet atslēgu informācijas panelī vai iestatiet `REQUIRE_API_KEY=false` (tikai lokāli) un izmantojiet `sk_omniroute`. |
| Modeļu saraksts OpenCode lietotāja saskarnē ir tukšs | Visi 4 noklusējuma modeļi ir paslēpti OmniRoute nodrošinātāja redzamības iestatījumos. | Norādiet `models: ["auto", ...]`, lai padarītu redzamus iespējotos modeļus.                                                 |
| OpenCode 500 ar `cannot read property 'models'`      | Vecāka OpenCode versija (< 0.1.x) nepieņēma iekļauto `models`.                         | Jauniniet OpenCode uz versiju, kas atbilst v1 shēmai (`opencode.ai/config.json`).                                           |

---

## Skatiet arī

- [API atsauce](../reference/API_REFERENCE.md) — pilns OmniRoute REST saskarņu klāsts
- [Auto-Combo](../routing/AUTO-COMBO.md) — ko nozīmē `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Avots: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
