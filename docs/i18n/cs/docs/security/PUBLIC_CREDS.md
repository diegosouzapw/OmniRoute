# Public Credentials Handling (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Zdroj pravdy:** `open-sse/utils/publicCreds.ts`
> **Testy:** `tests/unit/publicCreds.test.ts`
> **Poslední aktualizace:** 2026-08-07 — v3.8.50
> **Pro koho:** Technici integrující poskytovatele, kteří ve svých veřejných CLI distribuují veřejné OAuth client_id / client_secret / Firebase Web API klíče.
> **Stav:** **POVINNÉ** pro veškerý nový kód, který obsahuje identifikátory poskytovatelů.

## Proč to existuje

- [OAuth 2.0 pro nativní aplikace (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret pro nainstalované aplikace jsou veřejné; skutečné zabezpečení zajišťuje PKCE.
- [Firebase API klíče](https://firebase.google.com/docs/projects/api-keys) — Identifikátory webových klientů jsou záměrně veřejné.

OmniRoute musí tyto hodnoty obsahovat, aby uživatelé, kteří nenakonfigurují `.env`, získali ihned po instalaci funkční OAuth proces. Bez vestavěné záložní hodnoty přestanou poskytovatelé Gemini / Antigravity fungovat všem uživatelům, kteří postupují způsobem „prostě naklonovat a spustit“.

Doslovné hodnoty jako `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` však rozpoznávají nástroje **GitHub Secret Scanning**, **Semgrep** a podobné skenery založené na vzorech. Každé vydání se tak stává hlučným proudem falešných poplachů, ochrana proti pushnutí blokuje legitimní commity a provozovatelé přestávají důvěřovat kanálu upozornění.

Pomocná funkce `open-sse/utils/publicCreds.ts` řeší obě omezení současně:

- Vkládá veřejný identifikátor jako **posloupnost bajtů maskovanou pomocí XOR** (ve zdrojovém kódu se nenachází žádný vzor rozpoznatelný skenerem).
- Za běhu jej dekóduje prostřednictvím `decodePublicCred` / `resolvePublicCred`.
- Rozpoznává nezpracované hodnoty, které již používají známé prefixy (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), a předává je beze změny, takže uživatelům s nezpracovanými hodnotami v existujícím `.env` vše nadále funguje s **nulovou nutností migrace**.

Jde o **obfuskaci, nikoli šifrování.** Každý, kdo si přečte zdrojový kód, může hodnotu obnovit — což je v pořádku, protože je tato hodnota záměrně veřejná. Jediným cílem je zabránit shodám s regulárními výrazy skenerů.

## Povinný vzor

### 1. Přidání nového veřejného přihlašovacího údaje

Pokud potřebujete vložit novou hodnotu poskytnutou upstreamem, která:

- pochází z veřejného CLI / desktopové aplikace / balíčku pro prohlížeč, **a zároveň**
- ji upstream poskytovatel dokumentuje (nebo ji považuje) za veřejný identifikátor klienta, **a zároveň**
- by ji jinak rozpoznal skener vzorů (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` atd.),

…postupujte podle tohoto kontrolního seznamu:

1. Vygenerujte maskovanou posloupnost bajtů:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Přidejte do `EMBEDDED_DEFAULTS` v souboru `open-sse/utils/publicCreds.ts` novou položku s **neutrálním názvem klíče** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` atd.). V pomocné funkci **nepoužívejte** názvy jako `client_secret` nebo `api_key` — tato slova aktivují obecná pravidla nástroje Semgrep pro detekci tajných údajů.

3. Přidejte `keyof typeof EMBEDDED_DEFAULTS` do veřejné sjednocovací typové definice (odvozuje se automaticky).

4. Ve spotřebitelském kódu nahraďte pevně zadaný literál následujícím:

   ```ts
   // jediná proměnná prostředí
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // více aliasů proměnných prostředí (použije se první neprázdná hodnota)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // bez přepsání proměnnou prostředí (vždy se použije vestavěná výchozí hodnota)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Odstraňte literál z `.env.example` (nahraďte jej dokumentací pouze v komentářích, která čtenáře odkáže sem):

   ```dotenv
   # ── Poskytovatel (Google / Firebase / atd.) ──
   # Veřejné přihlašovací údaje OAuth jsou vloženy přímo do kódu prostřednictvím
   # open-sse/utils/publicCreds.ts. Tyto proměnné nastavte pouze při použití vlastních údajů.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Aktualizujte `tests/unit/publicCreds.test.ts` a přidejte kontrolu struktury nového klíče (ověřujte formát, nikoli doslovnou hodnotu — vzor naleznete v existujících testech).

7. Do testovacích souborů **nikdy** nepřidávejte literály `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Používejte konstanty `FAKE_*` sestavené z fragmentů pomocí `.join("")` (viz existující testy).

### 2. Spotřebitelé

- **Čtěte pouze prostřednictvím `resolvePublicCred()` / `resolvePublicCredMulti()`** — mimo pomocnou funkci nikdy nevolejte přímo `decodePublicCredBytes()`.
- Pomocná funkce je záměrně nenáročná (lineární XOR bajtů) a lze ji bezpečně volat při načítání modulu; výchozí hodnoty se vypočítají pouze jednou.
- Hodnota z proměnné prostředí má vždy přednost. Pokud uživatel nastaví `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, pomocná funkce tuto nezpracovanou hodnotu předá beze změny.

### 3. Zakázané vzory

❌ V produkčním kódu (`src/`, `open-sse/`, `electron/`, `bin/`) **nikdy** neprovádějte nic z následujícího:

```ts
// ŠPATNĚ: doslovná hodnota aktivuje Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ŠPATNĚ: base64 doslovné hodnoty — GitHub ji od února 2025 stále detekuje
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ŠPATNĚ: zřetězení řetězců, které za běhu znovu sestaví vzor
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ŠPATNĚ: kódování hex/ROT13 — jiná obfuskace, stejné riziko detekce
clientSecret: hexDecode("474f4353..."),
```

Všechny tyto varianty nakonec aktivují skener. Použijte `resolvePublicCred()`.

❌ Do `.env.example` **nikdy** nepřidávejte doslovné přihlašovací údaje. Uživatelé, kteří potřebují skutečné upstream hodnoty, je mohou sami extrahovat z veřejného CLI nebo použít vlastní registraci OAuth.

❌ Nové upozornění skenování tajných údajů **nikdy** neignorujte, aniž byste nejprve ověřili, zda se má daný přihlašovací údaj přesunout do této pomocné funkce.

## Související mechanismy

- `RAW_VALUE_PATTERN` v `publicCreds.ts` uvádí prefixy, které aktivují přímé předání hodnoty (zpětná kompatibilita). Rozšiřujte jej pouze o zdokumentované formáty veřejných přihlašovacích údajů, nikdy ne o proprietární tajné údaje.
- `.env.example` je kontrolován skriptem CI `check-env-doc-sync` — když zde odstraníte proměnnou, zajistěte, aby tomu odpovídala i dokumentace.
- Sady testů `npm run test:vitest` a `node --import tsx/esm --test tests/unit/publicCreds.test.ts` musí obě nadále úspěšně procházet.

## Kdy tohoto pomocníka NEPOUŽÍVAT

Tento pomocník je určen **pouze** pro přihlašovací údaje, které jsou:

1. Veřejně distribuovány poskytovatelem (binární soubor CLI, balíček pro prohlížeč, oficiální dokumentace).
2. Zdokumentovány nebo důrazně označeny jako nedůvěrné (chráněné pomocí PKCE, webový klíč Firebase apod.).

Pro vše ostatní — tokeny vydané provozovatelem, tajné údaje jednotlivých tenantů, `client_secret` vaší vlastní aplikace OAuth, šifrovací klíče, tajné údaje JWT, hesla k databázím — používejte **pouze proměnné prostředí** (`process.env.FOO`, záložní operátor `||` s prázdnou hodnotou / explicitní chybou). Tyto údaje patří do souboru `.env` a [šifrovaného úložiště přihlašovacích údajů](./COMPLIANCE.md), nikoli do zdrojového kódu.

## Reference

- [Google: OAuth 2.0 pro nativní aplikace](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Klíče API pro identifikaci klienta](https://firebase.google.com/docs/projects/api-keys)
- [GitHub: Tajné údaje podporované funkcí Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: Detekce tokenů v base64 (únor 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit zavádějící tohoto pomocníka: `1a39c31f` — _fix(security): maskování veřejných přihlašovacích údajů poskytovatele + centralizace sanitizace chyb_
