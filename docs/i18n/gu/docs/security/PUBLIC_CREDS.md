# Public Credentials Handling (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **સત્યનો અધિકૃત સ્રોત:** `open-sse/utils/publicCreds.ts`
> **પરીક્ષણો:** `tests/unit/publicCreds.test.ts`
> **છેલ્લે અપડેટ કરેલું:** 2026-08-07 — v3.8.50
> **લક્ષિત વાચકો:** એવા પ્રદાતાઓને એકીકૃત કરતા એન્જિનિયરો, જેઓ તેમના જાહેર CLIsમાં જાહેર OAuth client_id / client_secret / Firebase Web API keys પ્રદાન કરે છે.
> **સ્થિતિ:** upstream identifiers એમ્બેડ કરતા તમામ નવા કોડ માટે **ફરજિયાત**.

## આ શા માટે અસ્તિત્વમાં છે

- [નેટિવ એપ્સ માટે OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ઇન્સ્ટોલ કરેલી એપ્સ માટે OAuth client_id / client_secret જાહેર હોય છે; વાસ્તવિક સુરક્ષા PKCE પૂરી પાડે છે.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web client identifiers ડિઝાઇન મુજબ જાહેર હોય છે.

OmniRouteએ આ મૂલ્યો એમ્બેડ કરવા જરૂરી છે, જેથી `.env` કૉન્ફિગર ન કરતા વપરાશકર્તાઓને પણ કોઈ વધારાના સેટઅપ વિના કાર્યરત OAuth flow મળે. એમ્બેડેડ fallback વિના, "માત્ર clone કરો અને ચલાવો" માર્ગ અનુસરતા કોઈપણ વપરાશકર્તા માટે Gemini / Antigravity providers કામ કરવાનું બંધ કરે છે.

જોકે, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` જેવા literal મૂલ્યો **GitHub Secret Scanning**, **Semgrep** અને સમાન pattern scanners દ્વારા શોધાઈ જાય છે. દરેક release ખોટા positivesનો ઘોંઘાટભર્યો પ્રવાહ બની જાય છે, push protection માન્ય commitsને અવરોધે છે અને operators alert feed પર વિશ્વાસ કરવાનું બંધ કરે છે.

`open-sse/utils/publicCreds.ts` helper બંને મર્યાદાઓને એકસાથે ઉકેલે છે:

- જાહેર identifierને **XOR-masked byte sequence** તરીકે એમ્બેડ કરે છે (sourceમાં કોઈ scanner pattern રહેતું નથી).
- Runtime પર `decodePublicCred` / `resolvePublicCred` દ્વારા decode કરે છે.
- પહેલેથી જ જાણીતા prefixes (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) અનુસરતા raw મૂલ્યોને ઓળખે છે અને તેમને કોઈ ફેરફાર વિના પસાર કરે છે, જેથી હાલની `.env`માં raw મૂલ્યો ધરાવતા વપરાશકર્તાઓ માટે **શૂન્ય migration** સાથે બધું કાર્યરત રહે.

આ **obfuscation છે, encryption નથી.** Source વાંચનાર કોઈપણ વ્યક્તિ મૂલ્ય પુનઃપ્રાપ્ત કરી શકે છે — અને તે યોગ્ય છે, કારણ કે આ મૂલ્ય ડિઝાઇન મુજબ જાહેર છે. એકમાત્ર હેતુ scanner regex matches ટાળવાનો છે.

## ફરજિયાત pattern

### 1. નવું જાહેર credential ઉમેરવું

જ્યારે તમારે upstream દ્વારા પ્રદાન કરાયેલું એવું નવું મૂલ્ય એમ્બેડ કરવાની જરૂર હોય, જે:

- જાહેર CLI / desktop app / browser bundleમાંથી આવે છે, **અને**
- upstream provider તેને જાહેર client identifier તરીકે દસ્તાવેજીકૃત કરે છે (અથવા તે મુજબ વર્તે છે), **અને**
- અન્યથા pattern scanner તેને match કરે (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, વગેરે),

…ત્યારે આ checklist અનુસરો:

1. Masked byte sequence generate કરો:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`માં `EMBEDDED_DEFAULTS` માટે **તટસ્થ key name** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, વગેરે) ધરાવતી નવી entry ઉમેરો. Helperમાં `client_secret` અથવા `api_key` જેવા નામોનો ઉપયોગ **કરશો નહીં** — આ શબ્દો Semgrep generic-secret rulesને trigger કરે છે.

3. Public type unionમાં `keyof typeof EMBEDDED_DEFAULTS` ઉમેરો (તે આપમેળે infer થાય છે).

4. Consumer codeમાં hardcoded literalને આનાથી બદલો:

   ```ts
   // એક env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // અનેક env aliases (પ્રથમ બિન-ખાલી મૂલ્ય પસંદ થશે)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // કોઈ env override નહીં (હંમેશાં embedded default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example`માંથી literal દૂર કરો (તેના સ્થાને માત્ર comments ધરાવતું documentation મૂકો, જે વાચકોને અહીં દોરે):

   ```dotenv
   # ── Provider (Google / Firebase / વગેરે) ──
   # જાહેર OAuth credentials કોડમાં આના દ્વારા સમાવેલાં છે:
   # open-sse/utils/publicCreds.ts. તમારા પોતાના મૂલ્યો વાપરવા હોય તો જ આ vars સેટ કરો.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. નવી key માટે shape assertion ઉમેરવા `tests/unit/publicCreds.test.ts` અપડેટ કરો (literal value નહીં, format verify કરો — pattern માટે હાલના tests જુઓ).

7. Test filesમાં `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literals **ક્યારેય** ઉમેરશો નહીં. `.join("")` fragmentsમાંથી બનેલા `FAKE_*` constantsનો ઉપયોગ કરો (હાલના tests જુઓ).

### 2. Consumers

- **ફક્ત `resolvePublicCred()` / `resolvePublicCredMulti()`માંથી વાંચો** — helperની બહાર `decodePublicCredBytes()`ને ક્યારેય સીધું call કરશો નહીં.
- Helperને જાણીજોઈને ઓછા ખર્ચવાળું (linear byte XOR) બનાવવામાં આવ્યું છે અને module-load સમયે call કરવું સુરક્ષિત છે; defaults એક વાર compute થાય છે.
- Env override હંમેશાં પ્રાથમિકતા મેળવે છે. જો વપરાશકર્તા `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` સેટ કરે, તો helper એ raw valueને કોઈ ફેરફાર વિના પસાર કરે છે.

### 3. પ્રતિબંધિત patterns

❌ Production code (`src/`, `open-sse/`, `electron/`, `bin/`)માં નીચેનું કંઈપણ **ક્યારેય** કરશો નહીં:

```ts
// ખરાબ: literal value Secret Scanning + Semgrepને trigger કરે છે
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ખરાબ: literalનું base64 — Feb/2025થી GitHub હજી પણ તેને શોધે છે
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ખરાબ: string concatenation જે runtime પર pattern ફરીથી assemble કરે છે
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ખરાબ: hex/ROT13 encoding — અલગ obfuscation, detectionનું એ જ જોખમ
clientSecret: hexDecode("474f4353..."),
```

આ બધા આખરે scannerને trigger કરે છે. `resolvePublicCred()`નો ઉપયોગ કરો.

❌ `.env.example`માં literal credentials **ક્યારેય** ઉમેરશો નહીં. વાસ્તવિક upstream valuesની જરૂર ધરાવતા વપરાશકર્તાઓ તેમને જાહેર CLIમાંથી જાતે extract કરી શકે છે અથવા પોતાનું OAuth registration વાપરી શકે છે.

❌ Credentialને આ helperમાં ખસેડવું જોઈએ કે નહીં તે પહેલાં તપાસ્યા વિના નવા secret-scanning alertને **ક્યારેય** dismiss કરશો નહીં.

## સંબંધિત નિયંત્રણો

- `publicCreds.ts` માંનું `RAW_VALUE_PATTERN` પાસથ્રૂ સક્રિય કરતા પ્રીફિક્સની ગણના કરે છે (પશ્ચાત્ સુસંગતતા). તેને ફક્ત દસ્તાવેજીકૃત જાહેર ક્રેડેન્શિયલ ફોર્મેટ્સ માટે જ વિસ્તારો, માલિકીના રહસ્યો માટે ક્યારેય નહીં.
- `.env.example` CI ની `check-env-doc-sync` સ્ક્રિપ્ટમાં સમાવાયેલ છે — જ્યારે તમે અહીંથી કોઈ વેરિએબલ દૂર કરો, ત્યારે ખાતરી કરો કે દસ્તાવેજો તેની સાથે મેળ ખાય છે.
- `npm run test:vitest` અને `node --import tsx/esm --test tests/unit/publicCreds.test.ts` બંને ટેસ્ટ સ્યુટ સફળ રહેવા જોઈએ.

## આ હેલ્પરનો ઉપયોગ ક્યારે ન કરવો

આ હેલ્પર **ફક્ત** એવા ક્રેડેન્શિયલ્સ માટે છે જે:

1. અપસ્ટ્રીમ પ્રદાતા દ્વારા જાહેર રીતે વિતરિત કરવામાં આવે છે (CLI બાઇનરી, બ્રાઉઝર બંડલ, અધિકૃત દસ્તાવેજો).
2. બિન-ગોપનીય હોવાનું દસ્તાવેજીકૃત હોય અથવા તેનો મજબૂત સંકેત આપવામાં આવ્યો હોય (PKCE-સંરક્ષિત, Firebase Web કી અથવા સમાન).

બાકીની દરેક વસ્તુ માટે — ઓપરેટર દ્વારા જારી કરાયેલા ટોકન્સ, પ્રતિ-ટેનન્ટ રહસ્યો, તમારી પોતાની OAuth ઍપનું client_secret, એન્ક્રિપ્શન કીઝ, JWT રહસ્યો, ડેટાબેઝ પાસવર્ડ્સ — **ફક્ત env vars** નો ઉપયોગ કરો (`process.env.FOO`, ખાલી મૂલ્ય / સ્પષ્ટ ભૂલ પર `||` ફૉલબૅક). આ `.env` અને [એન્ક્રિપ્ટેડ ક્રેડેન્શિયલ્સ સ્ટોર](./COMPLIANCE.md) માં હોવા જોઈએ, સોર્સમાં નહીં.

## સંદર્ભો

- [Google: નેટિવ ઍપ્સ માટે OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: ક્લાયન્ટ ઓળખ માટે API કીઝ](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning દ્વારા સમર્થિત રહસ્યો](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ટોકન્સ માટે base64 શોધ (ફેબ્રુઆરી 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- આ હેલ્પર રજૂ કરતો કમિટ: `1a39c31f` — _fix(security): જાહેર અપસ્ટ્રીમ ક્રેડેન્શિયલ્સને માસ્ક કરો + ભૂલ સેનિટાઇઝેશનને કેન્દ્રીકૃત કરો_
