# CLAUDE.md (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Wszystkie reguły projektu znajdują się w [`AGENTS.md`](AGENTS.md)** — jedynym źródle prawdy dla każdego asystenta
AI (architektura, konwencje, testowanie, bramki jakości, przepływ pracy z git, 23 Twarde Reguły,
wnioski dotyczące PII). Przeczytaj go w całości; nie dodawaj tutaj ponownie reguł projektu. Wszystko poniżej dotyczy WYŁĄCZNIE
Claude Code — są to operacyjne doprecyzowania reguł już zdefiniowanych w `AGENTS.md`.

## Izolacja worktree — szczegóły dotyczące Claude Code

Pełny obowiązkowy protokół worktree (potwierdzenie gałęzi bazowej, kanoniczna ścieżka
`.claude/worktrees/`, `cp -al` dla node_modules, reguły usuwania) znajduje się w `AGENTS.md` → Git Workflow → „Worktree
isolation”. Punkty specyficzne dla Claude Code:

- Potwierdź gałąź bazową z operatorem za pomocą `AskUserQuestion` (Twarda Reguła #19), chyba że
  została już przez niego podana.
- Preferuj natywne narzędzie `EnterWorktree` — tworzy ono worktree w
  `.claude/worktrees/` (ścieżce kanonicznej). Utwórz worktree udokumentowanym poleceniem `git
worktree add`, a następnie wywołaj `EnterWorktree`, przekazując jego `path`.

## Bezpieczeństwo między sesjami — szczegóły dotyczące Claude Code

Twarde Reguły #19/#21/#22 (w `AGENTS.md`) regulują sesje równoległe. Przypomnienia operacyjne dla tego
środowiska:

- **Powiel dosłownie zakaz używania `git stash` w prompcie każdego subagenta, który korzysta z git**
  (narzędzie Agent / skrypty przepływu pracy) — subagenci nie dziedziczą tego pliku, a odnotowane
  ponowne wystąpienie incydentu ze stash nastąpiło za pośrednictwem subagenta.
- Przed scaleniem lub wypchnięciem zmian do dowolnego PR, którego nie utworzono _w tej sesji_, uruchom `git worktree list`
  i ponownie sprawdź `gh pr view <N> --json state,headRefOid` (Twarda Reguła #22b).
- Zakończ każdą sesję z głównym checkoutem na gałęzi, na której się rozpoczęła.

## Superpowers / artefakty planowania — nadpisania ścieżek

Konwencję `_tasks/` zdefiniowano w `AGENTS.md` → „Planning & Research Artifacts”. Umiejętności
superpowers są dostarczane z domyślnymi ustawieniami wskazującymi na `docs/…` — te ustawienia domyślne są tutaj **nadpisane**.
Gdy umiejętność superpowers wskaże ścieżkę w rodzaju „zapisano w `docs/superpowers/plans/…`”,
przed zapisem zamień ją na odpowiednik w `_tasks/…`:

| Artefakt (umiejętność)                   | Domyślna lokalizacja (NIE używać) | Zapisuj zamiast tego tutaj                                    |
| ---------------------------------------- | --------------------------------- | ------------------------------------------------------------- |
| Plany (`writing-plans`)                  | `docs/superpowers/plans/`         | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specyfikacje / projekt (`brainstorming`) | `docs/superpowers/specs/`         | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Badania (`deep-research`, ad-hoc)        | `docs/research/`                  | `_tasks/research/…`                                           |
| Przekazania (`/handoff`)                 | —                                 | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commituj te artefakty wewnątrz repozytorium `_tasks/` (`git -C _tasks …`), nigdy w głównym repozytorium.

## Pliki robocze / tymczasowe — używaj `_artifacts/`, a nie `/tmp`

Ten projekt nadpisuje domyślny notatnik roboczy sesji tego środowiska (`/tmp/claude-*/…`). Zapisuj
pliki tymczasowe/robocze — eksporty, wygenerowane archiwa zip, jednorazowe wyniki pośrednie i wszystko, co
w przeciwnym razie trafiłoby do `/tmp` — w `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` jest ścieżką główną `_*`: jest już ignorowana przez git (`AGENTS.md` → „Root `_*` paths”), istnieje
  wyłącznie na dysku i nigdy nie jest śledzona.
- Powód: przechowywanie wyników roboczych wewnątrz projektu (zamiast w `/tmp`) pozwala operatorowi
  łatwo znaleźć i usunąć wszystkie pliki tymczasowe w jednym miejscu, zamiast szukać w efemerycznych,
  specyficznych dla sesji katalogach `/tmp`, które znikają lub gromadzą nieśledzone pliki.
- **Nie** myl tego z `_tasks/` (Twarda Reguła #23, osobne prywatne repozytorium git na trwałe
  plany/specyfikacje/badania/przekazania) — `_artifacts/` służy wyłącznie do jednorazowych plików roboczych; nic
  tutaj nie musi przetrwać ani podlegać wersjonowaniu.

## Zielona baza przed otwieraniem PR

Przed utworzeniem gałęzi lub otwarciem PR uruchom kontrolę zielonej bazy (`AGENTS.md` → Git Workflow →
„Base-green check”; umiejętności projektu odwołują się do niej jako `.agents/skills/_shared/base-green.md`). PR
otwarty, gdy końcówka bazy jest czerwona, musi zawierać w treści `⚠️ base-red inherited: #<issue>`. Aby
usunąć nagromadzony czerwony stan (końcówka bazy + czerwone PR), użyj umiejętności `/sweep-reds`.
