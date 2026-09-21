# Playground Studio (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funkcia:** Playground Studio — jednotný pracovný priestor na testovanie AI pre `/dashboard/playground`.
> **Plány:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Stav:** Vydané vo v3.8.6

---

## Prehľad

Playground Studio mení `/dashboard/playground` z jednoduchého editora založeného na Monaco na
plnohodnotný pracovný priestor na testovanie. Nahrádza pôvodný `page.tsx` prostredím `PlaygroundStudio`,
ktoré zobrazuje štyri karty a zdieľaný konfiguračný panel.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Chat] [⚖ Porovnanie] [{} API] [🔧 Zostavenie] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {obsah aktívnej karty}                  │ ─ Konfigurácia            │
│                                          │ Koncový bod [chat ∨]      │
│                                          │ Model       [gpt-5.4 ∨]   │
│                                          │ Systém      [text. pole]  │
│                                          │ Teplota     ▕▕▔▔ 0.7      │
│                                          │ Predvoľby [▾ načítať][uložiť]│
│                                          │ [✨ Vylepšiť prompt]       │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Karty

### Karta Chat

Rozširuje `ChatPlayground.tsx` na pracovné prostredie s viacotáčkovým streamovaním:

- Úplné vykresľovanie Markdownu prostredníctvom `MarkdownMessage.tsx` (bloky kódu, tabuľky, zoznamy, odkazy).
- Systémový prompt sa preberá zo zdieľaného konfiguračného panela.
- Tokeny/náklady na správu (tokeny promptu + dokončenia).
- Opätovné vygenerovanie poslednej odpovede.
- Odosiela požiadavky na `POST /v1/chat/completions` so streamovaním SSE.

### Karta Porovnanie

Kľúčová odlišnosť proxy: spustenie 1 promptu paralelne až na **4 modeloch**.

- Až 4 stĺpce, pričom každý nezávisle streamuje z `/v1/chat/completions`.
- Tlačidlo `+ Pridať model` (skratka Cmd+K) na pridávanie stĺpcov.
- `Spustiť všetko ▶` spustí všetky streamy súčasne prostredníctvom `Promise.all` a samostatného `AbortController` pre každý stĺpec.
- Globálne tlačidlo **Zrušiť všetko** preruší každý prebiehajúci stream.
- `ProviderMetrics` pre každý stĺpec zobrazuje TTFT, TPS, tokeny a odhadované náklady v reálnom čase.
- Metriky sú označené ako **„odhad na strane klienta“** (D12) — merané od prvého bloku SSE.

### Karta API

Zachováva 100 % pôvodného editora Monaco pre pokročilých používateľov (D14):

- 10 koncových bodov: dokončenia chatu, dokončenia, embeddingy, obrázky, zvuk, reč, prepisy, moderovanie, zmena poradia, vyhľadávanie.
- Nahrávanie multimodálnych súborov.
- Streamovanie SSE s výstupom v reálnom čase.
- Zapuzdrené ako `ApiTab.tsx` (načítavané podľa potreby, `ssr: false`).

### Karta Zostavenie

Používateľské rozhranie pre nástroje/volanie funkcií a štruktúrovaný výstup:

- `ToolsBuilder.tsx` — pridávanie, úprava a odstraňovanie položiek `tools[]` s editorom schémy JSON pre každý nástroj.
  Overuje parametre prostredníctvom `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — prepínač režimu JSON + editor schémy JSON.
  Overuje odpoveď voči schéme prostredníctvom `StructuredOutputSchema` (Zod).
- Odosiela požiadavku na `/v1/chat/completions` s `tools[]` a/alebo `response_format`.

## Panel konfigurácie (zdieľaný)

`StudioConfigPane.tsx` — vždy viditeľný, zbaliteľný.

| Pole            | Komponent             | Poznámky                                                                          |
| --------------- | --------------------- | --------------------------------------------------------------------------------- |
| Koncový bod     | `<select>`            | 10 možností zodpovedajúcich `PlaygroundEndpoint`                                  |
| Model           | `<input>`             | voľný text, napr. `openai/gpt-4o`                                                 |
| Systémová výzva | `<textarea>`          | používa sa vo všetkých kartách                                                    |
| Parametre       | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop            |
| Predvoľby       | `PresetPicker`        | načítanie/uloženie pomenovaných snímok konfigurácie (uložených v DB)              |
| Vylepšiť výzvu  | `ImprovePromptButton` | otvorí modálne okno s upozornením na kvótu, volá `/api/playground/improve-prompt` |

Stav je presunutý do `PlaygroundStudio.tsx` a odovzdáva sa všetkým kartám. Prepínanie kariet
zachováva stav konfigurácie.

---

## Horný panel

`StudioTopBar.tsx`:

- Prepínač kariet (role="tablist").
- `TokenCostCounter` — živé zobrazenie tokenov (↑/↓) a odhadovaných nákladov.
- Tlačidlo exportu kódu (`</>`) — otvorí `ExportCodeModal`.

---

## Modálne okno exportu kódu

`ExportCodeModal.tsx` používa `codeExport.ts` na generovanie úryvkov curl / Python / TypeScript
z aktuálneho `PlaygroundState`. Zástupný symbol kľúča API je vždy `$OMNIROUTE_API_KEY` (D11).

---

## Vylepšovač výziev

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modálne okno upozorní, že akcia „spotrebuje kvótu“.
2. Po potvrdení odošle `{ system, prompt, model, tone }` na trasu.
3. Trasa interne zavolá `/v1/chat/completions` s `promptImprover.META_SYSTEM_PROMPT`.
4. Vráti `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Používateľské rozhranie aktualizuje systémovú výzvu v paneli konfigurácie a používateľskú výzvu na karte Chat.

---

## Predvoľby

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Uložené v SQLite tabuľke `playground_presets` (migrácia `084_playground_presets.sql`).
- Každá predvoľba ukladá: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: zoznam cez `GET`, vytvorenie cez `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metriky streamovania

`useStreamMetrics.ts` + `streamMetrics.ts` (čistá funkcia):

- `start()` — zaznamená čas začiatku požiadavky.
- `onFirstChunk()` — zaznamená TTFT.
- `onChunk(n)` — priebežne sčítava počet tokenov dokončenia.
- `finish(usage?)` — vypočíta konečné metriky: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Ceny zo statickej tabuľky v `src/lib/playground/types.ts` (označené ako „odhadované“ — D13).

---

## Backendové trasy

| Metóda   | Cesta                            | Obslužná funkcia                                                                            |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Overí `ImprovePromptRequestSchema` pomocou Zod; zavolá `/v1/chat/completions` s meta-výzvou |
| `GET`    | `/api/playground/presets`        | Vráti `{ presets: PlaygroundPresetListItem[] }`                                             |
| `POST`   | `/api/playground/presets`        | Vytvorí predvoľbu; overí `PlaygroundPresetCreateSchema`                                     |
| `GET`    | `/api/playground/presets/:id`    | Vráti jednu predvoľbu alebo 404                                                             |
| `PUT`    | `/api/playground/presets/:id`    | Čiastočná aktualizácia                                                                      |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                         |

Autentifikácia: voliteľná (`REQUIRE_API_KEY`). Chyby prostredníctvom `buildErrorBody()` (pevné pravidlo č. 12).

---

## Kľúčové súbory

| Cesta                                                                      | Účel                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Komponent shellu, koordinátor kariet                |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Karty + počítadlo + tlačidlo exportu                |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Zdieľaný konfiguračný panel                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Pracovné prostredie chatu                           |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Porovnanie viacerých modelov                        |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Editor Monaco (zachovaný)                           |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Nástroje + štruktúrovaný výstup                     |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modálne okno exportu kódu                           |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Jeden stĺpec porovnania                             |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Zobrazenie TTFT/TPS                                 |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Klientsky hook metrík                               |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Hook CRUD pre predvoľby                             |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Hook na vylepšenie promptu                          |
| `src/lib/playground/codeExport.ts`                                         | Generátor curl/Python/TS (zdieľaný so Search Tools) |
| `src/lib/playground/promptImprover.ts`                                     | Zostavovač metapromptov                             |
| `src/lib/playground/streamMetrics.ts`                                      | Čistý výpočet metrík                                |
| `src/lib/db/playgroundPresets.ts`                                          | Modul databázy (CRUD)                               |
| `src/app/api/playground/improve-prompt/route.ts`                           | Trasa REST na vylepšenie promptu                    |
| `src/app/api/playground/presets/route.ts`                                  | Zoznam a vytváranie predvolieb                      |
| `src/app/api/playground/presets/[id]/route.ts`                             | Získanie/aktualizácia/odstránenie predvolieb        |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migrácia databázy                                   |

---

## Riešenie problémov

| Príznak                                     | Príčina                               | Riešenie                                                                                           |
| ------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Editor Monaco sa na karte API nevykresľuje  | SSR načítalo Monaco                   | Overte, či `ApiTab` používa `dynamic(..., { ssr: false })`                                         |
| Porovnávacie streamy sa spúšťajú sekvenčne  | Nesprávne použitie `Promise.all`      | Všetky spustenia streamov sa musia vykonať v jednom volaní `Promise.all`                           |
| Metriky zobrazujú pre TTFT hodnotu `null`   | Obsluha prvého bloku nie je pripojená | Skontrolujte, či sa `useStreamMetrics.onFirstChunk()` volá v slučke čítačky SSE                    |
| Predvoľba sa neukladá                       | Migrácia DB nebola spustená           | Spustite `npm run db:migrate` alebo reštartujte server (migrácia sa automaticky spustí pri štarte) |
| Vylepšenie promptu vracia 502               | Model nie je nastavený v konfigurácii | Pred vylepšením musí používateľ zadať názov modelu na paneli konfigurácie                          |
| Exportovaný kód zobrazuje `MISSING_API_KEY` | Zástupný text nebol vložený           | `codeExport.ts` vždy používa `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                          |

---

## Referencie

- Hlavný plán: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plán funkcie: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Export kódu: `src/lib/playground/codeExport.ts`
- Nástroj na vylepšovanie promptov: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
