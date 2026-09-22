# Public Credentials Handling (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Tushen gaskiya:** `open-sse/utils/publicCreds.ts`
> **Gwaje-gwaje:** `tests/unit/publicCreds.test.ts`
> **Sabuntawa na ƙarshe:** 2026-08-07 — v3.8.50
> **Masu karatu:** Injiniyoyin da ke haɗa masu samarwa waɗanda ke rarraba OAuth client_id / client_secret / Firebase Web API keys na jama'a a cikin public CLIs ɗinsu.
> **Matsayi:** **WAJIBI** ga duk sabon lambar da ke saka alamomin upstream.

## Dalilin kasancewar wannan

- [OAuth 2.0 don native apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret na installed apps na jama'a ne; PKCE ne ke samar da ainihin tsaro.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web client identifiers na jama'a ne bisa ƙira.

Dole ne OmniRoute ya saka waɗannan ƙimomin domin masu amfani waɗanda ba su saita `.env` ba su ci gaba da samun OAuth flow mai aiki kai tsaye. Idan babu embedded fallback, masu samar da Gemini / Antigravity za su daina aiki ga duk mai amfani da ya bi hanyar "kawai yi clone sannan ka gudanar".

Duk da haka, **GitHub Secret Scanning**, **Semgrep**, da makamantan pattern scanners suna gano literal values kamar `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`. Kowace release tana zama cike da false positives masu hayaniya, push protection yana toshe halastattun commits, sannan operators su daina amincewa da alert feed.

Helper ɗin `open-sse/utils/publicCreds.ts` yana warware waɗannan matsalolin biyu a lokaci guda:

- Yana saka public identifier a matsayin **XOR-masked byte sequence** (babu scanner pattern a cikin source).
- Yana decode a lokacin runtime ta hanyar `decodePublicCred` / `resolvePublicCred`.
- Yana gano raw values waɗanda suka riga suka bi sanannun prefixes (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) kuma ya bar su yadda suke ba tare da canji ba, don haka masu amfani da ke da raw values a cikin `.env` ɗinsu na yanzu za su ci gaba da aiki tare da **zero migration**.

Wannan **obfuscation ne, ba encryption ba.** Duk wanda ya karanta source zai iya dawo da ƙimar — kuma hakan ba matsala ba ne domin ƙimar ta jama'a ce bisa ƙira. Manufa ɗaya kawai ita ce guje wa dacewa da scanner regex.

## Tsarin da ya zama wajibi

### 1. Ƙara sabon public credential

Lokacin da kake buƙatar saka sabuwar ƙima da upstream ya bayar wadda:

- ta fito daga public CLI / desktop app / browser bundle, **kuma**
- upstream provider ya bayyana (ko ya ɗauke) ta a matsayin public client identifier, **kuma**
- pattern scanner zai iya gano ta idan ba haka ba (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, da sauransu),

…bi wannan checklist:

1. Samar da masked byte sequence:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Ƙara sabon entry zuwa `EMBEDDED_DEFAULTS` a cikin `open-sse/utils/publicCreds.ts` tare da **neutral key name** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, da sauransu). **Kada** ka yi amfani da sunaye irin su `client_secret` ko `api_key` a cikin helper — waɗannan kalmomin suna tayar da Semgrep generic-secret rules.

3. Ƙara `keyof typeof EMBEDDED_DEFAULTS` zuwa public type union (ana infer ɗinsa ta atomatik).

4. A cikin consumer code, maye gurbin hardcoded literal da:

   ```ts
   // override na env guda ɗaya
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // aliases na env da yawa (na farko da ba fanko ba ne zai yi nasara)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // babu override na env (kullum embedded default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Cire literal ɗin daga `.env.example` (maye gurbinsa da documentation na comments kawai wanda ke nuna wa masu karatu wannan wuri):

   ```dotenv
   # ── Provider (Google / Firebase / da sauransu) ──
   # An saka public OAuth credentials cikin code ta hanyar
   # open-sse/utils/publicCreds.ts. Saita waɗannan vars kawai don amfani da naka.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Sabunta `tests/unit/publicCreds.test.ts` don ƙara shape assertion ga sabon key (tabbatar da format, ba literal value ba — duba existing tests don ganin tsarin).

7. **Kada taɓa** ƙara literals na `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` zuwa test files. Yi amfani da constants na `FAKE_*` waɗanda aka gina daga fragments na `.join("")` (duba existing tests).

### 2. Consumers

- **Karanta daga `resolvePublicCred()` / `resolvePublicCredMulti()` kawai** — kada taɓa kiran `decodePublicCredBytes()` kai tsaye a wajen helper.
- An tsara helper ɗin da gangan ya kasance mara tsada (linear byte XOR) kuma yana da aminci a kira shi a lokacin module-load; ana lissafa defaults sau ɗaya.
- Env override koyaushe ne ke yin nasara. Idan mai amfani ya saita `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, helper ɗin zai bar wannan raw value ɗin yadda yake.

### 3. Tsarukan da aka haramta

❌ **Kada taɓa** yin ɗaya daga cikin waɗannan a cikin production code (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// MARA KYAU: literal value yana tayar da Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// MARA KYAU: base64 na literal — GitHub har yanzu yana gano shi tun Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// MARA KYAU: haɗa strings wanda ke sake gina pattern a lokacin runtime
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// MARA KYAU: hex/ROT13 encoding — obfuscation daban, haɗarin ganowa iri ɗaya
clientSecret: hexDecode("474f4353..."),
```

Duk waɗannan daga ƙarshe suna tayar da scanner. Yi amfani da `resolvePublicCred()`.

❌ **Kada taɓa** ƙara literal credentials zuwa `.env.example`. Masu amfani da ke buƙatar ainihin upstream values za su iya ciro su daga public CLI da kansu, ko su yi amfani da OAuth registration nasu.

❌ **Kada taɓa** yin watsi da sabon secret-scanning alert ba tare da fara bincika ko ya kamata a matsar da credential ɗin zuwa wannan helper ba.

## Abubuwan sarrafawa masu alaƙa

- `RAW_VALUE_PATTERN` a cikin `publicCreds.ts` yana lissafa prefix ɗin da ke haifar da wucewa kai tsaye (don dacewa da tsofaffin sigogi). A faɗaɗa shi kawai don tsarin bayanan shaidar jama'a da aka rubuta a takardu, ba don sirrin mallaka ba.
- `.env.example` yana cikin script na CI mai suna `check-env-doc-sync` — idan ka cire wani var a nan, ka tabbatar takardun sun yi daidai da shi.
- Dole ne suites ɗin `npm run test:vitest` da `node --import tsx/esm --test tests/unit/publicCreds.test.ts` su ci gaba da wucewa ba tare da kuskure ba.

## Lokutan da BA za a yi amfani da wannan helper ba

Wannan helper ɗin na bayanan shaida ne **kawai** waɗanda:

1. Mai samar da su na asali yake rarraba su a fili (CLI binary, browser bundle, takardun hukuma).
2. Aka bayyana a takardu ko aka nuna a sarari cewa ba na sirri ba ne (masu kariyar PKCE, Firebase Web key, ko makamantansu).

Ga duk wani abu dabam — tokens da ma'aikacin tsarin ya bayar, sirrin kowane tenant, `client_secret` na manhajar OAuth taka, maɓallan ɓoyewa, sirrin JWT, kalmomin shiga na database — yi amfani da **env vars kawai** (`process.env.FOO`, tare da `||` fallback zuwa ƙimar da babu komai / kuskure bayyananne). Wurin waɗannan shi ne `.env` da [ma'ajiyar bayanan shaida da aka ɓoye](./COMPLIANCE.md), ba cikin source ba.

## Manazarta

- [Google: OAuth 2.0 don manhajojin native](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API keys don tantance client](https://firebase.google.com/docs/projects/api-keys)
- [Sirrin da GitHub Secret Scanning ke tallafawa](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: gano base64 don tokens (Fabrairu 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit da ya gabatar da wannan helper: `1a39c31f` — _fix(security): ɓoye bayanan shaidar jama'a na upstream + tattara tsaftace kurakurai a wuri guda_
