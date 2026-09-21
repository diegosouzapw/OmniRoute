# RTK Compression (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Die RTK-Komprimierung ist OmniRoutes befehlsorientierte Komprimierungs-Engine für Terminal- und Tool-Ausgaben. Sie ist
für Sitzungen mit Coding-Agenten konzipiert, bei denen der Kontextzuwachs hauptsächlich durch Testprotokolle, Build-Ausgaben,
Ausgaben von Paketmanagern, Shell-Transkripte, Docker-Ausgaben, git-Ausgaben und Stacktraces entsteht.

RTK kann direkt mit `defaultMode: "rtk"` oder als erster Schritt in einer gestapelten Pipeline ausgeführt werden, üblicherweise:

```txt
rtk -> caveman
```

Diese Reihenfolge komprimiert zuerst störende Maschinenausgaben und lässt Caveman anschließend die verbleibenden Fließtexte verdichten.

Das vorgelagerte RTK-Projekt gibt Einsparungen von `60-90%` bei Befehlsausgaben an. Die Beispielsitzung in seiner README reduziert sich von
`~118,000` Standard-Tokens auf `~23,900` RTK-Tokens, was einer Einsparung von `79.7%` (`~80%`) entspricht. OmniRoute verwendet
diesen vorgelagerten Durchschnitt für die Berechnung der gestapelten Einsparungen zusammen mit der Caveman-Eingabekomprimierung:

```txt
RTK-Durchschnitt:  80% eingespart
Caveman-Eingabe:   46% eingespart
Gestapelt:         1 - (1 - 0.80) * (1 - 0.46) = 89.2% eingespart
Bereich:           1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Was komprimiert wird

Der integrierte Katalog enthält derzeit 49 Filter in diesen Kategorien:

| Kategorie | Beispiele                                                     |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-Tests, Cargo-Tests       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, generische Shell-Protokolle             |
| `docker`  | `docker ps`, Docker-Protokolle                                |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON-Ausgabe, Stacktraces, generischer Ausgabe-Fallback       |

Der Detektor in `open-sse/services/compression/engines/rtk/commandDetector.ts` klassifiziert die Ausgabe
vor der Filterauswahl. Filter können auch anhand von Befehlsmustern oder regulären Ausdrücken für Ausgaben übereinstimmen, wenn eine
Befehlsklasse nicht ausreicht.

## Filterauflösung

RTK lädt Filter in dieser Reihenfolge:

1. Projektfilter aus `.rtk/filters.toml` und `.rtk/filters.json`, jedoch nur bei bestehendem Vertrauen.
2. Globale Filter aus `DATA_DIR/rtk/filters.toml` und `DATA_DIR/rtk/filters.json`.
3. Integrierte Filter aus `open-sse/services/compression/engines/rtk/filters/`.

Innerhalb desselben Gültigkeitsbereichs haben RTK-TOML-Filter nach Schema v1 Vorrang vor OmniRoute-JSON-Filtern. TOML-
`match_command`-Ausdrücke werden vor der Prüfung des Befehlstyps ausgewertet, sodass ein importierter befehlsspezifischer
Filter einen allgemeineren Filter im selben Gültigkeitsbereich überschreiben kann. Der Projektbereich hat weiterhin Vorrang vor dem globalen
Bereich, unabhängig vom Dateiformat.

Projektfilter unterliegen bewusst einer Vertrauensprüfung, da Regex-Filter verändern können, wie Tool-Ausgaben
Agenten angezeigt werden. Eine Projektfilterdatei wird akzeptiert, wenn eine der folgenden Bedingungen erfüllt ist:

- `rtkConfig.trustProjectFilters` ist `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ist gesetzt.
- `.rtk/trust.json` enthält den passenden SHA-256-Hash für die Projektfilterdatei.

Beispiel für eine Vertrauensdatei:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Die Hashes sind getrennt: `filtersSha256` autorisiert `.rtk/filters.json`, während `filtersTomlSha256`
`.rtk/filters.toml` autorisiert. Das Bearbeiten einer der Dateien macht nur den jeweils zugehörigen Vertrauenseintrag ungültig. Globale Dateien
werden von Administratoren installiert und verwenden das bestehende Vertrauensverhalten für globale Filter.

Benutzerdefinierte Filter können aus einem einzelnen Filterobjekt oder einem Array von Filterobjekten bestehen. Ungültige benutzerdefinierte Filter werden
übersprungen und durch die Diagnosefunktion von `/api/context/rtk/filters` gemeldet. Ungültige integrierte Filter führen zu einem sofortigen Abbruch.

## Kompatibilität mit RTK-TOML-Schema v1

OmniRoute kann deklarative Filterdateien gemäß RTK-TOML-Schema v1 parsen, validieren, testen und installieren.
Die unterstützten Felder sind `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` sowie eingebettete Tests vom Typ `[[tests.<filter>]]`.
Unbekannte Felder, ungültige oder unsichere reguläre Ausdrücke, gleichzeitig verwendete Regeln zum Entfernen und Beibehalten, Dateien mit mehr als
1 MiB sowie Verweise auf unbekannte Filter werden abgelehnt. Eine Datei, deren eingebettete Tests fehlschlagen, kann zur Überprüfung
validiert, aber nicht installiert oder geladen werden. Fehler beim Laden benutzerdefinierter Dateien werden weiterhin
nach dem Fail-open-Prinzip behandelt: Die ungültige Datei wird übersprungen, und die übrigen Filter funktionieren weiterhin.

OmniRoute empfängt die Werkzeugausgabe, nachdem der Client sie bereits erfasst hat, daher kann `filter_stderr = true`
die Prozesserfassung nicht ändern. Das Feld wird als wirkungslose Operation akzeptiert, und die Validierung gibt eine Warnung zurück.
Dies wird bewusst als **Kompatibilität mit RTK-TOML-Schema v1** und nicht als vollständige Kompatibilität
mit der ausführbaren RTK-Datei, Shell-Hooks, Rust-Befehlsimplementierungen oder der Struktur des Trust-Stores bezeichnet.

Die erweiterte RTK-Ansicht des Dashboards akzeptiert eingefügtes oder hochgeladenes TOML. Die Validierung ist schreibgeschützt.
Bei der Installation wird `DATA_DIR/rtk/filters.toml` atomar mit restriktiven Berechtigungen geschrieben und der
aktive Filterkatalog ohne Neustart aktualisiert. Das Ersetzen einer vorhandenen Datei erfordert eine ausdrückliche `overwrite`-Bestätigung
und erstellt zuvor `DATA_DIR/rtk/filters.toml.bak`.

## Filter-DSL

Filter verwenden das unter [Format der Komprimierungsregeln](./COMPRESSION_RULES_FORMAT.md) beschriebene JSON-Schema.
Die Laufzeit wendet diese Stufen in der folgenden Reihenfolge an:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> Zeilen entfernen/einschließen
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Wichtige Felder:

| Feld                         | Zweck                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `rules.stripAnsi`            | Terminal-Farb- und Steuersequenzen vor dem Abgleich entfernen                                    |
| `rules.filterStderr`         | Gängige stderr-Präfixe vor dem Abgleich/Filtern normalisieren                                    |
| `rules.replace`              | Geordnete Ersetzungen mit regulären Ausdrücken anwenden                                          |
| `rules.matchOutput`          | Eine kompakte Zusammenfassung zurückgeben, wenn die Ausgabe einer bekannten Bedingung entspricht |
| `rules.matchOutput[].unless` | Die Kurzform überspringen, wenn ein Fehler-/Fehlschlagmuster vorliegt                            |
| `rules.dropPatterns`         | Störende Zeilen entfernen                                                                        |
| `rules.includePatterns`      | Handlungsrelevante Zeilen bevorzugen                                                             |
| `rules.collapsePatterns`     | Wiederholte übereinstimmende Zeilen zusammenfassen                                               |
| `rules.deduplicate`          | Optionale Aktivierung pro Filter: aufeinanderfolgende doppelte Zeilen zusammenfassen             |
| `rules.truncateLineAt`       | Unicode-sichere Kürzung pro Zeile                                                                |
| `rules.onEmpty`              | Ersatzmeldung, wenn alle Zeilen herausgefiltert wurden                                           |
| `tests[]`                    | Vom Verifizierungs-Gate verwendete eingebettete Beispiele                                        |

Es wird erwartet, dass integrierte Filter eingebettete `tests[]`-Beispiele enthalten. Benutzerdefinierte Filter sollten
sie ebenfalls enthalten, insbesondere wenn sie projektübergreifend genutzt werden.

## Zeilendeduplizierung (zwei Ebenen)

RTK fasst doppelte Zeilen auf zwei unabhängigen Ebenen zusammen:

1. **Filterspezifisches `deduplicate` (optional, Standardwert `false`).** Ein Filter kann `rules.deduplicate: true`
   festlegen, um aufeinanderfolgende doppelte Zeilen _innerhalb der übereinstimmenden Ausgabe dieses Filters_ vor der Kürzung zusammenzufassen.
   Dies wird innerhalb von `lineFilter.ts` ausgeführt. Für Legacy-Filter wird es automatisch aktiviert, wenn der Filter
   `collapsePatterns` definiert. Schema: `deduplicate: z.boolean().default(false)` in
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Engine-weites `deduplicateThreshold` (Standardwert `3`).** Nachdem alle Filter ausgeführt wurden, fasst die Engine
   jede Folge von `>= deduplicateThreshold` identischen, aufeinanderfolgenden Zeilen im gesamten Ergebnis zusammen
   (`deduplicateRepeatedLines`, angewendet in `engines/rtk/index.ts`). Bei der Normalisierung wird der Wert auf 2–100
   begrenzt.

Der filterspezifische Durchlauf erfolgt zuerst (innerhalb des Filters), der Engine-weite Durchlauf zuletzt (über die zusammengefügte
Ausgabe), sodass beide zusammenwirken, ohne doppelt zu zählen.

## Zeilengruppierung (`enableGrouping`)

Wenn `rtkConfig.enableGrouping` auf `true` gesetzt ist (Standardwert `false`), führt RTK einen zusätzlichen `groupSimilarLines`-Durchlauf
über das Ergebnis nach der Deduplizierung aus, der Folgen _nahezu gleichwertiger_ (nicht byteidentischer)
aufeinanderfolgender Zeilen zusammenfasst. `rtkConfig.groupingThreshold` (Standardwert `3`) ist die Mindestlänge einer Folge, ab der
die Gruppierung ausgelöst wird. Dies ist das strukturelle Gegenstück zu `deduplicateThreshold`: Die Deduplizierung verarbeitet exakte Wiederholungen,
die Gruppierung verarbeitet „dieselbe Struktur mit kleinen Unterschieden“. Beide Flags sind Teil des `rtkConfig`-JSON,
das in der Tabelle `key_value` persistiert wird (siehe „Konfiguration“ oben), sodass die Einstellung Neustarts überdauert.

## Entfernen von Codekommentaren (`stripCodeComments` / `preserveDocstrings`)

Wenn `rtkConfig.applyToCodeBlocks` aktiviert ist, kann RTK auch Kommentare aus mit Fences abgegrenzten Codeblöcken entfernen:

- `stripCodeComments` (Standardwert `false`) — optional. Wenn `true`, entfernt RTK Kommentare aus mit Fences abgegrenzten JavaScript-
  und TypeScript-Blöcken. Historisch wurde das Flag zwar ausgelesen, aber nie angewendet; daher bleibt der Standardwert
  „beibehalten“, um eine unbemerkte Änderung im Produktivbetrieb zu vermeiden.
- `preserveDocstrings` (Standardwert `true`) — beim Entfernen von Kommentaren bleiben JSDoc-/`/** … */`-Blockkommentare
  erhalten (sie enthalten API-Dokumentation, deren Wert die durch sie verursachte Byteanzahl übersteigt). Auf `false` setzen, um
  auch diese zu entfernen.

Das Entfernen von Kommentaren ist in `open-sse/services/compression/engines/rtk/codeStripper.ts` implementiert. Dabei wird
der **TypeScript-Parser** (kein regulärer Ausdruck) verwendet, sodass Zeichenketten-, Template- und Regex-Literale nie fälschlich
als Kommentare interpretiert werden. Bei erkanntem JSX wird der Vorgang vollständig abgebrochen (damit Kommentare in JSX-Ausdruckscontainern
niemals beschädigt werden). Das Entfernen von Kommentaren wird derzeit **nur auf JavaScript und TypeScript** angewendet — für andere
Sprachen in der `CodeLanguage`-Menge des Strippers (Python, Rust, Go, Ruby, Java) werden Leerzeilen und
Leerraum reduziert, Kommentare jedoch nicht entfernt. Der Durchlauf für bereinigte Blöcke wird in
`rulesApplied` mit `rtk:code-strip` gekennzeichnet.

> **Hinweis — GCF/tabellarische Codierung ist eine separate Engine.** RTK enthält **nicht** den tabellarischen/spaltenorientierten
> „GCF“-JSON-Encoder (Graph Compact Format). Dieser Encoder — der einen älteren
> `omni-tabular`-Encoder ersetzt hat — befindet sich in der **headroom**-Engine
> (`open-sse/services/compression/engines/headroom/`, der eingebundene Codec liegt unter
> `headroom/gcf/`). Er steht in keinem Zusammenhang mit der hier dokumentierten RTK-Filterpipeline.

## Konfiguration

Globale Einstellungen sind über `/api/settings/compression` verfügbar. RTK-spezifische Einstellungen sind außerdem
über `/api/context/rtk/config` verfügbar.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` und `disabledFilters` verwenden Filter-IDs, zum Beispiel `test-vitest` oder `git-diff`.

Die vollständige Struktur von `rtkConfig` wird durch `RtkConfig` / `DEFAULT_RTK_CONFIG` in
`open-sse/services/compression/types.ts` definiert. Das gesamte Objekt wird als einzelner JSON-Wert in
der SQLite-Tabelle `key_value` unter `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) gespeichert und beim Lesen durch `normalizeRtkConfig` normalisiert. Daher
durchläuft jedes der folgenden Felder — einschließlich `enableGrouping`, `groupingThreshold`,
`stripCodeComments` und `preserveDocstrings` — denselben Speicher und bleibt auch nach einem Neustart erhalten.

| Schlüssel              | Standardwert | Zweck                                                                                                      |
| ---------------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`          | Engine-weit: Mindestanzahl aufeinanderfolgender identischer Zeilen zum Zusammenfassen (begrenzt auf 2–100) |
| `enableGrouping`       | `false`      | Optional: Folgen nahezu gleichwertiger aufeinanderfolgender Zeilen zusammenfassen                          |
| `groupingThreshold`    | `3`          | Mindestanzahl aufeinanderfolgender ähnlicher Zeilen, die eine Gruppierung auslöst                          |
| `stripCodeComments`    | `false`      | Optional: Kommentare aus abgegrenzten Codeblöcken entfernen (erfordert `applyToCodeBlocks`)                |
| `preserveDocstrings`   | `true`       | Beim Entfernen von Kommentaren JSDoc-/`/** … */`-Blöcke beibehalten                                        |

## API

| Route                              | Methode | Zweck                                                       |
| ---------------------------------- | ------- | ----------------------------------------------------------- |
| `/api/context/rtk/config`          | GET     | RTK-Konfiguration lesen                                     |
| `/api/context/rtk/config`          | PUT     | RTK-Konfiguration aktualisieren                             |
| `/api/context/rtk/filters`         | GET     | Filterkatalog und Ldiagnosen auflisten                      |
| `/api/context/rtk/import`          | POST    | RTK-TOML-Dateien mit Schema v1 validieren oder installieren |
| `/api/context/rtk/test`            | POST    | Vorschau der RTK-Komprimierung für eine Textnutzlast        |
| `/api/context/rtk/raw-output/[id]` | GET     | Aufbewahrte, redigierte Rohausgabe lesen                    |
| `/api/compression/preview`         | POST    | Vorschau für einen beliebigen Komprimierungsmodus           |

RTK-Testnutzlast:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Nutzlast für die Komprimierungsvorschau:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Verwaltungsrouten erfordern eine Dashboard-Verwaltungsauthentifizierung oder die entsprechende API-Schlüsselrichtlinie.

Nutzlast für die RTK-TOML-Validierung:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Verwenden Sie `"action": "install"`, um die validierte Datei global zu installieren. Fügen Sie
`"overwrite": true` erst hinzu, nachdem Sie das Ersetzen einer vorhandenen globalen Datei geprüft und bestätigt haben.

## Wiederherstellung der Rohausgabe

RTK gibt normalerweise nur komprimierten Text zurück. Für die Fehlersuche kann `rawOutputRetention` die geschwärzte
Rohausgabe aufbewahren:

| Wert       | Verhalten                                                        |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Rohausgabe nicht aufbewahren                                     |
| `failures` | Nur Ausgaben wahrscheinlicher Fehler aufbewahren                 |
| `always`   | Jede komprimierte RTK-Rohausgabe nach der Schwärzung aufbewahren |

Aufbewahrte Dateien werden unter folgendem Pfad gespeichert:

```txt
DATA_DIR/rtk/raw-output/
```

Geheimnisse werden vor der Speicherung geschwärzt, darunter gängige Bearer-Token, API-Schlüssel, Slack-Token,
AWS-Zugriffsschlüssel sowie Zuweisungswerte wie `token=...`, `secret=...` und `password=...`. Die Analyse
speichert nur die Zeiger-ID sowie Metadaten zu Größe und Hash.

## Verifizierungs-Gate

Das fokussierte Verifizierungs-Gate führt integrierte Inline-Filtertests aus, ohne externe Befehle über eine Shell aufzurufen:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Das umfassendere RTK-Gate lautet:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Führen Sie vor der Veröffentlichung das umfassende Komprimierungs-Gate aus:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK erweitern

1. Fügen Sie eine Filter-JSON-Datei hinzu oder aktualisieren Sie eine vorhandene.
2. Fügen Sie mindestens ein `tests[]`-Beispiel hinzu, das das wichtige Verhalten nachweist.
3. Fügen Sie für neue Befehlsfamilien eine Fixture unter `tests/unit/compression/fixtures/rtk/` hinzu.
4. Ergänzen Sie beim Einführen einer neuen Ausgabeklasse die Abdeckung der Befehlserkennung.
5. Führen Sie das Verifizierungs-Gate und das umfassende RTK-Gate aus.
6. Wenn der Filter projektspezifisch ist, committen Sie `.rtk/filters.json` und aktualisieren Sie `.rtk/trust.json` erst nach der Überprüfung.

---

## Intensitätsstufen (v3.8.16+)

RTK unterstützt **3 Intensitätsstufen**, die einen Kompromiss zwischen **Komprimierungsaggressivität** und **Sicherheit** darstellen. Die Stufe wird über `config.intensity` in der Engine-Konfiguration festgelegt.

### Die 3 Stufen

| Stufe                 | Kürzungsschwellenwert   | Token-Einsparung | Risiko      | Am besten geeignet für                 |
| --------------------- | ----------------------- | ---------------- | ----------- | -------------------------------------- |
| `minimal`             | 24 Zeilen pro Abschnitt | ~20-40%          | Sehr gering | Produktion mit kritischem Kontext      |
| `standard` (Standard) | 24 Zeilen pro Abschnitt | ~50-70%          | Gering      | Tägliche Coding-Sitzungen              |
| `aggressive`          | 16 Zeilen pro Abschnitt | ~70-90%          | Mittel      | Lange Sitzungen, maximale Einsparungen |

### Wo die Kürzung erfolgt

Der Kürzungsschwellenwert wirkt sich auf `lineFilter.ts` aus:

```ts
// Aus open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Sowohl der **Anfang** als auch das **Ende** jedes Abschnitts bleiben erhalten; Inhalte in der Mitte werden entfernt, sobald die Kürzung greift.

### Was erhalten bleibt und was gekürzt wird

| Inhalt                           | minimal            | standard           | aggressive         |
| -------------------------------- | ------------------ | ------------------ | ------------------ |
| Fehler / Stacktraces             | ✅ beibehalten     | ✅ beibehalten     | ✅ beibehalten     |
| Testfehlschläge                  | ✅ beibehalten     | ✅ beibehalten     | ✅ beibehalten     |
| Build-Fehler                     | ✅ beibehalten     | ✅ beibehalten     | ✅ beibehalten     |
| Erfolgreiche Tests (ausführlich) | ✅ beibehalten     | 🟡 zusammengefasst | 🟡 zusammengefasst |
| Routineausgabe (Info-Logs)       | 🟡 zusammengefasst | 🟡 zusammengefasst | ❌ entfernt        |
| Fortschrittsbalken               | 🟡 zusammengefasst | ❌ entfernt        | ❌ entfernt        |
| Banner / ASCII-Art               | 🟡 zusammengefasst | ❌ entfernt        | ❌ entfernt        |

### Auswahl der richtigen Intensität

```
                  Wäre ein Kontextverlust katastrophal?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JA          NEIN       UNSICHER
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Wie wichtig     Zuerst `standard` testen
      │      ist der         (funktioniert in 80 %
      │      Durchsatz?      der Fälle)
      │           │
      │      ┌────┴────┐
      │      │         │
      │   GERING      HOCH
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensität konfigurieren

**Pro Combo** (in der Combo-Konfiguration):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Programmatisch**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) ist eine
`CompressionEngine` und besitzt keine `updateConfig`-Methode. Aktualisieren Sie die Konfiguration
einer Engine stattdessen über die Registry-Hilfsfunktion:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Wirkung überprüfen

Verwenden Sie das **Verifizierungs-Gate** (siehe unten), um zu bestätigen, dass Ihr Filter bei der gewählten Intensität sicher ist:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filter bei aggressiver Intensität fehlgeschlagen");
}
```

---

## Entwicklung benutzerdefinierter Filter (v3.8.16+)

Das Verzeichnis `engines/rtk/filters/` enthält **49+ integrierte Filter-JSON-Dateien**. Sie können eigene Filter hinzufügen, um die Ausgabe benutzerdefinierter Tools zu komprimieren, die von den Standardfiltern nicht abgedeckt werden.

### Filterschema (Zod)

```ts
{
  "id": "string",                      // Erforderlich. Filterkennung (Kebab-Case, z. B. "python-traceback")
  "label": "string",                   // Erforderlich. Benutzerfreundlicher Filtername
  "description": "string",             // Optional (Standard: ""). Kurzbeschreibung der Filterfunktion
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Optional (0–100, Standard: 50). Ausführungsreihenfolge (höher = zuerst)
  "match": {
    "commands": ["string"],            // Abzugleichende Befehlsnamen (z. B. "python", "pytest")
    "patterns": ["string"],            // Reguläre Ausdrücke zum Abgleichen der Ausgabe
    "outputTypes": ["string"]          // Erkannte Ausgabeklassen (z. B. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Optional (Standard: false). ANSI-Farbcodes entfernen
    "replace": [                       // Such-und-Ersetzungs-Regeln (Standard: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Bei Musterübereinstimmung vorzeitig beenden (Standard: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Überspringen, wenn dieses Muster übereinstimmt
      }
    ],
    "includePatterns": ["string"],     // Beizubehaltende Zeilen (reguläre Ausdrücke, Standard: [])
    "dropPatterns": ["string"],        // Zu verwerfende Zeilen (reguläre Ausdrücke, Standard: [])
    "collapsePatterns": ["string"],    // Auf ein einzelnes Vorkommen zu reduzierende Zeilen (Standard: [])
    "deduplicate": boolean,            // Optional (Standard: false). Doppelte Zeilen entfernen
    "truncateLineAt": number,          // Optional (Standard: 0). Zeilen auf die maximale Zeichenanzahl kürzen
    "maxLines": number,                // Optional (Standard: 0). Harte Obergrenze für die Gesamtzahl der Zeilen
    "headLines": number,               // Optional (Standard: 20). Die ersten N Zeilen der übereinstimmenden Ausgabe beibehalten
    "tailLines": number,               // Optional (Standard: 20). Die letzten N Zeilen der übereinstimmenden Ausgabe beibehalten
    "onEmpty": "string",               // Optional (Standard: ""). Ersatzmeldung, falls alle Zeilen herausgefiltert wurden
    "filterStderr": boolean            // Optional (Standard: false). Auch die stderr-Ausgabe filtern
  },
  "preserve": {
    "errorPatterns": ["string"],       // Muster, die immer beibehalten werden müssen (Standard: [])
    "summaryPatterns": ["string"]      // Muster für die abschließende Zusammenfassungszeile (Standard: [])
  },
  "tests": [                           // Inline-Tests zur Überprüfung (Standard: [])
    {
      "name": "string",               // Erforderlich. Testname
      "input": "sample output",        // Erforderlich. Beispiel-Eingabetext
      "expected": "expected output",   // Erforderlich. Erwartete komprimierte Ausgabe
      "command": "optional command"    // Optional. Befehlskontext
    }
  ]
}
```

### Beispiel: Python-Traceback-Filter

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Laden benutzerdefinierter Filter

Legen Sie die Datei an einem der erkannten Speicherorte ab:

```
~/.omniroute/rtk/filters/my-filter.json     # Benutzerebene
<project>/.rtk/filters/my-filter.json      # Projektebene
```

Filter werden beim Start automatisch über `loadRtkFilters()` in `open-sse/services/compression/engines/rtk/filterLoader.ts` geladen. Der Loader erkennt Filter aus folgenden Quellen:

- Integrierter Katalog: `open-sse/services/compression/engines/rtk/filters/`
- Benutzerverzeichnis: `~/.omniroute/rtk/filters/`
- Projektverzeichnis: `<project>/.rtk/filters/`

So laden Sie Filter programmgesteuert:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Optionen: customFiltersEnabled (Benutzer-/Projektfilter laden, standardmäßig aktiviert),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validierung

Filter werden beim Laden anhand des Zod-Schemas validiert. Ein Filter mit einer ungültigen Struktur kann nicht geladen werden und erzeugt einen protokollierten Fehler:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Um alle installierten Filter zu validieren, rufen Sie `runRtkFilterTests()` auf, das aus `open-sse/services/compression/engines/rtk/verify.ts` exportiert wird.

### Bewährte Verfahren

1. **Immer `tests[]` einschließen** — sie belegen, dass Ihr Filter funktioniert, und verhindern Regressionen
2. **`matchOutput` für Kurzschlussauswertungen verwenden** — wenn eine einzelne Zeile alles Wesentliche aussagt, ersetzen Sie den gesamten Block
3. **`keep` gegenüber `strip` bevorzugen** — explizite Regeln nach dem Prinzip „immer beibehalten“ sind sicherer als „immer entfernen“
4. **Auf allen 3 Intensitätsstufen testen** — `minimal` sollte keine Änderungen bewirken, `aggressive` sollte Fehler weiterhin beibehalten
5. **Das Feld `unless` verwenden** — sichern Sie Kurzschlussauswertungen mit „nicht auslösen, wenn X vorhanden ist“ ab

---

## Wiederherstellung der Rohausgabe & Verifizierungs-Gate

Wenn RTK die Ausgabe aggressiv komprimiert, können Sie den **ursprünglichen Text wiederherstellen**, um ihn zu debuggen, zu prüfen oder erneut wiederzugeben.

### Funktionsweise der Wiederherstellung der Rohausgabe

```
Ursprüngliche Ausgabe (10K Token)
        │
        ▼
RTK-Komprimierung (mit rawOutput.enabled=true)
        │
        ├─▶ Komprimierte Ausgabe (2K Token)  ──▶ an das LLM
        │
        └─▶ Ursprüngliche Ausgabe (10K Token) ──▶ in der DB gespeichert
                                                   (über request_id verknüpft)
```

### Aktivieren der Speicherung von Rohausgaben

**Pro Anfrage** (in der Combo-Konfiguration):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Begrenzung auf 1 MB
    }
  }
}
```

**Standard**: `rawOutput.enabled: false` (spart Speicherplatz).

### Speicherkosten

| Pro Anfrage                           | Begrenzung auf 1 MB | Begrenzung auf 10 MB |
| ------------------------------------- | ------------------- | -------------------- |
| Durchschnittlich komprimierte Ausgabe | ~5KB                | ~5KB                 |
| Gespeicherte Rohausgabe               | ~50-500KB           | ~500KB-5MB           |
| Bei 1000 Anfragen/Tag                 | 50-500MB/Tag        | 500MB-5GB/Tag        |

> **Empfehlung**: Aktivieren Sie Rohausgaben nur für **Debugging-Sitzungen** oder **stichprobenartige Audits**, nicht dauerhaft.

### Wiederherstellen des Originals

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId aus den Komprimierungsstatistiken
if (raw) {
  console.log("Original output:", raw);
}
```

Die `pointerId` wird nach der Komprimierung in `CompressionStats.rtkRawOutputPointers[]` zurückgegeben.
Die Funktionssignatur finden Sie unter `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Das Verifizierungs-Gate

Die **RTK-Filterverifizierung** (`open-sse/services/compression/engines/rtk/verify.ts`) validiert alle Filter anhand ihrer `tests[]` und stellt sicher, dass sie bei allen 3 Intensitätsstufen korrekt funktionieren.

**Rufen Sie `runRtkFilterTests()` auf**, um die Verifizierung auszuführen:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Was validiert wird**:

1. Jeder Filter wird geladen und besteht die Schemavalidierung
2. Jeder `tests[]`-Eintrag erzeugt die erwartete Ausgabe
3. Die Intensität `minimal` ist eine No-op-Operation (behält das Original bei und wendet nur strukturelle Filter an)
4. Die Intensität `aggressive` bewahrt Fehler, fehlgeschlagene Tests und Stacktraces
5. Die komprimierte Ausgabe ist niemals größer als die ursprüngliche Eingabe

- Quelle: `open-sse/services/compression/engines/rtk/` (63 Dateien, ~70KB)

- **Vor dem Zusammenführen einer Filteränderung** — stellen Sie stets sicher, dass die Tests erfolgreich sind
- **Nach einem Upgrade der RTK-Engine** — das Schema könnte sich geändert haben
- **Regelmäßig im Monitoring** — schützt vor Abweichungen in den Test-Fixtures
- **Beim Hinzufügen einer neuen Tool-/Befehlsfamilie** — belegt, dass der neue Filter funktioniert

---

## Siehe auch

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Vollständiger Überblick über die Komprimierungspipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Engine-Registry und integrierte Engines
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Benutzerdefinierte Engines, Sprachpakete, gestapelte Pipelines
- Quelle: `open-sse/services/compression/engines/rtk/` (63 Dateien, ~70 KB)
