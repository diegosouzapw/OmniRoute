# 🌐 OmniRoute Proxy Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Obidite geografske blokade, zaščitite svojo identiteto in usmerjajte promet umetne inteligence prek poljubnega posredniškega strežnika — brez zapletenega konfiguriranja.**

OmniRoute vključuje celovit sistem za upravljanje posredniških strežnikov, ki omogoča usmerjanje prometa do ponudnikov umetne inteligence prek posredniških strežnikov HTTP, HTTPS ali SOCKS5. Ne glede na to, ali ste v blokirani regiji, potrebujete rotacijo naslovov IP ali želite prikrito maskiranje prstnega odtisa — ta vodnik zajema vse.

---

## Kazalo vsebine

- [Zakaj uporabljati posredniške strežnike?](#why-use-proxies)
- [Pregled arhitekture](#architecture-overview)
- [4-stopenjski sistem posredniških strežnikov](#4-level-proxy-system)
- [Register posredniških strežnikov (CRUD)](#proxy-registry-crud)
- [Brezplačna tržnica 1proxy](#1proxy-free-proxy-marketplace)
- [Rotacija posredniških strežnikov](#proxy-rotation)
- [Zaščita pred zaznavanjem in prikritost](#anti-detection--stealth)
- [Načini posredniškega strežnika za povezave navzgor](#upstream-proxy-modes)
- [Uporabniški vmesnik nadzorne plošče](#dashboard-ui)
- [Referenca API-ja](#api-reference)
- [Spremenljivke okolja](#environment-variables)
- [Odpravljanje težav](#troubleshooting)

---

## Zakaj uporabljati posredniške strežnike?

Številni ponudniki umetne inteligence omejujejo dostop glede na geografsko regijo. Razvijalci v **Rusiji, na Kitajskem, v Iranu, na Kubi, v Turčiji** in drugih državah naletijo na napake, kot je:

```
unsupported_country_region_territory
```

Tudi zunaj blokiranih regij so posredniški strežniki uporabni za:

| Primer uporabe           | Opis                                                                         |
| ------------------------ | ---------------------------------------------------------------------------- |
| **Geografski obhod**     | Dostop do OpenAI, Anthropic, Codex in Copilot iz blokiranih držav            |
| **Rotacija naslovov IP** | Porazdelitev zahtev med več naslovov IP za preprečevanje omejevanja hitrosti |
| **Zasebnost**            | Skrivanje vašega dejanskega naslova IP pred ponudniki povezav navzgor        |
| **Skladnost**            | Usmerjanje prometa prek določenih jurisdikcij                                |
| **Testiranje**           | Simulacija zahtev iz različnih regij                                         |

---

## Pregled arhitekture

```
┌───────────────────────────────────────────────────────────────┐
│                       Strežnik OmniRoute                      │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Register    │    │ Razpošiljevalnik│  │ Pridobivanje    │  │
│  │ posrednikov │───▶│ posrednikov  │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (predpomnjeno)│   │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sinhronizacija                      │ API ponudnika    │  │
│  │ 1proxy      │                        │ povezave navzgor │  │
│  │ (brezplačen │                        │                  │  │
│  │ nabor)      │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Ključne komponente

| Komponenta                           | Datoteka                                     | Vloga                                                                    |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------ |
| **Register posredniških strežnikov** | `src/lib/db/proxies.ts`                      | Operacije CRUD za vnose posredniških strežnikov in dodelitve obsegov     |
| **Razpošiljevalnik posrednikov**     | `open-sse/utils/proxyDispatcher.ts`          | Ustvarja razpošiljevalnike `undici` ProxyAgent/SOCKS s predpomnjenjem    |
| **Pridobivanje prek posrednika**     | `open-sse/utils/proxyFetch.ts`               | Ovije `fetch()` z vstavljanjem razpošiljevalnika posredniškega strežnika |
| **Pot nastavitev**                   | `src/app/api/settings/proxy/route.ts`        | API starejše konfiguracije posrednika (GET/PUT/DELETE)                   |
| **Pot upravljanja**                  | `src/app/api/v1/management/proxies/route.ts` | API CRUD za register (GET/POST/PATCH/DELETE)                             |
| **Podatkovna zbirka 1proxy**         | `src/lib/db/oneproxy.ts`                     | Trajno shranjevanje brezplačne tržnice posredniških strežnikov           |

---

## 4-stopenjski sistem posredniških strežnikov

OmniRoute podpira konfiguracijo posredniških strežnikov na **štirih neodvisnih ravneh**, ki se razrešujejo po prednostnem vrstnem redu:

```
Prednostni vrstni red razreševanja (od najvišje do najnižje):

  1. 🔵 Posredniški strežnik računa/povezave  →  za posamezni ključ API / povezavo OAuth
  2. 🟡 Posredniški strežnik ponudnika        →  za posameznega ponudnika (npr. ves promet OpenAI)
  3. 🟠 Posredniški strežnik kombinacije      →  za posamezno kombinacijo/konfiguracijo usmerjanja
  4. 🟢 Globalni posredniški strežnik         →  ves promet, vsi ponudniki
```

### Kako deluje razreševanje

Ko OmniRoute pošlje zahtevo zunanjemu ponudniku, pokliče `resolveProxyForConnectionFromRegistry()`, ki preveri vsako raven po vrsti:

1. **Raven računa** — Ali je tej določeni povezavi z določenim ID-jem dodeljen posredniški strežnik?
2. **Raven ponudnika** — Ali je temu ponudniku (npr. `openai`) dodeljen posredniški strežnik?
3. **Globalna raven** — Ali je konfiguriran globalni posredniški strežnik?
4. **Brez posredniškega strežnika** — Neposredna povezava s ponudnikom.

Uporabi se prvo ujemanje. To pomeni, da lahko globalni posredniški strežnik nastavite kot nadomestno možnost, vendar ga preglasite za določene ponudnike ali povezave.

### Kateri promet poteka prek posredniškega strežnika

| Vrsta prometa           | Prek posredniškega strežnika? | Opombe                                                   |
| ----------------------- | ----------------------------- | -------------------------------------------------------- |
| Dokončanja klepeta      | ✅                            | Vse zahteve `/v1/chat/completions`                       |
| Vdelave                 | ✅                            | `/v1/embeddings`                                         |
| Ustvarjanje slik        | ✅                            | `/v1/images/generations`                                 |
| Zvok (TTS/STT)          | ✅                            | `/v1/audio/*`                                            |
| Izmenjava žetonov OAuth | ✅                            | Odpravi `unsupported_country_region_territory`           |
| Preizkusi povezav       | ✅                            | Gumb »Preizkusi povezavo« uporablja posredniški strežnik |
| Osveževanje žetonov     | ✅                            | Obnavljanje OAuth v ozadju                               |
| Sinhronizacija modelov  | ✅                            | Prikaz seznama in odkrivanje modelov                     |

---

## Register posredniških strežnikov (CRUD)

Register posredniških strežnikov je tabela SQLite (`proxy_registry`), ki shranjuje vse vaše posredniške strežnike. Vsak posredniški strežnik ima:

| Polje      | Vrsta        | Opis                                                              |
| ---------- | ------------ | ----------------------------------------------------------------- |
| `id`       | UUID         | Enolični identifikator                                            |
| `name`     | Niz          | Človeku berljiva oznaka                                           |
| `type`     | Niz          | Protokol: `http`, `https`, `socks5`                               |
| `host`     | Niz          | Ime gostitelja ali IP posredniškega strežnika                     |
| `port`     | Celo število | Številka vrat                                                     |
| `username` | Niz          | Uporabniško ime za preverjanje pristnosti (šifrirano v mirovanju) |
| `password` | Niz          | Geslo za preverjanje pristnosti (šifrirano v mirovanju)           |
| `region`   | Niz          | Oznaka geografske regije                                          |
| `notes`    | Niz          | Opombe v prostem besedilu                                         |
| `status`   | Niz          | `active` ali `inactive`                                           |
| `source`   | Niz          | `manual` ali `oneproxy`                                           |

### Ustvarjanje posredniškega strežnika

**Prek nadzorne plošče:**

1. Pojdite na **Nastavitve → Posredniški strežnik**
2. Kliknite **Dodaj posredniški strežnik**
3. Vnesite vrsto, gostitelja, vrata in izbirne poverilnice za preverjanje pristnosti
4. Shranite

**Prek API-ja:**

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

### Posodabljanje posredniškega strežnika

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Opomba:** Poverilnice se ohranijo, razen če izrecno pošljete neprazne nadomestne vrednosti. Če za `username`/`password` pošljete prazne nize, se bodo shranjene vrednosti ohranile.

### Brisanje posredniškega strežnika

```bash
# Ne uspe, če je posredniški strežnik dodeljen kateri koli ravni
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Prisilno brisanje (odstrani tudi dodelitve)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Prikaz seznama posredniških strežnikov

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Dodeljevanje posredniških strežnikov ravnem

```bash
# Dodelitev globalni ravni
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Dodelitev določenemu ponudniku
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Dodelitev določeni povezavi/ključu
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Razreševanje dejanskega posredniškega strežnika

Preverite, kateri posredniški strežnik bi bil uporabljen za dano povezavo:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Vrne razrešeni posredniški strežnik z njegovo ravnjo (`account`, `provider` ali `global`) in virom.

### Množično dodeljevanje

En posredniški strežnik dodelite več ponudnikom ali povezavam hkrati:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Uvoz/izvoz

Posredniški strežniki so vključeni v sistem **varnostnega kopiranja/obnovitve**. Ko izvozite konfiguracijo OmniRoute:

1. Pojdite na **Nadzorna plošča → Nastavitve → Varnostno kopiranje**
2. Kliknite **Izvozi** — vključeni so register posredniških strežnikov in dodelitve
3. Za obnovitev kliknite **Uvozi** in naložite datoteko varnostne kopije

Register posredniških strežnikov podpira tudi **upsert po gostitelju+vratih** — če uvozite posredniški strežnik, ki že obstaja (isti gostitelj in vrata), se posodobi, namesto da bi bil ustvarjen dvojnik.

### Selitev iz starejše različice

Če ste posredniške strežnike konfigurirali v starejši različici (pred uvedbo registra), jih OmniRoute samodejno preseli:

```
Podedovana shramba key_value → proxy_registry + proxy_assignments
```

To se izvede enkrat ob prvem zagonu po nadgradnji. Za ponovni zagon uporabite `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## Tržnica brezplačnih posredniških strežnikov 1proxy

> 🆕 **Prispeval [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (težava [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute se integrira s skupnostno platformo **[1proxy](https://1proxy-api.aitradepulse.com)** in tako omogoča dostop do **več sto brezplačnih, preverjenih posredniških strežnikov** z vsega sveta. To je popolno za uporabnike, ki nimajo lastne infrastrukture posredniških strežnikov.

### Kako deluje

```
┌─────────────┐  Sinhronizacija  ┌─────────────────┐    Rotacija    ┌──────────┐
│ 1proxy API  │ ───────────────▶ │  proxy_registry  │ ─────────────▶ │ API      │
│  (zunanji)  │    do 500         │  source=oneproxy │  po kakovosti │ ponudnika│
└─────────────┘ posred. strežnikov└─────────────────┘                └──────────┘
```

1. **Sinhronizacija** — OmniRoute pridobi preverjene posredniške strežnike iz API-ja 1proxy
2. **Shranjevanje** — Posredniški strežniki se shranijo v isto tabelo `proxy_registry` z vrednostjo `source = 'oneproxy'`
3. **Filtriranje** — Filtrirajte po protokolu, državi in oceni kakovosti
4. **Rotacija** — Izberite najboljši posredniški strežnik s strategijo kakovosti, naključnega ali zaporednega izbora
5. **Samodejno znižanje ocene** — Neuspešnim posredniškim strežnikom se zniža ocena kakovosti; pod pragom → označeni so kot neaktivni

### Sinhronizacija posredniških strežnikov

**Prek nadzorne plošče:**

1. Odprite zavihek **Nastavitve → 1proxy**
2. Kliknite **»Sinhroniziraj zdaj«**
3. Oglejte si statistiko: skupno število posredniških strežnikov, število aktivnih, povprečna kakovost in razčlenitev po državah

**Prek API-ja:**

```bash
# Sproži sinhronizacijo
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Odgovor:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtriranje posredniških strežnikov

```bash
# Filtriranje po protokolu
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtriranje po državi
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtriranje po najnižji oceni kakovosti
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Združevanje filtrov
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Ocene kakovosti posredniških strežnikov

Vsak posredniški strežnik 1proxy vključuje metapodatke:

| Polje           | Opis                                                         |
| --------------- | ------------------------------------------------------------ |
| `qualityScore`  | Ocena preverjanja 1proxy od 0 do 100                         |
| `latencyMs`     | Izmerjena zakasnitev omrežja                                 |
| `anonymity`     | `transparent`, `anonymous` ali `elite`                       |
| `googleAccess`  | Ali lahko posredniški strežnik dostopa do Googlovih storitev |
| `countryCode`   | Dvočrkovna koda države ISO                                   |
| `lastValidated` | Časovni žig zadnjega preverjanja                             |

Ocene kakovosti se dinamično prilagajajo:

- **Neuspele zahteve** znižajo oceno za 10 točk
- **Ocena pade na ≤10** → posredniški strežnik je označen kot `inactive`
- Neaktivni posredniški strežniki so izključeni iz rotacije

### Strategije rotacije

```bash
# Rotacija po kakovosti (najprej najboljši posredniški strežnik) — privzeto
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Naključna rotacija
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Zaporedna rotacija (najprej posredniški strežnik, ki je bil preverjen najmanj nedavno)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Odklopnik

Sinhronizacija 1proxy ima vgrajen odklopnik:

- Po **5 zaporednih neuspelih sinhronizacijah** so nadaljnji poskusi sinhronizacije blokirani
- Ponastavite ga z: `resetOneproxyCircuitBreaker()` ali znova zaženite strežnik
- Stanje sinhronizacije je na voljo na `GET /api/settings/oneproxy?action=status`

### Brisanje posredniških strežnikov 1proxy

```bash
# Izbriši posamezen posredniški strežnik 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Izbriši VSE posredniške strežnike 1proxy (ročno dodani posredniški strežniki ostanejo nespremenjeni)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Preprečevanje zaznavanja in prikritost

OmniRoute prometa ne usmerja zgolj prek posredniškega strežnika — poskrbi tudi, da je promet videti legitimen:

### Ponarejanje prstnega odtisa TLS

Uporablja `wreq-js` za ustvarjanje brskalnikom podobnih prstnih odtisov TLS, s čimer zaobide sisteme za zaznavanje botov, ki označijo rokovanja TLS, ki ne izvirajo iz brskalnikov.

### Ujemanje prstnega odtisa CLI

**Preklop prstnega odtisa CLI** (`Nastavitve → Varnost`) preuredi glave HTTP in polja telesa JSON tako, da se ujemajo z natančnim podpisom izvornih binarnih datotek CLI (Claude Code, Codex itd.). To deluje **skupaj s** posredniškim strežnikom:

```
Vaš IP (blokiran) → IP posredniškega strežnika (ZDA) → API ponudnika
                    + ponarejanje TLS
                    + prstni odtis CLI
```

Tako hkrati pridobite **prikrivanje naslova IP** in **pristnost zahtev**.

### Ohranjanje naslova IP posredniškega strežnika

Barvno označene značke na nadzorni plošči prikazujejo, katera raven posredniškega strežnika je aktivna:

| Značka | Raven    | Pomen                                                       |
| ------ | -------- | ----------------------------------------------------------- |
| 🟢     | Globalna | Ves promet poteka prek tega posredniškega strežnika         |
| 🟡     | Ponudnik | Posredovan je samo promet tega ponudnika                    |
| 🔵     | Povezava | Ta specifični ključ/račun uporablja ta posredniški strežnik |

Značka za preverjanje prikazuje tudi razrešeni naslov IP posredniškega strežnika.

---

## Načini nadrejenega posredniškega strežnika

Za ponudnike, ki uporabljajo vzorec CLIProxyAPI, OmniRoute podpira tri načine nadrejenega posredniškega strežnika:

| Način         | Opis                                                                |
| ------------- | ------------------------------------------------------------------- |
| `native`      | OmniRoute neposredno upravlja usmerjanje prek posrednika (privzeto) |
| `cliproxyapi` | Upravljanje prenese na zunanji primerek CLIProxyAPI                 |
| `fallback`    | Najprej poskusi izvorni način, nato uporabi CLIProxyAPI             |

Konfigurirajte za posameznega ponudnika:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Uporabniški vmesnik nadzorne plošče

### Nastavitve → Zavihek Posredniški strežnik

- Konfiguracija **globalnega posredniškega strežnika** (nastavite enkrat za ves promet)
- Preglasitve **posredniškega strežnika za posameznega ponudnika**
- Dodelitve **posredniškega strežnika za posamezno povezavo**
- **Preskus povezave** prek konfiguriranega posredniškega strežnika
- **Barvno označene značke**, ki prikazujejo aktivno raven posredniškega strežnika

### Nastavitve → Zavihek 1proxy

- Gumb **Sinhroniziraj zdaj** za pridobivanje brezplačnih posredniških strežnikov
- **Kartice s statističnimi podatki**: Skupaj, Aktivni, Povprečna kakovost, Zadnja sinhronizacija
- **Filtri**: Protokol, Koda države, Najmanjša kakovost
- **Tabela posredniških strežnikov** z gostiteljem, protokolom, državo, oceno kakovosti, zakasnitvijo, anonimnostjo in dostopom do Googla
- Podokno **stanja sinhronizacije** s spremljanjem uspehov/neuspehov in številom zaporednih neuspehov
- **Počisti vse** za odstranitev vseh vnosov 1proxy

---

## Referenca za API

### API nastavitev posredniškega strežnika

| Metoda   | Končna točka                                   | Opis                                       |
| -------- | ---------------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/proxy`                          | Pridobi celotno konfiguracijo posrednika   |
| `GET`    | `/api/settings/proxy?level=global`             | Pridobi globalni posredniški strežnik      |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Pridobi posrednik ponudnika                |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Razreši dejanski posredniški strežnik      |
| `PUT`    | `/api/settings/proxy`                          | Posodobi konfiguracijo posrednika          |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Odstrani posredniški strežnik na tej ravni |

### API registra posredniških strežnikov

| Metoda   | Končna točka                                      | Opis                                      |
| -------- | ------------------------------------------------- | ----------------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Prikaži vse posredniške strežnike         |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Pridobi posredniški strežnik po ID-ju     |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Pridobi dodelitve posredniškega strežnika |
| `POST`   | `/api/v1/management/proxies`                      | Ustvari posredniški strežnik              |
| `PATCH`  | `/api/v1/management/proxies`                      | Posodobi posredniški strežnik             |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Izbriši posredniški strežnik              |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Vsili izbris                              |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Množično dodeli                           |
| `GET`    | `/api/v1/management/proxies/assignments`          | Prikaži dodelitve                         |
| `GET`    | `/api/v1/management/proxies/health`               | Statistika stanja posredniških strežnikov |

### API tunelov

Za izpostavitev primerka OmniRoute javnemu internetu (Cloudflare/ngrok/Tailscale), namesto usmerjanja odhodnega prometa prek posredniškega strežnika, glejte [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). API REST za tunele je na voljo pod `/api/tunnels/{cloudflared,ngrok,tailscale}/*` in je neodvisen od zgoraj dokumentirane verige posredniških strežnikov za odhodni promet.

### API 1proxy

| Metoda   | Končna točka                           | Opis                                        |
| -------- | -------------------------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Prikaži posredniške strežnike 1proxy        |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Pridobi statistiko in stanje sinhronizacije |
| `GET`    | `/api/settings/oneproxy?action=status` | Pridobi samo stanje sinhronizacije          |
| `POST`   | `/api/settings/oneproxy`               | Sproži sinhronizacijo                       |
| `POST`   | `/api/settings/oneproxy/rotate`        | Preklopi na naslednji posredniški strežnik  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Izbriši enega                               |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Počisti vse                                 |

### API nadrejenega posredniškega strežnika

| Metoda   | Končna točka                      | Opis                                              |
| -------- | --------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Pridobi konfiguracijo nadrejenega posrednika      |
| `PUT`    | `/api/upstream-proxy/:providerId` | Nastavi način nadrejenega posredniškega strežnika |
| `DELETE` | `/api/upstream-proxy/:providerId` | Odstrani konfiguracijo nadrejenega posrednika     |

---

## Okoljske spremenljivke

| Spremenljivka         | Privzeto | Opis                                                                              |
| --------------------- | -------- | --------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`   | Omogoči podporo za posredniški strežnik SOCKS5 (privzeto `true` v `.env.example`) |

---

## Odpravljanje težav

### »Posredniški strežnik SOCKS5 je onemogočen«

V datoteki `.env` nastavite `ENABLE_SOCKS5_PROXY=true` in znova zaženite aplikacijo.

### Napake »socket hang up« pri uporabi posredniškega strežnika

To je običajno pri poceni posredniških strežnikih, ki prekinjajo nedejavne povezave. OmniRoute to že obravnava tako, da:

- onemogoči ohranjanje povezave na povezavah s posredniškim strežnikom (`keepAliveTimeout: 1`)
- onemogoči cevovodno obdelavo (`pipelining: 0`)
- predpomni odpošiljevalnike, da prepreči ponavljajoča se rokovanja

Če se težava nadaljuje, poskusite drug posredniški strežnik ali uporabite funkcijo rotacije 1proxy.

### »unsupported_country_region_territory« med OAuth

Prepričajte se, da je posredniški strežnik konfiguriran **pred** začetkom postopka OAuth. OmniRoute usmerja izmenjavo žetonov OAuth prek konfiguriranega posredniškega strežnika. Najprej nastavite globalni posredniški strežnik ali posredniški strežnik na ravni ponudnika, nato pa vzpostavite povezavo.

### Posredniški strežnik se ne uporablja

Preverite vrstni red razreševanja:

1. Preverite z `GET /api/settings/proxy?resolve=your-connection-id`
2. Preverite, ali je `status` posredniškega strežnika nastavljen na `active` (in ne na `inactive`)
3. Prepričajte se, da se obseg dodelitve posredniškega strežnika ujema z vašo povezavo

### Sinhronizacija 1proxy ne uspe

Preverite stanje sinhronizacije:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Če je `consecutiveFailures >= 5`, se je sprožil odklopnik. Za ponastavitev znova zaženite strežnik ali počakajte na ročno ponastavitev.

---

## Shema podatkovne zbirke

### Tabela `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' ali 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (samo 1proxy)
  latency_ms INTEGER,                        -- milisekunde (samo 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- ali lahko dostopa do storitve Google? (1proxy)
  last_validated TEXT,                       -- časovni žig ISO (1proxy)
  country_code TEXT,                         -- dvočrkovna koda ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabela `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID ponudnika, ID povezave ali ID kombinacije
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Preverjanje stanja posredniškega strežnika (v3.8.16+)

Mehanizem OmniRoute za **hitro odpoved posredniškega strežnika** (`src/lib/proxyHealth.ts`) zazna nedelujoče posredniške strežnike v manj kot 2 s s hitrim preverjanjem povezave TCP, nato pa **predpomni rezultat**, da prepreči dodatno obremenitev pri vsaki zahtevi.

### Kako deluje

```
Zahteva ──▶ ProxyHealthCache.get(url)
             │
             ├─ Zadetek v predpomnilniku + svež?  ──▶ vrni predpomnjeno stanje
             │
             └─ Zgrešitev / zastarel vnos?  ──▶ povezava TCP s host:port
                                                 (časovna omejitev: FAST_FAIL_TIMEOUT_MS)
                                                 ──▶ predpomni za HEALTH_CACHE_TTL_MS
                                                 ──▶ vrni rezultat
```

Brez tega bi nedelujoči posredniški strežnik blokiral vsako zahtevo za celotno obdobje `PROXY_TIMEOUT_MS` (privzeto 30 s), preden bi zahteva spodletela.

### Nastavljive okoljske spremenljivke

| Spremenljivka                | Privzeto | Namen                                                 |
| ---------------------------- | -------- | ----------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`   | Časovna omejitev povezave TCP pri preverjanju stanja  |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`  | Kako dolgo je rezultat preverjanja stanja predpomnjen |

**Priporočene vrednosti:**

| Scenarij                           | Časovna omejitev hitre odpovedi | TTL predpomnilnika | Utemeljitev                                                                    |
| ---------------------------------- | ------------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| Prehod API z visoko prepustnostjo  | 1500ms                          | 60000ms            | Agresivna hitra odpoved, daljše predpomnjenje za zmanjšanje števila preverjanj |
| Geografsko porazdeljena vozlišča   | 3000ms                          | 15000ms            | Počasnejša omrežja potrebujejo več časa; krajše predpomnjenje za hiter preklop |
| Razvoj / preizkušanje              | 1000ms                          | 10000ms            | Hitro ponavljanje pri lokalnih posredniških strežnikih                         |
| Prikritost / preprečevanje zaznave | 2500ms                          | 45000ms            | Prepreči hitro preverjanje, ki bi lahko sprožilo omejitve hitrosti             |

### Pregled stanja posredniških strežnikov

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Vsili ponovno preverjanje določenega posredniškega strežnika
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Zastavica `stale` je nastavljena na `true`, ko je vnos v predpomnilniku presegel `HEALTH_CACHE_TTL_MS`, naslednja zahteva pa bo sprožila novo preverjanje.

### Privzete vrednosti glede na vrsto posredniškega strežnika

Preverjanje stanja uporablja smiselne privzete vrednosti glede na shemo URL-ja:

| Shema                      | Privzeta vrata |
| -------------------------- | -------------- |
| `http://`                  | 8080           |
| `https://`                 | 443            |
| `socks5://` / `socks5h://` | 1080           |

Vrata po meri v URL-ju (`http://host:9999`) imajo vedno prednost pred privzeto vrednostjo sheme.

---

## Analitika in opazljivost posredniških strežnikov

OmniRoute spremlja uporabo posameznih posredniških strežnikov, da lahko skrbniki diagnosticirajo vzorce usmerjanja, nenadne poraste zakasnitev in ponavljajoče se napake.

### Kaj se spremlja

Za vsako zahtevo prek konfiguriranega posredniškega strežnika OmniRoute zabeleži:

| Metrika      | Opis                                                                                   |
| ------------ | -------------------------------------------------------------------------------------- |
| `proxy_url`  | Celoten URL posredniškega strežnika (prijavni podatki so zakriti)                      |
| `provider`   | ID ponudnika v zaledju (openai, anthropic itd.)                                        |
| `latency_ms` | Skupni čas povratne poti, vključno z vzpostavitvijo povezave s posredniškim strežnikom |
| `connect_ms` | Samo čas vzpostavitve povezave TCP                                                     |
| `status`     | Koda stanja HTTP iz zaledja                                                            |
| `error`      | Razred napake, če zahteva ni uspela                                                    |
| `timestamp`  | ISO 8601 UTC                                                                           |

### Dostop do podatkov

```bash
# Nedavni dogodki posredniških strežnikov
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Dejanska končna točka je `/api/usage/proxy-logs` (glejte `src/app/api/usage/proxy-logs/route.ts`). Ta končna točka podpira:

- `GET /api/usage/proxy-logs` — pridobitev dnevnikov posredniških strežnikov
- `DELETE /api/usage/proxy-logs` — izbris vseh dnevnikov posredniških strežnikov

Po potrebi je mogoče združene statistične podatke poizvedovati neposredno iz tabele `proxy_logs` prek SQL-a. Uporabniški vmesnik nadzorne plošče lahko ponuja združene poglede.

### Pogosti vzorci

**Zaznavanje nestabilnega posredniškega strežnika** (izmenjuje se med uspehom in neuspehom):

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

**Iskanje počasnih posredniških strežnikov** (zakasnitev p95 > 2 s):

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

## Odločitveno drevo strategije rotacije

Ko je obsegu dodeljenih več posredniških strežnikov, OmniRoute uporabi **strategijo rotacije**, da določi, katerega bo uporabil za posamezno zahtevo. Strategija je konfigurirana na ravni obsega (globalno, za posameznega ponudnika, za posamezen račun ali za posamezno kombinacijo).

### Razpoložljive strategije

| Strategija           | Kdaj jo uporabiti                                       | Kompromis                                                                                     |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `quality` (privzeto) | Produkcija s posredniškimi strežniki različne kakovosti | Daje prednost visoko ocenjenim posredniškim strežnikom; nizko ocenjeni so lahko zapostavljeni |
| `random`             | Porazdelitev obremenitve, zasebnost                     | Enakomerna porazdelitev; ne upošteva signalov kakovosti                                       |
| `sequential`         | Razhroščevanje, deterministično preizkušanje            | Zaporedno kroži med posredniškimi strežniki; delovanje je lahko razumeti                      |

### Odločitveno drevo

```
                    Ali imate ocene kakovosti svojih
                    posredniških strežnikov?
                    │
        ┌───────────┴───────────┐
        │                       │
       DA                      NE
        │                       │
   Ali so vsi                  │
   posredniški strežniki       │
   približno enake             │
   kakovosti?                  │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  DA        NE               Uporabite
   │         │              `random`
   │         │              (enakomerna
   │         │              porazdelitev sčasoma
   │         │              ustvari podatke
   │         │              o kakovosti)
   │         │
   │    Uporabite `quality`
   │    (najboljše za
   │    različno kakovost)
   │
Uporabite `random`
(enakomerno
porazdelite
obremenitev)
```

## Samodejna izključitev nedelujočih lastnih posredniških strežnikov

Tržnična zbirka 1proxy že sama samodejno znižuje prednost nedelujočim posredniškim strežnikom (glejte
[Ocene kakovosti posredniških strežnikov](#proxy-quality-scores)). Za
posredniške strežnike, ki ste jih v register dodali **vi**, načrtovalnik preverjanja stanja v ozadju
(`src/lib/proxyHealth/scheduler.ts`) zagotavlja enako vedenje »samodejno izključi nedelujočega člana
iz verige«, ne da bi kar koli izbrisal:

```bash
# .env — po 3 zaporednih neuspešnih preverjanjih začasno onemogoči posredniški strežnik
# in ga samodejno znova omogoči, ko se začne ponovno odzivati na preverjanja.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Kako se to vključi v verigo več posredniških strežnikov:

1. Načrtovalnik preveri vsak registriran posredniški strežnik v vsakem intervalu `PROXY_HEALTH_INTERVAL_MS`
   (privzeto 10 min; najmanj 1 min).
2. Po `PROXY_AUTO_REMOVE_AFTER` zaporednih **dokončnih** neuspehih (dejanska
   napaka povezave — časovna omejitev ali napaka 5xx samega cilja preverjanja se nikoli ne upošteva; glejte
   [Preverjanje stanja posredniških strežnikov](#proxy-health-checking-v3816)) se `status` posredniškega
   strežnika nastavi na `dead`.
3. `dead` je eno od stanj, ki jih filter aktivnih stanj, uporabljen pri razreševanju
   zbirke/rotacije, izključi, zato rotacija obsega (krožna / naključna / lepljiva /
   glede na zakasnitev — glejte [Odločitveno drevo strategije rotacije](#rotation-strategy-decision-tree))
   takoj preneha dodeljevati ta posredniški strežnik novim zahtevam. To ne vpliva na noben drug
   posredniški strežnik v zbirki, celotna zbirka pa nikoli tiho ne preklopi na neposredno
   povezavo — glejte varovalo z zaprtjem ob napaki v
   [4-stopenjskem sistemu posredniških strežnikov](#4-level-proxy-system).
4. Načrtovalnik še naprej preverja posredniške strežnike s stanjem `dead` v enakem intervalu. Naslednje
   uspešno preverjanje spremeni `status` nazaj na `active`, posredniški strežnik pa se znova vključi v rotacijo —
   ročno ponovno dodajanje ni potrebno.

Ta funkcija je namenoma **izbirna in nedestruktivna**: načrtovalnik privzeto samo
šteje in beleži neuspehe (glejte pravilnik C v `decision.ts`), `PROXY_AUTO_DISABLE`
pa nikoli ne izbriše vrstice — temu je namenjena ločena, bolj agresivna
zastavica `PROXY_AUTO_REMOVE`. Če sta obe nastavljeni na `true`, ima prednost `PROXY_AUTO_REMOVE`
(posredniškega strežnika, ki bo izbrisan, ni smiselno vmes začasno onemogočiti). Celoten
seznam spremenljivk najdete v dokumentu [Konfiguracija okolja](../reference/ENVIRONMENT.md).

---

> 📖 **Povezana dokumentacija:**
>
> - [Uporabniški priročnik](../guides/USER_GUIDE.md) — Splošna namestitev in konfiguracija
> - [Referenca API-ja](../reference/API_REFERENCE.md) — Celotna dokumentacija API-ja
> - [Konfiguracija okolja](../reference/ENVIRONMENT.md) — Vse okoljske spremenljivke
