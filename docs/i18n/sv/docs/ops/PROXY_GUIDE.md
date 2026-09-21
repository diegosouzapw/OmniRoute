# 🌐 OmniRoute Proxy Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Kringgå geografiska blockeringar, skydda din identitet och dirigera AI-trafik genom valfri proxy — helt utan komplicerad konfiguration.**

OmniRoute innehåller ett fullfjädrat proxyhanteringssystem som låter dig dirigera trafik till externa AI-leverantörer genom HTTP-, HTTPS- eller SOCKS5-proxyservrar. Oavsett om du befinner dig i en blockerad region, behöver IP-rotation eller vill använda svårupptäckt fingerprinting — den här guiden beskriver allt.

---

## Innehållsförteckning

- [Varför använda proxyservrar?](#why-use-proxies)
- [Arkitekturöversikt](#architecture-overview)
- [Proxysystem med fyra nivåer](#4-level-proxy-system)
- [Proxyregister (CRUD)](#proxy-registry-crud)
- [1proxys kostnadsfria marknadsplats](#1proxy-free-proxy-marketplace)
- [Proxyrotation](#proxy-rotation)
- [Skydd mot identifiering och smygläge](#anti-detection--stealth)
- [Proxylägen för externa anslutningar](#upstream-proxy-modes)
- [Instrumentpanelens gränssnitt](#dashboard-ui)
- [API-referens](#api-reference)
- [Miljövariabler](#environment-variables)
- [Felsökning](#troubleshooting)

---

## Varför använda proxyservrar?

Många AI-leverantörer begränsar åtkomsten baserat på geografisk region. Utvecklare i **Ryssland, Kina, Iran, Kuba, Turkiet** och andra länder stöter på fel som:

```
unsupported_country_region_territory
```

Proxyservrar är användbara även utanför blockerade regioner:

| Användningsfall              | Beskrivning                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| **Geografisk förbikoppling** | Få åtkomst till OpenAI, Anthropic, Codex och Copilot från blockerade länder            |
| **IP-rotation**              | Fördela förfrågningar mellan flera IP-adresser för att undvika hastighetsbegränsningar |
| **Integritet**               | Dölj din verkliga IP-adress för externa leverantörer                                   |
| **Regelefterlevnad**         | Dirigera trafik genom specifika jurisdiktioner                                         |
| **Testning**                 | Simulera förfrågningar från olika regioner                                             |

---

## Arkitekturöversikt

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy-      │    │ Proxy-       │    │ Proxy-           │  │
│  │ register    │───▶│ dirigering   │───▶│ hämtning (undici)│  │
│  │ (SQLite)    │    │ (cachelagrad)│    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-     │                        │ Extern           │  │
│  │ synkronisering                      │ leverantörs-API   │  │
│  │ (kostnadsfri pool)                   │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Huvudkomponenter

| Komponent            | Fil                                          | Roll                                                           |
| -------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| **Proxyregister**    | `src/lib/db/proxies.ts`                      | CRUD för proxyposter och tilldelning av omfång                 |
| **Proxydirigering**  | `open-sse/utils/proxyDispatcher.ts`          | Skapar `undici` ProxyAgent-/SOCKS-dispatchrar med cachelagring |
| **Proxyhämtning**    | `open-sse/utils/proxyFetch.ts`               | Omsluter `fetch()` med injicering av proxydispatcher           |
| **Inställningsrutt** | `src/app/api/settings/proxy/route.ts`        | Äldre API för proxykonfiguration (GET/PUT/DELETE)              |
| **Hanteringsrutt**   | `src/app/api/v1/management/proxies/route.ts` | CRUD-API för registret (GET/POST/PATCH/DELETE)                 |
| **1proxy-databas**   | `src/lib/db/oneproxy.ts`                     | Beständig lagring för den kostnadsfria proxymarknadsplatsen    |

---

## Proxysystem med 4 nivåer

OmniRoute stöder proxykonfiguration på **fyra oberoende nivåer**, som matchas i prioritetsordning:

```
Prioritetsordning för matchning (högst → lägst):

  1. 🔵 Konto-/anslutningsproxy  →  per API-nyckel/OAuth-anslutning
  2. 🟡 Leverantörsproxy         →  per leverantör (t.ex. all OpenAI-trafik)
  3. 🟠 Kombinationsproxy        →  per kombinations-/routningskonfiguration
  4. 🟢 Global proxy             →  all trafik, alla leverantörer
```

### Så fungerar matchningen

När OmniRoute skickar en begäran till en uppströmsleverantör anropas `resolveProxyForConnectionFromRegistry()`, som kontrollerar varje nivå i tur och ordning:

1. **Kontonivå** — Finns det en proxy tilldelad till detta specifika anslutnings-ID?
2. **Leverantörsnivå** — Finns det en proxy tilldelad till den här leverantören (t.ex. `openai`)?
3. **Global nivå** — Finns det en global proxy konfigurerad?
4. **Ingen proxy** — Direktanslutning till leverantören.

Den första matchningen används. Det innebär att du kan ange en global proxy som reserv men åsidosätta den för specifika leverantörer eller anslutningar.

### Vad som går via proxy

| Trafiktyp            | Via proxy? | Kommentarer                                  |
| -------------------- | ---------- | -------------------------------------------- |
| Chattslutföranden    | ✅         | Alla begäranden till `/v1/chat/completions`  |
| Inbäddningar         | ✅         | `/v1/embeddings`                             |
| Bildgenerering       | ✅         | `/v1/images/generations`                     |
| Ljud (TTS/STT)       | ✅         | `/v1/audio/*`                                |
| OAuth-tokenutbyte    | ✅         | Löser `unsupported_country_region_territory` |
| Anslutningstester    | ✅         | Knappen "Testa anslutning" använder proxyn   |
| Tokenuppdatering     | ✅         | OAuth-förnyelse i bakgrunden                 |
| Modellsynkronisering | ✅         | Modellistning och identifiering              |

---

## Proxyregister (CRUD)

Proxyregistret är en SQLite-tabell (`proxy_registry`) som lagrar alla dina proxyservrar. Varje proxy har:

| Fält       | Typ    | Beskrivning                                            |
| ---------- | ------ | ------------------------------------------------------ |
| `id`       | UUID   | Unik identifierare                                     |
| `name`     | Sträng | Människoläsbar etikett                                 |
| `type`     | Sträng | Protokoll: `http`, `https`, `socks5`                   |
| `host`     | Sträng | Proxyns värdnamn eller IP-adress                       |
| `port`     | Heltal | Portnummer                                             |
| `username` | Sträng | Användarnamn för autentisering (krypterat vid lagring) |
| `password` | Sträng | Lösenord för autentisering (krypterat vid lagring)     |
| `region`   | Sträng | Etikett för geografisk region                          |
| `notes`    | Sträng | Fritextanteckningar                                    |
| `status`   | Sträng | `active` eller `inactive`                              |
| `source`   | Sträng | `manual` eller `oneproxy`                              |

### Skapa en proxy

**Via kontrollpanelen:**

1. Gå till **Inställningar → Proxy**
2. Klicka på **Lägg till proxy**
3. Fyll i typ, värd, port och valfria autentiseringsuppgifter
4. Spara

**Via API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Uppdatera en proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Obs!** Autentiseringsuppgifter bevaras om du inte uttryckligen skickar icke-tomma ersättningsvärden. Om du skickar tomma strängar för `username`/`password` behålls de lagrade värdena.

### Ta bort en proxy

```bash
# Misslyckas om proxyn är tilldelad till någon nivå
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Framtvinga borttagning (tar även bort tilldelningar)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Lista proxyservrar

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Tilldela proxyservrar till nivåer

```bash
# Tilldela till den globala nivån
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Tilldela till en specifik leverantör
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Tilldela till en specifik anslutning/nyckel
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Fastställa effektiv proxy

Kontrollera vilken proxy som skulle användas för en viss anslutning:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Returnerar den matchade proxyn med dess nivå (`account`, `provider` eller `global`) och källa.

### Masstilldelning

Tilldela en proxy till flera leverantörer eller anslutningar samtidigt:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/export

Proxyservrar inkluderas i systemet för **säkerhetskopiering/återställning**. När du exporterar din OmniRoute-konfiguration:

1. Gå till **Kontrollpanelen → Inställningar → Säkerhetskopiering**
2. Klicka på **Exportera** — proxyregistret och tilldelningarna inkluderas
3. För att återställa klickar du på **Importera** och laddar upp säkerhetskopian

Proxyregistret stöder även **upsert efter värd+port** — om du importerar en proxy som redan finns (samma värd och port) uppdateras den i stället för att en dubblett skapas.

### Migrering från äldre versioner

Om du konfigurerade proxyservrar i en äldre version (före registret) migrerar OmniRoute dem automatiskt:

```
Äldre key_value-lager → proxy_registry + proxy_assignments
```

Detta sker en gång vid den första uppstarten efter uppgraderingen. Använd `migrateLegacyProxyConfigToRegistry({ force: true })` för att köra migreringen igen.

---

## 1proxy – marknadsplats för kostnadsfria proxyservrar

> 🆕 **Bidrag från [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (ärende [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute integreras med communityplattformen **[1proxy](https://1proxy-api.aitradepulse.com)** för att ge åtkomst till **hundratals kostnadsfria, validerade proxyservrar** från hela världen. Detta är perfekt för användare som inte har någon egen proxyinfrastruktur.

### Så fungerar det

```
┌─────────────┐   Synkronisera   ┌─────────────────┐    Rotera     ┌──────────┐
│  1proxy API │ ───────────────▶ │  proxy_registry  │ ────────────▶ │ Leverantör│
│  (extern)   │   upp till 500   │  source=oneproxy │ efter kvalitet│   API    │
└─────────────┘  proxyservrar    └─────────────────┘               └──────────┘
```

1. **Synkronisera** — OmniRoute hämtar validerade proxyservrar från 1proxy-API:t
2. **Lagra** — Proxyservrarna sparas i samma `proxy_registry`-tabell med `source = 'oneproxy'`
3. **Filtrera** — Filtrera efter protokoll, land och kvalitetspoäng
4. **Rotera** — Välj den bästa proxyservern med hjälp av kvalitetsbaserade, slumpmässiga eller sekventiella strategier
5. **Automatisk nedgradering** — Misslyckade proxyservrar får sin kvalitetspoäng sänkt; under tröskelvärdet → markeras som inaktiva

### Synkronisera proxyservrar

**Via kontrollpanelen:**

1. Gå till fliken **Inställningar → 1proxy**
2. Klicka på **"Synkronisera nu"**
3. Visa statistik: totalt antal proxyservrar, antal aktiva, genomsnittlig kvalitet och fördelning per land

**Via API:**

```bash
# Starta synkronisering
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Svar:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrera proxyservrar

```bash
# Filtrera efter protokoll
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtrera efter land
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtrera efter lägsta kvalitetspoäng
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Kombinera filter
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Proxyservrarnas kvalitetspoäng

Varje proxyserver från 1proxy har metadata:

| Fält            | Beskrivning                                         |
| --------------- | --------------------------------------------------- |
| `qualityScore`  | Betyg från 0 till 100 från 1proxys validering       |
| `latencyMs`     | Uppmätt nätverkslatens                              |
| `anonymity`     | `transparent`, `anonymous` eller `elite`            |
| `googleAccess`  | Huruvida proxyservern kan komma åt Googles tjänster |
| `countryCode`   | Tvåställig ISO-landskod                             |
| `lastValidated` | Tidsstämpel för den senaste valideringen            |

Kvalitetspoängen justeras dynamiskt:

- **Misslyckade förfrågningar** minskar poängen med 10
- **Poängen sjunker till ≤10** → proxyservern markeras som `inactive`
- Inaktiva proxyservrar utesluts från rotationen

### Rotationsstrategier

```bash
# Rotera efter kvalitet (bästa proxyservern först) — standard
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Slumpmässig rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sekventiell (minst nyligen validerad först)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Kretsbrytare

1proxy-synkroniseringen har en inbyggd kretsbrytare:

- Efter **5 misslyckade synkroniseringar i följd** blockeras ytterligare synkroniseringsförsök
- Återställ med: `resetOneproxyCircuitBreaker()` eller starta om servern
- Synkroniseringsstatus är tillgänglig på `GET /api/settings/oneproxy?action=status`

### Rensa proxyservrar från 1proxy

```bash
# Ta bort en enskild proxyserver från 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Rensa ALLA proxyservrar från 1proxy (manuella proxyservrar påverkas inte)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Antidetektering och smygteknik

OmniRoute dirigerar inte bara trafik genom en proxy — det får även trafiken att se legitim ut:

### Förfalskning av TLS-fingeravtryck

Använder `wreq-js` för att generera webbläsarliknande TLS-fingeravtryck och därmed kringgå botdetekteringssystem som flaggar TLS-handskakningar som inte kommer från webbläsare.

### Matchning av CLI-fingeravtryck

**Reglaget för CLI-fingeravtryck** (`Inställningar → Säkerhet`) ändrar ordningen på HTTP-rubriker och fält i JSON-brödtexten så att de matchar den exakta signaturen för inbyggda CLI-binärfiler (Claude Code, Codex osv.). Detta fungerar **ovanpå** proxyn:

```
Din IP (blockerad) → Proxy-IP (USA) → Leverantörens API
                      + TLS-förfalskning
                      + CLI-fingeravtryck
```

Du får både **IP-maskering** och **autentiska förfrågningar** samtidigt.

### Bevarande av proxyns IP-adress

Färgkodade märken på instrumentpanelen visar vilken proxynivå som är aktiv:

| Märke | Nivå       | Betydelse                                                |
| ----- | ---------- | -------------------------------------------------------- |
| 🟢    | Global     | All trafik går genom den här proxyn                      |
| 🟡    | Leverantör | Endast den här leverantörens trafik använder proxyn      |
| 🔵    | Anslutning | Den här specifika nyckeln/det här kontot använder proxyn |

Märket visar även proxyns fastställda IP-adress för verifiering.

---

## Lägen för uppströmsproxy

För leverantörer som använder CLIProxyAPI-mönstret stöder OmniRoute tre lägen för uppströmsproxy:

| Läge          | Beskrivning                                                |
| ------------- | ---------------------------------------------------------- |
| `native`      | OmniRoute hanterar proxydirigeringen direkt (standardläge) |
| `cliproxyapi` | Delegerar till en extern CLIProxyAPI-instans               |
| `fallback`    | Försöker först med native och återgår till CLIProxyAPI     |

Konfigurera per leverantör:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Instrumentpanelens användargränssnitt

### Inställningar → Fliken Proxy

- Konfiguration av **global proxy** (ställ in en gång för all trafik)
- **Proxyspecifika åsidosättningar per leverantör**
- **Proxytilldelningar per anslutning**
- **Anslutningstest** genom den konfigurerade proxyn
- **Färgkodade märken** som visar aktiv proxynivå

### Inställningar → Fliken 1proxy

- Knappen **Synkronisera nu** för att hämta kostnadsfria proxyservrar
- **Statistikkort**: Totalt, Aktiva, Genomsnittlig kvalitet, Senaste synkronisering
- **Filter**: Protokoll, Landskod, Lägsta kvalitet
- **Proxytabell** med värd, protokoll, land, kvalitetspoäng, latens, anonymitet och Google-åtkomst
- Panel för **synkroniseringsstatus** med registrering av lyckade/misslyckade försök och antal misslyckanden i följd
- **Rensa alla** för att ta bort alla 1proxy-poster

---

## API-referens

### API för proxyinställningar

| Metod    | Slutpunkt                                      | Beskrivning                          |
| -------- | ---------------------------------------------- | ------------------------------------ |
| `GET`    | `/api/settings/proxy`                          | Hämta fullständig proxykonfiguration |
| `GET`    | `/api/settings/proxy?level=global`             | Hämta global proxy                   |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Hämta leverantörsproxy               |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Fastställ gällande proxy             |
| `PUT`    | `/api/settings/proxy`                          | Uppdatera proxykonfiguration         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Ta bort proxy på nivån               |

### API för proxyregister

| Metod    | Slutpunkt                                         | Beskrivning                     |
| -------- | ------------------------------------------------- | ------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Lista alla proxyservrar         |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Hämta proxy efter ID            |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Hämta proxytilldelningar        |
| `POST`   | `/api/v1/management/proxies`                      | Skapa proxy                     |
| `PATCH`  | `/api/v1/management/proxies`                      | Uppdatera proxy                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Ta bort proxy                   |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Framtvinga borttagning          |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Masstilldela                    |
| `GET`    | `/api/v1/management/proxies/assignments`          | Lista tilldelningar             |
| `GET`    | `/api/v1/management/proxies/health`               | Hälsostatistik för proxyservrar |

### API för tunnlar

Information om hur du exponerar din OmniRoute-instans mot det offentliga internet (Cloudflare/ngrok/Tailscale), i stället för att dirigera utgående trafik genom en proxy, finns i [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST-API:t för tunnlar finns under `/api/tunnels/{cloudflared,ngrok,tailscale}/*` och är oberoende av den utgående proxykedja som dokumenteras ovan.

### API för 1proxy

| Metod    | Slutpunkt                              | Beskrivning                             |
| -------- | -------------------------------------- | --------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Lista 1proxy-proxyservrar               |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Hämta statistik + synkroniseringsstatus |
| `GET`    | `/api/settings/oneproxy?action=status` | Hämta endast synkroniseringsstatus      |
| `POST`   | `/api/settings/oneproxy`               | Starta synkronisering                   |
| `POST`   | `/api/settings/oneproxy/rotate`        | Växla till nästa proxy                  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Ta bort en                              |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Rensa alla                              |

### API för uppströmsproxy

| Metod    | Slutpunkt                         | Beskrivning                              |
| -------- | --------------------------------- | ---------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Hämta konfiguration för uppströmsproxy   |
| `PUT`    | `/api/upstream-proxy/:providerId` | Ange läge för uppströmsproxy             |
| `DELETE` | `/api/upstream-proxy/:providerId` | Ta bort konfiguration för uppströmsproxy |

---

## Miljövariabler

| Variabel              | Standardvärde | Beskrivning                                                                |
| --------------------- | ------------- | -------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`        | Aktivera stöd för SOCKS5-proxy (standardvärdet är `true` i `.env.example`) |

---

## Felsökning

### "SOCKS5-proxy är inaktiverad"

Ange `ENABLE_SOCKS5_PROXY=true` i din `.env`-fil och starta om.

### Fel av typen "socket hang up" via proxy

Detta är normalt med billiga proxytjänster som avslutar inaktiva anslutningar. OmniRoute hanterar redan detta genom att:

- Inaktivera keep-alive för proxyanslutningar (`keepAliveTimeout: 1`)
- Inaktivera pipelining (`pipelining: 0`)
- Cachelagra dispatchers för att undvika upprepade handskakningar

Om problemet kvarstår kan du prova en annan proxy eller använda rotationsfunktionen i 1proxy.

### "unsupported_country_region_territory" under OAuth

Se till att proxyn är konfigurerad **innan** du startar OAuth-flödet. OmniRoute dirigerar utbytet av OAuth-token via den konfigurerade proxyn. Ange först en global proxy eller en proxy på leverantörsnivå och anslut sedan.

### Proxyn används inte

Kontrollera prioritetsordningen:

1. Verifiera med `GET /api/settings/proxy?resolve=your-connection-id`
2. Kontrollera om proxyns `status` är `active` (inte `inactive`)
3. Säkerställ att proxytilldelningens omfång matchar din anslutning

### Synkronisering med 1proxy misslyckas

Kontrollera synkroniseringsstatusen:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Om `consecutiveFailures >= 5` har circuit breakern löst ut. Starta om servern för att återställa den eller invänta en manuell återställning.

---

## Databasschema

### Tabellen `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' eller 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (endast 1proxy)
  latency_ms INTEGER,                        -- millisekunder (endast 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- kan komma åt Google? (1proxy)
  last_validated TEXT,                       -- ISO-tidsstämpel (1proxy)
  country_code TEXT,                         -- ISO-kod med två bokstäver (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabellen `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- leverantörs-ID, anslutnings-ID eller kombinations-ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Hälsokontroll av proxy (v3.8.16+)

OmniRoutes mekanism för **snabbt proxyfel** (`src/lib/proxyHealth.ts`) identifierar otillgängliga proxyservrar på <2s genom en snabb kontroll av TCP-anslutningen och **cachelagrar sedan resultatet** för att undvika extra belastning per begäran.

### Så fungerar det

```
Begäran ──▶ ProxyHealthCache.get(url)
             │
             ├─ Cacheträff + aktuell?  ──▶ returnera cachelagrad status
             │
             └─ Cachemiss / inaktuell?  ──▶ TCP-anslutning till host:port
                                             (tidsgräns: FAST_FAIL_TIMEOUT_MS)
                                             ──▶ cachelagra i HEALTH_CACHE_TTL_MS
                                             ──▶ returnera resultat
```

Utan detta skulle en otillgänglig proxy blockera varje begäran under hela `PROXY_TIMEOUT_MS` (standardvärde 30s) innan den misslyckades.

### Justerbara miljövariabler

| Variabel                     | Standardvärde | Syfte                                          |
| ---------------------------- | ------------- | ---------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`        | Tidsgräns för TCP-anslutning per hälsokontroll |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`       | Hur länge ett hälsoresultat cachelagras        |

**Rekommenderade värden:**

| Scenario                         | Tidsgräns för snabbt fel | Cachens TTL | Motivering                                                                    |
| -------------------------------- | ------------------------ | ----------- | ----------------------------------------------------------------------------- |
| API-gateway med hög kapacitet    | 1500ms                   | 60000ms     | Aggressiv snabb felhantering, längre cache för färre kontroller               |
| Geografiskt distribuerade noder  | 3000ms                   | 15000ms     | Långsammare nätverk behöver mer tid; kortare cache för snabb redundansväxling |
| Utveckling/testning              | 1000ms                   | 10000ms     | Snabb iteration med lokala proxyservrar                                       |
| Smygläge/skydd mot identifiering | 2500ms                   | 45000ms     | Undvik snabba avsökningar som kan utlösa hastighetsbegränsningar              |

### Inspektera proxyns hälsa

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Tvinga fram en ny kontroll av en specifik proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Flaggan `stale` är `true` när cacheposten har överskridit `HEALTH_CACHE_TTL_MS` och nästa begäran kommer att utlösa en ny kontroll.

### Standardvärden per proxytyp

Hälsokontrollen använder lämpliga standardvärden baserat på URL-schemat:

| Schema                     | Standardport |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Anpassade portar i URL:en (`http://host:9999`) har alltid företräde framför schemats standardvärde.

---

## Proxyanalys och observerbarhet

OmniRoute spårar användning per proxy för att hjälpa operatörer att diagnostisera routningsmönster, latensökningar och återkommande fel.

### Vad som spåras

För varje begäran via en konfigurerad proxy registrerar OmniRoute:

| Mätvärde     | Beskrivning                                                |
| ------------ | ---------------------------------------------------------- |
| `proxy_url`  | Fullständig proxy-URL (med maskerade inloggningsuppgifter) |
| `provider`   | ID för uppströmsleverantör (openai, anthropic osv.)        |
| `latency_ms` | Total tur-och-retur-tid inklusive proxyhandskakning        |
| `connect_ms` | Endast tiden för TCP-anslutningen                          |
| `status`     | HTTP-statuskod från uppströmstjänsten                      |
| `error`      | Felklass om begäran misslyckades                           |
| `timestamp`  | ISO 8601 UTC                                               |

### Åtkomst till data

```bash
# Senaste proxyhändelserna
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Den faktiska ändpunkten är `/api/usage/proxy-logs` (se `src/app/api/usage/proxy-logs/route.ts`). Den här ändpunkten stöder:

- `GET /api/usage/proxy-logs` — hämta proxyloggar
- `DELETE /api/usage/proxy-logs` — rensa alla proxyloggar

Aggregerad statistik kan vid behov hämtas direkt från tabellen `proxy_logs` via SQL. Instrumentpanelens användargränssnitt kan erbjuda aggregerade vyer.

### Vanliga mönster

**Identifiera en instabil proxy** (växlar mellan lyckade och misslyckade anrop):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Hitta långsamma proxyservrar** (p95-latens > 2 s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Beslutsträd för rotationsstrategi

När flera proxyservrar tilldelas ett omfång använder OmniRoute en **rotationsstrategi** för att välja vilken som ska användas för varje begäran. Strategin konfigureras på omfångsnivå (globalt, per leverantör, per konto, per kombination).

### Tillgängliga strategier

| Strategi             | När den ska användas                               | Avvägning                                                                           |
| -------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `quality` (standard) | Produktion med proxyservrar av varierande kvalitet | Prioriterar högt rankade proxyservrar; proxyservrar med låg rankning kan missgynnas |
| `random`             | Lastfördelning, integritet                         | Jämn fördelning; ignorerar kvalitetssignaler                                        |
| `sequential`         | Felsökning, deterministisk testning                | Växlar mellan proxyservrar i ordningsföljd; lätt att förstå                         |

### Beslutsträd

```
                    Har dina proxyservrar kvalitetspoäng?
                    │
        ┌───────────┴───────────┐
        │                       │
       JA                      NEJ
        │                       │
   Är alla proxyservrar         │
   ungefär likvärdiga           │
   vad gäller kvalitet?         │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  JA        NEJ               Använd
   │         │              `random`
   │         │              (jämn spridning
   │         │              bygger upp kvalitets-
   │         │              data över tid)
   │         │
   │    Använd `quality`
   │    (bäst vid
   │    varierande kvalitet)
   │
Använd `random`
(fördela lasten
jämnt)
```

## Automatisk exkludering av felande egna proxyservrar

Marknadspoolen i 1proxy nedgraderar redan automatiskt felande proxyservrar på egen hand (se
[Proxykvalitetspoäng](#proxy-quality-scores)). För
proxyservrar som **du** har lagt till i registret ger hälsoschemaläggaren i bakgrunden
(`src/lib/proxyHealth/scheduler.ts`) samma beteende för att ”automatiskt exkludera en
otillgänglig medlem från kedjan”, utan att något tas bort:

```bash
# .env — inaktivera tillfälligt en proxy efter 3 misslyckade kontroller i följd och återaktivera den
# automatiskt så snart den börjar svara på kontroller igen.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Så här fungerar det i en kedja med flera proxyservrar:

1. Schemaläggaren kontrollerar varje registrerad proxy med intervallet `PROXY_HEALTH_INTERVAL_MS`
   (standardvärde 10 min; minimum 1 min).
2. Efter `PROXY_AUTO_REMOVE_AFTER` **definitiva** fel i följd (ett faktiskt
   anslutningsfel — en tidsgräns eller kontrollmålets eget 5xx-svar räknas aldrig, se
   [Hälsokontroll av proxyservrar](#proxy-health-checking-v3816)) sätts proxyns `status`
   till `dead`.
3. `dead` är en av de statusar som filtret för aktiva statusar, som används vid matchning
   av pool/rotation, exkluderar. Därför slutar ett omfångs rotation (round-robin/slumpmässig/sticky/
   latens — se [Beslutsträd för rotationsstrategi](#rotation-strategy-decision-tree))
   omedelbart att tilldela den proxyn till nya förfrågningar. Inga andra proxyservrar i
   poolen påverkas, och hela poolen övergår aldrig i tysthet till en direktanslutning
   — se fail-closed-skyddet i [Proxysystemet med fyra nivåer](#4-level-proxy-system).
4. Schemaläggaren fortsätter att kontrollera `dead`-proxyservrar med samma intervall. Nästa
   lyckade kontroll ändrar tillbaka `status` till `active`, varpå proxyn återgår till rotationen —
   ingen manuell återinläggning krävs.

Detta är avsiktligt **frivilligt och icke-destruktivt**: som standard räknar och loggar
schemaläggaren endast fel (se policy C i `decision.ts`), och `PROXY_AUTO_DISABLE`
tar aldrig bort en rad — det är vad den separata, mer aggressiva flaggan
`PROXY_AUTO_REMOVE` är till för. Om båda är inställda på `true` har `PROXY_AUTO_REMOVE`
företräde (en proxy som ska tas bort har ingen nytta av att först inaktiveras tillfälligt). Se
referensen [Miljökonfiguration](../reference/ENVIRONMENT.md) för en fullständig
variabellista.

---

> 📖 **Relaterad dokumentation:**
>
> - [Användarhandbok](../guides/USER_GUIDE.md) — Allmän installation och konfiguration
> - [API-referens](../reference/API_REFERENCE.md) — Fullständig API-dokumentation
> - [Miljökonfiguration](../reference/ENVIRONMENT.md) — Alla miljövariabler
