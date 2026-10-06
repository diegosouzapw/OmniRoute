# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ima **dva** sustava traka lokalna procesu s različitim područjima primjene. Oni se
međusobno nadopunjuju; operateri bi trebali znati koji od njih promatraju.

## 1. Prihvat na razini bajtova za cijeli proces (`chatBodyAdmission.ts`)

- **Opseg:** putanja međuspremnika tijela/heap memorije za `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` i ostale rute oblika chata. Štiti
  od povećane potrošnje heap memorije zbog velikih tijela zahtjeva alata za kodiranje (#4380).
- **Jedan globalni kontroler procesa, bez zasebnih staza po ključu (#10110).** Svaki API ključ
  (raspršen) ili `anonymous` sesija prihvaća se prema **istom** zajedničkom budžetu —
  raspršeni ID sesije koristi se ISKLJUČIVO kao ključ za pravedno raspoređivanje (kružno
  otpremanje zahtjeva na čekanju), a nikada kao zasebna particija kapaciteta. Prethodna verzija ovog
  dokumenta opisivala je zasebne staze po ključu s neovisnim kapacitetom; taj je model
  uklonjen u #10110 jer je omogućavao da lažne neautentificirane vjerodajnice višestruko povećaju
  ograničenje na razini cijelog procesa.
- **Kontrolna točka (#503-fanout): automatski izveden BAJTNI budžet za prijam, a ne fiksni broj
  zahtjeva.** Naslijeđeno ograničenje broja zahtjeva `CHAT_MAX_HEAVY_IN_FLIGHT` (zadano `1`
  prije ovog ispravka) smanjivalo je fan-out alata za kodiranje (više podagenata/CLI-jeva,
  tijela redovito > 256 KB) na efektivnu istodobnost od ~1, što je uzrokovalo odgovore 503
  pri potpuno normalnom opterećenju. Sada se primjenjuje samo kada operator izričito
  postavi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Ako nije postavljeno, prihvat je umjesto toga
  ograničen varijablom `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — budžetom koji se automatski izvodi iz
  stvarnog memorijskog ograničenja procesa (`src/shared/middleware/admissionBudget.ts`):
  25 % strožeg od ograničenja V8 heap memorije i bilo kojeg cgroup/kontejnerskog ograničenja,
  podijeljeno s faktorom privremenog povećanja od 8x, ograničeno na raspon između 8 MiB i
  2 GiB. Eksplicitno zadane vrijednosti primjenjuju ista ograničenja. Time se sustav automatski prilagođava od
  kontejnera od 512 MB do stolnog računala s 32 GB bez podešavanja varijabli okruženja. Tijelo koje ne može
  stati unutar efektivnog budžeta odmah završava pogreškom `413 body_exceeds_budget`;
  samo nadmetanje među tijelima koja se pojedinačno mogu obraditi ulazi u ograničeni
  red čekanja s pravednim raspoređivanjem. Aktivni višesignalni alat za praćenje pritiska na resurse (omjer V8 heap memorije,
  cgroup, PSI, OOM događaji — `open-sse/utils/resourcePressurePolicy.ts`) skraćuje
  ograničeno čekanje pod `high` pritiskom i odmah odbacuje zahtjeve s
  `503 resource_pressure` pod `critical` pritiskom, čak i prije prijama ijednog bajta.
  PSI se, kada je dostupno, čita iz datoteke `memory.pressure` cgroupa ove jedinice
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` odnosi se
  na cijeli host i koristi se samo kao pričuvna opcija na fizičkim poslužiteljima / cgroup v1, tako da host
  koji koristi swap ne može uzrokovati 503 u neaktivnom kontejneru.
- **Podešavanje:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — nadjačavanje automatski izvedenog bajtnog budžeta
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — naslijeđeno ograničenje broja zahtjeva, samo uz izričito uključivanje
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — vrijeme čekanja u redu prije odgovora 503 (zadano na `RATE_LIMIT_MAX_WAIT_MS`)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — zaštitni ventil heap memorije za bajtove na čekanju (zadano 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — zastarjele
    opcije bez učinka od #10110 (prihvaćaju se radi kompatibilnosti konfiguracije, ali se zanemaruju)
- **Izvještaji:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — uključujući
  dodatke iz #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` i `countCapEnabled`
  (false u zadanom okruženju — potvrđuje da se zapravo primjenjuje bajtni budžet, a ne naslijeđeno
  ograničenje broja zahtjeva).

## 2. Prilagodljive virtualne trake tijekom izvođenja (`open-sse/services/admission`)

- **Opseg:** prihvat prema ključu najmoprimca za otpremu pružatelju — trošak reda čekanja, prilagodba
  ograničenja vođena latencijom, stavljanje u redove traka i metrike traka.
- **Aktivacija:** **uz izričito uključivanje.** Onemogućeno je ako `OMNIROUTE_CHAT_VIRTUAL_LANES=true` nije postavljeno. Bez toga
  prilagodljivi kontroler zadržava ponašanje zajedničkog reda čekanja (kriterij 1 iz #9654 vrijedi
  tek kada operator omogući trake).
- **Podešavanje:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + prilagodljiva konfiguracija (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Izvješća:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (neprozirni ID-jevi traka, nikada neobrađeni
  ključevi) i `virtualLanes` — mjerodavna zastavica „trake su uključene” u snimci stanja.

## 3. Fan-out provjere — prihvat po cilju za combo/fusion (#9654, 2. val)

Combo (prioritet / kružno raspoređivanje) i fusion razgranavaju N ciljnih modela unutar jednog nadređenog
zahtjeva. Od 2. vala #9654 **svaki fan-out cilj provjerava se prije otpreme** pomoću
provjere po cilju (`PerTargetAdmissionHook`, koju izrađuje `createPerTargetAdmissionHook`)
u odnosu na traku najmoprimca **nadređenog zahtjeva**.

- **Opseg:** svaki fan-out cilj koji otpremaju combo, fusion i mehanizam za kaos.
  Sustav 1 (na razini bajtova) ostaje nepromijenjen — nikada ne provjerava fan-out ciljeve.
- **Aktivacija:** **izričitim uključivanjem zajedno sa sustavom 2.** Ne poduzima ništa kada
  `OMNIROUTE_CHAT_VIRTUAL_LANES` nije postavljeno — nadređeni zahtjev u tom načinu već drži
  zakup zajedničkog reda čekanja, pa bi provjera dvaput uračunala i odbila combo ciljeve.
- **Semantika:**
  - **Strogo neblokirajuće — preskoči, nikada ne stavljaj u red čekanja.** `maxWaitMs 0`: puna traka
    uzrokuje preskakanje cilja, a umjesto njega odgovor pruža combo mehanizam za pričuvni odabir
    (ili fusion skup preživjelih ciljeva). To je namjerno: fan-out cilj predstavlja suvišan
    posao, a njegovo stavljanje u red čekanja dodatno opterećuje upravo ono zagušenje koje
    trake trebaju spriječiti. `defaultMaxWaitMs` stoga se primjenjuje **samo na nadređeni zahtjev**;
    fan-out provjere nikada ne čekaju i namjerno **ne postoji postavka** kojom bi ih se moglo
    prisiliti na čekanje (povijest problema pokazuje da su postavke čekanja uzrokovale masovne
    pogreške klase 502/504 koje #9654 sprječava — to treba ponovno razmotriti samo ako operator
    prijavi da preskočeni fan-out ciljevi narušavaju kvalitetu odgovora).
  - **Oslobađanje nakon prihvata.** Prihvaćena provjera odmah oslobađa svoj zakup: riječ je o
    provjeri kapaciteta, a ne o zadržavanju. Zakup nadređenog zahtjeva pokriva fan-out; zadržavanje
    dodatnih N zakupa umjetno bi povećalo zajednički aktivni trošak i uzrokovalo odbijanje drugih
    najmoprimaca. To je provjera po načelu najvećeg mogućeg truda, a ne rezervacija: traka se može
    ponovno popuniti između provjere i otpreme, pa pri velikom nadmetanju provjera može prihvatiti
    cilj u traku koja je ponovno puna u trenutku njegove otpreme.
  - **Cijena se određuje prema stvarnom fan-out tijelu.** Provjera procjenjuje trošak iz stvarnog
    tijela cilja — uključujući klasu zahtjeva izvedenu iz njegove zastavice `stream`,
    potpuno jednako kao na putu nadređenog zahtjeva — pa se članovima fusion skupa (`stream: false`)
    cijena određuje prema klasi bez strujanja koju će doista zauzeti, a prioritetnim/RR
    ciljevima prema onome što je korisnik zatražio.
- **Izvješća:** preskakanje provjere nakon prvog cilja povećava combo vrijednost
  `fallbackCount` za taj zahtjev (odražavajući postojeću semantiku pričuvnog odabira; vidljivo u combo
  zapisnicima); fusion vraća 503 kada se preskoče svi članovi skupa. Trenutačno
  **ne postoji zbirni brojač** (npr. `virtualFanoutSkipped`) u snimci stanja —
  ako operator prijavi da ne može utvrditi koliko često pristupnik trake preskače fan-out
  ciljeve, to je povod za njegovo dodavanje.

## Koji se prikazuje na nadzornoj ploči

- `adaptiveAdmission.laneCount` / `laneTenants` → **prilagodljive virtualne trake** (sustav 2).
- `adaptiveAdmission.virtualLanes === true` → aktivne su i fan-out provjere iz odjeljka 3.
  Ako u korisnom sadržaju `virtualLanes` nedostaje ili ima vrijednost `false`, to znači da
  `OMNIROUTE_CHAT_VIRTUAL_LANES` nije postavljen — trake na razini bajtova (sustav 1) i
  dalje su aktivne, ali ništa pod `adaptiveAdmission` (kao ni fan-out ograničavanje) nije
  na snazi dok se ne omogući.

## Zašto postoje oba sustava

Trake na razini bajtova ograničavaju put raščlanjivanja/sažimanja koji intenzivno troši
memoriju; prilagodljive trake ograničavaju trošak otpreme po zakupcu. Kriterij 1 iz #9654
(„nagli porast prometa jedne sesije ne uzrokuje odgovor 503 za drugu”) bezuvjetno provodi
sustav 1, a sustav 2 nakon što se omogući uključivanjem.

## 4. Dugi `/v1/responses` u jednom procesu (rezerva pri zdravom stanju)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) dodao je
`tryAcquireHealthyHeadroom` kako bi se prihvatio drugi strukturno zahtjevan zahtjev
kada je zauzeće gomile ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Put BYTE
koji upotrebljava `admitChatRequest` (tijela ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
zadano 256 KiB, uključujući `POST /v1/responses`) koristi **istu** iznimku.

Ovo je podržani recept za **jedan proces** s više od dva istodobna duga
SSE `/v1/responses`: povećavajte primarno ograničenje i rezervu pri zdravom stanju samo
onoliko koliko dopuštaju gomila i proračun bajtova zahtjeva u obradi na razini cijelog
procesa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Deseci dugih SSE klijenata
(40–50) pitanje su tog memorijskog proračuna, a ne strogog ograničenja proizvoda na
„najviše 2”. Opterećena gomila i dalje odbacuje zahtjeve uz ponovljivi odgovor `503`,
kako se problem iz #7849 ne bi vratio.

Kako biste **umnožili gomile**, pokrenite N neovisnih `DATA_DIR` direktorija (#11024).
Nikada nemojte postaviti `replicas > 1` za jednu SQLite datoteku (#10350). Ovaj odjeljak
ne predstavlja ponovno otvaranje recepta za horizontalno skaliranje pomoću `DATA_DIR`.
