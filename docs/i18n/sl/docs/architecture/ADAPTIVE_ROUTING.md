# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Ta dokument opisuje temelj prilagodljivega usmerjanja na podlagi povratnih informacij, dodan v
OmniRoute. Namenoma je majhen: uvaja tipiziran kanal za izide usmerjanja,
sprotni signal kakovosti, ki napaja obstoječi ocenjevalnik auto-combo, izbirni
izvoznik OpenTelemetry in končno točko za razložljivost. **Ne**
nadomešča obstoječega sklada odpornosti (prekinjevalnik tokokroga, ohlajanje povezave,
zaklep modela, matrika zdravja, avtopilot) — temveč ga dopolnjuje.

## 1. Arhitekturni kontekst

OmniRoute je podatkovna ravnina z **vročo potjo zahtev** in **nadzorno/inteligenčno
ravnino**. Vroča pot mora ostati hitra, pomnilniško učinkovita, asinhrona, odporna in
predvidljiva. Vrednotenje, ocenjevanje kakovosti, poskusi in zgodovinska analiza sodijo
v nadzorno ravnino.

```
Agent UI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   podatkovna ravnina (hitra, sinhrona, v pomnilniku)
│ usmerjanje / preklop│
│ zdravje / varovala  │
│ predpom. / pretakanje│
└──────────┬──────────┘
           │ RoutingEvent (sproži in pozabi, ~0.2µs)
           ▼
┌─────────────────────┐
│ Ponori povr. inform.│   nadzorna ravnina (asinhrona, po najboljših močeh)
│ sledilnik kakovosti │
│ izvoznik OTel       │
│ shramba razlag      │
└──────────┬──────────┘
           ▼  ocena kakovosti
      ocenjevalnik auto-combo
```

### Kar je že obstajalo (pregledano, brez podvajanja)

| Koncept                                       | Obstoječa implementacija                                                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Razpoložljivost (ali lahko pošljemo promet?)  | Prekinjevalnik tokokroga (CLOSED/DEGRADED/OPEN/HALF_OPEN, shranjen v DB), ohlajanje povezave, zaklep modela            |
| Poročanje o zdravju                           | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                |
| Senčni promet                                 | `open-sse/services/combo/shadowRouting.ts`                                                                             |
| Varovala                                      | `src/lib/guardrails/` (kavlji pred/po izvedbi)                                                                         |
| Natančni predpomnilnik                        | `src/lib/semanticCache.ts` (na podlagi podpisa)                                                                        |
| Ocenjevalniki/usmerjanje na podlagi evalvacij | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                   |
| Razložljivost odločitev combo                 | `open-sse/services/combo/decisionTrace.ts`                                                                             |
| Dogodki nadzorne plošče v realnem času        | `src/lib/events/eventBus.ts` (kanal obvestil uporabniškega vmesnika, koristni tovori `unknown`, zgodovina s 100 vnosi) |

Plast dogodkov usmerjanja **ni** ponovna implementacija `eventBus`: to vodilo je
kanal nadzorne plošče za obvestila v realnem času (tipizirana _imena dogodkov_,
neprosojni koristni tovori, odjemalci uporabniškega vmesnika). `RoutingEvent` je tipizirana _struktura izida_
(zakasnitev/žetoni/strošek/izid/razlog zaključka), ki jo uporabljajo ponori povratnih informacij
nadzorne ravnine (sledilnik kakovosti, izvoznik OTel, shramba razlag).

### Kar je manjkalo (dodano tukaj)

1. **Tipiziran dogodek izida usmerjanja + abstrakcija ponora** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` je omejen na combo in samo na pomnilnik;
   `comboMetrics` so kumulativni števci; `call_logs` je neobdelana asinhrona trajna hramba.
   Nobeden od teh ni tipiziran kanal izidov na podlagi ponorov, na katerega se lahko naročijo sledilnik
   kakovosti, izvoznik OTel ali ocenjevalnik v slogu Future-AGI.
2. **Sprotni signal kakovosti** (EWMA) za kakovost izhoda — ocenjevalnik je prej
   približek »kakovosti« določal samo prek statične primernosti za nalogo in deležev uspešnosti izbirnih evalvacij.
3. **Izbirni izvoznik OTel brez odvisnosti**, ki uporablja semantične konvencije GenAI.
4. **Končna točka za razložljivost**, ki vrača dejanske odločitve usmerjanja + stanje kakovosti.

## 2. Dogodki usmerjanja (osnova povratne zanke)

Datoteke: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` vsebuje samo metapodatke usmerjanja:

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
  outcome: RoutingOutcome; // unija dovoljenih vrednosti
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` je v TypeScriptu lastnost v slogu `Send+Sync`:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // mora biti O(1), brez sinhronega V/I
}
```

Vroča pot enkrat za vsako zaključeno zahtevo pokliče `emitRoutingEvent(event)`
(povratni klic ob zaključku pretočnega prenosa, pot uspeha brez pretočnega prenosa in
pot neuspeha zaradi nepravilno oblikovanega odgovora 200 v `handleChatCore`). Razpošiljanje je sinhrono
razvejanje do registriranih ponorov, vendar vsak ponor samo postavi podatke v vrsto oziroma posodobi stanje v pomnilniku. **Brez
sinhronega zapisovanja v podatkovno zbirko in brez omrežnega V/I na vroči poti.**

Privzeti ponori:

- `MemoryRoutingEventStore` — omejen (500) krožni medpomnilnik, najnovejši dogodki prvi, za
  končno točko za razlago.
- Porabnik `QualityTracker` — posodablja oceno kakovosti EWMA.
- `OtlpHttpsEventSink` — izbiren; omogočen samo, ko je nastavljena spremenljivka `OMNIROUTE_OTEL_ENDPOINT`
  (ali `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Izmerjena režija (poštena primerjava)

`npm run bench:routing-events` na tej delovni postaji (100.000 ponovitev; operacije pod µs so
izmerjene združeno v µs/operacijo, ker so percentili posameznih operacij pod
ločljivostjo časovnika `performance.now()`):

| Scenarij                                     | µs/operacijo | operacij/s |
| -------------------------------------------- | ------------ | ---------- |
| izhodišče (samo točkovanje)                  | ~0.045       | ~22 M      |
| izhodišče + RoutingEvent (2 ponora)          | ~0.168       | ~5.9 M     |
| izhodišče + dogodek + uvrstitev OTel v vrsto | ~0.163       | ~6.1 M     |
| sočasno (8 prepletenih sunkov)               | ~0.18        | —          |

Razlika razpošiljanja dogodkov glede na izhodiščno točkovanje znaša ~0,12 µs/zahtevo; ponor OTel
podatke samo postavi v vrsto (dodajanje v medpomnilnik O(1)), zato ne doda ničesar merljivega. Te številke so
specifične za napravo in relativne — niso jamstvo za produkcijsko okolje. Podatek »~0,2 µs« iz v1
je bil združena ocena; ta metodologija ločuje izhodiščno točkovanje
od stroška razpošiljanja dogodkov.

## 3. Signal kakovosti (stanje ponudnika, vodeno s povratnimi informacijami)

Datoteke: `open-sse/services/routing/quality.ts`

v2 ločuje **operativno** kakovost od **semantične**:

- **Operativna** — izpeljana iz vroče poti usmerjanja (HTTP 4xx/5xx, napake
  povezave, odgovori 429, nepravilno oblikovani odgovori, prekinitve toka, `finish_reason=length`,
  uspešni odgovori brez izhodnih podatkov, EWMA zakasnitve/TTFT). Odgovor 200 se NE obravnava kot pokazatelj semantične
  kakovosti.
- **Semantična** — dejanska vrednost ustvarjenega izhoda. Ustvari jo lahko IZKLJUČNO
  ocenjevalnik prek `setSemanticQuality()`. Dokler je ta ne zagotovi, je njena vrednost `null` in
  nikoli ne vpliva na operativno oceno.

Stanje za vsak par (ponudnik, model) (EWMA + omejeni števci):

- `successEwma` — EWMA (α=0,2) uspešnosti izida.
- `latencyEwma` / `ttftEwma` — EWMA zakasnitve (α=0,1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — čas od zadnjega opažanja modela.

### Upoštevanje zaupanja/števila vzorcev

`confidence = clamp01(samples / 50)`, ocena, vrnjena ocenjevalniku, pa je
približana nevtralni srednji vrednosti:

```
score = 0.5 + confidence * (operational - 0.5)
```

Posledice (potrjene s testi):

- Hladen ponudnik (0 vzorcev) prejme oceno **0,5** — ni neupravičeno kaznovan, vendar
  ne more prevladati nad ponudnikom s tisoči zanesljivih opažanj.
- Ponudnik s 7 srečnimi uspehi je približan vrednosti 0,5 (zaradi
  optimistične inicializacije nikoli ne prevlada).
- Ponudnik s 50 ali več vzorci konvergira k svoji dejanski operativni oceni.
- Poslabšanje in okrevanje sta postopna (EWMA), ena sama osamljena napaka pa
  ne uniči zdravega ponudnika.

`ProviderQuality` izpostavlja `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

To se posreduje ocenjevalniku samodejnih kombinacij kot faktor točkovanja `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` v
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0,1905 → 0,1605, `quality` 0,03. Vsota ostane 1,0.
- `buildAutoCandidates` nastavi `candidate.quality` iz sledilnika; kandidati
  brez podatkov privzeto prejmejo nevtralno vrednost **0,5** (hladen kandidat ni niti prednostno obravnavan niti
  kaznovan).

Zaprta zanka:

```
RoutingEvent → QualityTracker → getQualityScore → faktor kakovosti samodejne kombinacije
      ↑                                                    │
      └────── izid zahteve (handleChatCore) ←──────────────┘
```

### Stroga izključitev v primerjavi z mehko kaznijo

Signal kakovosti je samo **mehka prilagodljiva preferenca**. Stroga izključitev ostaja
v obstoječem skladu odpornosti: prekinjevalnik tokokroga OPEN, izčrpana kvota,
napaka preverjanja pristnosti, zaklep modela — ocena kakovosti ne vpliva na nič od tega.
Ponudnik, čigar ocena kakovosti začasno pade, prejme nižjo prioriteto, vendar ni nikoli
strogo onemogočen.

## 3b. Kanonično časovno merjenje toka (TTFT / ITL)

Datoteke: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` je enotna instrumentacijska točka za pretočno pot,
povezana s `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — prejet je prvi izvorni kos.
- `markForward()` — prvi kos je posredovan odjemalcu (uporablja se za TTFT).
- `markInterrupted()` — časovna omejitev toka/prekinitev/napaka pred pravilnim zaključkom.
- `ttft()` = zakasnitev do prvega posredovanega kosa SSE. **To NI TTFT na ravni žetonov** —
  posamezen kos SSE lahko vsebuje nič, enega ali več žetonov. Natančno dokumentirano.
- `avgItlMs()` = povprečni interval med kosi (približek zakasnitve kosov za ITL).

TTFT/ITL/stanje prekinitve se prenesejo v `RoutingEvent` (`ttftMs`, `itlMs`) in so
izvoženi kot atributi razpona GenAI/OmniRoute prek ponora OTel.

## 4. Opazljivost OpenTelemetry / GenAI

Datoteke: `open-sse/services/routing/otel.ts`

- Izvoznik OTLP/HTTP JSON brez odvisnosti (uporablja globalni `fetch`, brez
  SDK-ja `@opentelemetry/*`).
- Razponi sledijo semantičnim konvencijam GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) in atributom usmerjanja
  OmniRoute (izid, stanje, ttft, ponovni poskusi, nadomestna možnost).
- `record()` samo doda dogodek v omejen medpomnilnik (O(1)); časovnik v ozadju
  jih asinhrono pošilja prek `POST {endpoint}/v1/traces`. Ob preobremenitvi se
  najstarejši dogodki zavržejo (števec `dropped`) — brez povratnega pritiska na
  podatkovno ravnino.
- **Onemogočeno, če ni konfigurirano.** Nastavljena mora biti spremenljivka
  `OMNIROUTE_OTEL_ENDPOINT` (ali `OTEL_EXPORTER_OTLP_ENDPOINT`); sicer ponor ni
  registriran in se ne izvede nobena koda OTel.

## 5. Pojasnljivost

- `GET /v1/explain/routing` vrne nedavne dogodke `RoutingEvent` (dejanske
  odločitve, najnovejše najprej) in posnetek kakovosti za posameznega ponudnika/model.
- Preverjanje pristnosti je enako kot pri `/v1/combos` (ključ API Bearer ali seja
  nadzorne plošče; anonimen dostop pri lokalnih namestitvah za enega uporabnika z
  `REQUIRE_API_KEY=false`).
- Sledi na ravni kombinacije za posamezne klice ostajajo na voljo prek obstoječega
  `decisionTrace.ts` (glava `X-OmniRoute-Combo-Trace`).
- Varnost: dogodki vsebujejo samo metapodatke usmerjanja, nikoli pozivov/teles zahtev/poverilnic.

## 6. Integracija evalvacijske ravnine (pripravljenost na Future AGI)

OmniRoute obravnava Future AGI (ali kateri koli ocenjevalnik) kot **potencialno
zaledje za inteligenco/ocenjevanje, ne kot odvisnost**. Integracijske točke:

- `RoutingEventSink` lahko asinhrono posreduje dogodke ocenjevalniku.
- `MemoryRoutingEventStore` in posnetek kakovosti ocenjevalniku zagotavljata
  neobdelan tok odločitev.
- Prihodnji `Evaluator` (determinističen, lokalni ocenjevalnik, HTTP, WASM) bi
  uporabljal dogodke/sledi in vračal `QualityScore`, ki se posreduje v isto pot
  `getQualityScore`/faktorja kakovosti.
- Obstoječe usmerjanje na podlagi evalvacij (`open-sse/services/evalRouting.ts`)
  že prerazporeja cilje kombinacij glede na stopnje uspešnosti `eval_runs`, kadar
  je omogočeno.

Nobena evalvacija se ne izvaja sinhrono na poti zahteve, prehod pa v celoti
deluje tudi brez ocenjevalnika.

## 7. Končni arhitekturni pregled

1. **Kaj ostane na sinhroni vroči poti?** Usmerjanje/točkovanje, predhodna
   preverjanja varoval, iskanje v predpomnilniku in eno razprševanje
   `emitRoutingEvent` (~0,12 µs glede na osnovno točkovanje) v ponore v pomnilniku.
2. **Kaj je bilo premaknjeno v asinhrono obdelavo?** Izvoz OTel (časovnik + fetch),
   trajno shranjevanje `call_logs`/porabe, zapisovanje v semantični predpomnilnik;
   kakovost se hrani v pomnilniku in je O(1) (asinhronost ni potrebna).
3. **Kako rezultat usmerjanja postane povratna informacija?** `handleChatCore`
   odda `RoutingEvent` → `QualityTracker` posodobi stanje EWMA →
   `getQualityScore` napaja faktor `quality` samodejne kombinacije.
4. **Kako kakovost vpliva na prihodnje usmerjanje?** Nizka ocena kakovosti zmanjša
   uteženo oceno tega ponudnika/modela v `scoreAutoTargets`, zato se degradiranim
   modelom postopoma zmanjšuje prednost, nato pa si jo znova pridobijo, ko se
   njihova EWMA izboljšuje.
5. **Kako se lahko Future AGI integrira, ne da bi postal odvisnost?** Prek
   vmesnika `RoutingEventSink`/prihodnjega vmesnika `Evaluator` — brez trdo
   kodirane odvisnosti.
6. **Kaj se zgodi, ko ocenjevalnik ni na voljo?** To ne vpliva na usmerjanje;
   kakovost se za modele brez opaženega signala povrne na nevtralno vrednost (1.0).
7. **Kaj se zgodi, ko telemetrija ni na voljo?** Ponor OTel preprosto ni
   registriran; preostanek plasti usmerjanja deluje nespremenjeno.
8. **Kaj se zgodi ob preobremenitvi?** Medpomnilnik OTel zavrže najstarejše
   dogodke; kakovost in obročni medpomnilnik sta konstrukcijsko omejena; brez
   povratnega pritiska.
9. **Kako se stanje ponudnika obnovi po degradaciji?** EWMA se znova približa
   ustrezni vrednosti, ko se uspehi kopičijo; ogrevanje ohranja hladne modele
   nevtralne; odklopnik se neodvisno obnovi s preizkusi HALF_OPEN.
10. **Katere predlagane funkcije namenoma NISO bile implementirane in zakaj?**
    - Senčni promet/eksperimenti — že implementirano
      (`combo/shadowRouting.ts`); ni bilo ponovno izdelano.
    - Varovala — že implementirano (`src/lib/guardrails/`); ni podvojeno.
    - Semantični predpomnilnik — že implementirano (`src/lib/semanticCache.ts`);
      ni podvojeno.
    - Celovita platforma za upravljanje eksperimentov, orodja za podatkovne
      zbirke, platforma za optimizacijo pozivov, vektorska zbirka podatkov ali
      obvezna zunanja infrastruktura OTel — zunaj obsega vitke podatkovne ravnine.
    - Rustova struktura `RoutingEvent` — podatkovna ravnina je v jeziku
      TypeScript; tip TS je prilagojena ustreznica.

## 8. Referenca konfiguracije

| Spremenljivka                 | Privzeto       | Učinek                                                                              |
| ----------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | ni nastavljeno | Ko je nastavljena, omogoči izvoznik sledi OTLP/HTTP (npr. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ni nastavljeno | Rezervni vzdevek za končno točko OTLP.                                              |
| `OTEL_SERVICE_NAME`           | `omniroute`    | Atribut vira `service.name`.                                                        |

## 9. Testi

- `tests/unit/routing-events.test.ts` — normalizacija dogodkov, razvrščanje
  stanj, omejeni krožni medpomnilnik, razpošiljanje ponorom in izolacija.
- `tests/unit/routing-quality.test.ts` — ogrevanje EWMA, obnovitev po neuspehu/uspehu,
  kazni za anomalije, obravnava prehodnega stanja 429, posnetek stanja, ponastavitev.
- `tests/unit/routing-scoring-quality.test.ts` — celovitost uteži, nevtralna
  privzeta vrednost, razvrščanje po faktorju kakovosti.
- `tests/unit/routing-otel.test.ts` — pogojno omogočanje, vsebina razpona GenAI, asinhrono
  praznjenje, opuščanje ob preobremenitvi.
- `tests/unit/routing-events-concurrency.test.ts` — na tisoče dogodkov, omejenost krožnega
  medpomnilnika, izolacija ponora, ki sproža izjeme, prepleteni asinhroni sunki,
  ponastavitev med vstavljanjem.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministična zanka od začetka do konca prek
  dejanskega ocenjevalnika `scoreAutoTargets`: zdravo → poslabšanje → obnovitev → kratka motnja, poleg
  scenarijev hladnega zagona in srečnega ponudnika s hladnim zagonom.
- `tests/unit/stream-timing.test.ts` — TTFT (prvi posredovani kos), ITL,
  prvi bajt v primerjavi s prvim posredovanjem, prekinitev, varna obravnava nepravilno oblikovanih/praznih kosov.

## 10. Stanje že obstoječih težav (18. faza)

| Težava                                                                 | Stanje                     | Opombe                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neujemanje izvoza `omniglyph`                                          | **ODPRAVLJENO (okoljsko)** | `node_modules` ni bil usklajen s `package-lock.json` (nameščena različica 1.3.1 namesto zaklenjene 1.4.0). Zagon `npm install omniglyph@1.4.0` je obnovil zaklenjeno različico; število napak tipov se je zmanjšalo na 0. Manifesti so ostali nespremenjeni.  |
| Zastareli testi `getKnownContextOverflow`                              | **ZNANO — ni odpravljeno** | `combo-context-overflow-compression-probe.test.ts` uvaža funkcijo, ki v `open-sse/services/combo.ts` ne obstaja več (nanjo se sklicujejo le komentarji). Odprava zahteva ponovno implementacijo ali predelavo teh testov — nepovezano arhitekturno poseganje. |
| Izolacija podatkovne zbirke v `combo-runtime-unit-concurrency.test.ts` | **ZNANO — ni odpravljeno** | Preverjanje izolacije SQLite v testnem ogrodju je neuspešno pri neposrednem zagonu; enako je neuspešno tudi na osnovni veji.                                                                                                                                  |
| Odstopanje i18n `llm.txt`                                              | **ZNANO — ni odpravljeno** | Datoteke `docs/i18n/*/llm.txt` se razlikujejo od korenske; težava je že obstajala in blokira preverjanje sinhronizacije dokumentacije pred potrditvijo.                                                                                                       |

Okoljske težave in težave v kodi se obravnavajo ločeno; nobeni nepovezani neuspehi niso skriti
za spremenjenimi filtri testov.
