# Log export (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute 호출 로그를 외부 분석 저장소로 지속적이고 증분 방식으로 내보냅니다.

로그 대시보드 탭은 요청 기록을 SQLite(`call_logs`)에 보관하며, 이 기록은
순환 및 보존 정책에 따라 제한됩니다. 로그 내보내기는 동일한 레코드 집합을 일정에 따라 외부로 전송하여
로컬 데이터베이스보다 오래 보존하고 다른 데이터와 조인할 수 있게 합니다. 첫 번째 대상은 BigQuery이며,
파이프라인은 레지스트리 방식이므로 더 많은 대상을 추가할 수 있습니다.

---

## 1. 작동 방식

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (로그 탭 필드 집합)
      → 대상 client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **일정** — 하나의 `JobRegistry` cron 작업인 `log_export`가 있으며, 기본값은 `0 * * * *`(매시간,
  UTC)입니다. `src/lib/initCloudSync.ts`에 등록되며 `OMNIROUTE_LOG_EXPORT_CRON`으로 재정의할 수 있습니다.
  각 실행 시 **활성화된** 모든 대상을 순차적으로 비웁니다.
- **커서** — SQLite의 암시적 `call_logs.rowid`이며, 대상별로
  `log_export_destinations.cursor_row_id`에 유지됩니다. `timestamp`는 의도적으로 커서로 사용하지 않습니다. 호출자가
  자체 값을 제공할 수 있으므로, 느린 요청이 나중에 시작된 빠른 요청보다 뒤늦게 기록될 수 있고,
  타임스탬프 커서를 사용하면 이를 건너뛰게 됩니다.
- **배치 처리** — 요청당 `batch_size`행(기본값 500), 실행당
  `max_rows_per_run`행(기본값 10000)을 처리하므로, 대규모 백로그가 한 번의 실행을 차단하지 않고 여러 차례에 걸쳐 소진됩니다.
- **전달** — 커서는 `send()`가 완료된 후에만 전진합니다. 실패한 배치는 커서를
  기존 위치에 유지하므로 다음 실행 시 동일한 행을 다시 시도합니다. 보장되는 방식은
  정확히 한 번이 아니라 최소 한 번 전달과 대상 측 중복 제거입니다. BigQuery는 각 행의 키로 호출 로그 id를 사용하며,
  자체 중복 제거 기간 내에서 최선형 방식으로 이를 적용합니다.
- **중복 실행 방지** — cron 실행과 `POST .../run`이 동시에 발생할 수 있습니다. 이미 처리 중인 대상은
  두 번 처리하는 대신 건너뜁니다(실행 결과에 `skipped: true`로 표시).
  따라서 동시 실행으로 인해 배치를 다시 전송하거나 커서를 이전 위치로 되돌릴 수 없습니다.
- **삭제 후 복구** — `cursor_row_id`가 `MAX(rowid)`보다 커지는 경우(전체 테이블이
  삭제되고 rowid가 다시 시작된 경우), 실행기는 영구적으로 데이터를 감지하지 못하는 상태가 되지 않도록 커서를 0으로 되돌립니다.

### 페이로드(프롬프트 및 완성 결과)

기본적으로 내보내기에는 로그 **목록**에 표시되는 요약 필드만 포함됩니다. **프롬프트 및 응답 내보내기**
(`includeBodies`)를 켜면 각 호출의 로그 **상세 정보** 창에 표시되는 내용도 추가로 전송됩니다.

| 필드                             | 포함되는 내용                                    |
| -------------------------------- | ------------------------------------------------ |
| `request_body` / `response_body` | 대시보드에 렌더링되는 호출 페이로드              |
| `pipeline_route_decision`        | 라우터가 선택한 대상 및 모델                     |
| `pipeline_client_request`        | 클라이언트가 전송한 원본 요청 그대로             |
| `pipeline_openai_request`        | 내부 OpenAI 형식으로 변환된 후의 요청            |
| `pipeline_provider_request`      | 공급자 방언으로 실제 업스트림에 전송된 요청      |
| `pipeline_provider_response`     | 원본 업스트림 응답                               |
| `pipeline_client_response`       | 호출자에게 반환된 내용                           |
| `pipeline_error`                 | 실패한 호출의 파이프라인 수준 오류 상세 정보     |
| `bodies_truncated`               | 위 필드 중 하나라도 `maxBodyBytes`에 도달하면 참 |

이는 프롬프트 콘텐츠이므로 **기본적으로 꺼져 있으며**, 의도적으로 대상별로 선택할 수 있습니다.
전송되는 내용은 대시보드에 표시되는 내용과 같습니다. 둘 다 `getCallLogById`를 통해 읽기 때문입니다. 페이로드는
기록될 때 이미 PII가 정제되고 비밀 정보가 마스킹되며, `noLog` API 키로 수행된 호출은
페이로드를 전혀 저장하지 않으므로 내보낼 내용도 없습니다.

페이로드는 행별로 파일 시스템 아티팩트에서 읽으므로, 이를 요청한 대상에 대해서만 하이드레이션이 실행됩니다.
아티팩트가 누락되거나 손상된 행은 배치를 실패시키고 커서를 멈추는 대신 null
페이로드와 함께 요약 정보를 내보냅니다.

`maxBodyBytes`(기본값 262144)는 각 필드의 크기를 제한합니다. 더 긴 페이로드는 삭제되는 대신
**잘립니다**. 잘린 프롬프트도 "무엇을 요청했는가"에 대한 답을 제공하며, 해당 행에는
`bodies_truncated` 플래그가 설정됩니다. 청크 단위로 스트리밍된 델타는 내보내지 않습니다. 조립된 응답이
이미 `pipeline_provider_response` 및 `pipeline_client_response`에 포함되어 있기 때문입니다.

---

## 2. 파일

| 구성 요소         | 위치                                         |
| ----------------- | -------------------------------------------- |
| 대상 계약         | `src/lib/logExport/types.ts`                 |
| 레지스트리        | `src/lib/logExport/registry.ts`              |
| 비밀 정보 처리    | `src/lib/logExport/secrets.ts`               |
| 실행기(커서 루프) | `src/lib/logExport/runner.ts`                |
| API 프로젝션      | `src/lib/logExport/presenter.ts`             |
| BigQuery 대상     | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA 인증    | `src/lib/logExport/googleServiceAccount.ts`  |
| 호출 로그 소스    | `src/lib/usage/callLogExportSource.ts`       |
| 영속성            | `src/lib/db/logExportDestinations.ts`        |
| Cron 작업         | `src/lib/jobs/logExportJob.ts`               |
| REST 계층         | `src/app/api/log-export/`                    |
| 대시보드 페이지   | `src/app/(dashboard)/dashboard/log-export/`  |

스키마: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

모든 경로에는 관리 인증(`requireManagementAuth`)이 적용됩니다. 비밀 정보는 절대 반환되지 않습니다.
저장된 비밀 정보는 리터럴 `__stored__`로 반환되며, 업데이트 시 이 값을 다시 전송하면
저장된 자격 증명이 유지됩니다.

비밀 정보를 선언한 유형의 대상을 생성하거나 업데이트하려면 **`STORAGE_ENCRYPTION_KEY`가
필수입니다**. 이 키가 없으면 `encrypt()`가 아무 처리 없이 값을 그대로 통과시키므로,
자격 증명을 SQLite에 평문으로 저장하는 대신 쓰기 요청이 400으로 거부됩니다(이는
Telegram 웹후크에 적용되는 것과 동일한 보호 조치입니다).

| 메서드   | 경로                                     | 용도                                     |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/log-export/types`                  | 대상 유형과 해당 구성 필드 목록          |
| `GET`    | `/api/log-export/destinations`           | 대상 목록 조회(비밀 정보 마스킹)         |
| `POST`   | `/api/log-export/destinations`           | 대상 생성                                |
| `GET`    | `/api/log-export/destinations/{id}`      | 단일 대상 조회                           |
| `PUT`    | `/api/log-export/destinations/{id}`      | 이름/활성화 여부/구성/배치 설정 업데이트 |
| `DELETE` | `/api/log-export/destinations/{id}`      | 삭제                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | 자격 증명 확인, 아무것도 쓰지 않음       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | 즉시 처리, 예약 실행과 동일한 경로 사용  |
| `GET`    | `/api/log-export/status`                 | Cron 상태, 최근 실행, 대상별 백로그      |

`GET /api/log-export/types` 덕분에 UI를 범용적으로 사용할 수 있습니다. 대시보드 양식은
반환된 필드 설명자를 기반으로 렌더링되므로, 새 대상을 추가해도 UI를 변경할 필요가 없습니다.

---

## 4. BigQuery 대상

구성 키(`type: "bigquery"`):

| 키                   | 설명                                                             |
| -------------------- | ---------------------------------------------------------------- |
| `projectId`          | 데이터 세트를 보유한 GCP 프로젝트                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                  |
| `location`           | 데이터 세트를 생성해야 할 때만 사용(기본값 `EU`)                 |
| `serviceAccountJson` | 서비스 계정 키. 비밀 정보: 저장 시 암호화되며 절대 반환되지 않음 |
| `autoCreate`         | 첫 번째 내보내기 시 데이터 세트와 테이블 생성(기본값 `true`)     |

서비스 계정에는 대상 테이블에 대한 `bigquery.tables.updateData` 권한이 필요하며,
`autoCreate`가 활성화된 경우 `bigquery.datasets.create` / `bigquery.tables.create` 권한도 필요합니다.

구성된 배치는 HTTP 단위가 아니라 **커서** 단위입니다. `send()`는 이를 최대 500개 행의
insertAll 호출로 나누므로, `batch_size`가 커도 BigQuery의 10MB 요청 한도를 초과하지 않습니다.
일시적 상태(408/429/500/502/503/504)는 동일한 insertIds를 재사용하여 지수 백오프로 최대
세 번 재시도합니다. 인증 및 스키마 오류는 실행을 불필요하게 소모하지 않도록 첫 번째 시도에서
즉시 예외를 발생시킵니다.

방금 생성된 테이블은 아직 스트리밍 엔드포인트에 표시되지 않기 때문에 몇 초 동안 404가
반환됩니다. 이 404는 재시도되지만, **현재 실행에서 테이블을 생성한 경우에만** 해당합니다.
실제로 테이블이 없는 경우에는 즉시 실패합니다. 최근 삭제한 테이블과 같은 이름으로 테이블을
다시 생성하면 BigQuery가 몇 분 동안 스트리밍 삽입을 거부한다는 점에 유의하세요. 이는
삭제 후 재생성 방식의 특성이므로, 테이블을 삭제했다가 다시 추가하는 대신 새 테이블 이름을
사용하는 것이 좋습니다.

**부분 실패는 비어 있지 않은 `insertErrors[]`와 함께 HTTP 200으로 반환됩니다.** 이는
실패로 처리되어 예외를 발생시킵니다. 이렇게 해야 BigQuery가 수락하지 않은 행을 지나 커서가
진행하는 것을 방지할 수 있습니다. `tests/unit/log-export-bigquery.test.ts`에서 이 동작을
고정하여 검증합니다.

전송에는 일반 REST를 사용합니다. 자체 서명된 RS256 어설션을
`https://oauth2.googleapis.com/token`에서 액세스 토큰으로 교환한 다음, 행을
`tabledata.insertAll`로 전송합니다. Google SDK는 포함되지 않습니다. 액세스 토큰은
(서비스 계정, 범위)별로 프로세스 내에 캐시됩니다.

생성된 테이블에는 Logs 탭의 각 필드별 열과 `exported_at`이 포함되며, 실제 호출 로그의
쿼리 방식에 맞게 다음과 같이 구성됩니다.

- **`timestamp`를 기준으로 일 단위 파티셔닝**되므로, 날짜 범위로 제한된 쿼리는 해당 날짜만 스캔합니다.
- **`api_key_name`, `provider`, `model`, `status` 순서로 클러스터링**되므로, 실행 주체,
  대상 위치 또는 실패 여부로 필터링할 때 각 파티션 내부의 블록을 제외할 수 있습니다. BigQuery는
  최대 4개의 클러스터링 열을 허용하며 열 순서가 중요합니다. `api_key_name`만 사용하는 필터는
  블록을 제외할 수 있지만, `status`만 사용하는 필터는 그렇지 않습니다.
- **`partitionExpirationDays`를 통한 선택적 파티션 보존 기간**(0이면 모두 유지)은
  테이블 생성 시 적용됩니다.

두 설정 모두 생성 시점에 적용됩니다. 기존 테이블은 이미 사용 중인 레이아웃을 그대로 유지하므로,
이 설정을 적용하려면 대상을 새 테이블 ID로 지정하세요.

`tests/unit/log-export-bigquery.test.ts`는 매퍼와 테이블 스키마가 항상 일치하는지 검증하므로,
새 통화 로그 열이 내보내기 과정에서 조용히 누락되는 것을 방지합니다.

배치는 행 수와 직렬화된 바이트 크기 **모두**를 기준으로 청크로 분할됩니다. 페이로드를 내보낼 때는
행 수만으로 충분하지 않습니다. 프롬프트가 포함된 500개 행은 수십 메가바이트에 달할 수 있으며, insertAll은
10 MB를 초과하는 요청을 거부합니다. 청크는 500개 행 또는 9 MB 중 먼저 도달하는 한도에서 종료됩니다.

---

## 5. 대상 추가

1. `LogExportDestinationType`을 내보내는 `src/lib/logExport/destinations/<name>.ts`를 생성합니다.
   여기에는 Zod `configSchema`, UI용 `fields` 설명자 배열, `secretFields`, 그리고
   `test()` / `prepare()` / `send(records)`를 반환하는 `createClient(config)`가 포함되어야 합니다.
2. `src/lib/logExport/registry.ts`의 `DESTINATIONS` 배열에 추가합니다.
3. `tests/unit/` 아래에 테스트를 작성합니다.

변경 사항은 이것이 전부입니다. 영속성, cron 작업, REST 계층, 비밀 정보 암호화 및
대시보드 양식은 모두 레지스트리를 참조합니다.

새 대상에 적용되는 두 가지 규칙은 다음과 같습니다.

- 부분 실패가 발생하면 `send()`는 **반드시 예외를 발생시켜야 합니다**. 정상적으로 반환된다는 것은 "대상에 이 행들이 존재한다"는 의미이며,
  커서는 해당 행들을 영구적으로 지나 이동합니다.
- 사용자가 제공한 URL을 사용하는 대상은 가져오기를 수행하기 전에 웹후크와 동일한 방식으로
  `parseAndValidateWebhookUrl`(`src/shared/network/outboundUrlGuardPolicy.ts`)을 통해 URL을 검증해야 합니다.
  BigQuery는 호스트가 상수이므로 이 검증이 필요하지 않습니다.

---

## 6. 운영

- **대시보드**: 통합 → 로그 내보내기. 대상을 추가하고, 행을 쓰지 않고 자격 증명을 확인하려면
  **테스트**를 실행한 다음 대상을 활성화합니다.
- **백로그**: 각 대상 카드에는 대기 중인 행 수와 커서가 표시됩니다. `GET
/api/log-export/status`는 동일한 수치와 최근 20회의 작업 실행 기록을 반환합니다.
- **한 대상의 실패가 다른 대상을 실패하게 만들지는 않습니다** — 실행 요약은 대상별 상태를
  `last_status` / `last_error`에 기록하며, 작업 실행 기록에는 집계 결과가 보관됩니다.
- **대상을 삭제하면 해당 커서도 삭제됩니다.** 대상을 다시 추가하면 보존된 호출 로그 중 가장 오래된 항목부터
  시작하므로, 대상에 이미 존재할 수 있는 행이 다시 전송됩니다. BigQuery에서는 행별
  `insertId`가 BigQuery 자체의 중복 제거 기간 내에서만 이를 처리하므로, 대상을 삭제하기보다는
  비활성화하는 것이 좋습니다.
