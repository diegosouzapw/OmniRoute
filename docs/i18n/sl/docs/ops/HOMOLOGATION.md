# Homologation Suite (`npm run homolog`) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validacija E2E v realnem okolju za uvedbo OmniRoute, ki teče na homologacijskem VPS-ju
(`HOMOLOG_BASE_URL`, npr. `http://192.168.0.15:20128`). En ukaz nadomesti ročni
kontrolni seznam za STOP #2 izdaje z avtomatiziranim zagonom, ki ustvari dokazila.

## Kaj zajema

| Plast                                       | Kaj preverja                                                                                                                                                                                                   | Implementacija                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — zdravje/pariteta                       | `/api/monitoring/health` odgovori z `200`, s `status: "healthy"` in pričakovano različico                                                                                                                      | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — začasni ključ                         | Prijava skrbnika → `POST /api/keys` ustvari API-ključ z omejenim obsegom za ta zagon, ki se prekliče (`DELETE /api/keys/:id`) v bloku `finally` ne glede na izid                                               | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — površina API-ja                       | Katalog `/v1/models`, resnična pretočna dokončitev klepeta brez pretakanja (model, ključen za raven, `max_tokens: 5`), odziv `401` za neveljaven ključ in javna pot `/api/monitoring/health`                   | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — pretakanje SSE                        | Resnična pretočna dokončitev klepeta; preveri `text/event-stream`, vsaj eno vsebinsko razliko in zaključni označevalec `[DONE]`                                                                                | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — resnični ponudniki                     | Ena zahteva za klepet z minimalnimi stroški za vsakega kritičnega ponudnika, prisotnega v aktivnem katalogu `/v1/models`, sproti ustvarjena prek promptfoo                                                     | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — overjanje uporabniškega vmesnika      | Enkratna prijava prek dejanskega prijavnega obrazca in ponovna uporaba seje (`storageState`) v celotni plasti uporabniškega vmesnika                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — poti uporabniškega vmesnika           | Vsaka statična datoteka `page.tsx` pod `src/app/(dashboard)/dashboard` (odkrita v datotečnem sistemu; dinamične poti `[param]` so preskočene) se naloži brez napake HTTP, napake strani ali meje napak Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — kritični potek uporabniškega vmesnika | Ustvari API-ključ prek nadzorne plošče uporabniškega vmesnika in ga nato znova prekliče (na VPS-ju ne pusti ostankov)                                                                                          | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — enotno poročilo                        | Združi httpYac (prek `junit-to-ctrf`), pretvornik promptfoo→CTRF in poročevalnik Playwright CTRF v eno datoteko `homolog-ctrf.json` ter človeku berljivo datoteko `homolog-report/summary.md`                  | `scripts/homolog/run.mjs`                                                     |

Pri samem ponovnem izvajanju LLM sploh ni vključen — to je determinističen nabor regresijskih preizkusov,
ne evalvacija. UI se uporabi samo pri prihodnjem vzdrževalnem delu (glejte spodnji načrt).

## Predpogoji

1. Kopirajte `.env.homolog.example` v `.env.homolog` (git ga prezre — nikoli ga ne potrdite v repozitorij) in izpolnite:
   - `HOMOLOG_BASE_URL` — ciljna uvedba, npr. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — geslo za upravljanje nadzorne plošče te uvedbe.
   - `HOMOLOG_CRITICAL_PROVIDERS` — z vejicami ločene predpone ponudnikov, ki prejmejo pravo
     zahtevo za hitri preizkus klepeta (npr. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — pri običajnih zagonih pustite prazno; zbirka preizkusov ustvari in prekliče
     lasten začasni ključ. Nastavite ga le za ločeno razhroščevanje posamezne plasti.
2. Zaženite `npm install` v repozitoriju (odvisnosti zbirke preizkusov — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — so običajne devDependencies).
3. Zaženite `npx playwright install`, če binarne datoteke brskalnikov še niso nameščene.

## Kako zagnati

```bash
npm run homolog
```

Za preverjanje glede na uvedbo, katere različica se ne ujema z lokalno datoteko `package.json`
(npr. homologacijsko okolje, ki še vedno uporablja prejšnjo popravljeno izdajo), izrecno
preglasite pričakovano različico:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Zagon se konča z neničelno izhodno kodo, če katera koli plast ne uspe, in vedno poskuša preklicati ustvarjeni
začasni ključ API, tudi ob neuspehu (blok `finally` v `scripts/homolog/run.mjs`).

## Branje poročila

Vsi rezultati se shranijo v `homolog-report/` (git ga prezre):

- `summary.md` — ista tabela, izpisana v stdout, z eno vrstico na plast (✅/❌ + podrobnosti).
- `homolog-ctrf.json` — enotno poročilo CTRF (združitev rezultatov API/SSE, hitrih preizkusov ponudnikov in
  uporabniškega vmesnika) — to je artefakt, ki ga je treba priložiti kontrolnemu seznamu STOP #2 za izdajo.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — neobdelana/vmesna
  poročila posameznih plasti.
- `promptfooconfig.yaml`, `provider-misses.json` — ustvarjena konfiguracija promptfoo za
  trenutni zagon in vsi kritični ponudniki, ki manjkajo v aktivnem katalogu.

Neuspeh L0 takoj prekine izvajanje (začasni ključ ni ustvarjen), saj neujemanje različice/stanja
pomeni, da bi vsaka nadaljnja plast preverjala napačno uvedbo.

## Ponovna določitev izhodiščnega stanja ob upravičenih spremembah uporabniškega vmesnika

L4b (hitri preizkus poti) in L4c (potek uporabniškega vmesnika za ključ API) uporabljata dejanske lokatorje DOM, ne
posnetkov, zato večina upravičenih sprememb uporabniškega vmesnika ne zahteva posodobitve zbirke preizkusov. Ko sprememba
vendarle pokvari lokator (npr. preimenovana oznaka gumba ali premaknjena stran z nastavitvami):

1. Ponovno preverite lokator glede na trenutno izvorno kodo (specifikacije že dokumentirajo,
   glede na katero datoteko/vrstico je bil posamezni lokator potrjen — sledite istemu vzorcu, ne ugibajte).
2. Posodobite specifikacijo v `tests/homolog/ui/`.
3. Ponovno zaženite `npm run homolog` (ali samo zadevno specifikacijo Playwright) glede na VPS, da
   potrdite popravek, nato spremembo potrdite v repozitorij.

V tej zbirki preizkusov ni vizualnega/slikovnega izhodiščnega stanja (F1) — o tem glejte Načrt razvoja.

## Načrt razvoja (F2 / F3)

Zasnova in postopna uvedba sta opisana v internem načrtovalnem dokumentu
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (brez povezave — interni
artefakt `_tasks/`, ki ni del dokumentacije, sledene v tem repozitoriju). Povzetek:

- **F2** — celoten posnetek postopka → agenti Playwright Test (`planner`/`generator`)
  ga pretvorijo v specifikacije potekov (ustvarjanje kombinacije, preizkus ponudnika, urejanje nastavitev, orodja MCP) +
  vizualno regresijsko izhodiščno stanje (Lost Pixel) z maskami čez dinamične podatke (metrike,
  časovne žige, dnevnike) + vzdrževalni postopek `healer` za vsako izdajo.
- **F3** — pokritost odpornosti/pogodb/povezav: toxiproxy + lažni ponudnik, združljiv z OpenAI,
  na razvojnem strežniku, kombinacija `homolog-resilience` na VPS, usmerjena nanj
  (vstavljen iztek časovne omejitve → preverjanje nadomestne poti + odprtja/zaprtja prekinjevalnika tokokroga prek
  `/api/monitoring/health`); pogojeno pogodbeno preizkušanje Schemathesis glede na
  `docs/openapi.yaml` (nizek `--max-examples`, fiksna semena, samo končne točke brez LLM); ter
  vključitev `npm run homolog` in njegove datoteke `summary.md` v fazo STOP #2 postopka `/generate-release`.
