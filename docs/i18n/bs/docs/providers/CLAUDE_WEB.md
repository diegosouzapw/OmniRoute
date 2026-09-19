# CLAUDE_WEB (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

# Provajderi — Claude Web

## `claude-web`

`claude-web` šalje chat zahtjeve u OpenAI formatu kroz autentifikovanu `claude.ai` sesiju pretraživača. Izvršilac normalizuje dostavljeni kolačić, razrješava jednu autentifikovanu organizaciju, priprema stanje razgovora, bira direktni ili transport pretraživača i striktno prevodi uzvodni (upstream) SSE odgovor. Orkestracija se nalazi u `open-sse/executors/claude-web.ts:320`.

> **Novi ste u radu sa Web Cookie provajderima?**
>
> Pročitajte **`docs/getting-started/WEB-COOKIE-GUIDE.md`** za opšti proces podešavanja, smjernice za autentifikaciju, ograničenja i rješavanje problema prije nego što pratite ovaj vodič specifičan za provajdera.

### Katalog modela

Registrar provajdera trenutno izlaže tačno ovih sedam statičkih ID-ova modela (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Model ID                    | Prikazano ime           |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dinamičko otkrivanje modela nije implementirano za ovog provajdera. Lista iznad je runtime katalog.

### Akreditivi i razrješavanje organizacije

Dostavite ili puni `claude.ai` Cookie zaglavlje ili vrijednost gole sesije. Gole vrijednosti se normalizuju u `sessionKey`; ostali kolačići se čuvaju ako su dostavljeni. Izvršilac prihvata kolačić kroz `cookie` ili `apiKey` i čita opcione `deviceId` i `orgId` vrijednosti iz podataka o konekciji (`open-sse/executors/claude-web.ts:72`).

Ako `orgId` nedostaje, izvršilac poziva `GET https://claude.ai/api/organizations` i koristi prvu organizaciju koju vrati autentifikovana Claude Web sesija (`open-sse/executors/claude-web.ts:141`). Neuspješno se zatvara kada se ne vrati važeća organizacija, prijavljuje odbijenu autorizaciju sesije kao 401 i razlikuje Cloudflare izazov od neuspjeha autentifikacije.

### Operacije razgovora

Opcioni objekat najvišeg nivoa `claude_web` je striktan. Nepoznata polja se odbijaju. Njegova prihvaćena polja su definisana u `open-sse/executors/claude-web/session.ts:50`:

| Polje                 | Značenje                                                       |
| --------------------- | -------------------------------------------------------------- |
| `operation`           | `completion` po defaultu; koristite `retry` za ponovni pokušaj |
| `conversation_id`     | Eksplicitni UUID za postojeći razgovor                         |
| `parent_message_uuid` | Eksplicitni UUID za roditeljsku poruku asistenta               |
| `timezone`            | Važeće IANA ime vremenske zone                                 |
| `locale`              | Strukturno važeći lokalitet                                    |
| `tool_states`         | Opcioni niz stanja alata naloga, ograničen na 128 unosa        |

Pripremljeni zahtjevi koriste jedan od dva upstream krajnja tačka (`open-sse/executors/claude-web.ts:203`):

- Novi ili naknadni potez šalje POST zahtjev na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Ponovni pokušaj šalje POST zahtjev na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Novi potez uključuje `create_conversation_params`. Keširani ili eksplicitno povezani naknadni potez uključuje `parent_message_uuid` i izostavlja `create_conversation_params`. Ponovni pokušaj zahtijeva stanje razgovora i roditeljske poruke i ne šalje prompt (`open-sse/executors/claude-web/session.ts:254`). Novi razgovori otvaraju autentifikovani UI na `/new`; keširani ili eksplicitno povezani naknadni potezi otvaraju tačnu stranicu razgovora (`open-sse/executors/claude-web/session.ts:324`).

Stanje razgovora je keš u memoriji ključiran SHA-256 opsegom naloga i kanonskim transkriptom pozivaoca. Unosi ističu nakon 30 minuta, a keš je ograničen na 5.000 unosa (`open-sse/executors/claude-web/session.ts:12`). Stanje se potvrđuje (commit) tek nakon što striktni parser strima uoči `message_stop`; ponovno pokretanje procesa ga odbacuje. U slučaju promašaja keša, zahtjev sa više poruka se serijalizuje u jedan prompt za oporavak umjesto tihog odbacivanja ranijih poruka.

Lokalitet i vremenska zona koriste sljedeći prioritet: vrijednost zahtjeva `claude_web`, vrijednost konekcije, runtime vrijednost, zatim `en-US` za lokalitet ili `UTC` za vremensku zonu (`open-sse/executors/claude-web/session.ts:218`).

### Alati i payload-ovi zahtjeva

Direktni zahtjevi transformišu samo strukturno važeće OpenAI funkcijske alate koje je dostavio pozivalac. Ne postoji fabrikovana statička lista podrazumijevanih alata (`open-sse/executors/claude-web/payload.ts:102`).

Zahtjevi pretraživača umjesto toga hvataju autentifikovani UI zahtjev i zadržavaju njegove alate naloga, stanja alata i personalizovane stilove. Pripremljena polja razgovora, modela, rezonovanja, prompta i UUID-a poruke i dalje nadjačavaju uhvaćeni zahtjev (`open-sse/executors/claude-web/browserTransport.ts:175`). Šabloni pretraživača su ograničeni hešom naloga, organizacije, kolačića, lokaliteta i vremenske zone i ističu nakon 30 minuta (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Kada direktni zahtjev nema alate pozivaoca, može ponovo koristiti taj ograničeni šablon; eksplicitni alati pozivaoca imaju prioritet (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Odabir transporta

Podrazumijevana putanja je `sendClaudeWebDirect()`, koja poziva `tlsFetchClaude()` sa konfigurisanim Chrome 146 profilom i dostavljenim kolačićem (`open-sse/services/claudeTlsClient.ts:23`). Ne pokreće solver niti proizvodi zamjenski kolačić.

Postavite `WEB_COOKIE_USE_BROWSER` na `1`, `true` ili `on` kako bi adapter pretraživača vezan za nalog postao primarni transport. Postavite `OMNIROUTE_BROWSER_POOL` na jednu od istih vrijednosti kako biste omogućili da prepoznati Cloudflare 403 izazov pređe sa direktnog transporta na adapter pretraživača (`open-sse/executors/claude-web.ts:195`). Ostale HTTP greške ne pokreću taj prelazak.

Adapter pretraživača čuva kolačiće unutar istog udruženog Playwright konteksta, koristi gore opisani heširani ključ sa opsegom i šalje završetak iz tog konteksta (`open-sse/executors/claude-web/browserTransport.ts:444`). On nikada ne izvozi kolačić riješen u pretraživaču u direktni TLS klijent. Ponovni pokušaji pretraživača zahtijevaju neistekli UI šablon vezan za isti stvarni Playwright kontekst (`open-sse/executors/claude-web/browserTransport.ts:467`). Čitanja odgovora pretraživača se izvršavaju inkrementalno na autentifikovanoj stranici, poštuju otkazivanje zahtjeva i otkazuju uzvodno tijelo čim ono premaši 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Izvršilac vraća redigovanu revizorsku projekciju zajedničkom evidentatoru zahtjeva: organizacija, UUID-ovi konverzacije i poruke, tekst upita, definicije alata, kolačići i identifikatori uređaja su isključeni (`open-sse/executors/claude-web.ts:237`, `open-sse/executors/claude-web.ts:252`). Izuzeci transporta takođe vraćaju generičku grešku povezivanja umjesto bačene poruke.

### SSE ponašanje

`createClaudeWebResponse()` rukuje LF ili CRLF kadriranjem i višelinijskim `data:` poljima. On mapira tekstualne delte u `content`, delte razmišljanja u `reasoning_content`, a poznate događaje metapodataka u `claude_web` ekstenziju odgovora. Svaki događaj metapodataka se projektuje kroz sopstvenu listu dozvoljenih polja (`open-sse/executors/claude-web/stream.ts:37`). Metapodaci konverzacije, roditeljske poruke, poruke asistenta i operacije se takođe vraćaju u `X-OmniRoute-Claude-Web-*` zaglavljima (`open-sse/executors/claude-web/stream.ts:364`).

Parser prekida rad pri loše formatiranom JSON-u, uzvodnim `error` događajima, nepoznatim tipovima događaja, nevažećem redoslijedu, neusklađenostima blokova sadržaja ili EOF-u prije `message_stop`. Streaming izlaz emituje jedan završni dio i jedan `[DONE]`; baferovani izlaz koristi isti parser. Parser tretira `message_stop` kao terminalni odmah, otkazuje prateće uzvodne podatke i propagira otkazivanje nizvodno do uzvodnog čitača (`open-sse/executors/claude-web/stream.ts:461`, `open-sse/executors/claude-web/stream.ts:563`). Neokončane SSE linije i akumulirani događaji su ograničeni na 1 MiB (`open-sse/executors/claude-web/stream.ts:17`, `open-sse/executors/claude-web/stream.ts:62`).

### Datoteke

| Datoteka                                                 | Namjena                                |
| -------------------------------------------------------- | -------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statički registar modela provajdera    |
| `open-sse/executors/claude-web.ts`                       | Orkestracija izvršioca                 |
| `open-sse/executors/claude-web/payload.ts`               | Transformacija korisnog tereta i alata |
| `open-sse/executors/claude-web/session.ts`               | Stanje razmjene i keš transkripta      |
| `open-sse/executors/claude-web/transport.ts`             | Adapter direktnog transporta           |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adapter pretraživača vezan za nalog    |
| `open-sse/executors/claude-web/stream.ts`                | Stroga SSE translacija                 |
| `open-sse/services/claudeTlsClient.ts`                   | Izvorni TLS transport                  |
| `open-sse/services/browserPool.ts`                       | Udruženi Playwright konteksti          |

### Testiranje

Pokrenite deterministički Claude Web paket bez stvarnih akreditiva:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Slučajevi koji zavise od Playwright-a u `tests/unit/claude-web-auto-refresh.test.ts` su eksplicitno preskočeni. Ovo spremište trenutno ne definiše Claude Web skriptu za testiranje uživo sa akreditivima, tako da ti preskočeni slučajevi nisu potvrda u vrijeme izvršavanja.

### Podešavanje

1. Pokrenite OmniRoute sa `npm run dev` ili instaliranom verzijom.
2. Otvorite Dashboard → Providers → Add Provider.
3. Izaberite kategoriju Web Cookie i Claude Web.
4. Nalijepite puno zaglavlje Cookie kopirano iz autentifikovanog `claude.ai` zahtjeva.
