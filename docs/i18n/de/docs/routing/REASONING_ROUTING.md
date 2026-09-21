# Reasoning Routing (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Regeln für das Reasoning-Routing erweitern das bestehende Modell- und Combo-Routing. Wenn keine aktive Regel übereinstimmt, bleiben das bestehende Verhalten für Thinking, Suffixe, Verbindungsstandards und Provider-Übersetzungen unverändert.

## Verwaltung

Die Regelverwaltung ist unter **Einstellungen → Globales Routing** verfügbar. Der API-Schlüssel-Editor bietet dieselbe Verwaltungsoberfläche, gefiltert nach dem ausgewählten Schlüssel.

Die Verwaltungs-API wird über folgende Routen bereitgestellt:

- `GET` und `POST` unter `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` und `DELETE` unter `/api/settings/reasoning-routing-rules/[id]`
- `POST` unter `/api/settings/reasoning-routing-rules/simulate`

Alle Routen verwenden `requireManagementAuth`. Eingaben werden mit den Schemas in `src/shared/validation/schemas/reasoningRouting.ts` validiert. Der Simulator führt niemals einen Upstream-Aufruf durch.

## Regelauflösung

Die frühe Auswertung wählt genau eine Regel aus. Gültigkeitsbereiche werden in dieser Reihenfolge geprüft:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Innerhalb eines Gültigkeitsbereichs gewinnt zuerst die höhere `priority`, gefolgt von einer exakten Modellübereinstimmung gegenüber einem Glob-Muster und anschließend einer stabilen Sortierung nach `createdAt` und `id`. `requestTags` werden ausschließlich aus `metadata.tags` gelesen und unterstützen die Übereinstimmungsmodi `any` oder `all`.

Eine `connection`-Regel wird nur ausgewertet, wenn keine frühe Regel gewonnen hat und bereits eine konkrete Provider-Verbindung ausgewählt wurde. Sie darf nur Aufwand und Budget ändern.

## Aufwand und Budget

`sourceEffort` akzeptiert `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` und `ultra`. `missing` bedeutet, dass die Anfrage weder einen diskreten Aufwand noch einen Thinking-Schalter oder ein Thinking-Budget enthält. Ein ausschließliches Budgetsignal wird daher nur von `any` erfasst.

`effortMode` hat drei Varianten:

- `inherit` behält den Aufwand des Clients bei, erlaubt aber weiterhin eine Änderung des Modells oder der Combo.
- `default` setzt `targetEffort` nur, wenn kein explizites Reasoning-Signal vorhanden ist.
- `force` ersetzt den diskreten Aufwand durch `targetEffort`.

Unabhängig davon kann `budgetAction` den Wert `preserve`, `remove` oder `set` haben. `force` mit `none` entfernt alle erkannten Aufwands- und Budgetfelder. `none` zusammen mit `set` ist ungültig.

Anfragen an bekanntermaßen inkompatible Modelle werden vor dem Upstream-Aufruf abgelehnt. Bei Combo-Zielen werden inkompatible Einträge entfernt; wenn keine Einträge übrig bleiben, gibt die Anfrage den Status `400` zurück. Unbekannte Fähigkeitsdaten erzeugen eine Warnung und lassen die Regel aktiv.

## Sicherheit und Übertragungswege

Das Quell- und Zielmodell beziehungsweise die Quell- und Ziel-Combo unterliegen weiterhin der bestehenden API-Schlüsselrichtlinie. Eine Reasoning-Regel erweitert niemals Modell-, Combo- oder Kontingentberechtigungen.

Die Engine ist in Chat Completions, Responses, Anthropic Messages und den internen Codex-WebSocket-Pfad integriert. Der WebSocket-Pfad akzeptiert nur Codex-Zielmodelle; Combo-Ziele können dort nicht ausgeführt werden. Die Regelentscheidung wird ohne Geheimnisse im bestehenden Routing-Trace gespeichert.

## Persistenz

Die Migration `src/lib/db/migrations/126_reasoning_routing_rules.sql` erstellt die Tabelle `reasoning_routing_rules`. Regeln verweisen auf gespeicherte API-Schlüssel, Combos und Provider-Verbindungen. Beim Löschen werden zugehörige Regeln bereinigt. Die Datenbankzugriffsschicht in `src/lib/db/reasoningRoutingRules.ts` verwaltet einen invalidierbaren Cache für den Anfragepfad.

Regeln sind in SQLite-Sicherungen, im vollständigen Datenbankexport und im Config-Sync-Bundle enthalten. `reconcileReasoningRulesForSync` deaktiviert importierte Regeln mit fehlenden Referenzen und meldet diese Konflikte.
