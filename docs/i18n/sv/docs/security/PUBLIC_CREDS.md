# Public Credentials Handling (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Sanningskälla:** `open-sse/utils/publicCreds.ts`
> **Tester:** `tests/unit/publicCreds.test.ts`
> **Senast uppdaterad:** 2026-08-07 — v3.8.50
> **Målgrupp:** Ingenjörer som integrerar leverantörer vars publika CLI:er innehåller offentliga OAuth client_id / client_secret / Firebase Web API-nycklar.
> **Status:** **OBLIGATORISKT** för all ny kod som bäddar in identifierare från externa leverantörer.

## Varför detta finns

- [OAuth 2.0 för inbyggda appar (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret för installerade appar är offentliga; PKCE tillhandahåller den faktiska säkerheten.
- [Firebase API-nycklar](https://firebase.google.com/docs/projects/api-keys) — Identifierare för webbklienter är offentliga avsiktligt.

OmniRoute måste bädda in dessa värden så att användare som inte konfigurerar `.env` ändå får ett fungerande OAuth-flöde direkt. Utan en inbäddad reservlösning slutar Gemini-/Antigravity-leverantörerna att fungera för alla användare som följer arbetsflödet ”klona bara och kör”.

Literala värden som `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` matchas dock av **GitHub Secret Scanning**, **Semgrep** och liknande mönsterskannrar. Varje version ger upphov till en ström av falska positiva resultat, push-skydd blockerar legitima incheckningar och driftansvariga slutar lita på varningsflödet.

Hjälpfunktionen `open-sse/utils/publicCreds.ts` löser båda begränsningarna samtidigt:

- Bäddar in den offentliga identifieraren som en **XOR-maskerad bytesekvens** (inget skannermönster i källkoden).
- Avkodar vid körning via `decodePublicCred` / `resolvePublicCred`.
- Identifierar råvärden som redan följer välkända prefix (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) och skickar dem vidare oförändrade, så att användare med råvärden i sin befintliga `.env` kan fortsätta använda dem med **noll migrering**.

Detta är **obfuskering, inte kryptering.** Alla som läser källkoden kan återskapa värdet — vilket är helt i sin ordning eftersom värdet avsiktligt är offentligt. Det enda målet är att undvika matchningar mot skannrarnas reguljära uttryck.

## Det obligatoriska mönstret

### 1. Lägga till en ny offentlig autentiseringsuppgift

När du behöver bädda in ett nytt värde från en extern leverantör som:

- kommer från en offentlig CLI-/skrivbordsapp-/webbläsarbunt, **och**
- den externa leverantören dokumenterar (eller behandlar) det som en offentlig klientidentifierare, **och**
- en mönsterskanner annars skulle matcha det (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` osv.),

…följ denna checklista:

1. Generera den maskerade bytesekvensen:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Lägg till en ny post i `EMBEDDED_DEFAULTS` i `open-sse/utils/publicCreds.ts` med ett **neutralt nyckelnamn** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` osv.). Använd **inte** namn som `client_secret` eller `api_key` i hjälpfunktionen — dessa ord utlöser Semgreps generiska regler för hemligheter.

3. Lägg till en `keyof typeof EMBEDDED_DEFAULTS` i den offentliga typunionen (den härleds automatiskt).

4. Ersätt den hårdkodade literalen i konsumentkoden med:

   ```ts
   // en enskild miljövariabel som åsidosättning
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // flera miljövariabelalias (den första icke-tomma vinner)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ingen åsidosättning via miljövariabel (alltid inbäddat standardvärde)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Ta bort literalen från `.env.example` (ersätt den med dokumentation som endast består av kommentarer och hänvisar läsare hit):

   ```dotenv
   # ── Leverantör (Google / Firebase / osv.) ──
   # Offentliga OAuth-autentiseringsuppgifter är inbakade i koden via
   # open-sse/utils/publicCreds.ts. Ange endast dessa variabler för att använda dina egna.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Uppdatera `tests/unit/publicCreds.test.ts` genom att lägga till en formkontroll för den nya nyckeln (verifiera formatet, inte literalvärdet — se befintliga tester för mönstret).

7. Lägg **aldrig** till literaler av typen `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` i testfiler. Använd `FAKE_*`-konstanterna som byggs från fragment med `.join("")` (se befintliga tester).

### 2. Konsumenter

- **Läs endast från `resolvePublicCred()` / `resolvePublicCredMulti()`** — anropa aldrig `decodePublicCredBytes()` direkt utanför hjälpfunktionen.
- Hjälpfunktionen är avsiktligt billig (linjär XOR på byte-nivå) och säker att anropa när modulen läses in; standardvärden beräknas en gång.
- Åsidosättningen via miljövariabel har alltid företräde. Om en användare anger `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` skickar hjälpfunktionen vidare detta råvärde oförändrat.

### 3. Förbjudna mönster

❌ Gör **aldrig** något av följande i produktionskod (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// DÅLIGT: literalvärdet utlöser Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// DÅLIGT: base64 av literalen — GitHub identifierar det fortfarande sedan feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// DÅLIGT: strängkonkatenering som sätter ihop mönstret igen vid körning
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// DÅLIGT: hex-/ROT13-kodning — annan obfuskering, samma risk för identifiering
clientSecret: hexDecode("474f4353..."),
```

Alla dessa utlöser förr eller senare en skanner. Använd `resolvePublicCred()`.

❌ Lägg **aldrig** till literala autentiseringsuppgifter i `.env.example`. Användare som behöver verkliga värden från externa leverantörer kan själva extrahera dem från den offentliga CLI:n eller använda sin egen OAuth-registrering.

❌ Avfärda **aldrig** en ny varning från hemlighetsskanning utan att först kontrollera om autentiseringsuppgiften bör flyttas till den här hjälpfunktionen.

## Relaterade kontroller

- `RAW_VALUE_PATTERN` i `publicCreds.ts` räknar upp de prefix som utlöser direktöverföring (bakåtkompatibilitet). Utöka det endast för dokumenterade format för offentliga autentiseringsuppgifter, aldrig för proprietära hemligheter.
- `.env.example` hanteras av CI:s `check-env-doc-sync`-skript — när du tar bort en variabel här måste du se till att dokumentationen stämmer överens.
- Testsviterna `npm run test:vitest` och `node --import tsx/esm --test tests/unit/publicCreds.test.ts` måste båda fortsätta vara godkända.

## När du INTE ska använda den här hjälpfunktionen

Den här hjälpfunktionen är **endast** avsedd för autentiseringsuppgifter som:

1. Distribueras offentligt av uppströmsleverantören (CLI-binärfil, webbläsarpaket, officiell dokumentation).
2. Är dokumenterade eller tydligt antydda som icke-konfidentiella (PKCE-skyddade, Firebase Web-nyckel eller liknande).

För allt annat — operatörsutfärdade tokens, hemligheter per klientorganisation, din egen OAuth-apps client_secret, krypteringsnycklar, JWT-hemligheter, databaslösenord — ska du **endast använda miljövariabler** (`process.env.FOO`, `||`-reservvärde till tomt värde/uttryckligt fel). Dessa hör hemma i `.env` och det [krypterade lagret för autentiseringsuppgifter](./COMPLIANCE.md), inte i källkoden.

## Referenser

- [Google: OAuth 2.0 för inbyggda appar](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-nycklar för klientidentifiering](https://firebase.google.com/docs/projects/api-keys)
- [Hemlighetstyper som stöds av GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: base64-detektering för tokens (februari 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit som introducerade den här hjälpfunktionen: `1a39c31f` — _fix(security): maskera offentliga autentiseringsuppgifter från uppströmskällor + centralisera felsanering_
