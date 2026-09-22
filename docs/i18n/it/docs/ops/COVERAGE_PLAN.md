# Test Coverage Plan (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇪🇹 [am](../../../am/docs/ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇬🇷 [el](../../../el/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ha](../../../ha/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇦🇲 [hy](../../../hy/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [ig](../../../ig/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇬🇪 [ka](../../../ka/docs/ops/COVERAGE_PLAN.md) · 🇰🇭 [km](../../../km/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [kn](../../../kn/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ml](../../../ml/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇲🇲 [my](../../../my/docs/ops/COVERAGE_PLAN.md) · 🇳🇵 [ne](../../../ne/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [or](../../../or/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [pa](../../../pa/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇱🇰 [si](../../../si/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇺🇿 [uz](../../../uz/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇳🇬 [yo](../../../yo/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

Ultimo aggiornamento: 2026-06-28

> Stato misurato il 2026-05-13: righe 82,58%, istruzioni 82,58%, funzioni 84,23%, rami 75,22%. Le fasi 1-5 sono complete. L'attenzione attuale è rivolta alla Fase 6 (>=85%) e alla Fase 7 (>=90%).

## Valori di riferimento

Esistono diversi valori di copertura a seconda di come viene calcolato il report. Ai fini della pianificazione, solo uno di essi è utile.

| Metrica                           | Ambito                                              | Istruzioni / Righe |   Rami | Funzioni | Note                                                          |
| --------------------------------- | --------------------------------------------------- | -----------------: | -----: | -------: | ------------------------------------------------------------- |
| Precedente                        | Vecchio `npm run test:coverage`                     |             79,42% | 75,15% |   67,94% | Sovrastimata: conteggia i file di test ed esclude `open-sse`  |
| Diagnostica                       | Solo sorgente, esclusi i test ed escluso `open-sse` |             68,16% | 63,55% |   64,06% | Utile solo per isolare `src/**`                               |
| Valore di riferimento consigliato | Solo sorgente, esclusi i test e incluso `open-sse`  |             82,58% | 75,22% |   84,23% | È il valore di riferimento dell'intero progetto da migliorare |

Il valore di riferimento consigliato è quello rispetto al quale eseguire l'ottimizzazione.

## Regole

- Gli obiettivi di copertura si applicano ai file sorgente, non a `tests/**`.
- `open-sse/**` fa parte del prodotto e deve rimanere incluso nell'ambito.
- Il nuovo codice non deve ridurre la copertura nelle aree modificate.
- È preferibile verificare il comportamento e i risultati dei rami anziché i dettagli implementativi.
- Per `src/lib/db/**`, è preferibile utilizzare database SQLite temporanei e fixture di piccole dimensioni anziché mock estesi.

## Set di comandi attuale

- `npm run test:coverage`
  - Soglia principale di copertura del codice sorgente per la suite di unit test
  - Genera `text-summary`, `html`, `json-summary` e `lcov`
- `npm run coverage:report`
  - Report dettagliato file per file relativo all'ultima esecuzione
- `npm run test:coverage:legacy`
  - Solo per confronti storici

## Traguardi

| Fase   |              Obiettivo | Priorità                                                         | Stato         |
| ------ | ---------------------: | ---------------------------------------------------------------- | ------------- |
| Fase 1 | 60% istruzioni / righe | Miglioramenti rapidi e copertura delle utility a basso rischio   | ✅ Completata |
| Fase 2 | 65% istruzioni / righe | Fondamenta del database e delle route                            | ✅ Completata |
| Fase 3 | 70% istruzioni / righe | Convalida dei provider e analisi dell'utilizzo                   | ✅ Completata |
| Fase 4 | 75% istruzioni / righe | Traduttori e helper di `open-sse`                                | ✅ Completata |
| Fase 5 | 80% istruzioni / righe | Handler di `open-sse` e rami dell'executor                       | ✅ Completata |
| Fase 6 | 85% istruzioni / righe | Casi limite più complessi, debito sui rami, suite di regressione | In corso      |
| Fase 7 | 90% istruzioni / righe | Revisione finale, eliminazione delle lacune, incremento rigoroso | In attesa     |

La copertura di rami e funzioni dovrebbe aumentare progressivamente a ogni fase, ma l'obiettivo primario e vincolante riguarda le istruzioni / righe.

## Aree critiche prioritarie

Questi file presentano attualmente la copertura delle righe più bassa (< 60%) e offrono il miglior ritorno per le Fasi 6-7. Dati generati da `coverage/coverage-summary.json` il 2026-05-13:

| #   | File                                                         | Righe % |
| --- | ------------------------------------------------------------ | ------: |
| 1   | `open-sse/services/compression/validation.ts`                |   7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |   9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |   9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |  10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |  10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |  10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |  11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |  12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |  12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |  12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |  13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |  13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |  13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |  13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |  14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |  14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |  15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |  15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |  16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |  16.66% |

Temi per le Fasi 6-7:

- `open-sse/services/compression/**` è il gruppo più denso di file con copertura bassa e rappresenta la parte predominante del divario rimanente.
- Le route API per batch e rerank (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) richiedono test a livello di handler.
- Gli adattatori degli agenti cloud (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) e `tierResolver.ts` richiedono test di scenario.
- I componenti dell'interfaccia della documentazione e `src/mitm/systemCommands.ts` hanno priorità inferiore, ma consentono di ottenere facilmente una maggiore copertura dei rami.

## Checklist di esecuzione

### Fase 1: 56.95% -> 60%

- [x] Correggere la metrica di copertura affinché rifletta il codice sorgente anziché i file di test
- [x] Mantenere uno script di copertura precedente per il confronto
- [x] Registrare nel repository la baseline e le aree critiche
- [ ] Aggiungere test mirati per le utility a basso rischio:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Aggiungere test delle route per:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Fase 2: 60% -> 65%

- [ ] Aggiungere test supportati dal database per:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Coprire il comportamento dei rami in:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Fase 3: 65% -> 70%

- [ ] Aggiungere test per l'analisi dell'utilizzo per:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Ampliare la copertura delle route per la gestione dei proxy e dei rami delle impostazioni

### Fase 4: 70% -> 75%

- [ ] Coprire le funzioni di supporto del traduttore e i percorsi centrali di traduzione:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Fase 5: 75% -> 80%

- [ ] Aggiungere test a livello di handler per:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Aggiungere la copertura dei rami dell'executor per l'autenticazione specifica dei provider, i nuovi tentativi e le sostituzioni degli endpoint

### Fase 6: 80% -> 85%

- [ ] Integrare più suite di casi limite nel percorso di copertura principale
- [ ] Aumentare la copertura delle funzioni per i moduli DB con una copertura insufficiente di costruttori e funzioni di supporto
- [ ] Colmare le lacune nella copertura dei rami in `settings.ts`, `registeredKeys.ts`, `validation.ts` e nelle funzioni di supporto del traduttore

### Fase 7: 85% -> 90%

- [ ] Trattare come bloccanti i file rimanenti con copertura bassa
- [ ] Aggiungere test di regressione per ogni bug del codice di produzione non coperto e corretto durante il percorso verso il 90%
- [ ] Aumentare la soglia di copertura nella CI solo dopo che la baseline locale è rimasta stabile per almeno due esecuzioni consecutive

## Politica di ratchet

Aggiornare le soglie di `npm run test:coverage` solo dopo che il progetto ha effettivamente superato il traguardo successivo con un margine adeguato.

**Soglia attuale:** `npm run test:coverage` impone **60 istruzioni / 60 righe / 60 funzioni / 60 rami** (la metrica è stata ricalibrata in Quality-Gates Fase 6A.1 — il precedente valore di riferimento dell'82,58% era sovrastimato perché conteggiava i file di test ed escludeva `open-sse`). Il comando `test:coverage:legacy` mantiene la precedente metrica 50/50/50 per consentire confronti storici.

Per controlli estemporanei delle soglie rispetto al report più recente, utilizzare:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Sequenza di ratchet consigliata (l'ordine è `istruzioni-righe / rami / funzioni`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- soglia attuale (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Il prossimo obiettivo di ratchet è `80/75/78`, una volta che la copertura dei rami si mantiene sopra il 78% per due esecuzioni consecutive.

## Lacuna nota

Il comando di copertura attuale misura la suite principale di test unitari Node e include il codice sorgente raggiunto da essa, incluso `open-sse`. Non combina ancora la copertura di Vitest in un unico report unificato. Vale la pena implementare tale integrazione in seguito, ma non è un ostacolo per iniziare il percorso dal 60% all'80%.
