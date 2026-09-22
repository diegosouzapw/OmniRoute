# Extending the Compression Pipeline (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Kısaca**: OmniRoute'un sıkıştırma motoru **takılabilir** yapıdadır — özel motorlar kaydedebilir, yeni diller için dil paketleri sunabilir ve yığınlanmış işlem hatları oluşturabilirsiniz. Bu kılavuz bunun nasıl yapılacağını gösterir.

**İlgili kılavuzlar:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — İşlem hattının tam genel görünümü
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motor kayıt defteri ve yerleşik motorlar
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK motoru ve özel filtreler
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Kural paketi biçimi başvurusu

---

## Genel Bakış

Sıkıştırma sisteminin **3 genişletme noktası** vardır:

| Genişletme noktası          | Kullanım alanı                                                        | Zorluk    |
| --------------------------- | --------------------------------------------------------------------- | --------- |
| **Özel motor**              | Yepyeni bir sıkıştırma algoritması ekleme (ör. alana özgü özetleyici) | İleri     |
| **Dil paketi**              | Yeni bir doğal dil için destek ekleme (ör. Hintçe, Arapça)            | Orta      |
| **Yığınlanmış işlem hattı** | Mevcut motorları özel bir sırayla birleştirme                         | Başlangıç |

```
┌─────────────────────────────────────────────────────────────┐
│                    Sıkıştırma Stratejisi                     │
│                                                              │
│   Girdi mesajları ──▶ getEffectiveMode() ──▶ mod            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motoru    motoru   motoru    zincirli    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Sıkıştırılmış çıktı             │
└─────────────────────────────────────────────────────────────┘

Strateji seçici MOD TABANLIDIR: her istek BİR mod seçer
(rtk / lite / standard / aggressive / ultra / stacked / off).
Yalnızca "stacked" modu birden fazla motoru sıralı olarak zincirler.
Varsayılan otomatik tetikleme modu "lite"tır (3 katmanlı bir öncelik zinciri değildir).
```

---

## Özel Bir Sıkıştırma Motoru Yazma

Motor arayüzü (`open-sse/services/compression/engines/types.ts`), her motorun karşılaması gereken sözleşmedir. 5 zorunlu yöntemi vardır.

### `CompressionEngine` Arayüzü

```ts
interface CompressionEngine {
  id: string; // Benzersiz motor kimliği
  name: string; // Görünen ad
  description: string; // Kısa açıklama
  icon: string; // Simge (emoji veya URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Yığınlanmış bir işlem hattında kullanılabilir
  stackPriority: number; // Yığınlanmış işlem hatlarındaki sıra (düşük = daha erken)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimal Örnek: Boşluk Motoru

Mümkün olan en basit motor — mesajlardaki fazladan boşlukları kaldırır.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Kod bloğu işaretçilerine göre ayır ve bunların içindeki boşlukları koru
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Kod bloklarını değiştirme
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Yalnızca düz yazıya uygula
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
  stackPriority: 100, // caveman/rtk'den SONRA çalıştır

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

    // İleti dizisini dolaş — hem dize hem de çok parçalı içeriği işle
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
      // Çok parçalı içerik: parçaları dolaş, yalnızca metin parçalarını sıkıştır
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
          return part; // image_url, tool_use vb. değerleri koru
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

// Genel olarak kaydet
registerCompressionEngine(whitespaceEngine);
````

### Özel Motorların Yerleştirileceği Konum

```
~/.omniroute/compression/engines/my-engine.ts    # Kullanıcı düzeyi
<project>/compression-engines/my-engine.ts        # Proje düzeyi (başlangıçta yüklenir)
```

Alternatif olarak bir eklentiden program aracılığıyla yükleyin:

```ts
// Eklentinizde
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Eklenti SDK'sı onRequest / onResponse / onError kancalarını sunar. Motoru,
  // eklenti modülü yüklenirken (veya ilk onRequest çağrısında) kaydedin; kendi
  // kapatma yolunuzdan kaydını kaldırın.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Kapatma sırasında:
// unregisterCompressionEngine("my-engine");
```

### Motorunuzu Test Etme

Motorunuzu bir eklentide veya başlangıç işlevinde kaydedin. Kaydedildikten sonra motor, `id` değeri aracılığıyla strateji seçicide kullanılabilir olacaktır. Yığınlanmış bir işlem hattında birleştirerek entegrasyonu test edin:

---

## Dil Paketleri Oluşturma

Mağara adamı tarzı sıkıştırma, her doğal dildeki dolgu ifadelerini, kaçamak anlatımları ve gereksiz uzun kalıpları işlemek için **dile özgü kural paketleri** kullanır. OmniRoute, **6 dil paketiyle** birlikte gelir: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paket Yapısı

Bir dil paketi, `open-sse/services/compression/rules/<language>/` altında bulunan **JSON dosyalarından** oluşan bir dizindir:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Nezaket ifadeleri, kaçamak anlatımlar, kibarlık
│   ├── context.json         # Bağlamı azaltan kurallar
│   ├── dedup.json           # Tekilleştirme kuralları
│   ├── structural.json      # Noktalama, biçimlendirme
│   └── ultra.json           # Agresif sıkıştırma kuralları
├── es/  (aynı yapı)
├── fr/  (aynı yapı)
├── de/  (aynı yapı)
├── ja/  (aynı yapı)
└── pt-BR/ (aynı yapı)
```

### Kural Anatomisi

Her kural şu yapıya sahiptir (`open-sse/services/compression/ruleLoader.ts` dosyasından):

```ts
interface FileRule {
  name: string; // İnsan tarafından okunabilir ad (kebab-case)
  pattern: string; // JavaScript düzenli ifade kalıbı
  replacement?: string; // Eşleşmenin neyle değiştirileceği
  replacementMap?: Record<string, string>; // VEYA anahtar→değiştirme eşlemesi
  flags?: string; // Düzenli ifade bayrakları (genellikle "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Bu yoğunluğun altında atla
  description?: string; // Dokümantasyon
}
```

### Örnek: Hintçe Dolgu Kuralları Ekleme

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
      "description": "'नमस्ते' gibi nazik giriş ifadelerini kaldır"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'Aslında' gibi dolgu ifadelerini kaldır"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Hintçedeki 'lütfen' ifadesini kaldır"
    }
  ]
}
```

### Doğrulama

Kural paketleri yükleme sırasında `_schema.json` şemasına göre doğrulanır. Hatalı yapıya sahip bir paket yüklenemez ve bir hata günlüğe kaydedilir:

```
RULE_LOADER: "hi/filler.json" paketi doğrulamayı geçemedi:
  - rules.0.pattern: Geçersiz düzenli ifade
  - rules.1.context: [all, user, system, assistant] değerlerinden biri olmalıdır
```

Doğrulama, bir paket yüklendiğinde (`_schema.json` şemasına göre) otomatik olarak çalışır; geçersiz bir paket reddedilir ve yukarıdaki hata günlüğe kaydedilir. Paket doğrulaması için ayrı bir `npm run` betiği yoktur — paketi yükleyin (ör. sunucuyu başlatın veya sıkıştırma yolunu çalıştırın) ve günlükleri izleyin.

### Özel Bir Dil Paketini Yükleme

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Alternatif olarak, tanınan bir konuma yerleştirin:

```
~/.omniroute/compression/rules/hi/filler.json  # Kullanıcı düzeyi
<project>/.compression/rules/hi/filler.json   # Proje düzeyi
```

### Dil Paketleri İçin En İyi Uygulamalar

1. **`filler` ile başlayın** — bunlar en yüksek etkiye sahip kurallardır
2. **Agresif kuralları sınırlamak için `minIntensity` kullanın** — aşırı sıkıştırmaya karşı koruma sağlar
3. **Test senaryoları ekleyin** — davranışı doğrulamak için JSON dosyasına `tests[]` dizisi ekleyin
4. **Sıralama önemlidir** — önceki kurallar ilk olarak uygulanır; yüksek etkili kuralları başa yerleştirin
5. **`replacement` konusunda ölçülü olun** — boş dize genellikle doğrudur; asla yeni içerik eklemeyin

### Çeviri Stratejisi

Kural paketlerini yeni bir dile yerelleştirirken:

1. **Kural adlarını çevirin** — hata ayıklama çıktısında görünürler
2. **Düzenli ifade kalıplarını uyarlayın** — doğrudan çeviri çoğu zaman işe yaramaz (sözcük sınırları farklıdır)
3. **Gerçek konuşmalarla test edin** — paket gerçek girdiler üzerinde güvenli olmalıdır
4. **Kültürel geleneklere uyum sağlayın** — örneğin Japonca paketlerde İngilizceye kıyasla daha fazla saygı ifadesi niteliğinde dolgu bulunur

---

## Yığınlanmış İşlem Hatları

**Yığınlanmış işlem hattı**, birden fazla motoru sırayla çalıştırır ve her motorun çıktısı bir sonraki motoru besler. `mode: stacked` dahili olarak bu şekilde çalışır.

### Yığınlama Nasıl Çalışır?

```
Girdi (10.000 belirteç)
        │
        ▼
   ┌──────────┐
   │  Motor   │  öncelik 10
   │  A       │  ──▶ çıktı: 6.000 belirteç (-%40)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  öncelik 50
   │  B       │  ──▶ çıktı: 2.400 belirteç (-%60)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  öncelik 100
   │  C       │  ──▶ çıktı: 1.200 belirteç (-%80)
   └────┬─────┘
        │
        ▼
Nihai çıktı (1.200 belirteç, toplamda ~%88 tasarruf)
```

`mode: "stacked"` seçildiğinde motorlar, `pipeline` dizisinde belirtilen sırayla çalıştırılır.
N numaralı motorun çıktısı, N+1 numaralı motorun girdisi olur.

### Sıkıştırma Modları

OmniRoute; yapılandırmaya, otomatik tetikleme eşiklerine ve kombinasyon geçersiz kılmalarına göre **her istek için BİR mod** seçer.
Kullanılabilir modlar `open-sse/services/compression/types.ts` dosyasında tanımlanmıştır (`CompressionMode` türü):

| Mod          | Motorlar             | Kullanım amacı                                                                                                                                                                                                   |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Yok                  | Tüm sıkıştırmayı devre dışı bırakır                                                                                                                                                                              |
| `rtk`        | Yalnızca RTK         | Komut çıktısının yoğun olduğu oturumlar (%80+ tasarruf)                                                                                                                                                          |
| `lite`       | Yalnızca Lite        | Muhafazakâr sıkıştırma (hızlı, güvenli)                                                                                                                                                                          |
| `standard`   | Caveman              | Dil paketleriyle düz yazı sıkıştırması                                                                                                                                                                           |
| `aggressive` | Caveman + Aggressive | Agresif düz yazı sıkıştırması + agresif son geçiş                                                                                                                                                                |
| `ultra`      | Ultra                | Maksimum sıkıştırma (kayıplı, son çare). `ultra.modelPath` ayarlandığında isteğe bağlı olarak **LLMLingua-2** SLM motoru üzerinden yönlendirilir (model kullanılamadığında kural tabanlı yola açık geçiş yapar). |
| `stacked`    | Özel işlem hattı     | Motorları istenilen sırada birleştirir (aşağıya bakın)                                                                                                                                                           |

> Yukarıdaki mod motorlarına ek olarak kayıt defteri, yığınlanabilir özel motorlar da içerir —
> **CCR**, **headroom**, **ionizer** ve **session-dedup** — bunlar
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines) belgesinde açıklanmıştır.

Mod seçimi, `open-sse/services/compression/strategySelector.ts` içindeki `getEffectiveMode()` tarafından belirlenir:

1. Sıkıştırma devre dışıysa: `"off"`
2. Bir kombinasyon geçersiz kılması varsa: geçersiz kılmayı kullan
3. Otomatik tetikleme eşiği aşılmışsa: `autoTriggerMode` kullan (varsayılan: `"lite"`)
4. Aksi takdirde: `defaultMode` kullan

### Varsayılan Yığınlanmış İşlem Hattı

`mode: "stacked"` açıkça yapılandırıldığında varsayılan işlem hattı şunları birleştirir:

1. **RTK** — komut çıktısındaki gürültüyü ayıklar (terminal çıktısında ~%80 tasarruf)
2. **Caveman** — dolgu ifadelerini kaldırır, düz yazıyı özlü hâle getirir (kalan metinde ~%46)
3. **Lite** — son boşluk düzenleme + yinelenenleri kaldırma geçişi

Bu bileşim, araç kullanımının yoğun olduğu oturumlarda **%78-95 tasarruf** sağlar.

### Yığınlanmış İşlem Hatlarını Yapılandırma

Kombinasyon yapılandırmasında:

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

Motorları atlayabilir, özel motorlar ekleyebilir veya sıralarını değiştirebilirsiniz.

### Durum Aktarımı

Motorlar, istek bağlamındaki (`options` içinde) meta verileri okuyabilir:

```ts
compress(body, config) {
  // Önceki motorların meta verilerini oku
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Meta veriler **salt okunurdur** — motorlar istek bağlamını değiştiremez, yalnızca kendi gövde çıktılarını değiştirebilir.

### Çalıştırma Sırasındaki İncelikler

| Motor sırası                                 | Etki                                                                                                          |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                         | **Önerilen** (önce gürültüyü, ardından dili ve son olarak boşlukları ayıklar)                                 |
| Lite → RTK → Caveman                         | Kötü — Lite, ham çıktıdaki boşlukları ayıklayarak RTK'nin kalıp eşleştirmesinin başarısız olmasına neden olur |
| Caveman → RTK                                | Kötü — Caveman, metni RTK'nin tanımayacağı biçimlerde yeniden yazabilir                                       |
| Önce `tool_results` olacak herhangi bir sıra | Daha iyi — araç çıktısı en gürültülü içeriktir                                                                |

### Ne Zaman Yığınlama YAPILMAMALI?

Yığınlama her zaman daha iyi değildir:

- **Basit mesajlar** (araç çıktısı yok) — tek başına Caveman veya Lite yeterlidir
- **Maliyet duyarlı kullanım** — her motor ~5-50ms gecikme ekler
- **Belirli araçlar** — kabuk çıktısı için genellikle yalnızca RTK yeterlidir

### Özel İşlem Hattı Oluşturma

Adlandırılmış bir işlem hattı kayıt defteri yoktur. Yığınlanmış bir işlem hattı, `applyStackedCompression()` işlevine (`@omniroute/open-sse/services/compression/strategySelector` paketinden dışa aktarılır) iletilen **satır içi bir adım dizisinden** ibarettir:

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Bir işlem hattı iletmediğinizde varsayılan olarak `rtk(standard) → caveman(full)` kullanılır.

Bunu yapılandırmadan yönetmek için `mode: "stacked"` ayarını yapın ve adım dizisini `stackedPipeline` altında (`config.stackedPipeline` üzerinden okunur) sağlayın:

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

## Üst Kaynak Senkronizasyon Politikası

OmniRoute'un sıkıştırma motorları README dosyasında çeşitli üst kaynak projelere atıfta bulunur
("RTK, Caveman, LLMLingua-2 ve Troglodita'dan esinlenilmiştir"). Katkıda bulunanların sıkça
sorduğu bir soru şudur: **Üst kaynak RTK'ye yeni bir araç filtresi veya Caveman'e yeni bir kural
paketi eklendiğinde, bu yenilik OmniRoute'a nasıl ulaşır?** Bu bölüm, bu sorunun kesin yanıtıdır.

### Depoya alınmış kopyalar ve bağımsız uygulamalar

| Motor                        | Üst kaynakla ilişkisi                                                                                                                                         | Konum                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Bağımsız yeniden uygulama** (esinlenilmiş, kopyalanmamıştır)                                                                                                | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Bağımsız yeniden uygulama** (esinlenilmiştir)                                                                                                               | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Büyük ölçüde dahilîdir; yalnızca `gcf/` codec'i `gcf-typescript` projesinden **gerçek anlamda depoya alınmıştır** (MIT, SPDX işaretli, yalnızca genel profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Esinlenilmiştir (`llmlingua` + `session-dedup` motorlarına yön verir)                                                                                         | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Önemli nokta: **RTK ve Caveman, _fikirlerin_ (filtre kuralları, kural paketleri)
temiz oda yöntemiyle geliştirilmiş TypeScript uygulamalarıdır; depoya alınmış kaynak
ağaçları değildir.** `git pull` ile çekilebilecek bir üst kaynak kopyası yoktur — README'de
"paketlenmiştir" yerine "esinlenilmiştir" denmesinin nedeni de tam olarak budur.

### Üst kaynak iyileştirmeleri nasıl birleştirilir?

Tasarım gereği **otomatik üst kaynak sürüm takibi ve `compression-sync`
etiketi yoktur**. Motorlar yeniden uygulamalar olduğundan, üst kaynaktaki bir RTK
filtresi veya Caveman kural paketi kod olarak birleştirilmez; bunun yerine
**OmniRoute'un kendi biçiminde yeni bir kural/filtre olarak yeniden ifade edilir**
(bkz. [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ve normal bir
PR aracılığıyla gerektiğinde eklenir. Yukarıdaki genişletme noktaları (özel motor,
dil paketi, RTK filtresi), bu tür katkılar için onaylanmış yöntemlerdir.

Bu akışın yakın tarihli örnekleri:

- Gradle ve `dotnet` derleme çıktısı için RTK filtreleri (v3.8.42)
- kubectl / docker-build / composer / gh için RTK filtreleri (#2824)
- Caveman Endonezce dil paketi (#3975) ile Almanca / Fransızca / Japonca / Çince paketleri

### Headroom (girdi sıkıştırma proxy'si)

Headroom **tamamen dahilîdir** — sabitlenmiş, depoya alınmış bir `gcf` codec anlık
görüntüsünün yanı sıra OmniRoute'un kendi `smartcrusher` / `toon` / `tabular`
katmanlarından oluşur. Depoya alınmış kopyanın ötesinde takip edilecek aktif bir
üst kaynak yoktur; `gcf` güncellemeleri codec değiştiğinde elle yenilenir ve
sıkıştırma bütçesi geçidine (`check:compression-budget`) göre yeniden doğrulanır.

### Üst kaynaktan esinlenen bir iyileştirme önerme

1. **Depoya almayın** — üst kaynak kuralını/filtresini OmniRoute'un biçiminde yeniden ifade edin.
2. Aşağıdaki eşleşen genişletme noktası üzerinden ekleyin (dil paketi, RTK filtresi veya
   özel motor).
3. Lisans taşıyan kaynak kodunu kopyalamak yerine PR açıklamasında üst kaynak
   projeye atıfta bulunun.
4. Testleri ekleyin ve `check:compression-budget` geçidinin hâlâ başarıyla geçildiğini doğrulayın.

---

## Bir Çıktı Stili Ekleme

Çıktı stilleri ([kılavuzun katalog tablosuna](./COMPRESSION_GUIDE.md#output-styles-catalog) bakın), girdi motorlarının yanıt tarafındaki karşılığıdır: gönderdiklerinizi sıkıştırmak yerine, modele daha düşük maliyetli çıktı üretmesi talimatını verirler. Kayıt defteri `open-sse/services/compression/outputStyles/catalog.ts` içindeki `OUTPUT_STYLE_CATALOG` sabitidir ve **tek bir katalog girdisi özelliğin tamamını oluşturur**: enjektör, kontrol paneli ayarları bölümü, kalıcılık ve telemetri katalogdaki girdileri listeler; güncellenecek başka bir liste yoktur.

1. **`OUTPUT_STYLE_CATALOG` içine `id`, `label`, `description` ve İngilizce üç `levels` (`lite`, `full`, `ultra`) alanını içeren bir girdi ekleyin.** Kodun, yolların, komutların, hataların ve URL'lerin olduğu gibi kalması için her seviye `${SHARED_BOUNDARIES}` ile bitmelidir. Talimat metni her `(id, level, language)` birleşimi için **statik ve deterministik** olmalıdır; izin verilen tek enterpolasyon `${SHARED_BOUNDARIES}` değeridir.
2. **Çevirin.** `i18n` altında en az bir `pt-BR` bloğu sağlayın; `ponytail` ve `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) referans yapıdır. Bilinçli olarak tek dilli olan bir stil bunun yerine `locale` değerini ayarlar (`terse-cjk` → `zh` gibi) ve ardından yalnızca o yerel ayar altında sunulur.
3. **Matris korumasını güncelleyin** — stilin dillerini `tests/unit/compression/output-styles-i18n-matrix.test.ts` içindeki `BASELINE_LANGUAGES` öğesine ekleyin. Bu denetim, açık bir takip talebi içeren `KNOWN_ENGLISH_ONLY` girdisi taşımadığı sürece, gerekli çevirilere sahip olmayan ve yerel ayarla sınırlandırılmamış her yeni stilde başarısız olur.
4. **Stile özel bir test ekleyin** ve bunu `tests/unit/compression/i-have-adhd-catalog.test.ts` örneğine göre oluşturun: katalog yapısı, her seviye için sınırlar maddesi ve her çevirinin İngilizceden kopyalanmak yerine kendi dilinde yazıldığını doğrulayan bir sabitleme.
5. **Atıf**: Stil başka bir üst kaynak projeden uyarlandıysa, girdideki bir kaynak yorumunda projeyi belirtin (ör. `i-have-adhd` → ayghri/i-have-adhd, MIT); yukarıdaki "Üst kaynaktan esinlenen bir iyileştirme önerme" bölümüyle aynı kural geçerlidir.

Herhangi bir kullanıcı arayüzü, şema veya telemetri değişikliği gerekmez; bu yüzeyler katalogdan oluşturulur.

---

## En İyi Uygulamalar

### Motor Geliştirme

1. **Her zaman `validateConfig` uygulayın** — doğrulaması olmayan motorlar sessiz hatalara neden olur
2. **Gerçekçi bir `targetLatencyMs` ayarlayın** — strateji seçici bunu motorları seçmek için kullanır
3. **Kontrol paneli için `getConfigSchema` kullanın** — yapılandırmayı hiçbir zaman kullanıcılardan gizlemeyin
4. **Motorunuz safsa `stackable: true` desteği sağlayın** — yan etkileri olan motorlar birlikte yığınlanmamalıdır
5. **Satır içi testler yazın** — motorlar 1 saniyeden kısa sürede doğrulanabilmelidir

### Dil Paketi Geliştirme

1. **`lite` yoğunluğuyla başlayın** — kurallarınız en düşük ayarda güvenli olmalıdır
2. **Kuralların kapsamını belirlemek için `context` kullanın** — yalnızca `user` için olan kurallar sistem istemlerini yanlışlıkla etkileyemez
3. **JSON anahtarlarını yakalamaktan kaçının** — `\\bword\\b`, JSON içinde eşleşerek yapılandırılmış verileri bozabilir
4. **Uç durumlarla test edin** — boş girdi, unicode, RTL metin, emojiler
5. **Mevcut paketleri şablon olarak kullanın** — `en/filler.json` en gelişmiş örnektir

### İşlem Hattı Tasarımı

1. **Optimize etmeden önce profil çıkarın** — önce `compression_stats` ile ölçüm yapın
2. **Yeniden uygulamak yerine bileşimi tercih edin** — yeni bir motor yazmadan önce Caveman kurallarını genişletin
3. **Sıralama gerekçesini belgeleyin** — A motorunun neden B motorundan önce geldiğini yorumda açıklayın
4. **3 yoğunluk seviyesinin tamamında test edin** — `lite` hızlıdır ancak kayıplıdır, `ultra` yavaştır ancak hassastır

---

## Referans: Yerleşik Motorlar

| Motor Kimliği        | Yığınlanabilir | Varsayılan stackPriority | Hedefler                               |
| -------------------- | -------------- | ------------------------ | -------------------------------------- |
| `lite`               | Evet           | 5                        | mesajlar, araç_sonuçları               |
| `rtk`                | Evet           | 10                       | araç_sonuçları                         |
| `standard` (caveman) | Evet           | 20                       | mesajlar, araç_sonuçları, kod_blokları |
| `aggressive`         | Evet           | 30                       | mesajlar                               |
| `ultra`              | Evet           | 40                       | mesajlar, kod_blokları                 |

### Ayrıca Bakınız

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — İşlem hattına genel bakış
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motor kayıt sistemi referansı
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Kural biçimi belirtimi
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Dil paketi ayrıntıları
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK motoru ve özel filtreler
- Kaynak: `open-sse/services/compression/` (117 dosya, ~250KB)
