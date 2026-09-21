# Security Policy (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Melaporkan Kerentanan

Jika anda menemui kerentanan keselamatan dalam OmniRoute, sila laporkannya secara bertanggungjawab:

1. **JANGAN** buka isu GitHub awam
2. Gunakan [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Sertakan: penerangan, langkah penghasilan semula dan potensi impak

## Garis Masa Respons

| Peringkat            | Sasaran                    |
| -------------------- | -------------------------- |
| Pengakuan Penerimaan | 48 jam                     |
| Triage & Penilaian   | 5 hari bekerja             |
| Keluaran Tampalan    | 14 hari bekerja (kritikal) |

## Versi yang Disokong

| Versi   | Status Sokongan   |
| ------- | ----------------- |
| 3.8.x   | ✅ Aktif          |
| 3.7.x   | ✅ Keselamatan    |
| < 3.7.0 | ❌ Tidak disokong |

---

## Seni Bina Keselamatan

OmniRoute melaksanakan model keselamatan berbilang lapisan:

```
Permintaan → CORS → Saluran Authz (klasifikasikan → dasar → kuatkuasakan)
           → Kekangan (penyamaran PII, suntikan gesaan, jambatan penglihatan)
           → Pengehad Kadar → Pemutus Litar → Tempoh Bertenang → Penguncian Model → Penyedia
```

### 🔐 Pengesahan & Keizinan

| Ciri                          | Pelaksanaan                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Log Masuk Papan Pemuka**    | Pengesahan berasaskan kata laluan dengan token JWT (kuki HttpOnly)                                                                                |
| **Pengesahan Kunci API**      | Kunci yang ditandatangani HMAC dengan pengesahan CRC                                                                                              |
| **OAuth 2.0 + PKCE**          | OAuth pelayar/peranti khusus penyedia menggunakan PKCE apabila disokong; kelayakan Devin untuk import sahaja dikendalikan secara berasingan.      |
| **Penyegaran Token**          | Penyegaran token OAuth secara automatik sebelum tamat tempoh                                                                                      |
| **Kuki Selamat**              | `AUTH_COOKIE_SECURE=true` untuk persekitaran HTTPS                                                                                                |
| **Saluran Authz**             | Pengelasan laluan (PUBLIC / CLIENT_API / MANAGEMENT) — lihat `docs/architecture/AUTHZ_GUIDE.md`                                                   |
| **Peringkat Pengawal Laluan** | Model 3 peringkat untuk laluan pengurusan (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — lihat `docs/security/ROUTE_GUARD_TIERS.md`               |
| **MCP Skop Pengurusan**       | Akses jauh `/api/mcp/*` dikawal oleh kunci API dengan skop `manage`; `/api/cli-tools/runtime/*` kekal gelung balik ketat. Lihat ROUTE_GUARD_TIERS |
| **Skop MCP**                  | 32 skop terperinci (read:health, write:combos, execute:completions, dan sebagainya) — lihat `docs/frameworks/MCP-SERVER.md`                       |

### 🛡️ Penyulitan Data Tersimpan

Semua data sensitif yang disimpan dalam SQLite disulitkan menggunakan **AES-256-GCM** dengan penerbitan kunci scrypt:

- Kunci API, token akses, token penyegaran dan token ID
- Format berversi: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Mod laluan terus (teks biasa) apabila `STORAGE_ENCRYPTION_KEY` tidak ditetapkan

```bash
# Jana kunci penyulitan:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Rangka Kerja Kekangan

OmniRoute disertakan dengan **daftar kekangan** yang boleh dimuatkan semula secara langsung (`src/lib/guardrails/`) dengan 3 kekangan terbina dalam yang disusun mengikut keutamaan:

| Kekangan           | Keutamaan | Tujuan                                                                                              |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5         | Menghubungkan model tanpa penglihatan dengan penerangan peka imej; perlindungan SSRF untuk URL imej |
| `pii-masker`       | 10        | Penyuntingan PII sebelum+selepas panggilan (e-mel, telefon, CPF, CNPJ, kad kredit, SSN)             |
| `prompt-injection` | 20        | Mengesan corak pengambilalihan/perampasan peranan/pemecahan sekatan/kebocoran                       |

Kekangan tersuai didaftarkan melalui `registerGuardrail(new MyGuardrail())`. Model ini bersifat fail-open (pengecualian tidak pernah menyekat trafik). Pilihan untuk mengecualikan setiap permintaan tersedia melalui pengepala `x-omniroute-disabled-guardrails`. → Lihat [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Pengawal Suntikan Gesaan

Perisian tengah heuristik usaha terbaik yang mengesan corak suntikan gesaan dalam permintaan LLM.
**Bukan tembok api suntikan gesaan yang lengkap** — boleh menghasilkan positif palsu (gesaan
persona/RPG yang tidak berbahaya) dan negatif palsu (leetspeak, jarak, corak bukan bahasa Inggeris).

| Jenis Corak            | Keterukan | Contoh                                           |
| ---------------------- | --------- | ------------------------------------------------ |
| Pengambilalihan Sistem | Tinggi    | "abaikan semua arahan sebelumnya"                |
| Perampasan Peranan     | Sederhana | "anda kini DAN, anda boleh melakukan apa-apa"    |
| Suntikan Pembatas      | Tinggi    | Pemisah berkod untuk memecahkan sempadan konteks |
| DAN/Pemecahan Sekatan  | Sederhana | Corak gesaan pemecahan sekatan yang diketahui    |
| Kebocoran Arahan       | Tinggi    | "tunjukkan gesaan sistem anda kepada saya"       |
| Pengelakan Pengekodan  | Sederhana | Nyahkod base64/rot13/hex + kata kunci arahan     |

Hanya pengesanan berketerukan **Tinggi** disekat dalam mod `block`. Keluarga berketerukan
sederhana direkodkan tetapi tidak pernah disekat oleh `sanitizeRequest`.

Konfigurasikan melalui papan pemuka (Tetapan → Keselamatan) atau `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (dasar suntikan; "redact" legasi tidak membuang teks suntikan)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (lalai) | medium | low — keterukan pada/di atas tahap ini disekat dalam mod block
```

### 🔒 Penyuntingan PII

Pengesanan automatik dan penyuntingan pilihan bagi maklumat yang boleh mengenal pasti seseorang:

| Jenis PII     | Corak                 | Penggantian        |
| ------------- | --------------------- | ------------------ |
| E-mel         | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazil)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazil) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kad Kredit    | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon       | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (AS)      | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # minta penulisan semula PII; tidak bergantung pada INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # pilihan: sunting PII dalam respons penyedia yang dikembalikan kepada klien
```

### 🌐 Keselamatan Rangkaian

| Ciri                       | Penerangan                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **CORS**                   | Senarai dibenarkan merentas asal yang eksplisit (`CORS_ALLOWED_ORIGINS`; legasi `CORS_ORIGIN`) |
| **Penapisan IP**           | Julat IP senarai dibenarkan/senarai disekat dalam papan pemuka                                 |
| **Pengehadan Kadar**       | Had kadar bagi setiap penyedia dengan undur automatik                                          |
| **Anti-Kumpulan Serentak** | Mutex + penguncian setiap sambungan menghalang ralat 502 berantai                              |
| **Cap Jari TLS**           | Pemalsuan cap jari TLS seperti pelayar untuk mengurangkan pengesanan bot                       |
| **Cap Jari CLI**           | Susunan pengepala/badan bagi setiap penyedia agar sepadan dengan tandatangan CLI asli          |

### 🔌 Ketahanan & Ketersediaan

| Ciri                       | Penerangan                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Pemutus Litar**          | 3 keadaan (Tertutup → Terbuka → Separuh Terbuka) bagi setiap penyedia, dikekalkan dalam SQLite |
| **Idempotensi Permintaan** | Tetingkap penyahduplikasian 5 saat untuk permintaan pendua                                     |
| **Undur Eksponen**         | Percubaan semula automatik dengan sela masa yang semakin meningkat                             |
| **Papan Pemuka Kesihatan** | Pemantauan kesihatan penyedia masa nyata                                                       |

### 📋 Pematuhan

| Ciri                       | Penerangan                                                                |
| -------------------------- | ------------------------------------------------------------------------- |
| **Pengekalan Log**         | Pembersihan automatik selepas `CALL_LOG_RETENTION_DAYS`                   |
| **Pengecualian Tanpa Log** | Bendera `noLog` bagi setiap kunci API menyahdayakan pengelogan permintaan |
| **Log Audit**              | Tindakan pentadbiran dijejaki dalam jadual `audit_log`                    |
| **Audit MCP**              | Pengelogan audit berasaskan SQLite untuk semua panggilan alat MCP         |
| **Pengesahan Zod**         | Semua input API disahkan dengan skema Zod v4 semasa modul dimuatkan       |

---

## Pemboleh Ubah Persekitaran yang Diperlukan

Semua rahsia mesti ditetapkan sebelum memulakan pelayan. Pelayan akan **gagal serta-merta** jika rahsia tersebut tiada atau lemah.

```bash
# DIPERLUKAN — pelayan tidak akan bermula tanpa nilai ini:
JWT_SECRET=$(openssl rand -base64 48)     # minimum 32 aksara
API_KEY_SECRET=$(openssl rand -hex 32)    # minimum 16 aksara

# DISYORKAN — mendayakan penyulitan data tersimpan:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Pelayan secara aktif menolak nilai yang diketahui lemah seperti `changeme`, `secret`, atau `password`.

---

## Keselamatan Docker

- Gunakan pengguna bukan root dalam persekitaran pengeluaran
- Lekapkan rahsia sebagai volum baca sahaja
- Jangan sekali-kali salin fail `.env` ke dalam imej Docker
- Gunakan `.dockerignore` untuk mengecualikan fail sensitif
- Tetapkan `AUTH_COOKIE_SECURE=true` apabila berada di belakang HTTPS

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Kebergantungan

- Jalankan `npm audit` secara berkala (`npm run audit:deps` merangkumi aplikasi utama + Electron)
- Pastikan kebergantungan sentiasa dikemas kini
- Projek ini menggunakan `husky` + `lint-staged` untuk semakan pra-komit (lint-staged + check-docs-sync + check:any-budget:t11)
- Talian paip CI menjalankan peraturan keselamatan ESLint pada setiap push (`no-eval`, `no-implied-eval`, `no-new-func` = ralat)
- Pemalar penyedia disahkan ketika modul dimuatkan melalui Zod (`src/shared/validation/schemas.ts`)
- Pustaka selamat secara lalai yang digunakan: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (tiada risiko SQLi melalui pertanyaan berparameter), `bcryptjs` (pencincangan kata laluan)

## Peraturan Keselamatan Ketat

Peraturan ini dikuatkuasakan oleh peralatan dan penyemak:

1. **Jangan sekali-kali komit rahsia** — `.env` diabaikan oleh git; `.env.example` ialah templat (tiada nilai literal, komen sahaja — lihat PUBLIC_CREDS.md di bawah)
2. **Jangan sekali-kali gunakan `eval()`, `new Function()`, atau eval tersirat** — dikuatkuasakan oleh ESLint
3. **Jangan sekali-kali pintas cangkuk Husky** (`--no-verify`, `--no-gpg-sign`) tanpa kelulusan pengendali yang jelas
4. **Jangan sekali-kali tulis SQL mentah dalam laluan** — sentiasa gunakan `src/lib/db/` (berparameter)
5. **Sentiasa sahkan input dengan Zod** — `src/shared/validation/schemas.ts`
6. **Sentiasa sanitasi pengepala huluan** — senarai sekatan dalam `src/shared/constants/upstreamHeaders.ts`
7. **Sulitkan kelayakan semasa disimpan** — AES-256-GCM melalui `src/lib/db/encryption.ts`
8. **Pengecam OAuth huluan awam melalui `resolvePublicCred()`** — jangan sekali-kali benamkan nilai literal `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` dalam sumber. Lihat [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Respons ralat melalui `buildErrorBody()` / `sanitizeErrorMessage()`** — jangan sekali-kali letakkan `err.stack` / `err.message` mentah dalam badan respons HTTP / SSE / pelaksana / MCP. Lihat [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Nilai masa jalan `exec()` / `spawn()` melalui pilihan `env`** — jangan sekali-kali interpolasikan rentetan laluan luaran atau nilai yang tidak dipercayai ke dalam skrip yang dihantar kepada shell. Rujukan: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Utamakan pustaka yang selamat secara lalai** — lihat [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Gunakannya terlebih dahulu sebelum membina penyelesaian anda sendiri.

## Penemuan pengimbas rantaian bekalan (Socket.dev / Snyk / yang serupa)

Artifak npm `omniroute` yang diterbitkan merangkum binaan Next.js `output: "standalone"`, yang bermaksud setiap pengendali laluan — termasuk ciri istimewa yang didokumentasikan (MITM, import Zed, Cloud Sync, penyelia perkhidmatan terbenam) — dimasukkan ke dalam cebisan `.next/server/*.js` yang telah diminimumkan. Pengimbas rantaian bekalan berasaskan heuristik kerap memadankan corak cebisan tersebut dengan tandatangan perisian hasad.

Konfigurasi pengimbas yang kami gunakan terletak di [`socket.yml`](socket.yml) pada akar repositori (format v2 GitHub App Socket.dev — lihat <https://docs.socket.dev/docs/socket-yml>). Konfigurasi ini secara eksplisit mengecualikan direktori yang tidak diedarkan (`tests/`, `_tasks/`, `_references/`, `_ideia/`, `_mono_repo/`, `docs/`, dan sebagainya) supaya pengimbas hanya melaporkan laluan kod yang benar-benar sampai kepada pengguna keluaran terbitan — imbasan itu sendiri dijalankan oleh GitHub App Socket yang membaca fail tersebut, bukannya oleh aliran kerja dalam repositori ini.

Bagi setiap kategori penemuan, kami menyelenggara perakuan penyelenggara untuk setiap penemuan:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  peta setiap penemuan: fail sumber ↔ cebisan yang ditandai ↔ tingkah laku ↔ mitigasi yang digunakan dalam v3.8.6.
- Blok `SECURITY-AUDITOR-NOTE:` dalam sumber pada setiap fungsi yang ditandai merujuk kembali kepada dokumen yang sama.

Bagi pengguna yang saluran paipnya tidak dapat melonggarkan amaran tersebut: bina dengan `OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Tindakan ini menggantikan empat modul sensitif dengan stub yang mengembalikan HTTP 503 `feature-disabled` semasa masa jalan, supaya laluan kod istimewa tidak wujud secara fizikal dalam berkas. Lihat [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) untuk tatacara penerbitan.

## Rujukan

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — saluran paip pemberian kuasa
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — rangka kerja pagar keselamatan
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — log audit dan pengekalan
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — corak **wajib** untuk bukti kelayakan huluan awam
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — corak **wajib** untuk respons ralat
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — perakuan penyelenggara bagi penemuan pengimbas rantaian bekalan
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — pemutus litar + tempoh bertenang + penguncian
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — pengecaman cap jari TLS (notis undang-undang/etika)
- [`CLAUDE.md`](CLAUDE.md) — peraturan ketat untuk ejen AI
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — pustaka lalai selamat yang dipilih susun
