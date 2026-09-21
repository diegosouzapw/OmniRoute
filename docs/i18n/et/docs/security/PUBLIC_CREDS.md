# Public Credentials Handling (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Tõeallikas:** `open-sse/utils/publicCreds.ts`
> **Testid:** `tests/unit/publicCreds.test.ts`
> **Viimati uuendatud:** 2026-08-07 — v3.8.50
> **Sihtrühm:** Insenerid, kes integreerivad teenusepakkujaid, mille avalikud CLI-d sisaldavad avalikke OAuthi client_id / client_secret väärtusi / Firebase Web API võtmeid.
> **Olek:** **KOHUSTUSLIK** kogu uue koodi puhul, mis manustab väliseid identifikaatoreid.

## Miks see olemas on

- [OAuth 2.0 omarakendustele (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — installitud rakenduste OAuthi client_id / client_secret on avalikud; tegeliku turvalisuse tagab PKCE.
- [Firebase API võtmed](https://firebase.google.com/docs/projects/api-keys) — veebikliendi identifikaatorid on kavandatud avalikuks.

OmniRoute peab need väärtused manustama, et kasutajad, kes `.env` faili ei seadista, saaksid kohe toimiva OAuthi voo. Ilma manustatud varuväärtuseta lakkavad Gemini / Antigravity teenusepakkujad töötamast kõigil kasutajatel, kes järgivad lähenemist „lihtsalt klooni ja käivita“.

Samas tuvastavad **GitHub Secret Scanning**, **Semgrep** ja sarnased mustripõhised skannerid literaalväärtusi nagu `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`. Iga väljalase tekitab mürarikka valepositiivsete hoiatuste voo, saatmiskaitse blokeerib õiguspäraseid commit'e ja haldajad lakkavad hoiatuste voogu usaldamast.

Abifunktsioon `open-sse/utils/publicCreds.ts` lahendab mõlemad piirangud korraga:

- Manustab avaliku identifikaatori **XOR-maskitud baidijadana** (lähtekoodis puudub skanneri tuvastatav muster).
- Dekodeerib selle käitusajal funktsiooni `decodePublicCred` / `resolvePublicCred` kaudu.
- Tuvastab toorväärtused, mis juba järgivad tuntud prefikseid (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), ja edastab need muutmata kujul, nii et olemasolevas `.env` failis toorväärtusi kasutavatel kasutajatel töötab kõik edasi **ilma igasuguse migratsioonita**.

See on **hägustamine, mitte krüpteerimine.** Igaüks, kes lähtekoodi loeb, saab väärtuse taastada — see on vastuvõetav, sest väärtus on kavandatud avalikuks. Ainus eesmärk on vältida skannerite regulaaravaldise vasteid.

## Kohustuslik muster

### 1. Uue avaliku identimisteabe lisamine

Kui peate manustama uue välise teenusepakkuja väärtuse, mis:

- pärineb avalikust CLI-st / töölauarakendusest / brauseripaketist, **ja**
- mida väline teenusepakkuja dokumenteerib (või käsitleb) avaliku kliendiidentifikaatorina, **ja**
- mille mustripõhine skanner muidu tuvastaks (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` jne),

…järgige seda kontrollnimekirja:

1. Genereerige maskitud baidijada:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Lisage faili `open-sse/utils/publicCreds.ts` objekti `EMBEDDED_DEFAULTS` uus kirje **neutraalse võtmenimega** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` jne). Ärge kasutage abifunktsioonis nimesid nagu `client_secret` või `api_key` — need sõnad käivitavad Semgrepi üldised saladuste tuvastamise reeglid.

3. Lisage avalikku tüübiliitu `keyof typeof EMBEDDED_DEFAULTS` (see järeldatakse automaatselt).

4. Asendage tarbijakoodis püsikodeeritud literaal järgmisega:

   ```ts
   // üks keskkonnamuutuja-poolne ülekirjutus
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // mitu keskkonnamuutuja aliast (võidab esimene mittetühi)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // keskkonnamuutuja-poolne ülekirjutus puudub (alati manustatud vaikeväärtus)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Eemaldage literaal failist `.env.example` (asendage see ainult kommentaaridest koosneva dokumentatsiooniga, mis suunab lugejad siia):

   ```dotenv
   # ── Teenusepakkuja (Google / Firebase / jne) ──
   # Avalik OAuthi identimisteave on koodi sisse manustatud faili
   # open-sse/utils/publicCreds.ts kaudu. Määrake need muutujad ainult enda väärtuste kasutamiseks.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Uuendage faili `tests/unit/publicCreds.test.ts`, lisades uue võtme kuju kontrolli (kontrollige vormingut, mitte literaalväärtust — mustrit vaadake olemasolevatest testidest).

7. **Ärge kunagi** lisage testifailidesse literaale `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Kasutage `.join("")` fragmentidest koostatud konstante `FAKE_*` (vaadake olemasolevaid teste).

### 2. Tarbijad

- **Lugege ainult funktsioonide `resolvePublicCred()` / `resolvePublicCredMulti()` kaudu** — ärge kunagi kutsuge `decodePublicCredBytes()` otse väljaspool abifunktsiooni.
- Abifunktsioon on tahtlikult väikese kuluga (lineaarne baitide XOR) ja seda võib turvaliselt kutsuda mooduli laadimise ajal; vaikeväärtused arvutatakse ühe korra.
- Keskkonnamuutuja-poolne ülekirjutus võidab alati. Kui kasutaja määrab `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, edastab abifunktsioon selle toorväärtuse muutmata kujul.

### 3. Keelatud mustrid

❌ **Ärge kunagi** tehke tootmiskoodis (`src/`, `open-sse/`, `electron/`, `bin/`) midagi järgnevast:

```ts
// HALB: literaalväärtus käivitab Secret Scanningu + Semgrepi
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// HALB: literaali base64 — GitHub tuvastab selle endiselt alates 2025. aasta veebruarist
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// HALB: stringide liitmine, mis paneb mustri käitusajal uuesti kokku
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// HALB: hex-/ROT13-kodeering — erinev hägustamine, sama tuvastamisrisk
clientSecret: hexDecode("474f4353..."),
```

Kõik need käivitavad lõpuks mõne skanneri. Kasutage `resolvePublicCred()`.

❌ **Ärge kunagi** lisage faili `.env.example` literaalset identimisteavet. Kasutajad, kes vajavad tegelikke väliseid väärtusi, saavad need avalikust CLI-st ise eraldada või kasutada enda OAuthi registreeringut.

❌ **Ärge kunagi** eirake uut saladuste skannimise hoiatust, kontrollimata esmalt, kas identimisteave tuleks sellesse abifunktsiooni teisaldada.

## Seotud kontrollid

- `RAW_VALUE_PATTERN` failis `publicCreds.ts` loetleb prefiksid, mille korral väärtus muutmata kujul läbi lastakse (tagasiühilduvus). Laiendage seda ainult dokumenteeritud avalike autentimisandmete vormingute jaoks, mitte kunagi omandiõiguslike saladuste jaoks.
- `.env.example` on seotud CI skriptiga `check-env-doc-sync` — kui eemaldate siit muutuja, veenduge, et dokumentatsioon oleks sellega kooskõlas.
- Testikomplektid `npm run test:vitest` ja `node --import tsx/esm --test tests/unit/publicCreds.test.ts` peavad mõlemad jätkuvalt edukalt läbima.

## Millal seda abifunktsiooni MITTE kasutada

See abifunktsioon on mõeldud **ainult** autentimisandmetele, mis on:

1. Avalikult levitatud teenusepakkuja poolt (CLI binaarfail, brauseripakett, ametlik dokumentatsioon).
2. Dokumenteeritud või selgelt käsitletud mittekonfidentsiaalsena (PKCE-ga kaitstud, Firebase Webi võti või muu sarnane).

Kõige muu puhul — operaatori väljastatud pääsmikud, rentnikupõhised saladused, teie enda OAuthi rakenduse client_secret, krüptovõtmed, JWT saladused, andmebaasiparoolid — kasutage **ainult keskkonnamuutujaid** (`process.env.FOO`, `||` taandub tühjale väärtusele / annab konkreetse vea). Need kuuluvad faili `.env` ja [krüpteeritud autentimisandmete hoidlasse](./COMPLIANCE.md), mitte lähtekoodi.

## Viited

- [Google: OAuth 2.0 omarakendustele](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-võtmed kliendi tuvastamiseks](https://firebase.google.com/docs/projects/api-keys)
- [GitHubi salasõelumise toetatud saladused](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: pääsmike base64-tuvastus (veebruar 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Selle abifunktsiooni lisanud sissekanne: `1a39c31f` — _fix(security): avalike väliste autentimisandmete maskeerimine + vigade puhastamise tsentraliseerimine_
