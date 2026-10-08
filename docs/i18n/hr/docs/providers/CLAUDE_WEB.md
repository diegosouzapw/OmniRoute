# Providers — Claude Web (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` šalje zahtjeve za razgovor u OpenAI formatu putem autentificirane sesije preglednika `claude.ai`. Izvršitelj normalizira navedeni kolačić, pronalazi jednu autentificiranu organizaciju, priprema stanje razgovora, odabire izravni ili preglednički prijenos i strogo prevodi uzvodni SSE odgovor. Orkestracija se nalazi u `open-sse/executors/claude-web.ts:320`.

> **Prvi se put susrećete s pružateljima koji koriste web-kolačiće?**
>
> Prije nego što slijedite ovaj vodič specifičan za pružatelja, pročitajte **`docs/getting-started/WEB-COOKIE-GUIDE.md`** za opći postupak postavljanja, smjernice za autentifikaciju, ograničenja i rješavanje problema.

### Katalog modela

Registar pružatelja trenutačno izlaže točno ovih sedam statičkih ID-jeva modela (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID modela                   | Naziv za prikaz         |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dinamičko otkrivanje modela nije implementirano za ovog pružatelja. Gornji je popis katalog dostupan tijekom izvođenja.

### Vjerodajnice i pronalaženje organizacije

Navedite cijelo zaglavlje Cookie za `claude.ai` ili samo vrijednost sesije. Samostalne vrijednosti normaliziraju se u `sessionKey`; ostali se kolačići zadržavaju ako su navedeni. Izvršitelj prihvaća kolačić putem `cookie` ili `apiKey` i čita neobavezne vrijednosti `deviceId` i `orgId` iz podataka o vezi (`open-sse/executors/claude-web.ts:72`).

Ako `orgId` nije prisutan, izvršitelj poziva `GET https://claude.ai/api/organizations` i koristi prvu organizaciju koju vrati autentificirana sesija Claude Weba (`open-sse/executors/claude-web.ts:141`). Zahtjev se obustavlja ako nije vraćena valjana organizacija, odbijena autorizacija sesije prijavljuje se statusom 401, a Cloudflareov se izazov razlikuje od neuspješne autentifikacije.

### Operacije razgovora

Neobavezni objekt najviše razine `claude_web` strog je. Nepoznata se polja odbijaju. Prihvaćena polja definirana su u `open-sse/executors/claude-web/session.ts:50`:

| Polje                 | Značenje                                                            |
| --------------------- | ------------------------------------------------------------------- |
| `operation`           | Zadano je `completion`; za ponovni pokušaj poteza koristite `retry` |
| `conversation_id`     | Eksplicitni UUID postojećeg razgovora                               |
| `parent_message_uuid` | Eksplicitni UUID nadređene poruke asistenta                         |
| `timezone`            | Valjani IANA naziv vremenske zone                                   |
| `locale`              | Strukturno valjana lokalizacija                                     |
| `tool_states`         | Neobavezni niz stanja alata računa, ograničen na 128 unosa          |

Pripremljeni zahtjevi koriste jednu od dvije uzvodne krajnje točke (`open-sse/executors/claude-web.ts:203`):

- Novi ili naknadni potez šalje se na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Ponovni pokušaj šalje se na
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Novi potez uključuje `create_conversation_params`. Nastavak povezan putem predmemorije ili eksplicitno uključuje `parent_message_uuid`, a izostavlja `create_conversation_params`. Ponovni pokušaj zahtijeva i stanje razgovora i stanje nadređene poruke te ne šalje upit (`open-sse/executors/claude-web/session.ts:254`). Novi razgovori otvaraju autentificirano korisničko sučelje na `/new`; nastavci povezani putem predmemorije ili eksplicitno otvaraju točnu stranicu razgovora (`open-sse/executors/claude-web/session.ts:324`).

Stanje razgovora pohranjuje se u memorijskoj predmemoriji čiji je ključ opseg računa obrađen algoritmom SHA-256 i kanonski transkript pozivatelja. Unosi istječu nakon 30 minuta, a predmemorija je ograničena na 5.000 unosa (`open-sse/executors/claude-web/session.ts:12`). Stanje se potvrđuje tek nakon što strogi parser toka uoči `message_stop`; ponovna pokretanja procesa odbacuju ga. Pri promašaju predmemorije zahtjev s više poruka serijalizira se u jedan upit za oporavak umjesto da se ranije poruke neprimjetno odbace.

Za lokalizaciju i vremensku zonu primjenjuje se sljedeći redoslijed prioriteta: vrijednost `claude_web` iz zahtjeva, vrijednost veze, vrijednost okruženja za izvođenje, a zatim `en-US` za lokalizaciju ili `UTC` za vremensku zonu (`open-sse/executors/claude-web/session.ts:218`).

### Alati i sadržaj zahtjeva

Izravni zahtjevi transformiraju samo strukturno valjane OpenAI funkcijske alate koje navede pozivatelj. Ne postoji izmišljeni statički popis zadanih alata (`open-sse/executors/claude-web/payload.ts:102`).

Zahtjevi iz preglednika umjesto toga zahvaćaju zahtjev autentificiranog korisničkog sučelja i zadržavaju njegove alate računa, stanja alata i personalizirane stilove. Pripremljeni razgovor, model, zaključivanje, upit i polja UUID-ja poruka i dalje nadjačavaju zahvaćeni zahtjev (`open-sse/executors/claude-web/browserTransport.ts:175`). Predlošci preglednika ograničeni su na opseg određen sažetkom računa, organizacije, kolačića, lokalizacije i vremenske zone te istječu nakon 30 minuta (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Kada izravni zahtjev nema alate koje je naveo pozivatelj, može ponovno upotrijebiti taj predložak ograničenog opsega; eksplicitni alati pozivatelja imaju prednost (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Odabir prijenosa

Zadani je put `sendClaudeWebDirect()`, koji poziva `tlsFetchClaude()` s konfiguriranim profilom Chrome 146 i navedenim kolačićem (`open-sse/services/claudeTlsClient.ts:23`). Ne pokreće rješavač niti izrađuje zamjenski kolačić.

Postavite `WEB_COOKIE_USE_BROWSER` na `1`, `true` ili `on` kako bi preglednički adapter ograničen na račun postao primarni transport. Postavite `OMNIROUTE_BROWSER_POOL` na jednu od istih vrijednosti kako biste omogućili da se prepoznati Cloudflareov 403 izazov prebaci s izravnog transporta na preglednički adapter (`open-sse/executors/claude-web.ts:195`). Drugi HTTP kvarovi ne pokreću taj rezervni mehanizam.

Preglednički adapter zadržava kolačiće unutar istog objedinjenog Playwright konteksta, koristi prethodno opisani sažeti ključ ograničenog opsega i šalje dovršetak iz tog konteksta (`open-sse/executors/claude-web/browserTransport.ts:444`). Nikada ne izvozi kolačić koji je preglednik dobio rješavanjem izazova u izravni TLS klijent. Ponovni pokušaji u pregledniku zahtijevaju UI predložak koji nije istekao i povezan je s istim stvarnim Playwright kontekstom (`open-sse/executors/claude-web/browserTransport.ts:467`). Odgovori preglednika čitaju se inkrementalno na autentificiranoj stranici, poštuju otkazivanje zahtjeva i otkazuju uzvodno tijelo čim premaši 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Izvršitelj vraća redigiranu projekciju revizijskih podataka zajedničkom zapisivaču zahtjeva: organizacija, UUID-ovi razgovora i poruka, tekst upita, definicije alata, kolačići i identifikatori uređaja isključeni su (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Iznimke transporta također vraćaju generičku pogrešku veze umjesto poruke izbačene iznimke.

### Ponašanje SSE-a

`createClaudeWebResponse()` obrađuje uokvirivanje s LF-om ili CRLF-om i višeredna polja `data:`. Tekstualne delte preslikava u `content`, delte razmišljanja u `reasoning_content`, a poznate događaje metapodataka u proširenje odgovora `claude_web`. Svaki događaj metapodataka projicira se kroz vlastiti popis dopuštenih polja (`open-sse/executors/claude-web/stream.ts:37`). Metapodaci razgovora, nadređene poruke, poruke asistenta i operacije također se vraćaju u zaglavljima `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Parser prekida obradu na siguran način pri neispravnom JSON-u, uzvodnim događajima `error`, nepoznatim vrstama događaja, nevaljanom redoslijedu, nepodudaranjima blokova sadržaja ili EOF-u prije `message_stop`. Izlaz strujanja emitira jedan završni fragment i jedan `[DONE]`; međuspremnički izlaz koristi isti parser. Parser tretira `message_stop` kao trenutačni završetak, otkazuje preostale uzvodne podatke i prosljeđuje nizvodno otkazivanje uzvodnom čitaču (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Nezavršeni SSE redci i akumulirani događaji ograničeni su na 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Datoteke

| Datoteka                                                 | Namjena                                  |
| -------------------------------------------------------- | ---------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Statički registar modela pružatelja      |
| `open-sse/executors/claude-web.ts`                       | Orkestracija izvršitelja                 |
| `open-sse/executors/claude-web/payload.ts`               | Transformacija korisnog tereta i alata   |
| `open-sse/executors/claude-web/session.ts`               | Stanje poteza i predmemorija transkripta |
| `open-sse/executors/claude-web/transport.ts`             | Adapter izravnog transporta              |
| `open-sse/executors/claude-web/browserTransport.ts`      | Preglednički adapter ograničen na račun  |
| `open-sse/executors/claude-web/stream.ts`                | Strogo prevođenje SSE-a                  |
| `open-sse/services/claudeTlsClient.ts`                   | Izvorni TLS transport                    |
| `open-sse/services/browserPool.ts`                       | Objedinjeni Playwright konteksti         |

### Testiranje

Pokrenite deterministički paket testova za Claude Web bez stvarnih vjerodajnica:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Slučajevi koji ovise o Playwrightu u `tests/unit/claude-web-auto-refresh.test.ts` izričito su preskočeni. Ovo spremište trenutačno ne definira skriptu za testiranje Claude Weba uživo s vjerodajnicama, pa ti preskočeni slučajevi nisu dokaz ponašanja tijekom izvođenja.

### Postavljanje

1. Pokrenite OmniRoute pomoću `npm run dev` ili iz izgrađene instalacije.
2. Otvorite Nadzornu ploču → Pružatelji → Dodaj pružatelja.
3. Odaberite kategoriju Web Cookie i Claude Web.
4. Zalijepite cijelo zaglavlje Cookie kopirano iz autentificiranog zahtjeva prema `claude.ai`.
