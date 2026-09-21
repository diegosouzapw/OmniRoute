# Homologation Suite (`npm run homolog`) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

OmniRoute-julkaisun todellisen ympäristön E2E-validointi homologointi-VPS-palvelimella
(`HOMOLOG_BASE_URL`, esim. `http://192.168.0.15:20128`). Yksi komento korvaa julkaisun
manuaalisen STOP #2 -tarkistuslistan automatisoidulla ajolla, joka tuottaa todennusaineiston.

## Mitä se kattaa

| Taso                                       | Mitä se tarkistaa                                                                                                                                                                                                           | Toteutus                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — kunto/pariteetti                      | `/api/monitoring/health` vastaa tilakoodilla `200`, sisältää arvon `status: "healthy"` ja odotetun version                                                                                                                  | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — tilapäinen avain                     | Ylläpitäjän kirjautuminen → `POST /api/keys` luo ajoa varten rajatun API-avaimen, joka peruutetaan (`DELETE /api/keys/:id`) `finally`-lohkossa lopputuloksesta riippumatta                                                  | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API-rajapinta                        | `/v1/models`-luettelo, todellinen suoratoistamaton keskustelun täydennys (tasolle kriittinen malli, `max_tokens: 5`), virheellisen avaimen `401`-vastaus ja julkinen `/api/monitoring/health`                               | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE-suoratoisto                      | Todellinen suoratoistettava keskustelun täydennys; varmistaa arvon `text/event-stream`, vähintään yhden sisältömuutoksen ja `[DONE]`-lopetusmerkinnän                                                                       | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — oikeat tarjoajat                      | Yksi mahdollisimman edullinen keskustelupyyntö kutakin tuotannossa olevan `/v1/models`-luettelon kriittistä tarjoajaa kohden; luodaan dynaamisesti promptfoon avulla                                                        | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — käyttöliittymän tunnistautuminen     | Kirjautuu kerran oikean kirjautumislomakkeen kautta ja käyttää istuntoa (`storageState`) uudelleen koko käyttöliittymäkerroksessa                                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — käyttöliittymäreitit                 | Jokainen staattinen `page.tsx` hakemistossa `src/app/(dashboard)/dashboard` (löydetään tiedostojärjestelmästä; dynaamiset `[param]`-reitit ohitetaan) latautuu ilman HTTP-virhettä, sivuvirhettä tai Next.js-virherajaa     | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — käyttöliittymän kriittinen työnkulku | Luo API-avaimen hallintapaneelin käyttöliittymän kautta ja peruuttaa sen uudelleen (VPS-palvelimelle ei jää jäännöksiä)                                                                                                     | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — yhdistetty raportti                   | Yhdistää httpYacin (`junit-to-ctrf`-muunnoksen kautta), promptfoo→CTRF-sovittimen ja Playwrightin CTRF-raportoijan yhdeksi `homolog-ctrf.json`-tiedostoksi sekä tuottaa helppolukuisen `homolog-report/summary.md`-raportin | `scripts/homolog/run.mjs`                                                     |

Itse toisto ei hyödynnä lainkaan LLM:ää — kyseessä on deterministinen regressiotestistö,
ei arviointi. Tekoälyä käytetään ainoastaan tulevissa ylläpitotöissä (katso etenemissuunnitelma alta).

## Esivaatimukset

1. Kopioi `.env.homolog.example` tiedostoksi `.env.homolog` (gitignored — älä koskaan commitoi sitä) ja täytä:
   - `HOMOLOG_BASE_URL` — kohdeympäristö, esim. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — kyseisen ympäristön hallintapaneelin ylläpitosalasana.
   - `HOMOLOG_CRITICAL_PROVIDERS` — pilkuilla erotetut palveluntarjoajien etuliitteet, joille lähetetään oikea
     smoke-testin chat-pyyntö (esim. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — jätä tyhjäksi normaaleissa ajoissa; testikokonaisuus luo ja mitätöi
     oman väliaikaisen avaimensa. Aseta tämä vain yksittäisen kerroksen erillistä virheenkorjausta varten.
2. Suorita `npm install` repositoriossa (testikokonaisuuden riippuvuudet — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — ovat tavallisia devDependencies-riippuvuuksia).
3. Suorita `npx playwright install`, jos selainbinäärejä ei ole jo asennettu.

## Suorittaminen

```bash
npm run homolog
```

Jos haluat validoida ympäristön, jonka versio ei vastaa paikallista `package.json`-versiota
(esim. homologointiympäristö käyttää edelleen edellistä korjausversiota), ohita odotettu
versio eksplisiittisesti:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Ajo päättyy nollasta poikkeavaan paluuarvoon, jos jokin kerros epäonnistuu, ja yrittää aina mitätöidä luomansa väliaikaisen
API-avaimen myös epäonnistumistilanteessa (`finally`-lohko tiedostossa `scripts/homolog/run.mjs`).

## Raportin lukeminen

Kaikki tulosteet tallennetaan hakemistoon `homolog-report/` (gitignored):

- `summary.md` — sama vakiotulosteeseen tulostettu taulukko, yksi rivi kutakin kerrosta kohden (✅/❌ + tiedot).
- `homolog-ctrf.json` — yhdistetty CTRF-raportti (API/SSE-, palveluntarjoajien smoke-testien ja
  käyttöliittymätulosten yhdistelmä) — tämä artefakti liitetään julkaisun STOP #2 -tarkistuslistaan.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — kunkin
  kerroksen käsittelemättömät/välivaiheen raportit.
- `promptfooconfig.yaml`, `provider-misses.json` — nykyistä ajoa varten luotu promptfoo-konfiguraatio
  ja kaikki kriittiset palveluntarjoajat, jotka puuttuivat aktiivisesta luettelosta.

L0-tason epäonnistuminen keskeyttää ajon välittömästi (väliaikaista avainta ei luoda), sillä version tai kuntotarkistuksen
ristiriita tarkoittaa, että kaikki myöhemmät kerrokset validoisivat väärää ympäristöä.

## Perustason määrittäminen uudelleen käyttöliittymän hyväksyttävien muutosten jälkeen

L4b (reittien smoke-testi) ja L4c (API-avaimen käyttöliittymäkulku) käyttävät todellisia DOM-paikantimia
tilannekuvien sijaan, joten useimmat hyväksyttävät käyttöliittymämuutokset eivät edellytä testikokonaisuuden päivittämistä. Kun muutos
rikkoo paikantimen (esim. painikkeen nimi muuttuu tai asetussivu siirretään):

1. Vahvista paikannin uudelleen nykyisestä lähdekoodista (spesifikaatioissa on jo dokumentoitu, mistä
   tiedostosta/riviltä kukin paikannin vahvistettiin — noudata samaa käytäntöä, älä arvaa).
2. Päivitä spesifikaatio hakemistossa `tests/homolog/ui/`.
3. Suorita `npm run homolog` uudelleen (tai vain kyseinen Playwright-spesifikaatio) VPS-palvelinta vasten
   korjauksen vahvistamiseksi ja commitoi sitten muutokset.

Tässä testikokonaisuudessa ei ole visuaalista/pikselipohjaista perustasoa (F1) — katso sitä koskevat tiedot etenemissuunnitelmasta.

## Etenemissuunnitelma (F2 / F3)

Suunnittelu ja vaiheittainen käyttöönotto on kuvattu sisäisessä suunnitteluspesifikaatiossa
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ei linkitetty — sisäinen
`_tasks/`-artefakti, joka ei kuulu tämän repositorion versionhallinnassa oleviin dokumentteihin). Yhteenveto:

- **F2** — täydellisen läpikäynnin tallennus → Playwright Test Agents (`planner`/`generator`)
  muuntavat sen kulkuspesifikaatioiksi (yhdistelmän luominen, palveluntarjoajan testaaminen, asetusten muokkaaminen, MCP-työkalut) +
  visuaalisen regressiotestauksen perustaso (Lost Pixel), jossa dynaamiset tiedot (mittarit,
  aikaleimat, lokit) peitetään + julkaisukohtainen `healer`-ylläpitorutiini.
- **F3** — häiriönsieto-, sopimus- ja integraatiokattavuus: toxiproxy + OpenAI-yhteensopiva valepalveluntarjoaja
  kehityskoneella, siihen osoittava `homolog-resilience`-yhdistelmä VPS-palvelimella
  (injektoitu aikakatkaisu → varmista varajärjestelmään siirtyminen sekä circuit breakerin avautuminen/sulkeutuminen
  `/api/monitoring/health`-rajapinnan kautta); ehdollisesti suoritettava Schemathesis-sopimustestaus
  `docs/openapi.yaml`-tiedostoa vasten (pieni `--max-examples`, kiinteät siemenarvot, vain muut kuin LLM-päätepisteet); sekä
  komennon `npm run homolog` ja sen tuottaman `summary.md`-tiedoston integrointi `/generate-release`-prosessin STOP #2 -vaiheeseen.
