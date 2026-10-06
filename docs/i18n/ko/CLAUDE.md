# CLAUDE.md (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**모든 프로젝트 규칙은 [`AGENTS.md`](AGENTS.md)에 있습니다** — 모든 AI 어시스턴트가 따라야 할 아키텍처, 규칙, 테스트, 품질 게이트, git 워크플로, 23개의 필수 규칙, PII 관련 교훈을 담은 단일 진실 공급원입니다. 전체 내용을 읽으십시오. 프로젝트 규칙을 여기에 다시 추가하지 마십시오. 아래의 모든 내용은 Claude Code에만 적용되며, `AGENTS.md`에 이미 정의된 규칙을 운영 측면에서 보완합니다.

## Worktree 격리 — Claude Code 관련 사항

필수 worktree 프로토콜 전체(기준 브랜치 확인, `.claude/worktrees/` 표준 경로, `cp -al` node_modules, 정리 규칙)는 `AGENTS.md` → Git Workflow → "Worktree isolation"에 있습니다. Claude Code 관련 사항:

- 운영자가 기준 브랜치를 이미 알려주지 않았다면 `AskUserQuestion`을 통해 확인하십시오(필수 규칙 #19).
- 네이티브 `EnterWorktree` 도구를 우선 사용하십시오. 이 도구는 이미 표준 경로인 `.claude/worktrees/` 아래에 worktree를 생성합니다. 문서에 명시된 `git
worktree add` 명령으로 worktree를 생성한 다음 해당 `path`를 사용하여 `EnterWorktree`를 호출하십시오.

## 세션 간 안전성 — Claude Code 관련 사항

필수 규칙 #19/#21/#22(`AGENTS.md`에 있음)는 병렬 세션에 적용됩니다. 이 하네스에 대한 운영상 주의 사항:

- **git을 다루는 모든 하위 에이전트의 프롬프트에 `git stash` 금지 사항을 그대로 반복해서 명시하십시오**
  (Agent 도구 / Workflow 스크립트). 하위 에이전트는 이 파일을 상속하지 않으며, 기록된 stash 사고의 재발은 하위 에이전트를 통해 발생했습니다.
- _현재 세션에서 생성하지 않은_ PR을 병합하거나 해당 PR에 푸시하기 전에 `git worktree list`를 실행하고 `gh pr view <N> --json state,headRefOid`를 다시 확인하십시오(필수 규칙 #22b).
- 모든 세션이 끝날 때 메인 checkout이 세션 시작 당시의 브랜치에 있도록 하십시오.

## Superpowers / 계획 아티팩트 — 경로 재정의

`_tasks/` 규칙은 `AGENTS.md` → "Planning & Research Artifacts"에 정의되어 있습니다. superpowers 스킬의 기본값은 `docs/…`를 가리키지만, 해당 기본값은 **여기에서 재정의됩니다**. superpowers 스킬이 "saved to `docs/superpowers/plans/…`"와 같은 경로를 알리면 파일을 쓰기 전에 해당 경로를 이에 대응하는 `_tasks/…` 경로로 변경하십시오.

| 아티팩트(스킬)                | 기본값(사용 금지)         | 대신 저장할 위치                                              |
| ----------------------------- | ------------------------- | ------------------------------------------------------------- |
| 계획 (`writing-plans`)        | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| 사양 / 설계 (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| 연구 (`deep-research`, 임시)  | `docs/research/`          | `_tasks/research/…`                                           |
| 인계 (`/handoff`)             | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

이러한 아티팩트는 메인 저장소가 아닌 `_tasks/` 저장소 내부에서 커밋하십시오(`git -C _tasks …`).

## 스크래치 / 임시 파일 — `/tmp`가 아닌 `_artifacts/` 사용

이 프로젝트는 하네스의 기본 세션 스크래치패드(`/tmp/claude-*/…`)를 재정의합니다. 임시 파일이나 작업 파일(내보내기 결과, 생성된 zip, 일회성 중간 출력, 그 밖에 일반적으로 `/tmp`에 둘 모든 파일)은 대신 `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`에 작성하십시오.

- `_artifacts/`는 루트의 `_*` 경로로, 이미 gitignore 처리되어 있으며(`AGENTS.md` → "Root `_*` paths") 디스크에만 존재하고 추적되지 않습니다.
- 이유: 스크래치 출력을 `/tmp`가 아닌 프로젝트 내부에 보관하면 운영자가 임시 항목을 한곳에서 쉽게 찾아 모두 삭제할 수 있습니다. 세션별로 생성되어 사라지거나 추적되지 않은 채 누적되는 `/tmp` 디렉터리를 일일이 찾을 필요가 없습니다.
- 이를 `_tasks/`와 **혼동하지 마십시오**(필수 규칙 #23, 지속적으로 보관할 계획/사양/연구/인계 자료를 위한 별도의 비공개 git 저장소). `_artifacts/`는 폐기 가능한 작업 파일 전용이며, 여기에 있는 어떤 것도 보존하거나 버전 관리할 필요가 없습니다.

## PR을 열기 전 기준 브랜치 green 상태 확인

브랜치를 생성하거나 PR을 열기 전에 base-green 검사를 실행하십시오(`AGENTS.md` → Git Workflow → "Base-green check", 프로젝트 스킬에서는 `.agents/skills/_shared/base-green.md`로 참조). 기준 브랜치의 최신 tip이 red인 상태에서 연 PR의 본문에는 `⚠️ base-red inherited: #<issue>`를 반드시 포함해야 합니다. 누적된 red 상태(기준 브랜치 tip + red PR)를 해소하려면 `/sweep-reds` 스킬을 사용하십시오.
