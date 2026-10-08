# Reasoning Routing (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Aturan perutean penalaran memperluas perutean model dan combo yang sudah ada. Ketika tidak ada aturan aktif yang cocok,
perilaku thinking, suffix, default koneksi, dan penerjemahan provider yang sudah ada tetap
tidak berubah.

## Pengelolaan

Pengelolaan aturan tersedia di **Settings → Global Routing**. Editor API key menyediakan UI
pengelolaan yang sama, yang difilter berdasarkan key yang dipilih.

API pengelolaan diekspos melalui rute berikut:

- `GET` dan `POST` di `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH`, dan `DELETE` di `/api/settings/reasoning-routing-rules/[id]`
- `POST` di `/api/settings/reasoning-routing-rules/simulate`

Semua rute menggunakan `requireManagementAuth`. Input divalidasi dengan skema di
`src/shared/validation/schemas/reasoningRouting.ts`. Simulator tidak pernah melakukan panggilan upstream.

## Resolusi Aturan

Evaluasi awal memilih tepat satu aturan. Cakupan diperiksa dengan urutan berikut:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Dalam suatu cakupan, `priority` yang lebih tinggi diprioritaskan, diikuti oleh kecocokan model persis daripada pola glob,
kemudian pengurutan stabil berdasarkan `createdAt` dan `id`. `requestTags` dibaca secara eksklusif dari `metadata.tags`
dan mendukung pencocokan `any` atau `all`.

Aturan `connection` hanya dievaluasi ketika tidak ada aturan awal yang menang dan koneksi provider tertentu
telah dipilih. Aturan ini hanya dapat mengubah effort dan budget.

## Effort dan Budget

`sourceEffort` menerima `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max`, dan
`ultra`. `missing` berarti bahwa permintaan tidak berisi effort diskret maupun toggle thinking
atau budget thinking. Oleh karena itu, sinyal yang hanya berisi budget hanya dicocokkan oleh `any`.

`effortMode` memiliki tiga varian:

- `inherit` mempertahankan effort klien sambil tetap memungkinkan model atau combo berubah.
- `default` menetapkan `targetEffort` hanya ketika tidak ada sinyal penalaran eksplisit.
- `force` mengganti effort diskret dengan `targetEffort`.

Secara independen, `budgetAction` dapat berupa `preserve`, `remove`, atau `set`. `force` dengan `none` menghapus
semua field effort dan budget yang dikenali. `none` bersama dengan `set` tidak valid.

Permintaan yang menargetkan model yang diketahui tidak kompatibel ditolak sebelum panggilan upstream. Untuk target
combo, entri yang tidak kompatibel dihapus; jika tidak ada yang tersisa, permintaan mengembalikan status `400`.
Data kapabilitas yang tidak diketahui menghasilkan peringatan dan membiarkan aturan tetap aktif.

## Keamanan dan Transport

Model sumber dan target, atau combo sumber dan target, tetap tunduk pada kebijakan API key
yang sudah ada. Aturan penalaran tidak pernah memperluas izin model, combo, atau kuota.

Engine diintegrasikan ke dalam Chat Completions, Responses, Anthropic Messages, dan jalur internal
Codex WebSocket. Jalur WebSocket hanya menerima model target Codex; target combo tidak dapat
dieksekusi di sana. Keputusan aturan disimpan dalam route trace yang sudah ada tanpa rahasia.

## Persistensi

Migrasi `src/lib/db/migrations/126_reasoning_routing_rules.sql` membuat tabel
`reasoning_routing_rules`. Aturan mereferensikan API key, combo, dan koneksi provider yang tersimpan.
Penghapusan membersihkan aturan terkait. Lapisan akses database di
`src/lib/db/reasoningRoutingRules.ts` memelihara cache yang dapat diinvalidasi untuk jalur permintaan.

Aturan disertakan dalam backup SQLite, ekspor database lengkap, dan bundle sinkronisasi konfigurasi.
`reconcileReasoningRulesForSync` menonaktifkan aturan yang diimpor dengan referensi yang hilang dan melaporkan
konflik tersebut.
