# OpenCode Integration (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **තත්ත්වය:** සාමාන්ය භාවිතය සඳහා ලබා ගත හැක.
> **ඉලක්කගත පාඨකයින්:** OpenCode, OmniRoute යෙදවීමකට සම්බන්ධ කරන මෙහෙයුම්කරුවන්.
> **සත්යයේ මූලාශ්රය (වින්යාස schema):** `src/shared/services/opencodeConfig.ts`
> **සත්යයේ මූලාශ්රය (npm package):** `@omniroute/opencode-provider/` (ප්රකාශනය කළ හැකි workspace එක)

[OpenCode](https://opencode.ai) යනු ස්වයංක්රීය නියෝජිත හැකියාවන් සහිත CLI/desktop AI client එකකි. එය තම provider නාමාවලිය `~/.config/opencode/opencode.json` (හෝ `opencode.jsonc`) වෙතින් කියවන අතර `https://opencode.ai/config.json` හි schema එක අනුගමනය කරයි. OmniRoute එම providers අතරින් එකක් ලෙස OpenCode වෙත තමාව නිරාවරණය කරයි — සෑම ඉල්ලීමක්ම OmniRoute හි සම්මත OpenAI-අනුකූල `/v1` අතුරුමුහුණත හරහා ගලා යන බැවින්, OpenCode වෙත Auto-Combo routing, circuit breakers, key policies, observability ආදියෙහි ප්රතිලාභ ස්වයංක්රීයව ලැබේ.

**සහාය දක්වන ඒකාබද්ධ කිරීමේ මාර්ග දෙකක්** ඇත. එකක් තෝරන්න — දෙකම එකම වින්යාසය ජනනය කරයි.

---

## මාර්ගය 1 — CLI generator එක (npm ස්ථාපනයක් අවශ්ය නැත)

අවසන් පරිශීලකයින් සඳහා නිර්දේශ කෙරේ. OmniRoute සමඟ ඇතුළත් වේ. පවතින ස්ථානයේම `opencode.json` ලියයි.

```bash
# OmniRoute ස්ථාපනය කිරීමෙන් පසු (npm i -g @omniroute/cli හෝ local clone එකක්)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

පසුබිමේදී CLI එක `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) අමතන බැවින්, පවතින `opencode.json` ගොනුවක් එහි අනෙකුත් providers සහ comments රඳවා ගනී. OmniRoute entry එක පරමාණුකව එකතු කිරීම හෝ ප්රතිස්ථාපනය කිරීම සිදු වේ.

ප්රතිඵලයක් ලෙස ලැබෙන ගොනුව (පෙරනිමි model නාමාවලිය):

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

## මාර්ගය 2 — npm package එක `@omniroute/opencode-provider`

ඔබ Node/TS වෙතින් වින්යාසය script කරන විට (CI pipelines, monorepos, custom installer flows) නිර්දේශ කෙරේ.

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // විකල්ප: OpenCode වෙත නිරාවරණය කරන model නාමාවලිය අතික්රමණය කරන්න
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

පවතින ගොනුවක් සමඟ විනාශකාරී නොවන merge කිරීමක් සඳහා, `opencodeConfig.ts` වෙතින් `mergeOpenCodeConfigText()` ප්රතිනිර්මාණය කරන්න, නැතහොත් CLI generator එක අමතන්න.

සම්පූර්ණ API එක සඳහා [package README](../../@omniroute/opencode-provider/README.md) බලන්න.

---

## runtime එක සැබවින්ම කරන දේ

මාර්ග දෙකම එකම `provider.omniroute.npm: "@ai-sdk/openai-compatible"` ජනනය කරයි. runtime එකේදී, OpenCode විසින් `@ai-sdk/openai-compatible` (දැනටමත් OpenCode හි transitive dependency එකකි) පූරණය කර, එය `baseURL` + `apiKey` සමඟ වින්යාස කරයි. එතැන් සිට:

```
OpenCode UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI අතුරුමුහුණත)
         → OmniRoute /v1/chat/completions handler     (open-sse/handlers/chatCore.ts)
            → combo routing / Auto-Combo / executor
               → upstream provider
```

plugin එක කිසි විටෙකත් HTTP සමඟ සෘජුව ක්රියා නොකරයි. එය නිකුත් කරන්නේ වින්යාසය පමණි.

---

## ආදර්ශ නාමාවලියේ පෙරනිමි

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

ඔබට `models: [...]` හරහා මෙය අතික්රමණය කළ හැක. නිර්දේශිත එකතු කිරීම්:

- `"auto"` — OmniRoute හි ශුන්ය-වින්යාස [Auto-Combo](../routing/AUTO-COMBO.md) රවුටරය පෙන්වයි. නාමාවලිය දෘඪ-කේතනය නොකර, "ලබාගත හැකි හොඳම ආදර්ශය" තෝරාගැනීමට OpenCode හට ඉඩ දෙයි.
- `"<combo-name>"` — ඔබ dashboard තුළ අර්ථ දක්වා ඇති ඕනෑම combo එකක්; OmniRoute එය විනිවිද පෙනෙන ලෙස විසඳයි.

---

## URL සාමාන්යකරණය

උපකාරකය ආකෘති දෙකම පිළිගෙන හරියටම එක් `/v1` එකක් නිකුත් කරයි:

| ආදානය                          | ප්රතිදානය (`options.baseURL`) |
| ------------------------------ | ----------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1`   |
| `http://localhost:20128/`      | `http://localhost:20128/v1`   |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1`   |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1`   |

මෙම අනුපිටපත් ඉවත් කිරීම පැරණි වින්යාසවල දක්නට ලැබෙන **වඩාත්ම පොදු බිඳවැටීමයි**. `/v1/v1/...` වෙත යොමු කරන v3.8.0 ට පෙර නිර්මාණය කළ `opencode.json` ගොනුවක් ඔබ සතුව තිබේ නම්, ජනකය නැවත ධාවනය කරන්න හෝ `createOmniRouteProvider` නැවත කැඳවන්න.

---

## සත්යාපන ප්රකාර

| OmniRoute සැකසුම                                     | නිර්දේශිත `apiKey` අගය                                          |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (දේශීය භාවිතය සඳහා පෙරනිමිය) | `sk_omniroute` (වචනාර්ථ ස්ථානධාරකය)                             |
| `REQUIRE_API_KEY=true`                               | Dashboard → API Keys වෙතින් ලබාගත් සැබෑ එක්-පරිශීලක API යතුරක්. |

`x-api-key` + `anthropic-version` යවන Anthropic-ආකාරයේ අනුග්රාහක සඳහා, OmniRoute හි `extractApiKey` විසින් `x-api-key` වෙතින් ලැබෙන යතුරද පිළිගනී. OpenCode විසින් OpenAI අතුරුමුහුණත භාවිත කරන බැවින්, එය සැමවිටම `Authorization: Bearer ${apiKey}` යවයි — මෙහි Anthropic සඳහා විශේෂ අවස්ථාවක් අදාළ නොවේ.

---

## දෝෂ නිරාකරණය

| රෝග ලක්ෂණය                                         | හේතුව                                                                          | විසඳුම                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `/v1/v1/` අඩංගු URL සහිත සෑම ඉල්ලීමකටම `404` ලැබීම | `/v1` දෙවරක් අගට එක් කළ v3.8 ට පෙර plugin එකකින් පැමිණි යල්පැන ගිය වින්යාසයකි. | මාර්ගය 1 හෝ 2 හරහා නැවත ජනනය කරන්න.                                                                                      |
| `401 Invalid API key`                              | OmniRoute හි `REQUIRE_API_KEY=true` වන අතර යතුර හඳුනා නොගනී.                   | dashboard තුළ යතුර සාදන්න, නැතහොත් `REQUIRE_API_KEY=false` ලෙස සකසා (දේශීය භාවිතය සඳහා පමණි) `sk_omniroute` භාවිත කරන්න. |
| OpenCode UI තුළ ආදර්ශ ලැයිස්තුව හිස්ය              | OmniRoute හි සපයන්නාගේ දෘශ්යතාව තුළ පෙරනිමි ආදර්ශ 4ම සඟවා ඇත.                  | ඔබ සක්රිය කර ඇති ඒවා පෙන්වීමට `models: ["auto", ...]` යොදන්න.                                                            |
| `cannot read property 'models'` සමඟ OpenCode 500   | පැරණි OpenCode (< 0.1.x) විසින් inline `models` පිළිගත්තේ නැත.                 | v1 schema (`opencode.ai/config.json`) අනුගමනය කරන OpenCode අනුවාදයකට උත්ශ්රේණි කරන්න.                                    |

---

## මෙයද බලන්න

- [API යොමුව](../reference/API_REFERENCE.md) — සම්පූර්ණ OmniRoute REST පරාසය
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` යන්නෙහි අර්ථය
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- මූලාශ්රය: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
