# Providers — Claude Web (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` odesílá chatovací požadavky ve formátu OpenAI prostřednictvím ověřené relace prohlížeče `claude.ai`. Executor normalizuje zadaný soubor cookie, vyhledá jednu ověřenou organizaci, připraví stav konverzace, vybere přímý nebo prohlížečový transport a striktně převádí upstreamovou odpověď SSE. Orchestrace se nachází v
`open-sse/executors/claude-web.ts:320`.

> **Začínáte s poskytovateli Web Cookie?**
>
> Než budete pokračovat podle tohoto průvodce pro konkrétního poskytovatele, přečtěte si **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, kde najdete obecný postup nastavení, pokyny k ověřování, omezení a řešení problémů.

### Katalog modelů

Registr poskytovatelů aktuálně zpřístupňuje přesně těchto sedm statických ID modelů
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modelu                   | Zobrazovaný název       |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynamické zjišťování modelů není pro tohoto poskytovatele implementováno. Výše uvedený seznam je katalog používaný za běhu.

### Přihlašovací údaje a určení organizace

Zadejte buď kompletní hlavičku Cookie pro `claude.ai`, nebo samotnou hodnotu relace. Samostatné hodnoty jsou normalizovány na `sessionKey`; pokud zadáte i jiné soubory cookie, zůstanou zachovány. Executor přijímá soubor cookie prostřednictvím `cookie` nebo `apiKey` a načítá volitelné hodnoty `deviceId` a `orgId` z dat připojení
(`open-sse/executors/claude-web.ts:72`).

Pokud `orgId` chybí, executor zavolá `GET https://claude.ai/api/organizations` a použije první organizaci vrácenou ověřenou relací Claude Web
(`open-sse/executors/claude-web.ts:141`). Pokud není vrácena žádná platná organizace, požadavek bezpečně odmítne, zamítnutou autorizaci relace oznámí stavovým kódem 401 a rozlišuje mezi výzvou Cloudflare a selháním ověření.

### Operace s konverzacemi

Volitelný objekt `claude_web` nejvyšší úrovně je striktní. Neznámá pole jsou odmítnuta. Přijímaná pole jsou definována v `open-sse/executors/claude-web/session.ts:50`:

| Pole                  | Význam                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| `operation`           | Ve výchozím nastavení `completion`; pro opakovaný tah použijte `retry` |
| `conversation_id`     | Explicitní UUID existující konverzace                                  |
| `parent_message_uuid` | Explicitní UUID nadřazené zprávy asistenta                             |
| `timezone`            | Platný název časového pásma IANA                                       |
| `locale`              | Strukturálně platné národní prostředí                                  |
| `tool_states`         | Volitelné pole stavů nástrojů účtu, omezené na 128 položek             |

Připravené požadavky používají jeden ze dvou upstreamových koncových bodů
(`open-sse/executors/claude-web.ts:203`):

- Nový nebo navazující tah se odesílá na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Opakovaný pokus se odesílá na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Nový tah obsahuje `create_conversation_params`. Navazující tah načtený z mezipaměti nebo explicitně propojený tah obsahuje `parent_message_uuid` a vynechává `create_conversation_params`. Opakovaný pokus vyžaduje stav konverzace i nadřazené zprávy a neodesílá žádnou výzvu
(`open-sse/executors/claude-web/session.ts:254`). Nové konverzace otevřou ověřené uživatelské rozhraní na `/new`; navazující tahy načtené z mezipaměti nebo explicitně propojené tahy otevřou přesnou stránku konverzace
(`open-sse/executors/claude-web/session.ts:324`).

Stav konverzace je mezipaměť v paměti, jejímž klíčem je rozsah účtu odvozený pomocí SHA-256 a kanonický přepis volajícího. Platnost položek vyprší po 30 minutách a kapacita mezipaměti je omezena na 5 000 položek
(`open-sse/executors/claude-web/session.ts:12`). Stav se uloží až poté, co striktní analyzátor streamu zaznamená `message_stop`; restart procesu jej zahodí. Při nenalezení záznamu v mezipaměti je požadavek s více zprávami serializován do jedné obnovovací výzvy namísto toho, aby byly předchozí zprávy bez upozornění zahozeny.

Národní prostředí a časové pásmo používají následující pořadí priorit: hodnota `claude_web` z požadavku, hodnota připojení, hodnota běhového prostředí a poté `en-US` pro národní prostředí nebo `UTC` pro časové pásmo
(`open-sse/executors/claude-web/session.ts:218`).

### Nástroje a datové části požadavků

Přímé požadavky transformují pouze strukturálně platné funkční nástroje OpenAI dodané volajícím. Není vytvářen žádný smyšlený statický výchozí seznam nástrojů
(`open-sse/executors/claude-web/payload.ts:102`).

Požadavky prohlížeče namísto toho zachytí požadavek ověřeného uživatelského rozhraní a zachovají jeho nástroje účtu, stavy nástrojů a personalizované styly. Připravená pole konverzace, modelu, uvažování, výzvy a UUID zprávy přesto přepíší zachycený požadavek
(`open-sse/executors/claude-web/browserTransport.ts:175`). Šablony prohlížeče jsou vymezeny hashem účtu, organizace, souboru cookie, národního prostředí a časového pásma a jejich platnost vyprší po 30 minutách
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Pokud přímý požadavek neobsahuje žádné nástroje volajícího, může tuto vymezenou šablonu znovu použít; explicitní nástroje volajícího mají přednost
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Výběr transportu

Výchozí cestou je `sendClaudeWebDirect()`, která volá `tlsFetchClaude()` s nakonfigurovaným profilem Chrome 146 a dodaným souborem cookie (`open-sse/services/claudeTlsClient.ts:23`). Nespouští řešicí nástroj ani nevytváří náhradní soubor cookie.

Nastavte `WEB_COOKIE_USE_BROWSER` na `1`, `true` nebo `on`, aby se primárním transportem stal prohlížečový adaptér vázaný na účet. Nastavte `OMNIROUTE_BROWSER_POOL` na jednu ze stejných hodnot, aby rozpoznaná výzva Cloudflare 403 umožnila přejít z přímého transportu na prohlížečový adaptér (`open-sse/executors/claude-web.ts:195`). Jiné chyby HTTP tento záložní přechod nespouštějí.

Prohlížečový adaptér uchovává soubory cookie ve stejném sdíleném kontextu Playwright, používá výše popsaný hashovaný klíč s omezeným rozsahem a odesílá dokončení z tohoto kontextu (`open-sse/executors/claude-web/browserTransport.ts:444`). Soubory cookie získané vyřešením výzvy v prohlížeči nikdy neexportuje do přímého klienta TLS. Opakované pokusy v prohlížeči vyžadují neexpirovanou šablonu uživatelského rozhraní navázanou na stejný skutečný kontext Playwright (`open-sse/executors/claude-web/browserTransport.ts:467`). Odpovědi se v prohlížeči čtou postupně na autentizované stránce, respektují zrušení požadavku a zruší nadřazené tělo odpovědi, jakmile překročí 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Executor vrací sdílenému protokolovacímu nástroji požadavků redigovanou auditní projekci: identifikátory UUID organizace, konverzace a zpráv, text výzvy, definice nástrojů, soubory cookie a identifikátory zařízení jsou vyloučeny (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Výjimky transportu také vracejí obecnou chybu připojení namísto vyvolané zprávy.

### Chování SSE

`createClaudeWebResponse()` zpracovává rámce s LF nebo CRLF a víceřádková pole `data:`. Textové přírůstky mapuje na `content`, přírůstky uvažování na `reasoning_content` a známé události metadat na rozšíření odpovědi `claude_web`. Každá událost metadat se promítá prostřednictvím vlastního seznamu povolených polí (`open-sse/executors/claude-web/stream.ts:37`). Metadata konverzace, nadřazené zprávy, zprávy asistenta a operace se rovněž vracejí v hlavičkách `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Parser bezpečně selže při poškozeném JSON, nadřazených událostech `error`, neznámých typech událostí, neplatném pořadí, neshodách bloků obsahu nebo dosažení EOF před `message_stop`. Streamovaný výstup odešle jeden ukončovací blok a jeden `[DONE]`; výstup ve vyrovnávací paměti používá stejný parser. Parser považuje `message_stop` okamžitě za koncovou událost, zruší následná nadřazená data a přenáší zrušení z navazujícího zpracování do nadřazené čtečky (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Neukončené řádky SSE a nashromážděné události jsou omezeny na 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Soubory

| Soubor                                                   | Účel                                  |
| -------------------------------------------------------- | ------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statický registr modelů poskytovatele |
| `open-sse/executors/claude-web.ts`                       | Orchestrace executoru                 |
| `open-sse/executors/claude-web/payload.ts`               | Transformace datové části a nástrojů  |
| `open-sse/executors/claude-web/session.ts`               | Stav tahu a mezipaměť přepisu         |
| `open-sse/executors/claude-web/transport.ts`             | Adaptér přímého transportu            |
| `open-sse/executors/claude-web/browserTransport.ts`      | Prohlížečový adaptér vázaný na účet   |
| `open-sse/executors/claude-web/stream.ts`                | Striktní překlad SSE                  |
| `open-sse/services/claudeTlsClient.ts`                   | Nativní transport TLS                 |
| `open-sse/services/browserPool.ts`                       | Sdílené kontexty Playwright           |

### Testování

Spusťte deterministickou sadu Claude Web bez skutečných přihlašovacích údajů:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Případy závislé na Playwright v `tests/unit/claude-web-auto-refresh.test.ts` jsou výslovně přeskočeny. Tento repozitář momentálně nedefinuje skript živého testu Claude Web s přihlašovacími údaji, takže tyto přeskočené případy nepředstavují důkaz funkčnosti za běhu.

### Nastavení

1. Spusťte OmniRoute pomocí `npm run dev` nebo zkompilované instalace.
2. Otevřete Dashboard → Providers → Add Provider.
3. Vyberte kategorii Web Cookie a Claude Web.
4. Vložte celou hlavičku Cookie zkopírovanou z autentizovaného požadavku na `claude.ai`.
