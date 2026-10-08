# 🌐 OmniRoute Proxy Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Omzeil geografische blokkades, bescherm uw identiteit en leid AI-verkeer via elke proxy — zonder complexe configuratie.**

OmniRoute bevat een volwaardig proxybeheersysteem waarmee u verkeer naar upstream-AI-providers via HTTP-, HTTPS- of SOCKS5-proxy's kunt leiden. Of u zich nu in een geblokkeerde regio bevindt, IP-rotatie nodig hebt of stealth-fingerprinting wilt gebruiken — deze handleiding behandelt alles.

---

## Inhoudsopgave

- [Waarom proxy's gebruiken?](#why-use-proxies)
- [Architectuuroverzicht](#architecture-overview)
- [Proxysysteem met 4 niveaus](#4-level-proxy-system)
- [Proxyregister (CRUD)](#proxy-registry-crud)
- [Gratis 1proxy-marktplaats](#1proxy-free-proxy-marketplace)
- [Proxyrotatie](#proxy-rotation)
- [Anti-detectie en stealth](#anti-detection--stealth)
- [Upstream-proxymodi](#upstream-proxy-modes)
- [Dashboardinterface](#dashboard-ui)
- [API-referentie](#api-reference)
- [Omgevingsvariabelen](#environment-variables)
- [Probleemoplossing](#troubleshooting)

---

## Waarom proxy's gebruiken?

Veel AI-providers beperken de toegang per geografische regio. Ontwikkelaars in **Rusland, China, Iran, Cuba, Turkije** en andere landen krijgen te maken met fouten zoals:

```
unsupported_country_region_territory
```

Ook buiten geblokkeerde regio's zijn proxy's nuttig voor:

| Toepassing                 | Beschrijving                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------- |
| **Geografische omzeiling** | Verkrijg vanuit geblokkeerde landen toegang tot OpenAI, Anthropic, Codex en Copilot |
| **IP-rotatie**             | Verdeel verzoeken over meerdere IP-adressen om snelheidsbeperkingen te voorkomen    |
| **Privacy**                | Verberg uw echte IP-adres voor upstream-providers                                   |
| **Compliance**             | Leid verkeer door specifieke rechtsgebieden                                         |
| **Testen**                 | Simuleer verzoeken vanuit verschillende regio's                                     |

---

## Architectuuroverzicht

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy-      │    │ Proxy-       │    │ Proxy-           │  │
│  │ register    │───▶│ dispatcher   │───▶│ fetch (undici)   │  │
│  │ (SQLite)    │    │ (gecachet)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-sync │                        │ Upstream-        │  │
│  │ (gratis pool)│                       │ provider-API     │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Belangrijkste componenten

| Component             | Bestand                                      | Rol                                                      |
| --------------------- | -------------------------------------------- | -------------------------------------------------------- |
| **Proxyregister**     | `src/lib/db/proxies.ts`                      | CRUD voor proxyvermeldingen en scopetoewijzingen         |
| **Proxydispatcher**   | `open-sse/utils/proxyDispatcher.ts`          | Maakt `undici` ProxyAgent-/SOCKS-dispatchers met caching |
| **Proxy-fetch**       | `open-sse/utils/proxyFetch.ts`               | Omhult `fetch()` met injectie van een proxydispatcher    |
| **Instellingenroute** | `src/app/api/settings/proxy/route.ts`        | Verouderde API voor proxyconfiguratie (GET/PUT/DELETE)   |
| **Beheerroute**       | `src/app/api/v1/management/proxies/route.ts` | CRUD-API voor het register (GET/POST/PATCH/DELETE)       |
| **1proxy-database**   | `src/lib/db/oneproxy.ts`                     | Persistente opslag voor de gratis proxymarktplaats       |

---

## Proxysysteem met 4 niveaus

OmniRoute ondersteunt proxyconfiguratie op **vier onafhankelijke niveaus**, die in volgorde van prioriteit worden bepaald:

```
Volgorde van prioriteitsbepaling (hoogste → laagste):

  1. 🔵 Account-/verbindingsproxy  →  per API-sleutel / OAuth-verbinding
  2. 🟡 Providerproxy              →  per provider (bijv. al het OpenAI-verkeer)
  3. 🟠 Combinatieproxy            →  per combinatie-/routeringsconfiguratie
  4. 🟢 Globale proxy              →  al het verkeer, alle providers
```

### Hoe de bepaling werkt

Wanneer OmniRoute een verzoek naar een upstream-provider verzendt, roept het `resolveProxyForConnectionFromRegistry()` aan, dat elk niveau in volgorde controleert:

1. **Accountniveau** — Is er een proxy toegewezen aan deze specifieke verbindings-ID?
2. **Providerniveau** — Is er een proxy toegewezen aan deze provider (bijv. `openai`)?
3. **Globaal niveau** — Is er een globale proxy geconfigureerd?
4. **Geen proxy** — Rechtstreekse verbinding met de provider.

De eerste overeenkomst wordt gebruikt. Dit betekent dat u een globale proxy als terugvaloptie kunt instellen, maar deze voor specifieke providers of verbindingen kunt overschrijven.

### Welk verkeer via een proxy wordt geleid

| Verkeerstype            | Via proxy? | Opmerkingen                                     |
| ----------------------- | ---------- | ----------------------------------------------- |
| Chatvoltooiingen        | ✅         | Alle `/v1/chat/completions`-verzoeken           |
| Embeddings              | ✅         | `/v1/embeddings`                                |
| Afbeeldingen genereren  | ✅         | `/v1/images/generations`                        |
| Audio (TTS/STT)         | ✅         | `/v1/audio/*`                                   |
| OAuth-tokenuitwisseling | ✅         | Verhelpt `unsupported_country_region_territory` |
| Verbindingstests        | ✅         | De knop "Verbinding testen" gebruikt de proxy   |
| Tokenvernieuwing        | ✅         | OAuth-vernieuwing op de achtergrond             |
| Modelsynchronisatie     | ✅         | Modellen weergeven en detecteren                |

---

## Proxyregister (CRUD)

Het proxyregister is een SQLite-tabel (`proxy_registry`) waarin al uw proxy's worden opgeslagen. Elke proxy heeft:

| Veld       | Type    | Beschrijving                                               |
| ---------- | ------- | ---------------------------------------------------------- |
| `id`       | UUID    | Unieke identificatie                                       |
| `name`     | String  | Voor mensen leesbaar label                                 |
| `type`     | String  | Protocol: `http`, `https`, `socks5`                        |
| `host`     | String  | Hostnaam of IP-adres van de proxy                          |
| `port`     | Integer | Poortnummer                                                |
| `username` | String  | Gebruikersnaam voor authenticatie (versleuteld opgeslagen) |
| `password` | String  | Wachtwoord voor authenticatie (versleuteld opgeslagen)     |
| `region`   | String  | Label voor geografische regio                              |
| `notes`    | String  | Vrije tekst voor opmerkingen                               |
| `status`   | String  | `active` of `inactive`                                     |
| `source`   | String  | `manual` of `oneproxy`                                     |

### Een proxy aanmaken

**Via het dashboard:**

1. Ga naar **Instellingen → Proxy**
2. Klik op **Proxy toevoegen**
3. Vul het type, de host, de poort en optioneel de authenticatiegegevens in
4. Sla de proxy op

**Via de API:**

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

### Een proxy bijwerken

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Opmerking:** Inloggegevens blijven behouden, tenzij u expliciet niet-lege vervangende waarden verzendt. Als u lege tekenreeksen voor `username`/`password` verzendt, blijven de opgeslagen waarden behouden.

### Een proxy verwijderen

```bash
# Mislukt als de proxy aan een niveau is toegewezen
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Geforceerd verwijderen (verwijdert ook toewijzingen)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Proxy's weergeven

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Proxy's aan niveaus toewijzen

```bash
# Toewijzen aan het globale niveau
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Toewijzen aan een specifieke provider
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Toewijzen aan een specifieke verbinding/sleutel
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### De effectieve proxy bepalen

Controleer welke proxy voor een bepaalde verbinding zou worden gebruikt:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Retourneert de bepaalde proxy met het bijbehorende niveau (`account`, `provider` of `global`) en de bron.

### Bulksgewijze toewijzing

Wijs één proxy tegelijk toe aan meerdere providers of verbindingen:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importeren/exporteren

Proxy's zijn opgenomen in het systeem voor **back-up/herstel**. Wanneer u uw OmniRoute-configuratie exporteert:

1. Ga naar **Dashboard → Instellingen → Back-up**
2. Klik op **Exporteren** — het proxyregister en de toewijzingen worden meegenomen
3. Klik om te herstellen op **Importeren** en upload het back-upbestand

Het proxyregister ondersteunt ook **upsert op basis van host+poort** — als u een proxy importeert die al bestaat (dezelfde host en poort), wordt deze bijgewerkt in plaats van dat er een duplicaat wordt aangemaakt.

### Migratie van verouderde configuraties

Als u proxy's hebt geconfigureerd in een oudere versie (vóór de registry), migreert OmniRoute deze automatisch:

```
Verouderde key_value-opslag → proxy_registry + proxy_assignments
```

Dit gebeurt eenmalig bij de eerste keer opstarten na de upgrade. Gebruik `migrateLegacyProxyConfigToRegistry({ force: true })` om de migratie opnieuw uit te voeren.

---

## 1proxy-marktplaats voor gratis proxy's

> 🆕 **Bijgedragen door [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute integreert met het **[1proxy](https://1proxy-api.aitradepulse.com)**-communityplatform om toegang te bieden tot **honderden gratis, gevalideerde proxy's** van over de hele wereld. Dit is ideaal voor gebruikers die geen eigen proxy-infrastructuur hebben.

### Hoe het werkt

```
┌─────────────┐  Synchroniseren ┌─────────────────┐   Roteren    ┌──────────┐
│  1proxy API │ ───────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (extern)   │   tot maximaal  │  source=oneproxy │  op kwaliteit │   API    │
└─────────────┘   500 proxy's   └─────────────────┘               └──────────┘
```

1. **Synchroniseren** — OmniRoute haalt gevalideerde proxy's op via de 1proxy-API
2. **Opslaan** — Proxy's worden opgeslagen in dezelfde `proxy_registry`-tabel met `source = 'oneproxy'`
3. **Filteren** — Filter op protocol, land en kwaliteitsscore
4. **Roteren** — Kies de beste proxy met een strategie op basis van kwaliteit, willekeur of volgorde
5. **Automatisch verlagen** — Bij mislukte proxy's wordt de kwaliteitsscore verlaagd; onder de drempelwaarde → gemarkeerd als inactief

### Proxy's synchroniseren

**Via het dashboard:**

1. Ga naar het tabblad **Instellingen → 1proxy**
2. Klik op **"Nu synchroniseren"**
3. Bekijk statistieken: totaal aantal proxy's, actief aantal, gemiddelde kwaliteit en uitsplitsing per land

**Via de API:**

```bash
# Synchronisatie starten
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Antwoord:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proxy's filteren

```bash
# Filteren op protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filteren op land
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filteren op minimale kwaliteitsscore
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Filters combineren
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Kwaliteitsscores van proxy's

Elke 1proxy-proxy bevat metagegevens:

| Veld            | Beschrijving                                        |
| --------------- | --------------------------------------------------- |
| `qualityScore`  | Beoordeling van 0-100 op basis van 1proxy-validatie |
| `latencyMs`     | Gemeten netwerklatentie                             |
| `anonymity`     | `transparent`, `anonymous` of `elite`               |
| `googleAccess`  | Of de proxy toegang heeft tot Google-services       |
| `countryCode`   | ISO-landcode van twee letters                       |
| `lastValidated` | Tijdstempel van de laatste validatie                |

Kwaliteitsscores worden dynamisch aangepast:

- **Mislukte aanvragen** verlagen de score met 10 punten
- **Score daalt tot ≤10** → proxy wordt gemarkeerd als `inactive`
- Inactieve proxy's worden uitgesloten van rotatie

### Rotatiestrategieën

```bash
# Roteren op kwaliteit (beste proxy eerst) — standaard
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Willekeurige rotatie
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Opeenvolgend (minst recent gevalideerde proxy eerst)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuitonderbreker

De synchronisatie met 1proxy heeft een ingebouwde circuitonderbreker:

- Na **5 opeenvolgende mislukte synchronisaties** worden verdere synchronisatiepogingen geblokkeerd
- Reset deze met: `resetOneproxyCircuitBreaker()` of start de server opnieuw
- De synchronisatiestatus is beschikbaar via `GET /api/settings/oneproxy?action=status`

### 1proxy-proxy's wissen

```bash
# Eén 1proxy-proxy verwijderen
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# ALLE 1proxy-proxy's wissen (handmatige proxy's blijven ongewijzigd)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-detectie & stealth

OmniRoute leidt verkeer niet alleen via een proxy — het laat het verkeer er ook legitiem uitzien:

### TLS-fingerprintspoofing

Gebruikt `wreq-js` om browserachtige TLS-fingerprints te genereren en zo botdetectiesystemen te omzeilen die TLS-handshakes van niet-browsers markeren.

### CLI-fingerprintmatching

De **CLI-fingerprintschakelaar** (`Instellingen → Beveiliging`) wijzigt de volgorde van HTTP-headers en velden in de JSON-body zodat deze overeenkomt met de exacte signatuur van native CLI-binaries (Claude Code, Codex, enz.). Dit werkt **boven op** de proxy:

```
Uw IP (geblokkeerd) → Proxy-IP (VS) → Provider-API
                       + TLS-spoofing
                       + CLI-fingerprint
```

U krijgt tegelijkertijd zowel **IP-maskering** als **authenticiteit van verzoeken**.

### Behoud van het proxy-IP

Kleurgecodeerde badges in het dashboard geven aan welk proxyniveau actief is:

| Badge | Niveau     | Betekenis                                           |
| ----- | ---------- | --------------------------------------------------- |
| 🟢    | Globaal    | Al het verkeer loopt via deze proxy                 |
| 🟡    | Provider   | Alleen verkeer van deze provider wordt geproxyd     |
| 🔵    | Verbinding | Deze specifieke sleutel/account gebruikt deze proxy |

De badge toont ter verificatie ook het herleide proxy-IP.

---

## Upstream-proxymodi

Voor providers die het CLIProxyAPI-patroon gebruiken, ondersteunt OmniRoute drie upstream-proxymodi:

| Modus         | Beschrijving                                                |
| ------------- | ----------------------------------------------------------- |
| `native`      | OmniRoute verwerkt de proxyrouting rechtstreeks (standaard) |
| `cliproxyapi` | Delegeert aan een externe CLIProxyAPI-instantie             |
| `fallback`    | Probeert eerst native en valt daarna terug op CLIProxyAPI   |

Configureren per provider:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Dashboard-UI

### Instellingen → tabblad Proxy

- Configuratie van de **globale proxy** (eenmaal instellen voor al het verkeer)
- **Proxy-overschrijvingen per provider**
- **Proxytoewijzingen per verbinding**
- **Verbindingstest** via de geconfigureerde proxy
- **Kleurgecodeerde badges** die het actieve proxyniveau tonen

### Instellingen → tabblad 1proxy

- Knop **Nu synchroniseren** om gratis proxy's op te halen
- **Statistiekkaarten**: Totaal, Actief, Gem. kwaliteit, Laatste synchronisatie
- **Filters**: Protocol, Landcode, Min. kwaliteit
- **Proxytabel** met host, protocol, land, kwaliteitsscore, latentie, anonimiteit en Google-toegang
- Paneel **Synchronisatiestatus** met registratie van geslaagde/mislukte pogingen en het aantal opeenvolgende fouten
- **Alles wissen** om alle 1proxy-vermeldingen te verwijderen

---

## API-referentie

### API voor proxy-instellingen

| Methode  | Endpoint                                       | Beschrijving                        |
| -------- | ---------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Volledige proxyconfiguratie ophalen |
| `GET`    | `/api/settings/proxy?level=global`             | Globale proxy ophalen               |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Providerproxy ophalen               |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Effectieve proxy bepalen            |
| `PUT`    | `/api/settings/proxy`                          | Proxyconfiguratie bijwerken         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Proxy op dit niveau verwijderen     |

### API voor het proxyregister

| Methode  | Endpoint                                          | Beschrijving                   |
| -------- | ------------------------------------------------- | ------------------------------ |
| `GET`    | `/api/v1/management/proxies`                      | Alle proxy's weergeven         |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proxy op ID ophalen            |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Proxytoewijzingen ophalen      |
| `POST`   | `/api/v1/management/proxies`                      | Proxy aanmaken                 |
| `PATCH`  | `/api/v1/management/proxies`                      | Proxy bijwerken                |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Proxy verwijderen              |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Verwijdering afdwingen         |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Bulksgewijs toewijzen          |
| `GET`    | `/api/v1/management/proxies/assignments`          | Toewijzingen weergeven         |
| `GET`    | `/api/v1/management/proxies/health`               | Statusstatistieken van proxy's |

### Tunnels-API

Raadpleeg [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) om uw OmniRoute-instantie beschikbaar te maken op het openbare internet (Cloudflare/ngrok/Tailscale), in plaats van uitgaand verkeer via een proxy te routeren. De REST-API voor tunnels bevindt zich onder `/api/tunnels/{cloudflared,ngrok,tailscale}/*` en staat los van de hierboven gedocumenteerde uitgaande proxyketen.

### 1proxy-API

| Methode  | Endpoint                               | Beschrijving                                |
| -------- | -------------------------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy-proxy's weergeven                    |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Statistieken + synchronisatiestatus ophalen |
| `GET`    | `/api/settings/oneproxy?action=status` | Alleen synchronisatiestatus ophalen         |
| `POST`   | `/api/settings/oneproxy`               | Synchronisatie activeren                    |
| `POST`   | `/api/settings/oneproxy/rotate`        | Naar de volgende proxy roteren              |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Eén proxy verwijderen                       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Alles wissen                                |

### Upstream-proxy-API

| Methode  | Endpoint                          | Beschrijving                           |
| -------- | --------------------------------- | -------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Upstream-proxyconfiguratie ophalen     |
| `PUT`    | `/api/upstream-proxy/:providerId` | Upstream-proxymodus instellen          |
| `DELETE` | `/api/upstream-proxy/:providerId` | Upstream-proxyconfiguratie verwijderen |

---

## Omgevingsvariabelen

| Variabele             | Standaardwaarde | Beschrijving                                                               |
| --------------------- | --------------- | -------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`          | SOCKS5-proxyondersteuning inschakelen (standaard `true` in `.env.example`) |

---

## Probleemoplossing

### "SOCKS5-proxy is uitgeschakeld"

Stel `ENABLE_SOCKS5_PROXY=true` in uw `.env`-bestand in en start opnieuw op.

### "socket hang up"-fouten via de proxy

Dit is normaal bij goedkope proxy's die inactieve verbindingen verbreken. OmniRoute handelt dit al als volgt af:

- Keep-alive uitschakelen voor proxyverbindingen (`keepAliveTimeout: 1`)
- Pipelining uitschakelen (`pipelining: 0`)
- Dispatchers cachen om herhaalde handshakes te voorkomen

Als het probleem aanhoudt, probeert u een andere proxy of gebruikt u de rotatiefunctie van 1proxy.

### "unsupported_country_region_territory" tijdens OAuth

Zorg ervoor dat de proxy is geconfigureerd **voordat** u de OAuth-flow start. OmniRoute leidt de uitwisseling van OAuth-tokens via de geconfigureerde proxy. Stel eerst een globale proxy of een proxy op providerniveau in en maak daarna verbinding.

### Proxy wordt niet gebruikt

Controleer de oplossingsvolgorde:

1. Verifieer dit met `GET /api/settings/proxy?resolve=your-connection-id`
2. Controleer of de `status` van de proxy `active` is (niet `inactive`)
3. Zorg ervoor dat het bereik van de proxytoewijzing overeenkomt met uw verbinding

### Synchronisatie met 1proxy mislukt

Controleer de synchronisatiestatus:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Als `consecutiveFailures >= 5`, is de circuitbreaker geactiveerd. Start de server opnieuw om deze te resetten, of wacht op een handmatige reset.

---

## Databaseschema

### Tabel `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' of 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (alleen 1proxy)
  latency_ms INTEGER,                        -- milliseconden (alleen 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- heeft toegang tot Google? (1proxy)
  last_validated TEXT,                       -- ISO-tijdstempel (1proxy)
  country_code TEXT,                         -- ISO-code van 2 letters (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabel `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provider-ID, verbindings-ID of combo-ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Statuscontrole van proxy's (v3.8.16+)

Het **proxy-fast-fail**-mechanisme van OmniRoute (`src/lib/proxyHealth.ts`) detecteert defecte proxy's binnen <2s via een snelle controle van de TCP-verbinding en **cachet vervolgens het resultaat** om overhead per aanvraag te voorkomen.

### Hoe het werkt

```
Aanvraag ──▶ ProxyHealthCache.get(url)
              │
              ├─ Cachetreffer + actueel?  ──▶ retourneer gecachte status
              │
              └─ Cachemisser / verouderd?  ──▶ TCP-verbinding met host:poort
                                                (time-out: FAST_FAIL_TIMEOUT_MS)
                                                ──▶ cache gedurende HEALTH_CACHE_TTL_MS
                                                ──▶ retourneer resultaat
```

Zonder dit mechanisme zou een defecte proxy elke aanvraag gedurende de volledige `PROXY_TIMEOUT_MS` (standaard 30s) blokkeren voordat deze mislukt.

### Instelbare omgevingsvariabelen

| Variabele                    | Standaardwaarde | Doel                                                         |
| ---------------------------- | --------------- | ------------------------------------------------------------ |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`          | Time-out van de TCP-verbinding per statuscontrole            |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`         | Hoe lang het resultaat van een statuscontrole wordt gecachet |

**Aanbevolen waarden:**

| Scenario                      | Fast-fail-time-out | Cache-TTL | Reden                                                                           |
| ----------------------------- | ------------------ | --------- | ------------------------------------------------------------------------------- |
| API-gateway met hoge doorvoer | 1500ms             | 60000ms   | Agressief snel mislukken, langere cache om controles te verminderen             |
| Geografisch verspreide nodes  | 3000ms             | 15000ms   | Langzamere netwerken hebben meer tijd nodig; kortere cache voor snelle failover |
| Ontwikkeling / testen         | 1000ms             | 10000ms   | Snelle iteratie met lokale proxy's                                              |
| Stealth / anti-detectie       | 2500ms             | 45000ms   | Vermijd snelle controles die rate limits kunnen activeren                       |

### Proxy-status inspecteren

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Een specifieke proxy geforceerd opnieuw controleren
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

De vlag `stale` is `true` wanneer de cachevermelding `HEALTH_CACHE_TTL_MS` heeft overschreden en de volgende aanvraag een nieuwe controle activeert.

### Standaardwaarden per proxytype

De statuscontrole gebruikt passende standaardwaarden op basis van het URL-schema:

| Schema                     | Standaardpoort |
| -------------------------- | -------------- |
| `http://`                  | 8080           |
| `https://`                 | 443            |
| `socks5://` / `socks5h://` | 1080           |

Aangepaste poorten in de URL (`http://host:9999`) hebben altijd voorrang op de standaardwaarde van het schema.

---

## Proxyanalyse en observeerbaarheid

OmniRoute houdt het gebruik per proxy bij om beheerders te helpen routeringspatronen, latentiepieken en terugkerende fouten te diagnosticeren.

### Wat wordt bijgehouden

Voor elk verzoek via een geconfigureerde proxy registreert OmniRoute:

| Metriek      | Beschrijving                                           |
| ------------ | ------------------------------------------------------ |
| `proxy_url`  | Volledige proxy-URL (met afgeschermde aanmeldgegevens) |
| `provider`   | ID van de upstreamprovider (openai, anthropic, enz.)   |
| `latency_ms` | Totale retourtijd, inclusief proxyhandshake            |
| `connect_ms` | Alleen de tijd voor het opzetten van de TCP-verbinding |
| `status`     | HTTP-statuscode van de upstreamprovider                |
| `error`      | Foutklasse als het verzoek is mislukt                  |
| `timestamp`  | ISO 8601 UTC                                           |

### Toegang tot de gegevens

```bash
# Recente proxygebeurtenissen
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Het daadwerkelijke eindpunt is `/api/usage/proxy-logs` (zie `src/app/api/usage/proxy-logs/route.ts`). Dit eindpunt ondersteunt:

- `GET /api/usage/proxy-logs` — proxylogboeken ophalen
- `DELETE /api/usage/proxy-logs` — alle proxylogboeken wissen

Indien nodig kunnen geaggregeerde statistieken rechtstreeks via SQL uit de tabel `proxy_logs` worden opgevraagd. De dashboardinterface biedt mogelijk geaggregeerde weergaven.

### Veelvoorkomende patronen

**Een instabiele proxy detecteren** (wisselt tussen succes en mislukking):

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

**Trage proxy's vinden** (p95-latentie > 2 s):

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

## Beslisboom voor de rotatiestrategie

Wanneer meerdere proxy's aan een bereik zijn toegewezen, gebruikt OmniRoute een **rotatiestrategie** om te bepalen welke proxy voor elk verzoek wordt gebruikt. De strategie wordt op bereikniveau geconfigureerd (globaal, per provider, per account, per combinatie).

### Beschikbare strategieën

| Strategie             | Wanneer te gebruiken                           | Afweging                                                                                                    |
| --------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `quality` (standaard) | Productie met proxy's van wisselende kwaliteit | Geeft voorkeur aan hoog gewaardeerde proxy's; proxy's met een lage waardering krijgen mogelijk geen verkeer |
| `random`              | Belastingsverdeling, privacy                   | Gelijkmatige verdeling; negeert kwaliteitssignalen                                                          |
| `sequential`          | Foutopsporing, deterministische tests          | Doorloopt proxy's op volgorde; eenvoudig te doorgronden                                                     |

### Beslisboom

```
                    Hebt u kwaliteitsscores voor uw proxy's?
                    │
        ┌───────────┴───────────┐
        │                       │
        JA                      NEE
        │                       │
   Zijn alle proxy's            │
   ongeveer gelijk              │
   van kwaliteit?               │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
   JA        NEE              Gebruik
   │         │              `random`
   │         │              (gelijkmatige
   │         │              verdeling bouwt
   │         │              kwaliteitsgegevens
   │         │              op termijn op)
   │         │
   │    Gebruik `quality`
   │    (het beste bij
   │    wisselende kwaliteit)
   │
Gebruik `random`
(verdeel de belasting
gelijkmatig)
```

## Automatische uitsluiting van defecte eigen proxy's

De marketplace-pool van 1proxy verlaagt de status van defecte proxy's al automatisch (zie
[Proxykwaliteitsscores](#proxy-quality-scores)). Voor
proxy's die **u** aan het register hebt toegevoegd, biedt de statusplanner op de achtergrond
(`src/lib/proxyHealth/scheduler.ts`) hetzelfde gedrag om automatisch een defect lid uit
de keten uit te sluiten, zonder iets te verwijderen:

```bash
# .env — schakel een proxy tijdelijk uit na 3 opeenvolgende mislukte controles en schakel deze
# automatisch weer in zodra de proxy opnieuw op controles reageert.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Zo werkt dit binnen een keten met meerdere proxy's:

1. De planner controleert elke geregistreerde proxy om de `PROXY_HEALTH_INTERVAL_MS`
   (standaard 10 min; minimaal 1 min).
2. Na `PROXY_AUTO_REMOVE_AFTER` opeenvolgende **doorslaggevende** mislukkingen (een echte
   verbindingsfout — een time-out of een 5xx-respons van het controledoel zelf telt nooit mee; zie
   [Statuscontrole van proxy's](#proxy-health-checking-v3816)), wordt de `status` van de proxy
   ingesteld op `dead`.
3. `dead` is een van de statussen die worden uitgesloten door het filter voor actieve statussen
   dat wordt gebruikt bij het bepalen van pools/rotatie. Daardoor stopt de rotatie van een bereik
   (round-robin / willekeurig / sticky /
   latentie — zie [Beslisboom voor rotatiestrategieën](#rotation-strategy-decision-tree))
   onmiddellijk met het toewijzen van die proxy aan nieuwe verzoeken. Andere proxy's in de
   pool worden niet beïnvloed en de volledige pool valt nooit ongemerkt terug op een directe
   verbinding — zie de fail-closed-beveiliging van het
   [Proxysysteem met 4 niveaus](#4-level-proxy-system).
4. De planner blijft `dead`-proxy's met hetzelfde interval controleren. Bij de volgende
   geslaagde controle wordt de `status` weer ingesteld op `active` en neemt de proxy opnieuw
   deel aan de rotatie — handmatig opnieuw toevoegen is niet nodig.

Dit is bewust **opt-in en niet-destructief**: standaard telt en registreert de planner alleen
mislukkingen (zie beleid C in `decision.ts`) en `PROXY_AUTO_DISABLE`
verwijdert nooit een rij — daarvoor dient de afzonderlijke, agressievere vlag
`PROXY_AUTO_REMOVE`. Als beide op `true` zijn ingesteld, heeft `PROXY_AUTO_REMOVE`
voorrang (een proxy die op het punt staat te worden verwijderd, hoeft niet eerst tijdelijk te
worden uitgeschakeld). Raadpleeg de documentatie over
[Omgevingsconfiguratie](../reference/ENVIRONMENT.md) voor de volledige lijst
met variabelen.

---

> 📖 **Gerelateerde documentatie:**
>
> - [Gebruikershandleiding](../guides/USER_GUIDE.md) — Algemene installatie en configuratie
> - [API-referentie](../reference/API_REFERENCE.md) — Volledige API-documentatie
> - [Omgevingsconfiguratie](../reference/ENVIRONMENT.md) — Alle omgevingsvariabelen
