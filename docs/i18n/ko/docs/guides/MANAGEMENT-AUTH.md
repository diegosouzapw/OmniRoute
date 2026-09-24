# Management Authentication (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute에는 관리 경로를 인증할 수 있는 **네 가지 자격 증명 패밀리**가 있습니다.
이들은 상호 교환할 수 없습니다. 추론 API 키(`sk-…`)는 `manage` 또는 `admin` 스코프가 명시적으로 부여되지 않는 한 서버를 관리하지 **않습니다**.

표준 구현: `src/lib/api/requireManagementAuth.ts`.

| 자격 증명               | 일반적인 형식                  | 생성 위치                                       | 용도                 | 관리 기능                                                            |
| ----------------------- | ------------------------------ | ----------------------------------------------- | -------------------- | -------------------------------------------------------------------- |
| 대시보드 JWT 세션       | `auth_token` 쿠키              | 대시보드 로그인                                 | 브라우저 UI          | CSRF, 지역성, 상시 보호 경로 규칙에 따라 전체 대시보드 관리          |
| CLI 머신 ID 토큰        | 내부 / 로컬                    | CLI 부트스트랩 (동일 머신에서 `omniroute`)      | 로컬 CLI             | 로컬 관리만 가능                                                     |
| 스코프 지정 액세스 토큰 | `oma_live_…`                   | **설정 → 액세스 토큰** 또는 `omniroute connect` | 원격 CLI 및 관리 API | 경로에 필요한 `read`, `write`, 또는 `admin` 스코프를 충족해야 합니다 |
| 추론 API 키             | `sk-…` (및 기타 API 키 접두사) | **API 관리자 / API 키**                         | `/v1/*` 추론         | 키 메타데이터에 `manage` 또는 `admin`이 포함되지 않는 한 **없음**    |

`oma_` 자격 증명은 관리/CLI 자격 증명입니다. 이들은 추론 API 키가 **아닙니다**.

서버에 대한 로그인/API 키 인증이 비활성화된 경우, 일부 관리 경로는 인증되지 않은 호출을 수락할 수 있습니다. 로컬 전용 및 상시 보호 경로는 여전히 자체 규칙을 적용합니다. 따라서 이러한 자격 증명 중 하나를 제시하는 것이 보편적으로 필수는 아니며, 필요한 스코프와 경로 지역성 없이는 자격 증명을 소유하는 것만으로는 보편적으로 충분하지 않습니다.

관련: [원격 모드](./REMOTE-MODE.md) (`oma_live_…`가 원격 CLI용으로 발행되는 방법).

---

## 스코프 매트릭스

API 키 관리 스코프와 액세스 토큰 스코프는 서로 다른 용어입니다.
MCP 도구 스코프는 아래 표의 어떤 함수보다 `scopeMatches`로 확인되는 세 번째 용어입니다.
나란히 비교: [세 가지 스코프 네임스페이스](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### 액세스 토큰 스코프 (`oma_live_…`)

| 스코프  | 일반적인 작업                                               |
| ------- | ----------------------------------------------------------- |
| `read`  | 토큰이 볼 수 있도록 허용된 목록/상태 GET 요청               |
| `write` | 관리자 권한 미만의 변경(생성/업데이트/삭제)                 |
| `admin` | 전체 원격 CLI / 연결 토큰 (여기서 암호 부트스트랩이 기본값) |

`read` 스코프를 가진 토큰은 `write` 경로를 호출할 수 없습니다. 런타임 메시지 형식:
`액세스 토큰 스코프 '<have>'가 불충분합니다; '<need>'가 필요합니다.`

### API 키 관리 스코프

| 스코프   | 의미                                                             |
| -------- | ---------------------------------------------------------------- |
| (없음)   | 추론 전용. 관리 경로는 403을 반환합니다.                         |
| `manage` | 관리 API (`requireManagementAuth` API 키 브랜치와 동일한 게이트) |
| `admin`  | `hasManageScope`도 충족합니다 (관리 가능으로 처리됨)             |

API 키 / API 관리자 UI에서 키에 `manage`를 활성화하십시오. 의도적으로 해당 스코프를 부여하지 않는 한, 채팅 클라이언트 키를 자동화에 재사용하지 마십시오.

---

## 생성 및 취소 방법

### 대시보드 JWT 세션

1. `/login`을 열고 관리 비밀번호(최초 부팅 시 `INITIAL_PASSWORD`)로 로그인합니다.
2. `auth_token` 쿠키는 HttpOnly입니다. 브라우저 대시보드에서 자동으로 사용합니다.
3. `/api/auth/logout`을 통해 로그아웃합니다. 복사할 장기 유지 보안 비밀은 없습니다.

### CLI 머신 ID 토큰

1. 서버와 **동일한 호스트**에서 `omniroute`를 실행합니다(루프백).
2. CLI가 `~/.omniroute/` 아래에 머신 ID 토큰을 부트스트랩합니다(chmod 600).
3. 다른 머신에서는 **작동하지 않습니다**. 원격 CLI에는 액세스 토큰을 사용하십시오.

### 범위 지정 액세스 토큰(`oma_live_…`)

1. 대시보드: **설정 → 액세스 토큰** → 생성(이름 + 범위). **보안 비밀은 한 번만 표시됩니다.**
2. 또는 CLI: `omniroute connect <host>`(비밀번호 → 토큰). [원격 모드](./REMOTE-MODE.md)를 참조하십시오.
3. 헤더: `Authorization: Bearer oma_live_…`
4. 동일한 액세스 토큰 페이지에서 취소하거나 CLI 컨텍스트를 삭제합니다.
5. 서버는 해시만 저장합니다. 일반 텍스트를 비밀번호처럼 취급하십시오.

### 관리 범위 API 키

1. 대시보드: **API 관리자 / API 키** → 키 생성 또는 편집 → `manage`(또는 `admin`) 활성화.
2. 헤더: `Authorization: Bearer sk-…`(키의 실제 접두사).
3. 동일한 UI에서 취소하거나 `manage`를 제거합니다.
4. CLI가 아닌 자동화에는 최소 권한 원칙을 적용하십시오. GET 전용 작업에는 `read` 액세스 토큰을 우선 사용하고, 호출자가 `/v1`과 관리 API를 모두 사용해야 하는 경우에만 API 키에 `manage`를 부여하십시오.

---

## 헤더 형식

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

관리 자격 증명을 URL 경로나 쿼리 문자열에 넣지 마세요. 관리 인증은 헤더/쿠키로만 수행됩니다.

---

## 복사하여 붙여넣을 수 있는 예시

읽기 전용(제공자 목록 조회). `read` 액세스 토큰을 사용하세요:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

변경 작업(제공자 연결 생성). `write`/`admin` 액세스 토큰 또는 `manage` 범위의 API 키를 사용하세요:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

추론(관리 작업 아님). 일반 API 키를 사용하며, `manage`는 필요하지 않습니다:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## 현재 런타임 오류 (보안 정보를 노출하지 마십시오)

| 상황                                       | 일반적인 상태 | 메시지 (정제됨)                                                            |
| :----------------------------------------- | :------------ | :------------------------------------------------------------------------- |
| 자격 증명 없음                             | 401           | `인증 필요`                                                                |
| 유효하지 않거나 만료된 `oma_live_…`        | 401           | `유효하지 않거나 만료된 액세스 토큰`                                       |
| `manage`/`admin` 권한이 없는 유효한 API 키 | 403           | `API 키에 'manage' 스코프가 없습니다. API 키 대시보드에서 활성화하십시오.` |
| 관리 경로에서 유효하지 않은 일반 API 키    | 403           | `유효하지 않은 관리 토큰`                                                  |
| 액세스 토큰 스코프가 너무 낮음             | 403           | `액세스 토큰 스코프 '<have>'가 불충분합니다; '<need>'가 필요합니다.`       |

"유효하지 않은 관리 토큰"은(는) 베어러가 관리 자격 증명으로 **수락되지 않았음**을 의미합니다. 어떤 계열을 생성해야 하는지는 알려주지 않습니다. 위 표를 참조하십시오: 추론 키에는 `manage` 스코프가 필요합니다; 원격 CLI에는 `oma_live_…`가 필요합니다; 대시보드는 세션 쿠키를 사용합니다.

---

## 권장되는 최소 권한 선택

| 호출자                                 | 사용                                                   |
| :------------------------------------- | :----------------------------------------------------- |
| 브라우저                               | 대시보드 세션                                          |
| 서버 호스트의 CLI                      | 머신 토큰                                              |
| 원격 서버와 통신하는 노트북의 CLI      | `omniroute connect`의 `oma_live_…`                     |
| CI / 스크립트 (관리 전용)              | 작동하는 가장 작은 범위의 `oma_live_…`                 |
| `/v1`과 `/api`를 모두 호출해야 하는 CI | `manage` 권한이 있는 API 키 **또는** 두 개의 자격 증명 |
