# Homologation Suite (`npm run homolog`) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E validacija u realnom okruženju za OmniRoute implementaciju pokrenutu na homologacionom VPS-u
(`HOMOLOG_BASE_URL`, npr. `http://192.168.0.15:20128`). Jedna komanda zamenjuje ručnu
STOP #2 kontrolnu listu za izdavanje automatizovanim izvršavanjem koje generiše dokaze.

## Šta obuhvata

| Sloj                      | Šta proverava                                                                                                                                                                                                          | Implementacija                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — stanje/paritet       | `/api/monitoring/health` odgovara statusom `200`, sa `status: "healthy"` i očekivanom verzijom                                                                                                                         | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — privremeni ključ    | Prijava administratora → `POST /api/keys` kreira API ključ ograničenog opsega za dato izvršavanje, koji se opoziva (`DELETE /api/keys/:id`) u bloku `finally` bez obzira na ishod                                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API površina        | Katalog `/v1/models`, stvarni chat dovršetak bez strimovanja (model kritičnog nivoa, `max_tokens: 5`), odgovor `401` za nevažeći ključ i javna ruta `/api/monitoring/health`                                           | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE strimovanje     | Stvarni chat dovršetak sa strimovanjem; potvrđuje `text/event-stream`, najmanje jednu promenu sadržaja i završni marker `[DONE]`                                                                                       | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — stvarni provajderi   | Po jedan chat zahtev minimalnog troška za svakog kritičnog provajdera prisutnog u aktivnom katalogu `/v1/models`, generisan u hodu pomoću promptfoo                                                                    | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikacija  | Jednom se prijavljuje putem stvarnog obrasca za prijavu i ponovo koristi sesiju (`storageState`) u celom UI sloju                                                                                                      | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI rute             | Svaka statička datoteka `page.tsx` unutar `src/app/(dashboard)/dashboard` (otkrivena iz sistema datoteka; dinamičke `[param]` rute se preskaču) učitava se bez HTTP greške, greške stranice ili Next.js granice greške | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritični UI tok     | Kreira API ključ putem kontrolne table i zatim ga opoziva (ne ostavlja nikakve ostatke na VPS-u)                                                                                                                       | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — objedinjeni izveštaj | Objedinjuje httpYac (putem `junit-to-ctrf`), promptfoo→CTRF adapter i Playwright CTRF izveštač u jednu datoteku `homolog-ctrf.json`, uz čoveku čitljiv `homolog-report/summary.md`                                     | `scripts/homolog/run.mjs`                                                     |

Bez ikakvog učešća LLM-a u samom ponovnom izvršavanju — ovo je deterministički skup regresionih testova,
a ne evaluacija. AI se uključuje samo u buduće održavanje (pogledajte Plan razvoja u nastavku).

## Предуслови

1. Копирајте `.env.homolog.example` у `.env.homolog` (git га игнорише — никада га немојте комитовати) и попуните:
   - `HOMOLOG_BASE_URL` — циљни deploy, нпр. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — лозинка за управљање контролном таблом за тај deploy.
   - `HOMOLOG_CRITICAL_PROVIDERS` — префикси провајдера раздвојени зарезима за које се шаље стварни
     пробни захтев за ћаскање (нпр. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — оставите празно при уобичајеном покретању; пакет тестова креира и опозива
     сопствени привремени кључ. Подесите ово само ради изолованог отклањања грешака у једном слоју.
2. Покрените `npm install` у репозиторијуму (зависности пакета тестова — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — представљају редовне devDependencies).
3. Покрените `npx playwright install` ако бинарне датотеке прегледача већ нису присутне.

## Како покренути

```bash
npm run homolog
```

Да бисте извршили проверу у односу на deploy чија се верзија не подудара са локалним `package.json`
(нпр. окружење за хомологацију које и даље користи претходно patch издање), изричито замените очекивану
верзију:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Покретање се завршава ненултим статусом ако било који слој не успе и увек покушава да опозове привремени
API кључ који је креиран, чак и у случају неуспеха (`finally` блок у `scripts/homolog/run.mjs`).

## Читање извештаја

Сав излаз се смешта у `homolog-report/` (git га игнорише):

- `summary.md` — иста табела која се исписује на stdout, са по једним редом за сваки слој (✅/❌ + детаљи).
- `homolog-ctrf.json` — обједињени CTRF извештај (спајање API/SSE резултата, пробних тестова провајдера и
  UI резултата) — ово је артефакт који треба приложити контролној листи STOP #2 за издање.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — необрађени/међурезултати
  извештаја за сваки слој.
- `promptfooconfig.yaml`, `provider-misses.json` — генерисана promptfoo конфигурација за
  тренутно покретање и сви критични провајдери који недостају у активном каталогу.

Неуспешан L0 одмах прекида извршавање (не креира се привремени кључ), јер неподударност верзије/стања
значи да би сваки наредни слој проверавао погрешан deploy.

## Поновно постављање основног стања када се UI легитимно промени

L4b (пробни тест рута) и L4c (UI ток за API кључ) користе стварне DOM локаторе, а не
снимке стања, тако да већина легитимних промена UI-ја не захтева ажурирање пакета тестова. Када промена
ипак наруши локатор (нпр. преименована ознака дугмета или премештена страница са подешавањима):

1. Поново потврдите локатор у односу на тренутни изворни код (спецификације већ документују у којој је
   датотеци/реду сваки локатор потврђен — пратите исти образац, не нагађајте).
2. Ажурирајте спецификацију у `tests/homolog/ui/`.
3. Поново покрените `npm run homolog` (или само погођену Playwright спецификацију) на VPS-у да бисте
   потврдили исправку, а затим комитујте измене.

У овом пакету тестова не постоји визуелно/пикселско основно стање (F1) — више информација потражите у Плану развоја.

## План развоја (F2 / F3)

Дизајн и фазно увођење налазе се у интерној планској спецификацији
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (није повезана — интерни
`_tasks/` артефакт, није део документације која се прати у овом репозиторијуму). Резиме:

- **F2** — снимање целокупног процеса → Playwright Test Agents (`planner`/`generator`)
  претварају га у спецификације токова (креирање комбинације, тестирање провајдера, измена подешавања, MCP алати) +
  основно стање за визуелно регресионо тестирање (Lost Pixel) са маскама преко динамичких података (метрике,
  временске ознаке, евиденције) + `healer` рутина одржавања за свако издање.
- **F3** — покривеност отпорности/уговора/повезивања: toxiproxy + лажни провајдер компатибилан са OpenAI-јем
  на devbox-у, `homolog-resilience` комбинација на VPS-у усмерена ка њему
  (убризгано временско ограничење → потврдити резервни механизам + отварање/затварање прекидача кола путем
  `/api/monitoring/health`); условљено Schemathesis тестирање уговора у односу на
  `docs/openapi.yaml` (низак `--max-examples`, фиксне почетне вредности, само крајње тачке које нису LLM); и
  повезивање `npm run homolog` + његовог `summary.md` са STOP #2 фазом процеса `/generate-release`.
