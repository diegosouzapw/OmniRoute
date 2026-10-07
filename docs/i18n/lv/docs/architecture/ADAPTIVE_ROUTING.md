# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Šajā dokumentā ir aprakstīts uz atgriezenisko saiti balstītas adaptīvās maršrutēšanas pamats, kas pievienots
OmniRoute. Tas ir apzināti neliels: tas ievieš tipizētu maršrutēšanas iznākumu
kanālu, tiešsaistes kvalitātes signālu, kas papildina esošo automātisko kombināciju vērtētāju,
neobligātu OpenTelemetry eksportētāju un izskaidrojamības galapunktu. Tas **neaizstāj**
esošo noturības steku (ķēdes pārtraucēju, savienojuma atdzišanas periodu,
modeļa bloķēšanu, veselības stāvokļa matricu, autopilotu) — tas to papildina.

## 1. Arhitektūras konteksts

OmniRoute ir datu plakne ar **pieprasījumu kritisko izpildes ceļu** un **vadības/intelekta
plakni**. Kritiskajam izpildes ceļam jāpaliek ātram, atmiņu efektīvi izmantojošam, asinhronam, noturīgam un
paredzamam. Novērtēšana, kvalitātes vērtēšana, eksperimenti un vēsturiskā analīze pieder
vadības plaknei.

```
MI aģents / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   datu plakne (ātra, sinhrona, atmiņā)
│ maršrutēšana/kļūmjpārlēce │
│ veselība / aizsargmehānismi │
│ kešatmiņa / straumēšana │
└──────────┬──────────┘
           │ RoutingEvent (nosūti un aizmirsti, ~0.2µs)
           ▼
┌─────────────────────┐
│ Atgriezeniskās saites saņēmēji │   vadības plakne (asinhrona, pēc labākās iespējas)
│ kvalitātes izsekotājs │
│ OTel eksportētājs   │
│ skaidrojumu krātuve │
└──────────┬──────────┘
           ▼  kvalitātes vērtējums
 automātisko kombināciju vērtētājs
```

### Kas jau bija pieejams (auditēts, nedublēts)

| Koncepcija                                         | Esošā implementācija                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Pieejamība (vai varam sūtīt datplūsmu?)            | Ķēdes pārtraucējs (CLOSED/DEGRADED/OPEN/HALF_OPEN, saglabāts DB), savienojuma atdzišanas periods, modeļa bloķēšana |
| Veselības stāvokļa pārskati                        | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                            |
| Ēnu datplūsma                                      | `open-sse/services/combo/shadowRouting.ts`                                                                         |
| Aizsargmehānismi                                   | `src/lib/guardrails/` (pirms/pēc apstrādes āķi)                                                                    |
| Precīzo atbilstību kešatmiņa                       | `src/lib/semanticCache.ts` (balstīta uz parakstiem)                                                                |
| Vērtētāji / uz novērtējumiem balstīta maršrutēšana | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                               |
| Kombināciju lēmumu izskaidrojamība                 | `open-sse/services/combo/decisionTrace.ts`                                                                         |
| Informācijas paneļa reāllaika notikumi             | `src/lib/events/eventBus.ts` (UI paziņojumu kanāls, `unknown` derīgās slodzes, 100 ierakstu vēsture)               |

Maršrutēšanas notikumu slānis **nav** `eventBus` atkārtota implementācija: šī kopne ir
informācijas paneļa reāllaika paziņojumu kanāls (tipizēti _notikumu nosaukumi_, necaurredzamas
derīgās slodzes, UI patērētāji). `RoutingEvent` ir tipizēta _iznākuma_ struktūra
(latentums/marķieri/izmaksas/iznākums/pabeigšanas iemesls), ko patērē vadības plaknes
atgriezeniskās saites saņēmēji (kvalitātes izsekotājs, OTel eksportētājs, skaidrojumu krātuve).

### Kā trūka (pievienots šeit)

1. **Tipizēts maršrutēšanas iznākuma notikums un saņēmēja abstrakcija** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` attiecas tikai uz kombinācijām un darbojas tikai atmiņā;
   `comboMetrics` ir kumulatīvi skaitītāji; `call_logs` ir neapstrādāta asinhrona pastāvīgā glabāšana.
   Neviens no tiem nav tipizēts, uz saņēmējiem balstīts iznākumu kanāls, kuru var abonēt kvalitātes izsekotājs, OTel
   eksportētājs vai Future-AGI tipa vērtētājs.
2. **Tiešsaistes kvalitātes signāls** (EWMA) izvades kvalitātei — iepriekš vērtētājs
   kvalitāti aizstāja tikai ar statisku piemērotību uzdevumam un pēc izvēles iespējotu novērtējumu sekmīgas izpildes rādītājiem.
3. **Neobligāts OTel eksportētājs bez atkarībām**, kas izmanto GenAI semantiskās konvencijas.
4. **Izskaidrojamības galapunkts**, kas atgriež faktiskos maršrutēšanas lēmumus un kvalitātes stāvokli.

## 2. Maršrutēšanas notikumi (atgriezeniskās saites pamats)

Faili: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` satur tikai maršrutēšanas metadatus:

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
  outcome: RoutingOutcome; // atļauto vērtību apvienojums
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` ir `Send+Sync` stila traits valodā TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // jābūt O(1), bez sinhronas I/O
}
```

Kritiskais izpildes ceļš izsauc `emitRoutingEvent(event)` vienu reizi katram pabeigtajam pieprasījumam
(straumēšanas pabeigšanas atzvanā, nestraumēšanas veiksmīgajā ceļā un
nederīgi formatētas 200 atbildes kļūmes ceļā funkcijā `handleChatCore`). Izplatīšana ir sinhrona izvēršana
reģistrētajiem saņēmējiem, taču katrs saņēmējs tikai ievieto datus rindā vai atjaunina stāvokli atmiņā. **Kritiskajā
izpildes ceļā nav sinhronu datubāzes ierakstu un nav tīkla I/O.**

Noklusējuma saņēmēji:

- `MemoryRoutingEventStore` — ierobežots (500) ciklisks buferis, sākot ar jaunāko ierakstu,
  skaidrošanas galapunktam.
- `QualityTracker` patērētājs — atjaunina EWMA kvalitātes novērtējumu.
- `OtlpHttpsEventSink` — neobligāts; iespējots tikai tad, ja ir iestatīts `OMNIROUTE_OTEL_ENDPOINT`
  (vai `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Izmērītā virsslodze (godīgs salīdzinājums)

`npm run bench:routing-events` šajā darbstacijā (100 tūkst. iterāciju; darbības, kas ilgst mazāk par µs,
mērītas kā apkopotais µs/op, jo katras darbības procentiles ir zemākas par
`performance.now()` taimera izšķirtspēju):

| Scenārijs                                         | µs/op  | ops/s  |
| ------------------------------------------------- | ------ | ------ |
| bāzes līmenis (tikai vērtēšana)                   | ~0.045 | ~22 M  |
| bāzes līmenis + RoutingEvent (2 saņēmēji)         | ~0.168 | ~5.9 M |
| bāzes līmenis + notikums + OTel ievietošana rindā | ~0.163 | ~6.1 M |
| vienlaicīgi (8 pamīšus izpildīti uzplūdi)         | ~0.18  | —      |

Notikumu izplatīšanas starpība salīdzinājumā ar bāzes vērtēšanu ir ~0.12 µs/pieprasījums; OTel saņēmējs
tikai ievieto rindā (O(1) bufera papildināšana), nepievienojot neko izmērāmu. Šie skaitļi ir
konkrētās iekārtas specifiski un relatīvi — tie nav garantija produkcijas videi. v1 norādītais „~0.2 µs”
skaitlis bija apkopots novērtējums; šī metodoloģija nodala vērtēšanas bāzes līmeni
no notikumu izplatīšanas izmaksām.

## 3. Kvalitātes signāls (atgriezeniskās saites vadīts nodrošinātāja stāvoklis)

Faili: `open-sse/services/routing/quality.ts`

v2 nodala **operacionālo** kvalitāti no **semantiskās** kvalitātes:

- **Operacionālā** — iegūta no maršrutēšanas kritiskā izpildes ceļa (HTTP 4xx/5xx, savienojuma
  kļūmes, 429 atbildes, nederīgi formatētas atbildes, straumes pārtraukumi, `finish_reason=length`,
  veiksmīgas atbildes bez izvades, latentuma/TTFT EWMA). 200 atbilde NETIEK uzskatīta par semantisko
  kvalitāti.
- **Semantiskā** — ģenerētās izvades faktiskā vērtība. To VIENMĒR ģenerē tikai
  novērtētājs, izmantojot `setSemanticQuality()`. Tās vērtība ir `null`, līdz novērtētājs to piešķir, un
  tā nekad nenonāk operacionālajā vērtējumā.

Katra (nodrošinātāja, modeļa) stāvoklis (EWMA + ierobežoti skaitītāji):

- `successEwma` — iznākuma veiksmīguma EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — latentuma EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — cik nesen modelis pēdējoreiz tika novērots.

### Pārliecības / paraugu skaita ņemšana vērā

`confidence = clamp01(samples / 50)`, un vērtētājam atgrieztais rezultāts tiek
tuvināts neitrālajam viduspunktam:

```
score = 0.5 + confidence * (operational - 0.5)
```

Sekas (apstiprinātas ar testiem):

- Jauns nodrošinātājs (0 paraugu) saņem vērtējumu **0.5** — tas netiek netaisnīgi sodīts, taču
  nespēj pārspēt nodrošinātāju ar tūkstošiem stabilu novērojumu.
- Nodrošinātājs ar 7 veiksmīgiem iznākumiem veiksmes dēļ tiek tuvināts 0.5 (tas nekad nedominē
  optimistiskas inicializācijas dēļ).
- Nodrošinātājs ar vismaz 50 paraugiem konverģē uz savu patieso operacionālo vērtējumu.
- Pasliktināšanās un atkopšanās notiek pakāpeniski (EWMA), un viena atsevišķa kļūme
  neiznīcina veselīga nodrošinātāja vērtējumu.

`ProviderQuality` eksponē `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Tas tiek padots automātiskās kombinācijas vērtētājam kā `quality` vērtēšanas faktors:

- `ScoringFactors.quality` / `ScoringWeights.quality` failā
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Summa paliek 1.0.
- `buildAutoCandidates` aizpilda `candidate.quality` no izsekotāja; kandidātiem
  bez datiem noklusējuma vērtība ir neitrāla — **0.5** (jauns kandidāts netiek nedz izcelts, nedz
  sodīts).

Noslēgtā atgriezeniskās saites cilpa:

```
RoutingEvent → QualityTracker → getQualityScore → automātiskās kombinācijas kvalitātes faktors
      ↑                                                    │
      └────── pieprasījuma iznākums (handleChatCore) ←─────┘
```

### Stingra izslēgšana un elastīgs sods

Kvalitātes signāls ir tikai **elastīga adaptīva preference**. Stingru izslēgšanu joprojām
veic esošais noturības mehānismu kopums: ķēdes pārtraucējs stāvoklī OPEN, izsmelta kvota,
autentifikācijas kļūme, modeļa bloķēšana — kvalitātes vērtējums neietekmē nevienu no tiem.
Nodrošinātājam, kura kvalitātes vērtējums īslaicīgi samazinās, tiek dota zemāka priekšroka, taču tas nekad
netiek pilnībā atspējots.

## 3b. Kanoniskā straumes laika mērīšana (TTFT / ITL)

Faili: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` ir vienotais instrumentācijas punkts straumēšanas ceļā,
kas integrēts `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — saņemts pirmais augšupstraumes fragments.
- `markForward()` — pirmais klientam pārsūtītais fragments (izmantots TTFT aprēķinam).
- `markInterrupted()` — straumes taimauts/pārtraukšana/kļūda pirms korektas pabeigšanas.
- `ttft()` = pirmā pārsūtītā SSE fragmenta latentums. **Tas NAV marķieru līmeņa TTFT** —
  viens SSE fragments var saturēt nulli, vienu vai daudzus marķierus. Tas ir precīzi dokumentēts.
- `avgItlMs()` = vidējais intervāls starp fragmentiem (fragmentu latentuma aizstājējmetrika ITL novērtēšanai).

TTFT/ITL/pārtraukuma dati tiek iekļauti `RoutingEvent` (`ttftMs`, `itlMs`) un
OTel saņēmējs tos eksportē kā GenAI/OmniRoute laiduma atribūtus.

## 4. OpenTelemetry / GenAI novērojamība

Faili: `open-sse/services/routing/otel.ts`

- No atkarībām brīvs OTLP/HTTP JSON eksportētājs (izmanto globālo `fetch`, bez
  `@opentelemetry/*` SDK).
- Laidumi atbilst GenAI semantiskajām konvencijām (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), kā arī ietver OmniRoute maršrutēšanas
  atribūtus (iznākums, statuss, ttft, atkārtotie mēģinājumi, rezerves variants).
- `record()` tikai ievieto datus ierobežotā buferī (O(1)); fona taimeris
  asinhroni iztukšo buferi, izmantojot `POST {endpoint}/v1/traces`. Pārslodzes gadījumā
  vecākie notikumi tiek atmesti (`dropped` skaitītājs) — datu plaknei nekad netiek radīts
  pretspiediens.
- **Atspējots, ja nav konfigurēts.** Jāiestata `OMNIROUTE_OTEL_ENDPOINT` (vai
  `OTEL_EXPORTER_OTLP_ENDPOINT`); pretējā gadījumā saņēmējs netiek
  reģistrēts un netiek izpildīts neviens OTel kods.

## 5. Izskaidrojamība

- `GET /v1/explain/routing` atgriež nesenos `RoutingEvent` (reālos
  lēmumus, sākot ar jaunāko) un katra nodrošinātāja/modeļa kvalitātes momentuzņēmumu.
- Autentifikācija atbilst `/v1/combos` (Bearer API atslēga vai informācijas paneļa sesija; anonīma piekļuve
  viena lietotāja lokālajos izvietojumos ar `REQUIRE_API_KEY=false`).
- Kombinācijas līmeņa katra izsaukuma trasējumi joprojām ir pieejami, izmantojot esošo
  `decisionTrace.ts` (galvene `X-OmniRoute-Combo-Trace`).
- Drošība: notikumi satur tikai maršrutēšanas metadatus, bet nekad nevednes/ķermeņus/akreditācijas datus.

## 6. Novērtēšanas plaknes integrācija (gatavība Future AGI)

OmniRoute uzskata Future AGI (vai jebkuru vērtētāju) par **potenciālu
intelekta/novērtēšanas aizmugursistēmu, nevis atkarību**. Integrācijas punkti:

- `RoutingEventSink` var asinhroni pārsūtīt notikumus vērtētājam.
- `MemoryRoutingEventStore` un kvalitātes momentuzņēmums nodrošina vērtētājam neapstrādāto
  lēmumu plūsmu.
- Nākotnes `Evaluator` (deterministisks, lokāls vērtētājs, HTTP, WASM) patērētu
  notikumus/trasējumus un atgrieztu `QualityScore`, kas nonāktu tajā pašā
  `getQualityScore`/kvalitātes faktora ceļā.
- Esošā, uz novērtējumiem balstītā maršrutēšana (`open-sse/services/evalRouting.ts`) jau
  maina kombināciju mērķu secību pēc `eval_runs` sekmīgo izpildžu īpatsvara, ja tā ir iespējota.

Pieprasījuma ceļā sinhroni netiek izpildīta neviena novērtēšana, un vārteja darbojas
pilnvērtīgi arī bez vērtētāja.

## 7. Noslēguma arhitektūras pārskats

1. **Kas paliek sinhronajā karstajā ceļā?** Maršrutēšana/vērtēšana, drošības
   ierobežojumu sākotnējās pārbaudes, kešatmiņas uzmeklēšana un viena `emitRoutingEvent` izvēršana (~0,12 µs virs
   bāzes vērtēšanas laika) uz atmiņā esošajiem saņēmējiem.
2. **Kas tika pārvietots uz asinhrono apstrādi?** OTel eksportēšana (taimeris + fetch),
   `call_logs`/lietojuma saglabāšana, semantiskās kešatmiņas ierakstīšana; kvalitātes dati atrodas atmiņā
   un tiek apstrādāti ar O(1) sarežģītību (asinhronitāte nav nepieciešama).
3. **Kā maršrutēšanas iznākums kļūst par atgriezenisko saiti?** `handleChatCore` izstaro
   `RoutingEvent` → `QualityTracker` atjaunina EWMA stāvokli → `getQualityScore`
   nodrošina automātiskās kombinācijas `quality` faktoru.
4. **Kā kvalitāte ietekmē turpmāko maršrutēšanu?** Zems kvalitātes vērtējums samazina
   attiecīgā nodrošinātāja/modeļa svērto vērtējumu funkcijā `scoreAutoTargets`, tāpēc degradētajiem
   modeļiem pakāpeniski tiek samazināta priekšroka, kas atjaunojas, uzlabojoties to EWMA.
5. **Kā Future AGI var integrēt, nekļūstot par atkarību?** Izmantojot
   `RoutingEventSink` saskarni / nākotnes `Evaluator` adapteri — bez fiksēti iekodētas
   atkarības.
6. **Kas notiek, ja vērtētājs nav pieejams?** Maršrutēšana netiek ietekmēta;
   modeļiem bez novērota signāla kvalitātes vērtība pēc noklusējuma ir neitrāla (1.0).
7. **Kas notiek, ja telemetrija nav pieejama?** OTel saņēmējs vienkārši netiek
   reģistrēts; pārējais maršrutēšanas slānis darbojas bez izmaiņām.
8. **Kas notiek pārslodzes gadījumā?** OTel buferis atmet vecākos notikumus; kvalitātes
   dati un gredzenbuferis pēc uzbūves ir ierobežoti; pretspiediens netiek radīts.
9. **Kā nodrošinātāja stāvoklis atjaunojas pēc degradācijas?** Uzkrājoties
   veiksmīgiem rezultātiem, EWMA atkārtoti konverģē; iesildīšana saglabā neitrālu stāvokli nepārbaudītiem modeļiem; jaudas slēdzis
   neatkarīgi atjaunojas, izmantojot HALF_OPEN pārbaudes.
10. **Kuras ierosinātās funkcijas apzināti NETIKA ieviestas un kāpēc?**
    - Ēnu datplūsma / eksperimenti — jau ieviesti
      (`combo/shadowRouting.ts`); netika veidoti atkārtoti.
    - Drošības ierobežojumi — jau ieviesti (`src/lib/guardrails/`); netika dublēti.
    - Semantiskā kešatmiņa — jau ieviesta (`src/lib/semanticCache.ts`); netika
      dublēta.
    - Pilnvērtīga eksperimentu pārvaldības platforma, datu kopu rīki, vedņu optimizācijas
      platforma, vektoru DB vai obligāta ārējā OTel infrastruktūra — ārpus
      kompaktas datu plaknes tvēruma.
    - Rust `RoutingEvent` struktūra — datu plakne ir veidota TypeScript valodā; TS tips
      ir pielāgotais ekvivalents.

## 8. Konfigurācijas atsauce

| Mainīgais                     | Noklusējums   | Ietekme                                                                                  |
| ----------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nav iestatīts | Ja iestatīts, iespējo OTLP/HTTP trasējumu eksportētāju (piem., `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nav iestatīts | OTLP galapunkta rezerves aizstājvārds.                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute`   | `service.name` resursa atribūts.                                                         |

## 9. Testi

- `tests/unit/routing-events.test.ts` — notikumu normalizācija, statusu
  klasifikācija, ierobežots gredzenveida buferis, izvades saņēmēju izkliede un izolācija.
- `tests/unit/routing-quality.test.ts` — EWMA iesildīšanās, atkopšanās pēc kļūmes/panākumiem,
  anomāliju sodi, īslaicīga 429 apstrāde, momentuzņēmums, atiestatīšana.
- `tests/unit/routing-scoring-quality.test.ts` — svaru integritāte, neitrāls
  noklusējums, kvalitātes faktora ranžēšana.
- `tests/unit/routing-otel.test.ts` — iespējošanas nosacījumi, GenAI laiduma lietderīgā slodze, asinhrona
  iztukšošana, atmešana pārslodzes gadījumā.
- `tests/unit/routing-events-concurrency.test.ts` — tūkstošiem notikumu, gredzenveida
  bufera ierobežotība, kļūdas izraisošu izvades saņēmēju izolācija, savstarpēji pārklāti asinhroni uzplūdi,
  atiestatīšana ievietošanas laikā.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministisks pilna cikla process, izmantojot
  īsto `scoreAutoTargets` vērtētāju: stabils → degradējas → atkopjas → īslaicīga kļūme, kā arī
  aukstās palaišanas un veiksmīga aukstā pakalpojumu sniedzēja scenāriji.
- `tests/unit/stream-timing.test.ts` — TTFT (pirmais pārsūtītais fragments), ITL,
  pirmais baits pret pirmo pārsūtījumu, pārtraukšana, droša kļūdainu/tukšu fragmentu apstrāde.

## 10. Iepriekš pastāvējušo problēmu statuss (18. posms)

| Problēma                                              | Statuss                       | Piezīmes                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` eksporta neatbilstība                     | **NOVĒRSTA (vides problēma)** | `node_modules` nebija sinhronizēts ar `package-lock.json` (instalēta 1.3.1, bet fiksēta 1.4.0). Izpildot `npm install omniglyph@1.4.0`, tika atjaunota fiksētā versija; tipu kļūdu skaits samazinājās līdz 0. Manifesti netika mainīti.                                      |
| Novecojuši `getKnownContextOverflow` testi            | **ZINĀMA — nav novērsta**     | `combo-context-overflow-compression-probe.test.ts` importē funkciju, kas vairs nepastāv failā `open-sse/services/combo.ts` (uz to atsaucas tikai komentāri). Labošanai nepieciešams atkārtoti ieviest funkciju vai pārrakstīt šos testus — nesaistīta arhitektūras pārveide. |
| `combo-runtime-unit-concurrency.test.ts` DB izolācija | **ZINĀMA — nav novērsta**     | Testu ietvara SQLite izolācijas apliecinājums neizdodas, palaižot testu tieši; identiski neizdodas arī pamata zarā.                                                                                                                                                          |
| i18n `llm.txt` novirze                                | **ZINĀMA — nav novērsta**     | `docs/i18n/*/llm.txt` atšķiras no saknes versijas; problēma pastāvējusi jau iepriekš un bloķē dokumentācijas sinhronizācijas pirmskomitēšanas pārbaudi.                                                                                                                      |

Vides un koda problēmas tiek nodalītas; nekādas nesaistītas kļūmes netiek slēptas
aiz mainītiem testu filtriem.
