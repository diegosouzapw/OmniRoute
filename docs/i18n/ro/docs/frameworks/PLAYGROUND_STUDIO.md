# Playground Studio (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funcționalitate:** Playground Studio — spațiu de lucru unificat pentru testarea AI la `/dashboard/playground`.
> **Planuri:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Stare:** Lansat în v3.8.6

---

## Prezentare generală

Playground Studio transformă `/dashboard/playground` dintr-un editor simplu bazat pe Monaco
într-un spațiu de lucru complet pentru testare. Acesta înlocuiește vechiul `page.tsx` cu un shell `PlaygroundStudio`
care afișează patru file și un panou de configurare comun.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Compară] [{} API] [🔧 Construiește] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {conținutul filei active}               │ ─ Configurare             │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ Sistem    [zonă de text]  │
│                                          │ Temp      ▕▕▔▔ 0.7        │
│                                          │ Prestabiliri [▾ încarcă][salvează]│
│                                          │ [✨ Îmbunătățește promptul]│
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## File

### Fila Chat

Transformă `ChatPlayground.tsx` într-un banc de lucru multi-tură cu streaming:

- Randare Markdown completă prin `MarkdownMessage.tsx` (blocuri de cod, tabele, liste, linkuri).
- Prompt de sistem preluat din panoul comun de Configurare.
- Tokenuri/cost per mesaj (tokenuri pentru prompt + finalizare).
- Regenerarea ultimului răspuns.
- Trimite către `POST /v1/chat/completions` cu streaming SSE.

### Fila Compară

Diferențiatorul principal pentru un proxy: rularea unui prompt pe până la **4 modele în paralel**.

- Până la 4 coloane, fiecare cu streaming independent din `/v1/chat/completions`.
- Butonul `+ Adaugă model` (comanda rapidă Cmd+K) pentru adăugarea coloanelor.
- `Rulează tot ▶` declanșează simultan toate fluxurile prin `Promise.all` + câte un `AbortController` pentru fiecare coloană.
- Opțiunea globală **Anulează tot** abandonează fiecare flux în curs.
- `ProviderMetrics` pentru fiecare coloană afișează în timp real TTFT, TPS, tokenurile și costul estimat.
- Metrici etichetate **„estimare pe partea clientului”** (D12) — măsurate de la primul fragment SSE.

### Fila API

Păstrează 100% din editorul Monaco original pentru utilizatorii avansați (D14):

- 10 endpointuri: finalizări de chat, finalizări, încorporări, imagini, audio, vorbire, transcrieri, moderări, rerank, căutare.
- Încărcare de fișiere multimodale.
- Streaming SSE cu ieșire în timp real.
- Încapsulat ca `ApiTab.tsx` (încărcat leneș, `ssr: false`).

### Fila Construiește

Interfață pentru apelarea instrumentelor/funcțiilor și ieșirea structurată:

- `ToolsBuilder.tsx` — adăugarea/editarea/eliminarea elementelor `tools[]`, cu editor de schemă JSON pentru fiecare instrument.
  Validează parametrii prin `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — comutator pentru modul JSON + editor de schemă JSON.
  Validează răspunsul în raport cu schema prin `StructuredOutputSchema` (Zod).
- Trimite cererea către `/v1/chat/completions` cu `tools[]` și/sau `response_format`.

---

## Panou de configurare (Partajat)

`StudioConfigPane.tsx` — întotdeauna vizibil, restrângabil.

| Câmp                | Componentă            | Note                                                                                   |
| ------------------- | --------------------- | -------------------------------------------------------------------------------------- |
| Endpoint            | `<select>`            | 10 opțiuni corespunzătoare `PlaygroundEndpoint`                                        |
| Model               | `<input>`             | text liber, de ex. `openai/gpt-4o`                                                     |
| Prompt de sistem    | `<textarea>`          | transmis tuturor filelor                                                               |
| Parametri           | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop                 |
| Presetări           | `PresetPicker`        | încarcă/salvează instantanee denumite ale configurației (persistate în BD)             |
| Îmbunătățire prompt | `ImprovePromptButton` | deschide modalul de avertizare privind cota, apelează `/api/playground/improve-prompt` |

Starea este ridicată în `PlaygroundStudio.tsx` și transmisă tuturor filelor. Comutarea între file
păstrează starea configurației.

---

## Bara superioară

`StudioTopBar.tsx`:

- Selector de file (role="tablist").
- `TokenCostCounter` — afișare în timp real a tokenurilor (↑/↓) și a costului estimat.
- Buton de export al codului (`</>`) — deschide `ExportCodeModal`.

---

## Modalul de export al codului

`ExportCodeModal.tsx` utilizează `codeExport.ts` pentru a genera fragmente curl / Python / TypeScript
din `PlaygroundState` curentă. Substituentul cheii API este întotdeauna `$OMNIROUTE_API_KEY` (D11).

---

## Îmbunătățirea promptului

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modalul avertizează că „va consuma din cotă”.
2. La confirmare, trimite `{ system, prompt, model, tone }` către rută.
3. Ruta apelează intern `/v1/chat/completions` cu `promptImprover.META_SYSTEM_PROMPT`.
4. Returnează `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Interfața actualizează promptul de sistem din panoul de configurare și promptul utilizatorului din fila Chat.

---

## Presetări

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Stocate în tabelul SQLite `playground_presets` (migrarea `084_playground_presets.sql`).
- Fiecare presetare stochează: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: listare prin `GET`, creare prin `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metrici de streaming

`useStreamMetrics.ts` + `streamMetrics.ts` (funcție pură):

- `start()` — înregistrează ora de început a solicitării.
- `onFirstChunk()` — înregistrează TTFT.
- `onChunk(n)` — acumulează numărul de tokenuri de completare.
- `finish(usage?)` — calculează metricile finale: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Tarifele provin din tabelul static din `src/lib/playground/types.ts` (etichetate drept „estimate” — D13).

---

## Rute backend

| Metodă   | Cale                             | Handler                                                                                         |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Validează `ImprovePromptRequestSchema` cu Zod; apelează `/v1/chat/completions` cu meta-promptul |
| `GET`    | `/api/playground/presets`        | Returnează `{ presets: PlaygroundPresetListItem[] }`                                            |
| `POST`   | `/api/playground/presets`        | Creează presetarea; validează `PlaygroundPresetCreateSchema`                                    |
| `GET`    | `/api/playground/presets/:id`    | Returnează o presetare sau 404                                                                  |
| `PUT`    | `/api/playground/presets/:id`    | Actualizare parțială                                                                            |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                             |

Autentificare: opțională (`REQUIRE_API_KEY`). Erori prin `buildErrorBody()` (Regula strictă #12).

---

## Fișiere cheie

| Cale                                                                       | Scop                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Componentă shell, orchestrator de file              |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | File + contor + buton de export                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Panou de configurare partajat                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Spațiu de lucru pentru chat                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Comparare între mai multe modele                    |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (păstrat)                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Instrumente + ieșire structurată                    |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Fereastră modală pentru exportul codului            |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Coloană individuală de comparare                    |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Afișare TTFT/TPS                                    |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook pentru metrici la nivel de client              |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD pentru presetări                          |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook pentru îmbunătățirea promptului                |
| `src/lib/playground/codeExport.ts`                                         | Generator curl/Python/TS (partajat cu Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Generator de meta-prompturi                         |
| `src/lib/playground/streamMetrics.ts`                                      | Calcul pur al metricilor                            |
| `src/lib/db/playgroundPresets.ts`                                          | Modul BD (CRUD)                                     |
| `src/app/api/playground/improve-prompt/route.ts`                           | Rută REST pentru îmbunătățirea promptului           |
| `src/app/api/playground/presets/route.ts`                                  | Listarea + crearea presetărilor                     |
| `src/app/api/playground/presets/[id]/route.ts`                             | Obținerea/actualizarea/ștergerea presetărilor       |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migrare BD                                          |

---

## Depanare

| Simptom                                    | Cauză                                               | Remediere                                                                                    |
| ------------------------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Editorul Monaco nu se afișează în fila API | SSR a încărcat Monaco                               | Verificați dacă `ApiTab` utilizează `dynamic(..., { ssr: false })`                           |
| Fluxurile de comparare pornesc secvențial  | Utilizare incorectă a `Promise.all`                 | Toate pornirile fluxurilor trebuie lansate într-un singur apel `Promise.all`                 |
| Metricile afișează TTFT `null`             | Gestionarul pentru primul fragment nu este conectat | Verificați dacă `useStreamMetrics.onFirstChunk()` este apelat în bucla de citire SSE         |
| Presetarea nu este păstrată                | Migrarea bazei de date nu a fost executată          | Rulați `npm run db:migrate` sau reporniți serverul (migrarea rulează automat la pornire)     |
| Îmbunătățirea promptului returnează 502    | Modelul nu este configurat în Config                | Utilizatorul trebuie să introducă numele unui model în panoul Config înainte de îmbunătățire |
| Codul exportat afișează `MISSING_API_KEY`  | Substituentul nu a fost inserat                     | `codeExport.ts` utilizează întotdeauna `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`          |

---

## Referințe

- Plan principal: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Planul funcționalității: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Exportarea codului: `src/lib/playground/codeExport.ts`
- Instrument de îmbunătățire a prompturilor: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
