# Fejlfinding

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Almindelige problemer og løsninger til OmniRoute.

---

## Hurtige rettelser

| Problem                                | Løsning                                                                     |
| -------------------------------------- | --------------------------------------------------------------------------- |
| Første login virker ikke               | Tjek `INITIAL_PASSWORD` i `.env` (standard: `123456`)                       |
| Dashboard åbner ved forkert port       | Sæt `PORT=20128` og `NEXT_PUBLIC_BASE_URL=http://localhost:20128`           |
| Ingen anmodningslogfiler under `logs/` | Sæt `ENABLE_REQUEST_LOGS=true`                                              |
| EACCES: tilladelse nægtet              | Indstil `DATA_DIR=/path/to/writable/dir` til at tilsidesætte `~/.omniroute` |
| Routingstrategi gemmer ikke            | Opdatering til v1.4.11+ (Zod-skemafix for indstillinger persistens)         |

---

## Udbyderproblemer

### "Sprogmodellen leverede ikke beskeder"

**Årsag:** Udbyderkvoten er opbrugt.

**Ret:**

1. Tjek dashboard kvotesporing
2. Brug en kombination med reserveniveauer
3. Skift til billigere/gratis niveau

### Satsbegrænsende

**Årsag:** Abonnementskvoten er opbrugt.

**Ret:**

- Tilføj reserve: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Brug GLM/MiniMax som billig backup

### OAuth-token er udløbet

OmniRoute opdaterer automatisk tokens. Hvis problemerne fortsætter:

1. Dashboard → Udbyder → Genopret forbindelse
2. Slet og tilføj udbyderforbindelsen igen

---

## Skyproblemer

### Cloud Sync-fejl

1. Bekræft `BASE_URL` point til din løbeforekomst (f.eks. `http://localhost:20128`)
2. Bekræft `CLOUD_URL` punkter til dit cloud-endepunkt (f.eks. `https://omniroute.dev`)
3. Hold `NEXT_PUBLIC_*` værdier på linje med værdier på serversiden

### Cloud `stream=false` Returnerer 500

**Symptom:** `Unexpected token 'd'...` på cloud-endepunkt til ikke-streamingopkald.

**Årsag:** Upstream returnerer SSE-nyttelast, mens klienten forventer JSON.

**Løsning:** Brug `stream=true` til direkte skyopkald. Lokal kørselstid inkluderer SSE→JSON fallback.

### Cloud siger tilsluttet, men "Ugyldig API-nøgle"

1. Opret en ny nøgle fra det lokale dashboard (`/api/keys`)
2. Kør skysynkronisering: Aktiver sky → Synkroniser nu
3. Gamle/ikke-synkroniserede nøgler kan stadig returnere `401` på skyen

---

## Docker-problemer

### CLI-værktøj viser ikke installeret

1. Tjek runtime-felter: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. For bærbar tilstand: brug billedmål `runner-cli` (bundtede CLI'er)
3. For værtsmonteringstilstand: Indstil `CLI_EXTRA_PATHS` og monter værtsbin-mappen som skrivebeskyttet
4. Hvis `installed=true` og `runnable=false`: binær blev fundet, men helbredstjekket mislykkedes

### Hurtig runtime-validering

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Omkostningsproblemer

### Høje omkostninger

1. Tjek brugsstatistik i Dashboard → Brug
2. Skift primær model til GLM/MiniMax
3. Brug gratis niveau (Gemini CLI, iFlow) til ikke-kritiske opgaver
4. Indstil omkostningsbudgetter pr. API-nøgle: Dashboard → API-nøgler → Budget

---

## Fejlretning

### Aktiver anmodningslogfiler

Indstil `ENABLE_REQUEST_LOGS=true` i din `.env` fil. Logfiler vises under biblioteket `logs/`.

### Tjek udbyderens helbred

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hovedtilstand: `${DATA_DIR}/db.json` (udbydere, kombinationer, aliaser, nøgler, indstillinger)
- Anvendelse: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Anmodningslogfiler: `<repo>/logs/...` (når `ENABLE_REQUEST_LOGS=true`)

---

## Circuit Breaker Problemer

### Udbyder sidder fast i ÅBEN tilstand

Når en udbyders afbryder er ÅBEN, blokeres anmodninger, indtil nedkølingen udløber.

**Ret:**

1. Gå til **Dashboard → Indstillinger → Resiliens**
2. Tjek afbryderkortet for den berørte udbyder
3. Klik på **Nulstil alle** for at rydde alle afbrydere, eller vent på, at nedkølingen udløber
4. Bekræft, at udbyderen faktisk er tilgængelig, før du nulstiller

### Udbyderen bliver ved med at udløse strømafbryderen

Hvis en udbyder gentagne gange går i ÅBEN tilstand:

1. Tjek **Dashboard → Health → Provider Health** for fejlmønsteret
2. Gå til **Indstillinger → Resiliens → Udbyderprofiler** og øg fejltærsklen
3. Tjek, om udbyderen har ændret API-grænser eller kræver gengodkendelse
4. Gennemgå latency-telemetri — høj latenstid kan forårsage timeout-baserede fejl

---

## Problemer med lydtransskription

### "Ikke-understøttet model" fejl

- Sørg for, at du bruger det korrekte præfiks: `deepgram/nova-3` eller `assemblyai/best`
- Bekræft, at udbyderen er tilsluttet i **Dashboard → Udbydere**

### Transskription returnerer tom eller mislykkes

- Tjek understøttede lydformater: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Bekræft filstørrelsen er inden for udbyderens grænser (typisk < 25 MB)
- Tjek gyldigheden af udbyderens API-nøgle på udbyderkortet

---

## Oversætter-fejlretning

Brug **Dashboard → Oversætter** til at fejlfinde problemer med formatoversættelse:

| Tilstand         | Hvornår skal man bruge                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **Legeplads**    | Sammenlign input/output-formater side om side — indsæt en mislykket anmodning for at se, hvordan den oversættes |
| **Chattester**   | Send livebeskeder og inspicer den fulde anmodnings-/svarnyttelast inklusive overskrifter                        |
| **Testbænk**     | Kør batchtest på tværs af formatkombinationer for at finde ud af, hvilke oversættelser der er brudte            |
| **Live Monitor** | Se anmodningsflow i realtid for at fange periodiske oversættelsesproblemer                                      |

### Almindelige formatproblemer

- **Tænke-tags vises ikke** — Tjek, om måludbyderen understøtter tænkning og indstilling af tænkebudget
- **Værktøjsopkald falder** — Nogle formatoversættelser kan fjerne ikke-understøttede felter; verificere i Playground-tilstand
- **Systemprompt mangler** — Claude og Gemini håndterer systemprompts forskelligt; kontrollere oversættelsesoutput
- **SDK returnerer rå streng i stedet for objekt** — Rettet i v1.1.0: Response Sanizer fjerner nu ikke-standardfelter (`x_groq`, `usage_breakdown` osv.), der forårsager OpenAI SDK Pydantic valideringsfejl
- **GLM/ERNIE afviser `system` rolle** — Rettet i v1.1.0: Rollenormalisering flettes automatisk systemmeddelelser ind i brugermeddelelser for inkompatible modeller
- **`developer` rolle ikke genkendt** — Rettet i v1.1.0: automatisk konverteret til `system` for ikke-OpenAI-udbydere
- **`json_schema` virker ikke med Gemini** — Rettet i v1.1.0: `response_format` er nu konverteret til Gemini's `responseMimeType` + `responseSchema`

---

## Resiliensindstillinger

### Automatisk hastighedsgrænse udløses ikke

- Automatisk hastighedsgrænse gælder kun for API-nøgleudbydere (ikke OAuth/abonnement)
- Bekræft, at **Indstillinger → Modstandsdygtighed → Udbyderprofiler** har aktiveret automatisk satsgrænse
- Tjek, om udbyderen returnerer `429` statuskoder eller `Retry-After` overskrifter

### Tuning eksponentiel backoff

Udbyderprofiler understøtter disse indstillinger:

- **Base delay** — Indledende ventetid efter første fejl (standard: 1s)
- **Maksimal forsinkelse** — Maksimal ventetid (standard: 30s)
- **Multiplikator** — Hvor meget skal forsinkelsen øges pr. på hinanden følgende fejl (standard: 2x)

### Anti-tordenbesætning

Når mange samtidige anmodninger rammer en hastighedsbegrænset udbyder, bruger OmniRoute mutex + automatisk hastighedsbegrænsning til at serialisere anmodninger og forhindre kaskadefejl. Dette er automatisk for API-nøgleudbydere.

---

## Stadig fast?

- **GitHub-problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arkitektur**: Se [**OMNI_TOKEN_55**](ARCHITECTURE.md) for interne detaljer
- **API-reference**: Se [**OMNI_TOKEN_56**](API_REFERENCE.md) for alle endepunkter
- **Health Dashboard**: Tjek **Dashboard → Health** for systemstatus i realtid
- **Oversætter**: Brug **Dashboard → Oversætter** til at fejlsøge formatproblemer
