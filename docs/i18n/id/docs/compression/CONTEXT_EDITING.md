# Delegated Context Editing (Anthropic) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Pengeditan Konteks** yang didelegasikan adalah fitur pengelolaan konteks khusus Claude. Tidak seperti mesin kompresi lokal OmniRoute (Caveman, RTK, LLMLingua, pipeline bertumpuk) — yang menulis ulang isi permintaan _sebelum_ meninggalkan proksi — Pengeditan Konteks meminta **penyedia** untuk menghapus blok penggunaan alat/hasil alat yang sudah usang dari jendela konteksnya sendiri yang sedang berjalan. OmniRoute hanya menambahkan parameter isi (`context_management.edits[]`); Claude yang melakukan penghapusan sebenarnya berdasarkan tokenizer-nya sendiri.

Pada dasarnya, ini merupakan kemampuan yang didelegasikan: penyedia lain menolak parameter tersebut, sehingga OmniRoute membatasi cakupannya secara ketat hanya untuk Claude dan relay yang kompatibel dengan Claude Code.

Sumber acuan: `open-sse/config/contextEditing.ts` (id strategi, injeksi isi, ekstraksi telemetri), `open-sse/executors/base.ts` (gerbang injeksi + fallback 400), dan `open-sse/services/compression/types.ts` (bentuk konfigurasi + nilai default).

## Yang dilakukan `clear_tool_uses`

OmniRoute menginjeksikan satu pengeditan ke dalam isi Anthropic Messages yang dikirim:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — id strategi Anthropic bertanggal (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — setelah token masukan permintaan melampaui ambang batas ini, Claude mulai menghapus pasangan penggunaan alat/hasil alat lama (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, nilai default Anthropic).
- `keep.value: 3` — N pasangan penggunaan alat/hasil alat terbaru dipertahankan tanpa perubahan (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Versi beta diumumkan melalui header `anthropic-beta: context-management-2025-06-27`, yang sudah dipancarkan OmniRoute pada permintaan Claude.

Injeksi dilakukan oleh `applyContextEditingToBody()` dan bersifat **idempoten**: jika pengeditan `clear_tool_uses` sudah ada dalam isi (ditambahkan oleh pemanggilan sebelumnya atau disediakan oleh klien), isi tersebut dibiarkan apa adanya. Jika pengeditan `clear_thinking_20251015` juga ada, OmniRoute melakukan pengurutan stabil untuk memindahkan pengeditan `clear_thinking` ke depan, karena Anthropic mengharuskan `clear_thinking` mendahului `clear_tool_uses` dalam array `edits[]`.

## Tombol pengaktifan per kombinasi

Pengeditan Konteks **nonaktif secara default** dan harus diaktifkan secara eksplisit. Tombolnya berupa satu nilai boolean yang disertakan dalam konfigurasi kompresi:

- Kunci pengaturan: `contextEditing.enabled` (camelCase — **bukan** `context_editing` / `context-editing`).
- Tipe: `ContextEditingConfig { enabled: boolean }` dalam `open-sse/services/compression/types.ts`.
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Skema Zod: `contextEditingConfigSchema` dalam `src/shared/validation/compressionConfigSchemas.ts`.
- Penyimpanan: dipersistenkan bersama pengaturan kompresi lainnya (dinormalisasi dalam `src/lib/db/compression.ts`).

Di dasbor, tombol tersebut berada di hub kompresi (`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) dan menulis kembali `{ contextEditing: { enabled: … } }` melalui `saveSettings()`. Karena menjadi bagian dari objek pengaturan kompresi, pengaturan ini digabungkan dengan profil kompresi per kombinasi, bukan sebagai antarmuka yang sepenuhnya independen — konfigurasi hanya membawa penanda aktif/nonaktif; seluruh ambang batas (`trigger`, `keep`) menggunakan konstanta yang didokumentasikan di atas.

## Pembatasan khusus Claude

Injeksi hanya terjadi untuk Claude asli atau relay yang kompatibel dengan Claude Code. Pembatas di
`open-sse/executors/base.ts` adalah:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — kunci/OAuth Anthropic asli.
- `isClaudeCodeCompatible(this.provider)` — relay yang ID providernya diawali dengan prefiks
  `anthropic-compatible-cc-` (relay tersebut menyatakan kompatibilitas dengan Claude Code, sehingga
  merupakan relay yang paling mungkin menerima fitur beta ini). Lihat `open-sse/services/provider.ts`.

Sengaja **dikecualikan**:

- `claude-web` — relay peramban dengan bentuk permintaan `create_conversation_params` yang tidak
  pernah menerima `context_management`.
- Relay generik `anthropic-compatible-*` (tanpa prefiks `-cc-`) — endpoint pihak ketiga dengan
  dukungan beta yang tidak pasti.

Provider non-Claude tidak pernah menerima parameter `context_management`, bahkan ketika toggle
diaktifkan.

## Fallback 400 / cakupan relay

Relay yang kompatibel dengan Claude mungkin menyatakan dukungan terhadap fitur beta, tetapi tetap
menolak parameter `context_management` dengan HTTP 400. Agar dapat menurunkan fungsionalitas secara
bertahap tanpa menggagalkan permintaan, executor menghapus parameter tersebut dan mencoba kembali URL
yang sama **satu kali**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Perilaku:

1. Hanya dipicu pada `400` ketika pengeditan konteks diaktifkan dan isi permintaan benar-benar
   memuat `context_management`.
2. Isi respons 400 dibaca melalui `clone()` agar respons asli tetap utuh untuk jalur yang tidak
   cocok.
3. Teks kesalahan harus cocok dengan `/context[_-]management|context editing/i` — 400 yang tidak
   terkait (misalnya `max_tokens must be >= 1`) **tidak** memicu fallback; kesalahan asli diteruskan.
4. Jika cocok, `contextEditingDisabled = true` ditetapkan (yang mencegah injeksi ulang apabila
   `transformedBody` baru kemudian dibuat untuk URL percobaan ulang/fallback), `context_management`
   dihapus, isi permintaan ditandatangani ulang untuk Claude / relay yang kompatibel dengan Claude
   Code (`signRequestBody`), lalu URL yang sama dicoba kembali satu kali.

Claude asli menyertakan fitur beta dalam `ANTHROPIC_BETA_BASE` dan tidak melewati jalur fallback ini.

## Telemetri `applied_edits`

Setelah respons Claude diterima, OmniRoute mencatat seberapa banyak konteks yang benar-benar
dibersihkan oleh provider. Data ini **tidak** dialirkan — data diekstrak dari isi respons
non-streaming dengan upaya terbaik dan tidak pernah memengaruhi respons (kegagalan telemetri
diabaikan).

- Ekstraksi: `extractContextEditingTelemetry(responseBody)` dalam
  `open-sse/config/contextEditing.ts`. Fungsi ini memeriksa `applied_edits` di tiga lokasi (secara
  defensif karena bentuk respons dapat bervariasi):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Kolom per pengeditan yang dibaca dari setiap entri: `cleared_input_tokens` dan
  `cleared_tool_uses` (snake_case, format asli Anthropic), dengan fallback camelCase
  `clearedInputTokens` / `clearedToolUses`.
- Mengembalikan `null` ketika tidak ada array `applied_edits` yang ditemukan atau tidak ada data
  yang benar-benar dibersihkan.

Bentuk tanda terimanya adalah
`ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`. Pencatatan dilakukan
dalam `open-sse/handlers/chatCore.ts` (dibatasi untuk `provider === "claude"`) melalui
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), yang menulis baris analitik
kompresi dengan tag:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = jumlah token input yang dibersihkan
- `request_id` diakhiri dengan `::context-editing`

Dengan demikian, pembersihan yang didelegasikan muncul dalam analitik kompresi bersama engine lokal,
di bawah label engine `context-editing`, dan dapat dibedakan dari penghematan
RTK/Caveman/LLMLingua.

## Hubungan dengan mesin kompresi lokal

| Aspek                 | Mesin lokal (Caveman / RTK / LLMLingua / stacked)   | Context Editing yang Didelegasikan               |
| --------------------- | --------------------------------------------------- | ------------------------------------------------ |
| Tempat dijalankan     | Di OmniRoute, sebelum permintaan meninggalkan proxy | Di penyedia (Claude), di sisi server             |
| Yang diedit           | Teks prompt / konteks / hasil alat                  | Blok penggunaan alat / hasil alat yang lama      |
| Cakupan penyedia      | Semua penyedia                                      | Hanya `claude` + `anthropic-compatible-cc-*`     |
| Pengalih              | Pengaturan mode kompresi                            | `contextEditing.enabled`                         |
| Mode kegagalan        | Fail-open (teks asli)                               | Fallback 400: hapus parameter, coba ulang sekali |
| Telemetri penghematan | `engine: <engine id>`                               | `engine: "context-editing"`                      |

Keduanya saling melengkapi: mesin lokal mengompresi byte yang dikirim OmniRoute; Context Editing memungkinkan
Claude memangkas konteks yang berjalan di sepanjang giliran percakapan. Keduanya dapat diaktifkan bersama-sama.

## Lihat Juga

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — registri mesin dan mesin kompresi
  lokal
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — kompresi perintah/output alat
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — kompresi deskripsi MCP dan
  pengurangan kardinalitas alat
- Sumber: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
