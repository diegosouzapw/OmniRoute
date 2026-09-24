# Extending the Compression Pipeline (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Ringkasnya**: Enjin pemampatan OmniRoute boleh **dipasang ganti** — anda boleh mendaftarkan enjin tersuai, menyediakan pek bahasa untuk bahasa baharu dan menggabungkan saluran paip bertindan. Panduan ini menunjukkan caranya.

**Panduan berkaitan:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Gambaran keseluruhan saluran paip lengkap
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Daftar enjin dan enjin terbina dalam
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Enjin RTK dan penapis tersuai
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Rujukan format pek peraturan

---

## Gambaran Keseluruhan

Sistem pemampatan mempunyai **3 titik peluasan**:

| Titik peluasan        | Kes penggunaan                                                              | Tahap kesukaran |
| --------------------- | --------------------------------------------------------------------------- | --------------- |
| **Enjin tersuai**     | Tambahkan algoritma pemampatan serba baharu (cth., peringkas khusus domain) | Lanjutan        |
| **Pek bahasa**        | Tambahkan sokongan untuk bahasa tabii baharu (cth., Hindi, Arab)            | Sederhana       |
| **Saluran bertindan** | Gabungkan enjin sedia ada dalam susunan tersuai                             | Pemula          |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategi Pemampatan                       │
│                                                              │
│   Mesej input ──▶ getEffectiveMode() ──▶ mod                │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   enjin     enjin    enjin     dirantai    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Output termampat               │
└─────────────────────────────────────────────────────────────┘

Pemilih strategi adalah BERASASKAN MOD: setiap permintaan memilih SATU mod
(rtk / lite / standard / aggressive / ultra / stacked / off).
Hanya mod "stacked" merantaikan berbilang enjin secara berurutan.
Mod pencetus automatik lalai ialah "lite" (bukan rantaian keutamaan 3 peringkat).
```

---

## Menulis Enjin Pemampatan Tersuai

Antara muka enjin (`open-sse/services/compression/engines/types.ts`) ialah kontrak yang mesti dipenuhi oleh setiap enjin. Ia mempunyai 5 kaedah wajib.

### Antara Muka `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID enjin unik
  name: string; // Nama paparan
  description: string; // Penerangan ringkas
  icon: string; // Ikon (emoji atau URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Boleh digunakan dalam saluran paip bertindan
  stackPriority: number; // Susunan dalam saluran paip bertindan (lebih rendah = lebih awal)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Contoh Minimum: Enjin Ruang Putih

Enjin paling ringkas yang boleh dibina — membuang ruang putih berlebihan daripada mesej.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Pisahkan mengikut penanda blok kod dan kekalkan ruang kosong di dalamnya
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Jangan ubah suai blok kod
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Hanya gunakan pada prosa
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
  stackPriority: 100, // Jalankan SELEPAS caveman/rtk

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

    // Rentasi tatasusunan mesej — kendalikan kandungan rentetan dan berbilang bahagian
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
      // Kandungan berbilang bahagian: rentasi bahagian dan mampatkan bahagian teks sahaja
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
          return part; // kekalkan image_url, tool_use dan sebagainya
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

// Daftar secara global
registerCompressionEngine(whitespaceEngine);
````

### Tempat Meletakkan Enjin Tersuai

```
~/.omniroute/compression/engines/my-engine.ts    # Peringkat pengguna
<project>/compression-engines/my-engine.ts        # Peringkat projek (dimuatkan semasa permulaan)
```

Atau muatkannya secara pengaturcaraan daripada pemalam:

```ts
// Dalam pemalam anda
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK pemalam menyediakan cangkuk onRequest / onResponse / onError. Daftarkan
  // enjin apabila modul pemalam dimuatkan (atau pada onRequest pertama); nyahdaftarkannya
  // daripada laluan pembongkaran anda sendiri.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Semasa pembongkaran:
// unregisterCompressionEngine("my-engine");
```

### Menguji Enjin Anda

Daftarkan enjin anda dalam pemalam atau fungsi permulaan. Setelah didaftarkan, enjin tersebut akan tersedia
dalam pemilih strategi melalui `id`-nya. Uji penyepaduan dengan menggabungkannya dalam talian paip bertindan:

---

## Mencipta Pek Bahasa

Pemampatan gaya Caveman menggunakan **pek peraturan khusus bahasa** untuk mengendalikan kata pengisi, ungkapan berlapik dan corak berjela-jela dalam setiap bahasa semula jadi. OmniRoute disertakan dengan **6 pek bahasa**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktur Pek

Pek bahasa ialah direktori yang mengandungi **fail JSON** di bawah `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Kata-kata ramah, ungkapan berlapik, kesopanan
│   ├── context.json         # Peraturan pengurangan konteks
│   ├── dedup.json           # Peraturan penyahduplikasian
│   ├── structural.json      # Tanda baca, pemformatan
│   └── ultra.json           # Peraturan pemampatan agresif
├── es/  (struktur yang sama)
├── fr/  (struktur yang sama)
├── de/  (struktur yang sama)
├── ja/  (struktur yang sama)
└── pt-BR/ (struktur yang sama)
```

### Anatomi Peraturan

Setiap peraturan mempunyai bentuk berikut (daripada `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nama yang boleh dibaca manusia (kebab-case)
  pattern: string; // Corak regex JavaScript
  replacement?: string; // Teks untuk menggantikan padanan
  replacementMap?: Record<string, string>; // ATAU peta kunci→penggantian
  flags?: string; // Bendera regex (biasanya "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Langkau di bawah keamatan ini
  description?: string; // Dokumentasi
}
```

### Contoh: Menambah Peraturan Kata Pengisi Hindi

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
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### Pengesahan

Pek peraturan disahkan terhadap `_schema.json` semasa dimuatkan. Pek dengan struktur yang tidak betul akan gagal dimuatkan dan merekodkan ralat:

```
RULE_LOADER: pek "hi/filler.json" gagal disahkan:
  - rules.0.pattern: Regex tidak sah
  - rules.1.context: mestilah salah satu daripada [all, user, system, assistant]
```

Pengesahan dijalankan secara automatik apabila pek dimuatkan (terhadap `_schema.json`); pek yang
tidak sah akan ditolak dan ralat di atas direkodkan. Tiada skrip `npm run`
yang berasingan untuk pengesahan pek — muatkan pek tersebut (contohnya, mulakan pelayan atau
jalankan laluan pemampatan) dan pantau log.

### Memuatkan Pek Bahasa Tersuai

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Atau letakkannya di lokasi yang dikenali:

```
~/.omniroute/compression/rules/hi/filler.json  # Peringkat pengguna
<project>/.compression/rules/hi/filler.json   # Peringkat projek
```

### Amalan Terbaik untuk Pek Bahasa

1. **Mulakan dengan `filler`** — peraturan ini memberikan impak tertinggi
2. **Gunakan `minIntensity`** untuk mengehadkan peraturan agresif — melindungi daripada pemampatan berlebihan
3. **Sertakan kes ujian** — tambah tatasusunan `tests[]` dalam JSON untuk mengesahkan tingkah laku
4. **Susunan penting** — peraturan yang lebih awal digunakan terlebih dahulu; letakkan peraturan berimpak tinggi dahulu
5. **Bersikap konservatif dengan `replacement`** — rentetan kosong biasanya pilihan yang betul; jangan sekali-kali memperkenalkan kandungan baharu

### Strategi Terjemahan

Apabila menyetempatkan pek peraturan kepada bahasa baharu:

1. **Terjemahkan nama peraturan** — nama tersebut muncul dalam output nyahpepijat
2. **Sesuaikan corak regex** — terjemahan langsung sering gagal (sempadan perkataan berbeza)
3. **Uji dengan perbualan sebenar** — pek tersebut mestilah selamat untuk input sebenar
4. **Padankan konvensyen budaya** — sebagai contoh, pek bahasa Jepun mempunyai lebih banyak kata pengisi kehormatan berbanding bahasa Inggeris

---

## Talian Paip Bertindan

**Talian paip bertindan** menjalankan berbilang enjin secara berurutan, dengan output setiap enjin disalurkan kepada enjin seterusnya. Beginilah cara `mode: stacked` berfungsi secara dalaman.

### Cara Penindanan Berfungsi

```
Input (10,000 token)
        │
        ▼
   ┌──────────┐
   │  Enjin   │  keutamaan 10
   │  A       │  ──▶ output: 6,000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Enjin   │  keutamaan 50
   │  B       │  ──▶ output: 2,400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Enjin   │  keutamaan 100
   │  C       │  ──▶ output: 1,200 token (-80%)
   └────┬─────┘
        │
        ▼
Output akhir (1,200 token, gabungan penjimatan ~88%)
```

Apabila `mode: "stacked"` dipilih, enjin dilaksanakan secara berurutan mengikut susunan yang ditetapkan dalam tatasusunan `pipeline`.
Output enjin N menjadi input enjin N+1.

### Mod Pemampatan

OmniRoute memilih **SATU mod bagi setiap permintaan** berdasarkan konfigurasi, ambang pencetus automatik dan penggantian kombo.
Mod yang tersedia ditakrifkan dalam `open-sse/services/compression/types.ts` (jenis `CompressionMode`):

| Mod          | Enjin                | Kes penggunaan                                                                                                                                                                                                                    |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Tiada                | Lumpuhkan semua pemampatan                                                                                                                                                                                                        |
| `rtk`        | RTK sahaja           | Sesi yang sarat dengan output perintah (penjimatan 80%+)                                                                                                                                                                          |
| `lite`       | Lite sahaja          | Pemampatan konservatif (pantas, selamat)                                                                                                                                                                                          |
| `standard`   | Caveman              | Pemampatan prosa dengan pek bahasa                                                                                                                                                                                                |
| `aggressive` | Caveman + Aggressive | Prosa agresif + laluan akhir agresif                                                                                                                                                                                              |
| `ultra`      | Ultra                | Pemampatan maksimum (berkehilangan, pilihan terakhir). Secara pilihan dihalakan melalui enjin SLM **LLMLingua-2** apabila `ultra.modelPath` ditetapkan (beralih kepada laluan berasaskan peraturan apabila model tidak tersedia). |
| `stacked`    | Talian paip tersuai  | Gabungkan enjin dalam sebarang susunan (lihat di bawah)                                                                                                                                                                           |

> Selain enjin mod di atas, pendaftar turut menyediakan enjin khusus yang boleh ditindan —
> **CCR**, **headroom**, **ionizer** dan **session-dedup** — yang didokumenkan dalam
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Pemilihan mod ditentukan oleh `getEffectiveMode()` dalam `open-sse/services/compression/strategySelector.ts`:

1. Jika pemampatan dilumpuhkan: `"off"`
2. Jika terdapat penggantian kombo: gunakan penggantian tersebut
3. Jika ambang pencetus automatik dilepasi: gunakan `autoTriggerMode` (lalai: `"lite"`)
4. Jika tidak: gunakan `defaultMode`

### Talian Paip Bertindan Lalai

Apabila `mode: "stacked"` dikonfigurasikan secara eksplisit, talian paip lalai menggabungkan:

1. **RTK** — membuang hingar output perintah (penjimatan ~80% pada output terminal)
2. **Caveman** — membuang kata pengisi, meringkaskan prosa (~46% pada teks yang masih berbaki)
3. **Lite** — laluan akhir untuk ruang kosong + penyahduplikasian

Gabungan ini mencapai **penjimatan 78-95%** pada sesi yang banyak menggunakan alat.

### Mengkonfigurasi Talian Paip Bertindan

Dalam konfigurasi kombo:

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

Anda boleh meninggalkan enjin tertentu, menambah enjin tersuai atau menyusun semulanya.

### Penghantaran Keadaan

Enjin boleh membaca metadata daripada konteks permintaan (dalam `options`):

```ts
compress(body, config) {
  // Baca metadata daripada enjin sebelumnya
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata adalah **baca sahaja** — enjin tidak boleh mengubah konteks permintaan, hanya output kandungan masing-masing.

### Perkara yang Perlu Diberi Perhatian tentang Susunan Pelaksanaan

| Susunan enjin                                 | Kesan                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                          | **Disyorkan** (membuang hingar dahulu, kemudian bahasa, kemudian ruang kosong)                  |
| Lite → RTK → Caveman                          | Buruk — Lite membuang ruang kosong daripada output mentah, menyebabkan pemadanan pola RTK gagal |
| Caveman → RTK                                 | Buruk — Caveman mungkin menulis semula teks dengan cara yang tidak dikenali oleh RTK            |
| Sebarang susunan dengan `tool_results` dahulu | Lebih baik — output alat ialah kandungan yang paling sarat dengan hingar                        |

### Masa untuk TIDAK Menindan

Penindanan tidak semestinya sentiasa lebih baik:

- **Mesej ringkas** (tiada output alat) — Caveman atau Lite sahaja sudah mencukupi
- **Sensitif terhadap kos** — setiap enjin menambah kependaman ~5-50ms
- **Alat tertentu** — RTK sahaja biasanya mencukupi untuk output shell

### Membina Talian Paip Tersuai

Tiada daftar saluran paip bernama. Saluran paip bertindan hanyalah **tatasusunan langkah sebaris** yang dihantar kepada `applyStackedCompression()` (dieksport daripada `@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Apabila anda tidak menyediakan saluran paip, ia menggunakan `rtk(standard) → caveman(full)` secara lalai.

Untuk mengawalnya melalui konfigurasi, tetapkan `mode: "stacked"` dan sediakan tatasusunan langkah di bawah `stackedPipeline` (dibaca daripada `config.stackedPipeline`):

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

## Dasar Penyegerakan Huluan

Enjin pemampatan OmniRoute mengiktiraf beberapa projek huluan dalam README
("diilhamkan oleh RTK, Caveman, LLMLingua-2, Troglodita"). Soalan lazim daripada penyumbang
ialah: **apabila RTK huluan menambah penapis alat baharu atau Caveman menambah pek
peraturan, bagaimanakah penambahan itu sampai ke OmniRoute?** Bahagian ini ialah jawapan muktamad.

### Salinan vendored berbanding pelaksanaan bebas

| Enjin                        | Hubungan dengan huluan                                                                                                                              | Lokasi                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Pelaksanaan semula bebas** (diilhamkan oleh, bukan salinan)                                                                                       | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Pelaksanaan semula bebas** (diilhamkan oleh)                                                                                                      | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Sebahagian besarnya dalaman; hanya codec `gcf/` yang **benar-benar vendored** daripada `gcf-typescript` (MIT, ditandai SPDX, profil generik sahaja) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Diilhamkan oleh (memacu enjin `llmlingua` + `session-dedup`)                                                                                        | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Perkara utama: **RTK dan Caveman ialah pelaksanaan TypeScript bilik bersih bagi
_idea_ tersebut (peraturan penapis, pek peraturan), bukannya pepohon sumber vendored.** Tiada
salinan huluan untuk menjalankan `git pull` — itulah sebabnya README menyatakan
"diilhamkan oleh" dan bukannya "disertakan bersama".

### Cara penambahbaikan huluan digabungkan

**Tiada penjejakan keluaran huluan automatik dan tiada label `compression-sync`**
— ini disengajakan. Oleh sebab enjin tersebut merupakan pelaksanaan semula, penapis RTK
atau pek peraturan Caveman huluan tidak digabungkan sebagai kod; ia **dinyatakan semula sebagai
peraturan/penapis baharu dalam format OmniRoute sendiri** (lihat
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) dan dimasukkan secara ad hoc melalui
PR biasa. Titik peluasan di atas (enjin tersuai, pek bahasa, penapis RTK)
ialah cara yang dibenarkan untuk menyumbangkannya.

Contoh terkini bagi aliran ini:

- Penapis RTK untuk output binaan Gradle & `dotnet` (v3.8.42)
- Penapis RTK untuk kubectl / docker-build / composer / gh (#2824)
- Pek bahasa Indonesia Caveman (#3975), serta pek bahasa Jerman / Perancis / Jepun / Cina

### Headroom (proksi pemampatan input)

Headroom adalah **sepenuhnya dalaman** — petikan codec `gcf` vendored yang dipinkan serta
lapisan `smartcrusher` / `toon` / `tabular` milik OmniRoute sendiri. Tiada huluan aktif
untuk dijejaki selain salinan vendored tersebut; kemas kini kepada `gcf` disegarkan
secara manual apabila codec berubah dan disahkan semula terhadap get bajet pemampatan
(`check:compression-budget`).

### Mencadangkan penambahbaikan yang diilhamkan oleh huluan

1. **Jangan vendor** — nyatakan semula peraturan/penapis huluan dalam format OmniRoute.
2. Tambahkannya melalui titik peluasan yang sepadan di bawah (pek bahasa, penapis RTK, atau
   enjin tersuai).
3. Rujuk projek huluan dalam perihalan PR (atribusi), bukan dengan
   menyalin sumbernya yang mengandungi lesen.
4. Sertakan ujian dan pastikan get `check:compression-budget` masih lulus.

---

## Menambah Gaya Output

Gaya output (lihat [jadual katalog panduan](./COMPRESSION_GUIDE.md#output-styles-catalog))
ialah pasangan pada sisi respons bagi enjin input: berbanding memampatkan perkara yang anda
hantar, gaya ini mengarahkan model untuk menghasilkan output yang lebih menjimatkan. Registrinya ialah
`OUTPUT_STYLE_CATALOG` dalam `open-sse/services/compression/outputStyles/catalog.ts`, dan
**satu entri katalog merangkumi keseluruhan ciri**: penyuntik, panel tetapan papan pemuka,
pengekalan dan telemetri semuanya menyenaraikan katalog tersebut — tiada senarai lain yang perlu dikemas kini.

1. **Tambah satu entri pada `OUTPUT_STYLE_CATALOG`** dengan `id`, `label`, `description` dan
   tiga `levels` bahasa Inggeris (`lite`, `full`, `ultra`). Setiap aras mesti diakhiri dengan
   `${SHARED_BOUNDARIES}` supaya kod, laluan, perintah, ralat dan URL kekal kata demi kata.
   Teks arahan mestilah **statik dan deterministik** bagi setiap
   `(id, level, language)` — `${SHARED_BOUNDARIES}` ialah satu-satunya interpolasi yang dibenarkan.
2. **Terjemahkannya.** Sertakan sekurang-kurangnya blok `pt-BR` di bawah `i18n`; `ponytail` dan
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ialah bentuk rujukan. Gaya yang sengaja
   menggunakan satu bahasa sahaja menetapkan `locale` sebaliknya (seperti `terse-cjk` → `zh`) dan kemudiannya
   hanya ditawarkan di bawah penempatan tersebut.
3. **Kemas kini pengawal matriks** — tambahkan bahasa gaya tersebut pada `BASELINE_LANGUAGES` dalam
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Gerbang tersebut akan menggagalkan mana-mana gaya baharu
   yang tidak dikawal oleh penempatan dan tidak mempunyai terjemahan yang diperlukan, melainkan gaya itu mempunyai
   entri `KNOWN_ENGLISH_ONLY` yang jelas berserta isu penjejakan.
4. **Tambah ujian bagi setiap gaya** yang dimodelkan berdasarkan
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: bentuk katalog, klausa sempadan
   bagi setiap aras dan penambat yang mengesahkan setiap terjemahan ditulis dalam bahasanya sendiri
   dan bukannya disalin daripada bahasa Inggeris.
5. **Atribusi**: jika gaya tersebut diadaptasi daripada projek huluan, berikan penghargaan dalam
   komen sumber pada entri itu (cth. `i-have-adhd` → ayghri/i-have-adhd, MIT) — peraturan yang sama
   seperti "Mencadangkan penambahbaikan yang diilhamkan oleh projek huluan" di atas.

Tiada perubahan UI, skema atau telemetri diperlukan — permukaan tersebut dipaparkan daripada katalog.

---

## Amalan Terbaik

### Pembangunan Enjin

1. **Sentiasa laksanakan `validateConfig`** — enjin tanpa pengesahan menyebabkan kegagalan senyap
2. **Tetapkan `targetLatencyMs` yang realistik** — digunakan oleh pemilih strategi untuk memilih enjin
3. **Gunakan `getConfigSchema` untuk papan pemuka** — jangan sesekali sembunyikan konfigurasi daripada pengguna
4. **Sokong `stackable: true` jika enjin anda tulen** — enjin yang mempunyai kesan sampingan tidak seharusnya ditindan
5. **Tulis ujian sebaris** — enjin seharusnya boleh disahkan dalam <1s

### Pembangunan Pek Bahasa

1. **Mulakan dengan keamatan `lite`** — peraturan anda seharusnya selamat pada tetapan terendah
2. **Gunakan `context` untuk mengehadkan skop peraturan** — peraturan `user` sahaja tidak boleh menjejaskan gesaan sistem secara tidak sengaja
3. **Elakkan menangkap kekunci JSON** — `\\bword\\b` boleh sepadan dalam JSON, lalu merosakkan data berstruktur
4. **Uji dengan kes pinggir** — input kosong, unikod, teks RTL, emoji
5. **Gunakan pek sedia ada sebagai templat** — `en/filler.json` ialah contoh yang paling dibangunkan

### Reka Bentuk Talian Paip

1. **Buat pemprofilan sebelum mengoptimumkan** — ukur dengan `compression_stats` terlebih dahulu
2. **Utamakan komposisi berbanding pelaksanaan semula** — lanjutkan peraturan Caveman sebelum menulis enjin baharu
3. **Dokumentasikan rasional susunan** — berikan komen tentang sebab enjin A diletakkan sebelum enjin B
4. **Uji pada kesemua 3 aras keamatan** — `lite` pantas tetapi melesapkan maklumat, `ultra` perlahan tetapi tepat

---

## Rujukan: Enjin Terbina Dalam

| ID Enjin             | Boleh Ditindan | stackPriority Lalai | Sasaran                     |
| -------------------- | -------------- | ------------------- | --------------------------- |
| `lite`               | Ya             | 5                   | mesej, hasil_alat           |
| `rtk`                | Ya             | 10                  | hasil_alat                  |
| `standard` (caveman) | Ya             | 20                  | mesej, hasil_alat, blok_kod |
| `aggressive`         | Ya             | 30                  | mesej                       |
| `ultra`              | Ya             | 40                  | mesej, blok_kod             |

### Lihat Juga

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Gambaran keseluruhan saluran paip
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Rujukan daftar enjin
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Spesifikasi format peraturan
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Butiran pek bahasa
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Enjin RTK dan penapis tersuai
- Sumber: `open-sse/services/compression/` (117 fail, ~250KB)
