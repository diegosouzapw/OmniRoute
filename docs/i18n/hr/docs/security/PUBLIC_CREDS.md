# Public Credentials Handling (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Izvor istine:** `open-sse/utils/publicCreds.ts`
> **Testovi:** `tests/unit/publicCreds.test.ts`
> **Posljednje ažuriranje:** 2026-08-07 — v3.8.50
> **Publika:** Inženjeri koji integriraju pružatelje čiji javni CLI alati sadržavaju javne OAuth client_id / client_secret / Firebase Web API ključeve.
> **Status:** **OBAVEZNO** za sav novi kôd koji ugrađuje identifikatore vanjskih pružatelja.

## Zašto ovo postoji

- [OAuth 2.0 za izvorne aplikacije (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret za instalirane aplikacije javni su; PKCE pruža stvarnu sigurnost.
- [Firebase API ključevi](https://firebase.google.com/docs/projects/api-keys) — identifikatori web-klijenata javni su po dizajnu.

OmniRoute mora ugraditi te vrijednosti kako bi korisnici koji ne konfiguriraju `.env` i dalje odmah dobili funkcionalan OAuth tijek. Bez ugrađene pričuvne vrijednosti pružatelji Gemini / Antigravity prestaju raditi svim korisnicima koji slijede pristup „samo kloniraj i pokreni”.

Međutim, doslovne vrijednosti poput `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` prepoznaju **GitHub Secret Scanning**, **Semgrep** i slični skeneri uzoraka. Svako izdanje postaje bučan niz lažno pozitivnih rezultata, zaštita od slanja blokira legitimne commitove, a operateri prestaju vjerovati toku upozorenja.

Pomoćni modul `open-sse/utils/publicCreds.ts` istodobno rješava oba ograničenja:

- Ugrađuje javni identifikator kao **niz bajtova maskiran XOR-om** (u izvornom kodu nema uzorka koji bi skener mogao prepoznati).
- Dekodira ga tijekom izvođenja putem `decodePublicCred` / `resolvePublicCred`.
- Otkriva neobrađene vrijednosti koje već slijede dobro poznate prefikse (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) i prosljeđuje ih bez izmjena, tako da korisnicima s neobrađenim vrijednostima u postojećem `.env` sve nastavlja raditi **bez ikakve migracije**.

Ovo je **prikrivanje, a ne šifriranje.** Svatko tko čita izvorni kôd može oporaviti vrijednost — što je prihvatljivo jer je vrijednost po dizajnu javna. Jedini je cilj izbjeći podudaranja s regularnim izrazima skenera.

## Obavezni obrazac

### 1. Dodavanje nove javne vjerodajnice

Kada trebate ugraditi novu vrijednost koju je pružio vanjski pružatelj i koja:

- dolazi iz javnog CLI alata / aplikacije za stolna računala / paketa za preglednik, **i**
- koju vanjski pružatelj dokumentira (ili tretira) kao javni identifikator klijenta, **i**
- koju bi skener uzoraka inače prepoznao (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` itd.),

…slijedite ovaj kontrolni popis:

1. Generirajte maskirani niz bajtova:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Dodajte novi unos u `EMBEDDED_DEFAULTS` u datoteci `open-sse/utils/publicCreds.ts` s **neutralnim nazivom ključa** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` itd.). U pomoćnom modulu **nemojte** upotrebljavati nazive poput `client_secret` ili `api_key` — te riječi aktiviraju Semgrepova generička pravila za tajne.

3. Dodajte `keyof typeof EMBEDDED_DEFAULTS` u javnu uniju tipova (zaključuje se automatski).

4. U potrošačkom kodu zamijenite čvrsto kodiranu doslovnu vrijednost ovime:

   ```ts
   // jedna zamjenska vrijednost iz okruženja
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // više pseudonima varijabli okruženja (pobjeđuje prvi koji nije prazan)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // bez zamjenske vrijednosti iz okruženja (uvijek ugrađena zadana vrijednost)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Uklonite doslovnu vrijednost iz `.env.example` (zamijenite je dokumentacijom samo u komentarima koja čitatelje upućuje ovamo):

   ```dotenv
   # ── Pružatelj (Google / Firebase / itd.) ──
   # Javne OAuth vjerodajnice ugrađene su u kôd putem
   # open-sse/utils/publicCreds.ts. Postavite ove varijable samo ako želite upotrebljavati vlastite.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Ažurirajte `tests/unit/publicCreds.test.ts` i dodajte provjeru oblika za novi ključ (provjerite format, a ne doslovnu vrijednost — obrazac potražite u postojećim testovima).

7. **Nikada** nemojte dodavati doslovne vrijednosti `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` u testne datoteke. Upotrebljavajte konstante `FAKE_*` sastavljene od fragmenata pomoću `.join("")` (pogledajte postojeće testove).

### 2. Potrošači

- **Čitajte isključivo putem `resolvePublicCred()` / `resolvePublicCredMulti()`** — nikada nemojte pozivati `decodePublicCredBytes()` izravno izvan pomoćnog modula.
- Pomoćni modul namjerno je jeftin (linearni XOR bajtova) i sigurno ga je pozivati tijekom učitavanja modula; zadane vrijednosti izračunavaju se jednom.
- Zamjenska vrijednost iz okruženja uvijek ima prednost. Ako korisnik postavi `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pomoćni modul tu neobrađenu vrijednost prosljeđuje bez izmjena.

### 3. Zabranjeni obrasci

❌ U produkcijskom kodu (`src/`, `open-sse/`, `electron/`, `bin/`) **nikada** nemojte raditi ništa od sljedećeg:

```ts
// LOŠE: doslovna vrijednost aktivira Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// LOŠE: base64 doslovne vrijednosti — GitHub ga i dalje otkriva od veljače 2025.
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// LOŠE: spajanje nizova koje tijekom izvođenja ponovno sastavlja uzorak
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// LOŠE: hex/ROT13 kodiranje — drukčije prikrivanje, isti rizik otkrivanja
clientSecret: hexDecode("474f4353..."),
```

Sve će to na kraju aktivirati skener. Upotrijebite `resolvePublicCred()`.

❌ **Nikada** nemojte dodavati doslovne vjerodajnice u `.env.example`. Korisnici kojima trebaju stvarne vrijednosti vanjskog pružatelja mogu ih sami izdvojiti iz javnog CLI alata ili upotrijebiti vlastitu OAuth registraciju.

❌ **Nikada** nemojte odbaciti novo upozorenje skeniranja tajni bez prethodne provjere treba li vjerodajnicu premjestiti u ovaj pomoćni modul.

## Povezane kontrole

- `RAW_VALUE_PATTERN` u datoteci `publicCreds.ts` navodi prefikse koji aktiviraju izravno prosljeđivanje (retrokompatibilnost). Proširujte ga samo za dokumentirane formate javnih vjerodajnica, nikada za vlasničke tajne.
- `.env.example` obuhvaćen je CI skriptom `check-env-doc-sync` — kada ovdje uklonite varijablu, provjerite podudara li se dokumentacija.
- Oba skupa testova, `npm run test:vitest` i `node --import tsx/esm --test tests/unit/publicCreds.test.ts`, moraju i dalje prolaziti.

## Kada NE upotrebljavati ovaj pomoćni alat

Ovaj pomoćni alat namijenjen je **isključivo** vjerodajnicama koje su:

1. Javno distribuirane od strane izvornog pružatelja (CLI binarna datoteka, paket za preglednik, službena dokumentacija).
2. Dokumentirane ili se snažno podrazumijeva da nisu povjerljive (zaštićene PKCE-om, Firebase Web ključ ili slično).

Za sve ostalo — tokene koje izdaje operater, tajne po korisniku sustava, `client_secret` vlastite OAuth aplikacije, ključeve za šifriranje, JWT tajne, lozinke za baze podataka — upotrebljavajte **samo varijable okruženja** (`process.env.FOO`, rezervna vrijednost `||` koja je prazna / eksplicitna pogreška). Njima je mjesto u datoteci `.env` i [šifriranom spremištu vjerodajnica](./COMPLIANCE.md), a ne u izvornom kodu.

## Reference

- [Google: OAuth 2.0 za izvorne aplikacije](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API ključevi za identifikaciju klijenta](https://firebase.google.com/docs/projects/api-keys)
- [Tajne koje podržava GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: otkrivanje tokena kodiranih u formatu base64 (veljača 2025.)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit kojim je uveden ovaj pomoćni alat: `1a39c31f` — _fix(security): maskiraj javne vjerodajnice izvornog pružatelja + centraliziraj sanitizaciju pogrešaka_
