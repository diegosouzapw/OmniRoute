# Homologation Suite (`npm run homolog`) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Pagpapatunay na E2E sa tunay na environment ng OmniRoute deploy na tumatakbo sa homologation VPS
(`HOMOLOG_BASE_URL`, hal. `http://192.168.0.15:20128`). Pinapalitan ng isang command ang manu-manong
release STOP #2 checklist ng isang automated na pagtakbong gumagawa ng ebidensya.

## Ano ang saklaw nito

| Layer                      | Ano ang sinusuri nito                                                                                                                                                                                                                 | Implementasyon                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — kalusugan/parity      | Tumutugon ang `/api/monitoring/health` ng `200` na may `status: "healthy"` at ang inaasahang bersyon                                                                                                                                  | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — pansamantalang key   | Admin login → Lumilikha ang `POST /api/keys` ng scoped API key para sa pagtakbo, na nire-revoke (`DELETE /api/keys/:id`) sa isang `finally` block anuman ang kalabasan                                                                | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API surface          | Catalog ng `/v1/models`, isang tunay na non-streaming chat completion (tier-critical na model, `max_tokens: 5`), isang invalid-key na `401`, at pampublikong `/api/monitoring/health`                                                 | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE streaming        | Tunay na streaming chat completion; tinitiyak ang `text/event-stream`, kahit isang content delta, at isang `[DONE]` terminator                                                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — mga tunay na provider | Isang chat request na may pinakamababang gastos para sa bawat critical provider na nasa live na catalog ng `/v1/models`, na awtomatikong binubuo sa pamamagitan ng promptfoo                                                          | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI auth              | Isang beses na nagla-log in sa pamamagitan ng tunay na login form at muling ginagamit ang session (`storageState`) sa buong UI layer                                                                                                  | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — mga UI route         | Bawat static na `page.tsx` sa ilalim ng `src/app/(dashboard)/dashboard` (natutuklasan mula sa filesystem, nilalaktawan ang mga dynamic na `[param]` route) ay naglo-load nang walang HTTP error, page error, o Next.js error boundary | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritikal na UI flow  | Lumilikha ng API key sa pamamagitan ng dashboard UI at muli itong nire-revoke (walang iniiwang residue sa VPS)                                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — pinag-isang ulat      | Pinagsasama ang httpYac (sa pamamagitan ng `junit-to-ctrf`), ang promptfoo→CTRF adapter, at ang Playwright CTRF reporter sa isang `homolog-ctrf.json`, kasama ang madaling basahing `homolog-report/summary.md`                       | `scripts/homolog/run.mjs`                                                     |

Walang paglahok ng LLM sa mismong replay — isa itong deterministic na regression battery,
hindi isang eval. Papasok lamang ang AI sa mga gawain sa maintenance sa hinaharap (tingnan ang Roadmap sa ibaba).

## Mga Kinakailangan

1. Kopyahin ang `.env.homolog.example` bilang `.env.homolog` (gitignored — huwag itong i-commit kailanman) at punan ang:
   - `HOMOLOG_BASE_URL` — ang target na deploy, hal. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — ang password sa pamamahala ng dashboard para sa deploy na iyon.
   - `HOMOLOG_CRITICAL_PROVIDERS` — mga prefix ng provider na pinaghihiwalay ng kuwit na makakatanggap ng totoong
     smoke chat request (hal. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — iwang walang laman sa mga normal na pagpapatakbo; gumagawa at nagre-revoke ang suite ng
     sarili nitong pansamantalang key. Itakda lamang ito upang i-debug ang isang layer nang nakahiwalay.
2. Patakbuhin ang `npm install` sa repo (ang mga dependency ng suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — ay mga karaniwang devDependencies).
3. Patakbuhin ang `npx playwright install` kung wala pa ang mga binary ng browser.

## Paano patakbuhin

```bash
npm run homolog
```

Upang mag-validate laban sa isang deploy na ang bersyon ay hindi tumutugma sa lokal na `package.json`
(hal. isang homologation box na nasa nakaraang patch release pa rin), tahasang i-override ang inaasahang
bersyon:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Magtatapos ang pagpapatakbo nang may non-zero exit code kung mabigo ang anumang layer, at palagi nitong susubukang i-revoke ang pansamantalang
API key na ginawa nito, kahit may pagkabigo (`finally` block sa `scripts/homolog/run.mjs`).

## Pagbasa sa ulat

Mapupunta ang lahat ng output sa `homolog-report/` (gitignored):

- `summary.md` — ang parehong talahanayang ini-print sa stdout, isang row bawat layer (✅/❌ + detalye).
- `homolog-ctrf.json` — ang pinag-isang CTRF report (pinagsamang mga resulta ng API/SSE, provider-smoke, at
  UI) — ito ang artifact na ilalakip sa checklist ng STOP #2 para sa isang release.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — ang mga
  raw/intermediate report ng bawat layer.
- `promptfooconfig.yaml`, `provider-misses.json` — ang nabuong promptfoo config para sa
  kasalukuyang pagpapatakbo at anumang kritikal na provider na nawawala sa live catalog.

Kapag nabigo ang L0, agad itong hihinto (walang gagawing pansamantalang key) dahil ang hindi pagtutugma ng bersyon/health
ay nangangahulugang mava-validate ng bawat kasunod na layer ang maling deploy.

## Muling pagtatakda ng baseline kapag may lehitimong pagbabago sa UI

Ang L4b (route smoke) at L4c (API-key UI flow) ay pinapatakbo ng mga tunay na DOM locator, hindi ng
mga snapshot, kaya karamihan ng mga lehitimong pagbabago sa UI ay hindi nangangailangan ng anumang update sa suite. Kapag
nasira ng isang pagbabago ang isang locator (hal. isang pinalitang pangalan ng label ng button o isang inilipat na settings page):

1. Muling kumpirmahin ang locator laban sa kasalukuyang source (nakadokumento na sa mga spec kung sa aling
   file/line kinumpirma ang bawat locator — sundin ang parehong pattern, huwag manghula).
2. I-update ang spec sa `tests/homolog/ui/`.
3. Muling patakbuhin ang `npm run homolog` (o ang apektadong Playwright spec lamang) laban sa VPS upang
   kumpirmahin ang pag-aayos, pagkatapos ay i-commit.

Walang visual/pixel baseline sa suite na ito (F1) — tingnan ang Roadmap para rito.

## Roadmap (F2 / F3)

Ang disenyo at yugto-yugtong rollout ay nasa internal planning spec na
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (walang link — internal na
`_tasks/` artifact, hindi bahagi ng mga tracked doc ng repo na ito). Buod:

- **F2** — buong pag-record ng walkthrough → iko-convert ito ng Playwright Test Agents (`planner`/`generator`)
  sa mga flow spec (gumawa ng combo, subukan ang provider, i-edit ang settings, MCP tools) +
  visual regression baseline (Lost Pixel) na may mga mask sa dynamic na data (metrics,
  timestamps, logs) + isang `healer` maintenance routine sa bawat release.
- **F3** — saklaw para sa resilience/contract/wiring: toxiproxy + isang pekeng OpenAI-compatible
  na provider sa devbox, isang `homolog-resilience` combo sa VPS na nakaturo rito
  (injected timeout → tiyaking gagana ang fallback + pagbukas/pagsara ng circuit breaker sa pamamagitan ng
  `/api/monitoring/health`); gated na Schemathesis contract testing laban sa
  `docs/openapi.yaml` (mababang `--max-examples`, mga fixed seed, mga non-LLM endpoint lamang); at
  pag-wire ng `npm run homolog` + ng `summary.md` nito sa yugto ng STOP #2 ng `/generate-release`.
