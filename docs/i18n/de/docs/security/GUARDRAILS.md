# Guardrails (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Verbindliche Quelle:** `src/lib/guardrails/`
> **Zuletzt aktualisiert:** 2026-08-29 — v3.8.51 (Die Herkunft des Video-Bridge-Transkripts wird vom Aufrufer deklariert,
> aber noch nicht serverseitig verifiziert — gemäß #11661 klargestellt)

Guardrails erzwingen Sicherheitsvorgaben, Richtlinien und Inhaltstransformationen an der Grenze
zwischen OmniRoute und vorgelagerten Anbietern. Jede Guardrail kann Anfrage-Payloads (`preCall`) und
Antworten vorgelagerter Anbieter (`postCall`) prüfen (und optional ablehnen, transformieren oder
mit Anmerkungen versehen).

Das System ist **fehlertolerant (Fail-open)**: Löst eine Guardrail während der Ausführung einen Fehler aus,
zeichnet die Registry den Fehler auf und fährt mit der nächsten Guardrail fort, anstatt die
Anfrage fehlschlagen zu lassen. Das Blockieren ist stets eine explizite Entscheidung (`block: true`)
und niemals ein Versehen.

## Integrierte Guardrails

Die Registry lädt beim Import automatisch sechs Guardrails in Prioritätsreihenfolge
(siehe `registry.ts` → `registerDefaultGuardrails()`):

| Priorität | Name                | Phase(n)       | Datei                 |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niedrigere Prioritätsnummern werden **zuerst** ausgeführt.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Fängt bildhaltige Anfragen ab, die an **Modelle ohne Bildverarbeitung** gerichtet sind, und
leitet entweder die gesamte Anfrage an ein bildverarbeitungsfähiges Modell um oder ersetzt
die Bildbestandteile vor dem Aufruf des vorgelagerten Anbieters durch Textbeschreibungen,
die von einem konfigurierbaren Bildverarbeitungsmodell erzeugt wurden. Dadurch können
reine Textanbieter multimodale Payloads transparent verarbeiten.

Ablauf:

1. Überspringen, wenn das Zielmodell bereits Bildverarbeitung unterstützt (es sei denn, es
   befindet sich in der Liste der Modelle mit erzwungener Bridge `isVisionBridgeForcedModel`).
2. Bildbestandteile über `extractImageParts(messages)` extrahieren
   (`visionBridgeHelpers.ts`), das die Erkennung an den **vereinheitlichten
   Mediendetektor** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` delegiert — die
   zentrale verbindliche Quelle, die gemeinsam mit dem Combo-Kompatibilitätsfilter verwendet
   wird. Die Extraktion ist auf Bestandteile der obersten Ebene beschränkt, deren Formen
   `replaceImageParts` wieder einsetzen kann (der Extrahieren↔Ersetzen-Vertrag): OpenAI
   `image_url`, Anthropic-base64 `source.type:"base64"`, Anthropic-URL
   `source.type:"url"` und Responses API `input_image`. Verschachtelte Treffer und
   reine Indikatorformen sind Material für den Combo-Filter und werden niemals extrahiert.
   Überspringen, wenn keine gefunden wurden.
3. Laufzeitkonfiguration über `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) auflösen: Neue `modalityBridge*`-
   Einstellungsschlüssel haben Vorrang; ältere `visionBridge*`-Schlüssel bleiben für
   **einen Zyklus als Rückfalloption** bestehen (Rollback-Zeitfenster). Vor jeglicher
   Medientraversierung überspringen, wenn die Bridge deaktiviert ist.
4. Der Modusauswähler (`modalityBridgeVisionMode`, siehe nachfolgende Tabelle) entscheidet
   zwischen Umleitung und Beschreibung. Bei einer Umleitung wird `modifiedPayload`
   zurückgegeben, wobei lediglich `model` ausgetauscht wurde, zusammen mit den Metadaten
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Beschreibungspfad: Bilder auf `maxImages` begrenzen, den aufgabenbezogenen Prompt
   zusammenstellen, den Beschreibungs-Cache abfragen, das Bildverarbeitungsmodell
   **parallel** aufrufen (`Promise.allSettled`) und anstelle der Bilder Textbestandteile
   im Format `[Image N]: <description>` einfügen. Eine fehlgeschlagene Beschreibung
   ergibt `null`, und der ursprüngliche Bildbestandteil bleibt **erhalten** (#4012) —
   außer im Combo-Beschreibungspfad, wenn alle Beschreibungen fehlgeschlagen sind; in
   diesem Fall erhält ein bestätigt nicht bildverarbeitungsfähiger vorgelagerter Anbieter
   stattdessen einen Platzhalter `(unavailable — no vision-capable provider connected)`
   (#8430).
6. `modifiedPayload` und Metadaten (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) zurückgeben.

#### Modusauswähler (`modalityBridgeVisionMode`)

| Modus      | Standard | Verhalten                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Unveränderte Legacy-Heuristik (#6640/#7204): Nicht-Combo-/`auto/`-Modelle werden an das beste Bildverarbeitungsmodell umgeleitet, sofern das ursprüngliche Modell nicht bereits über verwendbare Zugangsdaten verfügt (dann wird beschrieben); Combo-Ziele werden stets beschrieben.                                                                        |
| `describe` |          | Immer beschreiben — der Umleitungsblock wird vollständig übersprungen; das vom Benutzer gewählte Modell antwortet stets.                                                                                                                                                                                                                                    |
| `reroute`  |          | Umleitung erzwingen: Die Schutzprüfung zum Beibehalten eines Modells mit Zugangsdaten wird umgangen. Die Zugangsdatenprüfung für das Umleitungs-**ziel** gilt weiterhin — ist kein verwendbares Bildverarbeitungsziel vorhanden, fällt die Anfrage auf „Beschreiben“ zurück, damit unverarbeitete Bilder niemals ein reines Text-Backend erreichen (#8430). |

Erzwungene Modi schließen die Verarbeitung **vor** der Ausführung der automatischen Heuristik kurz;
das Verhalten von `auto` ist byteidentisch mit der Guardrail vor PR-1.

#### Aufgabenbezogener Beschreibungs-Prompt (`modalityBridgeVisionTaskAware`)

Standardmäßig **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) hängt
den Text der **letzten Benutzernachricht** (auf 500 Zeichen gekürzt) an den
grundlegenden Beschreibungs-Prompt an. Dadurch wird die Beschreibung darauf ausgerichtet,
wonach der Benutzer tatsächlich gefragt hat (codex-vision-proxy-Muster), und das
Bildverarbeitungsmodell wird aufgefordert, sichtbaren Text zu transkribieren. Wenn das
Flag deaktiviert ist — oder kein Benutzertext vorhanden ist — wird der grundlegende
Prompt unverändert verwendet.

Der eigene OpenAI-kompatible Request des Describe-Self-Loops (`callVisionModelSingle()`
in `visionBridgeHelpers.ts`) fordert immer `image_url.detail: "high"` an —
bedingungslos, für jeden Aufrufer/Provider und unabhängig von jeglichem Clientsignal.
Sampling mit niedriger Detailstufe verschlechtert die OCR-Genauigkeit gerade bei der
Texttranskriptionsaufgabe, die dieser Prompt verlangt. Daher fordert der Describe-Aufruf
selbst immer eine hohe Detailstufe an, unabhängig davon, welche Detailstufe der
ursprünglich eingehende Request verwendet hat. Dies betrifft nur den internen
Describe-Request-Body; es ändert nicht, wie OmniRoute den eigenen
`image_url.detail`-Wert des Aufrufers beim primären Request weiterleitet —
dieser Standardwert wird separat und nur für erkannte OpenCode-Clients in
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) angewendet. Der
Anthropic-Wire-Format-Zweig des Describe-Self-Loops besitzt kein `detail`-Feld
und ist von keinem der beiden Standardwerte betroffen.

#### Begrenzung der Describe-Ausgabe (`modalityBridgeVisionMaxChars`)

| Schlüssel                      | Standardwert | Bereich            |
| ------------------------------ | ------------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`          | `0` oder 100–50000 |

`0` (Standardwert) bedeutet **keine Begrenzung** — die von
`callVisionModel()` zurückgegebene Beschreibung wird unverändert weitergegeben,
wodurch das bestehende Verhalten erhalten bleibt. Jeder Wert im Bereich
100–50000 kürzt die Beschreibung mit dem Suffix `…`, bevor sie als
`[Image N]: <description>` wieder eingefügt wird
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Erhöhen Sie diesen Wert für detailreiche OCR-Aufgaben, bei denen das nachgelagerte
Modell die vollständige Transkription benötigt; verringern Sie ihn, um die
Token-Nutzung gesprächiger Vision-Modelle zu begrenzen.
Das Dashboard-Feld befindet sich im Bereich „Erweitert“ des Vision-Tabs
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) und hebt jeden
Wert zwischen 1 und 99 auf den Mindestwert 100 an, während ein expliziter Wert
von `0` unverändert bleibt — `0` ist eigenständig ein gültiger Zod-Wert
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`) und nicht
lediglich der Standardwert für „nicht gesetzt“.

#### Describe-Cache (`modalityBridge/bridgeCache.ts`)

Prozessweit gemeinsam genutzter In-Memory-LRU- und TTL-Cache für
Describe-Ausgaben.
Schlüssel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` mit
Längenpräfix-Rahmung (keine Kollisionen an Feldgrenzen). Die Modellkomponente ist
das **konfigurierte** Bridge-Modell, nicht das Modell, das tatsächlich geantwortet
hat — `callVisionModel` kann intern auf ein Ersatzmodell zurückfallen, und eine
Schlüsselbildung pro Versuch würde den Cache fragmentieren. Fehlgeschlagene
Describe-Aufrufe werden niemals zwischengespeichert. Einstellungen:

| Schlüssel                       | Standardwert | Bereich |
| ------------------------------- | ------------ | ------- |
| `modalityBridgeCacheEnabled`    | `true`       | —       |
| `modalityBridgeCacheTtlMinutes` | `60`         | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`        | 10–5000 |

#### Normalisierung entfernter Bilder (Self-Loop-Describe/Base64-Abruf)

Wenn die Bridge selbst ein **entferntes** Bild abruft — beim
Anthropic-Describe-Self-Call und bei der Base64-Konvertierung für das
Claude-Wire-Format (`ensureBase64ImagesForClaudeWire`), beide über
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` —, wird der resultierende
Data-URI durch `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) geleitet, bevor er in den Request an das
Vision-Modell eingebettet wird. Übergroße Bilder werden auf eine **lange Kante
von 2048px** herunterskaliert (entsprechend der Größenbegrenzung, die OpenAI/Anthropic
bereits serverseitig anwenden). Dadurch werden Upload-Datenmenge und Latenz
reduziert, ohne zu verändern, was das Vision-Modell sieht. Für die
Größenänderung wird `sharp` verwendet und per dynamischem Import geladen: Auf
einer Plattform, auf der das native Binary nicht geladen werden kann, löst
`normalizeDataUri()` **niemals eine Exception aus** — stattdessen werden die
ursprünglichen Bytes unverändert durchgereicht, sodass der Pfad für die
Describe-/Base64-Konvertierung stets funktionsfähig bleibt. Bytes, die kein Bild
darstellen (ein Abruf, der kein decodierbares Bild zurückgegeben hat), werden
ebenfalls unverändert durchgereicht. Diese Normalisierung ist auf Bilder
beschränkt, welche die Bridge für ihren eigenen Self-Call abruft — sie wird
niemals auf die unveränderte Passthrough-Nutzlast des Aufrufers angewendet, im
Einklang mit dem Prinzip, Mutationen ausschließlich nach Opt-in vorzunehmen
(Harte Regel #20).

#### Einstellungsschema + Migration

Die neuen `modalityBridge*`-Schlüssel werden in `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) durch Zod validiert:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, das
`modalityBridgeCache*`-Trio und die vom Audio Bridge verwendete
`modalityBridgeAudio*`-Gruppe. Die Migration
`141_modality_bridge_settings.sql` kopiert vorhandene ältere
`visionBridge*`-Werte in die entsprechenden neuen Schlüssel (idempotent und ohne
jemals einen vom Betreiber gesetzten `modalityBridge*`-Wert zu überschreiben);
die älteren Schlüssel werden für einen Release-Zyklus weiterhin als
Lese-Fallback akzeptiert.

#### Transparenz-Header + Statistiken

Durch Describe transformierte Responses enthalten
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(erstellt von `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`
und gesetzt von `withModalityBridgeHeader()` in
`src/sse/handlers/chatHelpers.ts`).
Umgeleitete Requests erhalten **keinen** Header — die Nutzlast blieb unverändert,
und der Modellwechsel ist bereits im `model`-Feld des Response-Bodys sichtbar.

`GET /api/modality-bridge/stats` (Management-Authentifizierung, dieselbe Stufe wie
`GET /api/settings`) gibt die prozessinternen Zähler je Modalität
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` für `vision`, `audio` und
`video` zurück. `averageLatencyMs` verwendet `latencySamples` und nicht alle
Versuche als Nenner; ein Vorgang ohne Zeitmessung erzeugt nicht künstlich eine
Stichprobe von null Millisekunden. `bridged` bleibt der abwärtskompatible Alias
für erfolgreiche Konvertierungen; fehlgeschlagene Versuche erhöhen diesen Wert
nicht.
Die Zähler werden beim Prozessneustart absichtlich zurückgesetzt
(Telemetrie, keine Abrechnung).

#### Dashboard-Konfiguration

Die dedizierte Dashboard-Seite befindet sich unter
`/dashboard/settings/modality-bridge`. Ihre über URLs aufrufbaren Registerkarten `Vision`, `Audio`
und `Video` behalten beim Wechseln des `tab`-Werts die Abfrageparameter bei.
Die Registerkarte Vision bietet Aktivierung, Modus, Modellauswahl (einschließlich des automatischen
Standardwerts), aufgabenbezogene Prompts, erweiterte Grenzwerte für Zeitüberschreitung, Bilder, Beschreibungslänge und Cache,
Laufzeitzähler sowie eine abgesicherte Beispielanfrage. Auch die Registerkarte Audio ist funktionsfähig: Sie bietet
Aktivierung, eine ausschließlich für STT vorgesehene Modellauswahl mit Auto, Grenzwerte für Zeitüberschreitung und maximale Cliplänge, Audiozähler
sowie einen `input_audio`-Beispieltest. Die Registerkarte Video ist ebenfalls funktionsfähig: Sie zeigt
den Laufzeitstatus von FFmpeg/ffprobe an — einen von vier expliziten UI-Zuständen (`unknown`, während
die Prüfung läuft oder nicht abgeschlossen werden konnte, `restricted` bei einem Dashboard-Host,
der nicht auf Loopback basiert und bei dem die Prüfung clientseitig übersprungen wird, `unavailable`, nachdem die Prüfung
abgeschlossen und das Fehlen bestätigt wurde, oder `available` mit den FFmpeg-/ffprobe-Versionen) —, speichert
Grenzwerte für Aktivierung, Modell, Frames, Video und Zeitüberschreitung dauerhaft, filtert die Modellauswahl nach
vision-fähigen Modellen und stellt Videozähler bereit.

Die frühere Vision-Bridge-Karte unter den KI-Einstellungen ist ein Kompatibilitätslink zur
neuen Seite; sie verwaltet keine zweite Kopie des Formulars mehr. Media Providers
verknüpft außerdem die Workflows Image-to-Text und Speech-to-Text mit den entsprechenden Registerkarten der Modality
Bridge, ohne den bestehenden Speech-to-Text-Playground zu entfernen.

**Umgehung der Zugangsprüfung für Self-Loops:** Wenn der Describe-Aufruf über OmniRoutes
eigenen `/v1`-Self-Loop geleitet wird (Modell eines nicht standardmäßigen Providers), sendet die Unteranfrage
`x-omniroute-admission-bypass: internal` und wird mit den aufgelösten
Self-Loop-Zugangsdaten authentifiziert — dem lokalen `sk_omniroute`-Sentinel im lokalen Modus oder dem
vom Betreiber konfigurierten Env-Schlüssel `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), sodass
Bereitstellungen mit `REQUIRE_API_KEY=true` den Describe-Aufruf weiterhin ausführen können. Die Umgehung
wird nur für genau diese Zugangsdaten akzeptiert, sodass externe Clients den
Header nicht verwenden können, um die Zugangsprüfung zu überspringen.

Alte Standardwerte befinden sich in `src/shared/constants/visionBridgeDefaults.ts`; die
neuen Standardwerte für Modus, Aufgabenbezug und Cache sowie der Einstellungs-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`. Der Guardrail stellt eine
`deps`-Konstruktoroption bereit, damit Tests gefälschte Implementierungen von `getSettings` und
`callVisionModel` injizieren können.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fängt Chat-Anfragen mit Audioinhalten ab, bevor sie ein Ziel erreichen, von dem nicht
bekannt ist, dass es Audioeingaben akzeptiert. Die Chat-Anfrage wird niemals umgeleitet: Audioteile werden
über den vorhandenen OpenAI-kompatiblen Multipart-Endpunkt transkribiert, und das
ausgewählte Chatmodell verarbeitet anschließend die Texttranskripte.

Ablauf:

1. `supportsAudio` über `getResolvedModelCapabilities()` auflösen. Explizite
   Metadaten aus der Provider-Registry haben Vorrang, gefolgt von statischen Modellmetadaten und anschließend synchronisierten
   `modalities_input`. Eine deklarierte Eingabeliste ohne `audio` ergibt `false`; wenn
   keinerlei Nachweis zur Fähigkeit vorliegt, bleibt der Wert `null`. Sowohl `false` als auch `null` aktivieren die
   konservative Bridge, während sie bei `true` umgangen wird.
2. Die `modalityBridgeAudio*`-Einstellungen auflösen und aus jeder Nachricht über den
   gemeinsamen `detectMediaParts()`-Detektor ersetzbare Audioteile der obersten Ebene extrahieren.
   Unterstützte Übertragungsformate sind OpenAI-`input_audio`, `audio_url` und
   `source.media_type: "audio/*"`. Verschachteltes Audio wird für das Routing erkannt, aber
   vom Ersetzungspfad nicht entfernt. Die Verarbeitung ist durch `modalityBridgeAudioMaxClips`
   begrenzt; nachfolgende Teile bleiben unverändert.
3. Ein konfiguriertes `provider/model` berücksichtigen oder `selectAudioBridgeModel()` die
   `AUDIO_TRANSCRIPTION_PROVIDERS` in stabiler Katalogreihenfolge durchlaufen und das erste
   Modell mit verwendbaren aktiven Provider-Zugangsdaten auswählen lassen.
4. `callAudioTranscription()` konvertiert Base64-/Data-URI-Audio in eine Multipart-
   `file` oder lädt eine entfernte `audio_url` über die ausschließlich öffentliche ausgehende
   Schutzfunktion mit DNS-Pinning und einer Begrenzung auf 25 MB herunter. Anschließend werden die Datei und das ausgewählte
   Modell per POST an den lokalen `/v1/audio/transcriptions`-Self-Loop gesendet, authentifiziert mit
   `resolveSelfLoopBearer()`. Die vorhandene Transkriptionsroute übernimmt die reguläre
   Suche nach Zugangsdaten, die Verarbeitung von Cooldowns und Ratenbegrenzungen sowie die Provider-Weiterleitung.
5. Bei erfolgreichen Aufrufen werden die jeweiligen Teile durch `[Audio N]: <transcript>` ersetzt. Die Aufrufe
   werden mit `Promise.allSettled` ausgeführt: Bei einem einzelnen Fehler bleibt der ursprüngliche
   Audioteil erhalten (#4012-Vertrag). Wenn alle Aufrufe fehlschlagen und für das Ziel
   `supportsAudio === false` nachgewiesen ist, werden die Teile zu
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-Vertrag). Bei
   einem unbekannten Ziel (`null`) bleibt das Ergebnis unverändert, wenn alle Aufrufe fehlschlagen. Ein nachweislich
   ausschließlich textfähiges Ziel ohne verwendbare STT-Zugangsdaten erhält denselben expliziten
   Platzhalter, ohne dass ein Netzwerkaufruf erfolgt.

Erfolgreiche Transkripte verwenden den prozessweiten LRU-/TTL-Cache der Modality Bridge. Der
Schlüssel kombiniert die Audioreferenz, die stabile Operationsbezeichnung `audio-transcription`
und das ausgewählte STT-Modell; Fehler werden niemals zwischengespeichert. Audioversuche aktualisieren
die gemeinsamen Zähler `bridged`, `cacheHits`, `failures` und `lastUsedAt`.
Transformierte Antworten enthalten
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; unveränderte
Anfragen erhalten kein Audio-Bridge-Segment.

Die Laufzeiteinstellungen werden in der Datenbank gespeichert und mit Zod validiert:

| Schlüssel                     | Standardwert | Bereich          |
| ----------------------------- | ------------ | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`       | —                |
| `modalityBridgeAudioModel`    | `""`         | Auto oder STT-ID |
| `modalityBridgeAudioTimeout`  | `60000`      | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`          | 1–10             |

Der gemeinsame Cache wird weiterhin über `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` und `modalityBridgeCacheMaxEntries` gesteuert.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fängt Videoelemente der obersten Ebene in `messages` von Chat Completions und in `input` der Responses
API ab, bevor ein Ziel ohne bekannte native Videounterstützung aufgerufen wird.
Unterstützte Formen sind `input_video`, `video_url`, `video_source`, HTTPS-URLs
und `data:video/*;base64,...`-Daten-URIs. Einfache Dateinamen in Text werden nicht
als Video behandelt.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) übernimmt die Traversierung der Anfrage,
die Funktions-/Richtlinienprüfung, die Aggregation pro Anfrage und die Antwortnutzlast.
Die Verarbeitung pro Video — Beschaffung, Zwischenspeicherung des Gesamtergebnisses,
Beschreibung einer Frame-Sequenz (wobei ein vom Aufrufer bereitgestelltes Audiotranskript
eingebunden wird) sowie Metriken/Abbruch/Bereinigung pro Versuch — ist hinter
`processVideoPart` in `videoBridgePipeline.ts` verborgen, das innerhalb der Schleife von
`preCall` einmal pro Videoelement aufgerufen wird.
Dieses Modul definiert außerdem die expliziten Portgrenzen `VideoMediaBrokerPort`
(Beschaffung von Bytes und Extraktion abgetasteter Frames), `VideoAudioTranscriptionPort`
(Einbindung eines vom Aufrufer bereitgestellten Audiotranskripts in die Beschriftungen der
abgetasteten Frames) und `VideoDrilldownPort` (Persistenzgrenze für den Frame-Drilldown;
noch nicht mit `processVideoPart` verbunden — derzeit schreibt nur die separate Route
`/api/modality-bridge/video/drilldown` Drilldown-Einträge).

Der öffentliche `/v1`-Anfragepfad importiert oder startet niemals einen Unterprozess.
Remote-Videos werden mit einer Obergrenze von 50 MiB heruntergeladen; eingebettete
Base64-Videos haben eine konservative Obergrenze von 36 MiB dekodierter Daten pro Video,
damit der Modell-/Nachrichten-/Framing-Umschlag innerhalb der öffentlichen
JSON-Annahmegrenze von 50 MiB bleiben kann. Die eingebettete Länge und Schätzungen der
dekodierten Größe werden vor der Allokation geprüft. Für die anfängliche Remote-URL und
jede Weiterleitung ist HTTPS erforderlich, wobei die bestehende, nur öffentliche Ziele
zulassende Ausgangssicherung mit DNS-Pinning verwendet wird. Die Bytes überschreiten
anschließend die exakte interne Brokergrenze
`POST /api/modality-bridge/video/extract`. Diese Route ist sowohl
`LOCAL_ONLY` als auch `SPAWN_CAPABLE`, akzeptiert ausschließlich eine pro Prozess
authentifizierte Anfrage über eine vertrauenswürdige Loopback-Verbindung und akzeptiert
niemals eine URL, einen Dateisystempfad, eine ausführbare Datei oder eine Argumentliste.
Die Pipeline für API-Nachrichtengrößen und der inkrementelle Body-Reader des Handlers
erzwingen unabhängig voneinander eine Eingabeobergrenze von 50 MiB für den Broker. Seine
begrenzte Warteschlange führt jeweils eine Extraktion aus, erlaubt vier ausstehende
Aufträge und begrenzt ausstehende Eingabedaten auf 100 MiB.

Innerhalb des Brokers liest `ffprobe` eine private lokale Datei; die feste
Format-Zulassungsliste schließt Wiedergabelisten- und Manifestformate aus. Bei zulässigen
Containern der MOV-Familie bleiben externe MOV-Datenreferenzen standardmäßig deaktiviert,
und der feste Befehl aktiviert sie nicht. Sowohl `ffprobe` als auch `ffmpeg` verwenden
die ausschließlich `file` zulassende Protokollliste, einen Thread, feste Argument-Arrays,
keine Shell und über `PATH` aufgelöste ausführbare Dateien. Als Cover angehängte
Bildstreams sind keine abspielbaren Kandidaten. Alle abspielbaren Streams müssen die
Grenzwerte einhalten, und ein expliziter Standardstream wird vor dem deterministischen
Fallback auf den niedrigsten Index bevorzugt. Videos sind auf 600 Sekunden, 8.192 Pixel
pro Dimension und 33.554.432 Quellpixel begrenzt. FFmpeg entnimmt 1–16 JPEG-Frames an
Mittelpunkten, skaliert die lange Kante ohne Hochskalierung kleinerer Eingaben auf
höchstens 1.024 Pixel herunter und erhält niemals eine URL. Standardmäßig erfolgt die
Abtastung nach `uniform`. Die optionalen Richtlinien `scene_aware` und das experimentelle
`segment_aware` führen einen zusätzlichen festen FFmpeg-Durchlauf über den bereits
validierten lokalen Stream aus, wählen begrenzte `showinfo`-Szenenzeitstempel aus und
greifen bei einem Fehler des Detektors, einer Zeitüberschreitung, fehlerhafter Ausgabe
oder einer leeren Kandidatenmenge deterministisch auf dieselben gleichmäßig verteilten
Mittelpunkte zurück. Der segmentbasierte Modus weist Mittelpunkt-Abtastungen proportional
zu den validierten Szenenintervallen zu; segmentbasierte Evidenz und das
Fallback-Verhalten werden weiter unten detailliert beschrieben. Die harte Obergrenze von
16 Frames wird bei jeder Richtlinie nach der Auswahl angewendet. Wenn eine
szenenbasierte Anfrage nur ein Budget von einem Frame hat, verwendet sie den gleichmäßig
verteilten Mittelpunkt des aktiven Gesamtvideo- oder Fokusfensters und meldet
`policyEffective: uniform`: Ein einzelner ausgewählter Szenen-Frame kann nicht beide
zeitlichen Enden bewahren. Ein Aufrufer kann optional ein endliches Fokusfenster
(`start`/`end` in Sekunden) angeben; die Grenzen werden auf die Mediendauer beschränkt,
umgekehrte oder nicht endliche Fenster werden abgelehnt, und alle Abtastrichtlinien
werden ausschließlich innerhalb des normalisierten Intervalls ausgeführt. Das
resultierende Fenster wird in die Abtastmetadaten und in das Präfix der nicht
vertrauenswürdigen Beschreibung aufgenommen, damit nachgelagerte Modelle einen
fokussierten Ausschnitt von der vollständigen Zeitleiste unterscheiden können.

Der semantische Fokus der Beschriftung ist eine separate, explizite Einstellung. Der
standardmäßige Analysemodus `full` behält die bestehende Frame-Eingabeaufforderung bei und
leitet Anfragetext niemals an das Beschriftungsmodell weiter. Im Modus `focused` liest
die Bridge ausschließlich den neuesten nicht leeren, vom Benutzer verfassten
`text`/`input_text` aus demselben Chat- oder Responses-Container, normalisiert ihn auf
NFC, fasst Steuerzeichen und Leerraum zusammen und begrenzt ihn auf 500
Unicode-Codepunkte. Ein leeres Ergebnis führt zum Rückgriff auf die exakte
`full`-Eingabeaufforderung. Ein verwendbarer Hinweis wird als JSON in einem dedizierten
Block für nicht vertrauenswürdigen Benutzerkontext serialisiert und darf nur beobachtbare
Details priorisieren; er kann die separate Warnung, in den Medien sichtbaren oder
hörbaren Anweisungen nicht zu folgen, nicht außer Kraft setzen. Textueller Fokus leitet
niemals `start`/`end` ab und verändert den zeitlichen Sampler nicht.

#### FU-07 Strukturelle Segmentevidenz

`segment_aware` verwendet einen begrenzten Voranalysedurchlauf über den bereits
validierten lokalen Videostream. Die feste Filterkette skaliert zunächst auf höchstens
320 Pixel Breite, erkennt Szenenwechsel und eingefrorene Intervalle und tastet
anschließend mit 1 Frame pro Sekunde ab, um Unschärfe, durchschnittliche Luminanz sowie
räumliche/zeitliche Informationen zu bestimmen. Der Durchlauf ist auf 600 strukturelle
Abtastungen, einen FFmpeg-/Filter-Thread, dieselben ausschließlich `file` zulassenden
Protokoll- und Containerlisten, eine Prozessausgabe von höchstens 1 MiB sowie maximal
30 Sekunden innerhalb der gemeinsamen Abbruch-/Fristlogik des Brokers begrenzt. Er
akzeptiert niemals einen Befehl, Filter, Pfad oder eine URL aus der Anfrage.

Die strukturellen Werte sind deterministische Sampling-Evidenz und kein semantisches Videoverständnis. Sie leiten weder Subjekte, Handlungen, Untertitel, Sprache noch die Absicht des Benutzers ab. Szenen- und Standbildgrenzen bilden Segmente; Standbildabdeckung, Unschärfe, Belichtung, räumlicher Detailgrad und zeitliche Veränderung beeinflussen lediglich, wie das bestehende Budget von 1–16 Frames zugewiesen wird. Ein vollständig eingefrorenes Segment ist auf einen Frame begrenzt, während nicht eingefrorene Segmente um das verbleibende Budget konkurrieren. Wenn es mehr Grenzen als Frames gibt, wird eine gleichmäßige Abdeckung der Zeitleiste beibehalten, sodass schnelle frühe Schnitte ein langes abschließendes Segment nicht verbergen können. Szenengrenzen innerhalb der Analyseauflösung von 1 Sekunde um eine Standbildgrenze werden zusammengeführt.

Fehlende Filter, fehlerhafte oder leere Evidenz, ein Detektorfehler oder das Zeitlimit der begrenzten Voranalyse führen zu einem offenen Fehlschlag auf exakt die einheitliche Mittelpunkt-Richtlinie. Ein Abbruch durch den Aufrufer oder eine Broker-Deadline führt nicht zu einem offenen Fehlschlag: Der laufende Unterprozess wird beendet, eine spätere Frame-Extraktion verhindert und der private temporäre Verzeichnisbaum in `finally` entfernt.

`scripts/perf/video-bridge-fu07-eval.ts` erzeugt deterministische reale FFmpeg-Fixtures für Einsparungen bei Untertitelaufrufen nach der Deduplizierung, die Budgetzuweisung bei hoher Bewegungsdichte, Evidenz zu Unschärfe, Belichtung und SI-TI, schnelle Schnitte mit einem langen Ausklang sowie Fehlalarme bei allmählichen Überblendungen. Das Skript zeichnet die verstrichene Zeit der Voranalyse und, sofern `/usr/bin/time` verfügbar ist, die CPU-Zeit des Kindprozesses sowie den maximalen RSS auf. Seine Qualitätsprüfungen sind ausschließlich strukturelle Orakel. Die Qualität realer Untertitelmodelle bleibt `HOLD`, da dieses Testsystem weder über einen autorisierten Endpunkt noch über einen eingefrorenen Bewerter verfügt. Monetäre Einsparungen bleiben ebenfalls `HOLD`, sofern `--caption-cost-per-call-usd` keine explizite positive Kostenschätzung pro Aufruf bereitstellt; das Skript erfindet keines der beiden Ergebnisse.

Jeder Frame ist auf 4 MiB, alle Rohframes zusammen auf 23 MiB und die serialisierte Broker-Antwort auf 32 MiB begrenzt. Ein privates temporäres Verzeichnis wird in `finally` entfernt. OmniRoute enthält FFmpeg nicht und akzeptiert keinen benutzerdefinierten Pfad zur ausführbaren Datei. Vor der Untertitelerstellung wendet die Bridge einen konservativen Durchlauf zur visuellen Deduplizierung an: Jedes JPEG wird auf einen 16×16-Graustufenpuffer reduziert und nur mit dem zuletzt beibehaltenen Frame verglichen. Bei einem angeforderten Untertitelbudget von mehr als einem Frame stellt die Extraktion einen begrenzten Kandidatenpool bereit, der höchstens doppelt so groß wie dieses Budget ist und nie mehr als 16 Frames umfasst. Die angeforderte Obergrenze wird erst nach der Deduplizierung angewendet, wobei beim abschließenden Ausdünnen der erste und letzte ausgewählte Kandidat erhalten bleiben, sofern das Budget mindestens zwei beträgt. Die versionierte Richtlinie `grayscale-16x16-mean-cells-v2` verwendet den größeren Wert aus der mittleren Luminanzdifferenz und dem Anteil der Thumbnail-Zellen, deren normalisierte Differenz mindestens 0,05 beträgt. Der Duplikatschwellenwert ist die Konstante 0,04, die zugunsten der Vorhersagbarkeit gewählt und nicht als Laufzeiteinstellung verfügbar gemacht wurde. Dieses sekundäre kontrastreiche Signal bewahrt kleine Bewegungen und Änderungen sichtbarer Texte, die ein rein mittelwertbasierter Vergleich verbergen kann. Fehler des Vergleichsmoduls oder Decoders führen zu einem offenen Fehlschlag und bewahren die Abdeckung. Die Ausgabemetadaten unterscheiden zwischen extrahierten Kandidaten, erfolgreich verwendeten Frames und verworfenen visuellen Duplikaten.

Ein ausdrücklich gekennzeichneter Videoteil kann einen mit Zeitstempeln versehenen Kontaktabzug anfordern. Die Bridge erstellt ein JPEG-Raster mit höchstens 4 Spalten und 16 Frames. Jede 512-Pixel-Zelle brennt den Zeitstempel ihrer Quelle in ein kontrastreiches unteres Band ein, während dieselben Zeitstempel für die nachgelagerte Zuordnung und Prüfung in textuellen Metadaten erhalten bleiben. Das vollständige JPEG bleibt auf 32 MiB begrenzt. Falls `sharp` das Raster nicht decodieren oder zusammensetzen kann, greift die Bridge auf die einzelnen JPEG-Frames zurück; ein Client-Abbruch wird weiterhin durch den Kontaktabzugsvorgang weitergegeben.

Die Evidenz für eine Freigabe ist bewusst vom synthetischen Kompositions-Mikrobenchmark getrennt. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiert ein schemaversioniertes A/B-Testsystem für reale OpenAI-kompatible Bildverarbeitungsmodelle. Es misst die vom Anbieter gemeldeten Tokens, die Ende-zu-Ende-Latenz als verstrichene Zeit einschließlich der Kontaktabzugskomposition, die Anzahl der Modellaufrufe und die in einem Manifest definierte Beibehaltung von Fakten. Unverarbeitete Modellantworten werden nicht in den Bericht geschrieben; es werden nur SHA-256-Digests und die IDs übereinstimmender Fakten beibehalten. Das Testsystem führt weder Netzwerk- noch kostenpflichtige Modellaufrufe durch, sofern nicht `--execute-real` übergeben wird und `--model`, `OMNIROUTE_BASE_URL` sowie `OMNIROUTE_API_KEY` konfiguriert sind. Ohne diesen expliziten realen Durchlauf bleibt sein maschinenlesbares Urteil `HOLD`; synthetische Messungen von Nutzlast und Aufrufanzahl allein stellen keine Evidenz für eine Freigabe dar.

Aufrufer können einem unterstützten Videoteil optional ein `transcript.cues`-Array hinzufügen, wenn sie bereits über ausgerichteten Text verfügen. Jeder Cue muss `text`, ein endliches `start`/`end`-Intervall innerhalb der geprüften Dauer und eine in der Positivliste enthaltene `source` (`client`, `embedded` oder `audio-bridge`) angeben; `confidence` ist standardmäßig `1` und muss zwischen `0` und `1` liegen. Exakt duplizierte Cues werden zusammengeführt. OmniRoute startet aufgrund dieser Metadaten niemals eine Transkription: Validierte Cues werden mit Quelle, Konfidenz und Intervall in das beschriebene Ergebnis kopiert und neben den Frame-Untertiteln als nicht vertrauenswürdige Beobachtungen dargestellt. Ungültiger, außerhalb des gültigen Bereichs liegender oder herkunftsloser Text wird abgelehnt, anstatt in den Untertitelstrom aufgenommen zu werden. Das Feld `source` wird derzeit vom Aufrufer deklariert und nicht serverseitig verifiziert: OmniRoute erzwingt, dass der Wert eine der drei zulässigen Zeichenfolgen ist, bestätigt jedoch noch nicht kryptografisch, dass eine Kennzeichnung als `embedded` oder `audio-bridge` tatsächlich aus einer servereigenen Extraktion stammt. Behandeln Sie `source` als nicht vertrauenswürdigen Hinweis, bis diese Verifizierung implementiert ist; stützen Sie keine Autorisierungsentscheidungen darauf.

Ein fortgeschrittener Aufrufer kann für dasselbe Video einen bereits autorisierten `audioTranscript`-Track bereitstellen. Die Fusionsschnittstelle verarbeitet visuelle und akustische Beobachtungen mit einer gemeinsamen Frist und einem gemeinsamen Abbruchsignal, ordnet sie auf einer gemeinsamen Zeitleiste an, fasst exakte Duplikate zusammen und meldet ein Teilergebnis, wenn nur eine Seite erfolgreich ist. Ein ungültiger `audioTranscript` wird zu einem solchen Teilergebnis herabgestuft — die visuelle Beschreibung bleibt erhalten, und der Audiozweig zeichnet einen bereinigten Fehlercode auf —, anstatt die Verarbeitung des gesamten Videos fehlschlagen zu lassen. Die Verfügbarkeit je Zweig, das Teilresultat-Flag und die bereinigten Fehlercodes bleiben im beschriebenen Ergebnis, in den Guardrail-Metadaten (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), in den Metadaten des Ergebnis-Caches und in den Fusionszählern der Bridge erhalten. Der standardmäßige Video-Bridge-Pfad ruft weder Speech-to-Text auf noch lädt er eine zweite Kopie des Mediums herunter; ohne diesen expliziten Track bleibt er auf Video beschränkt.

**Aufbewahrung von Transkripten (#12150 P1).** Dies gilt automatisch, sobald die Video Bridge (die selbst Opt-in ist) einen Transkript-Hinweis rendert — es gibt kein separates Aufbewahrungs-Flag. Wenn eine Anfrage einen beliebigen Transkript-Hinweis rendert (ein vom Aufrufer deklarierter `transcript` oder ein fusionierter `audioTranscript`), markiert die Guardrail ihn als `videoBridgeObserved` und erzeugt eine redigierte Schattenversion der Videobeschreibung — eine identische Darstellung, in der der Freitextkörper jedes Hinweises durch `[redacted-video-transcript]` ersetzt wird. Diese wird erstellt, indem das strukturierte Hinweisfeld ersetzt wird, bevor die Zeichenfolge zusammengesetzt wird (niemals durch Parsen des abgeflachten Textes, sodass kein Hinweisinhalt — ob adversarial oder gewöhnlich, einschließlich Textkörpern mit `]` wie `[inaudible]`/`[music]` — erhalten bleiben kann). Im persistierten Anfragekörper des Aufrufprotokolls wird jeder aus dem Video abgeleitete Textteil durch diese redigierte Schattenversion ersetzt, wobei der Abgleich anhand der Inhaltsgleichheit erfolgt; der `fullText`-Anker wird aus der abgeschlossenen Guardrail-Nutzlast vor dem Aufruf erneut gelesen, sodass der Abgleich weiterhin erfolgreich ist, nachdem nachfolgende Guardrails der Kette (die Maskierer für personenbezogene Daten und Anmeldedaten mit den Prioritäten 10/95) den Beschreibungstext direkt umgeschrieben haben und nachdem die System-Prompt-/Handoff-/Memory-Injektion das Nachrichten-Array umgeformt hat. Der an das Modell gesendete Anfragetext bleibt unverändert. Eine beobachtete Anfrage befüllt außerdem keinen dauerhaften Memory-Speicher (sowohl die aus der Anfrage als auch die aus der Antwort abgeleitete Extraktion werden übersprungen), sodass die eigene Antwort des Modells keinen Transkripttext in den Memory-Speicher übernehmen kann.

Noch offene Aufbewahrungsflächen, die für eine Nachbearbeitung verfolgt werden (**P2**, #12430): der unbearbeitete Snapshot der Client-Anfrage vor der Guardrail im Artefakt des detaillierten Protokolls; Fail-Closed-Verhalten bei Fortsetzungen mit `previous_response_id`; interne Dispatches abgeleiteter Prompts, die das Transkript in einen synthetisierten Zeichenfolgen-Prompt einbetten (Pipeline-Phasen, Kontext-Handoff); sowie der Antwortkörper bzw. die Kopie im semantischen Cache einer Modellantwort, die das Transkript zitiert. Dabei handelt es sich um unbearbeitete, antwortbezogene oder Opt-in-Flächen außerhalb des P1-Umfangs für persistierte Anfragekörper und Memory.

Der interne Lebenszyklus von `/api/modality-bridge/video/drilldown` ist ein separates, per Loopback/Token authentifiziertes Cache-Substrat. Jede Operation erfordert außerdem eine kanonische, opake Prinzipal-ID. Bevor ein Produktionsaufrufer aktiviert wird, muss er diese ID aus dem authentifizierten Mandanten ableiten und darf niemals einen vom Client ausgewählten Wert weiterleiten. Cache-Schlüssel binden diesen Prinzipal an kanonische Sitzungs- und Videoreferenz-IDs, speichern nur deren mittels SHA-256 abgeleitete Schlüssel und beschränken sowohl Lese- als auch Löschvorgänge auf denselben Prinzipal. Der Cache speichert höchstens 16 abgeleitete JPEG-Frames pro Eintrag, lässt sie nach zehn Minuten ablaufen und unterstützt begrenzte `start`-/`end`-Lesevorgänge oder das explizite Löschen einer Sitzung.

Jeder Prinzipal ist auf 16 Einträge und 64 MiB kanonischer JPEG-Daten begrenzt. Diese Grenzen sind unabhängig von der globalen Obergrenze von 64 Einträgen/256 MiB: Kontingentdruck eines Prinzipals verdrängt ausschließlich dessen am längsten nicht verwendete Einträge, bevor eine globale LRU-Verdrängung in Betracht gezogen wird. Abgelaufene Einträge werden bei Cache-Aktivität sowohl aus der prinzipalbezogenen als auch aus der globalen Abrechnung entfernt, während ein Abbruch oder ein Validierungsfehler keinen teilweisen Ersatz festschreibt.

Der Cache weist nicht kanonisches Base64, übermäßiges Padding, Nicht-JPEG-Medien, fehlerhafte oder abgeschnittene JPEGs sowie JPEGs zurück, die bei einer begrenzten Vollbilddekodierung mit `sharp` eine Warnung erzeugen. Jedes akzeptierte Bild wird erneut als kanonisches JPEG kodiert; Breite und Höhe werden aus den dekodierten Bytes abgeleitet, anstatt den Feldern des Aufrufers zu vertrauen, und sämtliche nachgestellten Polyglot-Bytes werden verworfen, anstatt sie beizubehalten. Nur der begrenzte kanonische komprimierte Puffer wird auf beide Kontingente angerechnet. Das JSON-Übertragungslimit berücksichtigt den Base64-Overhead für die Obergrenze von 32 MiB für dekodierte Eingaben. Jede
gespeicherte Ableitung zeichnet ihr validiertes JPEG-Format und ihre validierte Auflösung, die Sampling-Richtlinie, die Ableitungsversion, den Erstellungszeitpunkt, den serverseitig berechneten Inhalts-Hash sowie die gehashte übergeordnete Referenz zusammen mit dem Inhalts-Hash des übergeordneten Elements vom vertrauenswürdigen Aufrufer auf. Zwischen den asynchronen Dekodierungs-/Hash-Phasen wird auf einen Abbruch geprüft, bevor der atomare Cache-Commit erfolgt.

Diese Tranche verbindet noch keinen Produktions-Producer mit der Route und bietet keine Auswahl von Varianten mit mehreren Auflösungen. Der transparente Anfragepfad der Video Bridge verursacht daher keinen zusätzlichen Aufwand, während die mandantengebundene Ableitung des Prinzipals und der vollständige FU-08-Lebenszyklus für mehrere Auflösungen explizite Folgearbeiten bleiben, anstatt als vollständig implementiertes Verhalten dokumentiert zu werden.

Frames werden sequenziell mit dem konfigurierten Video-Modell beschriftet. Eine leere
Video-Überschreibung übernimmt die Vision-Einstellung; wenn beide leer sind, wählt der
Vision-Auto-Router das tatsächlich verwendete visionsfähige Modell aus. Erfolgreiche Beschriftungen
ersetzen den ursprünglichen Teil durch ein stabiles Präfix `[Video description:`, das den Text außerdem
als nicht vertrauenswürdige, aus Medien abgeleitete Beobachtung kennzeichnet und nachgelagerte
Modelle anweist, in den Medien enthaltenen Anweisungen nicht zu folgen. Cache-Schlüssel für
Frame-Beschriftungen enthalten die JPEG-Bytes, den Prompt, den Zeitstempel und das tatsächlich
verwendete Modell; nur erfolgreiche Beschriftungen werden zwischengespeichert. Cache-Einträge
bewahren das tatsächlich erfolgreiche Erzeugermodell auf, einschließlich eines Fallback-Modells;
die Bridge meldet `mixed`, wenn verschiedene Frames von unterschiedlichen Modellen erzeugt
wurden. Bei einem Cache-Treffer wird diese Erzeugeridentität wiederverwendet, anstatt sie als
angeforderten Routing-Plan neu zu kennzeichnen. Der Ergebnis-Cache für das gesamte Video
verwendet jeden Eingabewert als Schlüssel, der die Ausgabe verändert — Prompt, tatsächlich
verwendetes Modell, Sampling-Richtlinie, Frame-Anzahl, semantischer Analysemodus, den
SHA-256-Fingerabdruck des normalisierten Fokus-Hinweises, das Fokusfenster, `transcript`,
`audioTranscript` und das Kontaktbogen-Flag — sodass eine Änderung an einer dieser
Dimensionen zu einem Cache-Fehlschlag und niemals zur Wiederverwendung veralteter Daten führt.
Die Version der visuellen Deduplizierungsrichtlinie, der Schwellenwert und die begrenzte Anzahl
von Kandidaten-Frames sind ebenfalls explizit im Ergebnis-Cache-Schlüssel und in den Metadaten
enthalten; eine Richtlinienänderung kann daher keine veraltete Beschreibung des gesamten Videos
wiederverwenden. Die Metadaten des Ergebnis-Caches v4 enthalten den Modus und den
Fingerabdruck, niemals die unverarbeitete Benutzeraufgabe. Guardrail-Metadaten geben sowohl
den angeforderten als auch den tatsächlich verwendeten Analysemodus an; ein angeforderter
`focused`-Modus ohne verwendbaren Benutzertext wird effektiv als `full` gemeldet.

Die Guardrail extrahiert jeden unterstützten Videoteil, beschreibt jedoch höchstens
`modalityBridgeVideoMaxVideos`. Bei einem Ziel, für das nachgewiesen ist, dass
`supportsVideo === false` gilt, werden fehlgeschlagene und über dem Limit liegende Videos in
explizite sichere Textmarkierungen umgewandelt, sodass kein unverarbeitetes Video erhalten
bleibt. Wenn die Fähigkeit unbekannt ist, bleiben diese Teile unverändert. Ziele mit
`supportsVideo === true` umgehen die Bridge. Das Abbruchsignal der Client-Anfrage wird durch
Download, Broker-Warteschlange, Unterprozesse und Beschriftungsaufrufe weitergegeben;
Abbrüche stoppen zwischen Videos und führen niemals durch eine Fail-open-Strategie zur
Weitergabe unverarbeiteter Medien.

Laufzeiteinstellungen sind DB-gestützt und werden mit Zod validiert:

| Schlüssel                           | Standardwert | Bereich / Verhalten                                                                                                                  |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`      | Optionale Laufzeitfunktion, Opt-in                                                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`     | `full` behält generische Beschriftungen bei; `focused` verwendet begrenzten, nicht vertrauenswürdigen Kontext des neuesten Benutzers |
| `modalityBridgeVideoModel`          | `""`         | Übernimmt das Modell der Vision Bridge                                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`          | 1–16                                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`  | `uniform`, `scene_aware` oder proportionales `segment_aware`; bei Detektorfehler erfolgt ein Fallback auf `uniform`                  |
| `modalityBridgeVideoMaxVideos`      | `1`          | 1–4                                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`     | 1000–120000 ms                                                                                                                       |

Ältere persistierte Video-Timeout-Werte über 120 Sekunden werden auf die
Broker-Deadline begrenzt; neue Einstellungsänderungen oberhalb dieses Limits werden abgelehnt.
`GET /api/modality-bridge/video/runtime` erfordert vor der Authentifizierung oder
Laufzeitprüfung eine vertrauenswürdige, bestätigte Loopback-Lokalität und anschließend eine
Management-Authentifizierung. Die Antwort enthält ausschließlich `available`, bereinigte
FFmpeg-/ffprobe-Versionen und einen festen Grund, wenn die Laufzeitumgebung nicht verfügbar ist.
Der interne Extraktionsendpunkt ist keine öffentliche Upload-API: Bei ausgelasteter Warteschlange
wird `503` zusammen mit `Retry-After` zurückgegeben, bei einem Verbindungsabbruch durch den
Aufrufer `499` und bei Erreichen der festen Broker-Deadline `504`. Konvertierte Antworten fügen
`video->text;model=<visionModel>;parts=<videos>` zum zentralen
`x-omniroute-modality-bridge`-Header hinzu, ohne Vision- oder Audio-Segmente zu entfernen.

### PII-Maskierer (`piiMasker.ts`)

Wird in **beiden** Phasen ausgeführt.

- **`preCall`** klont die Nutzlast, durchläuft `system`, `messages`, `input` und
  `prompt` (einschließlich einfacher String-Elemente) und wendet `processPII()` (aus
  `@/shared/utils/inputSanitizer`) auf String-Felder vom Typ `content`/`text` an. Wenn
  `PII_REDACTION_ENABLED=true` gilt, werden erkannte personenbezogene Daten in der ausgehenden
  Nutzlast geschwärzt. Dies ist unabhängig von `INPUT_SANITIZER_MODE` (das nur die
  Richtlinie für Prompt-Injection steuert). Wenn die Schwärzung deaktiviert ist, zeichnet der
  Aufruf die Erkennungsanzahlen auf, ohne den Inhalt umzuschreiben.
- **`postCall`** erstellt einen tiefen Klon der Antwort und führt `sanitizePIIResponse()` sowie
  den Maskierer für die Responses-API-Struktur aus (`maskResponsesOutput` — deckt
  `output_text` und `output[].content[].text` ab). Wenn eine Schwärzung erfolgt, ersetzt die
  geänderte Antwort das Original.

Die Guardrail blockiert niemals; sie annotiert lediglich (`meta.detections`,
`meta.redacted`) oder schreibt Inhalte um.

### Prompt-Injection (`promptInjection.ts`)

Erkennt gegnerische Strukturen in vom Benutzer bereitgestellten Inhalten und setzt die
konfigurierte Richtlinie durch. Das Verhalten wird durch Umgebungsvariablen und
Konstruktoroptionen gesteuert:

| Einstellung      | Umgebungsvariable                                                                                     | Standardwert | Wirkung                                                                                                                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiviert        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`       | Bei `false` wird die Schutzmaßnahme sofort beendet.                                                                                                                                                                                            |
| Modus            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`       | Injection-Richtlinie: `block`, `warn` oder `log`. (`redact` wird aus Gründen der Abwärtskompatibilität akzeptiert, entfernt jedoch **keinen** Injection-Text; die PII-Umschreibung von Anfragen wird durch `PII_REDACTION_ENABLED` gesteuert.) |
| Blockierschwelle | Option `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (Alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`       | Mindestschweregrad, der zum Blockieren erforderlich ist. `Medium` dient standardmäßig nur der Beobachtung.                                                                                                                                     |

**Moduspriorität** (`getMode`): `options.mode` des Aufrufers →
**DB-Feature-Flag-Überschreibung** für `INJECTION_GUARD_MODE` (Dashboard → Settings →
Feature Flags) → Umgebungsvariable `INJECTION_GUARD_MODE` → Umgebungsvariable `INPUT_SANITIZER_MODE` →
`warn`. Eine Dashboard-Überschreibung hat daher Vorrang vor den Umgebungsvariablen, sodass die Feature-
Flags-Benutzeroberfläche die laufende Schutzmaßnahme direkt steuert (kein Neustart erforderlich). Der Datenbankzugriff ist ausfallsicher:
Wenn dabei ein Fehler auftritt, fällt die Schutzmaßnahme auf das umgebungsvariablenbasierte Verhalten zurück, und wenn keine
Überschreibung festgelegt ist, entspricht das Verhalten der ausschließlichen Auflösung über Umgebungsvariablen.

Erkennungsquellen:

1. `sanitizeRequest()` aus `@/shared/utils/inputSanitizer` (gemeinsamer Detektorsatz,
   der an anderer Stelle in der Pipeline verwendet wird).
2. Integrierte `DEFAULT_GUARD_PATTERNS` (derzeit `system_override_inline` und
   `markdown_system_block`, beide mit dem Schweregrad `high`).
3. Optionale `customPatterns`, die über Konstruktoroptionen übergeben werden (Zeichenfolgen, reguläre Ausdrücke
   oder Datensätze vom Typ `{ name, pattern, severity }`).

Wenn `mode === "block"` gilt **und** mindestens eine Erkennung den
Schweregrad-Schwellenwert erreicht, gibt `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` zurück. In den Modi `warn`/`log` protokolliert die Schutzmaßnahme den Vorgang,
lässt den Aufruf jedoch zu. Die gemeinsame Hilfsfunktion `evaluatePromptInjection()` wird ebenfalls exportiert,
damit Aufrufer Prompts auswerten können, ohne die Registry zu durchlaufen.

**Scan-Begrenzung (v3.8.20):** Der Detektor untersucht nur die **ersten 16 KB** des
zusammengefügten Prompt-Texts — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 Byte) in
`src/shared/utils/inputSanitizer.ts`. Sowohl `detectInjection()` als auch
`evaluatePromptInjection()` führen `slice(0, MAX_INJECTION_SCAN_BYTES)` aus, bevor sie
die Musterschleife durchlaufen. Injection-Anweisungen befinden sich nahe am Anfang einer Eingabe, daher
begrenzt dies die Regex-CPU-/GC-Auslastung bei Payloads mit mehreren Hundert KB, ohne die Erkennung zu schwächen (vgl.
#3932, #4041).

### Zugangsdatenmaskierer (`credentialMasker.ts`)

Wird in **beiden** Phasen ausgeführt, als letzter Schritt in der Standardkette (Priorität `95`). Schwärzt
bekannte Muster von API-Schlüsseln/Secret-Tokens aus der ausgehenden Payload (Nachrichteninhalt,
Tool-Aufrufargumente, Tool-Ergebnisse) **und** aus der Provider-Antwort, sodass in einen
Prompt eingefügte Zugangsdaten (oder durch ein Tool-Ergebnis zurückgegebene Zugangsdaten) weder an den vorgelagerten
Provider noch zurück an den Client weitergegeben werden.

- **Nur per Opt-in**, entsprechend der Konvention für die PII-Schwärzung (in Anlehnung an Hard Rule #20):
  deaktiviert, sofern nicht `settings.credentialRedactionEnabled === true` **oder**
  `CREDENTIAL_REDACTION_ENABLED=true` gilt. Ist die Funktion deaktiviert, bewirkt die Schutzmaßnahme nichts —
  sie blockiert niemals und schreibt niemals Daten um.
- `redactCredentials()` durchläuft den gesamten Payload-/Antwortbaum (`walkValue()`,
  sicher gegen Prototype Pollution und mittels `WeakSet` gegen Zyklen abgesichert) und ersetzt Treffer durch
  einen Platzhalter des Typs `[REDACTED:<type>]`, wobei nur die tatsächlich
  geänderten Zweige geklont werden.
- `CREDENTIAL_PATTERNS` deckt Schlüssel von LLM-Providern (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-Tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), Zahlungsschlüssel (Stripe, Square), Cloud-
  Schlüssel (AWS-Zugriffsschlüssel, Twilio, SendGrid, Mailgun), private Schlüssel/JWTs,
  Verbindungszeichenfolgen mit Zugangsdaten (`mongodb://user:pass@...` usw.) sowie
  ein generisches Muster für Header-Werte von `Authorization`/`x-api-key`/`api-key`/`apikey`
  ab. Header-artige Schlüssel (`authorization`, `x-api-key`, `api-key`,
  `apikey`) werden strukturell geschwärzt (nur der Wert, wobei Schemapräfixe wie
  `Bearer `/`Basic ` erhalten bleiben), anstatt den generischen Text-Regex zu verwenden.
- Die Schutzmaßnahme blockiert niemals; sie schreibt lediglich Daten um (`modifiedPayload` /
  `modifiedResponse`) und fügt Anmerkungen hinzu (`meta.credentialsRedacted`, `meta.count`).

Regressionsschutz: `tests/unit/credential-masker-guardrail.test.ts`.

## Basisvertrag (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true bricht die Kette vorzeitig ab
  message?: string; // wird beim Blockieren ausgegeben
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // wird von preCall zurückgegeben, um die Anfrage umzuschreiben
  modifiedResponse?: TValue; // wird von postCall zurückgegeben, um die Antwort umzuschreiben
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Eine Schutzvorrichtung signalisiert „keine Änderung“, indem sie entweder `void`, `{}` oder
`{ block: false }` zurückgibt. Die Rückgabe eines `modifiedPayload`/`modifiedResponse` ersetzt
den Wert, der für nachgelagerte Schutzvorrichtungen durch die Kette fließt.
`signal?: AbortSignal` überträgt den Lebenszyklus des Aufrufers an die Schutzvorrichtungen. Der Abbruch einer Anfrage ist die bewusste Fail-Open-Ausnahme: Medienbrücken beenden ihre Arbeit und führen Aufräumarbeiten durch, ohne rohe Medien für ein Ziel wiederherzustellen, von dem bekannt ist, dass es diese nicht unterstützt.

## Registrierung (`registry.ts`)

Der Singleton `guardrailRegistry` stellt Folgendes bereit:

- `register(guardrail)` — fügt eine Schutzvorrichtung hinzu (oder ersetzt sie anhand ihres normalisierten Namens) und
  sortiert erneut nach aufsteigender `priority`.
- `clear()` / `list()` — administrative Hilfsfunktionen.
- `runPreCallHooks(payload, context)` — durchläuft aktive Schutzvorrichtungen, reicht die
  Nutzlast über `modifiedPayload` weiter und stoppt beim ersten `block: true`.
- `runPostCallHooks(response, context)` — derselbe Ablauf auf der Antwortseite.
- `resetGuardrailsForTests({ registerDefaults })` — löscht den Zustand und registriert optional
  die Standardwerte erneut, um eine saubere Testisolation zu gewährleisten.

Beide Ausführungsfunktionen geben `{ blocked, payload|response, results, guardrail?, message? }`
zurück, wobei `results` ein Array von `GuardrailExecutionResult`-Datensätzen ist, die
für jede Schutzvorrichtung die Felder `blocked`, `skipped`, `modified`, `error` und `meta`
enthalten, was für die Ablaufverfolgung nützlich ist.

### Schutzvorrichtungen pro Anfrage deaktivieren

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` erstellt eine
deduplizierte Liste der Namen von Schutzvorrichtungen, die für die aktuelle
Anfrage übersprungen werden sollen. Quellen (alle optional, alle zusammengeführt):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` im Anfragekörper (auf oberster Ebene)
- `metadata.disabledGuardrails` im Anfragekörper
- Header `x-omniroute-disabled-guardrails` (oder veraltet
  `x-disabled-guardrails`)

Werte können Zeichenfolgen-Arrays oder eine kommagetrennte Zeichenfolge sein; Namen werden
in kleingeschriebene Kebab-Case-Schreibweise normalisiert (`pii_masker` → `pii-masker`). Das Ergebnis
wird über `context.disabledGuardrails` an die Registrierung übergeben, die
übereinstimmende Schutzvorrichtungen überspringt (`skipped: true` in `results`).

## Ausführungsreihenfolge

Für jede Anfrage, die `src/sse/handlers/chat.ts` und
`open-sse/handlers/chatCore.ts` durchläuft:

1. `resolveDisabledGuardrails(...)` erstellt anhand von API-Schlüssel, Body
   und Headern die Liste der zu überspringenden Guardrails.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` führt Guardrails in
   aufsteigender Prioritätsreihenfolge aus:
   - Deaktivierte Guardrails werden als `skipped` erfasst.
   - `preCall` jedes Guardrails kann die Nutzdaten über `modifiedPayload`
     umschreiben.
   - Das erste `block: true` bricht die Kette vorzeitig ab, und der Handler
     gibt eine Guardrail-Ablehnungsantwort zurück.
3. Die (möglicherweise umgeschriebenen) Nutzdaten werden an das Combo-Routing
   und die Upstream-Weiterleitung übergeben.
4. Nachdem die Antwort zusammengestellt wurde, führt
   `guardrailRegistry.runPostCallHooks(...)` dieselbe Kette für die Antwort
   aus. `block: true` verwirft hier die Upstream-Antwort.

Guardrails, die eine Ausnahme auslösen, werden mit `error: <message>` erfasst
und über `logger.warn` protokolliert, die Kette wird jedoch fortgesetzt —
dies entspricht dem Fail-Open-Prinzip.

## Konfiguration

Von den integrierten Guardrails gelesene Umgebungsvariablen:

| Variable                              | Verwendet von               | Auswirkung                                                                                                            |
| ------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`          | Auf `false` setzen, um die Erkennung vollständig zu deaktivieren.                                                     |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`          | Injektionsrichtlinie: `warn`, `block` oder `log`. Der Legacy-Wert `redact` schreibt Injektionstext nicht um.          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`          | Modus für den Injektions-Guard; zugleich ein DB-Feature-Flag, das die Umgebungsvariablen **überschreibt** (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`          | Mindestschweregrad, den `MODE=block` ablehnt: `high` (Standard), `medium` oder `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`          | Legacy-Alias für `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                   |
| `PII_REDACTION_ENABLED`               | `pii-masker`                | Bei `true` werden personenbezogene Daten in Anfragen redigiert (unabhängig vom Injektionsmodus).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nachgelagert) | Steuert das Maskierungsverhalten auf der Antwortseite.                                                                |

Die Modality-Bridge-Guardrails lesen die Laufzeitkonfiguration aus dem
DB-gestützten Einstellungsspeicher (`getSettings()`), nicht aus
Umgebungsvariablen. Die primären Schlüssel für Vision sind
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` und
`modalityBridgeCacheMaxEntries`. Die Legacy-Schlüssel
`visionBridge*` werden nur als dokumentierter Lese-Fallback für einen Zyklus
akzeptiert; Schreibvorgänge über das Dashboard verwenden die primären
Schlüssel. Standardwerte und der Fallback-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`, während Legacy-Konstanten in
`src/shared/constants/visionBridgeDefaults.ts` beibehalten werden.

Audio verwendet `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` und `modalityBridgeAudioMaxClips` sowie die
gemeinsam genutzten `modalityBridgeCache*`-Einstellungen. Für Audio gibt es
keinen Legacy-Schlüssel-Fallback, da diese Schlüssel mit dem
Modality-Bridge-Schema eingeführt wurden.

Video verwendet `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` und
`modalityBridgeVideoTimeout` sowie die gemeinsam genutzten
`modalityBridgeCache*`-Einstellungen. Es ist standardmäßig deaktiviert, da
FFmpeg/ffprobe optionale betriebliche Abhängigkeiten sind und die
Frame-Beschriftung zusätzliche Latenz und Modellkosten verursacht.

## Benutzerdefinierte Guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Schritte:

1. Erstellen Sie `src/lib/guardrails/myGuardrail.ts` als Erweiterung von `BaseGuardrail`.
2. Implementieren Sie `preCall` und/oder `postCall`.
3. Registrieren Sie die Guardrail entweder beim Import (über `registerDefaultGuardrails`) oder
   rufen Sie zur Laufzeit `guardrailRegistry.register(...)` auf — die Registry ersetzt
   jede vorhandene Guardrail mit demselben normalisierten Namen.
4. Fügen Sie Tests unter `tests/unit/` hinzu (vorhandene Beispiele:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tests

Verwenden Sie zwischen den Tests `resetGuardrailsForTests()`, um mit einem bekannten Zustand zu beginnen.
Übergeben Sie `{ registerDefaults: false }`, um mit einer leeren Registry zu beginnen und
nur die zu testenden Guardrails zu registrieren. Vision Bridge unterstützt Dependency
Injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge stellt entsprechende
Schnittstellen für Einstellungen, Fähigkeiten, STT-Modellauswahl, Anmeldedatenprüfungen
und Transkription bereit. Tests können daher beide Abläufe ohne Datenbank- oder
Netzwerkzugriff ausführen.

## Siehe auch

- `src/lib/guardrails/` — Implementierung
- `src/shared/utils/inputSanitizer.ts` — gemeinsamer Detektor, auf dem
  Prompt-Injection-Erkennung und PII-Maskierung basieren
- `src/shared/constants/visionBridgeDefaults.ts` — Standardwerte für Vision Bridge und
  Modellliste für erzwungenes Bridging
- `src/shared/constants/modalityBridgeDefaults.ts` — gemeinsame Laufzeitstandardwerte für Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonale Schicht (Circuit Breaker, Cooldowns)
- `docs/reference/ENVIRONMENT.md` — vollständige Referenz der Umgebungsvariablen

## Routenabdeckung des Injection-Guards und Red-Teaming (Phase 8 · Block D)

Der Injection-Guard (`createInjectionGuard` / `withInjectionGuard`) deckt alle Routen ab,
die Benutzer-Prompts akzeptieren. Er berücksichtigt `INJECTION_GUARD_MODE` (Standardwert `warn` = nur protokollieren;
`block` = gibt HTTP 400 `SECURITY_001` zurück).

| Typ              | Routen                                                                                                                                               | Standardmodus |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Text (vorhanden) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generativ        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Daten            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Die Textextraktion (`extractMessageContents`) deckt `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ab.

**Red-Teaming (nächtlich, `nightly-llm-security.yml`):** promptfoo überprüft, dass jede Route
den OWASP-LLM-Korpus bei `INJECTION_GUARD_MODE=block` blockiert; garak führt Prüfungen aus (wird ohne Secret übersprungen).
`moderations` ist aus Konsistenzgründen enthalten — Betreiber können die Route im Blockierungsmodus über
`resolveDisabledGuardrails` ausnehmen.

Der nächtliche Workflow (`.github/workflows/nightly-llm-security.yml`, Cron + manueller
Start) umfasst zwei Jobs:

- **`promptfoo-guard` (blockierend)** — führt `promptfoo eval -c promptfooconfig.yaml`
  mit `INJECTION_GUARD_MODE=block` aus. Jeder adversariale Fall (z. B. „ignore all
  previous instructions…“, Jailbreaks im DAN-Stil) stellt sicher, dass die Antwort
  `error.code === "SECURITY_001"` enthält, d. h., dass die Guardrail die Anfrage tatsächlich abgelehnt hat.
- **`garak` (informativ)** — führt garak mit `--probes promptinject,dan,leakreplay`
  gegen eine lokale OmniRoute-Instanz (`http://localhost:20128/v1`) aus. Die Ausführung hängt von einem
  Provider-Secret (`PROMPTFOO_PROVIDER_KEY`) ab; ohne dieses wird sie ordnungsgemäß übersprungen und ist mit
  `|| true` versehen, sodass Ergebnisse gemeldet werden, ohne dass CI fehlschlägt.

Die Abdeckung des Guard-Helfers (`createInjectionGuard` / `withInjectionGuard`)
erstreckt sich über jede Prompt-verarbeitende `/v1`-Route; der Prompt-Text wird durch
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts` aus
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` extrahiert.
