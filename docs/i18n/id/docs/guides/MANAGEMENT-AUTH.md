# Management Authentication (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute memiliki **empat keluarga kredensial** yang dapat mengotorisasi rute manajemen.
Kredensial tersebut tidak dapat saling dipertukarkan. Kunci API inferensi (`sk-…`) **tidak** dapat mengelola
server kecuali secara eksplisit telah diberi cakupan `manage` atau `admin`.

Implementasi kanonis: `src/lib/api/requireManagementAuth.ts`.

| Kredensial              | Bentuk umum                            | Dibuat di                                             | Tujuan penggunaan                | Kemampuan manajemen                                                                            |
| ----------------------- | -------------------------------------- | ----------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Sesi JWT Dashboard      | cookie `auth_token`                    | Login Dashboard                                       | Antarmuka browser                | Manajemen dashboard penuh, tunduk pada aturan CSRF, lokalitas, dan rute yang selalu dilindungi |
| Token machine-id CLI    | internal / lokal                       | Bootstrap CLI (`omniroute` pada mesin yang sama)      | CLI lokal                        | Hanya manajemen lokal                                                                          |
| Access Token bercakupan | `oma_live_…`                           | **Settings → Access Tokens** atau `omniroute connect` | CLI jarak jauh dan API manajemen | Harus memenuhi cakupan `read`, `write`, atau `admin` yang diwajibkan oleh rute                 |
| Kunci API inferensi     | `sk-…` (dan prefiks kunci API lainnya) | **API Manager / API Keys**                            | Inferensi `/v1/*`                | **Tidak ada** kecuali metadata kunci menyertakan `manage` atau `admin`                         |

Kredensial `oma_` adalah kredensial manajemen/CLI. Kredensial tersebut **bukan** kunci API inferensi.

Jika autentikasi login/kunci API dinonaktifkan untuk server, beberapa rute manajemen mungkin
menerima panggilan tanpa autentikasi. Rute khusus lokal dan rute yang selalu dilindungi tetap
menerapkan aturannya masing-masing. Oleh karena itu, memberikan salah satu kredensial ini tidak selalu
wajib, dan memilikinya tidak selalu cukup tanpa cakupan yang diperlukan dan lokalitas
rute yang sesuai.

Terkait: [Mode Jarak Jauh](./REMOTE-MODE.md) (cara `oma_live_…` diterbitkan untuk CLI jarak jauh).

---

## Matriks cakupan

Kedua kosakata cakupan ini **berbeda**. Jangan mencampuradukkannya.

### Cakupan Access Token (`oma_live_…`)

| Cakupan | Operasi umum                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------- |
| `read`  | GET daftar/status yang diizinkan untuk dilihat oleh token                                                 |
| `write` | Mutasi (buat/perbarui/hapus) di bawah tingkat admin                                                       |
| `admin` | CLI jarak jauh penuh / token koneksi (bootstrap dengan kata sandi menggunakan cakupan ini secara default) |

Token dengan `read` tidak dapat memanggil rute `write`. Bentuk pesan runtime:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Cakupan manajemen kunci API

| Cakupan     | Arti                                                                              |
| ----------- | --------------------------------------------------------------------------------- |
| (tidak ada) | Hanya inferensi. Rute manajemen mengembalikan 403.                                |
| `manage`    | API manajemen (gerbang yang sama dengan cabang kunci API `requireManagementAuth`) |
| `admin`     | Juga memenuhi `hasManageScope` (diperlakukan sebagai mampu melakukan manajemen)   |

Aktifkan `manage` pada kunci di antarmuka API Keys / API Manager. Jangan gunakan kembali
kunci klien obrolan untuk otomatisasi kecuali Anda sengaja memberikan cakupan tersebut.

---

## Cara membuat dan mencabut

### Sesi JWT Dashboard

1. Buka `/login`, lalu masuk dengan kata sandi manajemen (`INITIAL_PASSWORD` saat boot pertama).
2. Cookie `auth_token` bersifat HttpOnly. Dashboard browser menggunakannya secara otomatis.
3. Keluar melalui `/api/auth/logout`. Tidak ada rahasia berumur panjang yang perlu disalin.

### Token machine-id CLI

1. Jalankan `omniroute` pada **host yang sama** dengan server (loopback).
2. CLI melakukan bootstrap token machine-id di bawah `~/.omniroute/` (chmod 600).
3. Ini **tidak** berfungsi dari mesin lain. Gunakan Access Token untuk CLI jarak jauh.

### Access Token bercakupan (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → buat (nama + cakupan). **Rahasia hanya ditampilkan sekali.**
2. Atau CLI: `omniroute connect <host>` (kata sandi → token). Lihat [Mode Jarak Jauh](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Cabut dari halaman Access Tokens yang sama (atau hapus konteks CLI).
5. Server hanya menyimpan hash. Perlakukan teks biasa seperti kata sandi.

### Kunci API bercakupan manage

1. Dashboard: **API Manager / API Keys** → buat atau edit kunci → aktifkan `manage` (atau `admin`).
2. Header: `Authorization: Bearer sk-…` (prefiks aktual kunci tersebut).
3. Cabut atau hapus `manage` di antarmuka yang sama.
4. Hak akses minimum untuk otomatisasi yang bukan CLI: utamakan Access Token `read` untuk pekerjaan yang hanya menggunakan GET; gunakan `manage` pada kunci API hanya jika pemanggil juga harus berkomunikasi dengan `/v1` dan manajemen.

---

## Format header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Jangan letakkan kredensial manajemen di path URL atau query string. Autentikasi
manajemen hanya menggunakan header/cookie.

---

## Contoh siap salin-tempel

Hanya baca (menampilkan daftar penyedia). Gunakan Access Token `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modifikasi (membuat koneksi penyedia). Gunakan Access Token `write`/`admin` atau
API key dengan scope `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferensi (bukan manajemen). API key biasa, tidak memerlukan `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Error runtime saat ini (jangan tampilkan rahasia)

| Situasi                                             | Status umum | Pesan (disanitasi)                                                   |
| --------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| Tidak ada kredensial                                | 401         | `Authentication required`                                            |
| `oma_live_…` tidak valid/kedaluwarsa                | 401         | `Invalid or expired access token`                                    |
| API key valid tanpa `manage`/`admin`                | 403         | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| API key biasa yang tidak valid pada route manajemen | 403         | `Invalid management token`                                           |
| Scope Access Token terlalu rendah                   | 403         | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" berarti bearer tersebut **tidak** diterima sebagai
kredensial manajemen. Pesan ini **tidak** menunjukkan jenis kredensial mana yang
harus dibuat. Gunakan tabel di atas: key inferensi memerlukan scope `manage`;
CLI jarak jauh memerlukan `oma_live_…`; dashboard menggunakan cookie sesi.

---

## Pilihan hak akses minimum yang direkomendasikan

| Pemanggil                                                   | Gunakan                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| Browser                                                     | Sesi dashboard                                          |
| CLI pada host server                                        | Token mesin                                             |
| CLI pada laptop yang berkomunikasi dengan server jarak jauh | `oma_live_…` dari `omniroute connect`                   |
| CI / skrip (khusus manajemen)                               | `oma_live_…` dengan scope terkecil yang dapat digunakan |
| CI yang harus memanggil `/v1` dan `/api`                    | API key dengan `manage` **atau** dua kredensial         |
