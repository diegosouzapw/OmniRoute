# Public Credentials Handling (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Totuuden lähde:** `open-sse/utils/publicCreds.ts`
> **Testit:** `tests/unit/publicCreds.test.ts`
> **Viimeksi päivitetty:** 2026-08-07 — v3.8.50
> **Kohderyhmä:** Kehittäjät, jotka integroivat palveluntarjoajia, joiden julkiset CLI-työkalut sisältävät julkisia OAuth-arvoja client_id / client_secret / Firebase Web API -avaimia.
> **Tila:** **PAKOLLINEN** kaikelle uudelle koodille, joka upottaa ulkopuolisten palveluntarjoajien tunnisteita.

## Miksi tämä on olemassa

- [OAuth 2.0 natiivisovelluksille (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — Asennettujen sovellusten OAuth-arvot client_id / client_secret ovat julkisia; PKCE tarjoaa varsinaisen suojauksen.
- [Firebase API -avaimet](https://firebase.google.com/docs/projects/api-keys) — Verkkosovellusten tunnisteet ovat tarkoituksellisesti julkisia.

OmniRouten täytyy upottaa nämä arvot, jotta käyttäjät, jotka eivät määritä `.env`-tiedostoa, saavat silti käyttövalmiin OAuth-kulun ilman lisäasetuksia. Ilman upotettua vara-arvoa Gemini- ja Antigravity-palveluntarjoajat lakkaavat toimimasta kaikilla käyttäjillä, jotka noudattavat ”kloonaa ja suorita” -polkua.

Literaaliarvot, kuten `AIzaSy…`, `GOCSPX-…` ja `…apps.googleusercontent.com`, kuitenkin täsmäävät **GitHub Secret Scanningin**, **Semgrepin** ja vastaavien hahmontunnistukseen perustuvien tarkistimien sääntöihin. Jokainen julkaisu tuottaa runsaasti vääriä positiivisia tuloksia, push-suojaus estää hyväksyttäviä committeja ja ylläpitäjät lakkaavat luottamasta hälytesyötteeseen.

`open-sse/utils/publicCreds.ts`-aputoiminto ratkaisee molemmat rajoitteet samanaikaisesti:

- Upottaa julkisen tunnisteen **XOR-maskattuna tavujonona** (lähdekoodissa ei ole tarkistimeen täsmäävää hahmoa).
- Purkaa sen suorituksen aikana funktioilla `decodePublicCred` / `resolvePublicCred`.
- Tunnistaa raakamuotoiset arvot, jotka jo noudattavat tunnettuja etuliitteitä (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), ja välittää ne muuttamattomina, joten käyttäjien nykyisissä `.env`-tiedostoissa olevat raakamuotoiset arvot toimivat edelleen **ilman minkäänlaista migraatiota**.

Tämä on **obfuskointia, ei salausta.** Kuka tahansa lähdekoodia lukeva voi palauttaa arvon — mikä on hyväksyttävää, koska arvo on tarkoituksellisesti julkinen. Ainoa tavoite on välttää tarkistimien regex-osumat.

## Pakollinen toimintamalli

### 1. Uuden julkisen tunnistetiedon lisääminen

Kun sinun täytyy upottaa uusi ulkopuolisen palveluntarjoajan toimittama arvo, joka:

- tulee julkisesta CLI-työkalusta / työpöytäsovelluksesta / selainpaketista, **ja**
- jonka ulkopuolinen palveluntarjoaja dokumentoi (tai jota se käsittelee) julkisena asiakastunnisteena, **ja**
- johon hahmontunnistukseen perustuva tarkistin muutoin täsmäisi (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` jne.),

…noudata tätä tarkistuslistaa:

1. Luo maskattu tavujono:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Lisää uusi tietue `EMBEDDED_DEFAULTS`-objektiin tiedostossa `open-sse/utils/publicCreds.ts` käyttäen **neutraalia avaimen nimeä** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` jne.). **Älä** käytä aputoiminnossa nimiä, kuten `client_secret` tai `api_key` — nämä sanat laukaisevat Semgrepin yleiset salaisuussäännöt.

3. Lisää `keyof typeof EMBEDDED_DEFAULTS` julkiseen tyyppiunioniin (se päätellään automaattisesti).

4. Korvaa kuluttavassa koodissa kovakoodattu literaali seuraavasti:

   ```ts
   // yksi ympäristömuuttujan ohitus
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // useita ympäristömuuttujien aliaksia (ensimmäinen ei-tyhjä voittaa)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // ei ympäristömuuttujan ohitusta (aina upotettu oletusarvo)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Poista literaali `.env.example`-tiedostosta (korvaa se pelkillä kommenteilla, jotka ohjaavat lukijat tänne):

   ```dotenv
   # ── Palveluntarjoaja (Google / Firebase / jne.) ──
   # Julkiset OAuth-tunnistetiedot on upotettu koodiin tiedoston
   # open-sse/utils/publicCreds.ts kautta. Aseta nämä muuttujat vain käyttääksesi omiasi.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Päivitä `tests/unit/publicCreds.test.ts` lisäämällä uudelle avaimelle muodon tarkistus (tarkista muoto, älä literaaliarvoa — katso toimintamalli nykyisistä testeistä).

7. **Älä koskaan** lisää `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`-literaaleja testitiedostoihin. Käytä `.join("")`-katkelmista muodostettuja `FAKE_*`-vakioita (katso nykyisiä testejä).

### 2. Kuluttajat

- **Lue ainoastaan funktioilla `resolvePublicCred()` / `resolvePublicCredMulti()`** — älä koskaan kutsu `decodePublicCredBytes()`-funktiota suoraan aputoiminnon ulkopuolelta.
- Aputoiminto on tarkoituksella kevyt (lineaarinen tavukohtainen XOR) ja sitä voidaan kutsua turvallisesti moduulin latausaikana; oletusarvot lasketaan kerran.
- Ympäristömuuttujan ohitus on aina etusijalla. Jos käyttäjä asettaa arvon `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, aputoiminto välittää raakamuotoisen arvon sellaisenaan.

### 3. Kielletyt toimintamallit

❌ **Älä koskaan** tee mitään seuraavista tuotantokoodissa (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// HUONO: literaaliarvo laukaisee Secret Scanningin ja Semgrepin
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// HUONO: literaalin base64-muoto — GitHub tunnistaa sen edelleen helmikuusta 2025 lähtien
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// HUONO: merkkijonojen yhdistäminen, joka kokoaa hahmon uudelleen suorituksen aikana
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// HUONO: hex-/ROT13-koodaus — eri obfuskointi, sama tunnistusriski
clientSecret: hexDecode("474f4353..."),
```

Nämä kaikki laukaisevat lopulta tarkistimen. Käytä `resolvePublicCred()`-funktiota.

❌ **Älä koskaan** lisää literaalimuotoisia tunnistetietoja `.env.example`-tiedostoon. Käyttäjät, jotka tarvitsevat todellisia ulkopuolisen palveluntarjoajan arvoja, voivat poimia ne itse julkisesta CLI-työkalusta tai käyttää omaa OAuth-rekisteröintiään.

❌ **Älä koskaan** hylkää uutta salaisuuksien tarkistushälytystä tarkistamatta ensin, pitäisikö tunnistetieto siirtää tähän aputoimintoon.

## Liittyvät hallintakeinot

- `RAW_VALUE_PATTERN` tiedostossa `publicCreds.ts` luettelee etuliitteet, jotka välitetään sellaisinaan (taaksepäin yhteensopivuus). Laajenna sitä vain dokumentoiduille julkisten tunnistetietojen muodoille, älä koskaan suljetuille salaisuuksille.
- `.env.example` kuuluu CI:n `check-env-doc-sync`-skriptin piiriin — kun poistat muuttujan tästä, varmista, että dokumentaatio vastaa muutosta.
- Sekä `npm run test:vitest`- että `node --import tsx/esm --test tests/unit/publicCreds.test.ts` -testikokonaisuuksien on läpäistävä testit.

## Milloin tätä apufunktiota EI pidä käyttää

Tämä apufunktio on tarkoitettu **ainoastaan** tunnistetiedoille, jotka:

1. Taustajärjestelmän tarjoaja jakelee julkisesti (CLI-binääri, selainpaketti, virallinen dokumentaatio).
2. On dokumentoitu ei-luottamuksellisiksi tai joiden ei-luottamuksellisuus on vahvasti ilmaistu (PKCE-suojattu, Firebase Web -avain tai vastaava).

Käytä kaikissa muissa tapauksissa — ylläpitäjän myöntämille tunnuksille, vuokralaiseen sidotuille salaisuuksille, oman OAuth-sovelluksesi client_secret-arvolle, salausavaimille, JWT-salaisuuksille ja tietokantojen salasanoille — **vain ympäristömuuttujia** (`process.env.FOO`, `||`-varautuminen tyhjään arvoon / eksplisiittiseen virheeseen). Nämä kuuluvat `.env`-tiedostoon ja [salattuun tunnistetietosäilöön](./COMPLIANCE.md), eivät lähdekoodiin.

## Viitteet

- [Google: OAuth 2.0 natiivisovelluksille](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-avaimet asiakasohjelman tunnistamiseen](https://firebase.google.com/docs/projects/api-keys)
- [GitHubin Secret Scanning -toiminnon tukemat salaisuudet](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: tunnusten base64-tunnistus (helmikuu 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Tämän apufunktion esitellyt commit: `1a39c31f` — _fix(security): peitä julkiset taustajärjestelmän tunnistetiedot + keskitä virheiden puhdistus_
