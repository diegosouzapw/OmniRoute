# Homologation Suite (`npm run homolog`) (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Tabbatarwar E2E a ainihin muhalli don tura OmniRoute da ke gudana a kan VPS na homologation
(`HOMOLOG_BASE_URL`, misali `http://192.168.0.15:20128`). Umarni guda yana maye gurbin jerin binciken
saki na hannu na STOP #2 da gudu mai sarrafa kansa wanda ke samar da hujjoji.

## Abubuwan da yake rufewa

| Mataki                      | Abin da yake dubawa                                                                                                                                                                                                                             | Aiwatarwa                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — lafiya/daidaito        | `/api/monitoring/health` yana amsawa da `200` tare da `status: "healthy"` da sigar da ake tsammani                                                                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — maɓalli na wucin gadi | Shigar admin → `POST /api/keys` yana ƙirƙirar API key mai iyakance izini don wannan gudu, sannan a soke shi (`DELETE /api/keys/:id`) a cikin tubalin `finally` ba tare da la’akari da sakamakon ba                                              | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — fuskar API            | Kundin `/v1/models`, kammala tattaunawa ta gaske ba tare da streaming ba (samfurin da ke da muhimmanci ga tier, `max_tokens: 5`), `401` na maɓalli mara inganci, da `/api/monitoring/health` na jama'a                                          | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming na SSE      | Kammala tattaunawa ta gaske ta hanyar streaming; yana tabbatar da `text/event-stream`, aƙalla delta guda na abun ciki, da alamar ƙarshe ta `[DONE]`                                                                                             | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — masu samarwa na gaske  | Buƙatar tattaunawa guda mai mafi ƙarancin kuɗi ga kowane muhimmin provider da ke cikin kundin `/v1/models` na kai tsaye, ana ƙirƙirar ta nan take ta hanyar promptfoo                                                                           | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — tantancewar UI        | Yana shiga sau ɗaya ta ainihin fom ɗin shiga sannan ya sake amfani da zaman (`storageState`) a duk matakin UI                                                                                                                                   | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — hanyoyin UI           | Kowane tsayayyen `page.tsx` a ƙarƙashin `src/app/(dashboard)/dashboard` (wanda aka gano daga tsarin fayiloli, ana tsallake hanyoyin `[param]` masu canzawa) yana lodawa ba tare da kuskuren HTTP, kuskuren shafi, ko iyakar kuskuren Next.js ba | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — muhimmin gudan UI     | Yana ƙirƙirar API key ta hanyar dashboard UI sannan ya sake soke shi (ba ya barin wani saura a kan VPS)                                                                                                                                         | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — rahoto haɗaɗɗe         | Yana haɗa httpYac (ta hanyar `junit-to-ctrf`), adaftan promptfoo→CTRF, da mai bayar da rahoton Playwright CTRF cikin `homolog-ctrf.json` guda, tare da `homolog-report/summary.md` mai sauƙin karantawa                                         | `scripts/homolog/run.mjs`                                                     |

Babu wani sa hannun LLM a cikin sake gudanarwar kanta — wannan jerin gwaje-gwajen regression ne mai tabbataccen sakamako,
ba eval ba. AI yana shiga ne kawai a aikin kulawa na gaba (duba Taswirar Aiki da ke ƙasa).

## Abubuwan da ake buƙata tun da farko

1. Kwafi `.env.homolog.example` zuwa `.env.homolog` (git zai yi watsi da shi — kada a taɓa commit ɗinsa) sannan a cika:
   - `HOMOLOG_BASE_URL` — turawar da ake son gwadawa, misali `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — kalmar sirrin gudanar da dashboard na wannan turawar.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefixes na masu samarwa da aka raba da waƙafi waɗanda za a aika musu da ainihin
     buƙatar smoke chat (misali `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — a bar shi babu komai a gudanarwa ta yau da kullum; suite ɗin yana ƙirƙira kuma yana soke
     nasa maɓallin wucin gadi. A saita wannan kawai don debug na mataki guda a keɓe.
2. Gudanar da `npm install` a cikin repo (dependencies na suite ɗin — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — duk devDependencies ne na yau da kullum).
3. Gudanar da `npx playwright install` idan binaries na burauzar ba su riga sun kasance ba.

## Yadda ake gudanarwa

```bash
npm run homolog
```

Don tabbatarwa a kan wata turawa wadda version ɗinta bai yi daidai da na cikin `package.json`
na gida ba (misali, akwatin homologation da har yanzu yake kan patch release na baya), a maye gurbin
version ɗin da ake tsammani kai tsaye:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Gudanarwar za ta fita da non-zero idan kowane mataki ya gaza, kuma koyaushe tana ƙoƙarin soke maɓallin
API na wucin gadi da ta ƙirƙira, ko da an samu gazawa (`finally` block a cikin `scripts/homolog/run.mjs`).

## Karanta rahoton

Dukkan sakamako suna shiga `homolog-report/` (git zai yi watsi da shi):

- `summary.md` — tebur iri ɗaya da aka buga zuwa stdout, layi ɗaya ga kowane mataki (✅/❌ + bayani).
- `homolog-ctrf.json` — haɗaɗɗen rahoton CTRF (haɗin sakamakon API/SSE, provider-smoke, da
  UI) — wannan ne artifact da za a haɗa da jerin binciken STOP #2 na release.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — rahotannin
  asali/na tsaka-tsaki na kowane mataki.
- `promptfooconfig.yaml`, `provider-misses.json` — promptfoo config da aka samar don
  gudanarwar yanzu da kuma duk wani muhimmin mai samarwa da ba a samu a cikin live catalog ba.

Gazawar L0 tana dakatar da komai nan take (ba a ƙirƙiri maɓallin wucin gadi ba), domin rashin daidaiton
version/health yana nufin cewa duk matakan da ke biyo baya za su tabbatar da turawar da ba daidai ba.

## Sake saita baseline idan UI ya canza bisa ƙa'ida

L4b (route smoke) da L4c (API-key UI flow) suna amfani da ainihin DOM locators, ba
snapshots ba, saboda haka yawancin sauye-sauyen UI na ƙa'ida ba sa buƙatar sabunta suite. Idan wani sauyi
ya lalata locator (misali, an sauya sunan label na maɓalli ko an matsar da shafin settings):

1. Sake tabbatar da locator ta amfani da source na yanzu (specs ɗin sun riga sun bayyana wane
   file/line aka tabbatar da kowane locator daga gare shi — a bi wannan tsarin, kada a yi hasashe).
2. Sabunta spec a cikin `tests/homolog/ui/`.
3. Sake gudanar da `npm run homolog` (ko kuma Playwright spec ɗin da abin ya shafa kawai) a kan VPS don
   tabbatar da gyaran, sannan a yi commit.

Babu visual/pixel baseline a cikin wannan suite (F1) — duba Roadmap don wannan.

## Taswirar ci gaba (F2 / F3)

Tsarawa da ƙaddamarwa a matakai suna cikin internal planning spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ba a haɗa link ba — internal
`_tasks/` artifact ne, ba ya cikin tracked docs na wannan repo). Taƙaitawa:

- **F2** — cikakken rikodin walkthrough → Playwright Test Agents (`planner`/`generator`)
  suna juya shi zuwa flow specs (ƙirƙirar combo, gwada mai samarwa, gyara settings, MCP tools) +
  visual regression baseline (Lost Pixel) tare da masks a kan dynamic data (metrics,
  timestamps, logs) + tsarin kulawa na `healer` ga kowane release.
- **F3** — ɗaukar hoto na resilience/contract/wiring: toxiproxy + wani mai samarwa na bogi mai jituwa da OpenAI
  a kan devbox, wani `homolog-resilience` combo a kan VPS da aka nuna masa
  (injected timeout → tabbatar da fallback + buɗewa/rufewar circuit breaker ta
  `/api/monitoring/health`); gwajin contract na Schemathesis mai gate a kan
  `docs/openapi.yaml` (`--max-examples` mai ƙanƙanta, fixed seeds, non-LLM endpoints kawai); da kuma
  haɗa `npm run homolog` + `summary.md` nasa cikin matakin STOP #2 na `/generate-release`.
