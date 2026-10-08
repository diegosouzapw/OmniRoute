# Public Credentials Handling (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Bron van waarheid:** `open-sse/utils/publicCreds.ts`
> **Tests:** `tests/unit/publicCreds.test.ts`
> **Laatst bijgewerkt:** 2026-08-07 — v3.8.50
> **Doelgroep:** Engineers die providers integreren die openbare OAuth client_id / client_secret / Firebase Web API-sleutels in hun openbare CLI's meeleveren.
> **Status:** **VERPLICHT** voor alle nieuwe code waarin upstream-identificatoren worden ingesloten.

## Waarom dit bestaat

- [OAuth 2.0 voor native apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret voor geïnstalleerde apps zijn openbaar; PKCE biedt de daadwerkelijke beveiliging.
- [Firebase API-sleutels](https://firebase.google.com/docs/projects/api-keys) — Webclient-identificatoren zijn bewust openbaar.

OmniRoute moet deze waarden insluiten, zodat gebruikers die geen `.env` configureren toch direct een werkende OAuth-flow krijgen. Zonder een ingesloten terugvalwaarde werken de Gemini-/Antigravity-providers niet meer voor gebruikers die het pad "gewoon klonen en uitvoeren" volgen.

Letterlijke waarden zoals `AIzaSy…`, `GOCSPX-…` en `…apps.googleusercontent.com` worden echter gedetecteerd door **GitHub Secret Scanning**, **Semgrep** en vergelijkbare patroonscanners. Elke release wordt een rumoerige stroom fout-positieven, pushbeveiliging blokkeert legitieme commits en beheerders verliezen het vertrouwen in de meldingenstroom.

De helper `open-sse/utils/publicCreds.ts` lost beide beperkingen tegelijk op:

- Sluit de openbare identificator in als een **met XOR gemaskeerde bytereeks** (geen scannerpatroon in de broncode).
- Decodeert tijdens runtime via `decodePublicCred` / `resolvePublicCred`.
- Detecteert onbewerkte waarden die al bekende voorvoegsels volgen (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) en geeft deze ongewijzigd door, zodat bestaande `.env`-bestanden van gebruikers met onbewerkte waarden blijven werken met **nul migratie**.

Dit is **obfuscatie, geen versleuteling.** Iedereen die de broncode leest, kan de waarde achterhalen — en dat is prima, omdat de waarde bewust openbaar is. Het enige doel is om overeenkomsten met regexen van scanners te vermijden.

## Het verplichte patroon

### 1. Een nieuwe openbare credential toevoegen

Wanneer je een nieuwe door upstream aangeleverde waarde moet insluiten die:

- afkomstig is uit een openbare CLI / desktop-app / browserbundel, **en**
- door de upstream-provider wordt gedocumenteerd (of behandeld) als een openbare clientidentificator, **en**
- anders door een patroonscanner zou worden gedetecteerd (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, enz.),

…volg dan deze checklist:

1. Genereer de gemaskeerde bytereeks:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Voeg een nieuwe vermelding toe aan `EMBEDDED_DEFAULTS` in `open-sse/utils/publicCreds.ts` met een **neutrale sleutelnaam** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, enz.). Gebruik **geen** namen zoals `client_secret` of `api_key` in de helper — die woorden activeren generieke geheimregels van Semgrep.

3. Voeg een `keyof typeof EMBEDDED_DEFAULTS` toe aan de openbare type-unie (dit wordt automatisch afgeleid).

4. Vervang in de consumercode de hardgecodeerde letterlijke waarde door:

   ```ts
   // één env-override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // meerdere env-aliassen (de eerste niet-lege waarde wint)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // geen env-override (altijd de ingesloten standaardwaarde)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Verwijder de letterlijke waarde uit `.env.example` (vervang deze door documentatie die uitsluitend uit commentaar bestaat en lezers hierheen verwijst):

   ```dotenv
   # ── Provider (Google / Firebase / enz.) ──
   # Openbare OAuth-credentials zijn via de code ingebakken met
   # open-sse/utils/publicCreds.ts. Stel deze variabelen alleen in om je eigen waarden te gebruiken.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Werk `tests/unit/publicCreds.test.ts` bij en voeg een vormassertie voor de nieuwe sleutel toe (verifieer de indeling, niet de letterlijke waarde — zie de bestaande tests voor het patroon).

7. Voeg **nooit** letterlijke waarden met `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` toe aan testbestanden. Gebruik de `FAKE_*`-constanten die zijn opgebouwd uit fragmenten met `.join("")` (zie de bestaande tests).

### 2. Consumers

- **Lees uitsluitend via `resolvePublicCred()` / `resolvePublicCredMulti()`** — roep `decodePublicCredBytes()` nooit rechtstreeks buiten de helper aan.
- De helper is bewust goedkoop (lineaire XOR per byte) en kan veilig tijdens het laden van een module worden aangeroepen; standaardwaarden worden één keer berekend.
- De env-override heeft altijd voorrang. Als een gebruiker `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` instelt, geeft de helper die onbewerkte waarde rechtstreeks door.

### 3. Verboden patronen

❌ Doe **nooit** een van de volgende dingen in productiecode (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// FOUT: letterlijke waarde activeert Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// FOUT: base64 van de letterlijke waarde — GitHub detecteert dit nog steeds sinds feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// FOUT: tekenreeksconcatenatie die het patroon tijdens runtime opnieuw samenstelt
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// FOUT: hex-/ROT13-codering — andere obfuscatie, hetzelfde detectierisico
clientSecret: hexDecode("474f4353..."),
```

Deze activeren uiteindelijk allemaal een scanner. Gebruik `resolvePublicCred()`.

❌ Voeg **nooit** letterlijke credentials toe aan `.env.example`. Gebruikers die echte upstreamwaarden nodig hebben, kunnen deze zelf uit de openbare CLI extraheren of hun eigen OAuth-registratie gebruiken.

❌ Negeer **nooit** een nieuwe secret-scanningmelding zonder eerst te controleren of de credential naar deze helper moet worden verplaatst.

## Gerelateerde controles

- `RAW_VALUE_PATTERN` in `publicCreds.ts` bevat de voorvoegsels die passthrough activeren (achterwaartse compatibiliteit). Breid dit alleen uit voor gedocumenteerde openbare referentie-indelingen, nooit voor bedrijfseigen geheimen.
- `.env.example` wordt gecontroleerd door het CI-script `check-env-doc-sync` — wanneer je hier een variabele verwijdert, zorg er dan voor dat de documentatie overeenkomt.
- De testsuites `npm run test:vitest` en `node --import tsx/esm --test tests/unit/publicCreds.test.ts` moeten beide blijven slagen.

## Wanneer je deze helper NIET moet gebruiken

Deze helper is **uitsluitend** bedoeld voor referenties die:

1. Openbaar worden verspreid door de upstream-provider (CLI-binair bestand, browserbundel, officiële documentatie).
2. Gedocumenteerd zijn of waarvan sterk wordt geïmpliceerd dat ze niet vertrouwelijk zijn (beschermd met PKCE, Firebase-websleutel of vergelijkbaar).

Gebruik voor al het overige — door operators uitgegeven tokens, geheimen per tenant, de client_secret van je eigen OAuth-app, versleutelingssleutels, JWT-geheimen, databasewachtwoorden — **uitsluitend omgevingsvariabelen** (`process.env.FOO`, `||`-fallback naar leeg / expliciete fout). Deze horen thuis in `.env` en de [versleutelde opslag voor referenties](./COMPLIANCE.md), niet in de broncode.

## Referenties

- [Google: OAuth 2.0 voor native apps](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-sleutels voor clientidentificatie](https://firebase.google.com/docs/projects/api-keys)
- [Door GitHub Secret Scanning ondersteunde geheimen](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: base64-detectie voor tokens (februari 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit waarin deze helper is geïntroduceerd: `1a39c31f` — _fix(security): openbare upstream-referenties maskeren + foutopschoning centraliseren_
