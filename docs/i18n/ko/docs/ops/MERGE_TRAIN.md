# Merge Queue & Manual Merge-Train Runbook (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49(품질/속도 계획의 WS3.2/WS3.4)부터 검토된 PR을 `release/vX.Y.Z`에 병합하는 기본 경로는 **Mergify 병합 큐**(`.mergify.yml`)입니다. 아래에 문서화된 **수동 병합 트레인**은 장애 발생 시, 릴리스 동결 기간 또는 Mergify 오픈 소스 플랜이 변경되는 경우에 사용하는 대체 수단입니다.

## 기본 경로: Mergify 큐

1. PR이 캠페인의 검토와 통과 판정을 받고, 소유자의 병합 전 ⭐ 게이트에서 승인됩니다(보고서 + 항목별 결정 — `/merge-prs` 0.75단계 참조).
2. 소유자(또는 소유자의 결정을 대신 수행하는 세션)가 **`queue`** 레이블을 적용합니다. 이 레이블 자체가 병합 승인입니다. Mergify는 승인된 병합을 실행하기만 합니다.
3. Mergify는 큐에 있는 PR을 최대 10개까지 배치로 묶고, 빠른 게이트를 기준으로 배치를 검증한 후 스쿼시 병합합니다. 실패한 배치는 **자동으로 이등분**됩니다. 문제가 있는 PR은 약 log2(N)회의 재검증으로 격리되어 큐에서 제거되고, 나머지는 계속 진행됩니다.
4. 병합 후 지속적 release-green 워크플로가 푸시된 새 팁을 검증하고, 조합으로 인해 회귀가 발생했다면 귀속 이슈를 생성합니다(자동으로 되돌리지는 않음).

가드레일(`CLAUDE.md`의 엄격한 규칙 #21/#22와 동일):

- **릴리스 동결 진행 중** → 동결된 브랜치를 대상으로 하는 PR에 레이블을 적용하지 마십시오. 먼저 활성 `release/vX+1`로 대상을 변경하십시오.
- **다른 세션에서 진행 중인 PR** → 해당 PR에 절대 레이블을 적용하지 마십시오. 소유 세션만 자체 작업을 큐에 추가합니다.
- 테스트 전용 diff와 `hotfix` 레이블이 지정된 PR은 이미 축소된 CI를 실행합니다(`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane 참조). 큐 조건은 실제로 실행된 검사 집합이 무엇이든 허용합니다(`#check-failure=0` + `#check-pending=0`).

## 대체 수단: 수동 병합 트레인

큐를 사용할 수 없을 때 사용합니다. 이는 v3.8.47 주기 동안 하루 만에 33개의 PR을 처리한 방식을 체계화한 것입니다.

1. **배치를 구성합니다**(검토 및 승인된 PR 약 10~30개). `linked:` 충돌(동일한 `tap.testFiles`, 동일한 CHANGELOG 구간)을 확인하고 해당 PR은 순차 처리합니다.
2. **한 번만 검증합니다**. 릴리스 팁에서 분기한 격리된 worktree에서 모든 배치 헤드를 로컬로 병합한 다음, 릴리스와 동등한 제품군을 실행합니다(`npm run check:release-green`, 릴리스 전에는 `--with-build` 추가).
   `scripts/release/merge-train.sh <base> <PR#>…`는 1~2단계를 자동화합니다(충돌하는 PR은 제외되고 트레인은 계속 진행됨). 전체 모드는 `npm run test:unit`을 실행합니다. 이는 머신에 맞게 조정된 러너(`--test-concurrency=20`)이며, 16코어 머신에서 가장 비중이 큰 단계를 약 25%만 활용하게 했던 순차 실행 방식의 4코어 CI 샤드 2개가 **아닙니다**(2026-07-18 수정). `--fast`(하루 중 대규모 트레인 처리를 위해 소유자가 2026-07-18 승인)는 모든 정적 게이트와 vitest를 유지하되, 트레인에 포함된 PR에서 변경된 node:test 파일만 실행합니다. 누적된 팁에 대해 전체 제품군을 하루에 최소 한 번은 실행해야 합니다(`--fast` 없이 트레인 하나 실행).
3. **통과** → PR을 순서대로 병합합니다(각 PR 전에 `state,headRefOid`를 다시 확인 — 헤드가 변경된 PR은 다시 검토해야 함). 각 병합의 순 diff가 해당 PR 자체의 변경 사항인지 입증합니다(자동 충돌 해결로 인한 되돌리기 금지: 범위를 벗어난 삭제가 있는지 `git diff --stat`을 감사).
4. **실패** → 하나씩 재검증하는 대신 배치를 절반씩 이등분합니다(각 절반을 검증). 문제가 있는 PR은 증거와 함께 검토 큐로 되돌립니다.
5. **절대 금지**: 동결 기간에 동결된 브랜치로 병합하기, 어디에서든 `git stash` 사용하기, 실패가 사라지기를 바라며 CI를 무차별 재실행하기(규칙: 실패는 정보임).

## 계층화(빠른 게이트만으로도 큐가 안전한 이유)

- **PR별**(quality.yml 빠른 게이트): TIA 영향 테스트 + 전체 단위 테스트 4샤드 + vitest + lint 모음 + typecheck + 문서/변경 로그 무결성.
- **배치/팁별**(지속적 release-green): 릴리스 브랜치로 푸시할 때마다 `--quick` 필수 게이트 실행. 전체 `--with-build --full-ci` 검사는 하루 3회 실행.
- **릴리스별**(릴리스 PR의 ci.yml): E2E ×9, package-artifact + tarball boot-smoke, coverage/ratchets를 포함하는 전체 매트릭스.

이전보다 적게 검증되는 것은 없습니다. 무거운 검증 범위를 PR별이 아닌 배치/팁별로 실행할 뿐이며, 이것이 O(N) 왕복 작업을 제거하는 방식입니다.
