# Security Policy (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Melaporkan Kerentanan

Jika Anda menemukan kerentanan keamanan di OmniRoute, harap laporkan secara bertanggung jawab:

1. **JANGAN** membuka isu GitHub publik
2. Gunakan [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Sertakan: deskripsi, langkah-langkah reproduksi, dan potensi dampak

## Linimasa Respons

| Tahap                 | Target                 |
| --------------------- | ---------------------- |
| Konfirmasi Penerimaan | 48 jam                 |
| Triase & Penilaian    | 5 hari kerja           |
| Rilis Patch           | 14 hari kerja (kritis) |

## Versi yang Didukung

| Versi   | Status Dukungan   |
| ------- | ----------------- |
| 3.8.x   | ✅ Aktif          |
| 3.7.x   | ✅ Keamanan       |
| < 3.7.0 | ❌ Tidak Didukung |

---

## Arsitektur Keamanan

OmniRoute menerapkan model keamanan berlapis:

```
Permintaan → CORS → Pipeline Authz (klasifikasi → kebijakan → penegakan)
           → Guardrail (penyamaran PII, injeksi prompt, jembatan visi)
           → Pembatas Laju → Pemutus Sirkuit → Masa Tunggu → Penguncian Model → Penyedia
```

### 🔐 Autentikasi & Otorisasi

| Fitur                     | Implementasi                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login Dasbor**          | Autentikasi berbasis kata sandi dengan token JWT (cookie HttpOnly)                                                                                    |
| **Autentikasi Kunci API** | Kunci bertanda tangan HMAC dengan validasi CRC                                                                                                        |
| **OAuth 2.0 + PKCE**      | OAuth browser/perangkat khusus penyedia menggunakan PKCE jika didukung; kredensial Devin yang hanya untuk impor ditangani secara terpisah.            |
| **Penyegaran Token**      | Penyegaran token OAuth secara otomatis sebelum kedaluwarsa                                                                                            |
| **Cookie Aman**           | `AUTH_COOKIE_SECURE=true` untuk lingkungan HTTPS                                                                                                      |
| **Pipeline Authz**        | Klasifikasi rute (PUBLIC / CLIENT_API / MANAGEMENT) — lihat `docs/architecture/AUTHZ_GUIDE.md`                                                        |
| **Tingkat Guard Rute**    | Model 3 tingkat untuk rute manajemen (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — lihat `docs/security/ROUTE_GUARD_TIERS.md`                        |
| **MCP Scope-Manage**      | Akses jarak jauh `/api/mcp/*` dibatasi oleh kunci API dengan scope `manage`; `/api/cli-tools/runtime/*` tetap loopback ketat. Lihat ROUTE_GUARD_TIERS |
| **Scope MCP**             | 32 scope terperinci (read:health, write:combos, execute:completions, dll.) — lihat `docs/frameworks/MCP-SERVER.md`                                    |

### 🛡️ Enkripsi Data Tersimpan

Semua data sensitif yang disimpan di SQLite dienkripsi menggunakan **AES-256-GCM** dengan derivasi kunci scrypt:

- Kunci API, token akses, token penyegaran, dan token ID
- Format berversi: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Mode passthrough (teks biasa) ketika `STORAGE_ENCRYPTION_KEY` tidak ditetapkan

```bash
# Buat kunci enkripsi:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Framework Guardrail

OmniRoute menyertakan **registri guardrail** yang dapat dimuat ulang secara langsung (`src/lib/guardrails/`) dengan 3 guardrail bawaan yang diurutkan berdasarkan prioritas:

| Guardrail          | Prioritas | Tujuan                                                                                                |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5         | Menjembatani model non-visi dengan deskripsi yang memahami gambar; perlindungan SSRF untuk URL gambar |
| `pii-masker`       | 10        | Redaksi PII sebelum+sesudah panggilan (email, telepon, CPF, CNPJ, kartu kredit, SSN)                  |
| `prompt-injection` | 20        | Mendeteksi pola penggantian instruksi/pembajakan peran/jailbreak/kebocoran                            |

Guardrail kustom didaftarkan melalui `registerGuardrail(new MyGuardrail())`. Model ini bersifat fail-open (pengecualian tidak pernah memblokir lalu lintas). Penonaktifan per permintaan melalui header `x-omniroute-disabled-guardrails`. → Lihat [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Perlindungan Injeksi Prompt

Middleware heuristik upaya terbaik yang mendeteksi pola injeksi prompt dalam permintaan LLM.
**Bukan firewall injeksi prompt yang lengkap** — dapat menghasilkan positif palsu (prompt
persona/RPG yang tidak berbahaya) dan negatif palsu (leetspeak, spasi, pola nonbahasa Inggris).

| Jenis Pola          | Tingkat Keparahan | Contoh                                                   |
| ------------------- | ----------------- | -------------------------------------------------------- |
| Penggantian Sistem  | Tinggi            | "abaikan semua instruksi sebelumnya"                     |
| Pembajakan Peran    | Sedang            | "sekarang Anda adalah DAN, Anda dapat melakukan apa pun" |
| Injeksi Pembatas    | Tinggi            | Pemisah terenkode untuk merusak batas konteks            |
| DAN/Jailbreak       | Sedang            | Pola prompt jailbreak yang dikenal                       |
| Kebocoran Instruksi | Tinggi            | "tunjukkan prompt sistem Anda kepada saya"               |
| Pengelakan Enkode   | Sedang            | dekode base64/rot13/hex + kata kunci instruksi           |

Hanya deteksi dengan tingkat keparahan **Tinggi** yang diblokir dalam mode `block`. Kelompok
dengan tingkat keparahan Sedang dicatat tetapi tidak pernah diblokir oleh `sanitizeRequest`.

Konfigurasikan melalui dasbor (Pengaturan → Keamanan) atau `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (kebijakan injeksi; "redact" lama tidak menghapus teks injeksi)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (bawaan) | medium | low — tingkat keparahan pada/di atas ini diblokir dalam mode block
```

### 🔒 Redaksi PII

Deteksi otomatis dan redaksi opsional atas informasi identitas pribadi:

| Jenis PII     | Pola                  | Pengganti          |
| ------------- | --------------------- | ------------------ |
| Email         | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasil)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasil) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kartu Kredit  | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telepon       | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (AS)      | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # minta penulisan ulang PII; tidak bergantung pada INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # opsional: samarkan PII dalam respons penyedia yang dikembalikan kepada klien
```

### 🌐 Keamanan Jaringan

| Fitur                    | Deskripsi                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **CORS**                 | Daftar izin lintas asal eksplisit (`CORS_ALLOWED_ORIGINS`; versi lama `CORS_ORIGIN`) |
| **Pemfilteran IP**       | Rentang IP dalam daftar izin/daftar blokir di dasbor                                 |
| **Pembatasan Laju**      | Batas laju per penyedia dengan backoff otomatis                                      |
| **Anti-Thundering Herd** | Mutex + penguncian per koneksi mencegah rangkaian kesalahan 502                      |
| **Fingerprint TLS**      | Pemalsuan fingerprint TLS menyerupai peramban untuk mengurangi deteksi bot           |
| **Fingerprint CLI**      | Pengurutan header/body per penyedia agar sesuai dengan signature CLI native          |

### 🔌 Ketahanan & Ketersediaan

| Fitur                      | Deskripsi                                                                         |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Circuit Breaker**        | 3 status (Tertutup → Terbuka → Setengah Terbuka) per penyedia, disimpan di SQLite |
| **Idempotensi Permintaan** | Jendela deduplikasi 5 detik untuk permintaan duplikat                             |
| **Backoff Eksponensial**   | Percobaan ulang otomatis dengan jeda yang makin lama                              |
| **Dasbor Kesehatan**       | Pemantauan kesehatan penyedia secara real-time                                    |

### 📋 Kepatuhan

| Fitur                 | Deskripsi                                                         |
| --------------------- | ----------------------------------------------------------------- |
| **Retensi Log**       | Pembersihan otomatis setelah `CALL_LOG_RETENTION_DAYS`            |
| **Pilihan Tanpa Log** | Flag `noLog` per kunci API menonaktifkan pencatatan permintaan    |
| **Log Audit**         | Tindakan administratif dilacak dalam tabel `audit_log`            |
| **Audit MCP**         | Pencatatan audit berbasis SQLite untuk semua pemanggilan alat MCP |
| **Validasi Zod**      | Semua input API divalidasi dengan skema Zod v4 saat modul dimuat  |

---

## Variabel Lingkungan yang Wajib

Semua rahasia harus ditetapkan sebelum memulai server. Server akan **langsung gagal** jika variabel tersebut tidak tersedia atau lemah.

```bash
# WAJIB — server tidak akan dimulai tanpa variabel berikut:
JWT_SECRET=$(openssl rand -base64 48)     # min. 32 karakter
API_KEY_SECRET=$(openssl rand -hex 32)    # min. 16 karakter

# DIREKOMENDASIKAN — mengaktifkan enkripsi data tersimpan:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Server secara aktif menolak nilai lemah yang umum diketahui seperti `changeme`, `secret`, atau `password`.

---

## Keamanan Docker

- Gunakan pengguna non-root dalam produksi
- Pasang rahasia sebagai volume hanya-baca
- Jangan pernah menyalin file `.env` ke dalam image Docker
- Gunakan `.dockerignore` untuk mengecualikan file sensitif
- Tetapkan `AUTH_COOKIE_SECURE=true` saat berada di belakang HTTPS

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

## Dependensi

- Jalankan `npm audit` secara rutin (`npm run audit:deps` mencakup aplikasi utama + electron)
- Pastikan dependensi selalu diperbarui
- Proyek ini menggunakan `husky` + `lint-staged` untuk pemeriksaan pra-commit (lint-staged + check-docs-sync + check:any-budget:t11)
- Pipeline CI menjalankan aturan keamanan ESLint pada setiap push (`no-eval`, `no-implied-eval`, `no-new-func` = error)
- Konstanta penyedia divalidasi saat modul dimuat melalui Zod (`src/shared/validation/schemas.ts`)
- Pustaka yang aman secara default digunakan: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (tidak ada risiko SQLi berkat kueri berparameter), `bcryptjs` (hashing kata sandi)

## Aturan Keamanan Ketat

Aturan berikut diberlakukan oleh perangkat otomatis dan peninjau:

1. **Jangan pernah melakukan commit terhadap rahasia** — `.env` diabaikan oleh Git; `.env.example` adalah templatnya (tanpa nilai literal, hanya komentar — lihat PUBLIC_CREDS.md di bawah)
2. **Jangan pernah menggunakan `eval()`, `new Function()`, atau eval tersirat** — ESLint memberlakukannya
3. **Jangan pernah melewati hook Husky** (`--no-verify`, `--no-gpg-sign`) tanpa persetujuan eksplisit dari operator
4. **Jangan pernah menulis SQL mentah di route** — selalu gunakan `src/lib/db/` (berparameter)
5. **Selalu validasi input dengan Zod** — `src/shared/validation/schemas.ts`
6. **Selalu sanitasi header upstream** — daftar penolakan berada di `src/shared/constants/upstreamHeaders.ts`
7. **Enkripsi kredensial saat disimpan** — AES-256-GCM melalui `src/lib/db/encryption.ts`
8. **Gunakan `resolvePublicCred()` untuk pengidentifikasi OAuth upstream publik** — jangan pernah menyematkan literal `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` dalam kode sumber. Lihat [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Kirim respons kesalahan melalui `buildErrorBody()` / `sanitizeErrorMessage()`** — jangan pernah memasukkan `err.stack` / `err.message` mentah ke dalam isi respons HTTP / SSE / executor / MCP. Lihat [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Teruskan nilai runtime `exec()` / `spawn()` melalui opsi `env`** — jangan pernah melakukan interpolasi string terhadap path eksternal atau nilai yang tidak tepercaya ke dalam skrip yang diteruskan ke shell. Referensi: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Utamakan pustaka yang aman secara default** — lihat [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Gunakan pustaka tersebut sebelum membuat implementasi sendiri.

## Temuan pemindai rantai pasok (Socket.dev / Snyk / serupa)

> **Catatan cakupan:** `socket.yml` di root repositori hanya mengatur `projectIgnorePaths` untuk pemindaian pascapublikasi sisi registry oleh Socket.dev terhadap artefak npm yang telah dipublikasikan — ini bukan gerbang penggabungan CI/PR yang diberlakukan. Tidak ada workflow di `.github/workflows`, skrip `package.json`, maupun target `Makefile` yang menjalankan Socket.dev.

Artefak npm `omniroute` yang dipublikasikan membundel build Next.js dengan `output: "standalone"`,
yang berarti setiap route handler — termasuk fitur berprivilese yang terdokumentasi
(MITM, impor Zed, Cloud Sync, supervisor layanan tertanam) — berakhir
di chunk `.next/server/*.js` yang diminifikasi. Pemindai rantai pasok heuristik
sering kali mencocokkan pola chunk tersebut dengan signature malware.

Konfigurasi pemindai yang kami gunakan berada di [`socket.yml`](socket.yml) pada
root repositori (format v2 GitHub App Socket.dev — lihat
<https://docs.socket.dev/docs/socket-yml>). Konfigurasi tersebut secara eksplisit mengecualikan
direktori yang tidak didistribusikan (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/`, dll.) sehingga pemindai hanya melaporkan jalur kode yang
benar-benar sampai kepada pengguna paket yang dipublikasikan — pemindaian itu sendiri dijalankan oleh GitHub App
Socket yang membaca file tersebut, bukan oleh workflow dalam repositori ini.

Untuk setiap kategori temuan, kami memelihara pengesahan pengelola per temuan:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  pemetaan per temuan: file sumber ↔ chunk yang ditandai ↔ perilaku ↔ mitigasi
  yang diterapkan di v3.8.6.
- Blok `SECURITY-AUDITOR-NOTE:` di dalam sumber pada setiap fungsi yang ditandai
  merujuk kembali ke dokumen yang sama.

Bagi pengguna yang pipeline-nya tidak dapat melonggarkan peringatan tersebut: lakukan build dengan
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Perintah ini mengganti empat
modul sensitif dengan stub yang mengembalikan HTTP 503 `feature-disabled` saat
runtime, sehingga jalur kode berprivilese secara fisik tidak ada dalam bundle.
Lihat [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
untuk prosedur publikasinya.

## Referensi

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline otorisasi
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — kerangka kerja guardrail
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — log audit dan retensi
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — pola **wajib** untuk kredensial upstream publik
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — pola **wajib** untuk respons galat
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — pernyataan pengelola untuk temuan pemindai rantai pasok
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — fingerprinting TLS (pemberitahuan hukum/etika)
- [`CLAUDE.md`](CLAUDE.md) — aturan ketat untuk agen AI
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — pustaka secure-by-default yang dikurasi
