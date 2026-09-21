# Plugin Marketplace (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **신뢰할 수 있는 원본:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, 및
> `src/app/(dashboard)/dashboard/plugins/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 WordPress 스타일의 플러그인 시스템을 제공합니다. 플러그인은 각각 `plugin.json` 매니페스트와 엔트리 파일을 포함하는 독립적인 디렉터리이며, 요청 파이프라인(`onRequest` / `onResponse` / `onError`)과 수명 주기 이벤트(`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`)에 후킹됩니다.

**플러그인 마켓플레이스**는 이 시스템 위에 구축된 검색 계층입니다. 설치 가능한 플러그인을 탐색할 수 있는 카탈로그를 제공합니다. 기본적으로 카탈로그는 소규모 내장 시드 레지스트리를 사용합니다. 운영자는 사용자 지정 원격 레지스트리 URL을 지정할 수 있으며, 이 경우 DNS 확인 방식의 SSRF 보호 장치로 가져오기 작업을 강화합니다([보안](#security) 참조).

모든 플러그인 라우트는 **루프백 전용**(Tier 1 — `LOCAL_ONLY`)입니다. 플러그인은 자식 프로세스에서 코드를 로드하고 실행하므로, 인증 여부와 관계없이 루프백이 아닌 출처에서는 해당 라우트에 접근할 수 없습니다. [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)를 참조하세요.

## 전체 구성

```
대시보드 (/dashboard/plugins)
  ├─ "설치됨" 탭      → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (제거)
  └─ "마켓플레이스" 탭 → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ 사용자 지정 URL 없음 → 내장 SEED_REGISTRY
                            └─ 사용자 지정 URL → isSafeMarketplaceUrl() SSRF 보호 장치
                                               → safeOutboundFetch(guard:"public-only")
```

- **레지스트리 계층** — `src/lib/plugins/marketplace.ts`: 카탈로그를 나열/검색하며, 오류가 발생하면 시드 레지스트리로 대체합니다.
- **수명 주기 계층** — `src/lib/plugins/manager.ts` (`pluginManager` 싱글턴): 설치, 업그레이드, 활성화, 비활성화, 제거, 스캔, 시작 시 로드를 처리합니다.
- **매니페스트 계층** — `src/lib/plugins/manifest.ts`: `plugin.json`을 위한 Zod 스키마 및 기본값입니다.
- **스캐너** — `src/lib/plugins/scanner.ts`: 플러그인 디렉터리 아래의 디스크에 있는 플러그인을 검색합니다.
- **로더** — `src/lib/plugins/loader.ts`: 각 플러그인을 격리된 자식 프로세스에서 생성하고 IPC를 통해 훅 호출을 중계합니다.

## 마켓플레이스 카탈로그

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`)는 `MarketplaceEntry` 객체 목록을 반환합니다.

| 필드          | 타입     | 참고                                 |
| ------------- | -------- | ------------------------------------ |
| `name`        | string   | kebab-case 플러그인 이름             |
| `version`     | string   | semver                               |
| `description` | string   | 간단한 요약                          |
| `author`      | string   | 작성자/조직                          |
| `license`     | string   | SPDX 스타일 라이선스 ID              |
| `downloadUrl` | string   | 소스 다운로드 URL(비어 있을 수 있음) |
| `repository`  | string?  | 선택적 저장소 URL                    |
| `tags`        | string[] | 검색/필터 태그                       |
| `downloads`   | number   | 다운로드 횟수                        |
| `rating`      | number   | 0–5                                  |
| `verified`    | boolean  | 항목이 검증됨으로 표시되었는지 여부  |
| `lastUpdated` | string   | ISO 형식에 가까운 날짜 문자열        |

사용자 지정 레지스트리 URL이 구성되지 않은 경우 카탈로그는 내장 `SEED_REGISTRY`(현재 `request-logger`, `rate-limiter`, `cost-tracker`, `theme-manager`)를 사용합니다. 시드 레지스트리는 항상 사용할 수 있습니다. 구성된 원격 레지스트리에 접근할 수 없거나, `200`이 아닌 상태를 반환하거나, 인식할 수 없는 본문을 반환하면 `listMarketplacePlugins()`는 경고를 기록하고 시드 목록으로 대체합니다.

> 참고: 마켓플레이스 **카탈로그**(탐색/검색)는 엔드투엔드로 연결되어 있지만, 카탈로그에서 원클릭으로 수행하는 마켓플레이스 **설치**는 아직 구현되지 않았습니다. 현재 마켓플레이스 항목의 대시보드 "설치" 버튼은 "출시 예정" 알림을 표시합니다. 현재 설치는 로컬 경로 설치 흐름(`POST /api/plugins`)과 디스크 내 검색(`POST /api/plugins/scan`)을 통해 수행됩니다.

## REST API

모든 엔드포인트에는 관리 인증(`requireManagementAuth`)이 필요하며 **동시에**
루프백에서만 접근할 수 있습니다. `/api/plugins`와 `/api/plugins/`는
`LOCAL_ONLY_API_PREFIXES`(`src/server/authz/routeGuard.ts`)에 등록되어 있습니다.

| 엔드포인트                       | 메서드 | 설명                                              |
| -------------------------------- | ------ | ------------------------------------------------- |
| `/api/plugins`                   | GET    | 설치된 플러그인 목록 조회(선택적 `?status=` 필터) |
| `/api/plugins`                   | POST   | 절대 로컬 경로에서 플러그인 설치                  |
| `/api/plugins/scan`              | POST   | 플러그인 디렉터리를 스캔하고 새 플러그인 등록     |
| `/api/plugins/marketplace`       | GET    | 마켓플레이스 카탈로그 항목 목록 조회              |
| `/api/plugins/[name]`            | GET    | 설치된 플러그인의 상세 정보 조회                  |
| `/api/plugins/[name]`            | DELETE | 플러그인 제거                                     |
| `/api/plugins/[name]/activate`   | POST   | 활성화(로드 + 훅 등록)                            |
| `/api/plugins/[name]/deactivate` | POST   | 비활성화(`onDeactivate` 실행, 훅 등록 해제)       |
| `/api/plugins/[name]/config`     | GET    | 플러그인 구성 + 구성 스키마 조회                  |
| `/api/plugins/[name]/config`     | PUT    | 플러그인 구성 업데이트(스키마에 따라 검증)        |

`GET /api/plugins`의 `status` 필터는
`installed` / `active` / `inactive` / `error` 중 하나를 허용합니다. 잘못된 값을 지정하면 `400`을 반환합니다.

### 설치된 플러그인 목록 조회

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### 로컬 경로에서 설치

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path`는 반드시 **절대 경로**여야 하며 `..` 탐색 세그먼트나
널 바이트를 포함할 수 없습니다(Zod에서 강제 적용). 소스 디렉터리에는 유효한
`plugin.json`이 있거나, 해당 파일이 있는 디렉터리의 상위 디렉터리여야 합니다. 성공하면
설치된 플러그인 행과 함께 `201` 응답이 반환됩니다.

### 마켓플레이스 탐색

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### 플러그인 구성 업데이트

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config`는 제공된 각 값을 플러그인의
`configSchema`(매니페스트에 선언됨)에 따라 검증합니다. `number` 필드는 `min`/`max`를
준수하며, `select` 필드는 선언된 `enum`과 일치해야 합니다. 스키마에 없는 키도
허용됩니다.

## 구성

### 플러그인 디렉터리

플러그인은 OmniRoute 데이터 디렉터리 아래에 있습니다.

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (또는 manifest.main이 가리키는 파일)
```

`getDefaultPluginDir()`(`src/lib/plugins/scanner.ts`)는 다음 세 단계로 해당 디렉터리를
결정합니다.

1. **`OMNIROUTE_PLUGINS_DIR`**가 설정된 경우 — `HOME` 값과 관계없이 지정된 값을
   그대로 사용합니다. 이는 플러그인 트리가 일반적으로 컨테이너의 홈 디렉터리와
   무관한 경로에 바인드 마운트되는 Docker/K8s를 위한 명시적 설정입니다(#11827).
2. `<home>/.omniroute/plugins`. 여기서 `<home>`은 `HOME` / `USERPROFILE`
   환경 변수에서 가져옵니다.
3. 프로세스가 홈 경로를 전혀 내보내지 않는 경우 `/tmp/.omniroute/plugins`.

결정된 디렉터리는 시작 시 `scanner.dir_resolved`로 한 번 기록되며, 선택된
입력(`OMNIROUTE_PLUGINS_DIR`, `home` 또는 `no-home-fallback`)도 함께 표시됩니다. 따라서
이미지가 조용히 3단계를 사용하게 된 경우 빈 플러그인 목록만 보고하는 대신 그 사실을
명시합니다. `POST /api/plugins/scan`은 해당 위치에서 유효한 `plugin.json`을 포함하는
모든 하위 디렉터리를 검색하고 등록합니다. 동일한 디렉터리가
`pluginManager.install()`이 플러그인을 복사하는 루트이므로, 재정의하면 검색 위치와
설치 위치가 함께 변경됩니다.

> **`OMNIROUTE_PLUGINS_DIR`은 `OMNIROUTE_PLUGIN_PATH`가 아닙니다.** 후자는
> `omniroute` 하위 명령을 추가하는 `omniroute-cmd-*` npm 패키지를 찾기 위해
> CLI 명령 플러그인 로더(`bin/cli/plugins.mjs`)에서만 읽으며, 여기에서 설명하는
> 런타임 스캐너에는 영향을 주지 않습니다. 해당 내용은 [PLUGINS.md](./PLUGINS.md)를
> 참조하세요.

### 사용자 지정 마켓플레이스 레지스트리 URL

마켓플레이스 카탈로그 소스는 `pluginMarketplaceUrl` 설정에서 읽습니다
(`src/lib/plugins/marketplace.ts`는 `settings.pluginMarketplaceUrl`을 읽음).
`http(s)` URL로 설정하면 `listMarketplacePlugins()`는 해당 URL을 가져와 최상위
JSON 항목 배열 또는 `plugins` 배열이 있는 객체를 허용합니다. 문자열 `name`이 없는
항목은 필터링됩니다. 설정되지 않았거나 가져오기가 SSRF 보호에 의해 차단되거나 잘못된
응답을 반환하면 기본 제공 시드 레지스트리가 사용됩니다.

대시보드의 "Marketplace" 탭에는 이 URL을 입력하는 필드가 있습니다
(`GET /api/settings`에서 다시 읽음).

> 구현 참고: 대시보드의 "Save" 작업은 `pluginMarketplaceUrl`을
> `PATCH /api/settings`로 전송합니다. 이 글을 작성하는 시점에는 해당 키가
> `updateSettingsSchema`(`src/shared/validation/settingsSchemas.ts`)에 선언되어 있지
> 않으므로, 이에 의존하기 전에 사용 중인 릴리스에서 설정이 영구 저장되는지
> 확인하세요. 설정 저장소에 키가 존재하기만 하면 **읽기** 경로(`getSettings()` →
> `listMarketplacePlugins()`)에서는 해당 키를 적용합니다.

## 보안

### 라우트 티어 — 루프백 전용

플러그인은 생성된 자식 프로세스에서 코드를 실행하므로 전체 `/api/plugins`
표면은 `LOCAL_ONLY`(티어 1)로 분류됩니다. 루프백 제한은 모든 인증 검사보다
**먼저** 무조건 실행되므로, 유출된 관리 토큰이 터널을 통해 해당 호스트에
도달하더라도 플러그인을 설치, 활성화 또는 제거할 수 없습니다.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)와
엄격한 규칙 #15 / #17을 참조하세요.

### 마켓플레이스 레지스트리 SSRF 가드

사용자 지정 레지스트리 URL은 공격자가 영향을 줄 수 있는 구성이므로,
`listMarketplacePlugins()`는 이를 가져오기 전에 다음 두 계층을 거칩니다.

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:`가 아닌 모든 항목을 거부합니다.
   - 표준 `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`)를 통해 리터럴 비공개/루프백/링크 로컬/ULA 호스트(IPv4에
     매핑된 주소를 포함한 IPv4 **및** IPv6)를 거부합니다.
   - `A`와 `AAAA` 레코드를 **모두** 조회하고, 확인된 주소 중 **하나라도**
     비공개 주소이면 거부합니다. 이를 통해 공개 호스트 이름 → 비공개 IP 우회가 차단됩니다.
   - **실패 시 차단**합니다. DNS 조회 실패 시 URL을 거부합니다.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): 가져오기 시점에 공개 전용 URL
   가드를 다시 적용하고 **리디렉션을 차단**합니다(공개 → 비공개 `30x`
   전환 불가).

어느 계층에서든 URL이 거부되더라도 요청은 중단되지 않습니다. 마켓플레이스는
내장 시드 레지스트리로 조용히 대체하고 경고를 기록합니다.

> 이 가드는 A + AAAA를 모두 조회하고 IPv4 전용 검사 대신 표준
> `isPrivateHost`를 사용하도록 PR #3774에서 특별히 강화되었습니다.

### 플러그인 실행 격리

- **프로세스 격리** — `loadPlugin()` (`src/lib/plugins/loader.ts`)은
  각 플러그인을 별도의 Node.js 자식 프로세스에서 생성하고 IPC를 통해 통신합니다.
  훅 호출에는 `SIGTERM` → `SIGKILL` 단계적 상향이 적용되는 시간 제한이 있습니다.
- **환경 변수 허용 목록** — 자식 프로세스에는 허용 목록에 포함된 환경 변수만
  전달됩니다. 매니페스트가 `env` 권한을 요청하는 경우에만 더 광범위한 변수가
  제공됩니다.
- **경로 제한** — 설치/업그레이드/제거 작업은 복사 또는 재귀적 삭제 전에 플러그인
  디렉터리와 `manifest.main`이 관리되는 플러그인 루트 **내부**로 해석되는지
  확인합니다(변조된 DB 경로와 `manifest.main`의 `../` 경로 순회 방지).
  활성화 시 `realpath`를 통해 심볼릭 링크를 해석하며, 플러그인 디렉터리를 벗어나는
  진입점은 로드하지 않습니다.
- **선택적 무결성 고정** — 매니페스트에서 `integrity`
  (`sha256-<base64>`, SRI 형식) 필드를 선언할 수 있습니다. 이 필드가 있으면 로더는
  로드 시 진입 파일 해시를 검증하며, 불일치할 경우 활성화를 거부합니다. 이는
  선택적으로 사용하는 변조 탐지 기능이며 **보안 경계가 아닙니다**. 실제 경계는
  루프백 전용 라우팅과 권한 모델입니다.

## 매니페스트 (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`)를 통해 검증됩니다.

| 필드               | 타입      | 참고                                               |
| ------------------ | --------- | -------------------------------------------------- |
| `name`             | string    | 필수; 케밥 표기법(`^[a-z0-9-]+$`), 1~100자         |
| `version`          | string    | 필수; semver(`MAJOR.MINOR.PATCH`)                  |
| `description`      | string?   | 500자 이하                                         |
| `author`           | string?   | 200자 이하                                         |
| `license`          | string?   | 기본값은 `MIT`                                     |
| `main`             | string?   | 진입 파일; 기본값은 `index.js`                     |
| `source`           | enum?     | `local` \| `marketplace` (기본값은 `local`)        |
| `tags`             | string[]? | 검색 태그                                          |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                    |
| `hooks`            | object?   | 플러그인이 구현하는 훅을 선언하는 불리언 값        |
| `skills`           | object[]? | 선택적 스킬 정의                                   |
| `enabledByDefault` | boolean?  | 설치 시 자동 활성화                                |
| `configSchema`     | object?   | 구성 필드 맵(`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | 선택적 `sha256-<base64>` 진입 파일 고정            |

권한은 다음 enum에서 선택됩니다.
`network` / `file-read` / `file-write` / `env` / `exec`.

## 수명 주기 흐름

```
설치 (POST /api/plugins, 경로)
  → 매니페스트 스캔/검증 → 스테이징으로 복사 → main이 디렉터리 내부에 있는지 확인
  → ~/.omniroute/plugins/<name>으로 원자적 이름 변경 → DB 행 삽입
  → onInstall 실행 → enabledByDefault인 경우: 활성화

활성화 (POST /api/plugins/{name}/activate)
  → realpath 포함 여부 확인 → loadPlugin() (자식 프로세스 생성)
  → 선언된 훅 등록 → status = "active" → onActivate 실행

비활성화 (POST /api/plugins/{name}/deactivate)
  → onDeactivate 실행 (등록 해제 전) → 훅 등록 해제
  → 자식 프로세스 종료 → status = "inactive"

제거 (DELETE /api/plugins/{name})
  → 활성 상태인 경우 비활성화 → onUninstall 실행
  → 포함 여부를 확인한 후 플러그인 디렉터리를 재귀적으로 삭제 → DB 행 삭제
```

설치된 버전보다 매니페스트 버전이 **엄격하게
최신**인 디렉터리를 대상으로 `install`을 다시 실행하면 자동으로 업그레이드됩니다(새로 설치되며 설정은
기본값으로 초기화됨). 버전이 같거나 이전이면 거부됩니다.

## 데이터베이스

`plugins` 테이블(마이그레이션 `076_create_plugins.sql`):

| 열              | 유형    | 참고                                             |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | 고유                                             |
| `version`       | TEXT    | semver; 기본값 `1.0.0`                           |
| `description`   | TEXT    | 선택 사항                                        |
| `author`        | TEXT    | 선택 사항                                        |
| `license`       | TEXT    | 기본값 `MIT`                                     |
| `main`          | TEXT    | 진입 파일; 기본값 `index.js`                     |
| `source`        | TEXT    | 기본값 `local`                                   |
| `tags`          | TEXT    | JSON 배열; 기본값 `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; 기본값 0                                    |
| `manifest`      | TEXT    | 전체 매니페스트 JSON                             |
| `config`        | TEXT    | JSON; 기본값 `{}`                                |
| `config_schema` | TEXT    | JSON; 기본값 `{}`                                |
| `hooks`         | TEXT    | 선언된 훅 이름의 JSON 배열; 기본값 `[]`          |
| `permissions`   | TEXT    | JSON 배열; 기본값 `[]`                           |
| `plugin_dir`    | TEXT    | 절대 설치 디렉터리                               |
| `error_message` | TEXT    | `status = "error"`일 때 설정                     |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | 활성화 시 설정                                   |

플러그인 메트릭/분석은 추가 테이블
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`)에서 추적됩니다.

## 대시보드

`/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`)의 대시보드 페이지는 두 개의 탭을 제공합니다.

- **설치됨** — 설치된 플러그인을 선언된 훅과 함께 나열하며, 활성화/비활성화 토글, 제거 버튼, "플러그인 검색"
  작업(`POST /api/plugins/scan`)을 제공합니다.
- **마켓플레이스** — `GET /api/plugins/marketplace`에서 가져온 카탈로그와 사용자 지정
  레지스트리 URL을 설정하는 필드를 표시합니다.

플러그인별 설정 페이지는 `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`)에 있습니다.

## 참고 자료

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins`가 루프백 전용(Tier 1)인 이유
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 관련 스킬 프레임워크
  (`src/lib/skills/`); 플러그인은 매니페스트에서 스킬을 선언할 수 있음
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — 이벤트 기반 아웃바운드
  통합
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  모든 플러그인 라우트가 오류 응답에 사용하는 `buildErrorBody()` 패턴
