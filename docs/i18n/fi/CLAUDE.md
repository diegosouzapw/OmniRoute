# CLAUDE.md (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Tämä tiedosto tarjoaa ohjeita Claude Code (claude.ai/code) käytettäessä koodia tässä repositoriossa.

## Nopeasti alkuun

```bash
npm install                    # Asenna riippuvuudet (automaattisesti luo .env .env.example:sta)
npm run dev                    # Kehityspalvelin osoitteessa http://localhost:20128
npm run build                  # Tuotantorakennus (Next.js 16 standalone)
npm run lint                   # ESLint (0 virhettä odotettavissa; varoitukset ovat ennestään olemassa)
npm run typecheck:core         # TypeScript-tarkistus (pitäisi olla puhdas)
npm run typecheck:noimplicit:core  # Tiukka tarkistus (ei implisiittistä any)
npm run test:coverage          # Yksikkötestit + kattavuusportti (75/75/75/70 — lauseet/rivit/funktiot/haarat)
npm run check                  # lint + test yhdistettynä
npm run check:cycles           # Havaitse sykliset riippuvuudet
```

### Testien suorittaminen

```bash
# Yksittäinen testitiedosto (Node.js:n natiivinen testirunner — suurin osa testeistä)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP-palvelin, autoCombo, välimuisti)
npm run test:vitest

# Kaikki testisarjat
npm run test:all
```

Koko testimatriisin näkemiseksi katso `CONTRIBUTING.md` → "Testien suorittaminen". Syvällistä arkkitehtuuria varten katso `AGENTS.md`.

---

## Projekti lyhyesti

**OmniRoute** — yhtenäinen AI-proxy/reititin. Yksi päätepiste, yli 160 LLM-toimittajaa, automaattinen varajärjestelmä.

| Kerros          | Sijainti                | Tarkoitus                                                                 |
| --------------- | ----------------------- | ------------------------------------------------------------------------- |
| API-reitit      | `src/app/api/v1/`       | Next.js App Router — sisäänkäynnit                                        |
| Käsittelijät    | `open-sse/handlers/`    | Pyyntöjen käsittely (keskustelu, upotukset jne.)                          |
| Suorittajat     | `open-sse/executors/`   | Toimittajakohtainen HTTP-jakelu                                           |
| Kääntäjät       | `open-sse/translator/`  | Muotojen muunnos (OpenAI↔Claude↔Gemini)                                   |
| Muuntaja        | `open-sse/transformer/` | Vastaukset API ↔ Keskustelun täydentäminen                                |
| Palvelut        | `open-sse/services/`    | Combo-reititys, nopeusrajoitukset, välimuisti jne.                        |
| Tietokanta      | `src/lib/db/`           | SQLite-alueen moduulit (yli 45 tiedostoa, 55 migraatiota)                 |
| Alue/Politiikka | `src/domain/`           | Politiikkamoottori, kustannussäännöt, varajärjestelmä                     |
| MCP-palvelin    | `open-sse/mcp-server/`  | 37 työkalua (30 perus + 3 muisti + 4 taitoa), 3 kuljetusta, ~13 laajuutta |
| A2A-palvelin    | `src/lib/a2a/`          | JSON-RPC 2.0 agenttiprotokolla                                            |
| Taidot          | `src/lib/skills/`       | Laajennettavissa oleva taitokehys                                         |
| Muisti          | `src/lib/memory/`       | Kestävä keskustelumuisti                                                  |

Monorepo: `src/` (Next.js 16 -sovellus), `open-sse/` (suoratoistoalustatyötila), `electron/` (työpöytäsovellus), `tests/`, `bin/` (CLI-sisäänkäynti).

## Pyyntöputki

```
Asiakas → /v1/chat/completions (Next.js-reitti)
  → CORS → Zod-validointi → auth? → politiikan tarkistus → kehotteen injektoinnin suoja
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → välimuistin tarkistus → nopeusrajoitus → yhdistelmäreittaus?
      → resolveComboTargets() → handleSingleModel() per kohde
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → yritä uudelleen w/ backoff
    → vastausten käännös → SSE-virta tai JSON
    → Jos Responses API: responsesTransformer.ts TransformStream
```

API-reitit noudattavat johdonmukaista kaavaa: `Reitti → CORS-esivalmistelu → Zod-kehon validointi → Valinnainen auth (extractApiKey/isValidApiKey) → API-avaimen politiikan täytäntöönpano → Käsittelijän delegointi (open-sse)`. Ei globaalia Next.js-välikkää — keskeytys on reitti-spesifinen.

**Yhdistelmäreittaus** (`open-sse/services/combo.ts`): 14 strategiaa (prioriteetti, painotettu, täytä-ensin, vuorotellen, P2C, satunnainen, vähiten käytetty, kustannusoptimoitu, reset-tieto, tiukka-satunnainen, automaattinen, lkgp, konteksti-optimoitu, konteksti-väylä). Jokainen kohde kutsuu `handleSingleModel()`, joka käärii `handleChatCore()`-funktion kohdekohtaisella virheenkäsittelyllä ja piirikytkin tarkistuksilla. Katso `docs/routing/AUTO-COMBO.md` 9-tekijän Auto-Combo-pisteytykselle ja `docs/architecture/RESILIENCE_GUIDE.md` 3-resilienssikerrokselle.

---

## Resilienssin Suorituskykytila

OmniRoute:lla on kolme liittyvää mutta erilaista tilapäisen epäonnistumisen mekanismia. Pidä niiden
alueet erillään reitityskäyttäytymisen vianetsinnässä. Katso
[3-kerroksinen resilienssikaavio](./docs/diagrams/exported/resilience-3layers.svg)
(lähde: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
nopeaa karttaa varten.

### Palveluntarjoajan Piirikytkin

**Alue**: koko palveluntarjoaja, esim. `glm`, `openai`, `anthropic`.

**Tarkoitus**: lopettaa liikenteen lähettäminen palveluntarjoajalle, joka epäonnistuu toistuvasti
ylävirrassa/palvelutasolla, jotta yksi epäterveellinen palveluntarjoaja ei hidasta jokaista pyyntöä.

**Toteutus**:

- Ydinluokka: `src/shared/utils/circuitBreaker.ts`
- Chat-portti/suorituskykykaapeli: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Suorituskykytila API: `src/app/api/monitoring/health/route.ts`
- Jaetut kääreet: `open-sse/services/accountFallback.ts`
- Kestävän tilan taulukko: `domain_circuit_breakers`

**Tilat**:

- `CLOSED`: normaali liikenne on sallittu.
- `OPEN`: palveluntarjoaja on tilapäisesti estetty; kutsujat saavat palveluntarjoaja-piirikytkin-avoin -vastauksen
  tai yhdistelmäreittaus ohittaa toiseen kohteeseen.
- `HALF_OPEN`: nollaus-aika on kulunut; salli koepyyntö. Onnistuminen sulkee
  kytkimen, epäonnistuminen avaa sen uudelleen.

**Oletusarvot** (`open-sse/config/constants.ts`):

- OAuth-palveluntarjoajat: kynnys `3`, nollausaika `60s`.
- API-avaimen palveluntarjoajat: kynnys `5`, nollausaika `30s`.
- Paikalliset palveluntarjoajat: kynnys `2`, nollausaika `15s`.

Vain palveluntarjoajatasoiset epäonnistumistilat saavat aktivoida palveluntarjoajan kytkimen:

```ts
(408, 500, 502, 503, 504);
```

Älä aktivoi koko palveluntarjoajan kytkintä normaaleille tili/avain/malli-virheille, kuten useimmille
`401`, `403` tai `429` tapauksille. Ne kuuluvat yleensä yhteyden jäähdytysaikaan tai mallin
lukitsemiseen. Yleinen API-avaimen palveluntarjoajan `403` pitäisi olla palautettavissa, ellei sitä luokitella
terminaaliseksi palveluntarjoaja/tilivirheeksi.

Kytkin käyttää laiskaa palautumista, ei taustakelloa. Kun `OPEN` vanhenee, lukemiset kuten
`getStatus()`, `canExecute()`, ja `getRetryAfterMs()` päivittävät tilan `HALF_OPEN`:ksi, jotta
koontinäytöt ja yhdistelmäehdokkaat eivät jatkuvasti sulje vanhentunutta palveluntarjoajaa.

### Yhteyden Jäähdytys

**Alue**: yksi palveluntarjoajan yhteys/tili/avain.

**Tarkoitus**: ohittaa tilapäisesti yksi huono avain/tili samalla kun sallitaan muiden yhteyksien
saman palveluntarjoajan jatkaa pyyntöjen palvelemista.

**Toteutus**:

- Kirjoitus/päivityspolku: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tilin valinta/suodatus: `src/sse/services/auth.ts::getProviderCredentials...`
- Jäähdytyksen laskenta: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Asetukset: `src/lib/resilience/settings.ts`

Tärkeitä kenttiä palveluntarjoajan yhteyksissä:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tilivalinnan aikana yhteys ohitetaan, kun:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Jäähdytykset ovat myös laiskoja: kun `rateLimitedUntil` on menneisyydessä, yhteys tulee
uudelleen kelpoiseksi. Onnistuneessa käytössä `clearAccountError()` tyhjentää `testStatus`,
`rateLimitedUntil`, virhekentät ja `backoffLevel`.

Oletusarvoinen yhteyden jäähdytys käyttäytyminen:

- OAuth-perusjäähdytys: `5s`.
- API-avaimen perusjäähdytys: `3s`.
- API-avaimen `429` pitäisi suosia ylävirran uudelleenyritysohjeita (`Retry-After`, nollausotsikot tai
  parsittava nollusteksti) kun saatavilla.
- Toistuvat palautettavat epäonnistumiset käyttävät eksponentiaalista taaksepäin:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd-suoja estää samanaikaisia epäonnistumisia samalla yhteydellä toistuvasti
pidentämästä jäähdytystä tai kaksinkertaistamasta `backoffLevel`:ia.

Terminologiset tilat eivät ole jäähdytyksiä. `banned`, `expired`, ja `credits_exhausted` on
tarkoitettu pysymään saatavilla, kunnes tunnistetiedot/asetukset muuttuvat tai operaattori nollaa
ne. Älä ylikirjoita terminologisia tiloja tilapäisellä jäähdytystilalla.

### Mallin Lukitus

**Alue**: palveluntarjoaja + yhteys + malli.

**Tarkoitus**: välttää koko yhteyden estämistä, kun vain yksi malli on saatavilla tai
kiintiörajoitettu tälle yhteydelle.

Esimerkkejä:

- Per-malli kiintiöpalveluntarjoajat, jotka palauttavat `429`.
- Paikalliset palveluntarjoajat, jotka palauttavat `404` yhdelle puuttuvasta mallista.
- Palveluntarjoajakohtaiset tila/mallilupa epäonnistumiset, kuten valitut Grok-tilat.

Mallin lukitus sijaitsee `open-sse/services/accountFallback.ts` ja sallii saman
yhteyden jatkaa muiden mallien palvelemista.

### Vianetsintäohjeet

- Jos kaikki avaimet palveluntarjoajalle ohitetaan, tarkista sekä palveluntarjoajan kytkimen tila että jokaisen
  yhteyden `rateLimitedUntil`/`testStatus`.
- Jos palveluntarjoaja näyttää pysyvästi suljetulta nollausikkunan jälkeen, tarkista, lukevatko koodi
  raakaa `state`:a sen sijaan, että käyttäisivät `getStatus()`/`canExecute()`.
- Jos yksi palveluntarjoajan avain epäonnistuu, mutta muiden pitäisi toimia, suosii yhteyden jäähdytystä palveluntarjoajan kytkimen yli.
- Jos vain yksi malli epäonnistuu, suosii mallin lukitusta yhteyden jäähdytyksen yli.
- Jos tilan pitäisi palautua itsestään, sillä pitäisi olla tuleva aikaleima/nollausaika ja
  lukupolku, joka päivittää vanhentuneen tilan. Pysyvät tilat vaativat manuaalisia tunnistetietoja
  tai konfiguraatiomuutoksia.

## Avain Konventiot

### Koodityyli

- **2 välilyöntiä**, puolipisteet, kaksoisviittaukset, 100 merkin leveys, es5 loppupisteet (pakotettu lint-stagedin kautta Prettierillä)
- **Tuonnit**: ulkoiset → sisäiset (`@/`, `@omniroute/open-sse`) → suhteelliset
- **Nimeäminen**: tiedostot=camelCase/kebab, komponentit=PascalCase, vakioarvot=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = virhe kaikkialla; `no-explicit-any` = varoitus `open-sse/` ja `tests/`
- **TypeScript**: `strict: false`, kohde ES2022, moduuli esnext, resoluutio bundler. Suosi eksplisiittisiä tyyppejä.

### Tietokanta

- **Aina** käytä `src/lib/db/` alueen moduuleja — **älä koskaan** kirjoita raakaa SQL:ta reiteille tai käsittelijöille
- **Älä koskaan** lisää logiikkaa `src/lib/localDb.ts` (vain uudelleenvienti kerros)
- **Älä koskaan** barrel-importoi `localDb.ts` — tuo spesifisiä `db/` moduuleja sen sijaan
- DB singleton: `getDbInstance()` `src/lib/db/core.ts` (WAL lokitus)
- Migraatiot: `src/lib/db/migrations/` — versioidut SQL-tiedostot, idempotentit, suoritetaan transaktioissa

### Virheiden käsittely

- try/catch tietyillä virhetyypeillä, lokita pino kontekstilla
- Älä koskaan niele virheitä SSE-virroissa — käytä keskeytyssignaaleja siivoukseen
- Palauta oikeat HTTP-tilakoodit (4xx/5xx)

### Turvallisuus

- **Älä koskaan** käytä `eval()`, `new Function()`, tai implikoitua evalia
- Vahvista kaikki syötteet Zod-skeemoilla
- Salaa tunnistetiedot levossa (AES-256-GCM)
- Ylöspäin suuntautuvan otsikon estolista: `src/shared/constants/upstreamHeaders.ts` — pidä puhdistus, Zod-skeemat ja yksikkötestit synkronoituna muokkaamisen aikana
- **Julkiset ylöspäin suuntautuvat tunnistetiedot** (Gemini/Antigravity/Windsurf-tyylinen OAuth client_id/salaisuus + Firebase Web -avaimet, jotka on saatu julkisista CLI:stä): **ON** upotettava `resolvePublicCred()` kautta `open-sse/utils/publicCreds.ts` — **älä koskaan** merkkijonolitteraalina. Katso `docs/security/PUBLIC_CREDS.md` pakollisesta mallista.
- **Virhevastaukset** (HTTP / SSE / suorittaja / MCP-käsittelijä): **ON** ohjattava `buildErrorBody()` tai `sanitizeErrorMessage()` kautta `open-sse/utils/error.ts` — **älä koskaan** laita raakaa `err.stack` tai `err.message` vastauskehoon. Katso `docs/security/ERROR_SANITIZATION.md`.
- **Shell-komennot, jotka on rakennettu muuttujista**: kun kutsut `exec()`/`spawn()` skriptiä, joka tarvitsee ajonaikaisia arvoja, siirrä ne `env`-vaihtoehdon kautta (shell-escape automaattisesti) — **älä koskaan** merkkijonointerpoloi luotettomia/ulkopuolisia polkuja skriptin kehoon. Viite: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Oletusarvoisesti turvalliset kirjastot** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): suosi Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink yli mukautettujen toteutusten aina, kun lisäät uusia turvallisuuteen liittyviä pintoja.

---

## Yleiset Muokkausskenaariot

### Uuden Palveluntarjoajan Lisääminen

1. Rekisteröi `src/shared/constants/providers.ts` (Zod-vahvistettu latauksessa)
2. Lisää suorittaja `open-sse/executors/` jos tarvitaan mukautettua logiikkaa (laajenna `BaseExecutor`)
3. Lisää kääntäjä `open-sse/translator/` jos ei-OpenAI-muoto
4. Lisää OAuth-konfiguraatio `src/lib/oauth/constants/oauth.ts` jos perustuu OAuth:iin — jos ylöspäin suuntautuva CLI toimittaa julkisen client_id/salaisuuden, upota `resolvePublicCred()` kautta (katso `docs/security/PUBLIC_CREDS.md`), **älä koskaan** litteraalina
5. Rekisteröi mallit `open-sse/config/providerRegistry.ts`
6. Kirjoita testit `tests/unit/` (sisällytä publicCreds-muodon vahvistus, jos lisäsit uuden upotetun oletuksen)

### Uuden API-reitin Lisääminen

1. Luo hakemisto `src/app/api/v1/your-route/`
2. Luo `route.ts` `GET`/`POST` käsittelijöillä
3. Noudata kaavaa: CORS → Zod-kehon vahvistus → valinnainen todennus → käsittelijän delegointi
4. Käsittelijä menee `open-sse/handlers/` (tuo sieltä, ei inline)
5. Virhevastaukset käyttävät `buildErrorBody()` / `errorResponse()` `open-sse/utils/error.ts` (automaattisesti puhdistettu — älä koskaan laita `err.stack` tai `err.message` raakana kehoon). Katso `docs/security/ERROR_SANITIZATION.md`.
6. Lisää testit — mukaan lukien vähintään yksi vahvistus, että virhevastaukset eivät vuoda pinojälkiä (`!body.error.message.includes("at /")`)

### Uuden DB-moduulin Lisääminen

1. Luo `src/lib/db/yourModule.ts` — tuo `getDbInstance` `./core.ts`:stä
2. Vie CRUD-toiminnot alueen taulukoillesi
3. Lisää migraatio `src/lib/db/migrations/` jos uusia tauluja tarvitaan
4. Uudelleenvienti `src/lib/localDb.ts` (lisää vain uudelleenvientiluetteloon)
5. Kirjoita testit

### Uuden MCP-työkalun Lisääminen

1. Lisää työkalun määritelmä `open-sse/mcp-server/tools/` Zod-syöteskeeman + asynkronisen käsittelijän kanssa
2. Rekisteröi työkalusarjaan (kytketty `createMcpServer()` kautta)
3. Määritä sopiville alueille
4. Kirjoita testit (työkalun kutsu lokitetaan `mcp_audit` tauluun)

### Uuden A2A-taidon Lisääminen

1. Luo taito `src/lib/a2a/skills/` (5 on jo olemassa: älykäs-reititys, kiintiöhallinta, palveluntarjoajan-haku, kustannusanalyysi, terveysraportti)
2. Taito saa tehtäväkontekstin (viestit, metatiedot) → palauttaa rakenteellisen tuloksen
3. Rekisteröi `A2A_SKILL_HANDLERS` `src/lib/a2a/taskExecution.ts` tiedostossa
4. Altista `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Kirjoita testit `tests/unit/`
6. Dokumentoi `docs/frameworks/A2A-SERVER.md` taitotaulukossa

### Uuden Pilviagentin Lisääminen

1. Luo agenttiluokka `src/lib/cloudAgent/agents/` laajentamalla `CloudAgentBase` (3 on jo olemassa: codex-cloud, devin, jules)
2. Toteuta `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Rekisteröi `src/lib/cloudAgent/registry.ts`
4. Lisää OAuth/tunnistetietojen käsittely tarvittaessa (`src/lib/oauth/providers/`)
5. Testit + dokumentoi `docs/frameworks/CLOUD_AGENT.md`

### Uuden Guardrail / Eval / Taito / Webhook-tapahtuman Lisääminen

- Guardrail: `src/lib/guardrails/` → dokumentaatio: `docs/security/GUARDRAILS.md`
- Eval-sarja: `src/lib/evals/` → dokumentaatio: `docs/frameworks/EVALS.md`
- Taito (sandbox): `src/lib/skills/` → dokumentaatio: `docs/frameworks/SKILLS.md`
- Webhook-tapahtuma: `src/lib/webhookDispatcher.ts` → dokumentaatio: `docs/frameworks/WEBHOOKS.md`

## Viiteasiakirja

Mikäli teet ei-triviaalia muutosta, lue ensin vastaava syväsukellus:

| Alue                                               | Asiakirja                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| Repo-navigointi                                    | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arkkitehtuuri                                      | `docs/architecture/ARCHITECTURE.md`                               |
| Insinööriviite                                     | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-tekijän pisteytys, 14 strategiaa)    | `docs/routing/AUTO-COMBO.md`                                      |
| Kestävyys (3 mekanismia)                           | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Perustelujen toisto                                | `docs/routing/REASONING_REPLAY.md`                                |
| Taitojen kehys                                     | `docs/frameworks/SKILLS.md`                                       |
| Muistijärjestelmä (FTS5 + Qdrant)                  | `docs/frameworks/MEMORY.md`                                       |
| Pilviagentit                                       | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Suojakaiteet (PII / injektio / visio)              | `docs/security/GUARDRAILS.md`                                     |
| Julkiset ylävirran tunnistetiedot (Gemini/ym.)     | `docs/security/PUBLIC_CREDS.md`                                   |
| Virheilmoitusten puhdistus                         | `docs/security/ERROR_SANITIZATION.md`                             |
| Arvioinnit                                         | `docs/frameworks/EVALS.md`                                        |
| Vaatimustenmukaisuus / auditointi                  | `docs/security/COMPLIANCE.md`                                     |
| Webhookit                                          | `docs/frameworks/WEBHOOKS.md`                                     |
| Valtuutusputki                                     | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Piilottelu (TLS / sormenjälki)                     | `docs/security/STEALTH_GUIDE.md`                                  |
| Agenttiprotokollat (A2A / ACP / Pilvi)             | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP-palvelin                                       | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A-palvelin                                       | `docs/frameworks/A2A-SERVER.md`                                   |
| API-viite + OpenAPI                                | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Palveluntarjoajan luettelo (automaattisesti luotu) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Julkaisuprosessi                                   | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testaus

| Mikä                     | Komento                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| Yksikkötestit            | `npm run test:unit`                                                   |
| Yksi tiedosto            | `node --import tsx/esm --test tests/unit/file.test.ts`                |
| Vitest (MCP, autoCombo)  | `npm run test:vitest`                                                 |
| E2E (Playwright)         | `npm run test:e2e`                                                    |
| Protokolla E2E (MCP+A2A) | `npm run test:protocols:e2e`                                          |
| Ekosysteemi              | `npm run test:ecosystem`                                              |
| Peittoportti             | `npm run test:coverage` (75/75/75/70 — lauseet/rivit/funktiot/haarat) |
| Peittoraportti           | `npm run coverage:report`                                             |

**PR-sääntö**: Jos muutat tuotantokoodia kansioissa `src/`, `open-sse/`, `electron/` tai `bin/`, sinun on sisällytettävä tai päivitettävä testit samaan PR:ään.

**Testikerroksen mieltymys**: yksikkö ensin → integraatio (moni-moduuli tai DB-tila) → e2e (UI/työnkulku vain). Koodivirheiden toistot on koodattava automatisoiduiksi testeiksi ennen tai rinnakkain korjauksen kanssa.

**Copilot-peittopolitiikka**: Kun PR muuttaa tuotantokoodia ja peitto on alle 75% (lauseet/rivit/funktiot) tai 70% (haarat), älä vain raportoi — lisää tai päivitä testit, suorita peittoportti uudelleen ja pyydä sitten vahvistusta. Sisällytä suoritettavat komennot, muutetut testitiedostot ja lopullinen peittotulos PR-raporttiin.

---

## Git-työprosessi

```bash
# Älä koskaan tee suoria sitoumuksia päähaaraan
git checkout -b feat/your-feature
git commit -m "feat: kuvaa muutoksesi"
git push -u origin feat/your-feature
```

**Haaraetuliitteet**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Sitoutumismuoto** (Conventional Commits): `feat(db): lisää piiri katkaisin` — laajuudet: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky-koukut**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Ympäristö

- **Suoritusaika**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES-moduulit
- **TypeScript**: 5.9+, kohde ES2022, moduuli esnext, resoluutio bundler
- **Polkualias**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Oletusportti**: 20128 (API + dashboard samalla portilla)
- **Tietohakemisto**: `DATA_DIR` ympäristömuuttuja, oletuksena `~/.omniroute/`
- **Avain ympäristömuuttujat**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Asetus: `cp .env.example .env` ja sitten luo `JWT_SECRET` (`openssl rand -base64 48`) ja `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Tiukat säännöt

1. Älä koskaan sitoudu salaisuuksia tai tunnistetietoja
2. Älä koskaan lisää logiikkaa `localDb.ts`
3. Älä koskaan käytä `eval()` / `new Function()` / implisiittistä eval
4. Älä koskaan tee suoria sitoumuksia `main`-haaraan
5. Älä koskaan kirjoita raakaa SQL:ta reitteihin — käytä `src/lib/db/` moduuleja
6. Älä koskaan hiljaa niele virheitä SSE-virroissa
7. Varmista aina syötteet Zod-skeemoilla
8. Sisällytä aina testit, kun muutat tuotantokoodia
9. Peiton on pysyttävä ≥75% (lauseet, rivit, funktiot) / ≥70% (haarat). Nykyinen mittaus: ~82%.
10. Älä koskaan ohita Husky-koukkuja (`--no-verify`, `--no-gpg-sign`) ilman nimenomaista operaattorin hyväksyntää.
11. Älä koskaan upota julkisia ylävirran OAuth client_id/salaisuutta tai Firebase Web -avaimia merkkijonolittereinä — käytä aina `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Katso `docs/security/PUBLIC_CREDS.md`.
12. Älä koskaan palauta raakaa `err.stack` / `err.message` HTTP / SSE / suorittimen vastauksissa — ohjaa aina `buildErrorBody()` tai `sanitizeErrorMessage()` kautta (`open-sse/utils/error.ts`). Katso `docs/security/ERROR_SANITIZATION.md`.
13. Älä koskaan merkkijonointerpoloi ulkoisia polkuja tai suoritusaikaisia arvoja shell-skripteihin, jotka annetaan `exec()`/`spawn()` — siirrä sen sijaan `env`-vaihtoehdon kautta. Viite: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Älä koskaan hylkää CodeQL / Secret-Scanning -ilmoitusta ilman (a) ensin tarkistamalla yllä olevat kaaviodokumentit nähdäksesi, soveltuuko apuri, ja (b) kirjaamalla tekninen perustelu hylkäyskommenttiin. Ennakkotapaus: `js/stack-trace-exposure`, joka nostettiin kutsupaikoissa, jotka jo ohjaavat `sanitizeErrorMessage()` kautta, on tunnettu CodeQL-rajoitus (räätälöityjä puhdistimia ei tunnisteta) — hylkää `false positive` viitaten `docs/security/ERROR_SANITIZATION.md`.
15. Älä koskaan paljasta reittejä, jotka käynnistävät lapsiprosesseja (`/api/mcp/`, `/api/cli-tools/runtime/`) ilman `isLocalOnlyPath()` luokittelua `src/server/authz/routeGuard.ts`. Loopback-valvonta tapahtuu ehdottomasti ennen mitään todennustarkistusta — vuotanut JWT tunnelin kautta ei voi laukaista prosessin käynnistämistä. Katso `docs/security/ROUTE_GUARD_TIERS.md`.
16. Älä koskaan sisällytä `Co-Authored-By`-liitteitä, jotka antavat kunnian tekoälyavustajalle, LLM:lle tai automaatiotilille (esim. nimet, joissa esiintyy "Claude", "GPT", "Copilot", "Bot"; sähköpostit osoitteissa `anthropic.com` / `openai.com` / bottien omistamissa `noreply.github.com`-osoitteissa). Tällaiset liitteet ohjaavat commit-attribuution bottitilille GitHubissa, piilottaen oikean kirjoittajan (`diegosouzapw`) PR-historiassa. Inhimilliset avustajat — mukaan lukien upstream-PR:n kirjoittajat ja issue-raportoijat, joita portataan OmniRouteen — VOIVAT ja PITÄISI saada kunnian vakiomuotoisilla `Co-authored-by: Name <email>`-liitteillä; upstream-port-työnkulut (`/port-upstream-features`, `/port-upstream-issues`) riippuvat tästä.
