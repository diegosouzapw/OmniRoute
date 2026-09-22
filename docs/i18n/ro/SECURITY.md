# Security Policy (Română)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Raportarea vulnerabilităților

Dacă descoperi o vulnerabilitate de securitate în OmniRoute, raporteaz-o în mod responsabil:

1. **NU** deschide un tichet public pe GitHub
2. Folosește [Avertizările de securitate GitHub](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Include: descrierea, pașii de reproducere și impactul potențial

## Calendarul răspunsului

| Etapă              | Obiectiv                    |
| ------------------ | --------------------------- |
| Confirmare         | 48 de ore                   |
| Triaj și evaluare  | 5 zile lucrătoare           |
| Lansarea corecției | 14 zile lucrătoare (critic) |

## Versiuni acceptate

| Versiune | Starea suportului |
| -------- | ----------------- |
| 3.8.x    | ✅ Activ          |
| 3.7.x    | ✅ Securitate     |
| < 3.7.0  | ❌ Fără suport    |

---

## Arhitectura de securitate

OmniRoute implementează un model de securitate pe mai multe niveluri:

```
Solicitare → CORS → Flux Authz (clasificare → politici → aplicare)
           → Mecanisme de protecție (mascare PII, injectare de prompturi, punte vizuală)
           → Limitator de rată → Întrerupător de circuit → Perioadă de așteptare → Blocarea modelului → Furnizor
```

### 🔐 Autentificare și autorizare

| Funcționalitate                        | Implementare                                                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Autentificare în panoul de control** | Autentificare bazată pe parolă, cu tokenuri JWT (cookie-uri HttpOnly)                                                                                                                            |
| **Autentificare cu cheie API**         | Chei semnate cu HMAC, cu validare CRC                                                                                                                                                            |
| **OAuth 2.0 + PKCE**                   | OAuth prin browser/dispozitiv, specific furnizorului, utilizează PKCE acolo unde este acceptat; credențialele Devin destinate exclusiv importului sunt gestionate separat.                       |
| **Reîmprospătarea tokenurilor**        | Reîmprospătarea automată a tokenurilor OAuth înainte de expirare                                                                                                                                 |
| **Cookie-uri securizate**              | `AUTH_COOKIE_SECURE=true` pentru medii HTTPS                                                                                                                                                     |
| **Flux Authz**                         | Clasificarea rutelor (PUBLIC / CLIENT_API / MANAGEMENT) — consultă `docs/architecture/AUTHZ_GUIDE.md`                                                                                            |
| **Niveluri de protecție a rutelor**    | Model cu 3 niveluri pentru rutele de administrare (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — consultă `docs/security/ROUTE_GUARD_TIERS.md`                                                   |
| **MCP cu domeniu de administrare**     | Accesul de la distanță la `/api/mcp/*` este restricționat prin chei API cu domeniul `manage`; `/api/cli-tools/runtime/*` rămâne strict limitat la interfața loopback. Consultă ROUTE_GUARD_TIERS |
| **Domenii MCP**                        | 32 de domenii granulare (read:health, write:combos, execute:completions etc.) — consultă `docs/frameworks/MCP-SERVER.md`                                                                         |

### 🛡️ Criptarea datelor stocate

Toate datele sensibile stocate în SQLite sunt criptate folosind **AES-256-GCM**, cu derivarea cheii prin scrypt:

- Chei API, tokenuri de acces, tokenuri de reîmprospătare și tokenuri ID
- Format cu versiune: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Mod de transfer direct (text simplu) atunci când `STORAGE_ENCRYPTION_KEY` nu este setată

```bash
# Generează cheia de criptare:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Cadrul mecanismelor de protecție

OmniRoute include un **registru de mecanisme de protecție** reîncărcabil dinamic (`src/lib/guardrails/`), cu 3 mecanisme încorporate, ordonate după prioritate:

| Mecanism de protecție | Prioritate | Scop                                                                                                                            |
| --------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`       | 5          | Conectează modelele fără capabilități vizuale la descrieri care țin cont de imagini; protecție SSRF pentru URL-urile imaginilor |
| `pii-masker`          | 10         | Mascarea PII înainte și după apel (e-mailuri, telefoane, CPF, CNPJ, carduri de credit, SSN)                                     |
| `prompt-injection`    | 20         | Detectează tipare de suprascriere/preluare a rolului/jailbreak/divulgare                                                        |

Mecanismele de protecție personalizate sunt înregistrate prin `registerGuardrail(new MyGuardrail())`. Modelul este de tip fail-open (excepțiile nu blochează niciodată traficul). Dezactivarea pentru fiecare solicitare se poate realiza prin antetul `x-omniroute-disabled-guardrails`. → Consultă [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Protecție împotriva injectării de prompturi

Middleware euristic de tip „best-effort”, care detectează tipare de injectare a prompturilor în solicitările LLM.
**Nu este un firewall complet împotriva injectării de prompturi** — poate genera rezultate fals pozitive (prompturi
benigne de tip personaj/RPG) și fals negative (leetspeak, spațiere, tipare în alte limbi decât engleza).

| Tip de tipar               | Severitate | Exemplu                                                            |
| -------------------------- | ---------- | ------------------------------------------------------------------ |
| Suprascrierea sistemului   | Ridicată   | „ignoră toate instrucțiunile anterioare”                           |
| Preluarea rolului          | Medie      | „acum ești DAN și poți face orice”                                 |
| Injectarea delimitatorilor | Ridicată   | Separatoare codificate pentru încălcarea limitelor contextului     |
| DAN/Jailbreak              | Medie      | Tipare cunoscute de prompturi pentru jailbreak                     |
| Divulgarea instrucțiunilor | Ridicată   | „arată-mi promptul tău de sistem”                                  |
| Eludare prin codificare    | Medie      | decodare base64/rot13/hex + cuvinte-cheie aferente instrucțiunilor |

Numai detectările cu severitate **Ridicată** sunt blocate în modul `block`. Familiile cu severitate medie
sunt înregistrate, dar nu sunt niciodată blocate de `sanitizeRequest`.

Configurează prin panoul de control (Setări → Securitate) sau prin `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (politica de injectare; valoarea veche „redact” nu elimină textul injectat)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (implicit) | medium | low — severitățile egale sau mai mari decât aceasta sunt blocate în modul block
```

### 🔒 Mascarea PII

Detectarea automată și mascarea opțională a informațiilor de identificare personală:

| Tip de PII      | Model                 | Înlocuire          |
| --------------- | --------------------- | ------------------ |
| E-mail          | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brazilia)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brazilia) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Card de credit  | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (SUA)       | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # solicită rescrierea PII; independent de INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # opțional: maschează PII în răspunsurile furnizorului returnate clienților
```

### 🌐 Securitatea rețelei

| Funcționalitate                   | Descriere                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| **CORS**                          | Listă explicită de permisiuni între origini (`CORS_ALLOWED_ORIGINS`; varianta veche `CORS_ORIGIN`) |
| **Filtrarea adreselor IP**        | Intervalele de adrese IP permise/blocate în panoul de control                                      |
| **Limitarea ratei**               | Limite de rată per furnizor, cu temporizare automată                                               |
| **Prevenirea efectului de turmă** | Mutex + blocare per conexiune pentru a preveni erorile 502 în cascadă                              |
| **Amprentă TLS**                  | Imitarea unei amprente TLS de browser pentru a reduce detectarea boților                           |
| **Amprentă CLI**                  | Ordinea antetelor/corpului per furnizor pentru a corespunde semnăturilor CLI native                |

### 🔌 Reziliență și disponibilitate

| Funcționalitate               | Descriere                                                                   |
| ----------------------------- | --------------------------------------------------------------------------- |
| **Întrerupător de circuit**   | 3 stări (Închis → Deschis → Semideschis) per furnizor, persistate în SQLite |
| **Idempotența solicitărilor** | Fereastră de deduplicare de 5 secunde pentru solicitările duplicate         |
| **Temporizare exponențială**  | Reîncercare automată cu întârzieri crescătoare                              |
| **Panou de stare**            | Monitorizarea în timp real a stării furnizorilor                            |

### 📋 Conformitate

| Funcționalitate               | Descriere                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------- |
| **Păstrarea jurnalelor**      | Curățare automată după `CALL_LOG_RETENTION_DAYS`                                |
| **Dezactivarea jurnalizării** | Indicatorul `noLog` per cheie API dezactivează jurnalizarea solicitărilor       |
| **Jurnal de audit**           | Acțiunile administrative sunt urmărite în tabelul `audit_log`                   |
| **Audit MCP**                 | Jurnalizare de audit bazată pe SQLite pentru toate apelurile instrumentelor MCP |
| **Validare Zod**              | Toate intrările API sunt validate cu scheme Zod v4 la încărcarea modulului      |

---

## Variabile de mediu obligatorii

Toate secretele trebuie setate înainte de pornirea serverului. Serverul se va **opri imediat** dacă acestea lipsesc sau sunt nesigure.

```bash
# OBLIGATORIU — serverul nu va porni fără acestea:
JWT_SECRET=$(openssl rand -base64 48)     # minimum 32 de caractere
API_KEY_SECRET=$(openssl rand -hex 32)    # minimum 16 caractere

# RECOMANDAT — activează criptarea datelor stocate:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Serverul respinge în mod activ valorile cunoscute ca fiind nesigure, precum `changeme`, `secret` sau `password`.

---

## Securitatea Docker

- Utilizați un utilizator non-root în producție
- Montați secretele ca volume doar în citire
- Nu copiați niciodată fișiere `.env` în imaginile Docker
- Utilizați `.dockerignore` pentru a exclude fișierele sensibile
- Setați `AUTH_COOKIE_SECURE=true` atunci când serverul se află în spatele HTTPS

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

## Dependențe

- Rulați periodic `npm audit` (`npm run audit:deps` acoperă aplicația principală + electron)
- Mențineți dependențele actualizate
- Proiectul utilizează `husky` + `lint-staged` pentru verificările anterioare commiturilor (lint-staged + check-docs-sync + check:any-budget:t11)
- Pipeline-ul CI rulează regulile de securitate ESLint la fiecare push (`no-eval`, `no-implied-eval`, `no-new-func` = eroare)
- Constantele furnizorilor sunt validate la încărcarea modulului prin Zod (`src/shared/validation/schemas.ts`)
- Biblioteci utilizate care sunt securizate în mod implicit: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (fără risc de SQLi datorită interogărilor parametrizate), `bcryptjs` (hashingul parolelor)

## Reguli stricte de securitate

Aceste reguli sunt impuse prin instrumente și verificări efectuate de recenzori:

1. **Nu comiteți niciodată secrete** — `.env` este ignorat de git; `.env.example` este șablonul (fără valori literale, doar comentarii — consultați PUBLIC_CREDS.md mai jos)
2. **Nu utilizați niciodată `eval()`, `new Function()` sau evaluarea implicită** — ESLint impune această regulă
3. **Nu ocoliți niciodată hook-urile Husky** (`--no-verify`, `--no-gpg-sign`) fără aprobarea explicită a operatorului
4. **Nu scrieți niciodată SQL brut în rute** — utilizați întotdeauna `src/lib/db/` (parametrizat)
5. **Validați întotdeauna datele de intrare cu Zod** — `src/shared/validation/schemas.ts`
6. **Sanitizați întotdeauna antetele upstream** — lista de interdicții se află în `src/shared/constants/upstreamHeaders.ts`
7. **Criptați credențialele stocate** — AES-256-GCM prin `src/lib/db/encryption.ts`
8. **Identificatorii OAuth upstream publici prin `resolvePublicCred()`** — nu încorporați niciodată valori literale `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` în codul sursă. Consultați [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Răspunsurile de eroare prin `buildErrorBody()` / `sanitizeErrorMessage()`** — nu includeți niciodată valori brute `err.stack` / `err.message` în corpurile răspunsurilor HTTP / SSE / executor / MCP. Consultați [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Valorile de execuție `exec()` / `spawn()` prin opțiunea `env`** — nu interpolați niciodată în șiruri căi externe sau valori care nu sunt de încredere în scripturile transmise shell-ului. Referință: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Preferați bibliotecile securizate în mod implicit** — consultați [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Apelați la acestea înainte de a implementa propria soluție.

## Constatările scanerului pentru lanțul de aprovizionare (Socket.dev / Snyk / similar)

> **Notă privind domeniul de aplicare:** `socket.yml` din rădăcina depozitului configurează doar `projectIgnorePaths` pentru scanarea post-publicare, efectuată de Socket.dev în registru, a artefactului npm publicat — aceasta nu reprezintă un criteriu obligatoriu de validare pentru integrarea CI/PR. Niciun flux de lucru din `.github/workflows`, niciun script din `package.json` și nicio țintă din `Makefile` nu invocă Socket.dev.

Artefactul npm `omniroute` publicat include compilarea Next.js cu `output: "standalone"`,
ceea ce înseamnă că fiecare gestionar de rută — inclusiv funcționalitățile privilegiate
documentate (MITM, import Zed, Cloud Sync, supervizorul de servicii încorporat) — ajunge
în fragmentele minificate `.next/server/*.js`. Scanerele euristice pentru lanțul de aprovizionare
compară frecvent aceste fragmente cu tipare din semnăturile programelor malware.

Configurația scanerului pe care o utilizăm se află în [`socket.yml`](socket.yml), în
rădăcina depozitului (formatul v2 al aplicației GitHub Socket.dev — consultați
<https://docs.socket.dev/docs/socket-yml>). Aceasta exclude în mod explicit
directoarele care nu sunt distribuite (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/` etc.), astfel încât scanerul să raporteze numai căile de cod care
ajung efectiv la utilizatorii versiunii publicate — scanarea propriu-zisă este inițiată de aplicația
GitHub Socket, care citește acest fișier, nu de un flux de lucru din acest depozit.

Pentru fiecare categorie de constatări, menținem o atestare individuală din partea responsabililor:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  hartă pentru fiecare constatare: fișier sursă ↔ fragment semnalat ↔ comportament ↔ măsură de reducere a riscului
  aplicată în v3.8.6.
- Blocurile `SECURITY-AUDITOR-NOTE:` din codul sursă, aflate la fiecare funcție semnalată,
  fac trimitere la același document.

Pentru utilizatorii al căror flux de lucru nu permite ignorarea alertei: compilați folosind
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Această comandă înlocuiește cele patru
module sensibile cu substituenți care returnează HTTP 503 `feature-disabled` în
timpul execuției, astfel încât acele căi de cod privilegiate să fie absente fizic din pachet.
Consultați [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
pentru procedura de publicare.

## Referințe

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline-ul de autorizare
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — cadrul de măsuri de protecție
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — jurnalul de audit și păstrarea datelor
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — tipar **obligatoriu** pentru credențialele publice ale serviciilor din amonte
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — tipar **obligatoriu** pentru răspunsurile de eroare
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — atestarea responsabililor de mentenanță pentru constatările scanerelor lanțului de aprovizionare
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + perioadă de așteptare + blocare
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — amprentarea TLS (notificare juridică/etică)
- [`CLAUDE.md`](CLAUDE.md) — reguli stricte pentru agenții AI
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — biblioteci atent selecționate, securizate în mod implicit
