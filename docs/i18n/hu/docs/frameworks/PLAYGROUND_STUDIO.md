# Playground Studio (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funkció:** Playground Studio — egységes AI-tesztelési munkaterület a `/dashboard/playground` számára.
> **Tervek:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Állapot:** Megjelent a v3.8.6 verzióban

---

## Áttekintés

A Playground Studio a `/dashboard/playground` egyszerű, Monaco-alapú szerkesztőjét
teljes körű tesztelési munkaterületté alakítja. A korábbi `page.tsx` helyére egy `PlaygroundStudio`
keretrendszer kerül, amely négy lapot és egy közös konfigurációs panelt jelenít meg.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Csevegés] [⚖ Összehasonlítás] [{} API] [🔧 Építés] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {aktív lap tartalma}                    │ ─ Konfiguráció            │
│                                          │ Végpont   [chat ∨]        │
│                                          │ Modell    [gpt-5.4 ∨]     │
│                                          │ Rendszer  [szövegmező]    │
│                                          │ Hőmérs.   ▕▕▔▔ 0.7        │
│                                          │ Készletek [▾ betöltés][mentés]│
│                                          │ [✨ Prompt javítása]       │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Lapok

### Csevegés lap

A `ChatPlayground.tsx` komponenst többfordulós, streamelést támogató munkafelületté fejleszti:

- Teljes Markdown-megjelenítés a `MarkdownMessage.tsx` használatával (kódblokkok, táblázatok, listák, hivatkozások).
- A rendszerprompt a közös Konfiguráció panelről származik.
- Token- és költségadatok üzenetenként (prompt- és válaszgenerálási tokenek).
- Az utolsó válasz újbóli generálása.
- A kéréseket a `POST /v1/chat/completions` végpontra küldi SSE-streameléssel.

### Összehasonlítás lap

A proxy legfontosabb megkülönböztető funkciója: egy prompt futtatása akár **4 modellen párhuzamosan**.

- Legfeljebb 4 oszlop, amelyek mindegyike egymástól függetlenül streamel a `/v1/chat/completions` végpontról.
- `+ Modell hozzáadása` gomb (Cmd+K gyorsbillentyű) oszlopok hozzáadásához.
- Az `Összes futtatása ▶` a `Promise.all` és oszloponként egy-egy `AbortController` használatával egyidejűleg indítja el az összes streamet.
- A globális **Összes megszakítása** minden folyamatban lévő streamet megszakít.
- Az oszloponkénti `ProviderMetrics` valós időben jeleníti meg a TTFT-, TPS-, token- és becsült költségadatokat.
- A metrikák **„kliensoldali becslés”** (D12) címkét kapnak — a mérés az első SSE-adatcsomagtól indul.

### API lap

A haladó felhasználók számára az eredeti Monaco-szerkesztő funkcióinak 100%-át megőrzi (D14):

- 10 végpont: csevegési válaszgenerálás, válaszgenerálás, beágyazások, képek, hang, beszéd, átiratok, moderáció, újrarangsorolás és keresés.
- Multimodális fájlfeltöltés.
- SSE-streamelés valós idejű kimenettel.
- `ApiTab.tsx` komponensként becsomagolva (késleltetetten betöltve, `ssr: false`).

### Építés lap

Eszköz-/függvényhívási és strukturált kimeneti felület:

- `ToolsBuilder.tsx` — a `tools[]` elemeinek hozzáadása, szerkesztése és eltávolítása, eszközönkénti JSON-sémaszerkesztővel.
  A paramétereket a `ToolDefinitionSchema` (Zod) segítségével ellenőrzi.
- `StructuredOutputEditor.tsx` — a JSON-mód be- és kikapcsolása, valamint JSON-sémaszerkesztő.
  A választ a `StructuredOutputSchema` (Zod) segítségével ellenőrzi a séma alapján.
- A kérést a `/v1/chat/completions` végpontra küldi `tools[]` és/vagy `response_format` használatával.

---

## Konfigurációs panel (megosztott)

`StudioConfigPane.tsx` — mindig látható, összecsukható.

| Mező            | Komponens             | Megjegyzések                                                                                       |
| --------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| Végpont         | `<select>`            | 10, a `PlaygroundEndpoint` értékeinek megfelelő lehetőség                                          |
| Modell          | `<input>`             | szabad szöveges mező, pl. `openai/gpt-4o`                                                          |
| Rendszerprompt  | `<textarea>`          | minden lap megkapja                                                                                |
| Paraméterek     | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop                             |
| Előbeállítások  | `PresetPicker`        | elnevezett konfigurációs pillanatképek betöltése/mentése (adatbázisban tárolva)                    |
| Prompt javítása | `ImprovePromptButton` | kvótafigyelmeztető modális ablakot nyit meg, meghívja a `/api/playground/improve-prompt` végpontot |

Az állapot a `PlaygroundStudio.tsx` komponensbe van kiemelve, és minden lap megkapja. A lapok közötti váltás
megőrzi a konfiguráció állapotát.

---

## Felső sáv

`StudioTopBar.tsx`:

- Lapváltó (role="tablist").
- `TokenCostCounter` — élő token- (↑/↓) és becsültköltség-kijelzés.
- Kódexportáló gomb (`</>`) — megnyitja az `ExportCodeModal` modális ablakot.

---

## Kódexportáló modális ablak

Az `ExportCodeModal.tsx` a `codeExport.ts` használatával curl- / Python- / TypeScript-kódrészleteket generál
az aktuális `PlaygroundState` alapján. Az API-kulcs helyőrzője mindig `$OMNIROUTE_API_KEY` (D11).

---

## Promptjavító

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. A modális ablak figyelmeztet, hogy „kvótát fog felhasználni”.
2. Megerősítéskor elküldi a `{ system, prompt, model, tone }` objektumot az útvonalnak.
3. Az útvonal belsőleg meghívja a `/v1/chat/completions` végpontot a `promptImprover.META_SYSTEM_PROMPT` használatával.
4. A visszatérési érték: `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. A felhasználói felület frissíti a Konfigurációs panel rendszerpromptját és a Csevegés lap felhasználói promptját.

---

## Előbeállítások

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- A `playground_presets` SQLite-táblában tárolva (`084_playground_presets.sql` migráció).
- Minden előbeállítás a következőket tárolja: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` lista, `POST` létrehozás, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Adatfolyam-mérőszámok

`useStreamMetrics.ts` + `streamMetrics.ts` (tiszta függvény):

- `start()` — rögzíti a kérés kezdési idejét.
- `onFirstChunk()` — rögzíti a TTFT értékét.
- `onChunk(n)` — összesíti a kimeneti tokenek számát.
- `finish(usage?)` — kiszámítja a végleges mérőszámokat: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Az árképzés a `src/lib/playground/types.ts` statikus táblájából származik („becsült” címkével — D13).

---

## Backendútvonalak

| Metódus  | Útvonal                          | Kezelő                                                                                                                       |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Zod használatával ellenőrzi az `ImprovePromptRequestSchema` sémát; metaprompttal meghívja a `/v1/chat/completions` végpontot |
| `GET`    | `/api/playground/presets`        | Visszaadja a `{ presets: PlaygroundPresetListItem[] }` objektumot                                                            |
| `POST`   | `/api/playground/presets`        | Létrehozza az előbeállítást; ellenőrzi a `PlaygroundPresetCreateSchema` sémát                                                |
| `GET`    | `/api/playground/presets/:id`    | Visszaad egy előbeállítást, vagy 404-es választ küld                                                                         |
| `PUT`    | `/api/playground/presets/:id`    | Részleges frissítés                                                                                                          |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                                          |

Hitelesítés: opcionális (`REQUIRE_API_KEY`). A hibák kezelése a `buildErrorBody()` használatával történik (12. szigorú szabály).

---

## Főbb fájlok

| Elérési út                                                                 | Rendeltetés                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Keretkomponens, lapok vezérlése                         |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Lapok + számláló + exportálás gomb                      |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Megosztott konfigurációs panel                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Csevegési munkaterület                                  |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Több modell összehasonlítása                            |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-szerkesztő (megőrizve)                           |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Eszközök + strukturált kimenet                          |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Kódexportálási modális ablak                            |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Egyetlen összehasonlítási oszlop                        |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT/TPS megjelenítése                                  |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Kliensoldali metrikahook                                |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Előbeállítások CRUD-hookja                              |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Promptjavító hook                                       |
| `src/lib/playground/codeExport.ts`                                         | curl/Python/TS-generátor (megosztva a Search Toolsszal) |
| `src/lib/playground/promptImprover.ts`                                     | Metaprompt-összeállító                                  |
| `src/lib/playground/streamMetrics.ts`                                      | Tiszta metrikaszámítás                                  |
| `src/lib/db/playgroundPresets.ts`                                          | Adatbázismodul (CRUD)                                   |
| `src/app/api/playground/improve-prompt/route.ts`                           | Promptjavító REST-útvonal                               |
| `src/app/api/playground/presets/route.ts`                                  | Előbeállítások listázása + létrehozása                  |
| `src/app/api/playground/presets/[id]/route.ts`                             | Előbeállítások lekérése/frissítése/törlése              |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Adatbázis-migráció                                      |

---

## Hibaelhárítás

| Tünet                                                | Ok                                       | Megoldás                                                                                                             |
| ---------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| A Monaco szerkesztő nem jelenik meg az API lapon     | Az SSR betöltötte a Monacót              | Ellenőrizze, hogy az `ApiTab` a `dynamic(..., { ssr: false })` beállítást használja                                  |
| Az összehasonlítási streamek egymás után indulnak el | A `Promise.all` helytelen használata     | Minden streamindítást egyetlen `Promise.all` hívásban kell elindítani                                                |
| A metrikák `null` TTFT-értéket mutatnak              | Az első adatrész kezelője nincs bekötve  | Ellenőrizze, hogy a rendszer meghívja-e a `useStreamMetrics.onFirstChunk()` függvényt az SSE-olvasó ciklusban        |
| Az előbeállítás nem marad meg                        | Az adatbázis-migráció nem futott le      | Futtassa az `npm run db:migrate` parancsot, vagy indítsa újra a szervert (a migráció indításkor automatikusan lefut) |
| A prompt javítása 502-es hibát ad                    | Nincs modell beállítva a konfigurációban | A javítás előtt a felhasználónak meg kell adnia egy modellnevet a konfigurációs panelen                              |
| Az exportált kód `MISSING_API_KEY` értéket mutat     | A helyőrző nincs beillesztve             | A `codeExport.ts` mindig az `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"` értéket használja                           |

---

## Hivatkozások

- Főterv: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funkcióterv: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Kódexportálás: `src/lib/playground/codeExport.ts`
- Promptjavító: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
