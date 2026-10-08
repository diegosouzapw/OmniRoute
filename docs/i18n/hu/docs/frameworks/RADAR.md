# Radar Free-Model Catalog (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Hiteles forrás:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Legutóbb frissítve:** 2026-09-01 — v3.8.51
> **A hosztolt szolgáltatás bizonyítékainak hatóköre:** az itt ismertetett szerveroldali szabályokat
> 2026-09-01 napján ellenőriztük a szándékosan privát Radar-szerveren, pontosan a
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed` revízión. Ez az implementáció nem része
> ennek a nyílt forráskódú adattárnak; a hosztolt elérhetőség továbbra is külön üzemeltetési állapot.

A Radar egy **opcionális kiegészítő**, amely egy aláírt, frissen összeállított ingyenesmodell-
katalógust rétegez a kiadási alapértékekre (`FREE_MODEL_BUDGETS` az
`open-sse/config/freeModelCatalog.data.ts` fájlban). Erre azért van szükség, mert az ingyenes
csomagok piaca gyorsabban változik a kiadási ütemnél — a szolgáltatók a kiadások között új
ingyenes kvótákat vezetnek be, csökkentik azokat, vagy megszüntetik őket, az alapkatalógus
pedig csak új verzió kiadásakor frissíthető.

**Semmi, ami ma ingyenes, nem válik fizetőssé a távoli adatfolyam miatt.** A Radar soha
nem helyez fizetőfal mögé egy alapbejegyzést; olvasáskor csak a korlát- és állapotmezőket
frissíti, valamint a kiadások között újonnan felfedezett ingyenes modellekkel egészítheti ki
a kínálatot. Az üzemeltető helyileg továbbra is elrejthet egy modellt, és ugyanazon az
irányítópulton vissza is állíthatja. Maga az alapkatalógus soha nem módosul a lemezen — lásd
alább az [Olvasáskori átfedés-összefésülés szabályai](#read-time-overlay-merge-rules) című részt.

---

## Kiadási állapot a v3.8.51 verzióban

Az alábbi állapotok megkülönböztetik, hogy ez a nyílt forráskódú kiadás mit valósít meg a
Radar későbbi munkafolyamataihoz képest. Ez kódszintű állapot, nem pedig ígéret arra, hogy
egy adott hosztolt telepítés vagy külső integráció jelenleg elérhető.

| Terület                              | Állapot ebben a kiadásban                                                                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aláírt katalóguskliens               | A `RADAR_ENABLED` kapcsoló mögött implementálva, külön feliratkozással, Ed25519-ellenőrzéssel, helyi titkosított beállításokkal/gyorsítótárral, tartós megjelenítési/engedélyezési felülbírálásokkal, visszafordítható törlésjelzőkkel, ütemezővel és irányítópulttal.                |
| Közreműködői aktiválás               | Az irányítópult a szerveren hosztolt GitHub-igénylési folyamathoz irányít, és elfogad egy meglévő `omr_…` kulcsot. A közreműködői jogosultságot a privát szolgáltatás állapítja meg; a nyílt forráskódú kliens nem tartalmaz GitHub-tokent vagy kulcskibocsátási logikát.             |
| Támogatói kulccsal történő aktiválás | Implementálva. A nyers kulcs ellenőrzésre kerül, nyugalmi állapotban titkosítva van, olvasáskor maszkolva jelenik meg, és csak szerveroldali szinkronizálás küldi el. A kulcs módosítása vagy törlése érvényteleníti mind a négy, jogosultságfüggő adatfolyam-gyorsítótárat.          |
| Ajánlói hivatkozások                 | Külön aláírt, óránként frissített adatfolyamként implementálva. A rögzített hivatkozások azonnal elérhetők a közösségi szint számára; a korlátozott kampányok továbbra is az élő szint adatai maradnak.                                                                               |
| Támogatói ajánlatok                  | Különálló, aláírt, kizárólag élő adatfolyamként és irányítópult-oldalként implementálva. A kliens újra ellenőrzi a zárt juttatási sémát, megőrzi az utolsó érvényes gyorsítótárat, kiszűri a lejárt bejegyzéseket, és egyértelműen megjelöli a partnerajánlatokat.                    |
| Információk és támogatói elismerés   | Szigorúan aláírt, kizárólag élő adatfolyamként implementálva, a Radar saját ELO-pontszámával, tényszerű katalógusfrissességi és trendadatokkal, ellenőrzött helyi támogatói jelvénnyel, irányítópult-oldallal, valamint kizárólag helyi CLI-állapot- és szinkronizálási parancsokkal. |
| Fizetések és tranzakciós e-mailek    | Nincs implementálva a nyílt forráskódú kliensben. A vásárlás, adományozás, bizonylat-ellenőrzés, helyreállítás és e-mail-kézbesítés a privát szolgáltatáshoz tartozik; a hosztolt elérhetőség továbbra is annak felügyelt telepítésétől és szolgáltatói konfigurációjától függ.       |
| Kutatási ügynök munkafolyamata       | Nem része ennek a klienskiadásnak. A gondozott adatfolyamok tartalma továbbra is szerveroldali adat; egyetlen OmniRoute-telepítésben sem fut autonóm kutatási ügynök.                                                                                                                 |

---

## Nyilvános közleményolvasó

Az általános közleményolvasó elkülönül a Radar funkciójelzőtől. Az irányítópult Kezdőlapja és
Változásnapló-megjelenítője egy egyszerű `GET` kéréssel tölti le a tároló nyilvános `news.json`
fájlját a `NEWS_JSON_URL` címről (`src/shared/utils/releaseNotes.ts`). Nem küldenek Radar-beállítást,
promptot, szolgáltatói konfigurációt, használati rekordot vagy helyi elutasítási állapotot.

A `news.json` a `parseNewsPayload()` által megvalósított zárt v2 sémát használja:

- `schemaVersion: 2` és egy korlátozott méretű `items[]` gyűjtemény;
- stabil, egyedi közlemény-`id` értékek;
- explicit `active` és ISO-formátumú `publishedAt` mezők;
- kötelező angol szöveg, opcionális lokalizált szövegekkel;
- opcionális, hitelesítő adatokat nem igénylő HTTPS-hivatkozások és egy engedélyezési listán szereplő ikon;
- a legújabb aktív elem előnyben részesítése, területi beállítás hiányában visszaállás angolra, valamint azonosítónkénti helyi elutasítás.

Az elemző átmenetileg elfogadja a korábbi, egyes számú `{ active, title, message, ... }` formátumot,
hogy a régebbi forkok hibás Változásnapló-nézet nélkül térhessenek át. Az érvénytelen hírfolyamok
inaktívak. A Radar indulási bejegyzése `active: false` értékkel érkezik; ennek `true` értékre
módosítása külön, az egyesítés és a telepítés utáni kiadási művelet, és nem módosítja sem a
`RADAR_ENABLED` értékét, sem a hírfolyam-szinkronizálás független engedélyezését.

---

## Jelző: `RADAR_ENABLED` (alapértelmezés szerint kikapcsolva)

A Radart teljes folyamatában a `RADAR_ENABLED` funkciójelző szabályozza
(`src/shared/constants/featureFlagDefinitions.ts`, kategória: `policies`,
`defaultValue: "false"`).

**Ha a jelző ki van kapcsolva, a felület nem létezik:**

- Minden `/api/radar/*` végpont, beleértve a helyi modellállapot olvasását és írását,
  `404` választ ad vissza, mielőtt bármely Radar-modult érintené.
- Az irányítópult képernyői (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`)
  a `notFound()` eredményét jelenítik meg.
- A `getRadarCatalog()` (`src/lib/radar/index.ts`) az érintetlen alapállapotot adja vissza —
  ugyanannyi bejegyzéssel, ugyanazokkal az értékekkel, minden bejegyzést
  `origin: "baseline"` címkével ellátva —, és soha nem olvassa a hírfolyam gyorsítótárát.
- Soha nem történik Radar-hálózati hívás; minden szinkronizálási modul
  `{ status: "disabled" }` értéket ad vissza a `fetch` meghívása előtt.

Ez egy szigorúan fölérendelt kapu: a jelző bekapcsolása csak a _képernyőket_ teszi
elérhetővé, semmi mást. Nem tölt fel adatokat, nem indít háttérbeli szinkronizálást,
és nem módosítja az útválasztást vagy a modellkiválasztást — lásd az alábbi külön
engedélyezési lehetőséget.

---

## Az adatszinkronizálás KÜLÖN engedélyezendő — adatvédelmi ígéretünk

A `RADAR_ENABLED` bekapcsolása csak a felhasználói felületet teszi elérhetővé. A hírfolyam
szinkronizálásához egy második, független engedélyezés szükséges, amelyet a
`radar_settings.opt_in` tárol (`src/lib/db/radar.ts`, migráció:
`136_radar_cache_settings.sql`). A `syncRadar()` minden hálózati hívás előtt ellenőrzi
a jelzőt _és_ az engedélyezési beállítást:

```
Jelző kikapcsolva    → { status: "disabled" }   — nincs hálózati hívás
Engedélyezés hamis   → { status: "opt_out" }    — nincs hálózati hívás
```

Ha mindkettő be van kapcsolva, a szinkronizálás menete a következő:

1. `GET <feed base URL>/v1/catalog/latest` az `x-omniroute-radar-schema: 2` fejléccel és egy
   opcionális `Authorization: Bearer <supporter key>` fejléccel (lásd alább). A kiszolgálók
   alapértelmezés szerint a külön aláírt v1 átmeneti összetevőt használják, ha a sémafejléc
   hiányzik, így a régebben telepített kliensek továbbra is kapnak frissítéseket.
2. Ez csak letöltésre szolgáló alkalmazásfolyamat, de ettől még HTTPS-kérés történik. Az
   üzemeltetett infrastruktúra megkapja a szokásos kapcsolati metaadatokat, például a forrás
   IP-címét. Ha támogatói kulcs van beállítva, a szinkronizálás ezt a kulcsot is elküldi a
   Bearer fejlécben, hogy a szolgáltatás meghatározhassa a jogosultságot. A bizonyítékok fent
   meghatározott határában azonosított pontos privátkiszolgáló-revíziónál a hírfolyamkérések
   elszámolása kulcskivonatokat, összesített használati adatokat és az IP-cím naponta változó,
   csonkolt HMAC-értékét használja a manuális visszaélés-ellenőrzéshez; ezek a táblák sem a
   kulcsot, sem az IP-címet nem őrzik meg nyers formában. Az infrastruktúra hozzáférési naplói
   és a titkosított kézbesítési kimenő tár különálló üzemeltetési határokat képeznek.
3. Az OmniRoute soha nem küld promptokat, válaszokat, beszélgetéseket, szolgáltatói hitelesítő
   adatokat, modellforgalmat, üzemidőt, késleltetést vagy helyi szolgáltatói konfigurációt a
   Radar szolgáltatásnak.
4. A válasz hitelesítése és ellenőrzése után az helyileg gyorsítótárazásra kerül (lásd:
   [Biztonsági modell](#security-model)). A Radarnak pontosan négy kiszolgálóoldali hálózati
   útvonala van: a katalógushoz tartozó `syncRadar()`, az ajánlásokhoz tartozó
   `syncRadarReferrals()`, valamint a kizárólag támogatóknak elérhető ajánlatokhoz és Intelhez
   tartozó `syncRadarOffers()` / `syncRadarIntel()`.

A **támogatói kulcs** egy opcionális Bearer token (`radar_settings.supporter_key`),
amely lehetővé teszi, hogy a hírfolyam-szolgáltatás eldöntse, melyik szintet szolgálja ki
(lásd: [Szintek](#tiers-community-and-live)). A kulcs:

- **Titkosítva van tárolva** ugyanazokkal az AES-256-GCM `encrypt()`/`decrypt()`
  segédfüggvényekkel (`src/lib/db/encryption.ts`), amelyeket a szolgáltatói hitelesítő
  adatokhoz is használunk.
- A `POST /api/radar/settings` végponton keresztül állítható be
  (`{ supporterKey: "omr_" + 40 hex chars }`), és **soha nem kerül visszaküldésre** —
  a válasz maszkolt formát ad vissza (`omr_****abcd`).
- Módosítása vagy törlése atomi módon érvényteleníti a katalógus, az ajánlások, az ajánlatok
  és az Intel gyorsítótárát. A következő szinkronizálás vagy olvasás kiszolgálóoldalon állapítja
  meg az új jogosultságot; a kulcs mentése önmagában nem indít hálózati kérést, és nem használ
  fel egyszer használatos aktiválási kulcsot.
- A rendszer Bearer tokenként küldi el a hírfolyam-szolgáltatásnak a szinkronizálási GET-kérésben
  — a kulccsal kapcsolatban semmilyen más adat nem hagyja el a klienst.

---

## A hozzáférési és biztonsági szabályok az engedélyezés előtt

Az inaktív irányítópult ezeket a szabályokat jeleníti meg a
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` fájlból **bármelyik** aktiválási művelet előtt.
A hivatalos hozzáférési szintek a következők:

| Szint                 | Jogosultság                                                                                                  | Hozzáférés                                            | Ismétlési/lejárati szabály                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Közösségi             | Bárki; kulcs nélkül                                                                                          | A teljes katalógus körülbelül 30 napos késleltetéssel | Mindig elérhető; nincs kiadás                                                         |
| Csillag + követés     | A GitHub OAuth ellenőrzi a csillagot a tárolón és a tulajdonos követését is                                  | Egy élő katalógusolvasás, majd Közösségi hozzáférés   | Bejelentkezésenként egy kiadás; soha nem adják ki újra                                |
| Közreműködő Top 10    | 1–10. helyezés a legutóbbi teljes heti rangsorban                                                            | 365 napos élő hozzáférés                              | Igény szerint igényelhető; a rangsorból való kiesés nem rövidíti a megítélt időszakot |
| Közreműködő Top 100   | 11–100. helyezés az adott rangsorban                                                                         | 90 napos élő hozzáférés                               | Ugyanaz az igény szerinti/idempotens igénylési szabály                                |
| Támogatói vásárlás    | Egyszeri, 6 hónapos, 1 éves vagy élethosszig tartó vásárlás                                                  | Élő katalógus, aláírt élő ajánlatok és Intel          | Nincs automatikus megújítás                                                           |
| Adomány/kézi juttatás | Tulajdonos által felülvizsgált adomány vagy meghatározott számú napra/élethosszig tartó tulajdonosi juttatás | Ugyanaz az élő jogosultság a megítélt időszakra       | Auditált, idempotens juttatás                                                         |

Az egyesített PR-ek, a véglegesítések és a módosított sorok **csak a rangsor bemeneti adatai**. A Top 100-on kívüli bejelentkezés
a PR-ek számától függetlenül nem kap közreműködői juttatást. A határozott időre szóló vásárlások, adományok, közreműködői időszakok és
kézi juttatások az aktuális lejárati időtől halmozódnak; az élethosszig tartó jogosultság elsőbbséget élvez. A rangsor változása soha nem
vonja vissza visszamenőlegesen, és nem rövidíti le a már megítélt időt.

A hosztolt licenc személyes, és a felhasználókra vonatkozó szabály szerint egyszerre egy aktív telepítés engedélyezett. Ez a
kiadás **nem** állítja, hogy hardverzárat alkalmaz: a nyílt forráskódú szinkronizálás nem készít hardver-ujjlenyomatot, és nem tart fenn
kriptográfiai eszközbérletet. A fent megadott, ellenőrzött privát szerververzióban a megvalósított kikényszerítés
jogosultság-ellenőrzésből, valamint egy kézi felülvizsgálati jelzésből áll, amely akkor keletkezik, ha ugyanazt az élő kulcsot 24 órán belül egy negyedik,
különálló IP-címről észlelik. Ez a jelzés soha nem blokkolja vagy vonja vissza automatikusan a kulcsot. A helyreállítás
visszavonja és lecseréli az elveszett kulcsot, miközben megőrzi a meglévő lejárati időt; nem indítja újra a
megvásárolt vagy megítélt időszakot.

Az élő ajánlatokat kézzel válogatják, és azok megváltozhatnak vagy lejárhatnak. Az engedélyezési képernyő a pontos
adatvédelmi határt is megnevezi: az aláírt katalógus- és ajánlási metaadatok letöltődnek; egy érvényes kulcs ezenfelül feloldja az
aláírt ajánlatokat és az Intel funkciót; a Bearer kulcs és a szokásos kapcsolati metaadatok eljutnak a hosztolt szolgáltatáshoz;
a promptok, válaszok, beszélgetések, szolgáltatói hitelesítő adatok, modellforgalom, rendelkezésre állási idő, késleltetés és a helyi
szolgáltatói konfiguráció nem.

---

## Támogatói kulcs beszerzése

Az aktiválási képernyő (`/dashboard/radar`) két folyamatra hivatkozik a támogatói kulcs **beszerzéséhez**. Maga az OSS-adattár soha nem bocsát ki ilyet, nem futtat fizetési kódot, és **soha nem tüntet fel árat** — az árképzésről teljes egészében a céloldalak döntenek, és az árak is kizárólag ott jelennek meg, nem ebben az adattárban (D14 specifikációs döntés).

- **„Közreműködő vagyok”** — megnyitja a `RADAR_CONTRIBUTOR_CLAIM_URL` címet (alapértelmezés:
  `https://radar.omniroute.online/auth/github`), amely a privát Radar-kiszolgálón üzemeltetett GitHub OAuth-igénylési folyamat. Ez ellenőrzi a legutóbbi teljes heti rangsort: az első 10 helyezett 365 napot,
  a 11–100. helyezettek pedig 90 napot kapnak. Az első 100 helyezetten kívül a PR-ek száma soha nem biztosít hozzáférést; a folyamat
  ehelyett a különálló, csillag + követés alapú, egyszer használható szintet ellenőrzi.
- **„A projekt támogatása”** — megnyitja a `RADAR_SUPPORTER_PLANS_URL` címet (alapértelmezés:
  `https://radar.omniroute.online/planos`), az egyszeri 6 hónapos, 1 éves és
  élethosszig tartó lehetőségek üzemeltetett oldalát. Az OSS-oldal továbbra sem jelenít meg pénzösszeget.

Mindkét URL feloldása kiszolgálóoldalon történik (`src/lib/radar/links.ts`, ugyanazzal a környezeti felülbírálási
mintával, mint a `RADAR_FEED_URL` esetében), majd a meglévő
`GET /api/radar/settings` válaszon (`contributorClaimUrl`, `supporterPlansUrl`) keresztül jutnak el az irányítópulthoz — az
ügyfélkomponens maga soha nem olvassa a `process.env` értékét.

| Változó                       | Rendeltetés                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Felülbírálja a közreműködői igénylés URL-jét (alapértelmezés: `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Felülbírálja a támogatói csomagok URL-jét (alapértelmezés: `https://radar.omniroute.online/planos`).         |

### Elveszett támogatói kulcs helyreállítása

Az üzemeltetett szolgáltatás helyreállítási belépési pontja a `https://radar.omniroute.online/recover`; erre
a csomagok oldaláról is mutat hivatkozás. A helyreállítás teljes egészében az OSS-kliensen kívül marad, mivel a helyi
telepítés soha nem kapja meg a vásárló/közreműködő e-mail-címét, és a titkosított beállításaiból nem tudja visszaállítani a nyers kulcsot.

1. Küldje be a kulcshoz társított e-mail-címet. A szolgáltatás ugyanazt az elfogadást jelző oldalt adja vissza attól függetlenül, hogy
   létezik-e helyreállítható licenc, így az űrlap nem teszi lehetővé a fiókok feltérképezését.
2. Jogosultság esetén a kézbesítési feldolgozó rövid élettartamú, egyszer használható hivatkozást küld. A megnyitásakor
   a token azonnal egy átmeneti, titkosított `HttpOnly`/`Secure` sütibe kerül, majd a rendszer átirányít a tiszta
   `/recover` URL-re; az oldal nem tartalmaz tokent, e-mail-címet, régi kulcsot vagy cserekulcsot.
3. Erősítse meg a visszavonást. A privát szolgáltatás visszavonja a korábbi kulcsot, létrehozza az azonos
   csomaggal/lejárattal rendelkező cserekulcsot, és egyetlen tranzakcióban e-mailes kézbesítésre váró sorba helyezi. A cserekulcs
   soha nem kerül vissza a böngészőhöz.
4. Illessze be a cserekulcsot a `/dashboard/radar` oldalon. A régi kulcsnak ekkor `community` szintre kell visszaesnie; a
   cserekulcsnak ellenőrzött `live` szinkronizálást kell eredményeznie. Ugyanazon helyreállítási hivatkozás ismételt megnyitásának
   általános érvénytelen/lejárt válasszal kell meghiúsulnia.

Az üzemeltetett helyreállítási útvonal és a levelezési feldolgozó jelen lehet a kódban úgy is, hogy egy adott
telepítésben még nem érhető el. Ne tekintse a folyamatot éles használatra késznek, amíg a kiszolgálót nem telepítették, a kézbesítési
szolgáltatót nem konfigurálták egy ellenőrzött címzettel, és a teljes, egyszer használható hivatkozást nem tesztelték.

Miután a látogatónak van kulcsa (`omr_` + 40 hexadecimális karakter), az aktiválási képernyő
(`src/app/(dashboard)/dashboard/radar/page.tsx`) elsődleges útvonalként egy kulcsbeillesztési mezőt kínál:
a kulcs beillesztése és az űrlap elküldése egyetlen hívásban küld `POST /api/radar/settings`
kérést (`{ optIn: true, supporterKey }`) — a kulcs beillesztése egyszerre állítja be a kulcsot és engedélyezi a részvételt,
feloldva a képernyőt. A formátumot (`omr_` + 40 hexadecimális karakter) először ügyféloldalon ellenőrzi
a megosztott `isValidSupporterKeyFormat()` segédfüggvény (`src/lib/radar/supporterKey.ts`),
kényelmi UX-funkcióként; a kiszolgáló Zod-sémája ettől függetlenül a mérvadó ellenőrzés. A kulcs
beállítása után az aktiválási képernyő üres beviteli mező helyett a maszkolt formát jeleníti meg (a
`GET /api/radar/settings` válasz `supporterKeyMasked` mezőjét), valamint egy „kulcs módosítása” vezérlőt,
amellyel új kulcs illeszthető be — a nyers kulcs soha nem jelenik meg újra. A fenti két igénylési/csomagválasztó gomb
továbbra is a kulcs kezdeti _beszerzésére_ szolgál; ebben a mezőben aktiválhatja azt az operátor,
aki már rendelkezik kulccsal.

### Teljes körű aktiválás és vezetett beállítás

A privát hírcsatorna-szolgáltatás és ez az OSS-kliens között szándékosan szűk a határ: a szolgáltatás
bocsátja ki és ellenőrzi a támogatói kulcsot, míg a helyi OmniRoute-telepítés titkosítja azt,
kiszolgálóoldalon szinkronizálja az aláírt összetevőket, és végigvezeti a szolgáltató beállításán. A támogatott ellenőrzés sorrendje:

1. Szerezzen be egy újonnan kiadott vagy helyreállított kulcsot a közreműködői igénylésből, a csomagválasztási/fizetési vagy helyreállítási
   folyamatból, illetve egy jogosult privát szerverüzemeltetőtől. Ne illessze be a nyers kulcsot naplókba,
   képernyőképekbe, hibajegy-megjegyzésekbe vagy parancssori argumentumokba.
2. Engedélyezze a `RADAR_ENABLED` funkciójelzőt a helyi OmniRoute-telepítésen. Ez elérhetővé teszi a felhasználói felületet,
   de az külön hozzájárulás mentéséig nem végez hálózati kommunikációt.
3. Nyissa meg a `/dashboard/radar` oldalt, illessze be a kulcsot, majd aktiválja. A böngésző egyetlen helyi
   `POST /api/radar/settings` kérést küld a következő tartalommal: `{ optIn: true, supporterKey }`; a kulcs titkosítása helyben történik, és
   a válasz csak az `omr_****<last4>` értéket tartalmazza.
4. Hagyja, hogy az aktiválási képernyő elvégezze a katalógus szinkronizálását, vagy válassza a **Szinkronizálás most** lehetőséget. Ellenőrizze, hogy az oldal
   `live` állapotot, hírcsatorna-verziót és lekérési időpontot jelez. Hitelesített helyi diagnosztikához a
   `GET /api/radar/status` jelzi a hozzájárulás és a kulcs meglétét, valamint a négy gyorsítótár állapotát anélkül, hogy visszaadná
   a kulcsot. A `POST /api/radar/sync-all` használatával külön frissíthető a katalógus, az ajánlások, az ajánlatok és az Intel.
5. Nyissa meg a `/dashboard/radar/setup?provider=<provider>` oldalt. Kövesse a szolgáltató által kezelt hitelesítőadat-URL-t,
   válassza az **API-kulcs hozzáadása** lehetőséget, mentse a valódi szolgáltatói űrlapon keresztül, térjen vissza az útmutatóhoz, majd futtassa a
   **Kapcsolat tesztelése** műveletet. Az útmutató a szokásos `/api/providers` és
   `/api/providers/<connection-id>/test` útvonalakat használja; nem hoz létre párhuzamos Radar-hitelesítőadatot.
6. Nyissa meg a `/dashboard/radar/combos` oldalt, miután legalább két kompatibilis szolgáltatói kapcsolat aktívvá vált.
   Tekintse át a javasolt családot, és hozza létre a kombinációt a meglévő kombinációs API-n keresztül. Az ajánlatok és
   az Intel továbbra is különálló, kizárólag `live` szintű, aláírt gyorsítótárak maradnak, amelyek a nekik fenntartott Radar-oldalakon ellenőrizhetők.
7. Töltse újra a `/dashboard/radar` és a beállítási oldalt. A hozzájárulásnak, a maszkolt kulcs állapotának, az ellenőrzött gyorsítótárnak, a mentett
   szolgáltatói kapcsolatnak és a tesztműveletnek az újratöltés után is meg kell maradnia. Csak azután rögzítsen bizonyítékot, hogy a
   nyers kulcs és a szolgáltatói hitelesítőadat már nem látható.

Egy kulcs mentése önmagában nem bizonyítja az élő jogosultságot. A bizonyítékot a privát
szolgáltatás `GET /v1/license/check` eredménye, az OSS-katalógus által kiszolgált `live` szint, egy ellenőrzött, aláírt
gyorsítótár, valamint a valódi szolgáltatói kapcsolati/tesztelési folyamat együttesen adja. Az érvénytelen, lejárt vagy visszavont kulcs esetén
a katalógus biztonságosan `community` szintre áll vissza; ezt nem szabad sikeres élőkulcs-ellenőrzésként jelenteni.

### Privát adminisztrációs panel hivatkozása

A `RADAR_ADMIN_URL` opcionálisan hozzáad egy **Radar Admin ↗** elemet közvetlenül a felhasználóknak szánt
Radar-elem után, az oldalsáv Költségek szakaszában. Szándékosan nincs alapértelmezett értéke: ha a változó
nincs beállítva vagy érvénytelen, a statikus oldalsáv, a parancspaletta és az oldalsáv testreszabási képernyője nem tartalmaz
adminisztrációs elemet vagy privát URL-t.

Az érték feloldása szerveroldalon történik, és a felügyeleti hitelesítést igénylő
`GET /api/settings` válasz kizárólag hitelesített irányítópult-munkamenetnek, illetve helyi, bejelentkezés nélküli rendszerindításkor a megbízható
loopback-tulajdonosnak továbbítja azt. A CLI, a belső szolgáltatások és a kezelési hatókörű API-kulcsos
hitelesítés nem kapja meg. A böngésző a külső hivatkozás létrehozása előtt ismét ellenőrzi a választ;
a hivatkozás `noopener noreferrer` beállítással nyílik meg.

Hitelesítőadat-mentes HTTPS-alagút- vagy tailnet-URL-t használjon. Az egyszerű HTTP csak loopback SSH-
továbbításnál fogadható el, például `http://127.0.0.1:9351` esetén; más sémák, beágyazott hitelesítőadatok, hibás URL-ek és
távoli HTTP-célhelyek esetén a rendszer biztonságosan letiltja a működést, és a navigáció inaktív marad.

---

## Biztonsági modell

### Ed25519-aláírás a pontos bájtok felett

A hírcsatorna hasznos terhelése Ed25519 használatával van aláírva. A `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) a vezetéken fogadott **pontos válaszbájtok** alapján ellenőrzi
az aláírást — a hasznos terhelés az ellenőrzés előtt soha nem kerül újbóli szerializálásra,
így a bájtról bájtra történő újrakódolás nem érvénytelenítheti vagy kerülheti meg észrevétlenül
az aláírás-ellenőrzést. Az ellenőrzés sikertelensége (`invalid_signature`) megszakítja a
szinkronizálást, mielőtt a hasznos terhelés elemzésre vagy gyorsítótárazásra kerülne.

### Rögzített nyilvános kulcs + kulcsrotáció

Az ellenőrzéshez használt nyilvános kulcs a `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`) fájlban van rögzítve egy tömbként, így rotáció előtt
egy új kulcs szúrható be az elejére, miközben a korábbi kulccsal aláírt régi,
gyorsítótárazott hírcsatornák az újraszinkronizálásig érvényesek maradnak.

### Forkbarát környezetiváltozó-felülbírálások

Két környezeti változó lehetővé teszi, hogy a forkok és a saját tárhelyen futtatott
példányok az alapértelmezett OmniRoute szolgáltatás helyett a saját hírcsatornájukra
irányítsák a klienst — lásd alább:
[Hírcsatorna futtatása saját tárhelyen](#how-to-self-host-a-feed)

| Változó             | Cél                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `RADAR_FEED_URL`    | Felülbírálja a hírcsatorna alap-URL-jét (alapértelmezett: `https://radar.omniroute.online`).                                   |
| `RADAR_FEED_PUBKEY` | Felülbírálja a rögzített nyilvános kulcsot (base64-DER SPKI vagy PEM), és a beépített tömböt erre az egyetlen kulcsra cseréli. |

### Minimális verzió

A `syncRadar()` elutasítja azt a letöltött hírcsatornát, amelynek `version` értéke nem
szigorúan újabb a jelenleg gyorsítótárazott verziónál (`compareVersions()`, pontokkal
tagolt `YYYY.MM.DD.n` összehasonlítás) — `{ status: "stale" }`. Ez megakadályozza,
hogy egy feltört vagy hibásan konfigurált hírcsatorna-végpont egy klienst egy régebbi,
másképp aláírt hasznos terhelésre állítson vissza.

### Két dátum és mindkettő megőrzésének oka

Egy gyorsítótárazott hírcsatorna két különböző dátumot tartalmaz, és éppen az
összekeverésük elkerülése indokolja mindkettő megőrzését:

| Mező          | Forrás                       | Megválaszolt kérdés                  |
| ------------- | ---------------------------- | ------------------------------------ |
| `generatedAt` | az aláírt hírcsatorna törzse | milyen régi maga az **adat**         |
| `fetchedAt`   | ezen telepítés órája         | mikor **töltötte le** ez a telepítés |

Egy percekkel ezelőtt letöltött hírcsatorna többhetes adatokat is tartalmazhat, ezért
a `fetchedAt` önmagában nem mutatja meg az üzemeltetőnek, hogy a ráépülő réteg frissebb-e
az alapul szolgáló adatoknál. Mindkettő megőrzésre kerül a `radar_feed_cache` táblában,
a `getRadarCatalog().meta` visszaadja őket, a `GET /api/radar/status` pedig külön-külön
jelenti őket. A `generated_at` oszlop létrejötte (163-as migráció) előtt gyorsítótárazott
sorok esetén az érték `null` — az ismeretlen ismeretlen marad, a rendszer nem helyettesíti
a letöltés idejével. A `radar_referrals_cache` a 142-es migráció óta őrzi a saját
`generated_at` értékét.

A fenti minimálisverzió-ellenőrzés a `version` értéket hasonlítja össze, nem a két dátum
valamelyikét.

Két hiányosság továbbra is fennáll, mindkettő szándékosan: az irányítópult továbbra is
csak a `Last fetched` értéket jeleníti meg, ezért a build dátumának megjelenítéséhez ott
egy új címkére (és annak 41 lokalizált változatára) van szükség; az ajánlat- és
információs gyorsítótárak pedig egyáltalán nem őrzik a build dátumát, noha a hírcsatorna-sémáik
tartalmaznak ilyet — a `GET /api/radar/status` ezért ennél a kettőnél kihagyja a mezőt,
ahelyett hogy olyan `null` értéket jelentene, amely „ismeretlenként” lenne értelmezhető.

### Sémaellenőrzés

A letöltött bájtok elemzése és a `RadarFeedSchema` sémával
(`src/lib/radar/feedSchema.ts`, egy Zod-séma) való ellenőrzése **az** aláírás
ellenőrzése után történik. A séma eltérése `{ status: "invalid_schema" }` eredményt ad
vissza, a gyorsítótár pedig érintetlen marad. A gyorsítótárazott hasznos terhelést a
rendszer minden olvasáskor (`getRadarCatalog()`) védekező jelleggel újra ellenőrzi —
egy sérült vagy kézzel szerkesztett gyorsítótársor kiszolgálása helyett az alapértelmezett
adatokra áll vissza.

### Válaszméretkorlát (10 MB)

A `syncRadar()` **10 MB-os abszolút korlátot** kényszerít ki a hírcsatorna válaszának
törzsére — az aláírt hírcsatorna egy KB nagyságrendű JSON-dokumentum, így az ezt
meghaladó méret nem legitim katalógusra, hanem hibásan konfigurált vagy rosszindulatú
`RADAR_FEED_URL` értékre (vagy értelmetlen adatokat kiszolgáló felsőbb rétegbeli
szolgáltatásra) utal. A kikényszerítés két rétegben történik:

1. Egy előzetes `Content-Length`-ellenőrzés teljesen kihagyja a törzs beolvasását,
   ha a fejléc már eleve a korlátot meghaladó értéket jelez.
2. A törzs beolvasása közben futó összegzés akkor is kikényszeríti a korlátot, ha a
   `Content-Length` hiányzik, vagy a valós méretnél kisebb értéket jelez — a rendszer
   soha nem hagyatkozik kizárólag a fejlécre. Az összegyűjtött darabok összefűzése
   megőrzi az Ed25519-aláírás ezt követő ellenőrzéséhez szükséges pontos bájtokat.

A korlát túllépése `{ status: "too_large" }` eredményt ad vissza, és érintetlenül hagyja
a gyorsítótárat, ugyanazt a roncsolásmentes mintát követve, mint minden más
szinkronizálási hiba (`invalid_signature`, `invalid_schema`, `stale`).

---

## Szintek: `community` és `live`

A feed sémája tartalmaz egy `tier: "community" | "live"` mezőt, amelynek értékét a feedszolgáltatás határozza meg **szerveroldalon**
a kérés alapján (a támogatói kulcs megléte és érvényessége szerint)
— a kliens soha nem határozza meg a saját szintjét.

- **`community`** — az ingyenes katalógus, amely körülbelül 30 nappal elmarad a legfrissebb
  adatoktól. Ezt kapja egy hitelesítés nélküli vagy érvénytelen kulccsal küldött kérés.
- **`live`** — a legfrissebb katalógus, amelyet az érvényes támogatói
  kulcsot tartalmazó kérések kapnak meg.

**Az érvénytelen vagy lejárt támogatói kulcs esetén a rendszer `community` szintre vált vissza — ez soha nem
hiba.** A szinkronizálási útvonal csak az aláírási/séma-/verzióhibákat (mind
helyreállítható, egyik sem végzetes a gyorsítótárazott állapotra nézve) különbözteti meg a sikeres `{ status:
"updated", version, tier }` eredménytől. Nincs szintfüggő hibaútvonal, amelyet a kliensnek
kezelnie kellene.

### A kiszolgált szintet egy válaszfejléc, nem pedig az aláírt törzs határozza meg

Az aláírt feed **törzsében** található `tier` mező értéke mindig `"live"` — a feedszolgáltatás
**verziónként két aláírt műterméket** biztosít: a live tartalmazza az aktuális kampányokat, a community
pedig kihagyja őket. Minden műtermék a saját pontos bájtjai alapján van aláírva. A törzs továbbra sem
jogosultsági döntésként szolgál; a kéréshez ténylegesen kiválasztott szintet az
**`x-omniroute-feed-tier` válaszfejléc** tartalmazza, amelyet a szerveroldal határoz meg a kérés
`Authorization` kulcsa alapján.

A `syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) az egyetlen hely,
amely meghatározza, hogy a kliens melyik szintet tekintheti megbízhatónak:

1. Az `x-omniroute-feed-tier` feldolgozása a `RadarTierSchema` (Zod) segítségével — a hiányzó fejlécet vagy
   a nem pontosan `"community"` vagy `"live"` értéket a rendszer úgy kezeli, mintha **nem lenne
   jelen** (soha nem kerül változtatás nélkül megbízható adatként a gyorsítótárba/felhasználói felületre; ez a fejléc
   bevezetése előtti régebbi feedszerverekre is vonatkozik).
2. Visszalépés az aláírt törzs `tier` mezőjére (amely mindig `"live"`) csak akkor, ha az 1. lépés
   nem adott eredményt.
3. A feloldott szint kerül a gyorsítótárba és tér vissza `{ status: "updated",
version, tier }` formában — az irányítópult ezt az értéket jeleníti meg, soha nem a nyers törzs
   mezőjét.

---

## Olvasáskori átfedéses egyesítés szabályai

Az `applyFeed()` (`src/lib/radar/applyFeed.ts`) **olvasáskor**, a `getRadarCatalog()` függvényen belül egyesíti a gyorsítótárazott feedet
a statikus alapállapotra **ráfedve**. Az alapállapot tömbje
(`FREE_MODEL_BUDGETS`) soha nem módosul — minden
híváskor frissen számított `MergedEntry[]` jön létre.

Négy szabály, elsőbbségi sorrendben:

1. **A feed soha nem ír felül helyi felülbírálást.** Mezőnként: ha az üzemeltető
   személyre szabott egy mezőt egy bejegyzésen (a `provider:modelId` szerint kulcsolt `localOverrides` leképezésben),
   akkor a feed adott mezőhöz tartozó értékét a rendszer kihagyja — az üzemeltető értéke érvényesül.
2. **Az `enabled: false` letiltja a bejegyzést, az eredet megjelölésével.** A bejegyzést kikapcsoló
   feedbejegyzés `enabled: false` és `disabledBy: "radar"` értéket állít be az egyesített eredményen,
   így a felhasználói felület meg tudja magyarázni, _miért_ vált egy bejegyzés elérhetőből letiltottá.
3. **A felhasználó által hozzáadott, a feedben nem szereplő bejegyzés változatlanul megmarad.** A kizárólag
   az alapállapotban létező (vagy helyileg hozzáadott), megfelelő feedbejegyzéssel nem rendelkező
   bejegyzések változatlanul továbbhaladnak.
4. **A törlésre megjelölt bejegyzés soha nem áll vissza.** Ha az üzemeltető kifejezetten törölt egy
   bejegyzést (a `tombstones` halmazban), akkor a feed egy későbbi verzióban ismét hozzáadott
   `provider:modelId` bejegyzése nem állítja azt vissza.

A szerkeszthető mezőket és a törlésjelöléseket a
`radar_local_model_state` tárolja (migráció: `153_radar_local_model_state.sql`). A nyilvános DB-adapter
(`src/lib/db/radar.ts`) ezeket a sorokat alakítja át az `applyFeed()` által használt `localOverrides` leképezéssé és
`tombstones` halmazzá; az éles `getRadarCatalog()` ezt az állapotot a funkciójelző-, gyorsítótár- és sémaellenőrzések
sikeres teljesülése után tölti be. Az üzemeltető csak a `displayName` és az `enabled` értékét
szerkesztheti. A szolgáltató/modell identitása, a feed eredete, a kvóta, a képességek, a szolgáltatási feltételek
és a beállítási adatok ezen a felületen keresztül nem írhatók.

Az irányítópult négy helyi műveletet kínál:

- Az **Edit** módosítja a helyi megjelenítési nevet és az engedélyezett állapotot.
- A **Reset local changes** mindkét szerkeszthető mezőt törli a törlésjelölés módosítása nélkül.
- A **Hide** törlésjelölést hoz létre, így a későbbi feedfrissítések nem hozhatják újra létre a sort.
- A **Restore** eltávolítja a törlésjelölést; az ettől függetlenül mentett felülbírálások továbbra is érvényben maradnak.

A feed `enabled: false` értéke továbbra is biztonsági kivétel: elsőbbséget élvez az elavult helyi
`enabled: true` értékkel szemben, letiltva tartja az egyesített bejegyzést, és rögzíti a `disabledBy: "radar"` értéket.

A katalóguskiadványok `schemaVersion: 2` értéket használnak. A `contextWindow`, valamint a `tools`, a `vision` és a
`thinking` mind egymástól függetlenül `number | null` / `boolean | null`: a `null` azt jelenti, hogy ismeretlen, míg a
`false` azt jelenti, hogy egy D16 által megerősített hivatalos szolgáltatói forrás kifejezetten azt állítja, hogy a képesség nem érhető el.
Az OmniRoute belső beállításjegyzék-/modellspecifikációs jelzői soha nem minősülnek közvetlenül feedtényeknek. A kliens
továbbra is elfogadja a v1 pillanatképeket; mivel a régi összeállító a `false` értéket a hiány helyőrzőjeként használta, a v1 `false`
ismeretlenre normalizálódik, míg a v1 `true` tényszerű marad. Az ismeretlen sémaverziók biztonságosan meghiúsulnak, és az
utolsó érvényes gyorsítótár továbbra is elérhető marad. Minden olyan v2 modellnek, amely nem null értékű kontextussal/képességgel rendelkezik,
hitelesítő adatok nélkül elérhető HTTPS `metadataEvidenceUrls[]` értékeket kell tartalmaznia; ellenkező esetben a sémaellenőrzés meghiúsul, és a
gyorsítótár nem cserélődik le. A katalógustáblázat mindhárom állapotot `✓`, `✕` és `?` formában jeleníti meg.

### Irányított kombinációk és MCP-hozzáférés

A megerősített `familyId` értékek megmaradnak az olvasáskori átfedés után, és ezek vezérlik a tiszta
`buildRadarComboSuggestions()` modult (`src/lib/radar/comboSuggestions.ts`). A rendszer csak akkor javasol egy családot,
ha legalább két különböző szolgáltató rendelkezik aktív kapcsolattal, és elérhetővé teszi a pontosan megadott, válogatott modellazonosítót.
A letiltott modellek, az inaktív szolgáltatók, a hiányzó modellazonosítók, az egyetlen elemből álló családok és a nem egyértelmű
álnév-/előtag-egyezések biztonságosan meghiúsulnak. A javaslatok a meglévő `priority` stratégiát használják, a
legnagyobb ismétlődő havi keretet sorolva előre; a felhasználói felület kizárólag a `POST /api/combos` útvonalon keresztül hozza létre őket.

Az irányított felhasználói felület a `/dashboard/radar/combos` útvonalon érhető el. Kizárólag a helyi
`GET /api/radar/catalog` és `GET /api/combos/builder/options` végpontokból olvas. Soha nem indít Radar-szinkronizálást,
nem olvassa a szolgáltatói hitelesítő adatokat, és nem ír közvetlenül a kombinációs adatbázisba.

Az MCP-kliensek ugyanezt a helyi leképezést olvashatják az `omniroute_radar_catalog` (`read:radar`) használatával. Az
opcionális `provider`, `familyId` és `enabledOnly` szűrők kiértékelése egyetlen helyi
`GET /api/radar/catalog` olvasás után történik. Korlátozott kimenete tartalmazza a katalógus metaadatait, valamint a szolgáltatót/modellt,
a megjelenítési nevet, a `familyId` értékét, a kvótát, a képességeket, az engedélyezési állapotot, az eredetet és a `disabledBy` értékét; a beállítási URL-ek,
lépések, kapcsolatok, e-mail-címek, kulcsok és ajánlási adatok soha nem kerülnek visszaadásra. Ez az eszköz
csak olvasási műveleteket végez, és soha nem hívja meg az `/api/radar/sync` végpontot.

### Eredetjelölők

Minden egyesített bejegyzés rendelkezik egy `origin` mezővel, amelyet a felhasználói felület jelvényként jelenít meg:

- `"baseline"` — változatlanul a statikus kiadási katalógusból származik.
- `"radar"` — egy vagy több mezőt frissített az adatfolyam.
- `"local"` — az üzemeltető legalább egy helyi felülbírálást adott meg ehhez a bejegyzéshez (az 1. szabály szerint a helyi
  felülbírálások mindig elsőbbséget élveznek az adatfolyammal szemben, függetlenül attól, hogy mit tartalmaz az adatfolyam).

---

## Helyi felületek — soha nem feedproxy

Az alábbi helyi Radar-útvonalcsaládok szolgálják ki a `src/app/api/radar/` alatti felhasználói felületet:

| Útvonal                        | Metódus | Cél                                                                                                                                              |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/radar/catalog`           | GET     | Visszaadja az egyesített katalógust (`getRadarCatalog()`) a helyi gyorsítótárból.                                                                |
| `/api/radar/sync`              | POST    | Szerveroldalon elindítja a `syncRadar()` műveletet; visszaadja az eredményül kapott állapotot.                                                   |
| `/api/radar/settings`          | GET     | Visszaadja a következőt: `{ optIn, hasSupporterKey, supporterKeyMasked }` — a nyers kulcsot soha.                                                |
| `/api/radar/settings`          | POST    | Beállítja a részvételi hozzájárulást és/vagy a (titkosított) támogatói kulcsot.                                                                  |
| `/api/radar/referrals`         | GET     | Visszaadja a következőt a helyi gyorsítótárból: `{ fixed, campaigns, tier }` — lásd alább: [Ajánlói hivatkozások](#referral-links-free-credits). |
| `/api/radar/offers`            | GET     | Visszaadja az aktív ajánlatokat az ellenőrzött helyi élő gyorsítótárból; a támogatói kulcsot soha nem adja vissza.                               |
| `/api/radar/offers/sync`       | POST    | Elindítja a szerveroldali, kizárólag élő kulcsot használó `syncRadarOffers()` folyamatot.                                                        |
| `/api/radar/intel`             | GET     | Visszaadja az ellenőrzött helyi élő Intel-adatokat és egy támogatói felismerést jelző logikai értéket; identitást vagy kulcsot soha.             |
| `/api/radar/intel/sync`        | POST    | Elindítja a szerveroldali, kizárólag élő kulcsot használó `syncRadarIntel()` folyamatot.                                                         |
| `/api/radar/status`            | GET     | Visszaadja a katalógus, az ajánlások, az ajánlatok és az Intel csak olvasható helyi beállítási/gyorsítótár-állapotát, titkok nélkül.             |
| `/api/radar/sync-all`          | POST    | Futtatja mind a négy szerveroldali szinkronizálási modult, és minden feedhez külön állapotot ad vissza.                                          |
| `/api/radar/local-model-state` | GET     | Felsorolja a szerkesztési/visszaállítási vezérlőkhöz tartósan tárolt felülírásokat és tombstone-okat.                                            |
| `/api/radar/local-model-state` | PATCH   | Beállítja vagy törli az ellenőrzött `displayName`/`enabled` felülírási mezőket.                                                                  |
| `/api/radar/local-model-state` | PUT     | Létrehoz vagy eltávolít egy tombstone-t a következővel: `{ provider, modelId, tombstoned }`.                                                     |
| `/api/radar/local-model-state` | DELETE  | Törli a szerkeszthető felülírási mezőket, miközben megőrzi az esetleges tombstone-t.                                                             |

**Szigorú szabály: ezek az útvonalak soha nem proxyzzák a feedszolgáltatást.** A böngésző kizárólag
a helyi OmniRoute-szerverrel kommunikál. A Radar-szolgáltatással kapcsolatba lépő négy modul:
`src/lib/radar/sync.ts` (katalógus), `src/lib/radar/referralsSync.ts` (ajánlások),
`src/lib/radar/offersSync.ts` (ajánlatok), valamint `src/lib/radar/intelSync.ts` (Intel);
mindegyik szerveroldalon fut, soha nem kliensoldalon. Ez teljes mértékben távol tartja
a feed URL-jét és minden támogatói kulcsot az ügyfél felé irányuló hálózati forgalomtól.

Minden Radar-végpont `404` választ ad, amikor a `RADAR_ENABLED` ki van kapcsolva (lásd fent:
[Jelző](#flag-radar_enabled-default-off)), a végpontok hibaválaszai pedig a teljes repóra
érvényes hibatisztítási szabálynak megfelelően a `buildErrorBody()`/`sanitizeErrorMessage()`
függvényeken haladnak keresztül (`docs/security/ERROR_SANITIZATION.md`).

### Hitelesítés

Minden Radar-végpont hitelesítést igényel az `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) használatával — egy irányítópulti munkamenetsütit vagy egy
felügyeleti hatókörű API-kulcsot; ugyanazt az ellenőrzési kaput, amely a `/api/settings/*`
többi részét is védi. A kikapcsolt jelzőhöz tartozó `404` ellenőrzés mindig **a**
hitelesítési ellenőrzés **előtt** fut, így egy kikapcsolt `RADAR_ENABLED` beállítású
telepítés bájtról bájtra azonos marad (nem jelenik meg hitelesítési kérés pusztán annak
kiderítéséhez, hogy a felület nem létezik); a jelző bekapcsolása után egy nem hitelesített
kérés `401` választ kap még bármilyen adatbázis-olvasás vagy -írás előtt. A
`GET /api/radar/settings` a hitelesítési állapottól függetlenül soha nem adja vissza a
nyers támogatói kulcsot — csak a maszkolt formát és egy `hasSupporterKey` logikai értéket.

---

## Támogatói ajánlatok

Az ajánlatok saját aláírt artefaktumot használnak, `GET /v1/offers/latest`, és soha nem osztoznak a katalógus- vagy az ajánlási gyorsítótáron. A szerveroldali végpont érvényes, aktív támogatói Bearer-kulcsot igényel; nincs közösségi tartalékmegoldás. A `syncRadarOffers()` ezért még a hálózati kérés előtt leáll, ha a funkciójelző ki van kapcsolva, az üzemeltető nem engedélyezte a funkciót, vagy nincs beállítva támogatói kulcs.

Egy sikeres GET után a kliens ellenőrzi az Ed25519-aláírást a válasz pontos bájtjain, validálja a `RadarOffersFeedSchema` sémát, megköveteli, hogy mind az aláírt törzs, mind az `x-omniroute-feed-tier` fejléc `live` értéket tartalmazzon, kikényszerít egy szigorúan újabb, pontokkal tagolt verziót, és csak ezután cseréli le atomi módon a `radar_offers_cache` tartalmát (`144_radar_offers_cache.sql` migráció). A többi hírfolyamnál alkalmazott, a fejlécre és az adatfolyamra együttesen vonatkozó 10 MB-os korlát itt is érvényes. Aláírási, séma-, szint-, visszajátszási, méret-, HTTP- és hálózati hibák esetén egyaránt megmarad az utoljára ellenőrzött gyorsítótár.

A zárt ajánlatformátum három összehasonlítható előnytípust támogat: százalék bázispontokban, jóváírás a pénznem kisebb egységeiben, illetve próbaidő napokban. A partneri ajánlatnak tartalmaznia kell egy azonos típusú nyilvános viszonyítási alapot, és az előnyének szigorúan nagyobbnak kell lennie; a hivatalos ajánlatokhoz nem tartozik partneri viszonyítási alap. Az URL-eknek hitelesítési adatoktól mentes HTTPS-címeknek kell lenniük. A `getRadarOffers()` minden helyi olvasáskor védekező módon újraellenőrzi a gyorsítótárazott hasznos adatot, és kiszűri a lejárt bejegyzéseket; a `/dashboard/radar/offers` a megjelenítés előtt ismét kiszűri a lejárt elemeket, portugál szöveget használ, ha elérhető, egyébként angolra vált vissza, és kifejezetten megjelöli a partneri ajánlatokat.

A böngésző kizárólag helyi útvonalakat hív meg: beolvassa a maszkolt beállítási pillanatképet, a `POST /api/radar/offers/sync` segítségével kiszolgálóoldali frissítést kér, majd beolvassa a `GET /api/radar/offers` eredményét. Kulcs hiányában a hírfolyam lekérésének megkísérlése helyett a meglévő közreműködői/támogatási hivatkozásokat jeleníti meg. A külső ajánlati hivatkozások új lapon, `noopener noreferrer` beállítással nyílnak meg. Ebben a kiadásban nincs elérhető `radar_offers` MCP-eszköz.

---

## Radar Intel, támogatói jelvény és CLI

Az Intel egy aláírt artefaktum a `GET /v1/intel/latest` végponton. A zárt `RadarIntelFeedSchema` kizárólag a Radar tulajdonában lévő, a privát kurátor által megerősített összehasonlításokból származtatott ELO-rangsorokat, valamint az aláírt katalógus-pillanatképekből származtatott, tényszerű katalóguskor- és elemszámkülönbségeket fogadja el. A módszertan rögzített: a kezdeti értékelés 1000, a K értéke pedig 32. Az üres rangsor érvényes, ha egyetlen összehasonlítást sem erősítettek meg; a kliens soha nem állít elő mesterséges rangsort.

A `syncRadarIntel()` ugyanazokat a kiszolgálóoldali Bearer-hitelesítési, 30 másodperces időkorlát-, 10 MiB-os adatfolyam-korlát-, pontos bájtokon végzett Ed25519-ellenőrzési, szigorú séma-, `live` törzs-/fejléc-követelmény-, verzióminimum- és utolsó érvényes gyorsítótár-megőrzési szabályokat alkalmazza, mint az ajánlatok. Egy ellenőrzött aktív pillanatkép tartós mentése után a kliens előállítja a `radar:<sha256(supporter key)>` értéket, kizárólag ezt az egyirányú identitást tárolja, és kibocsátja a dedikált `radar_supporter` elismerési eseményt. A hozzá tartozó `radar-supporter` jelvény idempotens, és nulla XP-t ad; soha nem frissíti a ranglistákat, és nem használja újra a `token_share` értéket. A `/dashboard/radar/intel` kizárólag ellenőrzött helyi gyorsítótár-metaadatok alapján jeleníti meg a jelvényt.

A CLI elérhetővé teszi az `omniroute radar status` és az `omniroute radar sync` parancsot. Mindkettő kizárólag a helyi OmniRoute API-val kommunikál. A `status` csak olvasási célú `GET /api/radar/status` kérést hajt végre; a `sync` egyetlen `POST /api/radar/sync-all` kérést küld, és hírfolyamonként kinyomtatja az eredményt. Egyik parancs sem olvassa be, fogadja el vagy nyomtatja ki a támogatói kulcsot, és egyik sem lép közvetlenül kapcsolatba a Radar szolgáltatással.

---

## Ajánlói hivatkozások (ingyenes kreditek)

Az ajánlói hivatkozásokat egy **önálló, mindig naprakész** hírcsatorna szolgálja ki —
`GET /v1/referrals/latest` —, amely elkülönül a katalógus hírcsatornájától. Ez szándékos: a
közösségi csomag katalógus-hírcsatornája egy pillanatkép, amely akár 30 napos is lehet, ezért az
abból kinyert ajánlói hivatkozás korábban ugyanennyivel maradt el a szerver tényleges
hivatkozáslistájától (egy újonnan hozzáadott ajánlás akár egy hónapig sem jutott el egy
ingyenes/közösségi felhasználóhoz). Az ajánlói hírcsatorna ezt a késleltetést saját, jóval
rövidebb ütemezésű szinkronizálással szünteti meg.

```ts
// A GET /v1/referrals/latest válasz törzse (Ed25519-aláírással, ugyanazzal a rögzített
// kulccsal, mint a katalógus hírcsatornája):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — determinisztikus: az ajánlói hivatkozások
                                  // updatedAt értékei közül a legnagyobb, így két azonos
                                  // kérés pontosan ugyanazokat az aláírt bájtokat/aláírást adja
  referrals: {
    fixed: RadarReferral[],      // MINDEN csomagban jelen van, hitelesítés nélkül/közösségi csomagban is
    campaigns: RadarReferral[],  // csak érvényes, aktív (támogatói) Bearer-kulcs esetén
                                  // van feltöltve; hitelesítés nélkül/lejárt kulccsal a válasz []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

A katalógus hírcsatornájától eltérően ez a törzs egyáltalán nem tartalmaz `tier` mezőt — a szerver
kérésenként, az `Authorization` kulcs alapján dönti el, mit foglaljon bele, ezért az
`x-omniroute-feed-tier` válaszfejléc a kiszolgált csomag EGYETLEN forrása
(`referralsSync.ts::syncRadarReferrals`); a hiányzó vagy ismeretlen fejléc
`"community"` értékre, vagyis a legkevesebb jogosultságot feltételező szintre korlátozódik.
A `RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) a teljes törzset
ellenőrzi, és újra felhasználja a `feedSchema.ts` által exportált, ajánlásonkénti
`RadarReferralSchema` sémát, így mindkét hírcsatorna azonos módon ellenőrzi az egyes
ajánlásokat. Minden `RadarReferral.url` értéknek `https://` kezdetűnek kell lennie — egy
`http://` URL meghiúsítja a sémaellenőrzést.

A `RadarFeedSchema` (`feedSchema.ts`) RÉGI, katalógusba ágyazott `referrals` mezője
megmarad a már gyorsítótárazott katalógus-hírcsatornákkal való visszamenőleges kompatibilitás
érdekében, de a `getRadarReferrals()` már nem olvassa ezt — lásd alább:
[Hozzáférési függvény](#accessor).

### Szinkronizálás

A `syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) az EGYETLEN modul, amely
hálózati hozzáférést végez az ajánlásokhoz, pontosan tükrözve a `syncRadar()` szerződését:
kikapcsolt jelző → `disabled`; letiltott részvétel → `opt_out`; letölti a
`${RADAR_FEED_URL}/v1/referrals/latest` erőforrást (ugyanazokkal a
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` elágazás-felülbírálásokkal, mint a katalógus),
ellenőrzi a pontos válaszbájtok Ed25519-aláírását (`verifyFeedBytes`), validálja a
`RadarReferralsFeedSchema` alapján, majd gyorsítótárazza a `radar_referrals_cache` táblába
(`142_radar_referrals_cache.sql` migráció) — ez a tábla teljesen elkülönül a katalógus
`radar_feed_cache` táblájától. A 10 MB-os válaszkorlát és a `generatedAt` alsó korlátja
elutasítja a gyorsítótárazott változatnál régebbi beérkező hírcsatornát, védelmet nyújtva
egy régebbi aláírt összetevő visszajátszása ellen. Az azonos időbélyeg elfogadott: a szerver
szándékosan ugyanazt a determinisztikus `generatedAt` értéket adja a közösségi és az aktív
ajánlói változatnak, így az aláírt hasznos adat és a kiszolgált csomag egy támogatói kulcs
módosítása után akkor is megváltozhat, ha a mögöttes hivatkozáskészlet nem változik.
Soha nem dob kivételt — mindig egy állapotobjektumot ad vissza; a hibák `reason` mezője
soha nem tartalmaz veremkövetést.

Két eseményindító tartja naprakészen az ajánlások gyorsítótárát, mindkettő a katalógus saját
24 órás ütemezésétől függetlenül:

- **Szinkronizálás olvasáskor** — maga a `GET /api/radar/referrals` hívja meg közvetlenül a
  `syncRadarReferrals()` függvényt, amikor a gyorsítótár hiányzik, vagy régebbi a
  `REFERRALS_STALE_MS` értékénél (1 óra, `shouldSyncReferralsOnRead()`), még a válasz
  kiszolgálása előtt. Ez teszi a rögzített hivatkozásokat „mindig naprakésszé” már a
  vezérlőpult következő betöltésekor, bármilyen háttérbeli időzítő bevárása nélkül.
- **Ütemező oldalsó szinkronizálása** — a `radarSchedulerTick()` (`scheduler.ts`) egymástól
  függetlenül értékeli az ajánlások elévültségét a katalógushoz használt óránkénti
  időzítésben, és szükség esetén meghívja a `syncRadarReferrals()` függvényt. Ez attól
  függetlenül lefut, hogy a katalógus szinkronizálása esedékes volt-e az adott ciklusban,
  és soha nem befolyásolja a `RadarTickResult` alakját (csupán lehetőség szerinti
  mellékhatás, a hibák figyelmen kívül hagyásával).

### Hozzáférési függvény

A `src/lib/radar/index.ts` két csak olvasható hozzáférési függvényt exportál, amelyek
egyike sem dob kivételt (ugyanaz a védekező szerződés, mint a `getRadarCatalog()` esetében
— kikapcsolt jelző, hiányzó gyorsítótár vagy sérült gyorsítótárazott hasznos adat esetén
hiba helyett mindegyik az üres alakra értékelődik ki):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  amely a `radar_referrals_cache` táblából olvas (a `getRadarReferralsCache()`
  használatával), és a `RadarReferralsFeedSchema` segítségével validál — **nem** a
  katalógus gyorsítótárából.
- `getDefaultReferralFor(provider)` → az adott szolgáltatóhoz tartozó, `isDefault: true`
  értékű `fixed` ajánlás, vagy `null`. Csak a `fixed` elemeket vizsgálja — egy kampány
  soha nem használható egy szolgáltató „alapértelmezett” hivatkozásaként.

A tényleges „melyik ajánlás az alapértelmezett egy szolgáltatóhoz” szabály a
`findDefaultReferral()` függvényben (`src/lib/radar/referrals.ts`) található; ez egy kis,
tiszta függvény, **DB-import nélkül** — biztonságosan importálható egy `"use client"`
komponensbe. A `getRadarReferrals`/`getDefaultReferralFor` (az `index.ts` fájlban)
behúzza az `@/lib/db/radar` modult, ezért kizárólag szerveroldali marad; a szolgáltatói
vezérlőpult közvetlenül a `referrals.ts` fájlt importálja az `index.ts` helyett (lásd
alább), hogy elkerülje a `better-sqlite3` böngészőcsomagba foglalását.

### `GET /api/radar/referrals`

Pontosan ugyanazt az ellenőrzési sorrendet követi, mint minden más Radar-útvonal: `RADAR_ENABLED` kikapcsolva →
`404` (elsőként ellenőrizve, bájtról bájtra azonos működés); nincs hitelesítés → `401`; egyébként
elavult adatok esetén olvasáskor szinkronizálást indít (lásd fent), majd `200` választ ad
`{ fixed, campaigns, tier }` tartalommal — a `tier` közvetlenül a (lehetséges, hogy éppen frissített)
gyorsítótársorából származik, és kizárólag tájékoztató jellegű (ez vezérli a felhasználói felület
alábbi, finom magasabb csomagra ösztönző szövegét). Soha nem proxyzza közvetlenül a feedkiszolgálót —
az útvonal saját forrása nem tartalmaz `fetch(` hívást; hálózati kommunikáció kizárólag a
`syncRadarReferrals()` belsejében történik, ugyanazon, csak helyi gyorsítótárat használó elv szerint,
mint a `/api/radar/catalog` esetében.

### Irányítópult felhasználói felülete — „Ingyenes kreditek” lap a `/dashboard/radar` oldalon

A meglévő Radar-oldalt (`src/app/(dashboard)/dashboard/radar/page.tsx`) használja újra
második lapként egy új útvonal helyett — így kisebb az útválasztási/i18n-felület egy olyan
funkcióhoz, amely a lap által már lekért adatok egy változata. A bekapcsolás után a lapsáv
a **Katalógus** (meglévő táblázat) és az **Ingyenes kreditek** lehetőséget kínálja:

- A rögzített hivatkozások szolgáltató szerint vannak csoportosítva; mindegyik megjeleníti a
  `requiredAction` értékét (ha van), valamint egy `target="_blank" rel="noopener noreferrer"`
  gombot, amely az ajánlói URL-re mutat.
- A kampányok ugyanezeket jelenítik meg, továbbá a `validUntil` értékét is, ha van.
- Ha a `campaigns` üres, **és** a kiszolgált csomagszint `community`, a felhasználói felület
  rövid magasabb csomagra ösztönző megjegyzést jelenít meg („az időszakos kampányok a támogatói
  csomag extrái”) — ez **soha** nem rejti el és nem korlátozza a rögzített hivatkozások listáját,
  amely minden csomagszinten teljes marad. Az ösztönzés csupán finom üzenet, soha nem akadály.

### Ajánlói hivatkozás a szolgáltató nevén (szolgáltatói irányítópult)

A `ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
már eddig is a `providerInfo.website` címére hivatkozóvá tette a szolgáltató nevét, amikor az
rendelkezésre állt, és már létezett egy példa bevételszerző hivatkozásra: a Kimi (Moonshot AI)
partnerhivatkozási megjegyzése (a `providers.kimiPartnerLinkNote` i18n-kulcs). A D28 pontosan
ugyanezt a diszkrét megjegyzésmintát használja újra a Radar alapértelmezett ajánlásaihoz,
új kulcs bevezetése helyett.

Szándékosan laza csatolás:

- A `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  egy **tiszta** függvény — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  —, amely nem függ az `@/lib/radar` vagy az `@/lib/db/*` moduloktól. A
  `providerPageUtils.ts` egésze mentes marad ezektől az importoktól (ezt a
  `tests/unit/provider-header-referral-link.test.ts` ellenőrzi).
- A `ProviderDetailPageClient.tsx` (egy `"use client"` komponens) az egyetlen hely, ahol
  engedélyezett a Radar-adatok lekérése — a `fetch("/api/radar/referrals")` használatával,
  ugyanazt a helyi útvonalmintát követve, amelyet maga a Radar irányítópultoldal is használ —,
  és kliensoldalon számítja ki az alapértelmezett ajánlást az adatbázistól független
  `src/lib/radar/referrals.ts` fájl `findDefaultReferral()` függvényével.
- Ha a `RADAR_ENABLED` ki van kapcsolva, a lekérés `404` választ kap, a `referralUrl` értéke
  `null` marad, a `resolveProviderHeaderLink()` pedig változatlanul a statikus katalógusbeli
  `website` értéket adja vissza — a szolgáltatói oldal bájtról bájtra azonos azzal, amilyen e
  funkció bevezetése előtt volt. Ugyanez az eredmény, ha még nincs gyorsítótár, vagy az adott
  szolgáltatóhoz nem tartozik alapértelmezett ajánlás.
- Ha alkalmazható alapértelmezett ajánlás, a `ProviderPageHeader` megkapja az
  `isReferralLink` értéket, és ugyanazt a diszkrét megjegyzést/elemleírást jeleníti meg, mint
  a Kimi partnerhivatkozás esetén (újra felhasználva a `providers.kimiPartnerLinkNote`
  kulcsot) — soha nem vezet be új, különálló vizuális megjelenítést.

---

## Saját feed üzemeltetése

Egy fork vagy saját üzemeltető, amely teljes ellenőrzést szeretne a katalógus felett, saját feed
szolgáltatást futtathat a klienskód módosítása nélkül:

1. Biztosítson egy `GET /v1/catalog/latest` végpontot, amely olyan JSON-törzset ad vissza, amely megfelel a
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) sémának — legfelső szinten: `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` és `totals`. Vegye figyelembe az `x-omniroute-radar-schema: 2` fejlécet; egy átmeneti kompatibilitást biztosító kiszolgálónak
   az ezt nem tartalmazó kérések esetén alapértelmezés szerint egy külön aláírt v1-es artefaktumot kell visszaadnia.
2. Írja alá a válasz pontos bájtjait egy Ed25519-kulcspárral, és adja vissza a base64-kódolású
   aláírást az `x-omniroute-feed-signature` válaszfejlécben.
3. Állítsa a `RADAR_FEED_URL` értékét az új alap-URL-re, a `RADAR_FEED_PUBKEY` értékét pedig a hozzá tartozó
   nyilvános kulcsra (base64-DER SPKI vagy PEM) — lásd a
   [környezeti változók referenciáját](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Engedélyezze a `RADAR_ENABLED` beállítást, és iratkozzon fel a `POST /api/radar/settings`
   végponton keresztül (`{ optIn: true }`).

Nincs szükség más kódmódosításra — a `verifyFeedBytes()` automatikusan átveszi a felülbírálást
(`getFeedPublicKeys()` a `src/lib/radar/pinnedKeys.ts` fájlban), és a verzió-összehasonlítás,
a sémaellenőrzés, valamint az egyesítési szabályok ugyanúgy érvényesek a saját üzemeltetésű
feedre.

Az ajánlói hivatkozások (lásd fent: [Ajánlói hivatkozások (ingyenes kreditek)](#referral-links-free-credits))
különálló, opcionális artefaktumot alkotnak: egy olyan fork, amely csak a `/v1/catalog/latest`
végpontot szolgálja ki, továbbra is teljesen működőképes — a `syncRadarReferrals()` eredménye
`{ status: "error" }` lesz, ha a `/v1/referrals/latest` `404` választ ad,
a gyorsítótár pedig egyszerűen üres marad, így a
`GET /api/radar/referrals` továbbra is a `{ fixed: [], campaigns: [], tier: null }`
értéket adja vissza ahelyett, hogy az oldal többi része hibát jelezne. Az ajánlói hivatkozások biztosításához
szolgálja ki a `GET /v1/referrals/latest` végpontot úgy, hogy az megfeleljen a `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) sémának, és írja alá ugyanazzal az Ed25519-kulcspárral, mint
a katalógus feedjét.

A támogatói ajánlatok szintén opcionális artefaktumok. Kiszolgálásukhoz valósítsa meg a
`GET /v1/offers/latest` végpontot a zárt `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`) sémával, követeljen meg aktív jogosultságot, adja vissza az
`x-omniroute-feed-tier: live` fejlécet, és írja alá a pontos bájtokat ugyanazzal a kulccsal. Ha egy fork kihagyja ezt
a végpontot, a katalógus és az ajánlások működése változatlan marad; az ajánlatfrissítés nem destruktív módon hiúsul meg, és
az utoljára ellenőrzött helyi ajánlati gyorsítótár továbbra is elérhető marad.

Az Intel ugyanilyen módon opcionális. Egy saját üzemeltető kiszolgálhatja a `GET /v1/intel/latest` végpontot a
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`) használatával, megkövetelheti az aktív jogosultságot, visszaadhatja az
`x-omniroute-feed-tier: live` fejlécet, és aláírhatja a pontos bájtokat a közös Ed25519-kulccsal. A végpont
kihagyása nem módosítja a katalógus, az ajánlások és az ajánlatok működését; az Intel frissítése megőrzi az utoljára ellenőrzött
helyi pillanatképet.

---

## Kapcsolódó dokumentáció

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — az
  `/api/radar/*` útvonalak által követett hibaválasz-minta.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — a `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY` referenciája.
