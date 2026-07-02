# Panduan Deployment OmniRoute di Fly.io

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../te/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

Dokumen ini menjelaskan metode deployment OmniRoute di Fly.io yang telah terbukti berhasil, mencakup dua skenario utama:

- Deployment pertama kali proyek saat ini ke Fly.io
- Publikasi setelah pembaruan kode berikutnya
- Referensi alur deployment yang sama untuk proyek baru

Dokumen ini disusun berdasarkan konfigurasi yang telah diverifikasi pada proyek saat ini, dengan nama aplikasi `omniroute`.

---

## 1. Target Deployment

- Platform: Fly.io
- Metode deployment: Publikasi langsung dari lokal menggunakan `flyctl`
- Cara menjalankan: Menggunakan `Dockerfile` dan `fly.toml` yang sudah ada di repositori
- Persistensi data: Fly Volume yang dipasang ke `/data`
- Alamat akses: `https://omniroute.fly.dev/`

---

## 2. Konfigurasi Kunci Proyek Saat Ini

`fly.toml` di repositori saat ini telah dikonfirmasi mengandung item-item kunci berikut:

```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
  source = 'data'
  destination = '/data'

[processes]
  app = 'node run-standalone.mjs'

[http_service]
  internal_port = 20128

[env]
  TZ = "Asia/Shanghai"
  HOST = "0.0.0.0"
  HOSTNAME = "0.0.0.0"
  BIND = "0.0.0.0"
```

Keterangan:

- `app = 'omniroute'` menentukan aplikasi Fly mana yang menjadi target deployment
- `destination = '/data'` menentukan direktori pemasangan volume persisten
- Proyek ini mengharuskan `DATA_DIR=/data` disetel; jika tidak, database dan kunci rahasia akan ditulis ke direktori sementara kontainer

---

## 3. Alat yang Diperlukan

### 3.1 Instalasi Fly CLI

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Jika skrip instalasi gagal di lingkungan saat ini, Anda juga dapat mengunduh biner `flyctl` secara manual dan menempatkannya di `PATH`.

### 3.2 Login ke Akun Fly

```powershell
flyctl auth login
```

### 3.3 Periksa Status Login

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Deployment Pertama Kali untuk Proyek Saat Ini

### 4.1 Ambil Kode dan Masuk ke Direktori

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Konfirmasi Nama Aplikasi

Buka `fly.toml` dan perhatikan baris berikut:

```toml
app = 'omniroute'
```

Jika Anda berencana melakukan deployment ke aplikasi baru milik sendiri, ubah menjadi nama yang unik secara global, misalnya:

```toml
app = 'omniroute-yourname'
```

Catatan:

- Di konsol, pastikan Anda melihat aplikasi yang sesuai dengan nilai `app` di `fly.toml`
- Jika sebelumnya Anda menggunakan nama lain seperti `oroute`, jangan sampai tertukar dengan `omniroute`

### 4.3 Buat Aplikasi

Jika aplikasi belum ada:

```powershell
flyctl apps create omniroute
```

Jika Anda sudah mengganti nama aplikasi, ganti `omniroute` dengan nama Anda.

### 4.4 Deployment Pertama

```powershell
flyctl deploy
```

---

## 5. Parameter yang Wajib Dikonfigurasi

Berikut adalah parameter minimum yang direkomendasikan untuk proyek ini di Fly.io.

### 5.1 Parameter yang Telah Diverifikasi

Parameter-parameter berikut telah digunakan secara nyata pada aplikasi `omniroute` saat ini:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`

### 5.2 Tentang `INITIAL_PASSWORD`

Proyek saat ini tidak menyetel `INITIAL_PASSWORD` karena deployment ini tidak memerlukannya.

Jika tidak disetel:

- Log startup akan menampilkan bahwa kata sandi default adalah `CHANGEME`
- Setelah deployment, segera ubah kata sandi login di pengaturan sistem

Jika Anda ingin menginisialisasi kata sandi panel admin secara otomatis, Anda dapat menambahkannya nanti:

- `INITIAL_PASSWORD`

---

## 6. Penjelasan Parameter yang Direkomendasikan

### 6.1 Konfigurasi di Secrets

Parameter yang disarankan untuk disimpan sebagai Fly Secrets:

| Nama Variabel            | Direkomendasikan | Keterangan                                      |
| ------------------------ | ---------------- | ----------------------------------------------- |
| `API_KEY_SECRET`         | Wajib            | Digunakan untuk pembuatan dan validasi API Key  |
| `JWT_SECRET`             | Wajib            | Digunakan untuk sesi login dan tanda tangan JWT |
| `STORAGE_ENCRYPTION_KEY` | Sangat Direkomendasikan | Mengenkripsi informasi koneksi sensitif  |
| `MACHINE_ID_SALT`        | Direkomendasikan | Menghasilkan identifikasi mesin yang stabil     |
| `INITIAL_PASSWORD`       | Opsional         | Menentukan kata sandi awal panel admin saat deployment pertama |
| Kredensial OAuth/API     | Sesuai kebutuhan | Konfigurasi autentikasi untuk berbagai platform eksternal |

### 6.2 Nilai yang Direkomendasikan untuk Proyek Saat Ini

| Nama Variabel          | Nilai yang Direkomendasikan    |
| ---------------------- | ------------------------------ |
| `DATA_DIR`             | `/data`                        |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev`    |

Keterangan:

- `DATA_DIR=/data` sangat krusial dan harus sesuai dengan titik pemasangan Fly Volume
- `NEXT_PUBLIC_BASE_URL` digunakan dalam skenario seperti penjadwal dan callback frontend

---

## 7. Penyetelan Parameter Sekaligus

Perintah berikut akan menghasilkan nilai acak yang aman dan menulis semua parameter yang dibutuhkan proyek saat ini ke Fly Secrets dalam satu langkah.

Keterangan:

- Tidak menyertakan `INITIAL_PASSWORD`
- Berlaku untuk proyek saat ini yaitu `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

Jika Anda juga ingin menambahkan kata sandi awal:

```powershell
flyctl secrets set INITIAL_PASSWORD=kata-sandi-kuat-anda -a omniroute
```

---

## 8. Melihat Parameter Saat Ini

```powershell
flyctl secrets list -a omniroute
```

Jika halaman `Secrets` di konsol tidak menampilkan variabel yang Anda harapkan, periksa terlebih dahulu:

- Apakah aplikasi yang sedang dilihat adalah `omniroute`
- Apakah nilai `app` di `fly.toml` sudah sesuai dengan aplikasi di konsol

---

## 9. Pembaruan dan Publikasi Selanjutnya

Setelah ada pembaruan kode, langkah publikasinya sangat sederhana:

```powershell
git pull
flyctl deploy
```

Jika hanya memperbarui parameter tanpa mengubah kode:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly akan melakukan pembaruan mesin secara otomatis dengan rolling update.

### 9.1 Melacak Pembaruan Repositori Asal dan Mempertahankan `fly.toml` dari Fork

Jika repositori saat ini adalah fork dan Anda ingin menyinkronkan pembaruan dari upstream `https://github.com/diegosouzapw/OmniRoute`, ikuti alur berikut.

Pertama, konfirmasi remote yang ada:

```powershell
git remote -v
```

Harus mengandung setidaknya:

- `origin` yang mengarah ke fork milik Anda
- `upstream` yang mengarah ke repositori asal

Jika belum ada `upstream`, tambahkan terlebih dahulu:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Sebelum menyinkronkan upstream, ambil commit dan tag terbaru:

```powershell
git fetch upstream --tags
```

Lihat versi saat ini dan tag upstream:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

Jika Anda ingin menggabungkan `main` upstream terbaru sambil mempertahankan `fly.toml` fork saat ini secara paksa, ikuti alur berikut:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Keterangan:

- `git merge upstream/main` digunakan untuk menyinkronkan kode terbaru dari repositori asal
- `git checkout HEAD~1 -- fly.toml` digunakan untuk memulihkan `fly.toml` fork Anda sebelum penggabungan
- Jika upstream tidak mengubah `fly.toml`, langkah ini tidak akan menimbulkan perbedaan tambahan
- Jika upstream mengubah `fly.toml`, langkah ini memastikan konfigurasi deployment kustom fork Anda seperti nama aplikasi Fly, volume pemasangan, dan region tidak tertimpa

Jika Anda hanya ingin menyejajarkan dengan tag rilis tertentu, misalnya `v3.4.7`, konfirmasi terlebih dahulu apakah tag tersebut sudah tercakup dalam `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Jika berhasil, berarti `upstream/main` sudah mengandung versi tersebut dan Anda dapat langsung menggabungkan `upstream/main`.

### 9.2 Urutan Publikasi Standar Setelah Sinkronisasi Upstream

Setelah selesai menyinkronkan repositori asal, ikuti urutan publikasi berikut:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Pulihkan `fly.toml` dari fork
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Inilah alur yang digunakan saat proyek ini diperbarui ke `v3.4.7`.

---

## 10. Pemeriksaan Setelah Deployment

### 10.1 Lihat Status Aplikasi

```powershell
flyctl status -a omniroute
```

### 10.2 Lihat Log Startup

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Periksa Aksesibilitas Situs

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

Jika mengembalikan `200`, berarti situs sudah merespons dengan normal.

---

## 11. Indikator Keberhasilan

Setelah deployment berhasil, Anda seharusnya melihat konten seperti berikut di log:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Dua poin ini sangat penting:

- `/data/server.env` menunjukkan bahwa kunci rahasia runtime telah tersimpan ke volume persisten
- `/data/storage.sqlite` menunjukkan bahwa database telah ditulis ke volume persisten

Jika yang Anda lihat adalah `/app/data/...`, berarti `DATA_DIR` tidak dikonfigurasi dengan benar dan harus segera diperbaiki.

---

## 12. Masalah Umum

### 12.1 Halaman `Secrets` Kosong

Biasanya ada dua penyebab:

- Anda belum menjalankan `flyctl secrets set`
- Anda membuka aplikasi yang salah, misalnya `oroute`, bukan `omniroute`

### 12.2 `flyctl deploy` Melaporkan `app not found`

Buat aplikasinya terlebih dahulu:

```powershell
flyctl apps create omniroute
```

### 12.3 Parsing `fly.toml` Gagal

Periksa secara khusus:

- Apakah ada karakter tidak valid di dalam komentar
- Apakah tanda kutip dan indentasi TOML sudah benar

### 12.4 Data Tidak Tersimpan Secara Persisten

Periksa dua hal berikut:

- Apakah `destination = '/data'` ada di `fly.toml`
- Apakah `DATA_DIR` sudah disetel ke `/data`

### 12.5 Apakah Bisa Berjalan Tanpa Menyetel `INITIAL_PASSWORD`

Bisa berjalan, tetapi akan menggunakan kata sandi default `CHANGEME`. Untuk lingkungan produksi, disarankan untuk segera mengubah kata sandi panel admin.

---

## 13. Rekomendasi untuk Penggunaan Ulang pada Proyek Baru

Jika di kemudian hari Anda melakukan deployment proyek baru mengikuti panduan ini, setidaknya ubah item-item berikut:

1. Ubah nilai `app` di `fly.toml`
2. Ubah `NEXT_PUBLIC_BASE_URL`
3. Pertahankan `DATA_DIR=/data`
4. Buat ulang `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT`, dan `STORAGE_ENCRYPTION_KEY`
5. Setelah deployment pertama, periksa log apakah data sudah ditulis ke `/data`

Jangan gunakan ulang kunci dari proyek lama.

---

## 14. Daftar Periksa Publikasi Minimal untuk Proyek Saat Ini

Berikut adalah perintah yang paling sering digunakan untuk proyek saat ini:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Untuk publikasi rutin biasa, perintah intinya adalah:

```powershell
flyctl deploy
```

Untuk deployment pertama di lingkungan baru, langkah intinya adalah:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
