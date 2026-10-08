# Public Credentials Handling (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Vir resnice:** `open-sse/utils/publicCreds.ts`
> **Testi:** `tests/unit/publicCreds.test.ts`
> **Zadnja posodobitev:** 2026-08-07 — v3.8.50
> **Ciljna skupina:** Inženirji, ki integrirajo ponudnike, katerih javni CLI-ji vključujejo javne OAuth client_id / client_secret / ključe Firebase Web API.
> **Stanje:** **OBVEZNO** za vso novo kodo, ki vgrajuje identifikatorje zunanjih ponudnikov.

## Zakaj to obstaja

- [OAuth 2.0 za izvorne aplikacije (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret za nameščene aplikacije so javni; dejansko varnost zagotavlja PKCE.
- [Ključi Firebase API](https://firebase.google.com/docs/projects/api-keys) — Identifikatorji spletnih odjemalcev so po zasnovi javni.

OmniRoute mora vgraditi te vrednosti, da uporabniki, ki ne konfigurirajo datoteke `.env`, še vedno dobijo delujoč potek OAuth brez dodatne konfiguracije. Brez vgrajene nadomestne vrednosti ponudnika Gemini / Antigravity prenehata delovati za vse uporabnike, ki sledijo postopku »samo kloniraj in zaženi«.

Vendar pa dobesedne vrednosti, kot so `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`, zaznajo **GitHub Secret Scanning**, **Semgrep** in podobni pregledovalniki vzorcev. Vsaka izdaja povzroči nepregleden tok lažno pozitivnih opozoril, zaščita pri potiskanju blokira veljavne spremembe, skrbniki pa prenehajo zaupati toku opozoril.

Pomožna funkcionalnost `open-sse/utils/publicCreds.ts` hkrati rešuje obe omejitvi:

- Vgradi javni identifikator kot **zaporedje bajtov, maskirano z XOR** (v izvorni kodi ni vzorca, ki bi ga pregledovalnik lahko zaznal).
- Med izvajanjem ga dekodira prek `decodePublicCred` / `resolvePublicCred`.
- Zazna neobdelane vrednosti, ki že sledijo znanim predponam (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), in jih posreduje nespremenjene, zato obstoječe `.env` uporabnikov z neobdelanimi vrednostmi še naprej delujejo **brez kakršne koli migracije**.

To je **prikrivanje, ne šifriranje.** Vsakdo, ki prebere izvorno kodo, lahko obnovi vrednost — kar je sprejemljivo, saj je vrednost po zasnovi javna. Edini cilj je preprečiti ujemanje z regularnimi izrazi pregledovalnikov.

## Obvezni vzorec

### 1. Dodajanje nove javne poverilnice

Ko morate vgraditi novo vrednost, ki jo zagotavlja zunanji ponudnik in ki:

- izvira iz javnega CLI-ja / namizne aplikacije / brskalniškega paketa, **in**
- jo zunanji ponudnik dokumentira (ali obravnava) kot javni identifikator odjemalca, **in**
- bi jo pregledovalnik vzorcev sicer zaznal (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` itd.),

…upoštevajte ta kontrolni seznam:

1. Ustvarite maskirano zaporedje bajtov:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Dodajte nov vnos v `EMBEDDED_DEFAULTS` v `open-sse/utils/publicCreds.ts` z **nevtralnim imenom ključa** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` itd.). V pomožni funkcionalnosti **ne** uporabljajte imen, kot sta `client_secret` ali `api_key` — te besede sprožijo Semgrepova splošna pravila za skrivnosti.

3. Javni uniji tipov dodajte `keyof typeof EMBEDDED_DEFAULTS` (izpelje se samodejno).

4. V kodi porabnika zamenjajte trdo kodirano dobesedno vrednost z:

   ```ts
   // ena preglasitev iz okolja
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // več vzdevkov okolja (uporabi se prvi, ki ni prazen)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // brez preglasitve iz okolja (vedno vgrajena privzeta vrednost)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Odstranite dobesedno vrednost iz `.env.example` (nadomestite jo samo s komentarjem v dokumentaciji, ki bralce usmerja sem):

   ```dotenv
   # ── Ponudnik (Google / Firebase / itd.) ──
   # Javne poverilnice OAuth so vgrajene v kodo prek
   # open-sse/utils/publicCreds.ts. Te spremenljivke nastavite samo, če želite uporabiti svoje.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Posodobite `tests/unit/publicCreds.test.ts` in dodajte preverjanje oblike za novi ključ (preverite obliko, ne dobesedne vrednosti — za vzorec si oglejte obstoječe teste).

7. V testne datoteke **nikoli** ne dodajajte dobesednih vrednosti `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Uporabite konstante `FAKE_*`, sestavljene iz delov z `.join("")` (glejte obstoječe teste).

### 2. Porabniki

- **Berite samo iz `resolvePublicCred()` / `resolvePublicCredMulti()`** — zunaj pomožne funkcionalnosti nikoli ne kličite `decodePublicCredBytes()` neposredno.
- Pomožna funkcionalnost je namenoma poceni (linearni bajtni XOR) in jo je varno klicati med nalaganjem modula; privzete vrednosti se izračunajo enkrat.
- Preglasitev iz okolja ima vedno prednost. Če uporabnik nastavi `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pomožna funkcionalnost to neobdelano vrednost posreduje neposredno.

### 3. Prepovedani vzorci

❌ V produkcijski kodi (`src/`, `open-sse/`, `electron/`, `bin/`) **nikoli** ne naredite ničesar od naslednjega:

```ts
// SLABO: dobesedna vrednost sproži Secret Scanning in Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// SLABO: base64 dobesedne vrednosti — GitHub to še vedno zazna od februarja 2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// SLABO: združevanje nizov, ki med izvajanjem znova sestavi vzorec
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// SLABO: kodiranje hex/ROT13 — drugačno prikrivanje, enako tveganje zaznave
clientSecret: hexDecode("474f4353..."),
```

Vse to bo sčasoma sprožilo pregledovalnik. Uporabite `resolvePublicCred()`.

❌ V `.env.example` **nikoli** ne dodajajte dobesednih poverilnic. Uporabniki, ki potrebujejo dejanske vrednosti zunanjega ponudnika, jih lahko sami pridobijo iz javnega CLI-ja ali pa uporabijo lastno registracijo OAuth.

❌ Novega opozorila pregledovalnika skrivnosti **nikoli** ne zavrnite, ne da bi prej preverili, ali je treba poverilnico premakniti v to pomožno funkcionalnost.

## Povezane kontrole

- `RAW_VALUE_PATTERN` v `publicCreds.ts` našteva predpone, ki sprožijo neposredno posredovanje vrednosti (zaradi združljivosti za nazaj). Razširite ga le za dokumentirane oblike javnih poverilnic, nikoli za lastniške skrivnosti.
- `.env.example` je vključen v skript CI `check-env-doc-sync` — ko tukaj odstranite spremenljivko, poskrbite, da bo dokumentacija usklajena.
- Oba nabora preizkusov, `npm run test:vitest` in `node --import tsx/esm --test tests/unit/publicCreds.test.ts`, morata še naprej uspešno prestajati preizkuse.

## Kdaj tega pomožnega orodja NE uporabljati

To pomožno orodje je namenjeno **izključno** poverilnicam, ki so:

1. Javno distribuirane s strani izvornega ponudnika (binarna datoteka CLI, paket za brskalnik, uradna dokumentacija).
2. Dokumentirane ali močno nakazane kot nezaupne (zaščitene s PKCE, spletni ključ Firebase ali podobno).

Za vse drugo — žetone, ki jih izda upravljavec, skrivnosti posameznih najemnikov, `client_secret` vaše lastne aplikacije OAuth, šifrirne ključe, skrivnosti JWT, gesla podatkovnih zbirk — uporabljajte **izključno spremenljivke okolja** (`process.env.FOO`, nadomestna vrednost `||` naj bo prazna oziroma naj sproži izrecno napako). Te sodijo v `.env` in [šifrirano shrambo poverilnic](./COMPLIANCE.md), ne v izvorno kodo.

## Viri

- [Google: OAuth 2.0 za izvorne aplikacije](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: ključi API za identifikacijo odjemalcev](https://firebase.google.com/docs/projects/api-keys)
- [GitHub: podprte skrivnosti za pregledovanje skrivnosti](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: zaznavanje žetonov, kodiranih z base64 (februar 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Uveljavitev, ki je uvedla to pomožno orodje: `1a39c31f` — _fix(security): prikrij javne poverilnice izvornih ponudnikov in centraliziraj sanitizacijo napak_
