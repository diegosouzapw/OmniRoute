# CLAUDE.md (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle projektregler findes i [`AGENTS.md`](AGENTS.md)** — den eneste autoritative kilde for alle AI-
assistenter (arkitektur, konventioner, test, kvalitetskontroller, git-arbejdsgang, de 23 hårde regler,
erfaringer om PII). Læs den i sin helhed; tilføj ikke projektregler her igen. Alt nedenfor gælder KUN
for Claude Code — operationelle præciseringer af regler, der allerede er defineret i `AGENTS.md`.

## Worktree-isolation — specifikt for Claude Code

Den fulde obligatoriske worktree-protokol (bekræftelse af basisgren, `.claude/worktrees/` som kanonisk
sti, `cp -al` node_modules, regler for oprydning) findes i `AGENTS.md` → Git-arbejdsgang → "Worktree-
isolation". Punkter, der er specifikke for Claude Code:

- Bekræft basisgrenen med operatøren via `AskUserQuestion` (hård regel #19), medmindre vedkommende
  allerede har oplyst den.
- Foretræk det indbyggede `EnterWorktree`-værktøj — det opretter allerede worktrees under
  `.claude/worktrees/` (den kanoniske sti). Opret worktreet med den dokumenterede `git
worktree add`-kommando, og kald derefter `EnterWorktree` med dets `path`.

## Sikkerhed på tværs af sessioner — specifikt for Claude Code

De hårde regler #19/#21/#22 (i `AGENTS.md`) styrer parallelle sessioner. Operationelle påmindelser til
dette miljø:

- **Gentag forbuddet mod `git stash` ordret i prompten til enhver underagent, der arbejder med git**
  (Agent-værktøj/workflow-scripts) — underagenter arver ikke denne fil, og den registrerede
  gentagelse af stash-hændelsen skete via en underagent.
- Før du merger eller pusher til en PR, som du ikke oprettede _i denne session_, skal du køre `git worktree list`
  og kontrollere `gh pr view <N> --json state,headRefOid` igen (hård regel #22b).
- Afslut hver session med hoved-checkoutet på den gren, det startede på.

## Superpowers-/planlægningsartefakter — stitilsidesættelser

Konventionen `_tasks/` er defineret i `AGENTS.md` → "Planlægnings- og researchartefakter".
Superpowers-færdighederne leveres med standarder, der peger på `docs/…` — disse standarder er **tilsidesat
her**. Når en Superpowers-færdighed angiver en sti såsom "gemt i `docs/superpowers/plans/…`",
skal den omskrives til den tilsvarende `_tasks/…`-sti, før der skrives:

| Artefakt (færdighed)                     | Standard (brug IKKE)      | Gem her i stedet                                              |
| ---------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Planer (`writing-plans`)                 | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikationer/design (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Research (`deep-research`, ad hoc)       | `docs/research/`          | `_tasks/research/…`                                           |
| Overdragelser (`/handoff`)               | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit disse artefakter i `_tasks/`-repoet (`git -C _tasks …`), aldrig i hovedrepoet.

## Kladde-/midlertidige filer — brug `_artifacts/`, ikke `/tmp`

Dette projekt tilsidesætter miljøets standardkladdeområde for sessioner (`/tmp/claude-*/…`). Skriv
midlertidige/arbejdsfiler — eksporter, genererede zip-filer, midlertidige engangsresultater og alt,
hvad du ellers ville placere i `/tmp` — til `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` i stedet.

- `_artifacts/` er en `_*`-sti i roden: Den er allerede ignoreret af git (`AGENTS.md` → "`_*`-stier i roden"),
  findes kun på disken og spores aldrig.
- Årsag: Når kladderesultater opbevares i projektet (frem for `/tmp`), er det nemt for operatøren
  at finde og slette alt midlertidigt ét sted i stedet for at lede i flygtige,
  sessionsspecifikke `/tmp`-mapper, som forsvinder eller ophober usporede filer.
- Forveksl **ikke** dette med `_tasks/` (hård regel #23, dets eget private git-repo til permanente
  planer/specifikationer/research/overdragelser) — `_artifacts/` er kun til midlertidige arbejdsfiler;
  intet her behøver at overleve eller blive versionsstyret.

## Grøn basis før åbning af PR'er

Før du opretter en gren eller åbner en PR, skal du køre kontrollen af, at basis er grøn (`AGENTS.md` → Git-arbejdsgang →
"Kontrol af grøn basis"; projektfærdigheder henviser til den som `.agents/skills/_shared/base-green.md`). En PR,
der åbnes, mens spidsen af basisgrenen er rød, skal indeholde `⚠️ base-red inherited: #<issue>` i sin brødtekst. Brug
færdigheden `/sweep-reds` til at afvikle en ophobet rød tilstand (spidsen af basisgrenen + røde PR'er).
