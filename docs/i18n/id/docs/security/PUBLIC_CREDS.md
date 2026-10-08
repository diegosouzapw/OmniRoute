# Public Credentials Handling (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Sumber acuan:** `open-sse/utils/publicCreds.ts`
> **Pengujian:** `tests/unit/publicCreds.test.ts`
> **Terakhir diperbarui:** 2026-08-07 — v3.8.50
> **Audiens:** Engineer yang mengintegrasikan penyedia yang menyertakan OAuth client_id / client_secret / Firebase Web API keys publik dalam CLI publik mereka.
> **Status:** **WAJIB** untuk semua kode baru yang menyematkan pengidentifikasi upstream.

## Mengapa ini diperlukan

- [OAuth 2.0 untuk aplikasi native (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret untuk aplikasi terinstal bersifat publik; PKCE menyediakan keamanan yang sebenarnya.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Pengidentifikasi klien Web bersifat publik secara desain.

OmniRoute harus menyematkan nilai-nilai ini agar pengguna yang tidak mengonfigurasi `.env` tetap mendapatkan alur OAuth yang langsung berfungsi. Tanpa fallback yang disematkan, penyedia Gemini / Antigravity berhenti berfungsi bagi setiap pengguna yang mengikuti alur "cukup clone dan jalankan".

Namun, nilai literal seperti `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` terdeteksi oleh **GitHub Secret Scanning**, **Semgrep**, dan pemindai pola serupa. Setiap rilis menjadi rentetan false positive yang mengganggu, push protection memblokir commit yang sah, dan operator berhenti memercayai feed peringatan.

Helper `open-sse/utils/publicCreds.ts` menyelesaikan kedua kendala tersebut sekaligus:

- Menyematkan pengidentifikasi publik sebagai **urutan byte yang dimasking dengan XOR** (tidak ada pola pemindai dalam source).
- Mendekode saat runtime melalui `decodePublicCred` / `resolvePublicCred`.
- Mendeteksi nilai mentah yang sudah mengikuti prefiks terkenal (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) dan meneruskannya tanpa perubahan, sehingga pengguna dengan nilai mentah dalam `.env` yang sudah ada tetap dapat menggunakannya dengan **tanpa migrasi sama sekali**.

Ini adalah **obfuscation, bukan encryption.** Siapa pun yang membaca source dapat memulihkan nilainya — dan itu tidak masalah karena nilai tersebut memang bersifat publik secara desain. Satu-satunya tujuan adalah menghindari kecocokan regex pemindai.

## Pola wajib

### 1. Menambahkan kredensial publik baru

Saat Anda perlu menyematkan nilai baru yang disediakan upstream dan:

- berasal dari CLI / aplikasi desktop / bundle browser publik, **dan**
- didokumentasikan (atau diperlakukan) oleh penyedia upstream sebagai pengidentifikasi klien publik, **dan**
- akan terdeteksi oleh pemindai pola (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, dan sebagainya),

…ikuti checklist berikut:

1. Buat urutan byte yang dimasking:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Tambahkan entri baru ke `EMBEDDED_DEFAULTS` dalam `open-sse/utils/publicCreds.ts` dengan **nama key yang netral** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, dan sebagainya). **Jangan** gunakan nama seperti `client_secret` atau `api_key` dalam helper — kata-kata tersebut memicu aturan generic-secret Semgrep.

3. Tambahkan `keyof typeof EMBEDDED_DEFAULTS` ke union type publik (type tersebut diinferensikan secara otomatis).

4. Dalam kode consumer, ganti literal yang di-hardcode dengan:

   ```ts
   // satu override env
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // beberapa alias env (nilai pertama yang tidak kosong akan digunakan)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // tanpa override env (selalu menggunakan default yang disematkan)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Hapus literal dari `.env.example` (ganti dengan dokumentasi berupa komentar saja yang mengarahkan pembaca ke sini):

   ```dotenv
   # ── Penyedia (Google / Firebase / dan sebagainya) ──
   # Kredensial OAuth publik disematkan ke dalam kode melalui
   # open-sse/utils/publicCreds.ts. Atur variabel ini hanya untuk menggunakan kredensial Anda sendiri.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Perbarui `tests/unit/publicCreds.test.ts` untuk menambahkan assertion bentuk bagi key baru (verifikasi formatnya, bukan nilai literalnya — lihat pengujian yang sudah ada untuk polanya).

7. **Jangan pernah** menambahkan literal `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ke file pengujian. Gunakan konstanta `FAKE_*` yang dibuat dari fragmen `.join("")` (lihat pengujian yang sudah ada).

### 2. Consumer

- **Baca hanya dari `resolvePublicCred()` / `resolvePublicCredMulti()`** — jangan pernah memanggil `decodePublicCredBytes()` secara langsung dari luar helper.
- Helper ini sengaja dibuat ringan (XOR byte linear) dan aman untuk dipanggil saat module-load; default dihitung satu kali.
- Override env selalu diutamakan. Jika pengguna menetapkan `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, helper akan meneruskan nilai mentah tersebut tanpa perubahan.

### 3. Pola yang dilarang

❌ **Jangan pernah** melakukan hal-hal berikut dalam kode produksi (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// BURUK: nilai literal memicu Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// BURUK: base64 dari literal — GitHub tetap mendeteksinya sejak Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// BURUK: penggabungan string yang merakit ulang pola saat runtime
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// BURUK: encoding hex/ROT13 — obfuscation berbeda, risiko deteksi tetap sama
clientSecret: hexDecode("474f4353..."),
```

Semua pola ini pada akhirnya akan memicu pemindai. Gunakan `resolvePublicCred()`.

❌ **Jangan pernah** menambahkan kredensial literal ke `.env.example`. Pengguna yang memerlukan nilai upstream asli dapat mengekstraknya sendiri dari CLI publik, atau menggunakan registrasi OAuth mereka sendiri.

❌ **Jangan pernah** mengabaikan peringatan secret-scanning baru tanpa terlebih dahulu memeriksa apakah kredensial tersebut harus dipindahkan ke helper ini.

## Kontrol terkait

- `RAW_VALUE_PATTERN` di `publicCreds.ts` mencantumkan prefiks yang memicu penerusan apa adanya (kompatibilitas mundur). Perluas hanya untuk format kredensial publik yang terdokumentasi, jangan pernah untuk rahasia proprieter.
- `.env.example` tercakup dalam skrip `check-env-doc-sync` milik CI — saat Anda menghapus variabel di sini, pastikan dokumentasinya sesuai.
- Rangkaian pengujian `npm run test:vitest` dan `node --import tsx/esm --test tests/unit/publicCreds.test.ts` harus tetap berhasil.

## Kapan helper ini TIDAK boleh digunakan

Helper ini **hanya** untuk kredensial yang:

1. Didistribusikan secara publik oleh penyedia upstream (biner CLI, bundel browser, dokumentasi resmi).
2. Didokumentasikan atau sangat diindikasikan sebagai tidak rahasia (dilindungi PKCE, kunci Firebase Web, atau yang serupa).

Untuk semua yang lain — token yang diterbitkan operator, rahasia per tenant, `client_secret` aplikasi OAuth Anda sendiri, kunci enkripsi, rahasia JWT, kata sandi basis data — gunakan **hanya variabel lingkungan** (`process.env.FOO`, fallback `||` ke nilai kosong / galat eksplisit). Semua ini harus disimpan di `.env` dan [penyimpanan kredensial terenkripsi](./COMPLIANCE.md), bukan di kode sumber.

## Referensi

- [Google: OAuth 2.0 untuk aplikasi native](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Kunci API untuk identifikasi klien](https://firebase.google.com/docs/projects/api-keys)
- [Rahasia yang didukung GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: deteksi base64 untuk token (Feb 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit yang memperkenalkan helper ini: `1a39c31f` — _fix(security): menyamarkan kredensial upstream publik + memusatkan sanitasi galat_
