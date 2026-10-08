# CLAUDE.md (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle projectregels staan in [`AGENTS.md`](AGENTS.md)** — de enige gezaghebbende bron voor elke AI-
assistent (architectuur, conventies, tests, kwaliteitscontroles, git-workflow, de 23 Harde Regels,
PII-lessen). Lees het bestand volledig; voeg hier geen projectregels opnieuw toe. Alles hieronder is ALLEEN
van toepassing op Claude Code — operationele verfijningen van regels die al in `AGENTS.md` zijn vastgelegd.

## Worktree-isolatie — specifieke aandachtspunten voor Claude Code

Het volledige verplichte worktree-protocol (bevestiging van de basisbranch, het canonieke pad
`.claude/worktrees/`, `cp -al` voor node_modules, opruimregels) staat in `AGENTS.md` → Git Workflow → "Worktree
isolation". Specifieke aandachtspunten voor Claude Code:

- Bevestig de basisbranch met de operator via `AskUserQuestion` (Harde Regel #19), tenzij die
  dit al heeft aangegeven.
- Geef de voorkeur aan de ingebouwde tool `EnterWorktree` — deze maakt worktrees al aan onder
  `.claude/worktrees/` (het canonieke pad). Maak de worktree aan met het gedocumenteerde `git
worktree add`-commando en roep vervolgens `EnterWorktree` aan met het bijbehorende `path`.

## Veiligheid tussen sessies — specifieke aandachtspunten voor Claude Code

Harde Regels #19/#21/#22 (in `AGENTS.md`) zijn van toepassing op parallelle sessies. Operationele herinneringen voor deze
omgeving:

- **Neem het verbod op `git stash` letterlijk over in de prompt van elke subagent die git gebruikt**
  (Agent-tool / Workflow-scripts) — subagents nemen dit bestand niet over en het vastgelegde
  terugkerende stash-incident vond plaats via een subagent.
- Voer voordat je wijzigingen samenvoegt of pusht naar een PR die je niet _in deze sessie_ hebt aangemaakt `git worktree list`
  uit en controleer `gh pr view <N> --json state,headRefOid` opnieuw (Harde Regel #22b).
- Beëindig elke sessie met de hoofdcheckout op de branch waarop deze begon.

## Superpowers-/planningsartefacten — padafwijkingen

De conventie voor `_tasks/` is vastgelegd in `AGENTS.md` → "Planning & Research Artifacts". De
superpowers-skills worden geleverd met standaardwaarden die naar `docs/…` verwijzen — die standaardwaarden worden
**hier overschreven**. Wanneer een superpowers-skill een pad aankondigt zoals "opgeslagen in `docs/superpowers/plans/…`",
herschrijf dit dan naar het equivalent onder `_tasks/…` voordat je het bestand opslaat:

| Artefact (skill)                          | Standaard (NIET gebruiken) | Sla het in plaats daarvan hier op                             |
| ----------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| Plannen (`writing-plans`)                 | `docs/superpowers/plans/`  | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specificaties / ontwerp (`brainstorming`) | `docs/superpowers/specs/`  | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Onderzoek (`deep-research`, ad-hoc)       | `docs/research/`           | `_tasks/research/…`                                           |
| Overdrachten (`/handoff`)                 | —                          | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit die artefacten binnen de `_tasks/`-repository (`git -C _tasks …`), nooit in de hoofdrepository.

## Klad-/tijdelijke bestanden — gebruik `_artifacts/`, niet `/tmp`

Dit project overschrijft de standaardkladlocatie van de omgeving voor sessies (`/tmp/claude-*/…`). Schrijf
tijdelijke/werkbestanden — exports, gegenereerde zipbestanden, eenmalige tussenresultaten en alles wat je
anders in `/tmp` zou plaatsen — in plaats daarvan naar `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` is een `_*`-pad in de hoofdmap: het wordt al door git genegeerd (`AGENTS.md` → "Root `_*` paths"), staat
  alleen op schijf en wordt nooit gevolgd.
- Reden: door tijdelijke uitvoer binnen het project te bewaren (in plaats van in `/tmp`), kan de operator
  alle tijdelijke bestanden eenvoudig op één plek vinden en verwijderen, in plaats van te moeten zoeken in vluchtige,
  sessiespecifieke `/tmp`-mappen die verdwijnen of waarin niet-gevolgde bestanden zich ophopen.
- Verwar dit **niet** met `_tasks/` (Harde Regel #23, een eigen privé-git-repository voor duurzame
  plannen/specificaties/onderzoek/overdrachten) — `_artifacts/` is uitsluitend bedoeld voor wegwerpbare werkbestanden; niets
  hierin hoeft behouden te blijven of te worden geversioneerd.

## Groene basis vóór het openen van PR's

Voer vóór het maken van een branch of openen van een PR de controle op een groene basis uit (`AGENTS.md` → Git Workflow →
"Base-green check"; projectskills verwijzen ernaar als `.agents/skills/_shared/base-green.md`). Een PR
die wordt geopend terwijl de tip van de basisbranch rood is, moet `⚠️ base-red inherited: #<issue>` in de beschrijving bevatten. Gebruik
de skill `/sweep-reds` om een opgebouwde rode status (tip van de basisbranch + rode PR's) weg te werken.
