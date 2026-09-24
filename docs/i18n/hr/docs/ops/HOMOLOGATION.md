# Homologation Suite (`npm run homolog`) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E validacija u stvarnom okruženju za OmniRoute implementaciju koja se izvodi na homologacijskom VPS-u
(`HOMOLOG_BASE_URL`, npr. `http://192.168.0.15:20128`). Jedna naredba zamjenjuje ručni
kontrolni popis izdanja STOP #2 automatiziranim izvođenjem koje generira dokaze.

## Što obuhvaća

| Sloj                      | Što provjerava                                                                                                                                                                                                           | Implementacija                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — stanje/paritet       | `/api/monitoring/health` odgovara statusom `200`, uz `status: "healthy"` i očekivanu verziju                                                                                                                             | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — privremeni ključ    | Prijava administratora → `POST /api/keys` stvara API ključ ograničenog opsega za izvođenje, koji se opoziva (`DELETE /api/keys/:id`) u bloku `finally` bez obzira na ishod                                               | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API sučelje         | Katalog `/v1/models`, stvarni nestrujajući dovršetak razgovora (model kritičan za razinu, `max_tokens: 5`), odgovor `401` za nevažeći ključ i javna krajnja točka `/api/monitoring/health`                               | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE strujanje       | Stvarni strujajući dovršetak razgovora; potvrđuje `text/event-stream`, barem jednu deltu sadržaja i završnu oznaku `[DONE]`                                                                                              | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — stvarni pružatelji   | Jedan zahtjev za razgovor uz minimalan trošak za svakog kritičnog pružatelja prisutnog u aktivnom katalogu `/v1/models`, generiran u hodu pomoću promptfoo                                                               | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikacija  | Jednokratno se prijavljuje putem stvarnog obrasca za prijavu i ponovno upotrebljava sesiju (`storageState`) u cijelom UI sloju                                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI rute             | Svaki statički `page.tsx` unutar `src/app/(dashboard)/dashboard` (otkriven iz datotečnog sustava, uz preskakanje dinamičkih ruta `[param]`) učitava se bez HTTP pogreške, pogreške stranice ili Next.js granice pogreške | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritični UI tijek   | Stvara API ključ putem nadzorne ploče i zatim ga ponovno opoziva (ne ostavlja ostatke na VPS-u)                                                                                                                          | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — objedinjeno izvješće | Spaja httpYac (putem `junit-to-ctrf`), prilagodnik promptfoo→CTRF i Playwright CTRF reporter u jednu datoteku `homolog-ctrf.json`, uz čitljiv sažetak `homolog-report/summary.md`                                        | `scripts/homolog/run.mjs`                                                     |

Nema uključivanja LLM-a u samo ponovno izvođenje — ovo je deterministički skup regresijskih testova,
a ne evaluacija. AI se uključuje samo u buduće održavanje (pogledajte Plan razvoja u nastavku).

## Preduvjeti

1. Kopirajte `.env.homolog.example` u `.env.homolog` (git ga ignorira — nikada ga nemojte commitati) i ispunite:
   - `HOMOLOG_BASE_URL` — ciljni deployment, npr. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — lozinka za upravljanje nadzornom pločom tog deploymenta.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefiksi pružatelja odvojeni zarezima za koje se šalje stvarni
     smoke zahtjev za chat (npr. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — ostavite prazno pri uobičajenom pokretanju; skup testova stvara i opoziva
     vlastiti privremeni ključ. Postavite ga samo radi izoliranog otklanjanja pogrešaka u pojedinom sloju.
2. Pokrenite `npm install` u repozitoriju (ovisnosti skupa testova — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — uobičajene su devDependencies).
3. Pokrenite `npx playwright install` ako binarne datoteke preglednika još nisu instalirane.

## Kako pokrenuti

```bash
npm run homolog
```

Za provjeru deploymenta čija se verzija ne podudara s lokalnim `package.json`
(npr. homologacijsko okruženje koje još koristi prethodno izdanje zakrpe), izričito nadjačajte očekivanu
verziju:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Pokretanje završava s izlaznim kodom različitim od nule ako bilo koji sloj ne uspije te uvijek pokušava opozvati privremeni
API ključ koji je stvoren, čak i u slučaju neuspjeha (blok `finally` u `scripts/homolog/run.mjs`).

## Čitanje izvještaja

Sav izlaz sprema se u `homolog-report/` (git ga ignorira):

- `summary.md` — ista tablica koja se ispisuje na stdout, s jednim retkom po sloju (✅/❌ + pojedinosti).
- `homolog-ctrf.json` — objedinjeni CTRF izvještaj (spoj rezultata API/SSE testova, smoke testova pružatelja i
  UI testova) — to je artefakt koji treba priložiti kontrolnom popisu STOP #2 za izdanje.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — neobrađeni/posredni izvještaji
  po slojevima.
- `promptfooconfig.yaml`, `provider-misses.json` — generirana promptfoo konfiguracija za
  trenutačno pokretanje i svi kritični pružatelji koji nedostaju u aktivnom katalogu.

Neuspjeh sloja L0 odmah prekida izvođenje (ne stvara se privremeni ključ) jer nepodudaranje verzije ili zdravstvenog stanja
znači da bi svaki sljedeći sloj provjeravao pogrešan deployment.

## Ponovno postavljanje referentnog stanja nakon legitimnih promjena UI-ja

L4b (smoke test ruta) i L4c (UI tijek API ključa) koriste stvarne DOM lokatore, a ne
snimke stanja, pa većina legitimnih promjena UI-ja ne zahtijeva ažuriranje skupa testova. Kada promjena
ipak naruši lokator (npr. preimenovana oznaka gumba ili premještena stranica postavki):

1. Ponovno potvrdite lokator u odnosu na trenutačni izvorni kod (specifikacije već bilježe u kojoj je
   datoteci/retku svaki lokator potvrđen — slijedite isti obrazac, nemojte nagađati).
2. Ažurirajte specifikaciju u `tests/homolog/ui/`.
3. Ponovno pokrenite `npm run homolog` (ili samo zahvaćenu Playwright specifikaciju) na VPS-u kako biste
   potvrdili ispravak, a zatim commitajte promjenu.

Ovaj skup testova nema vizualno/pikselno referentno stanje (F1) — više informacija potražite u Planu razvoja.

## Plan razvoja (F2 / F3)

Dizajn i fazno uvođenje nalaze se u internoj planskoj specifikaciji
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (bez poveznice — interni
artefakt u `_tasks/`, nije dio dokumentacije koja se prati u ovom repozitoriju). Sažetak:

- **F2** — snimanje cijelog postupka → Playwright Test Agents (`planner`/`generator`)
  pretvaraju ga u specifikacije tijekova (stvaranje kombinacije, testiranje pružatelja, uređivanje postavki, MCP alati) +
  referentno stanje za vizualnu regresiju (Lost Pixel) s maskama preko dinamičkih podataka (metrike,
  vremenske oznake, zapisnici) + rutina održavanja `healer` za svako izdanje.
- **F3** — pokrivenost otpornosti/ugovora/povezivanja: toxiproxy + lažni pružatelj kompatibilan s OpenAI-jem
  na razvojnom računalu, kombinacija `homolog-resilience` na VPS-u usmjerena prema njemu
  (umetnuti istek vremena → potvrditi prebacivanje na rezervnu opciju + otvaranje/zatvaranje prekidača strujnog kruga putem
  `/api/monitoring/health`); uvjetovano testiranje ugovora alatom Schemathesis prema
  `docs/openapi.yaml` (nizak `--max-examples`, fiksne početne vrijednosti, samo krajnje točke koje ne koriste LLM); te
  povezivanje naredbe `npm run homolog` i njezina izvještaja `summary.md` s fazom STOP #2 postupka `/generate-release`.
