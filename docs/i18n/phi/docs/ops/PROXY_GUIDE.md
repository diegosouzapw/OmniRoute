# 🌐 OmniRoute Proxy Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Lampasan ang mga heograpikong pag-block, protektahan ang iyong pagkakakilanlan, at iruta ang trapiko ng AI sa pamamagitan ng anumang proxy — nang walang kumplikadong configuration.**

Kabilang sa OmniRoute ang isang kumpletong sistema ng pamamahala ng proxy na nagbibigay-daan sa iyong iruta ang trapiko patungo sa mga upstream AI provider sa pamamagitan ng mga HTTP, HTTPS, o SOCKS5 proxy. Nasa naka-block na rehiyon ka man, nangangailangan ng pag-ikot ng IP, o nais ng lihim na fingerprinting — saklaw ng gabay na ito ang lahat.

---

## Talaan ng mga Nilalaman

- [Bakit Gumamit ng mga Proxy?](#why-use-proxies)
- [Pangkalahatang-ideya ng Arkitektura](#architecture-overview)
- [4-Level na Sistema ng Proxy](#4-level-proxy-system)
- [Registry ng Proxy (CRUD)](#proxy-registry-crud)
- [Libreng Marketplace ng 1proxy](#1proxy-free-proxy-marketplace)
- [Pag-ikot ng Proxy](#proxy-rotation)
- [Pag-iwas sa Detection at Stealth](#anti-detection--stealth)
- [Mga Upstream Proxy Mode](#upstream-proxy-modes)
- [Dashboard UI](#dashboard-ui)
- [Sanggunian ng API](#api-reference)
- [Mga Environment Variable](#environment-variables)
- [Pag-troubleshoot](#troubleshooting)

---

## Bakit Gumamit ng mga Proxy?

Maraming AI provider ang naghihigpit ng access batay sa heograpikong rehiyon. Ang mga developer sa **Russia, China, Iran, Cuba, Turkey**, at iba pang bansa ay nakararanas ng mga error gaya ng:

```
unsupported_country_region_territory
```

Kahit sa labas ng mga naka-block na rehiyon, kapaki-pakinabang ang mga proxy para sa:

| Gamit                       | Paglalarawan                                                                      |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Heograpikong pag-bypass** | I-access ang OpenAI, Anthropic, Codex, at Copilot mula sa mga naka-block na bansa |
| **Pag-ikot ng IP**          | Ipamahagi ang mga request sa maraming IP upang maiwasan ang rate limiting         |
| **Privacy**                 | Itago ang iyong tunay na IP mula sa mga upstream provider                         |
| **Pagsunod**                | Iruta ang trapiko sa mga partikular na hurisdiksyon                               |
| **Pagsubok**                | Gayahin ang mga request mula sa iba't ibang rehiyon                               |

---

## Pangkalahatang-ideya ng Arkitektura

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute Server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registry ng │    │ Dispatcher   │    │ Fetch (undici)   │  │
│  │ Proxy       │───▶│ ng Proxy     │───▶│                  │  │
│  │ (SQLite)    │    │ (naka-cache) │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Pag-sync ng │                        │ Upstream         │  │
│  │ 1proxy      │                        │ Provider API     │  │
│  │ (libreng    │                        │                  │  │
│  │ pool)       │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Mga Pangunahing Component

| Component               | File                                         | Tungkulin                                                                |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| **Registry ng Proxy**   | `src/lib/db/proxies.ts`                      | CRUD para sa mga proxy entry at pagtatalaga ng saklaw                    |
| **Dispatcher ng Proxy** | `open-sse/utils/proxyDispatcher.ts`          | Gumagawa ng mga `undici` ProxyAgent/SOCKS dispatcher na may caching      |
| **Proxy Fetch**         | `open-sse/utils/proxyFetch.ts`               | Binabalot ang `fetch()` sa pamamagitan ng pag-inject ng proxy dispatcher |
| **Route ng Settings**   | `src/app/api/settings/proxy/route.ts`        | Lumang proxy config API (GET/PUT/DELETE)                                 |
| **Route ng Pamamahala** | `src/app/api/v1/management/proxies/route.ts` | Registry CRUD API (GET/POST/PATCH/DELETE)                                |
| **1proxy DB**           | `src/lib/db/oneproxy.ts`                     | Persistence ng libreng proxy marketplace                                 |

---

## 4-Level na Proxy System

Sinusuportahan ng OmniRoute ang configuration ng proxy sa **apat na magkakahiwalay na saklaw**, na nireresolba ayon sa pagkakasunod-sunod ng priyoridad:

```
Pagkakasunod-sunod ng Pagresolba ayon sa Priyoridad (pinakamataas → pinakamababa):

  1. 🔵 Proxy ng Account/Koneksyon → bawat API key / OAuth connection
  2. 🟡 Proxy ng Provider          → bawat provider (hal., lahat ng traffic ng OpenAI)
  3. 🟠 Proxy ng Combo             → bawat combo/configuration ng routing
  4. 🟢 Global na Proxy            → lahat ng traffic, lahat ng provider
```

### Paano Gumagana ang Pagresolba

Kapag nagpapadala ang OmniRoute ng request sa isang upstream provider, tinatawag nito ang `resolveProxyForConnectionFromRegistry()` na nagsusuri sa bawat level ayon sa pagkakasunod-sunod:

1. **Account-level** — May proxy bang nakatalaga sa partikular na connection ID na ito?
2. **Provider-level** — May proxy bang nakatalaga sa provider na ito (hal., `openai`)?
3. **Global-level** — May naka-configure bang global na proxy?
4. **Walang proxy** — Direktang koneksyon sa provider.

Ang unang tumugma ang ginagamit. Ibig sabihin, maaari kang magtakda ng global na proxy bilang fallback ngunit i-override ito para sa mga partikular na provider o koneksyon.

### Ano ang Dumadaan sa Proxy

| Uri ng Traffic            | Dumadaan sa Proxy? | Mga Tala                                                 |
| ------------------------- | ------------------ | -------------------------------------------------------- |
| Mga chat completion       | ✅                 | Lahat ng `/v1/chat/completions` request                  |
| Mga embedding             | ✅                 | `/v1/embeddings`                                         |
| Pagbuo ng image           | ✅                 | `/v1/images/generations`                                 |
| Audio (TTS/STT)           | ✅                 | `/v1/audio/*`                                            |
| OAuth token exchange      | ✅                 | Nilulutas ang `unsupported_country_region_territory`     |
| Mga pagsubok ng koneksyon | ✅                 | Gumagamit ng proxy ang button na "Subukan ang Koneksyon" |
| Pag-refresh ng token      | ✅                 | Pag-renew ng OAuth sa background                         |
| Pag-sync ng model         | ✅                 | Paglilista at pagtuklas ng model                         |

---

## Registry ng Proxy (CRUD)

Ang registry ng proxy ay isang SQLite table (`proxy_registry`) na nag-iimbak ng lahat ng iyong proxy. Ang bawat proxy ay may:

| Field      | Uri     | Paglalarawan                                          |
| ---------- | ------- | ----------------------------------------------------- |
| `id`       | UUID    | Natatanging identifier                                |
| `name`     | String  | Label na madaling maunawaan ng tao                    |
| `type`     | String  | Protocol: `http`, `https`, `socks5`                   |
| `host`     | String  | Hostname o IP ng proxy                                |
| `port`     | Integer | Numero ng port                                        |
| `username` | String  | Username para sa auth (naka-encrypt habang nakaimbak) |
| `password` | String  | Password para sa auth (naka-encrypt habang nakaimbak) |
| `region`   | String  | Label ng heograpikong rehiyon                         |
| `notes`    | String  | Mga malayang tekstong tala                            |
| `status`   | String  | `active` o `inactive`                                 |
| `source`   | String  | `manual` o `oneproxy`                                 |

### Paggawa ng Proxy

**Sa pamamagitan ng Dashboard:**

1. Pumunta sa **Settings → Proxy**
2. I-click ang **Add Proxy**
3. Ilagay ang uri, host, port, at mga opsyonal na credential sa auth
4. I-save

**Sa pamamagitan ng API:**

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

### Pag-update ng Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Tandaan:** Pinananatili ang mga credential maliban kung tahasan kang magpadala ng mga kapalit na hindi blangko. Kapag nagpadala ng mga blangkong string para sa `username`/`password`, pananatilihin ang mga nakaimbak na value.

### Pagtanggal ng Proxy

```bash
# Mabibigo kung nakatalaga ang proxy sa anumang saklaw
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Sapilitang pagtanggal (tinatanggal din ang mga pagtatalaga)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Paglilista ng mga Proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Pagtatalaga ng mga Proxy sa mga Saklaw

```bash
# Italaga sa global na saklaw
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Italaga sa isang partikular na provider
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Italaga sa isang partikular na koneksyon/key
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Pagresolba sa Epektibong Proxy

Suriin kung aling proxy ang gagamitin para sa isang partikular na koneksyon:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Ibinabalik nito ang naresolbang proxy kasama ang level nito (`account`, `provider`, o `global`) at source.

### Maramihang Pagtatalaga

Magtalaga ng isang proxy sa maraming provider o koneksyon nang sabay-sabay:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Pag-import/Pag-export

Kasama ang mga proxy sa system na **Backup/Restore**. Kapag ini-export mo ang iyong configuration ng OmniRoute:

1. Pumunta sa **Dashboard → Settings → Backup**
2. I-click ang **Export** — kasama ang registry ng proxy at mga pagtatalaga
3. Para mag-restore, i-click ang **Import** at i-upload ang backup file

Sinusuportahan din ng registry ng proxy ang **upsert ayon sa host+port** — kung mag-i-import ka ng proxy na umiiral na (parehong host at port), ia-update ito sa halip na gumawa ng duplicate.

### Legacy na Migration

Kung nag-configure ka ng mga proxy sa mas lumang bersyon (bago ang registry), awtomatikong inililipat ng OmniRoute ang mga ito:

```
Lumang key_value store → proxy_registry + proxy_assignments
```

Isang beses itong nangyayari sa unang pag-start pagkatapos ng pag-upgrade. Gamitin ang `migrateLegacyProxyConfigToRegistry({ force: true })` upang patakbuhin itong muli.

---

## Marketplace ng Libreng Proxy ng 1proxy

> 🆕 **Iniambag ni [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Isyu [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

Nakikipag-integrate ang OmniRoute sa platform ng komunidad na **[1proxy](https://1proxy-api.aitradepulse.com)** upang magbigay ng access sa **daan-daang libre at napatunayang proxy** mula sa buong mundo. Perpekto ito para sa mga user na walang sariling imprastraktura ng proxy.

### Paano Ito Gumagana

```
┌─────────────┐  Pag-sync   ┌─────────────────┐   Pag-rotate   ┌──────────┐
│  1proxy API │ ───────────▶ │  proxy_registry │ ─────────────▶ │ Provider │
│  (panlabas) │  hanggang   │  source=oneproxy │  ayon sa       │   API    │
└─────────────┘  500 proxy  └─────────────────┘  kalidad        └──────────┘
```

1. **Pag-sync** — Kinukuha ng OmniRoute ang mga napatunayang proxy mula sa 1proxy API
2. **Pag-store** — Sine-save ang mga proxy sa parehong talahanayang `proxy_registry` na may `source = 'oneproxy'`
3. **Pag-filter** — Mag-filter ayon sa protocol, bansa, at marka ng kalidad
4. **Pag-rotate** — Piliin ang pinakamahusay na proxy gamit ang mga estratehiyang batay sa kalidad, random, o sunud-sunod
5. **Awtomatikong pagpapababa** — Binabawasan ang marka ng kalidad ng mga pumalyang proxy; kapag mas mababa sa threshold → minamarkahang hindi aktibo

### Pag-sync ng mga Proxy

**Sa pamamagitan ng Dashboard:**

1. Pumunta sa tab na **Settings → 1proxy**
2. I-click ang **"Sync Now"**
3. Tingnan ang mga estadistika: kabuuang proxy, bilang ng aktibo, average na kalidad, at paghahati-hati ayon sa bansa

**Sa pamamagitan ng API:**

```bash
# Simulan ang pag-sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Tugon:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Pag-filter ng mga Proxy

```bash
# Mag-filter ayon sa protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Mag-filter ayon sa bansa
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Mag-filter ayon sa minimum na marka ng kalidad
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Pagsamahin ang mga filter
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Mga Marka ng Kalidad ng Proxy

May kasamang metadata ang bawat proxy ng 1proxy:

| Field           | Paglalarawan                                        |
| --------------- | --------------------------------------------------- |
| `qualityScore`  | Rating na 0-100 mula sa pagpapatunay ng 1proxy      |
| `latencyMs`     | Nasukat na latency ng network                       |
| `anonymity`     | `transparent`, `anonymous`, o `elite`               |
| `googleAccess`  | Kung maa-access ng proxy ang mga serbisyo ng Google |
| `countryCode`   | Dalawang-letrang ISO code ng bansa                  |
| `lastValidated` | Timestamp ng huling pagpapatunay                    |

Dinamikong ina-adjust ang mga marka ng kalidad:

- Binabawasan ng **mga pumalyang request** ang marka nang 10 puntos
- **Kapag bumaba ang marka sa ≤10** → minamarkahan ang proxy bilang `inactive`
- Hindi isinasama sa pag-rotate ang mga hindi aktibong proxy

### Mga Estratehiya sa Pag-rotate

```bash
# Mag-rotate ayon sa kalidad (pinakamahusay na proxy muna) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random na pag-rotate
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sunud-sunod (pinakamatagal mula noong huling napatunayan muna)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Circuit Breaker

May built-in na circuit breaker ang pag-sync ng 1proxy:

- Pagkatapos ng **5 magkakasunod na pagkabigo sa pag-sync**, bina-block ang mga susunod pang pagtatangka sa pag-sync
- I-reset gamit ang: `resetOneproxyCircuitBreaker()` o i-restart ang server
- Makukuha ang status ng pag-sync sa `GET /api/settings/oneproxy?action=status`

### Pag-clear ng mga Proxy ng 1proxy

```bash
# Mag-delete ng isang proxy ng 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# I-clear ang LAHAT ng proxy ng 1proxy (hindi gagalawin ang mga manual na proxy)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-Detection at Stealth

Hindi lang niruruta ng OmniRoute ang trapiko sa pamamagitan ng proxy — ginagawa rin nitong lehitimo ang hitsura ng trapiko:

### TLS Fingerprint Spoofing

Gumagamit ng `wreq-js` upang bumuo ng mga TLS fingerprint na katulad ng sa browser, na nilalampasan ang mga bot detection system na nagfa-flag ng mga TLS handshake na hindi mula sa browser.

### Pagtutugma ng CLI Fingerprint

Muling isinasaayos ng **CLI Fingerprint Toggle** (`Settings → Security`) ang mga HTTP header at field ng JSON body upang tumugma sa eksaktong signature ng mga native CLI binary (Claude Code, Codex, atbp.). Gumagana ito **kasabay ng** proxy:

```
Iyong IP (naka-block) → Proxy IP (US) → Provider API
                         + TLS spoof
                         + CLI fingerprint
```

Sabay mong nakukuha ang **IP masking** at **pagiging tunay ng request**.

### Pagpapanatili ng Proxy IP

Ipinapakita ng mga badge na may color coding sa dashboard kung aling antas ng proxy ang aktibo:

| Badge | Antas      | Kahulugan                                               |
| ----- | ---------- | ------------------------------------------------------- |
| 🟢    | Global     | Dumadaan sa proxy na ito ang lahat ng trapiko           |
| 🟡    | Provider   | Trapiko lang ng provider na ito ang dumadaan sa proxy   |
| 🔵    | Connection | Ginagamit ng partikular na key/account na ito ang proxy |

Ipinapakita rin ng badge ang na-resolve na proxy IP para sa beripikasyon.

---

## Mga Upstream Proxy Mode

Para sa mga provider na gumagamit ng pattern na CLIProxyAPI, sinusuportahan ng OmniRoute ang tatlong upstream proxy mode:

| Mode          | Paglalarawan                                                                   |
| ------------- | ------------------------------------------------------------------------------ |
| `native`      | Direktang pinangangasiwaan ng OmniRoute ang proxy routing (default)            |
| `cliproxyapi` | Ipinapasa sa isang external na CLIProxyAPI instance                            |
| `fallback`    | Sinusubukan muna ang native, pagkatapos ay lilipat sa CLIProxyAPI kapag nabigo |

I-configure para sa bawat provider:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Dashboard UI

### Settings → Proxy Tab

- Configuration ng **global proxy** (isang beses lang itakda para sa lahat ng trapiko)
- Mga override ng **proxy para sa bawat provider**
- Mga assignment ng **proxy para sa bawat connection**
- **Pagsubok sa connection** sa pamamagitan ng naka-configure na proxy
- Mga **badge na may color coding** na nagpapakita ng aktibong antas ng proxy

### Settings → 1proxy Tab

- Button na **Sync Now** upang kumuha ng mga libreng proxy
- Mga **stats card**: Kabuuan, Aktibo, Average na Kalidad, Huling Sync
- Mga **filter**: Protocol, Country Code, Minimum na Kalidad
- **Talahanayan ng proxy** na may host, protocol, bansa, quality score, latency, anonymity, at access sa Google
- Panel ng **sync status** na sumusubaybay sa tagumpay/pagkabigo at bilang ng magkakasunod na pagkabigo
- **Clear All** upang alisin ang lahat ng entry ng 1proxy

---

## Sanggunian ng API

### Proxy Settings API

| Method   | Endpoint                                       | Paglalarawan                     |
| -------- | ---------------------------------------------- | -------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Kunin ang buong proxy config     |
| `GET`    | `/api/settings/proxy?level=global`             | Kunin ang global proxy           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Kunin ang provider proxy         |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | I-resolve ang aktuwal na proxy   |
| `PUT`    | `/api/settings/proxy`                          | I-update ang proxy config        |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Alisin ang proxy sa antas na ito |

### Proxy Registry API

| Method   | Endpoint                                          | Paglalarawan                          |
| -------- | ------------------------------------------------- | ------------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Ilista ang lahat ng proxy             |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Kunin ang proxy ayon sa ID            |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Kunin ang mga assignment ng proxy     |
| `POST`   | `/api/v1/management/proxies`                      | Gumawa ng proxy                       |
| `PATCH`  | `/api/v1/management/proxies`                      | I-update ang proxy                    |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Burahin ang proxy                     |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Sapilitang burahin                    |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Magtalaga nang maramihan              |
| `GET`    | `/api/v1/management/proxies/assignments`          | Ilista ang mga assignment             |
| `GET`    | `/api/v1/management/proxies/health`               | Mga estadistika ng kalusugan ng proxy |

### Tunnels API

Para ilantad ang iyong OmniRoute instance sa pampublikong internet (Cloudflare/ngrok/Tailscale) sa halip na iruta ang outbound traffic sa pamamagitan ng proxy, tingnan ang [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). Matatagpuan ang tunnel REST API sa ilalim ng `/api/tunnels/{cloudflared,ngrok,tailscale}/*` at hiwalay ito sa outbound proxy chain na idinokumento sa itaas.

### 1proxy API

| Method   | Endpoint                               | Paglalarawan                  |
| -------- | -------------------------------------- | ----------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Ilista ang mga 1proxy proxy   |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Kunin ang stats + sync status |
| `GET`    | `/api/settings/oneproxy?action=status` | Kunin lamang ang sync status  |
| `POST`   | `/api/settings/oneproxy`               | Simulan ang sync              |
| `POST`   | `/api/settings/oneproxy/rotate`        | Lumipat sa susunod na proxy   |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Burahin ang isa               |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Burahin ang lahat             |

### Upstream Proxy API

| Method   | Endpoint                          | Paglalarawan                     |
| -------- | --------------------------------- | -------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Kunin ang upstream proxy config  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Itakda ang upstream proxy mode   |
| `DELETE` | `/api/upstream-proxy/:providerId` | Alisin ang upstream proxy config |

---

## Mga Environment Variable

| Variable              | Default | Paglalarawan                                                               |
| --------------------- | ------- | -------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`  | I-enable ang suporta sa SOCKS5 proxy (default na `true` sa `.env.example`) |

---

## Pag-troubleshoot

### "Naka-disable ang SOCKS5 proxy"

Itakda ang `ENABLE_SOCKS5_PROXY=true` sa iyong `.env` file at i-restart.

### Mga error na "socket hang up" sa pamamagitan ng proxy

Normal ito sa mga murang proxy na pinuputol ang mga idle na koneksyon. Pinangangasiwaan na ito ng OmniRoute sa pamamagitan ng:

- Pag-disable ng keep-alive sa mga koneksyon ng proxy (`keepAliveTimeout: 1`)
- Pag-disable ng pipelining (`pipelining: 0`)
- Pag-cache ng mga dispatcher upang maiwasan ang paulit-ulit na handshake

Kung magpapatuloy ito, sumubok ng ibang proxy o gamitin ang tampok na pag-rotate ng 1proxy.

### "unsupported_country_region_territory" habang gumagamit ng OAuth

Tiyaking naka-configure ang proxy **bago** simulan ang OAuth flow. Ipinapadaan ng OmniRoute ang OAuth token exchange sa naka-configure na proxy. Magtakda muna ng global o provider-level na proxy, pagkatapos ay kumonekta.

### Hindi ginagamit ang proxy

Suriin ang pagkakasunod-sunod ng resolution:

1. I-verify gamit ang `GET /api/settings/proxy?resolve=your-connection-id`
2. Suriin kung `active` ang `status` ng proxy (hindi `inactive`)
3. Tiyaking tumutugma ang saklaw ng pagtatalaga ng proxy sa iyong koneksyon

### Nabibigo ang pag-sync ng 1proxy

Suriin ang status ng pag-sync:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Kung `consecutiveFailures >= 5`, na-trigger ang circuit breaker. I-restart ang server upang i-reset ito, o maghintay ng manu-manong pag-reset.

---

## Schema ng Database

### Table na `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' o 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (1proxy lamang)
  latency_ms INTEGER,                        -- mga millisecond (1proxy lamang)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- makaka-access ba ng Google? (1proxy)
  last_validated TEXT,                       -- ISO timestamp (1proxy)
  country_code TEXT,                         -- ISO 2-letter code (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Table na `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provider ID, connection ID, o combo ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Pagsusuri sa Kalusugan ng Proxy (v3.8.16+)

Tinutukoy ng mekanismong **proxy fast-fail** ng OmniRoute (`src/lib/proxyHealth.ts`) ang mga hindi gumaganang proxy sa loob ng <2s sa pamamagitan ng mabilisang pagsusuri sa koneksyon ng TCP, pagkatapos ay **kina-cache ang resulta** upang maiwasan ang overhead sa bawat request.

### Paano Ito Gumagana

```
Request ──▶ ProxyHealthCache.get(url)
             │
             ├─ May cache hit + bago pa?  ──▶ ibalik ang naka-cache na status
             │
             └─ Cache miss / lipas na?  ──▶ Kumonekta sa TCP sa host:port
                                            (timeout: FAST_FAIL_TIMEOUT_MS)
                                            ──▶ i-cache sa loob ng HEALTH_CACHE_TTL_MS
                                            ──▶ ibalik ang resulta
```

Kung wala ito, iba-block ng hindi gumaganang proxy ang bawat request sa buong tagal ng `PROXY_TIMEOUT_MS` (default na 30s) bago mabigo.

### Mga Naa-adjust na Environment Variable

| Variable                     | Default | Layunin                                                     |
| ---------------------------- | ------- | ----------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | Timeout ng koneksyon ng TCP sa bawat pagsusuri ng kalusugan |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | Tagal ng pag-cache sa resulta ng kalusugan                  |

**Mga inirerekomendang value:**

| Sitwasyon                   | Fast-fail timeout | Cache TTL | Dahilan                                                                                                    |
| --------------------------- | ----------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| High-throughput API gateway | 1500ms            | 60000ms   | Agresibong fail-fast, mas mahabang cache upang mabawasan ang mga pagsusuri                                 |
| Mga geo-distributed node    | 3000ms            | 15000ms   | Kailangan ng mas mababagal na network ng mas maraming oras; mas maikling cache para sa mabilis na failover |
| Dev / testing               | 1000ms            | 10000ms   | Mabilis na pag-uulit sa mga lokal na proxy                                                                 |
| Stealth / anti-detection    | 2500ms            | 45000ms   | Iwasan ang mabilis na probing na maaaring mag-trigger ng mga rate limit                                    |

### Pagsusuri sa Kalusugan ng Proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Sapilitang suriin muli ang isang partikular na proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Ang flag na `stale` ay `true` kapag lumampas na sa `HEALTH_CACHE_TTL_MS` ang cache entry at magti-trigger ang susunod na request ng panibagong pagsusuri.

### Mga Default Batay sa Uri ng Proxy

Gumagamit ang pagsusuri ng kalusugan ng mga naaangkop na default batay sa URL scheme:

| Scheme                     | Default na port |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

Laging mas inuuna ang mga custom na port sa URL (`http://host:9999`) kaysa sa default ng scheme.

---

## Analytics at Observability ng Proxy

Sinusubaybayan ng OmniRoute ang paggamit ng bawat proxy upang matulungan ang mga operator na masuri ang mga pattern ng pagruruta, biglaang pagtaas ng latency, at mga paulit-ulit na pagkabigo.

### Mga Sinusubaybayan

Para sa bawat kahilingang dumadaan sa isang naka-configure na proxy, itinatala ng OmniRoute ang sumusunod:

| Sukatan      | Paglalarawan                                        |
| ------------ | --------------------------------------------------- |
| `proxy_url`  | Buong URL ng proxy (nakatago ang mga kredensyal)    |
| `provider`   | ID ng upstream provider (openai, anthropic, atbp.)  |
| `latency_ms` | Kabuuang round-trip time kasama ang proxy handshake |
| `connect_ms` | Oras lamang ng pagkonekta sa TCP                    |
| `status`     | HTTP status code mula sa upstream                   |
| `error`      | Klase ng error kung nabigo ang kahilingan           |
| `timestamp`  | ISO 8601 UTC                                        |

### Pag-access sa Data

```bash
# Mga kamakailang kaganapan sa proxy
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Ang aktuwal na endpoint ay `/api/usage/proxy-logs` (tingnan ang `src/app/api/usage/proxy-logs/route.ts`). Sinusuportahan ng endpoint na ito ang:

- `GET /api/usage/proxy-logs` — kunin ang mga log ng proxy
- `DELETE /api/usage/proxy-logs` — burahin ang lahat ng log ng proxy

Kung kinakailangan, maaaring direktang i-query sa pamamagitan ng SQL ang pinagsama-samang mga istatistika mula sa table na `proxy_logs`. Maaaring mag-alok ang dashboard UI ng mga pinagsama-samang view.

### Mga Karaniwang Pattern

**Tukuyin ang isang pabago-bagong proxy** (salit-salitan sa pagitan ng tagumpay/pagkabigo):

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

**Maghanap ng mababagal na proxy** (p95 latency > 2s):

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

## Decision Tree para sa Estratehiya ng Rotation

Kapag maraming proxy ang nakatalaga sa isang saklaw, gumagamit ang OmniRoute ng **estratehiya ng rotation** upang piliin kung alin ang gagamitin para sa bawat kahilingan. Kino-configure ang estratehiya sa antas ng saklaw (pangkalahatan, bawat provider, bawat account, bawat combo).

### Mga Magagamit na Estratehiya

| Estratehiya         | Kailan gagamitin                                | Kapalit na konsiderasyon                                                            |
| ------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| `quality` (default) | Production na may magkakaibang kalidad ng proxy | Pinapaboran ang matataas ang rating; maaaring hindi magamit ang mabababa ang rating |
| `random`            | Pamamahagi ng load, privacy                     | Pantay na pamamahagi; hindi isinasaalang-alang ang mga signal ng kalidad            |
| `sequential`        | Pag-debug, deterministic na pagsubok            | Sunod-sunod na umiikot sa mga proxy; madaling unawain                               |

### Decision Tree

```
                    Mayroon ka bang quality score para sa iyong mga proxy?
                    │
        ┌───────────┴───────────┐
        │                       │
       OO                      HINDI
        │                       │
   Halos magkakapantay          │
   ba ang kalidad ng            │
   lahat ng proxy?              │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  OO       HINDI             Gamitin ang
   │         │              `random`
   │         │              (ang pantay na
   │         │              pamamahagi ay bumubuo
   │         │              ng data ng kalidad
   │         │              sa paglipas ng panahon)
   │         │
   │    Gamitin ang `quality`
   │    (pinakamainam para sa
   │    magkakaibang kalidad)
   │
Gamitin ang `random`
(ipamahagi ang load
nang pantay)
```

## Awtomatikong Pagbubukod ng Nabigong Sarili Mong mga Proxy

Awtomatikong ibinababa ng marketplace pool ng 1proxy ang antas ng mga nabigong proxy (tingnan ang
[Mga Marka ng Kalidad ng Proxy](#proxy-quality-scores)). Para sa mga proxy na **ikaw** ang
nagdagdag sa registry, ibinibigay ng background health scheduler
(`src/lib/proxyHealth/scheduler.ts`) ang parehong gawi na "awtomatikong ibukod ang patay na miyembro
mula sa chain," nang walang tinatanggal:

```bash
# .env — pansamantalang i-disable ang proxy pagkatapos ng 3 magkakasunod na nabigong probe, at muli itong i-enable
# nang awtomatiko kapag nagsimula itong tumugon muli sa mga probe.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Paano ito gumagana sa isang multi-proxy chain:

1. Sinusuri ng scheduler ang bawat nakarehistrong proxy kada `PROXY_HEALTH_INTERVAL_MS`
   (default na 10 min; minimum na 1 min).
2. Pagkatapos ng `PROXY_AUTO_REMOVE_AFTER` magkakasunod na **tiyak** na pagkabigo (isang tunay na
   pagkabigo sa koneksyon — hindi kailanman binibilang ang timeout o ang sariling 5xx ng target ng probe, tingnan ang
   [Pagsusuri sa Kalagayan ng Proxy](#proxy-health-checking-v3816)), itinatakda sa
   `dead` ang `status` ng proxy.
3. Ang `dead` ay isa sa mga status na ibinubukod ng filter ng aktibong status na ginagamit ng paglutas
   ng pool/rotation, kaya agad na tumitigil ang rotation ng isang scope (round-robin / random / sticky /
   latency — tingnan ang [Decision Tree ng Diskarte sa Rotation](#rotation-strategy-decision-tree))
   sa pagbibigay ng proxy na iyon sa mga bagong request. Walang ibang proxy sa
   pool ang naaapektuhan, at hindi kailanman tahimik na babalik ang buong pool sa isang direktang
   koneksyon — tingnan ang fail-closed guard ng [4-Level na Sistema ng Proxy](#4-level-proxy-system).
4. Patuloy na sinusuri ng scheduler ang mga `dead` na proxy sa parehong interval. Sa susunod na
   matagumpay na probe, ibinabalik ang `status` sa `active` at muli itong isinasama sa rotation —
   hindi na kailangang manu-manong idagdag muli.

Sinadya itong maging **opt-in at hindi mapanira**: bilang default, binibilang at itinatala lamang
ng scheduler ang mga pagkabigo (tingnan ang patakaran C sa `decision.ts`), at hindi kailanman
nagtatanggal ng row ang `PROXY_AUTO_DISABLE` — para rito ang hiwalay at mas agresibong
flag na `PROXY_AUTO_REMOVE`. Kung parehong nakatakda sa `true`, mananaig ang `PROXY_AUTO_REMOVE`
(walang silbi ang pansamantalang pag-disable sa proxy na malapit nang tanggalin). Tingnan ang
sanggunian na [Configuration ng Environment](../reference/ENVIRONMENT.md) para sa kumpletong
listahan ng mga variable.

---

> 📖 **Kaugnay na dokumentasyon:**
>
> - [Gabay ng Gumagamit](../guides/USER_GUIDE.md) — Pangkalahatang pag-setup at configuration
> - [Sanggunian ng API](../reference/API_REFERENCE.md) — Kumpletong dokumentasyon ng API
> - [Configuration ng Environment](../reference/ENVIRONMENT.md) — Lahat ng environment variable
