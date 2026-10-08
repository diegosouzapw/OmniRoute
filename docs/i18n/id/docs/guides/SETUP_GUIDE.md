# 📖 Setup Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Referensi penyiapan lengkap untuk OmniRoute. Untuk versi ringkas, lihat [Mulai Cepat di README](../README.md#-quick-start).

## Daftar Isi

- [Metode Instalasi](#install-methods)
- [Konfigurasi Alat CLI](#cli-tool-configuration)
- [Penyiapan Protokol (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfigurasi Batas Waktu](#timeout-configuration)
- [Mode Port Terpisah](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Menghapus Instalasi](#uninstalling)

---

## Metode Instalasi

### npm (direkomendasikan)

```bash
npm install -g omniroute
omniroute
```

Dasbor terbuka di `http://localhost:20128` dan URL dasar API adalah `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Pengguna pnpm:** flag `--allow-build` diperlukan untuk mengaktifkan skrip build native bagi `better-sqlite3` dan `@swc/core`. Perintah `pnpm approve-builds -g` tidak didukung untuk instalasi global pada pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Paket AUR](https://aur.archlinux.org/packages/omniroute-bin) menginstal OmniRoute dan menyediakan layanan pengguna systemd.

### Dari Sumber

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Catatan Windows:** Secara default, OmniRoute menggunakan `%APPDATA%\omniroute` ketika direktori lama `%USERPROFILE%\.omniroute` tidak tersedia. Atur `DATA_DIR` untuk memilih lokasi direktori data yang berbeda.

> **Catatan:** `npm install` secara otomatis menghasilkan `.env` dari `.env.example` saat pertama kali dijalankan. Instalasi berikutnya tidak akan menimpa `.env` yang sudah ada, sehingga penyesuaian tetap dipertahankan. Untuk menginisialisasi ulang, hapus `.env` sebelum menjalankannya kembali.

### Docker

Lihat [Panduan Docker](./DOCKER_GUIDE.md) untuk penyiapan Docker lengkap, termasuk profil Compose dan HTTPS Caddy.

### Aplikasi Desktop (Electron)

OmniRoute menyediakan pembungkus desktop yang dibuat dengan Electron 41 + electron-builder 26.10. Skrip yang tersedia (root ruang kerja):

```bash
npm run electron:dev          # Jalankan desktop dengan hot-reload
npm run electron:build        # Build untuk OS saat ini (terdeteksi otomatis)
npm run electron:build:win    # Penginstal Windows (NSIS + portabel)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Uji smoke build yang telah dikemas
```

Rilis penginstal desktop dilampirkan pada GitHub Releases. Untuk pembahasan mendalam lengkap mengenai Electron (penandatanganan, bridge IPC, distro), lihat [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(dibuat pada tahap berikutnya)_.

### Server headless (CI/otomatisasi)

Untuk penyiapan tanpa pengawasan (Docker, Kubernetes, CI), gunakan:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Jika digabungkan dengan variabel lingkungan (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, dan sebagainya), ini memungkinkan Anda menjalankan instans OmniRoute yang sepenuhnya dapat dikendalikan melalui skrip.

### Opsi CLI

| Perintah                | Deskripsi                                                              |
| ----------------------- | ---------------------------------------------------------------------- |
| `omniroute`             | Mulai server (`PORT=20128`, API dan dasbor pada port yang sama)        |
| `omniroute setup`       | Orientasi CLI terpandu untuk kata sandi dan penyedia pertama           |
| `omniroute doctor`      | Jalankan pemeriksaan kesehatan lokal tanpa memulai server              |
| `omniroute providers`   | Temukan, tampilkan, validasi, dan uji penyedia dari CLI                |
| `omniroute config`      | Konfigurasi alat CLI — tampilkan, dapatkan, atur, validasi konfigurasi |
| `omniroute status`      | Dasbor status offline — versi, DB, alat, konfigurasi                   |
| `omniroute logs`        | Streaming log penggunaan dari API (mendukung `--follow`)               |
| `omniroute update`      | Periksa atau terapkan pembaruan OmniRoute                              |
| `omniroute provider`    | Kelola koneksi penyedia — tambah, tampilkan, hapus, uji, default       |
| `omniroute --port 3000` | Atur port kanonis/API ke 3000                                          |
| `omniroute --mcp`       | Mulai server MCP (transport stdio)                                     |
| `omniroute --no-open`   | Jangan buka browser secara otomatis                                    |
| `omniroute --help`      | Tampilkan bantuan                                                      |

Penyiapan headless dapat dibuat menjadi skrip dengan flag atau variabel lingkungan:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Jalankan diagnostik lokal tanpa membuka dasbor:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Kelola penyedia dari SSH atau skrip tanpa membuka dasbor:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Konfigurasi Alat CLI

### 1) Hubungkan Penyedia dan Buat Kunci API

1. Buka Dasbor → `Providers` dan hubungkan setidaknya satu penyedia (OAuth atau kunci API).
2. Buka Dasbor → `Endpoints` dan buat kunci API.
3. (Opsional) Buka Dasbor → `Combos` dan atur rantai fallback Anda.

### 2) Arahkan Alat Pemrograman Anda

```txt
URL Dasar: http://localhost:20128/v1
Kunci API: [salin dari halaman Endpoint]
Model:     if/qwen3.8-max-preview (atau prefiks penyedia/model apa pun)
```

Jika editor Anda tidak dapat mengirim `Authorization: Bearer ...`, gunakan URL dasar kompatibilitas dengan token sebagai gantinya:

```txt
URL Dasar: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL Model: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL Chat: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL Tag Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Berfungsi dengan Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode, dan SDK yang kompatibel dengan OpenAI.

#### Konfigurasi otomatis dengan `setup-*`

Alih-alih menempelkan URL dasar dan kunci secara manual, biarkan OmniRoute menulis konfigurasi
masing-masing alat dari katalog model aktif. Satu perintah per alat:

```bash
omniroute setup-codex        # profil ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (kompatibel dengan OpenAI)
omniroute setup-cline        # pengaturan Cline CLI + ekstensi VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # mencetak langkah-langkah dalam aplikasi Cursor
omniroute setup-roo          # impor Roo Code + penunjuk autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Masing-masing menerima `--remote <url> --api-key <key>` untuk mengonfigurasi alat lokal terhadap
OmniRoute **jarak jauh**, serta `--dry-run` untuk melihat pratinjau. Untuk menjalankan CLI dengan
env yang tepat disuntikkan tanpa menulis konfigurasi sama sekali, gunakan peluncur generik
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
peluncur lama per alat `omniroute launch` (Claude Code) dan
`omniroute launch-codex` (Codex) tetap tersedia.

Untuk tabel lengkap (apa yang ditulis setiap perintah, semua flag, lokal vs jarak jauh, konvensi URL dasar
`/v1`), lihat **[Integrasi CLI](./CLI-INTEGRATIONS.md)**.

Untuk konfigurasi terperinci per alat (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, dan lainnya), lihat **[Panduan Alat CLI](../reference/CLI-TOOLS.md)** khusus.

---

## Penyiapan Protokol (MCP + A2A)

### Penyiapan MCP (Model Context Protocol)

Mulai transportasi MCP dalam mode stdio:

```bash
omniroute --mcp
```

Alur validasi yang disarankan:

```bash
# 1. Mulai server MCP
omniroute --mcp

# 2. Dari klien MCP Anda, panggil:
omniroute_get_health        # Seharusnya mengembalikan status kesehatan sistem
omniroute_list_combos       # Seharusnya mengembalikan combo aktif

# 3. Atau jalankan seluruh rangkaian E2E:
npm run test:protocols:e2e
```

#### Konfigurasi Klien MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Tambahkan ke pengaturan MCP Anda:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Dokumentasi lengkap MCP:** [README Server MCP](../../open-sse/mcp-server/README.md) — 110 alat, konfigurasi IDE, klien Python/TS/Go.

### Penyiapan A2A (Agent-to-Agent Protocol)

Verifikasi Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Kirim tugas:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Dokumentasi lengkap A2A:** [README Server A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, keterampilan, streaming, siklus hidup tugas.

---

## Konfigurasi Timeout

### Timeout Dasar

Untuk sebagian besar deployment, Anda hanya memerlukan dua variabel berikut:

| Variabel                 | Default                       | Tujuan                                                                                                                                                        |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Baseline bersama untuk timeout dimulainya respons upstream, timeout Undici tersembunyi, permintaan fingerprint TLS, serta timeout permintaan/proxy bridge API |
| `STREAM_IDLE_TIMEOUT_MS` | mewarisi `REQUEST_TIMEOUT_MS` | Jeda maksimum antar-chunk streaming sebelum OmniRoute membatalkan stream SSE                                                                                  |

Kompatibilitas mundur tetap dipertahankan: `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS`, dan variabel timeout per-lapisan lainnya yang sudah ada tetap berfungsi dan menggantikan baseline bersama.

### Catatan Khusus Penyedia

Untuk upstream yang kompatibel dengan Claude Code (`anthropic-compatible-cc-*`), OmniRoute memperoleh header `X-Stainless-Timeout` keluar dari timeout fetch yang telah ditetapkan sehingga timeout baca di sisi penyedia tetap selaras dengan konfigurasi env Anda.

Untuk reverse proxy pihak ketiga yang kompatibel dengan Claude Code, OmniRoute mempertahankan set default `anthropic-beta` secara konservatif dan, ketika `Client Cache Control` tetap diatur ke `Auto`, hanya meneruskan penanda `cache_control` yang disediakan klien. Aktifkan toggle "Enable redact-thinking beta" per-koneksi hanya ketika upstream secara khusus memerlukan stream pemikiran Claude yang telah disunting.

### Penggantian Timeout Lanjutan

| Variabel                                 | Default                                     | Tujuan                                                                            |
| ---------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | mewarisi `REQUEST_TIMEOUT_MS`               | Timeout dimulainya respons upstream yang digunakan hingga header respons diterima |
| `FETCH_HEADERS_TIMEOUT_MS`               | mewarisi `FETCH_TIMEOUT_MS`                 | Batas waktu Undici untuk menerima header respons upstream                         |
| `FETCH_BODY_TIMEOUT_MS`                  | mewarisi `FETCH_TIMEOUT_MS`                 | Batas waktu Undici antar-chunk body upstream (`0` menonaktifkannya)               |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Timeout koneksi TCP Undici                                                        |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Timeout soket keep-alive Undici saat tidak aktif                                  |
| `TLS_CLIENT_TIMEOUT_MS`                  | mewarisi `FETCH_TIMEOUT_MS`                 | Timeout untuk permintaan fingerprint TLS yang dibuat melalui `wreq-js`            |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | mewarisi `REQUEST_TIMEOUT_MS` atau `600000` | Timeout untuk penerusan proxy `/v1` dari port API ke port dasbor                  |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Timeout permintaan masuk pada server bridge API                                   |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Timeout header masuk pada server bridge API                                       |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Timeout keep-alive pada server bridge API                                         |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Timeout ketidakaktifan soket pada server bridge API (`0` menonaktifkannya)        |

> **Catatan:** Untuk permintaan streaming, `FETCH_TIMEOUT_MS` hanya mencakup penyiapan koneksi / waktu menunggu respons upstream pertama. Setelah stream aktif, OmniRoute hanya akan membatalkannya jika benar-benar terjadi kemacetan (`STREAM_IDLE_TIMEOUT_MS`) atau ketidakaktifan body Undici (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilitas Reverse Proxy

Jika Anda menjalankan OmniRoute di belakang Nginx, Caddy, Cloudflare, atau reverse proxy lainnya, pastikan timeout proxy juga lebih tinggi daripada timeout stream/fetch OmniRoute Anda.

---

## Mode Port Terpisah

Jalankan API dan Dasbor pada port terpisah untuk skenario lanjutan (proksi terbalik, jaringan kontainer):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:    http://localhost:20128/v1
# Dasbor: http://localhost:20129
```

---

## Templat Void Linux (xbps-src)

Untuk pengguna Void Linux, Anda dapat membuat paket native menggunakan `xbps-src`. Simpan blok ini sebagai `srcpkgs/omniroute/template`:

```bash
# File templat untuk 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Buat ulang checksum untuk setiap rilis dengan:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## Menghapus Instalasi

| Perintah                 | Tindakan                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Menghapus aplikasi sistem tetapi **mempertahankan basis data dan konfigurasi Anda** di `~/.omniroute`. |
| `npm run uninstall:full` | Menghapus aplikasi DAN secara permanen **menghapus semua konfigurasi, kunci, dan basis data**.         |

> Untuk petunjuk terperinci tentang penghapusan instalasi pada semua metode, lihat [UNINSTALL.md](./UNINSTALL.md).
