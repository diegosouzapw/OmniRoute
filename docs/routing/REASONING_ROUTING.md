# Reasoning Routing

Reasoning-Routing-Regeln ergänzen das bestehende Modell- und Combo-Routing. Wenn keine aktive
Regel passt, bleibt die bisherige Thinking-, Suffix-, Verbindungsdefault- und
Provider-Übersetzungslogik unverändert.

## Verwaltung

Die Regelverwaltung befindet sich unter **Settings → Global Routing**. Im API-Key-Editor steht
dieselbe Verwaltung gefiltert auf den ausgewählten Schlüssel zur Verfügung.

Die Management-API wird von diesen realen Routen bereitgestellt:

- `GET` und `POST` unter `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` und `DELETE` unter `/api/settings/reasoning-routing-rules/[id]`
- `POST` unter `/api/settings/reasoning-routing-rules/simulate`

Alle Routen verwenden `requireManagementAuth`. Die Eingaben werden mit den Schemas in
`src/shared/validation/schemas/reasoningRouting.ts` validiert. Der Simulator führt keinen
Upstream-Aufruf aus.

## Regelauflösung

Die frühe Auswertung wählt genau eine Regel. Die Ebenen werden in dieser Reihenfolge geprüft:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Innerhalb einer Ebene entscheidet zuerst die höhere `priority`, dann ein exakter Modelltreffer
vor einem Glob-Muster und anschließend stabil `createdAt` und `id`. `requestTags` stammen
ausschließlich aus `metadata.tags` und verwenden `any`- oder `all`-Matching.

Eine `connection`-Regel wird nur ausgewertet, wenn keine frühe Regel gewonnen hat und bereits
eine konkrete Provider-Verbindung ausgewählt wurde. Sie darf nur Effort und Budget ändern.

## Effort und Budget

`sourceEffort` akzeptiert `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` und
`ultra`. `missing` bedeutet, dass der Request weder einen diskreten Effort noch ein
Thinking-Toggle oder Thinking-Budget enthält. Ein reines Budgetsignal wird daher nur von
`any` erfasst.

`effortMode` hat drei Varianten:

- `inherit` übernimmt den Client-Effort und kann trotzdem das Modell oder eine Combo ändern.
- `default` setzt `targetEffort` nur, wenn kein explizites Reasoning-Signal vorhanden ist.
- `force` ersetzt den diskreten Effort durch `targetEffort`.

`budgetAction` ist unabhängig davon `preserve`, `remove` oder `set`. `force` mit `none` entfernt
alle erkannten Effort- und Budgetfelder. `none` zusammen mit `set` ist ungültig.

Für bekannte inkompatible Modelle wird der Request vor dem Upstream abgelehnt. Bei Combo-Zielen
werden inkompatible Einträge entfernt; bleibt kein Eintrag übrig, antwortet der Request mit
Status `400`. Unbekannte Capability-Daten erzeugen eine Warnung und lassen die Regel aktiv.

## Sicherheit und Transporte

Das Quell- und Zielmodell beziehungsweise die Quell- und Ziel-Combo bleiben an die vorhandene
API-Key-Policy gebunden. Eine Reasoning-Regel erweitert keine Modell-, Combo- oder
Quota-Berechtigung.

Die Engine ist in Chat Completions, Responses, Anthropic Messages und dem internen
Codex-WebSocket-Pfad eingebunden. Der WebSocket-Pfad akzeptiert nur Codex-Zielmodelle;
Combo-Ziele sind dort nicht ausführbar. Die Regelentscheidung wird ohne Secrets im vorhandenen
Route Trace gespeichert.

## Persistenz

Die Migration `src/lib/db/migrations/123_reasoning_routing_rules.sql` erstellt die Tabelle
`reasoning_routing_rules`. Regeln referenzieren gespeicherte API-Keys, Combos und
Provider-Verbindungen. Löschungen räumen zugehörige Regeln auf. Der DB-Zugriff in
`src/lib/db/reasoningRoutingRules.ts` hält ein invalidierbares Cache-Abbild für den Request-Pfad.

Regeln werden in SQLite-Backups, dem vollständigen DB-Export und dem Config-Sync-Bundle
berücksichtigt. `reconcileReasoningRulesForSync` deaktiviert importierte Regeln mit fehlenden
Referenzen und meldet dafür Konflikte.
