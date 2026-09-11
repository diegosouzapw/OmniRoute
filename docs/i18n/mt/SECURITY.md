# Security Policy (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Rappurtar ta' Vulnerabbiltajiet

Jekk tiskopri vulnerabbiltà tas-sigurtà f'OmniRoute, jekk jogħġbok irrapportaha b'mod responsabbli:

1. **TIFTAĦX** kwistjoni pubblika fuq GitHub
2. Uża l-[Avviżi tas-Sigurtà ta' GitHub](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Inkludi: deskrizzjoni, passi għar-riproduzzjoni, u l-impatt potenzjali

## Skeda taż-Żmien għar-Rispons

| Stadju                          | Mira                           |
| ------------------------------- | ------------------------------ |
| Konferma tar-Riċevuta           | 48 siegħa                      |
| Klassifikazzjoni u Valutazzjoni | 5 ijiem tax-xogħol             |
| Ħruġ tal-Garża                  | 14-il jum tax-xogħol (kritika) |

## Verżjonijiet Appoġġjati

| Verżjoni | Status tal-Appoġġ |
| -------- | ----------------- |
| 3.8.x    | ✅ Attiv          |
| 3.7.x    | ✅ Sigurtà        |
| < 3.7.0  | ❌ Mhux Appoġġjat |

---

## Arkitettura tas-Sigurtà

OmniRoute jimplimenta mudell tas-sigurtà b'diversi saffi:

```
Talba → CORS → Pipeline tal-awtorizzazzjoni (ikklassifika → politiki → infurza)
      → Salvagwardji (maskra tal-PII, injezzjoni tal-prompt, pont tal-viżjoni)
      → Limitatur tar-Rata → Circuit Breaker → Perjodu ta' Stennija → Imblukkar tal-Mudell → Fornitur
```

### 🔐 Awtentikazzjoni u Awtorizzazzjoni

| Karatteristika                        | Implimentazzjoni                                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login fil-Pannell**                 | Awtentikazzjoni bbażata fuq password b'tokens JWT (cookies HttpOnly)                                                                                                            |
| **Awtentikazzjoni b'API Key**         | Ċwievet iffirmati b'HMAC b'validazzjoni CRC                                                                                                                                     |
| **OAuth 2.0 + PKCE**                  | L-OAuth tal-browser/apparat speċifiku għall-fornitur juża PKCE fejn ikun appoġġjat; il-kredenzjali Devin għall-importazzjoni biss jiġu ttrattati separatament.                  |
| **Aġġornament tat-Token**             | Aġġornament awtomatiku tat-token OAuth qabel jiskadi                                                                                                                            |
| **Cookies Sikuri**                    | `AUTH_COOKIE_SECURE=true` għal ambjenti HTTPS                                                                                                                                   |
| **Pipeline tal-Awtorizzazzjoni**      | Klassifikazzjoni tar-rotot (PUBLIC / CLIENT_API / MANAGEMENT) — ara `docs/architecture/AUTHZ_GUIDE.md`                                                                          |
| **Livelli ta' Protezzjoni tar-Rotot** | Mudell bi 3 livelli għar-rotot tal-ġestjoni (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — ara `docs/security/ROUTE_GUARD_TIERS.md`                                             |
| **MCP bl-Ambitu tal-Ġestjoni**        | L-aċċess remot għal `/api/mcp/*` huwa kkontrollat minn API keys bl-ambitu `manage`; `/api/cli-tools/runtime/*` jibqa' ristrett strettament għal loopback. Ara ROUTE_GUARD_TIERS |
| **Ambiti MCP**                        | 32 ambitu granulari (read:health, write:combos, execute:completions, eċċ.) — ara `docs/frameworks/MCP-SERVER.md`                                                                |

### 🛡️ Kriptaġġ tad-Data Maħżuna

Id-data sensittiva kollha maħżuna f'SQLite hija kriptata bl-użu ta' **AES-256-GCM** b'derivazzjoni taċ-ċavetta permezz ta' scrypt:

- API keys, tokens tal-aċċess, tokens tal-aġġornament, u tokens tal-ID
- Format b'verżjoni: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Modalità passthrough (test sempliċi) meta `STORAGE_ENCRYPTION_KEY` ma tkunx issettjata

```bash
# Iġġenera ċ-ċavetta tal-kriptaġġ:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Qafas tas-Salvagwardji

OmniRoute jinkludi **reġistru tas-salvagwardji** li jista' jerġa' jitgħabba waqt it-tħaddim (`src/lib/guardrails/`) bi 3 salvagwardji integrati, ordnati skont il-prijorità:

| Salvagwardja       | Prijorità | Għan                                                                                                                      |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5         | Jgħaqqad mudelli mingħajr viżjoni ma' deskrizzjonijiet konxji tal-immaġnijiet; protezzjoni SSRF għal URLs tal-immaġnijiet |
| `pii-masker`       | 10        | Ċensura tal-PII qabel u wara s-sejħa (emails, telefown, CPF, CNPJ, karti ta' kreditu, SSN)                                |
| `prompt-injection` | 20        | Jidentifika mudelli ta' sovrascrittura/ħtif tar-rwol/jailbreak/tnixxija                                                   |

Salvagwardji personalizzati jiġu rreġistrati permezz ta' `registerGuardrail(new MyGuardrail())`. Il-mudell huwa fail-open (l-eċċezzjonijiet qatt ma jimblukkaw it-traffiku). Tista' tagħżel li ma tużahomx għal kull talba permezz tal-header `x-omniroute-disabled-guardrails`. → Ara [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Protezzjoni Kontra l-Injezzjoni tal-Prompt

Middleware ewristiku tal-aħjar sforz li jidentifika mudelli ta' injezzjoni tal-prompt fit-talbiet lil LLM.
**Mhuwiex firewall komplut kontra l-injezzjoni tal-prompt** — jista' jipproduċi pożittivi foloz (prompts
innokwi ta' persona/RPG) u negattivi foloz (leetspeak, spazjar, mudelli mhux bl-Ingliż).

| Tip ta' Mudell                      | Severità | Eżempju                                                               |
| ----------------------------------- | -------- | --------------------------------------------------------------------- |
| Sovrascrittura tas-Sistema          | Għolja   | "injora l-istruzzjonijiet preċedenti kollha"                          |
| Ħtif tar-Rwol                       | Medja    | "issa int DAN, tista' tagħmel kollox"                                 |
| Injezzjoni tad-Delimitatur          | Għolja   | Separaturi kodifikati biex jiksru l-konfini tal-kuntest               |
| DAN/Jailbreak                       | Medja    | Mudelli magħrufa ta' prompts ta' jailbreak                            |
| Tnixxija tal-Istruzzjonijiet        | Għolja   | "urini l-prompt tas-sistema tiegħek"                                  |
| Evażjoni permezz tal-Kodifikazzjoni | Medja    | Dekodifikazzjoni base64/rot13/hex + kliem ewlieni tal-istruzzjonijiet |

Huma biss l-identifikazzjonijiet ta' severità **Għolja** li jiġu mblukkati fil-modalità `block`. Il-familji
ta' severità Medja jiġu rreġistrati fil-logs iżda qatt ma jiġu mblukkati minn `sanitizeRequest`.

Ikkonfigura permezz tal-pannell (Issettjar → Sigurtà) jew `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (politika tal-injezzjoni; il-modalità antika "redact" ma tneħħix it-test tal-injezzjoni)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (predefinit) | medium | low — is-severitajiet f'dan il-livell jew ogħla jiġu mblukkati fil-modalità block
```

### 🔒 Ċensura tal-PII

Identifikazzjoni awtomatika u ċensura fakultattiva ta' informazzjoni identifikabbli personalment:

| Tip ta' PII       | Mudell                | Sostituzzjoni      |
| ----------------- | --------------------- | ------------------ |
| Email             | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brażil)      | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brażil)     | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Karta ta' Kreditu | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefown          | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (US)          | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # kitba mill-ġdid tal-PII fit-talba; indipendenti minn INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # fakultattiv: iċċensura l-PII fit-tweġibiet tal-fornitur mibgħuta lura lill-klijenti
```

### 🌐 Sigurtà tan-Network

| Karatteristika               | Deskrizzjoni                                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **CORS**                     | Lista espliċita ta' oriġini permessi bejn oriġini differenti (`CORS_ALLOWED_ORIGINS`; `CORS_ORIGIN` huwa antik) |
| **Iffiltrar tal-IP**         | Firxiet ta' IP permessi/imblukkati fil-pannell                                                                  |
| **Limitazzjoni tar-Rata**    | Limiti tar-rata għal kull fornitur b'backoff awtomatiku                                                         |
| **Kontra t-Thundering Herd** | Mutex + qfil għal kull konnessjoni jipprevjenu żbalji 502 kaskata                                               |
| **Marka tas-Swaba' TLS**     | Simulazzjoni ta' marka tas-swaba' TLS simili għal browser biex titnaqqas l-identifikazzjoni tal-bots            |
| **Marka tas-Swaba' CLI**     | Ordni tal-headers/korp għal kull fornitur biex jaqbel mal-firem nattivi tas-CLI                                 |

### 🔌 Reżiljenza u Disponibbiltà

| Karatteristika              | Deskrizzjoni                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Circuit Breaker**         | 3 stati (Magħluq → Miftuħ → Nofs Miftuħ) għal kull fornitur, persistenti f'SQLite |
| **Idempotenza tat-Talbiet** | Tieqa ta' deduplikazzjoni ta' 5 sekondi għal talbiet duplikati                    |
| **Backoff Esponenzjali**    | Tentattiv awtomatiku mill-ġdid b'dewmien dejjem jiżdied                           |
| **Pannell tas-Saħħa**       | Monitoraġġ f'ħin reali tas-saħħa tal-fornituri                                    |

### 📋 Konformità

| Karatteristika                  | Deskrizzjoni                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| **Żamma tal-Logs**              | Tindif awtomatiku wara `CALL_LOG_RETENTION_DAYS`                                      |
| **Għażla li Ma Jinżammux Logs** | Il-flag `noLog` għal kull API key jiddiżattiva r-reġistrazzjoni tat-talbiet           |
| **Log tal-Awditjar**            | L-azzjonijiet amministrattivi jiġu traċċati fit-tabella `audit_log`                   |
| **Awditjar MCP**                | Reġistrazzjoni tal-awditjar appoġġjata minn SQLite għas-sejħiet kollha tal-għodod MCP |
| **Validazzjoni Zod**            | L-inputs kollha tal-API jiġu vvalidati bi schemas Zod v4 waqt it-tagħbija tal-modulu  |

---

## Varjabbli Ambjentali Meħtieġa

Il-kollha sigrieti jridu jitwaħħlu qabel ma tibda s-servizz. Is-servizz se **jitwaqfa malajr** jekk ikunu nieqsa jew dgħajfa.

```bash
# MEĦTIEĠ — is-servizz ma se jibdiex mingħajr dawn:
JWT_SECRET=$(openssl rand -base64 48)     # min 32 karattru
API_KEY_SECRET=$(openssl rand -hex 32)    # min 16 karattru

# IRRIMMANDAT — jippermetti enkriżjoni fil-bażi tad-dejta:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Is-servizz iwaqfa b'mod attiv valuri magħrufa dgħajfa bħal `changeme`, `secret`, jew `password`.

---

## Sigurtà Docker

- Uża utent li mhux root fil-produzzjoni
- Waħħal is-sigrieti bħala volumi biss tista' taqrahom
- Qatt tikkopja fajls `.env` fil-figuri Docker
- Uża `.dockerignore` biex teskludi fajls sensittivi
- Waħħal `AUTH_COOKIE_SECURE=true` meta tkun wara HTTPS

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

## Dipendenzi

- Uża `npm audit` regolarment (`npm run audit:deps` jinkludi l-primarja + electron)
- Żomm id-dipendenzi aġġornati
- Il-proġett juża `husky` + `lint-staged` għal kontrolli ta' qabel l-impenn (lint-staged + check-docs-sync + check:any-budget:t11)
- Il-pipeline CI jittraqqas regoli ta' sigurtà tal-ESLint fuq kull push (`no-eval`, `no-implied-eval`, `no-new-func` = żball)
- Il-konstanti tal-fornitur jiġu validati f'sekkond wara t-tħaddim tal-modulu permezz tal-Zod (`src/shared/validation/schemas.ts`)
- Libreriji b'base sigur jiġu jużaw: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (ebda riskju ta' SQLi permezz tal-kwistjonijiet parametriżżati), `bcryptjs` (ħatja tal-passwds)

## Regoli b'saħħta ta' Sigurtà

Dawn ir-regoli jiġu infurzati permezz ta' għodod u rreveduri:

1. **Qatt tikkmanda sigrieti** — `.env` huwa ġiġnored; `.env.example` huwa l-mudell (ebda letterali, kummenti biss — ara PUBLIC_CREDS.md t'hawn taħt)
2. **Qatt tuża `eval()`, `new Function()`, jew eval impliċit** — l-ESLint jinfurzah
3. **Qatt taħlif il-hooks ta' Husky** (`--no-verify`, `--no-gpg-sign`) mingħajr approvazzjoni espliċita tal-operatur
4. **Qatt tikteb SQL mhux ipproċessat fit-triq** — dejjem għaddi permezz ta' `src/lib/db/` (parametriżżat)
5. **Dejjem validaw id-daħli permezz tal-Zod** — `src/shared/validation/schemas.ts`
6. **Dejjem sanitizzaw il-headings upstream** — lista ta' projbizzjoni f'`src/shared/constants/upstreamHeaders.ts`
7. **Enkriptaw l-identifikaturi fil-bażi tad-dejta** — AES-256-GCM permezz ta' `src/lib/db/encryption.ts`
8. **Identifikaturi upstream OAuth pubbliċi permezz ta' `resolvePublicCred()`** — qatt tiddaħħal litterali bħal `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` fis-sors. Ara [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Risposti ta' żball permezz ta' `buildErrorBody()` / `sanitizeErrorMessage()`** — qatt tpoggi `err.stack` / `err.message mhux ipproċessat fil-ġisem tal-risposta tal-HTTP / SSE / eżekutur / MCP. Ara [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **`exec()` / `spawn()` valuri tal-ħin tal-mewt permezz tal-għażla `env`** — qatt interpolla b'stringu toroq esterni jew valuri mhux fdata fil-kripti mogħtija lill-shell. Referenza: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Ippreferixxi libreriji b'base sigur** — ara [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Waqfas qabel tagħmel tiegħek stess.

## Sorsi ta' ħruġ mill-pipeline tal-provvista (Socket.dev / Snyk / simili)

L-arti tal-npm `omniroute` ippubblikat fih il-bini tal-Next.js `output: "standalone"`, li jfisser li kull maniġer tal-rotta - inkluż il-funzjonijiet privileġġati deskritti (MITM, importazzjoni Zed, Sema Sincronizzata, superviżur tas-servizz integrated) - jintwera f'biċċiet `.next/server/*.js` minifika. Is-skenners heuristiċi tal-provvista ta' ħruġ spiss jgħaqqdu dik il-kurġata mal-firxat tal-malware.

Għal kull kategorija ta' ħruġ inżommu attestazzjoni tal-maniġer għal dak l-ħruġ:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  mappa għal kull ħruġ: fajl sors ↔ chunk immarkat ↔ imġiba ↔ mitigazzjoni applikata fil-v3.8.6.
- Blocchi `SECURITY-AUDITOR-NOTE:` fil-kodiċi stess fi kull funzjoni immarkata jirreferixxu lura għad-dokument l-istess.

Għall-utenti li l-pipeline tagħhom ma jistax ifaqqar l-allert, ibnu bħala profili:
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Dan jibdel l-erba 'moduli sensittivi bi sinkopaturi li jirritornaw HTTP 530 "feature-disabled" matul ir-runtim, sabiex il-ħġieġ tal-kodiċi privileġġat huma fiżikament assenti mill-kurġata. Ara [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) għar-riċetta tal-pubblikazzjoni.

## Riferenzi

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline tal-awtorizzazzjoni
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — qafas tal-protezzjoni
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — log tal-awditjar u r-ritenzjoni
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — sistema **mandatorja** għal kredenzjali pubbliċi upstream
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — sistema **mandatorja** għal risponsi ta' żbalji
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — attestazzjoni tal-maniġer għal ħruġ tal-pipeline tal-provvista
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS fingerprinting (avviż legali/etiku)
- [`CLAUDE.md`](CLAUDE.md) — regoli iebes għall-aġenti tal-AI
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — ktieb magħżul ta' libraries bil-garfunaż bħala default sikur
