# Security Policy (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Ziņošana par ievainojamībām

Ja atklājat drošības ievainojamību OmniRoute, lūdzu, ziņojiet par to atbildīgi:

1. **NEIZVEIDOJIET** publisku GitHub issue
2. Izmantojiet [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Iekļaujiet: aprakstu, reproducēšanas darbības un iespējamo ietekmi

## Atbildes termiņi

| Posms                      | Mērķis                                |
| -------------------------- | ------------------------------------- |
| Apstiprinājums             | 48 stundas                            |
| Izskatīšana un novērtēšana | 5 darba dienas                        |
| Labojuma laidiens          | 14 darba dienas (kritiskām problēmām) |

## Atbalstītās versijas

| Versija | Atbalsta statuss     |
| ------- | -------------------- |
| 3.8.x   | ✅ Aktīva            |
| 3.7.x   | ✅ Drošības atbalsts |
| < 3.7.0 | ❌ Nav atbalstīta    |

---

## Drošības arhitektūra

OmniRoute izmanto daudzslāņu drošības modeli:

```
Pieprasījums → CORS → Autorizācijas konveijers (klasificēšana → politikas → izpilde)
       → Aizsargmehānismi (PII maskētājs, uzvedņu injekcijas, redzes tilts)
       → Ātruma ierobežotājs → Ķēdes pārtraucējs → Atdzišanas periods → Modeļa bloķēšana → Nodrošinātājs
```

### 🔐 Autentifikācija un autorizācija

| Funkcija                             | Implementācija                                                                                                                                                                           |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Informācijas paneļa pieteikšanās** | Uz paroli balstīta autentifikācija ar JWT marķieriem (HttpOnly sīkfaili)                                                                                                                 |
| **API atslēgas autentifikācija**     | Ar HMAC parakstītas atslēgas ar CRC validāciju                                                                                                                                           |
| **OAuth 2.0 + PKCE**                 | Konkrētam nodrošinātājam paredzētais pārlūkprogrammas/ierīces OAuth izmanto PKCE, ja tas tiek atbalstīts; tikai importējamie Devin akreditācijas dati tiek apstrādāti atsevišķi.         |
| **Marķiera atjaunošana**             | Automātiska OAuth marķiera atjaunošana pirms derīguma termiņa beigām                                                                                                                     |
| **Drošie sīkfaili**                  | `AUTH_COOKIE_SECURE=true` HTTPS vidēm                                                                                                                                                    |
| **Autorizācijas konveijers**         | Maršruta klasificēšana (PUBLIC / CLIENT_API / MANAGEMENT) — skatiet `docs/architecture/AUTHZ_GUIDE.md`                                                                                   |
| **Maršruta aizsardzības līmeņi**     | Trīs līmeņu modelis pārvaldības maršrutiem (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — skatiet `docs/security/ROUTE_GUARD_TIERS.md`                                                   |
| **Manage-scope MCP**                 | Attālināta piekļuve `/api/mcp/*` tiek kontrolēta ar API atslēgām, kurām ir `manage` tvērums; `/api/cli-tools/runtime/*` paliek stingri ierobežota ar loopback. Skatiet ROUTE_GUARD_TIERS |
| **MCP tvērumi**                      | 32 detalizēti tvērumi (read:health, write:combos, execute:completions u. c.) — skatiet `docs/frameworks/MCP-SERVER.md`                                                                   |

### 🛡️ Šifrēšana miera stāvoklī

Visi SQLite saglabātie sensitīvie dati tiek šifrēti, izmantojot **AES-256-GCM** ar scrypt atslēgas atvasināšanu:

- API atslēgas, piekļuves marķieri, atsvaidzināšanas marķieri un ID marķieri
- Versijots formāts: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Caurlaides režīms (vienkāršs teksts), ja `STORAGE_ENCRYPTION_KEY` nav iestatīts

```bash
# Ģenerēt šifrēšanas atslēgu:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Aizsargmehānismu ietvars

OmniRoute komplektācijā ir iekļauts dinamiski pārlādējams **aizsargmehānismu reģistrs** (`src/lib/guardrails/`) ar 3 iebūvētiem aizsargmehānismiem, kas sakārtoti pēc prioritātes:

| Aizsargmehānisms   | Prioritāte | Mērķis                                                                                              |
| ------------------ | ---------- | --------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5          | Nodrošina ar attēliem saistītus aprakstus modeļiem bez redzes atbalsta; SSRF aizsardzība attēlu URL |
| `pii-masker`       | 10         | PII noņemšana pirms un pēc izsaukuma (e-pasti, tālruņa numuri, CPF, CNPJ, kredītkartes, SSN)        |
| `prompt-injection` | 20         | Nosaka ignorēšanas, lomas pārņemšanas, jailbreak un noplūdes modeļus                                |

Pielāgoti aizsargmehānismi tiek reģistrēti, izmantojot `registerGuardrail(new MyGuardrail())`. Modelis darbojas pēc principa fail-open (izņēmumi nekad nebloķē datplūsmu). Atteikšanās no aizsargmehānismiem katram pieprasījumam atsevišķi, izmantojot `x-omniroute-disabled-guardrails` galveni. → Skatiet [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Uzvedņu injekciju aizsargs

Heiristisks starpprogrammatūras risinājums ar labāko iespējamo efektivitāti, kas nosaka uzvedņu injekciju modeļus LLM pieprasījumos.  
**Tas nav pilnīgs uzvedņu injekciju ugunsmūris** — var rasties kļūdaini pozitīvi rezultāti (nekaitīgas
personas/RPG uzvednes) un kļūdaini negatīvi rezultāti (leetspeak, atstarpes, modeļi citās valodās).

| Modeļa tips          | Nopietnība | Piemērs                                              |
| -------------------- | ---------- | ---------------------------------------------------- |
| Sistēmas ignorēšana  | Augsta     | "ignore all previous instructions"                   |
| Lomas pārņemšana     | Vidēja     | "you are now DAN, you can do anything"               |
| Atdalītāja injekcija | Augsta     | Kodēti atdalītāji konteksta robežu pārraušanai       |
| DAN/Jailbreak        | Vidēja     | Zināmi jailbreak uzvedņu modeļi                      |
| Norādījumu noplūde   | Augsta     | "show me your system prompt"                         |
| Kodējuma apiešana    | Vidēja     | base64/rot13/hex dekodēšana + norādījumu atslēgvārdi |

Tikai **Augstas** nopietnības noteikšanas gadījumi tiek bloķēti `block` režīmā. Vidējas nopietnības
grupas tiek reģistrētas, taču `sanitizeRequest` tās nekad nebloķē.

Konfigurējiet, izmantojot informācijas paneli (Settings → Security) vai `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (injekciju politika; mantotais "redact" režīms nenoņem injekcijas tekstu)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (noklusējums) | medium | low — nopietnības līmeņi, sākot ar norādīto, tiek bloķēti block režīmā
```

### 🔒 PII noņemšana

Automātiska personu identificējošas informācijas noteikšana un, pēc izvēles, noņemšana:

| PII tips         | Modelis               | Aizvietojums       |
| ---------------- | --------------------- | ------------------ |
| E-pasts          | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazīlija)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazīlija) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kredītkarte      | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Tālruņa numurs   | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (ASV)        | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # pieprasīt PII pārrakstīšanu; neatkarīgi no INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # pēc izvēles: noņemt PII no klientiem atgrieztajām nodrošinātāju atbildēm
```

### 🌐 Tīkla drošība

| Funkcija                                 | Apraksts                                                                                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **CORS**                                 | Skaidri definēts starpizcelsmju atļauto saraksts (`CORS_ALLOWED_ORIGINS`; mantotais `CORS_ORIGIN`) |
| **IP filtrēšana**                        | IP diapazonu atļauto/bloķēto saraksts informācijas panelī                                          |
| **Ātruma ierobežošana**                  | Ātruma ierobežojumi katram nodrošinātājam ar automātisku atkāpšanos                                |
| **Pret vienlaicīgu pieprasījumu lavīnu** | Mutekss + savienojumu bloķēšana novērš kaskādveida 502 kļūdas                                      |
| **TLS pirkstu nospiedums**               | Pārlūkprogrammai līdzīga TLS pirkstu nospieduma viltošana, lai mazinātu robotu noteikšanu          |
| **CLI pirkstu nospiedums**               | Galveņu/satura secība katram nodrošinātājam, lai atbilstu sākotnējā CLI parakstiem                 |

### 🔌 Noturība un pieejamība

| Funkcija                           | Apraksts                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| **Ķēdes pārtraucējs**              | Trīs stāvokļi (Closed → Open → Half-Open) katram nodrošinātājam, saglabāti SQLite |
| **Pieprasījumu idempotence**       | 5 sekunžu deduplikācijas logs dublētiem pieprasījumiem                            |
| **Eksponenciāla atkāpšanās**       | Automātiska atkārtota mēģināšana ar pieaugošām aizturēm                           |
| **Veselības informācijas panelis** | Nodrošinātāju veselības uzraudzība reāllaikā                                      |

### 📋 Atbilstība

| Funkcija                        | Apraksts                                                               |
| ------------------------------- | ---------------------------------------------------------------------- |
| **Žurnālu saglabāšana**         | Automātiska tīrīšana pēc `CALL_LOG_RETENTION_DAYS`                     |
| **Atteikšanās no žurnalēšanas** | Katrai API atslēgai `noLog` karodziņš atspējo pieprasījumu žurnalēšanu |
| **Audita žurnāls**              | Administratīvās darbības tiek izsekotas `audit_log` tabulā             |
| **MCP audits**                  | Uz SQLite balstīta audita žurnalēšana visiem MCP rīku izsaukumiem      |
| **Zod validācija**              | Visas API ievades tiek validētas ar Zod v4 shēmām moduļa ielādes laikā |

---

## Obligātie vides mainīgie

Visiem noslēpumiem jābūt iestatītiem pirms servera palaišanas. Ja to trūkst vai tie ir vāji, serveris **nekavējoties pārtrauks darbu**.

```bash
# OBLIGĀTI — serveris bez tiem netiks palaists:
JWT_SECRET=$(openssl rand -base64 48)     # vismaz 32 rakstzīmes
API_KEY_SECRET=$(openssl rand -hex 32)    # vismaz 16 rakstzīmes

# IETEICAMS — iespējo šifrēšanu miera stāvoklī:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Serveris aktīvi noraida zināmas vājas vērtības, piemēram, `changeme`, `secret` vai `password`.

---

## Docker drošība

- Ražošanas vidē izmantojiet lietotāju, kas nav root lietotājs
- Pievienojiet noslēpumus kā tikai lasāmus sējumus
- Nekad nekopējiet `.env` failus Docker attēlos
- Izmantojiet `.dockerignore`, lai izslēgtu sensitīvus failus
- Iestatiet `AUTH_COOKIE_SECURE=true`, ja serveris darbojas aiz HTTPS

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

## Atkarības

- Regulāri palaidiet `npm audit` (`npm run audit:deps` pārbauda galveno projektu + electron)
- Uzturiet atkarības atjauninātas
- Projekts priekšpiegādes pārbaudēm izmanto `husky` + `lint-staged` (lint-staged + check-docs-sync + check:any-budget:t11)
- CI konveijers katrā nosūtīšanā palaiž ESLint drošības noteikumus (`no-eval`, `no-implied-eval`, `no-new-func` = error)
- Provider konstantes tiek validētas moduļa ielādes laikā, izmantojot Zod (`src/shared/validation/schemas.ts`)
- Pēc noklusējuma drošas bibliotēkas: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (nav SQLi riska, jo tiek izmantoti parametrizēti vaicājumi), `bcryptjs` (paroļu jaukšana)

## Stingrie drošības noteikumi

Šos noteikumus ievieš rīki un pārbaudītāji:

1. **Nekad neiekļaujiet noslēpumus repozitorijā** — `.env` ir izslēgts no git; `.env.example` ir veidne (bez literālām vērtībām, tikai komentāri — skatiet tālāk PUBLIC_CREDS.md)
2. **Nekad neizmantojiet `eval()`, `new Function()` vai netiešu eval** — to ievēro ESLint
3. **Nekad neapejiet Husky āķus** (`--no-verify`, `--no-gpg-sign`) bez skaidra operatora apstiprinājuma
4. **Nekad nerakstiet neapstrādātu SQL maršrutos** — vienmēr izmantojiet `src/lib/db/` (parametrizētu)
5. **Vienmēr validējiet ievades datus ar Zod** — `src/shared/validation/schemas.ts`
6. **Vienmēr sanitizējiet augšupējās sistēmas galvenes** — aizliegto vērtību saraksts failā `src/shared/constants/upstreamHeaders.ts`
7. **Šifrējiet akreditācijas datus miera stāvoklī** — AES-256-GCM, izmantojot `src/lib/db/encryption.ts`
8. **Publiskos augšupējās OAuth identifikatorus iegūstiet, izmantojot `resolvePublicCred()`** — nekad neieguliet avota kodā literālas vērtības `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Skatiet [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Kļūdu atbildes veidojiet, izmantojot `buildErrorBody()` / `sanitizeErrorMessage()`** — nekad neievietojiet neapstrādātu `err.stack` / `err.message` HTTP / SSE / executor / MCP atbilžu pamattekstā. Skatiet [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **`exec()` / `spawn()` izpildlaika vērtības nododiet, izmantojot `env` opciju** — nekad neievietojiet ārējus ceļus vai neuzticamas vērtības čaulas skriptos, izmantojot virkņu interpolāciju. Atsauce: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Dodiet priekšroku pēc noklusējuma drošām bibliotēkām** — skatiet [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Izmantojiet tās, pirms izstrādāt pašiem savu risinājumu.

## Piegādes ķēdes skenera atradumi (Socket.dev / Snyk / līdzīgi rīki)

Publicētais `omniroute` npm artefakts ietver Next.js `output: "standalone"`
būvējumu, kas nozīmē, ka katrs maršruta apstrādātājs — tostarp dokumentētās
priviliģētās funkcijas (MITM, Zed importēšana, Cloud Sync, iegultais pakalpojumu
uzraugs) — nonāk `.next/server/*.js` minimizētajos gabalos. Heiristiskie
piegādes ķēdes skeneri bieži salīdzina šos gabalus ar ļaunprogrammatūras
parakstiem.

Katrai atraduma kategorijai mēs uzturam atsevišķu uzturētāja apliecinājumu:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  katra atraduma kartējums: avota fails ↔ atzīmētais gabals ↔ darbība ↔
  mazināšanas pasākums, kas piemērots v3.8.6.
- Avota kodā `SECURITY-AUDITOR-NOTE:` bloki pie katra atzīmētās funkcijas punkta
  norāda uz to pašu dokumentu.

Lietotājiem, kuru konveijers nevar atslābināt brīdinājumu, jābūvē ar
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Tādējādi četri sensitīvie
moduļi tiek aizstāti ar stublājiem, kas izpildes laikā atgriež HTTP 503
`feature-disabled`, tādēļ priviliģētie koda ceļi fiziski nepastāv komplektā.
Publicēšanas recepti skatiet [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md).

## Atsauces

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — autorizācijas konveijers
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — drošības ierobežojumu ietvars
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — audita žurnāls un glabāšana
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — **obligātais** modelis publiskiem augšupējo sistēmu akreditācijas datiem
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — **obligātais** modelis kļūdu atbildēm
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — uzturētāja apliecinājums par piegādes ķēdes skenera atradumiem
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — ķēdes pārtraucējs + atdzišanas periods + bloķēšana
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS pirkstu nospiedumu veidošana (juridisks/ētisks paziņojums)
- [`CLAUDE.md`](CLAUDE.md) — stingrie noteikumi MI aģentiem
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — atlasītas bibliotēkas ar drošiem noklusējuma iestatījumiem
