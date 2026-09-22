# Homologation Suite (`npm run homolog`) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E-Validierung der auf dem Homologations-VPS laufenden OmniRoute-Bereitstellung in einer realen Umgebung
(`HOMOLOG_BASE_URL`, z. B. `http://192.168.0.15:20128`). Ein einziger Befehl ersetzt die manuelle
Release-STOP-#2-Checkliste durch einen automatisierten Lauf, der Nachweise erzeugt.

## Abgedeckte Bereiche

| Ebene                      | Geprüfte Aspekte                                                                                                                                                                                                                        | Implementierung                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — Integrität/Parität    | `/api/monitoring/health` antwortet mit `200`, `status: "healthy"` und der erwarteten Version                                                                                                                                            | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — temporärer Schlüssel | Admin-Anmeldung → `POST /api/keys` erstellt einen bereichsbeschränkten API-Schlüssel für den Lauf, der unabhängig vom Ergebnis in einem `finally`-Block widerrufen wird (`DELETE /api/keys/:id`)                                        | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-Oberfläche       | `/v1/models`-Katalog, eine echte nicht streamende Chat-Vervollständigung (für die Stufe kritisches Modell, `max_tokens: 5`), eine `401` bei ungültigem Schlüssel sowie der öffentliche Endpunkt `/api/monitoring/health`                | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-Streaming        | Echte streamende Chat-Vervollständigung; prüft `text/event-stream`, mindestens ein Inhalts-Delta und einen `[DONE]`-Terminator                                                                                                          | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — reale Anbieter        | Eine Chat-Anfrage mit minimalen Kosten pro kritischem Anbieter, der im aktiven `/v1/models`-Katalog vorhanden ist; wird dynamisch über promptfoo generiert                                                                              | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI-Authentifizierung | Meldet sich einmal über das echte Anmeldeformular an und verwendet die Sitzung (`storageState`) über die gesamte UI-Ebene hinweg wieder                                                                                                 | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI-Routen            | Jede statische `page.tsx` unter `src/app/(dashboard)/dashboard` (aus dem Dateisystem ermittelt; dynamische `[param]`-Routen werden übersprungen) wird ohne HTTP-Fehler, Seitenfehler oder Next.js-Fehlergrenze geladen                  | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritischer UI-Ablauf | Erstellt über die Dashboard-Benutzeroberfläche einen API-Schlüssel und widerruft ihn anschließend wieder (hinterlässt keine Rückstände auf dem VPS)                                                                                     | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — einheitlicher Bericht | Führt httpYac (über `junit-to-ctrf`), den promptfoo→CTRF-Adapter und den Playwright-CTRF-Reporter in einer einzigen Datei `homolog-ctrf.json` zusammen und erstellt zusätzlich den menschenlesbaren Bericht `homolog-report/summary.md` | `scripts/homolog/run.mjs`                                                     |

Keine Beteiligung eines LLM an der Wiederholung selbst — dies ist eine deterministische Regressions-Testbatterie,
keine Evaluierung. KI kommt nur bei zukünftigen Wartungsarbeiten zum Einsatz (siehe Roadmap unten).

## Voraussetzungen

1. Kopiere `.env.homolog.example` nach `.env.homolog` (wird von Git ignoriert — niemals committen) und trage Folgendes ein:
   - `HOMOLOG_BASE_URL` — das Ziel-Deployment, z. B. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — das Dashboard-Verwaltungspasswort für dieses Deployment.
   - `HOMOLOG_CRITICAL_PROVIDERS` — kommagetrennte Provider-Präfixe, für die eine echte
     Smoke-Chat-Anfrage ausgeführt wird (z. B. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — bei normalen Durchläufen leer lassen; die Suite erstellt und widerruft ihren
     eigenen temporären Schlüssel. Nur setzen, um eine einzelne Ebene isoliert zu debuggen.
2. Führe `npm install` im Repository aus (die Abhängigkeiten der Suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — sind reguläre devDependencies).
3. Führe `npx playwright install` aus, falls die Browser-Binärdateien noch nicht vorhanden sind.

## Ausführung

```bash
npm run homolog
```

Um ein Deployment zu validieren, dessen Version nicht mit der lokalen `package.json`
übereinstimmt (z. B. eine Homologationsumgebung, die noch eine frühere Patch-Version verwendet), überschreibe die erwartete
Version explizit:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Der Durchlauf wird mit einem Exit-Code ungleich null beendet, wenn eine Ebene fehlschlägt, und versucht stets, den erstellten temporären
API-Schlüssel zu widerrufen, selbst bei einem Fehler (`finally`-Block in `scripts/homolog/run.mjs`).

## Bericht auswerten

Die gesamte Ausgabe wird unter `homolog-report/` abgelegt (wird von Git ignoriert):

- `summary.md` — dieselbe Tabelle, die auf stdout ausgegeben wird, mit einer Zeile pro Ebene (✅/❌ + Details).
- `homolog-ctrf.json` — der vereinheitlichte CTRF-Bericht (Zusammenführung der API-/SSE-, Provider-Smoke- und
  UI-Ergebnisse) — dies ist das Artefakt, das an eine STOP-#2-Checkliste für ein Release angehängt werden muss.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — die
  Roh-/Zwischenberichte der einzelnen Ebenen.
- `promptfooconfig.yaml`, `provider-misses.json` — die generierte promptfoo-Konfiguration für
  den aktuellen Durchlauf sowie alle kritischen Provider, die im Live-Katalog fehlten.

Ein Fehler in L0 bricht den Vorgang sofort ab (es wird kein temporärer Schlüssel erstellt), da eine Abweichung bei Version oder Systemzustand
bedeutet, dass jede nachgelagerte Ebene das falsche Deployment validieren würde.

## Erneute Baseline-Erstellung bei legitimen UI-Änderungen

L4b (Routen-Smoke-Test) und L4c (UI-Ablauf für API-Schlüssel) basieren auf echten DOM-Locators und nicht auf
Snapshots. Daher erfordern die meisten legitimen UI-Änderungen keine Aktualisierung der Suite. Wenn eine Änderung
doch einen Locator unbrauchbar macht (z. B. eine umbenannte Schaltflächenbeschriftung oder eine verschobene Einstellungsseite):

1. Überprüfe den Locator erneut anhand des aktuellen Quellcodes (die Spezifikationen dokumentieren bereits, anhand welcher
   Datei/Zeile jeder Locator bestätigt wurde — folge demselben Muster, nicht raten).
2. Aktualisiere die Spezifikation in `tests/homolog/ui/`.
3. Führe `npm run homolog` (oder nur die betroffene Playwright-Spezifikation) erneut gegen den VPS aus, um
   die Korrektur zu bestätigen, und committe sie anschließend.

Diese Suite enthält keine visuelle/Pixel-Baseline (F1) — siehe Roadmap.

## Roadmap (F2 / F3)

Design und phasenweise Einführung sind in der internen Planungsspezifikation
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` dokumentiert (nicht verlinkt — internes
`_tasks/`-Artefakt, kein Bestandteil der versionierten Dokumentation dieses Repositorys). Zusammenfassung:

- **F2** — vollständige Aufzeichnung des Durchlaufs → Playwright Test Agents (`planner`/`generator`)
  wandeln sie in Ablaufspezifikationen um (Kombination erstellen, Provider testen, Einstellungen bearbeiten, MCP-Tools) +
  visuelle Regressions-Baseline (Lost Pixel) mit Masken über dynamischen Daten (Metriken,
  Zeitstempel, Protokolle) + eine `healer`-Wartungsroutine pro Release.
- **F3** — Abdeckung für Resilienz, Verträge und Integration: toxiproxy + ein simuliert bereitgestellter OpenAI-kompatibler
  Provider auf der Devbox, eine `homolog-resilience`-Kombination auf dem VPS, die darauf verweist
  (injiziertes Timeout → Fallback + Öffnen/Schließen des Leistungsschutzschalters über
  `/api/monitoring/health` prüfen); abgesicherte Schemathesis-Vertragstests gegen
  `docs/openapi.yaml` (niedriger Wert für `--max-examples`, feste Seeds, nur Nicht-LLM-Endpunkte); und
  Integration von `npm run homolog` + zugehöriger `summary.md` in die STOP-#2-Phase von `/generate-release`.
