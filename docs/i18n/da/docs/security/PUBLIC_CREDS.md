# Public Credentials Handling (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Autoritativ kilde:** `open-sse/utils/publicCreds.ts`
> **Tests:** `tests/unit/publicCreds.test.ts`
> **Senest opdateret:** 2026-08-07 — v3.8.50
> **Målgruppe:** Udviklere, der integrerer udbydere, som leverer offentlige OAuth client_id / client_secret / Firebase Web API-nøgler i deres offentlige CLI'er.
> **Status:** **OBLIGATORISK** for al ny kode, der indlejrer identifikatorer fra upstream.

## Hvorfor dette findes

- [OAuth 2.0 til native apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret til installerede apps er offentlige; PKCE leverer den faktiske sikkerhed.
- [Firebase API-nøgler](https://firebase.google.com/docs/projects/api-keys) — Webklientidentifikatorer er offentlige som en del af designet.

OmniRoute skal indlejre disse værdier, så brugere, der ikke konfigurerer `.env`, stadig får et fungerende OAuth-flow direkte ud af boksen. Uden en indlejret fallback holder Gemini- / Antigravity-udbyderne op med at fungere for alle brugere, der følger fremgangsmåden "bare klon og kør".

Bogstavelige værdier som `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` matches dog af **GitHub Secret Scanning**, **Semgrep** og lignende mønsterscannere. Hver udgivelse bliver til en støjende strøm af falske positiver, push-beskyttelse blokerer legitime commits, og operatører holder op med at have tillid til advarselsstrømmen.

Hjælpefunktionen `open-sse/utils/publicCreds.ts` løser begge begrænsninger på én gang:

- Indlejrer den offentlige identifikator som en **XOR-maskeret bytesekvens** (intet scannermønster i kildekoden).
- Afkoder ved kørsel via `decodePublicCred` / `resolvePublicCred`.
- Registrerer rå værdier, der allerede følger velkendte præfikser (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), og videregiver dem uændret, så brugere med rå værdier i deres eksisterende `.env` fortsat kan arbejde med **nul migrering**.

Dette er **obfuskering, ikke kryptering.** Enhver, der læser kildekoden, kan gendanne værdien — hvilket er i orden, fordi værdien er offentlig som en del af designet. Det eneste mål er at undgå match med scanneres regulære udtryk.

## Det obligatoriske mønster

### 1. Tilføjelse af en ny offentlig legitimationsoplysning

Når du skal indlejre en ny værdi leveret af upstream, som:

- kommer fra en offentlig CLI / desktopapp / browserpakke, **og**
- upstream-udbyderen dokumenterer (eller behandler) den som en offentlig klientidentifikator, **og**
- en mønsterscanner ellers ville matche den (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` osv.),

…skal du følge denne tjekliste:

1. Generér den maskerede bytesekvens:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Tilføj en ny post til `EMBEDDED_DEFAULTS` i `open-sse/utils/publicCreds.ts` med et **neutralt nøglenavn** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` osv.). Brug **ikke** navne som `client_secret` eller `api_key` i hjælpefunktionen — disse ord udløser Semgreps generiske regler for hemmeligheder.

3. Tilføj en `keyof typeof EMBEDDED_DEFAULTS` til den offentlige typeunion (den udledes automatisk).

4. Erstat den hardkodede literalværdi i forbrugerkoden med:

   ```ts
   // enkelt tilsidesættelse via miljøvariabel
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // flere miljøvariabelaliasser (den første ikke-tomme værdi vinder)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ingen tilsidesættelse via miljøvariabel (altid den indlejrede standardværdi)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Fjern literalværdien fra `.env.example` (erstat den med dokumentation, der kun består af kommentarer og henviser læserne hertil):

   ```dotenv
   # ── Udbyder (Google / Firebase / osv.) ──
   # Offentlige OAuth-legitimationsoplysninger er indbygget i koden via
   # open-sse/utils/publicCreds.ts. Angiv kun disse variabler for at bruge dine egne.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Opdatér `tests/unit/publicCreds.test.ts` for at tilføje en formatkontrol for den nye nøgle (verificér formatet, ikke literalværdien — se de eksisterende tests for mønsteret).

7. Tilføj **aldrig** literalværdier med `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` til testfiler. Brug `FAKE_*`-konstanterne, der er opbygget af fragmenter med `.join("")` (se de eksisterende tests).

### 2. Forbrugere

- **Læs kun fra `resolvePublicCred()` / `resolvePublicCredMulti()`** — kald aldrig `decodePublicCredBytes()` direkte uden for hjælpefunktionen.
- Hjælpefunktionen er bevidst billig (lineær byte-XOR) og sikker at kalde, når modulet indlæses; standardværdier beregnes én gang.
- Tilsidesættelsen via miljøvariablen vinder altid. Hvis en bruger angiver `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, videregiver hjælpefunktionen den rå værdi uændret.

### 3. Forbudte mønstre

❌ Gør **aldrig** noget af følgende i produktionskode (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// DÅRLIGT: Literalværdien udløser Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// DÅRLIGT: Literalværdiens base64 — GitHub registrerer det stadig siden feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// DÅRLIGT: Strengsammenkædning, der samler mønsteret igen ved kørsel
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// DÅRLIGT: hex/ROT13-kodning — en anden obfuskering, samme risiko for registrering
clientSecret: hexDecode("474f4353..."),
```

Disse udløser alle med tiden en scanner. Brug `resolvePublicCred()`.

❌ Tilføj **aldrig** bogstavelige legitimationsoplysninger til `.env.example`. Brugere, der har brug for reelle upstream-værdier, kan selv udtrække dem fra den offentlige CLI eller bruge deres egen OAuth-registrering.

❌ Afvis **aldrig** en ny advarsel fra secret-scanning uden først at kontrollere, om legitimationsoplysningen bør flyttes til denne hjælpefunktion.

## Relaterede kontroller

- `RAW_VALUE_PATTERN` i `publicCreds.ts` angiver de præfikser, der udløser direkte videresendelse (bagudkompatibilitet). Udvid det kun med dokumenterede formater for offentlige legitimationsoplysninger, aldrig med proprietære hemmeligheder.
- `.env.example` indgår i CI's `check-env-doc-sync`-script — når du fjerner en variabel her, skal du sørge for, at dokumentationen stemmer overens.
- Testpakkerne `npm run test:vitest` og `node --import tsx/esm --test tests/unit/publicCreds.test.ts` skal begge fortsat bestå.

## Hvornår denne hjælpefunktion IKKE skal bruges

Denne hjælpefunktion er **kun** beregnet til legitimationsoplysninger, der:

1. Distribueres offentligt af den oprindelige udbyder (CLI-binærfil, browserpakke, officiel dokumentation).
2. Er dokumenteret eller tydeligt angivet som ikke-fortrolige (PKCE-beskyttede, Firebase Web-nøgle eller lignende).

Til alt andet — operatørudstedte tokens, hemmeligheder pr. lejer, din egen OAuth-apps client_secret, krypteringsnøgler, JWT-hemmeligheder, databaseadgangskoder — skal du **kun bruge miljøvariabler** (`process.env.FOO`, `||`-fallback til en tom værdi/eksplicit fejl). Disse hører hjemme i `.env` og [det krypterede lager til legitimationsoplysninger](./COMPLIANCE.md), ikke i kildekoden.

## Referencer

- [Google: OAuth 2.0 til native apps](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-nøgler til klientidentifikation](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning-understøttede hemmeligheder](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: base64-registrering af tokens (februar 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit, der introducerede denne hjælpefunktion: `1a39c31f` — _fix(security): maskér offentlige upstream-legitimationsoplysninger + centraliser fejlsanering_
