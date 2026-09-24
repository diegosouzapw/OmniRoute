# Public Credentials Handling (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

# Upravljanje javnim akreditivima

> **Izvor istine:** `open-sse/utils/publicCreds.ts`
> **Testovi:** `tests/unit/publicCreds.test.ts`
> **Posljednje ažurirano:** 2026-08-07 — v3.8.50
> **Publika:** Inženjeri koji integrišu provajdere koji isporučuju javne OAuth client_id / client_secret / Firebase Web API ključeve u svojim javnim CLI alatima.
> **Status:** **OBAVEZNO** za sav novi kod koji ugrađuje uzvodne identifikatore.

## Zašto ovo postoji

- [OAuth 2.0 for native apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret za instalirane aplikacije su javni; PKCE pruža stvarnu sigurnost.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Identifikatori web klijenata su javni po dizajnu.

OmniRoute mora ugraditi ove vrijednosti tako da korisnici koji ne konfigurišu `.env` i dalje dobiju funkcionalan OAuth tok odmah nakon instalacije. Bez ugrađene rezervne opcije, Gemini / Antigravity provajderi prestaju raditi za svakog korisnika koji prati putanju „samo kloniraj i pokreni”.

Međutim, literalne vrijednosti kao što su `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` bivaju prepoznate od strane **GitHub Secret Scanning**-a, **Semgrep**-a i sličnih skenera uzoraka. Svako izdanje postaje bučan niz lažnih pozitivnih rezultata, zaštita pri push-u blokira legitimne commit-e, a operateri prestaju vjerovati feed-u upozorenja.

Pomoćni modul `open-sse/utils/publicCreds.ts` rješava oba ograničenja odjednom:

- Ugrađuje javni identifikator kao **XOR-maskirani niz bajtova** (nema uzorka skenera u izvornom kodu).
- Dekodira u vrijeme izvršavanja putem `decodePublicCred` / `resolvePublicCred`.
- Detektuje sirove vrijednosti koje već prate dobro poznate prefikse (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) i propušta ih nepromijenjene, tako da korisnici sa sirovim vrijednostima u svom postojećem `.env` fajlu nastavljaju raditi uz **nultu migraciju**.

Ovo je **obfuskacija, a ne enkripcija.** Svako ko čita izvorni kod može povratiti vrijednost — što je u redu jer je vrijednost javna po dizajnu. Jedini cilj je izbjeći podudaranja regex-a skenera.

## Obavezni obrazac

### 1. Dodavanje novog javnog akreditiva

Kada trebate ugraditi novu vrijednost koju je obezbijedio uzvodni provajder, a koja:

- dolazi iz javnog CLI-a / desktop aplikacije / browser bundle-a, **i**
- uzvodni provajder je dokumentuje (ili tretira) kao javni identifikator klijenta, **i**
- bi je skener uzoraka inače prepoznao (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, itd.),

…pratite ovu kontrolnu listu:

1. Generišite maskirani niz bajtova:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Dodajte novi unos u `EMBEDDED_DEFAULTS` u `open-sse/utils/publicCreds.ts` sa **neutralnim imenom ključa** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, itd.). Nemojte koristiti imena kao što su `client_secret` ili `api_key` u pomoćnom modulu — te riječi aktiviraju Semgrep pravila za generičke tajne.

3. Dodajte `keyof typeof EMBEDDED_DEFAULTS` u javnu uniju tipova (ona se automatski zaključuje).

4. U potrošačkom kodu, zamijenite hardkodirani literal sa:

   ```ts
   // pojedinačno env nadjačavanje
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // višestruki env aliasi (prvi koji nije prazan pobjeđuje)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // bez env nadjačavanja (uvijek ugrađena zadana vrijednost)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Uklonite literal iz `.env.example` (zamijenite dokumentacijom koja se sastoji samo od komentara i upućuje čitaoce ovdje):

   ```dotenv
   # ── Provajder (Google / Firebase / itd.) ──
   # Javni OAuth akreditivi su ugrađeni u kod putem
   # open-sse/utils/publicCreds.ts. Postavite ove varijable samo ako želite koristiti svoje.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Ažurirajte `tests/unit/publicCreds.test.ts` da dodate tvrdnju o obliku (shape assertion) za novi ključ (verifikujte format, ne literalnu vrijednost — pogledajte postojeće testove za obrazac).

7. **Nikada** ne dodajte `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literale u test fajlove. Koristite `FAKE_*` konstante izgrađene od `.join("")` fragmenata (pogledajte postojeće testove).

### 2. Potrošači

- **Čitajte samo iz `resolvePublicCred()` / `resolvePublicCredMulti()`** — nikada ne pozivajte `decodePublicCredBytes()` direktno izvan pomoćnog modula.
- Pomoćni modul je namjerno jeftin (linearni XOR bajtova) i siguran za pozivanje u vrijeme učitavanja modula; zadane vrijednosti se računaju jednom.
- Env nadjačavanje uvijek pobjeđuje. Ako korisnik postavi `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pomoćni modul propušta tu sirovu vrijednost direktno.

### 3. Zabranjeni obrasci

❌ **Nikada** ne radite ništa od sljedećeg u produkcijskom kodu (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// LOŠE: literalna vrijednost aktivira Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// LOŠE: base64 literala — GitHub i dalje detektuje od feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// LOŠE: konkatenacija stringova koja ponovo sastavlja obrazac u vrijeme izvršavanja
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// LOŠE: hex/ROT13 kodiranje — drugačija obfuskacija, isti rizik od detekcije
clientSecret: hexDecode("474f4353..."),
```

Sve ovo na kraju aktivira skener. Koristite `resolvePublicCred()`.

❌ **Nikada** ne dodajte literalne akreditive u `.env.example`. Korisnici kojima su potrebne stvarne uzvodne vrijednosti mogu ih sami izvući iz javnog CLI-a ili koristiti vlastitu OAuth registraciju.

❌ **Nikada** ne odbacujte novo upozorenje o skeniranju tajni (secret-scanning alert) bez prethodne provjere da li akreditiv treba premjestiti u ovaj pomoćni modul.

## Povezane kontrole

- `RAW_VALUE_PATTERN` u `publicCreds.ts` nabraja prefikse koji pokreću passthrough (retrokompatibilnost). Proširite ga samo za dokumentovane formate javnih akreditiva, nikada za vlasničke tajne.
- `.env.example` se nalazi u CI skripti `check-env-doc-sync` — kada uklonite varijablu odavde, provjerite da li se dokumentacija podudara.
- `npm run test:vitest` i `node --import tsx/esm --test tests/unit/publicCreds.test.ts` paketi testova moraju ostati zeleni.

## Kada NE koristiti ovog pomoćnika

Ovaj pomoćnik je **samo** za akreditive koji su:

1. Javno distribuirani od strane upstream provajdera (CLI binarni fajl, paket za pretraživač, zvanična dokumentacija).
2. Dokumentovani ili za koje se snažno podrazumijeva da nisu povjerljivi (zaštićeni PKCE-om, Firebase Web ključ, slično).

Za sve ostalo — tokeni izdati od strane operatera, tajne po zakupcu (per-tenant), `client_secret` vaše vlastite OAuth aplikacije, ključevi za šifrovanje, JWT tajne, lozinke za baze podataka — koristite **samo env varijable** (`process.env.FOO`, `||` povratak na prazno / eksplicitna greška). Oni pripadaju u `.env` i [skladište šifrovanih akreditiva](./COMPLIANCE.md), a ne u izvorni kod.

## Reference

- [Google: OAuth 2.0 za izvorne aplikacije](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API ključevi za identifikaciju klijenta](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning podržane tajne](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: base64 detekcija za tokene (feb 2025.)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit koji uvodi ovog pomoćnika: `1a39c31f` — _fix(security): maskiranje javnih upstream akreditiva + centralizacija sanitizacije grešaka_
