# Evaluations (Evals) (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Fonte di riferimento:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute include un framework di valutazione generico che può essere utilizzato per confrontare configurazioni di routing, singoli provider/modelli o le suite "golden set" incluse.
Usalo per verificare le modifiche al routing, convalidare nuovi provider e autorizzare i rilasci prima di promuoverli al traffico di produzione.

Il framework è implementato come segue:

- Un runner puro (`src/lib/evals/evalRunner.ts`) che registra in memoria le suite integrate, valuta gli output in base ai criteri attesi e aggrega le schede di valutazione.
- Un livello di persistenza (`src/lib/db/evals.ts`) per le suite personalizzate (definite dagli utenti) e le esecuzioni storiche in SQLite.
- Un livello di orchestrazione (`src/lib/evals/runtime.ts`) che esegue ogni caso inviando chiamate reali a `POST /v1/chat/completions`, acquisisce latenza e output e rende persistente l'esecuzione.
- Endpoint REST in `/api/evals/*` (solo con autenticazione di gestione).
- Un'interfaccia della dashboard in `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Concetti

### Suite

Una suite è una raccolta denominata di casi di test, con una `description` e uno o più casi. Le suite provengono da due fonti:

| Fonte      | Dove viene definita                               | Modificabile a runtime?  |
| ---------- | ------------------------------------------------- | ------------------------ |
| `built-in` | Registrata tramite `registerSuite()` all'avvio    | No (definita nel codice) |
| `custom`   | Archiviata in SQLite `eval_suites` + `eval_cases` | Sì (tramite API/UI)      |

Le suite integrate attuali (vedere `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 casi di riferimento tra saluti/matematica/traduzione/sicurezza
- `coding-proficiency` — Python/JS/SQL/TS/rilevamento di bug
- `reasoning-logic` — sillogismi, problemi testuali, riconoscimento di schemi
- `multilingual` — traduzione e rilevamento della lingua
- `safety-guardrails` — PII, jailbreak, rifiuto, consapevolezza dei bias
- `instruction-following` — solo JSON, elenchi numerati, vincoli linguistici
- `codex-comparison` — attività di programmazione comparative destinate alla modalità di confronto

### Caso

Ogni caso include:

| Campo      | Descrizione                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `id`       | Identificatore stabile (utilizzato come chiave per output e metriche)         |
| `name`     | Etichetta leggibile                                                           |
| `model`    | Modello predefinito quando l'esecuzione usa come destinazione `suite-default` |
| `input`    | `{ messages, max_tokens? }` — inviato a `/v1/chat/completions`                |
| `expected` | `{ strategy, value }` — criterio di assegnazione del punteggio (vedere sotto) |
| `tags`     | Etichette facoltative (ad es. `safety`, `pii`, `jailbreak`)                   |

### Destinazione

La stessa suite può essere eseguita rispetto a destinazioni diverse. Lo schema della destinazione è `evalTargetSchema` in `src/shared/validation/schemas.ts`:

| Tipo di destinazione | `id`             | Comportamento                                                                    |
| -------------------- | ---------------- | -------------------------------------------------------------------------------- |
| `suite-default`      | `null`           | Ogni caso usa il proprio campo `model` integrato                                 |
| `model`              | nome del modello | Forza ogni caso attraverso un singolo modello diretto (ad es. `gpt-4o`)          |
| `combo`              | nome della combo | Esegue ogni caso attraverso una singola combo (esercitando il motore di routing) |

Per `model` e `combo`, il campo `id` è obbligatorio (imposto tramite `superRefine` di Zod). Quando viene fornito `compareTarget`, le due destinazioni devono essere diverse: il runner rende persistenti entrambe le esecuzioni con lo stesso `runGroupId` per il confronto A/B.

## Criteri di valutazione

Implementati in `evaluateCase()` (evalRunner.ts):

| Strategia  | Superato quando…                                                                    |
| ---------- | ----------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                 |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` è truthy                            |
| `custom`   | `expected.fn(actualOutput, evalCase)` restituisce un valore truthy (solo integrato) |

**Nota:** La valutazione tramite funzione personalizzata è riservata alle suite definite nel codice (integrate), perché le funzioni non possono essere serializzate tramite l'API. `evalCaseBuilderSchema` accetta solo `contains | exact | regex` per le suite create dagli utenti.

Attualmente non è disponibile alcun valutatore LLM-as-judge o basato sulla similarità degli embedding; costituirebbe un punto di estensione naturale in `evaluateCase()`.

## Schema del database

Tre tabelle (migrazioni `030_create_eval_runs.sql` e `031_create_eval_suites.sql`):

| Tabella       | Scopo                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadati delle suite personalizzate (`id`, `name`, `description`)                                                                |
| `eval_cases`  | Casi per suite — `input_json`, `expected_*`, `tags_json`                                                                         |
| `eval_runs`   | Esecuzioni storiche — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Le suite integrate **non** vengono archiviate nel DB. Risiedono in memoria e vengono registrate nuovamente ogni volta che `evalRunner.ts` viene importato.

## API REST

Tutti gli endpoint richiedono l'autenticazione di gestione (`requireManagementAuth`) e non fanno parte dell'interfaccia proxy pubblica.

| Endpoint                      | Metodo   | Descrizione                                                                 |
| ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Elenca suite + esecuzioni recenti + scheda punteggi + destinazioni + chiavi |
| `/api/evals`                  | `POST`   | Esegue una suite (singola o comparativa) — schema `evalRunSuiteSchema`      |
| `/api/evals/{suiteId}`        | `GET`    | Recupera una suite (integrata o personalizzata)                             |
| `/api/evals/suites`           | `POST`   | Crea una suite personalizzata — schema `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Recupera una suite personalizzata                                           |
| `/api/evals/suites/{suiteId}` | `PUT`    | Sostituisce una suite personalizzata (i casi vengono inseriti nuovamente)   |
| `/api/evals/suites/{suiteId}` | `DELETE` | Elimina una suite personalizzata e i relativi casi                          |

### Esecuzione di una suite

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Campi facoltativi:

- `outputs` — `Record<caseId, string>` contenente output precalcolati. Quando viene fornito, il runner **salta l'invio** e valuta esclusivamente gli output memorizzati nella cache (utile per la valutazione offline).
- `compareTarget` — seconda destinazione da eseguire in parallelo; entrambe le esecuzioni condividono un `runGroupId` generato per la visualizzazione del confronto diretto.
- `apiKeyId` — chiave API interna utilizzata per autenticare le chiamate inviate a `/v1/chat/completions`. Obbligatoria quando `REQUIRE_API_KEY` è abilitata.

### Creazione di una suite personalizzata

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Pipeline di dispatch

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Risolve la suite (integrata o personalizzata).
2. Per ogni caso, crea una `Request` verso `/v1/chat/completions` con i
   `messages` del caso, il `model` risolto, `stream: false` e `max_tokens: 512`
   (oppure il valore specificato dal caso).
3. Chiama direttamente il gestore della chat (all'interno del processo, senza un passaggio HTTP aggiuntivo).
4. Misura la latenza ed estrae il testo da `choices[0].message.content`
   oppure dal payload `output[]` della Responses API.
5. Valuta tutti gli output tramite `runSuite()`, quindi li salva tramite `saveEvalRun()`.

I casi vengono eseguiti **in sequenza**. Attualmente non esiste alcun flag per la concorrenza.

## Dashboard

L'interfaccia utente si trova in `Dashboard → Utilizzo → Valutazioni`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Da qui è
possibile:

- Esplorare le suite integrate e personalizzate con un'anteprima caso per caso.
- Creare/modificare/eliminare suite personalizzate con il generatore di casi.
- Scegliere una destinazione (valori predefiniti della suite / modello / combinazione), facoltativamente una seconda
  `compareTarget` e, sempre facoltativamente, una chiave API, quindi avviare l'esecuzione su richiesta.
- Esaminare la cronologia delle esecuzioni, l'esito positivo/negativo di ogni caso, la latenza e gli output acquisiti.
- Visualizzare il prospetto progressivo aggregato in base all'ultima esecuzione per ogni ambito
  `(suite, target)`.

## Relazione con la RFC Auto-Assessment

Un sottosistema di valutazione separato e più specifico si trova in `src/domain/assessment/`
(vedere anche [AUTO-COMBO.md](../routing/AUTO-COMBO.md) per il motore di assegnazione dei punteggi in tempo reale).
Questo sottosistema è destinato al motore Auto Combo, che assegna automaticamente punteggi ai provider e
ai modelli, consentendo alle combinazioni di autoripristinarsi in caso di errori dei servizi upstream. Utilizza un runner,
un classificatore e una logica di assegnazione dei punteggi propri.

Il framework Evals qui documentato rappresenta la **superficie di test più ampia e
generica**. È preferibile utilizzarlo per suite di regressione arbitrarie, confronti A/B
e smoke test per ogni release. Utilizzare il sottosistema Auto-Assessment quando è necessario
che lo stato in tempo reale dei provider influenzi le decisioni di instradamento.

## Integrazione CI

Attualmente non esiste uno script npm `eval:ci` dedicato. Se si desidera
subordinare le release ai risultati delle valutazioni, sono disponibili due approcci:

- **Approccio HTTP**: avviare il server, inviare una richiesta a `POST /api/evals` con un
  `suiteId` + `target` noto e verificare che `runs[].summary.passRate >= N` nella
  risposta.
- **Approccio in-process**: importare `runEvalSuiteAgainstTarget()` da
  `@/lib/evals/runtime` in uno script, eseguirlo su un DB di test e verificare il
  valore `PersistedEvalRun.summary` restituito.

I test relativi alla route e alla cronologia si trovano in
`tests/unit/evals-route.test.ts` e `tests/unit/evals-history.test.ts`.

## Punti di estensione

Modifiche comuni e dove apportarle:

- **Nuova strategia di assegnazione dei punteggi** — estendere il blocco `switch (evalCase.expected.strategy)`
  in `evaluateCase()` (`evalRunner.ts`) e ampliare `EvalCaseStrategy` in
  `src/lib/db/evals.ts`, oltre a `evalCaseBuilderSchema` in `schemas.ts`.
- **Nuova suite integrata** — definire un oggetto suite e chiamare `registerSuite()` alla
  fine di `evalRunner.ts`. Verrà rilevato automaticamente da `listSuites()`.
- **Esecuzione concorrente** — sostituire il ciclo `for` sequenziale in
  `runEvalSuiteAgainstTarget()` con un `Promise.all` limitato (attualmente non
  esiste alcun controllo della concorrenza).
- **Casi con streaming/chiamate a strumenti** — attualmente il runner imposta obbligatoriamente `stream: false`.
  La valutazione con supporto per streaming o strumenti richiederebbe modifiche a `runtime.ts`
  (acquisizione e aggregazione dei chunk SSE prima dell'assegnazione del punteggio).

## Vedi anche

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — panoramica generale del prodotto
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — riferimento per la pipeline delle richieste
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — motore di punteggio Auto Combo (runtime attivo)
- Codice sorgente: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Interfaccia utente: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
