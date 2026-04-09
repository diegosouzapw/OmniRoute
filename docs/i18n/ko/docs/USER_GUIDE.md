# User Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

공급자 구성, 콤보 생성, CLI 도구 통합 및 OmniRoute 배포에 대한 전체 가이드입니다.---

## Table of Contents

- [한눈에 보는 가격](#-한눈에 가격)
- [사용 사례](#-사용 사례)
- [공급자 설정](#-provider-setup)
- [CLI 통합](#-cli-통합)
- [배포](#-배포)
- [사용 가능 모델](#-사용 가능-모델)
- [고급 기능](#-advanced-features)---

## 💰 Pricing at a Glance

| 계층          | 공급자              | 비용               | 할당량 재설정   | 최고의 대상       |
| ------------- | ------------------- | ------------------ | --------------- | ----------------- |
| **💳 구독**   | 클로드 코드 (Pro)   | $20/월             | 5시간 + 매주    | 이미 구독 중      |
|               | 코덱스(플러스/프로) | $20-200/월         | 5시간 + 매주    | OpenAI 사용자     |
|               | 제미니 CLI          | **무료**           | 180K/월 + 1K/일 | 모든 사람!        |
|               | GitHub 부조종사     | $10-19/월          | 월간            | GitHub 사용자     |
| **🔑 API 키** | 딥시크              | 사용량에 따라 지불 | 없음            | 저렴한 추론       |
|               | 그로크              | 사용량에 따라 지불 | 없음            | 초고속 추론       |
|               | xAI(그록)           | 사용량에 따라 지불 | 없음            | Grok 4 추론       |
|               | 미스트랄            | 사용량에 따라 지불 | 없음            | EU 주최 모델      |
|               | 당혹감              | 사용량에 따라 지불 | 없음            | 검색 증강         |
|               | 함께하는 AI         | 사용량에 따라 지불 | 없음            | 오픈 소스 모델    |
|               | 불꽃놀이 AI         | 사용량에 따라 지불 | 없음            | 빠른 FLUX 이미지  |
|               | 대뇌                | 사용량에 따라 지불 | 없음            | 웨이퍼 규모 속도  |
|               | 코히어              | 사용량에 따라 지불 | 없음            | 커맨드 R+ RAG     |
|               | 엔비디아 NIM        | 사용량에 따라 지불 | 없음            | 엔터프라이즈 모델 |
| **💰 저렴한** | GLM-4.7             | $0.6/1M            | 매일 오전 10시  | 예산 백업         |
|               | 미니맥스 M2.1       | $0.2/1M            | 5시간 롤링      | 가장 저렴한 옵션  |
|               | 키미 K2             | $9/월 정액         | 1000만 토큰/월  | 예측 가능한 비용  |
| **🆓 무료**   | Qoder               | $0                 | 무제한          | 8개 모델 무료     |
|               | 퀀                  | $0                 | 무제한          | 3개 모델 무료     |
|               | 키로                | $0                 | 무제한          | 클로드 프리       |

**💡 전문가 팁:**Gemini CLI(월 180K 무료) + Qoder(무제한 무료) 콤보 = 비용 $0로 시작하세요!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**문제:**할당량은 사용되지 않은 상태로 만료되며, 코딩을 많이 하는 동안 속도 제한이 발생합니다.```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**문제:**구독료를 감당할 수 없고 안정적인 AI 코딩이 필요함```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**문제:**마감일, 가동 중지 시간을 감당할 수 없음```
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

**문제:**메시징 앱에 AI 도우미가 필요하며 완전 무료입니다.```
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

**프로 팁:**복잡한 작업에는 Opus를 사용하고, 속도를 높이려면 Sonnet을 사용하세요. OmniRoute는 모델당 할당량을 추적합니다!#### OpenAI Codex (Plus/Pro)

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

**최고의 가치:**엄청난 무료 등급! 유료 등급 이전에 사용하세요.#### GitHub Copilot

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

1. 회원가입: [Zhipu AI](https://open.bigmodel.cn/)
2. Coding Plan에서 API Key 받기
3. 대시보드 → API 키 추가: 공급자: `glm`, API 키: `your-key`

**사용:**`glm/glm-4.7` —**프로 팁:**코딩 계획은 1/7 비용으로 3배 할당량을 제공합니다! 매일 오전 10시에 초기화됩니다.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. 회원가입: [미니맥스](https://www.minimax.io/)
2. API 키 받기 → 대시보드 → API 키 추가

**사용:**`minimax/MiniMax-M2.1` —**프로 팁:**긴 컨텍스트(1M 토큰)를 위한 가장 저렴한 옵션!#### Kimi K2 ($9/month flat)

1. 구독: [문샷 AI](https://platform.moonshot.ai/)
2. API 키 받기 → 대시보드 → API 키 추가

**사용:**`kimi/kimi-latest` —**프로 팁:**1,000만 토큰에 대해 월 $9 고정 = 유효 비용 $0.90/1M!### 🆓 FREE Providers

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

`~/.claude/config.json`을 편집합니다.```json
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

`~/.openclaw/openclaw.json`을 편집합니다.```json
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

**또는 대시보드 사용:**CLI 도구 → OpenClaw → 자동 구성### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## 배포

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

CLI는 `~/.omniroute/.env` 또는 `./.env`에서 `.env`를 자동으로 로드합니다.### VPS Deployment

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

RAM이 제한된 서버의 경우 메모리 제한 옵션을 사용하십시오.```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

`ecosystem.config.js`를 생성합니다:```javascript
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

CLI 바이너리를 사용한 호스트 통합 모드의 경우 기본 문서의 Docker 섹션을 참조하세요.### Void Linux (xbps-src)

Void Linux 사용자는 'xbps-src' 크로스 컴파일 프레임워크를 사용하여 기본적으로 OmniRoute를 패키징하고 설치할 수 있습니다. 이는 필수 `better-sqlite3` 네이티브 바인딩과 함께 Node.js 독립 실행형 빌드를 자동화합니다.

<상세>

<summary><b>xbps-src 템플릿 보기</b></summary>```bash
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

| 변수 | 기본값 | 설명 |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT 서명 비밀(**프로덕션 변경**) |
| `초기_비밀번호` | `123456` | 첫 번째 로그인 비밀번호 |
| `DATA_DIR` | `~/.omniroute` | 데이터 디렉터리(db, 사용량, 로그) |
| '포트' | 프레임워크 기본값 | 서비스 포트(예제에서는 `20128`) |
| `호스트 이름` | 프레임워크 기본값 | 호스트 바인딩(Docker 기본값은 `0.0.0.0`) |
| `NODE_ENV` | 런타임 기본값 | 배포를 위해 '프로덕션' 설정 |
| `BASE_URL` | `http://localhost:20128` | 서버측 내부 기본 URL |
| `CLOUD_URL` | `https://omniroute.dev` | 클라우드 동기화 엔드포인트 기본 URL |
| `API_KEY_SECRET` | `엔드포인트-프록시-API-키-비밀` | 생성된 API 키에 대한 HMAC 비밀 |
| `REQUIRE_API_KEY` | '거짓' | `/v1/*`에 Bearer API 키 적용 |
| `ALLOW_API_KEY_REVEAL` | '거짓' | Api Manager가 요청 시 전체 API 키를 복사하도록 허용 |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | 캐시된 공급자 제한 데이터에 대한 서버측 새로 고침 주기. UI 새로 고침 버튼이 여전히 수동 동기화를 트리거합니다 |
| DISABLE_SQLITE_AUTO_BACKUP` | '거짓' | 쓰기/가져오기/복원 전에 자동 SQLite 스냅샷을 비활성화합니다. 수동 백업은 여전히 ​​작동합니다 |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | '거짓' | '보안' 인증 쿠키 강제 적용(HTTPS 역방향 프록시 뒤) |
| `CLOUDFLARED_BIN` | 설정되지 않음 | 관리형 다운로드 대신 기존 `cloudflared` 바이너리 사용 |
| `CLOUDFLARED_PROTOCOL` | `http2` | 관리형 빠른 터널을 위한 전송(`http2`, `quic` 또는 `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js 힙 제한(MB) |
| 'PROMPT_CACHE_MAX_SIZE' | `50` | 최대 프롬프트 캐시 항목 |
| `SEMANTIC_CACHE_MAX_SIZE` | '100' | 최대 의미 캐시 항목 |전체 환경 변수 참조는 [README](../README.md)를 참조하세요.---

## 📊 Available Models

<상세>
<summary><b>사용 가능한 모든 모델 보기</b></summary>

**Claude 코드(`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex(`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI(`gc/`)**— 무료: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot(`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0.6/1M: `glm/glm-4.7`

**MiniMax(`minimax/`)**— $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder(`if/`)**— 무료: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen(`qw/`)**— 무료: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro(`kr/`)**— 무료: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek(`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq(`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**미스트랄(`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity(`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**함께 AI(`함께/`)**: `함께/메타-라마/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI(`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**대뇌(`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere(`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM(`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

앱 업데이트를 기다리지 않고 공급자에 모델 ID를 추가하세요.```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

또는 대시보드를 사용하십시오:**공급자 → [공급자] → 사용자 정의 모델**.

참고:

- OpenRouter 및 OpenAI/Anthropic 호환 공급자는**사용 가능한 모델**에서만 관리됩니다. 수동 추가, 가져오기 및 자동 동기화는 모두 동일한 사용 가능한 모델 목록에 있으므로 해당 공급자에 대한 별도의 사용자 정의 모델 섹션이 없습니다. -**사용자 정의 모델**섹션은 관리 가능한 모델 가져오기를 노출하지 않는 공급자를 위한 것입니다.### Dedicated Provider Routes

모델 검증을 통해 요청을 특정 공급자에게 직접 라우팅합니다.```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

공급자 접두사가 누락된 경우 자동으로 추가됩니다. 일치하지 않는 모델이 '400'을 반환합니다.### Network Proxy Configuration

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

**우선순위:**키별 → 콤보별 → 공급자별 → 글로벌 → 환경.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

유형(`chat`, `embedding`, `image`)을 사용하여 공급자별로 그룹화된 모델을 반환합니다.### Cloud Sync

- 여러 장치에서 공급자, 콤보 및 설정을 동기화합니다.
- 시간 초과 + 빠른 실패를 통한 자동 백그라운드 동기화
- 프로덕션에서는 서버 측 `BASE_URL`/`CLOUD_URL`을 선호합니다.### Cloudflare Quick Tunnel

- Docker 및 기타 자체 호스팅 배포를 위해**대시보드 → 엔드포인트**에서 사용 가능
- 현재 OpenAI 호환 `/v1` 엔드포인트로 전달되는 임시 `https://*.trycloudflare.com` URL을 생성합니다.
- 먼저 활성화하면 필요할 때만 'cloudflared'를 설치합니다. 나중에 다시 시작하면 동일한 관리 바이너리를 재사용합니다.
- OmniRoute 또는 컨테이너를 다시 시작한 후에 빠른 터널이 자동으로 복원되지 않습니다. 필요할 때 대시보드에서 다시 활성화하세요.
- 터널 URL은 일시적이며 터널을 중지/시작할 때마다 변경됩니다.
- 제한된 컨테이너에서 시끄러운 QUIC UDP 버퍼 경고를 방지하기 위해 관리형 빠른 터널은 기본적으로 HTTP/2 전송으로 설정됩니다.
- 관리형 전송 선택을 재정의하려면 `CLOUDFLARED_PROTOCOL=quic` 또는 `auto`를 설정하세요.
- 관리형 다운로드 대신 사전 설치된 `cloudflared` 바이너리를 사용하려는 경우 `CLOUDFLARED_BIN`을 설정하세요.### LLM Gateway Intelligence (Phase 9)

-**의미론적 캐시**— 비스트리밍, 온도=0 응답을 자동 캐시합니다(`X-OmniRoute-No-Cache: true`로 우회). -**Idempotency 요청**— 'Idempotency-Key' 또는 'X-Request-Id' 헤더를 통해 5초 이내에 요청을 중복 제거합니다. -**진행 상황 추적**— `X-OmniRoute-Progress: true` 헤더를 통한 옵트인 SSE `event: Progress` 이벤트---

### Translator Playground

**대시보드 → 번역기**를 통해 액세스합니다. OmniRoute가 공급자 간 API 요청을 변환하는 방법을 디버깅하고 시각화합니다.

| 모드              | 목적                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| **놀이터**        | 소스/타겟 형식을 선택하고, 요청을 붙여넣고, 번역된 결과를 즉시 확인하세요 |
| **채팅 테스터**   | 프록시를 통해 실시간 채팅 메시지를 보내고 전체 요청/응답 주기 검사        |
| **테스트 벤치**   | 여러 형식 조합에 걸쳐 일괄 테스트를 실행하여 번역 정확성 확인             |
| **라이브 모니터** | 프록시를 통한 요청 흐름에 따라 실시간 번역 보기                           |

**사용 사례:**

- 특정 클라이언트/공급자 조합이 실패하는 이유 디버그
- 생각 태그, 도구 호출 및 시스템 프롬프트가 올바르게 번역되는지 확인합니다.
- OpenAI, Claude, Gemini 및 Responses API 형식 간의 형식 차이 비교---

### Routing Strategies

**대시보드 → 설정 → 라우팅**을 통해 구성합니다.

| 전략                       | 설명                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **먼저 채우기**            | 우선순위에 따라 계정을 사용합니다. 기본 계정은 사용할 수 없을 때까지 모든 요청을 처리합니다.   |
| **라운드 로빈**            | 구성 가능한 고정 한도를 사용하여 모든 계정을 순환합니다(기본값: 계정당 호출 3회)               |
| **P2C(두 가지 선택의 힘)** | 2개의 무작위 계정을 선택하고 더 건강한 계정으로 라우팅 — 건강에 대한 인식과 부하의 균형을 유지 |
| **랜덤**                   | Fisher-Yates shuffle                                                                           | 을 사용하여 각 요청에 대해 무작위로 계정을 선택합니다. |
| **최소 사용**              | 가장 오래된 'lastUsedAt' 타임스탬프가 있는 계정으로 라우팅하여 트래픽을 균등하게 분산          |
| **비용 최적화**            | 가장 낮은 비용의 공급자를 위해 최적화하여 우선순위 값이 가장 낮은 계정으로 라우팅              | #### External Sticky Session Header                    |

외부 세션 선호도(예: 역방향 프록시 뒤의 Claude Code/Codex 에이전트)의 경우 다음을 보냅니다.```http
X-Session-Id: your-session-key

````

OmniRoute는 'x_session_id'도 허용하고 'X-OmniRoute-Session-Id'에 유효한 세션 키를 반환합니다.

Nginx를 사용하고 밑줄 형식 헤더를 보내는 경우 다음을 활성화합니다.```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

모델 이름을 다시 매핑하는 와일드카드 패턴을 만듭니다.```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

와일드카드는 `*`(모든 문자) 및 `?`(단일 문자)를 지원합니다.#### Fallback Chains

모든 요청에 ​​적용되는 전역 대체 체인을 정의합니다.```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

**대시보드 → 설정 → 복원력**을 통해 구성합니다.

OmniRoute는 다음 네 가지 구성 요소를 사용하여 공급자 수준 복원력을 구현합니다.

1.**공급자 프로필**— 다음에 대한 공급자별 구성:

- 실패 임계값(개방 전 실패 횟수)
- 쿨다운 시간
- 비율 제한 감지 감도
- 지수 백오프 매개변수

  2.**편집 가능한 속도 제한**— 대시보드에서 구성 가능한 시스템 수준 기본값: -**분당 요청(RPM)**— 계정당 분당 최대 요청 수 -**요청 간 최소 시간**— 요청 간 최소 간격(밀리초) -**최대 동시 요청**— 계정당 최대 동시 요청

- 수정하려면**수정**을 클릭한 다음**저장**또는**취소**를 클릭하세요. 값은 복원력 API를 통해 유지됩니다.

  3.**회로 차단기**— 공급자별 오류를 추적하고 임계값에 도달하면 자동으로 회로를 엽니다. -**CLOSED**(정상) — 요청 흐름이 정상적으로 진행됩니다. -**OPEN**— 반복적인 실패 후 공급자가 일시적으로 차단됩니다. -**HALF_OPEN**— 공급자가 복구되었는지 테스트

  4.**정책 및 잠긴 식별자**- 회로 차단기 상태와 강제 잠금 해제 기능이 있는 잠긴 식별자를 표시합니다.

  5.**비율 제한 자동 감지**— '429' 및 'Retry-After' 헤더를 모니터링하여 공급자 비율 제한에 도달하는 것을 사전에 방지합니다.

**프로 팁:**공급자가 중단에서 복구될 때**모두 재설정**버튼을 사용하여 모든 회로 차단기와 쿨다운을 해제합니다.---

### Database Export / Import

**대시보드 → 설정 → 시스템 및 스토리지**에서 데이터베이스 백업을 관리하세요.

| 액션                       | 설명                                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **데이터베이스 내보내기**  | 현재 SQLite 데이터베이스를 '.sqlite' 파일로 다운로드                                                                                             |
| **모두 내보내기(.tar.gz)** | 데이터베이스, 설정, 콤보, 공급자 연결(자격 증명 없음), API 키 메타데이터를 포함한 전체 백업 아카이브를 다운로드합니다.                           |
| **데이터베이스 가져오기**  | 현재 데이터베이스를 대체하려면 '.sqlite' 파일을 업로드하세요. `DISABLE_SQLITE_AUTO_BACKUP=true`가 아니면 가져오기 전 백업이 자동으로 생성됩니다. | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**가져오기 검증:**가져온 파일은 무결성(SQLite pragma 검사), 필수 테이블(`provider_connections`, `provider_nodes`, `combos`, `api_keys`) 및 크기(최대 100MB)에 대해 검증됩니다.

**사용 사례:**

- 머신 간 OmniRoute 마이그레이션
- 재해 복구를 위한 외부 백업 생성
- 팀원 간 구성 공유(모두 내보내기 → 아카이브 공유)---

### Settings Dashboard

설정 페이지는 쉽게 탐색할 수 있도록 6개의 탭으로 구성되어 있습니다.

| 탭 | 내용 |
| -------------- | --------------------------------------------------------------------------------- |
|**일반**| 시스템 저장 도구, 모양 설정, 테마 제어 및 항목별 사이드바 가시성 |
|**보안**| 로그인/비밀번호 설정, IP 액세스 제어, `/models`에 대한 API 인증 및 공급자 차단 |
|**라우팅**| 글로벌 라우팅 전략(6개 옵션), 와일드카드 모델 별칭, 폴백 체인, 콤보 기본값 |
|**탄력성**| 공급자 프로필, 편집 가능한 속도 제한, 회로 차단기 상태, 정책 및 잠긴 식별자 |
|**AI**| 생각하는 예산 구성, 글로벌 시스템 프롬프트 주입, 프롬프트 캐시 통계 |
|**고급**| 글로벌 프록시 구성(HTTP/SOCKS5) |---

### Costs & Budget Management

**대시보드 → 비용**을 통해 액세스합니다.

| 탭 | 목적 |
| ----------- | -------------------------------------------------------------- |
|**예산**| 일별/주별/월별 예산 및 실시간 추적을 통해 API 키별 지출 한도 설정 |
|**가격**| 모델 가격 항목 보기 및 편집 - 공급자당 입력/출력 토큰 1,000개당 비용 |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**비용 추적:**모든 요청은 토큰 사용량을 기록하고 가격표를 사용하여 비용을 계산합니다.**대시보드 → 사용량**에서 공급자, 모델, API 키별 분석을 확인하세요.---

### Audio Transcription

OmniRoute는 OpenAI 호환 엔드포인트를 통해 오디오 전사를 지원합니다.```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

사용 가능한 공급자:**Deepgram**(`deepgram/`),**AssemblyAI**(`assembleai/`).

지원되는 오디오 형식: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

**대시보드 → 콤보 → 생성/편집 → 전략**에서 콤보별 밸런싱을 구성하세요.

| 전략 | 설명 |
| ------------------ | ----------------------------------------------------------- |
|**라운드 로빈**| 모델을 순차적으로 회전 |
|**우선순위**| 항상 첫 번째 모델을 시도합니다. 오류가 발생한 경우에만 폴백 |
|**랜덤**| 각 요청에 대한 콤보에서 무작위 모델 선택 |
|**가중치**| 모델별로 할당된 가중치를 기준으로 비례적으로 라우팅 |
|**가장 적게 사용됨**| 최근 요청이 가장 적은 모델로 라우팅(콤보 메트릭 사용) |
|**비용 최적화**| 가장 저렴한 모델로 연결(가격표 사용) |

글로벌 콤보 기본값은**대시보드 → 설정 → 라우팅 → 콤보 기본값**에서 설정할 수 있습니다.---

### Health Dashboard

**대시보드 → 건강**을 통해 액세스합니다. 6개의 카드를 사용한 실시간 시스템 상태 개요:

| 카드 | 표시되는 내용 |
| -------- | ---------------------------------------------- |
|**시스템 상태**| 가동 시간, 버전, 메모리 사용량, 데이터 디렉터리 |
|**제공자 건강**| 공급자별 회로 차단기 상태(폐쇄/개방/반개방) |
|**비율 제한**| 남은 시간에 따른 계정당 활성 속도 제한 쿨다운 |
|**활성 잠금**| 잠금 정책으로 인해 일시적으로 차단된 제공업체 |
|**서명 캐시**| 중복 제거 캐시 통계(활성 키, 적중률) |
|**지연 원격 측정**| 공급자별 p50/p95/p99 대기 시간 집계 |

**프로 팁:**상태 페이지는 10초마다 자동으로 새로 고쳐집니다. 회로 차단기 카드를 사용하여 어떤 공급자가 문제를 겪고 있는지 식별하십시오.---

## 🖥️ Desktop Application (Electron)

OmniRoute는 Windows, macOS 및 Linux용 기본 데스크톱 애플리케이션으로 사용할 수 있습니다.### 설치

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

출력 → `전자/dist-전자/`### Key Features

| 기능                 | 설명                                                  |
| -------------------- | ----------------------------------------------------- | ------------------------- |
| **서버 준비 상태**   | 창을 표시하기 전에 서버를 폴링합니다(빈 화면 없음)    |
| **시스템 트레이**    | 트레이로 최소화, 포트 변경, 트레이 메뉴 종료          |
| **항만 관리**        | 트레이에서 서버 포트 변경(서버 자동 재시작)           |
| **콘텐츠 보안 정책** | 세션 헤더를 통한 제한적인 CSP                         |
| **단일 인스턴스**    | 한 번에 하나의 앱 인스턴스만 실행할 수 있습니다       |
| **오프라인 모드**    | 번들로 제공되는 Next.js 서버는 인터넷 없이 작동합니다 | ### Environment Variables |

| 변수                  | 기본값  | 설명                        |
| --------------------- | ------- | --------------------------- |
| `OMNIROUTE_PORT`      | `20128` | 서버 포트                   |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js 힙 제한(64~16384MB) |

📖 전체 문서: [`electron/README.md`](../electron/README.md)
