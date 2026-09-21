# Playground Studio (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLAYGROUND_STUDIO.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLAYGROUND_STUDIO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLAYGROUND_STUDIO.md)

---

> **Ominaisuus:** Playground Studio — yhtenäinen tekoälytestauksen työtila polulle `/dashboard/playground`.
> **Suunnitelmat:** `17-playground-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Tila:** Julkaistu versiossa v3.8.6

---

## Yleiskatsaus

Playground Studio muuttaa polun `/dashboard/playground` yksinkertaisesta Monaco-pohjaisesta editorista
monipuoliseksi testauksen työtilaksi. Se korvaa vanhan `page.tsx`-toteutuksen `PlaygroundStudio`-kehyksellä,
joka näyttää neljä välilehteä ja yhteisen määrityspaneelin.

```
┌ Playground ──────────────────────────────────────────────────────────┐
│ [💬 Keskustelu] [⚖ Vertailu] [{} API] [🔧 Koonti] 142↑ 38↓ · $0.002 </>│
├──────────────────────────────────────────┬───────────────────────────┤
│  {aktiivisen välilehden sisältö}         │ ─ Määritykset             │
│                                          │ Päätepiste [chat ∨]       │
│                                          │ Malli     [gpt-5.4 ∨]     │
│                                          │ Järjestelmä [tekstialue]  │
│                                          │ Lämpötila ▕▕▔▔ 0.7        │
│                                          │ Esiasetukset [▾ lataa][tallenna] │
│                                          │ [✨ Paranna kehotetta]     │
└──────────────────────────────────────────┴───────────────────────────┘
```

---

## Välilehdet

### Keskustelu-välilehti

Kehittää `ChatPlayground.tsx`-komponentin usean vuoropuhelukierroksen suoratoistoa tukevaksi työpöydäksi:

- Täysi Markdown-renderöinti `MarkdownMessage.tsx`-komponentilla (koodilohkot, taulukot, luettelot, linkit).
- Järjestelmäkehote saadaan yhteisestä määrityspaneelista.
- Viestikohtaiset tunniste- ja kustannustiedot (kehote- ja vastaustunnisteet).
- Viimeisen vastauksen luominen uudelleen.
- Lähettää pyynnöt päätepisteeseen `POST /v1/chat/completions` käyttäen SSE-suoratoistoa.

### Vertailu-välilehti

Välityspalvelimen keskeinen erottautumistekijä: suorita yksi kehote enintään **neljällä mallilla rinnakkain**.

- Enintään neljä saraketta, joista kukin suoratoistaa itsenäisesti päätepisteestä `/v1/chat/completions`.
- `+ Lisää malli` -painike (Cmd+K-pikanäppäin) sarakkeiden lisäämiseen.
- `Suorita kaikki ▶` käynnistää kaikki suoratoistot samanaikaisesti käyttäen `Promise.all`-kutsua ja sarakekohtaista `AbortController`-oliota.
- Yleinen **Peruuta kaikki** keskeyttää jokaisen käynnissä olevan suoratoiston.
- Sarakekohtainen `ProviderMetrics` näyttää TTFT:n, TPS:n, tunnisteet ja arvioidut kustannukset reaaliajassa.
- Mittarit on merkitty tekstillä **"asiakaspuolen arvio"** (D12) — mittaus alkaa ensimmäisestä SSE-osasta.

### API-välilehti

Säilyttää tehokäyttäjille 100 % alkuperäisestä Monaco-editorista (D14):

- 10 päätepistettä: keskusteluvastaukset, vastaukset, upotukset, kuvat, ääni, puhe, litteroinnit, moderointi, uudelleenjärjestäminen ja haku.
- Multimodaalinen tiedostojen lataus.
- SSE-suoratoisto reaaliaikaisella tulosteella.
- Kääritty `ApiTab.tsx`-komponentiksi (ladataan laiskasti, `ssr: false`).

### Koonti-välilehti

Työkalujen/funktioiden kutsumisen ja rakenteisen tulosteen käyttöliittymä:

- `ToolsBuilder.tsx` — lisää, muokkaa tai poista `tools[]`-kohteita kunkin työkalun JSON-skeemaeditorilla.
  Validoi parametrit `ToolDefinitionSchema`-skeemalla (Zod).
- `StructuredOutputEditor.tsx` — JSON-tilan valinta ja JSON-skeemaeditori.
  Validoi vastauksen skeemaa vasten käyttäen `StructuredOutputSchema`-skeemaa (Zod).
- Lähettää pyynnön päätepisteeseen `/v1/chat/completions` sisältäen `tools[]`-taulukon ja/tai `response_format`-kentän.

---

## Määrityspaneeli (jaettu)

`StudioConfigPane.tsx` — aina näkyvissä, voidaan pienentää.

| Kenttä            | Komponentti           | Huomautukset                                                                    |
| ----------------- | --------------------- | ------------------------------------------------------------------------------- |
| Päätepiste        | `<select>`            | 10 vaihtoehtoa, jotka vastaavat `PlaygroundEndpoint`-tyyppiä                    |
| Malli             | `<input>`             | vapaamuotoinen teksti, esim. `openai/gpt-4o`                                    |
| Järjestelmäkehote | `<textarea>`          | välitetään kaikille välilehdille                                                |
| Parametrit        | `ParamSliders`        | temperature, max_tokens, top_p, presence/frequency penalty, seed, stop          |
| Esiasetukset      | `PresetPicker`        | nimettyjen määritystilannevedosten lataus/tallennus (säilytetään tietokannassa) |
| Paranna kehotetta | `ImprovePromptButton` | avaa kiintiövaroitusmodaalin, kutsuu `/api/playground/improve-prompt`-reittiä   |

Tila nostetaan `PlaygroundStudio.tsx`-komponenttiin ja välitetään kaikille välilehdille. Välilehtien vaihtaminen
säilyttää määritystilan.

---

## Yläpalkki

`StudioTopBar.tsx`:

- Välilehtivalitsin (role="tablist").
- `TokenCostCounter` — reaaliaikainen syöte- ja tulostetunnusten (↑/↓) sekä arvioitujen kustannusten näyttö.
- Koodin vientipainike (`</>`) — avaa `ExportCodeModal`-modaalin.

---

## Koodin vientimodaali

`ExportCodeModal.tsx` käyttää `codeExport.ts`-tiedostoa curl-, Python- ja TypeScript-koodikatkelmien luomiseen
nykyisestä `PlaygroundState`-tilasta. API-avaimen paikkamerkki on aina `$OMNIROUTE_API_KEY` (D11).

---

## Kehotteen parantaja

`ImprovePromptButton.tsx` → `useImprovePrompt.ts` → `POST /api/playground/improve-prompt`:

1. Modaali varoittaa, että toiminto kuluttaa kiintiötä.
2. Vahvistuksen jälkeen lähettää `{ system, prompt, model, tone }` reitille.
3. Reitti kutsuu sisäisesti `/v1/chat/completions`-päätepistettä käyttäen `promptImprover.META_SYSTEM_PROMPT`-metakehotetta.
4. Palauttaa `{ improvedSystem?, improvedPrompt?, tokensIn, tokensOut }`.
5. Käyttöliittymä päivittää määrityspaneelin järjestelmäkehotteen ja Keskustelu-välilehden käyttäjäkehotteen.

---

## Esiasetukset

`PresetPicker.tsx` → `usePresets.ts` → `/api/playground/presets/*`:

- Tallennetaan `playground_presets`-SQLite-tauluun (migraatio `084_playground_presets.sql`).
- Kukin esiasetus tallentaa seuraavat tiedot: `name`, `endpoint`, `model`, `system`, `params_json`, `created_at`.
- CRUD: `GET` luettelon hakemiseen, `POST` luomiseen, `GET /:id` hakemiseen, `PUT /:id` päivittämiseen, `DELETE /:id` poistamiseen.

---

## Suoratoiston mittarit

`useStreamMetrics.ts` + `streamMetrics.ts` (puhdas funktio):

- `start()` — tallentaa pyynnön aloitusajan.
- `onFirstChunk()` — tallentaa TTFT:n.
- `onChunk(n)` — kerryttää tulostetunnusten määrää.
- `finish(usage?)` — laskee lopulliset mittarit: `ttftMs`, `totalMs`, `tps`, `tokensIn`, `tokensOut`, `costUsd`.
- Hinnoittelu staattisesta taulukosta tiedostossa `src/lib/playground/types.ts` (merkitty arvioksi — D13).

---

## Taustajärjestelmän reitit

| Metodi   | Polku                            | Käsittelijä                                                                                                 |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/playground/improve-prompt` | Validoi `ImprovePromptRequestSchema`-skeemalla; kutsuu `/v1/chat/completions`-päätepistettä metakehotteella |
| `GET`    | `/api/playground/presets`        | Palauttaa `{ presets: PlaygroundPresetListItem[] }`                                                         |
| `POST`   | `/api/playground/presets`        | Luo esiasetuksen; validoi `PlaygroundPresetCreateSchema`-skeemalla                                          |
| `GET`    | `/api/playground/presets/:id`    | Palauttaa yhden esiasetuksen tai 404-virheen                                                                |
| `PUT`    | `/api/playground/presets/:id`    | Osittainen päivitys                                                                                         |
| `DELETE` | `/api/playground/presets/:id`    | 204                                                                                                         |

Todennus: valinnainen (`REQUIRE_API_KEY`). Virheet `buildErrorBody()`-funktion kautta (ehdoton sääntö #12).

---

## Keskeiset tiedostot

| Polku                                                                      | Tarkoitus                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/playground/PlaygroundStudio.tsx`            | Kuorikomponentti, välilehtien koordinointi                 |
| `src/app/(dashboard)/dashboard/playground/components/StudioTopBar.tsx`     | Välilehdet + laskuri + vientipainike                       |
| `src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx` | Jaettu määrityspaneeli                                     |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ChatTab.tsx`     | Keskustelutyötila                                          |
| `src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx`  | Usean mallin vertailu                                      |
| `src/app/(dashboard)/dashboard/playground/components/tabs/ApiTab.tsx`      | Monaco-editori (säilytetty)                                |
| `src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx`    | Työkalut + jäsennelty tuloste                              |
| `src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx`  | Koodin vienti-ikkuna                                       |
| `src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx`    | Yksittäinen vertailusarake                                 |
| `src/app/(dashboard)/dashboard/playground/components/ProviderMetrics.tsx`  | TTFT/TPS-näyttö                                            |
| `src/app/(dashboard)/dashboard/playground/hooks/useStreamMetrics.ts`       | Asiakaspuolen metriikkakoukku                              |
| `src/app/(dashboard)/dashboard/playground/hooks/usePresets.ts`             | Esiasetusten CRUD-koukku                                   |
| `src/app/(dashboard)/dashboard/playground/hooks/useImprovePrompt.ts`       | Kehotteen parannuskoukku                                   |
| `src/lib/playground/codeExport.ts`                                         | curl/Python/TS-generaattori (jaettu hakutyökalujen kanssa) |
| `src/lib/playground/promptImprover.ts`                                     | Metakehotteen muodostaja                                   |
| `src/lib/playground/streamMetrics.ts`                                      | Puhdas metriikkalaskenta                                   |
| `src/lib/db/playgroundPresets.ts`                                          | Tietokantamoduuli (CRUD)                                   |
| `src/app/api/playground/improve-prompt/route.ts`                           | Kehotteen parantamisen REST-reitti                         |
| `src/app/api/playground/presets/route.ts`                                  | Esiasetusten luettelo + luonti                             |
| `src/app/api/playground/presets/[id]/route.ts`                             | Esiasetusten haku/päivitys/poisto                          |
| `src/lib/db/migrations/084_playground_presets.sql`                         | Tietokantamigraatio                                        |

---

## Vianmääritys

| Oire                                         | Syy                                       | Korjaus                                                                                                                        |
| -------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Monaco-editori ei näy API-välilehdellä       | SSR latasi Monacon                        | Varmista, että `ApiTab` käyttää määritystä `dynamic(..., { ssr: false })`                                                      |
| Vertailusuoratoistot käynnistyvät peräkkäin  | Virheellinen `Promise.all`-käyttö         | Kaikkien suoratoistojen käynnistykset on suoritettava yhdessä `Promise.all`-kutsussa                                           |
| Mittarit näyttävät TTFT-arvona `null`        | Ensimmäisen osan käsittelijää ei kytketty | Tarkista, että `useStreamMetrics.onFirstChunk()` kutsutaan SSE-lukijan silmukassa                                              |
| Esiasetus ei säily                           | Tietokantamigraatiota ei ole suoritettu   | Suorita `npm run db:migrate` tai käynnistä palvelin uudelleen (migraatio suoritetaan automaattisesti käynnistyksen yhteydessä) |
| Kehotteen parantaminen palauttaa 502-virheen | Mallia ei ole asetettu asetuksissa        | Käyttäjän on annettava mallin nimi asetuspaneelissa ennen parantamista                                                         |
| Viedyn koodin arvo on `MISSING_API_KEY`      | Paikkamerkkiä ei ole lisätty              | `codeExport.ts` käyttää aina arvoa `API_KEY_PLACEHOLDER = "$OMNIROUTE_API_KEY"`                                                |

---

## Viitteet

- Pääsuunnitelma: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-C.md`
- Ominaisuussuunnitelma: `_tasks/features-v3.8.6/refactorpages/17-playground-studio-redesign.plan.md`
- Koodin vienti: `src/lib/playground/codeExport.ts`
- Kehotteen parantaja: `src/lib/playground/promptImprover.ts`
- Search Tools Studio: `docs/frameworks/SEARCH_TOOLS_STUDIO.md`
