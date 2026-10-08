# Providers — Claude Web (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` mengirim permintaan chat berformat OpenAI melalui sesi browser `claude.ai`
yang terautentikasi. Eksekutor menormalisasi cookie yang diberikan, menetapkan satu organisasi
yang terautentikasi, menyiapkan status percakapan, memilih transport langsung atau browser, dan
menerjemahkan respons SSE upstream secara ketat. Orkestrasi berada di
`open-sse/executors/claude-web.ts:320`.

> **Baru menggunakan penyedia Web Cookie?**
>
> Baca **`docs/getting-started/WEB-COOKIE-GUIDE.md`** untuk mengetahui proses penyiapan umum, panduan autentikasi, batasan, dan pemecahan masalah sebelum mengikuti panduan khusus penyedia ini.

### Katalog model

Registri penyedia saat ini menyediakan tepat tujuh ID model statis berikut
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID model                    | Nama tampilan           |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Penemuan model dinamis tidak diimplementasikan untuk penyedia ini. Daftar di atas merupakan
katalog runtime.

### Kredensial dan penetapan organisasi

Berikan header Cookie `claude.ai` lengkap atau nilai sesi saja. Nilai tanpa atribut lain
dinormalisasi menjadi `sessionKey`; cookie lain tetap dipertahankan jika diberikan. Eksekutor menerima
cookie melalui `cookie` atau `apiKey` dan
membaca nilai opsional `deviceId` dan `orgId` dari data koneksi
(`open-sse/executors/claude-web.ts:72`).

Jika `orgId` tidak ada, eksekutor memanggil `GET https://claude.ai/api/organizations` dan menggunakan
organisasi pertama yang dikembalikan oleh sesi Claude Web yang terautentikasi
(`open-sse/executors/claude-web.ts:141`). Eksekutor gagal secara tertutup ketika tidak ada organisasi valid yang
dikembalikan, melaporkan otorisasi sesi yang ditolak sebagai 401, dan membedakan tantangan Cloudflare
dari kegagalan autentikasi.

### Operasi percakapan

Objek tingkat atas opsional `claude_web` bersifat ketat. Bidang yang tidak dikenal akan ditolak. Bidang
yang diterima didefinisikan di `open-sse/executors/claude-web/session.ts:50`:

| Bidang                | Arti                                                                       |
| --------------------- | -------------------------------------------------------------------------- |
| `operation`           | `completion` secara default; gunakan `retry` untuk giliran percobaan ulang |
| `conversation_id`     | UUID eksplisit untuk percakapan yang sudah ada                             |
| `parent_message_uuid` | UUID eksplisit untuk pesan asisten induk                                   |
| `timezone`            | Nama zona waktu IANA yang valid                                            |
| `locale`              | Lokal yang valid secara struktural                                         |
| `tool_states`         | Array status alat akun opsional, dibatasi hingga 128 entri                 |

Permintaan yang telah disiapkan menggunakan salah satu dari dua endpoint upstream
(`open-sse/executors/claude-web.ts:203`):

- Giliran baru atau lanjutan dikirim ke
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Percobaan ulang dikirim ke
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Giliran baru menyertakan `create_conversation_params`. Tindak lanjut yang di-cache atau ditautkan secara eksplisit
menyertakan `parent_message_uuid` dan tidak menyertakan `create_conversation_params`. Percobaan ulang memerlukan status
percakapan dan pesan induk serta tidak mengirim prompt
(`open-sse/executors/claude-web/session.ts:254`). Percakapan baru membuka UI yang terautentikasi
di `/new`; tindak lanjut yang di-cache atau ditautkan secara eksplisit membuka halaman percakapan yang tepat
(`open-sse/executors/claude-web/session.ts:324`).

Status percakapan merupakan cache dalam memori yang diberi kunci berdasarkan cakupan akun SHA-256 dan transkrip
kanonis pemanggil. Entri kedaluwarsa setelah 30 menit dan cache dibatasi hingga 5.000 entri
(`open-sse/executors/claude-web/session.ts:12`). Status hanya disimpan setelah pengurai
stream ketat mengamati `message_stop`; proses yang dimulai ulang akan membuangnya. Jika cache tidak ditemukan,
permintaan multi-pesan diserialisasi menjadi satu prompt pemulihan alih-alih secara diam-diam menghapus
pesan sebelumnya.

Lokal dan zona waktu menggunakan urutan prioritas berikut: nilai `claude_web` permintaan, nilai koneksi,
nilai runtime, lalu `en-US` untuk lokal atau `UTC` untuk zona waktu
(`open-sse/executors/claude-web/session.ts:218`).

### Alat dan payload permintaan

Permintaan langsung hanya mentransformasi alat fungsi OpenAI yang valid secara struktural dan diberikan oleh
pemanggil. Tidak ada daftar alat default statis yang dibuat-buat
(`open-sse/executors/claude-web/payload.ts:102`).

Sebaliknya, permintaan browser menangkap permintaan UI yang terautentikasi dan mempertahankan alat akun,
status alat, serta gaya yang dipersonalisasi. Bidang percakapan, model, penalaran, prompt, dan
UUID pesan yang telah disiapkan tetap menimpa permintaan yang ditangkap
(`open-sse/executors/claude-web/browserTransport.ts:175`). Templat browser dicakup berdasarkan
hash akun, organisasi, cookie, lokal, dan zona waktu serta kedaluwarsa setelah 30 menit
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Ketika permintaan langsung tidak memiliki alat dari pemanggil,
permintaan tersebut dapat menggunakan kembali templat yang dicakup itu; alat eksplisit dari pemanggil diprioritaskan
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Pemilihan transport

Jalur default adalah `sendClaudeWebDirect()`, yang memanggil `tlsFetchClaude()` dengan profil
Chrome 146 yang dikonfigurasi dan cookie yang diberikan (`open-sse/services/claudeTlsClient.ts:23`). Jalur ini
tidak meluncurkan pemecah tantangan atau membuat cookie pengganti.

Atur `WEB_COOKIE_USE_BROWSER` ke `1`, `true`, atau `on` untuk menjadikan adapter browser
dengan cakupan akun sebagai transport utama. Atur `OMNIROUTE_BROWSER_POOL` ke salah satu nilai
yang sama agar tantangan Cloudflare 403 yang dikenali dapat beralih dari transport langsung ke
adapter browser (`open-sse/executors/claude-web.ts:195`). Kegagalan HTTP lainnya tidak memicu
peralihan tersebut.

Adapter browser menyimpan cookie di dalam konteks Playwright gabungan yang sama, menggunakan
kunci hash dengan cakupan yang dijelaskan di atas, dan mengirimkan penyelesaian dari konteks
tersebut (`open-sse/executors/claude-web/browserTransport.ts:444`). Adapter ini tidak pernah
mengekspor cookie yang diperoleh melalui browser ke klien TLS langsung. Percobaan ulang browser
memerlukan templat UI yang belum kedaluwarsa dan terikat ke konteks Playwright aktual yang sama
(`open-sse/executors/claude-web/browserTransport.ts:467`). Pembacaan respons browser dijalankan
secara bertahap di halaman yang telah diautentikasi, mematuhi pembatalan permintaan, dan
membatalkan isi upstream segera setelah ukurannya melebihi 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Eksekutor mengembalikan proyeksi audit yang telah disamarkan ke pencatat permintaan bersama:
UUID organisasi, percakapan, dan pesan, teks prompt, definisi alat, cookie, serta pengenal
perangkat dikecualikan (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Pengecualian transport juga mengembalikan galat koneksi
generik, bukan pesan yang dilemparkan.

### Perilaku SSE

`createClaudeWebResponse()` menangani pembingkaian LF atau CRLF dan bidang `data:` multibaris.
Fungsi ini memetakan delta teks ke `content`, delta pemikiran ke `reasoning_content`, dan
peristiwa metadata yang dikenal ke ekstensi respons `claude_web`. Setiap peristiwa metadata
diproyeksikan melalui daftar izin bidangnya sendiri
(`open-sse/executors/claude-web/stream.ts:37`). Metadata percakapan, pesan induk, pesan asisten,
dan operasi juga dikembalikan dalam header `X-OmniRoute-Claude-Web-*`
(`open-sse/executors/claude-web/stream.ts:364`).

Parser berhenti secara aman ketika menemukan JSON yang rusak, peristiwa `error` upstream, jenis
peristiwa yang tidak dikenal, urutan yang tidak valid, ketidakcocokan blok konten, atau EOF
sebelum `message_stop`. Keluaran streaming memancarkan satu potongan penyelesaian dan satu
`[DONE]`; keluaran yang disangga menggunakan parser yang sama. Parser langsung memperlakukan
`message_stop` sebagai terminal, membatalkan data upstream yang masih tersisa, dan meneruskan
pembatalan downstream ke pembaca upstream (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Baris SSE yang tidak diakhiri dan peristiwa yang
terakumulasi dibatasi hingga 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Berkas

| Berkas                                                   | Tujuan                              |
| -------------------------------------------------------- | ----------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registri model penyedia statis      |
| `open-sse/executors/claude-web.ts`                       | Orkestrasi eksekutor                |
| `open-sse/executors/claude-web/payload.ts`               | Transformasi payload dan alat       |
| `open-sse/executors/claude-web/session.ts`               | Status giliran dan cache transkrip  |
| `open-sse/executors/claude-web/transport.ts`             | Adapter transport langsung          |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adapter browser dengan cakupan akun |
| `open-sse/executors/claude-web/stream.ts`                | Penerjemahan SSE yang ketat         |
| `open-sse/services/claudeTlsClient.ts`                   | Transport TLS native                |
| `open-sse/services/browserPool.ts`                       | Konteks Playwright gabungan         |

### Pengujian

Jalankan rangkaian pengujian Claude Web deterministik tanpa kredensial nyata:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Kasus yang bergantung pada Playwright dalam `tests/unit/claude-web-auto-refresh.test.ts` secara
eksplisit dilewati. Repositori ini saat ini tidak mendefinisikan skrip pengujian langsung
Claude Web dengan kredensial, sehingga kasus yang dilewati tersebut bukan bukti runtime.

### Penyiapan

1. Jalankan OmniRoute dengan `npm run dev` atau instalasi yang telah dibangun.
2. Buka Dasbor → Penyedia → Tambahkan Penyedia.
3. Pilih kategori Cookie Web dan Claude Web.
4. Tempelkan header Cookie lengkap yang disalin dari permintaan `claude.ai` yang telah diautentikasi.
