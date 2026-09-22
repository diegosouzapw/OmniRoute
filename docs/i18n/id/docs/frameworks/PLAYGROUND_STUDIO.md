# Playground Studio (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Fitur:** Playground Studio — ruang kerja terpadu untuk pengujian AI di `/dashboard/playground`.
> **Paket:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Dirilis dalam v3.8.6

---

## Ikhtisar

Playground Studio mengubah `/dashboard/playground` dari editor sederhana berbasis Monaco menjadi
ruang kerja pengujian berfitur lengkap. Fitur ini menggantikan `page.tsx` lama dengan shell `PlaygroundStudio`
yang merender empat tab dan panel konfigurasi bersama.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Bandingkan] [{} API] [🔧 Buat]   142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {konten tab aktif}                      │ ─ Konfigurasi             │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ Sistem    [area teks]     │
│                                          │ Suhu      ▕▕▔▔ 0.7        │
│                                          │ Preset [▾ muat][simpan]   │
│                                          │ [✨ Tingkatkan prompt]     │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Tab

### Tab Chat

Mengembangkan `ChatPlayground.tsx` menjadi ruang kerja streaming multi-giliran:

- Rendering markdown lengkap melalui `MarkdownMessage.tsx` (blok kode, tabel, daftar, tautan).
- Prompt sistem bersumber dari panel Konfigurasi bersama.
- Token/biaya per pesan (token prompt + penyelesaian).
- Buat ulang respons terakhir.
- Mengirim ke `POST /v1/chat/completions` dengan streaming SSE.

### Tab Perbandingan

Pembeda utama untuk sebuah proksi: jalankan 1 prompt di hingga **4 model secara paralel**.

- Hingga 4 kolom, masing-masing melakukan streaming secara independen dari `/v1/chat/completions`.
- Tombol `+ Tambah model` (pintasan Cmd+K) untuk menambahkan kolom.
- `Jalankan semua ▶` memicu semua stream secara bersamaan melalui `Promise.all` + `AbortController` per kolom.
- **Batalkan semua** secara global menghentikan setiap stream yang sedang berjalan.
- `ProviderMetrics` per kolom menampilkan TTFT, TPS, token, dan estimasi biaya secara real-time.
- Metrik diberi label **"estimasi sisi klien"** (D12) — diukur dari potongan SSE pertama.

### Tab API

Mempertahankan 100% editor Monaco asli untuk pengguna tingkat lanjut (D14):

- 10 endpoint: penyelesaian chat, penyelesaian, embedding, gambar, audio, ucapan, transkripsi, moderasi, pemeringkatan ulang, pencarian.
- Unggah file multimodal.
- Streaming SSE dengan output real-time.
- Dibungkus sebagai `ApiTab.tsx` (dimuat secara malas, `ssr: false`).

### Tab Build

Antarmuka alat/pemanggilan fungsi dan output terstruktur:

- `ToolsBuilder.tsx` — tambahkan/edit/hapus `tools[]` dengan editor skema JSON per alat.
  Memvalidasi parameter melalui `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — aktifkan/nonaktifkan mode JSON + editor skema JSON.
  Memvalidasi respons terhadap skema melalui `StructuredOutputSchema` (Zod).
- Mengirim permintaan ke `/v1/chat/completions` dengan `tools[]` dan/atau `response_format`.

---

## Panel Konfigurasi (Bersama)

`StudioConfigPane.tsx` — selalu terlihat, dapat diciutkan.

| Bidang          | Komponen              | Catatan                                                                    |
| --------------- | --------------------- | -------------------------------------------------------------------------- |
| Endpoint        | `<select>`            | 10 opsi yang sesuai dengan `PlaygroundEndpoint`                            |
| Model           | `<input>`             | teks bebas, misalnya `openai/gpt-4o`                                       |
| Prompt sistem   | `<textarea>`          | diteruskan ke semua tab                                                    |
| Parameter       | `ParamSliders`        | temperature, max_tokens, top_p, penalti presence/frequency, seed, stop     |
| Preset          | `PresetPicker`        | memuat/menyimpan snapshot konfigurasi bernama (disimpan di DB)             |
| Perbaiki prompt | `ImprovePromptButton` | membuka modal peringatan kuota, memanggil `/api/playground/improve-prompt` |

State diangkat ke `PlaygroundStudio.tsx` dan diteruskan ke semua tab. Berpindah tab
mempertahankan state konfigurasi.

---

## Bilah Atas

`StudioTopBar.tsx`:

- Pengalih tab (role="tablist").
- `TokenCostCounter` — tampilan token langsung (↑/↓) dan estimasi biaya.
- Tombol ekspor kode (`</>`) — membuka `ExportCodeModal`.

---

## Modal Ekspor Kode

`ExportCodeModal.tsx` menggunakan `codeExport.ts` untuk menghasilkan cuplikan curl / Python / TypeScript
dari `PlaygroundState` saat ini. Placeholder kunci API selalu `$OMNIROUTE_API_KEY` (D11).

---

## Penyempurna Prompt

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modal memperingatkan "akan menggunakan kuota".
2. Setelah dikonfirmasi, mengirim `{ system, prompt, model, tone }` ke route.
3. Route memanggil `/v1/chat/completions` secara internal dengan `promptImprover.META_SYSTEM_PROMPT`.
4. Mengembalikan `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. UI memperbarui prompt sistem pada panel Konfigurasi dan prompt pengguna pada tab Chat.

---

## Preset

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Disimpan dalam tabel SQLite `playground_presets` (migrasi `084_playground_presets.sql`).
- Setiap preset menyimpan: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: daftar `GET`, buat `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metrik Stream

`useStreamMetrics.ts` + `streamMetrics.ts` (fungsi murni):

- `start()` — mencatat waktu mulai permintaan.
- `onFirstChunk()` — mencatat TTFT.
- `onChunk(n)` — mengakumulasi jumlah token penyelesaian.
- `finish(usage?)` — menghitung metrik akhir: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Harga dari tabel statis di `src/lib/playground/types.ts` (diberi label "estimasi" — D13).

---

## Route Backend

| Metode   | Path                             | Handler                                                                                                  |
| -------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Memvalidasi `ImprovePromptRequestSchema` dengan Zod; memanggil `/v1/chat/completions` dengan meta-prompt |
| `GET`    | `/api/playground/presets`        | Mengembalikan `{ presets: PlaygroundPresetListItem[] }`                                                  |
| `POST`   | `/api/playground/presets`        | Membuat preset; memvalidasi `PlaygroundPresetCreateSchema`                                               |
| `GET`    | `/api/playground/presets/:id`    | Mengembalikan satu preset atau 404                                                                       |
| `PUT`    | `/api/playground/presets/:id`    | Pembaruan parsial                                                                                        |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                      |

Autentikasi: opsional (`REQUIRE_API_KEY`). Error melalui `buildErrorBody()` (Aturan Ketat #12).

---

## File Utama

| Path                                                                       | Tujuan                                                      |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Komponen shell, pengatur tab                                |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Tab + penghitung + tombol ekspor                            |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Panel konfigurasi bersama                                   |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Area kerja chat                                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Perbandingan beberapa model                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (dipertahankan)                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Alat + keluaran terstruktur                                 |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal ekspor kode                                           |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Kolom perbandingan tunggal                                  |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Tampilan TTFT/TPS                                           |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook metrik sisi klien                                      |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD preset                                            |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook penyempurnaan prompt                                   |
| `src/lib/playground/codeExport.ts`                                         | Generator curl/Python/TS (digunakan bersama Alat Pencarian) |
| `src/lib/playground/promptImprover.ts`                                     | Pembuat meta-prompt                                         |
| `src/lib/playground/streamMetrics.ts`                                      | Komputasi metrik murni                                      |
| `src/lib/db/playgroundPresets.ts`                                          | Modul DB (CRUD)                                             |
| `src/app/api/playground/improve-prompt/route.ts`                           | Rute REST penyempurnaan prompt                              |
| `src/app/api/playground/presets/route.ts`                                  | Daftar + pembuatan preset                                   |
| `src/app/api/playground/presets/[id]/route.ts`                             | Mengambil/memperbarui/menghapus preset                      |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migrasi DB                                                  |

---

## Pemecahan Masalah

| Gejala                                        | Penyebab                              | Solusi                                                                                         |
| --------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Editor Monaco tidak ditampilkan di tab API    | SSR memuat Monaco                     | Pastikan `ApiTab` menggunakan `dynamic(..., { ssr: false })`                                   |
| Stream perbandingan berjalan secara berurutan | Penggunaan `Promise.all` yang salah   | Semua stream harus mulai dijalankan dalam satu pemanggilan `Promise.all`                       |
| Metrik menampilkan TTFT `null`                | Handler chunk pertama tidak terhubung | Pastikan `useStreamMetrics.onFirstChunk()` dipanggil dalam loop pembaca SSE                    |
| Preset tidak tersimpan                        | Migrasi DB belum dijalankan           | Jalankan `npm run db:migrate` atau mulai ulang server (migrasi otomatis berjalan saat startup) |
| Peningkatan prompt menghasilkan 502           | Model belum diatur di Config          | Pengguna harus memasukkan nama model di panel Config sebelum melakukan peningkatan             |
| Kode ekspor menampilkan `MISSING_API_KEY`     | Placeholder tidak disisipkan          | `codeExport.ts` selalu menggunakan `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                |

---

## Referensi

- Rencana induk: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Rencana fitur: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Ekspor kode: `src/lib/playground/codeExport.ts`
- Penyempurna prompt: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
