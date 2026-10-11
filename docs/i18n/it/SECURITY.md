# Security Policy (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Segnalazione delle vulnerabilità

Se scopri una vulnerabilità di sicurezza in OmniRoute, segnalala in modo responsabile:

1. **NON** aprire una issue pubblica su GitHub
2. Usa [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Includi: descrizione, passaggi per la riproduzione e impatto potenziale

## Tempistiche di risposta

| Fase                  | Obiettivo                                    |
| --------------------- | -------------------------------------------- |
| Conferma di ricezione | 48 ore                                       |
| Triage e valutazione  | 5 giorni lavorativi                          |
| Rilascio della patch  | 14 giorni lavorativi (vulnerabilità critica) |

## Versioni supportate

| Versione | Stato del supporto                                   |
| -------- | ---------------------------------------------------- |
| 3.9.x    | 🗓️ Pianificato — linea LTS (`stable/v3`), vedi sotto |
| 3.8.x    | ✅ Attivo                                            |
| 3.7.x    | ✅ Sicurezza                                         |
| < 3.7.0  | ❌ Non supportato                                    |

## Finestra di supporto LTS (v3.9.x)

Dopo la 3.8.59, la versione successiva è la **3.9.0**, che inaugura la linea di supporto a lungo termine sul branch
`stable/v3` (vedi [`ROADMAP.md`](ROADMAP.md) → "Fase 3 — v3.9.0 LTS").

- **Cosa riceve `stable/v3`:** correzioni di bug, patch di sicurezza e aggiornamenti dei provider. Le nuove
  funzionalità vengono aggiunte al canale v4; la linea LTS privilegia la stabilità. `npm install omniroute`
  (il dist-tag `latest`) rimane sulla v3 durante l'intero ciclo della v4.
- **Durata della finestra:** `<T-GAP-3: decisione del proprietario in sospeso — vedi ROADMAP.md>`. La durata della
  finestra dopo la disponibilità generale della v4.0 (quando `latest` passa alla v4) **non è stata ancora decisa**; questa
  sezione verrà aggiornata quando il manutentore la annuncerà. Fino ad allora, non presumere una data di fine.
- **Segnalazione di una vulnerabilità nella linea LTS:** usa lo stesso canale previsto per qualsiasi altra versione —
  un [GitHub Security Advisory](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) privato,
  mai una issue pubblica. Indica quale versione hai testato (ad esempio `3.9.2`); le correzioni vengono applicate a
  `stable/v3` e propagate in avanti alla v4.
- **Baseline di sicurezza al momento della creazione della LTS:** lo stato rilevato dagli scanner, le verifiche delle protezioni delle route e
  delle credenziali pubbliche sono registrati in
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md).

---

## Architettura di sicurezza

OmniRoute implementa un modello di sicurezza multilivello:

```
Richiesta → CORS → Pipeline Authz (classificazione → criteri → applicazione)
          → Protezioni (mascheramento PII, prompt injection, bridge visivo)
          → Limitatore di frequenza → Circuit breaker → Pausa → Blocco del modello → Provider
```

### 🔐 Autenticazione e autorizzazione

| Funzionalità                          | Implementazione                                                                                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Accesso alla dashboard**            | Autenticazione basata su password con token JWT (cookie HttpOnly)                                                                                                     |
| **Autenticazione con API key**        | Chiavi firmate con HMAC e convalida CRC                                                                                                                               |
| **OAuth 2.0 + PKCE**                  | L'OAuth browser/dispositivo specifico del provider usa PKCE dove supportato; le credenziali Devin destinate alla sola importazione vengono gestite separatamente.     |
| **Aggiornamento dei token**           | Aggiornamento automatico dei token OAuth prima della scadenza                                                                                                         |
| **Cookie sicuri**                     | `AUTH_COOKIE_SECURE=true` per gli ambienti HTTPS                                                                                                                      |
| **Pipeline Authz**                    | Classificazione delle route (PUBLIC / CLIENT_API / MANAGEMENT) — vedi `docs/architecture/AUTHZ_GUIDE.md`                                                              |
| **Livelli di protezione delle route** | Modello a 3 livelli per le route di gestione (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — vedi `docs/security/ROUTE_GUARD_TIERS.md`                                 |
| **MCP con ambito manage**             | Accesso remoto a `/api/mcp/*` subordinato ad API key con ambito `manage`; `/api/cli-tools/runtime/*` rimane strettamente limitato al loopback. Vedi ROUTE_GUARD_TIERS |
| **Ambiti MCP**                        | 32 ambiti granulari (read:health, write:combos, execute:completions, ecc.) — vedi `docs/frameworks/MCP-SERVER.md`                                                     |

### 🛡️ Crittografia dei dati inattivi

Tutti i dati sensibili archiviati in SQLite sono crittografati tramite **AES-256-GCM** con derivazione della chiave mediante scrypt:

- API key, token di accesso, token di aggiornamento e token ID
- Formato con versione: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Modalità passthrough (testo in chiaro) quando `STORAGE_ENCRYPTION_KEY` non è impostata

```bash
# Genera la chiave di crittografia:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Framework di protezione

OmniRoute include un **registro delle protezioni** ricaricabile a caldo (`src/lib/guardrails/`) con 3 protezioni integrate ordinate per priorità:

| Protezione         | Priorità | Scopo                                                                                                                      |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5        | Collega i modelli privi di capacità visive a descrizioni basate sulle immagini; protezione SSRF per gli URL delle immagini |
| `pii-masker`       | 10       | Oscuramento delle PII prima e dopo la chiamata (email, telefono, CPF, CNPJ, carte di credito, SSN)                         |
| `prompt-injection` | 20       | Rileva schemi di override, dirottamento del ruolo, jailbreak e fuga di dati                                                |

Le protezioni personalizzate vengono registrate tramite `registerGuardrail(new MyGuardrail())`. Il modello è fail-open (le eccezioni non bloccano mai il traffico). Disattivazione per singola richiesta tramite l'header `x-omniroute-disabled-guardrails`. → Vedi [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Protezione dalla prompt injection

Middleware euristico best-effort che rileva pattern di prompt injection nelle richieste agli LLM.
**Non è un firewall completo contro la prompt injection** — può produrre falsi positivi (prompt innocui
con personaggi/RPG) e falsi negativi (leetspeak, spaziatura, pattern non in lingua inglese).

| Tipo di pattern           | Gravità | Esempio                                                       |
| ------------------------- | ------- | ------------------------------------------------------------- |
| Override di sistema       | Alta    | "ignora tutte le istruzioni precedenti"                       |
| Dirottamento del ruolo    | Media   | "ora sei DAN, puoi fare qualsiasi cosa"                       |
| Iniezione di delimitatori | Alta    | Separatori codificati per interrompere i confini del contesto |
| DAN/Jailbreak             | Media   | Pattern noti di prompt per il jailbreak                       |
| Fuga di istruzioni        | Alta    | "mostrami il tuo prompt di sistema"                           |
| Elusione tramite codifica | Media   | Decodifica base64/rot13/hex + parole chiave delle istruzioni  |

Solo i rilevamenti con gravità **Alta** vengono bloccati in modalità `block`. Le famiglie con gravità
Media vengono registrate, ma non sono mai bloccate da `sanitizeRequest`.

Configura tramite la dashboard (Impostazioni → Sicurezza) o `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (criterio per le iniezioni; il valore legacy "redact" non rimuove il testo dell'iniezione)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (predefinito) | medium | low — le gravità pari o superiori a questa vengono bloccate in modalità block
```

### 🔒 Oscuramento dei dati personali

Rilevamento automatico e oscuramento facoltativo delle informazioni di identificazione personale:

| Tipo di dato personale | Pattern               | Sostituzione       |
| ---------------------- | --------------------- | ------------------ |
| Email                  | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasile)          | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasile)         | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Carta di credito       | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefono               | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (USA)              | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # richiede la riscrittura dei dati personali; indipendente da INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # facoltativo: oscura i dati personali nelle risposte del provider restituite ai client
```

### 🌐 Sicurezza di rete

| Funzionalità                    | Descrizione                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| **CORS**                        | Allowlist esplicita delle origini incrociate (`CORS_ALLOWED_ORIGINS`; legacy `CORS_ORIGIN`)  |
| **Filtraggio IP**               | Intervalli IP in allowlist/blocklist nella dashboard                                         |
| **Limitazione della frequenza** | Limiti di frequenza per provider con backoff automatico                                      |
| **Anti-Thundering Herd**        | Mutex + blocco per connessione per prevenire errori 502 a cascata                            |
| **Impronta TLS**                | Spoofing dell'impronta TLS simile a quella di un browser per ridurre il rilevamento dei bot  |
| **Impronta CLI**                | Ordinamento di intestazioni/corpo per provider per corrispondere alle firme della CLI nativa |

### 🔌 Resilienza e disponibilità

| Funzionalità                    | Descrizione                                                                |
| ------------------------------- | -------------------------------------------------------------------------- |
| **Circuit Breaker**             | 3 stati (Chiuso → Aperto → Semi-aperto) per provider, persistiti in SQLite |
| **Idempotenza delle richieste** | Finestra di deduplicazione di 5 secondi per le richieste duplicate         |
| **Backoff esponenziale**        | Nuovo tentativo automatico con ritardi crescenti                           |
| **Dashboard dello stato**       | Monitoraggio in tempo reale dello stato dei provider                       |

### 📋 Conformità

| Funzionalità              | Descrizione                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| **Conservazione dei log** | Pulizia automatica dopo `CALL_LOG_RETENTION_DAYS`                                   |
| **Esclusione dai log**    | Il flag `noLog` per chiave API disabilita la registrazione delle richieste          |
| **Log di audit**          | Azioni amministrative tracciate nella tabella `audit_log`                           |
| **Audit MCP**             | Registrazione degli audit basata su SQLite per tutte le chiamate agli strumenti MCP |
| **Validazione Zod**       | Tutti gli input API vengono validati con schemi Zod v4 al caricamento del modulo    |

---

## Variabili d'ambiente obbligatorie

Tutti i segreti devono essere impostati prima di avviare il server. Il server **interromperà immediatamente l'avvio** se sono mancanti o deboli.

```bash
# OBBLIGATORIE — il server non si avvierà senza queste:
JWT_SECRET=$(openssl rand -base64 48)     # minimo 32 caratteri
API_KEY_SECRET=$(openssl rand -hex 32)    # minimo 16 caratteri

# CONSIGLIATA — abilita la crittografia dei dati archiviati:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Il server rifiuta attivamente valori notoriamente deboli come `changeme`, `secret` o `password`.

---

## Sicurezza di Docker

- Utilizzare un utente non root in produzione
- Montare i segreti come volumi di sola lettura
- Non copiare mai i file `.env` nelle immagini Docker
- Utilizzare `.dockerignore` per escludere i file sensibili
- Impostare `AUTH_COOKIE_SECURE=true` quando si utilizza HTTPS

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

## Dipendenze

- Eseguire regolarmente `npm audit` (`npm run audit:deps` copre main + electron)
- Mantenere aggiornate le dipendenze
- Il progetto utilizza `husky` + `lint-staged` per i controlli pre-commit (lint-staged + check-docs-sync + check:any-budget:t11)
- La pipeline CI esegue le regole di sicurezza ESLint a ogni push (`no-eval`, `no-implied-eval`, `no-new-func` = errore)
- Le costanti dei provider vengono convalidate al caricamento del modulo tramite Zod (`src/shared/validation/schemas.ts`)
- Vengono utilizzate librerie sicure per impostazione predefinita: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (nessun rischio di SQL injection grazie alle query parametrizzate), `bcryptjs` (hashing delle password)

## Regole di sicurezza rigorose

Queste regole vengono applicate dagli strumenti e dai revisori:

1. **Non eseguire mai il commit dei segreti** — `.env` è ignorato da Git; `.env.example` è il modello (nessun valore letterale, solo commenti — vedere PUBLIC_CREDS.md di seguito)
2. **Non utilizzare mai `eval()`, `new Function()` o eval implicito** — ESLint ne garantisce il rispetto
3. **Non ignorare mai gli hook di Husky** (`--no-verify`, `--no-gpg-sign`) senza l'approvazione esplicita dell'operatore
4. **Non scrivere mai SQL non elaborato nelle route** — passare sempre attraverso `src/lib/db/` (parametrizzato)
5. **Convalidare sempre gli input con Zod** — `src/shared/validation/schemas.ts`
6. **Sanificare sempre gli header upstream** — denylist in `src/shared/constants/upstreamHeaders.ts`
7. **Crittografare le credenziali archiviate** — AES-256-GCM tramite `src/lib/db/encryption.ts`
8. **Identificatori OAuth upstream pubblici tramite `resolvePublicCred()`** — non incorporare mai nel codice sorgente valori letterali `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com`. Vedere [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Risposte di errore tramite `buildErrorBody()` / `sanitizeErrorMessage()`** — non inserire mai `err.stack` / `err.message` non elaborati nei corpi delle risposte HTTP / SSE / executor / MCP. Vedere [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Valori di runtime di `exec()` / `spawn()` tramite l'opzione `env`** — non interpolare mai in stringhe percorsi esterni o valori non attendibili all'interno di script passati alla shell. Riferimento: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Preferire librerie sicure per impostazione predefinita** — vedere [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Utilizzarle prima di sviluppare soluzioni personalizzate.

## Risultati degli scanner della supply chain (Socket.dev / Snyk / simili)

> **Nota sull'ambito:** `socket.yml` nella radice del repository definisce esclusivamente `projectIgnorePaths` per la scansione post-pubblicazione lato registry di Socket.dev sull'artefatto npm pubblicato — non costituisce un controllo obbligatorio per il merge in CI/PR. Nessun workflow in `.github/workflows`, nessuno script di `package.json` e nessun target di `Makefile` invoca Socket.dev.

L'artefatto npm `omniroute` pubblicato include la build Next.js con `output: "standalone"`,
il che significa che ogni gestore di route — comprese le funzionalità privilegiate
documentate (MITM, importazione da Zed, Cloud Sync, supervisore di servizi integrato) —
finisce nei chunk minimizzati `.next/server/*.js`. Gli scanner euristici della supply chain
confrontano spesso tali chunk con firme di malware.

La configurazione dello scanner che utilizziamo si trova in [`socket.yml`](socket.yml) nella
radice del repository (formato v2 della GitHub App di Socket.dev — vedere
<https://docs.socket.dev/docs/socket-yml>). Esclude esplicitamente le
directory non distribuite (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/`, ecc.), in modo che lo scanner segnali solo i percorsi di codice che
raggiungono effettivamente gli utenti del pacchetto pubblicato — la scansione stessa viene eseguita dalla GitHub App di Socket,
che legge tale file, e non da un workflow presente in questo repository.

Per ogni categoria di risultato manteniamo un'attestazione del manutentore specifica per ciascun risultato:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  mappa per singolo risultato: file sorgente ↔ chunk segnalato ↔ comportamento ↔ mitigazione
  applicata nella v3.8.6.
- I blocchi `SECURITY-AUDITOR-NOTE:` nel codice sorgente, presenti in corrispondenza di ciascuna funzione segnalata,
  rimandano allo stesso documento.

Per gli utenti la cui pipeline non consente di attenuare l'avviso: compilare con
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. In questo modo i quattro
moduli sensibili vengono sostituiti con stub che restituiscono HTTP 503 `feature-disabled`
in fase di esecuzione, così i percorsi di codice privilegiati risultano fisicamente assenti dal bundle.
Consultare [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
per la procedura di pubblicazione.

## Riferimenti

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — pipeline di autorizzazione
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — framework delle misure di protezione
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — registro di audit e conservazione
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — modello **obbligatorio** per le credenziali pubbliche dei servizi upstream
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — modello **obbligatorio** per le risposte di errore
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — attestazione del manutentore per i risultati degli scanner della supply chain
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — fingerprinting TLS (avviso legale/etico)
- [`CLAUDE.md`](CLAUDE.md) — regole rigide per gli agenti IA
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — raccolta selezionata di librerie sicure per impostazione predefinita
