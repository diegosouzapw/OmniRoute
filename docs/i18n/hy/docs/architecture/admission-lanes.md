# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute-ն ունի գործընթացի ներսում գործող ուղիների **երկու** համակարգ՝ տարբեր ընդգրկույթներով։ Դրանք
փոխլրացնող են․ օպերատորները պետք է իմանան, թե դրանցից որն են դիտարկում։

## 1. Բայթային մակարդակով՝ ամբողջ գործընթացի ընդունում (`chatBodyAdmission.ts`)

- **Շրջանակը՝** `POST /v1/chat/completions`, `/v1/messages`,
  `/v1/responses` և չաթի կառուցվածք ունեցող մյուս երթուղիների բուֆերացված
  մարմնի/heap ուղին։ Պաշտպանում է ծրագրավորման գործակալների մեծ մարմինների
  պատճառով heap-ի ծավալի աճից (#4380)։
- **Մեկ ընդհանուր՝ ամբողջ գործընթացի համար նախատեսված վերահսկիչ, այլ ոչ թե
  առանձին ուղիներ յուրաքանչյուր բանալու համար (#10110)։** Յուրաքանչյուր API
  բանալի (հեշավորված) կամ `anonymous` աշխատաշրջան ընդունման ժամանակ օգտագործում է
  **նույն** ընդհանուր բյուջեն․ հեշավորված աշխատաշրջանի նույնացուցիչն օգտագործվում է
  ՄԻԱՅՆ որպես արդար պլանավորման բանալի (սպասողների միջև շրջանաձև բաշխում), և ոչ
  երբեք որպես տարողության բաժանման միջոց։ Այս փաստաթղթի նախորդ տարբերակը
  նկարագրում էր յուրաքանչյուր բանալու համար անկախ տարողությամբ առանձին ուղիներ․
  այդ մոդելը հեռացվեց #10110-ում, քանի որ այն թույլ էր տալիս չնույնականացված
  կեղծ հավատարմագրերով բազմապատկել ամբողջ գործընթացի սահմանաչափը։
- **Դարպաս (#503-fanout)՝ ավտոմատ հաշվարկվող ընդունման ԲԱՅԹԱՅԻՆ բյուջե, այլ ոչ
  թե հարցումների ֆիքսված քանակ։** Հին `CHAT_MAX_HEAVY_IN_FLIGHT`
  հարցումների քանակի սահմանաչափը (մինչ այս ուղղումը՝ լռելյայն `1`) ծրագրավորման
  գործակալների զուգահեռ բաշխումը (մի քանի ենթագործակալներ/CLI-ներ, որոնց
  մարմինները սովորաբար > 256 KB են) նվազեցնում էր մինչև մոտավորապես 1
  արդյունավետ զուգահեռություն, ինչի պատճառով լիովին սովորական բեռնվածության
  դեպքում վերադարձվում էր 503։ Այժմ այն կիրառվում է միայն այն դեպքում, երբ
  օպերատորը հստակորեն սահմանում է `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`։
  Եթե այն սահմանված չէ, ընդունումը փոխարենը վերահսկվում է
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`-ով՝ գործընթացի իրական հիշողության
  առավելագույն շեմից ավտոմատ հաշվարկվող բյուջեով
  (`src/shared/middleware/admissionBudget.ts`)․ V8 heap-ի սահմանաչափից և
  cgroup/կոնտեյների ցանկացած սահմանաչափից ավելի խիստի 25%-ը՝ բաժանված ժամանակավոր
  8-ապատիկ աճի գործակցի վրա և սահմանափակված 8 MiB-ից մինչև 2 GiB միջակայքում։
  Հստակորեն նշված վերասահմանումներն օգտագործում են նույն սահմանափակումները։
  Սա առանց միջավայրի փոփոխականների կարգաբերման ինքնաբերաբար մասշտաբավորվում է
  512 MB կոնտեյներից մինչև 32 GB աշխատասեղանային համակարգ։ Մարմինը, որը չի
  տեղավորվում արդյունավետ բյուջեի սահմաններում, անմիջապես ձախողվում է
  `413 body_exceeds_budget`-ով․ միայն առանձին-առանձին սպասարկելի մարմինների միջև
  մրցակցությունն է մտնում սահմանափակ արդարության հերթ։ Ռեսուրսների ճնշման
  բազմաազդանշան իրական ժամանակի հետագծիչը (V8 heap-ի հարաբերակցություն, cgroup,
  PSI, OOM իրադարձություններ՝ `open-sse/utils/resourcePressurePolicy.ts`)
  կրճատում է սահմանափակ սպասումը `high` ճնշման դեպքում և անմիջապես մերժում է
  `503 resource_pressure`-ով `critical` ճնշման դեպքում՝ նախքան որևէ բայթի
  ընդունումը։ Առկայության դեպքում PSI-ն ընթերցվում է այս միավորի cgroup-ի
  `memory.pressure`-ից (`open-sse/utils/resourcePressureSampler.ts`)․
  `/proc/pressure/memory`-ը վերաբերում է ամբողջ հոսթին և օգտագործվում է միայն
  որպես պահուստային տարբերակ ֆիզիկական սերվերի / cgroup v1-ի դեպքում, որպեսզի
  փոխանակման հիշողություն օգտագործող հոսթը չկարողանա պարապ կոնտեյների համար
  վերադարձնել 503։
- **Կարգաբերում՝**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ավտոմատ հաշվարկվող բայթային բյուջեի վերասահմանում
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — հարցումների քանակի հին սահմանաչափ, միայն հստակ միացմամբ
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — հերթում սպասելու ժամանակը մինչև 503 (լռելյայն՝ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — հերթագրված բայթերի heap-ի կարգավորիչ (լռելյայն՝ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110-ից ի վեր հնացած
    և գործողություն չկատարող (ընդունվում են կազմաձևման համատեղելիության համար, սակայն անտեսվում են)
- **Հաշվետվություններ՝** `GET /api/monitoring/health` → `chatAdmission` (#11244)՝
  ներառյալ #503-fanout-ի հավելումները՝ `inflightBytes`, `maxInflightBytes`,
  `budgetSource` (`v8_heap` | `cgroup` | `override`), `pressureSeverity` և
  `countCapEnabled` (լռելյայն տեղակայման դեպքում՝ false․ հաստատում է, որ
  իրականում սահմանափակողը բայթային բյուջեն է, ոչ թե հարցումների քանակի հին
  սահմանաչափը)։

## 2. Հարմարվողական գործարկման ժամանակի վիրտուալ ուղիներ (`open-sse/services/admission`)

- **Կիրառման շրջանակը․** մատակարարին ուղարկելու համար tenant-ի բանալիով ընդունում՝ հերթի արժեք, ուշացմամբ առաջնորդվող
  սահմանաչափի հարմարեցում, ուղիների հերթագրում և ուղիների չափորոշիչներ։
- **Միացման պայմանը․** **ըստ ցանկության։** Անջատված է, եթե `OMNIROUTE_CHAT_VIRTUAL_LANES=true` սահմանված չէ։ Առանց դրա
  հարմարվողական կարգավորիչը պահպանում է ընդհանուր հերթի վարքագիծը (#9654-ի 1-ին չափանիշը
  գործում է միայն այն բանից հետո, երբ օպերատորը միացնում է ուղիները)։
- **Կարգավորում․** `OMNIROUTE_CHAT_VIRTUAL_LANES` + հարմարվողական կազմաձև (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)։
- **Հաշվետվություններ․** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ուղիների անթափանց ID-ներ, երբեք՝ չմշակված
  բանալիներ) և `virtualLanes`՝ պատկերի մեջ «ուղիները միացված են» վիճակի հեղինակավոր դրոշը։

## 3. Fan-out զոնդեր՝ յուրաքանչյուր թիրախի ընդունում combo/fusion-ի համար (#9654 Wave 2)

Combo-ն (առաջնահերթություն / շրջանաձև հերթափոխ) և fusion-ը մեկ ծնող
հարցման ներքո հարցումներն ուղղում են դեպի N մոդելային թիրախներ։ #9654 Wave 2-ից ի վեր **յուրաքանչյուր fan-out թիրախ ստուգվում է ուղարկումից առաջ**՝
յուրաքանչյուր թիրախի համար նախատեսված զոնդով (`PerTargetAdmissionHook`, որը ստեղծվում է `createPerTargetAdmissionHook`-ի միջոցով)՝
**ծնողի** tenant ուղու նկատմամբ։

- **Կիրառման շրջանակը․** combo-ի, fusion-ի և քաոսի շարժիչի կողմից ուղարկվող յուրաքանչյուր fan-out թիրախ։
  Համակարգ 1-ը (բայթային մակարդակ) չի ազդվում․ այն երբեք չի ստուգում fan-out թիրախները։
- **Միացման պայմանը․** **ըստ ցանկության՝ համակարգ 2-ի հետ։** Երբ `OMNIROUTE_CHAT_VIRTUAL_LANES`
  սահմանված չէ, ոչինչ չի անում․ այդ ռեժիմում ծնող հարցումն արդեն ունի ընդհանուր հերթի վարձակալումը,
  ուստի զոնդավորումը կրկնակի կհաշվեր և կմերժեր combo-ի թիրախները։
- **Իմաստաբանություն․**
  - **Խիստ ոչ արգելափակող՝ բաց թողնել, երբեք չհերթագրել։** `maxWaitMs 0`․ լցված ուղին
    բաց է թողնում թիրախը, և դրա փոխարեն սպասարկում է combo-ի պահուստային մեխանիզմը (կամ fusion-ի
    պահպանված տարրերի վահանակը)։ Սա միտումնավոր է․ fan-out թիրախը կրկնօրինակ աշխատանք է,
    իսկ այն հերթագրելը լրացուցիչ ծանրաբեռնվածություն է կուտակում հենց այն գերբեռնված ուղիների վրա, որոնք
    նախատեսված են դա կանխելու համար։ Հետևաբար `defaultMaxWaitMs`-ը կիրառվում է **միայն ծնող հարցման** նկատմամբ․
    fan-out զոնդերը երբեք չեն սպասում, և միտումնավոր **որևէ կարգավորիչ չկա**, որը
    կստիպեր դրանց սպասել (խնդրի պատմությունը ցույց է տալիս, որ սպասման կարգավորիչները հանգեցրել են զանգվածային 502/504 սխալների այն դասին,
    որը կանխում է #9654-ը․ վերանայել միայն այն դեպքում, եթե օպերատորը հայտնում է, որ բաց թողնված fan-out թիրախները
    վնասում են պատասխանի որակին)։
  - **Ազատում ընդունումից հետո։** Ընդունված զոնդն անմիջապես ազատում է իր վարձակալումը․ այն
    հզորության անցակետ է, ոչ թե պահում։ Ծնողի վարձակալումն ընդգրկում է fan-out-ը․ ևս N
    վարձակալում պահելը կուռճացներ ընդհանուր ակտիվ արժեքը և կմերժեր մյուս tenant-ներին։ Սա լավագույն ջանքով
    կատարվող ստուգում է, ոչ թե ամրագրում․ ուղին կարող է կրկին լցվել զոնդավորման և ուղարկման միջև, ուստի
    ուժեղ մրցակցության պայմաններում անցակետը կարող է ընդունել թիրախը մի ուղի, որը թիրախի
    ուղարկման պահին կրկին լցված է։
  - **Գնահատվում է իրական fan-out մարմնի հիման վրա։** Զոնդն արժեքը գնահատում է
    թիրախի փաստացի մարմնից՝ ներառյալ դրա `stream` դրոշից ստացված հարցման դասը,
    ճիշտ այնպես, ինչպես ծնող ուղու դեպքում, այնպես որ fusion վահանակի անդամները (`stream: false`)
    գնահատվում են ըստ ոչ հոսքային դասի, որը նրանք իրականում կզբաղեցնեն, իսկ առաջնահերթության/RR
    թիրախները՝ ըստ օգտատիրոջ պահանջած տարբերակի։
- **Հաշվետվություններ․** առաջին թիրախից հետո զոնդի բացթողումը մեծացնում է combo-ի՝ յուրաքանչյուր հարցման
  `fallbackCount`-ը (արտացոլելով արդեն առկա պահուստային անցման իմաստաբանությունը․ տեսանելի է combo-ի
  մատյաններում)։ Fusion-ը վերադարձնում է 503, երբ վահանակի բոլոր անդամները բաց են թողնվում։ Այս պահին պատկերի մեջ
  **ընդհանրացված հաշվիչ չկա** (օրինակ՝ `virtualFanoutSkipped`)․
  եթե օպերատորը հայտնում է, որ չի կարող պարզել, թե ուղու անցակետը որքան հաճախ է բաց թողնում fan-out
  թիրախները, դա այդպիսի հաշվիչ ավելացնելու ազդակն է։

## Որն է ցուցադրվում կառավարման վահանակում

- `adaptiveAdmission.laneCount` / `laneTenants` → **ադապտիվ վիրտուալ ուղիներ** (համակարգ 2)։
- `adaptiveAdmission.virtualLanes === true` → բաժին 3-ի ճյուղավորվող ստուգումները
  նույնպես ակտիվ են։ Այն payload-ը, որում `virtualLanes`-ը բացակայում է կամ `false` է, նշանակում է,
  որ `OMNIROUTE_CHAT_VIRTUAL_LANES`-ը սահմանված չէ․ բայթային մակարդակի ուղիները (համակարգ 1)
  դեռ ակտիվ են, սակայն `adaptiveAdmission`-ի ներքո ոչինչ (ինչպես նաև ճյուղավորման սահմանափակումները)
  ուժի մեջ չէ, քանի դեռ այն միացված չէ։

## Ինչու են երկուսն էլ գոյություն ունենում

Բայթային մակարդակի ուղիները սահմանափակում են հիշողության մեծ ծախս պահանջող վերլուծման/սեղմման ուղին,
իսկ ադապտիվ ուղիները սահմանափակում են յուրաքանչյուր վարձակալի առաքման ծախսը։ #9654-ի չափանիշ 1-ը
(«մեկ աշխատաշրջանի կտրուկ աճը մյուսի համար 503 չի առաջացնում») համակարգ 1-ի կողմից կիրառվում է
անվերապահորեն, իսկ համակարգ 2-ի կողմից՝ կամընտրական միացումը ակտիվացնելուց հետո։

## 4. Մեկ պրոցեսով երկարատև `/v1/responses` (առողջ պահուստային հզորություն)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-ում ավելացվել է
`tryAcquireHealthyHeadroom`-ը, որպեսզի կառուցվածքային առումով ծանր երկրորդ հարցումն ընդունվի,
երբ heap-ը ցածր է `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ից։ `admitChatRequest`-ի
կողմից օգտագործվող BYTE ուղին (`OMNIROUTE_CHAT_LARGE_BODY_BYTES`-ից մեծ կամ հավասար մարմիններ,
լռելյայն՝ 256 KiB, ներառյալ `POST /v1/responses`-ը) օգտագործում է **նույն** շրջանցման մեխանիզմը։

Սա աջակցվող **մեկ պրոցեսով** բաղադրատոմսն է երկուից ավելի միաժամանակյա երկարատև
SSE `/v1/responses` հարցումների համար․ հիմնական + առողջ պահուստային հզորությունը մեծացրեք
միայն այնքան, որքան թույլ են տալիս heap-ը և ամբողջ պրոցեսի՝ ընթացքի մեջ գտնվող բայթերի բյուջեն
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)։ Տասնյակ երկարատև SSE հաճախորդների (40–50)
սպասարկումը հիշողության բյուջեի հարց է, այլ ոչ թե արտադրանքի «առավելագույնը 2» կոշտ սահմանափակում։
Ճնշման տակ գտնվող heap-ը շարունակում է մերժել հարցումները՝ վերադարձնելով կրկին փորձելու հնարավորություն
տվող `503`, որպեսզի #7849-ը չվերադառնա։

Heap-երի քանակը **բազմապատկելու** համար գործարկեք N անկախ `DATA_DIR`-եր (#11024)։
Երբեք մի օգտագործեք `replicas > 1` մեկ SQLite ֆայլի վրա (#10350)։ Այս բաժինը
DATA_DIR-ի միջոցով մասշտաբավորման բաղադրատոմսը վերաբացելու փորձ չէ։
