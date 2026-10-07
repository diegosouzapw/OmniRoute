# Extending the Compression Pipeline (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Qısa xülasə**: OmniRoute-un sıxışdırma mühərriki **genişləndirilə biləndir** — fərdi mühərrikləri qeydiyyatdan keçirə, yeni dillər üçün dil paketləri təqdim edə və ardıcıl konveyerlər qura bilərsiniz. Bu təlimat bunun necə edildiyini göstərir.

**Əlaqəli təlimatlar:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Tam konveyerə ümumi baxış
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mühərrik reyestri və daxili mühərriklər
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK mühərriki və fərdi filtrlər
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Qayda paketi formatı üzrə arayış

---

## Ümumi baxış

Sıxışdırma sisteminin **3 genişləndirmə nöqtəsi** var:

| Genişləndirmə nöqtəsi | İstifadə halı                                                                     | Çətinlik  |
| --------------------- | --------------------------------------------------------------------------------- | --------- |
| **Fərdi mühərrik**    | Tamamilə yeni sıxışdırma alqoritmi əlavə etmək (məs., domenə xas xülasələşdirici) | Yüksək    |
| **Dil paketi**        | Yeni təbii dil üçün dəstək əlavə etmək (məs., hindi, ərəb dili)                   | Orta      |
| **Ardıcıl konveyer**  | Mövcud mühərrikləri fərdi ardıcıllıqla birləşdirmək                               | Başlanğıc |

```
┌─────────────────────────────────────────────────────────────┐
│                    Sıxışdırma strategiyası                   │
│                                                              │
│   Giriş mesajları ──▶ getEffectiveMode() ──▶ rejim           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   mühərriki mühərriki mühərriki zəncirlənir │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Sıxışdırılmış çıxış             │
└─────────────────────────────────────────────────────────────┘

Strategiya seçicisi REJİM ƏSASLIDIR: hər sorğu BİR rejim seçir
(rtk / lite / standard / aggressive / ultra / stacked / off).
Yalnız "stacked" rejimi bir neçə mühərriki ardıcıllıqla zəncirləyir.
Defolt avtomatik işə düşmə rejimi "lite"-dır (3 səviyyəli prioritet zənciri deyil).
```

---

## Fərdi sıxışdırma mühərrikinin yazılması

Mühərrik interfeysi (`open-sse/services/compression/engines/types.ts`) hər bir mühərrikin yerinə yetirməli olduğu müqavilədir. Onun 5 məcburi metodu var.

### `CompressionEngine` interfeysi

```ts
interface CompressionEngine {
  id: string; // Unikal mühərrik ID-si
  name: string; // Göstərilən ad
  description: string; // Qısa təsvir
  icon: string; // İkon (emoji və ya URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Ardıcıl konveyerdə istifadə edilə bilər
  stackPriority: number; // Ardıcıl konveyerlərdə sıra (daha aşağı = daha əvvəl)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimal nümunə: Boşluq mühərriki

Mümkün olan ən sadə mühərrik — mesajlardan artıq boşluqları silir.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Kod bloku işarələrinə görə böl və onların daxilindəki boşluqları qoru
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Kod bloklarını dəyişdirmə
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Yalnız mətnə tətbiq et
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
  stackPriority: 100, // caveman/rtk-dan SONRA işə sal

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

    // Mesaj massivini nəzərdən keçir — həm sətir, həm də çoxhissəli məzmunu emal et
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
      // Çoxhissəli məzmun: hissələri nəzərdən keçir, yalnız mətn hissələrini sıxışdır
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
          return part; // image_url, tool_use və s. olduğu kimi saxla
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

// Qlobal olaraq qeydiyyatdan keçir
registerCompressionEngine(whitespaceEngine);
````

### Fərdi Mühərrikləri Harada Yerləşdirməli

```
~/.omniroute/compression/engines/my-engine.ts    # İstifadəçi səviyyəsində
<project>/compression-engines/my-engine.ts        # Layihə səviyyəsində (işə salınarkən yüklənir)
```

Yaxud plagindən proqram vasitəsilə yükləyin:

```ts
// Plagininizdə
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Plagin SDK-sı onRequest / onResponse / onError qarmaqlarını təqdim edir. Mühərriki
  // plagin modulu yüklənərkən (və ya ilk onRequest zamanı) qeydiyyatdan keçirin; onu
  // öz söndürmə yolunuzdan qeydiyyatdan çıxarın.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Söndürmə zamanı:
// unregisterCompressionEngine("my-engine");
```

### Mühərrikinizin Sınaqdan Keçirilməsi

Mühərrikinizi plagində və ya işəsalma funksiyasında qeydiyyatdan keçirin. Qeydiyyatdan keçirildikdən sonra mühərrik strategiya seçicisində öz `id`-si vasitəsilə əlçatan olacaq. Onu yığılmış konveyerdə birləşdirərək inteqrasiyanı sınaqdan keçirin:

---

## Dil Paketlərinin Yaradılması

Mağara adamı üslubunda sıxılma hər bir təbii dildə doldurucu ifadələri, qeyri-müəyyənliyi və uzunçuluq nümunələrini idarə etmək üçün **dilə xas qayda paketlərindən** istifadə edir. OmniRoute **6 dil paketi** ilə təqdim olunur: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paket Strukturu

Dil paketi `open-sse/services/compression/rules/<language>/` daxilində yerləşən **JSON fayllarından** ibarət qovluqdur:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Nəzakət ifadələri, qeyri-müəyyənlik, ədəb qaydaları
│   ├── context.json         # Konteksti azaldan qaydalar
│   ├── dedup.json           # Təkrarları aradan qaldırma qaydaları
│   ├── structural.json      # Durğu işarələri, formatlaşdırma
│   └── ultra.json           # Aqressiv sıxılma qaydaları
├── es/  (eyni struktur)
├── fr/  (eyni struktur)
├── de/  (eyni struktur)
├── ja/  (eyni struktur)
└── pt-BR/ (eyni struktur)
```

### Qaydanın Quruluşu

Hər bir qayda bu formaya malikdir (`open-sse/services/compression/ruleLoader.ts` faylından):

```ts
interface FileRule {
  name: string; // İnsan tərəfindən oxuna bilən ad (kebab-case)
  pattern: string; // JavaScript müntəzəm ifadə nümunəsi
  replacement?: string; // Uyğunluğu nə ilə əvəz etmək lazımdır
  replacementMap?: Record<string, string>; // VƏ YA açar→əvəzləmə xəritəsi
  flags?: string; // Müntəzəm ifadə bayraqları (adətən "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Bu intensivlikdən aşağı olduqda ötür
  description?: string; // Sənədləşdirmə
}
```

### Nümunə: Hindi Dili üçün Doldurucu İfadə Qaydalarının Əlavə Edilməsi

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
      "description": "'नमस्ते' kimi nəzakətli giriş ifadələrini sil"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'Əslində' kimi doldurucu ifadələri sil"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Hindi dilindəki 'zəhmət olmasa' ifadəsini sil"
    }
  ]
}
```

### Doğrulama

Qayda paketləri yüklənərkən `_schema.json` ilə yoxlanılır. Yanlış struktura malik paket yüklənməyəcək və xəta qeydə alınacaq:

```
RULE_LOADER: "hi/filler.json" paketi doğrulamadan keçmədi:
  - rules.0.pattern: Yanlış müntəzəm ifadə
  - rules.1.context: [all, user, system, assistant] dəyərlərindən biri olmalıdır
```

Doğrulama paket yüklənərkən (`_schema.json` əsasında) avtomatik icra olunur; etibarsız paket rədd edilir və yuxarıdakı xəta qeydə alınır. Paketlərin doğrulanması üçün ayrıca `npm run` skripti yoxdur — paketi yükləyin (məsələn, serveri başladın və ya sıxılma yolunu işə salın) və qeydləri izləyin.

### Fərdi Dil Paketinin Yüklənməsi

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Yaxud onu tanınan mövqelərdən birinə yerləşdirin:

```
~/.omniroute/compression/rules/hi/filler.json  # İstifadəçi səviyyəsi
<project>/.compression/rules/hi/filler.json   # Layihə səviyyəsi
```

### Dil Paketləri üçün Ən Yaxşı Təcrübələr

1. **`filler` ilə başlayın** — bunlar ən yüksək təsirə malik qaydalardır
2. **Aqressiv qaydaları məhdudlaşdırmaq üçün `minIntensity` istifadə edin** — bu, həddindən artıq sıxılmadan qoruyur
3. **Test nümunələri əlavə edin** — davranışı yoxlamaq üçün JSON-a `tests[]` massivi əlavə edin
4. **Ardıcıllıq vacibdir** — əvvəlki qaydalar birinci tətbiq olunur; yüksək təsirli qaydaları əvvəldə yerləşdirin
5. **`replacement` ilə ehtiyatlı olun** — boş sətir adətən düzgün seçimdir; heç vaxt yeni məzmun əlavə etməyin

### Tərcümə Strategiyası

Qayda paketlərini yeni dilə lokallaşdırarkən:

1. **Qayda adlarını tərcümə edin** — onlar sazlama çıxışında görünür
2. **Müntəzəm ifadə nümunələrini uyğunlaşdırın** — birbaşa tərcümə çox vaxt işləmir (söz sərhədləri fərqlənir)
3. **Real söhbətlər üzərində sınaqdan keçirin** — paket faktiki giriş məlumatları üçün təhlükəsiz olmalıdır
4. **Mədəni normalara uyğunlaşdırın** — məsələn, Yapon dili paketlərində İngilis dili ilə müqayisədə daha çox hörmət bildirən doldurucu ifadə var

---

## Yığılmış Konveyerlər

**Yığılmış konveyer** bir neçə mühərriki ardıcıl şəkildə işlədir və hər mühərrikin çıxışı növbəti mühərrikə ötürülür. `mode: stacked` daxildə məhz belə işləyir.

### Yığılma Necə İşləyir

```
Giriş (10,000 token)
        │
        ▼
   ┌──────────┐
   │ Mühərrik │  prioritet 10
   │  A       │  ──▶ çıxış: 6,000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mühərrik │  prioritet 50
   │  B       │  ──▶ çıxış: 2,400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mühərrik │  prioritet 100
   │  C       │  ──▶ çıxış: 1,200 token (-80%)
   └────┬─────┘
        │
        ▼
Son çıxış (1,200 token, ümumilikdə ~88% qənaət)
```

`mode: "stacked"` seçildikdə mühərriklər `pipeline` massivində göstərilən sıra ilə ardıcıl icra olunur.
N nömrəli mühərrikin çıxışı N+1 nömrəli mühərrikin girişinə çevrilir.

### Sıxışdırma Rejimləri

OmniRoute konfiqurasiya, avtomatik işə salma hədləri və kombinasiya əvəzləmələri əsasında **hər sorğu üçün BİR rejim** seçir.
Mövcud rejimlər `open-sse/services/compression/types.ts` faylında (`CompressionMode` tipi) müəyyən edilib:

| Rejim        | Mühərriklər          | İstifadə halı                                                                                                                                                                                                        |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Heç biri             | Bütün sıxışdırmanı deaktiv edin                                                                                                                                                                                      |
| `rtk`        | Yalnız RTK           | Komanda çıxışının üstünlük təşkil etdiyi sessiyalar (80%+ qənaət)                                                                                                                                                    |
| `lite`       | Yalnız Lite          | Mühafizəkar sıxışdırma (sürətli, təhlükəsiz)                                                                                                                                                                         |
| `standard`   | Caveman              | Dil paketləri ilə mətn sıxışdırması                                                                                                                                                                                  |
| `aggressive` | Caveman + Aggressive | Aqressiv mətn sıxışdırması + aqressiv son keçid                                                                                                                                                                      |
| `ultra`      | Ultra                | Maksimum sıxışdırma (itkili, son çarə). `ultra.modelPath` təyin edildikdə istəyə bağlı olaraq **LLMLingua-2** SLM mühərriki vasitəsilə yönləndirilir (model əlçatan olmadıqda qayda əsaslı yola keçərək açıq qalır). |
| `stacked`    | Fərdi konveyer       | Mühərrikləri istənilən ardıcıllıqla birləşdirin (aşağıya baxın)                                                                                                                                                      |

> Yuxarıdakı rejim mühərriklərindən əlavə, reyestr xüsusi yığıla bilən mühərriklərlə də təchiz olunur —
> **CCR**, **headroom**, **ionizer** və **session-dedup** — bunlar
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) sənədində təsvir olunub.

Rejim seçimi `open-sse/services/compression/strategySelector.ts` faylındakı `getEffectiveMode()` tərəfindən müəyyən edilir:

1. Sıxışdırma deaktivdirsə: `"off"`
2. Kombinasiya əvəzləməsi mövcuddursa: əvəzləmədən istifadə edin
3. Avtomatik işə salma həddi keçilibsə: `autoTriggerMode` istifadə edin (standart: `"lite"`)
4. Əks halda: `defaultMode` istifadə edin

### Standart Yığılmış Konveyer

`mode: "stacked"` açıq şəkildə konfiqurasiya edildikdə standart konveyer aşağıdakıları birləşdirir:

1. **RTK** — komanda çıxışındakı lazımsız məlumatları silir (terminal çıxışında ~80% qənaət)
2. **Caveman** — doldurucu ifadələri silir, mətni daha yığcam edir (qalan mətndə ~46%)
3. **Lite** — son boşluq + dublikatları silmə keçidi

Bu kombinasiya alət istifadəsinin üstünlük təşkil etdiyi sessiyalarda **78-95% qənaət** təmin edir.

### Yığılmış Konveyerlərin Konfiqurasiyası

Kombinasiya konfiqurasiyasında:

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

Mühərrikləri çıxara, fərdi mühərriklər əlavə edə və ya onların sırasını dəyişə bilərsiniz.

### Vəziyyətin Ötürülməsi

Mühərriklər sorğu kontekstindəki (`options` daxilində) metadatanı oxuya bilər:

```ts
compress(body, config) {
  // Əvvəlki mühərriklərdən metadatanı oxuyun
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata **yalnız oxumaq üçündür** — mühərriklər sorğu kontekstini dəyişə bilməz, yalnız öz gövdə çıxışlarını dəyişə bilər.

### İcra Ardıcıllığının İncəlikləri

| Mühərrik ardıcıllığı                 | Təsir                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                 | **Tövsiyə olunur** (əvvəlcə lazımsız məlumatı, sonra dili, sonda boşluqları təmizləyir)            |
| Lite → RTK → Caveman                 | Pis — Lite xam çıxışdakı boşluqları silərək RTK nümunə uyğunlaşdırmasının uğursuzluğuna səbəb olur |
| Caveman → RTK                        | Pis — Caveman mətni RTK-nın tanımadığı şəkildə yenidən yaza bilər                                  |
| Əvvəlcə `tool_results` olan hər sıra | Daha yaxşı — alət çıxışı ən çox lazımsız məlumat ehtiva edən məzmundur                             |

### Nə Zaman Yığmaq OLMAZ

Yığma həmişə daha yaxşı deyil:

- **Sadə mesajlar** (alət çıxışı yoxdur) — tək Caveman və ya Lite kifayətdir
- **Xərcə həssas hallar** — hər mühərrik ~5-50ms gecikmə əlavə edir
- **Xüsusi alətlər** — shell çıxışı üçün adətən yalnız RTK kifayətdir

### Fərdi Konveyerin Qurulması

Adlandırılmış pipeline reyestri yoxdur. Yığılmış pipeline sadəcə `applyStackedCompression()` funksiyasına (`@omniroute/open-sse/services/compression/strategySelector` paketindən ixrac olunur) ötürülən **addımların inline massividir**:

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Pipeline ötürmədikdə, standart olaraq `rtk(standard) → caveman(full)` istifadə edilir.

Onu konfiqurasiyadan idarə etmək üçün `mode: "stacked"` təyin edin və addımlar massivini `stackedPipeline` altında təqdim edin (`config.stackedPipeline`-dan oxunur):

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

## Upstream Sinxronizasiya Siyasəti

OmniRoute-un sıxılma mühərrikləri README-də bir neçə upstream layihəyə istinad edir
("RTK, Caveman, LLMLingua-2, Troglodita layihələrindən ilhamlanıb"). İştirakçıların
tez-tez verdiyi sual budur: **upstream RTK yeni alət filtri və ya Caveman yeni qayda
paketi əlavə etdikdə, bu OmniRoute-a necə daxil olur?** Bu bölmə mötəbər cavabdır.

### Vendored nüsxələr və müstəqil reallaşdırmalar

| Mühərrik                     | Upstream ilə əlaqə                                                                                                                        | Məkan                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Müstəqil yenidən reallaşdırma** (ilhamlanıb, nüsxə deyil)                                                                               | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Müstəqil yenidən reallaşdırma** (ilhamlanıb)                                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Əsasən daxilidir; yalnız `gcf/` kodeki `gcf-typescript`-dən **həqiqətən vendored edilib** (MIT, SPDX ilə işarələnib, yalnız ümumi profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | İlhamlanıb (`llmlingua` + `session-dedup` mühərriklərinin əsasını təşkil edir)                                                            | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Əsas məqam: **RTK və Caveman _ideyaların_ (filtr qaydaları, qayda paketləri)
clean-room prinsipi ilə hazırlanmış TypeScript reallaşdırmalarıdır, vendored mənbə
ağacları deyil.** `git pull` etmək üçün upstream nüsxə yoxdur — README-də məhz buna
görə "bundled" deyil, "inspired by" yazılıb.

### Upstream təkmilləşdirmələri necə birləşdirilir

Qəsdən **avtomatlaşdırılmış upstream buraxılış izləməsi və `compression-sync`
etiketi yoxdur**. Mühərriklər yenidən reallaşdırmalar olduğuna görə upstream RTK
filtri və ya Caveman qayda paketi kod kimi birləşdirilmir; o, **OmniRoute-un öz
formatında yeni qayda/filtr kimi yenidən ifadə edilir** (bax:
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) və standart PR
vasitəsilə ad-hoc qaydada əlavə olunur. Yuxarıdakı genişləndirmə nöqtələri (fərdi
mühərrik, dil paketi, RTK filtri) belə töhfələri təqdim etməyin təsdiqlənmiş
üsuludur.

Məhz bu prosesin son nümunələri:

- Gradle və `dotnet` build çıxışı üçün RTK filtrləri (v3.8.42)
- kubectl / docker-build / composer / gh üçün RTK filtrləri (#2824)
- Caveman İndoneziya dili paketi (#3975), həmçinin Alman / Fransız / Yapon / Çin dili paketləri

### Headroom (giriş sıxılma proksisi)

Headroom **tamamilə daxilidir** — sabitlənmiş vendored `gcf` kodek snapshot-u və
OmniRoute-un öz `smartcrusher` / `toon` / `tabular` qatları. Vendored nüsxədən
başqa izləniləcək aktiv upstream yoxdur; kodek dəyişdikdə `gcf` yeniləmələri əl
ilə təzələnir və sıxılma büdcəsi yoxlamasına (`check:compression-budget`) qarşı
yenidən təsdiqlənir.

### Upstream-dən ilhamlanan təkmilləşdirmənin təklif edilməsi

1. **Vendor etməyin** — upstream qaydasını/filtrini OmniRoute formatında yenidən ifadə edin.
2. Onu aşağıdakı uyğun genişləndirmə nöqtəsi (dil paketi, RTK filtri və ya
   fərdi mühərrik) vasitəsilə əlavə edin.
3. Lisenziyalı mənbə kodunu kopyalamaq əvəzinə PR təsvirində upstream layihəyə
   istinad edin (atribusiya).
4. Testlər əlavə edin və `check:compression-budget` yoxlamasının hələ də uğurla
   keçdiyini təsdiqləyin.

---

## Çıxış Üslubunun Əlavə Edilməsi

Çıxış üslubları ([bələdçinin kataloq cədvəlinə](./COMPRESSION_GUIDE.md#output-styles-catalog) baxın)
giriş mühərriklərinin cavab tərəfindəki qarşılığıdır: göndərdiyinizi sıxmaq əvəzinə,
modelə daha az xərc tələb edən çıxış yaratmağı tapşırırlar. Reyestr
`open-sse/services/compression/outputStyles/catalog.ts` faylındakı
`OUTPUT_STYLE_CATALOG`-dur və **bir kataloq qeydi bütün funksionallığı təşkil edir**:
inyektor, idarə panelinin parametrlər paneli, davamlı saxlama və telemetriya kataloqu
sadalayır — yenilənməli başqa siyahı yoxdur.

1. **`OUTPUT_STYLE_CATALOG`-a bir qeyd əlavə edin**: `id`, `label`, `description` və
   üç ingiliscə `levels` (`lite`, `full`, `ultra`) ilə. Kodun, yolların, əmrlərin,
   xətaların və URL-lərin olduğu kimi qalması üçün hər səviyyə `${SHARED_BOUNDARIES}`
   ilə bitməlidir. Təlimat mətni hər `(id, level, language)` üçün **statik və
   deterministik** olmalıdır — icazə verilən yeganə interpolyasiya
   `${SHARED_BOUNDARIES}`-dir.
2. **Onu tərcümə edin.** `i18n` altında ən azı bir `pt-BR` bloku təqdim edin;
   `ponytail` və `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi)
   istinad quruluşudur. Qəsdən yalnız bir dilli olan üslub bunun əvəzinə `locale`
   təyin edir (`terse-cjk` → `zh` kimi) və sonra yalnız həmin lokal üçün təklif olunur.
3. **Matris qoruyucusunu yeniləyin** — üslubun dillərini
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` faylındakı
   `BASELINE_LANGUAGES`-ə əlavə edin. Lokal ilə məhdudlaşdırılmamış hər hansı yeni
   üslub tələb olunan tərcümələrə malik deyilsə, açıq şəkildə izləmə məsələsi olan
   `KNOWN_ENGLISH_ONLY` qeydi daşımadığı halda yoxlama uğursuz olur.
4. **Hər üslub üçün ayrıca test əlavə edin** və bunu
   `tests/unit/compression/i-have-adhd-catalog.test.ts` əsasında qurun: kataloq
   strukturu, hər səviyyə üçün sərhədlər bəndi və hər tərcümənin ingiliscədən
   köçürülmək əvəzinə öz dilində yazıldığını təsdiqləyən lövbər.
5. **Mənbənin göstərilməsi**: üslub yuxarı axın layihəsindən uyğunlaşdırılıbsa,
   qeyddəki mənbə şərhində ona istinad edin (məsələn, `i-have-adhd` →
   ayghri/i-have-adhd, MIT) — yuxarıdakı "Yuxarı axından ilhamlanan təkmilləşdirmənin
   təklif edilməsi" bölməsindəki qayda burada da keçərlidir.

Heç bir UI, sxem və ya telemetriya dəyişikliyinə ehtiyac yoxdur — həmin səthlər
kataloq əsasında render edilir.

---

## Ən Yaxşı Təcrübələr

### Mühərriklərin Hazırlanması

1. **Həmişə `validateConfig` tətbiq edin** — yoxlaması olmayan mühərriklər səssiz nasazlıqlara səbəb olur
2. **Realistik `targetLatencyMs` təyin edin** — strategiya seçicisi bundan mühərrikləri seçmək üçün istifadə edir
3. **İdarə paneli üçün `getConfigSchema` istifadə edin** — konfiqurasiyanı istifadəçilərdən heç vaxt gizlətməyin
4. **Mühərrikiniz təmizdirsə, `stackable: true` dəstəkləyin** — yan təsirləri olan mühərriklər üst-üstə yığılmamalıdır
5. **Sətirdaxili testlər yazın** — mühərriklər <1s müddətində yoxlanıla bilməlidir

### Dil Paketlərinin Hazırlanması

1. **`lite` intensivliyi ilə başlayın** — qaydalarınız ən aşağı parametrdə təhlükəsiz olmalıdır
2. **Qaydaların əhatə dairəsini müəyyən etmək üçün `context` istifadə edin** — yalnız `user` üçün olan qaydalar təsadüfən sistem sorğularına təsir göstərə bilməz
3. **JSON açarlarını tutmaqdan çəkinin** — `\\bword\\b` JSON daxilində uyğunluq taparaq strukturlaşdırılmış məlumatları poza bilər
4. **Sərhəd halları ilə test edin** — boş giriş, unicode, RTL mətni, emojilər
5. **Mövcud paketlərdən şablon kimi istifadə edin** — `en/filler.json` ən çox inkişaf etdirilmiş nümunədir

### Konveyerin Layihələndirilməsi

1. **Optimallaşdırmadan əvvəl profilini çıxarın** — əvvəlcə `compression_stats` ilə ölçün
2. **Yenidən tətbiq etməkdənsə kompozisiyaya üstünlük verin** — yeni mühərrik yazmazdan əvvəl Caveman qaydalarını genişləndirin
3. **Sıralama əsaslandırmasını sənədləşdirin** — A mühərrikinin niyə B mühərrikindən əvvəl gəldiyini şərhdə izah edin
4. **Hər 3 intensivlik səviyyəsində test edin** — `lite` sürətli, lakin itkilidir; `ultra` yavaş, lakin dəqiqdir

---

## İstinad: Daxili Mühərriklər

| Mühərrik ID-si       | Yığıla bilən | Standart stackPriority | Hədəflər                                |
| -------------------- | ------------ | ---------------------- | --------------------------------------- |
| `lite`               | Bəli         | 5                      | mesajlar, alət_nəticələri               |
| `rtk`                | Bəli         | 10                     | alət_nəticələri                         |
| `standard` (caveman) | Bəli         | 20                     | mesajlar, alət_nəticələri, kod_blokları |
| `aggressive`         | Bəli         | 30                     | mesajlar                                |
| `ultra`              | Bəli         | 40                     | mesajlar, kod_blokları                  |

### Həmçinin Baxın

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Emal xəttinə ümumi baxış
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mühərrik reyestri üzrə istinad
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Qayda formatının spesifikasiyası
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Dil paketləri haqqında ətraflı məlumat
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK mühərriki və fərdi filtrlər
- Mənbə: `open-sse/services/compression/` (117 fayl, ~250KB)
