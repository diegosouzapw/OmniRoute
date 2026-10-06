# Homologation Suite (`npm run homolog`) (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

OmniRoute'i homologatsioon-VPS-is töötava juurutuse valideerimine reaalses keskkonnas E2E-testidega
(`HOMOLOG_BASE_URL`, nt `http://192.168.0.15:20128`). Üks käsk asendab väljalaske käsitsi tehtava
STOP #2 kontrollnimekirja automatiseeritud käitusega, mis loob kontrollitavad tõendid.

## Mida see hõlmab

| Kiht                                  | Mida see kontrollib                                                                                                                                                                                               | Teostus                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — seisund/pariteet                 | `/api/monitoring/health` vastab koodiga `200`, sisaldades `status: "healthy"` ja oodatud versiooni                                                                                                                | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ajutine võti                    | Administraatori sisselogimine → `POST /api/keys` loob käituse jaoks piiratud ulatusega API-võtme, mis tühistatakse (`DELETE /api/keys/:id`) plokis `finally` olenemata tulemusest                                 | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-pind                        | `/v1/models` kataloog, tegelik mittevoogedastusega vestlusvastuse genereerimine (taseme jaoks kriitiline mudel, `max_tokens: 5`), sobimatu võtme korral `401` ja avalik `/api/monitoring/health`                  | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-voogedastus                 | Tegelik voogedastusega vestlusvastuse genereerimine; kontrollib väärtust `text/event-stream`, vähemalt üht sisudeltat ja lõpetajat `[DONE]`                                                                       | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — tegelikud pakkujad               | Üks minimaalse kuluga vestluspäring iga kriitilise pakkuja kohta, kes esineb reaalajas `/v1/models` kataloogis; päringud genereeritakse jooksvalt promptfoo abil                                                  | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — kasutajaliidese autentimine     | Logib üks kord sisse tegeliku sisselogimisvormi kaudu ja taaskasutab seanssi (`storageState`) kogu kasutajaliidese kihis                                                                                          | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — kasutajaliidese marsruudid      | Iga staatiline `page.tsx` kataloogis `src/app/(dashboard)/dashboard` (tuvastatakse failisüsteemist; dünaamilised `[param]` marsruudid jäetakse vahele) laaditakse ilma HTTP-vea, lehevea või Next.js-i veapiirita | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kasutajaliidese kriitiline voog | Loob juhtpaneeli kasutajaliidese kaudu API-võtme ja tühistab selle uuesti (ei jäta VPS-i jääke)                                                                                                                   | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — koondaruanne                     | Ühendab httpYaci (tööriista `junit-to-ctrf` kaudu), promptfoo→CTRF-adapteri ja Playwrighti CTRF-raporteri üheks failiks `homolog-ctrf.json` ning loob inimloetava faili `homolog-report/summary.md`               | `scripts/homolog/run.mjs`                                                     |

Korduskäituses ei osale ükski LLM — see on deterministlik regressioonitestide kogum,
mitte hindamine. Tehisintellekti kasutatakse ainult tulevastes hooldustöödes (vt allpool tegevuskava).

## Eeltingimused

1. Kopeeri `.env.homolog.example` faili `.env.homolog` (gitignore'i lisatud — ära seda kunagi commit'i) ja täida järgmised väljad:
   - `HOMOLOG_BASE_URL` — sihtjuurutus, nt `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — selle juurutuse töölaua haldusparool.
   - `HOMOLOG_CRITICAL_PROVIDERS` — komadega eraldatud pakkujate prefiksid, millele saadetakse tegelik
     suitsutesti vestluspäring (nt `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — jäta tavakäivitustel tühjaks; testikomplekt loob ja tühistab oma
     ajutise võtme. Määra see ainult ühe kihi isoleeritud silumiseks.
2. Käivita repos `npm install` (testikomplekti sõltuvused — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — on tavalised devDependencies).
3. Käivita `npx playwright install`, kui brauserite binaarfailid pole veel paigaldatud.

## Käivitamine

```bash
npm run homolog
```

Kui soovid valideerida juurutust, mille versioon ei ühti kohaliku `package.json`-iga
(nt homologatsioonikeskkond kasutab endiselt eelmist paikversiooni), alista oodatav
versioon sõnaselgelt:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Käivitus lõpetab nullist erineva väljumiskoodiga, kui mõni kiht ebaõnnestub, ning püüab loodud ajutise
API-võtme alati tühistada, isegi tõrke korral (`finally`-plokk failis `scripts/homolog/run.mjs`).

## Aruande lugemine

Kogu väljund salvestatakse kausta `homolog-report/` (gitignore'i lisatud):

- `summary.md` — sama tabel, mis prinditakse standardväljundisse, üks rida kihi kohta (✅/❌ + üksikasjad).
- `homolog-ctrf.json` — ühtne CTRF-aruanne (API/SSE, pakkujate suitsutestide ja
  kasutajaliidese tulemuste ühend) — see artefakt tuleb lisada väljalaske STOP #2 kontrollnimekirjale.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — kihtide
  töötlemata/vahearuanded.
- `promptfooconfig.yaml`, `provider-misses.json` — praeguse käivituse jaoks genereeritud promptfoo konfiguratsioon
  ja kõik kriitilised pakkujad, mis aktiivsest kataloogist puudusid.

L0 ebaõnnestumine katkestab käivituse kohe (ajutist võtit ei looda), sest versiooni või seisundi
mittevastavus tähendaks, et iga järgnev kiht valideeriks valet juurutust.

## Lähtejoone uuendamine kasutajaliidese õigustatud muutumise korral

L4b (marsruutide suitsutest) ja L4c (API-võtme kasutajaliidese voog) kasutavad tegelikke DOM-i lokaatoreid, mitte
hetktõmmiseid, seega ei nõua enamik õigustatud kasutajaliidese muudatusi testikomplekti uuendamist. Kui muudatus
siiski lõhub lokaatori (nt nupu ümbernimetatud silt või teisaldatud seadete leht):

1. Kontrolli lokaatorit uuesti praeguse lähtekoodi põhjal (spetsifikatsioonides on juba dokumenteeritud, millise
   faili/rea põhjal iga lokaator kinnitati — järgi sama mustrit, ära oletusi tee).
2. Uuenda spetsifikatsiooni kaustas `tests/homolog/ui/`.
3. Käivita VPS-i suhtes uuesti `npm run homolog` (või ainult mõjutatud Playwrighti spetsifikatsioon),
   et parandust kinnitada, ja seejärel tee commit.

Selles testikomplektis puudub visuaalne/pikslipõhine lähtejoon (F1) — selle kohta vaata tegevuskava.

## Tegevuskava (F2 / F3)

Disain ja etapiviisiline juurutus on kirjeldatud sisemises plaanimisspetsifikatsioonis
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (linkimata — sisemine
`_tasks/` artefakt, mis ei kuulu selle repo jälgitava dokumentatsiooni hulka). Kokkuvõte:

- **F2** — täieliku läbikäigu salvestamine → Playwright Test Agents (`planner`/`generator`)
  teisendavad selle voospetsifikatsioonideks (kombinatsiooni loomine, pakkuja testimine, seadete muutmine, MCP tööriistad) +
  visuaalse regressiooni lähtejoon (Lost Pixel) koos dünaamilisi andmeid (mõõdikud,
  ajatemplid, logid) katvate maskidega + `healer`-hooldusrutiin iga väljalaske jaoks.
- **F3** — vastupidavuse, lepingute ja integratsiooni katvus: toxiproxy + OpenAI-ga ühilduv võltspakkuja
  arendusmasinas, sellele suunatud `homolog-resilience` kombinatsioon VPS-is
  (sisestatud ajalõpp → kontrolli varuvariandi rakendumist + kaitselüliti avanemist/sulgumist
  `/api/monitoring/health` kaudu); piiratud Schemathesise lepingutestimine faili
  `docs/openapi.yaml` põhjal (madal `--max-examples`, fikseeritud juhuarvuseemned, ainult mitte-LLM-lõpp-punktid); ning
  käsu `npm run homolog` ja selle `summary.md` ühendamine `/generate-release` STOP #2 etapiga.
