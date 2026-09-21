# Providers — Claude Web (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` sender chatanmodninger i OpenAI-format gennem en godkendt `claude.ai`-browsersession. Eksekveringskomponenten normaliserer den angivne cookie, finder én godkendt organisation, forbereder samtaletilstanden, vælger en direkte transport eller browsertransport og oversætter strengt upstream-SSE-svaret. Orkestreringen findes i `open-sse/executors/claude-web.ts:320`.

> **Ny bruger af webcookie-udbydere?**
>
> Læs **`docs/getting-started/WEB-COOKIE-GUIDE.md`** for den generelle opsætningsproces, vejledning om godkendelse, begrænsninger og fejlfinding, før du følger denne udbyderspecifikke vejledning.

### Modelkatalog

Udbyderregistret eksponerer i øjeblikket præcis disse syv statiske model-id'er (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Model-id                    | Vist navn               |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynamisk modelregistrering er ikke implementeret for denne udbyder. Ovenstående liste er kørselstidskataloget.

### Legitimationsoplysninger og organisationsbestemmelse

Angiv enten den fulde Cookie-header fra `claude.ai` eller en ren sessionsværdi. Rene værdier normaliseres til `sessionKey`; andre cookies bevares, hvis de angives. Eksekveringskomponenten accepterer cookien via `cookie` eller `apiKey` og læser valgfrie værdier for `deviceId` og `orgId` fra forbindelsesdataene (`open-sse/executors/claude-web.ts:72`).

Hvis `orgId` mangler, kalder eksekveringskomponenten `GET https://claude.ai/api/organizations` og bruger den første organisation, der returneres af den godkendte Claude Web-session (`open-sse/executors/claude-web.ts:141`). Den afbryder sikkert, når der ikke returneres en gyldig organisation, rapporterer afvist sessionsgodkendelse som 401 og skelner mellem en Cloudflare-udfordring og en godkendelsesfejl.

### Samtalehandlinger

Det valgfrie `claude_web`-objekt på øverste niveau er strengt. Ukendte felter afvises. De accepterede felter er defineret i `open-sse/executors/claude-web/session.ts:50`:

| Felt                  | Betydning                                                          |
| --------------------- | ------------------------------------------------------------------ |
| `operation`           | `completion` som standard; brug `retry` til et nyt forsøg          |
| `conversation_id`     | Eksplicit UUID for en eksisterende samtale                         |
| `parent_message_uuid` | Eksplicit UUID for den overordnede assistentbesked                 |
| `timezone`            | Gyldigt IANA-tidszonenavn                                          |
| `locale`              | Strukturelt gyldig landestandard                                   |
| `tool_states`         | Valgfri matrix med værktøjstilstande for kontoen, maks. 128 poster |

Forberedte anmodninger bruger ét af to upstream-slutpunkter (`open-sse/executors/claude-web.ts:203`):

- En ny eller opfølgende tur sendes til
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Et nyt forsøg sendes til
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

En ny tur inkluderer `create_conversation_params`. En cachelagret eller eksplicit sammenkædet opfølgning inkluderer `parent_message_uuid` og udelader `create_conversation_params`. Et nyt forsøg kræver både samtale- og overordnet beskedtilstand og sender ingen prompt (`open-sse/executors/claude-web/session.ts:254`). Nye samtaler åbner den godkendte brugergrænseflade på `/new`; cachelagrede eller eksplicit sammenkædede opfølgninger åbner den nøjagtige samtaleside (`open-sse/executors/claude-web/session.ts:324`).

Samtaletilstanden er en cache i hukommelsen, som er nøgleindekseret efter et SHA-256-kontoområde og den kanoniske udskrift fra kalderen. Poster udløber efter 30 minutter, og cachen er begrænset til 5.000 poster (`open-sse/executors/claude-web/session.ts:12`). Tilstanden lagres først, efter at den strenge stream-parser har observeret `message_stop`; procesgenstarter kasserer den. Ved en cache-fejl serialiseres en anmodning med flere beskeder til én gendannelsesprompt i stedet for lydløst at udelade tidligere beskeder.

Landestandard og tidszone bruger denne prioritetsrækkefølge: anmodningens `claude_web`-værdi, forbindelsesværdi, kørselstidsværdi og derefter `en-US` for landestandard eller `UTC` for tidszone (`open-sse/executors/claude-web/session.ts:218`).

### Værktøjer og anmodningspayloads

Direkte anmodninger transformerer kun strukturelt gyldige OpenAI-funktionsværktøjer, som kalderen har angivet. Der oprettes ingen kunstig statisk standardliste over værktøjer (`open-sse/executors/claude-web/payload.ts:102`).

Browseranmodninger opfanger i stedet den godkendte anmodning fra brugergrænsefladen og bevarer dens kontoværktøjer, værktøjstilstande og personligt tilpassede stile. Forberedte felter for samtale, model, ræsonnement, prompt og besked-UUID tilsidesætter stadig den opfangede anmodning (`open-sse/executors/claude-web/browserTransport.ts:175`). Browserskabeloner afgrænses af en hash af konto, organisation, cookie, landestandard og tidszone og udløber efter 30 minutter (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Når en direkte anmodning ikke indeholder værktøjer fra kalderen, kan den genbruge den afgrænsede skabelon; eksplicitte værktøjer fra kalderen har forrang (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transportvalg

Standardstien er `sendClaudeWebDirect()`, som kalder `tlsFetchClaude()` med den konfigurerede Chrome 146-profil og den angivne cookie (`open-sse/services/claudeTlsClient.ts:23`). Den starter ikke en solver og fremstiller ikke en erstatningscookie.

Indstil `WEB_COOKIE_USE_BROWSER` til `1`, `true` eller `on` for at gøre den kontospecifikke browseradapter
til den primære transport. Indstil `OMNIROUTE_BROWSER_POOL` til en af de samme værdier for at
tillade, at en genkendt Cloudflare 403-udfordring falder tilbage fra direkte transport til
browseradapteren (`open-sse/executors/claude-web.ts:195`). Andre HTTP-fejl udløser ikke
dette fallback.

Browseradapteren opbevarer cookies i den samme poolede Playwright-kontekst, bruger den afgrænsede
hashnøgle, der er beskrevet ovenfor, og sender fuldførelsen fra denne kontekst
(`open-sse/executors/claude-web/browserTransport.ts:444`). Den eksporterer aldrig en cookie, som
browseren har løst, til den direkte TLS-klient. Browserforsøg kræver en UI-skabelon, der ikke er
udløbet, og som er bundet til den samme faktiske Playwright-kontekst
(`open-sse/executors/claude-web/browserTransport.ts:467`). Læsning af browsersvar kører trinvist
på den godkendte side, respekterer annullering af anmodningen og annullerer upstream-bodyen, så
snart den overstiger 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Eksekveringskomponenten returnerer en redigeret auditprojektion til den fælles anmodningslogger:
organisations-, samtale- og besked-UUID'er, prompttekst, værktøjsdefinitioner, cookies og
enhedsidentifikatorer er udeladt (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Transportundtagelser returnerer også en generisk
forbindelsesfejl i stedet for den kastede meddelelse.

### SSE-adfærd

`createClaudeWebResponse()` håndterer LF- eller CRLF-indramning og flerlinjede `data:`-felter.
Den knytter tekstdeltaer til `content`, ræsonneringsdeltaer til `reasoning_content` og kendte
metadatahændelser til svarudvidelsen `claude_web`. Hver metadatahændelse projiceres gennem sin
egen liste over tilladte felter (`open-sse/executors/claude-web/stream.ts:37`). Metadata for
samtale, overordnet besked, assistentbesked og handling returneres også i
`X-OmniRoute-Claude-Web-*`-headere (`open-sse/executors/claude-web/stream.ts:364`).

Parseren afviser ved ugyldig JSON, upstream-`error`-hændelser, ukendte hændelsestyper, ugyldig
rækkefølge, uoverensstemmelser mellem indholdsblokke eller EOF før `message_stop`. Streamingoutput
udsender én afslutningsblok og én `[DONE]`; bufferet output bruger den samme parser. Parseren
behandler straks `message_stop` som terminal, annullerer efterfølgende upstream-data og videresender
downstream-annullering til upstream-læseren (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Uafsluttede SSE-linjer og akkumulerede hændelser
er begrænset til 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Filer

| Fil                                                      | Formål                                 |
| -------------------------------------------------------- | -------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statisk modelregister for udbyder      |
| `open-sse/executors/claude-web.ts`                       | Orkestrering af eksekvering            |
| `open-sse/executors/claude-web/payload.ts`               | Transformation af payload og værktøjer |
| `open-sse/executors/claude-web/session.ts`               | Tilstand for tur og transkriptcache    |
| `open-sse/executors/claude-web/transport.ts`             | Adapter til direkte transport          |
| `open-sse/executors/claude-web/browserTransport.ts`      | Kontospecifik browseradapter           |
| `open-sse/executors/claude-web/stream.ts`                | Streng SSE-oversættelse                |
| `open-sse/services/claudeTlsClient.ts`                   | Integreret TLS-transport               |
| `open-sse/services/browserPool.ts`                       | Poolede Playwright-kontekster          |

### Test

Kør den deterministiske Claude Web-testsuite uden rigtige legitimationsoplysninger:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

De Playwright-afhængige testtilfælde i `tests/unit/claude-web-auto-refresh.test.ts` springes
eksplicit over. Dette repository definerer i øjeblikket ikke et Claude Web-livetestscript med
legitimationsoplysninger, så de oversprungne testtilfælde er ikke bevis for funktion ved kørsel.

### Opsætning

1. Start OmniRoute med `npm run dev` eller en bygget installation.
2. Åbn Dashboard → Providers → Add Provider.
3. Vælg kategorien Web Cookie og Claude Web.
4. Indsæt hele Cookie-headeren, der er kopieret fra en godkendt `claude.ai`-anmodning.
