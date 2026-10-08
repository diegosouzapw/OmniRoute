# CLAUDE.md (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Všechna pravidla projektu jsou uvedena v souboru [`AGENTS.md`](AGENTS.md)** — jediném zdroji pravdy pro každého AI
asistenta (architektura, konvence, testování, kontroly kvality, pracovní postup gitu, 23 tvrdých pravidel,
poznatky o PII). Přečtěte si jej celý; pravidla projektu sem znovu nepřidávejte. Vše níže se vztahuje POUZE
na Claude Code — jde o provozní upřesnění pravidel již definovaných v souboru `AGENTS.md`.

## Izolace worktree — specifika Claude Code

Úplný povinný protokol pro worktree (potvrzení základní větve, kanonická cesta
`.claude/worktrees/`, `cp -al` pro node_modules, pravidla odstranění) je uveden v `AGENTS.md` → Git Workflow → „Worktree
isolation“. Body specifické pro Claude Code:

- Potvrďte základní větev s operátorem prostřednictvím `AskUserQuestion` (tvrdé pravidlo č. 19), pokud vám ji
  již nesdělil.
- Upřednostněte nativní nástroj `EnterWorktree` — worktree již vytváří v adresáři
  `.claude/worktrees/` (kanonická cesta). Vytvořte worktree pomocí zdokumentovaného příkazu `git
worktree add` a poté zavolejte `EnterWorktree` s jeho `path`.

## Bezpečnost napříč relacemi — specifika Claude Code

Souběžné relace se řídí tvrdými pravidly č. 19/21/22 (v `AGENTS.md`). Provozní připomínky pro toto
prostředí:

- **Zákaz `git stash` doslovně zopakujte v promptu každého subagenta, který pracuje s gitem**
  (nástroj Agent / skripty Workflow) — subagenti tento soubor nedědí a zaznamenaný
  opakovaný incident se stash nastal právě prostřednictvím subagenta.
- Před sloučením nebo odesláním změn do jakéhokoli PR, které jste nevytvořili _v této relaci_, spusťte `git worktree list`
  a znovu zkontrolujte `gh pr view <N> --json state,headRefOid` (tvrdé pravidlo č. 22b).
- Každou relaci ukončete s hlavním checkoutem na větvi, na které začala.

## Superpowers / plánovací artefakty — přepsání cest

Konvence `_tasks/` je definována v `AGENTS.md` → „Planning & Research Artifacts“. Dovednosti
superpowers jsou dodávány s výchozími hodnotami odkazujícími na `docs/…` — tyto výchozí hodnoty jsou **zde
přepsány**. Když dovednost superpowers oznámí cestu, například „uloženo do `docs/superpowers/plans/…`“,
před zápisem ji změňte na odpovídající cestu v `_tasks/…`:

| Artefakt (dovednost)                  | Výchozí umístění (NEPOUŽÍVAT) | Místo toho uložit sem                                         |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Plány (`writing-plans`)               | `docs/superpowers/plans/`     | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikace / návrh (`brainstorming`) | `docs/superpowers/specs/`     | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Výzkum (`deep-research`, ad-hoc)      | `docs/research/`              | `_tasks/research/…`                                           |
| Předání (`/handoff`)                  | —                             | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Tyto artefakty commitujte uvnitř repozitáře `_tasks/` (`git -C _tasks …`), nikdy v hlavním repozitáři.

## Pracovní / dočasné soubory — používejte `_artifacts/`, nikoli `/tmp`

Tento projekt přepisuje výchozí dočasné úložiště relace tohoto prostředí (`/tmp/claude-*/…`). Zapisujte
dočasné/pracovní soubory — exporty, generované zipy, jednorázové mezivýstupy a cokoli, co byste
jinak umístili do `/tmp` — namísto toho do `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` je kořenová cesta `_*`: git ji již ignoruje (`AGENTS.md` → „Root `_*` paths“), existuje
  pouze na disku a nikdy se nesleduje.
- Důvod: uchovávání pracovních výstupů uvnitř projektu (namísto `/tmp`) operátorovi výrazně usnadňuje
  vyhledání a odstranění všech dočasných souborů na jednom místě, místo jejich hledání v dočasných
  adresářích `/tmp` specifických pro jednotlivé relace, které mizí nebo se hromadí bez sledování.
- **Nezaměňujte** jej s `_tasks/` (tvrdé pravidlo č. 23, vlastní soukromý gitový repozitář pro trvalé
  plány/specifikace/výzkum/předání) — `_artifacts/` slouží pouze pro jednorázové pracovní soubory; nic
  zde nemusí přetrvat ani být verzováno.

## Zelený základ před otevřením PR

Před vytvořením větve nebo otevřením PR spusťte kontrolu zeleného základu (`AGENTS.md` → Git Workflow →
„Base-green check“; dovednosti projektu na ni odkazují jako na `.agents/skills/_shared/base-green.md`). PR
otevřené v době, kdy je špička základní větve červená, musí ve svém těle obsahovat `⚠️ base-red inherited: #<issue>`. K
odstranění nahromaděného červeného stavu (špička základní větve + červená PR) použijte dovednost `/sweep-reds`.
