# User Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

คู่มือฉบับสมบูรณ์สำหรับการกำหนดค่าผู้ให้บริการ การสร้างคอมโบ การผสานรวมเครื่องมือ CLI และการปรับใช้ OmniRoute---

## Table of Contents

- [การกำหนดราคาโดยสรุป](#-การกำหนดราคาโดยสรุป)
- [กรณีการใช้งาน](#-กรณีการใช้งาน)
- [การตั้งค่าผู้ให้บริการ](#-การตั้งค่าผู้ให้บริการ)
- [การรวม CLI](#-การรวม cli)
- [ปรับใช้](#-ปรับใช้)
- [รุ่นที่มีจำหน่าย](#-รุ่นที่มีจำหน่าย)
- [คุณสมบัติขั้นสูง](#-คุณสมบัติขั้นสูง)---

## 💰 Pricing at a Glance

| ชั้น               | ผู้ให้บริการ     | ราคา             | รีเซ็ตโควต้า        | ดีที่สุดสำหรับ               |
| ------------------ | ---------------- | ---------------- | ------------------- | ---------------------------- |
| **💳 สมัครสมาชิก** | รหัสคลอดด์ (Pro) | $20/เดือน        | 5 ชม. + รายสัปดาห์  | สมัครสมาชิกแล้ว              |
|                    | Codex (พลัส/โปร) | $20-200/เดือน    | 5 ชม. + รายสัปดาห์  | ผู้ใช้ OpenAI                |
|                    | ราศีเมถุน CLI    | **ฟรี**          | 180K/เดือน + 1K/วัน | ทุกคน!                       |
|                    | นักบิน GitHub    | $10-19/เดือน     | รายเดือน            | ผู้ใช้ GitHub                |
| **🔑 คีย์ API**    | DeepSeek         | จ่ายตามการใช้งาน | ไม่มี               | การใช้เหตุผลราคาถูก          |
|                    | กรอค             | จ่ายตามการใช้งาน | ไม่มี               | การอนุมานที่รวดเร็วเป็นพิเศษ |
|                    | xAI (โกรก)       | จ่ายตามการใช้งาน | ไม่มี               | Grok 4 การใช้เหตุผล          |
|                    | มิสทรัล          | จ่ายตามการใช้งาน | ไม่มี               | โมเดลที่โฮสต์โดยสหภาพยุโรป   |
|                    | ความฉงนสนเท่ห์   | จ่ายตามการใช้งาน | ไม่มี               | การค้นหาเสริม                |
|                    | ร่วมกัน AI       | จ่ายตามการใช้งาน | ไม่มี               | โมเดลโอเพ่นซอร์ส             |
|                    | ดอกไม้ไฟ AI      | จ่ายตามการใช้งาน | ไม่มี               | ภาพ FLUX ที่รวดเร็ว          |
|                    | สมอง             | จ่ายตามการใช้งาน | ไม่มี               | ความเร็วระดับเวเฟอร์         |
|                    | เชื่อมโยง        | จ่ายตามการใช้งาน | ไม่มี               | คำสั่ง R+ RAG                |
|                    | NVIDIA NIM       | จ่ายตามการใช้งาน | ไม่มี               | โมเดลองค์กร                  |
| **💰 ราคาถูก**     | GLM-4.7          | $0.6/1M          | ทุกวัน 10.00 น.     | สำรองงบประมาณ                |
|                    | MiniMax M2.1     | $0.2/1M          | กลิ้ง 5 ชั่วโมง     | ตัวเลือกที่ถูกที่สุด         |
|                    | คิมิ K2          | $9/เดือน คงที่   | 10M โทเค็น/เดือน    | ต้นทุนที่คาดการณ์ได้         |
| **🆓 ฟรี**         | คิวเดอร์         | $0               | ไม่จำกัด            | ฟรี 8 รุ่น                   |
|                    | ควีน             | $0               | ไม่จำกัด            | ฟรี 3 รุ่น                   |
|                    | คิโระ            | $0               | ไม่จำกัด            | คลอดด์ฟรี                    |

**💡 เคล็ดลับสำหรับมืออาชีพ:**เริ่มต้นด้วย Gemini CLI (ฟรี 180,000 ต่อเดือน) + Qoder (ฟรีไม่จำกัด) คอมโบ = ค่าใช้จ่าย $0!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**ปัญหา:**โควต้าหมดอายุโดยไม่ได้ใช้ อัตราจำกัดระหว่างการเขียนโค้ดจำนวนมาก```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**ปัญหา:**ไม่สามารถสมัครสมาชิกได้ ต้องการการเข้ารหัส AI ที่เชื่อถือได้```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**ปัญหา:**กำหนดเวลา ไม่สามารถหยุดการทำงานได้```
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

**ปัญหา:**ต้องการผู้ช่วย AI ในแอปส่งข้อความ ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น```
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

**เคล็ดลับสำหรับมือโปร:**ใช้ Opus สำหรับงานที่ซับซ้อน และใช้ Sonnet เพื่อความรวดเร็ว โควต้าการติดตาม OmniRoute ต่อรุ่น!#### OpenAI Codex (Plus/Pro)

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

**คุ้มค่าที่สุด:**ระดับฟรีมหาศาล! ใช้สิ่งนี้ก่อนระดับที่ชำระเงิน#### GitHub Copilot

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

1. ลงทะเบียน: [Zhipu AI](https://open.bigmodel.cn/)
2. รับคีย์ API จาก Coding Plan
3. แดชบอร์ด → เพิ่มคีย์ API: ผู้ให้บริการ: `glm`, คีย์ API: `your-key`

**ใช้:**`glm/glm-4.7` —**เคล็ดลับสำหรับมือโปร:**แผนการเขียนโค้ดเสนอโควต้า 3× ในราคา 1/7! รีเซ็ตทุกวัน 10.00 น.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. ลงทะเบียน: [MiniMax](https://www.minimax.io/)
2. รับคีย์ API → แดชบอร์ด → เพิ่มคีย์ API

**ใช้:**`minimax/MiniMax-M2.1` —**เคล็ดลับสำหรับมือโปร:**ตัวเลือกที่ถูกที่สุดสำหรับบริบทแบบยาว (โทเค็น 1M)!#### Kimi K2 ($9/month flat)

1. สมัครสมาชิก: [Moonshot AI](https://platform.moonshot.ai/)
2. รับคีย์ API → แดชบอร์ด → เพิ่มคีย์ API

**ใช้:**`kimi/kimi-latest` —**เคล็ดลับสำหรับมือโปร:**แก้ไข $9/เดือนสำหรับโทเค็น 10M = $0.90/ต้นทุนจริง 1M!### 🆓 FREE Providers

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

แก้ไข `~/.claude/config.json`:```json
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

แก้ไข `~/.openclaw/openclaw.json`:```json
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

**หรือใช้แดชบอร์ด:**เครื่องมือ CLI → OpenClaw → กำหนดค่าอัตโนมัติ### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## การปรับใช้

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

CLI จะโหลด `.env` โดยอัตโนมัติจาก `~/.omniroute/.env` หรือ `./.env`### VPS Deployment

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

สำหรับเซิร์ฟเวอร์ที่มี RAM จำกัด ให้ใช้ตัวเลือกขีดจำกัดหน่วยความจำ:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

สร้าง `ecosystem.config.js`:```javascript
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

สำหรับโหมดรวมโฮสต์ที่มีไบนารี CLI โปรดดูส่วนนักเทียบท่าในเอกสารหลัก### Void Linux (xbps-src)

ผู้ใช้ Void Linux สามารถจัดทำแพ็คเกจและติดตั้ง OmniRoute ได้โดยใช้เฟรมเวิร์กการคอมไพล์ข้าม `xbps-src` สิ่งนี้จะทำให้การสร้าง Node.js แบบสแตนด์อโลนเป็นแบบอัตโนมัติพร้อมกับการเชื่อมโยงแบบเนทีฟ `better-sqlite3` ที่จำเป็น

<รายละเอียด>

<summary><b>ดูเทมเพลต xbps-src</b></summary>```bash
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

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | เคล็ดลับการลงนาม JWT (**การเปลี่ยนแปลงในการผลิต**) |
| `INITIAL_PASSWORD` | `123456` | รหัสผ่านเข้าสู่ระบบครั้งแรก |
| `DATA_DIR` | `~/.omniroute` | ไดเร็กทอรีข้อมูล (db, การใช้งาน, บันทึก) |
| `พอร์ต` | ค่าเริ่มต้นของเฟรมเวิร์ก | พอร์ตบริการ (ในตัวอย่าง `20128`) |
| `ชื่อโฮสต์` | ค่าเริ่มต้นของเฟรมเวิร์ก | ผูกโฮสต์ (ค่าเริ่มต้นของนักเทียบท่าคือ `0.0.0.0`) |
| `NODE_ENV` | รันไทม์เริ่มต้น | ตั้งค่า `การผลิต` สำหรับการปรับใช้ |
| `BASE_URL` | `http://localhost:20128` | URL ฐานภายในฝั่งเซิร์ฟเวอร์ |
| `CLOUD_URL` | `https://omniroute.dev` | URL ฐานปลายทางการซิงค์บนคลาวด์ |
| `API_KEY_SECRET` | `จุดสิ้นสุด-พร็อกซี-api-คีย์-ความลับ` | ข้อมูลลับ HMAC สำหรับคีย์ API ที่สร้างขึ้น |
| `REQUIRE_API_KEY` | `เท็จ` | บังคับใช้คีย์ Bearer API บน `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `เท็จ` | อนุญาตให้ Api Manager คัดลอกคีย์ API แบบเต็มตามต้องการ |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | จังหวะการรีเฟรชฝั่งเซิร์ฟเวอร์สำหรับข้อมูลขีดจำกัดผู้ให้บริการที่แคชไว้ ปุ่มรีเฟรช UI ยังคงทริกเกอร์การซิงค์ด้วยตนเอง |
| `DISABLE_SQLITE_AUTO_BACKUP` | `เท็จ` | ปิดการใช้งานสแน็ปช็อต SQLite อัตโนมัติก่อนที่จะเขียน/นำเข้า/กู้คืน การสำรองข้อมูลด้วยตนเองยังคงใช้งานได้ |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `เท็จ` | บังคับใช้คุกกี้การตรวจสอบสิทธิ์ 'Secure' (หลังพร็อกซีย้อนกลับ HTTPS) |
| `CLOUDFLARED_BIN` | ไม่ได้ตั้งค่า | ใช้ไบนารี 'cloudflared' ที่มีอยู่แทนการดาวน์โหลดที่ได้รับการจัดการ |
| `CLOUDFLARED_PROTOCOL` | `http2` | การขนส่งสำหรับ Quick Tunnels ที่มีการจัดการ (`http2`, `quic` หรือ `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | ขีด จำกัด ฮีปของ Node.js ในหน่วย MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | รายการแคชพร้อมท์สูงสุด |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | รายการแคชความหมายสูงสุด |สำหรับการอ้างอิงตัวแปรสภาพแวดล้อมแบบเต็ม โปรดดูที่ [README](../README.md)---

## 📊 Available Models

<รายละเอียด>
<summary><b>ดูรุ่นที่มีทั้งหมด</b></summary>

**รหัสโคลด (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— ฟรี: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**โปรแกรมควบคุม GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)**— $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— ฟรี: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— ฟรี: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**คิโระ (`kr/`)**— ฟรี: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-การใช้เหตุผลอย่างรวดเร็ว`, `xai/grok-code-mini`

**มิสทรัล (`มิสทรัล/`)**: `มิสทรัล/มิสทรัล-ใหญ่-2501`, `มิสทรัล/โค้ดสเตรัล-2501`

**ความงุนงง (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`ร่วมกัน/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**ดอกไม้ไฟ AI (`ดอกไม้ไฟ/`)**: `ดอกไม้ไฟ/บัญชี/ดอกไม้ไฟ/โมเดล/deepseek-v3p1`

**สมอง (`สมอง/`)**: `สมอง/llama-3.3-70b`

**เชื่อมโยงกัน (`เชื่อมโยงกัน/`)**: `เชื่อมโยงกัน/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

เพิ่ม ID รุ่นใดๆ ให้กับผู้ให้บริการโดยไม่ต้องรอการอัปเดตแอป:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

หรือใช้แดชบอร์ด:**ผู้ให้บริการ → [ผู้ให้บริการ] → โมเดลที่กำหนดเอง**

หมายเหตุ:

- ผู้ให้บริการที่เข้ากันได้กับ OpenRouter และ OpenAI/Anthropic ได้รับการจัดการจาก**รุ่นที่มีจำหน่าย**เท่านั้น เพิ่ม นำเข้า และซิงค์อัตโนมัติทั้งหมดด้วยตนเองในรายการโมเดลที่มีอยู่เดียวกัน ดังนั้นจึงไม่มีส่วนโมเดลแบบกำหนดเองแยกต่างหากสำหรับผู้ให้บริการเหล่านั้น
- ส่วน**โมเดลที่กำหนดเอง**มีไว้สำหรับผู้ให้บริการที่ไม่เปิดเผยการนำเข้าโมเดลที่มีอยู่ที่มีการจัดการ### Dedicated Provider Routes

กำหนดเส้นทางคำขอโดยตรงไปยังผู้ให้บริการเฉพาะด้วยการตรวจสอบโมเดล:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

คำนำหน้าผู้ให้บริการจะถูกเพิ่มอัตโนมัติหากไม่มี โมเดลที่ไม่ตรงกันส่งคืน "400"### Network Proxy Configuration

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

**ลำดับความสำคัญ:**เฉพาะคีย์ → เฉพาะคอมโบ → เฉพาะผู้ให้บริการ → ทั่วโลก → สภาพแวดล้อม### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

ส่งคืนโมเดลที่จัดกลุ่มตามผู้ให้บริการที่มีประเภท (`แชท`, `การฝัง`, `รูปภาพ`)### Cloud Sync

- ซิงค์ผู้ให้บริการ คอมโบ และการตั้งค่าระหว่างอุปกรณ์ต่างๆ
- การซิงค์พื้นหลังอัตโนมัติพร้อมการหมดเวลา + ล้มเหลวอย่างรวดเร็ว
- ต้องการ `BASE_URL`/`CLOUD_URL` ฝั่งเซิร์ฟเวอร์ในการใช้งานจริง### Cloudflare Quick Tunnel

- มีอยู่ใน**Dashboard → Endpoints**สำหรับ Docker และการปรับใช้อื่นๆ ที่โฮสต์เอง
- สร้าง URL `https://*.trycloudflare.com` ชั่วคราวที่ส่งต่อไปยังจุดสิ้นสุด `/v1` ที่เข้ากันได้กับ OpenAI ปัจจุบันของคุณ
- ขั้นแรกให้เปิดใช้งานการติดตั้ง `cloudflared` เมื่อจำเป็นเท่านั้น รีสตาร์ทในภายหลังนำไบนารีที่ได้รับการจัดการเดิมมาใช้ซ้ำ
- Quick Tunnels จะไม่ถูกกู้คืนอัตโนมัติหลังจากการรีสตาร์ท OmniRoute หรือคอนเทนเนอร์ เปิดใช้งานอีกครั้งจากแดชบอร์ดเมื่อจำเป็น
- URL ของอุโมงค์ข้อมูลเป็นแบบชั่วคราวและเปลี่ยนแปลงทุกครั้งที่คุณหยุด/เริ่มต้นอุโมงค์
- Quick Tunnels ที่มีการจัดการมีค่าเริ่มต้นเป็นการขนส่ง HTTP/2 เพื่อหลีกเลี่ยงคำเตือนบัฟเฟอร์ QUIC UDP ที่มีเสียงดังในคอนเทนเนอร์ที่จำกัด
- ตั้งค่า `CLOUDFLARED_PROTOCOL=quic` หรือ `auto` หากคุณต้องการแทนที่ตัวเลือกการขนส่งที่มีการจัดการ
- ตั้งค่า `CLOUDFLARED_BIN` หากคุณต้องการใช้ไบนารี 'cloudflared' ที่ติดตั้งไว้ล่วงหน้าแทนการดาวน์โหลดที่มีการจัดการ### LLM Gateway Intelligence (Phase 9)

-**Semantic Cache**— แคชอัตโนมัติไม่สตรีม อุณหภูมิ=0 การตอบสนอง (บายพาสด้วย `X-OmniRoute-No-Cache: true`) -**คำขอ Idempotency**— กรองคำขอที่ซ้ำกันภายใน 5 วินาทีผ่านส่วนหัว `Idempotency-Key` หรือ `X-Request-Id` -**การติดตามความคืบหน้า**— เลือกใช้เหตุการณ์ `เหตุการณ์: ความคืบหน้า` ของ SSE ผ่านส่วนหัว `X-OmniRoute-Progress: true`---

### Translator Playground

เข้าถึงได้ทาง**Dashboard → Translator**แก้ไขข้อบกพร่องและเห็นภาพว่า OmniRoute แปลคำขอ API ระหว่างผู้ให้บริการอย่างไร

| โหมด                      | วัตถุประสงค์                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------- |
| **สนามเด็กเล่น**          | เลือกรูปแบบต้นทาง/เป้าหมาย วางคำขอ และดูผลลัพธ์ที่แปลได้ทันที                      |
| **เครื่องมือทดสอบการแชท** | ส่งข้อความแชทสดผ่านพร็อกซีและตรวจสอบรอบคำขอ/การตอบกลับทั้งหมด                      |
| **ม้านั่งทดสอบ**          | เรียกใช้การทดสอบเป็นกลุ่มโดยใช้รูปแบบต่างๆ ร่วมกันเพื่อตรวจสอบความถูกต้องของการแปล |
| **ถ่ายทอดสด**             | ดูการแปลแบบเรียลไทม์ตามคำขอที่ไหลผ่านพร็อกซี                                       |

**กรณีการใช้งาน:**

- ตรวจแก้จุดบกพร่องว่าทำไมการรวมไคลเอนต์/ผู้ให้บริการเฉพาะจึงล้มเหลว
- ตรวจสอบว่าแท็กการคิด การเรียกใช้เครื่องมือ และการแจ้งเตือนของระบบแปลอย่างถูกต้อง
- เปรียบเทียบความแตกต่างของรูปแบบระหว่างรูปแบบ OpenAI, Claude, Gemini และ Responses API---

### Routing Strategies

กำหนดค่าผ่าน**แดชบอร์ด → การตั้งค่า → การกำหนดเส้นทาง**

| กลยุทธ์                   | คำอธิบาย                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| **กรอกก่อน**              | ใช้บัญชีตามลำดับความสำคัญ — บัญชีหลักจะจัดการคำขอทั้งหมดจนกว่าจะไม่พร้อมใช้งาน                                     |
| **โรบินตัวกลม**           | วนรอบบัญชีทั้งหมดด้วยขีดจำกัดที่กำหนดได้ (ค่าเริ่มต้น: 3 สายต่อบัญชี)                                              |
| **P2C (พลังสองตัวเลือก)** | เลือกบัญชีและเส้นทางแบบสุ่ม 2 บัญชีไปยังบัญชีที่ดีต่อสุขภาพมากขึ้น — สร้างสมดุลระหว่างภาระกับการรับรู้เรื่องสุขภาพ |
| **สุ่ม**                  | สุ่มเลือกบัญชีสำหรับแต่ละคำขอโดยใช้ Fisher-Yates shuffle                                                           |
| **ใช้น้อยที่สุด**         | กำหนดเส้นทางไปยังบัญชีที่มีการประทับเวลา `lastUsedAt` ที่เก่าที่สุด ซึ่งกระจายการรับส่งข้อมูลอย่างเท่าเทียมกัน     |
| **ปรับต้นทุนให้เหมาะสม**  | กำหนดเส้นทางไปยังบัญชีที่มีค่าลำดับความสำคัญต่ำสุด ปรับให้เหมาะสมสำหรับผู้ให้บริการที่มีต้นทุนต่ำที่สุด            | #### External Sticky Session Header |

สำหรับความสัมพันธ์ของเซสชันภายนอก (เช่น เอเจนต์ Claude Code/Codex ที่อยู่หลังพร็อกซีย้อนกลับ) ให้ส่ง:```http
X-Session-Id: your-session-key

````

OmniRoute ยังยอมรับ `x_session_id` และส่งคืนคีย์เซสชันที่มีผลใน `X-OmniRoute-Session-Id`

หากคุณใช้ Nginx และส่งส่วนหัวที่มีรูปแบบขีดล่าง ให้เปิดใช้งาน:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

สร้างรูปแบบไวด์การ์ดเพื่อทำการแมปชื่อโมเดลใหม่:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Wildcard รองรับ `*` (อักขระใดก็ได้) และ `?` (อักขระเดี่ยว)#### Fallback Chains

กำหนดห่วงโซ่ทางเลือกส่วนกลางที่ใช้กับคำขอทั้งหมด:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

กำหนดค่าผ่าน**แดชบอร์ด → การตั้งค่า → ความยืดหยุ่น**

OmniRoute ใช้ความยืดหยุ่นระดับผู้ให้บริการด้วยองค์ประกอบสี่ประการ:

1.**โปรไฟล์ผู้ให้บริการ**— การกำหนดค่าต่อผู้ให้บริการสำหรับ:

- เกณฑ์ความล้มเหลว (จำนวนความล้มเหลวก่อนเปิด)
- ระยะเวลาคูลดาวน์
- ความไวในการตรวจจับขีด จำกัด อัตรา
- พารามิเตอร์แบ็คออฟเอ็กซ์โปเนนเชียล

  2.**ขีดจำกัดอัตราที่แก้ไขได้**— ค่าเริ่มต้นระดับระบบที่กำหนดค่าได้ในแดชบอร์ด: -**คำขอต่อนาที (RPM)**— คำขอสูงสุดต่อนาทีต่อบัญชี -**เวลาขั้นต่ำระหว่างคำขอ**— ช่องว่างขั้นต่ำเป็นมิลลิวินาทีระหว่างคำขอ -**คำขอพร้อมกันสูงสุด**— คำขอพร้อมกันสูงสุดต่อบัญชี

- คลิก**แก้ไข**เพื่อแก้ไข จากนั้น**บันทึก**หรือ**ยกเลิก**ค่ายังคงมีอยู่ผ่าน API ความยืดหยุ่น

  3.**เซอร์กิตเบรกเกอร์**— ติดตามความล้มเหลวของผู้ให้บริการแต่ละราย และเปิดวงจรโดยอัตโนมัติเมื่อถึงเกณฑ์: -**ปิด**(สมบูรณ์) — คำขอดำเนินไปตามปกติ -**เปิด**— ผู้ให้บริการถูกบล็อกชั่วคราวหลังจากเกิดข้อผิดพลาดซ้ำแล้วซ้ำอีก -**HALF_OPEN**— ทดสอบว่าผู้ให้บริการฟื้นตัวหรือไม่

  4.**นโยบายและตัวระบุที่ถูกล็อค**— แสดงสถานะเซอร์กิตเบรกเกอร์และตัวระบุที่ถูกล็อคพร้อมความสามารถในการบังคับปลดล็อค

  5.**การตรวจจับขีดจำกัดอัตราอัตโนมัติ**— ตรวจสอบส่วนหัว `429` และ `Retry-After` เพื่อหลีกเลี่ยงไม่ให้เกินขีดจำกัดอัตราของผู้ให้บริการในเชิงรุก

**เคล็ดลับสำหรับมือโปร:**ใช้ปุ่ม**รีเซ็ตทั้งหมด**เพื่อล้างเซอร์กิตเบรกเกอร์และคูลดาวน์ทั้งหมดเมื่อผู้ให้บริการฟื้นตัวจากการหยุดทำงาน---

### Database Export / Import

จัดการการสำรองฐานข้อมูลใน**แดชบอร์ด → การตั้งค่า → ระบบและที่เก็บข้อมูล**

| การกระทำ                    | คำอธิบาย                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **ฐานข้อมูลการส่งออก**      | ดาวน์โหลดฐานข้อมูล SQLite ปัจจุบันเป็นไฟล์ `.sqlite`                                                                                                  |
| **ส่งออกทั้งหมด (.tar.gz)** | ดาวน์โหลดไฟล์เก็บถาวรการสำรองข้อมูลแบบเต็ม รวมถึง: ฐานข้อมูล การตั้งค่า คอมโบ การเชื่อมต่อของผู้ให้บริการ (ไม่มีข้อมูลประจำตัว) ข้อมูลเมตาของคีย์ API |
| **นำเข้าฐานข้อมูล**         | อัปโหลดไฟล์ `.sqlite` เพื่อแทนที่ฐานข้อมูลปัจจุบัน ข้อมูลสำรองล่วงหน้าที่นำเข้าจะถูกสร้างขึ้นโดยอัตโนมัติ เว้นแต่ `DISABLE_SQLITE_AUTO_BACKUP=true`   | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**การตรวจสอบการนำเข้า:**ไฟล์ที่นำเข้าได้รับการตรวจสอบความสมบูรณ์ (การตรวจสอบ SQLite Pragma), ตารางที่จำเป็น (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) และขนาด (สูงสุด 100MB)

**กรณีการใช้งาน:**

- โยกย้าย OmniRoute ระหว่างเครื่อง
- สร้างการสำรองข้อมูลภายนอกสำหรับการกู้คืนระบบ
- แบ่งปันการกำหนดค่าระหว่างสมาชิกในทีม (ส่งออกทั้งหมด → แชร์ไฟล์เก็บถาวร)---

### Settings Dashboard

หน้าการตั้งค่าแบ่งออกเป็น 6 แท็บเพื่อให้ง่ายต่อการนำทาง:

| แท็บ | สารบัญ |
| -------------- | -------------------------------------------------------------------------------------------------- |
|**ทั่วไป**| เครื่องมือจัดเก็บข้อมูลระบบ การตั้งค่าลักษณะที่ปรากฏ การควบคุมธีม และการมองเห็นแถบด้านข้างต่อรายการ
|**ความปลอดภัย**| การตั้งค่าการเข้าสู่ระบบ/รหัสผ่าน, การควบคุมการเข้าถึง IP, การตรวจสอบสิทธิ์ API สำหรับ `/models` และการบล็อกผู้ให้บริการ |
|**การกำหนดเส้นทาง**| กลยุทธ์การกำหนดเส้นทางทั่วโลก (6 ตัวเลือก), นามแฝงโมเดลไวด์การ์ด, เชนทางเลือก, ค่าเริ่มต้นคอมโบ |
|**ความยืดหยุ่น**| โปรไฟล์ผู้ให้บริการ ขีดจำกัดอัตราที่แก้ไขได้ สถานะเซอร์กิตเบรกเกอร์ นโยบาย และตัวระบุที่ถูกล็อค |
|**เอไอ**| คิดการกำหนดค่างบประมาณ, การแทรกพร้อมท์ของระบบทั่วโลก, สถิติแคชพร้อมต์ |
|**ขั้นสูง**| การกำหนดค่าพร็อกซีส่วนกลาง (HTTP/SOCKS5) |---

### Costs & Budget Management

เข้าถึงได้ผ่าน**แดชบอร์ด → ค่าใช้จ่าย**

| แท็บ | วัตถุประสงค์ |
| ----------- | -------------------------------------------------------------------------------------------- |
|**งบประมาณ**| กำหนดขีดจำกัดการใช้จ่ายต่อคีย์ API ด้วยงบประมาณรายวัน/รายสัปดาห์/รายเดือนและการติดตามแบบเรียลไทม์ |
|**ราคา**| ดูและแก้ไขรายการการกำหนดราคาโมเดล — ต้นทุนต่อโทเค็นอินพุต/เอาท์พุต 1K ต่อผู้ให้บริการ |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**การติดตามต้นทุน:**ทุกคำขอจะบันทึกการใช้โทเค็นและคำนวณต้นทุนโดยใช้ตารางราคา ดูรายละเอียดใน**แดชบอร์ด → การใช้งาน**ตามผู้ให้บริการ รุ่น และคีย์ API---

### Audio Transcription

OmniRoute รองรับการถอดเสียงผ่านปลายทางที่เข้ากันได้กับ OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

ผู้ให้บริการที่มีอยู่:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`)

รูปแบบเสียงที่รองรับ: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`---

### Combo Balancing Strategies

กำหนดค่าการปรับสมดุลต่อคอมโบใน**แดชบอร์ด → คอมโบ → สร้าง/แก้ไข → กลยุทธ์**

| กลยุทธ์ | คำอธิบาย |
| ------------------ | ---------------------------------------------------------------------------- |
|**โรบินตัวกลม**| หมุนเวียนไปตามโมเดลต่างๆ ตามลำดับ |
|**ลำดับความสำคัญ**| ลองใช้โมเดลแรกเสมอ ถอยกลับเฉพาะข้อผิดพลาด |
|**สุ่ม**| เลือกโมเดลแบบสุ่มจากคอมโบสำหรับแต่ละคำขอ |
|**ถ่วงน้ำหนัก**| เส้นทางตามสัดส่วนตามน้ำหนักที่กำหนดต่อรุ่น |
|**ใช้งานน้อยที่สุด**| กำหนดเส้นทางไปยังโมเดลที่มีคำขอล่าสุดน้อยที่สุด (ใช้เมตริกผสม) |
|**การเพิ่มประสิทธิภาพต้นทุน**| เส้นทางไปยังรุ่นที่ถูกที่สุด (ใช้ตารางราคา) |

ค่าเริ่มต้นคอมโบสากลสามารถตั้งค่าได้ใน**แดชบอร์ด → การตั้งค่า → การกำหนดเส้นทาง → ค่าเริ่มต้นคอมโบ**---

### Health Dashboard

เข้าถึงได้ทาง**Dashboard → Health**ภาพรวมความสมบูรณ์ของระบบเรียลไทม์พร้อมการ์ด 6 ใบ:

| บัตร | มันแสดงอะไร |
| --------------------- | --------------------------------------------------------------- |
|**สถานะระบบ**| สถานะการออนไลน์ เวอร์ชัน การใช้หน่วยความจำ ไดเร็กทอรีข้อมูล |
|**สุขภาพของผู้ให้บริการ**| สถานะเซอร์กิตเบรกเกอร์ต่อผู้ให้บริการ (ปิด/เปิด/เปิดครึ่ง) |
|**จำกัดอัตรา**| คูลดาวน์จำกัดอัตราที่ใช้งานอยู่ต่อบัญชีพร้อมเวลาที่เหลืออยู่ |
|**การล็อกที่ใช้งานอยู่**| ผู้ให้บริการถูกบล็อกชั่วคราวโดยนโยบายการล็อค |
|**แคชลายเซ็น**| สถิติแคชการขจัดข้อมูลซ้ำซ้อน (คีย์ที่ใช้งานอยู่ อัตราการเข้าถึง) |
|**การวัดระยะไกลแบบหน่วงเวลา**| การรวมเวลาแฝง p50/p95/p99 ต่อผู้ให้บริการ |

**เคล็ดลับสำหรับมือโปร:**หน้าสุขภาพจะรีเฟรชอัตโนมัติทุกๆ 10 วินาที ใช้การ์ดเซอร์กิตเบรกเกอร์เพื่อระบุว่าผู้ให้บริการรายใดกำลังประสบปัญหา---

## 🖥️ Desktop Application (Electron)

OmniRoute มีให้บริการในรูปแบบแอปพลิเคชันเดสก์ท็อปดั้งเดิมสำหรับ Windows, macOS และ Linux### ติดตั้ง

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

เอาท์พุต → `อิเล็กตรอน/ดิส-อิเล็กตรอน/`### Key Features

| คุณสมบัติ                       | คำอธิบาย                                                     |
| ------------------------------- | ------------------------------------------------------------ | ------------------------- |
| **ความพร้อมของเซิร์ฟเวอร์**     | สำรวจเซิร์ฟเวอร์ก่อนแสดงหน้าต่าง (ไม่มีหน้าจอว่าง)           |
| **ถาดระบบ**                     | ย่อเล็กสุดไปที่ถาด เปลี่ยนพอร์ต ออกจากเมนูถาด                |
| **การจัดการท่าเรือ**            | เปลี่ยนพอร์ตเซิร์ฟเวอร์จากถาด (เซิร์ฟเวอร์รีสตาร์ทอัตโนมัติ) |
| **นโยบายความปลอดภัยของเนื้อหา** | CSP ที่จำกัดผ่านส่วนหัวของเซสชัน                             |
| **อินสแตนซ์เดียว**              | รันได้ครั้งละหนึ่งอินสแตนซ์ของแอปเท่านั้น                    |
| **โหมดออฟไลน์**                 | เซิร์ฟเวอร์ Next.js ที่แถมมาทำงานโดยไม่ใช้อินเทอร์เน็ต       | ### Environment Variables |

| ตัวแปร                | ค่าเริ่มต้น | คำอธิบาย                             |
| --------------------- | ----------- | ------------------------------------ |
| `OMNIROUTE_PORT`      | `20128`     | พอร์ตเซิร์ฟเวอร์                     |
| `OMNIROUTE_MEMORY_MB` | `512`       | ขีดจำกัดฮีปของ Node.js (64–16384 MB) |

📖 เอกสารฉบับเต็ม: [`electron/README.md`](../electron/README.md)
