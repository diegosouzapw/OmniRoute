# Radar Free-Model Catalog (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Vir resnice:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Nazadnje posodobljeno:** 2026-09-01 — v3.8.51
> **Meja dokazov za gostovano storitev:** tukaj opisana pravila na strani strežnika so bila preverjena
> 2026-09-01 glede na namenoma zasebni strežnik Radar pri točno določeni reviziji
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Ta implementacija ni vključena v
> ta repozitorij OSS; razpoložljivost gostovanja ostaja ločeno operativno stanje.

Radar je **izbirni dodatek**, ki prek izhodiščnega kataloga izdaje (`FREE_MODEL_BUDGETS` v
`open-sse/config/freeModelCatalog.data.ts`) naloži podpisan, sproti skrbno posodobljen katalog
brezplačnih modelov. Obstaja zato, ker se področje brezplačnih ravni spreminja hitreje od
pogostosti izdaj — ponudniki med izdajami dodajajo, zmanjšujejo ali ukinjajo brezplačne kvote,
izhodiščni katalog pa je mogoče osvežiti šele ob izdaji nove različice.

**Nič, kar je danes brezplačno, zaradi oddaljenega vira ne preneha biti brezplačno.** Radar
nikoli ne postavi izhodiščnega vnosa za plačilni zid; ob branju samo osveži polja omejitev/stanja
in lahko med izdajami doda novo odkrite brezplačne modele. Upravljavec lahko model še vedno
lokalno skrije in ga z iste nadzorne plošče tudi obnovi. Sam izhodiščni katalog se na disku
nikoli ne spremeni — glejte spodaj
[Pravila združevanja prekrivne plasti ob branju](#read-time-overlay-merge-rules).

---

## Stanje dobave v v3.8.51

Naslednje stanje razlikuje med tem, kar implementira ta izdaja OSS, in poznejšimi delovnimi
tokovi Radar. Gre za stanje na ravni kode in ne za obljubo, da je določena gostovana uvedba
ali zunanja integracija trenutno na voljo.

| Področje                             | Stanje v tej izdaji                                                                                                                                                                                                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Odjemalec podpisanega kataloga       | Implementiran za `RADAR_ENABLED`, z ločeno izrecno privolitvijo, preverjanjem Ed25519, lokalnimi šifriranimi nastavitvami/predpomnilnikom, trajnimi preglasitvami prikaza/omogočenosti, povratnimi nagrobniki, razporejevalnikom in nadzorno ploščo. |
| Aktivacija sodelujočih               | Nadzorna plošča vsebuje povezavo do postopka za uveljavljanje prek GitHub, ki ga gosti strežnik, in sprejme obstoječi ključ `omr_…`. Upravičenost sodelujočega določi zasebna storitev; odjemalec OSS ne vsebuje žetona GitHub ali logike izdajanja. |
| Aktivacija s ključem podpornika      | Implementirana. Neobdelani ključ se preveri, šifrira pri mirovanju, ob branju prikrije in pošlje samo med sinhronizacijo na strani strežnika. Sprememba ali odstranitev ključa razveljavi vse štiri predpomnilnike virov, občutljive na upravičenja. |
| Napotitvene povezave                 | Implementirane kot ločen, podpisan vir, ki se osvežuje vsako uro. Fiksne povezave so ravni skupnosti na voljo takoj; omejene kampanje ostajajo podatki sprotne ravni.                                                                                |
| Ponudbe za podpornike                | Implementirane kot ločen, podpisan vir, ki je na voljo samo v živo, in stran nadzorne plošče. Odjemalec znova preveri zaprto shemo ugodnosti, ohrani zadnji veljavni predpomnilnik, filtrira potekle vnose in izrecno označi partnerske ponudbe.     |
| Informacije in priznanje podpornikov | Implementirano kot strog, podpisan vir, ki je na voljo samo v živo, z ELO v lasti Radarja, dejansko svežino/trendom kataloga, preverjeno lokalno značko podpornika, stranjo nadzorne plošče ter ukazi CLI za stanje/sinhronizacijo samo lokalno.     |
| Plačila in transakcijska e-pošta     | Niso implementirani v odjemalcu OSS. Nakup, donacija, pregled potrdil, obnovitev in dostava pošte sodijo v zasebno storitev; razpoložljivost gostovanja je še vedno odvisna od njenega nadzorovanega uvajanja in konfiguracije ponudnika.            |
| Delovni tok raziskovalnega agenta    | Ni del te izdaje odjemalca. Skrbno izbrana vsebina virov ostaja med podatki na strani strežnika; v namestitvi OmniRoute ne deluje noben avtonomni raziskovalni agent.                                                                                |

---

## Bralnik javnih obvestil

Splošni bralnik obvestil je ločen od funkcijske zastavice Radar. Domača stran nadzorne plošče in
pregledovalnik dnevnika sprememb pridobivata javno datoteko `news.json` repozitorija z navadno zahtevo `GET` na
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Ne pošiljata nobene nastavitve Radar, poziva, konfiguracije
ponudnika, zapisa o uporabi ali lokalnega stanja opustitve.

`news.json` uporablja zaprto shemo v2, implementirano s `parseNewsPayload()`:

- `schemaVersion: 2` in omejena zbirka `items[]`;
- stabilne, enolične vrednosti `id` obvestil;
- eksplicitni polji `active` in `publishedAt` v obliki ISO;
- obvezno angleško besedilo z neobveznimi lokaliziranimi različicami;
- neobvezne povezave HTTPS brez poverilnic in ikona s seznama dovoljenih;
- izbor najnovejšega aktivnega obvestila, uporaba angleščine kot nadomestnega jezika in lokalna opustitev za posamezni ID.

Razčlenjevalnik začasno sprejema prejšnjo edninsko obliko `{ active, title, message, ... }`, da se
lahko starejše razvejitve preselijo brez nedelujočega pogleda dnevnika sprememb. Neveljavni viri so nedejavni. Vnos ob
zagonu Radar je dobavljen z `active: false`; sprememba na `true` je ločeno dejanje izdaje po združitvi in uvedbi
ter ne spremeni `RADAR_ENABLED` ali neodvisne privolitve za sinhronizacijo vira.

---

## Zastavica: `RADAR_ENABLED` (privzeto izklopljena)

Radar je od začetka do konca omejen s funkcijsko zastavico `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategorija `policies`,
`defaultValue: "false"`).

**Ko je zastavica izklopljena, ta površina ne obstaja:**

- Vse končne točke `/api/radar/*`, vključno z lokalnimi branji in zapisi stanja modela,
  vrnejo `404`, preden dostopijo do katerega koli modula Radar.
- Zasloni nadzorne plošče (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) izvedejo
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) vrne nespremenjeno izhodiščno zbirko —
  enako število vnosov, enake vrednosti in vsak vnos označen z `origin: "baseline"` — ter nikoli
  ne bere predpomnilnika vira.
- Noben omrežni klic Radar se nikoli ne izvede; vsak modul za sinhronizacijo vrne `{ status: "disabled" }`,
  preden dostopi do `fetch`.

To je stroga nadrejena zapora: vklop zastavice odklene samo _zaslone_ in ničesar
drugega. Ne naloži podatkov, ne zažene sinhronizacije v ozadju ter ne spremeni
usmerjanja ali izbire modela — glejte ločeno privolitev spodaj.

---

## Sinhronizacija podatkov je LOČENA privolitev — obljuba glede zasebnosti

Vklop `RADAR_ENABLED` samo odklene uporabniški vmesnik. Sinhronizacija vira zahteva drugo,
neodvisno privolitev, shranjeno v `radar_settings.opt_in` (`src/lib/db/radar.ts`,
selitev `136_radar_cache_settings.sql`). `syncRadar()` preveri zastavico _in_
privolitev, preden izvede kakršen koli omrežni klic:

```
Zastavica izklopljena → { status: "disabled" } — brez omrežnega klica
Brez privolitve       → { status: "opt_out" }  — brez omrežnega klica
```

Ko sta obe vklopljeni, je pot sinhronizacije naslednja:

1. `GET <osnovni URL vira>/v1/catalog/latest` z `x-omniroute-radar-schema: 2` in neobvezno
   glavo `Authorization: Bearer <ključ podpornika>` (glejte spodaj). Če glava sheme ni prisotna,
   strežniki privzeto uporabijo ločeno podpisani prehodni artefakt v1, zato starejši nameščeni odjemalci še naprej
   prejemajo posodobitve.
2. To je aplikacijski tok samo za prenos, vendar gre še vedno za zahtevo HTTPS. Gostovana
   infrastruktura prejme običajne metapodatke povezave, kot je izvorni naslov IP. Ko je konfiguriran ključ podpornika,
   sinhronizacija pošlje tudi ta ključ v glavi Bearer, da lahko storitev določi
   upravičenost. Pri natančni reviziji zasebnega strežnika, navedeni v zgornji meji dokazov,
   obračunavanje zahtev za vir uporablja zgoščene vrednosti ključev, agregirano uporabo in dnevno menjavan okrnjen HMAC
   naslova IP za ročni pregled zlorab; te tabele ne hranijo niti ključa niti naslova IP v neobdelani obliki.
   Dnevniki dostopa do infrastrukture in šifrirana odhodna vrsta za dostavo so ločene operativne
   meje.
3. OmniRoute storitvi Radar nikoli ne pošilja pozivov, odgovorov, pogovorov, poverilnic ponudnikov, prometa modelov,
   časa delovanja, zakasnitve ali lokalne konfiguracije ponudnika.
4. Odgovor se preveri, validira in lokalno shrani v predpomnilnik (glejte
   [Varnostni model](#security-model)). Radar ima natanko štiri omrežne poti na strani strežnika:
   `syncRadar()` za katalog, `syncRadarReferrals()` za napotitve ter
   `syncRadarOffers()` / `syncRadarIntel()` za ponudbe in Intel, namenjene samo podpornikom.

**Ključ podpornika** je neobvezen žeton Bearer (`radar_settings.supporter_key`),
ki storitvi vira omogoča odločitev, katero raven naj ponudi (glejte
[Ravni](#tiers-community-and-live)). Ključ je:

- **Šifrirano shranjen** z istimi pomožnimi funkcijami AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`), ki se uporabljajo za poverilnice ponudnikov.
- Nastavljen prek `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) in
  **nikoli vrnjen v odgovoru** — odgovor vrne zakrito obliko (`omr_****abcd`).
- Njegova sprememba ali odstranitev atomsko razveljavi predpomnilnike kataloga, napotitev, ponudb in Intel. Naslednja
  sinhronizacija oziroma branje na strani strežnika določi novo upravičenost; shranjevanje ključa samo po sebi ne izvede
  omrežne zahteve in ne porabi aktivacijskega ključa za enkratno uporabo.
- Poslan storitvi vira kot žeton Bearer v sinhronizacijski zahtevi GET — nič drugega o
  ključu nikoli ne zapusti odjemalca.

---

## Pravila dostopa in varnosti, prikazana pred privolitvijo

Neaktivna nadzorna plošča prikaže ta pravila iz
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **pred** katerim koli dejanjem aktivacije.
Kanonična lestvica dostopa je:

| Raven                    | Upravičenost                                                                                    | Dostop                                                    | Pravilo ponovitve/poteka                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| Skupnost                 | Kdor koli; brez ključa                                                                          | Celoten katalog z zamikom približno 30 dni                | Vedno na voljo; brez izdaje                                         |
| Zvezdica + spremljanje   | GitHub OAuth preveri tako zvezdico za repozitorij kot spremljanje lastnika                      | En vpogled v katalog v živo, nato Skupnost                | Ena izdaja na prijavo; brez ponovne izdaje                          |
| Prispevalec Top 10       | Mesta 1–10 na najnovejši popolni tedenski lestvici                                              | 365 dni dostopa v živo                                    | Prevzem na zahtevo; izpad z lestvice ne skrajša dodeljenega obdobja |
| Prispevalec Top 100      | Mesta 11–100 na tej lestvici                                                                    | 90 dni dostopa v živo                                     | Enako pravilo prevzema na zahtevo/idempotentnega prevzema           |
| Nakup podpornika         | Enkratni nakup za 6 mesecev, 1 leto ali doživljenjsko                                           | Katalog v živo, podpisane ponudbe v živo in Intel         | Brez samodejnega podaljšanja                                        |
| Donacija/ročna dodelitev | Donacija, ki jo pregleda lastnik, ali lastnikova dodelitev za izrecno število dni/doživljenjsko | Enaka upravičenost do dostopa v živo za dodeljeno obdobje | Revidirana, idempotentna dodelitev                                  |

Združeni PR-ji, uveljavitve in spremenjene vrstice so **samo vhodni podatki za razvrščanje**. Prijava zunaj Top 100 ne prejme
nobene dodelitve za prispevalce ne glede na število PR-jev. Nakupi za določen čas, donacije, obdobja za prispevalce in
ročne dodelitve se prištevajo od trenutnega datuma poteka; doživljenjski dostop prevlada. Sprememba uvrstitve nikoli
ne prekliče ali skrajša že dodeljenega časa za nazaj.

Gostovana licenca je osebna, uporabniško pravilo pa dovoljuje eno aktivno namestitev naenkrat. Ta
izdaja **ne** trdi, da uporablja strojno zaklepanje: odprtokodna sinhronizacija ne zajema prstnih odtisov strojne opreme in ne vzdržuje
kriptografskega zakupa naprave. Pri zgoraj navedeni preverjeni reviziji zasebnega strežnika uveljavljeni nadzor
obsega preverjanje upravičenosti in signal za ročni pregled, ko je isti aktivni ključ zaznan s četrtega
različnega naslova IP v 24 urah. Ta signal nikoli samodejno ne blokira ali prekliče ključa. Obnovitev
prekliče in nadomesti izgubljeni ključ, pri čemer ohrani obstoječi datum poteka; ne začne znova
kupljenega ali dodeljenega obdobja.

Ponudbe v živo so ročno kurirane in se lahko spremenijo ali potečejo. Zaslon za privolitev navaja tudi natančno
mejo zasebnosti: prenesejo se podpisani metapodatki kataloga/napotitev; veljaven ključ dodatno odklene
podpisane ponudbe in Intel; ključ Bearer in običajni metapodatki povezave dosežejo gostovano storitev;
pozivi, odgovori, pogovori, poverilnice ponudnikov, promet modelov, čas delovanja, zakasnitev in lokalna
konfiguracija ponudnikov pa ne.

---

## Pridobitev ključa podpornika

Aktivacijski zaslon (`/dashboard/radar`) vsebuje povezavi do dveh postopkov za **pridobitev**
ključa podpornika. Sam repozitorij OSS ključev nikoli ne izdaja, ne izvaja kode za plačila in
**nikoli ne navaja cene** — cene so določene in prikazane izključno na
ciljnih straneh, ne v tem repozitoriju (odločitev specifikacije D14).

- **"Sem sodelavec"** — odpre `RADAR_CONTRIBUTOR_CLAIM_URL` (privzeto
  `https://radar.omniroute.online/auth/github`), postopek uveljavljanja prek GitHub OAuth, ki gostuje na
  zasebnem strežniku Radar. Preveri najnovejšo zaključeno tedensko razvrstitev: najboljših 10 prejme 365 dni,
  uvrščeni na mesta 11–100 pa prejmejo 90 dni. Zunaj najboljših 100 število PR-jev nikoli ne zagotavlja dostopa; postopek
  namesto tega preveri ločeno raven za enkratno uporabo, ki zahteva zvezdico in sledenje.
- **"Podprite projekt"** — odpre `RADAR_SUPPORTER_PLANS_URL` (privzeto
  `https://radar.omniroute.online/planos`), gostovano stran z možnostmi enkratnega nakupa za 6 mesecev, 1 leto in
  doživljenjski dostop. Stran OSS še vedno ne prikazuje nobene denarne vrednosti.

Oba URL-ja se razrešita na strani strežnika (`src/lib/radar/links.ts`, enak vzorec
preglasitve z okoljskimi spremenljivkami kot pri `RADAR_FEED_URL`) in se posredujeta nadzorni plošči prek obstoječega
odgovora `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) —
odjemalska komponenta nikoli sama ne bere `process.env`.

| Spremenljivka                 | Namen                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Preglasi URL za uveljavljanje sodelavca (privzeto `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Preglasi URL za pakete podpornikov (privzeto `https://radar.omniroute.online/planos`).           |

### Obnovitev izgubljenega ključa podpornika

Vstopna točka za obnovitev v gostovani storitvi je `https://radar.omniroute.online/recover`; povezava do nje je tudi
na strani s paketi. Obnovitev ostaja v celoti zunaj odjemalca OSS, ker lokalna
namestitev nikoli ne prejme e-poštnega naslova kupca/sodelavca in iz
šifriranih nastavitev ne more rekonstruirati neobdelanega ključa.

1. Pošljite e-poštni naslov, povezan s ključem. Storitev vrne enako stran s potrditvijo ne glede na to, ali
   obnovljiva licenca obstaja ali ne, zato obrazec ne razkriva računov.
2. Če je uporabnik upravičen, dostavni proces pošlje kratkotrajno povezavo za enkratno uporabo. Ko jo odprete, se
   žeton nemudoma premakne v začasni šifrirani piškotek `HttpOnly`/`Secure`, nato pa sledi preusmeritev na čisti
   URL `/recover`; stran ne vsebuje žetona, e-poštnega naslova, starega ključa ali nadomestnega ključa.
3. Potrdite preklic. Zasebna storitev prekliče prejšnji ključ, ustvari nadomestnega z
   enakim paketom/datumom poteka in ga v eni transakciji uvrsti v čakalno vrsto za pošiljanje po e-pošti. Nadomestni ključ se nikoli
   ne vrne brskalniku.
4. Prilepite nadomestni ključ v `/dashboard/radar`. Stari ključ se mora zdaj znižati na `community`;
   nadomestni ključ pa mora omogočiti preverjeno sinhronizacijo `live`. Ponovno odpiranje iste povezave za obnovitev mora spodleteti
   s splošnim odgovorom o neveljavni ali potekli povezavi.

Gostovana pot za obnovitev in proces za pošiljanje e-pošte sta lahko prisotna v kodi, vendar v določeni
uvedbi še vedno nista na voljo. Postopka ne označite kot pripravljenega za produkcijo, dokler strežnik ni uveden, ponudnik
dostave ni konfiguriran z nadzorovanim prejemnikom in celotna povezava za enkratno uporabo ni preizkušena.

Ko ima obiskovalec ključ (`omr_` + 40 šestnajstiških znakov), aktivacijski zaslon
(`src/app/(dashboard)/dashboard/radar/page.tsx`) kot primarni postopek ponudi vnosno polje za
lepljenje ključa: ko ključ prilepite in oddate, se v enem klicu pošlje `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — lepljenje ključa ga nastavi in hkrati omogoči sodelovanje,
s čimer se zaslon odklene. Oblika (`omr_` + 40 šestnajstiških znakov) se zaradi boljše uporabniške izkušnje najprej preveri
na strani odjemalca s skupnim pomožnim programom `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`);
strežniška shema Zod je v vsakem primeru merodajna preverba. Ko je
ključ nastavljen, aktivacijski zaslon namesto praznega vnosnega polja prikaže zakrito obliko (`supporterKeyMasked` iz
`GET /api/radar/settings`) in kontrolnik »spremeni ključ«, ki omogoča
lepljenje novega ključa — neobdelani ključ se nikoli več ne prikaže. Zgornja gumba za uveljavljanje/pakete
ostajata način za prvotno _pridobitev_ ključa; v tem vnosnem polju ga
upravljavec, ki ga že ima, aktivira.

### Aktivacija od začetka do konca in vodena nastavitev

Zasebna storitev za vir in ta odjemalec OSS imata namerno ozko ločnico: storitev
izda in preverja ključ podpornika, lokalna namestitev OmniRoute pa ključ šifrira,
na strani strežnika sinhronizira podpisane artefakte ter vodi nastavitev ponudnika. Vrstni red podprtega preverjanja je:

1. Pridobite novo izdan ali obnovljen ključ prek postopka uveljavljanja pravic sodelujočega uporabnika, strani plans/checkout, postopka obnovitve ali od pooblaščenega upravljavca zasebnega strežnika. Ne lepite neobdelanega ključa v dnevnike, posnetke zaslona, komentarje težav ali argumente ukazne vrstice.
2. Omogočite zastavico funkcije `RADAR_ENABLED` v lokalni namestitvi OmniRoute. S tem omogočite uporabniški vmesnik, vendar ta ostane omrežno nedejaven, dokler ne shranite ločene privolitve.
3. Odprite `/dashboard/radar`, prilepite ključ in ga aktivirajte. Brskalnik pošlje eno lokalno zahtevo `POST /api/radar/settings` z vsebino `{ optIn: true, supporterKey }`; ključ se lokalno šifrira, odgovor pa vsebuje samo `omr_****<last4>`.
4. Počakajte, da zaslon za aktivacijo izvede sinhronizacijo kataloga, ali izberite **Sinhroniziraj zdaj**. Preverite, ali stran prikazuje `live`, različico vira in čas pridobitve. Za lokalno diagnostiko s preverjeno pristnostjo `GET /api/radar/status` sporoči stanje privolitve/prisotnosti ključa in štiri stanja predpomnilnika, ne da bi vrnil ključ. `POST /api/radar/sync-all` lahko izrecno osveži katalog, napotitve, ponudbe in Intel.
5. Odprite `/dashboard/radar/setup?provider=<provider>`. Sledite URL-ju za poverilnice, ki ga upravlja ponudnik, izberite **Dodaj ključ API**, shranite prek pravega ponudnikovega obrazca, vrnite se v vodnik in zaženite **Preizkusi povezavo**. Vodnik uporablja običajne poti `/api/providers` in `/api/providers/<connection-id>/test`; ne ustvari vzporedne poverilnice Radar.
6. Ko sta aktivni vsaj dve združljivi povezavi s ponudnikoma, odprite `/dashboard/radar/combos`. Preglejte predlagano družino in ustvarite kombinacijo prek obstoječega API-ja za kombinacije. Ponudbe in Intel ostanejo ločeni podpisani predpomnilniki samo za raven `live` ter jih je mogoče preveriti na namenskih straneh Radar.
7. Znova naložite `/dashboard/radar` in stran za nastavitev. Privolitev, stanje zakritega ključa, preverjeni predpomnilnik, shranjena povezava s ponudnikom in dejanje preizkusa se morajo ohraniti po ponovnem nalaganju. Dokazila zajemite šele, ko neobdelani ključ in poverilnica ponudnika nista več vidna.

Shranitev ključa sama po sebi ni dokaz upravičenosti do ravni `live`. Dokaz je kombinacija rezultata `GET /v1/license/check` zasebne storitve, ravni `live`, ki jo posreduje katalog OSS, preverjenega podpisanega predpomnilnika ter dejanskega postopka povezave s ponudnikom in njenega preizkusa. Neveljaven, potekel ali preklican ključ varno preklopi katalog na `community`; to ne sme biti navedeno kot uspešno preverjanje ključa za raven `live`.

### Povezava do zasebne skrbniške plošče

`RADAR_ADMIN_URL` po izbiri doda **Skrbništvo Radar ↗** neposredno za uporabniško postavko Radar v razdelku Stroški stranske vrstice. Privzete vrednosti namenoma nima: če spremenljivka ni nastavljena ali ni veljavna, statična stranska vrstica, ukazna paleta in zaslon za prilagajanje stranske vrstice ne vsebujejo skrbniške postavke niti zasebnega URL-ja.

Vrednost se razreši na strežniku in se prek odgovora `GET /api/settings`, ki zahteva preverjanje pristnosti za upravljanje, posreduje samo preverjeni seji nadzorne plošče ali zaupanja vrednemu lokalnemu lastniku med lokalnim začetnim zagonom brez prijave. Preverjanje pristnosti prek CLI-ja, notranje storitve in ključa API z obsegom manage te vrednosti ne prejme. Brskalnik znova preveri odgovor, preden ustvari zunanjo povezavo, ki se odpre z `noopener noreferrer`.

Uporabite URL tunela HTTPS ali tailneta brez poverilnic. Goli HTTP je sprejet samo za povratno zanko SSH, kot je `http://127.0.0.1:9351`; druge sheme, vdelane poverilnice, nepravilno oblikovani URL-ji in oddaljeni cilji HTTP se varno zavrnejo, krmarjenje pa ostane nedejavno.

---

## Varnostni model

### Podpis Ed25519 nad natančnimi bajti

Vsebina vira je podpisana z Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) preveri podpis nad **natančnimi bajti odziva**,
prejetimi prek omrežja — vsebina se pred preverjanjem nikoli znova ne serializira, zato
ponovno kodiranje bajt za bajtom ne more neopazno razveljaviti ali obiti preverjanja podpisa.
Neuspešno preverjanje (`invalid_signature`) prekine sinhronizacijo, še preden je vsebina
razčlenjena ali predpomnjena.

### Pripet javni ključ in rotacija

Javni ključ za preverjanje je pripet v `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), ki je polje, da je mogoče pred rotacijo na začetek
dodati nov ključ, medtem ko stari predpomnjeni viri, podpisani s prejšnjim ključem,
ostanejo veljavni do ponovne sinhronizacije.

### Okoljske preglasitve, prijazne razvejitvam

Dve okoljski spremenljivki omogočata, da razvejitve in samostojno gostovane namestitve
odjemalca usmerijo na svoj vir namesto na privzeto storitev OmniRoute — glejte
[Kako samostojno gostiti vir](#how-to-self-host-a-feed) spodaj:

| Spremenljivka       | Namen                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Preglasi osnovni URL vira (privzeto `https://radar.omniroute.online`).                                          |
| `RADAR_FEED_PUBKEY` | Preglasi pripeti javni ključ (SPKI v obliki base64-DER ali PEM) in vgrajeno polje nadomesti s tem enim ključem. |

### Najnižja različica

`syncRadar()` zavrne preneseni vir, katerega `version` ni strogo novejša od
trenutno predpomnjene različice (`compareVersions()`, primerjava s pikami ločenega
zapisa `YYYY.MM.DD.n`) — `{ status: "stale" }`. To preprečuje, da bi ogrožena ali
napačno konfigurirana končna točka vira odjemalca povrnila na starejšo, drugače
podpisano vsebino.

### Dva datuma in zakaj se ohranita oba

Predpomnjeni vir vsebuje dva ločena datuma, razlog za ohranjanje obeh pa je prav
preprečevanje njune zamenjave:

| Polje         | Izvor               | Kaj pove                               |
| ------------- | ------------------- | -------------------------------------- |
| `generatedAt` | podpisano telo vira | kako stari so **podatki**              |
| `fetchedAt`   | ura te namestitve   | kdaj jih je ta namestitev **prenesla** |

Vir, prenesen pred nekaj minutami, lahko vsebuje več tednov stare podatke, zato
`fetchedAt` sam po sebi skrbniku ne pove, ali je prekrivna plast novejša od osnovnih
podatkov, na katerih temelji. Oba datuma sta shranjena v `radar_feed_cache`, vrnjena
prek `getRadarCatalog().meta` in ločeno navedena v `GET /api/radar/status`. Vrstica,
predpomnjena, preden je obstajal stolpec `generated_at` (selitev 163), se prebere kot
`null` — neznano ostane neznano, namesto da bi prevzelo čas prenosa.
`radar_referrals_cache` hrani svoj `generated_at` že od selitve 142.

Zgoraj opisana najnižja različica primerja `version`, ne katerega koli od datumov.

Dve vrzeli ostajata, obe namenoma: nadzorna plošča še vedno prikazuje samo `Last fetched`,
zato je za prikaz datuma gradnje potrebna nova oznaka (in njenih 41 lokaliziranih vnosov);
predpomnilnika ponudb in obveščevalnih podatkov pa datuma gradnje sploh ne hranita, čeprav
ga njuni shemi vira vsebujeta — `GET /api/radar/status` zato za ta dva vira polje izpusti,
namesto da bi vrnil `null`, kar bi bilo razumljeno kot »neznano«.

### Preverjanje sheme

Preneseni bajti se razčlenijo in preverijo glede na `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, shema Zod) **po** preverjanju podpisa.
Neujemanje s shemo vrne `{ status: "invalid_schema" }`, predpomnilnik pa ostane
nespremenjen. Predpomnjena vsebina se zaradi zaščite znova preveri ob vsakem branju
(`getRadarCatalog()`) — ob poškodovani ali ročno urejeni vrstici predpomnilnika se
uporabi osnovni vir, namesto da bi bila taka vrstica posredovana.

### Omejitev velikosti odziva (10 MB)

`syncRadar()` uveljavlja **strogo omejitev 10 MB** za telo odziva vira — podpisani
vir je dokument JSON velikosti nekaj KB, zato vse, kar presega to mejo, kaže na napačno
konfiguriran ali sovražen `RADAR_FEED_URL` (oziroma na izvorni strežnik, ki vrača
neuporabne podatke), ne pa na veljaven katalog. Omejitev se uveljavlja na dveh ravneh:

1. Predhodno preverjanje `Content-Length` v celoti preskoči branje telesa, če
   glava že navaja vrednost nad omejitvijo.
2. Preverjanje sprotne vsote med branjem telesa uveljavi omejitev tudi, kadar
   `Content-Length` manjka ali navaja manjšo vrednost od dejanske velikosti — sami
   glavi se nikoli ne zaupa. Združevanje zbranih kosov ohrani natančne bajte,
   potrebne za poznejše preverjanje podpisa Ed25519.

Preseganje omejitve vrne `{ status: "too_large" }` in pusti predpomnilnik
nespremenjen, skladno z enakim nedestruktivnim vzorcem kot pri vseh drugih napakah
sinhronizacije (`invalid_signature`, `invalid_schema`, `stale`).

---

## Ravni: `community` in `live`

Shema vira vsebuje polje `tier: "community" | "live"`, ki ga **na strani strežnika**
določi storitev vira na podlagi zahteve (prisotnosti in veljavnosti ključa podpornika)
— odjemalec nikoli ne določa svoje ravni.

- **`community`** — brezplačni katalog, ki za približno 30 dni zaostaja za najnovejšimi
  podatki. To prejme neoverjena zahteva ali zahteva z neveljavnim ključem.
- **`live`** — najnovejši katalog, ki se posreduje zahtevam z veljavnim ključem
  podpornika.

**Neveljaven ali potekel ključ podpornika povzroči prehod na `community` — nikoli ne
povzroči napake.** Pot sinhronizacije razlikuje samo napake podpisa/sheme/različice (vse
so odpravljive in nobena ni usodna za predpomnjeno stanje) od uspešnega rezultata `{ status:
"updated", version, tier }`. Odjemalcu ni treba obravnavati nobene poti napake, specifične
za raven.

### Posredovana raven izvira iz glave odgovora, ne iz podpisanega telesa

Polje `tier` v **telesu** podpisanega vira je vedno `"live"` — storitev vira objavi
**dva podpisana artefakta za vsako različico**: artefakt live vključuje trenutne kampanje,
artefakt community pa jih izpusti. Vsak artefakt je podpisan na podlagi svojih natančnih bajtov.
Telo še vedno ne predstavlja odločitve o upravičenosti; raven, ki je dejansko izbrana za zahtevo,
je navedena v **glavi odgovora `x-omniroute-feed-tier`**, o njej pa strežnik odloči na podlagi
ključa `Authorization` v zahtevi.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) je edino mesto,
ki razreši raven, ki ji mora odjemalec zaupati:

1. Razčleni `x-omniroute-feed-tier` s `RadarTierSchema` (Zod) — manjkajoča glava ali
   vrednost, ki ni natančno `"community"` ali `"live"`, se obravnava kot **neprisotna**
   (nikoli se ji ne zaupa tako, kot je, in se ne shrani v predpomnilnik/uporabniški vmesnik;
   to zajema tudi starejše strežnike vira, ki so obstajali pred uvedbo te glave).
2. Na polje `tier` podpisanega telesa (vedno `"live"`) se opre samo, če 1. korak
   ne vrne ničesar.
3. Razrešena raven je tista, ki se predpomni in vrne kot `{ status: "updated",
version, tier }` — nadzorna plošča prikazuje to vrednost, nikoli neobdelanega polja
   telesa.

---

## Pravila združevanja prekrivne plasti ob branju

`applyFeed()` (`src/lib/radar/applyFeed.ts`) združi predpomnjeni vir **prek**
statičnega izhodišča **ob branju** znotraj `getRadarCatalog()`. Izhodiščna tabela
(`FREE_MODEL_BUDGETS`) se nikoli ne spremeni — ob vsakem klicu se na novo izračuna
`MergedEntry[]`.

Štiri pravila po prednostnem vrstnem redu:

1. **Vir nikoli ne prepiše lokalne preglasitve.** Za vsako polje posebej: če je
   operater prilagodil polje vnosa (zemljevid `localOverrides`, indeksiran z
   `provider:modelId`), se vrednost vira za to specifično polje preskoči — prevlada
   operaterjeva vrednost.
2. **`enabled: false` onemogoči vnos in zabeleži izvor.** Vnos vira, ki izklopi
   vnos, v združenem rezultatu nastavi `enabled: false` in `disabledBy: "radar"`,
   da lahko uporabniški vmesnik pojasni, _zakaj_ se je vnos iz razpoložljivega
   spremenil v onemogočenega.
3. **Vnos, ki ga je dodal uporabnik in ga ni v viru, ostane nespremenjen.** Vnosi,
   ki obstajajo samo v izhodišču (ali so bili dodani lokalno) in nimajo ustreznega
   vnosa v viru, ostanejo nespremenjeni.
4. **Označeni izbrisani vnos ni nikoli obnovljen.** Če je operater izrecno izbrisal
   vnos (množica `tombstones`), ga vir s ponovno dodanim `provider:modelId` v poznejši
   različici ne obnovi.

Polja, ki jih je mogoče urejati, in oznake izbrisa so trajno shranjeni v
`radar_local_model_state` (migracija `153_radar_local_model_state.sql`). Javni vmesnik
za podatkovno zbirko (`src/lib/db/radar.ts`) pretvori te vrstice v zemljevid
`localOverrides` in množico `tombstones`, ki ju uporablja `applyFeed()`; produkcijski
`getRadarCatalog()` naloži to stanje po uspešnem prehodu preverjanj zastavice,
predpomnilnika in sheme. Operater lahko ureja samo `displayName` in `enabled`.
Identitete ponudnika/modela, izvora vira, kvote, zmožnosti, pogojev uporabe in podatkov
za nastavitev ni mogoče zapisovati prek tega vmesnika.

Nadzorna plošča ponuja štiri lokalna dejanja:

- **Uredi** spremeni lokalno prikazno ime in stanje omogočenosti.
- **Ponastavi lokalne spremembe** počisti obe polji, ki ju je mogoče urejati, ne da bi
  spremenil oznako izbrisa.
- **Skrij** ustvari oznako izbrisa, zato poznejše posodobitve vira ne morejo znova
  ustvariti vrstice.
- **Obnovi** odstrani oznako izbrisa; vsaka ločeno shranjena preglasitev ostane
  veljavna.

Nastavitev vira `enabled: false` ostaja varnostna izjema: prevlada nad zastarelo lokalno
nastavitvijo `enabled: true`, ohrani združeni vnos onemogočen in zabeleži
`disabledBy: "radar"`.

Objave kataloga uporabljajo `schemaVersion: 2`. `contextWindow` ter vsako izmed polj `tools`, `vision` in
`thinking` so neodvisno `number | null` / `boolean | null`: `null` pomeni neznano, medtem ko
`false` pomeni, da uradni vir ponudnika, potrjen z D16, izrecno navaja, da zmožnost ni na voljo.
Notranje zastavice registra/specifikacij modelov OmniRoute se nikoli neposredno ne pretvorijo v dejstva vira. Odjemalec
še vedno sprejema posnetke v1; ker je stari gradnik uporabljal `false` kot označevalnik odsotnosti, se vrednost v1 `false`
normalizira v neznano, medtem ko v1 `true` ostane dejstvo. Neznane različice sheme se varno zavrnejo, zadnji
veljavni predpomnilnik pa ostane na voljo. Vsak model v2 z neničelno vrednostjo konteksta/zmožnosti mora vsebovati
`metadataEvidenceUrls[]` HTTPS brez poverilnic; sicer preverjanje veljavnosti sheme ne uspe in predpomnilnik
se ne zamenja. Tabela kataloga prikazuje vsa tri stanja kot `✓`, `✕` in `?`.

### Vodene kombinacije in dostop MCP

Potrjene vrednosti `familyId` se ohranijo skozi prekrivanje ob branju in poganjajo čisti
modul `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Družina je predlagana
samo, če imata vsaj dva različna ponudnika aktivne povezave in ponujata natančno določen, skrbno izbran ID modela.
Onemogočeni modeli, neaktivni ponudniki, manjkajoči ID-ji modelov, družine z enim članom in dvoumna
ujemanja vzdevkov/predpon se varno zavrnejo. Predlogi uporabljajo obstoječo strategijo `priority`, pri čemer je
največji ponavljajoči se mesečni proračun naveden prvi; uporabniški vmesnik jih ustvari samo prek `POST /api/combos`.

Vodeni uporabniški vmesnik je na voljo na poti `/dashboard/radar/combos`. Bere samo lokalni
končni točki `GET /api/radar/catalog` in `GET /api/combos/builder/options`. Nikoli ne sproži sinhronizacije Radar,
ne bere poverilnic ponudnika in ne zapisuje neposredno v podatkovno zbirko kombinacij.

Odjemalci MCP lahko berejo isto lokalno projekcijo z `omniroute_radar_catalog` (`read:radar`). Izbirni
filtri `provider`, `familyId` in `enabledOnly` se ovrednotijo po enem lokalnem branju
`GET /api/radar/catalog`. Njegov omejeni izhod vključuje metapodatke kataloga ter ponudnika/model,
prikazno ime, `familyId`, kvoto, zmogljivosti, stanje omogočenosti, izvor in `disabledBy`; URL-ji za nastavitev,
koraki, povezave, e-poštni naslovi, ključi in napotitveni podatki niso nikoli vrnjeni. To orodje je
samo za branje in nikoli ne prikliče `/api/radar/sync`.

### Oznake izvora

Vsak združeni vnos vsebuje polje `origin`, ki ga uporabniški vmesnik prikaže kot značko:

- `"baseline"` — nespremenjeno glede na statični katalog izdaje.
- `"radar"` — eno ali več polj je bilo osveženih iz vira.
- `"local"` — upravljavec ima za ta vnos vsaj eno lokalno preglasitev (lokalne
  preglasitve imajo v skladu s pravilom 1 vedno prednost pred virom, ne glede na to, kaj navaja vir).

---

## Lokalne površine — nikoli posredniški strežnik za vire

Spodnje družine lokalnih poti Radar podpirajo uporabniški vmesnik v `src/app/api/radar/`:

| Pot                            | Metoda | Namen                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Vrne združeni katalog (`getRadarCatalog()`) iz lokalnega predpomnilnika.                                                            |
| `/api/radar/sync`              | POST   | Sproži `syncRadar()` na strani strežnika in vrne končno stanje.                                                                     |
| `/api/radar/settings`          | GET    | Vrne `{ optIn, hasSupporterKey, supporterKeyMasked }` — nikoli neobdelanega ključa.                                                 |
| `/api/radar/settings`          | POST   | Nastavi privolitev in/ali (šifrirani) ključ podpornika.                                                                             |
| `/api/radar/referrals`         | GET    | Vrne `{ fixed, campaigns, tier }` iz lokalnega predpomnilnika — glejte [Napotitvene povezave](#referral-links-free-credits) spodaj. |
| `/api/radar/offers`            | GET    | Vrne aktivne ponudbe iz preverjenega lokalnega sprotnega predpomnilnika; nikoli ne vrne ključa podpornika.                          |
| `/api/radar/offers/sync`       | POST   | Sproži strežniški cevovod `syncRadarOffers()`, ki uporablja samo sprotni ključ.                                                     |
| `/api/radar/intel`             | GET    | Vrne preverjene lokalne sprotne podatke Intel in logično vrednost prepoznave podpornika; nikoli identitete ali ključa.              |
| `/api/radar/intel/sync`        | POST   | Sproži strežniški cevovod `syncRadarIntel()`, ki uporablja samo sprotni ključ.                                                      |
| `/api/radar/status`            | GET    | Vrne lokalne nastavitve samo za branje in stanje predpomnilnika za katalog, napotitve, ponudbe ter Intel, brez skrivnosti.          |
| `/api/radar/sync-all`          | POST   | Zažene vse štiri strežniške module za sinhronizacijo in vrne ločeno stanje za vsak vir.                                             |
| `/api/radar/local-model-state` | GET    | Navede trajno shranjene preglasitve in nagrobnike za kontrolnike urejanja/obnavljanja.                                              |
| `/api/radar/local-model-state` | PATCH  | Nastavi ali počisti preverjeni polji preglasitve `displayName`/`enabled`.                                                           |
| `/api/radar/local-model-state` | PUT    | Ustvari ali odstrani nagrobnik z `{ provider, modelId, tombstoned }`.                                                               |
| `/api/radar/local-model-state` | DELETE | Počisti polja preglasitve, ki jih je mogoče urejati, pri tem pa ohrani morebitni nagrobnik.                                         |

**Strogo pravilo: te poti nikoli ne posredujejo zahtev storitvi za vire.** Brskalnik vedno komunicira
samo z lokalnim strežnikom OmniRoute. Štirje moduli, ki dostopajo do storitve Radar, so
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (napotitve) in
`src/lib/radar/offersSync.ts` (ponudbe) ter `src/lib/radar/intelSync.ts` (Intel); vsi se izvajajo
na strani strežnika, nikoli na strani odjemalca. Tako URL vira in morebitni ključ
podpornika v celoti ostaneta zunaj omrežnega prometa, vidnega odjemalcu.

Vse končne točke Radar vrnejo `404`, ko je `RADAR_ENABLED` izklopljen (glejte
[Zastavica](#flag-radar_enabled-default-off) zgoraj), odzive z napakami poti pa obdelajo prek
`buildErrorBody()`/`sanitizeErrorMessage()` skladno s pravilom repozitorija za čiščenje napak
(`docs/security/ERROR_SANITIZATION.md`).

### Preverjanje pristnosti

Vse končne točke Radar zahtevajo preverjanje pristnosti prek `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — piškotek seje nadzorne plošče ali ključ API z obsegom
upravljanja, kar je enaka zaščita kot pri preostalih poteh `/api/settings/*`. Preverjanje
`404` pri izklopljeni zastavici se vedno izvede **pred** preverjanjem pristnosti, zato namestitev
z izklopljenim `RADAR_ENABLED` ostane bajtno enaka (brez poziva za preverjanje pristnosti zgolj
zato, da bi izvedeli, da površina ne obstaja); ko je zastavica vklopljena, zahteva brez preverjene
pristnosti prejme `401` pred kakršnim koli branjem iz zbirke podatkov ali pisanjem vanjo.
`GET /api/radar/settings` ne glede na stanje preverjanja pristnosti nikoli ne vrne neobdelanega
ključa podpornika — vrne samo njegovo zakrito obliko in logično vrednost `hasSupporterKey`.

---

## Ponudbe za podpornike

Ponudbe uporabljajo lasten podpisan artefakt, `GET /v1/offers/latest`, in si nikoli ne delijo predpomnilnika kataloga ali
napotitev. Strežniška končna točka zahteva veljaven aktivni podpornikov ključ Bearer; nadomestna možnost
za skupnost ne obstaja. `syncRadarOffers()` se zato ustavi pred dostopom do omrežja, kadar je zastavica funkcije
izklopljena, upravljavec ni podal soglasja ali pa ni konfiguriran noben podpornikov ključ.

Po uspešni zahtevi GET odjemalec preveri podpis Ed25519 nad natančnimi bajti odgovora,
validira `RadarOffersFeedSchema`, zahteva, da tako podpisano telo kot tudi
glava `x-omniroute-feed-tier` vsebujeta vrednost `live`, uveljavi strogo novejšo različico s pikami in šele nato
atomsko zamenja `radar_offers_cache` (migracija `144_radar_offers_cache.sql`). Velja enaka omejitev 10 MB
za glavo in tok skupaj kot pri drugih virih. Napake podpisa, sheme, ravni, ponovitve, velikosti, HTTP
in omrežja ohranijo zadnji preverjeni predpomnilnik.

Zaprta oblika ponudbe podpira tri primerljive vrste ugodnosti: odstotek v bazičnih točkah, dobropis
v manjših denarnih enotah ali dneve preizkusnega obdobja. Partnerska ponudba mora vključevati javno osnovo iste vrste,
njena ugodnost pa mora biti strogo večja; uradne ponudbe nimajo partnerske osnove. URL-ji morajo uporabljati HTTPS
in ne smejo vsebovati poverilnic. `getRadarOffers()` pri vsakem lokalnem branju preventivno ponovno validira predpomnjeno koristno vsebino in izloči
potekle vnose; `/dashboard/radar/offers` pred prikazom znova izloči potekle vnose,
uporabi portugalsko besedilo, kadar je na voljo, sicer pa angleško, in partnerske ponudbe izrecno označi.

Brskalnik kliče samo lokalne poti: prebere maskiran posnetek nastavitev, zahteva
osvežitev na strežniški strani prek `POST /api/radar/offers/sync`, nato pa prebere `GET /api/radar/offers`. Če
ključa ni, namesto poskusa zahteve do vira prikaže obstoječe povezave za sodelujoče in podporo. Zunanje
povezave do ponudb se odprejo v novem zavihku z `noopener noreferrer`. V tej izdaji ni izpostavljeno nobeno orodje MCP
`radar_offers`.

---

## Radar Intel, značka podpornika in CLI

Intel je podpisan artefakt na `GET /v1/intel/latest`. Zaprta shema `RadarIntelFeedSchema` sprejema
samo razvrstitve ELO v lasti storitve Radar, ki jih zasebni skrbnik izpelje iz potrjenih primerjav, ter dejanske
razlike v starosti/številu kataloga, izpeljane iz podpisanih posnetkov kataloga. Metodologija je določena na začetno
oceno 1000 in K=32. Prazna razvrstitev je veljavna, kadar ni bila potrjena nobena primerjava; odjemalec
je nikoli ne ustvari sintetično.

`syncRadarIntel()` uporablja enake zahteve kot ponudbe: strežniški Bearer, 30-sekundno časovno omejitev, omejitev pretočnih podatkov na 10 MiB,
preverjanje Ed25519 nad natančnimi bajti, strogo shemo, zahtevo po vrednosti `live` v telesu/glavi, spodnjo mejo različice in
ohranitev zadnjega veljavnega predpomnilnika. Ko je preverjeni aktivni posnetek trajno shranjen, odjemalec
izpelje `radar:<sha256(supporter key)>`, shrani samo to enosmerno identiteto in odda namenski
dogodek priznanja `radar_supporter`. Njegova značka `radar-supporter` je idempotentna in dodeli nič XP;
nikoli ne posodablja lestvic najboljših ali ponovno uporabi `token_share`. `/dashboard/radar/intel` prikaže značko
samo na podlagi preverjenih metapodatkov lokalnega predpomnilnika.

CLI ponuja `omniroute radar status` in `omniroute radar sync`. Oba komunicirata samo z
lokalnim API-jem OmniRoute. `status` izvede zahtevo samo za branje `GET /api/radar/status`; `sync` pošlje eno
zahtevo `POST /api/radar/sync-all` in izpiše rezultat za vsak vir. Noben ukaz ne bere, sprejema ali izpisuje
podpornikovega ključa in noben ne vzpostavlja neposrednega stika s storitvijo Radar.

---

## Napotitvene povezave (brezplačni krediti)

Napotitvene povezave se zagotavljajo iz **samostojnega, vedno aktualnega** vira —
`GET /v1/referrals/latest` — ločeno od kataloškega vira. To je namerno: kataloški vir
na skupnostni ravni je posnetek, ki je lahko star do 30 dni, zato je napotitvena
povezava, pridobljena iz njega, za dejanskim seznamom povezav na strežniku zaostajala
za enako obdobje (novo dodana napotitvena povezava brezplačnega/skupnostnega uporabnika
ni dosegla tudi do enega meseca). Vir napotitev to zamudo odpravlja z lastnim,
bistveno pogostejšim sinhroniziranjem.

```ts
// Telo odgovora GET /v1/referrals/latest (podpisano z Ed25519, isti pripeti ključ kot
// pri kataloškem viru):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministično: max(updatedAt) vseh napotitvenih
                                  // povezav, zato dve enaki zahtevi ustvarita povsem enake
                                  // podpisane bajte/podpis
  referrals: {
    fixed: RadarReferral[],      // prisotno na VSEH ravneh, vključno z brez avtentikacije/skupnostno
    campaigns: RadarReferral[],  // izpolnjeno samo za veljaven aktivni (podporniški) ključ Bearer;
                                  // zahteve brez avtentikacije/s pretečenim ključem prejmejo []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Za razliko od kataloškega vira to telo sploh ne vsebuje polja `tier` — strežnik se
za vsako zahtevo odloči, kaj vključiti, na podlagi ključa `Authorization`, zato je
glava odgovora `x-omniroute-feed-tier` EDINI vir podatka o zagotovljeni ravni
(`referralsSync.ts::syncRadarReferrals`); manjkajoča ali neprepoznana glava se obravnava
kot `"community"`, kar je predpostavka z najmanj pravicami. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) preveri veljavnost celotnega telesa in ponovno
uporabi isto shemo `RadarReferralSchema` za posamezno napotitev, izvoženo iz
`feedSchema.ts`, tako da oba vira posamezne napotitve preverjata enako. Vsak
`RadarReferral.url` mora uporabljati `https://` — URL z `http://` ne prestane
preverjanja veljavnosti sheme.

STARO polje `referrals`, vdelano v katalog v `RadarFeedSchema` (`feedSchema.ts`), je
ohranjeno zaradi združljivosti za nazaj z že predpomnjenimi kataloškimi viri, vendar ga
`getRadarReferrals()` ne bere več — glejte [Dostopnik](#accessor) spodaj.

### Sinhronizacija

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) je EDINI modul, ki za
napotitve dostopa do omrežja, in natančno posnema pogodbo funkcije `syncRadar()`:
izklopljena zastavica → `disabled`; zavrnjena privolitev → `opt_out`; prenese
`${RADAR_FEED_URL}/v1/referrals/latest` (z enakimi razvejitvenimi preglasitvami
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` kot katalog), preveri podpis Ed25519 nad točnimi
bajti odgovora (`verifyFeedBytes`), preveri veljavnost glede na
`RadarReferralsFeedSchema` in vsebino predpomni v tabelo `radar_referrals_cache`
(migracija `142_radar_referrals_cache.sql`) — tabelo, ki je popolnoma ločena od
kataloške tabele `radar_feed_cache`. Omejitev odgovora na 10 MB in spodnja meja
`generatedAt` zavrneta dohodni vir, ki je starejši od predpomnjenega, s čimer
preprečujeta ponovno predvajanje starejšega podpisanega artefakta. Enak časovni žig je
sprejet: strežnik različicama napotitev za skupnostne in aktivne uporabnike namerno
dodeli isti deterministični `generatedAt`, zato se lahko podpisana koristna vsebina in
zagotovljena raven po spremembi podporniškega ključa spremenita, ne da bi se spremenil
osnovni nabor povezav. Nikoli ne sproži izjeme — vedno vrne objekt stanja; napake v
polju `reason` nikoli ne vsebujejo sledi sklada.

Predpomnilnik napotitev ohranjata aktualen dva sprožilca, oba neodvisna od lastnega
24-urnega intervala kataloga:

- **Sinhronizacija ob branju** — `GET /api/radar/referrals` sam pokliče
  `syncRadarReferrals()` neposredno, kadar predpomnilnik manjka ali je starejši od
  `REFERRALS_STALE_MS` (1h, `shouldSyncReferralsOnRead()`), preden postreže odgovor.
  Tako so fiksne povezave »vedno aktualne« že ob naslednjem nalaganju nadzorne plošče,
  brez čakanja na časovnik v ozadju.
- **Stranska sinhronizacija razporejevalnika** — `radarSchedulerTick()` (`scheduler.ts`)
  neodvisno oceni zastarelost napotitev ob istem urnem koraku, ki se uporablja za
  katalog, in po potrebi pokliče `syncRadarReferrals()`. To se izvede ne glede na to,
  ali je bil v tem koraku čas za katalog, in nikoli ne vpliva na obliko
  `RadarTickResult` (le stranski učinek po najboljših močeh, ki ob napaki ne ukrepa).

### Dostopnik

`src/lib/radar/index.ts` izvaža dva dostopnika samo za branje, od katerih nobeden
nikoli ne sproži izjeme (enaka obrambna pogodba kot pri `getRadarCatalog()` —
izklopljena zastavica, odsoten predpomnilnik ali poškodovana predpomnjena koristna
vsebina vedno vrnejo prazno obliko namesto napake):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  ki bere iz `radar_referrals_cache` (prek `getRadarReferralsCache()`) in preverja
  veljavnost z `RadarReferralsFeedSchema` — **ne** iz kataloškega predpomnilnika.
- `getDefaultReferralFor(provider)` → napotitev `fixed` z `isDefault: true` za tega
  ponudnika ali `null`. Pregleduje samo `fixed` — kampanja se nikoli ne uporabi kot
  »privzeta« povezava ponudnika.

Dejansko pravilo za določanje, »katera napotitev je privzeta za ponudnika«, je v
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), majhni čisti funkciji **brez
uvoza podatkovne zbirke** — varno jo je uvoziti v komponento `"use client"`.
`getRadarReferrals`/`getDefaultReferralFor` (v `index.ts`) uvozita `@/lib/db/radar`
in zato ostaneta omejena na strežnik; nadzorna plošča ponudnikov namesto `index.ts`
neposredno uvozi `referrals.ts` (glejte spodaj), da prepreči vključitev
`better-sqlite3` v paket za brskalnik.

### `GET /api/radar/referrals`

Sledi popolnoma enakemu vrstnemu redu preverjanj kot vse druge poti Radar: `RADAR_ENABLED` je izklopljen →
`404` (preverjeno najprej, bajtno identično obnašanje); uporabnik ni preverjen → `401`; sicer
ob zastarelosti sproži sinhronizacijo ob branju (glejte zgoraj), nato pa vrne `200` z
`{ fixed, campaigns, tier }` — `tier` prihaja neposredno iz (morebiti pravkar osvežene)
vrstice predpomnilnika in je zgolj informativen (uporablja se za spodnje nevsiljivo
promocijsko besedilo v uporabniškem vmesniku). Nikoli ne posreduje zahtev neposredno
strežniku vira — izvorna koda same poti ne vsebuje klica `fetch(`; omrežna komunikacija
vedno poteka samo znotraj `syncRadarReferrals()`, po enakem načelu uporabe izključno
lokalnega predpomnilnika kot pri `/api/radar/catalog`.

### Uporabniški vmesnik nadzorne plošče — zavihek »Brezplačni dobroimetji« na `/dashboard/radar`

Obstoječo stran Radar (`src/app/(dashboard)/dashboard/radar/page.tsx`) ponovno uporabi
kot drugi zavihek, namesto da bi uvedel novo pot — tako je obseg usmerjanja/i18n manjši
za funkcionalnost, ki je različica podatkov, ki jih stran že pridobiva. Po privolitvi
vrstica z zavihki ponuja **Katalog** (obstoječa tabela) in **Brezplačni dobroimetji**:

- Fiksne povezave so združene po ponudnikih, pri čemer vsaka prikazuje `requiredAction`
  (če je prisoten) in gumb z `target="_blank" rel="noopener noreferrer"` do napotitvenega
  URL-ja.
- Kampanje prikazujejo enako, poleg tega pa še `validUntil`, če je prisoten.
- Ko je `campaigns` prazen **in** je posredovana raven `community`, uporabniški vmesnik
  prikaže kratko promocijsko opombo (»časovno omejene kampanje so dodatek za podpornike«)
  — ta **nikoli** ne skrije ali omeji seznama fiksnih povezav, ki ostane v celoti
  zapolnjen za vsako raven. Promocija je zgolj nevsiljivo sporočilo, nikoli ovira.

### Napotitvena povezava na imenu ponudnika (nadzorna plošča ponudnikov)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
je ime ponudnika že povezoval s `providerInfo.website`, kadar je bil ta prisoten, z enim
obstoječim primerom monetizirane povezave: opombo ob partnerski povezavi Kimi
(Moonshot AI) (ključ i18n `providers.kimiPartnerLinkNote`). D28 za privzete napotitvene
povezave Radar ponovno uporabi natanko enak vzorec diskretne opombe, namesto da bi
uvedel nov ključ.

Ohlapna sklopljenost po zasnovi:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  je **čista** funkcija — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — brez odvisnosti od `@/lib/radar` ali `@/lib/db/*`. Datoteka `providerPageUtils.ts`
  kot celota ostane brez teh uvozov (kar preverja
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponenta `"use client"`) je edino mesto, kjer je
  dovoljeno pridobivati podatke Radar — prek `fetch("/api/radar/referrals")`, po istem
  vzorcu lokalne poti, ki ga uporablja tudi sama stran nadzorne plošče Radar — privzeto
  napotitveno povezavo pa izračuna na strani odjemalca s `findDefaultReferral()` iz
  datoteke `src/lib/radar/referrals.ts`, ki ni odvisna od podatkovne zbirke.
- Ko je `RADAR_ENABLED` izklopljen, zahteva vrne 404, `referralUrl` ostane `null`,
  `resolveProviderHeaderLink()` pa vrne nespremenjeni statični `website` iz kataloga —
  stran ponudnika je bajtno identična stanju pred uvedbo te funkcionalnosti. Enak rezultat
  je dosežen, kadar predpomnilnik še ne obstaja ali za določenega ponudnika ni privzete
  napotitvene povezave.
- Ko se privzeta napotitvena povezava uporabi, `ProviderPageHeader` prejme
  `isReferralLink` in prikaže enako diskretno opombo/namig kot pri partnerski povezavi
  Kimi (s ponovno uporabo ključa `providers.kimiPartnerLinkNote`) — nikoli nove,
  ločene vizualne obravnave.

---

## Kako samostojno gostiti vir

Razcep ali uporabnik, ki želi samostojno gostovanje in popoln nadzor nad katalogom, lahko zažene lastno storitev vira, ne da bi spreminjal kodo odjemalca:

1. Zagotovite končno točko `GET /v1/catalog/latest`, ki vrne telo JSON, skladno s shemo `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — na vrhnji ravni mora vsebovati `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` in `totals`. Upoštevajte `x-omniroute-radar-schema: 2`; strežnik, združljiv s prehodnim obdobjem, mora zahteve brez te glave privzeto preusmeriti na ločeno podpisan artefakt v1.
2. Natančne bajte odgovora podpišite s parom ključev Ed25519 in vrnite podpis v zapisu base64 v glavi odgovora `x-omniroute-feed-signature`.
3. Nastavite `RADAR_FEED_URL` na novi osnovni URL in `RADAR_FEED_PUBKEY` na ustrezni javni ključ (SPKI v zapisu base64-DER ali PEM) — glejte [referenco okoljskih spremenljivk](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Omogočite `RADAR_ENABLED` in sodelovanje potrdite prek `POST /api/radar/settings` (`{ optIn: true }`).

Druge spremembe kode niso potrebne — `verifyFeedBytes()` samodejno uporabi nadomestno nastavitev (`getFeedPublicKeys()` v `src/lib/radar/pinnedKeys.ts`), primerjava različic, preverjanje sheme in pravila združevanja pa se za samostojno gostovani vir uporabijo na enak način.

Napotitvene povezave (glejte [Napotitvene povezave (brezplačno dobroimetje)](#referral-links-free-credits) zgoraj) so ločen, neobvezen artefakt: razcep, ki zagotavlja samo `/v1/catalog/latest`, še vedno deluje v celoti — `syncRadarReferrals()` ob odgovoru `404` iz `/v1/referrals/latest` varno preide v `{ status: "error" }`, predpomnilnik pa preprosto ostane prazen, zato `GET /api/radar/referrals` še naprej vrača `{ fixed: [], campaigns: [], tier: null }`, namesto da bi povzročil napako na preostanku strani. Če želite ponujati tudi napotitvene povezave, zagotovite `GET /v1/referrals/latest`, ki je skladen s shemo `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`), in ga podpišite z istim parom ključev Ed25519 kot vir kataloga.

Ponudbe za podpornike so še en neobvezen artefakt. Če jih želite zagotavljati, implementirajte `GET /v1/offers/latest` z zaprto shemo `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), zahtevajte aktivno upravičenost, vrnite `x-omniroute-feed-tier: live` in natančne bajte podpišite z istim ključem. Če razcep izpusti to končno točko, obnašanje kataloga in napotitev ostane nespremenjeno; osvežitev ponudb ne uspe na nedestruktiven način, zadnji preverjeni lokalni predpomnilnik ponudb pa ostane na voljo.

Intel je na enak način neobvezen. Uporabnik samostojnega gostovanja lahko zagotovi `GET /v1/intel/latest` z uporabo sheme `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), zahteva aktivno upravičenost, vrne `x-omniroute-feed-tier: live` in natančne bajte podpiše s skupnim ključem Ed25519. Če je končna točka izpuščena, katalog, napotitve in ponudbe ostanejo nespremenjeni; osvežitev Intel ohrani morebitni zadnji preverjeni lokalni posnetek.

---

## Povezana dokumentacija

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — vzorec odzivov ob napakah, ki mu sledijo poti `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — referenca za `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
