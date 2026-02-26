# API 참조

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

모든 OmniRoute API 엔드포인트에 대한 전체 참조입니다.

---

## 목차

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## 채팅 완료

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### 사용자 정의 헤더

| 헤더                     | 방향 | 설명                                |
| ------------------------ | ---- | ----------------------------------- |
| `X-OmniRoute-No-Cache`   | 요청 | 캐시를 우회하려면 `true`로 설정     |
| `X-OmniRoute-Progress`   | 요청 | 진행 이벤트의 경우 `true`으로 설정  |
| `Idempotency-Key`        | 요청 | 중복 제거 키(5초 창)                |
| `X-Request-Id`           | 요청 | 대체 중복 제거 키                   |
| `X-OmniRoute-Cache`      | 응답 | `HIT` 또는 `MISS`(비스트리밍)       |
| `X-OmniRoute-Idempotent` | 응답 | 중복이 제거된 경우 `true`           |
| `X-OmniRoute-Progress`   | 응답 | `enabled` 진행 상황을 추적하는 경우 |

---

## 임베딩

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

사용 가능한 공급자: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## 이미지 생성

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

사용 가능한 제공업체: OpenAI(DALL-E), xAI(Grok Image), Together AI(FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## 모델 목록

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## 호환성 끝점

| 방법   | 경로                        | 형식                    |
| ------ | --------------------------- | ----------------------- |
| 포스트 | `/v1/chat/completions`      | 오픈AI                  |
| 포스트 | `/v1/messages`              | 인류학                  |
| 포스트 | `/v1/responses`             | OpenAI 응답             |
| 포스트 | `/v1/embeddings`            | 오픈AI                  |
| 포스트 | `/v1/images/generations`    | 오픈AI                  |
| 받기   | `/v1/models`                | 오픈AI                  |
| 포스트 | `/v1/messages/count_tokens` | 인류학                  |
| 받기   | `/v1beta/models`            | 쌍둥이자리              |
| 포스트 | `/v1beta/models/{...path}`  | 쌍둥이 자리 생성 콘텐츠 |
| 포스트 | `/v1/api/chat`              | 올라마                  |

### 전용 공급자 경로

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

공급자 접두사가 누락된 경우 자동으로 추가됩니다. 일치하지 않는 모델은 `400`을 반환합니다.

---

## 시맨틱 캐시

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

응답 예:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## 대시보드 및 관리

### 인증

| 엔드포인트                    | 방법          | 설명             |
| ----------------------------- | ------------- | ---------------- |
| `/api/auth/login`             | 포스트        | 로그인           |
| `/api/auth/logout`            | 포스트        | 로그아웃         |
| `/api/settings/require-login` | 가져오기/넣기 | 토글 로그인 필요 |

### 공급자 관리

| 엔드포인트                   | 방법               | 설명               |
| ---------------------------- | ------------------ | ------------------ |
| `/api/providers`             | 받기/게시          | 공급자 목록/생성   |
| `/api/providers/[id]`        | 가져오기/넣기/삭제 | 공급자 관리        |
| `/api/providers/[id]/test`   | 포스트             | 테스트 공급자 연결 |
| `/api/providers/[id]/models` | 받기               | 공급자 모델 나열   |
| `/api/providers/validate`    | 포스트             | 공급자 구성 확인   |
| `/api/provider-nodes*`       | 다양한             | 공급자 노드 관리   |
| `/api/provider-models`       | 가져오기/게시/삭제 | 맞춤형 모델        |

### OAuth 흐름

| 엔드포인트                       | 방법   | 설명           |
| -------------------------------- | ------ | -------------- |
| `/api/oauth/[provider]/[action]` | 다양한 | 공급자별 OAuth |

### 라우팅 및 구성

| 엔드포인트            | 방법      | 설명                      |
| --------------------- | --------- | ------------------------- |
| `/api/models/alias`   | 받기/게시 | 모델 별칭                 |
| `/api/models/catalog` | 받기      | 공급자 + 유형별 모든 모델 |
| `/api/combos*`        | 다양한    | 콤보 관리                 |
| `/api/keys*`          | 다양한    | API 키 관리               |
| `/api/pricing`        | 받기      | 모델 가격                 |

### 사용 및 분석

| 엔드포인트                  | 방법 | 설명           |
| --------------------------- | ---- | -------------- |
| `/api/usage/history`        | 받기 | 이용내역       |
| `/api/usage/logs`           | 받기 | 사용 로그      |
| `/api/usage/request-logs`   | 받기 | 요청 수준 로그 |
| `/api/usage/[connectionId]` | 받기 | 연결별 사용량  |

### 설정

| 엔드포인트                      | 방법          | 설명                   |
| ------------------------------- | ------------- | ---------------------- |
| `/api/settings`                 | 가져오기/넣기 | 일반 설정              |
| `/api/settings/proxy`           | 가져오기/넣기 | 네트워크 프록시 구성   |
| `/api/settings/proxy/test`      | 포스트        | 프록시 연결 테스트     |
| `/api/settings/ip-filter`       | 가져오기/넣기 | IP 허용 목록/차단 목록 |
| `/api/settings/thinking-budget` | 가져오기/넣기 | 토큰 예산 추론         |
| `/api/settings/system-prompt`   | 가져오기/넣기 | 글로벌 시스템 프롬프트 |

### 모니터링

| 엔드포인트               | 방법          | 설명               |
| ------------------------ | ------------- | ------------------ |
| `/api/sessions`          | 받기          | 활성 세션 추적     |
| `/api/rate-limits`       | 받기          | 계정당 비율 제한   |
| `/api/monitoring/health` | 받기          | 건강검진           |
| `/api/cache`             | 가져오기/삭제 | 캐시 통계 / 지우기 |

### 백업 및 내보내기/가져오기

| 엔드포인트                  | 방법   | 설명                                      |
| --------------------------- | ------ | ----------------------------------------- |
| `/api/db-backups`           | 받기   | 사용 가능한 백업 나열                     |
| `/api/db-backups`           | 넣어   | 수동 백업 생성                            |
| `/api/db-backups`           | 포스트 | 특정 백업에서 복원                        |
| `/api/db-backups/export`    | 받기   | 데이터베이스를 .sqlite 파일로 다운로드    |
| `/api/db-backups/import`    | 포스트 | 데이터베이스를 대체할 .sqlite 파일 업로드 |
| `/api/db-backups/exportAll` | 받기   | 전체 백업을 .tar.gz 아카이브로 다운로드   |

### 클라우드 동기화

| 엔드포인트             | 방법   | 설명                 |
| ---------------------- | ------ | -------------------- |
| `/api/sync/cloud`      | 다양한 | 클라우드 동기화 작업 |
| `/api/sync/initialize` | 포스트 | 동기화 초기화        |
| `/api/cloud/*`         | 다양한 | 클라우드 관리        |

### CLI 도구

| 엔드포인트                         | 방법 | 설명              |
| ---------------------------------- | ---- | ----------------- |
| `/api/cli-tools/claude-settings`   | 받기 | 클로드 CLI 상태   |
| `/api/cli-tools/codex-settings`    | 받기 | 코덱스 CLI 상태   |
| `/api/cli-tools/droid-settings`    | 받기 | 드로이드 CLI 상태 |
| `/api/cli-tools/openclaw-settings` | 받기 | OpenClaw CLI 상태 |
| `/api/cli-tools/runtime/[toolId]`  | 받기 | 일반 CLI 런타임   |

CLI 응답에는 `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`이 포함됩니다.

### 복원력 및 속도 제한

| 엔드포인트              | 방법          | 설명                            |
| ----------------------- | ------------- | ------------------------------- |
| `/api/resilience`       | 가져오기/넣기 | 탄력성 프로필 가져오기/업데이트 |
| `/api/resilience/reset` | 포스트        | 회로 차단기 재설정              |
| `/api/rate-limits`      | 받기          | 계정별 비율한도 현황            |
| `/api/rate-limit`       | 받기          | 글로벌 비율 제한 구성           |

### 평가

| 엔드포인트   | 방법      | 설명                       |
| ------------ | --------- | -------------------------- |
| `/api/evals` | 받기/게시 | 평가 제품군 나열/평가 실행 |

### 정책

| 엔드포인트      | 방법               | 설명             |
| --------------- | ------------------ | ---------------- |
| `/api/policies` | 가져오기/게시/삭제 | 라우팅 정책 관리 |

### 규정 준수

| 엔드포인트                  | 방법 | 설명                          |
| --------------------------- | ---- | ----------------------------- |
| `/api/compliance/audit-log` | 받기 | 규정 준수 감사 로그(마지막 N) |

### v1beta(Gemini 호환)

| 엔드포인트                 | 방법   | 설명                                    |
| -------------------------- | ------ | --------------------------------------- |
| `/v1beta/models`           | 받기   | Gemini 형식으로 모델 나열               |
| `/v1beta/models/{...path}` | 포스트 | 쌍둥이자리 `generateContent` 엔드포인트 |

이러한 엔드포인트는 기본 Gemini SDK 호환성을 기대하는 클라이언트를 위한 Gemini의 API 형식을 미러링합니다.

### 내부/시스템 API

| 엔드포인트      | 방법   | 설명                                      |
| --------------- | ------ | ----------------------------------------- |
| `/api/init`     | 받기   | 애플리케이션 초기화 확인(첫 실행 시 사용) |
| `/api/tags`     | 받기   | Ollama 호환 모델 태그(Ollama 고객용)      |
| `/api/restart`  | 포스트 | 정상적인 서버 다시 시작 트리거            |
| `/api/shutdown` | 포스트 | 정상적인 서버 종료 트리거                 |

> **참고:** 이러한 끝점은 시스템 내부적으로 또는 Ollama 클라이언트 호환성을 위해 사용됩니다. 일반적으로 최종 사용자는 호출하지 않습니다.

---

## 오디오 전사

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Deepgram 또는 AssemblyAI를 사용하여 오디오 파일을 녹음합니다.

**요청:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**응답:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**지원되는 제공업체:** `deepgram/nova-3`, `assemblyai/best`.

**지원되는 형식:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## 올라마 호환성

Ollama의 API 형식을 사용하는 클라이언트의 경우:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

요청은 Ollama와 내부 형식 간에 자동으로 번역됩니다.

---

## 원격 측정

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**응답:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## 예산

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## 모델 가용성

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## 요청 처리

1. 클라이언트는 `/v1/*`에 요청을 보냅니다.
2. 경로 핸들러 호출 `handleChat`, `handleEmbedding`, `handleAudioTranscription` 또는 `handleImageGeneration`
3. 모델이 해결되었습니다(직접 공급자/모델 또는 별칭/콤보).
4. 계정 가용성 필터링을 통해 로컬 DB에서 자격 증명을 선택합니다.
5. 채팅의 경우: `handleChatCore` — 형식 감지, 번역, 캐시 확인, 멱등성 확인
6. 공급자 실행자가 업스트림 요청을 보냅니다.
7. 응답은 클라이언트 형식(채팅)으로 다시 변환되거나 있는 그대로 반환됩니다(임베딩/이미지/오디오).
8. 사용/로깅 기록
9. 콤보 규칙에 따라 오류 발생 시 Fallback 적용

전체 아키텍처 참조: [link](ARCHITECTURE.md)

---

## 인증

- 대시보드 경로(`/dashboard/*`)는 `auth_token` 쿠키를 사용합니다.
- 로그인은 저장된 비밀번호 해시를 사용합니다. `INITIAL_PASSWORD`로 대체
- `requireLogin`은 `/api/settings/require-login`을 통해 전환 가능
- `/v1/*` 경로에는 `REQUIRE_API_KEY=true`인 경우 선택적으로 Bearer API 키가 필요합니다.
