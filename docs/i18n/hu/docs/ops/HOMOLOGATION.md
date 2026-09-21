# Homologation Suite (`npm run homolog`) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Az homologációs VPS-en futó OmniRoute deploy valós környezetű E2E-validációja
(`HOMOLOG_BASE_URL`, pl. `http://192.168.0.15:20128`). Egyetlen parancs váltja fel a kiadás
manuális STOP #2 ellenőrzőlistáját egy automatizált, bizonyítékokat előállító futtatással.

## Mit fed le

| Réteg                            | Mit ellenőriz                                                                                                                                                                                                                        | Megvalósítás                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — állapot/paritás             | A `/api/monitoring/health` `200` választ ad `status: "healthy"` értékkel és az elvárt verzióval                                                                                                                                      | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ideiglenes kulcs           | Adminisztrátori bejelentkezés → a `POST /api/keys` létrehoz egy megfelelő hatókörű API-kulcsot a futtatáshoz, amely az eredménytől függetlenül visszavonásra kerül (`DELETE /api/keys/:id`) egy `finally` blokkban                   | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-felület                | A `/v1/models` katalógus, egy valós, nem streamelt chat-kiegészítés (kritikus szintű modell, `max_tokens: 5`), egy érvénytelen kulcshoz tartozó `401` válasz és a nyilvános `/api/monitoring/health`                                 | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-streamelés             | Valós streamelt chat-kiegészítés; ellenőrzi a `text/event-stream` típust, legalább egy tartalmi deltát és egy `[DONE]` lezáróelemet                                                                                                  | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — valós szolgáltatók          | Egy minimális költségű chat-kérés minden olyan kritikus szolgáltatóhoz, amely szerepel az élő `/v1/models` katalógusban; menet közben generálva a promptfoo segítségével                                                             | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — felületi hitelesítés       | Egyszer bejelentkezik a valós bejelentkezési űrlapon keresztül, és újra felhasználja a munkamenetet (`storageState`) a teljes felületi rétegben                                                                                      | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — felületi útvonalak         | A `src/app/(dashboard)/dashboard` alatti összes statikus `page.tsx` oldal (a fájlrendszerből felderítve, a dinamikus `[param]` útvonalakat kihagyva) HTTP-hiba, oldalhiba vagy Next.js hibahatár nélkül betöltődik                   | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritikus felületi folyamat | Létrehoz egy API-kulcsot az irányítópult felületén, majd visszavonja azt (nem hagy maradványt a VPS-en)                                                                                                                              | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — egységes jelentés           | Egyetlen `homolog-ctrf.json` fájlba egyesíti a httpYac (`junit-to-ctrf` használatával), a promptfoo→CTRF adapter és a Playwright CTRF-riporter eredményeit, továbbá létrehoz egy könnyen olvasható `homolog-report/summary.md` fájlt | `scripts/homolog/run.mjs`                                                     |

Magában a visszajátszásban nincs LLM-közreműködés — ez egy determinisztikus regressziós
tesztcsomag, nem kiértékelés. Az AI csak a jövőbeli karbantartási munkák során kap szerepet
(lásd az alábbi ütemtervet).

## Előfeltételek

1. Másold a `.env.homolog.example` fájlt `.env.homolog` néven (a git figyelmen kívül hagyja — soha ne commitold), és töltsd ki:
   - `HOMOLOG_BASE_URL` — a céltelepítés, például `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — az adott telepítés irányítópultjának adminisztrációs jelszava.
   - `HOMOLOG_CRITICAL_PROVIDERS` — vesszővel elválasztott szolgáltatóelőtagok, amelyekkel valódi smoke chatkérés fut (például `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — normál futtatáskor hagyd üresen; a tesztcsomag létrehozza és visszavonja a saját ideiglenes kulcsát. Csak akkor állítsd be, ha egyetlen réteget szeretnél elkülönítve hibakeresni.
2. Futtasd az `npm install` parancsot a repóban (a tesztcsomag függőségei — `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — hagyományos devDependencies elemek).
3. Futtasd az `npx playwright install` parancsot, ha a böngésző binárisai még nincsenek telepítve.

## Futtatás

```bash
npm run homolog
```

Ha olyan telepítést szeretnél ellenőrizni, amelynek verziója nem egyezik a helyi `package.json` fájlban megadottal (például egy homologizációs környezet még az előző javítókiadást használja), add meg explicit módon az elvárt verziót:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

A futtatás nem nulla kilépési kóddal ér véget, ha bármelyik réteg sikertelen, és még hiba esetén is mindig megpróbálja visszavonni az általa létrehozott ideiglenes API-kulcsot (a `scripts/homolog/run.mjs` fájl `finally` blokkja).

## A jelentés értelmezése

Minden kimenet a `homolog-report/` könyvtárba kerül (a git figyelmen kívül hagyja):

- `summary.md` — ugyanaz a táblázat, amely a szabványos kimeneten is megjelenik, rétegenként egy sorral (✅/❌ + részletek).
- `homolog-ctrf.json` — az egyesített CTRF-jelentés (az API/SSE-, szolgáltatói smoke- és UI-eredmények összevonása) — ezt az artefaktumot kell csatolni a kiadás STOP #2 ellenőrzőlistájához.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — a rétegenkénti nyers/köztes jelentések.
- `promptfooconfig.yaml`, `provider-misses.json` — az aktuális futtatáshoz generált promptfoo-konfiguráció, valamint az élő katalógusból hiányzó kritikus szolgáltatók listája.

A sikertelen L0 azonnal megszakítja a futtatást (nem jön létre ideiglenes kulcs), mivel a verzió vagy az állapot eltérése azt jelenti, hogy minden további réteg a rossz telepítést ellenőrizné.

## Új referenciaértékek létrehozása jogos UI-változások esetén

Az L4b-t (útvonal-smoke) és az L4c-t (API-kulcs UI-folyamat) valódi DOM-lokátorok vezérlik, nem pillanatképek, ezért a legtöbb jogos UI-változás nem igényli a tesztcsomag frissítését. Ha egy változás mégis elront egy lokátort (például átnevezik egy gomb feliratát, vagy áthelyezik a beállítási oldalt):

1. Ellenőrizd újra a lokátort az aktuális forrás alapján (a specifikációk már dokumentálják, hogy az egyes lokátorokat melyik fájl melyik soránál ellenőrizték — kövesd ugyanezt a mintát, ne találgass).
2. Frissítsd a specifikációt a `tests/homolog/ui/` könyvtárban.
3. Futtasd újra az `npm run homolog` parancsot (vagy csak az érintett Playwright-specifikációt) a VPS ellenében a javítás megerősítéséhez, majd commitold a módosítást.

Ebben a tesztcsomagban nincs vizuális/pixelalapú referenciaérték (F1) — erről lásd az ütemtervet.

## Ütemterv (F2 / F3)

A tervezés és a szakaszos bevezetés leírása a belső tervezési specifikációban található:
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (nincs hivatkozva — belső `_tasks/`-artefaktum, nem része a repó nyomon követett dokumentációjának). Összefoglalás:

- **F2** — teljes végigjárás rögzítése → a Playwright Test Agents (`planner`/`generator`) folyamatleírásokká alakítja (kombináció létrehozása, szolgáltató tesztelése, beállítások szerkesztése, MCP-eszközök) + vizuális regressziós referenciaérték (Lost Pixel), a dinamikus adatok (metrikák, időbélyegek, naplók) kitakarásával + kiadásonként egy `healer` karbantartási rutin.
- **F3** — reziliencia-/szerződés-/integrációlefedettség: toxiproxy + egy hamis OpenAI-kompatibilis szolgáltató a devboxon, valamint egy arra irányított `homolog-resilience` kombináció a VPS-en (injektált időtúllépés → a tartalék szolgáltatóra váltás, valamint a megszakító nyitásának/lezárásának ellenőrzése az `/api/monitoring/health` útvonalon keresztül); kapuzott Schemathesis szerződéstesztelés a `docs/openapi.yaml` alapján (alacsony `--max-examples`, rögzített seedek, kizárólag nem LLM-végpontok); továbbá az `npm run homolog` és az általa létrehozott `summary.md` bekötése a `/generate-release` STOP #2 fázisába.
