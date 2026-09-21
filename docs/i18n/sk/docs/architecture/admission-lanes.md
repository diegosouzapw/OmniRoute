# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute má **dva** lokálne systémy pruhov na úrovni procesu s rôznym rozsahom. Sú
komplementárne; operátori by mali vedieť, na ktorý z nich sa pozerajú.

## 1. Prijímanie na úrovni bajtov pre celý proces (`chatBodyAdmission.ts`)

- **Rozsah:** cesta spracovania tela vo vyrovnávacej pamäti/halde pre `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` a ostatné trasy s formátom chatu. Chráni
  pred znásobením využitia haldy spôsobeným veľkými telami požiadaviek programovacích agentov (#4380).
- **Jeden globálny radič pre celý proces, nie samostatné pruhy pre jednotlivé kľúče (#10110).** Každý kľúč API
  (vo forme hašu) alebo relácia `anonymous` používa pri prijímaní **rovnaký** zdieľaný rozpočet —
  hašovaný identifikátor relácie sa používa IBA ako kľúč na spravodlivé plánovanie (cyklické
  prideľovanie čakajúcich požiadaviek), nikdy nie ako samostatný kapacitný segment. Predchádzajúca verzia tejto
  dokumentácie opisovala pruhy pre jednotlivé kľúče s nezávislou kapacitou; tento model bol
  odstránený v #10110, pretože neoverené falošné prihlasovacie údaje umožňovali
  znásobiť limit pre celý proces.
- **Brána (#503-fanout): automaticky odvodený BAJTOVÝ rozpočet na príjem, nie pevný počet
  požiadaviek.** Starší limit počtu požiadaviek `CHAT_MAX_HEAVY_IN_FLIGHT` (pred touto
  opravou bola predvolená hodnota `1`) znižoval súbežnosť vetvenia programovacích agentov (viaceré podriadené agenty/CLI,
  telá bežne > 256 KB) prakticky na ~1, čo pri úplne normálnom zaťažení
  spôsobovalo odpovede 503. Teraz sa uplatňuje iba vtedy, keď operátor explicitne
  nastaví `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Ak nie je nastavená, prijímanie sa namiesto toho
  riadi rozpočtom `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — rozpočtom automaticky odvodeným zo
  skutočného pamäťového limitu procesu (`src/shared/middleware/admissionBudget.ts`):
  25 % z nižšej hodnoty medzi limitom haldy V8 a ľubovoľným limitom cgroup/kontajnera,
  vydelených 8-násobným faktorom prechodného znásobenia a obmedzených na rozsah od 8 MiB do
  2 GiB. Explicitné prepísania používajú rovnaké hranice. Rozpočet sa sám prispôsobuje od
  kontajnera s 512 MB až po pracovnú stanicu s 32 GB bez nastavovania premenných prostredia. Telo, ktoré sa
  nezmestí do efektívneho rozpočtu, okamžite zlyhá s `413 body_exceeds_budget`;
  do obmedzeného spravodlivého radu vstupujú iba konflikty medzi telami, ktoré možno samostatne obslúžiť.
  Aktívny nástroj na sledovanie tlaku na zdroje využívajúci viacero signálov (pomer využitia haldy V8,
  cgroup, PSI, udalosti OOM — `open-sse/utils/resourcePressurePolicy.ts`) skracuje
  obmedzené čakanie pri tlaku `high` a pri tlaku `critical` okamžite odmieta požiadavky s
  `503 resource_pressure` ešte pred prijatím akýchkoľvek bajtov.
  PSI sa číta zo súboru `memory.pressure` cgroup tejto jednotky, ak je k dispozícii
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` platí
  pre celý hostiteľský systém a používa sa iba ako záložná možnosť na fyzickom hardvéri / cgroup v1, takže hostiteľský systém
  využívajúci odkladací priestor nemôže spôsobiť odpoveď 503 v nečinnom kontajneri.
- **Ladenie:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — prepísanie automaticky odvodeného bajtového rozpočtu
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — starší limit počtu požiadaviek, iba na explicitné zapnutie
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — čakanie v rade pred odpoveďou 503 (predvolená hodnota 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — poistný ventil haldy podľa počtu bajtov v rade (predvolená hodnota 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — zastarané
    nastavenia bez účinku od #10110 (prijímajú sa kvôli kompatibilite konfigurácie, ale ignorujú sa)
- **Hlásenia:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — vrátane
  položiek pridaných v rámci #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` a `countCapEnabled`
  (pri predvolenom nasadení je hodnota false — potvrdzuje, že sa v skutočnosti uplatňuje bajtový rozpočet,
  nie starší limit počtu).

## 2. Adaptívne virtuálne dráhy za behu (`open-sse/services/admission`)

- **Rozsah:** riadenie prijímania podľa kľúča tenanta pri odosielaní poskytovateľovi — náklady frontu, prispôsobovanie limitov podľa latencie, zaraďovanie do frontov dráh a metriky dráh.
- **Aktivácia:** **voliteľná.** Funkcia je vypnutá, pokiaľ nie je nastavené `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Bez nej adaptívny radič zachováva správanie zdieľaného frontu (kritérium 1 z #9654 platí až po tom, čo operátor povolí dráhy).
- **Ladenie:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptívna konfigurácia (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Reporty:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (nepriehľadné ID dráh, nikdy nie nespracované kľúče) a `virtualLanes` — smerodajný príznak „dráhy sú zapnuté“ v snímke.

## 3. Sondy fan-out — riadenie prijímania podľa cieľa pre combo/fusion (#9654, vlna 2)

Combo (priorita / round-robin) a fusion rozvetvujú N cieľových modelov v rámci jednej nadradenej požiadavky. Od vlny 2 riešenia #9654 je **každý cieľ fan-out pred odoslaním kontrolovaný** sondou pre konkrétny cieľ (`PerTargetAdmissionHook`, vytvorenou pomocou `createPerTargetAdmissionHook`) voči dráhe tenanta **nadradenej požiadavky**.

- **Rozsah:** každý cieľ fan-out odoslaný mechanizmami combo, fusion a chaos. Systém 1 (na úrovni bajtov) tým nie je ovplyvnený — ciele fan-out nikdy nekontroluje sondou.
- **Aktivácia:** **voliteľná spolu so systémom 2.** Ak `OMNIROUTE_CHAT_VIRTUAL_LANES` nie je nastavené, nevykoná sa žiadna operácia — nadradená požiadavka už v tomto režime drží prenájom zdieľaného frontu, takže kontrola sondou by spôsobila dvojité započítanie a odmietnutie cieľov combo.
- **Sémantika:**
  - **Striktne neblokujúce — preskočiť, nikdy nezaradiť do frontu.** `maxWaitMs 0`: plná dráha spôsobí preskočenie cieľa a namiesto neho požiadavku obslúži záložný mechanizmus combo (alebo panel preživších mechanizmu fusion). Je to zámerné: cieľ fan-out predstavuje nadbytočnú prácu a jeho zaradenie do frontu pridáva ďalšiu záťaž presne do miesta preťaženia, ktorému majú dráhy zabrániť. `defaultMaxWaitMs` sa preto vzťahuje **iba na nadradenú požiadavku**; sondy fan-out nikdy nečakajú a zámerne neexistuje **žiadny prepínač**, ktorý by im umožnil čakať (história problému ukazuje, že prepínače čakania spôsobovali hromadný výskyt chýb 502/504, ktorému má #9654 zabrániť — túto možnosť treba znova zvážiť iba vtedy, ak operátor nahlási, že preskakovanie cieľov fan-out znižuje kvalitu odpovedí).
  - **Uvoľnenie po prijatí.** Prijatá sonda okamžite uvoľní svoj prenájom: ide o kapacitnú bránu, nie o rezerváciu. Prenájom nadradenej požiadavky pokrýva fan-out; držanie ďalších N prenájmov by umelo zvýšilo zdieľané aktívne náklady a spôsobilo odmietanie ostatných tenantov. Ide o mechanizmus s maximálnou snahou, nie o rezerváciu: dráha sa môže medzi kontrolou sondou a odoslaním znova zaplniť, takže pri veľkom súperení o kapacitu môže brána prijať cieľ do dráhy, ktorá je v čase jeho odoslania opäť plná.
  - **Cena odvodená zo skutočného tela fan-out.** Sonda odhaduje náklady zo skutočného tela cieľa — vrátane triedy požiadavky odvodenej od jeho príznaku `stream`, presne ako pri nadradenej ceste — takže členovia panela fusion (`stream: false`) sú ocenení podľa triedy bez streamovania, ktorú budú skutočne využívať, a ciele priority/RR podľa toho, čo požadoval používateľ.
- **Reporty:** preskočenie sondy po prvom cieli zvýši hodnotu `fallbackCount` mechanizmu combo pre danú požiadavku (v súlade s existujúcou sémantikou záložného spracovania; viditeľné v protokoloch combo); fusion vráti stav 503, keď sú preskočení všetci členovia panela. V súčasnosti sa v snímke nenachádza **žiadne súhrnné počítadlo** (napr. `virtualFanoutSkipped`) — ak operátor nahlási, že nedokáže zistiť, ako často brána dráhy preskakuje ciele fan-out, je to podnet na jeho pridanie.

## Ktorý systém sa zobrazuje na ovládacom paneli

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptívne virtuálne pruhy** (systém 2).
- `adaptiveAdmission.virtualLanes === true` → aktívne sú aj rozvetvovacie sondy zo sekcie 3. Payload, v ktorom `virtualLanes` chýba alebo má hodnotu `false`, znamená, že `OMNIROUTE_CHAT_VIRTUAL_LANES` nie je nastavená — pruhy na úrovni bajtov (systém 1) sú stále aktívne, ale nič v rámci `adaptiveAdmission` (ani riadenie rozvetvovania) sa neuplatňuje, kým sa táto funkcia nepovolí.

## Prečo existujú oba systémy

Pruhy na úrovni bajtov obmedzujú pamäťovo náročnú cestu parsovania/kompresie; adaptívne pruhy obmedzujú náklady na odosielanie pre jednotlivých tenantov. Kritérium 1 z #9654 („špička jednej relácie nespôsobí inej chybu 503“) je bezpodmienečne zabezpečené systémom 1 a po výslovnom povolení aj systémom 2.

## 4. Dlhé `/v1/responses` v jednom procese (zdravá rezerva)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) pridalo `tryAcquireHealthyHeadroom`, aby sa druhá štrukturálne náročná požiadavka prijala, keď je využitie haldy pod hodnotou `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Cesta BYTE používaná funkciou `admitChatRequest` (telá ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, predvolene 256 KiB, vrátane `POST /v1/responses`) používa **rovnakú** výnimku.

Toto je podporovaný postup pre **jeden proces**, ktorý umožňuje viac než dve súbežné dlhé SSE požiadavky `/v1/responses`: zvýšte primárny limit a zdravú rezervu len do takej miery, akú povoľuje halda a celoprocesový rozpočet bajtov spracúvaných požiadaviek (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Desiatky dlhých SSE klientov (40–50) sú otázkou tohto pamäťového rozpočtu, nie pevného produktového limitu „max. 2“. Pri preťažení haldy sa požiadavky naďalej odmietajú opakovateľnou chybou `503`, aby sa problém #7849 nevrátil.

Ak chcete **znásobiť haldy**, spustite N nezávislých `DATA_DIR` (#11024). Nikdy nepoužívajte `replicas > 1` nad jedným súborom SQLite (#10350). Táto sekcia neobnovuje diskusiu o postupe horizontálneho škálovania pomocou DATA_DIR.
