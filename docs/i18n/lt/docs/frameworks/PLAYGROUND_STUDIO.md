# Playground Studio (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funkcija:** „Playground Studio“ — vieninga DI testavimo darbo aplinka, skirta `/dashboard/playground`.
> **Planai:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Būsena:** išleista v3.8.6 versijoje

---

## Apžvalga

„Playground Studio“ paverčia `/dashboard/playground` iš paprasto „Monaco“ pagrindu veikiančio redaktoriaus
visaverte testavimo darbo aplinka. Ji pakeičia ankstesnį `page.tsx` komponentu `PlaygroundStudio`,
kuris pateikia keturis skirtukus ir bendrinamą konfigūracijos sritį.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Pokalbis] [⚖ Palyginimas] [{} API] [🔧 Kūrimas] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {aktyvaus skirtuko turinys}             │ ─ Konfigūracija           │
│                                          │ Galinis taškas [chat ∨]   │
│                                          │ Modelis       [gpt-5.4 ∨] │
│                                          │ Sistema       [teksto sritis]│
│                                          │ Temp.         ▕▕▔▔ 0.7    │
│                                          │ Paruoštukai [▾ įkelti][išsaugoti]│
│                                          │ [✨ Patobulinti užklausą]  │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Skirtukai

### Pokalbio skirtukas

Išplečia `ChatPlayground.tsx` į kelių etapų srautinio perdavimo darbo aplinką:

- Visavertis „Markdown“ atvaizdavimas per `MarkdownMessage.tsx` (kodo blokai, lentelės, sąrašai, nuorodos).
- Sistemos užklausa gaunama iš bendrinamos konfigūracijos srities.
- Kiekvieno pranešimo žetonų skaičius ir kaina (užklausos bei užbaigimo žetonai).
- Galimybė iš naujo sugeneruoti paskutinį atsakymą.
- Siunčia į `POST /v1/chat/completions`, naudodamas SSE srautinį perdavimą.

### Palyginimo skirtukas

Pagrindinis tarpinio serverio išskirtinumas: paleisti 1 užklausą iki **4 modelių lygiagrečiai**.

- Iki 4 stulpelių, kurių kiekvienas nepriklausomai gauna srautą iš `/v1/chat/completions`.
- Mygtukas `+ Pridėti modelį` (Cmd+K spartusis klavišas) stulpeliams pridėti.
- `Paleisti visus ▶` vienu metu paleidžia visus srautus per `Promise.all` ir kiekvienam stulpeliui skirtą `AbortController`.
- Bendrasis veiksmas **Atšaukti visus** nutraukia kiekvieną šiuo metu vykdomą srautą.
- Kiekvieno stulpelio `ProviderMetrics` realiuoju laiku rodo TTFT, TPS, žetonus ir numatomą kainą.
- Metrika pažymėta kaip **„kliento pusės įvertis“** (D12) — matuojama nuo pirmojo SSE fragmento.

### API skirtukas

Patyrusiems naudotojams išsaugo 100 % pradinio „Monaco“ redaktoriaus funkcionalumo (D14):

- 10 galinių taškų: pokalbių užbaigimai, užbaigimai, vektoriniai atvaizdai, vaizdai, garsas, kalba, transkripcijos, moderavimas, perrikiavimas, paieška.
- Daugiarūšių failų įkėlimas.
- SSE srautinis perdavimas su išvestimi realiuoju laiku.
- Įtrauktas kaip `ApiTab.tsx` (įkeliamas atidėtai, `ssr: false`).

### Kūrimo skirtukas

Įrankių / funkcijų iškvietimo ir struktūrizuotos išvesties naudotojo sąsaja:

- `ToolsBuilder.tsx` — leidžia pridėti, redaguoti ir pašalinti `tools[]`, kiekvienam įrankiui pateikiant JSON schemos redaktorių.
  Parametrai tikrinami naudojant `ToolDefinitionSchema` („Zod“).
- `StructuredOutputEditor.tsx` — JSON režimo jungiklis ir JSON schemos redaktorius.
  Atsakymas tikrinamas pagal schemą naudojant `StructuredOutputSchema` („Zod“).
- Siunčia užklausą į `/v1/chat/completions` su `tools[]` ir (arba) `response_format`.

## Konfigūracijos skydelis (bendras)

`StudioConfigPane.tsx` — visada matomas, suskleidžiamas.

| Laukas                | Komponentas           | Pastabos                                                                           |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| Galinis taškas        | `<select>`            | 10 parinkčių, atitinkančių `PlaygroundEndpoint`                                    |
| Modelis               | `<input>`             | laisvas tekstas, pvz., `openai/gpt-4o`                                             |
| Sistemos užklausa     | `<textarea>`          | perduodama visoms kortelėms                                                        |
| Parametrai            | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop             |
| Išankstinės nuostatos | `PresetPicker`        | įkelia / išsaugo pavadintas konfigūracijos momentines kopijas (saugomas DB)        |
| Patobulinti užklausą  | `ImprovePromptButton` | atveria kvotos įspėjimo modalinį langą, iškviečia `/api/playground/improve-prompt` |

Būsena perkeliama į `PlaygroundStudio.tsx` ir perduodama visoms kortelėms. Perjungiant korteles
konfigūracijos būsena išsaugoma.

---

## Viršutinė juosta

`StudioTopBar.tsx`:

- Kortelių perjungiklis (role="tablist").
- `TokenCostCounter` — realiuoju laiku rodomas žetonų skaičius (↑/↓) ir apskaičiuota kaina.
- Kodo eksportavimo mygtukas (`</>`) — atveria `ExportCodeModal`.

---

## Kodo eksportavimo modalinis langas

`ExportCodeModal.tsx` naudoja `codeExport.ts`, kad pagal dabartinę `PlaygroundState` sugeneruotų curl / Python / TypeScript fragmentus.
API rakto vietos rezervavimo reikšmė visada yra `$OMNIROUTE_API_KEY` (D11).

---

## Užklausos tobulinimo priemonė

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modalinis langas įspėja, kad „bus naudojama kvota“.
2. Patvirtinus maršrutui siunčiama `{ system, prompt, model, tone }`.
3. Maršrutas viduje iškviečia `/v1/chat/completions` su `promptImprover.META_SYSTEM_PROMPT`.
4. Grąžinama `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Naudotojo sąsaja atnaujina konfigūracijos skydelio sistemos užklausą ir pokalbio kortelės naudotojo užklausą.

---

## Išankstinės nuostatos

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Saugomos SQLite lentelėje `playground_presets` (migracija `084_playground_presets.sql`).
- Kiekvienoje išankstinėje nuostatoje saugoma: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` sąrašas, `POST` kūrimas, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Srauto metrikos

`useStreamMetrics.ts` + `streamMetrics.ts` (grynoji funkcija):

- `start()` — įrašo užklausos pradžios laiką.
- `onFirstChunk()` — įrašo TTFT.
- `onChunk(n)` — kaupia užbaigimo žetonų skaičių.
- `finish(usage?)` — apskaičiuoja galutines metrikas: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Kainodara pateikiama statinėje lentelėje `src/lib/playground/types.ts` (pažymėta kaip „apskaičiuota“ — D13).

---

## Vidinės sistemos maršrutai

| Metodas  | Kelias                           | Apdorojimo funkcija                                                                                             |
| -------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Atlieka `ImprovePromptRequestSchema` validavimą naudojant Zod; iškviečia `/v1/chat/completions` su metaužklausa |
| `GET`    | `/api/playground/presets`        | Grąžina `{ presets: PlaygroundPresetListItem[] }`                                                               |
| `POST`   | `/api/playground/presets`        | Sukuria išankstinę nuostatą; validuoja `PlaygroundPresetCreateSchema`                                           |
| `GET`    | `/api/playground/presets/:id`    | Grąžina vieną išankstinę nuostatą arba 404                                                                      |
| `PUT`    | `/api/playground/presets/:id`    | Dalinis atnaujinimas                                                                                            |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                             |

Autentifikavimas: pasirenkamas (`REQUIRE_API_KEY`). Klaidos pateikiamos naudojant `buildErrorBody()` (griežtoji taisyklė Nr. 12).

---

## Pagrindiniai failai

| Kelias                                                                     | Paskirtis                                                       |
| -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Apvalkalo komponentas, skirtukų koordinatorius                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Skirtukai + skaitiklis + eksportavimo mygtukas                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Bendrinamas konfigūracijos skydelis                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Pokalbių darbo aplinka                                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Kelių modelių palyginimas                                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | „Monaco“ redaktorius (išsaugotas)                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Įrankiai + struktūrizuota išvestis                              |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Kodo eksportavimo modalinis langas                              |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Atskiras palyginimo stulpelis                                   |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT/TPS rodymas                                                |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Kliento pusės metrikų „hook“                                    |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Išankstinių nuostatų CRUD „hook“                                |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Užklausos tobulinimo „hook“                                     |
| `src/lib/playground/codeExport.ts`                                         | curl/Python/TS generatorius (bendrinamas su paieškos įrankiais) |
| `src/lib/playground/promptImprover.ts`                                     | Meta-užklausos kūrimo priemonė                                  |
| `src/lib/playground/streamMetrics.ts`                                      | Grynieji metrikų skaičiavimai                                   |
| `src/lib/db/playgroundPresets.ts`                                          | DB modulis (CRUD)                                               |
| `src/app/api/playground/improve-prompt/route.ts`                           | Užklausos tobulinimo REST maršrutas                             |
| `src/app/api/playground/presets/route.ts`                                  | Išankstinių nuostatų sąrašas + kūrimas                          |
| `src/app/api/playground/presets/[id]/route.ts`                             | Išankstinių nuostatų gavimas / atnaujinimas / šalinimas         |
| `src/lib/db/migrations/084_playground_presets.sql`                         | DB migracija                                                    |

---

## Trikčių šalinimas

| Požymis                                            | Priežastis                                        | Sprendimas                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| „Monaco“ redaktorius neatvaizduojamas API skirtuke | SSR įkėlė „Monaco“                                | Patikrinkite, ar `ApiTab` naudoja `dynamic(..., { ssr: false })`                                                 |
| Palyginimo srautai paleidžiami nuosekliai          | Netinkamai naudojamas `Promise.all`               | Visi srautai turi būti paleisti vienu `Promise.all` iškvietimu                                                   |
| Metrikose rodoma `null` TTFT                       | Neprijungta pirmojo fragmento apdorojimo priemonė | Patikrinkite, ar SSE skaitytuvo cikle iškviečiama `useStreamMetrics.onFirstChunk()`                              |
| Išankstinis nustatymas neišsaugomas                | Nevykdyta DB migracija                            | Paleiskite `npm run db:migrate` arba iš naujo paleiskite serverį (migracija automatiškai vykdoma paleidimo metu) |
| Užklausos patobulinimas grąžina 502                | Konfigūracijoje nenustatytas modelis              | Prieš tobulindamas naudotojas turi įvesti modelio pavadinimą konfigūracijos srityje                              |
| Eksportuotame kode rodoma `MISSING_API_KEY`        | Neįterptas vietos rezervavimo ženklas             | `codeExport.ts` visada naudoja `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                      |

---

## Nuorodos

- Pagrindinis planas: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Funkcijos planas: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Kodo eksportavimas: `src/lib/playground/codeExport.ts`
- Užklausų tobulinimo priemonė: `src/lib/playground/promptImprover.ts`
- „Search Tools Studio“: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
