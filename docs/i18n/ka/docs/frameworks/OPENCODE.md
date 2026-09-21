# OpenCode Integration (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **სტატუსი:** საყოველთაოდ ხელმისაწვდომია.
> **აუდიტორია:** ოპერატორები, რომლებიც OpenCode-ს OmniRoute-ის განთავსებასთან აკავშირებენ.
> **ჭეშმარიტების წყარო (კონფიგურაციის სქემა):** `src/shared/services/opencodeConfig.ts`
> **ჭეშმარიტების წყარო (npm პაკეტი):** `@omniroute/opencode-provider/` (გამოსაქვეყნებელი სამუშაო სივრცე)

[OpenCode](https://opencode.ai) არის აგენტური CLI/დესკტოპ AI-კლიენტი. ის პროვაიდერების კატალოგს კითხულობს `~/.config/opencode/opencode.json`-დან (ან `opencode.jsonc`-დან) და მიჰყვება სქემას მისამართზე `https://opencode.ai/config.json`. OmniRoute საკუთარ თავს OpenCode-ს ერთ-ერთ ასეთ პროვაიდერად წარუდგენს — თითოეული მოთხოვნა OmniRoute-ის სტანდარტულ, OpenAI-თან თავსებად `/v1` ზედაპირზე გადის, ამიტომ OpenCode ავტომატურად სარგებლობს Auto-Combo მარშრუტიზაციით, ავარიული გამთიშველებით, გასაღებების პოლიტიკებით, დაკვირვებადობით და ა.შ.

მხარდაჭერილია **ინტეგრაციის ორი გზა**. აირჩიეთ ერთ-ერთი — ორივე ერთსა და იმავე კონფიგურაციას ქმნის.

---

## გზა 1 — CLI გენერატორი (npm-ის ინსტალაციის გარეშე)

რეკომენდებულია საბოლოო მომხმარებლებისთვის. მოჰყვება OmniRoute-ს. ადგილზე წერს `opencode.json`-ს.

```bash
# OmniRoute-ის ინსტალაციის შემდეგ (npm i -g @omniroute/cli ან ლოკალური კლონი)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

შიდა დონეზე CLI იძახებს `mergeOpenCodeConfigText()`-ს (`src/shared/services/opencodeConfig.ts:104`), ამიტომ არსებული `opencode.json` ინარჩუნებს სხვა პროვაიდერებსა და კომენტარებს. OmniRoute-ის ჩანაწერი ატომურად ემატება ან ჩანაცვლდება.

შედეგად მიღებული ფაილი (მოდელების ნაგულისხმევი კატალოგი):

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

## გზა 2 — npm პაკეტი `@omniroute/opencode-provider`

რეკომენდებულია, როდესაც კონფიგურაციას Node/TS-იდან სკრიპტით ქმნით (CI კონვეიერები, მონორეპოზიტორიები, ინსტალატორის მორგებული პროცესები).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // არასავალდებულო: OpenCode-ისთვის ხელმისაწვდომი მოდელების კატალოგის გადაფარვა
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

არსებულ ფაილთან არადესტრუქციული შერწყმისთვის გაიმეორეთ `mergeOpenCodeConfigText()` ფუნქცია `opencodeConfig.ts`-დან ან გამოიძახეთ CLI გენერატორი.

სრული API-ის სანახავად იხილეთ [პაკეტის README](../../@omniroute/opencode-provider/README.md).

---

## რას აკეთებს რეალურად გაშვების გარემო

ორივე გზა ქმნის ერთსა და იმავე `provider.omniroute.npm: "@ai-sdk/openai-compatible"`-ს. გაშვების დროს OpenCode ტვირთავს `@ai-sdk/openai-compatible`-ს (რომელიც უკვე OpenCode-ის ტრანზიტიული დამოკიდებულებაა) და აკონფიგურირებს მას `baseURL` + `apiKey`-ით. ამის შემდეგ:

```
OpenCode UI/აგენტი
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute-ის OpenAI ზედაპირი)
         → OmniRoute /v1/chat/completions დამმუშავებელი     (open-sse/handlers/chatCore.ts)
            → კომბინირებული მარშრუტიზაცია / Auto-Combo / შემსრულებელი
               → ზედა დონის პროვაიდერი
```

პლაგინი HTTP-ს საერთოდ არ ეხება. ის მხოლოდ კონფიგურაციას ქმნის.

---

## მოდელების კატალოგის ნაგულისხმევი მნიშვნელობები

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

შეგიძლიათ შეცვალოთ `models: [...]`-ის მეშვეობით. რეკომენდებული დამატებები:

- `"auto"` — ხელმისაწვდომს ხდის OmniRoute-ის [Auto-Combo](../routing/AUTO-COMBO.md) ნულოვანი კონფიგურაციის მქონე როუტერს. OpenCode-ს საშუალებას აძლევს, კატალოგის კოდში ხელით გაწერის გარეშე აირჩიოს „საუკეთესო ხელმისაწვდომი მოდელი“.
- `"<combo-name>"` — დაფაზე განსაზღვრული ნებისმიერი კომბინაცია; OmniRoute მას გამჭვირვალედ ამოიცნობს.

---

## URL-ის ნორმალიზაცია

დამხმარე ფუნქცია იღებს ორივე ფორმას და შედეგად ზუსტად ერთ `/v1`-ს აბრუნებს:

| შეყვანა                        | შედეგი (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

დუბლირების ეს აღმოფხვრა ძველ კონფიგურაციებში აღმოჩენილი **ყველაზე გავრცელებული გაუმართაობაა**. თუ გაქვთ v3.8.0-მდე შექმნილი `opencode.json`, რომელიც `/v1/v1/...`-ზე მიუთითებს, ხელახლა გაუშვით გენერატორი ან კვლავ გამოიძახეთ `createOmniRouteProvider`.

---

## ავთენტიფიკაციის რეჟიმები

| OmniRoute-ის პარამეტრი                               | რეკომენდებული `apiKey` მნიშვნელობა                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| `REQUIRE_API_KEY=false` (ლოკალურისთვის ნაგულისხმევი) | `sk_omniroute` (სიტყვასიტყვითი ჩანაცვლების მნიშვნელობა)                  |
| `REQUIRE_API_KEY=true`                               | რეალური, მომხმარებლისთვის ინდივიდუალური API გასაღები დაფიდან → API Keys. |

Anthropic-ის სტილის კლიენტებისთვის, რომლებიც აგზავნიან `x-api-key` + `anthropic-version`-ს, OmniRoute-ის `extractApiKey` ასევე ითვალისწინებს `x-api-key`-დან მიღებულ გასაღებს. OpenCode იყენებს OpenAI-ის ინტერფეისს, ამიტომ ის ყოველთვის გაგზავნის `Authorization: Bearer ${apiKey}`-ს — Anthropic-ისთვის განკუთვნილი სპეციალური შემთხვევა აქ არ გამოიყენება.

---

## პრობლემების აღმოფხვრა

| სიმპტომი                                               | მიზეზი                                                                                 | გამოსწორება                                                                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `404` ყველა მოთხოვნაზე, რომლის URL შეიცავს `/v1/v1/`-ს | v3.8-მდე არსებული პლაგინის მოძველებული კონფიგურაცია, რომელიც `/v1`-ს ორჯერ ამატებდა.   | ხელახლა დააგენერირეთ Path 1-ის ან 2-ის მეშვეობით.                                                             |
| `401 Invalid API key`                                  | OmniRoute-ში მითითებულია `REQUIRE_API_KEY=true` და გასაღები უცნობია.                   | შექმენით გასაღები დაფაზე ან მიუთითეთ `REQUIRE_API_KEY=false` (მხოლოდ ლოკალურად) და გამოიყენეთ `sk_omniroute`. |
| OpenCode-ის ინტერფეისში მოდელების სია ცარიელია         | ოთხივე ნაგულისხმევი მოდელი დამალულია OmniRoute-ის პროვაიდერის ხილვადობის პარამეტრებში. | თქვენს მიერ ჩართული მოდელების გამოსაჩენად გადასცით `models: ["auto", ...]`.                                   |
| OpenCode 500 შეცდომით `cannot read property 'models'`  | OpenCode-ის ძველი ვერსიები (< 0.1.x) ჩაშენებულ `models`-ს არ იღებდა.                   | განაახლეთ OpenCode ვერსიამდე, რომელიც მიჰყვება v1 სქემას (`opencode.ai/config.json`).                         |

---

## აგრეთვე იხილეთ

- [API-ის ცნობარი](../reference/API_REFERENCE.md) — OmniRoute REST-ის სრული ინტერფეისი
- [Auto-Combo](../routing/AUTO-COMBO.md) — რას ნიშნავს `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- წყარო: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
