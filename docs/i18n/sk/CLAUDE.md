# CLAUDE.md (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Všetky pravidlá projektu sa nachádzajú v súbore [`AGENTS.md`](AGENTS.md)** — jedinom zdroji pravdy pre každého AI
asistenta (architektúra, konvencie, testovanie, kontroly kvality, pracovný postup git, 23 pevných pravidiel,
poznatky o PII). Prečítajte si ho celý; pravidlá projektu sem znova nepridávajte. Všetko uvedené nižšie sa vzťahuje IBA
na Claude Code — ide o prevádzkové spresnenia pravidiel, ktoré sú už definované v súbore `AGENTS.md`.

## Izolácia worktree — špecifiká Claude Code

Úplný povinný protokol worktree (potvrdenie základnej vetvy, kanonická cesta `.claude/worktrees/`,
`cp -al` node_modules, pravidlá odstránenia) sa nachádza v `AGENTS.md` → Pracovný postup Git → „Izolácia
worktree“. Body špecifické pre Claude Code:

- Potvrďte základnú vetvu s operátorom prostredníctvom `AskUserQuestion` (Pevné pravidlo č. 19), pokiaľ vám ju
  už neuviedol.
- Uprednostnite natívny nástroj `EnterWorktree` — worktree už vytvára v
  `.claude/worktrees/` (kanonickej ceste). Vytvorte worktree pomocou zdokumentovaného príkazu `git
worktree add` a potom zavolajte `EnterWorktree` s jeho `path`.

## Bezpečnosť naprieč reláciami — špecifiká Claude Code

Paralelné relácie sa riadia pevnými pravidlami č. 19/21/22 (v `AGENTS.md`). Prevádzkové pripomienky pre tento
harness:

- **Zákaz `git stash` doslovne zopakujte v prompte každého subagenta, ktorý pracuje s gitom**
  (nástroj Agent / skripty pracovného postupu) — subagenti tento súbor nededia a zaznamenané
  opakovanie incidentu so stashom vzniklo prostredníctvom subagenta.
- Pred zlúčením alebo pushnutím do ktoréhokoľvek PR, ktorý ste nevytvorili _v tejto relácii_, spustite `git worktree list`
  a znova skontrolujte `gh pr view <N> --json state,headRefOid` (Pevné pravidlo č. 22b).
- Každú reláciu ukončite s hlavným checkoutom na vetve, na ktorej sa začala.

## Superpowers / artefakty plánovania — prepísanie ciest

Konvencia `_tasks/` je definovaná v `AGENTS.md` → „Artefakty plánovania a výskumu“. Zručnosti
superpowers sa dodávajú s predvolenými nastaveniami smerujúcimi na `docs/…` — tieto predvolené nastavenia sú **prepísané
tu**. Keď zručnosť superpowers oznámi cestu ako „uložené do `docs/superpowers/plans/…`“,
pred zápisom ju prepíšte na ekvivalent v `_tasks/…`:

| Artefakt (zručnosť)                    | Predvolené (NEPOUŽÍVAŤ)   | Namiesto toho uložiť sem                                      |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Plány (`writing-plans`)                | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Špecifikácie / návrh (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Výskum (`deep-research`, ad hoc)       | `docs/research/`          | `_tasks/research/…`                                           |
| Odovzdania (`/handoff`)                | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Tieto artefakty commitujte v rámci repozitára `_tasks/` (`git -C _tasks …`), nikdy nie v hlavnom repozitári.

## Pomocné / dočasné súbory — používajte `_artifacts/`, nie `/tmp`

Tento projekt prepisuje predvolený pomocný priestor relácie harnessu (`/tmp/claude-*/…`). Dočasné/pracovné
súbory — exporty, vygenerované zipy, jednorazové priebežné výstupy, čokoľvek, čo by ste inak
uložili do `/tmp` — zapisujte namiesto toho do `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` je koreňová cesta `_*`: už je ignorovaná gitom (`AGENTS.md` → „Koreňové cesty `_*`“), nachádza sa
  iba na disku a nikdy sa nesleduje.
- Dôvod: uchovávanie pomocných výstupov v projekte (namiesto `/tmp`) umožňuje operátorovi
  jednoducho nájsť a odstrániť všetky dočasné súbory na jednom mieste namiesto ich hľadania v efemérnych
  adresároch `/tmp` špecifických pre jednotlivé relácie, ktoré miznú alebo sa v nich hromadia nesledované súbory.
- Nezamieňajte si to s `_tasks/` (Pevné pravidlo č. 23, samostatný súkromný git repozitár pre trvalé
  plány/špecifikácie/výskum/odovzdania) — `_artifacts/` je určený iba na jednorazové pracovné súbory; nič
  z tohto priečinka nemusí prežiť ani byť verzované.

## Zelený základ pred otvorením PR

Pred vytvorením vetvy alebo otvorením PR spustite kontrolu zeleného základu (`AGENTS.md` → Pracovný postup Git →
„Kontrola zeleného základu“; projektové zručnosti na ňu odkazujú ako na `.agents/skills/_shared/base-green.md`). PR
otvorený v čase, keď je špička základu červená, musí vo svojom tele obsahovať `⚠️ base-red inherited: #<issue>`. Na
odstránenie nahromadeného červeného stavu (špička základu + červené PR) použite zručnosť `/sweep-reds`.
