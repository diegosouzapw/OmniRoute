# CLAUDE.md (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Tutte le regole del progetto si trovano in [`AGENTS.md`](AGENTS.md)**, l'unica fonte autorevole per ogni
assistente AI (architettura, convenzioni, test, controlli di qualità, flusso di lavoro git, le 23 Regole Rigide,
indicazioni apprese sui dati PII). Leggilo integralmente; non aggiungere nuovamente qui le regole del progetto. Tutto ciò che segue si applica ESCLUSIVAMENTE
a Claude Code: perfezionamenti operativi delle regole già definite in `AGENTS.md`.

## Isolamento dei worktree — specifiche per Claude Code

Il protocollo obbligatorio completo per i worktree (conferma del branch di base, percorso canonico
`.claude/worktrees/`, `cp -al` per node_modules, regole di rimozione) si trova in `AGENTS.md` → Flusso di lavoro Git → "Isolamento dei
worktree". Punti specifici per Claude Code:

- Conferma il branch di base con l'operatore tramite `AskUserQuestion` (Regola Rigida #19), a meno che non
  te lo abbia già comunicato.
- Preferisci lo strumento nativo `EnterWorktree`: crea già i worktree in
  `.claude/worktrees/` (il percorso canonico). Crea il worktree con il comando `git
worktree add` documentato, quindi chiama `EnterWorktree` con il relativo `path`.

## Sicurezza tra sessioni — specifiche per Claude Code

Le Regole Rigide #19/#21/#22 (in `AGENTS.md`) disciplinano le sessioni parallele. Promemoria operativi per questo
ambiente:

- **Replica testualmente il divieto di `git stash` nel prompt di ogni sottoagente che interagisce con git**
  (strumento Agent / script del flusso di lavoro): i sottoagenti non ereditano questo file e la recidiva
  registrata dell'incidente relativo a stash è avvenuta tramite un sottoagente.
- Prima di eseguire il merge o il push verso qualsiasi PR che non hai creato _in questa sessione_, esegui `git worktree list`
  e verifica nuovamente `gh pr view <N> --json state,headRefOid` (Regola Rigida #22b).
- Termina ogni sessione lasciando il checkout principale sul branch da cui è iniziata.

## Superpowers / artefatti di pianificazione — override dei percorsi

La convenzione `_tasks/` è definita in `AGENTS.md` → "Artefatti di pianificazione e ricerca". Le
skill di superpowers sono distribuite con valori predefiniti che puntano a `docs/…`: tali valori sono **sovrascritti
qui**. Quando una skill di superpowers indica un percorso come "salvato in `docs/superpowers/plans/…`",
sostituiscilo con l'equivalente in `_tasks/…` prima di scrivere:

| Artefatto (skill)                            | Percorso predefinito (NON usare) | Salva invece qui                                              |
| -------------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| Piani (`writing-plans`)                      | `docs/superpowers/plans/`        | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifiche / progettazione (`brainstorming`) | `docs/superpowers/specs/`        | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Ricerca (`deep-research`, ad hoc)            | `docs/research/`                 | `_tasks/research/…`                                           |
| Passaggi di consegne (`/handoff`)            | —                                | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Esegui il commit di tali artefatti all'interno del repository `_tasks/` (`git -C _tasks …`), mai nel repository principale.

## File temporanei / di lavoro — usa `_artifacts/`, non `/tmp`

Questo progetto sovrascrive il percorso predefinito dell'ambiente per i file di lavoro della sessione (`/tmp/claude-*/…`). Scrivi
i file temporanei/di lavoro — esportazioni, zip generati, output intermedi una tantum, qualsiasi elemento che
altrimenti inseriresti in `/tmp` — in `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` è un percorso `_*` alla radice: è già ignorato da git (`AGENTS.md` → "Percorsi `_*` alla radice"), esiste
  solo su disco e non viene mai tracciato.
- Motivo: conservare gli output di lavoro all'interno del progetto (anziché in `/tmp`) consente all'operatore
  di trovare ed eliminare facilmente tutti i file temporanei in un unico posto, invece di cercarli tra directory
  `/tmp` effimere e specifiche per sessione, che scompaiono o accumulano file non tracciati.
- **Non** confonderlo con `_tasks/` (Regola Rigida #23, il relativo repository git privato per
  piani/specifiche/ricerche/passaggi di consegne persistenti): `_artifacts/` serve esclusivamente per file di lavoro eliminabili; nulla
  al suo interno deve essere conservato o sottoposto a controllo di versione.

## Base verde prima dell'apertura delle PR

Prima di creare un branch o aprire una PR, esegui il controllo dello stato verde della base (`AGENTS.md` → Flusso di lavoro Git →
"Controllo dello stato verde della base"; le skill del progetto vi fanno riferimento come `.agents/skills/_shared/base-green.md`). Una PR
aperta quando il commit più recente della base è rosso deve includere `⚠️ base-red inherited: #<issue>` nel proprio corpo. Per
smaltire uno stato rosso accumulato (commit più recente della base + PR rosse), usa la skill `/sweep-reds`.
