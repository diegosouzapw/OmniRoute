# Merge Queue & Manual Merge-Train Runbook (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Seit v3.8.49 (WS3.2/WS3.4 des Qualitäts-/Geschwindigkeitsplans) ist der standardmäßige Merge-Pfad für
reviewte PRs nach `release/vX.Y.Z` die **Mergify-Merge-Queue** (`.mergify.yml`);
der unten dokumentierte **manuelle Merge-Train** ist die RÜCKFALLEBENE — er wird bei Störungen,
Release-Freezes oder dann verwendet, wenn sich der Mergify-Open-Source-Tarif jemals ändert.

## Standardpfad: die Mergify-Warteschlange

1. Der PR wird von den Kampagnen geprüft/auf Grün gesetzt und durch die ⭐-Freigabe
   des Eigentümers vor dem Merge genehmigt (der Bericht + die Entscheidung pro Element — siehe `/merge-prs`, Schritt 0.75).
2. Der Eigentümer (oder die Sitzung, die gemäß der Entscheidung des Eigentümers handelt) weist das Label **`queue`**
   zu. Das Label IST die Merge-Genehmigung; Mergify führt sie lediglich aus.
3. Mergify validiert die PRs in der Warteschlange **seriell** (jeweils einen) anhand der Schnellprüfungen
   und führt den Merge durch (Squash). Batching + automatische Bisektion gehören zu einem kostenpflichtigen Mergify-Tarif
   („Cannot use Merge Queue batch“ im kostenlosen Tarif, #7220), daher legt `.mergify.yml` keine
   `batch_size` fest; Batching bleibt Aufgabe des unten beschriebenen manuellen Merge-Trains. Ein PR, dessen
   Prüfungen nach Ablauf von `checks_timeout` (240 min = 2× der gemessene p95-Wert von
   `quality.yml`) noch ausstehen, wird aus der Warteschlange entfernt, anstatt diese zu blockieren.
4. Nach dem Merge validiert der kontinuierliche Release-Green-Workflow den neuen Stand bei einem Push
   und eröffnet ein Issue zur Zuordnung, falls die Kombination eine Regression verursacht hat (niemals automatisches Revert).

Schutzmaßnahmen (entsprechen den harten Regeln #21/#22 in `CLAUDE.md`):

- **Release-Freeze aktiv** → PRs, die auf den eingefrorenen Branch abzielen, NICHT mit einem Label versehen; sie zuerst auf
  den aktiven `release/vX+1` umstellen.
- **Laufender PR einer anderen Sitzung** → niemals mit einem Label versehen; nur die besitzende Sitzung stellt
  ihre eigene Arbeit in die Warteschlange.
- Reine Test-Diffs und mit `hotfix` gekennzeichnete PRs durchlaufen bereits eine reduzierte CI (siehe
  `RELEASE_CHECKLIST.md` → Hotfix-Schnellspur); die Bedingungen der Warteschlange akzeptieren den jeweils
  tatsächlich ausgeführten Prüfsatz (`#check-failure=0` + `#check-pending=0`).

## Rückfallebene: der manuelle Merge-Train

Wird verwendet, wenn die Queue nicht verfügbar ist. Dies formalisiert die Vorgehensweise, mit der während
des v3.8.47-Zyklus 33 PRs an einem Tag abgearbeitet wurden:

1. **Batch zusammenstellen** (~10–30 reviewte und genehmigte PRs). Auf `linked:`-Kollisionen prüfen
   (dieselben `tap.testFiles`, dieselben CHANGELOG-Hunks) und diese sequenziell abarbeiten.
2. **EINMAL validieren**: In einem isolierten Worktree, der vom Release-Tip abzweigt, alle Batch-Heads
   lokal mergen und anschließend die Release-äquivalente Suite ausführen
   (`npm run check:release-green`; vor einem Release `--with-build` hinzufügen).
   `scripts/release/merge-train.sh <base> <PR#>…` automatisiert die Schritte 1–2 (kollidierende
   PRs werden ausgeworfen, der Train wird fortgesetzt). Im vollständigen Modus wird `npm run test:unit`
   ausgeführt — der auf die Maschine abgestimmte Runner (`--test-concurrency=20`), **nicht** die beiden
   sequenziellen 4-Core-CI-Shards, durch die die dominante Phase nur ~25 % einer 16-Core-Maschine
   auslastete (behoben am 2026-07-18). `--fast` (untertägiges Abarbeiten großer Mega-Trains,
   vom Owner am 2026-07-18 genehmigt) behält jedes statische Gate + vitest bei, führt aber nur die
   node:test-Dateien aus, die von den aufgenommenen PRs geändert wurden; die VOLLSTÄNDIGE Suite muss
   dennoch mindestens einmal täglich auf dem akkumulierten Tip ausgeführt werden (ein Train ohne `--fast`).
3. **Grün** → die PRs nacheinander mergen (vor jedem Merge `state,headRefOid` erneut prüfen —
   ein PR, dessen Head sich geändert hat, muss erneut reviewt werden). Nachweisen, dass der Netto-Diff
   jedes Merges ausschließlich aus den eigenen Änderungen des PRs besteht (keine Auto-Resolve-Reverts:
   `git diff --stat` auf Löschungen außerhalb des Scopes prüfen).
4. **Rot** → den Batch in Hälften teilen (jede Hälfte validieren), statt PRs einzeln erneut zu
   validieren; den verursachenden PR zusammen mit den Nachweisen zurück in die Review-Queue verschieben.
5. **Niemals**: während eines Freeze in den eingefrorenen Branch mergen; irgendwo `git stash`
   verwenden; die CI pauschal erneut ausführen und hoffen, dass ein roter Status verschwindet
   (Regel: Ein roter Status ist Information).

## Stufenmodell (warum die Queue allein mit Fast-Gates sicher ist)

- **Pro PR** (Fast-Gates in quality.yml): TIA-betroffene Tests + vollständige Unit-Tests mit 4 Shards +
  vitest + Lint-Sammlung + Typprüfung + Integrität von Dokumentation/Changelog.
- **Pro Batch/Tip** (kontinuierliches Release-Green): HARTE `--quick`-Gates bei jedem Push auf
  den Release-Branch; vollständige `--with-build --full-ci`-Durchläufe 3×/Tag.
- **Pro Release** (ci.yml für den Release-PR): die vollständige Matrix einschließlich E2E ×9,
  Paketartefakt + Tarball-Boot-Smoke-Test, Coverage/Ratchets.

Nichts wird weniger validiert als zuvor — die aufwendigen Prüfungen werden lediglich pro Batch/Tip
statt pro PR ausgeführt, wodurch die O(N)-Roundtrips entfallen.

## Voraussetzungen für `merge-train.sh` bei einem frischen Checkout

Das Skript führt eine sofort abbrechende **Preflight-Prüfung** im Root-Checkout aus (vor jeglicher
Worktree-Arbeit), damit eine fehlerhafte Installation niemals als roter Train erscheinen kann:

1. `npm ci` ausführen, anschließend das von npm blockierte `bun`-Postinstall:
   `(cd node_modules/bun && node install.js)` — andernfalls schlagen `check:provider-consistency`
   und `check:known-symbols` (beide `bun scripts/…`) sowohl für den Train ALS AUCH für die Base fehl,
   ohne eine Zeile mit einem Verstoß auszugeben.
2. Kein verwaistes `node_modules/node_modules` (ein doppelter Abhängigkeitsbaum; React wird zweimal
   geladen und die UI-vitest-Suites schlagen sofort fehl).
3. `node_modules/.bin/tsc` muss vorhanden und ausführbar sein (bei einer unvollständigen Installation fehlt es).

Der Train führt das blockierende `npm run check:cycles:ratchet` aus; ein einfaches `npm run check:cycles`
dient nur zur Information (es listet die SCCs auf und wird selbst bei einer fehlerfreien Base mit einem
Exit-Code ungleich null beendet).
