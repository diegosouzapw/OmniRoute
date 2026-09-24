# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Ez a dokumentum az OmniRoute-hoz hozzáadott, visszajelzés-vezérelt adaptív útválasztási alapokat ismerteti. Szándékosan kis terjedelmű: bevezet egy típusos útválasztási eredménycsatornát, egy online minőségi jelet, amely a meglévő auto-combo pontozót táplálja, egy opcionális OpenTelemetry-exportálót, valamint egy magyarázhatósági végpontot. **Nem** helyettesíti a meglévő rezilienciaréteget (áramkör-megszakító, kapcsolati várakozási idő, modellzárolás, állapotmátrix, autopilot) — hanem kiegészíti azt.

## 1. Architekturális kontextus

Az OmniRoute egy adatsík, amely rendelkezik egy **kérések gyors feldolgozási útvonalával** és egy **vezérlési/intelligencia-síkkal**. A gyors útvonalnak gyorsnak, memóriatakarékosnak, aszinkronnak, reziliensnek és kiszámíthatónak kell maradnia. A kiértékelés, a minőségpontozás, a kísérletek és az előzmények elemzése a vezérlési síkhoz tartozik.

```
AI-ügynök / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   adatsík (gyors, szinkron, memórián belüli)
│ útválasztás/átállás │
│ állapot/védőkorlát  │
│ gyorsítótár/adatfolyam │
└──────────┬──────────┘
           │ RoutingEvent (küldés és továbblépés, ~0.2µs)
           ▼
┌─────────────────────┐
│ Visszajelzés-fogadók│   vezérlési sík (aszinkron, törekvésalapú)
│ minőségkövető       │
│ OTel-exportáló      │
│ magyarázattároló    │
└──────────┬──────────┘
           ▼  minőségpontszám
      auto-combo pontozó
```

### Ami már rendelkezésre állt (auditálva, nem duplikálva)

| Fogalom                                        | Meglévő megvalósítás                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Elérhetőség (küldhetünk forgalmat?)            | Áramkör-megszakító (CLOSED/DEGRADED/OPEN/HALF_OPEN, adatbázisban tárolva), kapcsolati várakozási idő, modellzárolás |
| Állapotjelentés                                | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                             |
| Árnyékforgalom                                 | `open-sse/services/combo/shadowRouting.ts`                                                                          |
| Védőkorlátok                                   | `src/lib/guardrails/` (elő-/utófeldolgozási horgok)                                                                 |
| Egzakt gyorsítótár                             | `src/lib/semanticCache.ts` (aláírás-alapú)                                                                          |
| Kiértékelők / kiértékelés-vezérelt útválasztás | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                |
| Combo-döntések magyarázhatósága                | `open-sse/services/combo/decisionTrace.ts`                                                                          |
| Irányítópult valós idejű eseményei             | `src/lib/events/eventBus.ts` (UI-értesítési csatorna, `unknown` hasznos adatok, 100 bejegyzéses előzmény)           |

Az útválasztásiesemény-réteg **nem** az `eventBus` újraimplementálása: ez a busz az irányítópult valós idejű értesítési csatornája (típusos _eseménynevek_, átlátszatlan hasznos adatok, UI-fogyasztók). A `RoutingEvent` egy típusos _eredmény_-struktúra (késleltetés/tokenek/költség/eredmény/befejezési ok), amelyet a vezérlési sík visszajelzés-fogadói (minőségkövető, OTel-exportáló, magyarázattároló) használnak fel.

### Ami hiányzott (itt került hozzáadásra)

1. Egy **típusos útválasztásieredmény-esemény és fogadóabsztrakció** (`RoutingEvent` /
   `RoutingEventSink`). A `decisionTrace` csak a combo hatókörére korlátozódik, és kizárólag memórián belüli;
   a `comboMetrics` kumulatív számlálókat tartalmaz; a `call_logs` nyers aszinkron perzisztencia.
   Egyik sem olyan típusos, fogadóalapú eredménycsatorna, amelyre egy minőségkövető, egy OTel-
   exportáló vagy egy Future-AGI jellegű kiértékelő feliratkozhatna.
2. Egy **online minőségi jel** (EWMA) a kimenet minőségéhez — a pontozó korábban
   a „minőséget” kizárólag statikus feladatalkalmassággal és opcionálisan engedélyezett kiértékelési sikerességi arányokkal közelítette.
3. Egy **opcionális, függőségmentes OTel-exportáló**, amely a GenAI szemantikai konvencióit használja.
4. Egy **magyarázhatósági végpont**, amely a tényleges útválasztási döntéseket és minőségi állapotot adja vissza.

## 2. Útválasztási események (a visszacsatolás alapja)

Fájlok: `open-sse/services/routing/events.ts`, `.../index.ts`

A `RoutingEvent` kizárólag útválasztási metaadatokat tartalmaz:

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
  outcome: RoutingOutcome; // engedélyezési listán szereplő unió
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

A `RoutingEventSink` egy `Send+Sync` jellegű trait TypeScriptben:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) kell legyen, szinkron I/O nélkül
}
```

A kritikus végrehajtási út minden befejezett kéréshez egyszer meghívja az
`emitRoutingEvent(event)` függvényt (a streamelés befejezési visszahívásában, a
nem streamelt sikeres útvonalon, valamint a `handleChatCore` hibás formátumú
200-as válaszához tartozó hibakezelési útvonalon). A továbbítás szinkron
szétosztással történik a regisztrált nyelők felé, de mindegyik nyelő csak sorba
állítja az eseményt, illetve frissíti a memóriában tárolt állapotot. **Nincsenek
szinkron adatbázis-írások és hálózati I/O a kritikus végrehajtási úton.**

Alapértelmezett nyelők:

- `MemoryRoutingEventStore` — korlátozott méretű (500) körkörös puffer, a
  legújabb elemmel elöl, az explain végpont számára.
- `QualityTracker` fogyasztó — frissíti az EWMA-alapú minőségbecslést.
- `OtlpHttpsEventSink` — opcionális; csak akkor engedélyezett, ha az
  `OMNIROUTE_OTEL_ENDPOINT` (vagy az `OTEL_EXPORTER_OTLP_ENDPOINT`) be van állítva.

### Mért többletterhelés (korrekt összehasonlítás)

Az `npm run bench:routing-events` eredménye ezen a munkaállomáson (100 ezer
iteráció; a szubmikroszekundumos műveletek összesített µs/művelet értékként
mérve, mivel a műveletenkénti percentilisek a `performance.now()` időzítő
felbontása alatt vannak):

| Forgatókönyv                             | µs/művelet | művelet/s |
| ---------------------------------------- | ---------- | --------- |
| alapérték (csak pontozás)                | ~0.045     | ~22 M     |
| alapérték + RoutingEvent (2 nyelő)       | ~0.168     | ~5.9 M    |
| alapérték + esemény + OTel-sorba állítás | ~0.163     | ~6.1 M    |
| párhuzamos (8 átlapolt sorozat)          | ~0.18      | —         |

Az eseménytovábbítás alapvető pontozáshoz viszonyított többlete
~0.12 µs/kérés; az OTel-nyelő csak sorba állítja az eseményt (O(1) költségű
pufferbeszúrás), ezért nem okoz mérhető többletet. Ezek a számok
gépspecifikusak és relatívak — nem jelentenek garanciát éles környezetre. A v1
„~0.2 µs” értéke összesített becslés volt; ez a módszertan elkülöníti az
alapvető pontozást az eseménytovábbítás költségétől.

## 3. Minőségi jel (visszacsatolás által vezérelt szolgáltatói állapot)

Fájlok: `open-sse/services/routing/quality.ts`

A v2 elkülöníti a **működési** minőséget a **szemantikai** minőségtől:

- **Működési** — az útválasztás kritikus végrehajtási útjából származik (HTTP
  4xx/5xx, kapcsolódási hibák, 429-es válaszok, hibás formátumú válaszok,
  streammegszakítások, `finish_reason=length`, nulla kimenetű sikeres kérések,
  a késleltetés/TTFT EWMA-értéke). A 200-as válasz NEM számít szemantikai
  minőségnek.
- **Szemantikai** — a létrehozott kimenet tényleges értéke. KIZÁRÓLAG egy
  kiértékelő állíthatja elő a `setSemanticQuality()` használatával. Értéke
  mindaddig `null`, amíg egy kiértékelő meg nem adja, és soha nem kerül bele a
  működési pontszámba.

Szolgáltató- és modellenkénti állapot (EWMA + korlátozott számlálók):

- `successEwma` — az eredmény sikerességének EWMA-értéke (α=0.2).
- `latencyEwma` / `ttftEwma` — a késleltetés EWMA-értéke (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — mennyi idő telt el a modell legutóbbi megfigyelése óta.

### Bizalmi szint / mintaszám figyelembevétele

`confidence = clamp01(samples / 50)`, és a pontozónak visszaadott pontszámot a
semleges középérték felé súlyozzuk:

```
score = 0.5 + confidence * (operational - 0.5)
```

Következmények (tesztekkel ellenőrizve):

- Egy új szolgáltató (0 minta) pontszáma **0.5** — nem kap méltánytalan
  hátrányt, ugyanakkor nem tud felülmúlni egy több ezer megbízható
  megfigyeléssel rendelkező szolgáltatót.
- Egy 7 szerencsés sikerrel rendelkező szolgáltató pontszáma 0.5 felé tolódik
  (az optimista inicializálás miatt soha nem kerül domináns helyzetbe).
- Egy legalább 50 mintával rendelkező szolgáltató pontszáma a tényleges
  működési pontszámához konvergál.
- A romlás és a helyreállás fokozatos (EWMA), és egyetlen elszigetelt hiba nem
  tesz tönkre egy egészséges szolgáltatót.

A `ProviderQuality` a következőket teszi elérhetővé: `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Ez az automatikus kombináció pontozóját a `quality` pontozási tényezőként
táplálja:

- `ScoringFactors.quality` / `ScoringWeights.quality` az
  `open-sse/services/autoCombo/scoring.ts` fájlban.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Az összeg továbbra
  is 1.0.
- A `buildAutoCandidates` a nyomkövetőből tölti fel a `candidate.quality`
  értékét; az adatokkal nem rendelkező jelöltek alapértelmezett értéke a
  semleges **0.5** (egy új jelölt sem előnyt, sem hátrányt nem kap).

A zárt visszacsatolási hurok:

```
RoutingEvent → QualityTracker → getQualityScore → automatikus kombináció minőségi tényezője
      ↑                                                    │
      └────── kérés eredménye (handleChatCore) ←────────────┘
```

### Végleges kizárás és enyhe büntetés

A minőségi jel kizárólag **enyhe, adaptív preferencia**. A végleges kizárást
továbbra is a meglévő rezilienciaréteg kezeli: NYITOTT megszakító, kimerült
kvóta, hitelesítési hiba, modellzárolás — ezek egyikét sem befolyásolja a
minőségi pontszám. Az ideiglenesen lecsökkent minőségi pontszámú szolgáltató
alacsonyabb prioritást kap, de soha nem lesz véglegesen letiltva.

## 3b. Kanonikus streamidőzítés (TTFT / ITL)

Fájlok: `open-sse/utils/streamTiming.ts`

A `createStreamTiming()` a streamelési útvonal egyetlen instrumentációs illesztési pontja,
amely a `createSSEStream` függvényhez kapcsolódik (open-sse/utils/stream.ts):

- `markByte()` — az első upstream-adatdarab beérkezett.
- `markForward()` — az első adatdarab továbbítva az ügyfélnek (a TTFT-hez használva).
- `markInterrupted()` — stream-időtúllépés/megszakítás/hiba a szabályos befejezés előtt.
- `ttft()` = az első továbbított SSE-adatdarab késleltetése. **Ez NEM tokenszintű TTFT** —
  egyetlen SSE-adatdarab nulla, egy vagy több tokent is tartalmazhat. Pontosan dokumentálva.
- `avgItlMs()` = az adatdarabok közötti időköz átlaga (az ITL közelítő mérőszáma).

A TTFT/ITL/megszakítás bekerül a `RoutingEvent` eseménybe (`ttftMs`, `itlMs`), és az
OTel-kimenet GenAI/OmniRoute span-attribútumokként exportálja őket.

## 4. OpenTelemetry / GenAI megfigyelhetőség

Fájlok: `open-sse/services/routing/otel.ts`

- Függőségmentes OTLP/HTTP JSON-exportáló (a globális `fetch` függvényt használja,
  `@opentelemetry/*` SDK nélkül).
- A spanek követik a GenAI szemantikai konvencióit (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`), valamint az OmniRoute útválasztási
  attribútumait (eredmény, állapot, TTFT, újrapróbálkozások, tartalék útvonal).
- A `record()` csak egy korlátozott méretű pufferbe helyezi az adatot (O(1)); egy háttérben
  futó időzítő aszinkron módon üríti azt a `POST {endpoint}/v1/traces` kéréssel. Túlterhelés
  esetén a legrégebbi események eldobásra kerülnek (`dropped` számláló) — az adatútvonalon
  soha nem keletkezik visszanyomás.
- **Konfigurálás nélkül le van tiltva.** Az `OMNIROUTE_OTEL_ENDPOINT` (vagy az
  `OTEL_EXPORTER_OTLP_ENDPOINT`) változót be kell állítani; ellenkező esetben a kimenet
  nincs regisztrálva, és egyetlen OTel-kód sem fut le.

## 5. Magyarázhatóság

- A `GET /v1/explain/routing` visszaadja a legutóbbi `RoutingEvent` eseményeket (a tényleges
  döntéseket, a legújabbal kezdve), valamint a szolgáltatónkénti/modellenkénti minőségi pillanatképet.
- A hitelesítés a `/v1/combos` működését követi (Bearer API-kulcs vagy irányítópult-munkamenet;
  anonim hozzáférés egyfelhasználós helyi telepítéseknél, ha `REQUIRE_API_KEY=false`).
- A kombinációszintű, meghívásonkénti nyomkövetések továbbra is elérhetők a meglévő
  `decisionTrace.ts` segítségével (`X-OmniRoute-Combo-Trace` fejléc).
- Biztonság: az események csak útválasztási metaadatokat tartalmaznak, promptokat,
  törzseket vagy hitelesítő adatokat soha.

## 6. Integráció a kiértékelési síkkal (felkészülés a Future AGI-ra)

Az OmniRoute a Future AGI-t (vagy bármely kiértékelőt) **lehetséges
intelligencia-/kiértékelési háttérrendszerként, nem pedig függőségként** kezeli. Az illesztési pontok:

- Egy `RoutingEventSink` aszinkron módon továbbíthat eseményeket egy kiértékelőnek.
- A `MemoryRoutingEventStore` és a minőségi pillanatkép biztosítja a kiértékelő számára a nyers
  döntési eseményfolyamot.
- Egy jövőbeli `Evaluator` (determinisztikus, helyi bíráló, HTTP, WASM) eseményeket/nyomkövetéseket
  fogyasztana, és egy `QualityScore` értéket adna vissza, amely ugyanabba a
  `getQualityScore`/minőségi tényező útvonalba kerülne.
- A meglévő, kiértékelésvezérelt útválasztás (`open-sse/services/evalRouting.ts`) engedélyezés
  esetén már most is átrendezi a kombináció célpontjait az `eval_runs` sikerességi arányai alapján.

Egyetlen kiértékelés sem fut szinkron módon a kérési útvonalon, és az átjáró a kiértékelő
hiányában is teljes funkcionalitással működik.

## 7. Végső architekturális áttekintés

1. **Mi marad a szinkron kritikus útvonalon?** Útválasztás/pontozás, védőkorlátok
   előzetes ellenőrzései, gyorsítótár-keresés, valamint egyetlen `emitRoutingEvent`
   szétosztás memóriabeli kimenetekhez (az alappontozáshoz képest ~0,12 µs többlet).
2. **Mi került át aszinkron feldolgozásba?** OTel-export (időzítő + fetch),
   a `call_logs`/használati adatok tárolása, a szemantikus gyorsítótár írásai; a minőség
   memóriabeli és O(1) idejű (nincs szükség aszinkron működésre).
3. **Hogyan válik egy útválasztási eredmény visszacsatolássá?** A `handleChatCore` kibocsát
   egy `RoutingEvent` eseményt → a `QualityTracker` frissíti az EWMA-állapotot →
   a `getQualityScore` szolgáltatja az automatikus kombináció `quality` tényezőjét.
4. **Hogyan befolyásolja a minőség a jövőbeli útválasztást?** Az alacsony minőségi pontszám
   csökkenti az adott szolgáltató/modell súlyozott pontszámát a `scoreAutoTargets`
   függvényben, így a leromlott modellek fokozatosan háttérbe szorulnak, majd az EWMA
   javulásával ismét előnyösebbé válnak.
5. **Hogyan integrálható a Future AGI anélkül, hogy függőséggé válna?** A
   `RoutingEventSink` interfészen / egy jövőbeli `Evaluator` adapteren keresztül —
   nincs beégetett függőség.
6. **Mi történik, ha a kiértékelő nem érhető el?** Az útválasztás változatlanul működik;
   a minőség semleges értékre (1.0) áll vissza azoknál a modelleknél, amelyekhez nincs
   megfigyelt jel.
7. **Mi történik, ha a telemetria nem érhető el?** Az OTel-kimenet egyszerűen nincs
   regisztrálva; az útválasztási réteg többi része változatlanul működik.
8. **Mi történik túlterhelés esetén?** Az OTel-puffer eldobja a legrégebbi eseményeket;
   a minőségi állapot és a körkörös puffer eleve korlátozott méretű; nincs visszanyomás.
9. **Hogyan áll helyre a szolgáltató állapota a minőségromlás után?** Az EWMA a sikerek
   felhalmozódásával újra konvergál; a bemelegítés semleges állapotban tartja a még nem
   használt modelleket; az áramkör-megszakító ettől függetlenül `HALF_OPEN` próbákon
   keresztül áll helyre.
10. **Mely javasolt funkciók NEM lettek szándékosan megvalósítva, és miért?**
    - Árnyékforgalom/kísérletek — már megvalósítva
      (`combo/shadowRouting.ts`); nem lettek újra elkészítve.
    - Védőkorlátok — már megvalósítva (`src/lib/guardrails/`); nem lettek megkettőzve.
    - Szemantikus gyorsítótár — már megvalósítva (`src/lib/semanticCache.ts`); nem
      lett megkettőzve.
    - Teljes kísérletkezelési platform, adathalmaz-eszközkészlet, promptoptimalizálási
      platform, vektoradatbázis vagy kötelező külső OTel-infrastruktúra — kívül esik
      egy karcsú adatsík hatókörén.
    - Rust `RoutingEvent` struktúra — az adatsík TypeScript-alapú; a TS-típus
      az ennek megfelelő adaptált változat.

## 8. Konfigurációs referencia

| Változó                       | Alapértelmezett | Hatás                                                                                           |
| ----------------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nincs beállítva | Ha be van állítva, engedélyezi az OTLP/HTTP nyomvonal-exportálót (pl. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nincs beállítva | Tartalék alias az OTLP-végponthoz.                                                              |
| `OTEL_SERVICE_NAME`           | `omniroute`     | A `service.name` erőforrás-attribútum.                                                          |

## 9. Tesztek

- `tests/unit/routing-events.test.ts` — eseménynormalizálás, állapotbesorolás,
  korlátozott méretű körkörös puffer, továbbítás több fogadóhoz + izoláció.
- `tests/unit/routing-quality.test.ts` — EWMA-bemelegedés, helyreállás hibából/sikerből,
  anomáliabüntetések, a 429-es állapot átmeneti kezelése, pillanatkép, visszaállítás.
- `tests/unit/routing-scoring-quality.test.ts` — súlyok integritása, semleges
  alapértelmezés, minőségi tényező szerinti rangsorolás.
- `tests/unit/routing-otel.test.ts` — engedélyezési feltétel, GenAI-span tartalma, aszinkron
  kiürítés, eldobás túlterhelés esetén.
- `tests/unit/routing-events-concurrency.test.ts` — több ezer esemény, a körkörös
  puffer méretkorlátjának betartása, kivételt dobó fogadó izolálása, egymásba fonódó aszinkron sorozatok,
  visszaállítás beszúrások közben.
- `tests/unit/routing-adaptive-e2e.test.ts` — determinisztikus, teljes folyamatot lefedő ciklus
  a valódi `scoreAutoTargets` pontozóval: egészséges → romlás → helyreállás → rövid fennakadás, továbbá
  hidegindítási és szerencsés hideg szolgáltatói forgatókönyvek.
- `tests/unit/stream-timing.test.ts` — TTFT (első továbbított adatdarab), ITL,
  első bájt kontra első továbbítás, megszakítás, hibás/üres adatdarabok biztonságos kezelése.

## 10. Korábban meglévő problémák állapota (18. fázis)

| Probléma                                                 | Állapot                           | Megjegyzések                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Az `omniglyph` exportjának eltérése                      | **JAVÍTVA (környezeti probléma)** | A `node_modules` nem volt szinkronban a `package-lock.json` fájllal (a telepített verzió 1.3.1, a zárolt verzió 1.4.0 volt). Az `npm install omniglyph@1.4.0` futtatása visszaállította a zárolt verziót; a típushibák száma 0-ra csökkent. A manifesztek változatlanok maradtak.                                                             |
| Elavult `getKnownContextOverflow` tesztek                | **ISMERT — nincs javítva**        | A `combo-context-overflow-compression-probe.test.ts` egy olyan függvényt importál, amely már nem létezik az `open-sse/services/combo.ts` fájlban (csak megjegyzések hivatkoznak rá). A javításhoz újra meg kellene valósítani a függvényt, vagy át kellene írni ezeket a teszteket — ez nem kapcsolódó architekturális átalakítást igényelne. |
| A `combo-runtime-unit-concurrency.test.ts` DB-izolációja | **ISMERT — nincs javítva**        | A tesztkörnyezet SQLite-izolációs ellenőrzése közvetlen futtatáskor meghiúsul; az alapágon ugyanígy sikertelen.                                                                                                                                                                                                                               |
| i18n `llm.txt` eltérés                                   | **ISMERT — nincs javítva**        | A `docs/i18n/*/llm.txt` fájlok eltérnek a gyökérben található változattól; ez egy korábban is fennálló probléma, amely blokkolja a dokumentációszinkronizálási pre-commit ellenőrzést.                                                                                                                                                        |

A környezeti és a kóddal kapcsolatos problémákat elkülönítjük; a nem kapcsolódó hibákat nem
rejtjük el módosított tesztszűrők mögé.
