# Security Policy (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Rapportering av sårbarheter

Hvis du oppdager en sikkerhetssårbarhet i OmniRoute, ber vi deg rapportere den på en ansvarlig måte:

1. **IKKE** opprett en offentlig GitHub-sak
2. Bruk [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Inkluder: beskrivelse, fremgangsmåte for reproduksjon og potensiell innvirkning

## Tidslinje for respons

| Fase                      | Mål                     |
| ------------------------- | ----------------------- |
| Bekreftelse               | 48 timer                |
| Prioritering og vurdering | 5 virkedager            |
| Utgivelse av rettelse     | 14 virkedager (kritisk) |

## Støttede versjoner

| Versjon | Støttestatus                                       |
| ------- | -------------------------------------------------- |
| 3.9.x   | 🗓️ Planlagt — LTS-linje (`stable/v3`), se nedenfor |
| 3.8.x   | ✅ Aktiv                                           |
| 3.7.x   | ✅ Sikkerhetsstøtte                                |
| < 3.7.0 | ❌ Ikke støttet                                    |

## LTS-støtteperiode (v3.9.x)

Etter 3.8.59 er neste versjon **3.9.0**, som åpner linjen for langsiktig støtte på
`stable/v3`-grenen (se [`ROADMAP.md`](ROADMAP.md) → «Fase 3 — v3.9.0 LTS»).

- **Hva `stable/v3` mottar:** feilrettinger, sikkerhetsoppdateringer og leverandøroppdateringer. Nye
  funksjoner går til v4-kanalen; LTS-linjen prioriterer stabilitet. `npm install omniroute`
  (`latest`-distribusjonstaggen) forblir på v3 gjennom hele v4-syklusen.
- **Periodens varighet:** `<T-GAP-3: eierens beslutning avventes — se ROADMAP.md>`. Lengden på
  perioden etter v4.0 GA (når `latest` bytter til v4) er **ikke bestemt ennå**. Denne
  delen oppdateres når vedlikeholderen kunngjør den. Frem til da må du ikke anta noen sluttdato.
- **Rapportering av en sårbarhet i LTS-linjen:** samme kanal som for alle andre versjoner —
  en privat [GitHub Security Advisory](https://github.com/diegosouzapw/OmniRoute/security/advisories/new),
  aldri en offentlig sak. Oppgi hvilken versjon du testet (for eksempel `3.9.2`); rettelser legges inn i
  `stable/v3` og videreføres til v4.
- **Sikkerhetsgrunnlag ved etablering av LTS-linjen:** målt skannerstatus, rutebeskyttelse og
  dokumentasjon for offentlig legitimasjon er registrert i
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md).

---

## Sikkerhetsarkitektur

OmniRoute implementerer en sikkerhetsmodell med flere lag:

```
Forespørsel → CORS → Autorisasjonsflyt (klassifiser → policyer → håndhev)
            → Sikkerhetsmekanismer (PII-maskering, promptinjeksjon, synsbro)
            → Hastighetsbegrenser → Kretsbryter → Nedkjøling → Modellsperre → Leverandør
```

### 🔐 Autentisering og autorisasjon

| Funksjon                          | Implementering                                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Innlogging på kontrollpanel**   | Passordbasert autentisering med JWT-tokener (HttpOnly-informasjonskapsler)                                                                                         |
| **API-nøkkelautentisering**       | HMAC-signerte nøkler med CRC-validering                                                                                                                            |
| **OAuth 2.0 + PKCE**              | Leverandørspesifikk OAuth for nettleser/enhet bruker PKCE der det støttes; Devin-legitimasjon som bare kan importeres, håndteres separat.                          |
| **Tokenoppdatering**              | Automatisk oppdatering av OAuth-tokener før de utløper                                                                                                             |
| **Sikre informasjonskapsler**     | `AUTH_COOKIE_SECURE=true` for HTTPS-miljøer                                                                                                                        |
| **Autorisasjonsflyt**             | Ruteklassifisering (PUBLIC / CLIENT_API / MANAGEMENT) — se `docs/architecture/AUTHZ_GUIDE.md`                                                                      |
| **Nivåer for rutebeskyttelse**    | 3-nivåmodell for administrasjonsruter (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — se `docs/security/ROUTE_GUARD_TIERS.md`                                       |
| **MCP med administrasjonsomfang** | Ekstern tilgang til `/api/mcp/*` styres av API-nøkler med `manage`-omfang; `/api/cli-tools/runtime/*` forblir strengt begrenset til loopback. Se ROUTE_GUARD_TIERS |
| **MCP-omfang**                    | 32 detaljerte omfang (read:health, write:combos, execute:completions osv.) — se `docs/frameworks/MCP-SERVER.md`                                                    |

### 🛡️ Kryptering av lagrede data

Alle sensitive data som lagres i SQLite, krypteres med **AES-256-GCM** med scrypt-basert nøkkelavledning:

- API-nøkler, tilgangstokener, oppdateringstokener og ID-tokener
- Versjonert format: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Direktegjennomgangsmodus (klartekst) når `STORAGE_ENCRYPTION_KEY` ikke er angitt

```bash
# Generer krypteringsnøkkel:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Rammeverk for sikkerhetsmekanismer

OmniRoute leveres med et **register for sikkerhetsmekanismer** som kan lastes inn på nytt uten omstart (`src/lib/guardrails/`), med 3 innebygde sikkerhetsmekanismer sortert etter prioritet:

| Sikkerhetsmekanisme | Prioritet | Formål                                                                                                     |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `vision-bridge`     | 5         | Kobler modeller uten synsfunksjoner til bildebevisste beskrivelser; SSRF-beskyttelse for bildenettadresser |
| `pii-masker`        | 10        | PII-sladding før og etter kall (e-post, telefon, CPF, CNPJ, kredittkort, SSN)                              |
| `prompt-injection`  | 20        | Oppdager mønstre for overstyring, rollekapring, jailbreak og lekkasje                                      |

Egendefinerte sikkerhetsmekanismer registreres via `registerGuardrail(new MyGuardrail())`. Modellen er fail-open (unntak blokkerer aldri trafikk). Reservasjon per forespørsel via `x-omniroute-disabled-guardrails`-headeren. → Se [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Beskyttelse mot promptinjeksjon

Heuristisk mellomvare som etter beste evne oppdager mønstre for promptinjeksjon i LLM-forespørsler.
**Ikke en komplett brannmur mot promptinjeksjon** — kan gi falske positiver (ufarlige
persona-/rollespillprompter) og falske negativer (leetspeak, mellomrom, ikke-engelske mønstre).

| Mønstertype          | Alvorlighetsgrad | Eksempel                                          |
| -------------------- | ---------------- | ------------------------------------------------- |
| Systemoverstyring    | Høy              | "ignorer alle tidligere instruksjoner"            |
| Rollekapring         | Middels          | "du er nå DAN, du kan gjøre hva som helst"        |
| Skilletegninjeksjon  | Høy              | Kodede skilletegn for å bryte kontekstgrenser     |
| DAN/Jailbreak        | Middels          | Kjente mønstre for jailbreak-prompter             |
| Instruksjonslekkasje | Høy              | "vis meg systemprompten din"                      |
| Kodingsomgåelse      | Middels          | base64/rot13/hex-dekoding + instruksjonsnøkkelord |

Bare deteksjoner med **høy** alvorlighetsgrad blokkeres i `block`-modus. Familier med middels
alvorlighetsgrad logges, men blokkeres aldri av `sanitizeRequest`.

Konfigurer via kontrollpanelet (Innstillinger → Sikkerhet) eller `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (injeksjonspolicy; eldre "redact" fjerner ikke injeksjonstekst)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (standard) | medium | low — alvorlighetsgrader på/over dette blokkeres i block-modus
```

### 🔒 Sladding av PII

Automatisk oppdagelse og valgfri sladding av personidentifiserende informasjon:

| PII-type      | Mønster               | Erstatning         |
| ------------- | --------------------- | ------------------ |
| E-post        | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Brasil)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Brasil) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Kredittkort   | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Telefon       | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (USA)     | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # omskriv PII i forespørsler; uavhengig av INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # valgfritt: sladd PII i leverandørsvar som returneres til klienter
```

### 🌐 Nettverkssikkerhet

| Funksjon                  | Beskrivelse                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **CORS**                  | Eksplisitt tillatelsesliste på tvers av opprinnelser (`CORS_ALLOWED_ORIGINS`; eldre `CORS_ORIGIN`) |
| **IP-filtrering**         | Tillatelses-/blokkeringslister for IP-områder i kontrollpanelet                                    |
| **Hastighetsbegrensning** | Hastighetsgrenser per leverandør med automatisk tilbakeventing                                     |
| **Anti-Thundering Herd**  | Mutex + låsing per tilkobling forhindrer kaskader av 502-feil                                      |
| **TLS-fingeravtrykk**     | Nettleserlignende forfalskning av TLS-fingeravtrykk for å redusere botdeteksjon                    |
| **CLI-fingeravtrykk**     | Rekkefølge på hoder/brødtekst per leverandør for å samsvare med opprinnelige CLI-signaturer        |

### 🔌 Robusthet og tilgjengelighet

| Funksjon                         | Beskrivelse                                                             |
| -------------------------------- | ----------------------------------------------------------------------- |
| **Kretsbryter**                  | 3 tilstander (Lukket → Åpen → Halvåpen) per leverandør, lagret i SQLite |
| **Forespørselsidempotens**       | 5-sekunders dedupliseringsvindu for dupliserte forespørsler             |
| **Eksponentiell tilbakeventing** | Automatisk nytt forsøk med økende forsinkelser                          |
| **Helsekontrollpanel**           | Sanntidsovervåking av leverandørstatus                                  |

### 📋 Samsvar

| Funksjon                    | Beskrivelse                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| **Loggoppbevaring**         | Automatisk opprydding etter `CALL_LOG_RETENTION_DAYS`              |
| **Reservasjon mot logging** | `noLog`-flagg per API-nøkkel deaktiverer logging av forespørsler   |
| **Revisjonslogg**           | Administrative handlinger spores i tabellen `audit_log`            |
| **MCP-revisjon**            | SQLite-basert revisjonslogging for alle MCP-verktøykall            |
| **Zod-validering**          | Alle API-inndata valideres med Zod v4-skjemaer ved modulinnlasting |

---

## Påkrevde miljøvariabler

Alle hemmeligheter må angis før serveren startes. Serveren vil **avslutte umiddelbart** hvis de mangler eller er svake.

```bash
# PÅKREVD — serveren starter ikke uten disse:
JWT_SECRET=$(openssl rand -base64 48)     # minst 32 tegn
API_KEY_SECRET=$(openssl rand -hex 32)    # minst 16 tegn

# ANBEFALT — aktiverer kryptering av lagrede data:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Serveren avviser aktivt kjente svake verdier som `changeme`, `secret` eller `password`.

---

## Docker-sikkerhet

- Bruk en bruker uten root-tilgang i produksjon
- Monter hemmeligheter som skrivebeskyttede volumer
- Kopier aldri `.env`-filer inn i Docker-avbildninger
- Bruk `.dockerignore` for å utelate sensitive filer
- Angi `AUTH_COOKIE_SECURE=true` ved bruk bak HTTPS

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

## Avhengigheter

- Kjør `npm audit` regelmessig (`npm run audit:deps` dekker hoveddelen + electron)
- Hold avhengighetene oppdatert
- Prosjektet bruker `husky` + `lint-staged` for kontroller før innsjekking (lint-staged + check-docs-sync + check:any-budget:t11)
- CI-prosessen kjører ESLint-sikkerhetsregler ved hver push (`no-eval`, `no-implied-eval`, `no-new-func` = feil)
- Leverandørkonstanter valideres ved modulinnlasting via Zod (`src/shared/validation/schemas.ts`)
- Biblioteker som er sikre som standard: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (ingen risiko for SQL-injeksjon ved bruk av parameteriserte spørringer), `bcryptjs` (passordhashing)

## Ufravikelige sikkerhetsregler

Disse reglene håndheves av verktøy og fagfeller:

1. **Aldri sjekk inn hemmeligheter** — `.env` ignoreres av git; `.env.example` er malen (ingen literalverdier, kun kommentarer — se PUBLIC_CREDS.md nedenfor)
2. **Bruk aldri `eval()`, `new Function()` eller implisitt eval** — håndheves av ESLint
3. **Omgå aldri Husky-hooks** (`--no-verify`, `--no-gpg-sign`) uten uttrykkelig godkjenning fra operatøren
4. **Skriv aldri rå SQL i ruter** — gå alltid gjennom `src/lib/db/` (parameterisert)
5. **Valider alltid inndata med Zod** — `src/shared/validation/schemas.ts`
6. **Rens alltid headere fra oppstrømskilder** — blokkeringsliste i `src/shared/constants/upstreamHeaders.ts`
7. **Krypter legitimasjon ved lagring** — AES-256-GCM via `src/lib/db/encryption.ts`
8. **Offentlige OAuth-identifikatorer for oppstrømstjenester via `resolvePublicCred()`** — bygg aldri inn literalverdier av typen `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` i kildekoden. Se [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Feilsvar gjennom `buildErrorBody()` / `sanitizeErrorMessage()`** — legg aldri rå `err.stack` / `err.message` i svartekster for HTTP / SSE / executor / MCP. Se [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Kjøretidsverdier for `exec()` / `spawn()` via alternativet `env`** — interpoler aldri eksterne filbaner eller uklarerte verdier som strenger i skript som sendes til skallet. Referanse: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Foretrekk biblioteker som er sikre som standard** — se [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Bruk dem før du lager din egen løsning.

## Funn fra forsyningskjedeskannere (Socket.dev / Snyk / lignende)

> **Merknad om omfang:** `socket.yml` i rotkatalogen til repositoriet angir kun `projectIgnorePaths` for Socket.devs registerbaserte skanning av den publiserte npm-artefakten etter publisering — den fungerer ikke som en obligatorisk CI-/PR-flettingssperre. Ingen arbeidsflyt i `.github/workflows`, ingen `package.json`-skript og ingen `Makefile`-mål kjører Socket.dev.

Den publiserte npm-artefakten `omniroute` inkluderer Next.js-bygget med `output: "standalone"`, noe som betyr at hver rutebehandler — inkludert dokumenterte privilegerte funksjoner (MITM, Zed-import, Cloud Sync og innebygd tjenesteovervåker) — havner i minifiserte fragmenter under `.next/server/*.js`. Heuristiske forsyningskjedeskannere samsvarer ofte mønstre i disse fragmentene med skadevaresignaturer.

Skannerkonfigurasjonen vi bruker, finnes i [`socket.yml`](socket.yml) i rotkatalogen til repositoriet (Socket.dev GitHub App-format v2 — se <https://docs.socket.dev/docs/socket-yml>). Den ekskluderer eksplisitt kataloger som ikke distribueres (`tests/`, `_tasks/`, `_references/`, `_ideia/`, `_mono_repo/`, `docs/` osv.), slik at skanneren kun rapporterer kodebaner som faktisk når publiserte brukere — selve skanningen utføres av Socket GitHub App, som leser denne filen, ikke av en arbeidsflyt i dette repositoriet.

For hver funnkategori vedlikeholder vi en bekreftelse fra vedlikeholderen for hvert enkelt funn:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  kartlegging per funn: kildefil ↔ flagget fragment ↔ virkemåte ↔ risikoreduserende tiltak
  anvendt i v3.8.6.
- `SECURITY-AUDITOR-NOTE:`-blokker i kildekoden ved hver flaggede funksjon
  peker tilbake til det samme dokumentet.

For brukere med en pipeline som ikke kan lempe på varselet: bygg med
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Dette erstatter de fire
sensitive modulene med stubber som returnerer HTTP 503 `feature-disabled`
under kjøring, slik at de privilegerte kodebanene fysisk er utelatt fra pakken.
Se [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
for publiseringsoppskriften.

## Referanser

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — autorisasjonspipeline
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — rammeverk for sikkerhetsmekanismer
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — revisjonslogg og oppbevaring
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — **obligatorisk** mønster for offentlig oppstrømslegitimasjon
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — **obligatorisk** mønster for feilsvar
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — vedlikeholderbekreftelse for funn fra forsyningskjedeskannere
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — effektbryter + nedkjølingsperiode + utestenging
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS-fingeravtrykk (juridisk/etisk merknad)
- [`CLAUDE.md`](CLAUDE.md) — ufravikelige regler for KI-agenter
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — kuratert samling av biblioteker med sikre standardinnstillinger
