# Homologation Suite (`npm run homolog`) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

# Homologation Suite (`npm run homolog`)

E2E validacija u stvarnom okruženju OmniRoute deploymenta koji se izvršava na homologacijskom VPS-u (`HOMOLOG_BASE_URL`, npr. `http://192.168.0.15:20128`). Jedna komanda zamjenjuje ručnu kontrolnu listu za izdanje (release) STOP #2 automatizovanim pokretanjem koje generiše dokaze.

## Šta obuhvata

| Sloj                       | Šta provjerava                                                                                                                                                                                                  | Implementacija                                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — zdravlje/paritet      | `/api/monitoring/health` odgovara sa `200` uz `status: "healthy"` i očekivanu verziju                                                                                                                           | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — efemerni ključ       | Admin prijava → `POST /api/keys` kreira API ključ sa ograničenim opsegom za ovo pokretanje, koji se opoziva (`DELETE /api/keys/:id`) u `finally` bloku bez obzira na ishod                                      | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API površina         | `/v1/models` katalog, stvarni chat completion bez streaminga (tier-critical model, `max_tokens: 5`), `401` za nevažeći ključ, i javni `/api/monitoring/health`                                                  | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE streaming        | Stvarni streaming chat completion; potvrđuje `text/event-stream`, barem jedan content delta, i `[DONE]` terminator                                                                                              | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — stvarni provajderi    | Jedan chat zahtjev minimalne cijene po kritičnom provajderu prisutnom u aktivnom `/v1/models` katalogu, generisan u hodu putem promptfoo                                                                        | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI autentifikacija   | Prijavljuje se jednom putem stvarne forme za prijavu i ponovo koristi sesiju (`storageState`) kroz UI sloj                                                                                                      | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI rute              | Svaka statička `page.tsx` unutar `src/app/(dashboard)/dashboard` (otkrivena iz sistema datoteka, dinamičke `[param]` rute su preskočene) se učitava bez HTTP greške, greške stranice ili Next.js error boundary | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI kritični tok      | Kreira API ključ putem dashboard UI-a i ponovo ga opoziva (ne ostavlja tragove na VPS-u)                                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — objedinjeni izvještaj | Spaja httpYac (putem `junit-to-ctrf`), promptfoo→CTRF adapter i Playwright CTRF reporter u jedan `homolog-ctrf.json`, uz čitljiv izvještaj `homolog-report/summary.md`                                          | `scripts/homolog/run.mjs`                                                     |

Bez uključenosti LLM-a u samom ponovnom izvršavanju — ovo je deterministički set regresionih testova, a ne evaluacija. AI se uključuje samo u budućem radu na održavanju (pogledajte Roadmap ispod).

## Preduslovi

1. Kopirajte `.env.homolog.example` u `.env.homolog` (gitignored — nikada ga ne commit-ujte) i popunite:
   - `HOMOLOG_BASE_URL` — ciljni deploy, npr. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — administratorska lozinka kontrolne table za taj deploy.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefiksi provajdera razdvojeni zarezima koji dobijaju pravi smoke chat zahtjev (npr. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — ostavite prazno pri normalnom pokretanju; paket kreira i opoziva svoj efemerni ključ. Postavite ovo samo za debagovanje jednog sloja izolovano.
2. `npm install` u repozitorijumu (zavisnosti paketa — `httpyac`, `promptfoo`, `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — su regularne devDependencies).
3. `npx playwright install` ako binarni fajlovi pretraživača već nisu prisutni.

## Kako pokrenuti

```bash
npm run homolog
```

Za validaciju protiv deploy-a čija se verzija ne poklapa sa lokalnim `package.json` (npr. homologaciona kutija koja je još uvijek na prethodnom patch izdanju), eksplicitno nadjačajte očekivanu verziju:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Pokretanje se završava sa non-zero statusom ako bilo koji sloj ne uspije, i uvijek pokušava opozvati efemerni API ključ koji je kreirao, čak i u slučaju neuspjeha (`finally` blok u `scripts/homolog/run.mjs`).

## Čitanje izvještaja

Sav izlaz završava u `homolog-report/` (gitignored):

- `summary.md` — ista tabela odštampana na stdout, jedan red po sloju (✅/❌ + detalji).
- `homolog-ctrf.json` — objedinjeni CTRF izvještaj (spoj API/SSE, provider-smoke i UI rezultata) — ovo je artefakt koji treba priložiti uz STOP #2 kontrolnu listu izdanja.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — sirovi/međurezultati izvještaji po slojevima.
- `promptfooconfig.yaml`, `provider-misses.json` — generisana promptfoo konfiguracija za trenutno pokretanje i svi kritični provajderi koji su nedostajali u katalogu uživo.

Neuspješan L0 se odmah prekida (ne kreira se efemerni ključ) jer neusklađenost verzije/zdravlja znači da bi svaki nizvodni sloj validirao pogrešan deploy.

## Ponovno bazeliranje kada se UI legitimno promijeni

L4b (route smoke) i L4c (API-key UI flow) su vođeni stvarnim DOM lokatorima, a ne snapshot-ovima, tako da većina legitimnih UI promjena ne zahtijeva ažuriranje paketa. Kada promjena pokvari lokator (npr. preimenovana oznaka dugmeta ili premještena stranica sa postavkama):

1. Ponovo potvrdite lokator u odnosu na trenutni izvor (specifikacije već dokumentuju koji fajl/linija je potvrđena za svaki lokator — pratite isti obrazac, nemojte nagađati).
2. Ažurirajte specifikaciju u `tests/homolog/ui/`.
3. Ponovo pokrenite `npm run homolog` (ili samo pogođenu Playwright specifikaciju) protiv VPS-a da potvrdite popravku, a zatim commit-ujte.

U ovom paketu ne postoji vizuelna/piksel bazna linija (F1) — pogledajte Roadmap za to.

## Roadmap (F2 / F3)

Dizajn i fazno uvođenje se nalaze u internoj specifikaciji planiranja `_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (nije povezano — interni `_tasks/` artefakt, nije dio dokumentacije koju prati ovaj repozitorijum). Rezime:

- **F2** — snimanje potpunog prolaza → Playwright Test Agents (`planner`/`generator`) pretvaraju ga u specifikacije toka (kreiranje kombinacije, testiranje provajdera, uređivanje postavki, MCP alati) + vizuelna regresiona bazna linija (Lost Pixel) sa maskama preko dinamičkih podataka (metrike, vremenske oznake, logovi) + `healer` rutina održavanja po izdanju.
- **F3** — pokrivenost otpornosti/ugovora/povezivanja: toxiproxy + lažni OpenAI-kompatibilni provajder na devbox-u, `homolog-resilience` kombinacija na VPS-u usmjerena na njega (injektovani timeout → assert fallback + otvaranje/zatvaranje prekidača strujnog kola putem `/api/monitoring/health`); gated Schemathesis testiranje ugovora protiv `docs/openapi.yaml` (niski `--max-examples`, fiksni seed-ovi, samo non-LLM krajnje tačke); i povezivanje `npm run homolog` + njegovog `summary.md` u `/generate-release` STOP #2 fazu.
