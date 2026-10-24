# Release Checklist (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Zuletzt aktualisiert:** 2026-08-28 — v3.8.51
> Optimierter Release-Ablauf, der Claude Code Skills zur Automatisierung nutzt.
>
> **Queue/Branch zwischen Releases grün halten:** siehe [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-Familie + `npm run check:release-green` + `/babysit` + nächtlicher Lauf). Wird dies
> regelmäßig — und insbesondere **vor** dieser Checkliste — ausgeführt, startet der Release-PR grün.

## Kurzfassung

```bash
# 1. Version erhöhen + CHANGELOG generieren (Skill)
/version-bump-cc patch    # oder minor/major

# 2. Qualitätsprüfung lokal ausführen
npm run check              # Linting + Tests
npm run test:coverage      # vollständige Coverage-Prüfung (60/60/60/60)

# 3. Build & Smoke-Test
npm run build
npm run test:e2e           # optional, aber empfohlen

# 4. Release generieren (Skill)
/generate-release-cc

# 5. Bereitstellen (Skill)
/deploy-vps-both-cc        # oder akamai-cc / local-cc

# 6. Release-Nachweise erfassen (Skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (Standard seit v3.8.51) — auf Anfrage gestuft, direkt als Fallback

`npm-publish.yml` veröffentlicht standardmäßig über **npm Trusted Publishing (OIDC)**: Der
`stage-npm`-Job (GitHub-gehostet) tauscht das ID-Token von GitHub gegen kurzlebige npm-
Anmeldedaten für diesen Lauf aus — kein langlebiges npm-Token in den Repository-Secrets, keine 2FA-Abfrage, Provenance angehängt.
Das ist der von npm vorgesehene Ersatz, da Tokens, die 2FA umgehen, abgeschafft werden;
dadurch wird der vollständig automatische Ablauf wiederhergestellt, den das Projekt bis v3.8.48 hatte, während die
WS1.3-Garantie bestehen bleibt (ein geleaktes Token kann nicht allein veröffentlichen — es gibt kein Token).

**Einmalige Einrichtung (Eigentümer):** npmjs.com → Paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: Eigentümer `diegosouzapw`, Repository `OmniRoute`, Workflow `npm-publish.yml`
(Umgebung: keine). Solange diese Konfiguration nicht vorhanden ist, schlägt der automatische Schritt mit `ENEEDAUTH` fehl:
erneut mit `publish_mode=staged` (siehe unten) oder `direct` auslösen.

### Gestufte Veröffentlichung (auf Anfrage — `publish_mode=staged`)

Der npm-publish-Workflow veröffentlicht nicht mehr direkt: Er startet den gepackten Tarball
(`check:pack-boot`) und führt anschließend `npm stage publish` aus — exakt diese Bytes werden in
der Registry zwischengespeichert und sind **nicht installierbar**, bis der Eigentümer sie genehmigt. Die menschliche 2FA-Freigabe erfolgt
nun NACH dem Nachweis, nicht davor.

**Ablauf für den Eigentümer, nachdem der Workflow grün ist:**

1. `npm stage list omniroute` — die Stage-ID ermitteln (sie wird auch in der Workflow-Zusammenfassung ausgegeben).
2. Die bereitgestellten Bytes überprüfen (empfohlen): `npm stage download <id>`, anschließend den
   heruntergeladenen Tarball in ein temporäres Präfix installieren und starten (`npm run check:pack-boot` automatisiert
   dieselbe Packen→Installieren→Starten-Prüfung in CI).
3. `npm stage approve <id>` — die 2FA-Abfrage IST die Veröffentlichung. `npm stage reject <id>` verwirft sie.
4. Sicherheitsnetz nach der Veröffentlichung: Der Post-Publish-Verifizierer (WS1.4 des v3.8.49-Plans) installiert die
   veröffentlichte Version aus der öffentlichen Registry in einem sauberen Container und startet sie.

**Notfall-Fallback:** `workflow_dispatch` mit `publish_mode=direct` stellt das
bisherige sofortige `npm publish` wieder her (nur verwenden, wenn das Staging selbst fehlerhaft ist; Grund dokumentieren).

**Einmalige Härtung (Eigentümer, npmjs.com):** Den Trusted Publisher für
`omniroute` im „stage-only“-Modus konfigurieren, damit ein geleaktes langlebiges Token nicht direkt von einem beliebigen Ort aus
`npm publish` ausführen kann — CI kann nur bereitstellen; ausschließlich die 2FA des Eigentümers veröffentlicht.

**Vorgehensweise bei defakten Artefakten (unverändert):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
als Standardreaktion (innerhalb von Minuten, umkehrbar); `npm unpublish` nur innerhalb des 72-Stunden-/Keine-Abhängigen-
Zeitfensters und niemals als erste Maßnahme. Docker: Ein Versions-Tag niemals überschreiben — ein Rollback bedeutet,
`latest` wieder auf den letzten funktionsfähigen Digest zu verweisen.

**Docker Hub `latest` (bei jeder stabilen SemVer-Veröffentlichung erforderlich):** Der
`docker-publish`-Workflow muss **sowohl** `X.Y.Z` als auch, sofern
`should-promote-latest.sh` bestätigt, dass es sich um die höchste stabile SemVer-Version handelt, `:latest`
mit **demselben Digest** taggen. Nach dem Job: Der Digest von Hub `latest` entspricht dem neuen
SemVer-Digest und `last_updated` wurde aktualisiert. `:latest` darf nicht auf einem älteren
Build verbleiben, während die Release Notes Korrekturen beschreiben, die nur in Git vorhanden sind. Compose-
Schnellstarts verwenden `:latest`; GitOps sollte weiterhin `X.Y.Z` fest vorgeben. Siehe
[Docker-Release-Kanäle](../guides/DOCKER_GUIDE.md#release-channels) und #10317.

## Hotfix-Schnellspur (Label `hotfix`)

Ein mit `hotfix` gekennzeichneter PR überspringt die umfangreiche CI-Matrix (E2E mit 9 Shards, Coverage-Ratchet,
Quality-Gate, Quality-Extended) und behält die schnellen Gates mit hoher Aussagekraft bei: Build,
Unit-Shards, Integration, Vitest, Lint/Typecheck, Docs-Sync, `check:pack-artifact`
und den Boot-Smoke-Test des Tarballs (`check:pack-boot`). Ziel: grün in ≤15 Min. statt in ~33 Min.

**Zugangsrichtlinie — alle vier Voraussetzungen sind erforderlich (nach dem Vorbild der Notfallspuren von Chromium/VS Code/Node):**

1. **Schweregrad**: Die Produktion ist defekt — ein veröffentlichtes Artefakt stürzt beim Start ab /
   ein Sicherheitsfix / jeder Benutzer des Releases ist betroffen. „Wichtig“ bedeutet nicht „defekt“.
2. **Berechtigung**: Nur der Repository-Eigentümer wendet das Label `hotfix` an. Das Label IST
   die Genehmigung — bei einem Kampagnen-PR darf es niemals eigenmächtig verwendet werden.
3. **Nachweis**: Der PR-Text verlinkt den vorherigen vollständig grünen umfangreichen Lauf (die Suite,
   die von den übersprungenen Jobs erneut validiert würde) sowie den eigenen Test des Fixes, der zuerst fehlschlägt und anschließend erfolgreich ist.
4. **Umfang**: Nur Cherry-Pick — der minimale Fix, keine Refactorings, keine beiläufig mitgenommenen Änderungen.

Die übersprungene Coverage-/Ratchet-Oberfläche wird durch den nächsten vollständigen Lauf auf dem
Release-Branch erneut validiert (kontinuierlich grüner Release-Status) — die Spur überspringt nur das WARTEN, niemals die Validierung.
Reine Test-Diffs (alle Dateien unter `tests/`, keine unter `tests/e2e/`) überspringen die E2E-
Matrix automatisch und ohne Label.

## Detaillierte Checkliste

### Vor der Veröffentlichung

- [ ] Alle für dieses Release vorgesehenen PRs wurden in `release/vX.Y.0` gemergt
- [ ] Alle offenen Linear-/Issue-Einträge für diese Version wurden geschlossen oder in den nächsten Meilenstein verschoben
- [ ] CI auf dem Branch `release/vX.Y.0` ist grün
- [ ] Keine `TODO(release)`-Marker im Code: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker-Basis-Image ist aktuell (derzeit `node:24.15.0-trixie-slim`)

### Version und Changelog

- [ ] `/version-bump-cc <patch|minor|major>` ausführen (Claude-Code-Skill)
  - Aktualisiert die Versionen in `package.json` und `electron/package.json`
  - Generiert `CHANGELOG.md` anhand der Git-Commits seit dem letzten Tag neu
  - Aktualisiert die Badges in README.md
- [ ] CHANGELOG.md manuell prüfen und Commit-Nachrichten bei Bedarf bereinigen
- [ ] Sicherstellen, dass der neueste SemVer-Abschnitt in `CHANGELOG.md` der Version in `package.json` entspricht
- [ ] `## [Unreleased]` als ersten Changelog-Abschnitt für bevorstehende Arbeiten beibehalten
- [ ] `docs/openapi.yaml` aktualisieren → `info.version` muss der Version in `package.json` entsprechen

### Codequalität

- [ ] `npm run lint` — 0 Fehler (Warnungen bestanden bereits zuvor)
- [ ] `npm run typecheck:core` — fehlerfrei
- [ ] `npm run typecheck:noimplicit:core` — fehlerfrei (streng)
- [ ] `npm run check:cycles:ratchet` — innerhalb der festgelegten Obergrenze von `metrics.cycles` (der alleinige Aufruf von `check:cycles` wird bei jedem Zyklus mit 1 beendet, #15281)
- [ ] `npm run check:any-budget:t11` — innerhalb des Budgets
- [ ] `npm run check:route-validation:t06` — fehlerfrei
- [ ] `npm run check:node-runtime` — unterstützte Runtime-Untergrenze eingehalten (`>=22.22.2 <23`, `>=24.0.0 <27`, gemäß `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; abgestimmt auf `engines` in `package.json`)

### Tests

- [ ] `npm run test:unit` — erfolgreich
- [ ] `npm run test:vitest` — erfolgreich (MCP-Server, autoCombo, Cache)
- [ ] `npm run test:coverage` — Schwellenwert 60/60/60/60 erfüllt (Anweisungen/Zeilen/Funktionen/Verzweigungen)
- [ ] `npm run test:integration` — erfolgreich (wenn Änderungen DB/Handler betreffen)
- [ ] `npm run test:combo:matrix` — erfolgreich (Matrix der Combo-Strategien: weist die Auswahlentscheidungen aller 21 öffentlichen Routing-Strategien deterministisch nach; ausführen, wenn Combo-Routing, Strategieauflösung oder Fallback-Logik geändert werden)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **optional/manuell** (abgesicherter Smoke-Test gegen reale Upstreams; bezieht einen schreibgeschützten DB-Snapshot vom VPS `root@192.168.0.15`; greift auf reale Provider zu und verbraucht Guthaben; wird niemals in CI ausgeführt; wird ohne gesetzte Freigabe sauber übersprungen)
- [ ] `npm run test:combo:live:vps` — **optional/manuell** (Phase-3-VPS-Live-Smoke-Test: 7 HTTP-Szenarien gegen den laufenden `.15`-Server über reines Node ESM; erfordert `ssh root@192.168.0.15`; erstellt/löscht ausschließlich `__live_test__*`-Combos; greift auf reale Provider zu; wird niemals in CI ausgeführt)
- [ ] `npm run test:e2e` — erfolgreich (UI-Änderungen)
- [ ] `npm run test:protocols:e2e` — erfolgreich (MCP-/A2A-Änderungen)
- [ ] `npm run test:ecosystem` — erfolgreich

### Hooks (durch Husky validiert)

Husky-Hooks befinden sich in `.husky/` und werden bei Git-Operationen automatisch ausgeführt.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** schnelle deterministische Prüfungen — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiviert am 2026-06-13). Schließt `test:unit` bewusst aus (langsam; wird durch den CI-Job `test-unit` abgedeckt).
  - `npm run test:unit` vor dem Pushen von Release-Branches manuell ausführen.

Wenn ein Hook fehlschlägt: die zugrunde liegende Ursache beheben und die Prüfung nicht mit `--no-verify` umgehen.

### Conventional Commits

Alle für das Release vorgesehenen Commits müssen dem Format `type(scope): subject` entsprechen.

**Gültige Typen:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Gültige Scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Inkompatible Änderungen: `BREAKING CHANGE:`-Footer oder `!` nach dem Scope hinzufügen (z. B. `feat(api)!: drop /v0`).

### Dokumentation

- [ ] `npm run check:docs-sync` ist erfolgreich (wird automatisch durch pre-commit ausgeführt)
- [ ] `npm run check:docs-all` ist erfolgreich (Sammelprüfung: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` wird mit 0 beendet — der Umgebungsvariablen-Vertrag zwischen Code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` ist intakt
- [ ] `npm run check:doc-links` wird mit 0 beendet — nach Umstrukturierungen gibt es keine defekten internen Markdown-Verweise
- [ ] `docs/architecture/ARCHITECTURE.md` auf Abweichungen bei Speicher und Runtime geprüft
- [ ] `docs/guides/TROUBLESHOOTING.md` auf Abweichungen bei Umgebungsvariablen und Betrieb geprüft
- [ ] Falls `.env.example` geändert wurde: `docs/reference/ENVIRONMENT.md` aktualisiert
- [ ] Falls eine neue Funktion eine UI besitzt: `docs/guides/USER_GUIDE.md` erwähnt sie
- [ ] Falls eine neue Funktion eine API besitzt: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` aktualisiert
- [ ] Falls eine neue Funktion ein Modul ist: eine eigene Datei `docs/<MODULE>.md` ist vorhanden
- [ ] Bei inkompatiblen Änderungen: `docs/guides/TROUBLESHOOTING.md` enthält einen Migrationshinweis

### i18n

- [ ] `npm run i18n:check` wird mit 0 beendet — Übersetzungsstatus (`.i18n-state.json`) ist mit den Quelldokumenten synchron (keine abweichenden Quellen im strengen Modus; Hinweise im Warnmodus sind für kurzfristige Dokumentationskorrekturen akzeptabel, vor dem Tagging sollte das Ergebnis jedoch 0 sein)
- [ ] `npm run i18n:check-ui-coverage` wird mit 0 beendet — jede UI-Locale erreicht oder überschreitet die Mindestabdeckung von 80 %
- [ ] `npm run i18n:sync-ui:dry` meldet 0 fehlende Schlüssel für alle 66 Ziel-Locales (jede Locale außer der Quelle `en`)
- [ ] Falls englische Quelldokumente geändert wurden, vor dem Tagging `npm run i18n:run` ausführen (erfordert `OMNIROUTE_TRANSLATION_API_KEY` in `.env`)
- [ ] Übersetzungsbeiträge können bei geringfügigen Änderungen auf das nächste Release verschoben werden (im CHANGELOG nachverfolgen)

### Datenbankmigrationen

- [ ] Falls `src/lib/db/migrations/` neue Dateien enthält:
  - [ ] Jede Migration ist idempotent (`CREATE TABLE IF NOT EXISTS` usw.)
  - [ ] Migrationen sind in Transaktionen gekapselt
  - [ ] Korrekt nummeriert (keine Lücken in der Reihenfolge)
- [ ] Mit einer Neuinstallation testen: `~/.omniroute/omniroute.db` löschen und `npm run dev` ausführen
- [ ] Mit einer bestehenden Installation testen: DB sichern, Migration ausführen und Schema überprüfen
- [ ] WAL-Dateien (`-wal`, `-shm`) werden korrekt behandelt, wenn die Migration Tabellen neu schreibt

### Providerkatalog (Zod-validiert)

- [ ] Zod-Schema in `src/shared/constants/providers.ts` ist beim Laden gültig
  - [ ] Alle Provider besitzen die erforderlichen Felder (`id`, `label`, `kind` usw.)
  - [ ] `freeNote` ist für neue kostenlose Provider angegeben
  - [ ] Für OAuth-Provider ist `oauthConfig` in `src/lib/oauth/constants/oauth.ts` registriert
- [ ] Falls ein neuer Provider hinzugefügt wurde: entsprechender Executor in `open-sse/executors/`
- [ ] Falls kein OpenAI-Format verwendet wird: Übersetzer in `open-sse/translator/`
- [ ] Modelle sind in `open-sse/config/providerRegistry.ts` registriert
- [ ] Unit-Tests in `tests/unit/` decken die Provider-Klassifizierung und das Routing ab

### Desktop (Electron)

Falls `electron/` geändert wurde:

- [ ] `npm run electron:smoke:packaged` ist erfolgreich
- [ ] Builds wurden für mindestens eines von `:win`, `:mac`, `:linux` getestet
- [ ] Zertifikate zur Codesignierung sind nicht abgelaufen (falls signiert wird)
- [ ] Die Version in `electron/package.json` stimmt mit der im Stammverzeichnis enthaltenen `package.json` überein
- [ ] Der Zeiger des Auto-Update-Kanals wurde bei einer Veröffentlichung auf `stable` aktualisiert

### Build-Verzeichnisstruktur

Das Repository verwendet drei unterschiedliche Ausgabeverzeichnisse — sie dürfen niemals verwechselt werden:

| Verzeichnis | Zweck                                                                 | Versioniert?        |
| ----------- | --------------------------------------------------------------------- | ------------------- |
| `src/`      | Anwendungsquellcode (TypeScript / TSX)                                | Ja                  |
| `.build/`   | Build-Zwischenergebnisse — Ausgabe von `next build` (`distDir`)       | Nein (gitignoriert) |
| `dist/`     | Auslieferbares npm-Bundle — von `assembleStandalone` zusammengestellt | Nein (gitignoriert) |

> **Hinweis für Betreiber:** Das Image-Verzeichnis auf dem entfernten VPS bleibt `/usr/lib/node_modules/omniroute/app/`.
> Nur die Build-Ausgabe **innerhalb des Repositorys** wurde verschoben (`app/` → `dist/`). Die Deployment-Skills synchronisieren
> den Inhalt von `dist/` per rsync in das entfernte Verzeichnis `app/` — Änderungen an den VPS-Pfaden sind nicht erforderlich.

**Ablauf mit einem einzelnen Build:**

```
npm run build:release
  └─ rm -rf .build dist          (bereinigen)
  └─ next build → .build/next/   (Zwischenergebnisse)
  └─ assembleStandalone          (kopiert Standalone-Dateien + statische Dateien + öffentliche Dateien + native Module → dist/)
  └─ schreibt dist/BUILD_SHA     (HEAD-Prüfwert)
```

Führen Sie für das Deployment NICHT `npm run build` und anschließend separat `npm run build:cli` aus — verwenden Sie
`npm run build:release`, das einen sauberen Neuaufbau samt Prüfwert in einem einzigen Befehl durchführt.

### Artefaktvalidierung

- [ ] `npm run build:release` ist erfolgreich und `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` ist sauber — kein `app.__qa_backup`, `scripts/scratch`, `package-lock.json` oder andere lokale Rückstände
- [ ] `dist/server.js` ist nach dem Build vorhanden
- [ ] Optionaler lokaler Smoke-Test der paketierten Laufzeit: `npm run dev:candidate -- validate` startet nach `npm run dev:candidate -- build` das paketierte Tarball mit einem isolierten `DATA_DIR` und prüft `/api/health` + `/v1/models` (siehe [Goldener Pfad für Beiträge](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Tagging und Veröffentlichung

- [ ] `/generate-release-cc` ausführen (Claude-Code-Skill):
  - Erstellt das Tag `vX.Y.Z`
  - Pusht Tag und Branch
  - Erstellt eine GitHub-Veröffentlichung mit dem Changelog als Beschreibung
  - Hängt Electron-Installationsprogramme an (falls erstellt)
- [ ] Oder manuell:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deployment

Deployment-Skills verwenden den schlanken rsync-Ablauf — kein `npm pack`, kein `npm i -g`:

- [ ] Den zum Ziel passenden Deployment-Skill verwenden:
  - `/deploy-vps-local-cc` — lokaler VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai-VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — beide
- [ ] Vor dem Deployment bestätigen, dass `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Der Build muss dort ausgeführt werden, wo `node_modules` real vorhanden ist (Haupt-Checkout oder mit `npm ci` eingerichteter Worktree — KEIN Worktree mit symbolischer Verknüpfung)
- [ ] Smoke-Test der bereitgestellten Instanz:
  - `/dashboard/health` öffnen → prüfen, ob die Versionszeichenfolge mit der Veröffentlichung übereinstimmt
  - Eine `/v1/chat/completions`-Anfrage an einen bekannten Provider senden
  - Überprüfen, ob `/api/monitoring/health` den Status `CLOSED` für Circuit Breaker zurückgibt
  - Bestätigen, dass MCP-Transporte antworten (`/mcp` HTTP, `/mcp-sse` SSE)

### Nach der Veröffentlichung

- [ ] `/capture-release-evidences-cc` ausführen (Claude-Code-Skill)
  - Erstellt WebP-Screenshots/-Aufzeichnungen neuer Funktionen
  - Hängt sie an die Versionshinweise / den Blogbeitrag an
- [ ] GitHub Discussions / Discord mit der Veröffentlichungsankündigung aktualisieren
- [ ] Meilenstein für die nächste Version erstellen
- [ ] Falls kritisch: Diskussion anheften oder für ein In-App-Banner in `news.json` veröffentlichen

### Freigabekriterien für den öffentlichen Radar-Start

Die Radar-Ankündigung wird absichtlich mit `active: false` eingecheckt. Die Aktivierung erfolgt als separate
Änderung, nachdem für jeden der folgenden Punkte ein Nachweis vorliegt:

- [ ] Alle gestapelten Radar-PRs sind zusammengeführt und die Release-Tip-CI ist erfolgreich
- [ ] Die OSS-Radar-Routen bereitstellen und einem Smoke-Test unterziehen, während `RADAR_ENABLED` standardmäßig weiterhin deaktiviert ist
- [ ] `GET /planos`, `/termos`, `/privacidade` und `/reembolso` auf dem angegebenen Radar-Host einem Smoke-Test unterziehen
- [ ] Identität/Kontakt/Adresse des Betreibers und die vom Eigentümer genehmigte rechtliche Prüfung im privaten Dienst erfassen
- [ ] Stripe Checkout und den signierten Webhook ausschließlich im Testmodus testen
- [ ] Eine verschlüsselte Zustellung transaktionaler E-Mails mit dem genehmigten Absender/der genehmigten Domain testen
- [ ] Die Wiederherstellung eines Backups und einen beaufsichtigten Forschungslauf mit Budgetobergrenze nachweisen
- [ ] Die BRL/PIX-Prüfrichtlinie genehmigen, bevor Spendennachweise akzeptiert werden
- [ ] Den öffentlichen Checkout erst nach Erfüllung der vorherigen Freigabekriterien aktivieren und anschließend die neue `news.json`-ID aktivieren
- [ ] Überprüfen, ob das Banner auf der Startseite lokalisierten Text verwendet und eine neue ID wieder angezeigt wird, nachdem eine ältere ID verworfen wurde

## Smoke-Test für eingebettete Dienste (v3.8.4+)

Vor der Veröffentlichung eines Releases, das Änderungen an eingebetteten Diensten enthält, Folgendes überprüfen:

### Start mit frischer DB (erkennt Migrationskollisionen — nach dem v3.8.4-Hotfix hinzugefügt)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — 10 s auf den Start warten
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` gibt `"9router"` zurück (NICHT 404, NICHT 500). Bestätigt, dass die Migration `071_services.sql` angewendet und die Zeile eingefügt wurde.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` gibt 3 Zeilen zurück.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` gibt 2 Zeilen zurück (bestätigt, dass `070_webhooks_kind_metadata.sql` angewendet wurde).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` wird erfolgreich ausgeführt — schützt vor zukünftigen Kollisionen.

### 9Router

- [ ] `POST /api/services/9router/install` gibt innerhalb von 2 min den Status 200 mit `installedVersion` zurück
- [ ] `POST /api/services/9router/start` gibt innerhalb von 30 s den Status 200 und `state: "running"` zurück
- [ ] `GET /api/services/9router/status` meldet `health: "healthy"`
- [ ] `POST /v1/chat/completions` mit `"model": "9router/auto/..."` gibt den Status 200 zurück (End-to-End-Routing über 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` rendert die native Benutzeroberfläche von 9Router innerhalb des Proxys (kein direktes `127.0.0.1:port`-iframe)
- [ ] `POST /api/services/9router/rotate-key` gibt `{ keyRotated: true }` zurück und der Dienst wird ordnungsgemäß neu gestartet
- [ ] `POST /api/services/9router/stop` gibt den Status 200 und `state: "stopped"` zurück
- [ ] `GET /api/services/9router/logs?tail=50` gibt einen SSE-Stream mit einem `snapshot`-Ereignis zurück, das die letzten Zeilen enthält
- [ ] Die Installation in einer Umgebung ohne `npm` im PATH gibt den Status 500 mit einer verständlichen Fehlermeldung (ohne Stacktrace) zurück

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` gibt innerhalb von 2 min den Status 200 zurück
- [ ] `POST /api/services/cliproxy/start` gibt innerhalb von 30 s den Status 200 und `state: "running"` zurück
- [ ] `GET /api/services/cliproxy/status` meldet `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` gibt den Status 200 und `state: "stopped"` zurück
- [ ] `GET /api/services/cliproxy/logs?tail=50` gibt einen SSE-Stream zurück

### Sicherheitsregression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` gibt `403 LOCAL_ONLY` zurück
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` gibt `403 LOCAL_ONLY` zurück
- [ ] Fehlerantworten von `/api/services/*` enthalten weder `err.stack` noch absolute Dateipfade

## Prüfungen für v3.8.0+

Vor der Veröffentlichung eines v3.8.x-Releases diese zusätzlichen Punkte überprüfen:

- [ ] `omniroute --tray` startet unter macOS (systray2 wurde in `~/.omniroute/runtime/` installiert)
- [ ] `omniroute --tray` startet unter Linux (erfordert DISPLAY; verständliche Fehlermeldung, falls nicht festgelegt)
- [ ] `omniroute --tray` startet unter Windows (PowerShell NotifyIcon, keine zusätzlichen Binärdateien)
- [ ] `omniroute config tray enable` erstellt einen Autostart-Eintrag; die Deaktivierung entfernt ihn
- [ ] `npm install -g omniroute@<this-version>` führt postinstall ohne schwerwiegenden Abbruch aus
- [ ] Der Aktualisierungspfad behält optionale Abhängigkeiten bei: `omniroute update --apply` und der automatische Updater
      führen `npm install -g … --include=optional` aus, sodass `optionalDependencies` (better-sqlite3,
      keytar, tls-client und der llmlingua-SLM-Stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) eine Aktualisierung überstehen. Die Ultra-SLM-Stufe `modelPath` benötigt außerdem das
      tinybert-Modell, das bei der ersten Verwendung automatisch nach `${DATA_DIR}/models/llmlingua` heruntergeladen wird. Postinstall
      (`scripts/build/colocateOptionals.mjs`) legt anschließend den optionalen SLM-Abhängigkeitsbaum gemeinsam in
      `dist/node_modules` ab, sodass der Worker eine EINZIGE Instanz von `@huggingface/transformers` ^4.2.0
      auflöst — der eigenständige Trace bündelt nur transformers, nicht die dynamisch importierten
      optionalen Abhängigkeiten. Ohne dies würde der Worker llmlingua-2 mit transformers aus dem Stammverzeichnis laden
      und die SLM-Stufe würde unbemerkt im Fail-open-Modus ausfallen.
- [ ] `omniroute status` funktioniert ohne `.env` (CLI-Token-Pfad, nur Loopback)
- [ ] `curl http://localhost:20128/api/shutdown` gibt den Status 401 zurück (immer geschützte Route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` gibt den Status 401 zurück (Loopback-Schutz)
- [ ] Die SQLite-Laufzeit wird beim ersten Start als `bundled` aufgelöst (gebündelte Binärdatei ist für die Plattform gültig)
- [ ] Die SQLite-Laufzeit fällt auf `runtime` zurück, wenn `node_modules/better-sqlite3` gelöscht wird
- [ ] Der intelligente MCP-Filter komprimiert die reale Ausgabe von `playwright-mcp browser_snapshot` (Reduzierung um ≥50 %)
- [ ] Alle 10 Dateien unter `skills/omniroute*/SKILL.md` sind öffentlich über eine rohe GitHub-URL abrufbar
- [ ] Der Onboarding-Assistent zeigt bei einer neuen Einrichtung den Stufenüberblick „Funktionsweise“ an
- [ ] Das Stufenabdeckungs-Widget des Home-Dashboards zeigt die Anzahl der konfigurierten/aktiven Stufen an

---

## 3.9.0-LTS-Abzweigung (in 3.8.58 erprobt)

Nach v3.8.59 ist die nächste Version 3.9.0, und ihre Spitze wird zum Ausgangspunkt zweier langlebiger Branches:
`stable/v3` (die v3-LTS-Linie, npm `latest`) und `develop` (v4, auf 4.0.0 angehoben, npm
`nightly`). Das Branch-/Kanalmodell, der Forward-Port und die Labels sind in
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md) beschrieben; der Plan befindet sich in der [ROADMAP](../../ROADMAP.md) (Phase 3). Die Abzweigung wird einmal durchgeführt;
3.8.58 erprobt sie vollständig auf einem Fork, und 3.8.59 schließt mit der
[GO/NO-GO-Checkliste](./LTS_GO_NO_GO.md) ab.

### Probelauf (schreibgeschützt, jederzeit sicher)

```bash
npm run release:dry-run-lts-cut                       # die echte Abzweigung: 3.9.0 von HEAD, vorheriges Tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # Quell-Commit festlegen
```

`scripts/release/dry-run-lts-cut.mjs` führt nichts aus: Es liest git und `gh` aus und gibt die
gesamte Abfolge aus — Voraussetzungen (die Quelle kann aufgelöst werden, das Quell-Repository verfügt über den vollständigen Verlauf —
ein flacher Klon kann `stable/v3` nicht pushen, die empfangende Seite weist das Paket beim ersten
aufgepfropften Parent zurück; führen Sie die Abzweigung daher von einem vollständigen Klon aus oder führen Sie zuerst
`git fetch --unshallow origin` aus — das vorherige Tag ist vorhanden, `package.json` enthält die Zielversion, ein
`release-freeze`-Issue ist offen, es gibt kein offenes
`Release branch not green`-Issue
auf einem vorhandenen Release-Branch — ein nicht vorhandener Branch meldet `?` als unbekannt, niemals
grün — die Mergify-`release`-Queue ist konfiguriert (G11: `queue_rules`, `checks_timeout`,
Label `queue`), das `release/*`-Regelwerk blockiert weiterhin das Löschen und Force-Pushes, und
`stable/v3` sowie `develop` sind noch nicht vorhanden), die beiden Branch-Schritte, welche Trigger
inaktiver Workflows und `if:`-Bedingungen wahr werden (und welche weiterhin durch eine Repository-Variable
gesperrt oder auf das kanonische Repository festgelegt bleiben), die erwarteten Dist-Tags (`latest` → 3.9.0,
`next` und `nightly` leer) sowie das Rollback. Exit `0` = `RESULT: READY`, `1` = eine blockierende Voraussetzung
ist fehlgeschlagen (`✗`), `2` = Verwendungsfehler. `--advisory <id,...>` stuft eine Prüfung zu einer Warnung (`!`)
herab, ohne sie auszublenden.

Führen Sie den Probelauf der echten Abzweigung aus, solange der Release-Freeze für 3.9.0 noch aktiv ist — die Branches werden
nach dem Tag und bevor Phase 12c den Freeze aufhebt erstellt.

### 3.8.58-Erprobung (nur Fork)

```bash
# 1. Probelauf auf der aktuellen Spitze mit Erprobungsparametern
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Gegen ein FORK-Remote ausführen (origin oder jedes Remote, dessen URL dem kanonischen
#    Repository entspricht, wird abgelehnt; jeder Schritt fordert im Terminal eine Bestätigung an)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Die inaktiven Workflows im Fork durchlaufen lassen (workflow_dispatch, wenn der Probelauf
#    eine Festlegung auf das kanonische Repository meldet), anschließend zurücksetzen
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Der Commit zum Anheben von develop wird mit Git-Plumbing erstellt (der Arbeitsbaum bleibt unberührt) und hebt
dieselben fünf Dateien wie ein Commit zur Zykluseröffnung an: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` und `docs/openapi.yaml`. Der Abschnitt `[4.0.0]`
im CHANGELOG und seine i18n-Entsprechungen werden anschließend auf `develop` eröffnet, noch vor dessen erstem
PR. Das Skript ändert niemals npm-Dist-Tags — erproben Sie diese mit einem Wegwerf-Paket.

### PR-Vorschauartefakt (einmal bauen, dieselben Bytes übernehmen)

`.github/workflows/preview-artifact.yml` erstellt einen Produktions-Tarball von der Spitze eines PRs und
validiert exakt diesen Build (Ausschnitt (a) von #8084). Nur PRs aus demselben Repository; es wird nichts veröffentlicht.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # oder das Label `preview-artifact` hinzufügen
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # Vorschauinstallation
```

Der Lauf führt `npm ci`, `npm run build:release` und `npm run check:pack-artifact` aus, packt den
Tarball, führt `npm run check:pack-boot` aus (gefälschte Secrets, temporäres Datenverzeichnis), packt ihn
erneut und schlägt fehl, sofern der Digest nicht identisch ist. Anschließend zeichnet er
`artifact-identity.json` auf (Head-SHA, Base-SHA, Lockfile-Hash, Plattform, Architektur, Node-ABI,
Bundler, Build-Richtlinie — `scripts/release/artifact-identity.mjs`) und attestiert den Tarball in einem
separaten Job. Eine Vorschau zu übernehmen bedeutet, diesen Tarball zu installieren: niemals erneut aus
dem Quellcode bauen.

### Die Abzweigung (3.9.0, nach GO)

1. GO ist in [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md) festgehalten.
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` gibt `RESULT: READY` aus.
3. Erstellen Sie die Branches auf `origin` manuell mit den vom Probelauf ausgegebenen Befehlen — das
   Skript verweigert Pushes zu `origin`. Um einen geprüften develop-Commit wiederzuverwenden, führen Sie
   zunächst die `--execute`-Erprobung auf der 3.9.0-Spitze gegen Ihren Fork aus; sie gibt beide SHAs aus,
   und dieselben Commits können gepusht werden:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Schützen Sie `stable/v3` und `develop` (Regelsätze + Merge-Warteschlange), bevor der erste PR eingeht.
5. Die inaktiven Workflows werden durch die Existenz der Branches aktiviert: `forward-port.yml` (Push auf
   `stable/v3`), `validate-stable-pr.yml` (PRs für `stable/v3`) und `nightly-v4-build.yml`
   (baut `develop`). Legen Sie vor der Inbetriebnahme das Repository-Secret `secrets.FORWARD_PORT_TOKEN` fest (damit CI für
   Forward-Port-PRs ausgeführt wird); die nächtliche Veröffentlichung bleibt deaktiviert, bis der Verantwortliche die Repository-
   Variable `vars.NIGHTLY_PUBLISH` auf `true` setzt und npm Trusted Publishing
   `nightly-v4-build.yml` akzeptiert. Die Kanalauflösung erfolgt über `scripts/release/dist-tag.mjs`, denselben
   Resolver, den `npm-publish.yml` verwendet.
6. Überprüfen Sie die Kanäle: `npm view omniroute dist-tags --json` zeigt `latest` = 3.9.0 und kein
   `next` / `nightly`, bis v4 veröffentlicht wird.
7. Rollback, falls erforderlich: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   und `npm dist-tag add omniroute@3.8.59 latest`.

---

## Rollback

Wenn ein Release ein kritisches Problem aufweist:

1. `gh release edit vX.Y.Z --prerelease` (markiert es als nicht neueste Version)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (nur, wenn es noch nicht von Benutzern übernommen wurde)
3. Oder: Hotfix auf `release/vX.Y.0` → Patch-Release `vX.Y.(Z+1)`
4. Sofort in GitHub Discussions und Discord kommunizieren

## Strikte Regeln

- Niemals direkt nach `main` committen
- Niemals `git push --force` für `main` oder `release/*`-Branches verwenden
- Niemals Husky-Hooks überspringen (`--no-verify`)
- Niemals Secrets, Anmeldedaten oder `.env`-Dateien committen
- Die Testabdeckung muss bei ≥60/60/60/60 (Anweisungen/Zeilen/Funktionen/Verzweigungen) bleiben
- Bei Änderungen am Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` immer Tests hinzufügen oder aktualisieren

## Automatisierte Synchronisierungsprüfung

Vor dem Öffnen eines PR den Schutzmechanismus für die Dokumentationssynchronisierung lokal ausführen:

```bash
npm run check:docs-sync
```

CI führt diese Prüfung ebenfalls in `.github/workflows/ci.yml` (Lint-Job) aus.
