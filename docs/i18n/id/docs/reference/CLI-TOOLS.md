# Panduan Pengaturan Alat CLI — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇧🇩 [bn](../../bn/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇮🇷 [fa](../../fa/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇮🇳 [gu](../../gu/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇮🇳 [mr](../../mr/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇰🇪 [sw](../../sw/docs/CLI-TOOLS.md) · 🇮🇳 [ta](../../ta/docs/CLI-TOOLS.md) · 🇮🇳 [te](../../te/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇵🇰 [ur](../../ur/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md)

---

Panduan ini menjelaskan cara menginstal dan mengonfigurasi semua alat CLI coding AI yang didukung
untuk menggunakan **OmniRoute** sebagai backend terpadu, memberikan manajemen kunci terpusat,
pelacakan biaya, pergantian model, dan pencatatan permintaan di semua alat.

---

## Cara Kerjanya

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (semua mengarah ke OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute meneruskan ke penyedia yang tepat)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Manfaat:**

- Satu API key untuk mengelola semua alat
- Pelacakan biaya di semua CLI melalui dashboard
- Pergantian model tanpa mengonfigurasi ulang setiap alat
- Berjalan secara lokal maupun di server jarak jauh (VPS)

---

## Alat yang Didukung (Sumber Kebenaran Dashboard)

Kartu dashboard di `/dashboard/cli-tools` dibuat dari `src/shared/constants/cliTools.ts`.
Daftar saat ini (v3.0.0-rc.16):

| Alat               | ID            | Perintah   | Mode Pengaturan | Metode Instalasi |
| ------------------ | ------------- | ---------- | --------------- | ---------------- |
| **Claude Code**    | `claude`      | `claude`   | env             | npm              |
| **OpenAI Codex**   | `codex`       | `codex`    | custom          | npm              |
| **Factory Droid**  | `droid`       | `droid`    | custom          | bundled/CLI      |
| **OpenClaw**       | `openclaw`    | `openclaw` | custom          | bundled/CLI      |
| **Cursor**         | `cursor`      | app        | guide           | desktop app      |
| **Cline**          | `cline`       | `cline`    | custom          | npm              |
| **Kilo Code**      | `kilo`        | `kilocode` | custom          | npm              |
| **Continue**       | `continue`    | extension  | guide           | VS Code          |
| **Antigravity**    | `antigravity` | internal   | mitm            | OmniRoute        |
| **GitHub Copilot** | `copilot`     | extension  | custom          | VS Code          |
| **OpenCode**       | `opencode`    | `opencode` | guide           | npm              |
| **Kiro AI**        | `kiro`        | app/cli    | mitm            | desktop/CLI      |
| **Qwen Code**      | `qwen`        | `qwen`     | custom          | npm              |

### Sinkronisasi fingerprint CLI (Agents + Pengaturan)

`/dashboard/agents` dan `Settings > CLI Fingerprint` menggunakan `src/shared/constants/cliCompatProviders.ts`.
Ini menjaga ID penyedia tetap selaras dengan kartu CLI dan ID lama.

| CLI ID                                                                                               | ID Penyedia Fingerprint |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                               | `kilocode`              |
| `copilot`                                                                                            | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | same ID                 |

ID lama yang masih diterima untuk kompatibilitas: `copilot`, `kimi-coding`, `qwen`.

---

## Langkah 1 — Dapatkan API Key OmniRoute

1. Buka dashboard OmniRoute → **API Manager** (`/dashboard/api-manager`)
2. Klik **Create API Key**
3. Beri nama (misalnya `cli-tools`) dan pilih semua izin
4. Salin kunci tersebut — Anda akan membutuhkannya untuk setiap CLI di bawah

> Kunci Anda terlihat seperti: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

## Langkah 2 — Instal Alat CLI

Semua alat berbasis npm memerlukan Node.js 18+:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Kiro CLI (Amazon — requires curl + unzip)
apt-get install -y unzip   # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH"   # add to ~/.bashrc
```

**Verifikasi:**

```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
```

---

## Langkah 3 — Tetapkan Variabel Lingkungan Global

Tambahkan ke `~/.bashrc` (atau `~/.zshrc`), lalu jalankan `source ~/.bashrc`:

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Untuk **server jarak jauh**, ganti `localhost:20128` dengan IP atau domain server,
> misalnya `http://192.168.0.15:20128`.

---

## Langkah 4 — Konfigurasi Setiap Alat

### Claude Code

```bash
# Melalui CLI:
claude config set --global api-base-url http://localhost:20128/v1

# Atau buat ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-your-omniroute-key"
}
EOF
```

**Uji:** `claude "say hello"`

---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Uji:** `codex "what is 2+2?"`

---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Uji:** `opencode`

---

### Cline (CLI atau VS Code)

**Mode CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Mode VS Code:**
Pengaturan ekstensi Cline → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Atau gunakan dashboard OmniRoute → **CLI Tools → Cline → Apply Config**.

---

### KiloCode (CLI atau VS Code)

**Mode CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Pengaturan VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Atau gunakan dashboard OmniRoute → **CLI Tools → KiloCode → Apply Config**.

---

### Continue (Ekstensi VS Code)

Edit `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Mulai ulang VS Code setelah mengedit.

---

### Kiro CLI (Amazon)

```bash
# Login ke akun AWS/Kiro Anda:
kiro-cli login

# CLI ini menggunakan autentikasinya sendiri — OmniRoute tidak diperlukan sebagai backend untuk Kiro CLI itu sendiri.
# Gunakan kiro-cli bersama OmniRoute untuk alat lainnya.
kiro-cli status
```

---

### Qwen Code (Alibaba)

Qwen Code mendukung endpoint API yang kompatibel dengan OpenAI melalui variabel lingkungan atau `settings.json`.

**Opsi 1: Variabel lingkungan (`~/.qwen/.env`)**

```bash
mkdir -p ~/.qwen && cat > ~/.qwen/.env << EOF
OPENAI_API_KEY="sk-your-omniroute-key"
OPENAI_BASE_URL="http://localhost:20128/v1"
OPENAI_MODEL="auto"
EOF
```

**Opsi 2: `settings.json` dengan penyedia model**

```json
// ~/.qwen/settings.json
{
  "env": {
    "OPENAI_API_KEY": "sk-your-omniroute-key",
    "OPENAI_BASE_URL": "http://localhost:20128/v1"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "omniroute-default",
        "name": "OmniRoute (Auto)",
        "envKey": "OPENAI_API_KEY",
        "baseUrl": "http://localhost:20128/v1"
      }
    ]
  }
}
```

**Opsi 3: Flag CLI langsung**

```bash
OPENAI_BASE_URL="http://localhost:20128/v1" \
OPENAI_API_KEY="sk-your-omniroute-key" \
OPENAI_MODEL="auto" \
qwen
```

> Untuk **server jarak jauh**, ganti `localhost:20128` dengan IP atau domain server.

**Uji:** `qwen "say hello"`

### Cursor (Aplikasi Desktop)

> **Catatan:** Cursor merutekan permintaan melalui cloudnya sendiri. Untuk integrasi OmniRoute,
> aktifkan **Cloud Endpoint** di Pengaturan OmniRoute dan gunakan URL domain publik Anda.

Melalui GUI: **Settings → Models → OpenAI API Key**

- Base URL: `https://your-domain.com/v1`
- API Key: kunci OmniRoute Anda

---

## Konfigurasi Otomatis Dashboard

Dashboard OmniRoute mengotomatiskan konfigurasi untuk sebagian besar alat:

1. Buka `http://localhost:20128/dashboard/cli-tools`
2. Perluas kartu alat mana pun
3. Pilih API key Anda dari menu tarik-turun
4. Klik **Apply Config** (jika alat terdeteksi telah terinstal)
5. Atau salin cuplikan konfigurasi yang dihasilkan secara manual

---

## Agen Bawaan: Droid & OpenClaw

**Droid** dan **OpenClaw** adalah agen AI yang dibangun langsung ke dalam OmniRoute — tidak perlu instalasi.
Keduanya berjalan sebagai rute internal dan menggunakan perutean model OmniRoute secara otomatis.

- Akses: `http://localhost:20128/dashboard/agents`
- Konfigurasi: combo dan penyedia yang sama seperti semua alat lainnya
- Tidak memerlukan API key atau instalasi CLI

---

## Endpoint API yang Tersedia

| Endpoint                   | Deskripsi                         | Digunakan Untuk             |
| -------------------------- | --------------------------------- | --------------------------- |
| `/v1/chat/completions`     | Chat standar (semua penyedia)     | Semua alat modern           |
| `/v1/responses`            | Responses API (format OpenAI)     | Codex, alur kerja agentik   |
| `/v1/completions`          | Penyelesaian teks lama            | Alat lama yang menggunakan `prompt:` |
| `/v1/embeddings`           | Embedding teks                    | RAG, pencarian              |
| `/v1/images/generations`   | Pembuatan gambar                  | GPT-Image, Flux, dll.       |
| `/v1/audio/speech`         | Teks ke ucapan                    | ElevenLabs, OpenAI TTS      |
| `/v1/audio/transcriptions` | Ucapan ke teks                    | Deepgram, AssemblyAI        |

---

## Pemecahan Masalah

| Error                     | Penyebab                          | Solusi                                     |
| ------------------------- | --------------------------------- | ------------------------------------------ |
| `Connection refused`      | OmniRoute tidak berjalan          | `pm2 start omniroute`                      |
| `401 Unauthorized`        | API key salah                     | Periksa di `/dashboard/api-manager`        |
| `No combo configured`     | Tidak ada combo perutean aktif    | Atur di `/dashboard/combos`                |
| `invalid model`           | Model tidak ada dalam katalog     | Gunakan `auto` atau periksa `/dashboard/providers` |
| CLI menampilkan "not installed" | Biner tidak ada di PATH    | Periksa `which <command>`                  |
| `kiro-cli: not found`     | Tidak ada di PATH                 | `export PATH="$HOME/.local/bin:$PATH"`     |

---

## Skrip Pengaturan Cepat (Satu Perintah)

```bash
# Instal semua CLI dan konfigurasi untuk OmniRoute (ganti dengan kunci dan URL server Anda)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode @qwen-code/qwen-code

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Tulis konfigurasi
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```
