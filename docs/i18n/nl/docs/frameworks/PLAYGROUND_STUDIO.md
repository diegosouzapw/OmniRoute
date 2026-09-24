# Playground Studio (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Functionaliteit:** Playground Studio — uniforme AI-testwerkruimte voor `/dashboard/playground`.
> **Plannen:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Uitgebracht in v3.8.6

---

## Overzicht

Playground Studio transformeert `/dashboard/playground` van een eenvoudige, op Monaco gebaseerde editor
tot een volwaardige testwerkruimte. Het vervangt het verouderde `page.tsx` door een `PlaygroundStudio`-
shell die vier tabbladen en een gedeeld configuratiepaneel weergeeft.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Vergelijken] [{} API] [🔧 Bouwen] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {inhoud van actief tabblad}             │ ─ Configuratie            │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ Systeem   [tekstvak]      │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Presets [▾ laden][opslaan]│
│                                          │ [✨ Prompt verbeteren]     │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Tabbladen

### Tabblad Chat

Breidt `ChatPlayground.tsx` uit tot een werkbank voor streaminggesprekken met meerdere beurten:

- Volledige Markdown-weergave via `MarkdownMessage.tsx` (codeblokken, tabellen, lijsten, links).
- Systeemprompt afkomstig uit het gedeelde configuratiepaneel.
- Tokens/kosten per bericht (prompt- en voltooiingstokens).
- Laatste antwoord opnieuw genereren.
- Verzendt naar `POST /v1/chat/completions` met SSE-streaming.

### Tabblad Vergelijken

De belangrijkste onderscheidende functie voor een proxy: voer 1 prompt parallel uit voor maximaal **4 modellen**.

- Maximaal 4 kolommen, die elk onafhankelijk streamen vanaf `/v1/chat/completions`.
- Knop `+ Model toevoegen` (sneltoets Cmd+K) om kolommen toe te voegen.
- `Alles uitvoeren ▶` start alle streams gelijktijdig via `Promise.all` + een `AbortController` per kolom.
- Globale optie **Alles annuleren** breekt elke actieve stream af.
- `ProviderMetrics` per kolom toont TTFT, TPS, tokens en geschatte kosten in realtime.
- Metrieken worden aangeduid als **"schatting aan clientzijde"** (D12) — gemeten vanaf het eerste SSE-fragment.

### Tabblad API

Behoudt 100% van de oorspronkelijke Monaco-editor voor geavanceerde gebruikers (D14):

- 10 endpoints: chatvoltooiingen, voltooiingen, embeddings, afbeeldingen, audio, spraak, transcripties, moderaties, herordening, zoeken.
- Uploaden van multimodale bestanden.
- SSE-streaming met realtime-uitvoer.
- Verpakt als `ApiTab.tsx` (lazy-loaded, `ssr: false`).

### Tabblad Bouwen

UI voor tools/functieaanroepen en gestructureerde uitvoer:

- `ToolsBuilder.tsx` — `tools[]` toevoegen/bewerken/verwijderen, met per tool een JSON-schema-editor.
  Valideert parameters via `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — JSON-modus in-/uitschakelen + JSON-schema-editor.
  Valideert het antwoord aan de hand van het schema via `StructuredOutputSchema` (Zod).
- Verzendt het verzoek naar `/v1/chat/completions` met `tools[]` en/of `response_format`.

---

## Configuratiepaneel (gedeeld)

`StudioConfigPane.tsx` — altijd zichtbaar, inklapbaar.

| Veld              | Component             | Opmerkingen                                                                      |
| ----------------- | --------------------- | -------------------------------------------------------------------------------- |
| Endpoint          | `<select>`            | 10 opties die overeenkomen met `PlaygroundEndpoint`                              |
| Model             | `<input>`             | vrije tekst, bijv. `openai/gpt-4o`                                               |
| Systeemprompt     | `<textarea>`          | wordt aan alle tabbladen doorgegeven                                             |
| Parameters        | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop           |
| Voorinstellingen  | `PresetPicker`        | benoemde configuratiemomentopnamen laden/opslaan (opgeslagen in de DB)           |
| Prompt verbeteren | `ImprovePromptButton` | opent een quotumwaarschuwingsvenster, roept `/api/playground/improve-prompt` aan |

De status wordt naar `PlaygroundStudio.tsx` verplaatst en aan alle tabbladen doorgegeven. Bij het wisselen tussen tabbladen
blijft de configuratiestatus behouden.

---

## Bovenbalk

`StudioTopBar.tsx`:

- Tabbladwisselaar (role="tablist").
- `TokenCostCounter` — liveweergave van tokens (↑/↓) en geschatte kosten.
- Knop om code te exporteren (`</>`) — opent `ExportCodeModal`.

---

## Modaal venster voor code-export

`ExportCodeModal.tsx` gebruikt `codeExport.ts` om curl-/Python-/TypeScript-fragmenten
te genereren op basis van de huidige `PlaygroundState`. De tijdelijke aanduiding voor de API-sleutel is altijd `$OMNIROUTE_API_KEY` (D11).

---

## Promptverbeteraar

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Het modale venster waarschuwt: "verbruikt quotum".
2. Na bevestiging wordt `{ system, prompt, model, tone }` naar de route verzonden.
3. De route roept intern `/v1/chat/completions` aan met `promptImprover.META_SYSTEM_PROMPT`.
4. Retourneert `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. De UI werkt de systeemprompt van het configuratiepaneel en de gebruikersprompt van het tabblad Chat bij.

---

## Voorinstellingen

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Opgeslagen in de SQLite-tabel `playground_presets` (migratie `084_playground_presets.sql`).
- Elke voorinstelling bevat: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` voor lijst, `POST` voor aanmaken, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Streammetriek

`useStreamMetrics.ts` + `streamMetrics.ts` (pure functie):

- `start()` — registreert de starttijd van het verzoek.
- `onFirstChunk()` — registreert TTFT.
- `onChunk(n)` — telt het aantal voltooiingstokens op.
- `finish(usage?)` — berekent de definitieve metriek: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Prijzen komen uit de statische tabel in `src/lib/playground/types.ts` (aangeduid als "geschat" — D13).

---

## Backendroutes

| Methode  | Pad                              | Handler                                                                                             |
| -------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Valideert `ImprovePromptRequestSchema` met Zod; roept `/v1/chat/completions` aan met een metaprompt |
| `GET`    | `/api/playground/presets`        | Retourneert `{ presets: PlaygroundPresetListItem[] }`                                               |
| `POST`   | `/api/playground/presets`        | Maakt een voorinstelling aan; valideert `PlaygroundPresetCreateSchema`                              |
| `GET`    | `/api/playground/presets/:id`    | Retourneert één voorinstelling of 404                                                               |
| `PUT`    | `/api/playground/presets/:id`    | Gedeeltelijke update                                                                                |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                 |

Authenticatie: optioneel (`REQUIRE_API_KEY`). Fouten via `buildErrorBody()` (harde regel #12).

---

## Belangrijkste bestanden

| Pad                                                                        | Doel                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Shell-component, tabbladcoördinator                 |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Tabbladen + teller + exportknop                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Gedeeld configuratiepaneel                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Chatwerkruimte                                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Vergelijking van meerdere modellen                  |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-editor (behouden)                            |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Tools + gestructureerde uitvoer                     |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modaal venster voor code-export                     |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Afzonderlijke vergelijkingskolom                    |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT/TPS-weergave                                   |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook voor metrische gegevens aan clientzijde        |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD-hook voor voorinstellingen                     |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook voor promptverbetering                         |
| `src/lib/playground/codeExport.ts`                                         | curl/Python/TS-generator (gedeeld met Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Meta-promptbouwer                                   |
| `src/lib/playground/streamMetrics.ts`                                      | Zuivere berekening van metrische gegevens           |
| `src/lib/db/playgroundPresets.ts`                                          | DB-module (CRUD)                                    |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST-route voor promptverbetering                   |
| `src/app/api/playground/presets/route.ts`                                  | Voorinstellingen weergeven + aanmaken               |
| `src/app/api/playground/presets/[id]/route.ts`                             | Voorinstellingen ophalen/bijwerken/verwijderen      |
| `src/lib/db/migrations/084_playground_presets.sql`                         | DB-migratie                                         |

---

## Probleemoplossing

| Symptoom                                                | Oorzaak                                            | Oplossing                                                                                                        |
| ------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Monaco-editor wordt niet weergegeven op het API-tabblad | SSR heeft Monaco geladen                           | Controleer of `ApiTab` gebruikmaakt van `dynamic(..., { ssr: false })`                                           |
| Vergelijkingsstreams starten na elkaar                  | Onjuist gebruik van `Promise.all`                  | Alle streams moeten binnen één aanroep van `Promise.all` worden gestart                                          |
| Metrieken tonen `null` voor TTFT                        | Handler voor het eerste fragment is niet gekoppeld | Controleer of `useStreamMetrics.onFirstChunk()` wordt aangeroepen in de SSE-readerlus                            |
| Voorinstelling wordt niet opgeslagen                    | DB-migratie is niet uitgevoerd                     | Voer `npm run db:migrate` uit of herstart de server (de migratie wordt bij het opstarten automatisch uitgevoerd) |
| Prompt verbeteren geeft 502 terug                       | Model is niet ingesteld in Config                  | De gebruiker moet een modelnaam invoeren in het Config-paneel voordat de prompt wordt verbeterd                  |
| Geëxporteerde code toont `MISSING_API_KEY`              | Tijdelijke aanduiding is niet ingevoegd            | `codeExport.ts` gebruikt altijd `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                     |

---

## Referenties

- Hoofdplan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Functieplan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Code-export: `src/lib/playground/codeExport.ts`
- Promptverbeteraar: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
