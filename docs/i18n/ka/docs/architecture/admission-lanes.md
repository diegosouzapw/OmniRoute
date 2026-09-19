# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute-ს აქვს **ორი** პროცეს-ლოკალური ზოლების სისტემა, განსხვავებული მოქმედების არეალებით. ისინი
ერთმანეთს ავსებენ; ოპერატორებმა უნდა იცოდნენ, რომელ მათგანს აკვირდებიან.

## 1. ბაიტების დონეზე, მთელი პროცესისთვის მოქმედი დაშვების კონტროლი (`chatBodyAdmission.ts`)

- **მოქმედების არეალი:** ბუფერიზებული სხეულის/heap-ის გზა `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` და ჩატის ფორმის მქონე სხვა მარშრუტებისთვის. იცავს
  heap-ის გაძლიერებული მოხმარებისგან, რომელსაც კოდის აგენტების დიდი სხეულები იწვევს (#4380).
- **ერთი პროცესის მასშტაბით გლობალური კონტროლერი და არა ცალკეული ზოლები თითოეული გასაღებისთვის (#10110).** ყოველი API-გასაღები
  (ჰეშირებული) ან `anonymous` სესია დაშვებას ითხოვს **ერთი და იმავე** საერთო ბიუჯეტიდან —
  ჰეშირებული სესიის ID გამოიყენება მხოლოდ სამართლიანი დაგეგმვის გასაღებად (მომლოდინეებს შორის
  round-robin განაწილებისთვის) და არასოდეს — გამტარუნარიანობის ცალკეულ ნაწილად. ამ
  დოკუმენტის წინა ვერსიაში აღწერილი იყო თითოეული გასაღებისთვის ცალკე ზოლები, დამოუკიდებელი
  გამტარუნარიანობით; ეს მოდელი წაიშალა #10110-ში, რადგან ის არაავთენტიფიცირებულ ყალბ
  ავტორიზაციის მონაცემებს მთელი პროცესისთვის დაწესებული ზღვრის გამრავლების საშუალებას აძლევდა.
- **კარიბჭე (#503-fanout): ავტომატურად გამოთვლილი მიღების ბაიტური ბიუჯეტი და არა მოთხოვნების ფიქსირებული
  რაოდენობა.** ძველი `CHAT_MAX_HEAVY_IN_FLIGHT` მოთხოვნების რაოდენობის ზღვარი (ნაგულისხმევად `1`
  ამ შესწორებამდე) კოდის აგენტების განშტოებულ პარალელურ მუშაობას (მრავალი ქვეაგენტი/CLI,
  სხეულები, რომლებიც ჩვეულებრივ > 256 KB-ია) ეფექტურ კონკურენტულობამდე ~1 ზღუდავდა, რის გამოც
  სრულიად ნორმალური დატვირთვისას 503 პასუხები ბრუნდებოდა. ახლა ის შეზღუდვას მხოლოდ მაშინ
  აწესებს, როდესაც ოპერატორი აშკარად მიუთითებს `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`-ს. თუ ის
  მითითებული არ არის, დაშვებას სანაცვლოდ ზღუდავს `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — პროცესის
  რეალური მეხსიერების ჭერიდან ავტომატურად გამოთვლილი ბიუჯეტი (`src/shared/middleware/admissionBudget.ts`):
  V8 heap-ის ლიმიტსა და ნებისმიერ cgroup/კონტეინერის ლიმიტს შორის უმცირესის 25%,
  გაყოფილი დროებითი 8x გაძლიერების კოეფიციენტზე და შეზღუდული 8 MiB-დან
  2 GiB-მდე. აშკარად მითითებულ გადაფარვებზეც იგივე საზღვრები მოქმედებს. ეს ავტომატურად მასშტაბირდება
  512 MB-იანი კონტეინერიდან 32 GB-იან სამუშაო კომპიუტერამდე, გარემოს ცვლადების გამართვის გარეშე. სხეული, რომელიც
  ეფექტურ ბიუჯეტში ვერ ეტევა, დაუყოვნებლივ უარყოფილია პასუხით `413 body_exceeds_budget`;
  სამართლიანობის შეზღუდულ რიგში ხვდება მხოლოდ კონკურენცია იმ სხეულებს შორის, რომელთა ცალ-ცალკე დამუშავებაც
  შესაძლებელია. რეალურ დროში მოქმედი, მრავალსიგნალიანი რესურსებზე ზეწოლის ტრეკერი (V8 heap-ის თანაფარდობა,
  cgroup, PSI, OOM მოვლენები — `open-sse/utils/resourcePressurePolicy.ts`) ამცირებს
  შეზღუდულ ლოდინის დროს `high` წნეხისას და დაუყოვნებლივ უარყოფს მოთხოვნას
  `503 resource_pressure` პასუხით `critical` წნეხისას, ჯერ კიდევ მანამდე, სანამ რომელიმე ბაიტი
  იქნება მიღებული.
- **გამართვა:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ავტომატურად გამოთვლილი ბაიტური ბიუჯეტის გადაფარვა
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — მოთხოვნების რაოდენობის ძველი ზღვარი, მხოლოდ აშკარად ჩართვის შემთხვევაში
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — რიგში ლოდინის დრო 503 პასუხამდე (ნაგულისხმევად 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — რიგში მყოფი ბაიტებისთვის heap-ის დამცავი სარქველი (ნაგულისხმევად 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — მოძველებულია და
    #10110-ის შემდეგ არაფერს აკეთებს (მიიღება კონფიგურაციასთან თავსებადობისთვის, მაგრამ იგნორირდება)
- **ანგარიშები:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — მათ შორის,
  #503-fanout-ში დამატებული `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` და `countCapEnabled`
  (ნაგულისხმევ განთავსებაში false — ადასტურებს, რომ რეალურად შემზღუდველია ბაიტური ბიუჯეტი და არა ძველი
  რაოდენობრივი ზღვარი).

## 2. ადაპტიური runtime ვირტუალური ზოლები (`open-sse/services/admission`)

- **მოქმედების არეალი:** tenant-key დაშვება პროვაიდერთან გადამისამართებისთვის — რიგის ღირებულება, დაყოვნებაზე ორიენტირებული
  ლიმიტის ადაპტაცია, ზოლებში რიგის ორგანიზება და ზოლების მეტრიკები.
- **ჩამრთველი:** **opt-in.** გამორთულია, თუ `OMNIROUTE_CHAT_VIRTUAL_LANES=true` არ არის მითითებული. მის გარეშე
  ადაპტიური კონტროლერი ინარჩუნებს საზიარო რიგის ქცევას (#9654-ის მხოლოდ 1-ლი კრიტერიუმი
  სრულდება მას შემდეგ, რაც ოპერატორი ზოლებს ჩართავს).
- **გამართვა:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + ადაპტიური კონფიგურაცია (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **ანგარიშები:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ზოლის გაუმჭვირვალე ID-ები, არასდროს დაუმუშავებელი
  გასაღებები) და `virtualLanes` — სნეპშოტში ავტორიტეტული დროშა, რომელიც მიუთითებს, რომ „ზოლები ჩართულია“.

## 3. Fan-out შემოწმებები — თითოეული სამიზნის დაშვება combo/fusion-ისთვის (#9654 Wave 2)

Combo (პრიორიტეტული / round-robin) და fusion ერთი მშობელი მოთხოვნის ფარგლებში N მოდელის სამიზნეზე
ახორციელებენ fan-out-ს. #9654 Wave 2-იდან მოყოლებული, **თითოეული fan-out სამიზნე გადამისამართებამდე მოწმდება**
თითოეული სამიზნის შემოწმებით (`PerTargetAdmissionHook`, შექმნილი `createPerTargetAdmissionHook`-ის მიერ)
**მშობლის** tenant ზოლთან მიმართებით.

- **მოქმედების არეალი:** combo-ს, fusion-ისა და chaos ძრავის მიერ გადამისამართებული ყველა fan-out სამიზნე.
  სისტემა 1-ზე (ბაიტების დონე) ეს არ მოქმედებს — ის fan-out სამიზნეებს არასდროს ამოწმებს.
- **ჩამრთველი:** **opt-in სისტემა 2-თან ერთად.** არაფერს აკეთებს, როცა `OMNIROUTE_CHAT_VIRTUAL_LANES`
  არ არის დაყენებული — ამ რეჟიმში მშობელ მოთხოვნას უკვე უჭირავს საზიარო რიგის იჯარა,
  ამიტომ შემოწმება ორმაგად დაითვლიდა და combo-ს სამიზნეებს უარყოფდა.
- **სემანტიკა:**
  - **მკაცრად არაბლოკირებადი — გამოტოვება, არასდროს რიგში ჩაყენება.** `maxWaitMs 0`: სავსე ზოლი
    გამოტოვებს სამიზნეს და მის ნაცვლად მომსახურებას უზრუნველყოფს combo-ს სარეზერვო მექანიზმი (ან fusion-ის
    გადარჩენილი პანელი). ეს მიზანმიმართულია: fan-out სამიზნე დუბლირებადი
    სამუშაოა, ხოლო მისი რიგში ჩაყენება კიდევ უფრო ზრდის დატვირთვას ზუსტად იმ გადატვირთულ ადგილებში, რომლის
    შესაჩერებლადაც არსებობს ზოლები. შესაბამისად, `defaultMaxWaitMs` ვრცელდება **მხოლოდ მშობელ მოთხოვნაზე**;
    fan-out შემოწმებები არასდროს იცდიან და განზრახ **არ არსებობს პარამეტრი**, რომელიც
    მათ ლოდინს აიძულებს (საკითხის ისტორია აჩვენებს, რომ ლოდინის პარამეტრები იწვევდა მასობრივ 502/504 კლასს,
    რომლის თავიდან ასაცილებლადაც არსებობს #9654 — ამას მხოლოდ მაშინ გადავხედოთ, თუ ოპერატორი განაცხადებს, რომ გამოტოვებული fan-out სამიზნეები
    პასუხის ხარისხს აზიანებს).
  - **გათავისუფლება დაშვებისას.** დაშვებული შემოწმება თავის იჯარას დაუყოვნებლივ ათავისუფლებს: ის არის
    სიმძლავრის კარიბჭე და არა დაჭერა. მშობლის იჯარა ფარავს fan-out-ს; კიდევ N
    იჯარის დაჭერა ხელოვნურად გაზრდიდა საზიარო აქტიურ ღირებულებას და სხვა tenant-ებს უარყოფდა. ეს არის მაქსიმალური მცდელობა
    და არა რესურსის დაჯავშნა: შემოწმებასა და გადამისამართებას შორის ზოლი შეიძლება კვლავ შეივსოს, ამიტომ
    მაღალი კონკურენციის პირობებში კარიბჭემ შესაძლოა სამიზნე დაუშვას ზოლში, რომელიც
    სამიზნის გადამისამართების მომენტისთვის ისევ სავსეა.
  - **ფასი გამოითვლება რეალური fan-out სხეულიდან.** შემოწმება ღირებულებას აფასებს
    სამიზნის ფაქტობრივი სხეულიდან — მათ შორის, მისი `stream` დროშიდან მიღებული მოთხოვნის კლასის გათვალისწინებით,
    ზუსტად ისე, როგორც მშობლის გზაზე — ამიტომ fusion პანელის წევრები (`stream: false`)
    ფასდებიან იმ არასტრულად დამუშავების კლასით, რომელსაც ისინი რეალურად დაიკავებენ, ხოლო priority/RR
    სამიზნეები — მომხმარებლის მოთხოვნის შესაბამისად.
- **ანგარიშები:** პირველი სამიზნის შემდეგ შემოწმების მიერ სამიზნის გამოტოვება ზრდის combo-ს თითოეული მოთხოვნის
  `fallbackCount`-ს (არსებული fallback სემანტიკის შესაბამისად; ხილულია combo-ს
  ჟურნალებში); fusion აბრუნებს 503-ს, როცა პანელის ყველა წევრი გამოტოვებულია. ამჟამად სნეპშოტში
  **არ არსებობს აგრეგირებული მრიცხველი** (მაგ., `virtualFanoutSkipped`) —
  თუ ოპერატორი განაცხადებს, რომ ვერ ადგენს, რამდენად ხშირად გამოტოვებს ზოლის კარიბჭე fan-out
  სამიზნეებს, ეს იქნება ასეთი მრიცხველის დამატების საფუძველი.

## რომელი მათგანი ჩანს დაფაზე

- `adaptiveAdmission.laneCount` / `laneTenants` → **ადაპტიური ვირტუალური ზოლები** (სისტემა 2).
- `adaptiveAdmission.virtualLanes === true` → მე-3 განყოფილების განშტოებადი შემოწმებებიც
  აქტიურია. payload, რომელშიც `virtualLanes` არ არის ან `false`-ია, ნიშნავს, რომ
  `OMNIROUTE_CHAT_VIRTUAL_LANES` არ არის დაყენებული — ბაიტების დონის ზოლები (სისტემა 1)
  კვლავ აქტიურია, მაგრამ მის ჩართვამდე `adaptiveAdmission`-ის ქვეშ არაფერი მოქმედებს
  (არც განშტოებების შეზღუდვა).

## რატომ არსებობს ორივე

ბაიტების დონის ზოლები ზღუდავს მეხსიერების ინტენსიურად მომხმარებელ დამუშავების/შეკუმშვის გზას; ადაპტიური ზოლები
ზღუდავს დისპეტჩერიზაციის ღირებულებას თითოეულ tenant-ზე. #9654-ის კრიტერიუმი 1 („ერთი სესიის მკვეთრი ნაკადი
მეორეს 503-ს არ უნდა უბრუნებდეს“) უპირობოდ უზრუნველყოფილია სისტემა 1-ის მიერ, ხოლო opt-in-ის ჩართვის შემდეგ — სისტემა 2-ის მიერაც.

## 4. ერთი პროცესის ხანგრძლივი `/v1/responses` (ჯანსაღი თავისუფალი რესურსი)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-მა დაამატა
`tryAcquireHealthyHeadroom`, რათა მეორე, სტრუქტურულად მძიმე მოთხოვნა დაშვებული იყოს,
როდესაც heap `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ზე დაბალია. `admitChatRequest`-ის მიერ გამოყენებული BYTE
გზა (body-ები ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
ნაგულისხმევად 256 KiB, `POST /v1/responses`-ის ჩათვლით) იყენებს **იმავე** გამონაკლისს.

ეს არის მხარდაჭერილი **ერთპროცესიანი** რეცეპტი ორზე მეტი ერთდროული ხანგრძლივი
SSE `/v1/responses`-ისთვის: გაზარდეთ ძირითადი + ჯანსაღი თავისუფალი რესურსი მხოლოდ იმდენად, რამდენადაც ამის საშუალებას იძლევა heap
და მთელი პროცესის მასშტაბით მიმდინარე ბაიტების ბიუჯეტი (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). ათობით ხანგრძლივი SSE კლიენტი (40–50) მეხსიერების ბიუჯეტის
საკითხია და არა პროდუქტის მკაცრი „მაქს. 2“ ლიმიტი. დატვირთული heap კვლავ უარყოფს მოთხოვნებს
ხელახლა ცდადი `503`-ით, რათა #7849 არ დაბრუნდეს.

heap-ების რაოდენობის **გასამრავლებლად**, გაუშვით N დამოუკიდებელი `DATA_DIR` (#11024). არასოდეს გამოიყენოთ
`replicas > 1` ერთ SQLite ფაილზე (#10350). ეს განყოფილება არ წარმოადგენს
DATA_DIR-ის ჰორიზონტალური მასშტაბირების რეცეპტის ხელახლა განხილვას.
