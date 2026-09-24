# ADR: Pluggable persistence boundary (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇧🇦 [bs](../../../bs/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Tila:** Ehdotettu — edellyttää ylläpitäjän hyväksyntää ennen ajonaikaisen toteutuksen aloittamista
- **Seurantatehtävä:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Laajuus:** Vain pysyvyysarkkitehtuuri; tällä päätöksellä ei lisätä eikä valita ulkoista tietokantaa

## Konteksti

OmniRoute tarjoaa tällä hetkellä toimialuekohtaisia pysyvyysfunktioita hakemistosta `src/lib/db/`, kun taas tiedoston `src/lib/db/core.ts` palauttama jaettu yhteys toteuttaa tiedostossa `src/lib/db/adapters/types.ts` määritellyn synkronisen `SqliteAdapter`-sopimuksen. Kyseinen sovitin tukee useita SQLite-ajoympäristöjä, mutta sen rajapinta on edelleen SQLite-keskeinen: synkroniset valmistellut lauseet, `pragma`, lykätyt ja välittömät transaktiot, natiivi tai tiedostokopiointiin perustuva varmuuskopiointi, tarkistuspisteet sekä paikallinen tietokantakahva.

Nykyinen käynnistys- ja palautuspolku hallitsee myös SQLite-tiedoston elinkaarta. `src/lib/db/core.ts` selvittää `storage.sqlite`-tiedoston sijainnin, ylläpitää yhtä prosessinlaajuista sovitinta, luo WAL-tarkistuspisteitä, säilyttää valitut taulut palautuksen aikana ja poistaa SQLite-oheistiedostot tietokantaa uudelleen muodostettaessa. Ajurin valinta tiedostossa `src/lib/db/adapters/driverFactory.ts` valitsee tuettujen SQLite-ajoympäristöjen väliltä; se ei ole ulkoisten taustajärjestelmien abstraktio.

Skeeman kehitys on vastaavasti tiukasti sidoksissa SQLiteen. `src/lib/db/migrationRunner.ts` suorittaa numeroidut SQL-tiedostot, tutkii `sqlite_master`- ja `PRAGMA table_info` -rakenteita, tunnistaa valinnaisen FTS5-tuen ja suorittaa migraatiot SQLite-transaktioissa. Operatiiviset moduulit, kuten `src/lib/db/backup.ts` ja `src/lib/db/optimizationSettings.ts`, käyttävät suoraan varmuuskopiointi-, `PRAGMA`-, WAL-, sivukoko-, automaattinen tyhjennys- ja `VACUUM`-semantiikkaa.

Nämä ovat sulautetun SQLite-käyttöönoton perusteltuja ominaisuuksia. Niiden tulee säilyä käytettävissä ilman, että PostgreSQL:n tai MySQL:n täytyy jäljitellä SQLite-rajapintaa.

## Päätös

Otetaan käyttöön kaksitasoinen pysyvyysraja siirrettävälle pysyvälle tilalle:

1. **Toimialueen tietovarastosopimukset** määrittelevät liiketoiminta- ja reitityskoodin tarvitsemat pysyvyystoiminnot. Kutsujat ovat riippuvaisia toimialueen käyttäytymisestä ja tiedoista, eivät SQL-tekstistä, valmistelluista lauseista, tietokantatiedostoista tai murreobjekteista.
2. **Sisäinen asynkroninen taustajärjestelmäsopimus** tukee tietovarastototeutuksia transaktiokonteksteilla, kunnon ja valmiuden tarkistuksilla, migraatioiden koordinoinnilla, taustajärjestelmän ominaisuuksilla sekä luokitelluilla virheillä. Tarkka TypeScript-rajapinta ehdotetaan ensimmäisessä toteutus-PR:ssä ja todennetaan vaatimustenmukaisuustesteillä; tämä ADR ei tarkoituksellisesti lukitse spekulatiivista API:a.

SQLite säilyy oletustoteutuksena. Nykyinen SQLite-ajureiden valintaketju ja synkroninen `SqliteAdapter` pysyvät SQLite-tietovarastototeutuksen takana samalla, kun toimialueet siirretään pieninä pystysuuntaisina kokonaisuuksina. Kenenkään käyttäjän ei tarvitse määrittää ulkoista palvelua.

PostgreSQL on ensimmäinen ehdotettu ulkoinen toteutus sen jälkeen, kun tietovarastoraja on todennettu SQLitea vasten. MySQL toteutetaan tämän jälkeen rinnakkaisena toteutuksena samaa vaatimustenmukaisuustestikokonaisuutta vasten eikä toisena liiketoimintalogiikan haarana.

## Rajan säännöt

### Siirrettävä tietovarastorajapinta

Siirrettävä tietovarasto voi tarjota:

- toimialueen luku- ja kirjoitusoperaatioita;
- eksplisiittisiä atomisia operaatioita ja transaktion laajuista tietovaraston käyttöä;
- vertailu-/päivitys- tai varausoperaatioita, kun rinnakkaisuussementiikka kuuluu toimialueeseen;
- taustajärjestelmästä riippumattoman sivutuksen, järjestämisen ja rajoitevirheet.

Taustajärjestelmän kunnon ja valmiuden tarkistukset sekä migraatioiden koordinointi kuuluvat sisäiseen taustajärjestelmä- tai operatiiviseen sopimukseen eivätkä yksittäisiin toimialueen tietovarastoihin.

Siirrettävä tietovarasto ei saa tarjota:

- `prepare`-, `get`-, `all`- tai `run`-toimintoja eikä käsittelemättömiä ajurikahvoja;
- `PRAGMA`-toimintoja, WAL-tarkistuspistetiloja, `VACUUM`-toimintoa tai sivujen ja välimuistin hienosäätöä;
- SQLite-tiedostopolkuja, oheistiedostoja tai tiedostokopiointiin perustuvaa varmuuskopiointia;
- `lastInsertRowid`-arvoa taustajärjestelmien välisenä toimialuesopimuksena;
- FTS5- tai `sqlite-vec`-syntaksia;
- geneeristä SQL-murteeseen perustuvaa ohitusmekanismia, jota tavallinen liiketoimintakoodi käyttää.

### Taustajärjestelmän ominaisuusrajapinta

Taustajärjestelmäkohtainen käyttäytyminen säilyy eksplisiittisenä ja helposti löydettävänä. Vain SQLitea koskeva ylläpito pysyy oman toteutuksensa ja operatiivisen rajapintansa takana, mukaan lukien:

- ajonaikaisen ajurin valinta;
- WAL-tarkistuspisteet ja SQLiten sammutuskäyttäytyminen;
- sivukoon, välimuistin koon ja automaattisen tyhjennyksen asetukset;
- tietokantatiedoston varmuuskopiointi, palauttaminen ja korjaaminen;
- SQLite-skeeman introspektio;
- FTS5- ja `sqlite-vec`-integraatio.

Ulkoisen taustajärjestelmän ei tarvitse jäljitellä näitä ominaisuuksia. Tietovarastojen on joko käytettävä siirrettävää ominaisuutta, tarjottava taustajärjestelmäkohtainen toteutus dokumentoituine käyttäytymisineen tai ilmoitettava, ettei ominaisuus ole käytettävissä.

## Transaktio- ja migraatiomalli

Rajapintojen API:t määrittävät atomisen liiketoimintaoperaation; kutsujat eivät valitse SQL-transaktiotilaa.
Jokaisen operaation on määritettävä havaittavat rinnakkaisuustakuunsa: suojatut invariantit, ristiriitojen
tunnistus, uudelleenyritysten luokittelu, idempotenssiodotukset ja transaktiokontekstin välitys.
Toteutukset voivat käyttää erilaisia transaktio- ja eristysmekanismeja vain, kun nämä havaittavat
takuut säilyvät vastaavina. SQLite voi jatkaa nykyisen lykätyn tai välittömän
transaktiokäyttäytymisensä käyttöä sisäisesti, jos se täyttää operaation sopimuksen.

Ulkoiset taustajärjestelmät edellyttävät migraatioiden nimenomaisesti määritettyä omistajuutta, jotta useat sovellusreplikat eivät voi kilpailla
samasta skeemamuutoksesta. Taustajärjestelmien migraatiohistoriat voivat jakaa loogisia välitavoitteita, mutta SQLite SQL
-tiedostojen ei oleteta olevan siirrettävissä tai uudelleenkäytettävissä toisessa murteessa.

## Taustajärjestelmien välisen yhdenmukaisuuden semantiikka

Yhdenmukaisuustestien on katettava käyttäytyminen, ei vain rajapintametodien allekirjoituksia. Jokaisen siirretyn toimialueen
on määritettävä ja varmennettava:

- aikaleimojen aikavyöhyke, tarkkuus ja serialisointi;
- `NULL`-arvojen järjestys sekä lajittelu- ja kirjainkokoriippuvuusodotukset;
- JSON-esitystapa ja vertailukäyttäytyminen;
- kokonaislukujen, desimaalilukujen ja rahamäärien tarkkuus;
- vakaa järjestys ja deterministiset tasatilanteiden ratkaisijat sivutusta varten;
- ID-tunnisteiden luonti ilman riippuvuutta SQLiten rivitunnisteista;
- yksikäsitteisyys- ja viiteavainrikkomusten luokittelu;
- muutettujen rivien käsittely vaikutuksettomissa, vertaa/päivitä- ja poisto-operaatioissa;
- samanaikaisten kirjoitusten tulokset, uudelleenyrityksen sallivat ristiriidat ja idempotentit uudelleenyritykset.

Jos toimialueelle ei voida määrittää vastaavaa havaittavaa semantiikkaa, se ei ole vielä siirrettävissä, ja sen on säilyttävä
taustajärjestelmäkohtaisena, kunnes kyseinen sopimus on suunniteltu.

## Yhteensopivuusvaatimukset

Kaikkien tätä ADR:ää noudattavien toteutusten on säilytettävä seuraavat ominaisuudet:

- SQLite säilyy oletuksena, joka ei edellytä määrityksiä.
- Olemassa olevat SQLite-tiedostot ja migraatiohistoria säilyvät luettavina.
- npm:n, Electronin, Dockerin ja rajoitettujen suoritusympäristöjen SQLite-varamekanismit säilyttävät nykyisen käynnistyspolkunsa.
- Tallennetut palveluntarjoajien tunnistetiedot käyttävät jatkossakin sovelluksen nykyistä salaustoimintaa.
- Rajapinnan migraatio ei muuta huomaamatta reitityksen, kiintiöiden, API-avainten tai auditoinnin semantiikkaa.
- Varmuuskopiointi- ja palautuskäyttäytyminen dokumentoidaan taustajärjestelmäkohtaisesti sen sijaan, että se esitettäisiin yleispätevänä.
- Puhdas, vain SQLitea käyttävä asennus ei lataa eikä edellytä ulkoista tietokanta-ajuria.

## Toimitusjärjestys

1. Julkaise toistettava SQLite-riippuvuuksien kartoitus erillisenä katselmointiartefaktina.
2. Ota käyttöön ensimmäiset toimialueen rajapintasopimukset ja yhdenmukaisuustestit.
3. Sovita nykyinen SQLite-toteutus näiden sopimusten taakse muuttamatta oletuksia.
4. Lisää ylläpitäjien hyväksynnän jälkeen PostgreSQL ensimmäiseksi ulkoiseksi toteutukseksi yhteen
   rajattuun ohjaustason osa-alueeseen.
5. Laajenna jaettua tilaa vasta, kun samanaikaisten kirjoitusten ja migraatioiden omistajuuden testit ovat olemassa.
6. Lisää offline-tilassa toimiva, validoitu migraatiopolku SQLitesta ulkoiseen tietokantaan ennen tietokannan vaihtomahdollisuuden mainostamista.
7. Lisää MySQL todennettuja rajapinta- ja taustajärjestelmäsopimuksia vasten.

Jokainen suorituksenaikainen vaihe on erillinen, katselmoitava PR. Myöhempää vaihetta ei saa käyttää perusteena
todentamattoman abstraktion yhdistämiselle aiemmassa vaiheessa.

## Ensimmäinen toteutusosuus

Ensimmäinen ajonaikainen osuus tulee valita sidonnaisuusinventaarion tarkistamisen jälkeen. Palveluntarjoajayhteydet, API-avaimet, yhdistelmät ja reititysmääritykset ovat ehdokkaita, koska niiden pohjataulut näkyvät tiedostossa `src/lib/db/core.ts`, mutta tämä ADR ei hyväksy taululuetteloa tai migraation PR:ää. Osuuden tulee sisältää:

- SQLite-toiminnan säilymisen testit;
- repositorioiden yhdenmukaisuustestit;
- eksplisiittiset transaktiorajat;
- tallennettujen tunnistetietojen salauksen ja peittämisen todentaminen;
- ei muutoksia oletusarvoisiin käynnistysmäärityksiin.

## Harkitut vaihtoehdot

### PostgreSQL:n lisääminen `SqliteAdapter`-sovittimen alle

Hylätty. `SqliteAdapter` on SQLite-ajoympäristöjen yhteensopivuuskerros ja tarjoaa SQLite-kohtaisia toimintoja. Tämän rajapinnan emulointi vuotaisi synkronisia ja murrekohtaisia oletuksia uuteen taustajärjestelmään.

### Yleisen kysely-/suoritusrajapinnan tarjoaminen kaikille toimialueille

Hylätty ensisijaisena rajapintana. Se keskittäisi yhteyksien käsittelyn, mutta jättäisi SQL-murteeseen, transaktioihin ja tauluihin liittyvät sidonnaisuudet liiketoimintamoduuleihin. Matalan tason taustajärjestelmäprimitiivi voi olla repositoriototeutusten sisällä, mutta ei sovellukselle näkyvänä pysyvyysrajapintana.

### Kaiken pysyvyyslogiikan uudelleenkirjoittaminen ennen yhden osuuden validointia

Hylätty. Nykyinen pysyvyyspinta on laaja ja sisältää tiedostojen elinkaaren, palautuksen, haun ja operatiiviset asetukset. Vertikaaliset osuudet mahdollistavat katselmoitavat toiminta- ja palautusrajat.

### SQLiten korvaaminen oletusvaihtoehtona

Hylätty. Sulautetut ja työpöytäkäyttöönotot ovat riippuvaisia nykyisestä käynnistysmallista, joka ei edellytä erillistä palvelua. Ulkoinen taustajärjestelmä on valinnainen.

### Redisin käyttäminen pysyvän tiedon auktoritatiivisena lähteenä

Hylätty. Redis voi tukea eksplisiittisesti tilapäistä koordinointia, välimuistia tai laskureita, mutta se ei korvaa tässä kuvattua pysyvää repositoriosopimusta.

## Seuraukset

### Myönteiset

- Liiketoimintakoodi saa vakaan, tietokantamurteesta riippumattoman pysyvyysrajapinnan.
- SQLite-toiminta testataan ennen kuin ulkoinen taustajärjestelmä määrittää abstraktion.
- PostgreSQL ja MySQL jakavat sopimukset ja testit toimialuelogiikan kopioimisen sijaan.
- Vain SQLiteen kuuluvat ominaisuudet säilyvät ensiluokkaisina sen sijaan, että niistä tulisi vuotavia yhteensopivuussovittimia.
- Usean replikan migraatio- ja transaktiokäyttäytymisestä tulee eksplisiittinen suunnittelukysymys.

### Kustannukset ja riskit

- Repositorioiden erottaminen edellyttää kutsukohtien asteittaista migraatiota.
- Asynkroniset rajat voivat levitä nykyisin synkroniseen palvelukoodiin.
- Taustajärjestelmien väliset semanttiset erot edellyttävät yhdenmukaisuustestejä SQL-syntaksin yhteensopivuuden lisäksi.
- Varmuuskopiointi, haku, vektoritallennus ja ylläpito säilyvät ominaisuuskohtaisina.
- Useamman kuin yhden pysyvyystoteutuksen käyttäminen kasvattaa CI:n ja operatiivisen tuen kustannuksia.

## Rajauksen ulkopuolelle jäävät asiat

Tämä ADR ei:

- lisää tietokantariippuvuutta, ympäristömuuttujaa, skeemaa tai migraatiota;
- muuta käytössä olevaa SQLite-singletonia tai ajurikaskadia;
- lupaa PostgreSQL- tai MySQL-tukea tietyssä julkaisussa;
- tee FTS5:stä, `sqlite-vec`:stä, varmuuskopiotiedostoista tai SQLite-ylläpidosta siirrettäviä;
- määritä active-active-valmiutta ennen kuin jaetun tilan ja koordinoinnin testit ovat olemassa;
- hyväksy hakemiston `src/lib/db/` kertaluonteista kokonaisuudelleenkirjoitusta.

## Avoimet kysymykset ylläpitäjän hyväksyntää varten

1. Onko repositorio yhdessä sisäisen asynkronisen taustajärjestelmärajapinnan kanssa ensisijainen suunta, vai pitäisikö
   ulkoinen pysyväistallennus sijoittaa erillisen hallintatasopalvelun taakse?
2. Onko PostgreSQL hyväksyttävä ensimmäiseksi ulkoiseksi toteutukseksi SQLite-yhteensopivuuden varmistamisen jälkeen?
3. Minkä toimialueen tulisi olla ensimmäinen rajattu repositorio-osuus?
4. Mikä tila on jaettava ensimmäisessä usean replikan välitavoitteessa ja minkä tulee säilyä solmukohtaisena?
5. Millainen yhteensopivuusjakso vaaditaan keskeytyneen tai peruutetun repositoriomigraation yhteydessä?

Kunnes nämä kysymykset on ratkaistu, tämä asiakirja on ehdotus eikä se tarkoita ajonaikaisen toteutuksen refaktorointia.
