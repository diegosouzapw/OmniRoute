# Security Policy (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Rapportering av sårbarheter

Om du upptäcker en säkerhetssårbarhet i OmniRoute ska du rapportera den på ett ansvarsfullt sätt:

1. Öppna **INTE** ett offentligt GitHub-ärende
2. Använd [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Inkludera: beskrivning, steg för att återskapa problemet och potentiell påverkan

## Tidsplan för hantering

| Etapp                    | Mål                                   |
| ------------------------ | ------------------------------------- |
| Bekräftelse              | 48 timmar                             |
| Triage och bedömning     | 5 arbetsdagar                         |
| Lansering av korrigering | 14 arbetsdagar (kritiska sårbarheter) |

## Versioner som stöds

| Version | Supportstatus    |
| ------- | ---------------- |
| 3.8.x   | ✅ Aktiv         |
| 3.7.x   | ✅ Säkerhetsstöd |
| < 3.7.0 | ❌ Stöds inte    |

---

## Säkerhetsarkitektur

OmniRoute implementerar en säkerhetsmodell med flera lager:

```
Begäran → CORS → Authz-pipeline (klassificera → policyer → framtvinga)
        → Skyddsräcken (PII-maskering, promptinjektion, vision-brygga)
        → Hastighetsbegränsare → Kretsbrytare → Väntetid → Modellspärr → Leverantör
```

### 🔐 Autentisering och auktorisering

| Funktion                          | Implementering                                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Inloggning på kontrollpanelen** | Lösenordsbaserad autentisering med JWT-token (HttpOnly-cookies)                                                                                                    |
| **API-nyckelautentisering**       | HMAC-signerade nycklar med CRC-validering                                                                                                                          |
| **OAuth 2.0 + PKCE**              | Leverantörsspecifik OAuth för webbläsare/enheter använder PKCE där det stöds; Devin-autentiseringsuppgifter som endast importeras hanteras separat.                |
| **Tokenförnyelse**                | Automatisk förnyelse av OAuth-token före utgång                                                                                                                    |
| **Säkra cookies**                 | `AUTH_COOKIE_SECURE=true` för HTTPS-miljöer                                                                                                                        |
| **Authz-pipeline**                | Ruttklassificering (PUBLIC / CLIENT_API / MANAGEMENT) — se `docs/architecture/AUTHZ_GUIDE.md`                                                                      |
| **Skyddsnivåer för rutter**       | Modell med 3 nivåer för administrationsrutter (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — se `docs/security/ROUTE_GUARD_TIERS.md`                               |
| **MCP med manage-omfång**         | Fjärråtkomst till `/api/mcp/*` styrs av API-nycklar med omfånget `manage`; `/api/cli-tools/runtime/*` förblir strikt begränsad till loopback. Se ROUTE_GUARD_TIERS |
| **MCP-omfång**                    | 32 detaljerade omfång (read:health, write:combos, execute:completions osv.) — se `docs/frameworks/MCP-SERVER.md`                                                   |

### 🛡️ Kryptering av lagrade data

Alla känsliga data som lagras i SQLite krypteras med **AES-256-GCM** och scrypt-baserad nyckelhärledning:

- API-nycklar, åtkomsttoken, uppdateringstoken och ID-token
- Versionshanterat format: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Genomströmningsläge (klartext) när `STORAGE_ENCRYPTION_KEY` inte har angetts

```bash
# Generera krypteringsnyckel:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Ramverk för skyddsräcken

OmniRoute levereras med ett **register för skyddsräcken** (`src/lib/guardrails/`) som kan läsas in på nytt under körning och innehåller 3 inbyggda skyddsräcken sorterade efter prioritet:

| Skyddsräcke        | Prioritet | Syfte                                                                                      |
| ------------------ | --------- | ------------------------------------------------------------------------------------------ |
| `vision-bridge`    | 5         | Kopplar modeller utan bildstöd till bildmedvetna beskrivningar; SSRF-skydd för bild-URL:er |
| `pii-masker`       | 10        | Maskering av PII före och efter anrop (e-post, telefon, CPF, CNPJ, kreditkort, SSN)        |
| `prompt-injection` | 20        | Identifierar mönster för åsidosättning, rollkapning, jailbreak och läckor                  |

Anpassade skyddsräcken registreras via `registerGuardrail(new MyGuardrail())`. Modellen är fail-open (undantag blockerar aldrig trafik). Bortval per begäran sker via headern `x-omniroute-disabled-guardrails`. → Se [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Skydd mot promptinjektion

Heuristisk mellanprogramvara enligt bästa förmåga som identifierar promptinjektionsmönster i LLM-begäranden.
**Inte en fullständig brandvägg mot promptinjektion** — kan ge falska positiva resultat (ofarliga
persona-/rollspelspromptar) och falska negativa resultat (leetspeak, mellanrum, icke-engelska mönster).

| Mönstertyp                 | Allvarlighetsgrad | Exempel                                                  |
| -------------------------- | ----------------- | -------------------------------------------------------- |
| Åsidosättning av systemet  | Hög               | "ignorera alla tidigare instruktioner"                   |
| Rollkapning                | Medel             | "du är nu DAN, du kan göra vad som helst"                |
| Avgränsarinjektion         | Hög               | Kodade avgränsare för att bryta kontextgränser           |
| DAN/Jailbreak              | Medel             | Kända mönster för jailbreak-promptar                     |
| Instruktionsläcka          | Hög               | "visa mig din systemprompt"                              |
| Kodningsbaserat undvikande | Medel             | base64/rot13/hex-avkodning + nyckelord för instruktioner |

Endast identifieringar med **Hög** allvarlighetsgrad blockeras i läget `block`. Familjer med medelhög
allvarlighetsgrad loggas men blockeras aldrig av `sanitizeRequest`.

Konfigurera via kontrollpanelen (Inställningar → Säkerhet) eller `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (injektionspolicy; det äldre läget "redact" tar inte bort injektionstext)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (standard) | medium | low — allvarlighetsgrader på eller över denna nivå blockeras i block-läge
```

### 🔒 Maskering av PII

Automatisk identifiering och valfri maskering av personligt identifierbar information:

| PII-typ          | Mönster               | Ersättning         |
| ---------------- | --------------------- | ------------------ |
| E-post           | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasilien)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasilien) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kreditkort       | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon          | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (USA)        | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # begär omskrivning av PII; oberoende av INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # valfritt: maskera PII i leverantörssvar som returneras till klienter
```

### 🌐 Nätverkssäkerhet

| Funktion                    | Beskrivning                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| **CORS**                    | Explicit lista över tillåtna ursprung (`CORS_ALLOWED_ORIGINS`; äldre `CORS_ORIGIN`)     |
| **IP-filtrering**           | Tillåtelselista/blockeringslista för IP-intervall i kontrollpanelen                     |
| **Hastighetsbegränsning**   | Hastighetsgränser per leverantör med automatisk backoff                                 |
| **Skydd mot anropsstormar** | Mutex + låsning per anslutning förhindrar kaskader av 502-fel                           |
| **TLS-fingeravtryck**       | Förfalskning av webbläsarliknande TLS-fingeravtryck för att minska botidentifiering     |
| **CLI-fingeravtryck**       | Ordningsföljd för header/brödtext per leverantör för att matcha inbyggda CLI-signaturer |

### 🔌 Motståndskraft och tillgänglighet

| Funktion                   | Beskrivning                                                                 |
| -------------------------- | --------------------------------------------------------------------------- |
| **Kretsbrytare**           | Tre tillstånd (stängd → öppen → halvöppen) per leverantör, lagrade i SQLite |
| **Idempotenta begäranden** | Dedupliceringsfönster på 5 sekunder för identiska begäranden                |
| **Exponentiell backoff**   | Automatiska återförsök med ökande fördröjningar                             |
| **Hälsokontrollpanel**     | Hälsoövervakning av leverantörer i realtid                                  |

### 📋 Regelefterlevnad

| Funktion                   | Beskrivning                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| **Logglagring**            | Automatisk rensning efter `CALL_LOG_RETENTION_DAYS`               |
| **Undantag från loggning** | Flaggan `noLog` per API-nyckel inaktiverar loggning av begäranden |
| **Granskningslogg**        | Administrativa åtgärder spåras i tabellen `audit_log`             |
| **MCP-granskning**         | SQLite-baserad granskningsloggning för alla MCP-verktygsanrop     |
| **Zod-validering**         | Alla API-indata valideras med Zod v4-scheman vid modulinläsning   |

---

## Obligatoriska miljövariabler

Alla hemligheter måste anges innan servern startas. Servern kommer att **avbryta omedelbart** om de saknas eller är för svaga.

```bash
# OBLIGATORISKT — servern startar inte utan dessa:
JWT_SECRET=$(openssl rand -base64 48)     # minst 32 tecken
API_KEY_SECRET=$(openssl rand -hex 32)    # minst 16 tecken

# REKOMMENDERAS — möjliggör kryptering av lagrade data:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Servern avvisar aktivt kända svaga värden som `changeme`, `secret` eller `password`.

---

## Docker-säkerhet

- Använd en icke-root-användare i produktion
- Montera hemligheter som skrivskyddade volymer
- Kopiera aldrig `.env`-filer till Docker-avbilder
- Använd `.dockerignore` för att exkludera känsliga filer
- Ange `AUTH_COOKIE_SECURE=true` när servern körs bakom HTTPS

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

## Beroenden

- Kör `npm audit` regelbundet (`npm run audit:deps` omfattar main + electron)
- Håll beroendena uppdaterade
- Projektet använder `husky` + `lint-staged` för kontroller före incheckning (lint-staged + check-docs-sync + check:any-budget:t11)
- CI-pipelinen kör ESLint-säkerhetsregler vid varje push (`no-eval`, `no-implied-eval`, `no-new-func` = fel)
- Leverantörskonstanter valideras när modulen läses in via Zod (`src/shared/validation/schemas.ts`)
- Bibliotek som är säkra som standard används: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (ingen risk för SQL-injektion tack vare parametriserade frågor), `bcryptjs` (hashning av lösenord)

## Strikta säkerhetsregler

Dessa regler upprätthålls av verktyg och granskare:

1. **Checka aldrig in hemligheter** — `.env` ignoreras av git; `.env.example` är mallen (inga literaler, endast kommentarer — se PUBLIC_CREDS.md nedan)
2. **Använd aldrig `eval()`, `new Function()` eller implicit eval** — detta upprätthålls av ESLint
3. **Kringgå aldrig Husky-hookar** (`--no-verify`, `--no-gpg-sign`) utan uttryckligt godkännande från operatören
4. **Skriv aldrig rå SQL i routes** — gå alltid via `src/lib/db/` (parametriserat)
5. **Validera alltid indata med Zod** — `src/shared/validation/schemas.ts`
6. **Sanera alltid headers från uppströmsservrar** — spärrlista i `src/shared/constants/upstreamHeaders.ts`
7. **Kryptera lagrade autentiseringsuppgifter** — AES-256-GCM via `src/lib/db/encryption.ts`
8. **Publika OAuth-identifierare för uppströmsleverantörer via `resolvePublicCred()`** — bädda aldrig in literaler av typen `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` i källkoden. Se [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Felsvar via `buildErrorBody()` / `sanitizeErrorMessage()`** — lägg aldrig in råa `err.stack` / `err.message` i svarskroppar för HTTP / SSE / executor / MCP. Se [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Körtidsvärden för `exec()` / `spawn()` via alternativet `env`** — interpolera aldrig externa sökvägar eller opålitliga värden som strängar i skript som skickas till skalet. Referens: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Föredra bibliotek som är säkra som standard** — se [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Använd dem i första hand i stället för att bygga egna lösningar.

## Resultat från skannrar för leveranskedjan (Socket.dev / Snyk / liknande)

> **Anmärkning om omfattning:** `socket.yml` i repositoriets rot styr endast `projectIgnorePaths` för Socket.devs skanning på registersidan efter publicering av den publicerade npm-artefakten — den fungerar inte som en obligatorisk spärr för sammanslagning via CI/PR. Inget arbetsflöde i `.github/workflows`, inget skript i `package.json` och inget mål i `Makefile` anropar Socket.dev.

Den publicerade npm-artefakten `omniroute` inkluderar Next.js-versionen med `output: "standalone"`, vilket innebär att varje routningshanterare — inklusive dokumenterade privilegierade funktioner (MITM, Zed-import, Cloud Sync, inbäddad tjänsteövervakare) — hamnar i minifierade segment i `.next/server/*.js`. Heuristiska skannrar för leveranskedjan matchar ofta dessa segment mot signaturer för skadlig kod.

Skannerkonfigurationen vi använder finns i [`socket.yml`](socket.yml) i repositoriets rot (Socket.dev GitHub App-format v2 — se <https://docs.socket.dev/docs/socket-yml>). Den exkluderar uttryckligen kataloger som inte levereras (`tests/`, `_tasks/`, `_references/`, `_ideia/`, `_mono_repo/`, `docs/` osv.), så att skannern endast rapporterar kodvägar som faktiskt når publicerade användare — själva skanningen drivs av Socket GitHub App, som läser den filen, inte av ett arbetsflöde i detta repositorium.

För varje kategori av resultat upprätthåller vi ett intyg från en underhållare för varje enskilt resultat:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  mappning per resultat: källfil ↔ flaggat segment ↔ beteende ↔ åtgärd som tillämpats i v3.8.6.
- `SECURITY-AUDITOR-NOTE:`-block i källkoden vid varje flaggad funktion hänvisar tillbaka till samma dokument.

För användare vars pipeline inte kan tillåta varningen: bygg med `OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Detta ersätter de fyra känsliga modulerna med stubbar som returnerar HTTP 503 `feature-disabled` under körning, så att de privilegierade kodvägarna fysiskt saknas i paketet. Se [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) för publiceringsinstruktionerna.

## Referenser

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — auktoriseringspipeline
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — ramverk för skyddsräcken
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — granskningslogg och lagring
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — **obligatoriskt** mönster för offentliga autentiseringsuppgifter till uppströmstjänster
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — **obligatoriskt** mönster för felsvar
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — intyg från ansvariga utvecklare för resultat från skannrar för programvaruförsörjningskedjan
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — kretsbrytare + nedkylningsperiod + spärr
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS-fingeravtryck (juridiskt/etiskt meddelande)
- [`CLAUDE.md`](CLAUDE.md) — strikta regler för AI-agenter
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — kurerade bibliotek med säkra standardinställningar
