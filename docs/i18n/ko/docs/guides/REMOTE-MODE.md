# Remote Mode (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute 자체는 다른 곳(VPS, 홈 서버, Tailnet의 다른 머신)에서 실행하면서 노트북에서는 `omniroute` CLI를 실행할 수 있습니다.
`omniroute connect`로 한 번 로그인하면 그 이후부터는 **모든** CLI 명령이 해당 원격
서버를 대상으로 실행됩니다. 명령과 출력은 동일하며, 실행 대상만 원격 서버입니다.

별도의 도구를 설치할 필요가 없습니다. 원격 모드는 일반 `omniroute` CLI와 범위가 지정된
**액세스 토큰**을 사용합니다.

```bash
npm install -g omniroute                 # 일반 CLI
omniroute connect 192.168.0.15           # 로그인(비밀번호 → 범위가 지정된 토큰)
omniroute models list                    # ← 이제 원격 서버의 모델을 나열합니다
omniroute configure codex                # ← 원격 카탈로그를 바탕으로 로컬 Codex 프로필을 작성합니다
```

---

## 작동 방식

```
사용자의 노트북                             원격 OmniRoute(VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (비밀번호 → 토큰)           │
│  컨텍스트: vps       │ ───────────────►  │ 범위가 지정된 액세스 토큰 발급     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ 모든 관리 경로에서 토큰 범위별로    │
│ 설정을 로컬에 작성     │ ◄───────────────  │ 권한 확인                       │
│                    │                   └───────────────────────────────┘
└────────────────────┘
```

- **컨텍스트**는 각각 하나의 서버를 저장합니다(`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>`은 활성 서버를 전환하며, `default`는 로컬입니다.
- **액세스 토큰**(`oma_live_…`)은 관리 명령에 권한을 부여합니다. 추론 API 키
  (`sk-…`, `/v1/chat/completions`에 사용)와는 별개입니다.
- 서버에는 토큰의 SHA-256 해시만 저장됩니다. 평문 토큰은 생성 시
  **한 번만** 표시됩니다.

---

## 연결하기

### 관리 비밀번호 사용(부트스트랩)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128의 관리 비밀번호: ********
# ✔ http://192.168.0.15:20128에 연결됨 — 컨텍스트 '192.168.0.15'(범위: admin)
```

비밀번호 흐름은 기본적으로 **admin** 토큰을 발급합니다(비밀번호를 보유하고 있으므로
이미 모든 권한이 있습니다). `--scope`로 더 낮은 범위를 지정할 수 있습니다.

```bash
omniroute connect 192.168.0.15 --scope write
```

옵션: `--port <p>`(호스트에 포트가 없는 경우), `--name <ctx>`(컨텍스트 이름),
`--scope read|write|admin`. 전체 URL은 입력한 그대로 사용됩니다:
`omniroute connect https://omni.example.com`.

### 미리 생성된 토큰 사용

대시보드에서 또는 `omniroute tokens create`를 사용해 범위가 지정된 토큰을 생성한 후
붙여 넣으세요. 비밀번호는 필요하지 않습니다.

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI는 `GET /api/cli/whoami`를 통해 토큰을 검증한 후 활성 컨텍스트로 저장합니다.

---

## 범위

세 가지 계층적 수준이 있습니다(`admin ⊃ write ⊃ read`).

| 범위    | 가능한 작업                                                            |
| ------- | ---------------------------------------------------------------------- |
| `read`  | 목록/조회 — `models list`, `providers status`, `logs`, `usage`, `cost` |
| `write` | read **+** 구성/적용 — `setup-codex`, `keys add`, `config set`, combos |
| `admin` | write **+** 관리 — `tokens` CRUD, 공급자 추가, 서비스, 정책, oauth     |

서버는 HTTP 메서드(`GET`→read, 변경 작업→write)와 민감한 영역에 대한 admin 허용 목록
(`/api/cli/tokens`, `/api/providers` 변경 작업, `/api/oauth`, `/api/services`, …)을
기준으로 각 경로에 필요한 범위를 추론합니다. 범위가 부족한 토큰을 사용하면 명확한 메시지와
함께 `403` 응답을 받습니다.

> 프로세스를 생성하는 경로(`/api/services/*`, `/api/mcp/*`, …)는
> **루프백 전용**으로 유지됩니다. 원격 토큰은 범위와 관계없이 이러한 경로에 절대
> 접근할 수 없습니다.

---

## 원격 설치 환경에서 Antigravity 연결하기

Antigravity는 Google의 firstparty/nativeapp 동의 화면을 사용합니다. Google은 **로그인을 승인하는 브라우저에서 루프백 리디렉션**
(`http://127.0.0.1:<port>/callback`)에 **접근할 수 있을 때만** 인증 코드를 발급합니다. 원격 VPS에 설치한 경우 해당 루프백은 사용자의 컴퓨터가 아닌 서버에 있으므로 동의 화면이 **영원히 멈추고 코드를 발급하지 않습니다**. 따라서 일반적인 "콜백 URL 붙여넣기" 대체 방식에서도 붙여넣을 내용이 없습니다. (이는 Google 측 제약입니다. OmniRoute뿐 아니라 번들로 제공되는 Antigravity 데스크톱 클라이언트를 사용하는 모든 프록시에서 동일하게 멈춥니다.)

대시보드는 사용자가 막히기 전에 이를 감지합니다. localhost가 아닌 주소에서 **Providers → Antigravity →
Connect**를 열면 일반적인 "콜백 URL 복사" 안내 대신 아래 두 가지 해결 방법이 표시되며, 각 방법에는 호스트와 포트가 이미 입력되어 있습니다.
(LAN 주소도 해당됩니다. 이 콜백의 관점에서 `192.168.x.x`는 localhost가 아닙니다.)

Antigravity를 원격 OmniRoute에 연결하는 방법은 두 가지입니다.

### 옵션 A — 로컬 로그인 도우미(권장)

`127.0.0.1`에 접근할 수 있는 **사용자 자신의 컴퓨터**에서 OAuth를 실행하세요. 도우미가 Google과 직접 통신하므로 대시보드에서는 완료할 수 없는 동의 절차를 완료할 수 있습니다.

**이미 연결되어 있다면** (`omniroute connect <host>`) 복사할 내용은 없습니다. 도우미가 해당 설치 환경으로 자격 증명을 대신 전달합니다.

```bash
# 로컬 컴퓨터에서 실행(Node.js와 브라우저 필요):
omniroute connect 192.168.0.15        # 한 번만 실행 — 관리자 범위 컨텍스트 토큰을 발급
npx omniroute login antigravity
#   ↳ Google 동의 화면을 열고 로컬 루프백 포트에서 콜백을 캡처한 후,
#     이를 교환하여 활성 컨텍스트로 자격 증명을 POST합니다.
#
#   Antigravity가 http://192.168.0.15:20128에 연결되었습니다(연결 abc123).
#   붙여넣을 내용은 없습니다. 이 터미널을 닫아도 됩니다.
```

활성 컨텍스트가 다른 컴퓨터를 가리킬 때마다 푸시가 자동으로 수행됩니다. `--push` / `--no-push`를 사용해 어느 쪽이든 강제하거나, `--context <name>`을 사용해 특정 컨텍스트를 대상으로 지정할 수 있습니다.

**사용자의 컴퓨터에서 VPS에 접근할 수 없는 경우에도**(방화벽, SSH 없음, 네트워크가 격리된 작업 환경) 도우미는 계속 작동합니다. 도우미에 실제로 _필요한_ 것은 Google뿐입니다. `--no-push`를 사용하거나 푸시가 실패하도록 두면 됩니다. 이미 완료한 인증을 폐기하는 대신 자동으로 blob을 출력합니다.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

그런 다음 **원격** 대시보드에서 **Providers → Antigravity → Connect**로 이동하고, `omniroute-cred-v1.…` blob을 **Step 2** 필드에 붙여넣으세요. 이 필드는 콜백 URL과 자격 증명 blob을 모두 허용합니다. OmniRoute는 이를 디코딩하고 서버 측에서 Cloud Code 온보딩을 실행한 후 연결을 영구 저장합니다.

> 이 blob에는 갱신 토큰이 포함되어 있으므로 비밀번호처럼 취급하세요. 푸시 방식에서는 컨텍스트의 인증된 연결을 통해 한 번 전송되며, 붙여넣기 방식에서는 대시보드 연결을 통해 전송됩니다. 어느 방식을 사용하든 저장 시 암호화되며, 푸시가 성공하면 터미널에 출력되지 않습니다.

플래그: `--no-browser`(자동으로 여는 대신 URL 출력), `--port <n>`
(루프백 포트 고정), `--timeout <ms>`, `--push` / `--no-push`(자동 전달 설정 재정의), `--context <name>`(특정 컨텍스트 지정).

### 옵션 B — SSH 로컬 포워딩 터널

VPS에 SSH로 접근할 수 있다면 루프백 콜백이 터널을 통해 서버로 다시 전달되도록 대시보드 포트를 포워딩하세요.

```bash
# 로컬 컴퓨터에서 실행:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# 그런 다음 로컬 브라우저에서 http://localhost:20128을 열고 Antigravity를
# 평소처럼 연결하세요. 이제 127.0.0.1:20128/callback 리디렉션이 SSH를 통해 VPS에 도달합니다.
```

대시보드에 `localhost:20128`로 접근하므로 Google 동의 절차가 완료되고 동일한 터널을 통해 콜백이 서버로 전달됩니다. blob은 필요하지 않습니다. 연결이 활성 상태로 표시될 때까지 터널을 열어 두세요.

아래의 고정 루프백 제공자들과 달리 여기서는 **포워딩 하나면 충분합니다**. Antigravity 콜백이 대시보드 포트 자체를 사용하므로 터널링할 별도의 제공자 전용 포트가 없습니다.

> 완전한 헤드리스 대안(도우미와 터널 모두 사용하지 않음)으로는 **자체** Google OAuth 웹 자격 증명과 공개 기본 URL을 구성할 수 있습니다. 자세한 내용은 해당 제공자의 OAuth 환경 변수를 참조하세요. 위의 두 옵션에는 추가 Google 설정이 필요하지 않습니다.

---

## 원격 설치 환경에서 Codex / Grok 연결하기(고정 루프백 공급자)

Codex, xAI(`xai-oauth`) 및 Grok CLI(`grok-cli`)는 업스트림 OAuth 앱에 **고정된** 루프백
`redirect_uri`를 등록합니다. OmniRoute는 이를 변경할 수 없습니다. 공급자는 항상 브라우저를
하드코딩된 동일한 주소로 리디렉션합니다.

| 공급자      | 공급자가 리디렉션하는 고정 콜백       |
| ----------- | ------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback` |
| `xai-oauth` | `http://127.0.0.1:56121/callback`     |
| `grok-cli`  | `http://127.0.0.1:56122/callback`     |

여기서 `localhost`는 **브라우저를 실행하는 머신**을 의미하지만, OmniRoute의 PKCE
콜백 서버는 **서버의** 루프백에서 수신 대기합니다. `http://192.168.0.15:20128` 같은 LAN
주소로 대시보드를 열면 둘은 연결되지 않습니다. 인증 코드는 아무것도 수신 대기하지 않는
사용자 노트북의 `localhost:1455`로 전달되고, 공급자는 오류를 표시하지 않은 채 로그인을
실패 처리합니다.

대시보드는 팝업을 열기 전에 이를 감지하고, 로그인이 조용히 실패하도록 두는 대신
터널 명령을 표시합니다(#8046).

### 해결 방법 — **두** 포트 모두 포워딩하기

```bash
# 브라우저를 실행하는 머신에서:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# 그런 다음 http://localhost:20128로 이동하여 그곳에서 Codex를 연결합니다
```

두 개의 포워딩이 필요하며, 하나만 포워딩해도 여전히 실패합니다.

- **`20128`**(대시보드 포트)은 오리진을 실제 localhost로 만듭니다. 그래야만
  OmniRoute가 PKCE 콜백 서버를 시작합니다. LAN 오리진은 해당 분기에 도달하지
  않습니다.
- **`1455`**(공급자의 고정 콜백 포트)는 브라우저가 다시 리디렉션되는 곳입니다.
  이 포트는 터널을 통해 서버의 루프백으로 연결되어야 합니다.

xAI 또는 Grok CLI를 연결할 때는 `1455`를 `56121`/`56122`로 바꾸고, `20128`은
실제 대시보드 포트로 바꾸십시오. 연결이 활성 상태로 표시될 때까지 터널을
열어 두십시오.

> **SSH에 접근할 수 없습니까?** Codex와 Grok CLI는 붙여 넣은 토큰도 허용합니다. 연결
> 대화 상자의 **Paste API Key** / **Import auth.json** 탭을 사용하십시오. 이 방식에는
> 루프백 콜백이 없으므로 어떤 오리진에서도 작동합니다. 또한 Codex는 단독 액세스
> 토큰이나 `~/.codex/auth.json` 세션 블롭도 허용합니다.

---

## 토큰 관리

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ 비밀 값은 한 번만 출력됩니다. 지금 복사하십시오
omniroute tokens list                 # 마스킹됨: id, 이름, 범위, 접두사, 상태, 만료일
omniroute tokens revoke <id|prefix>   # 즉시 폐기
omniroute tokens scopes               # 세 가지 범위 설명
```

`tokens` 명령에는 **admin** 자격 증명이 필요합니다. 대시보드의
**Settings → Access Tokens**에서도 토큰을 관리할 수 있습니다(생성, 폐기, 일회성 복사).

---

## 원격 카탈로그에서 코딩 CLI 구성하기

`omniroute configure`는 **활성 서버의** 실시간 모델 카탈로그를 읽고
**사용자의** 머신에 구성을 작성합니다.

```bash
omniroute configure codex
#   공급자: glm, kmc, ollamacloud, opencode-go, …
#   공급자: glm
#   모델 id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml에 작성됨
#   사용 방법:  codex --profile glm52

# 비대화형
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# 자주 사용하는 모델을 대화형 선택기 상단에 유지
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

선택기는 로컬 `model-preferences.json` 파일에 모델 ID만 보관하며(URL이나 자격 증명은
절대 저장하지 않음), 컨텍스트와 CLI 대상별로 범위가 지정됩니다. 즐겨찾기는 최근 선택
항목보다 먼저 표시됩니다. 선택한 모델을 해당 컨텍스트/대상 목록에서 제거하려면
`--unfavorite`을 사용하십시오.

작성된 프로필은 환경 변수를 통해 추론 키를 참조합니다
(`OMNIROUTE_API_KEY`). 비밀 값은 디스크에 절대 기록되지 않습니다. 일회성 기본 Codex
설정(`[model_providers.omniroute]` 블록)은
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md)를 참조하십시오.

### 원격 서버를 대상으로 CLI 실행하기(구성 기록 없음)

`omniroute run <target>`도 활성 컨텍스트를 따릅니다. 원격 기본 URL과
컨텍스트 자격 증명은 생성된 프로세스에만 주입됩니다.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → 원격
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# 정확히 무엇이 생성될지 미리 보기(환경 변수 KEY 이름만 표시하며 값은 절대 표시하지 않음):
omniroute run codex --dry-run --json
```

대상: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(단일 소스: `bin/cli/cli-manifest.mjs`). Qwen과 Gemini는 종료 시 제거되는
임시 격리 홈에서 실행되므로, 실행 과정에서 개인 도구 구성을 건드리거나 해당 구성에
정보를 유출하지 않습니다.

### CLI별 설정 명령

지원되는 각 CLI에는 원격을 인식하는 설정 명령이 있습니다(모두 활성
컨텍스트 또는 `--remote <url> --api-key <key>`를 따름).

| CLI         | 명령어                     | 작성되는 항목                                                                                                                                               |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` 프로필(모델별)                                                                                                                |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json`(모델별)                                                                                                           |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — 카탈로그의 모든 모델이 포함된 `omniroute` OpenAI 호환 제공자(`opencode -m omniroute/<model>` 실행)                     |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json`(CLI 모드) + 붙여 넣을 VS Code 확장 설정 출력(OpenAI 호환, `/v1`이 **없는** 기본 URL)                             |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json`(CLI) + VS Code `kilocode.*` 설정 — OpenAI 호환, `/v1`이 **포함된** 기본 URL                                                 |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml`(VS Code/JetBrains + `cn` CLI) — `provider: openai`, `/v1`이 **포함된** `apiBase`, `${{ secrets.OMNIROUTE_API_KEY }}`를 통한 키    |
| Cursor      | `omniroute setup-cursor`   | 앱 내 설정 단계 출력(설정 → 모델 → `/v1`이 **포함된** OpenAI 기본 URL 재정의 + 키 + 모델). Cursor 설정은 불투명한 SQLite 형식 — 채팅 패널 전용              |
| Roo Code    | `omniroute setup-roo`      | Roo 가져오기 JSON(`~/.omniroute/roo-settings.json`) 작성 + `roo-cline.autoImportSettingsPath` 설정 + UI 단계 출력(OpenAI 호환, `/v1`이 **포함된** 기본 URL) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` 제공자, `/v1`이 **포함된** `base_url`, `$OMNIROUTE_API_KEY`를 통한 키                                        |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml`(`GOOSE_PROVIDER=openai` + `/v1`이 **없는** `OPENAI_HOST` + `GOOSE_MODEL`) + 환경 변수 설정 예시                               |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml`(`/v1`이 **없는** `openai-api-base` + `model: openai/<id>`) + 환경 변수 설정 예시(`aider --message --yes`)                               |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4의 `modelProviders.openai` 항목 + `~/.qwen/.env`의 `OMNIROUTE_API_KEY`                                                            |

```bash
# OpenCode(OpenAI 호환 제공자, 모든 카탈로그 모델, 원격 VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # 일치하는 모델만 유지
opencode -m omniroute/glm/glm-5.2 "..."          # 먼저 OMNIROUTE_API_KEY 내보내기
```

> OpenCode에는 더 풍부한 **플러그인** 통합도 있습니다: `omniroute setup opencode`
> (이제 `--remote`를 통해 원격 환경도 지원)는 `@omniroute/opencode-plugin`을 설치합니다.
> `setup-opencode`는 가벼운 OpenAI 호환 대안입니다. API 키는
> `{env:OMNIROUTE_API_KEY}`를 통해 참조되며, 디스크에는 절대 기록되지 않습니다.
>
> OpenCode v2에서는 대신 `@omniroute/opencode-plugin-v2`를 사용하세요. 카탈로그는 같지만
> 로더 계약이 다릅니다. 통합이 연결되면 OpenCode 자체 자격 증명
> 저장소에서 키를 읽으므로, 원격 게이트웨이는 `opencode.json`에
> 키를 전혀 포함할 필요가 없습니다.

---

## 컨텍스트 관리 (서버 간 전환)

**컨텍스트**는 저장된 서버(baseUrl + 자격 증명 + 범위)입니다. `omniroute connect`는
하나를 생성하고 활성화하며, 그 이후의 모든 명령은 해당 컨텍스트를 대상으로 합니다.
`omniroute contexts`를 사용하여 컨텍스트를 관리하고 전환할 수 있습니다.

```bash
omniroute contexts list            # 모든 컨텍스트; 활성 컨텍스트는 ●로 표시됩니다.
omniroute contexts current         # 활성 서버, 인증 상태, 범위
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**서버 전환** — 모든 후속 명령은 활성 컨텍스트를 따릅니다.

```bash
omniroute contexts use vps         # → 이제 모든 명령이 원격 VPS를 대상으로 합니다.
omniroute tokens list              #   (VPS에 대해 실행됩니다.)

omniroute contexts use default     # → localhost로 돌아갑니다.
omniroute tokens list              #   (로컬 서버에 대해 실행됩니다.)
```

**수동으로 컨텍스트 추가** (`connect` 대신), 검사 또는 이름 변경:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # 단일 컨텍스트에 대한 전체 세부 정보
omniroute contexts rename staging stg
```

**컨텍스트 제거** — 확인 메시지가 표시됩니다. 건너뛰려면 `--yes`를 전달합니다.
(스크립트/비대화형 셸의 경우 필요하며, 그렇지 않으면 안전하게 거부됩니다.)

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost)는 제거할 수 없습니다. 활성 컨텍스트를 제거하면
> `default`로 폴백됩니다. 팁: 컨텍스트를 제거하는 것은 **로컬**에 저장된 자격 증명만
> 삭제하는 것입니다. 실제로 액세스를 종료하려면 `omniroute tokens revoke <id>`로
> 서버에서 토큰을 취소해야 합니다.

컨텍스트 **내보내기/가져오기** (예: 컴퓨터 간 이동). 내보내기는 기본적으로 자격 증명을
생략하며, 파일 폴백으로 저장된 자격 증명도 포함합니다. 휴대 가능한 자격 증명 포함 백업이
필요한 경우 `--include-secrets`를 명시적으로 사용하십시오.

```bash
omniroute contexts export --out contexts.json     # 수정됨; 기본 대상: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # 덮어쓰기; 기존 항목을 유지하려면 --merge
omniroute contexts migrate --yes                  # 레거시 일반 텍스트 토큰을 키체인으로 이동
```

`--include-secrets`는 내보내기 전에 키체인 참조를 확인하고, 참조된 자격 증명을 읽을 수
없는 경우 실패합니다. `--no-secrets`는 항상 우선합니다. 내보내기 파일은 모드 `0600`으로
원자적으로 작성됩니다. 명시적인 비밀 정보가 포함된 내보내기는 비밀 자료로 취급하십시오.
사용 가능한 OS 키체인이 없는 헤드리스 시스템에서는 CLI가 모드 `0600`으로 `config.json`으로
폴백하고 일회성 경고를 출력합니다. 이 모드에서는 기본 내보내기가 수정된 상태로 유지됩니다.

---

## 빠른 엔드투엔드 확인

원격 설정을 처음부터 확인하기 위해 그대로 복사하여 붙여넣을 수 있는 수명 주기입니다.
연결하고, 범위가 지정된 토큰을 발급하고, 명령을 라우팅하고, 다시 전환한 후 정리합니다.
`192.168.0.15`를 서버의 호스트/IP(Tailscale, LAN 또는 공개
`https://…` URL)로 바꾸세요.

```bash
# 1. 연결(비밀번호 → 관리자 토큰, 활성화되는 컨텍스트로 저장)
omniroute connect 192.168.0.15                 # 또는: --key oma_live_xxxx  (비밀번호 없음)
omniroute contexts current                     # 원격 서버 + 범위를 표시

# 2. 사용 — 이제 관리 명령이 원격 서버를 대상으로 실행됨
omniroute tokens create --name laptop --scope read   # 더 제한적인 토큰 발급
omniroute tokens list                                 # 원격 서버에서 마스킹된 목록 조회

# 3. 상호 전환
omniroute contexts use default                 # → 로컬
omniroute contexts use 192-168-0-15            # → 다시 원격(`contexts list`에 표시된 이름)

# 4. 정리. 참고: `contexts remove`는 로컬 자격 증명만 삭제하며
#    서버의 토큰을 폐기하지는 않습니다. 액세스를 실제로 차단하려면 먼저
#    서버 측에서 토큰을 폐기하세요.
omniroute tokens revoke <id|prefix>            # 서버에서 액세스 차단
omniroute contexts remove 192-168-0-15 --yes   # 로컬 컨텍스트 삭제(활성 상태여도 → default로 대체), 확인 메시지 없음
```

> `--yes`를 사용하면 `contexts remove`가 비대화형으로 실행됩니다(스크립트/CI에서
> 필수이며, 이 옵션이 없으면 비대화형 셸은 중단된 채 대기하는 대신 안전하게 거부합니다).
> **활성** 컨텍스트를 제거하면 자동으로 `default`로 대체됩니다.

---

## 보안 참고 사항

- 토큰 평문은 한 번만 표시되며, SHA-256 해시만 영구 저장됩니다(API 키와 동일).
- `omniroute connect`는 로그인 무차별 대입 방지 잠금 및 감사 로깅을 재사용합니다.
- 전송에는 HTTPS 또는 Tailnet을 사용하는 것이 좋습니다. 호스트만 지정하면 LAN/Tailscale에서 편리하게 사용할 수 있도록 기본값이 `http://`로 설정됩니다. TLS를 사용하려면 전체 `https://…` URL을 전달하세요.
- 권장되는 로컬 컨텍스트 파일은 `~/.omniroute/config.json`(`chmod 600`)이며, 여기에는 `credentialRef`만 포함됩니다. 토큰 자체는 OS 키체인(`keytar`)에 저장되며 로그에 절대 출력되지 않습니다. 정상적으로 작동하는 네이티브 키체인이 없는 헤드리스 설치에서는 명시적 대체 수단으로 동일한 `0600` 파일을 사용하고 경고를 한 번 표시합니다. 키체인 백엔드를 설치한 후 `omniroute contexts migrate --yes`를 사용하세요.

---

## API 엔드포인트(참조)

| 메서드 | 경로                  | 인증          | 범위                        |
| ------ | --------------------- | ------------- | --------------------------- |
| POST   | `/api/cli/connect`    | 관리 비밀번호 | — (공개, 비밀번호로 보호됨) |
| GET    | `/api/cli/whoami`     | 액세스 토큰   | 읽기                        |
| GET    | `/api/cli/tokens`     | 액세스 토큰   | 관리자                      |
| POST   | `/api/cli/tokens`     | 액세스 토큰   | 관리자                      |
| DELETE | `/api/cli/tokens/:id` | 액세스 토큰   | 관리자                      |

전체 스키마는 [openapi.yaml](../openapi.yaml)을 참조하세요.
