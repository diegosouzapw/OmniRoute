# Providers — Claude Web (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` nosūta OpenAI formāta tērzēšanas pieprasījumus, izmantojot autentificētu `claude.ai`
pārlūkprogrammas sesiju. Izpildītājs normalizē norādīto sīkfailu, nosaka vienu autentificētu
organizāciju, sagatavo sarunas stāvokli, atlasa tiešo vai pārlūkprogrammas transportu un
stingri pārveido augšupstraumes SSE atbildi. Orķestrācija atrodas
`open-sse/executors/claude-web.ts:320`.

> **Vai tīmekļa sīkfailu nodrošinātāji jums ir jaunums?**
>
> Pirms turpināt ar šo nodrošinātājam specifisko ceļvedi, izlasiet **`docs/getting-started/WEB-COOKIE-GUIDE.md`**, lai iepazītos ar vispārējo iestatīšanas procesu, autentifikācijas norādījumiem, ierobežojumiem un problēmu novēršanu.

### Modeļu katalogs

Nodrošinātāju reģistrs pašlaik piedāvā tieši šos septiņus statiskos modeļu ID
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Modeļa ID                   | Attēlojamais nosaukums       |
| --------------------------- | ---------------------------- |
| `claude-fable-5`            | Claude Fable 5 (tīmeklis)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (tīmeklis)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (tīmeklis)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (tīmeklis)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (tīmeklis)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (tīmeklis)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (tīmeklis) |

Šim nodrošinātājam dinamiska modeļu atklāšana nav ieviesta. Iepriekš minētais saraksts ir
izpildlaika katalogs.

### Akreditācijas dati un organizācijas noteikšana

Norādiet pilnu `claude.ai` Cookie galveni vai tikai sesijas vērtību. Atsevišķas vērtības tiek
normalizētas uz `sessionKey`; citi sīkfaili, ja tādi ir norādīti, tiek saglabāti. Izpildītājs pieņem
sīkfailu, izmantojot `cookie` vai `apiKey`, un
nolasa neobligātās `deviceId` un `orgId` vērtības no savienojuma datiem
(`open-sse/executors/claude-web.ts:72`).

Ja `orgId` nav norādīts, izpildītājs izsauc `GET https://claude.ai/api/organizations` un izmanto pirmo
organizāciju, ko atgriež autentificētā Claude Web sesija
(`open-sse/executors/claude-web.ts:141`). Ja netiek atgriezta neviena derīga organizācija,
izpilde tiek droši pārtraukta; noraidīta sesijas autorizācija tiek ziņota ar 401, un Cloudflare
pārbaude tiek nošķirta no autentifikācijas kļūmes.

### Sarunas darbības

Neobligātais augstākā līmeņa objekts `claude_web` ir stingri definēts. Nezināmi lauki tiek noraidīti. Tā
pieņemtie lauki ir definēti `open-sse/executors/claude-web/session.ts:50`:

| Lauks                 | Nozīme                                                                   |
| --------------------- | ------------------------------------------------------------------------ |
| `operation`           | Pēc noklusējuma `completion`; atkārtotam mēģinājumam izmantojiet `retry` |
| `conversation_id`     | Skaidri norādīts UUID esošai sarunai                                     |
| `parent_message_uuid` | Skaidri norādīts UUID vecākziņojuma asistenta ziņojumam                  |
| `timezone`            | Derīgs IANA laika joslas nosaukums                                       |
| `locale`              | Strukturāli derīga lokalizācija                                          |
| `tool_states`         | Neobligāts konta rīku stāvokļu masīvs, ne vairāk kā 128 ieraksti         |

Sagatavotie pieprasījumi izmanto vienu no diviem augšupstraumes galapunktiem
(`open-sse/executors/claude-web.ts:203`):

- Jauns vai turpinājuma solis tiek nosūtīts uz
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Atkārtots mēģinājums tiek nosūtīts uz
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Jauns solis ietver `create_conversation_params`. Kešatmiņā saglabāts vai skaidri saistīts turpinājums
ietver `parent_message_uuid` un izlaiž `create_conversation_params`. Atkārtotam mēģinājumam ir nepieciešams gan
sarunas, gan vecākziņojuma stāvoklis, un tas nesūta uzvedni
(`open-sse/executors/claude-web/session.ts:254`). Jaunas sarunas autentificētajā
lietotāja saskarnē tiek atvērtas adresē `/new`; kešatmiņā saglabāti vai skaidri saistīti turpinājumi atver precīzo sarunas lapu
(`open-sse/executors/claude-web/session.ts:324`).

Sarunas stāvoklis ir atmiņā glabāta kešatmiņa, kuras atslēgas veido SHA-256 konta tvērums un kanoniskais
izsaucēja transkripts. Ierakstu derīgums beidzas pēc 30 minūtēm, un kešatmiņas apjoms ir ierobežots līdz 5 000 ierakstiem
(`open-sse/executors/claude-web/session.ts:12`). Stāvoklis tiek saglabāts tikai pēc tam, kad stingrais
straumes parsētājs konstatē `message_stop`; procesa restartēšana to dzēš. Ja kešatmiņā nav atbilstības,
vairāku ziņojumu pieprasījums tiek serializēts vienā atkopšanas uzvednē, nevis klusējot atmetot
iepriekšējos ziņojumus.

Lokalizācijai un laika joslai tiek izmantota šāda prioritāte: pieprasījuma `claude_web` vērtība, savienojuma vērtība,
izpildlaika vērtība, pēc tam lokalizācijai `en-US` vai laika joslai `UTC`
(`open-sse/executors/claude-web/session.ts:218`).

### Rīki un pieprasījumu lietderīgās slodzes

Tiešie pieprasījumi pārveido tikai strukturāli derīgus OpenAI funkciju rīkus, ko norādījis
izsaucējs. Netiek izveidots mākslīgs statisks noklusējuma rīku saraksts
(`open-sse/executors/claude-web/payload.ts:102`).

Savukārt pārlūkprogrammas pieprasījumi pārtver autentificētās lietotāja saskarnes pieprasījumu un saglabā tā konta rīkus,
rīku stāvokļus un personalizētos stilus. Sagatavotie sarunas, modeļa, argumentācijas, uzvednes un
ziņojuma UUID lauki joprojām pārraksta pārtverto pieprasījumu
(`open-sse/executors/claude-web/browserTransport.ts:175`). Pārlūkprogrammas veidņu tvērumu nosaka
konta, organizācijas, sīkfaila, lokalizācijas un laika joslas jaucējvērtība, un to derīgums beidzas pēc 30 minūtēm
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Ja tiešajam pieprasījumam nav izsaucēja
rīku, tas var atkārtoti izmantot šo tvērumam piesaistīto veidni; skaidri norādītiem izsaucēja rīkiem ir prioritāte
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Transporta atlase

Noklusējuma ceļš ir `sendClaudeWebDirect()`, kas izsauc `tlsFetchClaude()` ar konfigurēto
Chrome 146 profilu un norādīto sīkfailu (`open-sse/services/claudeTlsClient.ts:23`). Tas
nepalaiž pārbaudes risinātāju un neizveido aizstājējsīkfailu.

Iestatiet `WEB_COOKIE_USE_BROWSER` uz `1`, `true` vai `on`, lai konta tvērumam piesaistītais pārlūkprogrammas adapteris kļūtu par primāro transportu. Iestatiet `OMNIROUTE_BROWSER_POOL` uz kādu no tām pašām vērtībām, lai atpazīta Cloudflare 403 izaicinājuma gadījumā varētu pārslēgties no tiešā transporta uz pārlūkprogrammas adapteri (`open-sse/executors/claude-web.ts:195`). Citas HTTP kļūmes neizraisa šādu pārslēgšanos.

Pārlūkprogrammas adapteris glabā sīkfailus tajā pašā koplietotajā Playwright kontekstā, izmanto iepriekš aprakstīto tvērumam piesaistīto jaukto atslēgu un nosūta pabeigšanas rezultātu no šī konteksta (`open-sse/executors/claude-web/browserTransport.ts:444`). Tas nekad neeksportē pārlūkprogrammā iegūtu sīkfailu uz tiešo TLS klientu. Atkārtotiem pārlūkprogrammas mēģinājumiem ir nepieciešama UI veidne ar nebeigušos derīguma termiņu, kas piesaistīta tam pašam faktiskajam Playwright kontekstam (`open-sse/executors/claude-web/browserTransport.ts:467`). Pārlūkprogrammas atbildes tiek lasītas pakāpeniski autentificētajā lapā, ievērojot pieprasījuma atcelšanu, un augšupstraumes pamatteksts tiek atcelts, tiklīdz tas pārsniedz 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Izpildītājs koplietotajam pieprasījumu žurnāla reģistrētājam atgriež rediģētu audita projekciju: organizācijas, sarunas un ziņojumu UUID, uzvednes teksts, rīku definīcijas, sīkfaili un ierīču identifikatori tiek izslēgti (`open-sse/executors/claude-web.ts:237`, `open-sse/executors/claude-web.ts:252`). Transporta izņēmumi arī atgriež vispārīgu savienojuma kļūdu, nevis izmestā izņēmuma ziņojumu.

### SSE darbība

`createClaudeWebResponse()` apstrādā LF vai CRLF kadrējumu un vairākrindu `data:` laukus. Tas kartē teksta izmaiņas uz `content`, domāšanas izmaiņas uz `reasoning_content`, bet zināmos metadatu notikumus — uz `claude_web` atbildes paplašinājumu. Katrs metadatu notikums tiek projicēts, izmantojot tam paredzētu lauku atļaušanas sarakstu (`open-sse/executors/claude-web/stream.ts:37`). Sarunas, vecākziņojuma, asistenta ziņojuma un operācijas metadati tiek atgriezti arī `X-OmniRoute-Claude-Web-*` galvenēs (`open-sse/executors/claude-web/stream.ts:364`).

Parsētājs pārtrauc apstrādi kļūdas gadījumā, ja ir nepareizi veidots JSON, augšupstraumes `error` notikumi, nezināmi notikumu tipi, nederīga secība, satura bloku neatbilstības vai EOF pirms `message_stop`. Straumēšanas izvade izvada vienu pabeigšanas fragmentu un vienu `[DONE]`; buferētā izvade izmanto to pašu parsētāju. Parsētājs nekavējoties uzskata `message_stop` par terminālu notikumu, atceļ atlikušos augšupstraumes datus un nodod lejupstraumes atcelšanu augšupstraumes lasītājam (`open-sse/executors/claude-web/stream.ts:461`, `open-sse/executors/claude-web/stream.ts:563`). Nepabeigtām SSE rindām un uzkrātajiem notikumiem ir noteikts 1 MiB ierobežojums (`open-sse/executors/claude-web/stream.ts:17`, `open-sse/executors/claude-web/stream.ts:62`).

### Faili

| Fails                                                    | Nolūks                                                |
| -------------------------------------------------------- | ----------------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statisks nodrošinātāja modeļu reģistrs                |
| `open-sse/executors/claude-web.ts`                       | Izpildītāja orķestrācija                              |
| `open-sse/executors/claude-web/payload.ts`               | Derīgās slodzes un rīku transformācija                |
| `open-sse/executors/claude-web/session.ts`               | Gājiena stāvoklis un transkripta kešatmiņa            |
| `open-sse/executors/claude-web/transport.ts`             | Tiešā transporta adapteris                            |
| `open-sse/executors/claude-web/browserTransport.ts`      | Konta tvērumam piesaistīts pārlūkprogrammas adapteris |
| `open-sse/executors/claude-web/stream.ts`                | Stingra SSE tulkošana                                 |
| `open-sse/services/claudeTlsClient.ts`                   | Iebūvētais TLS transports                             |
| `open-sse/services/browserPool.ts`                       | Koplietoti Playwright konteksti                       |

### Testēšana

Palaidiet deterministisko Claude Web testu komplektu bez īstiem akreditācijas datiem:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

No Playwright atkarīgie gadījumi failā `tests/unit/claude-web-auto-refresh.test.ts` tiek nepārprotami izlaisti. Šajā repozitorijā pašlaik nav definēts Claude Web reāllaika testa skripts ar akreditācijas datiem, tāpēc šie izlaistie gadījumi nav darbības izpildlaika pierādījums.

### Iestatīšana

1. Palaidiet OmniRoute ar `npm run dev` vai no kompilētas instalācijas.
2. Atveriet Informācijas panelis → Nodrošinātāji → Pievienot nodrošinātāju.
3. Atlasiet kategoriju Tīmekļa sīkfails un Claude Web.
4. Ielīmējiet pilno Cookie galveni, kas nokopēta no autentificēta `claude.ai` pieprasījuma.
