# CLAUDE.md (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle prosjektregler finnes i [`AGENTS.md`](AGENTS.md)** — den eneste autoritative kilden for alle
AI-assistenter (arkitektur, konvensjoner, testing, kvalitetsporter, git-arbeidsflyt, de 23 harde reglene,
lærdom om PII). Les hele filen; ikke legg til prosjektreglene her på nytt. Alt nedenfor gjelder KUN
for Claude Code — operasjonelle presiseringer av regler som allerede er definert i `AGENTS.md`.

## Worktree-isolasjon — spesifikt for Claude Code

Den fullstendige obligatoriske worktree-protokollen (bekreftelse av basisgren, `.claude/worktrees/` som kanonisk
sti, `cp -al` for node_modules, regler for opprydding) finnes i `AGENTS.md` → Git-arbeidsflyt → «Worktree-
isolasjon». Punkter som er spesifikke for Claude Code:

- Bekreft basisgrenen med operatøren via `AskUserQuestion` (hard regel nr. 19), med mindre de
  allerede har oppgitt den.
- Foretrekk det innebygde `EnterWorktree`-verktøyet — det oppretter allerede worktrees under
  `.claude/worktrees/` (den kanoniske stien). Opprett worktree-et med den dokumenterte `git
worktree add`-kommandoen, og kall deretter `EnterWorktree` med dets `path`.

## Sikkerhet på tvers av økter — spesifikt for Claude Code

Harde regler nr. 19/21/22 (i `AGENTS.md`) regulerer parallelle økter. Operasjonelle påminnelser for dette
kjøremiljøet:

- **Gjengi forbudet mot `git stash` ordrett i ledeteksten til hver underagent som berører git**
  (Agent-verktøy / arbeidsflytskript) — underagenter arver ikke denne filen, og den registrerte
  gjentakelsen av stash-hendelsen skjedde via en underagent.
- Før du fletter eller pusher til en PR du ikke opprettet _i denne økten_, kjør `git worktree list`
  og kontroller `gh pr view <N> --json state,headRefOid` på nytt (hard regel nr. 22b).
- Avslutt hver økt med hovedutsjekkingen på grenen den startet på.

## Superpowers-/planleggingsartefakter — overstyring av stier

Konvensjonen for `_tasks/` er definert i `AGENTS.md` → «Planleggings- og forskningsartefakter».
Superpowers-ferdighetene leveres med standardverdier som peker til `docs/…` — disse standardverdiene er **overstyrt
her**. Når en Superpowers-ferdighet oppgir en sti som «lagret i `docs/superpowers/plans/…`»,
skal den skrives om til tilsvarende sti under `_tasks/…` før lagring:

| Artefakt (ferdighet)                       | Standard (skal IKKE brukes) | Lagre her i stedet                                            |
| ------------------------------------------ | --------------------------- | ------------------------------------------------------------- |
| Planer (`writing-plans`)                   | `docs/superpowers/plans/`   | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spesifikasjoner / design (`brainstorming`) | `docs/superpowers/specs/`   | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Forskning (`deep-research`, ad hoc)        | `docs/research/`            | `_tasks/research/…`                                           |
| Overleveringer (`/handoff`)                | —                           | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit disse artefaktene i `_tasks/`-repoet (`git -C _tasks …`), aldri i hovedrepoet.

## Kladdfiler / midlertidige filer — bruk `_artifacts/`, ikke `/tmp`

Dette prosjektet overstyrer kjøremiljøets standardområde for midlertidige øktfiler (`/tmp/claude-*/…`). Skriv
midlertidige filer og arbeidsfiler — eksporter, genererte zip-filer, midlertidige mellomresultater, alt du
ellers ville lagt i `/tmp` — til `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` i stedet.

- `_artifacts/` er en `_*`-sti i roten: den er allerede ignorert av git (`AGENTS.md` → «`_*`-stier i roten»), finnes
  kun på disken og spores aldri.
- Begrunnelse: Når midlertidige resultater oppbevares i prosjektet (i stedet for `/tmp`), er det enkelt for operatøren
  å finne og slette alt midlertidig på ett sted, i stedet for å lete gjennom flyktige,
  øktsspesifikke `/tmp`-kataloger som forsvinner eller samler opp usporede filer.
- Ikke forveksle dette med `_tasks/` (hard regel nr. 23, dets eget private git-repo for varige
  planer/spesifikasjoner/forskning/overleveringer) — `_artifacts/` er kun for midlertidige arbeidsfiler; ingenting
  her trenger å bevares eller versjoneres.

## Grønn basis før åpning av PR-er

Før du oppretter en gren eller åpner en PR, kjør kontrollen for grønn basis (`AGENTS.md` → Git-arbeidsflyt →
«Kontroll av grønn basis»; prosjektferdighetene refererer til den som `.agents/skills/_shared/base-green.md`). En PR
som åpnes mens spissen av basisgrenen er rød, må inneholde `⚠️ base-red inherited: #<issue>` i beskrivelsen. For å
rydde opp i en oppsamlet rød tilstand (spissen av basisgrenen + røde PR-er), bruk ferdigheten `/sweep-reds`.
