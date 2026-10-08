# Providers — Claude Web (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` odosiela chatové požiadavky vo formáte OpenAI prostredníctvom autentifikovanej relácie prehliadača `claude.ai`. Vykonávací modul normalizuje zadaný súbor cookie, určí jednu autentifikovanú organizáciu, pripraví stav konverzácie, vyberie priamy transport alebo transport cez prehliadač a striktne preloží upstreamovú odpoveď SSE. Orchestrácia sa nachádza v súbore `open-sse/executors/claude-web.ts:320`.

> **Sú pre vás poskytovatelia využívajúci webové súbory cookie novinkou?**
>
> Pred použitím tejto príručky pre konkrétneho poskytovateľa si prečítajte dokument **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, ktorý opisuje všeobecný proces nastavenia, pokyny na autentifikáciu, obmedzenia a riešenie problémov.

### Katalóg modelov

Register poskytovateľa momentálne sprístupňuje presne týchto sedem statických ID modelov (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modelu                   | Zobrazovaný názov       |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynamické zisťovanie modelov nie je pre tohto poskytovateľa implementované. Vyššie uvedený zoznam predstavuje katalóg dostupný za behu.

### Prihlasovacie údaje a určenie organizácie

Zadajte buď celú hlavičku Cookie služby `claude.ai`, alebo samotnú hodnotu relácie. Samostatné hodnoty sa normalizujú na `sessionKey`; ostatné súbory cookie sa zachovajú, ak sú zadané. Vykonávací modul prijíma súbor cookie prostredníctvom `cookie` alebo `apiKey` a z údajov pripojenia načítava voliteľné hodnoty `deviceId` a `orgId` (`open-sse/executors/claude-web.ts:72`).

Ak `orgId` chýba, vykonávací modul zavolá `GET https://claude.ai/api/organizations` a použije prvú organizáciu vrátenú autentifikovanou reláciou Claude Web (`open-sse/executors/claude-web.ts:141`). Ak nie je vrátená žiadna platná organizácia, požiadavku bezpečne zamietne, odmietnutú autorizáciu relácie nahlási stavom 401 a rozlišuje medzi výzvou Cloudflare a zlyhaním autentifikácie.

### Operácie s konverzáciami

Voliteľný objekt najvyššej úrovne `claude_web` je striktný. Neznáme polia sa odmietajú. Jeho akceptované polia sú definované v `open-sse/executors/claude-web/session.ts:50`:

| Pole                  | Význam                                                           |
| --------------------- | ---------------------------------------------------------------- |
| `operation`           | Predvolene `completion`; pre opakovanie odpovede použite `retry` |
| `conversation_id`     | Explicitné UUID existujúcej konverzácie                          |
| `parent_message_uuid` | Explicitné UUID nadradenej správy asistenta                      |
| `timezone`            | Platný názov časového pásma IANA                                 |
| `locale`              | Štrukturálne platné miestne nastavenie                           |
| `tool_states`         | Voliteľné pole stavov nástrojov účtu, obmedzené na 128 položiek  |

Pripravené požiadavky používajú jeden z dvoch upstreamových koncových bodov (`open-sse/executors/claude-web.ts:203`):

- Nový alebo nadväzujúci ťah sa odošle na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Opakovanie sa odošle na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Nový ťah obsahuje `create_conversation_params`. Nadväzujúci ťah z vyrovnávacej pamäte alebo explicitne prepojený ťah obsahuje `parent_message_uuid` a vynecháva `create_conversation_params`. Operácia opakovania vyžaduje stav konverzácie aj nadradenej správy a neodosiela žiadnu výzvu (`open-sse/executors/claude-web/session.ts:254`). Nové konverzácie otvoria autentifikované používateľské rozhranie na `/new`; nadväzujúce ťahy z vyrovnávacej pamäte alebo explicitne prepojené ťahy otvoria presnú stránku konverzácie (`open-sse/executors/claude-web/session.ts:324`).

Stav konverzácie sa uchováva vo vyrovnávacej pamäti v pamäti, ktorej kľúč tvorí rozsah účtu SHA-256 a kanonický prepis volajúceho. Platnosť položiek vyprší po 30 minútach a vyrovnávacia pamäť je obmedzená na 5 000 položiek (`open-sse/executors/claude-web/session.ts:12`). Stav sa potvrdí až po tom, ako striktný syntaktický analyzátor streamu zaznamená `message_stop`; pri reštartovaní procesu sa zahodí. Pri nenájdení položky vo vyrovnávacej pamäti sa požiadavka s viacerými správami serializuje do jednej obnovovacej výzvy namiesto tichého vynechania skorších správ.

Miestne nastavenie a časové pásmo používajú túto prioritu: hodnota `claude_web` z požiadavky, hodnota pripojenia, hodnota prostredia behu a následne `en-US` pre miestne nastavenie alebo `UTC` pre časové pásmo (`open-sse/executors/claude-web/session.ts:218`).

### Nástroje a dátové časti požiadaviek

Priame požiadavky transformujú iba štrukturálne platné funkčné nástroje OpenAI dodané volajúcim. Nevytvára sa žiadny umelý statický predvolený zoznam nástrojov (`open-sse/executors/claude-web/payload.ts:102`).

Požiadavky cez prehliadač namiesto toho zachytia požiadavku autentifikovaného používateľského rozhrania a zachovajú nástroje účtu, stavy nástrojov a prispôsobené štýly. Pripravené polia konverzácie, modelu, uvažovania, výzvy a UUID správ naďalej prepíšu zachytenú požiadavku (`open-sse/executors/claude-web/browserTransport.ts:175`). Šablóny prehliadača sú vymedzené hashom účtu, organizácie, súboru cookie, miestneho nastavenia a časového pásma a ich platnosť vyprší po 30 minútach (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Ak priama požiadavka neobsahuje žiadne nástroje volajúceho, môže znova použiť túto vymedzenú šablónu; explicitné nástroje volajúceho majú prednosť (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Výber transportu

Predvolenou cestou je `sendClaudeWebDirect()`, ktorá volá `tlsFetchClaude()` s nakonfigurovaným profilom Chrome 146 a zadaným súborom cookie (`open-sse/services/claudeTlsClient.ts:23`). Nespúšťa riešič ani nevytvára náhradný súbor cookie.

Nastavte `WEB_COOKIE_USE_BROWSER` na `1`, `true` alebo `on`, aby sa prehliadačový
adaptér viazaný na účet stal primárnym transportom. Nastavte `OMNIROUTE_BROWSER_POOL` na jednu
z rovnakých hodnôt, aby sa pri rozpoznanej výzve Cloudflare 403 mohol priamy transport prepnúť
na prehliadačový adaptér (`open-sse/executors/claude-web.ts:195`). Iné zlyhania HTTP tento
záložný mechanizmus nespúšťajú.

Prehliadačový adaptér uchováva súbory cookie v rovnakom zdieľanom kontexte Playwright, používa
vyššie opísaný hašovaný kľúč s príslušným rozsahom a odosiela dokončenie z tohto kontextu
(`open-sse/executors/claude-web/browserTransport.ts:444`). Súbor cookie získaný prehliadačom
nikdy neexportuje do priameho klienta TLS. Opakované pokusy prehliadača vyžadujú neexpirovanú
šablónu používateľského rozhrania naviazanú na rovnaký skutočný kontext Playwright
(`open-sse/executors/claude-web/browserTransport.ts:467`). Odpovede prehliadača sa načítavajú
priebežne na autentifikovanej stránke, rešpektujú zrušenie požiadavky a zrušia upstreamové telo
hneď, ako prekročí 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Exekútor vracia zdieľanému zapisovaču požiadaviek redigovanú auditnú projekciu: UUID organizácie,
konverzácie a správ, text výzvy, definície nástrojov, súbory cookie a identifikátory zariadení
sú vylúčené (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Výnimky transportu tiež vracajú všeobecnú chybu
pripojenia namiesto správy vyvolanej výnimky.

### Správanie SSE

`createClaudeWebResponse()` spracúva rámcovanie LF alebo CRLF a viacriadkové polia `data:`.
Textové delty mapuje na `content`, delty premýšľania na `reasoning_content` a známe udalosti
metadát na rozšírenie odpovede `claude_web`. Každá udalosť metadát sa premieta prostredníctvom
vlastného zoznamu povolených polí (`open-sse/executors/claude-web/stream.ts:37`). Metadáta
konverzácie, nadradenej správy, správy asistenta a operácie sa vracajú aj v hlavičkách
`X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Analyzátor bezpečne zlyhá pri chybne formátovanom JSON, upstreamových udalostiach `error`,
neznámych typoch udalostí, neplatnom poradí, nezhodách blokov obsahu alebo EOF pred
`message_stop`. Streamovaný výstup odošle jeden záverečný blok a jeden `[DONE]`; výstup
uložený do vyrovnávacej pamäte používa rovnaký analyzátor. Analyzátor považuje `message_stop`
okamžite za koncovú udalosť, zruší následné upstreamové údaje a prenesie zrušenie downstreamu
do upstreamovej čítačky (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Neukončené riadky SSE a akumulované udalosti
sú obmedzené na 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Súbory

| Súbor                                                    | Účel                                    |
| -------------------------------------------------------- | --------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statický register modelov poskytovateľa |
| `open-sse/executors/claude-web.ts`                       | Orchestrácia exekútora                  |
| `open-sse/executors/claude-web/payload.ts`               | Transformácia dátovej časti a nástrojov |
| `open-sse/executors/claude-web/session.ts`               | Stav ťahu a vyrovnávacia pamäť prepisu  |
| `open-sse/executors/claude-web/transport.ts`             | Adaptér priameho transportu             |
| `open-sse/executors/claude-web/browserTransport.ts`      | Prehliadačový adaptér viazaný na účet   |
| `open-sse/executors/claude-web/stream.ts`                | Striktný preklad SSE                    |
| `open-sse/services/claudeTlsClient.ts`                   | Natívny transport TLS                   |
| `open-sse/services/browserPool.ts`                       | Zdieľané kontexty Playwright            |

### Testovanie

Spustite deterministickú testovaciu sadu Claude Web bez skutočných prihlasovacích údajov:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Prípady závislé od Playwright v `tests/unit/claude-web-auto-refresh.test.ts` sú explicitne
preskočené. Toto úložisko momentálne nedefinuje skript živého testu Claude Web s prihlasovacími
údajmi, takže tieto preskočené prípady nie sú dôkazom funkčnosti za behu.

### Nastavenie

1. Spustite OmniRoute pomocou `npm run dev` alebo z vytvorenej inštalácie.
2. Otvorte Dashboard → Providers → Add Provider.
3. Vyberte kategóriu Web Cookie a Claude Web.
4. Vložte celú hlavičku Cookie skopírovanú z autentifikovanej požiadavky na `claude.ai`.
