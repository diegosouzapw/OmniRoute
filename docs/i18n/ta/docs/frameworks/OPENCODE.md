# OpenCode Integration (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **நிலை:** பொதுவாகக் கிடைக்கிறது.
> **பயனர்கள்:** OpenCode-ஐ OmniRoute நிறுவலுடன் இணைக்கும் இயக்குநர்கள்.
> **உண்மையின் மூலம் (கட்டமைப்புத் திட்டவடிவம்):** `src/shared/services/opencodeConfig.ts`
> **உண்மையின் மூலம் (npm தொகுப்பு):** `@omniroute/opencode-provider/` (வெளியிடக்கூடிய பணியிடம்)

[OpenCode](https://opencode.ai) என்பது முகவர் சார்ந்த CLI/டெஸ்க்டாப் AI கிளையன்ட் ஆகும். இது தனது வழங்குநர் பட்டியலை `~/.config/opencode/opencode.json` (அல்லது `opencode.jsonc`) இலிருந்து படித்து, `https://opencode.ai/config.json`-இல் உள்ள திட்டவடிவத்தைப் பின்பற்றுகிறது. OmniRoute தன்னை OpenCode-க்கு அந்த வழங்குநர்களில் ஒன்றாக வெளிப்படுத்துகிறது — ஒவ்வொரு கோரிக்கையும் OmniRoute-இன் நிலையான OpenAI-இணக்கமான `/v1` இடைமுகத்தின் வழியாகச் செல்கிறது; எனவே Auto-Combo வழிப்படுத்தல், சர்க்யூட் பிரேக்கர்கள், விசைக் கொள்கைகள், கண்காணிப்புத்திறன் போன்றவற்றின் பலன்களை OpenCode தானாகவே பெறுகிறது.

**இரண்டு ஆதரிக்கப்படும் ஒருங்கிணைப்புப் பாதைகள்** உள்ளன. ஒன்றைத் தேர்ந்தெடுக்கவும் — இரண்டும் ஒரே கட்டமைப்பை உருவாக்குகின்றன.

---

## பாதை 1 — CLI உருவாக்கி (npm நிறுவல் தேவையில்லை)

இறுதிப் பயனர்களுக்குப் பரிந்துரைக்கப்படுகிறது. OmniRoute உடன் வழங்கப்படுகிறது. ஏற்கனவே உள்ள `opencode.json` கோப்பில் நேரடியாக எழுதுகிறது.

```bash
# OmniRoute-ஐ நிறுவிய பிறகு (npm i -g @omniroute/cli அல்லது உள்ளக clone)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

பின்னணியில் CLI, `mergeOpenCodeConfigText()`-ஐ (`src/shared/services/opencodeConfig.ts:104`) அழைக்கிறது; எனவே ஏற்கனவே உள்ள `opencode.json` அதன் பிற வழங்குநர்களையும் கருத்துரைகளையும் தக்கவைத்துக் கொள்கிறது. OmniRoute பதிவு அணு முறையில் சேர்க்கப்படுகிறது/மாற்றப்படுகிறது.

உருவாகும் கோப்பு (இயல்புநிலை மாதிரிப் பட்டியல்):

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

## பாதை 2 — npm தொகுப்பு `@omniroute/opencode-provider`

Node/TS-இலிருந்து கட்டமைப்பை ஸ்கிரிப்ட் செய்யும்போது இது பரிந்துரைக்கப்படுகிறது (CI பைப்லைன்கள், மோனோரெப்போக்கள், தனிப்பயன் நிறுவி ஓட்டங்கள்).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // விருப்பத்தேர்வு: OpenCode-க்கு வெளிப்படுத்தப்படும் மாதிரிப் பட்டியலை மேலெழுதவும்
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

ஏற்கனவே உள்ள கோப்புடன் தரவிழப்பற்ற முறையில் ஒன்றிணைக்க, `opencodeConfig.ts`-இலுள்ள `mergeOpenCodeConfigText()`-ஐ மீண்டும் செயல்படுத்தவும் அல்லது CLI உருவாக்கியை அழைக்கவும்.

முழுமையான API விவரங்களுக்கு [தொகுப்பின் README](../../@omniroute/opencode-provider/README.md)-ஐப் பார்க்கவும்.

---

## இயக்கநேரத்தில் உண்மையில் என்ன நடக்கிறது

இரண்டு பாதைகளும் ஒரே `provider.omniroute.npm: "@ai-sdk/openai-compatible"`-ஐ உருவாக்குகின்றன. இயக்கநேரத்தில், OpenCode `@ai-sdk/openai-compatible`-ஐ (இது ஏற்கனவே OpenCode-இன் இடைநிலை சார்புநிலையாக உள்ளது) ஏற்றி, அதை `baseURL` + `apiKey` கொண்டு கட்டமைக்கிறது. அதன் பின்னர்:

```
OpenCode UI/முகவர்
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI இடைமுகம்)
         → OmniRoute /v1/chat/completions கையாளுநர்   (open-sse/handlers/chatCore.ts)
            → காம்போ வழிப்படுத்தல் / Auto-Combo / செயல்படுத்தி
               → மேல்நிலை வழங்குநர்
```

செருகுநிரல் HTTP-ஐ ஒருபோதும் அணுகாது. அது கட்டமைப்பை மட்டுமே வெளியிடுகிறது.

---

## மாதிரி பட்டியலின் இயல்புநிலைகள்

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

இதை `models: [...]` மூலம் மேலெழுதலாம். பரிந்துரைக்கப்படும் சேர்த்தல்கள்:

- `"auto"` — OmniRoute-இன் [Auto-Combo](../routing/AUTO-COMBO.md) பூஜ்ஜிய-உள்ளமைவு திசைவியை வெளிப்படுத்துகிறது. பட்டியலை நீங்கள் நிரலில் நேரடியாகப் பதியாமல், "கிடைக்கக்கூடிய சிறந்த மாதிரியை" OpenCode தேர்ந்தெடுக்க அனுமதிக்கிறது.
- `"<combo-name>"` — முகப்புப்பலகையில் நீங்கள் வரையறுத்துள்ள எந்தவொரு சேர்க்கையும்; OmniRoute அதை வெளிப்படையாகத் தீர்மானிக்கிறது.

---

## URL இயல்பாக்கம்

இந்த உதவி நிரல் இரண்டு வடிவங்களையும் ஏற்றுக்கொண்டு, சரியாக ஒரு `/v1`-ஐ வெளியிடுகிறது:

| உள்ளீடு                        | வெளியீடு (`options.baseURL`) |
| ------------------------------ | ---------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1`  |
| `http://localhost:20128/`      | `http://localhost:20128/v1`  |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1`  |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1`  |

இந்த நகல் நீக்கம், பழைய உள்ளமைவுகளில் காணப்படும் **மிகவும் பொதுவான செயலிழப்பாகும்**. `/v1/v1/...`-ஐச் சுட்டிக்காட்டும் v3.8.0-க்கு முந்தைய `opencode.json` உங்களிடம் இருந்தால், உருவாக்கியை மீண்டும் இயக்கவும் அல்லது `createOmniRouteProvider`-ஐ மீண்டும் அழைக்கவும்.

---

## அங்கீகார முறைகள்

| OmniRoute அமைப்பு                                            | பரிந்துரைக்கப்படும் `apiKey` மதிப்பு                                        |
| ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (உள்ளகப் பயன்பாட்டிற்கான இயல்புநிலை) | `sk_omniroute` (நேரடி இடநிரப்பு மதிப்பு)                                    |
| `REQUIRE_API_KEY=true`                                       | முகப்புப்பலகை → API விசைகளிலிருந்து பெறப்பட்ட உண்மையான பயனர்-சார் API விசை. |

`x-api-key` + `anthropic-version` ஆகியவற்றை அனுப்பும் Anthropic-பாணி கிளையன்ட்களுக்காக, OmniRoute-இன் `extractApiKey`, `x-api-key`-இலிருந்து வரும் விசையையும் ஏற்கிறது. OpenCode, OpenAI இடைமுகத்தைப் பயன்படுத்துவதால், அது எப்போதும் `Authorization: Bearer ${apiKey}`-ஐ அனுப்பும் — எனவே Anthropic-க்கான சிறப்பு நிலை எதுவும் இங்கு பொருந்தாது.

---

## சிக்கல் தீர்த்தல்

| அறிகுறி                                                   | காரணம்                                                                                     | தீர்வு                                                                                                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/v1/v1/` உள்ள URL-ஐக் கொண்ட ஒவ்வொரு கோரிக்கையிலும் `404` | `/v1`-ஐ இருமுறை பின்னொட்டாகச் சேர்த்த v3.8-க்கு முந்தைய செருகுநிரலின் காலாவதியான உள்ளமைவு. | பாதை 1 அல்லது 2 வழியாக மீண்டும் உருவாக்கவும்.                                                                                                        |
| `401 Invalid API key`                                     | OmniRoute-இல் `REQUIRE_API_KEY=true` அமைக்கப்பட்டுள்ளது, ஆனால் விசை அறியப்படாதது.          | முகப்புப்பலகையில் விசையை உருவாக்கவும், அல்லது `REQUIRE_API_KEY=false` (உள்ளகப் பயன்பாட்டிற்கு மட்டும்) என அமைத்து `sk_omniroute`-ஐப் பயன்படுத்தவும். |
| OpenCode UI-இல் மாதிரிப் பட்டியல் காலியாக உள்ளது          | இயல்புநிலை மாதிரிகள் 4-உம் OmniRoute-இன் வழங்குநர் தெரிவுநிலையில் மறைக்கப்பட்டுள்ளன.       | நீங்கள் இயக்கியுள்ளவற்றை வெளிப்படுத்த `models: ["auto", ...]`-ஐ வழங்கவும்.                                                                           |
| `cannot read property 'models'` உடன் OpenCode 500         | பழைய OpenCode (< 0.1.x), வரிக்குள் குறிப்பிடப்பட்ட `models`-ஐ ஏற்கவில்லை.                  | v1 திட்டவடிவத்தை (`opencode.ai/config.json`) பின்பற்றும் OpenCode பதிப்புக்கு மேம்படுத்தவும்.                                                        |

---

## மேலும் காண்க

- [API குறிப்பு](../reference/API_REFERENCE.md) — முழுமையான OmniRoute REST இடைமுகம்
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` என்பதன் பொருள்
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- மூலம்: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
