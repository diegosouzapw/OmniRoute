# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

See dokument kirjeldab OmniRoute’i lisatud tagasisidepõhise adaptiivse marsruutimise
alust. See on teadlikult väike: see lisab tüübitud marsruutimistulemuste
kanali, olemasolevat auto-combo hindajat toitva reaalajalise kvaliteedisignaali,
valikulise OpenTelemetry eksportija ja selgitatavuse otspunkti. See **ei**
asenda olemasolevat tõrkekindluse kihti (kaitselüliti, ühenduse jahtumisperiood,
mudeli lukustus, tervisemaatriks, autopiloot) — see täiendab seda.

## 1. Arhitektuuriline kontekst

OmniRoute on andmetasand, millel on **päringute kuum tee** ja **juhtimis-/intellektitasand**.
Kuum tee peab jääma kiireks, mälutõhusaks, asünkroonseks, tõrkekindlaks ja
etteaimatavaks. Hindamine, kvaliteediskoorimine, katsed ja ajalooline analüüs kuuluvad
juhtimistasandile.

```
AI-agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   andmetasand (kiire, sünkroonne, mälusisene)
│  marsruutimine /    │
│  tõrkesiire          │
│  tervis / kaitsepiir │
│  vahemälu / vooged.  │
└──────────┬──────────┘
           │ RoutingEvent (saada-ja-unusta, ~0.2µs)
           ▼
┌─────────────────────┐
│  Tagasiside sihid   │   juhtimistasand (asünkroonne, parima pingutuse põhimõttel)
│  kvaliteedijälgija  │
│  OTel eksportija    │
│  selgituste hoidla  │
└──────────┬──────────┘
           ▼  kvaliteediskoor
      auto-combo hindaja
```

### Mis oli juba olemas (auditeeritud, mitte dubleeritud)

| Mõiste                                    | Olemasolev teostus                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Kättesaadavus (kas saame liiklust saata?) | Kaitselüliti (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-s püsivalt talletatud), ühenduse jahtumisperiood, mudeli lukustus |
| Tervise aruandlus                         | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                            |
| Variliiklus                               | `open-sse/services/combo/shadowRouting.ts`                                                                         |
| Kaitsepiirid                              | `src/lib/guardrails/` (eel-/järelkonksud)                                                                          |
| Täpne vahemälu                            | `src/lib/semanticCache.ts` (allkirjapõhine)                                                                        |
| Hindajad / hindamispõhine marsruutimine   | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                               |
| Combo-otsuste selgitatavus                | `open-sse/services/combo/decisionTrace.ts`                                                                         |
| Töölaua reaalajasündmused                 | `src/lib/events/eventBus.ts` (UI teavituskanal, `unknown` andmekoormad, 100-kirjeline ajalugu)                     |

Marsruutimissündmuste kiht **ei ole** `eventBus`-i taasimplementatsioon: see siin on
töölaua reaalajateavituste kanal (tüübitud _sündmuste nimed_, läbipaistmatud
andmekoormad, UI tarbijad). `RoutingEvent` on tüübitud _tulemuse_ struktuur
(latentsus/loendid/kulu/tulemus/lõpetamise põhjus), mida tarbivad juhtimistasandi
tagasiside sihid (kvaliteedijälgija, OTel eksportija, selgituste hoidla).

### Mis puudus (siin lisatud)

1. **Tüübitud marsruutimistulemuse sündmuse + sihi abstraktsioon** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` on combo-põhine ja ainult mälusisene;
   `comboMetrics` on kumulatiivsed loendurid; `call_logs` on töötlemata asünkroonne püsimällu talletamine.
   Ükski neist pole tüübitud sihipõhine tulemuste kanal, mida kvaliteedijälgija, OTel
   eksportija või Future-AGI-laadne hindaja saaks tellida.
2. **Reaalajaline kvaliteedisignaal** (EWMA) väljundi kvaliteedi jaoks — varem
   hindaja üksnes vahendas „kvaliteeti“ staatilise ülesandesobivuse ja vabatahtlikult lubatud hindamiste läbimismäärade kaudu.
3. **Valikuline, sõltuvusteta OTel eksportija**, mis kasutab GenAI semantilisi konventsioone.
4. **Selgitatavuse otspunkt**, mis tagastab tegelikud marsruutimisotsused + kvaliteedi oleku.

## 2. Marsruutimissündmused (tagasiside alus)

Failid: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` sisaldab ainult marsruutimise metaandmeid:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // lubatud väärtuste ühendtüüp
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` on TypeScriptis `Send+Sync`-laadne trait:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // peab olema O(1), ilma sünkroonse I/O-ta
}
```

Kuum täitmistee kutsub funktsiooni `emitRoutingEvent(event)` iga lõpetatud päringu kohta ühe korra
(voogedastuse lõpetamise tagasikutse, voogedastuseta õnnestumise tee ja
vigase 200-vastuse tõrketee funktsioonis `handleChatCore`). Edastamine on sünkroonne
levitamine registreeritud vastuvõtjatele, kuid iga vastuvõtja ainult lisab andmed
järjekorda või uuendab mälus olevat olekut. **Kuumal täitmisteel ei tehta
sünkroonseid andmebaasikirjutusi ega võrgu-I/O-d.**

Vaikimisi vastuvõtjad:

- `MemoryRoutingEventStore` — piiratud (500) ringpuhver, uusimad eespool,
  selgitusotspunkti jaoks.
- `QualityTracker`-tarbija — uuendab EWMA kvaliteedihinnangut.
- `OtlpHttpsEventSink` — valikuline, lubatud ainult siis, kui määratud on
  `OMNIROUTE_OTEL_ENDPOINT` (või `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Mõõdetud lisakulu (aus võrdlus)

`npm run bench:routing-events` selles tööjaamas (100k iteratsiooni; alla µs kestvaid
operatsioone mõõdeti agregeeritud µs/op väärtusena, sest operatsioonipõhised
protsentiilid jäävad taimeri `performance.now()` lahutusvõimest allapoole):

| Stsenaarium                                      | µs/op  | ops/s  |
| ------------------------------------------------ | ------ | ------ |
| lähtetase (ainult skoorimine)                    | ~0.045 | ~22 M  |
| lähtetase + RoutingEvent (2 vastuvõtjat)         | ~0.168 | ~5.9 M |
| lähtetase + sündmus + OTel-i järjekorda lisamine | ~0.163 | ~6.1 M |
| samaaegne (8 vahelduvat puhangut)                | ~0.18  | —      |

Sündmuse edastamise erinevus võrreldes skoorimise lähtetasemega on
~0.12 µs/päring; OTel-i vastuvõtja lisab andmed ainult järjekorda (O(1) puhvri
lisamisoperatsioon), mistõttu ei lisa see mõõdetavat kulu. Need arvud sõltuvad
konkreetsest masinast ja on suhtelised — need ei ole tootmiskeskkonna garantii.
v1 „~0.2 µs” näitaja oli agregeeritud hinnang; see metoodika eraldab skoorimise
lähtetaseme sündmuse edastamise kulust.

## 3. Kvaliteedisignaal (tagasisidepõhine teenusepakkuja olek)

Failid: `open-sse/services/routing/quality.ts`

v2 eristab **operatiivset** ja **semantilist** kvaliteeti:

- **Operatiivne** — tuletatakse marsruutimise kuumast täitmisteest (HTTP 4xx/5xx,
  ühenduse tõrked, 429-vastused, vigased vastused, voo katkestused,
  `finish_reason=length`, nullväljundiga õnnestumised, latentsuse/TTFT EWMA).
  200-vastust EI käsitleta semantilise kvaliteedina.
- **Semantiline** — genereeritud väljundi tegelik väärtus. Selle loob ALATI ainult
  hindaja funktsiooni `setSemanticQuality()` kaudu. Väärtus on `null`, kuni
  hindaja selle annab, ning see ei mõjuta kunagi operatiivset skoori.

Olekuandmed iga (teenusepakkuja, mudeli) paari kohta (EWMA + piiratud loendurid):

- `successEwma` — tulemuse õnnestumise EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — latentsuse EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — kui hiljuti mudelit viimati vaadeldi.

### Kindluse / valimimahu arvestamine

`confidence = clamp01(samples / 50)` ning skoorijale tagastatav skoor sulandatakse
neutraalse keskpunkti poole:

```
score = 0.5 + confidence * (operational - 0.5)
```

Tagajärjed (testidega kinnitatud):

- Külma teenusepakkuja (0 valimit) skoor on **0.5** — teda ei karistata ebaõiglaselt,
  kuid ta ei saa domineerida tuhandete kindlate vaatlustega teenusepakkuja üle.
- 7 õnneliku õnnestumisega teenusepakkuja tõmmatakse 0.5 poole (ta ei domineeri
  kunagi optimistliku algväärtustamise tõttu).
- 50+ valimiga teenusepakkuja läheneb oma tegelikule operatiivsele skoorile.
- Halvenemine ja taastumine on järkjärgulised (EWMA) ning üksik tõrge ei hävita
  terve teenusepakkuja hinnangut.

`ProviderQuality` avaldab `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

See edastatakse automaatse kombineerimise skoorijale skoorimistegurina `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` failis
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Summa jääb väärtusele 1.0.
- `buildAutoCandidates` täidab välja `candidate.quality` jälgija andmetega;
  andmeteta kandidaatide vaikeväärtus on neutraalne **0.5** (külma kandidaati
  ei eelistata ega karistata).

Suletud tagasisideahel:

```
RoutingEvent → QualityTracker → getQualityScore → automaatse kombineerimise quality-tegur
      ↑                                                    │
      └────── päringu tulemus (handleChatCore) ←────────────┘
```

### Range välistamine vs. pehme karistus

Kvaliteedisignaal on ainult **pehme kohanduv eelistus**. Range välistamine jääb
olemasoleva vastupidavuskihi ülesandeks: OPEN-olekus kaitselüliti, ammendunud kvoot,
autentimistõrge, mudeli lukustus — kvaliteediskoor ei mõjuta neist ühtegi.
Teenusepakkujat, kelle kvaliteediskoor ajutiselt langeb, eelistatakse vähem, kuid
teda ei keelata kunagi täielikult.

## 3b. Kanooniline voo ajastus (TTFT / ITL)

Failid: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` on voogedastustee ainus instrumenteerimispunkt,
mis on ühendatud funktsiooniga `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — esimene ülesvoolust saadud andmeplokk.
- `markForward()` — esimene kliendile edastatud andmeplokk (kasutatakse TTFT jaoks).
- `markInterrupted()` — voo ajalõpp/katkestus/tõrge enne korrektset lõpetamist.
- `ttft()` = esimese edastatud SSE-andmeploki latentsus. **See EI OLE tokenitaseme TTFT** —
  üks SSE-andmeplokk võib sisaldada null, üht või mitut tokenit. Täpselt dokumenteeritud.
- `avgItlMs()` = andmeplokkidevahelise intervalli keskmine (ITL-i asendusmõõdik).

TTFT/ITL/katkestuse andmed liiguvad `RoutingEvent`-i (`ttftMs`, `itlMs`) ja OTel-i
väljund eksportib need GenAI/OmniRoute'i ulatuse atribuutidena.

## 4. OpenTelemetry / GenAI jälgitavus

Failid: `open-sse/services/routing/otel.ts`

- Sõltuvusteta OTLP/HTTP JSON-eksportija (kasutab globaalset `fetch`-i, mitte
  `@opentelemetry/*` SDK-d).
- Ulatused järgivad GenAI semantilisi kokkuleppeid (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) koos OmniRoute'i marsruutimise
  atribuutidega (tulemus, olek, TTFT, korduskatsed, varuvariant).
- `record()` lisab kirje ainult piiratud puhvrisse (O(1)); taustal töötav taimer
  saadab andmed asünkroonselt käsuga `POST {endpoint}/v1/traces`. Ülekoormuse korral
  eemaldatakse vanimad sündmused (`dropped` loendur) — andmetasandile ei rakendata
  kunagi vastusurvet.
- **Ilma konfiguratsioonita keelatud.** `OMNIROUTE_OTEL_ENDPOINT` (või
  `OTEL_EXPORTER_OTLP_ENDPOINT`) peab olema määratud; vastasel juhul väljundit ei
  registreerita ja OTel-i koodi ei käivitata üldse.

## 5. Selgitatavus

- `GET /v1/explain/routing` tagastab hiljutised `RoutingEvent`-id (tegelikud
  otsused, uusimad eespool) ning pakkuja/mudeli kvaliteedi hetktõmmise.
- Autentimine järgib `/v1/combos`-e loogikat (Beareri API-võti või juhtpaneeli
  seanss; ühe kasutajaga kohalikes juurutustes anonüümne, kui
  `REQUIRE_API_KEY=false`).
- Kombotaseme käivituskohased jäljed on endiselt saadaval olemasoleva
  `decisionTrace.ts` kaudu (päis `X-OmniRoute-Combo-Trace`).
- Ohutus: sündmused sisaldavad ainult marsruutimise metaandmeid, mitte kunagi
  viipasid/kehasid/mandaate.

## 6. Hindamistasandi integratsioon (valmidus Future AGI jaoks)

OmniRoute käsitleb Future AGI-d (või mis tahes hindajat) **potentsiaalse
intelligentsi-/hindamistaustsüsteemina, mitte sõltuvusena**. Liidesepunktid:

- `RoutingEventSink` saab sündmusi asünkroonselt hindajale edastada.
- `MemoryRoutingEventStore` koos kvaliteedi hetktõmmisega annab hindajale töötlemata
  otsustusvoo.
- Tulevane `Evaluator` (deterministlik, kohalik hindaja, HTTP, WASM) tarbiks
  sündmusi/jälgi ja tagastaks `QualityScore`-i, mis suunatakse samasse
  `getQualityScore`-i / kvaliteediteguri töötlusteekonda.
- Olemasolev hindamispõhine marsruutimine (`open-sse/services/evalRouting.ts`)
  järjestab aktiveerimise korral kombosihtmärgid juba ümber `eval_runs`-i
  läbimismäärade järgi.

Ühtegi hindamist ei käitata päringuteel sünkroonselt ning lüüs töötab täielikult
ka hindaja puudumisel.

## 7. Arhitektuuri lõppülevaade

1. **Mis jääb sünkroonsele kriitilisele teele?** Marsruutimine/hindamine,
   kaitsemeetmete eelkontrollid, vahemälu päring ja üks `emitRoutingEvent`-i
   väljundhargnemine (~0,12 µs võrreldes baastaseme hindamisega) mälusisestesse
   väljunditesse.
2. **Mis viidi üle asünkroonsesse töötlusse?** OTel-i eksport (taimer + fetch),
   `call_logs`-i/kasutuse püsiv salvestamine, semantilise vahemälu kirjutused;
   kvaliteediarvestus on mälusisene ja O(1) (asünkroonsust pole vaja).
3. **Kuidas saab marsruutimise tulemusest tagasiside?** `handleChatCore` väljastab
   `RoutingEvent`-i → `QualityTracker` uuendab EWMA olekut → `getQualityScore`
   edastab väärtuse automaatkombinatsiooni `quality`-tegurisse.
4. **Kuidas mõjutab kvaliteet tulevast marsruutimist?** Madal kvaliteediskoor
   vähendab vastava pakkuja/mudeli kaalutud skoori funktsioonis `scoreAutoTargets`,
   mistõttu halvenenud mudelite eelistamine väheneb järk-järgult ja taastub koos
   nende EWMA paranemisega.
5. **Kuidas saab Future AGI integreeruda ilma sõltuvuseks muutumata?** Liidese
   `RoutingEventSink` / tulevase `Evaluator`-i adapteri kaudu — ilma jäigalt
   sissekodeeritud sõltuvuseta.
6. **Mis juhtub, kui hindaja pole saadaval?** Marsruutimist see ei mõjuta;
   vaadeldud signaalita mudelite kvaliteedi vaikeväärtus on neutraalne (1.0).
7. **Mis juhtub, kui telemeetria pole saadaval?** OTel-i väljundit lihtsalt ei
   registreerita; ülejäänud marsruutimiskiht töötab muutumatult edasi.
8. **Mis juhtub ülekoormuse korral?** OTel-i puhver eemaldab vanimad sündmused;
   kvaliteediandmed ja ringpuhver on ülesehituselt piiratud; vastusurvet ei teki.
9. **Kuidas taastub pakkuja olek pärast halvenemist?** EWMA koondub edukate
   päringute lisandudes uuesti; soojendus hoiab külmad mudelid neutraalsena;
   kaitselüliti taastub sõltumatult HALF_OPEN-i proovipäringute kaudu.
10. **Milliseid kavandatud funktsioone jäeti tahtlikult rakendamata ja miks?**
    - Variliiklus / eksperimendid — juba rakendatud
      (`combo/shadowRouting.ts`); ei ehitatud uuesti.
    - Kaitsemeetmed — juba rakendatud (`src/lib/guardrails/`); ei dubleeritud.
    - Semantiline vahemälu — juba rakendatud (`src/lib/semanticCache.ts`); ei
      dubleeritud.
    - Täielik eksperimentide haldusplatvorm, andmestikutööriistad, viipade
      optimeerimise platvorm, vektorandmebaas või kohustuslik väline OTel-i
      taristu — ei kuulu optimeeritud andmetasandi ulatusse.
    - Rusti `RoutingEvent`-i struktuur — andmetasand on TypeScriptis; TS-i tüüp
      on kohandatud vaste.

## 8. Konfiguratsiooni viide

| Muutuja                       | Vaikeväärtus | Mõju                                                                           |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | määramata    | Kui määratud, lubab OTLP/HTTP jälgede eksportija (nt `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | määramata    | OTLP lõpp-punkti varualias.                                                    |
| `OTEL_SERVICE_NAME`           | `omniroute`  | Ressursiatribuut `service.name`.                                               |

## 9. Testid

- `tests/unit/routing-events.test.ts` — sündmuste normaliseerimine, olekute
  klassifitseerimine, piiratud ringpuhver, edastamine mitmesse sihtkohta + isoleerimine.
- `tests/unit/routing-quality.test.ts` — EWMA soojendus, taastumine ebaõnnestumisest/õnnestumisest,
  anomaaliakaristused, 429 ajutine käsitlemine, hetktõmmis, lähtestamine.
- `tests/unit/routing-scoring-quality.test.ts` — kaalude terviklus, neutraalne
  vaikeväärtus, kvaliteediteguri alusel järjestamine.
- `tests/unit/routing-otel.test.ts` — lubamise kontroll, GenAI vahemiku kasulik koormus, asünkroonne
  puhverdamine, ülekoormuse korral hülgamine.
- `tests/unit/routing-events-concurrency.test.ts` — tuhanded sündmused, ringpuhvri
  piiratus, tõrkuvate sihtkohtade isoleerimine, läbipõimitud asünkroonsed puhangud,
  lähtestamine lisamiste ajal.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministlik täielik töövoog
  tegeliku `scoreAutoTargets` hindaja kaudu: terve → halveneb → taastub → lühiajaline tõrge, lisaks
  külmkäivituse ja õnneliku külma teenusepakkuja stsenaariumid.
- `tests/unit/stream-timing.test.ts` — TTFT (esimene edastatud andmeplokk), ITL,
  esimene bait vs esimene edastamine, katkestus, vigaste/tühjade andmeplokkide ohutu käsitlemine.

## 10. Varasemate probleemide olek (18. etapp)

| Probleem                                                 | Olek                         | Märkused                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` ekspordi lahknevus                           | **PARANDATUD (keskkondlik)** | `node_modules` ei olnud failiga `package-lock.json` sünkroonis (installitud 1.3.1 vs lukustatud 1.4.0). Käsu `npm install omniglyph@1.4.0` käivitamine taastas lukustatud versiooni; tüübivigade arv langes nullini. Manifestid jäid muutmata.                                            |
| Aegunud `getKnownContextOverflow` testid                 | **TEADA — parandamata**      | `combo-context-overflow-compression-probe.test.ts` impordib funktsiooni, mida failis `open-sse/services/combo.ts` enam ei ole (sellele viitavad ainult kommentaarid). Parandamine nõuab testide uuesti rakendamist või ümberkirjutamist — arhitektuurne muudatus, mis pole asjaga seotud. |
| `combo-runtime-unit-concurrency.test.ts` DB isoleerimine | **TEADA — parandamata**      | Testiraamistiku SQLite'i isoleerimise kontroll nurjub otse käivitamisel; nurjub samamoodi ka baasharus.                                                                                                                                                                                   |
| i18n `llm.txt` lahknevus                                 | **TEADA — parandamata**      | `docs/i18n/*/llm.txt` erinevad juurfailist; varasem probleem, mis blokeerib dokumentatsiooni sünkroonimise commiti-eelse kontrolli.                                                                                                                                                       |

Keskkonna- ja koodiprobleeme käsitletakse eraldi; ühtegi asjasse mittepuutuvat tõrget ei peideta
muudetud testifiltrite taha.
