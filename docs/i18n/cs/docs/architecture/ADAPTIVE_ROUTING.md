# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Tento dokument popisuje základ adaptivního směrování řízeného zpětnou vazbou, který byl přidán do
OmniRoute. Záměrně má malý rozsah: zavádí typovaný kanál výsledků směrování,
online signál kvality napájející stávající vyhodnocovací mechanismus auto-combo,
volitelný exportér OpenTelemetry a koncový bod pro vysvětlitelnost. **Nenahrazuje**
stávající vrstvu odolnosti (jistič, čekací dobu připojení,
blokování modelu, matici stavu, autopilota) — doplňuje ji.

## 1. Architektonický kontext

OmniRoute je datová rovina s **kritickou cestou požadavku** a **řídicí/inteligentní
rovinou**. Kritická cesta musí zůstat rychlá, paměťově efektivní, asynchronní, odolná a
předvídatelná. Vyhodnocování, bodování kvality, experimenty a historická analýza patří
do řídicí roviny.

```
AI agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   datová rovina (rychlá, synchronní, v paměti)
│ směrování / failover│
│  stav / guardrail   │
│ cache / streamování │
└──────────┬──────────┘
           │ RoutingEvent (spustit a nečekat, ~0.2µs)
           ▼
┌─────────────────────┐
│  Cíle zpětné vazby  │   řídicí rovina (asynchronní, s maximálním úsilím)
│ sledování kvality   │
│  exportér OTel      │
│ úložiště vysvětlení │
└──────────┬──────────┘
           ▼  skóre kvality
 vyhodnocovací mechanismus auto-combo
```

### Co již existovalo (auditováno, neduplikováno)

| Koncept                                  | Stávající implementace                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Dostupnost (můžeme odeslat provoz?)      | Jistič (CLOSED/DEGRADED/OPEN/HALF_OPEN, uložený v DB), čekací doba připojení, blokování modelu      |
| Hlášení stavu                            | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                             |
| Stínový provoz                           | `open-sse/services/combo/shadowRouting.ts`                                                          |
| Ochranná pravidla                        | `src/lib/guardrails/` (hooky před/po)                                                               |
| Přesná cache                             | `src/lib/semanticCache.ts` (založená na signaturách)                                                |
| Evaluátory / směrování řízené evaluacemi | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                |
| Vysvětlitelnost rozhodnutí combo         | `open-sse/services/combo/decisionTrace.ts`                                                          |
| Události dashboardu v reálném čase       | `src/lib/events/eventBus.ts` (kanál oznámení UI, datové části typu `unknown`, historie 100 položek) |

Vrstva událostí směrování **není** novou implementací `eventBus`: tato sběrnice je
kanálem oznámení dashboardu v reálném čase (typované _názvy událostí_, neprůhledné
datové části, příjemci v UI). `RoutingEvent` je typovaná struktura _výsledku_
(latence/tokeny/náklady/výsledek/důvod dokončení), kterou využívají cíle
zpětné vazby řídicí roviny (sledování kvality, exportér OTel, úložiště vysvětlení).

### Co chybělo (přidáno zde)

1. **Typovaná událost výsledku směrování + abstrakce cíle** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` je omezeno na combo a pouze na paměť;
   `comboMetrics` jsou kumulativní čítače; `call_logs` představuje nezpracovanou asynchronní perzistenci.
   Nic z toho není typovaný kanál výsledků založený na cílech, ke kterému se může přihlásit
   sledování kvality, exportér OTel nebo evaluátor ve stylu Future-AGI.
2. **Online signál kvality** (EWMA) pro kvalitu výstupu — vyhodnocovací mechanismus dříve
   aproximoval „kvalitu“ pouze pomocí statické vhodnosti pro úlohu a volitelných měr úspěšnosti evaluací.
3. **Volitelný exportér OTel bez závislostí** využívající sémantické konvence GenAI.
4. **Koncový bod pro vysvětlitelnost**, který vrací skutečná rozhodnutí směrování + stav kvality.

## 2. Události směrování (základ zpětné vazby)

Soubory: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` obsahuje pouze metadata směrování:

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
  outcome: RoutingOutcome; // sjednocení povolených hodnot
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` je v TypeScriptu rozhraní ve stylu `Send+Sync`:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // musí být O(1), bez synchronního I/O
}
```

Kritická cesta volá `emitRoutingEvent(event)` jednou pro každý dokončený požadavek
(zpětné volání při dokončení streamování, větev úspěchu bez streamování a větev
selhání při chybné odpovědi 200 v `handleChatCore`). Distribuce probíhá synchronním
rozesláním všem registrovaným sinkům, ale každý sink pouze zařazuje data do fronty
nebo aktualizuje stav v paměti. **Žádné synchronní zápisy do databáze ani síťové I/O
na kritické cestě.**

Výchozí sinky:

- `MemoryRoutingEventStore` — omezený kruhový buffer (500), od nejnovějších záznamů,
  pro endpoint s vysvětlením.
- Konzument `QualityTracker` — aktualizuje odhad kvality pomocí EWMA.
- `OtlpHttpsEventSink` — volitelný; aktivuje se pouze tehdy, když je nastavena
  proměnná `OMNIROUTE_OTEL_ENDPOINT` (nebo `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Naměřená režie (poctivé srovnání)

`npm run bench:routing-events` na této pracovní stanici (100 tisíc iterací; operace
kratší než µs jsou měřeny agregovaně v µs/op, protože percentily jednotlivých
operací jsou pod rozlišením časovače `performance.now()`):

| Scénář                           | µs/op  | op/s   |
| -------------------------------- | ------ | ------ |
| základ (pouze skórování)         | ~0.045 | ~22 M  |
| základ + RoutingEvent (2 sinky)  | ~0.168 | ~5.9 M |
| základ + událost + OTel zařazení | ~0.163 | ~6.1 M |
| souběžně (8 proložených dávek)   | ~0.18  | —      |

Rozdíl způsobený distribucí události oproti základnímu skórování je přibližně
~0.12 µs/požadavek; sink OTel data pouze zařazuje do fronty (vložení do bufferu
v O(1)), takže nepřidává žádnou měřitelnou režii. Tato čísla jsou specifická pro
daný stroj a relativní — nejde o záruku pro produkční prostředí. Hodnota
„~0.2 µs“ ve v1 byla agregovaným odhadem; tato metodika odděluje základní
skórování od nákladů na distribuci událostí.

## 3. Signál kvality (stav poskytovatele řízený zpětnou vazbou)

Soubory: `open-sse/services/routing/quality.ts`

v2 odděluje **provozní** kvalitu od **sémantické**:

- **Provozní** — odvozuje se z kritické cesty směrování (HTTP 4xx/5xx, selhání
  připojení, odpovědi 429, chybné odpovědi, přerušení streamu,
  `finish_reason=length`, úspěchy s nulovým výstupem, EWMA latence/TTFT). Odpověď
  200 NENÍ považována za sémantickou kvalitu.
- **Sémantická** — skutečná hodnota vygenerovaného výstupu. Vytváří ji VÝHRADNĚ
  hodnotitel prostřednictvím `setSemanticQuality()`. Dokud ji žádný neposkytne,
  má hodnotu `null` a nikdy se nepromítá do provozního skóre.

Stav pro každou dvojici (poskytovatel, model) (EWMA + omezené čítače):

- `successEwma` — EWMA (α=0.2) úspěšnosti výsledků.
- `latencyEwma` / `ttftEwma` — EWMA latence (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — jak nedávno byl model naposledy pozorován.

### Zohlednění důvěryhodnosti / počtu vzorků

`confidence = clamp01(samples / 50)` a skóre vrácené skórovacímu mechanismu se
posouvá směrem k neutrálnímu středu:

```
score = 0.5 + confidence * (operational - 0.5)
```

Důsledky (ověřené testy):

- Nový poskytovatel (0 vzorků) získá skóre **0.5** — není nespravedlivě penalizován,
  ale nemůže dominovat poskytovateli s tisíci spolehlivých pozorování.
- Poskytovatel se 7 náhodnými úspěchy je posunut směrem k hodnotě 0.5 (díky
  optimistické inicializaci nikdy nezíská dominantní postavení).
- Poskytovatel s 50 a více vzorky konverguje ke svému skutečnému provoznímu skóre.
- Zhoršování i zotavování jsou postupné (EWMA) a jedno izolované selhání zdravého
  poskytovatele nezničí.

`ProviderQuality` zpřístupňuje `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Tento údaj vstupuje do skórovacího mechanismu automatické kombinace jako faktor
skórování `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` v
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Součet zůstává 1.0.
- `buildAutoCandidates` nastavuje `candidate.quality` podle trackeru; kandidáti
  bez dat mají výchozí neutrální hodnotu **0.5** (nový kandidát není zvýhodněn
  ani penalizován).

Uzavřená smyčka:

```
RoutingEvent → QualityTracker → getQualityScore → faktor kvality automatické kombinace
      ↑                                                    │
      └────── výsledek požadavku (handleChatCore) ←────────┘
```

### Tvrdé vyloučení oproti měkké penalizaci

Signál kvality představuje pouze **měkkou adaptivní preferenci**. Tvrdé vyloučení
zůstává součástí stávající vrstvy odolnosti: stav OPEN jističe, vyčerpaná kvóta,
selhání autentizace, zablokování modelu — skóre kvality nemá na žádný z těchto
stavů vliv. Poskytovatel, jehož skóre kvality dočasně klesne, dostane nižší
prioritu, ale nikdy není zcela zakázán.

## 3b. Kanonické časování streamu (TTFT / ITL)

Soubory: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` je jediným místem instrumentace streamovací cesty,
zapojeným do `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — přijetí prvního upstreamového bloku dat.
- `markForward()` — první blok dat předaný klientovi (používá se pro TTFT).
- `markInterrupted()` — časový limit/přerušení/chyba streamu před korektním dokončením.
- `ttft()` = latence prvního předaného bloku SSE. **Nejedná se o TTFT na úrovni tokenů** —
  jeden blok SSE může přenášet nula/jeden/více tokenů. Přesně zdokumentováno.
- `avgItlMs()` = průměrná prodleva mezi bloky (zástupná metrika latence bloků pro ITL).

TTFT/ITL/stav přerušení se předávají do `RoutingEvent` (`ttftMs`, `itlMs`) a jsou
exportovány jako atributy spanů GenAI/OmniRoute prostřednictvím OTel sinku.

## 4. Pozorovatelnost OpenTelemetry / GenAI

Soubory: `open-sse/services/routing/otel.ts`

- Exportér OTLP/HTTP JSON bez závislostí (používá globální `fetch`, nikoli
  SDK `@opentelemetry/*`).
- Spany se řídí sémantickými konvencemi GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) spolu se směrovacími
  atributy OmniRoute (výsledek, stav, ttft, opakované pokusy, záložní cesta).
- `record()` pouze zařazuje data do omezeného bufferu (O(1)); časovač na pozadí
  je asynchronně odesílá pomocí `POST {endpoint}/v1/traces`. Při přetížení se
  zahazují nejstarší události (počítadlo `dropped`) — datová rovina není nikdy
  vystavena zpětnému tlaku.
- **Bez konfigurace je vypnuto.** Musí být nastavena proměnná
  `OMNIROUTE_OTEL_ENDPOINT` (nebo `OTEL_EXPORTER_OTLP_ENDPOINT`); jinak se sink
  nezaregistruje a nespustí se žádný kód OTel.

## 5. Vysvětlitelnost

- `GET /v1/explain/routing` vrací nedávné události `RoutingEvent` (skutečná
  rozhodnutí, od nejnovějších) a přehled kvality jednotlivých poskytovatelů/modelů.
- Ověřování kopíruje `/v1/combos` (Bearer API klíč nebo relace řídicího panelu;
  anonymní přístup u lokálních nasazení pro jednoho uživatele s
  `REQUIRE_API_KEY=false`).
- Trasování jednotlivých volání na úrovni kombinace zůstává dostupné
  prostřednictvím stávajícího `decisionTrace.ts` (hlavička
  `X-OmniRoute-Combo-Trace`).
- Bezpečnost: události obsahují pouze metadata směrování, nikdy prompty, těla
  požadavků ani přihlašovací údaje.

## 6. Integrace evaluační roviny (připravenost na Future AGI)

OmniRoute považuje Future AGI (nebo jakýkoli hodnoticí systém) za **potenciální
backend inteligence/vyhodnocování, nikoli za závislost**. Integrační body:

- `RoutingEventSink` může asynchronně předávat události hodnoticímu systému.
- `MemoryRoutingEventStore` spolu s přehledem kvality poskytují hodnoticímu systému
  nezpracovaný proud rozhodnutí.
- Budoucí `Evaluator` (deterministický, lokální posuzovatel, HTTP, WASM) by
  zpracovával události/trasy a vracel `QualityScore`, který by vstupoval do
  stejné cesty `getQualityScore`/faktoru kvality.
- Stávající směrování řízené evaluacemi (`open-sse/services/evalRouting.ts`) již
  při aktivaci mění pořadí cílů kombinace podle míry úspěšnosti `eval_runs`.

Žádná evaluace se na cestě požadavku nespouští synchronně a brána funguje plně
i bez hodnoticího systému.

## 7. Závěrečná kontrola architektury

1. **Co zůstává na synchronní kritické cestě?** Směrování/bodování, předběžné
   kontroly ochranných mechanismů, vyhledání v cache a jedno větvení
   `emitRoutingEvent` (~0,12 µs oproti základnímu bodování) do sinků v paměti.
2. **Co bylo přesunuto do asynchronního zpracování?** Export OTel (časovač +
   fetch), ukládání `call_logs`/využití a zápisy do sémantické cache; kvalita
   je udržována v paměti a má složitost O(1) (asynchronní zpracování není potřeba).
3. **Jak se výsledek směrování promění ve zpětnou vazbu?** `handleChatCore`
   vyšle `RoutingEvent` → `QualityTracker` aktualizuje stav EWMA →
   `getQualityScore` poskytne faktor `quality` automatické kombinaci.
4. **Jak kvalita ovlivňuje budoucí směrování?** Nízké skóre kvality snižuje
   vážené skóre daného poskytovatele/modelu v `scoreAutoTargets`, takže
   zhoršené modely jsou postupně upozaďovány a znovu získávají prioritu,
   jakmile se jejich EWMA zlepší.
5. **Jak se může Future AGI integrovat, aniž by se stalo závislostí?**
   Prostřednictvím rozhraní `RoutingEventSink` / budoucího adaptéru `Evaluator` —
   bez pevně zakódované závislosti.
6. **Co se stane, když hodnoticí systém není dostupný?** Směrování tím není
   ovlivněno; kvalita se u modelů bez pozorovaného signálu vrátí k neutrální
   hodnotě (1.0).
7. **Co se stane, když telemetrie není dostupná?** OTel sink se jednoduše
   nezaregistruje; zbytek směrovací vrstvy funguje beze změny.
8. **Co se stane při přetížení?** Buffer OTel zahazuje nejstarší události;
   kvalita i kruhový buffer mají z principu omezenou velikost; nevzniká žádný
   zpětný tlak.
9. **Jak se stav poskytovatele obnoví po zhoršení?** EWMA se znovu přibližuje
   cílové hodnotě s přibývajícími úspěchy; zahřívání udržuje nové modely
   neutrální; jistič se nezávisle zotavuje pomocí sond ve stavu HALF_OPEN.
10. **Které navrhované funkce záměrně NEBYLY implementovány a proč?**
    - Stínový provoz / experimenty — již implementováno
      (`combo/shadowRouting.ts`); nebylo implementováno znovu.
    - Ochranné mechanismy — již implementováno (`src/lib/guardrails/`); nebyly
      duplikovány.
    - Sémantická cache — již implementováno (`src/lib/semanticCache.ts`); nebyla
      duplikována.
    - Plnohodnotná platforma pro správu experimentů, nástroje pro datové sady,
      platforma pro optimalizaci promptů, vektorová DB nebo povinná externí
      infrastruktura OTel — mimo rozsah úsporné datové roviny.
    - Struktura `RoutingEvent` v Rustu — datová rovina je v TypeScriptu; typ TS
      je přizpůsobeným ekvivalentem.

## 8. Přehled konfigurace

| Proměnná                      | Výchozí hodnota | Účinek                                                                                |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nenastaveno     | Je-li nastavena, povolí exportér trasování OTLP/HTTP (např. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nenastaveno     | Záložní alias pro koncový bod OTLP.                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute`     | Atribut prostředku `service.name`.                                                    |

## 9. Testy

- `tests/unit/routing-events.test.ts` — normalizace událostí, klasifikace
  stavů, omezený kruhový buffer, distribuce do výstupů + izolace.
- `tests/unit/routing-quality.test.ts` — počáteční fáze EWMA, zotavení po selhání/úspěchu,
  penalizace anomálií, zpracování přechodného stavu 429, snímek, resetování.
- `tests/unit/routing-scoring-quality.test.ts` — integrita vah, neutrální
  výchozí hodnota, pořadí podle faktoru kvality.
- `tests/unit/routing-otel.test.ts` — podmíněné povolení, obsah spanu GenAI, asynchronní
  vyprázdnění, zahazování při přetížení.
- `tests/unit/routing-events-concurrency.test.ts` — tisíce událostí, omezená
  velikost kruhového bufferu, izolace výstupu vyvolávajícího výjimky, prokládané asynchronní dávky,
  resetování během vkládání.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministická smyčka od začátku do konce prostřednictvím
  skutečného vyhodnocovače `scoreAutoTargets`: zdravý stav → zhoršení → zotavení → krátký výpadek, včetně
  scénářů studeného startu a šťastné volby poskytovatele ve studeném stavu.
- `tests/unit/stream-timing.test.ts` — TTFT (první přeposlaný blok), ITL,
  první bajt oproti prvnímu přeposlání, přerušení, bezpečné zpracování poškozených/prázdných bloků.

## 10. Stav již existujících problémů (fáze 18)

| Problém                                               | Stav                     | Poznámky                                                                                                                                                                                                                                                         |
| ----------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Neshoda exportu `omniglyph`                           | **OPRAVENO (prostředí)** | `node_modules` nebyl synchronizován s `package-lock.json` (nainstalována verze 1.3.1 oproti uzamčené verzi 1.4.0). Spuštění `npm install omniglyph@1.4.0` obnovilo uzamčenou verzi; počet typových chyb klesl na 0. Manifesty zůstaly beze změny.                |
| Zastaralé testy `getKnownContextOverflow`             | **ZNÁMÉ — neopraveno**   | `combo-context-overflow-compression-probe.test.ts` importuje funkci, která již v `open-sse/services/combo.ts` neexistuje (odkazují na ni pouze komentáře). Oprava vyžaduje opětovnou implementaci nebo přepsání těchto testů — nesouvisející změnu architektury. |
| Izolace DB v `combo-runtime-unit-concurrency.test.ts` | **ZNÁMÉ — neopraveno**   | Kontrola izolace SQLite v testovacím prostředí při přímém spuštění selže; stejným způsobem selhává i v základní větvi.                                                                                                                                           |
| Odchylka i18n `llm.txt`                               | **ZNÁMÉ — neopraveno**   | `docs/i18n/*/llm.txt` se liší od kořenového souboru; problém existoval již dříve a blokuje kontrolu synchronizace dokumentace před commitem.                                                                                                                     |

Problémy prostředí a problémy v kódu jsou vedeny odděleně; žádná nesouvisející selhání nejsou skryta
za změněnými filtry testů.
