# Radar Free-Model Catalog (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Izvor istine:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Posljednje ažuriranje:** 2026-09-01 — v3.8.51
> **Granica dokaza za hostiranu uslugu:** ovdje opisana pravila na strani poslužitelja provjerena su
> 2026-09-01 u odnosu na namjerno privatni Radar poslužitelj na točnoj reviziji
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Ta implementacija ne distribuira se u
> ovom OSS repozitoriju; dostupnost hostirane usluge ostaje zasebno operativno stanje.

Radar je **neobavezan dodatak** koji preko osnovnog kataloga iz izdanja (`FREE_MODEL_BUDGETS` u
`open-sse/config/freeModelCatalog.data.ts`) postavlja potpisani, svježe ažurirani katalog
besplatnih modela. Postoji zato što se okruženje besplatnih razina mijenja brže od ritma
izdavanja — pružatelji između izdanja dodaju, smanjuju ili ukidaju besplatne kvote, dok se
osnovni katalog može osvježiti samo kada se objavi nova verzija.

**Ništa što je danas besplatno ne prestaje biti besplatno zbog udaljenog sažetka sadržaja.**
Radar nikada ne postavlja osnovni unos iza naplatne barijere; samo tijekom čitanja osvježava
polja ograničenja/statusa i može dodati sloj novootkrivenih besplatnih modela između izdanja.
Operator i dalje može lokalno sakriti model te ga vratiti putem iste nadzorne ploče. Sam
osnovni katalog nikada se ne mijenja na disku — pogledajte
[Pravila spajanja slojeva tijekom čitanja](#read-time-overlay-merge-rules) u nastavku.

---

## Status isporuke u v3.8.51

Sljedeći status razlikuje ono što ovo OSS izdanje implementira od kasnijih Radarovih
tokova rada. To je status na razini koda, a ne obećanje da je određena hostirana implementacija
ili vanjska integracija trenutačno dostupna.

| Područje                                  | Status u ovom izdanju                                                                                                                                                                                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klijent potpisanog kataloga               | Implementirano iza `RADAR_ENABLED`, uz zasebnu prijavu, Ed25519 provjeru, lokalne šifrirane postavke/predmemoriju, trajne izmjene prikaza/omogućenosti, reverzibilne nadgrobne oznake, planer i nadzornu ploču.                                                             |
| Aktivacija doprinositelja                 | Nadzorna ploča povezuje se s tijekom preuzimanja prava putem GitHuba koji hostira poslužitelj i prihvaća postojeći ključ `omr_…`. Privatna usluga utvrđuje prihvatljivost doprinositelja; OSS klijent ne sadrži GitHub token ni logiku izdavanja.                           |
| Aktivacija ključem podržavatelja          | Implementirano. Neobrađeni ključ provjerava se, šifrira u mirovanju, maskira pri čitanju i šalje samo tijekom sinkronizacije na strani poslužitelja. Promjena ili brisanje ključa poništava sve četiri predmemorije sažetaka sadržaja osjetljive na prava.                  |
| Referalne poveznice                       | Implementirano kao zasebno potpisani sažetak sadržaja koji se osvježava svaki sat. Fiksne poveznice odmah su dostupne razini zajednice; ograničene kampanje ostaju podaci razine uživo.                                                                                     |
| Ponude za podržavatelje                   | Implementirano kao zaseban potpisani sažetak sadržaja dostupan samo uživo i stranica nadzorne ploče. Klijent ponovno provjerava zatvorenu shemu pogodnosti, čuva posljednju valjanu predmemoriju, filtrira istekle unose i izričito označava partnerske ponude.             |
| Informacije i prepoznavanje podržavatelja | Implementirano kao strogo potpisani sažetak sadržaja dostupan samo uživo, s Radarovim ELO-om, činjeničnim podacima o svježini/trendu kataloga, provjerenom lokalnom značkom podržavatelja, stranicom nadzorne ploče i lokalnim CLI naredbama samo za status/sinkronizaciju. |
| Plaćanja i transakcijska e-pošta          | Nije implementirano u OSS klijentu. Kupnja, donacija, pregled potvrda, oporavak i dostava pošte pripadaju privatnoj usluzi; dostupnost hostirane usluge i dalje ovisi o njezinoj nadziranoj implementaciji i konfiguraciji pružatelja.                                      |
| Tok rada istraživačkog agenta             | Nije dio ovog izdanja klijenta. Sadržaj kuriranih sažetaka ostaje podatak na strani poslužitelja; u instalaciji OmniRoutea ne izvodi se nikakav autonomni istraživački agent.                                                                                               |

---

## Čitač javnih objava

Generički čitač objava odvojen je od zastavice značajke Radar. Početna stranica nadzorne ploče i
preglednik dnevnika promjena dohvaćaju javni `news.json` repozitorija putem običnog zahtjeva `GET` na
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Ne šalju nikakvu postavku Radara, upit, konfiguraciju
pružatelja, zapis o upotrebi ni lokalno stanje odbacivanja.

`news.json` koristi zatvorenu v2 shemu implementiranu funkcijom `parseNewsPayload()`:

- `schemaVersion: 2` i ograničena kolekcija `items[]`;
- stabilne, jedinstvene vrijednosti `id` objava;
- eksplicitna polja `active` i ISO `publishedAt`;
- obavezan tekst na engleskom jeziku uz opcionalne lokalizirane tekstove;
- opcionalne HTTPS poveznice bez vjerodajnica i ikona s popisa dopuštenih;
- odabir od najnovije prema najstarijoj aktivnoj objavi, zamjenski engleski jezik za lokalizaciju i lokalno odbacivanje prema ID-u.

Raščlanjivač privremeno prihvaća prethodni singularni oblik `{ active, title, message, ... }` kako bi
se starije izvedenice mogle migrirati bez neispravnog prikaza dnevnika promjena. Nevaljani sažeci sadržaja neaktivni su. Unos za pokretanje
Radara isporučuje se s `active: false`; promjena na `true` zasebna je radnja objave nakon spajanja i implementacije
te ne mijenja `RADAR_ENABLED` ni neovisnu privolu za sinkronizaciju sažetka sadržaja.

---

## Zastavica: `RADAR_ENABLED` (zadano isključena)

Radar je u cijelosti kontroliran zastavicom značajke `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategorija `policies`,
`defaultValue: "false"`).

**Kada je zastavica isključena, sučelje ne postoji:**

- Sve krajnje točke `/api/radar/*`, uključujući lokalna čitanja i zapisivanja stanja modela,
  vraćaju `404` prije pristupa bilo kojem modulu Radara.
- Zasloni nadzorne ploče (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) prikazuju
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) vraća netaknutu osnovnu verziju —
  isti broj unosa, iste vrijednosti, svaki unos označen s `origin: "baseline"` — i nikada
  ne čita predmemoriju sažetka sadržaja.
- Ne upućuje se nijedan mrežni poziv Radara; svaki modul za sinkronizaciju vraća `{ status: "disabled" }`
  prije pristupa funkciji `fetch`.

Ovo je stroga nadređena kontrola: uključivanje zastavice otključava samo _zaslone_ i ništa
više. Ne prenosi podatke, ne pokreće pozadinsku sinkronizaciju i ne mijenja
usmjeravanje ni odabir modela — pogledajte zasebnu privolu u nastavku.

---

## Sinkronizacija podataka ZASEBNA je privola — jamstvo privatnosti

Uključivanje opcije `RADAR_ENABLED` samo otključava korisničko sučelje. Sinkronizacija sažetka sadržaja zahtijeva drugu,
neovisnu privolu pohranjenu u `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migracija `136_radar_cache_settings.sql`). `syncRadar()` provjerava zastavicu _i_
privolu prije upućivanja bilo kakvog mrežnog poziva:

```
Zastavica isključena → { status: "disabled" } — nema mrežnog poziva
Privola nije dana    → { status: "opt_out" }  — nema mrežnog poziva
```

Kada je oboje uključeno, tijek sinkronizacije izgleda ovako:

1. `GET <osnovni URL sažetka sadržaja>/v1/catalog/latest` sa zaglavljem `x-omniroute-radar-schema: 2` i opcionalnim
   zaglavljem `Authorization: Bearer <ključ podržavatelja>` (pogledajte u nastavku). Ako zaglavlje sheme nedostaje, poslužitelji zadano
   isporučuju zasebno potpisani prijelazni artefakt v1 kako bi stariji instalirani klijenti nastavili
   primati ažuriranja.
2. Ovo je aplikacijski tijek isključivo za preuzimanje, ali je i dalje riječ o HTTPS zahtjevu. Infrastruktura
   na poslužitelju prima uobičajene metapodatke veze, poput izvorišne IP adrese. Kada je konfiguriran ključ podržavatelja,
   sinkronizacija šalje i taj ključ u zaglavlju Bearer kako bi servis mogao utvrditi
   pravo pristupa. U točnoj reviziji privatnog poslužitelja navedenoj u prethodno definiranoj granici dokaza,
   obračun zahtjeva za sažetak sadržaja koristi sažetke ključeva, zbirnu upotrebu i svakodnevno rotirani skraćeni HMAC
   IP adrese za ručni pregled zloupotrebe; te tablice ne pohranjuju ni ključ ni IP adresu u izvornom obliku.
   Dnevnici pristupa infrastrukturi i šifrirani izlazni spremnik za isporuku zasebne su operativne
   granice.
3. OmniRoute servisu Radar nikada ne šalje upite, odgovore, razgovore, vjerodajnice pružatelja, promet modela,
   vrijeme rada, latenciju ni lokalnu konfiguraciju pružatelja.
4. Odgovor se provjerava, validira i lokalno predmemorira (pogledajte
   [Sigurnosni model](#security-model)). Radar ima točno četiri mrežna puta na strani poslužitelja:
   `syncRadar()` za katalog, `syncRadarReferrals()` za preporuke te
   `syncRadarOffers()` / `syncRadarIntel()` za ponude i obavještajne podatke namijenjene samo podržavateljima.

**Ključ podržavatelja** opcionalni je Bearer token (`radar_settings.supporter_key`)
koji servisu sažetka sadržaja omogućuje da odluči koju razinu poslužiti (pogledajte
[Razine](#tiers-community-and-live)). On se:

- Pohranjuje **šifriran u mirovanju** istim pomoćnim funkcijama AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) koje se upotrebljavaju za vjerodajnice pružatelja.
- Postavlja putem `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) i
  **nikada se ne vraća u odgovoru** — odgovor sadržava maskirani oblik (`omr_****abcd`).
- Njegovom promjenom ili uklanjanjem atomski se poništavaju predmemorije kataloga, preporuka, ponuda i obavještajnih podataka. Sljedeća
  sinkronizacija ili čitanje utvrđuje novo pravo pristupa na strani poslužitelja; spremanje ključa samo po sebi ne upućuje
  mrežni zahtjev niti troši jednokratni aktivacijski ključ.
- Šalje servisu sažetka sadržaja kao Bearer token tijekom sinkronizacijskog zahtjeva GET — ništa drugo povezano s
  ključem nikada ne napušta klijent.

---

## Pravila pristupa i sigurnosti prikazana prije uključivanja

Neaktivna nadzorna ploča prikazuje ova pravila iz
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **prije** bilo koje radnje aktivacije.
Kanonska ljestvica pristupa je:

| Razina                 | Uvjeti                                                                                   | Pristup                                                     | Pravilo ponavljanja/isteka                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Zajednica              | Svatko; bez ključa                                                                       | Potpuni katalog s odgodom od oko 30 dana                    | Uvijek dostupno; bez izdavanja                                                  |
| Zvjezdica + praćenje   | GitHub OAuth potvrđuje i zvjezdicu na repozitoriju i praćenje vlasnika                   | Jedno čitanje aktualnog kataloga, zatim Zajednica           | Jedno izdavanje po prijavi; nikad se ponovno ne izdaje                          |
| Doprinositelj Top 10   | Pozicije 1–10 na najnovijoj potpunoj tjednoj ljestvici                                   | 365 dana aktualnog pristupa                                 | Preuzima se na zahtjev; ispadanje s ljestvice ne skraćuje dodijeljeno razdoblje |
| Doprinositelj Top 100  | Pozicije 11–100 na toj ljestvici                                                         | 90 dana aktualnog pristupa                                  | Isto pravilo preuzimanja na zahtjev/idempotentnog preuzimanja                   |
| Kupnja podržavatelja   | Jednokratna kupnja za 6 mjeseci, 1 godinu ili doživotno                                  | Aktualni katalog, potpisane aktualne ponude i Intel         | Bez automatske obnove                                                           |
| Donacija/ručna dodjela | Donacija koju je pregledao vlasnik ili vlasnikova dodjela na izričit broj dana/doživotno | Isto aktualno pravo pristupa tijekom dodijeljenog razdoblja | Revidirana, idempotentna dodjela                                                |

Spojeni PR-ovi, commitovi i izmijenjeni retci **samo su ulazni podaci za rangiranje**. Prijava izvan Top 100 ne dobiva
dodjelu za doprinositelje bez obzira na broj PR-ova. Vremenski ograničene kupnje, donacije, razdoblja za doprinositelje i
ručne dodjele zbrajaju se od trenutačnog isteka; doživotno pravo ima prednost. Promjena ranga nikada
retroaktivno ne opoziva niti skraćuje već dodijeljeno vrijeme.

Hostirana licenca osobna je, a pravilo prikazano korisniku dopušta jednu aktivnu instalaciju istodobno. Ovo
izdanje **ne** tvrdi da postoji hardversko zaključavanje: OSS sinkronizacija ne izrađuje otisak hardvera niti održava
kriptografski najam uređaja. U gore navedenoj provjerenoj reviziji privatnog poslužitelja implementirana provedba
obuhvaća provjeru prava pristupa i signal za ručni pregled kada se isti aktivni ključ uoči s četvrte
različite IP adrese unutar 24 sata. Taj signal nikada automatski ne blokira niti opoziva ključ. Oporavak
opoziva i zamjenjuje izgubljeni ključ uz zadržavanje postojećeg datuma isteka; ne pokreće ponovno
kupljeno ili dodijeljeno razdoblje.

Aktualne ponude ručno se uređuju te se mogu promijeniti ili isteći. Zaslon za uključivanje također navodi točnu
granicu privatnosti: preuzimaju se potpisani metapodaci kataloga/preporuka; valjani ključ dodatno otključava
potpisane ponude i Intel; Bearer ključ i uobičajeni metapodaci veze dolaze do hostirane usluge;
upiti, odgovori, razgovori, vjerodajnice pružatelja usluga, promet modela, vrijeme rada, latencija i lokalna
konfiguracija pružatelja usluga ne dolaze.

---

## Dobivanje ključa podržavatelja

Zaslon za aktivaciju (`/dashboard/radar`) sadrži poveznice na dva postupka za **dobivanje**
ključa podržavatelja. Sam OSS repozitorij nikada ne izdaje ključ, ne izvršava kôd za plaćanje i
**nikada ne navodi cijenu** — cijene se određuju i prikazuju isključivo na
odredišnim stranicama, a ne u ovom repozitoriju (odluka specifikacije D14).

- **"Ja sam doprinositelj"** — otvara `RADAR_CONTRIBUTOR_CLAIM_URL` (zadano
  `https://radar.omniroute.online/auth/github`), postupak preuzimanja putem GitHub OAutha koji se
  nalazi na privatnom poslužitelju Radar. Provjerava najnoviju dovršenu tjednu ljestvicu: prvih 10 dobiva 365 dana,
  a pozicije 11–100 dobivaju 90 dana. Izvan prvih 100 broj PR-ova nikada ne omogućuje pristup; postupak
  umjesto toga provjerava zasebnu jednokratnu razinu za oznaku zvjezdicom + praćenje.
- **"Podržite projekt"** — otvara `RADAR_SUPPORTER_PLANS_URL` (zadano
  `https://radar.omniroute.online/planos`), hostanu stranicu s jednokratnim opcijama od 6 mjeseci, 1 godine i
  doživotnog pristupa. OSS stranica i dalje ne prikazuje nikakav novčani iznos.

Oba URL-a razrješavaju se na strani poslužitelja (`src/lib/radar/links.ts`, isti obrazac
nadjačavanja varijablama okruženja kao za `RADAR_FEED_URL`) i prosljeđuju nadzornoj ploči putem postojećeg
odgovora `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — klijentska
komponenta nikada sama ne čita `process.env`.

| Var                           | Svrha                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Nadjačava URL za preuzimanje ključa doprinositelja (zadano `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Nadjačava URL planova za podržavatelje (zadano `https://radar.omniroute.online/planos`).                  |

### Oporavak izgubljenog ključa podržavatelja

Ulazna točka za oporavak hostane usluge jest `https://radar.omniroute.online/recover`; poveznica na nju
nalazi se i na stranici s planovima. Oporavak ostaje u potpunosti izvan OSS klijenta jer lokalna
instalacija nikada ne prima adresu e-pošte kupca/doprinositelja i ne može rekonstruirati neobrađeni ključ iz
svojih šifriranih postavki.

1. Pošaljite adresu e-pošte povezanu s ključem. Usluga vraća istu stranicu potvrde bez obzira na to
   postoji li licenca koju je moguće oporaviti, tako da obrazac ne otkriva postojanje računa.
2. Ako postoje uvjeti, izvršitelj isporuke šalje kratkotrajnu poveznicu za jednokratnu uporabu. Njezino otvaranje odmah premješta
   token u privremeni šifrirani kolačić `HttpOnly`/`Secure` i preusmjerava na čisti
   URL `/recover`; stranica ne sadrži token, adresu e-pošte, stari ključ ni zamjenski ključ.
3. Potvrdite opoziv. Privatna usluga opoziva prethodni ključ, izrađuje zamjenski ključ s
   istim planom/istekom i stavlja ga u red za slanje e-poštom u jednoj transakciji. Zamjenski ključ nikada se
   ne vraća pregledniku.
4. Zalijepite zamjenski ključ u `/dashboard/radar`. Stari ključ sada mora prijeći u stanje `community`;
   zamjenski ključ mora proizvesti potvrđenu sinkronizaciju `live`. Ponovno otvaranje iste poveznice za oporavak mora završiti
   neuspjehom uz generički odgovor o nevaljanosti/isteku.

Hostana ruta za oporavak i izvršitelj za slanje pošte mogu biti prisutni u kodu, a ipak nedostupni u određenoj
implementaciji. Nemojte postupak smatrati spremnim za produkciju dok poslužitelj nije implementiran, pružatelj
usluge dostave konfiguriran s kontroliranim primateljem i dok cijela poveznica za jednokratnu uporabu nije testirana.

Nakon što posjetitelj dobije ključ (`omr_` + 40 heksadecimalnih znakova), zaslon za aktivaciju
(`src/app/(dashboard)/dashboard/radar/page.tsx`) kao primarni put nudi polje za lijepljenje ključa:
lijepljenjem ključa i slanjem obrasca u jednom se pozivu šalje `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — lijepljenjem ključa on se postavlja i istodobno se uključuje sudjelovanje,
čime se zaslon otključava. Format (`omr_` + 40 heksadecimalnih znakova) prvo se provjerava na strani klijenta
pomoću zajedničke pomoćne funkcije `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
radi boljeg korisničkog iskustva; poslužiteljska Zod shema u svakom je slučaju mjerodavna provjera. Nakon što je
ključ postavljen, zaslon za aktivaciju prikazuje maskirani oblik (`supporterKeyMasked` iz
`GET /api/radar/settings`) umjesto praznog polja, uz kontrolu "promijeni ključ" za
lijepljenje novog ključa — neobrađeni ključ nikada se ponovno ne prikazuje. Dva prethodno navedena gumba za preuzimanje/planove
i dalje služe za početno _dobivanje_ ključa; ovo je polje mjesto na kojem ga aktivira operator
koji ga već ima.

### Aktivacija od početka do kraja i vođeno postavljanje

Privatna usluga sažetka i ovaj OSS klijent imaju namjerno usko definiranu granicu: usluga
izdaje i provjerava ključ podržavatelja, dok lokalna instalacija OmniRoute šifrira ključ,
sinkronizira potpisane artefakte na strani poslužitelja i vodi kroz postavljanje pružatelja usluga. Redoslijed potpomognute provjere jest:

1. Nabavite novoizdani ili obnovljeni ključ putem postupka za suradnike, planova/naplate, postupka
   oporavka ili od ovlaštenog operatora privatnog poslužitelja. Nemojte lijepiti neobrađeni ključ u zapisnike,
   snimke zaslona, komentare problema ni argumente naredbenog retka.
2. Omogućite zastavicu značajke `RADAR_ENABLED` u lokalnoj instalaciji OmniRoutea. Time se prikazuje korisničko
   sučelje, ali mreža ostaje neaktivna dok se ne spremi zasebna privola.
3. Otvorite `/dashboard/radar`, zalijepite ključ i aktivirajte. Preglednik šalje jedan lokalni
   `POST /api/radar/settings` s `{ optIn: true, supporterKey }`; ključ se šifrira lokalno, a
   odgovor sadrži samo `omr_****<last4>`.
4. Pričekajte da zaslon za aktivaciju izvrši sinkronizaciju kataloga ili odaberite **Sinkroniziraj sada**. Potvrdite da stranica
   prikazuje `live`, verziju izvora i vrijeme dohvaćanja. Za autentificiranu lokalnu dijagnostiku,
   `GET /api/radar/status` prikazuje stanje privole/prisutnosti ključa i četiri stanja predmemorije bez vraćanja
   ključa. `POST /api/radar/sync-all` može izričito osvježiti katalog, preporuke, ponude i Intel.
5. Otvorite `/dashboard/radar/setup?provider=<provider>`. Slijedite URL vjerodajnice kojim upravlja pružatelj,
   odaberite **Dodaj API ključ**, spremite putem stvarnog obrasca pružatelja, vratite se u vodič i pokrenite
   **Testiraj vezu**. Vodič upotrebljava uobičajene rute `/api/providers` i
   `/api/providers/<connection-id>/test`; ne stvara zasebnu vjerodajnicu za Radar.
6. Otvorite `/dashboard/radar/combos` nakon što su aktivne najmanje dvije kompatibilne veze s pružateljima.
   Pregledajte predloženu porodicu i izradite kombinaciju putem postojećeg API-ja za kombinacije. Ponude i
   Intel ostaju zasebne potpisane predmemorije dostupne samo uživo i mogu se provjeriti na pripadajućim stranicama Radara.
7. Ponovno učitajte `/dashboard/radar` i stranicu za postavljanje. Privola, stanje maskiranog ključa, potvrđena predmemorija, spremljena
   veza s pružateljem i radnja testiranja moraju se sačuvati nakon ponovnog učitavanja. Zabilježite dokaze tek nakon što
   neobrađeni ključ i vjerodajnica pružatelja više ne budu vidljivi.

Samo spremanje ključa nije dokaz aktivnog prava pristupa. Dokaz je kombinacija rezultata
`GET /v1/license/check` privatne usluge, razine `live` koju poslužuje OSS katalog, potvrđene potpisane
predmemorije i stvarnog tijeka povezivanja/testiranja pružatelja. Nevažeći, istekli ili opozvani ključ sigurno
prebacuje katalog na `community`; ne smije se prijaviti kao uspješna provjera aktivnog ključa.

### Poveznica na privatnu administratorsku ploču

`RADAR_ADMIN_URL` po želji dodaje **Radar Admin ↗** neposredno nakon korisničke
stavke Radar u odjeljku Troškovi na bočnoj traci. Namjerno nema zadanu vrijednost: kada varijabla
nije postavljena ili nije valjana, statična bočna traka, paleta naredbi i zaslon za prilagodbu bočne trake ne sadrže
administratorsku stavku ni privatni URL.

Vrijednost se razrješava na strani poslužitelja i prenosi putem odgovora
`GET /api/settings`, zaštićenog autentifikacijom za upravljanje, samo autentificiranoj sesiji nadzorne ploče ili pouzdanom
vlasniku povratne petlje tijekom lokalnog početnog postavljanja bez prijave. CLI, unutarnje usluge i autentifikacija API ključem
s opsegom za upravljanje ne primaju je. Preglednik ponovno provjerava odgovor prije stvaranja
vanjske poveznice, koja se otvara uz `noopener noreferrer`.

Upotrijebite HTTPS URL tunela/tailneta bez vjerodajnica. Obični HTTP prihvaća se samo za SSH
prosljeđivanje na povratnoj petlji, kao što je `http://127.0.0.1:9351`; druge sheme, ugrađene vjerodajnice, neispravni URL-ovi i
udaljena HTTP odredišta završavaju sigurnim odbijanjem i ostavljaju navigaciju neaktivnom.

---

## Sigurnosni model

### Ed25519 potpis nad točnim bajtovima

Sadržaj izvora potpisan je algoritmom Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) provjerava potpis nad **točnim bajtovima odgovora**
primljenima putem mreže — sadržaj se nikada ponovno ne serijalizira prije provjere, pa
ponovno kodiranje bajt po bajt ne može neprimjetno poništiti ili zaobići provjeru potpisa.
Neuspjela provjera (`invalid_signature`) prekida sinkronizaciju prije nego što se sadržaj
uopće raščlani ili spremi u predmemoriju.

### Prikvačeni javni ključ + rotacija

Javni ključ za provjeru prikvačen je u `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), u polju koje omogućuje dodavanje novog ključa na početak
prije rotacije, dok stari predmemorirani izvori potpisani prethodnim ključem ostaju
valjani sve do ponovne sinkronizacije.

### Nadjačavanja varijablama okruženja prilagođena fork inačicama

Dvije varijable okruženja omogućuju fork inačicama i korisnicima s vlastitim hostingom
da klijent usmjere na vlastiti izvor umjesto na zadanu uslugu OmniRoute — pogledajte
[Kako samostalno hostati izvor](#how-to-self-host-a-feed) u nastavku:

| Var                 | Svrha                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Nadjačava osnovni URL izvora (zadano `https://radar.omniroute.online`).                                      |
| `RADAR_FEED_PUBKEY` | Nadjačava prikvačeni javni ključ (base64-DER SPKI ili PEM), zamjenjujući ugrađeno polje ovim jednim ključem. |

### Najniža dopuštena verzija

`syncRadar()` odbija preuzeti izvor čiji `version` nije strogo noviji od trenutačno
predmemorirane verzije (`compareVersions()`, usporedba točkastog formata `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Time se sprječava da kompromitirana ili pogrešno konfigurirana
krajnja točka izvora vrati klijent na stariji sadržaj s drukčijim potpisom.

### Dva datuma i zašto se oba čuvaju

Predmemorirani izvor sadržava dva različita datuma, a upravo je mogućnost njihove
zamjene razlog zbog kojeg se oba čuvaju:

| Polje         | Izvor                    | Na koje pitanje odgovara                |
| ------------- | ------------------------ | --------------------------------------- |
| `generatedAt` | tijelo potpisanog izvora | koliko su **podaci** stari              |
| `fetchedAt`   | sat ove instalacije      | kada ih je ova instalacija **preuzela** |

Izvor preuzet prije nekoliko minuta može sadržavati podatke stare nekoliko tjedana, pa
`fetchedAt` sam po sebi operateru ne može pokazati je li sloj noviji od osnovnih podataka
na kojima se nalazi. Oba se podatka pohranjuju u `radar_feed_cache`, vraća ih
`getRadarCatalog().meta`, a `GET /api/radar/status` ih prikazuje zasebno. Redak
predmemoriran prije nego što je postojao stupac `generated_at` (migracija 163) pri
čitanju vraća `null` — nepoznato ostaje nepoznato umjesto da se zamijeni vremenom
preuzimanja. `radar_referrals_cache` čuva vlastiti `generated_at` još od migracije 142.

Gore navedena najniža dopuštena verzija uspoređuje `version`, a ne bilo koji od datuma.

Preostaju dva nedostatka, oba namjerna: nadzorna ploča i dalje prikazuje samo `Last fetched`,
pa je za prikaz datuma izrade ondje potrebna nova oznaka (i njezin 41 lokalizirani unos);
uz to, predmemorije ponuda i obavještajnih podataka uopće ne čuvaju datum izrade, iako ga
njihove sheme izvora sadržavaju — `GET /api/radar/status` stoga izostavlja to polje za te
dvije predmemorije umjesto da prikazuje `null`, što bi se tumačilo kao „nepoznato”.

### Provjera valjanosti sheme

Preuzeti bajtovi raščlanjuju se i provjeravaju prema `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, Zod shema) **nakon** provjere potpisa. Nepodudaranje
sheme vraća `{ status: "invalid_schema" }`, a predmemorija ostaje netaknuta.
Predmemorirani sadržaj preventivno se ponovno provjerava pri svakom čitanju
(`getRadarCatalog()`) — u slučaju oštećenog ili ručno uređenog retka predmemorije
upotrebljavaju se osnovni podaci umjesto njegova posluživanja.

### Ograničenje veličine odgovora (10 MB)

`syncRadar()` nameće **strogo ograničenje od 10 MB** na tijelo odgovora izvora —
potpisani izvor JSON je dokument veličine reda kilobajta, pa sve iznad toga upućuje na
pogrešno konfiguriran ili zlonamjeran `RADAR_FEED_URL` (ili na nadređeni poslužitelj
koji poslužuje besmislene podatke), a ne na legitiman katalog. Ograničenje se provodi
u dva sloja:

1. Preliminarna provjera zaglavlja `Content-Length` u potpunosti preskače čitanje
   tijela kada zaglavlje već navodi vrijednost veću od ograničenja.
2. Provjera tekućeg zbroja tijekom čitanja tijela provodi ograničenje čak i kada
   `Content-Length` nije prisutan ili navodi manju vrijednost od stvarne veličine —
   zaglavlju se nikada ne vjeruje samostalno. Spajanje prikupljenih dijelova čuva
   točne bajtove potrebne za naknadnu provjeru Ed25519 potpisa.

Prekoračenje ograničenja vraća `{ status: "too_large" }` i ostavlja predmemoriju
netaknutom, u skladu s istim nedestruktivnim obrascem kao i svi drugi neuspjesi
sinkronizacije (`invalid_signature`, `invalid_schema`, `stale`).

---

## Razine: `community` i `live`

Shema feeda sadrži polje `tier: "community" | "live"`, koje određuje **poslužiteljska strana**
usluge feeda na temelju zahtjeva (prisutnosti i valjanosti ključa podržavatelja)
— klijent nikada ne određuje vlastitu razinu.

- **`community`** — besplatni katalog koji kasni otprilike 30 dana za najnovijim
  podacima. Njega prima neautorizirani zahtjev ili zahtjev s nevaljanim ključem.
- **`live`** — najnoviji katalog, koji se poslužuje zahtjevima s valjanim ključem
  podržavatelja.

**Nevaljan ili istekao ključ podržavatelja degradira se na `community` — nikada nije
pogreška.** Put sinkronizacije razlikuje samo pogreške potpisa/sheme/verzije (sve
oporavljive i nijedna nije fatalna za predmemorirano stanje) od uspješnog rezultata `{ status:
"updated", version, tier }`. Ne postoji put pogreške specifičan za razinu koji bi klijent morao
obrađivati.

### Poslužena razina dolazi iz zaglavlja odgovora, a ne iz potpisanog tijela

Polje `tier` u **tijelu** potpisanog feeda uvijek je `"live"` — usluga feeda isporučuje
**dva potpisana artefakta po verziji**: live uključuje trenutačne kampanje, dok ih community
izostavlja. Svaki je artefakt potpisan nad vlastitim točnim bajtovima. Tijelo ipak ne
služi kao odluka o pravu pristupa; razina koja je stvarno odabrana za zahtjev prenosi se
u **zaglavlju odgovora `x-omniroute-feed-tier`**, a određuje se na poslužiteljskoj strani iz
ključa `Authorization` u zahtjevu.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) jedino je mjesto
koje određuje razinu kojoj klijent treba vjerovati:

1. Raščlani `x-omniroute-feed-tier` pomoću `RadarTierSchema` (Zod) — odsutno zaglavlje ili
   vrijednost koja nije točno `"community"` ili `"live"` tretira se kao **nepostojeća**
   (nikada se ne sprema u predmemoriju niti prikazuje u korisničkom sučelju u izvornom obliku; to također obuhvaća starije poslužitelje
   feeda koji prethode tom zaglavlju).
2. Vrati se na polje `tier` iz potpisanog tijela (uvijek `"live"`) samo kada 1. korak
   ne vrati ništa.
3. Razriješena razina sprema se u predmemoriju i vraća kao `{ status: "updated",
version, tier }` — nadzorna ploča prikazuje tu vrijednost, a nikada neobrađeno polje iz
   tijela.

---

## Pravila spajanja preklapanjem pri čitanju

`applyFeed()` (`src/lib/radar/applyFeed.ts`) spaja predmemorirani feed **preko**
statičke osnovice u **trenutku čitanja**, unutar `getRadarCatalog()`. Polje osnovice
(`FREE_MODEL_BUDGETS`) nikada se ne mijenja — novi `MergedEntry[]` izračunava se pri svakom
pozivu.

Četiri pravila prema redoslijedu prioriteta:

1. **Feed nikada ne prepisuje lokalnu prilagodbu.** Za svako polje: ako je operator
   prilagodio polje unosa (mapa `localOverrides`, s ključem `provider:modelId`),
   vrijednost iz feeda za to određeno polje preskače se — prednost ima vrijednost operatora.
2. **`enabled: false` onemogućuje unos, uz bilježenje podrijetla.** Unos feeda koji
   isključi neki unos postavlja `enabled: false` i `disabledBy: "radar"` u spojenom rezultatu,
   kako bi korisničko sučelje moglo objasniti _zašto_ je unos iz dostupnog postao onemogućen.
3. **Korisnički dodan unos koji nije prisutan u feedu ostaje nepromijenjen.** Unosi koji
   postoje samo u osnovici (ili su dodani lokalno) i nemaju odgovarajući unos u feedu
   prolaze bez promjena.
4. **Unos označen nadgrobnim zapisom nikada se ne obnavlja.** Ako je operator izričito izbrisao
   unos (skup `tombstones`), ponovno dodavanje tog `provider:modelId` u feedu u nekoj kasnijoj
   verziji neće ga vratiti.

Urediva polja i nadgrobni zapisi trajno se pohranjuju u
`radar_local_model_state` (migracija `153_radar_local_model_state.sql`). Javni DB
adapter (`src/lib/db/radar.ts`) pretvara te retke u mapu `localOverrides` i
skup `tombstones` koje koristi `applyFeed()`; produkcijski `getRadarCatalog()` učitava to stanje
nakon uspješnog prolaska provjera zastavice, predmemorije i sheme. Operator može uređivati samo `displayName` i `enabled`.
Identitet pružatelja/modela, podrijetlo feeda, kvota, mogućnosti, uvjeti pružanja usluge
i podaci za postavljanje ne mogu se zapisivati kroz ovo sučelje.

Nadzorna ploča omogućuje četiri lokalne radnje:

- **Uredi** mijenja lokalni naziv za prikaz i stanje omogućenosti.
- **Poništi lokalne promjene** briše oba urediva polja bez promjene nadgrobnog zapisa.
- **Sakrij** stvara nadgrobni zapis kako kasnija ažuriranja feeda ne bi mogla ponovno stvoriti redak.
- **Vrati** uklanja nadgrobni zapis; svaka zasebno spremljena prilagodba ostaje na snazi.

`enabled: false` iz feeda ostaje sigurnosna iznimka: ima prednost pred zastarjelim lokalnim
`enabled: true`, zadržava spojeni unos onemogućenim i bilježi `disabledBy: "radar"`.

Objave kataloga upotrebljavaju `schemaVersion: 2`. `contextWindow` i svako od polja `tools`, `vision` i
`thinking` neovisno su tipa `number | null` / `boolean | null`: `null` znači nepoznato, dok
`false` znači da službeni izvor pružatelja, potvrđen prema D16, izričito navodi da mogućnost nije dostupna.
Interne zastavice registra/specifikacije modela OmniRoute nikada se izravno ne promiču u činjenice feeda. Klijent
i dalje prihvaća snimke v1; budući da je stari alat za izgradnju upotrebljavao `false` kao zamjensku vrijednost za odsutnost, v1 `false`
normalizira se u nepoznato, dok v1 `true` ostaje činjenična vrijednost. Nepoznate verzije sheme sigurno se odbijaju, a
posljednja valjana predmemorija ostaje dostupna. Svaki model v2 s kontekstom/mogućnošću različitom od null mora imati
`metadataEvidenceUrls[]` s HTTPS adresama kojima se može pristupiti bez vjerodajnica; u suprotnom provjera valjanosti sheme ne uspijeva i predmemorija se
ne zamjenjuje. Tablica kataloga prikazuje sva tri stanja kao `✓`, `✕` i `?`.

### Vođene kombinacije i pristup MCP-u

Potvrđene vrijednosti `familyId` ostaju sačuvane nakon preklapanja pri čitanju i pokreću čisti
modul `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Obitelj se predlaže
samo kada najmanje dva različita pružatelja imaju aktivne veze i izlažu točan odabrani ID modela.
Onemogućeni modeli, neaktivni pružatelji, nedostajući ID-jevi modela, obitelji s jednim članom i dvosmislena
podudaranja aliasa/prefiksa sigurno se odbijaju. Prijedlozi upotrebljavaju postojeću strategiju `priority`, pri čemu se
najveći ponavljajući mjesečni proračun postavlja prvi; korisničko sučelje stvara ih isključivo putem `POST /api/combos`.

Vođeno korisničko sučelje nalazi se na `/dashboard/radar/combos`. Ono čita samo lokalne krajnje točke
`GET /api/radar/catalog` i `GET /api/combos/builder/options`. Nikada ne pokreće sinkronizaciju Radara,
ne čita pristupne podatke pružatelja niti izravno zapisuje u bazu podataka kombinacija.

MCP klijenti mogu čitati istu lokalnu projekciju pomoću `omniroute_radar_catalog` (`read:radar`). Neobavezni
filtri `provider`, `familyId` i `enabledOnly` primjenjuju se nakon jednog lokalnog čitanja putem
`GET /api/radar/catalog`. Njegov ograničeni izlaz uključuje metapodatke kataloga te pružatelja/model,
naziv za prikaz, `familyId`, kvotu, mogućnosti, stanje omogućenosti, podrijetlo i `disabledBy`; URL-ovi za postavljanje,
koraci, veze, adrese e-pošte, ključevi i podaci o preporukama nikada se ne vraćaju. Ovaj je alat
namijenjen samo za čitanje i nikada ne poziva `/api/radar/sync`.

### Oznake podrijetla

Svaki spojeni unos sadrži polje `origin` koje korisničko sučelje prikazuje kao značku:

- `"baseline"` — nepromijenjeno u odnosu na statički katalog izdanja.
- `"radar"` — jedno ili više polja osvježeno je iz izvora podataka.
- `"local"` — operator ima barem jedno lokalno nadjačavanje za ovaj unos (lokalna
  nadjačavanja uvijek imaju prednost nad izvorom podataka prema pravilu 1, bez obzira na sadržaj izvora podataka).

---

## Lokalne površine — nikad proxy za feed

Lokalne obitelji Radar ruta u nastavku podržavaju korisničko sučelje unutar `src/app/api/radar/`:

| Ruta                           | Metoda | Svrha                                                                                                                                   |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Vraća spojeni katalog (`getRadarCatalog()`) iz lokalne predmemorije.                                                                    |
| `/api/radar/sync`              | POST   | Pokreće `syncRadar()` na strani poslužitelja; vraća rezultirajući status.                                                               |
| `/api/radar/settings`          | GET    | Vraća `{ optIn, hasSupporterKey, supporterKeyMasked }` — nikad neobrađeni ključ.                                                        |
| `/api/radar/settings`          | POST   | Postavlja privolu i/ili (šifrirani) ključ podržavatelja.                                                                                |
| `/api/radar/referrals`         | GET    | Vraća `{ fixed, campaigns, tier }` iz lokalne predmemorije — pogledajte [Referalne poveznice](#referral-links-free-credits) u nastavku. |
| `/api/radar/offers`            | GET    | Vraća aktivne ponude iz provjerene lokalne aktivne predmemorije; nikad ne vraća ključ podržavatelja.                                    |
| `/api/radar/offers/sync`       | POST   | Pokreće cjevovod `syncRadarOffers()` na strani poslužitelja koji koristi isključivo aktivni ključ.                                      |
| `/api/radar/intel`             | GET    | Vraća provjerene lokalne aktivne Intel podatke i logičku vrijednost prepoznavanja podržavatelja; nikad identitet ili ključ.             |
| `/api/radar/intel/sync`        | POST   | Pokreće cjevovod `syncRadarIntel()` na strani poslužitelja koji koristi isključivo aktivni ključ.                                       |
| `/api/radar/status`            | GET    | Vraća lokalni status postavki/predmemorije samo za čitanje za katalog, preporuke, ponude i Intel, bez tajnih podataka.                  |
| `/api/radar/sync-all`          | POST   | Pokreće sva četiri modula za sinkronizaciju na strani poslužitelja i vraća zaseban status za svaki feed.                                |
| `/api/radar/local-model-state` | GET    | Navodi trajno pohranjena nadjačavanja i nadgrobne oznake za kontrole uređivanja/vraćanja.                                               |
| `/api/radar/local-model-state` | PATCH  | Postavlja ili briše provjerena polja nadjačavanja `displayName`/`enabled`.                                                              |
| `/api/radar/local-model-state` | PUT    | Stvara ili uklanja nadgrobnu oznaku s `{ provider, modelId, tombstoned }`.                                                              |
| `/api/radar/local-model-state` | DELETE | Briše polja nadjačavanja koja se mogu uređivati, uz očuvanje postojeće nadgrobne oznake.                                                |

**Strogo pravilo: ove rute nikad ne djeluju kao proxy za uslugu feeda.** Preglednik uvijek komunicira
isključivo s lokalnim OmniRoute poslužiteljem. Četiri modula koja pristupaju usluzi Radar su
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (preporuke) i
`src/lib/radar/offersSync.ts` (ponude) te `src/lib/radar/intelSync.ts` (Intel); svi se izvršavaju
na strani poslužitelja, nikad na strani klijenta. Time se
URL feeda i svaki ključ podržavatelja u potpunosti uklanjaju iz mrežnog prometa vidljivog klijentu.

Sve Radar krajnje točke vraćaju `404` kada je `RADAR_ENABLED` isključen (pogledajte
[Zastavica](#flag-radar_enabled-default-off) iznad), a odgovore s pogreškama usmjeravaju kroz
`buildErrorBody()`/`sanitizeErrorMessage()` u skladu s pravilom sanitizacije pogrešaka koje vrijedi za cijeli repozitorij
(`docs/security/ERROR_SANITIZATION.md`).

### Autentifikacija

Sve Radar krajnje točke zahtijevaju autentifikaciju putem `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — kolačića sesije nadzorne ploče ili API ključa s opsegom upravljanja,
istog zaštitnog mehanizma koji štiti ostatak `/api/settings/*`. Provjera isključene zastavice
koja vraća `404` uvijek se izvršava **prije** provjere autentifikacije, pa instalacija s isključenim
`RADAR_ENABLED` ostaje identična na razini bajtova (nema upita za autentifikaciju samo da bi se doznalo
da površina ne postoji); nakon uključivanja zastavice, neautentificirani zahtjev dobiva `401` prije
bilo kakvog čitanja iz baze podataka ili pisanja u nju. `GET /api/radar/settings` nikad ne vraća
neobrađeni ključ podržavatelja bez obzira na stanje autentifikacije — samo maskirani oblik i logičku
vrijednost `hasSupporterKey`.

---

## Ponude za podržavatelje

Ponude upotrebljavaju vlastiti potpisani artefakt, `GET /v1/offers/latest`, i nikada ne dijele predmemoriju kataloga ili preporuka. Poslužiteljska krajnja točka zahtijeva valjani aktivni Bearer ključ podržavatelja; nema pričuvne opcije za zajednicu. `syncRadarOffers()` stoga se zaustavlja prije pristupa mreži kada je zastavica značajke isključena, operater nije dao privolu ili nije konfiguriran ključ podržavatelja.

Nakon uspješnog GET zahtjeva, klijent provjerava Ed25519 potpis nad točnim bajtovima odgovora, validira `RadarOffersFeedSchema`, zahtijeva da i potpisano tijelo i zaglavlje `x-omniroute-feed-tier` navode `live`, primjenjuje pravilo o strogo novijoj verziji s točkama i tek tada atomarno zamjenjuje `radar_offers_cache` (migracija `144_radar_offers_cache.sql`). Primjenjuje se isto ograničenje od 10 MB za zaglavlje i tok koje upotrebljavaju ostali sažeci sadržaja. Neuspjesi potpisa, sheme, razine, zaštite od ponavljanja, veličine, HTTP-a i mreže zadržavaju posljednju provjerenu predmemoriju.

Zatvoreni format ponude podržava tri usporedive vrste pogodnosti: postotak u baznim bodovima, kredit u manjim novčanim jedinicama ili dane probnog razdoblja. Partnerska ponuda mora sadržavati javnu referentnu vrijednost iste vrste, a njezina pogodnost mora biti strogo veća; službene ponude nemaju partnersku referentnu vrijednost. URL-ovi moraju upotrebljavati HTTPS i ne smiju sadržavati vjerodajnice. `getRadarOffers()` radi dodatne zaštite ponovno validira predmemorirani korisni sadržaj i filtrira istekle stavke pri svakom lokalnom čitanju; `/dashboard/radar/offers` ponovno filtrira istekle stavke prije prikazivanja, upotrebljava portugalski tekst kada je dostupan uz engleski kao pričuvni jezik te izričito označava partnerske ponude.

Preglednik poziva samo lokalne rute: čita maskiranu snimku postavki, putem `POST /api/radar/offers/sync` traži osvježavanje na strani poslužitelja, a zatim čita `GET /api/radar/offers`. Bez ključa prikazuje postojeće poveznice za doprinos i podršku umjesto pokušaja slanja zahtjeva za sažetak sadržaja. Vanjske poveznice ponuda otvaraju se u novoj kartici s `noopener noreferrer`. U ovom izdanju nije izložen MCP alat `radar_offers`.

---

## Radar Intel, značka podržavatelja i CLI

Intel je potpisani artefakt dostupan putem `GET /v1/intel/latest`. Zatvoreni `RadarIntelFeedSchema` prihvaća samo ELO rangiranja u vlasništvu Radara koja privatni kustos izvodi iz potvrđenih usporedbi te činjenične razlike u starosti i broju kataloga izvedene iz potpisanih snimki kataloga. Metodologija je fiksirana na početnu ocjenu 1000 i K=32. Prazno rangiranje valjano je kada nijedna usporedba nije potvrđena; klijent ga nikada ne sintetizira.

`syncRadarIntel()` primjenjuje isti poslužiteljski Bearer, vremensko ograničenje od 30 sekundi, ograničenje toka od 10 MiB, Ed25519 provjeru točnih bajtova, strogu shemu, zahtjev za vrijednost `live` u tijelu i zaglavlju, donju granicu verzije te očuvanje posljednje ispravne predmemorije kao i ponude. Nakon pohrane provjerene aktivne snimke klijent izvodi `radar:<sha256(supporter key)>`, pohranjuje samo taj jednosmjerni identitet i emitira namjenski događaj prepoznavanja `radar_supporter`. Njegova značka `radar-supporter` idempotentna je i dodjeljuje nula XP-a; nikada ne ažurira ljestvice poretka niti ponovno upotrebljava `token_share`. `/dashboard/radar/intel` prikazuje značku isključivo na temelju provjerenih metapodataka lokalne predmemorije.

CLI izlaže `omniroute radar status` i `omniroute radar sync`. Obje naredbe komuniciraju isključivo s lokalnim OmniRoute API-jem. `status` izvodi `GET /api/radar/status` samo za čitanje; `sync` šalje jedan `POST /api/radar/sync-all` i ispisuje rezultat za svaki sažetak sadržaja. Nijedna naredba ne čita, ne prihvaća niti ispisuje ključ podržavatelja i nijedna ne kontaktira izravno uslugu Radar.

---

## Referalne poveznice (besplatni krediti)

Referalne poveznice poslužuju se iz **samostalnog, uvijek ažurnog** kanala —
`GET /v1/referrals/latest` — odvojenog od kanala kataloga. To je namjerno: kanal
kataloga na razini zajednice snimka je koja može biti stara do 30 dana, pa je
referalna poveznica izdvojena iz njega prije kasnila za stvarnim popisom poveznica na
poslužitelju za isto toliko vremena (novododana referalna poveznica ne bi stigla do
besplatnog korisnika ili korisnika iz zajednice i do mjesec dana). Kanal referalnih
poveznica uklanja tu odgodu sinkronizacijom prema vlastitom, znatno kraćem rasporedu.

```ts
// Tijelo odgovora GET /v1/referrals/latest (potpisano s Ed25519, isti prikvačeni ključ kao
// za kanal kataloga):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministički: max(updatedAt) među referalnim
                                  // poveznicama, pa dva identična zahtjeva proizvode potpuno
                                  // iste potpisane bajtove/potpis
  referrals: {
    fixed: RadarReferral[],      // prisutno na SVAKOJ razini, uključujući no-auth/community
    campaigns: RadarReferral[],  // popunjeno samo za valjani aktivni (supporter) Bearer
                                  // ključ; zahtjevi bez autentifikacije ili s isteklim ključem dobivaju []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Za razliku od kanala kataloga, ovo tijelo uopće ne sadrži polje `tier` — poslužitelj
odlučuje što uključiti za svaki zahtjev na temelju ključa `Authorization`, pa je
zaglavlje odgovora `x-omniroute-feed-tier` JEDINI izvor poslužene razine
(`referralsSync.ts::syncRadarReferrals`); ako zaglavlje nedostaje ili nije prepoznato,
koristi se `"community"`, pretpostavka s najmanjim ovlastima. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) provjerava cijelo tijelo, ponovno koristeći istu
shemu `RadarReferralSchema` za pojedinačnu referalnu poveznicu, izvezenu iz
`feedSchema.ts`, kako bi oba kanala identično provjeravala pojedinačne referalne
poveznice. Svaki `RadarReferral.url` mora biti `https://` — URL s `http://` ne prolazi
provjeru sheme.

STARO polje `referrals`, ugrađeno u katalog unutar `RadarFeedSchema` (`feedSchema.ts`),
zadržano je radi kompatibilnosti sa starijim verzijama već predmemoriranih kanala
kataloga, ali ga `getRadarReferrals()` više ne čita — pogledajte
[Pristupnik](#accessor) u nastavku.

### Sinkronizacija

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) JEDINI je modul koji
pristupa mreži radi referalnih poveznica te točno preslikava ugovor funkcije
`syncRadar()`: isključena zastavica → `disabled`; isključen pristanak → `opt_out`;
preuzima `${RADAR_FEED_URL}/v1/referrals/latest` (isti nadomjesni
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` kao za katalog), provjerava Ed25519 potpis nad
točnim bajtovima odgovora (`verifyFeedBytes`), provjerava prema
`RadarReferralsFeedSchema` i sprema u predmemoriju tablice
`radar_referrals_cache` (migracija `142_radar_referrals_cache.sql`) — tablicu potpuno
odvojenu od kataloške tablice `radar_feed_cache`. Ograničenje odgovora na 10 MB i donja
granica za `generatedAt` odbacuju dolazni kanal stariji od predmemoriranog, čime se
sprječava ponovno izvođenje starijeg potpisanog artefakta. Jednaka vremenska oznaka se
prihvaća: poslužitelj namjerno daje varijantama referalnih poveznica za zajednicu i
aktivne podržavatelje isti deterministički `generatedAt`, tako da se potpisani sadržaj
i poslužena razina mogu promijeniti nakon promjene ključa podržavatelja bez promjene
osnovnog skupa poveznica. Nikad ne izbacuje iznimku — uvijek vraća objekt statusa;
pogreške u polju `reason` nikad ne sadrže trag stoga.

Dva okidača održavaju predmemoriju referalnih poveznica spremnom, oba neovisna o
vlastitom 24-satnom ritmu kataloga:

- **Sinkronizacija pri čitanju** — sam `GET /api/radar/referrals` poziva
  `syncRadarReferrals()` u istom tijeku kad god predmemorija nedostaje ili je starija
  od `REFERRALS_STALE_MS` (1 h, `shouldSyncReferralsOnRead()`), prije posluživanja
  odgovora. Time fiksne poveznice postaju „uvijek ažurne” već pri sljedećem učitavanju
  nadzorne ploče, bez čekanja na pozadinski mjerač vremena.
- **Popratna sinkronizacija raspoređivača** — `radarSchedulerTick()` (`scheduler.ts`)
  neovisno procjenjuje zastarjelost referalnih poveznica tijekom istog satnog ciklusa
  koji se koristi za katalog i poziva `syncRadarReferrals()` kada je potrebno. To se
  izvršava bez obzira na to je li katalog trebao sinkronizaciju u tom ciklusu i nikad
  ne utječe na oblik rezultata `RadarTickResult` (samo popratni učinak po načelu
  najboljeg pokušaja, uz zanemarivanje pogrešaka).

### Pristupnik

`src/lib/radar/index.ts` izvozi dva pristupnika samo za čitanje, od kojih nijedan nikad
ne izbacuje iznimku (isti obrambeni ugovor kao `getRadarCatalog()` — isključena
zastavica, nepostojeća predmemorija ili oštećeni predmemorirani sadržaj svi se
razrješavaju u prazan oblik umjesto u pogrešku):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  čita iz `radar_referrals_cache` (putem `getRadarReferralsCache()`) i provjerava kroz
  `RadarReferralsFeedSchema` — **ne** iz predmemorije kataloga.
- `getDefaultReferralFor(provider)` → referalna poveznica iz `fixed` s
  `isDefault: true` za tog pružatelja ili `null`. Pregledava samo `fixed` — kampanja se
  nikad ne koristi kao „zadana” poveznica pružatelja.

Stvarno pravilo za određivanje „koja je referalna poveznica zadana za pružatelja”
nalazi se u `findDefaultReferral()` (`src/lib/radar/referrals.ts`), maloj čistoj funkciji
**bez uvoza baze podataka** — može se sigurno uvesti u komponentu `"use client"`.
`getRadarReferrals`/`getDefaultReferralFor` (u `index.ts`) uključuju `@/lib/db/radar` i
stoga ostaju samo na poslužitelju; nadzorna ploča pružatelja izravno uvozi
`referrals.ts` umjesto `index.ts` (pogledajte u nastavku) kako bi se izbjeglo uključivanje
paketa `better-sqlite3` u preglednik.

### `GET /api/radar/referrals`

Slijedi potpuno isti redoslijed provjera kao i svaka druga Radar ruta: isključen `RADAR_ENABLED` →
`404` (provjerava se prvo, uz identično ponašanje na razini bajtova); neautentificiran korisnik → `401`; u suprotnom
pokreće sinkronizaciju pri čitanju (vidi iznad) kada su podaci zastarjeli, a zatim vraća `200` s
`{ fixed, campaigns, tier }` — `tier` dolazi izravno iz retka predmemorije (koji je možda upravo osvježen)
i služi isključivo u informativne svrhe (u korisničkom sučelju određuje nenametljivi tekst za nadogradnju opisan u nastavku). Nikada
ne prosljeđuje zahtjev izravno poslužitelju sa sadržajem — izvorni kod same rute ne sadrži poziv `fetch(`;
mrežni se pristup uvijek odvija isključivo unutar `syncRadarReferrals()`, prema istom načelu
korištenja samo lokalne predmemorije kao kod `/api/radar/catalog`.

### Korisničko sučelje nadzorne ploče — kartica "Besplatni krediti" na `/dashboard/radar`

Ponovno koristi postojeću Radar stranicu (`src/app/(dashboard)/dashboard/radar/page.tsx`) kao
drugu karticu umjesto nove rute — manja površina za usmjeravanje/i18n za značajku koja je
varijacija podataka koje stranica već dohvaća. Nakon uključivanja, traka kartica nudi
**Katalog** (postojeća tablica) i **Besplatni krediti**:

- Fiksne poveznice grupirane su prema pružatelju usluga, pri čemu svaka prikazuje `requiredAction` (kada postoji)
  i gumb prema referalnom URL-u s atributima `target="_blank" rel="noopener noreferrer"`.
- Kampanje prikazuju isto, uz `validUntil` kada postoji.
- Kada je `campaigns` prazan **i** poslužena razina jest `community`, korisničko sučelje prikazuje
  kratku napomenu za nadogradnju ("vremenski ograničene kampanje dodatna su pogodnost za podržavatelje") — ona **nikada**
  ne skriva niti ograničava popis fiksnih poveznica, koji ostaje potpuno popunjen za svaku razinu. Ova
  poruka za nadogradnju samo je nenametljiva obavijest, a nikada prepreka.

### Referalna poveznica na nazivu pružatelja usluga (nadzorna ploča pružatelja usluga)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
već je povezivao naziv pružatelja usluga s `providerInfo.website` kada postoji, uz jedan
presedan za monetiziranu poveznicu: napomenu o partnerskoj poveznici za Kimi (Moonshot AI)
(i18n ključ `providers.kimiPartnerLinkNote`). D28 ponovno koristi upravo isti obrazac nenametljive napomene
za zadane Radar referalne poveznice umjesto uvođenja novog ključa.

Namjerno labavo povezivanje:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  jest **čista** funkcija — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — bez ovisnosti o `@/lib/radar` ili `@/lib/db/*`. `providerPageUtils.ts` u
  cijelosti ostaje bez tih uvoza (što potvrđuje
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (komponenta `"use client"`) jedino je mjesto kojem je dopušteno
  dohvaćati Radar podatke — putem `fetch("/api/radar/referrals")`, prema istom obrascu lokalne rute
  koji koristi i sama stranica Radar nadzorne ploče — te na klijentskoj strani izračunava zadanu referalnu poveznicu
  pomoću `findDefaultReferral()` iz datoteke `src/lib/radar/referrals.ts`, koja ne ovisi o bazi podataka.
- Kada je `RADAR_ENABLED` isključen, dohvaćanje vraća 404, `referralUrl` ostaje `null`, a
  `resolveProviderHeaderLink()` vraća statički `website` iz kataloga bez promjena — stranica
  pružatelja usluga identična je na razini bajtova stanju prije uvođenja ove značajke. Isti je ishod kada
  još nema predmemorije ili nema zadane referalne poveznice za tog određenog pružatelja usluga.
- Kada se zadana referalna poveznica primjenjuje, `ProviderPageHeader` prima `isReferralLink`
  i prikazuje istu nenametljivu napomenu/oblačić kao za partnersku poveznicu Kimi (ponovno koristeći
  ključ `providers.kimiPartnerLinkNote`) — nikada nov, zaseban vizualni prikaz.

---

## Kako samostalno hostirati feed

Fork ili samostalni hoster koji želi potpunu kontrolu nad katalogom može pokrenuti vlastitu
uslugu feeda bez izmjena klijentskog koda:

1. Poslužite krajnju točku `GET /v1/catalog/latest` koja vraća JSON tijelo usklađeno sa
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — na najvišoj razini `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` i `totals`. Poštujte `x-omniroute-radar-schema: 2`; poslužitelj kompatibilan
   s prijelaznim razdobljem trebao bi zahtjeve bez tog zaglavlja prema zadanim postavkama
   usmjeriti na zasebno potpisani v1 artefakt.
2. Potpišite točne bajtove odgovora parom Ed25519 ključeva i vratite base64
   potpis u zaglavlju odgovora `x-omniroute-feed-signature`.
3. Postavite `RADAR_FEED_URL` na novi osnovni URL, a `RADAR_FEED_PUBKEY` na odgovarajući
   javni ključ (base64-DER SPKI ili PEM) — pogledajte
   [referencu varijabli okruženja](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Omogućite `RADAR_ENABLED` i uključite se putem `POST /api/radar/settings`
   (`{ optIn: true }`).

Nisu potrebne nikakve druge izmjene koda — `verifyFeedBytes()` automatski preuzima
zamjensku vrijednost (`getFeedPublicKeys()` u `src/lib/radar/pinnedKeys.ts`), a usporedba
verzija, provjera valjanosti sheme i pravila spajanja jednako se primjenjuju na samostalno hostirani
feed.

Referalne poveznice (pogledajte [Referalne poveznice (besplatni krediti)](#referral-links-free-credits)
iznad) zaseban su, neobavezan artefakt: fork koji poslužuje samo `/v1/catalog/latest`
i dalje u potpunosti funkcionira — `syncRadarReferrals()` prelazi na `{ status: "error" }` pri odgovoru `404`
s `/v1/referrals/latest`, a predmemorija jednostavno ostaje prazna, pa
`GET /api/radar/referrals` nastavlja vraćati `{ fixed: [], campaigns: [], tier: null }`
umjesto da uzrokuje neuspjeh ostatka stranice. Kako biste ponudili i referalne poveznice, poslužite
`GET /v1/referrals/latest` usklađen s `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) i potpišite ga istim parom Ed25519 ključeva kao
feed kataloga.

Ponude za podržavatelje još su jedan neobavezni artefakt. Kako biste ih posluživali, implementirajte
`GET /v1/offers/latest` sa zatvorenim `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), zahtijevajte aktivno pravo pristupa, vratite
`x-omniroute-feed-tier: live` i potpišite točne bajtove istim ključem. Fork koji izostavi ovu
krajnju točku zadržava nepromijenjeno ponašanje kataloga i preporuka; osvježavanje ponuda ne uspijeva bez gubitka podataka, a
posljednja provjerena lokalna predmemorija ponuda ostaje dostupna.

Intel je neobavezan na isti način. Samostalni hoster može posluživati `GET /v1/intel/latest` koristeći
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), zahtijevati aktivno pravo pristupa, vratiti
`x-omniroute-feed-tier: live` i potpisati točne bajtove dijeljenim Ed25519 ključem. Izostavljanje ove
krajnje točke ne utječe na katalog, preporuke ni ponude; osvježavanje Intela čuva posljednju provjerenu
lokalnu snimku.

---

## Povezana dokumentacija

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — obrazac
  odgovora s pogreškom koji slijede rute `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referenca za `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
