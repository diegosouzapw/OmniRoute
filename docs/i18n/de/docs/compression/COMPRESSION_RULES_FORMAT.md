# Compression Rules Format (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Komprimierungsregeln sind JSON-Dateien, die zur Laufzeit geladen werden. Sie enthalten bewusst ausschließlich Daten, damit neue Sprachpakete und RTK-Befehlsfilter überprüft werden können, ohne den Engine-Code zu ändern.

> **Kanonisches Schema (maßgebliche Quelle):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema Draft 2020-12).
> Die folgenden Beispiele dienen der Veranschaulichung — validieren Sie Ihr Paket im Zweifelsfall anhand von `_schema.json`.

## Caveman-Regelpakete

Caveman-Regelpakete befinden sich unter:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Jedes Paket enthält Ersetzungen, die auf normalen Fließtext angewendet werden, nachdem geschützte Bereiche isoliert wurden.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman-Felder

| Feld                     | Erforderlich | Beschreibung                                                                           |
| ------------------------ | ------------ | -------------------------------------------------------------------------------------- |
| `language`               | ja           | BCP-47-ähnlicher Sprachschlüssel wie `en`, `pt-BR`, `es`                               |
| `category`               | ja           | Dateiname/Kategorie des Pakets, zum Beispiel `filler` oder `dedup`                     |
| `rules`                  | ja           | Array von Regex-Ersetzungsregeln                                                       |
| `rules[].name`           | ja           | Stabiler Regelname                                                                     |
| `rules[].pattern`        | ja           | JavaScript-Regex-Quelltext                                                             |
| `rules[].flags`          | nein         | JavaScript-Regex-Flags; Standardwert `gi`                                              |
| `rules[].replacement`    | nein         | Ersetzungszeichenfolge oder Rückfallwert, wenn `replacementMap` keinen Treffer enthält |
| `rules[].replacementMap` | nein         | Trefferspezifische Ersetzungen, indiziert nach normalisiertem Treffertext              |
| `rules[].context`        | nein         | `all`, `user`, `assistant` oder `system`; Standardwert `all`                           |
| `rules[].category`       | nein         | `filler`, `context`, `structural`, `dedup`, `terse` oder `ultra`                       |
| `rules[].minIntensity`   | nein         | `lite`, `full` oder `ultra`; Standardwert `lite`                                       |
| `rules[].description`    | nein         | Für Menschen lesbare Zusammenfassung der Regel                                         |

Verwenden Sie `flags`, wenn die Groß-/Kleinschreibung beim Abgleich relevant ist, beispielsweise beim Entfernen von Artikeln vor kleingeschriebenem Fließtext, ohne dabei `the OpenAI API` zu entfernen. Verwenden Sie `replacementMap`, wenn ein regulärer Ausdruck mehrere Alternativen mit unterschiedlichen Ausgaben enthält; dadurch bleiben JSON-Regelpakete reine Datendateien, während das Verhalten der komplexeren integrierten TypeScript-Ersetzungsfunktionen erhalten bleibt.

## RTK-Filterpakete

RTK-Filter befinden sich unter:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Jeder Filter beschreibt, wie eine Familie von Befehlsausgaben erkannt und komprimiert wird.

```json
{
  "id": "test-vitest",
  "label": "Vitest-Ausgabe",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "behält fehlgeschlagene Tests bei",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK-Felder

| Feld                       | Erforderlich | Beschreibung                                                                   |
| -------------------------- | ------------ | ------------------------------------------------------------------------------ |
| `id`                       | ja           | Stabile Filter-ID                                                              |
| `label`                    | ja           | Im Dashboard lesbarer Name                                                     |
| `category`                 | ja           | Filterfamilie: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | nein         | Bei Übereinstimmung mit mehreren Filtern gewinnt die höhere Priorität          |
| `match.outputTypes`        | nein         | IDs der Detektorausgabe, die diesen Filter auswählen                           |
| `match.commands`           | nein         | Befehlstoken, die diesen Filter auswählen                                      |
| `match.patterns`           | nein         | Regex-Muster, die diesen Filter anhand des Ausgabetextes auswählen             |
| `rules.stripAnsi`          | nein         | ANSI-Escapesequenzen vor den Regex-Verarbeitungsstufen entfernen               |
| `rules.replace`            | nein         | Geordnete Regex-Ersetzungen, die zeilenweise angewendet werden                 |
| `rules.matchOutput`        | nein         | Regeln für die vorzeitige Ausgabe mit optionaler `unless`-Bedingung            |
| `rules.includePatterns`    | nein         | Zeilen, deren Beibehaltung bevorzugt werden soll                               |
| `rules.dropPatterns`       | nein         | Zeilen, die als Rauschen entfernt werden sollen                                |
| `rules.collapsePatterns`   | nein         | Wiederholte übereinstimmende Zeilen, die zusammengefasst werden können         |
| `rules.deduplicate`        | nein         | Doppelte normalisierte Zeilen zusammenfassen                                   |
| `rules.truncateLineAt`     | nein         | Unicode-sichere Zeichenbegrenzung pro Zeile                                    |
| `rules.maxLines`           | nein         | Maximale Anzahl beibehaltener Zeilen vor der Beibehaltung der letzten Zeilen   |
| `rules.headLines`          | nein         | Beim Kürzen beibehaltene erste Zeilen                                          |
| `rules.tailLines`          | nein         | Für den aktuellen Kontext beibehaltene letzte Zeilen                           |
| `rules.onEmpty`            | nein         | Ersatzmeldung, wenn durch die Filterung sämtliche Inhalte entfernt werden      |
| `rules.filterStderr`       | nein         | Gängige stderr-Präfixe vor späteren Filterstufen normalisieren                 |
| `preserve.errorPatterns`   | nein         | Fehlerzeilen, die die Kürzung überstehen sollen                                |
| `preserve.summaryPatterns` | nein         | Zusammenfassungszeilen, die die Kürzung überstehen sollen                      |
| `tests[]`                  | nein         | Inline-Verifizierungsbeispiele für die RTK-Verifizierungsprüfung               |

RTK wendet die deklarativen Stufen in dieser Reihenfolge an: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` und `onEmpty`.

Benutzerdefinierte Filter können aus folgenden Quellen geladen werden:

1. Projektdateien `.rtk/filters.json`, jedoch nur, wenn ein übereinstimmender Hash in `.rtk/trust.json` vorhanden ist oder
   `trustProjectFilters` aktiviert wurde.
2. Globale Datei `DATA_DIR/rtk/filters.json`.
3. Integrierte Filter.

Benutzerdefinierte Projekt-/Globaldateien können ein einzelnes Filterobjekt oder ein Array von Filterobjekten enthalten. Ungültige
benutzerdefinierte Filter werden mit Diagnosemeldungen übersprungen; ungültige integrierte Filter führen zum Fehlschlagen der Validierung.

Vertrauensdatei des Projekts:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Die Umgebungsüberschreibung `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` stuft Projektfilter ohne
Hash als vertrauenswürdig ein und sollte auf die kontrollierte lokale Entwicklung beschränkt werden.

## Sicherheitsregeln

- Regeln müssen idempotent sein: Das zweimalige Ausführen desselben Filters darf die Ausgabe nicht beschädigen.
- Bewahren Sie nach Möglichkeit den exakten Fehlertext, Dateipfade, Zeilennummern und Befehlszusammenfassungen bei.
- Vermeiden Sie Regeln, die Codeblöcke, JSON-Nutzlasten, URLs oder Geheimnisse verändern.
- Ergänzen Sie die Detektor-/Filtertests um Unit-Testabdeckung für neue Befehlsfamilien.
- Fügen Sie jedem integrierten Filter und allen gemeinsam genutzten benutzerdefinierten Filtern `tests[]`-Beispiele hinzu.

## Validierung

Regelpakete werden vor der Verwendung validiert. Integrierte Caveman-Pakete und integrierte RTK-Filter brechen bei der Validierung sofort ab, damit fehlerhafte Release-Artefakte noch vor der Auslieferung erkannt werden. Benutzerdefinierte RTK-Filter werden unter Ausgabe von Diagnoseinformationen übersprungen, wenn die Parsing- oder Vertrauensvalidierung fehlschlägt.

Gezielte Validierung:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
