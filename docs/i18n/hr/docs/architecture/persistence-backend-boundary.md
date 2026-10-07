# ADR: Pluggable persistence boundary (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Status:** Predloženo — zahtijeva odobrenje održavatelja prije početka rada na runtimeu
- **Problem za praćenje:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Opseg:** Isključivo arhitektura perzistencije; ova odluka ne dodaje niti odabire vanjsku bazu podataka

## Kontekst

OmniRoute trenutačno pruža funkcije perzistencije usmjerene na domenu iz `src/lib/db/`, dok
dijeljena veza koju vraća `src/lib/db/core.ts` implementira sinkroni ugovor `SqliteAdapter`
iz `src/lib/db/adapters/types.ts`. Taj adapter podržava nekoliko SQLite runtimeova, ali njegovo
sučelje ostaje oblikovano prema SQLiteu: sinkroni pripremljeni izrazi, `pragma`, odgođene i neposredne
transakcije, izvorna sigurnosna kopija ili sigurnosna kopija kopiranjem datoteke, kontrolna točka i
lokalna ručka baze podataka.

Trenutačni put pokretanja i oporavka također upravlja životnim ciklusom SQLite datoteke. `src/lib/db/core.ts`
određuje lokaciju datoteke `storage.sqlite`, održava jedan adapter na razini cijelog procesa, stvara kontrolne
točke WAL-a, čuva odabrane tablice tijekom oporavka i uklanja popratne SQLite datoteke pri ponovnoj izgradnji
baze podataka. Odabir upravljačkog programa u `src/lib/db/adapters/driverFactory.ts` bira između podržanih
SQLite runtimeova; to nije apstrakcija vanjskog pozadinskog sustava.

Evolucija sheme slično je čvrsto povezana. `src/lib/db/migrationRunner.ts` primjenjuje numerirane SQL datoteke,
ispituje `sqlite_master` i `PRAGMA table_info`, otkriva opcionalnu podršku za FTS5 te izvršava
migracije unutar SQLite transakcija. Operativni moduli kao što su `src/lib/db/backup.ts` i
`src/lib/db/optimizationSettings.ts` izravno koriste semantiku sigurnosnog kopiranja, naredbe `PRAGMA`,
WAL-a, veličine stranice, automatskog vakuumiranja i naredbe `VACUUM`.

To su valjana svojstva ugrađene implementacije SQLitea. Trebaju ostati dostupna bez
prisiljavanja PostgreSQL-a ili MySQL-a da oponašaju SQLite API.

## Odluka

Usvojiti dvorazinsku granicu perzistencije za prenosivo trajno stanje:

1. **Ugovori domenskih repozitorija** definiraju operacije perzistencije potrebne poslovnom kodu i kodu za
   usmjeravanje. Pozivatelji ovise o ponašanju i podacima domene, a ne o SQL tekstu, pripremljenim izrazima,
   datotekama baze podataka ili objektima dijalekta.
2. **Interni asinkroni ugovor pozadinskog sustava** podržava implementacije repozitorija pomoću
   transakcijskih konteksta, provjera ispravnosti i spremnosti, koordinacije migracija, mogućnosti pozadinskog
   sustava i klasificiranih pogrešaka. Točno TypeScript sučelje bit će predloženo u prvom PR-u implementacije
   i potvrđeno testovima usklađenosti; ovaj ADR namjerno ne učvršćuje spekulativni API.

SQLite ostaje zadana implementacija. Postojeći slijed odabira SQLite upravljačkih programa i sinkroni
`SqliteAdapter` ostaju iza SQLite implementacije repozitorija dok se domene migriraju u
malim vertikalnim segmentima. Nijedan korisnik nije obvezan konfigurirati vanjsku uslugu.

PostgreSQL je prva predložena vanjska implementacija nakon što se granica repozitorija potvrdi
na SQLiteu. MySQL slijedi kao ravnopravna implementacija prema istom skupu testova usklađenosti,
a ne kao drugo račvanje poslovne logike.

## Pravila granice

### Prenosivo sučelje repozitorija

Prenosivi repozitorij može izložiti:

- domenska čitanja i pisanja;
- eksplicitne atomske operacije i pristup repozitoriju ograničen na opseg transakcije;
- operacije usporedbe/ažuriranja ili zakupa kada je semantika konkurentnosti dio domene;
- straničenje, redoslijed i pogreške ograničenja neovisne o pozadinskom sustavu.

Ispravnost i spremnost pozadinskog sustava te koordinacija migracija pripadaju internom
pozadinskom/operativnom ugovoru, a ne pojedinačnim domenskim repozitorijima.

Prenosivi repozitorij ne smije izlagati:

- `prepare`, `get`, `all`, `run` ni neobrađene ručke upravljačkog programa;
- `PRAGMA`, načine kontrolnih točaka WAL-a, `VACUUM` ni podešavanje stranica ili predmemorije;
- putanje SQLite datoteka, popratne datoteke ni sigurnosno kopiranje kopiranjem datoteke;
- `lastInsertRowid` kao međupozadinski domenski ugovor;
- sintaksu FTS5 ili `sqlite-vec`;
- generički zaobilazni mehanizam za dijalekte koji koristi uobičajeni poslovni kod.

### Sučelje mogućnosti pozadinskog sustava

Ponašanje specifično za pozadinski sustav ostaje eksplicitno i lako uočljivo. Održavanje specifično
za SQLite ostaje iza vlastite implementacije i operativnog sučelja, uključujući:

- odabir upravljačkog programa za runtime;
- kontrolne točke WAL-a i ponašanje SQLitea pri gašenju;
- postavke veličine stranice, veličine predmemorije i automatskog vakuumiranja;
- sigurnosno kopiranje, vraćanje i oporavak datoteke baze podataka;
- introspekciju SQLite sheme;
- integraciju s FTS5 i `sqlite-vec`.

Vanjski pozadinski sustav ne mora oponašati te značajke. Repozitoriji moraju upotrebljavati
prenosivu mogućnost, pružiti implementaciju specifičnu za pozadinski sustav s dokumentiranim ponašanjem
ili prijaviti da mogućnost nije dostupna.

## Model transakcija i migracija

API-ji repozitorija definiraju atomsku poslovnu operaciju; pozivatelji ne odabiru način SQL transakcije.
Svaka operacija mora definirati svoja vidljiva jamstva istodobnog izvođenja: zaštićene invarijante, otkrivanje
sukoba, klasifikaciju ponovnih pokušaja, očekivanja idempotentnosti i prosljeđivanje transakcijskog konteksta.
Implementacije mogu koristiti različite mehanizme transakcija i izolacije samo kada ta vidljiva
jamstva ostaju ekvivalentna. SQLite može interno nastaviti koristiti svoje trenutačno odgođeno ili neposredno
ponašanje transakcija kada ono ispunjava ugovor operacije.

Vanjski pozadinski sustavi zahtijevaju izričito vlasništvo nad migracijama kako se više replika aplikacije ne bi istodobno
nadmetalo za istu promjenu sheme. Povijesti migracija pozadinskih sustava mogu dijeliti logičke ključne točke, ali ne
pretpostavlja se da su SQLite SQL datoteke prenosive ili ponovno upotrebljive u drugom dijalektu.

## Semantika usklađenosti među pozadinskim sustavima

Testovi usklađenosti moraju obuhvaćati ponašanje, a ne samo potpise metoda repozitorija. Svaka migrirana domena
mora definirati i provjeriti:

- vremensku zonu, preciznost i serijalizaciju vremenskih oznaka;
- očekivanja za redoslijed vrijednosti `NULL`, uspoređivanje i osjetljivost na velika i mala slova;
- prikaz JSON-a i ponašanje pri usporedbi;
- preciznost cijelih brojeva, decimalnih brojeva i novčanih iznosa;
- stabilno sortiranje i determinističke kriterije razrješavanja izjednačenja za straničenje;
- generiranje ID-jeva bez oslanjanja na SQLite ID-jeve redaka;
- klasifikaciju kršenja jedinstvenosti i stranih ključeva;
- ponašanje broja zahvaćenih redaka za operacije bez učinka, uspoređivanja/ažuriranja i brisanja;
- ishode istodobnih upisa, sukobe za koje je moguće ponovno pokušati i idempotentne ponovne pokušaje.

Ako domena ne može navesti ekvivalentnu vidljivu semantiku, još nije prenosiva i mora ostati
specifična za pozadinski sustav dok se taj ugovor ne osmisli.

## Zahtjevi kompatibilnosti

Svaka implementacija koja slijedi ovaj ADR mora očuvati ova svojstva:

- SQLite ostaje zadana opcija bez potrebe za konfiguracijom.
- Postojeće SQLite datoteke i povijest migracija ostaju čitljive.
- Zamjenske SQLite opcije za npm, Electron, Docker i okruženja s ograničenim izvođenjem zadržavaju svoj trenutačni put pokretanja.
- Pohranjene vjerodajnice pružatelja i dalje koriste postojeće ponašanje aplikacije za šifriranje.
- Migracija repozitorija ne mijenja prešutno semantiku usmjeravanja, kvota, API ključeva ili revizije.
- Ponašanje sigurnosnog kopiranja i oporavka dokumentirano je za svaki pozadinski sustav, umjesto da se predstavlja kao univerzalno.
- Čista instalacija koja koristi samo SQLite ne učitava niti zahtijeva upravljački program vanjske baze podataka.

## Redoslijed isporuke

1. Objavite ponovljiv popis povezanosti sa SQLiteom kao zaseban artefakt za pregled.
2. Uvedite prve ugovore repozitorija domena i testove usklađenosti.
3. Prilagodite postojeću implementaciju SQLitea tim ugovorima bez promjene zadanih postavki.
4. Uz odobrenje održavatelja dodajte PostgreSQL kao prvu vanjsku implementaciju za jedan
   ograničeni dio upravljačke ravnine.
5. Proširite dijeljeno stanje tek nakon što budu dostupni testovi istodobnog upisa i vlasništva nad migracijama.
6. Dodajte izvanmrežni, validirani put migracije iz SQLitea u vanjski sustav prije oglašavanja mogućnosti prebacivanja baze podataka.
7. Dodajte MySQL u skladu s dokazanim ugovorima repozitorija i pozadinskog sustava.

Svaki korak u vremenu izvođenja zaseban je PR koji je moguće pregledati. Kasniji korak ne smije se koristiti za opravdavanje spajanja
nedokazane apstrakcije iz ranijeg koraka.

## Prvi implementacijski odsječak

Prvi izvršni odsječak treba odabrati nakon pregleda inventara povezanosti. Veze s pružateljima,
API ključevi, kombinacije i konfiguracija usmjeravanja kandidati su jer su njihove osnovne tablice
vidljive u `src/lib/db/core.ts`, ali ovaj ADR ne odobrava popis tablica ni PR za migraciju.
Odsječak mora uključivati:

- testove očuvanja ponašanja SQLitea;
- testove usklađenosti repozitorija;
- eksplicitne granice transakcija;
- provjeru šifriranja i redigiranja pohranjenih vjerodajnica;
- bez promjene zadane konfiguracije pokretanja.

## Razmotrene alternative

### Dodavanje PostgreSQL-a ispod `SqliteAdapter`

Odbijeno. `SqliteAdapter` je sloj kompatibilnosti za SQLite izvršna okruženja i izlaže operacije
specifične za SQLite. Oponašanje tog sučelja prenijelo bi sinkrone pretpostavke i pretpostavke
specifične za dijalekt u novu pozadinsku implementaciju.

### Izlaganje generičkog API-ja za upite/izvršavanje svim domenama

Odbijeno kao primarna granica. Time bi se centraliziralo upravljanje vezama, ali bi SQL dijalekt,
transakcije i povezanost s tablicama ostali u poslovnim modulima. Niskorazinska primitiva pozadinske
implementacije može postojati unutar implementacija repozitorija, ali ne kao aplikacijski API za
perzistenciju.

### Ponovno pisanje cjelokupne perzistencije prije validacije jednog odsječka

Odbijeno. Trenutačna površina perzistencije široka je i obuhvaća životni ciklus datoteka, oporavak,
pretraživanje i operativne postavke. Vertikalni odsječci omogućuju pregled ponašanja i jasno
definirane granice povrata na prethodno stanje.

### Zamjena SQLitea kao zadane opcije

Odbijeno. Ugrađene i stolne implementacije ovise o trenutačnom modelu pokretanja bez zasebne
usluge. Vanjska pozadinska implementacija nije obvezna.

### Upotreba Redisa kao trajnog autoritativnog izvora

Odbijeno. Redis može podržavati izričito kratkotrajnu koordinaciju, predmemoriju ili brojače, ali ne
zamjenjuje ovdje opisani ugovor trajnog repozitorija.

## Posljedice

### Pozitivne

- Poslovni kod dobiva stabilnu granicu perzistencije neovisnu o dijalektu baze podataka.
- Ponašanje SQLitea testira se prije nego što vanjska pozadinska implementacija definira apstrakciju.
- PostgreSQL i MySQL dijele ugovore i testove umjesto da dupliciraju domensku logiku.
- Mogućnosti specifične za SQLite ostaju punopravne umjesto da postanu propusni slojevi kompatibilnosti.
- Ponašanje migracija i transakcija s više replika postaje eksplicitno projektno pitanje.

### Troškovi i rizici

- Izdvajanje repozitorija zahtijeva postupnu migraciju mjesta poziva.
- Asinkrone granice mogu se proširiti kroz trenutačno sinkroni servisni kod.
- Semantika među pozadinskim implementacijama zahtijeva testove usklađenosti koji nadilaze kompatibilnost SQL sintakse.
- Sigurnosne kopije, pretraživanje, vektorska pohrana i održavanje ostaju specifični za pojedine mogućnosti.
- Pokretanje više od jedne implementacije perzistencije povećava trošak CI-ja i operativne podrške.

## Ciljevi koji nisu obuhvaćeni

Ovaj ADR ne:

- dodaje ovisnost o bazi podataka, varijablu okruženja, shemu ni migraciju;
- mijenja aktivni SQLite singleton ni slijed odabira upravljačkih programa;
- jamči podršku za PostgreSQL ili MySQL u određenom izdanju;
- čini FTS5, `sqlite-vec`, datoteke sigurnosnih kopija ili održavanje SQLitea prenosivima;
- definira spremnost za aktivno-aktivni rad prije nego što postoje testovi dijeljenog stanja i koordinacije;
- odobrava jednokratno ponovno pisanje direktorija `src/lib/db/`.

## Otvorena pitanja za odobrenje održavatelja

1. Je li repozitorij uz internu granicu asinkronog pozadinskog sustava preferirani smjer ili bi
   vanjska pohrana podataka trebala biti iza zasebne usluge kontrolne ravnine?
2. Je li PostgreSQL prihvatljiv kao prva vanjska implementacija nakon usklađivanja sa SQLiteom?
3. Koja bi domena trebala biti prvi ograničeni odsječak repozitorija?
4. Koje stanje mora biti dijeljeno za prvu prekretnicu s više replika, a koje ostaje lokalno za čvor?
5. Koje je razdoblje kompatibilnosti potrebno za prekinutu ili poništenu migraciju repozitorija?

Dok se ova pitanja ne razriješe, ovaj je dokument prijedlog i ne podrazumijeva se nikakva refaktorizacija tijekom izvođenja.
