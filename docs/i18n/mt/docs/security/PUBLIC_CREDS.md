# Public Credentials Handling (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Sors awtorevoli:** `open-sse/utils/publicCreds.ts`
> **Testijiet:** `tests/unit/publicCreds.test.ts`
> **Aġġornat l-aħħar:** 2026-08-07 — v3.8.50
> **Udjenza:** Inġiniera li jintegraw fornituri li jqassmu OAuth client_id / client_secret / Firebase Web API keys pubbliċi fis-CLIs pubbliċi tagħhom.
> **Status:** **OBBLIGATORJU** għall-kodiċi ġdid kollu li jinkorpora identifikaturi upstream.

## Għaliex jeżisti dan

- [OAuth 2.0 għal apps nattivi (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret għal apps installati huma pubbliċi; PKCE jipprovdi s-sigurtà effettiva.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — L-identifikaturi tal-klijent Web huma pubbliċi skont id-disinn.

OmniRoute għandu jinkorpora dawn il-valuri sabiex l-utenti li ma jikkonfigurawx `.env` xorta jkollhom fluss OAuth li jaħdem minnufih. Mingħajr fallback inkorporat, il-fornituri Gemini / Antigravity jieqfu jaħdmu għal kull utent li jsegwi l-metodu "sempliċement ikklona u ħaddem".

Madankollu, valuri litterali bħal `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` jiġu identifikati minn **GitHub Secret Scanning**, **Semgrep**, u skeners simili bbażati fuq mudelli. Kull rilaxx isir sensiela storbjuża ta’ pożittivi foloz, il-protezzjoni tal-push timblokka commits leġittimi, u l-operaturi jieqfu jafdaw il-fluss tat-twissijiet.

Il-helper `open-sse/utils/publicCreds.ts` isolvi ż-żewġ restrizzjonijiet f’daqqa:

- Jinkorpora l-identifikatur pubbliku bħala **sekwenza ta’ bytes maskrata b’XOR** (l-ebda mudell tal-iskeners fil-kodiċi sors).
- Jiddeċodifika waqt l-eżekuzzjoni permezz ta’ `decodePublicCred` / `resolvePublicCred`.
- Jidentifika valuri mhux ipproċessati li diġà jsegwu prefissi magħrufa sew (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) u jgħaddihom mingħajr tibdil, sabiex l-utenti b’valuri mhux ipproċessati fil-`.env` eżistenti tagħhom jibqgħu jaħdmu b’**ebda migrazzjoni**.

Din hija **offuskazzjoni, mhux kriptaġġ.** Kull min jaqra l-kodiċi sors jista’ jirkupra l-valur — u dan ma joħloqx problema għax il-valur huwa pubbliku skont id-disinn. L-uniku għan huwa li jiġu evitati t-tqabbiliet mar-regex tal-iskeners.

## Il-mudell obbligatorju

### 1. Żieda ta’ kredenzjali pubblika ġdida

Meta jkollok bżonn tinkorpora valur ġdid ipprovdut minn upstream li:

- jiġi minn CLI pubblika / app tad-desktop / bundle tal-browser, **u**
- il-fornitur upstream jiddokumentah (jew jittrattah) bħala identifikatur pubbliku tal-klijent, **u**
- skener tal-mudelli kieku jidentifikah (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, eċċ.),

…segwi din il-lista ta’ kontroll:

1. Iġġenera s-sekwenza maskrata ta’ bytes:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Żid entrata ġdida ma’ `EMBEDDED_DEFAULTS` f’`open-sse/utils/publicCreds.ts` b’**isem newtrali għaċ-ċavetta** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, eċċ.). **Tużax** ismijiet bħal `client_secret` jew `api_key` fil-helper — dawk il-kliem jattivaw ir-regoli generic-secret ta’ Semgrep.

3. Żid `keyof typeof EMBEDDED_DEFAULTS` mal-unjoni tat-tip pubbliku (dan jiġi inferit awtomatikament).

4. Fil-kodiċi tal-konsumatur, ibdel il-valur litterali hardcoded b’dan:

   ```ts
   // override wieħed mill-env
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // diversi aliases tal-env (jirbaħ l-ewwel wieħed li mhux vojt)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // l-ebda override mill-env (dejjem jintuża d-default inkorporat)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Neħħi l-valur litterali minn `.env.example` (ibdlu b’dokumentazzjoni magħmula biss minn kummenti li tidderieġi lill-qarrejja hawn):

   ```dotenv
   # ── Fornitur (Google / Firebase / eċċ.) ──
   # Il-kredenzjali OAuth pubbliċi huma inkorporati fil-kodiċi permezz ta’
   # open-sse/utils/publicCreds.ts. Issettja dawn il-varjabbli biss biex tuża tiegħek.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Aġġorna `tests/unit/publicCreds.test.ts` biex iżżid asserzjoni tal-forma għaċ-ċavetta l-ġdida (ivverifika l-format, mhux il-valur litterali — ara t-testijiet eżistenti għall-mudell).

7. **Qatt** iżżid valuri litterali `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` fil-fajls tat-testijiet. Uża l-kostanti `FAKE_*` mibnija minn frammenti `.join("")` (ara t-testijiet eżistenti).

### 2. Konsumaturi

- **Aqra biss minn `resolvePublicCred()` / `resolvePublicCredMulti()`** — qatt issejjaħ `decodePublicCredBytes()` direttament barra mill-helper.
- Il-helper huwa intenzjonalment ħafif (XOR lineari tal-bytes) u sikur biex jissejjaħ waqt it-tagħbija tal-modulu; id-defaults jiġu kkalkolati darba biss.
- L-override mill-env dejjem jieħu preċedenza. Jekk utent jissettja `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, il-helper jgħaddi dak il-valur mhux ipproċessat mingħajr tibdil.

### 3. Mudelli pprojbiti

❌ **Qatt** tagħmel xi waħda minn dawn li ġejjin fil-kodiċi tal-produzzjoni (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ĦAŻIN: il-valur litterali jattiva Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ĦAŻIN: base64 tal-valur litterali — GitHub għadu jidentifikah minn Frar/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ĦAŻIN: konkatenazzjoni ta’ strings li terġa’ tarma l-mudell waqt l-eżekuzzjoni
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ĦAŻIN: kodifikazzjoni hex/ROT13 — offuskazzjoni differenti, l-istess riskju ta’ identifikazzjoni
clientSecret: hexDecode("474f4353..."),
```

Dawn kollha eventwalment jattivaw skener. Uża `resolvePublicCred()`.

❌ **Qatt** iżżid kredenzjali litterali ma’ `.env.example`. L-utenti li jeħtieġu valuri upstream reali jistgħu jestrattawhom huma stess mill-CLI pubblika, jew jużaw ir-reġistrazzjoni OAuth tagħhom stess.

❌ **Qatt** tinjora twissija ġdida tal-iskannjar tas-sigrieti mingħajr ma l-ewwel tiċċekkja jekk il-kredenzjali għandhiex titmexxa għal dan il-helper.

## Kontrolli relatati

- `RAW_VALUE_PATTERN` f’`publicCreds.ts` jelenka l-prefissi li jattivaw il-mogħdija diretta (retrokompatibbiltà). Estendih biss għal formati dokumentati ta’ kredenzjali pubbliċi, u qatt għal sigrieti proprjetarji.
- `.env.example` jinsab fl-iskript `check-env-doc-sync` tas-CI — meta tneħħi varjabbli minn hawn, kun żgur li d-dokumentazzjoni tkun taqbel.
- Is-settijiet ta’ testijiet `npm run test:vitest` u `node --import tsx/esm --test tests/unit/publicCreds.test.ts` għandhom jibqgħu jgħaddu t-tnejn.

## Meta MA għandekx tuża din il-funzjoni ta’ għajnuna

Din il-funzjoni ta’ għajnuna hija **biss** għal kredenzjali li huma:

1. Imqassma pubblikament mill-fornitur oriġinali (binarju tas-CLI, pakkett tal-browser, dokumentazzjoni uffiċjali).
2. Dokumentati jew implikati b’mod qawwi bħala mhux kunfidenzjali (protetti bil-PKCE, ċavetta tal-Web ta’ Firebase, jew simili).

Għal kull ħaġa oħra — tokens maħruġa mill-operatur, sigrieti għal kull tenant, il-client_secret tal-app OAuth tiegħek stess, ċwievet tal-kriptaġġ, sigrieti JWT, passwords tad-database — uża **varjabbli tal-ambjent biss** (`process.env.FOO`, b’`||` bħala alternattiva għal valur vojt / żball espliċitu). Dawn għandhom jinżammu f’`.env` u fil-[ħażna kriptata tal-kredenzjali](./COMPLIANCE.md), mhux fil-kodiċi sors.

## Referenzi

- [Google: OAuth 2.0 għal apps nattivi](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Ċwievet API għall-identifikazzjoni tal-klijent](https://firebase.google.com/docs/projects/api-keys)
- [Sigrieti appoġġjati mill-Iskennjar tas-Sigrieti ta’ GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: detezzjoni base64 għat-tokens (Fra 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit li introduċa din il-funzjoni ta’ għajnuna: `1a39c31f` — _fix(security): aħbi l-kredenzjali pubbliċi upstream + iċċentralizza s-sanitizzazzjoni tal-iżbalji_
