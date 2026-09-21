# Public Credentials Handling (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Fonte autorevole:** `open-sse/utils/publicCreds.ts`
> **Test:** `tests/unit/publicCreds.test.ts`
> **Ultimo aggiornamento:** 2026-08-07 — v3.8.50
> **Destinatari:** Ingegneri che integrano provider i cui CLI pubblici distribuiscono OAuth client_id / client_secret / chiavi Firebase Web API pubblici.
> **Stato:** **OBBLIGATORIO** per tutto il nuovo codice che incorpora identificatori upstream.

## Perché esiste

- [OAuth 2.0 per app native (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret per le applicazioni installate sono pubblici; PKCE fornisce la sicurezza effettiva.
- [Chiavi API Firebase](https://firebase.google.com/docs/projects/api-keys) — Gli identificatori dei client Web sono pubblici per progettazione.

OmniRoute deve incorporare questi valori affinché gli utenti che non configurano `.env` possano comunque usufruire immediatamente di un flusso OAuth funzionante. Senza un fallback incorporato, i provider Gemini / Antigravity smettono di funzionare per qualsiasi utente che segua il percorso "clona ed esegui".

Tuttavia, valori letterali come `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` vengono rilevati da **GitHub Secret Scanning**, **Semgrep** e scanner di pattern simili. Ogni release genera un flusso rumoroso di falsi positivi, la protezione dei push blocca commit legittimi e gli operatori smettono di fidarsi del flusso degli avvisi.

L'helper `open-sse/utils/publicCreds.ts` soddisfa entrambi i vincoli contemporaneamente:

- Incorpora l'identificatore pubblico come **sequenza di byte mascherata tramite XOR** (nessun pattern rilevabile dagli scanner nel sorgente).
- Lo decodifica in fase di esecuzione tramite `decodePublicCred` / `resolvePublicCred`.
- Rileva i valori non elaborati che seguono già prefissi noti (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) e li restituisce invariati, così gli utenti che dispongono di valori non elaborati nel proprio `.env` continuano a poterli utilizzare con **zero migrazioni**.

Questa è **offuscazione, non crittografia.** Chiunque legga il sorgente può recuperare il valore, il che è accettabile perché il valore è pubblico per progettazione. L'unico obiettivo è evitare le corrispondenze con le espressioni regolari degli scanner.

## Il pattern obbligatorio

### 1. Aggiunta di una nuova credenziale pubblica

Quando è necessario incorporare un nuovo valore fornito upstream che:

- proviene da un CLI pubblico / un'applicazione desktop / un bundle del browser, **e**
- è documentato (o trattato) dal provider upstream come identificatore client pubblico, **e**
- verrebbe altrimenti rilevato da uno scanner di pattern (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, ecc.),

…segui questa checklist:

1. Genera la sequenza di byte mascherata:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Aggiungi una nuova voce a `EMBEDDED_DEFAULTS` in `open-sse/utils/publicCreds.ts` con un **nome di chiave neutro** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, ecc.). Non utilizzare nomi come `client_secret` o `api_key` nell'helper: queste parole attivano le regole generiche di Semgrep per i segreti.

3. Aggiungi un `keyof typeof EMBEDDED_DEFAULTS` all'unione dei tipi pubblica (viene dedotto automaticamente).

4. Nel codice consumer, sostituisci il valore letterale hardcoded con:

   ```ts
   // singolo override tramite variabile d'ambiente
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // più alias di variabili d'ambiente (vince il primo non vuoto)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // nessun override tramite variabile d'ambiente (usa sempre il valore predefinito incorporato)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Rimuovi il valore letterale da `.env.example` (sostituiscilo con documentazione composta esclusivamente da commenti che rimandi qui i lettori):

   ```dotenv
   # ── Provider (Google / Firebase / ecc.) ──
   # Le credenziali OAuth pubbliche sono incorporate nel codice tramite
   # open-sse/utils/publicCreds.ts. Imposta queste variabili solo per utilizzare le tue.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Aggiorna `tests/unit/publicCreds.test.ts` aggiungendo un'asserzione sulla forma per la nuova chiave (verifica il formato, non il valore letterale; consulta i test esistenti per il pattern).

7. **Non** aggiungere mai valori letterali `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ai file di test. Utilizza le costanti `FAKE_*` costruite a partire da frammenti `.join("")` (consulta i test esistenti).

### 2. Consumer

- **Leggi esclusivamente da `resolvePublicCred()` / `resolvePublicCredMulti()`** — non chiamare mai direttamente `decodePublicCredBytes()` al di fuori dell'helper.
- L'helper è intenzionalmente leggero (XOR lineare sui byte) e può essere chiamato in sicurezza durante il caricamento del modulo; i valori predefiniti vengono calcolati una sola volta.
- L'override tramite variabile d'ambiente ha sempre la precedenza. Se un utente imposta `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, l'helper restituisce direttamente tale valore non elaborato.

### 3. Pattern vietati

❌ **Non** eseguire mai nessuna delle seguenti operazioni nel codice di produzione (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// SBAGLIATO: il valore letterale attiva Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// SBAGLIATO: base64 del valore letterale — GitHub lo rileva comunque da feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// SBAGLIATO: concatenazione di stringhe che ricompone il pattern in fase di esecuzione
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// SBAGLIATO: codifica hex/ROT13 — offuscamento diverso, stesso rischio di rilevamento
clientSecret: hexDecode("474f4353..."),
```

Tutte queste soluzioni finiscono per attivare uno scanner. Utilizza `resolvePublicCred()`.

❌ **Non** aggiungere mai credenziali letterali a `.env.example`. Gli utenti che necessitano dei valori upstream reali possono estrarli autonomamente dal CLI pubblico oppure utilizzare una propria registrazione OAuth.

❌ **Non** ignorare mai un nuovo avviso di secret scanning senza aver prima verificato se la credenziale debba essere spostata in questo helper.

## Controlli correlati

- `RAW_VALUE_PATTERN` in `publicCreds.ts` elenca i prefissi che attivano il passaggio diretto (retrocompatibilità). Estendilo solo per formati documentati di credenziali pubbliche, mai per segreti proprietari.
- `.env.example` è incluso nello script CI `check-env-doc-sync`: quando rimuovi una variabile qui, assicurati che la documentazione corrisponda.
- Le suite `npm run test:vitest` e `node --import tsx/esm --test tests/unit/publicCreds.test.ts` devono entrambe continuare a essere eseguite senza errori.

## Quando NON usare questo helper

Questo helper è **esclusivamente** per credenziali che sono:

1. Distribuite pubblicamente dal provider upstream (binario CLI, bundle del browser, documentazione ufficiale).
2. Documentate o chiaramente indicate come non riservate (protette da PKCE, chiave Firebase Web o simili).

Per tutto il resto — token emessi dall'operatore, segreti per tenant, il `client_secret` della tua applicazione OAuth, chiavi di crittografia, segreti JWT, password dei database — usa **solo variabili di ambiente** (`process.env.FOO`, fallback con `||` a un valore vuoto / errore esplicito). Questi elementi devono essere archiviati in `.env` e nell'[archivio delle credenziali crittografate](./COMPLIANCE.md), non nel codice sorgente.

## Riferimenti

- [Google: OAuth 2.0 per applicazioni native](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: chiavi API per l'identificazione dei client](https://firebase.google.com/docs/projects/api-keys)
- [Segreti supportati dalla scansione dei segreti di GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: rilevamento Base64 per i token (febbraio 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit che introduce questo helper: `1a39c31f` — _fix(security): maschera le credenziali pubbliche upstream + centralizza la sanificazione degli errori_
