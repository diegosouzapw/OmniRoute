# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute má **dva** procesně lokální systémy drah s odlišným rozsahem působnosti. Tyto systémy se
doplňují; provozovatelé by měli vědět, na který z nich se dívají.

## 1. Přijímání na úrovni bajtů pro celý proces (`chatBodyAdmission.ts`)

- **Rozsah:** cesta využívající tělo požadavku uložené ve vyrovnávací paměti / haldu pro `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` a další trasy ve formátu chatu. Chrání
  před nadměrným zatížením haldy způsobeným velkými těly požadavků programovacích agentů (#4380).
- **Jeden globální řadič pro celý proces, nikoli fronty pro jednotlivé klíče (#10110).** Každý klíč API
  (hashovaný) nebo relace `anonymous` je přijímána v rámci **stejného** sdíleného rozpočtu —
  hashované ID relace se používá POUZE jako klíč pro spravedlivé plánování (obsluha čekajících
  metodou round-robin), nikdy jako oddělená kapacitní část. Předchozí verze tohoto
  dokumentu popisovala fronty pro jednotlivé klíče s nezávislou kapacitou; tento model byl
  v #10110 odstraněn, protože neověřené falešné přihlašovací údaje umožňovaly
  znásobit limit pro celý proces.
- **Brána (#503-fanout): automaticky odvozený BAJTOVÝ rozpočet pro příjem, nikoli pevný počet
  požadavků.** Původní limit počtu požadavků `CHAT_MAX_HEAVY_IN_FLIGHT` (před
  touto opravou byla výchozí hodnota `1`) omezoval fan-out programovacích agentů (více subagentů/CLI,
  těla běžně > 256 KB) na efektivní souběžnost ~1, což při zcela
  běžném zatížení vedlo k odpovědím 503. Nyní se uplatní pouze tehdy, když operátor explicitně
  nastaví `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Pokud není nastavena, řídí se přijímání
  místo toho pomocí `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — rozpočtu automaticky odvozeného ze
  skutečného paměťového limitu procesu (`src/shared/middleware/admissionBudget.ts`):
  25 % z přísnějšího limitu mezi limitem haldy V8 a případným limitem cgroup/kontejneru,
  vydělených faktorem 8 pro přechodné navýšení využití paměti, s omezením do rozsahu 8 MiB až
  2 GiB. Explicitní přepsání používají stejná omezení. Rozpočet se automaticky škáluje od
  kontejneru s 512 MB až po stolní počítač s 32 GB bez nutnosti ladění proměnných prostředí. Tělo, které se
  nevejde do efektivního rozpočtu, okamžitě selže s `413 body_exceeds_budget`;
  pouze soupeření mezi těly, která lze samostatně obsloužit, vstupuje do omezené
  spravedlivé fronty. Živý nástroj pro sledování tlaku na prostředky využívající více signálů (poměr využití haldy V8,
  cgroup, PSI, události OOM — `open-sse/utils/resourcePressurePolicy.ts`) zkracuje
  omezenou dobu čekání při `high` tlaku a při `critical` tlaku požadavky okamžitě odmítá
  pomocí `503 resource_pressure`, ještě před přijetím jakýchkoli bajtů.
  PSI se čte z `memory.pressure` cgroup této jednotky, pokud je k dispozici
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` platí
  pro celý hostitelský systém a používá se pouze jako záložní zdroj na fyzickém serveru / cgroup v1, takže hostitelský
  systém využívající swap nemůže způsobit odpověď 503 u nečinného kontejneru.
- **Ladění:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — přepsání automaticky odvozeného bajtového rozpočtu
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — původní limit počtu požadavků, pouze volitelný
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — doba čekání ve frontě před odpovědí 503 (výchozí hodnota 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — pojistka haldy podle počtu bajtů ve frontě (výchozí hodnota 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — zastaralé
    volby bez účinku od #10110 (přijímají se kvůli kompatibilitě konfigurace, ale ignorují se)
- **Hlášení:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — včetně
  doplnění z #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` a `countCapEnabled`
  (ve výchozím nasazení false — potvrzuje, že skutečně omezujícím prvkem je bajtový rozpočet,
  nikoli původní limit počtu požadavků).

## 2. Adaptivní virtuální pruhy za běhu (`open-sse/services/admission`)

- **Rozsah:** řízení přístupu podle klíče tenanta pro odesílání poskytovateli — náklady fronty, přizpůsobování limitů podle latence, řazení do front v pruzích a metriky pruhů.
- **Aktivace:** **volitelná.** Funkce je deaktivována, pokud není nastaveno `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Bez tohoto nastavení adaptivní řadič zachovává chování sdílené fronty (kritérium 1 z #9654 platí pouze tehdy, když operátor pruhy povolí).
- **Ladění:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptivní konfigurace (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Reportování:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (neprůhledná ID pruhů, nikdy nezpracované klíče) a `virtualLanes` — autoritativní příznak „pruhy jsou zapnuté“ ve snímku.

## 3. Sondy fan-out — řízení přístupu pro jednotlivé cíle u combo/fusion (#9654 Wave 2)

Combo (prioritní / round-robin) a fusion rozesílají požadavky na N cílových modelů v rámci jednoho nadřazeného požadavku. Od #9654 Wave 2 je **každý cíl fan-out před odesláním podroben řízení přístupu** pomocí sondy pro jednotlivý cíl (`PerTargetAdmissionHook`, vytvořené pomocí `createPerTargetAdmissionHook`) vůči pruhu tenanta **nadřazeného požadavku**.

- **Rozsah:** každý cíl fan-out odeslaný mechanismy combo, fusion a chaos engine.
  Systém 1 (na úrovni bajtů) není ovlivněn — cíle fan-out nikdy nekontroluje sondou.
- **Aktivace:** **volitelná spolu se systémem 2.** Pokud není nastaveno `OMNIROUTE_CHAT_VIRTUAL_LANES`, neprovádí se žádná operace — nadřazený požadavek již v tomto režimu drží pronájem sdílené fronty, takže by sondování vedlo k dvojímu započítání a odmítání cílů combo.
- **Sémantika:**
  - **Striktně neblokující — přeskočit, nikdy nezařazovat do fronty.** `maxWaitMs 0`: plný pruh způsobí přeskočení cíle a místo něj požadavek obslouží záložní mechanismus combo (nebo panel přeživších u fusion). Je to záměrné: cíl fan-out představuje nadbytečnou práci a jeho zařazení do fronty zvyšuje zatížení přesně v místech zahlcení, kterému mají pruhy zabránit. `defaultMaxWaitMs` se proto vztahuje **pouze na nadřazený požadavek**; sondy fan-out nikdy nečekají a záměrně neexistuje **žádný konfigurační parametr**, který by jim čekání umožnil (historie problému ukazuje, že parametry čekání vedly k hromadnému výskytu chyb 502/504, kterému má #9654 zabránit — přehodnotit pouze tehdy, pokud operátor nahlásí, že přeskakování cílů fan-out poškozuje kvalitu odpovědí).
  - **Uvolnění po přijetí.** Přijatá sonda svůj pronájem okamžitě uvolní: jde o kapacitní bránu, nikoli o rezervaci. Pronájem nadřazeného požadavku pokrývá fan-out; držení dalších N pronájmů by uměle navyšovalo aktivní náklady sdílené fronty a vedlo k odmítání ostatních tenantů. Jde o maximální snahu, nikoli rezervaci: mezi sondou a odesláním se pruh může znovu zaplnit, takže při vysokém souběhu může brána přijmout požadavek do pruhu, který je v okamžiku odeslání cíle opět plný.
  - **Cena podle skutečného těla fan-out.** Sonda odhaduje náklady ze skutečného těla cíle — včetně třídy požadavku odvozené z jeho příznaku `stream`, přesně jako u cesty nadřazeného požadavku — takže členové panelu fusion (`stream: false`) jsou oceněni podle třídy bez streamování, kterou skutečně využijí, a cíle priority/RR podle toho, co požadoval uživatel.
- **Reportování:** přeskočení sondy po prvním cíli zvýší hodnotu `fallbackCount` combo pro daný požadavek (v souladu se stávající sémantikou záložního zpracování; viditelné v protokolech combo); fusion vrátí 503, pokud jsou přeskočeni všichni členové panelu. Ve snímku dnes **není žádné souhrnné počítadlo** (např. `virtualFanoutSkipped`) — pokud operátor nahlásí, že nedokáže zjistit, jak často brána pruhu přeskakuje cíle fan-out, je to podnět k jeho přidání.

## Který systém se zobrazuje v dashboardu

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptivní virtuální pruhy** (systém 2).
- `adaptiveAdmission.virtualLanes === true` → sondy fan-out z oddílu 3 jsou
  také aktivní. Payload, ve kterém `virtualLanes` chybí nebo má hodnotu `false`, znamená,
  že `OMNIROUTE_CHAT_VIRTUAL_LANES` není nastavená — pruhy na úrovni bajtů (systém 1)
  jsou stále aktivní, ale dokud není tato možnost povolena, nic v rámci
  `adaptiveAdmission` (ani řízení fan-out) se neuplatňuje.

## Proč existují oba systémy

Pruhy na úrovni bajtů omezují cestu parsování/komprese náročnou na paměť; adaptivní pruhy
omezují náklady na odesílání pro jednotlivé tenanty. Kritérium 1 z #9654 („špička jedné relace
nezpůsobí chybu 503 jiné relaci“) je systémem 1 vynucováno bezpodmínečně a systémem 2 po
povolení této možnosti.

## 4. Dlouhé `/v1/responses` v jednom procesu (rezerva při zdravém stavu)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) přidal
`tryAcquireHealthyHeadroom`, aby byl přijat druhý strukturálně náročný požadavek,
pokud je využití haldy pod hodnotou `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Cesta BYTE
používaná funkcí `admitChatRequest` (těla ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
výchozí hodnota 256 KiB, včetně `POST /v1/responses`) používá **stejnou** rezervu.

Toto je podporovaný postup pro **jeden proces**, který umožňuje více než dva souběžné dlouhé
SSE požadavky `/v1/responses`: zvyšujte primární limit a rezervu při zdravém stavu pouze natolik,
nakolik to dovolí halda a celoprocesový rozpočet bajtů požadavků za běhu
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Desítky dlouhých SSE klientů
(40–50) jsou otázkou tohoto paměťového rozpočtu, nikoli pevného produktového limitu „max. 2“.
Proces pod tlakem na haldu nadále odmítá požadavky pomocí opakovatelné chyby `503`, aby se
problém #7849 nevrátil.

Chcete-li **znásobit počet hald**, spusťte N nezávislých `DATA_DIR` (#11024). Nikdy
nepoužívejte `replicas > 1` nad jedním souborem SQLite (#10350). Tento oddíl znovu neotevírá
postup horizontálního škálování pomocí DATA_DIR.
