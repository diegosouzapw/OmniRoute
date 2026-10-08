# Quality Gates Reference (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

이 문서는 OmniRoute의 모든 CI 품질 게이트에 대한 공식 참조 문서입니다.
각 게이트의 설명, 검증 대상, 실행되는 CI 작업, 래칫 기준선 또는 통과/실패 정책의 사용 여부,
빌드 차단 여부 또는 권고 사항인지 여부를 설명합니다.

간략한 요약과 허용 목록 정책은 `AGENTS.md`의 "Quality Gates & Ratchets" 섹션을
참조하세요. 동일한 시스템에 대한 중요도 평가, 성숙도 분류 및 도구에 구애받지 않는
복제 계획은 [Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md)을 참조하세요.

---

## 게이트 인벤토리 및 실행 프로필

### 후보 승인

CI 및 Quality Gates 워크플로는 각각 안정적인 판정 결과인 `Gate / CI`와
`Gate / Quality`를 생성합니다. 버전이 관리되는 승인 정책은 모든 업스트림 작업을
필수 또는 권고로 열거합니다. 적용 가능한 필수 작업은 성공해야 합니다. 누락됨,
취소됨, 건너뜀, 대기 중 및 알 수 없는 결과로는 PASS를 확정할 수 없습니다. 유효한
문서 전용 또는 카탈로그 전용 분류는 코드 레인을 적용 대상에서 제외할 수 있지만,
초안 PR은 승인된 후보가 아닙니다. `hotfix` 레이블이 증거 요건을 면제하지는 않습니다.

두 워크플로 모두 PR과 main/release 브랜치로의 푸시, 수동 디스패치 및
병합 그룹 이벤트를 다룹니다. 푸시, 디스패치 및 병합 그룹은 전체 선택 항목을
실행합니다. 포크와 병합 그룹은 원래 자체 호스팅 러너를 선택하는 작업에
호스팅 러너를 사용합니다. 롤아웃 전에 충분한 호스팅 용량을 확인해야 합니다.

각 JSON 영수증은 체크아웃된 SHA, 워크플로 실행 및 시도를 식별합니다.
CLI는 체크아웃 SHA와 이벤트 SHA의 불일치를 거부합니다. 워크플로 테스트는 정책
멤버십을 판정 작업의 `needs` 목록에 연결하므로 새로 추가되거나 제거된 레인이
조용히 사라질 수 없습니다. 영수증은 자체 워크플로를 다루며, 게시, 배포 또는
기존 권고 스캐너의 내부 동작은 다루지 않습니다. 브랜치 규칙에서 두 검사 이름을
모두 활성화하는 것은 별도의 관리 변경 사항입니다. 이러한 작업을 추가하는 것만으로는
브랜치가 보호되지 않습니다.

### 정적 스캔 인벤토리

버전이 관리되는 npm 별칭 인벤토리와 정적 스캔 멤버십은
`config/quality/gate-manifest.json`에 있습니다. `package.json`을 기준으로
스크립트 이름과 정확한 명령을 검증하려면 `npm run check:gate-manifest`를 실행하세요.
추가, 제거 및 명령 드리프트가 발생하면 로컬 훅과 CI의 변경 분류 작업이 모두
실패합니다. 별칭은 워크플로 작업, 매트릭스 인스턴스 또는 테스트 케이스가 아닙니다.
따라서 이러한 개수를 서로 호환되는 것처럼 제시해서는 안 됩니다.

선택된 별칭을 실행하지 않고 확인하려면 `npm run quality:scan -- --list` 또는
`npm run quality:scan:fast -- --list`를 사용하세요. 러너는 npm 진입점을
호출하므로 구성된 경우 Bun을 포함한 런타임이 유지됩니다. 매니페스트는 해당
프로필 외부의 별칭을 별도 호출 항목으로 기록하며, 읽기 전용 스캔 프로필에서는
유지보수 명령이 금지됩니다.

이러한 프로필은 정적 스캔만 다룹니다. 제품 테스트, 커버리지, 패키징,
외부 검사 또는 후보의 전체 릴리스 승인을 보증하지 않습니다. 워크플로 승인은
연결된 `config/quality/admission-policy.json`과
`scripts/quality/admission-verdict.mjs`를 사용합니다. 릴리스 관찰자 프로필은
별도로 유지됩니다. 적용 가능한 검사와 영수증을 독립적으로 확인하세요. 아래의
서술형 인벤토리는 참조 자료일 뿐, 게이트가 실제로 실행되었다는 증거는 아닙니다.

스크립트는 `scripts/check/`(정책 게이트)와 `scripts/quality/`(래칫 엔진)에 있습니다.
CI의 단일 진실 공급원은 `.github/workflows/ci.yml`입니다.

### 릴리스 PR 빠른 경로(`quality.yml`)

`.github/workflows/quality.yml`은 main/release PR, 보호된 브랜치로의 푸시,
디스패치 및 병합 그룹에서 CI를 보완합니다. PR은 경로 필터링된 빠른 검사를 사용합니다.
영구적으로 비활성화된 중복 빌드는 제거되었으며, 실제 빌드/패키지/부팅 검사는 CI에 남아 있습니다.

| 작업                                             | 범위                                                                                                                                         | 차단 여부     |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Docs Gates (fast-path)`                         | 문서/코드 PR, API 문서 참조 및 전체 문서                                                                                                     | 예            |
| `Fast Quality Gates`                             | 코드 PR, 정적 검사, 타입 검사, 대시보드 타입 검사, 영향받는 단위 테스트                                                                      | 예            |
| `Forgotten sibling tests`                        | 코드 PR, 변경된 모듈을 정적 소비자와 후보 형제 테스트까지 추적, 배럴 및 동적 임포트 경로는 참조된 허용 목록 예외와 함께 권고 진단으로 보고됨 | **권고**      |
| `Vitest (fast-path)`                             | 코드 PR, 빠른 vitest 스위트                                                                                                                  | 예            |
| `Unit Tests fast-path`                           | 코드 PR, 4샤드 단위 테스트 스위트                                                                                                            | 예            |
| `No new ESLint warnings`                         | 코드 PR, 억제 규칙을 인식하는 린트 가드                                                                                                      | 예, 포크 포함 |
| `Merge integrity (changelog + generated skills)` | 초안이 아닌 PR, 변경 로그 및 생성된 스킬 동기화                                                                                              | 예, 포크 포함 |

#### 누락된 형제 테스트 보고서

`npm run check:forgotten-sibling-tests`는 테스트 영향도 맵의 기반이 되는 임포트 리졸버를 재사용합니다.
변경된 각 프로덕션 모듈에 대해 후보 테스트가 풀 리퀘스트 diff에 없으면 결정론적인
`변경된 모듈/심볼 -> 정적 소비자 -> 후보 형제 테스트` 체인을 보고합니다. 차단 방식으로
롤아웃하기 전 보정을 위해 Markdown 요약과 JSON 결과는 `forgotten-sibling-tests`
워크플로 아티팩트로 보존됩니다.

배럴 재내보내기와 동적 가져오기는 오직 해석 진단에만 사용되며, 차단
결과를 생성하지 않습니다. 검토된 예외는
`config/quality/forgotten-sibling-allowlist.json`에 있습니다. 각 항목에는 소비자와 후보
테스트를 명시하고, 구체적인 근거를 제시하며, GitHub 이슈 또는 풀 리퀘스트를 연결해야 합니다. 형식이 잘못된 항목은
폐쇄형으로 실패합니다. 예외는 삭제된 후보 테스트나 `.skip`/`.todo`를 추가하는 diff를 억제할 수 없습니다.
어서션 약화 및 기타 마스킹은 독립적으로 차단하는
`check:test-masking` 게이트가 계속 담당합니다.

### 작업: `lint`

`main`을 대상으로 하는 모든 PR에서 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트 (`npm run ...`)          | 검증 항목                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 차단 여부                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원 범위 내에 있는지 확인                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 예                                   |
| `check:cycles`                    | `src/` + `open-sse/` 전체의 순환 가져오기를 검사합니다(AST 기반, tsconfig `paths` 해석). 기본 실행은 권고용이며 순환 목록을 표시합니다. `check:cycles:ratchet`(CI에서 실행되는 항목)은 순환 수가 `quality-baseline.json`의 `metrics.cycles` 상한을 초과하면 차단합니다. 현재 상한은 14이고 `direction: down`이므로 감소만 가능합니다(#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 예(래칫)                             |
| `check:route-validation:t06`      | 모든 라우트에 Zod 스키마가 있는지 확인(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 개수가 예산을 초과하지 않는지 확인(Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:provider-consistency`      | `providers.ts`의 모든 프로바이더에는 `providerRegistry.ts`에 일치하는 항목이 있으며, 그 반대도 동일합니다(허용 목록 내에서).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:model-lifecycle`           | 수동으로 유지 관리되는 세 개의 라우팅 테이블이 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지합니다. `FITNESS_TABLE`(`taskFitness.ts`)은 `REGISTRY`가 라우팅할 수 있는 사용 종료 ID에 점수를 부여하지 않으며, 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY`에 존재하고 사용 종료 ID 스냅샷에는 없습니다. `REGISTRY`에 아직 남아 있는 모든 사용 종료 ID는 포워딩되거나 `allowedRetiredInCatalog`에 나열되며, `DEFAULT_DEGRADATION_MAP`의 소스나 대상은 해당 스냅샷에서 사용 종료 상태로 표시되지 않습니다. 이는 모델이 현재 실제 업스트림에서 제공되고 있음을 입증하지는 않습니다. 오프라인 검사로, `config/quality/model-lifecycle.json`과 비교합니다. 이 파일은 `npm run quality:refresh-model-lifecycle`을 사용해 수동으로 갱신합니다(네트워크 필요, CI에는 연결되지 않음). `allowedRetiredInCatalog`는 단계적 축소를 위한 래칫입니다. 추적 이슈가 있는 경우에만 항목을 추가하십시오. | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/`에 있는 모든 `fetch("/api/...")`가 실제 `route.ts`로 해석됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:deps`                      | 저장소의 모든 `package.json`에 있는 `npm install` 가능한 모든 종속성이 `dependency-allowlist.json`에 포함되어 있으며, 새로 추가된 버전이 고정되지 않은 패키지나 슬롭스쿼팅 패키지는 플래그로 표시됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `audit:deps`                      | `npm audit`(루트) — 높음/심각 수준의 보안 권고 없음(osv `check:vuln-ratchet`과 중복됨. Rationalization Backlog 참조)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:licenses`                  | 프로덕션 종속성에 대한 SPDX 라이선스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 / 커밋된 `node_modules` 심볼릭 링크 없음(husky pre-commit에서도 실행됨; pre-push는 의도적으로 가볍게 유지 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/봇 `Co-Authored-By` 트레일러나 AI 생성 푸터 없음 — 엄격한 규칙 #16(PR→`release/**`에 대한 `quality.yml` 빠른 게이트 루프에서 이벤트 페이로드를 읽으며, PR이 아닌 경우 아무 작업도 하지 않음 — 그리고 PR→`main`에 대한 `ci.yml` 린트의 PR 전용 단계; husky `commit-msg` 훅에서도 실행됨; 사람 공동 작성자는 허용됨; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | 모든 Vitest 제외 항목은 추적 이슈를 명시하고 `config/quality/vitest-exclusions.json`에 포함되어야 함(#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:file-size`                 | 소스 파일이 확장자별 상한을 초과하지 않음(래칫: 대용량 파일은 `frozen` 목록에 고정)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:error-helper`              | 실행기/핸들러의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()`를 사용함(엄격한 규칙 #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:migration-numbering`       | 마이그레이션 SQL 파일은 누락되거나 중복된 번호 없이 순차적으로 번호가 지정되어야 함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 예                                   |
| `check:public-creds`              | `publicCreds.ts` 외부에 OAuth `client_id`/`client_secret` 또는 Firebase Web 키 리터럴이 없어야 함(강제 규칙 #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에 원시 SQL이 없어야 하며, `localDb.ts`에서 배럴 임포트를 사용하지 않아야 함(강제 규칙 #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 공급자 실행기, 라우팅 전략 및 변환기가 디스크의 파일과 일치해야 하며, 연결되지 않았거나 선언되지 않은 심볼이 없어야 함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:route-guard-membership`    | 자식 프로세스를 생성하는 모든 라우트는 `isLocalOnlyPath()`로 분류되어야 함(강제 규칙 #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일은 하나 이상의 테스트 러너에서 수집되어야 함(래칫: `test-discovery-baseline.json`의 고아 목록은 줄어들기만 할 수 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:agent-skills-sync`         | 생성된 agent-skills 아티팩트가 소스 카탈로그와 일치함(드리프트 없음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | 공급자 로고/에셋에 기록된 출처 항목이 있음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON 구성 파일이 정상적으로 파싱되고 저장소 린트 규칙을 충족함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | 오류 없이 TypeScript 컴파일(권고 경고만 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 향후 적용을 위한 항목이며, 기존의 많은 호출 지점에는 여전히 어노테이션이 필요함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **권고** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`로 범위가 지정된 `tsc` (#7033) — `typecheck:core`의 엄선된 27개 파일 허용 목록에는 대시보드 TSX가 전혀 포함되지 않으며, `next build` 역시 이를 타입 검사하지 않으므로(`next.config.mjs`에서 `ignoreBuildErrors: true` 설정), 해당 영역의 고립된 식별자 회귀(#6625/#6909)가 CI에서 감지되지 않았음. 고정된 파일별/TS 코드별 개수 기준선(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`와 동일한 오래된 항목 강제 적용 패턴)과 비교함 — 기준선에 기록된 개수를 초과하는 새로운 오류만 게이트를 실패하게 하며, 기존 오류가 수정되면 `--update`를 사용하여 기준선을 낮출 수 있음.                                                                                                                                                                                                                                                       | 예                                   |

### 작업: `quality-gate`

`test-coverage` 이후에 실행됩니다. 실패하면 병합을 차단합니다.

| 스크립트                     | 검증 항목                                                                                                                                                    | 차단 여부            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `quality:collect`            | `quality-metrics.json` 생성(ESLint 경고 수, 병합된 샤드 보고서의 커버리지)                                                                                   | 예(래칫의 선행 단계) |
| `quality:ratchet`            | `quality-baseline.json`의 각 메트릭이 악화되지 않았는지 확인(ESLint 경고 ≤ 기준선, 커버리지 ≥ 기준선)                                                        | 예                   |
| `check:duplication`          | 코드 중복(jscpd@4)이 `quality-baseline.json`의 기준선을 초과하지 않는지 확인                                                                                 | 예                   |
| `check:complexity`           | 파일 수준 순환 복잡도가 상한을 초과하지 않는지 확인(코어 ESLint `complexity` + `max-lines-per-function`)                                                     | 예                   |
| `check:cognitive-complexity` | 인지 복잡도 래칫(`eslint-plugin-sonarjs`) — 별도의 ESLint 패스이며, CI에서는 두 패스를 단일 `check:complexity-ratchets` 단계로 병합하여 실행                 | 예                   |
| `check:dead-code`            | 사용되지 않는 내보내기/파일 래칫(knip)이 기준선 대비 악화되지 않는지 확인                                                                                    | 예                   |
| `check:compression-budget`   | 압축 벤치마크 예산 — 엔진별 토큰 절감률 하한이 악화되지 않아야 함                                                                                            | 예                   |
| `check:type-coverage`        | 타입 지정 비율 래칫(`type-coverage`)이 악화되지 않는지 확인하며, 대부분 `typecheck:noimplicit:core`를 포괄                                                   | 예                   |
| `check:codeql-ratchet`       | 열린 CodeQL 경고 수가 악화되지 않는지 확인(`gh api`를 통해 조회하며, 토큰이 없으면 정상적으로 건너뜀) — 갱신 주기 및 수동 트리거는 아래의 "CodeQL 래칫" 참조 | 예                   |

### 작업: `quality-extended`

전체 작업은 권고용입니다(`continue-on-error: true`). npm 기반 래칫은
실제로 실행되며, 외부 스캐너는 `gh release download`를 통해 설치되고 바이너리가
여전히 없으면 자체적으로 건너뜁니다(종료 코드 0).

| 스크립트                 | 검증 항목                                                                                                                                                                                                       | 차단 여부                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:circular-deps`    | 순환 종속성이 없는지 확인(dpdm)                                                                                                                                                                                 | **권고**                                  |
| `check:bundle-size`      | 번들 크기가 상한을 초과하지 않는지 확인                                                                                                                                                                         | **권고**                                  |
| `check:secrets`          | 비밀 정보 스캔(gitleaks) — 바이너리가 없으면 건너뜀                                                                                                                                                             | **권고**                                  |
| `check:vuln-ratchet`     | 종속성 취약점(osv-scanner)이 악화되지 않는지 확인 — 바이너리가 없으면 건너뜀                                                                                                                                    | **권고**                                  |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor). 스캐너가 없거나 손상된 경우, 보고서가 유효하지 않은 경우 또는 래칫 기준선이 없는 경우 INCOMPLETE로 실패합니다. 유효한 발견 항목에는 선택된 엄격/권고/래칫 정책이 적용됩니다 | 실행 필수, CI에서 zizmor 래칫은 차단 항목 |
| `check:openapi-breaking` | 기본 브랜치 대비 공개 API 계약(`openapi.yaml`)의 호환성을 깨뜨리는 변경(oasdiff) — `openapiBreaking=N` 생성. oasdiff가 없거나 기본 명세를 확인할 수 없으면 건너뜀                                               | **권고**                                  |

### 작업: `docs-sync-strict`

`main`에 대한 모든 PR에서 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트                       | 검증 내용                                                                                                                                                             | 차단 여부                  |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | 아래의 6개 하위 게이트를 순차적으로 실행하는 메타 게이트                                                                                                              | 예                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt 버전 일관성                                                                                                                             | 예                         |
| ↳ `check:docs-counts`          | 문서 본문의 수치(제공자 수, 마이그레이션 수 등)가 실제 수치의 래칫 범위 내에 있는지 확인                                                                              | 예                         |
| ↳ `check:env-doc-sync`         | `.env.example`의 모든 환경 변수가 문서 표에 기록되어 있고, 그 반대도 성립하는지 확인                                                                                  | 예                         |
| ↳ `check:deprecated-versions`  | 문서에 지원 중단된 버전 문자열이 없는지 확인                                                                                                                          | 예                         |
| ↳ `check:doc-links`            | 문서의 내부 마크다운 링크가 실제 파일로 연결되는지 확인(`[text]`/`(path)` 형식)                                                                                       | 예                         |
| ↳ `check:fabricated-docs`      | 문서에 언급된 라우트, 환경 변수, CLI 명령어, 훅 이름 및 파일 경로가 코드베이스에 존재하는지 확인. `--strict`를 사용하면 하드 게이트이며, 플래그가 없으면 소프트 실패. | 예(CI에서 `--strict` 사용) |
| `check:cli-i18n`               | CLI 명령어 문자열이 모든 i18n 로케일 파일에 존재하는지 확인                                                                                                           | 예                         |
| `check:openapi-coverage`       | OpenAPI 명세가 래칫으로 설정된 실제 라우트의 최소 기준 이상을 포괄하는지 확인                                                                                         | 예                         |
| `check:openapi-security-tiers` | `openapi.yaml`의 보안 계층 어노테이션이 `routeGuard.ts` 분류와 일치하는지 확인                                                                                        | **권고**                   |
| `check:openapi-routes`         | `openapi.yaml`의 모든 경로가 실제 `route.ts`로 연결되는지 확인(환각 방지)                                                                                             | 예                         |
| `check:docs-symbols`           | `docs/**/*.md`의 모든 `/api/...` 참조가 실제 `route.ts`로 연결되는지 확인(환각 방지)                                                                                  | 예                         |
| `i18n translation drift`       | i18n 로케일 파일의 번역되지 않은 키 — 경고만 표시                                                                                                                     | **권고**                   |

### 작업: `i18n-ui-coverage`

| 스크립트                          | 검증 내용                                                                                                                                                                        | 차단 여부 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 커버리지가 65% 이상인지 확인                                                                                                                                          | 예        |
| `check-ui-value-drift` (인라인)   | 재작성된 영어 **값**에 오래된 번역이 남아 있지 않은지 확인                                                                                                                       | 예        |
| `check-new-key-coverage` (인라인) | **새로운** 영어 키가 모든 로케일에서 번역되었는지 확인 — `__MISSING__:` 마커는 거부됨                                                                                            | 예        |
| `check-translation-ratio`         | 로케일별 실제 번역 비율(허용 목록에 포함되지 않은 영어와 동일한 값 / 플레이스홀더 / 누락된 리프)이 `config/quality/i18n-translation-baseline.json` + 여유분을 초과하지 않아야 함 | **권고**  |

`fetch-depth: 0`이 필요합니다. 값 드리프트 게이트는 병합 기준점을 기준으로 `en.json`의 차이를 비교합니다.

#### `check-ui-value-drift` — 오래된 번역 게이트

다른 게이트가 구조적으로 감지할 수 없는 한 가지 i18n 회귀를 포착합니다. 영어 값이
재작성되었지만 _이전_ 영어에서 파생된 번역은 그대로 남아 있어, 영어가 아닌 언어의
사용자가 확신에 찬 어조로 작성된, 이제는 잘못된 문구를 계속 읽게 되는 경우입니다.

이 문제는 실제로 배포되었습니다. Antigravity 로그인 도우미가 추가되었을 때(#5203)
`oauthModal.googleOAuthWarning`이 재작성되었지만, **43개 로케일 중 39개**에는 운영자에게
"전체 URL을 복사하여 아래에 붙여 넣으라"고 안내하는 문구가 그대로 남아 있었습니다.
해당 제공자에서는 완료할 수 없는 흐름이었습니다. 이 문제는 다음 이유로 #8463까지
발견되지 않았습니다.

- `sync-ui-keys`는 **없는** 키만 백필하며, **오래된** 키는 절대 처리하지 않습니다.
- `check-ui-keys-coverage`는 키의 _존재 여부_를 계산하므로, 오래된 번역도 커버된 것으로 간주됩니다.
- `check-translation-drift`는 `docs/i18n/<locale>/**.md` 문서 미러를 추적하며 —
  `src/i18n/messages/*.json`은 전혀 읽지 않습니다. 2026-09 재동기화 이후 작업
  `docs-sync-strict`에서 차단됩니다. 핵심 문서를 편집하면 → `npm run i18n:run -- --files=<doc>`를 실행하세요(섹션 수준으로 처리되어 비용이 적음).

**차이 인식 방식이며, 기준선에 의존하지 않습니다.** 병합 기준점의 `en.json`과 작업 트리를 비교합니다. 영어 값이 변경된 모든 키에 대해, 변경되지 않은 번역을 그대로 유지하는 로케일은 오래된 상태로 간주됩니다. 이는 의도적으로 **기존 부채를 동결**합니다. 차이만으로는 오래된 번역이 어떤 이전 영어 문구에서 비롯되었는지 알 수 없으므로, 이 게이트는 현재 변경 사항이 건드리는 부분만 판단합니다. 대안인 키별 해시 기준선은 약 600 KB의 생성 파일을 필요로 하며, 이는 기존 최대 기준선의 3배 크기이고 모든 i18n PR마다 변경됩니다.

이를 충족하는 방법은 두 가지입니다.

1. 영향을 받는 번역을 업데이트하거나
2. 해당 값을 `__MISSING__:<새 영어 문구>`로 설정합니다. 그러면 런타임은 수정된 영어 문구를 제공하고
   (`src/i18n/request.ts::deepMergeFallback`, #7258), 해당 키는 번역 대기열에 추가됩니다.

문자열의 **의미**가 변경되었다면 **키 이름을 변경**하는 것이 좋습니다. 새 키는 오래된 번역을 상속할 수 없습니다. #8463에서 이 패턴을 사용했습니다.

```bash
npm run i18n:check-value-drift          # 엄격 모드(CI에서 실행하는 방식)
npm run i18n:check-value-drift:warn     # 보고만 수행
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

기준 카탈로그를 읽을 수 없는 경우(기준 ref가 없는 얕은 클론), `check-openapi-breaking`과 동일하게 `SKIP reason=base-unresolved`를 출력하고 종료 코드 0으로 종료합니다.

### 작업: `i18n`

전체 i18n 검증 매트릭스입니다(로케일당 하나의 작업). 전체 작업은 권고 사항입니다.

| 스크립트                        | 검증 항목            | 차단 여부                                            |
| ------------------------------- | -------------------- | ---------------------------------------------------- |
| `validate_translation.py quick` | 로케일별 번역 완전성 | **권고**(전체 작업에 `continue-on-error: true` 적용) |

### 작업: `pr-test-policy`

풀 리퀘스트에서만 실행됩니다.

| 스크립트               | 검증 항목                                                                                                                           | 차단 여부 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/` 또는 `bin/`의 프로덕션 코드를 변경하는 PR은 테스트를 포함하거나 업데이트해야 함(강제 규칙 #8)                   | 예        |
| `check:test-masking`   | 변경된 테스트 파일이 순 어설션 수를 줄이거나 `assert.ok(true)` 같은 항진 명제를 추가하지 않는지 확인                                | 예        |
| `check:pr-evidence`    | PR 본문에 변경 사항에 대한 테스트/VPS 근거가 명시되어 있는지 확인(PR 설명을 grep하여 강제 규칙 #18을 자동화 — 취약함, Backlog 참조) | 예        |

### 작업: `test-vitest`

`build` 이후에 실행됩니다. 실패하면 병합을 차단합니다.

| 스위트           | 검증 항목                                           | 차단 여부                                                                                                |
| ---------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP 서버(도구 110개), autoCombo, 캐시 — vitest 러너 | 예                                                                                                       |
| `test:vitest:ui` | UI 컴포넌트 테스트 — vitest 러너                    | **차단** — 기존 실패 항목은 `vitest.config.ts`에서 명시적으로 제외되며, 새로운 실패는 작업을 실패 처리함 |

### 야간 워크플로(예약 실행, 권고)

이 워크플로는 cron 일정에 따라 실행되며(`workflow_dispatch`로도 실행 가능), PR에서는 실행되지 않습니다. 모두 권고 사항입니다.

| 워크플로               | 검증 항목                                                                                                                                                      | 차단 여부 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `nightly-property`     | 무작위 시드와 높은 실행 횟수를 사용하는 fast-check 속성 테스트                                                                                                 | **권고**  |
| `nightly-resilience`   | 힙 증가 게이트, 카오스 장애 주입, k6 부하/소크 테스트                                                                                                          | **권고**  |
| `nightly-llm-security` | promptfoo 인젝션 가드(차단 모드) + garak 프로브(프로바이더 시크릿이 없으면 건너뜀)                                                                             | **권고**  |
| `nightly-schemathesis` | `docs/openapi.yaml`을 사용하여 실행 중인 OmniRoute를 대상으로 수행하는 OpenAPI 계약 퍼징(schemathesis) — 명세 위반/처리되지 않은 500 오류를 드러냄(Fase 8 B.4) | **권고**  |
| `nightly-mutation`     | 빠른 단위 테스트 레인에 대한 Stryker 변이 테스트 점수 — 살아남은 변이는 취약한 어설션을 드러냄                                                                 | **권고**  |
| `nightly-compat`       | 지원되는 `engines.node` 범위 전반에 걸친 Node 엔진 호환성 매트릭스                                                                                             | **권고**  |

---

## 속도 우선 단계 (2026-08-30 → v4.0 LTS): 모든 기준선을 20% 완화

오너 결정(2026-08-30): v4.0 모듈화 전까지는 기술 부채 억제보다
출시 속도가 더 중요합니다. 모든 **수치형** 래칫 기준선을 감사 가능한 단일 작업으로 20%
완화했으며, 해당 단계는 `config/quality/quality-baseline.json`에 선언되어 있습니다.

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| 변경 사항                                                                                                                                                                   | 위치                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — 낮을수록 좋은 개수는 ×1.2, 높을수록 좋은 백분율은 ÷1.2(커버리지 하한 60은 유지, `eslintErrors`는 0 유지, `eslintWarnings`는 0 → 동결된 억제 개수의 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` 메모에 모든 변경 전 → 변경 후 값 나열)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, 모든 `frozen[*]` / `testFrozen[*]` 줄 수 상한 ×1.2                                                                                                        | `file-size-baseline.json`                                                                              |
| 파일별 / TS 코드별 개수 ×1.2                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `_policy.requireTighten === false`인 동안 `--require-tighten`은 권고 사항으로 전환                                                                                          | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| 야간 `bank-ratchet-shrinks` 일시 중지(측정된 감소분을 적립하여 여유분을 상쇄하기 때문)                                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

허용 목록(`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…)은 예산이 **아니므로** 변경하지 않았습니다. 통과/실패 정책 게이트(시크릿, SQL 규칙,
문서/환경 계약, i18n 동등성, 단위 테스트)는 변경되지 않았습니다. 즉, 실패하는 테스트는 여전히 실패입니다.

**도구**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — 일회성
  완화 도구(`scripts/quality/relax-baselines.mjs`)이며, 동일한 메모로 두 번 실행할 수 없습니다.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI와 동일한 방식으로 모든 수치형 게이트를 측정하고 게이트별 남은 여유분을 출력합니다
  (`scripts/quality/baseline-headroom.mjs`). 야간 `baseline-headroom` 작업은
  **📈 Baseline headroom (velocity phase)** 현행 이슈에 표를 게시하고, 게이트가 상한의 10% 이내에
  도달했거나 이미 초과한 경우 `headroom-alert` 라벨을 추가합니다. 이 이슈는
  조기 경보 역할을 합니다. 예산이 며칠 만에 소진된다면 전체 팀이 아니라 일부 PR이 완화분을
  소모하고 있다는 의미이므로, 문제가 되는 게이트의 `_rebaseline_*` 메모를 확인하십시오.

**새 코드 모드(Clean-as-You-Code) — 2026-08-30부터, PR 빠른 경로에만 적용**

`pull_request` 이벤트에서 `quality.yml`은 `--base-ref <PR base SHA>`를 `check:file-size`,
`check:complexity-ratchets`, `check:dead-code`에 전달합니다. 이 모드에서 게이트는 HEAD와
병합 베이스를 비교하되 **PR이 변경한 파일로 범위를 제한합니다**(`scripts/check/newCodeMode.mjs`:
병합 베이스를 일회용 `git worktree`에 구현하고, 그곳과 HEAD에서 ESLint/knip을 실행한 후
파일별 개수의 차이를 계산합니다).

- **차단** — PR이 변경한 파일에 순환 복잡도/인지 복잡도 위반 또는 사용되지 않는 export를 추가한 경우
  (로그의 `complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=`);
- **권고** — 전체 합계와 동결된 기준선의 비교. 상속된 드리프트로 인해 무관한 PR이
  실패하는 일은 없습니다. 드리프트는 릴리스 조정 시 다시 동결되며 여유분 작업에서 모니터링됩니다.

`workflow_dispatch` 실행, release-green 전체 검사, 야간 여유분 작업에는 PR 베이스가 없으므로
절대값(전체) 비교를 유지합니다. 커버리지, 중복도, 타입 커버리지는 현재 전체 기준으로
유지됩니다(해당 도구들은 파일별 차이를 저렴하게 산출하지 못함). 향후 동일한 방식의 적용 후보입니다.

**v4.0에서 단계 종료(LTS = "정상으로 복귀"가 아니라 이전보다 더 엄격하게)**

1. 순수한 `release/v4.0.0` 최신 커밋에서 기록을 위해 `npm run quality:headroom --json`을 실행한 다음,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, 각 typecheck 게이트의
   `--update`를 실행합니다. 그러면 모든 기준선이 측정값으로 낮아집니다.
2. `quality-baseline.json`에서 `_policy`를 삭제하고(`--require-tighten`과 야간
   뱅킹을 다시 활성화), `check-openapi-coverage.mjs`의 `THRESHOLD = 36`(또는 그 이상)을 복원합니다.
3. 모듈화의 효과가 있었던 부분은 측정값보다 더 엄격하게 조정합니다. file-size `cap`을 다시 1000
   (또는 800)으로 설정하고, coverage 하한을 +5 높이며, 모듈화된 패키지의 dead exports를 0으로 설정합니다.

## 래칫 기준선 (`quality-baseline.json`)

래칫 엔진(`scripts/quality/check-quality-ratchet.mjs`)은 `quality-baseline.json`을 읽고
새로 수집된 `quality-metrics.json`과 비교합니다. 허용 오차를 초과하여 저하된 지표가
하나라도 있으면 빌드가 실패합니다.

현재 추적 중인 지표:

| 지표                  | 방향   | 의미                              |
| --------------------- | ------ | --------------------------------- |
| `eslintWarnings`      | `down` | ESLint 경고 수가 증가해서는 안 됨 |
| `coverage.statements` | `up`   | 구문 커버리지가 감소해서는 안 됨  |
| `coverage.lines`      | `up`   | 라인 커버리지가 감소해서는 안 됨  |
| `coverage.functions`  | `up`   | 함수 커버리지가 감소해서는 안 됨  |
| `coverage.branches`   | `up`   | 분기 커버리지가 감소해서는 안 됨  |

실질적인 개선 후 기준선을 업데이트하려면:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` 플래그는 현재 측정값을 `quality-baseline.json`에 기록합니다.
지표를 개선한 변경 사항과 함께 이 파일을 커밋하세요. 지표를 개선하고도 기준선을
업데이트하지 않은 PR은 `--require-tighten`에서 감지됩니다(Fase 6A.5,
구현 예정).

### CodeQL 래칫: 갱신 주기 및 수동 트리거

`check:codeql-ratchet`은 **PR마다가 아니라 일정에 따라 갱신되는 저장소 상태를 읽습니다.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup`은
`state: configured`, `schedule: weekly`를 보고합니다. 이는 푸시마다 수행되는
분석이 아니라 GitHub의 기본 설정 검사입니다. 따라서 경고를 수정한 PR이 병합된 후에도
다음 예약 검사가 실행될 때까지 래칫은 이전의 더 높은 개수를 계속 읽습니다. 그 결과
검사가 최신 상태로 갱신될 때까지 수정 PR의 후속 PR을 포함한 모든 열린 PR에서
회귀가 보고됩니다.

**수동 갱신**: `gh workflow run codeql.yml --ref release/vX.Y.Z`는 분석을 다시 실행하고
몇 분 이내에 경고를 다시 게시합니다. 먼저 `.github/workflows/codeql.yml`을
읽으세요. 헤더에는 GitHub의 "기본 설정"과 충돌하기 **때문에**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`)
`workflow_dispatch` 전용이라고 설명되어 있습니다. `push`/`pull_request`/
`schedule` 트리거를 복원하려면 먼저 **소유자 작업**이 필요합니다: Settings → Code security →
CodeQL: Default → Advanced. 이 전환 없이 `schedule:` 트리거를 추가하지 마세요.
실패하는 실행만 생성됩니다.

**개수가 감소한 후 기준선을 강화하세요** — `node scripts/check/check-codeql-ratchet.mjs
--update`는 새로 측정된 개수를 `quality-baseline.json` →
`metrics.codeqlAlerts.value`에 기록하여, 래칫이 이전 상한까지의 회귀를 암묵적으로
허용하지 않도록 합니다. 실제 사례(2026-09-02/03): PR #12502에서 실제 경고 7개를
수정했고(측정된 열린 경고 13개 → 6개), PR #12530에서 고정된 기준선을 이에 맞게
11개 → 6개로 강화했으며, 이후 남은 6개는 경고별 근거를 제시하여 해제해 열린 경고를
0개로 줄였습니다.

**해제 여부는 운영자가 결정합니다(엄격한 규칙 #14)** — 해제 코멘트에 기술적 근거를
기록하지 않고 CodeQL 경고를 해제해서는 안 됩니다. 업스트림 프로토콜 요구 사항에는
`won't fix`, 테스트 픽스처에는 `used in tests`, CodeQL이 인식할 수 없는 새니타이저에는
`false positive`를 사용하세요(선례: `docs/security/ERROR_SANITIZATION.md`).

---

## 테스트 재시도 정책 (WS5.4, v3.8.49)

재시도는 러너별로 적용하며, 절대로 전역적으로 일괄 적용하지 않습니다. 일괄 재시도는 실제 회귀를
보이지 않는 플레이크로 바꿉니다.

| 러너             | 정책                                                                                                        | 이유                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | CI에서만 `retries: 1`, `trace: on-first-retry` 사용                                                         | 브라우저/네트워크 타이밍은 실제로 비결정적일 수 있습니다. 트레이스를 포함한 한 번의 재시도로 플레이크를 진단 가능한 아티팩트로 전환합니다 |
| Vitest           | 전역 재시도 없음. 플레이크로 확인된 테스트에만 명시적인 테스트별 재시도 적용(diff에 표시되고 PR에서 검토됨) | 격리 목록을 불투명하게 숨기지 않고 저장소에 유지합니다                                                                                    |
| node:test (단위) | 어떤 경우에도 재시도 없음                                                                                   | 불안정한 단위 테스트는 테스트의 버그입니다. 다시 돌리지 말고 수정해야 합니다                                                              |

플레이크 텔레메트리가 적용된 후의 목표 SLO(WS5.2/5.3): 테스트별 플레이크율 <1%
("즉시 수정" 임계값), 파이프라인별 통과율 ≥95%. 업계 참조값이며,
자체 측정값에 맞춰 재조정합니다.

## 릴리스 수준 래칫 드리프트 (WS5.5, v3.8.49)

래칫(파일 크기, 복잡도, eslint 경고)이 순수 릴리스 팁에서 회귀한 경우,
즉 병합의 조합으로 인해 회귀가 발생했지만 개별 PR 브랜치에서는 어느 것도
단독으로 회귀를 재현하지 못하는 경우, 수정 책임은 **릴리스 캡틴에게 있으며, 릴리스 브랜치에서 한 번만**
수행합니다. 추출/리팩터링을 우선하고, 문서화된 근거 항목이 있을 때만 기준선을 재설정합니다.
조합 드리프트를 기여자의 PR에 전가하지 말고, PR별로 기준선을 재설정하지 마십시오
(그렇게 하면 실제 회귀가 숨겨집니다). 먼저 구분하십시오. 자신의 PR이 원인이라고 가정하기 전에
프로브 worktree에서 순수 팁을 기준으로 실패를 재현해야 합니다.

## 래칫 축소분 반영 — 하향 방향 (#8584)

래칫은 절반만 자동화되어 있으며, 그것도 잘못된 절반입니다. 상한을 **높이는** 것은
10초면 끝나는 수동 JSON 편집이며, 실패한 PR의 차단을 해제하는 가장 빠른 방법입니다.
상한을 **낮추려면** 누군가 `--update`를 실행하고 결과를 커밋해야 합니다. 하지만
`bank-ratchet-shrinks` 작업이 추가되기 전까지 이를 실행하는 워크플로는 없었습니다.
측정된 결과(2026-07-25): 800줄 신규 파일 상한 이하인 동결 파일이 이미 18개였고, 최악은
132배였습니다(`src/shared/validation/schemas.ts`, 19줄 파일에 2,523 상한 적용).
복잡도 상한은 약 37개의 기준선 재설정 메모에 걸쳐 `1794 → 2169`로 증가했으며,
감소는 정확히 한 번(−1)이었습니다. 또한 "다음 주기에 `--update`로 강화"한다는 문구는
31번 작성되었지만 실제로 이행된 것은 한 번뿐이었습니다. 상한이 그 상한을 발생시킨
코드보다 오래 남으면, 완료된 모든 분해 작업이 해당 파일을 다음에 편집하는 사람을 위한
증가 허용량으로 조용히 바뀝니다.

`nightly-release-green.yml` → **`bank-ratchet-shrinks`** 작업이 이 루프를 닫습니다.

|           |                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------- |
| 실행 조건 | `schedule`(하루 3회) + `workflow_dispatch` — 의도적으로 `push`에서는 실행하지 않음             |
| 측정 대상 | 가장 높은 `release/vX.Y.Z`, `release-green`과 동일한 해석 방식 및 주입 방지 장치 적용          |
| 기록 내용 | `check:file-size --update` 및 `check:complexity-ratchets --update`(둘 다 설계상 축소만 가능)   |
| 검증 방법 | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                       |
| 제공 방식 | 릴리스 브랜치를 대상으로 항상 최신 상태인 PR 하나 — 강제 업데이트하며, 중복 PR을 생성하지 않음 |

축소분 반영은 지연 시간 요구사항이 없으므로 푸시별이 아니라 일괄 처리합니다
(8시간 이내에 축소분이 반영되면 충분합니다). 반면 병합별 실행은 병합 작업이 집중되는 동안
PR 브랜치를 반복해서 다시 빌드하고 매번 전체 ESLint 순회 비용을 발생시킵니다.
감지는 계속 푸시 시점(`release-green`)에 수행하며, 반영만 일괄 처리합니다.

### 안전성 검증기

이 작업은 사람의 개입 없이 기준선에 기록하므로, 이를 안전하게 만드는 것은
`verify-ratchet-bank.mjs`입니다. 이 스크립트는 `--update` 실행 후의 트리를 `HEAD`와
비교하며, 모든 변경이 다음 중 하나에 해당하지 않으면 **커밋이 생성되기 전에 작업을 중단**하여
PR도 열지 않습니다.

- `frozen` / `testFrozen` 숫자 항목의 값이 **낮아지거나** 항목이 **제거됨**
- `complexity-baseline.json` → `count`가 **낮아짐**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value`가 **낮아짐**

그 밖의 모든 변경은 실패합니다. 숫자를 높이거나, 항목을 추가하거나, `cap`/`testCap`을 변경하거나,
`_rebaseline_*` 메모를 삭제/재작성하는 경우가 이에 해당합니다. 이러한 메모는 각 상한이 존재하는
이유를 보여 주는 감사 추적 기록이며, 파일 항목과 동일한 `frozen` 객체 안에 저장됩니다.
상한을 높일 수 있는 봇은 현 상태보다 명백히 더 나쁩니다. 회귀 방지 테스트:
`tests/unit/verify-ratchet-bank.test.ts`.

이 작업은 절대로 `release/*`에 푸시하지 않습니다. PR은 사람이 병합하므로,
잘못된 측정값이 검토 없이 반영될 수 없습니다.

## 허용 목록 정책

기존 위반으로 인해 실패할 수 없는 모든 게이트는 고정된 허용 목록
(예: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`)을 사용합니다. 정책은 다음과 같습니다.

**근본 원인을 수정하세요. 위반이 기존에 존재했고 동일한 PR에서 수정할 수 없는 경우에만 허용 목록을 사용하세요.**

허용 목록에 항목을 추가할 때는 다음을 준수하세요.

1. 근거를 설명하는 주석을 포함합니다.
2. 추적 이슈를 참조합니다(예: `// #3498 — 2단계 기능으로, 아직 구현되지 않음`).
3. 위반을 수정하는 동일한 PR에서 해당 항목을 제거합니다. 더 이상 활성 위반을 억제하지 않는 오래된 항목은 그 자체로 결함입니다(6A.3 오래된 적용 검사가 구현되면 고립된 허용 목록 항목으로 인해 게이트가 실패합니다).

테스트를 더 빨리 통과시키기 위해 허용 목록 항목을 추가하지 **마세요**. 허용 목록이 계속 늘어나는 상태에서 통과하는 게이트는 품질에 대한 잘못된 확신을 줍니다.

### PR에서 게이트가 실패하는 경우

1. **게이트 출력을 주의 깊게 읽으세요** — 어떤 파일이나 심볼이 규칙을 위반했는지 정확히 알려 줍니다.
2. **위반을 수정하세요** — 대부분의 게이트는 코드가 올바르게 수정되는 즉시 통과하는 결정론적 파일 시스템 검사입니다.
3. **기존에 존재하던 위반인 경우**(즉, 본인이 새로 발생시킨 것은 아니지만 이제 게이트의 검사 범위에 포함된 경우): 근거 주석과 추적 이슈를 포함하여 허용 목록 항목을 추가합니다.
4. **게이트가 래칫인 경우**(커버리지, ESLint 경고, 중복, 복잡도):
   변경으로 인해 지표가 악화된 것입니다. 근본적인 문제를 수정하거나, 변경이 의도된 것이고 지표 저하를 수용할 수 있는 경우에 한해 드물게
   `npm run quality:ratchet -- --update`를 실행하세요. 단, PR 설명에 그 이유를 문서화해야 합니다.
5. **권고 게이트**(`continue-on-error: true`)는 정보 제공용입니다. 병합을 차단하지는 않지만 CI 요약에 표시됩니다. 그래도 수정하세요.

---

## 새 게이트 추가하기

1. `scripts/check/check-<name>.mjs`(또는 `.ts`)를 생성합니다. 정책 게이트는 0/1로 종료됩니다.
   래칫 방식의 게이트는 `collect-metrics.mjs`를 통해 `quality-metrics.json`에 지표를 출력합니다.
2. `package.json`에 `"check:<name>": "node scripts/check/check-<name>.mjs"`를 추가합니다.
3. `.github/workflows/ci.yml`의 적절한 작업 아래에 연결합니다
   (정책 → `lint` 또는 `docs-sync-strict`, 래칫 → `quality-gate`).
4. 허용 목록이 있는 경우 오래된 항목이 자동으로 감지되도록
   `scripts/check/lib/allowlist.mjs`의 `reportStaleEntries()`를 적용합니다.
5. 게이트의 감지 로직을 다루는 테스트를 `tests/unit/build/`에 작성합니다.
6. 이 문서를 업데이트합니다(관련 작업 표에 행을 추가합니다).

---

## 에이전트 도구: LSP-in-the-loop(선택 사항)

CI 게이트 외에도 OmniRoute는 **선택 사항**인 `agent-lsp` 스캐폴드
(프로젝트 수준의 `.mcp.json`, 7단계 작업 15)를 제공합니다. `.mcp.json`을 생성하여
코딩 에이전트에 TypeScript 언어 서버를 노출하면, 에이전트가 코드를 작성하기 **전에** 심볼과
진단을 확인할 수 있습니다. 이는 `typecheck:core`를 보완하는 사전 컴파일 방식으로,
"존재하지 않는 심볼을 지어내는" 오류를 원천적으로 줄여 줍니다. 의도적으로 자동 로드되지 않으며
(MCP↔LSP 브리지는 직접 선택하고 검증해야 함), 잘못된 항목이 있더라도 연결 오류만 기록될 뿐
세션이 중단되지는 않습니다.

---

## 합리화 백로그(ROI 검토 — 9단계 3차)

이 인벤토리는 2026-06-17에 `ci.yml`을 기준으로 대조되었습니다(이전 버전에는
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`가 누락되어 있었습니다). 대조된 항목에 대한 ROI 검토를 통해
다음과 같은 합리화 후보를 식별했습니다. **병합은 기계적인 CI
변경이며, 전환/제거는 운영자가 결정해야 하는 정책 사항입니다.** 아래 항목은 아직
적용되지 않았습니다.

**위에 문서화되지 않은 추가 항목**(권고 수준, 낮은 신호): `docs-lint` 작업
(markdownlint + Vale, 전체 작업에 `continue-on-error` 적용)과 독립형 스캐너 워크플로
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`은
`quality-baseline.json`에 있지만 `ci.yml`의 차단형 래칫과 연결되어 있지 않습니다. 즉, 현재 이 메트릭은
고립된 상태입니다.

### 병합 / 중복 제거(기계적, 낮은 위험)

각 후보는 2026-06-17의 실제 게이트 상태를 기준으로 검증되었습니다(신뢰하되 검증);
여러 "명백한" 병합이 실제로는 부채를 숨기고 있는 것으로 드러났으며 **즉시 대체할 수 있는 깔끔한 변경이 아닙니다**.

- **`check:docs-sync`가 두 번 실행됨** — `lint` 작업에서 독립적으로 실행되고, `check:docs-all`(`docs-sync-strict`) 및 husky pre-commit 훅 내부에서 다시 실행됩니다. ✅ **완료** — 독립적인 `lint` 호출을 제거했습니다.
- **CVE 스캔** — ❌ **깔끔하게 병합할 수 없습니다.** `audit:deps`는 high/critical CVE가 하나라도 있으면 즉시 실패합니다. 반면 `check:vuln-ratchet`(osv)은 기준선(현재 MODERATE 1개) 대비 _회귀_가 있을 때만 실패합니다. 의미 체계가 다르므로 `audit:deps`를 제거하면 high/critical에 대한 절대적 게이트를 잃게 됩니다. 둘 다 유지합니다.
- **순환 감지** — ✅ **완료**(#15159 G-01/G-02). 이전 설명에서는 `check:cycles`를 "정상 상태인 선별된" 게이트로 부르고, `check:circular-deps`(dpdm)가 순환 91개를 보고했기 때문에 이를 차단형으로 유지해야 한다고 정당화했습니다. 그러나 그 정상 상태는 **거짓 정상**이었습니다. `check:cycles`는 5개 하위 디렉터리(파일 450개)를 스캔하고 정적 `import|export … from`만 일치시켰으며, 모든 `@/` 및 `@omniroute/open-sse/` 지정자를 누락했기 때문에 저장소의 대부분을 차지하는 동적 import + 별칭 순환을 감지할 수 없었습니다. 수정 후 게이트는 이제 `src` + `open-sse`(파일 5023개)를 순회하고 TypeScript AST에서 지정자를 수집하며(`import("…")`는 계산하고 타입 위치의 `typeof import("…")`는 계산하지 않음), tsconfig `paths`를 해석합니다. 발견되는 순환은 0개가 아니라 **14개**입니다. 기존 순환 14개는 게이트 PR에서 수정할 수 없으므로, `check:cycles`는 이제 **래칫**입니다(`--ratchet`, `quality-baseline.json`의 상한 `metrics.cycles.value = 14`, `direction: down`). 모든 _회귀_를 차단하며 개수는 감소만 가능합니다. CI는 `npm run check:cycles:ratchet`을 실행합니다. 점진적 감소 작업은 **A-01**과 함께 진행합니다. `check:circular-deps`(dpdm)는 더 광범위한 보조 검증 수단으로서 권고 수준으로 유지합니다.
- **복잡도** — ✅ **완료**(`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): 단일 ESLint 순회에서 ruleId별로 집계하므로 순환 복잡도+최대 줄 수와 인지 복잡도 기준선이 서로 독립적으로 유지됩니다. 개별 `check:complexity` / `check:cognitive-complexity`는 로컬 `--update`를 위해 유지합니다.
- **`/api` 환각 방지** — ✅ **완료**(`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`에 대한 단일 FS 인벤토리를 사용하며, openapi-routes + docs-symbols는 계속 독립적으로 보고합니다. 개별 항목은 로컬 실행을 위해 유지합니다.
- **`check:node-runtime`이 11개 작업에서 실행됨** — ⚠️ **낮은 ROI.** 각각 별도의 러너이며 검사는 1초 미만입니다. 총 절감 시간은 약 10초인 반면, 저비용 작업별 가드가 사라집니다. 변경에 따른 혼란을 감수할 가치가 없습니다.
- **CI lint의 `typecheck:noimplicit:core`** — ✅ **lint 작업에서 제거됨**(기존에는 `continue-on-error`가 적용된 권고 수준이었음). 차단형 타입 범위는 `typecheck:core` + `check:type-coverage`입니다. 로컬 스크립트는 유지했습니다.

### 전환 / 결정(운영자 정책)

- `check:openapi-security-tiers`(권고 수준) — ❌ **깔끔하게 전환할 수 없습니다.** 종료 코드는 0이지만, `LOCAL_ONLY_API_PREFIXES` 아래의 여러 `traffic-inspector` 라우트에 `x-loopback-only: true` 주석이 없다고 경고합니다. 이를 강제하려면 먼저 해당 주석을 `openapi.yaml`에 추가해야 합니다.
- `typecheck:noimplicit:core`(권고 수준) — 차단형 `check:type-coverage` 래칫이 대부분 대체합니다. 래칫으로 전환하거나 중복되는 두 번째 `tsc` 패스를 제거합니다.
- `test:vitest:ui`(현재 **차단형**) — 기존 실패는 `vitest.config.ts`에서 `// #8618` 추적 주석과 함께 명시적으로 제외되어 있습니다. 새로운 실패가 발생하면 작업이 실패합니다.
- `check:secrets`(gitleaks, 문서화된 오탐 3개에서 고정된 차단형 래칫) — 3개 항목을 허용 목록에 추가하여 0을 달성하거나 권고 수준으로 강등합니다. GitHub 네이티브 비밀 스캔 + `check:public-creds`와 중복됩니다.
- `check:pr-evidence`(차단형, PR 본문 산문을 grep으로 검색) — 오탐 위험이 높습니다. 제거하면 Hard Rule #18의 강제력이 약화되므로 이는 실질적인 정책 결정 사항입니다.
- `semgrep`(권고 수준의 독립형 작업) — OWASP 계열에 대해 CodeQL과 중복됩니다. 기준선을 래칫에 연결하거나 제거합니다.

---

## 관련 문서

- 공급망(출처 증명, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — 키 집합 동등성 게이트

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, 작업 `i18n-ui-coverage`).
모든 `src/i18n/messages/<locale>.json`의 리프 키 집합을 `en.json`과 비교하며, 키가 추가된
시점과 관계없이 누락되거나 추가된 리프가 하나라도 있으면 실패합니다. `__MISSING__:`
자리표시자는 존재하는 것으로 간주됩니다(그 내용은 비율 게이트가 처리할 사안입니다).
이는 두 개의 diff 기반/백분율 게이트를 완전히 보완합니다. `check-ui-keys-coverage`는 로케일별
최저 80 %를 강제하고(약 13,000개 중 43개 키가 누락되어도 여전히 99.7 %로 표시됨),
`check-new-key-coverage`는 PR이 `en.json`에 추가한 키만 판정합니다. 로케일 배치는 브랜치를
분기한 날의 `en.json`에서 생성된 뒤 기본 브랜치에 키가 계속 추가되는 동안 며칠에 걸쳐
번역됩니다. 배치 PR 자체는 키를 추가하지 않으므로, 배치 1(#13044)이 9개 로케일에서 43개
키가 부족한 상태로 병합되고 배치 2(#13660)가 8개 로케일에서 10개 키가 부족한 상태로
병합되었을 때에도 두 형제 게이트는 모두 아무 경고도 내지 않았습니다(2026-09-15).
실패를 해결하려면 `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`를
실행하세요. `extra` 리프는 원본에서 해당 키가 제거되었다는 뜻이므로 로케일에서도
삭제하세요. `--warn`은 실패시키지 않고 보고만 합니다. `--catalog=cli`는
`bin/cli/locales`에 대해 동일한 비교를 실행합니다(`npm run i18n:check-keys:cli`).
두 단계 모두 `i18n-ui-coverage` 작업에 포함됩니다.

#### `check-new-key-coverage` — 새 키 i18n 게이트

`check-ui-value-drift`의 형제 게이트입니다. 후자는 영어 값이 **다시 작성되었지만**
번역은 그대로 남은 경우를 탐지하고, 이 게이트는 영어 키가 **추가되었지만** 일부
로케일에 반영되지 않은 경우를 탐지합니다.

`check-ui-keys-coverage`는 이런 문제를 탐지할 수 없습니다. 로케일별 백분율 하한을
강제하므로 약 13,000개의 리프 중 11개 키가 누락되어도 커버리지는 99.9%로 유지됩니다.
언어별 백분율로는 "이 기능이 번역되지 않은 채 출시되었다"는 상황을 표현할 수 없습니다.
새 로케일에 전체 기능의 텍스트가 하나도 없어도 수치가 전혀 변하지 않을 수 있습니다.

이 게이트가 반영하는 사고는 다음과 같습니다. Orchestration Canvas의 Phase 3에서는 당시
존재하던 42개 로케일 전체에 11개 키를 번역했습니다. 몇 시간 뒤 EU 언어 배치(#13044)로
저장소의 로케일 수가 51개가 되었지만, 새로 추가된 9개 로케일(`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`)에는 해당 키가 전혀 반영되지 않았습니다.
`deepMergeFallback`은 누락된 키를 영어로 대체하므로, 실패 양상은 빈 UI가 아니라 번역되지
않은 UI였습니다. 이는 실제 문제이면서도 설계상 조용히 발생했습니다.

형제 게이트와 마찬가지로 이 게이트는 **diff를 인식**하며, 병합 기준점의 영어와 작업
트리를 비교합니다. 따라서 기존의 누락은 고정된 상태로 유지되며, 게이트를 활성화하는 데
마이그레이션이 필요하지 않았습니다.

**`__MISSING__:<english>` 마커는 이를 충족하지 않습니다(2026-09-17 이후).** 이전에는
런타임이 올바른 영어로 폴백하므로 이 마커가 문서화된 연기 방법이었습니다. 그러나
2026-09-16에 8개의 기능 PR이 61개 키를 추가하면서 번역 대신 65개 로케일 모두에 마커를
찍었습니다. 이 게이트는 모든 PR을 통과시켰고 아무것도 PR을 차단하지 않았으며, 이후
차단형 실제 번역 비율 게이트가 릴리스 팁에서 모든 사람에게 실패했습니다
(pt-BR 3.2 % > 2.5 % + 0.5). 이제 마커는 번역이 누락된 것으로 판정됩니다. 실패를
해결하려면
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`을
실행하거나, `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, 분리 실행에 안전하며 `OMNIROUTE_TRANSLATION_*`
환경 변수 없이는 시작을 거부함)를 사용해 모든 로케일을 병렬로 처리하세요. 영어로
유지해야 하는 키(고정된 제품/엔진/플래그 이름)는 마커 뒤에 두지 말고
`scripts/i18n/untranslatable-keys.json`에 추가해야 합니다. `vi`에서는 마커가 완전히
금지됩니다(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — 보류된 테스트 게이트

`vitest.config.ts`의 `exclude` 목록에 있는 파일은 실행되지 않는 테스트이지만, 트리를
읽는 사람에게는 커버리지처럼 보입니다. 62개 파일이
`// #8618 — 기존 실패; 수정되면 이 제외 항목을 제거할 것`이라는 주석 뒤에 누적되었습니다.
이 목록을 추적하던 이슈 #8618은 2026-08-11에 종료되었지만, 목록은 45개 항목에서 62개
항목으로 늘어났고 새 항목마다 종료된 이슈를 가리키는 주석을 물려받았습니다. 마침내
파일별로 목록을 측정했을 때(#13204), **62개 중 51개가 소스 변경 없이 현재 트리에서
통과했습니다**.

이 게이트는 실제 파일로 해석되는 모든 제외 항목이 (a) 추적 이슈를 명시하고
(b) 측정된 상태와 함께 `config/quality/vitest-exclusions.json`에 나타나도록 요구합니다.
따라서 제외 항목 추가는 60개 항목 배열에 한 줄을 더하는 것이 아니라 전용 파일에서
검토 가능한 diff가 됩니다. 이 게이트는 의도적으로 제외된 테스트를 다시 실행하지
않습니다. 그렇게 하면 약 10분이 소요되며 주기적 작업에서 수행해야 합니다. 인벤토리에는
각 항목을 마지막으로 측정한 시점이 기록됩니다.
