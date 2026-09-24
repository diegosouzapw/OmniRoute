# ADR: Pluggable persistence boundary (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

# ADR: Uključiva granica perzistencije

- **Status:** Predloženo — zahtijeva odobrenje održavatelja prije početka rada na runtime-u
- **Tracking issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Opseg:** Samo arhitektura perzistencije; ova odluka ne dodaje niti bira vanjsku bazu podataka

## Context

OmniRoute trenutno predstavlja funkcije perzistencije orijentirane na domenu iz `src/lib/db/`, dok zajednička konekcija koju vraća `src/lib/db/core.ts` implementira sinkroni `SqliteAdapter` ugovor u `src/lib/db/adapters/types.ts`. Taj adapter podržava nekoliko SQLite runtime-a, ali njegova površina ostaje u obliku SQLite-a: sinkrone pripremljene izjave (prepared statements), `pragma`, odgođene i trenutne transakcije, nativna/file-copy sigurnosna kopija, checkpoint i lokalni handle baze podataka.

Trenutni put pokretanja i oporavka također posjeduje životni ciklus SQLite datoteke. `src/lib/db/core.ts` razrješava `storage.sqlite`, održava jedan procesno-globalni adapter, vrši checkpoint WAL-a, čuva odabrane tablice tijekom oporavka i uklanja prateće SQLite datoteke prilikom ponovne izgradnje baze podataka. Odabir drivera u `src/lib/db/adapters/driverFactory.ts` bira između podržanih SQLite runtime-a; to nije apstrakcija vanjskog backend-a.

Evolucija sheme je slično povezana. `src/lib/db/migrationRunner.ts` primjenjuje numerirane SQL datoteke, ispituje `sqlite_master` i `PRAGMA table_info`, detektira opcionalnu FTS5 podršku i pokreće rad migracije u SQLite transakcijama. Operativni moduli kao što su `src/lib/db/backup.ts` i `src/lib/db/optimizationSettings.ts` koriste backup, `PRAGMA`, WAL, page-size, auto-vacuum i `VACUUM` semantiku izravno.

Ovo su važeća svojstva implementacije ugrađenog SQLite-a. Ona trebaju ostati dostupna bez prisiljavanja PostgreSQL-a ili MySQL-a da emuliraju SQLite API.

## Decision

Usvojiti dvoslojnu granicu perzistencije za prenosivo trajno stanje:

1. **Ugovori repozitorija domene** definiraju operacije perzistencije potrebne poslovnom kodu i kodu za usmjeravanje. Pozivatelji ovise o ponašanju domene i podacima domene, a ne o SQL tekstu, pripremljenim izjavama, datotekama baze podataka ili objektima dijalekta.
2. **Interni asinkroni backend ugovor** podržava implementacije repozitorija s kontekstima transakcija, zdravljem/spremnošću, koordinacijom migracije, mogućnostima backend-a i klasificiranim pogreškama. Točna TypeScript površina bit će predložena s prvim PR-om implementacije i dokazana testovima sukladnosti; ovaj ADR namjerno ne zamrzava spekulativni API.

SQLite ostaje zadana implementacija. Postojeća kaskada SQLite drivera i sinkroni `SqliteAdapter` ostaju iza implementacije SQLite repozitorija dok se domene migriraju u malim vertikalnim dijelovima. Od korisnika se ne zahtijeva konfiguriranje vanjske usluge.

PostgreSQL je prva predložena vanjska implementacija nakon što se granica repozitorija dokaže protiv SQLite-a. MySQL slijedi kao ravnopravna implementacija protiv istog skupa testova sukladnosti, a ne kao drugi fork poslovne logike.

## Pravila razgraničenja

### Površina prenosivog repozitorija

Prenosivi repozitorij može izložiti:

- čitanja i pisanja domena;
- eksplicitne atomske operacije i pristup repozitoriju u okviru transakcije;
- operacije poređenja/ažuriranja ili zakupa gdje su semantike konkurentnosti dio domena;
- paginaciju, sortiranje i greške ograničenja neutralne prema backendu.

Zdravlje, spremnost i koordinacija migracije backenda pripadaju internom ugovoru backenda/operativnom ugovoru, a ne pojedinačnim repozitorijima domena.

Prenosivi repozitorij ne smije izložiti:

- `prepare`, `get`, `all`, `run`, ili sirove drivere;
- `PRAGMA`, WAL modove kontrolnih tačaka, `VACUUM`, ili podešavanje stranica/keša;
- SQLite putanje datoteka, prateće datoteke, ili sigurnosne kopije kopiranjem datoteka;
- `lastInsertRowid` kao ugovor domena između različitih backendova;
- FTS5 ili `sqlite-vec` sintaksu;
- generičku zaobilaznicu dijalekta koju koristi običan poslovni kod.

### Površina mogućnosti backenda

Ponašanje specifično za backend ostaje eksplicitno i otkrivljivo. Održavanje isključivo za SQLite ostaje iza vlastite implementacije i operativnog interfejsa, uključujući:

- odabir drivera tokom izvršavanja;
- WAL kontrolne tačke i ponašanje pri gašenju SQLite-a;
- postavke veličine stranice, veličine keša i automatskog čišćenja (auto-vacuum);
- sigurnosnu kopiju, vraćanje i oporavak datoteke baze podataka;
- introspekciju SQLite šeme;
- FTS5 i `sqlite-vec` integraciju.

Od vanjskog backenda se ne zahtijeva da imitira te funkcije. Repozitoriji moraju ili koristiti prenosivu mogućnost, pružiti implementaciju specifičnu za backend sa dokumentovanim ponašanjem, ili prijaviti da mogućnost nije dostupna.

## Model transakcija i migracija

API-ji repozitorija definišu atomsku poslovnu operaciju; pozivaoci ne biraju SQL mod transakcije. Svaka operacija mora definisati svoje vidljive garancije konkurentnosti: zaštićene invarijante, detekciju konflikata, klasifikaciju ponovnih pokušaja, očekivanja idempotentnosti i propagaciju konteksta transakcije. Implementacije mogu koristiti različite mehanizme transakcija i izolacije samo kada te vidljive garancije ostaju ekvivalentne. SQLite može nastaviti koristiti svoje trenutno odgođeno (deferred) ili trenutno (immediate) ponašanje transakcija interno gdje to zadovoljava ugovor operacije.

Vanjski backendovi zahtijevaju eksplicitno vlasništvo nad migracijom kako više replika aplikacije ne bi mogle utrkivati istu promjenu šeme. Historije migracije backenda mogu dijeliti logičke prekretnice, ali se ne pretpostavlja da su SQLite SQL datoteke prenosive ili ponovo upotrebljive kao drugi dijalekt.

## Semantika usklađenosti između backendova

Testovi usklađenosti moraju pokrivati ponašanje, a ne samo potpise metoda repozitorija. Svaki migrirani domen mora definisati i verifikovati:

- vremensku zonu, preciznost i serijalizaciju vremenskih oznaka (timestamp);
- očekivanja za `NULL` sortiranje, kolaciju i osjetljivost na velika/mala slova;
- reprezentaciju JSON-a i ponašanje pri poređenju;
- preciznost cijelih brojeva, decimalnih brojeva i novčanih iznosa;
- stabilno sortiranje i determinističke razrješivače izjednačenja za paginaciju;
- generisanje ID-a bez oslanjanja na SQLite row ID-ove;
- klasifikaciju kršenja jedinstvenosti i stranih ključeva;
- ponašanje zahvaćenih redova (affected-row) za no-op, operacije poređenja/ažuriranja i brisanja;
- ishode konkurentnog pisanja, konflikte koji se mogu ponovo pokušati i idempotentne ponovne pokušaje.

Ako domen ne može navesti ekvivalentnu vidljivu semantiku, on još nije prenosiv i mora ostati specifičan za backend dok se taj ugovor ne dizajnira.

## Compatibility requirements

Svaka implementacija koja prati ovaj ADR mora očuvati ova svojstva:

- SQLite ostaje zadana opcija bez konfiguracije.
- Postojeće SQLite datoteke i historija migracija ostaju čitljivi.
- npm, Electron, Docker i rezervne opcije za SQLite u ograničenom runtime okruženju zadržavaju svoju trenutnu putanju pokretanja.
- Pohranjene vjerodajnice provajdera nastavljaju koristiti postojeće ponašanje enkripcije aplikacije.
- Migracija repozitorija ne mijenja tiho semantiku rutiranja, kvota, API ključeva ili revizije.
- Ponašanje sigurnosnog kopiranja i oporavka dokumentirano je po backendu, umjesto da se predstavlja kao univerzalno.
- Čista instalacija samo sa SQLite-om ne učitava niti zahtijeva vanjski drajver baze podataka.

## Delivery sequence

1. Objavite ponovljivi inventar povezivanja sa SQLite-om kao zaseban artefakt za pregled.
2. Uvedite prve ugovore repozitorija domena i testove usklađenosti.
3. Prilagodite postojeću SQLite implementaciju iza tih ugovora bez promjene zadanih postavki.
4. Uz odobrenje održavatelja, dodajte PostgreSQL kao prvu vanjsku implementaciju za jedan ograničeni dio kontrolne ravni (control-plane slice).
5. Proširite zajedničko stanje tek nakon što postoje testovi za istovremeno pisanje (concurrent-write) i vlasništvo nad migracijom.
6. Dodajte offline, validiranu putanju migracije sa SQLite-a na vanjsku bazu prije reklamiranja prebacivanja baze podataka.
7. Dodajte MySQL u odnosu na provjerene ugovore repozitorija i backend-a.

Svaki korak izvršavanja je zaseban PR koji se može pregledati. Kasniji korak se ne smije koristiti za opravdanje spajanja nedokazane apstrakcije u ranijem koraku.

## First implementation slice

Prvi dio izvršavanja treba odabrati nakon što se pregleda inventar povezivanja. Konekcije provajdera, API ključevi, kombinacije i konfiguracija rutiranja su kandidati jer su njihove osnovne tabele vidljive u `src/lib/db/core.ts`, ali ovaj ADR ne odobrava listu tabela ili PR za migraciju. Ovaj dio mora uključivati:

- testove očuvanja ponašanja SQLite-a;
- testove usklađenosti repozitorija;
- eksplicitne granice transakcija;
- verifikaciju enkripcije i redakcije za pohranjene vjerodajnice;
- bez promjene zadane konfiguracije pokretanja.

## Alternatives considered

### Add PostgreSQL beneath `SqliteAdapter`

Odbijeno. `SqliteAdapter` je sloj kompatibilnosti za SQLite runtime okruženja i izlaže operacije specifične za SQLite. Emuliranje te površine bi dovelo do curenja sinhronih i dijalekt-specifičnih pretpostavki u novi backend.

### Expose a generic query/execute API to all domains

Odbijeno kao primarna granica. To bi centraliziralo upravljanje konekcijama, ali bi ostavilo SQL dijalekt, transakcije i povezivanje tabela u poslovnim modulima. Niskonivoovski primitiv backend-a može postojati unutar implementacija repozitorija, a ne kao API za perzistenciju okrenut aplikaciji.

### Rewrite all persistence before validating one slice

Odbijeno. Trenutna površina perzistencije je široka i uključuje životni ciklus datoteka, oporavak, pretragu i operativne postavke. Vertikalni dijelovi pružaju ponašanje koje se može pregledati i granice za povratak (rollback).

### Replace SQLite as the default

Odbijeno. Ugrađene (embedded) i desktop implementacije ovise o trenutnom modelu pokretanja bez servisa. Vanjski backend je opcionalan (opt-in).

### Use Redis as the durable authority

Odbijeno. Redis može podržavati eksplicitno efemernu koordinaciju, keš ili brojače, ali ne zamjenjuje ugovor o trajnom repozitoriju opisan ovdje.

## Posljedice

### Pozitivne

- Poslovni kod dobija stabilan sloj za perzistenciju nezavisan od dijalekta baze podataka.
- Ponašanje SQLite-a se testira prije nego što eksterna pozadinska komponenta definiše apstrakciju.
- PostgreSQL i MySQL dijele ugovore i testove umjesto dupliciranja domenske logike.
- Mogućnosti specifične za SQLite ostaju prvoklasne umjesto da postanu nesavršeni slojevi kompatibilnosti.
- Migracija više replika i ponašanje transakcija postaju eksplicitna briga dizajna.

### Troškovi i rizici

- Ekstrakcija repozitorija zahtijeva inkrementalnu migraciju mjesta poziva (call-site).
- Asinhrone granice se mogu proširiti kroz trenutno sinhroni servisni kod.
- Semantika između pozadinskih sistema zahtijeva testove usklađenosti izvan kompatibilnosti SQL sintakse.
- Sigurnosne kopije (backup), pretraga, vektorska pohrana i održavanje ostaju specifični za mogućnosti pojedinačnih sistema.
- Pokretanje više od jedne implementacije perzistencije povećava troškove CI-a i operativne podrške.

## Ciljevi koji nisu obuhvaćeni

Ovaj ADR ne:

- dodaje zavisnost baze podataka, varijablu okruženja, shemu ili migraciju;
- mijenja aktivni SQLite singleton ili kaskadu drajvera;
- obećava podršku za PostgreSQL ili MySQL u određenom izdanju;
- čini FTS5, `sqlite-vec`, datoteke sigurnosnih kopija ili SQLite održavanje prenosivim;
- definiše spremnost za active-active prije nego što postoje testovi za dijeljeno stanje i koordinaciju;
- odobrava jednokratno prepisivanje `src/lib/db/`.

## Otvorena pitanja za odobrenje održavatelja

1. Da li je repozitorij plus interna asinhrona pozadinska granica preferirani smjer, ili bi eksterna perzistencija trebala živjeti iza zasebnog servisa kontrolne ravni (control-plane)?
2. Da li je PostgreSQL prihvatljiv kao prva eksterna implementacija nakon usklađenosti sa SQLite-om?
3. Koji domen bi trebao biti prvi ograničeni dio repozitorija?
4. Koje stanje se mora dijeliti za prvu prekretnicu više replika, a koje ostaje lokalno za čvor?
5. Koji prozor kompatibilnosti je potreban za prekinutu ili vraćenu migraciju repozitorija?

Dok se ova pitanja ne riješe, ovaj dokument je prijedlog i ne podrazumijeva nikakav refaktoring runtime-a.
