# Memory System (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **신뢰할 수 있는 원본:** `src/lib/memory/` 및 `src/app/api/memory/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40 (기본 비활성화 + int8 양자화 보완)

OmniRoute는 API 키(및 선택적으로 세션 ID)를 기준으로 구분되는 영구 대화 메모리를 제공합니다. 메모리는 경량 정규식 패턴 매칭을 통해 LLM 응답에서 자동으로 추출되며, 이후 요청에 선행 시스템 메시지로 다시 주입됩니다(시스템 역할을 거부하는 제공자의 경우 첫 번째 사용자 메시지로 주입).

> **메모리는 기본적으로 비활성화되어 있습니다(v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`는
> 이제 `false`입니다(`src/lib/memory/settings.ts`). 메모리를 활성화하면 검색된 컨텍스트를 최대
> `maxTokens`(~2k)까지 **모든** 채팅 요청에 주입하며, 이에 대한 비용이
> 청구됩니다. 이는 신규 설치 및 자체 컨텍스트를 관리하는 클라이언트에
> 예상치 못한 비용이 될 수 있습니다. **Settings → Memory**에서 명시적으로 활성화하세요(
> 메모리가 활성화되면 `MemorySkillsTab`에 토큰 비용 경고 안내가 표시됩니다).
> 클라이언트는 `x-omniroute-no-memory` 요청 헤더
> (`true`/`1`/`yes`)를 사용하여 단일 요청에서 메모리를 제외할 수 있습니다. 자세한 내용은
> [API_REFERENCE.md](../reference/API_REFERENCE.md)의 요청 헤더 표를 참조하세요. 메모리를 사용하지 않는 요청은
> `memoryOwnerId = null`로 설정되며, 해당 요청에서 메모리와 스킬 주입을 **모두** 비활성화합니다
> (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

메모리는 사용자별이 아니라 **API 키별로 범위가 지정됩니다**. 동일한 API 키로 인증된 모든 요청은 같은 메모리 풀을 공유하며, 선택적으로 `sessionId`를 통해 범위를 더 세분화할 수 있습니다.

## 아키텍처

```
클라이언트 → /v1/chat/completions (apiKeyInfo는 업스트림에서 확인됨)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # ID 추출
    → getMemorySettings()                     # 캐시된 설정
    → shouldInjectMemory(body, {enabled})     # 게이트
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + 선택적 벡터
    → injectMemory(body, memories, provider)  # 시스템 또는 사용자 메시지
  → 업스트림 제공자 호출
  → 응답 시: extractFacts(text, apiKeyId, sessionId)  # 비차단 방식
    → setImmediate → 일치 항목마다 createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

주입 및 추출 호출 지점은 `open-sse/handlers/chatCore.ts`에 연결되어 있습니다
(`retrieveMemories`, `injectMemory`, `extractFacts`를 찾으세요).

## 엔진 아키텍처(3계층 결정 방식)

Memory Engine은 사용 가능한 인프라와 설정을 기준으로 런타임에 검색 경로를 결정합니다. 세 가지 계층이 있으며 우선순위에 따라 적용됩니다.

```
  ┌─────────────────────────────────────────────────────────────┐
  │  계층 0 — 키워드(FTS5)                                      │
  │  프로브 기반 가용성: SQLite 빌드가 지원하는 경우 FTS5 사용   │
  │  (better-sqlite3 / node:sqlite / bun:sqlite); FTS5가 없는   │
  │  빌드에서는 사용할 수 없음(예: sql.js/WASM —                │
  │  "no such module: fts5"). strategy = "exact"일 때 또는      │
  │  대체 경로로 사용되며, 엔진 상태의 keyword는 프로브 결과를  │
  │  반영함.                                                     │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  계층 1 — 임베디드 벡터(sqlite-vec)                          │
  │  db.loadExtension()을 통해 sqlite-vec v0.1.9를 로드함.       │
  │  Float32 벡터에 대한 KNN 완전 탐색. 다음 조건에서 활성화됨:  │
  │   • sqlite-vec loadExtension 성공                            │
  │   • Float32Array를 생성할 수 있는 임베딩 소스 사용 가능      │
  │     (remote | static | transformers)                         │
  │   • vec_memories 테이블 존재(첫 ready() 시 생성됨)           │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  계층 2 — Qdrant(선택적으로 사용하는 외부 벡터 데이터베이스) │
  │  활성화하면 semantic/hybrid에서 sqlite-vec을 대체함.         │
  │  실행 중인 Qdrant 인스턴스와 구성된 host/port가 필요함.      │
  └─────────────────────────────────────────────────────────────┘
```

성능 저하 시 대체 처리는 자동으로 투명하게 이루어집니다.

- sqlite-vec 로드에 실패하면 계층 1을 사용할 수 없으므로 계층 0으로 대체됩니다.
- 임베딩 소스가 오류를 반환하면 계층 1은 계층 0으로 대체됩니다.
- Qdrant가 비정상 상태이면 계층 2는 계층 1로 대체됩니다(계층 1도 사용할 수 없으면 계층 0으로 대체).

## 임베딩 소스

임베딩 계층(`src/lib/memory/embedding/`)은
`MemorySettingsExtended.embeddingSource`에 따라 사용할 소스를 결정합니다.

| 소스           | 설명                                                                     | 키 필요 여부 | 콜드 스타트      |
| -------------- | ------------------------------------------------------------------------ | ------------ | ---------------- |
| `remote`       | 구성된 제공자의 임베딩 API(OpenAI, Cohere 등)를 사용합니다.              | 예           | 없음             |
| `static`       | `potion-base-8M`을 통한 로컬 조회 테이블 임베딩(WordPiece + 평균 풀링)   | 아니요       | ~200ms           |
| `transformers` | `@huggingface/transformers` v4, `all-MiniLM-L6-v2`를 통한 로컬 ONNX 추론 | 아니요       | ~3s + ~400MB RAM |
| `auto`         | 런타임 결정: remote(키가 있는 경우) → static → transformers → null       | 상황에 따라  | 상황에 따라      |

**`auto`의 결정 순서:**

1. `listEmbeddingProviders()`에서 `hasKey === true`인 첫 번째 제공자를 찾음 → `remote`.
2. `settings.staticEnabled === true`인 경우 → `static`.
3. `settings.transformersEnabled === true`인 경우 → `transformers`.
4. 그 외의 경우 → `null`(FTS5 키워드 검색으로 성능 저하 전환).

임베딩 캐시(`src/lib/memory/embedding/cache.ts`)는
`${source}:${model}:${dim}:${sha256(text)}`를 키로 사용하는 인메모리
LRU 맵을 사용하며, 항목 수는 `MEMORY_EMBEDDING_CACHE_MAX`(기본값 1000)로 제한되고
TTL은 `MEMORY_EMBEDDING_CACHE_TTL_MS`(기본값 5분)입니다. 프로세스 수명 주기 동안
모든 호출자가 공유합니다.

## 하이브리드 RRF(k=60)

`strategy = "hybrid"`이고 벡터 저장소를 사용할 수 있는 경우, 검색은
Reciprocal Rank Fusion을 사용하여 FTS5 결과와 벡터 결과를 병합합니다.

```
RRF(d) = Σ  1 / (k + rank_i(d))      여기서 k = 60(MEMORY_RRF_K를 통해 구성 가능)
          i
```

구체적으로는 다음과 같습니다.

1. FTS5 검색 실행 → 순위 목록 `R_fts`(위치 1..N).
2. KNN 벡터 검색 실행 → 순위 목록 `R_vec`(위치 1..M).
3. 각 고유한 `memoryId`에 대해:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)`(목록에 없으면 0).
4. `rrf_score`를 기준으로 내림차순 정렬한 후 토큰 예산 순회를 적용합니다.

RRF는 이질적인 검색 시스템 간에 점수를 정규화할 필요 없이 효과적인 것으로
잘 알려져 있습니다. 기본값 `k=60`은 Cormack 등의 원 논문에서 유래했으며,
소규모 코퍼스(메모리 10,000개 미만)에서 효과적으로 작동합니다.

## 백필(지연 + 재인덱싱)

임베딩 모델이 변경되면(`embedding_signature`를 통해 감지) 벡터 저장소가
재구축되고, 기존의 모든 메모리는 `memories` 테이블에서
`needs_reindex = 1`로 표시됩니다.

**지연 백필**: 다음 검색 시 벡터 항목이 누락된 메모리는 검색이 실행되기 전에
임베딩되어 `vec_memories`에 삽입됩니다. 이를 통해 시작을 차단하지 않고 실제
요청 전반에 걸쳐 백필 비용을 분산합니다.

**명시적 재인덱싱**: `/dashboard/memory`의 Engine 탭에는
`POST /api/memory/reindex`를 호출하는 "지금 재인덱싱" 버튼이 있습니다. 핸들러는
`src/lib/memory/reindex.ts`의 `runReindexBatch()`를 호출하며, 요청당 최대
`limit`개의 대기 중인 항목을 처리합니다. 진행 상황은
`GET /api/memory/engine-status`(`vectorStore.needsReindex`)를 통해 폴링할 수 있습니다.

`memory_vec_meta` 테이블(마이그레이션 `083_memory_vec.sql`)에는 다음 정보가 저장됩니다.

- `active_dim` — 현재 벡터 차원(null = 아직 보정되지 않음).
- `embedding_signature` — 변경 사항을 감지하는 데 사용되는 `${source}:${model}:${dim}`.
- `last_reset_at` — 마지막 전체 초기화의 타임스탬프.
- `vec_loaded` — sqlite-vec가 성공적으로 로드되었는지를 나타내는 0/1 플래그.

## 설정 확장

`src/shared/schemas/memory.ts`의 `MemorySettingsExtended`에는 9개의 임베딩 및 벡터 필드가 있으며, `src/lib/db/settings.ts`를 통해 영속적으로 저장됩니다.

| 필드                     | 타입                                               | 기본값   | 설명                                            |
| ------------------------ | -------------------------------------------------- | -------- | ----------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | 사용할 임베딩 소스                              |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | `provider/model` 형식의 제공자/모델             |
| `customBaseUrl`          | `string \| null`                                   | `null`   | 메모리 전용 OpenAI 호환 엔드포인트 기본 URL     |
| `customModelId`          | `string \| null`                                   | `null`   | 사용자 지정 엔드포인트로 전송되는 모델 ID       |
| `transformersEnabled`    | `boolean`                                          | `false`  | Transformers.js 사용 동의(MiniLM, 약 400MB)     |
| `staticEnabled`          | `boolean`                                          | `false`  | 정적 potion-base-8M 로컬 모델 사용 동의         |
| `rerankEnabled`          | `boolean`                                          | `false`  | 재순위 지정 단계 활성화(요청당 200~500ms 추가)  |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | `provider/model` 형식의 재순위 지정 제공자/모델 |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | 사용할 벡터 백엔드                              |

이 설정들은 `GET /PUT /api/settings/memory`를 통해 노출됩니다(스키마 `MemorySettingsExtendedSchema`).

`remote` 소스의 경우 Memory는 선택적 `customBaseUrl` 및 `customModelId` 설정도 허용합니다. 이 두 설정을 함께 사용하면 전역 임베딩 레지스트리를 변경하지 않고 OpenAI 호환 `/embeddings` 엔드포인트와 모델을 선택할 수 있습니다. 엔드포인트는 사용 전에 정규화되며 제공자의 아웃바운드 URL 정책에 따라 검사됩니다. HTTP(S)가 필수이며, 내장된 자격 증명과 쿼리 문자열은 거부되고, 클라우드 메타데이터 주소는 계속 차단됩니다. 빈 값은 선택된 레지스트리 제공자를 그대로 유지합니다. 대시보드로 반환되는 오류는 정제되며 엔드포인트 자격 증명은 절대 로그에 기록되지 않습니다.

> **TODO (D20):** 모든 API 키에서 메모리를 공유하는 `global` 범위는 이 릴리스에 구현되지 않았습니다. 이를 위해서는 스키마 변경과 전역 검색 경로가 필요합니다. 별도로 추적하세요.

## 스토리지 계층

### 기본: SQLite (`memories` 테이블)

마이그레이션 `015_create_memories.sql`에 의해 생성됩니다.

| 열                          | 타입               | 참고                                                                     |
| --------------------------- | ------------------ | ------------------------------------------------------------------------ |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()`를 통해 생성된 UUID                                 |
| `api_key_id`                | `TEXT NOT NULL`    | 소유 API 키                                                              |
| `session_id`                | `TEXT`             | 선택적 대화별 범위                                                       |
| `type`                      | `TEXT NOT NULL`    | `factual`, `episodic`, `procedural`, `semantic` 중 하나                  |
| `key`                       | `TEXT`             | 안정적인 업서트 키(예: `preference:i_prefer_python`)                     |
| `content`                   | `TEXT NOT NULL`    | 실제 사실 텍스트                                                         |
| `metadata`                  | `TEXT`             | JSON 블롭(category, extractedAt, source, ...)                            |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 문자열                                                          |
| `expires_at`                | `TEXT`             | 선택적 만료 시각. `NULL`은 영구를 의미                                   |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID와 FTS5 rowid를 연결하기 위해 `023_fix_memory_fts_uuid.sql`에서 추가 |

인덱스: `api_key_id`, `session_id`, `type`, `expires_at` 및 고유 `memory_id` 인덱스.

**업서트 의미 체계**: `createMemory()`는 동일한 `(api_key_id, key)`를 가진 기존 행을 찾고, 발견하면 해당 행을 제자리에서 업데이트합니다(`metadata`는 얕은 스프레드를 통해 병합). 이를 통해 선호도 문장이 반복되더라도 테이블이 무제한으로 커지는 것을 방지합니다.

### 전체 텍스트 검색(`memory_fts` 가상 테이블)

`022_add_memory_fts5.sql`은 `content`와 `key`에 대한 FTS5 가상 테이블을 생성합니다. `023_fix_memory_fts_uuid.sql`은 UUID 기본 키가 FTS5의 정수 rowid와 조인되지 않던 실제 버그를 수정합니다. 이 마이그레이션은 `memory_id` 열을 추가하고 FTS 테이블을 다시 생성하며, INSERT, DELETE, UPDATE 시 FTS의 동기화를 유지하는 트리거(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`)를 연결합니다.

`retrieval.ts`에서 `semantic` 및 `hybrid` 전략에 사용됩니다(아래 참조). 검색 코드는 `hasTable("memory_fts")`로 보호되며, FTS 테이블이 없거나 FTS 쿼리에서 예외가 발생하면 시간순 정렬로 대체됩니다.

### 선택 사항: Qdrant(벡터 스토어 계층 2)

`src/lib/memory/qdrant.ts`는 계층 2 벡터 스토어로서 선택적 Qdrant 통합을 구현합니다. 검색은 엔진 선택기 `memoryVectorStore === "qdrant"`일 때만 Qdrant로 라우팅됩니다. 기본값인 `"auto"`(및 `"sqlite-vec"`)는 Qdrant를 **절대** 선택하지 않습니다. Engine 탭 토글은 `qdrantEnabled`와 `memoryVectorStore`를 **모두** 함께 설정합니다. 활성화하면 Qdrant가 기본 스토어가 되고, 비활성화하면 `"auto"`로 재설정됩니다(#5597 — 이 수정 전에는 엔진 선택기에 아무것도 기록되지 않아 활성화해도 아무 효과가 없었습니다). Qdrant에 연결할 수 없거나 아무 결과도 반환하지 않으면 검색은 sqlite-vec → FTS5 순서로 대체됩니다.

- `upsertSemanticMemoryPoint()` — 구성된 임베딩 모델로 `key + content`를 임베딩하고,
  컬렉션이 존재하는지 확인하며(처음 사용할 때 코사인 거리 벡터 생성),
  `{memoryId, apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`
  페이로드가 포함된 포인트를 업서트합니다.
- `searchSemanticMemory(query, topK, scope)` — 쿼리를 임베딩하고,
  `kind = "omniroute_memory"`로 필터링한 컬렉션을 검색하며, 선택적으로
  `apiKeyId` / `sessionId`로 필터링합니다. `topK`를 `[1, 20]` 범위로 제한합니다.
- `deleteSemanticMemoryPoint(id)` — 단일 포인트를 삭제합니다. SQLite 행이
  제거된 후 `deleteMemory()`에서 호출됩니다(D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix`가 이미 지났거나
  `createdAtUnix`가 보존 기한보다 오래된 포인트를 일괄 삭제합니다. 대시보드에
  실제 수치를 표시할 수 있도록 먼저 개수를 계산합니다.
- `checkQdrantHealth()` — 지연 시간이 포함된 `GET /readyz` 상태 확인 프로브입니다.

설정 UI에서는 `/dashboard/memory`의 **Engine 탭**에서 Qdrant 구성, 상태 확인,
시맨틱 검색 테스트 및 정리를 제공합니다. `src/app/api/settings/qdrant/` 아래의
해당 라우트는 v3.8.6부터 모두 연결되어 있습니다.

| 라우트                                  | 메서드        | 설명                          |
| --------------------------------------- | ------------- | ----------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant 설정 조회 / 업데이트   |
| `/api/settings/qdrant/health`           | `GET`         | 활성 상태 프로브 + 지연 시간  |
| `/api/settings/qdrant/search`           | `POST`        | 시맨틱 검색 테스트            |
| `/api/settings/qdrant/cleanup`          | `POST`        | 만료되거나 오래된 포인트 제거 |
| `/api/settings/qdrant/embedding-models` | `GET`         | 사용 가능한 임베딩 모델 목록  |

**동작 참고 사항(예상되는 동작):**

- **엔진 선택** — Engine 탭에서 Qdrant를 활성화하면 기본 저장소로 설정됩니다
  (`memoryVectorStore="qdrant"` 설정). 비활성화하면 `"auto"`로 재설정됩니다(#5597).
- **백필 없음** — Qdrant를 활성화한 **후에** 생성되거나 업데이트된 메모리만
  Qdrant에 기록됩니다(응답을 기다리지 않는 이중 쓰기). 기존 SQLite 메모리는
  마이그레이션되지 **않습니다**. "지금 다시 인덱싱"은 Qdrant가 아닌 sqlite-vec
  인덱스만 다시 빌드합니다.
- **벡터 차원은 처음 사용할 때 실제 임베딩에서 자동으로 감지됩니다** — 입력할
  차원 필드는 없습니다. 컬렉션이 생성된 후 임베딩 모델을 변경하는 경우는
  **자동으로 처리되지 않습니다**. 기존 컬렉션은 그대로 유지되며, 차원이
  일치하지 않는 쓰기/검색은 실패한 후 sqlite-vec으로 폴백됩니다. 임베더를
  변경하려면 컬렉션을 다시 생성하세요(새 이름을 사용하거나 Qdrant에서 삭제).
- **거리 메트릭** — 항상 **Cosine**입니다(컬렉션 생성 시 하드코딩되며 구성할
  수 없음).
- **인증** — API 키만 사용합니다(`api-key` 헤더로 전송되며, 인증되지 않은
  로컬 Docker에서는 선택 사항). JWT/RBAC은 사용하지 않습니다.
- **구성 필드** — UI에서는 `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`를 제공합니다. `vectorSize` / `hnswEfConstruct`는 환경 변수/DB에서만
  설정할 수 있으며, `vectorSize`는 컬렉션 생성에 사용되지 않습니다(차원은
  임베딩에서 결정됨).

### 벡터 양자화(int8 — 선택 사항, 두 백엔드 모두)

두 벡터 백엔드는 저장된 벡터의 메모리 사용량을 줄이기 위해
**선택적 int8 양자화**를 지원합니다(Float32보다 약 4배 작지만 재현율이
약간 낮아짐). 두 백엔드 모두 기본값은 **꺼짐**이며, 명시적으로 활성화하지
않으면 벡터가 완전 정밀도로 유지됩니다.

| 백엔드     | 설정                                  | 유형                           | 기본값   | 읽는 위치                                                   |
| ---------- | ------------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB 키)          | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (환경 변수) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant**는 `qdrantQuantization` 설정 키를 통해 인스턴스별로 구성됩니다
  (`PUT /api/settings/qdrant`에서 `quantization` 필드로 제공됨). `"int8"`이면
  `buildQuantizationConfig()`가 스칼라 양자화(`always_ram`, 분위수 `0.99`)를
  요청하고, 검색 시 `rescore: true`를 활성화하여 완전 정밀도 벡터로 int8
  후보 집합을 정제합니다.
- **sqlite-vec** 양자화는 **환경 변수로만** 설정할 수 있습니다(DB 설정 아님).
  `MEMORY_VEC_QUANTIZATION=int8`로 설정하면 `vec_quantize_int8(?, 'unit')`을
  통해 로컬 벡터를 `int8[dim]` 열로 저장합니다. 선택한 모드는 `embedding_signature`에
  (`:int8` 접미사로) 포함되므로, 모드를 전환하면 `vec_memories` 테이블의 전체
  재인덱싱이 트리거됩니다. 이는 임베딩 모델이 변경될 때 사용하는 것과 동일한
  지연 백필 경로입니다.

## 메모리 유형

`MemoryType` (`src/lib/memory/types.ts`):

| 유형         | 용도                                                         |
| ------------ | ------------------------------------------------------------ |
| `factual`    | 선호도, 안정적인 사용자 정보, 행동 패턴                      |
| `episodic`   | 특정 시점과 관련된 결정("Postgres를 선택했다")               |
| `procedural` | 워크플로 / 방법에 관한 메모리(예약됨; 현재 자동 추출기 없음) |
| `semantic`   | 벡터 저장소 항목용으로 예약됨                                |

`MemoryConfig` 검색 전략은 `exact`, `semantic`, `hybrid` 중 하나이며,
범위는 `session`, `apiKey`, `global` 중 하나입니다. `getMemorySettings()`의
기본 범위는 `apiKey`입니다.

## 사실 추출 (`extraction.ts`)

추출은 LLM 기반이 아니라 **정규식 기반**이며, 응답 스트림을 차단하지 않도록
`setImmediate()`를 사용해 프로세스 내에서 실행됩니다.

- **선호도 패턴** → `MemoryType.FACTUAL`
  (예: `나는 …을 선호한다`, `나는 …을 정말 좋아한다`, `내가 가장 좋아하는 것은 …이다`, `나는 …을 싫어한다`)
- **결정 패턴** → `MemoryType.EPISODIC`
  (예: `나는 …을 사용할 것이다`, `나는 …을 선택했다`, `나는 …을 택했다`, `나는 …을 도입할 것이다`)
- **행동 패턴** → `MemoryType.FACTUAL`
  (예: `나는 보통 …한다`, `나는 항상 …한다`, `나는 …하는 경향이 있다`)

각 일치 항목은 정제되고(`trim`, 공백 축약, 최대 500자 제한),
안정적인 `factKey(category, content)`를 통해 배치 내에서 중복이 제거된 후,
메타데이터 `{category, extractedAt, source: "llm_response"}`와 함께
`createMemory()`를 통해 저장됩니다. 입력 텍스트는 64 KiB
(`MAX_EXTRACTION_TEXT_LENGTH`)로 제한되며, 이보다 길면 가장 최근의 어시스턴트
콘텐츠가 항상 포함되도록 텍스트의 **끝부분**을 사용합니다.

`extractFactsFromText(text)`는 테스트용으로 내보내지며, 저장하지 않고 구조화된
사실을 반환합니다.

## 검색 (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)`가 기본 진입점입니다. 이 함수는 다음을 수행합니다.

1. `MemoryConfigSchema`를 통해 구성을 정규화하고 검증합니다.
2. `enabled`가 false이거나 `maxTokens <= 0`이면 즉시 `[]`를 반환합니다.
3. `maxTokens`를 `[1, 8000]` 범위로 제한합니다.
4. 이전 데이터베이스도 계속 작동하도록 최신 `memories` 테이블이 존재하는지
   (레거시 `memory` 테이블과 비교하여) 감지합니다.
5. 만료 조건
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), 선택적
   세션 범위, 선택적 `retentionDays` 기준 시점을 포함하는 기본 쿼리를 구성합니다.
6. 전략에 따라 분기합니다.
   - **`exact`**(기본값): 시간순 `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: `config.query`와 `memory_fts`가 존재하면
     `memory_fts MATCH ?`를 JOIN하고 FTS 순위에 따라 정렬합니다. FTS가 0개 행을
     반환하면 시간순 방식으로 대체합니다.
   - **`hybrid`**: FTS 결과(관련성 우선)와 시간순 집합의 합집합을 구하고,
     id를 기준으로 중복을 제거합니다.
7. 쿼리가 제공된 경우 `content`, `key`, `metadata` JSON을 대상으로 키워드 관련성
   점수(`getRelevanceScore`)를 계산합니다. 점수가 0인 행은 필터링됩니다.
8. 점수 내림차순으로 정렬한 다음 `createdAt` 내림차순으로 정렬합니다.
9. 순위가 지정된 목록을 순회하면서 누적 `estimateTokens(content)`
   (≈ `length / 4`)가 예산을 초과하지 않는 동안 항목을 채택합니다. 일치하는
   항목이 하나라도 있으면 항상 최소 한 개의 항목을 반환합니다.

`estimateTokens`는 내보내지며 검색, 요약, MCP
`omniroute_memory_search` 도구에서 사용됩니다.

## 주입 (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. 모든 메모리 내용을 하나의 `Memory context: …` 문자열로 결합합니다.
2. 공급자 이름에 따라 전략을 선택합니다.
   - **시스템 메시지**(OpenAI, Anthropic, Gemini 등의 기본값) — 기존 시스템
     메시지보다 앞에 `{role: "system", content: memoryText}`를 추가하여 사용자의
     시스템 프롬프트가 계속 우선되도록 합니다.
   - **사용자 메시지**(대체 전략) — `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`에 포함된
     공급자: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. 이들은 시스템 역할을
     거부하므로, 그렇지 않으면 400 오류가 발생합니다(GLM/Zhipu 관련 이슈 #1701 참조).
3. 개수, 전략 및 모델을 `memory.injection.injected`에 로깅합니다.

`providerSupportsSystemMessage(provider)`는 자체적으로 라우팅 결정을 내려야 하는
호출자를 위해 내보내집니다. 알 수 없는 공급자는 안전을 위해 기본값이 `true`
(시스템 역할 허용)입니다.

## 설정 (`settings.ts`)

메모리 구성은 환경 변수가 아니라 **DB 설정 테이블에 저장됩니다**.
`getMemorySettings()`는 `getSettings()`에서 값을 읽고 프로세스 내에 결과를
캐시합니다. 설정 PUT 라우트는 쓰기 작업 후 `invalidateMemorySettingsCache()`를
호출합니다.

### 레거시 필드(모든 버전)

| DB 키                 | 유형   | 기본값                                             | UI 컨트롤                           |
| --------------------- | ------ | -------------------------------------------------- | ----------------------------------- |
| `memoryEnabled`       | 불리언 | `false`(v3.8.30부터 기본적으로 꺼짐)               | 메모리 켜기/끄기                    |
| `memoryMaxTokens`     | 정수   | `2000`(범위 `0–16000`)                             | 주입용 토큰 예산                    |
| `memoryRetentionDays` | 정수   | `30`(범위 `1–365`)                                 | 보존 기간                           |
| `memoryStrategy`      | 열거형 | `"hybrid"`(`recent`, `semantic`, `hybrid` 중 하나) | 검색 전략                           |
| `skillsEnabled`       | 불리언 | `false`                                            | 키별 스킬 주입 전환(SKILLS.md 참조) |

참고: UI 전략 `"recent"`는 `toMemoryRetrievalConfig()`를 통해 내부 `"exact"`
검색 전략(시간순)에 매핑됩니다.

### 새 필드(v3.8.6, 계획 21 D9)

필드 설명은 위의 "설정 확장" 섹션도 참조하세요.

| DB 키                       | API 필드                 | 기본값   |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant 관련 DB 키(`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, 기본값이 `"omniroute_memory"`인 `qdrantCollection`,
기본값이 `"openai/text-embedding-3-small"`인 `qdrantEmbeddingModel`)는
`qdrant.ts`의 `normalizeQdrantConfig()`에서 읽습니다.

### 환경 변수(v3.8.6)

선택적 환경 변수 6개를 사용하여 엔진의 런타임 동작을 조정할 수 있습니다(`.env.example`에 문서화됨).

| 변수                            | 기본값                     | 설명                                                                                                                            |
| ------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | 임베딩 캐시 TTL(5분)                                                                                                            |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | 임베딩 LRU 캐시의 최대 항목 수                                                                                                  |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js 모델용 HF 저장소                                                                                                |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | 정적 potion 모델용 HF 저장소                                                                                                    |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | 다운로드한 모델을 저장할 위치                                                                                                   |
| `MEMORY_VEC_TOP_K`              | `20`                       | 벡터 검색의 기본 top-K                                                                                                          |
| `MEMORY_RRF_K`                  | `60`                       | 하이브리드 검색의 RRF k 상수                                                                                                    |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | 로컬 sqlite-vec 벡터를 양자화하여 저장하려면 `int8`로 설정합니다(약 4배 작아짐, 옵트인). 모드를 변경하면 강제로 재인덱싱됩니다. |

## 요약 (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`는 키의 메모리에 누적된 토큰 총합이 예산을 초과할 때 오래된 콘텐츠를 압축합니다. `created_at`을 기준으로 내림차순으로 행을 순회하면서 예산에 맞는 행은 유지하고, 나머지 행은 기존 `content`를 원문의 처음 세 문장으로 교체합니다. `tokensSaved`는 이전 콘텐츠와 새 콘텐츠 간 `estimateTokens` 차이입니다.

이 루틴은 현재 채팅 파이프라인에서 **사용할 수 있지만 자동으로 호출되지는 않습니다**. 지속적인 압축이 필요하다면 cron, 관리자 작업 또는 `MemoryConfig.autoSummarize` 연결 코드에서 호출하세요. 데이터 손실은 되돌릴 수 없으며, 원본 텍스트는 덮어씌워집니다.

## REST API

모든 엔드포인트에는 관리 인증(`requireManagementAuth`)이 필요합니다.

### 핵심 메모리 엔드포인트(기존 + 업데이트)

| 메서드   | 경로                 | 설명                                                                                                                                                                                        |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | 필터를 지원하는 페이지네이션 목록: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. 응답에는 `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`가 포함됩니다. |
| `POST`   | `/api/memory`        | 항목을 생성합니다(Zod 검증: `content`, `key`, 선택적 `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). `(apiKeyId, key)`를 기준으로 업서트하는 `createMemory()`를 호출합니다.      |
| `GET`    | `/api/memory/[id]`   | UUID로 단일 항목을 가져옵니다.                                                                                                                                                              |
| `PUT`    | `/api/memory/[id]`   | 항목 필드(`type`, `key`, `content`, `metadata`)를 업데이트합니다. 본문: `MemoryUpdatePutSchema`. 임베딩 소스를 사용할 수 있는 경우 벡터도 동기화합니다.                                     |
| `DELETE` | `/api/memory/[id]`   | 항목을 삭제하며, `vec_memories`(D15)와 Qdrant에서도 최선 노력 방식으로 삭제합니다. 항목이 없으면 404를 반환합니다.                                                                          |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")`을 실행하여 생성→목록 조회→삭제의 전체 과정을 확인합니다. `{working, latencyMs, error?}`를 반환합니다.                                            |

### 새로운 메모리 엔진 엔드포인트(계획 21)

| 메서드 | 경로                              | 설명                                                                                                                                                              |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | `retrieveMemories`를 시험 실행합니다. 점수, 계층, 토큰이 포함된 순위 결과를 반환합니다. 본문: `RetrievePreviewSchema`. 메모리를 주입하거나 수정하지 **않습니다**. |
| `GET`  | `/api/memory/embedding-providers` | 임베딩 모델을 제공하는 공급자 목록과 각 공급자의 API 키 설정 여부를 반환합니다.                                                                                   |
| `GET`  | `/api/memory/engine-status`       | 키워드 계층, 임베딩 해석, 벡터 저장소 통계, Qdrant 상태, 재순위화 구성을 포함한 전체 엔진 상태를 반환합니다. 형식: `MemoryEngineStatusSchema`.                    |
| `POST` | `/api/memory/summarize`           | 메모리 압축을 수동으로 실행합니다. 본문: `MemorySummarizeSchema`(`olderThanDays`, `apiKeyId?`, `dryRun`). `{candidates, tokensSaved}`를 반환합니다.               |
| `POST` | `/api/memory/reindex`             | `needs_reindex=1`인 메모리에 대해 벡터 재인덱싱을 실행합니다. 본문: `MemoryReindexSchema`(`force`). `{started, pending}`를 반환합니다.                            |

### 설정 엔드포인트

| 메서드 | 경로                                    | 설명                                                                                                               |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | 현재 정규화된 `MemorySettingsExtended`(새 필드 7개 + 레거시)를 반환합니다.                                         |
| `PUT`  | `/api/settings/memory`                  | `MemorySettingsExtendedSchema`의 모든 필드(총 12개 필드)를 업데이트합니다.                                         |
| `GET`  | `/api/settings/qdrant`                  | 현재 Qdrant 설정(`QdrantSettingsSchema`)을 반환합니다.                                                             |
| `PUT`  | `/api/settings/qdrant`                  | Qdrant 설정을 업데이트합니다. 본문: `QdrantSettingsUpdateSchema`. `apiKey`에 빈 문자열을 지정하면 키가 제거됩니다. |
| `GET`  | `/api/settings/qdrant/health`           | 구성된 Qdrant 인스턴스에 대해 활성 상태 프로브를 수행합니다. `QdrantHealthResultSchema`를 반환합니다.              |
| `POST` | `/api/settings/qdrant/search`           | Qdrant에 대해 의미론적 검색을 테스트합니다. 본문: `QdrantSearchSchema`(`query`, `topK`).                           |
| `POST` | `/api/settings/qdrant/cleanup`          | 만료되었거나 오래된 메모리에 해당하는 Qdrant 포인트를 제거합니다.                                                  |
| `GET`  | `/api/settings/qdrant/embedding-models` | Qdrant에서 사용할 수 있는 임베딩 모델 목록을 반환합니다.                                                           |

`/api/memory` 목록 쿼리는 `page` 기반 페이지네이션(`parsePaginationParams`) **또는** 원시 `offset`을 지원합니다. `offset`이 있으면 이것이 우선하며, 응답 형식에 사용할 `page`가 계산됩니다.

## MCP 도구 (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP 서버가 활성화되면 세 가지 메모리 도구가 등록됩니다.

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()`를 래핑합니다. v3.8.6(D16)부터 `strategy`는
  `"exact"`로 하드코딩되지 않고 `getMemorySettings()`에서 읽습니다.
  `query`가 제공되고 `strategy`가 `semantic` 또는 `hybrid`이면 사용 가능한
  경우 벡터 저장소가 사용됩니다.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()`를 래핑합니다. 다음 4가지 표준 유형만 허용합니다.
  `factual`, `episodic`, `procedural`, `semantic`(D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → 일치하는
  항목을 나열하고, 선택적으로 생성 시점 이전 타임스탬프를 기준으로 필터링한 후 각 항목을
  `deleteMemory()`를 통해 삭제합니다(이때 sqlite-vec + Qdrant에서도 벡터가 제거됩니다).

전송 방식 및 범위에 대한 자세한 내용은 [MCP-SERVER.md](./MCP-SERVER.md)를 참조하세요.

## 대시보드(Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx`는 이제 **3개 탭으로 구성된 Studio**입니다.

### 탭: Memories

- 개념 카드(접을 수 있는 "작동 방식" 설명).
- 실시간 목록, 검색 및 페이지네이션(300 ms 디바운스).
- 유형 필터(`factual` / `episodic` / `procedural` / `semantic` / 전체).
- 메모리 추가 모달(키, 콘텐츠, 유형).
- 인라인 편집(연필 버튼 → `PUT /api/memory/[id]`).
- 행별 삭제(확인 대화 상자 포함).
- 현재 페이지를 JSON으로 내보내기, 파일 선택기를 통한 JSON 가져오기.
- 통계 카드: `totalEntries`, `tokensUsed`, `hitRate`.
- "오래된 항목 압축" 버튼 → `POST /api/memory/summarize`(먼저 드라이런으로
  후보 수를 표시한 후 확인).
- `GET /api/memory/health` 결과에 따라 표시되는 녹색/빨간색 상태 점.

### 탭: Playground

- 쿼리 입력 + 전략 선택기(정확 / 시맨틱 / 하이브리드) + 토큰 예산.
- "시뮬레이션" → `POST /api/memory/retrieve-preview` — 순위가 지정된 결과를
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`와 함께 표시합니다.
- 사용된 임베딩 소스/벡터 저장소와 폴백 발생 여부를 보여주는 확인 패널.

### 탭: Engine

- 엔진 상태 패널(키워드 FTS5 칩, 임베딩 칩, 벡터 저장소 칩,
  Qdrant 상태 칩, 재순위 지정 칩).
- "지금 다시 인덱싱" 버튼 → `POST /api/memory/reindex`.
- 임베딩 소스 선택기(auto / remote / static / transformers + 토글).
- Qdrant 구성 카드(활성화 토글, 호스트/포트/컬렉션/키, 연결 테스트,
  시맨틱 검색 테스트, 정리).
- 재순위 지정 구성 카드(활성화 토글, 공급자/모델 선택기).

메모리 및 Qdrant 설정은 기존/전역 설정 화면을 위해
`/dashboard/settings → Memory & Skills`(`MemorySkillsTab.tsx`)에도
있습니다.

## 캐싱

`src/lib/memory/store.ts`는 `getMemory(id)` 읽기를 위해 프로세스 내 LRU 유사 캐시
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, 가장 오래된 항목의 20 %
제거)를 유지합니다. 또한 자체 범위 캐시를 원하는 호출자가 사용하는 `get`/`set`/`invalidate`
메서드가 있는 범용 키/값 `memoryCache` 계층(`src/lib/memory/cache.ts`)도
제공합니다(1 000개 항목 LRU, 기본 TTL 5 min).

## 개인정보 보호 및 수명 주기

- 메모리 소유권은 API 키 ID에 귀속됩니다(`chatCore.ts`의
  `resolveMemoryOwnerId`). `apiKeyInfo.id`가 없으면 검색, 주입,
  추출 중 어느 것도 실행되지 않습니다.
- 미래 시점의 `expires_at`이 설정된 항목은 검색 대상에서 제외되며,
  `retentionDays`보다 오래된 항목은 `retrieveMemories`의
  `created_at >= cutoff` 절에 의해 제외됩니다.
- 영구 삭제하려면 `DELETE /api/memory/[id]` 또는 `omniroute_memory_clear`를 사용하세요.
- 추출은 `setImmediate`를 통해 실행 후 결과를 기다리지 않는 방식으로 처리됩니다. 실패는
  `memory.extraction.background.failed`에 기록되며 호출자에게는
  절대 노출되지 않습니다.
- 검증 왕복 과정(`verifyExtractionPipeline`)은 `finally` 블록에서 자체
  테스트 항목을 정리합니다.

## 함께 보기

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` 설정은 메모리와 함께 도구
  정의를 주입합니다.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 전송 / 범위.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 더 광범위한 API 인터페이스.
- 소스 모듈:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + 하이브리드 RRF
  - `src/lib/memory/embedding/index.ts` — 다중 소스 임베딩 계층
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — 모든 메모리 API 본문을 위한 Zod 스키마
  - `src/shared/schemas/qdrant.ts` — Qdrant 설정/작업을 위한 Zod 스키마
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta`용 CRUD
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + 하위 라우트
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI(페이지 + 컴포넌트 +
    탭 + 훅)
  - `open-sse/handlers/chatCore.ts` (주입 / 추출 연결)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## 임베딩 제공자 선택하기 (v3.8.16+)

OmniRoute의 메모리 엔진은 **네 가지 임베딩 소스**(`src/lib/memory/embedding/`)를 지원합니다. 각 소스는 **지연 시간, 비용, 모델 품질 및 설정 복잡성** 측면에서 서로 다른 장단점이 있습니다.

### 임베딩 소스

| 제공자         | 소스                                      | 지연 시간                           | 비용               | 품질                                  | 설정                                   |
| -------------- | ----------------------------------------- | ----------------------------------- | ------------------ | ------------------------------------- | -------------------------------------- |
| `transformers` | 로컬 ONNX 모델(Xenova/all-MiniLM-L6-v2)   | ~50-150ms (CPU)                     | 무료               | 우수                                  | `npm install`만 필요                   |
| `static`       | 사전 계산된 벡터(캐시됨)                  | <1ms                                | 무료               | 해당 없음(캐시 적중 여부에 따라 다름) | 없음                                   |
| `remote`       | OpenAI / Cohere / Voyage API              | ~100-300ms                          | $0.02-0.10/1M 토큰 | 매우 우수                             | API 키                                 |
| `auto`         | 런타임에 사용 가능한 최적의 소스를 선택   | 선택된 소스와 동일                  | 무료               | 선택된 소스와 동일                    | 없음                                   |
| _(cache)_      | 모든 소스 위에 적용되는 인메모리 LRU 계층 | <1ms (적중), 전체 지연 시간(미적중) | 무료               | 기반 소스와 동일                      | 항상 활성화됨(선택 가능한 소스가 아님) |

### 의사 결정 트리

```
                  배포 환경은 무엇인가요?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  개발/테스트   소규모 운영   대규모 운영    엣지 / 오프라인
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (무료, API 불필요)          (최고 품질)     (인터넷 불필요)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            항상 상단에 `cache` 계층 추가
            (LruCache가 모든 제공자를 래핑)
```

### 데이터베이스 및 API 구성

메모리 임베딩 옵션은 환경 변수가 아닌 설정 API/UI를 통해 구성합니다. 설정 아래의 관련 설정 데이터베이스 키(`src/lib/memory/settings.ts`의 `normalizeMemorySettings`)는 다음과 같습니다.

- `memoryEmbeddingSource`: `"transformers"`(로컬), `"remote"`(API 기반, 예: OpenAI), `"static"`(외부 저장소) 또는 `"auto"`
- `memoryEmbeddingProviderModel`: 원격/정적 소스용 모델 식별자(예: `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"` 또는 `"auto"`

#### 로컬 모델 (`transformers`)

내부적으로 transformers.js를 사용하여 로컬 모델을 실행합니다.

```bash
# 코드에서 읽는 환경 변수(src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF 모델 저장소
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF 정적 potion 모델
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # 캐시 디렉터리
```

#### LRU 임베딩 캐시

캐시는 기본적으로 항상 활성화되며 환경 변수를 통해 구성됩니다.

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # 캐시되는 최대 항목 수
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL(5분)
```

### 성능 수치

일반적인 4코어 x86 서버에서의 벤치마크(텍스트당 약 100토큰):

| 제공자               | p50   | p95   | p99   | 임베딩 100만 개당 비용             |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | 무료                               |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrant 호스팅에 따라 다름          |
| `cache` (적중)       | <1ms  | <1ms  | 2ms   | 무료                               |

---

## 사실 추출 패턴 (v3.8.16+)

`extraction.ts` 모듈(`src/lib/memory/extraction.ts`)은 **정규식 패턴 매칭**을 사용하여 대화 메시지에서 구조화된 사실을 추출합니다. 이러한 패턴을 이해하면 사용 사례에 맞게 추출 품질을 조정하는 데 도움이 됩니다.

### 기본 패턴 카테고리

| 카테고리            | 패턴 예시                                                                          | 캡처하는 내용       |
| ------------------- | ---------------------------------------------------------------------------------- | ------------------- |
| PREFERENCE_PATTERNS | `"나는 <X>를 선호한다"`, `"나는 <X>를 좋아한다"`, `"나는 <X>가 싫다"`              | 사용자 선호도       |
| DECISION_PATTERNS   | `"나는 <X>를 사용할 것이다"`, `"나는 <X>하기로 결정했다"`, `"나는 <X>를 선택했다"` | 사용자 결정(일화적) |
| PATTERN_PATTERNS    | `"나는 보통 <X>한다"`, `"나는 항상 <X>한다"`, `"나는 절대 <X>하지 않는다"`         | 지속적인 행동 패턴  |

### 패턴 예시(단순화됨)

```ts
// src/lib/memory/extraction.ts에서 가져옴
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### 추출되는 내용

사용자가 다음과 같이 말하는 경우:

> "나는 TypeScript를 선호한다. 이 프로젝트에는 Postgres를 사용할 것이다. 나는 항상 푸시하기 전에 커밋한다. 나는 Python을 좋아하지 않는다."
> 추출 결과로 4개의 메모리가 생성됩니다:
>
> | 키                                   | 카테고리   | 유형     | 내용                     |
> | ------------------------------------ | ---------- | -------- | ------------------------ |
> | `preference:typescript`              | preference | factual  | "TypeScript"             |
> | `decision:postgres_for_this_project` | decision   | episodic | "이 프로젝트용 Postgres" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "푸시하기 전에 커밋"     |
> | `preference:python`                  | preference | factual  | "Python"                 |

### 추출 제한

과도한 추출을 방지하기 위해 다음 제한이 적용됩니다:

| 최소 콘텐츠 길이 | 3자 |
| 최대 콘텐츠 길이 | 500자 |

### 추출을 비활성화해야 하는 경우

메모리가 활성화될 때마다 추출이 자동으로 실행되며, 추출만을 위한 별도의 토글은 없습니다. 추출을 끄려면 `PUT /api/settings/memory`를 통해 메모리를 완전히 비활성화(`enabled: false`)하세요. 다음과 같은 경우 비활성화를 고려하세요:

- 메시지 양이 많고 추출 비용을 무시하기 어려운 경우
- 대화가 대부분 일시적이며(채팅, 디버깅) 장기적인 가치가 없는 경우
- 이미 사용자 정의 플러그인을 통해 컨텍스트를 캡처하고 있는 경우

---

## 하이브리드 RRF 조정 (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** 알고리즘은 FTS5(키워드) 결과와 벡터(의미론적) 결과를 결합합니다. `k` 매개변수는 순위가 낮은 결과에 부여되는 가중치를 제어합니다.

### 공식

각 후보 메모리의 RRF 점수는 다음과 같습니다:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

여기서:

- `k`는 상수입니다(기본값 60).
- `rank_i(d)`는 i번째 검색 시스템(FTS, 벡터)에서 문서 `d`의 순위입니다.
- 합산은 모든 검색 시스템에 걸쳐 수행됩니다.

### `k`가 결과에 미치는 영향

| `k` 값              | 효과                                                                 | 적합한 경우                        |
| ------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| `k=0`               | 순수 순위 융합(평활화 없음)                                          | 이론적 기준선                      |
| `k=10-30`           | 상위 결과에 높은 가중치를 부여하며, 낮은 순위는 거의 기여하지 않음   | 상위 3개 결과가 대체로 정확한 경우 |
| **`k=60`** (기본값) | 균형 잡힘 — 상위 10개 결과가 모두 유의미하게 기여함                  | 범용 검색                          |
| `k=100+`            | 더 평탄함 — 여러 시스템에 나타나면 낮은 순위의 결과도 우세할 수 있음 | 정밀도보다 재현율이 중요한 경우    |

### 실제 환경에서 `k` 조정하기

```bash
# 기본값
MEMORY_RRF_K=60

# 높은 정밀도 우선(작은 메모리, 적은 문서)
MEMORY_RRF_K=20

# 최대 재현율(큰 메모리, 다양한 쿼리)
MEMORY_RRF_K=120
```

**`k=20`인 예시:**

- FTS 순위 1 → 기여도 `1/21 = 0.048`
- FTS 순위 10 → 기여도 `1/30 = 0.033`
- 벡터 순위 1 → 기여도 `0.048`
- 결합 최댓값: `0.096`

**`k=60`인 예시:**

- FTS 순위 1 → 기여도 `1/61 = 0.016`
- FTS 순위 10 → 기여도 `1/70 = 0.014`
- 벡터 순위 1 → 기여도 `0.016`
- 결합 최댓값: `0.033`

`k`가 높을수록 상위 1위와 10위 사이의 **상대적 차이**가 작아지므로, 알고리즘은 최상위 순위의 신뢰도보다 **검색 시스템 간의 합의**에 더 많이 의존합니다.

### `k`를 변경해야 하는 경우

| 증상                                     | 시도할 방법                                                   |
| ---------------------------------------- | ------------------------------------------------------------- |
| 최상위 결과가 항상 선택되지만 잘못됨     | k를 **낮추기**(예: 20) — 최상위 순위의 신뢰도가 더 중요해짐   |
| 정답이 상위 5개 안에는 있지만 1위가 아님 | k를 **높이기**(예: 100) — 더 평탄한 점수 체계가 합의를 보상함 |
| 재현율은 높지만 정밀도가 낮음            | k를 **낮추기** — 순위를 더 명확하게 구분                      |
| 재현율이 낮음(관련 문서가 누락됨)        | k를 **높이기** — 낮은 순위의 문서에도 기회를 부여             |

### RRF 가중치

Reciprocal Rank Fusion은 의미론적 벡터 순위와 전문 검색 순위에 동일한 가중치를 사용합니다:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

개별 가중치를 조정하는 환경 변수는 없습니다(`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT`는 존재하지 않음).

---

## 요약 전략 (v3.8.16+)

`summarization.ts` 모듈(`src/lib/memory/summarization.ts`)은 회상 능력을 유지하면서 활성 세트를 작게 유지하기 위해 오래된 메모리를 압축합니다.

### 요약이 실행되는 시점

| 트리거                 | 임계값(기본값) |
| ---------------------- | -------------- |
| API를 통한 수동 트리거 | 해당 없음      |

### 요약 대상

`summarization.ts`에서는 두 개의 진입점을 내보냅니다:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — 세션의
  메모리를 토큰 예산 내에서 하나의 요약 텍스트로 압축합니다.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API에서 사용하는
  기간 기반 압축으로, `days`보다 오래된 모든 메모리를 선택하고 이를 바탕으로
  하나의 압축된 요약 메모리를 생성하며, `dryRun`이 `false`이면 원본을
  삭제합니다. 아무것도 수정하지 않고 후보 세트와 총 토큰 수를 미리 확인하려면
  `dryRun: true`를 전달합니다.

태그/키 클러스터링 단계나 메모리별 "핵심 또는 요약 가능" 점수 평가는 없습니다.
선택은 전적으로 기간 기준점에 따라 이루어지며, 요약 텍스트는 각 후보를 유형 접두사가
붙은 한 줄로 압축한 형태입니다.

### 요약 실행하기

요약은 **수동 / 옵트인 방식**입니다. `autoSummarize` 설정은 기본적으로 `false`이므로
어떤 항목도 자동으로 압축되지 않습니다. API를 통해 실행하세요:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

비활성화 상태로 유지하려면 `autoSummarize`를 기본값(`false`)으로 두기만 하면 됩니다.

### 요약 품질 개선 팁

- **먼저 `dryRun`으로 미리 확인하세요** — `summarizeMemoriesOlderThan(..., true)`는
  후보 목록과 총 토큰 수를 반환하므로 원본을 삭제하기 전에 병합될 항목을 확인할 수
  있습니다.
- 메모리 코퍼스가 큰 경우 **트래픽이 적은 시간에 요약을 실행하세요** — LLM 호출이 가장 오래 걸리는 부분입니다

```bash
# Cron 방식: 매일 오전 3시에 요약
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend 제공자 패턴

> **정본:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **테스트:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend 제공자 패턴은 기존 메모리 엔진 위에 **플러그형 백엔드 추상화 계층**을 도입합니다. 단일 저장소 구현에 종속되는 대신, 이제 메모리 시스템은 기본/폴백 라우팅을 구성할 수 있는 여러 백엔드(SQLite, Obsidian, Notion, 사용자 지정 HTTP 백엔드)를 지원합니다.

### 아키텍처

```
┌──────────────────────────────────────────────────────────┐
│                    API 라우트                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           싱글턴 오케스트레이터 (manager.ts)              │
│                                                          │
│  기본 ─────► 백엔드 A  (예: SQLite)                      │
│  폴백 ─────► 백엔드 B  (예: Obsidian)                    │
│             백엔드 C  (예: GenericBackend를 통한 Notion) │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ 백엔드     │ │ 백엔드     │ │ 백엔드 (HTTP)    │
└────────────┘ └────────────┘ └──────────────────┘
```

#### 핵심 인터페이스(`backend.ts`)

모든 백엔드는 `MemoryBackend` 인터페이스를 구현해야 합니다:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // 검색
  search(config: SearchConfig): Promise<Memory[]>;

  // 상태
  health(): Promise<HealthCheckResult>;

  // 수명 주기(선택 사항)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

다음을 수행하는 싱글턴 오케스트레이터입니다:

- `register(backend)`를 통해 백엔드를 **등록**합니다. 부팅 시 `index.ts`에서 호출됩니다.
- `configure(primary, fallbacks)`를 통해 기본 백엔드와 폴백을 **구성**합니다.
- CRUD/검색 작업을 기본 백엔드로 **라우팅**하며, 실패 시 폴백 체인을 사용합니다.
- 모든 백엔드의 **상태를 주기적으로 확인**합니다.

**폴백 동작:**

| 작업     | 기본 백엔드              | 폴백                           |
| -------- | ------------------------ | ------------------------------ |
| `create` | ✅ 기본 백엔드만         | ❌                             |
| `get`    | ✅ 기본 백엔드 먼저 시도 | ✅ null이면 폴백               |
| `update` | ✅ 기본 백엔드만         | ✅ 응답을 기다리지 않고 동기화 |
| `delete` | ✅ 기본 백엔드만         | ✅ 응답을 기다리지 않고 동기화 |
| `list`   | ✅ 기본 백엔드만         | ❌                             |
| `search` | ✅ 기본 백엔드 먼저 시도 | ✅ 오류 발생 시 폴백           |

#### GenericMemoryBackend (`genericBackend.ts`)

모든 REST API를 MemoryBackend로 변환하는 범용 HTTP 커넥터입니다. 다음과 같은 용도에 유용합니다:

- **Notion** — Notion API를 통해 연결
- **Obsidian** — Obsidian Local REST API를 통해 연결
- **사용자 지정 백엔드** — RESTful 메모리 API를 제공하는 모든 서비스

**구성:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // 백엔드 API의 기본 URL
  apiKey?: string;           // 인증용 Bearer 토큰
  headers?: Record<string, string>;  // 사용자 지정 HTTP 헤더
  timeout?: number;          // 요청 제한 시간(기본값: 30000ms)
  backendType?: string;      // 로깅용

  // 엔드포인트 재정의(기본값은 REST 규칙 사용)
  endpoints?: {
    search?: string;   // 기본값: "/memories/search"
    create?: string;   // 기본값: "/memories"
    list?: string;     // 기본값: "/memories"
    get?: string;      // 기본값: "/memories/{id}"
    update?: string;   // 기본값: "/memories/{id}"
    delete?: string;   // 기본값: "/memories/{id}"
    health?: string;   // 기본값: "/health"
  };

  // 쿼리 매개변수 이름 매핑
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // 경로 매개변수 이름 매핑
  pathParams?: {
    id?/memoryId?
  };
}
```

**알려진 백엔드**는 `KNOWN_BACKENDS`에 미리 구성되어 있습니다.

```typescript
createKnownBackend("obsidian"); // → localhost:27123을 가리키는 GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1을 가리키는 GenericMemoryBackend
```

#### 기본 제공 백엔드

##### SQLiteBackend (`sqliteBackend.ts`)

기본 주 백엔드입니다. `src/lib/memory/store.ts`를 사용하여 기존 SQLite 기반 메모리 저장소를 래핑합니다. 부팅 시 자동으로 등록됩니다.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

기존 Obsidian 통합(`src/lib/memory/obsidianBackend.ts`)을 래핑합니다. Obsidian Local REST API를 통해 Obsidian 볼트에 연결합니다.

### 설정

메모리 백엔드 설정은 앱 설정 테이블에 저장되며 `src/lib/memory/settings.ts`를 통해 관리됩니다.

| 설정        | 환경/구성 키             | 기본값     | 설명                         |
| ----------- | ------------------------ | ---------- | ---------------------------- |
| 주 백엔드   | `memoryPrimaryBackend`   | `"sqlite"` | 주 백엔드의 ID               |
| 대체 백엔드 | `memoryFallbackBackends` | `[]`       | 순서가 지정된 대체 백엔드 ID |
| 백엔드 구성 | `memoryBackendConfigs`   | `{}`       | 백엔드별 구성 재정의         |

설정은 `normalizeMemorySettings()`를 통해 정규화되고 `getMemorySettings()`에서 캐시됩니다.

### 초기화 흐름

```
앱 부트스트랩
  → index.ts 가져오기(부수 효과): SQLiteBackend 등록
  → 앱 수명 주기에서 initMemoryBackends() 호출:
      1. 설정 로드(getMemorySettings)
      2. 주 백엔드 및 대체 백엔드 구성
      3. 모든 백엔드 초기화(상태 확인)
      4. 요청 처리 준비 완료
```

### 새 백엔드 추가

1. `src/lib/memory/<name>Backend.ts`에서 **`MemoryBackend` 구현**
2. `src/lib/memory/index.ts`에서 **내보내기**
3. 부팅 시 `memoryManager.register(yourBackend)`로 **등록**
4. 설정을 통해 **구성**: `memoryPrimaryBackend`를 백엔드 ID로 설정
5. `src/lib/memory/__tests__/generic-backend.test.ts`를 참고하여 **테스트**

#### 예시: Brain 백엔드

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### 검증

#### 단위 테스트

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

예상 출력: 다음 항목을 다루는 **35개 테스트 모두 통과**:

- 생성자(2)
- 상태 확인(4) — 성공, 실패 500, 네트워크 오류, 지연 시간
- 초기화(2) — 성공, 실패
- 생성(2) — 기본 엔드포인트, 사용자 지정 엔드포인트
- 조회(4) — 성공, 404 → null, 404 이외의 오류 발생, 사용자 지정 경로 매개변수
- 업데이트(2) — 성공, 404 → false
- 삭제(2) — 성공, 404 → false
- 목록(2) — 쿼리 매개변수, 사용자 지정 매개변수 이름
- 검색(3) — 쿼리 매개변수, 사용자 지정 엔드포인트, 옵션 직렬화
- 인증 헤더(2) — Bearer 토큰, 사용자 지정 헤더
- 팩토리(1)

#### 타입 검사

```bash
npm run typecheck:core
```

예상 결과: **오류 0개**.
