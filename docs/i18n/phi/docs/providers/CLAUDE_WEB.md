# Providers — Claude Web (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

Nagpapadala ang `claude-web` ng mga kahilingan sa chat na nasa format ng OpenAI sa pamamagitan ng isang napatotohanang session ng browser sa `claude.ai`. Isinasapamantayan ng executor ang ibinigay na cookie, tinutukoy ang isang napatotohanang organisasyon, inihahanda ang estado ng pag-uusap, pumipili ng direkta o browser na transport, at mahigpit na isinasalin ang upstream na tugon ng SSE. Ang orkestrasyon ay nasa `open-sse/executors/claude-web.ts:320`.

> **Bago sa mga provider ng Web Cookie?**
>
> Basahin ang **`docs/getting-started/WEB-COOKIE-GUIDE.md`** para sa pangkalahatang proseso ng pag-set up, gabay sa pagpapatotoo, mga limitasyon, at pag-troubleshoot bago sundin ang gabay na ito na partikular sa provider.

### Katalogo ng modelo

Kasalukuyang eksaktong inilalantad ng registry ng provider ang pitong static na model ID na ito
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Model ID                    | Pangalan na ipinapakita |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Hindi ipinatupad ang dynamic na pagtuklas ng modelo para sa provider na ito. Ang listahan sa itaas ang katalogo sa runtime.

### Mga kredensyal at pagtukoy sa organisasyon

Ibigay ang buong Cookie header ng `claude.ai` o isang hiwalay na session value. Isinasapamantayan ang mga hiwalay na value sa `sessionKey`; pinananatili ang iba pang mga cookie kung ibinigay. Tinatanggap ng executor ang cookie sa pamamagitan ng `cookie` o `apiKey` at binabasa ang mga opsyonal na value na `deviceId` at `orgId` mula sa data ng koneksyon
(`open-sse/executors/claude-web.ts:72`).

Kung wala ang `orgId`, tatawag ang executor sa `GET https://claude.ai/api/organizations` at gagamitin ang unang organisasyong ibinalik ng napatotohanang session ng Claude Web
(`open-sse/executors/claude-web.ts:141`). Nabibigo ito nang sarado kapag walang ibinalik na wastong organisasyon, iniuulat bilang 401 ang tinanggihang awtorisasyon ng session, at tinutukoy ang pagkakaiba ng isang hamon ng Cloudflare sa isang pagkabigo sa pagpapatotoo.

### Mga operasyon sa pag-uusap

Mahigpit ang opsyonal na top-level na object na `claude_web`. Tinatanggihan ang mga hindi kilalang field. Ang mga tinatanggap nitong field ay tinukoy sa `open-sse/executors/claude-web/session.ts:50`:

| Field                 | Kahulugan                                                                          |
| --------------------- | ---------------------------------------------------------------------------------- |
| `operation`           | `completion` bilang default; gamitin ang `retry` para sa muling pagtatangkang turn |
| `conversation_id`     | Tiyak na UUID para sa isang umiiral na pag-uusap                                   |
| `parent_message_uuid` | Tiyak na UUID para sa parent na mensahe ng assistant                               |
| `timezone`            | Wastong pangalan ng time zone ng IANA                                              |
| `locale`              | Locale na may wastong estruktura                                                   |
| `tool_states`         | Opsyonal na array ng estado ng mga tool ng account, limitado sa 128 entry          |

Gumagamit ang mga inihandang kahilingan ng isa sa dalawang upstream endpoint
(`open-sse/executors/claude-web.ts:203`):

- Nagpo-post ang bago o follow-up na turn sa
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Nagpo-post ang muling pagtatangka sa
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Kasama sa bagong turn ang `create_conversation_params`. Kasama sa naka-cache o tahasang naka-link na follow-up ang `parent_message_uuid` at hindi kasama ang `create_conversation_params`. Kinakailangan sa muling pagtatangka ang parehong estado ng pag-uusap at parent message, at hindi ito nagpapadala ng prompt
(`open-sse/executors/claude-web/session.ts:254`). Binubuksan ng mga bagong pag-uusap ang napatotohanang UI sa `/new`; binubuksan naman ng mga naka-cache o tahasang naka-link na follow-up ang eksaktong page ng pag-uusap
(`open-sse/executors/claude-web/session.ts:324`).

Ang estado ng pag-uusap ay isang in-memory cache na may key na saklaw ng account na SHA-256 at canonical na transcript ng tumatawag. Nag-e-expire ang mga entry pagkalipas ng 30 minuto at nililimitahan ang cache sa 5,000 entry
(`open-sse/executors/claude-web/session.ts:12`). Kino-commit lamang ang estado pagkatapos maobserbahan ng mahigpit na stream parser ang `message_stop`; itinatapon ito kapag nag-restart ang proseso. Kapag may cache miss, isine-serialize ang isang kahilingang may maraming mensahe sa iisang recovery prompt sa halip na tahimik na alisin ang mga naunang mensahe.

Ginagamit ng locale at time zone ang sumusunod na pagkakasunod-sunod ng priyoridad: value ng `claude_web` sa kahilingan, value ng koneksyon, value ng runtime, pagkatapos ay `en-US` para sa locale o `UTC` para sa time zone
(`open-sse/executors/claude-web/session.ts:218`).

### Mga tool at payload ng kahilingan

Ang mga direktang kahilingan ay nagta-transform lamang ng mga OpenAI function tool na may wastong estruktura at ibinigay ng tumatawag. Walang ginagawang kathang static na default na listahan ng mga tool
(`open-sse/executors/claude-web/payload.ts:102`).

Sa halip, kinukuha ng mga kahilingan sa browser ang napatotohanang kahilingan ng UI at pinananatili ang mga tool ng account, estado ng mga tool, at mga naka-personalize na istilo nito. Ino-override pa rin ng mga inihandang field ng pag-uusap, modelo, pangangatwiran, prompt, at UUID ng mensahe ang nakuhang kahilingan
(`open-sse/executors/claude-web/browserTransport.ts:175`). Itinatakda ang saklaw ng mga template ng browser gamit ang hash ng account, organisasyon, cookie, locale, at time zone, at nag-e-expire ang mga ito pagkalipas ng 30 minuto
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Kapag walang mga tool mula sa tumatawag ang isang direktang kahilingan, maaari nitong gamiting muli ang template na may ganoong saklaw; inuuna ang mga tahasang tool mula sa tumatawag
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Pagpili ng transport

Ang default na path ay `sendClaudeWebDirect()`, na tumatawag sa `tlsFetchClaude()` gamit ang naka-configure na profile ng Chrome 146 at ang ibinigay na cookie (`open-sse/services/claudeTlsClient.ts:23`). Hindi ito naglulunsad ng solver o gumagawa ng pamalit na cookie.

Itakda ang `WEB_COOKIE_USE_BROWSER` sa `1`, `true`, o `on` upang gawing pangunahing transport ang browser adapter na saklaw ng account. Itakda ang `OMNIROUTE_BROWSER_POOL` sa isa sa parehong mga value upang pahintulutan ang isang nakikilalang Cloudflare 403 challenge na mag-fallback mula sa direktang transport patungo sa browser adapter (`open-sse/executors/claude-web.ts:195`). Hindi nagti-trigger ng fallback na iyon ang iba pang mga kabiguan sa HTTP.

Pinapanatili ng browser adapter ang mga cookie sa loob ng parehong pooled Playwright context, ginagamit ang scoped hashed key na inilarawan sa itaas, at ipinapadala ang completion mula sa context na iyon (`open-sse/executors/claude-web/browserTransport.ts:444`). Hindi nito kailanman ine-export ang cookie na nalutas ng browser papunta sa direktang TLS client. Nangangailangan ang mga muling pagtatangka ng browser ng hindi pa expired na UI template na nakatali sa parehong aktuwal na Playwright context (`open-sse/executors/claude-web/browserTransport.ts:467`). Incremental na isinasagawa sa authenticated na page ang pagbabasa ng tugon ng browser, sinusunod ang pagkansela ng request, at kinakansela ang upstream body sa sandaling lumampas ito sa 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Nagbabalik ang executor ng na-redact na audit projection sa nakabahaging request logger: hindi isinasama ang mga UUID ng organization, conversation, at message, prompt text, mga depinisyon ng tool, mga cookie, at mga identifier ng device (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Nagbabalik din ang mga exception sa transport ng generic na error sa koneksyon sa halip na ang itinapon na mensahe.

### Gawi ng SSE

Pinangangasiwaan ng `createClaudeWebResponse()` ang LF o CRLF framing at mga multiline na `data:` field. Mina-map nito ang mga text delta sa `content`, mga thinking delta sa `reasoning_content`, at mga kilalang metadata event sa extension na `claude_web` ng tugon. Ipinoproseso ang bawat metadata event sa sarili nitong allowlist ng field (`open-sse/executors/claude-web/stream.ts:37`). Ibinabalik din ang metadata ng conversation, parent-message, assistant-message, at operation sa mga `X-OmniRoute-Claude-Web-*` header (`open-sse/executors/claude-web/stream.ts:364`).

Nabibigo nang sarado ang parser kapag may malformed na JSON, mga upstream na `error` event, hindi kilalang uri ng event, di-wastong pagkakasunod-sunod, mga hindi pagtutugma ng content block, o EOF bago ang `message_stop`. Naglalabas ang streaming output ng isang finish chunk at isang `[DONE]`; ginagamit ng buffered output ang parehong parser. Agad na itinuturing ng parser ang `message_stop` bilang terminal, kinakansela ang sumusunod na upstream data, at ipinapasa ang downstream cancellation sa upstream reader (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Nililimitahan sa 1 MiB ang mga hindi tinapos na linya ng SSE at mga naipong event (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Mga File

| File                                                     | Layunin                              |
| -------------------------------------------------------- | ------------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Static na registry ng provider model |
| `open-sse/executors/claude-web.ts`                       | Orkestrasyon ng executor             |
| `open-sse/executors/claude-web/payload.ts`               | Pagbabago ng payload at tool         |
| `open-sse/executors/claude-web/session.ts`               | Turn state at transcript cache       |
| `open-sse/executors/claude-web/transport.ts`             | Direktang transport adapter          |
| `open-sse/executors/claude-web/browserTransport.ts`      | Browser adapter na saklaw ng account |
| `open-sse/executors/claude-web/stream.ts`                | Mahigpit na pagsasalin ng SSE        |
| `open-sse/services/claudeTlsClient.ts`                   | Native na TLS transport              |
| `open-sse/services/browserPool.ts`                       | Mga pooled Playwright context        |

### Pagsubok

Patakbuhin ang deterministic na Claude Web suite nang walang tunay na mga credential:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Tahasang nilalaktawan ang mga case na nakadepende sa Playwright sa `tests/unit/claude-web-auto-refresh.test.ts`. Sa kasalukuyan, walang credentialed na Claude Web live-test script na nakatakda sa repository na ito, kaya ang mga nilaktawang case na iyon ay hindi patunay sa runtime.

### Pag-setup

1. Simulan ang OmniRoute gamit ang `npm run dev` o isang built na installation.
2. Buksan ang Dashboard → Providers → Add Provider.
3. Piliin ang kategoryang Web Cookie at Claude Web.
4. I-paste ang buong Cookie header na kinopya mula sa isang authenticated na request sa `claude.ai`.
