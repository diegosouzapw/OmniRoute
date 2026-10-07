# Cursor Provider in Docker Environments (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Saat OmniRoute berjalan di dalam Docker, alur lama **Impor dari Cursor IDE** /
`cursor-agent` gagal karena container tidak dapat melihat instalasi Cursor di
host. Gunakan **Masuk dengan Cursor** (PKCE deep-control) sebagai gantinya.

## Mengapa Impor IDE / CLI Gagal di Docker

1. **Isolasi sistem berkas** — Impor otomatis mencari path Linux seperti
   `~/.config/Cursor/User/globalStorage/state.vscdb` _di dalam_ container.
   Pada Docker Desktop untuk macOS, DB IDE host tidak dipasang secara default,
   dan OS container adalah Linux meskipun host menggunakan Darwin.
2. **Tidak ada binary `cursor-agent`** — Image OmniRoute resmi tidak menyertakan
   `cursor-agent`. Sebelumnya, Model yang Tersedia menjalankan
   `cursor-agent --list-models` melalui shell dan beralih ke katalog statis jika gagal.
3. **Binary yang salah** — **Jangan** melakukan bind mount `cursor-agent` macOS
   ke dalam container Linux. Binary tersebut tidak akan dapat dieksekusi.

## Direkomendasikan: Masuk dengan Cursor

1. Buka **Dasbor → Penyedia → Cursor**.
2. Pilih tab **Masuk dengan Cursor**.
3. Klik **Masuk dengan Cursor** — OmniRoute membuka
   `https://cursor.com/loginDeepControl?…` di browser **host** Anda.
4. Setujui proses masuk di browser, lalu kembali ke dasbor. OmniRoute
   melakukan polling pada `api2.cursor.sh/auth/poll` hingga token diterima.
5. OmniRoute menyimpan token **akses + penyegaran** dan menyegarkannya melalui
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Jalur ini tidak memerlukan Cursor IDE atau `cursor-agent` di dalam container.

## Penemuan model

Dengan koneksi yang sudah masuk, **Model yang Tersedia / Sinkronisasi Otomatis**
mengutamakan katalog HTTP `AiService/AvailableModels` milik Cursor menggunakan
token bearer koneksi. Jika gagal, OmniRoute tetap mencoba `cursor-agent` host
(jika tersedia), lalu seed registri statis.

OmniRoute selalu menyediakan **`auto`** dalam katalog (tampilan “Otomatis”),
serta mode router bergaya OpenCodex **`auto-cost`**, **`auto-balance`**, dan
**`auto-intelligence`**. Saat dikirim, mode-mode ini dipetakan ke model
`default` milik Cursor (dengan `optimization` ModelParameter untuk ketiga
varian tersebut). Utamakan `cu/auto` saat penggunaan model premium sudah habis
— Otomatis sering kali masih memiliki anggaran.

### Katalog langsung bersifat eksklusif setelah disinkronkan

Setelah sinkronisasi model Cursor berhasil (`cursor-agent --list-models` →
katalog tersinkronisasi yang dipertahankan, atau pengambilan `AvailableModels`
terautentikasi bearer di atas), **dasbor**, **`/v1/models`**, dan daftar
**Uji Semua** menampilkan:

1. Model yang dikembalikan oleh sinkronisasi langsung
2. ID auto-router yang disisipkan: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Model **khusus** operator (Impor / manual) — tidak pernah dihapus oleh sinkronisasi

Registri statis besar di bawah
`open-sse/config/providers/registry/cursor/` **hanya merupakan fallback
offline**. Ketika data tersinkronisasi kosong (atau penemuan gagal), daftar
beralih ke registri tersebut.

ID dengan sufiks upaya (misalnya `claude-4.6-sonnet-high`) masih dapat
**diminta** saat runtime: `resolveRequestedModel` menghapus sufiks tersebut dan
mengubahnya menjadi `ModelParameter` yang dikirim. Daftar eksklusif sengaja
menyembunyikan varian statis tersebut dari Uji Semua agar pemeriksaan sesuai
dengan apa yang benar-benar dikembalikan Cursor sebagai tersedia.

### Helper

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — penggabungan dasbor
- `ensureCursorAutoCatalogEntry` — penyisipan auto* saat penemuan + pembuatan daftar
- `shouldSuppressStaticModelForExclusiveListing` — loop statis `/v1/models`

## Batas Penyedia (kuota)

**Penggunaan → Batas Penyedia** untuk Cursor menggunakan API Bearer di
`api2.cursor.sh` (`GetCurrentPeriodUsage` → ringkasan penggunaan → auth/usage)
setelah PKCE atau impor token. Jalur dasbor cookie/`cursor.com` lama tetap
menjadi fallback terakhir untuk sesi lama yang diimpor dari IDE.

Jendela biasanya mencakup **Total**, **Otomatis + Composer**, dan **API**. Jika
batas tampak kosong, jalankan ulang **Masuk dengan Cursor** atau impor ulang
token (impor IDE saja tidak lagi diperlukan).

## Respons kosong / penggunaan habis

Ketika Cursor menerima sebuah Run tetapi tidak mengembalikan teks asisten
(umum terjadi ketika penggunaan premium habis), OmniRoute menampilkan **429**
yang dapat ditindaklanjuti (petunjuk kuota) atau **502** beserta panduan —
bukan sekadar “Penyedia mengembalikan konten kosong”. Kegagalan streaming
seperti `not_found: AI Model Not Found` (jendela penggunaan habis)
diklasifikasikan sebagai **batas laju Cursor / penggunaan terlampaui** dan
mempertahankan pesan tersebut melalui pipeline SSE (pelindung stream kosong
bersama tidak menimpa galat yang telah dipancarkan). Periksa Batas Penyedia,
coba model **`auto`**, atau naikkan batas paket Cursor.

## Versi klien (headless)

Tanpa instalasi `cursor-agent` lokal, OmniRoute menentukan
`x-cursor-client-version` melalui env `CURSOR_AGENT_CLI_VERSION`, kemudian
scrape skrip penginstal Cursor yang di-cache pada disk, lalu build id yang
disematkan. Timpa dengan `CURSOR_AGENT_CLI_VERSION` bila diperlukan.

## Fallback: Impor Token Manual

Jika Anda tidak dapat menyelesaikan proses masuk melalui browser:

1. Di host, ekstrak token dari `state.vscdb` milik Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Buka **Impor token** di modal autentikasi Cursor.
3. Tempelkan **Token Akses** dan, jika tersedia, **Token Penyegaran** (diperlukan
   untuk penyegaran otomatis). ID Mesin bersifat opsional.

Impor yang hanya berisi token akses tetap berfungsi, tetapi akan kedaluwarsa
tanpa token penyegaran — impor ulang ketika chat mengembalikan galat autentikasi.

## Terkait

- Panduan Docker Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referensi login Cursor OpenCodex (eksternal):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
