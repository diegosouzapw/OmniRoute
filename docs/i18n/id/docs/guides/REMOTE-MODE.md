# Remote Mode (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Jalankan CLI `omniroute` di laptop Anda sementara OmniRoute berjalan di tempat lain
(VPS, server rumahan, atau mesin lain di Tailnet Anda). Anda cukup masuk sekali dengan
`omniroute connect`, dan sejak saat itu **setiap** perintah CLI akan menargetkan server
jarak jauh tersebut — perintah yang sama, keluaran yang sama, hanya saja dijalankan terhadap server jarak jauh.

Tidak ada alat kedua yang perlu diinstal: mode jarak jauh menggunakan CLI `omniroute`
reguler beserta **token akses** dengan cakupan tertentu.

```bash
npm install -g omniroute                 # CLI normal
omniroute connect 192.168.0.15           # masuk (kata sandi → token dengan cakupan tertentu)
omniroute models list                    # ← kini mencantumkan model milik server JARAK JAUH
omniroute configure codex                # ← menulis profil Codex lokal dari katalog jarak jauh
```

---

## Cara kerjanya

```
laptop Anda                              OmniRoute jarak jauh (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (kata sandi → token)      │
│  konteks: vps      │ ───────────────►  │ membuat token akses dengan    │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ setiap rute manajemen, cakupan │
│ menulis konfigurasi│ ◄───────────────  │ diperiksa sesuai cakupan token│
│ SECARA LOKAL       │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteks** menyimpan satu server untuk masing-masing konteks (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` mengganti server aktif; `default` bersifat lokal.
- **Token akses** (`oma_live_…`) mengotorisasi perintah manajemen. Token ini
  berbeda dari kunci API inferensi (`sk-…`, digunakan untuk `/v1/chat/completions`).
- Hanya hash SHA-256 dari token yang disimpan di sisi server. Token dalam bentuk teks biasa ditampilkan
  **sekali saja**, saat dibuat.

---

## Menghubungkan

### Dengan kata sandi manajemen (bootstrap)

```bash
omniroute connect 192.168.0.15
# Kata sandi manajemen untuk http://192.168.0.15:20128: ********
# ✔ Terhubung ke http://192.168.0.15:20128 — konteks '192.168.0.15' (cakupan: admin)
```

Alur kata sandi secara default membuat token **admin** (Anda memiliki kata sandinya, sehingga
Anda sudah memiliki kontrol penuh). Batasi cakupannya dengan `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opsi: `--port <p>` (ketika host tidak menyertakan port), `--name <ctx>` (nama konteks),
`--scope read|write|admin`. URL lengkap digunakan apa adanya:
`omniroute connect https://omni.example.com`.

### Dengan token yang telah dibuat sebelumnya

Buat token dengan cakupan tertentu di dasbor (atau dengan `omniroute tokens create`), lalu
tempelkan token tersebut — tidak memerlukan kata sandi:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI memvalidasinya melalui `GET /api/cli/whoami` dan menyimpannya sebagai konteks aktif.

---

## Cakupan

Tiga tingkat, bersifat hierarkis (`admin ⊃ write ⊃ read`):

| Cakupan | Yang dapat dilakukan                                                                      |
| ------- | ----------------------------------------------------------------------------------------- |
| `read`  | mencantumkan/memeriksa — `models list`, `providers status`, `logs`, `usage`, `cost`       |
| `write` | read **+** mengonfigurasi/menerapkan — `setup-codex`, `keys add`, `config set`, kombinasi |
| `admin` | write **+** mengelola — CRUD `tokens`, menambahkan penyedia, layanan, kebijakan, oauth    |

Server menentukan cakupan yang diperlukan setiap rute berdasarkan metode HTTP
(`GET`→read, mutasi→write), ditambah daftar izin admin untuk bagian sensitif
(mutasi `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token dengan cakupan yang tidak mencukupi akan menerima `403` dengan pesan yang jelas.

> Rute yang menjalankan proses (`/api/services/*`, `/api/mcp/*`, …) tetap
> **khusus loopback** — token jarak jauh tidak akan pernah dapat mengaksesnya, apa pun cakupannya.

---

## Menghubungkan Antigravity pada instalasi jarak jauh

Antigravity menggunakan layar persetujuan firstparty/nativeapp milik Google. Google hanya
merilis kode otorisasi ketika **pengalihan loopback**
(`http://127.0.0.1:<port>/callback`) **dapat dijangkau dari browser yang
menyetujui proses masuk**. Pada instalasi VPS jarak jauh, loopback tersebut berada di
server, bukan di komputer Anda, sehingga layar persetujuan **macet selamanya dan tidak pernah
menghasilkan kode** — mekanisme cadangan standar "tempel URL callback" tidak memiliki apa pun
untuk ditempelkan. (Ini merupakan batasan dari sisi Google: kondisi macet yang sama terjadi pada setiap proxy
yang menggunakan klien desktop Antigravity bawaan, bukan hanya OmniRoute.)

Dasbor mendeteksi hal ini sebelum Anda terjebak: membuka **Providers → Antigravity →
Connect** dari alamat non-localhost akan mengganti pemberitahuan umum "salin URL callback"
dengan dua solusi di bawah ini, masing-masing dengan host dan port Anda yang sudah diisikan.
(Alamat LAN juga termasuk — `192.168.x.x` bukan localhost dalam konteks callback ini.)

Ada dua cara yang didukung untuk menghubungkan Antigravity ke OmniRoute jarak jauh.

### Opsi A — pembantu login lokal (direkomendasikan)

Jalankan OAuth di **komputer Anda sendiri**, tempat `127.0.0.1` dapat dijangkau. Pembantu
berkomunikasi langsung dengan Google, sehingga persetujuan dapat diselesaikan di tempat yang tidak
dapat dilakukan oleh versi dasbor.

**Jika Anda sudah terhubung** (`omniroute connect <host>`), tidak ada yang perlu
disalin — pembantu akan mengirimkan kredensial ke instalasi tersebut untuk Anda:

```bash
# Di mesin LOKAL Anda (memerlukan Node.js + browser):
omniroute connect 192.168.0.15        # sekali — membuat token konteks dengan cakupan admin
npx omniroute login antigravity
#   ↳ membuka persetujuan Google, menangkap callback pada port loopback lokal,
#     menukarkannya, dan mengirim kredensial melalui POST ke konteks aktif:
#
#   Antigravity terhubung di http://192.168.0.15:20128 (koneksi abc123).
#   Tidak ada yang perlu ditempelkan — Anda dapat menutup terminal ini.
```

Pengiriman dilakukan secara otomatis setiap kali konteks aktif mengarah ke mesin lain.
Paksa salah satu perilaku dengan `--push` / `--no-push`, atau arahkan ke konteks tertentu
dengan `--context <name>`.

**Jika mesin Anda tidak dapat menjangkau VPS** (terhalang firewall, tanpa SSH, komputer
terisolasi), pembantu tetap berfungsi — pembantu hanya _memerlukan_ Google. Gunakan `--no-push`,
atau biarkan saja pengiriman gagal: pembantu akan beralih untuk mencetak blob alih-alih membuang
otorisasi yang sudah Anda selesaikan.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Kemudian, di dasbor **jarak jauh**: **Providers → Antigravity → Connect**, lalu tempelkan
blob `omniroute-cred-v1.…` ke kolom **Step 2** (kolom tersebut menerima URL
callback maupun blob kredensial). OmniRoute akan mendekodenya, menjalankan proses onboarding Cloud Code
di sisi server, dan menyimpan koneksi.

> Blob tersebut berisi refresh token — perlakukan seperti kata sandi. Pada jalur pengiriman, blob
> dikirim satu kali melalui koneksi terautentikasi milik konteks Anda; pada jalur penempelan, blob dikirim melalui
> koneksi dasbor Anda. Apa pun jalurnya, blob disimpan dalam keadaan terenkripsi, dan
> pengiriman yang berhasil tidak pernah mencetaknya ke terminal Anda.

Flag: `--no-browser` (mencetak URL alih-alih membukanya secara otomatis), `--port <n>`
(menetapkan port loopback), `--timeout <ms>`, `--push` / `--no-push` (mengesampingkan
pengiriman otomatis), `--context <name>` (menargetkan konteks tertentu).

### Opsi B — tunnel penerusan lokal SSH

Jika Anda memiliki akses SSH ke VPS, teruskan port dasbor agar
callback loopback kembali menuju server melalui tunnel:

```bash
# Di mesin LOKAL Anda:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# lalu buka http://localhost:20128 di browser LOKAL Anda dan hubungkan Antigravity
# seperti biasa — pengalihan 127.0.0.1:20128/callback kini mencapai VPS melalui SSH.
```

Karena Anda mengakses dasbor sebagai `localhost:20128`, persetujuan Google
dapat diselesaikan dan callback dikirimkan ke server melalui tunnel yang sama —
tidak memerlukan blob. Biarkan tunnel tetap terbuka sampai koneksi ditampilkan sebagai aktif.

Tidak seperti penyedia dengan loopback tetap di bawah ini, **satu penerusan sudah cukup** dalam kasus ini:
callback Antigravity menggunakan port dasbor itu sendiri, sehingga tidak ada port kedua
khusus penyedia yang perlu diteruskan.

> Alternatif yang sepenuhnya headless (tanpa pembantu, tanpa tunnel) adalah mengonfigurasi kredensial web Google OAuth **milik Anda sendiri**
>
> - URL dasar publik; lihat variabel lingkungan OAuth
>   penyedia. Kedua opsi di atas tidak memerlukan penyiapan Google tambahan.

---

## Menghubungkan Codex / Grok pada instalasi jarak jauh (penyedia dengan loopback tetap)

Codex, xAI (`xai-oauth`), dan Grok CLI (`grok-cli`) mendaftarkan `redirect_uri`
loopback yang **tetap** pada aplikasi OAuth upstream mereka. OmniRoute tidak dapat
mengubahnya — penyedia selalu mengarahkan browser kembali ke alamat hardcode yang sama:

| Penyedia    | Callback tetap yang menjadi tujuan pengalihan penyedia |
| ----------- | ------------------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`                  |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                      |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                      |

`localhost` di sana berarti **mesin yang menjalankan browser**, sedangkan server
callback PKCE OmniRoute mendengarkan pada loopback **server**. Jika dasbor dibuka
melalui alamat LAN seperti `http://192.168.0.15:20128`, keduanya tidak akan pernah
terhubung: kode otorisasi dikirimkan ke `localhost:1455` milik laptop Anda sendiri,
tempat tidak ada layanan yang mendengarkan, dan penyedia menggagalkan proses masuk
tanpa menampilkan kesalahan.

Dasbor mendeteksi hal ini sebelum membuka popup dan menampilkan perintah tunnel,
alih-alih membiarkan proses masuk gagal tanpa pemberitahuan (#8046).

### Perbaikan — teruskan **kedua** port

```bash
# Pada mesin yang menjalankan BROWSER:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# lalu buka http://localhost:20128 dan hubungkan Codex dari sana
```

Diperlukan dua penerusan, dan meneruskan hanya satu port tetap akan gagal:

- **`20128`** (port dasbor) menjadikan origin sebagai localhost sebenarnya, yang
  membuat OmniRoute memulai server callback PKCE — origin LAN tidak pernah
  mencapai cabang tersebut.
- **`1455`** (port callback tetap milik penyedia) adalah tujuan pengalihan browser;
  port tersebut harus ditunnelkan ke loopback server.

Ganti `1455` dengan `56121`/`56122` saat menghubungkan xAI atau Grok CLI, dan
`20128` dengan port dasbor Anda yang sebenarnya. Biarkan tunnel tetap terbuka
hingga koneksi ditampilkan sebagai aktif.

> **Tidak memiliki akses SSH?** Codex dan Grok CLI juga menerima token yang
> ditempelkan — tab **Paste API Key** / **Import auth.json** pada dialog koneksi.
> Jalur ini tidak memiliki callback loopback, sehingga dapat digunakan dari origin
> mana pun. Codex juga menerima access token biasa atau blob sesi
> `~/.codex/auth.json`.

---

## Mengelola token

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ mencetak secret SEKALI — salin sekarang
omniroute tokens list                 # disamarkan: id, nama, cakupan, prefiks, status, kedaluwarsa
omniroute tokens revoke <id|prefix>   # cabut segera
omniroute tokens scopes               # menjelaskan ketiga cakupan
```

Perintah `tokens` memerlukan kredensial **admin**. Anda juga dapat mengelola token
di dasbor pada **Settings → Access Tokens** (buat, cabut, salin-sekali).

---

## Mengonfigurasi CLI pemrograman dari katalog jarak jauh

`omniroute configure` membaca katalog model live milik **server aktif** dan
menulis konfigurasi pada mesin **Anda**.

```bash
omniroute configure codex
#   Penyedia: glm, kmc, ollamacloud, opencode-go, …
#   Penyedia: glm
#   ID model: glm/glm-5.2
#   ✔ Menulis ~/.codex/glm52.config.toml
#   Gunakan:  codex --profile glm52

# noninteraktif
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# pertahankan model yang sering digunakan di bagian atas pemilih interaktif
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Pemilih hanya menyimpan ID model (tidak pernah URL atau kredensial) dalam file
lokal `model-preferences.json`, yang dicakup berdasarkan konteks dan target CLI.
Favorit ditampilkan sebelum pilihan terbaru; gunakan `--unfavorite` untuk
menghapus model yang dipilih dari daftar konteks/target tersebut.

Profil yang ditulis merujuk kunci inferensi melalui env var
(`OMNIROUTE_API_KEY`) — secret tidak pernah ditulis ke disk. Untuk penyiapan
dasar Codex satu kali (blok `[model_providers.omniroute]`), lihat
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Menjalankan CLI terhadap layanan jarak jauh (tanpa menulis konfigurasi)

`omniroute run <target>` juga mengikuti konteks aktif: URL dasar jarak jauh dan
kredensial konteks hanya diinjeksi ke dalam proses yang dijalankan.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → jarak jauh
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Pratinjau persis proses yang akan dijalankan (hanya NAMA KEY env, tidak pernah nilainya):
omniroute run codex --dry-run --json
```

Target: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(sumber tunggal: `bin/cli/cli-manifest.mjs`). Qwen dan Gemini berjalan dengan
home terisolasi sementara yang dihapus saat keluar, sehingga proses peluncuran
tidak pernah menyentuh — atau membocorkan data ke — konfigurasi alat pribadi
Anda.

### Perintah penyiapan per CLI

Setiap CLI yang didukung memiliki perintah penyiapan yang mendukung layanan
jarak jauh (semuanya mengikuti konteks aktif, atau `--remote <url> --api-key <key>`):

| CLI         | Perintah                   | Yang ditulis                                                                                                                                                                                          |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profil `~/.codex/<name>.config.toml` (per model)                                                                                                                                                      |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (per model)                                                                                                                                                 |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — penyedia kompatibel OpenAI `omniroute` dengan setiap model dalam katalog (jalankan `opencode -m omniroute/<model>`)                                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (mode CLI) + mencetak pengaturan ekstensi VS Code untuk ditempelkan (kompatibel dengan OpenAI, URL Dasar **tanpa** `/v1`)                                  |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + pengaturan VS Code `kilocode.*` — kompatibel dengan OpenAI, URL Dasar **dengan** `/v1`                                                                        |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **dengan** `/v1`, kunci melalui `${{ secrets.OMNIROUTE_API_KEY }}`                                           |
| Cursor      | `omniroute setup-cursor`   | mencetak langkah-langkah dalam aplikasi (Settings → Models → Override OpenAI Base URL **dengan** `/v1` + kunci + model). Konfigurasi Cursor berupa SQLite yang tidak transparan — hanya panel obrolan |
| Roo Code    | `omniroute setup-roo`      | menulis JSON impor Roo (`~/.omniroute/roo-settings.json`) + menetapkan `roo-cline.autoImportSettingsPath` + mencetak langkah-langkah UI (kompatibel dengan OpenAI, URL Dasar **dengan** `/v1`)        |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — penyedia `openai-compat`, `base_url` **dengan** `/v1`, kunci melalui `$OMNIROUTE_API_KEY`                                                                              |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **tanpa** `/v1` + `GOOSE_MODEL`) + panduan env                                                                                 |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **tanpa** `/v1` + `model: openai/<id>`) + panduan env (`aider --message --yes`)                                                                                |
| Qwen Code   | `omniroute setup-qwen`     | entri V4 `modelProviders.openai` dalam `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` dalam `~/.qwen/.env`                                                                                             |

```bash
# OpenCode (penyedia kompatibel dengan OpenAI, semua model katalog, VPS jarak jauh)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # pertahankan hanya model yang cocok
opencode -m omniroute/glm/glm-5.2 "..."          # ekspor OMNIROUTE_API_KEY terlebih dahulu
```

> OpenCode juga memiliki integrasi **plugin** yang lebih lengkap: `omniroute setup opencode`
> (kini mendukung jarak jauh melalui `--remote`) menginstal `@omniroute/opencode-plugin`.
> `setup-opencode` adalah alternatif ringan yang kompatibel dengan OpenAI. Kunci API
> direferensikan melalui `{env:OMNIROUTE_API_KEY}` — tidak pernah ditulis ke disk.
>
> Di OpenCode v2, gunakan `@omniroute/opencode-plugin-v2` sebagai gantinya: katalog yang sama,
> kontrak pemuat yang berbeda. Plugin ini membaca kunci dari penyimpanan kredensial milik
> OpenCode ketika integrasi terhubung, sehingga gateway jarak jauh sama sekali tidak memerlukan
> kunci dalam `opencode.json`.

---

## Mengelola konteks (beralih antarserver)

**Konteks** adalah server yang disimpan (baseUrl + kredensial + cakupan). `omniroute connect`
membuat konteks dan menjadikannya aktif; sejak saat itu, setiap perintah menargetkannya. Kelola dan
beralih antar-konteks dengan `omniroute contexts`:

```bash
omniroute contexts list            # semua konteks; konteks aktif ditandai dengan ●
omniroute contexts current         # server aktif, status autentikasi, cakupan
```

```text
  | Nama    | URL Dasar                  | Autentikasi | Cakupan | Deskripsi
● | vps     | http://100.67.86.91:20128 | token       | admin   | OmniRoute Jarak Jauh (…)
  | default | http://localhost:20128    | ✗           |         |
```

**Beralih server** — setiap perintah berikutnya mengikuti konteks aktif:

```bash
omniroute contexts use vps         # → semua perintah kini mengakses VPS jarak jauh
omniroute tokens list              #   (dijalankan terhadap VPS)

omniroute contexts use default     # → kembali ke localhost
omniroute tokens list              #   (dijalankan terhadap server lokal)
```

**Tambahkan konteks secara manual** (alih-alih menggunakan `connect`), periksa, atau ganti namanya:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # detail lengkap untuk satu konteks
omniroute contexts rename staging stg
```

**Hapus konteks** — meminta konfirmasi; berikan `--yes` untuk melewatinya
(diperlukan untuk skrip / shell noninteraktif, yang jika tidak diberikan akan menolak secara aman):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) tidak dapat dihapus. Menghapus konteks aktif akan kembali
> ke `default`. Kiat: menghapus konteks hanya menghapus kredensial **lokal** yang tersimpan —
> cabut token di server dengan `omniroute tokens revoke <id>` untuk benar-benar
> memutus akses.

**Ekspor / impor** konteks (misalnya untuk memindahkannya antarmesin). Konteks baru hanya menyimpan
referensi keychain; kredensial tidak disalin ke dalam ekspor jika keychain OS
tersedia:

```bash
omniroute contexts export --out contexts.json     # bawaan: stdout
omniroute contexts import contexts.json            # timpa; gunakan --merge untuk mempertahankan yang sudah ada
omniroute contexts migrate --yes                  # pindahkan token plaintext lama ke keychain
```

Pada sistem headless tanpa keychain OS yang dapat digunakan, CLI akan beralih ke
`config.json` dengan mode `0600` dan menampilkan peringatan satu kali. Perlakukan hasil ekspor dari
mekanisme cadangan tersebut (dan konfigurasi lama sebelum migrasi) sebagai materi rahasia.

---

## Pemeriksaan menyeluruh cepat

Siklus hidup yang dapat disalin-tempel untuk memverifikasi penyiapan jarak jauh dari awal — hubungkan, buat
token dengan cakupan tertentu, teruskan perintah, beralih kembali, lalu bongkar penyiapan. Ganti
`192.168.0.15` dengan host/IP server Anda (Tailscale, LAN, atau URL publik
`https://…`).

```bash
# 1. Hubungkan (kata sandi → token admin, disimpan sebagai konteks yang menjadi aktif)
omniroute connect 192.168.0.15                 # atau: --key oma_live_xxxx  (tanpa kata sandi)
omniroute contexts current                     # menampilkan server jarak jauh + cakupan

# 2. Gunakan — perintah pengelolaan kini dijalankan terhadap server jarak jauh
omniroute tokens create --name laptop --scope read   # buat token dengan cakupan lebih sempit
omniroute tokens list                                 # daftar tersamarkan, dari server jarak jauh

# 3. Beralih bolak-balik
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → jarak jauh lagi (nama dari `contexts list`)

# 4. Bongkar penyiapan. CATATAN: `contexts remove` hanya menghapus kredensial LOKAL —
#    perintah ini TIDAK mencabut token di server. Cabut terlebih dahulu di sisi server jika Anda
#    ingin benar-benar memutus akses.
omniroute tokens revoke <id|prefix>            # memutus akses di server
omniroute contexts remove 192-168-0-15 --yes   # hapus konteks lokal (meskipun aktif → kembali ke default), tanpa konfirmasi
```

> `--yes` membuat `contexts remove` bersifat noninteraktif (diperlukan dalam skrip/CI; tanpa
> opsi ini, shell noninteraktif akan menolak secara aman alih-alih menunggu tanpa batas). Menghapus konteks
> **aktif** akan otomatis kembali ke `default`.

---

## Catatan keamanan

- Teks polos token hanya ditampilkan sekali; hanya hash SHA-256 yang disimpan (sama seperti kunci API).
- `omniroute connect` menggunakan kembali penguncian akibat percobaan login berulang + pencatatan audit.
- Utamakan HTTPS atau Tailnet untuk transportasi; host tanpa skema secara default menggunakan `http://`
  demi kemudahan LAN/Tailscale — berikan URL `https://…` lengkap untuk TLS.
- File konteks lokal yang direkomendasikan adalah `~/.omniroute/config.json` (`chmod 600`)
  yang hanya berisi `credentialRef`; token itu sendiri disimpan di keychain OS
  (`keytar`) dan tidak pernah dicetak dalam log. Instalasi headless tanpa
  keychain native yang berfungsi menggunakan file `0600` yang sama sebagai fallback eksplisit dan
  menampilkan peringatan satu kali. Gunakan `omniroute contexts migrate --yes` setelah memasang
  backend keychain.

---

## Endpoint API (referensi)

| Metode | Rute                  | Autentikasi          | Cakupan                           |
| ------ | --------------------- | -------------------- | --------------------------------- |
| POST   | `/api/cli/connect`    | kata sandi manajemen | — (publik, dilindungi kata sandi) |
| GET    | `/api/cli/whoami`     | token akses          | baca                              |
| GET    | `/api/cli/tokens`     | token akses          | admin                             |
| POST   | `/api/cli/tokens`     | token akses          | admin                             |
| DELETE | `/api/cli/tokens/:id` | token akses          | admin                             |

Lihat [openapi.yaml](../openapi.yaml) untuk skema lengkap.
