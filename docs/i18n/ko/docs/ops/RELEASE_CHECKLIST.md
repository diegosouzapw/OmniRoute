# Release Checklist (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **최종 업데이트:** 2026-08-28 — v3.8.51
> 자동화를 위해 Claude Code 스킬을 활용하도록 릴리스 흐름을 간소화했습니다.
>
> **릴리스 사이에도 큐/브랜치를 정상 상태로 유지하세요:** [RELEASE_GREEN.md](./RELEASE_GREEN.md)를 참조하세요.
> (`/green-prs` 제품군 + `npm run check:release-green` + `/babysit` + 야간 실행). 이를
> 주기적으로, 특히 이 체크리스트를 실행하기 **전에** 수행하면 릴리스 PR을 정상 상태로 시작할 수 있습니다.

## 요약

```bash
# 1. 버전 업데이트 + CHANGELOG 생성(스킬)
/version-bump-cc patch    # 또는 minor/major

# 2. 로컬에서 품질 게이트 실행
npm run check              # 린트 + 테스트
npm run test:coverage      # 전체 커버리지 게이트(60/60/60/60)

# 3. 빌드 및 스모크 테스트
npm run build
npm run test:e2e           # 선택 사항이지만 권장

# 4. 릴리스 생성(스킬)
/generate-release-cc

# 5. 배포(스킬)
/deploy-vps-both-cc        # 또는 akamai-cc / local-cc

# 6. 릴리스 증빙 캡처(스킬)
/capture-release-evidences-cc
```

## npm Trusted Publishing(v3.8.51부터 기본값) — 요청 시 스테이징, 대체 수단으로 직접 게시

`npm-publish.yml`은 기본적으로 **npm Trusted Publishing(OIDC)**을 통해 게시합니다.
`stage-npm` 작업(github-hosted)은 해당 실행에서 사용할 수 있도록 GitHub의 id-token을
수명이 짧은 npm 자격 증명으로 교환합니다. 따라서 저장소 시크릿에 수명이 긴 npm 토큰이
필요하지 않고, 2FA 프롬프트도 없으며, 출처 증명이 첨부됩니다.
이는 2FA를 건너뛰는 토큰이 폐지됨에 따라 npm이 현재 허용하는 우회 방식입니다.
WS1.3 보장(유출된 토큰만으로는 게시할 수 없음 — 애초에 토큰이 없음)을 유지하면서,
프로젝트가 v3.8.48까지 사용하던 완전 자동화 흐름을 복원합니다.

**일회성 설정(소유자):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). 이 설정이 존재하기 전에는 자동 단계가 `ENEEDAUTH`와 함께 실패합니다.
아래의 `publish_mode=staged` 또는 `direct`로 다시 디스패치하세요.

### 스테이징 게시(요청 시 — `publish_mode=staged`)

npm-publish 워크플로는 더 이상 직접 게시하지 않습니다. 패킹된 tarball을 부팅하여
(`check:pack-boot`) 확인한 다음 `npm stage publish`를 실행합니다. 정확히 동일한 바이트가
레지스트리에 보관되지만, 소유자가 승인하기 전까지는 **설치할 수 없습니다**. 사람의 2FA
게이트는 검증 전이 아니라 검증 후로 이동했습니다.

**워크플로가 정상 완료된 후 소유자가 수행할 절차:**

1. `npm stage list omniroute` — stage id를 찾습니다(워크플로 요약에도 출력됨).
2. 스테이징된 바이트를 확인합니다(권장): `npm stage download <id>`를 실행한 다음,
   다운로드한 tarball을 임시 prefix에 설치하고 부팅합니다(`npm run check:pack-boot`는
   CI에서 동일한 pack→install→boot 판정을 자동화함).
3. `npm stage approve <id>` — 2FA 프롬프트 승인이 곧 게시입니다. `npm stage reject <id>`는 폐기합니다.
4. 게시 후 안전망: 게시 후 검증 도구(v3.8.49 계획의 WS1.4)는 공개 레지스트리에서
   게시된 버전을 깨끗한 컨테이너에 설치하고 부팅합니다.

**긴급 대체 수단:** `publish_mode=direct`를 사용한 `workflow_dispatch`는 기존의
즉시 `npm publish` 방식을 복원합니다(스테이징 자체가 오작동하는 경우에만 사용하고,
그 이유를 기록하세요).

**일회성 강화(소유자, npmjs.com):** 유출된 수명이 긴 토큰으로 어디서든 직접
`npm publish`를 실행할 수 없도록 `omniroute`의 Trusted Publisher를 stage-only 모드로
구성하세요. CI에서는 스테이징만 가능하며, 소유자의 2FA를 통해서만 릴리스할 수 있습니다.

**손상된 아티팩트 대응 절차(변경 없음):** 기본적으로 즉시
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`를 실행합니다(몇 분이면 완료되며 되돌릴 수 있음).
`npm unpublish`는 72시간 이내이고 종속 항목이 없는 경우에만 사용하며, 절대로 첫 번째 조치로 사용하지 마세요.
Docker에서는 버전 태그를 절대 다시 작성하지 마세요. 롤백은 `latest`가 마지막으로 정상인 digest를
다시 가리키도록 하는 것입니다.

**Docker Hub `latest`(모든 안정 SemVer 게시 시 필수):**
`docker-publish` 워크플로는 반드시 `X.Y.Z` 태그를 지정해야 하며,
`should-promote-latest.sh`가 해당 버전이 가장 높은 안정 SemVer임을 확인하면
동일한 **digest**로 `:latest` 태그도 지정해야 합니다. 작업 완료 후 Hub의 `latest`
digest는 새 SemVer digest와 같아야 하며, `last_updated`도 갱신되어야 합니다.
릴리스 노트에서 git에만 존재하는 수정 사항을 설명하면서 `:latest`는 이전 빌드를
가리키도록 방치하지 마세요. Compose 빠른 시작에서는 `:latest`를 사용하며,
GitOps에서는 계속 `X.Y.Z`로 고정해야 합니다. [Docker 릴리스 채널](../guides/DOCKER_GUIDE.md#release-channels)과 #10317을 참조하세요.

## 핫픽스 패스트 레인(라벨 `hotfix`)

`hotfix` 라벨이 지정된 PR은 무거운 CI 매트릭스(9샤드 E2E, 커버리지 래칫,
quality-gate, quality-extended)를 건너뛰고 빠르고 신호도가 높은 게이트인 빌드,
유닛 샤드, 통합, vitest, 린트/타입 검사, 문서 동기화, `check:pack-artifact`
및 tarball 부팅 스모크 테스트(`check:pack-boot`)를 유지합니다. 목표: 약 33분이 아닌 ≤15분 내 통과.

**진입 정책 — 네 가지 모두 필수(Chromium/VS Code/Node 긴급 레인을 모델로 함):**

1. **심각도**: 프로덕션이 중단된 상태여야 합니다. 즉, 게시된 아티팩트가 부팅 시 충돌하거나,
   보안 수정이 필요하거나, 릴리스의 모든 사용자가 영향을 받는 경우입니다. "중요함"은 "중단됨"이 아닙니다.
2. **권한**: 저장소 소유자만 `hotfix` 라벨을 적용합니다. 이 라벨 자체가
   승인입니다. 캠페인 PR에서 자체적으로 사용해서는 안 됩니다.
3. **증거**: PR 본문에 이전에 완전히 통과한 무거운 실행(건너뛴 작업이
   재검증할 테스트 스위트)과 수정 사항 자체의 실패 후 통과 테스트를 링크합니다.
4. **범위**: cherry-pick 전용입니다. 최소한의 수정만 포함하며, 리팩터링이나 끼워 넣는 변경은 허용하지 않습니다.

건너뛴 커버리지/래칫 영역은 릴리스 브랜치의 다음 전체 실행에서
재검증됩니다(지속적인 릴리스 통과 상태). 이 레인은 검증이 아니라 대기만 건너뜁니다.
테스트 전용 변경 사항(모든 파일이 `tests/` 아래에 있고 `tests/e2e/` 아래에는 없음)은
라벨 없이 자동으로 E2E 매트릭스를 건너뜁니다.

## 상세 체크리스트

### 릴리스 전

- [ ] 이 릴리스를 대상으로 하는 모든 PR이 `release/vX.Y.0`에 병합됨
- [ ] 이 버전의 모든 열린 Linear/이슈 항목이 종료되었거나 다음 마일스톤으로 이동됨
- [ ] `release/vX.Y.0` 브랜치에서 CI 통과
- [ ] 코드에 `TODO(release)` 마커가 없음: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 베이스 이미지가 최신 상태임(현재 `node:24.15.0-trixie-slim`)

### 버전 및 변경 로그

- [ ] `/version-bump-cc <patch|minor|major>` 실행(Claude Code 스킬)
  - `package.json`, `electron/package.json` 버전 상향
  - 마지막 태그 이후의 git 커밋에서 `CHANGELOG.md` 재생성
  - README.md 배지 업데이트
- [ ] CHANGELOG.md를 수동으로 검토하고 필요하면 커밋 메시지를 정리
- [ ] `CHANGELOG.md`의 최신 semver 섹션이 `package.json` 버전과 일치하는지 확인
- [ ] 향후 작업을 위해 `## [Unreleased]`를 변경 로그의 첫 번째 섹션으로 유지
- [ ] `docs/openapi.yaml` 업데이트 → `info.version`은 `package.json` 버전과 일치해야 함

### 코드 품질

- [ ] `npm run lint` — 오류 0개(경고는 기존에 존재함)
- [ ] `npm run typecheck:core` — 문제 없음
- [ ] `npm run typecheck:noimplicit:core` — 문제 없음(엄격 모드)
- [ ] `npm run check:cycles` — 순환 의존성 없음
- [ ] `npm run check:any-budget:t11` — 예산 범위 내
- [ ] `npm run check:route-validation:t06` — 문제 없음
- [ ] `npm run check:node-runtime` — 지원되는 최소 런타임 충족(`src/shared/utils/nodeRuntimeSupport.ts`의 `SUPPORTED_NODE_RANGE`에 따라 `>=22.22.2 <23`, `>=24.0.0 <27`; `package.json`의 `engines`와 일치)

### 테스트

- [ ] `npm run test:unit` — 통과
- [ ] `npm run test:vitest` — 통과(MCP 서버, autoCombo, 캐시)
- [ ] `npm run test:coverage` — 60/60/60/60 게이트 충족(구문/라인/함수/분기)
- [ ] `npm run test:integration` — 통과(변경 사항이 DB/핸들러에 영향을 주는 경우)
- [ ] `npm run test:combo:matrix` — 통과(콤보 전략 매트릭스: 공개된 19개 라우팅 전략 모두의 선택 결정을 결정론적으로 입증함. 콤보 라우팅, 전략 해석 또는 폴백 로직을 변경할 때 실행)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **선택 사항/수동**(게이트로 제한된 실제 업스트림 스모크 테스트. VPS `root@192.168.0.15`에서 읽기 전용 DB 스냅샷을 가져오며, 실제 공급자를 호출하고 크레딧을 소비함. CI에서는 절대 실행되지 않으며, 게이트가 없으면 문제없이 건너뜀)
- [ ] `npm run test:combo:live:vps` — **선택 사항/수동**(3단계 VPS 라이브 스모크 테스트: 일반 Node ESM을 통해 라이브 `.15` 서버를 대상으로 하는 7가지 HTTP 시나리오. `ssh root@192.168.0.15`가 필요하며, `__live_test__*` 콤보만 생성/삭제함. 실제 공급자를 호출하며 CI에서는 절대 실행되지 않음)
- [ ] `npm run test:e2e` — 통과(UI 변경)
- [ ] `npm run test:protocols:e2e` — 통과(MCP/A2A 변경)
- [ ] `npm run test:ecosystem` — 통과

### 훅(Husky 검증 완료)

Husky 훅은 `.husky/`에 있으며 git 작업 시 자동으로 실행됩니다.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** 빠르고 결정론적인 게이트 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`(2026-06-13 활성화). 의도적으로 `test:unit`은 제외됨(느리며 CI `test-unit` 작업에서 처리됨).
  - 릴리스 브랜치를 푸시하기 전에 `npm run test:unit`을 수동으로 실행합니다.

훅이 실패하면 `--no-verify`로 우회하지 말고 근본적인 문제를 수정합니다.

### Conventional Commits

릴리스에 포함되는 모든 커밋은 `type(scope): subject` 형식을 따라야 합니다.

**유효한 타입:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**유효한 범위:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

호환성을 깨는 변경: `BREAKING CHANGE:` 푸터를 추가하거나 범위 뒤에 `!`를 추가합니다(예: `feat(api)!: drop /v0`).

### 문서

- [ ] `npm run check:docs-sync` 통과(커밋 전 훅에서 자동 실행)
- [ ] `npm run check:docs-all` 통과(통합 검사: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync`가 종료 코드 0으로 완료 — 코드 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 환경 변수 계약이 온전함
- [ ] `npm run check:doc-links`가 종료 코드 0으로 완료 — 구조 변경 후 깨진 내부 마크다운 참조가 없음
- [ ] 스토리지/런타임 불일치 여부를 확인하기 위해 `docs/architecture/ARCHITECTURE.md` 검토
- [ ] 환경 변수 및 운영 관련 불일치 여부를 확인하기 위해 `docs/guides/TROUBLESHOOTING.md` 검토
- [ ] `.env.example`이 변경된 경우: `docs/reference/ENVIRONMENT.md` 업데이트
- [ ] 새 기능에 UI가 있는 경우: `docs/guides/USER_GUIDE.md`에 해당 기능을 언급
- [ ] 새 기능에 API가 있는 경우: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` 업데이트
- [ ] 새 기능이 모듈인 경우: 전용 `docs/<MODULE>.md`가 존재
- [ ] 호환성을 깨는 변경 사항이 있는 경우: `docs/guides/TROUBLESHOOTING.md`에 마이그레이션 참고 사항 추가

### i18n

- [ ] `npm run i18n:check`가 종료 코드 0으로 완료 — 번역 상태(`.i18n-state.json`)가 원본 문서와 동기화됨(엄격 모드에서는 변경된 원본이 없어야 함. 막바지 문서 수정에는 경고 모드 안내를 허용할 수 있지만 태그 생성 전에는 0이어야 함)
- [ ] `npm run i18n:check-ui-coverage`가 종료 코드 0으로 완료 — 모든 UI 로케일이 80% 이상의 커버리지 기준을 충족
- [ ] `npm run i18n:sync-ui:dry`가 42개 모든 로케일에서 누락된 키 0개를 보고
- [ ] 영어 원본 문서가 변경된 경우 태그 생성 전에 `npm run i18n:run` 실행(`.env`에 `OMNIROUTE_TRANSLATION_API_KEY` 필요)
- [ ] 사소한 번역 기여는 다음 릴리스로 연기 가능(CHANGELOG에서 추적)

### 데이터베이스 마이그레이션

- [ ] `src/lib/db/migrations/`에 새 파일이 있는 경우:
  - [ ] 각 마이그레이션이 멱등성을 가짐(`CREATE TABLE IF NOT EXISTS` 등)
  - [ ] 마이그레이션이 트랜잭션으로 래핑됨
  - [ ] 번호가 올바르게 지정됨(순서에 누락 없음)
- [ ] 새 설치에서 테스트: `~/.omniroute/omniroute.db`를 삭제하고 `npm run dev` 실행
- [ ] 기존 설치에서 테스트: DB를 백업하고 마이그레이션을 실행한 뒤 스키마 확인
- [ ] 마이그레이션이 테이블을 다시 작성하는 경우 WAL 파일(`-wal`, `-shm`)이 올바르게 처리됨

### 제공자 카탈로그(Zod 검증)

- [ ] `src/shared/constants/providers.ts`의 Zod 스키마가 로드 시 유효함
  - [ ] 모든 제공자에 필수 필드(`id`, `label`, `kind` 등)가 있음
  - [ ] 새로운 무료 제공자에 `freeNote`가 제공됨
  - [ ] OAuth 제공자의 `oauthConfig`가 `src/lib/oauth/constants/oauth.ts`에 등록됨
- [ ] 새 제공자를 추가한 경우: `open-sse/executors/`에 해당 실행기 추가
- [ ] OpenAI 형식이 아닌 경우: `open-sse/translator/`에 변환기 추가
- [ ] 모델이 `open-sse/config/providerRegistry.ts`에 등록됨
- [ ] `tests/unit/`의 단위 테스트에서 제공자 분류 및 라우팅을 다룸

### 데스크톱(Electron)

`electron/`이 변경된 경우:

- [ ] `npm run electron:smoke:packaged` 통과
- [ ] `:win`, `:mac`, `:linux` 중 하나 이상의 빌드 테스트
- [ ] 코드 서명 시 인증서가 만료되지 않음
- [ ] `electron/package.json` 버전이 루트 `package.json`과 일치
- [ ] `stable`로 릴리스하는 경우 자동 업데이트 채널 포인터 업데이트

### 빌드 레이아웃

저장소는 서로 구분되는 세 개의 출력 디렉터리를 사용합니다. 절대 혼동하지 마세요.

| 디렉터리  | 용도                                               | 추적 여부          |
| --------- | -------------------------------------------------- | ------------------ |
| `src/`    | 애플리케이션 소스(TypeScript / TSX)                | 예                 |
| `.build/` | 빌드 중간 산출물 — `next build` 출력(`distDir`)    | 아니요(gitignored) |
| `dist/`   | 배포 가능한 npm 번들 — `assembleStandalone`로 조립 | 아니요(gitignored) |

> **운영자 참고:** 원격 VPS 이미지 디렉터리는 계속 `/usr/lib/node_modules/omniroute/app/`입니다.
> **저장소 내부** 빌드 출력만 이동했습니다(`app/` → `dist/`). 배포 스킬은 `dist/`의
> 내용을 원격 `app/` 디렉터리로 rsync하므로 VPS 경로를 변경할 필요가 없습니다.

**단일 빌드 흐름:**

```
npm run build:release
  └─ rm -rf .build dist          (정리)
  └─ next build → .build/next/   (중간 산출물)
  └─ assembleStandalone          (standalone + static + public + natives를 dist/로 복사)
  └─ dist/BUILD_SHA 작성         (HEAD 센티널)
```

배포를 위해 `npm run build`를 실행한 뒤 별도로 `npm run build:cli`를 실행하지 마세요. 한 번의 명령으로 클린 재빌드와 센티널 생성을 수행하는
`npm run build:release`를 사용하세요.

### 아티팩트 검증

- [ ] `npm run build:release`가 성공하고 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact`가 깨끗하게 통과 — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` 또는 기타 로컬 잔여물이 없음
- [ ] 빌드 후 `dist/server.js`가 존재
- [ ] 선택적 로컬 패키지 런타임 스모크 테스트: `npm run dev:candidate -- build` 후 `npm run dev:candidate -- validate`를 실행하면 격리된 `DATA_DIR`에서 패키징된 tarball을 부팅하고 `/api/health` + `/v1/models`를 검사함([기여 골든 패스](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop) 참조)

### 태그 생성 및 릴리스

- [ ] `/generate-release-cc` 실행(Claude Code 스킬):
  - `vX.Y.Z` 태그 생성
  - 태그와 브랜치 푸시
  - 변경 로그 본문으로 GitHub Release 생성
  - Electron 설치 프로그램 첨부(빌드한 경우)
- [ ] 또는 수동으로 실행:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 배포

배포 스킬은 경량 rsync 흐름을 사용합니다. `npm pack`이나 `npm i -g`는 사용하지 않습니다:

- [ ] 대상과 일치하는 배포 스킬 사용:
  - `/deploy-vps-local-cc` — 로컬 VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — 둘 다
- [ ] 배포 전에 `dist/BUILD_SHA` == `git rev-parse --short HEAD`인지 확인
- [ ] 빌드는 `node_modules`가 실제로 존재하는 위치에서 실행해야 함(메인 체크아웃 또는 `npm ci`를 실행한 worktree — 심볼릭 링크로 연결된 worktree는 불가)
- [ ] 배포된 인스턴스 스모크 테스트:
  - `/dashboard/health` 열기 → 버전 문자열이 릴리스와 일치하는지 확인
  - 알려진 프로바이더를 대상으로 `/v1/chat/completions` 요청 실행
  - `/api/monitoring/health`가 `CLOSED` 회로 차단기를 반환하는지 확인
  - MCP 전송이 응답하는지 확인(`/mcp` HTTP, `/mcp-sse` SSE)

### 릴리스 후

- [ ] `/capture-release-evidences-cc` 실행(Claude Code 스킬)
  - 새 기능의 WebP 스크린샷/녹화 캡처
  - 릴리스 노트/블로그 게시물에 첨부
- [ ] GitHub Discussions/Discord에 릴리스 공지 게시
- [ ] 다음 버전의 마일스톤 생성
- [ ] 중요 릴리스인 경우: 토론을 고정하거나 앱 내 배너용 `news.json`에 게시

### Radar 공개 출시 게이트

Radar 공지는 의도적으로 `active: false` 상태로 커밋되어 있습니다. 아래의 모든 항목에 대한 증빙이 완료된 후 별도의 변경으로 활성화합니다:

- [ ] 스택된 모든 Radar PR이 병합되고 릴리스 팁 CI가 통과했는지 확인
- [ ] `RADAR_ENABLED`가 기본적으로 비활성화된 상태에서 OSS Radar 경로를 배포하고 스모크 테스트
- [ ] 지정된 Radar 호스트에서 `GET /planos`, `/termos`, `/privacidade`, `/reembolso` 스모크 테스트
- [ ] 비공개 서비스에 운영자 신원/연락처/주소 및 소유자가 승인한 법률 검토 기록
- [ ] 테스트 모드에서만 Stripe Checkout 및 서명된 webhook 테스트
- [ ] 승인된 발신자/도메인으로 암호화된 트랜잭션 이메일 1건의 전송 테스트
- [ ] 백업 복원 및 감독하에 예산 한도가 적용된 연구 실행 1회를 입증
- [ ] 기부 증빙을 수락하기 전에 BRL/PIX 검토 정책 승인
- [ ] 앞선 게이트를 모두 통과한 후에만 공개 Checkout을 활성화한 다음, 새로운 `news.json` ID 활성화
- [ ] Home 배너가 현지화된 문구를 사용하며, 이전 ID를 닫은 후 새 ID가 다시 표시되는지 확인

## 임베디드 서비스 스모크 테스트 (v3.8.4+)

임베디드 서비스 변경 사항이 포함된 릴리스를 배포하기 전에 다음을 확인하세요.

### 새 DB 부팅 (마이그레이션 충돌 감지 — v3.8.4 핫픽스 이후 추가됨)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 부팅될 때까지 10초 대기
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'`이 `"9router"`를 반환함(404 또는 500이 아니어야 함). 마이그레이션 `071_services.sql`이 적용되고 행이 시딩되었는지 확인합니다.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"`가 3개 행을 반환함.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"`가 2개 행을 반환함(`070_webhooks_kind_metadata.sql`이 적용되었는지 검증).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts`가 통과함 — 향후 충돌을 방지합니다.

### 9Router

- [ ] `POST /api/services/9router/install`이 2분 이내에 `installedVersion`과 함께 200을 반환함
- [ ] `POST /api/services/9router/start`가 30초 이내에 200과 `state: "running"`을 반환함
- [ ] `GET /api/services/9router/status`가 `health: "healthy"`를 보고함
- [ ] `"model": "9router/auto/..."`이 포함된 `POST /v1/chat/completions`가 200을 반환함(9Router를 통한 엔드투엔드 라우팅)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard`가 프록시 내부에 9Router 네이티브 UI를 렌더링함(직접적인 `127.0.0.1:port` iframe을 사용하지 않음)
- [ ] `POST /api/services/9router/rotate-key`가 `{ keyRotated: true }`를 반환하고 서비스가 정상적으로 재시작됨
- [ ] `POST /api/services/9router/stop`이 200과 `state: "stopped"`를 반환함
- [ ] `GET /api/services/9router/logs?tail=50`이 최근 로그 행을 포함한 `snapshot` 이벤트가 있는 SSE 스트림을 반환함
- [ ] PATH에 `npm`이 없는 환경에서 설치할 경우 친절한 오류 메시지(스택 트레이스가 아닌 메시지)와 함께 500을 반환함

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install`이 2분 이내에 200을 반환함
- [ ] `POST /api/services/cliproxy/start`가 30초 이내에 200과 `state: "running"`을 반환함
- [ ] `GET /api/services/cliproxy/status`가 `health: "healthy"`를 보고함
- [ ] `POST /api/services/cliproxy/stop`이 200과 `state: "stopped"`를 반환함
- [ ] `GET /api/services/cliproxy/logs?tail=50`이 SSE 스트림을 반환함

### 보안 회귀 테스트

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start`가 `403 LOCAL_ONLY`를 반환함
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start`가 `403 LOCAL_ONLY`를 반환함
- [ ] `/api/services/*`의 오류 응답에 `err.stack`이나 절대 파일 경로가 포함되지 않음

## v3.8.0+ 확인 사항

v3.8.x 릴리스를 배포하기 전에 다음 추가 항목을 확인하세요.

- [ ] `omniroute --tray`가 macOS에서 부팅됨(systray2가 `~/.omniroute/runtime/`에 설치됨)
- [ ] `omniroute --tray`가 Linux에서 부팅됨(DISPLAY 필요, 설정되지 않은 경우 정상적으로 오류 처리)
- [ ] `omniroute --tray`가 Windows에서 부팅됨(PowerShell NotifyIcon 사용, 추가 바이너리 없음)
- [ ] `omniroute config tray enable`이 자동 시작 항목을 생성하고, 비활성화하면 해당 항목이 제거됨
- [ ] `npm install -g omniroute@<this-version>`이 치명적인 종료 없이 postinstall을 실행함
- [ ] 업데이트 경로가 선택적 의존성을 유지함: `omniroute update --apply`와 자동 업데이트 프로그램이
      `npm install -g … --include=optional`을 실행하여 `optionalDependencies`(better-sqlite3,
      keytar, tls-client 및 llmlingua SLM 스택: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`)가 업데이트 후에도 유지되도록 함. ultra `modelPath` SLM 티어에는
      tinybert 모델도 필요하며, 최초 사용 시 `${DATA_DIR}/models/llmlingua`에 자동으로 다운로드됨. 이후 postinstall
      (`scripts/build/colocateOptionals.mjs`)은 SLM 선택적 의존성 클로저를 `dist/node_modules`에 함께 배치하여
      워커가 단일 `@huggingface/transformers` ^4.2.0 인스턴스를 해석하도록 함
      — 독립 실행형 트레이스는 동적으로 가져오는 선택적 의존성이 아니라 transformers만 번들링하므로,
      이 과정이 없으면 워커가 루트의 transformers에 대해 llmlingua-2를 로드하고
      SLM 티어가 조용히 실패 후 우회 처리됨.
- [ ] `.env`가 없어도 `omniroute status`가 작동함(CLI 토큰 경로, 루프백 전용)
- [ ] `curl http://localhost:20128/api/shutdown`이 401을 반환함(항상 보호되는 경로)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse`가 401을 반환함(루프백 가드)
- [ ] 최초 실행 시 SQLite 런타임이 `bundled`로 해석됨(번들 바이너리가 해당 플랫폼에서 유효함)
- [ ] `node_modules/better-sqlite3`가 삭제되면 SQLite 런타임이 `runtime`으로 폴백함
- [ ] Smart MCP 필터가 실제 `playwright-mcp browser_snapshot` 출력을 압축함(50% 이상 감소)
- [ ] `skills/omniroute*/SKILL.md` 파일 10개 모두 raw GitHub URL을 통해 공개적으로 가져올 수 있음
- [ ] 새로 설정할 때 온보딩 마법사에 "작동 방식" 티어 둘러보기 단계가 표시됨
- [ ] 홈 대시보드의 티어 커버리지 위젯에 구성된 개수와 활성 개수가 표시됨

---

## 3.9.0 LTS 분기 (3.8.58에서 리허설)

v3.8.59 다음 버전은 3.9.0이며, 그 최종 커밋에서 수명이 긴 두 브랜치가 생성됩니다:
`stable/v3`(v3 LTS 라인, npm `latest`)와 `develop`(v4, 4.0.0으로 버전 상향, npm
`nightly`). 브랜치/채널 모델, 순방향 포팅 및 레이블은
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md)에 있으며, 계획은 [ROADMAP](../../ROADMAP.md)(3단계)에 있습니다. 분기는 한 번만 실행됩니다.
3.8.58에서는 포크에서 전체 과정을 처음부터 끝까지 리허설하고, 3.8.59는
[GO/NO-GO 체크리스트](./LTS_GO_NO_GO.md)로 마무리합니다.

### 드라이런(읽기 전용, 언제든 안전함)

```bash
npm run release:dry-run-lts-cut                       # 실제 분기: HEAD에서 3.9.0, 이전 태그 v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # 소스 커밋 고정
```

`scripts/release/dry-run-lts-cut.mjs`는 아무 작업도 실행하지 않습니다. git과 `gh`를 읽고
전체 절차를 출력합니다. 여기에는 사전 조건(소스가 확인됨, 이전 태그가 존재함, `package.json`이
대상 버전임, `release-freeze` 이슈가 열려 있음, 기존 릴리스 브랜치에 열린 `Release branch not green`
이슈가 없음 — 존재하지 않는 브랜치는 녹색이 아니라 `?` 알 수 없음으로 보고됨 — Mergify
`release` 큐가 구성됨(G11: `queue_rules`, `checks_timeout`, 레이블 `queue`),
`release/*` 규칙 세트가 여전히 삭제와 강제 푸시를 차단함, 그리고
`stable/v3`와 `develop`이 아직 존재하지 않음), 두 브랜치 단계, 어떤 휴면 워크플로 트리거와
`if:` 조건이 참이 되는지(그리고 어떤 것이 저장소 변수로 계속 제한되거나 정식 저장소에
고정되는지), 예상 dist-tag(`latest` → 3.9.0, `next`와 `nightly`는 비어 있음) 및 롤백이 포함됩니다.
종료 코드 `0` = `RESULT: READY`, `1` = 차단 사전 조건 실패(`✗`), `2` = 사용법 오류입니다.
`--advisory <id,...>`는 검사를 숨기지 않고 경고(`!`)로 낮춥니다.

3.9.0 릴리스 동결이 아직 진행 중일 때 실제 분기의 드라이런을 실행하십시오. 브랜치는 태그 이후,
그리고 12c 단계에서 동결을 해제하기 전에 생성됩니다.

### 3.8.58 리허설(포크 전용)

```bash
# 1. 리허설 매개변수로 현재 최종 커밋에서 드라이런
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. 포크 원격 저장소를 대상으로 실행(origin 또는 URL이 정식 저장소인 원격 저장소는
#    거부됨. 각 단계마다 터미널에서 확인을 요청함)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. 포크에서 휴면 워크플로 실행(드라이런에서 정식 저장소 고정을 보고하는 경우
#    workflow_dispatch 사용) 후 롤백
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

develop 버전 상향 커밋은 git 저수준 명령으로 생성되며(작업 트리는 건드리지 않음),
주기 시작 커밋과 동일한 다섯 파일의 버전을 상향합니다: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json`, `docs/openapi.yaml`. 이후 첫 번째
PR 전에 `develop`에서 `[4.0.0]` CHANGELOG 섹션과 해당 i18n 미러를 엽니다.
스크립트는 npm dist-tag를 변경하지 않습니다. 이러한 작업은 임시 패키지에서 리허설하십시오.

### PR 미리 보기 아티팩트(한 번 빌드하고 동일한 바이트를 승격)

`.github/workflows/preview-artifact.yml`은 PR 헤드에서 프로덕션 tarball 하나를 빌드하고
정확히 그 빌드를 검증합니다(#8084 조각 (a)). 동일 저장소의 PR만 지원하며 아무것도 게시하지 않습니다.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # 또는 `preview-artifact` 레이블 추가
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # 미리 보기 설치
```

실행 과정에서는 `npm ci`, `npm run build:release`, `npm run check:pack-artifact`를 수행하고,
tarball을 패킹한 다음 `npm run check:pack-boot`를 실행합니다(가짜 시크릿, 임시 데이터 디렉터리).
이후 다시 패킹하여 다이제스트가 동일하지 않으면 실패하고, `artifact-identity.json`(헤드 SHA, 베이스
SHA, lockfile 해시, 플랫폼, 아키텍처, node ABI, 번들러, 빌드 정책 —
`scripts/release/artifact-identity.mjs`)을 기록한 뒤 별도 작업에서 tarball을 증명합니다. 미리 보기를
승격한다는 것은 해당 tarball을 설치한다는 의미입니다. 소스에서 다시 빌드해서는 안 됩니다.

### 분기(3.9.0, GO 이후)

1. [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md)에 GO가 기록되어 있습니다.
2. `npm run release:dry-run-lts-cut -- --from v3.9.0`이 `RESULT: READY`를 출력합니다.
3. 드라이런이 출력하는 명령을 사용하여 `origin`에 브랜치를 수동으로 생성합니다. 스크립트는
   `origin`으로의 푸시를 거부합니다. 검토된 develop 커밋을 재사용하려면 먼저 포크를 대상으로
   3.9.0 최종 커밋에서 `--execute` 리허설을 실행하십시오. 그러면 두 SHA가 모두 출력되며
   동일한 커밋을 푸시할 수 있습니다:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. 첫 번째 PR이 병합되기 전에 `stable/v3`와 `develop`을 보호합니다(규칙 세트 + 병합 큐).
5. 브랜치가 존재하면 휴면 워크플로가 활성화됩니다: `forward-port.yml`(`stable/v3`로 푸시),
   `validate-stable-pr.yml`(`stable/v3` 대상 PR), `nightly-v4-build.yml`
   (`develop` 빌드). 실제 운영 전에 `secrets.FORWARD_PORT_TOKEN` 저장소 시크릿을 설정하십시오
   (순방향 포팅 PR에서 CI가 실행되도록 하기 위함). 소유자가 저장소 변수
   `vars.NIGHTLY_PUBLISH`를 `true`로 설정하고 npm Trusted Publishing이
   `nightly-v4-build.yml`을 허용할 때까지 nightly 게시는 비활성 상태로 유지됩니다. 채널 결정은
   `scripts/release/dist-tag.mjs`가 담당하며, `npm-publish.yml`도 동일한 결정기를 사용합니다.
6. 채널을 확인합니다: `npm view omniroute dist-tags --json`은 `latest` = 3.9.0을 표시하며,
   v4가 게시되기 전까지 `next` / `nightly`는 표시하지 않습니다.
7. 필요한 경우 롤백합니다: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   및 `npm dist-tag add omniroute@3.8.59 latest`.

---

## 롤백

릴리스에 심각한 문제가 있는 경우:

1. `gh release edit vX.Y.Z --prerelease`(최신 릴리스가 아닌 것으로 표시)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`(아직 사용자가 채택하지 않은 경우에만)
3. 또는: `release/vX.Y.0`에서 핫픽스 → 패치 릴리스 `vX.Y.(Z+1)`
4. GitHub Discussions와 Discord에 즉시 공지

## 엄격한 규칙

- `main`에 직접 커밋하지 않기
- `main` 또는 `release/*` 브랜치에 `git push --force`를 절대 사용하지 않기
- Husky 훅을 절대 건너뛰지 않기(`--no-verify`)
- 비밀 정보, 자격 증명 또는 `.env` 파일을 절대 커밋하지 않기
- 커버리지는 ≥60/60/60/60(구문/라인/함수/브랜치)을 유지해야 함
- `src/`, `open-sse/`, `electron/` 또는 `bin/`의 프로덕션 코드를 변경할 때는 항상 테스트를 추가하거나 업데이트하기

## 자동화된 동기화 검사

PR을 열기 전에 로컬에서 문서 동기화 검사를 실행하세요:

```bash
npm run check:docs-sync
```

CI도 `.github/workflows/ci.yml`에서 이 검사(lint 작업)를 실행합니다.
