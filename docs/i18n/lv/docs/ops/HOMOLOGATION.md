# Homologation Suite (`npm run homolog`) (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

OmniRoute izvietojuma reālās vides E2E validācija, kas darbojas homologācijas VPS
(`HOMOLOG_BASE_URL`, piem., `http://192.168.0.15:20128`). Viena komanda aizstāj manuālo
laidiena STOP #2 kontrolsarakstu ar automatizētu izpildi, kas ģenerē pierādījumus.

## Ko tā aptver

| Slānis                   | Ko tas pārbauda                                                                                                                                                                                          | Implementācija                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — darbspēja/paritāte  | `/api/monitoring/health` atbild ar `200`, `status: "healthy"` un paredzēto versiju                                                                                                                       | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — īslaicīga atslēga  | Administratora pieteikšanās → `POST /api/keys` izveido šai izpildei ierobežota tvēruma API atslēgu, kas neatkarīgi no rezultāta tiek atsaukta (`DELETE /api/keys/:id`) `finally` blokā                   | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API virsma         | `/v1/models` katalogs, reāla nestraumēta tērzēšanas pabeigšana (līmenim kritisks modelis, `max_tokens: 5`), nederīgas atslēgas `401` un publisks `/api/monitoring/health`                                | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE straumēšana    | Reāla straumēta tērzēšanas pabeigšana; pārbauda `text/event-stream`, vismaz vienu satura izmaiņu un `[DONE]` terminatoru                                                                                 | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — reāli nodrošinātāji | Viens minimālu izmaksu tērzēšanas pieprasījums katram kritiskajam nodrošinātājam, kas ir pieejams aktīvajā `/v1/models` katalogā un tiek dinamiski ģenerēts, izmantojot promptfoo                        | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikācija | Vienreiz piesakās, izmantojot īsto pieteikšanās veidlapu, un atkārtoti izmanto sesiju (`storageState`) visā UI slānī                                                                                     | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI maršruti        | Katra statiskā `page.tsx` zem `src/app/(dashboard)/dashboard` (atrasta failu sistēmā; dinamiskie `[param]` maršruti tiek izlaisti) tiek ielādēta bez HTTP kļūdas, lapas kļūdas vai Next.js kļūdu robežas | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritiskā UI plūsma | Izveido API atslēgu, izmantojot informācijas paneļa UI, un pēc tam to atsauc (VPS nepaliek atlikumi)                                                                                                     | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — vienotais pārskats  | Apvieno httpYac (izmantojot `junit-to-ctrf`), promptfoo→CTRF adapteri un Playwright CTRF ziņotāju vienā `homolog-ctrf.json`, kā arī cilvēkam lasāmā `homolog-report/summary.md`                          | `scripts/homolog/run.mjs`                                                     |

Pašā atkārtotajā izpildē LLM netiek izmantots — šis ir deterministisks regresijas testu komplekts,
nevis novērtējums. MI tiek izmantots tikai turpmākajos uzturēšanas darbos (skatiet zemāk esošo ceļvedi).

## Priekšnosacījumi

1. Nokopējiet `.env.homolog.example` uz `.env.homolog` (git ignorēts — nekad neiekļaujiet to komitā) un aizpildiet:
   - `HOMOLOG_BASE_URL` — mērķa izvietojums, piem., `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — šī izvietojuma informācijas paneļa pārvaldības parole.
   - `HOMOLOG_CRITICAL_PROVIDERS` — ar komatiem atdalīti pakalpojumu sniedzēju prefiksi, kuriem tiek veikts reāls
     tērzēšanas dūmu tests (piem., `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — parastās izpildēs atstājiet tukšu; testu komplekts izveido un atsauc pats savu
     īslaicīgo atslēgu. Iestatiet to tikai, lai atkļūdotu vienu slāni izolēti.
2. Izpildiet `npm install` repozitorijā (testu komplekta atkarības — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — ir parastas devDependencies).
3. Izpildiet `npx playwright install`, ja pārlūkprogrammu binārie faili vēl nav pieejami.

## Kā palaist

```bash
npm run homolog
```

Lai veiktu validāciju pret izvietojumu, kura versija neatbilst vietējam `package.json`
(piem., homologācijas vide joprojām izmanto iepriekšējo ielāpa laidienu), skaidri norādiet sagaidāmo
versiju:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Izpilde beidzas ar kodu, kas nav nulle, ja kāds slānis neizdodas, un vienmēr mēģina atsaukt izveidoto īslaicīgo
API atslēgu pat kļūmes gadījumā (`finally` bloks failā `scripts/homolog/run.mjs`).

## Atskaites lasīšana

Visa izvade tiek saglabāta mapē `homolog-report/` (git ignorēta):

- `summary.md` — tā pati tabula, kas izdrukāta standarta izvadē, ar vienu rindu katram slānim (✅/❌ + detalizēta informācija).
- `homolog-ctrf.json` — vienotā CTRF atskaite (API/SSE, pakalpojumu sniedzēju dūmu testu un
  UI rezultātu apvienojums) — šis ir artefakts, kas jāpievieno laidiena STOP #2 kontrolsarakstam.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — katra
  slāņa neapstrādātās/starpposma atskaites.
- `promptfooconfig.yaml`, `provider-misses.json` — pašreizējai izpildei ģenerētā promptfoo konfigurācija un
  visi kritiskie pakalpojumu sniedzēji, kuru nebija aktīvajā katalogā.

L0 kļūme nekavējoties pārtrauc izpildi (īslaicīga atslēga netiek izveidota), jo versijas/veselības
statusa neatbilstība nozīmē, ka katrs nākamais slānis validētu nepareizo izvietojumu.

## Bāzes atjaunināšana pēc pamatotām UI izmaiņām

L4b (maršrutu dūmu tests) un L4c (API atslēgas UI plūsma) izmanto reālus DOM lokatorus, nevis
momentuzņēmumus, tāpēc lielākajai daļai pamatotu UI izmaiņu nav nepieciešama testu komplekta atjaunināšana. Ja izmaiņas
tomēr salauž lokatoru (piem., pārdēvēta pogas etiķete vai pārvietota iestatījumu lapa):

1. Atkārtoti pārbaudiet lokatoru pret pašreizējo pirmkodu (specifikācijās jau ir dokumentēts, pret kuru
   failu/rindu katrs lokators tika pārbaudīts — izmantojiet to pašu pieeju, neminiet).
2. Atjauniniet specifikāciju mapē `tests/homolog/ui/`.
3. Atkārtoti palaidiet `npm run homolog` (vai tikai ietekmēto Playwright specifikāciju) pret VPS, lai
   apstiprinātu labojumu, un pēc tam izveidojiet komitu.

Šajā testu komplektā nav vizuālās/pikseļu bāzes (F1) — informāciju par to skatiet ceļvedī.

## Ceļvedis (F2 / F3)

Dizains un pakāpeniskās ieviešanas plāns atrodas iekšējā plānošanas specifikācijā
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (saite nav pievienota — iekšējs
`_tasks/` artefakts, kas neietilpst šī repozitorija izsekotajā dokumentācijā). Kopsavilkums:

- **F2** — pilnas darbplūsmas ierakstīšana → Playwright Test Agents (`planner`/`generator`)
  pārvērš to plūsmu specifikācijās (izveidot kombināciju, testēt pakalpojumu sniedzēju, rediģēt iestatījumus, MCP rīki) +
  vizuālās regresijas bāze (Lost Pixel) ar maskām pār dinamiskiem datiem (metrika,
  laikspiedoli, žurnāli) + `healer` uzturēšanas procedūra katram laidienam.
- **F3** — noturības/līgumu/savienojumu pārklājums: toxiproxy + viltus ar OpenAI saderīgs
  pakalpojumu sniedzējs izstrādes vidē, `homolog-resilience` kombinācija VPS vidē, kas uz to norāda
  (ievadīta taimauta kļūme → pārbaudīt pārslēgšanos uz rezerves variantu + ķēdes pārtraucēja atvēršanu/aizvēršanu, izmantojot
  `/api/monitoring/health`); kontrolēta Schemathesis līgumu testēšana pret
  `docs/openapi.yaml` (zems `--max-examples`, fiksētas sākumvērtības, tikai galapunkti bez LLM); un
  `npm run homolog` + tā `summary.md` integrēšana `/generate-release` STOP #2 posmā.
