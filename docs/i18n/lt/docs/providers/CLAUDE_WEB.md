# Providers — Claude Web (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` siunčia OpenAI formato pokalbių užklausas per autentifikuotą `claude.ai`
naršyklės sesiją. Vykdyklė normalizuoja pateiktą slapuką, nustato vieną autentifikuotą
organizaciją, paruošia pokalbio būseną, pasirenka tiesioginį arba naršyklės transportą ir
griežtai transformuoja iš pirminio šaltinio gautą SSE atsakymą. Orkestravimo logika yra
`open-sse/executors/claude-web.ts:320`.

> **Pirmą kartą naudojate žiniatinklio slapukų teikėjus?**
>
> Prieš vadovaudamiesi šiuo konkrečiam teikėjui skirtu vadovu, perskaitykite **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, kuriame aprašytas bendras sąrankos procesas, autentifikavimo rekomendacijos, apribojimai ir trikčių šalinimas.

### Modelių katalogas

Šiuo metu teikėjų registras pateikia būtent šiuos septynis statinius modelių ID
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Modelio ID                  | Rodomas pavadinimas              |
| --------------------------- | -------------------------------- |
| `claude-fable-5`            | Claude Fable 5 (žiniatinklis)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (žiniatinklis)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (žiniatinklis)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (žiniatinklis)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (žiniatinklis)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (žiniatinklis)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (žiniatinklis) |

Dinaminis modelių aptikimas šiam teikėjui neįgyvendintas. Pirmiau pateiktas sąrašas yra
vykdymo metu naudojamas katalogas.

### Prisijungimo duomenys ir organizacijos nustatymas

Pateikite visą `claude.ai` Cookie antraštę arba tik sesijos reikšmę. Atskiros reikšmės
normalizuojamos į `sessionKey`; jei pateikiami kiti slapukai, jie išsaugomi. Vykdyklė priima
slapuką per `cookie` arba `apiKey` ir iš ryšio duomenų nuskaito pasirenkamas `deviceId` bei
`orgId` reikšmes
(`open-sse/executors/claude-web.ts:72`).

Jei `orgId` nėra, vykdyklė iškviečia `GET https://claude.ai/api/organizations` ir naudoja pirmą
organizaciją, kurią grąžina autentifikuota Claude Web sesija
(`open-sse/executors/claude-web.ts:141`). Jei negrąžinama jokia tinkama organizacija, vykdymas
saugiai nutraukiamas; atmesta sesijos autorizacija pateikiama kaip 401, o Cloudflare iššūkis
atskiriamas nuo autentifikavimo klaidos.

### Pokalbių operacijos

Pasirenkamas aukščiausio lygio `claude_web` objektas yra griežtas. Nežinomi laukai atmetami. Jo
priimami laukai apibrėžti `open-sse/executors/claude-web/session.ts:50`:

| Laukas                | Reikšmė                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `operation`           | Numatytoji reikšmė – `completion`; pakartotiniam bandymui naudokite `retry` |
| `conversation_id`     | Aiškiai nurodytas esamo pokalbio UUID                                       |
| `parent_message_uuid` | Aiškiai nurodytas pirminio asistento pranešimo UUID                         |
| `timezone`            | Tinkamas IANA laiko juostos pavadinimas                                     |
| `locale`              | Struktūriškai tinkama lokalė                                                |
| `tool_states`         | Pasirenkamas paskyros įrankių būsenų masyvas, ne daugiau kaip 128 įrašai    |

Paruoštose užklausose naudojamas vienas iš dviejų pirminio šaltinio galinių taškų
(`open-sse/executors/claude-web.ts:203`):

- Nauja arba tęstinė sąveika siunčiama į
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Pakartotinis bandymas siunčiamas į
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Naujoje sąveikoje įtraukiamas `create_conversation_params`. Iš podėlio paimtoje arba aiškiai
susietoje tęstinėje sąveikoje įtraukiamas `parent_message_uuid`, o
`create_conversation_params` praleidžiamas. Pakartotiniam bandymui būtina ir pokalbio, ir
pirminio pranešimo būsena, o raginimas nesiunčiamas
(`open-sse/executors/claude-web/session.ts:254`). Nauji pokalbiai autentifikuotoje naudotojo
sąsajoje atidaromi adresu `/new`; iš podėlio paimtos arba aiškiai susietos tęstinės sąveikos
atveria tikslų pokalbio puslapį
(`open-sse/executors/claude-web/session.ts:324`).

Pokalbio būsena saugoma atminties podėlyje, kurio raktą sudaro SHA-256 paskyros sritis ir
kanoninė kviečiančiosios šalies pokalbio išklotinė. Įrašai nustoja galioti po 30 minučių, o
podėlyje gali būti ne daugiau kaip 5 000 įrašų
(`open-sse/executors/claude-web/session.ts:12`). Būsena patvirtinama tik tada, kai griežtas
srauto analizatorius aptinka `message_stop`; paleidus procesą iš naujo, ji prarandama. Jei
podėlyje įrašo nėra, kelių pranešimų užklausa nuoseklizuojama į vieną atkūrimo raginimą,
užuot tyliai atmetus ankstesnius pranešimus.

Lokalei ir laiko juostai taikoma tokia pirmenybės tvarka: užklausos `claude_web` reikšmė,
ryšio reikšmė, vykdymo aplinkos reikšmė, tada `en-US` lokalei arba `UTC` laiko juostai
(`open-sse/executors/claude-web/session.ts:218`).

### Įrankiai ir užklausų naudingieji duomenys

Tiesioginės užklausos transformuoja tik struktūriškai tinkamus OpenAI funkcijų įrankius,
kuriuos pateikia kviečiančioji šalis. Išgalvotas statinis numatytųjų įrankių sąrašas
nesukuriamas
(`open-sse/executors/claude-web/payload.ts:102`).

Naršyklės užklausos vietoje to perima autentifikuotos naudotojo sąsajos užklausą ir išlaiko jos
paskyros įrankius, įrankių būsenas bei suasmenintus stilius. Paruošto pokalbio, modelio,
samprotavimo, raginimo ir pranešimo UUID laukai vis tiek pakeičia perimtos užklausos laukus
(`open-sse/executors/claude-web/browserTransport.ts:175`). Naršyklės šablonų taikymo sritis
nustatoma pagal paskyros, organizacijos, slapuko, lokalės ir laiko juostos maišos reikšmę, o
patys šablonai nustoja galioti po 30 minučių
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Kai tiesioginėje užklausoje nėra
kviečiančiosios šalies įrankių, ji gali pakartotinai naudoti tą konkrečiai sričiai skirtą
šabloną; aiškiai pateikti kviečiančiosios šalies įrankiai turi pirmenybę
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transporto pasirinkimas

Numatytasis kelias yra `sendClaudeWebDirect()`, kuris iškviečia `tlsFetchClaude()` naudodamas
sukonfigūruotą Chrome 146 profilį ir pateiktą slapuką
(`open-sse/services/claudeTlsClient.ts:23`). Jis nepaleidžia iššūkių sprendimo priemonės ir
negeneruoja pakaitinio slapuko.

Nustatykite `WEB_COOKIE_USE_BROWSER` į `1`, `true` arba `on`, kad paskyros aprėpties naršyklės
adapteris taptų pagrindiniu transportu. Nustatykite `OMNIROUTE_BROWSER_POOL` į vieną iš tų pačių
reikšmių, kad atpažinus Cloudflare 403 iššūkį būtų galima nuo tiesioginio transporto pereiti prie
naršyklės adapterio (`open-sse/executors/claude-web.ts:195`). Kitos HTTP klaidos tokio perėjimo
nesuaktyvina.

Naršyklės adapteris saugo slapukus tame pačiame bendrinamame Playwright kontekste, naudoja pirmiau
aprašytą aprėpties maišos raktą ir siunčia užbaigimo rezultatą iš to konteksto
(`open-sse/executors/claude-web/browserTransport.ts:444`). Jis niekada neeksportuoja naršyklėje
gauto slapuko į tiesioginį TLS klientą. Pakartotiniams naršyklės bandymams reikalingas nepasibaigusio
galiojimo UI šablonas, susietas su tuo pačiu faktiniu Playwright kontekstu
(`open-sse/executors/claude-web/browserTransport.ts:467`). Naršyklės atsakymai autentifikuotame
puslapyje skaitomi palaipsniui, atsižvelgiama į užklausos atšaukimą, o pirminio šaltinio atsakymo
turinys atšaukiamas iškart, kai jo dydis viršija 16 MiB
(`open-sse/executors/claude-web/browserTransport.ts:259`).

Vykdyklė bendrinamai užklausų registravimo sistemai grąžina nuasmenintą audito projekciją:
organizacijos, pokalbio ir pranešimų UUID, raginimo tekstas, įrankių apibrėžtys, slapukai ir
įrenginių identifikatoriai neįtraukiami (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Įvykus transporto išimtims taip pat grąžinama bendro
pobūdžio ryšio klaida, o ne išmestas pranešimas.

### SSE veikimas

`createClaudeWebResponse()` apdoroja LF arba CRLF įrėminimą ir kelių eilučių `data:` laukus. Teksto
deltas jis susieja su `content`, samprotavimo deltas – su `reasoning_content`, o žinomus metaduomenų
įvykius – su atsakymo plėtiniu `claude_web`. Kiekvienas metaduomenų įvykis projektuojamas pagal
atskirą jam leidžiamų laukų sąrašą (`open-sse/executors/claude-web/stream.ts:37`). Pokalbio,
pirminio pranešimo, asistento pranešimo ir operacijos metaduomenys taip pat grąžinami
`X-OmniRoute-Claude-Web-*` antraštėse (`open-sse/executors/claude-web/stream.ts:364`).

Analizatorius saugiai nutraukia darbą aptikęs netinkamai suformuotą JSON, pirminio šaltinio `error`
įvykius, nežinomus įvykių tipus, netinkamą eiliškumą, turinio blokų neatitikimus arba EOF prieš
`message_stop`. Srautiniu režimu išvedamas vienas užbaigimo fragmentas ir vienas `[DONE]`; buferinė
išvestis naudoja tą patį analizatorių. Analizatorius `message_stop` iškart laiko baigiamuoju įvykiu,
atšaukia tolesnius pirminio šaltinio duomenis ir perduoda galutinio gavėjo atšaukimą pirminio
šaltinio skaitytuvui (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Neužbaigtoms SSE eilutėms ir sukauptiems įvykiams
taikoma 1 MiB riba (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Failai

| Failas                                                   | Paskirtis                                 |
| -------------------------------------------------------- | ----------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statinis teikėjo modelių registras        |
| `open-sse/executors/claude-web.ts`                       | Vykdyklės koordinavimas                   |
| `open-sse/executors/claude-web/payload.ts`               | Naudingosios apkrovos ir įrankių keitimas |
| `open-sse/executors/claude-web/session.ts`               | Eigos būsena ir transkripcijos podėlis    |
| `open-sse/executors/claude-web/transport.ts`             | Tiesioginio transporto adapteris          |
| `open-sse/executors/claude-web/browserTransport.ts`      | Paskyros aprėpties naršyklės adapteris    |
| `open-sse/executors/claude-web/stream.ts`                | Griežtas SSE vertimas                     |
| `open-sse/services/claudeTlsClient.ts`                   | Savitasis TLS transportas                 |
| `open-sse/services/browserPool.ts`                       | Bendrinami Playwright kontekstai          |

### Testavimas

Paleiskite deterministinį Claude Web testų rinkinį be tikrų prisijungimo duomenų:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Nuo Playwright priklausantys atvejai faile `tests/unit/claude-web-auto-refresh.test.ts` yra aiškiai
praleidžiami. Šiuo metu šioje saugykloje nėra apibrėžto Claude Web tiesioginio testavimo scenarijaus
su prisijungimo duomenimis, todėl šie praleisti atvejai nėra veikimo vykdymo aplinkoje įrodymas.

### Sąranka

1. Paleiskite OmniRoute naudodami `npm run dev` arba įdiegtą sukompiliuotą versiją.
2. Atidarykite Dashboard → Providers → Add Provider.
3. Pasirinkite Web Cookie kategoriją ir Claude Web.
4. Įklijuokite visą Cookie antraštę, nukopijuotą iš autentifikuotos `claude.ai` užklausos.
