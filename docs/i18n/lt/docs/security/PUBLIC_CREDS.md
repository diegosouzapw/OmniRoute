# Public Credentials Handling (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Patikimas šaltinis:** `open-sse/utils/publicCreds.ts`
> **Testai:** `tests/unit/publicCreds.test.ts`
> **Paskutinį kartą atnaujinta:** 2026-08-07 — v3.8.50
> **Auditorija:** Inžinieriai, integruojantys teikėjus, kurių viešose CLI pateikiami vieši OAuth client_id / client_secret / Firebase Web API raktai.
> **Būsena:** **PRIVALOMA** visam naujam kodui, kuriame įterpiami išorinių teikėjų identifikatoriai.

## Kodėl tai egzistuoja

- [OAuth 2.0 vietinėms programoms (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — įdiegtų programų OAuth client_id / client_secret yra vieši; faktinį saugumą užtikrina PKCE.
- [Firebase API raktai](https://firebase.google.com/docs/projects/api-keys) — žiniatinklio klientų identifikatoriai pagal paskirtį yra vieši.

OmniRoute turi įterpti šias reikšmes, kad `.env` nesukonfigūravę naudotojai iš karto gautų veikiančią OAuth eigą. Be įterptos atsarginės reikšmės Gemini / Antigravity teikėjai nustoja veikti visiems naudotojams, kurie pasirenka kelią „tiesiog klonuoti ir paleisti“.

Tačiau pažodines reikšmes, tokias kaip `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`, aptinka **GitHub Secret Scanning**, **Semgrep** ir panašūs šablonų skaitytuvai. Kiekvienas leidimas sukelia triukšmingą klaidingų teigiamų rezultatų srautą, push apsauga blokuoja teisėtus pakeitimus, o operatoriai nustoja pasitikėti įspėjimų srautu.

`open-sse/utils/publicCreds.ts` pagalbinė priemonė vienu metu išsprendžia abu apribojimus:

- Įterpia viešą identifikatorių kaip **XOR užmaskuotą baitų seką** (pirminiame kode nėra skaitytuvų aptinkamo šablono).
- Vykdymo metu iškoduoja per `decodePublicCred` / `resolvePublicCred`.
- Aptinka neapdorotas reikšmes, kurios jau atitinka gerai žinomus priešdėlius (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), ir perduoda jas nepakeistas, todėl naudotojų esamos `.env` neapdorotos reikšmės toliau veikia **be jokio perkėlimo**.

Tai yra **maskavimas, o ne šifravimas.** Kiekvienas, skaitantis pirminį kodą, gali atkurti reikšmę — ir tai priimtina, nes ši reikšmė pagal paskirtį yra vieša. Vienintelis tikslas — išvengti atitikčių su skaitytuvų reguliariosiomis išraiškomis.

## Privalomas šablonas

### 1. Naujo viešo prisijungimo duomens pridėjimas

Kai reikia įterpti naują išorinio teikėjo pateiktą reikšmę, kuri:

- gaunama iš viešos CLI / darbalaukio programos / naršyklės paketo, **ir**
- išorinis teikėjas ją dokumentuoja (arba traktuoja) kaip viešą kliento identifikatorių, **ir**
- kitu atveju ją aptiktų šablonų skaitytuvas (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` ir pan.),

…vadovaukitės šiuo kontroliniu sąrašu:

1. Sugeneruokite užmaskuotą baitų seką:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Į `open-sse/utils/publicCreds.ts` esantį `EMBEDDED_DEFAULTS` įtraukite naują įrašą su **neutraliu rakto pavadinimu** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` ir pan.). Pagalbinėje priemonėje **nenaudokite** tokių pavadinimų kaip `client_secret` ar `api_key` — šie žodžiai suaktyvina Semgrep bendrąsias slaptų duomenų taisykles.

3. Į viešą tipų sąjungą įtraukite `keyof typeof EMBEDDED_DEFAULTS` (jis nustatomas automatiškai).

4. Naudojančiame kode pakeiskite tiesiogiai įrašytą reikšmę šiuo kodu:

   ```ts
   // vienas aplinkos kintamojo perrašymas
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // keli aplinkos kintamųjų alternatyvūs pavadinimai (naudojama pirma netuščia reikšmė)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // nėra aplinkos kintamojo perrašymo (visada naudojama įterpta numatytoji reikšmė)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Pašalinkite pažodinę reikšmę iš `.env.example` (pakeiskite ją tik komentarais pateikta dokumentacija, nukreipiančia skaitytojus čia):

   ```dotenv
   # ── Teikėjas (Google / Firebase / ir kt.) ──
   # Vieši OAuth prisijungimo duomenys įterpti į kodą per
   # open-sse/utils/publicCreds.ts. Nustatykite šiuos kintamuosius tik norėdami naudoti savuosius.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Atnaujinkite `tests/unit/publicCreds.test.ts`, pridėdami naujo rakto formos patikrą (tikrinkite formatą, o ne pažodinę reikšmę — šabloną rasite esamuose testuose).

7. **Niekada** nepridėkite `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` pažodinių reikšmių į testų failus. Naudokite `FAKE_*` konstantas, sudarytas iš fragmentų su `.join("")` (žr. esamus testus).

### 2. Naudotojai

- **Skaitykite tik per `resolvePublicCred()` / `resolvePublicCredMulti()`** — niekada nekvieskite `decodePublicCredBytes()` tiesiogiai už pagalbinės priemonės ribų.
- Pagalbinė priemonė sąmoningai yra lengva (tiesinis baitų XOR) ir ją saugu kviesti modulio įkėlimo metu; numatytosios reikšmės apskaičiuojamos vieną kartą.
- Aplinkos kintamojo reikšmė visada turi pirmenybę. Jei naudotojas nustato `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pagalbinė priemonė perduoda šią neapdorotą reikšmę nepakeistą.

### 3. Draudžiami šablonai

❌ Gamybiniame kode (`src/`, `open-sse/`, `electron/`, `bin/`) **niekada** nedarykite nieko iš toliau nurodytų dalykų:

```ts
// BLOGAI: pažodinė reikšmė suaktyvina Secret Scanning ir Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// BLOGAI: pažodinės reikšmės base64 — GitHub vis tiek aptinka nuo 2025-02
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// BLOGAI: eilučių sujungimas, vykdymo metu iš naujo sudarantis šabloną
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// BLOGAI: hex/ROT13 kodavimas — kitoks maskavimas, ta pati aptikimo rizika
clientSecret: hexDecode("474f4353..."),
```

Visus šiuos variantus galiausiai aptinka skaitytuvas. Naudokite `resolvePublicCred()`.

❌ **Niekada** nepridėkite pažodinių prisijungimo duomenų į `.env.example`. Naudotojai, kuriems reikia tikrų išorinio teikėjo reikšmių, gali patys jas išgauti iš viešos CLI arba naudoti savo OAuth registraciją.

❌ **Niekada** neatmeskite naujo slaptų duomenų skaitytuvo įspėjimo prieš tai nepatikrinę, ar prisijungimo duomuo neturėtų būti perkeltas į šią pagalbinę priemonę.

## Susiję valdikliai

- `RAW_VALUE_PATTERN`, esantis `publicCreds.ts`, išvardija prefiksus, kurie suaktyvina reikšmės perdavimą nekeičiant (atgaliniam suderinamumui). Išplėskite jį tik dokumentuotiems viešųjų prisijungimo duomenų formatams, niekada – nuosavybinėms paslaptims.
- `.env.example` naudojamas CI scenarijuje `check-env-doc-sync` — pašalinę čia kintamąjį, įsitikinkite, kad dokumentacija jį atitinka.
- Tiek `npm run test:vitest`, tiek `node --import tsx/esm --test tests/unit/publicCreds.test.ts` testų rinkiniai turi ir toliau būti sėkmingi.

## Kada šio pagalbinio įrankio NENAUDOTI

Šis pagalbinis įrankis skirtas **tik** prisijungimo duomenims, kurie yra:

1. Viešai platinami pirminio teikėjo (CLI dvejetainis failas, naršyklės paketas, oficiali dokumentacija).
2. Dokumentuoti arba aiškiai numanomi kaip nekonfidencialūs (apsaugoti PKCE, „Firebase Web“ raktas ar panašūs duomenys).

Visais kitais atvejais — operatoriaus išduodamiems prieigos raktams, konkretaus nuomininko paslaptims, jūsų pačių „OAuth“ programos client_secret, šifravimo raktams, JWT paslaptims, duomenų bazės slaptažodžiams — naudokite **tik aplinkos kintamuosius** (`process.env.FOO`, `||` atsarginę tuščią reikšmę / aiškią klaidą). Jie turi būti saugomi `.env` ir [šifruotoje prisijungimo duomenų saugykloje](./COMPLIANCE.md), o ne pirminiame kode.

## Nuorodos

- [„Google“: „OAuth 2.0“ savosioms programoms](https://developers.google.com/identity/protocols/oauth2/native-app)
- [„Firebase“: API raktai kliento identifikavimui](https://firebase.google.com/docs/projects/api-keys)
- [„GitHub Secret Scanning“ palaikomos paslaptys](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [„GitHub“: base64 aptikimas prieigos raktuose (2025 m. vasaris)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Šį pagalbinį įrankį pristatęs pakeitimas: `1a39c31f` — _fix(security): užmaskuoti viešus pirminio teikėjo prisijungimo duomenis ir centralizuoti klaidų sanitizavimą_
