# OmniRoute MCP Server Documentation (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> 라우팅, 캐시, 압축, 메모리, 스킬, 프록시, 풀, Radar 및 컨텍스트 소스 작업 전반에 걸쳐 110개의 도구를 제공하는 Model Context Protocol 서버입니다.
>
> 기준 소스: `open-sse/mcp-server/server.ts`는 `countUniqueMcpTools()`를 사용하여 **110개의 고유 도구**를 계산합니다. 여기에는 45개의 표준 정의(6개의 CCR 수명 주기 도구, 에이전트 스킬 도구 3개, `omniroute_radar_catalog`, `omniroute_x_search` 포함)와 메모리(3), 스킬(4), GitHub 스킬(3), 풀(6), 게임화(8), 플러그인(8), Notion(6), Obsidian(22), 로컬 코퍼스(3), 그리고 RTK 전용 압축 도구 2개가 포함됩니다.

## 설치

OmniRoute MCP는 기본 제공됩니다. 다음 명령으로 시작합니다.

```bash
omniroute --mcp
```

또는 open-sse 전송 방식을 통해 시작합니다.

```bash
# HTTP 스트리밍 가능 전송 방식(포트 20130)
omniroute --dev  # MCP가 /mcp 엔드포인트에서 자동으로 시작됨
```

HTTP 전송 방식(`sse` / `streamable-http`, 대시보드 서버가 동일 프로세스 내에서 제공)은
기본적으로 비활성화되어 있으며, 이전에는 `/dashboard/mcp` 페이지에서만 전환할 수 있었습니다. v3.8.51부터는
CLI에서도 동일한 기능을 제공합니다.

```bash
omniroute mcp status                                  # 활성화/온라인 여부, 전송 방식, 도구 수
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # 활성 sse/streamable-http 세션 재설정
```

`mcp enable`/`mcp disable`은 대시보드가 `/api/settings`를 통해 전환하는 것과 동일한 `mcpEnabled`
설정(선택적으로 `mcpTransport`도 포함)을 PATCH합니다. `mcp restart`는 `POST /api/mcp/restart`를 호출합니다. 이 명령은
활성 `sse`/`streamable-http` 세션을 종료하여 다음 요청이 초기화부터 정상적으로 다시 시작되도록 하며,
MCP가 비활성화된 경우 `409`, `stdio` 전송 방식인 경우 `501`을 반환합니다(stdio 클라이언트는 자체
하위 프로세스를 소유하므로 동일 프로세스 내에서 재시작할 수 있는 핸들이 없습니다).

## 전송 방식

MCP 서버는 세 가지 전송 방식을 제공하며, 모두 동일한 `createMcpServer()` 팩토리를 기반으로 합니다.

| 전송 방식         | 위치                                           | 사용 시점                                           |
| :---------------- | :--------------------------------------------- | :-------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE 통합(Claude Desktop, Cursor 등)                 |
| `sse`             | `httpTransport`를 통한 `POST/GET /api/mcp/sse` | 이벤트 스트림이 필요한 브라우저/에이전트 클라이언트 |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | 다중 세션 HTTP 클라이언트(`mcp-session-id` 헤더)    |

활성 HTTP 전송 방식(`sse` 또는 `streamable-http`)은 `mcpTransport` 설정으로 선택합니다. 전송 방식을 전환하면 다른 전송 방식의 기존 세션이 종료됩니다.

### 원격 접근(manage 범위 우회)

`/api/mcp/*`는 LOCAL_ONLY 계층(`src/server/authz/routeGuard.ts`)에 속하므로 기본적으로 루프백 호스트(`localhost`, `127.0.0.1`, `::1`)에서만 접근할 수 있습니다. v3.8.2부터 루프백이 아닌 클라이언트도 `manage` 범위를 가진 키를 `Authorization: Bearer <api-key>`로 제시하면 연결할 수 있습니다. 터널, 리버스 프록시 또는 공개 호스트 이름을 통해 원격 MCP 서버에 접근할 수 있는 유일한 방법입니다.

```bash
# manage 범위 부여: 대시보드의 API Keys 페이지를 열고 키의
# "Management Access"를 활성화하거나, 생성할 때 scopes:["manage"]로 POST합니다.

# 그런 다음 원격 MCP 클라이언트에서 연결합니다.
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` 범위가 없는 키를 사용하거나 Bearer를 제공하지 않으면 `403 LOCAL_ONLY`가 반환됩니다. 인접한 접두사 `/api/cli-tools/runtime/*`는 의도적으로 우회할 수 없습니다. 자세한 내용은 [라우트 가드 계층 — manage 범위 예외](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)를 참조하세요.

## IDE 구성

Claude Desktop, Cursor, Cline 및 호환되는 MCP 클라이언트 설정은 [MCP 클라이언트 구성](../guides/SETUP_GUIDE.md#mcp-client-configuration)을 참조하세요.

---

## 필수 도구(14개) — 1단계

| 도구                            | 범위                  | 설명                                                                                                                            |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | 가동 시간, 메모리, 회로 차단기, 속도 제한, 캐시 통계                                                                            |
| `omniroute_list_combos`         | `read:combos`         | 구성된 모든 콤보와 전략(선택적 메트릭 포함)                                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | 특정 콤보의 성능 메트릭                                                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | 콤보 활성화 또는 비활성화                                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | 기존 콤보 API를 통해 검증된 콤보 생성                                                                                           |
| `omniroute_check_quota`         | `read:quota`          | 사용된/전체 할당량, 남은 비율, 재설정 시간, 토큰 상태                                                                           |
| `omniroute_route_request`       | `execute:completions` | OmniRoute 라우팅을 통해 채팅 완성 요청 전송                                                                                     |
| `omniroute_cost_report`         | `read:usage`          | 기간별 비용 보고서(세션/일/주/월)                                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | 기능, 상태 및 가격 정보를 포함한 전체 모델 카탈로그                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | 로컬 서명된 Radar 카탈로그. 선택적으로 제공자/제품군 필터 사용 가능                                                             |
| `omniroute_tool_search`         | `read:tools`          | 등록된 MCP 카탈로그에서 도구 검색                                                                                               |
| `omniroute_web_search`          | `execute:search`      | 구성된 검색 제공자를 통한 웹 검색. X/Twitter는 제외됩니다.                                                                      |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok을 통해 X를 검색하거나, Xquik API 결과를 위해 `xquik-search`를 선택합니다. 선택한 백엔드의 자격 증명이 필요합니다. |
| `omniroute_web_fetch`           | `execute:search`      | 구성된 가져오기 제공자를 통해 웹 콘텐츠 가져오기                                                                                |

## 고급 도구 (11) — 2단계

| 도구                               | 범위                                 | 설명                                                                          |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | 폴백 트리를 사용한 드라이 런 라우팅 시뮬레이션                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | 성능 저하/차단/알림 동작이 포함된 세션 예산                                   |
| `omniroute_set_routing_strategy`   | `write:combos`                       | 런타임에 콤보 전략 업데이트(priority/weighted/auto 등)                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` 복원력 프리셋 적용                 |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | 실제 업스트림 호출을 사용해 콤보의 모든 제공자를 실시간 테스트                |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 지연 시간 및 회로 차단기 상태가 포함된 제공자별 메트릭            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | 예산/지연 시간 제약 조건에 따라 작업 유형별 콤보 추천                         |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | 요청이 특정 제공자로 라우팅된 이유 설명(점수 산정 요소 + 폴백)                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | 전체 세션 스냅샷: 비용, 토큰, 상위 모델/제공자, 오류, 예산 가드               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | 끊어진 콤보 참조/고아 행 같은 데이터베이스 드리프트 진단(및 선택적 자동 복구) |
| `omniroute_sync_pricing`           | `pricing:write`                      | 외부 소스(LiteLLM)에서 가격 데이터 동기화; `dryRun` 지원                      |

## 캐시 도구 (2)

| 도구                    | 범위          | 설명                                      |
| :---------------------- | :------------ | :---------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | 시맨틱 캐시, 프롬프트 캐시 및 멱등성 통계 |
| `omniroute_cache_flush` | `write:cache` | 전역 또는 시그니처/모델별 캐시 비우기     |

## 압축 도구 (13)

| 도구                                | 범위                | 설명                                                                                          |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | 압축 설정, 분석 요약 및 캐시 인식 통계(`analytics.mcpDescriptionCompression` 메타데이터 포함) |
| `omniroute_compression_configure`   | `write:compression` | 압축 모드, 임계값, 목표 비율, 시스템 프롬프트 보존 및 MCP 설명 압축 토글 구성                 |
| `omniroute_set_compression_engine`  | `write:compression` | 활성 엔진(off/caveman/rtk/stacked) 및 Caveman/RTK 강도 선택                                   |
| `omniroute_list_compression_combos` | `read:compression`  | 명명된 압축 콤보 및 해당 엔진 파이프라인 목록 표시                                            |
| `omniroute_compression_combo_stats` | `read:compression`  | 압축 콤보 및 엔진별로 그룹화된 분석                                                           |
| `omniroute_ccr_store`               | `write:compression` | 호출자별로 격리된 콘텐츠를 제한된 인메모리 CCR 저장소에 저장하고 마커와 `ccr://` 참조 반환    |
| `omniroute_ccr_retrieve`            | `read:compression`  | 전체 또는 헤드, 테일, 줄, grep 및 통계 모드로 CCR 콘텐츠 검색                                 |
| `omniroute_ccr_inspect`             | `read:compression`  | 콘텐츠를 반환하지 않고 호출자 소유 CCR 메타데이터 검사                                        |
| `omniroute_ccr_list`                | `read:compression`  | 호출자 소유 CCR 블록의 페이지네이션된 메타데이터 목록 표시                                    |
| `omniroute_ccr_delete`              | `write:compression` | 호출자 소유 CCR 블록 삭제                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | 호출자 범위의 메모리 사용량, 수명 주기 카운터 및 저장소 제한 보고                             |
| `omniroute_rtk_discover`            | `read:compression`  | 옵트인 RTK 출력 샘플에서 반복되는 노이즈 탐색                                                 |
| `omniroute_rtk_learn`               | `read:compression`  | 옵트인 샘플에서 검토 가능한 RTK 필터 초안 생성                                                |

CCR 항목은 인메모리에만 존재하며 재시작하면 사라집니다. 각 블록은 2 MiB, 각
주체는 16 MiB, 전역 저장소는 64 MiB로 제한됩니다. 항목의 기본 TTL은 24시간입니다(최대
7일). 전체 MCP 검색은 256 KiB로 제한되며, 더 큰 블록은 범위 지정 및
grep 모드를 통해 계속 사용할 수 있습니다. 저장, 검색, 목록 표시, 검사, 삭제 및 통계는
인증된 API 키 주체별로 격리됩니다. 감사 기록에는 해시와 크기 메타데이터만 포함되며 콘텐츠는 포함되지 않습니다.

`omniroute_compression_status`는 MCP 설명 압축을
`analytics.mcpDescriptionCompression` 아래에 별도로 보고합니다. 해당 값은 MCP에서 목록 조회가 가능한
설명(`tools`, `prompts`, `resources`, `resourceTemplates`)의 메타데이터 크기 추정치이며, 제공자 사용량
영수증이 아니므로 `source: "mcp_metadata_estimate"`로 표시됩니다.

### MCP 접근성 트리 필터 (v3.8.0)

위의 압축 도구와 별개로, OmniRoute에는 MCP 브라우저/접근성 도구의 **도구 결과**가
에이전트에 반환되기 전에 압축하는 실행 후 필터가 포함되어 있습니다. 이 필터 자체는 도구가 아니며,
상세한 접근성 트리 또는 브라우저 스냅샷 텍스트(2,000자 이상)가 포함된 모든 도구 결과에 투명하게
적용됩니다.

주요 동작:

- 연속으로 30줄 이상 반복되는 형제 항목을 앞부분 + 뒷부분 요약으로 축약
- Playwright/computer-use에 필요한 `[ref=eXX]` 앵커 보존
- 지나치게 큰 텍스트(50,000자 초과)를 탐색 힌트와 함께 강제 잘라내기
- 예상 절감률: 브라우저 스냅샷 페이로드의 **60~80%**

구성: 전역 설정의 `compression.mcpAccessibility`(마이그레이션 056).
구현: `open-sse/services/compression/engines/mcpAccessibility/`.
전체 문서: [압축 엔진 — MCP 접근성 트리 필터](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

이러한 도구의 기반이 되는 런타임 압축 모델은 [압축 엔진](../compression/COMPRESSION_ENGINES.md) 및 [RTK 압축](../compression/RTK_COMPRESSION.md)을
참조하세요.

## 1Proxy 도구 (3)

| 도구                        | 범위           | 설명                                                                            |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy 마켓플레이스에서 무료 프록시 가져오기(프로토콜/국가/품질/개수 제한 필터) |
| `omniroute_oneproxy_rotate` | `read:proxies` | 전략별로 다음 사용 가능한 프록시 가져오기(`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | 풀 통계, 동기화 상태, 프로토콜 및 국가별 분포                                   |

## 메모리 도구 (3)

`open-sse/mcp-server/tools/memoryTools.ts`에 정의되어 있습니다. 인증/범위는 표준 MCP 범위 파이프라인을 통해 적용됩니다.

| 도구                      | 범위           | 설명                                                                             |
| :------------------------ | :------------- | :------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | 토큰 예산 제한을 적용하여 쿼리 / 유형 / API 키별로 메모리 검색                   |
| `omniroute_memory_add`    | `write:memory` | 새 메모리 항목 추가(`factual` / `episodic` / `procedural` / `semantic`)          |
| `omniroute_memory_clear`  | `write:memory` | API 키의 메모리를 삭제하며, 선택적으로 유형 또는 `olderThan` 타임스탬프로 필터링 |

## 스킬 도구 (4)

`open-sse/mcp-server/tools/skillTools.ts`에 정의되어 있습니다. `src/lib/skills/registry` + `src/lib/skills/executor`를 기반으로 합니다.

| 도구                          | 범위             | 설명                                                                        |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API 키, 이름 또는 활성화 상태로 선택적으로 필터링하여 등록된 스킬 목록 조회 |
| `omniroute_skills_enable`     | `write:skills`   | ID로 특정 스킬 활성화 또는 비활성화                                         |
| `omniroute_skills_execute`    | `execute:skills` | 제공된 입력으로 스킬을 실행하고 실행 기록 반환                              |
| `omniroute_skills_executions` | `read:skills`    | 최근 스킬 실행 기록 목록 조회                                               |

## Notion 컨텍스트 소스 (6)

`open-sse/mcp-server/tools/notionTools.ts`에 정의되어 있습니다. 토큰은 `src/lib/db/notion.ts`를 통해 `key_value` 테이블에 저장됩니다. REST 클라이언트는 `src/lib/notion/api.ts`에 있습니다. 설정 API는 `src/app/api/settings/notion/route.ts`에 있습니다. 대시보드 UI는 `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`에 있습니다.

엔드포인트 대시보드의 **컨텍스트 소스** 탭 또는 REST API를 통해 Notion 통합 토큰을 구성하세요.

```bash
# 토큰 설정
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# 상태 확인
curl http://localhost:20128/api/settings/notion

# 연결 해제
curl -X DELETE http://localhost:20128/api/settings/notion
```

| 도구                         | 범위           | 설명                                                    |
| :--------------------------- | :------------- | :------------------------------------------------------ |
| `notion_search`              | `read:notion`  | 모든 페이지와 데이터베이스에서 전문 검색                |
| `notion_get_page`            | `read:notion`  | ID로 페이지와 해당 속성 가져오기                        |
| `notion_list_block_children` | `read:notion`  | 페이지 또는 블록의 하위 블록 목록 조회                  |
| `notion_query_database`      | `read:notion`  | 필터, 정렬 및 페이지네이션을 사용하여 데이터베이스 쿼리 |
| `notion_get_database`        | `read:notion`  | ID로 데이터베이스 스키마 가져오기                       |
| `notion_append_blocks`       | `write:notion` | 상위 블록에 하위 블록 추가(요청당 최대 100개)           |

## 에이전트 스킬 카탈로그 도구 (3)

`open-sse/mcp-server/tools/agentSkillTools.ts`에 정의되어 있습니다. `src/lib/agentSkills/catalog`을 기반으로 합니다. 이러한 도구는 45개 항목으로 구성된 에이전트 스킬 문서 카탈로그를 MCP 클라이언트와 외부 에이전트에 제공합니다. 범위: `read:catalog`.

| 도구                              | 범위           | 설명                                                                                                                                    |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | 선택적 `category`(api\|cli) 및 `area` 필터를 사용하여 45개 에이전트 스킬을 모두 나열하며, 메타데이터와 커버리지를 반환                  |
| `omniroute_agent_skills_get`      | `read:catalog` | 정식 `id`를 기준으로 단일 스킬의 전체 메타데이터와 SKILL.md 콘텐츠 조회                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | 커버리지 통계: API 스킬 23개, CLI 스킬 21개, config 스킬 1개 중 파일 시스템에 SKILL.md 파일이 있는 항목 수와 카탈로그 전체 항목 수 비교 |

전체 카탈로그와 외부 에이전트의 사용 방법은 [AGENT-SKILLS.md](./AGENT-SKILLS.md)를 참조하세요.

## 관련 프레임워크 (v3.8.0)

위의 MCP 도구 인벤토리(`countUniqueMcpTools()`로 계산된 고유 도구 110개)는 의도적으로
런타임 라우팅/캐시/압축/메모리/스킬/프록시/컨텍스트 소스 작업으로 범위가 한정되어 있습니다. 인접한 두
프레임워크가 v3.8.0에서 MCP 서버와 함께 제공되며 별도로 문서화되어 있습니다.

### 클라우드 에이전트

클라우드 에이전트는 LLM 제공자에 사용되는 것과 동일한 연결 모델을 통해 OmniRoute에 연동된
프로세스 외부 AI 코딩 에이전트(codex-cloud, cursor-cloud, devin, jules)입니다. 이들은
자체 REST 인터페이스(`/api/v1/agents/*`)를 통해 노출되며 MCP 도구 카탈로그의 일부가
**아닙니다**. 즉, 클라우드 에이전트를 호출해도 MCP 범위가 소비되지 않습니다.

- 구현: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- 수명 주기: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- 문서: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### 가드레일

가드레일은 채팅 파이프라인 내부에 적용되는 실행 전/후 필터(vision-bridge, pii-masker, prompt-injection)입니다.
MCP 도구/라우트 계층에 도달하기 전에 실행되며 구조화된 위반 정보를 감사 파이프라인으로 내보냅니다. MCP 도구로
호출되지는 않습니다.

- 구현: `src/lib/guardrails/`.
- 문서: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

차단된 것으로 보이는 MCP 호출을 디버깅할 때는 MCP 감사 로그
(`scope_denied:*` 항목)와 가드레일 감사 추적을 모두 확인하세요. 요청이 MCP 범위 적용 계층에
도달하기 **전에** 가드레일에 의해 거부될 수 있습니다.

---

## REST API 엔드포인트

| 엔드포인트             | 메서드                | 설명                                                                                      | 인증              |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------- | :---------------- |
| `/api/mcp/status`      | `GET`                 | 서버 상태: 하트비트, HTTP 전송 상태, 감사 활동 요약                                       | 관리(세션/관리자) |
| `/api/mcp/tools`       | `GET`                 | 도구 카탈로그(이름, 설명, 범위, 단계, 소스 엔드포인트)                                    | 관리              |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE 전송 엔드포인트(`mcpEnabled` + `mcpTransport === "sse"`로 제한)                       | API 키 + 범위     |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | 스트리밍 가능 HTTP 전송(`mcp-session-id` 헤더 사용, `DELETE`는 세션 종료)                 | API 키 + 범위     |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit`의 감사 로그 항목(필터: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | 관리              |
| `/api/mcp/audit/stats` | `GET`                 | 집계된 감사 통계(`totalCalls`, `successRate`, `avgDurationMs`, 상위 도구)                 | 관리              |

소스 파일: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

설정에서 MCP 서버가 활성화되고(`mcpEnabled`) 적절한 `mcpTransport`가 선택될 때까지 SSE와 스트리밍 가능 HTTP 전송은 모두 차단됩니다. 잘못된 전송이 구성된 경우 라우트는 설정 전환 안내와 함께 HTTP 400을 반환합니다.

---

## 인증 및 스코프

MCP 도구는 API 키 스코프를 통해 인증됩니다. 스코프 적용은
`open-sse/mcp-server/scopeEnforcement.ts`에서 중앙 집중식으로 관리됩니다. 각 도구에는 특정 스코프가 필요합니다:

| 범위                  | 도구                                                                                                                                                                          |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 읽기 도구 13개 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 쓰기 도구 9개 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

와일드카드 범위가 지원됩니다. `read:*`는 모든 읽기 범위를 부여하고, `*`는 전체 액세스 권한을 부여합니다.

### `mcp:connect` — 제한된 라우트 권한 (#7895)

루프백이 아닌 곳에서 HTTP/SSE MCP 전송(`/api/mcp/*`)에 접근하려면
`/api/mcp/` LOCAL_ONLY 예외 처리가 필요합니다(`docs/security/ROUTE_GUARD_TIERS.md` 참조). 이전에는
이 예외 처리가 전체 `manage`/`admin` 범위 API 키만 허용했는데, 이는 MCP와 통신하기만 하면 되는
호출자에게는 지나치게 광범위했습니다. 이제 `src/shared/constants/managementScopes.ts`는
`MCP_CONNECT_SCOPE = "mcp:connect"`를 내보냅니다. 이는 `SELF_USAGE_SCOPE`와 같은 선례를 따르는
추가적이고 제한적인 범위로, `src/server/authz/policies/management.ts`에서 `/api/mcp/` 우회만
승인합니다. 다른 관리 라우트에 대한 액세스 권한은 부여하지 않으며, 의도적으로
`MANAGEMENT_API_KEY_SCOPES`에서 제외되어 있습니다. `manage`/`admin`을 보유한 키는 여전히
기존과 동일하게 예외 처리를 통과하며, `mcp:connect`는 원격 MCP 전용 호출자를 위한
낮은 권한의 대안으로서 `hasMcpConnectOrManageScope()`를 통해 확인됩니다.

### 키별 HTTP 범위 바인딩 (#7895)

HTTP/SSE를 사용할 때 `open-sse/mcp-server/httpTransport.ts`는 이제
`resolveMcpCallerAuthInfo()`(`open-sse/mcp-server/httpAuthContext.ts`)를 통해 호출자의 실제
`api_keys.scopes`를 확인하고 이를 MCP SDK의 `transport.handleRequest(req, { authInfo })`에
전달합니다. 따라서 각 도구 호출에 전달되는 `extra.authInfo.scopes`에는 Bearer 키 자체의
범위가 반영됩니다. `scopeEnforcement.ts`의 `resolveCallerScopeContext()`는 이미 `_meta` 및
`OMNIROUTE_MCP_SCOPES` 환경 변수 폴백보다 `authInfo`를 우선시했습니다. 이번 변경은 이전에는
HTTP를 통해 제공되지 않았던 이 최우선 소스만 채웁니다. 확인되는 API 키가 없는 경우
(헤더 없음, 유효하지 않은 키) `authInfo`는 `undefined`로 유지되며, 범위 확인은 변경 없이
기존 `meta`/환경 변수 체인으로 폴백합니다. 이 변경은 `OMNIROUTE_MCP_ENFORCE_SCOPES`의
기본값을 변경하지 않습니다. 적용은 여전히 명시적으로 활성화해야 하며, 이번 변경은
활성화된 경우 키별 경로가 우선하도록 할 뿐입니다. stdio에는 호출자별 ID가 없으므로
(`mcpCallerIdentity.ts` 참조) 영향을 받지 않으며, 계속해서 `_meta`/환경 변수 폴백 체인을
사용합니다.

---

## 환경 변수

| 변수                                    | 기본값                      | 용도                                                                                                                |
| :-------------------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`    | MCP 서버가 OmniRoute 내부 API를 호출할 때 사용하는 기본 URL                                                         |
| `OMNIROUTE_API_KEY`                     | (비어 있음)                 | 내부 API 호출에 `Authorization: Bearer`로 전달되는 API 키                                                           |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"`만 활성화) | 활성화하면 필요한 범위가 누락된 경우 도구 호출을 거부하고 감사 로그에 `scope_denied:<reason>`을 기록                |
| `OMNIROUTE_MCP_SCOPES`                  | (비어 있음)                 | 기본적으로 "사용 가능"한 것으로 간주되는 범위의 쉼표로 구분된 허용 목록(호출자가 자체 범위를 제공하지 않을 때 사용) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (설정되지 않음 = 켜짐)      | `0/false/off/no`로 설정하면 등록 시 MCP 설명 압축을 비활성화                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (설정되지 않음 = 켜짐)      | 위와 동일한 토글의 대체 별칭                                                                                        |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                     | 내부 관리 조회(상태, 복원력, 조합, 할당량, 사용량)의 중단 시간 한도                                                 |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                     | 제공자를 기다리는 홉(`route_request`, `web_search`, `web_fetch`)의 중단 시간 한도                                   |
| `MCP_TOOL_DENY`                         | (설정되지 않음 = 필터 없음) | `tools/list`에서 제외할 도구 이름의 쉼표로 구분된 목록(도구 카디널리티 감소 — 아래 참조)                            |
| `MCP_TOOL_ALLOW`                        | (설정되지 않음 = 필터 없음) | 독점적으로 유지할 도구 이름의 쉼표로 구분된 목록(허용 목록 모드 — 아래 참조)                                        |
| `DATA_DIR`                              | `~/.omniroute`              | 하트비트 파일이 `${DATA_DIR}/runtime/mcp-heartbeat.json`에 기록됨                                                   |

---

## 설명 압축

MCP 도구, 프롬프트 및 리소스 레지스트리는 클라이언트에 노출되는 메타데이터의 크기(따라서 프롬프트 컨텍스트 비용)를 줄이기 위해 등록/목록 조회 시 설명을 압축할 수 있습니다. 구현은 `open-sse/mcp-server/descriptionCompressor.ts`에 있으며, `createMcpServer()` 내부의 `compressMcpRegistryMetadata`를 통해 MCP 서버에 연결됩니다.

- 압축은 구조적 콘텐츠가 변경되지 않도록 보존 블록 추출(코드 스팬, 펜스 코드 블록 등)을 적용한 상태에서 Caveman 규칙 세트(`getRulesForContext("all", "full")`)를 사용해 설명 텍스트에 실행됩니다.
- `key_value` 설정 테이블의 `compression.mcpDescriptionCompressionEnabled` 값(기본값: 활성화)을 통해 배포별로 전환할 수 있으며, UI에서는 **Analytics → MCP 설명 압축**으로 표시됩니다.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` 또는 `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`를 통해 프로세스 전체에서 전환할 수 있습니다.
- 실시간 통계는 `analytics.mcpDescriptionCompression` 아래의 `omniroute_compression_status`를 통해 제공되며, 실제 제공자 사용량 영수증과 구분할 수 있도록 `source: "mcp_metadata_estimate"` 태그가 지정됩니다.

---

## 도구 카디널리티 축소 (F4.3)

설명 압축은 각 도구의 메타데이터를 줄입니다. **도구 카디널리티 축소**는 여기서 한 단계 더 나아가 아예 공지되는 도구의 _개수_를 줄입니다. `tools/list` 매니페스트에 더 적은 도구를 게시하면 클라이언트 모델이 도구 카탈로그에 대해 부담하는 요청당 토큰 비용("계층 5" 압축)이 감소합니다. 구현은 `open-sse/mcp-server/toolCardinality.ts`의 순수 무상태 필터(`reduceToolManifest`)이며, `createMcpServer()`(`open-sse/mcp-server/server.ts`)의 등록 루프에 연결되어 있습니다.

**옵트인이며, 기본적으로 비활성화됩니다.** 필터는 두 환경 변수 중 하나 이상이 설정된 경우에만 실행됩니다. 둘 다 설정되지 않으면 110개의 모든 도구가 변경 없이 공지됩니다.

| 변수             | 모드                                                                                |
| :--------------- | :---------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | 차단 목록 — `tools/list`에서 항상 제외할 도구 이름을 쉼표로 구분한 목록             |
| `MCP_TOOL_ALLOW` | 허용 목록 — 도구 이름을 쉼표로 구분한 목록. 이 도구만 유지되고 나머지는 모두 제외됨 |

`deny`가 `allow`보다 우선합니다. 이름은 쉼표로 구분되고 앞뒤 공백은 제거되며, 빈 항목은 무시됩니다. 예:

```bash
# 카탈로그에서 두 도구 제외
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# 라우팅 및 할당량 도구만 공지(허용 목록 모드)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**필터링된 도구가 제거되는 방식:** 등록은 항상 성공하며, 프로필에서 거부된 도구는 이후 MCP SDK 핸들에서 `.disable()` 처리됩니다. 따라서 해당 도구는 `tools/list`에 표시되지 않지만 연결 구성은 그대로 유지됩니다(재등록 없이 깔끔하게 활성화/비활성화 가능). 프로필 파서는 `readMcpToolProfileFromEnv(process.env)`이며, 두 변수가 모두 비어 있으면 `null`(필터링 없음)을 반환합니다.

`reduceToolManifest`의 기반이 되는 더 풍부한 `ToolProfile` 구조는 범위 교집합 필터링(`allowScopes`, `read:*` 형식의 와일드카드 일치 지원)과 결정론적인 `maxTools` 상한도 지원합니다. 그러나 이 두 설정에는 등록 시점의 전체 매니페스트가 필요하며, 현재는 환경 변수를 통해 **노출되지 않습니다**(`tools/list` 수준의 훅은 후속 작업으로 추적 중). 축소 전후의 매니페스트 토큰 비용을 비교하는 데 `estimateManifestTokens()`를 사용할 수 있습니다.

---

## 런타임 하트비트

stdio 전송은 5초마다 활성 상태를 `${DATA_DIR}/runtime/mcp-heartbeat.json`에 영속화합니다. 대시보드(`/api/mcp/status`)는 이 파일과 PID 활성 상태를 읽어 `online`을 산출합니다. 반면 HTTP 전송은 프로세스 내 `getMcpHttpStatus()`에서 상태를 보고합니다(파일 쓰기 없음).

하트비트 스냅샷에는 다음 내용이 포함됩니다.

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## 감사 로깅

모든 도구 호출은 `open-sse/mcp-server/audit.ts`에 의해 SQLite `mcp_tool_audit` 테이블에 기록됩니다.

- 도구 이름, 인수(도구별 `auditLevel`에 따라 해싱/잘림 처리), 결과
- 밀리초 단위 소요 시간, 성공/실패 플래그, 오류 메시지(해당하는 경우)
- API 키 해시, 타임스탬프
- 범위 거부는 누락된 범위 목록과 함께 `scope_denied:<reason>`으로 기록됨

최근 호출을 검사하려면 대시보드 또는 `/api/mcp/audit` 및 `/api/mcp/audit/stats` REST 엔드포인트를 사용하세요.

---

## 파일

| 파일                                                                     | 용도                                                     |
| :----------------------------------------------------------------------- | :------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP 서버 팩토리, stdio 진입점, 범위가 지정된 도구 등록   |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP 전송(세션 관리)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | 도구 범위 평가 및 호출자 확인                            |
| `open-sse/mcp-server/audit.ts`                                           | 도구 호출 감사 로깅(`mcp_tool_audit`)                    |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio 하트비트 작성기(`mcp-heartbeat.json`)              |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | 도구/프롬프트/리소스 레지스트리의 설명 압축              |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod 스키마 + 도구 레지스트리(`MCP_TOOLS`, 항목 45개)     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2단계 + 캐시 + 1proxy 도구 핸들러                        |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | 압축 도구 핸들러                                         |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | 메모리 도구 정의(도구 3개)                               |
| `open-sse/mcp-server/tools/skillTools.ts`                                | 스킬 도구 정의(도구 4개)                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion 컨텍스트 소스 도구 정의(도구 6개)                 |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | 게이미피케이션 도구 정의(도구 8개)                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | 플러그인 등록 및 관리 도구(도구 8개)                     |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` 엔드포인트                             |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` 엔드포인트                              |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE 전송 라우트                           |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP 전송 라우트            |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` 감사 로그 조회                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` 집계된 감사 지표                  |
| `src/lib/notion/api.ts`                                                  | Notion REST API 클라이언트(재시도, 시간 초과, 오류 분류) |
| `src/lib/db/notion.ts`                                                   | Notion 토큰 영속성 유지(`key_value` 테이블)              |
| `src/app/api/settings/notion/route.ts`                                   | Notion 설정 API(GET/POST/DELETE)                         |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion 토큰 관리 UI                                      |
| `tests/unit/notion-api.test.ts`                                          | Notion API 클라이언트 테스트(7개)                        |
| `tests/unit/notion-tools.test.ts`                                        | Notion 도구 범위 적용 테스트(10개)                       |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB 모듈 테스트(3개)                               |
