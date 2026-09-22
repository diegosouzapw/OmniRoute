# Playground Studio (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Feature:** Playground Studio — pinag-isang workspace para sa pagsubok ng AI sa `/dashboard/playground`.
> **Mga Plan:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Inilabas sa v3.8.6

---

## Pangkalahatang-ideya

Binabago ng Playground Studio ang `/dashboard/playground` mula sa isang simpleng editor na nakabatay sa Monaco tungo sa
isang kumpletong workspace para sa pagsubok. Pinapalitan nito ang lumang `page.tsx` ng isang `PlaygroundStudio`
shell na nagre-render ng apat na tab at isang nakabahaging pane ng configuration.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Ihambing] [{} API] [🔧 Bumuo]    142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {nilalaman ng aktibong tab}             │ ─ Configuration           │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ System    [text area]     │
│                                          │ Temp      ▕▕▔▔ 0.7        │
│                                          │ Preset [▾ i-load][i-save] │
│                                          │ [✨ Pagandahin ang prompt] │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Mga Tab

### Tab na Chat

Pinauunlad ang `ChatPlayground.tsx` bilang isang multi-turn streaming workbench:

- Ganap na pag-render ng markdown sa pamamagitan ng `MarkdownMessage.tsx` (mga code block, table, listahan, link).
- Kinukuha ang system prompt mula sa nakabahaging pane ng Configuration.
- Token/gastos bawat mensahe (mga token ng prompt + completion).
- Muling buuin ang huling tugon.
- Nagpapadala sa `POST /v1/chat/completions` gamit ang SSE streaming.

### Tab na Paghahambing

Ang pangunahing katangian para sa isang proxy: magpatakbo ng 1 prompt sa hanggang **4 na model nang sabay-sabay**.

- Hanggang 4 na column, na ang bawat isa ay hiwalay na nagsi-stream mula sa `/v1/chat/completions`.
- Button na `+ Magdagdag ng model` (shortcut na Cmd+K) upang magdagdag ng mga column.
- Sabay-sabay na sinisimulan ng `Patakbuhin lahat ▶` ang lahat ng stream sa pamamagitan ng `Promise.all` + `AbortController` para sa bawat column.
- Ina-abort ng pangkalahatang **Kanselahin lahat** ang bawat kasalukuyang stream.
- Ipinapakita ng `ProviderMetrics` sa bawat column ang TTFT, TPS, mga token, at tinatayang gastos nang real time.
- Nilalagyan ang mga metric ng label na **"pagtataya sa panig ng client"** (D12) — sinusukat mula sa unang SSE chunk.

### Tab na API

Pinananatili ang 100% ng orihinal na Monaco editor para sa mga advanced na user (D14):

- 10 endpoint: chat completions, completions, embeddings, images, audio, speech, transcriptions, moderations, rerank, search.
- Pag-upload ng multimodal na file.
- SSE streaming na may real-time na output.
- Binalot bilang `ApiTab.tsx` (lazy-loaded, `ssr: false`).

### Tab na Pagbuo

UI para sa tools/function calling at structured output:

- `ToolsBuilder.tsx` — magdagdag/mag-edit/mag-alis ng `tools[]` gamit ang JSON schema editor para sa bawat tool.
  Bine-validate ang mga parameter sa pamamagitan ng `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — i-toggle ang JSON mode + JSON schema editor.
  Bine-validate ang tugon ayon sa schema sa pamamagitan ng `StructuredOutputSchema` (Zod).
- Nagpapadala ng request sa `/v1/chat/completions` gamit ang `tools[]` at/o `response_format`.

---

## Panel ng Config (Ibinabahagi)

`StudioConfigPane.tsx` — laging nakikita, maaaring i-collapse.

| Field                 | Component             | Mga Tala                                                                              |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| Endpoint              | `<select>`            | 10 opsyong tumutugma sa `PlaygroundEndpoint`                                          |
| Model                 | `<input>`             | malayang text, hal. `openai/gpt-4o`                                                   |
| System prompt         | `<textarea>`          | ginagamit sa lahat ng tab                                                             |
| Mga parameter         | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop                |
| Mga preset            | `PresetPicker`        | naglo-load/nagse-save ng pinangalanang mga snapshot ng config (naka-persist sa DB)    |
| Pagandahin ang prompt | `ImprovePromptButton` | nagbubukas ng modal ng babala sa quota, tumatawag sa `/api/playground/improve-prompt` |

Itinataas ang state sa `PlaygroundStudio.tsx` at ipinapasa sa lahat ng tab. Napananatili ang
state ng config kapag nagpapalit ng tab.

---

## Itaas na Bar

`StudioTopBar.tsx`:

- Tagapalit ng tab (role="tablist").
- `TokenCostCounter` — live na bilang ng token (↑/↓) at pagpapakita ng tinatayang gastos.
- Button para mag-export ng code (`</>`) — binubuksan ang `ExportCodeModal`.

---

## Modal ng Pag-export ng Code

Ginagamit ng `ExportCodeModal.tsx` ang `codeExport.ts` upang bumuo ng mga snippet ng curl / Python / TypeScript
mula sa kasalukuyang `PlaygroundState`. Ang placeholder ng API key ay palaging `$OMNIROUTE_API_KEY` (D11).

---

## Tagapagpaganda ng Prompt

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Nagbibigay-babala ang modal na "gagamit ito ng quota".
2. Kapag kinumpirma, ipinapadala ang `{ system, prompt, model, tone }` sa route.
3. Internong tinatawag ng route ang `/v1/chat/completions` gamit ang `promptImprover.META_SYSTEM_PROMPT`.
4. Ibinabalik ang `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Ina-update ng UI ang system prompt ng panel ng Config at ang user prompt ng tab na Chat.

---

## Mga Preset

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Naka-store sa SQLite table na `playground_presets` (migration na `084_playground_presets.sql`).
- Iniimbak ng bawat preset ang: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: listahan gamit ang `GET`, paggawa gamit ang `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Mga Sukatan ng Stream

`useStreamMetrics.ts` + `streamMetrics.ts` (purong function):

- `start()` — itinatala ang oras ng pagsisimula ng request.
- `onFirstChunk()` — itinatala ang TTFT.
- `onChunk(n)` — iniipon ang bilang ng completion token.
- `finish(usage?)` — kinakalkula ang mga panghuling sukatan: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Ang pagpepresyo ay mula sa static na table sa `src/lib/playground/types.ts` (may label na "tinataya" — D13).

---

## Mga Route ng Backend

| Method   | Path                             | Handler                                                                                                                  |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `POST`   | `/api/playground/improve-prompt` | Bina-validate gamit ang Zod ang `ImprovePromptRequestSchema`; tinatawag ang `/v1/chat/completions` gamit ang meta-prompt |
| `GET`    | `/api/playground/presets`        | Ibinabalik ang `{ presets: PlaygroundPresetListItem[] }`                                                                 |
| `POST`   | `/api/playground/presets`        | Gumagawa ng preset; bina-validate ang `PlaygroundPresetCreateSchema`                                                     |
| `GET`    | `/api/playground/presets/:id`    | Nagbabalik ng isang preset o 404                                                                                         |
| `PUT`    | `/api/playground/presets/:id`    | Bahagyang pag-update                                                                                                     |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                                      |

Auth: opsyonal (`REQUIRE_API_KEY`). Mga error sa pamamagitan ng `buildErrorBody()` (Mahigpit na Panuntunan #12).

---

## Mga Pangunahing File

| Path                                                                       | Layunin                                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Shell component, tagapangasiwa ng mga tab                    |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Mga tab + counter + button sa pag-export                     |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Pinagsasaluhang panel ng configuration                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Workbench ng chat                                            |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Paghahambing ng maraming model                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco editor (pinanatili)                                   |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Mga tool + structured output                                 |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal para sa pag-export ng code                             |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Isang column ng paghahambing                                 |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Display ng TTFT/TPS                                          |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Client-side na hook para sa mga metric                       |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD hook para sa mga preset                                 |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook para sa pagpapahusay ng prompt                          |
| `src/lib/playground/codeExport.ts`                                         | Generator ng curl/Python/TS (pinagsasaluhan sa Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Tagabuo ng meta-prompt                                       |
| `src/lib/playground/streamMetrics.ts`                                      | Purong pagkalkula ng mga metric                              |
| `src/lib/db/playgroundPresets.ts`                                          | DB module (CRUD)                                             |
| `src/app/api/playground/improve-prompt/route.ts`                           | Improve-prompt REST route                                    |
| `src/app/api/playground/presets/route.ts`                                  | Listahan + paggawa ng mga preset                             |
| `src/app/api/playground/presets/[id]/route.ts`                             | Pagkuha/pag-update/pagtanggal ng mga preset                  |
| `src/lib/db/migrations/084_playground_presets.sql`                         | DB migration                                                 |

---

## Pag-troubleshoot

| Sintomas                                               | Sanhi                                     | Solusyon                                                                                                     |
| ------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Hindi lumalabas ang Monaco editor sa API tab           | Na-load ng SSR ang Monaco                 | Tiyaking gumagamit ang `ApiTab` ng `dynamic(..., { ssr: false })`                                            |
| Sunod-sunod na gumagana ang compare streams            | Maling paggamit ng `Promise.all`          | Dapat simulan ang lahat ng stream sa iisang tawag sa `Promise.all`                                           |
| Nagpapakita ang metrics ng `null` na TTFT              | Hindi nakakonekta ang first chunk handler | Tiyaking tinatawag ang `useStreamMetrics.onFirstChunk()` sa SSE reader loop                                  |
| Hindi nananatili ang preset                            | Hindi napagana ang DB migration           | Patakbuhin ang `npm run db:migrate` o i-restart ang server (awtomatikong tumatakbo ang migration sa startup) |
| Nagbabalik ng 502 ang improve prompt                   | Hindi nakatakda ang model sa Config       | Dapat maglagay ang user ng pangalan ng model sa Config pane bago mag-improve                                 |
| Nagpapakita ang na-export na code ng `MISSING_API_KEY` | Hindi naipasok ang placeholder            | Palaging ginagamit ng `codeExport.ts` ang `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                       |

---

## Mga Sanggunian

- Pangunahing plano: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plano ng feature: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Pag-export ng code: `src/lib/playground/codeExport.ts`
- Prompt improver: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
