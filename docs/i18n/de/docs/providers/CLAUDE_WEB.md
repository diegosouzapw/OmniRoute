# Providers — Claude Web (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` sendet Chat-Anfragen im OpenAI-Format über eine authentifizierte `claude.ai`-Browsersitzung. Der Executor normalisiert das bereitgestellte Cookie, ermittelt eine authentifizierte Organisation, bereitet den Konversationsstatus vor, wählt einen direkten oder browserbasierten Transport aus und übersetzt die vorgelagerte SSE-Antwort strikt. Die Orchestrierung befindet sich in `open-sse/executors/claude-web.ts:320`.

> **Neu bei Web-Cookie-Anbietern?**
>
> Lesen Sie **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, um sich über den allgemeinen Einrichtungsprozess, Authentifizierungshinweise, Einschränkungen und Fehlerbehebung zu informieren, bevor Sie dieser anbieterspezifischen Anleitung folgen.

### Modellkatalog

Die Anbieter-Registry stellt derzeit genau diese sieben statischen Modell-IDs bereit (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Modell-ID                   | Anzeigename             |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (Web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (Web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (Web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (Web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (Web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (Web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (Web) |

Die dynamische Modellerkennung ist für diesen Anbieter nicht implementiert. Die obige Liste ist der Laufzeitkatalog.

### Anmeldedaten und Organisationsermittlung

Geben Sie entweder den vollständigen `claude.ai`-Cookie-Header oder einen reinen Sitzungswert an. Reine Werte werden zu `sessionKey` normalisiert; andere Cookies bleiben erhalten, sofern sie angegeben wurden. Der Executor akzeptiert das Cookie über `cookie` oder `apiKey` und liest optionale `deviceId`- und `orgId`-Werte aus den Verbindungsdaten (`open-sse/executors/claude-web.ts:72`).

Wenn `orgId` fehlt, ruft der Executor `GET https://claude.ai/api/organizations` auf und verwendet die erste Organisation, die von der authentifizierten Claude-Web-Sitzung zurückgegeben wird (`open-sse/executors/claude-web.ts:141`). Wenn keine gültige Organisation zurückgegeben wird, schlägt der Vorgang sicher fehl. Eine abgelehnte Sitzungsautorisierung wird als 401 gemeldet, und eine Cloudflare-Challenge wird von einem Authentifizierungsfehler unterschieden.

### Konversationsvorgänge

Das optionale `claude_web`-Objekt auf oberster Ebene ist strikt definiert. Unbekannte Felder werden abgelehnt. Die akzeptierten Felder sind in `open-sse/executors/claude-web/session.ts:50` definiert:

| Feld                  | Bedeutung                                                                       |
| --------------------- | ------------------------------------------------------------------------------- |
| `operation`           | Standardmäßig `completion`; für einen Wiederholungsdurchlauf `retry` verwenden  |
| `conversation_id`     | Explizite UUID einer bestehenden Konversation                                   |
| `parent_message_uuid` | Explizite UUID der übergeordneten Assistentennachricht                          |
| `timezone`            | Gültiger IANA-Zeitzonenname                                                     |
| `locale`              | Strukturell gültige Gebietsschemaangabe                                         |
| `tool_states`         | Optionales Array mit Werkzeugstatuswerten des Kontos, begrenzt auf 128 Einträge |

Vorbereitete Anfragen verwenden einen von zwei vorgelagerten Endpunkten (`open-sse/executors/claude-web.ts:203`):

- Ein neuer oder nachfolgender Durchlauf sendet eine Anfrage an
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Eine Wiederholung sendet eine Anfrage an
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Ein neuer Durchlauf enthält `create_conversation_params`. Ein zwischengespeicherter oder explizit verknüpfter Folgedurchlauf enthält `parent_message_uuid` und lässt `create_conversation_params` weg. Eine Wiederholung erfordert sowohl den Konversations- als auch den Status der übergeordneten Nachricht und sendet keinen Prompt (`open-sse/executors/claude-web/session.ts:254`). Neue Konversationen öffnen die authentifizierte Benutzeroberfläche unter `/new`; zwischengespeicherte oder explizit verknüpfte Folgedurchläufe öffnen die genaue Konversationsseite (`open-sse/executors/claude-web/session.ts:324`).

Der Konversationsstatus ist ein In-Memory-Cache, der durch einen SHA-256-Kontobereich und das kanonische Transkript des Aufrufers indiziert wird. Einträge laufen nach 30 Minuten ab, und der Cache ist auf 5.000 Einträge begrenzt (`open-sse/executors/claude-web/session.ts:12`). Der Status wird erst festgeschrieben, nachdem der strikte Stream-Parser `message_stop` erkannt hat; bei Prozessneustarts wird er verworfen. Bei einem Cache-Fehltreffer wird eine Anfrage mit mehreren Nachrichten zu einem einzigen Wiederherstellungs-Prompt serialisiert, anstatt frühere Nachrichten stillschweigend zu verwerfen.

Für Gebietsschema und Zeitzone gilt folgende Prioritätsreihenfolge: `claude_web`-Wert der Anfrage, Verbindungswert, Laufzeitwert, anschließend `en-US` für das Gebietsschema beziehungsweise `UTC` für die Zeitzone (`open-sse/executors/claude-web/session.ts:218`).

### Werkzeuge und Anfrage-Payloads

Direkte Anfragen transformieren nur strukturell gültige OpenAI-Funktionswerkzeuge, die vom Aufrufer bereitgestellt werden. Es gibt keine künstlich erzeugte statische Standardwerkzeugliste (`open-sse/executors/claude-web/payload.ts:102`).

Browseranfragen erfassen stattdessen die Anfrage der authentifizierten Benutzeroberfläche und behalten deren Kontowerkzeuge, Werkzeugstatuswerte und personalisierte Stile bei. Vorbereitete Felder für Konversation, Modell, Schlussfolgerung, Prompt und Nachrichten-UUID überschreiben weiterhin die erfasste Anfrage (`open-sse/executors/claude-web/browserTransport.ts:175`). Browservorlagen werden auf Basis eines Hashes aus Konto, Organisation, Cookie, Gebietsschema und Zeitzone abgegrenzt und laufen nach 30 Minuten ab (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Wenn eine direkte Anfrage keine Werkzeuge des Aufrufers enthält, kann sie diese abgegrenzte Vorlage wiederverwenden; explizite Werkzeuge des Aufrufers haben Vorrang (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transportauswahl

Der Standardpfad ist `sendClaudeWebDirect()`, das `tlsFetchClaude()` mit dem konfigurierten Chrome-146-Profil und dem bereitgestellten Cookie aufruft (`open-sse/services/claudeTlsClient.ts:23`). Es startet keinen Solver und erzeugt kein Ersatz-Cookie.

Setzen Sie `WEB_COOKIE_USE_BROWSER` auf `1`, `true` oder `on`, um den kontobezogenen Browseradapter zum primären Transport zu machen. Setzen Sie `OMNIROUTE_BROWSER_POOL` auf einen der gleichen Werte, damit bei einer erkannten Cloudflare-403-Challenge vom direkten Transport auf den Browseradapter zurückgegriffen werden kann (`open-sse/executors/claude-web.ts:195`). Andere HTTP-Fehler lösen diesen Rückgriff nicht aus.

Der Browseradapter speichert Cookies innerhalb desselben gepoolten Playwright-Kontexts, verwendet den oben beschriebenen bereichsspezifischen Hash-Schlüssel und sendet die Vervollständigung aus diesem Kontext (`open-sse/executors/claude-web/browserTransport.ts:444`). Er exportiert niemals ein vom Browser erhaltenes Cookie in den direkten TLS-Client. Browser-Wiederholungsversuche erfordern eine nicht abgelaufene UI-Vorlage, die an denselben tatsächlichen Playwright-Kontext gebunden ist (`open-sse/executors/claude-web/browserTransport.ts:467`). Browserantworten werden inkrementell auf der authentifizierten Seite gelesen, berücksichtigen den Abbruch von Anfragen und brechen den vorgelagerten Antworttext ab, sobald er 16 MiB überschreitet (`open-sse/executors/claude-web/browserTransport.ts:259`).

Der Executor übergibt eine bereinigte Audit-Projektion an den gemeinsamen Anfrage-Logger: Organisations-, Konversations- und Nachrichten-UUIDs, Prompt-Text, Werkzeugdefinitionen, Cookies und Gerätekennungen werden ausgeschlossen (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Bei Transportausnahmen wird außerdem ein allgemeiner Verbindungsfehler statt der ausgelösten Fehlermeldung zurückgegeben.

### SSE-Verhalten

`createClaudeWebResponse()` verarbeitet die Zeilenrahmung mit LF oder CRLF sowie mehrzeilige `data:`-Felder. Die Funktion ordnet Text-Deltas `content`, Denk-Deltas `reasoning_content` und bekannte Metadatenereignisse der Antworterweiterung `claude_web` zu. Jedes Metadatenereignis wird anhand seiner eigenen Feld-Positivliste projiziert (`open-sse/executors/claude-web/stream.ts:37`). Die Metadaten zu Konversation, übergeordneter Nachricht, Assistentennachricht und Operation werden außerdem in `X-OmniRoute-Claude-Web-*`-Headern zurückgegeben (`open-sse/executors/claude-web/stream.ts:364`).

Der Parser bricht bei fehlerhaftem JSON, vorgelagerten `error`-Ereignissen, unbekannten Ereignistypen, ungültiger Reihenfolge, nicht übereinstimmenden Inhaltsblöcken oder EOF vor `message_stop` sicher mit einem Fehler ab. Die Streaming-Ausgabe gibt einen Abschluss-Chunk und einmal `[DONE]` aus; die gepufferte Ausgabe verwendet denselben Parser. Der Parser behandelt `message_stop` sofort als terminal, bricht nachfolgende vorgelagerte Daten ab und leitet nachgelagerte Abbrüche an den vorgelagerten Reader weiter (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Nicht abgeschlossene SSE-Zeilen und angesammelte Ereignisse sind auf 1 MiB begrenzt (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Dateien

| Datei                                                    | Zweck                                       |
| -------------------------------------------------------- | ------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statische Modellregistrierung des Anbieters |
| `open-sse/executors/claude-web.ts`                       | Executor-Orchestrierung                     |
| `open-sse/executors/claude-web/payload.ts`               | Nutzdaten- und Werkzeugtransformation       |
| `open-sse/executors/claude-web/session.ts`               | Zugstatus und Transkript-Cache              |
| `open-sse/executors/claude-web/transport.ts`             | Adapter für direkten Transport              |
| `open-sse/executors/claude-web/browserTransport.ts`      | Kontobezogener Browseradapter               |
| `open-sse/executors/claude-web/stream.ts`                | Strikte SSE-Übersetzung                     |
| `open-sse/services/claudeTlsClient.ts`                   | Nativer TLS-Transport                       |
| `open-sse/services/browserPool.ts`                       | Gepoolte Playwright-Kontexte                |

### Tests

Führen Sie die deterministische Claude-Web-Testsuite ohne echte Anmeldedaten aus:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Die von Playwright abhängigen Fälle in `tests/unit/claude-web-auto-refresh.test.ts` werden ausdrücklich übersprungen. Dieses Repository definiert derzeit kein Claude-Web-Livetest-Skript mit Anmeldedaten, daher stellen diese übersprungenen Fälle keinen Laufzeitnachweis dar.

### Einrichtung

1. Starten Sie OmniRoute mit `npm run dev` oder über eine erstellte Installation.
2. Öffnen Sie Dashboard → Anbieter → Anbieter hinzufügen.
3. Wählen Sie die Kategorie Web-Cookie und Claude Web aus.
4. Fügen Sie den vollständigen Cookie-Header ein, der aus einer authentifizierten `claude.ai`-Anfrage kopiert wurde.
