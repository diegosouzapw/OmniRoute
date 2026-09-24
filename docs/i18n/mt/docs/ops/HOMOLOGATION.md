# Homologation Suite (`npm run homolog`) (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validazzjoni E2E f'ambjent reali tad-deploy ta' OmniRoute li qed jaħdem fuq il-VPS ta' omologazzjoni
(`HOMOLOG_BASE_URL`, eż. `http://192.168.0.15:20128`). Kmand wieħed jissostitwixxi l-lista ta' kontroll
manwali STOP #2 tar-rilaxx b'eżekuzzjoni awtomatizzata li tipproduċi l-evidenza.

## X'ikopri

| Saff                         | X'jiċċekkja                                                                                                                                                                                                                        | Implimentazzjoni                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — saħħa/parità            | `/api/monitoring/health` jirrispondi b'`200` bi `status: "healthy"` u bil-verżjoni mistennija                                                                                                                                      | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ċavetta temporanja     | Login tal-amministratur → `POST /api/keys` joħloq ċavetta tal-API b'ambitu definit għall-eżekuzzjoni, li tiġi revokata (`DELETE /api/keys/:id`) fi blokk `finally` irrispettivament mir-riżultat                                   | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — superfiċje tal-API     | Il-katalgu `/v1/models`, kompletament reali taċ-chat mingħajr streaming (mudell kritiku għal-livell, `max_tokens: 5`), `401` għal ċavetta invalida, u `/api/monitoring/health` pubbliku                                            | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE          | Kompletament reali taċ-chat bi streaming; jivverifika `text/event-stream`, mill-inqas delta waħda ta' kontenut, u terminatur `[DONE]`                                                                                              | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — fornituri reali         | Talba waħda taċ-chat bi spiża minima għal kull fornitur kritiku preżenti fil-katalgu live `/v1/models`, iġġenerata dak il-ħin permezz ta' promptfoo                                                                                | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — awtentikazzjoni tal-UI | Jagħmel login darba permezz tal-formola reali tal-login u jerġa' juża s-sessjoni (`storageState`) fis-saff kollu tal-UI                                                                                                            | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — rotot tal-UI           | Kull `page.tsx` statiku taħt `src/app/(dashboard)/dashboard` (misjub mis-sistema tal-fajls, filwaqt li r-rotot dinamiċi `[param]` jinqabżu) jitgħabba mingħajr żball HTTP, żball fil-paġna, jew il-konfini tal-iżbalji ta' Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — fluss kritiku tal-UI   | Joħloq ċavetta tal-API permezz tal-UI tad-dashboard u jerġa' jirrevokaha (ma jħalli l-ebda residwu fuq il-VPS)                                                                                                                     | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — rapport unifikat        | Jgħaqqad httpYac (permezz ta' `junit-to-ctrf`), l-adapter promptfoo→CTRF, u r-reporter CTRF ta' Playwright f'`homolog-ctrf.json` wieħed, flimkien ma' `homolog-report/summary.md` li jinqara faċilment mill-bniedem                | `scripts/homolog/run.mjs`                                                     |

L-ebda involviment ta' LLM fir-riproduzzjoni nnifisha — din hija batterija deterministika ta' rigressjoni,
mhux evalwazzjoni. L-AI tidħol biss f'xogħol futur ta' manutenzjoni (ara l-Pjan Direzzjonali hawn taħt).

## Prerekwiżiti

1. Ikkopja `.env.homolog.example` għal `.env.homolog` (injorat minn git — qatt tagħmlux commit) u imla:
   - `HOMOLOG_BASE_URL` — id-deployment fil-mira, eż. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — il-password tal-ġestjoni tad-dashboard għal dak id-deployment.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefissi tal-providers separati b’virgoli li jirċievu talba reali
     ta’ smoke chat (eż. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — ħalliha vojta f’eżekuzzjonijiet normali; is-suite toħloq u tirrevoka ċ-ċavetta
     effimera tagħha stess. Issettjaha biss biex tiddebuggja saff wieħed b’mod iżolat.
2. `npm install` fir-repo (id-dipendenzi tas-suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — huma devDependencies regolari).
3. `npx playwright install` jekk il-binarji tal-browser għadhom mhumiex preżenti.

## Kif tħaddmu

```bash
npm run homolog
```

Biex tivvalida ma’ deployment li l-verżjoni tiegħu ma taqbilx mal-`package.json` lokali
(eż. kaxxa tal-omologazzjoni li għadha fuq rilaxx ta’ patch preċedenti), issostitwixxi l-verżjoni
mistennija b’mod espliċitu:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

L-eżekuzzjoni tagħlaq b’kodiċi mhux żero jekk xi saff ifalli, u dejjem tipprova tirrevoka ċ-ċavetta
API effimera li tkun ħolqot, anki f’każ ta’ falliment (blokka `finally` f’`scripts/homolog/run.mjs`).

## Kif taqra r-rapport

L-output kollu jitqiegħed f’`homolog-report/` (injorat minn git):

- `summary.md` — l-istess tabella stampata fuq stdout, ringiela waħda għal kull saff (✅/❌ + dettalji).
- `homolog-ctrf.json` — ir-rapport CTRF unifikat (għaqda tar-riżultati tal-API/SSE, tal-provider-smoke, u
  tal-UI) — dan huwa l-artifatt li għandu jinhemeż mal-lista ta’ kontroll STOP #2 ta’ rilaxx.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — ir-rapporti
  mhux ipproċessati/intermedji għal kull saff.
- `promptfooconfig.yaml`, `provider-misses.json` — il-konfigurazzjoni promptfoo ġġenerata għall-
  eżekuzzjoni attwali u kwalunkwe provider kritiku li kien nieqes mill-katalgu live.

Falliment f’L0 iwaqqaf kollox immedjatament (ma tinħoloq ebda ċavetta effimera) peress li nuqqas ta’
qbil fil-verżjoni/health ikun ifisser li kull saff sussegwenti jkun qed jivvalida d-deployment ħażin.

## Stabbiliment mill-ġdid tal-baseline meta l-UI tinbidel b’mod leġittimu

L4b (smoke tar-rotot) u L4c (fluss tal-UI taċ-ċavetta API) huma mmexxija minn locators reali tad-DOM, mhux
snapshots, għalhekk il-biċċa l-kbira tal-bidliet leġittimi fl-UI ma jeħtieġu ebda aġġornament tas-suite. Meta bidla
tabilħaqq tkisser locator (eż. tikketta ta’ buttuna li ngħatat isem ġdid jew paġna tas-settings li tmexxiet):

1. Erġa’ kkonferma l-locator mas-sors attwali (l-ispecs diġà jiddokumentaw ma’ liema
   fajl/linja ġie kkonfermat kull locator — segwi l-istess mudell, taqtax bl-addoċċ).
2. Aġġorna l-ispec f’`tests/homolog/ui/`.
3. Erġa’ ħaddem `npm run homolog` (jew biss l-ispec Playwright affettwat) kontra l-VPS biex
   tikkonferma l-korrezzjoni, imbagħad agħmel commit.

F’din is-suite ma hemm ebda baseline viżiva/tal-pixels (F1) — ara l-Pjan Direzzjonali għal dan.

## Pjan Direzzjonali (F2 / F3)

Id-disinn u t-tnedija f’fażijiet jinsabu fl-ispec interna tal-ippjanar
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (mhux marbuta — artifatt intern
ta’ `_tasks/`, mhux parti mid-dokumentazzjoni ttraċċata ta’ dan ir-repo). Sommarju:

- **F2** — reġistrazzjoni sħiħa tal-proċess → Playwright Test Agents (`planner`/`generator`)
  jibdluha fi specs tal-fluss (oħloq combo, ittestja provider, editja s-settings, għodod MCP) +
  baseline ta’ rigressjoni viżiva (Lost Pixel) b’masks fuq data dinamika (metriċi,
  timestamps, logs) + rutina ta’ manutenzjoni `healer` għal kull rilaxx.
- **F3** — kopertura tar-reżiljenza/kuntratt/wiring: toxiproxy + provider falz kompatibbli ma’
  OpenAI fuq id-devbox, combo `homolog-resilience` fuq il-VPS ippuntat lejh
  (timeout injettat → ivverifika fallback + circuit breaker miftuħ/magħluq permezz ta’
  `/api/monitoring/health`); ittestjar tal-kuntratt b’Schemathesis, ikkontrollat b’gate, kontra
  `docs/openapi.yaml` (`--max-examples` baxx, seeds fissi, endpoints mhux LLM biss); u
  l-wiring ta’ `npm run homolog` + is-`summary.md` tiegħu fil-fażi STOP #2 ta’ `/generate-release`.
