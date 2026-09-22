# Providers — Claude Web (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` šalje zahtjeve za chat u OpenAI formatu putem autentificirane sesije preglednika `claude.ai`. Izvršitelj normalizira dostavljeni kolačić, pronalazi jednu autentificiranu organizaciju, priprema stanje razgovora, odabire direktni transport ili transport putem preglednika te strogo prevodi uzvodni SSE odgovor. Orkestracija se nalazi u `open-sse/executors/claude-web.ts:320`.

> **Novi ste u korištenju pružalaca Web Cookie usluga?**
>
> Prije nego što slijedite ovaj vodič specifičan za pružaoca, pročitajte **`docs/getting-started/WEB-COOKIE-GUIDE.md`** radi općeg postupka postavljanja, smjernica za autentifikaciju, ograničenja i rješavanja problema.

### Katalog modela

Registar pružalaca trenutno izlaže tačno ovih sedam statičkih ID-ova modela (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modela                   | Naziv za prikaz         |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dinamičko otkrivanje modela nije implementirano za ovog pružaoca. Gornji spisak predstavlja katalog u vrijeme izvođenja.

### Vjerodajnice i određivanje organizacije

Dostavite cijelo Cookie zaglavlje za `claude.ai` ili samo vrijednost sesije. Same vrijednosti normaliziraju se u `sessionKey`; ostali kolačići se zadržavaju ako su dostavljeni. Izvršitelj prihvata kolačić putem `cookie` ili `apiKey` i čita opcionalne vrijednosti `deviceId` i `orgId` iz podataka o vezi (`open-sse/executors/claude-web.ts:72`).

Ako `orgId` nije prisutan, izvršitelj poziva `GET https://claude.ai/api/organizations` i koristi prvu organizaciju koju vrati autentificirana Claude Web sesija (`open-sse/executors/claude-web.ts:141`). Zahtjev se odbija ako nije vraćena nijedna važeća organizacija, odbijena autorizacija sesije prijavljuje se kao 401, a Cloudflare provjera razlikuje se od neuspješne autentifikacije.

### Operacije razgovora

Opcionalni objekt najvišeg nivoa `claude_web` je strog. Nepoznata polja se odbijaju. Njegova prihvaćena polja definirana su u `open-sse/executors/claude-web/session.ts:50`:

| Polje                 | Značenje                                                        |
| --------------------- | --------------------------------------------------------------- |
| `operation`           | Zadano je `completion`; koristite `retry` za ponovljeni pokušaj |
| `conversation_id`     | Eksplicitni UUID postojećeg razgovora                           |
| `parent_message_uuid` | Eksplicitni UUID nadređene poruke asistenta                     |
| `timezone`            | Važeći naziv IANA vremenske zone                                |
| `locale`              | Strukturno važeći lokalitet                                     |
| `tool_states`         | Opcionalni niz stanja alata računa, ograničen na 128 unosa      |

Pripremljeni zahtjevi koriste jednu od dvije uzvodne krajnje tačke (`open-sse/executors/claude-web.ts:203`):

- Novi ili naknadni korak šalje se na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Ponovljeni pokušaj šalje se na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Novi korak uključuje `create_conversation_params`. Naknadni korak iz predmemorije ili eksplicitno povezani naknadni korak uključuje `parent_message_uuid` i izostavlja `create_conversation_params`. Ponovljeni pokušaj zahtijeva i stanje razgovora i stanje nadređene poruke te ne šalje upit (`open-sse/executors/claude-web/session.ts:254`). Novi razgovori otvaraju autentificirano korisničko sučelje na `/new`; naknadni koraci iz predmemorije ili eksplicitno povezani naknadni koraci otvaraju tačnu stranicu razgovora (`open-sse/executors/claude-web/session.ts:324`).

Stanje razgovora je predmemorija u memoriji čiji su ključevi opseg računa zasnovan na SHA-256 i kanonski transkript pozivaoca. Unosi ističu nakon 30 minuta, a predmemorija je ograničena na 5.000 unosa (`open-sse/executors/claude-web/session.ts:12`). Stanje se potvrđuje tek nakon što strogi parser toka uoči `message_stop`; ponovna pokretanja procesa ga odbacuju. Pri promašaju predmemorije, zahtjev s više poruka serijalizira se u jedan upit za oporavak umjesto tihog odbacivanja ranijih poruka.

Lokalitet i vremenska zona koriste sljedeći redoslijed prioriteta: vrijednost `claude_web` iz zahtjeva, vrijednost veze, vrijednost okruženja za izvršavanje, zatim `en-US` za lokalitet ili `UTC` za vremensku zonu (`open-sse/executors/claude-web/session.ts:218`).

### Alati i sadržaji zahtjeva

Direktni zahtjevi transformiraju samo strukturno važeće OpenAI funkcijske alate koje dostavi pozivalac. Ne postoji izmišljeni statički zadani spisak alata (`open-sse/executors/claude-web/payload.ts:102`).

Zahtjevi putem preglednika umjesto toga presreću zahtjev autentificiranog korisničkog sučelja i zadržavaju njegove alate računa, stanja alata i personalizirane stilove. Pripremljena polja razgovora, modela, rezonovanja, upita i UUID-a poruke i dalje imaju prednost nad presretnutim zahtjevom (`open-sse/executors/claude-web/browserTransport.ts:175`). Predlošci preglednika ograničeni su opsegom definisanim hashom računa, organizacije, kolačića, lokaliteta i vremenske zone te ističu nakon 30 minuta (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Kada direktni zahtjev nema alate pozivaoca, može ponovo koristiti taj predložak ograničenog opsega; eksplicitni alati pozivaoca imaju prednost (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Odabir transporta

Zadana putanja je `sendClaudeWebDirect()`, koja poziva `tlsFetchClaude()` s konfiguriranim profilom Chrome 146 i dostavljenim kolačićem (`open-sse/services/claudeTlsClient.ts:23`). Ona ne pokreće rješavač niti stvara zamjenski kolačić.

Postavite `WEB_COOKIE_USE_BROWSER` na `1`, `true` ili `on` kako bi preglednički adapter ograničen na račun bio primarni transport. Postavite `OMNIROUTE_BROWSER_POOL` na jednu od istih vrijednosti kako biste omogućili da prepoznati Cloudflare 403 izazov pređe s direktnog transporta na preglednički adapter (`open-sse/executors/claude-web.ts:195`). Drugi HTTP neuspjesi ne pokreću taj rezervni mehanizam.

Preglednički adapter čuva kolačiće unutar istog zajedničkog Playwright konteksta, koristi gore opisani heširani ključ ograničenog opsega i šalje dovršeni odgovor iz tog konteksta (`open-sse/executors/claude-web/browserTransport.ts:444`). Nikada ne izvozi kolačić koji je preglednik dobio rješavanjem izazova u direktni TLS klijent. Ponovni pokušaji putem preglednika zahtijevaju predložak korisničkog interfejsa koji nije istekao i koji je vezan za isti stvarni Playwright kontekst (`open-sse/executors/claude-web/browserTransport.ts:467`). Odgovori preglednika čitaju se inkrementalno na autentificiranoj stranici, poštuju otkazivanje zahtjeva i otkazuju tijelo uzvodnog odgovora čim premaši 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Izvršitelj vraća redigovanu revizijsku projekciju zajedničkom zapisivaču zahtjeva: UUID-ovi organizacije, razgovora i poruke, tekst upita, definicije alata, kolačići i identifikatori uređaja su isključeni (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Izuzeci transporta također vraćaju generičku grešku veze umjesto poruke izbačenog izuzetka.

### SSE ponašanje

`createClaudeWebResponse()` obrađuje LF ili CRLF uokvirivanje i višelinijska `data:` polja. Mapira tekstualne delte na `content`, delte razmišljanja na `reasoning_content`, a poznate događaje metapodataka na proširenje odgovora `claude_web`. Svaki događaj metapodataka projektuje se kroz vlastitu listu dozvoljenih polja (`open-sse/executors/claude-web/stream.ts:37`). Metapodaci razgovora, nadređene poruke, poruke asistenta i operacije također se vraćaju u `X-OmniRoute-Claude-Web-*` zaglavljima (`open-sse/executors/claude-web/stream.ts:364`).

Parser se sigurno zaustavlja u slučaju neispravnog JSON-a, uzvodnih `error` događaja, nepoznatih tipova događaja, neispravnog redoslijeda, nepodudaranja blokova sadržaja ili EOF-a prije `message_stop`. Izlaz u toku emitira jedan završni blok i jedan `[DONE]`; baferovani izlaz koristi isti parser. Parser tretira `message_stop` kao neposredni završetak, otkazuje preostale uzvodne podatke i prenosi nizvodno otkazivanje na uzvodni čitač (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Nezavršeni SSE redovi i akumulirani događaji ograničeni su na 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Datoteke

| Datoteka                                                 | Namjena                             |
| -------------------------------------------------------- | ----------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statički registar modela pružatelja |
| `open-sse/executors/claude-web.ts`                       | Orkestracija izvršitelja            |
| `open-sse/executors/claude-web/payload.ts`               | Transformacija sadržaja i alata     |
| `open-sse/executors/claude-web/session.ts`               | Stanje poteza i keš transkripta     |
| `open-sse/executors/claude-web/transport.ts`             | Adapter direktnog transporta        |
| `open-sse/executors/claude-web/browserTransport.ts`      | Preglednički adapter vezan za račun |
| `open-sse/executors/claude-web/stream.ts`                | Strogi SSE prijevod                 |
| `open-sse/services/claudeTlsClient.ts`                   | Izvorni TLS transport               |
| `open-sse/services/browserPool.ts`                       | Zajednički Playwright konteksti     |

### Testiranje

Pokrenite deterministički Claude Web paket testova bez stvarnih vjerodajnica:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Slučajevi koji zavise od Playwrighta u `tests/unit/claude-web-auto-refresh.test.ts` izričito su preskočeni. Ovaj repozitorij trenutno ne definiše skriptu za testiranje Claude Weba uživo s vjerodajnicama, pa ti preskočeni slučajevi nisu dokaz ispravnosti tokom izvođenja.

### Postavljanje

1. Pokrenite OmniRoute pomoću `npm run dev` ili iz izgrađene instalacije.
2. Otvorite Kontrolna ploča → Pružatelji → Dodaj pružatelja.
3. Odaberite kategoriju Web Cookie, a zatim Claude Web.
4. Zalijepite kompletno Cookie zaglavlje kopirano iz autentificiranog `claude.ai` zahtjeva.
