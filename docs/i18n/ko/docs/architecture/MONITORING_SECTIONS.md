# Monitoring & Costs — Navigation Structure (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> 그룹 B(계획 16)에서 구현되었습니다. `src/shared/constants/sidebarVisibility.ts`를 참조하세요.

---

## 상위 수준 탐색

그룹 B 적용 후 대시보드 사이드바에는 다음과 같은 최상위 섹션이 순서대로 표시됩니다.

```
홈
제공자
콤보
API 키
설정
분석
비용          ← 신규(그룹 B, 계획 16)
모니터링      ← 재구성됨(그룹 B, 계획 16)
...
```

---

## 비용 섹션(신규, 수준 1)

경로 접두사: `/dashboard/costs/`

| 항목        | URL                                  | 설명                                  |
| ----------- | ------------------------------------ | ------------------------------------- |
| 개요        | `/dashboard/costs`                   | 집계된 비용 대시보드(분석에서 이동됨) |
| 가격        | `/dashboard/costs/pricing`           | 모델별 가격표                         |
| 예산        | `/dashboard/costs/budget`            | 예산 임계값 + 알림                    |
| 할당량 공유 | `/dashboard/costs/quota-share`       | 할당량 공유 풀 + 사용량               |
| 요금제 구성 | `/dashboard/costs/quota-share/plans` | 제공자별 요금제 재정의                |

**근거**: 가격, 예산 및 할당량 공유는 이전에
`모니터링 > 비용 매개변수` 아래에 있었습니다. 이를 전용 최상위 섹션으로 이동하여
관측성 도구를 거치지 않고도 쉽게 찾을 수 있도록 했습니다.

---

## 모니터링 섹션(재구성됨)

이제 모니터링 섹션에는 맨 위에 **활동**이 있고 그 아래에 **3개의 하위 그룹**이 있습니다.

```
모니터링
├── 활동                 ← 타임라인 피드(최상위 항목)
├── 로그 그룹
│   ├── 로그(전체)
│   ├── 프록시 로그
│   └── 콘솔 로그
├── 감사 그룹
│   ├── 감사 로그
│   ├── MCP 감사
│   └── A2A 감사
└── 시스템 그룹
    ├── 상태
    └── 런타임
```

### 이전 구조에서 변경된 사항

| 이전                                                                | 이후                                    |
| ------------------------------------------------------------------- | --------------------------------------- |
| 활동 = 감사 로그를 렌더링하는 로그 내 탭                            | 활동 = 전용 피드(`/dashboard/activity`) |
| 모니터링 내 비용 매개변수 그룹                                      | 비용 섹션으로 이동됨                    |
| 평면 목록: 로그, 활동(로그), 감사, 상태, 런타임, 가격, 예산, 할당량 | 구조화된 3개 그룹 + 전용 비용 섹션      |

---

## 활동과 감사 로그의 차이

이제 두 항목은 서로 구분됩니다.

| 구분            | 활동(`/dashboard/activity`)                         | 감사 로그(`/dashboard/audit`)               |
| --------------- | --------------------------------------------------- | ------------------------------------------- |
| **목적**        | 사용자용 이벤트 피드("최근에 무슨 일이 있었는가")   | 규정 준수/보안 로그                         |
| **데이터 소스** | `GET /api/compliance/audit-log?level=high`          | `GET /api/compliance/audit-log?level=all`   |
| **형식**        | 날짜별로 그룹화된 타임라인, 읽기 쉬운 동사 + 아이콘 | 페이지당 50개 항목의 조밀한 페이지네이션 표 |
| **필터**        | 이벤트 유형 범주                                    | 작업, 심각도, 행위자, 날짜 범위             |
| **내보내기**    | 사용할 수 없음                                      | JSON 내보내기                               |
| **행위자 필터** | 해당 없음                                           | 행위자별 필터링 가능                        |
| **표시 이벤트** | 상위 수준 작업만 표시(허용 목록)                    | 모든 감사 이벤트                            |

### 상위 수준 작업 허용 목록

`src/lib/audit/highLevelActions.ts`에 정의되어 있습니다. 활동 피드에 표시되는
이벤트를 제어합니다. 허용 목록에는 다음이 포함됩니다.

- 제공자 추가/제거/테스트 이벤트
- 콤보 생성/업데이트/삭제
- API 키 수명 주기(생성, 해지, 교체)
- 예산 임계값 도달
- 인증 로그인/로그아웃
- 클라우드 에이전트 세션 생성
- MCP 도구 등록
- Webhook 생성/삭제
- 할당량 풀/요금제 변경(`quota.*` 작업, 그룹 B)
- 플랫폼 이벤트(업데이트, 배포)
- 스킬 설치/제거

이 목록에 없는 이벤트는 감사 로그에만 표시됩니다.

### 새로운 상위 수준 작업 추가

`src/lib/audit/highLevelActions.ts`를 편집하고 작업 문자열을
`HIGH_LEVEL_ACTIONS`에 추가하세요. 이 작업에는 PR이 필요합니다(목록은 코드이며 DB에서 구성할 수 없습니다).
해당 아이콘은 `src/lib/audit/activityIcons.ts`에 추가할 수 있습니다.

---

## 리디렉션: `/dashboard/logs/activity`

이전 경로 `/dashboard/logs/activity`는
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`의 `permanentRedirect()`를 통해
`/dashboard/activity`로 영구 리디렉션(HTTP 308)됩니다.

기존 사이드바 ID `logs-activity`는 이전 ID를 참조하는 사용자 프리셋이 손상되지 않도록
`HIDEABLE_SIDEBAR_ITEM_IDS`에 유지되지만 `SIDEBAR_DEFINITIONS`에서는 제거됩니다.

---

## i18n

그룹 B에서 추가된 네임스페이스:

| 네임스페이스 키         | 적용 범위                                          |
| ----------------------- | -------------------------------------------------- |
| `sidebar.costsSection`  | 비용 섹션 레이블                                   |
| `sidebar.activity`      | 활동 사이드바 항목                                 |
| `sidebar.logsGroup`     | 로그 하위 그룹 레이블                              |
| `sidebar.systemGroup`   | 시스템 하위 그룹 레이블                            |
| `sidebar.costsOverview` | 비용 개요 항목                                     |
| `activity.*`            | 모든 활동 페이지 문자열(제목, 동사, 필터, 빈 상태) |

기준 로케일은 `pt-BR` 및 `en`입니다. 나머지 40개 로케일은
`next-intl` 대체 메커니즘(`src/i18n/config.ts`에서 구성됨)을 통해 영어로 대체됩니다.
