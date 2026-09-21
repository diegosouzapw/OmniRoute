# 🗜️ Prompt Compression Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Spare automatisch 15–95 % des geeigneten Kontexts ein. Einen schnellen Überblick findest du im [README-Abschnitt zur Komprimierung](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Überblick

OmniRoute implementiert eine modulare Pipeline zur Prompt-Komprimierung, die **proaktiv** ausgeführt wird, bevor Anfragen die vorgelagerten Anbieter erreichen. Dadurch werden Token transparent eingespart — Änderungen an deinem Arbeitsablauf sind nicht erforderlich.

```
Client-Anfrage
  → Auswahl der Komprimierungsstrategie
    → Combo-Überschreibung? → Combo-Einstellung verwenden
    → Schwellenwert für automatische Auslösung? → Automatischen Modus verwenden
    → Standardmodus? → Globale Einstellung verwenden
    → Aus? → Komprimierung überspringen
  → Ausgewählter Komprimierungsmodus
    → Aus: Keine Komprimierung
    → Lite: Sichere Bereinigung von Leerraum und Formatierung (~15 %)
    → Standard: Entfernung von Füllwörtern im Telegrammstil (~30 %)
    → Aggressiv: Alterung des Verlaufs + Zusammenfassung (~50 %)
    → Ultra: Heuristisches Kürzen + Ausdünnen von Codeblöcken (~75 %)
    → RTK: Befehlsbewusste Filterung von Terminal-/Werkzeugausgaben (vorgelagerter Bereich von 60–90 %)
    → Gestapelt: Geordnete Pipeline aus mehreren Engines, normalerweise RTK, dann Caveman (geeigneter Bereich von 78–95 %)
  → Komprimierte Anfrage → Anbieter
```

---

## Komprimierungsmodi

### Aus

Es wird keine Komprimierung angewendet. Alle Nachrichten werden unverändert weitergeleitet.

### Lite-Modus (~15 % Einsparung, <1 ms Latenz)

Der sicherste Modus — keine semantischen Änderungen, nur Bereinigung der Formatierung:

| Technik                  | Beschreibung                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Aufeinanderfolgende Leerzeilen zusammenführen und nachgestellte Leerzeichen entfernen |
| `dedupSystemPrompt`      | Doppelte Systemnachrichten entfernen                                                  |
| `compressToolResults`    | Ausführliche Werkzeug-/Funktionsausgaben komprimieren                                 |
| `removeRedundantContent` | Wiederholte Anweisungen entfernen                                                     |
| `replaceImageUrls`       | Base64-Bilddaten-URIs verkürzen                                                       |

**Am besten geeignet für:** Dauerhafte Nutzung, sicherheitskritische Arbeitsabläufe.

### Standardmodus (~30 % Einsparung)

Inspiriert von [Caveman](https://github.com/JuliusBrussee/caveman) — entfernt Füllwörter und umständliche Formulierungen, ohne die Bedeutung zu verändern:

- Entfernt Füllwörter („please“, „I think“, „basically“, „actually“)
- Verkürzt umständliche Formulierungen („in order to“ → „to“, „as a result of“ → „because“)
- Entfernt höfliche Abschwächungen („Would you mind...“, „If you could possibly...“)
- Mehr als 30 für Programmier-Prompts optimierte Regex-Regeln

**Am besten geeignet für:** Tägliche Programmierabläufe, kostenbewusste Teams.

### Aggressiver Modus (~50 % Einsparung)

Intelligente Verwaltung des Verlaufs für lange Sitzungen:

- **Nachrichtenalterung** — ältere Nachrichten werden zunehmend komprimiert
- **Zusammenfassung von Werkzeugergebnissen** — lange Werkzeugausgaben werden durch Zusammenfassungen ersetzt
- **Schutz der strukturellen Integrität** — stellt sicher, dass Paare aus `tool_use` und `tool_result` konsistent bleiben
- **Berücksichtigung des Kontextfensters** — beachtet die Token-Limits des jeweiligen Modells

**Am besten geeignet für:** Längere Debugging-Sitzungen, große Codebasen.

### Ultra-Modus (~75 % Einsparung)

Maximale Komprimierung für Szenarien mit kritischem Token-Budget:

- **Heuristisches Kürzen** — entfernt Nachrichten unterhalb des Relevanzschwellenwerts
- **Ausdünnen von Codeblöcken** — komprimiert sich wiederholende Codebeispiele
- **Kürzung per Binärsuche** — ermittelt den optimalen Schnittpunkt für das Kontextfenster
- Umfasst alle Funktionen des aggressiven Modus

**Am besten geeignet für:** Situationen, in denen du wiederholt an Kontextgrenzen stößt.

### RTK-Modus (vorgelagerter Bereich von 60–90 %)

Der RTK-Modus ist für ausführliche Werkzeugausgaben optimiert, die in Sitzungen mit Programmieragenten auftreten:

- Erkennt Befehls-/Ausgabeklassen wie `git status`, `git diff`, `git log`, Test-Runner,
  TypeScript-/Vite-/Webpack-Builds, ESLint/Biome/Prettier, npm-Audits/-Installationen, Docker-Protokolle, Infrastruktur-
  ausgaben und generische Shell-Ausgaben
- Wendet JSON-Filterpakete aus `open-sse/services/compression/engines/rtk/filters/` an
- Importiert RTK-Filter des TOML-Schemas v1 aus projektbezogenen oder globalen `filters.toml`-Dateien, einschließlich
  Inline-Test-Validierung und vertrauensbasierter Freigabe für Projektdateien
- Enthält 49 integrierte Filter mit Inline-Verifizierungsbeispielen
- Entfernt ANSI-Steuersequenzen, Fortschrittsbalken, wiederholte Zeilen und irrelevantes Rauschen
- Behält Fehlschläge, Fehler, Warnungen, geänderte Dateien, Zusammenfassungen und das Ende langer Ausgaben bei
- Unterstützt vertrauensbasiert freigegebene Projektfilter, globale Filter und die optionale Wiederherstellung redigierter Rohausgaben

**Am besten geeignet für:** Agentensitzungen mit Shell-, Build-, Test-, Git-, Grep- und Dateiausgabe-Transkripten.

### Gestapelter Modus (geeigneter Bereich von 78–95 %)

Der gestapelte Modus führt mehrere Komprimierungs-Engines in einer deterministischen Reihenfolge aus. Die Standard-Pipeline lautet:

```txt
RTK -> Caveman
```

Diese Reihenfolge komprimiert zunächst Terminal-/Werkzeugausgaben und wendet anschließend die semantische Verdichtung von Caveman auf
den verbleibenden natürlichsprachlichen Prompt an. Gestapelte Pipelines können global oder über
Komprimierungs-Combos konfiguriert werden, die Routing-Combos zugewiesen sind.

**Am besten geeignet für:** Gemischten Kontext mit umfangreichen Werkzeugprotokollen sowie menschlichen Anweisungen oder Assistentenzusammenfassungen.

---

## Berechnung der Einsparungen aus vorgelagerten Projekten

OmniRoute dokumentiert Komprimierungseinsparungen aus zwei Quellen: Benchmarks vorgelagerter Projekte und
der eigenen Engine-Kombination von OmniRoute.

| Quelle  | Hier verwendete Angabe aus der vorgelagerten README                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` weniger Ausgabetokens, durchschnittlich `65%` Ausgabeeinsparungen im Benchmark, eine Spanne von `22-87%` und ein Tool zur Eingabekomprimierung um `~46%` |
| RTK     | `60-90%` Einsparungen bei Befehlsausgaben; Beispielsitzung mit `~118,000 -> ~23,900` Tokens oder `79.7%` Einsparung (`~80%`)                                    |

Bei sich überschneidenden Tool-/Kontext-Nutzdaten kombiniert die standardmäßige OmniRoute-Konfiguration die Engines:

```txt
RTK -> Caveman
```

Die kombinierten Einsparungen sind multiplikativ, nicht additiv:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Die Angabe `78-95%` gilt, wenn sowohl RTK als auch Caveman dieselben Eingabe-/Kontext-Nutzdaten reduzieren können.
Der Caveman-Antwortausgabemodus ist davon getrennt: Wenn er aktiviert ist, gelten die eigenen Ausgabeeinsparungen von Caveman (durchschnittlich `65%`,
`~75%` als Hauptangabe, Spanne von `22-87%`). Die gesamten Abrechnungseinsparungen hängen vom Verhältnis Ihrer Eingaben zu Ausgaben ab.

### Was „geeignet“ tatsächlich bedeutet

Die angegebene Spanne von 15-95% ist real, gilt aber nur für **redundante oder ausführliche** Inhalte — wiederholte
Fehlerzeilen, ein Build-Protokoll, das dieselbe Warnung unablässig ausgibt, oder eine übermäßig große Ausgabe von `grep`/Dateilesevorgängen. Das bedeutet
**nicht**, dass jede Anfrage so viel einspart.

Empirisch verifiziert (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): Ein
`stacked`-Durchlauf (RTK + Caveman) für einen Anthropic-förmigen `tool_result`-Block mit 300 identischen
Fehlerzeilen erzielte **95.93% Token-Einsparungen / 96.26% Zeicheneinsparungen** — genau innerhalb der angegebenen
Spanne. Wird dieselbe Pipeline jedoch mit einer normalen, nicht redundanten Tool-Ausgabe ausgeführt (einer sauberen `grep`-Trefferliste,
einem kurzen Dateilesevorgang oder gewöhnlichem Konversationstext), erzielt sie korrekterweise **nahezu keine Einsparungen**, weil
keine Wiederholungen entfernt werden können und `validateCompression()` (`validation.ts`) keine
Überarbeitung ausliefert, durch die Codeblöcke, URLs, Überschriften, Versionen oder vollständig großgeschriebene Konstantenbezeichner entfernt oder verändert würden.

Dies ist erwartetes und sicheres Verhalten, kein Fehler: Eine Programmiersitzung, die hauptsächlich saubere Dateien liest bzw.
mit `grep` durchsucht, erzielt selbst bei vollständig aktivierter Komprimierung nur moderate Gesamteinsparungen, während eine Sitzung, die auf eine fehlschlagende
Schleife oder einen übermäßig ausführlichen Linter trifft, bei diesem Datenverkehr die volle Spanne von 78-95% erreicht. Verwenden Sie den niedrigen
Gesamteinsparungsprozentsatz einer einzelnen Sitzung nicht als Beleg dafür, dass die Komprimierung falsch konfiguriert ist — prüfen Sie zuerst, ob die
zugrunde liegende Tool-Ausgabe tatsächlich redundant war.

---

## Visualisierung der Token-Einsparungen

```
Ohne Komprimierung: 47K Tokens an das LLM gesendet
Mit Lite:           40K Tokens gesendet          (15% eingespart — sicher, immer aktiv)
Mit Standard:       33K Tokens gesendet          (30% eingespart — Caveman-Sprechregeln)
Mit Aggressive:     24K Tokens gesendet          (50% eingespart — Alterung + Zusammenfassung)
Mit Ultra:          12K Tokens gesendet          (75% eingespart — heuristische Bereinigung)
Mit RTK:            19K-5K Tokens gesendet       (60-90% bei Befehls-/Tool-Ausgaben eingespart)
Mit Stacked:        10K-2.5K Tokens gesendet     (geeignete RTK+Caveman-Spanne von 78-95%)
```

---

## Konfiguration

### Dashboard

Navigieren Sie zu `Dashboard → Context & Cache`:

- **Caveman** — Modusauswahl, Sprachpakete, Vorschau und globale Standardeinstellungen
- **RTK** — Befehlsfiltervorschau, RTK-Sicherheitseinstellungen und Filterkatalog
- **Compression Combos** — benannte Engine-Pipelines, die Routing-Kombinationen zugewiesen sind
- **Auto-Trigger Threshold** — aktiviert automatisch die Komprimierung, wenn die Token-Anzahl den Schwellenwert überschreitet

### Außerkraftsetzung pro Kombination

Weisen Sie unter `Dashboard → Context & Cache → Compression Combos` einer Routing-Kombination eine Komprimierungskombination zu:

```txt
Kombination: "free-tier-fallback"
  Komprimierungskombination: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Ziele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Dadurch können Sie gestapelte Komprimierung für kostenlose/Coding-Anbieter verwenden, während für kostenpflichtige
Abonnements der Lite-Modus beibehalten wird.

Diese Zuweisung zur „Außerkraftsetzung pro Kombination“ ist eine andere Steuerung als die Außerkraftsetzung des
**Komprimierungsmodus der Routing-Kombination** (Default/Off/Lite/Standard/Aggressive/Ultra) — diese Außerkraftsetzung wählt keine benannte
Pipeline einer Komprimierungskombination aus, sondern legt lediglich das von
`resolveCompressionPlan` berücksichtigte Feld `compressionMode` fest. Sie kann entweder auf der Kombinationskarte (`Dashboard → Combos`) oder, seit
#6760, pro Routing-Kombination in der Liste „Assign to routing“ unter
`Dashboard → Context & Cache → Compression Combos` festgelegt werden, direkt neben dem oben dokumentierten Kontrollkästchen für die Pipeline-Zuweisung.
Beide Oberflächen speichern die Einstellung über denselben Endpunkt `PUT /api/combos/{id}`.

### Außerkraftsetzung pro Anfrage

Senden Sie den Anfrage-Header `x-omniroute-compression`, um den Komprimierungsplan für eine einzelne
Anfrage außer Kraft zu setzen. Er hat die höchste Priorität — er überschreibt die Außerkraftsetzung der Routing-Kombination, das aktive Profil,
die automatische Auslösung und die Standardeinstellung des Panels. Unbekannte Werte werden ignoriert (die Anfrage wird nie abgelehnt), und
der globale Hauptschalter gilt weiterhin für alles: Wenn die Komprimierung global deaktiviert ist, kann sie durch den Header nicht
aktiviert werden. Werte:

| Wert          | Auswirkung                                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Keine Komprimierung für diese Anfrage.                                                                                                              |
| `default`     | Das vom Panel abgeleitete Standardprofil (ignoriert das aktive Profil).                                                                             |
| `engine:<id>` | Eine einzelne Engine, sofern aktiviert, z. B. `engine:rtk`.                                                                                         |
| `<combo>`     | Eine benannte Kombination, die zuerst anhand des Namens (ohne Beachtung der Groß-/Kleinschreibung) und anschließend anhand der ID abgeglichen wird. |

Der angewendete Plan wird im Antwort-Header `X-OmniRoute-Compression: <mode>; source=<source>`
zurückgegeben, wobei `<source>` einer der Werte `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` oder `off` ist.

### API

```bash
# Komprimierungseinstellungen abrufen
curl http://localhost:20128/api/settings/compression

# Komprimierungseinstellungen aktualisieren
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Vorschau einer bestimmten RTK-/gestapelten Nutzlast anzeigen
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK-Filterpakete auflisten
curl http://localhost:20128/api/context/rtk/filters

# RTK direkt mit optionalen Befehlsmetadaten testen
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Was geschützt wird

Die Komprimierungs-Engine **bewahrt immer Folgendes:**

- ✅ Codeblöcke (abgegrenzt und inline)
- ✅ URLs und Dateipfade
- ✅ JSON-Strukturen und strukturierte Daten
- ✅ Bezeichner und geschützte technische Tokens
- ✅ Mathematische Ausdrücke
- ✅ Definitionen von Tool-/Funktionsaufrufen
- ✅ System-Prompts (im Lite-Modus)

Die Wiederherstellung der RTK-Rohausgabe schwärzt gängige API-Schlüssel, Bearer-Tokens, Slack-Tokens, AWS-Zugriffsschlüssel,
Passwörter, Tokens und Geheimnisse, bevor irgendetwas dauerhaft gespeichert wird.

---

## Komprimierungsstatistiken

Jede komprimierte Anfrage enthält Statistiken in den Serverprotokollen:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Phasen-Roadmap

| Phase    | Modi                                                                                                                                                           | Status            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Phase 1  | Off, Lite                                                                                                                                                      | ✅ Veröffentlicht |
| Phase 2  | Standard, Aggressive, Ultra                                                                                                                                    | ✅ Veröffentlicht |
| Phase 3  | RTK, Stacked, Komprimierungskombinationen                                                                                                                      | ✅ Veröffentlicht |
| Phase 4  | Ausgabestile, SLM-Tier Ultra, Evaluierungsumgebung                                                                                                             | ✅ Veröffentlicht |
| Phase 4C | Adaptives Kontextbudget („Regler“) — Berechnungs-Engine + API (`contextBudget` bei `PUT /api/settings/compression`) + Modus-/Richtliniensteuerung im Dashboard | ✅ Veröffentlicht |

---

## Danksagungen

Die Komprimierungsregeln des Standard-Modus sind von **[Caveman](https://github.com/JuliusBrussee/caveman)** von **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) inspiriert — dem viralen Projekt „Warum viele Token verwenden, wenn wenige Token genügen“. Caveman gibt `~75%` weniger Ausgabe-Tokens, durchschnittliche Einsparungen von `65%` bei Benchmark-Ausgaben, eine Ausgabespanne von `22-87%` und ein Tool zur Eingabekomprimierung von `~46%` an.

Der RTK-Modus ist von **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** von **[RTK AI](https://github.com/rtk-ai)** inspiriert — dem hochleistungsfähigen Projekt zur Komprimierung von Befehlsausgaben für Terminal-, Build-, Test-, Git- und Tool-Ausgabefilterung. RTK gibt Einsparungen von `60-90%` an, wobei die Beispielsitzung in der README eine Einsparung von `~80%` zeigt.

---

## Erweiterte Komprimierungssysteme

Über die 7 Standardmodi hinaus umfasst OmniRoute mehrere erweiterte Komprimierungssysteme,
die abhängig vom Kontext automatisch arbeiten.

### Cache-bewusste Komprimierung

Einige Anbieter (wie Anthropic mit Prompt-Caching) unterstützen **Prompt-Caching**,
wodurch sie Teile des Prompts zwischenspeichern können, um Kosten und Latenz zu reduzieren. Wenn
Caching aktiviert ist, kann aggressive Komprimierung die Leistung tatsächlich **beeinträchtigen**,
da sie die zwischengespeicherten Tokens verändert und dadurch den Cache ungültig macht.

Das Modul `cachingAware.ts` löst dieses Problem, indem es **Caching-Kontext erkennt** und
**die Komprimierungsstrategie entsprechend anpasst**.

#### Funktionsweise

1. **Caching-Kontext erkennen** — Durchsucht den Anfragekörper nach `cache_control`-Markierungen
2. **Caching-Anbieter identifizieren** — Prüft, ob der Zielanbieter Caching unterstützt
3. **Strategie anpassen** — Stuft `aggressive`/`ultra` für Caching-Anbieter auf `standard` herab
4. **System-Prompt überspringen** — System-Prompts werden üblicherweise zwischengespeichert und daher nicht komprimiert
5. **Deterministische Transformationen verwenden** — Verwendet nur Transformationen, die eine konsistente Ausgabe erzeugen

#### Codebeispiel

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache-Markierung
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Verwendung

Die Cache-bewusste Komprimierung ist **immer aktiviert** — es ist keine Konfiguration erforderlich. Sie wird nur aktiv,
wenn:

- Die Anfrage `cache_control`-Markierungen enthält
- Der Zielanbieter Prompt-Caching unterstützt (Anthropic, OpenAI usw.)

### Progressive Alterung

Lange Unterhaltungen umfassen mit der Zeit viele Nachrichtenrunden, ältere Runden werden jedoch
weniger relevant. Das Modul `progressiveAging.ts` **reduziert den Detailgrad von Nachrichten abhängig von ihrem Rundenabstand**:

- **Aktuelle Runden (0-3)**: Werden unverändert beibehalten (alle Details)
- **Mittlere Runden (4-8)**: Lite-Komprimierung (Bereinigung von Leerraum und Formatierung)
- **Alte Runden (9+)**: Caveman-Komprimierung (Entfernung von Fülltext, Zusammenfassung)
- **Sehr alte Runden (20+)**: Werden stark zusammengefasst oder verworfen

#### Codebeispiel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 weitere Runden ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Erste 3 Runden: unverändert
  light: 8, // Runden 4–8: Lite-Komprimierung
  moderate: 20, // Runden 9–20: Caveman-Komprimierung
  // Runden ab 21: starke Zusammenfassung
});

// saved = Anzahl der eingesparten Tokens
```

#### Verwendung

Progressive Alterung ist für die Modi `aggressive` und `ultra` **immer aktiviert**. Sie ist besonders effektiv für:

- Lang laufende Programmiersitzungen
- Mehrtägige Unterhaltungen
- Agentische Workflows mit vielen Tool-Aufrufen

### Höhlenmensch-Ausgabemodus

Das Modul `outputMode.ts` fügt **Anweisungen in den System-Prompt** ein, damit das Modell selbst komprimierte, knappe Ausgaben erzeugt (ein „Höhlenmensch“-Stil).

#### Funktionsweise

Anstatt die Eingabe zu komprimieren, fügt dieser Modus einen System-Prompt wie den folgenden hinzu:

> „Antworte mit möglichst wenigen Wörtern. Verzichte auf Höflichkeitsfloskeln. Verwende kurze Sätze.“

Dies funktioniert besonders gut für:

- Codegenerierung (knappere Ausgabe = weniger Token)
- Kurze Fragen und Antworten (keine ausführlichen Erklärungen erforderlich)
- Stapelverarbeitung (maximaler Durchsatz)

#### Verwendung

Der Höhlenmensch-Ausgabemodus ist **optional** — aktiviere ihn über die Kombinationskonfiguration:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Ausgabestile (Katalog)

Der oben beschriebene Höhlenmensch-Ausgabemodus ist der **veraltete Einzelstil-Pfad**. Phase 4 hat ihn zu einem Katalog kombinierbarer Ausgabestile verallgemeinert: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Jeder Stil ist eine System-Prompt-Anweisung, die das Modell selbst kostengünstigere Ausgaben erzeugen lässt. Stile können gemeinsam aktiviert werden und werden in der Reihenfolge des Katalogs eingefügt.

| Stil                                     | `id`          | Funktionsweise                                                                                                                                                                                                                                            | Anweisungssprachen                                                                   |
| ---------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Knappe Prosa                             | `terse-prose` | Entfernt Füllwörter, Artikel und Relativierungen; behält den technischen Inhalt exakt bei. Derselbe Text wie beim veralteten Höhlenmensch-Ausgabemodus (referenziert, nicht erneut ausgeschrieben).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Weniger Code                             | `less-code`   | YAGNI-Leiter: kleinste funktionierende Änderung, keine unaufgeforderten Abstraktionen.                                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Pferdeschwanz (fauler Senior-Entwickler) | `ponytail`    | „Der beste Code ist der Code, der nie geschrieben wurde“: Wiederverwenden > neu schreiben, Ursache > Symptom, kürzester funktionierender Diff.                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Ich habe ADHS (handlungsorientiert)      | `i-have-adhd` | Handlung zuerst (Befehl/Pfad/Ausschnitt vor Prosa), nummerierte und begrenzte Schritte, EIN konkreter nächster Schritt, keine Einleitung/Zusammenfassung/Schlussformeln. Adaptiert von [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Knappes CJK (文言)                       | `terse-cjk`   | Ultraknapper Stil in klassischem Chinesisch.                                                                                                                                                                                                              | zh (gebietsschemaabhängig: wird nur angeboten, wenn die ermittelte Sprache `zh` ist) |

Jeder Stil bietet drei Intensitätsstufen — `lite`, `full`, `ultra` — und jede Stufe endet mit der gemeinsamen Einschränkungsklausel, die Codeblöcke, Dateipfade, Befehle, Fehlermeldungen, URLs und Bezeichner unverändert beibehält.

#### Funktionsweise der Einfügung

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) gleicht die Auswahl mit dem Katalog ab (unbekannte IDs und nicht zum Gebietsschema passende Stile werden verworfen, ohne einen Fehler auszulösen), verkettet die ausgewählten Anweisungen in der Reihenfolge des Katalogs, hängt die Einschränkungsklausel **einmal** an und stellt das Ergebnis im System-Prompt hinter einer einzelnen Idempotenzmarkierung (`[OmniRoute Output Styles]`) voran — eine erneute Anwendung hat keine Wirkung. Wenn für die erkannte Sprache der Anfrage eine Übersetzung vorhanden ist, wird anstelle der englischen Anweisung die lokalisierte Anweisung eingefügt.

#### Aktivierung

Im Dashboard: **Kontext → Einstellungen → Komprimierung** — eine Zeile pro Stil mit einem Ein-/Aus-Schalter und einer Stufenauswahl. Bei der programmatischen Verwendung speichert die Komprimierungskonfiguration die Auswahl wie folgt:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Abwärtskompatibilität: Die veraltete Kombinationseinstellung `outputMode: "caveman"` funktioniert weiterhin und wird auf `terse-prose` abgebildet; die Einfügung ist in jeder bisherigen Sprache Byte für Byte mit der alten Einfügung identisch.

Sprachauswahl: Wenn `languageConfig.enabled` aktiviert ist, wählt `autoDetect` die Sprache der neuesten Benutzernachricht aus (derselbe Detektor wie bei den Eingabe-Engines). Wird `autoDetect` deaktiviert, bleibt `defaultLanguage` fest eingestellt. Deaktiviert → Englisch.

Die Stil-×-Sprachen-Matrix wird durch `tests/unit/compression/output-styles-i18n-matrix.test.ts` festgeschrieben: Ein neuer Stil kann nicht ohne mindestens eine pt-BR-Übersetzung (oder eine ausdrücklich dokumentierte Ausnahme) veröffentlicht werden, und ein vorhandener Stil kann nicht unbemerkt ein Gebietsschema verlieren. Informationen zum Hinzufügen eines Stils findest du unter [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimierung von Tool-Ergebnissen

Das Modul `toolResultCompressor.ts` bietet **5 spezialisierte Komprimierungsstrategien** für Tool-Ergebnisse (Funktionsaufrufe, Agentenausgaben, Suchergebnisse usw.):

1. **Komprimierung von Suchergebnissen** — Entfernt redundante Ergebnisse und behält die besten N bei
2. **Komprimierung gelesener Dateien** — Kürzt große Dateien und erhält Header/Importe
3. **Komprimierung von Codeausführungen** — Behält nur wesentliche stdout-/stderr-Ausgaben bei
4. **Komprimierung von Datenbankabfragen** — Begrenzt Zeilen und entfernt ausführliche Metadaten
5. **Komprimierung von API-Antworten** — Entfernt Null-Felder und verdichtet Arrays

#### Verwendung

Die Komprimierung von Tool-Ergebnissen ist **immer aktiviert**, wenn Tool-Aufrufe vorhanden sind. Keine Konfiguration erforderlich.

### Gestapelte Pipeline

Der gestapelte Modus führt **mehrere Engines nacheinander** aus — üblicherweise zuerst RTK (60–90 % Einsparung bei Tool-Ausgaben), danach Caveman (weitere 30 % Einsparung beim verbleibenden Text). Dadurch werden **insgesamt 78–95 % Einsparung** erreicht.

#### Funktionsweise

```
Eingabe (1000 Token)
  → RTK (befehlsorientierter Filter) → 200 Token
    → Caveman (Entfernung von Fülltext) → 140 Token
  → Ausgabe (140 Token, 86 % Einsparung)
```

#### Verwendung

Verwende den gestapelten Modus für:

- Workflows mit intensiver Tool-Nutzung (agentisches Programmieren, Recherche)
- Kostensensible Stapelverarbeitung
- Situationen, in denen du maximale Token-Einsparungen benötigst

Konfiguration über die Kombinationskonfiguration:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Überschreibungen der Komprimierung pro Combo

Sie können den globalen Komprimierungsmodus **für jede Combo einzeln** überschreiben, um das Verhalten für verschiedene Anwendungsfälle präzise anzupassen:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Dies ist nützlich für:

- **Coding-Combos**: Verwenden Sie den Modus `aggressive` für lange Sitzungen
- **Schnelle Frage-und-Antwort-Combos**: Verwenden Sie den Modus `lite` für schnelle Antworten
- **Tool-intensive Combos**: Verwenden Sie den Modus `stacked` für maximale Einsparungen
- **Produktions-Combos**: Verwenden Sie den Modus `cache-aware` für Anbieter mit Caching-Unterstützung

---

## Siehe auch

- [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Umgebungsvariablen für die Komprimierung
- [Architekturleitfaden](../architecture/ARCHITECTURE.md) — Interna der Komprimierungspipeline
- [Benutzerhandbuch](../guides/USER_GUIDE.md) — Erste Schritte mit der Komprimierung
- [RTK-Komprimierung](./RTK_COMPRESSION.md) — RTK-Filter, Vertrauensmodell, Verifizierungs-Gate und Wiederherstellung der Rohausgabe
- [Komprimierungs-Engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, Stacking, APIs, MCP und Dashboard
- [Format der Komprimierungsregeln](./COMPRESSION_RULES_FORMAT.md) — JSON-Format für Regelpakete
- [Sprachpakete für die Komprimierung](./COMPRESSION_LANGUAGE_PACKS.md) — Sprachspezifische Caveman-Regeln
