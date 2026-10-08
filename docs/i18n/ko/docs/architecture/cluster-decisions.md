# Cluster Decisions — Optional Sidecar Profiles (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**상태:** 제안 (현재 @diegosouzapw 검토 대기 중)
**날짜:** 2026-06-20
**참조:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## 요약

[`docker-compose.yml`](../../docker-compose.yml)의 기존 8개 서비스 배포를 위한 두 가지 선택적 compose 프로필(`memory`, `bifrost`)입니다. 기본 실행 동작은 **변경되지 않습니다**: 3개의 `omniroute` 복제본 + Caddy + Redis + CliproxyAPI입니다. 두 개의 새 프로필은 Qdrant와 Bifrost를 선택적 사이드카로 추가하며, `docker compose --profile <name> up`을 통해 활성화됩니다. **기존 서비스는 제거되거나 대체되지 않습니다.**

## 이 접근 방식이 보수적인 이유

OmniRoute의 기존 배포 구성은 이미 간결하고 검증되었습니다:

- **`redis:7-alpine`**은 프로덕션 규모에서 속도 제한/캐시 워크로드를 처리합니다.
- **SQLite + sqlite-vec + FTS5**는 로컬 메모리 + 벡터 + 텍스트 검색을 지원합니다([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) 참조).
- **Caddy**는 이미 로드 밸런서 + TLS 종단점으로 사용되고 있습니다([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost**는 이미 [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)에 1계층 라우터로 통합되어 있습니다(`BIFROST_ENABLED` 환경 변수를 통한 킬 스위치가 포함된 사이드카 프록시 — 사이드카를 우회하고 TS 경로로 폴백하려면 `=0`으로 설정).

여기서 제공하는 두 프로필은 **SQLite의 한계에 도달한 배포를 위한 확장 옵션**이며, 마이그레이션이 아닙니다. 둘 다 기본적으로 비활성화되어 있습니다.

## 두 프로필

### `memory` — Qdrant 벡터 메모리 사이드카

**활성화해야 하는 경우:**

- 배포당 임베딩이 1백만 개를 초과하는 경우(sqlite-vec은 규모가 커지면 속도가 느려지기 시작함).
- `omniroute-1/2/3` 간에 공유 벡터 상태가 필요한 다중 복제본 배포.
- 이미 외부 Qdrant 클러스터(Qdrant Cloud, 온프레미스)를 사용 중인 경우.

**추가되는 항목:**

| 서비스   | 이미지                  | 포트        | 참고 사항                                      |
| -------- | ----------------------- | ----------- | ---------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW 인덱스; 영구 볼륨 `omniroute_qdrant_data` |

**활성화:** Settings UI에서 `qdrantEnabled = true`로 전환하거나 `QDRANT_HOST=qdrant` 환경 변수를 설정합니다. 우선순위 규칙(설정 테이블 → 환경 변수 → 기본값)은 [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)을 참조하세요.

**환경 변수:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example`의 1672-1683행 참조).

### `bifrost` — Bifrost 1계층 라우터 사이드카

**활성화해야 하는 경우:**

- 3개 이상의 `omniroute` 복제본을 실행하며 단일 Go 프로세스에서 공급자 로테이션을 중앙 집중화하려는 경우.
- 모든 복제본의 업스트림 공급자 요청에 대해 단일 감사/로깅 인터페이스를 사용하려는 경우.
- OmniRoute 복제본과 독립적으로 1계층 라우팅 계층을 수평 확장하려는 경우.

**추가되는 항목:**

| 서비스    | 이미지                            | 포트   | 참고 사항                                                     |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go 기반 1계층 라우터; 영구 로그 볼륨 `omniroute_bifrost_logs` |

**활성화:** `.env.example`에서 `BIFROST_BASE_URL=http://bifrost:8080`을 설정합니다. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)의 기존 사이드카 프록시 경로(PR #4381에서 추가됨)가 이를 자동으로 인식합니다.

**환경 변수:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example`의 1685-1695행 참조).

## 이 PR에서 명시적으로 수행하지 않는 작업

원래 이슈 스레드에서는 더 큰 규모의 클러스터 재작성이 제안되었습니다. 실제 워크로드 형태를 검토한 결과, 다음 항목은 명시된 이유로 **채택하지 않습니다**:

| 컴포넌트                             | 결정     | 이유                                                                                                                                            |
| ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **제외** | `redis:7-alpine`은 이미 프로덕션 규모의 속도 제한 워크로드에 충분하며, 해결해야 할 성능 한계가 없습니다.                                        |
| **NATS**                             | **제외** | 각 `omniroute` 복제본은 단일 Node.js 프로세스이며, 멀티프로세스 pub/sub 워크로드가 없습니다.                                                    |
| **PostgreSQL**                       | **제외** | SQLite + sqlite-vec + FTS5로 3가지 사용 사례를 모두 지원할 수 있으며, 97개의 마이그레이션과 Electron 패키징으로 인해 마이그레이션이 어렵습니다. |
| **Neo4j**                            | **제외** | 라우팅은 5개 테이블의 조인이며, SQLite의 재귀 CTE로 충분합니다.                                                                                 |
| **MinIO**                            | **제외** | 수 MB 규모의 블롭 워크로드가 없으며, 이미지/오디오는 패스스루 프록시로 처리됩니다.                                                              |
| **pgvector / pg_ai / pg_textsearch** | **제외** | PostgreSQL과 동일하게 SQLite의 한계에 도달하지 않았으며, pgvector 생태계는 파편화되어 있습니다.                                                 |
| **HAProxy / Envoy**                  | **제외** | Caddy가 이미 LB + TLS를 처리하며, 두 제품 모두 Tier-1 라우터로 명시적으로 제외되었습니다(`AGENTS.md` 참조).                                     |

향후 사용 사례를 통해 이 중 하나의 필요성이 입증되면 이 문서를 수정합니다.

## 4주간의 롤아웃 계획(승인 시)

1. **1주 차** — 이 PR을 병합하고 복제본 3개로 구성된 compose 스택에서 옵트인 프로필을 검증합니다.
2. **2주 차** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)의 사이드카 프록시 경로를 사용해 OpenAI/Claude/Gemini/Ollama(14개 이상의 제공자 중 4개)에 대해 Bifrost를 완전히 활성화합니다(`BIFROST_ENABLED`로 제어하며 런타임에 비활성화 가능).
3. **3주 차** — 단일 테스트 배포에서 Qdrant 메모리 프로필을 활성화하고 sqlite-vec 대비 지연 시간 차이를 측정합니다.
4. **4주 차** — 관측 가능성 상태 검사(`docker compose ps` 종료 코드 + `wget` 스모크 테스트)를 수행하고 ADR-041에 따라 71개 필러를 갱신합니다.

## 이 PR에서 변경된 파일

| 파일                                               | 변경 사항                                                                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30줄: `memory` 프로필(Qdrant), `bifrost` 프로필(Bifrost), 영구 볼륨, 상태 검사.                                                                                                                        |
| `.env.example`                                     | +24줄: `QDRANT_*`(변수 6개), `BIFROST_*`(변수 4개).                                                                                                                                                     |
| `docs/reference/ENVIRONMENT.md`                    | 섹션 25에 `QDRANT_*` 환경 변수 관련 행 6개 추가.                                                                                                                                                        |
| `src/lib/memory/qdrant.ts`                         | +33줄: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`에 대한 환경 변수 폴백 체인(설정 → 환경 변수 → 기본값). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88줄: 환경 변수 폴백 우선순위를 고정하는 새로운 테스트 사례 9개.                                                                                                                                       |
| `docs/architecture/cluster-decisions.md` (이 파일) | 신규 — 옵트인 프로필에 대한 결정 기록.                                                                                                                                                                  |
| `AGENTS.md`                                        | +1줄: 참조 문서 표에 이 문서를 가리키는 포인터 추가.                                                                                                                                                    |

**변경된 코드 합계:** 프로덕션 파일 4개(`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 테스트 파일 1개(`qdrant-wiring.test.ts`), 문서 파일 2개(`cluster-decisions.md`, `AGENTS.md`).
