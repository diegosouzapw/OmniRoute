# OpenCode Integration (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Կարգավիճակ՝** Ընդհանուր հասանելիություն։
> **Լսարան՝** Օպերատորներ, որոնք OpenCode-ը միացնում են OmniRoute-ի տեղակայմանը։
> **Ճշմարտության աղբյուր (կազմաձևման սխեմա)՝** `src/shared/services/opencodeConfig.ts`
> **Ճշմարտության աղբյուր (npm փաթեթ)՝** `@omniroute/opencode-provider/` (հրապարակման ենթակա աշխատանքային տարածք)

[OpenCode](https://opencode.ai)-ը գործակալային CLI/աշխատասեղանային AI հաճախորդ է։ Այն իր մատակարարների կատալոգը կարդում է `~/.config/opencode/opencode.json`-ից (կամ `opencode.jsonc`-ից) և հետևում է `https://opencode.ai/config.json` հասցեում գտնվող սխեմային։ OmniRoute-ն իրեն ներկայացնում է OpenCode-ին որպես այդ մատակարարներից մեկը. յուրաքանչյուր հարցում անցնում է OmniRoute-ի ստանդարտ՝ OpenAI-ի հետ համատեղելի `/v1` միջերեսով, ուստի OpenCode-ն ավտոմատ կերպով օգտվում է Auto-Combo երթուղումից, շղթայի անջատիչներից, բանալիների քաղաքականություններից, դիտարկելիությունից և այլն։

Աջակցվում է ինտեգրման **երկու ուղի**։ Ընտրեք դրանցից մեկը. դրանք ստեղծում են նույն կազմաձևումը։

---

## Ուղի 1 — CLI գեներատոր (առանց npm տեղադրման)

Խորհուրդ է տրվում վերջնական օգտատերերի համար։ Մատակարարվում է OmniRoute-ի հետ։ Տեղում գրում է `opencode.json` ֆայլը։

```bash
# OmniRoute-ը տեղադրելուց հետո (npm i -g @omniroute/cli կամ տեղային կլոն)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Ներքին մակարդակում CLI-ն կանչում է `mergeOpenCodeConfigText()`-ը (`src/shared/services/opencodeConfig.ts:104`), ուստի գոյություն ունեցող `opencode.json`-ը պահպանում է իր մյուս մատակարարներին և մեկնաբանությունները։ OmniRoute-ի գրառումն ավելացվում/փոխարինվում է ատոմար կերպով։

Ստացված ֆայլը (մոդելների լռելյայն կատալոգով)՝

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

## Ուղի 2 — npm փաթեթ `@omniroute/opencode-provider`

Խորհուրդ է տրվում, երբ կազմաձևումը ծրագրային կերպով ստեղծում եք Node/TS-ից (CI կոնվեյերներ, մոնոռեպոզիտորիաներ, հատուկ տեղադրիչների հոսքեր)։

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Ըստ ցանկության՝ փոխարինեք OpenCode-ին հասանելի մոդելների կատալոգը
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Գոյություն ունեցող ֆայլի հետ ոչ կործանարար միաձուլման համար վերարտադրեք `opencodeConfig.ts`-ի `mergeOpenCodeConfigText()`-ը կամ կանչեք CLI գեներատորը։

Ամբողջական API-ի համար տե՛ս [փաթեթի README-ը](../../@omniroute/opencode-provider/README.md)։

---

## Ինչ է իրականում անում կատարման միջավայրը

Երկու ուղիներն էլ ստեղծում են նույն `provider.omniroute.npm: "@ai-sdk/openai-compatible"`-ը։ Կատարման ժամանակ OpenCode-ը բեռնում է `@ai-sdk/openai-compatible`-ը (որն արդեն OpenCode-ի տարանցիկ կախվածություն է) և կազմաձևում այն `baseURL` + `apiKey` արժեքներով։ Այնուհետև՝

```
OpenCode-ի UI/գործակալ
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute-ի OpenAI միջերես)
         → OmniRoute /v1/chat/completions մշակիչ      (open-sse/handlers/chatCore.ts)
            → համակցված երթուղում / Auto-Combo / կատարիչ
               → վերին հոսքի մատակարար
```

Փլագինը երբեք չի աշխատում HTTP-ի հետ։ Այն միայն ստեղծում է կազմաձևումը։

---

## Մոդելների կատալոգի լռելյայն արժեքները

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Կարող եք վերասահմանել՝ օգտագործելով `models: [...]`։ Առաջարկվող հավելումներ՝

- `"auto"` — հասանելի է դարձնում OmniRoute-ի [Auto-Combo](../routing/AUTO-COMBO.md)՝ զրոյական կազմաձևմամբ երթուղիչը։ OpenCode-ին թույլ է տալիս ընտրել «լավագույն հասանելի մոդելը»՝ առանց կատալոգը կոդում կոշտ սահմանելու։
- `"<combo-name>"` — կառավարման վահանակում ձեր սահմանած ցանկացած համակցություն․ OmniRoute-ն այն թափանցիկորեն լուծում է։

---

## URL-ի նորմալացում

Օժանդակ գործառույթն ընդունում է երկու ձևերն էլ և ելքում տրամադրում է ճիշտ մեկ `/v1`՝

| Մուտք                          | Ելք (`options.baseURL`)     |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Այս կրկնությունների վերացումը հին կազմաձևերում հանդիպող **ամենատարածված խափանումն է**։ Եթե ունեք մինչև v3.8.0 տարբերակի `opencode.json`, որը հղում է `/v1/v1/...` հասցեին, կրկին գործարկեք գեներատորը կամ նորից կանչեք `createOmniRouteProvider`։

---

## Նույնականացման ռեժիմներ

| OmniRoute-ի կարգավորում                            | `apiKey`-ի առաջարկվող արժեքը                                                                         |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (լռելյայն՝ տեղայինի համար) | `sk_omniroute` (բառացի տեղապահ)                                                                      |
| `REQUIRE_API_KEY=true`                             | Իրական՝ յուրաքանչյուր օգտատիրոջ համար առանձին API բանալի՝ Կառավարման վահանակ → API բանալիներ բաժնից։ |

Anthropic ոճի կլիենտների համար, որոնք ուղարկում են `x-api-key` + `anthropic-version`, OmniRoute-ի `extractApiKey`-ը նաև ընդունում է `x-api-key`-ից ստացված բանալին։ OpenCode-ն օգտագործում է OpenAI-ի միջերեսը, ուստի այն միշտ կուղարկի `Authorization: Bearer ${apiKey}`․ այստեղ Anthropic-ի համար հատուկ դեպքը կիրառելի չէ։

---

## Խնդիրների վերացում

| Ախտանիշ                                                          | Պատճառ                                                                                         | Լուծում                                                                                                                                   |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `404`՝ `/v1/v1/` պարունակող URL-ով յուրաքանչյուր հարցման դեպքում | Մինչև v3.8 տարբերակի փլագինից մնացած հնացած կազմաձև, որը կրկնակի ավելացրել է `/v1`։            | Վերագեներացրեք՝ օգտագործելով 1-ին կամ 2-րդ ուղին։                                                                                         |
| `401 Invalid API key`                                            | OmniRoute-ում սահմանված է `REQUIRE_API_KEY=true`, և բանալին անհայտ է։                          | Ստեղծեք բանալին կառավարման վահանակում կամ սահմանեք `REQUIRE_API_KEY=false` (միայն տեղային օգտագործման համար) և օգտագործեք `sk_omniroute`։ |
| OpenCode-ի միջերեսում մոդելների ցանկը դատարկ է                   | Բոլոր 4 լռելյայն մոդելները թաքցված են OmniRoute-ի մատակարարի տեսանելիության կարգավորումներում։ | Փոխանցեք `models: ["auto", ...]`՝ ձեր միացրած մոդելները հասանելի դարձնելու համար։                                                         |
| OpenCode 500՝ `cannot read property 'models'` սխալով             | OpenCode-ի հին տարբերակները (< 0.1.x) չէին ընդունում ներդրված `models`։                        | Թարմացրեք OpenCode-ը՝ տեղադրելով v1 սխեմային (`opencode.ai/config.json`) համապատասխանող տարբերակ։                                         |

---

## Տես նաև

- [API տեղեկատու](../reference/API_REFERENCE.md) — OmniRoute REST-ի ամբողջական ինտերֆեյսը
- [Auto-Combo](../routing/AUTO-COMBO.md) — ինչ է նշանակում `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Աղբյուր՝ `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
