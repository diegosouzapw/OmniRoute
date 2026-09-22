# Playground Studio (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Funkcionalnost:** Playground Studio — enoten delovni prostor za preizkušanje umetne inteligence na `/dashboard/playground`.
> **Načrti:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Stanje:** Izdano v v3.8.6

---

## Pregled

Playground Studio preoblikuje `/dashboard/playground` iz preprostega urejevalnika na osnovi Monaco v
celovit delovni prostor za preizkušanje. Podedovani `page.tsx` nadomesti z ogrodjem `PlaygroundStudio`,
ki prikazuje štiri zavihke in skupno podokno z nastavitvami.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Klepet] [⚖ Primerjava] [{} API] [🔧 Gradnja] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {vsebina aktivnega zavihka}             │ ─ Nastavitve              │
│                                          │ Končna točka [chat ∨]     │
│                                          │ Model        [gpt-5.4 ∨]  │
│                                          │ Sistem       [vnosno polje]│
│                                          │ Temp.        ▕▕▔▔ 0.7     │
│                                          │ Prednast. [▾ naloži][shrani]│
│                                          │ [✨ Izboljšaj poziv]       │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Zavihki

### Zavihek Klepet

Razširja `ChatPlayground.tsx` v večkrožno delovno okolje s pretočnim odzivanjem:

- Celovito upodabljanje Markdown prek `MarkdownMessage.tsx` (bloki kode, tabele, seznami, povezave).
- Sistemski poziv iz skupnega podokna Nastavitve.
- Število žetonov in strošek na sporočilo (žetoni poziva + dokončanja).
- Ponovno ustvarjanje zadnjega odgovora.
- Pošilja na `POST /v1/chat/completions` s pretakanjem SSE.

### Zavihek Primerjava

Ključna razlikovalna funkcionalnost za posredniški strežnik: izvedba 1 poziva na največ **4 modelih vzporedno**.

- Do 4 stolpci, pri čemer vsak neodvisno pretaka podatke iz `/v1/chat/completions`.
- Gumb `+ Dodaj model` (bližnjica Cmd+K) za dodajanje stolpcev.
- `Zaženi vse ▶` sproži vse tokove hkrati prek `Promise.all` in ločenega `AbortController` za vsak stolpec.
- Globalna možnost **Prekliči vse** prekine vse trenutno izvajane tokove.
- `ProviderMetrics` za vsak stolpec v realnem času prikazuje TTFT, TPS, žetone in ocenjeni strošek.
- Metrike so označene kot **»ocena na strani odjemalca«** (D12) — merjeno od prvega fragmenta SSE.

### Zavihek API

Ohranja 100 % prvotnega urejevalnika Monaco za napredne uporabnike (D14):

- 10 končnih točk: dokončanja klepeta, dokončanja, vdelave, slike, zvok, govor, prepisi, moderiranje, ponovno razvrščanje, iskanje.
- Nalaganje večpredstavnostnih datotek.
- Pretakanje SSE z izhodom v realnem času.
- Ovito kot `ApiTab.tsx` (nalaganje na zahtevo, `ssr: false`).

### Zavihek Gradnja

Uporabniški vmesnik za klicanje orodij/funkcij in strukturirani izhod:

- `ToolsBuilder.tsx` — dodajanje/urejanje/odstranjevanje `tools[]` z urejevalnikom sheme JSON za vsako orodje.
  Parametre preverja prek `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — preklop načina JSON in urejevalnik sheme JSON.
  Odziv preverja glede na shemo prek `StructuredOutputSchema` (Zod).
- Pošlje zahtevo na `/v1/chat/completions` z `tools[]` in/ali `response_format`.

---

## Podokno za konfiguracijo (skupno)

`StudioConfigPane.tsx` — vedno vidno, zložljivo.

| Polje           | Komponenta            | Opombe                                                                                     |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| Končna točka    | `<select>`            | 10 možnosti, ki ustrezajo `PlaygroundEndpoint`                                             |
| Model           | `<input>`             | poljubno besedilo, npr. `openai/gpt-4o`                                                    |
| Sistemski poziv | `<textarea>`          | posredovan vsem zavihkom                                                                   |
| Parametri       | `ParamSliders`        | temperature, max_tokens, top_p, kazen za prisotnost/pogostost, seed, stop                  |
| Prednastavitve  | `PresetPicker`        | nalaganje/shranjevanje poimenovanih posnetkov konfiguracije (shranjenih v zbirki podatkov) |
| Izboljšaj poziv | `ImprovePromptButton` | odpre modalno okno z opozorilom o kvoti, pokliče `/api/playground/improve-prompt`          |

Stanje je prestavljeno v `PlaygroundStudio.tsx` in posredovano vsem zavihkom. Preklapljanje med zavihki
ohrani stanje konfiguracije.

---

## Zgornja vrstica

`StudioTopBar.tsx`:

- Preklopnik zavihkov (role="tablist").
- `TokenCostCounter` — sproten prikaz žetonov (↑/↓) in ocenjenih stroškov.
- Gumb za izvoz kode (`</>`) — odpre `ExportCodeModal`.

---

## Modalno okno za izvoz kode

`ExportCodeModal.tsx` uporablja `codeExport.ts` za ustvarjanje izrezkov curl / Python / TypeScript
iz trenutnega stanja `PlaygroundState`. Nadomestni znak za ključ API je vedno `$OMNIROUTE_API_KEY` (D11).

---

## Izboljševalnik pozivov

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modalno okno opozori, da bo dejanje »porabilo kvoto«.
2. Ob potrditvi pošlje `{ system, prompt, model, tone }` poti.
3. Pot interno pokliče `/v1/chat/completions` z `promptImprover.META_SYSTEM_PROMPT`.
4. Vrne `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Uporabniški vmesnik posodobi sistemski poziv v podoknu za konfiguracijo in uporabniški poziv na zavihku za klepet.

---

## Prednastavitve

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Shranjene v tabeli SQLite `playground_presets` (migracija `084_playground_presets.sql`).
- Vsaka prednastavitev shrani: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: seznam z `GET`, ustvarjanje z `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metrike pretakanja

`useStreamMetrics.ts` + `streamMetrics.ts` (čista funkcija):

- `start()` — zabeleži čas začetka zahteve.
- `onFirstChunk()` — zabeleži TTFT.
- `onChunk(n)` — sešteva število žetonov dokončanja.
- `finish(usage?)` — izračuna končne metrike: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Cene iz statične tabele v `src/lib/playground/types.ts` (označene kot »ocenjene« — D13).

---

## Zaledne poti

| Metoda   | Pot                              | Obravnavalnik                                                                                           |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Preveri veljavnost z `ImprovePromptRequestSchema` iz Zod; pokliče `/v1/chat/completions` z meta pozivom |
| `GET`    | `/api/playground/presets`        | Vrne `{ presets: PlaygroundPresetListItem[] }`                                                          |
| `POST`   | `/api/playground/presets`        | Ustvari prednastavitev; preveri veljavnost z `PlaygroundPresetCreateSchema`                             |
| `GET`    | `/api/playground/presets/:id`    | Vrne eno prednastavitev ali 404                                                                         |
| `PUT`    | `/api/playground/presets/:id`    | Delna posodobitev                                                                                       |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                     |

Preverjanje pristnosti: izbirno (`REQUIRE_API_KEY`). Napake prek `buildErrorBody()` (strogo pravilo št. 12).

---

## Ključne datoteke

| Pot                                                                        | Namen                                                       |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Ogrodna komponenta, usklajevalnik zavihkov                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Zavihki + števec + gumb za izvoz                            |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Skupna konfiguracijska plošča                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Delovno okolje za klepet                                    |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Primerjava več modelov                                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Urejevalnik Monaco (ohranjen)                               |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Orodja + strukturiran izhod                                 |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modalno okno za izvoz kode                                  |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Posamezen stolpec za primerjavo                             |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Prikaz TTFT/TPS                                             |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Odjemalska kljuka za metrike                                |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Kljuka CRUD za prednastavitve                               |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Kljuka za izboljšanje poziva                                |
| `src/lib/playground/codeExport.ts`                                         | Generator curl/Python/TS (v skupni rabi z iskalnimi orodji) |
| `src/lib/playground/promptImprover.ts`                                     | Graditelj metapozivov                                       |
| `src/lib/playground/streamMetrics.ts`                                      | Izračun čistih metrik                                       |
| `src/lib/db/playgroundPresets.ts`                                          | Modul podatkovne zbirke (CRUD)                              |
| `src/app/api/playground/improve-prompt/route.ts`                           | Pot REST za izboljšanje poziva                              |
| `src/app/api/playground/presets/route.ts`                                  | Seznam in ustvarjanje prednastavitev                        |
| `src/app/api/playground/presets/[id]/route.ts`                             | Pridobivanje/posodabljanje/brisanje prednastavitev          |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migracija podatkovne zbirke                                 |

---

## Odpravljanje težav

| Simptom                                         | Vzrok                                 | Rešitev                                                                                             |
| ----------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Urejevalnik Monaco se ne prikaže na zavihku API | SSR je naložil Monaco                 | Preverite, ali `ApiTab` uporablja `dynamic(..., { ssr: false })`                                    |
| Primerjalni tokovi se izvajajo zaporedno        | Napačna uporaba `Promise.all`         | Vsi tokovi se morajo zagnati z enim klicem `Promise.all`                                            |
| Metrike za TTFT prikazujejo `null`              | Obdelovalnik prvega dela ni povezan   | Preverite, ali je `useStreamMetrics.onFirstChunk()` poklican v bralni zanki SSE                     |
| Prednastavitev se ne ohrani                     | Migracija zbirke podatkov ni izvedena | Zaženite `npm run db:migrate` ali znova zaženite strežnik (migracija se samodejno izvede ob zagonu) |
| Izboljšava poziva vrne 502                      | Model ni nastavljen v konfiguraciji   | Uporabnik mora pred izboljšavo vnesti ime modela v podokno za konfiguracijo                         |
| Izvožena koda prikazuje `MISSING_API_KEY`       | Nadomestni niz ni vstavljen           | `codeExport.ts` vedno uporablja `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                        |

---

## Reference

- Glavni načrt: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Načrt funkcionalnosti: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Izvoz kode: `src/lib/playground/codeExport.ts`
- Izboljševalnik pozivov: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
