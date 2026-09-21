# OpenCode Integration (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Holati:** Umumiy foydalanish uchun mavjud.
> **Auditoriya:** OpenCode’ni OmniRoute o‘rnatmasiga ulayotgan operatorlar.
> **Asosiy manba (konfiguratsiya sxemasi):** `src/shared/services/opencodeConfig.ts`
> **Asosiy manba (npm paketi):** `@omniroute/opencode-provider/` (nashr qilish mumkin bo‘lgan ish maydoni)

[OpenCode](https://opencode.ai) — agentli CLI/ish stoli AI mijozidir. U provayderlar katalogini `~/.config/opencode/opencode.json` (yoki `opencode.jsonc`) faylidan o‘qiydi va `https://opencode.ai/config.json` manzilidagi sxemaga amal qiladi. OmniRoute o‘zini OpenCode’ga shu provayderlardan biri sifatida taqdim etadi — har bir so‘rov OmniRoute’ning OpenAI bilan mos standart `/v1` interfeysi orqali o‘tadi, shuning uchun OpenCode avtomatik ravishda Auto-Combo marshrutlash, avtomatik o‘chirgichlar, kalit siyosatlari, kuzatuvchanlik va boshqa imkoniyatlardan foydalanadi.

Qo‘llab-quvvatlanadigan **ikkita integratsiya yo‘li** mavjud. Ulardan birini tanlang — ikkalasi ham bir xil konfiguratsiyani yaratadi.

---

## 1-yo‘l — CLI generatori (npm o‘rnatish shart emas)

Yakuniy foydalanuvchilar uchun tavsiya etiladi. OmniRoute bilan birga taqdim etiladi. `opencode.json` faylini joyida yozadi.

```bash
# OmniRoute o‘rnatilgandan keyin (npm i -g @omniroute/cli yoki mahalliy klon)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI ichki jarayonda `mergeOpenCodeConfigText()` funksiyasini (`src/shared/services/opencodeConfig.ts:104`) chaqiradi, shuning uchun mavjud `opencode.json` faylidagi boshqa provayderlar va izohlar saqlanib qoladi. OmniRoute yozuvi atomar tarzda qo‘shiladi yoki almashtiriladi.

Hosil bo‘lgan fayl (standart modellar katalogi):

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

## 2-yo‘l — npm paketi `@omniroute/opencode-provider`

Konfiguratsiyani Node/TS orqali skript bilan yaratishda tavsiya etiladi (CI konveyerlari, monorepolar, maxsus o‘rnatish jarayonlari).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Ixtiyoriy: OpenCode’ga taqdim etiladigan modellar katalogini almashtirish
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Mavjud fayl bilan ma’lumotlarni yo‘qotmay birlashtirish uchun `opencodeConfig.ts` faylidagi `mergeOpenCodeConfigText()` funksiyasini takroran amalga oshiring yoki CLI generatorini chaqiring.

To‘liq API bilan tanishish uchun [paket README fayli](../../@omniroute/opencode-provider/README.md)ga qarang.

---

## Bajarilish muhiti aslida qanday ishlaydi

Har ikkala yo‘l ham bir xil `provider.omniroute.npm: "@ai-sdk/openai-compatible"` qiymatini yaratadi. Bajarilish vaqtida OpenCode `@ai-sdk/openai-compatible` paketini (u allaqachon OpenCode’ning tranzitiv bog‘liqligi hisoblanadi) yuklaydi va uni `baseURL` + `apiKey` bilan sozlaydi. Shundan keyin:

```
OpenCode UI/agenti
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI interfeysi)
         → OmniRoute /v1/chat/completions ishlovchisi (open-sse/handlers/chatCore.ts)
            → kombinatsiyalangan marshrutlash / Auto-Combo / ijrochi
               → yuqori oqimdagi provayder
```

Plagin hech qachon HTTP bilan bevosita ishlamaydi. U faqat konfiguratsiyani yaratadi.

---

## Model katalogining standart qiymatlari

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

`models: [...]` orqali qayta belgilashingiz mumkin. Tavsiya etiladigan qoʻshimchalar:

- `"auto"` — OmniRouteʼning sozlashni talab qilmaydigan [Auto-Combo](../routing/AUTO-COMBO.md) routerini taqdim etadi. OpenCodeʼga katalogni qoʻlda qatʼiy belgilamasdan «mavjud eng yaxshi model»ni tanlash imkonini beradi.
- `"<combo-name>"` — boshqaruv panelida belgilagan istalgan kombinatsiya; OmniRoute uni shaffof tarzda aniqlaydi.

---

## URL manzilini meʼyorlashtirish

Yordamchi ikkala shaklni ham qabul qiladi va aynan bitta `/v1` hosil qiladi:

| Kirish                         | Chiqish (`options.baseURL`) |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Bu takrorlanishni bartaraf etish eski konfiguratsiyalarda uchraydigan **eng keng tarqalgan buzilish**dir. Agar sizda v3.8.0 dan oldingi `opencode.json` fayli `/v1/v1/...` manziliga ishora qilsa, generatorni qayta ishga tushiring yoki `createOmniRouteProvider` funksiyasini yana chaqiring.

---

## Autentifikatsiya rejimlari

| OmniRoute sozlamasi                            | Tavsiya etiladigan `apiKey` qiymati                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (lokal uchun standart) | `sk_omniroute` (aynan shu toʻldiruvchi qiymat)                          |
| `REQUIRE_API_KEY=true`                         | Boshqaruv paneli → API kalitlaridan olingan haqiqiy shaxsiy API kaliti. |

`x-api-key` + `anthropic-version` yuboradigan Anthropic uslubidagi mijozlar uchun OmniRouteʼning `extractApiKey` funksiyasi `x-api-key` kalitini ham qabul qiladi. OpenCode OpenAI interfeysidan foydalanadi, shuning uchun u doimo `Authorization: Bearer ${apiKey}` yuboradi — bu yerda Anthropicʼga xos maxsus holat qoʻllanmaydi.

---

## Muammolarni bartaraf etish

| Alomat                                                  | Sabab                                                                                    | Yechim                                                                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| URL manzilida `/v1/v1/` boʻlgan har bir soʻrovda `404`  | `/v1` ni ikki marta qoʻshgan v3.8 dan oldingi plagindan qolgan eskirgan konfiguratsiya.  | 1- yoki 2-usul orqali qayta yarating.                                                                                         |
| `401 Invalid API key`                                   | OmniRouteʼda `REQUIRE_API_KEY=true` va kalit nomaʼlum.                                   | Kalitni boshqaruv panelida yarating yoki `REQUIRE_API_KEY=false` (faqat lokal muhitda) qilib, `sk_omniroute` dan foydalaning. |
| OpenCode interfeysida modellar roʻyxati boʻsh           | Barcha 4 ta standart model OmniRoute provayderining koʻrinish sozlamalarida yashirilgan. | Faollashtirgan modellaringizni koʻrsatish uchun `models: ["auto", ...]` ni uzating.                                           |
| OpenCodeʼda `cannot read property 'models'` bilan `500` | Eski OpenCode (< 0.1.x) ichki `models` ni qabul qilmagan.                                | OpenCodeʼni v1 sxemasiga (`opencode.ai/config.json`) mos keladigan versiyaga yangilang.                                       |

---

## Shuningdek qarang

- [API ma’lumotnomasi](../reference/API_REFERENCE.md) — OmniRoute REST interfeysining to‘liq tavsifi
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` nimani anglatadi
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Manba: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
