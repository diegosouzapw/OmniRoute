# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

# Ulazne trake (#9654) — dva sistema traka, šta svaka kontroliše, gdje svaka izvještava

OmniRoute ima **dva** procesno-lokalna sistema traka sa različitim opsezima. Oni su komplementarni; operateri treba da znaju koji od njih posmatraju.

## 1. Prihvat na nivou bajtova za cijeli proces (`chatBodyAdmission.ts`)

- **Opseg:** putanja baferovanog tijela/heap memorije za `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` i druge rute oblika chata. Štiti
  od povećane potrošnje heap memorije uzrokovane velikim tijelima zahtjeva programskih agenata (#4380).
- **Jedan globalni kontroler po procesu, a ne zasebne trake po ključu (#10110).** Svaki API ključ
  (heširan) ili `anonymous` sesija prihvata se u okviru **istog** zajedničkog budžeta —
  heširani ID sesije koristi se ISKLJUČIVO kao ključ za pravedno raspoređivanje (round-robin
  otpremanje zahtjeva na čekanju), a nikada kao zaseban segment kapaciteta. Prethodna verzija ovog
  dokumenta opisivala je trake po ključu s nezavisnim kapacitetom; taj model je
  uklonjen u #10110 jer je omogućavao da neautentificirani lažni pristupni podaci višestruko povećaju
  ograničenje na nivou cijelog procesa.
- **Kontrolna tačka (#503-fanout): automatski izveden BAJTNI budžet za prijem, a ne fiksni broj
  zahtjeva.** Naslijeđeno ograničenje broja zahtjeva `CHAT_MAX_HEAVY_IN_FLIGHT` (zadano `1`
  prije ove ispravke) svodilo je paralelno izvršavanje programskih agenata (više podagenata/CLI-jeva,
  tijela koja su redovno > 256 KB) na efektivnu konkurentnost od ~1, što je
  vraćalo 503 pri potpuno normalnom opterećenju. Sada se primjenjuje samo kada operater izričito
  postavi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Ako nije postavljen, prihvat se umjesto toga
  kontroliše pomoću `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — budžeta automatski izvedenog iz
  stvarnog memorijskog ograničenja procesa (`src/shared/middleware/admissionBudget.ts`):
  25% manjeg od ograničenja V8 heap memorije i bilo kojeg cgroup/kontejnerskog ograničenja,
  podijeljeno faktorom prolazne amplifikacije 8x i ograničeno na raspon između 8 MiB i
  2 GiB. Eksplicitno zadane vrijednosti koriste ista ograničenja. Ovo se automatski prilagođava od
  kontejnera s 512 MB do desktop računara s 32 GB bez podešavanja varijabli okruženja. Tijelo koje se ne može
  uklopiti u efektivni budžet odmah završava greškom `413 body_exceeds_budget`;
  samo nadmetanje između tijela koja se pojedinačno mogu obraditi ulazi u ograničeni
  red za pravedno raspoređivanje. Aktivni višeindikatorski sistem za praćenje pritiska na resurse (omjer V8 heap memorije,
  cgroup, PSI, OOM događaji — `open-sse/utils/resourcePressurePolicy.ts`) skraćuje
  ograničeno čekanje pod `high` pritiskom i odmah odbacuje zahtjeve uz
  `503 resource_pressure` pod `critical` pritiskom, čak i prije prijema bilo kojeg bajta.
  PSI se čita iz `memory.pressure` cgroup grupe ove jedinice kada je dostupan
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` se odnosi
  na cijeli host i koristi se samo kao rezervna opcija na fizičkim serverima / cgroup v1, tako da host
  koji koristi swap ne može uzrokovati 503 u neaktivnom kontejneru.
- **Podešavanje:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — zamjenska vrijednost za automatski izvedeni bajtni budžet
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — naslijeđeno ograničenje broja zahtjeva, samo uz izričito uključivanje
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — čekanje u redu prije 503 (zadano je `RATE_LIMIT_MAX_WAIT_MS`)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap ventil za bajtove na čekanju (zadano 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — zastarjelo i
    bez efekta od #10110 (prihvata se radi kompatibilnosti konfiguracije, ali se zanemaruje)
- **Izvještaji:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — uključujući
  dodatke iz #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` i `countCapEnabled`
  (false u zadanom raspoređivanju — potvrđuje da se zapravo primjenjuje bajtni budžet, a ne naslijeđeno
  ograničenje broja zahtjeva).

## 2. Prilagodljive virtualne trake za vrijeme izvođenja (`open-sse/services/admission`)

- **Opseg:** prihvat na osnovu ključa stanara za dispečiranje provajdera — trošak reda čekanja, prilagodba ograničenja vođena latencijom, red čekanja trake i metrike trake.
- **Kapija:** **opcionalno.** Onemogućeno osim ako `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Bez toga, prilagodljivi kontroler zadržava ponašanje dijeljenog reda čekanja (kriterij 1 iz #9654 važi tek kada operater omogući trake).
- **Podešavanje:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + prilagodljiva konfiguracija (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Izvještaji:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (neprozirni ID-ovi traka, nikada sirovi ključevi) i `virtualLanes` — mjerodavna zastavica "trake su uključene" u snimku stanja.

## 3. Fan-out sonde — prihvat po cilju za combo/fusion (#9654 Wave 2)

Combo (prioritet / round-robin) i fusion vrše fan-out N ciljeva modela pod jednim roditeljskim zahtjevom. Od #9654 Wave 2, **svaki fan-out cilj je kontrolisan prije dispečiranja** putem sonde po cilju (`PerTargetAdmissionHook`, kreirane pomoću `createPerTargetAdmissionHook`) u odnosu na roditeljsku traku stanara.

- **Opseg:** svaki fan-out cilj koji dispečira combo, fusion i chaos engine. Sistem 1 (na nivou bajtova) nije pogođen — on nikada ne sondira fan-out ciljeve.
- **Kapija:** **opcionalno sa sistemom 2.** Operacija bez efekta (no-op) kada je `OMNIROUTE_CHAT_VIRTUAL_LANES` nepostavljen — roditeljski zahtjev već posjeduje zakup dijeljenog reda čekanja u tom režimu, pa bi sondiranje dvostruko brojalo i odbijalo combo ciljeve.
- **Semantika:**
  - **Strogo neblokirajuće — preskoči, nikada ne stavljaj u red.** `maxWaitMs 0`: puna traka preskače cilj, a combo mehanizam za povratak (ili fusion panel preživjelih) služi umjesto toga. Ovo je namjerno: fan-out cilj je redundantan posao, a njegovo stavljanje u red gomila dodatno opterećenje na upravo one zagušene trake koje postoje da bi se to zaustavilo. `defaultMaxWaitMs` se stoga primjenjuje **samo na roditeljski zahtjev**; fan-out sonde nikada ne čekaju, i namjerno **ne postoji opcija** da ih natjera da čekaju (historija problema pokazuje da su opcije za čekanje proizvele masovnu klasu 502/504 koju #9654 sprječava — ponovo razmotriti samo ako operater prijavi da preskočeni fan-out ciljevi narušavaju kvalitet odgovora).
  - **Otpuštanje pri prihvatu.** Prihvaćena sonda odmah otpušta svoj zakup: to je kapija kapaciteta, a ne zadržavanje. Roditeljski zakup pokriva fan-out; zadržavanje N dodatnih bi povećalo dijeljeni aktivni trošak i odbilo druge stanare. Najbolji napor, a ne rezervacija: traka se može ponovo napuniti između sonde i dispečiranja, pa pod velikim opterećenjem kapija može prihvatiti u traku koja je ponovo puna do trenutka kada se cilj dispečira.
  - **Cijena određena prema stvarnom fan-out tijelu.** Sonda procjenjuje trošak prema stvarnom tijelu cilja — uključujući klasu zahtjeva izvedenu iz njegove `stream` zastavice, tačno kao i roditeljska putanja — pa se članovi fusion panela (`stream: false`) naplaćuju po klasi bez strimovanja koju će zaista zauzeti, a prioritetni/RR ciljevi po onome što je korisnik zahtijevao.
- **Izvještaji:** preskakanje sonde nakon prvog cilja povećava combo `fallbackCount` po zahtjevu (odražavajući postojeću semantiku povratka; vidljivo u combo logovima); fusion vraća 503 kada je svaki član panela preskočen. Danas **ne postoji zbirni brojač** (npr. `virtualFanoutSkipped`) na snimku stanja — ako operater prijavi da ne može utvrditi koliko često kapija trake preskače fan-out ciljeve, to je okidač da se isti doda.

## Koji se prikazuje na kontrolnoj tabli

- `adaptiveAdmission.laneCount` / `laneTenants` → **prilagodljive virtuelne trake** (sistem 2).
- `adaptiveAdmission.virtualLanes === true` → fan-out sonde iz odjeljka 3 su također aktivne. Payload sa `virtualLanes` koji nedostaje ili je `false` znači da `OMNIROUTE_CHAT_VIRTUAL_LANES` nije postavljen — trake na nivou bajtova (sistem 1) su i dalje aktivne, ali ništa pod `adaptiveAdmission` (i bez fan-out gatinga) nije na snazi dok se ne omogući.

## Zašto oba postoje

Trake na nivou bajtova ograničavaju putanju parsiranja/kompresije koja intenzivno koristi memoriju; prilagodljive trake ograničavaju trošak slanja po zakupcu (tenant). Kriterij 1 iz #9654 („nalet jedne sesije ne uzrokuje 503 drugoj”) sistem 1 provodi bezuslovno, a sistem 2 nakon što se omogući opt-in.

## 4. Jednoprocesni dugi `/v1/responses` (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) je dodao `tryAcquireHealthyHeadroom` tako da se drugi strukturno težak zahtjev prihvata kada je heap ispod `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. BYTE putanja koju koristi `admitChatRequest` (tijela ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, zadano 256 KiB, uključujući `POST /v1/responses`) koristi **istu** zaobilaznicu.

Ovo je podržani **jednoprocesni** recept za više od dva istovremena duga SSE `/v1/responses`: povećajte primarni + healthy-headroom samo onoliko koliko heap i budžet bajtova u toku za cijeli proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) dozvoljavaju. Desetine dugih SSE klijenata (40–50) je pitanje memorijskog budžeta, a ne čvrsto ograničenje proizvoda „maksimalno 2”. Opterećeni heap i dalje odbacuje sa `503` koji se može ponoviti, tako da se #7849 ne vraća.

Da biste **umnožili heapove**, pokrenite N nezavisnih `DATA_DIR`ova (#11024). Nikada ne koristite `replicas > 1` na jednoj SQLite datoteci (#10350). Ovaj odjeljak nije ponovno otvaranje recepta za skaliranje `DATA_DIR`.
