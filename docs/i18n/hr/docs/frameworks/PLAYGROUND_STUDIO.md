# Playground Studio (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Značajka:** Playground Studio — objedinjeni radni prostor za testiranje umjetne inteligencije za `/dashboard/playground`.
> **Planovi:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Objavljeno u v3.8.6

---

## Pregled

Playground Studio pretvara `/dashboard/playground` iz jednostavnog uređivača temeljenog na Monacu u
potpuno opremljen radni prostor za testiranje. Zamjenjuje naslijeđeni `page.tsx` ljuskom `PlaygroundStudio`
koja prikazuje četiri kartice i zajedničko okno za konfiguraciju.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Razgovor] [⚖ Usporedba] [{} API] [🔧 Izrada] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {sadržaj aktivne kartice}               │ ─ Konfiguracija           │
│                                          │ Krajnja točka [chat ∨]    │
│                                          │ Model     [gpt-5.4 ∨]     │
│                                          │ Sustav    [tekstno polje] │
│                                          │ Temp.     ▕▕▔▔ 0.7        │
│                                          │ Predlošci [▾ učitaj][spremi]│
│                                          │ [✨ Poboljšaj upit]        │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Kartice

### Kartica Razgovor

Razvija `ChatPlayground.tsx` u radno okruženje za višekružne razgovore s prijenosom podataka:

- Potpuno prikazivanje Markdowna putem `MarkdownMessage.tsx` (blokovi koda, tablice, popisi, poveznice).
- Sistemski upit preuzima se iz zajedničkog okna Konfiguracija.
- Broj tokena/trošak po poruci (tokeni upita + tokeni dovršetka).
- Ponovno generiranje posljednjeg odgovora.
- Šalje na `POST /v1/chat/completions` uz SSE prijenos.

### Kartica Usporedba

Ključna razlikovna značajka za proxy: pokretanje jednog upita na najviše **4 modela paralelno**.

- Najviše 4 stupca, od kojih svaki neovisno prenosi podatke s `/v1/chat/completions`.
- Gumb `+ Dodaj model` (prečac Cmd+K) za dodavanje stupaca.
- `Pokreni sve ▶` istodobno pokreće sve prijenose putem `Promise.all` i zasebnog `AbortController` za svaki stupac.
- Globalna opcija **Otkaži sve** prekida svaki prijenos koji je u tijeku.
- `ProviderMetrics` za svaki stupac u stvarnom vremenu prikazuje TTFT, TPS, tokene i procijenjeni trošak.
- Metrika je označena kao **„procjena na strani klijenta”** (D12) — mjeri se od prvog SSE fragmenta.

### Kartica API

Zadržava 100 % izvornog uređivača Monaco za napredne korisnike (D14):

- 10 krajnjih točaka: dovršetci razgovora, dovršetci, ugradnje, slike, zvuk, govor, transkripcije, moderacije, ponovno rangiranje, pretraživanje.
- Prijenos multimodalnih datoteka.
- SSE prijenos s izlazom u stvarnom vremenu.
- Obuhvaćeno komponentom `ApiTab.tsx` (učitava se po potrebi, `ssr: false`).

### Kartica Izrada

Korisničko sučelje za pozivanje alata/funkcija i strukturirani izlaz:

- `ToolsBuilder.tsx` — dodavanje/uređivanje/uklanjanje `tools[]` uz uređivač JSON sheme za svaki alat.
  Provjerava valjanost parametara putem `ToolDefinitionSchema` (Zod).
- `StructuredOutputEditor.tsx` — uključivanje/isključivanje JSON načina rada + uređivač JSON sheme.
  Provjerava valjanost odgovora prema shemi putem `StructuredOutputSchema` (Zod).
- Šalje zahtjev na `/v1/chat/completions` s `tools[]` i/ili `response_format`.

## Konfiguracijska ploča (zajednička)

`StudioConfigPane.tsx` — uvijek vidljiva, može se sažeti.

| Polje              | Komponenta            | Napomene                                                                    |
| ------------------ | --------------------- | --------------------------------------------------------------------------- |
| Krajnja točka      | `<select>`            | 10 opcija koje odgovaraju tipu `PlaygroundEndpoint`                         |
| Model              | `<input>`             | proizvoljan tekst, npr. `openai/gpt-4o`                                     |
| Sistemski upit     | `<textarea>`          | prosljeđuje se svim karticama                                               |
| Parametri          | `ParamSliders`        | temperature, max_tokens, top_p, kazna za prisutnost/učestalost, seed, stop  |
| Unaprijed postavke | `PresetPicker`        | učitavanje/spremanje imenovanih snimki konfiguracije (pohranjeno u bazi)    |
| Poboljšaj upit     | `ImprovePromptButton` | otvara modal s upozorenjem o kvoti, poziva `/api/playground/improve-prompt` |

Stanje se podiže u `PlaygroundStudio.tsx` i prosljeđuje svim karticama. Prebacivanje između kartica
zadržava stanje konfiguracije.

---

## Gornja traka

`StudioTopBar.tsx`:

- Prebacivanje između kartica (role="tablist").
- `TokenCostCounter` — prikaz broja tokena uživo (↑/↓) i procijenjenog troška.
- Gumb za izvoz koda (`</>`) — otvara `ExportCodeModal`.

---

## Modal za izvoz koda

`ExportCodeModal.tsx` koristi `codeExport.ts` za generiranje curl / Python / TypeScript isječaka
iz trenutačnog objekta `PlaygroundState`. Rezervirano mjesto za API ključ uvijek je `$OMNIROUTE_API_KEY` (D11).

---

## Poboljšavanje upita

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modal upozorava da će radnja „potrošiti kvotu”.
2. Nakon potvrde šalje `{ system, prompt, model, tone }` ruti.
3. Ruta interno poziva `/v1/chat/completions` s `promptImprover.META_SYSTEM_PROMPT`.
4. Vraća `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Korisničko sučelje ažurira sistemski upit na konfiguracijskoj ploči i korisnički upit na kartici za razgovor.

---

## Unaprijed postavke

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Pohranjene u SQLite tablici `playground_presets` (migracija `084_playground_presets.sql`).
- Svaka unaprijed postavljena konfiguracija pohranjuje: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` popis, `POST` stvaranje, `GET /:id`, `PUT /:id`, `DELETE /:id`.

---

## Metrike streaminga

`useStreamMetrics.ts` + `streamMetrics.ts` (čista funkcija):

- `start()` — bilježi vrijeme početka zahtjeva.
- `onFirstChunk()` — bilježi TTFT.
- `onChunk(n)` — zbraja broj tokena dovršetka.
- `finish(usage?)` — izračunava završne metrike: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Cijene iz statičke tablice u `src/lib/playground/types.ts` (označene kao „procijenjene” — D13).

---

## Pozadinske rute

| Metoda   | Putanja                          | Rukovatelj                                                                                     |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Validira `ImprovePromptRequestSchema` pomoću Zoda; poziva `/v1/chat/completions` s meta-upitom |
| `GET`    | `/api/playground/presets`        | Vraća `{ presets: PlaygroundPresetListItem[] }`                                                |
| `POST`   | `/api/playground/presets`        | Stvara unaprijed postavljenu konfiguraciju; validira `PlaygroundPresetCreateSchema`            |
| `GET`    | `/api/playground/presets/:id`    | Vraća jednu unaprijed postavljenu konfiguraciju ili 404                                        |
| `PUT`    | `/api/playground/presets/:id`    | Djelomično ažuriranje                                                                          |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                            |

Autentifikacija: neobavezna (`REQUIRE_API_KEY`). Pogreške putem `buildErrorBody()` (strogo pravilo #12).

---

## Ključne datoteke

| Putanja                                                                    | Namjena                                                           |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Komponenta ljuske, orkestrator kartica                            |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Kartice + brojač + gumb za izvoz                                  |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Zajednička konfiguracijska ploča                                  |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Radno okruženje za razgovor                                       |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Usporedba više modela                                             |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Uređivač Monaco (očuvan)                                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Alati + strukturirani izlaz                                       |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Modalni prozor za izvoz koda                                      |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Pojedinačni stupac za usporedbu                                   |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | Prikaz TTFT/TPS                                                   |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Klijentska kuka za metrike                                        |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | CRUD kuka za unaprijed definirane postavke                        |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Kuka za poboljšanje upita                                         |
| `src/lib/playground/codeExport.ts`                                         | Generator za curl/Python/TS (dijeljen s alatima za pretraživanje) |
| `src/lib/playground/promptImprover.ts`                                     | Sastavljač metaupita                                              |
| `src/lib/playground/streamMetrics.ts`                                      | Izračun čistih metrika                                            |
| `src/lib/db/playgroundPresets.ts`                                          | DB modul (CRUD)                                                   |
| `src/app/api/playground/improve-prompt/route.ts`                           | REST ruta za poboljšanje upita                                    |
| `src/app/api/playground/presets/route.ts`                                  | Popis unaprijed definiranih postavki + izrada                     |
| `src/app/api/playground/presets/[id]/route.ts`                             | Dohvaćanje/ažuriranje/brisanje unaprijed definiranih postavki     |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Migracija baze podataka                                           |

---

## Rješavanje problema

| Simptom                                                    | Uzrok                                   | Rješenje                                                                                                          |
| ---------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Monaco uređivač ne prikazuje se na kartici API-ja          | SSR je učitao Monaco                    | Provjerite koristi li `ApiTab` `dynamic(..., { ssr: false })`                                                     |
| Tokovi usporedbe pokreću se sekvencijalno                  | Pogrešna upotreba `Promise.all`         | Svi počeci tokova moraju se pokrenuti u jednom pozivu `Promise.all`                                               |
| Metrike prikazuju `null` za TTFT                           | Rukovatelj prvim segmentom nije povezan | Provjerite poziva li se `useStreamMetrics.onFirstChunk()` u petlji SSE čitača                                     |
| Unaprijed postavljena konfiguracija nije trajno spremljena | Migracija baze podataka nije pokrenuta  | Pokrenite `npm run db:migrate` ili ponovno pokrenite poslužitelj (migracija se automatski pokreće pri pokretanju) |
| Poboljšavanje upita vraća 502                              | Model nije postavljen u konfiguraciji   | Korisnik mora unijeti naziv modela u oknu konfiguracije prije poboljšavanja                                       |
| Izvezeni kôd prikazuje `MISSING_API_KEY`                   | Rezervirano mjesto nije umetnuto        | `codeExport.ts` uvijek koristi `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                       |

---

## Reference

- Glavni plan: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Plan značajke: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Izvoz kôda: `src/lib/playground/codeExport.ts`
- Poboljšivač upita: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
