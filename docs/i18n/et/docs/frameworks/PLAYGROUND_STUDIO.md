# Playground Studio (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funktsioon:** Playground Studio — ühtne tehisintellekti testimise tööruum lehele `/dashboard/playground`.
> **Plaanid:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Olek:** välja antud versioonis v3.8.6

---

## Ülevaade

Playground Studio muudab `/dashboard/playground` lihtsast Monaco-põhisest redaktorist
täisfunktsionaalseks testimise tööruumiks. See asendab varasema `page.tsx`-i `PlaygroundStudio`
kestaga, mis kuvab neli vahekaarti ja ühist konfiguratsioonipaani.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Vestlus] [⚖ Võrdlus] [{} API] [🔧 Koostamine] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {aktiivse vahekaardi sisu}              │ ─ Konfiguratsioon         │
│                                          │ Lõpp-punkt [vestlus ∨]    │
│                                          │ Mudel      [gpt-5.4 ∨]    │
│                                          │ Süsteem    [tekstiala]     │
│                                          │ Temp       ▕▕▔▔ 0.7        │
│                                          │ Eelseaded [▾ laadi][salvesta]│
│                                          │ [✨ Täiusta viipa]         │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Vahekaardid

### Vestluse vahekaart

Täiendab `ChatPlayground.tsx`-i mitme vooruga voogedastuse töölauaks:

- Täielik Markdowni renderdamine `MarkdownMessage.tsx`-i kaudu (koodiplokid, tabelid, loendid, lingid).
- Süsteemiviip pärineb ühisest konfiguratsioonipaanist.
- Sõnumipõhine tokenite arv ja kulu (viiba- ja vastusetokenid).
- Viimase vastuse uuesti genereerimine.
- Saadab päringud aadressile `POST /v1/chat/completions`, kasutades SSE-voogedastust.

### Võrdluse vahekaart

Puhverserveri peamine eristav funktsioon: ühe viiba käitamine paralleelselt kuni **4 mudeliga**.

- Kuni 4 veergu, millest igaüks voogedastab sõltumatult aadressilt `/v1/chat/completions`.
- Nupp `+ Lisa mudel` (kiirklahv Cmd+K) veergude lisamiseks.
- `Käivita kõik ▶` käivitab kõik vood korraga, kasutades `Promise.all`-i ja iga veeru jaoks eraldi `AbortController`-it.
- Üldine nupp **Tühista kõik** katkestab kõik pooleliolevad vood.
- Iga veeru `ProviderMetrics` kuvab reaalajas TTFT-d, TPS-i, tokenite arvu ja hinnangulist kulu.
- Mõõdikud on tähistatud kui **„kliendipoolne hinnang“** (D12) — mõõtmine algab esimesest SSE-andmeosast.

### API vahekaart

Säilitab 100% algsest Monaco redaktorist kogenud kasutajatele (D14):

- 10 lõpp-punkti: vestluse lõpetamised, lõpetamised, vektoresitused, pildid, heli, kõne, transkriptsioonid, modereerimine, ümberjärjestamine, otsing.
- Multimodaalne failide üleslaadimine.
- SSE-voogedastus reaalajas väljundiga.
- Pakendatud komponendina `ApiTab.tsx` (laaditakse laisalt, `ssr: false`).

### Koostamise vahekaart

Tööriistade/funktsioonide väljakutsumise ja struktureeritud väljundi kasutajaliides:

- `ToolsBuilder.tsx` — `tools[]`-i elementide lisamine, muutmine ja eemaldamine iga tööriista JSON-skeemi redaktoriga.
  Valideerib parameetreid `ToolDefinitionSchema` (Zod) abil.
- `StructuredOutputEditor.tsx` — JSON-režiimi lüliti ja JSON-skeemi redaktor.
  Valideerib vastust skeemi suhtes `StructuredOutputSchema` (Zod) abil.
- Saadab päringu aadressile `/v1/chat/completions` koos `tools[]`-i ja/või `response_format`-iga.

## Konfiguratsioonipaan (jagatud)

`StudioConfigPane.tsx` — alati nähtav, ahendatav.

| Väli              | Komponent             | Märkused                                                               |
| ----------------- | --------------------- | ---------------------------------------------------------------------- |
| Lõpp-punkt        | `<select>`            | 10 valikut, mis vastavad tüübile `PlaygroundEndpoint`                  |
| Mudel             | `<input>`             | vabatekst, nt `openai/gpt-4o`                                          |
| Süsteemiviip      | `<textarea>`          | edastatakse kõigile vahekaartidele                                     |
| Parameetrid       | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop |
| Eelseadistused    | `PresetPicker`        | nimega konfiguratsioonitõmmiste laadimine/salvestamine (püsivad DB-s)  |
| Viibu täiustamine | `ImprovePromptButton` | avab kvoodihoiatuse modaali, kutsub `/api/playground/improve-prompt`   |

Olek tõstetakse komponenti `PlaygroundStudio.tsx` ja edastatakse kõigile vahekaartidele. Vahekaartide vahetamine
säilitab konfiguratsiooni oleku.

---

## Ülariba

`StudioTopBar.tsx`:

- Vahekaartide vahetaja (role="tablist").
- `TokenCostCounter` — reaalajas sisend- ja väljundžetoonide (↑/↓) ning hinnangulise kulu kuva.
- Koodi eksportimise nupp (`</>`) — avab komponendi `ExportCodeModal`.

---

## Koodi eksportimise modaal

`ExportCodeModal.tsx` kasutab faili `codeExport.ts`, et genereerida praegusest `PlaygroundState`-ist curl-i / Pythoni / TypeScripti koodilõike.
API-võtme kohatäide on alati `$OMNIROUTE_API_KEY` (D11).

---

## Viibu täiustaja

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modaal hoiatab: „see kasutab kvooti”.
2. Kinnitamisel saadab marsruudile `{ system, prompt, model, tone }`.
3. Marsruut kutsub sisemiselt `/v1/chat/completions`, kasutades `promptImprover.META_SYSTEM_PROMPT`-i.
4. Tagastab `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Kasutajaliides uuendab konfiguratsioonipaani süsteemiviipa ja vestluse vahekaardi kasutajaviipa.

---

## Eelseadistused

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Talletatakse SQLite'i tabelis `playground_presets` (migratsioon `084_playground_presets.sql`).
- Iga eelseadistus talletab järgmised väljad: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: loendi hankimiseks `GET`, loomiseks `POST`, üksiku kirje hankimiseks `GET /:id`, uuendamiseks `PUT /:id`, kustutamiseks `DELETE /:id`.

---

## Voo mõõdikud

`useStreamMetrics.ts` + `streamMetrics.ts` (puhas funktsioon):

- `start()` — salvestab päringu algusaja.
- `onFirstChunk()` — salvestab TTFT.
- `onChunk(n)` — liidab väljundžetoonide arvu.
- `finish(usage?)` — arvutab lõplikud mõõdikud: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Hinnastamine põhineb faili `src/lib/playground/types.ts` staatilisel tabelil (märgendiga „hinnanguline” — D13).

---

## Tagasüsteemi marsruudid

| Meetod   | Tee                              | Töötleja                                                                                         |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `POST`   | `/api/playground/improve-prompt` | Valideerib Zodiga skeemi `ImprovePromptRequestSchema`; kutsub metaviibaga `/v1/chat/completions` |
| `GET`    | `/api/playground/presets`        | Tagastab `{ presets: PlaygroundPresetListItem[] }`                                               |
| `POST`   | `/api/playground/presets`        | Loob eelseadistuse; valideerib skeemi `PlaygroundPresetCreateSchema`                             |
| `GET`    | `/api/playground/presets/:id`    | Tagastab ühe eelseadistuse või 404                                                               |
| `PUT`    | `/api/playground/presets/:id`    | Osaline uuendamine                                                                               |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                              |

Autentimine: valikuline (`REQUIRE_API_KEY`). Vead tagastatakse funktsiooni `buildErrorBody()` kaudu (range reegel nr 12).

---

## Põhifailid

| Tee                                                                        | Otstarve                                             |
| -------------------------------------------------------------------------- | ---------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Kestkomponent, vahekaartide orkestreerija            |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Vahekaardid + loendur + ekspordinupp                 |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Ühine konfiguratsioonipaneel                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Vestluse töölaud                                     |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Mitme mudeli võrdlus                                 |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco redaktor (säilitatud)                         |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Tööriistad + struktureeritud väljund                 |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Koodi eksportimise modaalaken                        |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Üks võrdlusveerg                                     |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT/TPS-i kuva                                      |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Kliendipoolne mõõdikute hook                         |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Eelseadistuste CRUD-hook                             |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Viiba täiustamise hook                               |
| `src/lib/playground/codeExport.ts`                                         | curl/Pythoni/TS-i generaator (ühine Search Toolsiga) |
| `src/lib/playground/promptImprover.ts`                                     | Metaviiba koostaja                                   |
| `src/lib/playground/streamMetrics.ts`                                      | Puhas mõõdikute arvutus                              |
| `src/lib/db/playgroundPresets.ts`                                          | Andmebaasimoodul (CRUD)                              |
| `src/app/api/playground/improve-prompt/route.ts`                           | Viiba täiustamise REST-marsruut                      |
| `src/app/api/playground/presets/route.ts`                                  | Eelseadistuste loend + loomine                       |
| `src/app/api/playground/presets/[id]/route.ts`                             | Eelseadistuste hankimine/uuendamine/kustutamine      |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Andmebaasimigratsioon                                |

---

## Tõrkeotsing

| Sümptom                                        | Põhjus                                   | Lahendus                                                                                                 |
| ---------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Monaco redaktorit ei kuvata API vahekaardil    | SSR laadis Monaco                        | Veenduge, et `ApiTab` kasutaks konstruktsiooni `dynamic(..., { ssr: false })`                            |
| Võrdlusvood käivituvad järjestikku             | `Promise.all` vale kasutus               | Kõik vood tuleb käivitada ühe `Promise.all`-i väljakutsega                                               |
| Mõõdikud näitavad TTFT väärtuseks `null`       | Esimese andmeosa töötleja pole ühendatud | Kontrollige, et SSE-lugeri tsüklis kutsutaks välja `useStreamMetrics.onFirstChunk()`                     |
| Eelseadistus ei säili                          | Andmebaasi migratsiooni pole käivitatud  | Käivitage `npm run db:migrate` või taaskäivitage server (migratsioon käivitub käivitamisel automaatselt) |
| Viiba täiustamine tagastab 502                 | Mudel pole seadistuses määratud          | Kasutaja peab enne täiustamist sisestama seadistuspaanil mudeli nime                                     |
| Eksporditud koodis kuvatakse `MISSING_API_KEY` | Kohatäitjat pole lisatud                 | `codeExport.ts` kasutab alati väärtust `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                      |

---

## Viited

- Üldplaan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funktsionaalsuse plaan: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Koodi eksport: `src/lib/playground/codeExport.ts`
- Viiba täiustaja: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
