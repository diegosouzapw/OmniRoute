# Devin Claude Bridge (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic`을 사용하면 실제 Claude Code 런타임이 OmniRoute의 로컬 Anthropic
Messages 엔드포인트를 사용하는 동시에 공식 Devin CLI가 ACP stdio를 통해 모델 응답을
제공할 수 있습니다. 기존 Anthropic, Claude OAuth, Claude Web 또는 `devin-cli` 공급자는
수정하지 않습니다.

> **현재 상태: Claude Code `2.1.258`에 고정됨. 오프라인 및 라이브 검증은 마지막으로
> `2.1.220`에서 기록되었습니다.** `2.1.220` 고정 버전은 Devin CLI `3000.2.17` 및 모델
> `swe-1-7-lightning`을 통해 격리된 세 가지 시나리오를 완료했습니다. 해당 최종 라이브
> 실행에서는 클라이언트가 소유한 `Read`, `Edit`, `Bash` 턴, 성공적인 `npm test` 결과,
> 프로젝트 명령 및 스킬 검색, Devin 전용 라우팅, Claude로의 송신이 전혀 없음을
> 입증했습니다. 이후 고정 버전은 `2.1.258`로 상향되었습니다. 이 버전은 OmniRoute의
> Claude ID가 가장하는 CLI 세대이자 Fable 5.1 티어를 네이티브로 제공하는 최초
> 버전입니다. 새 고정 버전에서는 고정된 기본 이미지에서 설치 계층과
> `claude --version`을 검증했으며, 브리지 단위 테스트 모음, `compose config`, 정적
> 격리 증명이 통과했습니다. 하지만 오프라인 모의 시나리오와 라이브 세 가지 시나리오
> 테스트 모음은 아직 다시 실행되지 않았습니다. 이 고정 버전에서 브리지를 신뢰하기
> 전에 해당 테스트를 다시 실행하십시오("고정된 도구 업데이트" 참조).

## 아키텍처

```text
Claude Code 2.1.258 (격리된 비루트 Linux 컨테이너)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (Claude 형식, 인증 없는 공급자)
  -> devin acp --agent-type summarizer (공식 ACP stdio, Devin 도구 없음)
  -> 전용 devin-auth 볼륨의 Devin 계정
```

공식 CLI의 기본 ACP 에이전트는 자체 도구를 실행할 수 있으므로 이 브리지는 해당
에이전트를 사용하지 않습니다. 대신 공식 CLI 모드에서 도구가 없는 고정
`summarizer` ACP 에이전트를 시작하고, 직렬화된 Anthropic 요청을 실행 추적으로
구성합니다. Claude가 소유한 다른 작업이 필요한 경우 응답에는 정확히 하나의 클라이언트
도구 봉투가 포함되어야 합니다. 응답을 성공으로 보고하기 전에 모든 ACP `tool_call`
또는 `tool_call_update`가 거부됩니다.

`open-sse/executors/devin-agentic/serializer.ts`의 직렬 변환기는 Claude Code가 제공한
`system`, `text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`,
`tool_choice` 및 도구를 보존합니다. 이미지와 알 수 없는 블록은 명시적으로 실패합니다.
크기가 큰 도구 결과에는 눈에 보이는 잘림 표시가 사용됩니다.

파서는 모델 턴마다 독립된 `<tool>{...}</tool>` 봉투 하나를 허용합니다. 요청의 도구
목록과 대조하여 이름을 확인하고, 해당 도구의 JSON Schema에 따라 인수를 검증하며,
서술과 작업이 혼합된 응답을 거부하고, 제한된 복구 시도를 한 번 허용합니다. 그런 다음
Claude Code는 생성된 Anthropic `tool_use`를 로컬에서 실행하고 `tool_result`를
OmniRoute를 통해 다시 전송합니다.

## 격리 및 위협 모델

호스트의 Claude 설치, 계정 및 구성은 범위에서 제외되며 접근이 금지된 것으로
간주합니다. Compose 서비스는 다음과 같이 구성됩니다.

- UID/GID `10001:10001`로 실행되며, 읽기 전용 루트 파일 시스템과 제거된
  capability, `no-new-privileges`를 사용합니다.
- 비공개 `/home/bridge`, 전용 Claude 구성 볼륨, 격리된 OmniRoute 데이터 및 별도의
  `devin-auth` 볼륨을 사용합니다.
- 일회용 `.sandbox` 작업 공간/증거만 마운트합니다.
- 호스트 홈, Keychain, SSH, 클라우드 자격 증명 또는 Docker 소켓을 마운트하지
  않습니다.
- 명시적인 환경을 구성하고 Anthropic API/OAuth/라우팅 변수를 제거합니다.
- 로컬 전용 키를 사용하여 Claude Code 추론을 `http://omniroute:20128`로만
  전달합니다.

오프라인 프로필은 내부 네트워크를 사용합니다. 라이브 프로필에서 OmniRoute는
`network-guard`를 통해서만 공식 Devin 엔드포인트에 접근할 수 있으며, 관련 없는
대상은 거부됩니다. Claude Code에는 별도의 모든 송신 차단 가드가 적용되며,
`NO_PROXY`를 통해 로컬 OmniRoute 서비스에만 접근할 수 있습니다. 가드 감사 파일은
해당 가드 프로세스에서만 마운트됩니다. 스크립트는 토큰이 제거된 증거를 내보내기 전에
파일 소유권, 모드, 링크 수 및 모든 결정을 검증합니다.

격리 증명을 독립적으로 실행하십시오.

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

이 스크립트는 토폴로지, 명명된 마운트, 비루트/읽기 전용 설정, 명시적인 로컬 라우팅,
민감한 환경 변수의 부재, Docker 소켓의 부재, `api.anthropic.com` 및 `claude.ai`에
대한 접근 차단, Devin 전용 공급자 선택, ACP 백엔드를 사용할 수 없을 때의 명시적인
실패를 검증합니다.

## 최초 설정 및 일반적인 사용

고정된 이미지를 빌드합니다:

```bash
./scripts/devin-bridge/build
```

격리된 Devin 볼륨만 인증합니다:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

로그인 명령은 원격/컨테이너 환경을 위한 공식 수동 토큰 흐름을 사용합니다. 값은 CLI 프롬프트에 직접 입력되며, 프로세스 인수로 전달되거나 Git에 기록되거나 호스트에서 복사되지 않습니다.

격리된 Claude Code 런타임을 실행합니다:

```bash
./scripts/devin-bridge/launch
```

`launch`는 컨테이너화된 Claude Code를 시작하기 전에 격리, Devin 인증 및 모델 검색을 다시 확인합니다. 호스트의 Claude 실행 파일은 절대 실행하지 않습니다. 모델 별칭은 `.env.devin-bridge`에서 설정할 수 있으며, 구성된 모든 값은 `devin-cli-agentic/` 접두사를 유지해야 합니다.

## 검증 명령

재현 가능한 오프라인 경로에는 Devin 계정이 필요하지 않으며 런타임 인터넷 연결도 사용하지 않습니다:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

인증이 필요한 선택적 라이브 경로는 다음과 같습니다:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

라이브 러너는 ACP 세션이 한꺼번에 열리는 것을 방지하기 위해 시나리오 사이에 대기하며, 텍스트로 된 주장을 신뢰하는 대신 구조화된 Claude 스트림 이벤트를 검증합니다. 다음 세 가지 시나리오를 통해 이를 입증합니다:

1. 프로젝트 직접 읽기 및 결함 분석;
2. 실제 `Edit`, 클라이언트 소유의 `Bash` `npm test`, 그리고 터미널 결과;
3. `/bridge-check` 및 `bridge-proof` 검색, 프로젝트 읽기, 클라이언트 소유의 또 다른 성공적인 `npm test`, 그리고 보류 중인 작업 없이 완료.

최종 게이트는 Devin 네트워크 감사도 확인하며 Claude 송신 감사가 비어 있어야 합니다.

## 고정된 도구 업데이트

이미지는 `docker/devin-bridge/Dockerfile`에 Node, Claude Code 및 Devin CLI 버전을 고정합니다. 업데이트하려면:

1. 명시된 버전을 변경합니다;
2. 아키텍처별 Devin 아카이브 체크섬 두 개를 공식 아티팩트의 값으로 교체합니다;
3. 이미지를 다시 빌드하고 모든 오프라인 검증 명령을 실행합니다;
4. 이미지 내부의 버전을 확인합니다;
5. 인증된 세 가지 시나리오의 라이브 제품군을 다시 실행합니다.

어느 CLI도 호스트에 전역으로 설치하지 말고, 체크섬 검증을 검증되지 않은 다운로드로 대체하지 마십시오.

## 진단 및 정리

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  는 로컬 라우팅 및 민감 정보가 제거된 실행기 오류를 표시합니다.
- `.sandbox/evidence/mock-acp.jsonl`은 결정론적 모의 ACP 작업을 기록합니다.
- `.sandbox/evidence/claude-stream.jsonl`은 실제 Claude Code 오프라인 실행을 기록합니다.
- `.sandbox/evidence/live-*.jsonl`은 검증된 세 가지 라이브 스트림을 기록합니다.
- `.sandbox/evidence/egress.jsonl` 및 `.sandbox/evidence/claude-egress.jsonl`은 검증된 토큰 없는 가드 감사 사본입니다.

로그인/구성 볼륨은 보존하면서 소유된 컨테이너와 네트워크를 중지합니다:

```bash
./scripts/devin-bridge/clean
```

명명된 볼륨을 포함하여 브리지가 소유한 전체 환경을 제거합니다:

```bash
./scripts/devin-bridge/clean --all
```

## 제한 사항

- 브리지는 고정된 도구 미사용 `summarizer` 역할에 의존합니다. 이는 Devin CLI `3000.2.17`이 중립적인 도구 미사용 ACP 에이전트를 제공하지 않기 때문입니다. 어댑터는 요약 형태의 중간 응답을 보정하지만, 제한된 1회의 복구 시도도 명시적으로 실패할 수 있습니다.
- 실시간 ACP 호출은 일시적인 `502`/`504` 응답을 반환할 수 있습니다. 하네스는 시나리오 사이에 간격을 두지만, 장애가 지속되면 폐쇄적으로 실패하며 다른 제공자를 선택하지 않습니다.
- ACP 컨텍스트는 각 Anthropic 요청에서 재구성되며, 프로세스/세션 선호성은 없습니다.
- 모델 응답당 하나의 도구 호출만 지원되며, 병렬 호출은 거부됩니다.
- 이미지는 명시적으로 지원되지 않습니다. 비전, 사고 출력, 노력 수준 제어 및 1M 컨텍스트 창은 지원 기능으로 명시되지 않습니다.
- SSE는 유효한 Anthropic 수명 주기 이벤트를 사용하지만, 제한된 ACP 턴이 수집된 후에 방출됩니다. ACP 청크는 점진적으로 전달되지 않습니다.
