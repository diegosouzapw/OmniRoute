# Security Policy (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Bayar da Rahoton Raunukan Tsaro

Idan ka gano wani raunin tsaro a OmniRoute, da fatan za ka bayar da rahotonsa cikin alhaki:

1. **KADA KA** buɗe batun GitHub na jama'a
2. Yi amfani da [Shawarwarin Tsaro na GitHub](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Haɗa da: bayani, matakan sake kwaikwayon matsalar, da tasirin da ka iya biyo baya

## Jadawalin Amsa

| Mataki                 | Manufa                                    |
| ---------------------- | ----------------------------------------- |
| Tabbatar da karɓa      | Awanni 48                                 |
| Tantancewa & Kimantawa | Kwanakin aiki 5                           |
| Fitar da Gyara         | Kwanakin aiki 14 (mai matuƙar muhimmanci) |

## Nau'ikan da Ake Tallafawa

| Nau'i   | Matsayin Tallafi  |
| ------- | ----------------- |
| 3.8.x   | ✅ Yana aiki      |
| 3.7.x   | ✅ Tsaro          |
| < 3.7.0 | ❌ Ba a tallafawa |

---

## Tsarin Gine-ginen Tsaro

OmniRoute yana aiwatar da tsarin tsaro mai matakai da yawa:

```
Buƙata → CORS → Bututun Authz (rarrabawa → manufofi → tilastawa)
       → Matakan Kariya (mai ɓoye PII, kutsen prompt, gadar vision)
       → Mai Iyakance Adadin Buƙatu → Mai Katse Da'ira → Lokacin Jira → Kulle Model → Mai Bayarwa
```

### 🔐 Tabbatar da Shaida & Izini

| Siffa                       | Yadda Aka Aiwatar                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shiga Dashboard**         | Tabbatar da shaida ta kalmar sirri tare da token na JWT (cookies na HttpOnly)                                                                                           |
| **Tantance API Key**        | Maɓallan da aka sanya wa hannu da HMAC tare da tabbatarwar CRC                                                                                                          |
| **OAuth 2.0 + PKCE**        | OAuth na burauza/na'ura takamaimai ga mai bayarwa yana amfani da PKCE inda ake tallafawa; ana sarrafa bayanan shaidar Devin na shigo-da-kawai daban.                    |
| **Sabunta Token**           | Sabunta token na OAuth kai tsaye kafin wa'adinsa ya ƙare                                                                                                                |
| **Cookies Masu Tsaro**      | `AUTH_COOKIE_SECURE=true` don muhallan HTTPS                                                                                                                            |
| **Bututun Authz**           | Rarraba hanyar shiga (PUBLIC / CLIENT_API / MANAGEMENT) — duba `docs/architecture/AUTHZ_GUIDE.md`                                                                       |
| **Matakan Kariya na Hanya** | Tsarin matakai 3 don hanyoyin gudanarwa (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — duba `docs/security/ROUTE_GUARD_TIERS.md`                                        |
| **MCP na Manage-Scope**     | Ana kayyade damar nesa ta `/api/mcp/*` da API keys masu scope na `manage`; `/api/cli-tools/runtime/*` yana ci gaba da kasancewa strict-loopback. Duba ROUTE_GUARD_TIERS |
| **Scopes na MCP**           | Scopes guda 32 masu cikakken rarrabuwa (read:health, write:combos, execute:completions, da sauransu) — duba `docs/frameworks/MCP-SERVER.md`                             |

### 🛡️ Rufaffen Bayanai Lokacin Ajiya

Ana rufaffen dukkan bayanai masu muhimmanci da aka adana a SQLite ta amfani da **AES-256-GCM** tare da samar da maɓalli ta scrypt:

- API keys, access tokens, refresh tokens, da ID tokens
- Tsari mai nau'i: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Yanayin wucewa kai tsaye (plaintext) lokacin da ba a saita `STORAGE_ENCRYPTION_KEY` ba

```bash
# Samar da maɓallin ɓoyewa:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Tsarin Matakan Kariya

OmniRoute yana zuwa da **rajistar matakan kariya** (`src/lib/guardrails/`) mai iya sake lodawa nan take, tare da matakan kariya 3 da aka gina a ciki waɗanda aka jera bisa fifiko:

| Matakin Kariya     | Fifiko | Manufa                                                                                       |
| ------------------ | ------ | -------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5      | Yana haɗa models marasa vision da bayanai masu fahimtar hoto; kariyar SSRF ga URLs na hotuna |
| `pii-masker`       | 10     | Ɓoye PII kafin+bayan kira (imel, waya, CPF, CNPJ, katunan kuɗi, SSN)                         |
| `prompt-injection` | 20     | Yana gano tsarin ƙetare umarni/sace rawa/jailbreak/fitar da bayanan sirri                    |

Ana rajistar matakan kariya na musamman ta hanyar `registerGuardrail(new MyGuardrail())`. Tsarin yana aiki bisa fail-open (kurakurai ba sa taɓa hana zirga-zirga). Ana iya ƙin amfani da su ga kowace buƙata ta hanyar header na `x-omniroute-disabled-guardrails`. → Duba [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Kariyar Kutsen Prompt

Middleware na hasashe bisa ƙoƙari mafi kyau wanda ke gano tsarin kutsen prompt a cikin buƙatun LLM.
**Ba cikakken bangon kariya daga kutsen prompt ba ne** — yana iya samar da sakamakon ƙarya na cewa akwai matsala (prompts na persona/RPG marasa illa) da kuma kasa gano matsalar da ke akwai (leetspeak, tazara, tsarin da ba na Turanci ba).

| Nau'in Tsari          | Tsanani    | Misali                                               |
| --------------------- | ---------- | ---------------------------------------------------- |
| Ƙetare Umarnin System | Babba      | "yi watsi da duk umarnin da aka bayar a baya"        |
| Sace Rawa             | Matsakaici | "yanzu kai DAN ne, kana iya yin komai"               |
| Kutsen Delimiter      | Babba      | Rabe-raben da aka encode don karya iyakokin mahallin |
| DAN/Jailbreak         | Matsakaici | Sanannun tsarin prompt na jailbreak                  |
| Fitar da Umarni       | Babba      | "nuna mini system prompt ɗinka"                      |
| Kaucewa ta Encoding   | Matsakaici | decode na base64/rot13/hex + kalmomin umarni         |

Ganowa mai tsanani na **Babba** kaɗai ake toshewa a yanayin `block`. Ana rubuta
dangogin masu tsanani na Matsakaici a log, amma `sanitizeRequest` ba ya taɓa toshe su.

Saita ta dashboard (Settings → Security) ko `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (manufar kutsen prompt; tsohon "redact" ba ya cire rubutun kutsen)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (tsoho) | medium | low — ana toshe matakan tsanani da suka kai/zarce wannan a yanayin block
```

### 🔒 Ɓoye PII

Ganowa ta atomatik da kuma zaɓin ɓoye bayanan da za a iya amfani da su wajen gane mutum:

| Nau'in PII    | Tsari                 | Abin Maye Gurbi    |
| ------------- | --------------------- | ------------------ |
| Imel          | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazil)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazil) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Katin Kiredit | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Waya          | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (Amurka)  | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # nemi sake rubuta PII; ba ya dogara da INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # na zaɓi: ɓoye PII a martanin mai bayarwa da ake mayarwa ga abokan hulɗa
```

### 🌐 Tsaron Cibiyar Sadarwa

| Fasali                    | Bayani                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **CORS**                  | Jerin izinin tushen giciye na bayyane (`CORS_ALLOWED_ORIGINS`; tsohon `CORS_ORIGIN`) |
| **Tace IP**               | Jerin izini/jerin toshewa na kewayon IP a dashboard                                  |
| **Iyakance Yawan Buƙata** | Iyakokin yawan buƙata ga kowane mai bayarwa tare da jinkirin atomatik                |
| **Kare Cunkoson Buƙatu**  | Mutex + kullewa ga kowace haɗi yana hana kurakuran 502 masu yaɗuwa                   |
| **Sawun TLS**             | Kwaikwayon sawun TLS irin na burauza don rage gano bot                               |
| **Sawun CLI**             | Tsarin kanun/body ga kowane mai bayarwa don dacewa da sa hannun CLI na asali         |

### 🔌 Juriya da Samuwar Sabis

| Fasali                    | Bayani                                                                        |
| ------------------------- | ----------------------------------------------------------------------------- |
| **Circuit Breaker**       | Matakai 3 (Rufe → Buɗe → Rabin-Buɗe) ga kowane mai bayarwa, an adana a SQLite |
| **Idempotency na Buƙata** | Tazarar cire maimaitattun buƙatu ta daƙiƙa 5                                  |
| **Exponential Backoff**   | Sake gwadawa ta atomatik tare da ƙarin jinkiri                                |
| **Dashboard na Lafiya**   | Sa ido kan lafiyar masu bayarwa a ainihin lokaci                              |

### 📋 Bin Ƙa'idoji

| Fasali                  | Bayani                                                               |
| ----------------------- | -------------------------------------------------------------------- |
| **Riƙe Rajista**        | Tsaftacewa ta atomatik bayan `CALL_LOG_RETENTION_DAYS`               |
| **Ficewa daga Rajista** | Alamar `noLog` ga kowane API key tana kashe rajistar buƙatu          |
| **Rajistar Bincike**    | Ana bin diddigin ayyukan gudanarwa a teburin `audit_log`             |
| **Binciken MCP**        | Rajistar bincike mai amfani da SQLite don duk kiran kayan aikin MCP  |
| **Tabbatarwar Zod**     | Ana tabbatar da duk shigarwar API da tsarin Zod v4 yayin loda module |

---

## Muhimman Masu Canjin Muhalli

Dole ne a saita dukkan sirrika kafin fara sabar. Sabar za ta **gaza nan take** idan babu su ko kuma suna da rauni.

```bash
# WAJIBI — sabar ba za ta fara ba idan babu waɗannan:
JWT_SECRET=$(openssl rand -base64 48)     # aƙalla haruffa 32
API_KEY_SECRET=$(openssl rand -hex 32)    # aƙalla haruffa 16

# ANA BA DA SHAWARA — yana ba da damar ɓoyewa yayin ajiya:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Sabar tana ƙin sanannun ƙimomi marasa ƙarfi kamar `changeme`, `secret`, ko `password`.

---

## Tsaron Docker

- Yi amfani da mai amfani wanda ba root ba a yanayin samarwa
- Haɗa sirrika a matsayin kundin da za a iya karantawa kawai
- Kada a taɓa kwafe fayilolin `.env` cikin hotunan Docker
- Yi amfani da `.dockerignore` don ware fayiloli masu muhimmanci
- Saita `AUTH_COOKIE_SECURE=true` lokacin da ake bayan HTTPS

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

## Dogaro

- Gudanar da `npm audit` a kai a kai (`npm run audit:deps` yana rufe babban ɓangare + electron)
- Riƙa sabunta abubuwan dogaro
- Aikin yana amfani da `husky` + `lint-staged` don binciken kafin commit (lint-staged + check-docs-sync + check:any-budget:t11)
- Bututun CI yana gudanar da ƙa'idojin tsaro na ESLint a kowane push (`no-eval`, `no-implied-eval`, `no-new-func` = kuskure)
- Ana tabbatar da constants na mai bayarwa lokacin loda module ta hanyar Zod (`src/shared/validation/schemas.ts`)
- Dakunan karatu masu tsaro ta tsoho da ake amfani da su: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (babu haɗarin SQLi saboda tambayoyi masu sigogi), `bcryptjs` (hashing na kalmar sirri)

## Tsauraran Ƙa'idojin Tsaro

Kayan aiki da masu bitar lamba suna tilasta waɗannan ƙa'idoji:

1. **Kada a taɓa yin commit na sirrika** — git yana yin watsi da `.env`; `.env.example` shi ne samfuri (babu ƙimomi na zahiri, sharhi kawai — duba PUBLIC_CREDS.md a ƙasa)
2. **Kada a taɓa amfani da `eval()`, `new Function()`, ko implied eval** — ESLint yana tilasta wannan
3. **Kada a taɓa kewaye hooks na Husky** (`--no-verify`, `--no-gpg-sign`) ba tare da bayyananniyar amincewar mai gudanarwa ba
4. **Kada a taɓa rubuta ɗanyen SQL a cikin routes** — koyaushe a bi ta `src/lib/db/` (mai sigogi)
5. **Koyaushe a tabbatar da ingancin bayanan shigarwa da Zod** — `src/shared/validation/schemas.ts`
6. **Koyaushe a tsabtace headers na upstream** — denylist yana cikin `src/shared/constants/upstreamHeaders.ts`
7. **A ɓoye bayanan shaida yayin ajiya** — AES-256-GCM ta hanyar `src/lib/db/encryption.ts`
8. **Masu gano OAuth na upstream na jama'a ta hanyar `resolvePublicCred()`** — kada a taɓa saka ƙimomin zahiri na `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` kai tsaye a cikin source. Duba [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Amsoshin kuskure ta hanyar `buildErrorBody()` / `sanitizeErrorMessage()`** — kada a taɓa sanya ɗanyen `err.stack` / `err.message` cikin jikin amsar HTTP / SSE / executor / MCP. Duba [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Ƙimomin runtime na `exec()` / `spawn()` ta hanyar zaɓin `env`** — kada a taɓa haɗa paths na waje ko ƙimomin da ba a amince da su ba cikin scripts da ake miƙawa shell ta hanyar string interpolation. Manuniya: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Fi son dakunan karatu masu tsaro ta tsoho** — duba [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Yi amfani da su kafin ƙirƙirar naka.

## Sakamakon na’urar binciken sarkar samarwa (Socket.dev / Snyk / makamantansu)

> **Bayanin iyaka:** `socket.yml` da ke tushen ma’ajiyar lamba yana tsara `projectIgnorePaths` ne kawai don binciken bayan-wallafa na Socket.dev a bangaren rajista kan artefakt ɗin npm da aka wallafa — ba ƙa’idar tilasta haɗewar CI/PR ba ce. Babu wani workflow a `.github/workflows`, babu script na `package.json`, kuma babu target na `Makefile` da ke kiran Socket.dev.

Artefakt ɗin npm na `omniroute` da aka wallafa yana ƙunshe da build ɗin Next.js mai `output: "standalone"`, wanda ke nufin kowane mai sarrafa route — ciki har da fasalolin da aka rubuta bayanansu masu buƙatar gata (MITM, shigo da Zed, Cloud Sync, da mai kula da sabis da aka haɗa ciki) — yana ƙarewa a cikin ƙananan chunks na `.next/server/*.js` da aka matse. Na’urorin binciken sarkar samarwa masu amfani da kimantawa sukan daidaita tsarin waɗannan chunks da sa hannun malware akai-akai.

Tsarin na’urar binciken da muke amfani da shi yana cikin [`socket.yml`](socket.yml) a tushen ma’ajiyar lambar (tsarin Socket.dev GitHub App v2 — duba
<https://docs.socket.dev/docs/socket-yml>). A sarari yake ware kundin adireshin da ba a tura su ba (`tests/`, `_tasks/`, `_references/`, `_ideia/`, `_mono_repo/`, `docs/`, da sauransu) domin na’urar binciken ta bayar da rahoto kawai kan hanyoyin lambar da suke isa ga masu amfani da aka wallafa musu — Socket GitHub App da ke karanta wannan fayil ne ke tafiyar da binciken kansa, ba wani workflow a wannan ma’ajiyar lamba ba.

Ga kowane rukuni na abin da aka gano, muna adana shaidar mai kula da tsarin ga kowane sakamakon bincike:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  taswirar kowane sakamakon bincike: fayil ɗin tushe ↔ chunk da aka yi wa alama ↔ ɗabi’a ↔ matakin rage haɗari da aka aiwatar a v3.8.6.
- Tubalan `SECURITY-AUDITOR-NOTE:` da ke cikin lambar tushe a wurin kowane function da aka yi wa alama suna mayar da mai dubawa zuwa wannan takarda.

Ga masu amfani waɗanda pipeline ɗinsu ba zai iya sassauta faɗakarwar ba: yi build da
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Wannan yana maye gurbin modules huɗu masu muhimmanci da stubs waɗanda ke mayar da HTTP 503 `feature-disabled` a lokacin aiki, don haka hanyoyin lambar masu buƙatar gata ba sa kasancewa a zahiri cikin bundle ɗin.
Duba [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
don tsarin wallafawa.

## Manazarta

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline na ba da izini
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — tsarin matakan kariya
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — kundin bincike da tsare bayanai
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — tsarin **wajibi** na bayanan shaidar upstream na jama’a
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — tsarin **wajibi** na martanin kurakurai
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — takardar shaidar mai kula da aikin game da sakamakon na’urar binciken sarkar samarwa
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — gano tsarin TLS (sanarwar doka/ɗabi’a)
- [`CLAUDE.md`](CLAUDE.md) — ƙa’idoji masu tsauri ga wakilan AI
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — zaɓaɓɓun libraries masu tsaro ta tsoho
