# CLI Integrations (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute는 코딩 CLI(Codex, Claude Code, OpenCode, Cline, …)가 OmniRoute를 백엔드로 사용하도록 구성하는 `setup-*` 명령 제품군을 제공합니다. 따라서 도구는 **하나의** 엔드포인트와 통신하고, OmniRoute는 자동 폴백을 통해 적절한 공급자로 라우팅합니다. 각 명령은 실행 중인 OmniRoute(로컬 또는 원격)에서 **실시간** 모델 카탈로그를 읽고 **사용자** 머신에 있는 해당 도구의 구성 파일에 기록합니다. 도구가 지원하는 경우 API 키는 환경 변수를 통해 참조됩니다. 도구 로컬 환경 파일을 영구 저장하는 명령은 아래에 별도로 명시되어 있습니다.

구성 파일을 전혀 작성하지 않고 올바른 환경 변수를 주입하여 `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` 또는 `gemini`를 실행하는 범용 런처인 `omniroute run <target>`도 있습니다. 대상과 해당 별칭은 정식 매니페스트 `bin/cli/cli-manifest.mjs`에서 가져오며(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), `omniroute completion`도 동일하게 매니페스트에서 파생된 대상 단어를 제공합니다. 기존 도구별 런처인 `omniroute launch`(Claude Code)와 `omniroute launch-codex`(Codex)도 계속 사용할 수 있습니다.

동일한 로컬/원격 컨텍스트에서 공급자 온보딩도 사용할 수 있습니다. 아래의 API 우선 명령은 관리 인증을 공급자 자격 증명과 분리하며, 구조화된 출력에 자격 증명을 절대 표시하지 않습니다.

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

스크립트에서는 `--credential-stdin` 또는 `--credential-env`를 사용하는 것이 좋습니다. `--credential`은 통제된 로컬 사용을 위해 유지됩니다. 비대화형 터미널에서 `providers remove`를 사용하려면 `--yes`가 필요하며, 다섯 명령 모두 활성 컨텍스트 또는 전역 `--base-url`/`--api-key` 옵션을 따릅니다.

가장 풍부한 두 통합을 한 번 직접 설정하는 방법은 도구별 상세 가이드를 참조하세요.

- [Claude Code 구성](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 구성](./CODEX-CLI-CONFIGURATION.md)
- [원격 모드](./REMOTE-MODE.md) — 노트북에서 원격 OmniRoute(VPS / Tailnet) 제어
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot 확장 프로그램이며, 편집기 내에서 이러한
  `setup-*` 명령을 대신 실행할 수도 있습니다

---

## 종합 표

모든 명령은 **활성 컨텍스트**(`omniroute connect`로 설정, [원격 모드](./REMOTE-MODE.md) 참조) 또는 명시적인 `--remote <url> --api-key <key>` 플래그를 따릅니다. 아래의 "로컬과 원격"은 플래그가 없으면 `http://localhost:20128`을 대상으로 하고, `--remote`를 사용하면(또는 원격 컨텍스트가 활성화되어 있으면) 해당 서버에서 카탈로그를 가져와 구성을 로컬에 기록한다는 의미입니다.

| 명령어                     | 도구                   | 기록 내용                                                                                                                                                     | 주요 플래그                                                                                                                                | 로컬/원격 |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `omniroute setup-codex`    | OpenAI Codex CLI       | `~/.codex/<name>.config.toml` — 호환되는 텍스트 모델별 프로필 하나 (`codex --profile <name>`)                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 둘 다     |
| `omniroute setup-claude`   | Claude Code            | `~/.claude/profiles/<name>/settings.json` — 일치하는 모델별 프로필 하나 (`CLAUDE_CONFIG_DIR`)                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 둘 다     |
| `omniroute setup-opencode` | OpenCode (OpenAI 호환) | `~/.config/opencode/opencode.json` — 카탈로그의 모든 모델을 포함하는 `omniroute` 제공자 (`opencode -m omniroute/<model>`)                                     | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 둘 다     |
| `omniroute setup-cline`    | Cline                  | `~/.cline/data/{globalState,secrets}.json` (CLI 모드) + VS Code 확장 설정 출력                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 둘 다     |
| `omniroute setup-kilo`     | Kilo Code              | `~/.local/share/kilo/auth.json` (CLI) + VS Code `settings.json`이 있으면 `kilocode.*` 병합                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 둘 다     |
| `omniroute setup-continue` | Continue / `cn` CLI    | `~/.continue/config.yaml` — `provider: openai` 모델, `${{ secrets.OMNIROUTE_API_KEY }}`를 통한 키 설정                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 둘 다     |
| `omniroute setup-cursor`   | Cursor                 | 기록하지 않음 — 앱 내 설정 단계 출력 (Cursor 설정은 불투명한 SQLite 형식)                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | 둘 다     |
| `omniroute setup-roo`      | Roo Code               | `~/.omniroute/roo-settings.json` (가져오기 문서) + VS Code `settings.json`이 있으면 `roo-cline.autoImportSettingsPath` 설정                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 둘 다     |
| `omniroute setup-crush`    | Crush                  | `~/.config/crush/crush.json` — `openai-compat` 제공자, `$OMNIROUTE_API_KEY`를 통한 키 설정                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 둘 다     |
| `omniroute setup-goose`    | Goose                  | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + 환경 설정 방법 출력                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다     |
| `omniroute setup-aider`    | Aider                  | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + 환경 설정 방법 출력                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 둘 다     |
| `omniroute setup-qwen`     | Qwen Code              | `~/.qwen/settings.json` — V4 `modelProviders.openai` 배열 + `~/.qwen/.env`의 `OMNIROUTE_API_KEY`                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 둘 다     |
| `omniroute setup-5dive`    | 5dive (에이전트 플릿)  | `$HOME`에는 기록하지 않음 — `5dive agent auth set`을 통해 5dive **인증 프로필**(`/var/lib/5dive/auth-profiles/<name>/`) 기록; 루트 전용, 플릿 호스트에서 실행 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 둘 다     |
| `omniroute run <target>`   | 런타임 실행 (일반)     | 기록하지 않음 — 적절한 환경 변수와 인수로 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` 실행; Qwen과 Gemini는 임시 격리 홈 사용                 | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 둘 다     |
| `omniroute launch`         | Claude Code            | 기록하지 않음 — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`을 주입하여 `claude` 실행                                                                          | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 둘 다     |
| `omniroute launch-codex`   | OpenAI Codex CLI       | 기록하지 않음 — `-c` 플래그를 통해 `omniroute` 제공자를 주입하여 `codex` 실행                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 둘 다     |

플래그에 관한 참고 사항(명령 소스에서 확인됨):

- `--remote <url>` — 원격 OmniRoute에서 카탈로그를 가져옵니다(`--port`
  및 활성 컨텍스트보다 우선함). `--api-key <key>`는 해당 서버의 자격 증명을
  제공합니다(기본값은 `OMNIROUTE_API_KEY` 환경 변수 또는 활성 컨텍스트의 토큰).
- `--only <patterns>` — 쉼표로 구분된 부분 문자열입니다. 일치하는 모델 ID만
  유지합니다(예: `--only glm,kimi`). `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`에서 사용할 수 있습니다.
- `--dry-run` — 파일 시스템을 변경하지 않고 기록될 내용을 정확히 출력합니다.
  `setup-cursor`(파일을 전혀 쓰지 않음)를 **제외한** 모든 `setup-*` 명령에서 사용할 수 있습니다.
- `--model <id>` — 모델 자동 검색 기능이 없는 도구인 Cline, Kilo, Roo, Goose,
  Qwen, Aider, 5dive에서는 필수입니다(또는 대화형으로 선택할 수 있음). 이러한 도구는
  비대화형 실행을 위한 `--yes`도 허용합니다(이 경우 `--model`이 필요함).
  `setup-opencode`는 최상위 기본 모델을 설정하기 위해 `--model`을 받습니다.
- `omniroute run`의 `--model <id>`은 매니페스트의 대상별 연결 방식
  (`bin/cli/cli-manifest.mjs`)을 따릅니다. **aider**에는 `--model openai/<id>`를,
  **opencode**에는 `--model omniroute/<id>`를 전달합니다(해당 ID에 접두사가 아직
  없는 경우에만 추가됨). **qwen**과 **gemini**에는 ID를 그대로 전달합니다.
  **claude**에는 `ANTHROPIC_MODEL`을 통해, **goose**에는 `GOOSE_MODEL`을 통해,
  **codex**에는 `-c model_providers.omniroute.*` 인수를 통해 전달합니다.
  **Qwen은 `--model`을 반드시 요구하는 유일한 실행 대상입니다** —
  `omniroute run qwen`을 이 옵션 없이 실행하면 명시적인 오류와 함께
  `2`로 종료됩니다.
- `--port <port>` — 로컬 OmniRoute 포트입니다(기본값 `20128`, `--remote`가
  설정되면 무시됨). 모든 `setup-*` 및 두 런처에서 사용할 수 있습니다.
- `omniroute run` 종료 코드: 하위 CLI 자체의 종료 코드가 그대로 전파됩니다.
  `2` = 잘못된 인수(지원되지 않는 대상, 필수 `--model` 누락, 컨테이너 가드),
  `127` = 대상 바이너리가 `PATH`에 없음,
  `130`/`143`/`129` = 실행이 `SIGINT`/`SIGTERM`/`SIGHUP`에 의해 종료됨,
  `1` = 기타 런타임 실행 실패.
- 두 런처(`launch`, `launch-codex`)는 `setup-claude` / `setup-codex`가
  작성한 프로필을 선택하기 위해 `--profile <name>`을 받으며, 기반
  `claude` / `codex` 바이너리에 전달할 인수도 받습니다.

대화형 선택기는 설정 레시피에서도 공유됩니다:

```bash
# 활성 로컬 또는 원격 모델 카탈로그에서 선택하고 대상을 구성합니다.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

현재 `configure`는 `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`,
`cline`, `continue`, `kilo`, `5dive`에 대해 테스트된 레시피에 위임합니다.
IDE 전용,
MITM 및 가이드 전용 카탈로그 항목은 명시적인 `setup-*`/수동 흐름으로 유지되며
실행 가능한 대상으로 표시되지 않습니다.

> `setup-opencode`는 **경량 openai 호환** OpenCode 통합입니다.
> `@omniroute/opencode-plugin`을 설치하는 더 풍부한 플러그인 통합인
> `omniroute setup opencode`도 있습니다. 이들은 서로 다른 명령이며, 위 표는
> `setup-opencode`를 설명합니다.
>
> 두 로더가 서로 다른 엔트리 포인트를 요구하므로, 플러그인은 OpenCode 메이저
> 버전별로 하나씩, 두 개의 패키지로 제공됩니다.
> OpenCode v1용 `@omniroute/opencode-plugin`과
> OpenCode v2용 `@omniroute/opencode-plugin-v2`입니다. v2 패키지는 새로
> 추가되었으며(`0.1.0`), 아직 변경 중인 호스트 계약을 따르므로 특정 형태를
> 가정하는 대신 OpenCode가 카탈로그 초안에 제공하는 구조를 읽습니다.
> `opencode.json`에 `plugins` 항목을 추가하여 설치할 수 있습니다.
> `omniroute setup opencode`는 여전히 v1 패키지를 설치합니다. 옵션 및 자격 증명
> 조회 순서는 패키지 README에 나와 있습니다.

---

## 로컬 사용법

OmniRoute가 `localhost:20128`에서 실행 중인 상태에서 사용하는 도구의 설정 명령만 실행하면 됩니다. 카탈로그는 로컬 서버에서 가져옵니다.

```bash
# Codex: 일치하는 모델별 프로필을 ~/.codex/에 작성
omniroute setup-codex
codex --profile glm52            # 생성된 프로필 사용

# Claude Code: 모델별 프로필을 작성한 다음 하나를 실행
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: 모든 카탈로그 모델이 포함된 openai 호환 공급자 작성
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY}를 통해 참조되며 디스크에는 절대 저장되지 않음
opencode -m omniroute/glm/glm-5.2 "..."

# 자동 검색을 지원하지 않는 도구에는 명시적인 모델이 필요함:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 아무것도 작성하지 않고 미리 보기:
omniroute setup-continue --dry-run
```

구성을 전혀 작성하지 않고 실행할 수도 있습니다(환경 변수 주입만 사용):

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

# 명시적 명령 경로: -- 뒤에 오는 모든 항목을 그대로 전달
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 원격 사용법

`--remote` + `--api-key`를 사용하여 설정 명령이 원격 OmniRoute를 가리키도록 합니다. 카탈로그는 원격 서버에서 가져오며, 구성은 로컬 머신에 작성됩니다.

```bash
# 원격 VPS의 OpenCode에서 glm/kimi 모델만 유지
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 먼저 OMNIROUTE_API_KEY 내보내기

# 원격 카탈로그에서 Codex 프로필 생성
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 원격 서버에 직접 연결하여 CLI 실행
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

매번 `--remote`/`--api-key`를 전달하는 대신 한 번 로그인하면 **활성 컨텍스트**가 이를 자동으로 제공합니다.

```bash
omniroute connect 192.168.0.15        # 범위가 지정된 토큰을 발급하고 컨텍스트를 저장
omniroute setup-codex                 # ← 이제 원격 카탈로그 사용
omniroute setup-opencode              # ← 동일
omniroute launch                      # ← 원격 서버에 연결된 Claude Code
```

컨텍스트, 범위 및 토큰 관리에 대해서는 [원격 모드](./REMOTE-MODE.md)를 참조하세요.

---

## 5dive 에이전트 플릿

[5dive](https://5dive.ai)는 장시간 실행되는 코딩 에이전트 플릿을 운영하며, 각 에이전트는 자체 Unix 사용자 계정 아래의 systemd 유닛입니다. 5dive 자체는 코딩 CLI가 아니므로 `omniroute run`으로 실행할 대상이 없습니다. 즉, `5dive`는 **구성 전용** 대상입니다.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

두 형식 모두 하나의 5dive **인증 프로필**을 작성하며, 이후 해당 프로필에 바인딩된 모든 `claude` 시트가 OmniRoute와 통신합니다. 이 대상에는 다음 세 가지 고유 사항이 있습니다.

- **플릿 호스트에서 root로 실행됩니다.** 5dive의 동작은 로컬 systemd 유닛과 root 소유 상태 디렉터리에 적용되며, 원격 모드는 없습니다. 이미 root가 아닌 경우 레시피는 `sudo`를 통해 다시 실행됩니다(`--no-sudo`를 사용하면 이 동작을 끄고 대신 명령을 출력합니다).
- **루프백이 아닌 경우 엔드포인트는 `https://`여야 합니다.** 에이전트의 API 키는 모든 요청에서 해당 URL을 통해 전송되며, 5dive는 외부 머신을 가리키는 평문 엔드포인트를 거부합니다. 사설 LAN 주소도 예외가 아닙니다.
- **각 시트 자체의 모델 고정 설정이 프로필보다 우선합니다.** 프로필에는 `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`이 포함되지만, 기본 모델 ID에 여전히 고정된 시트는 첫 번째 턴에서 _"선택한 모델에 문제가 있습니다"_라는 오류와 함께 실패합니다. 시트도 고정하려면 `--agent <name>`을 전달하세요(반복 가능). 전달하지 않으면 레시피가 해당 명령을 출력합니다.

API 키는 **stdin**을 통해 5dive에 전달되므로(`--api-key=-`) `ps` 출력에 절대 나타나지 않습니다.

프로필이 단일 모델이 아닌 OmniRoute **콤보**를 가리키도록 해야 플릿 공급자 장애 조치가 적용됩니다. [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578)에 기록된 실행에서는 기본 엔드포인트가 턴 중간에 완전히 다운되었지만, 에이전트는 대체 엔드포인트에서 남은 단계를 완료했으며 장애를 외부에 노출하지 않았습니다.

---

## 기본 URL 규칙(`/v1`이 필요한 도구)

OmniRoute는 `/v1`에서 OpenAI 인터페이스를, 루트에서 Anthropic 인터페이스를,
그리고 `/v1beta`에서 네이티브 Gemini 인터페이스를 제공합니다. 각 통합은 해당
도구가 요구하는 형식으로 연결됩니다(명령 소스에서 확인됨).

| 통합                                                                       | 작성되는 기본 URL | `/v1` 여부                                     |
| -------------------------------------------------------------------------- | ----------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | 루트              | 아니요 — Cline이 `/v1/chat/completions` 추가   |
| `setup-goose` (`OPENAI_HOST`)                                              | 루트              | 아니요 — Goose가 경로 추가                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 루트              | 아니요 — LiteLLM이 `/v1/chat/completions` 추가 |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` 포함        | 예                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 루트              | 아니요 — Claude Code가 `/v1/messages` 추가     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` 포함        | 예                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` 포함        | 예                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 루트              | 아니요 — SDK가 `/v1beta/models/…` 추가         |
| `setup-5dive` (인증 프로필의 `ANTHROPIC_BASE_URL`)                         | 루트              | 아니요 — Claude Code가 `/v1/messages` 추가     |

---

## 업데이트 시 네이티브 의존성 유지: `--include=optional`

`omniroute update`로 업데이트하면(확인 후 또는 `--apply` 사용 시),
OmniRoute는 `--include=optional`이 포함된 설치 명령을 실행합니다.

```bash
npm install -g omniroute@latest --include=optional
```

이것은 `omniroute update`에 전달하는 플래그가 **아닙니다**. 업데이터가 항상
적용합니다. 이 옵션은 npm 설정에 `omit=optional`이 지정되어 있더라도
`optionalDependencies`(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM
스택)가 업데이트 후에도 유지되도록 보장합니다. 그렇지 않으면 네이티브 SQLite
드라이버와 OS 키링 바인딩이 별다른 알림 없이 제거될 수 있습니다. 실제로
적용하지 않고 정확한 명령을 미리 보려면 다음을 실행합니다.

```bash
omniroute update --dry-run
# [시험 실행] 다음 명령을 실행합니다: npm install -g omniroute@latest --include=optional
```

그 밖의 `omniroute update` 플래그(소스에서 확인됨): `--check`(구버전이면
종료 코드 1), `--apply`(확인 없이 설치), `--changelog`, `--no-backup`,
`--yes`.

---

## `omniroute run gemini`를 통한 Google Gemini CLI

`@google/gemini-cli` 0.50.0을 기준으로 동작이 확인되었습니다. CLI는
`GOOGLE_GEMINI_BASE_URL`을 따르며, 해당 URL에 대해
`POST /v1beta/models/<model>:generateContent`(및
`:streamGenerateContent?alt=sse`) 요청을 보냅니다. 이는 OmniRoute의 네이티브
Gemini 인터페이스(`/v1beta`)와 정확히 일치합니다. `omniroute run gemini`는
이를 자동으로 연결합니다.

- `GOOGLE_GEMINI_BASE_URL` → 활성 OmniRoute 기본 URL(루트, `/v1` 없음);
- `GEMINI_API_KEY` → 확인된 OmniRoute 자격 증명(옵션/환경 변수/컨텍스트);
- `.gemini/settings.json`에서 `gemini-api-key` 인증을 선택하는 **임시로 격리된
  `GEMINI_CLI_HOME`**. 따라서 저장된 Google OAuth 세션(Code Assist)이
  OmniRoute를 대상으로 한 실행을 재정의하지 않으며, 종료 후 제거됩니다;
- **환경 변수 정리**: 하위 프로세스 환경에서 `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_GENAI_USE_GCA`를 제거합니다. 이러한
  변수는 인증을 Vertex/Code Assist로 리디렉션할 수 있습니다. 또한 이중
  안전장치로 `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`를 설정합니다. 다른
  `run` 대상에도 각각 충돌하는 변수에 대해 동일한 처리가 적용됩니다;
- `--provider`/`--model`에 따른 `--model <id>` 삽입.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini의 작업 공간 신뢰 보호 기능은 헤드리스 모드에서도 계속 적용됩니다.
직접 `--skip-trust`를 전달하거나 디렉터리를 대화형으로 신뢰해야 합니다.
런처는 의도적으로 이를 우회하지 않습니다. 이 런처는 **ACP 등록**
(`src/lib/acp/registry.ts`, `gemini --acp`)과 별개이며, ACP 등록은 계속해서
`/dashboard/acp-agents`용 에이전트 프로토콜 통합으로 사용됩니다.

---

## 실제 스모크 스윕(옵트인)

결정론적 실행 계획 회귀 테스트는 CI에서 실행됩니다(`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). 실제 OmniRoute 서버를 대상으로 실제 바이너리를
검증하기 위한 옵트인 하네스는 `tests/integration/upstream-cli-smoke.int.test.ts`에 있습니다.
이 하네스는 자동으로 실행되지 않으며(`RUN_CLI_SMOKE=1`이 아니면 모든 하위 테스트를 건너뜀),
자격 증명의 값이 아닌 환경 변수 이름을 전달하고, 기록된 모든 출력에서 키 형태의 문자열을
마스킹하며, 바이너리가 설치되지 않은 대상을 건너뛰고, 실패를 단순한 불리언 값 대신
인증 / 업스트림 / 구성으로 분류합니다.

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

선택 사항: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"`는 스윕 대상을 제한하며,
`OMNIROUTE_SMOKE_TIMEOUT_MS`는 대상별 기본 제한 시간인 120초를 재정의합니다.

---

## 함께 보기

- [Claude Code 구성](./CLAUDE-CODE-CONFIGURATION.md) — 더 자세한 Claude Code 가이드
- [Codex CLI 구성](./CODEX-CLI-CONFIGURATION.md) — 일회성 `[model_providers.omniroute]` 기본 설정
- [원격 모드](./REMOTE-MODE.md) — 컨텍스트, 범위가 지정된 액세스 토큰, 원격 서버 제어
- [CLI 도구 레퍼런스](../reference/CLI-TOOLS.md) — 지원되는 도구와 대시보드 페이지의 전체 목록
- [설정 가이드](./SETUP_GUIDE.md) — 설치 방법 및 최초 실행 온보딩
