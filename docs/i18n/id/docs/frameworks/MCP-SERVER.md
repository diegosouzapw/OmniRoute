# OmniRoute MCP Server Documentation (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server Model Context Protocol dengan 110 alat untuk operasi perutean, cache, kompresi, memori, keterampilan, proxy, pool, Radar, dan sumber konteks.
>
> Sumber acuan: `open-sse/mcp-server/server.ts` menghitung **110 alat unik** dengan `countUniqueMcpTools()`: 45 definisi kanonis (termasuk enam alat siklus hidup CCR, trio agent-skills, `omniroute_radar_catalog`, dan `omniroute_x_search`), ditambah memori (3), keterampilan (4), keterampilan GitHub (3), pool (6), gamifikasi (8), plugin (8), Notion (6), Obsidian (22), korpus lokal (3), dan dua alat kompresi khusus RTK.

## Instalasi

OmniRoute MCP sudah tersedia secara bawaan. Jalankan dengan:

```bash
omniroute --mcp
```

Atau melalui transport open-sse:

```bash
# Transport HTTP yang dapat dialirkan (port 20130)
omniroute --dev  # MCP dimulai secara otomatis pada endpoint /mcp
```

Transport HTTP (`sse` / `streamable-http`, disajikan dalam proses oleh server dasbor) dinonaktifkan
secara bawaan dan sebelumnya hanya dapat diaktifkan atau dinonaktifkan dari halaman `/dashboard/mcp`. Mulai v3.8.51,
CLI memiliki kemampuan yang setara:

```bash
omniroute mcp status                                  # status aktif/online, transport, jumlah alat
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # mengatur ulang sesi sse/streamable-http yang aktif
```

`mcp enable`/`mcp disable` melakukan PATCH terhadap pengaturan `mcpEnabled` (dan secara opsional `mcpTransport`) yang sama
dengan yang diaktifkan atau dinonaktifkan oleh dasbor melalui `/api/settings`. `mcp restart` memanggil `POST /api/mcp/restart`: tindakan ini menghentikan
sesi `sse`/`streamable-http` yang aktif agar permintaan berikutnya melakukan inisialisasi ulang secara bersih, mengembalikan
`409` jika MCP dinonaktifkan, dan `501` untuk transport `stdio` (klien stdio memiliki
subprosesnya sendiri — tidak ada handle dalam proses yang dapat dimulai ulang).

## Transport

Server MCP menyediakan tiga transport, yang semuanya didukung oleh factory `createMcpServer()` yang sama:

| Transport         | Lokasi                                          | Kapan digunakan                                     |
| :---------------- | :---------------------------------------------- | :-------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | Integrasi IDE (Claude Desktop, Cursor, dll.)        |
| `sse`             | `POST/GET /api/mcp/sse` melalui `httpTransport` | Klien browser/agen yang memerlukan aliran peristiwa |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Klien HTTP multisesi (header `mcp-session-id`)      |

Transport HTTP yang aktif (`sse` atau `streamable-http`) dipilih melalui pengaturan `mcpTransport`. Mengganti transport akan menutup sesi yang ada pada transport lainnya.

### Akses jarak jauh (pengabaian melalui cakupan manage)

`/api/mcp/*` berada dalam tingkat LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — secara bawaan hanya host loopback (`localhost`, `127.0.0.1`, `::1`) yang dapat mengaksesnya. Sejak v3.8.2, klien non-loopback dapat terhubung jika menyertakan `Authorization: Bearer <api-key>` dengan kunci yang memiliki cakupan `manage`. Ini adalah satu-satunya cara untuk mengakses server MCP jarak jauh melalui tunnel, reverse proxy, atau nama host publik.

```bash
# Berikan cakupan manage: buka halaman API Keys pada dasbor dan aktifkan
# "Management Access" untuk kunci tersebut, atau lakukan POST scopes:["manage"] saat membuatnya.

# Kemudian hubungkan dari klien MCP jarak jauh:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Kunci tanpa cakupan manage (atau tanpa Bearer) akan menghasilkan `403 LOCAL_ONLY`. Prefiks terkait `/api/cli-tools/runtime/*` sengaja TIDAK dapat diabaikan — lihat [Tingkat Route Guard — Pengecualian cakupan manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfigurasi IDE

Lihat [Konfigurasi Klien MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) untuk penyiapan Claude Desktop,
Cursor, Cline, dan klien MCP yang kompatibel.

---

## Alat Esensial (14) — Fase 1

| Alat                            | Cakupan               | Deskripsi                                                                                                                                |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Waktu aktif, memori, pemutus sirkuit, batas laju, statistik cache                                                                        |
| `omniroute_list_combos`         | `read:combos`         | Semua kombo yang dikonfigurasi beserta strateginya (metrik opsional)                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrik performa untuk kombo tertentu                                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | Mengaktifkan atau menonaktifkan kombo                                                                                                    |
| `omniroute_create_combo`        | `write:combos`        | Membuat kombo tervalidasi melalui API kombo yang ada                                                                                     |
| `omniroute_check_quota`         | `read:quota`          | Kuota terpakai/total, persentase tersisa, waktu pengaturan ulang, kondisi token                                                          |
| `omniroute_route_request`       | `execute:completions` | Mengirim penyelesaian percakapan melalui perutean OmniRoute                                                                              |
| `omniroute_cost_report`         | `read:usage`          | Laporan biaya berdasarkan periode (sesi/hari/minggu/bulan)                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | Katalog model lengkap beserta kemampuan, status, dan harga                                                                               |
| `omniroute_radar_catalog`       | `read:radar`          | Katalog Radar lokal yang ditandatangani; filter penyedia/keluarga opsional                                                               |
| `omniroute_tool_search`         | `read:tools`          | Menemukan alat dari katalog MCP yang terdaftar                                                                                           |
| `omniroute_web_search`          | `execute:search`      | Pencarian web melalui penyedia pencarian yang dikonfigurasi. Bukan X/Twitter.                                                            |
| `omniroute_x_search`            | `execute:search`      | Mencari di X melalui xAI/SuperGrok, atau memilih `xquik-search` untuk hasil API Xquik. Memerlukan kredensial untuk backend yang dipilih. |
| `omniroute_web_fetch`           | `execute:search`      | Mengambil konten web melalui penyedia pengambilan yang dikonfigurasi                                                                     |

## Alat Tingkat Lanjut (11) — Fase 2

| Alat                               | Cakupan                              | Deskripsi                                                                                                     |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulasi perutean uji coba tanpa eksekusi dengan pohon fallback                                               |
| `omniroute_set_budget_guard`       | `write:budget`                       | Anggaran sesi dengan tindakan penurunan layanan/pemblokiran/peringatan                                        |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Perbarui strategi kombo saat runtime (prioritas/berbobot/otomatis/dll.)                                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Terapkan preset ketahanan `aggressive` / `balanced` / `conservative`                                          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Pengujian langsung setiap penyedia dalam kombo menggunakan panggilan upstream nyata                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrik per penyedia dengan latensi p50/p95/p99 dan status circuit breaker                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Rekomendasikan kombo berdasarkan jenis tugas dengan batasan anggaran/latensi                                  |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Jelaskan alasan permintaan dirutekan ke suatu penyedia (faktor penilaian + fallback)                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Snapshot sesi lengkap: biaya, token, model/penyedia teratas, kesalahan, pengaman anggaran                     |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosis (dan perbaikan otomatis opsional) penyimpangan basis data seperti referensi kombo rusak/baris yatim |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinkronkan data harga dari sumber eksternal (LiteLLM); mendukung `dryRun`                                     |

## Alat Cache (2)

| Alat                    | Cakupan       | Deskripsi                                                         |
| :---------------------- | :------------ | :---------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistik cache semantik, cache prompt, dan idempotensi           |
| `omniroute_cache_flush` | `write:cache` | Kosongkan cache secara global atau berdasarkan tanda tangan/model |

## Alat Kompresi (13)

| Alat                                | Cakupan             | Deskripsi                                                                                                                                   |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Pengaturan kompresi, ringkasan analitik, dan statistik sadar-cache (mencakup metadata `analytics.mcpDescriptionCompression`)                |
| `omniroute_compression_configure`   | `write:compression` | Konfigurasikan mode kompresi, ambang batas, rasio target, preservasi prompt sistem, dan tombol kompresi deskripsi MCP                       |
| `omniroute_set_compression_engine`  | `write:compression` | Pilih mesin aktif (off/caveman/rtk/stacked) serta intensitas Caveman/RTK                                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | Cantumkan kombo kompresi bernama beserta pipeline mesinnya                                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitik yang dikelompokkan berdasarkan kombo kompresi dan mesin                                                                            |
| `omniroute_ccr_store`               | `write:compression` | Simpan konten yang diisolasi per pemanggil dalam penyimpanan CCR dalam memori yang dibatasi, lalu kembalikan penanda dan referensi `ccr://` |
| `omniroute_ccr_retrieve`            | `read:compression`  | Ambil konten CCR secara penuh atau dengan mode bagian awal, bagian akhir, baris, grep, dan statistik                                        |
| `omniroute_ccr_inspect`             | `read:compression`  | Periksa metadata CCR milik pemanggil tanpa mengembalikan konten                                                                             |
| `omniroute_ccr_list`                | `read:compression`  | Cantumkan metadata berpaginasi untuk blok CCR milik pemanggil                                                                               |
| `omniroute_ccr_delete`              | `write:compression` | Hapus blok CCR milik pemanggil                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Laporkan penggunaan memori dalam cakupan pemanggil, penghitung siklus hidup, dan batas penyimpanan                                          |
| `omniroute_rtk_discover`            | `read:compression`  | Temukan derau berulang dalam sampel output RTK yang disertakan secara sukarela                                                              |
| `omniroute_rtk_learn`               | `read:compression`  | Buat draf filter RTK yang dapat ditinjau dari sampel yang disertakan secara sukarela                                                        |

Entri CCR hanya disimpan dalam memori dan akan hilang saat dimulai ulang. Setiap blok dibatasi hingga 2 MiB, setiap
prinsipal hingga 16 MiB, dan penyimpanan global hingga 64 MiB. Secara default, entri memiliki TTL 24 jam (maksimum
tujuh hari). Pengambilan MCP penuh dibatasi hingga 256 KiB; blok yang lebih besar tetap tersedia melalui mode
rentang dan grep. Penyimpanan, pengambilan, pencantuman, pemeriksaan, penghapusan, dan statistik diisolasi berdasarkan
prinsipal kunci API yang diautentikasi. Catatan audit berisi hash dan metadata ukuran, bukan konten.

`omniroute_compression_status` melaporkan kompresi deskripsi MCP secara terpisah di bawah
`analytics.mcpDescriptionCompression`. Nilai tersebut merupakan estimasi ukuran metadata untuk deskripsi MCP yang dapat dicantumkan
(`tools`, `prompts`, `resources`, dan `resourceTemplates`); nilai tersebut bukan tanda terima penggunaan
penyedia dan ditandai dengan `source: "mcp_metadata_estimate"`.

### Filter Pohon Aksesibilitas MCP (v3.8.0)

Terpisah dari alat kompresi di atas, OmniRoute menyertakan filter pascaeksekusi yang
mengompresi **hasil alat** dari alat peramban/aksesibilitas MCP sebelum dikembalikan ke
agen. Filter ini bukan merupakan alat — filter ini berjalan secara transparan pada setiap hasil alat yang berisi
teks pohon aksesibilitas atau snapshot peramban yang panjang (≥2000 karakter).

Perilaku utama:

- Meringkas ≥30 baris saudara berulang yang berurutan menjadi ringkasan bagian awal + akhir
- Mempertahankan jangkar `[ref=eXX]` yang diperlukan oleh Playwright/computer-use
- Memangkas paksa teks yang terlalu besar (>50.000 karakter) dengan petunjuk navigasi
- Perkiraan penghematan: **60–80%** pada muatan snapshot peramban

Konfigurasi: `compression.mcpAccessibility` dalam pengaturan global (migrasi 056).
Implementasi: `open-sse/services/compression/engines/mcpAccessibility/`.
Dokumentasi lengkap: [Mesin Kompresi — Filter Pohon Aksesibilitas MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Lihat [Mesin Kompresi](../compression/COMPRESSION_ENGINES.md) dan [Kompresi RTK](../compression/RTK_COMPRESSION.md) untuk
model kompresi runtime yang mendasari alat-alat ini.

## Alat 1Proxy (3)

| Alat                        | Cakupan        | Deskripsi                                                                                             |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Mengambil proxy gratis dari marketplace 1proxy (filter protokol/negara/kualitas/batas)                |
| `omniroute_oneproxy_rotate` | `read:proxies` | Mendapatkan proxy berikutnya yang tersedia berdasarkan strategi (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistik kumpulan, status sinkronisasi, serta distribusi berdasarkan protokol dan negara             |

## Alat Memori (3)

Didefinisikan dalam `open-sse/mcp-server/tools/memoryTools.ts`. Autentikasi/cakupan diberlakukan melalui alur cakupan MCP standar.

| Alat                      | Cakupan        | Deskripsi                                                                                                       |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Mencari memori berdasarkan kueri / jenis / kunci API dengan penerapan batas anggaran token                      |
| `omniroute_memory_add`    | `write:memory` | Menambahkan entri memori baru (`factual` / `episodic` / `procedural` / `semantic`)                              |
| `omniroute_memory_clear`  | `write:memory` | Menghapus memori untuk suatu kunci API, dengan filter opsional berdasarkan jenis atau stempel waktu `olderThan` |

## Alat Keterampilan (4)

Didefinisikan dalam `open-sse/mcp-server/tools/skillTools.ts`. Didukung oleh `src/lib/skills/registry` + `src/lib/skills/executor`.

| Alat                          | Cakupan          | Deskripsi                                                                                                       |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Menampilkan daftar keterampilan terdaftar dengan filter opsional berdasarkan kunci API, nama, atau status aktif |
| `omniroute_skills_enable`     | `write:skills`   | Mengaktifkan atau menonaktifkan keterampilan tertentu berdasarkan ID                                            |
| `omniroute_skills_execute`    | `execute:skills` | Menjalankan keterampilan dengan input yang diberikan dan mengembalikan catatan eksekusi                         |
| `omniroute_skills_executions` | `read:skills`    | Menampilkan riwayat eksekusi keterampilan terbaru                                                               |

## Sumber Konteks Notion (6)

Didefinisikan dalam `open-sse/mcp-server/tools/notionTools.ts`. Token disimpan dalam tabel `key_value` melalui `src/lib/db/notion.ts`. Klien REST berada di `src/lib/notion/api.ts`. API pengaturan berada di `src/app/api/settings/notion/route.ts`. UI dasbor berada di `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurasikan token integrasi Notion Anda dari tab **Sumber Konteks** pada dasbor Endpoint, atau melalui REST API:

```bash
# Atur token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Periksa status
curl http://localhost:20128/api/settings/notion

# Putuskan koneksi
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Alat                         | Cakupan        | Deskripsi                                                          |
| :--------------------------- | :------------- | :----------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Melakukan pencarian teks lengkap di seluruh halaman dan basis data |
| `notion_get_page`            | `read:notion`  | Mendapatkan halaman berdasarkan ID beserta propertinya             |
| `notion_list_block_children` | `read:notion`  | Menampilkan daftar blok anak dari suatu halaman atau blok          |
| `notion_query_database`      | `read:notion`  | Mengueri basis data dengan filter, pengurutan, dan paginasi        |
| `notion_get_database`        | `read:notion`  | Mendapatkan skema basis data berdasarkan ID                        |
| `notion_append_blocks`       | `write:notion` | Menambahkan blok anak ke blok induk (maksimal 100 per permintaan)  |

## Alat Katalog Keterampilan Agen (3)

Didefinisikan dalam `open-sse/mcp-server/tools/agentSkillTools.ts`. Didukung oleh `src/lib/agentSkills/catalog`. Alat-alat ini mengekspos katalog dokumentasi Agent Skills yang berisi 45 entri kepada klien MCP dan agen eksternal. Cakupan: `read:catalog`.

| Alat                              | Cakupan        | Deskripsi                                                                                                                                             |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Mencantumkan seluruh 45 keterampilan agen dengan filter opsional `category` (api\|cli) dan `area`; mengembalikan metadata + cakupan                   |
| `omniroute_agent_skills_get`      | `read:catalog` | Mendapatkan metadata lengkap + konten SKILL.md untuk satu keterampilan berdasarkan `id` kanonis                                                       |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistik cakupan: jumlah dari 23 keterampilan API, 21 CLI, dan 1 konfigurasi yang memiliki file SKILL.md di sistem berkas dibandingkan total katalog |

Lihat [AGENT-SKILLS.md](./AGENT-SKILLS.md) untuk katalog lengkap dan cara agen eksternal menggunakannya.

## Kerangka Kerja Terkait (v3.8.0)

Inventaris alat MCP di atas (110 alat unik, dihitung oleh `countUniqueMcpTools()`) sengaja
dibatasi pada operasi perutean/cache/kompresi/memori/keterampilan/proxy/sumber-konteks saat runtime. Dua
kerangka kerja terkait disertakan bersama server MCP dalam v3.8.0 dan didokumentasikan secara terpisah:

### Agen Cloud

Agen Cloud adalah agen pengodean AI di luar proses (codex-cloud, cursor-cloud, devin, jules) yang terhubung ke
OmniRoute melalui model koneksi yang sama dengan yang digunakan untuk penyedia LLM. Agen-agen ini diekspos melalui
antarmuka REST tersendiri (`/api/v1/agents/*`) dan **bukan** bagian dari katalog alat MCP
— memanggil Agen Cloud tidak menggunakan cakupan MCP.

- Implementasi: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Siklus hidup: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentasi: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrail

Guardrail adalah filter pra/pascaeksekusi (vision-bridge, pii-masker, prompt-injection)
yang diterapkan di dalam alur chat. Filter ini berjalan sebelum lapisan alat/rute MCP dicapai
dan mengirimkan pelanggaran terstruktur ke alur audit; filter ini tidak dipanggil sebagai alat MCP.

- Implementasi: `src/lib/guardrails/`.
- Dokumentasi: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Saat men-debug panggilan MCP yang tampak diblokir, periksa log audit MCP
(entri `scope_denied:*`) dan jejak audit guardrail — permintaan dapat ditolak oleh
guardrail **sebelum** mencapai lapisan penegakan cakupan MCP.

---

## Endpoint REST API

| Endpoint               | Metode                | Deskripsi                                                                                           | Autentikasi            |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------- | :--------------------- |
| `/api/mcp/status`      | `GET`                 | Status server: heartbeat, status transport HTTP, ringkasan aktivitas audit                          | Manajemen (sesi/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog alat (nama, deskripsi, cakupan, fase, endpoint sumber)                                      | Manajemen              |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint transport SSE (dikontrol oleh `mcpEnabled` + `mcpTransport === "sse"`)                     | Kunci API + cakupan    |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Transport HTTP yang dapat dialirkan (menggunakan header `mcp-session-id`; `DELETE` mengakhiri sesi) | Kunci API + cakupan    |
| `/api/mcp/audit`       | `GET`                 | Entri log audit dari `mcp_tool_audit` (filter: `limit`, `offset`, `tool`, `success`, `apiKeyId`)    | Manajemen              |
| `/api/mcp/audit/stats` | `GET`                 | Statistik audit teragregasi (`totalCalls`, `successRate`, `avgDurationMs`, alat teratas)            | Manajemen              |

File sumber: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Transport SSE dan HTTP yang dapat dialirkan sama-sama diblokir hingga server MCP diaktifkan di Pengaturan (`mcpEnabled`) dan `mcpTransport` yang sesuai dipilih. Jika transport yang dikonfigurasi salah, rute akan mengembalikan HTTP 400 dengan petunjuk untuk mengganti pengaturan.

---

## Autentikasi & Cakupan

Alat MCP diautentikasi melalui cakupan kunci API. Penerapan cakupan dipusatkan di
`open-sse/mcp-server/scopeEnforcement.ts`. Setiap alat memerlukan cakupan tertentu:

| Cakupan               | Alat                                                                                                                                                                        |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                           |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                   |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                      |
| `read:quota`          | `check_quota`                                                                                                                                                               |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                      |
| `read:models`         | `list_models_catalog`                                                                                                                                                       |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                               |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                       |
| `write:budget`        | `set_budget_guard`                                                                                                                                                          |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                 |
| `pricing:write`       | `sync_pricing`                                                                                                                                                              |
| `read:cache`          | `cache_stats`                                                                                                                                                               |
| `write:cache`         | `cache_flush`                                                                                                                                                               |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                  |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                           |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                       |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                            |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                      |
| `read:memory`         | `memory_search`                                                                                                                                                             |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                          |
| `write:skills`        | `skills_enable`                                                                                                                                                             |
| `execute:skills`      | `skills_execute`                                                                                                                                                            |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                            |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                     |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                   |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                            |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                              |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                          |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                             |
| `read:obsidian`       | 13 alat baca — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 alat tulis — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                           |

Cakupan wildcard didukung: `read:*` memberikan semua cakupan baca, `*` memberikan akses penuh.

### `mcp:connect` — kapabilitas rute terbatas (#7895)

Mengakses transportasi HTTP/SSE MCP (`/api/mcp/*`) dari non-loopback memerlukan
pengecualian LOCAL_ONLY `/api/mcp/` (lihat `docs/security/ROUTE_GUARD_TIERS.md`). Secara historis,
pengecualian tersebut hanya menerima kunci API dengan cakupan penuh `manage`/`admin` — terlalu luas untuk
pemanggil yang hanya perlu berkomunikasi dengan MCP. `src/shared/constants/managementScopes.ts` sekarang
mengekspor `MCP_CONNECT_SCOPE = "mcp:connect"`: cakupan tambahan yang terbatas (mengikuti preseden yang sama dengan
`SELF_USAGE_SCOPE`) yang HANYA mengotorisasi bypass `/api/mcp/` di
`src/server/authz/policies/management.ts` — cakupan ini tidak memberikan akses ke rute manajemen lainnya
dan sengaja TIDAK dimasukkan dalam `MANAGEMENT_API_KEY_SCOPES`. Kunci yang memiliki `manage`/`admin`
tetap lolos dari pengecualian tersebut tanpa perubahan; `mcp:connect` adalah alternatif dengan hak akses lebih rendah untuk
pemanggil jarak jauh khusus MCP, yang diperiksa melalui `hasMcpConnectOrManageScope()`.

### Pengikatan cakupan HTTP per kunci (#7895)

Melalui HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` kini me-resolve
`api_keys.scopes` aktual milik pemanggil melalui `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
dan meneruskannya ke `transport.handleRequest(req, { authInfo })` milik SDK MCP, sehingga
`extra.authInfo.scopes` yang sampai ke setiap pemanggilan alat mencerminkan cakupan milik kunci Bearer tersebut.
`resolveCallerScopeContext()` milik `scopeEnforcement.ts` telah memprioritaskan `authInfo` di atas
`_meta` dan fallback env `OMNIROUTE_MCP_SCOPES` — perubahan ini hanya mengisi sumber pertama
dengan prioritas tertinggi tersebut, yang sebelumnya tidak memperoleh data melalui HTTP. Saat tidak ada kunci API yang berhasil di-resolve
(tidak ada header, kunci tidak valid), `authInfo` tetap `undefined` dan resolusi berlanjut ke
rantai `meta`/env yang sudah ada tanpa perubahan. Perubahan ini TIDAK mengubah nilai default `OMNIROUTE_MCP_ENFORCE_SCOPES`
— penegakan tetap harus diaktifkan secara eksplisit; perubahan ini hanya membuat jalur per kunci
diprioritaskan setelah diaktifkan. stdio tidak memiliki identitas per pemanggil (lihat
`mcpCallerIdentity.ts`) dan tidak terpengaruh — stdio tetap menggunakan rantai fallback `_meta`/env.

---

## Variabel Lingkungan

| Variabel                                | Default                                       | Tujuan                                                                                                                                         |
| :-------------------------------------- | :-------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                      | URL dasar yang digunakan server MCP saat memanggil API internal OmniRoute                                                                      |
| `OMNIROUTE_API_KEY`                     | (kosong)                                      | Kunci API yang diteruskan sebagai `Authorization: Bearer` ke panggilan API internal                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (hanya `"true"` yang mengaktifkannya) | Jika diaktifkan, scope yang tidak ada akan menolak pemanggilan alat dan mencatat `scope_denied:<reason>` dalam log audit                       |
| `OMNIROUTE_MCP_SCOPES`                  | (kosong)                                      | Daftar scope yang diizinkan, dipisahkan koma, dan dianggap "tersedia" secara default (digunakan saat pemanggil tidak memberikan scope sendiri) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (tidak ditetapkan = aktif)                    | Jika ditetapkan ke `0/false/off/no`, menonaktifkan kompresi deskripsi MCP pada saat pendaftaran                                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (tidak ditetapkan = aktif)                    | Alias alternatif untuk pengaturan yang sama seperti di atas                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                       | Batas waktu pembatalan untuk pembacaan manajemen internal (kesehatan, ketahanan, kombinasi, kuota, penggunaan)                                 |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                       | Batas waktu pembatalan untuk hop yang menunggu penyedia (`route_request`, `web_search`, `web_fetch`)                                           |
| `MCP_TOOL_DENY`                         | (tidak ditetapkan = tanpa filter)             | Nama alat yang dipisahkan koma untuk dihapus dari `tools/list` (pengurangan kardinalitas alat — lihat di bawah)                                |
| `MCP_TOOL_ALLOW`                        | (tidak ditetapkan = tanpa filter)             | Nama alat yang dipisahkan koma untuk dipertahankan secara eksklusif (mode daftar yang diizinkan — lihat di bawah)                              |
| `DATA_DIR`                              | `~/.omniroute`                                | File heartbeat ditulis ke `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                             |

---

## Kompresi Deskripsi

Registri alat, prompt, dan sumber daya MCP dapat mengompresi deskripsi pada saat pendaftaran/penampilan daftar untuk mengurangi jejak metadata yang diekspos kepada klien (dan dengan demikian mengurangi biaya konteks prompt). Implementasinya berada di `open-sse/mcp-server/descriptionCompressor.ts` dan diintegrasikan ke server MCP melalui `compressMcpRegistryMetadata` di dalam `createMcpServer()`.

- Kompresi dijalankan pada teks deskripsi menggunakan kumpulan aturan Caveman (`getRulesForContext("all", "full")`) dengan ekstraksi blok yang dipertahankan (span kode, blok berpagar, dan sebagainya) sehingga konten struktural tidak diubah.
- Aktifkan atau nonaktifkan per deployment melalui nilai `compression.mcpDescriptionCompressionEnabled` dalam tabel pengaturan `key_value` (default: aktif) — ditampilkan di UI sebagai **Analytics → Kompresi deskripsi MCP**.
- Aktifkan atau nonaktifkan untuk seluruh proses melalui `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` atau `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistik real-time ditampilkan melalui `omniroute_compression_status` di bawah `analytics.mcpDescriptionCompression` dan diberi tag `source: "mcp_metadata_estimate"` untuk membedakannya dari tanda terima penggunaan penyedia yang sebenarnya.

---

## Pengurangan Kardinalitas Tool (F4.3)

Kompresi deskripsi memperkecil metadata setiap tool; **pengurangan kardinalitas tool** melangkah lebih jauh dengan mengurangi _jumlah_ tool yang diumumkan. Mengiklankan lebih sedikit tool dalam manifes `tools/list` mengurangi biaya token per permintaan yang dibayar oleh model klien untuk katalog tool (kompresi "lapisan 5"). Implementasinya berupa filter murni tanpa status di `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), yang dihubungkan ke loop pendaftaran dalam `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Bersifat pilihan, dinonaktifkan secara default.** Filter hanya berjalan ketika setidaknya satu dari dua variabel lingkungan ditetapkan; jika keduanya tidak ditetapkan, seluruh 110 tool diumumkan tanpa perubahan.

| Variabel         | Mode                                                                                                         |
| :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Daftar blokir — nama tool yang dipisahkan koma dan selalu dihapus dari `tools/list`                          |
| `MCP_TOOL_ALLOW` | Daftar izin — nama tool yang dipisahkan koma; hanya tool ini yang dipertahankan, sedangkan yang lain dihapus |

`deny` memiliki prioritas atas `allow`. Nama dipisahkan dengan koma, spasi di awal dan akhir dihapus, dan entri kosong diabaikan. Contoh:

```bash
# Hapus dua tool dari katalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Umumkan hanya tool perutean + kuota (mode daftar izin)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Cara tool yang difilter dihapus:** pendaftaran selalu berhasil; tool yang ditolak profil kemudian di-`.disable()` pada handle MCP SDK, sehingga tidak pernah muncul dalam `tools/list`, tetapi pengabelannya tetap utuh (pengaktifan/penonaktifan yang bersih, tanpa pendaftaran ulang). Parser profilnya adalah `readMcpToolProfileFromEnv(process.env)`, yang mengembalikan `null` (tanpa pemfilteran) ketika kedua variabel kosong.

Bentuk `ToolProfile` yang lebih kaya di balik `reduceToolManifest` juga mendukung pemfilteran irisan cakupan (`allowScopes`, dengan pencocokan wildcard bergaya `read:*`) dan batas `maxTools` yang deterministik, tetapi kedua opsi tersebut memerlukan manifes lengkap pada saat pendaftaran dan saat ini **tidak** diekspos melalui variabel lingkungan (hook tingkat `tools/list` merupakan tindak lanjut yang sedang dilacak). `estimateManifestTokens()` tersedia untuk membandingkan biaya token manifes sebelum dan sesudah pengurangan.

---

## Heartbeat Runtime

Transport stdio menyimpan status keaktifan ke `${DATA_DIR}/runtime/mcp-heartbeat.json` setiap 5 detik. Dasbor (`/api/mcp/status`) membaca file ini beserta status keaktifan PID untuk menentukan `online`. Sebagai gantinya, transport HTTP melaporkan status dari `getMcpHttpStatus()` dalam proses (tanpa penulisan file).

Snapshot heartbeat berisi:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Pencatatan Audit

Setiap pemanggilan tool dicatat ke tabel SQLite `mcp_tool_audit` oleh `open-sse/mcp-server/audit.ts`:

- Nama tool, argumen (di-hash/dipotong sesuai `auditLevel` masing-masing tool), hasil
- Durasi dalam ms, indikator keberhasilan/kegagalan, pesan kesalahan (jika berlaku)
- Hash kunci API, stempel waktu
- Penolakan cakupan dicatat sebagai `scope_denied:<reason>` beserta daftar cakupan yang tidak tersedia

Gunakan dasbor atau endpoint REST `/api/mcp/audit` dan `/api/mcp/audit/stats` untuk memeriksa pemanggilan terbaru.

---

## Berkas

| Berkas                                                                   | Tujuan                                                                      |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Factory server MCP, titik masuk stdio, pendaftaran alat berdasarkan cakupan |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transport SSE + Streamable HTTP (manajemen sesi)                            |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluasi cakupan alat dan resolusi pemanggil                                |
| `open-sse/mcp-server/audit.ts`                                           | Pencatatan audit pemanggilan alat (`mcp_tool_audit`)                        |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Penulis heartbeat stdio (`mcp-heartbeat.json`)                              |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresi deskripsi untuk registri alat / prompt / sumber daya               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Skema Zod + registri alat (`MCP_TOOLS`, 45 entri)                           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Handler alat Fase 2 + cache + 1proxy                                        |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Handler alat kompresi                                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definisi alat memori (3 alat)                                               |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definisi alat keterampilan (4 alat)                                         |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definisi alat sumber konteks Notion (6 alat)                                |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definisi alat gamifikasi (8 alat)                                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alat pendaftaran dan pengelolaan plugin (8 alat)                            |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                                  |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                                   |
| `src/app/api/mcp/sse/route.ts`                                           | Rute transport SSE `/api/mcp/sse`                                           |
| `src/app/api/mcp/stream/route.ts`                                        | Rute transport Streamable HTTP `/api/mcp/stream`                            |
| `src/app/api/mcp/audit/route.ts`                                         | Kueri log audit `/api/mcp/audit`                                            |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Metrik audit teragregasi `/api/mcp/audit/stats`                             |
| `src/lib/notion/api.ts`                                                  | Klien REST API Notion (percobaan ulang, batas waktu, klasifikasi kesalahan) |
| `src/lib/db/notion.ts`                                                   | Persistensi token Notion (tabel `key_value`)                                |
| `src/app/api/settings/notion/route.ts`                                   | API pengaturan Notion (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI pengelolaan token Notion                                                 |
| `tests/unit/notion-api.test.ts`                                          | Pengujian klien API Notion (7)                                              |
| `tests/unit/notion-tools.test.ts`                                        | Pengujian penegakan cakupan alat Notion (10)                                |
| `tests/unit/db/notion.test.mjs`                                          | Pengujian modul DB Notion (3)                                               |
