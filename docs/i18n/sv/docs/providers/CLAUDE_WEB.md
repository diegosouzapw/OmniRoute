# Providers — Claude Web (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` skickar chattförfrågningar i OpenAI-format via en autentiserad webbläsarsession på `claude.ai`. Exekveraren normaliserar den angivna cookien, identifierar en autentiserad organisation, förbereder konversationstillståndet, väljer en direkt- eller webbläsartransport och översätter strikt SSE-svaret från uppströmskällan. Orkestreringen finns i `open-sse/executors/claude-web.ts:320`.

> **Ny på leverantörer med webbcookies?**
>
> Läs **`docs/getting-started/WEB-COOKIE-GUIDE.md`** för den allmänna konfigurationsprocessen, vägledning om autentisering, begränsningar och felsökning innan du följer den här leverantörsspecifika guiden.

### Modellkatalog

Leverantörsregistret exponerar för närvarande exakt dessa sju statiska modell-ID:n (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Modell-ID                   | Visningsnamn             |
| --------------------------- | ------------------------ |
| `claude-fable-5`            | Claude Fable 5 (webb)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (webb)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (webb)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (webb)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (webb)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (webb)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (webb) |

Dynamisk modellidentifiering är inte implementerad för den här leverantören. Listan ovan är katalogen vid körning.

### Autentiseringsuppgifter och identifiering av organisation

Ange antingen den fullständiga Cookie-headern för `claude.ai` eller ett fristående sessionsvärde. Fristående värden normaliseras till `sessionKey`; andra cookies bevaras om de anges. Exekveraren tar emot cookien via `cookie` eller `apiKey` och läser valfria `deviceId`- och `orgId`-värden från anslutningsdata (`open-sse/executors/claude-web.ts:72`).

Om `orgId` saknas anropar exekveraren `GET https://claude.ai/api/organizations` och använder den första organisationen som returneras av den autentiserade Claude Web-sessionen (`open-sse/executors/claude-web.ts:141`). Den avbryter säkert när ingen giltig organisation returneras, rapporterar nekad sessionsauktorisering som 401 och skiljer en Cloudflare-utmaning från ett autentiseringsfel.

### Konversationsåtgärder

Det valfria `claude_web`-objektet på toppnivå är strikt. Okända fält avvisas. Dess godkända fält definieras i `open-sse/executors/claude-web/session.ts:50`:

| Fält                  | Betydelse                                                              |
| --------------------- | ---------------------------------------------------------------------- |
| `operation`           | `completion` som standard; använd `retry` för ett nytt försök          |
| `conversation_id`     | Explicit UUID för en befintlig konversation                            |
| `parent_message_uuid` | Explicit UUID för det överordnade assistentmeddelandet                 |
| `timezone`            | Giltigt IANA-namn på tidszon                                           |
| `locale`              | Strukturellt giltig språk- och regionkod                               |
| `tool_states`         | Valfri lista över kontots verktygstillstånd, begränsad till 128 poster |

Förberedda förfrågningar använder en av två uppströmsendpoints (`open-sse/executors/claude-web.ts:203`):

- En ny eller uppföljande tur skickas till
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Ett nytt försök skickas till
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

En ny tur inkluderar `create_conversation_params`. En cachelagrad eller explicit länkad uppföljning inkluderar `parent_message_uuid` och utelämnar `create_conversation_params`. Ett nytt försök kräver både konversations- och överordnat meddelandetillstånd och skickar ingen prompt (`open-sse/executors/claude-web/session.ts:254`). Nya konversationer öppnar det autentiserade användargränssnittet på `/new`; cachelagrade eller explicit länkade uppföljningar öppnar den exakta konversationssidan (`open-sse/executors/claude-web/session.ts:324`).

Konversationstillståndet är en minnesbaserad cache vars nyckel består av ett SHA-256-kontoomfång och anroparens kanoniska transkript. Poster upphör att gälla efter 30 minuter och cachen är begränsad till 5 000 poster (`open-sse/executors/claude-web/session.ts:12`). Tillståndet sparas först efter att den strikta strömtolken observerar `message_stop`; omstarter av processen kasserar det. Vid en cachemiss serialiseras en förfrågan med flera meddelanden till en enda återställningsprompt i stället för att tidigare meddelanden utelämnas utan varning.

Språk- och regionkod samt tidszon använder följande prioritetsordning: värdet i förfrågans `claude_web`, anslutningsvärdet, körningsvärdet och därefter `en-US` för språk- och regionkod eller `UTC` för tidszon (`open-sse/executors/claude-web/session.ts:218`).

### Verktyg och förfrågningsnyttolaster

Direkta förfrågningar transformerar endast strukturellt giltiga OpenAI-funktionsverktyg som tillhandahålls av anroparen. Ingen konstruerad statisk standardlista över verktyg används (`open-sse/executors/claude-web/payload.ts:102`).

Webbläsarförfrågningar fångar i stället upp förfrågan från det autentiserade användargränssnittet och behåller dess kontoverktyg, verktygstillstånd och anpassade stilar. Förberedda fält för konversation, modell, resonemang, prompt och meddelande-UUID åsidosätter fortfarande den fångade förfrågan (`open-sse/executors/claude-web/browserTransport.ts:175`). Webbläsarmallar avgränsas med en hash av konto, organisation, cookie, språk- och regionkod samt tidszon och upphör att gälla efter 30 minuter (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). När en direkt förfrågan inte innehåller några verktyg från anroparen kan den återanvända den avgränsade mallen; explicita verktyg från anroparen har företräde (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Val av transport

Standardsökvägen är `sendClaudeWebDirect()`, som anropar `tlsFetchClaude()` med den konfigurerade Chrome 146-profilen och den angivna cookien (`open-sse/services/claudeTlsClient.ts:23`). Den startar inte någon lösare och skapar inte någon ersättningscookie.

Ställ in `WEB_COOKIE_USE_BROWSER` på `1`, `true` eller `on` för att göra den kontoomfattande
webbläsaradaptern till primär transport. Ställ in `OMNIROUTE_BROWSER_POOL` på något av samma värden för att
tillåta att en identifierad Cloudflare 403-utmaning växlar från direkttransport till
webbläsaradaptern (`open-sse/executors/claude-web.ts:195`). Andra HTTP-fel utlöser inte
denna reservlösning.

Webbläsaradaptern behåller cookies i samma poolade Playwright-kontext, använder den omfångsbegränsade
hashade nyckeln som beskrivs ovan och skickar slutförandet från den kontexten
(`open-sse/executors/claude-web/browserTransport.ts:444`). Den exporterar aldrig en cookie som lösts av
webbläsaren till den direkta TLS-klienten. Webbläsarens återförsök kräver en UI-mall som inte har löpt ut och som är bunden till
samma faktiska Playwright-kontext (`open-sse/executors/claude-web/browserTransport.ts:467`).
Läsning av webbläsarsvar sker inkrementellt på den autentiserade sidan, respekterar avbrytning av begäran
och avbryter uppströmsinnehållet så snart det överstiger 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Exekveraren returnerar en maskerad granskningsprojektion till den delade begärandeloggen: organisationens,
konversationens och meddelandenas UUID:n, prompttext, verktygsdefinitioner, cookies och enhetsidentifierare
utelämnas (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Transportundantag returnerar också ett generiskt anslutningsfel
i stället för det kastade meddelandet.

### SSE-beteende

`createClaudeWebResponse()` hanterar inramning med LF eller CRLF samt flerradiga `data:`-fält. Den mappar
textdeltan till `content`, tankedeltan till `reasoning_content` och kända metadatahändelser
till svarstillägget `claude_web`. Varje metadatahändelse projiceras genom sin egen lista över tillåtna fält
(`open-sse/executors/claude-web/stream.ts:37`). Metadata för
konversation, överordnat meddelande, assistentmeddelande och åtgärd returneras också i
`X-OmniRoute-Claude-Web-*`-huvuden (`open-sse/executors/claude-web/stream.ts:364`).

Parsern avbryter säkert vid felaktig JSON, uppströms `error`-händelser, okända händelsetyper,
ogiltig ordningsföljd, avvikande innehållsblock eller EOF före `message_stop`. Strömmad utdata
skickar ett avslutningssegment och ett `[DONE]`; buffrad utdata använder samma parser. Parsern behandlar
`message_stop` som terminalt omedelbart, avbryter efterföljande uppströmsdata och vidarebefordrar
nedströms avbrytning till uppströmsläsaren (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Oavslutade SSE-rader och ackumulerade händelser
begränsas till 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Filer

| Fil                                                      | Syfte                                    |
| -------------------------------------------------------- | ---------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statiskt modellregister för leverantören |
| `open-sse/executors/claude-web.ts`                       | Orkestrering av exekveraren              |
| `open-sse/executors/claude-web/payload.ts`               | Transformering av nyttolast och verktyg  |
| `open-sse/executors/claude-web/session.ts`               | Turstatus och transkriptcache            |
| `open-sse/executors/claude-web/transport.ts`             | Adapter för direkttransport              |
| `open-sse/executors/claude-web/browserTransport.ts`      | Kontoomfattande webbläsaradapter         |
| `open-sse/executors/claude-web/stream.ts`                | Strikt SSE-översättning                  |
| `open-sse/services/claudeTlsClient.ts`                   | Inbyggd TLS-transport                    |
| `open-sse/services/browserPool.ts`                       | Poolade Playwright-kontexter             |

### Testning

Kör den deterministiska Claude Web-sviten utan riktiga autentiseringsuppgifter:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

De Playwright-beroende fallen i `tests/unit/claude-web-auto-refresh.test.ts` hoppas uttryckligen
över. Det här kodarkivet definierar för närvarande inget autentiserat livetestskript för Claude Web,
så dessa överhoppade fall utgör inget bevis på körning.

### Konfiguration

1. Starta OmniRoute med `npm run dev` eller en byggd installation.
2. Öppna Instrumentpanel → Leverantörer → Lägg till leverantör.
3. Välj kategorin Web Cookie och Claude Web.
4. Klistra in hela Cookie-huvudet som kopierats från en autentiserad `claude.ai`-begäran.
