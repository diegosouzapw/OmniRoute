# Radar Free-Model Catalog (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Tõeallikas:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Viimati uuendatud:** 2026-09-01 — v3.8.51
> **Majutatud teenuse tõenduspiir:** siin kirjeldatud serveripoolsed reeglid kontrolliti
> 2026-09-01 tahtlikult privaatse Radari serveri täpse revisjoni
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed` põhjal. Seda teostust selles OSS-i
> repositooriumis ei levitata; majutatud teenuse kättesaadavus jääb eraldiseisvaks tööolekuks.

Radar on **valikuline lisamoodul**, mis lisab väljalaske baaskataloogile (`FREE_MODEL_BUDGETS` failis
`open-sse/config/freeModelCatalog.data.ts`) allkirjastatud ja värskelt kureeritud tasuta mudelite
kataloogi. See on vajalik, sest tasuta tasemete olukord muutub väljalasketsüklist
kiiremini — teenusepakkujad lisavad, vähendavad või lõpetavad tasuta kvoote väljalasete vahel
ning baaskataloogi saab värskendada ainult uue versiooni avaldamisel.

**Miski, mis on täna tasuta, ei muutu kaugvoo tõttu tasuliseks.** Radar ei muuda kunagi
baaskataloogi kirjet tasuliseks; see ainult värskendab lugemise ajal limiitide ja oleku välju ning saab
väljalasete vahel lisada uusi avastatud tasuta mudeleid. Operaator saab mudeli endiselt
kohalikult peita ja samal töölaual taastada. Baaskataloogi ennast kettal
kunagi ei muudeta — vt allpool jaotist
[Lugemisaegse ülekatte ühendamise reeglid](#read-time-overlay-merge-rules).

---

## Tarneolek versioonis v3.8.51

Järgmine olek eristab selle OSS-i väljalaske funktsionaalsust Radari
hilisematest töösuundadest. See on kooditaseme olek, mitte lubadus, et konkreetne majutatud juurutus
või väline integratsioon on praegu saadaval.

| Valdkond                                | Olek selles väljalaskes                                                                                                                                                                                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Allkirjastatud kataloogi klient         | Teostatud `RADAR_ENABLED` taga koos eraldi osalemisnõusoleku, Ed25519-kontrolli, kohalike krüpteeritud seadete ja vahemälu, püsivate kuvamis- ja lubamisalaste alistuste, tagasipööratavate hauakivikirjete, ajastaja ning töölauaga.                      |
| Kaastöötaja aktiveerimine               | Töölaud viitab serveris majutatud GitHubi taotlusvoole ja aktsepteerib olemasolevat `omr_…` võtit. Kaastöötaja sobivuse määrab privaatne teenus; OSS-i klient ei sisalda GitHubi pääsmikku ega väljastamisloogikat.                                        |
| Toetajavõtmega aktiveerimine            | Teostatud. Toorvõti valideeritakse, krüpteeritakse salvestamisel, maskeeritakse lugemisel ja saadetakse ainult serveripoolse sünkroonimise kaudu. Võtme muutmine või kustutamine muudab kõik neli õigustundlikku voovahemälu kehtetuks.                    |
| Viitamislingid                          | Teostatud eraldi allkirjastatud ja iga tunni järel värskendatava voona. Püsilingid on kogukonnatasemele kohe saadaval; piiratud kampaaniad jäävad reaalajas taseme andmeteks.                                                                              |
| Toetajapakkumised                       | Teostatud eraldi allkirjastatud, ainult reaalajas voona ja töölaualehena. Klient valideerib suletud hüveskeemi uuesti, säilitab viimase korrektse vahemälu, filtreerib aegunud kirjed ja märgistab partneripakkumised selgelt.                             |
| Analüüsiteave ja toetajate tunnustamine | Teostatud range allkirjastatud, ainult reaalajas voona koos Radari hallatava ELO, faktilise kataloogi värskuse ja trendi, kontrollitud kohaliku toetajamärgi, töölaualehe ning ainult kohalike CLI oleku- ja sünkroonimiskäskudega.                        |
| Maksed ja tehingulised e-kirjad         | OSS-i kliendis teostamata. Ostu, annetuse, kviitungi kontrollimise, taastamise ja e-kirjade saatmise eest vastutab privaatne teenus; majutatud teenuse kättesaadavus sõltub endiselt selle järelevalvega juurutusest ja teenusepakkuja konfiguratsioonist. |
| Uurimisagendi töösuund                  | Ei kuulu selle kliendiväljalaske koosseisu. Kureeritud voo sisu jääb serveripoolseteks andmeteks; OmniRoute'i paigaldises ei tööta autonoomset uurimisagenti.                                                                                              |

---

## Avalike teadaannete lugeja

Üldine teadaannete lugeja on Radari funktsioonilipust eraldiseisev. Töölaua avaleht ja
muudatuste logi vaatur hangivad hoidla avaliku faili `news.json` tavalise `GET`-päringuga aadressilt
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Nad ei saada ühtegi Radari seadistust, viipa, teenusepakkuja
konfiguratsiooni, kasutuskirjet ega kohalikku peitmisolekut.

`news.json` kasutab suletud v2 skeemi, mille rakendab `parseNewsPayload()`:

- `schemaVersion: 2` ja piiratud mahuga `items[]` kogum;
- teadaannete stabiilsed ja kordumatud `id` väärtused;
- selgesõnalised väljad `active` ja ISO-vormingus `publishedAt`;
- kohustuslik ingliskeelne tekst koos valikuliste lokaliseeritud tekstidega;
- valikulised autentimisandmeid mittevajavad HTTPS-lingid ja lubatud loendisse kuuluv ikoon;
- uusima aktiivse teadaande valimine, lokaadi korral inglise keelele taandumine ja ID-põhine kohalik peitmine.

Parser aktsepteerib ajutiselt varasemat ainsuslikku kuju `{ active, title, message, ... }`, et
vanemad harud saaksid migreeruda ilma muudatuste logi vaadet rikkumata. Vigased vood on passiivsed. Radari käivitamise
kirje tarnitakse väärtusega `active: false`; selle muutmine väärtuseks `true` on eraldiseisev ühendamis- ja juurutamisjärgne
väljalasketoiming ning see ei muuda muutujat `RADAR_ENABLED` ega sõltumatut voosünkroonimise nõusolekut.

---

## Lipp: `RADAR_ENABLED` (vaikimisi väljas)

Radar on läbivalt piiratud funktsioonilipuga `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategooria `policies`,
`defaultValue: "false"`).

**Kui lipp on väljas, siis seda funktsionaalsust ei eksisteeri:**

- Kõik `/api/radar/*` lõpp-punktid, sealhulgas kohaliku mudeli oleku lugemised ja kirjutamised,
  tagastavad `404` enne mis tahes Radari mooduli puudutamist.
- Töölaua vaated (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderdavad
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) tagastab muutmata lähtebaasi —
  sama kirjete arvu, samad väärtused ja iga kirje märgendiga `origin: "baseline"` — ega loe kunagi
  voopuhvrit.
- Ühtegi Radari võrgupäringut ei tehta; iga sünkroonimismoodul tagastab enne `fetch`-i puudutamist
  `{ status: "disabled" }`.

See on range ülemhulga-pääs: lipu sisselülitamine avab ainult _vaated_ ja ei midagi
enamat. See ei laadi andmeid üles, ei käivita taustsünkroonimist ega muuda
marsruutimist või mudeli valikut — vt allpool kirjeldatud eraldiseisvat nõusolekut.

---

## Andmete sünkroonimine on ERALDI nõusolekut nõudev — privaatsuslubadus

Muutuja `RADAR_ENABLED` sisselülitamine avab ainult kasutajaliidese. Voo sünkroonimiseks on vaja teist,
sõltumatut nõusolekut, mis salvestatakse väljal `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migratsioon `136_radar_cache_settings.sql`). `syncRadar()` kontrollib enne mis tahes võrgupäringu tegemist nii lippu _kui ka_
nõusolekut:

```
Lipp väljas      → { status: "disabled" }   — võrgupäringut ei tehta
Nõusolek puudub  → { status: "opt_out" }    — võrgupäringut ei tehta
```

Kui mõlemad on sisse lülitatud, on sünkroonimise käik järgmine:

1. `GET <voo baas-URL>/v1/catalog/latest` päisega `x-omniroute-radar-schema: 2` ja valikulise
   päisega `Authorization: Bearer <toetaja võti>` (vt allpool). Kui skeemipäis puudub, kasutavad serverid vaikimisi eraldi
   allkirjastatud v1 üleminekuartefakti, et vanemad installitud kliendid saaksid jätkuvalt
   värskendusi.
2. See on ainult allalaadimiseks mõeldud rakendusvoog, kuid siiski HTTPS-päring. Majutatud
   taristu saab tavapäraseid ühenduse metaandmeid, näiteks lähte-IP-aadressi. Kui toetaja
   võti on seadistatud, saadab sünkroonimine ka selle võtme Bearer-päises, et teenus saaks
   kasutusõiguse tuvastada. Eespool toodud tõenduspiiris määratletud privaatserveri täpses redaktsioonis
   kasutab voopäringute arvestus võtmeräse, koondkasutust ja IP-aadressi iga päev vahetuvat kärbitud HMAC-i
   käsitsi tehtavaks väärkasutuse kontrolliks; need tabelid ei talleta võtit ega IP-aadressi töötlemata kujul.
   Taristu juurdepääsulogid ja krüpteeritud väljastuse väljundkast on eraldiseisvad käituspiirid.
3. OmniRoute ei saada Radari teenusele kunagi viipu, vastuseid, vestlusi, teenusepakkuja autentimisandmeid, mudeliliiklust,
   tööaega, latentsust ega kohaliku teenusepakkuja konfiguratsiooni.
4. Vastus kontrollitakse, valideeritakse ja puhverdatakse kohapeal (vt
   [Turbemudel](#security-model)). Radaril on täpselt neli serveripoolset võrguteed:
   kataloogi jaoks `syncRadar()`, soovituste jaoks `syncRadarReferrals()` ning
   ainult toetajatele mõeldud pakkumiste ja Inteli jaoks `syncRadarOffers()` / `syncRadarIntel()`.

**Toetaja võti** on valikuline Bearer-tõend (`radar_settings.supporter_key`),
mis võimaldab vooteenusel otsustada, millist taset pakkuda (vt
[Tasemed](#tiers-community-and-live)). See:

- Salvestatakse **puhkeolekus krüpteeritult** samade AES-256-GCM-i `encrypt()`/`decrypt()`
  abifunktsioonidega (`src/lib/db/encryption.ts`), mida kasutatakse teenusepakkuja autentimisandmete jaoks.
- Määratakse päringuga `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) ja seda
  **ei tagastata kunagi** — vastus sisaldab maskitud kuju (`omr_****abcd`).
- Selle muutmine või eemaldamine tühistab atomaarselt kataloogi, soovituste, pakkumiste ja Inteli puhvrid. Järgmine
  sünkroonimine või lugemine tuvastab uue kasutusõiguse serveri poolel; võtme salvestamine ei tee iseenesest
  võrgupäringut ega kasuta ära ühekordset aktiveerimisvõtit.
- See saadetakse sünkroonimise GET-päringus vooteenusele Bearer-tõendina — võtme kohta ei välju kliendist
  midagi muud.

---

## Enne nõusoleku andmist kuvatavad juurdepääsu- ja ohutusreeglid

Mitteaktiivne juhtpaneel kuvab need reeglid failist
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **enne** kummagi aktiveerimistoimingu tegemist.
Kanooniline juurdepääsuskaala on järgmine:

| Tase                             | Nõuetele vastavus                                                                              | Juurdepääs                                                       | Kordamise/aegumise reegel                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Kogukond                         | Kõik; võtit pole                                                                               | Täielik kataloog umbes 30-päevase viivitusega                    | Alati saadaval; võtit ei väljastata                                             |
| Täht + jälgimine                 | GitHub OAuth kinnitab nii repositooriumile tähe andmist kui ka omaniku jälgimist               | Üks reaalajas kataloogi lugemine, seejärel Kogukond              | Üks väljastamine sisselogimise kohta; uuesti ei väljastata                      |
| Panustajate Top 10               | Kohad 1–10 viimases täielikus nädala edetabelis                                                | 365 päeva reaalajas juurdepääsu                                  | Lunastatakse nõudmisel; edetabelist väljalangemine ei lühenda määratud perioodi |
| Panustajate Top 100              | Kohad 11–100 selles edetabelis                                                                 | 90 päeva reaalajas juurdepääsu                                   | Sama nõudmisel rakendatav/idempotentne lunastamisreegel                         |
| Toetaja ost                      | Ühekordne 6-kuuline, 1-aastane või eluaegne ost                                                | Reaalajas kataloog, allkirjastatud reaalajas pakkumised ja Intel | Automaatset uuendamist ei toimu                                                 |
| Annetus/käsitsi antud juurdepääs | Omaniku üle vaadatud annetus või omaniku antud juurdepääs kindlaks päevade arvuks / kogu eluks | Sama reaalajas juurdepääsuõigus määratud perioodiks              | Auditeeritud, idempotentne juurdepääsu andmine                                  |

Ühendatud PR-id, commit'id ja muudetud read on **ainult edetabeli sisendid**. Väljaspool Top 100
asuv sisselogija ei saa panustaja juurdepääsu olenemata PR-ide arvust. Tähtajalised ostud, annetused,
panustajaperioodid ja käsitsi antud juurdepääsud liidetakse praegusele aegumiskuupäevale; eluaegne
juurdepääs on ülimuslik. Edetabelikoha muutus ei tühista ega lühenda tagasiulatuvalt juba määratud aega.

Majutatud litsents on isiklik ja kasutajale kuvatava reegli järgi võib korraga olla üks aktiivne
installatsioon. See väljalase **ei** väida, et kasutusel on riistvaralukk: OSS-i sünkroonimine ei võta
riistvara sõrmejälge ega halda krüptograafilist seadmerenti. Eespool nimetatud kontrollitud
privaatserveri redaktsioonis hõlmab rakendatud jõustamine juurdepääsuõiguse valideerimist ja käsitsi
ülevaatamise signaali, kui sama aktiivset võtit nähakse 24 tunni jooksul neljandalt erinevalt IP-aadressilt.
See signaal ei blokeeri ega tühista võtit kunagi automaatselt. Taastamine tühistab ja asendab kadunud
võtme, säilitades olemasoleva aegumiskuupäeva; see ei taaskäivita ostetud ega määratud perioodi.

Reaalajas pakkumisi kureeritakse käsitsi ning need võivad muutuda või aeguda. Nõusolekukuva nimetab
täpselt ka privaatsuspiiri: allkirjastatud kataloogi-/soovitusmetaandmed laaditakse alla; kehtiv võti
avab lisaks allkirjastatud pakkumised ja Inteli; Bearer-võti ning tavapärased ühenduse metaandmed
jõuavad majutatud teenusesse; viibad, vastused, vestlused, teenusepakkuja identimisteave, mudeliliiklus,
tööaeg, latentsus ja kohaliku teenusepakkuja konfiguratsioon sinna ei jõua.

---

## Toetajavõtme hankimine

Aktiveerimiskuva (`/dashboard/radar`) sisaldab linke kahele viisile, kuidas **hankida**
toetajavõti. OSS-i repositoorium ise ei väljasta kunagi võtmeid, ei käita maksekoodi ega
**avalda kunagi hinda** — hinnakujundus otsustatakse ja kuvatakse täielikult
sihtlehtedel, mitte selles repositooriumis (spetsifikatsiooni otsus D14).

- **„Olen panustaja“** — avab `RADAR_CONTRIBUTOR_CLAIM_URL` (vaikimisi
  `https://radar.omniroute.online/auth/github`), privaatses Radari serveris majutatud
  GitHub OAuthi taotlusvoo. See kontrollib viimast täielikku nädala edetabelit: 10 parimat saavad 365 päeva
  ning kohad 11–100 saavad 90 päeva. Esisajast väljaspool ei anna PR-ide arv kunagi juurdepääsu; selle asemel
  kontrollib voog eraldiseisvat tärniga märkimise + jälgimise ühekordset taset.
- **„Toeta projekti“** — avab `RADAR_SUPPORTER_PLANS_URL` (vaikimisi
  `https://radar.omniroute.online/planos`), majutatud lehe ühekordsete 6 kuu, 1 aasta ja
  eluaegsete valikutega. OSS-i lehel ei kuvata endiselt ühtegi rahalist väärtust.

Mõlemad URL-id lahendatakse serveri poolel (`src/lib/radar/links.ts`, sama keskkonnamuutujaga
alista­mise muster nagu `RADAR_FEED_URL`-i puhul) ja edastatakse töölauale olemasoleva
`GET /api/radar/settings` vastuse kaudu (`contributorClaimUrl`, `supporterPlansUrl`) —
kliendikomponent ise ei loe kunagi `process.env`-i.

| Muutuja                       | Otstarve                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Alistab panustaja taotlusvoo URL-i (vaikimisi `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Alistab toetajapakettide URL-i (vaikimisi `https://radar.omniroute.online/planos`).          |

### Kaotatud toetajavõtme taastamine

Majutatud teenuse taastamise alguspunkt on `https://radar.omniroute.online/recover`; sellele viidatakse ka
pakettide lehelt. Taastamine jääb täielikult OSS-kliendist väljapoole, sest kohalik
installatsioon ei saa kunagi ostja/panustaja e-posti aadressi ega suuda krüptitud sätetest
toorvõtit taastada.

1. Sisestage võtmega seotud e-posti aadress. Teenus tagastab sama kinnitusega lehe olenemata sellest, kas
   taastatav litsents on olemas või mitte, mistõttu vorm ei avalda kontode olemasolu.
2. Sobivuse korral saadab edastustöötleja lühiajalise ühekordselt kasutatava lingi. Selle avamisel
   teisaldatakse pääsmik kohe ajutisse krüptitud `HttpOnly`/`Secure` küpsisesse ja suunatakse puhtale
   `/recover` URL-ile; leht ei sisalda pääsmikku, e-posti aadressi, vana võtit ega asendusvõtit.
3. Kinnitage tühistamine. Privaatne teenus tühistab eelmise võtme, loob sama paketi/aegumistähtajaga
   asendusvõtme ja lisab selle ühe tehingu käigus e-postiga saatmise järjekorda. Asendusvõtit ei
   tagastata kunagi brauserile.
4. Kleepige asendusvõti asukohta `/dashboard/radar`. Vana võti peab nüüd langema olekusse `community`;
   asendusvõti peab andma kinnitatud `live` sünkroonimise. Sama taastamislingi uuesti avamine peab
   ebaõnnestuma üldise kehtetu/aegunud lingi vastusega.

Majutatud taastamismarsruut ja meilide edastustöötleja võivad olla koodis olemas, kuid konkreetses
juurutuses siiski kättesaamatud. Ärge nimetage voogu tootmisvalmiks enne, kui server on juurutatud,
edastusteenuse pakkuja on seadistatud kontrollitud adressaadiga ning kogu ühekordse lingi voog on testitud.

Kui külastajal on võti (`omr_` + 40 kuueteistkümnendsüsteemi märki), on aktiveerimiskuval
(`src/app/(dashboard)/dashboard/radar/page.tsx`) peamise toiminguna võtme kleepimise sisestusväli:
võtme kleepimine ja vormi saatmine saadab ühe päringuga `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — võtme kleepimine ühtaegu määrab selle ja lubab osalemise,
avades kuva. Vormingut (`omr_` + 40 kuueteistkümnendsüsteemi märki) kontrollitakse esmalt kliendi poolel
jagatud abifunktsiooniga `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
kasutuskogemuse parandamiseks; serveri Zodi skeem on mõlemal juhul lõplik kontroll. Kui
võti on määratud, kuvab aktiveerimiskuva tühja sisestusvälja asemel maskitud kuju (`supporterKeyMasked`
päringust `GET /api/radar/settings`) koos juhtelemendiga „muuda võtit“, mille abil saab
uue võtme kleepida — toorvõtit ei kuvata enam kunagi. Kaks ülaltoodud taotlus-/paketinuppu
jäävad võimaluseks, kuidas võti esmalt _hankida_; selle sisestusvälja kaudu aktiveerib selle
operaator, kellel võti juba olemas on.

### Täielik aktiveerimine ja juhendatud seadistamine

Privaatse voo teenuse ja selle OSS-kliendi vahel on teadlikult kitsas piir: teenus
väljastab ja valideerib toetajavõtme, samal ajal kui kohalik OmniRoute'i installatsioon krüptib võtme,
sünkroonib allkirjastatud artefaktid serveri poolel ning juhendab pakkuja seadistamist. Abistatud valideerimise järjekord on:

1. Hankige äsja väljastatud või taastatud võti toetaja taotlusest, paketi/ostu vormist, taastamisprotsessist või volitatud privaatserveri operaatorilt. Ärge kleepige töötlemata võtit logidesse, kuvatõmmistele, probleemide kommentaaridesse ega käsurea argumentidesse.
2. Lubage kohalikus OmniRoute’i installis funktsioonilipp `RADAR_ENABLED`. See muudab kasutajaliidese nähtavaks, kuid võrguühendusi ei looda enne, kui eraldi nõusolek on salvestatud.
3. Avage `/dashboard/radar`, kleepige võti ja aktiveerige. Brauser saadab ühe kohaliku päringu `POST /api/radar/settings` sisuga `{ optIn: true, supporterKey }`; võti krüptitakse kohapeal ja vastus sisaldab ainult väärtust `omr_****<last4>`.
4. Laske aktiveerimiskuval kataloog sünkroonida või valige **Sünkrooni kohe**. Veenduge, et lehel kuvatakse `live`, voo versioon ja toomise aeg. Autenditud kohalikuks diagnostikaks väljastab `GET /api/radar/status` nõusoleku/võtme olemasolu ning nelja vahemälu olekud, kuid ei tagasta võtit. Päringuga `POST /api/radar/sync-all` saab kataloogi, soovitused, pakkumised ja Inteli andmed selgesõnaliselt värskendada.
5. Avage `/dashboard/radar/setup?provider=<provider>`. Minge teenusepakkuja hallatavale identimisteabe URL-ile, valige **Lisa API-võti**, salvestage tegeliku teenusepakkuja vormi kaudu, naaske juhendisse ja käivitage **Testi ühendust**. Juhend kasutab tavapäraseid marsruute `/api/providers` ja `/api/providers/<connection-id>/test`; see ei loo eraldi Radari identimisteavet.
6. Kui vähemalt kaks ühilduvat teenusepakkuja ühendust on aktiivsed, avage `/dashboard/radar/combos`. Vaadake soovitatud perekond üle ja looge kombinatsioon olemasoleva kombinatsioonide API kaudu. Pakkumised ja Intel jäävad eraldiseisvateks, ainult reaalajas kasutatavateks allkirjastatud vahemäludeks ning neid saab kontrollida neile pühendatud Radari lehtedel.
7. Laadige `/dashboard/radar` ja seadistusleht uuesti. Nõusolek, maskitud võtme olek, verifitseeritud vahemälu, salvestatud teenusepakkuja ühendus ja testimistoiming peavad pärast uuesti laadimist säilima. Jäädvustage tõendid alles pärast seda, kui töötlemata võti ja teenusepakkuja identimisteave pole enam nähtavad.

Võtme salvestamine ei tõenda iseenesest reaalajas kasutamise õigust. Tõendiks on privaatteenuse päringu `GET /v1/license/check` tulemus, OSS-i kataloogi pakutav `live`-tasand, verifitseeritud allkirjastatud vahemälu ning tegelik teenusepakkuja ühenduse ja testimise voog. Kehtetu, aegunud või tühistatud võtme korral taandub kataloog turvaliselt tasemele `community`; seda ei tohi esitada reaalajas võtme eduka valideerimisena.

### Privaatse halduspaneeli link

`RADAR_ADMIN_URL` lisab soovi korral külgriba jaotisesse Costs kohe kasutajale suunatud Radari kirje järele kirje **Radar Admin ↗**. Sellel puudub teadlikult vaikeväärtus: kui muutuja on määramata või kehtetu, ei sisalda staatiline külgriba, käsupalett ega külgriba kohandamise kuva halduskirjet ega privaatset URL-i.

Väärtus lahendatakse serveri poolel ja edastatakse halduse jaoks autenditud `GET /api/settings` vastuse kaudu ainult autenditud töölauaseansile või kohaliku sisselogimiseta algkäivituse ajal usaldatud tagasisideahela omanikule. CLI, siseteenuse ja manage-ulatusega API-võtme autentimine seda ei saa. Brauser valideerib vastuse enne välise lingi kuvamist uuesti ning link avatakse atribuutidega `noopener noreferrer`.

Kasutage identimisteabeta HTTPS-tunneli või tailnet’i URL-i. Lihttekstiline HTTP on lubatud ainult tagasisideahela SSH-edastuse korral, näiteks `http://127.0.0.1:9351`; muud skeemid, manustatud identimisteave, vigased URL-id ja kaug-HTTP-sihtkohad blokeeritakse turvaliselt ning navigeerimine jääb passiivseks.

---

## Turvamudel

### Ed25519-allkiri täpsete baitide alusel

Voo laadung allkirjastatakse Ed25519 abil. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) kontrollib allkirja võrgust saadud **täpsete vastusebaitide**
alusel — laadungit ei serialiseerita enne kontrollimist kunagi uuesti, mistõttu ei saa
baithaaval ümberkodeerimine allkirjakontrolli märkamatult nurjata ega sellest mööda
hiilida. Kontrollimise nurjumine (`invalid_signature`) katkestab sünkroonimise enne
laadungi parsimist või vahemällu salvestamist.

### Kinnistatud avalik võti + võtme vahetamine

Kontrollimiseks kasutatav avalik võti on kinnistatud failis
`src/lib/radar/pinnedKeys.ts` (`PINNED_FEED_PUBLIC_KEYS`). See on massiiv, et uue
võtme saaks enne võtme vahetamist lisada esimeseks, samal ajal kui eelmise võtmega
allkirjastatud vanad vahemällu salvestatud vood jäävad kehtivaks kuni järgmise
sünkroonimiseni.

### Harusid toetavad keskkonnamuutujate alistused

Kaks keskkonnamuutujat võimaldavad harudel ja ise majutatud installidel suunata
kliendi OmniRoute'i vaiketeenuse asemel oma voole — vt allpool
[Omamajutatud voo seadistamine](#how-to-self-host-a-feed):

| Muutuja             | Otstarve                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Alistab voo baas-URL-i (vaikimisi `https://radar.omniroute.online`).                                             |
| `RADAR_FEED_PUBKEY` | Alistab kinnistatud avaliku võtme (base64-DER SPKI või PEM), asendades sisseehitatud massiivi selle ühe võtmega. |

### Versiooni alampiir

`syncRadar()` lükkab tagasi allalaaditud voo, mille `version` ei ole hetkel vahemällu
salvestatud versioonist rangelt uuem (`compareVersions()`, punktidega eraldatud
`YYYY.MM.DD.n` võrdlus) — `{ status: "stale" }`. See takistab ohustatud või valesti
seadistatud voo lõpp-punktil klienti vanemale, teistsuguse allkirjaga laadungile tagasi
viia.

### Kaks kuupäeva ja miks mõlemad säilitatakse

Vahemällu salvestatud vool on kaks eraldiseisvat kuupäeva ning nende segiajamise
vältimine ongi mõlema säilitamise eesmärk:

| Väli          | Päritolu                | Millele vastab                          |
| ------------- | ----------------------- | --------------------------------------- |
| `generatedAt` | allkirjastatud voo sisu | kui vanad **andmed** on                 |
| `fetchedAt`   | selle installi kell     | millal see install need **alla laadis** |

Mõni minut tagasi hangitud voog võib sisaldada nädalaid vanu näitajaid, mistõttu ei
saa `fetchedAt` üksi operaatorile öelda, kas ülekate on selle aluseks olevast
lähteandmestikust värskem. Mõlemad salvestatakse tabelisse `radar_feed_cache`,
tagastatakse `getRadarCatalog().meta` kaudu ning esitatakse eraldi päringuga
`GET /api/radar/status`. Enne veeru `generated_at` lisamist (migratsioon 163)
vahemällu salvestatud rea väärtuseks loetakse `null` — tundmatu jääb tundmatuks,
selle asemel et kasutada allalaadimise aega. `radar_referrals_cache` on säilitanud oma
`generated_at` väärtust alates migratsioonist 142.

Ülal kirjeldatud versiooni alampiir võrdleb välja `version`, mitte kumbagi kuupäeva.

Alles jääb kaks lünka, mõlemad teadlikud: juhtpaneel kuvab endiselt ainult välja
`Last fetched`, mistõttu vajab koostamiskuupäeva kuvamine seal uut silti (ja selle 41
lokaliseeritud vastet); pakkumiste ja luureandmete vahemälud ei säilita
koostamiskuupäeva üldse, kuigi nende vooskeemid sisaldavad seda — seetõttu jätab
`GET /api/radar/status` nende kahe puhul välja esitamata, selle asemel et tagastada
`null`, mida tõlgendataks kui „tundmatu“.

### Skeemi valideerimine

Allalaaditud baidid parsitakse ja valideeritakse `RadarFeedSchema` alusel
(`src/lib/radar/feedSchema.ts`, Zodi skeem) **pärast** allkirja kontrollimist. Skeemi
mittevastavuse korral tagastatakse `{ status: "invalid_schema" }` ja vahemälu jääb
puutumata. Vahemällu salvestatud laadung valideeritakse ennetavalt uuesti igal
lugemisel (`getRadarCatalog()`) — rikutud või käsitsi muudetud vahemälurida põhjustab
lähteandmestikule taandumise, mitte selle väljastamise.

### Vastuse mahupiirang (10 MB)

`syncRadar()` rakendab voo vastuse sisule **10 MB ranget piirangut** — allkirjastatud
voog on kilobaitides mõõdetav JSON-dokument, seega viitab sellest suurem maht valesti
seadistatud või pahatahtlikule `RADAR_FEED_URL`-ile (või rämpsu väljastavale
ülesvooluteenusele), mitte õiguspärasele kataloogile. Piirangut jõustatakse kahel
tasandil:

1. `Content-Length`-i eelkontroll jätab sisu täielikult lugemata, kui päis deklareerib
   juba piirangust suurema väärtuse.
2. Sisu lugemise ajal tehtav jooksva kogumahu kontroll jõustab piirangu isegi siis,
   kui `Content-Length` puudub või näitab tegelikust väiksemat mahtu — ainult päist
   ei usaldata kunagi. Kogutud osade ühendamine säilitab täpsed baidid, mida on
   seejärel vaja Ed25519-allkirja kontrollimiseks.

Piirangu ületamisel tagastatakse `{ status: "too_large" }` ja vahemälu jäetakse
puutumata, järgides sama mittepurustavat mustrit nagu kõigi teiste sünkroonimistõrgete
korral (`invalid_signature`, `invalid_schema`, `stale`).

---

## Tasemed: `community` ja `live`

Voo skeem sisaldab välja `tier: "community" | "live"`, mille määrab **serveripoolselt**
vooteenus päringu alusel (toetajavõtme olemasolu ja kehtivus) — klient ei määra kunagi
ise oma taset.

- **`community`** — tasuta kataloog, mis jääb värskeimatest andmetest ligikaudu 30 päeva
  maha. Selle saab autentimata või kehtetu võtmega päring.
- **`live`** — värskeim kataloog, mida pakutakse kehtivat toetajavõtit sisaldavatele
  päringutele.

**Kehtetu või aegunud toetajavõtme korral kasutatakse `community` taset — see ei ole
kunagi viga.** Sünkroonimistee eristab ainult signatuuri-, skeemi- ja versioonitõrkeid (kõik
taastatavad ning ükski neist ei ole puhverdatud olekule fataalne) edukast tulemusest `{ status:
"updated", version, tier }`. Kliendil ei ole vaja käsitleda tasemepõhist veateed.

### Pakutav tase pärineb vastuse päisest, mitte allkirjastatud kehast

Allkirjastatud voo **keha** väli `tier` on alati `"live"` — vooteenus väljastab
**iga versiooni kohta kaks allkirjastatud artefakti**: live sisaldab praeguseid kampaaniaid ja community
jätab need välja. Iga artefakt allkirjastatakse selle täpsete baitide põhjal. Keha ei ole endiselt
kasutusõiguse otsuse allikas; päringu jaoks tegelikult valitud tase edastatakse
**vastuse päises `x-omniroute-feed-tier`**, mille server määrab päringu
`Authorization` võtme põhjal.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) on ainus koht,
kus määratakse tase, mida klient peaks usaldama:

1. Sõelu `x-omniroute-feed-tier` skeemiga `RadarTierSchema` (Zod) — puuduvat päist või
   väärtust, mis ei ole täpselt `"community"` ega `"live"`, käsitletakse kui **puuduvat**
   (seda ei usaldata kunagi muutmata kujul puhvrisse ega kasutajaliidesesse; see hõlmab ka vanemaid
   vooservereid, mis on päisest varasemad).
2. Kasuta allkirjastatud keha välja `tier` (alati `"live"`) ainult siis, kui 1. samm
   ei anna tulemust.
3. Lahendatud tase puhverdatakse ja tagastatakse kujul `{ status: "updated",
version, tier }` — juhtpaneel kuvab just seda väärtust, mitte kunagi keha töötlemata
   välja.

---

## Lugemisaegse ülekihi liitmise reeglid

`applyFeed()` (`src/lib/radar/applyFeed.ts`) liidab puhverdatud voo **staatilise alusandmestiku
peale** **lugemise ajal** funktsioonis `getRadarCatalog()`. Alusandmestiku massiivi
(`FREE_MODEL_BUDGETS`) ei muudeta kunagi — igal väljakutsel arvutatakse värske
`MergedEntry[]`.

Neli reeglit tähtsuse järjekorras:

1. **Voog ei kirjuta kunagi kohalikku ülekirjutust üle.** Väljade kaupa: kui operaator on
   kirje välja kohandanud (`localOverrides` kaart, mille võti on `provider:modelId`),
   jäetakse voo vastava välja väärtus vahele — operaatori väärtus jääb peale.
2. **`enabled: false` keelab kirje ja säilitab päritolu.** Kirje välja lülitav
   vookirje määrab liidetud tulemuses `enabled: false` ja `disabledBy: "radar"`,
   et kasutajaliides saaks selgitada, _miks_ kirje muutus saadaval olevast keelatuks.
3. **Kasutaja lisatud kirje, mida voos ei ole, jääb puutumatult alles.** Kirjed, mis
   eksisteerivad ainult alusandmestikus (või lisati kohalikult) ja millele ei vasta ükski vookirje,
   edastatakse muutmata kujul.
4. **Hauakiviga tähistatud kirjet ei taastata kunagi.** Kui operaator kustutas kirje
   sõnaselgelt (`tombstones` kogum), ei too voo hilisemas versioonis uuesti lisatud
   `provider:modelId` seda tagasi.

Muudetavad väljad ja hauakivid talletatakse tabelis
`radar_local_model_state` (migratsioon `153_radar_local_model_state.sql`). Avalik andmebaasiadapter
(`src/lib/db/radar.ts`) teisendab need read `localOverrides` kaardiks ja
`tombstones` kogumiks, mida kasutab `applyFeed()`; tootmiskeskkonna `getRadarCatalog()` laadib selle oleku
pärast funktsioonilipu, puhvri ja skeemi kontrollide läbimist. Operaator saab muuta ainult välju `displayName` ja
`enabled`. Teenusepakkuja/mudeli identiteeti, voo päritolu, kvooti, võimekusi, kasutustingimusi
ega seadistusandmeid ei saa selle liidese kaudu muuta.

Juhtpaneel pakub nelja kohalikku toimingut:

- **Muuda** muudab kohalikku kuvatavat nime ja lubatud olekut.
- **Lähtesta kohalikud muudatused** tühjendab mõlemad muudetavad väljad hauakivi muutmata.
- **Peida** loob hauakivi, et hilisemad voovärskendused ei saaks rida uuesti luua.
- **Taasta** eemaldab hauakivi; eraldi salvestatud ülekirjutus jääb kehtima.

Voo `enabled: false` jääb ohutuserandiks: see on aegunud kohaliku
`enabled: true` suhtes ülimuslik, hoiab liidetud kirje keelatuna ja salvestab `disabledBy: "radar"`.

Kataloogi väljaanded kasutavad `schemaVersion: 2`. `contextWindow` ning väljad `tools`, `vision` ja
`thinking` on üksteisest sõltumatult `number | null` / `boolean | null`: `null` tähendab teadmata väärtust,
samas kui `false` tähendab, et D16-kinnitatud ametlik teenusepakkuja allikas ütleb sõnaselgelt, et võimekus puudub.
OmniRoute'i sisemise registri või mudelispetsifikatsiooni lippe ei muudeta kunagi otse voo faktideks. Klient
aktsepteerib endiselt v1 hetktõmmiseid; kuna vana koostaja kasutas puudumise kohatäitena väärtust `false`, normaliseeritakse
v1 `false` teadmata väärtuseks, samas kui v1 `true` jääb faktiks. Tundmatute skeemiversioonide korral tõrjutakse andmed
turvaliselt ja viimane kehtiv puhver jääb kättesaadavaks. Igal v2 mudelil, millel on nullist erinev konteksti- või
võimekuseväärtus, peab olema autentimisandmeid mittenõudev HTTPS-i `metadataEvidenceUrls[]`; vastasel juhul skeemi valideerimine
nurjub ja puhvrit ei asendata. Kataloogitabel kuvab kõiki kolme olekut kujul `✓`, `✕` ja `?`.

### Juhendatud kombinatsioonid ja MCP-juurdepääs

Kinnitatud `familyId` väärtused säilivad lugemisaegses ülekihis ja juhivad puhast
moodulit `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Mudeliperekonda soovitatakse
ainult siis, kui vähemalt kahel erineval teenusepakkujal on aktiivsed ühendused ja nad pakuvad täpselt kureeritud mudeli
ID-d. Keelatud mudelid, mitteaktiivsed teenusepakkujad, puuduvad mudeli ID-d, ühe liikmega perekonnad ja mitmetähenduslikud
aliase või prefiksi vasted tõrjutakse turvaliselt. Soovitused kasutavad olemasolevat `priority` strateegiat, järjestades
suurima korduva kuueelarve esimeseks; kasutajaliides loob need ainult päringu `POST /api/combos` kaudu.

Juhendatud kasutajaliides asub aadressil `/dashboard/radar/combos`. See loeb ainult kohalikke
lõpp-punkte `GET /api/radar/catalog` ja `GET /api/combos/builder/options`. See ei käivita kunagi Radari sünkroonimist,
ei loe teenusepakkuja identimisteavet ega kirjuta otse kombinatsioonide andmebaasi.

MCP kliendid saavad sama kohalikku projektsiooni lugeda tööriistaga `omniroute_radar_catalog` (`read:radar`). Valikulisi
filtreid `provider`, `familyId` ja `enabledOnly` rakendatakse pärast ühte kohalikku
`GET /api/radar/catalog` päringut. Selle piiratud väljund sisaldab kataloogi metaandmeid ning teenusepakkujat/mudelit,
kuvatavat nime, `familyId` väärtust, kvooti, võimekusi, lubatud olekut, päritolu ja `disabledBy` väärtust; seadistus-URL-e,
samme, ühendusi, e-posti aadresse, võtmeid ega soovitusandmeid ei tagastata kunagi. See tööriist on
kirjutuskaitstud ega kutsu kunagi välja `/api/radar/sync`.

### Päritolutähised

Iga ühendatud kirje sisaldab välja `origin`, mida kasutajaliides kuvab märgina:

- `"baseline"` — staatilise väljalaskekataloogiga võrreldes muutmata.
- `"radar"` — voog värskendas üht või mitut välja.
- `"local"` — operaator on sellele kirjele määranud vähemalt ühe kohaliku alistuse (kohalikud
  alistused on reegli 1 kohaselt alati voo suhtes ülimuslikud, olenemata sellest, mida voog ütleb).

---

## Kohalikud liidesed — ei ole kunagi voo puhverserver

Allolevad kohalikud Radari marsruudipered toetavad kasutajaliidest kataloogis `src/app/api/radar/`:

| Marsruut                       | Meetod | Otstarve                                                                                                                         |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Tagastab kohalikust vahemälust ühendatud kataloogi (`getRadarCatalog()`).                                                        |
| `/api/radar/sync`              | POST   | Käivitab serveri poolel `syncRadar()`; tagastab saadud oleku.                                                                    |
| `/api/radar/settings`          | GET    | Tagastab `{ optIn, hasSupporterKey, supporterKeyMasked }` — mitte kunagi töötlemata võtit.                                       |
| `/api/radar/settings`          | POST   | Määrab osalemise valiku ja/või (krüpteeritud) toetajavõtme.                                                                      |
| `/api/radar/referrals`         | GET    | Tagastab kohalikust vahemälust `{ fixed, campaigns, tier }` — vt allpool jaotist [Soovituslingid](#referral-links-free-credits). |
| `/api/radar/offers`            | GET    | Tagastab kontrollitud kohalikust reaalaja vahemälust aktiivsed pakkumised; toetajavõtit ei tagastata kunagi.                     |
| `/api/radar/offers/sync`       | POST   | Käivitab serveripoolse, ainult reaalajavõtit kasutava `syncRadarOffers()` konveieri.                                             |
| `/api/radar/intel`             | GET    | Tagastab kontrollitud kohaliku reaalaja Inteli koos toetaja tuvastamise tõeväärtusega; mitte kunagi identiteeti ega võtit.       |
| `/api/radar/intel/sync`        | POST   | Käivitab serveripoolse, ainult reaalajavõtit kasutava `syncRadarIntel()` konveieri.                                              |
| `/api/radar/status`            | GET    | Tagastab kataloogi, soovituste, pakkumiste ja Inteli kohalike sätete/vahemälu kirjutuskaitstud oleku ilma saladusteta.           |
| `/api/radar/sync-all`          | POST   | Käivitab kõik neli serveripoolset sünkroonimismoodulit ja tagastab iga voo kohta eraldi oleku.                                   |
| `/api/radar/local-model-state` | GET    | Loetleb redigeerimis- ja taastamisjuhtelementide jaoks püsivad alistused ja hauakivid.                                           |
| `/api/radar/local-model-state` | PATCH  | Määrab või eemaldab valideeritud `displayName`/`enabled` alistusväljad.                                                          |
| `/api/radar/local-model-state` | PUT    | Loob või eemaldab hauakivi väärtusega `{ provider, modelId, tombstoned }`.                                                       |
| `/api/radar/local-model-state` | DELETE | Eemaldab redigeeritavad alistusväljad, säilitades kõik hauakivid.                                                                |

**Range reegel: need marsruudid ei vahenda kunagi vooteenust puhverserverina.** Brauser suhtleb ainult
kohaliku OmniRoute'i serveriga. Neli Radari teenusega suhtlevat moodulit on
`src/lib/radar/sync.ts` (kataloog), `src/lib/radar/referralsSync.ts` (soovitused) ja
`src/lib/radar/offersSync.ts` (pakkumised) ning `src/lib/radar/intelSync.ts` (Intel); need kõik töötavad
serveri poolel, mitte kunagi kliendi poolel. See hoiab
voo URL-i ja kõik toetajavõtmed täielikult kliendile nähtavast võrguliiklusest eemal.

Kõik Radari lõpp-punktid tagastavad `404`, kui `RADAR_ENABLED` on välja lülitatud (vt
eespool jaotist [Lipp](#flag-radar_enabled-default-off), ning marsruudi veavastused läbivad
`buildErrorBody()`/`sanitizeErrorMessage()` vastavalt kogu hoidlat hõlmavale vigade sanitiseerimise reeglile
(`docs/security/ERROR_SANITIZATION.md`).

### Autentimine

Kõik Radari lõpp-punktid nõuavad autentimist funktsiooni `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) kaudu — juhtpaneeli seansiküpsise või haldusalasse piiratud
API-võtmega; sama kontroll kaitseb ülejäänud `/api/settings/*` marsruute. Väljalülitatud lipu
`404` kontroll käivitatakse alati **enne** autentimiskontrolli, nii et installatsioon, milles `RADAR_ENABLED`
on välja lülitatud, jääb bait-baidi haaval identseks (autentimisviipa ei kuvata pelgalt selleks, et teada saada, et liidest pole olemas);
kui lipp on sisse lülitatud, saab autentimata päring enne mis tahes andmebaasist lugemist või sinna
kirjutamist vastuseks `401`. `GET /api/radar/settings` ei tagasta autentimisolekust olenemata
kunagi töötlemata toetajavõtit — ainult selle maskitud kuju ja tõeväärtuse `hasSupporterKey`.

---

## Toetajate pakkumised

Pakkumised kasutavad oma allkirjastatud artefakti `GET /v1/offers/latest` ega jaga kunagi kataloogi või
soovituste vahemälu. Serveri lõpp-punkt nõuab kehtivat aktiivse toetaja Bearer-võtit; kogukonnavarianti
pole. Seetõttu peatub `syncRadarOffers()` enne võrgupäringut, kui funktsioonilipp on
välja lülitatud, operaator pole osalemiseks nõusolekut andnud või toetaja võtit pole seadistatud.

Pärast edukat GET-päringut kontrollib klient Ed25519-allkirja vastuse täpsete baitide põhjal,
valideerib `RadarOffersFeedSchema`, nõuab, et nii allkirjastatud keha kui ka
`x-omniroute-feed-tier` päis sisaldaksid väärtust `live`, jõustab rangelt uuema punktidega eraldatud versiooni ja alles seejärel
asendab atomaarselt `radar_offers_cache` vahemälu (migratsioon `144_radar_offers_cache.sql`). Kehtib sama 10 MB
päise ja voo kogumahupiirang, mida kasutavad teisedki vood. Allkirja-, skeemi-, taseme-, taasesitus-, mahu-, HTTP-
ja võrgutõrked säilitavad kõik viimase kontrollitud vahemälu.

Suletud pakkumisvorming toetab kolme võrreldavat hüvetüüpi: protsent baaspunktides, krediit
valuuta väikseimates ühikutes või proovipäevad. Partneripakkumine peab sisaldama sama tüüpi avalikku võrdlusalust ja
selle hüve peab olema rangelt suurem; ametlikel pakkumistel partneri võrdlusalust pole. URL-id peavad olema
autentimisandmeteta HTTPS-aadressid. `getRadarOffers()` valideerib kaitsemeetmena vahemällu salvestatud lasti uuesti ja filtreerib
aegunud kirjed iga kohaliku lugemise ajal; `/dashboard/radar/offers` filtreerib aegumise enne renderdamist uuesti,
kasutab võimaluse korral portugalikeelset teksti ja varuvariandina inglise keelt ning märgistab partneripakkumised selgelt.

Brauser kutsub ainult kohalikke marsruute: see loeb maskitud seadistuste hetktõmmist, palub marsruudil
`POST /api/radar/offers/sync` serveripoolel andmeid värskendada ja loeb seejärel marsruuti `GET /api/radar/offers`. Võtme puudumisel
kuvab see voopäringu proovimise asemel olemasolevad panustamise/toetamise lingid. Välised
pakkumislingid avanevad uuel vahelehel atribuutidega `noopener noreferrer`. Selles väljalaskes ei avaldata
MCP-tööriista `radar_offers`.

---

## Radar Intel, toetaja märk ja CLI

Intel on allkirjastatud artefakt asukohas `GET /v1/intel/latest`. Suletud `RadarIntelFeedSchema` aktsepteerib
ainult Radarile kuuluvaid ELO-järjestusi, mille privaatne kuraator on tuletanud kinnitatud võrdlustest, ja faktilisi
kataloogi vanuse/arvu erinevusi, mis on tuletatud allkirjastatud kataloogi hetktõmmistest. Metoodika fikseeritud
algreiting on 1000 ja K=32. Tühi järjestus on kehtiv, kui ühtegi võrdlust pole kinnitatud; klient
ei sünteesi seda kunagi ise.

`syncRadarIntel()` rakendab sama serveripoolset Bearer-autentimist, 30-sekundilist ajalõppu, 10 MiB voogedastuse mahupiirangut,
täpsete baitide Ed25519-kontrolli, ranget skeemi, keha/päise väärtuse `live` nõuet, versiooni alampiiri ja
viimase toimiva vahemälu säilitamist nagu pakkumiste puhul. Pärast kontrollitud aktiivse hetktõmmise püsimällu salvestamist tuletab klient
`radar:<sha256(supporter key)>`, salvestab ainult selle ühesuunalise identiteedi ja väljastab spetsiaalse
tunnustussündmuse `radar_supporter`. Selle märk `radar-supporter` on idempotentne ja annab null XP-d;
see ei uuenda kunagi edetabeleid ega taaskasuta `token_share` sündmust. `/dashboard/radar/intel` renderdab märgi
ainult kontrollitud kohaliku vahemälu metaandmete põhjal.

CLI pakub käske `omniroute radar status` ja `omniroute radar sync`. Mõlemad suhtlevad ainult
kohaliku OmniRoute API-ga. `status` teeb kirjutuskaitstud päringu `GET /api/radar/status`; `sync` saadab ühe
`POST /api/radar/sync-all` päringu ja väljastab iga voo kohta tulemuse. Kumbki käsk ei loe, aktsepteeri ega väljasta
toetaja võtit ning kumbki ei võta Radari teenusega otse ühendust.

---

## Soovituslingid (tasuta krediit)

Soovituslinke pakutakse **eraldiseisvast, alati ajakohasest** voost —
`GET /v1/referrals/latest` — kataloogivoost eraldi. See on taotluslik: kogukonnataseme
kataloogivoog on hetktõmmis, mis võib olla kuni 30 päeva vana, mistõttu jäi sellest
hangitud soovituslink serveri tegelikust linkide loendist sama palju maha
(hiljuti lisatud soovitus ei jõudnud tasuta/kogukonna kasutajani kuni kuu aega).
Soovitusvoog kõrvaldab selle viivituse, sünkroonides eraldi ja palju lühema intervalliga.

```ts
// GET /v1/referrals/latest vastuse sisu (Ed25519-allkirjastatud, sama kinnitatud võti mis
// kataloogivool):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministlik: max(updatedAt) kõigi soovituslinkide
                                  // lõikes, mistõttu kaks identset päringut annavad täpselt
                                  // samad allkirjastatud baidid/allkirja
  referrals: {
    fixed: RadarReferral[],      // olemas IGAL tasemel, sealhulgas autentimiseta/kogukonna tasemel
    campaigns: RadarReferral[],  // täidetakse ainult kehtiva aktiivse (toetaja) Bearer-võtme
                                  // korral; autentimiseta/aegunud võtmega päringud saavad []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Erinevalt kataloogivoost ei sisalda see vastus üldse välja `tier` — server otsustab
iga päringu puhul `Authorization`-võtme põhjal, mida kaasata, seega on vastuse päis
`x-omniroute-feed-tier` pakutava taseme AINUS allikas
(`referralsSync.ts::syncRadarReferrals`); puuduv või tundmatu päis taandatakse
väärtuseks `"community"`, mis on vähimate õigustega eeldus. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) valideerib kogu vastuse, taaskasutades sama
iga soovituse jaoks mõeldud skeemi `RadarReferralSchema`, mis eksporditakse failist
`feedSchema.ts`, et mõlemad vood valideeriksid üksikuid soovitusi identselt. Iga
`RadarReferral.url` peab algama `https://` — `http://` URL ei läbi skeemi valideerimist.

VANA kataloogi sisse põimitud väli `referrals` skeemis `RadarFeedSchema`
(`feedSchema.ts`) säilitatakse tagasiühilduvuse jaoks juba vahemällu salvestatud
kataloogivoogudega, kuid `getRadarReferrals()` seda enam ei loe — vt allpool jaotist
[Lugemisliides](#accessor).

### Sünkroonimine

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) on AINUS moodul, mis
soovituste jaoks võrku kasutab, järgides täpselt funktsiooni `syncRadar()` lepingut:
lipp väljas → `disabled`; nõusolek false → `opt_out`; laadib alla
`${RADAR_FEED_URL}/v1/referrals/latest` (samad `RADAR_FEED_URL`/`RADAR_FEED_PUBKEY`
haru alistused nagu kataloogil), kontrollib Ed25519-allkirja täpselt vastuse baitide
põhjal (`verifyFeedBytes`), valideerib skeemiga `RadarReferralsFeedSchema` ja salvestab
vahemällu tabelisse `radar_referrals_cache` (migratsioon
`142_radar_referrals_cache.sql`) — see tabel on kataloogi tabelist `radar_feed_cache`
täielikult eraldatud. Vastuse 10 MB piirang ja `generatedAt` alampiir lükkavad tagasi
sissetuleva voo, mis on vahemällu salvestatust vanem, kaitstes vanema allkirjastatud
artefakti taasesituse eest. Võrdne ajatempel aktsepteeritakse: server annab kogukonna-
ja aktiivsele soovitusvariandile tahtlikult sama deterministliku `generatedAt` väärtuse,
et allkirjastatud kasulik koormus ja pakutav tase saaksid pärast toetajavõtme muutmist
muutuda ilma aluseks oleva lingikomplekti muutumiseta. Ei viska kunagi erindit — tagastab
alati olekuobjekti; väljal `reason` olevad vead ei sisalda kunagi pinujälge.

Soovituste vahemälu hoiavad soojana kaks päästikut, mis mõlemad on kataloogi enda
24-tunnisest intervallist sõltumatud:

- **Sünkroonimine lugemisel** — `GET /api/radar/referrals` kutsub ise funktsiooni
  `syncRadarReferrals()` välja samas täitmisvoos alati, kui vahemälu puudub või on vanem
  kui `REFERRALS_STALE_MS` (1 h, `shouldSyncReferralsOnRead()`), enne vastuse väljastamist.
  Just see muudab fikseeritud lingid kohe järgmiseks juhtpaneeli laadimiseks „alati
  ajakohaseks”, ilma et peaks ootama taustataimerit.
- **Ajasti kõrval-sünkroonimine** — `radarSchedulerTick()` (`scheduler.ts`) hindab
  soovituste aegumist sõltumatult samal tunnipõhisel tikil, mida kasutatakse kataloogi
  jaoks, kutsudes vajaduse korral välja `syncRadarReferrals()`. See käivitub sõltumata
  sellest, kas kataloogi enda sünkroonimine oli sellel tikil vajalik, ega mõjuta kunagi
  `RadarTickResult` kuju (ainult parima pingutuse põhimõttel kõrvalmõju, mille vead
  neelatakse alla).

### Lugemisliides

`src/lib/radar/index.ts` ekspordib kaks kirjutuskaitstud lugemisfunktsiooni, millest
kumbki ei viska kunagi erindit (sama kaitsev leping mis funktsioonil
`getRadarCatalog()` — väljalülitatud lipp, puuduv vahemälu või rikutud vahemällu
salvestatud kasulik koormus annavad vea asemel alati tühja struktuuri):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  loeb tabelist `radar_referrals_cache` (funktsiooni `getRadarReferralsCache()` kaudu)
  ja valideerib skeemiga `RadarReferralsFeedSchema` — **mitte** kataloogi vahemälust.
- `getDefaultReferralFor(provider)` → selle pakkuja `fixed`-soovitus, millel on
  `isDefault: true`, või `null`. Vaatab ainult massiivi `fixed` — kampaaniat ei kasutata
  kunagi pakkuja „vaikelingina”.

Tegelik reegel, mis määrab, milline soovitus on pakkuja vaikeväärtus, asub funktsioonis
`findDefaultReferral()` (`src/lib/radar/referrals.ts`), mis on väike puhas funktsioon
**ilma DB impordita** — selle võib turvaliselt importida `"use client"` komponenti.
`getRadarReferrals`/`getDefaultReferralFor` (failis `index.ts`) impordivad
`@/lib/db/radar` ja jäävad seetõttu ainult serveris kasutatavaks; pakkujate juhtpaneel
impordib `index.ts` asemel otse faili `referrals.ts` (vt allpool), et vältida
`better-sqlite3` kaasamist brauseri paketti.

### `GET /api/radar/referrals`

Järgib täpselt sama kontrollide järjekorda nagu kõik teised Radari marsruudid: `RADAR_ENABLED` on välja lülitatud →
`404` (kontrollitakse esimesena, bait-baidi haaval identne inerts); autentimata kasutaja → `401`; muul juhul
käivitab aegunud andmete korral lugemisel sünkroonimise (vt eespool) ning tagastab seejärel `200` koos
`{ fixed, campaigns, tier }`-iga — `tier` pärineb otse (võimalik, et äsja värskendatud)
vahemälurealt ja on puhtalt informatiivne (juhib allpool olevat kasutajaliidese pehmet ülesmüügiteksti). Ei
vahenda kunagi vooserverit otse — marsruudi enda lähtekood ei sisalda ühtegi `fetch(`-kutset;
võrgupäring toimub alati ainult funktsioonis `syncRadarReferrals()`, järgides sama ainult kohaliku vahemälu
põhimõtet nagu `/api/radar/catalog`.

### Töölaua kasutajaliides — vahekaart „Tasuta krediidid“ lehel `/dashboard/radar`

Kasutab olemasolevat Radari lehte (`src/app/(dashboard)/dashboard/radar/page.tsx`) uue
marsruudi asemel teise vahekaardina — vähem marsruutimise/i18n-i pinda funktsiooni jaoks, mis on
variatsioon andmetest, mida leht juba hangib. Pärast liitumist pakub vahekaardiriba valikuid
**Kataloog** (olemasolev tabel) ja **Tasuta krediidid**:

- Püsilingid on rühmitatud teenusepakkuja järgi; igaühe juures kuvatakse `requiredAction` (kui see on olemas)
  ja `target="_blank" rel="noopener noreferrer"`-iga nupp soovituslingi URL-ile.
- Kampaaniate puhul kuvatakse sama ning lisaks `validUntil`, kui see on olemas.
- Kui `campaigns` on tühi **ja** pakutud tasand on `community`, kuvab kasutajaliides
  lühikese ülesmüügimärkuse („piiratud ajaga kampaaniad on toetajatele mõeldud lisa“) — see **ei**
  peida ega piira kunagi püsilinkide loendit, mis jääb igal tasandil täielikult täidetuks.
  Ülesmüük on ainult pehme sõnum, mitte kunagi tõke.

### Soovituslink teenusepakkuja nimel (teenusepakkujate töölaud)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
linkis teenusepakkuja nime juba väärtusele `providerInfo.website`, kui see oli olemas, ning sisaldas üht
varasemat rahaks tehtud lingi näidet: Kimi (Moonshot AI) partnerlingi märkus
(`providers.kimiPartnerLinkNote` i18n-võti). D28 kasutab Radari vaikimisi soovituslinkide jaoks täpselt
sama tagasihoidliku märkuse mustrit, selle asemel et võtta kasutusele uus võti.

Nõrk sidusus on taotluslik:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  on **puhas** funktsioon — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — millel puudub sõltuvus moodulitest `@/lib/radar` või `@/lib/db/*`. `providerPageUtils.ts` tervikuna
  jääb neist importidest vabaks (seda kontrollib
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (`"use client"`-komponent) on ainus koht, kus on lubatud
  Radari andmeid hankida — `fetch("/api/radar/referrals")` kaudu, kasutades sama kohaliku marsruudi
  mustrit nagu Radari töölaualeht ise — ning see arvutab vaikimisi soovituslingi kliendi poolel,
  kasutades DB-st sõltumatust failist `src/lib/radar/referrals.ts` pärinevat funktsiooni `findDefaultReferral()`.
- Kui `RADAR_ENABLED` on välja lülitatud, tagastab päring `404`, `referralUrl` jääb väärtusele `null` ja
  `resolveProviderHeaderLink()` tagastab staatilise kataloogi väärtuse `website` muutmata kujul —
  teenusepakkuja leht on bait-baidi haaval identne selle funktsiooni eelse versiooniga. Sama tulemus
  kehtib juhul, kui vahemälu veel puudub või selle konkreetse teenusepakkuja jaoks pole vaikimisi soovituslinki.
- Kui vaikimisi soovituslink rakendub, saab `ProviderPageHeader` väärtuse `isReferralLink`
  ja kuvab sama tagasihoidliku märkuse/kohtspikri nagu Kimi partnerlingi puhul (kasutades uuesti
  võtit `providers.kimiPartnerLinkNote`) — mitte kunagi uut, eraldiseisvat visuaalset lahendust.

---

## Kuidas voogu ise majutada

Harundus või isemajutaja, kes soovib kataloogi üle täielikku kontrolli, saab käitada oma vooteenust ilma kliendikoodi muutmata:

1. Paku `GET /v1/catalog/latest` lõpp-punkti, mis tagastab JSON-keha, mis vastab skeemile `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — tipptaseme väljad `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`, `quirks` ja `totals`. Arvesta päisega `x-omniroute-radar-schema: 2`; üleminekuühilduv server peaks ilma selleta tehtud päringute puhul vaikimisi tagastama eraldi allkirjastatud v1 artefakti.
2. Allkirjasta vastuse täpsed baidid Ed25519 võtmepaariga ja tagasta base64-vormingus allkiri vastuse päises `x-omniroute-feed-signature`.
3. Määra `RADAR_FEED_URL` väärtuseks uus baas-URL ja `RADAR_FEED_PUBKEY` väärtuseks vastav avalik võti (base64-DER SPKI või PEM) — vaata [keskkonnamuutujate viidet](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Luba `RADAR_ENABLED` ja anna nõusolek päringuga `POST /api/radar/settings`
   (`{ optIn: true }`).

Muid koodimuudatusi pole vaja — `verifyFeedBytes()` võtab ülekirjutuse automaatselt kasutusele (`getFeedPublicKeys()` failis `src/lib/radar/pinnedKeys.ts`) ning versioonide võrdlemine, skeemi valideerimine ja liitmisreeglid rakenduvad isemajutatud voole samamoodi.

Soovituslingid (vaata eespool jaotist [Soovituslingid (tasuta krediit)](#referral-links-free-credits)) on eraldiseisev valikuline artefakt: harundus, mis pakub ainult `/v1/catalog/latest`, töötab endiselt täielikult — `syncRadarReferrals()` taandub vastusele `{ status: "error" }`, kui `/v1/referrals/latest` tagastab `404`, ning vahemälu jääb lihtsalt tühjaks, mistõttu `GET /api/radar/referrals` jätkab vastuse `{ fixed: [], campaigns: [], tier: null }` tagastamist ega põhjusta ülejäänud lehe tõrget. Soovituslinkide pakkumiseks paku ka `GET /v1/referrals/latest`, mis vastab skeemile `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`), ning allkirjasta see sama Ed25519 võtmepaariga nagu kataloogivoog.

Toetajate pakkumised on veel üks valikuline artefakt. Nende pakkumiseks implementeeri `GET /v1/offers/latest` suletud skeemiga `RadarOffersFeedSchema` (`src/lib/radar/offersFeedSchema.ts`), nõua aktiivset õigust, tagasta `x-omniroute-feed-tier: live` ja allkirjasta täpsed baidid sama võtmega. Harunduse puhul, mis selle lõpp-punkti välja jätab, jääb kataloogi ja soovituslinkide käitumine muutumatuks; pakkumiste värskendamine nurjub olemasolevaid andmeid rikkumata ning viimane kontrollitud kohalik pakkumiste vahemälu jääb kättesaadavaks.

Intel on samal viisil valikuline. Isemajutaja saab pakkuda `GET /v1/intel/latest`, kasutades skeemi `RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), nõuda aktiivset õigust, tagastada `x-omniroute-feed-tier: live` ja allkirjastada täpsed baidid jagatud Ed25519 võtmega. Lõpp-punkti väljajätmisel jäävad kataloog, soovituslingid ja pakkumised muutumatuks; Inteli värskendamine säilitab viimase kontrollitud kohaliku hetktõmmise, kui see on olemas.

---

## Seotud dokumentatsioon

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — veavastuste muster, mida `/api/radar/*` marsruudid järgivad.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` viide.
