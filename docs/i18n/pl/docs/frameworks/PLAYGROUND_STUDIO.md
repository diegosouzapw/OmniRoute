---
title: "Playground Studio"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Playground Studio

> **Feature:** Playground Studio — ujednolicona przestrzeń testowa AI dla `/dashboard/playground`.
> **Plans:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Wydane w v3.8.6

---

## Przegląd

Playground Studio przekształca `/dashboard/playground` z prostego edytora opartego na Monaco w
pełnofunkcyjną przestrzeń testową. Zastępuje legacy `page.tsx` powłoką `PlaygroundStudio`,
która renderuje cztery zakładki oraz współdzielony panel konfiguracji.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Compare] [{} API] [🔧 Build]     142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {active tab content}                    │ ─ Config                  │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ System    [textarea]      │
│                                          │ Temp      ▕▕▔▔ 0.7        │
│                                          │ Presets [▾ load][save]    │
│                                          │ [✨ Improve prompt]        │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Zakładki

### Zakładka Chat

Rozwija `ChatPlayground.tsx` w wieloturrowy workbench ze streamingiem:

- Pełne renderowanie markdown przez `MarkdownMessage.tsx` (bloki kodu, tabele, listy, linki).
- System prompt pobierany ze współdzielonego panelu Config.
- Tokeny/koszt na wiadomość (prompt + completion tokens).
- Regeneracja ostatniej odpowiedzi.
- Wysyłka do `POST /v1/chat/completions` ze streamingiem SSE.

### Zakładka Compare

Kluczowy wyróżnik proxy: uruchom 1 prompt na maksymalnie **4 modelach równolegle**.

- Do 4 kolumn, każda niezależnie streamuje z `/v1/chat/completions`.
- Przycisk `+ Add model` (skrót Cmd+K) dodaje kolumny.
- `Run all ▶` uruchamia wszystkie streamy jednocześnie przez `Promise.all` + per-kolumnowy `AbortController`.
- Globalne **Cancel all** przerywa każdy trwający stream.
- Per-kolumnowy `ProviderMetrics` pokazuje TTFT, TPS, tokeny i szacowany koszt w czasie rzeczywistym.
- Metryki oznaczone jako **"client-side estimate"** (D12) — mierzone od pierwszego chunka SSE.

### Zakładka API

Zachowuje 100% oryginalnego edytora Monaco dla power userów (D14):

- 10 endpointów: chat completions, completions, embeddings, images, audio, speech, transcriptions, moderations, rerank, search.
- Multimodalny upload plików.
- Streaming SSE z wyjściem w czasie rzeczywistym.
- Opakowane jako `ApiTab.tsx` (lazy-loaded, `ssr: false`).

### Zakładka Build

UI tools/function calling oraz structured output:

- `ToolsBuilder.tsx` — dodawanie/edycja/usuwanie `tools[]` z edytorem JSON schema per tool.
  Waliduje parametry przez `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — przełącznik trybu JSON + edytor JSON schema.
  Waliduje odpowiedź względem schematu przez `StructuredOutputSchema` (Zod).
- Wysyła żądanie do `/v1/chat/completions` z `tools[]` i/lub `response_format`.

---

## Panel Config (współdzielony)

`StudioConfigPane.tsx` — zawsze widoczny, zwijany.

| Field          | Component             | Notes                                                                        |
| -------------- | --------------------- | ---------------------------------------------------------------------------- |
| Endpoint       | `<select>`            | 10 opcji zgodnych z `PlaygroundEndpoint`                                     |
| Model          | `<input>`             | dowolny tekst, np. `openai/gpt-4o`                                           |
| System prompt  | `<textarea>`          | przekazywany do wszystkich zakładek                                          |
| Parameters     | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop       |
| Presets        | `PresetPicker`        | load/save nazwanych snapshotów konfiguracji (trwałe w DB)                    |
| Improve prompt | `ImprovePromptButton` | otwiera modal ostrzeżenia o quota, wywołuje `/api/playground/improve-prompt` |

Stan jest wyniesiony do `PlaygroundStudio.tsx` i przekazywany w dół do wszystkich zakładek.
Przełączanie zakładek zachowuje stan konfiguracji.

---

## Pasek górny

`StudioTopBar.tsx`:

- Przełącznik zakładek (role="tablist").
- `TokenCostCounter` — żywy wyświetlacz tokenów (↑/↓) i szacowanego kosztu.
- Przycisk eksportu kodu (`</>`) — otwiera `ExportCodeModal`.

---

## Modal Export Code

`ExportCodeModal.tsx` używa `codeExport.ts` do generowania snippetów curl / Python / TypeScript
z bieżącego `PlaygroundState`. Placeholder klucza API to zawsze `$OMNIROUTE_API_KEY` (D11).

---

## Prompt Improver

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modal ostrzega „will consume quota".
2. Po potwierdzeniu wysyła `{ system, prompt, model, tone }` do route.
3. Route wewnętrznie wywołuje `/v1/chat/completions` z `promptImprover.META_SYSTEM_PROMPT`.
4. Zwraca `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. UI aktualizuje system prompt w panelu Config oraz user prompt w zakładce Chat.

---

## Presety

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Przechowywane w tabeli SQLite `playground_presets` (migracja `084_playground_presets.sql`).
- Każdy preset zapisuje: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` lista, `POST` utwórz, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metryki streamu

`useStreamMetrics.ts` + `streamMetrics.ts` (czysta funkcja):

- `start()` — zapisuje czas startu żądania.
- `onFirstChunk()` — zapisuje TTFT.
- `onChunk(n)` — akumuluje liczbę completion tokenów.
- `finish(usage?)` — liczy finalne metryki: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Cennik ze statycznej tabeli w `src/lib/playground/types.ts` (oznaczony jako "estimated" — D13).

---

## Trasy backendowe

| Method   | Path                             | Handler                                                                                   |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Walidacja Zod `ImprovePromptRequestSchema`; wywołuje `/v1/chat/completions` z meta-prompt |
| `GET`    | `/api/playground/presets`        | Zwraca `{ presets: PlaygroundPresetListItem[] }`                                          |
| `POST`   | `/api/playground/presets`        | Tworzy preset; waliduje `PlaygroundPresetCreateSchema`                                    |
| `GET`    | `/api/playground/presets/:id`    | Zwraca jeden preset lub 404                                                               |
| `PUT`    | `/api/playground/presets/:id`    | Częściowa aktualizacja                                                                    |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                       |

Auth: opcjonalny (`REQUIRE_API_KEY`). Błędy przez `buildErrorBody()` (Hard Rule #12).

---

## Kluczowe pliki

| Path                                                                       | Purpose                                                 |
| -------------------------------------------------------------------------- | ------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Komponent powłoki, orkiestrator zakładek                |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Zakładki + licznik + przycisk eksportu                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Współdzielony panel konfiguracji                        |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Workbench czatu                                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Porównanie wielu modeli                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Edytor Monaco (zachowany)                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Tools + structured output                               |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modal eksportu kodu                                     |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Pojedyncza kolumna Compare                              |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Wyświetlanie TTFT/TPS                                   |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Hook metryk po stronie klienta                          |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD presetów                                      |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook improve-prompt                                     |
| `src/lib/playground/codeExport.ts`                                         | Generator curl/Python/TS (współdzielony z Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Builder meta-promptu                                    |
| `src/lib/playground/streamMetrics.ts`                                      | Czyste wyliczanie metryk                                |
| `src/lib/db/playgroundPresets.ts`                                          | Moduł DB (CRUD)                                         |
| `src/app/api/playground/improve-prompt/route.ts`                           | Trasa REST improve-prompt                               |
| `src/app/api/playground/presets/route.ts`                                  | Lista + tworzenie presetów                              |
| `src/app/api/playground/presets/[id]/route.ts`                             | get/update/delete presetów                              |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migracja DB                                             |

---

## Rozwiązywanie problemów

| Objaw                                          | Przyczyna                               | Rozwiązanie                                                                        |
| ---------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| Edytor Monaco nie renderuje się w zakładce API | Monaco załadowany przez SSR             | Sprawdź, że `ApiTab` używa `dynamic(..., { ssr: false })`                          |
| Streamy Compare odpalają się sekwencyjnie      | Błędne użycie `Promise.all`             | Wszystkie starty streamów muszą iść w jednym wywołaniu `Promise.all`               |
| Metryki pokazują `null` TTFT                   | Handler pierwszego chunka niepodłączony | Sprawdź, że `useStreamMetrics.onFirstChunk()` jest wywoływane w pętli czytnika SSE |
| Preset się nie zapisuje                        | Migracja DB nie została uruchomiona     | Uruchom `npm run db:migrate` albo zrestartuj serwer (migracja auto przy starcie)   |
| Improve prompt zwraca 502                      | Model nieustawiony w Config             | Użytkownik musi wpisać nazwę modelu w panelu Config przed improve                  |
| Eksport kodu pokazuje `MISSING_API_KEY`        | Placeholder nie wstawiony               | `codeExport.ts` zawsze używa `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`          |

---

## Referencje

- Master plan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Feature plan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Code export: `src/lib/playground/codeExport.ts`
- Prompt improver: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
