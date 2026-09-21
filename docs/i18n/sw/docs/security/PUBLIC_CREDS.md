# Public Credentials Handling (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Chanzo rasmi:** `open-sse/utils/publicCreds.ts`
> **Majaribio:** `tests/unit/publicCreds.test.ts`
> **Ilisasishwa mwisho:** 2026-08-07 — v3.8.50
> **Hadhira:** Wahandisi wanaounganisha watoa huduma wanaosambaza OAuth client_id / client_secret / Firebase Web API keys za umma katika CLI zao za umma.
> **Hali:** **LAZIMA** kwa msimbo wote mpya unaopachika vitambulishi vya chanzo asili.

## Kwa nini hii ipo

- [OAuth 2.0 kwa programu asilia (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret za programu zilizosakinishwa ni za umma; PKCE ndiyo inayotoa usalama halisi.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Vitambulishi vya wateja wa Web ni vya umma kwa makusudi.

OmniRoute lazima ipachike thamani hizi ili watumiaji ambao hawasanidi `.env` bado wapate mtiririko wa OAuth unaofanya kazi moja kwa moja. Bila chaguo-msingi lililopachikwa, watoa huduma wa Gemini / Antigravity huacha kufanya kazi kwa mtumiaji yeyote anayefuata njia ya "nakili tu na uendeshe".

Hata hivyo, thamani halisi kama `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` hutambuliwa na **GitHub Secret Scanning**, **Semgrep**, na vichanganuzi vingine vinavyofanana vya ruwaza. Kila toleo huwa mtiririko wenye kelele wa tahadhari zisizo sahihi, ulinzi wa push huzuia commit halali, na waendeshaji huacha kuamini mkondo wa tahadhari.

Kisaidizi cha `open-sse/utils/publicCreds.ts` hutatua masharti yote mawili kwa wakati mmoja:

- Hupachika kitambulishi cha umma kama **mfuatano wa byte uliofichwa kwa XOR** (hakuna ruwaza ya kichanganuzi katika chanzo).
- Hukisimbua wakati wa utekelezaji kupitia `decodePublicCred` / `resolvePublicCred`.
- Hutambua thamani ghafi ambazo tayari zinafuata viambishi awali vinavyojulikana (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) na kuzipitisha bila kuzibadilisha, hivyo watumiaji wenye thamani ghafi katika `.env` zao zilizopo wanaendelea kufanya kazi bila **uhamishaji wowote**.

Huu ni **ufichaji, si usimbaji fiche.** Mtu yeyote anayesoma chanzo anaweza kurejesha thamani — jambo ambalo ni sawa kwa sababu thamani hiyo ni ya umma kwa makusudi. Lengo pekee ni kuepuka ulinganishaji wa regex wa vichanganuzi.

## Ruwaza ya lazima

### 1. Kuongeza kitambulisho kipya cha umma

Unapohitaji kupachika thamani mpya iliyotolewa na chanzo asili ambayo:

- inatoka kwenye CLI ya umma / programu ya kompyuta ya mezani / kifurushi cha kivinjari, **na**
- mtoa huduma wa chanzo asili huiainisha (au huichukulia) kama kitambulishi cha mteja cha umma, **na**
- kichanganuzi cha ruwaza kingeitambua vinginevyo (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, n.k.),

…fuata orodha hii ya ukaguzi:

1. Tengeneza mfuatano wa byte uliofichwa:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Ongeza ingizo jipya kwenye `EMBEDDED_DEFAULTS` katika `open-sse/utils/publicCreds.ts` lenye **jina lisiloegemea upande wowote la ufunguo** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, n.k.). **Usitumie** majina kama `client_secret` au `api_key` katika kisaidizi — maneno hayo huanzisha sheria za generic-secret za Semgrep.

3. Ongeza `keyof typeof EMBEDDED_DEFAULTS` kwenye muungano wa aina wa umma (hutambuliwa kiotomatiki).

4. Katika msimbo unaotumia thamani hiyo, badilisha thamani halisi iliyoandikwa moja kwa moja na:

   ```ts
   // ubatilishaji mmoja wa env
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // lakabu nyingi za env (ya kwanza isiyo tupu hushinda)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // hakuna ubatilishaji wa env (daima tumia chaguo-msingi lililopachikwa)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Ondoa thamani halisi kutoka `.env.example` (ibadilishe na maelezo ya maoni pekee yanayowaelekeza wasomaji hapa):

   ```dotenv
   # ── Mtoa huduma (Google / Firebase / n.k.) ──
   # Vitambulisho vya OAuth vya umma vimepachikwa kwenye msimbo kupitia
   # open-sse/utils/publicCreds.ts. Weka vars hizi ikiwa tu unataka kutumia zako.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Sasisha `tests/unit/publicCreds.test.ts` ili kuongeza dai la umbo kwa ufunguo mpya (thibitisha umbizo, si thamani halisi — angalia majaribio yaliyopo kwa ruwaza hiyo).

7. **Kamwe** usiongeze thamani halisi za `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` kwenye faili za majaribio. Tumia constants za `FAKE_*` zilizoundwa kutoka kwa vipande vya `.join("")` (angalia majaribio yaliyopo).

### 2. Msimbo unaotumia thamani

- **Soma kutoka `resolvePublicCred()` / `resolvePublicCredMulti()` pekee** — kamwe usiite `decodePublicCredBytes()` moja kwa moja nje ya kisaidizi.
- Kisaidizi kimeundwa kimakusudi kuwa chepesi (XOR ya byte yenye muda wa mstari) na ni salama kuitwa wakati wa kupakia moduli; thamani chaguo-msingi huhesabiwa mara moja.
- Ubatilishaji wa env hushinda kila wakati. Mtumiaji akiweka `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, kisaidizi hupitisha thamani hiyo ghafi bila kuibadilisha.

### 3. Ruwaza zilizokatazwa

❌ **Kamwe** usifanye lolote kati ya yafuatayo katika msimbo wa uzalishaji (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// MBAYA: thamani halisi huanzisha Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// MBAYA: base64 ya thamani halisi — GitHub bado huitambua tangu Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// MBAYA: uunganishaji wa string unaounda upya ruwaza wakati wa utekelezaji
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// MBAYA: usimbaji wa hex/ROT13 — ufichaji tofauti, hatari ileile ya kutambuliwa
clientSecret: hexDecode("474f4353..."),
```

Njia hizi zote hatimaye hutambuliwa na kichanganuzi. Tumia `resolvePublicCred()`.

❌ **Kamwe** usiongeze vitambulisho halisi kwenye `.env.example`. Watumiaji wanaohitaji thamani halisi za chanzo asili wanaweza kuzitoa wenyewe kutoka kwenye CLI ya umma, au kutumia usajili wao wenyewe wa OAuth.

❌ **Kamwe** usipuuze tahadhari mpya ya uchanganuzi wa siri bila kuangalia kwanza ikiwa kitambulisho hicho kinapaswa kuhamishwa kwenye kisaidizi hiki.

## Vidhibiti vinavyohusiana

- `RAW_VALUE_PATTERN` katika `publicCreds.ts` huorodhesha viambishi awali vinavyosababisha thamani kupitishwa bila kubadilishwa (uoanifu wa nyuma). Ipanue tu kwa miundo ya vitambulisho vya umma iliyorekodiwa, kamwe si kwa siri za wamiliki.
- `.env.example` inadhibitiwa na hati ya CI ya `check-env-doc-sync` — unapoondoa kigezo hapa, hakikisha nyaraka zinalingana.
- Mkusanyiko wa majaribio wa `npm run test:vitest` na `node --import tsx/esm --test tests/unit/publicCreds.test.ts` lazima uendelee kupita bila hitilafu.

## Wakati wa KUTOTUMIA kisaidizi hiki

Kisaidizi hiki ni **kwa ajili tu** ya vitambulisho ambavyo:

1. Vinasambazwa hadharani na mtoa huduma wa chanzo (programu tekelezi ya CLI, kifurushi cha kivinjari, nyaraka rasmi).
2. Vimerekodiwa au vinaashiriwa kwa nguvu kuwa si vya siri (vimelindwa na PKCE, ufunguo wa Firebase Web, au sawa na hivyo).

Kwa kila kitu kingine — tokeni zinazotolewa na mwendeshaji, siri za kila mpangaji, client_secret ya programu yako mwenyewe ya OAuth, funguo za usimbaji fiche, siri za JWT, nywila za hifadhidata — tumia **vigezo vya mazingira pekee** (`process.env.FOO`, mbadala wa `||` kuwa tupu / hitilafu iliyo wazi). Hivi vinapaswa kuwekwa katika `.env` na [hifadhi ya vitambulisho iliyosimbwa kwa njia fiche](./COMPLIANCE.md), si katika msimbo chanzo.

## Marejeleo

- [Google: OAuth 2.0 kwa programu asilia](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Funguo za API za utambulisho wa mteja](https://firebase.google.com/docs/projects/api-keys)
- [Siri zinazotumika na GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: utambuzi wa base64 kwa tokeni (Feb 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit iliyoanzisha kisaidizi hiki: `1a39c31f` — _fix(security): ficha vitambulisho vya umma vya chanzo + unganisha utakaso wa hitilafu_
