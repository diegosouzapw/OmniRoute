# Feilsøking

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Vanlige problemer og løsninger for OmniRoute.

---

## Hurtigrettinger

| Problem                                | Løsning                                                              |
| -------------------------------------- | -------------------------------------------------------------------- |
| Første pålogging fungerer ikke         | Sjekk `INITIAL_PASSWORD` i `.env` (standard: `123456`)               |
| Dashboard åpnes på feil port           | Sett `PORT=20128` og `NEXT_PUBLIC_BASE_URL=http://localhost:20128`   |
| Ingen forespørselslogger under `logs/` | Sett `ENABLE_REQUEST_LOGS=true`                                      |
| EACCES: tillatelse nektet              | Sett `DATA_DIR=/path/to/writable/dir` til å overstyre `~/.omniroute` |
| Rutingstrategi lagrer ikke             | Oppdater til v1.4.11+ (Zod-skjemafiks for varighet av innstillinger) |

---

## Leverandørproblemer

### "Språkmodellen ga ikke meldinger"

**Årsak:** Leverandørkvoten er oppbrukt.

**Fiks:**

1. Sjekk dashbordkvotesporing
2. Bruk en kombinasjon med reservelag
3. Bytt til billigere/gratis lag

### Satsbegrensning

**Årsak:** Abonnementskvoten er oppbrukt.

**Fiks:**

- Legg til reserve: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Bruk GLM/MiniMax som billig backup

### OAuth-token utløpt

OmniRoute oppdaterer tokens automatisk. Hvis problemene vedvarer:

1. Dashboard → Leverandør → Koble til på nytt
2. Slett og legg til leverandørtilkoblingen på nytt

---

## Skyproblemer

### Skysynkroniseringsfeil

1. Bekreft `BASE_URL` poeng til løpeforekomsten din (f.eks. `http://localhost:20128`)
2. Bekreft `CLOUD_URL` poeng til skyendepunktet ditt (f.eks. `https://omniroute.dev`)
3. Hold `NEXT_PUBLIC_*` verdier på linje med verdiene på tjenersiden

### Cloud `stream=false` Returnerer 500

**Symptom:** `Unexpected token 'd'...` på nettskyendepunkt for samtaler som ikke strømmer.

**Årsak:** Oppstrøms returnerer SSE-nyttelast mens klienten forventer JSON.

**Løsning:** Bruk `stream=true` for direkte sky-anrop. Lokal kjøretid inkluderer SSE→JSON reserve.

### Cloud sier tilkoblet, men "Ugyldig API-nøkkel"

1. Lag en ny nøkkel fra lokalt dashbord (`/api/keys`)
2. Kjør skysynkronisering: Aktiver Cloud → Synkroniser nå
3. Gamle/ikke-synkroniserte nøkler kan fortsatt returnere `401` på skyen

---

## Docker-problemer

### CLI-verktøyet viser ikke installert

1. Sjekk kjøretidsfelt: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. For bærbar modus: bruk bildemål `runner-cli` (medfølgende CLI-er)
3. For vertsmonteringsmodus: sett `CLI_EXTRA_PATHS` og monter vertsbokskatalogen som skrivebeskyttet
4. Hvis `installed=true` og `runnable=false`: binær ble funnet, men mislyktes i helsesjekken

### Rask kjøretidsvalidering

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Kostnadsproblemer

### Høye kostnader

1. Sjekk bruksstatistikk i Dashboard → Bruk
2. Bytt primærmodell til GLM/MiniMax
3. Bruk gratis nivå (Gemini CLI, iFlow) for ikke-kritiske oppgaver
4. Angi kostnadsbudsjetter per API-nøkkel: Dashboard → API-nøkler → Budsjett

---

## Feilsøking

### Aktiver forespørselslogger

Sett `ENABLE_REQUEST_LOGS=true` i filen `.env`. Logger vises under katalogen `logs/`.

### Sjekk leverandørens helse

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hovedtilstand: `${DATA_DIR}/db.json` (leverandører, kombinasjoner, aliaser, nøkler, innstillinger)
- Bruk: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Forespørselslogger: `<repo>/logs/...` (når `ENABLE_REQUEST_LOGS=true`)

---

## Strømbryterproblemer

### Leverandøren sitter fast i ÅPEN tilstand

Når en leverandørs strømbryter er ÅPEN, blokkeres forespørsler til nedkjølingen utløper.

**Fiks:**

1. Gå til **Dashboard → Innstillinger → Resiliens**
2. Sjekk kretsbryterkortet for den berørte leverandøren
3. Klikk på **Tilbakestill alle** for å fjerne alle brytere, eller vent til nedkjølingen utløper
4. Bekreft at leverandøren faktisk er tilgjengelig før du tilbakestiller

### Leverandøren fortsetter å utløse strømbryteren

Hvis en leverandør gjentatte ganger går inn i ÅPEN tilstand:

1. Sjekk **Dashboard → Helse → Leverandørhelse** for feilmønsteret
2. Gå til **Innstillinger → Resiliens → Leverandørprofiler** og øk feilterskelen
3. Sjekk om leverandøren har endret API-grenser eller krever re-autentisering
4. Se gjennom latenstidstelemetri – høy latenstid kan forårsake timeout-baserte feil

---

## Problemer med lydtranskripsjon

### "Ustøttet modell"-feil

- Sørg for at du bruker riktig prefiks: `deepgram/nova-3` eller `assemblyai/best`
- Bekreft at leverandøren er tilkoblet i **Dashboard → Leverandører**

### Transkripsjon returnerer tom eller mislykkes

- Sjekk støttede lydformater: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Bekreft at filstørrelsen er innenfor leverandørens grenser (vanligvis < 25 MB)
- Sjekk gyldigheten av leverandørens API-nøkkel i leverandørkortet

---

## Oversetter feilsøking

Bruk **Dashboard → Oversetter** for å feilsøke problemer med formatoversettelse:

| Modus            | Når skal du bruke                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Lekeplass**    | Sammenlign input/output formater side ved side — lim inn en mislykket forespørsel for å se hvordan den oversettes |
| **Chattetester** | Send direktemeldinger og inspiser hele nyttelasten for forespørsel/svar inkludert overskrifter                    |
| **Testbenk**     | Kjør batch-tester på tvers av formatkombinasjoner for å finne hvilke oversettelser som er ødelagte                |
| **Live Monitor** | Se forespørselsflyt i sanntid for å fange opp periodiske oversettelsesproblemer                                   |

### Vanlige formatproblemer

- **Tenkekoder vises ikke** — Sjekk om målleverandøren støtter tenkning og innstillingen av tenkebudsjettet
- **Verktøyanrop dropper** — Noen formatoversettelser kan fjerne felt som ikke støttes; verifisere i Playground-modus
- **Systemmelding mangler** — Claude og Gemini håndterer systemmeldinger annerledes; sjekk oversettelsen
- **SDK returnerer rå streng i stedet for objekt** — Rettet i v1.1.0: svarrenser fjerner nå ikke-standard felt (`x_groq`, `usage_breakdown`, etc.) som forårsaker OpenAI SDK Pydantic valideringsfeil
- **GLM/ERNIE avviser rollen `system`** — Rettet i v1.1.0: rollenormalisering slår automatisk sammen systemmeldinger til brukermeldinger for inkompatible modeller
- **`developer` rolle ikke gjenkjent** — Rettet i v1.1.0: automatisk konvertert til `system` for ikke-OpenAI-leverandører
- **`json_schema` fungerer ikke med Gemini** — Rettet i v1.1.0: `response_format` er nå konvertert til Geminis `responseMimeType` + `responseSchema`

---

## Resiliensinnstillinger

### Auto rate-limit utløses ikke

- Automatisk takstgrense gjelder bare API-nøkkelleverandører (ikke OAuth/abonnement)
- Bekreft at **Innstillinger → Resiliens → Leverandørprofiler** har aktivert automatisk satsgrense
- Sjekk om leverandøren returnerer `429` statuskoder eller `Retry-After` overskrifter

### Tuning eksponentiell backoff

Leverandørprofiler støtter disse innstillingene:

- **Basisforsinkelse** — Innledende ventetid etter første feil (standard: 1 s)
- **Maks. forsinkelse** — Maksimal ventetid (standard: 30s)
- **Multiplikator** — Hvor mye skal forsinkelsen økes per påfølgende feil (standard: 2x)

### Anti-tordenflokk

Når mange samtidige forespørsler treffer en hastighetsbegrenset leverandør, bruker OmniRoute mutex + automatisk hastighetsbegrensning for å serialisere forespørsler og forhindre kaskadefeil. Dette er automatisk for API-nøkkelleverandører.

---

## Fortsatt fast?

- **GitHub-problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arkitektur**: Se [link](ARCHITECTURE.md) for interne detaljer
- **API-referanse**: Se [link](API_REFERENCE.md) for alle endepunkter
- **Helse Dashboard**: Sjekk **Dashboard → Health** for sanntids systemstatus
- **Oversetter**: Bruk **Dashboard → Oversetter** for å feilsøke formatproblemer
