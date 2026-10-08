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

Das Register lädt beim Import automatisch sechs Guardrails in Prioritätsreihenfolge (siehe `registry.ts` → `registerDefaultGuardrails()`):

| Priorität | Name                | Phase(n)       | Datei                 |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niedrigere Prioritätsnummern werden **zuerst** ausgeführt.

### Vision Bridge (`visionBridge.ts`) — Modalitätsbrücke PR-1

Fängt bildhaltige Anfragen ab, die an **nicht-Vision-Modelle** gerichtet sind, und leitet entweder die gesamte Anfrage an ein Vision-fähiges Modell um oder ersetzt die Bildteile durch Textbeschreibungen, die von einem konfigurierbaren Vision-Modell erstellt wurden, bevor der Upstream-Aufruf erfolgt. Dies ermöglicht es reinen Textanbietern, multimodale Payloads transparent zu verarbeiten.

Ablauf:

1.  Überspringen, wenn das Zielmodell bereits Vision unterstützt (es sei denn, es erscheint in der Liste der erzwungenen Brücken `isVisionBridgeForcedModel`).
2.  Extrahiert Bildteile über `extractImageParts(messages)` (`visionBridgeHelpers.ts`), das an den **einheitlichen Mediendetektor** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` delegiert – die einzige Quelle der Wahrheit, die mit dem Combo-Kompatibilitätsfilter geteilt wird. Die Extraktion ist auf Top-Level-Teile der Formen beschränkt, die `replaceImageParts` wieder einfügen kann (der Extraktions↔Ersetzungs-Vertrag): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` und Responses API `input_image`. Verschachtelte Treffer und nur-Indikator-Formen sind Combo-Filter-Material und werden niemals extrahiert. Überspringen, wenn keine gefunden wurden.
3.  Löst die Laufzeitkonfiguration über `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) auf: neue `modalityBridge*`-Einstellungsschlüssel gewinnen; ältere `visionBridge*`-Schlüssel bleiben ein **Ein-Zyklus-Fallback** (Rollback-Fenster). Überspringen Sie vor jeder Medienprüfung, wenn die Brücke deaktiviert ist.
4.  Der Modusselektor (`modalityBridgeVisionMode`, siehe Tabelle unten) entscheidet zwischen Umleitung und Beschreibung. Eine Umleitung gibt `modifiedPayload` zurück, wobei nur `model` ausgetauscht wurde, plus Metadaten `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Beschreibungspfad: Bilder auf `maxImages` begrenzen, den aufgabenbewussten Prompt zusammenstellen, den Beschreibungscache konsultieren, das Vision-Modell **parallel** aufrufen (`Promise.allSettled`) und `[Bild N]: <Beschreibung>`-Textteile an ihrer Stelle einfügen. Eine fehlgeschlagene Beschreibung ergibt `null`, und der ursprüngliche Bildteil wird **beibehalten** (#4012) – außer auf dem Combo-Beschreibungspfad, wenn jede Beschreibung fehlgeschlagen ist, wo ein bestätigter nicht-Vision-Upstream stattdessen einen `(nicht verfügbar – kein Vision-fähiger Anbieter verbunden)`-Stub erhält (#8430).
6.  Gibt `modifiedPayload` + Metadaten (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) zurück.

#### Modusselektor (`modalityBridgeVisionMode`)

| Modus      | Standard | Verhalten                                                                                                                                                                                                                                                                                                                                           |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Alte Heuristik, unberührt (#6640/#7204): Nicht-Combo-/`auto/`-Modelle leiten an das beste Vision-Modell um, es sei denn, das ursprüngliche Modell hat bereits verwendbare Anmeldeinformationen (dann beschreiben); Combo-Ziele beschreiben immer.                                                                                                   |
| `describe` |          | Immer beschreiben – der Umleitungsblock wird vollständig übersprungen; das vom Benutzer gewählte Modell antwortet immer.                                                                                                                                                                                                                            |
| `reroute`  |          | Umleitung erzwingen: Die Schutzfunktion für Modelle mit Anmeldeinformationen wird umgangen. Die Schutzfunktion für Anmeldeinformationen des Umleitungs-**Ziels** bleibt bestehen – wenn kein verwendbares Vision-Ziel existiert, fällt die Anfrage auf die Beschreibung zurück, sodass Rohbilder niemals ein reines Text-Backend erreichen (#8430). |

Erzwungene Modi schalten **vor** der Ausführung der Auto-Heuristik kurz; das `auto`-Verhalten ist byte-identisch mit der Guardrail vor PR-1.

#### Aufgabenbewusster Beschreibungsprompt (`modalityBridgeVisionTaskAware`)

Standardmäßig **wahr**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) hängt den Text der **letzten Benutzernachricht** (auf 500 Zeichen gekürzt) an den Basis-Beschreibungsprompt an, lenkt die Beschreibung auf das, was der Benutzer tatsächlich gefragt hat (Codex-Vision-Proxy-Muster), und fordert das Vision-Modell auf, sichtbaren Text zu transkribieren. Wenn das Flag deaktiviert ist – oder kein Benutzertext vorhanden ist – wird der Basis-Prompt unverändert verwendet.

Die eigene OpenAI-kompatible Anfrage des Describe-Self-Loops (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) fordert immer `image_url.detail: "high"` an – bedingungslos, für jeden Aufrufer/Anbieter, nicht durch ein Clientsignal gesteuert. Eine Abtastung mit geringer Detailgenauigkeit verschlechtert die OCR-Genauigkeit genau für die Texttranskriptionsaufgabe, die dieser Prompt anfordert, daher fordert der Describe-Aufruf selbst immer hohe Detailgenauigkeit an, unabhängig davon, welche Detailstufe die ursprüngliche eingehende Anfrage verwendet hat. Dies betrifft nur den internen Describe-Anfragekörper; es ändert nicht, wie OmniRoute das eigene `image_url.detail` des Aufrufers bei der primären Anfrage weiterleitet – diese Standardeinstellung wird separat und nur für erkannte OpenCode-Clients in `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) angewendet. Der Anthropic-Wire-Format-Zweig des Describe-Self-Loops hat kein `detail`-Feld und wird von keiner der Standardeinstellungen beeinflusst.

#### Describe-Ausgabebegrenzung (`modalityBridgeVisionMaxChars`)

| Schlüssel                      | Standard | Bereich            |
| :----------------------------- | :------- | :----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` oder 100–50000 |

`0` (Standard) bedeutet **keine Begrenzung** – die von `callVisionModel()` zurückgegebene Beschreibung wird unverändert weitergeleitet, wodurch das bestehende Verhalten beibehalten wird. Jeder Wert im Bereich von 100–50000 kürzt die Beschreibung mit einem `…`-Suffix, bevor sie als `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`) wieder eingefügt wird. Erhöhen Sie diesen Wert für detailreiche OCR-Aufgaben, bei denen das nachgeschaltete Modell die vollständige Transkription benötigt; senken Sie ihn, um die Token-Nutzung bei gesprächigen Vision-Modellen zu begrenzen. Das Dashboard-Feld befindet sich im erweiterten Bereich des Vision-Tabs (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) und begrenzt jeden Wert zwischen 1 und 99 auf den Mindestwert von 100, während eine explizite `0` unberührt bleibt – `0` ist ein eigenständiger gültiger Zod-Wert (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nicht nur der "nicht gesetzte" Standardwert.

#### Describe-Cache (`modalityBridge/bridgeCache.ts`)

In-Memory LRU + TTL-Cache für Describe-Ausgaben, prozessweit geteilt. Schlüssel = `sha256(imageRef + composedPrompt + configuredBridgeModel)` mit Längenpräfix-Framing (keine Feldgrenzenkollisionen). Die Modellkomponente ist das **konfigurierte** Bridge-Modell, nicht das Modell, das tatsächlich geantwortet hat – `callVisionModel` kann intern zurückgreifen, und eine Schlüsselung pro Versuch würde den Cache fragmentieren. Fehlgeschlagene Describes werden niemals zwischengespeichert. Einstellungen:

| Schlüssel                       | Standard | Bereich |
| :------------------------------ | :------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Remote-Bildnormalisierung (Self-Loop Describe/Base64-Abruf)

Wenn die Bridge selbst ein **Remote-Bild** abruft – der Anthropic Describe-Self-Call und die Claude-Wire-Format-Base64-Konvertierung (`ensureBase64ImagesForClaudeWire`), beides über `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` – wird die resultierende Daten-URI durch `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) geleitet, bevor sie in die Vision-Modell-Anfrage eingebettet wird. Überdimensionierte Bilder werden auf eine **2048px lange Kante** herunterskaliert (entsprechend der Größenbegrenzung, die OpenAI/Anthropic bereits serverseitig anwenden), was Upload-Bytes/Latenz reduziert, ohne zu ändern, was das Vision-Modell sieht. Die Größenänderung verwendet `sharp`, geladen über dynamischen Import: Auf einer Plattform, auf der die native Binärdatei nicht geladen werden kann, **wirft `normalizeDataUri()` niemals einen Fehler** – es fällt auf eine Weiterleitung der Originalbytes zurück, sodass der Describe-/Base64-Konvertierungspfad immer funktioniert. Nicht-Bild-Bytes (ein Abruf, der kein dekodierbares Bild zurückgab) werden ebenfalls unberührt weitergeleitet. Diese Normalisierung ist auf Bilder beschränkt, die die Bridge für ihren eigenen Self-Call abruft – sie wird niemals auf die rohe Passthrough-Nutzlast des Aufrufers angewendet, im Einklang mit dem Prinzip der Opt-in-Mutation (Harte Regel #20).

#### Einstellungen Schema + Migration

Die neuen `modalityBridge*`-Schlüssel werden in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`) Zod-validiert: `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, das `modalityBridgeCache*`-Trio und die von der Audio Bridge verwendete `modalityBridgeAudio*`-Gruppe. Migration `141_modality_bridge_settings.sql` kopiert bestehende Legacy-`visionBridge*`-Werte auf die passenden neuen Schlüssel (idempotent, überschreibt niemals einen vom Operator gesetzten `modalityBridge*`-Wert); die Legacy-Schlüssel bleiben für einen Release-Zyklus als Lese-Fallback akzeptiert.

#### Transparenz-Header + Statistiken

Describe-transformierte Antworten tragen `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (erstellt von `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, gestempelt von `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Weitergeleitete Anfragen erhalten **keinen** Header – die Nutzlast blieb unberührt und der Modelltausch ist bereits im `model`-Feld des Antwortkörpers sichtbar.

`GET /api/modality-bridge/stats` (Management-Authentifizierung, gleiche Ebene wie `GET /api/settings`) gibt die In-Memory-Zähler pro Modalität `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` für `vision`, `audio` und `video` zurück. `averageLatencyMs` verwendet `latencySamples` als Nenner, nicht alle Versuche; ein Vorgang ohne Zeitmessung erzeugt kein Null-Millisekunden-Sample. `bridged` bleibt der abwärtskompatible Alias für erfolgreiche Konvertierungen; fehlgeschlagene Versuche erhöhen ihn nicht. Zähler werden beim Neustart des Prozesses absichtlich zurückgesetzt (Telemetrie, keine Buchhaltung).

#### Dashboard-Konfiguration

Die dedizierte Dashboard-Seite ist
`/dashboard/settings/modality-bridge`. Ihre URL-adressierbaren `Vision`-, `Audio`-
und `Video`-Registerkarten bewahren Abfrageparameter beim Wechsel des `tab`-Werts.
Die `Vision`-Registerkarte bietet Aktivierung, Modus, Modellauswahl (einschließlich der automatischen
Standardeinstellung), aufgabenbezogenes Prompting, erweiterte Timeout-/Bild-/Beschreibungs-Längen-/Cache-Limits,
Laufzeit-Zähler und eine geschützte Beispielanfrage. Die `Audio`-Registerkarte ist ebenfalls live: Sie bietet
Aktivierung, einen reinen STT-Modell-Picker mit Auto, Timeout-/Max-Clip-Limits, Audio-Zähler
und einen `input_audio`-Beispieltest. Die `Video`-Registerkarte ist funktionsfähig: Sie meldet
den FFmpeg/ffprobe-Laufzeitstatus – einen von vier expliziten UI-Zuständen (`unknown`, während
die Prüfung läuft oder nicht abgeschlossen werden konnte; `restricted` auf einem Nicht-Loopback-
Dashboard-Host, wo die Prüfung clientseitig übersprungen wird; `unavailable`, sobald geprüft
und als fehlend bestätigt; oder `available` mit den FFmpeg/ffprobe-Versionen) – speichert
Aktivierungs-/Modell-/Frame-/Video-/Timeout-Limits, filtert den Modell-Picker auf vision-fähige
Modelle und zeigt Video-Zähler an.

Die frühere Vision Bridge-Karte unter `AI settings` ist ein Kompatibilitätslink zur
neuen Seite; sie besitzt keine zweite Kopie des Formulars mehr. `Media Providers`
verknüpft auch `Image-to-Text`- und `Speech-to-Text`-Workflows mit den entsprechenden `Modality
Bridge`-Registerkarten, ohne den bestehenden `Speech-to-Text playground` zu entfernen.

**Self-loop-Zulassungs-Bypass:** Wenn der `describe`-Aufruf über OmniRoutes eigenen
`/v1`-Self-Loop (nicht-standardmäßiges Provider-Modell) geleitet wird, sendet die
Unteranfrage `x-omniroute-admission-bypass: internal` und wird mit dem aufgelösten
Self-loop-Zugangsdaten authentifiziert – dem lokalen `sk_omniroute`-Sentinel im lokalen
Modus oder dem vom Operator konfigurierten `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
Umgebungsschlüssel (#1350), damit `REQUIRE_API_KEY=true`-Bereitstellungen den `describe`-Aufruf
weiterhin ausführen können. Der Bypass wird nur für diese exakten Zugangsdaten berücksichtigt,
sodass externe Clients den Header nicht verwenden können, um die Zulassung zu umgehen.

Legacy-Standardwerte befinden sich in `src/shared/constants/visionBridgeDefaults.ts`; die
neuen Modus-/aufgabenbezogenen/Cache-Standardwerte und der Einstellungs-Resolver befinden sich in
`src/shared/constants/modalityBridgeDefaults.ts`. Die Schutzschiene bietet eine `deps`-Konstruktoroption,
damit Tests gefälschte `getSettings`- und `callVisionModel`-Implementierungen injizieren können.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Fängt Audio-tragende Chat-Anfragen ab, bevor sie ein Ziel erreichen, das bekanntermaßen
keine Audioeingabe akzeptiert. Es leitet die Chat-Anfrage niemals um: Audio-Teile werden
über den bestehenden OpenAI-kompatiblen Multipart-Endpunkt transkribiert, und das
gewählte Chat-Modell fährt mit Texttranskripten fort.

Ablauf:

1.  `supportsAudio` über `getResolvedModelCapabilities()` auflösen. Explizite
    Provider-Registry-Metadaten haben Vorrang, dann statische Modell-Metadaten, dann
    synchronisierte `modalities_input`. Eine deklarierte Eingabeliste ohne `audio` ist
    `false`; kein Fähigkeitsnachweis bleibt `null`. Sowohl `false` als auch `null`
    aktivieren die konservative Bridge, während `true` sie umgeht.
2.  `modalityBridgeAudio*`-Einstellungen auflösen und über den gemeinsamen
    `detectMediaParts()`-Detektor spleißbare Audio-Teile der obersten Ebene aus jeder
    Nachricht extrahieren. Unterstützte Wire-Shapes sind OpenAI `input_audio`, `audio_url`
    und `source.media_type: "audio/*"`. Verschachteltes Audio wird für das Routing erkannt,
    aber nicht vom Spleißpfad entfernt. Die Arbeit ist durch `modalityBridgeAudioMaxClips`
    begrenzt; spätere Teile bleiben unberührt.
3.  Ein konfiguriertes `provider/model` berücksichtigen oder `selectAudioBridgeModel()`
    die `AUDIO_TRANSCRIPTION_PROVIDERS` in stabiler Katalogreihenfolge durchlaufen lassen
    und das erste Modell mit einem nutzbaren aktiven Provider-Zugangsdaten auswählen.
4.  `callAudioTranscription()` konvertiert base64/data-URI-Audio in eine Multipart-`file`
    oder lädt eine entfernte `audio_url` über den nur-öffentlichen Outbound-Guard mit
    DNS-Pinning und einer 25 MB-Grenze herunter. Anschließend POSTet es die Datei und das
    ausgewählte Modell an den lokalen `/v1/audio/transcriptions`-Self-Loop, authentifiziert
    mit `resolveSelfLoopBearer()`. Die bestehende Transkriptionsroute führt normale
    Zugangsdaten-Suche, Cooldown-/Ratenlimit-Behandlung und Provider-Dispatch durch.
5.  Erfolgreiche Aufrufe ersetzen ihre Teile durch `[Audio N]: <transcript>`. Aufrufe
    werden mit `Promise.allSettled` ausgeführt: Ein individueller Fehler bewahrt den
    ursprünglichen Audio-Teil (#4012-Vertrag). Wenn jeder Aufruf fehlschlägt und das
    Ziel als `supportsAudio === false` erwiesen ist, werden die Teile zu
    `[Audio N]: (unavailable — no STT provider connected)` (#8430-Vertrag). Für ein
    unbekanntes Ziel (`null`) bleibt ein Gesamtausfallergebnis unberührt. Ein erwiesenes
    reines Text-Ziel ohne nutzbare STT-Zugangsdaten erhält denselben expliziten Stub,
    ohne einen Netzwerkaufruf auszulösen.

Erfolgreiche Transkripte verwenden den prozessweiten Modality Bridge LRU/TTL-Cache. Der
Schlüssel kombiniert die Audio-Referenz, das stabile `audio-transcription`-Operationslabel
und das ausgewählte STT-Modell; Fehler werden niemals zwischengespeichert. Audio-Versuche
aktualisieren die gemeinsamen `bridged`-, `cacheHits`-, `failures`- und `lastUsedAt`-Zähler.
Transformierte Antworten tragen
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; unberührte
Anfragen erhalten kein Audio Bridge-Segment.

Laufzeiteinstellungen sind DB-gestützt und Zod-validiert:

| Schlüssel                     | Standard | Bereich        |
| :---------------------------- | :------- | :------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —              |
| `modalityBridgeAudioModel`    | `""`     | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10           |

Der gemeinsame Cache wird weiterhin durch `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` und `modalityBridgeCacheMaxEntries` gesteuert.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Fängt Video-Teile der obersten Ebene in Chat Completions `messages` und Responses API `input` ab, bevor ein Ziel ohne bekannte native Videounterstützung aufgerufen wird. Unterstützte Formate sind `input_video`, `video_url`, `video_source`, HTTPS-URLs und `data:video/*;base64,...` Daten-URIs. Einfache Dateinamen im Text werden nicht als Video behandelt.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) ist verantwortlich für die Anforderungsdurchquerung, die Fähigkeits-/Richtlinienprüfung, die Aggregation pro Anforderung und die Antwortnutzlast. Die Arbeit pro Video – Erfassung, der Gesamtergebnis-Cache, die Beschreibung einer Bildsequenz (die jedes vom Aufrufer deklarierte Audio-Transkript zusammenführt) und Metriken/Abbruch/Bereinigung pro Versuch – ist hinter `processVideoPart` in `videoBridgePipeline.ts` verborgen, das einmal pro Videoteil innerhalb der Schleife von `preCall` aufgerufen wird. Dieses Modul definiert auch die expliziten Port-Grenzen `VideoMediaBrokerPort` (Erfassung von Bytes und Extrahieren von gesampelten Frames), `VideoAudioTranscriptionPort` (Zusammenführung eines vom Aufrufer deklarierten Audio-Transkripts mit den gesampelten Untertiteln) und `VideoDrilldownPort` (die Persistenzgrenze für Frame-Drilldown; noch nicht in `processVideoPart` integriert – nur die separate Route `/api/modality-bridge/video/drilldown` schreibt heute Drilldown-Einträge).

Der öffentliche Anforderungspfad `/v1` importiert oder ruft niemals einen Unterprozess auf. Remote-Videos werden unter einer Grenze von 50 MiB heruntergeladen; Inline-Base64-Videos haben eine konservative Obergrenze von 36 MiB dekodiert pro Video, damit der Modell-/Nachrichten-/Framing-Umschlag innerhalb der öffentlichen JSON-Anforderungszulassungsgrenze von 50 MiB bleiben kann. Inline-Länge und dekodierte Größenabschätzungen werden vor der Zuweisung überprüft. HTTPS ist für die anfängliche Remote-URL und jede Weiterleitung erforderlich, unter Verwendung des bestehenden nur-öffentlichen ausgehenden Schutzes mit DNS-Pinning. Die Bytes überqueren dann die exakte interne Broker-Grenze `POST /api/modality-bridge/video/extract`. Diese Route ist sowohl `LOCAL_ONLY` als auch `SPAWN_CAPABLE`, akzeptiert nur eine prozessauthentifizierte, vertrauenswürdige Loopback-Anforderung und akzeptiert niemals eine URL, einen Dateisystempfad, eine ausführbare Datei oder eine Argumentliste. Die API-Body-Size-Pipeline und der inkrementelle Body-Reader des Handlers erzwingen unabhängig voneinander eine Broker-Eingabegrenze von 50 MiB. Die begrenzte Warteschlange führt jeweils eine Extraktion aus, erlaubt vier ausstehende Aufträge und begrenzt die ausstehende Eingabe auf 100 MiB.

Innerhalb des Brokers liest `ffprobe` eine private lokale Datei; die feste Format-Zulassungsliste schließt Wiedergabelisten- und Manifestformate aus. Für zugelassene MOV-Familien-Container bleiben externe MOV-Datenreferenzen standardmäßig deaktiviert, und der feste Befehl aktiviert sie nicht. Sowohl `ffprobe` als auch `ffmpeg` verwenden die `file`-only Protokoll-Whitelist, einen Thread, feste Argument-Arrays, keine Shell und ausführbare Dateien, die aus `PATH` aufgelöst werden. Angehängte Bild-Cover-Streams sind keine abspielbaren Kandidaten. Alle abspielbaren Streams müssen die Grenzwerte erfüllen, und ein expliziter Standard-Stream wird vor dem deterministischen Fallback mit dem niedrigsten Index bevorzugt. Videos sind auf 600 Sekunden, 8.192 Pixel pro Dimension und 33.554.432 Quellpixel begrenzt. FFmpeg sampelt 1–16 mittlere JPEG-Frames, skaliert die längere Kante auf maximal 1.024 Pixel herunter, ohne kleinere Eingaben hochzuskalieren, und empfängt niemals eine URL. Das Sampling ist standardmäßig `uniform`. Die optionalen `scene_aware` und experimentellen `segment_aware` Richtlinien führen einen zusätzlichen festen FFmpeg-Durchlauf über den bereits validierten lokalen Stream durch, wählen begrenzte `showinfo` Szenen-Zeitstempel aus und fallen bei Detektorfehler, Timeout, fehlerhafter Ausgabe oder einem leeren Kandidatensatz deterministisch auf dieselben uniformen Mittelpunkte zurück. Der segment-aware Modus weist Mittelpunkt-Samples proportional zu den validierten Szenenintervallen zu; segment-aware Evidenz und Fallback-Verhalten werden unten detailliert beschrieben. Die feste Obergrenze von 16 Frames wird nach der Auswahl in jeder Richtlinie angewendet. Wenn eine szenenbewusste Anforderung nur ein Ein-Frame-Budget hat, verwendet sie den uniformen Mittelpunkt des aktiven Vollvideo- oder Fokusfensters und meldet `policyEffective: uniform`: ein einzelner ausgewählter Szenen-Frame kann nicht beide temporalen Enden bewahren. Ein Aufrufer kann optional ein endliches Fokusfenster (`start`/`end` Sekunden) bereitstellen; Grenzen werden auf die Mediendauer geklemmt, umgekehrte oder nicht-endliche Fenster werden abgelehnt, und alle Sampling-Richtlinien werden nur innerhalb des normalisierten Intervalls durchgeführt. Das resultierende Fenster wird in den Sampling-Metadaten und im nicht vertrauenswürdigen Beschreibungspräfix enthalten, damit nachgeschaltete Modelle einen fokussierten Ausschnitt von der vollständigen Zeitleiste unterscheiden können.

Semantischer Untertitel-Fokus ist eine separate, explizite Einstellung. Der Standard-Analysemodus `full` bewahrt den vorhandenen Frame-Prompt und leitet niemals Anforderungstext an das Untertitelmodell weiter. Im `focused`-Modus liest die Bridge nur den neuesten nicht-leeren, vom Benutzer verfassten `text`/`input_text` aus demselben Chat- oder Responses-Container, normalisiert ihn zu NFC, komprimiert Steuerzeichen und Leerzeichen und begrenzt ihn auf 500 Unicode-Codepunkte. Ein leeres Ergebnis fällt auf den exakten `full`-Prompt zurück. Ein nutzbarer Hinweis wird als JSON in einem dedizierten nicht vertrauenswürdigen Benutzerkontextblock serialisiert und darf nur beobachtbare Details priorisieren; er kann die separate Warnung vor dem Befolgen von Anweisungen, die in den Medien sichtbar oder hörbar sind, nicht außer Kraft setzen. Textueller Fokus leitet niemals `start`/`end` ab oder ändert den temporalen Sampler.

#### FU-07 strukturelle Segmentnachweise

`segment_aware` verwendet einen begrenzten Voranalyse-Durchlauf über den bereits validierten lokalen Videostream. Die feste Filterkette skaliert zuerst auf maximal 320 Pixel Breite, erkennt Szenenwechsel und eingefrorene Intervalle, und sampelt dann mit 1 Frame pro Sekunde auf Unschärfe, durchschnittliche Luminanz und räumliche/zeitliche Informationen. Der Durchlauf ist auf 600 strukturelle Samples, einen FFmpeg/Filter-Thread, dieselben `file`-only Protokoll- und Container-Zulassungslisten, eine 1 MiB Prozessausgabe-Grenze und maximal 30 Sekunden innerhalb des gemeinsamen Abbruchs/der Frist des Brokers begrenzt. Es akzeptiert niemals einen Befehl, Filter, Pfad oder eine URL aus der Anforderung.

Die strukturellen Werte sind deterministische Stichprobenbeweise, keine semantische Videoverständnis. Sie leiten keine Subjekte, Aktionen, Bildunterschriften, Sprache oder Benutzerabsichten ab. Szenen- und Freeze-Grenzen bilden Segmente; Freeze-Abdeckung, Unschärfe, Belichtung, räumliche Details und zeitliche Änderungen beeinflussen nur, wie das vorhandene Budget von 1–16 Frames zugewiesen wird. Ein vollständig eingefrorenes Segment ist auf einen Frame begrenzt, während nicht eingefrorene Segmente um das verbleibende Budget konkurrieren. Wenn die Grenzen die Anzahl der Frames übersteigen, wird eine gleichmäßige Zeitachsenabdeckung beibehalten, sodass schnelle frühe Schnitte kein langes nachfolgendes Segment verbergen können. Szenengrenzen innerhalb der 1-Sekunden-Analyseauflösung einer Freeze-Grenze werden zusammengeführt.

Fehlende Filter, fehlerhafte/leere Beweise, ein Detektorfehler oder das begrenzte Pre-Analyse-Timeout führen zu einem offenen Fehler und zur exakten einheitlichen Mittelpunktrichtlinie. Ein Abbruch durch den Aufrufer oder eine Broker-Frist führt nicht zu einem offenen Fehler: Er beendet den laufenden Unterprozess, verhindert eine spätere Frame-Extraktion, und der private temporäre Baum wird in `finally` entfernt.

`scripts/perf/video-bridge-fu07-eval.ts` generiert deterministische, echte FFmpeg-Fixtures für Einsparungen bei Bildunterschriften-Aufrufen nach der Deduplizierung, Budgetzuweisung für dichte Bewegung, Unschärfe-/Belichtungs-/SI-TI-Beweise, schnelle Schnitte mit langem Nachlauf und False Positives bei allmählichem Ausblenden. Es zeichnet die Wall-Time vor der Analyse auf und, wo `/usr/bin/time` verfügbar ist, die CPU-Nutzung des Kindprozesses und den Spitzen-RSS. Seine Qualitätsprüfungen sind nur strukturelle Orakel. Die Qualität des echten Bildunterschriftenmodells bleibt `HOLD`, da dieses Testgeschirr keinen autorisierten Endpunkt oder festen Richter hat. Monetäre Einsparungen bleiben ebenfalls `HOLD`, es sei denn, `--caption-cost-per-call-usd` liefert eine explizite positive Schätzung pro Aufruf; das Skript erzeugt niemals eines der beiden Ergebnisse.

Jeder Frame ist auf 4 MiB begrenzt, alle Roh-Frames zusammen auf 23 MiB und die serialisierte Broker-Antwort auf 32 MiB. Ein privates temporäres Verzeichnis wird in `finally` entfernt. OmniRoute bündelt FFmpeg nicht und akzeptiert keinen benutzerdefinierten ausführbaren Pfad. Vor der Beschriftung wendet die Bridge einen konservativen visuellen Deduplizierungsdurchlauf an: Jedes JPEG wird auf einen 16×16 Graustufenpuffer reduziert und nur mit dem zuletzt beibehaltenen Frame verglichen. Für ein angefordertes Beschriftungsbudget von mehr als einem Frame liefert die Extraktion einen begrenzten Kandidatenpool von bis zu dem doppelten Budget und niemals mehr als 16 Frames. Die angeforderte Obergrenze wird erst nach der Deduplizierung angewendet, wobei die ersten und letzten ausgewählten Kandidaten während der endgültigen Ausdünnung beibehalten werden, wenn das Budget mindestens zwei beträgt. Die versionierte `grayscale-16x16-mean-cells-v2`-Richtlinie verwendet den größeren Wert aus dem mittleren Luma-Delta und dem Verhältnis der Thumbnail-Zellen, deren normalisiertes Delta mindestens 0,05 beträgt. Der Duplikatschwellenwert ist die Konstante 0,04, gewählt für Vorhersagbarkeit und nicht als Laufzeiteinstellung verfügbar gemacht. Dieses sekundäre Hochkontrastsignal bewahrt kleine Bewegungen und sichtbare Textänderungen, die ein reiner Mittelwertvergleich verbergen kann. Komparator- oder Decoderfehler führen zu einem offenen Fehler und behalten die Abdeckung bei. Ausgabe-Metadaten trennen extrahierte Kandidaten, erfolgreich verwendete Frames und visuell verworfene Duplikate.

Ein explizit markierter Videoteil kann ein mit Zeitstempel versehenes Kontaktblatt anfordern. Die Bridge erstellt maximal ein JPEG-Raster mit 4 Spalten und 16 Frames. Jede 512-Pixel-Zelle brennt ihren Quell-Zeitstempel in ein kontrastreiches unteres Band ein, während dieselben Zeitstempel in den Textmetadaten für die nachgelagerte Zuordnung und Prüfung verbleiben. Das vollständige JPEG bleibt auf 32 MiB begrenzt. Wenn `sharp` das Raster nicht dekodieren oder zusammensetzen kann, greift die Bridge auf die einzelnen JPEG-Frames zurück; ein Client-Abbruch wird weiterhin durch den Blattvorgang propagiert.

Beförderungsnachweise sind bewusst getrennt vom synthetischen Kompositions-Mikrobenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiert ein schema-versioniertes A/B-Testgeschirr für echte OpenAI-kompatible Visionsmodelle. Es misst vom Anbieter gemeldete Tokens, End-to-End-Wall-Latenz (einschließlich Blattkomposition), Anzahl der Modellaufrufe und die im Manifest definierte Faktenbeibehaltung. Rohe Modellantworten werden nicht in den Bericht geschrieben; nur SHA-256-Hashes und übereinstimmende Fakten-IDs werden beibehalten. Das Testgeschirr führt keine Netzwerk- oder kostenpflichtigen Modellaufrufe durch, es sei denn, `--execute-real` wird übergeben und `--model`, `OMNIROUTE_BASE_URL` und `OMNIROUTE_API_KEY` sind konfiguriert. Ohne diesen expliziten echten Lauf bleibt sein maschinenlesbares Urteil `HOLD`; synthetische Nutzlast-/Aufrufzählungs-Messungen allein sind kein Beförderungsnachweis.

Aufrufer können einem unterstützten Videoteil ein optionales `transcript.cues`-Array anhängen, wenn sie bereits ausgerichteten Text besitzen. Jeder Cue muss `text`, ein endliches `start`/`end`-Intervall innerhalb der untersuchten Dauer und eine Whitelist-`source` (`client`, `embedded` oder `audio-bridge`) enthalten; `confidence` ist standardmäßig `1` und muss zwischen `0` und `1` liegen. Exakte doppelte Cues werden zusammengeführt. OmniRoute startet niemals eine Transkription aus diesen Metadaten: Validierte Cues werden mit Quelle, Konfidenz und Intervall in das beschriebene Ergebnis kopiert und als nicht vertrauenswürdige Beobachtungen neben den Frame-Bildunterschriften dargestellt. Ungültiger, außerhalb des Bereichs liegender oder herkunftsfreier Text wird abgelehnt, anstatt in den Bildunterschriftenstrom gemischt zu werden. Das `source`-Feld wird derzeit vom Aufrufer deklariert, nicht vom Server verifiziert: OmniRoute erzwingt, dass der Wert eine der drei zulässigen Zeichenketten ist, bestätigt aber noch nicht kryptografisch, dass ein `embedded`- oder `audio-bridge`-Label tatsächlich von einer serverseitigen Extraktion stammt. Behandeln Sie `source` als einen nicht vertrauenswürdigen Hinweis, bis diese Verifizierung implementiert ist; treffen Sie keine Autorisierungsentscheidungen darauf basierend.

Ein fortgeschrittener Aufrufer kann einen bereits autorisierten `audioTranscript`-Track für dasselbe Video bereitstellen. Die Fusionsnaht führt visuelle und Audio-Beobachtungen unter einer Frist und einem Abbruchsignal aus, ordnet sie auf einer gemeinsamen Zeitachse an, kollabiert exakte Duplikate und meldet ein Teilergebnis, wenn nur eine Seite erfolgreich ist. Ein ungültiger `audioTranscript` degradiert zu diesem Teilergebnis – die visuelle Beschreibung wird beibehalten und der Audio-Zweig zeichnet einen bereinigten Fehlercode auf – anstatt das gesamte Video fehlschlagen zu lassen. Die Verfügbarkeit pro Zweig, das Teilergebnis-Flag und die bereinigten Fehlercodes werden im beschriebenen Ergebnis, in den Guardrail-Metadaten (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), in den Ergebnis-Cache-Metadaten und in den Bridge-Fusionszählern beibehalten. Der Standard-Video-Bridge-Pfad ruft keine Spracherkennung auf oder lädt keine zweite Medienkopie herunter; ohne diesen expliziten Track bleibt er nur Video.

**Transkript-Aufbewahrung (#12150 P1).** Dies wird automatisch angewendet, wann immer die Video Bridge (selbst opt-in) einen Transkript-Cue rendert – es gibt kein separates Aufbewahrungs-Flag. Wenn eine Anfrage einen Transkript-Cue rendert (ein vom Aufrufer deklariertes `transcript` oder ein fusioniertes `audioTranscript`), markiert die Guardrail diesen als `videoBridgeObserved` und erzeugt einen redigierten Schatten der Videobeschreibung – eine identische Darstellung, bei der der Freitextkörper jedes Cues durch `[redacted-video-transcript]` ersetzt wird, erstellt durch das Ersetzen des strukturierten Cue-Feldes, bevor der String zusammengesetzt wird (niemals durch Parsen des abgeflachten Textes, sodass kein Cue-Inhalt – ob adversariell oder gewöhnlich, einschließlich Körpern, die `]` enthalten, wie `[inaudible]`/`[music]` – überleben kann). Der persistierte Call-Log-Anfragekörper tauscht jeden vom Video abgeleiteten Textteil gegen diesen redigierten Schatten aus, abgeglichen durch Inhaltsgleichheit; der `fullText`-Anker wird aus der fertigen Pre-Call-Guardrail-Payload neu gelesen, sodass die Übereinstimmung auch nach späteren Ketten-Guardrails (den PII- und Anmeldeinformations-Maskierern, Prioritäten 10/95) erfolgreich ist, die den Beschreibungstext an Ort und Stelle umschreiben, und nachdem System-Prompt/Handoff/Memory-Injektion das Nachrichten-Array umformt. Der an das Modell gesendete Upstream-Körper bleibt unverändert. Eine beobachtete Anfrage füllt auch keinen dauerhaften Speicher (sowohl anfrage- als auch antwortbasierte Extraktion werden übersprungen), sodass die eigene Antwort des Modells keinen Transkripttext in den Speicher zurückgeben kann.

Zusätzliche aufbewahrte Kopien verwenden dasselbe beobachtete Anfragesignal. Der rohe Pre-Guardrail-Client-Anfrage-Snapshot, die im Speicher befindliche ausstehende Anfrage und das frühe Log abgelehnter Anfragen ersetzen strukturell Transkriptfelder in Videoteilen; String-Prompts, die von Pipeline-Stufen und Kontextübergabe synthetisiert werden, werden am persistierten Anfragekörper-Sink redigiert. Der persistierte `video_content_removed`-Marker bewirkt, dass die `previous_response_id`-Fortsetzung geschlossen fehlschlägt, anstatt Text zu rekonstruieren, der absichtlich verworfen wurde. Wenn eine beobachtete Anfrage ihren pro-Teil-Redaktionsschatten vor der Protokollierung verliert oder sogar einer von mehreren Videoschatten nach späteren Anfragemutationen nicht übereinstimmt, wird der aufbewahrte Anfragekörper vollständig weggelassen, anstatt ein teilweise redigiertes Transkript aufzubewahren.

Bei einer beobachteten Anfrage könnte eine Modellantwort einen beliebigen Teil des Transkripts ohne eine strukturierte Cue-Grenze zitieren. Sein persistierter Call-Log `responseBody` wird daher durch einen Auslassungsmarker ersetzt; das detaillierte Pipeline-Artefakt (das Upstream-/Client-Körper und Stream-Chunks enthalten kann) wird nicht aufbewahrt. Semantische, Idempotenz- und Reasoning-Replay-Caches umgehen Lese- und Schreibvorgänge für diese Anfrage. Die Provider-Anfrage und die für den Client sichtbare Antwort bleiben unverändert. Frühe Keepalive-Bytes werden aus dem temporären Puffer abgeleitet, wenn das detaillierte Artefakt weggelassen wird. Kiros Warnung vor fehlerhaftem EventStream meldet nur die Payload-Byte-Anzahl, niemals deren Inhalt oder den Rohfehler des JSON-Parsers. Dies bedeutet nicht, dass jede nicht verwandte Provider-/Plugin-Diagnose geprüft wurde; die umfassendere Bereinigung der aufbewahrten Sinks wird unter #11658 verfolgt.

Der interne `/api/modality-bridge/video/drilldown`-Lebenszyklus ist ein separates, Loopback-/Token-authentifiziertes Cache-Substrat. Jede Operation erfordert auch eine kanonische undurchsichtige Principal-ID. Bevor ein Produktionsaufrufer aktiviert wird, muss er diese ID vom authentifizierten Tenant ableiten und darf niemals einen vom Client ausgewählten Wert weiterleiten. Cache-Schlüssel binden diesen Principal an kanonische Sitzungs- und Video-Referenz-IDs, speichern nur deren SHA-256-abgeleitete Schlüssel und beschränken sowohl Lese- als auch Löschvorgänge auf denselben Principal. Der Cache speichert maximal 16 abgeleitete JPEG-Frames pro Eintrag, lässt sie nach zehn Minuten ablaufen und unterstützt begrenzte `start`/`end`-Lesevorgänge oder explizite Sitzungslöschung.

Jeder Principal ist auf 16 Einträge und 64 MiB kanonischer JPEG-Daten begrenzt. Diese Limits sind unabhängig von der globalen Obergrenze von 64 Einträgen/256 MiB: Der Quota-Druck des Principals verdrängt nur die am wenigsten verwendeten Einträge dieses Principals, bevor die globale LRU-Verdrängung berücksichtigt wird. Abgelaufene Einträge werden bei Cache-Aktivität sowohl aus der Principal- als auch aus der globalen Abrechnung entfernt, während Abbruch und Validierungsfehler keine teilweise Ersetzung festschreiben.

Der Cache lehnt nicht-kanonisches Base64, übermäßige Auffüllung, Nicht-JPEG-Medien, fehlerhafte oder abgeschnittene JPEGs und JPEGs ab, die während einer begrenzten `sharp`-Dekodierung eines vollständigen Bildes eine Warnung erzeugen. Er kodiert jedes akzeptierte Bild als kanonisches JPEG neu, leitet Breite und Höhe aus den dekodierten Bytes ab, anstatt den Aufruferfeldern zu vertrauen, und verwirft alle nachfolgenden Polyglot-Bytes, anstatt sie zu behalten. Nur der begrenzte kanonische komprimierte Puffer wird beiden Quoten angerechnet. Das JSON-Wire-Limit beinhaltet den Base64-Overhead für die 32 MiB dekodierte Eingabe-Obergrenze. Jede gespeicherte Ableitung zeichnet ihr validiertes JPEG-Format/Auflösung, Sampling-Richtlinie, Ableitungsversion, Erstellungszeit, serverseitig berechneten Inhaltshash und gehashte Elternreferenz sowie den Eltern-Inhaltshash des vertrauenswürdigen Aufrufers auf. Die Abbruchprüfung erfolgt zwischen asynchronen Dekodierungs-/Hash-Phasen vor dem atomaren Cache-Commit.

Diese Tranche verbindet noch keinen Produktions-Producer mit der Route und bietet keine Multi-Resolution-Variantenwahl. Der transparente Video Bridge-Anfragepfad verursacht daher keine zusätzliche Arbeit, während die mandantenbezogene Prinzipalableitung und der vollständige FU-08 Multi-Resolution-Lebenszyklus explizite Folgemaßnahmen bleiben, anstatt als vollständiges Verhalten dokumentiert zu werden.

Frames werden sequenziell mit dem konfigurierten Video-Modell beschriftet. Eine leere Video-Überschreibung erbt die Vision-Einstellung; sind beide leer, wählt der Vision-Auto-Router das effektive, visionsfähige Modell aus. Erfolgreiche Beschriftungen ersetzen den ursprünglichen Teil durch ein stabiles Präfix `[Video description:`, das den Text auch als nicht vertrauenswürdige, von Medien abgeleitete Beobachtung kennzeichnet und nachgeschalteten Modellen mitteilt, Anweisungen in den Medien nicht zu befolgen. Frame-Beschriftungs-Cache-Schlüssel umfassen die JPEG-Bytes, den Prompt, den Zeitstempel und das effektive Modell; nur erfolgreiche Beschriftungen werden zwischengespeichert. Cache-Einträge behalten das tatsächlich erfolgreiche Producer-Modell bei, einschließlich eines Fallback-Modells; die Bridge meldet `mixed`, wenn verschiedene Frames von verschiedenen Modellen produziert wurden. Ein Cache-Hit verwendet diese Producer-Identität wieder, anstatt sie als den angeforderten Routing-Plan neu zu kennzeichnen. Der Gesamtvideobeschreibungs-Ergebnis-Cache wird durch jede Eingabe geschlüsselt, die die Ausgabe ändert – Prompt, effektives Modell, Sampling-Richtlinie, Frame-Anzahl, semantischer Analysemodus, der SHA-256-Fingerabdruck des normalisierten Fokus-Hinweises, Fokusfenster, `transcript`, `audioTranscript` und das Kontaktbogen-Flag – sodass eine Änderung einer dieser Dimensionen ein Cache-Miss ist und niemals eine veraltete Wiederverwendung. Die Version der visuellen Deduplizierungsrichtlinie, der Schwellenwert und die begrenzte Anzahl von Kandidaten-Frames sind ebenfalls explizit im Ergebnis-Cache-Schlüssel und den Metadaten enthalten; eine Richtlinienänderung kann daher keine veraltete Gesamtvideobeschreibung wiederverwenden. Result-Cache v4-Metadaten behalten den Modus und den Fingerabdruck bei, niemals die rohe Benutzeraufgabe. Guardrail-Metadaten melden sowohl den angeforderten als auch den effektiven Analysemodus; ein angeforderter `focused`-Modus ohne verwendbaren Benutzertext wird als effektiv `full` gemeldet.

Die Guardrail extrahiert jeden unterstützten Videoteil, beschreibt aber nicht mehr als `modalityBridgeVideoMaxVideos`. Für ein Ziel, bei dem nachweislich `supportsVideo === false` ist, werden fehlgeschlagene und überlimitierte Videos zu expliziten sicheren Textmarkern, sodass kein Rohvideo überlebt. Wenn die Fähigkeit unbekannt ist, bleiben diese Teile unberührt. Ziele mit `supportsVideo === true` umgehen die Bridge. Das Abbruchsignal der Client-Anfrage breitet sich über Download, Broker-Warteschlange, Subprozesse und Beschriftungsaufrufe aus; Abbrüche stoppen zwischen Videos und führen niemals zu einem offenen Fehler bei Rohmedien.

Laufzeiteinstellungen sind DB-gestützt und Zod-validiert:

| Schlüssel                           | Standard    | Bereich / Verhalten                                                                                                                    |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optionale Laufzeit, Opt-in                                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` bewahrt generische Beschriftungen; `focused` verwendet einen begrenzten, nicht vertrauenswürdigen Kontext des letzten Benutzers |
| `modalityBridgeVideoModel`          | `""`        | Erbt das Vision Bridge-Modell                                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` oder proportional `segment_aware`; Detektorfehler fällt auf `uniform` zurück                                  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                         |

Alte persistierte Video-Timeout-Werte über 120 Sekunden werden auf die Broker-Deadline geklemmt; neue Einstellungsschreibvorgänge über diesem Limit werden abgelehnt. `GET /api/modality-bridge/video/runtime` erfordert eine vertrauenswürdige, gestempelte Loopback-Lokalität vor der Authentifizierung oder Laufzeitprüfung und anschließend eine Verwaltungsauthentifizierung. Es gibt nur `available`, bereinigte FFmpeg/ffprobe-Versionen und einen festen Grund zurück, wenn die Laufzeit nicht verfügbar ist. Der interne Extraktions-Endpunkt ist keine öffentliche Upload-API: Warteschlangenüberlastung gibt `503` plus `Retry-After` zurück, eine Anrufer-Trennung gibt `499` zurück und die feste Broker-Deadline gibt `504` zurück. Konvertierte Antworten fügen `video->text;model=<visionModel>;parts=<videos>` zum zentralen `x-omniroute-modality-bridge`-Header hinzu, ohne Vision- oder Audio-Segmente zu entfernen.

### PII-Maskierer (`piiMasker.ts`)

Läuft auf **beiden** Stufen.

- **`preCall`** klont die Payload, durchläuft `system`, `messages`, `input` und `prompt` (einschließlich einfacher String-Elemente) und wendet `processPII()` (aus `@/shared/utils/inputSanitizer`) auf String-Felder `content`/`text` an. Wenn `PII_REDACTION_ENABLED=true`, werden erkannte PII in der ausgehenden Payload redigiert. Dies ist unabhängig von `INPUT_SANITIZER_MODE` (der nur die Prompt-Injection-Richtlinie steuert). Wenn die Redaktion ausgeschaltet ist, zeichnet der Aufruf die Erkennungszahlen auf, ohne den Inhalt neu zu schreiben.
- **`postCall`** klont die Antwort tief, führt `sanitizePIIResponse()` sowie den Responses-API-Shape-Maskierer (`maskResponsesOutput` – deckt `output_text` und `output[].content[].text` ab) aus. Wenn eine Redaktion erfolgt, ersetzt die modifizierte Antwort die ursprüngliche.

Die Guardrail blockiert niemals; sie annotiert (`meta.detections`, `meta.redacted`) oder schreibt nur um.

### Prompt-Injection (`promptInjection.ts`)

Erkennt adversarielle Strukturen in benutzerbereitgestelltem Inhalt und erzwingt die konfigurierte Richtlinie. Das Verhalten wird durch Umgebungsvariablen und Konstruktoroptionen gesteuert:

| Einstellung      | Env-Variable                                                                                          | Standard | Effekt                                                                                                                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktiviert        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | Wenn `false`, wird die Guardrail kurzgeschlossen.                                                                                                                                                                                                  |
| Modus            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Injektionsrichtlinie: `block`, `warn` oder `log`. (`redact` wird aus Gründen der Abwärtskompatibilität akzeptiert, entfernt aber **nicht** den Injektionstext; die Anforderung zur PII-Umschreibung wird durch `PII_REDACTION_ENABLED` gesteuert.) |
| Blockierschwelle | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mindestschweregrad, der zum Blockieren erforderlich ist. "Medium" ist standardmäßig nur zur Beobachtung.                                                                                                                                           |

**Modus-Priorität** (`getMode`): Anrufer `options.mode` →
`INJECTION_GUARD_MODE` **DB-Feature-Flag-Überschreibung** (Dashboard →
Einstellungen → Feature-Flags) → `INJECTION_GUARD_MODE` Env →
`INPUT_SANITIZER_MODE` Env → `warn`. Eine Dashboard-Überschreibung hat daher
Vorrang vor den Env-Variablen, sodass die Feature-Flags-Benutzeroberfläche die
laufende Guardrail live steuert (kein Neustart erforderlich). Das Lesen aus der
Datenbank ist ausfallsicher: Wenn ein Fehler auftritt, greift die Guardrail auf
das umgebungsbasierte Verhalten zurück, und wenn keine Überschreibung festgelegt
ist, ist das Verhalten identisch mit der reinen Env-Auflösung.

Erkennungsquellen:

1.  `sanitizeRequest()` von `@/shared/utils/inputSanitizer` (gemeinsamer
    Detektorsatz, der an anderer Stelle in der Pipeline verwendet wird).
2.  Integrierte `DEFAULT_GUARD_PATTERNS` (derzeit `system_override_inline` und
    `markdown_system_block`, beide mit `high` Schweregrad).
3.  Optionale `customPatterns`, die über Konstruktoroptionen übergeben werden
    (Strings, Regex oder `{ name, pattern, severity }` Datensätze).

Wenn `mode === "block"` **und** mindestens eine Erkennung den
Schweregradschwellenwert erreicht, gibt `preCall` `{ block: true, message:
"Request rejected: suspicious content detected" }` zurück. In den Modi
`warn`/`log` protokolliert die Guardrail, erlaubt aber den Aufruf. Der
gemeinsame Helfer `evaluatePromptInjection()` wird auch für Aufrufer exportiert,
die Prompts auswerten müssen, ohne das Registry zu durchlaufen.

**Scan-Grenze (v3.8.20):** Der Detektor prüft nur die **ersten 16 KB** des
zusammengeführten Prompt-Textes — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16
384 Bytes) in `src/shared/utils/inputSanitizer.ts`. Sowohl
`detectInjection()` als auch `evaluatePromptInjection()` verwenden `slice(0,
MAX_INJECTION_SCAN_BYTES)`, bevor die Musterschleife ausgeführt wird.
Injektionsdirektiven befinden sich nahe am Anfang einer Eingabe, wodurch die
Regex-CPU/GC bei mehreren hundert KB großen Payloads begrenzt wird, ohne die
Erkennung zu schwächen (vgl. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Läuft in **beiden** Phasen, zuletzt in der Standardkette (Priorität `95`).
Redigiert bekannte API-Schlüssel-/Geheimtoken-Muster aus der ausgehenden
Payload (Nachrichteninhalt, Tool-Aufruf-Argumente, Tool-Ergebnisse) **und** der
Anbieterantwort, sodass ein in einen Prompt eingefügtes (oder von einem
Tool-Ergebnis zurückgegebenes) Credential nicht an den Upstream-Anbieter oder
zurück an den Client weitergegeben wird.

- **Nur Opt-in**, gleiche Konvention wie bei der PII-Redaktion (angrenzend an
  Hard Rule #20): deaktiviert, es sei denn,
  `settings.credentialRedactionEnabled === true` **oder**
  `CREDENTIAL_REDACTION_ENABLED=true`. Wenn es ausgeschaltet ist, ist die
  Guardrail ein No-Op – sie blockiert nie und schreibt nie um.
- `redactCredentials()` durchläuft den vollständigen Payload-/Antwortbaum
  (`walkValue()`, prototyp-pollution-sicher, zyklussicher über `WeakSet`) und
  ersetzt Übereinstimmungen durch einen `[REDACTED:<type>]`-Platzhalter,
  wobei nur die tatsächlich geänderten Zweige geklont werden.
- `CREDENTIAL_PATTERNS` deckt LLM-Anbieter-Schlüssel (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS-/SaaS-Token (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), Zahlungsschlüssel (Stripe,
  Square), Cloud-Schlüssel (AWS-Zugriffsschlüssel, Twilio, SendGrid,
  Mailgun), private Schlüssel / JWTs, Credential-tragende
  Verbindungszeichenfolgen (`mongodb://user:pass@...`, etc.) und ein
  generisches `Authorization`/`x-api-key`/`api-key`/`apikey`-Header-Wert-Muster
  ab. Header-förmige Schlüssel (`authorization`, `x-api-key`, `api-key`,
  `apikey`) werden strukturell redigiert (nur der Wert, Schema-Präfix wie
  `Bearer `/`Basic ` bleibt erhalten) und nicht über den generischen
  Text-Regex.
- Die Guardrail blockiert nie; sie schreibt nur um (`modifiedPayload` /
  `modifiedResponse`) und annotiert (`meta.credentialsRedacted`,
  `meta.count`).

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
