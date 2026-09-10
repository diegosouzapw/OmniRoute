# CLI-INTEGRATIONS (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI 통합 — OmniRoute에 모든 코딩 CLI 연결하기"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI 통합

OmniRoute는 코딩 CLI(Codex, Claude Code, OpenCode, Cline 등)를 OmniRoute의 백엔드로 사용하도록 구성하는 `setup-*` 명령어 모음을 제공합니다. 이를 통해 도구는 **하나**의 엔드포인트와 통신하고 OmniRoute는 자동으로 적절한 제공자로 라우팅합니다. 각 명령어는 실행 중인 OmniRoute(로컬 또는 원격)에서 **실시간** 모델 카탈로그를 읽고 **당신의** 머신에 도구의 구성 파일을 작성합니다. API 키는 도구가 지원하는 곳에서 환경 변수로 참조됩니다. 도구 로컬 환경 파일을 지속하는 명령어는 아래에 명시되어 있습니다.

또한, `omniroute run <target>`이라는 일반 실행기가 있어, `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` 또는 `gemini`를 적절한 환경 변수를 주입하여 구성 파일을 작성하지 않고 실행할 수 있습니다. 타겟과 그 별칭은 정식 매니페스트 `bin/cli/cli-manifest.mjs`에서 가져오며(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), `omniroute completion`은 동일한 매니페스트에서 파생된 타겟 단어를 제공합니다. 구식 도구별 실행기인 `omniroute launch`(Claude Code)와 `omniroute launch-codex`(Codex)도 여전히 사용 가능합니다.

제공자 온보딩은 동일한 로컬/원격 컨텍스트에서 가능합니다. 아래의 API 우선 명령어는 관리 인증을 제공자 자격 증명과 분리하여 구조화된 출력에 자격 증명을 절대 출력하지 않습니다:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

스크립트의 경우 `--credential-stdin` 또는 `--credential-env`를 선호하세요; `--credential`은 제어된 로컬 사용을 위해 유지됩니다. `providers remove`는 비대화형 터미널에서 `--yes`를 요구하며, 모든 다섯 개의 명령어는 활성 컨텍스트 또는 전역 `--base-url`/`--api-key` 옵션을 존중합니다.

두 가지 가장 풍부한 통합의 일회성 수동 기본 설정에 대해서는 도구별 심층 분석을 참조하세요:

- [Claude Code 구성](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 구성](./CODEX-CLI-CONFIGURATION.md)
- [원격 모드](./REMOTE-MODE.md) — 노트북에서 원격 OmniRoute(VPS / Tailnet) 제어
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot 확장; 편집기 내에서 이러한 `setup-*` 명령어를 실행할 수도 있습니다.

---

## 마스터 테이블

모든 명령어는 **활성 컨텍스트**( `omniroute connect`로 설정, [원격 모드](./REMOTE-MODE.md) 참조) 또는 명시적 `--remote <url> --api-key <key>` 플래그를 존중합니다. 아래의 "로컬 vs 원격"은 플래그가 없을 경우 `http://localhost:20128`을 대상으로 하며, `--remote`(또는 활성 원격 컨텍스트)가 설정되면 해당 서버에서 카탈로그를 가져와 로컬에 구성을 작성합니다.

| 명령어                     | 도구                         | 작성하는 내용                                                                                                                         | 주요 플래그                                                                                                                                | 로컬 vs 원격 |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — 호환 가능한 텍스트 모델당 하나의 프로필 (`codex --profile <name>`)                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 둘 다        |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — 일치하는 모델당 하나의 프로필 (`CLAUDE_CONFIG_DIR`)                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 둘 다        |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — 모든 카탈로그 모델을 가진 `omniroute` 제공자 (`opencode -m omniroute/<model>`)                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 둘 다        |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI 모드) + VS Code 확장 설정 출력                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 둘 다        |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + 존재할 경우 `kilocode.*`를 VS Code `settings.json`에 병합                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 둘 다        |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` 모델, 키는 `${{ secrets.OMNIROUTE_API_KEY }}`를 통해 제공                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 둘 다        |
| `omniroute setup-cursor`   | Cursor                       | 없음 — 앱 내 단계 출력 (Cursor 구성은 불투명한 SQLite)                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | 둘 다        |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (문서 가져오기) + VS Code `settings.json`이 존재할 경우 `roo-cline.autoImportSettingsPath` 설정      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 둘 다        |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` 제공자, 키는 `$OMNIROUTE_API_KEY`를 통해 제공                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 둘 다        |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + 환경 레시피 출력                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다        |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + 환경 레시피 출력                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다        |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` 배열 + `~/.qwen/.env`의 `OMNIROUTE_API_KEY`                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 둘 다        |
| `omniroute run <target>`   | 런타임 실행 (일반)           | 없음 — 적절한 환경과 인수로 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`를 생성; Qwen과 Gemini는 임시 격리된 홈을 사용 | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 둘 다        |
| `omniroute launch`         | Claude Code                  | 없음 — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`이 주입된 `claude`를 생성                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 둘 다        |
| `omniroute launch-codex`   | OpenAI Codex CLI             | 없음 — `-c` 플래그를 통해 `omniroute` 제공자가 주입된 `codex`를 생성                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 둘 다        |

플래그에 대한 주의 사항(명령어 소스에서 확인됨):

- `--remote <url>` — 원격 OmniRoute에서 카탈로그를 가져옵니다( `--port` 및 활성 컨텍스트를 무시합니다). `--api-key <key>`는 해당 서버에 대한 자격 증명을 제공합니다(기본값은 `OMNIROUTE_API_KEY` 환경 변수 또는 활성 컨텍스트의 토큰입니다).
- `--only <patterns>` — 쉼표로 구분된 하위 문자열; 일치하는 모델 ID만 유지합니다(예: `--only glm,kimi`). `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`에서 사용 가능합니다.
- `--dry-run` — 파일 시스템을 건드리지 않고 작성될 내용을 정확히 출력합니다. 모든 `setup-*` 명령어에서 사용 가능하지만 `setup-cursor`에서는 사용할 수 없습니다(파일을 작성하지 않기 때문입니다).
- `--model <id>` — 모델 자동 검색이 없는 도구에 대해 필수(또는 대화형으로 선택됨): Cline, Kilo, Roo, Goose, Qwen, Aider. 이러한 도구는 비대화형 실행을 위해 `--yes`도 수용합니다(이 경우 `--model`이 필요합니다). `setup-opencode`는 기본 최상위 모델을 설정하기 위해 `--model`을 사용합니다.
- `--model <id>`는 `omniroute run`에서 매니페스트의 타겟별 연결을 따릅니다(`bin/cli/cli-manifest.mjs`): **aider**는 `--model openai/<id>`를 받고, **opencode**는 `--model omniroute/<id>`를 받습니다(접두사는 ID가 이미 포함되어 있지 않을 때만 추가됨); **qwen**과 **gemini**는 ID를 그대로 받으며; **claude**는 `ANTHROPIC_MODEL`을 통해, **goose**는 `GOOSE_MODEL`을 통해, **codex**는 `-c model_providers.omniroute.*` 인수를 통해 받습니다. **Qwen은 유일하게 `--model`을 강제로 요구하는 실행 타겟입니다** — `omniroute run qwen` 없이 실행하면 `2`와 함께 명시적 오류가 발생합니다.
- `--port <port>` — 로컬 OmniRoute 포트(기본값 `20128`, `--remote`가 설정되면 무시됨). 모든 `setup-*` 및 두 실행기에서 사용 가능합니다.
- `omniroute run` 종료 코드: 자식 CLI의 종료 코드는 그대로 전파됩니다; `2` = 잘못된 인수(지원되지 않는 타겟, 필수 `--model` 누락, 컨테이너 보호); `127` = 타겟 바이너리가 `PATH`에 없음; `130`/`143`/`129`는 `SIGINT`/`SIGTERM`/`SIGHUP`에 의해 실행이 종료됨; `1` = 기타 런타임 실행 실패.
- 두 개의 실행기(`launch`, `launch-codex`)는 `setup-claude` / `setup-codex`에 의해 작성된 프로필을 선택하기 위해 `--profile <name>`을 수용하며, 기본 `claude` / `codex` 바이너리에 대한 전달 인수를 추가로 전달합니다.

대화형 선택기는 설정 레시피와도 공유됩니다:

```bash
# 활성 로컬 또는 원격 모델 카탈로그에서 선택하고 타겟을 구성합니다.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure`는 현재 `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`에 대한 테스트된 레시피에 위임됩니다. IDE 전용, MITM 및 가이드 전용 카탈로그 항목은 명시적 `setup-*`/수동 흐름으로 남아 있으며 실행 가능한 타겟으로 제시되지 않습니다.

> `setup-opencode`는 **경량 openai 호환** OpenCode 통합입니다.
> 더 풍부한 플러그인 통합도 있으며 — `omniroute setup opencode` — `@omniroute/opencode-plugin`을 설치합니다. 이들은 서로 다른 명령어이며, 위의 테이블은 `setup-opencode`를 문서화합니다.

---

## 로컬 사용

`localhost:20128`에서 OmniRoute가 실행 중인 경우, 도구에 대한 설정 명령을 실행하기만 하면 됩니다. 카탈로그는 로컬 서버에서 가져옵니다.

```bash
# Codex: 일치하는 모델마다 프로필을 ~/.codex/에 작성합니다.
omniroute setup-codex
codex --profile glm52            # 생성된 프로필 사용

# Claude Code: 모델별 프로필을 작성한 후 하나를 실행합니다.
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: 모든 카탈로그 모델과 함께 openai 호환 제공자를 작성합니다.
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY}를 통해 참조, 디스크에는 저장되지 않음
opencode -m omniroute/glm/glm-5.2 "..."

# 자동 검색이 없는 도구는 명시적인 모델이 필요합니다:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 아무것도 작성하지 않고 미리보기:
omniroute setup-continue --dry-run
```

구성을 전혀 작성하지 않고 실행합니다 (환경 주입만):

```bash
omniroute launch                 # Claude Code → 로컬 OmniRoute
omniroute launch-codex           # Codex CLI → 로컬 OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 명시적인 명령 경로: -- 다음에 오는 모든 것을 전달합니다.
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 원격 사용

모든 설정 명령을 `--remote` + `--api-key`와 함께 원격 OmniRoute에 지정합니다. 카탈로그는 원격에서 가져오며, 구성은 로컬 머신에 작성됩니다.

```bash
# 원격 VPS에 대한 OpenCode, glm/kimi 모델만 유지
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 먼저 OMNIROUTE_API_KEY를 내보내세요

# 원격 카탈로그에서 Codex 프로필
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 원격에 직접 CLI 실행
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

매번 `--remote`/`--api-key`를 전달하는 대신, 한 번 로그인하고 **활성 컨텍스트**가 자동으로 제공하도록 합니다:

```bash
omniroute connect 192.168.0.15        # 범위가 지정된 토큰을 발급하고 컨텍스트를 저장합니다
omniroute setup-codex                 # ← 이제 원격 카탈로그를 사용합니다
omniroute setup-opencode              # ← 동일
omniroute launch                      # ← 원격에 대한 Claude Code
```

컨텍스트, 범위 및 토큰 관리에 대한 내용은 [원격 모드](./REMOTE-MODE.md)를 참조하세요.

---

## 기본 URL 규칙 (어떤 도구가 `/v1`을 원하는지)

OmniRoute는 `/v1`에서 OpenAI 인터페이스를 노출하고, 루트에서 Anthropic 인터페이스를, `/v1beta`에서 네이티브 Gemini 인터페이스를 제공합니다. 각 통합은 도구가 기대하는 형식에 맞게 연결됩니다 (명령 소스에서 확인됨):

| 통합                                                                       | 작성된 기본 URL | `/v1`?                                                 |
| -------------------------------------------------------------------------- | --------------- | ------------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | 루트            | 아니요 — Cline은 `/v1/chat/completions`를 추가합니다   |
| `setup-goose` (`OPENAI_HOST`)                                              | 루트            | 아니요 — Goose는 경로를 추가합니다                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 루트            | 아니요 — LiteLLM은 `/v1/chat/completions`를 추가합니다 |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` 포함      | 예                                                     |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 루트            | 아니요 — Claude Code는 `/v1/messages`를 추가합니다     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` 포함      | 예                                                     |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` 포함      | 예                                                     |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 루트            | 아니요 — SDK는 `/v1beta/models/…`를 추가합니다         |

---

## 네이티브 의존성 업데이트 유지: `--include=optional`

`omniroute update`로 업데이트할 때 (확인 후 또는 `--apply`와 함께),
OmniRoute는 `--include=optional`을 포함하여 설치를 실행합니다:

```bash
npm install -g omniroute@latest --include=optional
```

이것은 `omniroute update`에 전달하는 플래그가 **아닙니다** — 항상
업데이트 프로그램에 의해 적용됩니다. 이는 `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM 스택)가 업데이트 중에도 살아남도록 보장합니다.
만약 npm 설정에 `omit=optional`이 설정되어 있다면, 이는 네이티브 SQLite
드라이버와 OS-keyring 바인딩을 조용히 제거할 수 있습니다. 적용하지 않고
정확한 명령을 미리 보려면:

```bash
omniroute update --dry-run
# [DRY RUN] 실행할 것: npm install -g omniroute@latest --include=optional
```

다른 `omniroute update` 플래그 (소스에서 확인됨): `--check` (구버전일 경우 1로 종료), `--apply` (프롬프트 없이 설치), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

`@google/gemini-cli` 0.50.0에 대해 계약이 검증되었습니다: CLI는
`GOOGLE_GEMINI_BASE_URL`을 존중하며 `POST /v1beta/models/<model>:generateContent`
(및 `:streamGenerateContent?alt=sse`)를 발행합니다 — 이는 OmniRoute의 네이티브
Gemini 인터페이스 (`/v1beta`)와 정확히 일치합니다. `omniroute run gemini`는 이를 자동으로 연결합니다:

- `GOOGLE_GEMINI_BASE_URL` → 활성 OmniRoute 기본 URL (루트, `/v1` 없음);
- `GEMINI_API_KEY` → 해결된 OmniRoute 자격 증명 (옵션/환경/컨텍스트);
- **임시 격리된 `GEMINI_CLI_HOME`**의 `.gemini/settings.json`이
  `gemini-api-key` 인증을 선택하므로 저장된 Google OAuth 세션 (Code Assist)
  가 OmniRoute 지시의 실행을 덮어쓰지 않도록 합니다 — 종료 후 제거됩니다;
- **환경 위생**: 자식 환경에서 `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` 및 `GOOGLE_GENAI_USE_GCA`가 제거됩니다
  (이는 인증을 Vertex/Code Assist로 리디렉션할 수 있음), 그리고 `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`가
  벨트와 suspenders의 백업으로 설정됩니다 — 다른 `run` 대상도
  자신의 충돌하는 변수에 대해 동일한 처리를 받습니다;
- `--model <id>` 주입은 `--provider`/`--model`에서 가져옵니다.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini의 작업 공간 신뢰 보호는 헤드리스 모드에서도 적용됩니다 —
`--skip-trust`를 전달하거나 디렉토리를 대화식으로 신뢰하십시오;
런처는 의도적으로 이를 우회하지 않습니다. 이 런처는 **ACP 등록**
(`src/lib/acp/registry.ts`, `gemini --acp`)과는 다릅니다. ACP 등록은
`/dashboard/acp-agents`에 대한 에이전트 프로토콜 통합을 유지합니다.

---

## 실제 스모크 스윕 (옵트인)

결정론적 실행 계획 회귀 테스트가 CI에서 실행됩니다
(`tests/unit/cli/run-command.test.ts`, `tests/unit/cli/run-execution.test.ts`).
REAL 바이너리를 REAL OmniRoute 서버에 대해 검증하기 위해,
옵트인 하네스가 존재합니다
`tests/integration/upstream-cli-smoke.int.test.ts`. 이는 자동으로 실행되지 않으며
(모든 하위 테스트는 `RUN_CLI_SMOKE=1`이 아닌 경우 건너뜁니다),
자격 증명을 환경 변수 NAME으로 전달합니다 (값으로는 전달하지 않음),
기록된 출력에서 키 모양의 문자열을 삭제하고, 바이너리가 설치되지 않은
대상은 건너뛰며, 실패를 인증 / 업스트림 / 구성으로 분류합니다
(단순한 불리언이 아님):

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

선택 사항: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"`는 스윕을 제한합니다;
`OMNIROUTE_SMOKE_TIMEOUT_MS`는 120초의 각 대상 타임아웃을 재정의합니다.

---

## 참조

- [Claude Code 구성](./CLAUDE-CODE-CONFIGURATION.md) — 심층 Claude Code 가이드
- [Codex CLI 구성](./CODEX-CLI-CONFIGURATION.md) — 일회성 `[model_providers.omniroute]` 기본 설정
- [원격 모드](./REMOTE-MODE.md) — 컨텍스트, 범위가 지정된 액세스 토큰, 원격 서버 구동
- [CLI 도구 참조](../reference/CLI-TOOLS.md) — 지원되는 도구 + 대시보드 페이지의 전체 카탈로그
- [설치 가이드](./SETUP_GUIDE.md) — 설치 방법 및 첫 실행 온보딩
