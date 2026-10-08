# Providers — Claude Web (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` saadab OpenAI-vormingus vestluspäringuid autentitud `claude.ai`
brauseriseansi kaudu. Täitja normaliseerib esitatud küpsise, lahendab ühe autentitud
organisatsiooni, valmistab ette vestluse oleku, valib otse- või brauseritranspordi ning
teisendab rangelt ülesvoolu SSE-vastuse. Orkestreerimine asub failis
`open-sse/executors/claude-web.ts:320`.

> **Kas Web Cookie'i pakkujad on teile uued?**
>
> Enne selle pakkuja juhendi järgimist lugege üldise seadistusprotsessi, autentimisjuhiste, piirangute ja tõrkeotsingu kohta dokumenti **`docs/getting-started/WEB-COOKIE-GUIDE.md`**.

### Mudelikataloog

Pakkujate register avaldab praegu täpselt järgmised seitse staatilist mudeli-ID-d
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Mudeli ID                   | Kuvatav nimi             |
| --------------------------- | ------------------------ |
| `claude-fable-5`            | Claude Fable 5 (veeb)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (veeb)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (veeb)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (veeb)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (veeb)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (veeb)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (veeb) |

Dünaamilist mudelite tuvastamist pole selle pakkuja jaoks rakendatud. Ülaltoodud loend on
käitusaegne kataloog.

### Mandaatide ja organisatsiooni lahendamine

Esitage kas täielik `claude.ai` Cookie-päis või paljas seansiväärtus. Paljad väärtused
normaliseeritakse väärtuseks `sessionKey`; muud küpsised säilitatakse, kui need on esitatud. Täitja aktsepteerib
küpsist välja `cookie` või `apiKey` kaudu ning
loeb ühenduse andmetest valikulised `deviceId` ja `orgId` väärtused
(`open-sse/executors/claude-web.ts:72`).

Kui `orgId` puudub, kutsub täitja välja `GET https://claude.ai/api/organizations` ja kasutab esimest
autenditud Claude Webi seansi tagastatud organisatsiooni
(`open-sse/executors/claude-web.ts:141`). Kui kehtivat organisatsiooni ei tagastata, katkestab see turvaliselt töö,
teatab tagasilükatud seansi autoriseerimisest olekukoodiga 401 ning eristab Cloudflare'i
kontrollpäringut autentimistõrkest.

### Vestlustoimingud

Valikuline tipptaseme objekt `claude_web` on range. Tundmatud väljad lükatakse tagasi. Selle
aktsepteeritavad väljad on määratletud failis `open-sse/executors/claude-web/session.ts:50`:

| Väli                  | Tähendus                                                     |
| --------------------- | ------------------------------------------------------------ |
| `operation`           | Vaikimisi `completion`; korduskatse vooruks kasutage `retry` |
| `conversation_id`     | Olemasoleva vestluse selgesõnaline UUID                      |
| `parent_message_uuid` | Eelmise assistendisõnumi selgesõnaline UUID                  |
| `timezone`            | Kehtiv IANA ajavööndi nimi                                   |
| `locale`              | Struktuuriliselt kehtiv lokaat                               |
| `tool_states`         | Valikuline konto tööriistaolekute massiiv, kuni 128 kirjet   |

Ettevalmistatud päringud kasutavad ühte kahest ülesvoolu lõpp-punktist
(`open-sse/executors/claude-web.ts:203`):

- Uus või jätkuvoor saadetakse aadressile
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Korduskatse saadetakse aadressile
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Uus voor sisaldab välja `create_conversation_params`. Vahemällu salvestatud või selgesõnaliselt lingitud jätkuvoor
sisaldab välja `parent_message_uuid` ja jätab välja `create_conversation_params`. Korduskatse nõuab nii
vestluse kui ka eelmise sõnumi olekut ega saada viipa
(`open-sse/executors/claude-web/session.ts:254`). Uued vestlused avavad autenditud
kasutajaliidese aadressil `/new`; vahemällu salvestatud või selgesõnaliselt lingitud jätkuvoorud avavad täpse vestluslehe
(`open-sse/executors/claude-web/session.ts:324`).

Vestluse olek on mälusisene vahemälu, mille võtmeks on SHA-256 konto ulatus ja kanooniline
kutsuja transkript. Kirjed aeguvad 30 minuti pärast ja vahemälu maht on piiratud 5000 kirjega
(`open-sse/executors/claude-web/session.ts:12`). Olek kinnitatakse alles pärast seda, kui range
vooparser tuvastab `message_stop`; protsessi taaskäivitamisel see hüljatakse. Vahemälutõrke korral
jadastatakse mitme sõnumiga päring üheks taasteviibaks, selle asemel et varasemad
sõnumid vaikimisi kõrvale jätta.

Lokaat ja ajavöönd kasutavad järgmist eelistusjärjekorda: päringu `claude_web` väärtus, ühenduse väärtus,
käitusaja väärtus ning seejärel lokaadi puhul `en-US` või ajavööndi puhul `UTC`
(`open-sse/executors/claude-web/session.ts:218`).

### Tööriistad ja päringu kasulikud andmed

Otsepäringud teisendavad ainult kutsuja esitatud struktuuriliselt kehtivaid OpenAI funktsioonitööriistu.
Väljamõeldud staatilist vaiketööriistade loendit ei ole
(`open-sse/executors/claude-web/payload.ts:102`).

Brauseripäringud hõivavad selle asemel autenditud kasutajaliidese päringu ning säilitavad selle konto tööriistad,
tööriistaolekud ja isikupärastatud stiilid. Ettevalmistatud vestluse, mudeli, arutluskäigu, viiba ja
sõnumi UUID väljad kirjutavad hõivatud päringu siiski üle
(`open-sse/executors/claude-web/browserTransport.ts:175`). Brauserimallid on piiritletud
konto, organisatsiooni, küpsise, lokaadi ja ajavööndi räsi järgi ning aeguvad 30 minuti pärast
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Kui otsepäringul pole kutsuja
tööriistu, saab see piiritletud malli taaskasutada; selgesõnaliselt esitatud kutsuja tööriistadel on eelis
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transpordi valimine

Vaiketee on `sendClaudeWebDirect()`, mis kutsub konfigureeritud
Chrome 146 profiili ja esitatud küpsisega välja `tlsFetchClaude()` (`open-sse/services/claudeTlsClient.ts:23`). See ei
käivita lahendajat ega loo asendusküpsist.

Määrake `WEB_COOKIE_USE_BROWSER` väärtuseks `1`, `true` või `on`, et muuta kontopõhine brauseriadapter peamiseks transpordiks. Määrake `OMNIROUTE_BROWSER_POOL` üheks neist samadest väärtustest, et tuvastatud Cloudflare'i 403-väljakutse korral saaks otsetranspordilt brauseriadapterile üle minna (`open-sse/executors/claude-web.ts:195`). Muud HTTP-tõrked seda varumehhanismi ei käivita.

Brauseriadapter hoiab küpsiseid samas ühiskasutatavas Playwrighti kontekstis, kasutab eespool kirjeldatud ulatusega räsivõtit ja saadab vastuse sellest kontekstist (`open-sse/executors/claude-web/browserTransport.ts:444`). See ei ekspordi brauseris lahendatud küpsist kunagi otse TLS-kliendile. Brauseri korduskatsed nõuavad aegumata kasutajaliidese malli, mis on seotud sama tegeliku Playwrighti kontekstiga (`open-sse/executors/claude-web/browserTransport.ts:467`). Brauser loeb vastuseid autenditud lehel järk-järgult, arvestab päringu tühistamisega ja tühistab ülesvoolu vastusekeha kohe, kui selle maht ületab 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Täitur tagastab jagatud päringulogijale redigeeritud auditivaate: organisatsiooni, vestluse ja sõnumite UUID-d, viiba tekst, tööriistade definitsioonid, küpsised ning seadmeidentifikaatorid jäetakse välja (`open-sse/executors/claude-web.ts:237`, `open-sse/executors/claude-web.ts:252`). Transpordierandid tagastavad visatud erandi sõnumi asemel samuti üldise ühendusevea.

### SSE käitumine

`createClaudeWebResponse()` töötleb LF- või CRLF-raamistust ja mitmerealisi `data:` välju. See vastendab tekstimuudatused väljale `content`, mõttekäigu muudatused väljale `reasoning_content` ja teadaolevad metaandmesündmused vastuse laiendile `claude_web`. Iga metaandmesündmus projitseeritakse oma väljade lubatud loendi kaudu (`open-sse/executors/claude-web/stream.ts:37`). Vestluse, emasõnumi, assistendi sõnumi ja toimingu metaandmed tagastatakse ka `X-OmniRoute-Claude-Web-*` päistes (`open-sse/executors/claude-web/stream.ts:364`).

Parser katkestab töö turvaliselt vigase JSON-i, ülesvoolu `error`-sündmuste, tundmatute sündmusetüüpide, vale järjestuse, sisuplokkide mittevastavuse või enne `message_stop` sündmust saabunud EOF-i korral. Voogedastus väljastab ühe lõpetamispaketi ja ühe `[DONE]`-sõnumi; puhverdatud väljund kasutab sama parserit. Parser käsitleb `message_stop` sündmust kohe lõppsündmusena, tühistab järgnevad ülesvooluandmed ja edastab allavoolu tühistamise ülesvoolu lugejale (`open-sse/executors/claude-web/stream.ts:461`, `open-sse/executors/claude-web/stream.ts:563`). Lõpetamata SSE-ridade ja kogunenud sündmuste mahupiirang on 1 MiB (`open-sse/executors/claude-web/stream.ts:17`, `open-sse/executors/claude-web/stream.ts:62`).

### Failid

| Fail                                                     | Otstarve                                      |
| -------------------------------------------------------- | --------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Staatiline teenusepakkuja mudeliregister      |
| `open-sse/executors/claude-web.ts`                       | Täituri orkestreerimine                       |
| `open-sse/executors/claude-web/payload.ts`               | Kasuliku koormuse ja tööriistade teisendamine |
| `open-sse/executors/claude-web/session.ts`               | Vooru olek ja transkriptsioonipuhver          |
| `open-sse/executors/claude-web/transport.ts`             | Otsetranspordi adapter                        |
| `open-sse/executors/claude-web/browserTransport.ts`      | Kontopõhine brauseriadapter                   |
| `open-sse/executors/claude-web/stream.ts`                | Range SSE teisendus                           |
| `open-sse/services/claudeTlsClient.ts`                   | Süsteemne TLS-transport                       |
| `open-sse/services/browserPool.ts`                       | Ühiskasutatavad Playwrighti kontekstid        |

### Testimine

Käivitage deterministlik Claude Webi testikomplekt ilma tegelike identimisteaveteta:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Playwrightist sõltuvad testjuhud failis `tests/unit/claude-web-auto-refresh.test.ts` jäetakse otseselt vahele. See hoidla ei määra praegu identimisteavet kasutavat Claude Webi reaalajas testimise skripti, mistõttu ei tõesta vahele jäetud testjuhud käitusaegset toimimist.

### Seadistamine

1. Käivitage OmniRoute käsuga `npm run dev` või kompileeritud paigaldusest.
2. Avage Dashboard → Providers → Add Provider.
3. Valige kategooria Web Cookie ja Claude Web.
4. Kleepige autenditud `claude.ai` päringust kopeeritud täielik Cookie-päis.
