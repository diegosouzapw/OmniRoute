# Public Credentials Handling (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Sannhetskilde:** `open-sse/utils/publicCreds.ts`
> **Tester:** `tests/unit/publicCreds.test.ts`
> **Sist oppdatert:** 2026-08-07 — v3.8.50
> **Målgruppe:** Utviklere som integrerer leverandører som distribuerer offentlige OAuth-verdier for client_id / client_secret / Firebase Web API-nøkler i sine offentlige CLI-er.
> **Status:** **OBLIGATORISK** for all ny kode som bygger inn identifikatorer fra oppstrømsleverandører.

## Hvorfor dette finnes

- [OAuth 2.0 for native apper (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret for installerte apper er offentlige; PKCE sørger for den faktiske sikkerheten.
- [Firebase API-nøkler](https://firebase.google.com/docs/projects/api-keys) — Webklientidentifikatorer er offentlige med hensikt.

OmniRoute må bygge inn disse verdiene slik at brukere som ikke konfigurerer `.env`, likevel får en fungerende OAuth-flyt rett ut av boksen. Uten en innebygd reserveverdi slutter Gemini-/Antigravity-leverandørene å fungere for alle brukere som følger «bare klon og kjør»-fremgangsmåten.

Bokstavelige verdier som `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` oppdages imidlertid av **GitHub Secret Scanning**, **Semgrep** og lignende mønsterskannere. Hver utgivelse blir en støyende strøm av falske positiver, push-beskyttelsen blokkerer legitime commits, og operatørene slutter å stole på varslingsstrømmen.

Hjelpeverktøyet `open-sse/utils/publicCreds.ts` løser begge begrensningene samtidig:

- Bygger inn den offentlige identifikatoren som en **XOR-maskert bytesekvens** (ingen skannermønstre i kildekoden).
- Dekoder ved kjøring via `decodePublicCred` / `resolvePublicCred`.
- Oppdager råverdier som allerede følger velkjente prefikser (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), og sender dem gjennom uendret, slik at brukere med råverdier i sin eksisterende `.env` fortsatt kan bruke dem med **null migrering**.

Dette er **obfuskering, ikke kryptering.** Alle som leser kildekoden, kan gjenopprette verdien — noe som er greit fordi verdien er offentlig med hensikt. Det eneste målet er å unngå treff fra skannernes regulære uttrykk.

## Det obligatoriske mønsteret

### 1. Legge til en ny offentlig tilgangsopplysning

Når du må bygge inn en ny verdi fra en oppstrømsleverandør som:

- kommer fra en offentlig CLI-/skrivebordsapp-/nettleserpakke, **og**
- oppstrømsleverandøren dokumenterer (eller behandler) den som en offentlig klientidentifikator, **og**
- en mønsterskanner ellers ville ha oppdaget den (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` osv.),

…følger du denne sjekklisten:

1. Generer den maskerte bytesekvensen:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Legg til en ny oppføring i `EMBEDDED_DEFAULTS` i `open-sse/utils/publicCreds.ts` med et **nøytralt nøkkelnavn** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` osv.). Ikke bruk navn som `client_secret` eller `api_key` i hjelpeverktøyet — disse ordene utløser Semgreps generiske regler for hemmeligheter.

3. Legg til en `keyof typeof EMBEDDED_DEFAULTS` i den offentlige typeunionen (den utledes automatisk).

4. Erstatt den hardkodede bokstavverdien i forbrukerkoden med:

   ```ts
   // én env-overstyring
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // flere env-aliaser (første verdi som ikke er tom, vinner)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ingen env-overstyring (alltid innebygd standardverdi)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Fjern bokstavverdien fra `.env.example` (erstatt den med dokumentasjon som kun består av kommentarer og henviser leserne hit):

   ```dotenv
   # ── Leverandør (Google / Firebase / osv.) ──
   # Offentlige OAuth-tilgangsopplysninger er bygd inn i koden via
   # open-sse/utils/publicCreds.ts. Angi disse variablene bare for å bruke dine egne.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Oppdater `tests/unit/publicCreds.test.ts` for å legge til en formkontroll for den nye nøkkelen (kontroller formatet, ikke bokstavverdien — se de eksisterende testene for mønsteret).

7. Legg **aldri** til bokstavverdier av typen `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` i testfiler. Bruk `FAKE_*`-konstantene som er bygd opp av `.join("")`-fragmenter (se eksisterende tester).

### 2. Forbrukere

- **Les kun fra `resolvePublicCred()` / `resolvePublicCredMulti()`** — kall aldri `decodePublicCredBytes()` direkte utenfor hjelpeverktøyet.
- Hjelpeverktøyet er med hensikt rimelig i bruk (lineær XOR av bytes) og trygt å kalle ved innlasting av modulen; standardverdiene beregnes én gang.
- Env-overstyringen vinner alltid. Hvis en bruker angir `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, sender hjelpeverktøyet denne råverdien gjennom uendret.

### 3. Forbudte mønstre

❌ Gjør **aldri** noe av følgende i produksjonskode (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// FEIL: bokstavverdi utløser Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// FEIL: base64 av bokstavverdien — GitHub oppdager dette fortsatt siden feb. 2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// FEIL: strengkonkatenering som setter sammen mønsteret på nytt ved kjøring
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// FEIL: hex-/ROT13-koding — en annen obfuskering, samme risiko for oppdagelse
clientSecret: hexDecode("474f4353..."),
```

Alle disse vil til slutt utløse en skanner. Bruk `resolvePublicCred()`.

❌ Legg **aldri** bokstavelige tilgangsopplysninger til i `.env.example`. Brukere som trenger reelle oppstrømsverdier, kan hente dem ut fra den offentlige CLI-en selv eller bruke sin egen OAuth-registrering.

❌ Avvis **aldri** et nytt varsel fra hemmelighetsskanning uten først å kontrollere om tilgangsopplysningen bør flyttes til dette hjelpeverktøyet.

## Relaterte kontroller

- `RAW_VALUE_PATTERN` i `publicCreds.ts` angir prefiksene som utløser direkte videresending (bakoverkompatibilitet). Utvid det kun for dokumenterte formater for offentlig tilgjengelig legitimasjon, aldri for proprietære hemmeligheter.
- `.env.example` brukes av CI-skriptet `check-env-doc-sync` — når du fjerner en variabel her, må du sørge for at dokumentasjonen samsvarer.
- Testpakkene `npm run test:vitest` og `node --import tsx/esm --test tests/unit/publicCreds.test.ts` må begge fortsatt være feilfrie.

## Når denne hjelpefunksjonen IKKE skal brukes

Denne hjelpefunksjonen er **kun** for legitimasjon som:

1. Distribueres offentlig av den eksterne leverandøren (CLI-binærfil, nettleserpakke, offisiell dokumentasjon).
2. Er dokumentert eller tydelig angitt som ikke-konfidensiell (PKCE-beskyttet, Firebase-nettnøkkel eller lignende).

For alt annet — operatørutstedte tokener, hemmeligheter per leietaker, din egen OAuth-apps client_secret, krypteringsnøkler, JWT-hemmeligheter, databasepassord — skal du **kun bruke miljøvariabler** (`process.env.FOO`, `||` som reserve til en tom verdi / eksplisitt feil). Disse hører hjemme i `.env` og i [det krypterte legitimasjonslageret](./COMPLIANCE.md), ikke i kildekoden.

## Referanser

- [Google: OAuth 2.0 for integrerte apper](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-nøkler for klientidentifikasjon](https://firebase.google.com/docs/projects/api-keys)
- [GitHub: hemmeligheter som støttes av Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: base64-deteksjon for tokener (feb. 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit som introduserte denne hjelpefunksjonen: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
