# Merge Queue & Manual Merge-Train Runbook (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Seit v3.8.49 (WS3.2/WS3.4 des Qualitäts-/Geschwindigkeitsplans) ist der standardmäßige Merge-Pfad für
geprüfte PRs in `release/vX.Y.Z` die **Mergify-Merge-Queue** (`.mergify.yml`);
der unten dokumentierte **manuelle Merge-Train** ist die RÜCKFALLEBENE — er wird bei Vorfällen,
Release-Freezes oder dann verwendet, wenn sich der Mergify-Open-Source-Plan jemals ändert.

## Standardpfad: die Mergify-Queue

1. Der PR wurde von den Kampagnen geprüft/auf Grün gesetzt und durch das ⭐-Pre-Merge-Gate
   des Verantwortlichen genehmigt (der Bericht + die Entscheidung pro Element — siehe `/merge-prs`, Schritt 0.75).
2. Der Verantwortliche (oder die Session, die gemäß seiner Entscheidung handelt) weist das Label **`queue`**
   zu. Das Label IST die Merge-Genehmigung; Mergify führt sie lediglich aus.
3. Mergify fasst bis zu 10 PRs aus der Queue zu einem Batch zusammen, validiert den Batch anhand der Fast-Gates
   und führt den Merge aus (Squash). Ein roter Batch wird **automatisch halbiert** — der fehlerverursachende PR
   wird in ~log2(N) erneuten Validierungen isoliert und aus der Queue entfernt; die übrigen werden weiterverarbeitet.
4. Nach dem Merge validiert der kontinuierliche Release-Green-Workflow bei einem Push den neuen Tip
   und eröffnet ein Zuordnungs-Issue, falls die Kombination eine Regression verursacht hat (niemals automatischer Revert).

Schutzvorkehrungen (entsprechen den „Hard Rules“ #21/#22 in `CLAUDE.md`):

- **Release-Freeze aktiv** → PRs, die auf den eingefrorenen Branch abzielen, NICHT labeln; zuerst auf
  den aktiven `release/vX+1` umstellen.
- **In Bearbeitung befindlicher PR einer anderen Session** → niemals labeln; nur die besitzende Session stellt
  ihre eigene Arbeit in die Queue.
- Diffs, die ausschließlich Tests betreffen, und mit `hotfix` gelabelte PRs führen bereits eine reduzierte CI aus (siehe
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); die Queue-Bedingungen akzeptieren die tatsächlich
  ausgeführte Menge an Checks (`#check-failure=0` + `#check-pending=0`).

## Rückfallebene: der manuelle Merge-Train

Wird verwendet, wenn die Queue nicht verfügbar ist. Dies formalisiert das Verfahren, mit dem während
des v3.8.47-Zyklus 33 PRs an einem Tag abgearbeitet wurden:

1. **Batch zusammenstellen** (~10–30 geprüfte und genehmigte PRs). Auf `linked:`-Kollisionen prüfen
   (dieselben `tap.testFiles`, dieselben CHANGELOG-Hunks) und diese sequenziell verarbeiten.
2. **EINMAL validieren**: In einem isolierten Worktree auf Basis des Release-Tips alle Batch-Heads
   lokal mergen und anschließend die Release-äquivalente Suite ausführen
   (`npm run check:release-green`; vor einem Release `--with-build` hinzufügen).
   `scripts/release/merge-train.sh <base> <PR#>…` automatisiert die Schritte 1–2 (PRs mit Konflikten
   werden ausgeworfen, der Train wird fortgesetzt). Der vollständige Modus führt `npm run test:unit` aus — den
   auf die Maschine abgestimmten Runner (`--test-concurrency=20`), **nicht** die beiden sequenziellen 4-Core-CI-
   Shards, durch die die dominante Phase nur ~25 % einer 16-Core-Maschine nutzte (behoben
   am 2026-07-18). `--fast` (für das Abarbeiten großer Mega-Trains innerhalb eines Tages, vom Verantwortlichen am 2026-07-18 genehmigt)
   behält jedes statische Gate + vitest bei, führt jedoch nur die node:test-Dateien aus, die von den
   aufgenommenen PRs geändert wurden; die VOLLSTÄNDIGE Suite muss weiterhin mindestens einmal täglich auf dem
   kumulierten Tip ausgeführt werden (ein Train ohne `--fast`).
3. **Grün** → die PRs nacheinander mergen (vor jedem Merge `state,headRefOid` erneut prüfen —
   ein PR, dessen Head sich geändert hat, muss erneut geprüft werden). Nachweisen, dass der Netto-Diff jedes Merges
   ausschließlich aus den Änderungen des PRs besteht (keine durch automatische Konfliktauflösung verursachten Reverts: `git diff --stat` auf
   nicht zum Umfang gehörende Löschungen prüfen).
4. **Rot** → den Batch halbieren (jede Hälfte validieren), statt jeden PR einzeln erneut zu validieren;
   den fehlerverursachenden PR zusammen mit den Nachweisen zurück in die Review-Queue verschieben.
5. **Niemals**: während eines Freezes in den eingefrorenen Branch mergen; irgendwo `git stash` verwenden;
   die CI pauschal erneut ausführen, in der Hoffnung, dass ein roter Status verschwindet (Regel: Rot ist Information).

## Stufenmodell (warum die Queue allein mit Fast-Gates sicher ist)

- **Pro PR** (Fast-Gates in quality.yml): TIA-betroffene Tests + vollständige Unit-Tests mit 4 Shards +
  vitest + Lint-Sammlung + Typprüfung + Integritätsprüfung für Dokumentation/Changelog.
- **Pro Batch/Tip** (kontinuierliches Release-Green): `--quick`-HARD-Gates bei jedem Push auf
  den Release-Branch; vollständige `--with-build --full-ci`-Durchläufe 3×/Tag.
- **Pro Release** (ci.yml für den Release-PR): die vollständige Matrix einschließlich E2E ×9,
  Paketartefakt + Tarball-Boot-Smoke-Test, Coverage/Ratchets.

Nichts wird weniger validiert als zuvor — die aufwendigen Prüfungen werden lediglich pro Batch/Tip
statt pro PR ausgeführt, wodurch die O(N)-Roundtrips entfallen.
