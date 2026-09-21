# Notion Context Source (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sumber rujukan utama:** `src/lib/notion/api.ts` (klien REST), `src/lib/db/notion.ts`
> (pengekalan token), `open-sse/mcp-server/tools/notionTools.ts` (6 alat MCP),
> `src/app/api/settings/notion/route.ts` (API tetapan). Pendaftaran alat dan pendawaian
> skop berada dalam `open-sse/mcp-server/server.ts`.

## Apakah ini

OmniRoute boleh menyambung kepada ruang kerja **Notion** sebagai **sumber konteks** — pangkalan
pengetahuan baca/tulis yang dicapai oleh ejen melalui pelayan MCP terbina dalam. Setelah token
integrasi Notion dikonfigurasikan, alat MCP membolehkan LLM mencari halaman dan pangkalan data,
membaca kandungan halaman dan pepohon blok, membuat pertanyaan terhadap pangkalan data dengan penapis/isihan, serta menambahkan
blok baharu — semuanya diproksikan melalui OmniRoute (dengan percubaan semula, tamat masa dan pengelasan ralat)
supaya model tidak pernah mengakses API Notion secara langsung.

Integrasi ini ialah pembalut ringkas dan diperkukuh untuk API REST Notion rasmi
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klien
(`src/lib/notion/api.ts`) menambahkan:

- **Percubaan semula dengan sela masa eksponen** (sehingga 3 percubaan) untuk `429` dan `5xx`.
- **Tamat masa permintaan 55 saat** melalui `AbortController`.
- **Pengelasan ralat berjenis** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, mematuhi petunjuk `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Pembersihan mesej** yang membuang serpihan menyerupai surih tindanan sebelum dipaparkan.

## Persediaan

Tiada **pemboleh ubah persekitaran** untuk token Notion — token disimpan dalam jadual
SQLite `key_value` (ruang nama `notion`, kunci `integration_token`) melalui
`src/lib/db/notion.ts`. Konfigurasikannya daripada tab **Sumber Konteks** pada papan pemuka
Endpoint (`NotionSourceCard`, saudara kepada `ObsidianSourceCard`), atau melalui API REST tetapan.

> [!NOTE]
> Token tersebut ialah **token integrasi dalaman Notion**. Cipta integrasi di
> <https://www.notion.com/my-integrations>, kemudian kongsi halaman/pangkalan data yang anda mahu
> OmniRoute akses dengan integrasi tersebut (model kebenaran Notion berasaskan perkongsian,
> bukan seluruh ruang kerja).

### Konfigurasikan melalui REST

```bash
# Simpan + sahkan token integrasi (POST mengesahkan dengan menjalankan carian ujian)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Semak status sambungan
curl http://localhost:20128/api/settings/notion

# Putuskan sambungan (mengosongkan token yang disimpan)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Ketiga-tiga kaedah memerlukan pengesahan papan pemuka (`isAuthenticated`). Semasa `POST`,
OmniRoute menyimpan token dan serta-merta menjalankan carian ujian dengan 1 hasil; jika Notion
mengembalikan objek ralat, token dikosongkan dan panggilan gagal dengan `400`.

## Alat MCP (6)

Ditakrifkan dalam `open-sse/mcp-server/tools/notionTools.ts`. Token diperoleh semasa panggilan
melalui `getNotionToken()`; jika tiada token dikonfigurasikan, alat akan membangkitkan
`"Token integrasi Notion tidak dikonfigurasikan. Tetapkannya dalam Tetapan > Sumber Konteks."`

| Alat                         | Skop           | Penerangan                                                                                                 |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Cari halaman dan pangkalan data mengikut pertanyaan teks (mengembalikan tajuk, ID, URL). Berhalaman.       |
| `notion_get_page`            | `read:notion`  | Dapatkan kandungan dan metadata halaman berdasarkan ID-nya.                                                |
| `notion_list_block_children` | `read:notion`  | Senaraikan semua blok anak bagi blok atau halaman (pepohon blok). Berhalaman.                              |
| `notion_query_database`      | `read:notion`  | Buat pertanyaan terhadap pangkalan data dengan `filter` + `sorts` pilihan (format API Notion). Berhalaman. |
| `notion_get_database`        | `read:notion`  | Dapatkan skema/metadata pangkalan data berdasarkan ID.                                                     |
| `notion_append_blocks`       | `write:notion` | Tambahkan blok anak pada blok atau halaman sedia ada (maksimum 100 blok bagi setiap permintaan).           |

### Parameter input

- `notion_search` — `query` (1–500 aksara), `pageSize` (1–100, lalai 20),
  `startCursor` (pilihan).
- `notion_get_page` — `pageId` (heks 32 aksara atau UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, lalai 50),
  `startCursor` (pilihan).
- `notion_query_database` — `databaseId`, `filter` (pilihan, format penapis Notion),
  `sorts` (tatasusunan pilihan), `pageSize` (1–100, lalai 50), `startCursor` (pilihan).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (tatasusunan objek blok),
  `after` (kedudukan pilihan).

### Skop

Alat baca memerlukan `read:notion` dan alat tulis memerlukan `write:notion`.
Skop dikuatkuasakan oleh `withScopeEnforcement()` dalam
`open-sse/mcp-server/server.ts` hanya apabila `OMNIROUTE_MCP_ENFORCE_SCOPES=true`; skop
yang dibenarkan untuk pemanggil berasal daripada `OMNIROUTE_MCP_SCOPES` (dipisahkan koma) atau
konteks skop kunci API yang disahkan. Lihat [MCP-SERVER.md](./MCP-SERVER.md) untuk
model skop penuh.

## Titik Akhir

| Kaedah   | Laluan                 | Tujuan                                               |
| -------- | ---------------------- | ---------------------------------------------------- |
| `GET`    | `/api/settings/notion` | Mengembalikan `{ connected, hasToken }`.             |
| `POST`   | `/api/settings/notion` | Menyimpan + mengesahkan token integrasi.             |
| `DELETE` | `/api/settings/notion` | Memutuskan sambungan (mengosongkan token tersimpan). |

> Ini ialah laluan tetapan papan pemuka. **Tiada titik akhir proksi Notion `/v1`
> awam** — Notion dicapai secara eksklusif melalui alat MCP di atas.

## Kes penggunaan

- **Jawapan berasaskan pengetahuan** — benarkan ejen menggunakan `notion_search` pada ruang kerja dan
  `notion_get_page` pada hasil teratas sebelum menjawab, supaya respons memetik dokumen dalaman sebenar.
- **Aliran kerja berasaskan pangkalan data** — gunakan `notion_query_database` pada pangkalan data tugas/CRM dengan
  penapis + isihan, kemudian ringkaskan atau utamakan baris.
- **Tulis balik / pengelogan** — gunakan `notion_append_blocks` untuk menambahkan nota mesyuarat, ringkasan
  pelaksanaan atau output ejen ke dalam halaman sedia ada (tambah sahaja; tiada suntingan yang merosakkan).
- **Penerokaan struktur** — gunakan `notion_list_block_children` untuk menelusuri pepohon blok halaman,
  atau `notion_get_database` untuk mengetahui skema sifat pangkalan data sebelum membuat pertanyaan padanya.

## Berkaitan

- [Pelayan MCP](./MCP-SERVER.md) — pengangkutan, penguatkuasaan skop, inventori alat lengkap.
- [Sumber Konteks Obsidian](./OBSIDIAN_CONTEXT.md) — sumber konteks terbina dalam yang lain.
- [Sistem Memori](./MEMORY.md) — memori perbualan berterusan (lapisan konteks pelengkap,
  disuntik secara automatik dan bukannya diambil melalui alat).
