# CLAUDE.md (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alla projektregler finns i [`AGENTS.md`](AGENTS.md)** — den enda sanningskällan för varje
AI-assistent (arkitektur, konventioner, testning, kvalitetsgrindar, git-arbetsflöde, de 23 hårda
reglerna, lärdomar om PII). Läs den i sin helhet; lägg inte till projektregler här igen. Allt nedan
gäller ENDAST Claude Code — operativa förtydliganden av regler som redan definierats i `AGENTS.md`.

## Isolering med worktree — specifikt för Claude Code

Det fullständiga obligatoriska worktree-protokollet (bekräftelse av basgren, den kanoniska sökvägen
`.claude/worktrees/`, `cp -al` node_modules, regler för nedmontering) finns i `AGENTS.md` → Git-arbetsflöde
→ ”Worktree-isolering”. Punkter specifika för Claude Code:

- Bekräfta basgrenen med operatören via `AskUserQuestion` (hård regel nr 19), såvida operatören inte
  redan har angett den.
- Föredra det inbyggda verktyget `EnterWorktree` — det skapar redan worktrees under
  `.claude/worktrees/` (den kanoniska sökvägen). Skapa worktree-katalogen med det dokumenterade
  kommandot `git worktree add` och anropa sedan `EnterWorktree` med dess `path`.

## Säkerhet mellan sessioner — specifikt för Claude Code

Hårda regler nr 19/21/22 (i `AGENTS.md`) styr parallella sessioner. Operativa påminnelser för denna
körmiljö:

- **Återge förbudet mot `git stash` ordagrant i prompten till varje underagent som hanterar git**
  (Agent-verktyget/arbetsflödesskript) — underagenter ärver inte den här filen, och det registrerade
  återfallet av stash-incidenten inträffade via en underagent.
- Innan du sammanfogar eller pushar till en PR som du inte skapade _under den här sessionen_, kör
  `git worktree list` och kontrollera `gh pr view <N> --json state,headRefOid` på nytt (hård regel nr 22b).
- Avsluta varje session med huvudutcheckningen på samma gren som den startade på.

## Superpowers-/planeringsartefakter — åsidosättningar av sökvägar

Konventionen `_tasks/` definieras i `AGENTS.md` → ”Planerings- och forskningsartefakter”.
Superpowers-färdigheterna levereras med standardvärden som pekar på `docs/…` — dessa standardvärden
**åsidosätts här**. När en superpowers-färdighet meddelar en sökväg som ”sparad i
`docs/superpowers/plans/…`”, skriv om den till motsvarigheten under `_tasks/…` innan du sparar:

| Artefakt (färdighet)                     | Standard (använd INTE)    | Spara här i stället                                           |
| ---------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Planer (`writing-plans`)                 | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikationer/design (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Forskning (`deep-research`, ad hoc)      | `docs/research/`          | `_tasks/research/…`                                           |
| Överlämningar (`/handoff`)               | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Committa dessa artefakter i `_tasks/`-repo:t (`git -C _tasks …`), aldrig i huvudrepo:t.

## Arbetsfiler/tillfälliga filer — använd `_artifacts/`, inte `/tmp`

Det här projektet åsidosätter körmiljöns standardplats för tillfälliga sessionsfiler
(`/tmp/claude-*/…`). Skriv tillfälliga filer och arbetsfiler — exporter, genererade zip-filer,
tillfälliga mellanresultat och allt annat som du annars skulle lägga i `/tmp` — till
`/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` i stället.

- `_artifacts/` är en `_*`-sökväg i roten: den ignoreras redan av git (`AGENTS.md` → ”`_*`-sökvägar
  i roten”), finns endast på disken och spåras aldrig.
- Anledning: genom att hålla tillfälliga utdata inom projektet (i stället för i `/tmp`) blir det
  enkelt för operatören att hitta och radera allt tillfälligt på ett ställe, i stället för att leta
  i tillfälliga sessionsspecifika `/tmp`-kataloger som försvinner eller samlar på sig ospårade filer.
- Förväxla **inte** detta med `_tasks/` (hård regel nr 23, dess eget privata git-repo för beständiga
  planer/specifikationer/forskning/överlämningar) — `_artifacts/` är endast avsett för förbrukningsbara
  arbetsfiler; inget här behöver bevaras eller versionshanteras.

## Grön bas innan PR:er öppnas

Innan du skapar en gren eller öppnar en PR ska du köra kontrollen av att basen är grön
(`AGENTS.md` → Git-arbetsflöde → ”Kontroll av grön bas”; projektets färdigheter refererar till den
som `.agents/skills/_shared/base-green.md`). En PR som öppnas medan bastoppen är röd måste innehålla
`⚠️ base-red inherited: #<issue>` i sin beskrivning. Använd färdigheten `/sweep-reds` för att beta av
ett ackumulerat rött tillstånd (bastopp + röda PR:er).
