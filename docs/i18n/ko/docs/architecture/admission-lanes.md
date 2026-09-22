# Admission lanes (#9654) — two lane systems, what gates each, where each reports (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute에는 범위가 서로 다른 **두 가지** 프로세스 로컬 레인 시스템이 있습니다. 이들은
상호 보완적이므로 운영자는 현재 보고 있는 시스템이 어느 것인지 알아야 합니다.

## 1. 바이트 수준의 프로세스 전체 승인 제어 (`chatBodyAdmission.ts`)

- **범위:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses` 및
  기타 채팅 형태의 라우트에 사용되는 버퍼링된 본문/힙 경로입니다. 대용량
  코딩 에이전트 본문으로 인한 힙 증폭을 방지합니다(#4380).
- **키별 레인이 아닌 단일 프로세스 전역 컨트롤러(#10110).** 모든 API 키
  (해시됨) 또는 `anonymous` 세션은 **동일한** 공유 예산에 대해 승인됩니다.
  해시된 세션 ID는 공정성 스케줄링 키(대기 요청 간 라운드 로빈 디스패치)로만
  사용되며, 용량 샤드로는 절대 사용되지 않습니다. 이 문서의 이전 버전에서는
  독립된 용량을 가진 키별 레인을 설명했지만, 인증되지 않은 가짜 자격 증명을
  통해 프로세스 전체 한도를 늘릴 수 있었기 때문에 #10110에서 해당 모델이
  제거되었습니다.
- **게이트(#503-fanout): 고정된 요청 수가 아니라 자동 산출되는 수집 바이트
  예산.** 레거시 `CHAT_MAX_HEAVY_IN_FLIGHT` 요청 수 제한(이 수정 전 기본값 `1`)은
  코딩 에이전트 팬아웃(여러 서브에이전트/CLI, 통상적으로 256 KB를 초과하는
  본문)의 실효 동시성을 약 1로 떨어뜨려, 완전히 정상적인 부하에서도 503
  오류를 발생시켰습니다. 이제는 운영자가 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`를
  명시적으로 설정한 경우에만 적용됩니다. 설정하지 않으면 승인은 대신
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`에 의해 제어됩니다. 이는 프로세스의 실제
  메모리 상한(`src/shared/middleware/admissionBudget.ts`)을 기반으로 자동 산출되는
  예산입니다. V8 힙 한도와 cgroup/컨테이너 한도 중 더 엄격한 값의 25%를
  8배의 일시적 증폭 계수로 나눈 뒤, 8 MiB에서 2 GiB 사이로 제한합니다.
  명시적 재정의에도 동일한 제한이 적용됩니다. 따라서 환경 변수 조정 없이도
  512 MB 컨테이너부터 32 GB 데스크톱까지 자동으로 확장됩니다. 유효 예산에
  들어갈 수 없는 본문은 즉시 `413 body_exceeds_budget` 오류로 실패하며,
  개별적으로 처리 가능한 본문 간의 경합만 제한된 공정성 큐에 진입합니다.
  실시간 다중 신호 리소스 압력 추적기(V8 힙 비율, cgroup, PSI, OOM 이벤트 —
  `open-sse/utils/resourcePressurePolicy.ts`)는 `high` 압력에서 제한된 대기 시간을
  단축하고, `critical` 압력에서는 바이트를 수집하기도 전에 즉시
  `503 resource_pressure` 오류로 부하를 차단합니다. PSI는 이 유닛의 cgroup
  `memory.pressure`가 존재할 경우 해당 파일에서 읽습니다
  (`open-sse/utils/resourcePressureSampler.ts`). `/proc/pressure/memory`는 호스트
  전체 범위이며 베어 메탈 / cgroup v1에서만 대체 수단으로 사용되므로, 스와핑
  중인 호스트 때문에 유휴 컨테이너에서 503 오류가 발생하지 않습니다.
- **조정:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — 자동 산출되는 바이트 예산의 재정의
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — 레거시 요청 수 제한, 명시적으로 활성화한 경우에만 적용
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 오류 발생 전 큐 대기 시간(기본값 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — 대기 중인 바이트에 대한 힙 안전장치(기본값 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 이후 사용 중단된
    무동작 옵션(구성 호환성을 위해 허용되지만 무시됨)
- **보고:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanout에서
  추가된 `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, `countCapEnabled` 포함
  (기본 배포에서는 false — 실제로 적용되는 제한이 레거시 요청 수 제한이
  아니라 바이트 예산임을 확인).

## 2. 적응형 런타임 가상 레인(`open-sse/services/admission`)

- **범위:** 공급자 디스패치를 위한 테넌트 키 승인 — 큐 비용, 지연 시간 기반
  제한 조정, 레인 큐잉 및 레인 메트릭.
- **게이트:** **옵트인.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true`가 아니면 비활성화됩니다. 이 설정이 없으면
  적응형 컨트롤러는 공유 큐 동작을 유지합니다(#9654의 기준 1은 운영자가
  레인을 활성화한 후에만 충족됨).
- **튜닝:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + 적응형 구성(`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **보고:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants`(불투명한 레인 ID이며 원시
  키는 절대 노출하지 않음), 그리고 `virtualLanes` — 스냅샷에서 "레인이 활성화됨"을 나타내는 권위 있는 플래그.

## 3. 팬아웃 프로브 — 콤보/퓨전의 대상별 승인(#9654 Wave 2)

콤보(우선순위/라운드 로빈)와 퓨전은 하나의 상위 요청 아래에서 N개의 모델 대상을
팬아웃합니다. #9654 Wave 2부터 **각 팬아웃 대상은 디스패치 전에** 상위 요청의
테넌트 레인을 기준으로 대상별 프로브(`PerTargetAdmissionHook`, `createPerTargetAdmissionHook`으로 빌드됨)에 의해
게이트됩니다.

- **범위:** 콤보, 퓨전 및 카오스 엔진이 디스패치하는 모든 팬아웃 대상.
  시스템 1(바이트 수준)은 영향을 받지 않습니다. 이 시스템은 팬아웃 대상을 프로브하지 않습니다.
- **게이트:** **시스템 2와 함께 옵트인.** `OMNIROUTE_CHAT_VIRTUAL_LANES`가
  설정되지 않은 경우 아무 작업도 수행하지 않습니다. 해당 모드에서는 상위 요청이 이미 공유 큐 리스를 보유하고 있으므로,
  프로브하면 이중으로 계산되어 콤보 대상이 거부되기 때문입니다.
- **의미 체계:**
  - **엄격한 비차단 방식 — 큐에 넣지 않고 건너뜁니다.** `maxWaitMs 0`: 레인이 가득 차면
    대상을 건너뛰고 콤보의 폴백 메커니즘(또는 퓨전의 생존 패널)이
    대신 처리합니다. 이는 의도된 동작입니다. 팬아웃 대상은 중복 작업이며,
    이를 큐에 넣으면 레인이 차단하도록 설계된 바로 그 혼잡에 부하를 더하기
    때문입니다. 따라서 `defaultMaxWaitMs`는 **상위 요청에만** 적용됩니다.
    팬아웃 프로브는 절대 대기하지 않으며, 대기하도록 만드는 **설정 옵션도 의도적으로
    제공하지 않습니다**(이슈 기록에 따르면 대기 옵션은 #9654가 방지하는 대규모
    502/504 유형의 오류를 유발했습니다. 운영자가 팬아웃 대상을 건너뛰는 동작이
    응답 품질을 저하시킨다고 보고하는 경우에만 재검토해야 합니다).
  - **승인 시 해제.** 승인된 프로브는 리스를 즉시 해제합니다. 이는 용량
    게이트이지 점유가 아닙니다. 상위 요청의 리스가 팬아웃을 포괄하므로, N개의
    추가 리스를 유지하면 공유 활성 비용이 부풀려져 다른 테넌트가 거부될 수 있습니다.
    이는 예약이 아닌 최선형 처리입니다. 프로브와 디스패치 사이에 레인이 다시 찰 수 있으므로,
    경합이 심한 경우 게이트가 대상을 승인했더라도 대상이 디스패치될 때는 레인이
    다시 가득 찬 상태일 수 있습니다.
  - **실제 팬아웃 본문을 기준으로 비용 산정.** 프로브는 대상의 실제 본문을 바탕으로
    비용을 추정합니다. 여기에는 상위 요청 경로와 정확히 동일하게 `stream`
    플래그에서 파생된 요청 클래스가 포함됩니다. 따라서 퓨전 패널 구성원(`stream: false`)은
    실제로 점유하게 될 비스트리밍 클래스 기준으로 비용이 산정되고, 우선순위/RR
    대상은 사용자가 요청한 설정을 기준으로 비용이 산정됩니다.
- **보고:** 첫 번째 대상 이후에 프로브를 건너뛰면 콤보의 요청별
  `fallbackCount`가 증가합니다(기존 폴백 의미 체계를 반영하며 콤보
  로그에서 확인 가능). 모든 패널 구성원을 건너뛰면 퓨전은 503을 반환합니다. 현재
  스냅샷에는 **집계 카운터**(예: `virtualFanoutSkipped`)가 없습니다.
  운영자가 레인 게이트가 팬아웃 대상을 얼마나 자주 건너뛰는지 알 수 없다고
  보고하면 이를 추가해야 합니다.

## 대시보드에 표시되는 항목

- `adaptiveAdmission.laneCount` / `laneTenants` → **적응형 가상 레인**(시스템 2).
- `adaptiveAdmission.virtualLanes === true` → 섹션 3의 팬아웃 프로브도
  활성 상태입니다. `virtualLanes`가 없거나 `false`인 페이로드는
  `OMNIROUTE_CHAT_VIRTUAL_LANES`가 설정되지 않았음을 의미합니다. 바이트 수준 레인(시스템 1)은
  여전히 활성 상태이지만, 이 기능을 활성화하기 전까지는 `adaptiveAdmission` 아래의 어떤 기능도
  (팬아웃 게이팅도 포함하여) 적용되지 않습니다.

## 두 가지가 모두 존재하는 이유

바이트 수준 레인은 메모리를 많이 사용하는 구문 분석/압축 경로를 제한하고, 적응형 레인은
테넌트별 디스패치 비용을 제한합니다. #9654의 기준 1("한 세션의 버스트로 인해
다른 세션에서 503이 발생하지 않아야 한다")은 시스템 1에서 항상 적용되며, 옵트인 기능이 활성화되면
시스템 2에서도 적용됩니다.

## 4. 단일 프로세스의 장시간 `/v1/responses`(충분한 여유 메모리)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)에서
`tryAcquireHealthyHeadroom`을 추가하여, 힙이
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` 미만일 때 구조적으로 부하가 큰 두 번째 요청을 허용합니다.
`admitChatRequest`에서 사용하는 BYTE 경로(본문 크기 ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
기본값 256 KiB, `POST /v1/responses` 포함)는 **동일한** 예외 처리 방식을 사용합니다.

이는 장시간 실행되는 SSE `/v1/responses` 요청을 2개보다 많이 동시에 처리하기 위해 지원되는
**단일 프로세스** 구성 방법입니다. 힙과 프로세스 전체의 처리 중 바이트 예산
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)이 허용하는 범위 내에서만 기본 한도와 충분한 여유 메모리 한도를
높이십시오. 수십 개의 장시간 SSE 클라이언트(40~50개)를 처리할 수 있는지는 메모리 예산의
문제이지, 제품에 하드코딩된 “최대 2개” 제한의 문제가 아닙니다. 힙에 압박이 가해지면 여전히
재시도 가능한 `503`으로 요청을 차단하므로 #7849 문제가 다시 발생하지 않습니다.

**힙을 여러 개로 늘리려면** 각각 독립적인 `DATA_DIR`을 사용하는 N개의 프로세스를 실행하십시오(#11024).
하나의 SQLite 파일에서 절대로 `replicas > 1`을 사용하지 마십시오(#10350). 이 섹션은
DATA_DIR 스케일아웃 방법을 다시 논의하기 위한 것이 아닙니다.
