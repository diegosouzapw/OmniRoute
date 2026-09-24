# Playground Studio (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funkce:** Playground Studio — sjednocené pracovní prostředí pro testování AI na `/dashboard/playground`.
> **Plány:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Stav:** Vydáno ve v3.8.6

---

## Přehled

Playground Studio transformuje `/dashboard/playground` z jednoduchého editoru založeného na Monaco
na plnohodnotné testovací pracovní prostředí. Nahrazuje původní `page.tsx` prostředím `PlaygroundStudio`,
které zobrazuje čtyři karty a sdílený panel konfigurace.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Porovnání] [{} API] [🔧 Sestavení] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {obsah aktivní karty}                   │ ─ Konfigurace             │
│                                          │ Endpoint  [chat ∨]        │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ Systém    [textové pole]  │
│                                          │ Teplota   ▕▕▔▔ 0.7        │
│                                          │ Předvolby [▾ načíst][uložit]│
│                                          │ [✨ Vylepšit prompt]       │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Karty

### Karta Chat

Rozšiřuje `ChatPlayground.tsx` na pracovní prostředí pro vícekolovou streamovanou konverzaci:

- Úplné vykreslování Markdownu prostřednictvím `MarkdownMessage.tsx` (bloky kódu, tabulky, seznamy, odkazy).
- Systémový prompt pochází ze sdíleného panelu Konfigurace.
- Počet tokenů a náklady na zprávu (tokeny promptu + dokončení).
- Opětovné vygenerování poslední odpovědi.
- Odesílá požadavky na `POST /v1/chat/completions` se streamováním SSE.

### Karta Porovnání

Klíčová výhoda proxy: spuštění jednoho promptu až na **4 modelech paralelně**.

- Až 4 sloupce, z nichž každý nezávisle streamuje z `/v1/chat/completions`.
- Tlačítko `+ Přidat model` (zkratka Cmd+K) pro přidávání sloupců.
- `Spustit vše ▶` spustí všechny streamy současně prostřednictvím `Promise.all` a samostatného `AbortController` pro každý sloupec.
- Globální tlačítko **Zrušit vše** přeruší všechny probíhající streamy.
- `ProviderMetrics` v každém sloupci zobrazuje TTFT, TPS, tokeny a odhadované náklady v reálném čase.
- Metriky jsou označeny jako **„odhad na straně klienta“** (D12) — měřeno od prvního bloku SSE.

### Karta API

Zachovává 100 % původního editoru Monaco pro pokročilé uživatele (D14):

- 10 endpointů: dokončení chatu, dokončení, embeddingy, obrázky, zvuk, řeč, přepisy, moderování, přerankování, vyhledávání.
- Nahrávání multimodálních souborů.
- Streamování SSE s výstupem v reálném čase.
- Zapouzdřeno jako `ApiTab.tsx` (načítáno líně, `ssr: false`).

### Karta Sestavení

Uživatelské rozhraní pro nástroje/volání funkcí a strukturovaný výstup:

- `ToolsBuilder.tsx` — přidání, úprava a odebrání `tools[]` pomocí editoru schématu JSON pro každý nástroj.
  Ověřuje parametry prostřednictvím `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — přepínač režimu JSON a editor schématu JSON.
  Ověřuje odpověď vůči schématu prostřednictvím `StructuredOutputSchema` (Zod).
- Odesílá požadavek na `/v1/chat/completions` s `tools[]` a/nebo `response_format`.

---

## Panel konfigurace (sdílený)

`StudioConfigPane.tsx` — vždy viditelný, sbalitelný.

| Pole             | Komponenta            | Poznámky                                                                       |
| ---------------- | --------------------- | ------------------------------------------------------------------------------ |
| Koncový bod      | `<select>`            | 10 možností odpovídajících `PlaygroundEndpoint`                                |
| Model            | `<input>`             | volný text, např. `openai/gpt-4o`                                              |
| Systémový prompt | `<textarea>`          | předáván všem kartám                                                           |
| Parametry        | `ParamSliders`        | temperature, max_tokens, top_p, penalizace presence/frequency, seed, stop      |
| Předvolby        | `PresetPicker`        | načítání/ukládání pojmenovaných snímků konfigurace (uložených v DB)            |
| Vylepšit prompt  | `ImprovePromptButton` | otevře modální okno s varováním o kvótě, volá `/api/playground/improve-prompt` |

Stav je přesunut do `PlaygroundStudio.tsx` a předáván všem kartám. Přepínání karet
zachovává stav konfigurace.

---

## Horní lišta

`StudioTopBar.tsx`:

- Přepínač karet (role="tablist").
- `TokenCostCounter` — živé zobrazení tokenů (↑/↓) a odhadovaných nákladů.
- Tlačítko pro export kódu (`</>`) — otevře `ExportCodeModal`.

---

## Modální okno pro export kódu

`ExportCodeModal.tsx` používá `codeExport.ts` ke generování ukázek curl / Python / TypeScript
z aktuálního `PlaygroundState`. Zástupný symbol klíče API je vždy `$OMNIROUTE_API_KEY` (D11).

---

## Vylepšení promptu

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modální okno varuje, že akce „spotřebuje kvótu“.
2. Po potvrzení odešle `{ system, prompt, model, tone }` do příslušné trasy.
3. Trasa interně zavolá `/v1/chat/completions` s `promptImprover.META_SYSTEM_PROMPT`.
4. Vrátí `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Uživatelské rozhraní aktualizuje systémový prompt v panelu konfigurace a uživatelský prompt na kartě Chat.

---

## Předvolby

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Uloženy v tabulce SQLite `playground_presets` (migrace `084_playground_presets.sql`).
- Každá předvolba ukládá: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: seznam přes `GET`, vytvoření přes `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metriky streamování

`useStreamMetrics.ts` + `streamMetrics.ts` (čistá funkce):

- `start()` — zaznamená čas zahájení požadavku.
- `onFirstChunk()` — zaznamená TTFT.
- `onChunk(n)` — načítá počet tokenů dokončení.
- `finish(usage?)` — vypočítá konečné metriky: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Ceny ze statické tabulky v `src/lib/playground/types.ts` (označeno jako „odhadované“ — D13).

---

## Backendové trasy

| Metoda   | Cesta                            | Obslužná funkce                                                                              |
| -------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Ověří `ImprovePromptRequestSchema` pomocí Zod; zavolá `/v1/chat/completions` s meta-promptem |
| `GET`    | `/api/playground/presets`        | Vrátí `{ presets: PlaygroundPresetListItem[] }`                                              |
| `POST`   | `/api/playground/presets`        | Vytvoří předvolbu; ověří `PlaygroundPresetCreateSchema`                                      |
| `GET`    | `/api/playground/presets/:id`    | Vrátí jednu předvolbu nebo 404                                                               |
| `PUT`    | `/api/playground/presets/:id`    | Částečná aktualizace                                                                         |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                          |

Autentizace: volitelná (`REQUIRE_API_KEY`). Chyby prostřednictvím `buildErrorBody()` (Pevné pravidlo č. 12).

---

## Klíčové soubory

| Cesta                                                                      | Účel                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Komponenta prostředí, orchestrátor karet          |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Karty + počítadlo + tlačítko exportu              |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Sdílený konfigurační panel                        |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Pracovní prostředí chatu                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Porovnání více modelů                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (zachován)                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Nástroje + strukturovaný výstup                   |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modální okno pro export kódu                      |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Jeden sloupec porovnání                           |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Zobrazení TTFT/TPS                                |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Klientský hook pro metriky                        |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook pro operace CRUD s předvolbami               |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook pro vylepšení promptu                        |
| `src/lib/playground/codeExport.ts`                                         | Generátor curl/Python/TS (sdílený s Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Generátor metapromptu                             |
| `src/lib/playground/streamMetrics.ts`                                      | Čistý výpočet metrik                              |
| `src/lib/db/playgroundPresets.ts`                                          | Databázový modul (CRUD)                           |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST endpoint pro vylepšení promptu               |
| `src/app/api/playground/presets/route.ts`                                  | Výpis a vytváření předvoleb                       |
| `src/app/api/playground/presets/[id]/route.ts`                             | Načtení/aktualizace/odstranění předvoleb          |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migrace databáze                                  |

---

## Řešení problémů

| Příznak                                      | Příčina                                         | Řešení                                                                                             |
| -------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Editor Monaco se na kartě API nevykresluje   | Monaco bylo načteno pomocí SSR                  | Ověřte, že `ApiTab` používá `dynamic(..., { ssr: false })`                                         |
| Porovnávané streamy se spouštějí postupně    | Nesprávné použití `Promise.all`                 | Všechny streamy musí být spuštěny v jediném volání `Promise.all`                                   |
| Metriky zobrazují pro TTFT hodnotu `null`    | Obslužná rutina prvního bloku dat není zapojena | Zkontrolujte, že se ve smyčce čtečky SSE volá `useStreamMetrics.onFirstChunk()`                    |
| Předvolba se neukládá                        | Migrace DB nebyla spuštěna                      | Spusťte `npm run db:migrate` nebo restartujte server (migrace se při spuštění provede automaticky) |
| Funkce pro vylepšení promptu vrací chybu 502 | V konfiguraci není nastaven model               | Před vylepšením musí uživatel zadat název modelu v panelu konfigurace                              |
| Exportovaný kód obsahuje `MISSING_API_KEY`   | Zástupný symbol nebyl vložen                    | `codeExport.ts` vždy používá `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                          |

---

## Reference

- Hlavní plán: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plán funkce: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Export kódu: `src/lib/playground/codeExport.ts`
- Nástroj pro vylepšení promptů: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
