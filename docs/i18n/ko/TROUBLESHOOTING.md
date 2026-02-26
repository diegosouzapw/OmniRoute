# 문제 해결

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

OmniRoute의 일반적인 문제 및 솔루션.

---

## 빠른 수정

| 문제                                | 솔루션                                                              |
| ----------------------------------- | ------------------------------------------------------------------- |
| 첫 번째 로그인이 작동하지 않습니다  | `.env`에서 `INITIAL_PASSWORD` 확인(기본값: `123456`)                |
| 대시보드가 ​​잘못된 포트에서 열림   | `PORT=20128` 및 `NEXT_PUBLIC_BASE_URL=http://localhost:20128` 설정  |
| `logs/` 아래에 요청 로그가 없습니다 | `ENABLE_REQUEST_LOGS=true` 설정                                     |
| EACCES: 권한이 거부되었습니다       | `DATA_DIR=/path/to/writable/dir`을 설정하여 `~/.omniroute`을 재정의 |
| 라우팅 전략이 저장되지 않음         | v1.4.11+로 업데이트(설정 지속성을 위한 Zod 스키마 수정)             |

---

## 공급자 문제

### "언어 모델이 메시지를 제공하지 않았습니다."

**원인:** 공급자 할당량이 소진되었습니다.

**수정:**

1. 대시보드 할당량 추적기를 확인하세요.
2. 대체 계층과 콤보 사용
3. 더 저렴한/무료 등급으로 전환

### 속도 제한

**원인:** 구독 할당량이 소진되었습니다.

**수정:**

- 대체 추가: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- GLM/MiniMax를 저렴한 백업으로 사용

### OAuth 토큰 만료됨

OmniRoute는 토큰을 자동으로 새로 고칩니다. 문제가 지속되는 경우:

1. 대시보드 → 공급자 → 재접속
2. 공급자 연결을 삭제하고 다시 추가

---

## 클라우드 문제

### 클라우드 동기화 오류

1. `BASE_URL`이 실행 중인 인스턴스(예: `http://localhost:20128`)를 가리키는지 확인합니다.
2. `CLOUD_URL`이 클라우드 엔드포인트(예: `https://omniroute.dev`)를 가리키는지 확인하세요.
3. `NEXT_PUBLIC_*` 값을 서버측 값에 맞춰 유지하세요.

### 클라우드 `stream=false` 500을 반환합니다.

**증상:** 비스트리밍 통화에 대한 클라우드 엔드포인트의 `Unexpected token 'd'...`.

**원인:** 업스트림은 클라이언트가 JSON을 기대하는 동안 SSE 페이로드를 반환합니다.

**해결 방법:** 클라우드 직접 호출에는 `stream=true`을 사용하세요. 로컬 런타임에는 SSE→JSON 대체가 포함됩니다.

### 클라우드가 연결되었지만 "잘못된 API 키"라고 표시됩니다.

1. 로컬 대시보드(`/api/keys`)에서 새로운 키를 생성합니다.
2. 클라우드 동기화 실행: 클라우드 활성화 → 지금 동기화
3. 이전/동기화되지 않은 키는 여전히 클라우드에서 `401`을 반환할 수 있습니다.

---

## 도커 문제

### CLI 도구가 설치되지 않은 것으로 표시됨

1. 런타임 필드 확인: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. 휴대용 모드의 경우: 이미지 대상 `runner-cli` 사용(번들 CLI)
3. 호스트 마운트 모드의 경우: `CLI_EXTRA_PATHS`을 설정하고 호스트 bin 디렉터리를 읽기 전용으로 마운트합니다.
4. `installed=true` 및 `runnable=false`인 경우: 바이너리가 발견되었지만 상태 확인에 실패했습니다.

### 빠른 런타임 검증

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## 비용 문제

### 높은 비용

1. 대시보드 → 사용량에서 사용량 현황을 확인하세요.
2. 기본 모델을 GLM/MiniMax로 전환
3. 중요하지 않은 작업에는 무료 계층(Gemini CLI, iFlow)을 사용합니다.
4. API 키별 비용 예산 설정: 대시보드 → API 키 → 예산

---

## 디버깅

### 요청 로그 활성화

`.env` 파일에 `ENABLE_REQUEST_LOGS=true`을 설정합니다. 로그는 `logs/` 디렉터리에 나타납니다.

### 제공자 상태 확인

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### 런타임 스토리지

- 기본 상태: `${DATA_DIR}/db.json`(공급자, 콤보, 별칭, 키, 설정)
- 사용법: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- 요청 로그: `<repo>/logs/...`(`ENABLE_REQUEST_LOGS=true`인 경우)

---

## 회로 차단기 문제

### 제공자가 OPEN 상태에서 멈췄습니다.

공급자의 회로 차단기가 OPEN되면 대기 시간이 만료될 때까지 요청이 차단됩니다.

**수정:**

1. **대시보드 → 설정 → 복원력**으로 이동합니다.
2. 영향을 받는 공급자의 회로 차단기 카드를 확인하십시오.
3. **모두 재설정**을 클릭하여 모든 차단기를 삭제하거나 쿨다운이 만료될 때까지 기다립니다.
4. 재설정하기 전에 공급자가 실제로 사용 가능한지 확인하십시오.

### 공급업체가 계속해서 회로 차단기를 작동시킵니다.

공급자가 반복적으로 OPEN 상태에 들어가는 경우:

1. **대시보드 → 상태 → 공급자 상태**에서 실패 패턴을 확인합니다.
2. **설정 → 탄력성 → 공급자 프로필**로 이동하여 실패 임계값을 높입니다.
3. 제공업체가 API 한도를 변경했는지 또는 재인증을 요구하는지 확인하세요.
4. 대기 시간 원격 분석 검토 - 대기 시간이 길면 시간 초과 기반 오류가 발생할 수 있습니다.

---

## 오디오 전사 문제

### "지원되지 않는 모델" 오류

- 올바른 접두사(`deepgram/nova-3` 또는 `assemblyai/best`)를 사용하고 있는지 확인하세요.
- **대시보드 → 공급자**에서 공급자가 연결되어 있는지 확인합니다.

### 전사가 비어 있거나 실패함을 반환합니다.

- 지원되는 오디오 형식 확인: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- 파일 크기가 공급자 제한(일반적으로 < 25MB) 내에 있는지 확인하세요.
- 공급자 카드에서 공급자 API 키 유효성을 확인하세요.

---

## 번역기 디버깅

**대시보드 → 번역기**를 사용하여 형식 번역 문제를 디버깅하세요.

| 모드              | 사용 시기                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **놀이터**        | 입력/출력 형식을 나란히 비교하세요. 실패한 요청을 붙여넣어 어떻게 변환되는지 확인하세요. |
| **채팅 테스터**   | 실시간 메시지 보내기 및 헤더를 포함한 전체 요청/응답 페이로드 검사                       |
| **테스트 벤치**   | 형식 조합 전반에 걸쳐 일괄 테스트를 실행하여 어떤 번역이 손상되었는지 확인               |
| **라이브 모니터** | 간헐적인 번역 문제를 파악하기 위해 실시간 요청 흐름을 시청하세요                         |

### 일반적인 형식 문제

- **Thinking 태그가 표시되지 않음** — 대상 공급자가 Thinking을 지원하는지 및 Thinking 예산 설정을 확인하세요.
- **도구 호출 중단** — 일부 형식 번역은 지원되지 않는 필드를 제거할 수 있습니다. 플레이그라운드 모드에서 확인
- **시스템 프롬프트 누락** — Claude와 Gemini는 시스템 프롬프트를 다르게 처리합니다. 번역 출력 확인
- **SDK는 객체 대신 원시 문자열을 반환** — v1.1.0에서 수정됨: 응답 새니타이저는 이제 OpenAI SDK Pydantic 검증 실패를 유발하는 비표준 필드(`x_groq`, `usage_breakdown` 등)를 제거합니다.
- **GLM/ERNIE는 `system` 역할을 거부합니다** — v1.1.0에서 수정됨: 역할 정규화 프로그램이 호환되지 않는 모델에 대한 시스템 메시지를 사용자 메시지에 자동으로 병합합니다.
- **`developer` 역할이 인식되지 않음** — v1.1.0에서 수정됨: OpenAI가 아닌 제공업체의 경우 자동으로 `system`로 변환됨
- **`json_schema`가 Gemini와 작동하지 않음** — v1.1.0에서 수정됨: `response_format`은 이제 Gemini의 `responseMimeType` + `responseSchema`로 변환됩니다.

---

## 복원력 설정

### 자동 비율 제한이 실행되지 않음

- 자동 비율 제한은 API 키 제공자에게만 적용됩니다(OAuth/구독 제외).
- **설정 → 탄력성 → 공급자 프로필**에 자동 속도 제한이 활성화되어 있는지 확인하세요.
- 공급자가 `429` 상태 코드 또는 `Retry-After` 헤더를 반환하는지 확인하세요.

### 지수 백오프 조정

공급자 프로필은 다음 설정을 지원합니다.

- **기본 지연** — 첫 번째 실패 후 초기 대기 시간(기본값: 1초)
- **최대 지연** — 최대 대기 시간 한도(기본값: 30초)
- **승수** — 연속 실패당 지연을 늘리는 정도(기본값: 2x)

### 천둥 방지 무리

많은 동시 요청이 속도 제한 공급자에 도달하면 OmniRoute는 뮤텍스와 자동 속도 제한을 사용하여 요청을 직렬화하고 계단식 오류를 방지합니다. API 키 제공자의 경우 이는 자동입니다.

---

## 아직도 막혔나요?

- **GitHub 문제**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **아키텍처**: 내부 세부정보는 [link](ARCHITECTURE.md)을 참조하세요.
- **API 참조**: 모든 엔드포인트에 대해서는 [link](API_REFERENCE.md)을 참조하세요.
- **헬스 대시보드**: **대시보드 → 헬스**에서 실시간 시스템 상태 확인
- **번역기**: **대시보드 → 번역기**를 사용하여 형식 문제 디버깅
