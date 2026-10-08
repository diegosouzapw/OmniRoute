# 📖 Setup Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Rujukan persediaan lengkap untuk OmniRoute. Untuk versi ringkas, lihat [Mula Pantas dalam README](../README.md#-quick-start).

## Kandungan

- [Kaedah Pemasangan](#install-methods)
- [Konfigurasi Alat CLI](#cli-tool-configuration)
- [Persediaan Protokol (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfigurasi Tamat Masa](#timeout-configuration)
- [Mod Port Berasingan](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Nyahpasang](#uninstalling)

---

## Kaedah Pemasangan

### npm (disyorkan)

```bash
npm install -g omniroute
omniroute
```

Papan pemuka dibuka di `http://localhost:20128` dan URL asas API ialah `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Pengguna pnpm:** bendera `--allow-build` diperlukan untuk mendayakan skrip binaan natif bagi `better-sqlite3` dan `@swc/core`. Perintah `pnpm approve-builds -g` tidak disokong untuk pemasangan global pada pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Pakej AUR](https://aur.archlinux.org/packages/omniroute-bin) memasang OmniRoute dan menyediakan perkhidmatan pengguna systemd.

### Daripada Sumber

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Nota Windows:** Secara lalai, OmniRoute menggunakan `%APPDATA%\omniroute` apabila direktori legasi `%USERPROFILE%\.omniroute` tidak wujud. Tetapkan `DATA_DIR` untuk memilih lokasi direktori data yang berbeza.

> **Nota:** `npm install` menjana `.env` secara automatik daripada `.env.example` pada pelaksanaan pertama. Pemasangan berikutnya tidak akan menulis ganti `.env` yang sedia ada, maka penyesuaian akan dikekalkan. Untuk menjana semula, padamkan `.env` sebelum menjalankannya semula.

### Docker

Lihat [Panduan Docker](./DOCKER_GUIDE.md) untuk persediaan Docker lengkap, termasuk profil Compose dan HTTPS Caddy.

### Aplikasi Desktop (Electron)

OmniRoute disertakan dengan pembalut desktop yang dibina menggunakan Electron 41 + electron-builder 26.10. Skrip yang tersedia (akar ruang kerja):

```bash
npm run electron:dev          # Jalankan desktop dengan muat semula pantas
npm run electron:build        # Bina untuk OS semasa (dikesan secara automatik)
npm run electron:build:win    # Pemasang Windows (NSIS + mudah alih)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Ujian ringkas binaan berpakej
```

Keluaran pemasang desktop dilampirkan pada GitHub Releases. Untuk penerangan terperinci tentang Electron (penandatanganan, jambatan IPC, distro), lihat [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(dicipta pada fasa kemudian)_.

### Pelayan tanpa antara muka (CI/automasi)

Untuk persediaan tanpa pengawasan (Docker, Kubernetes, CI), gunakan:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Apabila digabungkan dengan pemboleh ubah persekitaran (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, dan sebagainya), ini membolehkan anda menyediakan tika OmniRoute yang boleh diskripkan sepenuhnya.

### Pilihan CLI

| Perintah                | Penerangan                                                                |
| ----------------------- | ------------------------------------------------------------------------- |
| `omniroute`             | Mulakan pelayan (`PORT=20128`, API dan papan pemuka pada port sama)       |
| `omniroute setup`       | Pengenalan CLI berpandu untuk kata laluan dan penyedia pertama            |
| `omniroute doctor`      | Jalankan pemeriksaan kesihatan setempat tanpa memulakan pelayan           |
| `omniroute providers`   | Temui, senaraikan, sahkan dan uji penyedia daripada CLI                   |
| `omniroute config`      | Konfigurasi alat CLI — senaraikan, dapatkan, tetapkan, sahkan konfigurasi |
| `omniroute status`      | Papan pemuka status luar talian — versi, DB, alat, konfigurasi            |
| `omniroute logs`        | Strim log penggunaan daripada API (menyokong `--follow`)                  |
| `omniroute update`      | Semak atau gunakan kemas kini OmniRoute                                   |
| `omniroute provider`    | Urus sambungan penyedia — tambah, senaraikan, alih keluar, uji, lalai     |
| `omniroute --port 3000` | Tetapkan port kanonik/API kepada 3000                                     |
| `omniroute --mcp`       | Mulakan pelayan MCP (pengangkutan stdio)                                  |
| `omniroute --no-open`   | Jangan buka pelayar secara automatik                                      |
| `omniroute --help`      | Tunjukkan bantuan                                                         |

Persediaan tanpa antara muka boleh diskripkan menggunakan bendera atau pemboleh ubah persekitaran:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Jalankan diagnostik setempat tanpa membuka papan pemuka:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Urus penyedia melalui SSH atau skrip tanpa membuka papan pemuka:

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

### 1) Sambungkan Penyedia dan Cipta Kunci API

1. Buka Papan Pemuka → `Providers` dan sambungkan sekurang-kurangnya satu penyedia (OAuth atau kunci API).
2. Buka Papan Pemuka → `Endpoints` dan cipta kunci API.
3. (Pilihan) Buka Papan Pemuka → `Combos` dan tetapkan rantaian sandaran anda.

### 2) Halakan Alat Pengekodan Anda

```txt
URL Asas:  http://localhost:20128/v1
Kunci API: [salin daripada halaman Endpoint]
Model:     if/qwen3.8-max-preview (atau sebarang awalan penyedia/model)
```

Jika editor anda tidak dapat menghantar `Authorization: Bearer ...`, gunakan URL asas keserasian bertoken sebagai gantinya:

```txt
URL Asas:         http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL Model:        http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL Sembang:      http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL Tag Ollama:   http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Berfungsi dengan Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode dan SDK yang serasi dengan OpenAI.

#### Konfigurasi automatik dengan `setup-*`

Daripada menampal URL asas dan kunci secara manual, biarkan OmniRoute menulis konfigurasi
setiap alat daripada katalog model langsung. Satu perintah bagi setiap alat:

```bash
omniroute setup-codex        # profil ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (serasi dengan OpenAI)
omniroute setup-cline        # tetapan Cline CLI + sambungan VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # mencetak langkah dalam aplikasi Cursor
omniroute setup-roo          # import Roo Code + penuding autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Setiap perintah menerima `--remote <url> --api-key <key>` untuk mengkonfigurasi alat setempat agar menggunakan
OmniRoute **jarak jauh**, serta `--dry-run` untuk pratonton. Untuk melancarkan CLI dengan
persekitaran yang betul disuntik tanpa menulis sebarang konfigurasi, gunakan pelancar umum
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
pelancar legasi khusus alat `omniroute launch` (Claude Code) dan
`omniroute launch-codex` (Codex) masih tersedia.

Untuk jadual penuh (perkara yang ditulis oleh setiap perintah, semua bendera, setempat berbanding jarak jauh, konvensyen URL asas
`/v1`), lihat **[Integrasi CLI](./CLI-INTEGRATIONS.md)**.

Untuk konfigurasi terperinci bagi setiap alat (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot dan banyak lagi), lihat **[Panduan Alat CLI](../reference/CLI-TOOLS.md)** khusus.

---

## Persediaan Protokol (MCP + A2A)

### Persediaan MCP (Model Context Protocol)

Mulakan pengangkutan MCP dalam mod stdio:

```bash
omniroute --mcp
```

Aliran pengesahan yang disyorkan:

```bash
# 1. Mulakan pelayan MCP
omniroute --mcp

# 2. Daripada klien MCP anda, panggil:
omniroute_get_health        # Sepatutnya mengembalikan status kesihatan sistem
omniroute_list_combos       # Sepatutnya mengembalikan kombo aktif

# 3. Atau jalankan suite E2E penuh:
npm run test:protocols:e2e
```

#### Konfigurasi Klien MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Tambahkan pada tetapan MCP anda:

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

**Dokumentasi MCP penuh:** [README Pelayan MCP](../../open-sse/mcp-server/README.md) — 110 alat, konfigurasi IDE, klien Python/TS/Go.

### Persediaan A2A (Agent-to-Agent Protocol)

Sahkan Kad Ejen:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Hantar tugasan:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Dokumentasi A2A penuh:** [README Pelayan A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, kemahiran, penstriman, kitaran hayat tugasan.

---

## Konfigurasi Tamat Masa

### Tamat Masa Asas

Untuk kebanyakan penggunaan, anda hanya memerlukan dua pemboleh ubah ini:

| Pemboleh ubah            | Lalai                         | Tujuan                                                                                                                                                              |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Garis dasar bersama untuk tamat masa permulaan respons huluan, tamat masa Undici tersembunyi, permintaan cap jari TLS dan tamat masa permintaan/proksi jambatan API |
| `STREAM_IDLE_TIMEOUT_MS` | mewarisi `REQUEST_TIMEOUT_MS` | Jurang maksimum antara ketulan penstriman sebelum OmniRoute menghentikan strim SSE                                                                                  |

Keserasian ke belakang dikekalkan: `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` dan pemboleh ubah tamat masa setiap lapisan lain yang sedia ada masih berfungsi dan mengatasi garis dasar bersama.

### Nota Khusus Penyedia

Untuk huluan yang serasi dengan Claude Code (`anthropic-compatible-cc-*`), OmniRoute memperoleh pengepala `X-Stainless-Timeout` keluar daripada tamat masa pengambilan yang telah ditetapkan supaya tamat masa baca di pihak penyedia kekal sejajar dengan konfigurasi persekitaran anda.

Untuk proksi songsang pihak ketiga yang serasi dengan Claude Code, OmniRoute memastikan set lalai `anthropic-beta` kekal konservatif dan, apabila `Client Cache Control` dibiarkan pada `Auto`, hanya meneruskan penanda `cache_control` yang diberikan oleh klien. Dayakan togol "Enable redact-thinking beta" bagi setiap sambungan hanya apabila huluan secara khusus memerlukan strim pemikiran Claude yang telah disunting.

### Penggantian Tamat Masa Lanjutan

| Pemboleh ubah                            | Lalai                                       | Tujuan                                                                                 |
| ---------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | mewarisi `REQUEST_TIMEOUT_MS`               | Tamat masa permulaan respons huluan yang digunakan sehingga pengepala respons diterima |
| `FETCH_HEADERS_TIMEOUT_MS`               | mewarisi `FETCH_TIMEOUT_MS`                 | Had masa Undici untuk menerima pengepala respons huluan                                |
| `FETCH_BODY_TIMEOUT_MS`                  | mewarisi `FETCH_TIMEOUT_MS`                 | Had masa Undici antara ketulan isi huluan (`0` menyahdayakannya)                       |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Tamat masa sambungan TCP Undici                                                        |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Tamat masa soket kekal hidup melahu Undici                                             |
| `TLS_CLIENT_TIMEOUT_MS`                  | mewarisi `FETCH_TIMEOUT_MS`                 | Tamat masa untuk permintaan cap jari TLS yang dibuat melalui `wreq-js`                 |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | mewarisi `REQUEST_TIMEOUT_MS` atau `600000` | Tamat masa untuk pemajuan proksi `/v1` daripada port API ke port papan pemuka          |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Tamat masa permintaan masuk pada pelayan jambatan API                                  |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Tamat masa pengepala masuk pada pelayan jambatan API                                   |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Tamat masa kekal hidup pada pelayan jambatan API                                       |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Tamat masa ketidakaktifan soket pada pelayan jambatan API (`0` menyahdayakannya)       |

> **Nota:** Untuk permintaan penstriman, `FETCH_TIMEOUT_MS` hanya meliputi persediaan sambungan / tempoh menunggu respons huluan pertama. Setelah strim aktif, OmniRoute hanya akan menghentikannya apabila benar-benar berlaku gangguan (`STREAM_IDLE_TIMEOUT_MS`) atau ketidakaktifan isi Undici (`FETCH_BODY_TIMEOUT_MS`).

### Keserasian Proksi Songsang

Jika anda menjalankan OmniRoute di belakang Nginx, Caddy, Cloudflare atau proksi songsang lain, pastikan tamat masa proksi juga lebih tinggi daripada tamat masa strim/pengambilan OmniRoute anda.

---

## Mod Port Berasingan

Jalankan API dan Papan Pemuka pada port berasingan untuk senario lanjutan (proksi songsang, rangkaian kontena):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:           http://localhost:20128/v1
# Papan Pemuka: http://localhost:20129
```

---

## Templat Void Linux (xbps-src)

Bagi pengguna Void Linux, anda boleh membina pakej natif menggunakan `xbps-src`. Simpan blok ini sebagai `srcpkgs/omniroute/template`:

```bash
# Fail templat untuk 'omniroute'
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
# Jana semula checksum bagi setiap keluaran dengan:
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

## Menyahpasang

| Perintah                 | Tindakan                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Mengalih keluar aplikasi sistem tetapi **mengekalkan DB dan konfigurasi anda** dalam `~/.omniroute`. |
| `npm run uninstall:full` | Mengalih keluar aplikasi DAN **memadam semua konfigurasi, kunci dan pangkalan data secara kekal**.   |

> Untuk arahan penyahpasangan terperinci bagi semua kaedah, lihat [UNINSTALL.md](./UNINSTALL.md).
