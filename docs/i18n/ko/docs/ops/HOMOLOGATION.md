# Homologation Suite (`npm run homolog`) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

승인 VPS에서 실행 중인 OmniRoute 배포를 실제 환경에서 E2E 검증합니다
(`HOMOLOG_BASE_URL`, 예: `http://192.168.0.15:20128`). 하나의 명령으로 수동
릴리스 STOP #2 체크리스트를 자동화되고 증거를 생성하는 실행으로 대체합니다.

## 검증 범위

| 계층               | 검증 항목                                                                                                                                                                                 | 구현                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — 상태/일치성   | `/api/monitoring/health`가 `status: "healthy"` 및 예상 버전과 함께 `200`으로 응답하는지 검증                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — 임시 키      | 관리자 로그인 → `POST /api/keys`로 실행 범위가 지정된 API 키를 생성하고, 결과와 관계없이 `finally` 블록에서 폐기(`DELETE /api/keys/:id`)                                                  | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API 표면     | `/v1/models` 카탈로그, 실제 비스트리밍 채팅 완성(티어 핵심 모델, `max_tokens: 5`), 잘못된 키에 대한 `401`, 공개 `/api/monitoring/health`                                                  | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE 스트리밍 | 실제 스트리밍 채팅 완성. `text/event-stream`, 하나 이상의 콘텐츠 델타 및 `[DONE]` 종료 표시를 검증                                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — 실제 공급자   | 실시간 `/v1/models` 카탈로그에 있는 각 핵심 공급자당 최소 비용 채팅 요청을 하나씩 promptfoo를 통해 즉석에서 생성                                                                          | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI 인증      | 실제 로그인 양식을 통해 한 번 로그인하고 UI 계층 전체에서 세션(`storageState`)을 재사용                                                                                                   | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI 경로      | `src/app/(dashboard)/dashboard` 아래의 모든 정적 `page.tsx`를 파일 시스템에서 탐색하여, 동적 `[param]` 경로는 건너뛰고 HTTP 오류, 페이지 오류 또는 Next.js 오류 경계 없이 로드되는지 검증 | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI 핵심 흐름 | 대시보드 UI를 통해 API 키를 생성한 후 다시 폐기하여 VPS에 잔여 데이터를 남기지 않음                                                                                                       | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — 통합 보고서   | httpYac(`junit-to-ctrf` 경유), promptfoo→CTRF 어댑터 및 Playwright CTRF 리포터의 결과를 하나의 `homolog-ctrf.json`으로 병합하고, 사람이 읽을 수 있는 `homolog-report/summary.md`도 생성   | `scripts/homolog/run.mjs`                                                     |

재실행 자체에는 LLM이 전혀 관여하지 않습니다. 이는 평가가 아니라 결정론적 회귀 테스트 모음입니다.
AI는 향후 유지보수 작업에만 활용됩니다(아래 로드맵 참조).

## 사전 요구 사항

1. `.env.homolog.example`을 `.env.homolog`로 복사하고(gitignored — 절대 커밋하지 마세요) 다음 항목을 입력합니다.
   - `HOMOLOG_BASE_URL` — 대상 배포 주소입니다(예: `http://192.168.0.15:20128`).
   - `HOMOLOG_ADMIN_PASSWORD` — 해당 배포의 대시보드 관리 비밀번호입니다.
   - `HOMOLOG_CRITICAL_PROVIDERS` — 실제 스모크 채팅 요청을 전송할 공급자 접두사를 쉼표로 구분한 값입니다(예: `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — 일반 실행에서는 비워 두세요. 테스트 스위트가 자체 임시 키를 생성하고 폐기합니다. 단일 레이어를 격리하여 디버깅할 때만 설정하세요.
2. 저장소에서 `npm install`을 실행합니다(테스트 스위트의 종속성인 `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf`는 일반 devDependencies입니다).
3. 브라우저 바이너리가 아직 설치되어 있지 않다면 `npx playwright install`을 실행합니다.

## 실행 방법

```bash
npm run homolog
```

버전이 로컬 `package.json`과 일치하지 않는 배포(예: 아직 이전 패치 릴리스를 사용하는 검증 서버)를 대상으로 검증하려면 예상 버전을 명시적으로 재정의하세요.

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

어느 레이어든 실패하면 실행은 0이 아닌 종료 코드로 끝나며, 실패하더라도 생성한 임시 API 키의 폐기를 항상 시도합니다(`scripts/homolog/run.mjs`의 `finally` 블록).

## 보고서 읽기

모든 출력은 `homolog-report/`에 저장됩니다(gitignored).

- `summary.md` — stdout에 출력되는 것과 동일한 표로, 레이어별 한 행으로 구성됩니다(✅/❌ + 세부 정보).
- `homolog-ctrf.json` — 통합 CTRF 보고서(API/SSE, 공급자 스모크 및 UI 결과의 병합본)로, 릴리스 STOP #2 체크리스트에 첨부할 아티팩트입니다.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — 레이어별 원시/중간 보고서입니다.
- `promptfooconfig.yaml`, `provider-misses.json` — 현재 실행을 위해 생성된 promptfoo 설정과 실제 카탈로그에서 누락된 중요 공급자 목록입니다.

L0가 실패하면 즉시 중단됩니다(임시 키도 생성되지 않음). 버전/상태가 일치하지 않는다는 것은 이후의 모든 레이어가 잘못된 배포를 검증하게 된다는 의미이기 때문입니다.

## UI가 정상적으로 변경되었을 때 기준선 재설정

L4b(라우트 스모크)와 L4c(API 키 UI 흐름)는 스냅샷이 아닌 실제 DOM 로케이터를 기반으로 하므로, 정상적인 UI 변경 대부분은 테스트 스위트를 수정할 필요가 없습니다. 변경으로 인해 로케이터가 작동하지 않게 된 경우(예: 버튼 레이블 이름이 바뀌거나 설정 페이지가 이동한 경우):

1. 현재 소스를 기준으로 로케이터를 다시 확인합니다(스펙에는 각 로케이터를 확인한 파일/행이 이미 문서화되어 있으므로 같은 방식을 따르고 추측하지 마세요).
2. `tests/homolog/ui/`의 스펙을 업데이트합니다.
3. VPS를 대상으로 `npm run homolog`(또는 영향을 받은 Playwright 스펙만)를 다시 실행하여 수정 사항을 확인한 후 커밋합니다.

이 테스트 스위트에는 시각적/픽셀 기준선이 없습니다(F1). 이에 대해서는 로드맵을 참조하세요.

## 로드맵(F2 / F3)

설계 및 단계적 출시 계획은 내부 기획 스펙인 `_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md`에 있습니다(링크 없음 — 내부 `_tasks/` 아티팩트이며 이 저장소에서 추적하는 문서에 포함되지 않음). 요약:

- **F2** — 전체 워크스루 녹화 → Playwright Test Agents(`planner`/`generator`)가 이를 흐름 스펙(콤보 생성, 공급자 테스트, 설정 편집, MCP 도구)으로 변환 + 동적 데이터(메트릭, 타임스탬프, 로그)에 마스크를 적용한 시각적 회귀 기준선(Lost Pixel) + 릴리스별 `healer` 유지 관리 루틴.
- **F3** — 복원력/계약/연동 검증: devbox의 toxiproxy + 가짜 OpenAI 호환 공급자, 이를 가리키는 VPS의 `homolog-resilience` 콤보(타임아웃 주입 → 대체 처리 및 `/api/monitoring/health`를 통한 회로 차단기 열림/닫힘 검증), `docs/openapi.yaml`을 대상으로 하는 조건부 Schemathesis 계약 테스트(낮은 `--max-examples`, 고정 시드, 비 LLM 엔드포인트만), 그리고 `npm run homolog` 및 해당 `summary.md`를 `/generate-release` STOP #2 단계에 연동.
