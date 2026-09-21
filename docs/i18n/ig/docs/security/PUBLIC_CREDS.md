# Public Credentials Handling (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Isi iyi nke eziokwu:** `open-sse/utils/publicCreds.ts`
> **Nnwale:** `tests/unit/publicCreds.test.ts`
> **Emelitere ikpeazụ:** 2026-08-07 — v3.8.50
> **Ndị e bu n’obi:** Ndị injinia na-ejikọta ndị na-eweta ọrụ nke na-etinye OAuth client_id / client_secret / Firebase Web API keys ọha n’ime CLI ọha ha.
> **Ọnọdụ:** **Ọ BỤ IWU** maka koodu ọhụrụ niile na-etinye ihe njirimara sitere n’elu.

## Ihe mere nke a ji dị

- [OAuth 2.0 maka ngwa native (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret maka ngwa arụnyere bụ nke ọha; PKCE na-enye nchekwa n’ezie.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — E mere ihe njirimara Web ka ha bụrụ nke ọha.

OmniRoute ga-etinyerịrị ụkpụrụ ndị a ka ndị ọrụ na-ahazighị `.env` ka nwee usoro OAuth na-arụ ọrụ ozugbo. Enweghị fallback e tinyere n’ime ya, ndị na-eweta Gemini / Antigravity ga-akwụsị ịrụ ọrụ maka onye ọrụ ọ bụla na-agbaso ụzọ “naanị clone ma mee ka ọ rụọ ọrụ”.

Agbanyeghị, ụkpụrụ nkịtị dịka `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` na-adaba na ụkpụrụ ọchụchọ nke **GitHub Secret Scanning**, **Semgrep**, na ndị nyocha ụkpụrụ yiri ha. Release ọ bụla na-eweta ọtụtụ false positives na-enweghị isi, push protection na-egbochi commit ziri ezi, ndị na-ahụ maka sistemụ wee kwụsị ịtụkwasị alert feed obi.

Helper `open-sse/utils/publicCreds.ts` na-edozi ihe abụọ a chọrọ n’otu oge:

- Na-etinye ihe njirimara ọha dịka **usoro byte e ji XOR kpuchie** (enweghị ụkpụrụ scanner n’ime source).
- Na-eme decode n’oge runtime site na `decodePublicCred` / `resolvePublicCred`.
- Na-achọpụta raw values ndị na-agbasolarị prefix ndị a ma ama (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) ma nyefee ha n’agbanweghị ha, ka ndị ọrụ nwere raw values n’ime `.env` ha dị ugbu a nọgide na-arụ ọrụ na **enweghị migration ọbụla**.

Nke a bụ **obfuscation, ọ bụghị encryption.** Onye ọ bụla na-agụ source nwere ike iweghachite value ahụ — nke ahụ dị mma n’ihi na e mere value ahụ ka ọ bụrụ nke ọha. Naanị ebumnuche ya bụ izere ndakọrịta regex nke scanner.

## Ụkpụrụ a ga-agbasorịrị

### 1. Ịgbakwunye credential ọha ọhụrụ

Mgbe ịchọrọ itinye value ọhụrụ nke upstream nyere nke:

- sitere na CLI ọha / ngwa desktop / browser bundle, **ma**
- onye na-eweta upstream kọwara (ma ọ bụ na-ewere) ya dịka ihe njirimara client nke ọha, **ma**
- pattern scanner ga-adaba na ya ma ọ bụrụ na emeghị nke a (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, dgz.),

…soro ndepụta nyocha a:

1. Mepụta usoro byte e kpuchiri:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Tinye entry ọhụrụ na `EMBEDDED_DEFAULTS` n’ime `open-sse/utils/publicCreds.ts` nke nwere **aha key na-anọpụ iche** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, dgz.). Ejila aha dịka `client_secret` ma ọ bụ `api_key` n’ime helper — okwu ndị ahụ na-akpalite generic-secret rules nke Semgrep.

3. Tinye `keyof typeof EMBEDDED_DEFAULTS` na public type union (a na-infer ya na-akpaghị aka).

4. N’ime consumer code, jiri nke a dochie hardcoded literal:

   ```ts
   // otu env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // ọtụtụ env alias (nke mbụ na-adịghị efu na-emeri)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // enweghị env override (na-eji embedded default mgbe niile)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Wepụ literal ahụ na `.env.example` (jiri akwụkwọ nkọwa dị naanị na comment nke na-egosi ndị na-agụ ya ebe a dochie ya):

   ```dotenv
   # ── Onye na-eweta ọrụ (Google / Firebase / dgz.) ──
   # E tinyela OAuth credentials ọha n’ime koodu site na
   # open-sse/utils/publicCreds.ts. Tọọ vars ndị a naanị ma ọ bụrụ na ịchọrọ iji nke gị.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Melite `tests/unit/publicCreds.test.ts` iji gbakwunye shape assertion maka key ọhụrụ ahụ (nyochaa format, ọ bụghị literal value — lee nnwale ndị dị ugbu a maka ụkpụrụ ahụ).

7. **Etinyekwala mgbe ọbụla** literal `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` n’ime faịlụ nnwale. Jiri constants `FAKE_*` e ji fragments `.join("")` wuo (lee nnwale ndị dị ugbu a).

### 2. Ndị na-eji ya

- **Gụọ naanị site na `resolvePublicCred()` / `resolvePublicCredMulti()`** — akpọla `decodePublicCredBytes()` ozugbo n’èzí helper.
- E mere helper ahụ ka ọ dị ọnụ ala n’ụma (linear byte XOR), ọ dịkwa mma ịkpọ ya n’oge module-load; a na-agbakọ defaults naanị otu ugboro.
- Env override na-emeri mgbe niile. Ọ bụrụ na onye ọrụ tọọ `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, helper ahụ ga-enyefe raw value ahụ ozugbo n’agbanweghị ya.

### 3. Ụkpụrụ amachibidoro

❌ **Emela mgbe ọbụla** nke ọ bụla n’ime ihe ndị a n’ime production code (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ỌJỌỌ: literal value na-akpalite Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ỌJỌỌ: base64 nke literal ahụ — GitHub ka na-achọpụta ya kemgbe Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ỌJỌỌ: ijikọ string nke na-achịkọta ụkpụrụ ahụ ọzọ n’oge runtime
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ỌJỌỌ: encoding hex/ROT13 — obfuscation dị iche, otu ihe ize ndụ nchọpụta ahụ
clientSecret: hexDecode("474f4353..."),
```

Ihe ndị a niile ga-emecha kpalite scanner. Jiri `resolvePublicCred()`.

❌ **Etinyekwala mgbe ọbụla** literal credentials na `.env.example`. Ndị ọrụ chọrọ ezigbo upstream values nwere ike iwepụta ha n’onwe ha site na CLI ọha, ma ọ bụ jiri OAuth registration nke ha.

❌ **Elegharala mgbe ọbụla** alert ọhụrụ nke secret-scanning anya n’ebughị ụzọ lelee ma ekwesịrị ibuga credential ahụ na helper a.

## Njikwa ndị metụtara ya

- `RAW_VALUE_PATTERN` dị na `publicCreds.ts` na-edepụta prefixes ndị na-akpalite izipu uru ahụ dịka ọ dị (retrocompat). Gbasaa ya naanị maka usoro nzere ọhaneze edekọtara n’akwụkwọ, ọ bụghị maka ihe nzuzo nke ụlọ ọrụ.
- `.env.example` dị n’ime skripti CI `check-env-doc-sync` — mgbe ị wepụrụ var n’ebe a, gbaa mbọ na akwụkwọ nkọwa kwekọrọ.
- Ule `npm run test:vitest` na `node --import tsx/esm --test tests/unit/publicCreds.test.ts` ga-anọgide na-agafe nke ọma.

## Mgbe a na-EKWESỊGHỊ iji helper a

Helper a bụ **naanị** maka nzere ndị:

1. Onye na-enye ọrụ mbụ na-ekesa n’ihu ọha (CLI binary, browser bundle, akwụkwọ nkọwa gọọmentị).
2. E dere n’akwụkwọ ma ọ bụ gosipụta nke ọma na ha abụghị ihe nzuzo (nke PKCE na-echebe, Firebase Web key, na ihe ndị yiri ha).

Maka ihe ndị ọzọ niile — token ndị onye na-ahụ maka sistemụ nyere, ihe nzuzo tenant ọ bụla, `client_secret` nke ngwa OAuth nke gị, igodo izo ya ezo, ihe nzuzo JWT, okwuntughe database — jiri **env vars naanị** (`process.env.FOO`, `||` fallback gaa na uru efu / njehie akọwapụtara nke ọma). Ihe ndị a kwesịrị ịdị na `.env` na [ebe nchekwa nzere ezoro ezo](./COMPLIANCE.md), ọ bụghị na source.

## Nrụtụaka

- [Google: OAuth 2.0 maka ngwa native](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API keys maka njirimara client](https://firebase.google.com/docs/projects/api-keys)
- [Ihe nzuzo GitHub Secret Scanning na-akwado](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: nchọpụta base64 maka token (Feb 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit webatara helper a: `1a39c31f` — _fix(security): kpuchie nzere ọhaneze sitere n’aka onye na-enye ọrụ mbụ + chịkọta nhicha njehie n’otu ebe_
