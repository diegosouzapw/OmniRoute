# Providers — Claude Web (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` menghantar permintaan sembang berformat OpenAI melalui sesi pelayar `claude.ai`
yang telah disahkan. Pelaksana menormalkan kuki yang diberikan, menentukan satu organisasi
yang telah disahkan, menyediakan keadaan perbualan, memilih pengangkutan langsung atau pelayar,
dan menterjemahkan respons SSE huluan secara ketat. Orkestrasi terdapat dalam
`open-sse/executors/claude-web.ts:320`.

> **Baharu menggunakan penyedia Kuki Web?**
>
> Baca **`docs/getting-started/WEB-COOKIE-GUIDE.md`** untuk proses persediaan umum, panduan pengesahan, batasan dan penyelesaian masalah sebelum mengikuti panduan khusus penyedia ini.

### Katalog model

Daftar penyedia pada masa ini mendedahkan tepat tujuh ID model statik ini
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID model                    | Nama paparan            |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Penemuan model dinamik tidak dilaksanakan untuk penyedia ini. Senarai di atas ialah
katalog masa jalan.

### Kelayakan dan penentuan organisasi

Berikan sama ada pengepala Cookie `claude.ai` penuh atau nilai sesi sahaja. Nilai sahaja akan
dinormalkan kepada `sessionKey`; kuki lain dikekalkan jika diberikan. Pelaksana menerima
kuki melalui `cookie` atau `apiKey` dan
membaca nilai `deviceId` serta `orgId` pilihan daripada data sambungan
(`open-sse/executors/claude-web.ts:72`).

Jika `orgId` tiada, pelaksana memanggil `GET https://claude.ai/api/organizations` dan menggunakan
organisasi pertama yang dikembalikan oleh sesi Claude Web yang telah disahkan
(`open-sse/executors/claude-web.ts:141`). Ia gagal secara tertutup apabila tiada organisasi sah
dikembalikan, melaporkan penolakan kebenaran sesi sebagai 401, dan membezakan cabaran Cloudflare
daripada kegagalan pengesahan.

### Operasi perbualan

Objek `claude_web` peringkat teratas yang bersifat pilihan adalah ketat. Medan yang tidak
diketahui akan ditolak. Medan yang diterima ditakrifkan dalam `open-sse/executors/claude-web/session.ts:50`:

| Medan                 | Maksud                                                                    |
| --------------------- | ------------------------------------------------------------------------- |
| `operation`           | `completion` secara lalai; gunakan `retry` untuk giliran percubaan semula |
| `conversation_id`     | UUID eksplisit untuk perbualan sedia ada                                  |
| `parent_message_uuid` | UUID eksplisit untuk mesej pembantu induk                                 |
| `timezone`            | Nama zon waktu IANA yang sah                                              |
| `locale`              | Tempatan yang sah dari segi struktur                                      |
| `tool_states`         | Tatasusunan keadaan alat akaun pilihan, terhad kepada 128 entri           |

Permintaan yang disediakan menggunakan salah satu daripada dua titik akhir huluan
(`open-sse/executors/claude-web.ts:203`):

- Giliran baharu atau susulan menghantar kepada
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Percubaan semula menghantar kepada
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Giliran baharu menyertakan `create_conversation_params`. Susulan yang dicache atau dipautkan
secara eksplisit menyertakan `parent_message_uuid` dan tidak menyertakan
`create_conversation_params`. Percubaan semula memerlukan kedua-dua keadaan perbualan dan
mesej induk serta tidak menghantar sebarang gesaan
(`open-sse/executors/claude-web/session.ts:254`). Perbualan baharu membuka UI yang telah disahkan
pada `/new`; susulan yang dicache atau dipautkan secara eksplisit membuka halaman perbualan
yang tepat (`open-sse/executors/claude-web/session.ts:324`).

Keadaan perbualan ialah cache dalam memori yang dikunci berdasarkan skop akaun SHA-256 dan
transkrip pemanggil kanonik. Entri luput selepas 30 minit dan cache dihadkan kepada 5,000 entri
(`open-sse/executors/claude-web/session.ts:12`). Keadaan hanya dikomit selepas penghurai strim
yang ketat mengesan `message_stop`; proses yang dimulakan semula akan membuangnya. Apabila
cache tidak ditemui, permintaan berbilang mesej disirikan menjadi satu gesaan pemulihan dan
bukannya menggugurkan mesej terdahulu secara senyap.

Tempatan dan zon waktu menggunakan keutamaan berikut: nilai `claude_web` permintaan, nilai
sambungan, nilai masa jalan, kemudian `en-US` untuk tempatan atau `UTC` untuk zon waktu
(`open-sse/executors/claude-web/session.ts:218`).

### Alat dan muatan permintaan

Permintaan langsung hanya mengubah alat fungsi OpenAI yang sah dari segi struktur dan
dibekalkan oleh pemanggil. Tiada senarai alat lalai statik yang direka-reka
(`open-sse/executors/claude-web/payload.ts:102`).

Sebaliknya, permintaan pelayar menangkap permintaan UI yang telah disahkan dan mengekalkan
alat akaun, keadaan alat serta gaya diperibadikannya. Medan perbualan, model, penaakulan,
gesaan dan UUID mesej yang disediakan masih mengatasi permintaan yang ditangkap
(`open-sse/executors/claude-web/browserTransport.ts:175`). Templat pelayar diskopkan berdasarkan
cincangan akaun, organisasi, kuki, tempatan dan zon waktu serta luput selepas 30 minit
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Apabila permintaan langsung tidak
mempunyai alat pemanggil, ia boleh menggunakan semula templat berskop tersebut; alat pemanggil
eksplisit diberi keutamaan
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Pemilihan pengangkutan

Laluan lalai ialah `sendClaudeWebDirect()`, yang memanggil `tlsFetchClaude()` dengan profil
Chrome 146 yang dikonfigurasikan dan kuki yang diberikan (`open-sse/services/claudeTlsClient.ts:23`).
Ia tidak melancarkan penyelesai atau menghasilkan kuki gantian.

Tetapkan `WEB_COOKIE_USE_BROWSER` kepada `1`, `true`, atau `on` untuk menjadikan penyesuai
pelayar berskop akaun sebagai pengangkutan utama. Tetapkan `OMNIROUTE_BROWSER_POOL` kepada salah
satu nilai yang sama untuk membolehkan cabaran Cloudflare 403 yang dikenal pasti beralih daripada
pengangkutan langsung kepada penyesuai pelayar (`open-sse/executors/claude-web.ts:195`). Kegagalan
HTTP lain tidak mencetuskan peralihan tersebut.

Penyesuai pelayar menyimpan kuki dalam konteks Playwright terkumpul yang sama, menggunakan kunci
cincang berskop yang diterangkan di atas, dan menghantar pelengkapan daripada konteks tersebut
(`open-sse/executors/claude-web/browserTransport.ts:444`). Ia tidak pernah mengeksport kuki yang
diselesaikan oleh pelayar ke dalam klien TLS langsung. Percubaan semula pelayar memerlukan templat
UI yang belum tamat tempoh dan terikat pada konteks Playwright sebenar yang sama
(`open-sse/executors/claude-web/browserTransport.ts:467`). Pembacaan respons pelayar dijalankan
secara bertokok dalam halaman yang disahkan, mematuhi pembatalan permintaan, dan membatalkan isi
huluan sebaik sahaja saiznya melebihi 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Pelaksana mengembalikan unjuran audit yang telah disunting kepada pengelog permintaan kongsi:
UUID organisasi, perbualan dan mesej, teks gesaan, takrif alat, kuki, serta pengecam peranti
dikecualikan (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Pengecualian pengangkutan juga mengembalikan ralat
sambungan generik dan bukannya mesej yang dilemparkan.

### Tingkah laku SSE

`createClaudeWebResponse()` mengendalikan pembingkaian LF atau CRLF dan medan `data:` berbilang
baris. Ia memetakan delta teks kepada `content`, delta pemikiran kepada `reasoning_content`, dan
peristiwa metadata yang diketahui kepada sambungan respons `claude_web`. Setiap peristiwa metadata
diunjurkan melalui senarai medan dibenarkannya sendiri (`open-sse/executors/claude-web/stream.ts:37`).
Metadata perbualan, mesej induk, mesej pembantu, dan operasi turut dikembalikan dalam pengepala
`X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Penghurai gagal secara tertutup apabila terdapat JSON yang cacat, peristiwa `error` huluan, jenis
peristiwa yang tidak diketahui, susunan tidak sah, ketidakpadanan blok kandungan, atau EOF sebelum
`message_stop`. Output penstriman memancarkan satu cebisan penamat dan satu `[DONE]`; output
berpenimbal menggunakan penghurai yang sama. Penghurai menganggap `message_stop` sebagai penamat
serta-merta, membatalkan data huluan yang menyusul, dan menyebarkan pembatalan hiliran kepada
pembaca huluan (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Baris SSE yang tidak ditamatkan dan peristiwa
terkumpul dihadkan kepada 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Fail

| Fail                                                     | Tujuan                              |
| -------------------------------------------------------- | ----------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Daftar model penyedia statik        |
| `open-sse/executors/claude-web.ts`                       | Orkestrasi pelaksana                |
| `open-sse/executors/claude-web/payload.ts`               | Transformasi muatan dan alat        |
| `open-sse/executors/claude-web/session.ts`               | Keadaan giliran dan cache transkrip |
| `open-sse/executors/claude-web/transport.ts`             | Penyesuai pengangkutan langsung     |
| `open-sse/executors/claude-web/browserTransport.ts`      | Penyesuai pelayar berskop akaun     |
| `open-sse/executors/claude-web/stream.ts`                | Terjemahan SSE yang ketat           |
| `open-sse/services/claudeTlsClient.ts`                   | Pengangkutan TLS natif              |
| `open-sse/services/browserPool.ts`                       | Konteks Playwright terkumpul        |

### Pengujian

Jalankan suit Claude Web deterministik tanpa kelayakan sebenar:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Kes yang bergantung pada Playwright dalam `tests/unit/claude-web-auto-refresh.test.ts` dilangkau
secara jelas. Repositori ini tidak mentakrifkan skrip ujian langsung Claude Web berkelayakan pada
masa ini, maka kes yang dilangkau tersebut bukan bukti masa jalan.

### Persediaan

1. Mulakan OmniRoute dengan `npm run dev` atau pemasangan yang telah dibina.
2. Buka Dashboard → Providers → Add Provider.
3. Pilih kategori Web Cookie dan Claude Web.
4. Tampalkan pengepala Cookie lengkap yang disalin daripada permintaan `claude.ai` yang telah disahkan.
