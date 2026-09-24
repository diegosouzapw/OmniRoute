# Notion Context Source (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **신뢰할 수 있는 원본:** `src/lib/notion/api.ts`(REST 클라이언트), `src/lib/db/notion.ts`
> (토큰 영속성), `open-sse/mcp-server/tools/notionTools.ts`(6개 MCP 도구),
> `src/app/api/settings/notion/route.ts`(설정 API). 도구 등록 및 범위
> 연결은 `open-sse/mcp-server/server.ts`에 있습니다.

## 개요

OmniRoute는 **Notion** 워크스페이스를 **컨텍스트 소스**로 연결할 수 있습니다. 이는
에이전트가 기본 제공 MCP 서버를 통해 접근하는 읽기/쓰기 지식 베이스입니다. Notion
통합 토큰을 구성하면 MCP 도구를 통해 LLM이 페이지와 데이터베이스를 검색하고,
페이지 콘텐츠와 블록 트리를 읽으며, 필터/정렬을 사용해 데이터베이스를 쿼리하고, 새
블록을 추가할 수 있습니다. 이 모든 작업은 OmniRoute를 통해 프록시되며(재시도,
시간 초과 및 오류 분류 포함), 따라서 모델이 Notion API에 직접 접근하지 않습니다.

이 통합은 공식 Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`)를 감싸는 간결하고
견고한 래퍼입니다. 클라이언트(`src/lib/notion/api.ts`)에는 다음 기능이 추가되어
있습니다.

- `429` 및 `5xx`에 대한 **지수 백오프 재시도**(최대 3회).
- `AbortController`를 통한 **55초 요청 시간 초과**.
- **형식화된 오류 분류** — `NotionAuthError`(401/403),
  `NotionNotFoundError`(404), `NotionRateLimitError`(429, `retry after`
  힌트 준수), `NotionValidationError`(400/409), `NotionServerError`(5xx),
  `NotionTimeoutError`.
- 외부에 표시하기 전에 스택 추적과 유사한 부분을 제거하는 **메시지 정제**.

## 설정

Notion 토큰을 위한 **환경 변수는 없습니다**. 토큰은
`src/lib/db/notion.ts`를 통해 SQLite `key_value` 테이블(namespace `notion`,
key `integration_token`)에 저장됩니다. 엔드포인트 대시보드의 **컨텍스트 소스**
탭(`ObsidianSourceCard`와 같은 계층의 `NotionSourceCard`) 또는 설정 REST API를
통해 구성하십시오.

> [!NOTE]
> 토큰은 **Notion 내부 통합 토큰**입니다. <https://www.notion.com/my-integrations>에서
> 통합을 생성한 다음, OmniRoute가 접근하도록 허용할 페이지/데이터베이스를 해당
> 통합과 공유하십시오(Notion의 권한 모델은 워크스페이스 전체가 아닌 공유 기반입니다).

### REST를 통한 구성

```bash
# 통합 토큰 저장 및 검증(POST는 테스트 검색을 실행하여 검증함)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# 연결 상태 확인
curl http://localhost:20128/api/settings/notion

# 연결 해제(저장된 토큰 삭제)
curl -X DELETE http://localhost:20128/api/settings/notion
```

세 메서드 모두 대시보드 인증(`isAuthenticated`)이 필요합니다. `POST` 요청 시
OmniRoute는 토큰을 저장한 후 즉시 결과 1개의 테스트 검색을 실행합니다. Notion이
오류 객체를 반환하면 토큰이 삭제되고 호출은 `400`으로 실패합니다.

## MCP 도구(6개)

`open-sse/mcp-server/tools/notionTools.ts`에 정의되어 있습니다. 토큰은 호출 시점에
`getNotionToken()`을 통해 확인됩니다. 구성된 토큰이 없으면 도구에서
`"Notion 통합 토큰이 구성되지 않았습니다. 설정 > 컨텍스트 소스에서 설정하십시오."`
오류가 발생합니다.

| 도구                         | 범위           | 설명                                                                                                 |
| ---------------------------- | -------------- | ---------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | 텍스트 쿼리로 페이지와 데이터베이스를 검색합니다(제목, ID, URL 반환). 페이지네이션됩니다.            |
| `notion_get_page`            | `read:notion`  | ID로 페이지의 콘텐츠와 메타데이터를 가져옵니다.                                                      |
| `notion_list_block_children` | `read:notion`  | 블록 또는 페이지의 모든 하위 블록(블록 트리)을 나열합니다. 페이지네이션됩니다.                       |
| `notion_query_database`      | `read:notion`  | 선택적 `filter` + `sorts`(Notion API 형식)를 사용하여 데이터베이스를 쿼리합니다. 페이지네이션됩니다. |
| `notion_get_database`        | `read:notion`  | ID로 데이터베이스의 스키마/메타데이터를 가져옵니다.                                                  |
| `notion_append_blocks`       | `write:notion` | 기존 블록 또는 페이지에 하위 블록을 추가합니다(요청당 최대 100개 블록).                              |

### 입력 매개변수

- `notion_search` — `query`(1~~500자), `pageSize`(1~~100, 기본값 20),
  `startCursor`(선택 사항).
- `notion_get_page` — `pageId`(32자 16진수 또는 UUID).
- `notion_list_block_children` — `blockId`, `pageSize`(1~100, 기본값 50),
  `startCursor`(선택 사항).
- `notion_query_database` — `databaseId`, `filter`(선택 사항, Notion 필터 형식),
  `sorts`(선택적 배열), `pageSize`(1~100, 기본값 50), `startCursor`(선택 사항).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children`(블록 객체 배열),
  `after`(선택적 위치).

### 범위

읽기 도구에는 `read:notion`이 필요하고 쓰기 도구에는 `write:notion`이 필요합니다.
범위는 `OMNIROUTE_MCP_ENFORCE_SCOPES=true`인 경우에만
`open-sse/mcp-server/server.ts`의 `withScopeEnforcement()`에 의해 적용됩니다.
호출자에게 허용되는 범위는 `OMNIROUTE_MCP_SCOPES`(쉼표로 구분) 또는 인증된 API
키의 범위 컨텍스트에서 가져옵니다. 전체 범위 모델은
[MCP-SERVER.md](./MCP-SERVER.md)를 참조하십시오.

## 엔드포인트

| 메서드   | 경로                   | 용도                                    |
| -------- | ---------------------- | --------------------------------------- |
| `GET`    | `/api/settings/notion` | `{ connected, hasToken }`을 반환합니다. |
| `POST`   | `/api/settings/notion` | 통합 토큰을 저장하고 검증합니다.        |
| `DELETE` | `/api/settings/notion` | 연결을 해제합니다(저장된 토큰 삭제).    |

> 이는 대시보드 설정 경로입니다. 공개 `/v1` Notion 프록시
> 엔드포인트는 **없습니다**. Notion에는 위의 MCP 도구를 통해서만 접근합니다.

## 사용 사례

- **지식 기반 답변** — 에이전트가 답변하기 전에 워크스페이스에서 `notion_search`를 수행하고
  최상위 검색 결과에 `notion_get_page`를 사용하도록 하여, 실제 내부 문서를 인용하는 응답을 생성합니다.
- **데이터베이스 기반 워크플로** — 필터와 정렬을 사용하여 작업/CRM 데이터베이스에
  `notion_query_database`를 실행한 다음, 행을 요약하거나 분류합니다.
- **결과 기록 / 로깅** — `notion_append_blocks`를 사용하여 회의록, 실행
  요약 또는 에이전트 출력을 기존 페이지에 추가합니다(추가 전용이며, 파괴적인 편집은 수행하지 않음).
- **구조 탐색** — `notion_list_block_children`을 사용하여 페이지의 블록 트리를 탐색하거나,
  쿼리 전에 `notion_get_database`를 사용하여 데이터베이스의 속성 스키마를 확인합니다.

## 관련 문서

- [MCP 서버](./MCP-SERVER.md) — 전송 방식, 범위 적용, 전체 도구 목록.
- [Obsidian 컨텍스트 소스](./OBSIDIAN_CONTEXT.md) — 기본 제공되는 또 다른 컨텍스트 소스.
- [메모리 시스템](./MEMORY.md) — 지속적인 대화 메모리(보완적인
  컨텍스트 계층으로, 도구로 가져오는 대신 자동으로 주입됨).
