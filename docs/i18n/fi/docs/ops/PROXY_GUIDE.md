# 🌐 OmniRoute Proxy Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Ohita maantieteelliset estot, suojaa henkilöllisyytesi ja reititä tekoälyliikenne minkä tahansa välityspalvelimen kautta — ilman monimutkaista määritystä.**

OmniRoute sisältää kattavan välityspalvelinten hallintajärjestelmän, jonka avulla voit reitittää tekoälypalveluntarjoajille lähtevän liikenteen HTTP-, HTTPS- tai SOCKS5-välityspalvelinten kautta. Olitpa estetyllä alueella, tarvitset IP-osoitteiden kierrätystä tai haluat estää sormenjälkitunnistuksen — tämä opas kattaa kaiken.

---

## Sisällysluettelo

- [Miksi käyttää välityspalvelimia?](#why-use-proxies)
- [Arkkitehtuurin yleiskatsaus](#architecture-overview)
- [4-tasoinen välityspalvelinjärjestelmä](#4-level-proxy-system)
- [Välityspalvelinrekisteri (CRUD)](#proxy-registry-crud)
- [Ilmainen 1proxy-markkinapaikka](#1proxy-free-proxy-marketplace)
- [Välityspalvelinten kierrätys](#proxy-rotation)
- [Tunnistamisen esto ja häivetila](#anti-detection--stealth)
- [Lähtevän liikenteen välityspalvelintilat](#upstream-proxy-modes)
- [Hallintapaneelin käyttöliittymä](#dashboard-ui)
- [API-viite](#api-reference)
- [Ympäristömuuttujat](#environment-variables)
- [Vianmääritys](#troubleshooting)

---

## Miksi käyttää välityspalvelimia?

Monet tekoälypalveluntarjoajat rajoittavat käyttöä maantieteellisen alueen perusteella. Kehittäjät **Venäjällä, Kiinassa, Iranissa, Kuubassa, Turkissa** ja muissa maissa kohtaavat seuraavan kaltaisia virheitä:

```
unsupported_country_region_territory
```

Välityspalvelimista on hyötyä myös estettyjen alueiden ulkopuolella:

| Käyttötapaus                         | Kuvaus                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------- |
| **Maantieteellisten estojen ohitus** | Käytä OpenAI-, Anthropic-, Codex- ja Copilot-palveluita estetyistä maista |
| **IP-osoitteiden kierrätys**         | Jaa pyynnöt useille IP-osoitteille nopeusrajoitusten välttämiseksi        |
| **Yksityisyys**                      | Piilota todellinen IP-osoitteesi palveluntarjoajilta                      |
| **Vaatimustenmukaisuus**             | Reititä liikenne tiettyjen lainkäyttöalueiden kautta                      |
| **Testaus**                          | Simuloi eri alueilta lähetettyjä pyyntöjä                                 |

---

## Arkkitehtuurin yleiskatsaus

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-palvelin                      │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Välityspal- │    │ Välityspal-  │    │ Välityspalvelin-│  │
│  │ velinrekis- │───▶│ velinvälitys │───▶│ haku (undici)    │  │
│  │ teri(SQLite)│    │ (välimuisti) │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-     │                        │ Ulkoinen         │  │
│  │ synkronointi│                        │ palveluntarjoaja │  │
│  │(ilmainen valikoima)                  │ API              │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Keskeiset komponentit

| Komponentti                  | Tiedosto                                     | Rooli                                                                   |
| ---------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| **Välityspalvelinrekisteri** | `src/lib/db/proxies.ts`                      | Välityspalvelinmerkintöjen CRUD-toiminnot ja käyttöalueiden määritykset |
| **Välityspalvelinvälitys**   | `open-sse/utils/proxyDispatcher.ts`          | Luo välimuistia käyttävät `undici` ProxyAgent-/SOCKS-välittäjät         |
| **Välityspalvelinhaku**      | `open-sse/utils/proxyFetch.ts`               | Ympäröi `fetch()`-kutsun välityspalvelinvälittäjän injektoinnilla       |
| **Asetusreitti**             | `src/app/api/settings/proxy/route.ts`        | Vanha välityspalvelinmääritysten API (GET/PUT/DELETE)                   |
| **Hallintareitti**           | `src/app/api/v1/management/proxies/route.ts` | Rekisterin CRUD-API (GET/POST/PATCH/DELETE)                             |
| **1proxy-tietokanta**        | `src/lib/db/oneproxy.ts`                     | Ilmaisen välityspalvelinmarkkinapaikan pysyvä tallennus                 |

---

## 4-tasoinen välityspalvelinjärjestelmä

OmniRoute tukee välityspalvelinten määritystä **neljällä toisistaan riippumattomalla tasolla**, jotka ratkaistaan tärkeysjärjestyksessä:

```
Tärkeysjärjestys (korkein → matalin):

  1. 🔵 Tilin/yhteyden välityspalvelin  →  API-avaimen / OAuth-yhteyden mukaan
  2. 🟡 Palveluntarjoajan välityspalvelin → palveluntarjoajan mukaan (esim. kaikki OpenAI-liikenne)
  3. 🟠 Yhdistelmän välityspalvelin      → yhdistelmä-/reititysmäärityksen mukaan
  4. 🟢 Yleinen välityspalvelin         → kaikki liikenne, kaikki palveluntarjoajat
```

### Ratkaisujärjestyksen toiminta

Kun OmniRoute lähettää pyynnön ulkoiselle palveluntarjoajalle, se kutsuu `resolveProxyForConnectionFromRegistry()`-funktiota, joka tarkistaa jokaisen tason järjestyksessä:

1. **Tilitason määritys** — Onko tälle tietylle yhteystunnukselle määritetty välityspalvelin?
2. **Palveluntarjoajatason määritys** — Onko tälle palveluntarjoajalle (esim. `openai`) määritetty välityspalvelin?
3. **Yleisen tason määritys** — Onko yleinen välityspalvelin määritetty?
4. **Ei välityspalvelinta** — Suora yhteys palveluntarjoajaan.

Ensimmäinen osuma valitaan. Tämä tarkoittaa, että voit määrittää yleisen välityspalvelimen varavaihtoehdoksi mutta ohittaa sen tietyille palveluntarjoajille tai yhteyksille.

### Välityspalvelimen kautta kulkeva liikenne

| Liikenteen tyyppi      | Välitetäänkö? | Huomautukset                                             |
| ---------------------- | ------------- | -------------------------------------------------------- |
| Keskustelutäydennykset | ✅            | Kaikki `/v1/chat/completions`-pyynnöt                    |
| Upotukset              | ✅            | `/v1/embeddings`                                         |
| Kuvien luonti          | ✅            | `/v1/images/generations`                                 |
| Ääni (TTS/STT)         | ✅            | `/v1/audio/*`                                            |
| OAuth-tunnuksen vaihto | ✅            | Ratkaisee `unsupported_country_region_territory`-virheen |
| Yhteystestit           | ✅            | "Test Connection" -painike käyttää välityspalvelinta     |
| Tunnuksen uusiminen    | ✅            | OAuth-tunnuksen uusiminen taustalla                      |
| Mallien synkronointi   | ✅            | Mallien luettelointi ja etsiminen                        |

---

## Välityspalvelinrekisteri (CRUD)

Välityspalvelinrekisteri on SQLite-taulu (`proxy_registry`), johon kaikki välityspalvelimesi tallennetaan. Jokaisella välityspalvelimella on seuraavat kentät:

| Kenttä     | Tyyppi       | Kuvaus                                               |
| ---------- | ------------ | ---------------------------------------------------- |
| `id`       | UUID         | Yksilöllinen tunniste                                |
| `name`     | Merkkijono   | Ihmisen luettavissa oleva nimi                       |
| `type`     | Merkkijono   | Protokolla: `http`, `https`, `socks5`                |
| `host`     | Merkkijono   | Välityspalvelimen isäntänimi tai IP-osoite           |
| `port`     | Kokonaisluku | Portin numero                                        |
| `username` | Merkkijono   | Todennuksen käyttäjänimi (salattuna tallennettaessa) |
| `password` | Merkkijono   | Todennuksen salasana (salattuna tallennettaessa)     |
| `region`   | Merkkijono   | Maantieteellisen alueen tunniste                     |
| `notes`    | Merkkijono   | Vapaamuotoiset muistiinpanot                         |
| `status`   | Merkkijono   | `active` tai `inactive`                              |
| `source`   | Merkkijono   | `manual` tai `oneproxy`                              |

### Välityspalvelimen luominen

**Hallintapaneelin kautta:**

1. Siirry kohtaan **Settings → Proxy**
2. Napsauta **Add Proxy**
3. Anna tyyppi, isäntänimi, portti ja valinnaiset todennustiedot
4. Tallenna

**API:n kautta:**

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

### Välityspalvelimen päivittäminen

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Huomautus:** Todennustiedot säilytetään, ellet nimenomaisesti lähetä niiden tilalle uusia arvoja, jotka eivät ole tyhjiä. Tyhjien merkkijonojen lähettäminen `username`-/`password`-kentissä säilyttää tallennetut arvot.

### Välityspalvelimen poistaminen

```bash
# Epäonnistuu, jos välityspalvelin on määritetty mille tahansa tasolle
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Pakotettu poisto (poistaa myös määritykset)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Välityspalvelinten luettelointi

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Välityspalvelinten määrittäminen eri tasoille

```bash
# Määritä yleiselle tasolle
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Määritä tietylle palveluntarjoajalle
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Määritä tietylle yhteydelle/avaimelle
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Käytettävän välityspalvelimen ratkaiseminen

Tarkista, mitä välityspalvelinta tietylle yhteydelle käytettäisiin:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Palauttaa ratkaistun välityspalvelimen sekä sen tason (`account`, `provider` tai `global`) ja lähteen.

### Joukkomääritys

Määritä yksi välityspalvelin useille palveluntarjoajille tai yhteyksille kerralla:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Tuonti/vienti

Välityspalvelimet sisältyvät **varmuuskopiointi-/palautusjärjestelmään**. Kun viet OmniRoute-määrityksesi:

1. Siirry kohtaan **Dashboard → Settings → Backup**
2. Napsauta **Export** — välityspalvelinrekisteri ja määritykset sisällytetään vientiin
3. Palauta tiedot napsauttamalla **Import** ja lataamalla varmuuskopiotiedosto

Välityspalvelinrekisteri tukee myös **upsert-toimintoa isäntänimen ja portin perusteella** — jos tuot välityspalvelimen, joka on jo olemassa (sama isäntänimi ja portti), olemassa oleva tietue päivitetään kaksoiskappaleen luomisen sijaan.

### Vanhojen määritysten siirto

Jos määritit välityspalvelimia vanhemmassa versiossa (ennen rekisteriä), OmniRoute siirtää ne automaattisesti:

```
Vanha key_value-tietovarasto → proxy_registry + proxy_assignments
```

Tämä tapahtuu kerran ensimmäisen päivityksen jälkeisen käynnistyksen yhteydessä. Suorita siirto uudelleen komennolla `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## 1proxy – ilmaisten välityspalvelinten markkinapaikka

> 🆕 **Tekijä: [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (ongelma [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute integroituu **[1proxy](https://1proxy-api.aitradepulse.com)**-yhteisöalustaan ja tarjoaa pääsyn **satoihin ilmaisiin, validoituihin välityspalvelimiin** eri puolilta maailmaa. Tämä sopii täydellisesti käyttäjille, joilla ei ole omaa välityspalvelininfrastruktuuria.

### Toimintaperiaate

```
┌─────────────┐   Synkronointi  ┌─────────────────┐   Kierto     ┌─────────────────┐
│  1proxy API │ ──────────────▶ │  proxy_registry  │ ──────────▶ │ Palveluntarjoajan│
│  (ulkoinen) │  enintään 500   │  source=oneproxy │  laadun      │       API       │
└─────────────┘ välityspalvelinta└─────────────────┘  perusteella └─────────────────┘
```

1. **Synkronointi** — OmniRoute hakee validoidut välityspalvelimet 1proxy-rajapinnasta
2. **Tallennus** — Välityspalvelimet tallennetaan samaan `proxy_registry`-tauluun arvolla `source = 'oneproxy'`
3. **Suodatus** — Suodata protokollan, maan ja laatupisteiden perusteella
4. **Kierto** — Valitse paras välityspalvelin käyttämällä laatuun perustuvaa, satunnaista tai peräkkäistä strategiaa
5. **Automaattinen heikennys** — Epäonnistuneiden välityspalvelinten laatupisteitä alennetaan; raja-arvon alittuessa → merkitään ei-aktiiviseksi

### Välityspalvelinten synkronointi

**Hallintapaneelin kautta:**

1. Siirry välilehteen **Asetukset → 1proxy**
2. Napsauta **"Synkronoi nyt"**
3. Tarkastele tilastoja: välityspalvelinten kokonaismäärä, aktiivisten määrä, keskimääräinen laatu ja maakohtainen jakauma

**Rajapinnan kautta:**

```bash
# Käynnistä synkronointi
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Vastaus:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Välityspalvelinten suodatus

```bash
# Suodata protokollan perusteella
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Suodata maan perusteella
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Suodata laatupisteiden vähimmäisarvon perusteella
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Yhdistä suodattimia
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Välityspalvelinten laatupisteet

Jokainen 1proxy-välityspalvelin sisältää seuraavat metatiedot:

| Kenttä          | Kuvaus                                               |
| --------------- | ---------------------------------------------------- |
| `qualityScore`  | 1proxyn validoinnin antama arvosana asteikolla 0–100 |
| `latencyMs`     | Mitattu verkkoviive                                  |
| `anonymity`     | `transparent`, `anonymous` tai `elite`               |
| `googleAccess`  | Voiko välityspalvelin käyttää Googlen palveluita     |
| `countryCode`   | Kaksikirjaiminen ISO-maakoodi                        |
| `lastValidated` | Viimeisimmän validoinnin aikaleima                   |

Laatupisteitä säädetään dynaamisesti:

- **Epäonnistuneet pyynnöt** alentavat pistemäärää 10 pisteellä
- **Pistemäärä laskee arvoon ≤10** → välityspalvelin merkitään tilaan `inactive`
- Ei-aktiiviset välityspalvelimet jätetään kierron ulkopuolelle

### Kiertostrategiat

```bash
# Kierrä laadun perusteella (paras välityspalvelin ensin) — oletus
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Satunnainen kierto
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Peräkkäinen kierto (kauimmin sitten validoitu ensin)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Katkaisija

1proxy-synkronoinnissa on sisäänrakennettu katkaisija:

- **5 peräkkäisen synkronointivirheen** jälkeen uudet synkronointiyritykset estetään
- Nollaa komennolla `resetOneproxyCircuitBreaker()` tai käynnistä palvelin uudelleen
- Synkronoinnin tila on saatavilla osoitteessa `GET /api/settings/oneproxy?action=status`

### 1proxy-välityspalvelinten tyhjentäminen

```bash
# Poista yksittäinen 1proxy-välityspalvelin
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Tyhjennä KAIKKI 1proxy-välityspalvelimet (manuaalisia välityspalvelimia ei muuteta)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Havaitsemisen esto ja huomaamattomuus

OmniRoute ei ainoastaan reititä liikennettä välityspalvelimen kautta — se saa liikenteen näyttämään aidolta:

### TLS-sormenjäljen väärentäminen

Luo `wreq-js`-paketin avulla selaimen kaltaisia TLS-sormenjälkiä ja ohittaa bottien tunnistusjärjestelmät, jotka merkitsevät muiden kuin selainten TLS-kättelyt epäilyttäviksi.

### CLI-sormenjäljen täsmäytys

**CLI-sormenjäljen valitsin** (`Asetukset → Suojaus`) järjestää HTTP-otsakkeet ja JSON-rungon kentät uudelleen vastaamaan natiivien CLI-binääritiedostojen (Claude Code, Codex jne.) tarkkaa allekirjoitusta. Tämä toimii **välityspalvelimen lisäksi**:

```
IP-osoitteesi (estetty) → Välityspalvelimen IP (Yhdysvallat) → Palveluntarjoajan API
                          + TLS-väärennös
                          + CLI-sormenjälki
```

Saat samanaikaisesti sekä **IP-osoitteen peittämisen** että **pyynnön aitouden**.

### Välityspalvelimen IP-osoitteen säilyttäminen

Hallintapaneelin värikoodatut tunnukset osoittavat aktiivisen välityspalvelintason:

| Tunnus | Taso     | Merkitys                                              |
| ------ | -------- | ----------------------------------------------------- |
| 🟢     | Globaali | Kaikki liikenne kulkee tämän välityspalvelimen kautta |
| 🟡     | Tarjoaja | Vain tämän palveluntarjoajan liikenne välitetään      |
| 🔵     | Yhteys   | Tämä tietty avain/tili käyttää tätä välityspalvelinta |

Tunnus näyttää tarkistusta varten myös selvitetyn välityspalvelimen IP-osoitteen.

---

## Ylävirran välityspalvelintilat

CLIProxyAPI-mallia käyttäville palveluntarjoajille OmniRoute tukee kolmea ylävirran välityspalvelintilaa:

| Tila          | Kuvaus                                                               |
| ------------- | -------------------------------------------------------------------- |
| `native`      | OmniRoute käsittelee välityspalvelinreitityksen suoraan (oletus)     |
| `cliproxyapi` | Delegoi ulkoiselle CLIProxyAPI-instanssille                          |
| `fallback`    | Kokeilee ensin natiivia tilaa ja siirtyy tarvittaessa CLIProxyAPI:in |

Määritä palveluntarjoajakohtaisesti:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Hallintapaneelin käyttöliittymä

### Asetukset → Välityspalvelin-välilehti

- **Globaalin välityspalvelimen** määritys (määritä kerran kaikkea liikennettä varten)
- **Palveluntarjoajakohtaiset välityspalvelimen** ohitukset
- **Yhteyskohtaiset välityspalvelinmääritykset**
- **Yhteystesti** määritetyn välityspalvelimen kautta
- **Värikoodatut tunnukset**, jotka näyttävät aktiivisen välityspalvelintason

### Asetukset → 1proxy-välilehti

- **Synkronoi nyt** -painike ilmaisten välityspalvelinten hakemiseen
- **Tilastokortit**: yhteensä, aktiiviset, keskimääräinen laatu, viimeisin synkronointi
- **Suodattimet**: protokolla, maakoodi, vähimmäislaatu
- **Välityspalvelintaulukko**, jossa näkyvät isäntä, protokolla, maa, laatupisteet, viive, anonymiteetti ja Google-käyttöoikeus
- **Synkronoinnin tilapaneeli**, jossa seurataan onnistumisia, epäonnistumisia ja peräkkäisten epäonnistumisten määrää
- **Tyhjennä kaikki** kaikkien 1proxy-merkintöjen poistamiseen

---

## API-viite

### Välityspalvelinasetusten API

| Menetelmä | Päätepiste                                     | Kuvaus                                    |
| --------- | ---------------------------------------------- | ----------------------------------------- |
| `GET`     | `/api/settings/proxy`                          | Hae välityspalvelimen koko määritys       |
| `GET`     | `/api/settings/proxy?level=global`             | Hae globaali välityspalvelin              |
| `GET`     | `/api/settings/proxy?level=provider&id=openai` | Hae palveluntarjoajan välityspalvelin     |
| `GET`     | `/api/settings/proxy?resolve=connectionId`     | Selvitä käytössä oleva välityspalvelin    |
| `PUT`     | `/api/settings/proxy`                          | Päivitä välityspalvelimen määritys        |
| `DELETE`  | `/api/settings/proxy?level=provider&id=openai` | Poista välityspalvelin kyseiseltä tasolta |

### Välityspalvelinrekisterin API

| Menetelmä | Päätepiste                                        | Kuvaus                                    |
| --------- | ------------------------------------------------- | ----------------------------------------- |
| `GET`     | `/api/v1/management/proxies`                      | Luettele kaikki välityspalvelimet         |
| `GET`     | `/api/v1/management/proxies?id=uuid`              | Hae välityspalvelin tunnuksen perusteella |
| `GET`     | `/api/v1/management/proxies?id=uuid&where_used=1` | Hae välityspalvelinmääritykset            |
| `POST`    | `/api/v1/management/proxies`                      | Luo välityspalvelin                       |
| `PATCH`   | `/api/v1/management/proxies`                      | Päivitä välityspalvelin                   |
| `DELETE`  | `/api/v1/management/proxies?id=uuid`              | Poista välityspalvelin                    |
| `DELETE`  | `/api/v1/management/proxies?id=uuid&force=1`      | Pakota poistaminen                        |
| `POST`    | `/api/v1/management/proxies/bulk-assign`          | Määritä joukkona                          |
| `GET`     | `/api/v1/management/proxies/assignments`          | Luettele määritykset                      |
| `GET`     | `/api/v1/management/proxies/health`               | Välityspalvelinten kuntotilastot          |

### Tunnelien API

Lisätietoja OmniRoute-instanssin julkaisemisesta internetiin (Cloudflare/ngrok/Tailscale) lähtevän liikenteen välityspalvelimen kautta reitittämisen sijaan on oppaassa [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). Tunnelien REST API sijaitsee polun `/api/tunnels/{cloudflared,ngrok,tailscale}/*` alla ja on riippumaton edellä dokumentoidusta lähtevän liikenteen välityspalvelinketjusta.

### 1proxy API

| Menetelmä | Päätepiste                             | Kuvaus                               |
| --------- | -------------------------------------- | ------------------------------------ |
| `GET`     | `/api/settings/oneproxy`               | Luettele 1proxy-välityspalvelimet    |
| `GET`     | `/api/settings/oneproxy?action=stats`  | Hae tilastot ja synkronoinnin tila   |
| `GET`     | `/api/settings/oneproxy?action=status` | Hae vain synkronoinnin tila          |
| `POST`    | `/api/settings/oneproxy`               | Käynnistä synkronointi               |
| `POST`    | `/api/settings/oneproxy/rotate`        | Vaihda seuraavaan välityspalvelimeen |
| `DELETE`  | `/api/settings/oneproxy?id=uuid`       | Poista yksi                          |
| `DELETE`  | `/api/settings/oneproxy?clearAll=1`    | Tyhjennä kaikki                      |

### Ylävirran välityspalvelimen API

| Menetelmä | Päätepiste                        | Kuvaus                                      |
| --------- | --------------------------------- | ------------------------------------------- |
| `GET`     | `/api/upstream-proxy/:providerId` | Hae ylävirran välityspalvelimen määritys    |
| `PUT`     | `/api/upstream-proxy/:providerId` | Aseta ylävirran välityspalvelintila         |
| `DELETE`  | `/api/upstream-proxy/:providerId` | Poista ylävirran välityspalvelimen määritys |

---

## Ympäristömuuttujat

| Muuttuja              | Oletusarvo | Kuvaus                                                                                 |
| --------------------- | ---------- | -------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`     | Ota SOCKS5-välityspalvelintuki käyttöön (oletuksena `true` tiedostossa `.env.example`) |

---

## Vianmääritys

### "SOCKS5-välityspalvelin on poistettu käytöstä"

Aseta `.env`-tiedostossa `ENABLE_SOCKS5_PROXY=true` ja käynnistä uudelleen.

### "socket hang up" -virheet välityspalvelinta käytettäessä

Tämä on normaalia halvoilla välityspalvelimilla, jotka katkaisevat käyttämättömät yhteydet. OmniRoute käsittelee tämän jo seuraavasti:

- Keep-alive poistetaan käytöstä välityspalvelinyhteyksissä (`keepAliveTimeout: 1`)
- Liukuhihnakäsittely poistetaan käytöstä (`pipelining: 0`)
- Välittäjät tallennetaan välimuistiin toistuvien kättelyjen välttämiseksi

Jos ongelma jatkuu, kokeile toista välityspalvelinta tai käytä 1proxy-kiertotoimintoa.

### "unsupported_country_region_territory" OAuthin aikana

Varmista, että välityspalvelin on määritetty **ennen** OAuth-prosessin aloittamista. OmniRoute reitittää OAuth-tunnuksen vaihdon määritetyn välityspalvelimen kautta. Määritä ensin yleinen tai palveluntarjoajakohtainen välityspalvelin ja muodosta sitten yhteys.

### Välityspalvelinta ei käytetä

Tarkista ratkaisujärjestys:

1. Tarkista pyynnöllä `GET /api/settings/proxy?resolve=your-connection-id`
2. Tarkista, että välityspalvelimen `status` on `active` (ei `inactive`)
3. Varmista, että välityspalvelinmäärityksen laajuus vastaa yhteyttäsi

### 1proxy-synkronointi epäonnistuu

Tarkista synkronoinnin tila:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Jos `consecutiveFailures >= 5`, suojakatkaisin on lauennut. Nollaa se käynnistämällä palvelin uudelleen tai odota manuaalista nollausta.

---

## Tietokantaskeema

### `proxy_registry`-taulu

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' tai 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (vain 1proxy)
  latency_ms INTEGER,                        -- millisekuntia (vain 1proxy)
  anonymity TEXT,                            -- läpinäkyvä/anonyymi/elite
  google_access INTEGER DEFAULT 0,           -- voiko käyttää Googlea? (1proxy)
  last_validated TEXT,                       -- ISO-aikaleima (1proxy)
  country_code TEXT,                         -- kaksikirjaiminen ISO-koodi (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments`-taulu

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- palveluntarjoajan tunnus, yhteyden tunnus tai yhdistelmän tunnus
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Välityspalvelimen kunnon tarkistus (v3.8.16+)

OmniRouten **välityspalvelimen nopean epäonnistumisen** mekanismi (`src/lib/proxyHealth.ts`) tunnistaa toimimattomat välityspalvelimet alle 2 sekunnissa nopealla TCP-yhteystarkistuksella ja **tallentaa tuloksen välimuistiin** pyyntökohtaisen kuormituksen välttämiseksi.

### Toimintaperiaate

```
Pyyntö ──▶ ProxyHealthCache.get(url)
             │
             ├─ Välimuistiosuma + tuore?  ──▶ palauta välimuistiin tallennettu tila
             │
             └─ Välimuistihuti / vanhentunut?  ──▶ TCP-yhteys kohteeseen host:port
                                                    (aikakatkaisu: FAST_FAIL_TIMEOUT_MS)
                                                    ──▶ tallenna välimuistiin ajaksi HEALTH_CACHE_TTL_MS
                                                    ──▶ palauta tulos
```

Ilman tätä toimimaton välityspalvelin estäisi jokaisen pyynnön koko `PROXY_TIMEOUT_MS`-ajan (oletuksena 30 s) ennen epäonnistumista.

### Säädettävät ympäristömuuttujat

| Muuttuja                     | Oletusarvo | Tarkoitus                                         |
| ---------------------------- | ---------- | ------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`     | TCP-yhteyden aikakatkaisu kuntotarkistusta kohden |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`    | Kuinka kauan kuntotulos säilytetään välimuistissa |

**Suositellut arvot:**

| Skenaario                            | Nopean epäonnistumisen aikakatkaisu | Välimuistin TTL | Perustelu                                                                                        |
| ------------------------------------ | ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| Suuren kapasiteetin API-yhdyskäytävä | 1500ms                              | 60000ms         | Aggressiivinen nopea epäonnistuminen ja pidempi välimuisti tarkistusten vähentämiseksi           |
| Maantieteellisesti hajautetut solmut | 3000ms                              | 15000ms         | Hitaat verkot tarvitsevat enemmän aikaa; lyhyempi välimuisti nopeaa vikasietoista vaihtoa varten |
| Kehitys / testaus                    | 1000ms                              | 10000ms         | Nopea iterointi paikallisilla välityspalvelimilla                                                |
| Häive / tunnistamisen esto           | 2500ms                              | 45000ms         | Vältä nopeaa tunnustelua, joka voisi laukaista nopeusrajoitukset                                 |

### Välityspalvelimen kunnon tarkastelu

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Pakota tietyn välityspalvelimen uudelleentarkistus
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

`stale`-lippu on `true`, kun välimuistimerkinnän ikä on ylittänyt arvon `HEALTH_CACHE_TTL_MS` ja seuraava pyyntö käynnistää uuden tarkistuksen.

### Välityspalvelintyyppikohtaiset oletusarvot

Kuntotarkistus käyttää URL-skeemaan perustuvia järkeviä oletusarvoja:

| Skeema                     | Oletusportti |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

URL-osoitteessa määritetyt mukautetut portit (`http://host:9999`) ohittavat aina skeeman oletusarvon.

---

## Välityspalvelinten analytiikka ja havainnoitavuus

OmniRoute seuraa välityspalvelinkohtaista käyttöä auttaakseen ylläpitäjiä diagnosoimaan reititysmalleja, viivepiikkejä ja toistuvia virheitä.

### Seurattavat tiedot

OmniRoute tallentaa seuraavat tiedot jokaisesta määritetyn välityspalvelimen kautta kulkevasta pyynnöstä:

| Mittari      | Kuvaus                                                      |
| ------------ | ----------------------------------------------------------- |
| `proxy_url`  | Välityspalvelimen täydellinen URL (tunnukset peitettyinä)   |
| `provider`   | Ulkoisen palveluntarjoajan tunnus (openai, anthropic jne.)  |
| `latency_ms` | Kokonaiskiertoaika, mukaan lukien välityspalvelimen kättely |
| `connect_ms` | Vain TCP-yhteyden muodostamiseen kulunut aika               |
| `status`     | Ulkoisen palvelun palauttama HTTP-tilakoodi                 |
| `error`      | Virheluokka, jos pyyntö epäonnistui                         |
| `timestamp`  | ISO 8601 UTC                                                |

### Tietojen käyttäminen

```bash
# Viimeisimmät välityspalvelintapahtumat
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Varsinainen päätepiste on `/api/usage/proxy-logs` (katso `src/app/api/usage/proxy-logs/route.ts`). Tämä päätepiste tukee seuraavia toimintoja:

- `GET /api/usage/proxy-logs` — hae välityspalvelinlokit
- `DELETE /api/usage/proxy-logs` — tyhjennä kaikki välityspalvelinlokit

Koostetut tilastot voidaan tarvittaessa hakea suoraan `proxy_logs`-taulusta SQL-kyselyllä. Hallintapaneelin käyttöliittymä voi tarjota koostettuja näkymiä.

### Yleisiä malleja

**Tunnista epävakaa välityspalvelin** (vaihtelee onnistumisen ja epäonnistumisen välillä):

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

**Etsi hitaat välityspalvelimet** (p95-viive > 2 s):

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

## Kiertostrategian päätöspuu

Kun yhdelle käyttöalueelle on määritetty useita välityspalvelimia, OmniRoute valitsee kuhunkin pyyntöön käytettävän palvelimen **kiertostrategian** perusteella. Strategia määritetään käyttöaluetasolla (yleinen, palveluntarjoajakohtainen, tilikohtainen tai yhdistelmäkohtainen).

### Käytettävissä olevat strategiat

| Strategia          | Käyttötilanne                                      | Kompromissi                                                                               |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `quality` (oletus) | Tuotanto, jossa välityspalvelinten laatu vaihtelee | Suosii korkealle arvioituja palvelimia; heikosti arvioidut voivat jäädä ilman liikennettä |
| `random`           | Kuormanjako, yksityisyys                           | Tasainen jakauma; jättää laatutiedot huomiotta                                            |
| `sequential`       | Virheenkorjaus, deterministinen testaus            | Kiertää välityspalvelimet järjestyksessä; toiminta on helppo ymmärtää                     |

### Päätöspuu

```
                    Onko välityspalvelimillasi laatupisteet?
                    │
        ┌───────────┴───────────┐
        │                       │
      KYLLÄ                    EI
        │                       │
 Ovatko kaikki                 │
 välityspalvelimet             │
 laadultaan suunnilleen        │
 samanlaisia?                  │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
 KYLLÄ      EI               Käytä
   │         │              `random`
   │         │              (tasainen jakauma
   │         │              kerryttää laatutietoja
   │         │              ajan myötä)
   │         │
   │    Käytä `quality`
   │    (paras vaihtelevalle
   │    laadulle)
   │
Käytä `random`
(jaa kuorma
tasaisesti)
```

## Omien välityspalvelimiesi automaattinen poissulkeminen vikatilanteessa

1proxy-markkinapaikan pooli heikentää jo automaattisesti toimimattomien välityspalvelimien luokitusta (katso
[Välityspalvelimien laatupisteet](#proxy-quality-scores)). Rekisteriin **itse**
lisäämillesi välityspalvelimille taustalla toimiva kunnonvalvonnan ajastin
(`src/lib/proxyHealth/scheduler.ts`) tarjoaa saman toiminnon, joka sulkee toimimattoman
jäsenen automaattisesti pois ketjusta poistamatta mitään:

```bash
# .env — poista välityspalvelin pehmeästi käytöstä 3 peräkkäisen epäonnistuneen tarkistuksen jälkeen ja ota se
# automaattisesti uudelleen käyttöön, kun se alkaa jälleen vastata tarkistuksiin.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Toiminta usean välityspalvelimen ketjussa:

1. Ajastin tarkistaa jokaisen rekisteröidyn välityspalvelimen `PROXY_HEALTH_INTERVAL_MS`-välein
   (oletusarvo 10 min; vähintään 1 min).
2. Kun **varmoja** epäonnistumisia on tapahtunut `PROXY_AUTO_REMOVE_AFTER` kertaa peräkkäin (todellinen
   yhteysvirhe — aikakatkaisua tai tarkistuskohteen omaa 5xx-virhettä ei koskaan lasketa; katso
   [Välityspalvelimen kunnon tarkistaminen](#proxy-health-checking-v3816)), välityspalvelimen `status`-arvoksi
   asetetaan `dead`.
3. `dead` on yksi niistä tiloista, jotka poolin/kierron määrityksessä käytettävä
   aktiivisten tilojen suodatin sulkee pois. Tämän vuoksi kohdealueen kierto (vuorottelu / satunnainen / pysyvä /
   viiveeseen perustuva — katso [Kiertostrategian päätöspuu](#rotation-strategy-decision-tree))
   lakkaa välittömästi osoittamasta kyseistä välityspalvelinta uusille pyynnöille. Tämä ei vaikuta poolin
   muihin välityspalvelimiin, eikä koko pooli koskaan siirry huomaamatta käyttämään suoraa
   yhteyttä — katso [4-tasoinen välityspalvelinjärjestelmä](#4-level-proxy-system) ja sen vikatilanteessa
   yhteyden estävä suojaus.
4. Ajastin jatkaa `dead`-tilassa olevien välityspalvelimien tarkistamista samalla aikavälillä. Seuraava
   onnistunut tarkistus vaihtaa `status`-arvon takaisin arvoon `active`, jolloin välityspalvelin palaa kiertoon —
   sitä ei tarvitse lisätä uudelleen manuaalisesti.

Tämä on tarkoituksellisesti **valinnainen ja tietoja poistamaton** toiminto: oletusarvoisesti ajastin vain
laskee ja kirjaa epäonnistumiset (katso käytäntö C tiedostossa `decision.ts`), eikä `PROXY_AUTO_DISABLE`
koskaan poista riviä — sitä varten on erillinen ja aggressiivisempi
`PROXY_AUTO_REMOVE`-asetus. Jos molempien arvoksi on asetettu `true`, `PROXY_AUTO_REMOVE`
on etusijalla (poistettavaa välityspalvelinta ei kannata poistaa ensin väliaikaisesti käytöstä). Katso
täydellinen muuttujaluettelo [ympäristömääritysten](../reference/ENVIRONMENT.md) viiteoppaasta.

---

> 📖 **Aiheeseen liittyvä dokumentaatio:**
>
> - [Käyttöopas](../guides/USER_GUIDE.md) — Yleiset asennus- ja määritysohjeet
> - [API-viiteopas](../reference/API_REFERENCE.md) — Täydellinen API-dokumentaatio
> - [Ympäristömääritykset](../reference/ENVIRONMENT.md) — Kaikki ympäristömuuttujat
