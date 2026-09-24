# Playground Studio (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funktion:** Playground Studio — enhetlig arbetsyta för AI-testning på `/dashboard/playground`.
> **Planer:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Lanserad i v3.8.6

---

## Översikt

Playground Studio omvandlar `/dashboard/playground` från en enkel Monaco-baserad redigerare till
en fullfjädrad arbetsyta för testning. Den ersätter den äldre `page.tsx` med ett `PlaygroundStudio`-skal
som återger fyra flikar och en gemensam konfigurationspanel.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chatt] [⚖ Jämför] [{} API] [🔧 Bygg]      142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {innehåll i aktiv flik}                 │ ─ Konfiguration           │
│                                          │ Slutpunkt  [chatt ∨]      │
│                                          │ Modell     [gpt-5.4 ∨]    │
│                                          │ System     [textområde]   │
│                                          │ Temp       ▕▕▔▔ 0.7       │
│                                          │ Förval [▾ läs in][spara]  │
│                                          │ [✨ Förbättra prompt]      │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Flikar

### Chattfliken

Vidareutvecklar `ChatPlayground.tsx` till en arbetsbänk för flervarvsdialog med strömning:

- Fullständig Markdown-rendering via `MarkdownMessage.tsx` (kodblock, tabeller, listor, länkar).
- Systemprompt hämtad från den gemensamma konfigurationspanelen.
- Antal tokens/kostnad per meddelande (prompt- och slutförandetokens).
- Generera det senaste svaret på nytt.
- Skickar till `POST /v1/chat/completions` med SSE-strömning.

### Jämförelsefliken

Den viktigaste särskiljande funktionen för en proxy: kör 1 prompt mot upp till **4 modeller parallellt**.

- Upp till 4 kolumner, där varje kolumn strömmas oberoende från `/v1/chat/completions`.
- Knappen `+ Lägg till modell` (kortkommandot Cmd+K) för att lägga till kolumner.
- `Kör alla ▶` startar alla strömmar samtidigt via `Promise.all` + en `AbortController` per kolumn.
- Globala **Avbryt alla** avbryter varje pågående ström.
- `ProviderMetrics` per kolumn visar TTFT, TPS, tokens och uppskattad kostnad i realtid.
- Mätvärdena är märkta **"uppskattning på klientsidan"** (D12) — uppmätta från det första SSE-segmentet.

### API-fliken

Bevarar 100 % av den ursprungliga Monaco-redigeraren för avancerade användare (D14):

- 10 slutpunkter: chattslutföranden, slutföranden, inbäddningar, bilder, ljud, tal, transkriptioner, modereringar, omrankning, sökning.
- Multimodal filuppladdning.
- SSE-strömning med utdata i realtid.
- Inkapslad som `ApiTab.tsx` (läses in vid behov, `ssr: false`).

### Byggfliken

Användargränssnitt för verktygs-/funktionsanrop och strukturerade utdata:

- `ToolsBuilder.tsx` — lägg till/redigera/ta bort `tools[]` med en JSON-schemaredigerare för varje verktyg.
  Validerar parametrar via `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — växla JSON-läge + JSON-schemaredigerare.
  Validerar svaret mot schemat via `StructuredOutputSchema` (Zod).
- Skickar begäran till `/v1/chat/completions` med `tools[]` och/eller `response_format`.

---

## Konfigurationspanel (delat)

`StudioConfigPane.tsx` — alltid synligt, hopfällbart.

| Fält             | Komponent             | Kommentarer                                                                |
| ---------------- | --------------------- | -------------------------------------------------------------------------- |
| Slutpunkt        | `<select>`            | 10 alternativ som motsvarar `PlaygroundEndpoint`                           |
| Modell           | `<input>`             | fritext, t.ex. `openai/gpt-4o`                                             |
| Systemprompt     | `<textarea>`          | används i alla flikar                                                      |
| Parametrar       | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop     |
| Förinställningar | `PresetPicker`        | läs in/spara namngivna konfigurationsögonblicksbilder (lagras i databasen) |
| Förbättra prompt | `ImprovePromptButton` | öppnar modal med kvotvarning, anropar `/api/playground/improve-prompt`     |

Tillståndet lyfts till `PlaygroundStudio.tsx` och skickas vidare till alla flikar. När du växlar flik
bevaras konfigurationstillståndet.

---

## Övre fält

`StudioTopBar.tsx`:

- Flikväxlare (role="tablist").
- `TokenCostCounter` — livevisning av token (↑/↓) och uppskattad kostnad.
- Knapp för kodexport (`</>`) — öppnar `ExportCodeModal`.

---

## Modal för kodexport

`ExportCodeModal.tsx` använder `codeExport.ts` för att generera curl-/Python-/TypeScript-kodavsnitt
från aktuell `PlaygroundState`. Platshållaren för API-nyckeln är alltid `$OMNIROUTE_API_KEY` (D11).

---

## Promptförbättrare

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modalen varnar om att åtgärden ”kommer att förbruka kvot”.
2. Vid bekräftelse skickas `{ system, prompt, model, tone }` till rutten.
3. Rutten anropar `/v1/chat/completions` internt med `promptImprover.META_SYSTEM_PROMPT`.
4. Returnerar `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Användargränssnittet uppdaterar systemprompten i konfigurationspanelen och användarprompten på chattfliken.

---

## Förinställningar

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Lagras i SQLite-tabellen `playground_presets` (migrering `084_playground_presets.sql`).
- Varje förinställning lagrar: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` lista, `POST` skapa, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Strömningsmått

`useStreamMetrics.ts` + `streamMetrics.ts` (ren funktion):

- `start()` — registrerar tidpunkten då begäran startar.
- `onFirstChunk()` — registrerar TTFT.
- `onChunk(n)` — ackumulerar antalet slutförandetokens.
- `finish(usage?)` — beräknar slutliga mått: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Prissättning från den statiska tabellen i `src/lib/playground/types.ts` (märkt ”uppskattad” — D13).

---

## Backend-rutter

| Metod    | Sökväg                           | Hanterare                                                                                 |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Zod-validerar `ImprovePromptRequestSchema`; anropar `/v1/chat/completions` med metaprompt |
| `GET`    | `/api/playground/presets`        | Returnerar `{ presets: PlaygroundPresetListItem[] }`                                      |
| `POST`   | `/api/playground/presets`        | Skapar förinställning; validerar `PlaygroundPresetCreateSchema`                           |
| `GET`    | `/api/playground/presets/:id`    | Returnerar en förinställning eller 404                                                    |
| `PUT`    | `/api/playground/presets/:id`    | Partiell uppdatering                                                                      |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                       |

Autentisering: valfri (`REQUIRE_API_KEY`). Fel via `buildErrorBody()` (strikt regel nr 12).

---

## Viktiga filer

| Sökväg                                                                     | Syfte                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Skalkomponent, fliksamordnare                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Flikar + räknare + exportknapp                    |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Delad konfigurationspanel                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Arbetsyta för chatt                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Jämförelse av flera modeller                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-redigerare (bevarad)                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Verktyg + strukturerade utdata                    |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal för kodexport                               |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Enskild jämförelsekolumn                          |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Visning av TTFT/TPS                               |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Klientside-hook för mätvärden                     |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD-hook för förinställningar                    |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook för promptförbättring                        |
| `src/lib/playground/codeExport.ts`                                         | curl-/Python-/TS-generator (delad med sökverktyg) |
| `src/lib/playground/promptImprover.ts`                                     | Meta-promptbyggare                                |
| `src/lib/playground/streamMetrics.ts`                                      | Ren beräkning av mätvärden                        |
| `src/lib/db/playgroundPresets.ts`                                          | Databasmodul (CRUD)                               |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST-rutt för promptförbättring                   |
| `src/app/api/playground/presets/route.ts`                                  | Lista och skapa förinställningar                  |
| `src/app/api/playground/presets/[id]/route.ts`                             | Hämta/uppdatera/radera förinställningar           |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Databasmigrering                                  |

---

## Felsökning

| Symptom                                     | Orsak                                              | Åtgärd                                                                                    |
| ------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Monaco-redigeraren visas inte på API-fliken | SSR läste in Monaco                                | Kontrollera att `ApiTab` använder `dynamic(..., { ssr: false })`                          |
| Jämförelseströmmar startar sekventiellt     | Felaktig användning av `Promise.all`               | Alla strömstarter måste initieras i ett enda anrop till `Promise.all`                     |
| Mätvärden visar `null` för TTFT             | Hanteraren för första datablocket är inte ansluten | Kontrollera att `useStreamMetrics.onFirstChunk()` anropas i SSE-läsarens loop             |
| Förinställningen sparas inte                | Databasmigreringen har inte körts                  | Kör `npm run db:migrate` eller starta om servern (migreringen körs automatiskt vid start) |
| Förbättring av prompt returnerar 502        | Modell har inte angetts i Config                   | Användaren måste ange ett modellnamn i Config-panelen innan förbättringen görs            |
| Exporterad kod visar `MISSING_API_KEY`      | Platshållaren har inte infogats                    | `codeExport.ts` använder alltid `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`              |

---

## Referenser

- Huvudplan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funktionsplan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Kodexport: `src/lib/playground/codeExport.ts`
- Promptförbättrare: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
