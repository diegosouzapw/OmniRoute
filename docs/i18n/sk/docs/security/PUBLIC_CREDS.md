# Public Credentials Handling (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Zdroj pravdy:** `open-sse/utils/publicCreds.ts`
> **Testy:** `tests/unit/publicCreds.test.ts`
> **Posledná aktualizácia:** 2026-08-07 — v3.8.50
> **Cieľová skupina:** Inžinieri integrujúci poskytovateľov, ktorí vo svojich verejných CLI distribuujú verejné OAuth client_id / client_secret / kľúče Firebase Web API.
> **Stav:** **POVINNÉ** pre všetok nový kód, ktorý vkladá identifikátory od externých poskytovateľov.

## Prečo to existuje

- [OAuth 2.0 pre natívne aplikácie (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret pre nainštalované aplikácie sú verejné; skutočné zabezpečenie poskytuje PKCE.
- [Kľúče Firebase API](https://firebase.google.com/docs/projects/api-keys) — identifikátory webových klientov sú z princípu verejné.

OmniRoute musí tieto hodnoty vkladať, aby používatelia, ktorí nenakonfigurujú `.env`, predvolene získali funkčný OAuth tok. Bez vloženej záložnej hodnoty prestanú poskytovatelia Gemini / Antigravity fungovať každému používateľovi, ktorý postupuje spôsobom „stačí naklonovať a spustiť“.

Doslovné hodnoty ako `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` však zachytávajú nástroje **GitHub Secret Scanning**, **Semgrep** a podobné skenery vzorov. Každé vydanie sa stáva hlučným prúdom falošných pozitívnych nálezov, ochrana pri odosielaní blokuje legitímne commity a operátori prestávajú dôverovať toku upozornení.

Pomocná funkcia `open-sse/utils/publicCreds.ts` rieši obe obmedzenia naraz:

- Vkladá verejný identifikátor ako **sekvenciu bajtov maskovanú pomocou XOR** (v zdrojovom kóde sa nenachádza žiadny vzor pre skenery).
- Dekóduje ho počas behu prostredníctvom `decodePublicCred` / `resolvePublicCred`.
- Rozpoznáva nespracované hodnoty, ktoré už používajú známe prefixy (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), a odovzdáva ich ďalej bez zmeny, takže používateľom s nespracovanými hodnotami v existujúcom `.env` bude všetko naďalej fungovať **bez akejkoľvek migrácie**.

Ide o **zahmlievanie, nie šifrovanie.** Každý, kto si prečíta zdrojový kód, môže hodnotu obnoviť — čo je v poriadku, pretože táto hodnota je z princípu verejná. Jediným cieľom je zabrániť zhode s regulárnymi výrazmi skenerov.

## Povinný vzor

### 1. Pridanie nového verejného prihlasovacieho údaja

Keď potrebujete vložiť novú hodnotu poskytnutú externým poskytovateľom, ktorá:

- pochádza z verejného CLI / desktopovej aplikácie / balíka pre prehliadač, **a zároveň**
- externý poskytovateľ ju dokumentuje (alebo ju považuje) za verejný identifikátor klienta, **a zároveň**
- by ju inak zachytil skener vzorov (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` atď.),

…postupujte podľa tohto kontrolného zoznamu:

1. Vygenerujte maskovanú sekvenciu bajtov:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Pridajte novú položku do `EMBEDDED_DEFAULTS` v `open-sse/utils/publicCreds.ts` s **neutrálnym názvom kľúča** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` atď.). V pomocnej funkcii **nepoužívajte** názvy ako `client_secret` alebo `api_key` — tieto slová aktivujú všeobecné pravidlá Semgrep na detekciu tajných údajov.

3. Pridajte `keyof typeof EMBEDDED_DEFAULTS` do verejného zjednotenia typov (odvodí sa automaticky).

4. V kóde používateľa nahraďte natvrdo zapísanú hodnotu týmto:

   ```ts
   // jedna premenná prostredia na prepísanie hodnoty
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // viacero aliasov premenných prostredia (vyhrá prvý neprázdny)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // bez prepisovania premennou prostredia (vždy sa použije vložená predvolená hodnota)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Odstráňte doslovnú hodnotu zo súboru `.env.example` (nahraďte ju dokumentáciou pozostávajúcou iba z komentárov, ktorá čitateľov odkáže sem):

   ```dotenv
   # ── Poskytovateľ (Google / Firebase / atď.) ──
   # Verejné prihlasovacie údaje OAuth sú vložené priamo do kódu prostredníctvom
   # open-sse/utils/publicCreds.ts. Tieto premenné nastavte iba vtedy, ak chcete použiť vlastné.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Aktualizujte `tests/unit/publicCreds.test.ts` a pridajte kontrolu tvaru nového kľúča (overujte formát, nie doslovnú hodnotu — vzor nájdete v existujúcich testoch).

7. Do testovacích súborov **nikdy** nepridávajte doslovné hodnoty `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Používajte konštanty `FAKE_*` zostavené z fragmentov pomocou `.join("")` (pozrite si existujúce testy).

### 2. Používatelia

- **Čítajte iba prostredníctvom `resolvePublicCred()` / `resolvePublicCredMulti()`** — nikdy nevolajte `decodePublicCredBytes()` priamo mimo pomocnej funkcie.
- Pomocná funkcia je zámerne nenáročná (lineárna operácia XOR nad bajtmi) a možno ju bezpečne volať počas načítania modulu; predvolené hodnoty sa vypočítajú iba raz.
- Hodnota z premennej prostredia má vždy prednosť. Ak používateľ nastaví `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pomocná funkcia odovzdá túto nespracovanú hodnotu priamo ďalej.

### 3. Zakázané vzory

❌ V produkčnom kóde (`src/`, `open-sse/`, `electron/`, `bin/`) **nikdy** nerobte nič z nasledujúceho:

```ts
// ZLE: doslovná hodnota aktivuje Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ZLE: base64 doslovnej hodnoty — GitHub ju od februára 2025 stále deteguje
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ZLE: zreťazenie reťazcov, ktoré počas behu znovu zostaví daný vzor
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ZLE: kódovanie hex/ROT13 — iné zahmlievanie, rovnaké riziko detekcie
clientSecret: hexDecode("474f4353..."),
```

Všetky tieto možnosti napokon aktivujú skener. Použite `resolvePublicCred()`.

❌ Do `.env.example` **nikdy** nepridávajte doslovné prihlasovacie údaje. Používatelia, ktorí potrebujú skutočné hodnoty od externého poskytovateľa, ich môžu sami extrahovať z verejného CLI alebo použiť vlastnú registráciu OAuth.

❌ Nové upozornenie skenovania tajných údajov **nikdy** nezamietnite bez toho, aby ste najskôr overili, či sa prihlasovací údaj nemá presunúť do tejto pomocnej funkcie.

## Súvisiace kontroly

- `RAW_VALUE_PATTERN` v súbore `publicCreds.ts` vymenúva prefixy, ktoré aktivujú priame odovzdanie hodnoty (spätná kompatibilita). Rozširujte ho iba o zdokumentované formáty verejných prihlasovacích údajov, nikdy nie o proprietárne tajné údaje.
- Súbor `.env.example` je zahrnutý v CI skripte `check-env-doc-sync` — keď z neho odstránite premennú, uistite sa, že dokumentácia tomu zodpovedá.
- Testovacie sady `npm run test:vitest` a `node --import tsx/esm --test tests/unit/publicCreds.test.ts` musia byť naďalej úspešné.

## Kedy túto pomocnú funkciu NEPOUŽÍVAŤ

Táto pomocná funkcia je určená **iba** pre prihlasovacie údaje, ktoré sú:

1. Verejne distribuované poskytovateľom služby (binárny súbor CLI, balík pre prehliadač, oficiálna dokumentácia).
2. Zdokumentované alebo jednoznačne označené ako nedôverné (chránené pomocou PKCE, webový kľúč Firebase a podobne).

Pre všetko ostatné — tokeny vydané operátorom, tajné údaje jednotlivých nájomníkov, `client_secret` vašej vlastnej aplikácie OAuth, šifrovacie kľúče, tajné kľúče JWT, heslá k databázam — používajte **iba premenné prostredia** (`process.env.FOO`, záložná hodnota `||` nastavená na prázdny reťazec / explicitnú chybu). Patria do súboru `.env` a do [šifrovaného úložiska prihlasovacích údajov](./COMPLIANCE.md), nie do zdrojového kódu.

## Referencie

- [Google: OAuth 2.0 pre natívne aplikácie](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: kľúče API na identifikáciu klienta](https://firebase.google.com/docs/projects/api-keys)
- [GitHub: podporované tajné údaje pri skenovaní tajných údajov](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: detekcia tokenov vo formáte base64 (február 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit, ktorý zaviedol túto pomocnú funkciu: `1a39c31f` — _fix(security): maskovanie verejných prihlasovacích údajov poskytovateľov + centralizácia sanitizácie chýb_
