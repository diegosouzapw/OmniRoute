# Public Credentials Handling (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Sursa adevărului:** `open-sse/utils/publicCreds.ts`
> **Teste:** `tests/unit/publicCreds.test.ts`
> **Ultima actualizare:** 2026-08-07 — v3.8.50
> **Public-țintă:** Ingineri care integrează furnizori ce distribuie public OAuth client_id / client_secret / chei Firebase Web API în propriile CLI-uri publice.
> **Stare:** **OBLIGATORIU** pentru tot codul nou care încorporează identificatori din amonte.

## De ce există acest mecanism

- [OAuth 2.0 pentru aplicații native (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret pentru aplicațiile instalate sunt publice; PKCE asigură securitatea efectivă.
- [Chei API Firebase](https://firebase.google.com/docs/projects/api-keys) — Identificatorii clienților web sunt publici prin concepție.

OmniRoute trebuie să încorporeze aceste valori, astfel încât utilizatorii care nu configurează `.env` să beneficieze totuși, imediat, de un flux OAuth funcțional. Fără o valoare de rezervă încorporată, furnizorii Gemini / Antigravity nu mai funcționează pentru utilizatorii care urmează abordarea „doar clonează și rulează”.

Totuși, valorile literale precum `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` sunt detectate de **GitHub Secret Scanning**, **Semgrep** și alte scanere similare bazate pe tipare. Fiecare versiune generează un flux zgomotos de rezultate fals pozitive, protecția la push blochează commituri legitime, iar operatorii încetează să mai aibă încredere în fluxul de alerte.

Utilitarul `open-sse/utils/publicCreds.ts` rezolvă simultan ambele constrângeri:

- Încorporează identificatorul public ca o **secvență de octeți mascată prin XOR** (niciun tipar detectabil de scanere în sursă).
- Îl decodifică în timpul rulării prin `decodePublicCred` / `resolvePublicCred`.
- Detectează valorile brute care respectă deja prefixe bine cunoscute (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) și le transmite nemodificate, astfel încât utilizatorii care au valori brute în fișierele `.env` existente să poată continua să le folosească fără **nicio migrare**.

Aceasta este **ofuscare, nu criptare.** Oricine citește sursa poate recupera valoarea — ceea ce este în regulă, deoarece valoarea este publică prin concepție. Singurul scop este evitarea potrivirilor cu expresiile regulate ale scanerelor.

## Modelul obligatoriu

### 1. Adăugarea unei noi credențiale publice

Când trebuie să încorporezi o nouă valoare furnizată din amonte care:

- provine dintr-un CLI public / o aplicație desktop / un pachet pentru browser, **și**
- este documentată (sau tratată) de furnizorul din amonte drept identificator public de client, **și**
- ar fi altfel detectată de un scanner bazat pe tipare (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` etc.),

…urmează această listă de verificare:

1. Generează secvența de octeți mascată:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Adaugă o intrare nouă în `EMBEDDED_DEFAULTS` din `open-sse/utils/publicCreds.ts`, cu un **nume neutru pentru cheie** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` etc.). **Nu** folosi nume precum `client_secret` sau `api_key` în utilitar — acești termeni declanșează regulile Semgrep pentru secrete generice.

3. Adaugă un `keyof typeof EMBEDDED_DEFAULTS` la uniunea publică de tipuri (acesta este dedus automat).

4. În codul consumator, înlocuiește literalul codificat direct cu:

   ```ts
   // o singură suprascriere prin variabilă de mediu
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // mai multe aliasuri pentru variabile de mediu (prima valoare nevidă câștigă)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // fără suprascriere prin variabilă de mediu (se utilizează întotdeauna valoarea implicită încorporată)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Elimină literalul din `.env.example` (înlocuiește-l cu documentație formată doar din comentarii, care îi direcționează pe cititori aici):

   ```dotenv
   # ── Furnizor (Google / Firebase / etc.) ──
   # Credențialele OAuth publice sunt încorporate în cod prin
   # open-sse/utils/publicCreds.ts. Setează aceste variabile numai pentru a le utiliza pe ale tale.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Actualizează `tests/unit/publicCreds.test.ts` pentru a adăuga o aserțiune privind forma noii chei (verifică formatul, nu valoarea literală — consultă testele existente pentru model).

7. **Nu** adăuga niciodată literali `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` în fișierele de testare. Folosește constantele `FAKE_*` construite din fragmente `.join("")` (consultă testele existente).

### 2. Consumatori

- **Citește numai prin `resolvePublicCred()` / `resolvePublicCredMulti()`** — nu apela niciodată `decodePublicCredBytes()` direct din afara utilitarului.
- Utilitarul este intenționat eficient (XOR liniar la nivel de octet) și poate fi apelat în siguranță la încărcarea modulului; valorile implicite sunt calculate o singură dată.
- Suprascrierea prin variabila de mediu are întotdeauna prioritate. Dacă un utilizator setează `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, utilitarul transmite direct valoarea brută, fără modificări.

### 3. Tipare interzise

❌ **Nu** face niciodată nimic din cele de mai jos în codul de producție (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// INCORECT: valoarea literală declanșează Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// INCORECT: codificarea base64 a literalului — GitHub o detectează în continuare din Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// INCORECT: concatenarea șirurilor care reasamblează tiparul în timpul rulării
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// INCORECT: codificare hex/ROT13 — ofuscare diferită, același risc de detectare
clientSecret: hexDecode("474f4353..."),
```

Toate acestea ajung, în cele din urmă, să declanșeze un scanner. Folosește `resolvePublicCred()`.

❌ **Nu** adăuga niciodată credențiale literale în `.env.example`. Utilizatorii care au nevoie de valori reale din amonte le pot extrage singuri din CLI-ul public sau își pot folosi propria înregistrare OAuth.

❌ **Nu** respinge niciodată o nouă alertă de scanare a secretelor fără să verifici mai întâi dacă acea credențială ar trebui mutată în acest utilitar.

## Controale asociate

- `RAW_VALUE_PATTERN` din `publicCreds.ts` enumeră prefixele care declanșează transmiterea nemodificată (compatibilitate retroactivă). Extindeți-l numai pentru formate documentate de credențiale publice, niciodată pentru secrete proprietare.
- `.env.example` este verificat de scriptul CI `check-env-doc-sync` — când eliminați o variabilă de aici, asigurați-vă că documentația este actualizată corespunzător.
- Suitele `npm run test:vitest` și `node --import tsx/esm --test tests/unit/publicCreds.test.ts` trebuie să continue să treacă fără erori.

## Când să NU utilizați această funcție auxiliară

Această funcție auxiliară este **doar** pentru credențiale care sunt:

1. Distribuite public de furnizorul din amonte (binar CLI, pachet pentru browser, documentație oficială).
2. Documentate sau indicate în mod clar ca nefiind confidențiale (protejate prin PKCE, cheie Firebase Web sau similar).

Pentru orice altceva — tokenuri emise de operator, secrete specifice fiecărui tenant, `client_secret` al propriei aplicații OAuth, chei de criptare, secrete JWT, parole pentru baze de date — utilizați **numai variabile de mediu** (`process.env.FOO`, cu `||` ca alternativă la un șir gol / o eroare explicită). Acestea trebuie stocate în `.env` și în [depozitul criptat de credențiale](./COMPLIANCE.md), nu în codul sursă.

## Referințe

- [Google: OAuth 2.0 pentru aplicații native](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: chei API pentru identificarea clienților](https://firebase.google.com/docs/projects/api-keys)
- [Secrete acceptate de GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: detectarea tokenurilor în format base64 (februarie 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commitul care a introdus această funcție auxiliară: `1a39c31f` — _fix(security): maschează credențialele publice din amonte și centralizează igienizarea erorilor_
