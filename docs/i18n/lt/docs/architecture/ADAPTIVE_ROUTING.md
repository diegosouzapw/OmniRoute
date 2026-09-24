# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Šiame dokumente aprašomas atsiliepimais grindžiamo adaptyviojo maršruto parinkimo pagrindas, pridėtas prie
OmniRoute. Jis sąmoningai nedidelis: jame pristatomas tipizuotas maršruto parinkimo rezultatų
kanalas, realiuoju laiku atnaujinamas kokybės signalas, perduodamas esamam automatinio derinio vertintuvui,
pasirinktinis OpenTelemetry eksportuotojas ir paaiškinamumo galinis taškas. Jis **nepakeičia**
esamo atsparumo mechanizmų rinkinio (grandinės pertraukiklio, ryšio atvėsimo laikotarpio,
modelio blokavimo, būsenos matricos, autopiloto) — jis jį papildo.

## 1. Architektūrinis kontekstas

OmniRoute yra duomenų plokštuma, turinti **karštąją užklausų vykdymo trajektoriją** ir **valdymo / analizės
plokštumą**. Karštoji trajektorija turi išlikti sparti, taupiai naudoti atmintį, būti asinchroninė, atspari ir
nuspėjama. Vertinimas, kokybės įvertinimas, eksperimentai ir istorinių duomenų analizė priklauso
valdymo plokštumai.

```
DI agentas / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   duomenų plokštuma (sparti, sinchroninė, atmintyje)
│  maršruto parinkimas│
│  / perjungimas      │
│  būsena / apsaugos  │
│  podėlis / srautai  │
└──────────┬──────────┘
           │ RoutingEvent (paleidžiama ir nelaukiama, ~0.2µs)
           ▼
┌─────────────────────┐
│  Atsiliepimų imtuvai│   valdymo plokštuma (asinchroninė, dedamos visos pastangos)
│  kokybės stebėjimas │
│  OTel eksportuotojas│
│  paaiškinimų saugykla│
└──────────┬──────────┘
           ▼  kokybės įvertis
      automatinio derinio vertintuvas
```

### Kas jau buvo (patikrinta, nedubliuota)

| Sąvoka                                                  | Esamas įgyvendinimas                                                                                                    |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Pasiekiamumas (ar galime siųsti srautą?)                | Grandinės pertraukiklis (CLOSED/DEGRADED/OPEN/HALF_OPEN, išsaugomas DB), ryšio atvėsimo laikotarpis, modelio blokavimas |
| Būsenos ataskaitų teikimas                              | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                 |
| Šešėlinis srautas                                       | `open-sse/services/combo/shadowRouting.ts`                                                                              |
| Apsaugos mechanizmai                                    | `src/lib/guardrails/` (kabliai prieš / po vykdymo)                                                                      |
| Tikslusis podėlis                                       | `src/lib/semanticCache.ts` (pagrįstas parašais)                                                                         |
| Vertintuvai / vertinimu grindžiamas maršruto parinkimas | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                    |
| Derinio sprendimo paaiškinamumas                        | `open-sse/services/combo/decisionTrace.ts`                                                                              |
| Realaus laiko įvykiai ataskaitų srityje                 | `src/lib/events/eventBus.ts` (UI pranešimų kanalas, `unknown` naudingieji duomenys, 100 įrašų istorija)                 |

Maršruto parinkimo įvykių sluoksnis **nėra** pakartotinis `eventBus` įgyvendinimas: ši magistralė yra
ataskaitų srities realaus laiko pranešimų kanalas (tipizuoti _įvykių pavadinimai_, nepermatomi
naudingieji duomenys, UI naudotojai). `RoutingEvent` yra tipizuota _rezultato_ struktūra
(delsa / prieigos raktai / kaina / rezultatas / užbaigimo priežastis), kurią naudoja valdymo plokštumos
atsiliepimų imtuvai (kokybės stebėjimo priemonė, OTel eksportuotojas, paaiškinimų saugykla).

### Ko trūko (pridėta čia)

1. **Tipizuoto maršruto parinkimo rezultato įvykio ir imtuvo abstrakcijos** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` taikomas tik deriniui ir veikia tik atmintyje;
   `comboMetrics` yra kaupiamieji skaitikliai; `call_logs` yra neapdorotų duomenų asinchroninis išsaugojimas.
   Nė vienas iš jų nėra tipizuotas imtuvais pagrįstas rezultatų kanalas, kurį galėtų prenumeruoti kokybės stebėjimo priemonė, OTel
   eksportuotojas arba Future-AGI tipo vertintuvas.
2. **Realiuoju laiku atnaujinamo kokybės signalo** (EWMA), skirto išvesties kokybei — anksčiau vertintuvas
   „kokybę“ apytiksliai nustatydavo tik pagal statinį tinkamumą užduočiai ir pasirinktinai įjungtų vertinimų sėkmės rodiklius.
3. **Pasirinktinio OTel eksportuotojo be priklausomybių**, naudojančio GenAI semantines konvencijas.
4. **Paaiškinamumo galinio taško**, grąžinančio tikruosius maršruto parinkimo sprendimus ir kokybės būseną.

## 2. Maršruto parinkimo įvykiai (grįžtamojo ryšio pagrindas)

Failai: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` perduoda tik maršruto parinkimo metaduomenis:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // „auto“ | „priority“ | „direct“ | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // leidžiamų reikšmių sąrašu apribota sąjunga
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` yra `Send+Sync` tipo sąsaja TypeScript kalboje:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // turi būti O(1), be sinchroninio I/O
}
```

Karštasis kelias iškviečia `emitRoutingEvent(event)` vieną kartą kiekvienai užbaigtai užklausai
(srautinio užbaigimo atgalinio iškvietimo metu, nesrautinės sėkmės kelyje ir
netinkamai suformuoto 200 atsako klaidos kelyje, esančiame `handleChatCore`). Įvykis sinchroniškai
išplatinamas registruotiems imtuvams, tačiau kiekvienas imtuvas tik įtraukia duomenis į eilę arba
atnaujina atmintyje saugomą būseną. **Jokių sinchroninių įrašymų į duomenų bazę ir jokio tinklo
I/O karštajame kelyje.**

Numatytieji imtuvai:

- `MemoryRoutingEventStore` — riboto dydžio (500) žiedinis buferis, pirmiausia pateikiantis naujausius įrašus,
  skirtas paaiškinimo galiniam taškui.
- `QualityTracker` vartotojas — atnaujina EWMA kokybės įvertį.
- `OtlpHttpsEventSink` — pasirinktinis, įjungiamas tik tada, kai nustatytas
  `OMNIROUTE_OTEL_ENDPOINT` (arba `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Išmatuotos pridėtinės sąnaudos (sąžiningas palyginimas)

`npm run bench:routing-events` šioje darbo stotyje (100 tūkst. iteracijų; mažiau nei µs
trunkančios operacijos matuojamos kaip agreguotos µs/op, nes atskirų operacijų procentiliai
yra mažesni už `performance.now()` laikmačio skiriamąją gebą):

| Scenarijus                                      | µs/op  | ops/s  |
| ----------------------------------------------- | ------ | ------ |
| bazinis lygis (tik balų skaičiavimas)           | ~0.045 | ~22 M  |
| bazinis lygis + RoutingEvent (2 imtuvai)        | ~0.168 | ~5.9 M |
| bazinis lygis + įvykis + OTel įtraukimas į eilę | ~0.163 | ~6.1 M |
| lygiagretus vykdymas (8 persipynusios serijos)  | ~0.18  | —      |

Įvykių išplatinimo skirtumas, palyginti su baziniu balų skaičiavimu, yra ~0.12 µs/užklausai;
OTel imtuvas tik įtraukia į eilę (O(1) buferio papildymas), todėl neprideda nieko išmatuojamo.
Šie skaičiai priklauso nuo konkretaus įrenginio ir yra santykiniai — tai nėra veikimo
produkcinėje aplinkoje garantija. v1 „~0.2 µs“ skaičius buvo agreguotas įvertis; ši metodika
atskiria bazinį balų skaičiavimą nuo įvykių išplatinimo sąnaudų.

## 3. Kokybės signalas (grįžtamuoju ryšiu pagrįsta teikėjo būsena)

Failai: `open-sse/services/routing/quality.ts`

v2 atskiria **operacinę** kokybę nuo **semantinės** kokybės:

- **Operacinė** — nustatoma pagal maršruto parinkimo karštąjį kelią (HTTP 4xx/5xx, ryšio
  triktys, 429 atsakymai, netinkamai suformuoti atsakymai, srauto pertrūkiai, `finish_reason=length`,
  sėkmingi atsakymai be išvesties, delsos / TTFT EWMA). 200 atsakymas NĖRA laikomas semantinės
  kokybės rodikliu.
- **Semantinė** — faktinė sugeneruotos išvesties vertė. Ją gali pateikti TIK
  vertintojas per `setSemanticQuality()`. Jos reikšmė yra `null`, kol vertintojas jos nepateikia,
  ir ji niekada nepatenka į operacinį balą.

Kiekvienos (teikėjo, modelio) poros būsena (EWMA + riboti skaitikliai):

- `successEwma` — rezultato sėkmės EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — delsos EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — kiek laiko praėjo nuo paskutinio modelio stebėjimo.

### Pasitikėjimas / atsižvelgimas į imties dydį

`confidence = clamp01(samples / 50)`, o balas, grąžinamas balų skaičiavimo komponentui,
sujungiamas su neutraliu vidurio tašku:

```
score = 0.5 + confidence * (operational - 0.5)
```

Pasekmės (patvirtintos testais):

- Naujas teikėjas (0 imčių) gauna **0.5** balo — jis nėra nesąžiningai baudžiamas, tačiau
  negali pranokti teikėjo, turinčio tūkstančius patikimų stebėjimų.
- Teikėjo, turinčio 7 atsitiktinai sėkmingus rezultatus, balas artinamas prie 0.5 (dėl
  optimistinės pradinės reikšmės jis niekada nedominuoja).
- Teikėjo, turinčio 50 ar daugiau imčių, balas konverguoja į jo tikrąjį operacinį balą.
- Blogėjimas ir atsikūrimas vyksta laipsniškai (EWMA), o viena pavienė triktis
  nesužlugdo patikimai veikiančio teikėjo.

`ProviderQuality` pateikia `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Tai perduodama automatinių derinių balų skaičiavimo komponentui kaip `quality` balų skaičiavimo veiksnys:

- `ScoringFactors.quality` / `ScoringWeights.quality`, esantys
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Suma išlieka 1.0.
- `buildAutoCandidates` užpildo `candidate.quality` reikšme iš sekimo komponento; kandidatai,
  apie kuriuos nėra duomenų, gauna numatytąją neutralią reikšmę **0.5** (naujas kandidatas nėra nei
  sustiprinamas, nei baudžiamas).

Uždarasis ciklas:

```
RoutingEvent → QualityTracker → getQualityScore → automatinio derinio kokybės veiksnys
      ↑                                                    │
      └────── užklausos rezultatas (handleChatCore) ←──────┘
```

### Griežtas pašalinimas ir švelni nuobauda

Kokybės signalas yra tik **švelni adaptyvi pirmenybė**. Griežtas pašalinimas ir toliau
priklauso esamam atsparumo mechanizmų rinkiniui: grandinės pertraukiklio OPEN būsena, išnaudota kvota,
autentifikavimo triktis, modelio blokavimas — kokybės balas nė vienam iš jų įtakos neturi.
Teikėjui, kurio kokybės balas laikinai sumažėja, suteikiama mažesnė pirmenybė, tačiau jis niekada
nėra visiškai išjungiamas.

## 3b. Kanoninis srauto laiko matavimas (TTFT / ITL)

Failai: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` yra vienintelis srautinio kelio instrumentavimo taškas,
integruotas į `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — gautas pirmasis pirminio šaltinio fragmentas.
- `markForward()` — pirmasis klientui persiųstas fragmentas (naudojamas TTFT).
- `markInterrupted()` — srauto skirtasis laikas baigėsi, srautas buvo nutrauktas arba įvyko klaida prieš jam tvarkingai pasibaigiant.
- `ttft()` = pirmojo persiųsto SSE fragmento delsa. **Tai NĖRA leksemos lygmens TTFT** —
  viename SSE fragmente gali būti nulis, viena arba daug leksemų. Tiksliai dokumentuota.
- `avgItlMs()` = vidutinis tarpas tarp fragmentų (fragmentų delsos pakaitinis ITL rodiklis).

TTFT/ITL/nutraukimo duomenys patenka į `RoutingEvent` (`ttftMs`, `itlMs`) ir yra
OTel išvesties komponento eksportuojami kaip GenAI/OmniRoute intervalų atributai.

## 4. OpenTelemetry / GenAI stebimumas

Failai: `open-sse/services/routing/otel.ts`

- Nuo priklausomybių nepriklausomas OTLP/HTTP JSON eksportavimo komponentas (naudoja visuotinį `fetch`, o ne
  `@opentelemetry/*` SDK).
- Intervalai atitinka GenAI semantines konvencijas (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) ir OmniRoute maršruto parinkimo
  atributus (rezultatas, būsena, ttft, pakartotiniai bandymai, atsarginis variantas).
- `record()` tik įtraukia į riboto dydžio buferį (O(1)); foninis laikmatis
  asinchroniškai išsiunčia duomenis per `POST {endpoint}/v1/traces`. Esant perkrovai,
  seniausi įvykiai pašalinami (`dropped` skaitiklis) — duomenų perdavimo plokštumai niekada nesukuriamas
  atgalinis spaudimas.
- **Išjungta, jei nesukonfigūruota.** Turi būti nustatytas `OMNIROUTE_OTEL_ENDPOINT` (arba
  `OTEL_EXPORTER_OTLP_ENDPOINT`); priešingu atveju išvesties komponentas
  neregistruojamas ir nevykdomas joks OTel kodas.

## 5. Paaiškinamumas

- `GET /v1/explain/routing` grąžina naujausius `RoutingEvent` įvykius (tikruosius
  sprendimus, pradedant naujausiais) ir kiekvieno teikėjo / modelio kokybės momentinę būseną.
- Autentifikavimas atitinka `/v1/combos` (Bearer API raktas arba valdymo skydelio seansas; anoniminė prieiga
  vieno naudotojo vietiniuose diegimuose, kuriuose `REQUIRE_API_KEY=false`).
- Kiekvieno junginio iškvietimo lygmens trasos ir toliau pasiekiamos per esamą
  `decisionTrace.ts` (antraštė `X-OmniRoute-Combo-Trace`).
- Sauga: įvykiuose pateikiami tik maršruto parinkimo metaduomenys, niekada neįtraukiamos užklausos / turiniai / prisijungimo duomenys.

## 6. Vertinimo plokštumos integracija (pasirengimas Future AGI)

OmniRoute traktuoja Future AGI (ar bet kurį vertintoją) kaip **galimą
intelekto / vertinimo posistemę, o ne priklausomybę**. Integravimo taškai:

- `RoutingEventSink` gali asinchroniškai persiųsti įvykius vertintojui.
- `MemoryRoutingEventStore` ir kokybės momentinė būsena suteikia vertintojui neapdorotą
  sprendimų srautą.
- Būsimas `Evaluator` (deterministinis, vietinis vertintojas, HTTP, WASM) naudotų
  įvykius / trasas ir grąžintų `QualityScore`, kuris būtų perduodamas tam pačiam
  `getQualityScore` / kokybės koeficiento keliui.
- Esamas vertinimais grindžiamas maršruto parinkimas (`open-sse/services/evalRouting.ts`) jau
  pakeičia junginio tikslų eilės tvarką pagal `eval_runs` sėkmės rodiklius, kai ši funkcija įjungta.

Joks vertinimas nevykdomas sinchroniškai užklausos kelyje, o tinklų sietuvas visapusiškai
veikia ir nesant vertintojo.

## 7. Galutinė architektūros apžvalga

1. **Kas lieka sinchroniniame intensyviai naudojamame kelyje?** Maršruto parinkimas / balų skaičiavimas, apsauginių ribojimų
   išankstinės patikros, podėlio peržiūra ir vienas `emitRoutingEvent` paskirstymas (~0,12 µs virš
   bazinio balų skaičiavimo lygio) atmintyje veikiantiems išvesties komponentams.
2. **Kas perkelta į asinchroninį apdorojimą?** OTel eksportavimas (laikmatis + fetch),
   `call_logs` / naudojimo duomenų išsaugojimas, semantinio podėlio įrašai; kokybės duomenys laikomi atmintyje
   ir apdorojami per O(1) (asinchroniškumas nereikalingas).
3. **Kaip maršruto parinkimo rezultatas tampa grįžtamuoju ryšiu?** `handleChatCore` išleidžia
   `RoutingEvent` → `QualityTracker` atnaujina EWMA būseną → `getQualityScore`
   pateikia duomenis automatinio junginio `quality` koeficientui.
4. **Kaip kokybė veikia būsimą maršruto parinkimą?** Žemas kokybės įvertis sumažina
   to teikėjo / modelio svertinį įvertį funkcijoje `scoreAutoTargets`, todėl suprastėję
   modeliai palaipsniui pasirenkami rečiau ir vėl dažniau pasirenkami gerėjant jų EWMA.
5. **Kaip Future AGI gali būti integruota netapdama priklausomybe?** Per
   `RoutingEventSink` sąsają / būsimą `Evaluator` adapterį — nėra tiesiogiai įrašytos
   priklausomybės.
6. **Kas nutinka, kai vertintojas nepasiekiamas?** Maršruto parinkimas lieka nepaveiktas;
   modeliams, apie kuriuos nėra stebėjimo signalo, kokybės vertė pagal numatytąją nuostatą yra neutrali (1.0).
7. **Kas nutinka, kai telemetrija nepasiekiama?** OTel išvesties komponentas tiesiog
   neregistruojamas; likusi maršruto parinkimo sluoksnio dalis veikia be pakeitimų.
8. **Kas nutinka esant perkrovai?** OTel buferis pašalina seniausius įvykius; kokybės
   duomenų struktūros ir žiedinis buferis yra apriboti pagal konstrukciją; atgalinis spaudimas nesukuriamas.
9. **Kaip teikėjo būsena atkuriama suprastėjus veikimui?** Kaupiantis sėkmingiems rezultatams, EWMA
   iš naujo konverguoja; apšilimo mechanizmas išlaiko naujų modelių neutralumą; grandinės pertraukiklis
   nepriklausomai atsikuria naudodamas HALF_OPEN zondus.
10. **Kurios pasiūlytos funkcijos sąmoningai NEBUVO įgyvendintos ir kodėl?**
    - Šešėlinis srautas / eksperimentai — jau įgyvendinta
      (`combo/shadowRouting.ts`); nebuvo kuriama iš naujo.
    - Apsauginiai ribojimai — jau įgyvendinti (`src/lib/guardrails/`); nedubliuoti.
    - Semantinis podėlis — jau įgyvendintas (`src/lib/semanticCache.ts`); nedubliuotas.
    - Visapusė eksperimentų valdymo platforma, duomenų rinkinių įrankiai, užklausų optimizavimo
      platforma, vektorinė DB arba privaloma išorinė OTel infrastruktūra — nepatenka į
      supaprastintos duomenų perdavimo plokštumos apimtį.
    - Rust `RoutingEvent` struktūra — duomenų perdavimo plokštuma parašyta TypeScript kalba; TS tipas
      yra pritaikytas atitikmuo.

## 8. Konfigūracijos nuoroda

| Kintamasis                    | Numatytoji reikšmė | Poveikis                                                                             |
| ----------------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | nenustatyta        | Kai nustatyta, įjungia OTLP/HTTP trasų eksportuoklį (pvz., `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nenustatyta        | Atsarginis OTLP galinio taško alternatyvus pavadinimas.                              |
| `OTEL_SERVICE_NAME`           | `omniroute`        | `service.name` ištekliaus atributas.                                                 |

## 9. Testai

- `tests/unit/routing-events.test.ts` — įvykių normalizavimas, būsenos
  klasifikavimas, ribotas žiedinis buferis, paskirstymas į išvesties kanalus ir jų izoliavimas.
- `tests/unit/routing-quality.test.ts` — EWMA pradinis stabilizavimas, atkūrimas po nesėkmės / sėkmės,
  anomalijų baudos, laikinas 429 atsakų apdorojimas, momentinė kopija, nustatymas iš naujo.
- `tests/unit/routing-scoring-quality.test.ts` — svorių vientisumas, neutrali
  numatytoji reikšmė, reitingavimas pagal kokybės koeficientą.
- `tests/unit/routing-otel.test.ts` — įjungimo valdymas, GenAI intervalo naudingoji apkrova, asinchroninis
  išsiuntimas, atmetimas perkrovos metu.
- `tests/unit/routing-events-concurrency.test.ts` — tūkstančiai įvykių, žiedinio
  buferio ribotumas, išimtį sukeliančio išvesties kanalo izoliavimas, persipynusios asinchroninės įvykių serijos,
  nustatymas iš naujo įterpimo metu.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministinis visapusis ciklas naudojant
  tikrąją `scoreAutoTargets` vertinimo funkciją: sveika būsena → pablogėjimas → atkūrimas → trumpalaikis sutrikimas, taip pat
  šaltojo paleidimo ir sėkmingai parinkto šaltojo teikėjo scenarijai.
- `tests/unit/stream-timing.test.ts` — TTFT (pirmasis persiųstas fragmentas), ITL,
  pirmasis baitas ir pirmasis persiuntimas, pertraukimas, saugus netinkamai suformuotų / tuščių fragmentų apdorojimas.

## 10. Anksčiau egzistavusių problemų būsena (18 etapas)

| Problema                                                | Būsena                            | Pastabos                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` eksporto neatitiktis                        | **IŠTAISYTA (aplinkos problema)** | `node_modules` nesutapo su `package-lock.json` (buvo įdiegta 1.3.1, o užfiksuota 1.4.0). Paleidus `npm install omniglyph@1.4.0`, buvo atkurta užfiksuota versija; tipų klaidų sumažėjo iki 0. Manifestai nepakeisti.                                                          |
| Pasenę `getKnownContextOverflow` testai                 | **ŽINOMA — neištaisyta**          | `combo-context-overflow-compression-probe.test.ts` importuoja funkciją, kurios `open-sse/services/combo.ts` faile nebėra (ją nurodo tik komentarai). Norint ištaisyti, reikia ją įgyvendinti iš naujo arba perrašyti šiuos testus — tai nesusiję architektūriniai pakeitimai. |
| `combo-runtime-unit-concurrency.test.ts` DB izoliavimas | **ŽINOMA — neištaisyta**          | Testų infrastruktūros SQLite izoliavimo patikra nepavyksta, kai testas paleidžiamas tiesiogiai; bazinėje šakoje ji nepavyksta lygiai taip pat.                                                                                                                                |
| i18n `llm.txt` neatitiktis                              | **ŽINOMA — neištaisyta**          | `docs/i18n/*/llm.txt` skiriasi nuo šakninio failo; tai jau egzistavusi problema, blokuojanti dokumentacijos sinchronizavimo patikrą prieš įvykdant pakeitimų įrašymą.                                                                                                         |

Aplinkos ir kodo problemos laikomos atskiromis; jokios nesusijusios triktys nėra slepiamos
pakeistais testų filtrais.
