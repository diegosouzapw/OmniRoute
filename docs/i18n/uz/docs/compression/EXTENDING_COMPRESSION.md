# Extending the Compression Pipeline (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Qisqasi**: OmniRoute siqish mexanizmi **kengaytiriladigan** — maxsus mexanizmlarni roʻyxatdan oʻtkazishingiz, yangi tillar uchun til paketlarini taqdim etishingiz va ketma-ket konveyerlarni tuzishingiz mumkin. Ushbu qoʻllanma buni qanday amalga oshirishni koʻrsatadi.

**Tegishli qoʻllanmalar:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Toʻliq konveyer sharhi
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mexanizmlar reyestri va ichki mexanizmlar
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK mexanizmi va maxsus filtrlar
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Qoidalar paketi formati maʼlumotnomasi

---

## Umumiy koʻrinish

Siqish tizimida **3 ta kengaytirish nuqtasi** mavjud:

| Kengaytirish nuqtasi   | Qoʻllanish holati                                                                | Murakkablik  |
| ---------------------- | -------------------------------------------------------------------------------- | ------------ |
| **Maxsus mexanizm**    | Mutlaqo yangi siqish algoritmini qoʻshish (masalan, sohaga xos umumlashtiruvchi) | Yuqori       |
| **Til paketi**         | Yangi tabiiy tilni qoʻllab-quvvatlash (masalan, hind yoki arab tili)             | Oʻrta        |
| **Ketma-ket konveyer** | Mavjud mexanizmlarni maxsus tartibda birlashtirish                               | Boshlangʻich |

```
┌─────────────────────────────────────────────────────────────┐
│                    Siqish strategiyasi                       │
│                                                              │
│   Kiruvchi xabarlar ──▶ getEffectiveMode() ──▶ rejim        │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   mexanizmi mexanizmi mexanizmi ketma-ket │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Siqilgan natija               │
└─────────────────────────────────────────────────────────────┘

Strategiya tanlagichi REJIMGA ASOSLANGAN: har bir soʻrov BITTA rejimni tanlaydi
(rtk / lite / standard / aggressive / ultra / stacked / off).
Faqat "stacked" rejimi bir nechta mexanizmni ketma-ket bogʻlaydi.
Standart avtomatik ishga tushirish rejimi — "lite" (3 bosqichli ustuvorlik zanjiri emas).
```

---

## Maxsus siqish mexanizmini yozish

Mexanizm interfeysi (`open-sse/services/compression/engines/types.ts`) har bir mexanizm bajarishi kerak boʻlgan shartnomadir. Unda 5 ta majburiy metod mavjud.

### `CompressionEngine` interfeysi

```ts
interface CompressionEngine {
  id: string; // Noyob mexanizm identifikatori
  name: string; // Koʻrsatiladigan nom
  description: string; // Qisqa tavsif
  icon: string; // Belgi (emoji yoki URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Ketma-ket konveyerda foydalanish mumkinmi
  stackPriority: number; // Ketma-ket konveyerlardagi tartib (kichikroq = oldinroq)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimal misol: boʻsh joylar mexanizmi

Eng sodda mexanizm — xabarlardagi ortiqcha boʻsh joylarni olib tashlaydi.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Kod bloklari markerlari bo‘yicha ajrating va ularning ichidagi bo‘sh joylarni saqlang
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Kod bloklarini o‘zgartirmang
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Faqat oddiy matnga qo‘llang
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // caveman/rtk’dan KEYIN ishga tushiring

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // Xabarlar massivini ko‘rib chiqing — ham satrli, ham ko‘p qismli kontentni qayta ishlang
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // Ko‘p qismli kontent: qismlarni ko‘rib chiqing, faqat matnli qismlarni siqing
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // image_url, tool_use va boshqalarni saqlang
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Global miqyosda ro‘yxatdan o‘tkazing
registerCompressionEngine(whitespaceEngine);
````

### Maxsus mexanizmlarni qayerga joylashtirish kerak

```
~/.omniroute/compression/engines/my-engine.ts    # Foydalanuvchi darajasida
<project>/compression-engines/my-engine.ts        # Loyiha darajasida (ishga tushishda yuklanadi)
```

Yoki plagindan dasturiy tarzda yuklang:

```ts
// Plaginingizda
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Plagin SDK’si onRequest / onResponse / onError ilgaklarini taqdim etadi. Mexanizmni
  // plagin moduli yuklanganda (yoki birinchi onRequest’da) ro‘yxatdan o‘tkazing; uni
  // o‘zingizning yakunlash jarayoningizda ro‘yxatdan chiqaring.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Yakunlash vaqtida:
// unregisterCompressionEngine("my-engine");
```

### Mexanizmingizni sinash

Mexanizmingizni plagin yoki ishga tushirish funksiyasida ro‘yxatdan o‘tkazing. Ro‘yxatdan o‘tkazilgach, mexanizm strategiya tanlagichida o‘zining `id` qiymati orqali mavjud bo‘ladi. Uni steklangan konveyerda birlashtirish orqali integratsiyani sinang:

---

## Til paketlarini yaratish

Caveman uslubidagi siqish har bir tabiiy tildagi ortiqcha iboralar, ikkilanishni ifodalovchi jumlalar va sergap tuzilmalarni boshqarish uchun **tilga xos qoidalar paketlaridan** foydalanadi. OmniRoute tarkibida **6 ta til paketi** mavjud: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paket tuzilishi

Til paketi — `open-sse/services/compression/rules/<language>/` ichidagi **JSON fayllari** katalogidir:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Xushmuomalalik iboralari, ikkilanish, odoblilik
│   ├── context.json         # Kontekstni qisqartirish qoidalari
│   ├── dedup.json           # Takrorlarni olib tashlash qoidalari
│   ├── structural.json      # Tinish belgilari, formatlash
│   └── ultra.json           # Agressiv siqish qoidalari
├── es/  (xuddi shu tuzilma)
├── fr/  (xuddi shu tuzilma)
├── de/  (xuddi shu tuzilma)
├── ja/  (xuddi shu tuzilma)
└── pt-BR/ (xuddi shu tuzilma)
```

### Qoida anatomiyasi

Har bir qoida quyidagi ko‘rinishga ega (`open-sse/services/compression/ruleLoader.ts` faylidan):

```ts
interface FileRule {
  name: string; // Inson o‘qishi uchun qulay nom (kebab-case)
  pattern: string; // JavaScript regex andozasi
  replacement?: string; // Moslikni nima bilan almashtirish kerak
  replacementMap?: Record<string, string>; // YOKI kalit→almashtirish xaritasi
  flags?: string; // Regex bayroqlari (odatda "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ushbu intensivlikdan past bo‘lsa, o‘tkazib yuborish
  description?: string; // Hujjatlar
}
```

### Misol: hind tili uchun ortiqcha iboralar qoidalarini qo‘shish

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'नमस्ते' kabi odobli kirish iboralarini olib tashlash"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' kabi ortiqcha iboralarni olib tashlash"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Hind tilidagi 'please' iborasini olib tashlash"
    }
  ]
}
```

### Tekshirish

Qoida paketlari yuklanayotganda `_schema.json` asosida tekshiriladi. Tuzilishi noto‘g‘ri bo‘lgan paket yuklanmaydi va xato jurnalga yoziladi:

```
RULE_LOADER: "hi/filler.json" paketi tekshiruvdan o‘tmadi:
  - rules.0.pattern: Noto‘g‘ri regex
  - rules.1.context: [all, user, system, assistant] qiymatlaridan biri bo‘lishi kerak
```

Paket yuklanganda tekshiruv avtomatik ravishda (`_schema.json` asosida) bajariladi; yaroqsiz paket rad etiladi va yuqoridagi xato jurnalga yoziladi. Paketni tekshirish uchun alohida `npm run` skripti mavjud emas — paketni yuklang (masalan, serverni ishga tushiring yoki siqish yo‘lini bajaring) va jurnallarni kuzating.

### Maxsus til paketini yuklash

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Yoki uni tan olinadigan joyga joylashtiring:

```
~/.omniroute/compression/rules/hi/filler.json  # Foydalanuvchi darajasida
<project>/.compression/rules/hi/filler.json   # Loyiha darajasida
```

### Til paketlari uchun eng yaxshi amaliyotlar

1. **`filler` bilan boshlang** — bular eng katta ta’sirga ega qoidalardir
2. **Agressiv qoidalarni cheklash uchun `minIntensity`dan foydalaning** — bu haddan tashqari siqishdan himoya qiladi
3. **Sinov holatlarini kiriting** — xatti-harakatni tekshirish uchun JSON fayliga `tests[]` massivini qo‘shing
4. **Tartib muhim** — oldingi qoidalar birinchi bo‘lib qo‘llanadi; katta ta’sirga ega qoidalarni boshiga joylashtiring
5. **`replacement`dan ehtiyotkorlik bilan foydalaning** — odatda bo‘sh satr to‘g‘ri tanlovdir; hech qachon yangi kontent kiritmang

### Tarjima strategiyasi

Qoida paketlarini yangi tilga moslashtirishda:

1. **Qoida nomlarini tarjima qiling** — ular nosozliklarni tuzatish chiqishida ko‘rinadi
2. **Regex andozalarini moslashtiring** — to‘g‘ridan-to‘g‘ri tarjima ko‘pincha ishlamaydi (so‘z chegaralari farq qiladi)
3. **Haqiqiy suhbatlarda sinab ko‘ring** — paket haqiqiy kirish ma’lumotlarida xavfsiz ishlashi kerak
4. **Madaniy me’yorlarga moslashtiring** — masalan, yapon tili paketlarida ingliz tilidagiga qaraganda hurmat ifodalovchi ortiqcha iboralar ko‘proq

---

## Ketma-ket konveyerlar

**Ketma-ket konveyer** bir nechta mexanizmni ketma-ket ishga tushiradi, bunda har bir mexanizmning chiqishi keyingisiga uzatiladi. `mode: stacked` ichki tomondan shu tarzda ishlaydi.

### Ketma-ket ishlash tartibi

```
Kirish (10,000 token)
        │
        ▼
   ┌──────────┐
   │ Mexanizm │  ustuvorlik 10
   │  A       │  ──▶ chiqish: 6,000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mexanizm │  ustuvorlik 50
   │  B       │  ──▶ chiqish: 2,400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mexanizm │  ustuvorlik 100
   │  C       │  ──▶ chiqish: 1,200 token (-80%)
   └────┬─────┘
        │
        ▼
Yakuniy chiqish (1,200 token, jami ~88% tejash)
```

`mode: "stacked"` tanlanganda, mexanizmlar `pipeline` massivida ko‘rsatilgan tartibda ketma-ket bajariladi.
N-mexanizmning chiqishi N+1-mexanizmning kirishiga aylanadi.

### Siqish rejimlari

OmniRoute konfiguratsiya, avtomatik ishga tushirish chegaralari va kombinatsiya qayta belgilashlari asosida **har bir so‘rov uchun BITTA rejimni** tanlaydi.
Mavjud rejimlar `open-sse/services/compression/types.ts` faylida (`CompressionMode` turi) belgilangan:

| Rejim        | Mexanizmlar          | Qo‘llanish holati                                                                                                                                                                                                                |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Yo‘q                 | Barcha siqishni o‘chirish                                                                                                                                                                                                        |
| `rtk`        | Faqat RTK            | Buyruq chiqishi ko‘p bo‘lgan seanslar (80%+ tejash)                                                                                                                                                                              |
| `lite`       | Faqat Lite           | Ehtiyotkor siqish (tez, xavfsiz)                                                                                                                                                                                                 |
| `standard`   | Caveman              | Til paketlari yordamida nasriy matnni siqish                                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | Nasriy matnni agressiv siqish + agressiv yakuniy o‘tish                                                                                                                                                                          |
| `ultra`      | Ultra                | Maksimal siqish (yo‘qotishli, eng so‘nggi chora). `ultra.modelPath` o‘rnatilganda, ixtiyoriy ravishda **LLMLingua-2** SLM mexanizmi orqali yo‘naltiriladi (model mavjud bo‘lmasa, qoidalarga asoslangan yo‘lga xatosiz qaytadi). |
| `stacked`    | Maxsus konveyer      | Mexanizmlarni istalgan tartibda birlashtirish (quyiga qarang)                                                                                                                                                                    |

> Yuqoridagi rejim mexanizmlaridan tashqari, reyestr tarkibida ketma-ket qo‘llash mumkin bo‘lgan maxsus mexanizmlar ham mavjud —
> **CCR**, **headroom**, **ionizer** va **session-dedup** — ular
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) faylida hujjatlashtirilgan.

Rejim tanlovi `open-sse/services/compression/strategySelector.ts` faylidagi `getEffectiveMode()` tomonidan belgilanadi:

1. Agar siqish o‘chirilgan bo‘lsa: `"off"`
2. Agar kombinatsiya uchun qayta belgilash mavjud bo‘lsa: qayta belgilangan qiymatdan foydalanish
3. Agar avtomatik ishga tushirish chegarasidan oshilsa: `autoTriggerMode`dan foydalanish (standart qiymat: `"lite"`)
4. Aks holda: `defaultMode`dan foydalanish

### Standart ketma-ket konveyer

`mode: "stacked"` aniq sozlanganda, standart konveyer quyidagilarni birlashtiradi:

1. **RTK** — buyruq chiqishidagi shovqinni olib tashlash (terminal chiqishida ~80% tejash)
2. **Caveman** — ortiqcha so‘zlarni olib tashlash, nasriy matnni ixchamlashtirish (qolgan matnda ~46%)
3. **Lite** — bo‘sh joylarni yakuniy tozalash + takrorlarni olib tashlash bosqichi

Bu kompozitsiya vositalar faol ishlatiladigan seanslarda **78-95% tejashga** erishadi.

### Ketma-ket konveyerlarni sozlash

Kombinatsiya konfiguratsiyasida:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

Mexanizmlarni tashlab ketishingiz, maxsus mexanizmlar qo‘shishingiz yoki ularning tartibini o‘zgartirishingiz mumkin.

### Holatni uzatish

Mexanizmlar so‘rov kontekstidagi (`options` ichidagi) metama’lumotlarni o‘qishi mumkin:

```ts
compress(body, config) {
  // Oldingi mexanizmlardan metama’lumotlarni o‘qish
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metama’lumotlar **faqat o‘qish uchun** — mexanizmlar so‘rov kontekstini o‘zgartira olmaydi, faqat o‘z tanasi chiqishini o‘zgartirishi mumkin.

### Bajarilish tartibining nozik jihatlari

| Mexanizmlar tartibi                           | Ta’siri                                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                          | **Tavsiya etiladi** (avval shovqinni, keyin tilga oid ortiqchaliklarni, so‘ng bo‘sh joylarni tozalaydi) |
| Lite → RTK → Caveman                          | Yomon — Lite xom chiqishdagi bo‘sh joylarni olib tashlab, RTK andozalarini moslashtirishni buzadi       |
| Caveman → RTK                                 | Yomon — Caveman matnni RTK tanimaydigan tarzda qayta yozishi mumkin                                     |
| Avval `tool_results` kelgan har qanday tartib | Yaxshiroq — vosita chiqishi eng shovqinli kontentdir                                                    |

### Qachon ketma-ket qo‘llamaslik kerak

Ketma-ket qo‘llash har doim ham yaxshiroq emas:

- **Oddiy xabarlar** (vosita chiqishi yo‘q) — bitta Caveman yoki Lite yetarli
- **Xarajatga sezgir holatlar** — har bir mexanizm ~5-50ms kechikish qo‘shadi
- **Muayyan vositalar** — qobiq chiqishi uchun odatda RTKning o‘zi yetarli

### Maxsus konveyer yaratish

Nomlangan konveyerlar reyestri mavjud emas. Yigʻma konveyer — bu shunchaki `applyStackedCompression()` funksiyasiga (`@omniroute/open-sse/services/compression/strategySelector` dan eksport qilinadi) uzatiladigan **qadamlarning ichki massivi**:

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Agar konveyer uzatilmasa, standart qiymat sifatida `rtk(standard) → caveman(full)` ishlatiladi.

Uni konfiguratsiya orqali boshqarish uchun `mode: "stacked"` ni belgilang va qadamlar massivini `stackedPipeline` ostida taqdim eting (`config.stackedPipeline` dan oʻqiladi):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## Yuqori oqim bilan sinxronlash siyosati

OmniRoute siqish dvigatellari README faylida bir nechta yuqori oqim loyihalarini eʼtirof etadi
("RTK, Caveman, LLMLingua-2, Troglodita loyihalaridan ilhomlangan"). Hissa qoʻshuvchilar
tomonidan tez-tez beriladigan savol: **yuqori oqimdagi RTK yangi vosita filtrini yoki Caveman yangi qoidalar
toʻplamini qoʻshsa, bu OmniRouteʼga qanday yetib keladi?** Ushbu boʻlim rasmiy javobdir.

### Yetkazib beriladigan nusxalar va mustaqil implementatsiyalar

| Dvigatel                     | Yuqori oqimga munosabati                                                                                                                              | Joylashuvi                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Mustaqil qayta implementatsiya** (undan ilhomlangan, nusxa emas)                                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Mustaqil qayta implementatsiya** (undan ilhomlangan)                                                                                                | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Asosan ichki; faqat `gcf/` kodeki `gcf-typescript` loyihasidan **haqiqatan ham yetkazib beriladi** (MIT, SPDX bilan belgilangan, faqat umumiy profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Ulardan ilhomlangan (`llmlingua` + `session-dedup` dvigatellariga asos boʻladi)                                                                       | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Asosiy jihat: **RTK va Caveman — _gʻoyalarning_ (filtrlash qoidalari, qoidalar toʻplamlari)
begona koddan xoli TypeScript implementatsiyalari boʻlib, yetkazib beriladigan manba kod daraxtlari emas.** `git pull`
orqali olinadigan yuqori oqim nusxasi mavjud emas — README faylida aynan shu sababli
"toʻplamga kiritilgan" emas, balki "ilhomlangan" deb yozilgan.

### Yuqori oqim yaxshilanishlari qanday birlashtiriladi

Ataylab **yuqori oqim relizlarini avtomatik kuzatish ham, `compression-sync`
yorligʻi ham mavjud emas**. Dvigatellar qayta implementatsiya qilingani sababli, yuqori oqimdagi RTK
filtri yoki Caveman qoidalar toʻplami kod sifatida birlashtirilmaydi; u **OmniRouteʼning oʻz
formatida yangi qoida/filtr sifatida qayta ifodalanadi** (
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) fayliga qarang) va odatiy PR orqali
alohida tarzda kiritiladi. Yuqoridagi kengaytirish nuqtalari (maxsus dvigatel, til toʻplami, RTK filtri)
bunday hissa qoʻshishning tasdiqlangan usulidir.

Aynan shu jarayonning yaqindagi misollari:

- Gradle va `dotnet` qurish chiqishi uchun RTK filtrlari (v3.8.42)
- kubectl / docker-build / composer / gh uchun RTK filtrlari (#2824)
- Caveman uchun indonez tili toʻplami (#3975), shuningdek nemis / fransuz / yapon / xitoy tili toʻplamlari

### Headroom (kirishni siqish proksisi)

Headroom **toʻliq ichki** — mahkamlangan va yetkazib beriladigan `gcf` kodek surati hamda
OmniRouteʼning oʻz `smartcrusher` / `toon` / `tabular` qatlamlaridan iborat. Yetkazib beriladigan nusxadan tashqari,
kuzatiladigan faol yuqori oqim mavjud emas; `gcf` yangilanishlari kodek oʻzgarganda
qoʻlda yangilanadi va siqish budjeti darvozasi (`check:compression-budget`) bilan
qayta tekshiriladi.

### Yuqori oqimdan ilhomlangan yaxshilanishni taklif qilish

1. **Yetkazib beriladigan nusxa yaratmang** — yuqori oqim qoida/filtrini OmniRoute formatida qayta ifodalang.
2. Uni quyidagi mos kengaytirish nuqtasi orqali qoʻshing (til toʻplami, RTK filtri yoki
   maxsus dvigatel).
3. PR tavsifida yuqori oqim loyihasiga havola bering (mualliflikni eʼtirof etish uchun), uning
   litsenziyaga ega manba kodini nusxalamang.
4. Testlarni qoʻshing va `check:compression-budget` darvozasidan oʻtish davom etayotganini tasdiqlang.

---

## Chiqish uslubini qoʻshish

Chiqish uslublari ([qoʻllanmadagi katalog jadvali](./COMPRESSION_GUIDE.md#output-styles-catalog)ga qarang)
kirish mexanizmlarining javob tomonidagi muqobilidir: siz yuborgan maʼlumotni siqish oʻrniga,
ular modelga tejamkorroq chiqish yaratishni buyuradi. Reyestr
`open-sse/services/compression/outputStyles/catalog.ts` faylidagi `OUTPUT_STYLE_CATALOG` boʻlib,
**katalogdagi bitta yozuv butun funksiyani tashkil qiladi**: injektor, boshqaruv paneli sozlamalari,
saqlash va telemetriya katalogni sanab chiqadi — yangilanishi kerak boʻlgan boshqa roʻyxat yoʻq.

1. **`OUTPUT_STYLE_CATALOG`ga bitta yozuv qoʻshing**: `id`, `label`, `description` va
   ingliz tilidagi uchta `levels` (`lite`, `full`, `ultra`) bilan. Kod, yoʻllar, buyruqlar,
   xatolar va URL manzillar aynan saqlanishi uchun har bir daraja `${SHARED_BOUNDARIES}` bilan
   tugashi kerak. Koʻrsatma matni har bir `(id, level, language)` uchun **statik va deterministik**
   boʻlishi shart — faqat `${SHARED_BOUNDARIES}` interpolatsiyasiga ruxsat beriladi.
2. **Uni tarjima qiling.** `i18n` ostida kamida `pt-BR` blokini taqdim eting; `ponytail` va
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) namuna tuzilmalardir. Ataylab
   faqat bitta tilga moʻljallangan uslub buning oʻrniga `locale`ni belgilaydi (`terse-cjk` → `zh`
   kabi) va shunda u faqat shu lokal uchun taklif etiladi.
3. **Matritsa tekshiruvini yangilang** — uslub tillarini
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` faylidagi `BASELINE_LANGUAGES`ga
   qoʻshing. Yangi, lokal bilan cheklanmagan uslub talab qilinadigan tarjimalarga ega boʻlmasa,
   yoki kuzatuv muammosi koʻrsatilgan aniq `KNOWN_ENGLISH_ONLY` yozuvini oʻz ichiga olmasa,
   tekshiruv muvaffaqiyatsiz yakunlanadi.
4. **Har bir uslub uchun alohida test qoʻshing**, bunda
   `tests/unit/compression/i-have-adhd-catalog.test.ts`dan namuna sifatida foydalaning:
   katalog tuzilmasi, har bir darajadagi chegaralar bandi va har bir tarjima ingliz tilidan
   nusxalanmay, oʻz tilida yozilganini tasdiqlovchi tayanch tekshiruv.
5. **Manbani koʻrsatish**: agar uslub tashqi loyihadan moslashtirilgan boʻlsa, yozuvdagi manba
   izohida unga havola bering (masalan, `i-have-adhd` → ayghri/i-have-adhd, MIT) — yuqoridagi
   “Tashqi loyihadan ilhomlangan takomillashtirishni taklif qilish” qoidasi bilan bir xil.

UI, sxema yoki telemetriyani oʻzgartirish shart emas — bu qismlar katalog asosida render qilinadi.

---

## Eng yaxshi amaliyotlar

### Mexanizm ishlab chiqish

1. **Har doim `validateConfig`ni amalga oshiring** — validatsiyasiz mexanizmlar yashirin nosozliklarga olib keladi
2. **Haqiqiy `targetLatencyMs` qiymatini belgilang** — undan strategiya selektori mexanizmlarni tanlashda foydalanadi
3. **Boshqaruv paneli uchun `getConfigSchema`dan foydalaning** — konfiguratsiyani hech qachon foydalanuvchilardan yashirmang
4. **Mexanizmingiz sof boʻlsa, `stackable: true`ni qoʻllab-quvvatlang** — yon taʼsirga ega mexanizmlar ketma-ket qoʻllanmasligi kerak
5. **Ichki testlarni yozing** — mexanizmlarni <1s ichida tekshirish mumkin boʻlishi kerak

### Til paketini ishlab chiqish

1. **`lite` intensivligidan boshlang** — qoidalaringiz eng past sozlamada xavfsiz boʻlishi kerak
2. **Qoidalar koʻlamini belgilash uchun `context`dan foydalaning** — faqat `user`ga tegishli qoidalar tasodifan tizim promptlariga taʼsir qila olmaydi
3. **JSON kalitlarini qamrab olishdan saqlaning** — `\\bword\\b` JSON ichida mos kelib, tuzilmaviy maʼlumotlarni buzishi mumkin
4. **Chekka holatlar bilan sinang** — boʻsh kirish, unicode, RTL matn, emojilar
5. **Mavjud paketlardan shablon sifatida foydalaning** — `en/filler.json` eng mukammal ishlab chiqilgan misoldir

### Konveyerni loyihalash

1. **Optimallashtirishdan oldin profillang** — avval `compression_stats` yordamida oʻlchang
2. **Qayta amalga oshirishdan koʻra kompozitsiyani afzal koʻring** — yangi mexanizm yozishdan oldin Caveman qoidalarini kengaytiring
3. **Tartib sababini hujjatlashtiring** — nima uchun A mexanizmi B mexanizmidan oldin kelishini izohlang
4. **Barcha 3 intensivlik darajasida sinang** — `lite` tez, ammo yoʻqotishli; `ultra` sekin, ammo aniq

---

## Maʼlumotnoma: ichki dvigatellar

| Dvigatel ID-si       | Birlashtiriladi | Standart stackPriority | Moʻljallar                                |
| -------------------- | --------------- | ---------------------- | ----------------------------------------- |
| `lite`               | Ha              | 5                      | xabarlar, vosita_natijalari               |
| `rtk`                | Ha              | 10                     | vosita_natijalari                         |
| `standard` (caveman) | Ha              | 20                     | xabarlar, vosita_natijalari, kod_bloklari |
| `aggressive`         | Ha              | 30                     | xabarlar                                  |
| `ultra`              | Ha              | 40                     | xabarlar, kod_bloklari                    |

### Shuningdek qarang

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Konveyer haqida umumiy maʼlumot
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Dvigatellar reyestri maʼlumotnomasi
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Qoidalar formati spetsifikatsiyasi
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Til paketlari tafsilotlari
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK dvigateli va maxsus filtrlar
- Manba: `open-sse/services/compression/` (117 ta fayl, ~250KB)
