# Homologation Suite (`npm run homolog`) (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Bailíochtú E2E i bhfíorthimpeallacht ar imscaradh OmniRoute atá ag rith ar an VPS homalógaithe
(`HOMOLOG_BASE_URL`, e.g. `http://192.168.0.15:20128`). Tagann ordú amháin in ionad sheicliosta láimhe
STOP #2 don eisiúint le rith uathoibrithe a tháirgeann fianaise.

## A gclúdaíonn sé

| Sraith                        | A seiceálann sé                                                                                                                                                                                                        | Cur chun feidhme                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — sláinte/cothroime        | Freagraíonn `/api/monitoring/health` le `200`, le `status: "healthy"` agus leis an leagan a bhfuiltear ag súil leis                                                                                                    | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — eochair shealadach      | Logáil isteach riarthóra → cruthaíonn `POST /api/keys` eochair API atá scóipithe don rith, agus cúlghairtear í (`DELETE /api/keys/:id`) i mbloc `finally` beag beann ar an toradh                                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — dromchla API            | Catalóg `/v1/models`, comhlánú comhrá fíor neamhshruthaithe (samhail atá ríthábhachtach don tsraith, `max_tokens: 5`), freagra `401` ar eochair neamhbhailí, agus `/api/monitoring/health` poiblí                      | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — sruthú SSE              | Comhlánú comhrá fíorshruthaithe; deimhnítear `text/event-stream`, deilt inneachair amháin ar a laghad, agus críochnaitheoir `[DONE]`                                                                                   | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — fíorsholáthraithe        | Iarratas comhrá amháin ar íoschostas in aghaidh gach soláthraí chriticiúil atá i gcatalóg bheo `/v1/models`, ginte ar an toirt trí promptfoo                                                                           | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — fíordheimhniú UI        | Logálann sé isteach uair amháin tríd an bhfíorfhoirm logála isteach agus athúsáideann sé an seisiún (`storageState`) ar fud shraith an UI                                                                              | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — bealaí UI               | Lódálann gach `page.tsx` statach faoi `src/app/(dashboard)/dashboard` (aimsithe ón gcóras comhad, agus bealaí dinimiciúla `[param]` gan bacadh leo) gan earráid HTTP, earráid leathanaigh ná teorainn earráide Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — sreabhadh criticiúil UI | Cruthaíonn sé eochair API trí UI an deais agus cúlghaireann sé arís í (ní fhágann sé aon iarmhar ar an VPS)                                                                                                            | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — tuarascáil aontaithe     | Cumascann sé httpYac (trí `junit-to-ctrf`), an cuibheoir promptfoo→CTRF, agus tuairisceoir CTRF Playwright in aon `homolog-ctrf.json` amháin, chomh maith le `homolog-report/summary.md` atá soléite ag daoine         | `scripts/homolog/run.mjs`                                                     |

Níl baint ar bith ag LLM leis an athsheinm féin — is ceallra aischéimnithe cinntitheach é seo,
ní meastóireacht. Ní bheidh baint ag AI ach le hobair chothabhála amach anseo (féach an Treochlár thíos).

## Réamhriachtanais

1. Cóipeáil `.env.homolog.example` go `.env.homolog` (déanann git neamhaird de — ná déan commit air riamh) agus líon isteach:
   - `HOMOLOG_BASE_URL` — an sprioc-imscaradh, e.g. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — pasfhocal bainistíochta an deais don imscaradh sin.
   - `HOMOLOG_CRITICAL_PROVIDERS` — réimíreanna soláthraithe scartha le camóga a fhaigheann fíor-iarratas
     comhrá tástála deataigh (e.g. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — fág folamh é i ngnáthrithí; cruthaíonn agus cúlghairmeann an tsraith a
     heochair ghearrshaolach féin. Ná socraigh é seo ach amháin chun sraith aonair a dhífhabhtú ina haonar.
2. `npm install` sa stór (is devDependencies rialta iad spleáchais na sraithe — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf`).
3. `npx playwright install` mura bhfuil dénártha an bhrabhsálaí ann cheana féin.

## Conas é a rith

```bash
npm run homolog
```

Chun bailíochtú a dhéanamh i gcoinne imscartha nach ionann a leagan agus an `package.json`
áitiúil (e.g. bosca homalógaithe atá fós ar eisiúint paiste roimhe seo), sáraigh an leagan
ionchais go sainráite:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Críochnaíonn an rith le cód neamh-nialasach má theipeann ar aon chiseal, agus déanann sé iarracht i gcónaí an eochair
API ghearrshaolach a chruthaigh sé a chúlghairm, fiú má theipeann air (bloc `finally` in `scripts/homolog/run.mjs`).

## An tuairisc a léamh

Cuirtear an t-aschur ar fad in `homolog-report/` (déanann git neamhaird de):

- `summary.md` — an tábla céanna a phriontáiltear chuig stdout, ró amháin in aghaidh na sraithe (✅/❌ + mionsonraí).
- `homolog-ctrf.json` — an tuairisc aontaithe CTRF (cumasc de thorthaí API/SSE, tástáil deataigh soláthraithe, agus
  UI) — seo an déantán le ceangal le seicliosta STOP #2 d’eisiúint.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — na
  tuairiscí amha/idirmheánacha de réir sraithe.
- `promptfooconfig.yaml`, `provider-misses.json` — an chumraíocht promptfoo a gineadh don
  rith reatha agus aon soláthraithe criticiúla a bhí ar iarraidh ón gcatalóg bheo.

Cuireann teip L0 deireadh leis láithreach (ní chruthaítear eochair ghearrshaolach) ós rud é go gciallaíonn neamhréir leagain/sláinte
go mbeadh gach ciseal iartheachtach ag bailíochtú an imscartha mhícheart.

## Athshocrú na bonnlíne nuair a athraíonn an UI go dlisteanach

Tá L4b (tástáil deataigh bealaigh) agus L4c (sreabhadh UI eochrach API) á dtiomáint ag fíor-aimsitheoirí DOM, ní ag
gabhálacha, mar sin ní bhíonn nuashonrú ar bith ar an tsraith de dhíth i gcás fhormhór na n-athruithe dlisteanacha ar an UI. Nuair a
bhriseann athrú aimsitheoir (e.g. lipéad athainmnithe ar chnaipe nó leathanach socruithe bogtha):

1. Athdhearbhaigh an t-aimsitheoir i gcoinne na foinse reatha (tá doiciméadú déanta sna sonraíochtaí cheana féin ar an
   gcomhad/líne ar deimhníodh gach aimsitheoir ina coinne — lean an patrún céanna, ná déan tomhas).
2. Nuashonraigh an tsonraíocht in `tests/homolog/ui/`.
3. Athrith `npm run homolog` (nó an tsonraíocht Playwright lena mbaineann amháin) i gcoinne an VPS chun
   an ceartúchán a dheimhniú, ansin déan commit.

Níl aon bhonnlíne amhairc/picteilíní sa tsraith seo (F1) — féach an Treochlár chuige sin.

## Treochlár (F2 / F3)

Tá an dearadh agus an rolladh amach céimneach sa tsonraíocht phleanála inmheánach
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (gan nasc — déantán inmheánach
`_tasks/`, nach cuid de dhoiciméid rianaithe an stóir seo é). Achoimre:

- **F2** — taifeadadh iomlán den tsiúlóid → athraíonn Playwright Test Agents (`planner`/`generator`)
  é ina shonraíochtaí sreafa (cruthaigh teaglaim, tástáil soláthraí, cuir socruithe in eagar, uirlisí MCP) +
  bonnlíne aischéimnithe amhairc (Lost Pixel) le maisc thar shonraí dinimiciúla (méadrachtaí,
  stampaí ama, logaí) + gnáthamh cothabhála `healer` in aghaidh na heisiúna.
- **F3** — clúdach athléimneachta/conartha/sreangaithe: toxiproxy + soláthraí bréige atá comhoiriúnach le OpenAI
  ar an devbox, teaglaim `homolog-resilience` ar an VPS atá dírithe air
  (aga istigh insteallta → deimhnigh cúltaca + scoradán ciorcaid oscailte/dúnta trí
  `/api/monitoring/health`); tástáil chonartha gheataithe Schemathesis i gcoinne
  `docs/openapi.yaml` (`--max-examples` íseal, síolta fosaithe, críochphointí neamh-LLM amháin); agus
  sreangú `npm run homolog` + a `summary.md` isteach sa chéim STOP #2 de `/generate-release`.
