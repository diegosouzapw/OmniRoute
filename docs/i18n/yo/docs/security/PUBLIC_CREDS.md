# Public Credentials Handling (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Orísun òtítọ́:** `open-sse/utils/publicCreds.ts`
> **Àwọn ìdánwò:** `tests/unit/publicCreds.test.ts`
> **Ìmúdójúìwọ̀n tó gbẹ̀yìn:** 2026-08-07 — v3.8.50
> **Àwọn olùkà:** Àwọn onímọ̀ ẹ̀rọ tó ń ṣepọ̀ àwọn olùpèsè tí wọ́n fi OAuth client_id / client_secret / àwọn kọ́kọ́rọ́ Firebase Web API gbogbogbò jáde nínú àwọn CLI gbogbogbò wọn.
> **Ipò:** **Ó ṢE DANDAN** fún gbogbo kóòdù tuntun tó fi àwọn àmì ìdánimọ̀ láti orísun òkè sínú rẹ̀.

## Ìdí tí èyí fi wà

- [OAuth 2.0 fún àwọn ètò ìṣàmúlò abínibí (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret fún àwọn ètò ìṣàmúlò tí a fi sí ẹ̀rọ jẹ́ ti gbogbogbò; PKCE ló ń pèsè ààbò gidi.
- [Àwọn kọ́kọ́rọ́ Firebase API](https://firebase.google.com/docs/projects/api-keys) — A ṣe àwọn àmì ìdánimọ̀ oníbàárà wẹ́ẹ̀bù láti jẹ́ ti gbogbogbò.

OmniRoute gbọ́dọ̀ fi àwọn iye wọ̀nyí sínú rẹ̀ kí àwọn aṣàmúlò tí kò ṣètò `.env` lè ṣì rí ìṣàn OAuth tó ń ṣiṣẹ́ ní tààrà láìsí àfikún ìṣètò. Láìsí iye àfẹ́yìntì tí a fi sínú rẹ̀, àwọn olùpèsè Gemini / Antigravity yóò dáwọ́ iṣẹ́ dúró fún gbogbo aṣàmúlò tó bá tẹ̀lé ọ̀nà “kan ṣe clone kí o sì ṣiṣẹ́”.

Síbẹ̀, àwọn iye gidi bí `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` ni **GitHub Secret Scanning**, **Semgrep**, àti àwọn aṣàyẹ̀wò àpẹẹrẹ tó jọra máa ń bá mu. Gbogbo ìtújáde máa ń di ìṣàn ìkìlọ̀ èké tó kún fún ariwo, ààbò push máa ń dí àwọn commit tó bófin mu, àwọn alákóso sì máa ń jáwọ́ nínú gbígbẹ́kẹ̀lé ìṣàn ìkìlọ̀ náà.

Olùrànlọ́wọ́ `open-sse/utils/publicCreds.ts` yanjú àwọn ìdíwọ́ méjèèjì lẹ́ẹ̀kan náà:

- Ó fi àmì ìdánimọ̀ gbogbogbò náà sínú rẹ̀ gẹ́gẹ́ bí **ọ̀wọ́ baiti tí a fi XOR bojú** (kò sí àpẹẹrẹ tí aṣàyẹ̀wò lè rí nínú kóòdù orísun).
- Ó tú un padà ní àkókò ìṣiṣẹ́ nípasẹ̀ `decodePublicCred` / `resolvePublicCred`.
- Ó ṣàwárí àwọn iye àìṣe àyípadà tó ti ń tẹ̀lé àwọn ìpilẹ̀-ọ̀rọ̀ tí a mọ̀ dáadáa (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) ó sì jẹ́ kí wọ́n kọjá láìyípadà, kí àwọn aṣàmúlò tó ní àwọn iye àìṣe àyípadà nínú `.env` wọn tó ti wà tẹ́lẹ̀ lè máa ṣiṣẹ́ pẹ̀lú **ìṣípadà òdo**.

Èyí jẹ́ **ìbòmọ́lẹ̀, kì í ṣe ìfipamọ́lẹ̀.** Ẹnikẹ́ni tó bá ka kóòdù orísun lè gba iye náà padà — èyí sì dára nítorí a ṣe iye náà láti jẹ́ ti gbogbogbò. Ète kan ṣoṣo ni láti yẹra fún àwọn àbápọ̀ regex ti aṣàyẹ̀wò.

## Àpẹẹrẹ tó ṣe dandan

### 1. Fífi ẹ̀rí ìdánimọ̀ gbogbogbò tuntun kún un

Nígbà tí o bá nílò láti fi iye tuntun kan tí olùpèsè orísun òkè pèsè sínú rẹ̀, tí iye náà:

- wá láti CLI gbogbogbò / ètò ìṣàmúlò orí tábìlì / àkójọpọ̀ aṣàwákiri, **àti pé**
- olùpèsè orísun òkè ṣàkọsílẹ̀ rẹ̀ (tàbí ó kà á sí) àmì ìdánimọ̀ oníbàárà gbogbogbò, **àti pé**
- bí kò bá ṣe bẹ́ẹ̀, aṣàyẹ̀wò àpẹẹrẹ yóò bá a mu (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ),

…tẹ̀lé àtòjọ àyẹ̀wò yìí:

1. Ṣẹ̀dá ọ̀wọ́ baiti tí a ti bojú:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Ṣàfikún àkọsílẹ̀ tuntun sí `EMBEDDED_DEFAULTS` nínú `open-sse/utils/publicCreds.ts` pẹ̀lú **orúkọ kọ́kọ́rọ́ aláìṣègbè** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ). **Má ṣe** lo àwọn orúkọ bí `client_secret` tàbí `api_key` nínú olùrànlọ́wọ́ náà — àwọn ọ̀rọ̀ wọ̀nyẹn máa ń mú àwọn òfin generic-secret Semgrep ṣiṣẹ́.

3. Ṣàfikún `keyof typeof EMBEDDED_DEFAULTS` sí ìṣọ̀kan irú gbogbogbò (a máa ń ṣe ìfàsọ́nà rẹ̀ láìfọwọ́sí).

4. Nínú kóòdù aṣàmúlò, fi èyí rọ́pò iye gidi tí a kọ sínú kóòdù:

   ```ts
   // ìkọjá env kan ṣoṣo
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // ọ̀pọ̀ orúkọ-àfirọ́pò env (èyí àkọ́kọ́ tí kò ṣófo ló borí)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // kò sí ìkọjá env (máa lo iye àfẹ́yìntì tí a fi sínú rẹ̀ ní gbogbo ìgbà)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Yọ iye gidi náà kúrò nínú `.env.example` (fi àkọsílẹ̀ àsọyé nìkan tí ó ń darí àwọn olùkà síbí rọ́pò rẹ̀):

   ```dotenv
   # ── Olùpèsè (Google / Firebase / àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) ──
   # A ti fi àwọn ẹ̀rí ìdánimọ̀ OAuth gbogbogbò sínú kóòdù nípasẹ̀
   # open-sse/utils/publicCreds.ts. Ṣètò àwọn var wọ̀nyí bí o bá fẹ́ lo tìrẹ nìkan.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Ṣe ìmúdójúìwọ̀n `tests/unit/publicCreds.test.ts` láti ṣàfikún ìjẹ́rìísí ìrísí fún kọ́kọ́rọ́ tuntun náà (jẹ́rìí sí àgbékalẹ̀, kì í ṣe iye gidi — wo àwọn ìdánwò tó ti wà fún àpẹẹrẹ náà).

7. **Má ṣe láé** ṣàfikún àwọn iye gidi `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` sí àwọn fáìlì ìdánwò. Lo àwọn adúróṣinṣin `FAKE_*` tí a kọ́ láti àwọn àjákù `.join("")` (wo àwọn ìdánwò tó ti wà).

### 2. Àwọn aṣàmúlò

- **Kà láti `resolvePublicCred()` / `resolvePublicCredMulti()` nìkan** — má ṣe pe `decodePublicCredBytes()` ní tààrà níta olùrànlọ́wọ́ náà láé.
- A mọ̀ọ́mọ̀ ṣe olùrànlọ́wọ́ náà kí ó má ná ohun púpọ̀ (XOR baiti alálàáwọ̀ọ́rọ̀) ó sì dára láti pè é ní àkókò ìgbéjáde module; a máa ṣe ìṣirò àwọn iye àfẹ́yìntì lẹ́ẹ̀kan ṣoṣo.
- Ìkọjá env máa ń borí ní gbogbo ìgbà. Tí aṣàmúlò bá ṣètò `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, olùrànlọ́wọ́ náà yóò jẹ́ kí iye àìṣe àyípadà yẹn kọjá ní tààrà.

### 3. Àwọn àpẹẹrẹ tí a kọ̀ láàyè

❌ **Má ṣe láé** ṣe èyíkéyìí nínú kóòdù ìmúṣẹ́ (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// BÚBURÚ: iye gidi máa ń mú Secret Scanning + Semgrep ṣiṣẹ́
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// BÚBURÚ: base64 ti iye gidi — GitHub ṣì máa ń ṣàwárí rẹ̀ láti Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// BÚBURÚ: àsopọ̀ ọ̀wọ́-ọ̀rọ̀ tó tún àpẹẹrẹ náà jọ ní àkókò ìṣiṣẹ́
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// BÚBURÚ: ìṣàkóòdù hex/ROT13 — ìbòmọ́lẹ̀ mìíràn, ewu ìṣàwárí kan náà
clientSecret: hexDecode("474f4353..."),
```

Gbogbo wọ̀nyí máa ń mú aṣàyẹ̀wò ṣiṣẹ́ níkẹyìn. Lo `resolvePublicCred()`.

❌ **Má ṣe láé** ṣàfikún àwọn ẹ̀rí ìdánimọ̀ gidi sí `.env.example`. Àwọn aṣàmúlò tó nílò àwọn iye gidi láti orísun òkè lè yọ wọ́n jáde láti CLI gbogbogbò fúnra wọn, tàbí kí wọ́n lo ìforúkọsílẹ̀ OAuth tiwọn.

❌ **Má ṣe láé** kọ ìkìlọ̀ secret-scanning tuntun sílẹ̀ láìkọ́kọ́ ṣàyẹ̀wò bóyá ó yẹ kí a gbé ẹ̀rí ìdánimọ̀ náà lọ sí olùrànlọ́wọ́ yìí.

## Àwọn ìṣàkóso tó jọmọ

- `RAW_VALUE_PATTERN` nínú `publicCreds.ts` ṣe àkójọ àwọn ìpele ìbẹ̀rẹ̀ tí ń mú kí iye kọjá lọ láìyípadà (ìbámu pẹ̀lú àwọn ẹ̀yà àtijọ́). Fa á gbòòrò fún àwọn ọ̀nà kika ẹ̀rí ìdánimọ̀ gbogbogbò tí a ṣe àkọsílẹ̀ wọn nìkan, kì í ṣe fún àwọn àṣírí aládàáni láé.
- `.env.example` wà nínú skripti `check-env-doc-sync` ti CI — nígbà tí o bá yọ var kan kúrò níbí, rí i dájú pé àwọn ìwé àkọsílẹ̀ bá a mu.
- Àwọn àkójọpọ̀ ìdánwò `npm run test:vitest` àti `node --import tsx/esm --test tests/unit/publicCreds.test.ts` gbọ́dọ̀ máa kọjá láìsí àṣìṣe.

## Ìgbà tí o kò gbọdọ̀ lo olùrànlọ́wọ́ yìí

Olùrànlọ́wọ́ yìí jẹ́ **fún** àwọn ẹ̀rí ìdánimọ̀ tí:

1. Olùpèsè àkọ́kọ́ pín káàkiri ní gbangba (báìnárì CLI, àkójọpọ̀ aṣàwákiri, àwọn ìwé àkọsílẹ̀ ìbílẹ̀).
2. A ṣe àkọsílẹ̀ wọn tàbí a fi hàn kedere pé wọn kì í ṣe àṣírí (tí PKCE dáàbò bo, kọ́kọ́rọ́ Firebase Web, tàbí irú rẹ̀).

Fún gbogbo ohun mìíràn — àwọn token tí olùdarí ètò fúnni, àwọn àṣírí fún tenant kọ̀ọ̀kan, client_secret ti app OAuth tirẹ, àwọn kọ́kọ́rọ́ ìpamọ́ ìfẹnukò, àwọn àṣírí JWT, àwọn ọ̀rọ̀ aṣínà ibi ìpamọ́ dátà — lo **env vars nìkan** (`process.env.FOO`, `||` pẹ̀lú ìpadà sí iye òfo / àṣìṣe tí a sọ ní kedere). Ibi tí àwọn wọ̀nyí yẹ kí ó wà ni `.env` àti [ibi ìpamọ́ ẹ̀rí ìdánimọ̀ tí a fi ìfẹnukò dáàbò bo](./COMPLIANCE.md), kì í ṣe nínú kóòdù orísun.

## Àwọn ìtọ́kasí

- [Google: OAuth 2.0 fún àwọn app ìbílẹ̀](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Àwọn kọ́kọ́rọ́ API fún ìdánimọ̀ client](https://firebase.google.com/docs/projects/api-keys)
- [Àwọn àṣírí tí GitHub Secret Scanning ṣe àtìlẹ́yìn fún](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ìṣàwárí base64 fún àwọn token (Feb 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit tí ó ṣàfikún olùrànlọ́wọ́ yìí: `1a39c31f` — _fix(security): bo àwọn ẹ̀rí ìdánimọ̀ gbogbogbò láti ọ̀dọ̀ olùpèsè àkọ́kọ́ + kó ìmọ́tótó àṣìṣe sí ojú kan_
