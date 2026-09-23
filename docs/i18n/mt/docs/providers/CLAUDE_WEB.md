# Providers — Claude Web (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` jibgħat talbiet taċ-chat fil-format OpenAI permezz ta’ sessjoni awtentikata tal-browser ta’ `claude.ai`. L-eżekutur jinnormalizza l-cookie pprovdut, jirriżolvi organizzazzjoni awtentikata waħda, jipprepara l-istat tal-konverżazzjoni, jagħżel trasport dirett jew tal-browser, u jittraduċi b’mod strett ir-risposta SSE upstream. L-orkestrazzjoni tinsab f’
`open-sse/executors/claude-web.ts:320`.

> **Għadek ġdid għall-fornituri tal-Web Cookie?**
>
> Aqra **`docs/getting-started/WEB-COOKIE-GUIDE.md`** għall-proċess ġenerali ta’ konfigurazzjoni, gwida dwar l-awtentikazzjoni, limitazzjonijiet, u soluzzjoni tal-problemi qabel ma ssegwi din il-gwida speċifika għall-fornitur.

### Katalgu tal-mudelli

Bħalissa, ir-reġistru tal-fornitur jesponi eżattament dawn is-seba’ IDs statiċi tal-mudelli
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID tal-mudell               | Isem għall-wiri         |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

L-iskoperta dinamika tal-mudelli mhijiex implimentata għal dan il-fornitur. Il-lista t’hawn fuq hija l-katalgu waqt l-eżekuzzjoni.

### Kredenzjali u riżoluzzjoni tal-organizzazzjoni

Ipprovdi jew l-header Cookie sħiħ ta’ `claude.ai` jew valur tas-sessjoni waħdu. Il-valuri waħedhom jiġu nnormalizzati għal `sessionKey`; cookies oħra jiġu ppreservati jekk ikunu pprovduti. L-eżekutur jaċċetta l-cookie permezz ta’ `cookie` jew `apiKey` u jaqra l-valuri fakultattivi `deviceId` u `orgId` mid-data tal-konnessjoni
(`open-sse/executors/claude-web.ts:72`).

Jekk `orgId` ma jkunx preżenti, l-eżekutur isejjaħ `GET https://claude.ai/api/organizations` u juża l-ewwel organizzazzjoni rritornata mis-sessjoni awtentikata ta’ Claude Web
(`open-sse/executors/claude-web.ts:141`). Jirrifjuta l-operazzjoni jekk ma tiġi rritornata ebda organizzazzjoni valida, jirrapporta l-awtorizzazzjoni miċħuda tas-sessjoni bħala 401, u jiddistingwi sfida ta’ Cloudflare minn falliment tal-awtentikazzjoni.

### Operazzjonijiet tal-konverżazzjoni

L-oġġett fakultattiv tal-ogħla livell `claude_web` huwa strett. Oqsma mhux magħrufa jiġu miċħuda. L-oqsma aċċettati tiegħu huma definiti f’`open-sse/executors/claude-web/session.ts:50`:

| Qasam                 | Tifsira                                                                       |
| --------------------- | ----------------------------------------------------------------------------- |
| `operation`           | `completion` b’mod awtomatiku; uża `retry` għal tentattiv mill-ġdid ta’ dawra |
| `conversation_id`     | UUID espliċitu għal konverżazzjoni eżistenti                                  |
| `parent_message_uuid` | UUID espliċitu għall-messaġġ ġenitur tal-assistent                            |
| `timezone`            | Isem validu taż-żona tal-ħin IANA                                             |
| `locale`              | Locale strutturalment validu                                                  |
| `tool_states`         | Array fakultattiv tal-istati tal-għodod tal-kont, limitat għal 128 entrata    |

It-talbiet ippreparati jużaw wieħed minn żewġ endpoints upstream
(`open-sse/executors/claude-web.ts:203`):

- Dawra ġdida jew ta’ segwitu tibgħat talba lil
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Tentattiv mill-ġdid jibgħat talba lil
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Dawra ġdida tinkludi `create_conversation_params`. Segwitu fil-cache jew marbut b’mod espliċitu jinkludi `parent_message_uuid` u jħalli barra `create_conversation_params`. Tentattiv mill-ġdid jeħtieġ kemm l-istat tal-konverżazzjoni kif ukoll dak tal-messaġġ ġenitur u ma jibgħat ebda prompt
(`open-sse/executors/claude-web/session.ts:254`). Konverżazzjonijiet ġodda jiftħu l-UI awtentikata f’`/new`; segwiti fil-cache jew marbuta b’mod espliċitu jiftħu l-paġna eżatta tal-konverżazzjoni
(`open-sse/executors/claude-web/session.ts:324`).

L-istat tal-konverżazzjoni huwa cache fil-memorja identifikat minn ambitu tal-kont SHA-256 u t-traskrizzjoni kanonika ta’ min jagħmel is-sejħa. L-entrati jiskadu wara 30 minuta u l-cache huwa limitat għal 5,000 entrata
(`open-sse/executors/claude-web/session.ts:12`). L-istat jiġi kkonfermat biss wara li l-parser strett tal-fluss josserva `message_stop`; il-bidu mill-ġdid tal-proċess iħassru. Meta ma tinstabx entrata fil-cache, talba b’diversi messaġġi tiġi sserjalizzata fi prompt wieħed ta’ rkupru minflok ma jitħallew barra messaġġi preċedenti mingħajr twissija.

Il-locale u ż-żona tal-ħin jużaw din il-preċedenza: il-valur `claude_web` tat-talba, il-valur tal-konnessjoni, il-valur waqt l-eżekuzzjoni, imbagħad `en-US` għal-locale jew `UTC` għaż-żona tal-ħin
(`open-sse/executors/claude-web/session.ts:218`).

### Għodod u payloads tat-talbiet

It-talbiet diretti jittrasformaw biss għodod tal-funzjonijiet OpenAI strutturalment validi pprovduti minn min jagħmel is-sejħa. Ma tinħoloq ebda lista statika fittizja ta’ għodod awtomatiċi
(`open-sse/executors/claude-web/payload.ts:102`).

Minflok, it-talbiet tal-browser jaqbdu t-talba tal-UI awtentikata u jżommu l-għodod tal-kont, l-istati tal-għodod, u l-istili personalizzati tagħha. L-oqsma ppreparati tal-konverżazzjoni, tal-mudell, tar-raġunament, tal-prompt, u tal-UUID tal-messaġġ xorta jieħdu preċedenza fuq it-talba maqbuda
(`open-sse/executors/claude-web/browserTransport.ts:175`). It-templates tal-browser jiġu limitati skont hash tal-kont, l-organizzazzjoni, il-cookie, il-locale, u ż-żona tal-ħin, u jiskadu wara 30 minuta
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Meta talba diretta ma jkollha ebda għodda minn min jagħmel is-sejħa, tista’ terġa’ tuża dak it-template limitat għall-istess ambitu; l-għodod espliċiti ta’ min jagħmel is-sejħa jieħdu preċedenza
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Għażla tat-trasport

Ir-rotta awtomatika hija `sendClaudeWebDirect()`, li ssejjaħ `tlsFetchClaude()` bil-profil ikkonfigurat ta’ Chrome 146 u bil-cookie pprovdut (`open-sse/services/claudeTlsClient.ts:23`). Din ma tniedix solver u lanqas ma toħloq cookie ta’ sostituzzjoni.

Issettja `WEB_COOKIE_USE_BROWSER` għal `1`, `true`, jew `on` biex tagħmel l-adapter tal-browser b'ambitu ta' kont it-trasport primarju. Issettja `OMNIROUTE_BROWSER_POOL` għal wieħed mill-istess valuri biex tippermetti li sfida Cloudflare 403 rikonoxxuta taqleb mit-trasport dirett għall-adapter tal-browser (`open-sse/executors/claude-web.ts:195`). Ħsarat HTTP oħra ma jattivawx din il-bidla alternattiva.

L-adapter tal-browser iżomm il-cookies fl-istess kuntest Playwright miġbur, juża ċ-ċavetta hashed b'ambitu deskritta hawn fuq, u jibgħat it-tlestija minn dak il-kuntest (`open-sse/executors/claude-web/browserTransport.ts:444`). Hu qatt ma jesporta cookie solvuta mill-browser lejn il-klijent TLS dirett. Tentattivi mill-ġdid permezz tal-browser jeħtieġu mudell UI mhux skadut marbut mal-istess kuntest Playwright attwali (`open-sse/executors/claude-web/browserTransport.ts:467`). Il-qari tat-tweġibiet tal-browser isir b'mod inkrementali fil-paġna awtentikata, jirrispetta l-kanċellazzjoni tat-talba, u jikkanċella l-body upstream malli jaqbeż 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

L-eżekutur jirritorna projezzjoni tal-awditjar b'data sensittiva mgħottija lil-logger kondiviż tat-talbiet: UUIDs tal-organizzazzjoni, tal-konverżazzjoni u tal-messaġġi, it-test tal-prompt, id-definizzjonijiet tal-għodod, il-cookies, u l-identifikaturi tal-apparat huma esklużi (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). L-eċċezzjonijiet tat-trasport jirritornaw ukoll żball ġeneriku ta' konnessjoni minflok il-messaġġ tal-eċċezzjoni mitfugħa.

### Imġiba tal-SSE

`createClaudeWebResponse()` jimmaniġġja framing LF jew CRLF u fields `data:` fuq diversi linji. Hu jimmappja d-deltas tat-test għal `content`, id-deltas tal-ħsieb għal `reasoning_content`, u avvenimenti magħrufa tal-metadata għall-estensjoni tat-tweġiba `claude_web`. Kull avveniment tal-metadata jiġi pproġettat permezz tal-allowlist tal-fields tiegħu stess (`open-sse/executors/claude-web/stream.ts:37`). Il-metadata tal-konverżazzjoni, tal-messaġġ ġenitur, tal-messaġġ tal-assistent, u tal-operazzjoni tiġi rritornata wkoll fil-headers `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Il-parser jagħlaq b'falliment f'każ ta' JSON malformat, avvenimenti upstream `error`, tipi ta' avvenimenti mhux magħrufa, ordni invalida, diskrepanzi fil-blokki tal-kontenut, jew EOF qabel `message_stop`. L-output bi streaming joħroġ chunk wieħed tat-tmiem u `[DONE]` wieħed; l-output ibbufferjat juża l-istess parser. Il-parser jittratta `message_stop` bħala terminali immedjatament, jikkanċella d-data upstream li ssegwi, u jgħaddi l-kanċellazzjoni downstream lir-reader upstream (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Il-linji SSE mhux terminati u l-avvenimenti akkumulati huma limitati għal 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Fajls

| Fajl                                                     | Għan                                      |
| -------------------------------------------------------- | ----------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Reġistru statiku tal-mudelli tal-fornitur |
| `open-sse/executors/claude-web.ts`                       | Orkestrazzjoni tal-eżekutur               |
| `open-sse/executors/claude-web/payload.ts`               | Trasformazzjoni tal-payload u tal-għodod  |
| `open-sse/executors/claude-web/session.ts`               | Stat tat-turn u cache tat-traskrizzjoni   |
| `open-sse/executors/claude-web/transport.ts`             | Adapter tat-trasport dirett               |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adapter tal-browser b'ambitu ta' kont     |
| `open-sse/executors/claude-web/stream.ts`                | Traduzzjoni stretta tal-SSE               |
| `open-sse/services/claudeTlsClient.ts`                   | Trasport TLS nattiv                       |
| `open-sse/services/browserPool.ts`                       | Kuntesti Playwright miġbura               |

### Ittestjar

Ħaddem is-suite deterministika ta' Claude Web mingħajr kredenzjali reali:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Il-każijiet li jiddependu fuq Playwright f'`tests/unit/claude-web-auto-refresh.test.ts` huma espliċitament maqbuża. Bħalissa dan ir-repożitorju ma jiddefinixxix script ta' test live ta' Claude Web bi kredenzjali, għalhekk dawk il-każijiet maqbuża mhumiex prova waqt ir-runtime.

### Konfigurazzjoni

1. Ibda OmniRoute b'`npm run dev` jew b'installazzjoni mibnija.
2. Iftaħ Dashboard → Providers → Add Provider.
3. Agħżel il-kategorija Web Cookie u Claude Web.
4. Waħħal il-header Cookie kollu kkupjat minn talba `claude.ai` awtentikata.
