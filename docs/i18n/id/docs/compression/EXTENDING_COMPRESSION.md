# Extending the Compression Pipeline (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Ringkasnya**: Mesin kompresi OmniRoute bersifat **pluggable** — Anda dapat mendaftarkan mesin kustom, menyediakan paket bahasa untuk bahasa baru, dan menyusun pipeline bertumpuk. Panduan ini menunjukkan caranya.

**Panduan terkait:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Ikhtisar lengkap pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registri mesin dan mesin bawaan
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mesin RTK dan filter kustom
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referensi format paket aturan

---

## Ikhtisar

Sistem kompresi memiliki **3 titik ekstensi**:

| Titik ekstensi         | Kasus penggunaan                                                        | Tingkat kesulitan |
| ---------------------- | ----------------------------------------------------------------------- | ----------------- |
| **Mesin kustom**       | Menambahkan algoritma kompresi baru (misalnya, peringkas khusus domain) | Lanjutan          |
| **Paket bahasa**       | Menambahkan dukungan untuk bahasa alami baru (misalnya, Hindi, Arab)    | Menengah          |
| **Pipeline bertumpuk** | Menyusun mesin yang sudah ada dalam urutan kustom                       | Pemula            |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategi Kompresi                         │
│                                                              │
│   Pesan masukan ──▶ getEffectiveMode() ──▶ mode             │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   Mesin     Mesin    Caveman  engines[]   │
│                   RTK       Lite     engine   dirangkai   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Keluaran terkompresi           │
└─────────────────────────────────────────────────────────────┘

Pemilih strategi BERBASIS MODE: setiap permintaan memilih SATU mode
(rtk / lite / standard / aggressive / ultra / stacked / off).
Hanya mode "stacked" yang merangkai beberapa mesin secara berurutan.
Mode pemicu otomatis default adalah "lite" (bukan rantai prioritas 3 tingkat).
```

---

## Menulis Mesin Kompresi Kustom

Antarmuka mesin (`open-sse/services/compression/engines/types.ts`) adalah kontrak yang harus dipenuhi oleh setiap mesin. Antarmuka ini memiliki 5 metode wajib.

### Antarmuka `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID mesin unik
  name: string; // Nama tampilan
  description: string; // Deskripsi singkat
  icon: string; // Ikon (emoji atau URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Dapat digunakan dalam pipeline bertumpuk
  stackPriority: number; // Urutan dalam pipeline bertumpuk (lebih rendah = lebih awal)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Contoh Minimal: Mesin Whitespace

Mesin paling sederhana — menghapus spasi berlebih dari pesan.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Pisahkan berdasarkan penanda blok kode dan pertahankan spasi kosong di dalamnya
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Jangan ubah blok kode
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Hanya terapkan pada prosa
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
  stackPriority: 100, // Jalankan SETELAH caveman/rtk

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

    // Telusuri larik pesan — tangani konten string dan multipart
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
      // Konten multipart: telusuri bagian-bagiannya, kompres hanya bagian teks
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
          return part; // pertahankan image_url, tool_use, dan sebagainya.
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

// Daftarkan secara global
registerCompressionEngine(whitespaceEngine);
````

### Tempat Meletakkan Mesin Kustom

```
~/.omniroute/compression/engines/my-engine.ts    # Tingkat pengguna
<project>/compression-engines/my-engine.ts        # Tingkat proyek (dimuat saat dimulai)
```

Atau muat secara terprogram dari sebuah plugin:

```ts
// Di dalam plugin Anda
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK plugin menyediakan hook onRequest / onResponse / onError. Daftarkan
  // mesin saat modul plugin dimuat (atau pada onRequest pertama); batalkan pendaftarannya
  // melalui jalur teardown Anda sendiri.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Saat teardown:
// unregisterCompressionEngine("my-engine");
```

### Menguji Mesin Anda

Daftarkan mesin Anda dalam sebuah plugin atau fungsi startup. Setelah didaftarkan, mesin tersebut akan tersedia
di pemilih strategi melalui `id`-nya. Uji integrasi dengan menyusunnya dalam pipeline bertumpuk:

---

## Membuat Paket Bahasa

Kompresi bergaya manusia gua menggunakan **paket aturan khusus bahasa** untuk menangani kata pengisi, ungkapan keraguan, dan pola bertele-tele dalam setiap bahasa alami. OmniRoute dilengkapi dengan **6 paket bahasa**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktur Paket

Paket bahasa adalah direktori berisi **file JSON** di bawah `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Basa-basi, ungkapan keraguan, kesopanan
│   ├── context.json         # Aturan pengurangan konteks
│   ├── dedup.json           # Aturan deduplikasi
│   ├── structural.json      # Tanda baca, pemformatan
│   └── ultra.json           # Aturan kompresi agresif
├── es/  (struktur yang sama)
├── fr/  (struktur yang sama)
├── de/  (struktur yang sama)
├── ja/  (struktur yang sama)
└── pt-BR/ (struktur yang sama)
```

### Anatomi Aturan

Setiap aturan memiliki bentuk berikut (dari `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nama yang mudah dibaca manusia (kebab-case)
  pattern: string; // Pola regex JavaScript
  replacement?: string; // Teks pengganti kecocokan
  replacementMap?: Record<string, string>; // ATAU peta kunci→pengganti
  flags?: string; // Flag regex (biasanya "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Lewati jika intensitas di bawah ini
  description?: string; // Dokumentasi
}
```

### Contoh: Menambahkan Aturan Kata Pengisi Bahasa Hindi

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
      "description": "Hapus pembuka sopan seperti 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Hapus kata pengisi yang berarti 'sebenarnya'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Hapus ungkapan 'tolong' dalam bahasa Hindi"
    }
  ]
}
```

### Validasi

Paket aturan divalidasi terhadap `_schema.json` saat dimuat. Paket dengan struktur yang tidak valid akan gagal dimuat dan mencatat kesalahan:

```
RULE_LOADER: paket "hi/filler.json" gagal divalidasi:
  - rules.0.pattern: Regex tidak valid
  - rules.1.context: harus berupa salah satu dari [all, user, system, assistant]
```

Validasi berjalan secara otomatis saat paket dimuat (terhadap `_schema.json`); paket yang
tidak valid akan ditolak dan kesalahan di atas akan dicatat. Tidak ada skrip
`npm run` terpisah untuk validasi paket — muat paket tersebut (misalnya, mulai server atau
jalankan alur kompresi) dan pantau log.

### Memuat Paket Bahasa Kustom

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Atau tempatkan di lokasi yang dikenali:

```
~/.omniroute/compression/rules/hi/filler.json  # Tingkat pengguna
<project>/.compression/rules/hi/filler.json   # Tingkat proyek
```

### Praktik Terbaik untuk Paket Bahasa

1. **Mulai dengan `filler`** — aturan ini memberikan dampak terbesar
2. **Gunakan `minIntensity`** untuk membatasi aturan agresif — melindungi dari kompresi berlebihan
3. **Sertakan kasus pengujian** — tambahkan array `tests[]` dalam JSON untuk memverifikasi perilaku
4. **Urutan itu penting** — aturan yang lebih awal diterapkan terlebih dahulu; tempatkan aturan berdampak besar di awal
5. **Bersikap konservatif dengan `replacement`** — string kosong biasanya merupakan pilihan yang tepat; jangan pernah memperkenalkan konten baru

### Strategi Penerjemahan

Saat melokalkan paket aturan ke bahasa baru:

1. **Terjemahkan nama aturan** — nama tersebut muncul dalam keluaran debug
2. **Sesuaikan pola regex** — terjemahan langsung sering gagal (batas kata berbeda)
3. **Uji dengan percakapan nyata** — paket harus aman saat digunakan pada masukan aktual
4. **Sesuaikan dengan konvensi budaya** — misalnya, paket bahasa Jepang memiliki lebih banyak kata pengisi kehormatan dibandingkan bahasa Inggris

---

## Pipeline Bertumpuk

**Pipeline bertumpuk** menjalankan beberapa mesin secara berurutan, dengan keluaran setiap mesin diteruskan ke mesin berikutnya. Beginilah cara kerja `mode: stacked` secara internal.

### Cara Kerja Penumpukan

```
Masukan (10.000 token)
        │
        ▼
   ┌──────────┐
   │  Mesin   │  prioritas 10
   │  A       │  ──▶ keluaran: 6.000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Mesin   │  prioritas 50
   │  B       │  ──▶ keluaran: 2.400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Mesin   │  prioritas 100
   │  C       │  ──▶ keluaran: 1.200 token (-80%)
   └────┬─────┘
        │
        ▼
Keluaran akhir (1.200 token, gabungan penghematan ~88%)
```

Saat `mode: "stacked"` dipilih, mesin dijalankan secara berurutan sesuai urutan yang ditentukan dalam array `pipeline`.
Keluaran mesin N menjadi masukan mesin N+1.

### Mode Kompresi

OmniRoute memilih **SATU mode per permintaan** berdasarkan konfigurasi, ambang batas pemicu otomatis, dan penggantian combo.
Mode yang tersedia didefinisikan dalam `open-sse/services/compression/types.ts` (tipe `CompressionMode`):

| Mode         | Mesin                | Kasus penggunaan                                                                                                                                                                                         |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Tidak ada            | Menonaktifkan semua kompresi                                                                                                                                                                             |
| `rtk`        | Hanya RTK            | Sesi yang didominasi keluaran perintah (penghematan 80%+)                                                                                                                                                |
| `lite`       | Hanya Lite           | Kompresi konservatif (cepat, aman)                                                                                                                                                                       |
| `standard`   | Caveman              | Kompresi prosa dengan paket bahasa                                                                                                                                                                       |
| `aggressive` | Caveman + Aggressive | Prosa agresif + tahap akhir agresif                                                                                                                                                                      |
| `ultra`      | Ultra                | Kompresi maksimum (lossy, pilihan terakhir). Secara opsional dirutekan melalui mesin SLM **LLMLingua-2** saat `ultra.modelPath` ditetapkan (beralih ke jalur berbasis aturan jika model tidak tersedia). |
| `stacked`    | Pipeline khusus      | Menggabungkan mesin dalam urutan apa pun (lihat di bawah)                                                                                                                                                |

> Selain mesin mode di atas, registri juga menyediakan mesin khusus yang dapat ditumpuk —
> **CCR**, **headroom**, **ionizer**, dan **session-dedup** — yang didokumentasikan dalam
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Pemilihan mode ditentukan oleh `getEffectiveMode()` dalam `open-sse/services/compression/strategySelector.ts`:

1. Jika kompresi dinonaktifkan: `"off"`
2. Jika terdapat penggantian combo: gunakan penggantian tersebut
3. Jika ambang batas pemicu otomatis terlampaui: gunakan `autoTriggerMode` (default: `"lite"`)
4. Jika tidak: gunakan `defaultMode`

### Pipeline Bertumpuk Default

Saat `mode: "stacked"` dikonfigurasi secara eksplisit, pipeline default menggabungkan:

1. **RTK** — menghapus derau keluaran perintah (penghematan ~80% pada keluaran terminal)
2. **Caveman** — menghapus kata-kata pengisi, meringkas prosa (~46% pada teks yang tersisa)
3. **Lite** — tahap akhir untuk spasi kosong + deduplikasi

Kombinasi ini menghasilkan **penghematan 78-95%** pada sesi yang banyak menggunakan alat.

### Mengonfigurasi Pipeline Bertumpuk

Dalam konfigurasi combo:

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

Anda dapat menghilangkan mesin, menambahkan mesin khusus, atau mengubah urutannya.

### Penerusan Status

Mesin dapat membaca metadata dari konteks permintaan (dalam `options`):

```ts
compress(body, config) {
  // Membaca metadata dari mesin sebelumnya
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata bersifat **hanya-baca** — mesin tidak dapat mengubah konteks permintaan, hanya keluaran isi miliknya sendiri.

### Hal yang Perlu Diperhatikan dalam Urutan Eksekusi

| Urutan mesin                                      | Efek                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                              | **Direkomendasikan** (menghapus derau terlebih dahulu, lalu bahasa, kemudian spasi kosong)  |
| Lite → RTK → Caveman                              | Buruk — Lite menghapus spasi kosong dari keluaran mentah sehingga pencocokan pola RTK gagal |
| Caveman → RTK                                     | Buruk — Caveman dapat menulis ulang teks dengan cara yang tidak dikenali RTK                |
| Urutan apa pun dengan `tool_results` lebih dahulu | Lebih baik — keluaran alat merupakan konten yang paling berisik                             |

### Kapan TIDAK Perlu Menumpuk

Penumpukan tidak selalu lebih baik:

- **Pesan sederhana** (tanpa keluaran alat) — satu Caveman atau Lite sudah cukup
- **Sensitif terhadap biaya** — setiap mesin menambah latensi ~5-50ms
- **Alat tertentu** — RTK saja biasanya sudah memadai untuk keluaran shell

### Membuat Pipeline Khusus

Tidak ada registri pipeline bernama. Pipeline bertumpuk hanyalah **array langkah inline**
yang diteruskan ke `applyStackedCompression()` (diekspor dari
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Jika Anda tidak meneruskan pipeline, nilai default-nya adalah `rtk(standard) → caveman(full)`.

Untuk mengaturnya melalui konfigurasi, tetapkan `mode: "stacked"` dan sediakan array langkah di bawah
`stackedPipeline` (dibaca dari `config.stackedPipeline`):

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

## Kebijakan Sinkronisasi Upstream

Mesin kompresi OmniRoute mencantumkan beberapa proyek upstream di README
("terinspirasi oleh RTK, Caveman, LLMLingua-2, Troglodita"). Pertanyaan umum dari
kontributor adalah: **ketika upstream RTK menambahkan filter alat baru atau Caveman
menambahkan paket aturan, bagaimana pembaruan tersebut masuk ke OmniRoute?** Bagian ini
merupakan jawaban otoritatif.

### Salinan yang di-vendor vs. implementasi independen

| Mesin                        | Hubungan dengan upstream                                                                                                                    | Lokasi                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Implementasi ulang independen** (terinspirasi, bukan salinan)                                                                             | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Implementasi ulang independen** (terinspirasi)                                                                                            | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Sebagian besar internal; hanya codec `gcf/` yang **benar-benar di-vendor** dari `gcf-typescript` (MIT, ditandai SPDX, hanya profil generik) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Terinspirasi (menjadi dasar mesin `llmlingua` + `session-dedup`)                                                                            | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Poin utama: **RTK dan Caveman merupakan implementasi TypeScript clean-room dari
_gagasan_ tersebut (aturan filter, paket aturan), bukan pohon sumber yang di-vendor.**
Tidak ada salinan upstream untuk menjalankan `git pull` — itulah tepatnya mengapa
README menggunakan istilah "terinspirasi oleh", bukan "dibundel".

### Cara peningkatan upstream digabungkan

**Tidak ada pelacakan rilis upstream otomatis dan tidak ada label
`compression-sync`** — sesuai desain. Karena mesin-mesin tersebut merupakan
implementasi ulang, filter RTK atau paket aturan Caveman dari upstream tidak
digabungkan sebagai kode; peningkatan tersebut **dinyatakan ulang sebagai aturan/filter
baru dalam format milik OmniRoute sendiri** (lihat
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) dan ditambahkan secara
ad-hoc melalui PR biasa. Titik ekstensi di atas (mesin kustom, paket bahasa, filter RTK)
merupakan cara resmi untuk menyumbangkannya.

Contoh terbaru dari alur ini:

- Filter RTK untuk keluaran build Gradle & `dotnet` (v3.8.42)
- Filter RTK untuk kubectl / docker-build / composer / gh (#2824)
- Paket bahasa Indonesia Caveman (#3975), serta paket bahasa Jerman / Prancis / Jepang / Tionghoa

### Headroom (proksi kompresi input)

Headroom **sepenuhnya internal** — snapshot codec `gcf` yang di-vendor dan disematkan,
ditambah lapisan `smartcrusher` / `toon` / `tabular` milik OmniRoute sendiri. Tidak ada
upstream aktif yang perlu dilacak selain salinan yang di-vendor; pembaruan untuk `gcf`
disegarkan secara manual ketika codec berubah dan divalidasi ulang terhadap gerbang
anggaran kompresi (`check:compression-budget`).

### Mengusulkan peningkatan yang terinspirasi dari upstream

1. **Jangan melakukan vendor** — nyatakan ulang aturan/filter upstream dalam format OmniRoute.
2. Tambahkan melalui titik ekstensi yang sesuai di bawah ini (paket bahasa, filter RTK, atau
   mesin kustom).
3. Cantumkan proyek upstream dalam deskripsi PR (atribusi), bukan dengan
   menyalin sumbernya yang memuat lisensi.
4. Sertakan pengujian dan pastikan gerbang `check:compression-budget` tetap lolos.

---

## Menambahkan Gaya Output

Gaya output (lihat [tabel katalog panduan](./COMPRESSION_GUIDE.md#output-styles-catalog))
merupakan padanan sisi respons dari mesin input: alih-alih mengompresi apa yang Anda
kirim, gaya ini menginstruksikan model untuk menghasilkan output yang lebih hemat. Registrinya adalah
`OUTPUT_STYLE_CATALOG` di `open-sse/services/compression/outputStyles/catalog.ts`, dan
**satu entri katalog merupakan keseluruhan fitur**: injektor, panel pengaturan dasbor,
persistensi, dan telemetri semuanya mengacu pada katalog — tidak ada daftar lain yang perlu diperbarui.

1. **Tambahkan satu entri ke `OUTPUT_STYLE_CATALOG`** dengan `id`, `label`, `description`, dan
   tiga `levels` berbahasa Inggris (`lite`, `full`, `ultra`). Setiap level harus diakhiri dengan
   `${SHARED_BOUNDARIES}` agar kode, jalur, perintah, kesalahan, dan URL tetap sama persis.
   Teks instruksi harus **statis dan deterministik** untuk setiap
   `(id, level, language)` — `${SHARED_BOUNDARIES}` adalah satu-satunya interpolasi yang diizinkan.
2. **Terjemahkan.** Sertakan setidaknya satu blok `pt-BR` di bawah `i18n`; `ponytail` dan
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) merupakan bentuk acuan. Gaya yang sengaja
   hanya tersedia dalam satu bahasa menetapkan `locale` sebagai gantinya (seperti `terse-cjk` → `zh`) dan kemudian
   hanya ditawarkan dalam locale tersebut.
3. **Perbarui pemeriksaan matriks** — tambahkan bahasa gaya tersebut ke `BASELINE_LANGUAGES` di
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Gerbang pemeriksaan akan menggagalkan setiap gaya baru
   yang tidak dibatasi locale dan tidak memiliki terjemahan yang diwajibkan, kecuali jika gaya tersebut memiliki
   entri `KNOWN_ENGLISH_ONLY` eksplisit beserta masalah pelacakannya.
4. **Tambahkan pengujian per gaya** yang mengikuti pola
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: bentuk katalog, klausa batasan
   per level, dan pemeriksaan jangkar yang memastikan setiap terjemahan ditulis dalam bahasanya sendiri,
   bukan salinan bahasa Inggris.
5. **Atribusi**: jika gaya tersebut diadaptasi dari proyek upstream, cantumkan kredit dalam
   komentar sumber pada entri tersebut (misalnya `i-have-adhd` → ayghri/i-have-adhd, MIT) — aturan yang sama
   dengan "Mengusulkan peningkatan yang terinspirasi upstream" di atas.

Tidak diperlukan perubahan UI, skema, atau telemetri — semua bagian tersebut dirender dari katalog.

---

## Praktik Terbaik

### Pengembangan Mesin

1. **Selalu implementasikan `validateConfig`** — mesin tanpa validasi menyebabkan kegagalan senyap
2. **Tetapkan `targetLatencyMs` yang realistis** — digunakan oleh pemilih strategi untuk memilih mesin
3. **Gunakan `getConfigSchema` untuk dasbor** — jangan pernah menyembunyikan konfigurasi dari pengguna
4. **Dukung `stackable: true` jika mesin Anda bersifat murni** — mesin dengan efek samping tidak boleh ditumpuk
5. **Tulis pengujian inline** — mesin harus dapat diverifikasi dalam <1 detik

### Pengembangan Paket Bahasa

1. **Mulailah dengan intensitas `lite`** — aturan Anda harus aman pada pengaturan terendah
2. **Gunakan `context` untuk membatasi cakupan aturan** — aturan khusus `user` tidak dapat secara tidak sengaja memengaruhi prompt sistem
3. **Hindari menangkap kunci JSON** — `\\bword\\b` dapat cocok di dalam JSON sehingga merusak data terstruktur
4. **Uji dengan kasus ekstrem** — input kosong, unicode, teks RTL, emoji
5. **Gunakan paket yang sudah ada sebagai templat** — `en/filler.json` adalah contoh yang paling matang

### Desain Pipeline

1. **Lakukan profiling sebelum mengoptimalkan** — ukur terlebih dahulu dengan `compression_stats`
2. **Utamakan komposisi daripada implementasi ulang** — perluas aturan Caveman sebelum menulis mesin baru
3. **Dokumentasikan alasan urutan** — beri komentar mengenai alasan mesin A ditempatkan sebelum mesin B
4. **Uji pada ketiga tingkat intensitas** — `lite` cepat tetapi lossy, `ultra` lambat tetapi presisi

---

## Referensi: Mesin Bawaan

| ID Mesin             | Dapat Ditumpuk | stackPriority Default | Target                       |
| -------------------- | -------------- | --------------------- | ---------------------------- |
| `lite`               | Ya             | 5                     | pesan, hasil_alat            |
| `rtk`                | Ya             | 10                    | hasil_alat                   |
| `standard` (caveman) | Ya             | 20                    | pesan, hasil_alat, blok_kode |
| `aggressive`         | Ya             | 30                    | pesan                        |
| `ultra`              | Ya             | 40                    | pesan, blok_kode             |

### Lihat Juga

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Ikhtisar pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referensi registri mesin
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Spesifikasi format aturan
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detail paket bahasa
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mesin RTK dan filter khusus
- Sumber: `open-sse/services/compression/` (117 file, ~250KB)
