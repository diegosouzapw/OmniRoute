# Public Credentials Handling (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Foinse na fírinne:** `open-sse/utils/publicCreds.ts`
> **Tástálacha:** `tests/unit/publicCreds.test.ts`
> **Nuashonraithe go deireanach:** 2026-08-07 — v3.8.50
> **Lucht léitheoireachta:** Innealtóirí atá ag comhtháthú soláthraithe a chuireann OAuth client_id / client_secret / eochracha Firebase Web API poiblí ar fáil ina CLIanna poiblí.
> **Stádas:** **ÉIGEANTACH** do gach cód nua a leabaíonn aitheantóirí réamhtheachtacha.

## Cén fáth a bhfuil sé seo ann

- [OAuth 2.0 d'aipeanna dúchasacha (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — tá OAuth client_id / client_secret d'aipeanna suiteáilte poiblí; is é PKCE a sholáthraíonn an tslándáil iarbhír.
- [Eochracha Firebase API](https://firebase.google.com/docs/projects/api-keys) — tá aitheantóirí cliant Gréasáin poiblí de réir dearaidh.

Ní mór do OmniRoute na luachanna seo a leabú ionas go mbeidh sreabhadh OAuth oibre ar fáil láithreach d'úsáideoirí nach gcumraíonn `.env`. Gan luach leabaithe cúltaca, stopann na soláthraithe Gemini / Antigravity de bheith ag obair d'aon úsáideoir a leanann an cur chuige "déan clónáil agus rith é".

Mar sin féin, aimsíonn **GitHub Secret Scanning**, **Semgrep**, agus scanóirí patrún comhchosúla luachanna liteartha amhail `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`. Déantar sruth callánach de dhearbhuithe bréagacha de gach eisiúint, cuireann cosaint brúite bac ar thiomantais dhlisteanacha, agus scoireann oibreoirí de mhuinín a bheith acu as an bhfotha foláireamh.

Réitíonn an cúntóir `open-sse/utils/publicCreds.ts` an dá shrian ag an am céanna:

- Leabaíonn sé an t-aitheantóir poiblí mar **sheicheamh beart mascáilte le XOR** (gan aon phatrún scanóra sa bhunchód).
- Díchódaíonn sé ag am rite trí `decodePublicCred` / `resolvePublicCred`.
- Aimsíonn sé luachanna amha a leanann réimíreanna aitheanta cheana féin (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) agus cuireann sé ar aghaidh gan athrú iad, ionas go leanfaidh úsáideoirí a bhfuil luachanna amha acu ina `.env` reatha ag obair gan **aon aistriú**.

Is **doiléiriú é seo, ní criptiú.** Is féidir le haon duine a léann an bunchód an luach a aisghabháil — rud atá ceart go leor toisc go bhfuil an luach poiblí de réir dearaidh. Is é an t-aon sprioc ná meaitseálacha sloinn rialta scanóirí a sheachaint.

## An patrún éigeantach

### 1. Dintiúr poiblí nua a chur leis

Nuair is gá duit luach nua arna sholáthar ag soláthraí réamhtheachtach a leabú, ar luach é:

- a thagann ó CLI poiblí / aip deisce / beart brabhsálaí, **agus**
- a ndéanann an soláthraí réamhtheachtach é a dhoiciméadú (nó a láimhseáil) mar aitheantóir cliant poiblí, **agus**
- a mheaitseálfadh scanóir patrún murach sin é (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, etc.),

…lean an seicliosta seo:

1. Gin an seicheamh beart mascáilte:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Cuir iontráil nua le `EMBEDDED_DEFAULTS` in `open-sse/utils/publicCreds.ts` agus **ainm neodrach eochrach** uirthi (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, etc.). Ná húsáid ainmneacha amhail `client_secret` nó `api_key` sa chúntóir — gníomhachtaíonn na focail sin rialacha cineálacha rúin Semgrep.

3. Cuir `keyof typeof EMBEDDED_DEFAULTS` leis an aontas cineáil poiblí (déantar é a thuiscint go huathoibríoch).

4. Sa chód tomhaltóra, cuir an méid seo a leanas in ionad an luacha liteartha crua-chódaithe:

   ```ts
   // sárú aonair ón timpeallacht
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // roinnt ailiasanna timpeallachta (is é an chéad cheann nach bhfuil folamh a bhuann)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // gan aon sárú ón timpeallacht (an réamhshocrú leabaithe i gcónaí)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Bain an luach liteartha ó `.env.example` (cuir doiciméadacht i bhfoirm nótaí tráchta amháin ina ionad, a threoraíonn léitheoirí anseo):

   ```dotenv
   # ── Soláthraí (Google / Firebase / etc.) ──
   # Tá dintiúir phoiblí OAuth ionsuite sa chód trí
   # open-sse/utils/publicCreds.ts. Socraigh na hathróga seo chun do chuid féin a úsáid amháin.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Nuashonraigh `tests/unit/publicCreds.test.ts` chun dearbhú crutha a chur leis don eochair nua (fíoraigh an fhormáid, ní an luach liteartha — féach ar na tástálacha atá ann cheana don phatrún).

7. **Ná cuir riamh** luachanna liteartha `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` le comhaid tástála. Úsáid na tairisigh `FAKE_*` atá tógtha as blúirí `.join("")` (féach ar na tástálacha atá ann cheana).

### 2. Tomhaltóirí

- **Léigh ó `resolvePublicCred()` / `resolvePublicCredMulti()` amháin** — ná glaoigh ar `decodePublicCredBytes()` go díreach lasmuigh den chúntóir riamh.
- Tá an cúntóir saor d'aon ghnó (XOR líneach ar bhearta) agus is féidir glaoch air go sábháilte ag am lódála modúil; ríomhtar na réamhshocruithe uair amháin.
- Bíonn an bua ag an sárú ón timpeallacht i gcónaí. Má shocraíonn úsáideoir `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, cuireann an cúntóir an luach amh sin ar aghaidh gan athrú.

### 3. Patrúin thoirmiscthe

❌ **Ná déan riamh** aon cheann de na rudaí seo a leanas i gcód táirgthe (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// DROCH: gníomhachtaíonn luach liteartha Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// DROCH: base64 den luach liteartha — aimsíonn GitHub é fós ó Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// DROCH: comhchaitéiniú teaghrán a athchóimeálann an patrún ag am rite
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// DROCH: ionchódú heicsidheachúlach/ROT13 — doiléiriú éagsúil, an riosca braite céanna
clientSecret: hexDecode("474f4353..."),
```

Gníomhachtóidh siad seo go léir scanóir sa deireadh. Úsáid `resolvePublicCred()`.

❌ **Ná cuir riamh** dintiúir liteartha le `.env.example`. Is féidir le húsáideoirí a bhfuil fíorluachanna réamhtheachtacha de dhíth orthu iad a bhaint as an CLI poiblí iad féin, nó a gclárúchán OAuth féin a úsáid.

❌ **Ná díbir riamh** foláireamh nua maidir le scanadh rúin gan seiceáil ar dtús ar cheart an dintiúr a bhogadh chuig an gcúntóir seo.

## Rialuithe gaolmhara

- Áiríonn `RAW_VALUE_PATTERN` in `publicCreds.ts` na réimíreanna a spreagann cur ar aghaidh gan athrú (comhoiriúnacht siarghabhálach). Ná leathnaigh é ach amháin le haghaidh formáidí do dhintiúir phoiblí atá doiciméadaithe, agus ná déan amhlaidh riamh le haghaidh rúin dílseánaigh.
- Tá `.env.example` san áireamh i script `check-env-doc-sync` CI — nuair a bhaineann tú athróg anseo, cinntigh go bhfuil an doiciméadacht ag teacht leis.
- Ní mór do na sraitheanna `npm run test:vitest` agus `node --import tsx/esm --test tests/unit/publicCreds.test.ts` fanacht glas araon.

## Cathain NÁ húsáidtear an áis seo

Tá an áis seo **do dhintiúir amháin** atá:

1. Dáilte go poiblí ag an soláthraí réamhtheachtach (dénártha CLI, beart brabhsálaí, doiciméadacht oifigiúil).
2. Doiciméadaithe nó tugtha le tuiscint go láidir mar dhintiúir neamhrúnda (faoi chosaint PKCE, eochair Firebase Web, nó a leithéid).

I ngach cás eile — comharthaí arna n-eisiúint ag oibreoir, rúin in aghaidh an tionónta, client_secret d'fheidhmchláir OAuth féin, eochracha criptithe, rúin JWT, pasfhocail bunachair sonraí — úsáid **athróga timpeallachta amháin** (`process.env.FOO`, cúltaca `||` go teaghrán folamh / earráid shainráite). Is in `.env` agus sa [stór dintiúr criptithe](./COMPLIANCE.md) ba cheart iad seo a bheith, ní sa chód foinseach.

## Tagairtí

- [Google: OAuth 2.0 d'fheidhmchláir dhúchasacha](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Eochracha API chun cliaint a shainaithint](https://firebase.google.com/docs/projects/api-keys)
- [Rúin a dtacaíonn Scanadh Rúin GitHub leo](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: brath base64 le haghaidh comharthaí (Feabhra 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Tiomantas a thug an áis seo isteach: `1a39c31f` — _fix(security): folaigh dintiúir phoiblí réamhtheachtacha + láraigh sláintiú earráidí_
