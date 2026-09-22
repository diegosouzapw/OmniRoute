# OmniRoute MCP Server Documentation (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model-Context-Protocol-Server mit 110 Tools für Routing-, Cache-, Komprimierungs-, Speicher-, Skill-, Proxy-, Pool-, Radar- und Kontextquellenoperationen.
>
> Maßgebliche Quelle: `open-sse/mcp-server/server.ts` berechnet mit `countUniqueMcpTools()` **110 eindeutige Tools**: 45 kanonische Definitionen (einschließlich der sechs CCR-Lifecycle-Tools, des Agent-Skills-Trios, `omniroute_radar_catalog` und `omniroute_x_search`), plus Speicher (3), Skills (4), GitHub-Skills (3), Pool (6), Gamification (8), Plugins (8), Notion (6), Obsidian (22), lokaler Korpus (3) und zwei ausschließlich für RTK verfügbare Komprimierungstools.

## Installation

OmniRoute MCP ist integriert. Starten Sie es mit:

```bash
omniroute --mcp
```

Oder über den open-sse-Transport:

```bash
# HTTP-Stream-Transport (Port 20130)
omniroute --dev  # MCP startet automatisch am /mcp-Endpunkt
```

Die HTTP-Transporte (`sse` / `streamable-http`, die prozessintern vom Dashboard-Server bereitgestellt werden) sind
standardmäßig deaktiviert und konnten zuvor nur über die Seite `/dashboard/mcp` umgeschaltet werden. Seit v3.8.51
bietet die CLI dieselben Funktionen:

```bash
omniroute mcp status                                  # aktiviert/online, Transport, Tool-Anzahl
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # setzt aktive sse-/streamable-http-Sitzungen zurück
```

`mcp enable`/`mcp disable` führen einen PATCH auf dieselbe Einstellung `mcpEnabled` (und optional `mcpTransport`) aus,
die das Dashboard über `/api/settings` umschaltet. `mcp restart` ruft `POST /api/mcp/restart` auf: Der Befehl beendet
aktive `sse`-/`streamable-http`-Sitzungen, sodass die nächste Anfrage eine saubere Neuinitialisierung ausführt, gibt
`409` zurück, wenn MCP deaktiviert ist, und `501` für den `stdio`-Transport (stdio-Clients verwalten ihren eigenen
Unterprozess — es gibt kein prozessinternes Handle, das neu gestartet werden könnte).

## Transporte

Der MCP-Server stellt drei Transporte bereit, die alle auf derselben `createMcpServer()`-Factory basieren:

| Transport         | Ort                                          | Verwendung                                                    |
| :---------------- | :------------------------------------------- | :------------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`              | IDE-Integrationen (Claude Desktop, Cursor usw.)               |
| `sse`             | `POST/GET /api/mcp/sse` über `httpTransport` | Browser-/Agent-Clients, die einen Ereignisstream benötigen    |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | HTTP-Clients mit mehreren Sitzungen (`mcp-session-id`-Header) |

Der aktive HTTP-Transport (`sse` oder `streamable-http`) wird durch die Einstellung `mcpTransport` ausgewählt. Beim Wechsel des Transports werden bestehende Sitzungen des jeweils anderen Transports geschlossen.

### Remote-Zugriff (Umgehung über den manage-Scope)

`/api/mcp/*` befindet sich in der Stufe LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — standardmäßig können nur Loopback-Hosts (`localhost`, `127.0.0.1`, `::1`) darauf zugreifen. Seit v3.8.2 können Nicht-Loopback-Clients eine Verbindung herstellen, wenn sie einen `Authorization: Bearer <api-key>` übermitteln, dessen Schlüssel den Scope `manage` besitzt. Dies ist die einzige Möglichkeit, den Remote-MCP-Server über einen Tunnel, Reverse-Proxy oder öffentlichen Hostnamen zu erreichen.

```bash
# manage-Scope gewähren: Öffnen Sie im Dashboard die Seite für API-Schlüssel und aktivieren Sie
# „Management Access“ für den Schlüssel oder übermitteln Sie beim Erstellen per POST scopes:["manage"].

# Stellen Sie anschließend von einem Remote-MCP-Client eine Verbindung her:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ein Schlüssel ohne `manage`-Scope (oder eine Anfrage ohne Bearer-Token) gibt `403 LOCAL_ONLY` zurück. Das benachbarte Präfix `/api/cli-tools/runtime/*` kann absichtlich NICHT umgangen werden — siehe [Route-Guard-Stufen — Ausnahme für den manage-Scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-Konfiguration

Siehe [MCP-Client-Konfiguration](../guides/SETUP_GUIDE.md#mcp-client-configuration) für die Einrichtung von Claude Desktop,
Cursor, Cline und kompatiblen MCP-Clients.

---

## Wesentliche Tools (14) — Phase 1

| Tool                            | Berechtigungsbereiche | Beschreibung                                                                                                                              |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Betriebszeit, Arbeitsspeicher, Schutzschalter, Ratenbegrenzungen, Cache-Statistiken                                                       |
| `omniroute_list_combos`         | `read:combos`         | Alle konfigurierten Kombinationen mit Strategien (optionale Metriken)                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | Leistungsmetriken für eine bestimmte Kombination                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | Eine Kombination aktivieren oder deaktivieren                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Eine validierte Kombination über die bestehende Kombinations-API erstellen                                                                |
| `omniroute_check_quota`         | `read:quota`          | Verbrauchtes/gesamtes Kontingent, verbleibender Prozentsatz, Rücksetzzeitpunkt, Token-Status                                              |
| `omniroute_route_request`       | `execute:completions` | Eine Chat-Vervollständigung über das OmniRoute-Routing senden                                                                             |
| `omniroute_cost_report`         | `read:usage`          | Kostenbericht nach Zeitraum (Sitzung/Tag/Woche/Monat)                                                                                     |
| `omniroute_list_models_catalog` | `read:models`         | Vollständiger Modellkatalog mit Funktionen, Status und Preisen                                                                            |
| `omniroute_radar_catalog`       | `read:radar`          | Lokaler signierter Radar-Katalog; optionale Filter nach Anbieter/Familie                                                                  |
| `omniroute_tool_search`         | `read:tools`          | Tools aus dem registrierten MCP-Katalog finden                                                                                            |
| `omniroute_web_search`          | `execute:search`      | Websuche über die konfigurierten Suchanbieter. Nicht für X/Twitter.                                                                       |
| `omniroute_x_search`            | `execute:search`      | X über xAI/SuperGrok durchsuchen oder `xquik-search` für Xquik-API-Ergebnisse wählen. Erfordert Anmeldedaten für das ausgewählte Backend. |
| `omniroute_web_fetch`           | `execute:search`      | Webinhalte über die konfigurierten Abrufanbieter abrufen                                                                                  |

## Erweiterte Tools (11) — Phase 2

| Tool                               | Berechtigungen                       | Beschreibung                                                                                                  |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Dry-Run-Routing-Simulation mit Fallback-Baum                                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Sitzungsbudget mit Aktion zum Herabstufen, Blockieren oder Warnen                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Combo-Strategie zur Laufzeit aktualisieren (Priorität/gewichtet/automatisch usw.)                             |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Resilienz-Voreinstellung `aggressive` / `balanced` / `conservative` anwenden                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Live-Test jedes Providers in einer Combo mithilfe eines echten Upstream-Aufrufs                               |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriken pro Provider mit p50-/p95-/p99-Latenz und Circuit-Breaker-Status                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Combo anhand des Aufgabentyps unter Berücksichtigung von Budget- und Latenzbeschränkungen empfehlen           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Erklären, warum eine Anfrage an einen Provider weitergeleitet wurde (Bewertungsfaktoren + Fallbacks)          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Vollständige Sitzungsmomentaufnahme: Kosten, Token, Top-Modelle/-Provider, Fehler, Budgetüberwachung          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Datenbankabweichungen wie defekte Combo-Referenzen/verwaiste Zeilen diagnostizieren (und optional reparieren) |
| `omniroute_sync_pricing`           | `pricing:write`                      | Preisdaten aus externen Quellen (LiteLLM) synchronisieren; unterstützt `dryRun`                               |

## Cache-Tools (2)

| Tool                    | Berechtigungen | Beschreibung                                                   |
| :---------------------- | :------------- | :------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`   | Statistiken zu semantischem Cache, Prompt-Cache und Idempotenz |
| `omniroute_cache_flush` | `write:cache`  | Cache global oder nach Signatur/Modell leeren                  |

## Komprimierungs-Tools (13)

| Tool                                | Berechtigungen      | Beschreibung                                                                                                                                         |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Komprimierungseinstellungen, Analyseübersicht und Cache-bezogene Statistiken (einschließlich `analytics.mcpDescriptionCompression`-Metadaten)        |
| `omniroute_compression_configure`   | `write:compression` | Komprimierungsmodus, Schwellenwert, Zielverhältnis, Beibehaltung des System-Prompts und Umschaltung der MCP-Beschreibungskomprimierung konfigurieren |
| `omniroute_set_compression_engine`  | `write:compression` | Aktive Engine (off/caveman/rtk/stacked) sowie Caveman-/RTK-Intensität auswählen                                                                      |
| `omniroute_list_compression_combos` | `read:compression`  | Benannte Komprimierungs-Combos und deren Engine-Pipelines auflisten                                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Nach Komprimierungs-Combo und Engine gruppierte Analysen                                                                                             |
| `omniroute_ccr_store`               | `write:compression` | Aufruferisolierte Inhalte im begrenzten In-Memory-CCR-Speicher ablegen und eine Markierung sowie eine `ccr://`-Referenz zurückgeben                  |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR-Inhalte vollständig oder im Kopf-, Ende-, Zeilen-, grep- und Statistikmodus abrufen                                                              |
| `omniroute_ccr_inspect`             | `read:compression`  | Aufrufereigene CCR-Metadaten prüfen, ohne Inhalte zurückzugeben                                                                                      |
| `omniroute_ccr_list`                | `read:compression`  | Paginierte Metadaten für aufrufereigene CCR-Blöcke auflisten                                                                                         |
| `omniroute_ccr_delete`              | `write:compression` | Einen aufrufereigenen CCR-Block löschen                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Auf den Aufrufer bezogene Speichernutzung, Lebenszykluszähler und Speicherlimits melden                                                              |
| `omniroute_rtk_discover`            | `read:compression`  | Wiederkehrendes Rauschen in freiwillig bereitgestellten RTK-Ausgabebeispielen erkennen                                                               |
| `omniroute_rtk_learn`               | `read:compression`  | Einen überprüfbaren RTK-Filterentwurf aus freiwillig bereitgestellten Beispielen erzeugen                                                            |

CCR-Einträge werden ausschließlich im Arbeitsspeicher vorgehalten und gehen bei einem Neustart verloren. Jeder Block ist auf 2 MiB, jeder
Principal auf 16 MiB und der globale Speicher auf 64 MiB begrenzt. Einträge haben standardmäßig eine TTL von 24 Stunden (maximal
sieben Tage). Der vollständige MCP-Abruf ist auf 256 KiB begrenzt; größere Blöcke bleiben über die
Bereichs- und grep-Modi verfügbar. Speicherung, Abruf, Auflistung, Prüfung, Löschung und Statistiken sind nach
dem authentifizierten API-Key-Principal isoliert. Audit-Datensätze enthalten Hashes und Größenmetadaten, niemals Inhalte.

`omniroute_compression_status` meldet die Komprimierung von MCP-Beschreibungen separat unter
`analytics.mcpDescriptionCompression`. Diese Werte sind Schätzungen der Metadatengröße für auflistbare
MCP-Beschreibungen (`tools`, `prompts`, `resources` und `resourceTemplates`); sie sind keine Nutzungsbelege
des Providers und mit `source: "mcp_metadata_estimate"` gekennzeichnet.

### MCP-Accessibility-Tree-Filter (v3.8.0)

Unabhängig von den oben genannten Komprimierungstools enthält OmniRoute einen Filter zur Nachbearbeitung,
der die **Tool-Ergebnisse** von MCP-Browser-/Accessibility-Tools komprimiert, bevor sie an den
Agenten zurückgegeben werden. Dieser Filter ist selbst kein Tool – er wird transparent auf jedes Tool-Ergebnis
angewendet, das ausführlichen Accessibility-Tree- oder Browser-Snapshot-Text enthält (≥2000 Zeichen).

Wichtige Verhaltensweisen:

- Fasst ≥30 aufeinanderfolgende, wiederholte Geschwisterzeilen zu einer Zusammenfassung aus Anfang und Ende zusammen
- Behält die von Playwright/Computer-Use benötigten `[ref=eXX]`-Anker bei
- Kürzt übergroßen Text (>50.000 Zeichen) hart und fügt einen Navigationshinweis hinzu
- Erwartete Einsparungen: **60–80 %** bei Browser-Snapshot-Nutzdaten

Konfiguration: `compression.mcpAccessibility` in den globalen Einstellungen (Migration 056).
Implementierung: `open-sse/services/compression/engines/mcpAccessibility/`.
Vollständige Dokumentation: [Komprimierungs-Engines — MCP-Accessibility-Tree-Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Weitere Informationen zum Laufzeit-Komprimierungsmodell hinter diesen Tools finden Sie unter [Komprimierungs-Engines](../compression/COMPRESSION_ENGINES.md) und [RTK-Komprimierung](../compression/RTK_COMPRESSION.md).

## 1Proxy-Tools (3)

| Tool                        | Berechtigungen | Beschreibung                                                                                 |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Kostenlose Proxys vom 1proxy-Marktplatz abrufen (Filter für Protokoll/Land/Qualität/Anzahl)  |
| `omniroute_oneproxy_rotate` | `read:proxies` | Den nächsten verfügbaren Proxy gemäß Strategie (`random` / `quality` / `sequential`) abrufen |
| `omniroute_oneproxy_stats`  | `read:proxies` | Pool-Statistiken, Synchronisierungsstatus sowie Verteilung nach Protokoll und Land           |

## Speicher-Tools (3)

Definiert in `open-sse/mcp-server/tools/memoryTools.ts`. Authentifizierung und Berechtigungen werden über die standardmäßige MCP-Berechtigungspipeline durchgesetzt.

| Tool                      | Berechtigungen | Beschreibung                                                                                              |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Speicherinhalte nach Abfrage / Typ / API-Schlüssel unter Einhaltung des Token-Budgets durchsuchen         |
| `omniroute_memory_add`    | `write:memory` | Einen neuen Speichereintrag hinzufügen (`factual` / `episodic` / `procedural` / `semantic`)               |
| `omniroute_memory_clear`  | `write:memory` | Speicherinhalte für einen API-Schlüssel löschen, optional nach Typ oder `olderThan`-Zeitstempel gefiltert |

## Skill-Tools (4)

Definiert in `open-sse/mcp-server/tools/skillTools.ts`. Unterstützt durch `src/lib/skills/registry` + `src/lib/skills/executor`.

| Tool                          | Berechtigungen   | Beschreibung                                                                                            |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Registrierte Skills mit optionaler Filterung nach API-Schlüssel, Name oder Aktivierungsstatus auflisten |
| `omniroute_skills_enable`     | `write:skills`   | Einen bestimmten Skill anhand seiner ID aktivieren oder deaktivieren                                    |
| `omniroute_skills_execute`    | `execute:skills` | Einen Skill mit der bereitgestellten Eingabe ausführen und den Ausführungsdatensatz zurückgeben         |
| `omniroute_skills_executions` | `read:skills`    | Den Verlauf der letzten Skill-Ausführungen auflisten                                                    |

## Notion-Kontextquelle (6)

Definiert in `open-sse/mcp-server/tools/notionTools.ts`. Das Token wird über `src/lib/db/notion.ts` in der Tabelle `key_value` gespeichert. REST-Client in `src/lib/notion/api.ts`. Einstellungs-API in `src/app/api/settings/notion/route.ts`. Dashboard-Benutzeroberfläche in `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurieren Sie Ihr Notion-Integrationstoken über die Registerkarte **Kontextquellen** im Endpoint-Dashboard oder über die REST-API:

```bash
# Token festlegen
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Status prüfen
curl http://localhost:20128/api/settings/notion

# Verbindung trennen
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tool                         | Berechtigungen | Beschreibung                                                                           |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Volltextsuche über alle Seiten und Datenbanken hinweg                                  |
| `notion_get_page`            | `read:notion`  | Eine Seite anhand ihrer ID einschließlich ihrer Eigenschaften abrufen                  |
| `notion_list_block_children` | `read:notion`  | Die untergeordneten Blöcke einer Seite oder eines Blocks auflisten                     |
| `notion_query_database`      | `read:notion`  | Eine Datenbank mit Filtern, Sortierungen und Paginierung abfragen                      |
| `notion_get_database`        | `read:notion`  | Das Datenbankschema anhand der ID abrufen                                              |
| `notion_append_blocks`       | `write:notion` | Untergeordnete Blöcke an einen übergeordneten Block anhängen (maximal 100 pro Anfrage) |

## Tools für den Agent-Skill-Katalog (3)

Definiert in `open-sse/mcp-server/tools/agentSkillTools.ts`. Unterstützt durch `src/lib/agentSkills/catalog`. Diese Tools stellen den aus 45 Einträgen bestehenden Dokumentationskatalog für Agent Skills MCP-Clients und externen Agenten zur Verfügung. Berechtigungsumfang: `read:catalog`.

| Tool                              | Berechtigungsumfänge | Beschreibung                                                                                                                                                          |
| :-------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog`       | Listet alle 45 Agent Skills mit optionalen Filtern für `category` (api\|cli) und `area` auf; gibt Metadaten und Abdeckung zurück                                      |
| `omniroute_agent_skills_get`      | `read:catalog`       | Ruft anhand der kanonischen `id` die vollständigen Metadaten und den Inhalt von SKILL.md für einen einzelnen Skill ab                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog`       | Abdeckungsstatistik: Wie viele der 23 API-, 21 CLI- und 1 Konfigurations-Skills über SKILL.md-Dateien im Dateisystem verfügen, verglichen mit den Kataloggesamtzahlen |

Den vollständigen Katalog und Informationen dazu, wie externe Agenten ihn nutzen, finden Sie unter [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Verwandte Frameworks (v3.8.0)

Der oben aufgeführte MCP-Tool-Bestand (110 eindeutige Tools, berechnet durch `countUniqueMcpTools()`) ist bewusst
auf Laufzeit-Routing-, Cache-, Komprimierungs-, Speicher-, Skill-, Proxy- und Kontextquellenoperationen beschränkt. Zwei angrenzende
Frameworks werden in v3.8.0 zusammen mit dem MCP-Server ausgeliefert und separat dokumentiert:

### Cloud-Agenten

Cloud-Agenten sind prozessexterne KI-Coding-Agenten (codex-cloud, cursor-cloud, devin, jules), die über
dasselbe Verbindungsmodell, das auch für LLM-Anbieter verwendet wird, in OmniRoute eingebunden sind. Sie werden über
ihre eigene REST-Oberfläche (`/api/v1/agents/*`) bereitgestellt und sind **nicht** Teil des MCP-Tool-Katalogs
— der Aufruf eines Cloud-Agenten beansprucht keinen MCP-Berechtigungsumfang.

- Implementierung: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Lebenszyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentation: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails sind Filter vor/nach der Ausführung (vision-bridge, pii-masker, prompt-injection),
die innerhalb der Chat-Pipeline angewendet werden. Sie werden ausgeführt, bevor die MCP-Tool-/Routing-Schicht erreicht wird,
und übermitteln strukturierte Verstöße an die Audit-Pipeline; sie werden nicht als MCP-Tools aufgerufen.

- Implementierung: `src/lib/guardrails/`.
- Dokumentation: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Wenn Sie einen scheinbar blockierten MCP-Aufruf debuggen, prüfen Sie sowohl das MCP-Audit-Protokoll
(`scope_denied:*`-Einträge) als auch die Guardrails-Audit-Spur — eine Anfrage kann durch
einen Guardrail abgelehnt werden, **bevor** sie überhaupt die MCP-Schicht zur Durchsetzung von Berechtigungsumfängen erreicht.

---

## REST-API-Endpunkte

| Endpunkt               | Methode               | Beschreibung                                                                                                 | Authentifizierung              |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | Serverstatus: Heartbeat, HTTP-Transportstatus, Zusammenfassung der Audit-Aktivitäten                         | Verwaltung (Sitzung/Admin)     |
| `/api/mcp/tools`       | `GET`                 | Tool-Katalog (Name, Beschreibung, Berechtigungsumfänge, Phase, Quellendpunkte)                               | Verwaltung                     |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-Transportendpunkt (durch `mcpEnabled` + `mcpTransport === "sse"` beschränkt)                             | API-Schlüssel + Berechtigungen |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable-HTTP-Transport (verwendet den Header `mcp-session-id`; `DELETE` beendet die Sitzung)              | API-Schlüssel + Berechtigungen |
| `/api/mcp/audit`       | `GET`                 | Audit-Protokolleinträge aus `mcp_tool_audit` (Filter: `limit`, `offset`, `tool`, `success`, `apiKeyId`)      | Verwaltung                     |
| `/api/mcp/audit/stats` | `GET`                 | Aggregierte Audit-Statistiken (`totalCalls`, `successRate`, `avgDurationMs`, am häufigsten verwendete Tools) | Verwaltung                     |

Quelldateien: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Sowohl SSE- als auch Streamable-HTTP-Transporte sind blockiert, bis der MCP-Server in den Einstellungen aktiviert (`mcpEnabled`) und der entsprechende `mcpTransport` ausgewählt wurde. Wenn der falsche Transport konfiguriert ist, gibt die Route HTTP 400 mit einem Hinweis zum Ändern der Einstellungen zurück.

---

## Authentifizierung & Scopes

MCP-Tools werden über API-Key-Scopes authentifiziert. Die Durchsetzung der Scopes ist zentral in
`open-sse/mcp-server/scopeEnforcement.ts` implementiert. Jedes Tool erfordert bestimmte Scopes:

| Geltungsbereich       | Tools                                                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `read:quota`          | `check_quota`                                                                                                                                                                |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `read:models`         | `list_models_catalog`                                                                                                                                                        |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `write:budget`        | `set_budget_guard`                                                                                                                                                           |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `pricing:write`       | `sync_pricing`                                                                                                                                                               |
| `read:cache`          | `cache_stats`                                                                                                                                                                |
| `write:cache`         | `cache_flush`                                                                                                                                                                |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                       |
| `read:memory`         | `memory_search`                                                                                                                                                              |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                 |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                           |
| `write:skills`        | `skills_enable`                                                                                                                                                              |
| `execute:skills`      | `skills_execute`                                                                                                                                                             |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                      |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                               |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                           |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                              |
| `read:obsidian`       | 13 Lese-Tools — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 Schreib-Tools — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …             |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                            |

Wildcard-Bereiche werden unterstützt: `read:*` gewährt alle Lesebereiche, `*` gewährt vollständigen Zugriff.

### `mcp:connect` — eng begrenzte Routenberechtigung (#7895)

Um den HTTP/SSE-MCP-Transport (`/api/mcp/*`) von außerhalb des Loopback-Interfaces zu erreichen, ist die LOCAL_ONLY-Ausnahme für `/api/mcp/` erforderlich (siehe `docs/security/ROUTE_GUARD_TIERS.md`). Bisher akzeptierte diese Ausnahme nur einen API-Schlüssel mit vollständigem `manage`-/`admin`-Bereich — zu weitreichend für einen Aufrufer, der lediglich mit MCP kommunizieren muss. `src/shared/constants/managementScopes.ts` exportiert nun `MCP_CONNECT_SCOPE = "mcp:connect"`: einen additiven, eng begrenzten Bereich (nach demselben Muster wie `SELF_USAGE_SCOPE`), der AUSSCHLIESSLICH die Umgehung für `/api/mcp/` in `src/server/authz/policies/management.ts` autorisiert — er gewährt keinen Zugriff auf andere Verwaltungsrouten und wird bewusst NICHT in `MANAGEMENT_API_KEY_SCOPES` aufgenommen. Ein Schlüssel mit `manage`/`admin` besteht die Ausnahmeprüfung weiterhin unverändert; `mcp:connect` ist eine Alternative mit geringeren Berechtigungen für entfernte Aufrufer, die ausschließlich MCP verwenden, und wird über `hasMcpConnectOrManageScope()` geprüft.

### HTTP-Bereichsbindung pro Schlüssel (#7895)

Über HTTP/SSE löst `open-sse/mcp-server/httpTransport.ts` nun die tatsächlichen `api_keys.scopes` des Aufrufers über `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) auf und übergibt sie mittels `transport.handleRequest(req, { authInfo })` an das MCP SDK, sodass die bei jedem Tool-Aufruf eintreffenden `extra.authInfo.scopes` die eigenen Bereiche des Bearer-Schlüssels widerspiegeln. `resolveCallerScopeContext()` in `scopeEnforcement.ts` priorisierte `authInfo` bereits gegenüber `_meta` und dem Env-Fallback `OMNIROUTE_MCP_SCOPES` — durch diese Änderung wird lediglich diese erste Quelle mit der höchsten Priorität befüllt, die zuvor über HTTP keine Daten erhielt. Wenn kein API-Schlüssel aufgelöst wird (kein Header, ungültiger Schlüssel), bleibt `authInfo` auf `undefined` gesetzt und die Auflösung greift unverändert auf die bestehende `meta`-/Env-Kette zurück. Dadurch wird die Standardeinstellung von `OMNIROUTE_MCP_ENFORCE_SCOPES` NICHT geändert — die Durchsetzung muss weiterhin explizit aktiviert werden; diese Änderung sorgt lediglich dafür, dass der schlüsselbezogene Pfad Vorrang erhält, sobald sie aktiviert ist. stdio verfügt über keine aufruferspezifische Identität (siehe `mcpCallerIdentity.ts`) und bleibt daher unverändert — es verwendet weiterhin die `_meta`-/Env-Fallback-Kette.

---

## Umgebungsvariablen

| Variable                                | Standardwert                        | Zweck                                                                                                                                             |
| :-------------------------------------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`            | Basis-URL, die der MCP-Server beim Aufruf interner OmniRoute-APIs verwendet                                                                       |
| `OMNIROUTE_API_KEY`                     | (leer)                              | API-Schlüssel, der als `Authorization: Bearer` an interne API-Aufrufe weitergeleitet wird                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (nur `"true"` aktiviert es) | Wenn aktiviert, führen fehlende Scopes zur Ablehnung von Tool-Aufrufen und protokollieren `scope_denied:<reason>` im Audit-Protokoll              |
| `OMNIROUTE_MCP_SCOPES`                  | (leer)                              | Kommagetrennte Positivliste der standardmäßig als „verfügbar“ betrachteten Scopes (wird verwendet, wenn der Aufrufer keine eigenen Scopes angibt) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nicht gesetzt = ein)               | Wenn auf `0/false/off/no` gesetzt, wird die Komprimierung von MCP-Beschreibungen zum Registrierungszeitpunkt deaktiviert                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nicht gesetzt = ein)               | Alternativer Alias für denselben Schalter wie oben                                                                                                |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                             | Zeitlimit bis zum Abbruch für interne Verwaltungslesevorgänge (Systemzustand, Resilienz, Kombinationen, Kontingent, Nutzung)                      |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                             | Zeitlimit bis zum Abbruch für Schritte, die auf einen Anbieter warten (`route_request`, `web_search`, `web_fetch`)                                |
| `MCP_TOOL_DENY`                         | (nicht gesetzt = kein Filter)       | Kommagetrennte Tool-Namen, die aus `tools/list` entfernt werden sollen (Reduzierung der Tool-Kardinalität — siehe unten)                          |
| `MCP_TOOL_ALLOW`                        | (nicht gesetzt = kein Filter)       | Kommagetrennte Tool-Namen, die ausschließlich beibehalten werden sollen (Positivlistenmodus — siehe unten)                                        |
| `DATA_DIR`                              | `~/.omniroute`                      | Die Heartbeat-Datei wird nach `${DATA_DIR}/runtime/mcp-heartbeat.json` geschrieben                                                                |

---

## Beschreibungskomprimierung

MCP-Tool-, Prompt- und Ressourcenregistrierungen können Beschreibungen zum Registrierungs-/Auflistungszeitpunkt komprimieren, um den für Clients bereitgestellten Metadatenumfang (und damit die Kosten für den Prompt-Kontext) zu reduzieren. Die Implementierung befindet sich in `open-sse/mcp-server/descriptionCompressor.ts` und ist über `compressMcpRegistryMetadata` innerhalb von `createMcpServer()` in den MCP-Server eingebunden.

- Die Komprimierung wird mithilfe des Caveman-Regelwerks (`getRulesForContext("all", "full")`) auf den Beschreibungstext angewendet. Dabei werden geschützte Blöcke extrahiert (Code-Spannen, abgegrenzte Blöcke usw.), sodass strukturelle Inhalte nicht verändert werden.
- Die Einstellung kann pro Bereitstellung über den Wert `compression.mcpDescriptionCompressionEnabled` in der Einstellungstabelle `key_value` umgeschaltet werden (Standard: aktiviert) — in der Benutzeroberfläche verfügbar als **Analysen → MCP-Beschreibungskomprimierung**.
- Prozessweit kann die Einstellung über `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` oder `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` umgeschaltet werden.
- Echtzeitstatistiken werden über `omniroute_compression_status` unter `analytics.mcpDescriptionCompression` bereitgestellt und mit `source: "mcp_metadata_estimate"` gekennzeichnet, um sie von tatsächlichen Nutzungsbelegen der Anbieter zu unterscheiden.

---

## Reduzierung der Tool-Kardinalität (F4.3)

Die Beschreibungskomprimierung verkleinert die Metadaten jedes Tools; die **Reduzierung der Tool-Kardinalität** geht noch einen Schritt weiter, indem sie die _Anzahl_ der überhaupt angekündigten Tools reduziert. Werden im `tools/list`-Manifest weniger Tools veröffentlicht, sinken die Token-Kosten pro Anfrage, die das Modell des Clients für den Tool-Katalog aufbringen muss („Layer-5“-Komprimierung). Die Implementierung ist ein reiner, zustandsloser Filter in `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), der in die Registrierungsschleife in `createMcpServer()` (`open-sse/mcp-server/server.ts`) eingebunden ist.

**Opt-in, standardmäßig deaktiviert.** Der Filter wird nur ausgeführt, wenn mindestens eine von zwei Umgebungsvariablen gesetzt ist; ist keine von beiden gesetzt, werden alle 110 Tools unverändert angekündigt.

| Variable         | Modus                                                                                            |
| :--------------- | :----------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Sperrliste — kommagetrennte Tool-Namen, die immer aus `tools/list` entfernt werden               |
| `MCP_TOOL_ALLOW` | Positivliste — kommagetrennte Tool-Namen; nur diese bleiben erhalten, alles andere wird entfernt |

`deny` hat Vorrang vor `allow`. Namen werden durch Kommas getrennt und um Leerzeichen bereinigt; leere Einträge werden ignoriert. Beispiele:

```bash
# Zwei Tools aus dem Katalog entfernen
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Nur die Routing- und Kontingent-Tools ankündigen (Positivlistenmodus)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**So werden gefilterte Tools entfernt:** Die Registrierung ist immer erfolgreich; ein vom Profil abgelehntes Tool wird anschließend über `.disable()` am MCP-SDK-Handle deaktiviert. Dadurch erscheint es nie in `tools/list`, während die Verkabelung intakt bleibt (sauberes Aktivieren/Deaktivieren, keine erneute Registrierung). Der Profil-Parser ist `readMcpToolProfileFromEnv(process.env)` und gibt `null` zurück (keine Filterung), wenn beide Variablen leer sind.

Die umfassendere `ToolProfile`-Struktur hinter `reduceToolManifest` unterstützt außerdem eine Filterung nach Schnittmengen von Geltungsbereichen (`allowScopes`, mit Platzhalterabgleich im Stil von `read:*`) sowie eine deterministische Obergrenze `maxTools`. Diese beiden Optionen benötigen jedoch zum Registrierungszeitpunkt das vollständige Manifest und werden derzeit **nicht** über die Umgebungsvariablen bereitgestellt (ein Hook auf `tools/list`-Ebene ist als Folgeaufgabe erfasst). Mit `estimateManifestTokens()` lassen sich die Token-Kosten des Manifests vor und nach der Reduzierung vergleichen.

---

## Laufzeit-Heartbeat

Der stdio-Transport speichert alle 5 Sekunden Lebenszeichen unter `${DATA_DIR}/runtime/mcp-heartbeat.json`. Das Dashboard (`/api/mcp/status`) liest diese Datei sowie den Lebensstatus der PID, um `online` zu bestimmen. HTTP-Transporte melden ihren Status stattdessen über das prozessinterne `getMcpHttpStatus()` (ohne Dateischreibvorgang).

Der Heartbeat-Snapshot enthält:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Audit-Protokollierung

Jeder Tool-Aufruf wird von `open-sse/mcp-server/audit.ts` in der SQLite-Tabelle `mcp_tool_audit` protokolliert:

- Tool-Name, Argumente (gemäß dem Tool-spezifischen `auditLevel` gehasht/gekürzt), Ergebnis
- Dauer in ms, Erfolgs-/Fehlerkennzeichen, Fehlermeldung (falls zutreffend)
- API-Schlüssel-Hash, Zeitstempel
- Ablehnungen aufgrund von Geltungsbereichen werden als `scope_denied:<reason>` zusammen mit der Liste der fehlenden Geltungsbereiche protokolliert

Verwenden Sie das Dashboard oder die REST-Endpunkte `/api/mcp/audit` und `/api/mcp/audit/stats`, um die letzten Aufrufe einzusehen.

---

## Dateien

| Datei                                                                    | Zweck                                                                                     |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-Server-Factory, stdio-Einstiegspunkt, bereichsbezogene Tool-Registrierungen           |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE- und Streamable-HTTP-Transport (Sitzungsverwaltung)                                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Auswertung von Tool-Berechtigungsbereichen und Aufruferermittlung                         |
| `open-sse/mcp-server/audit.ts`                                           | Audit-Protokollierung von Tool-Aufrufen (`mcp_tool_audit`)                                |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-Heartbeat-Schreiber (`mcp-heartbeat.json`)                                          |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Beschreibungskomprimierung für Tool-, Prompt- und Ressourcenregistrierungen               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-Schemas und Tool-Registry (`MCP_TOOLS`, 45 Einträge)                                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Tool-Handler für Phase 2, Cache und 1proxy                                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Handler für Komprimierungs-Tools                                                          |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definitionen der Memory-Tools (3 Tools)                                                   |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definitionen der Skill-Tools (4 Tools)                                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Tool-Definitionen für die Notion-Kontextquelle (6 Tools)                                  |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definitionen der Gamification-Tools (8 Tools)                                             |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Tools zur Plugin-Registrierung und -Verwaltung (8 Tools)                                  |
| `src/app/api/mcp/status/route.ts`                                        | Endpunkt `/api/mcp/status`                                                                |
| `src/app/api/mcp/tools/route.ts`                                         | Endpunkt `/api/mcp/tools`                                                                 |
| `src/app/api/mcp/sse/route.ts`                                           | SSE-Transportroute `/api/mcp/sse`                                                         |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable-HTTP-Transportroute `/api/mcp/stream`                                          |
| `src/app/api/mcp/audit/route.ts`                                         | Audit-Protokollabfrage `/api/mcp/audit`                                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Aggregierte Audit-Metriken unter `/api/mcp/audit/stats`                                   |
| `src/lib/notion/api.ts`                                                  | Notion-REST-API-Client (Wiederholungsversuche, Zeitüberschreitung, Fehlerklassifizierung) |
| `src/lib/db/notion.ts`                                                   | Persistierung des Notion-Tokens (Tabelle `key_value`)                                     |
| `src/app/api/settings/notion/route.ts`                                   | Notion-Einstellungs-API (GET/POST/DELETE)                                                 |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Benutzeroberfläche zur Verwaltung des Notion-Tokens                                       |
| `tests/unit/notion-api.test.ts`                                          | Tests für den Notion-API-Client (7)                                                       |
| `tests/unit/notion-tools.test.ts`                                        | Tests zur Bereichsdurchsetzung für Notion-Tools (10)                                      |
| `tests/unit/db/notion.test.mjs`                                          | Tests für das Notion-Datenbankmodul (3)                                                   |
