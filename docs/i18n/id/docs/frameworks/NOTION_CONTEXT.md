# Notion Context Source (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sumber acuan utama:** `src/lib/notion/api.ts` (klien REST), `src/lib/db/notion.ts`
> (persistensi token), `open-sse/mcp-server/tools/notionTools.ts` (6 alat MCP),
> `src/app/api/settings/notion/route.ts` (API pengaturan). Pendaftaran alat dan
> pengaturan cakupan berada di `open-sse/mcp-server/server.ts`.

## Apa ini

OmniRoute dapat terhubung ke ruang kerja **Notion** sebagai **sumber konteks** — basis
pengetahuan baca/tulis yang diakses agen melalui server MCP bawaan. Setelah token
integrasi Notion dikonfigurasi, alat MCP memungkinkan LLM mencari halaman dan basis data,
membaca konten halaman dan struktur blok, mengueri basis data dengan filter/pengurutan,
serta menambahkan blok baru — semuanya diproksikan melalui OmniRoute (dengan percobaan
ulang, batas waktu, dan klasifikasi kesalahan), sehingga model tidak pernah mengakses
API Notion secara langsung.

Integrasi ini merupakan pembungkus tipis yang diperkuat di atas API REST resmi Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klien
(`src/lib/notion/api.ts`) menambahkan:

- **Percobaan ulang dengan exponential backoff** (hingga 3 percobaan) untuk `429` dan `5xx`.
- **Batas waktu permintaan 55 detik** melalui `AbortController`.
- **Klasifikasi kesalahan bertipe** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, mematuhi petunjuk `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanitasi pesan** yang menghapus fragmen menyerupai stack trace sebelum ditampilkan.

## Penyiapan

Tidak ada **variabel lingkungan** untuk token Notion — token disimpan dalam tabel
SQLite `key_value` (namespace `notion`, key `integration_token`) melalui
`src/lib/db/notion.ts`. Konfigurasikan token dari tab **Sumber Konteks** pada dasbor
Endpoint (`NotionSourceCard`, yang merupakan saudara dari `ObsidianSourceCard`), atau
melalui API REST pengaturan.

> [!NOTE]
> Token tersebut adalah **token integrasi internal Notion**. Buat integrasi di
> <https://www.notion.com/my-integrations>, lalu bagikan halaman/basis data yang ingin
> Anda izinkan untuk diakses OmniRoute kepada integrasi tersebut (model izin Notion
> berbasis pembagian akses, bukan mencakup seluruh ruang kerja).

### Mengonfigurasi melalui REST

```bash
# Simpan + validasi token integrasi (POST memvalidasi dengan menjalankan pencarian uji)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Periksa status koneksi
curl http://localhost:20128/api/settings/notion

# Putuskan koneksi (menghapus token yang tersimpan)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Ketiga metode memerlukan autentikasi dasbor (`isAuthenticated`). Pada `POST`,
OmniRoute menyimpan token dan langsung menjalankan pencarian uji dengan 1 hasil; jika
Notion mengembalikan objek kesalahan, token akan dihapus dan panggilan gagal dengan
`400`.

## Alat MCP (6)

Didefinisikan dalam `open-sse/mcp-server/tools/notionTools.ts`. Token diambil saat
pemanggilan melalui `getNotionToken()`; jika belum dikonfigurasi, alat akan melempar
`"Token integrasi Notion belum dikonfigurasi. Atur di Pengaturan > Sumber Konteks."`

| Alat                         | Cakupan        | Deskripsi                                                                                          |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Mencari halaman dan basis data berdasarkan kueri teks (mengembalikan judul, ID, URL). Berpaginasi. |
| `notion_get_page`            | `read:notion`  | Mendapatkan konten dan metadata halaman berdasarkan ID-nya.                                        |
| `notion_list_block_children` | `read:notion`  | Mencantumkan semua blok turunan dari blok atau halaman (struktur blok). Berpaginasi.               |
| `notion_query_database`      | `read:notion`  | Mengueri basis data dengan `filter` + `sorts` opsional (format API Notion). Berpaginasi.           |
| `notion_get_database`        | `read:notion`  | Mendapatkan skema/metadata basis data berdasarkan ID.                                              |
| `notion_append_blocks`       | `write:notion` | Menambahkan blok turunan ke blok atau halaman yang ada (maks. 100 blok per permintaan).            |

### Parameter masukan

- `notion_search` — `query` (1–500 karakter), `pageSize` (1–100, bawaan 20),
  `startCursor` (opsional).
- `notion_get_page` — `pageId` (heksadesimal 32 karakter atau UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, bawaan 50),
  `startCursor` (opsional).
- `notion_query_database` — `databaseId`, `filter` (opsional, format filter Notion),
  `sorts` (array opsional), `pageSize` (1–100, bawaan 50), `startCursor` (opsional).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array objek blok),
  `after` (posisi opsional).

### Cakupan

Alat baca memerlukan `read:notion` dan alat tulis memerlukan `write:notion`.
Cakupan diberlakukan oleh `withScopeEnforcement()` di
`open-sse/mcp-server/server.ts` hanya ketika `OMNIROUTE_MCP_ENFORCE_SCOPES=true`;
cakupan yang diizinkan untuk pemanggil berasal dari `OMNIROUTE_MCP_SCOPES` (dipisahkan
koma) atau konteks cakupan kunci API yang terautentikasi. Lihat
[MCP-SERVER.md](./MCP-SERVER.md) untuk model cakupan lengkap.

## Endpoint

| Metode   | Jalur                  | Tujuan                                          |
| -------- | ---------------------- | ----------------------------------------------- |
| `GET`    | `/api/settings/notion` | Mengembalikan `{ connected, hasToken }`.        |
| `POST`   | `/api/settings/notion` | Menyimpan + memvalidasi token integrasi.        |
| `DELETE` | `/api/settings/notion` | Memutuskan koneksi (menghapus token tersimpan). |

> Ini adalah rute pengaturan dasbor. **Tidak ada endpoint proxy Notion `/v1`
> publik** — Notion diakses secara eksklusif melalui alat MCP di atas.

## Kasus penggunaan

- **Jawaban berbasis pengetahuan** — izinkan agen menjalankan `notion_search` pada ruang kerja dan
  `notion_get_page` pada hasil teratas sebelum menjawab, sehingga respons mengutip dokumen internal yang nyata.
- **Alur kerja berbasis basis data** — jalankan `notion_query_database` pada basis data tugas/CRM dengan
  filter + pengurutan, lalu rangkum atau lakukan triase pada baris-baris tersebut.
- **Penulisan kembali / pencatatan** — gunakan `notion_append_blocks` untuk menambahkan catatan rapat, ringkasan
  proses, atau keluaran agen ke halaman yang sudah ada (hanya menambahkan; tanpa pengeditan destruktif).
- **Eksplorasi struktur** — gunakan `notion_list_block_children` untuk menelusuri pohon blok suatu halaman,
  atau `notion_get_database` untuk menemukan skema properti basis data sebelum melakukan kueri.

## Terkait

- [Server MCP](./MCP-SERVER.md) — transpor, penegakan cakupan, inventaris alat lengkap.
- [Sumber Konteks Obsidian](./OBSIDIAN_CONTEXT.md) — sumber konteks bawaan lainnya.
- [Sistem Memori](./MEMORY.md) — memori percakapan persisten (lapisan konteks pelengkap,
  disisipkan secara otomatis, bukan diambil melalui alat).
