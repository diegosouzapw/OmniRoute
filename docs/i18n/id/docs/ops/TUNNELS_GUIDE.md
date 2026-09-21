# Tunnels Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sumber acuan:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute dapat mengekspos server lokalnya (`http://localhost:20128`) ke internet
publik melalui tiga backend tunnel. Ini berguna untuk:

- Callback OAuth dari penyedia cloud (Antigravity, Gemini, Cursor) yang memerlukan
  URL pengalihan yang dapat diakses secara publik.
- Membagikan instans lokal Anda kepada rekan satu tim tanpa menerapkan VM.
- Pengujian melalui perangkat seluler, jarak jauh, atau lintas jaringan.

Ketiga backend dikelola di dalam proses — OmniRoute memulai/menghentikan biner
atau SDK yang mendasarinya dari dasbor atau REST API. Tidak diperlukan penyiapan
reverse proxy atau systemd.

## Ringkasan backend

| Backend                     | Persistensi                                                  | Biaya                           | Penyiapan                                                  |
| --------------------------- | ------------------------------------------------------------ | ------------------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Sementara (URL berubah setiap kali dimulai ulang)            | Gratis                          | Tanpa penyiapan — menginstal `cloudflared` secara otomatis |
| **ngrok**                   | Stabil selama paket berbayar atau domain tetap dikonfigurasi | Tingkat gratis + berbayar       | Memerlukan akun ngrok + authtoken                          |
| **Tailscale Funnel**        | Stabil per node dalam tailnet Anda                           | Gratis untuk penggunaan pribadi | Memerlukan instalasi Tailscale + login + ACL Funnel        |

Implementasinya berada di `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, dan `src/lib/tailscaleTunnel.ts`. Ketiganya mengembalikan
objek `status` dengan bentuk yang sama dan memiliki bidang `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl`, dan `lastError`, sehingga dasbor dapat merendernya secara seragam.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` menjalankan `cloudflared` sebagai proses anak. Ini mendukung
dua mode, yang dipilih berdasarkan apakah konfigurasi named tunnel disediakan:

- **Quick tunnel (default).** Menjalankan `cloudflared tunnel --url
http://localhost:<apiPort>` dan mengurai URL `*.trycloudflare.com` yang ditetapkan
  dari stdout. URL bersifat sementara dan berubah setiap kali dimulai ulang.
- **Named tunnel (opsional).** Ketika `CLOUDFLARED_CONFIG` menunjuk ke
  `config.yml` cloudflared yang dikelola secara lokal, OmniRoute menjalankan `cloudflared tunnel --no-autoupdate
--config <path> run`, sehingga Anda mendapatkan **hostname bernama yang stabil**. Konfigurasi
  menyediakan UUID tunnel, `credentials-file`, dan perutean `ingress`, sehingga
  `--url` tidak diteruskan dan token dasbor Zero Trust tidak diperlukan. `run` membaca
  kredensial dari path absolut `credentials-file` dalam konfigurasi — `cert.pem` tidak
  diperlukan (berkas tersebut hanya digunakan untuk pengelolaan siklus hidup tunnel).

Perilaku utama:

- **Instalasi otomatis.** Saat pertama kali digunakan, OmniRoute mengunduh biner
  `cloudflared` terbaru dari rilis GitHub resmi (instalasi terkelola berada di bawah
  `DATA_DIR/cloudflared/`). SHA256 aset yang diunduh diverifikasi terhadap manifes
  rilis sebelum dieksekusi.
- **Supervisi proses.** PID cloudflared dan URL yang telah ditentukan disimpan ke
  `quick-tunnel-state.json` sehingga dasbor dapat melanjutkan status setelah dimuat ulang.

### Penyiapan named tunnel (hostname stabil)

1. Buat tunnel yang dikelola secara lokal dengan CLI cloudflared (satu kali):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Buat `~/.cloudflared/config.yml` yang merutekan hostname Anda ke port API lokal
   OmniRoute (default 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Arahkan OmniRoute ke konfigurasi tersebut dan mulai (ulang) tunnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opsional — mengganti hostname yang dilaporkan OmniRoute; jika tidak, dibaca dari
   # aturan ingress pertama dalam konfigurasi:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Aktifkan tunnel dengan cara yang sama seperti quick tunnel (REST / dasbor / CLI
   di bawah). Named tunnel tidak memancarkan URL publik untuk diekstrak, sehingga kesiapan
   dideteksi dari koneksi edge cloudflared yang telah terdaftar, dan `publicUrl`/`apiUrl`
   dilaporkan dari `CLOUDFLARED_HOSTNAME` (atau hostname ingress pertama dalam konfigurasi).

### Mengaktifkan / menonaktifkan melalui REST

Endpoint menggunakan isi `{action: "enable" | "disable"}`, bukan path
`start`/`stop` yang terpisah. Autentikasi pengelolaan (sesi admin atau kunci API admin)
diperlukan.

```bash
# Aktifkan
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Nonaktifkan
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Atau melalui dasbor: **Settings → Tunnels → Cloudflare**.

### Variabel lingkungan opsional

| Variabel                                             | Tujuan                                                                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | Menimpa path biner. Jika ditetapkan dan valid, OmniRoute akan menggunakannya alih-alih mengunduhnya.                                                                                 |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protokol transportasi (default `http2`; juga mendukung `quic`, `auto`).                                                                                                              |
| `CLOUDFLARED_CONFIG`                                 | Path ke `config.yml` cloudflared yang dikelola secara lokal. Jika ditetapkan, OmniRoute menjalankan tunnel **bernama/persisten** (`tunnel --config <path> run`), bukan tunnel cepat. |
| `CLOUDFLARED_HOSTNAME`                               | Menimpa hostname publik yang dilaporkan oleh tunnel bernama (misalnya, `ai.example.com`). Jika tidak ditetapkan, nilainya dibaca dari hostname `ingress` pertama pada konfigurasi.   |

## 2. ngrok

`src/lib/ngrokTunnel.ts` menggunakan **SDK `@ngrok/ngrok`** (dalam proses, tanpa
subproses CLI). Modul native diimpor secara lazy saat pertama kali dijalankan agar platform
tanpa biner siap pakai tidak menyebabkan aplikasi gagal saat boot.

### Prasyarat

1. Daftar di <https://ngrok.com>.
2. Salin authtoken Anda dari dasbor ngrok.
3. Berikan token tersebut melalui salah satu cara berikut:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, atau
   - Dasbor: **Settings → Tunnels → ngrok**, atau
   - Body REST (sekali pakai): `{"action":"enable","authToken":"<token>"}`.

Jika keduanya tidak dikonfigurasi, status akan mengembalikan `phase: "needs_auth"`.

### Mengaktifkan / menonaktifkan melalui REST

```bash
# Aktifkan (menggunakan NGROK_AUTHTOKEN dari lingkungan)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Aktifkan dengan token inline
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Nonaktifkan
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Respons menyertakan `publicUrl` yang ditetapkan (misalnya
`https://abcd-1234.ngrok-free.app`). Domain kustom, wilayah, dan aturan kebijakan
harus dikonfigurasi di dasbor ngrok — OmniRoute sendiri hanya meneruskan URL
target lokal ke SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` mengorkestrasi CLI sistem `tailscale` untuk mengekspos
port API lokal melalui **Funnel** (akses keluar internet publik Tailscale untuk serve).
Implementasi ini mendukung seluruh siklus hidup: instalasi, login, memulai daemon, mengaktifkan, dan menonaktifkan.

Implementasi ini menjalankan `tailscale funnel --bg <port>` (mode latar belakang). URL
publik memiliki format `https://<machine>.<tailnet>.ts.net/`.

### Prasyarat

1. Instal Tailscale (atau biarkan OmniRoute melakukannya — lihat endpoint `install` di bawah).
2. Masuk (`tailscale login` atau melalui endpoint `login` milik OmniRoute).
3. Aktifkan Funnel untuk tailnet Anda di konsol admin Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Di Linux dan macOS, daemon (`tailscaled`) memerlukan `sudo` agar dapat dikontrol. Endpoint
POST menerima kolom opsional `sudoPassword` yang diteruskan ke
cache kata sandi MITM OmniRoute (`getCachedPassword` / `setCachedPassword`) selama
pemanggilan berlangsung. Windows menggunakan instalasi layanan default di
`C:\Program Files\Tailscale\tailscale.exe`.

### Endpoint REST

Tailscale memiliki cakupan yang lebih luas daripada backend lainnya karena instalasi,
login, daemon, dan tunnel merupakan aspek yang terpisah.

| Endpoint                              | Metode | Tujuan                                                                   |
| ------------------------------------- | ------ | ------------------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | Status tunnel gabungan (`phase`, `tunnelUrl`, `apiUrl`, dll.)            |
| `/api/tunnels/tailscale/check`        | `GET`  | Pemeriksaan tingkat rendah: terinstal? sudah login? daemon berjalan?     |
| `/api/tunnels/tailscale/install`      | `POST` | Instal Tailscale (peristiwa progres dialirkan melalui SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Mulai `tailscaled` di Linux/macOS                                        |
| `/api/tunnels/tailscale/login`        | `POST` | Mulai alur login; mengembalikan `authUrl` untuk dibuka di browser        |
| `/api/tunnels/tailscale/enable`       | `POST` | Mulai Funnel untuk port API                                              |
| `/api/tunnels/tailscale/disable`      | `POST` | Hentikan Funnel                                                          |

Semua endpoint Tailscale memerlukan autentikasi manajemen (lihat `routeUtils.ts ::
requireTailscaleAuth`).

Contoh pengaktifan:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jika Funnel tidak diaktifkan di konsol admin, respons akan menyertakan
`funnelNotEnabled: true` beserta `enableUrl` untuk dibuka di browser.

### Variabel lingkungan opsional

| Variabel        | Tujuan                       |
| --------------- | ---------------------------- |
| `TAILSCALE_BIN` | Ganti path biner `tailscale` |

## Ringkasan endpoint

| Endpoint                              | Metode | Body                                | Autentikasi |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | manajemen   |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | manajemen   |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | manajemen   |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | manajemen   |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | manajemen   |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | manajemen   |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | manajemen   |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | manajemen   |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | manajemen   |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | manajemen   |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | manajemen   |

Tidak ada endpoint pusat `/api/settings/tunnels` — setiap backend bersifat
independen.

## Pertimbangan callback OAuth

Saat Anda mengekspos OmniRoute melalui tunnel, dashboard dan alur OAuth harus
membuat URL callback berdasarkan nama host **publik**, bukan `localhost`. Jika
tidak, penyedia OAuth akan mengarahkan pengguna kembali ke URL yang tidak dapat
dijangkau oleh servernya sehingga proses handshake gagal.

Pengeditan dashboard dan penyimpanan pengaturan tidak mengharuskan nama host tunnel
ditetapkan secara permanen dalam `NEXT_PUBLIC_BASE_URL`. Dashboard yang telah
diautentikasi mengirim permintaan unsafe dari origin yang sama dengan token CSRF
yang terikat pada sesi, sehingga host Cloudflare Quick Tunnel yang temporer tetap
dapat digunakan untuk pengelolaan UI normal setelah login.

Tetapkan:

```bash
NEXT_PUBLIC_BASE_URL=https://<host-tunnel-Anda>
```

lalu mulai ulang OmniRoute sebelum memulai OAuth. Untuk Cloudflare Quick Tunnel
yang temporer, URL berubah setelah setiap kali dimulai ulang. Oleh karena itu,
untuk penggunaan OAuth produksi, sebaiknya gunakan ngrok dengan domain yang
dicadangkan atau Tailscale Funnel.

## Kesehatan dan pemantauan

Dashboard menampilkan status tunnel di **Pengaturan → Tunnel**:

- Backend aktif dan `phase` saat ini (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL publik saat ini dan URL API yang diturunkan (`<publicUrl>/v1`).
- URL target lokal yang menjadi tujuan penerusan tunnel.
- Pesan kesalahan terakhir, jika ada.

Untuk pemantauan terprogram, lakukan polling pada endpoint `GET` masing-masing
backend. Menjalankan lebih dari satu backend secara bersamaan diperbolehkan;
OmniRoute akan melacak masing-masing secara independen.

## Pemecahan masalah

### "binary cloudflared tidak ditemukan"

OmniRoute mencoba melakukan instalasi otomatis saat pertama kali digunakan. Jika
instalasi diblokir (jaringan terbatas, tidak ada akses GitHub), unduh
`cloudflared` secara manual dari
<https://github.com/cloudflare/cloudflared/releases> dan tetapkan
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken diperlukan"

`phase: "needs_auth"` berarti tidak ada authtoken yang ditemukan. Tetapkan
`NGROK_AUTHTOKEN` dalam `.env`, konfigurasikan melalui dashboard, atau teruskan
`authToken` dalam body POST untuk mengaktifkannya.

### "tailscale: funnel tidak diaktifkan"

Jika respons aktivasi menyertakan `funnelNotEnabled: true`, Funnel dinonaktifkan
untuk tailnet Anda. Buka `enableUrl` yang dikembalikan (atau halaman fitur
konsol admin), lalu aktifkan Funnel.

### Perubahan URL tunnel merusak OAuth

Gunakan ngrok dengan domain yang dicadangkan atau Tailscale Funnel (keduanya
stabil per node). Cloudflare Quick Tunnel bersifat temporer secara bawaan dan
tidak disarankan untuk callback OAuth jangka panjang.

### Izin ditolak di Linux/macOS untuk Tailscale

`tailscaled` memerlukan akses root. Berikan `sudoPassword` ke endpoint POST yang
relevan, atau jalankan daemon sendiri (`sudo systemctl start tailscaled`).

## Lihat juga

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proksi keluar (1proxy, SOCKS5, HTTP) untuk
  lalu lintas keluar.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — daftar lengkap variabel lingkungan termasuk
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatif selain tunneling untuk hosting
  publik yang stabil.
- Sumber: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
