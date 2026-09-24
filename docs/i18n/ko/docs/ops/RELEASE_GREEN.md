# Release-Green: keeping the queue and release branch green (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## 이 문서가 해결하는 문제

**전체 게이트**(`.github/workflows/ci.yml` — 유닛 샤드, vitest, 래칫,
`package-artifact`, SonarQube, E2E)는 **릴리스 PR**(PR → `main`)에서만 실행됩니다. 대상이
`release/**`인 PR에는 **빠른 게이트**(`quality.yml`: TIA 영향 테스트 + 타입 검사 + 린트)가
적용되며, 코드 변경의 경우 **참고용** 프로덕션 빌드도 실행됩니다. 그 결과, 릴리스에서만
발생하는 실패가 릴리스 브랜치에 조용히 누적되다가 릴리스 시점에 **약 40분짜리 단계별로
폭발**할 수 있으며, 이 문제들은 한 번에 하나씩 드러납니다.

"release-green 제품군"은 이러한 실패를 **미리 파악**하기 위해 존재합니다. 즉, 언제든
전체 게이트에 상응하는 검증을 **로컬에서 / 릴리스 외부에서** 수행하여 릴리스 PR이 첫 번째
CI 실행부터 이미 통과하도록 합니다.

> **타협할 수 없는 원칙:** 이 중 어느 것도 기여자를 차단하지 않습니다. 기여자의 PR을
> 실패시키는 필수 검사를 추가하지 않습니다. **드리프트**(래칫)는 릴리스 시 유지관리자가
> 기준선을 재설정해야 할 사항이며, 결코 기여자가 신경 쓸 문제가 아닙니다. 어떤 구성 요소도
> PR을 **닫지** 않으며(공로 가로채기), 통과시키기 위해 테스트를 **약화하지** 않습니다.

## 제품군(4개 구성 요소) — 각 구성 요소의 독립적인 실행 방식

| 구성 요소                                                                | 역할                                                           | 실행 시점                                                         | 범위                          |
| ------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------- |
| **`/green-prs`** (솔루션 A)                                              | 유지관리자가 **열린 PR 대기열**을 필요할 때 검사               | **독립적으로, 주기적으로** — 특히 `/generate-release` 실행 **전** | 전체 PR 대기열 → `release/**` |
| **`/validate-release-green`** (솔루션 C — `npm run check:release-green`) | 검증 엔진: 브랜치 또는 병합 후보를 대상으로 전체 게이트를 재현 | 독립적으로, 언제든지                                              | 특정 브랜치 또는 병합 PR      |
| **`/babysit <PR#>`**                                                     | **하나의** PR에 대한 **실제 CI**를 통과할 때까지 관리          | PR별로 독립적으로                                                 | 단일 PR                       |
| **`nightly-release-green.yml`** (솔루션 D)                               | 자동화된 야간 워크플로; HARD 실패 시 이슈 생성                 | 자동(cron)                                                        | 활성 릴리스 브랜치            |

**"이 기능은 릴리스 전용인가요?"에 대한 짧은 답변:** **아닙니다.** `/green-prs`는
**릴리스 사이에도 주기적으로** 실행하도록 설계되었습니다. 독립적으로 실행하는 것이 일반적인
사용 방식이며, 릴리스는 단지 이를 실행했을 때 가장 큰 가치를 얻는 시점일 뿐입니다.

## PR-to-release 권고 빌드

이제 `quality.yml`에는 초안이 아닌 코드 PR과 Mergify 큐 브랜치를 위한 `Build (advisory)`가 포함됩니다.
이는 `ci.yml`의 프로덕션 빌드 절차를 그대로 따릅니다: Node 24, `npm-ci-retry`,
`check:node-runtime`, 그리고 `OMNIROUTE_USE_TURBOPACK=1`을 사용하는 `npm run build`. 이 워크플로에서는
후속 품질 작업이 빌드 아티팩트를 사용하지 않으므로 의도적으로 빌드 아티팩트를 업로드하지 않습니다.
안정적인 릴리스 PR 실행이 일주일간 유지된 후 `continue-on-error`를 제거하여 이 신호가
차단형 PR-to-release 게이트가 되도록 합니다.

## 솔루션 C — `npm run check:release-green`(엔진)

현재 작업 트리를 대상으로 릴리스와 동등한 검증을 재현하고 각 실패를 분류합니다:

- **HARD**(타입 검사, 린트 오류, 단위 테스트, vitest, db-rules, public-creds, 선택적
  `package-artifact`) → **실제 결함**; `exit 1`. 소스 브랜치에서 수정합니다(TDD, 규칙 #18).
- **DRIFT**(eslint **경고**, 인지 복잡도, 파일 크기) → 사이클 중 누적된 래칫 드리프트이며,
  **기여자의 잘못이 아닙니다**. 이는 보고만 되며 **릴리스 시 유지관리자가 기준선을 재설정합니다**.
  드리프트는 **절대로** 종료 코드를 변경하지 않으므로 누구도 차단하지 않습니다.

```bash
npm run check:release-green                 # 현재 브랜치(작업 트리)
node scripts/quality/validate-release-green.mjs --json   # 구조화된 출력
node scripts/quality/validate-release-green.mjs --quick  # 단위 테스트+vitest 생략(드리프트+타입 검사+린트만)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact 포함(느림)
```

진단하고 **보고만** 합니다(자동 수정 없음). 성공 상태로 만들기 위한 오케스트레이션은
`/green-prs`와 `/review-prs`에 있습니다.

## 솔루션 A — `/green-prs`(큐 스캔)

절차(요약 — 자세한 내용은 `green-prs` 스킬 참조):

1. 활성 릴리스 브랜치를 대상으로 열린 PR 큐의 **목록을 작성**합니다.
2. 각 PR을 **분류**합니다(실행 가능 / 거부 권고 / 작성자 조치 필요). 거부 권고 및 작성자 조치 필요 PR은
   **보고만 하고 닫지 않습니다**(작성자가 결정).
3. 실행 가능한 각 PR에 대해 **격리된 작업 트리**(규칙 #19)에서 PR을 릴리스 최신 커밋에 맞춘 후
   `npm run check:release-green`을 실행합니다:
   - **HARD** → 공동 저작 방식으로 **기여자의 브랜치에서 수정**하여 작성자의 "Merged" 상태를 보존하고,
     모든 HARD가 해결될 때까지 다시 실행합니다.
   - **DRIFT** → 그대로 둡니다. 릴리스 시 기준선이 재설정됩니다.
4. PR × (판정, HARD 실패, 수정 여부, DRIFT, 현재 release-green 여부) 표를 **보고**합니다.

병합하지 않고 큐를 **준비**할 수 있습니다. 명시적으로 요청된 경우에만 병합하며, PR을 닫는 일은 없습니다.

## 권장 주기

- **`/green-prs`를 주기적으로**(예: 매주) 실행하고, **`/generate-release` 전에
  항상 실행**합니다.
- **`nightly-release-green.yml`**(솔루션 D)을 지속적인 신호로 유지합니다. HARD 실패 이슈가 열리면
  스캔을 실행할 때입니다.
- 브랜치나 특정 병합 후보를 검사하려면 필요에 따라 **`/validate-release-green`**을 사용합니다.
- 특정 PR을 실제 CI에서 성공 상태로 만들어야 할 때는 **`/babysit <PR#>`**을 사용합니다.

## 릴리스와의 관계

- `/generate-release`는 **Phase 0(사전 점검)**에서 검증을 호출합니다. 릴리스 PR을 열기 전에
  DRIFT의 기준선을 재설정하고 HARD를 수정합니다.
- `/review-prs`는 병합 결정 단계에서 release-green 게이트를 사용합니다(병합 전 성공 상태 확인).

모든 구성 요소의 목표는 같습니다. 릴리스 당일 40분짜리 실패 단계들을 연이어 헤쳐 나가는 대신,
**첫 번째 CI 실행부터 성공하는 릴리스 PR**을 만드는 것입니다.
