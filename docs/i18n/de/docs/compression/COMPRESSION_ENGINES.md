# Compression Engines (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Die OmniRoute-Komprimierung basiert auf Engine-Verträgen. Ein Modus kann eine Engine direkt
ausführen (`caveman` oder `rtk`) oder eine deterministische gestapelte Pipeline, die mehrere Engines nacheinander ausführt.

## Modi

| Modus        | Engine-Pfad                              | Vorgesehene Eingabe                                            |
| ------------ | ---------------------------------------- | -------------------------------------------------------------- |
| `off`        | keine                                    | Exakte Beibehaltung des Prompts                                |
| `lite`       | Caveman-Lite-Hilfsfunktionen             | Risikoarme, stets aktive Bereinigung                           |
| `standard`   | Caveman                                  | Verdichtung natürlichsprachlicher Prompts                      |
| `aggressive` | Caveman + Verlaufs-/Tool-Zusammenfasser  | Lange Chat-Sitzungen                                           |
| `ultra`      | Caveman + Bereinigungs-Hilfsfunktionen   | Wiederherstellung bei Erreichen des Kontextlimits              |
| `rtk`        | RTK                                      | Terminal-, Shell-, Build-, Test- und Git-Ausgaben              |
| `omniglyph`  | OmniGlyph                                | Kontext als Bild über die native Provider-Schnittstelle        |
| `stacked`    | Pipeline, standardmäßig `rtk -> caveman` | Gemischte Tool-Protokolle und Fließtext, maximale Einsparungen |

### OmniGlyph-Komprimierungsprofile

Die `omniglyph`-Engine (Paket `omniglyph`, 1.4.0+) akzeptiert ein benanntes semantisches Profil, das
global über `omniglyph.profile` in den Komprimierungseinstellungen oder für jeden Schritt über die
Schrittkonfiguration der gestapelten Pipeline festgelegt wird:

| Profil        | Abgrenzung                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Standard. Die Richtlinie, die in den veröffentlichten Messbelegen gemessen wurde — wandelt System, Tool-Dokumentation und dichten Verlauf in Bilder um |
| `balanced`    | Behält den aktiven Zustand nativ bei, schützt die letzten 8 Gesprächsrunden und verdichtet älteren abgeschlossenen Verlauf                             |
| `coding-safe` | Behält Autorität, Tool-Schemata und aktive Tool-Ausgaben nativ bei und schützt die letzten 12 Gesprächsrunden                                          |
| `passthrough` | Leitet ohne Transformation weiter; die Engine wird übersprungen                                                                                        |

Das Profil ist eine **Obergrenze, keine Untergrenze**: `mergeCompressionProfileOptions` im Paket
verhindert, dass eine Überschreibung durch den Aufrufer einen verlustbehafteten Pfad wieder öffnet, den das Profil geschlossen hat. Daher kann ein schrittspezifisches
`preserveSystemPrompt: false` die Systemkomprimierung unter `coding-safe` nicht wieder aktivieren.

An dieser Codebasis gemessen: `coding-safe` und `balanced` setzen `minCompressChars` auf den
Maximalwert und behalten System, Tool-Schemata und Tool-Ergebnisse nativ bei. Daher endet eine Sitzung, in der sich
noch kein Verlauf angesammelt hat, mit `below_min_chars`, und die Engine transformiert nichts. Aus diesem
Grund ist `aggressive` die Standardeinstellung und nicht das sicherste Profil.

Das Paket ermittelt seinen eigenen Modellbereich und sein Profil aus seiner Umgebungskonfiguration.
OmniRoute delegiert diese Entscheidung niemals: Der Adapter fixiert die Modellbeschränkung auf den
restriktivsten Bereich des Pakets, sodass Einstellungen der Host-Umgebung die Positivliste nur einschränken,
aber niemals über die von OmniRoute gemessenen Belege hinaus erweitern können.

## Engine-Registry

Die Registry befindet sich in `open-sse/services/compression/engines/registry.ts`. Engines stellen einen gemeinsamen
Vertrag bereit:

- `id`: stabile Engine-ID wie `caveman` oder `rtk`
- `apply(text, config)`: älterer Ausführungspfad, der von gestapelten Pipelines verwendet wird
- `compress(input, config)`: primärer Ausführungspfad, der Text und Statistiken zurückgibt
- `getConfigSchema()`: gibt die JSON-Schema-ähnliche Struktur der gültigen Konfiguration zurück
- `validateConfig(config)`: gibt `{ valid, errors[] }` zurück

Die Registrierung verwendet `registerCompressionEngine(engine)` (oder `registerEngine` für fortgeschrittene Fälle),
wodurch vor der Annahme `assertValidEngine()` und `validateConfig(defaultConfig)` aufgerufen werden.
Verwende `unregisterCompressionEngine(id)`, um eine Engine zur Laufzeit zu entfernen.

`strategySelector.ts` registriert die integrierten Engines, bevor die Komprimierung ausgeführt wird. Dadurch können Vorschau,
Laufzeitkomprimierung, gestapelter Modus, Tests und zukünftige Engines denselben Ausführungspfad verwenden.

### Komprimierung von MCP-Beschreibungen (verwandt)

Eine separate Registry komprimiert die Beschreibungsmetadaten von MCP-Tools auf Registry-Ebene — siehe
`open-sse/mcp-server/descriptionCompressor.ts` und [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Sie verwendet
Caveman-Regeln wieder, arbeitet jedoch mit Tool-Metadaten und nicht mit Anfrage-Payloads.

### Zusätzliche integrierte Engines

Neben Caveman, RTK und LLMLingua-2 enthält die Registry mehrere spezialisierte verlustfreie /
strukturelle Engines (verwendet von gestapelten Pipelines, dem Playground und Tests):

| Engine        | ID              | Funktionsweise                                                                                                                                                                                       |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): Ersetzt große zusammenhängende Textblöcke durch inhaltsadressierte Referenzen, sodass wiederholte/große Blöcke einmal gesendet und anschließend referenziert werden. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): Verlustfreie tabellarische Kompaktierung homogener JSON-Array-Payloads in eine spaltenorientierte Form `[N rows]`.                                                           |
| ionizer       | `ionizer`       | Zeilen-Sampling am Anfang, in der Mitte und am Ende für sehr große homogene Blöcke, wobei der ausgelassene Mittelteil als inhaltsadressierte CCR-Referenz gespeichert wird.                          |
| session-dedup | `session-dedup` | Inhaltsadressierte turnübergreifende Deduplizierung (von TokenMizer inspiriert): Blendet Text aus, der bereits in früheren Turns derselben Sitzung vorkam.                                           |

**CCR-Retrieve-Protokollanweisung (#8033):** Wenn CCR zum ersten Mal ≥1 Block in einer
Anfrage ersetzt, stellt die Engine eine einzelne, idempotente `system`-Nachricht voran (beginnend mit dem
Sentinel `[CCR protocol]`), die dem Aufrufer den Vertrag zwischen Marker und Tool erklärt: was ein
Marker `[CCR retrieve hash=<24hex> chars=N]` bedeutet, dass der Hash unverändert kopiert werden muss
(alle 24 Hexadezimalzeichen — falsch kopierte Hashes sind die wahrscheinliche Ursache für
Fehler vom Typ „Block nicht gefunden“), und dass ein Marker `[dedup:ref sha=...]` „im Verlauf
nachsehen“ und nicht „das Tool aufrufen“ bedeutet. Der Hinweis wird **nur eingefügt, wenn die
angekündigten `tools[]` des Aufrufers belegen, dass dieser `omniroute_ccr_retrieve` tatsächlich
erreichen kann** (`callerSupportsCcrRetrieve()` in
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — ein einfacher
OpenAI-kompatibler Aufrufer ohne dieses Tool erhält niemals die Anweisung, etwas aufzurufen,
das er nicht erreichen kann. Die Idempotenz wird gewährleistet, indem der Nachrichtenverlauf
vor dem Einfügen nach dem Sentinel durchsucht wird, sodass sich der Hinweis bei Anfragen über
mehrere Turns hinweg (die vorherige Nachrichten erneut übermitteln) nicht einmal pro Turn
anhäuft.

## Caveman

Der Caveman-Modus konzentriert sich auf die semantische Verdichtung normaler Prosa:

- bewahrt Codeblöcke, URLs, JSON, Pfade und strukturierte Daten
- entfernt Füllwörter, Relativierungen, wiederholten Kontext und weitschweifige Verknüpfungsformulierungen
- unterstützt sprachspezifische Dateiregelpakete in `open-sse/services/compression/rules/`
- bleibt über die bisherigen Modi `standard`, `aggressive` und `ultra` verfügbar

Die entsprechende Dashboard-Oberfläche befindet sich unter `Dashboard -> Context & Cache -> Caveman`.

Das Caveman-Upstream-Projekt berichtet von `~75%` weniger Ausgabetokens, durchschnittlichen Einsparungen
von `65%` bei der Ausgabe in Benchmarks mit einer Spanne von `22-87%` sowie von einem Tool mit `~46%`
Eingabekompression. OmniRoute verwendet bei der Dokumentation kombinierter Einsparungen für Prompts und
Kontext den eingabeseitigen Caveman-Wert; der Caveman-Ausgabemodus bleibt eine separate Funktion zur
Steuerung des Antwortverhaltens.

## RTK

Der RTK-Modus konzentriert sich auf die Ausgabe von Befehlen und Tools:

- erkennt Ausgabeklassen wie `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo-/Go-Tests, TypeScript-/Vite-/Webpack-Builds, ESLint, npm-Audits/-Installationen, Docker-Protokolle,
  Shell-`find`/`grep`, Stacktraces und generische Protokolle
- wendet 49 JSON-Filter aus `open-sse/services/compression/engines/rtk/filters/` an
- unterstützt die deklarative Pipeline im RTK-Stil: Entfernen von ANSI-Sequenzen, Ersetzen, Kurzschluss
  bei übereinstimmender Ausgabe, Entfernen/Beibehalten von Zeilen, Kürzung einzelner Zeilen,
  Head-/Tail-/Maximalzeilen-Kürzung und Fallback bei leerer Ausgabe
- unterstützt vertrauensabhängige Projektfilter in `.rtk/filters.json` und globale Filter in
  `DATA_DIR/rtk/filters.json`
- entfernt ANSI-Sequenzen, Fortschrittsrauschen, wiederholte Zeilen und wenig hilfreichen Standardtext
- bewahrt relevante Fehler, Warnungen, Zusammenfassungen, geänderte Dateien und abschließenden Kontext
- kann optional geschwärzte Rohausgaben für Wiederherstellung und Debugging über authentifizierte
  Verwaltungsrouten aufbewahren

Die entsprechende Dashboard-Oberfläche befindet sich unter `Dashboard -> Context & Cache -> RTK`.

Betriebsdetails zu benutzerdefinierten Filtern, Vertrauen, Verifizierung und Wiederherstellung von
Rohausgaben finden Sie in [`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Das RTK-Upstream-Projekt berichtet von Einsparungen von `60-90%` bei der Komprimierung von Befehlsausgaben.
Das Beispiel in der README zeigt eine 30-minütige Claude-Code-Sitzung, die von `~118,000` Tokens auf
`~23,900` reduziert wird, was einer Einsparung von `79.7%` entspricht.

## LLMLingua-2 (Semantische Bereinigung)

Der LLMLingua-2-Modus führt eine **semantische Token-Bereinigung** von Prosa mithilfe eines kleinen
ONNX-Token-Klassifikators durch und ergänzt damit die regelbasierten Caveman- und RTK-Engines:

- komprimiert ausschließlich Prosa in Nicht-Systemnachrichten; mit Begrenzungszeichen versehene
  Codeblöcke und andere geschützte Konstrukte werden niemals verändert
- führt das Backend `@atjsh/llmlingua-2` (ONNX über `@huggingface/transformers`) in einem
  Worker-Thread aus, sodass die Modellinferenz niemals die Ereignisschleife der Anfrage blockiert
- ist **kombinierbar** (`stackPriority` 35): In einer kombinierten Pipeline wird es nach den
  strukturellen Engines (CCR, session-dedup, headroom, Caveman), aber vor `ultra` ausgeführt, da
  die semantische Bereinigung bei bereits strukturell komprimiertem Text am effektivsten ist — z. B.
  `rtk -> caveman -> llmlingua`
- **bleibt bei jedem Fehler funktionsfähig** (fehlende optionale Abhängigkeiten, Start des Workers,
  Laden des Modells, Inferenz oder Zeitüberschreitung) → der ursprüngliche Text wird unverändert
  zurückgegeben, niemals ein Fehler

Speicherort der Engine: `open-sse/services/compression/engines/llmlingua/`. Die entsprechende
Dashboard-Oberfläche befindet sich unter `Dashboard -> Context & Cache -> LLMLingua`.

### Modelle

Das Standardmodell ist **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
schnell). Ein genaueres **BERT-base**-Modell (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) ist über das Feld `model` der Engine-Konfiguration verfügbar. `@huggingface/transformers`
lädt das ausgewählte Modell beim ersten Aufruf verzögert vom HuggingFace Hub nach
`${DATA_DIR}/models/llmlingua` herunter (`modelStore.ts`); durch Überschreiben der Konfiguration
`modelPath` kann stattdessen eine lokale Kopie verwendet werden (Offline-/Air-Gap-Installationen).

### Optionale Abhängigkeiten und bedarfsgesteuerte Installation

Der entfernbare LLMLingua-Runtime-Peer-Stack ist **optional**. Zwei Pakete sind in
`package.json` als `optionalDependencies` deklariert und werden beim Produktions-Build
**extern** gehalten (`scripts/build/prepublish.ts` bündelt sie nicht):

| Paket                | Version (fixiert) | Hinweise                                         |
| -------------------- | ----------------- | ------------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`           | Einstiegspaket; deklariert die anderen als Peers |
| `js-tiktoken`        | `^1.0.20`         | Tokenizer                                        |

`@huggingface/transformers` ist auf `^4.2.0` festgelegt (wird mit dem lokalen Embedding-Pfad
geteilt und auch in das eigenständige Bundle aufgenommen); `@atjsh/llmlingua-2@2.0.5` verwendet
es als Peer mit `"^3.5.2 || ^4.0.0"`, sodass sowohl Transformers.js v3 als auch v4 unterstützt
werden. Seit 2.0.4 benötigt `@atjsh/llmlingua-2` nicht mehr `@tensorflow/tfjs`, wodurch der größte
einzelne Bestandteil (TensorFlow.js) aus dem SLM-Stack entfernt wurde. Nur die beiden oben genannten
Pakete sind entfernbare SLM-Peers. Ein reguläres `npm install` (Entwicklung) installiert den optionalen
Stack automatisch, sofern optionale Abhängigkeiten nicht ausgelassen werden.

**Warum bedarfsgesteuert:** Das auf npm veröffentlichte Paket, das eigenständige Bundle und das
Docker-Image werden **ohne** diese Abhängigkeiten ausgeliefert, um schlank zu bleiben. Wenn sie fehlen,
schlägt die Abhängigkeitsprüfung des Workers (eine Auflösungsprüfung für `@atjsh/llmlingua-2` in
`worker.ts`) fehl, und die Engine **bleibt stillschweigend funktionsfähig** — die Auswahl von LLMLingua
führt zu keiner Änderung (der Text wird unverändert zurückgegeben und es wird kein Fehler protokolliert).
Um es in einer bereinigten Umgebung zu aktivieren, installieren Sie den optionalen Stack:

```bash
# auf die in package.json unter optionalDependencies deklarierten Versionen festlegen
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Durch die Entfernung von `@tensorflow/tfjs` (2.0.4+) entfällt der zuvor dominierende Beitrag von
~800 MB — der verbleibende Speicherbedarf besteht aus den Laufzeitumgebungen von transformers.js und
onnxruntime-node sowie dem TinyBERT-Modell (~57 MB), das bei der ersten Verwendung heruntergeladen
wird (nicht über npm).

Je Umgebung:

- **Entwicklung / `npm install`** — wird automatisch installiert, sofern nicht `--omit=optional`
  (oder `--no-optional`) übergeben wurde. Keine Aktion erforderlich.
- **Globales npm (`npm i -g omniroute`) / eigenständig** — führen Sie den obigen Installationsbefehl im
  Verzeichnis des installierten Pakets aus oder installieren Sie es erneut, ohne optionale Abhängigkeiten auszulassen.
- **Docker** — fügen Sie den Installationsbefehl in einer abgeleiteten Image-Schicht hinzu; das veröffentlichte Image
  ist bewusst schlank gehalten.
- **VPS (PM2)** — installieren Sie die Abhängigkeiten in `node_modules` der Anwendung und starten Sie anschließend den Prozess neu, damit der
  Worker den Prüfmechanismus erneut testet.
- **Unverarbeitetes Next-Standalone (`npm run build` → `.build/next/standalone/server.js`)** — der
  Standalone-Trace enthält WEDER den Worker NOCH die optionalen Abhängigkeiten, sodass die Engine unbemerkt
  im Fail-Open-Modus arbeitet. `scripts/build/colocate-standalone.mjs` fügt beides erneut hinzu (Worker-esbuild +
  Abschluss der optionalen Abhängigkeiten im Standalone-Verzeichnis); das Skript wird nach jedem Build automatisch über den
  npm-Hook `postbuild` ausgeführt. Idempotent und fehlertolerant, wenn Abhängigkeiten fehlen.

**Überprüfen, ob die Funktion aktiv ist:** Wenn LLMLingua ausgewählt ist, wird echter Fließtext tatsächlich gekürzt (die Engine
arbeitet nicht mehr im Fail-Open-Modus), und die erste Anfrage löst den Download des Modells nach
`${DATA_DIR}/models/llmlingua` aus. Der Prüfmechanismus testet absichtlich nur `@atjsh/llmlingua-2` —
die anderen Peers sind ausschließlich ESM-basiert, und `require.resolve` löst bei ihnen selbst dann einen Fehler aus, wenn sie vorhanden sind — daher
arbeitet der Worker weiterhin im Fail-Open-Modus, wenn zum Zeitpunkt von `import()` tatsächlich ein Peer fehlt.

## Gestapelte Pipelines

Im gestapelten Modus werden Pipeline-Schritte der Reihe nach ausgeführt. Der Standard ist:

```txt
rtk -> caveman
```

Verwenden Sie diesen Modus für Sitzungen mit Coding-Agenten, bei denen ein Prompt Befehlsausgaben mit Text von Menschen oder Assistenten kombiniert. RTK reduziert zunächst umfangreiche Tool-Protokolle, anschließend komprimiert Caveman die verbleibende natürliche Sprache.

Pipeline-Schritte werden über `stackedPipeline` in den Komprimierungseinstellungen oder über Komprimierungskombinationen konfiguriert.

Wenn beide Engines dieselbe geeignete Nutzlast reduzieren, summieren sich die Einsparungen:

```txt
kombiniert  = 1 - (1 - RTK-Einsparung) * (1 - Caveman-Eingabeeinsparung)
Durchschnitt = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
Bereich      = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP-Filter für Barrierefreiheitsbäume

Der intelligente MCP-Filter für Barrierefreiheitsbäume ist eine nachgelagerte Komprimierungsebene, die auf MCP-**Tool-Ergebnisse** angewendet wird, nicht auf Prompts oder Kontext. Er ist für die umfangreichen Nutzlasten von Barrierefreiheitsbäumen und Browser-Snapshots vorgesehen, die von Tools wie Playwright, Computer-Use und MCP-Servern zur Browserautomatisierung zurückgegeben werden.

### Funktionsweise

1. **Entfernung von Rauschen** — entfernt leere generische/Text-Einträge (`- generic:`, `- text: ""`)
2. **Zusammenfassung gleichgeordneter Elemente** — wenn ≥ `collapseThreshold` (Standard: 30) aufeinanderfolgende Zeilen strukturelle Wiederholungen sind, werden sie auf die ersten `collapseKeepHead` (Standard: 10) Zeilen + eine Zusammenfassung mit der Anzahl + die letzten `collapseKeepTail` (Standard: 5) Zeilen reduziert
3. **Beibehaltung von Referenzen** — die von Playwright/Computer-Use benötigten `[ref=eXX]`-Anker werden niemals verändert
4. **Harte Kürzung** — wenn der Text nach der Zusammenfassung weiterhin `maxTextChars` (Standard: 50.000) überschreitet, wird er mit einem Navigationshinweis gekürzt, damit der Agent weiterarbeiten kann

### Speicherort der Engine

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← Einstiegspunkt smartFilterText()
  collapseRepeated.ts ← Algorithmus zur Zusammenfassung gleichgeordneter Elemente
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguration

Die Steuerung erfolgt über `compression.mcpAccessibility` in den globalen Einstellungen (Migration 056). Standardkonfiguration:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Der Filter wird nur auf Tool-Ergebnis-Nutzlasten angewendet, deren `type` `"text"` ist und deren Länge `minLengthToProcess` überschreitet. Er wirkt sich weder auf die Prompt-Komprimierung noch auf Anfragenutzlasten aus.

### Erwartete Einsparungen

60–80 % bei Tool-Ergebnissen aus Browser-Snapshots, abhängig von der Komplexität der Seite. Der Zusammenfassungsalgorithmus hat bezüglich der Zeilenanzahl eine Laufzeitkomplexität von O(n) und verursacht eine vernachlässigbare Latenz.

### Vergleich dieses Filters mit den oben genannten Komprimierungs-Engines

| Aspekt          | Caveman / RTK / Stacked             | MCP-Filter für Barrierefreiheit        |
| --------------- | ----------------------------------- | -------------------------------------- |
| Ziel            | Anfrage-Prompts / Kontext           | MCP-Tool-Ergebnisse                    |
| Auslöser        | Einstellung des Komprimierungsmodus | `compression.mcpAccessibility.enabled` |
| Geltungsbereich | Alle SSE-Nachrichten                | Nur Tool-Ergebnisse                    |
| Referenzanker   | Nicht zutreffend                    | Werden bedingungslos beibehalten       |

---

## Komprimierungskombinationen

Komprimierungskombinationen sind benannte Komprimierungsprofile, die Routing-Kombinationen zugewiesen werden können:

- `compression_combos`: speichert Modus, Pipeline, RTK-Konfiguration, Sprachkonfiguration und Standardmarkierung
- `compression_combo_assignments`: ordnet eine Komprimierungskombination einer Routing-Kombination zu
- die Laufzeitintegration löst eine zugewiesene Komprimierungskombination vor generischen Überschreibungen der Kombination auf
- Analysen enthalten `compression_combo_id` und `engine`

Dashboard-Bereich: `Dashboard -> Context & Cache -> Compression Combos`.

## API-Oberfläche

| Route                                  | Zweck                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globale Komprimierungseinstellungen (einschließlich `mcpAccessibility`-Konfiguration) |
| `/api/compression/preview`             | Vorschau eines beliebigen Komprimierungsmodus                                         |
| `/api/compression/language-packs`      | Verfügbare Caveman-Sprachpakete auflisten                                             |
| `/api/context/caveman/config`          | Alias für Caveman-Einstellungen                                                       |
| `/api/context/rtk/config`              | RTK-Standardwerte und -Einstellungen                                                  |
| `/api/context/rtk/filters`             | RTK-Filterkatalog                                                                     |
| `/api/context/rtk/test`                | RTK-Vorschau-/Test-Endpunkt                                                           |
| `/api/context/rtk/raw-output/[id]`     | Authentifizierte Wiederherstellung redigierter Rohausgaben                            |
| `/api/context/combos`                  | CRUD für Komprimierungskombinationen                                                  |
| `/api/context/combos/[id]/assignments` | CRUD für Zuweisungen zu Routing-Kombinationen                                         |
| `/api/context/analytics`               | Alias für Komprimierungsanalysen                                                      |

Verwaltungsrouten erfordern eine Verwaltungsauthentifizierung oder API-Schlüssel-Richtlinienprüfungen.

## MCP-Tools

Die Komprimierung stellt fünf MCP-Tools bereit:

| Tool                                | Umfang              | Zweck                                      |
| ----------------------------------- | ------------------- | ------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Einstellungen, Analysen, Cache-Statistiken |
| `omniroute_compression_configure`   | `write:compression` | Globale Einstellungen aktualisieren        |
| `omniroute_set_compression_engine`  | `write:compression` | Modus und optionale Pipeline festlegen     |
| `omniroute_list_compression_combos` | `read:compression`  | Komprimierungskombinationen auflisten      |
| `omniroute_compression_combo_stats` | `read:compression`  | Kombinations-/Engine-Analysen abrufen      |

## Umfang und Ausschlüsse

**Embeddings werden niemals komprimiert.** `open-sse/handlers/embeddings.ts` ruft niemals eine
Komprimierungs-Engine auf — die Anfrage-/Antwortinhalte werden unverändert direkt an den Executor
weitergegeben. Dies ist derzeit strukturell bedingt (Embeddings und Chat Completions werden von
getrennten Handlern verarbeitet) und keine Laufzeitprüfung. Das bedeutet jedoch, dass das Problem
der Vektorverzerrung aus #8034 im Embeddings-Pfad keine Angriffsfläche hat.

**Ausschlussfilter pro Modell/Endpunkt (#8034).** Für Chat Completions kann ein Betreiber
Modell-IDs bzw. `provider/model`-Ziele angeben, die niemals komprimiert werden dürfen — eine
nützliche Schutzmaßnahme, falls die Komprimierung später näher an einen Embeddings-nahen Pfad
angebunden wird, und allgemein nützlich für jedes Modell, bei dem der Prompt bytegenau erhalten
bleiben muss (deterministische Auswertungen, cache-sensitive Präfixe usw.).

- Einstellungsfeld: `exclusions?: string[]` in der globalen Komprimierungskonfiguration
  (`GET`/`PUT /api/settings/compression`), persistiert über den vorhandenen `key_value`-Namensraum
  für die Komprimierung (`src/lib/db/compression.ts`) — keine neue Tabelle.
- Dashboard-Registerkarte: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Mustersyntax: `*` ist der einzige Platzhalter. Jedes andere reguläre Ausdrucksmetazeichen in
  einem Muster wird vor dem Abgleich maskiert, sodass `gpt-5.6` nur mit der exakten Zeichenfolge
  übereinstimmt, niemals mit `gpt-5x6` (ReDoS-sicher, begrenzt, keine verschachtelten Quantifizierer).
  Muster werden ohne Berücksichtigung der Groß-/Kleinschreibung sowohl mit der reinen Modell-ID
  als auch mit der zusammengesetzten Angabe `provider/model` abgeglichen — `gpt-5-6`,
  `openai/gpt-5-6` und `openai/*` funktionieren alle, und `*` allein schließt jedes Modell aus.
- Abgleich: `isCompressionExcluded()` / `normalizeCompressionExclusions()` in
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` prüft das ausgeschlossene Ziel
  unmittelbar nach dem Auflösen der Komprimierungseinstellungen, **bevor eine Engine ausgeführt
  wird**, und behandelt eine Übereinstimmung genau so, als wäre die Komprimierung global
  deaktiviert — der Anfrageinhalt bleibt nachweislich byteidentisch. Das Überspringen wird über
  `writeCompressionSkip(..., "excluded")` für die Sichtbarkeit in Analysen erfasst.
- Standardwert (leere/nicht vorhandene Liste): identisch mit dem Verhalten vor #8034 — nichts
  wird ausgeschlossen.

## Bekannte Einschränkungen

- **LLMLingua-2 (SLM) erfordert gemeinsam platzierte optionale Abhängigkeiten.** Der Worker wird in einem
  Produktions-Build nur ausgeführt, wenn `@atjsh/llmlingua-2` und seine Peer-Abhängigkeiten gemeinsam unter
  `dist/node_modules` platziert sind (siehe `scripts/build/colocateOptionals.mjs`, #4286). Ohne sie
  arbeitet die Engine nach dem Fail-open-Prinzip (sie gibt den ursprünglichen Text zurück). Die Auflösung des Workers hängt nicht mehr von
  `import.meta.url` ab (dies schlägt im eigenständigen Bundle fehl), sondern orientiert sich zur Laufzeit am
  cwd / an `argv[1]`.
- **Die Caveman-Sprachpakete `de` / `fr` / `ja` sind unvollständig.** Sie enthalten Regeln für `context` +
  `filler` + `structural`, aber keine Pakete für `dedup` / `ultra`, sodass die Intensität `ultra`
  für diese Sprachen nicht stärker ist als `full` (sie verwenden ausschließlich ihre eigenen Regeln — es gibt keinen
  stillen Rückgriff auf die englischen `dedup`-/`ultra`-Regeln, der fremdsprachigen Text verstümmeln würde).
  `en` / `es` / `id` / `pt-BR` sind vollständig. Beiträge in Form von `dedup.json` + `ultra.json`
  für die unvollständigen Pakete sind willkommen.
- **Die Telemetrie gestapelter Pipelines listet nur Engines auf, die eine Komprimierung erzielt haben.** Ein Schritt einer gestapelten Pipeline, dessen
  Engine ausgeführt wurde, aber 0 % Einsparung erzielte, gibt `stats:null` zurück und erscheint daher nicht in
  `engineBreakdown` — er ist somit nicht von einem übersprungenen Schritt zu unterscheiden. Die Unterscheidung zwischen
  „ausgeführt, 0 %“ und „übersprungen“ würde eine Änderung des Aufschlüsselungsmodells erfordern und wird zurückgestellt.

## Validierung

Die gezielten Prüfungen für diesen Bereich sind:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
