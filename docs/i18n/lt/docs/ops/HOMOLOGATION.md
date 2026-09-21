# Homologation Suite (`npm run homolog`) (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Realios aplinkos „OmniRoute“ diegimo, veikiančio homologacijos VPS, E2E validavimas
(`HOMOLOG_BASE_URL`, pvz., `http://192.168.0.15:20128`). Viena komanda pakeičia rankinį
leidimo STOP #2 kontrolinį sąrašą automatizuotu vykdymu, pateikiančiu įrodymus.

## Kas tikrinama

| Sluoksnis                      | Kas tikrinama                                                                                                                                                                                                  | Įgyvendinimas                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — veiksena / atitiktis      | `/api/monitoring/health` atsako `200`, pateikia `status: "healthy"` ir numatytą versiją                                                                                                                        | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — laikinasis raktas        | Administratoriaus prisijungimas → `POST /api/keys` sukuria vykdymo aprėptimi apribotą API raktą, kuris, nepaisant rezultato, atšaukiamas (`DELETE /api/keys/:id`) bloke `finally`                              | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API sąsaja               | `/v1/models` katalogas, realus nesrautinis pokalbio užbaigimas (pakopai kritinis modelis, `max_tokens: 5`), netinkamo rakto `401` ir viešas `/api/monitoring/health`                                           | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE srautinis perdavimas | Realus srautinis pokalbio užbaigimas; patikrinama `text/event-stream`, bent viena turinio delta ir `[DONE]` terminatorius                                                                                      | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — realūs teikėjai           | Po vieną minimalių sąnaudų pokalbio užklausą kiekvienam kritiniam teikėjui, esančiam veikiančiame `/v1/models` kataloge, vykdymo metu sugeneruojamą naudojant promptfoo                                        | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikavimas      | Vieną kartą prisijungiama naudojant realią prisijungimo formą ir sesija (`storageState`) pakartotinai naudojama visame UI sluoksnyje                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI maršrutai             | Kiekvienas statinis `page.tsx`, esantis `src/app/(dashboard)/dashboard` (aptinkamas failų sistemoje, dinaminiai `[param]` maršrutai praleidžiami), įkeliamas be HTTP, puslapio ar Next.js klaidų ribos klaidos | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritinis UI srautas      | API raktas sukuriamas per valdymo skydelio UI ir vėl atšaukiamas (VPS nelieka jokių likučių)                                                                                                                   | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — suvienodinta ataskaita    | httpYac (per `junit-to-ctrf`), promptfoo→CTRF adapterio ir Playwright CTRF ataskaitų teikimo priemonės rezultatai sujungiami į vieną `homolog-ctrf.json` bei žmonėms suprantamą `homolog-report/summary.md`    | `scripts/homolog/run.mjs`                                                     |

Pačiame pakartotiniame vykdyme LLM visiškai nenaudojamas — tai deterministinis regresijos testų rinkinys,
o ne vertinimas. DI bus naudojamas tik būsimiems priežiūros darbams (žr. toliau pateiktą veiksmų planą).

## Būtinosios sąlygos

1. Nukopijuokite `.env.homolog.example` į `.env.homolog` (failo nepaiso „Git“ — niekada jo neįtraukite į išklotinę) ir užpildykite:
   - `HOMOLOG_BASE_URL` — tikslinis dieginys, pvz., `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — to dieginio valdymo skydelio administravimo slaptažodis.
   - `HOMOLOG_CRITICAL_PROVIDERS` — kableliais atskirti teikėjų prefiksai, kuriems siunčiama tikra
     bandomoji pokalbio užklausa (pvz., `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — įprastai vykdydami palikite tuščią; testų rinkinys sukuria ir atšaukia
     savo laikinąjį raktą. Nustatykite tik norėdami atskirai derinti vieną sluoksnį.
2. Repozitorijoje paleiskite `npm install` (testų rinkinio priklausomybės — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — yra įprastos devDependencies).
3. Paleiskite `npx playwright install`, jei naršyklių dvejetainių failų dar nėra.

## Kaip paleisti

```bash
npm run homolog
```

Norėdami tikrinti dieginį, kurio versija nesutampa su vietinio `package.json` versija
(pvz., homologavimo serveris vis dar naudoja ankstesnę pataisos versiją), aiškiai nurodykite
tikėtiną versiją:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Jei nepavyksta bet kuris sluoksnis, vykdymas baigiamas nenuliniu kodu ir visada bandoma atšaukti sukurtą laikinąjį
API raktą, net ir įvykus klaidai (`finally` blokas faile `scripts/homolog/run.mjs`).

## Ataskaitos skaitymas

Visa išvestis įrašoma į `homolog-report/` (failų nepaiso „Git“):

- `summary.md` — ta pati lentelė, išvedama į stdout, po vieną eilutę kiekvienam sluoksniui (✅/❌ ir išsami informacija).
- `homolog-ctrf.json` — suvienodinta CTRF ataskaita (API/SSE, teikėjų bandomųjų patikrų ir
  UI rezultatų junginys) — tai artefaktas, kurį reikia pridėti prie leidimo STOP #2 kontrolinio sąrašo.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — kiekvieno
  sluoksnio neapdorotos / tarpinės ataskaitos.
- `promptfooconfig.yaml`, `provider-misses.json` — dabartiniam vykdymui sugeneruota promptfoo konfigūracija ir
  visi kritiniai teikėjai, kurių nebuvo aktyviame kataloge.

Nepavykus L0, vykdymas nutraukiamas nedelsiant (laikinasis raktas nesukuriamas), nes versijos / būklės
neatitiktis reikštų, kad kiekvienas paskesnis sluoksnis tikrintų netinkamą dieginį.

## Bazinės būsenos atnaujinimas po pagrįstų UI pakeitimų

L4b (maršrutų bandomoji patikra) ir L4c (API rakto UI eiga) valdomi tikrais DOM lokatoriais, o ne
momentinėmis kopijomis, todėl dėl daugumos pagrįstų UI pakeitimų testų rinkinio atnaujinti nereikia. Kai pakeitimas
vis dėlto sugadina lokatorių (pvz., pervadinus mygtuko etiketę ar perkėlus nustatymų puslapį):

1. Iš naujo patikrinkite lokatorių pagal dabartinį šaltinio kodą (specifikacijose jau nurodyta, pagal kurį
   failą / eilutę patvirtintas kiekvienas lokatorius — vadovaukitės tuo pačiu principu, nespėliokite).
2. Atnaujinkite specifikaciją kataloge `tests/homolog/ui/`.
3. Dar kartą paleiskite `npm run homolog` (arba tik paveiktą Playwright specifikaciją) VPS serveryje, kad
   patvirtintumėte pataisymą, tada sukurkite išklotinę.

Šiame testų rinkinyje nėra vaizdinės / pikselių bazinės būsenos (F1) — apie tai žr. planą.

## Planas (F2 / F3)

Projektas ir etapinis diegimas aprašyti vidinėje planavimo specifikacijoje
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (nuoroda nepateikta — tai vidinis
`_tasks/` artefaktas, nepriklausantis šios repozitorijos sekamiems dokumentams). Santrauka:

- **F2** — viso proceso įrašymas → Playwright Test Agents (`planner`/`generator`)
  paverčia jį eigos specifikacijomis (sukurti derinį, patikrinti teikėją, redaguoti nustatymus, MCP įrankius) +
  vaizdinės regresijos bazine būsena (Lost Pixel) su kaukėmis virš dinaminių duomenų (metrikų,
  laiko žymų, žurnalų) + kiekvienam leidimui skirta `healer` priežiūros procedūra.
- **F3** — atsparumo / kontraktų / integracijos aprėptis: toxiproxy + netikras su OpenAI suderinamas
  teikėjas kūrimo serveryje, į jį nukreiptas `homolog-resilience` derinys VPS serveryje
  (įterptasis skirtasis laikas → patikrinti atsarginį mechanizmą ir grandinės pertraukiklio atidarymą / uždarymą per
  `/api/monitoring/health`); sąlyginis Schemathesis kontraktų testavimas pagal
  `docs/openapi.yaml` (maža `--max-examples` reikšmė, fiksuotos pradinės reikšmės, tik ne LLM galiniai taškai); ir
  `npm run homolog` bei jo `summary.md` integravimas į `/generate-release` STOP #2 etapą.
