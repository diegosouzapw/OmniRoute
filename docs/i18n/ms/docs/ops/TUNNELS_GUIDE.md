# Tunnels Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Sumber rujukan utama:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute boleh mendedahkan pelayan setempatnya (`http://localhost:20128`) kepada
internet awam melalui tiga bahagian belakang terowong. Ini berguna untuk:

- Panggil balik OAuth daripada penyedia awan (Antigravity, Gemini, Cursor) yang
  memerlukan URL ubah hala yang boleh dicapai secara awam.
- Berkongsi tika setempat anda dengan rakan sepasukan tanpa menggunakan VM.
- Pengujian mudah alih, jauh atau merentas rangkaian.

Ketiga-tiga bahagian belakang diurus dalam proses — OmniRoute memulakan/menghentikan
binari atau SDK yang mendasarinya daripada papan pemuka atau REST API. Tiada
konfigurasi proksi songsang atau systemd diperlukan.

## Ringkasan bahagian belakang

| Bahagian belakang           | Kegigihan                                                        | Kos                             | Persediaan                                               |
| --------------------------- | ---------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Sementara (URL berubah setiap kali dimulakan semula)             | Percuma                         | Tiada — memasang `cloudflared` secara automatik          |
| **ngrok**                   | Stabil apabila pelan berbayar atau domain tetap dikonfigurasikan | Peringkat percuma + berbayar    | Memerlukan akaun ngrok + authtoken                       |
| **Tailscale Funnel**        | Stabil bagi setiap nod dalam tailnet anda                        | Percuma untuk kegunaan peribadi | Memerlukan pemasangan Tailscale + log masuk + ACL Funnel |

Pelaksanaannya terletak dalam `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` dan `src/lib/tailscaleTunnel.ts`. Ketiga-tiganya
mengembalikan objek `status` dengan bentuk yang sama serta medan `phase`,
`running`, `publicUrl`, `apiUrl`, `targetUrl` dan `lastError`, supaya papan
pemuka boleh memaparkannya secara seragam.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` menjalankan `cloudflared` sebagai proses anak. Ia
menyokong dua mod, yang dipilih berdasarkan sama ada konfigurasi terowong bernama
disediakan:

- **Terowong pantas (lalai).** Menjalankan `cloudflared tunnel --url
http://localhost:<apiPort>` dan menghuraikan URL `*.trycloudflare.com` yang
  diperuntukkan daripada stdout. URL bersifat sementara dan berubah pada setiap
  permulaan semula.
- **Terowong bernama (pilihan).** Apabila `CLOUDFLARED_CONFIG` menunjuk kepada
  `config.yml` cloudflared yang diurus secara setempat, OmniRoute menjalankan
  `cloudflared tunnel --no-autoupdate --config <path> run`, yang memberikan anda
  **nama hos stabil yang dinamakan**. Konfigurasi tersebut membekalkan UUID
  terowong, `credentials-file` dan penghalaan `ingress`, jadi tiada `--url`
  dihantar dan tiada token papan pemuka Zero Trust diperlukan. `run` membaca
  bukti kelayakan daripada laluan mutlak `credentials-file` dalam konfigurasi —
  `cert.pem` tidak diperlukan (ia hanya digunakan untuk pengurusan kitar hayat
  terowong).

Tingkah laku utama:

- **Pemasangan automatik.** Pada penggunaan pertama, OmniRoute memuat turun
  binari `cloudflared` terkini daripada keluaran GitHub rasmi (pemasangan terurus
  terletak di bawah `DATA_DIR/cloudflared/`). SHA256 bagi aset yang dimuat turun
  disahkan menggunakan manifes keluaran sebelum pelaksanaan.
- **Penyeliaan proses.** PID cloudflared dan URL yang telah dikenal pasti
  disimpan dalam `quick-tunnel-state.json` supaya papan pemuka boleh menyambung
  semula status merentas muat semula.

### Persediaan terowong bernama (nama hos stabil)

1. Cipta terowong yang diurus secara setempat menggunakan CLI cloudflared
   (sekali sahaja):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Tulis `~/.cloudflared/config.yml` yang menghalakan nama hos anda ke port API
   setempat OmniRoute (lalai 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Halakan OmniRoute kepada konfigurasi tersebut dan mulakan (semula) terowong:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # pilihan — menggantikan nama hos yang dilaporkan oleh OmniRoute; jika tidak, dibaca daripada
   # peraturan ingress pertama dalam konfigurasi:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Dayakan terowong dengan cara yang sama seperti terowong pantas (REST / papan
   pemuka / CLI di bawah). Terowong bernama tidak memancarkan URL awam untuk
   diekstrak, jadi kesediaan dikesan daripada sambungan pinggir cloudflared yang
   telah didaftarkan, dan `publicUrl`/`apiUrl` dilaporkan daripada
   `CLOUDFLARED_HOSTNAME` (atau nama hos ingress pertama dalam konfigurasi).

### Dayakan / nyahdayakan melalui REST

Titik akhir menggunakan isi `{action: "enable" | "disable"}`, bukannya laluan
`start`/`stop` yang berasingan. Pengesahan pengurusan (sesi pentadbir atau kunci
API pentadbir) diperlukan.

```bash
# Dayakan
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Nyahdayakan
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Atau melalui papan pemuka: **Tetapan → Terowong → Cloudflare**.

### Pemboleh ubah persekitaran pilihan

| Pemboleh ubah                                        | Tujuan                                                                                                                                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | Mengatasi laluan binari. Jika ditetapkan dan sah, OmniRoute menggunakannya dan bukannya memuat turun.                                                                                                  |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protokol pengangkutan (lalai `http2`; turut menyokong `quic`, `auto`).                                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | Laluan ke `config.yml` cloudflared yang diurus secara setempat. Apabila ditetapkan, OmniRoute menjalankan terowong **bernama/berterusan** (`tunnel --config <path> run`) dan bukannya terowong pantas. |
| `CLOUDFLARED_HOSTNAME`                               | Mengatasi nama hos awam yang dilaporkan bagi terowong bernama (cth. `ai.example.com`). Apabila tidak ditetapkan, nama hos dibaca daripada `ingress` pertama dalam konfigurasi.                         |

## 2. ngrok

`src/lib/ngrokTunnel.ts` menggunakan **SDK `@ngrok/ngrok`** (dalam proses, tanpa subproses CLI). Modul asli diimport secara malas ketika dimulakan buat kali pertama supaya platform tanpa binari prabina tidak menyebabkan aplikasi gagal semasa but.

### Prasyarat

1. Daftar di <https://ngrok.com>.
2. Salin authtoken anda daripada papan pemuka ngrok.
3. Sediakannya melalui salah satu cara berikut:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, atau
   - Papan pemuka: **Settings → Tunnels → ngrok**, atau
   - Isi REST (sekali sahaja): `{"action":"enable","authToken":"<token>"}`.

Jika kedua-duanya tidak dikonfigurasikan, status akan mengembalikan `phase: "needs_auth"`.

### Dayakan / nyahdayakan melalui REST

```bash
# Dayakan (menggunakan NGROK_AUTHTOKEN daripada env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Dayakan dengan token sebaris
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Nyahdayakan
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Respons merangkumi `publicUrl` yang ditetapkan (contohnya
`https://abcd-1234.ngrok-free.app`). Domain tersuai, rantau dan peraturan dasar
mesti dikonfigurasikan dalam papan pemuka ngrok — OmniRoute sendiri hanya memajukan
URL sasaran setempat kepada SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` mengatur CLI sistem `tailscale` untuk mendedahkan
port API setempat melalui **Funnel** (laluan keluar internet awam Tailscale untuk serve).
Ia menyokong keseluruhan kitaran hayat: pemasangan, log masuk, permulaan daemon, pendayaan dan penyahdayaan.

Pelaksanaan ini menjalankan `tailscale funnel --bg <port>` (mod latar belakang). URL
awam mempunyai format `https://<machine>.<tailnet>.ts.net/`.

### Prasyarat

1. Pasang Tailscale (atau biarkan OmniRoute melakukannya — lihat titik akhir `install` di bawah).
2. Log masuk (`tailscale login` atau melalui titik akhir `login` OmniRoute).
3. Dayakan Funnel untuk tailnet anda dalam konsol pentadbir Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Pada Linux dan macOS, daemon (`tailscaled`) memerlukan `sudo` untuk dikawal. Titik akhir
POST menerima medan pilihan `sudoPassword` yang dimajukan kepada cache kata laluan MITM
OmniRoute (`getCachedPassword` / `setCachedPassword`) sepanjang tempoh panggilan tersebut.
Windows menggunakan pemasangan perkhidmatan lalai di
`C:\Program Files\Tailscale\tailscale.exe`.

### Titik akhir REST

Tailscale mempunyai permukaan yang lebih luas berbanding bahagian belakang lain kerana pemasangan,
log masuk, daemon dan terowong merupakan perkara yang berasingan.

| Titik akhir                           | Kaedah | Tujuan                                                                       |
| ------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Status terowong teragregat (`phase`, `tunnelUrl`, `apiUrl` dan lain-lain)    |
| `/api/tunnels/tailscale/check`        | `GET`  | Semakan aras rendah: dipasang? telah log masuk? daemon sedang berjalan?      |
| `/api/tunnels/tailscale/install`      | `POST` | Pasang Tailscale (peristiwa kemajuan distrim melalui SSE) — Linux/macOS      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Mulakan `tailscaled` pada Linux/macOS                                        |
| `/api/tunnels/tailscale/login`        | `POST` | Mulakan aliran log masuk; mengembalikan `authUrl` untuk dibuka dalam pelayar |
| `/api/tunnels/tailscale/enable`       | `POST` | Mulakan Funnel untuk port API                                                |
| `/api/tunnels/tailscale/disable`      | `POST` | Hentikan Funnel                                                              |

Semua titik akhir Tailscale memerlukan pengesahan pengurusan (lihat `routeUtils.ts ::
requireTailscaleAuth`).

Contoh pendayaan:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jika Funnel tidak didayakan dalam konsol pentadbir, respons akan merangkumi
`funnelNotEnabled: true` berserta `enableUrl` untuk dibuka dalam pelayar.

### Pemboleh ubah env pilihan

| Pemboleh ubah   | Tujuan                             |
| --------------- | ---------------------------------- |
| `TAILSCALE_BIN` | Gantikan laluan binari `tailscale` |

## Ringkasan endpoint

| Endpoint                              | Kaedah | Badan                               | Pengesahan |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | pengurusan |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | pengurusan |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | pengurusan |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | pengurusan |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | pengurusan |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | pengurusan |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | pengurusan |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | pengurusan |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | pengurusan |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | pengurusan |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | pengurusan |

Tiada endpoint pusat `/api/settings/tunnels` — setiap bahagian belakang adalah
bebas.

## Pertimbangan panggil balik OAuth

Apabila anda mendedahkan OmniRoute melalui terowong, papan pemuka dan aliran OAuth mesti
membina URL panggil balik menggunakan nama hos **awam**, bukan `localhost`. Jika tidak,
penyedia OAuth akan mengubah hala pengguna kembali ke URL yang tidak dapat dicapai oleh pelayannya,
dan jabat tangan akan gagal.

Pengeditan papan pemuka dan penyimpanan tetapan tidak memerlukan nama hos terowong ditetapkan dalam
`NEXT_PUBLIC_BASE_URL`. Papan pemuka yang disahkan menghantar permintaan tidak selamat
sama-asal dengan token CSRF yang terikat pada sesi, jadi hos Cloudflare Quick Tunnel
sementara masih boleh digunakan untuk pengurusan UI biasa selepas log masuk.

Tetapkan:

```bash
NEXT_PUBLIC_BASE_URL=https://<hos-terowong-anda>
```

dan mulakan semula OmniRoute sebelum memulakan OAuth. Untuk Cloudflare Quick
Tunnel sementara, URL berubah selepas setiap mula semula, jadi utamakan ngrok dengan domain
yang dikhaskan atau Tailscale Funnel untuk penggunaan OAuth dalam pengeluaran.

## Kesihatan dan pemantauan

Papan pemuka memaparkan keadaan terowong di bawah **Tetapan → Terowong**:

- Bahagian belakang yang aktif dan `phase` semasa (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- URL awam semasa dan URL API yang diterbitkan (`<publicUrl>/v1`).
- URL sasaran setempat yang menerima pemajuan daripada terowong.
- Mesej ralat terakhir, jika ada.

Untuk pemantauan secara pengaturcaraan, tinjau endpoint `GET` bagi setiap bahagian belakang. Menjalankan lebih
daripada satu bahagian belakang secara serentak dibenarkan; OmniRoute akan menjejaki setiap satunya
secara bebas.

## Penyelesaian masalah

### "binari cloudflared tidak ditemukan"

OmniRoute cuba memasangnya secara automatik pada penggunaan pertama. Jika pemasangan disekat
(rangkaian terhad, tiada akses GitHub), muat turun `cloudflared` secara manual daripada
<https://github.com/cloudflare/cloudflared/releases> dan tetapkan
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken diperlukan"

`phase: "needs_auth"` bermaksud tiada authtoken ditemukan. Tetapkan `NGROK_AUTHTOKEN` dalam
`.env`, konfigurasikannya melalui papan pemuka, atau hantarkan `authToken` dalam badan POST
pengaktifan.

### "tailscale: funnel tidak didayakan"

Apabila respons pengaktifan mengandungi `funnelNotEnabled: true`, Funnel dinyahdayakan
untuk tailnet anda. Buka `enableUrl` yang dikembalikan (atau halaman ciri konsol
pentadbir) dan aktifkan Funnel.

### Perubahan URL terowong menjejaskan OAuth

Gunakan ngrok dengan domain yang dikhaskan atau Tailscale Funnel (kedua-duanya stabil bagi setiap nod).
Cloudflare Quick Tunnel bersifat sementara mengikut reka bentuk dan tidak disyorkan untuk
panggil balik OAuth jangka panjang.

### Kebenaran dinafikan pada Linux/macOS untuk Tailscale

`tailscaled` memerlukan akses root. Berikan `sudoPassword` kepada endpoint POST yang berkaitan,
atau jalankan daemon sendiri (`sudo systemctl start tailscaled`).

## Lihat juga

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proksi keluar (1proxy, SOCKS5, HTTP) untuk
  trafik keluar.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — senarai penuh pemboleh ubah persekitaran termasuk
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatif kepada penerowongan untuk pengehosan
  awam yang stabil.
- Sumber: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
