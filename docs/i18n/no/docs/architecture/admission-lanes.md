# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute har **to** prosesslokale lane-systemer med ulike virkeområder. De er
komplementære; operatører bør vite hvilket system de ser på.

## 1. Bytebasert prosessomfattende adgangskontroll (`chatBodyAdmission.ts`)

- **Virkeområde:** banen for bufret body/heap for `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` og de andre chat-lignende rutene. Beskytter
  mot heap-forsterkning fra store request bodies fra kodeagenter (#4380).
- **Én prosessglobal kontroller, ikke lanes per nøkkel (#10110).** Hver API-nøkkel
  (hashet) eller `anonymous`-økt får adgang mot det **samme** delte budsjettet —
  den hashede økt-ID-en brukes BARE som en planleggingsnøkkel for rettferdighet
  (round-robin-distribusjon blant ventende), aldri som en kapasitetspartisjon.
  En tidligere versjon av dette dokumentet beskrev lanes per nøkkel med
  uavhengig kapasitet; denne modellen ble fjernet i #10110 fordi den lot falsk,
  uautentisert legitimasjon multiplisere den prosessomfattende grensen.
- **Port (#503-fanout): et automatisk avledet BYTE-budsjett for inntak, ikke et
  fast antall forespørsler.** Den eldre grensen `CHAT_MAX_HEAVY_IN_FLIGHT` for
  antall forespørsler (standardverdi `1` før denne rettelsen) reduserte fan-out
  fra kodeagenter (flere underagenter/CLI-er, med bodies som rutinemessig er
  > 256 KB) til en effektiv samtidighet på ~1, noe som førte til 503-feil under
  > helt normal belastning. Den setter nå bare en grense når en operatør
  > eksplisitt angir `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Når den ikke er angitt,
  > styres adgang i stedet av `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — et budsjett
  > som automatisk avledes fra prosessens faktiske minnegrense
  > (`src/shared/middleware/admissionBudget.ts`): 25 % av den laveste grensen av
  > V8-heapgrensen og en eventuell cgroup-/containergrense, delt på en faktor på
  > 8x for midlertidig forsterkning, begrenset til mellom 8 MiB og 2 GiB.
  > Eksplisitte overstyringer bruker de samme grensene. Dette skalerer automatisk
  > fra en container på 512 MB til en stasjonær PC med 32 GB uten justering av
  > miljøvariabler. En body som ikke får plass innenfor det effektive budsjettet,
  > avvises umiddelbart med `413 body_exceeds_budget`; bare konkurranse mellom
  > bodies som hver for seg kan behandles, går inn i den avgrensede
  > rettferdighetskøen. En sanntidssporer for ressurspress basert på flere
  > signaler (V8-heapandel, cgroup, PSI, OOM-hendelser —
  > `open-sse/utils/resourcePressurePolicy.ts`) forkorter den avgrensede
  > ventetiden ved `high` belastning og avviser umiddelbart med
  > `503 resource_pressure` ved `critical` belastning, før noen bytes i det hele
  > tatt leses inn.
- **Justering:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — overstyring av det automatisk avledede bytebudsjettet
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — eldre grense for antall forespørsler, kun etter eksplisitt aktivering
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — køventetid før 503 (standardverdi 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap-ventil for bytes i kø (standardverdi 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — utfaset
    og uten effekt siden #10110 (godtas av hensyn til konfigurasjonskompatibilitet, men ignoreres)
- **Rapporter:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — inkludert
  tilleggene fra #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` og `countCapEnabled`
  (false i en standarddistribusjon — bekrefter at bytebudsjettet, ikke den eldre
  antallsgrensen, er det som faktisk begrenser).

## 2. Adaptive virtuelle kjørefelt under kjøring (`open-sse/services/admission`)

- **Omfang:** tenantnøkkelbasert adgangskontroll for leverandørdistribusjon — køkostnad, latenstidsstyrt
  grensetilpasning, kølegging per kjørefelt og måledata for kjørefelt.
- **Aktivering:** **må aktiveres eksplisitt.** Deaktivert med mindre `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Uten dette
  beholder den adaptive kontrolleren den delte køatferden (kriterium 1 i #9654 gjelder
  først når en operatør aktiverer kjørefelt).
- **Justering:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptiv konfigurasjon (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rapportering:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ugjennomsiktige kjørefelt-ID-er, aldri ubehandlede
  nøkler) og `virtualLanes` — det autoritative flagget i øyeblikksbildet for at «kjørefelt er aktivert».

## 3. Fan-out-prober — adgangskontroll per mål for kombinasjon/fusjon (#9654 bølge 2)

Kombinasjon (prioritet / round-robin) og fusjon sender forespørsler til N modellmål under én overordnet
forespørsel. Siden #9654 bølge 2 blir **hvert fan-out-mål kontrollert før distribusjon** av en
probe per mål (`PerTargetAdmissionHook`, bygget av `createPerTargetAdmissionHook`)
mot tenantkjørefeltet til den **overordnede forespørselen**.

- **Omfang:** hvert fan-out-mål som distribueres av kombinasjon, fusjon og chaos-motoren.
  System 1 (på byte-nivå) påvirkes ikke — det undersøker aldri fan-out-mål.
- **Aktivering:** **må aktiveres eksplisitt med system 2.** Gjør ingenting når `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ikke er angitt — den overordnede forespørselen har allerede leien for den delte køen i denne modusen,
  så probing ville dobbelttelle og avvise kombinasjonsmål.
- **Semantikk:**
  - **Strengt ikke-blokkerende — hopp over, aldri legg i kø.** `maxWaitMs 0`: Et fullt kjørefelt
    gjør at målet hoppes over, og reservemekanismen for kombinasjonen (eller fusjonens panel
    med gjenværende mål) betjener forespørselen i stedet. Dette er tilsiktet: Et fan-out-mål er overflødig
    arbeid, og å legge det i kø påfører mer belastning på nettopp den købelastningen kjørefeltene skal
    stoppe. `defaultMaxWaitMs` gjelder derfor **bare den overordnede forespørselen**;
    fan-out-prober venter aldri, og det finnes med hensikt **ingen innstilling** som kan få
    dem til å vente (sakshistorikken viser at venteinnstillinger førte til typen massefeil med 502/504
    som #9654 forhindrer — vurder dette på nytt bare hvis en operatør rapporterer at fan-out-mål som hoppes
    over, svekker svarkvaliteten).
  - **Frigi ved godkjenning.** En godkjent probe frigir leien umiddelbart: Den er
    en kapasitetsport, ikke en reservasjon. Leien til den overordnede forespørselen dekker fan-out-operasjonen; å holde N
    ekstra leier ville blåse opp den delte aktive kostnaden og avvise andre tenants. Dette skjer etter beste evne,
    ikke som en reservasjon: Kjørefeltet kan fylles opp igjen mellom proben og distribusjonen, så ved
    høy konkurranse kan porten slippe et mål inn i et kjørefelt som er fullt igjen når
    målet distribueres.
  - **Priset ut fra den faktiske fan-out-forespørselskroppen.** Proben estimerer kostnaden fra målets
    faktiske forespørselskropp — inkludert forespørselsklassen utledet fra målets `stream`-flagg,
    akkurat som i banen til den overordnede forespørselen — slik at medlemmer av fusjonspanelet (`stream: false`)
    prises etter klassen uten strømming som de faktisk vil oppta, og prioritets-/RR-mål
    etter det brukeren ba om.
- **Rapportering:** Når en probe etter det første målet hoppes over, økes kombinasjonens forespørselsspesifikke
  `fallbackCount` (i samsvar med den eksisterende reservesemantikken; synlig i kombinasjonslogger);
  fusjon returnerer 503 når hvert panelmedlem hoppes over. Det finnes
  **ingen aggregert teller** (f.eks. `virtualFanoutSkipped`) i øyeblikksbildet i dag —
  hvis en operatør rapporterer at det ikke er mulig å se hvor ofte kjørefeltporten hopper over fan-out-mål,
  er det utløseren for å legge til en slik teller.

## Hvilken som vises i et instrumentbord

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptive virtuelle baner** (system 2).
- `adaptiveAdmission.virtualLanes === true` → fan-out-probene fra del 3 er
  også aktive. En nyttelast der `virtualLanes` mangler eller er `false`, betyr at
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ikke er angitt — banene på byte-nivå (system 1) er
  fortsatt aktive, men ingenting under `adaptiveAdmission` (og ingen fan-out-begrensning)
  trer i kraft før dette er aktivert.

## Hvorfor begge finnes

Banene på byte-nivå begrenser den minnekrevende banen for parsing/komprimering, mens de adaptive banene
begrenser ekspederingskostnaden per leietaker. Kriterium 1 i #9654 («én økts trafikkøkning fører ikke til 503
for en annen») håndheves ubetinget av system 1 og av system 2 når eksplisitt aktivering er slått på.

## 4. Langvarig `/v1/responses` i én prosess (ledig kapasitet ved sunn tilstand)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) la til
`tryAcquireHealthyHeadroom`, slik at en andre strukturelt tung forespørsel slippes inn
når heapen er under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. BYTE-banen
som brukes av `admitChatRequest` (forespørselskropper ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
standardverdi 256 KiB, inkludert `POST /v1/responses`), bruker den **samme** unntaksmekanismen.

Dette er den støttede oppskriften med **én prosess** for mer enn to samtidige, langvarige
SSE-tilkoblinger til `/v1/responses`: Øk primærkapasiteten + ledig kapasitet ved sunn tilstand bare så langt som heapen
og det prosessomfattende budsjettet for byte under behandling (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) tillater. Flere titalls langvarige SSE-klienter (40–50) er et spørsmål om
dette minnebudsjettet, ikke en hard produktgrense på «maks. 2». En belastet heap avviser fortsatt
med en `503` som kan forsøkes på nytt, slik at #7849 ikke kommer tilbake.

For å **multiplisere antall heaper**, kjør N uavhengige `DATA_DIR`-er (#11024). Bruk aldri
`replicas > 1` mot én SQLite-fil (#10350). Denne delen gjenåpner ikke
oppskriften for utskalering med DATA_DIR.
