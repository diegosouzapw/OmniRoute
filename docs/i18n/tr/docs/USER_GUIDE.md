# User Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Sağlayıcıları yapılandırmak, kombinasyonlar oluşturmak, CLI araçlarını entegre etmek ve OmniRoute'u dağıtmak için eksiksiz kılavuz.---

## Table of Contents

- [Bir Bakışta Fiyatlandırma](#-bir bakışta fiyatlandırma)
- [Kullanım Durumları](#-use-cases)
- [Sağlayıcı Kurulumu](#-provider-setup)
- [CLI Entegrasyonu](#-cli-entegrasyonu)
- [Dağıtım](#-dağıtım)
- [Mevcut Modeller](#-mevcut-modeller)
- [Gelişmiş Özellikler](#-gelişmiş-özellikler)---

## 💰 Pricing at a Glance

| Seviye             | Sağlayıcı              | Maliyet               | Kota Sıfırlama     | En İyisi                            |
| ------------------ | ---------------------- | --------------------- | ------------------ | ----------------------------------- |
| **💳 ABONELİK**    | Claude Kodu (Pro)      | 20$/ay                | 5 saat + haftalık  | Zaten abone oldum                   |
|                    | Kodeks (Artı/Pro)      | 20-200$/ay            | 5 saat + haftalık  | OpenAI kullanıcıları                |
|                    | İkizler CLI            | **ÜCRETSİZ**          | 180K/ay + 1K/gün   | Herkes!                             |
|                    | GitHub Yardımcı Pilotu | 10-19$/ay             | Aylık              | GitHub kullanıcıları                |
| **🔑API ANAHTARI** | Derin Arama            | Kullanım başına ödeme | Yok                | Ucuz muhakeme                       |
|                    | Büyük                  | Kullanım başına ödeme | Yok                | Ultra hızlı çıkarım                 |
|                    | xAI (Grok)             | Kullanım başına ödeme | Yok                | Grok 4 muhakeme                     |
|                    | Mistral                | Kullanım başına ödeme | Yok                | AB tarafından barındırılan modeller |
|                    | Şaşkınlık              | Kullanım başına ödeme | Yok                | Arama-artırılmış                    |
|                    | Birlikte AI            | Kullanım başına ödeme | Yok                | Açık kaynaklı modeller              |
|                    | Havai Fişek Yapay Zeka | Kullanım başına ödeme | Yok                | Hızlı FLUX resimleri                |
|                    | Beyinler               | Kullanım başına ödeme | Yok                | Gofret ölçekli hız                  |
|                    | Tutarlı                | Kullanım başına ödeme | Yok                | Komut R+ RAG                        |
|                    | NVIDIA NIM             | Kullanım başına ödeme | Yok                | Kurumsal modeller                   |
| **💰 UCUZ**        | GLM-4.7                | 0,6 $/1 milyon $      | Günlük 10:00       | Bütçe yedekleme                     |
|                    | MiniMax M2.1           | 0,2$/1 milyon $       | 5 saatlik ilerleme | En ucuz seçenek                     |
|                    | Kimi K2                | 9$/ay düz             | 10 milyon token/ay | Tahmin edilebilir maliyet           |
| **🆓 ÜCRETSİZ**    | Kod                    | 0$                    | Sınırsız           | 8 model ücretsiz                    |
|                    | Qwen                   | 0 $                   | Sınırsız           | 3 model ücretsiz                    |
|                    | Kiro                   | 0$                    | Sınırsız           | Claude ücretsiz                     |

**💡 Profesyonel İpucu:**Gemini CLI (180.000 ücretsiz/ay) + Qoder (sınırsız ücretsiz) kombinasyonu = 0 ABD doları maliyetle başlayın!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Sorun:**Kullanılmayan kota sona eriyor, yoğun kodlama sırasında hız sınırları```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Sorun:**Abonelik ücretini ödeyemiyorum, güvenilir yapay zeka kodlamasına ihtiyaç var```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Sorun:**Son teslim tarihleri, kesintileri göze alamamak```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**Sorun:**Mesajlaşma uygulamalarında yapay zeka asistanına ihtiyaç var, tamamen ücretsiz```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Profesyonel İpucu:**Karmaşık görevler için Opus'u, hız için Sonnet'i kullanın. OmniRoute model başına kotayı takip eder!#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**En İyi Değer:**Devasa ücretsiz katman! Bunu ücretli katmanlardan önce kullanın.#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. Kaydolun: [Zhipu AI](https://open.bigmodel.cn/)
2. Kodlama Planından API anahtarını alın
3. Kontrol Paneli → API Anahtarı Ekle: Sağlayıcı: `glm`, API Anahtarı: `anahtarınız`

**Kullanım:**`glm/glm-4.7` —**Profesyonel İpucu:**Kodlama Planı, 1/7 maliyetle 3 kat kota sunar! Her gün sabah 10:00'a sıfırlayın.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Kaydolun: [MiniMax](https://www.minimax.io/)
2. API anahtarını alın → Kontrol Paneli → API Anahtarı Ekle

**Kullanım:**`minimax/MiniMax-M2.1` —**Profesyonel İpucu:**Uzun bağlam için en ucuz seçenek (1 milyon jeton)!#### Kimi K2 ($9/month flat)

1. Abone olun: [Moonshot AI](https://platform.moonshot.ai/)
2. API anahtarını alın → Kontrol Paneli → API Anahtarı Ekle

**Kullanım:**`kimi/kimi-latest` —**Profesyonel İpucu:**10 milyon token için ayda sabit 9 ABD doları = 0,90 ABD doları/1 milyon etkin maliyet!### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

'~/.claude/config.json'ı düzenleyin:```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

'~/.openclaw/openclaw.json'ı düzenleyin:```json
{
"agents": {
"defaults": {
"model": { "primary": "omniroute/if/glm-4.7" }
}
},
"models": {
"providers": {
"omniroute": {
"baseUrl": "http://localhost:20128/v1",
"apiKey": "your-omniroute-api-key",
"api": "openai-completions",
"models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
}
}
}
}

```

**Veya Kontrol Panelini kullanın:**CLI Araçları → OpenClaw → Otomatik yapılandırma### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Dağıtım

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

CLI, `~/.omniroute/.env` veya `./.env`den `.env`yi otomatik olarak yükler.### VPS Deployment

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### PM2 Deployment (Low Memory)

Sınırlı RAM'e sahip sunucular için bellek sınırı seçeneğini kullanın:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

'ecosystem.config.js'yi oluşturun:```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

CLI ikili dosyalarıyla ana bilgisayarla tümleşik mod için ana belgelerdeki Docker bölümüne bakın.### Void Linux (xbps-src)

Void Linux kullanıcıları OmniRoute'u "xbps-src" çapraz derleme çerçevesini kullanarak yerel olarak paketleyebilir ve kurabilir. Bu, gerekli "better-sqlite3" yerel bağlamalarıyla birlikte Node.js'nin bağımsız yapısını otomatikleştirir.

<detaylar>
<summary><b>xbps-src şablonunu görüntüleyin</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
esac

    # 1) Install all deps – skip scripts
    NODE_ENV=development npm ci --ignore-scripts

    # 2) Build the Next.js standalone bundle
    npm run build

    # 3) Copy static assets into standalone
    cp -r .next/static .next/standalone/.next/static
    [ -d public ] && cp -r public .next/standalone/public || true

    # 4) Compile better-sqlite3 native binding
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

    # 5) Place the compiled binding into the standalone bundle
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    mkdir -p "$_bs3_release"
    cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) Remove arch-specific sharp bundles
    rm -rf .next/standalone/node_modules/@img

    # 7) Copy pino runtime deps omitted by Next.js static analysis:
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

    # Prevent removal of empty Next.js app router dirs by the post-install hook
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

````

</details>

### Environment Variables

| Değişken | Varsayılan | Açıklama |
| --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| 'JWT_SECRET' | `omniroute-varsayılan-gizli-değişim-beni' | JWT imzalama sırrı (**üretimdeki değişiklik**) |
| `INITIAL_PASSWORD` | '123456' | İlk giriş şifresi |
| 'DATA_DIR' | `~/.omniroute` | Veri dizini (db, kullanım, günlükler) |
| 'LİMAN' | çerçeve varsayılanı | Hizmet bağlantı noktası (örneklerde '20128') |
| `ANA SAHİBİN ADI' | çerçeve varsayılanı | Ana bilgisayarı bağlayın (Docker varsayılan olarak "0.0.0.0"dır) |
| 'NODE_ENV' | çalışma zamanı varsayılanı | Dağıtım için "üretim"i ayarlayın |
| 'BASE_URL' | 'http://localhost:20128' | Sunucu tarafı dahili temel URL'si |
| 'BULUT_URL' | `https://omniroute.dev` | Bulut senkronizasyonu uç noktası temel URL'si |
| 'API_KEY_SECRET' | 'uç nokta-proxy-api-anahtar-sırrı' | Oluşturulan API anahtarları için HMAC sırrı |
| `REQUIRE_API_KEY` | 'yanlış' | Taşıyıcı API anahtarını `/v1/*` üzerinde zorunlu kılın |
| 'ALLOW_API_KEY_REVEAL' | 'yanlış' | API Yöneticisinin talep üzerine tam API anahtarlarını kopyalamasına izin verin |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | '70' | Önbelleğe alınan Sağlayıcı Sınırları verileri için sunucu tarafı yenileme temposu; Kullanıcı arayüzü yenileme düğmeleri hala manuel senkronizasyonu tetikliyor |
| `DISABLE_SQLITE_AUTO_BACKUP` | 'yanlış' | Yazma/içe aktarma/geri yükleme öncesinde otomatik SQLite anlık görüntülerini devre dışı bırakın; manuel yedeklemeler hâlâ çalışıyor |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | 'yanlış' | 'Güvenli' kimlik doğrulama çerezini zorla (HTTPS ters proxy'nin arkasında) |
| `CLOUDFLARED_BIN` | ayarlanmamış | Yönetilen indirme yerine mevcut bir "cloudflared" ikili programını kullanın |
| `CLOUDFLARED_PROTOCOL` | 'http2' | Yönetilen Hızlı Tüneller için Aktarım (`http2`, `quic` veya `auto`) |
| `OMNIROUTE_MEMORY_MB` | '512' | MB cinsinden Node.js yığın sınırı |
| `PROMPT_CACHE_MAX_SIZE` | '50' | Maksimum bilgi istemi önbellek girişi |
| `SEMANTIC_CACHE_MAX_SIZE` | '100' | Maksimum anlamsal önbellek girişi |Ortam değişkeni referansının tamamı için [README](../README.md) dosyasına bakın.---

## 📊 Available Models

<detaylar>
<summary><b>Mevcut tüm modelleri görüntüleyin</b></summary>

**Claude Kodu ('cc/')**— Pro/Maks: 'cc/claude-opus-4-6', 'cc/claude-sonnet-4-5-20250929', 'cc/claude-haiku-4-5-20251001'

**Codex ('cx/')**— Plus/Pro: 'cx/gpt-5.2-codex', 'cx/gpt-5.1-codex-max'

**Gemini CLI ('gc/')**— ÜCRETSİZ: 'gc/gemini-3-flash-preview', 'gc/gemini-2.5-pro'

**GitHub Yardımcı Pilot ('gh/')**: 'gh/gpt-5', 'gh/claude-4.5-sonnet'

**GLM ('glm/')**— 0,6 ABD doları/1 milyon: 'glm/glm-4,7'

**MiniMaks ("minimaks/")**— 0,2 ABD doları/1 milyon: "minimaks/MiniMax-M2,1"

**Qoder ('if/')**— ÜCRETSİZ: 'if/kimi-k2-thinking', 'if/qwen3-coder-plus', 'if/deepseek-r1'

**Qwen ('qw/')**— ÜCRETSİZ: 'qw/qwen3-coder-plus', 'qw/qwen3-coder-flash'

**Kiro ('kr/')**— ÜCRETSİZ: 'kr/claude-sonnet-4.5', 'kr/claude-haiku-4.5'

**DeepSeek ('ds/')**: 'ds/deepseek-chat', 'ds/deepseek-reasoner'

**Groq ('groq/')**: 'groq/llama-3.3-70b-versatile', 'groq/llama-4-maverick-17b-128e-instruct'

**xAI ('xai/')**: 'xai/grok-4', 'xai/grok-4-0709-fast-reasoning', 'xai/grok-code-mini'

**Mistral ("mistral/")**: "mistral/mistral-büyük-2501", "mistral/codestral-2501"

**Şaşkınlık ('pplx/')**: 'pplx/sonar-pro', 'pplx/sonar'

**Birlikte AI ('birlikte/')**: 'birlikte/meta-llama/Llama-3.3-70B-Instruct-Turbo'

**Fireworks AI ('fireworks/')**: 'fireworks/accounts/fireworks/models/deepseek-v3p1'

**Beyinler ('beyinler/')**: 'beyinler/llama-3.3-70b'

**Tutarlı ('tutarlı/')**: `cohere/command-r-plus-08-2024'

**NVIDIA NIM ('nvidia/')**: 'nvidia/nvidia/llama-3.3-70b-instruct'</details>

---

## 🧩 Advanced Features

### Custom Models

Uygulama güncellemesini beklemeden herhangi bir sağlayıcıya herhangi bir model kimliğini ekleyin:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Veya Kontrol Panelini kullanın:**Sağlayıcılar → [Sağlayıcı] → Özel Modeller**.

Notlar:

- OpenRouter ve OpenAI/Anthropic uyumlu sağlayıcılar yalnızca**Mevcut Modeller**üzerinden yönetilir. Tümü manuel olarak ekleme, içe aktarma ve otomatik senkronizasyon aynı mevcut model listesinde yer alır; dolayısıyla bu sağlayıcılar için ayrı bir Özel Modeller bölümü yoktur. -**Özel Modeller**bölümü, yönetilen kullanılabilir model içe aktarmalarını göstermeyen sağlayıcılara yöneliktir.### Dedicated Provider Routes

Model doğrulamayla istekleri doğrudan belirli bir sağlayıcıya yönlendirin:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Sağlayıcı öneki eksikse otomatik olarak eklenir. Eşleşmeyen modeller "400" değerini döndürür.### Network Proxy Configuration

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
````

**Öncelik:**Anahtara özel → Kombineye özel → Sağlayıcıya özel → Genel → Çevre.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Sağlayıcıya göre türlerle ('sohbet', 'yerleştirme', 'resim') gruplandırılmış modelleri döndürür.### Cloud Sync

- Sağlayıcıları, kombinasyonları ve ayarları cihazlar arasında senkronize edin
- Zaman aşımı + hızlı arıza ile otomatik arka plan senkronizasyonu
- Üretimde sunucu tarafı `BASE_URL`/`CLOUD_URL`yi tercih edin### Cloudflare Quick Tunnel

- Docker ve diğer kendi kendine barındırılan dağıtımlar için**Kontrol Paneli → Uç Noktalar**'da mevcuttur
- Mevcut OpenAI uyumlu `/v1` uç noktanıza ileten geçici bir `https://*.trycloudflare.com` URL'si oluşturur
- İlk olarak yalnızca ihtiyaç duyulduğunda "cloudflared" yüklemelerini etkinleştirin; daha sonra yeniden başlatmalar aynı yönetilen ikili dosyayı yeniden kullanır
- Hızlı Tüneller, OmniRoute veya konteyner yeniden başlatıldıktan sonra otomatik olarak geri yüklenmez; gerektiğinde bunları kontrol panelinden yeniden etkinleştirin
- Tünel URL'leri geçicidir ve tüneli her durdurduğunuzda/başlattığınızda değişir
- Kısıtlı kapsayıcılarda gürültülü QUIC UDP arabellek uyarılarını önlemek için Yönetilen Hızlı Tüneller varsayılan olarak HTTP/2 aktarımını kullanır
- Yönetilen aktarım seçeneğini geçersiz kılmak istiyorsanız `CLOUDFLARED_PROTOCOL=quic` veya `auto` seçeneğini ayarlayın
- Yönetilen indirme yerine önceden yüklenmiş bir "cloudflared" ikili programı kullanmayı tercih ediyorsanız "CLOUDFLARED_BIN"i ayarlayın### LLM Gateway Intelligence (Phase 9)

-**Semantik Önbellek**— Akış dışı, sıcaklık=0 yanıtları otomatik olarak önbelleğe alır ('X-OmniRoute-No-Cache: true' ile atlama) -**Request Idempotency**— "Idempotency-Key" veya "X-Request-Id" başlığı aracılığıyla 5 saniye içinde istekleri tekilleştirir -**İlerleme Takibi**— "X-OmniRoute-Progress: true" başlığı aracılığıyla SSE "etkinliği: ilerleme" olaylarını etkinleştirme---

### Translator Playground

**Kontrol Paneli → Çevirmen**aracılığıyla erişim. OmniRoute'un sağlayıcılar arasında API isteklerini nasıl çevirdiğini hata ayıklayın ve görselleştirin.

| Modu                  | Amaç                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| **Oyun Alanı**        | Kaynak/hedef formatlarını seçin, bir istek yapıştırın ve çevrilmiş çıktıyı anında görün         |
| **Sohbet Test Aracı** | Proxy aracılığıyla canlı sohbet mesajları gönderin ve istek/yanıt döngüsünün tamamını inceleyin |
| **Test Tezgahı**      | Çeviri doğruluğunu doğrulamak için birden fazla format kombinasyonunda toplu testler yapın      |
| **Canlı Monitör**     | İstekler proxy üzerinden akarken gerçek zamanlı çevirileri izleyin                              |

**Kullanım durumları:**

- Belirli bir istemci/sağlayıcı kombinasyonunun neden başarısız olduğunu ayıklayın
- Düşünme etiketlerinin, araç çağrılarının ve sistem istemlerinin doğru şekilde tercüme edildiğini doğrulayın
- OpenAI, Claude, Gemini ve Responses API formatları arasındaki format farklarını karşılaştırın---

### Routing Strategies

**Kontrol Paneli → Ayarlar → Yönlendirme**aracılığıyla yapılandırın.

| Strateji                     | Açıklama                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Önce Doldur**              | Hesapları öncelik sırasına göre kullanır — birincil hesap, kullanılamayana kadar tüm istekleri yönetir         |
| **Yuvarlak Robin**           | Yapılandırılabilir bir sabit limitle tüm hesaplar arasında geçiş yapar (varsayılan: hesap başına 3 çağrı)      |
| **P2C (İki Seçimin Gücü)**   | Rastgele 2 hesap seçer ve daha sağlıklı olana yönlendirir — yükü sağlık farkındalığıyla dengeler               |
| **Rastgele**                 | Fisher-Yates shuffle'ı kullanarak her istek için rastgele bir hesap seçer                                      |
| **En Az Kullanılan**         | En eski "lastUsedAt" zaman damgasına sahip hesaba yönlendirme yaparak trafiği eşit şekilde dağıtır             |
| **Maliyet Optimize Edilmiş** | En düşük maliyetli sağlayıcılar için optimizasyon yaparak en düşük öncelik değerine sahip hesaba giden rotalar | #### External Sticky Session Header |

Harici oturum benzeşimi için (örneğin, ters proxy'lerin arkasındaki Claude Code/Codex aracıları) şunu gönderin:```http
X-Session-Id: your-session-key

````

OmniRoute ayrıca "x_session_id"yi kabul eder ve "X-OmniRoute-Session-Id"de etkin oturum anahtarını döndürür.

Nginx kullanıyorsanız ve alt çizgi biçiminde başlıklar gönderiyorsanız şunları etkinleştirin:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Model adlarını yeniden eşlemek için joker karakter desenleri oluşturun:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Joker karakterler `*` (herhangi bir karakter) ve `?` (tek karakter) destekler.#### Fallback Chains

Tüm istekler için geçerli olan genel geri dönüş zincirlerini tanımlayın:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

**Kontrol Paneli → Ayarlar → Dayanıklılık**aracılığıyla yapılandırın.

OmniRoute, sağlayıcı düzeyinde esnekliği dört bileşenle uygular:

1.**Sağlayıcı Profilleri**— Aşağıdakiler için sağlayıcı başına yapılandırma:

- Arıza eşiği (açılmadan önce kaç arıza)
- Bekleme süresi
- Hız sınırı algılama hassasiyeti
- Üstel geri çekilme parametreleri

  2.**Düzenlenebilir Hız Sınırları**— Kontrol panelinde yapılandırılabilen sistem düzeyinde varsayılanlar: -**Dakika Başına İstek (RPM)**— Hesap başına dakika başına maksimum istek -**İstekler Arasındaki Minimum Süre**— İstekler arasındaki milisaniye cinsinden minimum boşluk -**Maksimum Eşzamanlı İstekler**— Hesap başına maksimum eşzamanlı istekler

- Değiştirmek için**Düzenle**'yi ve ardından**Kaydet**veya**İptal**'i tıklayın. Değerler, esneklik API'si aracılığıyla korunur.

  3.**Devre Kesici**— Sağlayıcı başına arızaları izler ve bir eşiğe ulaşıldığında devreyi otomatik olarak açar: -**KAPALI**(Sağlıklı) — İstekler normal şekilde akıyor -**AÇIK**— Tekrarlanan hatalardan sonra sağlayıcı geçici olarak engellenir -**HALF_OPEN**— Sağlayıcının iyileşip iyileşmediği test ediliyor

  4.**İlkeler ve Kilitli Tanımlayıcılar**— Zorunlu kilit açma özelliğiyle devre kesici durumunu ve kilitli tanımlayıcıları gösterir.

  5.**Otomatik Hız Sınırı Algılama**— Sağlayıcının hız sınırlarına ulaşmayı proaktif olarak önlemek için "429" ve "Sonra Yeniden Dene" başlıklarını izler.

**Profesyonel İpucu:**Sağlayıcı bir kesintiden kurtulduğunda tüm devre kesicileri ve bekleme sürelerini temizlemek için**Tümünü Sıfırla**düğmesini kullanın.---

### Database Export / Import

**Kontrol Paneli → Ayarlar → Sistem ve Depolama**bölümünden veritabanı yedeklemelerini yönetin.

| Eylem                           | Açıklama                                                                                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Veritabanını Dışa Aktar**     | Geçerli SQLite veritabanını `.sqlite` dosyası olarak indirir                                                                                                                    |
| **Tümünü Dışa Aktar (.tar.gz)** | Aşağıdakileri içeren tam bir yedekleme arşivini indirir: veritabanı, ayarlar, kombinasyonlar, sağlayıcı bağlantıları (kimlik bilgileri yok), API anahtarı meta verileri         |
| **Veritabanını İçe Aktar**      | Mevcut veritabanını değiştirmek için bir `.sqlite` dosyası yükleyin. `DISABLE_SQLITE_AUTO_BACKUP=true` olmadığı sürece içe aktarma öncesi yedekleme otomatik olarak oluşturulur | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**İçe Aktarma Doğrulaması:**İçe aktarılan dosyanın bütünlüğü (SQLite pragma kontrolü), gerekli tablolar (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) ve boyutu (maks. 100MB) açısından doğrulanır.

**Kullanım Durumları:**

- OmniRoute'u makineler arasında taşıyın
- Felaket kurtarma için harici yedeklemeler oluşturun
- Yapılandırmaları ekip üyeleri arasında paylaşın (tümünü dışa aktar → arşivi paylaş)---

### Settings Dashboard

Ayarlar sayfası, kolay gezinme için 6 sekme halinde düzenlenmiştir:

| Sekme | İçindekiler |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**Genel**| Sistem depolama araçları, görünüm ayarları, tema kontrolleri ve öğe başına kenar çubuğu görünürlüğü |
|**Güvenlik**| Oturum Açma/Şifre ayarları, IP Erişim Kontrolü, `/models` için API kimlik doğrulaması ve Sağlayıcı Engelleme |
|**Yönlendirme**| Küresel yönlendirme stratejisi (6 seçenek), joker karakter modeli takma adları, geri dönüş zincirleri, birleşik varsayılanlar |
|**Dayanıklılık**| Sağlayıcı profilleri, düzenlenebilir hız limitleri, devre kesici durumu, politikalar ve kilitli tanımlayıcılar |
|**AI**| Bütçe yapılandırmasını düşünme, küresel sistem istemi enjeksiyonu, istem önbellek istatistikleri |
|**Gelişmiş**| Genel proxy yapılandırması (HTTP/SOCKS5) |---

### Costs & Budget Management

**Kontrol Paneli → Maliyetler**üzerinden erişim.

| Sekme | Amaç |
| ----------- | ----------------------------------------------------------------------------- |
|**Bütçe**| Günlük/haftalık/aylık bütçeler ve gerçek zamanlı izleme ile API anahtarı başına harcama sınırlarını belirleyin |
|**Fiyatlandırma**| Model fiyatlandırma girişlerini görüntüleyin ve düzenleyin - sağlayıcı başına 1.000 giriş/çıkış jetonu başına maliyet |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Maliyet Takibi:**Her istek, jeton kullanımını günlüğe kaydeder ve fiyatlandırma tablosunu kullanarak maliyeti hesaplar. Sağlayıcıya, modele ve API anahtarına göre**Kontrol Paneli → Kullanım**bölümündeki dökümleri görüntüleyin.---

### Audio Transcription

OmniRoute, OpenAI uyumlu uç nokta aracılığıyla ses transkripsiyonunu destekler:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Mevcut sağlayıcılar:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Desteklenen ses formatları: 'mp3', 'wav', 'm4a', 'flac', 'ogg', 'webm'.---

### Combo Balancing Strategies

**Kombo başına dengelemeyi**Kontrol Paneli → Kombinasyonlar → Oluştur/Düzenle → Strateji**bölümünde yapılandırın.

| Strateji | Açıklama |
| ------------------ | ------------------------------------------------------------- |
|**Round-Robin**| Modeller arasında sırayla döner |
|**Öncelik**| Daima ilk modeli dener; yalnızca hata durumunda geri çekilir |
|**Rastgele**| Her istek için kombodan rastgele bir model seçer |
|**Ağırlıklı**| Model başına atanan ağırlıklara göre orantılı olarak rotalar |
|**En Az Kullanılan**| En az yeni isteğin bulunduğu modele yönlendirmeler (birleşik metrikleri kullanır) |
|**Maliyet Optimize Edilmiş**| Mevcut en ucuz modele giden yollar (fiyat tablosunu kullanır) |

Genel birleşik varsayılanlar**Kontrol Paneli → Ayarlar → Yönlendirme → Birleşik Varsayılanlar**bölümünden ayarlanabilir.---

### Health Dashboard

**Kontrol Paneli → Sağlık**üzerinden erişim. 6 kartla gerçek zamanlı sistem sağlığına genel bakış:

| Kart | Ne Gösteriyor |
| --------------------- | ------------------------------------------------- |
|**Sistem Durumu**| Çalışma süresi, sürüm, bellek kullanımı, veri dizini |
|**Sağlayıcı Sağlığı**| Sağlayıcı başına devre kesici durumu (Kapalı/Açık/Yarı Açık) |
|**Oran Sınırları**| Kalan süreyle birlikte hesap başına aktif oran sınırı bekleme süreleri |
|**Etkin Kilitlemeler**| Sağlayıcılar kilitleme politikası nedeniyle geçici olarak engellendi |
|**İmza Önbelleği**| Veri tekilleştirme önbellek istatistikleri (etkin anahtarlar, isabet oranı) |
|**Gecikme Telemetrisi**| sağlayıcı başına p50/p95/p99 gecikme toplamı |

**Profesyonel İpucu:**Sağlık sayfası her 10 saniyede bir otomatik olarak yenilenir. Hangi sağlayıcıların sorun yaşadığını belirlemek için devre kesici kartını kullanın.---

## 🖥️ Desktop Application (Electron)

OmniRoute, Windows, macOS ve Linux için yerel bir masaüstü uygulaması olarak mevcuttur.### Kurulum

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Çıkış → 'elektron/uzak-elektron/'### Key Features

| Özellik                         | Açıklama                                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------- |
| **Sunucu Hazırlığı**            | Pencereyi göstermeden önce anket sunucusu (boş ekran yok)                                 |
| **Sistem Tepsisi**              | Tepsiye küçültün, bağlantı noktasını değiştirin, tepsi menüsünden çıkın                   |
| **Liman Yönetimi**              | Sunucu bağlantı noktasını tepsiden değiştirin (sunucuyu otomatik olarak yeniden başlatır) |
| **İçerik Güvenliği Politikası** | Oturum başlıkları aracılığıyla kısıtlayıcı CSP                                            |
| **Tek Örnek**                   | Aynı anda yalnızca bir uygulama örneği çalıştırılabilir                                   |
| **Çevrimdışı Mod**              | Birlikte verilen Next.js sunucusu internet olmadan çalışır                                | ### Environment Variables |

| Değişken              | Varsayılan | Açıklama                           |
| --------------------- | ---------- | ---------------------------------- |
| `OMNIROUTE_PORT`      | '20128'    | Sunucu bağlantı noktası            |
| `OMNIROUTE_MEMORY_MB` | '512'      | Node.js yığın sınırı (64–16384 MB) |

📖 Tüm belgeler: [`electron/README.md`](../electron/README.md)
