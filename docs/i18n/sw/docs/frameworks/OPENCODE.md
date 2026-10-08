# OpenCode Integration (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Hali:** Inapatikana kwa matumizi ya jumla.
> **Walengwa:** Waendeshaji wanaounganisha OpenCode na usakinishaji wa OmniRoute.
> **Chanzo rasmi (schema ya usanidi):** `src/shared/services/opencodeConfig.ts`
> **Chanzo rasmi (kifurushi cha npm):** `@omniroute/opencode-provider/` (workspace inayoweza kuchapishwa)

[OpenCode](https://opencode.ai) ni kiteja cha AI cha CLI/desktop kinachotumia mawakala. Husoma katalogi yake ya watoa huduma kutoka `~/.config/opencode/opencode.json` (au `opencode.jsonc`) na kufuata schema iliyo katika `https://opencode.ai/config.json`. OmniRoute hujitambulisha kwa OpenCode kama mmoja wa watoa huduma hao — kila ombi hupitia kiolesura cha kawaida cha OmniRoute kinachooana na OpenAI cha `/v1`, hivyo OpenCode hunufaika kiotomatiki na uelekezaji wa Auto-Combo, vivunja saketi, sera za funguo, uangalizi, n.k.

Kuna **njia mbili za ujumuishaji zinazotumika**. Chagua moja — zote hutengeneza usanidi sawa.

---

## Njia ya 1 — Kizalishaji cha CLI (bila kusakinisha npm)

Inapendekezwa kwa watumiaji wa mwisho. Huja pamoja na OmniRoute. Huandika `opencode.json` mahali ilipo.

```bash
# Baada ya kusakinisha OmniRoute (npm i -g @omniroute/cli au nakala ya ndani)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Kwa ndani, CLI huita `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), hivyo `opencode.json` iliyopo huhifadhi watoa huduma wengine na maoni yake. Ingizo la OmniRoute huongezwa/hubadilishwa kwa njia atomiki.

Faili inayotokana (katalogi chaguomsingi ya modeli):

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

## Njia ya 2 — Kifurushi cha npm `@omniroute/opencode-provider`

Inapendekezwa unapoandika hati ya usanidi kutoka Node/TS (mifumo ya CI, monorepo, mitiririko maalum ya kisakinishaji).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Si lazima: badilisha katalogi ya modeli inayoonyeshwa kwa OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Kwa muunganisho usioharibu faili iliyopo, nakili utendaji wa `mergeOpenCodeConfigText()` kutoka `opencodeConfig.ts` au tumia kizalishaji cha CLI.

Angalia [README ya kifurushi](../../@omniroute/opencode-provider/README.md) kwa API kamili.

---

## Kile ambacho mazingira ya utekelezaji hufanya hasa

Njia zote mbili huzalisha `provider.omniroute.npm: "@ai-sdk/openai-compatible"` ileile. Wakati wa utekelezaji, OpenCode hupakia `@ai-sdk/openai-compatible` (ambayo tayari ni utegemezi wa mpito wa OpenCode) na kuisanidi kwa `baseURL` + `apiKey`. Kuanzia hapo:

```
Kiolesura cha OpenCode/wakala
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (kiolesura cha OpenAI cha OmniRoute)
         → kishughulikiaji cha OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → uelekezaji wa combo / Auto-Combo / kitekelezaji
               → mtoa huduma wa juu
```

Programu-jalizi haigusi kamwe HTTP. Hutoa usanidi pekee.

---

## Chaguo-msingi za katalogi ya modeli

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Unaweza kubatilisha kupitia `models: [...]`. Nyongeza zinazopendekezwa:

- `"auto"` — huonyesha [Auto-Combo](../routing/AUTO-COMBO.md) ya OmniRoute, kipanga-njia kisichohitaji usanidi. Huiruhusu OpenCode kuchagua "modeli bora zaidi inayopatikana" bila wewe kuweka katalogi moja kwa moja kwenye msimbo.
- `"<combo-name>"` — mchanganyiko wowote uliofafanua kwenye dashibodi; OmniRoute huutatua kwa uwazi.

---

## Usawazishaji wa URL

Kisaidizi kinakubali miundo yote miwili na hutoa `/v1` moja pekee:

| Ingizo                         | Tokeo (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Uondoaji huu wa nakala ni **hitilafu ya kawaida zaidi** inayoonekana katika usanidi wa zamani. Ikiwa una `opencode.json` ya kabla ya v3.8.0 inayoelekeza kwenye `/v1/v1/...`, endesha tena kizalishaji au uite `createOmniRouteProvider` tena.

---

## Hali za uthibitishaji

| Mpangilio wa OmniRoute                                        | Thamani inayopendekezwa ya `apiKey`                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `REQUIRE_API_KEY=false` (chaguo-msingi kwa matumizi ya ndani) | `sk_omniroute` (kishikilia nafasi halisi)                                |
| `REQUIRE_API_KEY=true`                                        | Ufunguo halisi wa API wa kila mtumiaji kutoka Dashibodi → Funguo za API. |

Kwa viteja vya mtindo wa Anthropic vinavyotuma `x-api-key` + `anthropic-version`, `extractApiKey` ya OmniRoute pia hukubali ufunguo kutoka `x-api-key`. OpenCode hutumia kiolesura cha OpenAI, kwa hivyo daima itatuma `Authorization: Bearer ${apiKey}` — hakuna hali maalum ya Anthropic inayotumika hapa.

---

## Utatuzi wa matatizo

| Dalili                                                         | Sababu                                                                                                   | Suluhisho                                                                                                              |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `404` kwa kila ombi lenye URL iliyo na `/v1/v1/`               | Usanidi uliopitwa na wakati kutoka programu-jalizi ya kabla ya v3.8 ulioweka kiambishi `/v1` mara mbili. | Zalisha upya kupitia Njia ya 1 au 2.                                                                                   |
| `401 Invalid API key`                                          | OmniRoute ina `REQUIRE_API_KEY=true` na ufunguo hautambuliki.                                            | Unda ufunguo kwenye dashibodi, au weka `REQUIRE_API_KEY=false` (kwa matumizi ya ndani pekee) na utumie `sk_omniroute`. |
| Orodha ya modeli ni tupu katika kiolesura cha OpenCode         | Modeli zote 4 za chaguo-msingi zimefichwa katika mwonekano wa mtoa huduma wa OmniRoute.                  | Pitisha `models: ["auto", ...]` ili kuonyesha zile ulizowasha.                                                         |
| Hitilafu ya OpenCode 500 yenye `cannot read property 'models'` | OpenCode ya zamani (< 0.1.x) haikukubali `models` zilizowekwa ndani ya usanidi.                          | Sasisha OpenCode hadi toleo linalofuata skema ya v1 (`opencode.ai/config.json`).                                       |

---

## Tazama pia

- [Marejeleo ya API](../reference/API_REFERENCE.md) — huduma zote za OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — maana ya `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Chanzo: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
