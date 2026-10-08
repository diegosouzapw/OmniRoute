# Kiro Setup Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Panduan ini merangkumi cara menambahkan akaun Kiro (pembantu pengekodan AI yang dihoskan oleh AWS) kepada OmniRoute,
dengan tumpuan pada menjalankan berbilang akaun secara serentak tanpa konflik sesi.

---

## Latar Belakang: Mengapa Akaun Kiro Boleh Berkonflik

Bahagian belakang Kiro menggunakan pendaftaran klien AWS SSO OIDC untuk menjejaki sesi aktif.
Kekangan kritikalnya: **setiap pendaftaran klien OIDC hanya menyokong satu sesi aktif
pada satu-satu masa**. Apabila peranti atau pengguna kedua mengesahkan identiti menggunakan
klien berdaftar yang sama, bahagian belakang membatalkan token segar semula akaun pertama.

Ini ialah mekanisme yang sama yang menyebabkan masalah apabila menjalankan `kiro-cli login` pada
mesin yang telah pun dilog masuk dengan akaun Kiro lain — log masuk baharu akan membatalkan
token akaun pertama.

---

## Cara OmniRoute Menyelesaikan Masalah Ini (v3.8.0+)

Bermula dengan v3.8.0, OmniRoute memanggil `registerClient()` (AWS SSO OIDC) semasa setiap
import sambungan Kiro. Ini memberikan setiap sambungan OmniRoute pendaftaran klien OIDC
khususnya sendiri. Oleh sebab setiap pendaftaran klien adalah bebas, penyegaran atau
pengesahan semula satu akaun tidak menjejaskan token segar semula mana-mana akaun lain.

Pengasingan ini terpakai pada kaedah import token segar semula, manakala pengesahan kunci API
mengelakkan sesi penyegaran OIDC sepenuhnya:

| Kaedah import                                                | Status pengasingan                                                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Aliran kod peranti AWS Builder ID / IDC                      | Diasingkan sejak aliran kod peranti diperkenalkan                                                      |
| **Import Token** (tampalan token segar semula secara manual) | Diasingkan sejak v3.8.0                                                                                |
| **Log masuk sosial Google / GitHub**                         | Diasingkan sejak v3.8.0                                                                                |
| **Auto-Import** (SQLite kiro-cli)                            | Diasingkan sejak v3.8.0 (laluan SQLite telah pun diasingkan; sandaran cache SSO kini turut diasingkan) |
| **API Key** (kunci CodeWhisperer jangka panjang)             | Tiada sesi penyegaran; kunci disahkan dan disimpan sebagai bukti kelayakan pembawa                     |

---

## Nota Migrasi untuk Sambungan yang Dicipta Sebelum v3.8.0

Sambungan yang diimport sebelum v3.8.0 tidak mempunyai pendaftaran klien OIDC khusus
yang disimpan dalam `providerSpecificData`. Sambungan ini terus berfungsi tetapi menggunakan
titik akhir penyegaran pengesahan sosial yang dikongsi, yang bermaksud dua sambungan sedemikian
masih boleh saling membatalkan.

**Untuk mendapatkan pengasingan:** padamkan sambungan lama daripada **Papan Pemuka → Penyedia** dan
import semula menggunakan mana-mana aliran import yang disokong. Semua sambungan yang baru dicipta akan
menerima pendaftaran klien masing-masing secara automatik.

---

## Menambahkan Dua Akaun Kiro Secara Bersebelahan

### Prasyarat

- OmniRoute v3.8.0 atau lebih baharu.
- Akaun Kiro yang berfungsi (e-mel + kata laluan, log masuk Google atau GitHub).
- Akaun Kiro kedua, jika dikehendaki.

### Langkah 1: Import akaun pertama

1. Buka **Papan Pemuka → Penyedia → Tambah Penyedia → Kiro**.
2. Pilih salah satu:
   - **Import Token** — tampal token segar semula yang bermula dengan `aorAAAAAG`.
   - **API Key** — tampal kunci API Kiro / CodeWhisperer jangka panjang.
   - **Log masuk Google / GitHub** — lengkapkan aliran OAuth dalam pelayar.
   - **Auto-Import** — klik butang tersebut; OmniRoute membaca bukti kelayakan daripada
     pangkalan data kiro-cli setempat atau `~/.aws/sso/cache`.
3. Sambungan disimpan. Aliran token segar semula mendaftarkan klien OIDC khusus
   secara automatik. Aliran kunci API mengesahkan kunci dengan AWS dan tidak menyimpan token segar semula.

### Langkah 2: Import akaun kedua

Ulangi langkah 1 untuk akaun kedua. Oleh sebab setiap import mencipta pendaftaran klien
OIDC yang berasingan, kedua-dua sambungan diasingkan sepenuhnya.

### Langkah 3: Sahkan kedua-dua sambungan aktif

1. **Papan Pemuka → Penyedia** — kedua-dua sambungan Kiro sepatutnya menunjukkan status **Aktif**.
2. **Papan Pemuka → Kesihatan** — kedua-dua sambungan sepatutnya lulus pemeriksaan kesihatan token masing-masing.

### Langkah 4: Gunakan kombo untuk menghalakan antara akaun

Cipta kombo dengan kedua-dua sambungan sebagai sasaran untuk mengimbangi beban atau beralih kepada sambungan sandaran:

```
kiro/kiro-dev → kiro/kiro-pro
```

Lihat [FEATURES.md](./FEATURES.md) dan dokumentasi penghalaan untuk konfigurasi kombo.

---

## Pengguna Perusahaan / IDC

Untuk akaun AWS IAM Identity Center (IDC), gunakan aliran **kod peranti AWS Builder ID / IDC**
daripada **Papan Pemuka → Penyedia → Kiro → Kod Peranti**. Aliran kod peranti sentiasa
diasingkan sepenuhnya. Import semula tidak diperlukan untuk sambungan ini.

Pengguna perusahaan yang beroperasi di rantau AWS bukan lalai boleh menentukan rantau semasa
mengimport melalui API Import Token:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Medan `region` menggunakan nilai lalai `us-east-1` apabila tidak disertakan.

---

## Aliran Import Kunci API

Pengesahan kunci API adalah untuk kelayakan pembawa Kiro / AWS CodeWhisperer jangka panjang. Ia
tidak menggunakan penyegaran OAuth, maka pengesahan ini mengelakkan pembatalan sesi OIDC dikongsi.

### Papan Pemuka

1. Buka **Papan Pemuka -> Penyedia -> Kiro**.
2. Pilih **Kunci API**.
3. Tampalkan kunci API dan, jika mahu, rantau AWS (`us-east-1` secara lalai).
4. OmniRoute mengesahkan kunci dan menyimpan sambungan.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Kontrak Dalaman

Laluan API mengesahkan kunci dengan memanggil `KiroService.validateApiKey()`, yang
menggunakan `ListAvailableProfiles` terhadap titik akhir CodeWhisperer/Amazon Q yang sepadan
dengan rantau dan menentukan `profileArn`.

Sambungan yang disimpan menggunakan:

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

Pada masa jalan, `KiroExecutor.buildHeaders()` menghantar kunci sebagai
`Authorization: Bearer <key>` dan menambahkan `tokentype: API_KEY`. Panggilan kuota/profil
menggunakan penanda yang sama supaya AWS menganggap pembawa tersebut sebagai kunci API jangka
panjang dan bukannya token akses OIDC atau sosial.

---

## Tamat Tempoh Klien OIDC

Klien awam AWS SSO OIDC lazimnya tamat tempoh selepas 90 hari
(`clientSecretExpiresAt`). OmniRoute menyimpan cap masa ini dalam `providerSpecificData`
untuk tujuan kebolehcerapan. Jika sambungan berhenti membuat penyegaran selepas kira-kira 90 hari, import
semula sambungan untuk mendapatkan pendaftaran klien OIDC yang baharu. Pendaftaran semula secara automatik apabila
tamat tempoh dijejaki sebagai penambahbaikan akan datang.

Sambungan kunci API tidak mempunyai tamat tempoh klien OIDC kerana sambungan tersebut tidak membuat penyegaran
melalui AWS SSO OIDC.

---

## Penyelesaian Masalah

### Akaun kedua terus dilog keluar

- Semak kedua-dua sambungan dalam **Papan Pemuka → Penyedia** dan sahkan setiap sambungan memaparkan
  `clientId` bukan nol dalam JSON mentahnya (boleh dilihat melalui ikon maklumat). Jika mana-mana sambungan tidak mempunyai
  `clientId`, sambungan itu telah diimport sebelum v3.8.0 — import semula sambungan tersebut.

### Import gagal dengan "Pengesahan token gagal"

- Pastikan token penyegaran bermula dengan `aorAAAAAG`.
- Pastikan OmniRoute boleh mencapai `https://oidc.us-east-1.amazonaws.com` (atau rantau yang
  dikonfigurasikan). Jika anda berada di sebalik proksi korporat, tetapkan proksi peringkat penyedia dalam
  **Papan Pemuka → Tetapan → Proksi**.

### Import kunci API gagal

- Sahkan bahawa kunci tersebut ialah kunci API Kiro / CodeWhisperer, bukannya token penyegaran.
- Sahkan bahawa rantau AWS sepadan dengan kunci/akaun. `us-east-1` ialah nilai lalai.
- Kunci tersebut mestilah boleh memanggil `ListAvailableProfiles`; jika tidak, OmniRoute tidak dapat
  menentukan `profileArn` yang diperlukan.

Untuk isu lain, lihat [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) utama.
