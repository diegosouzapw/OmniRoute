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

## 게이트 인벤토리(~90개 스크립트)

스크립트는 `scripts/check/`(정책 게이트) 및 `scripts/quality/`(래칫 엔진) 아래에 있습니다.
CI의 기준 소스는 `.github/workflows/ci.yml`입니다.

### 릴리스 PR 빠른 경로(`quality.yml`)

`.github/workflows/quality.yml`은 `release/**`를 대상으로 하는 PR에서 실행됩니다. 경로 필터링이 적용된 빠른 게이트로 기여자 브랜치의 진행을 유지하며, 코드 변경에는 프로덕션 빌드에 대한 참고용 신호 하나도 추가합니다.

| 작업                                             | 범위                                                                                                                                                                                                              | 차단 여부                                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | 초안이 아닌 코드 PR 및 Mergify 큐 브랜치; Node 24, `npm-ci-retry`, `check:node-runtime`, `OMNIROUTE_USE_TURBOPACK=1`을 사용한 `npm run build`; 이를 사용하는 후속 품질 작업이 없으므로 아티팩트를 업로드하지 않음 | **참고용** (`continue-on-error: true`; 안정적인 릴리스 PR 실행이 1주일간 유지된 후 제거) |
| `Docs Gates (fast-path)`                         | 문서/코드 PR; API 문서 참조 및 전체 문서                                                                                                                                                                          | 예                                                                                       |
| `Fast Quality Gates`                             | 코드 PR; 정적 검사, 타입 검사, 대시보드 타입 검사, 영향받는 단위 테스트                                                                                                                                           | 예                                                                                       |
| `Forgotten sibling tests`                        | 코드 PR; 변경된 모듈을 정적 소비자 및 후보 형제 테스트까지 추적; 배럴 및 동적 가져오기 경로는 참조된 허용 목록 예외와 함께 참고용 진단으로 보고됨                                                                 | **참고용**                                                                               |
| `Vitest (fast-path)`                             | 코드 PR; 빠른 vitest 스위트                                                                                                                                                                                       | 예                                                                                       |
| `Unit Tests fast-path`                           | 코드 PR; 4개 샤드 단위 테스트 스위트                                                                                                                                                                              | 예                                                                                       |
| `No new ESLint warnings`                         | 코드 PR; 억제 설정을 인식하는 린트 가드                                                                                                                                                                           | 자체 저장소 출처에는 차단, 포크에는 참고용                                               |
| `Merge integrity (changelog + generated skills)` | 초안이 아닌 PR; 변경 로그 및 생성된 스킬 동기화                                                                                                                                                                   | 자체 저장소 출처에는 차단, 포크에는 참고용                                               |

#### 누락된 형제 테스트 보고서

`npm run check:forgotten-sibling-tests`는 테스트 영향 맵에서 사용하는 가져오기 리졸버를 재사용합니다.
변경된 각 프로덕션 모듈에 대해 후보 테스트가 풀 리퀘스트 diff에 없으면 결정론적인
`changed module/symbol -> static consumer -> candidate sibling test` 체인을 보고합니다. Markdown 요약과 JSON 결과는 차단 방식으로 전환하기 전 보정할 수 있도록
`forgotten-sibling-tests` 워크플로 아티팩트로 보존됩니다.

배럴 재내보내기와 동적 가져오기는 해석 진단일 뿐이며, 차단 결과를 생성하지 않습니다.
검토된 예외는 `config/quality/forgotten-sibling-allowlist.json`에 있습니다. 각 항목에는 소비자와 후보
테스트를 명시하고, 구체적인 근거를 제시하며, GitHub 이슈 또는 풀 리퀘스트 링크를 포함해야 합니다. 형식이 잘못된 항목은
안전 우선으로 실패 처리됩니다. 예외는 삭제된 후보 테스트나 `.skip`/`.todo`를 추가하는 diff를 억제할 수 없습니다.
어설션 약화 및 기타 마스킹은 독립적으로 차단되는
`check:test-masking` 게이트에서 계속 담당합니다.

### 작업: `lint`

`main`을 대상으로 하는 모든 PR에서 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트 (`npm run ...`)          | 검증 항목                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 차단 여부                            |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `check:node-runtime`              | Node.js 버전이 지원 범위 내에 있는지                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 예                                   |
| `check:cycles`                    | 순환 import — 모든 `src/` + `open-sse/` 모듈                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `check:route-validation:t06`      | 모든 라우트에 Zod 스키마가 있는지(Tier 6 정책)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:any-budget:t11`            | `@ts-expect-error // any` 개수가 예산을 초과하지 않는지(Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:provider-consistency`      | `providers.ts`의 모든 제공자에 `providerRegistry.ts`의 일치하는 항목이 있으며 그 반대도 성립함(허용 목록 내에서)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:model-lifecycle`           | 수동으로 관리되는 세 개의 라우팅 테이블이 체크인된 수명 주기 스냅샷(#11503)과 일관성을 유지함: `FITNESS_TABLE`(`taskFitness.ts`)은 `REGISTRY`가 라우팅할 수 있는 폐기된 id에 점수를 부여하지 않음. 모든 `BUILT_IN_ALIASES` 대상은 `REGISTRY`에 존재하고 폐기된 id 스냅샷에는 없음. `REGISTRY`에 여전히 있는 모든 폐기된 id는 전달되거나 `allowedRetiredInCatalog`에 나열됨. 또한 `DEFAULT_DEGRADATION_MAP`의 소스나 대상은 해당 스냅샷에서 폐기된 것으로 나타나지 않음. 이는 모델이 현재 실제 업스트림에서 제공되고 있음을 입증하지는 않음. 오프라인 — `config/quality/model-lifecycle.json`과 비교하며, `npm run quality:refresh-model-lifecycle`을 사용해 수동으로 새로 고침함(네트워크 필요, CI에는 연결되지 않음). `allowedRetiredInCatalog`는 점진적 축소 래칫임: 추적 이슈가 있는 경우에만 항목을 추가할 것. | 예                                   |
| `check:fetch-targets`             | 클라이언트 측 `src/`의 모든 `fetch("/api/...")`가 실제 `route.ts`로 해석됨                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:deps`                      | 저장소 내 모든 `package.json`에서 `npm install` 가능한 모든 의존성이 `dependency-allowlist.json`에 있음. 고정되지 않은 새 패키지나 슬롭스쿼팅 패키지를 표시함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `audit:deps`                      | `npm audit`(루트 + electron) — 높음/치명적 권고 없음(osv `check:vuln-ratchet`과 중복됨. Rationalization Backlog 참조)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 예                                   |
| `check:lockfile`                  | `package-lock.json` 무결성 — https 레지스트리, 무결성 해시, 호스트 재정의 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:licenses`                  | 프로덕션 종속성에 대한 SPDX 라이선스 허용 목록                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:tracked-artifacts`         | 빌드 아티팩트 / 커밋된 `node_modules` 심볼릭 링크 없음(husky pre-commit에서도 실행됨. pre-push는 의도적으로 가볍게 유지 — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | 예                                   |
| `check:ai-attribution`            | PR 커밋, 제목 또는 본문에 AI/봇 `Co-Authored-By` 트레일러나 AI 생성 푸터가 없어야 함 — 엄격한 규칙 #16(`release/**`로 향하는 PR에 대한 `quality.yml` 빠른 게이트 루프에서 이벤트 페이로드를 읽고, PR이 아니면 아무 작업도 하지 않음. 또한 `main`으로 향하는 PR에 대한 `ci.yml` 린트의 PR 전용 단계와 husky `commit-msg` 훅에서도 검사함. 사람 공동 작성자는 허용됨. #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | 모든 Vitest 제외 항목은 추적 이슈를 명시하고 `config/quality/vitest-exclusions.json`에 포함되어야 함(#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 예                                   |
| `check:file-size`                 | 소스 파일이 확장자별 상한을 초과하지 않아야 함(래칫: 대용량 파일은 `frozen` 목록에 고정됨)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:error-helper`              | 실행기/핸들러의 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()`를 사용해야 함(엄격한 규칙 #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 예                                   |
| `check:migration-numbering`       | 마이그레이션 SQL 파일의 번호가 중복이나 누락 없이 순차적으로 지정되어 있음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:public-creds`              | `publicCreds.ts` 외부에 리터럴 OAuth `client_id`/`client_secret` 또는 Firebase Web 키가 없음(엄격 규칙 #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:db-rules`                  | `src/lib/db/` 모듈 외부에 원시 SQL이 없으며, `localDb.ts`에서 배럴 임포트를 사용하지 않음(엄격 규칙 #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 예                                   |
| `check:known-symbols`             | 디스패치 테이블에 등록된 공급자 실행기, 라우팅 전략 및 변환기가 디스크의 파일과 일치하며, 고립되거나 선언되지 않은 심벌이 없음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 예                                   |
| `check:route-guard-membership`    | 하위 프로세스를 생성하는 모든 라우트가 `isLocalOnlyPath()`에 의해 분류됨(엄격 규칙 #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 예                                   |
| `check:test-discovery`            | 저장소의 모든 `*.test.ts` / `*.spec.ts` 파일이 하나 이상의 테스트 러너에 의해 수집됨(래칫: `test-discovery-baseline.json`의 고립 파일 목록은 줄어들기만 할 수 있음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 예                                   |
| `check:agent-skills-sync`         | 생성된 agent-skills 아티팩트가 소스 카탈로그와 일치함(드리프트 없음)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | Provider 로고/에셋에 기록된 출처 항목이 있음                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON 구성 파일이 정상적으로 파싱되고 저장소 린트 규칙을 충족함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | 오류 없이 TypeScript 컴파일(권고 경고만 허용)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 예                                   |
| `typecheck:noimplicit:core`       | 엄격한 `noImplicitAny` — 향후 적용을 위한 검사이며, 기존의 많은 호출 지점에는 여전히 타입 주석이 필요함                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **권고** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**`로 범위가 지정된 `tsc` 검사(#7033) — `typecheck:core`의 엄선된 27개 파일 허용 목록에는 대시보드 TSX가 전혀 포함되지 않으며, `next build` 역시 이를 타입 검사하지 않으므로(`next.config.mjs`에서 `ignoreBuildErrors: true` 설정), 해당 영역의 고아 식별자 회귀(#6625/#6909)가 CI에서 감지되지 않았음. 고정된 파일별/TS 코드별 개수 기준선(`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols`와 동일한 오래된 항목 강제 적용 패턴)과 비교함 — 기준선의 개수를 초과하는 새로운 오류만 게이트를 실패하게 하며, 기존 오류가 수정되면 `--update`로 기준선을 낮춤.                                                                                                                                                                                                         | 예                                   |

### 작업: `quality-gate`

`test-coverage` 이후에 실행됩니다. 실패 시 병합을 차단합니다.

| 스크립트                     | 검증 항목                                                                                                                                                        | 차단 여부            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `quality:collect`            | `quality-metrics.json` 생성(ESLint 경고 수, 병합된 샤드 보고서의 커버리지)                                                                                       | 예(래칫의 선행 단계) |
| `quality:ratchet`            | `quality-baseline.json`의 각 메트릭이 퇴보하지 않았는지 확인(ESLint 경고 ≤ 기준선, 커버리지 ≥ 기준선)                                                            | 예                   |
| `check:duplication`          | 코드 중복(jscpd@4)이 `quality-baseline.json`의 기준선을 초과하지 않는지 확인                                                                                     | 예                   |
| `check:complexity`           | 파일 수준 순환 복잡도가 상한을 초과하지 않는지 확인(핵심 ESLint `complexity` + `max-lines-per-function`)                                                         | 예                   |
| `check:cognitive-complexity` | 인지 복잡도 래칫(`eslint-plugin-sonarjs`) — 별도의 ESLint 패스이며, CI에서는 두 검사를 단일 `check:complexity-ratchets` 단계로 병합하여 실행                     | 예                   |
| `check:dead-code`            | 사용되지 않는 내보내기/파일 래칫(knip)이 기준선 대비 퇴보하지 않았는지 확인                                                                                      | 예                   |
| `check:compression-budget`   | 압축 벤치마크 예산 — 엔진별 토큰 절감률 하한이 퇴보하지 않았는지 확인                                                                                            | 예                   |
| `check:type-coverage`        | 타입 지정 비율 래칫(`type-coverage`)이 퇴보하지 않았는지 확인하며, `typecheck:noimplicit:core`를 대부분 포괄                                                     | 예                   |
| `check:codeql-ratchet`       | 미해결 CodeQL 경고 수가 증가하지 않았는지 확인(`gh api`를 통해 조회하며, 토큰이 없으면 정상적으로 건너뜀) — 갱신 주기 및 수동 트리거는 아래의 "CodeQL 래칫" 참조 | 예                   |

### 작업: `quality-extended`

전체 작업은 권고용입니다(`continue-on-error: true`). npm 기반 래칫은
실제로 실행되며, 외부 스캐너는 `gh release download`를 통해 설치되고 바이너리가
여전히 없으면 자체적으로 건너뜁니다(exit 0).

| 스크립트                 | 검증 항목                                                                                                                                                                         | 차단 여부 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:circular-deps`    | 순환 종속성이 없는지 확인(dpdm)                                                                                                                                                   | **권고**  |
| `check:bundle-size`      | 번들 크기가 상한을 초과하지 않는지 확인                                                                                                                                           | **권고**  |
| `check:secrets`          | 비밀 정보 스캔(gitleaks) — 바이너리가 없으면 건너뜀                                                                                                                               | **권고**  |
| `check:vuln-ratchet`     | 종속성 취약점(osv-scanner)이 퇴보하지 않았는지 확인 — 바이너리가 없으면 건너뜀                                                                                                    | **권고**  |
| `check:workflows`        | 워크플로 린트(actionlint + zizmor) — 바이너리가 없으면 건너뜀                                                                                                                     | **권고**  |
| `check:openapi-breaking` | 기본 브랜치 대비 공개 API 계약(`openapi.yaml`)의 호환성을 깨뜨리는 변경 사항 확인(oasdiff) — `openapiBreaking=N`을 생성하며, oasdiff가 없거나 기본 사양을 확인할 수 없으면 건너뜀 | **권고**  |

### 작업: `docs-sync-strict`

`main`에 대한 모든 PR에서 실행됩니다. 실패하면 병합을 차단합니다.

| 스크립트                       | 검증 항목                                                                                                                                                          | 차단 여부                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `check:docs-all`               | 아래 6개의 하위 게이트를 순차적으로 실행하는 메타 게이트                                                                                                           | 예                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt 버전 일관성                                                                                                                          | 예                         |
| ↳ `check:docs-counts`          | 본문에 기재된 수치(프로바이더 수, 마이그레이션 수 등)가 실제 수치의 래칫 허용 범위 내에 있는지 확인                                                                | 예                         |
| ↳ `check:env-doc-sync`         | `.env.example`의 모든 환경 변수가 문서 표에 문서화되어 있고, 그 반대도 성립하는지 확인                                                                             | 예                         |
| ↳ `check:deprecated-versions`  | 문서에 더 이상 사용되지 않는 버전 문자열이 없는지 확인                                                                                                             | 예                         |
| ↳ `check:doc-links`            | 문서의 내부 마크다운 링크가 실제 파일을 가리키는지 확인(`[text]`/`(path)` 형식)                                                                                    | 예                         |
| ↳ `check:fabricated-docs`      | 문서에 언급된 라우트, 환경 변수, CLI 명령어, 훅 이름 및 파일 경로가 코드베이스에 존재하는지 확인. `--strict` 사용 시 하드 게이트이며, 플래그가 없으면 소프트 실패. | 예(CI에서 `--strict` 사용) |
| `check:cli-i18n`               | CLI 명령어 문자열이 모든 i18n 로케일 파일에 존재하는지 확인                                                                                                        | 예                         |
| `check:openapi-coverage`       | OpenAPI 명세가 실제 라우트 수에 대해 래칫으로 설정된 최소 기준 이상을 포함하는지 확인                                                                              | 예                         |
| `check:openapi-security-tiers` | `openapi.yaml`의 보안 티어 주석이 `routeGuard.ts` 분류와 일치하는지 확인                                                                                           | **권고**                   |
| `check:openapi-routes`         | `openapi.yaml`의 모든 경로가 실제 `route.ts`로 연결되는지 확인(환각 방지)                                                                                          | 예                         |
| `check:docs-symbols`           | `docs/**/*.md`의 모든 `/api/...` 참조가 실제 `route.ts`로 연결되는지 확인(환각 방지)                                                                               | 예                         |
| `i18n translation drift`       | i18n 로케일 파일의 번역되지 않은 키 — 경고만 표시                                                                                                                  | **권고**                   |

### 작업: `i18n-ui-coverage`

| 스크립트                          | 검증 항목                                                                                                                                                                      | 차단 여부 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `check-ui-keys-coverage` (인라인) | UI i18n 키 커버리지가 65% 이상인지 확인                                                                                                                                        | 예        |
| `check-ui-value-drift` (인라인)   | 다시 작성된 영어 **값**에 오래된 번역이 남아 있지 않은지 확인                                                                                                                  | 예        |
| `check-new-key-coverage` (인라인) | **새로운** 영어 키가 모든 로케일에서 번역되었는지 확인 — `__MISSING__:` 마커는 거부됨                                                                                          | 예        |
| `check-translation-ratio`         | 로케일별 실제 번역 비율(허용 목록에 포함되지 않은 영어와 동일한 값 / 자리표시자 / 누락된 리프)이 `config/quality/i18n-translation-baseline.json` + 여유분을 초과하지 않아야 함 | **권고**  |

`fetch-depth: 0`이 필요합니다. 값 드리프트 게이트가 병합 기준점을 기준으로 `en.json`의 차이를 비교하기 때문입니다.

#### `check-ui-value-drift` — 오래된 번역 게이트

다른 게이트가 구조적으로 감지할 수 없는 한 가지 i18n 회귀를 포착합니다. 영어 값이
다시 작성되었지만 _이전_ 영어를 바탕으로 작성된 번역이 그대로 남아 있어,
영어 이외의 언어를 사용하는 사용자가 확신에 찬 어조의 잘못된 문구를 계속 읽게 되는 경우입니다.

이는 실제로 배포된 적이 있습니다. Antigravity 로그인 도우미가 추가되었을 때(#5203)
`oauthModal.googleOAuthWarning`이 다시 작성되었지만, **43개 로케일 중 39개**에는 운영자에게
"전체 URL을 복사하여 아래에 붙여 넣으라"고 안내하는 문구가 그대로 남아 있었습니다. 해당
프로바이더에서는 완료할 수 없는 흐름이었습니다. 다음과 같은 이유로 #8463까지 발견되지
않았습니다.

- `sync-ui-keys`는 **누락된** 키만 채우며, **오래된** 키는 절대 갱신하지 않습니다.
- `check-ui-keys-coverage`는 키의 _존재 여부_를 계산하므로, 오래된 번역도 커버된 것으로 집계됩니다.
- `check-translation-drift`는 `docs/i18n/<locale>/**.md` 문서 미러를 추적하며,
  `src/i18n/messages/*.json`은 전혀 읽지 않습니다. 2026-09 재동기화 이후 작업 `docs-sync-strict`에서
  차단됩니다. 핵심 문서 수정 → `npm run i18n:run -- --files=<doc>`(섹션 단위로 실행되어 비용이 적음).

**diff 인식 방식이며, baseline 기반이 아닙니다.** merge base의 `en.json`과 working tree를 비교합니다.
영어 값이 변경된 각 key에 대해, 변경되지 않은 기존 번역을 여전히 사용하는 locale은 오래된 것으로 간주됩니다.
이는 의도적으로 **기존 부채를 동결합니다**. diff만으로는 오래된 번역이 어떤 이전 영어 문구에서 유래했는지
알 수 없으므로, gate는 현재 변경 사항이 건드리는 부분만 판단합니다. 대안인 key별 hash baseline을 사용하면
약 600 KB의 generated file이 필요하며, 이는 현재 가장 큰 baseline의 3배이고 모든 i18n PR에서 변경됩니다.

이를 충족하는 방법은 두 가지입니다.

1. 영향을 받는 번역을 업데이트하거나
2. 해당 값을 `__MISSING__:<new english>`로 설정합니다. 그러면 runtime은 수정된 영어를 제공합니다
   (`src/i18n/request.ts::deepMergeFallback`, #7258). 또한 해당 key는 번역 대기열에 추가됩니다.

문자열의 **의미**가 변경되었다면 **key 이름을 변경하는 것**이 좋습니다. 새 key는 오래된 번역을
상속할 수 없습니다. 이는 #8463에서 사용한 패턴입니다.

```bash
npm run i18n:check-value-drift          # 엄격 모드(CI에서 실행하는 방식)
npm run i18n:check-value-drift:warn     # 보고만 수행
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

base catalog를 읽을 수 없는 경우(base ref가 없는 shallow clone)에는
`check-openapi-breaking`과 동일하게 `SKIP reason=base-unresolved`와 함께 종료 코드 0으로 종료합니다.

### Job: `i18n`

전체 i18n 검증 matrix입니다(locale당 하나의 job). 전체 job은 advisory입니다.

| Script                          | 검증 항목            | Blocking                                                |
| ------------------------------- | -------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | locale별 번역 완전성 | **Advisory**(전체 job에 `continue-on-error: true` 적용) |

### Job: `pr-test-policy`

pull request에서만 실행됩니다.

| Script                 | 검증 항목                                                                                                                        | Blocking |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` 또는 `bin/`의 production code를 변경하는 PR에는 test를 추가하거나 업데이트해야 함(Hard Rule #8) | 예       |
| `check:test-masking`   | 변경된 test file이 순 assert 수를 줄이거나 `assert.ok(true)` 같은 tautology를 추가하지 않음                                      | 예       |
| `check:pr-evidence`    | PR 본문에 변경 사항에 대한 test/VPS 증거가 명시되어 있음(PR 문구를 grep하여 Hard Rule #18을 자동화 — 취약함, Backlog 참조)       | 예       |

### Job: `test-vitest`

`build` 후에 실행됩니다. 실패하면 merge를 차단합니다.

| Suite            | 검증 항목                                                | Blocking                                                                                                             |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server(110개 tool), autoCombo, cache — vitest runner | 예                                                                                                                   |
| `test:vitest:ui` | UI component test — vitest runner                        | **Blocking** — 기존 failure는 `vitest.config.ts`에서 명시적으로 제외되며, 새로운 failure가 발생하면 job이 실패합니다 |

### Nightly workflow(예약 실행, advisory)

cron 일정에 따라 실행되며(`workflow_dispatch`로도 실행 가능), PR에서는 절대 실행되지 않습니다. 모두 advisory입니다.

| Workflow               | 검증 항목                                                                                                                                            | Blocking     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | random seed와 높은 실행 횟수를 사용하는 fast-check property test                                                                                     | **Advisory** |
| `nightly-resilience`   | heap growth gate, chaos fault injection, k6 load/soak                                                                                                | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard(block mode) + garak probe(provider secret이 없으면 건너뜀)                                                                 | **Advisory** |
| `nightly-schemathesis` | `docs/openapi.yaml`을 사용하는 live OmniRoute 대상 OpenAPI contract fuzzing(schemathesis) — spec 위반 및 처리되지 않은 500 오류를 드러냄(Fase 8 B.4) | **Advisory** |
| `nightly-mutation`     | 빠른 unit lane에 대한 Stryker mutation testing score — 살아남은 mutant를 통해 취약한 assert를 드러냄                                                 | **Advisory** |
| `nightly-compat`       | 지원되는 `engines.node` 범위 전체에 대한 Node engine compatibility matrix                                                                            | **Advisory** |

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

## 합리화 백로그 (ROI 검토 — 9단계 3차)

이 인벤토리는 2026-06-17에 `ci.yml`을 기준으로 대조되었습니다(이전 버전에서는
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`가 누락됨). 대조된 항목에 대한 ROI 검토를 통해
다음과 같은 합리화 후보가 식별되었습니다. **병합은 기계적인 CI 변경이며,
전환/제거는 운영자에게 유보된 정책 결정입니다.** 아래 내용은 아직
적용되지 않았습니다.

**위에서 문서화되지 않은 추가 항목**(권고 수준, 신호가 약함): `docs-lint` 작업
(markdownlint + Vale, 전체 작업에 `continue-on-error` 적용) 및 독립형 스캐너 워크플로
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`은
`quality-baseline.json`에 있지만 `ci.yml`의 차단형 래칫과 연결되어 있지 않습니다. 현재 이 메트릭은
고립된 상태입니다.

### 병합 / 중복 제거 (기계적, 위험도 낮음)

각 후보는 2026-06-17의 실제 게이트 상태를 기준으로 검증되었습니다(신뢰하되 검증);
몇몇 "명백한" 병합이 실제로는 부채를 숨기고 있는 것으로 드러났으며 **즉시 대체 가능한 깔끔한 변경이 아닙니다**.

- **`check:docs-sync`가 두 번 실행됨** — `lint` 작업에서 독립적으로 실행되고, `check:docs-all` 내부(`docs-sync-strict`)와 husky pre-commit 훅에서 다시 실행됩니다. ✅ **완료** — 독립적인 `lint` 호출이 제거되었습니다.
- **CVE 스캔** — ❌ **깔끔하게 병합할 수 없음.** `audit:deps`는 high/critical CVE가 하나라도 있으면 즉시 실패합니다. `check:vuln-ratchet`(osv)은 기준선(현재 MODERATE 1건) 대비 _회귀_가 있을 때만 실패합니다. 의미 체계가 다르므로 `audit:deps`를 제거하면 절대적인 high/critical 게이트를 잃게 됩니다. 둘 다 유지합니다.
- **순환 종속성 탐지** — ❌ **깔끔하게 병합할 수 없음.** `check:circular-deps`(dpdm)는 **91개의 순환**을 보고합니다(이 때문에 권고 수준임). 이를 먼저 해결하지 않고는 차단형으로 승격할 수 없으며, 정상 상태인 선별된 `check:cycles`보다 범위가 더 넓습니다. `check:cycles`는 차단형으로 유지하고, dpdm 순환 91개 해결은 별도의 백로그로 관리합니다.
- **복잡도** — ✅ **완료** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ESLint를 한 번 순회하며 ruleId별로 집계하므로 cyclomatic+max-lines와 cognitive 기준선이 서로 독립적으로 유지됩니다. 개별 `check:complexity` / `check:cognitive-complexity`는 로컬 `--update`용으로 유지됩니다.
- **`/api` 환각 방지** — ✅ **완료** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`의 FS 인벤토리를 한 번만 생성하며, openapi-routes + docs-symbols는 계속 독립적으로 보고합니다. 개별 항목은 로컬 실행용으로 유지됩니다.
- **`check:node-runtime`이 11개 작업에서 실행됨** — ⚠️ **ROI 낮음.** 각각 별도의 러너이며 검사는 1초 미만입니다. 총 절감 시간은 약 10초지만, 작업별로 저렴한 보호 장치를 잃게 됩니다. 변경에 따른 혼란을 감수할 가치가 없습니다.
- **CI lint의 `typecheck:noimplicit:core`** — ✅ **lint 작업에서 제거됨**(기존에는 권고 수준의 `continue-on-error`였음). 차단형 타입 표면은 `typecheck:core` + `check:type-coverage`입니다. 로컬 스크립트는 유지되었습니다.

### 전환 / 결정 (운영자 정책)

- `check:openapi-security-tiers` (권고 수준) — ❌ **깔끔하게 전환할 수 없음.** 종료 코드는 0이지만 `LOCAL_ONLY_API_PREFIXES` 아래의 여러 `traffic-inspector` 라우트에 `x-loopback-only: true` 주석이 없다고 경고합니다. 이를 강제하려면 먼저 해당 주석을 `openapi.yaml`에 추가해야 합니다.
- `typecheck:noimplicit:core` (권고 수준) — 차단형 `check:type-coverage` 래칫에 대부분 포함됩니다. 래칫으로 전환하거나 중복되는 두 번째 `tsc` 패스를 제거합니다.
- `test:vitest:ui` (현재 **차단형**) — 기존 실패는 `vitest.config.ts`에서 `// #8618` 추적 주석과 함께 명시적으로 제외되어 있으며, 새로운 실패는 작업 실패로 처리됩니다.
- `check:secrets` (gitleaks, 문서화된 오탐 3건에 고정된 차단형 래칫) — 3건을 허용 목록에 추가하여 0으로 만들거나 권고 수준으로 강등합니다. GitHub 네이티브 secret-scanning + `check:public-creds`와 중복됩니다.
- `check:pr-evidence` (차단형, PR 본문을 grep으로 검사) — 오탐 위험이 높습니다. 제거하면 강제 규칙 #18의 집행력이 약화되므로 이는 실질적인 정책 결정 사항입니다.
- `semgrep` (권고 수준의 독립형 항목) — OWASP 계열에 대해 CodeQL과 중복됩니다. 기준선을 래칫에 연결하거나 제거합니다.

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
