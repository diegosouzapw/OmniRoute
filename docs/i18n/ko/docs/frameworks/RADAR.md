# Radar Free-Model Catalog (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **신뢰할 수 있는 원본:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **마지막 업데이트:** 2026-09-01 — v3.8.51
> **호스팅 서비스 검증 범위:** 여기에 설명된 서버 측 규칙은
> 2026-09-01에 정확한 리비전 `main@dce70f004364912f3f144cdb69f4cbcde16093ed`의
> 의도적으로 비공개된 Radar 서버를 기준으로 검증되었습니다. 해당 구현은 이 OSS 저장소에
> 배포되지 않으며, 호스팅 서비스의 가용성은 별도의 운영 상태로 유지됩니다.

Radar는 릴리스 기준선(`open-sse/config/freeModelCatalog.data.ts`의
`FREE_MODEL_BUDGETS`) 위에 서명되고 최신 상태로 큐레이션된 무료 모델
카탈로그를 오버레이하는 **선택적 부가 기능**입니다. 무료 티어 환경은 릴리스 주기보다
빠르게 변화하기 때문에 제공됩니다. 공급자는 릴리스 사이에 무료 할당량을 추가하거나
축소 또는 중단할 수 있지만, 기준선 카탈로그는 새 버전이 출시될 때만 갱신될 수 있습니다.

**현재 무료인 항목이 원격 피드 때문에 유료로 전환되는 일은 없습니다.** Radar는 기준선
항목을 유료화하지 않습니다. 읽기 시점에 제한/상태 필드만 갱신하며, 릴리스 사이에 새로
발견된 무료 모델을 추가 계층으로 제공할 수 있습니다. 운영자는 여전히 모델을 로컬에서
숨길 수 있으며, 동일한 대시보드에서 이를 복원할 수 있습니다. 기준선 카탈로그 자체는
디스크에서 절대 변경되지 않습니다. 아래의
[읽기 시점 오버레이 병합 규칙](#read-time-overlay-merge-rules)을 참조하세요.

---

## v3.8.51의 제공 상태

다음 상태는 이 OSS 릴리스에서 구현된 항목과 이후 Radar 작업 흐름을 구분합니다.
이는 코드 수준의 상태이며, 특정 호스팅 배포 또는 외부 통합이 현재 사용 가능하다는
보장이 아닙니다.

| 영역                       | 이 릴리스의 상태                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 서명된 카탈로그 클라이언트 | 별도의 옵트인, Ed25519 검증, 로컬 암호화 설정/캐시, 영구적인 표시/활성화 재정의, 되돌릴 수 있는 툼스톤, 스케줄러 및 대시보드와 함께 `RADAR_ENABLED` 뒤에서 구현되었습니다.                                               |
| 기여자 활성화              | 대시보드는 서버에서 호스팅되는 GitHub 클레임 흐름으로 연결되며 기존 `omr_…` 키를 허용합니다. 기여자 자격은 비공개 서비스에서 결정되며, OSS 클라이언트에는 GitHub 토큰 또는 발급 로직이 포함되지 않습니다.                |
| 후원자 키 활성화           | 구현되었습니다. 원시 키는 검증되고, 저장 시 암호화되며, 읽을 때 마스킹되고, 서버 측 동기화를 통해서만 전송됩니다. 키를 변경하거나 삭제하면 권한에 민감한 피드 캐시 네 개가 모두 무효화됩니다.                            |
| 추천 링크                  | 별도로 서명되고 매시간 갱신되는 피드로 구현되었습니다. 고정 링크는 커뮤니티 티어에서 즉시 사용할 수 있으며, 기간 한정 캠페인은 라이브 티어 데이터로 유지됩니다.                                                          |
| 후원자 혜택                | 별도로 서명된 라이브 전용 피드 및 대시보드 페이지로 구현되었습니다. 클라이언트는 폐쇄형 혜택 스키마를 재검증하고, 마지막으로 정상 작동한 캐시를 보존하며, 만료된 항목을 필터링하고, 파트너 혜택을 명시적으로 표시합니다. |
| 인텔리전스 및 후원자 인정  | Radar가 관리하는 ELO, 사실에 기반한 카탈로그 최신성/추세, 검증된 로컬 후원자 배지, 대시보드 페이지 및 로컬 전용 CLI 상태/동기화 명령을 갖춘 엄격하게 서명된 라이브 전용 피드로 구현되었습니다.                           |
| 결제 및 트랜잭션 이메일    | OSS 클라이언트에는 구현되지 않았습니다. 구매, 기부, 영수증 검토, 복구 및 메일 전송은 비공개 서비스의 영역이며, 호스팅 서비스의 가용성은 여전히 관리형 배포와 공급자 구성에 따라 달라집니다.                              |
| 연구 에이전트 작업 흐름    | 이 클라이언트 릴리스에 포함되지 않습니다. 큐레이션된 피드 콘텐츠는 서버 측 데이터로 유지되며, OmniRoute 설치 환경에서는 자율 연구 에이전트가 실행되지 않습니다.                                                          |

---

## 공개 공지 리더

범용 공지 리더는 Radar 기능 플래그와 별개입니다. 대시보드 Home 및
Changelog 뷰어는 일반 `GET` 요청을 통해 저장소의 공개 `news.json`을
`NEWS_JSON_URL`에서 가져옵니다(`src/shared/utils/releaseNotes.ts`). Radar 설정, 프롬프트, 제공자
구성, 사용 기록 또는 로컬 닫기 상태는 전송하지 않습니다.

`news.json`은 `parseNewsPayload()`에서 구현된 폐쇄형 v2 스키마를 사용합니다.

- `schemaVersion: 2` 및 크기가 제한된 `items[]` 컬렉션
- 안정적이고 고유한 공지 `id` 값
- 명시적인 `active` 및 ISO `publishedAt` 필드
- 필수 영어 문구와 선택적 현지화 문구
- 자격 증명이 필요 없는 선택적 HTTPS 링크 및 허용 목록에 등록된 아이콘
- 최신 활성 항목 우선 선택, 영어로의 로케일 폴백, ID별 로컬 닫기 처리

이전 포크가 Changelog 뷰를 손상시키지 않고 마이그레이션할 수 있도록 파서는 기존의 단일
`{ active, title, message, ... }` 형식을 일시적으로 허용합니다. 유효하지 않은 피드는 아무
동작도 하지 않습니다. Radar 출시 항목은 `active: false`로 제공됩니다. 이를 `true`로
변경하는 것은 병합 및 배포 후에 수행하는 별도의 릴리스 작업이며, `RADAR_ENABLED` 또는
독립적인 피드 동기화 옵트인을 변경하지 않습니다.

---

## 플래그: `RADAR_ENABLED` (기본적으로 꺼짐)

Radar는 `RADAR_ENABLED` 기능 플래그를 통해 엔드투엔드로 제어됩니다
(`src/shared/constants/featureFlagDefinitions.ts`, 카테고리 `policies`,
`defaultValue: "false"`).

**플래그가 꺼져 있으면 해당 기능 표면은 존재하지 않습니다.**

- 로컬 모델 상태 읽기 및 쓰기를 포함한 모든 `/api/radar/*` 엔드포인트는
  어떤 Radar 모듈에도 접근하기 전에 `404`를 반환합니다.
- 대시보드 화면(`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`)은
  `notFound()`를 렌더링합니다.
- `getRadarCatalog()`(`src/lib/radar/index.ts`)는 변경되지 않은 기준 데이터를 반환합니다.
  즉, 항목 수와 값이 동일하고 모든 항목에 `origin: "baseline"` 태그가 지정되며 피드
  캐시는 절대 읽지 않습니다.
- Radar 네트워크 호출은 전혀 이루어지지 않으며, 각 동기화 모듈은 `fetch`에 접근하기
  전에 `{ status: "disabled" }`를 반환합니다.

이는 엄격한 상위 집합 게이트입니다. 플래그를 켜면 _화면_만 활성화될 뿐, 그 이상의
동작은 하지 않습니다. 데이터를 업로드하거나 백그라운드 동기화를 시작하지 않으며,
라우팅 또는 모델 선택도 변경하지 않습니다. 아래의 별도 옵트인을 참조하세요.

---

## 데이터 동기화는 별도의 옵트인입니다 — 개인정보 보호 약속

`RADAR_ENABLED`를 켜면 UI만 활성화됩니다. 피드를 동기화하려면
`radar_settings.opt_in`에 저장되는 별도의 독립적인 옵트인이 필요합니다
(`src/lib/db/radar.ts`, 마이그레이션 `136_radar_cache_settings.sql`).
`syncRadar()`는 네트워크 호출을 수행하기 전에 플래그와 옵트인을 모두 확인합니다.

```
플래그 꺼짐    → { status: "disabled" }   — 네트워크 호출 없음
옵트인 false   → { status: "opt_out" }    — 네트워크 호출 없음
```

둘 다 켜져 있을 때 동기화 경로는 다음과 같습니다.

1. `x-omniroute-radar-schema: 2`와 선택적
   `Authorization: Bearer <supporter key>` 헤더(아래 참조)를 사용하여
   `GET <feed base URL>/v1/catalog/latest`를 요청합니다. 스키마 헤더가 없으면 서버는
   별도로 서명된 v1 전환 아티팩트를 기본값으로 사용하므로, 이전에 설치된 클라이언트도
   계속 업데이트를 받을 수 있습니다.
2. 이는 다운로드 전용 애플리케이션 흐름이지만, 여전히 HTTPS 요청입니다. 호스팅된
   인프라는 소스 IP와 같은 일반적인 연결 메타데이터를 수신합니다. supporter key가
   구성된 경우 동기화 과정에서 해당 키도 Bearer 헤더로 전송하여 서비스가 권한을
   확인할 수 있도록 합니다. 위의 증거 경계에서 식별된 정확한 비공개 서버 리비전에서
   피드 요청 집계는 수동 남용 검토를 위해 키 해시, 집계된 사용량, 그리고 매일
   순환되는 IP의 잘린 HMAC를 사용합니다. 해당 테이블에는 키나 IP가 원시 형태로
   저장되지 않습니다. 인프라 액세스 로그와 암호화된 전송 아웃박스는 별도의 운영
   경계입니다.
3. OmniRoute는 프롬프트, 응답, 대화, 제공자 자격 증명, 모델 트래픽, 가동 시간,
   지연 시간 또는 로컬 제공자 구성을 Radar 서비스에 절대 전송하지 않습니다.
4. 응답은 검증 및 유효성 검사를 거친 후 로컬에 캐시됩니다
   ([보안 모델](#security-model) 참조). Radar에는 정확히 네 가지 서버 측 네트워크
   경로가 있습니다. 카탈로그용 `syncRadar()`, 추천용 `syncRadarReferrals()`,
   그리고 후원자 전용 혜택 및 Intel용 `syncRadarOffers()` /
   `syncRadarIntel()`입니다.

**supporter key**는 피드 서비스가 어떤 티어를 제공할지 결정할 수 있게 해주는 선택적
Bearer 토큰(`radar_settings.supporter_key`)입니다
([티어](#tiers-community-and-live) 참조). 이 키는 다음과 같이 처리됩니다.

- 제공자 자격 증명에 사용하는 것과 동일한 AES-256-GCM `encrypt()`/`decrypt()`
  헬퍼(`src/lib/db/encryption.ts`)를 사용하여 **저장 시 암호화**됩니다.
- `POST /api/radar/settings`(`{ supporterKey: "omr_" + 40 hex chars }`)를 통해
  설정되며, **절대 그대로 반환되지 않습니다**. 응답은 마스킹된 형식
  (`omr_****abcd`)을 반환합니다.
- 키를 변경하거나 지우면 카탈로그, 추천, 혜택 및 Intel 캐시가 원자적으로
  무효화됩니다. 다음 동기화/읽기 시 서버 측에서 새로운 권한을 확인합니다. 키를
  저장하는 것 자체로는 네트워크 요청이 발생하지 않으며 일회용 활성화 키도
  소비되지 않습니다.
- 동기화 GET 요청에서 Bearer 토큰으로 피드 서비스에 전송됩니다. 키에 관한 그 밖의
  어떤 정보도 클라이언트 외부로 유출되지 않습니다.

---

## 옵트인 전에 표시되는 액세스 및 안전 규칙

비활성 대시보드는 두 활성화 작업 중 하나를 수행하기 **전에**
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx`에서 다음 규칙을 렌더링합니다.
표준 액세스 등급은 다음과 같습니다.

| 등급              | 자격 요건                                                                    | 액세스                                       | 반복/만료 규칙                                                   |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| 커뮤니티          | 누구나 이용 가능, 키 불필요                                                  | 약 30일 지연된 전체 카탈로그                 | 항상 이용 가능, 발급 없음                                        |
| 스타 + 팔로우     | GitHub OAuth를 통해 저장소에 스타를 표시하고 소유자를 팔로우했는지 모두 확인 | 라이브 카탈로그 1회 조회 후 커뮤니티로 전환  | 로그인당 1회 발급, 재발급되지 않음                               |
| 기여자 상위 10명  | 최신 전체 주간 순위에서 1~10위                                               | 365일간 라이브 액세스                        | 요청 시 부여, 순위에서 벗어나도 이미 부여된 기간은 단축되지 않음 |
| 기여자 상위 100명 | 해당 순위에서 11~100위                                                       | 90일간 라이브 액세스                         | 요청 기반/멱등성 부여 규칙 동일                                  |
| 후원자 구매       | 6개월, 1년 또는 평생 이용권 일회성 구매                                      | 라이브 카탈로그, 서명된 라이브 제안 및 Intel | 자동 갱신 없음                                                   |
| 기부/수동 부여    | 소유자가 검토한 기부 또는 소유자가 명시적인 일수/평생 기간으로 부여한 권한   | 부여된 기간 동안 동일한 라이브 이용 권한     | 감사 기록이 남는 멱등성 권한 부여                                |

병합된 PR, 커밋 및 변경된 줄 수는 **순위 산정에만 사용되는 입력값**입니다. 로그인 시 상위 100명
밖에 있으면 PR 수와 관계없이 기여자 권한이 부여되지 않습니다. 유한 기간 구매, 기부, 기여자 기간 및
수동 부여 기간은 현재 만료 시점부터 누적되며, 평생 이용 권한이 우선합니다. 순위가 변경되어도 이미
부여된 기간이 소급하여 취소되거나 단축되지 않습니다.

호스팅 라이선스는 개인용이며, 사용자에게 고지되는 규칙은 한 번에 하나의 활성 설치만 허용한다는
것입니다. 이 릴리스는 하드웨어 잠금을 제공한다고 **주장하지 않습니다**. OSS 동기화는 하드웨어의
지문을 수집하거나 암호화된 기기 임대를 유지하지 않습니다. 위에서 확인된 비공개 서버 리비전에서
구현된 집행 방식은 이용 권한 검증과 더불어, 동일한 유효 키가 24시간 이내에 네 번째로 서로 다른
IP에서 감지될 경우 수동 검토 신호를 생성하는 것입니다. 이 신호로 인해 키가 자동으로 차단되거나
취소되는 일은 없습니다. 복구 시 기존 만료일은 유지하면서 분실된 키를 취소하고 새 키로 교체합니다.
구매 또는 부여된 기간이 다시 시작되지는 않습니다.

라이브 제안은 수동으로 선별되며 변경되거나 만료될 수 있습니다. 또한 옵트인 화면에는 정확한
개인정보 보호 범위가 명시됩니다. 서명된 카탈로그/추천 메타데이터가 다운로드되며, 유효한 키가
있으면 서명된 제안과 Intel도 추가로 이용할 수 있습니다. Bearer 키와 일반적인 연결 메타데이터는
호스팅 서비스에 전달됩니다. 프롬프트, 응답, 대화, 제공자 자격 증명, 모델 트래픽, 가동 시간,
지연 시간 및 로컬 제공자 구성은 전달되지 않습니다.

---

## 후원자 키 받기

활성화 화면(`/dashboard/radar`)에는 후원자 키를 **받기** 위한 두 가지 절차로 연결되는 링크가 있습니다. OSS 저장소 자체에서는 키를 발급하거나 결제 코드를 실행하지 않으며, **가격을 명시하지도 않습니다**. 가격은 이 저장소가 아니라 연결된 페이지에서 전적으로 결정되고 표시됩니다(사양 결정 D14).

- **"저는 기여자입니다"** — 비공개 Radar 서버에서 호스팅되는 GitHub OAuth 신청 절차인 `RADAR_CONTRIBUTOR_CLAIM_URL`(기본값 `https://radar.omniroute.online/auth/github`)을 엽니다. 이 절차는 가장 최근에 완료된 주간 순위를 확인합니다. 상위 10위는 365일을, 11~100위는 90일을 받습니다. 상위 100위 밖에서는 PR 수로 액세스 권한을 얻을 수 없으며, 대신 별도의 별표 + 팔로우 일회성 등급을 확인합니다.
- **"프로젝트 후원하기"** — 6개월, 1년 및 평생 일회성 옵션을 제공하는 호스팅 페이지인 `RADAR_SUPPORTER_PLANS_URL`(기본값 `https://radar.omniroute.online/planos`)을 엽니다. OSS 페이지에는 여전히 금액이 표시되지 않습니다.

두 URL은 서버 측에서 확인되며(`src/lib/radar/links.ts`, `RADAR_FEED_URL`과 동일한 환경 변수 재정의 패턴), 기존 `GET /api/radar/settings` 응답(`contributorClaimUrl`, `supporterPlansUrl`)을 통해 대시보드로 전달됩니다. 클라이언트 컴포넌트는 `process.env`를 직접 읽지 않습니다.

| Var                           | 용도                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | 기여자 신청 URL을 재정의합니다(기본값 `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | 후원자 플랜 URL을 재정의합니다(기본값 `https://radar.omniroute.online/planos`).      |

### 분실한 후원자 키 복구하기

호스팅 서비스의 복구 진입점은 `https://radar.omniroute.online/recover`이며, 플랜 페이지에도 링크되어 있습니다. 로컬 설치는 구매자/기여자의 이메일을 받지 않고 암호화된 설정에서 원본 키를 재구성할 수도 없으므로, 복구는 전적으로 OSS 클라이언트 외부에서 진행됩니다.

1. 키와 연결된 이메일을 제출합니다. 복구 가능한 라이선스의 존재 여부와 관계없이 서비스는 동일한 접수 페이지를 반환하므로, 이 양식으로 계정 존재 여부를 열거할 수 없습니다.
2. 자격이 있는 경우 전송 워커가 유효 기간이 짧은 일회용 링크를 보냅니다. 링크를 열면 토큰은 즉시 임시 암호화 `HttpOnly`/`Secure` 쿠키로 이동되고 깨끗한 `/recover` URL로 리디렉션됩니다. 페이지에는 토큰, 이메일, 이전 키 또는 대체 키가 포함되지 않습니다.
3. 폐기를 확인합니다. 비공개 서비스는 이전 키를 폐기하고 동일한 플랜/만료일로 대체 키를 생성한 다음, 하나의 트랜잭션에서 이메일 전송 대기열에 추가합니다. 대체 키는 브라우저에 반환되지 않습니다.
4. 대체 키를 `/dashboard/radar`에 붙여 넣습니다. 이제 이전 키는 `community`로 강등되어야 하며, 대체 키는 검증된 `live` 동기화를 생성해야 합니다. 동일한 복구 링크를 다시 열면 일반적인 유효하지 않음/만료됨 응답과 함께 실패해야 합니다.

호스팅된 복구 라우트와 메일 워커는 코드에 존재하더라도 특정 배포 환경에서는 사용할 수 없을 수 있습니다. 서버가 배포되고, 전송 제공자가 통제된 수신자로 구성되며, 전체 일회용 링크가 테스트되기 전까지는 이 절차를 프로덕션 준비가 완료된 것으로 간주하지 마세요.

방문자가 키(`omr_` + 40자리 16진수 문자)를 받은 후에는 활성화 화면(`src/app/(dashboard)/dashboard/radar/page.tsx`)의 키 붙여넣기 입력란이 기본 경로가 됩니다. 키를 붙여 넣고 제출하면 한 번의 호출로 `POST /api/radar/settings`(`{ optIn: true, supporterKey }`)가 전송됩니다. 즉, 키를 붙여 넣으면 키 설정과 옵트인이 동시에 이루어져 화면이 잠금 해제됩니다. 형식(`omr_` + 40자리 16진수 문자)은 UX 편의를 위해 먼저 공유 `isValidSupporterKeyFormat()` 헬퍼(`src/lib/radar/supporterKey.ts`)를 사용해 클라이언트 측에서 확인되지만, 어느 경우든 서버의 Zod 스키마가 최종 검증 기준입니다. 키가 설정되면 활성화 화면에는 빈 입력란 대신 `GET /api/radar/settings`에서 받은 마스킹된 형식(`supporterKeyMasked`)이 표시되며, 새 키를 붙여 넣을 수 있는 "키 변경" 컨트롤이 제공됩니다. 원본 키는 다시 표시되지 않습니다. 위의 두 신청/플랜 버튼은 처음에 키를 _받는_ 방법으로 계속 사용되며, 이 입력란은 이미 키가 있는 운영자가 키를 활성화하는 곳입니다.

### 엔드투엔드 활성화 및 안내식 설정

비공개 피드 서비스와 이 OSS 클라이언트 사이의 경계는 의도적으로 제한되어 있습니다. 서비스는 후원자 키를 발급하고 검증하며, 로컬 OmniRoute 설치는 키를 암호화하고 서명된 아티팩트를 서버 측에서 동기화하며 제공자 설정을 안내합니다. 지원형 검증 순서는 다음과 같습니다.

1. 기여자 클레임, 요금제/결제, 복구 절차 또는 승인된 비공개 서버 운영자로부터 새로 발급되거나 복구된 키를 받습니다. 원시 키를 로그, 스크린샷, 이슈 댓글 또는 명령줄 인수에 붙여 넣지 마세요.
2. 로컬 OmniRoute 설치에서 `RADAR_ENABLED` 기능 플래그를 활성화합니다. 이렇게 하면 UI가 표시되지만, 별도의 옵트인을 저장하기 전까지는 네트워크 통신이 발생하지 않습니다.
3. `/dashboard/radar`를 열고 키를 붙여 넣은 다음 활성화합니다. 브라우저는 `{ optIn: true, supporterKey }`와 함께 로컬 `POST /api/radar/settings` 요청 하나를 전송합니다. 키는 로컬에서 암호화되며 응답에는 `omr_****<last4>`만 포함됩니다.
4. 활성화 화면에서 카탈로그 동기화가 실행되도록 두거나 **지금 동기화**를 선택합니다. 페이지에 `live`, 피드 버전 및 가져온 시간이 표시되는지 확인합니다. 인증된 로컬 진단의 경우 `GET /api/radar/status`는 키를 반환하지 않고 옵트인/키 존재 여부와 4개의 캐시 상태를 보고합니다. `POST /api/radar/sync-all`을 사용하면 카탈로그, 추천, 혜택 및 Intel을 명시적으로 새로 고칠 수 있습니다.
5. `/dashboard/radar/setup?provider=<provider>`를 엽니다. 공급자가 운영하는 자격 증명 URL로 이동하여 **API 키 추가**를 선택하고, 실제 공급자 양식을 통해 저장한 다음 가이드로 돌아와 **연결 테스트**를 실행합니다. 가이드는 일반 `/api/providers` 및 `/api/providers/<connection-id>/test` 경로를 사용하며, 별도의 Radar 자격 증명을 생성하지 않습니다.
6. 호환되는 공급자 연결이 2개 이상 활성화된 후 `/dashboard/radar/combos`를 엽니다. 제안된 제품군을 검토하고 기존 콤보 API를 통해 콤보를 생성합니다. 혜택과 Intel은 각각 별도의 라이브 전용 서명 캐시로 유지되며, 각각의 전용 Radar 페이지에서 확인할 수 있습니다.
7. `/dashboard/radar`와 설정 페이지를 다시 로드합니다. 옵트인, 마스킹된 키 상태, 검증된 캐시, 저장된 공급자 연결 및 테스트 작업은 다시 로드한 후에도 유지되어야 합니다. 원시 키와 공급자 자격 증명이 더 이상 보이지 않는 상태에서만 증거를 캡처하세요.

키를 저장했다는 사실만으로는 라이브 사용 권한이 입증되지 않습니다. 비공개 서비스의 `GET /v1/license/check` 결과, OSS 카탈로그가 제공하는 `live` 티어, 검증된 서명 캐시 및 실제 공급자 연결/테스트 흐름을 모두 충족해야 입증됩니다. 유효하지 않거나 만료 또는 취소된 키가 사용되면 카탈로그는 안전하게 `community`로 다운그레이드되며, 이를 라이브 키 검증 성공으로 보고해서는 안 됩니다.

### 비공개 관리자 패널 링크

`RADAR_ADMIN_URL`을 설정하면 비용 사이드바 섹션의 사용자용 Radar 항목 바로 뒤에 **Radar 관리자 ↗**가 선택적으로 추가됩니다. 의도적으로 기본값은 제공되지 않습니다. 변수가 설정되지 않았거나 유효하지 않으면 정적 사이드바, 명령 팔레트 및 사이드바 사용자 지정 화면에 관리자 항목이나 비공개 URL이 표시되지 않습니다.

이 값은 서버 측에서 확인되며, 관리 인증이 적용된 `GET /api/settings` 응답을 통해 인증된 대시보드 세션에만 전달됩니다. 또는 로그인 없는 로컬 부트스트랩 중에는 신뢰할 수 있는 루프백 소유자에게 전달됩니다. CLI, 내부 서비스 및 manage 범위 API 키 인증에는 이 값이 제공되지 않습니다. 브라우저는 외부 링크를 생성하기 전에 응답을 다시 검증하며, 링크는 `noopener noreferrer`와 함께 열립니다.

자격 증명이 포함되지 않은 HTTPS 터널/tailnet URL을 사용하세요. 일반 HTTP는 `http://127.0.0.1:9351`과 같은 루프백 SSH 포워딩에만 허용됩니다. 그 외의 스킴, 포함된 자격 증명, 잘못된 형식의 URL 및 원격 HTTP 대상은 안전을 위해 거부되며 탐색은 비활성 상태로 유지됩니다.

---

## 보안 모델

### 정확한 바이트에 대한 Ed25519 서명

피드 페이로드는 Ed25519로 서명됩니다. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`)는 네트워크를 통해 수신한 **정확한 응답 바이트**에 대해
서명을 검증합니다. 검증 전에 페이로드를 다시 직렬화하지 않으므로, 바이트 단위의
재인코딩으로 인해 서명 검사가 조용히 무효화되거나 우회될 수 없습니다.
검증 실패(`invalid_signature`) 시 페이로드가 파싱되거나 캐시되기 전에 동기화가
중단됩니다.

### 고정된 공개 키 + 교체

검증용 공개 키는 `src/lib/radar/pinnedKeys.ts`의
`PINNED_FEED_PUBLIC_KEYS`에 고정되어 있습니다. 이 값은 배열이므로 키를 교체할 때
새 키를 앞에 추가할 수 있으며, 이전 키로 서명된 기존 캐시 피드는 다시 동기화될
때까지 유효하게 유지됩니다.

### 포크에 적합한 환경 변수 재정의

두 환경 변수를 사용하면 포크 및 자체 호스팅 사용자가 기본 OmniRoute 서비스
대신 자체 피드를 사용하도록 클라이언트를 지정할 수 있습니다. 아래의
[피드를 자체 호스팅하는 방법](#how-to-self-host-a-feed)을 참조하세요.

| 변수                | 용도                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | 피드 기본 URL을 재정의합니다(기본값: `https://radar.omniroute.online`).                          |
| `RADAR_FEED_PUBKEY` | 고정된 공개 키(base64-DER SPKI 또는 PEM)를 재정의하며, 기본 제공 배열을 이 단일 키로 대체합니다. |

### 버전 하한

`syncRadar()`는 다운로드한 피드의 `version`이 현재 캐시된 버전보다 엄격하게 최신이
아니면 이를 거부합니다(`compareVersions()`, 점으로 구분된 `YYYY.MM.DD.n` 비교).
반환값은 `{ status: "stale" }`입니다. 이를 통해 침해되었거나 잘못 구성된 피드
엔드포인트가 클라이언트를 이전의 다른 서명 페이로드로 롤백하는 것을 방지합니다.

### 두 날짜를 모두 유지하는 이유

캐시된 피드에는 서로 다른 두 날짜가 포함되며, 둘을 혼동할 수 있다는 점이 바로
두 날짜를 모두 유지하는 이유입니다.

| 필드          | 출처                | 나타내는 내용                               |
| ------------- | ------------------- | ------------------------------------------- |
| `generatedAt` | 서명된 피드 본문    | **데이터**가 얼마나 오래되었는지            |
| `fetchedAt`   | 이 설치 환경의 시계 | 이 설치 환경이 데이터를 **다운로드한** 시점 |

몇 분 전에 가져온 피드에도 몇 주 전의 수치가 포함될 수 있으므로, `fetchedAt`만으로는
오버레이가 그 기반이 되는 기준선보다 최신인지 운영자가 판단할 수 없습니다. 두 값 모두
`radar_feed_cache`에 저장되고 `getRadarCatalog().meta`에서 반환되며,
`GET /api/radar/status`에서 별도로 보고됩니다. `generated_at` 열이 존재하기
전(마이그레이션 163)에 캐시된 행은 `null`로 읽힙니다. 즉, 알 수 없는 값은 가져온
시간을 대신 사용하지 않고 계속 알 수 없는 값으로 유지됩니다.
`radar_referrals_cache`는 마이그레이션 142부터 자체 `generated_at`을 유지해
왔습니다.

위의 버전 하한은 두 날짜가 아니라 `version`을 비교합니다.

두 가지 공백이 남아 있으며, 둘 다 의도된 것입니다. 대시보드에는 여전히
`Last fetched`만 표시되므로 여기에서 빌드 날짜를 표시하려면 새 레이블과 해당
41개 로케일 항목이 필요합니다. 또한 제안 및 인텔리전스 캐시는 피드 스키마에
빌드 날짜가 포함되어 있어도 해당 날짜를 전혀 보관하지 않습니다. 따라서
`GET /api/radar/status`는 "알 수 없음"으로 읽힐 수 있는 `null`을 보고하는 대신
이 두 항목에 대해 해당 필드를 생략합니다.

### 스키마 검증

다운로드한 바이트는 서명 검증 **후** `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, Zod 스키마)에 따라 파싱되고 검증됩니다.
스키마 불일치 시 `{ status: "invalid_schema" }`가 반환되며 캐시는 변경되지
않습니다. 캐시된 페이로드는 읽을 때마다(`getRadarCatalog()`) 방어적으로 다시
검증됩니다. 손상되었거나 수동으로 편집된 캐시 행은 제공되지 않고 기준선으로
대체됩니다.

### 응답 크기 제한(10 MB)

`syncRadar()`는 피드 응답 본문에 **10 MB의 엄격한 제한**을 적용합니다. 서명된
피드는 KB 규모의 JSON 문서이므로 이 크기를 초과하는 응답은 정상적인 카탈로그가
아니라 잘못 구성되었거나 악의적인 `RADAR_FEED_URL` 또는 잘못된 데이터를
제공하는 업스트림을 나타냅니다. 제한은 두 계층으로 적용됩니다.

1. `Content-Length` 사전 검사는 헤더가 제한을 초과하는 값을 이미 선언한 경우
   본문을 아예 읽지 않습니다.
2. 본문을 읽는 동안 누적 크기를 검사하여 `Content-Length`가 없거나 실제 크기를
   축소해서 나타내는 경우에도 제한을 적용합니다. 헤더만 단독으로 신뢰하지
   않습니다. 누적된 청크를 연결하면 이후 Ed25519 서명 검사에 필요한 정확한
   바이트가 보존됩니다.

제한을 초과하면 `{ status: "too_large" }`가 반환되고 캐시는 변경되지 않습니다.
이는 다른 모든 동기화 실패(`invalid_signature`, `invalid_schema`, `stale`)와
동일한 비파괴적 패턴을 따릅니다.

---

## 등급: `community` 및 `live`

피드 스키마에는 `tier: "community" | "live"` 필드가 포함되며, 피드 서비스가 요청을 기준으로(서포터 키의 존재 여부 및 유효성) **서버 측에서** 결정합니다.
클라이언트는 자체적으로 등급을 결정하지 않습니다.

- **`community`** — 최신 데이터보다 약 30일 지연된 무료 카탈로그입니다.
  인증되지 않았거나 유효하지 않은 키를 사용한 요청에는 이 카탈로그가 제공됩니다.
- **`live`** — 유효한 서포터 키가 포함된 요청에 제공되는 최신 카탈로그입니다.

**유효하지 않거나 만료된 서포터 키는 `community`로 강등되며, 오류가
발생하지는 않습니다.** 동기화 경로는 서명/스키마/버전 실패(모두 복구 가능하며
캐시된 상태에 치명적이지 않음)와 성공적인 `{ status:
"updated", version, tier }`만 구분합니다. 클라이언트가 처리해야 하는 등급별 오류
경로는 없습니다.

### 제공되는 등급은 서명된 본문이 아니라 응답 헤더에서 가져옵니다

서명된 피드 **본문**의 `tier` 필드는 항상 `"live"`입니다. 피드 서비스는
**버전마다 두 개의 서명된 아티팩트**를 제공합니다. live에는 현재 캠페인이 포함되고 community에는
포함되지 않습니다. 각 아티팩트는 자체의 정확한 바이트를 기준으로 서명됩니다. 본문은 여전히
권한 결정을 담당하지 않습니다. 요청에 대해 실제로 선택된 등급은 요청의
`Authorization` 키를 기준으로 서버 측에서 결정되어 **`x-omniroute-feed-tier` 응답 헤더**에
포함됩니다.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`)는 클라이언트가 신뢰해야 할
등급을 결정하는 유일한 위치입니다.

1. `x-omniroute-feed-tier`를 `RadarTierSchema`(Zod)로 파싱합니다. 헤더가 없거나
   값이 정확히 `"community"` 또는 `"live"`가 아니면 **존재하지
   않는 것**으로 처리합니다(그대로 캐시/UI에서 신뢰하지 않으며, 헤더가 도입되기 전의
   이전 피드 서버도 여기에 해당합니다).
2. 1단계에서 값을 얻지 못한 경우에만 서명된 본문의 `tier` 필드(항상 `"live"`)로
   대체합니다.
3. 결정된 등급이 캐시되고 `{ status: "updated",
version, tier }`로 반환됩니다. 대시보드에는 원시 본문
   필드가 아니라 이 값이 표시됩니다.

---

## 읽기 시점 오버레이 병합 규칙

`applyFeed()` (`src/lib/radar/applyFeed.ts`)는 `getRadarCatalog()` 내부의 **읽기 시점**에
캐시된 피드를 정적 기준 데이터 **위에** 병합합니다. 기준 배열
(`FREE_MODEL_BUDGETS`)은 절대 변경되지 않으며, 호출할 때마다 새로운 `MergedEntry[]`가
계산됩니다.

우선순위에 따른 네 가지 규칙은 다음과 같습니다.

1. **피드는 로컬 재정의를 절대 덮어쓰지 않습니다.** 필드별로 적용됩니다. 운영자가
   항목의 필드를 사용자 지정한 경우(`provider:modelId`를 키로 사용하는 `localOverrides` 맵),
   해당 필드에 대한 피드 값은 건너뛰며 운영자의 값이 우선합니다.
2. **`enabled: false`는 출처 정보와 함께 항목을 비활성화합니다.** 항목을 끄는 피드 항목은
   병합된 결과에 `enabled: false`와 `disabledBy: "radar"`를 설정하므로,
   UI에서 항목이 사용 가능 상태에서 비활성화 상태로 변경된 _이유_를 설명할 수 있습니다.
3. **피드에 없는 사용자 추가 항목은 변경되지 않은 채 유지됩니다.** 기준 데이터에만
   존재하거나 로컬에서 추가되었으며 대응하는 피드 항목이 없는 항목은
   변경 없이 그대로 전달됩니다.
4. **삭제 표시된 항목은 절대 복원되지 않습니다.** 운영자가 항목을 명시적으로 삭제한 경우
   (`tombstones` 집합), 이후 버전에서 피드가 해당 `provider:modelId`를 다시 추가해도
   항목이 복원되지 않습니다.

편집 가능한 필드와 삭제 표시는
`radar_local_model_state`(마이그레이션 `153_radar_local_model_state.sql`)에 영구 저장됩니다. 공개 DB
어댑터(`src/lib/db/radar.ts`)는 해당 행을 `applyFeed()`에서 사용하는 `localOverrides` 맵과
`tombstones` 집합으로 변환합니다. 프로덕션의 `getRadarCatalog()`는 플래그, 캐시, 스키마
게이트를 통과한 후 이 상태를 로드합니다. 운영자는 `displayName`과 `enabled`만
편집할 수 있습니다. 제공자/모델 ID, 피드 출처, 할당량, 기능, 이용 약관,
설정 데이터는 이 인터페이스를 통해 작성할 수 없습니다.

대시보드는 다음 네 가지 로컬 작업을 제공합니다.

- **편집**은 로컬 표시 이름과 활성화 상태를 변경합니다.
- **로컬 변경 사항 재설정**은 삭제 표시를 변경하지 않고 편집 가능한 두 필드를 모두 지웁니다.
- **숨기기**는 삭제 표시를 생성하여 이후 피드 업데이트에서 해당 행을 다시 만들 수 없게 합니다.
- **복원**은 삭제 표시를 제거합니다. 별도로 저장된 재정의가 있으면 계속 적용됩니다.

피드의 `enabled: false`는 안전을 위한 예외로 유지됩니다. 오래된 로컬
`enabled: true`보다 우선하여 병합된 항목을 비활성화 상태로 유지하고 `disabledBy: "radar"`를 기록합니다.

카탈로그 게시물은 `schemaVersion: 2`를 사용합니다. `contextWindow`와 `tools`, `vision`,
`thinking` 각각은 독립적으로 `number | null` / `boolean | null`입니다. `null`은 알 수 없음을
의미하고, `false`는 D16으로 확인된 공식 제공자 출처에서 해당 기능이 없다고 명시했다는 의미입니다.
내부 OmniRoute 레지스트리/모델 사양 플래그는 피드의 사실 정보로 직접 승격되지 않습니다. 클라이언트는
여전히 v1 스냅샷을 허용합니다. 이전 빌더에서는 `false`를 부재를 나타내는 자리표시자로 사용했으므로
v1의 `false`는 알 수 없음으로 정규화되고 v1의 `true`는 사실 정보로 유지됩니다. 알 수 없는 스키마
버전은 안전하게 실패 처리되며 마지막 유효 캐시는 계속 사용할 수 있습니다. null이 아닌 컨텍스트/기능이
있는 모든 v2 모델에는 자격 증명이 필요 없는 HTTPS `metadataEvidenceUrls[]`가 포함되어야 합니다. 그렇지
않으면 스키마 검증이 실패하고 캐시가 교체되지 않습니다. 카탈로그 테이블은 세 가지 상태를 각각 `✓`,
`✕`, `?`로 렌더링합니다.

### 안내형 조합 및 MCP 액세스

확인된 `familyId` 값은 읽기 시점 오버레이 후에도 유지되며 순수
`buildRadarComboSuggestions()` 모듈(`src/lib/radar/comboSuggestions.ts`)을 구동합니다. 서로 다른
제공자 중 최소 두 곳에 활성 연결이 있고 정확히 선별된 모델 ID를 노출하는 경우에만 해당 제품군이
제안됩니다. 비활성화된 모델, 비활성 제공자, 누락된 모델 ID, 제공자가 하나뿐인 제품군, 모호한
별칭/접두사 일치는 안전하게 실패 처리됩니다. 제안은 기존 `priority` 전략을 사용하며, 반복되는 월간
예산이 가장 큰 항목을 먼저 정렬합니다. UI에서는 `POST /api/combos`를 통해서만 해당 조합을 생성합니다.

안내형 UI는 `/dashboard/radar/combos`에 있습니다. 이 UI는 로컬
`GET /api/radar/catalog` 및 `GET /api/combos/builder/options` 엔드포인트만 읽습니다. Radar 동기화를 트리거하거나,
제공업체 자격 증명을 읽거나, 콤보 데이터베이스에 직접 쓰지 않습니다.

MCP 클라이언트는 `omniroute_radar_catalog` (`read:radar`)를 사용하여 동일한 로컬 프로젝션을 읽을 수 있습니다. 선택적
`provider`, `familyId`, `enabledOnly` 필터는 로컬
`GET /api/radar/catalog`을 한 번 읽은 후 평가됩니다. 제한된 출력에는 카탈로그 메타데이터와 제공업체/모델,
표시 이름, `familyId`, 할당량, 기능, 활성화 상태, 출처 및 `disabledBy`가 포함됩니다. 설정 URL,
단계, 연결, 이메일 주소, 키 및 추천 데이터는 절대 반환되지 않습니다. 이 도구는
읽기 전용이며 `/api/radar/sync`를 호출하지 않습니다.

### 출처 마커

병합된 모든 항목에는 UI가 배지로 렌더링하는 `origin` 필드가 포함됩니다.

- `"baseline"` — 정적 릴리스 카탈로그에서 변경되지 않은 항목입니다.
- `"radar"` — 피드에 의해 하나 이상의 필드가 갱신된 항목입니다.
- `"local"` — 운영자가 이 항목에 하나 이상의 로컬 재정의를 적용한 상태입니다(피드의 내용과 관계없이 로컬
  재정의는 규칙 1에 따라 항상 피드보다 우선합니다).

---

## 로컬 표면 — 피드 프록시는 절대 아님

아래의 로컬 Radar 라우트 계열은 `src/app/api/radar/` 아래의 UI를 지원합니다.

| 라우트                         | 메서드 | 용도                                                                                                                    |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | 로컬 캐시에서 병합된 카탈로그(`getRadarCatalog()`)를 반환합니다.                                                        |
| `/api/radar/sync`              | POST   | 서버 측에서 `syncRadar()`를 트리거하고 결과 상태를 반환합니다.                                                          |
| `/api/radar/settings`          | GET    | `{ optIn, hasSupporterKey, supporterKeyMasked }`를 반환하며, 원본 키는 절대 반환하지 않습니다.                          |
| `/api/radar/settings`          | POST   | 옵트인 및/또는 암호화된 후원자 키를 설정합니다.                                                                         |
| `/api/radar/referrals`         | GET    | 로컬 캐시에서 `{ fixed, campaigns, tier }`를 반환합니다. 아래의 [추천 링크](#referral-links-free-credits)를 참조하세요. |
| `/api/radar/offers`            | GET    | 검증된 로컬 라이브 캐시에서 활성 오퍼를 반환하며, 후원자 키는 절대 반환하지 않습니다.                                   |
| `/api/radar/offers/sync`       | POST   | 서버 측의 라이브 키 전용 `syncRadarOffers()` 파이프라인을 트리거합니다.                                                 |
| `/api/radar/intel`             | GET    | 검증된 로컬 라이브 Intel과 후원자 인식 여부를 나타내는 불리언을 반환하며, 신원이나 키는 절대 반환하지 않습니다.         |
| `/api/radar/intel/sync`        | POST   | 서버 측의 라이브 키 전용 `syncRadarIntel()` 파이프라인을 트리거합니다.                                                  |
| `/api/radar/status`            | GET    | 비밀 정보 없이 카탈로그, 추천, 오퍼 및 Intel에 대한 읽기 전용 로컬 설정/캐시 상태를 반환합니다.                         |
| `/api/radar/sync-all`          | POST   | 서버 측 동기화 모듈 4개를 모두 실행하고 각 피드의 상태를 개별적으로 반환합니다.                                         |
| `/api/radar/local-model-state` | GET    | 편집/복원 컨트롤을 위해 영구 저장된 오버라이드와 툼스톤을 나열합니다.                                                   |
| `/api/radar/local-model-state` | PATCH  | 검증된 `displayName`/`enabled` 오버라이드 필드를 설정하거나 지웁니다.                                                   |
| `/api/radar/local-model-state` | PUT    | `{ provider, modelId, tombstoned }`로 툼스톤을 생성하거나 제거합니다.                                                   |
| `/api/radar/local-model-state` | DELETE | 툼스톤은 유지하면서 편집 가능한 오버라이드 필드를 지웁니다.                                                             |

**엄격한 규칙: 이 라우트들은 피드 서비스를 절대 프록시하지 않습니다.** 브라우저는 항상
로컬 OmniRoute 서버와만 통신합니다. Radar 서비스에 접근하는 네 개의 모듈은
`src/lib/radar/sync.ts`(카탈로그), `src/lib/radar/referralsSync.ts`(추천),
`src/lib/radar/offersSync.ts`(오퍼), 그리고 `src/lib/radar/intelSync.ts`(Intel)이며,
모두 클라이언트 측이 아닌 서버 측에서 실행됩니다. 따라서 피드 URL과 모든 후원자 키가
클라이언트 대상 네트워크 트래픽에 전혀 노출되지 않습니다.

모든 Radar 엔드포인트는 `RADAR_ENABLED`가 꺼져 있으면 `404`를 반환하며(위의
[플래그](#flag-radar_enabled-default-off) 참조), 저장소 전체의 오류 정제 규칙
(`docs/security/ERROR_SANITIZATION.md`)에 따라 라우트 오류 응답을
`buildErrorBody()`/`sanitizeErrorMessage()`를 통해 처리합니다.

### 인증

모든 Radar 엔드포인트는 `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`)를 통한 인증이 필요합니다. 즉, 대시보드 세션 쿠키 또는
관리 범위 API 키가 필요하며, 이는 나머지 `/api/settings/*`를 보호하는 것과 동일한
게이트입니다. 플래그가 꺼진 경우의 `404` 검사는 항상 인증 검사 **이전에** 실행되므로,
`RADAR_ENABLED`가 꺼진 설치 환경은 바이트 단위까지 동일하게 유지됩니다(해당 표면이
존재하지 않는다는 사실을 확인하기 위해 인증 프롬프트가 표시되지 않음). 플래그가
켜지면 인증되지 않은 요청은 DB 읽기 또는 쓰기가 수행되기 전에 `401`을 받습니다.
`GET /api/radar/settings`는 인증 상태와 관계없이 원본 후원자 키를 절대 반환하지
않으며, 마스킹된 형식과 `hasSupporterKey` 불리언만 반환합니다.

---

## 서포터 혜택

혜택은 자체 서명된 아티팩트인 `GET /v1/offers/latest`를 사용하며, 카탈로그 또는 추천 캐시를 공유하지
않습니다. 서버 엔드포인트에는 유효한 라이브 서포터 Bearer 키가 필요하며, 커뮤니티 폴백은
없습니다. 따라서 `syncRadarOffers()`는 기능 플래그가 꺼져 있거나, 운영자가 옵트인하지 않았거나,
서포터 키가 구성되지 않은 경우 네트워크 요청 전에 중단됩니다.

GET이 성공하면 클라이언트는 정확한 응답 바이트를 대상으로 Ed25519 서명을 검증하고,
`RadarOffersFeedSchema`를 검증하며, 서명된 본문과 `x-omniroute-feed-tier` 헤더가 모두
`live`라고 명시하도록 요구하고, 점으로 구분된 버전이 반드시 더 최신인지 확인한 후에만
`radar_offers_cache`를 원자적으로 교체합니다(마이그레이션 `144_radar_offers_cache.sql`). 다른
피드에 사용되는 헤더와 스트림을 합한 동일한 10 MB 제한이 적용됩니다. 서명, 스키마, 티어,
재생, 크기, HTTP 및 네트워크 오류가 발생해도 마지막으로 검증된 캐시는 모두 보존됩니다.

비공개 혜택 형식은 비교 가능한 세 가지 혜택 유형, 즉 베이시스 포인트 단위의 백분율, 통화의
최소 단위로 표시된 크레딧 또는 체험 일수를 지원합니다. 파트너 혜택에는 같은 유형의 공개
기준선이 포함되어야 하며, 해당 혜택은 기준선보다 반드시 커야 합니다. 공식 혜택에는 파트너
기준선이 없습니다. URL은 자격 증명을 포함하지 않는 HTTPS여야 합니다. `getRadarOffers()`는
방어적으로 캐시된 페이로드를 다시 검증하고 로컬에서 읽을 때마다 만료된 항목을 필터링합니다.
`/dashboard/radar/offers`는 렌더링 전에 만료 여부를 다시 필터링하고, 포르투갈어 텍스트가 있으면
이를 사용하되 영어로 폴백하며, 파트너 혜택임을 명시적으로 표시합니다.

브라우저는 로컬 라우트만 호출합니다. 마스킹된 설정 스냅샷을 읽고,
`POST /api/radar/offers/sync`에 서버 측 새로 고침을 요청한 다음
`GET /api/radar/offers`를 읽습니다. 키가 없으면 피드 요청을 시도하는 대신 기존 기여자/지원
링크를 표시합니다. 외부 혜택 링크는 `noopener noreferrer`와 함께 새 탭에서 열립니다. 이번
릴리스에서는 `radar_offers` MCP 도구가 노출되지 않습니다.

---

## Radar 인텔리전스, 서포터 배지 및 CLI

인텔리전스는 `GET /v1/intel/latest`에 있는 서명된 아티팩트입니다. 비공개
`RadarIntelFeedSchema`는 비공개 큐레이터가 확인된 비교를 바탕으로 산출한 Radar 소유 ELO
순위와, 서명된 카탈로그 스냅샷에서 산출한 사실 기반 카탈로그 연령/개수 차이만 허용합니다.
방법론은 초기 레이팅 1000과 K=32로 고정됩니다. 확인된 비교가 없을 때는 빈 순위가 유효하며,
클라이언트는 순위를 임의로 생성하지 않습니다.

`syncRadarIntel()`은 혜택과 동일하게 서버 측 Bearer, 30초 타임아웃, 10 MiB 스트리밍 제한,
정확한 바이트에 대한 Ed25519 검증, 엄격한 스키마, 본문/헤더의 `live` 요구 사항, 버전 하한 및
마지막 정상 캐시 보존을 적용합니다. 검증된 라이브 스냅샷이 저장된 후 클라이언트는
`radar:<sha256(supporter key)>`를 파생하고, 해당 단방향 ID만 저장하며, 전용
`radar_supporter` 인정 이벤트를 발생시킵니다. 이 이벤트의 `radar-supporter` 배지는 멱등성을
가지며 XP를 전혀 부여하지 않습니다. 또한 리더보드를 업데이트하거나 `token_share`를
재사용하지 않습니다. `/dashboard/radar/intel`은 검증된 로컬 캐시 메타데이터만을 바탕으로
배지를 렌더링합니다.

CLI는 `omniroute radar status`와 `omniroute radar sync`를 제공합니다. 두 명령 모두 로컬
OmniRoute API와만 통신합니다. `status`는 읽기 전용 `GET /api/radar/status`를 수행하고,
`sync`는 `POST /api/radar/sync-all`을 한 번 전송한 후 피드별 결과를 출력합니다. 두 명령
모두 서포터 키를 읽거나 입력받거나 출력하지 않으며, Radar 서비스에 직접 연결하지도 않습니다.

---

## 추천 링크(무료 크레딧)

추천 링크는 카탈로그 피드와 별개인 **독립형 최신 상태 유지** 피드인
`GET /v1/referrals/latest`에서 제공됩니다. 이는 의도적인 설계입니다. 커뮤니티 티어의
카탈로그 피드는 최대 30일 전의 스냅샷일 수 있으므로, 이전에는 여기서 추출한
추천 링크도 서버의 실제 링크 목록보다 같은 기간만큼 뒤처졌습니다(새로 추가된 추천
링크가 무료/커뮤니티 사용자에게 전달되기까지 최대 한 달이 걸릴 수 있었습니다).
추천 피드는 자체적으로 훨씬 짧은 주기로 동기화하여 이러한 지연을 제거합니다.

```ts
// GET /v1/referrals/latest 응답 본문(Ed25519로 서명되며, 카탈로그 피드와
// 동일하게 고정된 키 사용):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — 결정적 값: 추천 링크 전체에서 max(updatedAt)를
                                  // 사용하므로 동일한 두 요청은 정확히 같은
                                  // 서명된 바이트/서명을 생성함
  referrals: {
    fixed: RadarReferral[],      // 인증 없음/커뮤니티를 포함한 모든 티어에 존재
    campaigns: RadarReferral[],  // 유효하고 활성 상태인 (후원자) Bearer 키에 대해서만
                                  // 채워지며, 인증 없음/만료된 키 요청에는 []가 반환됨
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

카탈로그 피드와 달리 이 본문에는 `tier` 필드가 전혀 없습니다. 서버가
`Authorization` 키를 바탕으로 요청별로 포함할 내용을 결정하므로,
`x-omniroute-feed-tier` 응답 헤더만이 제공된 티어를 확인할 수 있는 유일한
출처입니다(`referralsSync.ts::syncRadarReferrals`). 헤더가 없거나 인식되지 않으면
최소 권한 가정인 `"community"`로 강등됩니다. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`)는 전체 본문을 검증하며, `feedSchema.ts`에서
내보낸 동일한 추천별 `RadarReferralSchema`를 재사용하므로 두 피드 모두 개별 추천을
동일하게 검증합니다. 모든 `RadarReferral.url`은 `https://`여야 하며,
`http://` URL은 스키마 검증에 실패합니다.

`RadarFeedSchema`(`feedSchema.ts`)에 있던 기존 카탈로그 내장 `referrals` 필드는
이미 캐시된 카탈로그 피드와의 하위 호환성을 위해 유지되지만,
`getRadarReferrals()`는 더 이상 이 필드를 읽지 않습니다. 아래의
[접근자](#accessor)를 참조하세요.

### 동기화

`syncRadarReferrals()`(`src/lib/radar/referralsSync.ts`)는 추천을 위해 네트워크에
접근하는 유일한 모듈이며, `syncRadar()`의 계약을 정확히 따릅니다. 플래그 꺼짐
→ `disabled`, 옵트인 false → `opt_out`을 반환합니다. 또한
`${RADAR_FEED_URL}/v1/referrals/latest`를 다운로드하고(카탈로그와 동일한
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` 포크 재정의 사용), 정확한 응답 바이트에 대한
Ed25519 서명을 검증하며(`verifyFeedBytes`), `RadarReferralsFeedSchema`에 따라
검증한 후 `radar_referrals_cache` 테이블(마이그레이션
`142_radar_referrals_cache.sql`)에 캐시합니다. 이 테이블은 카탈로그의
`radar_feed_cache`와 완전히 분리되어 있습니다. 10 MB 응답 제한과
`generatedAt` 하한을 적용하여 캐시된 피드보다 오래된 수신 피드를 거부함으로써,
이전에 서명된 아티팩트의 재전송 공격을 방지합니다. 타임스탬프가 같으면
허용됩니다. 서버는 의도적으로 커뮤니티 추천 변형과 활성 추천 변형에 동일하고
결정적인 `generatedAt`을 부여하므로, 기본 링크 집합이 변경되지 않더라도 후원자 키
변경 후 서명된 페이로드와 제공 티어가 달라질 수 있습니다. 예외를 발생시키지 않고
항상 상태 객체를 반환하며, 오류의 `reason`에는 스택 트레이스가 절대 포함되지
않습니다.

두 트리거가 추천 캐시를 최신 상태로 유지하며, 둘 다 카탈로그 자체의 24시간 주기와
독립적으로 동작합니다.

- **읽기 시 동기화** — `GET /api/radar/referrals` 자체가 응답을 제공하기 전에,
  캐시가 없거나 `REFERRALS_STALE_MS`보다 오래된 경우(1시간,
  `shouldSyncReferralsOnRead()`) 인라인으로 `syncRadarReferrals()`를 호출합니다.
  덕분에 백그라운드 타이머를 기다리지 않고 바로 다음 대시보드 로드에서 고정 링크가
  "항상 최신" 상태로 제공됩니다.
- **스케줄러 보조 동기화** — `radarSchedulerTick()`(`scheduler.ts`)은 카탈로그에
  사용되는 동일한 시간별 틱에서 추천의 오래됨 여부를 독립적으로 평가하고, 동기화
  시점이 되면 `syncRadarReferrals()`를 호출합니다. 이는 해당 틱에 카탈로그 자체의
  동기화 시점이 되었는지와 관계없이 실행되며, `RadarTickResult`의 형태에 영향을
  주지 않습니다(최선형 보조 효과일 뿐이며, 오류는 무시됨).

### 접근자

`src/lib/radar/index.ts`는 두 개의 읽기 전용 접근자를 내보냅니다. 둘 다 예외를
발생시키지 않습니다(`getRadarCatalog()`과 동일한 방어적 계약으로, 플래그 꺼짐,
캐시 없음 또는 손상된 캐시 페이로드는 모두 오류 대신 빈 형태로 처리됨).

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  `radar_referrals_cache`에서 읽고(`getRadarReferralsCache()`를 통해)
  `RadarReferralsFeedSchema`로 검증합니다. 카탈로그 캐시는 사용하지 않습니다.
- `getDefaultReferralFor(provider)` → 해당 provider에 대해 `isDefault: true`인
  `fixed` 추천을 반환하거나, 없으면 `null`을 반환합니다. `fixed`만 확인하며,
  캠페인은 provider의 "기본" 링크로 절대 사용되지 않습니다.

실제 "어떤 추천이 provider의 기본 추천인가"라는 규칙은
`findDefaultReferral()`(`src/lib/radar/referrals.ts`)에 있으며, 이는 **DB import가
없는** 작은 순수 함수입니다. 따라서 `"use client"` 컴포넌트로 안전하게 가져올 수
있습니다. `getRadarReferrals`/`getDefaultReferralFor`(`index.ts`에 있음)는
`@/lib/db/radar`를 가져오므로 서버 전용으로 유지됩니다. 브라우저 번들에
`better-sqlite3`가 포함되지 않도록 provider 대시보드는 `index.ts` 대신
`referrals.ts`를 직접 가져옵니다(아래 참조).

### `GET /api/radar/referrals`

다른 모든 Radar 라우트와 정확히 동일한 게이트 순서를 따릅니다. `RADAR_ENABLED` 꺼짐 →
`404`(가장 먼저 확인하며, 바이트 단위로 동일한 비활성 상태 유지); 미인증 →
`401`; 그 외에는 데이터가 오래된 경우 동기화 후 읽기(sync-on-read)를 트리거하고(위 내용 참조), 이후
`{ fixed, campaigns, tier }`와 함께 `200`을 반환합니다. `tier`는 (방금 새로 고쳐졌을 수도 있는)
캐시 행에서 그대로 가져오며, 순수하게 정보 제공용입니다(아래 UI의 소프트 업셀 문구에 사용).
피드 서버를 직접 프록시하지 않습니다. 라우트 자체의 소스에는 `fetch(` 호출이 없으며,
네트워크 요청은 오직 `syncRadarReferrals()` 내부에서만 발생합니다. 이는
`/api/radar/catalog`과 동일한 로컬 캐시 전용 원칙입니다.

### 대시보드 UI — `/dashboard/radar`의 "무료 크레딧" 탭

새 라우트를 만드는 대신 기존 Radar 페이지(`src/app/(dashboard)/dashboard/radar/page.tsx`)를
두 번째 탭으로 재사용합니다. 페이지가 이미 가져오는 데이터의 변형에 해당하는 기능이므로
라우팅/i18n 범위를 줄일 수 있습니다. 옵트인한 후 탭 표시줄에는
**카탈로그**(기존 테이블)와 **무료 크레딧**이 표시됩니다.

- 고정 링크는 제공자별로 그룹화되며, 각각 `requiredAction`(있는 경우)과
  추천 URL로 연결되는 `target="_blank" rel="noopener noreferrer"` 버튼을 표시합니다.
- 캠페인에도 동일한 정보를 표시하며, `validUntil`이 있는 경우 이를 추가로 표시합니다.
- `campaigns`가 비어 있고 **동시에** 제공된 티어가 `community`인 경우, UI에
  짧은 업셀 안내 문구("기간 한정 캠페인은 후원자 전용 추가 혜택입니다")를 표시합니다. 이 문구는
  고정 링크 목록을 **절대로** 숨기거나 제한하지 않으며, 고정 링크 목록은 모든 티어에서 항상
  전체 항목을 유지합니다. 업셀은 부드러운 안내 문구일 뿐, 어떤 것도 차단하지 않습니다.

### 제공자 이름의 추천 링크(제공자 대시보드)

`ProviderPageHeader`(`src/app/(dashboard)/dashboard/providers/[id]/components/`)는
이미 `providerInfo.website`가 있는 경우 제공자 이름을 해당 주소에 연결하며,
수익화 링크의 선례도 하나 있습니다. 바로 Kimi(Moonshot AI) 파트너 링크 안내
(`providers.kimiPartnerLinkNote` i18n 키)입니다. D28은 새로운 키를 도입하는 대신
Radar 기본 추천에 정확히 동일한 눈에 띄지 않는 안내 패턴을 재사용합니다.

의도적으로 느슨하게 결합합니다.

- `resolveProviderHeaderLink()`(`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)는
  **순수** 함수입니다. `(staticWebsite, referralUrl) => { website, isReferralLink }`
  형태이며 `@/lib/radar` 또는 `@/lib/db/*`에 의존하지 않습니다. `providerPageUtils.ts`
  전체에도 이러한 import가 없으며, 이는
  `tests/unit/provider-header-referral-link.test.ts`에서 검증됩니다.
- `ProviderDetailPageClient.tsx`(`"use client"` 컴포넌트)는 Radar 데이터를 가져올 수 있는
  유일한 위치입니다. Radar 대시보드 페이지 자체와 동일한 로컬 라우트 패턴인
  `fetch("/api/radar/referrals")`를 사용하며, DB에 의존하지 않는
  `src/lib/radar/referrals.ts`의 `findDefaultReferral()`을 통해 클라이언트 측에서
  기본 추천을 계산합니다.
- `RADAR_ENABLED`가 꺼져 있으면 fetch가 404를 반환하고, `referralUrl`은 `null`로 유지되며,
  `resolveProviderHeaderLink()`은 정적 카탈로그 `website`를 변경하지 않고 반환합니다.
  따라서 제공자 페이지는 이 기능이 존재하기 전과 바이트 단위로 동일합니다. 아직 캐시가 없거나
  해당 제공자에 대한 기본 추천이 없는 경우에도 결과는 동일합니다.
- 기본 추천이 적용되는 경우 `ProviderPageHeader`는 `isReferralLink`를 전달받아
  Kimi 파트너 링크와 동일한 눈에 띄지 않는 안내/툴팁을 표시합니다
  (`providers.kimiPartnerLinkNote` 키 재사용). 별도의 새로운 시각적 표현은
  절대로 도입하지 않습니다.

---

## 피드를 셀프 호스팅하는 방법

카탈로그를 완전히 제어하려는 포크 또는 셀프 호스팅 운영자는 클라이언트 코드를 수정하지 않고도 자체 피드 서비스를 실행할 수 있습니다.

1. `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`)를 충족하는 JSON 본문을 반환하는 `GET /v1/catalog/latest` 엔드포인트를 제공하세요. 최상위 필드는 `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks`, `totals`입니다. `x-omniroute-radar-schema: 2`를 준수하세요. 전환 호환 서버는 이 헤더가 없는 요청에 대해 별도로 서명된 v1 아티팩트를 기본값으로 제공해야 합니다.
2. Ed25519 키 쌍으로 정확한 응답 바이트에 서명하고, base64 서명을 `x-omniroute-feed-signature` 응답 헤더에 반환하세요.
3. `RADAR_FEED_URL`을 새 기본 URL로 설정하고 `RADAR_FEED_PUBKEY`를 해당 공개 키(base64-DER SPKI 또는 PEM)로 설정하세요. 자세한 내용은 [환경 변수 참조](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)를 확인하세요.
4. `RADAR_ENABLED`를 활성화하고 `POST /api/radar/settings`를 통해 옵트인하세요
   (`{ optIn: true }`).

다른 코드는 변경할 필요가 없습니다. `verifyFeedBytes()`가 재정의를 자동으로 인식하며(`src/lib/radar/pinnedKeys.ts`의 `getFeedPublicKeys()`), 버전 비교, 스키마 검증 및 병합 규칙은 셀프 호스팅 피드에도 동일하게 적용됩니다.

추천 링크(위의 [추천 링크(무료 크레딧)](#referral-links-free-credits) 참조)는 별도의 선택적 아티팩트입니다. `/v1/catalog/latest`만 제공하는 포크도 완전히 작동합니다. `/v1/referrals/latest`가 `404`를 반환하면 `syncRadarReferrals()`는 `{ status: "error" }`로 정상적으로 성능 저하되며 캐시는 비어 있는 상태로 유지됩니다. 따라서 페이지의 나머지 부분에서 오류가 발생하는 대신 `GET /api/radar/referrals`는 계속해서 `{ fixed: [], campaigns: [], tier: null }`을 반환합니다. 추천 링크도 제공하려면 `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`)를 충족하는 `GET /v1/referrals/latest`를 제공하고 카탈로그 피드와 동일한 Ed25519 키 쌍으로 서명하세요.

후원자 혜택도 선택적 아티팩트입니다. 이를 제공하려면 폐쇄형 `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`)를 사용하여 `GET /v1/offers/latest`를 구현하고, 유효한 라이브 권한을 요구하며, `x-omniroute-feed-tier: live`를 반환하고, 동일한 키로 정확한 바이트에 서명하세요. 이 엔드포인트를 생략하는 포크에서도 카탈로그 및 추천 기능의 동작은 변경되지 않습니다. 혜택 새로 고침은 기존 데이터에 영향을 주지 않고 실패하며 마지막으로 검증된 로컬 혜택 캐시는 계속 사용할 수 있습니다.

Intel도 같은 방식으로 선택 사항입니다. 셀프 호스팅 운영자는 `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`)를 사용하여 `GET /v1/intel/latest`를 제공하고, 유효한 라이브 권한을 요구하며, `x-omniroute-feed-tier: live`를 반환하고, 공유 Ed25519 키로 정확한 바이트에 서명할 수 있습니다. 이 엔드포인트를 생략해도 카탈로그, 추천 및 혜택에는 변화가 없으며, Intel 새로 고침은 마지막으로 검증된 로컬 스냅샷을 보존합니다.

---

## 관련 문서

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — `/api/radar/*` 라우트가 따르는 오류 응답 패턴입니다.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` 참조입니다.
