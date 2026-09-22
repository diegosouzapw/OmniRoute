# Cursor Provider in Docker Environments (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Apabila OmniRoute berjalan di dalam Docker, aliran legasi **Import daripada Cursor IDE** /
`cursor-agent` gagal kerana bekas tidak dapat melihat pemasangan Cursor pada hos.
Sebaliknya, gunakan **Log masuk dengan Cursor** (PKCE deep-control).

## Mengapa Import IDE / CLI Gagal dalam Docker

1. **Pengasingan sistem fail** — Import automatik mencari laluan Linux seperti
   `~/.config/Cursor/User/globalStorage/state.vscdb` _di dalam_ bekas.
   Pada Docker Desktop untuk macOS, pangkalan data IDE hos tidak dilekapkan secara lalai, dan
   OS bekas ialah Linux walaupun hos ialah Darwin.
2. **Tiada perduaan `cursor-agent`** — Imej rasmi OmniRoute tidak menyertakan
   `cursor-agent`. Sebelum ini, Model Tersedia menjalankan
   `cursor-agent --list-models` melalui shell dan menggunakan katalog statik sebagai pilihan sandaran.
3. **Perduaan yang salah** — **Jangan** lekap-ikat `cursor-agent` macOS ke dalam bekas
   Linux. Ia tidak akan dapat dilaksanakan.

## Disyorkan: Log masuk dengan Cursor

1. Buka **Papan Pemuka → Penyedia → Cursor**.
2. Pilih tab **Log masuk dengan Cursor**.
3. Klik **Log masuk dengan Cursor** — OmniRoute membuka
   `https://cursor.com/loginDeepControl?…` dalam pelayar **hos** anda.
4. Luluskan log masuk dalam pelayar, kemudian kembali ke papan pemuka. OmniRoute
   meninjau `api2.cursor.sh/auth/poll` sehingga token diterima.
5. OmniRoute menyimpan token **akses + segar semula** dan menyegarkannya melalui
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Laluan ini tidak memerlukan Cursor IDE atau `cursor-agent` di dalam bekas.

## Penemuan model

Dengan sambungan yang telah dilog masuk, **Model Tersedia / Segerak Automatik** mengutamakan
katalog HTTP `AiService/AvailableModels` Cursor menggunakan token pembawa sambungan.
Jika itu gagal, OmniRoute masih mencuba `cursor-agent` hos (apabila tersedia), kemudian
benih pendaftaran statik.

OmniRoute sentiasa mendedahkan **`auto`** dalam katalog (paparan “Auto”), serta
mod penghala gaya OpenCodex **`auto-cost`**, **`auto-balance`**, dan
**`auto-intelligence`**. Pada talian, ini dipetakan kepada model `default` Cursor
(dengan `optimization` ModelParameter untuk ketiga-tiga varian). Utamakan
`cu/auto` apabila penggunaan model premium telah habis — Auto selalunya masih mempunyai bajet.

### Katalog langsung adalah eksklusif apabila disegerakkan

Selepas penyegerakan model Cursor berjaya (`cursor-agent --list-models` → katalog
disegerakkan yang berterusan, atau pengambilan `AvailableModels` dengan pengesahan pembawa
di atas), **papan pemuka**, **`/v1/models`**, dan senarai **Uji Semua** memaparkan:

1. Model yang dikembalikan oleh penyegerakan langsung
2. ID penghala automatik yang disuntik: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Model **tersuai** pengendali (Import / manual) — tidak pernah dipangkas oleh penyegerakan

Pendaftaran statik besar di bawah
`open-sse/config/providers/registry/cursor/` adalah **sandaran luar talian sahaja**. Apabila
hasil penyegerakan kosong (atau penemuan gagal), penyenaraian kembali menggunakan pendaftaran tersebut.

ID dengan akhiran tahap usaha (contohnya `claude-4.6-sonnet-high`) masih boleh
**diminta** semasa masa jalan: `resolveRequestedModel` membuang akhiran tersebut menjadi
`ModelParameter` talian. Penyenaraian eksklusif sengaja menyembunyikan varian statik tersebut
daripada Uji Semua supaya siasatan sepadan dengan perkara yang sebenarnya dikembalikan sebagai tersedia oleh Cursor.

### Pembantu

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — penggabungan papan pemuka
- `ensureCursorAutoCatalogEntry` — suntikan auto* semasa penemuan + penyenaraian
- `shouldSuppressStaticModelForExclusiveListing` — gelung statik `/v1/models`

## Had Penyedia (kuota)

**Penggunaan → Had Penyedia** untuk Cursor menggunakan API Pembawa pada `api2.cursor.sh`
(`GetCurrentPeriodUsage` → ringkasan penggunaan → auth/usage) selepas PKCE atau import
token. Laluan papan pemuka kuki/`cursor.com` legasi kekal sebagai pilihan sandaran terakhir
untuk sesi lama yang diimport daripada IDE.

Tetingkap biasanya merangkumi **Jumlah**, **Auto + Composer**, dan **API**. Jika
had kelihatan kosong, jalankan semula **Log masuk dengan Cursor** atau import semula token (import IDE
sahaja tidak lagi diperlukan).

## Giliran kosong / penggunaan habis

Apabila Cursor menerima Run tetapi tidak mengembalikan teks pembantu (lazim apabila penggunaan
premium telah habis), OmniRoute memaparkan **429** yang boleh diambil tindakan (petunjuk kuota) atau
**502** dengan panduan — bukannya sekadar “Penyedia mengembalikan kandungan kosong”. Kegagalan
penstriman seperti `not_found: AI Model Not Found` (tetingkap penggunaan telah habis)
dikelaskan sebagai **had kadar / penggunaan Cursor terlampaui** dan mengekalkan mesej tersebut
melalui saluran paip SSE (pengawal strim kosong yang dikongsi tidak menulis ganti ralat
yang telah dipancarkan). Semak Had Penyedia, cuba model **`auto`**, atau tingkatkan
had pelan Cursor.

## Versi klien (tanpa antaramuka)

Tanpa pemasangan `cursor-agent` setempat, OmniRoute menentukan
`x-cursor-client-version` melalui env `CURSOR_AGENT_CLI_VERSION`, kemudian kikisan skrip
pemasang Cursor yang dicache pada cakera, diikuti ID binaan yang disematkan. Atasi dengan
`CURSOR_AGENT_CLI_VERSION` apabila diperlukan.

## Sandaran: Import Token Manual

Jika anda tidak dapat melengkapkan log masuk melalui pelayar:

1. Pada hos, ekstrak token daripada `state.vscdb` Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Buka **Import token** dalam dialog pengesahan Cursor.
3. Tampalkan **Token Akses** dan, apabila tersedia, **Token Segar Semula** (diperlukan untuk
   penyegaran automatik). ID Mesin adalah pilihan.

Import token akses sahaja masih berfungsi tetapi akan tamat tempoh tanpa token segar semula —
import semula apabila sembang mengembalikan ralat pengesahan.

## Berkaitan

- Panduan Docker Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Rujukan log masuk Cursor OpenCodex (luaran):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
