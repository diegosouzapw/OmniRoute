# Model Exposure Allow/Deny List (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Bersifat opt-in, dinonaktifkan secara default (`modelVisibilityAllowlist`/`modelVisibilityDenylist` yang
> keduanya kosong membuat katalog `/v1/models` DAN setiap kumpulan kandidat `auto/*` identik secara
> byte). Fitur ini merupakan fitur sejenis dengan `hidePaidModels`/`hideAutoCombos`
> (`src/lib/db/settings.ts`) bagi operator yang menginginkan daftar model terkurasi karena alasan
> yang tidak berkaitan dengan biaya.

## Alasan fitur ini tersedia

`hidePaidModels` menjawab "apakah model ini gratis?" dan `hideAutoCombos` menjawab "apakah ID virtual
`auto/*` perlu ditampilkan?" — keduanya tidak memungkinkan operator mengkurasi subset model secara
bebas (misalnya menampilkan tepat model-model yang seharusnya dilihat oleh klien Claude Code /
OpenCode tertentu, terlepas dari harganya). #11481 menambahkan kemampuan tersebut sebagai dua
pengaturan array string independen yang bersifat opt-in.

## Pengaturan

| Kunci                      | Tipe       | Default | Arti                                                                                    |
| -------------------------- | ---------- | ------- | --------------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`    | Entri yang cocok dengan kandidat akan menyembunyikannya dari katalog/kumpulan kandidat. |
| `modelVisibilityAllowlist` | `string[]` | `[]`    | Jika tidak kosong, HANYA entri yang cocok dengan kandidat yang tetap ditampilkan.       |

Keduanya menerima hingga 500 entri dengan panjang maksimum 200 karakter per entri (divalidasi
oleh Zod di `src/shared/validation/settingsSchemas.ts`). Sebuah entri dapat berupa:

- ID katalog persis — `"gpt-4o"` (ID model tanpa prefiks) atau `"openai/gpt-4o"` (dengan prefiks penyedia), atau
- pola glob yang menggunakan `*`/`?` — misalnya `"openai/gpt-4*"` atau `"anthropic/*"` — dicocokkan
  melalui pencocok bersama `globToRegex()` (`src/shared/utils/globPattern.ts`) yang sudah digunakan
  oleh pemetaan kombo per model milik `ModelRoutingSection` dan `freeModels.ts::matchesOnlyPaidModels`.

Prioritas: denylist diperiksa terlebih dahulu (entri yang ditolak selalu disembunyikan, meskipun
juga cocok dengan allowlist); jika allowlist tidak kosong, hanya entri yang cocok dengannya yang
tetap ditampilkan.

## Dua titik kontrol, bukan satu

Pelajaran dari #6512 (filter katalog yang hanya menggunakan `hidePaidModels` masih memungkinkan
`auto/*` merutekan ke model berbayar karena kumpulan kandidat kombo dibuat secara terpisah) berlaku
sama persis di sini. Predikat pencocokan `isModelExposureAllowed()`
(`src/shared/utils/modelExposureList.ts`) dipanggil dari KEDUANYA:

- `src/app/api/v1/models/catalog.ts` — daftar `/v1/models` itu sendiri, pada 5 titik kontrol per
  sumber yang sama yang sudah dibatasi oleh `shouldHidePaid()` (`PROVIDER_MODELS` statis, baris
  penyedia tersinkronisasi, baris kustom, baris berbasis alias, baris fallback terkelola).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — dipanggil
  dari `virtualFactory.ts::buildPreparedPool`, tepat setelah pemanggilan
  `filterPaidOnlyCandidates()` yang setara, sehingga model yang ditolak juga tidak akan pernah
  dapat dipilih ke dalam kumpulan kandidat `auto/*`.

## Yang TIDAK difilter

Mengikuti perilaku `hideAutoCombos` yang sudah ada: ID model yang dikirim **secara eksplisit**
(bukan melalui `auto/*`, dan bukan ditemukan melalui daftar katalog) tidak pernah diblokir saat
dispatch — hanya penampilan/keanggotaan kumpulan kandidat yang difilter. Hal ini bersifat independen
dari `hidePaidModels`; operator mungkin menginginkan set terkurasi karena alasan yang tidak
berkaitan dengan biaya, sehingga kedua pengaturan digabungkan sebagai filter independen yang
di-AND-kan, sama seperti komposisi beberapa flag yang sudah ada di `catalog.ts`.

Ekspor pengaturan (`GET /api/settings/export-json`) menyertakan kedua array apa adanya, seperti
field pengaturan lainnya — tidak seperti filter ekspor langkah kombo milik `hidePaidModels`, tidak
ada risiko rehidrasi di sini: ID yang ditolak dan disematkan dalam langkah kombo yang diekspor
merupakan pilihan perutean eksplisit milik operator sendiri, bukan sesuatu yang perlu dihapus oleh
batas ekspor.
