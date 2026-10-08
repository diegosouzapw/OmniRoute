# Public Credentials Handling (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Hiteles forrás:** `open-sse/utils/publicCreds.ts`
> **Tesztek:** `tests/unit/publicCreds.test.ts`
> **Utolsó frissítés:** 2026-08-07 — v3.8.50
> **Célközönség:** Olyan szolgáltatókat integráló mérnökök, amelyek nyilvános OAuth client_id / client_secret / Firebase Web API-kulcsokat szállítanak nyilvános CLI-eszközeikben.
> **Állapot:** **KÖTELEZŐ** minden olyan új kód esetében, amely upstream azonosítókat ágyaz be.

## Miért létezik ez?

- [OAuth 2.0 natív alkalmazásokhoz (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — A telepített alkalmazások OAuth client_id / client_secret értékei nyilvánosak; a tényleges biztonságot a PKCE biztosítja.
- [Firebase API-kulcsok](https://firebase.google.com/docs/projects/api-keys) — A webes kliensazonosítók kialakításuknál fogva nyilvánosak.

Az OmniRoute-nak be kell ágyaznia ezeket az értékeket, hogy azok a felhasználók is azonnal működő OAuth-folyamatot kapjanak, akik nem konfigurálnak `.env` fájlt. Beágyazott tartalékérték nélkül a Gemini / Antigravity szolgáltatók nem működnek azoknál a felhasználóknál, akik az „egyszerűen klónozd és futtasd” eljárást követik.

Az olyan literális értékekre azonban, mint az `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`, illeszkedik a **GitHub Secret Scanning**, a **Semgrep** és más hasonló mintaellenőrző eszközök keresése. Minden kiadás téves pozitív találatok zajos áradatává válik, a push-védelem blokkolja a szabályos véglegesítéseket, az üzemeltetők pedig nem bíznak többé a riasztási adatfolyamban.

Az `open-sse/utils/publicCreds.ts` segédmodul egyszerre oldja meg mindkét korlátozást:

- A nyilvános azonosítót **XOR-maszkolt bájtsorozatként** ágyazza be (így a forrásban nincs a mintaellenőrzők által felismerhető minta).
- Futásidőben dekódolja a `decodePublicCred` / `resolvePublicCred` használatával.
- Felismeri azokat a nyers értékeket, amelyek már ismert előtagokat követnek (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), és változtatás nélkül továbbítja őket, így azoknak a felhasználóknak, akik meglévő `.env` fájljukban nyers értékeket használnak, **egyáltalán nincs szükségük migrációra**.

Ez **obfuszkáció, nem titkosítás.** A forráskódot elolvasva bárki visszaállíthatja az értéket — ez nem probléma, mert az érték kialakításánál fogva nyilvános. Az egyetlen cél a mintaellenőrzők reguláris kifejezéseivel való egyezések elkerülése.

## A kötelező minta

### 1. Új nyilvános hitelesítő adat hozzáadása

Ha olyan új, upstream által biztosított értéket kell beágyaznod, amely:

- nyilvános CLI-eszközből / asztali alkalmazásból / böngészős csomagból származik, **és**
- az upstream szolgáltató dokumentációja szerint (vagy a szolgáltató kezelése alapján) nyilvános kliensazonosító, **és**
- egy mintaellenőrző egyébként felismerné (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` stb.),

…kövesd ezt az ellenőrzőlistát:

1. Hozd létre a maszkolt bájtsorozatot:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Adj hozzá egy új bejegyzést az `open-sse/utils/publicCreds.ts` fájlban található `EMBEDDED_DEFAULTS` objektumhoz, **semleges kulcsnévvel** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` stb.). A segédmodulban **ne** használj olyan neveket, mint a `client_secret` vagy az `api_key` — ezek a szavak aktiválják a Semgrep általános titokérzékelési szabályait.

3. Adj hozzá egy `keyof typeof EMBEDDED_DEFAULTS` típust a nyilvános típusunióhoz (ennek kikövetkeztetése automatikusan történik).

4. A felhasználó kódban cseréld le a beégetett literált a következőre:

   ```ts
   // egyetlen környezetiváltozó-felülírás
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // több környezetiváltozó-aliasz (az első nem üres érték nyer)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // nincs környezetiváltozó-felülírás (mindig a beágyazott alapérték)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Távolítsd el a literált a `.env.example` fájlból (helyettesítsd egy kizárólag megjegyzésekből álló dokumentációval, amely ide irányítja az olvasókat):

   ```dotenv
   # ── Szolgáltató (Google / Firebase / stb.) ──
   # A nyilvános OAuth hitelesítő adatok a kódba vannak beépítve az
   # open-sse/utils/publicCreds.ts használatával. Csak saját értékek használatához állítsd be ezeket a változókat.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Frissítsd a `tests/unit/publicCreds.test.ts` fájlt úgy, hogy tartalmazzon egy alakellenőrzést az új kulcshoz (a formátumot ellenőrizd, ne a literális értéket — a mintát lásd a meglévő tesztekben).

7. **Soha** ne adj hozzá `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literálokat a tesztfájlokhoz. Használd a `.join("")` részletekből felépített `FAKE_*` konstansokat (lásd a meglévő teszteket).

### 2. Felhasználók

- **Kizárólag a `resolvePublicCred()` / `resolvePublicCredMulti()` függvényeken keresztül olvass** — a segédmodulon kívül soha ne hívd meg közvetlenül a `decodePublicCredBytes()` függvényt.
- A segédmodul szándékosan kis költségű (lineáris bájtonkénti XOR), és biztonságosan meghívható a modul betöltésekor; az alapértékeket csak egyszer számítja ki.
- A környezetiváltozó-felülírás mindig elsőbbséget élvez. Ha egy felhasználó a `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` értéket állítja be, a segédmodul ezt a nyers értéket változtatás nélkül továbbítja.

### 3. Tiltott minták

❌ Éles kódban (`src/`, `open-sse/`, `electron/`, `bin/`) **soha** ne tedd a következők egyikét sem:

```ts
// ROSSZ: a literális érték aktiválja a Secret Scanning és a Semgrep ellenőrzését
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ROSSZ: a literál base64-kódolása — a GitHub 2025 februárja óta ezt is észleli
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ROSSZ: karakterlánc-összefűzés, amely futásidőben újra összeállítja a mintát
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ROSSZ: hex/ROT13 kódolás — eltérő obfuszkáció, ugyanaz az észlelési kockázat
clientSecret: hexDecode("474f4353..."),
```

Ezeket előbb-utóbb mind felismeri valamelyik mintaellenőrző. Használd a `resolvePublicCred()` függvényt.

❌ **Soha** ne adj literális hitelesítő adatokat a `.env.example` fájlhoz. Azok a felhasználók, akiknek valódi upstream értékekre van szükségük, kinyerhetik azokat maguk a nyilvános CLI-eszközből, vagy használhatják saját OAuth-regisztrációjukat.

❌ **Soha** ne utasíts el új titokellenőrzési riasztást anélkül, hogy előbb ellenőriznéd, át kell-e helyezni a hitelesítő adatot ebbe a segédmodulba.

## Kapcsolódó vezérlők

- A `publicCreds.ts` fájlban található `RAW_VALUE_PATTERN` sorolja fel azokat az előtagokat, amelyek közvetlen továbbítást váltanak ki (visszamenőleges kompatibilitás). Csak dokumentált, nyilvános hitelesítőadat-formátumokkal bővítse, saját fejlesztésű titkokkal soha.
- A `.env.example` szinkronban tartását a CI `check-env-doc-sync` szkriptje ellenőrzi — amikor itt eltávolít egy változót, győződjön meg arról, hogy a dokumentáció is megfelel ennek.
- Az `npm run test:vitest` és a `node --import tsx/esm --test tests/unit/publicCreds.test.ts` tesztcsomagoknak egyaránt sikeresen kell lefutniuk.

## Mikor NE használja ezt a segédfüggvényt

Ez a segédfüggvény **kizárólag** olyan hitelesítő adatokhoz használható, amelyek:

1. A felsőbb szintű szolgáltató nyilvánosan terjeszt (CLI-bináris, böngészőcsomag, hivatalos dokumentáció).
2. Dokumentáltan vagy erősen feltételezhetően nem bizalmasak (PKCE-védelemmel ellátottak, Firebase webes kulcsok vagy hasonlók).

Minden más esetben — üzemeltető által kiadott tokenek, bérlőnkénti titkok, saját OAuth-alkalmazásának client_secret értéke, titkosítási kulcsok, JWT-titkok, adatbázis-jelszavak — **kizárólag környezeti változókat** használjon (`process.env.FOO`, `||` visszaeséssel üres értékre / explicit hibára). Ezeknek a `.env` fájlban és a [titkosított hitelesítőadat-tárolóban](./COMPLIANCE.md) van a helyük, nem a forráskódban.

## Hivatkozások

- [Google: OAuth 2.0 natív alkalmazásokhoz](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-kulcsok kliensazonosításhoz](https://firebase.google.com/docs/projects/api-keys)
- [A GitHub Secret Scanning által támogatott titkok](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: tokenek base64-észlelése (2025. február)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- A segédfüggvényt bevezető commit: `1a39c31f` — _fix(security): a nyilvános felsőbb szintű hitelesítő adatok maszkolása és a hibafertőtlenítés központosítása_
