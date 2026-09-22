# Kiro Setup Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Panduan ini membahas cara menambahkan akun Kiro (asisten pengodean AI yang dihosting AWS) ke OmniRoute,
dengan fokus pada menjalankan beberapa akun secara bersamaan tanpa konflik sesi.

---

## Latar Belakang: Mengapa Akun Kiro Dapat Mengalami Konflik

Backend Kiro menggunakan pendaftaran klien AWS SSO OIDC untuk melacak sesi aktif.
Batasan pentingnya: **setiap pendaftaran klien OIDC hanya mendukung satu sesi aktif
pada satu waktu**. Ketika perangkat atau pengguna kedua melakukan autentikasi menggunakan
klien terdaftar yang sama, backend membatalkan token penyegaran akun pertama.

Ini adalah mekanisme yang sama yang menyebabkan masalah saat menjalankan `kiro-cli login` pada
mesin tempat akun Kiro lain sudah masuk — proses masuk yang baru akan mencabut token
akun pertama.

---

## Cara OmniRoute Mengatasi Hal Ini (v3.8.0+)

Mulai dari v3.8.0, OmniRoute memanggil `registerClient()` (AWS SSO OIDC) selama setiap
impor koneksi Kiro. Hal ini memberikan pendaftaran klien OIDC khusus kepada setiap koneksi
OmniRoute. Karena setiap pendaftaran klien bersifat independen, penyegaran atau
autentikasi ulang satu akun tidak memengaruhi token penyegaran akun lainnya.

Isolasi berlaku untuk metode impor token penyegaran, sementara autentikasi kunci API sepenuhnya
menghindari sesi penyegaran OIDC:

| Metode impor                                                 | Status isolasi                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Alur kode perangkat AWS Builder ID / IDC                     | Terisolasi sejak alur kode perangkat diperkenalkan                                               |
| **Impor Token** (menempelkan token penyegaran secara manual) | Terisolasi sejak v3.8.0                                                                          |
| **Login sosial Google / GitHub**                             | Terisolasi sejak v3.8.0                                                                          |
| **Impor Otomatis** (SQLite kiro-cli)                         | Terisolasi sejak v3.8.0 (jalur SQLite sudah terisolasi; fallback cache SSO kini juga terisolasi) |
| **Kunci API** (kunci CodeWhisperer berjangka panjang)        | Tidak ada sesi penyegaran; kunci divalidasi dan disimpan sebagai kredensial bearer               |

---

## Catatan Migrasi untuk Koneksi yang Dibuat Sebelum v3.8.0

Koneksi yang diimpor sebelum v3.8.0 tidak memiliki pendaftaran klien OIDC khusus
yang disimpan dalam `providerSpecificData`. Koneksi ini tetap berfungsi, tetapi menggunakan
endpoint penyegaran autentikasi sosial bersama, yang berarti dua koneksi tersebut masih dapat saling
membatalkan.

**Untuk memperoleh isolasi:** hapus koneksi lama dari **Dasbor → Penyedia** dan
impor ulang menggunakan salah satu alur impor yang didukung. Semua koneksi yang baru dibuat akan
menerima pendaftaran kliennya sendiri secara otomatis.

---

## Menambahkan Dua Akun Kiro Secara Berdampingan

### Prasyarat

- OmniRoute v3.8.0 atau yang lebih baru.
- Akun Kiro yang berfungsi (email + kata sandi, atau login Google maupun GitHub).
- Secara opsional, akun Kiro kedua.

### Langkah 1: Impor akun pertama

1. Buka **Dasbor → Penyedia → Tambahkan Penyedia → Kiro**.
2. Pilih salah satu:
   - **Impor Token** — tempelkan token penyegaran yang diawali dengan `aorAAAAAG`.
   - **Kunci API** — tempelkan kunci API Kiro / CodeWhisperer berjangka panjang.
   - **Login Google / GitHub** — selesaikan alur OAuth di browser.
   - **Impor Otomatis** — klik tombol tersebut; OmniRoute membaca kredensial dari
     database kiro-cli lokal atau `~/.aws/sso/cache`.
3. Koneksi disimpan. Alur token penyegaran secara otomatis mendaftarkan klien
   OIDC khusus. Alur kunci API memvalidasi kunci dengan AWS dan tidak menyimpan token penyegaran.

### Langkah 2: Impor akun kedua

Ulangi langkah 1 untuk akun kedua. Karena setiap impor membuat pendaftaran klien OIDC
terpisah, kedua koneksi sepenuhnya terisolasi.

### Langkah 3: Pastikan kedua koneksi aktif

1. **Dasbor → Penyedia** — kedua koneksi Kiro seharusnya menampilkan status **Aktif**.
2. **Dasbor → Kesehatan** — kedua koneksi seharusnya lulus pemeriksaan kesehatan token.

### Langkah 4: Gunakan combo untuk merutekan antar-akun

Buat combo dengan kedua koneksi sebagai target untuk menyeimbangkan beban atau melakukan fallback di antara keduanya:

```
kiro/kiro-dev → kiro/kiro-pro
```

Lihat [FEATURES.md](./FEATURES.md) dan dokumentasi perutean untuk konfigurasi combo.

---

## Pengguna Enterprise / IDC

Untuk akun AWS IAM Identity Center (IDC), gunakan alur **AWS Builder ID / kode perangkat IDC**
dari **Dashboard → Providers → Kiro → Device Code**. Alur kode perangkat selalu
sepenuhnya terisolasi. Impor ulang tidak diperlukan untuk koneksi ini.

Pengguna enterprise yang beroperasi di region AWS non-default dapat menentukan region saat
mengimpor melalui Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Field `region` secara default menggunakan `us-east-1` jika tidak disertakan.

---

## Alur Impor API Key

Autentikasi API key ditujukan untuk kredensial bearer Kiro / AWS CodeWhisperer berumur panjang. Autentikasi ini
tidak menggunakan refresh OAuth sehingga menghindari invalidasi sesi OIDC bersama.

### Dashboard

1. Buka **Dashboard -> Providers -> Kiro**.
2. Pilih **API Key**.
3. Tempelkan API key dan region AWS opsional (`us-east-1` secara default).
4. OmniRoute memvalidasi key tersebut dan menyimpan koneksi.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Kontrak Internal

Rute API memvalidasi key dengan memanggil `KiroService.validateApiKey()`, yang
menggunakan `ListAvailableProfiles` terhadap endpoint CodeWhisperer/Amazon Q
yang sesuai dengan region dan menemukan sebuah `profileArn`.

Koneksi yang disimpan menggunakan:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Saat runtime, `KiroExecutor.buildHeaders()` mengirimkan key sebagai
`Authorization: Bearer <key>` dan menambahkan `tokentype: API_KEY`. Pemanggilan kuota/profil
menggunakan penanda yang sama sehingga AWS memperlakukan bearer tersebut sebagai API key berumur panjang, bukan
sebagai token akses OIDC atau sosial.

---

## Kedaluwarsa Klien OIDC

Klien publik AWS SSO OIDC biasanya kedaluwarsa setelah 90 hari
(`clientSecretExpiresAt`). OmniRoute menyimpan timestamp ini dalam `providerSpecificData`
untuk observabilitas. Jika suatu koneksi berhenti melakukan refresh setelah sekitar 90 hari, impor ulang
koneksi tersebut untuk mendapatkan registrasi klien OIDC baru. Registrasi ulang otomatis saat
kedaluwarsa direncanakan sebagai peningkatan di masa mendatang.

Koneksi API key tidak memiliki masa kedaluwarsa klien OIDC karena koneksi tersebut tidak melakukan refresh
melalui AWS SSO OIDC.

---

## Pemecahan Masalah

### Akun kedua terus ter-logout

- Periksa kedua koneksi di **Dashboard → Providers** dan pastikan masing-masing menampilkan
  `clientId` yang bukan null dalam JSON mentahnya (dapat dilihat melalui ikon info). Jika salah satu koneksi tidak memiliki
  `clientId`, koneksi tersebut diimpor sebelum v3.8.0 — impor ulang koneksi tersebut.

### Impor gagal dengan pesan "Token validation failed"

- Pastikan refresh token diawali dengan `aorAAAAAG`.
- Pastikan OmniRoute dapat mengakses `https://oidc.us-east-1.amazonaws.com` (atau region yang
  dikonfigurasi). Jika Anda berada di balik proxy perusahaan, atur proxy tingkat provider di
  **Dashboard → Settings → Proxies**.

### Impor API key gagal

- Pastikan key tersebut adalah API key Kiro / CodeWhisperer, bukan refresh token.
- Pastikan region AWS sesuai dengan key/akun. `us-east-1` adalah nilai default.
- Key harus dapat memanggil `ListAvailableProfiles`; jika tidak, OmniRoute tidak dapat
  menemukan `profileArn` yang diperlukan.

Untuk masalah lainnya, lihat [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) utama.
