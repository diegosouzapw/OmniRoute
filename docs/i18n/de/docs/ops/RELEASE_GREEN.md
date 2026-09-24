# Release-Green: keeping the queue and release branch green (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Das hierdurch gelöste Problem

Das **vollständige Gate** (`.github/workflows/ci.yml` — Unit-Shards, Vitest, Ratchets,
`package-artifact`, SonarQube, E2E) wird **nur für den Release-PR** (PR → `main`) ausgeführt. PRs mit
Ziel `release/**` durchlaufen die **Fast-Gates** (`quality.yml`: von TIA betroffene Tests + Typprüfung + Linting)
und bei Codeänderungen einen **unverbindlichen** Produktions-Build. Die Folge: Nur beim Release auftretende Fehler können sich weiterhin
unbemerkt im Release-Branch ansammeln und zum Release-Zeitpunkt **schichtweise mit jeweils ~40 Minuten Laufzeit explodieren**,
einer nach dem anderen.

Die „Release-Green-Familie“ dient dazu, diesen Fehlern **zuvorzukommen** — das Äquivalent des vollständigen
Gates jederzeit **lokal / außerhalb des Releases** zu validieren, damit der Release-PR bereits
bei seinem ersten CI-Lauf grün ist.

> **Nicht verhandelbares Prinzip:** Nichts davon blockiert Mitwirkende. Wir fügen keine erforderliche
> Prüfung hinzu, durch die ihr PR fehlschlägt. Der **Drift** (Ratchets) ist beim Release durch die Maintainer neu zu baselinen —
> er betrifft niemals Mitwirkende. Kein Bestandteil **schließt** einen PR (Anerkennungsdiebstahl) oder
> **schwächt** einen Test ab, damit er erfolgreich ist.

## Die Familie (4 Bestandteile) — und wie jeder davon unabhängig ausgeführt wird

| Bestandteil                                                              | Was es ist                                                                                           | Wann auszuführen                                                               | Umfang                                  |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------- |
| **`/green-prs`** (Lösung A)                                              | Bedarfsgesteuerter Scan der **Warteschlange offener PRs** durch die Maintainer                       | **Unabhängig und regelmäßig** — insbesondere **vor** einem `/generate-release` | Gesamte PR-Warteschlange → `release/**` |
| **`/validate-release-green`** (Lösung C — `npm run check:release-green`) | Validierungs-Engine: reproduziert das vollständige Gate für einen Branch ODER einen Merge-Kandidaten | Unabhängig und jederzeit                                                       | Ein bestimmter Branch oder ein Merge-PR |
| **`/babysit <PR#>`**                                                     | Führt die **Live-CI** **eines** PRs bis zum grünen Status                                            | Unabhängig, pro PR                                                             | Ein einzelner PR                        |
| **`nightly-release-green.yml`** (Lösung D)                               | Automatisierter nächtlicher Workflow; eröffnet bei einem HARTEN Fehler ein Issue                     | Automatisch (Cron)                                                             | Der aktive Release-Branch               |

**Kurze Antwort auf „Ist das nur für Releases gedacht?“:** **Nein.** `/green-prs` wurde dafür entwickelt,
**regelmäßig zwischen Releases** ausgeführt zu werden. Die unabhängige Ausführung ist der Normalfall — der Release ist lediglich
der Zeitpunkt, zu dem die Ausführung den größten Nutzen bringt.

## Beratender PR-to-Release-Build

`quality.yml` enthält jetzt `Build (advisory)` für Code-PRs, die keine Entwürfe sind, sowie für Mergify-Queue-Branches.
Er bildet das Produktions-Build-Rezept aus `ci.yml` nach: Node 24, `npm-ci-retry`,
`check:node-runtime` und `npm run build` mit `OMNIROUTE_USE_TURBOPACK=1`. Es wird bewusst
kein Build-Artefakt hochgeladen, da in diesem Workflow kein nachgelagerter Quality-Job eines verwendet.
Entferne `continue-on-error` nach einer Woche stabiler Release-PR-Durchläufe, damit das Signal zu einem
blockierenden PR-to-Release-Gate wird.

## Lösung C — `npm run check:release-green` (die Engine)

Reproduziert eine release-äquivalente Validierung für den aktuellen Arbeitsbaum und klassifiziert jeden fehlgeschlagenen Check:

- **HARD** (Typprüfung, Lint-Fehler, Unit-Tests, Vitest, DB-Regeln, öffentliche Zugangsdaten, optional
  `package-artifact`) → **echter Defekt**; `exit 1`. Wird auf dem Quell-Branch behoben (TDD, Regel Nr. 18).
- **DRIFT** (ESLint-**Warnungen**, kognitive Komplexität, Dateigröße) → im Zyklus angesammelte Abweichung der Grenzwerte,
  **nicht die Schuld des Beitragenden**; sie wird nur gemeldet und **vom Maintainer beim
  Release neu baseliniert**. DRIFT verändert **niemals** den Exit-Code — und blockiert daher niemanden.

```bash
npm run check:release-green                 # aktueller Branch (Arbeitsbaum)
node scripts/quality/validate-release-green.mjs --json   # strukturierte Ausgabe
node scripts/quality/validate-release-green.mjs --quick  # überspringt Unit-Tests und Vitest (nur Abweichungen, Typprüfung und Lint)
node scripts/quality/validate-release-green.mjs --with-build  # schließt package-artifact ein (langsam)
```

Führt nur Diagnosen durch und **meldet** sie (keine automatische Korrektur). Die Orchestrierung zum Erreichen eines grünen Status befindet sich in
`/green-prs` und `/review-prs`.

## Lösung A — `/green-prs` (der Queue-Scan)

Vorgehen (Zusammenfassung — Details siehe Skill `green-prs`):

1. **Erfasse** die Queue der offenen PRs für den aktiven Release-Branch.
2. **Bewerte** jeden PR (geeignet / abzulehnen / Autor muss handeln) — abzulehnende PRs und PRs, bei denen der Autor handeln muss, werden
   **gemeldet, nicht geschlossen** (der Autor entscheidet).
3. Bringe jeden geeigneten PR in einem **isolierten Worktree** (Regel Nr. 19) auf den Stand des Release-Tips und führe
   `npm run check:release-green` aus:
   - **HARD** → **auf dem Branch des Beitragenden** mittels Co-Autorenschaft beheben (der Status „Merged“ des Autors bleibt erhalten),
     dann erneut ausführen, bis alle HARD-Fehler behoben sind.
   - **DRIFT** → unverändert lassen; wird beim Release neu baseliniert.
4. **Erstelle** eine Tabelle PR × (Bewertung, HARD-Fehler, behoben?, DRIFT, jetzt release-grün?).

Kann die Queue **vorbereiten**, ohne sie zu mergen; führt Merges nur auf ausdrückliche Anforderung durch — und schließt niemals einen PR.

## Empfohlener Rhythmus

- Führe **`/green-prs` regelmäßig** aus (z. B. wöchentlich) und **immer vor einem
  `/generate-release`**.
- Behalte **`nightly-release-green.yml`** (Lösung D) als kontinuierliches Signal bei: Wenn es ein
  Issue wegen eines HARD-Fehlers öffnet, ist es Zeit für einen Scan.
- Verwende **`/validate-release-green`** bei Bedarf, um einen Branch oder einen bestimmten Merge-Kandidaten zu prüfen.
- Verwende **`/babysit <PR#>`**, wenn ein bestimmter PR im laufenden CI bis zum grünen Status begleitet werden muss.

## Beziehung zum Release

- `/generate-release` ruft die Validierung in **Phase 0 (Vorabprüfung)** auf: DRIFT wird neu baseliniert und
  HARD-Fehler werden behoben, bevor der Release-PR geöffnet wird.
- `/review-prs` verwendet das Release-Green-Gate beim Schritt zur Merge-Entscheidung (grün vor dem Merge).

Das Ziel aller Komponenten ist dasselbe: **ein grüner Release-PR beim ersten CI-Durchlauf**, statt am Release-Tag
40-minütige Schichten von Fehlschlägen nacheinander abzuarbeiten.
