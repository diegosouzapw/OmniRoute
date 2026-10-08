# Homologation Suite (`npm run homolog`) (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Uthibitishaji wa E2E katika mazingira halisi wa deploy ya OmniRoute inayoendeshwa kwenye VPS ya homologation
(`HOMOLOG_BASE_URL`, kwa mfano `http://192.168.0.15:20128`). Amri moja inachukua nafasi ya orodha hakiki ya
mikono ya release STOP #2 kwa utekelezaji wa kiotomatiki unaozalisha ushahidi.

## Inachojumuisha

| Safu                         | Inachokagua                                                                                                                                                                                                                                 | Utekelezaji                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — afya/ulinganifu         | `/api/monitoring/health` hujibu `200` ikiwa na `status: "healthy"` na toleo linalotarajiwa                                                                                                                                                  | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ufunguo wa muda        | Kuingia kwa msimamizi → `POST /api/keys` huunda ufunguo wa API wenye mawanda maalum kwa utekelezaji, unaobatilishwa (`DELETE /api/keys/:id`) katika block ya `finally` bila kujali matokeo                                                  | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — kiolesura cha API      | Katalogi ya `/v1/models`, ukamilishaji halisi wa gumzo usiotiririshwa (modeli muhimu kwa daraja, `max_tokens: 5`), `401` kwa ufunguo batili, na `/api/monitoring/health` ya umma                                                            | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — utiririshaji wa SSE    | Ukamilishaji halisi wa gumzo unaotiririshwa; huthibitisha `text/event-stream`, angalau delta moja ya maudhui, na kihitimishi cha `[DONE]`                                                                                                   | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — watoa huduma halisi     | Ombi moja la gumzo la gharama ya chini zaidi kwa kila mtoa huduma muhimu aliyepo kwenye katalogi hai ya `/v1/models`, linalozalishwa papo hapo kupitia promptfoo                                                                            | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — uthibitishaji wa UI    | Huingia mara moja kupitia fomu halisi ya kuingia na kutumia tena kipindi (`storageState`) katika safu nzima ya UI                                                                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — njia za UI             | Kila `page.tsx` tuli chini ya `src/app/(dashboard)/dashboard` (iliyogunduliwa kutoka kwenye mfumo wa faili, huku njia badilifu za `[param]` zikiepukwa) hupakia bila hitilafu ya HTTP, hitilafu ya ukurasa, au mpaka wa hitilafu wa Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — mtiririko muhimu wa UI | Huunda ufunguo wa API kupitia UI ya dashibodi na kuubatilisha tena (hauachi masalia kwenye VPS)                                                                                                                                             | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — ripoti iliyounganishwa  | Huunganisha httpYac (kupitia `junit-to-ctrf`), adapta ya promptfoo→CTRF, na kiripoti cha Playwright CTRF kuwa `homolog-ctrf.json` moja, pamoja na `homolog-report/summary.md` inayosomeka kwa binadamu                                      | `scripts/homolog/run.mjs`                                                     |

Hakuna kabisa ushiriki wa LLM katika urudiaji wenyewe — hili ni kundi bainifu la majaribio ya regression,
si tathmini. AI hutumika tu katika kazi za baadaye za matengenezo (tazama Ramani ya Maendeleo hapa chini).

## Masharti ya awali

1. Nakili `.env.homolog.example` hadi `.env.homolog` (imepuuzwa na git — usiwahi kui-commit) na ujaze:
   - `HOMOLOG_BASE_URL` — deployment lengwa, k.m. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — nenosiri la usimamizi wa dashibodi kwa deployment hiyo.
   - `HOMOLOG_CRITICAL_PROVIDERS` — viambishi awali vya watoa huduma vilivyotenganishwa
     kwa koma ambavyo hupokea ombi halisi la gumzo la majaribio ya msingi (k.m. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — iache tupu katika utekelezaji wa kawaida; mkusanyiko huunda na
     kubatilisha ufunguo wake wa muda mfupi. Weka hii tu ili kutatua hitilafu za safu moja kwa kujitegemea.
2. Tekeleza `npm install` kwenye repo (vitegemezi vya mkusanyiko — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — ni devDependencies za kawaida).
3. Tekeleza `npx playwright install` ikiwa faili tekelezi za kivinjari bado hazipo.

## Jinsi ya kuendesha

```bash
npm run homolog
```

Ili kuthibitisha dhidi ya deployment ambayo toleo lake halilingani na `package.json`
ya ndani (k.m. mashine ya homologation ambayo bado ina toleo la awali la kiraka), batilisha
toleo linalotarajiwa moja kwa moja:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Utekelezaji hutoka kwa msimbo usio sifuri ikiwa safu yoyote itashindwa, na kila mara hujaribu kubatilisha
ufunguo wa API wa muda mfupi uliounda, hata unaposhindwa (kizuizi cha `finally` katika `scripts/homolog/run.mjs`).

## Kusoma ripoti

Matokeo yote huwekwa katika `homolog-report/` (imepuuzwa na git):

- `summary.md` — jedwali lilelile linalochapishwa kwenye stdout, safu mlalo moja kwa kila safu (✅/❌ + maelezo).
- `homolog-ctrf.json` — ripoti iliyounganishwa ya CTRF (muunganisho wa matokeo ya API/SSE, majaribio ya
  msingi ya watoa huduma, na UI) — hiki ndicho kipengee cha kuambatisha kwenye orodha hakiki ya STOP #2 ya toleo.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — ripoti
  ghafi/za kati za kila safu.
- `promptfooconfig.yaml`, `provider-misses.json` — usanidi wa promptfoo uliozalishwa kwa
  utekelezaji wa sasa na watoa huduma wowote muhimu ambao hawakuwepo kwenye katalogi ya moja kwa moja.

Kushindwa kwa L0 husitisha mara moja (hakuna ufunguo wa muda mfupi unaoundwa) kwa sababu kutolingana
kwa toleo/afya kunamaanisha kila safu inayofuata ingekuwa ikithibitisha deployment isiyo sahihi.

## Kuweka upya msingi wakati UI inabadilika kihalali

L4b (jaribio la msingi la route) na L4c (mtiririko wa UI wa ufunguo wa API) huendeshwa na vitafutaji halisi vya DOM, si
snapshots, kwa hivyo mabadiliko mengi halali ya UI hayahitaji kusasishwa kwa mkusanyiko. Mabadiliko
yanapoharibu kitafutaji (k.m. lebo ya kitufe iliyopewa jina jipya au ukurasa wa mipangilio uliohamishwa):

1. Thibitisha tena kitafutaji dhidi ya msimbo wa sasa wa chanzo (vipimo tayari vinaandika faili/mstari
   ambao kila kitafutaji kilithibitishwa dhidi yake — fuata mtindo huo huo, usibashiri).
2. Sasisha kipimo katika `tests/homolog/ui/`.
3. Endesha tena `npm run homolog` (au kipimo husika cha Playwright pekee) dhidi ya VPS ili
   kuthibitisha marekebisho, kisha u-commit.

Hakuna msingi wa picha/pikseli katika mkusanyiko huu (F1) — tazama Mpango Elekezi kwa hilo.

## Mpango Elekezi (F2 / F3)

Muundo na utoaji wa hatua kwa hatua unapatikana katika vipimo vya ndani vya upangaji
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (hakuna kiungo — kipengee cha ndani
cha `_tasks/`, si sehemu ya nyaraka zinazofuatiliwa za repo hii). Muhtasari:

- **F2** — kurekodi mchakato kamili → Playwright Test Agents (`planner`/`generator`)
  huubadilisha kuwa vipimo vya mtiririko (kuunda combo, kujaribu mtoa huduma, kuhariri mipangilio, zana za MCP) +
  msingi wa ukaguzi wa mabadiliko ya mwonekano (Lost Pixel) wenye masks juu ya data inayobadilika (metrics,
  mihuri ya muda, kumbukumbu) + utaratibu wa matengenezo wa `healer` kwa kila toleo.
- **F3** — ufunikaji wa ustahimilivu/mkataba/miunganisho: toxiproxy + mtoa huduma bandia anayeendana na OpenAI
  kwenye devbox, combo ya `homolog-resilience` kwenye VPS iliyoelekezwa kwake
  (timeout iliyoingizwa → thibitisha fallback + kufunguka/kufungwa kwa circuit breaker kupitia
  `/api/monitoring/health`); upimaji wa mkataba wa Schemathesis wenye udhibiti dhidi ya
  `docs/openapi.yaml` (`--max-examples` ya chini, seeds zisizobadilika, endpoints zisizo za LLM pekee); na
  kuunganisha `npm run homolog` + `summary.md` yake kwenye awamu ya STOP #2 ya `/generate-release`.
