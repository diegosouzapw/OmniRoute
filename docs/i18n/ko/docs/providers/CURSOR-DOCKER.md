# Cursor Provider in Docker Environments (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute가 Docker 내부에서 실행될 때는 컨테이너에서 호스트의 Cursor 설치를 볼 수 없으므로 기존 **Cursor IDE에서 가져오기** /
`cursor-agent` 흐름이 실패합니다. 대신 **Cursor로 로그인**(deep-control PKCE)을 사용하세요.

## Docker에서 IDE / CLI 가져오기가 실패하는 이유

1. **파일 시스템 격리** — 자동 가져오기는 컨테이너 _내부_에서
   `~/.config/Cursor/User/globalStorage/state.vscdb` 같은 Linux 경로를 찾습니다.
   macOS용 Docker Desktop에서는 호스트 IDE DB가 기본적으로 마운트되지 않으며,
   호스트가 Darwin인 경우에도 컨테이너 OS는 Linux입니다.
2. **`cursor-agent` 바이너리 없음** — 공식 OmniRoute 이미지에는
   `cursor-agent`가 포함되어 있지 않습니다. 이전에는 사용 가능한 모델을 확인하기 위해
   `cursor-agent --list-models`를 셸에서 실행한 후 정적 카탈로그로 폴백했습니다.
3. **잘못된 바이너리** — macOS용 `cursor-agent`를 Linux
   컨테이너에 바인드 마운트하지 **마세요**. 실행되지 않습니다.

## 권장 방법: Cursor로 로그인

1. **대시보드 → 제공업체 → Cursor**를 엽니다.
2. **Cursor로 로그인** 탭을 선택합니다.
3. **Cursor로 로그인**을 클릭합니다. 그러면 OmniRoute가 **호스트** 브라우저에서
   `https://cursor.com/loginDeepControl?…`를 엽니다.
4. 브라우저에서 로그인을 승인한 다음 대시보드로 돌아갑니다. OmniRoute는
   토큰이 도착할 때까지 `api2.cursor.sh/auth/poll`을 폴링합니다.
5. OmniRoute는 **액세스 + 새로 고침** 토큰을 저장하고
   `https://api2.cursor.sh/auth/exchange_user_api_key`를 통해 갱신합니다.

이 경로에서는 컨테이너 내부에 Cursor IDE 또는 `cursor-agent`가 필요하지 않습니다.

## 모델 검색

로그인된 연결이 있으면 **사용 가능한 모델 / 자동 동기화**는 연결의 Bearer 토큰을 사용하여 Cursor의
HTTP `AiService/AvailableModels` 카탈로그를 우선적으로 사용합니다.
실패하면 OmniRoute는 호스트의 `cursor-agent`가 있을 경우 이를 시도한 다음
정적 레지스트리 시드를 사용합니다.

OmniRoute는 카탈로그에 항상 **`auto`**(표시 이름 “Auto”)를 노출하며,
OpenCodex 스타일 라우터 모드인 **`auto-cost`**, **`auto-balance`**,
**`auto-intelligence`**도 함께 노출합니다. 전송 시 이들은 Cursor의 `default` 모델로
매핑되며, 세 가지 변형에는 `optimization` ModelParameter가 포함됩니다. 프리미엄 모델의
사용량을 모두 소진했을 때는 `cu/auto`를 우선 사용하세요. Auto에는 예산이 남아 있는 경우가 많습니다.

### 동기화되면 라이브 카탈로그만 사용

Cursor 모델 동기화가 성공한 후(`cursor-agent --list-models` → 저장된
동기화 카탈로그 또는 위에서 설명한 Bearer 인증 `AvailableModels` 가져오기),
**대시보드**, **`/v1/models`**, **모두 테스트**에는 다음이 표시됩니다.

1. 라이브 동기화에서 반환된 모델
2. 삽입된 자동 라우터 ID: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. 운영자가 추가한 **사용자 지정** 모델(가져오기 / 수동) — 동기화로 제거되지 않음

`open-sse/config/providers/registry/cursor/` 아래의 대규모 정적 레지스트리는
**오프라인 폴백 전용**입니다. 동기화된 항목이 비어 있거나 검색이 실패하면 목록은
해당 레지스트리로 폴백합니다.

노력 수준 접미사가 붙은 ID(예: `claude-4.6-sonnet-high`)는 런타임에 여전히
**요청**할 수 있습니다. `resolveRequestedModel`은 해당 접미사를 제거하여 전송용
`ModelParameter`로 변환합니다. 전용 목록에서는 의도적으로 이러한 정적 변형을
모두 테스트에서 숨겨, 검사가 Cursor에서 실제로 사용 가능하다고 반환한 모델과 일치하도록 합니다.

### 헬퍼

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — 대시보드 병합
- `ensureCursorAutoCatalogEntry` — 검색 + 목록 표시 시 auto* 삽입
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` 정적 루프

## 제공업체 한도(할당량)

Cursor의 **사용량 → 제공업체 한도**는 PKCE 또는 토큰 가져오기 이후
`api2.cursor.sh`의 Bearer API(`GetCurrentPeriodUsage` → 사용량 요약 → auth/usage)를
사용합니다. 기존 cookie/`cursor.com` 대시보드 경로는 이전 IDE 가져오기 세션을 위한
최후의 폴백으로 유지됩니다.

기간 창에는 일반적으로 **합계**, **Auto + Composer**, **API**가 포함됩니다. 한도가
비어 있는 것처럼 보이면 **Cursor로 로그인**을 다시 실행하거나 토큰을 다시 가져오세요
(더 이상 IDE 가져오기만 수행할 필요는 없습니다).

## 빈 응답 턴 / 사용량 소진

Cursor가 Run을 수락했지만 어시스턴트 텍스트를 반환하지 않는 경우(프리미엄
사용량이 소진되었을 때 흔함), OmniRoute는 단순한 “제공업체가 빈 콘텐츠를 반환했습니다”가
아니라 조치 가능한 **429**(할당량 단서) 또는 안내가 포함된 **502**를 표시합니다.
`not_found: AI Model Not Found`(사용량 기간 소진)와 같은 스트리밍 실패는
**Cursor 요청 속도 제한 / 사용량 초과**로 분류되며 SSE 파이프라인 전체에서 해당
메시지가 유지됩니다(공유 빈 스트림 가드는 이미 출력된 오류를 덮어쓰지 않음).
제공업체 한도를 확인하고 **`auto`** 모델을 시도하거나 Cursor 요금제 한도를 늘리세요.

## 클라이언트 버전(헤드리스)

로컬 `cursor-agent` 설치가 없으면 OmniRoute는 먼저 env
`CURSOR_AGENT_CLI_VERSION`을 사용하고, 그다음 디스크에 캐시된 Cursor 설치 프로그램
스크립트 스크레이핑 결과를 사용하며, 마지막으로 고정된 빌드 ID를 사용하여
`x-cursor-client-version`을 확인합니다. 필요한 경우
`CURSOR_AGENT_CLI_VERSION`으로 재정의하세요.

## 폴백: 수동 토큰 가져오기

브라우저 로그인을 완료할 수 없는 경우:

1. 호스트에서 Cursor의 `state.vscdb`로부터 토큰을 추출합니다.

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor 인증 모달에서 **토큰 가져오기**를 엽니다.
3. **액세스 토큰**을 붙여넣고, 가능한 경우 **새로 고침 토큰**도 붙여넣습니다
   (자동 갱신에 필요). 머신 ID는 선택 사항입니다.

액세스 토큰만 가져오는 방식도 작동하지만 새로 고침 토큰이 없으면 만료됩니다.
채팅에서 인증 오류가 반환되면 다시 가져오세요.

## 관련 문서

- Zed Docker 안내: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor 로그인 참고 자료(외부):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
