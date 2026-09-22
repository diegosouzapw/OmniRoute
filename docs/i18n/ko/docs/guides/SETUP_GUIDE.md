# 📖 Setup Guide — OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute의 전체 설정 참고 자료입니다. 빠른 버전은 [README의 빠른 시작](../README.md#-quick-start)을 참조하세요.

## 목차

- [설치 방법](#install-methods)
- [CLI 도구 구성](#cli-tool-configuration)
- [프로토콜 설정 (MCP + A2A)](#protocol-setup-mcp--a2a)
- [시간 초과 구성](#timeout-configuration)
- [분할 포트 모드](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [제거](#uninstalling)

---

## 설치 방법

### npm (권장)

```bash
npm install -g omniroute
omniroute
```

대시보드는 `http://localhost:20128`에서 열리며 API 기본 URL은 `http://localhost:20128/v1`입니다.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm 사용자:** `better-sqlite3` 및 `@swc/core`의 네이티브 빌드 스크립트를 활성화하려면 `--allow-build` 플래그가 필요합니다. pnpm v11의 전역 설치에서는 `pnpm approve-builds -g` 명령이 지원되지 않습니다.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR 패키지](https://aur.archlinux.org/packages/omniroute-bin)는 OmniRoute를 설치하고 systemd 사용자 서비스를 제공합니다.

### 소스에서 설치

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows 참고:** 기본적으로 OmniRoute는 기존 `%USERPROFILE%\.omniroute` 디렉터리가 없을 때 `%APPDATA%\omniroute`를 사용합니다. 다른 데이터 디렉터리 위치를 선택하려면 `DATA_DIR`을 설정하세요.

> **참고:** `npm install`은 처음 실행할 때 `.env.example`에서 `.env`를 자동으로 생성합니다. 이후 설치에서는 기존 `.env`를 덮어쓰지 않으므로 사용자 지정 설정이 유지됩니다. 다시 초기화하려면 재실행하기 전에 `.env`를 삭제하세요.

### Docker

Compose 프로필과 Caddy HTTPS를 포함한 전체 Docker 설정은 [Docker 가이드](./DOCKER_GUIDE.md)를 참조하세요.

### 데스크톱 앱 (Electron)

OmniRoute는 Electron 41 + electron-builder 26.10을 기반으로 구축된 데스크톱 래퍼를 제공합니다. 사용 가능한 스크립트는 다음과 같습니다(워크스페이스 루트).

```bash
npm run electron:dev          # 핫 리로드를 사용하여 데스크톱 실행
npm run electron:build        # 현재 OS용 빌드(자동 감지)
npm run electron:build:win    # Windows 설치 프로그램(NSIS + 포터블)
npm run electron:build:mac    # macOS(dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux(AppImage + deb + rpm)
npm run electron:smoke:packaged  # 패키징된 빌드 스모크 테스트
```

데스크톱 설치 프로그램 릴리스는 GitHub Releases에 첨부됩니다. 서명, IPC 브리지, 배포판 등 Electron에 대한 전체 상세 설명은 [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md)를 참조하세요. _(추후 단계에서 작성됨)_.

### 헤드리스 서버 (CI/자동화)

무인 설정(Docker, Kubernetes, CI)의 경우 다음을 사용하세요.

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

환경 변수(`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` 등)와 함께 사용하면 OmniRoute 인스턴스를 완전히 스크립트 방식으로 실행할 수 있습니다.

### CLI 옵션

| 명령                    | 설명                                                          |
| ----------------------- | ------------------------------------------------------------- |
| `omniroute`             | 서버 시작(`PORT=20128`, 동일한 포트에서 API 및 대시보드 제공) |
| `omniroute setup`       | 비밀번호 및 첫 번째 제공자를 위한 안내식 CLI 온보딩           |
| `omniroute doctor`      | 서버를 시작하지 않고 로컬 상태 검사 실행                      |
| `omniroute providers`   | CLI에서 제공자 검색, 목록 조회, 검증 및 테스트                |
| `omniroute config`      | CLI 도구 구성 — 구성 목록 조회, 가져오기, 설정 및 검증        |
| `omniroute status`      | 오프라인 상태 대시보드 — 버전, DB, 도구, 구성                 |
| `omniroute logs`        | API의 사용 로그 스트리밍(`--follow` 지원)                     |
| `omniroute update`      | OmniRoute 업데이트 확인 또는 적용                             |
| `omniroute provider`    | 제공자 연결 관리 — 추가, 목록 조회, 제거, 테스트, 기본값 설정 |
| `omniroute --port 3000` | 표준/API 포트를 3000으로 설정                                 |
| `omniroute --mcp`       | MCP 서버 시작(stdio 전송 방식)                                |
| `omniroute --no-open`   | 브라우저를 자동으로 열지 않음                                 |
| `omniroute --help`      | 도움말 표시                                                   |

헤드리스 설정은 플래그 또는 환경 변수를 사용해 스크립트로 작성할 수 있습니다.

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

대시보드를 열지 않고 로컬 진단을 실행합니다.

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

대시보드를 열지 않고 SSH 또는 스크립트에서 제공자를 관리합니다.

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

## CLI 도구 구성

### 1) 제공업체 연결 및 API 키 생성

1. Dashboard → `Providers`를 열고 하나 이상의 제공업체를 연결합니다(OAuth 또는 API 키).
2. Dashboard → `Endpoints`를 열고 API 키를 생성합니다.
3. (선택 사항) Dashboard → `Combos`를 열고 폴백 체인을 설정합니다.

### 2) 코딩 도구 연결

```txt
기본 URL: http://localhost:20128/v1
API 키:   [Endpoint 페이지에서 복사]
모델:     if/qwen3.8-max-preview (또는 임의의 제공업체/모델 접두사)
```

편집기에서 `Authorization: Bearer ...`를 전송할 수 없는 경우에는 토큰이 포함된 호환성 기본 URL을 대신 사용합니다.

```txt
기본 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
모델 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
채팅 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama 태그 URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode 및 OpenAI 호환 SDK에서 작동합니다.

#### `setup-*`로 자동 구성

기본 URL과 키를 직접 붙여 넣는 대신, OmniRoute가 실시간 모델 카탈로그를 바탕으로 각 도구의
자체 구성을 작성하도록 할 수 있습니다. 도구별로 하나의 명령을 사용합니다.

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml 프로필
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI 호환)
omniroute setup-cline        # Cline CLI + VS Code 확장 프로그램 설정
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Cursor의 앱 내 설정 절차 출력
omniroute setup-roo          # Roo Code 가져오기 + autoImport 포인터
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

각 명령은 **원격** OmniRoute에 로컬 도구를 연결하도록 구성하는 `--remote <url> --api-key <key>`와
미리보기를 위한 `--dry-run`을 지원합니다. 올바른 환경 변수를 주입하면서 구성 파일을 전혀 작성하지 않고 CLI를 실행하려면
범용 실행 명령인 `omniroute run <target>`(claude, codex, aider, goose, opencode, qwen, gemini)을 사용합니다.
기존 도구별 실행 명령인 `omniroute launch`(Claude Code)와
`omniroute launch-codex`(Codex)도 계속 사용할 수 있습니다.

전체 표(각 명령이 작성하는 항목, 모든 플래그, 로컬과 원격의 차이, 기본 URL의
`/v1` 규칙)는 **[CLI 통합](./CLI-INTEGRATIONS.md)**을 참조하세요.

도구별 상세 구성(Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot 등)은 전용 **[CLI 도구 가이드](../reference/CLI-TOOLS.md)**를 참조하세요.

---

## 프로토콜 설정(MCP + A2A)

### MCP 설정(Model Context Protocol)

stdio 모드에서 MCP 전송을 시작합니다.

```bash
omniroute --mcp
```

권장 검증 절차:

```bash
# 1. MCP 서버 시작
omniroute --mcp

# 2. MCP 클라이언트에서 다음을 호출:
omniroute_get_health        # 시스템 상태를 반환해야 함
omniroute_list_combos       # 활성 콤보를 반환해야 함

# 3. 또는 전체 E2E 제품군 실행:
npm run test:protocols:e2e
```

#### MCP 클라이언트 구성

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

MCP 설정에 다음을 추가합니다.

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

**전체 MCP 문서:** [MCP 서버 README](../../open-sse/mcp-server/README.md) — 도구 110개, IDE 구성, Python/TS/Go 클라이언트.

### A2A 설정(Agent-to-Agent Protocol)

Agent Card를 확인합니다.

```bash
curl http://localhost:20128/.well-known/agent.json
```

작업을 전송합니다.

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**전체 A2A 문서:** [A2A 서버 README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, 스킬, 스트리밍, 작업 수명 주기.

---

## 타임아웃 구성

### 기본 타임아웃

대부분의 배포에서는 다음 두 변수만 필요합니다.

| 변수                     | 기본값                        | 용도                                                                                                                         |
| ------------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | 업스트림 응답 시작 타임아웃, 숨겨진 Undici 타임아웃, TLS 지문 요청 및 API 브리지 요청/프록시 타임아웃에 사용되는 공통 기준값 |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS`에서 상속 | OmniRoute가 SSE 스트림을 중단하기 전까지 허용되는 스트리밍 청크 간 최대 시간 간격                                            |

이전 버전과의 호환성은 유지됩니다. 기존 `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` 및 기타 계층별 타임아웃 변수는 계속 작동하며 공통 기준값보다 우선 적용됩니다.

### 제공자별 참고 사항

Claude Code 호환 업스트림(`anthropic-compatible-cc-*`)의 경우, OmniRoute는 확인된 가져오기 타임아웃에서 아웃바운드 `X-Stainless-Timeout` 헤더를 도출하여 제공자 측 읽기 타임아웃이 환경 구성과 일치하도록 유지합니다.

서드 파티 Claude Code 호환 리버스 프록시의 경우, OmniRoute는 기본 `anthropic-beta` 집합을 보수적으로 유지하며, `Client Cache Control`이 `Auto`로 설정되어 있으면 클라이언트가 제공한 `cache_control` 마커만 전달합니다. 업스트림에서 편집된 Claude 사고 스트림을 명시적으로 요구하는 경우에만 연결별 "Enable redact-thinking beta" 토글을 활성화하세요.

### 고급 타임아웃 재정의

| 변수                                     | 기본값                                      | 용도                                                           |
| ---------------------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS`에서 상속               | 응답 헤더가 도착할 때까지 사용되는 업스트림 응답 시작 타임아웃 |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS`에서 상속                 | 업스트림 응답 헤더 수신에 대한 Undici 제한 시간                |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS`에서 상속                 | 업스트림 본문 청크 사이의 Undici 제한 시간(`0`은 비활성화)     |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Undici TCP 연결 타임아웃                                       |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Undici 유휴 keep-alive 소켓 타임아웃                           |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS`에서 상속                 | `wreq-js`를 통해 이루어지는 TLS 지문 요청의 타임아웃           |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS`에서 상속 또는 `600000` | API 포트에서 대시보드 포트로 전달되는 `/v1` 프록시의 타임아웃  |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | API 브리지 서버의 수신 요청 타임아웃                           |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | API 브리지 서버의 수신 헤더 타임아웃                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | API 브리지 서버의 keep-alive 타임아웃                          |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | API 브리지 서버의 소켓 비활성 타임아웃(`0`은 비활성화)         |

> **참고:** 스트리밍 요청에서 `FETCH_TIMEOUT_MS`는 연결 설정 및 첫 번째 업스트림 응답 대기 시간에만 적용됩니다. 스트림이 활성화된 이후 OmniRoute는 실제 중단(`STREAM_IDLE_TIMEOUT_MS`) 또는 Undici 본문 비활성(`FETCH_BODY_TIMEOUT_MS`)이 발생한 경우에만 스트림을 중단합니다.

### 리버스 프록시 호환성

Nginx, Caddy, Cloudflare 또는 다른 리버스 프록시 뒤에서 OmniRoute를 실행하는 경우 프록시 타임아웃도 OmniRoute의 스트림/가져오기 타임아웃보다 길게 설정해야 합니다.

---

## 포트 분리 모드

고급 시나리오(리버스 프록시, 컨테이너 네트워킹)를 위해 API와 Dashboard를 별도의 포트에서 실행합니다.

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux (xbps-src) 템플릿

Void Linux 사용자는 `xbps-src`를 사용하여 네이티브 패키지를 빌드할 수 있습니다. 이 블록을 `srcpkgs/omniroute/template`로 저장하세요.

```bash
# 'omniroute'용 템플릿 파일
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="여러 LLM 제공자를 위한 스마트 라우팅 기능을 갖춘 범용 AI 게이트웨이"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# 각 릴리스마다 다음 명령으로 체크섬을 다시 생성하세요:
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

## 제거

| 명령                     | 동작                                                                     |
| ------------------------ | ------------------------------------------------------------------------ |
| `npm run uninstall`      | 시스템 앱을 제거하지만 `~/.omniroute`의 **DB와 구성은 유지합니다**.      |
| `npm run uninstall:full` | 앱을 제거하고 **모든 구성, 키 및 데이터베이스를 영구적으로 삭제합니다**. |

> 모든 설치 방식에 대한 자세한 제거 지침은 [UNINSTALL.md](./UNINSTALL.md)를 참조하세요.
