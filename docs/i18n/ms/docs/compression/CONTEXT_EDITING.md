# Delegated Context Editing (Anthropic) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

**Penyuntingan Konteks** yang diwakilkan ialah ciri pengurusan konteks khusus untuk Claude. Tidak seperti enjin
pemampatan setempat OmniRoute (Caveman, RTK, LLMLingua, saluran paip bertindan) — yang menulis semula badan permintaan
_sebelum_ ia meninggalkan proksi — Penyuntingan Konteks meminta **penyedia** mengosongkan blok
penggunaan alat / hasil alat yang lapuk daripada tetingkap konteks aktifnya sendiri. OmniRoute hanya melampirkan parameter badan
(`context_management.edits[]`); Claude melakukan pengosongan sebenar berdasarkan pentokennya sendiri.

Secara semula jadi, ini ialah keupayaan yang diwakilkan: penyedia lain menolak parameter tersebut, jadi OmniRoute mengehadkan
penggunaannya secara ketat kepada Claude dan geganti yang serasi dengan Claude Code.

Sumber rujukan utama: `open-sse/config/contextEditing.ts` (ID strategi, suntikan badan, pengekstrakan
telemetri), `open-sse/executors/base.ts` (get suntikan + sandaran 400), dan
`open-sse/services/compression/types.ts` (bentuk konfigurasi + lalai).

## Fungsi `clear_tool_uses`

OmniRoute menyuntik satu suntingan ke dalam badan Anthropic Messages keluar:

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

- `type: "clear_tool_uses_20250919"` — ID strategi Anthropic bertarikh (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — sebaik sahaja token input permintaan melebihi ambang ini, Claude mula
  mengosongkan pasangan penggunaan/hasil alat lama (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, lalai Anthropic).
- `keep.value: 3` — N pasangan penggunaan/hasil alat paling terkini dikekalkan tanpa perubahan
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Beta tersebut diiklankan melalui pengepala `anthropic-beta: context-management-2025-06-27`, yang
sudah dikeluarkan oleh OmniRoute pada permintaan Claude.

Suntikan dilakukan oleh `applyContextEditingToBody()` dan bersifat **idempoten**: jika suntingan `clear_tool_uses`
sudah wujud dalam badan (ditambahkan oleh panggilan terdahulu atau dibekalkan oleh klien), badan tersebut
dibiarkan seperti sedia ada. Jika suntingan `clear_thinking_20251015` turut hadir, OmniRoute mengisih secara stabil
suntingan `clear_thinking` ke bahagian hadapan kerana Anthropic menghendaki `clear_thinking` mendahului
`clear_tool_uses` dalam tatasusunan `edits[]`.

## Togol pengaktifan bagi setiap kombo

Penyuntingan Konteks **dimatikan secara lalai** dan perlu dipilih untuk digunakan. Togol tersebut ialah satu nilai boolean yang dibawa dalam
konfigurasi pemampatan:

- Kunci tetapan: `contextEditing.enabled` (camelCase — **bukan** `context_editing` / `context-editing`).
- Jenis: `ContextEditingConfig { enabled: boolean }` dalam
  `open-sse/services/compression/types.ts`.
- Lalai: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Skema Zod: `contextEditingConfigSchema` dalam `src/shared/validation/compressionConfigSchemas.ts`.
- Storan: disimpan secara berterusan bersama tetapan pemampatan yang lain (dinormalkan dalam
  `src/lib/db/compression.ts`).

Dalam papan pemuka, togol tersebut terletak dalam hab pemampatan
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) dan menulis
`{ contextEditing: { enabled: … } }` kembali melalui `saveSettings()`. Oleh sebab ia disertakan dalam
objek tetapan pemampatan, ia digabungkan dengan profil pemampatan bagi setiap kombo dan bukannya menjadi
antara muka yang bebas sepenuhnya — konfigurasi hanya membawa bendera hidup/mati; semua ambang (`trigger`,
`keep`) ialah pemalar yang didokumenkan di atas.

## Penghadangan khusus Claude

Penyuntikan hanya berlaku untuk geganti Claude tulen atau yang serasi dengan Claude Code. Penghadang dalam
`open-sse/executors/base.ts` ialah:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — kunci/OAuth Anthropic sebenar.
- `isClaudeCodeCompatible(this.provider)` — geganti dengan id penyedia yang bermula dengan awalan
  `anthropic-compatible-cc-` (geganti tersebut mengiklankan keserasian Claude Code, maka ia merupakan geganti
  yang paling berkemungkinan menerima beta tersebut). Lihat `open-sse/services/provider.ts`.

Sengaja **dikecualikan**:

- `claude-web` — geganti pelayar dengan bentuk permintaan `create_conversation_params` yang tidak pernah menerima
  `context_management`.
- Geganti generik `anthropic-compatible-*` (tanpa awalan `-cc-`) — titik akhir pihak ketiga dengan
  sokongan beta yang tidak pasti.

Penyedia bukan Claude tidak pernah menerima parameter `context_management` walaupun togol dihidupkan.

## Liputan sandaran 400 / geganti

Geganti yang serasi dengan Claude mungkin mengiklankan beta tetapi masih menolak parameter `context_management`
dengan HTTP 400. Untuk menurunkan keupayaan secara beransur-ansur dan bukannya menggagalkan permintaan, pelaksana membuang
parameter tersebut dan mencuba semula URL yang sama **sekali**:

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

Tingkah laku:

1. Dicetuskan hanya pada `400` semasa penyuntingan konteks didayakan dan isi permintaan benar-benar mengandungi
   `context_management`.
2. Isi 400 dibaca melalui `clone()` supaya respons asal kekal utuh untuk laluan yang tidak sepadan.
3. Teks ralat mesti sepadan dengan `/context[_-]management|context editing/i` — 400 yang tidak berkaitan (contohnya
   `max_tokens must be >= 1`) **tidak** mencetuskan sandaran; ralat asal diteruskan.
4. Apabila terdapat padanan, ia menetapkan `contextEditingDisabled = true` (yang menghalang penyuntikan semula jika
   `transformedBody` baharu dibina kemudian untuk URL percubaan semula/sandaran), memadamkan `context_management`,
   menandatangani semula isi untuk geganti Claude / yang serasi dengan Claude Code (`signRequestBody`), dan mencuba semula
   URL yang sama sekali.

Claude tulen membawa beta dalam `ANTHROPIC_BETA_BASE` dan tidak melalui laluan sandaran ini.

## Telemetri `applied_edits`

Selepas respons Claude, OmniRoute merekodkan jumlah konteks yang sebenarnya dikosongkan oleh penyedia. Ini
**tidak** distrim — ia diekstrak daripada isi respons bukan penstriman secara usaha terbaik dan tidak pernah
mempengaruhi respons (kegagalan telemetri diabaikan).

- Pengekstrakan: `extractContextEditingTelemetry(responseBody)` dalam `open-sse/config/contextEditing.ts`.
  Ia memeriksa `applied_edits` di tiga lokasi (secara defensif terhadap bentuk respons):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Medan setiap suntingan yang dibaca daripada setiap entri: `cleared_input_tokens` dan `cleared_tool_uses`
  (snake_case, asli Anthropic), dengan sandaran camelCase `clearedInputTokens` / `clearedToolUses`.
- Mengembalikan `null` apabila tiada tatasusunan `applied_edits` ditemukan atau tiada apa-apa yang benar-benar dikosongkan.

Bentuk penerimaan ialah `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Perekodan berlaku dalam `open-sse/handlers/chatCore.ts` (dihadkan kepada `provider === "claude"`) melalui
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), yang menulis baris analitik pemampatan
yang ditandai:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = kiraan token input yang dikosongkan
- `request_id` dengan akhiran `::context-editing`

Oleh itu, pengosongan yang diwakilkan muncul dalam analitik pemampatan bersama enjin tempatan, di bawah
label enjin `context-editing`, dan boleh dibezakan daripada penjimatan RTK/Caveman/LLMLingua.

## Hubungan dengan enjin pemampatan setempat

| Aspek                    | Enjin setempat (Caveman / RTK / LLMLingua / bertindan)  | Penyuntingan Konteks Terwakil                     |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------- |
| Tempat ia dijalankan     | Dalam OmniRoute, sebelum permintaan meninggalkan proksi | Dalam penyedia (Claude), pada bahagian pelayan    |
| Kandungan yang disunting | Teks prom / konteks / hasil alat                        | Blok penggunaan alat / hasil alat yang lama       |
| Skop penyedia            | Semua penyedia                                          | `claude` + `anthropic-compatible-cc-*` sahaja     |
| Togol                    | Tetapan mod pemampatan                                  | `contextEditing.enabled`                          |
| Mod kegagalan            | Teruskan apabila gagal (teks asal)                      | Sandaran 400: buang parameter, cuba semula sekali |
| Telemetri penjimatan     | `engine: <engine id>`                                   | `engine: "context-editing"`                       |

Kedua-duanya saling melengkapi: enjin setempat memampatkan bait yang dihantar oleh OmniRoute; Penyuntingan Konteks membolehkan
Claude memangkas konteks yang sedang berjalan merentasi giliran. Kedua-duanya boleh didayakan bersama.

## Lihat Juga

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — daftar enjin dan enjin pemampatan
  setempat
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — pemampatan output perintah/alat
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — pemampatan perihalan MCP dan
  pengurangan kardinaliti alat
- Sumber: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
