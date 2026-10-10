# CLAUDE.md (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Alle Projektregeln befinden sich in [`AGENTS.md`](AGENTS.md)** — der einzigen verbindlichen Quelle für jeden KI-
Assistenten (Architektur, Konventionen, Tests, Qualitätsprüfungen, Git-Workflow, die 23 verbindlichen Regeln,
Erkenntnisse zu personenbezogenen Daten). Lies sie vollständig; füge hier keine Projektregeln erneut hinzu. Alles Folgende gilt AUSSCHLIESSLICH
für Claude Code — operative Präzisierungen der bereits in `AGENTS.md` definierten Regeln.

## Worktree-Isolierung — Besonderheiten für Claude Code

Das vollständige verbindliche Worktree-Protokoll (Bestätigung des Basis-Branches, kanonischer
Pfad `.claude/worktrees/`, `cp -al` für node_modules, Regeln zum Abbau) befindet sich in `AGENTS.md` → Git-Workflow → „Worktree-
Isolierung“. Claude-Code-spezifische Punkte:

- Bestätige den Basis-Branch über `AskUserQuestion` mit dem Bediener (verbindliche Regel Nr. 19), sofern er
  ihn dir nicht bereits genannt hat.
- Bevorzuge das native Tool `EnterWorktree` — es erstellt Worktrees bereits unter
  `.claude/worktrees/` (dem kanonischen Pfad). Erstelle den Worktree mit dem dokumentierten Befehl `git
worktree add` und rufe anschließend `EnterWorktree` mit seinem `path` auf.

## Sitzungsübergreifende Sicherheit — Besonderheiten für Claude Code

Die verbindlichen Regeln Nr. 19/Nr. 21/Nr. 22 (in `AGENTS.md`) regeln parallele Sitzungen. Operative Hinweise für diese
Ausführungsumgebung:

- **Übernimm das Verbot von `git stash` wortgetreu in den Prompt jedes Subagenten, der Git verwendet**
  (Agent-Tool / Workflow-Skripte) — Subagenten erben diese Datei nicht, und der dokumentierte
  erneute Stash-Vorfall wurde durch einen Subagenten verursacht.
- Führe vor dem Zusammenführen oder Pushen in einen PR, den du nicht _in dieser Sitzung_ erstellt hast, `git worktree list`
  aus und prüfe `gh pr view <N> --json state,headRefOid` erneut (verbindliche Regel Nr. 22b).
- Beende jede Sitzung so, dass sich der Haupt-Checkout auf dem Branch befindet, auf dem er zu Sitzungsbeginn war.

## Superpowers-/Planungsartefakte — Pfadüberschreibungen

Die Konvention für `_tasks/` ist in `AGENTS.md` → „Planungs- und Rechercheartefakte“ definiert. Die
Superpowers-Skills werden mit Standardwerten ausgeliefert, die auf `docs/…` verweisen — diese Standardwerte werden **hier
überschrieben**. Wenn ein Superpowers-Skill einen Pfad wie „gespeichert unter `docs/superpowers/plans/…`“ ankündigt,
ändere ihn vor dem Schreiben auf das entsprechende `_tasks/…`-Äquivalent:

| Artefakt (Skill)                           | Standard (NICHT verwenden) | Stattdessen hier speichern                                    |
| ------------------------------------------ | -------------------------- | ------------------------------------------------------------- |
| Pläne (`writing-plans`)                    | `docs/superpowers/plans/`  | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spezifikationen / Design (`brainstorming`) | `docs/superpowers/specs/`  | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Recherche (`deep-research`, ad hoc)        | `docs/research/`           | `_tasks/research/…`                                           |
| Übergaben (`/handoff`)                     | —                          | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commite diese Artefakte innerhalb des `_tasks/`-Repositorys (`git -C _tasks …`), niemals im Haupt-Repository.

## Scratch-/temporäre Dateien — `_artifacts/` statt `/tmp` verwenden

Dieses Projekt überschreibt das standardmäßige Sitzungs-Scratchpad der Ausführungsumgebung (`/tmp/claude-*/…`). Schreibe
temporäre/Arbeitsdateien — Exporte, generierte ZIP-Dateien, einmalige Zwischenergebnisse und alles, was du
ansonsten unter `/tmp` ablegen würdest — stattdessen nach `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`.

- `_artifacts/` ist ein `_*`-Pfad im Stammverzeichnis: bereits von Git ignoriert (`AGENTS.md` → „`_*`-Pfade im Stammverzeichnis“), nur
  lokal auf dem Datenträger vorhanden und wird niemals versioniert.
- Grund: Wenn Scratch-Ausgaben innerhalb des Projekts statt unter `/tmp` verbleiben, kann der Bediener
  alle temporären Dateien problemlos an einem Ort finden und löschen, anstatt sie in flüchtigen,
  sitzungsspezifischen `/tmp`-Verzeichnissen suchen zu müssen, die verschwinden oder nicht versionierte Dateien ansammeln.
- Verwechsle dies **nicht** mit `_tasks/` (verbindliche Regel Nr. 23, ein eigenes privates Git-Repository für dauerhafte
  Pläne/Spezifikationen/Recherchen/Übergaben) — `_artifacts/` ist ausschließlich für verwerfbare Arbeitsdateien bestimmt; nichts
  hier muss erhalten oder versioniert werden.

## Grüner Basisstand vor dem Öffnen von PRs

Führe vor dem Erstellen eines Branches oder dem Öffnen eines PRs die Prüfung auf einen grünen Basisstand aus (`AGENTS.md` → Git-Workflow →
„Prüfung auf grünen Basisstand“; Projekt-Skills referenzieren sie als `.agents/skills/_shared/base-green.md`). Ein PR,
der geöffnet wird, während die Spitze des Basis-Branches rot ist, muss `⚠️ base-red inherited: #<issue>` in seinem Text enthalten. Um
einen aufgelaufenen roten Zustand (Spitze des Basis-Branches + rote PRs) abzuarbeiten, verwende den Skill `/sweep-reds`.
