# Felsökning

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Vanliga problem och lösningar för OmniRoute.

---

## Snabbfixar

| Problem                               | Lösning                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------- |
| Första inloggningen fungerar inte     | Markera `INITIAL_PASSWORD` i `.env` (standard: `123456`)                    |
| Instrumentpanelen öppnas vid fel port | Ställ in `PORT=20128` och `NEXT_PUBLIC_BASE_URL=http://localhost:20128`     |
| Inga förfrågningsloggar under `logs/` | Set `ENABLE_REQUEST_LOGS=true`                                              |
| EACCES: tillstånd nekad               | Ställ in `DATA_DIR=/path/to/writable/dir` för att åsidosätta `~/.omniroute` |
| Routingstrategi sparas inte           | Uppdatering till v1.4.11+ (Zod-schemafix för inställningsbeständighet)      |

---

## Leverantörsproblem

### "Språkmodellen gav inga meddelanden"

**Orsak:** Leverantörskvoten är slut.

**Åtgärda:**

1. Kontrollera instrumentpanelens kvotspårare
2. Använd en kombination med reservnivåer
3. Byt till billigare/gratis nivå

### Prisbegränsande

**Orsak:** Prenumerationskvoten är slut.

**Åtgärda:**

- Lägg till reserv: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Använd GLM/MiniMax som billig backup

### OAuth-token har löpt ut

OmniRoute uppdaterar automatiskt tokens. Om problemen kvarstår:

1. Instrumentpanel → Leverantör → Återanslut
2. Ta bort och lägg till leverantörsanslutningen igen

---

## Molnproblem

### Cloud Sync-fel

1. Verifiera att `BASE_URL` pekar på din löpinstans (t.ex. `http://localhost:20128`)
2. Verifiera `CLOUD_URL` punkter till din molnslutpunkt (t.ex. `https://omniroute.dev`)
3. Håll `NEXT_PUBLIC_*`-värdena i linje med värden på serversidan

### Cloud `stream=false` Returnerar 500

**Symptom:** `Unexpected token 'd'...` på molnets slutpunkt för icke-strömmande samtal.

**Orsak:** Uppströms returnerar SSE-nyttolast medan klienten förväntar sig JSON.

**Lösning:** Använd `stream=true` för direkta molnsamtal. Lokal körtid inkluderar SSE→JSON reserv.

### Cloud säger ansluten men "Ogiltig API-nyckel"

1. Skapa en ny nyckel från den lokala instrumentpanelen (`/api/keys`)
2. Kör molnsynkronisering: Aktivera moln → Synkronisera nu
3. Gamla/icke-synkroniserade nycklar kan fortfarande returnera `401` på molnet

---

## Docker-problem

### CLI-verktyget visar inte installerat

1. Kontrollera körtidsfält: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. För portabelt läge: använd bildmål `runner-cli` (buntade CLI)
3. För värdmonteringsläge: ställ in `CLI_EXTRA_PATHS` och montera host bin-katalogen som skrivskyddad
4. Om `installed=true` och `runnable=false`: binär hittades men misslyckades med hälsokontrollen

### Snabb körtidsvalidering

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Kostnadsfrågor

### Höga kostnader

1. Kontrollera användningsstatistik i Dashboard → Användning
2. Byt primärmodell till GLM/MiniMax
3. Använd gratis nivå (Gemini CLI, iFlow) för icke-kritiska uppgifter
4. Ställ in kostnadsbudgetar per API-nyckel: Dashboard → API-nycklar → Budget

---

## Felsökning

### Aktivera förfrågningsloggar

Ställ in `ENABLE_REQUEST_LOGS=true` i din `.env`-fil. Loggar visas under katalogen `logs/`.

### Kontrollera leverantörens hälsa

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Huvudstatus: `${DATA_DIR}/db.json` (leverantörer, kombinationer, alias, nycklar, inställningar)
- Användning: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Begäran loggar: `<repo>/logs/...` (när `ENABLE_REQUEST_LOGS=true`)

---

## Problem med strömbrytare

### Leverantören har fastnat i ÖPPET läge

När en leverantörs strömbrytare är ÖPPEN, blockeras förfrågningar tills nedkylningen går ut.

**Åtgärda:**

1. Gå till **Dashboard → Inställningar → Resilience**
2. Kontrollera strömbrytarkortet för den berörda leverantören
3. Klicka på **Återställ alla** för att rensa alla brytare, eller vänta tills nedkylningen löper ut
4. Kontrollera att leverantören faktiskt är tillgänglig innan du återställer

### Leverantören löser ut strömbrytaren hela tiden

Om en leverantör upprepade gånger går in i ÖPPET läge:

1. Kontrollera **Dashboard → Health → Provider Health** för felmönstret
2. Gå till **Inställningar → Resiliens → Leverantörsprofiler** och höj feltröskeln
3. Kontrollera om leverantören har ändrat API-gränser eller kräver omautentisering
4. Granska latenstelemetri — hög latens kan orsaka timeoutbaserade fel

---

## Ljudtranskriptionsproblem

### Felet "Modellen stöds inte".

- Se till att du använder rätt prefix: `deepgram/nova-3` eller `assemblyai/best`
- Kontrollera att leverantören är ansluten i **Dashboard → Leverantörer**

### Transkription returnerar tom eller misslyckas

- Kontrollera ljudformat som stöds: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Kontrollera att filstorleken ligger inom leverantörens gränser (vanligtvis < 25 MB)
- Kontrollera giltigheten av leverantörens API-nyckel i leverantörskortet

---

## Översättarfelsökning

Använd **Dashboard → Översättare** för att felsöka formatöversättningsproblem:

| Läge             | När ska man använda                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| **Lekplats**     | Jämför in-/utdataformat sida vid sida — klistra in en misslyckad begäran för att se hur den översätts |
| **Chatttestare** | Skicka livemeddelanden och inspektera hela nyttolasten för begäran/svar inklusive rubriker            |
| **Testbänk**     | Kör batchtester över formatkombinationer för att hitta vilka översättningar som är trasiga            |
| **Live Monitor** | Se förfrågningsflödet i realtid för att fånga intermittenta översättningsproblem                      |

### Vanliga formatproblem

- **Tänketaggar visas inte** — Kontrollera om målleverantören stöder tänkande och inställningen av tänkande budget
- **Verktygsanrop avbryts** — Vissa formatöversättningar kan ta bort fält som inte stöds; verifiera i Playground-läge
- **Systemprompt saknas** — Claude och Gemini hanterar systemprompter på olika sätt; kontrollera översättningsutdata
- **SDK returnerar obearbetad sträng istället för objekt** — Fixat i v1.1.0: Response Sanizer tar nu bort icke-standardiserade fält (`x_groq`, `usage_breakdown`, etc.) som orsakar OpenAI SDK Pydantic valideringsfel
- **GLM/ERNIE avvisar rollen `system`** — Fixat i v1.1.0: rollnormaliseraren slår automatiskt samman systemmeddelanden till användarmeddelanden för inkompatibla modeller
- **`developer` roll inte igenkänd** — Fixad i v1.1.0: konverteras automatiskt till `system` för icke-OpenAI-leverantörer
- **`json_schema` fungerar inte med Gemini** — Fixat i v1.1.0: `response_format` har nu konverterats till Geminis `responseMimeType` + `responseSchema`

---

## Resiliensinställningar

### Den automatiska hastighetsgränsen utlöses inte

- Automatisk hastighetsgräns gäller endast API-nyckelleverantörer (inte OAuth/prenumeration)
- Verifiera att **Inställningar → Motståndskraft → Leverantörsprofiler** har aktiverat automatisk hastighetsgräns
- Kontrollera om leverantören returnerar `429` statuskoder eller `Retry-After` rubriker

### Tuning exponentiell backoff

Leverantörsprofiler stöder dessa inställningar:

- **Basfördröjning** — Initial väntetid efter första fel (standard: 1 s)
- **Max fördröjning** — Maximalt väntetidstak (standard: 30s)
- **Multiplikator** — Hur mycket ska fördröjningen öka per på varandra följande fel (standard: 2x)

### Anti-dundrande flock

När många samtidiga förfrågningar träffar en hastighetsbegränsad leverantör, använder OmniRoute mutex + automatisk hastighetsbegränsning för att serialisera förfrågningar och förhindra kaskadfel. Detta är automatiskt för API-nyckelleverantörer.

---

## Fortfarande fast?

- **GitHub-problem**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arkitektur**: Se [**OMNI_TOKEN_55**](ARCHITECTURE.md) för interna detaljer
- **API-referens**: Se [**OMNI_TOKEN_56**](API_REFERENCE.md) för alla slutpunkter
- **Hälsa Dashboard**: Kontrollera **Dashboard → Health** för systemstatus i realtid
- **Översättare**: Använd **Dashboard → Översättare** för att felsöka formatproblem
