# Public Credentials Handling (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Sumber rujukan utama:** `open-sse/utils/publicCreds.ts`
> **Ujian:** `tests/unit/publicCreds.test.ts`
> **Kemas kini terakhir:** 2026-08-07 — v3.8.50
> **Khalayak:** Jurutera yang mengintegrasikan penyedia yang menyertakan OAuth client_id / client_secret / Firebase Web API keys awam dalam CLI awam mereka.
> **Status:** **WAJIB** untuk semua kod baharu yang membenamkan pengecam huluan.

## Mengapa ini wujud

- [OAuth 2.0 untuk aplikasi natif (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret untuk aplikasi yang dipasang adalah awam; PKCE menyediakan keselamatan sebenar.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Pengecam klien Web adalah awam mengikut reka bentuk.

OmniRoute mesti membenamkan nilai-nilai ini supaya pengguna yang tidak mengkonfigurasi `.env` masih mendapat aliran OAuth yang berfungsi serta-merta. Tanpa sandaran terbina dalam, penyedia Gemini / Antigravity tidak lagi berfungsi untuk mana-mana pengguna yang mengikuti laluan "hanya klon dan jalankan".

Walau bagaimanapun, nilai literal seperti `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` dipadankan oleh **GitHub Secret Scanning**, **Semgrep**, dan pengimbas corak yang serupa. Setiap keluaran menghasilkan aliran positif palsu yang mengganggu, perlindungan push menyekat komit yang sah, dan pengendali tidak lagi mempercayai suapan amaran.

Pembantu `open-sse/utils/publicCreds.ts` menyelesaikan kedua-dua kekangan serentak:

- Membenamkan pengecam awam sebagai **jujukan bait bertopeng XOR** (tiada corak pengimbas dalam sumber).
- Menyahkod semasa masa jalan melalui `decodePublicCred` / `resolvePublicCred`.
- Mengesan nilai mentah yang sudah mengikuti awalan terkenal (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) dan meneruskannya tanpa perubahan, supaya pengguna dengan nilai mentah dalam `.env` sedia ada mereka terus dapat menggunakannya dengan **sifar migrasi**.

Ini ialah **pengaburan, bukan penyulitan.** Sesiapa yang membaca sumber boleh mendapatkan semula nilainya — dan itu tidak mengapa kerana nilai tersebut sememangnya awam mengikut reka bentuk. Satu-satunya matlamat adalah untuk mengelakkan padanan regex pengimbas.

## Corak wajib

### 1. Menambahkan kelayakan awam baharu

Apabila anda perlu membenamkan nilai baharu yang disediakan oleh pihak huluan yang:

- berasal daripada CLI awam / aplikasi desktop / himpunan pelayar, **dan**
- didokumenkan (atau dianggap) oleh penyedia huluan sebagai pengecam klien awam, **dan**
- akan dipadankan oleh pengimbas corak (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, dan sebagainya),

…ikuti senarai semak ini:

1. Jana jujukan bait bertopeng:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Tambahkan entri baharu pada `EMBEDDED_DEFAULTS` dalam `open-sse/utils/publicCreds.ts` dengan **nama kunci neutral** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, dan sebagainya). **Jangan** gunakan nama seperti `client_secret` atau `api_key` dalam pembantu — perkataan tersebut mencetuskan peraturan generic-secret Semgrep.

3. Tambahkan `keyof typeof EMBEDDED_DEFAULTS` pada kesatuan jenis awam (ia disimpulkan secara automatik).

4. Dalam kod pengguna, gantikan literal berkod keras dengan:

   ```ts
   // satu penggantian env
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // berbilang alias env (nilai pertama yang tidak kosong akan digunakan)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // tiada penggantian env (sentiasa gunakan lalai terbina dalam)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Alih keluar literal daripada `.env.example` (gantikan dengan dokumentasi komen sahaja yang mengarahkan pembaca ke sini):

   ```dotenv
   # ── Penyedia (Google / Firebase / dan sebagainya) ──
   # Kelayakan OAuth awam dibenamkan dalam kod melalui
   # open-sse/utils/publicCreds.ts. Tetapkan pemboleh ubah ini hanya untuk menggunakan kelayakan anda sendiri.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Kemas kini `tests/unit/publicCreds.test.ts` untuk menambahkan penegasan bentuk bagi kunci baharu (sahkan format, bukan nilai literal — lihat ujian sedia ada untuk coraknya).

7. **Jangan sekali-kali** tambahkan literal `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` pada fail ujian. Gunakan pemalar `FAKE_*` yang dibina daripada serpihan `.join("")` (lihat ujian sedia ada).

### 2. Pengguna

- **Baca daripada `resolvePublicCred()` / `resolvePublicCredMulti()` sahaja** — jangan sekali-kali panggil `decodePublicCredBytes()` secara langsung di luar pembantu.
- Pembantu ini sengaja dibuat ringan (XOR bait linear) dan selamat untuk dipanggil semasa pemuatan modul; nilai lalai dikira sekali sahaja.
- Penggantian env sentiasa diutamakan. Jika pengguna menetapkan `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pembantu akan meneruskan nilai mentah tersebut secara langsung.

### 3. Corak yang dilarang

❌ **Jangan sekali-kali** lakukan mana-mana perkara berikut dalam kod pengeluaran (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// BURUK: nilai literal mencetuskan Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// BURUK: base64 bagi literal — GitHub masih mengesannya sejak Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// BURUK: penggabungan rentetan yang memasang semula corak semasa masa jalan
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// BURUK: pengekodan hex/ROT13 — pengaburan berbeza, risiko pengesanan yang sama
clientSecret: hexDecode("474f4353..."),
```

Semua ini akhirnya mencetuskan pengimbas. Gunakan `resolvePublicCred()`.

❌ **Jangan sekali-kali** tambahkan kelayakan literal pada `.env.example`. Pengguna yang memerlukan nilai huluan sebenar boleh mengekstraknya sendiri daripada CLI awam, atau menggunakan pendaftaran OAuth mereka sendiri.

❌ **Jangan sekali-kali** abaikan amaran pengimbasan rahsia baharu tanpa terlebih dahulu menyemak sama ada kelayakan tersebut sepatutnya dipindahkan ke pembantu ini.

## Kawalan berkaitan

- `RAW_VALUE_PATTERN` dalam `publicCreds.ts` menyenaraikan awalan yang mencetuskan laluan terus (keserasian ke belakang). Kembangkan hanya untuk format kelayakan awam yang didokumenkan, bukan untuk rahsia proprietari.
- `.env.example` digunakan dalam skrip `check-env-doc-sync` CI — apabila anda mengalih keluar pemboleh ubah di sini, pastikan dokumentasi turut sepadan.
- Suit `npm run test:vitest` dan `node --import tsx/esm --test tests/unit/publicCreds.test.ts` mestilah kedua-duanya kekal berjaya.

## Bila pembantu ini TIDAK patut digunakan

Pembantu ini **hanya** untuk kelayakan yang:

1. Diedarkan secara terbuka oleh penyedia huluan (binari CLI, berkas pelayar, dokumentasi rasmi).
2. Didokumenkan atau dibayangkan dengan jelas sebagai tidak sulit (dilindungi PKCE, kunci Web Firebase, atau yang serupa).

Untuk semua yang lain — token yang dikeluarkan oleh pengendali, rahsia bagi setiap penyewa, client_secret aplikasi OAuth anda sendiri, kunci penyulitan, rahsia JWT, kata laluan pangkalan data — gunakan **pemboleh ubah persekitaran sahaja** (`process.env.FOO`, sandaran `||` kepada nilai kosong / ralat eksplisit). Semua ini hendaklah disimpan dalam `.env` dan [storan kelayakan yang disulitkan](./COMPLIANCE.md), bukan dalam kod sumber.

## Rujukan

- [Google: OAuth 2.0 untuk aplikasi natif](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Kunci API untuk pengenalpastian klien](https://firebase.google.com/docs/projects/api-keys)
- [Rahsia yang disokong oleh Pengimbasan Rahsia GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: pengesanan base64 untuk token (Feb 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Komit yang memperkenalkan pembantu ini: `1a39c31f` — _fix(security): lindungi kelayakan huluan awam + pusatkan sanitasi ralat_
