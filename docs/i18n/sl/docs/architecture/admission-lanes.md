# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ima **dva** procesno lokalna sistema stez z različnima obsegoma. Sistema se
dopolnjujeta; skrbniki morajo vedeti, katerega opazujejo.

## 1. Sprejem na ravni bajtov za celoten proces (`chatBodyAdmission.ts`)

- **Obseg:** pot medpomnjenega telesa/kopice za `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` in druge poti, oblikovane kot klepet. Ščiti
  pred povečevanjem porabe kopice zaradi velikih teles zahtevkov programerskih agentov (#4380).
- **En globalni krmilnik na proces, ne steze za posamezne ključe (#10110).** Vsak ključ API
  (zgoščen) oziroma seja `anonymous` se sprejema glede na **isti** skupni proračun —
  zgoščeni ID seje se uporablja SAMO kot ključ za pravično razporejanje (krožno
  dodeljevanje med čakajočimi), nikoli kot razdelek zmogljivosti. Prejšnja različica tega
  dokumenta je opisovala steze za posamezne ključe z neodvisno zmogljivostjo; ta model je bil
  odstranjen v #10110, ker je neoverjenim lažnim poverilnicam omogočal pomnožitev
  omejitve za celoten proces.
- **Vrata (#503-fanout): samodejno izpeljan BAJTNI proračun za sprejem, ne fiksno
  število zahtevkov.** Podedovana omejitev števila zahtevkov `CHAT_MAX_HEAVY_IN_FLIGHT` (pred
  tem popravkom privzeto `1`) je razpršitev programerskih agentov (več podagentov/CLI-jev,
  telesa običajno > 256 KB) zmanjšala na dejansko sočasnost ~1, kar je
  pri povsem običajni obremenitvi povzročalo odzive 503. Zdaj omejuje samo, kadar skrbnik izrecno
  nastavi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Če ni nastavljena, sprejem namesto tega
  omejuje `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — proračun, samodejno izpeljan iz
  dejanske omejitve pomnilnika procesa (`src/shared/middleware/admissionBudget.ts`):
  25 % strožje od omejitve kopice V8 in katerekoli omejitve cgroup/vsebnika,
  deljeno z 8-kratnim faktorjem prehodnega povečanja ter omejeno med 8 MiB in
  2 GiB. Izrecne preglasitve uporabljajo enake omejitve. Tako se sistem brez prilagajanja
  okoljskih spremenljivk sam prilagodi od vsebnika s 512 MB do namiznega računalnika z 32 GB. Telo, ki ga
  ni mogoče umestiti v efektivni proračun, je takoj zavrnjeno z `413 body_exceeds_budget`;
  samo tekmovanje med telesi, ki jih je posamezno mogoče obdelati, vstopi v omejeno
  pravično čakalno vrsto. Sprotni sledilnik obremenitve virov z več signali (razmerje kopice V8,
  cgroup, PSI, dogodki OOM — `open-sse/utils/resourcePressurePolicy.ts`) skrajša
  omejeni čas čakanja pri `high` obremenitvi in zahteve takoj zavrže z
  `503 resource_pressure` pri `critical` obremenitvi, še preden so sprejeti
  kakršnikoli bajti.
- **Prilagajanje:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — preglasitev samodejno izpeljanega bajtnega proračuna
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — podedovana omejitev števila zahtevkov, samo z izrecnim vklopom
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — čakanje v čakalni vrsti pred odzivom 503 (privzeto 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — varnostni ventil kopice za bajte v čakalni vrsti (privzeto 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — opuščeni
    nastavitvi brez učinka od #10110 (sprejeti zaradi združljivosti konfiguracije, prezrti)
- **Poročila:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — vključno
  z dodatki iz #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` in `countCapEnabled`
  (false pri privzeti uvedbi — potrjuje, da dejansko omejuje bajtni proračun in ne podedovana
  omejitev števila).

## 2. Prilagodljivi izvajalniniški navidezni pasovi (`open-sse/services/admission`)

- **Obseg:** sprejem na podlagi ključa najemnika za posredovanje ponudniku — strošek čakalne vrste, prilagajanje omejitev na podlagi zakasnitve, razvrščanje v čakalne vrste po pasovih in metrike pasov.
- **Vklop:** **izbiren.** Onemogočeno, razen če je nastavljeno `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Brez tega prilagodljivi krmilnik ohrani vedenje skupne čakalne vrste (1. merilo iz #9654 velja šele, ko upravljavec omogoči pasove).
- **Nastavitev:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + prilagodljiva konfiguracija (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Poročanje:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (neprosojni ID-ji pasov, nikoli neobdelani ključi) in `virtualLanes` — avtoritativna zastavica »pasovi so vklopljeni« v posnetku.

## 3. Preizkusi razpršitve — sprejem po cilju za combo/fusion (#9654 Wave 2)

Combo (prednostno / krožno) in fusion razpršita N ciljnih modelov znotraj ene nadrejene zahteve. Od #9654 Wave 2 je **vsak cilj razpršitve pred posredovanjem preverjen** s preizkusom za posamezen cilj (`PerTargetAdmissionHook`, ki ga ustvari `createPerTargetAdmissionHook`) glede na pas najemnika **nadrejene zahteve**.

- **Obseg:** vsak cilj razpršitve, ki ga posredujejo combo, fusion in mehanizem za kaos. Sistem 1 (na ravni bajtov) ostane nespremenjen — nikoli ne preverja ciljev razpršitve.
- **Vklop:** **izbiren s sistemom 2.** Ko `OMNIROUTE_CHAT_VIRTUAL_LANES` ni nastavljen, ne naredi ničesar — nadrejena zahteva v tem načinu že drži najem skupne čakalne vrste, zato bi preverjanje povzročilo dvojno štetje in zavračanje ciljev combo.
- **Semantika:**
  - **Strogo neblokirajoče — preskoči, nikoli ne uvrsti v čakalno vrsto.** `maxWaitMs 0`: poln pas preskoči cilj, namesto njega pa obdelavo prevzame nadomestni mehanizem combo (ali nabor preživelih pri fusion). To je namerno: cilj razpršitve predstavlja odvečno delo, njegovo uvrščanje v čakalno vrsto pa dodatno obremeni prav tista mesta zastoja, ki naj bi jih pasovi preprečevali. `defaultMaxWaitMs` zato velja **samo za nadrejeno zahtevo**; preizkusi razpršitve nikoli ne čakajo in namenoma **ni nastavitve**, ki bi jim omogočila čakanje (zgodovina težave kaže, da so nastavitve čakanja povzročile množične napake razreda 502/504, ki jih #9654 preprečuje — ponovno preučite le, če upravljavec sporoči, da preskočeni cilji razpršitve poslabšujejo kakovost odziva).
  - **Sprostitev ob sprejemu.** Sprejeti preizkus takoj sprosti svoj najem: je varovalo zmogljivosti, ne rezervacija. Najem nadrejene zahteve pokriva razpršitev; zadrževanje še N najemov bi umetno povečalo skupni aktivni strošek in povzročilo zavračanje drugih najemnikov. Po najboljših močeh, brez rezervacije: pas se lahko med preizkusom in posredovanjem znova zapolni, zato lahko varovalo ob veliki tekmovalnosti sprejme cilj v pas, ki je ob posredovanju cilja že znova poln.
  - **Ovrednoteno iz dejanskega telesa razpršitve.** Preizkus oceni strošek iz dejanskega telesa cilja — vključno z razredom zahteve, izpeljanim iz njegove zastavice `stream`, povsem enako kot na poti nadrejene zahteve — zato so člani nabora fusion (`stream: false`) ovrednoteni po razredu brez pretakanja, ki ga bodo dejansko zasedli, cilji priority/RR pa glede na uporabnikovo zahtevo.
- **Poročanje:** preskok preizkusa po prvem cilju poveča `fallbackCount` zahteve combo (v skladu z obstoječo semantiko nadomestnega izvajanja; vidno v dnevnikih combo); fusion vrne 503, ko so preskočeni vsi člani nabora. Trenutno v posnetku **ni zbirnega števca** (npr. `virtualFanoutSkipped`) — če upravljavec sporoči, da ne more ugotoviti, kako pogosto varovalo pasu preskoči cilje razpršitve, je to razlog za njegovo dodajanje.

## Kaj se prikazuje na nadzorni plošči

- `adaptiveAdmission.laneCount` / `laneTenants` → **prilagodljivi navidezni pasovi** (sistem 2).
- `adaptiveAdmission.virtualLanes === true` → aktivne so tudi razpršene sonde iz 3. razdelka. Če v koristni vsebini `virtualLanes` manjka ali ima vrednost `false`, spremenljivka `OMNIROUTE_CHAT_VIRTUAL_LANES` ni nastavljena — pasovi na ravni bajtov (sistem 1) so še vedno aktivni, vendar nič v okviru `adaptiveAdmission` (in nobeno omejevanje razpršitve) ne deluje, dokler ta možnost ni omogočena.

## Zakaj obstajata oba sistema

Pasovi na ravni bajtov omejujejo pomnilniško zahtevno pot razčlenjevanja/stiskanja, prilagodljivi pasovi pa omejujejo stroške odpošiljanja za posameznega najemnika. Merilo 1 iz #9654 (»izbruh ene seje ne povzroči odziva 503 za drugo«) brezpogojno uveljavlja sistem 1, sistem 2 pa ga uveljavlja po omogočitvi te možnosti.

## 4. Dolge zahteve `/v1/responses` v enem procesu (rezerva pri zdravem stanju)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) je dodal `tryAcquireHealthyHeadroom`, tako da je druga strukturno zahtevna zahteva sprejeta, ko je kopica pod pragom `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Pot BYTE, ki jo uporablja `admitChatRequest` (telesa ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, privzeto 256 KiB, vključno s `POST /v1/responses`), uporablja **isti** izhod v sili.

To je podprt recept za izvajanje v **enem procesu** z več kot dvema sočasnima dolgima povezavama SSE `/v1/responses`: primarno omejitev in rezervo pri zdravem stanju povečajte le toliko, kolikor dopuščata kopica in proračun bajtov zahtev v obdelavi za celoten proces (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Več deset dolgih odjemalcev SSE (40–50) je vprašanje tega pomnilniškega proračuna, ne pa stroga omejitev izdelka na »največ 2«. Obremenjena kopica še vedno zavrača zahteve s ponovljivim odzivom `503`, da se težava #7849 ne ponovi.

Za **pomnožitev kopic** zaženite N neodvisnih `DATA_DIR`-jev (#11024). Nikoli ne uporabljajte `replicas > 1` z eno datoteko SQLite (#10350). Ta razdelek ne pomeni ponovnega odpiranja recepta za horizontalno razširjanje z `DATA_DIR`.
