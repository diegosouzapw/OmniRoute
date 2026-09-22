# Release Checklist (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **마지막 업데이트:** 2026-08-28 — v3.8.51
> 자동화를 위해 Claude Code 스킬을 활용하도록 릴리스 흐름을 간소화했습니다.
>
> **릴리스 사이에도 큐/브랜치를 정상 상태로 유지하세요:** [RELEASE_GREEN.md](./RELEASE_GREEN.md)를 참조하세요.
> (`/green-prs` 계열 + `npm run check:release-green` + `/babysit` + nightly). 이를 주기적으로,
> 특히 이 체크리스트를 실행하기 **전에** 수행하면 릴리스 PR을 정상 상태로 시작할 수 있습니다.

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

# 6. 릴리스 증빙 자료 캡처(스킬)
/capture-release-evidences-cc
```

## npm Trusted Publishing(v3.8.51부터 기본값) — 요청 시 스테이징, 대체 수단으로 직접 게시

`npm-publish.yml`은 기본적으로 **npm Trusted Publishing (OIDC)**을 통해 게시합니다.
`stage-npm` 작업(github-hosted)은 해당 실행에서 사용할 단기 npm 자격 증명을 얻기 위해
GitHub의 id-token을 교환합니다. 따라서 저장소 시크릿에 장기 npm 토큰을 보관할 필요가 없고,
2FA 프롬프트도 없으며 provenance가 첨부됩니다.
이는 2FA를 건너뛰는 토큰이 폐지되는 상황에서 npm이 허용하는 우회 방식입니다.
토큰 자체가 존재하지 않으므로 유출된 토큰만으로 게시할 수 없다는 WS1.3 보장을 유지하면서,
프로젝트가 v3.8.48까지 사용했던 완전 자동화 흐름을 복원합니다.

**최초 1회 설정(소유자):** npmjs.com → 패키지 `omniroute` → Settings → _Trusted
Publisher_ → GitHub: 소유자 `diegosouzapw`, 저장소 `OmniRoute`, 워크플로 `npm-publish.yml`
(환경: 없음). 이 설정이 완료되기 전에는 자동 단계가 `ENEEDAUTH`로 실패합니다.
이 경우 `publish_mode=staged`(아래 참조) 또는 `direct`로 다시 디스패치하세요.

### 스테이징 게시(요청 시 — `publish_mode=staged`)

npm-publish 워크플로는 더 이상 직접 게시하지 않습니다. 패키징된 tarball을 부팅하여
검증한 후(`check:pack-boot`) `npm stage publish`를 실행합니다. 정확히 동일한 바이트가
레지스트리에 보관되지만, 소유자가 승인하기 전까지는 **설치할 수 없습니다**. 사람에 의한
2FA 게이트는 검증 전이 아니라 검증 후로 이동했습니다.

**워크플로가 정상 상태가 된 후 소유자가 수행할 절차:**

1. `npm stage list omniroute` — stage id를 찾습니다(워크플로 요약에도 출력됨).
2. 스테이징된 바이트를 검증합니다(권장): `npm stage download <id>`를 실행한 다음,
   다운로드한 tarball을 임시 prefix에 설치하고 부팅합니다(`npm run check:pack-boot`는
   CI에서 동일한 패키징→설치→부팅 판정을 자동화함).
3. `npm stage approve <id>` — 2FA 프롬프트 승인이 곧 게시입니다. `npm stage reject <id>`는 폐기합니다.
4. 게시 후 안전망: 게시 후 검증기(v3.8.49 계획의 WS1.4)가 깨끗한 컨테이너에서
   공개 레지스트리의 게시된 버전을 설치하고 부팅합니다.

**긴급 대체 수단:** `publish_mode=direct`를 사용한 `workflow_dispatch`는 기존의 즉시
`npm publish` 방식을 복원합니다(스테이징 자체가 오작동할 때만 사용하고 그 이유를 기록하세요).

**최초 1회 보안 강화(소유자, npmjs.com):** 유출된 장기 토큰을 사용해 어디서든 직접
`npm publish`를 실행하지 못하도록 `omniroute`의 Trusted Publisher를 stage-only 모드로
구성하세요. CI는 스테이징만 수행할 수 있으며, 소유자의 2FA를 통해서만 릴리스할 수 있습니다.

**손상된 아티팩트 대응 절차(변경 없음):** 기본 대응은
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`입니다(몇 분이면 적용 가능하고 되돌릴 수 있음).
`npm unpublish`는 72시간 이내이고 의존하는 패키지가 없는 경우에만 사용하며, 절대 첫 번째 조치로
사용하지 마세요. Docker의 경우 버전 태그를 절대 덮어쓰지 마세요. 롤백은 `latest`가 마지막으로
정상적인 digest를 다시 가리키도록 하는 것입니다.

**Docker Hub `latest`(모든 안정 SemVer 게시 시 필수):**
`docker-publish` 워크플로는 반드시 `X.Y.Z`에 태그를 지정하고,
`should-promote-latest.sh`가 해당 버전을 가장 높은 안정 SemVer로 판정하면
동일한 **digest**로 `:latest`에도 태그를 지정해야 합니다. 작업이 완료된 후에는 Hub의
`latest` digest가 새 SemVer digest와 일치하고 `last_updated`가 갱신되어야 합니다.
릴리스 노트에서 git에만 존재하는 수정 사항을 설명하는 동안 `:latest`가 이전 빌드를
가리키도록 방치하지 마세요. Compose 빠른 시작은 `:latest`를 사용하며, GitOps에서는 계속
`X.Y.Z`를 고정해야 합니다. [Docker 릴리스 채널](../guides/DOCKER_GUIDE.md#release-channels)과 #10317을 참조하세요.

## 핫픽스 패스트레인(레이블 `hotfix`)

`hotfix` 레이블이 지정된 PR은 무거운 CI 매트릭스(9샤드 E2E, 커버리지 래칫,
quality-gate, quality-extended)를 건너뛰고 빠르고 신뢰도 높은 게이트인 build,
unit 샤드, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
및 tarball 부팅 스모크 테스트(`check:pack-boot`)를 유지합니다. 목표: 약 33분 대신 15분 이내에 통과.

**진입 정책 — 네 가지 모두 필수(Chromium/VS Code/Node의 긴급 레인 모델을 따름):**

1. **심각도**: 프로덕션이 작동하지 않는 상태여야 합니다. 즉, 게시된 아티팩트가 부팅 시 충돌하거나 /
   보안 수정이거나 / 해당 릴리스의 모든 사용자가 영향을 받는 경우입니다. "중요함"은 "작동하지 않음"이 아닙니다.
2. **권한**: 저장소 소유자만 `hotfix` 레이블을 적용할 수 있습니다. 이 레이블 자체가
   승인입니다. 캠페인 PR에서 절대 임의로 사용해서는 안 됩니다.
3. **증거**: PR 본문에는 이전에 모든 항목을 통과한 무거운 실행(생략되는 작업이
   재검증했을 스위트)과 해당 수정 자체의 실패 후 성공 테스트 링크를 포함해야 합니다.
4. **범위**: cherry-pick 전용이어야 합니다. 최소한의 수정만 포함하고 리팩터링이나 관련 없는 변경을 함께 넣지 않습니다.

생략된 커버리지/래칫 영역은 릴리스 브랜치의 다음 전체 실행에서
재검증됩니다(지속적인 릴리스 통과 상태). 이 레인은 대기만 생략할 뿐, 검증은 절대 생략하지 않습니다.
테스트 전용 diff(모든 파일이 `tests/` 아래에 있고 `tests/e2e/` 아래에는 없는 경우)는
레이블 없이도 E2E 매트릭스를 자동으로 건너뜁니다.

## 상세 체크리스트

### 릴리스 전

- [ ] 이 릴리스를 대상으로 하는 모든 PR이 `release/vX.Y.0`에 병합됨
- [ ] 이 버전에 열려 있는 모든 Linear/이슈 항목이 종료되었거나 다음 마일스톤으로 이동됨
- [ ] `release/vX.Y.0` 브랜치의 CI가 통과함
- [ ] 코드에 `TODO(release)` 마커가 없음: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker 베이스 이미지가 최신 상태임(현재 `node:24.15.0-trixie-slim`)

### 버전 및 변경 로그

- [ ] `/version-bump-cc <patch|minor|major>` 실행(Claude Code 스킬)
  - `package.json`, `electron/package.json` 버전 상향
  - 마지막 태그 이후의 git 커밋에서 `CHANGELOG.md` 재생성
  - README.md 배지 업데이트
- [ ] CHANGELOG.md를 수동으로 검토하고 필요한 경우 커밋 메시지를 정리
- [ ] `CHANGELOG.md`의 최신 semver 섹션이 `package.json` 버전과 일치하는지 확인
- [ ] 향후 작업을 위해 `## [Unreleased]`를 변경 로그의 첫 번째 섹션으로 유지
- [ ] `docs/openapi.yaml` 업데이트 → `info.version`은 `package.json` 버전과 일치해야 함

### 코드 품질

- [ ] `npm run lint` — 오류 0개(경고는 기존부터 존재함)
- [ ] `npm run typecheck:core` — 문제없음
- [ ] `npm run typecheck:noimplicit:core` — 문제없음(엄격 모드)
- [ ] `npm run check:cycles` — 순환 의존성 없음
- [ ] `npm run check:any-budget:t11` — 예산 이내
- [ ] `npm run check:route-validation:t06` — 문제없음
- [ ] `npm run check:node-runtime` — 지원되는 최소 런타임 조건 충족(`src/shared/utils/nodeRuntimeSupport.ts`의 `SUPPORTED_NODE_RANGE`에 따라 `>=22.22.2 <23`, `>=24.0.0 <27`; `package.json`의 `engines`와 일치)

### 테스트

- [ ] `npm run test:unit` — 통과
- [ ] `npm run test:vitest` — 통과(MCP 서버, autoCombo, 캐시)
- [ ] `npm run test:coverage` — 게이트 60/60/60/60 충족(구문/줄/함수/분기)
- [ ] `npm run test:integration` — 통과(변경 사항이 DB / 핸들러에 영향을 미치는 경우)
- [ ] `npm run test:combo:matrix` — 통과(콤보 전략 매트릭스: 공개 라우팅 전략 19개 모두의 선택 결정을 결정론적으로 검증함. 콤보 라우팅, 전략 결정 또는 폴백 로직을 변경할 때 실행)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **선택 사항/수동**(게이트로 제어되는 실제 업스트림 스모크 테스트. VPS `root@192.168.0.15`에서 읽기 전용 DB 스냅샷을 가져옴. 실제 제공자를 호출하므로 크레딧이 소모됨. CI에서는 절대 실행되지 않음. 게이트가 없으면 문제없이 건너뜀)
- [ ] `npm run test:combo:live:vps` — **선택 사항/수동**(3단계 VPS 라이브 스모크 테스트: 일반 Node ESM을 통해 라이브 `.15` 서버를 대상으로 하는 HTTP 시나리오 7개. `ssh root@192.168.0.15`가 필요함. `__live_test__*` 콤보만 생성/삭제함. 실제 제공자를 호출함. CI에서는 절대 실행되지 않음)
- [ ] `npm run test:e2e` — 통과(UI 변경 사항)
- [ ] `npm run test:protocols:e2e` — 통과(MCP/A2A 변경 사항)
- [ ] `npm run test:ecosystem` — 통과

### 훅(Husky 검증 완료)

Husky 훅은 `.husky/`에 있으며 git 작업 시 자동으로 실행됩니다.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** 빠르고 결정론적인 게이트 — `npm run check:any-budget:t11 && npm run check:tracked-artifacts`(2026-06-13 활성화). 의도적으로 `test:unit`을 제외합니다(느리며 CI `test-unit` 작업에서 처리됨).
  - 릴리스 브랜치를 푸시하기 전에 `npm run test:unit`을 수동으로 실행합니다.

훅이 실패하면 근본 원인을 수정하고 `--no-verify`로 우회하지 마세요.

### Conventional Commits

릴리스에 포함되는 모든 커밋은 `type(scope): subject` 형식을 따라야 합니다.

**유효한 type:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**유효한 scope:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

호환성을 깨는 변경 사항: `BREAKING CHANGE:` 푸터를 추가하거나 scope 뒤에 `!`를 추가합니다(예: `feat(api)!: drop /v0`).

### 문서화

- [ ] `npm run check:docs-sync` 통과(커밋 전 자동 실행)
- [ ] `npm run check:docs-all` 통과(통합 검사: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync`가 종료 코드 0으로 종료 — 코드 ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` 환경 변수 계약이 온전함
- [ ] `npm run check:doc-links`가 종료 코드 0으로 종료 — 구조 개편 후 깨진 내부 마크다운 참조가 없음
- [ ] 스토리지/런타임 불일치 여부를 확인하기 위해 `docs/architecture/ARCHITECTURE.md` 검토
- [ ] 환경 변수 및 운영 관련 불일치 여부를 확인하기 위해 `docs/guides/TROUBLESHOOTING.md` 검토
- [ ] `.env.example`이 변경된 경우: `docs/reference/ENVIRONMENT.md` 업데이트
- [ ] 새 기능에 UI가 있는 경우: `docs/guides/USER_GUIDE.md`에 해당 기능 언급
- [ ] 새 기능에 API가 있는 경우: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` 업데이트
- [ ] 새 기능이 모듈인 경우: 전용 `docs/<MODULE>.md`가 존재함
- [ ] 호환성을 깨는 변경 사항인 경우: `docs/guides/TROUBLESHOOTING.md`에 마이그레이션 참고 사항 추가

### i18n

- [ ] `npm run i18n:check`가 종료 코드 0으로 종료 — 번역 상태(`.i18n-state.json`)가 원본 문서와 동기화됨(엄격 모드에서 변경된 원본이 없어야 함. 출시 직전 문서 수정에는 경고 모드 알림을 허용할 수 있지만, 태그 지정 전에는 0이어야 함)
- [ ] `npm run i18n:check-ui-coverage`가 종료 코드 0으로 종료 — 모든 UI 로케일이 80% 이상의 커버리지 기준을 충족함
- [ ] `npm run i18n:sync-ui:dry`가 42개 로케일 전체에서 누락된 키 0개를 보고함
- [ ] 영어 원본 문서가 변경된 경우, 태그 지정 전에 `npm run i18n:run` 실행(`.env`에 `OMNIROUTE_TRANSLATION_API_KEY` 필요)
- [ ] 경미한 번역 기여는 다음 릴리스로 연기 가능(CHANGELOG에 기록)

### 데이터베이스 마이그레이션

- [ ] `src/lib/db/migrations/`에 새 파일이 있는 경우:
  - [ ] 각 마이그레이션이 멱등성을 보장함(`CREATE TABLE IF NOT EXISTS` 등)
  - [ ] 마이그레이션이 트랜잭션으로 래핑됨
  - [ ] 번호가 올바르게 지정됨(시퀀스에 누락 없음)
- [ ] 새 설치 환경에서 테스트: `~/.omniroute/omniroute.db`를 삭제하고 `npm run dev` 실행
- [ ] 기존 설치 환경에서 테스트: DB를 백업하고 마이그레이션을 실행한 후 스키마 확인
- [ ] 마이그레이션이 테이블을 다시 작성하는 경우 WAL 파일(`-wal`, `-shm`)이 올바르게 처리됨

### 공급자 카탈로그(Zod 검증)

- [ ] `src/shared/constants/providers.ts`의 Zod 스키마가 로드 시 유효함
  - [ ] 모든 공급자에 필수 필드(`id`, `label`, `kind` 등)가 있음
  - [ ] 새 무료 공급자에 `freeNote`가 제공됨
  - [ ] OAuth 공급자의 `oauthConfig`가 `src/lib/oauth/constants/oauth.ts`에 등록됨
- [ ] 새 공급자가 추가된 경우: `open-sse/executors/`에 해당 실행기 추가
- [ ] OpenAI 형식이 아닌 경우: `open-sse/translator/`에 변환기 추가
- [ ] 모델이 `open-sse/config/providerRegistry.ts`에 등록됨
- [ ] `tests/unit/`의 단위 테스트가 공급자 분류 및 라우팅을 다룸

### 데스크톱(Electron)

`electron/`이 변경된 경우:

- [ ] `npm run electron:smoke:packaged` 통과
- [ ] `:win`, `:mac`, `:linux` 중 하나 이상에서 빌드 테스트
- [ ] 코드 서명 인증서가 만료되지 않음(서명하는 경우)
- [ ] `electron/package.json` 버전이 루트 `package.json`과 일치함
- [ ] `stable`로 릴리스하는 경우 자동 업데이트 채널 포인터 업데이트

### 빌드 레이아웃

저장소는 서로 다른 세 개의 출력 디렉터리를 사용합니다. 절대 혼동하지 마세요:

| 디렉터리  | 용도                                               | 추적 여부          |
| --------- | -------------------------------------------------- | ------------------ |
| `src/`    | 애플리케이션 소스(TypeScript / TSX)                | 예                 |
| `.build/` | 빌드 중간 산출물 — `next build` 출력(`distDir`)    | 아니요(gitignored) |
| `dist/`   | 배포 가능한 npm 번들 — `assembleStandalone`로 구성 | 아니요(gitignored) |

> **운영자 참고:** 원격 VPS 이미지 디렉터리는 계속 `/usr/lib/node_modules/omniroute/app/`입니다.
> **저장소 내부** 빌드 출력만 이동했습니다(`app/` → `dist/`). 배포 스킬은
> `dist/`의 내용을 원격 `app/` 디렉터리로 rsync하므로 VPS 경로를 변경할 필요가 없습니다.

**단일 빌드 흐름:**

```
npm run build:release
  └─ rm -rf .build dist          (정리)
  └─ next build → .build/next/   (중간 산출물)
  └─ assembleStandalone          (standalone + static + public + natives를 dist/로 복사)
  └─ dist/BUILD_SHA 작성         (HEAD 센티널)
```

배포를 위해 `npm run build`를 실행한 다음 별도로 `npm run build:cli`를 실행하지 마세요. 한 번의 명령으로 클린 재빌드와 센티널 생성을 수행하는
`npm run build:release`를 사용하세요.

### 아티팩트 검증

- [ ] `npm run build:release`가 성공하고 `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` 결과가 깨끗함 — `app.__qa_backup`, `scripts/scratch`, `package-lock.json` 또는 기타 로컬 잔여물이 없음
- [ ] 빌드 후 `dist/server.js`가 존재함

### 태그 지정 및 릴리스

- [ ] `/generate-release-cc` 실행(Claude Code 스킬):
  - `vX.Y.Z` 태그 생성
  - 태그와 브랜치 푸시
  - 변경 로그 본문으로 GitHub Release 생성
  - Electron 설치 프로그램 첨부(빌드된 경우)
- [ ] 또는 수동으로 실행:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### 배포

배포 스킬은 경량 rsync 흐름을 사용합니다. `npm pack`이나 `npm i -g`는 사용하지 않습니다:

- [ ] 대상과 일치하는 배포 스킬 사용:
  - `/deploy-vps-local-cc` — 로컬 VPS(192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS(69.164.221.35)
  - `/deploy-vps-both-cc` — 둘 다
- [ ] 배포하기 전에 `dist/BUILD_SHA` == `git rev-parse --short HEAD`인지 확인
- [ ] 실제 `node_modules`가 있는 위치에서 빌드를 실행해야 함(메인 체크아웃 또는 `npm ci`를 실행한 worktree — 심볼릭 링크된 worktree는 사용 금지)
- [ ] 배포된 인스턴스 스모크 테스트:
  - `/dashboard/health` 열기 → 버전 문자열이 릴리스와 일치하는지 확인
  - 정상 동작이 확인된 공급자를 대상으로 `/v1/chat/completions` 요청 실행
  - `/api/monitoring/health`가 `CLOSED` 회로 차단기를 반환하는지 확인
  - MCP 전송이 응답하는지 확인(`/mcp` HTTP, `/mcp-sse` SSE)

### 릴리스 후

- [ ] `/capture-release-evidences-cc` 실행(Claude Code 스킬)
  - 새로운 기능의 WebP 스크린샷/녹화 캡처
  - 릴리스 노트/블로그 게시물에 첨부
- [ ] 릴리스 공지로 GitHub Discussions / Discord 업데이트
- [ ] 다음 버전의 마일스톤 생성
- [ ] 중요 사항인 경우: 토론을 고정하거나 앱 내 배너를 위해 `news.json`에 게시

### Radar 공개 출시 게이트

Radar 공지는 의도적으로 `active: false` 상태로 커밋되어 있습니다. 아래의 모든 항목에 대한
증빙이 완료된 후 별도의 변경을 통해 활성화합니다.

- [ ] 스택된 모든 Radar PR이 병합되고 릴리스 팁 CI가 통과됨
- [ ] `RADAR_ENABLED`가 기본적으로 계속 비활성화된 상태에서 OSS Radar 경로를 배포하고 스모크 테스트
- [ ] 지정된 Radar 호스트에서 `GET /planos`, `/termos`, `/privacidade`, `/reembolso` 스모크 테스트
- [ ] 비공개 서비스에 운영자 신원/연락처/주소 및 소유자가 승인한 법률 검토 기록
- [ ] 테스트 모드에서만 Stripe Checkout 및 서명된 웹훅 테스트
- [ ] 승인된 발신자/도메인으로 암호화된 트랜잭션 이메일 전송 1회 테스트
- [ ] 백업 복원 및 감독하에 예산 한도가 설정된 리서치 실행 1회 검증
- [ ] 기부 증빙을 수락하기 전에 BRL/PIX 검토 정책 승인
- [ ] 앞선 게이트를 모두 통과한 후에만 공개 Checkout을 활성화한 다음, 새로운 `news.json` ID 활성화
- [ ] 홈 배너가 현지화된 문구를 사용하고, 이전 ID를 닫은 후 새 ID가 다시 표시되는지 확인

## 임베디드 서비스 스모크 테스트 (v3.8.4+)

임베디드 서비스 변경 사항이 포함된 릴리스를 배포하기 전에 다음을 확인하세요.

### 신규 DB 부팅 (마이그레이션 충돌 감지 — v3.8.4 핫픽스 이후 추가됨)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 부팅될 때까지 10초 대기
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'`가 `"9router"`를 반환함(404나 500이 아니어야 함). 마이그레이션 `071_services.sql`이 적용되고 행이 시드되었는지 확인.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"`가 3개 행을 반환함.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"`가 2개 행을 반환함(`070_webhooks_kind_metadata.sql`이 적용되었는지 검증).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts`가 통과함 — 향후 충돌 방지.

### 9Router

- [ ] `POST /api/services/9router/install`이 2분 이내에 `installedVersion`과 함께 200을 반환함
- [ ] `POST /api/services/9router/start`가 30초 이내에 200 및 `state: "running"`을 반환함
- [ ] `GET /api/services/9router/status`가 `health: "healthy"`를 보고함
- [ ] `"model": "9router/auto/..."`를 사용한 `POST /v1/chat/completions`가 200을 반환함(9Router를 통한 엔드투엔드 라우팅)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard`가 프록시 내부에 9Router 네이티브 UI를 렌더링함(`127.0.0.1:port` 직접 iframe을 사용하지 않음)
- [ ] `POST /api/services/9router/rotate-key`가 `{ keyRotated: true }`를 반환하고 서비스가 문제없이 재시작됨
- [ ] `POST /api/services/9router/stop`이 200 및 `state: "stopped"`를 반환함
- [ ] `GET /api/services/9router/logs?tail=50`이 최근 로그 줄을 포함하는 `snapshot` 이벤트가 있는 SSE 스트림을 반환함
- [ ] PATH에 `npm`이 없는 환경에서 설치하면 사용자 친화적인 오류 메시지(스택 트레이스가 아닌 메시지)와 함께 500을 반환함

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install`이 2분 이내에 200을 반환함
- [ ] `POST /api/services/cliproxy/start`가 30초 이내에 200 및 `state: "running"`을 반환함
- [ ] `GET /api/services/cliproxy/status`가 `health: "healthy"`를 보고함
- [ ] `POST /api/services/cliproxy/stop`이 200 및 `state: "stopped"`를 반환함
- [ ] `GET /api/services/cliproxy/logs?tail=50`이 SSE 스트림을 반환함

### 보안 회귀 테스트

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start`가 `403 LOCAL_ONLY`를 반환함
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start`가 `403 LOCAL_ONLY`를 반환함
- [ ] `/api/services/*`의 오류 응답에 `err.stack` 또는 절대 파일 경로가 포함되지 않음

## v3.8.0+ 확인 사항

v3.8.x 릴리스를 배포하기 전에 다음 추가 항목을 확인하세요.

- [ ] macOS에서 `omniroute --tray`가 부팅됨(`~/.omniroute/runtime/`에 systray2가 설치됨)
- [ ] Linux에서 `omniroute --tray`가 부팅됨(DISPLAY 필요, 설정되지 않은 경우 적절한 오류 표시)
- [ ] Windows에서 `omniroute --tray`가 부팅됨(PowerShell NotifyIcon 사용, 추가 바이너리 없음)
- [ ] `omniroute config tray enable`이 자동 시작 항목을 생성하고, disable이 해당 항목을 제거함
- [ ] `npm install -g omniroute@<this-version>`이 치명적 종료 없이 postinstall을 실행함
- [ ] 업데이트 경로가 선택적 의존성을 유지함: `omniroute update --apply` 및 자동 업데이터가
      `npm install -g … --include=optional`을 실행하여 `optionalDependencies`(better-sqlite3,
      keytar, tls-client 및 llmlingua SLM 스택: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`)가 업데이트 후에도 유지됨. ultra `modelPath` SLM 티어에는
      tinybert 모델도 필요하며, 최초 사용 시 `${DATA_DIR}/models/llmlingua`에 자동으로 다운로드됨. 그런 다음 postinstall
      (`scripts/build/colocateOptionals.mjs`)이 SLM 선택적 의존성 클로저를
      `dist/node_modules`에 함께 배치하여 워커가 단일 `@huggingface/transformers` ^4.2.0
      인스턴스를 해석하도록 함 — 독립형 트레이스는 동적으로 가져오는 선택적 의존성이 아닌 transformers만 번들링하므로,
      이 작업이 없으면 워커가 루트의 transformers를 기준으로 llmlingua-2를 로드하여
      SLM 티어가 조용히 페일 오픈됨.
- [ ] `.env`가 없어도 `omniroute status`가 작동함(CLI 토큰 경로, 루프백 전용)
- [ ] `curl http://localhost:20128/api/shutdown`이 401을 반환함(항상 보호되는 라우트)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse`가 401을 반환함(루프백 가드)
- [ ] 최초 실행 시 SQLite 런타임이 `bundled`로 해석됨(번들된 바이너리가 해당 플랫폼에서 유효함)
- [ ] `node_modules/better-sqlite3`가 삭제되면 SQLite 런타임이 `runtime`으로 폴백함
- [ ] Smart MCP 필터가 실제 `playwright-mcp browser_snapshot` 출력을 압축함(50% 이상 감소)
- [ ] `skills/omniroute*/SKILL.md` 파일 10개 모두 raw GitHub URL을 통해 공개적으로 가져올 수 있음
- [ ] 신규 설정 시 온보딩 마법사에 "작동 방식" 티어 둘러보기 단계가 표시됨
- [ ] 홈 대시보드 티어 커버리지 위젯에 구성됨/활성 상태의 개수가 표시됨

---

## 롤백

릴리스에 심각한 문제가 있는 경우:

1. `gh release edit vX.Y.Z --prerelease`(최신 릴리스가 아닌 것으로 표시)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z`(사용자가 아직 사용하지 않은 경우에만)
3. 또는: `release/vX.Y.0`에서 핫픽스 → 패치 릴리스 `vX.Y.(Z+1)`
4. GitHub Discussions와 Discord에 즉시 공지

## 필수 규칙

- 절대로 `main`에 직접 커밋하지 않기
- 절대로 `main` 또는 `release/*` 브랜치에 `git push --force`를 사용하지 않기
- 절대로 Husky 훅을 건너뛰지 않기(`--no-verify`)
- 절대로 비밀 정보, 자격 증명 또는 `.env` 파일을 커밋하지 않기
- 커버리지는 ≥60/60/60/60(구문/라인/함수/브랜치)을 유지해야 함
- `src/`, `open-sse/`, `electron/` 또는 `bin/`의 프로덕션 코드를 변경할 때는 항상 테스트를 추가하거나 업데이트하기

## 자동화된 동기화 검사

PR을 열기 전에 로컬에서 문서 동기화 검사를 실행하세요.

```bash
npm run check:docs-sync
```

CI에서도 `.github/workflows/ci.yml`의 lint 작업에서 이 검사를 실행합니다.
