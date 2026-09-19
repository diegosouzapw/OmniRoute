# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute are **două** sisteme de benzi locale procesului, cu domenii de aplicare diferite. Acestea sunt
complementare; operatorii trebuie să știe pe care dintre ele îl examinează.

## 1. Admitere la nivel de octet pentru întregul proces (`chatBodyAdmission.ts`)

- **Domeniu de aplicare:** calea corpului stocat în memoria tampon/heap pentru `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` și celelalte rute de tip chat. Protejează
  împotriva amplificării consumului de heap cauzate de corpurile mari trimise de agenții de programare (#4380).
- **Un singur controler global pentru proces, nu benzi per cheie (#10110).** Fiecare cheie API
  (cu hash) sau sesiune `anonymous` este admisă în raport cu **același** buget comun —
  identificatorul de sesiune cu hash este utilizat NUMAI drept cheie de planificare echitabilă (distribuire
  round-robin între solicitările în așteptare), niciodată drept partiție de capacitate. O versiune anterioară a acestei
  documentații descria benzi per cheie cu capacitate independentă; acel model a fost
  eliminat în #10110 deoarece permitea acreditărilor false neautentificate să multiplice
  limita la nivelul întregului proces.
- **Poartă (#503-fanout): un buget de ingestie în OCTEȚI derivat automat, nu un număr fix
  de solicitări.** Limita veche bazată pe numărul de solicitări, `CHAT_MAX_HEAVY_IN_FLIGHT` (implicit `1`
  înainte de această remediere), reducea ramificarea agenților de programare (mai mulți subagenți/CLI-uri,
  corpuri de regulă > 256 KB) la un nivel efectiv de concurență de ~1, ceea ce genera răspunsuri 503
  în condiții de încărcare complet normale. Acum, aceasta se aplică numai când un operator setează explicit
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Dacă nu este setată, admiterea este în schimb
  controlată de `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — un buget derivat automat din
  limita reală de memorie a procesului (`src/shared/middleware/admissionBudget.ts`):
  25% din cea mai restrictivă valoare dintre limita heap-ului V8 și orice limită de cgroup/container,
  împărțită la un factor de amplificare tranzitorie de 8x și limitată între 8 MiB și
  2 GiB. Suprascrierile explicite utilizează aceleași limite. Aceasta se dimensionează automat de la un
  container de 512 MB până la un sistem desktop de 32 GB, fără ajustarea variabilelor de mediu. Un corp care nu
  încape în bugetul efectiv eșuează imediat cu `413 body_exceeds_budget`;
  numai concurența dintre corpuri care pot fi deservite individual intră în coada
  limitată pentru echitate. Un sistem live de monitorizare a presiunii asupra resurselor bazat pe mai multe semnale (raportul heap-ului V8,
  cgroup, PSI, evenimente OOM — `open-sse/utils/resourcePressurePolicy.ts`) scurtează
  timpul limitat de așteptare sub presiune `high` și respinge imediat solicitările cu
  `503 resource_pressure` sub presiune `critical`, înainte ca orice octet să fie
  ingerat.
- **Ajustare:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — suprascriere pentru bugetul de octeți derivat automat
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — limită veche bazată pe numărul de solicitări, numai cu activare explicită
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — timpul de așteptare în coadă înainte de 503 (implicit 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — supapă pentru heap bazată pe octeții aflați în coadă (implicit 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — opțiuni depreciate
    fără efect începând cu #10110 (acceptate pentru compatibilitatea configurației, ignorate)
- **Rapoarte:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — inclusiv
  câmpurile adăugate în #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` și `countCapEnabled`
  (false într-o implementare implicită — confirmă că bugetul de octeți, nu limita veche
  bazată pe număr, este cel care se aplică efectiv).

## 2. Benzi virtuale adaptive la rulare (`open-sse/services/admission`)

- **Domeniu:** admitere pe baza cheii locatarului pentru expedierea către furnizor — costul cozii, adaptarea limitei ghidată de latență, plasarea în cozile benzilor și metricile benzilor.
- **Activare:** **opțională.** Dezactivată dacă `OMNIROUTE_CHAT_VIRTUAL_LANES=true` nu este setată. Fără aceasta, controlerul adaptiv păstrează comportamentul cozii partajate (criteriul 1 din #9654 se aplică doar după ce un operator activează benzile).
- **Configurare:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + configurația adaptivă (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Raportare:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID-uri opace ale benzilor, niciodată chei brute) și `virtualLanes` — indicatorul oficial din instantaneu că „benzile sunt activate”.

## 3. Sonde de distribuire — admitere per destinație pentru combo/fusion (#9654 Valul 2)

Combo (prioritate / round-robin) și fusion distribuie către N destinații de model în cadrul unei singure solicitări părinte. Începând cu #9654 Valul 2, **fiecare destinație de distribuire este verificată înainte de expediere** printr-o sondă per destinație (`PerTargetAdmissionHook`, construită de `createPerTargetAdmissionHook`) față de banda locatarului **părinte**.

- **Domeniu:** fiecare destinație de distribuire expediată de combo, fusion și motorul de haos. Sistemul 1 (la nivel de octet) nu este afectat — acesta nu sondează niciodată destinațiile de distribuire.
- **Activare:** **opțională împreună cu sistemul 2.** Nu efectuează nicio operație când `OMNIROUTE_CHAT_VIRTUAL_LANES` nu este setată — în acel mod, solicitarea părinte deține deja permisul cozii partajate, astfel încât sondarea ar contabiliza de două ori și ar respinge destinațiile combo.
- **Semantică:**
  - **Strict neblocantă — omite, nu pune niciodată în coadă.** `maxWaitMs 0`: o bandă plină determină omiterea destinației, iar mecanismul de rezervă al combo-ului (sau panoul de supraviețuitori al fusion) preia procesarea. Acest comportament este intenționat: o destinație de distribuire reprezintă muncă redundantă, iar plasarea sa în coadă adaugă și mai multă sarcină exact congestiei pe care benzile trebuie să o oprească. Prin urmare, `defaultMaxWaitMs` se aplică **doar solicitării părinte**; sondele de distribuire nu așteaptă niciodată și, în mod intenționat, **nu există nicio opțiune** care să le facă să aștepte (istoricul problemei arată că opțiunile de așteptare au produs categoria de erori 502/504 în masă pe care #9654 o previne — reconsiderați doar dacă un operator raportează că destinațiile de distribuire omise afectează calitatea răspunsului).
  - **Eliberare la admitere.** O sondă admisă își eliberează imediat permisul: este o poartă de capacitate, nu o rezervare. Permisul solicitării părinte acoperă distribuirea; păstrarea altor N permise ar umfla artificial costul activ partajat și ar respinge alți locatari. Se aplică principiul „efort maxim”, nu o rezervare: banda se poate umple din nou între sondare și expediere, astfel încât, în condiții de concurență intensă, poarta poate admite într-o bandă care este din nou plină în momentul expedierii către destinație.
  - **Cost calculat din corpul real al distribuirii.** Sonda estimează costul din corpul efectiv al destinației — inclusiv clasa solicitării derivată din indicatorul său `stream`, exact ca pe traseul părinte — astfel încât membrii panoului fusion (`stream: false`) sunt evaluați conform clasei fără redare în flux pe care o vor ocupa efectiv, iar destinațiile cu prioritate/RR conform opțiunii solicitate de utilizator.
- **Raportare:** omiterea unei sonde după prima destinație incrementează `fallbackCount` per solicitare al combo-ului (reflectând semantica de rezervă existentă; vizibilă în jurnalele combo); fusion returnează 503 când fiecare membru al panoului este omis. În prezent, în instantaneu **nu există niciun contor agregat** (de exemplu, `virtualFanoutSkipped`) — dacă un operator raportează că nu poate determina cât de des poarta benzii omite destinații de distribuire, acesta este semnalul pentru adăugarea unuia.

## Care dintre ele este afișat într-un panou de control

- `adaptiveAdmission.laneCount` / `laneTenants` → **benzi virtuale adaptive** (sistemul 2).
- `adaptiveAdmission.virtualLanes === true` → sondele de distribuire în evantai din secțiunea 3 sunt
  de asemenea active. Un payload în care `virtualLanes` lipsește sau este `false` înseamnă că
  `OMNIROUTE_CHAT_VIRTUAL_LANES` nu este setată — benzile la nivel de octet (sistemul 1) sunt
  în continuare active, dar nimic din `adaptiveAdmission` (și nicio limitare a distribuirii în evantai) nu
  intră în vigoare până când aceasta nu este activată.

## De ce există ambele

Benzile la nivel de octet limitează calea de parsare/comprimare cu consum mare de memorie; benzile adaptive
limitează costul de expediere per entitate găzduită. Criteriul 1 din #9654 („rafala unei sesiuni nu provoacă un răspuns 503
pentru alta”) este impus necondiționat de sistemul 1 și de sistemul 2 după activarea explicită.

## 4. `/v1/responses` de lungă durată într-un singur proces (marjă sănătoasă)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) a adăugat
`tryAcquireHealthyHeadroom`, astfel încât o a doua cerere cu structură complexă să fie admisă
atunci când heap-ul este sub `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Calea BYTE
utilizată de `admitChatRequest` (corpuri ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
implicit 256 KiB, inclusiv `POST /v1/responses`) utilizează **aceeași** excepție.

Aceasta este configurația acceptată cu **un singur proces** pentru mai mult de două conexiuni SSE
`/v1/responses` de lungă durată simultane: măriți limita principală + marja sănătoasă numai atât cât permit heap-ul
și bugetul de octeți în curs de procesare la nivelul întregului proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Zeci de clienți SSE de lungă durată (40–50) reprezintă o chestiune de buget de memorie,
nu o limită fixă de produs de „maximum 2”. Un heap suprasolicitat continuă să respingă cereri cu un
`503` care permite reîncercarea, astfel încât #7849 să nu reapară.

Pentru a **multiplica heap-urile**, rulați N directoare `DATA_DIR` independente (#11024). Nu utilizați niciodată
`replicas > 1` pentru un singur fișier SQLite (#10350). Această secțiune nu redeschide discuția despre
configurația de scalare orizontală bazată pe DATA_DIR.
