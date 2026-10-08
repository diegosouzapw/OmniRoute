# 🌐 OmniRoute Proxy Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **지리적 차단을 우회하고, 신원을 보호하며, 구성의 복잡성 없이 모든 프록시를 통해 AI 트래픽을 라우팅하세요.**

OmniRoute에는 업스트림 AI 제공업체 트래픽을 HTTP, HTTPS 또는 SOCKS5 프록시를 통해 라우팅할 수 있는 완전한 기능의 프록시 관리 시스템이 포함되어 있습니다. 차단된 지역에 있거나, IP 순환이 필요하거나, 은밀한 핑거프린팅을 원하는 경우 등 이 가이드에서 모든 내용을 다룹니다.

---

## 목차

- [프록시를 사용하는 이유](#why-use-proxies)
- [아키텍처 개요](#architecture-overview)
- [4단계 프록시 시스템](#4-level-proxy-system)
- [프록시 레지스트리(CRUD)](#proxy-registry-crud)
- [1proxy 무료 마켓플레이스](#1proxy-free-proxy-marketplace)
- [프록시 순환](#proxy-rotation)
- [탐지 방지 및 스텔스](#anti-detection--stealth)
- [업스트림 프록시 모드](#upstream-proxy-modes)
- [대시보드 UI](#dashboard-ui)
- [API 참조](#api-reference)
- [환경 변수](#environment-variables)
- [문제 해결](#troubleshooting)

---

## 프록시를 사용하는 이유

많은 AI 제공업체는 지리적 지역에 따라 액세스를 제한합니다. **러시아, 중국, 이란, 쿠바, 튀르키예** 및 기타 국가의 개발자는 다음과 같은 오류를 겪습니다.

```
unsupported_country_region_territory
```

차단된 지역이 아니더라도 프록시는 다음과 같은 용도로 유용합니다.

| 사용 사례            | 설명                                                       |
| -------------------- | ---------------------------------------------------------- |
| **지리적 차단 우회** | 차단된 국가에서 OpenAI, Anthropic, Codex, Copilot에 액세스 |
| **IP 순환**          | 속도 제한을 방지하도록 여러 IP에 요청을 분산               |
| **개인정보 보호**    | 업스트림 제공업체로부터 실제 IP를 숨김                     |
| **규정 준수**        | 특정 관할권을 통해 트래픽을 라우팅                         |
| **테스트**           | 서로 다른 지역에서 발생한 요청을 시뮬레이션                |

---

## 아키텍처 개요

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute 서버                          │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 프록시      │    │ 프록시       │    │ 프록시           │  │
│  │ 레지스트리  │───▶│ 디스패처     │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (캐시됨)     │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy 동기화│                        │ 업스트림         │  │
│  │ (무료 풀)   │                        │ 제공업체 API     │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### 주요 구성 요소

| 구성 요소             | 파일                                         | 역할                                                    |
| --------------------- | -------------------------------------------- | ------------------------------------------------------- |
| **프록시 레지스트리** | `src/lib/db/proxies.ts`                      | 프록시 항목 및 범위 할당을 위한 CRUD                    |
| **프록시 디스패처**   | `open-sse/utils/proxyDispatcher.ts`          | 캐싱을 사용하여 `undici` ProxyAgent/SOCKS 디스패처 생성 |
| **프록시 Fetch**      | `open-sse/utils/proxyFetch.ts`               | 프록시 디스패처를 주입하여 `fetch()` 래핑               |
| **설정 라우트**       | `src/app/api/settings/proxy/route.ts`        | 레거시 프록시 구성 API(GET/PUT/DELETE)                  |
| **관리 라우트**       | `src/app/api/v1/management/proxies/route.ts` | 레지스트리 CRUD API(GET/POST/PATCH/DELETE)              |
| **1proxy DB**         | `src/lib/db/oneproxy.ts`                     | 무료 프록시 마켓플레이스 영속성                         |

---

## 4단계 프록시 시스템

OmniRoute는 **서로 독립적인 네 가지 범위**에서 프록시 구성을 지원하며, 우선순위에 따라 결정됩니다.

```
우선순위 결정 순서(높음 → 낮음):

  1. 🔵 계정/연결 프록시         →  API 키/OAuth 연결별
  2. 🟡 제공자 프록시            →  제공자별(예: 모든 OpenAI 트래픽)
  3. 🟠 콤보 프록시              →  콤보/라우팅 구성별
  4. 🟢 전역 프록시              →  모든 트래픽, 모든 제공자
```

### 결정 방식

OmniRoute가 업스트림 제공자에 요청을 보낼 때 `resolveProxyForConnectionFromRegistry()`를 호출하여 각 단계를 순서대로 확인합니다.

1. **계정 수준** — 이 특정 연결 ID에 할당된 프록시가 있는가?
2. **제공자 수준** — 이 제공자(예: `openai`)에 할당된 프록시가 있는가?
3. **전역 수준** — 구성된 전역 프록시가 있는가?
4. **프록시 없음** — 제공자에 직접 연결합니다.

가장 먼저 일치하는 항목이 사용됩니다. 따라서 전역 프록시를 대체 수단으로 설정하면서 특정 제공자나 연결에 대해 재정의할 수 있습니다.

### 프록시를 거치는 항목

| 트래픽 유형     | 프록시 사용 여부 | 참고                                        |
| --------------- | ---------------- | ------------------------------------------- |
| 채팅 완성       | ✅               | 모든 `/v1/chat/completions` 요청            |
| 임베딩          | ✅               | `/v1/embeddings`                            |
| 이미지 생성     | ✅               | `/v1/images/generations`                    |
| 오디오(TTS/STT) | ✅               | `/v1/audio/*`                               |
| OAuth 토큰 교환 | ✅               | `unsupported_country_region_territory` 해결 |
| 연결 테스트     | ✅               | "연결 테스트" 버튼에서 프록시 사용          |
| 토큰 갱신       | ✅               | 백그라운드 OAuth 갱신                       |
| 모델 동기화     | ✅               | 모델 목록 조회 및 검색                      |

---

## 프록시 레지스트리(CRUD)

프록시 레지스트리는 모든 프록시를 저장하는 SQLite 테이블(`proxy_registry`)입니다. 각 프록시에는 다음 필드가 있습니다.

| 필드       | 유형   | 설명                                |
| ---------- | ------ | ----------------------------------- |
| `id`       | UUID   | 고유 식별자                         |
| `name`     | 문자열 | 사람이 읽을 수 있는 레이블          |
| `type`     | 문자열 | 프로토콜: `http`, `https`, `socks5` |
| `host`     | 문자열 | 프록시 호스트 이름 또는 IP          |
| `port`     | 정수   | 포트 번호                           |
| `username` | 문자열 | 인증 사용자 이름(저장 시 암호화)    |
| `password` | 문자열 | 인증 비밀번호(저장 시 암호화)       |
| `region`   | 문자열 | 지리적 지역 레이블                  |
| `notes`    | 문자열 | 자유 형식 메모                      |
| `status`   | 문자열 | `active` 또는 `inactive`            |
| `source`   | 문자열 | `manual` 또는 `oneproxy`            |

### 프록시 생성

**대시보드에서:**

1. **설정 → 프록시**로 이동합니다.
2. **프록시 추가**를 클릭합니다.
3. 유형, 호스트, 포트 및 선택적 인증 자격 증명을 입력합니다.
4. 저장합니다.

**API에서:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### 프록시 업데이트

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **참고:** 비어 있지 않은 대체 값을 명시적으로 보내지 않는 한 자격 증명은 유지됩니다. `username`/`password`에 빈 문자열을 보내면 저장된 값이 유지됩니다.

### 프록시 삭제

```bash
# 프록시가 어떤 범위에든 할당되어 있으면 실패
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# 강제 삭제(할당도 함께 제거)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### 프록시 목록 조회

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### 범위에 프록시 할당

```bash
# 전역 범위에 할당
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# 특정 제공자에 할당
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# 특정 연결/키에 할당
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### 유효 프록시 결정

주어진 연결에 어떤 프록시가 사용되는지 확인합니다.

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

결정된 프록시를 해당 수준(`account`, `provider` 또는 `global`) 및 소스와 함께 반환합니다.

### 일괄 할당

하나의 프록시를 여러 제공자 또는 연결에 한 번에 할당합니다.

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### 가져오기/내보내기

프록시는 **백업/복원** 시스템에 포함됩니다. OmniRoute 구성을 내보낼 때는 다음 단계를 따릅니다.

1. **대시보드 → 설정 → 백업**으로 이동합니다.
2. **내보내기**를 클릭합니다. 프록시 레지스트리와 할당이 포함됩니다.
3. 복원하려면 **가져오기**를 클릭하고 백업 파일을 업로드합니다.

프록시 레지스트리는 **host+port 기준 upsert**도 지원합니다. 이미 존재하는 프록시(호스트와 포트가 동일함)를 가져오면 중복 항목을 생성하는 대신 기존 항목을 업데이트합니다.

### 레거시 마이그레이션

이전 버전(레지스트리 도입 전)에서 프록시를 구성한 경우 OmniRoute가 해당 프록시를 자동으로 마이그레이션합니다.

```
레거시 key_value 저장소 → proxy_registry + proxy_assignments
```

업그레이드 후 처음 시작할 때 한 번 실행됩니다. 다시 실행하려면 `migrateLegacyProxyConfigToRegistry({ force: true })`를 사용하세요.

---

## 1proxy 무료 프록시 마켓플레이스

> 🆕 **[@oyi77](https://github.com/oyi77) 기여** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (이슈 [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute는 **[1proxy](https://1proxy-api.aitradepulse.com)** 커뮤니티 플랫폼과 통합되어 전 세계의 **검증된 무료 프록시 수백 개**에 대한 액세스를 제공합니다. 자체 프록시 인프라가 없는 사용자에게 적합합니다.

### 작동 방식

```
┌─────────────┐     동기화     ┌─────────────────┐    순환       ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ 제공자    │
│    (외부)    │  최대 500개   │  source=oneproxy │  품질 기준    │   API    │
└─────────────┘    프록시      └─────────────────┘               └──────────┘
```

1. **동기화** — OmniRoute가 1proxy API에서 검증된 프록시를 가져옵니다
2. **저장** — 프록시는 동일한 `proxy_registry` 테이블에 `source = 'oneproxy'`로 저장됩니다
3. **필터링** — 프로토콜, 국가, 품질 점수별로 필터링합니다
4. **순환** — 품질, 무작위 또는 순차 전략을 사용하여 최적의 프록시를 선택합니다
5. **자동 성능 저하 처리** — 실패한 프록시는 품질 점수가 감소하며, 임계값 미만이 되면 → 비활성 상태로 표시됩니다

### 프록시 동기화

**대시보드에서:**

1. **Settings → 1proxy** 탭으로 이동합니다
2. **"Sync Now"**를 클릭합니다
3. 전체 프록시 수, 활성 프록시 수, 평균 품질, 국가별 분석 등 통계를 확인합니다

**API를 통해:**

```bash
# 동기화 실행
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# 응답:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### 프록시 필터링

```bash
# 프로토콜별 필터링
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# 국가별 필터링
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# 최소 품질 점수별 필터링
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# 필터 조합
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### 프록시 품질 점수

각 1proxy 프록시에는 다음과 같은 메타데이터가 포함됩니다:

| 필드            | 설명                                    |
| --------------- | --------------------------------------- |
| `qualityScore`  | 1proxy 검증에서 부여된 0-100점 평점     |
| `latencyMs`     | 측정된 네트워크 지연 시간               |
| `anonymity`     | `transparent`, `anonymous` 또는 `elite` |
| `googleAccess`  | 프록시의 Google 서비스 액세스 가능 여부 |
| `countryCode`   | 두 글자로 된 ISO 국가 코드              |
| `lastValidated` | 마지막 검증 타임스탬프                  |

품질 점수는 동적으로 조정됩니다:

- **실패한 요청**은 점수를 10점 감소시킵니다
- **점수가 ≤10으로 감소** → 프록시가 `inactive`로 표시됩니다
- 비활성 프록시는 순환 대상에서 제외됩니다

### 순환 전략

```bash
# 품질별 순환(최상의 프록시 우선) — 기본값
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# 무작위 순환
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# 순차 순환(가장 오래전에 검증된 프록시 우선)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### 서킷 브레이커

1proxy 동기화에는 서킷 브레이커가 내장되어 있습니다:

- **동기화가 5회 연속 실패**하면 이후의 동기화 시도가 차단됩니다
- `resetOneproxyCircuitBreaker()`를 사용하거나 서버를 재시작하여 초기화합니다
- 동기화 상태는 `GET /api/settings/oneproxy?action=status`에서 확인할 수 있습니다

### 1proxy 프록시 삭제

```bash
# 단일 1proxy 프록시 삭제
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# 모든 1proxy 프록시 삭제(수동 프록시는 그대로 유지됨)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## 탐지 방지 및 스텔스

OmniRoute는 단순히 프록시를 통해 트래픽을 라우팅하는 데 그치지 않고, 트래픽이 정상적인 요청처럼 보이도록 만듭니다.

### TLS 핑거프린트 스푸핑

`wreq-js`를 사용하여 브라우저와 유사한 TLS 핑거프린트를 생성함으로써, 브라우저가 아닌 TLS 핸드셰이크를 탐지하는 봇 감지 시스템을 우회합니다.

### CLI 핑거프린트 일치

**CLI 핑거프린트 토글**(`설정 → 보안`)은 네이티브 CLI 바이너리(Claude Code, Codex 등)의 정확한 시그니처와 일치하도록 HTTP 헤더와 JSON 본문 필드의 순서를 재정렬합니다. 이 기능은 프록시와 **함께** 작동합니다.

```
사용자 IP(차단됨) → 프록시 IP(미국) → 제공자 API
                    + TLS 스푸핑
                    + CLI 핑거프린트
```

따라서 **IP 마스킹**과 **요청 신뢰성**을 동시에 확보할 수 있습니다.

### 프록시 IP 유지

대시보드의 색상 구분 배지는 현재 활성화된 프록시 수준을 보여줍니다.

| 배지 | 수준   | 의미                                 |
| ---- | ------ | ------------------------------------ |
| 🟢   | 전역   | 모든 트래픽이 이 프록시를 통과함     |
| 🟡   | 제공자 | 이 제공자의 트래픽만 프록시를 통과함 |
| 🔵   | 연결   | 이 특정 키/계정이 이 프록시를 사용함 |

배지에는 검증을 위해 확인된 프록시 IP도 표시됩니다.

---

## 업스트림 프록시 모드

CLIProxyAPI 패턴을 사용하는 제공자에 대해 OmniRoute는 세 가지 업스트림 프록시 모드를 지원합니다.

| 모드          | 설명                                                |
| ------------- | --------------------------------------------------- |
| `native`      | OmniRoute가 프록시 라우팅을 직접 처리함(기본값)     |
| `cliproxyapi` | 외부 CLIProxyAPI 인스턴스에 처리를 위임함           |
| `fallback`    | 먼저 네이티브 방식을 시도한 후 CLIProxyAPI로 대체함 |

제공자별로 구성합니다.

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## 대시보드 UI

### 설정 → 프록시 탭

- **전역 프록시** 구성(모든 트래픽에 대해 한 번만 설정)
- **제공자별 프록시** 재정의
- **연결별 프록시** 할당
- 구성된 프록시를 통한 **연결 테스트**
- 활성 프록시 수준을 보여주는 **색상 구분 배지**

### 설정 → 1proxy 탭

- 무료 프록시를 가져오는 **지금 동기화** 버튼
- **통계 카드**: 전체, 활성, 평균 품질, 마지막 동기화
- **필터**: 프로토콜, 국가 코드, 최소 품질
- 호스트, 프로토콜, 국가, 품질 점수, 지연 시간, 익명성, Google 접근 가능 여부를 표시하는 **프록시 테이블**
- 성공/실패 추적 및 연속 실패 횟수를 표시하는 **동기화 상태** 패널
- 모든 1proxy 항목을 제거하는 **모두 지우기**

---

## API 참조

### 프록시 설정 API

| 메서드   | 엔드포인트                                     | 설명                        |
| -------- | ---------------------------------------------- | --------------------------- |
| `GET`    | `/api/settings/proxy`                          | 전체 프록시 구성 가져오기   |
| `GET`    | `/api/settings/proxy?level=global`             | 전역 프록시 가져오기        |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | 제공자 프록시 가져오기      |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | 유효 프록시 확인하기        |
| `PUT`    | `/api/settings/proxy`                          | 프록시 구성 업데이트하기    |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | 해당 수준의 프록시 제거하기 |

### 프록시 레지스트리 API

| 메서드   | 엔드포인트                                        | 설명                      |
| -------- | ------------------------------------------------- | ------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | 모든 프록시 나열하기      |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | ID로 프록시 가져오기      |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | 프록시 할당 가져오기      |
| `POST`   | `/api/v1/management/proxies`                      | 프록시 생성하기           |
| `PATCH`  | `/api/v1/management/proxies`                      | 프록시 업데이트하기       |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | 프록시 삭제하기           |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | 강제로 삭제하기           |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | 일괄 할당하기             |
| `GET`    | `/api/v1/management/proxies/assignments`          | 할당 목록 가져오기        |
| `GET`    | `/api/v1/management/proxies/health`               | 프록시 상태 통계 가져오기 |

### 터널 API

프록시를 통해 아웃바운드 트래픽을 라우팅하는 대신 OmniRoute 인스턴스를 공용 인터넷에 노출하려면(Cloudflare/ngrok/Tailscale) [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md)를 참조하세요. 터널 REST API는 `/api/tunnels/{cloudflared,ngrok,tailscale}/*` 아래에 있으며, 위에서 설명한 아웃바운드 프록시 체인과는 별개입니다.

### 1proxy API

| 메서드   | 엔드포인트                             | 설명                         |
| -------- | -------------------------------------- | ---------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy 프록시 나열하기       |
| `GET`    | `/api/settings/oneproxy?action=stats`  | 통계 및 동기화 상태 가져오기 |
| `GET`    | `/api/settings/oneproxy?action=status` | 동기화 상태만 가져오기       |
| `POST`   | `/api/settings/oneproxy`               | 동기화 실행하기              |
| `POST`   | `/api/settings/oneproxy/rotate`        | 다음 프록시로 전환하기       |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | 하나 삭제하기                |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | 모두 지우기                  |

### 업스트림 프록시 API

| 메서드   | 엔드포인트                        | 설명                          |
| -------- | --------------------------------- | ----------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | 업스트림 프록시 구성 가져오기 |
| `PUT`    | `/api/upstream-proxy/:providerId` | 업스트림 프록시 모드 설정하기 |
| `DELETE` | `/api/upstream-proxy/:providerId` | 업스트림 프록시 구성 제거하기 |

---

## 환경 변수

| 변수                  | 기본값 | 설명                                                        |
| --------------------- | ------ | ----------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | SOCKS5 프록시 지원 활성화(`.env.example`의 기본값은 `true`) |

---

## 문제 해결

### "SOCKS5 proxy is disabled"

`.env` 파일에서 `ENABLE_SOCKS5_PROXY=true`로 설정하고 다시 시작하세요.

### 프록시를 통한 "socket hang up" 오류

유휴 연결을 끊는 저가형 프록시에서는 정상적으로 발생할 수 있습니다. OmniRoute는 이미 다음과 같은 방식으로 이를 처리합니다.

- 프록시 연결에서 keep-alive 비활성화(`keepAliveTimeout: 1`)
- 파이프라이닝 비활성화(`pipelining: 0`)
- 반복적인 핸드셰이크를 방지하기 위해 디스패처 캐싱

문제가 계속되면 다른 프록시를 사용하거나 1proxy 로테이션 기능을 사용해 보세요.

### OAuth 중 "unsupported_country_region_territory"

OAuth 흐름을 시작하기 **전에** 프록시가 구성되어 있는지 확인하세요. OmniRoute는 구성된 프록시를 통해 OAuth 토큰 교환을 라우팅합니다. 먼저 전역 또는 공급자 수준 프록시를 설정한 다음 연결하세요.

### 프록시가 사용되지 않음

확인 순서를 점검하세요.

1. `GET /api/settings/proxy?resolve=your-connection-id`로 확인
2. 프록시 `status`가 `active`인지 확인(`inactive`가 아니어야 함)
3. 프록시 할당 범위가 연결과 일치하는지 확인

### 1proxy 동기화 실패

동기화 상태를 확인하세요.

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

`consecutiveFailures >= 5`이면 회로 차단기가 작동한 것입니다. 서버를 다시 시작하여 초기화하거나 수동으로 초기화될 때까지 기다리세요.

---

## 데이터베이스 스키마

### `proxy_registry` 테이블

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' 또는 'oneproxy'
  quality_score INTEGER,                     -- 0-100(1proxy 전용)
  latency_ms INTEGER,                        -- 밀리초(1proxy 전용)
  anonymity TEXT,                            -- 투명/익명/엘리트
  google_access INTEGER DEFAULT 0,           -- Google에 액세스할 수 있는가? (1proxy)
  last_validated TEXT,                       -- ISO 타임스탬프(1proxy)
  country_code TEXT,                         -- ISO 2자리 코드(1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` 테이블

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- 공급자 ID, 연결 ID 또는 조합 ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## 프록시 상태 확인(v3.8.16+)

OmniRoute의 **프록시 빠른 실패** 메커니즘(`src/lib/proxyHealth.ts`)은 빠른 TCP 연결 검사를 통해 2초 이내에 작동하지 않는 프록시를 감지한 다음, 요청별 오버헤드를 방지하기 위해 **결과를 캐싱**합니다.

### 작동 방식

```
요청 ──▶ ProxyHealthCache.get(url)
         │
         ├─ 캐시 적중 + 최신 상태?  ──▶ 캐시된 상태 반환
         │
         └─ 캐시 누락 / 오래된 상태?  ──▶ host:port에 TCP 연결
                                          (제한 시간: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ HEALTH_CACHE_TTL_MS 동안 캐싱
                                          ──▶ 결과 반환
```

이 기능이 없으면 작동하지 않는 프록시로 인해 모든 요청이 실패하기 전까지 전체 `PROXY_TIMEOUT_MS`(기본값 30초) 동안 차단됩니다.

### 조정 가능한 환경 변수

| 변수                         | 기본값  | 용도                           |
| ---------------------------- | ------- | ------------------------------ |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | 상태 확인당 TCP 연결 제한 시간 |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | 상태 결과가 캐싱되는 기간      |

**권장 값:**

| 시나리오                     | 빠른 실패 제한 시간 | 캐시 TTL | 근거                                                                               |
| ---------------------------- | ------------------- | -------- | ---------------------------------------------------------------------------------- |
| 처리량이 높은 API 게이트웨이 | 1500ms              | 60000ms  | 적극적인 빠른 실패, 검사 횟수를 줄이기 위한 더 긴 캐시                             |
| 지리적으로 분산된 노드       | 3000ms              | 15000ms  | 느린 네트워크에는 더 많은 시간이 필요하며, 빠른 장애 조치를 위해 더 짧은 캐시 사용 |
| 개발 / 테스트                | 1000ms              | 10000ms  | 로컬 프록시에서 빠르게 반복 작업                                                   |
| 스텔스 / 탐지 방지           | 2500ms              | 45000ms  | 속도 제한을 유발할 수 있는 빠른 탐색 방지                                          |

### 프록시 상태 검사

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// 특정 프록시 강제 재검사
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

캐시 항목이 `HEALTH_CACHE_TTL_MS`를 초과하여 다음 요청에서 새로운 검사가 실행될 경우 `stale` 플래그는 `true`입니다.

### 프록시 유형별 기본값

상태 확인은 URL 스킴에 따라 적절한 기본값을 사용합니다.

| 스킴                       | 기본 포트 |
| -------------------------- | --------- |
| `http://`                  | 8080      |
| `https://`                 | 443       |
| `socks5://` / `socks5h://` | 1080      |

URL의 사용자 지정 포트(`http://host:9999`)는 항상 스킴 기본값보다 우선합니다.

---

## 프록시 분석 및 관측성

OmniRoute는 운영자가 라우팅 패턴, 지연 시간 급증 및 반복되는 장애를 진단할 수 있도록 프록시별 사용량을 추적합니다.

### 추적되는 항목

설정된 프록시를 통과하는 모든 요청에 대해 OmniRoute는 다음을 기록합니다.

| 메트릭       | 설명                                       |
| ------------ | ------------------------------------------ |
| `proxy_url`  | 전체 프록시 URL(인증 자격 증명은 마스킹됨) |
| `provider`   | 업스트림 제공자 ID(openai, anthropic 등)   |
| `latency_ms` | 프록시 핸드셰이크를 포함한 전체 왕복 시간  |
| `connect_ms` | TCP 연결 시간만                            |
| `status`     | 업스트림에서 반환된 HTTP 상태 코드         |
| `error`      | 요청이 실패한 경우 오류 클래스             |
| `timestamp`  | ISO 8601 UTC                               |

### 데이터 액세스

```bash
# 최근 프록시 이벤트
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

실제 엔드포인트는 `/api/usage/proxy-logs`입니다(`src/app/api/usage/proxy-logs/route.ts` 참조). 이 엔드포인트는 다음을 지원합니다.

- `GET /api/usage/proxy-logs` — 프록시 로그 조회
- `DELETE /api/usage/proxy-logs` — 모든 프록시 로그 삭제

필요한 경우 SQL을 통해 `proxy_logs` 테이블에서 집계 통계를 직접 조회할 수 있습니다. 대시보드 UI에서도 집계 보기를 제공할 수 있습니다.

### 일반적인 패턴

**불안정한 프록시 감지**(성공과 실패가 번갈아 발생하는 경우):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**느린 프록시 찾기**(p95 지연 시간 > 2초):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## 로테이션 전략 의사 결정 트리

여러 프록시가 하나의 범위에 할당되면 OmniRoute는 각 요청에 사용할 프록시를 선택하기 위해 **로테이션 전략**을 사용합니다. 전략은 범위 수준(전역, 제공자별, 계정별, 조합별)에서 설정됩니다.

### 사용 가능한 전략

| 전략               | 사용 시점                                   | 장단점                                                      |
| ------------------ | ------------------------------------------- | ----------------------------------------------------------- |
| `quality` (기본값) | 품질이 서로 다른 프록시를 사용하는 프로덕션 | 평점이 높은 프록시를 선호하며, 낮은 프록시는 배제될 수 있음 |
| `random`           | 부하 분산, 개인정보 보호                    | 고르게 분산되지만 품질 신호를 무시함                        |
| `sequential`       | 디버깅, 결정론적 테스트                     | 프록시를 순서대로 순환하므로 동작을 이해하기 쉬움           |

### 의사 결정 트리

```
                    프록시의 품질 점수가 있습니까?
                    │
        ┌───────────┴───────────┐
        │                       │
       예                      아니요
        │                       │
   모든 프록시의               │
   품질이 대체로                  │
   동일합니까?                  │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
   예      아니요             사용
   │         │              `random`
   │         │              (고르게 분산하여
   │         │              시간에 따라 품질
   │         │              데이터 축적)
   │         │
   │    `quality` 사용
   │    (서로 다른 품질에
   │    가장 적합)
   │
`random` 사용
(부하를 고르게
분산)
```

## 자체 프록시의 자동 장애 제외

1proxy 마켓플레이스 풀은 이미 실패한 프록시의 등급을 자체적으로 자동 하향 조정합니다([프록시 품질 점수](#proxy-quality-scores) 참조). 레지스트리에 **직접** 추가한 프록시의 경우, 백그라운드 상태 스케줄러(`src/lib/proxyHealth/scheduler.ts`)가 아무것도 삭제하지 않으면서 동일한 "작동하지 않는 구성원을 체인에서 자동 제외"하는 동작을 제공합니다.

```bash
# .env — 연속된 프로브가 3번 실패하면 프록시를 일시적으로 비활성화하고,
# 프로브에 다시 응답하기 시작하면 자동으로 다시 활성화합니다.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

다중 프록시 체인에서 작동하는 방식은 다음과 같습니다.

1. 스케줄러는 등록된 모든 프록시를 `PROXY_HEALTH_INTERVAL_MS` 간격으로 프로브합니다
   (기본값 10분, 최솟값 1분).
2. 연속으로 `PROXY_AUTO_REMOVE_AFTER`번의 **확정적** 장애가 발생하면(실제 연결
   장애를 의미하며, 시간 초과 또는 프로브 대상 자체의 5xx 응답은 절대 포함되지
   않습니다. [프록시 상태 확인](#proxy-health-checking-v3816) 참조), 프록시의
   `status`가 `dead`로 설정됩니다.
3. `dead`는 풀/로테이션 해석에서 사용하는 활성 상태 필터가 제외하는 상태 중
   하나이므로, 해당 범위의 로테이션(라운드 로빈 / 무작위 / 고정 / 지연 시간 —
   [로테이션 전략 결정 트리](#rotation-strategy-decision-tree) 참조)은 새 요청에
   해당 프록시를 즉시 할당하지 않습니다. 풀의 다른 프록시는 영향을 받지 않으며,
   전체 풀이 인지되지 않은 채 직접 연결로 대체되는 일도 없습니다. 페일 클로즈
   보호 기능은 [4단계 프록시 시스템](#4-level-proxy-system)을 참조하세요.
4. 스케줄러는 동일한 간격으로 `dead` 프록시를 계속 프로브합니다. 다음 프로브가
   성공하면 `status`가 다시 `active`로 전환되고 프록시는 로테이션에 재진입합니다.
   수동으로 다시 추가할 필요가 없습니다.

이 기능은 의도적으로 **옵트인 방식이며 비파괴적**입니다. 기본적으로 스케줄러는
실패 횟수를 집계하고 로그만 기록하며(`decision.ts`의 정책 C 참조),
`PROXY_AUTO_DISABLE`은 행을 삭제하지 않습니다. 행 삭제는 별도의 더 강력한
`PROXY_AUTO_REMOVE` 플래그가 담당합니다. 둘 다 `true`로 설정된 경우
`PROXY_AUTO_REMOVE`가 우선합니다(곧 삭제될 프록시를 중간에 일시적으로
비활성화할 필요가 없기 때문입니다). 전체 변수 목록은
[환경 구성](../reference/ENVIRONMENT.md) 참조 문서를 확인하세요.

---

> 📖 **관련 문서:**
>
> - [사용자 가이드](../guides/USER_GUIDE.md) — 일반 설정 및 구성
> - [API 참조](../reference/API_REFERENCE.md) — 전체 API 문서
> - [환경 구성](../reference/ENVIRONMENT.md) — 모든 환경 변수
