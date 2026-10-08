# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

Az OmniRoute **két**, folyamaton belüli sávkezelő rendszerrel rendelkezik, amelyek hatóköre eltérő. Ezek
kiegészítik egymást; az üzemeltetőknek tudniuk kell, hogy éppen melyiket vizsgálják.

## 1. Bájtszintű, teljes folyamatra kiterjedő beléptetés (`chatBodyAdmission.ts`)

- **Hatókör:** a pufferelt törzs-/heap-útvonal a `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` és a többi chat jellegű útvonal esetén. Védelmet
  nyújt a nagy kódolóügynök-törzsek okozta heap-amplifikáció ellen (#4380).
- **Egyetlen, folyamatglobális vezérlő, nem kulcsonkénti sávok (#10110).** Minden API-kulcs
  (hash-elve) vagy `anonymous` munkamenet **ugyanahhoz** a megosztott kerethez
  képest kerül beléptetésre — a hash-elt munkamenet-azonosító KIZÁRÓLAG méltányossági
  ütemezési kulcsként szolgál (körforgásos továbbítás a várakozók között), soha nem
  kapacitásszegmensként. A dokumentum egy korábbi verziója független kapacitással
  rendelkező, kulcsonkénti sávokat írt le; ezt a modellt a #10110-ben eltávolítottuk,
  mert lehetővé tette, hogy nem hitelesített, hamis hitelesítő adatok megsokszorozzák
  a teljes folyamatra érvényes korlátot.
- **Kapu (#503-fanout): automatikusan származtatott fogadási BÁJTkeret, nem rögzített
  kérésszám.** A régi `CHAT_MAX_HEAVY_IN_FLIGHT` kérésszámkorlát (a javítás előtt
  alapértelmezés szerint `1`) a kódolóügynökök párhuzamos elágazásait (több
  alügynök/CLI, rutinszerűen > 256 KB méretű törzsek) ~1-es tényleges párhuzamosságra
  szorította vissza, ami teljesen normál terhelés mellett is 503-as hibákat okozott.
  Most már csak akkor korlátoz, ha az üzemeltető kifejezetten beállítja az
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` értékét. Ha nincs beállítva, a beléptetést
  ehelyett az `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` szabályozza — ez egy, a folyamat
  tényleges memóriakorlátjából (`src/shared/middleware/admissionBudget.ts`)
  automatikusan származtatott keret: a V8 heapkorlátja és bármely cgroup-/konténerkorlát
  közül a szigorúbb érték 25%-a, elosztva egy 8x-os átmeneti amplifikációs tényezővel,
  majd 8 MiB és 2 GiB közé korlátozva. A kifejezett felülbírálásokra ugyanezek a
  korlátok vonatkoznak. Környezeti változók hangolása nélkül automatikusan skálázódik
  egy 512 MB-os konténertől egy 32 GB-os asztali gépig. Az a törzs, amely nem fér
  bele a tényleges keretbe, azonnal `413 body_exceeds_budget` hibával meghiúsul;
  csak az egyenként kiszolgálható törzsek közötti versengés kerül a korlátozott,
  méltányos várólistára. Egy élő, több jelre épülő erőforrásterhelés-követő (V8
  heaparánya, cgroup, PSI, OOM-események — `open-sse/utils/resourcePressurePolicy.ts`)
  `high` terhelésnél lerövidíti a korlátozott várakozást, `critical` terhelésnél
  pedig azonnal elutasít `503 resource_pressure` hibával, még mielőtt egyetlen bájt
  fogadása is megtörténne. A PSI-t ennek az egységnek a cgroupjához tartozó
  `memory.pressure` fájlból olvassa be, ha az elérhető
  (`open-sse/utils/resourcePressureSampler.ts`); a `/proc/pressure/memory` a teljes
  gazdagépre vonatkozik, és csak közvetlen hardveren / cgroup v1 alatt szolgál
  tartalékforrásként, így egy lapozó gazdagép nem okozhat 503-as hibát egy tétlen
  konténerben.
- **Hangolás:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — az automatikusan származtatott bájtkeret felülbírálása
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — régi kérésszámkorlát, csak külön engedélyezéssel
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — várólistán töltött idő az 503 előtt (alapértelmezése `RATE_LIMIT_MAX_WAIT_MS`)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — a várakozó bájtok heap-védőszelepe (alapértelmezés: 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — a #10110 óta elavult,
    hatás nélküli beállítások (konfigurációs kompatibilitás céljából elfogadottak, de figyelmen kívül maradnak)
- **Jelentés:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — beleértve
  a #503-fanout következő kiegészítéseit: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` és `countCapEnabled`
  (alapértelmezett telepítésnél false — megerősíti, hogy ténylegesen a bájtkeret,
  nem pedig a régi darabszámkorlát érvényesül).

## 2. Adaptív futásidejű virtuális sávok (`open-sse/services/admission`)

- **Hatókör:** bérlőkulcs-alapú beléptetés a szolgáltatói továbbításhoz — sorköltség, késleltetésvezérelt
  korlátadaptáció, sávonkénti sorba állítás és sávmetrikák.
- **Kapcsoló:** **külön engedélyezendő.** Letiltva marad, hacsak az `OMNIROUTE_CHAT_VIRTUAL_LANES=true` nincs beállítva. Enélkül
  az adaptív vezérlő megtartja a megosztott sor működését (a #9654 1. feltétele csak
  akkor teljesül, ha egy üzemeltető engedélyezi a sávokat).
- **Hangolás:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptív konfiguráció (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Jelentések:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (átlátszatlan sávazonosítók, soha nem nyers
  kulcsok), valamint `virtualLanes` — a pillanatkép mérvadó, „a sávok be vannak kapcsolva” jelzője.

## 3. Fan-out próbák — célpontonkénti beléptetés combo/fusion esetén (#9654, 2. hullám)

A combo (prioritásos / körkörös) és a fusion egyetlen szülő
kérés alatt N modellcélpontra végez fan-out műveletet. A #9654 2. hulláma óta **minden fan-out célpont beléptetési ellenőrzésen esik át a továbbítás előtt** egy
célpontonkénti próbával (`PerTargetAdmissionHook`, amelyet a `createPerTargetAdmissionHook` épít fel)
a **szülő** bérlői sávján.

- **Hatókör:** a combo, a fusion és a káoszmotor által továbbított minden fan-out célpont.
  Az 1. rendszer (bájtszintű) érintetlen marad — az soha nem végez próbát fan-out célpontokon.
- **Kapcsoló:** **a 2. rendszerrel együtt külön engedélyezendő.** Nem végez műveletet, ha az `OMNIROUTE_CHAT_VIRTUAL_LANES`
  nincs beállítva — ebben a módban a szülő kérés már birtokolja a megosztott sor foglalását,
  ezért a próba kétszer számolná el és elutasítaná a combo célpontjait.
- **Szemantika:**
  - **Szigorúan nem blokkoló — kihagyás, soha nem áll sorba.** `maxWaitMs 0`: egy megtelt sáv
    kihagyja a célpontot, és helyette a combo tartalékmechanizmusa (vagy a fusion túlélő
    panelje) szolgál ki. Ez szándékos: egy fan-out célpont redundáns
    munka, a sorba állítása pedig még nagyobb terhelést rakna pontosan arra a torlódásra, amelyet a sávok
    hivatottak megakadályozni. A `defaultMaxWaitMs` ezért **csak a szülő kérésre** vonatkozik;
    a fan-out próbák soha nem várnak, és szándékosan **nincs beállítási lehetőség** arra, hogy
    várakozzanak (a probléma előzményei azt mutatják, hogy a várakozási beállítások a tömeges 502/504 hibák azon kategóriáját
    idézték elő, amelyet a #9654 megelőz — csak akkor érdemes újra megvizsgálni, ha egy üzemeltető jelzi, hogy a kihagyott fan-out célpontok
    rontják a válasz minőségét).
  - **Felszabadítás beléptetéskor.** Egy beengedett próba azonnal felszabadítja a foglalását: ez
    kapacitáskorlát, nem pedig foglalástartás. A szülő foglalása lefedi a fan-out műveletet; további N foglalás
    megtartása megnövelné a megosztott aktív költséget, és más bérlők elutasításához vezetne. A megoldás a lehetőségek szerinti legjobb,
    nem pedig garantált foglalás: a sáv a próba és a továbbítás között újra megtelhet, így
    erős versengés esetén a korlát olyan sávba is beengedhet, amely a
    célpont továbbításának idejére ismét megtelik.
  - **A tényleges fan-out törzs alapján árazva.** A próba a költséget a
    célpont tényleges törzséből becsüli meg — beleértve a `stream` jelzőjéből származtatott kérésosztályt,
    pontosan úgy, mint a szülő útvonalán —, így a fusion paneltagok (`stream: false`)
    árazása annak a nem streamelt osztálynak megfelelően történik, amelyet ténylegesen használni fognak, a prioritásos/RR
    célpontoké pedig a felhasználó által kért beállításnak megfelelően.
- **Jelentések:** az első célpont utáni próbakihagyás növeli a combo kérésenkénti
  `fallbackCount` értékét (a meglévő tartalék-szemantikát tükrözve; látható a combo
  naplóiban); a fusion 503-as választ ad vissza, ha minden paneltag kimarad. Jelenleg
  **nincs összesített számláló** (például `virtualFanoutSkipped`) a pillanatképben —
  ha egy üzemeltető jelzi, hogy nem tudja megállapítani, milyen gyakran hagy ki fan-out
  célpontokat a sávkorlát, az indokolja egy ilyen számláló hozzáadását.

## Melyik jelenik meg az irányítópulton

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptív virtuális sávok** (2. rendszer).
- `adaptiveAdmission.virtualLanes === true` → a 3. szakasz fan-out próbái is
  aktívak. Ha egy payloadból hiányzik a `virtualLanes`, vagy az értéke `false`, az azt jelenti,
  hogy az `OMNIROUTE_CHAT_VIRTUAL_LANES` nincs beállítva — a bájtszintű sávok (1. rendszer)
  továbbra is aktívak, de az engedélyezéséig semmi sem lép érvénybe az
  `adaptiveAdmission` alatt (és fan-out kapuzás sincs).

## Miért létezik mindkettő

A bájtszintű sávok a memóriaigényes elemzési/tömörítési útvonalat korlátozzák; az adaptív sávok
pedig a bérlőnkénti továbbítási költséget. A #9654 1. feltételét („egy munkamenet kiugró terhelése
nem okoz 503-as hibát egy másiknál”) az 1. rendszer feltétel nélkül, a 2. rendszer pedig az
önkéntes engedélyezést követően érvényesíti.

## 4. Hosszú `/v1/responses` egyetlen folyamatban (egészséges tartalék)

A [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) hozzáadta a
`tryAcquireHealthyHeadroom` funkciót, így egy második, szerkezetileg erőforrás-igényes kérés is
befogadható, ha a heap kihasználtsága az `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`
értéke alatt van. Az `admitChatRequest` által használt BYTE
útvonal (legalább `OMNIROUTE_CHAT_LARGE_BODY_BYTES` méretű törzsek,
alapértelmezés szerint 256 KiB, beleértve a `POST /v1/responses` kéréseket) **ugyanezt** a kivételt használja.

Ez a támogatott **egyfolyamatos** megoldás kettőnél több egyidejű, hosszú
SSE `/v1/responses` kéréshez: az elsődleges és az egészséges tartalék kapacitást csak addig növeld, ameddig azt a heap
és a teljes folyamatra vonatkozó, folyamatban lévő bájtkeret (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) lehetővé teszi. Több tíz hosszú SSE-kliens (40–50) kiszolgálása
memóriakeret kérdése, nem pedig egy merev, „legfeljebb 2” termékkorlát. Terhelt heap esetén a rendszer továbbra is
megismételhető `503` hibával utasítja el a kéréseket, hogy a #7849 ne térjen vissza.

A heapek számának **megtöbbszörözéséhez** futtass N független `DATA_DIR`-t (#11024). Soha ne használj
`replicas > 1` beállítást egyetlen SQLite-fájlon (#10350). Ez a szakasz nem
a DATA_DIR-alapú horizontális skálázási megoldás újbóli megnyitása.
