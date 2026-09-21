# Playground Studio (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funksjon:** Playground Studio — samlet arbeidsområde for AI-testing i `/dashboard/playground`.
> **Planer:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Utgitt i v3.8.6

---

## Oversikt

Playground Studio forvandler `/dashboard/playground` fra en enkel Monaco-basert editor til
et fullverdig arbeidsområde for testing. Det erstatter den eldre `page.tsx` med et `PlaygroundStudio`-skall
som viser fire faner og et felles konfigurasjonspanel.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Sammenlign] [{} API] [🔧 Bygg]  142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {innhold i aktiv fane}                  │ ─ Konfigurasjon           │
│                                          │ Endepunkt [chat ∨]        │
│                                          │ Modell    [gpt-5.4 ∨]     │
│                                          │ System    [tekstområde]   │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Forvalg [▾ last inn][lagre]│
│                                          │ [✨ Forbedre ledetekst]    │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Faner

### Chat-fanen

Videreutvikler `ChatPlayground.tsx` til en arbeidsbenk for flertrinnssamtaler med strømming:

- Full Markdown-gjengivelse via `MarkdownMessage.tsx` (kodeblokker, tabeller, lister og lenker).
- Systemledeteksten hentes fra det felles konfigurasjonspanelet.
- Antall tokener/kostnad per melding (ledetekst- og fullføringstokener).
- Generer det siste svaret på nytt.
- Sender til `POST /v1/chat/completions` med SSE-strømming.

### Sammenlign-fanen

Den viktigste differensiatoren for en proxy: Kjør én ledetekst mot opptil **4 modeller parallelt**.

- Opptil 4 kolonner, der hver strømmer uavhengig fra `/v1/chat/completions`.
- Knappen `+ Legg til modell` (snarveien Cmd+K) legger til kolonner.
- `Kjør alle ▶` starter alle strømmene samtidig via `Promise.all` + én `AbortController` per kolonne.
- Global **Avbryt alle** avbryter alle aktive strømmer.
- `ProviderMetrics` per kolonne viser TTFT, TPS, tokener og estimert kostnad i sanntid.
- Målinger merket **«estimat på klientsiden»** (D12) — målt fra den første SSE-datablokken.

### API-fanen

Bevarer 100 % av den opprinnelige Monaco-editoren for avanserte brukere (D14):

- 10 endepunkter: chat-fullføringer, fullføringer, innebygginger, bilder, lyd, tale, transkripsjoner, moderering, omrangering og søk.
- Multimodal filopplasting.
- SSE-strømming med resultater i sanntid.
- Pakket inn som `ApiTab.tsx` (lastes ved behov, `ssr: false`).

### Bygg-fanen

Brukergrensesnitt for verktøy-/funksjonskall og strukturerte resultater:

- `ToolsBuilder.tsx` — legg til/rediger/fjern `tools[]` med en JSON-skjemaeditor for hvert verktøy.
  Validerer parametere via `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — slå JSON-modus av/på + JSON-skjemaeditor.
  Validerer responsen mot skjemaet via `StructuredOutputSchema` (Zod).
- Sender forespørselen til `/v1/chat/completions` med `tools[]` og/eller `response_format`.

---

## Konfigurasjonspanel (delt)

`StudioConfigPane.tsx` — alltid synlig, kan skjules.

| Felt                  | Komponent             | Merknader                                                                 |
| --------------------- | --------------------- | ------------------------------------------------------------------------- |
| Endepunkt             | `<select>`            | 10 alternativer som samsvarer med `PlaygroundEndpoint`                    |
| Modell                | `<input>`             | fritekst, f.eks. `openai/gpt-4o`                                          |
| Systeminstruksjon     | `<textarea>`          | brukes i alle faner                                                       |
| Parametere            | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop    |
| Forhåndsinnstillinger | `PresetPicker`        | last inn/lagre navngitte konfigurasjonsøyeblikksbilder (lagres i DB)      |
| Forbedre instruksjon  | `ImprovePromptButton` | åpner modalvindu med kvotevarsel, kaller `/api/playground/improve-prompt` |

Tilstanden løftes til `PlaygroundStudio.tsx` og sendes videre til alle fanene. Bytting mellom faner
bevarer konfigurasjonstilstanden.

---

## Topplinje

`StudioTopBar.tsx`:

- Fanebytter (role="tablist").
- `TokenCostCounter` — løpende visning av tokenantall (↑/↓) og estimert kostnad.
- Knapp for kodeeksport (`</>`) — åpner `ExportCodeModal`.

---

## Modalvindu for kodeeksport

`ExportCodeModal.tsx` bruker `codeExport.ts` til å generere curl-/Python-/TypeScript-kodesnutter
fra gjeldende `PlaygroundState`. Plassholderen for API-nøkkelen er alltid `$OMNIROUTE_API_KEY` (D11).

---

## Forbedring av instruksjoner

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Et modalvindu advarer om at dette «vil bruke av kvoten».
2. Ved bekreftelse sendes `{ system, prompt, model, tone }` til ruten.
3. Ruten kaller `/v1/chat/completions` internt med `promptImprover.META_SYSTEM_PROMPT`.
4. Returnerer `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Brukergrensesnittet oppdaterer systeminstruksjonen i konfigurasjonspanelet og brukerinstruksjonen i Chat-fanen.

---

## Forhåndsinnstillinger

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Lagres i SQLite-tabellen `playground_presets` (migrering `084_playground_presets.sql`).
- Hver forhåndsinnstilling lagrer: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` liste, `POST` opprett, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Strømmemålinger

`useStreamMetrics.ts` + `streamMetrics.ts` (ren funksjon):

- `start()` — registrerer forespørselens starttidspunkt.
- `onFirstChunk()` — registrerer TTFT.
- `onChunk(n)` — akkumulerer antall fullføringstokener.
- `finish(usage?)` — beregner endelige målinger: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Priser fra statisk tabell i `src/lib/playground/types.ts` (merket «estimert» — D13).

---

## Backend-ruter

| Metode   | Bane                             | Behandler                                                                                          |
| -------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Validerer `ImprovePromptRequestSchema` med Zod; kaller `/v1/chat/completions` med meta-instruksjon |
| `GET`    | `/api/playground/presets`        | Returnerer `{ presets: PlaygroundPresetListItem[] }`                                               |
| `POST`   | `/api/playground/presets`        | Oppretter forhåndsinnstilling; validerer `PlaygroundPresetCreateSchema`                            |
| `GET`    | `/api/playground/presets/:id`    | Returnerer én forhåndsinnstilling eller 404                                                        |
| `PUT`    | `/api/playground/presets/:id`    | Delvis oppdatering                                                                                 |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                |

Autentisering: valgfritt (`REQUIRE_API_KEY`). Feil via `buildErrorBody()` (ufravikelig regel nr. 12).

---

## Nøkkelfiler

| Bane                                                                       | Formål                                              |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Skallkomponent, fanekoordinator                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Faner + teller + eksportknapp                       |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Delt konfigurasjonspanel                            |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Arbeidsområde for chat                              |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Sammenligning av flere modeller                     |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-redigeringsprogram (bevart)                  |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Verktøy + strukturert utdata                        |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modalvindu for kodeeksport                          |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Enkeltstående sammenligningskolonne                 |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Visning av TTFT/TPS                                 |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Klientside-hook for måledata                        |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD-hook for forhåndsinnstillinger                 |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook for forbedring av ledetekst                    |
| `src/lib/playground/codeExport.ts`                                         | Generator for curl/Python/TS (delt med søkeverktøy) |
| `src/lib/playground/promptImprover.ts`                                     | Metaledetekstbygger                                 |
| `src/lib/playground/streamMetrics.ts`                                      | Ren beregning av måledata                           |
| `src/lib/db/playgroundPresets.ts`                                          | Databasemodul (CRUD)                                |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST-rute for forbedring av ledetekst               |
| `src/app/api/playground/presets/route.ts`                                  | Liste over og oppretting av forhåndsinnstillinger   |
| `src/app/api/playground/presets/[id]/route.ts`                             | Hent/oppdater/slett forhåndsinnstillinger           |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Databasemigrering                                   |

---

## Feilsøking

| Symptom                                    | Årsak                                         | Løsning                                                                                             |
| ------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Monaco-editoren gjengis ikke i API-fanen   | SSR lastet inn Monaco                         | Kontroller at `ApiTab` bruker `dynamic(..., { ssr: false })`                                        |
| Sammenligningsstrømmer starter sekvensielt | Feil bruk av `Promise.all`                    | Alle strømstarter må sendes i ett enkelt `Promise.all`-kall                                         |
| Måledata viser `null` for TTFT             | Behandleren for første del er ikke koblet til | Kontroller at `useStreamMetrics.onFirstChunk()` kalles i SSE-leseløkken                             |
| Forhåndsinnstillingen blir ikke lagret     | Databasemigreringen er ikke kjørt             | Kjør `npm run db:migrate` eller start serveren på nytt (migreringen kjøres automatisk ved oppstart) |
| Forbedring av ledetekst gir 502            | Modell er ikke angitt i konfigurasjonen       | Brukeren må angi et modellnavn i konfigurasjonspanelet før forbedring                               |
| Eksportert kode viser `MISSING_API_KEY`    | Plassholderen er ikke satt inn                | `codeExport.ts` bruker alltid `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                          |

---

## Referanser

- Hovedplan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funksjonsplan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Kodeeksport: `src/lib/playground/codeExport.ts`
- Ledetekstforbedrer: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
