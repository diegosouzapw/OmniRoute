# Playground Studio (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funktion:** Playground Studio — samlet arbejdsområde til AI-test for `/dashboard/playground`.
> **Abonnementer:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Udgivet i v3.8.6

---

## Oversigt

Playground Studio omdanner `/dashboard/playground` fra en enkel Monaco-baseret editor til
et komplet arbejdsområde til test. Det erstatter den tidligere `page.tsx` med en `PlaygroundStudio`-skal,
der viser fire faner og et fælles konfigurationspanel.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Sammenlign] [{} API] [🔧 Byg]    142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {indhold i aktiv fane}                  │ ─ Konfiguration           │
│                                          │ Slutpunkt [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ System    [tekstfelt]     │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Forvalg [▾ indlæs][gem]   │
│                                          │ [✨ Forbedr prompt]        │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Faner

### Chat-fanen

Videreudvikler `ChatPlayground.tsx` til et arbejdsområde med streaming og samtaler over flere beskeder:

- Fuld Markdown-gengivelse via `MarkdownMessage.tsx` (kodeblokke, tabeller, lister og links).
- Systemprompt hentes fra det fælles konfigurationspanel.
- Tokens/pris pr. besked (prompt- og færdiggørelsestokens).
- Generér det seneste svar igen.
- Sender til `POST /v1/chat/completions` med SSE-streaming.

### Sammenlign-fanen

Den vigtigste fordel ved en proxy: Kør 1 prompt på op til **4 modeller parallelt**.

- Op til 4 kolonner, der hver streamer uafhængigt fra `/v1/chat/completions`.
- Knappen `+ Tilføj model` (genvejen Cmd+K) til at tilføje kolonner.
- `Kør alle ▶` starter alle streams samtidigt via `Promise.all` + en `AbortController` pr. kolonne.
- Den globale funktion **Annuller alle** afbryder alle igangværende streams.
- `ProviderMetrics` for hver kolonne viser TTFT, TPS, tokens og estimeret pris i realtid.
- Målinger mærkes **"estimat på klientsiden"** (D12) — målt fra den første SSE-datablok.

### API-fanen

Bevarer 100 % af den oprindelige Monaco-editor til avancerede brugere (D14):

- 10 slutpunkter: chatfærdiggørelser, færdiggørelser, embeddings, billeder, lyd, tale, transskriptioner, moderationer, omrangering og søgning.
- Multimodal filupload.
- SSE-streaming med output i realtid.
- Indkapslet som `ApiTab.tsx` (indlæses efter behov, `ssr: false`).

### Byg-fanen

Brugergrænseflade til værktøjs-/funktionskald og struktureret output:

- `ToolsBuilder.tsx` — tilføj/rediger/fjern `tools[]` med en JSON-schemaeditor for hvert værktøj.
  Validerer parametre via `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — slå JSON-tilstand til/fra + JSON-schemaeditor.
  Validerer svar mod schemaet via `StructuredOutputSchema` (Zod).
- Sender anmodningen til `/v1/chat/completions` med `tools[]` og/eller `response_format`.

---

## Konfigurationspanel (delt)

`StudioConfigPane.tsx` — altid synligt, kan skjules.

| Felt               | Komponent             | Bemærkninger                                                           |
| ------------------ | --------------------- | ---------------------------------------------------------------------- |
| Slutpunkt          | `<select>`            | 10 valgmuligheder, der matcher `PlaygroundEndpoint`                    |
| Model              | `<input>`             | fritekst, f.eks. `openai/gpt-4o`                                       |
| Systemprompt       | `<textarea>`          | bruges i alle faner                                                    |
| Parametre          | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop |
| Forudindstillinger | `PresetPicker`        | indlæs/gem navngivne konfigurationssnapshots (gemt i DB)               |
| Forbedr prompt     | `ImprovePromptButton` | åbner modal med kvoteadvarsel, kalder `/api/playground/improve-prompt` |

Tilstanden løftes til `PlaygroundStudio.tsx` og sendes videre til alle faner. Skift mellem faner
bevarer konfigurationstilstanden.

---

## Topbjælke

`StudioTopBar.tsx`:

- Faneskifter (role="tablist").
- `TokenCostCounter` — livevisning af tokens (↑/↓) og estimerede omkostninger.
- Knap til eksport af kode (`</>`) — åbner `ExportCodeModal`.

---

## Modal til eksport af kode

`ExportCodeModal.tsx` bruger `codeExport.ts` til at generere curl-/Python-/TypeScript-kodestykker
ud fra den aktuelle `PlaygroundState`. Pladsholderen for API-nøglen er altid `$OMNIROUTE_API_KEY` (D11).

---

## Promptforbedring

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. En modal advarer om, at det "vil forbruge kvote".
2. Ved bekræftelse sendes `{ system, prompt, model, tone }` til ruten.
3. Ruten kalder internt `/v1/chat/completions` med `promptImprover.META_SYSTEM_PROMPT`.
4. Returnerer `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Brugergrænsefladen opdaterer systemprompten i konfigurationspanelet og brugerprompten på Chat-fanen.

---

## Forudindstillinger

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Gemmes i SQLite-tabellen `playground_presets` (migrering `084_playground_presets.sql`).
- Hver forudindstilling gemmer: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` viser liste, `POST` opretter, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Streammålinger

`useStreamMetrics.ts` + `streamMetrics.ts` (ren funktion):

- `start()` — registrerer anmodningens starttidspunkt.
- `onFirstChunk()` — registrerer TTFT.
- `onChunk(n)` — akkumulerer antallet af færdiggørelsestokens.
- `finish(usage?)` — beregner de endelige målinger: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Priser fra den statiske tabel i `src/lib/playground/types.ts` (markeret som "estimeret" — D13).

---

## Backend-ruter

| Metode   | Sti                              | Handler                                                                                  |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Zod-validerer `ImprovePromptRequestSchema`; kalder `/v1/chat/completions` med metaprompt |
| `GET`    | `/api/playground/presets`        | Returnerer `{ presets: PlaygroundPresetListItem[] }`                                     |
| `POST`   | `/api/playground/presets`        | Opretter forudindstilling; validerer `PlaygroundPresetCreateSchema`                      |
| `GET`    | `/api/playground/presets/:id`    | Returnerer én forudindstilling eller 404                                                 |
| `PUT`    | `/api/playground/presets/:id`    | Delvis opdatering                                                                        |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                      |

Godkendelse: valgfri (`REQUIRE_API_KEY`). Fejl via `buildErrorBody()` (Hård regel #12).

---

## Vigtige filer

| Sti                                                                        | Formål                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Shell-komponent, faneorkestrering                 |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Faner + tæller + eksportknap                      |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Delt konfigurationspanel                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Chat-arbejdsområde                                |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Sammenligning af flere modeller                   |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-editor (bevaret)                           |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Værktøjer + struktureret output                   |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal til kodeeksport                             |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Enkelt sammenligningskolonne                      |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Visning af TTFT/TPS                               |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Klientside-hook til målinger                      |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD-hook til forudindstillinger                  |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook til forbedring af prompts                    |
| `src/lib/playground/codeExport.ts`                                         | curl/Python/TS-generator (delt med søgeværktøjer) |
| `src/lib/playground/promptImprover.ts`                                     | Meta-prompt-generator                             |
| `src/lib/playground/streamMetrics.ts`                                      | Ren beregning af målinger                         |
| `src/lib/db/playgroundPresets.ts`                                          | DB-modul (CRUD)                                   |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST-rute til forbedring af prompts               |
| `src/app/api/playground/presets/route.ts`                                  | Visning + oprettelse af forudindstillinger        |
| `src/app/api/playground/presets/[id]/route.ts`                             | Hent/opdater/slet forudindstillinger              |
| `src/lib/db/migrations/084_playground_presets.sql`                         | DB-migrering                                      |

---

## Fejlfinding

| Symptom                                   | Årsag                                   | Løsning                                                                                      |
| ----------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Monaco-editoren vises ikke på API-fanen   | SSR indlæste Monaco                     | Kontrollér, at `ApiTab` bruger `dynamic(..., { ssr: false })`                                |
| Sammenligningsstreams starter sekventielt | Forkert brug af `Promise.all`           | Alle streams skal startes i ét enkelt `Promise.all`-kald                                     |
| Målinger viser `null` for TTFT            | Første chunk-handler er ikke tilsluttet | Kontrollér, at `useStreamMetrics.onFirstChunk()` kaldes i SSE-læserløkken                    |
| Forudindstilling gemmes ikke permanent    | DB-migrering er ikke kørt               | Kør `npm run db:migrate`, eller genstart serveren (migreringen køres automatisk ved opstart) |
| Forbedring af prompt returnerer 502       | Model er ikke angivet i Konfiguration   | Brugeren skal indtaste et modelnavn i ruden Konfiguration før forbedring                     |
| Eksporteret kode viser `MISSING_API_KEY`  | Pladsholder er ikke indsat              | `codeExport.ts` bruger altid `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                    |

---

## Referencer

- Overordnet plan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funktionsplan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Kodeeksport: `src/lib/playground/codeExport.ts`
- Promptforbedring: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
