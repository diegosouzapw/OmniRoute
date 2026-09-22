# Reasoning Replay Cache (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sumber rujukan utama:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute menangkap `reasoning_content` pembantu yang dihasilkan oleh model mod pemikiran dan memainkannya semula secara telus pada permintaan berbilang giliran apabila penyedia huluan memerlukannya. Ini menghapuskan ralat HTTP 400 yang dicetuskan oleh penyedia ketat apabila sejarah perbualan klien tidak mengandungi penaakulan daripada giliran sebelumnya.

## Mengapa Ini Wujud

Beberapa penyedia mod pemikiran menolak giliran susulan melainkan **mesej pembantu sebelumnya mengandungi `reasoning_content` asal**. Penyedia huluan mengembalikan ralat 400 dengan mesej seperti:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Namun, klien biasa (Cursor, Cline, Roo Code, OpenAI SDK) membuang `reasoning_content` daripada sejarah yang dimainkan semula. OmniRoute memulihkannya daripada cache sebelah pelayan supaya permintaan yang diterima oleh penyedia huluan adalah konsisten. Isu #1628 memperkenalkan pengekalan hibrid memori/SQLite supaya cache kekal tersedia selepas proses dimulakan semula.

## Seni Bina

```
Pusingan N (pembantu menjana):
  → respons mengandungi reasoning_content + tool_calls
  → jika requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      menulis ke (memori + DB), dengan setiap tool_call.id sebagai kunci
  → majukan respons kepada klien (yang mungkin mengekalkan atau tidak mengekalkan penaakulan)

Pusingan N+1 (klien menghantar susulan):
  → penterjemah mengesan: requiresReasoningReplay(provider, model) === true
  → bagi setiap mesej pembantu dengan tool_calls dan tanpa reasoning_content:
      lookupReasoning(toolCalls[0].id) → memori → DB
      ditemui      → msg.reasoning_content = cached; recordReplay()
      tidak ditemui → msg.reasoning_content = "" (sandaran legasi untuk DeepSeek yang lebih lama)
  → sistem huluan melihat sejarah yang konsisten → tiada 400
```

Penangkapan berlaku dalam `open-sse/handlers/chatCore.ts` (di dua lokasi, iaitu dua tapak panggilan `cacheReasoningFromAssistantMessage`). Main semula berlaku dalam `open-sse/translator/index.ts` selepas pemaksaan skema tetapi sebelum penghantaran.

Pusingan pembantu biasa (tanpa panggilan alat) menggunakan kunci yang berbeza: `buildAssistantMessageCacheKey()` menghasilkan ringkasan skop sesi bersama transkrip berformat OpenAI yang telah dinormalkan sehingga pusingan tersebut, kerana DeepSeek memerlukan penaakulan bagi _setiap_ pusingan terdahulu sebaik sahaja `tools` disertakan. Untuk sasaran Responses-API (contohnya `opencode-go/deepseek-v4-flash`, yang dihalakan ke `/responses`), kandungan permintaan huluan membawa `input`, bukannya `messages`, maka `translateRequest()` (`open-sse/translator/index.ts`) melaporkan transkrip pangsi yang diringkaskannya melalui pilihan panggil balik dan tapak penangkapan menghasilkan ringkasan bagi transkrip yang sama. Proses main semula Responses dijalankan pada pangsi OpenAI untuk setiap format sumber, maka klien Anthropic Messages (Claude → OpenAI → Responses) turut dimainkan semula.

## Storan — Memori Hibrid + SQLite

Laluan panas menggunakan `Map` dalam memori (LRU mengikut penciptaan), yang disokong oleh jadual SQLite untuk pemulihan ranap dan keterlihatan papan pemuka.

| Lapisan | Pelaksanaan                                       | Tujuan                                                         |
| ------- | ------------------------------------------------- | -------------------------------------------------------------- |
| Memori  | `Map` dalam `open-sse/services/reasoningCache.ts` | Carian pantas, menyingkirkan entri tertua apabila mencapai 200 |
| DB      | Jadual `reasoning_cache` (`src/lib/db/`)          | Kekal merentas mula semula, menyediakan statistik              |

Penulisan dilakukan pada kedua-duanya. Pembacaan merujuk memori terlebih dahulu, kemudian menggunakan DB sebagai sandaran (padanan DB dinaikkan semula ke dalam memori). Kegagalan DB tidak membawa maut — cache dalam memori terus menyediakan laluan panas.

**Nilai lalai:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entri memori maksimum: `200` (`MAX_MEMORY_ENTRIES`)
- Penyingkiran: `createdAt` tertua dahulu

## Skema Pangkalan Data

Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indeks: `expires_at`, `provider`, `model`, `created_at`. `expires_at` disimpan sebagai saat epok Unix; lapisan SELECT menormalkan nilai teks legasi melalui `EXPIRES_AT_EPOCH_SQL`.

## Pengesanan Penyedia / Model

Main semula didayakan apabila `requiresReasoningReplay(provider, model)` mengembalikan `true`. Fungsi tersebut menyemak dua senarai dalam `open-sse/services/reasoningCache.ts`.

**ID penyedia (padanan tepat, tidak sensitif huruf besar/kecil):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Corak regex model (tidak sensitif huruf besar/kecil):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` dan `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, akhiran `-free` pilihan)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Untuk menambahkan penyedia/model ketat yang baharu, tambahkan pada salah satu senarai ini dan tulis ujian unit yang mengesahkan penyuntikan main semula. Penerangan PR hendaklah menyatakan rentetan 400 huluan yang tepat yang mendorong perubahan tersebut.

## API REST

Cache menyediakan dua titik akhir di bawah `src/app/api/cache/reasoning/route.ts`. Kedua-duanya memerlukan pengesahan pengurusan (`isAuthenticated` daripada `@/shared/utils/apiAuth`).

| Kaedah | Titik akhir                                               | Penerangan                                                           |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + entri berhalaman                                         |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Penyenaraian bertapis (`limit` dihadkan kepada julat `[1, 200]`)     |
| DELETE | `/api/cache/reasoning`                                    | Kosongkan semuanya (memori + DB) dan tetapkan semula kiraan hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Kosongkan entri untuk satu penyedia sahaja                           |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Padam satu entri                                                     |

**Bentuk respons GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Nota Operasi

- **Pembersihan:** `cleanupReasoningCache()` menyingkirkan entri memori yang telah tamat tempoh dan menjalankan `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pekerja semakan kesihatan memanggil fungsi ini secara berkala.
- **Pemulihan ranap:** Selepas dimulakan semula, memori adalah kosong tetapi DB masih menyimpan entri yang belum tamat tempoh. Carian pertama untuk `tool_call_id` tertentu ialah hit DB; carian berikutnya ialah hit memori.
- **Tiada penaakulan, tiada cache:** `cacheReasoningFromAssistantMessage` mengembalikan `0` apabila mesej pembantu tidak mempunyai medan `reasoning_content` / `reasoning`, maka respons tanpa penaakulan tidak melibatkan sebarang kos.
- **Penulisan turut dikawal:** kedua-dua tapak panggilan dalam `chatCore.ts` (bukan penstriman dan penstriman) hanya memanggil `cacheReasoningFromAssistantMessage()` apabila `requiresReasoningReplay(provider, model)` ialah `true` — predikat yang sama yang disemak oleh bahagian bacaan. Pemasangan yang tidak pernah menggunakan penyedia main semula tidak lagi menanggung kos penulisan, pengemaskinian indeks dan try/catch bagi setiap respons yang mengandungi penaakulan.
- **Penyedia tidak ketat:** Apabila `requiresReasoningReplay` ialah `false` dan format sasaran ialah OpenAI, penterjemah **membuang** sebarang medan `reasoning_content` daripada mesej keluar — OpenAI Chat Completions tidak menerimanya.

## Lihat Juga

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus litar, tempoh bertenang, penguncian model
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — mendiagnosis ralat 400 daripada perkhidmatan huluan
- Sumber: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Laluan API: `src/app/api/cache/reasoning/route.ts`
- Isu asal: #1628
