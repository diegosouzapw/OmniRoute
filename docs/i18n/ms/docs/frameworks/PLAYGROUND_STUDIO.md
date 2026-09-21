# Playground Studio (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Ciri:** Playground Studio — ruang kerja pengujian AI bersepadu untuk `/dashboard/playground`.
> **Pelan:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Dikeluarkan dalam v3.8.6

---

## Gambaran Keseluruhan

Playground Studio mengubah `/dashboard/playground` daripada penyunting ringkas berasaskan Monaco kepada
ruang kerja pengujian berciri lengkap. Ia menggantikan `page.tsx` legasi dengan kerangka `PlaygroundStudio`
yang memaparkan empat tab dan anak tetingkap konfigurasi dikongsi.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Sembang] [⚖ Banding] [{} API] [🔧 Bina]   142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {kandungan tab aktif}                   │ ─ Konfigurasi             │
│                                          │ Titik akhir [chat ∨]      │
│                                          │ Model       [gpt-5.4 ∨]   │
│                                          │ Sistem      [ruang teks]  │
│                                          │ Suhu        ▕▕▔▔ 0.7      │
│                                          │ Pratetap [▾ muat][simpan] │
│                                          │ [✨ Perbaik gesaan]        │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Tab

### Tab Sembang

Mengembangkan `ChatPlayground.tsx` menjadi meja kerja penstriman berbilang giliran:

- Pemaparan markdown penuh melalui `MarkdownMessage.tsx` (blok kod, jadual, senarai, pautan).
- Gesaan sistem diperoleh daripada anak tetingkap Konfigurasi dikongsi.
- Token/kos bagi setiap mesej (token gesaan + pelengkapan).
- Jana semula respons terakhir.
- Menghantar ke `POST /v1/chat/completions` dengan penstriman SSE.

### Tab Banding

Pembeza utama bagi proksi: jalankan 1 gesaan merentas sehingga **4 model secara selari**.

- Sehingga 4 lajur, setiap satunya menstrim secara bebas daripada `/v1/chat/completions`.
- Butang `+ Tambah model` (pintasan Cmd+K) untuk menambah lajur.
- `Jalankan semua ▶` mencetuskan semua strim secara serentak melalui `Promise.all` + `AbortController` bagi setiap lajur.
- **Batalkan semua** global menghentikan setiap strim yang sedang berjalan.
- `ProviderMetrics` bagi setiap lajur menunjukkan TTFT, TPS, token dan anggaran kos dalam masa nyata.
- Metrik dilabel **"anggaran sebelah klien"** (D12) — diukur daripada cebisan SSE pertama.

### Tab API

Mengekalkan 100% penyunting Monaco asal untuk pengguna lanjutan (D14):

- 10 titik akhir: pelengkapan sembang, pelengkapan, pembenaman, imej, audio, pertuturan, transkripsi, penyederhanaan, penarafan semula, carian.
- Muat naik fail multimodal.
- Penstriman SSE dengan output masa nyata.
- Dibungkus sebagai `ApiTab.tsx` (dimuatkan secara malas, `ssr: false`).

### Tab Bina

Antara muka pengguna untuk panggilan alat/fungsi dan output berstruktur:

- `ToolsBuilder.tsx` — tambah/edit/alih keluar `tools[]` dengan penyunting skema JSON bagi setiap alat.
  Mengesahkan parameter melalui `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — togol mod JSON + penyunting skema JSON.
  Mengesahkan respons terhadap skema melalui `StructuredOutputSchema` (Zod).
- Menghantar permintaan ke `/v1/chat/completions` dengan `tools[]` dan/atau `response_format`.

## Anak Tetingkap Konfigurasi (Dikongsi)

`StudioConfigPane.tsx` — sentiasa kelihatan, boleh diruntuhkan.

| Medan        | Komponen              | Catatan                                                                |
| ------------ | --------------------- | ---------------------------------------------------------------------- |
| Titik akhir  | `<select>`            | 10 pilihan yang sepadan dengan `PlaygroundEndpoint`                    |
| Model        | `<input>`             | teks bebas, cth. `openai/gpt-4o`                                       |
| Prom sistem  | `<textarea>`          | disalurkan ke semua tab                                                |
| Parameter    | `ParamSliders`        | temperature, max_tokens, top_p, penalti presence/frequency, seed, stop |
| Pratetap     | `PresetPicker`        | muat/simpan syot kilat konfigurasi bernama (disimpan dalam DB)         |
| Perbaik prom | `ImprovePromptButton` | membuka modal amaran kuota, memanggil `/api/playground/improve-prompt` |

Keadaan diangkat ke `PlaygroundStudio.tsx` dan dihantar kepada semua tab. Penukaran tab
mengekalkan keadaan konfigurasi.

---

## Bar Atas

`StudioTopBar.tsx`:

- Penukar tab (role="tablist").
- `TokenCostCounter` — paparan token langsung (↑/↓) dan anggaran kos.
- Butang eksport kod (`</>`) — membuka `ExportCodeModal`.

---

## Modal Eksport Kod

`ExportCodeModal.tsx` menggunakan `codeExport.ts` untuk menjana coretan curl / Python / TypeScript
daripada `PlaygroundState` semasa. Ruang letak kunci API sentiasa `$OMNIROUTE_API_KEY` (D11).

---

## Penambah Baik Prom

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modal memberi amaran "akan menggunakan kuota".
2. Selepas pengesahan, menghantar `{ system, prompt, model, tone }` ke laluan tersebut.
3. Laluan memanggil `/v1/chat/completions` secara dalaman dengan `promptImprover.META_SYSTEM_PROMPT`.
4. Mengembalikan `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. UI mengemas kini prom sistem anak tetingkap Konfigurasi dan prom pengguna tab Sembang.

---

## Pratetap

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Disimpan dalam jadual SQLite `playground_presets` (migrasi `084_playground_presets.sql`).
- Setiap pratetap menyimpan: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: senarai `GET`, cipta `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metrik Strim

`useStreamMetrics.ts` + `streamMetrics.ts` (fungsi tulen):

- `start()` — merekodkan masa mula permintaan.
- `onFirstChunk()` — merekodkan TTFT.
- `onChunk(n)` — mengumpulkan kiraan token pelengkapan.
- `finish(usage?)` — mengira metrik akhir: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Harga daripada jadual statik dalam `src/lib/playground/types.ts` (dilabelkan "anggaran" — D13).

---

## Laluan Bahagian Belakang

| Kaedah   | Laluan                           | Pengendali                                                                                             |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `POST`   | `/api/playground/improve-prompt` | Mengesahkan `ImprovePromptRequestSchema` dengan Zod; memanggil `/v1/chat/completions` dengan meta-prom |
| `GET`    | `/api/playground/presets`        | Mengembalikan `{ presets: PlaygroundPresetListItem[] }`                                                |
| `POST`   | `/api/playground/presets`        | Mencipta pratetap; mengesahkan `PlaygroundPresetCreateSchema`                                          |
| `GET`    | `/api/playground/presets/:id`    | Mengembalikan satu pratetap atau 404                                                                   |
| `PUT`    | `/api/playground/presets/:id`    | Kemas kini separa                                                                                      |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                    |

Pengesahan: pilihan (`REQUIRE_API_KEY`). Ralat melalui `buildErrorBody()` (Peraturan Tegas #12).

---

## Fail Utama

| Laluan                                                                     | Tujuan                                               |
| -------------------------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Komponen kerangka, pengatur tab                      |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Tab + pembilang + butang eksport                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Panel konfigurasi dikongsi                           |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Ruang kerja sembang                                  |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Perbandingan berbilang model                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (dikekalkan)                           |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Alat + output berstruktur                            |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal eksport kod                                    |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Lajur perbandingan tunggal                           |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Paparan TTFT/TPS                                     |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Cangkuk metrik sebelah klien                         |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Cangkuk CRUD pratetap                                |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Cangkuk penambahbaikan prom                          |
| `src/lib/playground/codeExport.ts`                                         | Penjana curl/Python/TS (dikongsi dengan Alat Carian) |
| `src/lib/playground/promptImprover.ts`                                     | Pembina metaprom                                     |
| `src/lib/playground/streamMetrics.ts`                                      | Pengiraan metrik tulen                               |
| `src/lib/db/playgroundPresets.ts`                                          | Modul DB (CRUD)                                      |
| `src/app/api/playground/improve-prompt/route.ts`                           | Laluan REST penambahbaikan prom                      |
| `src/app/api/playground/presets/route.ts`                                  | Senarai + penciptaan pratetap                        |
| `src/app/api/playground/presets/[id]/route.ts`                             | Dapatkan/kemas kini/padam pratetap                   |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migrasi DB                                           |

---

## Penyelesaian Masalah

| Gejala                                         | Punca                                         | Penyelesaian                                                                                                     |
| ---------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Editor Monaco tidak dipaparkan dalam tab API   | SSR memuatkan Monaco                          | Pastikan `ApiTab` menggunakan `dynamic(..., { ssr: false })`                                                     |
| Strim perbandingan dicetuskan secara berurutan | Penggunaan `Promise.all` yang salah           | Semua permulaan strim mesti dihantar dalam satu panggilan `Promise.all`                                          |
| Metrik menunjukkan TTFT `null`                 | Pengendali cebisan pertama tidak disambungkan | Pastikan `useStreamMetrics.onFirstChunk()` dipanggil dalam gelung pembaca SSE                                    |
| Pratetap tidak disimpan secara berterusan      | Migrasi DB tidak dijalankan                   | Jalankan `npm run db:migrate` atau mulakan semula pelayan (migrasi dijalankan secara automatik semasa permulaan) |
| Penambahbaikan gesaan mengembalikan 502        | Model tidak ditetapkan dalam Config           | Pengguna mesti memasukkan nama model dalam anak tetingkap Config sebelum membuat penambahbaikan                  |
| Kod eksport menunjukkan `MISSING_API_KEY`      | Pemegang tempat tidak disisipkan              | `codeExport.ts` sentiasa menggunakan `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                |

---

## Rujukan

- Pelan induk: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Pelan ciri: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Eksport kod: `src/lib/playground/codeExport.ts`
- Penambah baik gesaan: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
