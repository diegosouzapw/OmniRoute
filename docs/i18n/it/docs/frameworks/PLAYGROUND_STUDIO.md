# Playground Studio (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funzionalità:** Playground Studio — spazio di lavoro unificato per i test AI in `/dashboard/playground`.
> **Piani:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Stato:** Rilasciato nella v3.8.6

---

## Panoramica

Playground Studio trasforma `/dashboard/playground` da un semplice editor basato su Monaco in
uno spazio di lavoro completo per i test. Sostituisce il precedente `page.tsx` con una shell `PlaygroundStudio`
che visualizza quattro schede e un pannello di configurazione condiviso.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Confronta] [{} API] [🔧 Crea]   142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {contenuto della scheda attiva}         │ ─ Configurazione          │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Modello   [gpt-5.4 ∨]     │
│                                          │ Sistema   [area di testo] │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Predefiniti [▾ carica][salva]│
│                                          │ [✨ Migliora il prompt]    │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Schede

### Scheda Chat

Evolve `ChatPlayground.tsx` in un ambiente di lavoro multi-turno con streaming:

- Rendering Markdown completo tramite `MarkdownMessage.tsx` (blocchi di codice, tabelle, elenchi, link).
- Prompt di sistema proveniente dal pannello Configurazione condiviso.
- Token/costo per messaggio (token del prompt + del completamento).
- Rigenerazione dell'ultima risposta.
- Invia le richieste a `POST /v1/chat/completions` con streaming SSE.

### Scheda Confronta

L'elemento distintivo fondamentale per un proxy: eseguire 1 prompt su un massimo di **4 modelli in parallelo**.

- Fino a 4 colonne, ciascuna con streaming indipendente da `/v1/chat/completions`.
- Pulsante `+ Aggiungi modello` (scorciatoia Cmd+K) per aggiungere colonne.
- `Esegui tutti ▶` avvia tutti gli stream simultaneamente tramite `Promise.all` + un `AbortController` per colonna.
- Il comando globale **Annulla tutti** interrompe ogni stream in corso.
- Il componente `ProviderMetrics` di ogni colonna mostra TTFT, TPS, token e costo stimato in tempo reale.
- Metriche contrassegnate come **"stima lato client"** (D12), misurate a partire dal primo chunk SSE.

### Scheda API

Mantiene il 100% dell'editor Monaco originale per gli utenti esperti (D14):

- 10 endpoint: completamenti chat, completamenti, embedding, immagini, audio, sintesi vocale, trascrizioni, moderazione, reranking, ricerca.
- Caricamento di file multimodali.
- Streaming SSE con output in tempo reale.
- Incapsulato come `ApiTab.tsx` (caricamento lazy, `ssr: false`).

### Scheda Crea

Interfaccia per strumenti/chiamate di funzione e output strutturato:

- `ToolsBuilder.tsx` — aggiunge/modifica/rimuove `tools[]` con un editor di schema JSON per ogni strumento.
  Convalida i parametri tramite `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — attiva/disattiva la modalità JSON + editor di schema JSON.
  Convalida la risposta rispetto allo schema tramite `StructuredOutputSchema` (Zod).
- Invia la richiesta a `/v1/chat/completions` con `tools[]` e/o `response_format`.

---

## Pannello di configurazione (condiviso)

`StudioConfigPane.tsx` — sempre visibile, comprimibile.

| Campo             | Componente            | Note                                                                          |
| ----------------- | --------------------- | ----------------------------------------------------------------------------- |
| Endpoint          | `<select>`            | 10 opzioni corrispondenti a `PlaygroundEndpoint`                              |
| Modello           | `<input>`             | testo libero, ad es. `openai/gpt-4o`                                          |
| Prompt di sistema | `<textarea>`          | fornito a tutte le schede                                                     |
| Parametri         | `ParamSliders`        | temperature, max_tokens, top_p, penalità di presenza/frequenza, seed, stop    |
| Preset            | `PresetPicker`        | carica/salva snapshot di configurazione con nome (persistiti nel DB)          |
| Migliora prompt   | `ImprovePromptButton` | apre il modale di avviso sulla quota, chiama `/api/playground/improve-prompt` |

Lo stato viene trasferito a `PlaygroundStudio.tsx` e passato a tutte le schede. Il passaggio da una scheda
all'altra preserva lo stato della configurazione.

---

## Barra superiore

`StudioTopBar.tsx`:

- Selettore delle schede (role="tablist").
- `TokenCostCounter` — visualizzazione in tempo reale dei token (↑/↓) e del costo stimato.
- Pulsante di esportazione del codice (`</>`) — apre `ExportCodeModal`.

---

## Modale di esportazione del codice

`ExportCodeModal.tsx` utilizza `codeExport.ts` per generare snippet curl / Python / TypeScript
dal `PlaygroundState` corrente. Il segnaposto della chiave API è sempre `$OMNIROUTE_API_KEY` (D11).

---

## Miglioramento del prompt

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Il modale avvisa che l'operazione "consumerà la quota".
2. Alla conferma, invia `{ system, prompt, model, tone }` alla route.
3. La route chiama internamente `/v1/chat/completions` con `promptImprover.META_SYSTEM_PROMPT`.
4. Restituisce `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. L'interfaccia aggiorna il prompt di sistema del pannello di configurazione e il prompt utente della scheda Chat.

---

## Preset

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Archiviati nella tabella SQLite `playground_presets` (migrazione `084_playground_presets.sql`).
- Ogni preset memorizza: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: elenco tramite `GET`, creazione tramite `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metriche dello stream

`useStreamMetrics.ts` + `streamMetrics.ts` (funzione pura):

- `start()` — registra l'ora di inizio della richiesta.
- `onFirstChunk()` — registra il TTFT.
- `onChunk(n)` — accumula il numero di token di completamento.
- `finish(usage?)` — calcola le metriche finali: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Prezzi dalla tabella statica in `src/lib/playground/types.ts` (etichettati come "stimati" — D13).

---

## Route del backend

| Metodo   | Percorso                         | Gestore                                                                                          |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `POST`   | `/api/playground/improve-prompt` | Convalida `ImprovePromptRequestSchema` con Zod; chiama `/v1/chat/completions` con il meta-prompt |
| `GET`    | `/api/playground/presets`        | Restituisce `{ presets: PlaygroundPresetListItem[] }`                                            |
| `POST`   | `/api/playground/presets`        | Crea il preset; convalida `PlaygroundPresetCreateSchema`                                         |
| `GET`    | `/api/playground/presets/:id`    | Restituisce un preset o 404                                                                      |
| `PUT`    | `/api/playground/presets/:id`    | Aggiornamento parziale                                                                           |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                              |

Autenticazione: facoltativa (`REQUIRE_API_KEY`). Errori tramite `buildErrorBody()` (Regola rigida n. 12).

---

## File principali

| Percorso                                                                   | Scopo                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Componente shell, orchestratore delle schede              |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Schede + contatore + pulsante di esportazione             |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Pannello di configurazione condiviso                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Area di lavoro della chat                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Confronto tra più modelli                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (mantenuto)                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Strumenti + output strutturato                            |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Finestra modale per l'esportazione del codice             |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Singola colonna di confronto                              |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Visualizzazione TTFT/TPS                                  |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook per le metriche lato client                          |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD per le preimpostazioni                          |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook per il miglioramento dei prompt                      |
| `src/lib/playground/codeExport.ts`                                         | Generatore curl/Python/TS (condiviso con Search Tools)    |
| `src/lib/playground/promptImprover.ts`                                     | Generatore di meta-prompt                                 |
| `src/lib/playground/streamMetrics.ts`                                      | Calcolo puro delle metriche                               |
| `src/lib/db/playgroundPresets.ts`                                          | Modulo DB (CRUD)                                          |
| `src/app/api/playground/improve-prompt/route.ts`                           | Route REST per il miglioramento dei prompt                |
| `src/app/api/playground/presets/route.ts`                                  | Elenco e creazione delle preimpostazioni                  |
| `src/app/api/playground/presets/[id]/route.ts`                             | Recupero/aggiornamento/eliminazione delle preimpostazioni |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migrazione del DB                                         |

---

## Risoluzione dei problemi

| Sintomo                                                 | Causa                                 | Soluzione                                                                                                    |
| ------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| L'editor Monaco non viene visualizzato nella scheda API | Monaco caricato tramite SSR           | Verificare che `ApiTab` utilizzi `dynamic(..., { ssr: false })`                                              |
| I flussi di confronto vengono avviati in sequenza       | Utilizzo errato di `Promise.all`      | Tutti i flussi devono essere avviati in un'unica chiamata a `Promise.all`                                    |
| Le metriche mostrano un TTFT pari a `null`              | Gestore del primo chunk non collegato | Verificare che `useStreamMetrics.onFirstChunk()` venga chiamato nel ciclo di lettura SSE                     |
| Il preset non viene salvato                             | Migrazione del DB non eseguita        | Eseguire `npm run db:migrate` o riavviare il server (la migrazione viene eseguita automaticamente all'avvio) |
| Il miglioramento del prompt restituisce 502             | Modello non impostato in Config       | L'utente deve inserire il nome di un modello nel riquadro Config prima di eseguire il miglioramento          |
| Il codice esportato mostra `MISSING_API_KEY`            | Segnaposto non inserito               | `codeExport.ts` utilizza sempre `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                 |

---

## Riferimenti

- Piano generale: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Piano della funzionalità: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Esportazione del codice: `src/lib/playground/codeExport.ts`
- Miglioramento dei prompt: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
