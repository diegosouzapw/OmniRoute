# RADAR (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

# Radar katalog besplatnih modela

> **Izvor istine:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Posljednje ažurirano:** 2026-09-01 — v3.8.51
> **Granica dokaza hostovanog servisa:** pravila na strani servera opisana ovdje su verifikovana
> 2026-09-01 naspram namjerno privatnog Radar servera na tačnoj reviziji
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Ta implementacija nije distribuirana u
> ovom OSS repozitoriju; dostupnost hostovanog servisa ostaje zasebno operativno stanje.

Radar je **ocpionalni dodatak** koji preklapa potpisani, svježe pripremljeni katalog besplatnih
modela preko osnovne verzije izdanja (`FREE_MODEL_BUDGETS` u
`open-sse/config/freeModelCatalog.data.ts`). Postoji zato što se pejzaž besplatnih paketa kreće
brže od ritma izdavanja verzija — provajderi dodaju, smanjuju ili ukidaju besplatne kvote između
izdanja, a osnovni katalog se može osvježiti samo kada se isporuči nova verzija.

**Ništa što je danas besplatno ne prestaje biti besplatno zbog udaljenog feeda.** Radar nikada ne
stavlja osnovni unos iza paywall-a; on samo osvježava polja ograničenja/statusa u trenutku čitanja i može
dodati novootkrivene besplatne modele između izdanja. Operator i dalje može sakriti
model lokalno, te ga vratiti sa iste kontrolne table. Sam osnovni katalog
se nikada ne mijenja na disku — pogledajte
[Pravila spajanja preklapanja u trenutku čitanja](#read-time-overlay-merge-rules) ispod.

---

## Status isporuke u v3.8.51

Sljedeći status razlikuje ono što ovo OSS izdanje implementira od kasnijih Radar
radnih tokova. To je status na nivou koda, a ne obećanje da je određena hostovana instalacija
ili eksterna integracija trenutno dostupna.

| Oblast                          | Status u ovom izdanju                                                                                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klijent potpisanog kataloga     | Implementirano iza `RADAR_ENABLED`, sa zasebnim pristankom (opt-in), Ed25519 verifikacijom, lokalnim enkriptovanim postavkama/kešom, perzistentnim nadjačavanjima prikaza/omogućavanja, reverzibilnim oznakama za brisanje (tombstones), planerom i kontrolnom tablom. |
| Aktivacija saradnika            | Kontrolna tabla vodi do GitHub procesa potraživanja hostovanog na serveru i prihvata postojeći `omr_…` ključ. Podobnost saradnika rješava privatni servis; OSS klijent ne sadrži GitHub token niti logiku za izdavanje.                                                |
| Aktivacija ključa podržavaoca   | Implementirano. Izvorni ključ se validira, enkriptuje pri pohrani, maskira prilikom čitanja i šalje samo putem sinhronizacije na strani servera. Promjena ili brisanje ključa poništava sva četiri keša feedova osjetljiva na prava pristupa.                          |
| Referalni linkovi               | Implementirano kao zasebno potpisan feed koji se osvježava svakog sata. Fiksni linkovi su odmah dostupni nivou zajednice; ograničene kampanje ostaju podaci nivoa uživo.                                                                                               |
| Ponude za podržavaoce           | Implementirano kao zaseban potpisan feed samo za uživo i stranica kontrolne table. Klijent ponovo validira zatvorenu šemu pogodnosti, čuva posljednji ispravan keš, filtrira istekle unose i eksplicitno označava partnerske ponude.                                   |
| Obavještajni podaci i priznanje | Implementirano kao strogi potpisani feed samo za uživo sa Radar-ovim ELO rejtingom, činjeničnom svježinom/trendom kataloga, verifikovanim lokalnim bedžom podržavaoca, stranicom kontrolne table i CLI komandama za status/sinhronizaciju koje su samo lokalne.        |
| Plaćanja i transakcijski email  | Nije implementirano u OSS klijentu. Kupovina, donacija, pregled računa, oporavak i dostava pošte pripadaju privatnom servisu; dostupnost hostovanog servisa i dalje zavisi od njegovog nadgledanog postavljanja i konfiguracije provajdera.                            |
| Radni tok istraživačkog agenta  | Nije dio ovog izdanja klijenta. Pripremljeni sadržaji feeda ostaju podaci na strani servera; nikakav autonomni istraživački agent ne radi u OmniRoute instalaciji.                                                                                                     |

---

## Čitač javnih obavještenja

Generički čitač obavještenja je odvojen od `Radar` feature flag-a. Početna stranica kontrolne table (dashboard) i pregledač promjena (Changelog viewer) preuzimaju javni `news.json` repozitorijuma putem običnog `GET` zahtjeva na `NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Oni ne šalju nikakve Radar postavke, upite, konfiguracije provajdera, zapise o korištenju niti lokalno stanje odbacivanja (dismissal state).

`news.json` koristi zatvorenu v2 šemu implementiranu pomoću `parseNewsPayload()`:

- `schemaVersion: 2` i ograničenu `items[]` kolekciju;
- stabilne, jedinstvene `id` vrijednosti obavještenja;
- eksplicitna `active` i ISO `publishedAt` polja;
- obavezan tekst na engleskom jeziku sa opcionim lokalizovanim tekstom;
- opcione HTTPS linkove bez akreditiva i ikonu sa liste dozvoljenih (allowlisted);
- odabir po principu "najnovije aktivno prvo", rezervna opcija (fallback) na engleski jezik i lokalno odbacivanje po ID-u.

Parser privremeno prihvata prethodni singularni oblik `{ active, title, message, ... }` tako da starije verzije (forks) mogu migrirati bez prekida u prikazu Changelog-a. Nevažeći feed-ovi su inertni. Radar unos za pokretanje se isporučuje sa `active: false`; promjena na `true` je zasebna akcija izdanja nakon spajanja (post-merge) i nakon raspoređivanja (post-deploy) i ne mijenja `RADAR_ENABLED` niti nezavisnu saglasnost za sinhronizaciju feed-a.

---

## Flag: `RADAR_ENABLED` (podrazumijevano isključeno)

Radar je od početka do kraja ograničen `RADAR_ENABLED` feature flag-om (`src/shared/constants/featureFlagDefinitions.ts`, kategorija `policies`, `defaultValue: "false"`).

**Kada je flag isključen, površina (interfejs) ne postoji:**

- Svi `/api/radar/*` krajnji punktovi (endpoints), uključujući čitanja i pisanja lokalnog stanja modela, vraćaju `404` prije nego što dotaknu bilo koji Radar modul.
- Ekrani kontrolne table (`/dashboard/radar`, `/dashboard/radar/setup`, `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderuju `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) vraća netaknutu osnovu (baseline) — isti broj unosa, iste vrijednosti, svaki unos označen sa `origin: "baseline"` — i nikada ne čita keš feed-a.
- Nikakav mrežni poziv za Radar se nikada ne pravi; svaki modul za sinhronizaciju vraća `{ status: "disabled" }` prije nego što dotakne `fetch`.

Ovo je stroga "superset" kapija: uključivanje flag-a otključava _ekrane_, ništa više. Ne učitava podatke, ne pokreće sinhronizaciju u pozadini i ne mijenja rutiranje ili odabir modela — pogledajte zasebnu saglasnost (opt-in) u nastavku.

---

## Sinhronizacija podataka je ZASEBNA saglasnost (opt-in) — obećanje o privatnosti

Uključivanje `RADAR_ENABLED` samo otključava korisnički interfejs (UI). Sinhronizacija feed-a zahtijeva drugu, nezavisnu saglasnost (opt-in) pohranjenu u `radar_settings.opt_in` (`src/lib/db/radar.ts`, migracija `136_radar_cache_settings.sql`). `syncRadar()` provjerava flag _i_ saglasnost prije bilo kakvog mrežnog poziva:

```
Flag isključen → { status: "disabled" }   — nema mrežnog poziva
Opt-in false   → { status: "opt_out" }    — nema mrežnog poziva
```

Kada su oba uključena, putanja sinhronizacije je:

1. `GET <feed base URL>/v1/catalog/latest` sa `x-omniroute-radar-schema: 2` i opcionim `Authorization: Bearer <supporter key>` zaglavljem (pogledajte ispod). Serveri podrazumijevano koriste zasebno potpisani v1 tranzicioni artefakt kada zaglavlje šeme nedostaje, tako da stariji instalirani klijenti nastavljaju primati ažuriranja.
2. Ovo je tok aplikacije samo za preuzimanje, ali je i dalje HTTPS zahtjev. Hostovana infrastruktura prima uobičajene metapodatke o konekciji kao što je izvorna IP adresa. Kada je konfigurisan ključ podrške (supporter key), sinhronizacija takođe šalje taj ključ u Bearer zaglavlju kako bi servis mogao riješiti pravo na pristup (entitlement). Na tačnoj reviziji privatnog servera identifikovanoj u granici dokaza iznad, računovodstvo zahtjeva za feed-om koristi hešove ključeva, agregatnu upotrebu i dnevno rotirajući skraćeni HMAC IP adrese za ručnu provjeru zloupotrebe; te tabele ne čuvaju ni ključ ni IP adresu u sirovom obliku. Pristupni logovi infrastrukture i šifrovano odlazno sanduče (delivery outbox) su zasebne operativne granice.
3. OmniRoute nikada ne šalje upite, odgovore, razgovore, akreditive provajdera, saobraćaj modela, vrijeme rada (uptime), latenciju ili lokalnu konfiguraciju provajdera Radar servisu.
4. Odgovor se verifikuje, validira i kešira lokalno (pogledajte [Security model](#security-model)). Radar ima tačno četiri mrežne putanje na strani servera: `syncRadar()` za katalog, `syncRadarReferrals()` za preporuke i `syncRadarOffers()` / `syncRadarIntel()` za ponude i Intel samo za podržavaoce.

**Ključ podrške (supporter key)** je opcioni Bearer token (`radar_settings.supporter_key`) koji omogućava servisu feed-a da odluči koji nivo (tier) da posluži (pogledajte [Tiers](#tiers-community-and-live)). On je:

- Pohranjen **šifrovano u stanju mirovanja (encrypted at rest)** sa istim AES-256-GCM `encrypt()`/`decrypt()` pomoćnim funkcijama (`src/lib/db/encryption.ts`) koje se koriste za akreditive provajdera.
- Postavljen putem `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) i **nikada se ne vraća (echoed back)** — odgovor vraća maskirani oblik (`omr_****abcd`).
- Promjena ili brisanje istog atomski poništava kešove kataloga, preporuka, ponuda i Intel-a. Sljedeća sinhronizacija/čitanje rješava novo pravo na pristup na strani servera; čuvanje ključa samo po sebi ne pravi mrežni zahtjev niti troši aktivacioni ključ za jednokratnu upotrebu.
- Šalje se servisu feed-a kao Bearer token prilikom `GET` sinhronizacije — ništa drugo u vezi sa ključem nikada ne napušta klijenta.

## Pravila pristupa i sigurnosti prikazana prije opt-in-a

Neaktivna kontrolna tabla iscrtava ova pravila iz
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **prije** bilo koje radnje aktivacije.
Kanonska skala pristupa je:

| Nivo                 | Kvalifikovanost                                                                           | Pristup                                       | Pravilo ponavljanja/isteka                                                    |
| -------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------- |
| Zajednica            | Bilo ko; bez ključa                                                                       | Kompletan katalog odložen za oko 30 dana      | Uvijek dostupno; bez izdavanja                                                |
| Zvjezdica + praćenje | GitHub OAuth verifikuje i zvjezdicu na repozitorijumu i praćenje vlasnika                 | Jedno čitanje kataloga uživo, zatim Zajednica | Jedno izdavanje po prijavi; nikada se ne izdaje ponovo                        |
| Top 10 saradnika     | Pozicije 1–10 na najnovijoj kompletnoj sedmičnoj rang listi                               | 365 dana uživo                                | Zahtijeva se na zahtjev; napuštanje rang liste ne skraćuje dodijeljeni period |
| Top 100 saradnika    | Pozicije 11–100 na toj rang listi                                                         | 90 dana uživo                                 | Isto pravilo potraživanja na zahtjev/idempotentno                             |
| Kupovina podrške     | Jednokratna kupovina na 6 mjeseci, 1 godinu ili doživotno                                 | Katalog uživo, potpisane ponude uživo i Intel | Nema automatskog obnavljanja                                                  |
| Donacija/ručni grant | Donacija koju je pregledao vlasnik ili odobrenje vlasnika za određeni broj dana/doživotno | Isto pravo uživo za odobreni period           | Revidirano, idempotentno odobrenje                                            |

Spojeni PR-ovi, commit-ovi i izmijenjene linije su **samo ulazni podaci za rangiranje**. Prijava izvan Top 100 ne dobija grant za saradnike bez obzira na broj PR-ova. Konačne kupovine, donacije, periodi saradnika i ručni grantovi akumuliraju se od trenutnog isteka; doživotno (lifetime) dominira. Promjena ranga nikada retroaktivno ne opoziva niti skraćuje već dodijeljeno vrijeme.

Hostovana licenca je lična, a pravilo za korisnika je jedna aktivna instalacija u datom trenutku. Ovo izdanje **ne** zahtijeva hardversko zaključavanje: OSS sinhronizacija ne vrši fingerprinting hardvera niti održava kriptografski zakup uređaja. Na gore navedenoj verifikovanoj reviziji privatnog servera, implementirano provođenje je validacija prava plus signal za ručni pregled kada se isti ključ uživo vidi sa četvrte različite IP adrese u roku od 24 sata. Taj signal nikada ne blokira niti opoziva ključ automatski. Oporavak opoziva i zamjenjuje izgubljeni ključ uz očuvanje postojećeg isteka; ne restartuje kupljeni ili odobreni period.

Ponude uživo su ručno kurirane i mogu se promijeniti ili isteći. Ekran za opt-in takođe navodi tačnu granicu privatnosti: preuzimaju se potpisani metapodaci kataloga/preporuka; važeći ključ dodatno otključava potpisane ponude i Intel; Bearer ključ i normalni metapodaci konekcije stižu do hostovanog servisa; upiti, odgovori, razgovori, akreditivi provajdera, saobraćaj modela, vrijeme rada (uptime), latencija i konfiguracija lokalnog provajdera ne stižu.

---

## Dobijanje ključa podržavaoca

Ekran za aktivaciju (`/dashboard/radar`) vodi do dva toka za **dobijanje** ključa podržavaoca. Sam OSS repozitorijum nikada ne izdaje ključ, nikada ne pokreće kod za plaćanje i **nikada ne navodi cijenu** — o cijenama se odlučuje i one se prikazuju isključivo na odredišnim stranicama, a ne u ovom repozitorijumu (odluka specifikacije D14).

- **"I'm a contributor"** — otvara `RADAR_CONTRIBUTOR_CLAIM_URL` (podrazumijevano `https://radar.omniroute.online/auth/github`), GitHub OAuth tok za potraživanje koji se nalazi na privatnom Radar serveru. Provjerava najnovije kompletno sedmično rangiranje: Top 10 dobija 365 dana, a pozicije 11–100 dobijaju 90 dana. Izvan Top 100, broj PR-ova nikada ne omogućava pristup; tok umjesto toga provjerava poseban nivo jednokratne upotrebe zvjezdica + praćenje.
- **"Support the project"** — otvara `RADAR_SUPPORTER_PLANS_URL` (podrazumijevano `https://radar.omniroute.online/planos`), hostovanu stranicu za jednokratne opcije od 6 mjeseci, 1 godine i doživotne opcije. OSS stranica i dalje ne prikazuje nikakvu novčanu vrijednost.

Oba URL-a se razrješavaju na strani servera (`src/lib/radar/links.ts`, isti obrazac env-override kao `RADAR_FEED_URL`) i prosljeđuju na kontrolnu tablu kroz postojeći `GET /api/radar/settings` odgovor (`contributorClaimUrl`, `supporterPlansUrl`) — klijentska komponenta nikada sama ne čita `process.env`.

| Var                           | Svrha                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Nadjačava URL za potraživanje doprinosa (podrazumijevano `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Nadjačava URL planova podrške (podrazumijevano `https://radar.omniroute.online/planos`).                |

### Oporavak izgubljenog ključa podržavaoca

Ulazna tačka za oporavak hostovanog servisa je `https://radar.omniroute.online/recover`; ona je takođe povezana sa stranice planova. Oporavak ostaje u potpunosti izvan OSS klijenta jer lokalna instalacija nikada ne prima e-mail kupca/doprinosioca i ne može rekonstruisati sirovi ključ iz svojih šifrovanih postavki.

1. Pošaljite e-mail povezan sa ključem. Servis vraća istu prihvaćenu stranicu bez obzira na to da li postoji licenca koja se može oporaviti ili ne, tako da obrazac ne nabraja naloge.
2. Ako ispunjavate uslove, radnik za isporuku šalje kratkotrajni link za jednokratnu upotrebu. Njegovo otvaranje odmah premješta token u prolazni šifrovani `HttpOnly`/`Secure` kolačić i preusmjerava na čisti `/recover` URL; stranica ne sadrži token, e-mail, stari ključ ili zamjenski ključ.
3. Potvrdite opoziv. Privatni servis opoziva prethodni ključ, kreira zamjenski sa istim planom/istekom i stavlja ga u red za e-mail u jednoj transakciji. Zamjenski ključ se nikada ne vraća u pretraživač.
4. Zalijepite zamjenski ključ u `/dashboard/radar`. Stari ključ sada mora degradirati na `community`; zamjenski ključ mora proizvesti verifikovanu `live` sinhronizaciju. Ponovno otvaranje istog linka za oporavak mora rezultirati generičkim odgovorom o nevažećem/isteklom linku.

Hostovana ruta za oporavak i radnik za poštu mogu biti prisutni u kodu, a da pritom budu nedostupni u datoj implementaciji. Nemojte nazivati tok spremnim za produkciju dok server ne bude raspoređen, dok provajder isporuke ne bude konfigurisan sa kontrolisanim primaocem i dok se ne testira puni link za jednokratnu upotrebu.

Kada posjetilac ima ključ (`omr_` + 40 heksadecimalnih znakova), ekran za aktivaciju (`src/app/(dashboard)/dashboard/radar/page.tsx`) ima unos za lijepljenje ključa kao primarnu putanju: lijepljenje ključa i slanje šalje `POST /api/radar/settings` (`{ optIn: true, supporterKey }`) u jednom pozivu — lijepljenje ključa ga istovremeno postavlja i uključuje (opt-in), otključavajući ekran. Format (`omr_` + 40 heksadecimalnih znakova) se prvo provjerava na strani klijenta pomoću zajedničkog `isValidSupporterKeyFormat()` pomoćnika (`src/lib/radar/supporterKey.ts`) kao UX pogodnost; Zod šema servera je u svakom slučaju mjerodavna provjera. Kada je ključ postavljen, ekran za aktivaciju prikazuje maskirani obrazac (`supporterKeyMasked` iz `GET /api/radar/settings`) umjesto praznog unosa, sa kontrolom "promijeni ključ" za lijepljenje novog — sirovi ključ se nikada ne prikazuje ponovo. Dva dugmeta za potraživanje/planove iznad ostaju način da se ključ uopšte _dobije_; ovaj unos je mjesto gdje ga operater koji ga već ima aktivira.

### Aktivacija od kraja do kraja i vođeno podešavanje

Privatni servis feed-a i ovaj OSS klijent imaju namjerno usku granicu: servis izdaje i validira ključ podržavaoca, dok lokalna OmniRoute instalacija šifruje ključ, sinhronizuje potpisane artefakte na strani servera i vodi podešavanje provajdera. Redoslijed potpomognute validacije je:

1. Pribavite novozadati ili oporavljeni ključ iz zahtjeva saradnika (contributor claim), planova/naplate (plans/checkout), procesa oporavka (recovery journey) ili od ovlaštenog operatera privatnog servera. Ne lijepite sirovi ključ u logove, snimke ekrana, komentare problema (issue comments) ili argumente komandne linije.
2. Omogućite `RADAR_ENABLED` oznaku funkcije (feature flag) na lokalnoj OmniRoute instalaciji. Ovo izlaže korisnički interfejs (UI), ali ostaje mrežno inertno dok se ne sačuva zasebna saglasnost (opt-in).
3. Otvorite `/dashboard/radar`, zalijepite ključ i aktivirajte. Preglednik šalje jedan lokalni `POST /api/radar/settings` sa `{ optIn: true, supporterKey }`; ključ se šifrira lokalno, a odgovor sadrži samo `omr_****<last4>`.
4. Pustite ekran za aktivaciju da izvrši sinhronizaciju kataloga ili odaberite **Sync now** (Sinhronizuj sada). Potvrdite da stranica prijavljuje `live`, verziju feeda i vrijeme preuzimanja. Za autentifikovanu lokalnu dijagnostiku, `GET /api/radar/status` prijavljuje prisustvo saglasnosti/ključa i četiri stanja keša bez vraćanja ključa. `POST /api/radar/sync-all` može eksplicitno osvježiti katalog, preporuke, ponude i Intel.
5. Otvorite `/dashboard/radar/setup?provider=<provider>`. Pratite URL vjerodajnica koje posjeduje provajder, odaberite **Add API key** (Dodaj API ključ), sačuvajte putem stvarnog obrasca provajdera, vratite se na vodič i pokrenite **Test connection** (Testiraj vezu). Vodič koristi normalne rute `/api/providers` i `/api/providers/<connection-id>/test`; ne kreira paralelnu Radar vjerodajnicu.
6. Otvorite `/dashboard/radar/combos` nakon što su aktivne najmanje dvije kompatibilne veze provajdera. Pregledajte predloženu porodicu i kreirajte kombinaciju putem postojeće combo API-ja. Ponude i Intel ostaju zasebni potpisani keševi samo za `live` i mogu se provjeriti na njihovim namjenskim Radar stranicama.
7. Ponovo učitajte `/dashboard/radar` i stranicu za podešavanje. Saglasnost (opt-in), stanje maskiranog ključa, verifikovani keš, sačuvana veza provajdera i testna radnja moraju preživjeti ponovno učitavanje. Snimite dokaze tek nakon što sirovi ključ i vjerodajnica provajdera više nisu vidljivi.

Samo čuvanje ključa nije dokaz `live` prava. Dokaz je kombinacija rezultata `GET /v1/license/check` privatnog servisa, `live` nivoa koji servira OSS katalog, verifikovanog potpisanog keša i stvarnog toka povezivanja/testiranja provajdera. Neispravan, istekao ili opozvan ključ sigurno degradira katalog na `community`; to se ne smije prijaviti kao uspješna validacija `live` ključa.

### Link privatnog admin-panela

`RADAR_ADMIN_URL` opciono dodaje **Radar Admin ↗** odmah nakon Radar stavke okrenute korisniku u sekciji bočne trake Costs (Troškovi). Namjerno nema zadanu vrijednost: kada je varijabla nepostavljena ili nevažeća, statička bočna traka, komandna paleta i ekran za prilagođavanje bočne trake ne sadrže administratorsku stavku niti privatni URL.

Vrijednost se razrješava na strani servera i prenosi kroz `GET /api/settings` odgovor autentifikovan upravljanjem samo na autentifikovanu sesiju kontrolne ploče (dashboard), ili pouzdanom loopback vlasniku tokom lokalnog bootstrapa bez prijave. CLI, interni servis i autentifikacija putem API ključa sa manage-scope opsegom je ne primaju. Preglednik ponovo validira odgovor prije materijalizacije vanjskog linka, koji se otvara sa `noopener noreferrer`.

Koristite HTTPS tunel/tailnet URL bez vjerodajnica. Obični HTTP je prihvaćen samo za loopback SSH prosljeđivanje kao što je `http://127.0.0.1:9351`; druge šeme, ugrađene vjerodajnice, pogrešno formatirani URL-ovi i udaljene HTTP destinacije ne uspijevaju (fail closed) i ostavljaju navigaciju inertnom.

---

## Sigurnosni model

### Ed25519 potpis nad tačnim bajtovima

Payload feed-a je potpisan sa Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifikuje potpis nad **tačnim bajtovima odgovora**
primljenim preko mreže — payload se nikada ne re-serijalizuje prije verifikacije, tako da
re-enkodiranje bajt-po-bajt ne može neprimjetno poništiti ili zaobići provjeru potpisa.
Neuspjeh verifikacije (`invalid_signature`) prekida sinhronizaciju prije nego što se
payload uopšte parsira ili kešira.

### Prikvačeni javni ključ + rotacija

Javni ključ za verifikaciju je prikvačen u `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), u nizu tako da se novi ključ može dodati ispred rotacije
dok stari keširani feed-ovi potpisani prethodnim ključem ostaju validni do ponovne
sinhronizacije.

### Fork-friendly env premošćavanja

Dvije env varijable omogućavaju fork-ovima i onima koji sami hostuju (self-hosters) da
usmjere klijent na sopstveni feed umjesto na podrazumijevani OmniRoute servis —
pogledajte [Kako sami hostovati feed](#how-to-self-host-a-feed) ispod:

| Var                 | Svrha                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Premošćava bazni URL feed-a (podrazumijevano `https://radar.omniroute.online`).                             |
| `RADAR_FEED_PUBKEY` | Premošćava prikvačeni javni ključ (base64-DER SPKI ili PEM), zamjenjujući ugrađeni niz ovim jednim ključem. |

### Donja granica verzije

`syncRadar()` odbija preuzeti feed čija `version` nije striktno novija od trenutno
keširane verzije (`compareVersions()`, tačkasto `YYYY.MM.DD.n` poređenje) —
`{ status: "stale" }`. Ovo sprečava kompromitovanu ili pogrešno konfigurisanu feed
krajnju tačku (endpoint) da vrati klijenta na stariji, drugačije potpisan payload.

### Dva datuma, i zašto se oba čuvaju

Keširani feed nosi dva različita datuma, a njihovo miješanje je upravo razlog zašto se
oba čuvaju:

| Polje         | Dolazi iz                | Odgovara na                         |
| ------------- | ------------------------ | ----------------------------------- |
| `generatedAt` | potpisanog tijela feed-a | koliko su stari podaci              |
| `fetchedAt`   | sata ove instalacije     | kada ga je ova instalacija preuzela |

Feed preuzet prije nekoliko minuta može sadržati podatke stare sedmicama, tako da
`fetchedAt` sam po sebi ne može reći operateru da li je overlay svježiji od baseline-a
na kojem se nalazi. Oba su trajno sačuvana u `radar_feed_cache`, vraćena od strane
`getRadarCatalog().meta`, i prijavljena odvojeno putem `GET /api/radar/status`. Red
keširan prije nego što je postojala kolona `generated_at` (migracija 163) se čita kao
`null` — nepoznato ostaje nepoznato umjesto da pozajmljuje vrijeme preuzimanja.
`radar_referrals_cache` čuva svoj sopstveni `generated_at` od migracije 142.

Donja granica verzije iznad poredi `version`, a ne bilo koji od datuma.

Ostaju dvije praznine, obje namjerne: kontrolna tabla i dalje prikazuje samo `Last
fetched`, tako da čitanje datuma izrade (build date) tamo zahtijeva novu oznaku (i
njenih 41 lokalnih unosa); a kešovi za ponude (offers) i intel ne čuvaju datum izrade
uopšte, iako njihove feed šeme nose jedan — `GET /api/radar/status` stoga izostavlja
polje za ta dva umjesto da prijavi `null` koji bi se čitao kao "nepoznato".

### Validacija šeme

Preuzeti bajtovi se parsiraju i validiraju prema `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, Zod šema) **nakon** verifikacije potpisa. Nepodudaranje
šeme vraća `{ status: "invalid_schema" }` i keš ostaje netaknut. Keširani payload se
defanzivno ponovo validira pri svakom čitanju (`getRadarCatalog()`) — korumpiran ili
ručno izmijenjen red keša se vraća na baseline umjesto da bude serviran.

### Ograničenje veličine odgovora (10 MB)

`syncRadar()` nameće **tvrdo ograničenje od 10 MB** na tijelo odgovora feed-a —
potpisani feed je JSON dokument veličine KB, tako da sve preko ovoga ukazuje na
pogrešno konfigurisan ili neprijateljski `RADAR_FEED_URL` (ili upstream koji servira
smeće), a ne na legitiman katalog. Sprovođenje je dvoslojno:

1. `Content-Length` preflight provjera preskače čitanje tijela u potpunosti kada
   zaglavlje već deklariše vrijednost iznad ograničenja.
2. Provjera tekućeg zbira (running-total) tokom čitanja tijela nameće ograničenje čak i
   kada `Content-Length` nedostaje ili potcjenjuje stvarnu veličinu — zaglavlju se
   nikada ne vjeruje samo po sebi. Konkatenacija akumuliranih komada čuva tačne bajtove
   potrebne za Ed25519 provjeru potpisa nakon toga.

Prekoračenje ograničenja vraća `{ status: "too_large" }` i ostavlja keš netaknutim,
prateći isti nedestruktivni obrazac kao i svaki drugi neuspjeh sinhronizacije
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Nivoi: `community` i `live`

Feed schema sadrži polje `tier: "community" | "live"`, o kojem odlučuje **server-side** feed servis na osnovu zahtjeva (prisustvo i validnost ključa podrške) — klijent nikada ne odlučuje o svom nivou.

- **`community`** — besplatni katalog koji kasni otprilike 30 dana za najsvježijim podacima. Ovo je ono što dobija neautentifikovani zahtjev ili zahtjev sa nevažećim ključem.
- **`live`** — najsvježiji katalog, koji se servira zahtjevima koji nose validan ključ podrške.

**Nevažeći ili istekao ključ podrške se degradira na `community` — to nikada nije greška.** Putanja sinhronizacije samo razlikuje greške potpisa/sheme/verzije (sve su popravljive, sve su nefatalne za keširano stanje) od uspješnog `{ status: "updated", version, tier }`. Ne postoji putanja greške specifična za nivo koju klijent treba da obrađuje.

### Servirani nivo dolazi iz zaglavlja odgovora, a ne iz potpisanog tijela

Polje `tier` u potpisanom **tijelu** feed-a je uvijek `"live"` — feed servis isporučuje **dva potpisana artefakta po verziji**: live uključuje trenutne kampanje, a community ih izostavlja. Svaki artefakt je potpisan preko svojih tačnih bajtova. Tijelo i dalje ne služi kao odluka o pravu pristupa; nivo koji je zapravo odabran za zahtjev se prenosi u **`x-omniroute-feed-tier` zaglavlju odgovora**, o čemu se odlučuje na strani servera na osnovu `Authorization` ključa zahtjeva.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) je jedino mjesto koje razrješava nivo kojem klijent treba da vjeruje:

1. Parsirajte `x-omniroute-feed-tier` sa `RadarTierSchema` (Zod) — odsutno zaglavlje, ili vrijednost koja nije tačno `"community"` ili `"live"`, se tretira kao **nije prisutno** (nikada se ne vjeruje kešu/UI-u takav kakav jeste; ovo takođe pokriva starije feed servere koji su prethodili zaglavlju).
2. Vratite se na polje `tier` potpisanog tijela (uvijek `"live"`) samo kada korak 1 ne daje rezultat.
3. Razriješeni nivo je ono što se kešira i vraća kao `{ status: "updated", version, tier }` — ovo je vrijednost koju kontrolna tabla prikazuje, nikada sirovo polje tijela.

---

## Pravila spajanja slojeva u vrijeme čitanja

`applyFeed()` (`src/lib/radar/applyFeed.ts`) spaja keširani feed **preko** statičke osnove u **vrijeme čitanja**, unutar `getRadarCatalog()`. Niz osnove (`FREE_MODEL_BUDGETS`) se nikada ne mutira — `MergedEntry[]` se izračunava svježe pri svakom pozivu.

Četiri pravila, po redoslijedu prioriteta:

1. **Feed nikada ne prepisuje lokalno preklapanje.** Po polju: ako je operater prilagodio polje na unosu (`localOverrides` mapa, ključirana `provider:modelId`), vrijednost feed-a za to specifično polje se preskače — vrijednost operatera pobjeđuje.
2. **`enabled: false` onemogućava unos, uz porijeklo.** Feed unos koji isključuje unos postavlja `enabled: false` i `disabledBy: "radar"` na spojenom rezultatu, tako da UI može objasniti _zašto_ je unos prešao iz dostupnog u onemogućeno.
3. **Unos koji je dodao korisnik, a koji nije prisutan u feed-u, opstaje netaknut.** Unosi koji postoje samo u osnovi (ili su dodati lokalno) i nemaju odgovarajući feed unos prolaze nepromijenjeni.
4. **Tombstoned unos se nikada ne vraća u život.** Ako je operater eksplicitno obrisao unos (`tombstones` set), ponovno dodavanje tog `provider:modelId` od strane feed-a u kasnijoj verziji ga ne vraća.

Polja koja se mogu uređivati i tombstones se čuvaju u `radar_local_model_state` (migracija `153_radar_local_model_state.sql`). Javni DB adapter (`src/lib/db/radar.ts`) pretvara te redove u `localOverrides` mapu i `tombstones` set koje koristi `applyFeed()`; produkcijski `getRadarCatalog()` učitava to stanje nakon što prođu provjere flag-a, keša i sheme. Samo `displayName` i `enabled` su uređivi od strane operatera. Identitet provajdera/modela, porijeklo feed-a, kvota, mogućnosti, ToS i podaci o podešavanju se ne mogu pisati kroz ovu površinu.

Kontrolna tabla izlaže četiri lokalne akcije:

- **Edit** mijenja lokalno ime za prikaz i stanje omogućeno/onemogućeno.
- **Reset local changes** briše oba uređiva polja bez promjene tombstone-a.
- **Hide** kreira tombstone, tako da kasnija ažuriranja feed-a ne mogu ponovo kreirati red.
- **Restore** uklanja tombstone; bilo koje zasebno sačuvano preklapanje ostaje na snazi.

Feed `enabled: false` ostaje sigurnosni izuzetak: on pobjeđuje zastarjelo lokalno `enabled: true`, održava spojeni unos onemogućenim i bilježi `disabledBy: "radar"`.

Publikacije kataloga koriste `schemaVersion: 2`. `contextWindow` i svaki od `tools`, `vision` i `thinking` su nezavisno `number | null` / `boolean | null`: `null` znači nepoznato, dok `false` znači da zvanični izvor provajdera potvrđen od strane D16 eksplicitno kaže da mogućnost ne postoji. Interni OmniRoute registar/model-spec flagovi se nikada ne promovišu direktno u činjenice feed-a. Klijent i dalje prihvata v1 snimke; pošto je stari builder koristio `false` kao placeholder za odsustvo, v1 `false` se normalizuje u nepoznato dok v1 `true` ostaje činjenično. Nepoznate verzije sheme ne uspijevaju (fail closed) i posljednji validni keš ostaje dostupan. Svaki v2 model sa context/capability koji nije null mora nositi HTTPS `metadataEvidenceUrls[]` bez akreditiva; u suprotnom validacija sheme ne uspijeva i keš se ne zamjenjuje. Tabela kataloga prikazuje sva tri stanja kao `✓`, `✕` i `?`.

### Vođene kombinacije i MCP pristup

Potvrđene `familyId` vrijednosti preživljavaju preklapanje u vrijeme čitanja i pokreću čisti `buildRadarComboSuggestions()` modul (`src/lib/radar/comboSuggestions.ts`). Porodica se predlaže samo kada najmanje dva različita provajdera imaju aktivne veze i izlažu tačan kurirani ID modela. Onemogućeni modeli, neaktivni provajderi, nedostajući ID-ovi modela, singleton porodice i dvosmislena podudaranja aliasa/prefiksa ne uspijevaju (fail closed). Prijedlozi koriste postojeću `priority` strategiju, naručujući najveći mjesečni budžet koji se ponavlja prvi; UI ih kreira samo putem `POST /api/combos`.

Vođeni UI se nalazi na `/dashboard/radar/combos`. On čita samo lokalne krajnje tačke `GET /api/radar/catalog` i `GET /api/combos/builder/options`. On nikada ne pokreće Radar sinhronizaciju, ne čita akreditive provajdera niti piše direktno u bazu podataka kombinacija.

MCP klijenti mogu čitati istu lokalnu projekciju pomoću `omniroute_radar_catalog` (`read:radar`). Opcioni filteri `provider`, `familyId` i `enabledOnly` se evaluiraju nakon jednog lokalnog čitanja `GET /api/radar/catalog`. Njegov zatvoreni izlaz uključuje metapodatke kataloga plus provajder/model, prikazano ime, `familyId`, kvotu, mogućnosti, stanje uključenosti, porijeklo i `disabledBy`; URL-ovi za podešavanje, koraci, konekcije, e-mail adrese, ključevi i podaci o preporukama se nikada ne vraćaju. Ovaj alat je samo za čitanje i nikada ne poziva `/api/radar/sync`.

### Oznake porijekla

Svaki spojeni unos sadrži polje `origin` koje UI prikazuje kao oznaku:

- `"baseline"` — netaknuto iz statičkog kataloga izdanja.
- `"radar"` — jedno ili više polja je osvježeno putem feeda.
- `"local"` — operater ima barem jedno lokalno preklapanje na ovom unosu (lokalna preklapanja uvijek imaju prednost nad feedom prema pravilu 1, bez obzira na to šta feed kaže).

---

## Lokalne površine — nikada proxy za feed

Lokalne porodice Radar ruta ispod podržavaju UI pod `src/app/api/radar/`:

| Ruta                           | Metoda | Svrha                                                                                                                  |
| ------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Vraća spojeni katalog (`getRadarCatalog()`) iz lokalnog keša.                                                          |
| `/api/radar/sync`              | POST   | Pokreće `syncRadar()` na strani servera; vraća rezultirajući status.                                                   |
| `/api/radar/settings`          | GET    | Vraća `{ optIn, hasSupporterKey, supporterKeyMasked }` — nikada neobrađeni ključ.                                      |
| `/api/radar/settings`          | POST   | Postavlja opt-in i/ili (enkriptovani) ključ podržavaoca.                                                               |
| `/api/radar/referrals`         | GET    | Vraća `{ fixed, campaigns, tier }` iz lokalnog keša — pogledajte [Referral links](#referral-links-free-credits) ispod. |
| `/api/radar/offers`            | GET    | Vraća aktivne ponude iz verifikovanog lokalnog live keša; nikada ne vraća ključ podržavaoca.                           |
| `/api/radar/offers/sync`       | POST   | Pokreće `syncRadarOffers()` pipeline na strani servera, koji koristi samo live ključ.                                  |
| `/api/radar/intel`             | GET    | Vraća verifikovani lokalni live Intel plus boolean za prepoznavanje podržavaoca; nikada identitet ili ključ.           |
| `/api/radar/intel/sync`        | POST   | Pokreće `syncRadarIntel()` pipeline na strani servera, koji koristi samo live ključ.                                   |
| `/api/radar/status`            | GET    | Vraća lokalni status postavki/keša samo za čitanje za katalog, preporuke, ponude i Intel, bez tajni.                   |
| `/api/radar/sync-all`          | POST   | Pokreće sva četiri modula za sinhronizaciju na strani servera i vraća poseban status za svaki feed.                    |
| `/api/radar/local-model-state` | GET    | Lista sačuvana nadjačavanja i tombstone-ove za kontrole uređivanja/vraćanja.                                           |
| `/api/radar/local-model-state` | PATCH  | Postavlja ili briše validirana `displayName`/`enabled` polja za nadjačavanje.                                          |
| `/api/radar/local-model-state` | PUT    | Kreira ili uklanja tombstone sa `{ provider, modelId, tombstoned }`.                                                   |
| `/api/radar/local-model-state` | DELETE | Briše polja za nadjačavanje koja se mogu uređivati, uz očuvanje bilo kojeg tombstone-a.                                |

**Strogo pravilo: ove rute nikada ne rade proxy za feed servis.** Pregledač komunicira isključivo sa lokalnim OmniRoute serverom. Četiri modula koja pristupaju Radar servisu su `src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (preporuke), i `src/lib/radar/offersSync.ts` (ponude) plus `src/lib/radar/intelSync.ts` (Intel); svi se izvršavaju na strani servera, nikada na strani klijenta. Ovo u potpunosti drži URL feed-a i bilo koji ključ podržavaoca izvan mrežnog saobraćaja okrenutog klijentu.

Svi Radar endpointi vraćaju `404` kada je `RADAR_ENABLED` isključen (pogledajte [Flag](#flag-radar_enabled-default-off) iznad), i usmjeravaju odgovore o greškama kroz `buildErrorBody()`/`sanitizeErrorMessage()` prema pravilu za sanitizaciju grešaka na nivou repozitorijuma (`docs/security/ERROR_SANITIZATION.md`).

### Autentifikacija

Svi Radar endpointi zahtijevaju autentifikaciju putem `isAuthenticated()` (`src/shared/utils/apiAuth.ts`) — sesijski kolačić kontrolne table ili API ključ sa upravljačkim opsegom, ista kapija koja štiti ostatak `/api/settings/*`. Provjera `404` za isključen flag se uvijek izvršava **prije** provjere autentifikacije, tako da instalacija sa isključenim `RADAR_ENABLED` ostaje bajt-identična (nema upita za autentifikaciju samo da bi se saznalo da površina ne postoji); kada je flag uključen, neautentifikovani zahtjev dobija `401` prije bilo kakvog čitanja ili pisanja u bazu podataka. `GET /api/radar/settings` nikada ne vraća neobrađeni ključ podržavaoca bez obzira na stanje autentifikacije — samo maskirani oblik i `hasSupporterKey` boolean.

---

## Ponude za podržavaoce

Ponude koriste vlastiti potpisani artefakt, `GET /v1/offers/latest`, i nikada ne dijele keš kataloga ili preporuka. Serverska krajnja tačka zahtijeva važeći "live" Bearer ključ podržavaoca; ne postoji rezervna opcija za zajednicu. `syncRadarOffers()` se stoga zaustavlja prije mreže kada je funkcijska zastavica isključena, operater nije dao saglasnost ili nije konfigurisan ključ podržavaoca.

Nakon uspješnog GET zahtjeva, klijent verifikuje Ed25519 potpis nad tačnim bajtovima odgovora, validira `RadarOffersFeedSchema`, zahtijeva da i potpisano tijelo i zaglavlje `x-omniroute-feed-tier` budu `live`, nameće strogo noviju verziju sa tačkama, i tek tada atomski zamjenjuje `radar_offers_cache` (migracija `144_radar_offers_cache.sql`). Primjenjuje se isto ograničenje od 10 MB za zaglavlje plus strim koje koriste i drugi feedovi. Greške potpisa, šeme, nivoa (tier), ponavljanja (replay), veličine, HTTP-a i mreže čuvaju posljednji verifikovani keš.

Zatvoreni oblik ponude podržava tri uporediva tipa pogodnosti: procenat u baznim poenima, kredit u manjim jedinicama valute ili probne dane. Partnerska ponuda mora uključivati javnu osnovicu iste vrste i njena pogodnost mora biti strogo veća; zvanične ponude nemaju partnersku osnovicu. URL-ovi moraju biti HTTPS bez akreditiva. `getRadarOffers()` defanzivno revalidira keširani payload i filtrira istekle unose pri svakom lokalnom čitanju; `/dashboard/radar/offers` ponovo filtrira istekle unose prije prikazivanja, koristi portugalski tekst kada je dostupan uz engleski kao rezervnu opciju, i eksplicitno označava partnerske ponude.

Pregledač poziva samo lokalne rute: čita snimak maskiranih postavki, traži `POST /api/radar/offers/sync` za osvježavanje na strani servera, a zatim čita `GET /api/radar/offers`. Bez ključa prikazuje postojeće linkove za saradnike/podršku umjesto pokušaja zahtjeva za feedom. Eksterni linkovi ponuda se otvaraju u novoj kartici sa `noopener noreferrer`. Nijedan `radar_offers` MCP alat nije izložen u ovom izdanju.

---

## Radar Intel, značka podržavaoca i CLI

Intel je potpisani artefakt na `GET /v1/intel/latest`. Zatvorena `RadarIntelFeedSchema` prihvata samo ELO rangiranja u vlasništvu Radar-a izvedena od strane privatnog kustosa iz potvrđenih poređenja i činjeničnih delta starosti/broja kataloga izvedenih iz potpisanih snimaka kataloga. Metodologija je fiksirana na početni rejting 1000 i K=32. Prazno rangiranje je važeće kada nijedno poređenje nije potvrđeno; klijent ga nikada ne sintetizuje.

`syncRadarIntel()` primjenjuje isti serverski Bearer, vremensko ograničenje od 30 sekundi, ograničenje strimovanja od 10 MiB, verifikaciju Ed25519 tačnih bajtova, strogu šemu, zahtjev za `live` tijelom/zaglavljem, donju granicu verzije i očuvanje posljednjeg ispravnog keša kao i ponude. Nakon što se verifikovani live snimak sačuva, klijent izvodi `radar:<sha256(supporter key)>`, pohranjuje samo taj jednosmjerni identitet i emituje namjenski događaj prepoznavanja `radar_supporter`. Njegova `radar-supporter` značka je idempotentna i dodjeljuje nula XP; nikada ne ažurira rang-liste niti ponovo koristi `token_share`. `/dashboard/radar/intel` prikazuje značku samo iz verifikovanih metapodataka lokalnog keša.

CLI izlaže `omniroute radar status` i `omniroute radar sync`. Oba komuniciraju samo sa lokalnim OmniRoute API-jem. `status` vrši `GET /api/radar/status` samo za čitanje; `sync` šalje jedan `POST /api/radar/sync-all` i ispisuje rezultat po feedu. Nijedna komanda ne čita, ne prihvata niti ispisuje ključ podržavaoca, i nijedna ne kontaktira Radar servis direktno.

## Referral linkovi (besplatni krediti)

Referral linkovi se serviraju iz **samostalnog, uvijek ažurnog** feeda —
`GET /v1/referrals/latest` — odvojenog od feeda kataloga. Ovo je namjerno: feed
kataloga na community nivou je snimak koji može biti star do 30 dana, tako da je
referral link izvučen iz njega kasnio za stvarnom listom linkova servera za isti
iznos (novododati referral ne bi stigao do besplatnog/community korisnika i do
mjesec dana). Feed za referrale uklanja to kašnjenje sinhronizacijom na sopstvenoj,
mnogo kraćoj kadenci.

```ts
// GET /v1/referrals/latest tijelo odgovora (Ed25519-potpisano, isti pinned ključ kao
// i feed kataloga):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministički: max(updatedAt) kroz referral
                                  // linkove, tako da dva identična zahtjeva proizvode tačno
                                  // iste potpisane bajtove/potpis
  referrals: {
    fixed: RadarReferral[],      // prisutno u SVAKOM nivou, uključujući no-auth/community
    campaigns: RadarReferral[],  // popunjeno samo za validan live (supporter) Bearer
                                  // ključ; no-auth/expired-key zahtjevi dobijaju []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Za razliku od feeda kataloga, ovo tijelo uopšte ne nosi `tier` polje — server
odlučuje šta će uključiti po zahtjevu na osnovu `Authorization` ključa, tako da je
`x-omniroute-feed-tier` zaglavlje odgovora JEDINI izvor za servirani nivo
(`referralsSync.ts::syncRadarReferrals`); odsutno/neprepoznato zaglavlje se degradira na
`"community"`, pretpostavku sa najmanje privilegija. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) validira cijelo tijelo, ponovo koristeći isti
`RadarReferralSchema` po referralu izvezen iz `feedSchema.ts` tako da oba feeda
identično validiraju pojedinačne referrale. Svaki `RadarReferral.url` mora biti
`https://` — `http://` url ne prolazi validaciju šeme.

STARO `referrals` polje ugrađeno u katalog na `RadarFeedSchema` (`feedSchema.ts`) je
zadržano radi kompatibilnosti unazad sa već keširanim feedovima kataloga, ali ga
`getRadarReferrals()` više ne čita — pogledajte [Accessor](#accessor) ispod.

### Sinhronizacija

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) je JEDINI modul koji
pristupa mreži za referrale, tačno preslikavajući ugovor `syncRadar()`-a: flag off
→ `disabled`; opt-in false → `opt_out`; preuzima `${RADAR_FEED_URL}/v1/referrals/latest`
(isti `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` fork overrides kao i katalog), verifikuje
Ed25519 potpis nad tačnim bajtovima odgovora (`verifyFeedBytes`), validira prema
`RadarReferralsFeedSchema`, i kešira u `radar_referrals_cache` tabelu
(migracija `142_radar_referrals_cache.sql`) — tabelu potpuno odvojenu od
`radar_feed_cache` kataloga. Ograničenje odgovora od 10 MB i donja granica `generatedAt`
odbijaju dolazni feed koji je stariji od keširanog, štiteći od ponavljanja (replay)
starijeg potpisanog artefakta. Jednaka vremenska oznaka se prihvata: server namjerno
daje community i live varijantama referrala isti deterministički `generatedAt`, tako
da se potpisani payload i servirani nivo mogu promijeniti nakon promjene
supporter-ključa bez promjene osnovnog skupa linkova. Nikada ne baca izuzetak —
uvijek vraća statusni objekat; greške nikada ne nose stack trace u `reason`.

Dva okidača održavaju keš referrala toplim, oba nezavisna od sopstvene 24-satne
kadence kataloga:

- **Sync-on-read** — `GET /api/radar/referrals` sam poziva `syncRadarReferrals()`
  inline kad god keš nedostaje ili je stariji od `REFERRALS_STALE_MS` (1h,
  `shouldSyncReferralsOnRead()`), prije serviranja odgovora. Ovo je ono što čini
  fiksne linkove "uvijek ažurnim" za samo sljedeće učitavanje kontrolne table,
  bez čekanja na bilo kakav pozadinski tajmer.
- **Scheduler side-sync** — `radarSchedulerTick()` (`scheduler.ts`) nezavisno
  procjenjuje zastarjelost referrala na istom satnom otkucaju koji se koristi za
  katalog, pozivajući `syncRadarReferrals()` kada je potrebno. Ovo se pokreće bez
  obzira na to da li je katalog sam po sebi bio na redu tog otkucaja, i nikada ne
  utiče na oblik `RadarTickResult` (samo best-effort sporedni efekat, progutan u
  slučaju greške).

### Accessor

`src/lib/radar/index.ts` izvozi dva read-only pristupnika, od kojih nijedan nikada
ne baca izuzetak (isti defanzivni ugovor kao `getRadarCatalog()` — flag off, bez
keša, ili korumpiran keširani payload se svi razrješavaju u prazan oblik umjesto
greške):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  čita iz `radar_referrals_cache` (putem `getRadarReferralsCache()`) i validira kroz
  `RadarReferralsFeedSchema` — **ne** iz keša kataloga.
- `getDefaultReferralFor(provider)` → `fixed` referral sa `isDefault: true` za tog
  provajdera, ili `null`. Gleda samo `fixed` — kampanja se nikada ne koristi kao
  "podrazumijevani" link provajdera.

Stvarno pravilo "koji referral je podrazumijevani za provajdera" živi u
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), maloj čistoj funkciji bez
**DB importa** — sigurno je za importovanje u `"use client"` komponentu.
`getRadarReferrals`/ `getDefaultReferralFor` (u `index.ts`) povlače `@/lib/db/radar`
i stoga ostaju samo na serveru; kontrolna tabla provajdera importuje `referrals.ts`
direktno umjesto `index.ts` (pogledajte ispod) kako bi se izbjeglo bundle-ovanje
`better-sqlite3` u pretraživač.

### `GET /api/radar/referrals`

Slijedi potpuno isti redoslijed provjere kao i svaka druga Radar ruta: `RADAR_ENABLED` isključeno → `404` (provjerava se prvo, bajt-identična inercija); neautentifikovano → `401`; u suprotnom pokreće sync-on-read (vidi gore) kada je zastarjelo, zatim `200` sa `{ fixed, campaigns, tier }` — `tier` dolazi direktno iz (možda upravo osvježenog) reda keša i čisto je informativan (pokreće blagi upsell tekst u UI-u ispod). Nikada ne proksira feed server direktno — izvorni kod same rute ne sadrži `fetch(` poziv; mreža se dešava samo unutar `syncRadarReferrals()`, isti princip samo-lokalnog-keša kao i `/api/radar/catalog`.

### Dashboard UI — kartica "Free credits" na `/dashboard/radar`

Ponovo koristi postojeću Radar stranicu (`src/app/(dashboard)/dashboard/radar/page.tsx`) kao drugu karticu umjesto nove rute — manja površina za rutiranje/i18n za funkciju koja je varijacija podataka koje stranica već dohvaća. Jednom kada se uključi, traka sa karticama nudi **Catalog** (postojeća tabela) i **Free credits**:

- Fiksni linkovi su grupisani po provajderu, svaki prikazuje `requiredAction` (kada je prisutan) i `target="_blank" rel="noopener noreferrer"` dugme za referral URL.
- Kampanje prikazuju isto, plus `validUntil` kada je prisutan.
- Kada su `campaigns` prazne **i** posluženi nivo (tier) je `community`, UI prikazuje kratku upsell napomenu ("limited-time campaigns are a supporter extra") — ovo **nikada** ne sakriva niti blokira listu fiksnih linkova, koja ostaje potpuno popunjena za svaki nivo. Upsell je samo blaga poruka, nikada blokada.

### Referral link na imenu provajdera (dashboard provajdera)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`) je već povezivao ime provajdera sa `providerInfo.website` kada je prisutan, uz jedan presedan za monetizovani link: napomena o Kimi (Moonshot AI) partnerskom linku (`providers.kimiPartnerLinkNote` i18n ključ). D28 ponovo koristi taj isti obrazac diskretne napomene za Radar podrazumijevane referral linkove umjesto uvođenja novog ključa.

Labavo povezivanje (Loose coupling), po dizajnu:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`) je **čista** funkcija — `(staticWebsite, referralUrl) => { website, isReferralLink }` — bez zavisnosti od `@/lib/radar` ili `@/lib/db/*`. `providerPageUtils.ts` u cjelini ostaje bez tih import-a (potvrđeno sa `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponenta `"use client"`) je jedino mjesto kojem je dozvoljeno da dohvaća Radar podatke — putem `fetch("/api/radar/referrals")`, istog obrasca lokalne rute koji koristi i sama Radar dashboard stranica — i izračunava podrazumijevani referral na strani klijenta sa `findDefaultReferral()` iz `src/lib/radar/referrals.ts` koji ne koristi bazu podataka.
- Sa isključenim `RADAR_ENABLED`, fetch vraća 404, `referralUrl` ostaje `null`, a `resolveProviderHeaderLink()` vraća statični katalog `website` nepromijenjen — stranica provajdera je bajt-identična kao prije postojanja ove funkcije. Isti ishod je kada još nema keša ili nema podrazumijevanog referrala za tog specifičnog provajdera.
- Kada se primjenjuje podrazumijevani referral, `ProviderPageHeader` prima `isReferralLink` i prikazuje istu diskretnu napomenu/tooltip kao i Kimi partnerski link (ponovo koristeći ključ `providers.kimiPartnerLinkNote`) — nikada novi, zaseban vizuelni tretman.

---

## Kako samostalno hostovati feed

Fork ili self-hoster koji želi potpunu kontrolu nad katalogom može pokrenuti vlastiti feed servis bez diranja klijentskog koda:

1. Servirajte `GET /v1/catalog/latest` endpoint koji vraća JSON tijelo koje zadovoljava `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — top-level `feed: "omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` i `totals`. Poštujte `x-omniroute-radar-schema: 2`; server kompatibilan sa tranzicijom treba da podrazumijeva zahtjeve bez njega na zasebno potpisan v1 artefakt.
2. Potpišite tačne bajtove odgovora sa Ed25519 parom ključeva i vratite base64 potpis u `x-omniroute-feed-signature` zaglavlju odgovora.
3. Postavite `RADAR_FEED_URL` na novi bazni URL i `RADAR_FEED_PUBKEY` na odgovarajući javni ključ (base64-DER SPKI ili PEM) — pogledajte [referencu env var](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Omogućite `RADAR_ENABLED` i aktivirajte putem `POST /api/radar/settings` (`{ optIn: true }`).

Nisu potrebne nikakve druge izmjene koda — `verifyFeedBytes()` automatski preuzima override (`getFeedPublicKeys()` u `src/lib/radar/pinnedKeys.ts`), a poređenje verzija, validacija šeme i pravila spajanja primjenjuju se identično na self-hosted feed.

Referalni linkovi (pogledajte [Referral links (free credits)](#referral-links-free-credits) iznad) su zaseban, opcioni artefakt: fork koji servira samo `/v1/catalog/latest` i dalje radi u potpunosti — `syncRadarReferrals()` degradira na `{ status: "error" }` pri `404` sa `/v1/referrals/latest` i keš jednostavno ostaje prazan, tako da `GET /api/radar/referrals` nastavlja vraćati `{ fixed: [], campaigns: [], tier: null }` umjesto da obori ostatak stranice. Da biste također ponudili referalne linkove, servirajte `GET /v1/referrals/latest` koji zadovoljava `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) i potpišite ga istim Ed25519 parom ključeva kao i feed kataloga.

Supporter ponude su još jedan opcioni artefakt. Da biste ih servirali, implementirajte `GET /v1/offers/latest` sa zatvorenom `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), zahtijevajte live entitlement, vratite `x-omniroute-feed-tier: live` i potpišite tačne bajtove istim ključem. Fork koji izostavlja ovaj endpoint zadržava ponašanje kataloga/referala nepromijenjenim; osvježavanje ponuda neuspijeva nedestruktivno i posljednji verifikovani lokalni keš ponuda ostaje dostupan.

Intel je opcionalan na isti način. Self-hoster može servirati `GET /v1/intel/latest` koristeći `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), zahtijevati live entitlement, vratiti `x-omniroute-feed-tier: live` i potpisati tačne bajtove dijeljenim Ed25519 ključem. Izostavljanje ovog endpointa ostavlja katalog, referale i ponude nepromijenjenim; osvježavanje Intela čuva bilo koji posljednji verifikovani lokalni snapshot.

---

## Povezana dokumentacija

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — obrazac odgovora na grešku koji prate `/api/radar/*` rute.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting) — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` referenca.
