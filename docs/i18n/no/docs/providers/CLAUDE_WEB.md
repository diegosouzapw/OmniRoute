# Providers — Claude Web (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` sender chatforespørsler i OpenAI-format gjennom en autentisert `claude.ai`-nettleserøkt. Eksekvereren normaliserer den oppgitte informasjonskapselen, finner én autentisert organisasjon, klargjør samtaletilstanden, velger direkte- eller nettlesertransport og oversetter oppstrøms-SSE-responsen strengt. Orkestreringen finnes i `open-sse/executors/claude-web.ts:320`.

> **Ny med leverandører som bruker nettinformasjonskapsler?**
>
> Les **`docs/getting-started/WEB-COOKIE-GUIDE.md`** om den generelle oppsettsprosessen, autentiseringsveiledning, begrensninger og feilsøking før du følger denne leverandørspesifikke veiledningen.

### Modellkatalog

Leverandørregisteret eksponerer for øyeblikket nøyaktig disse sju statiske modell-ID-ene (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Modell-ID                   | Visningsnavn             |
| --------------------------- | ------------------------ |
| `claude-fable-5`            | Claude Fable 5 (nett)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (nett)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (nett)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (nett)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (nett)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (nett)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (nett) |

Dynamisk modelloppdagelse er ikke implementert for denne leverandøren. Listen ovenfor er kjøretidskatalogen.

### Påloggingsopplysninger og organisasjonsoppslag

Oppgi enten hele Cookie-headeren for `claude.ai` eller en ren øktverdi. Rene verdier normaliseres til `sessionKey`; andre informasjonskapsler beholdes hvis de oppgis. Eksekvereren godtar informasjonskapselen via `cookie` eller `apiKey` og leser valgfrie `deviceId`- og `orgId`-verdier fra tilkoblingsdataene (`open-sse/executors/claude-web.ts:72`).

Hvis `orgId` mangler, kaller eksekvereren `GET https://claude.ai/api/organizations` og bruker den første organisasjonen som returneres av den autentiserte Claude Web-økten (`open-sse/executors/claude-web.ts:141`). Den avviser forespørselen når ingen gyldig organisasjon returneres, rapporterer avvist øktautorisasjon som 401 og skiller en Cloudflare-utfordring fra en autentiseringsfeil.

### Samtaleoperasjoner

Det valgfrie `claude_web`-objektet på toppnivå er strengt. Ukjente felt avvises. De godkjente feltene er definert i `open-sse/executors/claude-web/session.ts:50`:

| Felt                  | Betydning                                                               |
| --------------------- | ----------------------------------------------------------------------- |
| `operation`           | `completion` som standard; bruk `retry` for et nytt forsøk              |
| `conversation_id`     | Eksplisitt UUID for en eksisterende samtale                             |
| `parent_message_uuid` | Eksplisitt UUID for den overordnede assistentmeldingen                  |
| `timezone`            | Gyldig IANA-tidssonenavn                                                |
| `locale`              | Strukturelt gyldig lokalitet                                            |
| `tool_states`         | Valgfri matrise med verktøytilstander for kontoen, maks 128 oppføringer |

Klargjorte forespørsler bruker ett av to oppstrømsendepunkter (`open-sse/executors/claude-web.ts:203`):

- En ny eller oppfølgende tur sendes til
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Et nytt forsøk sendes til
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

En ny tur inkluderer `create_conversation_params`. En bufret eller eksplisitt koblet oppfølging inkluderer `parent_message_uuid` og utelater `create_conversation_params`. Et nytt forsøk krever både samtale- og overordnet meldingstilstand og sender ingen ledetekst (`open-sse/executors/claude-web/session.ts:254`). Nye samtaler åpner det autentiserte brukergrensesnittet på `/new`; bufrede eller eksplisitt koblede oppfølginger åpner den nøyaktige samtalesiden (`open-sse/executors/claude-web/session.ts:324`).

Samtaletilstanden er en minnebasert hurtigbuffer med nøkler basert på et SHA-256-kontoomfang og den kanoniske anropertranskripsjonen. Oppføringer utløper etter 30 minutter, og hurtigbufferen er begrenset til 5 000 oppføringer (`open-sse/executors/claude-web/session.ts:12`). Tilstanden lagres først etter at den strenge strømtolkeren observerer `message_stop`; prosessomstarter forkaster den. Ved et hurtigbuffermiss serialiseres en forespørsel med flere meldinger til én gjenopprettingsledetekst i stedet for å forkaste tidligere meldinger uten varsel.

Lokalitet og tidssone bruker denne prioritetsrekkefølgen: `claude_web`-verdi i forespørselen, tilkoblingsverdi, kjøretidsverdi og deretter `en-US` for lokalitet eller `UTC` for tidssone (`open-sse/executors/claude-web/session.ts:218`).

### Verktøy og forespørselsnyttelaster

Direkteforespørsler transformerer bare strukturelt gyldige OpenAI-funksjonsverktøy som oppgis av anroperen. Det finnes ingen konstruert statisk standardliste over verktøy (`open-sse/executors/claude-web/payload.ts:102`).

Nettleserforespørsler fanger i stedet opp forespørselen fra det autentiserte brukergrensesnittet og beholder kontoverktøyene, verktøytilstandene og de personlig tilpassede stilene. Klargjorte felt for samtale, modell, resonnering, ledetekst og meldings-UUID overstyrer fortsatt den oppfangede forespørselen (`open-sse/executors/claude-web/browserTransport.ts:175`). Nettlesermaler avgrenses av en hash av konto, organisasjon, informasjonskapsel, lokalitet og tidssone og utløper etter 30 minutter (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Når en direkteforespørsel ikke har noen verktøy fra anroperen, kan den gjenbruke denne avgrensede malen; eksplisitte verktøy fra anroperen har forrang (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transportvalg

Standardbanen er `sendClaudeWebDirect()`, som kaller `tlsFetchClaude()` med den konfigurerte Chrome 146-profilen og den oppgitte informasjonskapselen (`open-sse/services/claudeTlsClient.ts:23`). Den starter ikke en løser og oppretter heller ikke en erstatningsinformasjonskapsel.

Sett `WEB_COOKIE_USE_BROWSER` til `1`, `true` eller `on` for å gjøre det kontospesifikke
nettleseradapteret til primær transport. Sett `OMNIROUTE_BROWSER_POOL` til en av de samme verdiene
for å tillate at en gjenkjent Cloudflare 403-utfordring går tilbake fra direkte transport til
nettleseradapteret (`open-sse/executors/claude-web.ts:195`). Andre HTTP-feil utløser ikke
denne reservemekanismen.

Nettleseradapteret beholder informasjonskapsler i den samme delte Playwright-konteksten, bruker den
omfangsbegrensede hashede nøkkelen som er beskrevet ovenfor, og sender fullføringen fra denne konteksten
(`open-sse/executors/claude-web/browserTransport.ts:444`). Det eksporterer aldri en informasjonskapsel
som er løst av nettleseren, til den direkte TLS-klienten. Nye nettleserforsøk krever en UI-mal som ikke
er utløpt, og som er bundet til den samme faktiske Playwright-konteksten
(`open-sse/executors/claude-web/browserTransport.ts:467`). Nettleserens responsavlesninger kjøres
inkrementelt på den autentiserte siden, respekterer kansellering av forespørsler og kansellerer
oppstrømsinnholdet så snart det overstiger 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Eksekutøren returnerer en sladdet revisjonsprojeksjon til den delte forespørselsloggeren: organisasjons-,
samtale- og meldings-UUID-er, ledetekst, verktøydefinisjoner, informasjonskapsler og enhetsidentifikatorer
er utelatt (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Transportunntak returnerer også en generisk tilkoblingsfeil
i stedet for den utløste meldingen.

### SSE-atferd

`createClaudeWebResponse()` håndterer LF- eller CRLF-innramming og flerlinjede `data:`-felt. Den tilordner
tekstdeltaer til `content`, tankedeltaer til `reasoning_content` og kjente metadatahendelser
til responsutvidelsen `claude_web`. Hver metadatahendelse projiseres gjennom sin egen tillatelsesliste
for felt (`open-sse/executors/claude-web/stream.ts:37`). Metadataene for
samtale, overordnet melding, assistentmelding og operasjon returneres også i
`X-OmniRoute-Claude-Web-*`-hoder (`open-sse/executors/claude-web/stream.ts:364`).

Parseren stopper sikkert ved ugyldig JSON, oppstrøms `error`-hendelser, ukjente hendelsestyper,
ugyldig rekkefølge, manglende samsvar i innholdsblokker eller EOF før `message_stop`. Strømmet utdata
sender én avslutningsblokk og én `[DONE]`; bufret utdata bruker den samme parseren. Parseren behandler
`message_stop` som terminal umiddelbart, kansellerer etterfølgende oppstrømsdata og viderefører
nedstrømskansellering til oppstrømsleseren (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Uavsluttede SSE-linjer og akkumulerte hendelser
er begrenset til 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Filer

| Fil                                                      | Formål                                   |
| -------------------------------------------------------- | ---------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statisk register over leverandørmodeller |
| `open-sse/executors/claude-web.ts`                       | Orkestrering av eksekutør                |
| `open-sse/executors/claude-web/payload.ts`               | Transformasjon av nyttelast og verktøy   |
| `open-sse/executors/claude-web/session.ts`               | Turtilstand og transkripsjonsbuffer      |
| `open-sse/executors/claude-web/transport.ts`             | Adapter for direkte transport            |
| `open-sse/executors/claude-web/browserTransport.ts`      | Kontospesifikt nettleseradapter          |
| `open-sse/executors/claude-web/stream.ts`                | Streng SSE-oversettelse                  |
| `open-sse/services/claudeTlsClient.ts`                   | Innebygd TLS-transport                   |
| `open-sse/services/browserPool.ts`                       | Delte Playwright-kontekster              |

### Testing

Kjør den deterministiske Claude Web-testpakken uten ekte påloggingsopplysninger:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

De Playwright-avhengige tilfellene i `tests/unit/claude-web-auto-refresh.test.ts` hoppes eksplisitt
over. Dette repositoriet definerer for øyeblikket ikke et Claude Web-sanntidstestskript med
påloggingsopplysninger, så disse tilfellene som hoppes over, er ikke et bevis på kjøretidsatferd.

### Oppsett

1. Start OmniRoute med `npm run dev` eller en ferdigbygd installasjon.
2. Åpne Kontrollpanel → Leverandører → Legg til leverandør.
3. Velg kategorien Web Cookie og Claude Web.
4. Lim inn hele Cookie-hodet som er kopiert fra en autentisert `claude.ai`-forespørsel.
