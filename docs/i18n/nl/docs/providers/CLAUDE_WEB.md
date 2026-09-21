# Providers — Claude Web (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` verzendt chatverzoeken in OpenAI-indeling via een geauthenticeerde `claude.ai`-browsersessie. De executor normaliseert de opgegeven cookie, bepaalt één geauthenticeerde organisatie, bereidt de conversatiestatus voor, selecteert een direct transport of browsertransport en vertaalt de upstream-SSE-respons strikt. De orkestratie bevindt zich in `open-sse/executors/claude-web.ts:320`.

> **Nieuw met providers die webcookies gebruiken?**
>
> Lees **`docs/getting-started/WEB-COOKIE-GUIDE.md`** voor het algemene configuratieproces, richtlijnen voor authenticatie, beperkingen en probleemoplossing voordat u deze providerspecifieke handleiding volgt.

### Modelcatalogus

Het providerregister stelt momenteel exact deze zeven statische model-ID's beschikbaar (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Model-ID                    | Weergavenaam            |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynamische modeldetectie is voor deze provider niet geïmplementeerd. De bovenstaande lijst is de runtimecatalogus.

### Referenties en organisatiebepaling

Geef de volledige Cookie-header van `claude.ai` of alleen een sessiewaarde op. Losse waarden worden genormaliseerd naar `sessionKey`; andere cookies blijven behouden als ze zijn opgegeven. De executor accepteert de cookie via `cookie` of `apiKey` en leest optionele waarden voor `deviceId` en `orgId` uit de verbindingsgegevens (`open-sse/executors/claude-web.ts:72`).

Als `orgId` ontbreekt, roept de executor `GET https://claude.ai/api/organizations` aan en gebruikt deze de eerste organisatie die door de geauthenticeerde Claude Web-sessie wordt geretourneerd (`open-sse/executors/claude-web.ts:141`). De executor weigert de aanvraag wanneer geen geldige organisatie wordt geretourneerd, rapporteert geweigerde sessieautorisatie als 401 en maakt onderscheid tussen een Cloudflare-challenge en een authenticatiefout.

### Conversatiebewerkingen

Het optionele `claude_web`-object op het hoogste niveau is strikt. Onbekende velden worden geweigerd. De geaccepteerde velden zijn gedefinieerd in `open-sse/executors/claude-web/session.ts:50`:

| Veld                  | Betekenis                                                                    |
| --------------------- | ---------------------------------------------------------------------------- |
| `operation`           | Standaard `completion`; gebruik `retry` voor een nieuwe poging               |
| `conversation_id`     | Expliciete UUID voor een bestaande conversatie                               |
| `parent_message_uuid` | Expliciete UUID voor het bovenliggende assistentbericht                      |
| `timezone`            | Geldige IANA-tijdzonenaam                                                    |
| `locale`              | Structureel geldige landinstelling                                           |
| `tool_states`         | Optionele array met statussen van accounttools, beperkt tot 128 vermeldingen |

Voorbereide verzoeken gebruiken een van twee upstream-eindpunten (`open-sse/executors/claude-web.ts:203`):

- Een nieuwe of vervolgbeurt stuurt een POST-verzoek naar
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Een nieuwe poging stuurt een POST-verzoek naar
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Een nieuwe beurt bevat `create_conversation_params`. Een gecachte of expliciet gekoppelde vervolgbeurt bevat `parent_message_uuid` en laat `create_conversation_params` weg. Een nieuwe poging vereist zowel de conversatiestatus als de status van het bovenliggende bericht en verzendt geen prompt (`open-sse/executors/claude-web/session.ts:254`). Nieuwe conversaties openen de geauthenticeerde gebruikersinterface op `/new`; gecachte of expliciet gekoppelde vervolgbeurten openen de exacte conversatiepagina (`open-sse/executors/claude-web/session.ts:324`).

De conversatiestatus is een cache in het geheugen, geïndexeerd op basis van een SHA-256-accountbereik en het canonieke transcript van de aanroeper. Vermeldingen verlopen na 30 minuten en de cache is beperkt tot 5.000 vermeldingen (`open-sse/executors/claude-web/session.ts:12`). De status wordt pas vastgelegd nadat de strikte streamparser `message_stop` waarneemt; bij het opnieuw starten van het proces gaat deze verloren. Bij een cachemisser wordt een verzoek met meerdere berichten geserialiseerd tot één herstelprompt, in plaats van eerdere berichten stilzwijgend te verwijderen.

Voor landinstelling en tijdzone geldt deze prioriteitsvolgorde: de `claude_web`-waarde van het verzoek, de verbindingswaarde, de runtimewaarde en vervolgens `en-US` voor de landinstelling of `UTC` voor de tijdzone (`open-sse/executors/claude-web/session.ts:218`).

### Tools en verzoekpayloads

Directe verzoeken transformeren alleen structureel geldige OpenAI-functietools die door de aanroeper zijn opgegeven. Er is geen verzonnen statische lijst met standaardtools (`open-sse/executors/claude-web/payload.ts:102`).

Browseraanvragen leggen in plaats daarvan het geauthenticeerde UI-verzoek vast en behouden de accounttools, toolstatussen en gepersonaliseerde stijlen ervan. Voorbereide velden voor conversatie, model, redenering, prompt en bericht-UUID blijven voorrang houden op het vastgelegde verzoek (`open-sse/executors/claude-web/browserTransport.ts:175`). Browsersjablonen zijn beperkt tot een hash van account, organisatie, cookie, landinstelling en tijdzone en verlopen na 30 minuten (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Wanneer een direct verzoek geen tools van de aanroeper bevat, kan het die sjabloon met beperkt bereik hergebruiken; expliciet opgegeven tools van de aanroeper hebben voorrang (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transportselectie

Het standaardpad is `sendClaudeWebDirect()`, dat `tlsFetchClaude()` aanroept met het geconfigureerde Chrome 146-profiel en de opgegeven cookie (`open-sse/services/claudeTlsClient.ts:23`). Het start geen solver en maakt geen vervangende cookie aan.

Stel `WEB_COOKIE_USE_BROWSER` in op `1`, `true` of `on` om de accountgebonden browseradapter als primair transport te gebruiken. Stel `OMNIROUTE_BROWSER_POOL` in op een van dezelfde waarden om bij een herkende Cloudflare 403-challenge terug te vallen van direct transport op de browseradapter (`open-sse/executors/claude-web.ts:195`). Andere HTTP-fouten activeren deze terugval niet.

De browseradapter bewaart cookies binnen dezelfde gepoolde Playwright-context, gebruikt de hierboven beschreven gehashte sleutel met het juiste bereik en verzendt de voltooiing vanuit die context (`open-sse/executors/claude-web/browserTransport.ts:444`). De adapter exporteert een door de browser verkregen cookie nooit naar de directe TLS-client. Nieuwe pogingen via de browser vereisen een niet-verlopen UI-sjabloon dat aan dezelfde daadwerkelijke Playwright-context is gekoppeld (`open-sse/executors/claude-web/browserTransport.ts:467`). Browserresponsen worden incrementeel uitgelezen op de geauthenticeerde pagina, respecteren annulering van verzoeken en annuleren de upstream-body zodra deze groter is dan 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

De executor retourneert een geredigeerde auditprojectie aan de gedeelde verzoeklogger: UUID's van organisaties, gesprekken en berichten, prompttekst, tooldefinities, cookies en apparaat-ID's worden uitgesloten (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Transportuitzonderingen retourneren ook een generieke verbindingsfout in plaats van het gegenereerde bericht.

### SSE-gedrag

`createClaudeWebResponse()` verwerkt framing met LF of CRLF en meerregelige `data:`-velden. De functie wijst tekstdelta's toe aan `content`, redeneerdelta's aan `reasoning_content` en bekende metadata-events aan de response-extensie `claude_web`. Elk metadata-event wordt via een eigen lijst met toegestane velden geprojecteerd (`open-sse/executors/claude-web/stream.ts:37`). De metadata voor het gesprek, het bovenliggende bericht, het assistentbericht en de bewerking worden ook geretourneerd in `X-OmniRoute-Claude-Web-*`-headers (`open-sse/executors/claude-web/stream.ts:364`).

De parser stopt veilig bij onjuist gevormde JSON, upstream-`error`-events, onbekende eventtypen, een ongeldige volgorde, niet-overeenkomende inhoudsblokken of EOF vóór `message_stop`. Streaminguitvoer emitteert één afsluitingschunk en één `[DONE]`; gebufferde uitvoer gebruikt dezelfde parser. De parser behandelt `message_stop` onmiddellijk als terminaal, annuleert achterblijvende upstream-gegevens en geeft downstream-annulering door aan de upstream-reader (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Niet-afgesloten SSE-regels en geaccumuleerde events zijn beperkt tot 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Bestanden

| Bestand                                                  | Doel                           |
| -------------------------------------------------------- | ------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statisch providermodelregister |
| `open-sse/executors/claude-web.ts`                       | Executororkestratie            |
| `open-sse/executors/claude-web/payload.ts`               | Payload- en tooltransformatie  |
| `open-sse/executors/claude-web/session.ts`               | Beurtstatus en transcriptcache |
| `open-sse/executors/claude-web/transport.ts`             | Adapter voor direct transport  |
| `open-sse/executors/claude-web/browserTransport.ts`      | Accountgebonden browseradapter |
| `open-sse/executors/claude-web/stream.ts`                | Strikte SSE-vertaling          |
| `open-sse/services/claudeTlsClient.ts`                   | Systeemeigen TLS-transport     |
| `open-sse/services/browserPool.ts`                       | Gepoolde Playwright-contexten  |

### Testen

Voer de deterministische Claude Web-testsuite uit zonder echte inloggegevens:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

De van Playwright afhankelijke gevallen in `tests/unit/claude-web-auto-refresh.test.ts` worden expliciet overgeslagen. Deze repository definieert momenteel geen Claude Web-livetestscript met inloggegevens, dus die overgeslagen gevallen vormen geen bewijs van correcte werking tijdens runtime.

### Installatie

1. Start OmniRoute met `npm run dev` of vanuit een gebouwde installatie.
2. Open Dashboard → Providers → Add Provider.
3. Selecteer de categorie Web Cookie en Claude Web.
4. Plak de volledige Cookie-header die uit een geauthenticeerd `claude.ai`-verzoek is gekopieerd.
