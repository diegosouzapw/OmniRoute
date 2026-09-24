# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Tento dokument opisuje základ adaptívneho smerovania riadeného spätnou väzbou, ktorý bol pridaný do
OmniRoute. Zámerne má malý rozsah: zavádza typovaný kanál výsledkov smerovania,
online signál kvality, ktorý vstupuje do existujúceho vyhodnocovania auto-combo,
voliteľný exportér OpenTelemetry a koncový bod na vysvetliteľnosť. **Nenahrádza**
existujúcu vrstvu odolnosti (istič, časový odstup pripojenia,
uzamknutie modelu, matica stavu, autopilot) — dopĺňa ju.

## 1. Architektonický kontext

OmniRoute je dátová rovina s **kritickou cestou požiadavky** a **riadiacou/inteligenčnou
rovinou**. Kritická cesta musí zostať rýchla, pamäťovo efektívna, asynchrónna, odolná a
predvídateľná. Vyhodnocovanie, bodovanie kvality, experimenty a historická analýza patria
do riadiacej roviny.

```
AI agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   dátová rovina (rýchla, synchrónna, v pamäti)
│ smerovanie/záloha   │
│ stav / ochrany      │
│ cache / streamovanie│
└──────────┬──────────┘
           │ RoutingEvent (spustiť a nečakať, ~0.2µs)
           ▼
┌─────────────────────┐
│ Ciele spätnej väzby │   riadiaca rovina (asynchrónna, s maximálnym úsilím)
│ sledovanie kvality  │
│ exportér OTel       │
│ úložisko vysvetlení │
└──────────┬──────────┘
           ▼  skóre kvality
      vyhodnocovanie auto-combo
```

### Čo už existovalo (auditované, neduplikované)

| Koncept                                    | Existujúca implementácia                                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Dostupnosť (môžeme odosielať prevádzku?)   | Istič (CLOSED/DEGRADED/OPEN/HALF_OPEN, uložený v DB), časový odstup pripojenia, uzamknutie modelu    |
| Hlásenie stavu                             | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                              |
| Tieňová prevádzka                          | `open-sse/services/combo/shadowRouting.ts`                                                           |
| Ochranné mechanizmy                        | `src/lib/guardrails/` (hooky pred/po spracovaní)                                                     |
| Presná cache                               | `src/lib/semanticCache.ts` (založená na signatúrach)                                                 |
| Vyhodnocovače / smerovanie riadené evalmi  | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                 |
| Vysvetliteľnosť rozhodnutí combo           | `open-sse/services/combo/decisionTrace.ts`                                                           |
| Udalosti ovládacieho panela v reálnom čase | `src/lib/events/eventBus.ts` (kanál oznámení UI, dátové obsahy `unknown`, história so 100 položkami) |

Vrstva udalostí smerovania **nie je** opätovnou implementáciou `eventBus`: táto zbernica je
kanálom oznámení ovládacieho panela v reálnom čase (typované _názvy udalostí_, nepriehľadné
dátové obsahy, konzumenti UI). `RoutingEvent` je typovaná _štruktúra výsledku_
(latencia/tokeny/náklady/výsledok/dôvod ukončenia), ktorú používajú
ciele spätnej väzby riadiacej roviny (sledovanie kvality, exportér OTel, úložisko vysvetlení).

### Čo chýbalo (pridané tu)

1. **Typovaná udalosť výsledku smerovania + abstrakcia cieľa** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` je obmedzený na combo a iba v pamäti;
   `comboMetrics` sú kumulatívne počítadlá; `call_logs` je nespracované asynchrónne perzistentné úložisko.
   Žiadna z týchto možností nie je typovaným kanálom výsledkov založeným na cieľoch, ku ktorému sa môže prihlásiť
   sledovanie kvality, exportér OTel alebo vyhodnocovač v štýle Future-AGI.
2. **Online signál kvality** (EWMA) pre kvalitu výstupu — vyhodnocovanie predtým
   zastupovalo „kvalitu“ iba prostredníctvom statickej vhodnosti pre úlohu a voliteľných mier úspešnosti evalov.
3. **Voliteľný exportér OTel bez závislostí**, ktorý používa sémantické konvencie GenAI.
4. **Koncový bod vysvetliteľnosti**, ktorý vracia skutočné rozhodnutia smerovania + stav kvality.

## 2. Udalosti smerovania (základ spätnej väzby)

Súbory: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` prenáša iba metadáta smerovania:

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
  outcome: RoutingOutcome; // zjednotenie povolených hodnôt
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` je v TypeScripte rozhranie v štýle `Send+Sync`:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // musí byť O(1), bez synchrónneho I/O
}
```

Kritická cesta volá `emitRoutingEvent(event)` raz pre každú dokončenú požiadavku
(spätné volanie po dokončení streamovania, cesta úspechu bez streamovania a
cesta zlyhania pri chybnej odpovedi 200 v `handleChatCore`). Distribúcia je
synchrónne rozosielaná všetkým registrovaným prijímačom, ale každý prijímač iba
zaraďuje údaje do frontu alebo aktualizuje stav v pamäti. **Žiadne synchrónne
zápisy do databázy ani sieťové I/O na kritickej ceste.**

Predvolené prijímače:

- `MemoryRoutingEventStore` — ohraničený (500) kruhový buffer, od najnovších
  záznamov, pre koncový bod vysvetlenia.
- Spotrebiteľ `QualityTracker` — aktualizuje EWMA odhad kvality.
- `OtlpHttpsEventSink` — voliteľný, povolený iba vtedy, keď je nastavená premenná
  `OMNIROUTE_OTEL_ENDPOINT` (alebo `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Nameraná réžia (objektívne porovnanie)

`npm run bench:routing-events` na tejto pracovnej stanici (100-tisíc iterácií;
operácie kratšie než µs merané ako agregované µs/op, pretože percentily
jednotlivých operácií sú pod rozlíšením časovača `performance.now()`):

| Scenár                              | µs/op  | op./s  |
| ----------------------------------- | ------ | ------ |
| základ (iba bodovanie)              | ~0.045 | ~22 M  |
| základ + RoutingEvent (2 prijímače) | ~0.168 | ~5.9 M |
| základ + udalosť + zaradenie OTel   | ~0.163 | ~6.1 M |
| súbežne (8 prekladaných dávok)      | ~0.18  | —      |

Rozdiel distribúcie udalosti oproti základnému bodovaniu je ~0.12
µs/požiadavku; prijímač OTel iba zaraďuje do frontu (vloženie do buffera v O(1)),
takže nepridáva nič merateľné. Tieto čísla sú špecifické pre daný počítač a
relatívne — nie sú zárukou pre produkčné prostredie. Údaj „~0.2 µs“ z v1 bol
agregovaným odhadom; táto metodika oddeľuje základné bodovanie od nákladov na
distribúciu udalosti.

## 3. Signál kvality (stav poskytovateľa riadený spätnou väzbou)

Súbory: `open-sse/services/routing/quality.ts`

v2 oddeľuje **prevádzkovú** kvalitu od **sémantickej**:

- **Prevádzková** — odvodená z kritickej cesty smerovania (HTTP 4xx/5xx, zlyhania
  pripojenia, odpovede 429, chybné odpovede, prerušenia streamu,
  `finish_reason=length`, úspešné odpovede s nulovým výstupom, EWMA latencie/TTFT).
  Odpoveď 200 sa NEPOVAŽUJE za sémantickú kvalitu.
- **Sémantická** — skutočná hodnota vygenerovaného výstupu. Vytvára ju VÝHRADNE
  hodnotiteľ prostredníctvom `setSemanticQuality()`. Zostáva `null`, kým ju
  hodnotiteľ neposkytne, a nikdy sa nepremietne do prevádzkového skóre.

Stav pre každú dvojicu (poskytovateľ, model) (EWMA + ohraničené počítadlá):

- `successEwma` — EWMA (α=0.2) úspešnosti výsledkov.
- `latencyEwma` / `ttftEwma` — EWMA latencie (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — ako nedávno bol model naposledy zaznamenaný.

### Zohľadnenie spoľahlivosti / počtu vzoriek

`confidence = clamp01(samples / 50)` a skóre vrátené bodovaciemu mechanizmu sa
približuje k neutrálnemu stredu:

```
score = 0.5 + confidence * (operational - 0.5)
```

Dôsledky (overené testami):

- Nový poskytovateľ (0 vzoriek) má skóre **0.5** — nie je nespravodlivo
  penalizovaný, ale nemôže dominovať nad poskytovateľom s tisíckami spoľahlivých
  pozorovaní.
- Poskytovateľ so 7 šťastnými úspechmi je pritiahnutý smerom k 0.5 (vďaka
  optimistickej inicializácii nikdy nedominuje).
- Poskytovateľ s 50+ vzorkami konverguje k svojmu skutočnému prevádzkovému skóre.
- Degradácia a zotavenie sú postupné (EWMA) a jedno izolované zlyhanie nezničí
  zdravého poskytovateľa.

`ProviderQuality` sprístupňuje `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Tieto údaje vstupujú do mechanizmu bodovania automatickej kombinácie ako faktor
bodovania `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` v
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Súčet zostáva 1.0.
- `buildAutoCandidates` nastaví `candidate.quality` podľa sledovacieho mechanizmu;
  kandidáti bez údajov majú predvolenú neutrálnu hodnotu **0.5** (nový kandidát
  nie je zvýhodnený ani penalizovaný).

Uzavretá slučka:

```
RoutingEvent → QualityTracker → getQualityScore → faktor kvality automatickej kombinácie
      ↑                                                    │
      └────── výsledok požiadavky (handleChatCore) ←────────┘
```

### Tvrdé vylúčenie verzus mierna penalizácia

Signál kvality predstavuje iba **miernu adaptívnu preferenciu**. Tvrdé vylúčenie
zostáva súčasťou existujúcej vrstvy odolnosti: stav OPEN ističa, vyčerpaná kvóta,
zlyhanie overenia, zablokovanie modelu — skóre kvality neovplyvňuje žiadnu z
týchto podmienok. Poskytovateľ, ktorého skóre kvality dočasne klesne, dostane
nižšiu prioritu, ale nikdy nebude natvrdo zakázaný.

## 3b. Kanonické časovanie streamu (TTFT / ITL)

Súbory: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` je jediným bodom inštrumentácie pre streamovaciu cestu,
prepojeným s `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — prijatý prvý chunk z upstreamu.
- `markForward()` — prvý chunk odoslaný klientovi (používa sa pre TTFT).
- `markInterrupted()` — časový limit/prerušenie/chyba streamu pred riadnym dokončením.
- `ttft()` = latencia prvého odoslaného SSE chunku. **Toto NIE JE TTFT na úrovni tokenov** —
  jeden SSE chunk môže obsahovať nula/jeden/viacero tokenov. Je to presne zdokumentované.
- `avgItlMs()` = priemerný interval medzi chunkmi (zástupná metrika latencie chunkov pre ITL).

TTFT/ITL/informácia o prerušení sa prenášajú do `RoutingEvent` (`ttftMs`, `itlMs`) a
OTel sink ich exportuje ako atribúty spanov GenAI/OmniRoute.

## 4. Pozorovateľnosť OpenTelemetry / GenAI

Súbory: `open-sse/services/routing/otel.ts`

- Exportér OTLP/HTTP JSON bez závislostí (používa globálny `fetch`, nie
  SDK `@opentelemetry/*`).
- Spany dodržiavajú sémantické konvencie GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) spolu so smerovacími
  atribútmi OmniRoute (výsledok, stav, ttft, opakované pokusy, fallback).
- `record()` iba pridáva položky do ohraničeného buffera (O(1)); časovač na pozadí
  ich asynchrónne odosiela prostredníctvom `POST {endpoint}/v1/traces`. Pri preťažení sa
  najstaršie udalosti zahadzujú (počítadlo `dropped`) — dátová rovina nikdy nie je
  vystavená spätnému tlaku.
- **Bez konfigurácie je deaktivovaný.** Musí byť nastavená premenná
  `OMNIROUTE_OTEL_ENDPOINT` (alebo `OTEL_EXPORTER_OTLP_ENDPOINT`); inak sa sink
  nezaregistruje a nespustí sa žiadny kód OTel.

## 5. Vysvetliteľnosť

- `GET /v1/explain/routing` vracia nedávne udalosti `RoutingEvent` (skutočné
  rozhodnutia, od najnovších) a snímku kvality pre jednotlivých poskytovateľov/modely.
- Autentifikácia zodpovedá `/v1/combos` (Bearer API kľúč alebo relácia dashboardu;
  anonymný prístup v lokálnych nasadeniach pre jedného používateľa s
  `REQUIRE_API_KEY=false`).
- Trasovania jednotlivých volaní na úrovni komba zostávajú dostupné prostredníctvom
  existujúceho `decisionTrace.ts` (hlavička `X-OmniRoute-Combo-Trace`).
- Bezpečnosť: udalosti obsahujú iba smerovacie metadáta, nikdy nie prompty/telá požiadaviek/prihlasovacie údaje.

## 6. Integrácia evaluačnej roviny (pripravenosť na Future AGI)

OmniRoute považuje Future AGI (alebo ľubovoľný evaluátor) za **potenciálny
backend pre inteligenciu/evaluáciu, nie za závislosť**. Integračné body:

- `RoutingEventSink` môže asynchrónne odosielať udalosti evaluátoru.
- `MemoryRoutingEventStore` spolu so snímkou kvality poskytujú evaluátoru nespracovaný
  prúd rozhodnutí.
- Budúci `Evaluator` (deterministický, lokálny posudzovateľ, HTTP, WASM) by spracúval
  udalosti/trasovania a vracal `QualityScore`, ktoré vstupuje do rovnakej
  cesty `getQualityScore`/faktora kvality.
- Existujúce smerovanie riadené evaluáciami (`open-sse/services/evalRouting.ts`) už
  pri povolení mení poradie cieľov komba podľa mier úspešnosti `eval_runs`.

Na ceste požiadavky sa synchrónne nespúšťa žiadna evaluácia a brána funguje
plnohodnotne aj bez evaluátora.

## 7. Záverečné preskúmanie architektúry

1. **Čo zostáva na synchrónnej kritickej ceste?** Smerovanie/skórovanie, predbežné
   kontroly ochranných mechanizmov, vyhľadanie v cache a jeden fan-out
   `emitRoutingEvent` (~0,12 µs nad rámec základného skórovania) do sinkov v pamäti.
2. **Čo sa presunulo do asynchrónneho spracovania?** Export OTel (časovač + fetch),
   ukladanie `call_logs`/využitia, zápisy do sémantickej cache; kvalita sa udržiava
   v pamäti a v O(1) (asynchrónne spracovanie nie je potrebné).
3. **Ako sa výsledok smerovania zmení na spätnú väzbu?** `handleChatCore` vyšle
   `RoutingEvent` → `QualityTracker` aktualizuje stav EWMA → `getQualityScore`
   poskytne vstup faktoru `quality` automatického komba.
4. **Ako kvalita ovplyvňuje budúce smerovanie?** Nízke skóre kvality znižuje
   vážené skóre daného poskytovateľa/modelu v `scoreAutoTargets`, takže degradované
   modely sú postupne menej uprednostňované a ich preferencia sa obnovuje so
   zlepšovaním ich EWMA.
5. **Ako sa môže Future AGI integrovať bez toho, aby sa stal závislosťou?** Cez
   rozhranie `RoutingEventSink` / budúci adaptér `Evaluator` — bez pevne zakódovanej
   závislosti.
6. **Čo sa stane, keď je evaluátor nedostupný?** Smerovanie tým nie je ovplyvnené;
   pre modely bez pozorovaného signálu sa kvalita nastaví na neutrálnu hodnotu (1.0).
7. **Čo sa stane, keď je telemetria nedostupná?** OTel sink sa jednoducho
   nezaregistruje; zvyšok smerovacej vrstvy funguje bez zmeny.
8. **Čo sa stane pri preťažení?** Buffer OTel zahodí najstaršie udalosti; kvalita
   a kruhový buffer sú z princípu ohraničené; nevzniká žiadny spätný tlak.
9. **Ako sa stav poskytovateľa obnoví po degradácii?** EWMA opätovne konverguje
   s pribúdajúcimi úspešnými výsledkami; zahrievacia fáza udržiava nové modely
   neutrálne; istič sa nezávisle obnovuje pomocou sond v stave HALF_OPEN.
10. **Ktoré navrhované funkcie zámerne NEBOLI implementované a prečo?**
    - Tieňová prevádzka / experimenty — už implementované
      (`combo/shadowRouting.ts`); neboli vytvorené znova.
    - Ochranné mechanizmy — už implementované (`src/lib/guardrails/`); neboli duplikované.
    - Sémantická cache — už implementovaná (`src/lib/semanticCache.ts`); nebola
      duplikovaná.
    - Kompletná platforma na správu experimentov, nástroje pre dátové množiny, platforma
      na optimalizáciu promptov, vektorová databáza alebo povinná externá infraštruktúra
      OTel — sú mimo rozsahu štíhlej dátovej roviny.
    - Rustová štruktúra `RoutingEvent` — dátová rovina je v TypeScripte; typ TS
      je prispôsobeným ekvivalentom.

## 8. Referenčné informácie ku konfigurácii

| Premenná                      | Predvolená hodnota | Účinok                                                                                |
| ----------------------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | nenastavená        | Ak je nastavená, povolí exportér trasovaní OTLP/HTTP (napr. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nenastavená        | Záložný alias pre koncový bod OTLP.                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute`        | Atribút zdroja `service.name`.                                                        |

## 9. Testy

- `tests/unit/routing-events.test.ts` — normalizácia udalostí, klasifikácia
  stavov, ohraničená kruhová vyrovnávacia pamäť, distribúcia do výstupov + izolácia.
- `tests/unit/routing-quality.test.ts` — počiatočné ustálenie EWMA, zotavenie po zlyhaní/úspechu,
  penalizácie anomálií, spracovanie prechodného stavu 429, snímka, resetovanie.
- `tests/unit/routing-scoring-quality.test.ts` — integrita váh, neutrálna
  predvolená hodnota, poradie podľa faktora kvality.
- `tests/unit/routing-otel.test.ts` — podmienené povolenie, obsah rozsahu GenAI, asynchrónne
  vyprázdnenie, zahadzovanie pri preťažení.
- `tests/unit/routing-events-concurrency.test.ts` — tisíce udalostí, ohraničenosť kruhovej
  vyrovnávacej pamäte, izolácia výstupov vyvolávajúcich výnimky, prekladané asynchrónne dávky,
  resetovanie počas vkladania.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministická slučka od začiatku do konca
  prostredníctvom skutočného hodnotiaceho mechanizmu `scoreAutoTargets`: zdravý → zhoršenie → zotavenie → výkyv, plus
  scenáre studeného štartu a šťastnej náhody pri studenom poskytovateľovi.
- `tests/unit/stream-timing.test.ts` — TTFT (prvý preposlaný blok), ITL,
  prvý bajt oproti prvému preposlaniu, prerušenie, bezpečnosť pri poškodenom/prázdnom bloku.

## 10. Stav už existujúcich problémov (fáza 18)

| Problém                                                | Stav                      | Poznámky                                                                                                                                                                                                                                                         |
| ------------------------------------------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nesúlad exportu `omniglyph`                            | **OPRAVENÉ (prostredie)** | `node_modules` nebolo synchronizované s `package-lock.json` (nainštalovaná verzia 1.3.1 oproti uzamknutej verzii 1.4.0). Spustenie `npm install omniglyph@1.4.0` obnovilo uzamknutú verziu; počet typových chýb klesol na 0. Manifesty zostali nezmenené.        |
| Zastarané testy `getKnownContextOverflow`              | **ZNÁME — neopravené**    | `combo-context-overflow-compression-probe.test.ts` importuje funkciu, ktorá už v `open-sse/services/combo.ts` neexistuje (odkazujú na ňu iba komentáre). Oprava vyžaduje opätovnú implementáciu alebo prepísanie týchto testov — nesúvisiacu zmenu architektúry. |
| Izolácia DB v `combo-runtime-unit-concurrency.test.ts` | **ZNÁME — neopravené**    | Kontrola izolácie SQLite v testovacom prostredí pri priamom spustení zlyhá; rovnakým spôsobom zlyháva aj v základnej vetve.                                                                                                                                      |
| Odchýlka i18n `llm.txt`                                | **ZNÁME — neopravené**    | `docs/i18n/*/llm.txt` sa líšia od koreňového súboru; ide o už existujúci stav, ktorý blokuje kontrolu synchronizácie dokumentácie pred commitom.                                                                                                                 |

Problémy prostredia a problémy kódu sa vedú oddelene; žiadne nesúvisiace zlyhania nie sú skryté
za zmenenými filtrami testov.
