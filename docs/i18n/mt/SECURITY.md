# Security Policy (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Rappurtar ta’ Vulnerabbiltajiet

Jekk tiskopri vulnerabbiltà tas-sigurtà f’OmniRoute, jekk jogħġbok irrapportaha b’mod responsabbli:

1. **TIFTAĦX** kwistjoni pubblika fuq GitHub
2. Uża [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Inkludi: deskrizzjoni, passi għar-riproduzzjoni, u l-impatt potenzjali

## Skeda ta’ Rispons

| Stadju                 | Mira                           |
| ---------------------- | ------------------------------ |
| Konferma tar-Riċevuta  | 48 siegħa                      |
| Trijaġġ u Valutazzjoni | 5 ijiem tax-xogħol             |
| Rilaxx tal-Garża       | 14-il jum tax-xogħol (kritika) |

## Verżjonijiet Appoġġjati

| Verżjoni | Status tal-Appoġġ                                     |
| -------- | ----------------------------------------------------- |
| 3.9.x    | 🗓️ Ippjanata — linja LTS (`stable/v3`), ara hawn taħt |
| 3.8.x    | ✅ Attiva                                             |
| 3.7.x    | ✅ Sigurtà                                            |
| < 3.7.0  | ❌ Mhux appoġġjata                                    |

## Perjodu ta’ appoġġ LTS (v3.9.x)

Wara 3.8.59 il-verżjoni li jmiss hija **3.9.0**, li tiftaħ il-linja ta’ appoġġ fit-tul fuq il-fergħa
`stable/v3` (ara [`ROADMAP.md`](ROADMAP.md) → "Fażi 3 — v3.9.0 LTS").

- **X’jirċievi `stable/v3`:** soluzzjonijiet għal bugs, garżi tas-sigurtà u aġġornamenti tal-fornituri. Karatteristiċi
  ġodda jmorru fil-kanal v4; il-linja LTS tagħti prijorità lill-istabbiltà. `npm install omniroute`
  (id-dist-tag `latest`) jibqa’ fuq v3 matul iċ-ċiklu kollu ta’ v4.
- **Tul tal-perjodu:** `<T-GAP-3: deċiżjoni tas-sid għadha pendenti — ara ROADMAP.md>`. It-tul
  tal-perjodu wara v4.0 GA (meta `latest` jaqleb għal v4) **għadu ma ġiex deċiż**; din
  it-taqsima tiġi aġġornata meta l-manutenzjonist iħabbru. Sa dakinhar, tassumix data tat-tmiem.
- **Rappurtar ta’ vulnerabbiltà fil-linja LTS:** l-istess kanal bħal għal kull verżjoni oħra —
  [GitHub Security Advisory](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) privat,
  u qatt kwistjoni pubblika. Għid liema verżjoni ttestjajt (pereżempju `3.9.2`); is-soluzzjonijiet jiddaħħlu f’
  `stable/v3` u jiġu portati ’l quddiem għal v4.
- **Linja bażi tas-sigurtà fil-punt tat-tnedija tal-LTS:** l-istat imkejjel tal-iskaner, il-provi tal-protezzjoni
  tar-rotot u tal-kredenzjali pubbliċi huma rreġistrati f’
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md).

---

## Arkitettura tas-Sigurtà

OmniRoute jimplimenta mudell tas-sigurtà b’diversi saffi:

```
Talba → CORS → Pipeline tal-Authz (ikklassifika → politiki → infurza)
      → Salvagwardji (maskar tal-PII, injezzjoni fil-prompt, pont tal-viżjoni)
      → Limitatur tar-Rata → Circuit Breaker → Perjodu ta’ Stennija → Imblukkar tal-Mudell → Fornitur
```

### 🔐 Awtentikazzjoni u Awtorizzazzjoni

| Karatteristika                        | Implimentazzjoni                                                                                                                                          |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Login tad-Dashboard**               | Awtentikazzjoni bbażata fuq password b’tokens JWT (cookies HttpOnly)                                                                                      |
| **Awtentikazzjoni b’API Key**         | Ċwievet iffirmati b’HMAC b’validazzjoni CRC                                                                                                               |
| **OAuth 2.0 + PKCE**                  | OAuth tal-browser/apparat speċifiku għall-fornitur juża PKCE fejn appoġġjat; il-kredenzjali ta’ Devin għall-importazzjoni biss jiġu ġestiti separatament. |
| **Tiġdid tat-Token**                  | Tiġdid awtomatiku tat-token OAuth qabel ma jiskadi                                                                                                        |
| **Cookies Siguri**                    | `AUTH_COOKIE_SECURE=true` għal ambjenti HTTPS                                                                                                             |
| **Pipeline tal-Authz**                | Klassifikazzjoni tar-rotot (PUBLIC / CLIENT_API / MANAGEMENT) — ara `docs/architecture/AUTHZ_GUIDE.md`                                                    |
| **Livelli tal-Protezzjoni tar-Rotot** | Mudell bi 3 livelli għar-rotot tal-ġestjoni (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — ara `docs/security/ROUTE_GUARD_TIERS.md`                       |
| **MCP b’Kamp ta’ Ġestjoni**           | Aċċess remot għal `/api/mcp/*` protett minn ċwievet API bil-kamp `manage`; `/api/cli-tools/runtime/*` jibqa’ strettament loopback. Ara ROUTE_GUARD_TIERS  |
| **Kampijiet tal-MCP**                 | 32 kamp granulari (read:health, write:combos, execute:completions, eċċ.) — ara `docs/frameworks/MCP-SERVER.md`                                            |

### 🛡️ Kriptaġġ tad-Data Maħżuna

Id-data sensittiva kollha maħżuna f’SQLite tiġi kriptata bl-użu ta’ **AES-256-GCM** b’derivazzjoni taċ-ċavetta scrypt:

- Ċwievet API, tokens tal-aċċess, tokens tat-tiġdid, u tokens tal-ID
- Format b’verżjonijiet: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Modalità passthrough (test sempliċi) meta `STORAGE_ENCRYPTION_KEY` ma tkunx issettjata

```bash
# Iġġenera ċavetta tal-kriptaġġ:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Qafas tas-Salvagwardji

OmniRoute jinkludi **reġistru tas-salvagwardji** li jista’ jerġa’ jitgħabba waqt it-tħaddim (`src/lib/guardrails/`) bi 3 salvagwardji integrati ordnati skont il-prijorità:

| Salvagwardja       | Prijorità | Għan                                                                                                                       |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5         | Jgħaqqad mudelli mingħajr viżjoni ma’ deskrizzjonijiet konxji tal-immaġnijiet; protezzjoni SSRF għall-URLs tal-immaġnijiet |
| `pii-masker`       | 10        | Redazzjoni tal-PII qabel u wara s-sejħa (emails, telefown, CPF, CNPJ, karti ta’ kreditu, SSN)                              |
| `prompt-injection` | 20        | Jidentifika mudelli ta’ override/ħtif tar-rwol/jailbreak/tnixxija                                                          |

Salvagwardji personalizzati jiġu rreġistrati permezz ta’ `registerGuardrail(new MyGuardrail())`. Il-mudell huwa fail-open (l-eċċezzjonijiet qatt ma jimblukkaw it-traffiku). Tneħħija fakultattiva għal kull talba permezz tal-header `x-omniroute-disabled-guardrails`. → Ara [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Protezzjoni Kontra l-Injezzjoni fil-Prompt

Middleware euristiku tal-aħjar sforz li jidentifika mudelli ta’ injezzjoni fil-prompt f’talbiet lil LLM.
**Mhuwiex firewall komplut kontra l-injezzjoni fil-prompt** — jista’ jipproduċi pożittivi foloz (prompts
beninni ta’ persona/RPG) u negattivi foloz (leetspeak, spazjar, mudelli mhux bl-Ingliż).

| Tip ta’ Mudell                      | Severità | Eżempju                                                               |
| ----------------------------------- | -------- | --------------------------------------------------------------------- |
| Qlib tas-Sistema                    | Għolja   | "injora l-istruzzjonijiet preċedenti kollha"                          |
| Ħtif tar-Rwol                       | Medja    | "issa int DAN, tista’ tagħmel kollox"                                 |
| Injezzjoni ta’ Delimitaturi         | Għolja   | Separaturi kkodifikati biex jiksru l-konfini tal-kuntest              |
| DAN/Jailbreak                       | Medja    | Mudelli magħrufa ta’ prompts ta’ jailbreak                            |
| Żvelar ta’ Istruzzjonijiet          | Għolja   | "urini l-prompt tas-sistema tiegħek"                                  |
| Evażjoni permezz tal-Kodifikazzjoni | Medja    | dekodifikazzjoni base64/rot13/hex + kliem ewlieni tal-istruzzjonijiet |

Huma biss l-identifikazzjonijiet b’severità **Għolja** li jiġu mblukkati fil-modalità `block`. Il-familji
b’severità medja jiġu rreġistrati iżda qatt ma jiġu mblukkati minn `sanitizeRequest`.

Ikkonfigura permezz tad-dashboard (Settings → Security) jew `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (politika tal-injezzjoni; il-modalità l-antika "redact" ma tneħħix it-test tal-injezzjoni)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (predefinit) | medium | low — is-severitajiet f’dan il-livell jew ogħla jiġu mblukkati fil-modalità block
```

### 🔒 Redazzjoni tal-PII

Identifikazzjoni awtomatika u redazzjoni fakultattiva ta’ informazzjoni personalment identifikabbli:

| Tip ta’ PII       | Mudell                | Sostituzzjoni      |
| ----------------- | --------------------- | ------------------ |
| Email             | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brażil)      | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brażil)     | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Karta ta’ Kreditu | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon           | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (US)          | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # jitlob kitba mill-ġdid tal-PII; indipendenti minn INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # fakultattiv: jirrediġi l-PII fit-tweġibiet tal-fornitur mibgħuta lura lill-klijenti
```

### 🌐 Sigurtà tan-Network

| Karatteristika               | Deskrizzjoni                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **CORS**                     | Lista espliċita ta’ oriġini permessi bejn oriġini differenti (`CORS_ALLOWED_ORIGINS`; `CORS_ORIGIN` antik) |
| **Iffiltrar tal-IP**         | Firxiet ta’ IP f’lista ta’ permessi/imblukkar fid-dashboard                                                |
| **Limitazzjoni tar-Rata**    | Limiti tar-rata għal kull fornitur b’backoff awtomatiku                                                    |
| **Kontra t-Thundering Herd** | Mutex + illokkjar għal kull konnessjoni jipprevjenu 502s kaskati                                           |
| **Marka tas-Swaba’ TLS**     | Simulazzjoni ta’ marka tas-swaba’ TLS bħal ta’ browser biex titnaqqas l-identifikazzjoni tal-bots          |
| **Marka tas-Swaba’ CLI**     | Ordinament tal-header/body għal kull fornitur biex jaqbel mal-firem nattivi tas-CLI                        |

### 🔌 Reżiljenza u Disponibbiltà

| Karatteristika              | Deskrizzjoni                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Circuit Breaker**         | 3 stati (Magħluq → Miftuħ → Nofs Miftuħ) għal kull fornitur, ippersistit f’SQLite |
| **Idempotenza tat-Talbiet** | Tieqa ta’ deduplikazzjoni ta’ 5 sekondi għal talbiet duplikati                    |
| **Backoff Esponenzjali**    | Tentattiv mill-ġdid awtomatiku b’dewmien dejjem jiżdied                           |
| **Dashboard tas-Saħħa**     | Monitoraġġ f’ħin reali tas-saħħa tal-fornituri                                    |

### 📋 Konformità

| Karatteristika          | Deskrizzjoni                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------- |
| **Żamma tar-Logs**      | Tindif awtomatiku wara `CALL_LOG_RETENTION_DAYS`                                   |
| **Għażla ta’ Ebda Log** | Il-flag `noLog` għal kull API key jiddiżattiva r-reġistrazzjoni tat-talbiet        |
| **Log tal-Awditjar**    | L-azzjonijiet amministrattivi jiġu ttraċċati fit-tabella `audit_log`               |
| **Awditjar MCP**        | Reġistrazzjoni tal-awditjar ibbażata fuq SQLite għas-sejħiet kollha tal-għodod MCP |
| **Validazzjoni Zod**    | L-inputs kollha tal-API jiġu vvalidati bi skemi Zod v4 waqt it-tagħbija tal-modulu |

---

## Varjabbli tal-Ambjent Meħtieġa

Is-sigrieti kollha jridu jiġu ssettjati qabel ma jinbeda s-server. Is-server **jieqaf minnufih** jekk ikunu neqsin jew dgħajfa.

```bash
# MEĦTIEĠA — is-server mhux se jibda mingħajr dawn:
JWT_SECRET=$(openssl rand -base64 48)     # minimu ta' 32 karattru
API_KEY_SECRET=$(openssl rand -hex 32)    # minimu ta' 16-il karattru

# RAKKOMANDATA — tippermetti l-kriptaġġ tad-data maħżuna:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Is-server jirrifjuta b'mod attiv valuri magħrufa bħala dgħajfa bħal `changeme`, `secret`, jew `password`.

---

## Sigurtà ta' Docker

- Uża utent mhux root fil-produzzjoni
- Immonta s-sigrieti bħala volumi li jinqraw biss
- Qatt tikkopja fajls `.env` f'immaġnijiet Docker
- Uża `.dockerignore` biex teskludi fajls sensittivi
- Issettja `AUTH_COOKIE_SECURE=true` meta tkun wara HTTPS

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

- Ħaddem `npm audit` regolarment (`npm run audit:deps` ikopri main + electron)
- Żomm id-dipendenzi aġġornati
- Il-proġett juża `husky` + `lint-staged` għall-kontrolli ta' qabel il-commit (lint-staged + check-docs-sync + check:any-budget:t11)
- Il-pipeline tas-CI jħaddem ir-regoli tas-sigurtà ta' ESLint ma' kull push (`no-eval`, `no-implied-eval`, `no-new-func` = żball)
- Il-kostanti tal-fornituri jiġu vvalidati waqt it-tagħbija tal-modulu permezz ta' Zod (`src/shared/validation/schemas.ts`)
- Jintużaw libreriji siguri b'mod predefinit: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (ebda riskju ta' SQLi permezz ta' queries parametrizzati), `bcryptjs` (hashing tal-passwords)

## Regoli Stretti tas-Sigurtà

Dawn ir-regoli jiġu infurzati mill-għodod u mir-reviżuri:

1. **Qatt tagħmel commit ta' sigrieti** — `.env` huwa injorat minn git; `.env.example` huwa l-mudell (mingħajr valuri letterali, kummenti biss — ara PUBLIC_CREDS.md hawn taħt)
2. **Qatt tuża `eval()`, `new Function()`, jew eval impliċitu** — ESLint jinforza dan
3. **Qatt taqbeż il-hooks ta' Husky** (`--no-verify`, `--no-gpg-sign`) mingħajr approvazzjoni espliċita tal-operatur
4. **Qatt tikteb SQL mhux ipproċessat fir-routes** — dejjem għaddi minn `src/lib/db/` (parametrizzat)
5. **Dejjem ivvalida l-inputs b'Zod** — `src/shared/validation/schemas.ts`
6. **Dejjem issanitizza l-headers upstream** — lista ta' projbizzjonijiet f'`src/shared/constants/upstreamHeaders.ts`
7. **Ikkodifika l-kredenzjali maħżuna** — AES-256-GCM permezz ta' `src/lib/db/encryption.ts`
8. **Identifikaturi OAuth upstream pubbliċi permezz ta' `resolvePublicCred()`** — qatt tinkorpora valuri letterali `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` fil-kodiċi sors. Ara [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Risponsi ta' żball permezz ta' `buildErrorBody()` / `sanitizeErrorMessage()`** — qatt tpoġġi `err.stack` / `err.message` mhux ipproċessati fil-korpi tar-risponsi HTTP / SSE / executor / MCP. Ara [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Valuri waqt l-eżekuzzjoni ta' `exec()` / `spawn()` permezz tal-għażla `env`** — qatt tagħmel interpolazzjoni ta' strings ta' paths esterni jew valuri mhux fdati fi skripts mgħoddija lis-shell. Referenza: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Ippreferi libreriji siguri b'mod predefinit** — ara [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Użahom qabel ma tibni soluzzjoni tiegħek stess.

## Sejbiet tal-iskener tal-katina tal-provvista (Socket.dev / Snyk / simili)

> **Nota dwar l-ambitu:** `socket.yml` fl-għerq tar-repożitorju jikkonfigura biss `projectIgnorePaths` għall-iskan ta’ wara l-pubblikazzjoni fuq in-naħa tar-reġistru ta’ Socket.dev tal-artefatt npm ippubblikat — mhuwiex kontroll obbligatorju għall-inkorporazzjoni f’CI/PR. L-ebda fluss tax-xogħol f’`.github/workflows`, l-ebda script ta’ `package.json`, u l-ebda mira ta’ `Makefile` ma jinvokaw Socket.dev.

L-artefatt npm `omniroute` ippubblikat jiġbor fih il-build ta’ Next.js `output: "standalone"`, li jfisser li kull handler tar-rotta — inklużi l-karatteristiċi privileġġati ddokumentati (MITM, importazzjoni minn Zed, Cloud Sync, superviżur tas-servizz inkorporat) — jispiċċa f’biċċiet imminifikati `.next/server/*.js`. L-iskaners euristiċi tal-katina tal-provvista spiss iqabblu l-mudelli ta’ dawk il-biċċiet ma’ firem ta’ malware.

Il-konfigurazzjoni tal-iskener li nużaw tinsab f’[`socket.yml`](socket.yml) fl-għerq tar-repożitorju (format v2 tal-App ta’ Socket.dev għal GitHub — ara
<https://docs.socket.dev/docs/socket-yml>). Teskludi b’mod espliċitu
direttorji li ma jiġux distribwiti (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/`, eċċ.) sabiex l-iskener jirrapporta biss dwar mogħdijiet tal-kodiċi li
tabilħaqq jaslu għand l-utenti tal-verżjoni ppubblikata — l-iskan innifsu jitmexxa mill-App ta’
Socket.dev għal GitHub li taqra dak il-fajl, mhux minn fluss tax-xogħol f’dan ir-repożitorju.

Għal kull kategorija ta’ sejba nżommu attestazzjoni mill-manutentur għal kull sejba:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  mappa għal kull sejba: fajl tas-sors ↔ biċċa mmarkata ↔ imġiba ↔ mitigazzjoni
  applikata f’v3.8.6.
- Blokki `SECURITY-AUDITOR-NOTE:` fis-sors f’kull punt ta’ funzjoni mmarkata
  jirreferu lura għall-istess dokument.

Għall-utenti li l-pipeline tagħhom ma jistax inaqqas ir-restrizzjoni tat-twissija: ibnu b’
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Dan jissostitwixxi l-erba’
moduli sensittivi bi stubs li jirritornaw HTTP 503 `feature-disabled` waqt
l-eżekuzzjoni, sabiex il-mogħdijiet tal-kodiċi privileġġati jkunu fiżikament assenti mill-pakkett.
Ara [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
għar-riċetta tal-pubblikazzjoni.

## Referenzi

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline tal-awtorizzazzjoni
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — qafas tal-miżuri ta’ protezzjoni
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — reġistru tal-awditjar u ż-żamma
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — mudell **obbligatorju** għall-kredenzjali pubbliċi tas-servizzi upstream
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — mudell **obbligatorju** għat-tweġibiet ta’ żball
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — attestazzjoni mill-manutentur għas-sejbiet tal-iskener tal-katina tal-provvista
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — teħid tal-marki tas-swaba’ TLS (avviż legali/etiku)
- [`CLAUDE.md`](CLAUDE.md) — regoli stretti għall-aġenti tal-IA
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — libreriji magħżula u siguri b’mod predefinit
