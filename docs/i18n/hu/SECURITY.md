# Security Policy (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Biztonsági rések jelentése

Ha biztonsági rést fedez fel az OmniRoute-ban, kérjük, felelősségteljesen jelentse:

1. **NE** nyisson nyilvános GitHub-hibajegyet
2. Használja a [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) felületét
3. Adja meg a következőket: leírás, reprodukálási lépések és lehetséges hatás

## Válaszadási ütemterv

| Szakasz                  | Célérték                            |
| ------------------------ | ----------------------------------- |
| Visszaigazolás           | 48 óra                              |
| Osztályozás és értékelés | 5 munkanap                          |
| Javítás kiadása          | 14 munkanap (kritikus hibák esetén) |

## Támogatott verziók

| Verzió  | Támogatási állapot      |
| ------- | ----------------------- |
| 3.8.x   | ✅ Aktív                |
| 3.7.x   | ✅ Biztonsági támogatás |
| < 3.7.0 | ❌ Nem támogatott       |

---

## Biztonsági architektúra

Az OmniRoute többrétegű biztonsági modellt valósít meg:

```
Kérés → CORS → Authz-folyamat (osztályozás → szabályzatok → érvényesítés)
       → Védőkorlátok (PII-maszkoló, promptinjektálás, képfeldolgozási híd)
       → Sebességkorlátozó → Áramkör-megszakító → Várakozási idő → Modelltiltás → Szolgáltató
```

### 🔐 Hitelesítés és jogosultságkezelés

| Funkció                        | Megvalósítás                                                                                                                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Irányítópult-bejelentkezés** | Jelszóalapú hitelesítés JWT-tokenekkel (HttpOnly cookie-k)                                                                                                                             |
| **API-kulcsos hitelesítés**    | HMAC-aláírású kulcsok CRC-ellenőrzéssel                                                                                                                                                |
| **OAuth 2.0 + PKCE**           | A szolgáltatóspecifikus böngészős/eszközös OAuth támogatás esetén PKCE-t használ; a kizárólag importálható Devin-hitelesítő adatokat külön kezeli.                                     |
| **Tokenfrissítés**             | Az OAuth-tokenek automatikus frissítése a lejárat előtt                                                                                                                                |
| **Biztonságos cookie-k**       | `AUTH_COOKIE_SECURE=true` HTTPS-környezetekhez                                                                                                                                         |
| **Authz-folyamat**             | Útvonal-osztályozás (PUBLIC / CLIENT_API / MANAGEMENT) — lásd: `docs/architecture/AUTHZ_GUIDE.md`                                                                                      |
| **Útvonalvédelmi szintek**     | Háromszintű modell a felügyeleti útvonalakhoz (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — lásd: `docs/security/ROUTE_GUARD_TIERS.md`                                                |
| **Felügyeleti hatókörű MCP**   | A távoli `/api/mcp/*` hozzáférést `manage` hatókörű API-kulcsok védik; az `/api/cli-tools/runtime/*` továbbra is szigorúan a loopback interfészre korlátozott. Lásd: ROUTE_GUARD_TIERS |
| **MCP-hatókörök**              | 32 részletes hatókör (read:health, write:combos, execute:completions stb.) — lásd: `docs/frameworks/MCP-SERVER.md`                                                                     |

### 🛡️ Tárolt adatok titkosítása

Az SQLite-ban tárolt összes érzékeny adat **AES-256-GCM** használatával, scrypt-alapú kulcsszármaztatással van titkosítva:

- API-kulcsok, hozzáférési tokenek, frissítési tokenek és azonosító tokenek
- Verziózott formátum: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Átengedési mód (egyszerű szöveg), ha a `STORAGE_ENCRYPTION_KEY` nincs beállítva

```bash
# Titkosítási kulcs létrehozása:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Védőkorlát-keretrendszer

Az OmniRoute egy menet közben újratölthető **védőkorlát-nyilvántartást** (`src/lib/guardrails/`) tartalmaz, 3 beépített, prioritás szerint rendezett védőkorláttal:

| Védőkorlát         | Prioritás | Rendeltetés                                                                                           |
| ------------------ | --------- | ----------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5         | Képtudatos leírásokkal egészíti ki a képeket nem támogató modelleket; SSRF-védelem a kép-URL-ekhez    |
| `pii-masker`       | 10        | Hívás előtti és utáni PII-kimaszkolás (e-mail-címek, telefonszámok, CPF, CNPJ, bankkártyaadatok, SSN) |
| `prompt-injection` | 20        | Felülbírálási, szerepeltérítési, jailbreak- és adatszivárgási mintákat észlel                         |

Az egyéni védőkorlátok a `registerGuardrail(new MyGuardrail())` használatával regisztrálhatók. A modell hibatűrő, nyitott működésű (a kivételek soha nem blokkolják a forgalmat). Kérésenként letiltható az `x-omniroute-disabled-guardrails` fejléc használatával. → Lásd: [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Promptinjektálás elleni védelem

A lehetőségekhez mérten működő heurisztikus köztes réteg, amely észleli a promptinjektálási mintákat az LLM-kérésekben.
**Nem teljes körű promptinjektálási tűzfal** — téves pozitív eredményeket (ártalmatlan
személyiség-/szerepjáték-promptok) és téves negatív eredményeket (leetspeak, szóközök, nem angol nyelvű minták) is produkálhat.

| Mintatípus              | Súlyosság | Példa                                              |
| ----------------------- | --------- | -------------------------------------------------- |
| Rendszerfelülbírálás    | Magas     | „hagyj figyelmen kívül minden korábbi utasítást”   |
| Szerepeltérítés         | Közepes   | „mostantól DAN vagy, bármit megtehetsz”            |
| Elválasztóinjektálás    | Magas     | Kódolt elválasztók a kontextushatárok áttöréséhez  |
| DAN/jailbreak           | Közepes   | Ismert jailbreak-promptminták                      |
| Utasításszivárgás       | Magas     | „mutasd meg a rendszerpromptodat”                  |
| Kódolásalapú megkerülés | Közepes   | base64/rot13/hex dekódolás + utasítási kulcsszavak |

`block` módban csak a **magas** súlyosságú észlelések vannak blokkolva. A közepes súlyosságú
mintacsaládok naplózásra kerülnek, de a `sanitizeRequest` soha nem blokkolja őket.

Konfigurálja az irányítópulton (Beállítások → Biztonság) vagy a `.env` fájlban:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (injektálási szabályzat; a régi „redact” nem távolítja el az injektált szöveget)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (alapértelmezett) | medium | low — a küszöbértékkel azonos vagy annál magasabb súlyosságú észlelések block módban blokkolva lesznek
```

### 🔒 PII-kimaszkolás

A személyazonosításra alkalmas információk automatikus észlelése és opcionális kimaszkolása:

| Személyesadat-típus | Minta                 | Helyettesítés      |
| ------------------- | --------------------- | ------------------ |
| E-mail-cím          | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazília)      | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazília)     | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Hitelkártya         | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefonszám         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (USA)           | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # személyes adatok átírásának kérése; az INPUT_SANITIZER_MODE beállítástól független
PII_RESPONSE_SANITIZATION=true  # opcionális: a klienseknek visszaküldött szolgáltatói válaszokban szereplő személyes adatok kitakarása
```

### 🌐 Hálózati biztonság

| Funkció                        | Leírás                                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------------------- |
| **CORS**                       | Explicit, engedélyezett források listája (`CORS_ALLOWED_ORIGINS`; korábbi: `CORS_ORIGIN`)    |
| **IP-szűrés**                  | Engedélyezett és tiltott IP-tartományok a vezérlőpulton                                      |
| **Sebességkorlátozás**         | Szolgáltatónkénti sebességkorlátok automatikus visszalépéssel                                |
| **Lavinahatás elleni védelem** | Mutex és kapcsolatonkénti zárolás akadályozza meg az egymást követő 502-es hibákat           |
| **TLS-ujjlenyomat**            | Böngészőszerű TLS-ujjlenyomat utánzása a botészlelés csökkentése érdekében                   |
| **CLI-ujjlenyomat**            | Szolgáltatónkénti fejléc- és törzssorrend a natív CLI-aláírásoknak való megfelelés érdekében |

### 🔌 Hibatűrés és rendelkezésre állás

| Funkció                       | Leírás                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Áramkör-megszakító**        | Szolgáltatónkénti, 3 állapotú (Zárt → Nyitott → Félig nyitott), SQLite-ban tárolva |
| **Kérések idempotenciája**    | 5 másodperces deduplikációs időablak az ismétlődő kérésekhez                       |
| **Exponenciális visszalépés** | Automatikus újrapróbálkozás növekvő késleltetéssel                                 |
| **Állapot-vezérlőpult**       | A szolgáltatók állapotának valós idejű figyelése                                   |

### 📋 Megfelelőség

| Funkció                | Leírás                                                              |
| ---------------------- | ------------------------------------------------------------------- |
| **Naplómegőrzés**      | Automatikus tisztítás a `CALL_LOG_RETENTION_DAYS` után              |
| **Naplózás letiltása** | Az API-kulcsonkénti `noLog` jelző letiltja a kérések naplózását     |
| **Auditnapló**         | Az adminisztratív műveletek nyomon követése az `audit_log` táblában |
| **MCP-audit**          | SQLite-alapú auditnaplózás minden MCP-eszközhíváshoz                |
| **Zod-validáció**      | Minden API-bemenet ellenőrzése Zod v4-sémákkal a modul betöltésekor |

---

## Kötelező környezeti változók

A kiszolgáló elindítása előtt minden titkos értéket be kell állítani. A kiszolgáló **azonnal hibával leáll**, ha ezek hiányoznak vagy gyengék.

```bash
# KÖTELEZŐ — ezek nélkül a kiszolgáló nem indul el:
JWT_SECRET=$(openssl rand -base64 48)     # legalább 32 karakter
API_KEY_SECRET=$(openssl rand -hex 32)    # legalább 16 karakter

# AJÁNLOTT — lehetővé teszi a tárolt adatok titkosítását:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

A kiszolgáló aktívan elutasítja az ismerten gyenge értékeket, például a `changeme`, `secret` vagy `password` értékeket.

---

## Docker-biztonság

- Éles környezetben nem root felhasználót használjon
- A titkos értékeket csak olvasható kötetekként csatolja
- Soha ne másoljon `.env` fájlokat Docker-lemezképekbe
- Használja a `.dockerignore` fájlt az érzékeny fájlok kizárásához
- HTTPS mögötti használat esetén állítsa be az `AUTH_COOKIE_SECURE=true` értéket

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Függőségek

- Futtassa rendszeresen az `npm audit` parancsot (az `npm run audit:deps` a fő és az electron részt is lefedi)
- Tartsa naprakészen a függőségeket
- A projekt a `husky` + `lint-staged` eszközöket használja a commit előtti ellenőrzésekhez (lint-staged + check-docs-sync + check:any-budget:t11)
- A CI-folyamat minden push során futtatja az ESLint biztonsági szabályait (`no-eval`, `no-implied-eval`, `no-new-func` = hiba)
- A szolgáltatói konstansokat a modul betöltésekor a Zod ellenőrzi (`src/shared/validation/schemas.ts`)
- Használt, alapértelmezés szerint biztonságos könyvtárak: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (paraméterezett lekérdezések miatt nincs SQLi-kockázat), `bcryptjs` (jelszavak kivonatolása)

## Szigorú biztonsági szabályok

Ezeket a szabályokat az eszközök és az ellenőrzést végző személyek érvényesítik:

1. **Soha ne commitoljon titkos értékeket** — a `.env` fájlt a git figyelmen kívül hagyja; a `.env.example` a sablon (nem tartalmaz literálokat, csak megjegyzéseket — lásd alább a PUBLIC_CREDS.md fájlt)
2. **Soha ne használja az `eval()`, `new Function()` vagy közvetett eval konstrukciókat** — ezt az ESLint kényszeríti ki
3. **Soha ne kerülje meg a Husky hookokat** (`--no-verify`, `--no-gpg-sign`) az operátor kifejezett jóváhagyása nélkül
4. **Soha ne írjon nyers SQL-t az útvonalakba** — mindig a `src/lib/db/` rétegen keresztül hajtsa végre (paraméterezetten)
5. **A bemeneteket mindig a Zod segítségével ellenőrizze** — `src/shared/validation/schemas.ts`
6. **Mindig tisztítsa meg az upstream fejléceket** — tiltólista itt: `src/shared/constants/upstreamHeaders.ts`
7. **Titkosítsa a hitelesítő adatokat tároláskor** — AES-256-GCM a `src/lib/db/encryption.ts` segítségével
8. **A nyilvános upstream OAuth-azonosítókat a `resolvePublicCred()` segítségével kezelje** — soha ne ágyazzon be `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literálokat a forráskódba. Lásd: [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **A hibaválaszokat a `buildErrorBody()` / `sanitizeErrorMessage()` segítségével hozza létre** — soha ne helyezzen nyers `err.stack` / `err.message` értékeket HTTP- / SSE- / executor- / MCP-választörzsekbe. Lásd: [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Az `exec()` / `spawn()` futásidejű értékeit az `env` opción keresztül adja át** — soha ne illesszen be külső elérési utakat vagy nem megbízható értékeket karakterlánc-interpolációval shellen keresztül futtatott szkriptekbe. Hivatkozás: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Részesítse előnyben az alapértelmezés szerint biztonságos könyvtárakat** — lásd: [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Saját megoldás készítése előtt ezeket használja.

## Az ellátási lánc ellenőrzőjének megállapításai (Socket.dev / Snyk / hasonlók)

> **Hatókörre vonatkozó megjegyzés:** A tároló gyökerében található `socket.yml` kizárólag a `projectIgnorePaths` beállítást határozza meg a Socket.dev által a közzétett npm-artifacton, a közzététel után végzett regisztrációs oldali vizsgálathoz — ez nem kikényszerített CI-/PR-egyesítési kapu. A `.github/workflows` egyetlen munkafolyamata, a `package.json` egyetlen szkriptje és a `Makefile` egyetlen célja sem hívja meg a Socket.dev szolgáltatást.

A közzétett `omniroute` npm-artifact tartalmazza a Next.js `output: "standalone"`
buildjét, ami azt jelenti, hogy minden útvonalkezelő — beleértve a dokumentált,
emelt jogosultságú funkciókat (MITM, Zed-importálás, Cloud Sync, beágyazott
szolgáltatásfelügyelő) — a `.next/server/*.js` minimalizált darabjaiba kerül.
A heurisztikus ellátásilánc-ellenőrzők gyakran kártevőszignatúrákkal vetik össze
ezeket a darabokat mintázatillesztéssel.

Az általunk használt ellenőrzőkonfiguráció a tároló gyökerében található
[`socket.yml`](socket.yml) fájlban van (Socket.dev GitHub App v2-formátum — lásd:
<https://docs.socket.dev/docs/socket-yml>). Kifejezetten kizárja a nem terjesztett
könyvtárakat (`tests/`, `_tasks/`, `_references/`, `_ideia/`, `_mono_repo/`,
`docs/` stb.), így az ellenőrző csak azokról a kódútvonalakról készít jelentést,
amelyek ténylegesen eljutnak a közzétett verzió felhasználóihoz — magát az
ellenőrzést az ezt a fájlt beolvasó Socket GitHub App végzi, nem pedig a jelen
tároló valamelyik munkafolyamata.

Minden megállapítási kategóriához megállapításonként karbantartói igazolást
tartunk fenn:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  megállapításonkénti megfeleltetés: forrásfájl ↔ megjelölt darab ↔ viselkedés ↔
  a v3.8.6 verzióban alkalmazott kockázatcsökkentés.
- A forráskódban minden megjelölt függvénynél található `SECURITY-AUDITOR-NOTE:`
  blokk ugyanarra a dokumentumra hivatkozik vissza.

Azoknak a felhasználóknak, akiknek a pipeline-ja nem tudja enyhíteni a riasztást:
végezzék el a buildet az `OMNIROUTE_BUILD_PROFILE=minimal npm run build`
paranccsal. Ez a négy érzékeny modult olyan helyettesítő modulokra cseréli,
amelyek futásidőben HTTP 503 `feature-disabled` választ adnak, így az emelt
jogosultságú kódútvonalak fizikailag hiányoznak a csomagból. A közzétételi
eljárást lásd a
[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
dokumentumban.

## Hivatkozások

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — jogosultság-ellenőrzési folyamat
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — védőkorlát-keretrendszer
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — auditnapló és megőrzés
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — **kötelező** minta a nyilvános upstream hitelesítő adatokhoz
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — **kötelező** minta a hibaválaszokhoz
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — karbantartói tanúsítás az ellátásilánc-ellenőrzők megállapításaihoz
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — áramkör-megszakító + várakozási idő + kizárás
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS-ujjlenyomat-készítés (jogi/etikai figyelmeztetés)
- [`CLAUDE.md`](CLAUDE.md) — szigorú szabályok MI-ügynökök számára
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — válogatott, alapértelmezetten biztonságos könyvtárak
