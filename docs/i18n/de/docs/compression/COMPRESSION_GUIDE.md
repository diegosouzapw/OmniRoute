# 🗜️ Prompt Compression Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Sparen Sie automatisch 15–95 % bei geeigneten Kontextinhalten. Einen schnellen Überblick finden Sie im [README-Abschnitt zur Komprimierung](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Übersicht

OmniRoute implementiert eine modulare Pipeline zur Prompt-Komprimierung, die **proaktiv** ausgeführt wird, bevor Anfragen die Upstream-Anbieter erreichen. Dadurch werden Tokens transparent eingespart — Änderungen an Ihrem Workflow sind nicht erforderlich.

```
Client-Anfrage
  → Auswahl der Komprimierungsstrategie
    → Combo-Überschreibung? → Combo-Einstellung verwenden
    → Schwellenwert für automatische Auslösung? → Automatikmodus verwenden
    → Standardmodus? → Globale Einstellung verwenden
    → Aus? → Komprimierung überspringen
  → Ausgewählter Komprimierungsmodus
    → Aus: Keine Komprimierung
    → Lite: Sichere Bereinigung von Leerraum/Formatierung (~15 %)
    → Standard: Entfernung von Füllwörtern im Telegrammstil (~30 %)
    → Aggressiv: Alterung des Verlaufs + Zusammenfassung (~50 %)
    → Ultra: Heuristische Bereinigung + Ausdünnung von Codeblöcken (~75 %)
    → RTK: Befehlsorientierte Filterung von Terminal-/Tool-Ausgaben (60–90 % im Upstream-Bereich)
    → Gestapelt: Geordnete Pipeline mit mehreren Engines, üblicherweise RTK, dann Caveman (78–95 % im geeigneten Bereich)
  → Komprimierte Anfrage → Anbieter
```

---

## Komprimierungsmodi

### Aus

Es wird keine Komprimierung angewendet. Alle Nachrichten werden unverändert weitergeleitet.

### Lite-Modus (~15 % Einsparung, <1 ms Latenz)

Der sicherste Modus — keine semantischen Änderungen, nur eine Bereinigung der Formatierung:

| Technik                  | Beschreibung                                                                |
| ------------------------ | --------------------------------------------------------------------------- |
| `collapseWhitespace`     | Aufeinanderfolgende Leerzeilen und nachgestellte Leerzeichen zusammenführen |
| `dedupSystemPrompt`      | Doppelte Systemnachrichten entfernen                                        |
| `compressToolResults`    | Ausführliche Tool-/Funktionsausgaben komprimieren                           |
| `removeRedundantContent` | Wiederholte Anweisungen entfernen                                           |
| `replaceImageUrls`       | Base64-Bilddaten-URIs kürzen                                                |

**Am besten geeignet für:** Dauerhafte Nutzung, sicherheitskritische Workflows.

### Standardmodus (~30 % Einsparung)

Inspiriert von [Caveman](https://github.com/JuliusBrussee/caveman) — entfernt Füllwörter und weitschweifige Formulierungen, ohne die Bedeutung zu verändern:

- Entfernt Füllwörter („bitte“, „ich denke“, „im Grunde“, „eigentlich“)
- Verkürzt weitschweifige Formulierungen („um zu“ → „zu“, „als Folge von“ → „wegen“)
- Entfernt höfliche Abschwächungen („Würde es Ihnen etwas ausmachen ...“, „Wenn Sie vielleicht ...“)
- Mehr als 30 für Programmier-Prompts optimierte Regex-Regeln

**Am besten geeignet für:** Tägliche Programmier-Workflows, kostenbewusste Teams.

### Aggressiver Modus (~50 % Einsparung)

Intelligente Verlaufsverwaltung für lange Sitzungen:

- **Nachrichtenalterung** — ältere Nachrichten werden zunehmend stärker komprimiert
- **Komprimierung von Tool-Ergebnissen** — lange Tool-Ausgaben werden gekürzt oder ausgelassen (erste/letzte Zeilen,
  Filterung nach übereinstimmenden Zeilen, Komprimierung von JSON-Schlüsseln)
- **Schutz der strukturellen Integrität** — stellt sicher, dass Paare aus `tool_use` und `tool_result` konsistent bleiben
- **Berücksichtigung des Kontextfensters** — beachtet die Tokenlimits der einzelnen Modelle

**Am besten geeignet für:** Längere Debugging-Sitzungen, große Codebasen.

### Ultra-Modus (~75 % Einsparung)

Maximale Komprimierung für Szenarien mit kritischer Tokenauslastung:

- **Heuristische Bereinigung** — bewertungsbasierte Entfernung von Tokens aus Fließtext
- **Strukturerhaltung** — mit Begrenzungszeichen versehene Codeblöcke, Inline-Code, URLs und Bezeichner werden
  durch Platzhalter geschützt und anschließend wortgetreu wieder eingefügt; sie werden niemals entfernt
- **Optionale SLM-Stufe** — ein kleines lokales Modell kann die Bereinigung verfeinern, sofern es konfiguriert ist
- Unabhängig vom aggressiven Modus: Es werden weder Nachrichtenalterung noch Komprimierung von Tool-Ergebnissen
  oder die Fallback-Zusammenfassung ausgeführt (nur ein Fehler der SLM-Stufe kann einen Fallback-Durchlauf über
  den aggressiven Modus auslösen)

**Am besten geeignet für:** Situationen, in denen Sie wiederholt an Kontextgrenzen stoßen.

### RTK-Modus (60–90 % im Upstream-Bereich)

Der RTK-Modus ist für ausführliche Tool-Ausgaben optimiert, die in Sitzungen mit Programmier-Agenten auftreten:

- Erkennt Befehls-/Ausgabeklassen wie `git status`, `git diff`, `git log`, Test-Runner,
  TypeScript-/Vite-/Webpack-Builds, ESLint/Biome/Prettier, npm-Audits/-Installationen, Docker-Protokolle, Infrastruktur-
  ausgaben und generische Shell-Ausgaben
- Wendet JSON-Filterpakete aus `open-sse/services/compression/engines/rtk/filters/` an
- Importiert Filter des RTK-TOML-Schemas v1 aus projektbezogenen oder globalen `filters.toml`-Dateien, einschließlich
  Inline-Testvalidierung und Vertrauensprüfung für Projektdateien
- Enthält 55 integrierte Filter mit Inline-Verifizierungsbeispielen
- Entfernt ANSI-Steuersequenzen, Fortschrittsbalken, wiederholte Zeilen und nicht handlungsrelevante Störinformationen
- Behält Fehlschläge, Fehler, Warnungen, geänderte Dateien, Zusammenfassungen und das Ende langer Ausgaben bei
- Unterstützt vertrauensgeprüfte Projektfilter, globale Filter und die optionale Wiederherstellung geschwärzter Rohausgaben

**Am besten geeignet für:** Agentensitzungen mit Shell-, Build-, Test-, Git-, Grep- und Dateiausgabeprotokollen.

### Gestapelter Modus (78–95 % im geeigneten Bereich)

Der gestapelte Modus führt mehrere Komprimierungs-Engines in einer deterministischen Reihenfolge aus. Die Standardpipeline lautet:

```txt
RTK -> Caveman
```

Durch diese Reihenfolge werden Terminal-/Tool-Ausgaben zuerst kompakt gehalten; anschließend wendet Caveman eine semantische Verdichtung auf
den verbleibenden natürlichsprachlichen Prompt an. Gestapelte Pipelines können global oder über
Komprimierungs-Combos konfiguriert werden, die Routing-Combos zugewiesen sind.

**Am besten geeignet für:** Gemischte Kontextinhalte mit umfangreichen Tool-Protokollen sowie menschlichen Anweisungen oder Assistentenzusammenfassungen.

---

## Berechnung der Upstream-Einsparungen

OmniRoute dokumentiert Komprimierungseinsparungen aus zwei Quellen: Benchmarks der Upstream-Projekte und
der eigenen Engine-Kombination von OmniRoute.

| Quelle  | Hier verwendete Angabe aus der Upstream-README                                                                                                        |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` weniger Ausgabe-Token, durchschnittlich `65%` Ausgabeeinsparung in Benchmarks, Spanne von `22-87%` und Tool zur Eingabekomprimierung um `~46%` |
| RTK     | `60-90%` Einsparung bei Befehlsausgaben; Beispielsitzung mit `~118,000 -> ~23,900` Token bzw. `79.7%` Einsparung (`~80%`)                             |

Bei sich überschneidenden Tool-/Kontext-Nutzdaten schaltet die standardmäßige OmniRoute-Kombination die Engines hintereinander:

```txt
RTK -> Caveman
```

Die kombinierten Einsparungen werden multipliziert, nicht addiert:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Der Wert von `78-95%` gilt, wenn sowohl RTK als auch Caveman dieselben Eingabe-/Kontext-Nutzdaten reduzieren können.
Der Caveman-Modus für Antwortausgaben ist davon getrennt: Wenn er aktiviert ist, gelten die eigenen Ausgabeeinsparungen von Caveman (`65%`
im Durchschnitt, `~75%` als hervorgehobener Wert, Spanne von `22-87%`). Die Gesamteinsparungen bei der Abrechnung hängen von Ihrem Verhältnis zwischen Prompts und Ausgaben ab.

### Was „geeignet“ tatsächlich bedeutet

Die hervorgehobene Spanne von 15-95% ist real, gilt jedoch nur für **redundante oder ausführliche** Inhalte — wiederholte
Fehlerzeilen, ein Build-Protokoll, das ständig dieselbe Warnung ausgibt, oder eine übergroße `grep`-/Dateileseausgabe. Das bedeutet
**nicht**, dass jede Anfrage entsprechend viel einspart.

Empirisch bestätigt (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): Ein
`stacked`-Durchlauf (RTK + Caveman) mit einem `tool_result`-Block im Anthropic-Format, der 300 identische
Fehlerzeilen enthielt, erzielte **95.93% Token-Einsparung / 96.26% Zeicheneinsparung** — eindeutig innerhalb der angegebenen
Spanne. Wird dieselbe Pipeline jedoch auf normale, nicht redundante Tool-Ausgaben angewendet (eine saubere `grep`-Trefferliste,
eine kurze Dateileseausgabe, gewöhnlicher Konversationstext), ergeben sich erwartungsgemäß **nahezu keine Einsparungen**, da
keine Wiederholungen entfernt werden können und `validateCompression()` (`validation.ts`) keine Überarbeitung ausliefert, die
Codeblöcke, URLs, Überschriften, Versionen oder Bezeichner für Konstanten in GROSSBUCHSTABEN entfernen oder verändern würde.

Dies ist das erwartete, sichere Verhalten und kein Fehler: Eine Coding-Sitzung, in der überwiegend saubere Dateien gelesen bzw. mit `grep` durchsucht werden, erzielt
selbst bei vollständig aktivierter Komprimierung nur moderate Gesamteinsparungen, während eine Sitzung mit einer fehlschlagenden
Schleife oder einem sehr ausführlichen Linter für diesen Datenverkehr die volle Spanne von 78-95% erreicht. Verwenden Sie den
niedrigen aggregierten Einsparungsprozentsatz einer einzelnen Sitzung nicht als Beleg dafür, dass die Komprimierung falsch konfiguriert ist — prüfen Sie zuerst, ob die
zugrunde liegende Tool-Ausgabe tatsächlich redundant war.

---

## Visualisierung der Token-Einsparungen

```
Ohne Komprimierung: 47K Token an das LLM gesendet
Mit Lite:           40K Token gesendet          (15% eingespart — sicher, immer aktiv)
Mit Standard:       33K Token gesendet          (30% eingespart — Caveman-Sprechregeln)
Mit Aggressive:     24K Token gesendet          (50% eingespart — Alterung + Zusammenfassung)
Mit Ultra:          12K Token gesendet          (75% eingespart — heuristische Bereinigung)
Mit RTK:            19K-5K Token gesendet       (60-90% bei Befehls-/Tool-Ausgaben eingespart)
Mit Stacked:        10K-2.5K Token gesendet     (geeignete RTK+Caveman-Spanne von 78-95%)
```

---

## Konfiguration

### Dashboard

Navigieren Sie zu `Dashboard → Context & Cache`:

- **Caveman** — Modusauswahl, Sprachpakete, Vorschau und globale Standardeinstellungen
- **RTK** — Vorschau des Befehlsfilters, RTK-Sicherheitseinstellungen und Filterkatalog
- **Komprimierungskombinationen** — benannte Engine-Pipelines, die Routing-Kombinationen zugewiesen sind
- **Schwellenwert für automatische Aktivierung** — Komprimierung automatisch aktivieren, wenn die Tokenanzahl den Schwellenwert überschreitet

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

So können Sie gestapelte Komprimierung bei kostenlosen bzw. Coding-Anbietern verwenden und gleichzeitig für kostenpflichtige Abonnements den Lite-Modus beibehalten.

Diese Zuweisung zur „Außerkraftsetzung pro Kombination“ ist ein anderes Steuerelement als die Außerkraftsetzung des **Komprimierungsmodus der Routing-Kombination** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — das Schema des Felds akzeptiert außerdem `rtk`, `stacked` und `omniglyph`). Diese Außerkraftsetzung wählt keine benannte Komprimierungskombinations-Pipeline aus, sondern legt lediglich das von `resolveCompressionPlan` ausgewertete Feld `compressionMode` fest. Sie kann entweder auf der Kombinationskarte (`Dashboard → Combos`) oder seit #6760 pro Routing-Kombination in der Liste „Assign to routing“ unter `Dashboard → Context & Cache → Compression Combos` festgelegt werden, direkt neben dem oben dokumentierten Kontrollkästchen für die Pipeline-Zuweisung. Beide Oberflächen speichern ihre Einstellungen über denselben Endpunkt `PUT /api/combos/{id}`.

### Außerkraftsetzung pro Anfrage

Senden Sie den Anfrage-Header `x-omniroute-compression`, um den Komprimierungsplan für eine einzelne Anfrage außer Kraft zu setzen. Er hat die höchste Priorität — er überstimmt die Außerkraftsetzung der Routing-Kombination, das aktive Profil, die automatische Aktivierung und die Standardeinstellung des Panels. Unbekannte Werte werden ignoriert (die Anfrage wird niemals abgelehnt), und der globale Hauptschalter bleibt maßgeblich: Wenn die Komprimierung global deaktiviert ist, kann sie über den Header nicht aktiviert werden. Werte:

| Wert          | Wirkung                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Keine Komprimierung für diese Anfrage.                                                                                                              |
| `default`     | Das vom Panel abgeleitete Standardprofil (ignoriert das aktive Profil). Verlustbehaftete Engines bleiben deaktiviert.                               |
| `safe`        | Entspricht dem Weglassen des Headers: nur Deduplizierung und Zusammenfassung von Leerraum.                                                          |
| `allow-lossy` | Behält den Operatorplan dieser Anfrage bei, einschließlich Zusammenfassungen, Relevanzfiltern und Stilumschreibungen.                               |
| `engine:<id>` | Eine einzelne Engine, sofern aktiviert, z. B. `engine:rtk`. Dies ist die anfragebezogene Aktivierung für diese Engine.                              |
| `<combo>`     | Eine benannte Kombination, die zuerst anhand des Namens (ohne Beachtung der Groß-/Kleinschreibung) und anschließend anhand der ID abgeglichen wird. |

Ohne `allow-lossy`, `engine:<id>` oder eine benannte Kombination werden keine verlustbehafteten Engines angewendet. Wenn die Komprimierung aktiviert ist, erhält die Anfrage weiterhin Sitzungs-Deduplizierung und eine Zusammenfassung von Leerraum.

Der angewendete Plan wird im Antwort-Header `X-OmniRoute-Compression: <mode>; source=<source>` zurückgegeben, wobei `<source>` einer der Werte `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` oder `off` ist.

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

- ✅ Codeblöcke (umschlossen und inline)
- ✅ URLs und Dateipfade
- ✅ JSON-Strukturen und strukturierte Daten
- ✅ Bezeichner und geschützte technische Tokens
- ✅ Mathematische Ausdrücke
- ✅ Definitionen von Tool-/Funktionsaufrufen
- ✅ System-Prompts (im Lite-Modus)

Die Wiederherstellung von RTK-Rohausgaben schwärzt gängige API-Schlüssel, Bearer-Tokens, Slack-Tokens, AWS-Zugriffsschlüssel,
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
| Phase 4  | Ausgabestile, SLM-Tier Ultra, Evaluierungs-Harness                                                                                                             | ✅ Veröffentlicht |
| Phase 4C | Adaptives Kontextbudget („Regler“) — Berechnungs-Engine + API (`contextBudget` bei `PUT /api/settings/compression`) + Modus-/Richtliniensteuerung im Dashboard | ✅ Veröffentlicht |

---

## Danksagungen

Die Komprimierungsregeln des Standard-Modus sind von **[Caveman](https://github.com/JuliusBrussee/caveman)** von **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) inspiriert — dem viralen Projekt „why use many token when few token do trick“. Caveman gibt `~75%` weniger Ausgabe-Tokens, eine durchschnittliche Ausgabeeinsparung von `65%` in Benchmarks, eine Ausgabespanne von `22-87%` und ein Tool zur Eingabekomprimierung von `~46%` an.

Der RTK-Modus ist von **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** von **[RTK AI](https://github.com/rtk-ai)** inspiriert — dem Hochleistungsprojekt zur Komprimierung von Befehlsausgaben für Terminal-, Build-, Test-, Git- und Tool-Ausgabefilterung. RTK gibt Einsparungen von `60-90%` an, wobei die Beispielsitzung in der README eine Einsparung von `~80%` zeigt.

---

## Erweiterte Komprimierungssysteme

Über die oben beschriebenen 7 Modi hinaus (die Quelle akzeptiert außerdem die Modi `codex-responses` und
`omniglyph`, die in diesem Leitfaden nicht behandelt werden) behandeln die folgenden Abschnitte Funktionen,
die innerhalb dieser Modi oder parallel dazu arbeiten: Tool-Ergebniskomprimierung und Progressive Alterung
sind die Schritte 1 und 2 der aggressiven Engine (Aggressive-Modus und ein `aggressive`-Schritt einer
gestapelten Pipeline), die gestapelte Pipeline bestimmt, wie der Stacked-Modus ausgeführt wird, cachebewusste Komprimierung
stuft `aggressive` und `ultra` bei Caching-Anbietern auf `standard` herunter, solange die Komprimierung
aktiviert ist, und der Caveman-Ausgabemodus sowie Ausgabestile sind optionale System-Prompt-Anweisungen,
die standardmäßig deaktiviert sind und die Ausgabe des Modells formen, anstatt die Anfrage zu komprimieren.

### Cachebewusste Komprimierung

Einige Anbieter (wie Anthropic mit Prompt-Caching) unterstützen **Prompt-Caching**,
wodurch sie Teile des Prompts zwischenspeichern können, um Kosten und Latenz zu reduzieren. Wenn
Caching aktiviert ist, kann aggressive Komprimierung die Leistung tatsächlich **beeinträchtigen**,
weil sie die zwischengespeicherten Tokens verändert und dadurch den Cache ungültig macht.

Das Modul `cachingAware.ts` löst dieses Problem, indem es den **Caching-Kontext erkennt** und
die **Komprimierungsstrategie entsprechend anpasst**.

#### Funktionsweise

1. **Caching-Kontext erkennen** — Durchsucht den Anfragekörper nach `cache_control`-Markierungen
2. **Caching-Anbieter identifizieren** — Prüft, ob der Zielanbieter Caching unterstützt
3. **Strategie anpassen** — Stuft `aggressive`/`ultra` bei Caching-Anbietern auf `standard` herunter
4. **System-Prompt überspringen** — System-Prompts werden normalerweise zwischengespeichert, daher sollten sie nicht komprimiert werden

Die Strategie-Hilfsfunktion gibt außerdem ein `deterministicOnly`-Flag zurück, aber der Plan-Builder verwendet
nur die Strategie — derzeit liest keine nachgelagerte Komponente dieses Flag.

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
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Einsatzbereiche

Cachebewusste Komprimierung ist **immer aktiviert** — es ist keine Konfiguration erforderlich. Sie greift immer dann,
wenn die Komprimierung aktiviert ist und der Zielanbieter Prompt-Caching unterstützt (Anthropic, OpenAI
usw.); explizite `cache_control`-Markierungen sind nicht erforderlich — bereits ein Caching-Anbieter
löst die Herabstufung aus, während Markierungen allein dies niemals tun (die Erkennung von Markierungen liefert
Cache-Telemetriedaten, beeinflusst jedoch nicht die Strategieentscheidung).

### Progressive Alterung

Lange Unterhaltungen sammeln viele Nachrichtenwechsel an, ältere Wechsel werden jedoch zunehmend
irrelevant. Das Modul `progressiveAging.ts` **stuft Nachrichten anhand ihrer Entfernung in Gesprächswechseln herab**
(die Entfernung wird vom Ende der Unterhaltung aus gemessen). Mit den ausgelieferten Standardwerten
(`verbatim: 2, light: 2, moderate: 3`):

- **Letzte 2 Gesprächsbeiträge (Distanz ≤ 2)**: Unverändert beibehalten
- **Distanz 3**: Höhlenmenschen-Komprimierung (Entfernung von Füllwörtern)
- **Distanz 4+**: Assistentennachrichten werden zusammengefasst; Benutzernachrichten werden auf ihre erste
  Zeile reduziert und auf 120 Zeichen begrenzt; andere Rollen bleiben unverändert. System-Prompts, bereits gealterte
  Nachrichten und die neueste Benutzernachricht werden unabhängig von der Distanz immer unverändert beibehalten.
  Nichts wird vollständig verworfen, und das Band `light`
  ist mit den ausgelieferten Standardwerten nicht erreichbar (`light` entspricht `verbatim`).

#### Codebeispiel

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 weitere Gesprächsbeiträge ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // letzte 3 Gesprächsbeiträge: unverändert
  light: 8, // Distanz <= 8: leichte Komprimierung
  moderate: 20, // Distanz <= 20: Höhlenmenschen-Komprimierung
  fullSummary: 5, // vom Typ erforderlich, wird vom Banding-Code nicht gelesen
  // Distanz > 20: zusammengefasst (Assistent) / erste Zeile beibehalten (Benutzer)
});

// saved = Anzahl der eingesparten Token
```

#### Verwendung

Progressives Altern ist im Modus `aggressive` **immer aktiviert** — es ist Schritt 2 von
`compressAggressive()`. Der Ultra-Modus führt es nicht aus. Es ist besonders effektiv für:

- Lang laufende Programmiersitzungen
- Mehrtägige Unterhaltungen
- Agentische Workflows mit vielen Tool-Aufrufen

### Höhlenmenschen-Ausgabemodus

Der Höhlenmenschen-Ausgabemodus fügt **System-Prompt-Anweisungen** hinzu, die das Modell selbst zu
knappen Ausgaben auffordern — die Stufe `lite` fordert prägnante Antworten mit vollständigen Sätzen,
`full` fordert es auf, „knapp wie ein schlauer Höhlenmensch zu antworten“, und `ultra` fordert
telegrammartige Ausgaben; Anweisungen stellen lediglich eine Aufforderung dar und können dies nicht garantieren. Anfragen erhalten sie über
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` löst die Auswahl zunächst mit dem Abwärtskompatibilitäts-Shim auf
(`resolveOutputStyleSelection()` in
`open-sse/services/compression/outputStyles/backCompat.ts`), der bei leerem `outputStyles`
einen aktivierten `cavemanOutputMode` dem Ausgabestil `terse-prose` mit
`cavemanOutputMode.intensity` zuordnet (siehe Abwärtskompatibilität unten); eine nicht leere
`outputStyles`-Auswahl wird unverändert verwendet, und `cavemanOutputMode.enabled` sowie `intensity`
haben dann keine Wirkung, während der Umschalter `autoClarity` weiterhin angewendet wird. `outputMode.ts`
enthält die Anweisungstexte (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), die Umgehung anhand des Inhalts und die
Platzierungshilfe, die von der Einfügung verwendet wird; der eigene Injektor `applyCavemanOutputMode()` hat keinen
Produktionsaufrufer.

#### Funktionsweise

Dieser Modus komprimiert die Eingabe nicht. Er fügt dem System-Prompt einen Anweisungsblock hinzu
(siehe Funktionsweise der Einfügung unten), und jeder für die Anfrage ausgewählte Eingabekomprimierungsmodus
wird anschließend weiterhin auf den Textkörper angewendet, der nun den Block enthält. Vor der gemeinsamen
Begrenzungsklausel, mit der jede Stufe endet, lautet die englische Stufe `full`:

> „Antworte knapp wie schlauer Höhlenmensch. Lass Artikel (ein/eine/der/die/das), Füllwörter (nur/wirklich/im Grunde/tatsächlich/einfach), Höflichkeitsfloskeln und Abschwächungen weg. Satzfragmente OK. Kurze Synonyme (groß statt umfangreich, beheben statt implementieren). Bewahre sämtliche technischen Inhalte, Code, Fehler, URLs und Bezeichner exakt.“

Dies eignet sich besonders gut für:

- Codegenerierung (knappere Ausgabe = weniger Token)
- Kurze Fragen und Antworten (keine ausführlichen Erklärungen erforderlich)
- Stapelverarbeitung (maximaler Durchsatz)

#### Verwendung

Der Höhlenmenschen-Ausgabemodus ist **optional**. Wenn die Komprimierung aktiviert ist (`enabled: true`, der Hauptschalter
auf der Seite „Komprimierungseinstellungen“), aktivieren Sie ihn mit `cavemanOutputMode.enabled`; `intensity`
wählt `lite`, `full` oder `ultra` aus:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Der Umschalter **Ausgabemodus** einer Komprimierungskombination (`outputMode`, Stufe in `outputModeIntensity`)
setzt denselben Schalter für die Anfragen, auf die diese Kombination angewendet wird, und das MCP-Tool
`omniroute_set_compression_engine` schreibt ihn über sein boolesches Argument `outputMode`.
Eine nicht leere `outputStyles`-Auswahl hat Vorrang vor diesem Schalter. Im Dashboard fügt das Aktivieren
des Ausgabestils **Knappe Prosa** denselben Block ein (siehe Ausgabestile unten).

### Ausgabestile (Katalog)

Der obige Höhlenmenschen-Ausgabemodus ist der **veraltete Einzelstil-Pfad**. Phase 4 verallgemeinerte ihn
zu einem Katalog kombinierbarer Ausgabestile: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Jeder Stil ist eine System-Prompt-Anweisung,
die das Modell selbst zu kostengünstigeren Ausgaben auffordert; Stile können gemeinsam aktiviert
werden und werden in der Reihenfolge des Katalogs eingefügt.

| Stil                                     | `id`          | Funktion                                                                                                                                                                                                                                               | Anweisungssprachen                            |
| ---------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Knapp formuliert                         | `terse-prose` | Füllwörter/Artikel/Relativierungen weglassen; technische Substanz exakt beibehalten. Derselbe Text wie im alten Caveman-Ausgabemodus (referenziert, nicht erneut eingegeben).                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Weniger Code                             | `less-code`   | YAGNI-Leiter: kleinste funktionierende Änderung, keine unaufgeforderten Abstraktionen.                                                                                                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Pferdeschwanz (fauler Senior-Entwickler) | `ponytail`    | „Der beste Code ist der, der nie geschrieben wurde“: Wiederverwenden > Neuschreiben, Ursache > Symptom, kürzester funktionierender Diff.                                                                                                               | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ich habe ADHS (handlungsorientiert)      | `i-have-adhd` | Handlung zuerst (Befehl/Pfad/Snippet vor Fließtext), nummerierte begrenzte Schritte, EIN konkreter nächster Schritt, keine Einleitung/Zusammenfassung/Schlussformeln. Adaptiert von [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Knappes CJK (文言)                       | `terse-cjk`   | `full`-/`ultra`-Antwort auf klassischem Chinesisch (文言); `lite` fordert lediglich kurze Antworten ohne Funktionswörter, Höflichkeitsfloskeln oder Ausschmückungen an.                                                                                | zh (gebietsschemabeschränkt, siehe unten)     |

Jeder Stil wird mit drei Intensitätsstufen ausgeliefert — `lite`, `full`, `ultra` — und jede Stufe
endet mit der gemeinsamen Begrenzungsklausel (`SHARED_BOUNDARIES` in `outputMode.ts`), die
Codeblöcke, Dateipfade, Befehle, Fehler und URLs unverändert lässt. Die Stufentexte von `terse-prose` und
`terse-cjk` fügen dieser Liste Bezeichner hinzu.

`terse-cjk` ist an zwei Stellen auf das Gebietsschema `zh` beschränkt. Auf der Seite mit den Komprimierungseinstellungen wird
die entsprechende Zeile nur angezeigt, wenn die Sprache der Dashboard-Benutzeroberfläche Chinesisch ist (`zh-CN` oder `zh-TW`), und
`applyOutputStyles()` fügt den Stil nur ein, wenn die aufgelöste Sprache der Anfrage (siehe Sprachauswahl
unten) `zh` ist. Das Ausblenden der Zeile löscht eine gespeicherte `terse-cjk`-Auswahl nicht:
Die Einstellungs-API akzeptiert jede Stil-ID, und beim Speichern anderer Stile auf der Seite bleibt sie erhalten. Zur
Anfragezeit ist die Sprachprüfung in `applyOutputStyles()` die einzige Gebietsschemabeschränkung.

#### Funktionsweise der Einfügung

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) gleicht
die Auswahl mit dem Katalog ab (unbekannte IDs und nicht zum Gebietsschema passende Stile werden
verworfen und verursachen niemals einen Fehler; wenn für eine Auswahl kein Stil aufgelöst wird, bleibt der Body
unverändert und wird als `no_styles` übersprungen), verkettet die ausgewählten Anweisungen in Katalogreihenfolge,
hängt die Begrenzungsklausel **einmal** an (zuzüglich der Sicherheitsklausel, `SAFETY_BOUNDARIES` oder deren
Übersetzung, wenn `less-code` oder `ponytail` ausgewählt ist) und beginnt den Block mit einem
einzelnen Idempotenzmarker (`[OmniRoute Output Styles]`), sodass eine erneute Anwendung keine Wirkung hat. Wenn
für die aufgelöste Sprache (siehe Sprachauswahl unten) eine Übersetzung vorliegt, wird die lokalisierte
Anweisung anstelle der englischen eingefügt.

Bei einem Body mit einem nicht leeren `messages`-Array wird die Idempotenzprüfung vor der
Inhaltsumgehung ausgeführt: Wenn der Marker `[OmniRoute Output Styles]` bereits im `system`-Feld
der obersten Ebene (als String oder Inhaltsblock-Array) oder in einer Systemnachricht mit String-Inhalt
enthalten ist, bleibt der Body als `already_applied` unverändert, und es wird keine Schlüsselwortprüfung ausgeführt.
Andernfalls prüft eine Inhaltsumgehung (`shouldBypassCavemanOutputMode()` in
`open-sse/services/compression/outputMode.ts`) den Text der letzten drei
Nachrichten unabhängig von ihrer Rolle und überspringt die Stile für den gesamten Turn, wenn dieser Text
Schlüsselwörter für Sicherheit, irreversible Aktionen oder Klärungsbedarf enthält oder einer
reihenfolgeabhängigen Sequenz entspricht: `first`, `then`, `after that`, `before`, `rollback` oder
`backup`, gefolgt innerhalb von 240 Zeichen von `delete`, `drop`, `migrate`, `deploy` oder
`release`. Die Umgehung wird ausgeführt, solange der Schalter **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, standardmäßig aktiviert) eingeschaltet ist; durch Ausschalten des Schalters wird die
Schlüsselwortprüfung übersprungen.

Wenn die Umgehung den Turn passieren lässt, platziert `placeSystemInstruction()` (dieselbe Datei), das
niemals ein neues `messages[0]` erstellt, den Block an der ersten der folgenden gefundenen Stellen:

1. Eine führende Systemnachricht mit String-Inhalt: Der Block wird nach deren Text angehängt.
2. Das `system`-Feld der obersten Ebene: Der Block wird nach dem Text eines Strings angehängt oder
   einem Inhaltsblock-Array als neuer Textblock hinzugefügt.
3. Die erste nachfolgende Systemnachricht mit String-Inhalt: Der Block wird nach deren
   Text angehängt.
4. Keine der obigen Stellen: Der Block wird in eine neue Systemnachricht am Ende von `messages` eingefügt.

Bei einem Body ohne `messages`-Array (oder mit einem leeren Array) wird keine Inhaltsumgehung ausgeführt und
ein `system`-Feld der obersten Ebene nicht berücksichtigt. Der Block wird nach dem Text eines
String-Felds `instructions` angehängt, sofern dieses Feld nicht bereits den Marker
`[OmniRoute Output Styles]` enthält; in diesem Fall bleibt der Body als
`already_applied` unverändert. Wenn der Body kein String-Feld `instructions` besitzt, aber `input`
(einen String oder ein Array) enthält, wird der Block zu `instructions` und ersetzt jeden Nicht-String-Wert,
den dieses Feld zuvor enthielt. Ein Body, der weder ein String-Feld `instructions` noch ein als String oder Array
vorliegendes `input` enthält, bleibt unverändert und wird als `no_messages` übersprungen.

#### Aktivierung

Im Dashboard: **Komprimierungskontext → Komprimierungseinstellungen**
(`/dashboard/context/settings`), Abschnitt „Ausgabestile“: eine Zeile pro Stil mit einem
Ein/Aus-Schalter und einer Stufenauswahl. Stile werden eingefügt, solange die
Komprimierung selbst aktiviert ist (der Hauptschalter der Seite, `enabled`). Der Schalter
**Auto-Clarity Bypass** befindet sich auf der Seite **Caveman**
(`/dashboard/context/caveman`) in der Karte **Ausgabemodus**. Programmatisch speichert
die Komprimierungskonfiguration die Auswahl wie folgt:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Abwärtskompatibilität: Solange `outputStyles` leer ist, wird die veraltete Einstellung
`cavemanOutputMode.enabled` auf `terse-prose` mit
`cavemanOutputMode.intensity` abgebildet. Der Block beginnt dann mit der Markierung
`[OmniRoute Output Styles]`, während der veraltete `applyCavemanOutputMode()`-Injector
`[OmniRoute Caveman Output Mode]` einfügte. Unterhalb der Markierung entspricht der Text
der veralteten Einfügung in en, pt-BR, es, de, fr, it, ru, id und vi; in ja und zh
enthält er ein zusätzliches Leerzeichen vor der Begrenzungsklausel. `terse-prose` ist in
pt-BR, es, de, fr, it, ru, zh, ja, id und vi übersetzt, sodass eine Anfrage, deren
ermittelte Sprache `hu` ist, den englischen Text erhält, während der veraltete Injector
seinen ungarischen Text verwendete.

Sprachauswahl für Ausgabestile (`resolveOutputStyleLanguage()` in
`outputStyles/apply.ts`): Wenn `languageConfig.enabled` aktiviert ist, untersucht
`autoDetect` die neueste Benutzernachricht im `messages`-Array der Anfrage, die Text
enthält (String-Inhalt oder den `text` ihrer Inhaltsbestandteile), und führt darauf den
Detektor der Caveman-Engine (`detectCompressionLanguage()`) aus. Der Detektor gibt für
Text mit Han-Zeichen und ohne Kana `zh` zurück; andernfalls gibt er diejenige Sprache
unter `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` und `id` zurück, die die meisten
Treffer bei den Hinweisen erzielt, und `en`, wenn keine Hinweise übereinstimmen — Text,
den er nicht klassifizieren kann, wird Englisch zugeordnet, niemals `defaultLanguage`,
und `vi` wird nie erkannt, obwohl die Stile Text in `vi` mitliefern. Der Body einer
Responses API enthält seine Gesprächsbeiträge in `input`, das nicht untersucht wird,
sodass zunächst `defaultLanguage` und anschließend Englisch verwendet wird. Wenn keine
Benutzernachricht in `messages` Text enthält oder `autoDetect` deaktiviert ist, wird
zunächst `defaultLanguage` und anschließend Englisch verwendet. Wenn
`languageConfig.enabled` deaktiviert ist, wird Englisch verwendet — es sei denn, eine
Komprimierungskombination gilt für die Anfrage (eine Kombination, die der
Routing-Kombination der Anfrage zugewiesen ist, oder die standardmäßige
Komprimierungskombination, auf die chatCore für die integrierte gestapelte Pipeline
zurückgreift): Das Anwenden einer Kombination aktiviert `languageConfig.enabled` für
diese Anfrage und setzt `defaultLanguage` anhand der Sprachpakete der Kombination (der
gespeicherte Wert, wenn er zu den Paketen der Kombination gehört, andernfalls das erste
Paket der Kombination, das standardmäßig `en` ist), während die gespeicherte Einstellung
`autoDetect` (standardmäßig aktiviert) weiterhin gilt. Die Caveman-Eingabe-Engine wählt
die Sprache ihres Regelpakets anders aus — pro Textbestandteil und bei deaktivierter
automatischer Erkennung abhängig von `enabledPacks`.

Die Stil-×-Sprachen-Matrix wird durch
`tests/unit/compression/output-styles-i18n-matrix.test.ts` festgeschrieben: Jeder
Katalogstil benötigt einen Eintrag in `BASELINE_LANGUAGES` des Tests; ein Stil, der nicht
auf bestimmte Gebietsschemas beschränkt ist, muss eine pt-BR-Übersetzung mitliefern (der
auf bestimmte Gebietsschemas beschränkte Stil `terse-cjk` ist von dieser Regel
ausgenommen), sofern er nicht in `KNOWN_ENGLISH_ONLY` aufgeführt ist. Diese Liste darf
nur Stile ohne jegliche Übersetzungen enthalten — ein aufgeführter Stil, der irgendeine
Übersetzung besitzt, lässt den Test fehlschlagen. Ein Stil lässt den Test außerdem
fehlschlagen, wenn eine Sprache verloren geht, die in seinem Eintrag unter
`BASELINE_LANGUAGES` aufgeführt ist. Informationen zum Hinzufügen eines Stils finden Sie
unter [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprimierung von Tool-Ergebnissen

`compressToolResult()` in `open-sse/services/compression/toolResultCompressor.ts`
komprimiert den Text von Tool-Ergebnissen mithilfe von **5 Strategien**. Diese werden in
der folgenden Reihenfolge ausprobiert, und die erste aktivierte Strategie, deren Prüfung
dem Inhalt entspricht, bestimmt das Ergebnis:

1. **`fileContent`**: Bei Inhalten mit 3 oder mehr Zeilen, von denen mindestens eine
   Zeile unter Ignorieren der führenden Einrückung mit `import `, `export `, `function `,
   `class `, `const `, `let `, `var ` oder `return ` (dem Schlüsselwort plus einem
   Leerzeichen) oder mit `if`, `for` oder `while`, gefolgt von `(` oder ` (`, beginnt,
   werden die ersten 20 und die letzten 5 Zeilen beibehalten und der ausgelassene
   Mittelteil gekennzeichnet.
2. **`grepSearch`**: Bei Inhalten mit mindestens einer Zeile der Form
   `<path>:<digits>:`, wobei der Text vor dem ersten Doppelpunkt keine Leerzeichen
   enthält, werden nur diese Zeilen beibehalten, höchstens 30, gefolgt von der Anzahl
   weiterer Treffer und der Liste der Dateien mit Treffern; jede andere Zeile wird
   verworfen. Eine solche Zeile genügt, um die Strategie auszulösen, sodass auch eine
   Protokollzeile zählt, die mit einem Zeitstempel wie `12:30:45` beginnt.
3. **`shellOutput`**: Bei Ausgaben, die eine ANSI-CSI-Sequenz (`ESC[`, gefolgt von
   Ziffern oder Semikolons und anschließend einem Buchstaben, wie bei Farbcodes) oder
   irgendwo im Text ein `$` gefolgt von einem Leerraumzeichen enthalten, werden diese
   Sequenzen entfernt (andere Escape-Sequenzen wie `ESC[?25l` oder eine
   OSC-Fenstertitelsequenz bleiben erhalten), und die letzten 50 Zeilen werden
   beibehalten, wobei aufeinanderfolgende identische Zeilen zusammengefasst werden. Da
   diese Prüfung vor `json` und `errorMessage` ausgeführt wird, erreichen JSON- oder
   Fehlerausgaben, die ein solches `$` enthalten, diese Strategien nie, solange
   `shellOutput` aktiviert ist.
4. **`json`**: Eine JSON-Nutzlast mit mehr als 2.000 Zeichen, die (nach optionalem
   Leerraum) mit `{` oder `[` beginnt und erfolgreich geparst werden kann, wird
   zusammengefasst: Bei einem Array mit mehr als 7 Elementen werden die ersten 5 und
   die letzten 2 Elemente sowie die Gesamtanzahl beibehalten, und bei einem Objekt
   werden die ersten 20 Schlüssel beibehalten, wobei jeder Wert eines verschachtelten
   Objekts oder Arrays durch einen Platzhalter `{…N keys}` ersetzt wird (bei einem
   Array ist N dessen Länge) und eine Markierung `_remaining_<N>_keys` die nach den
   ersten 20 verworfenen Schlüssel zählt. Skalare Werte werden vollständig kopiert,
   sodass ein Objekt mit höchstens 20 Schlüsseln und ohne verschachtelte Werte lediglich
   neu eingerückt wird — ein minimiertes Objekt erhält zusätzliche Zeichen und bleibt
   unverändert.
5. **`errorMessage`**: Bei Ausgaben, die unabhängig von der Groß-/Kleinschreibung
   irgendwo `error:`, `error ` (das Wort gefolgt von einem Leerzeichen, wie in
   `no error found`), `[error]`, `exception:`, `exception `, `[exception]` oder
   `traceback` enthalten, werden die erste Zeile, die nächsten 10 Zeilen und die
   letzten 3 Zeilen beibehalten; die dazwischenliegenden Zeilen werden durch eine
   Markierung `… [N frames elided] …` ersetzt. Die Markierung erscheint nur, wenn mehr
   als 13 Zeilen auf die erste Zeile folgen, sodass Fehlerausgaben mit höchstens 14
   Zeilen nicht gekürzt werden (bei 12 oder 13 Zeilen wiederholen die letzten 3 bereits
   beibehaltene Zeilen).

Nachdem eine Strategie zutrifft, werden die späteren Strategien nicht mehr
ausprobiert, selbst wenn die zutreffende Strategie keine Einsparung erzielt. Wenn die
zutreffende Strategie keine geschätzten Token einspart (Länge ÷ 4, aufgerundet) —
beispielsweise bei einer codeartigen Datei mit höchstens 25 Zeilen oder einem
JSON-Array mit mehr als 2.000 Zeichen und höchstens 7 Elementen — behält die aggressive
Engine das ursprüngliche Werkzeugergebnis bei: Beide Aufrufer (`compressAggressive()`
und `compressAnthropicToolResultBlock()`) behalten das Original bei, wenn `saved`
höchstens 0 ist, während `compressToolResult()` selbst weiterhin die Ausgabe dieser
Strategie zurückgibt. Der Werkzeugergebnisschritt ist nicht die letzte Instanz: Der
Fallback-Zusammenfasser der Engine kann eine `tool`- oder `function`-Nachricht mit mehr
als 8.192 Zeichen (`maxTokensPerMessage`, 2.048, multipliziert mit 4) weiterhin kürzen.

#### Verwendung

Die Komprimierung von Werkzeugergebnissen ist Schritt 1 der aggressiven Engine
(`compressAggressive()` in `open-sse/services/compression/aggressive.ts`), daher wird
sie im Aggressive-Modus und in einem `aggressive`-Schritt einer gestapelten Pipeline
ausgeführt. Sie komprimiert `tool`- und `function`-Nachrichten im OpenAI-Format sowie
den Text innerhalb von Anthropic-`tool_result`-Blöcken. Jede Strategie verfügt unter
`aggressive.toolStrategies` über einen eigenen Schalter; standardmäßig sind alle
aktiviert. Im Dashboard befinden sich die Schalter in der **Advanced**-Ansicht der
Caveman-Seite, wenn die Komprimierung aktiviert und Aggressive der Standardmodus ist.

### Gestapelte Pipeline

Der gestapelte Modus führt **mehrere Engines nacheinander** aus — üblicherweise zuerst
RTK (60–90 % Einsparung bei Werkzeugausgaben), anschließend Caveman für den
verbleibenden Text (~46 % Einsparung bei der Eingabe). Kombiniert ergibt dies den
**geeigneten Bereich von 78–95 %** (siehe „Upstream Savings Math“ oben):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` beträgt im Durchschnitt ≈89 %.

#### Funktionsweise

```
Eingabe (1000 Token)
  → RTK (befehlsorientierter Filter) → 200 Token
    → Caveman (Entfernung von Fülltext) → 108 Token
  → Ausgabe (108 Token, ~89 % Einsparung)
```

#### Verwendung

Verwenden Sie den gestapelten Modus für:

- Arbeitsabläufe mit intensiver Werkzeugnutzung (agentisches Programmieren, Recherche)
- Kostensensitive Stapelverarbeitung
- Situationen, in denen Sie maximale Token-Einsparungen benötigen

Gestapelte Pipelines werden über die globale Komprimierungseinstellung
`stackedPipeline` oder über eine benannte Komprimierungskombination konfiguriert, die
einer Routing-Kombination zugewiesen ist (siehe „Per-Combo Override“ oben) — nicht über
ein `modePack` einer automatischen Kombination (dieses Feld gewichtet lediglich die
Modellauswahl der automatischen Kombination neu, und `stacked` ist kein gültiger
Paketname).

---

## Überschreibungen für Komprimierungskombinationen

Sie können den globalen Komprimierungsmodus **pro Kombination** überschreiben, um das Verhalten
für verschiedene Anwendungsfälle gezielt anzupassen:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Dies ist in folgenden Fällen nützlich:

- **Coding-Kombinationen**: Verwenden Sie den Modus `aggressive` für lange Sitzungen
- **Kombinationen für schnelle Fragen und Antworten**: Verwenden Sie den Modus `lite` für schnelle Antworten
- **Werkzeugintensive Kombinationen**: Verwenden Sie den Modus `stacked` für maximale Einsparungen
- **Produktionskombinationen**: Deaktivieren Sie die Überschreibung für Anbieter mit Caching — die stets aktive
  Cache-bewusste Anpassung stuft `aggressive`/`ultra` automatisch auf `standard` herab
  (es gibt keinen auswählbaren Modus `cache-aware`)

---

## Siehe auch

- [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Umgebungsvariablen für die Komprimierung
- [Architekturleitfaden](../architecture/ARCHITECTURE.md) — Interna der Komprimierungspipeline
- [Benutzerhandbuch](../guides/USER_GUIDE.md) — Erste Schritte mit der Komprimierung
- [RTK-Komprimierung](./RTK_COMPRESSION.md) — RTK-Filter, Vertrauensmodell, Prüf-Gate, Wiederherstellung der Rohausgabe
- [Komprimierungs-Engines](./COMPRESSION_ENGINES.md) — Caveman, RTK, Stacked, APIs, MCP, Dashboard
- [Format der Komprimierungsregeln](./COMPRESSION_RULES_FORMAT.md) — JSON-Format für Regelpakete
- [Sprachpakete für die Komprimierung](./COMPRESSION_LANGUAGE_PACKS.md) — Sprachspezifische Caveman-Regeln
