# 🌐 OmniRoute Proxy Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Kerülje meg a földrajzi korlátozásokat, védje személyazonosságát, és irányítsa az AI-forgalmat bármilyen proxyn keresztül — mindezt konfigurációs bonyodalmak nélkül.**

Az OmniRoute teljes funkcionalitású proxykezelő rendszert tartalmaz, amellyel a felsőbb szintű AI-szolgáltatók felé irányuló forgalmat HTTP-, HTTPS- vagy SOCKS5-proxykon keresztül továbbíthatja. Akár blokkolt régióban tartózkodik, IP-rotációra van szüksége, vagy rejtett ujjlenyomat-kezelést szeretne — ez az útmutató minden részletre kitér.

---

## Tartalomjegyzék

- [Miért érdemes proxykat használni?](#why-use-proxies)
- [Az architektúra áttekintése](#architecture-overview)
- [Négyszintű proxyrendszer](#4-level-proxy-system)
- [Proxyregiszter (CRUD)](#proxy-registry-crud)
- [Az 1proxy ingyenes piactere](#1proxy-free-proxy-marketplace)
- [Proxyrotáció](#proxy-rotation)
- [Észlelés elleni védelem és rejtett működés](#anti-detection--stealth)
- [Felsőbb szintű proxymódok](#upstream-proxy-modes)
- [Vezérlőpult felhasználói felülete](#dashboard-ui)
- [API-referencia](#api-reference)
- [Környezeti változók](#environment-variables)
- [Hibaelhárítás](#troubleshooting)

---

## Miért érdemes proxykat használni?

Számos AI-szolgáltató földrajzi régió alapján korlátozza a hozzáférést. Az **Oroszországban, Kínában, Iránban, Kubában, Törökországban** és más országokban dolgozó fejlesztők az alábbihoz hasonló hibákkal találkozhatnak:

```
unsupported_country_region_territory
```

A proxyk a blokkolt régiókon kívül is hasznosak:

| Felhasználási mód                      | Leírás                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------- |
| **Földrajzi korlátozások megkerülése** | Az OpenAI, Anthropic, Codex és Copilot elérése blokkolt országokból       |
| **IP-rotáció**                         | A kérések elosztása több IP-cím között a sebességkorlátozás elkerüléséhez |
| **Adatvédelem**                        | A valódi IP-cím elrejtése a felsőbb szintű szolgáltatók elől              |
| **Megfelelőség**                       | A forgalom meghatározott joghatóságokon keresztüli irányítása             |
| **Tesztelés**                          | Különböző régiókból érkező kérések szimulálása                            |

---

## Az architektúra áttekintése

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-kiszolgáló                    │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy-      │    │ Proxy-       │    │ Proxy            │  │
│  │ regiszter   │───▶│ diszpécser   │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (gyorsítótár)│    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-     │                        │ Felsőbb szintű   │  │
│  │ szinkroniz. │                        │ szolgáltatói API │  │
│  │ (ingyenes)  │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Fő összetevők

| Összetevő              | Fájl                                         | Szerep                                                               |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| **Proxyregiszter**     | `src/lib/db/proxies.ts`                      | CRUD-műveletek a proxybejegyzésekhez és a hatókör-hozzárendelésekhez |
| **Proxydiszpécser**    | `open-sse/utils/proxyDispatcher.ts`          | Gyorsítótárazott `undici` ProxyAgent/SOCKS diszpécserek létrehozása  |
| **Proxy Fetch**        | `open-sse/utils/proxyFetch.ts`               | A `fetch()` kiegészítése proxydiszpécser-injektálással               |
| **Beállítási útvonal** | `src/app/api/settings/proxy/route.ts`        | Korábbi proxykonfigurációs API (GET/PUT/DELETE)                      |
| **Kezelési útvonal**   | `src/app/api/v1/management/proxies/route.ts` | Regiszterkezelő CRUD API (GET/POST/PATCH/DELETE)                     |
| **1proxy-adatbázis**   | `src/lib/db/oneproxy.ts`                     | Az ingyenes proxypiactér adatainak tartós tárolása                   |

---

## Négyszintű proxyrendszer

Az OmniRoute **négy független hatókörben** támogatja a proxykonfigurációt, amelyek kiértékelése prioritási sorrendben történik:

```
Prioritási sorrend (legmagasabb → legalacsonyabb):

  1. 🔵 Fiók-/kapcsolati proxy  →  API-kulcsonként / OAuth-kapcsolatonként
  2. 🟡 Szolgáltatói proxy      →  szolgáltatónként (pl. az összes OpenAI-forgalom)
  3. 🟠 Kombinációs proxy       →  kombinációnként/útválasztási konfigurációnként
  4. 🟢 Globális proxy          →  minden forgalom, minden szolgáltató
```

### A feloldás működése

Amikor az OmniRoute kérést küld egy felsőbb szintű szolgáltatónak, meghívja a `resolveProxyForConnectionFromRegistry()` függvényt, amely sorrendben ellenőrzi az egyes szinteket:

1. **Fiókszint** — Van proxy hozzárendelve ehhez a konkrét kapcsolatazonosítóhoz?
2. **Szolgáltatói szint** — Van proxy hozzárendelve ehhez a szolgáltatóhoz (pl. `openai`)?
3. **Globális szint** — Van beállítva globális proxy?
4. **Nincs proxy** — Közvetlen kapcsolat a szolgáltatóval.

Az első egyezés érvényesül. Ez azt jelenti, hogy beállíthat egy globális proxyt tartalékmegoldásként, majd felülbírálhatja azt bizonyos szolgáltatók vagy kapcsolatok esetében.

### Milyen forgalom halad át a proxyn

| Forgalomtípus            | Proxyzott? | Megjegyzések                                             |
| ------------------------ | ---------- | -------------------------------------------------------- |
| Csevegési kiegészítések  | ✅         | Minden `/v1/chat/completions` kérés                      |
| Beágyazások              | ✅         | `/v1/embeddings`                                         |
| Képgenerálás             | ✅         | `/v1/images/generations`                                 |
| Hang (TTS/STT)           | ✅         | `/v1/audio/*`                                            |
| OAuth-token cseréje      | ✅         | Megoldja az `unsupported_country_region_territory` hibát |
| Kapcsolattesztelés       | ✅         | A „Kapcsolat tesztelése” gomb proxyt használ             |
| Tokenfrissítés           | ✅         | Háttérben végzett OAuth-megújítás                        |
| Modellek szinkronizálása | ✅         | Modellek listázása és felderítése                        |

---

## Proxyregiszter (CRUD)

A proxyregiszter egy SQLite-tábla (`proxy_registry`), amely az összes proxyt tárolja. Minden proxy a következő mezőkkel rendelkezik:

| Mező       | Típus   | Leírás                                           |
| ---------- | ------- | ------------------------------------------------ |
| `id`       | UUID    | Egyedi azonosító                                 |
| `name`     | Sztring | Ember által olvasható címke                      |
| `type`     | Sztring | Protokoll: `http`, `https`, `socks5`             |
| `host`     | Sztring | A proxy gépneve vagy IP-címe                     |
| `port`     | Egész   | Portszám                                         |
| `username` | Sztring | Hitelesítési felhasználónév (titkosítva tárolva) |
| `password` | Sztring | Hitelesítési jelszó (titkosítva tárolva)         |
| `region`   | Sztring | Földrajzi régió címkéje                          |
| `notes`    | Sztring | Szabad szöveges megjegyzések                     |
| `status`   | Sztring | `active` vagy `inactive`                         |
| `source`   | Sztring | `manual` vagy `oneproxy`                         |

### Proxy létrehozása

**Az irányítópulton keresztül:**

1. Lépjen a **Beállítások → Proxy** menüpontra
2. Kattintson a **Proxy hozzáadása** lehetőségre
3. Adja meg a típust, a gépnevet, a portot és az opcionális hitelesítési adatokat
4. Mentse a beállításokat

**API-n keresztül:**

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

### Proxy frissítése

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Megjegyzés:** A hitelesítési adatok megmaradnak, hacsak nem küld kifejezetten nem üres helyettesítő értékeket. Ha üres sztringeket küld a `username`/`password` mezőkhöz, a tárolt értékek megmaradnak.

### Proxy törlése

```bash
# Sikertelen, ha a proxy bármely hatókörhöz hozzá van rendelve
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Kényszerített törlés (a hozzárendeléseket is eltávolítja)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Proxyk listázása

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Proxyk hozzárendelése hatókörökhöz

```bash
# Hozzárendelés a globális hatókörhöz
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Hozzárendelés egy adott szolgáltatóhoz
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Hozzárendelés egy adott kapcsolathoz/kulcshoz
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### A tényleges proxy feloldása

Ellenőrizze, hogy egy adott kapcsolathoz melyik proxy lenne használva:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

A feloldott proxyt adja vissza annak szintjével (`account`, `provider` vagy `global`) és forrásával együtt.

### Tömeges hozzárendelés

Rendeljen hozzá egy proxyt egyszerre több szolgáltatóhoz vagy kapcsolathoz:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importálás/exportálás

A proxyk szerepelnek a **Biztonsági mentés/visszaállítás** rendszerben. Az OmniRoute-konfiguráció exportálásakor:

1. Lépjen az **Irányítópult → Beállítások → Biztonsági mentés** menüpontra
2. Kattintson az **Exportálás** lehetőségre — a proxyregiszter és a hozzárendelések is bekerülnek
3. A visszaállításhoz kattintson az **Importálás** lehetőségre, majd töltse fel a biztonsági mentési fájlt

A proxyregiszter támogatja a **host+port alapján történő upsert műveletet** is — ha olyan proxyt importál, amely már létezik (azonos gépnévvel és porttal), akkor új példány létrehozása helyett a meglévőt frissíti.

### Örökölt adatok migrációja

Ha egy régebbi (registry előtti) verzióban konfigurált proxykat, az OmniRoute automatikusan migrálja őket:

```
Korábbi key_value tároló → proxy_registry + proxy_assignments
```

Ez a frissítés utáni első indításkor egyszer történik meg. Az újbóli futtatáshoz használja a `migrateLegacyProxyConfigToRegistry({ force: true })` függvényt.

---

## 1proxy ingyenes proxy piactér

> 🆕 **Közreműködő: [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Hibajegy: [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

Az OmniRoute integrálható a **[1proxy](https://1proxy-api.aitradepulse.com)** közösségi platformmal, így hozzáférést biztosít **több száz ingyenes, ellenőrzött proxyhoz** a világ minden tájáról. Ez tökéletes megoldás azoknak a felhasználóknak, akik nem rendelkeznek saját proxyinfrastruktúrával.

### Működés

```
┌─────────────┐  Szinkronizálás  ┌─────────────────┐   Váltás    ┌─────────────┐
│  1proxy API │ ───────────────▶ │  proxy_registry  │ ──────────▶ │ Szolgáltató │
│   (külső)   │   legfeljebb 500 │  source=oneproxy │  minőség    │     API     │
└─────────────┘       proxy      └─────────────────┘   alapján    └─────────────┘
```

1. **Szinkronizálás** — Az OmniRoute lekéri az ellenőrzött proxykat a 1proxy API-ból
2. **Tárolás** — A proxyk ugyanabban a `proxy_registry` táblában lesznek mentve, `source = 'oneproxy'` értékkel
3. **Szűrés** — Szűrés protokoll, ország és minőségi pontszám alapján
4. **Váltás** — A legjobb proxy kiválasztása minőségi, véletlenszerű vagy szekvenciális stratégia használatával
5. **Automatikus leminősítés** — A sikertelen proxyk minőségi pontszáma csökken; a küszöbérték alatt → inaktívként lesznek megjelölve

### Proxyk szinkronizálása

**A vezérlőpulton keresztül:**

1. Lépjen a **Beállítások → 1proxy** lapra
2. Kattintson a **„Szinkronizálás most”** gombra
3. Tekintse meg a statisztikákat: proxyk teljes száma, aktív proxyk száma, átlagos minőség és országonkénti bontás

**API-n keresztül:**

```bash
# Szinkronizálás indítása
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Válasz:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proxyk szűrése

```bash
# Szűrés protokoll alapján
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Szűrés ország alapján
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Szűrés minimális minőségi pontszám alapján
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Szűrők kombinálása
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Proxyk minőségi pontszámai

Minden 1proxy-proxyhoz metaadatok tartoznak:

| Mező            | Leírás                                            |
| --------------- | ------------------------------------------------- |
| `qualityScore`  | A 1proxy ellenőrzése alapján adott 0–100-as érték |
| `latencyMs`     | Mért hálózati késleltetés                         |
| `anonymity`     | `transparent`, `anonymous` vagy `elite`           |
| `googleAccess`  | A proxy hozzáfér-e a Google szolgáltatásaihoz     |
| `countryCode`   | Kétbetűs ISO-országkód                            |
| `lastValidated` | A legutóbbi ellenőrzés időbélyege                 |

A minőségi pontszámok dinamikusan változnak:

- A **sikertelen kérések** 10 ponttal csökkentik a pontszámot
- Ha a **pontszám ≤10-re csökken** → a proxy `inactive` jelölést kap
- Az inaktív proxyk kimaradnak a váltásból

### Váltási stratégiák

```bash
# Váltás minőség alapján (először a legjobb proxy) — alapértelmezett
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Véletlenszerű váltás
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Szekvenciális (először a legrégebben ellenőrzött)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Megszakító

A 1proxy szinkronizálása beépített megszakítóval rendelkezik:

- **5 egymást követő szinkronizálási hiba** után a további szinkronizálási kísérletek blokkolva lesznek
- Visszaállítás: `resetOneproxyCircuitBreaker()`, vagy indítsa újra a szervert
- A szinkronizálás állapota a `GET /api/settings/oneproxy?action=status` címen érhető el

### 1proxy-proxyk törlése

```bash
# Egyetlen 1proxy-proxy törlése
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Az ÖSSZES 1proxy-proxy törlése (a manuális proxyk érintetlenek maradnak)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Észlelés elleni védelem és rejtőzködés

Az OmniRoute nem csupán proxyn keresztül irányítja a forgalmat — hitelesnek is láttatja azt:

### TLS-ujjlenyomat meghamisítása

A `wreq-js` használatával böngészőszerű TLS-ujjlenyomatokat generál, megkerülve azokat a botészlelő rendszereket, amelyek megjelölik a nem böngészőből származó TLS-kézfogásokat.

### CLI-ujjlenyomat egyeztetése

A **CLI-ujjlenyomat kapcsoló** (`Beállítások → Biztonság`) átrendezi a HTTP-fejléceket és a JSON-törzs mezőit, hogy azok pontosan megfeleljenek a natív CLI-binárisok (Claude Code, Codex stb.) aláírásának. Ez a proxy használatán **felül** működik:

```
Az Ön IP-je (blokkolva) → Proxy IP-je (USA) → Szolgáltatói API
                           + TLS-hamisítás
                           + CLI-ujjlenyomat
```

Így egyszerre kap **IP-maszkolást** és **hiteles kéréseket**.

### A proxy IP-címének megőrzése

Az irányítópulton színkódolt jelvények mutatják, hogy melyik proxyszint aktív:

| Jelvény | Szint       | Jelentés                                              |
| ------- | ----------- | ----------------------------------------------------- |
| 🟢      | Globális    | Minden forgalom ezen a proxyn keresztül halad         |
| 🟡      | Szolgáltató | Csak ezen szolgáltató forgalma halad proxyn keresztül |
| 🔵      | Kapcsolat   | Ez a konkrét kulcs/fiók ezt a proxyt használja        |

A jelvény az ellenőrzéshez a feloldott proxy IP-címét is megjeleníti.

---

## Kimenő proxy módok

A CLIProxyAPI-mintát használó szolgáltatók esetén az OmniRoute három kimenő proxymódot támogat:

| Mód           | Leírás                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| `native`      | Az OmniRoute közvetlenül kezeli a proxy útválasztását (alapértelmezett) |
| `cliproxyapi` | Átadja a feladatot egy külső CLIProxyAPI-példánynak                     |
| `fallback`    | Először a natív módot próbálja, majd visszavált a CLIProxyAPI-ra        |

Szolgáltatónként konfigurálható:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Irányítópult felhasználói felülete

### Beállítások → Proxy lap

- **Globális proxy** konfigurációja (egyszer állítható be az összes forgalomhoz)
- **Szolgáltatónkénti proxy** felülbírálások
- **Kapcsolatonkénti proxy** hozzárendelések
- **Kapcsolatteszt** a konfigurált proxyn keresztül
- Az aktív proxyszintet mutató **színkódolt jelvények**

### Beállítások → 1proxy lap

- **Szinkronizálás most** gomb az ingyenes proxyk lekéréséhez
- **Statisztikai kártyák**: Összes, Aktív, Átlagos minőség, Utolsó szinkronizálás
- **Szűrők**: Protokoll, Országkód, Minimális minőség
- **Proxytáblázat** a gazdagéppel, protokollal, országgal, minőségi pontszámmal, késleltetéssel, anonimitással és Google-hozzáféréssel
- **Szinkronizálási állapot** panel a sikeres és sikertelen műveletek követésével, valamint az egymást követő hibák számával
- **Összes törlése** az összes 1proxy-bejegyzés eltávolításához

---

## API-referencia

### Proxybeállítások API-ja

| Metódus  | Végpont                                        | Leírás                                 |
| -------- | ---------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | A teljes proxykonfiguráció lekérése    |
| `GET`    | `/api/settings/proxy?level=global`             | A globális proxy lekérése              |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | A szolgáltatói proxy lekérése          |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | A tényleges proxy feloldása            |
| `PUT`    | `/api/settings/proxy`                          | A proxykonfiguráció frissítése         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | A proxy eltávolítása az adott szintről |

### Proxyregisztrációs API

| Metódus  | Végpont                                           | Leírás                           |
| -------- | ------------------------------------------------- | -------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Az összes proxy listázása        |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proxy lekérése azonosító alapján |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Proxy-hozzárendelések lekérése   |
| `POST`   | `/api/v1/management/proxies`                      | Proxy létrehozása                |
| `PATCH`  | `/api/v1/management/proxies`                      | Proxy frissítése                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Proxy törlése                    |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Kényszerített törlés             |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Tömeges hozzárendelés            |
| `GET`    | `/api/v1/management/proxies/assignments`          | Hozzárendelések listázása        |
| `GET`    | `/api/v1/management/proxies/health`               | Proxyk állapotstatisztikái       |

### Alagutak API-ja

Ha az OmniRoute-példányt a nyilvános interneten szeretné elérhetővé tenni (Cloudflare/ngrok/Tailscale) ahelyett, hogy a kimenő forgalmat proxyn keresztül irányítaná, tekintse meg a [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) dokumentumot. Az alagutak REST API-ja az `/api/tunnels/{cloudflared,ngrok,tailscale}/*` alatt érhető el, és független a fent dokumentált kimenő proxylánctól.

### 1proxy API

| Metódus  | Végpont                                | Leírás                                           |
| -------- | -------------------------------------- | ------------------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | Az 1proxy proxyk listázása                       |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Statisztikák és szinkronizálási állapot lekérése |
| `GET`    | `/api/settings/oneproxy?action=status` | Csak a szinkronizálási állapot lekérése          |
| `POST`   | `/api/settings/oneproxy`               | Szinkronizálás indítása                          |
| `POST`   | `/api/settings/oneproxy/rotate`        | Váltás a következő proxyra                       |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Egy bejegyzés törlése                            |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Az összes törlése                                |

### Kimenő proxy API

| Metódus  | Végpont                           | Leírás                                    |
| -------- | --------------------------------- | ----------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | A kimenő proxy konfigurációjának lekérése |
| `PUT`    | `/api/upstream-proxy/:providerId` | A kimenő proxymód beállítása              |
| `DELETE` | `/api/upstream-proxy/:providerId` | A kimenő proxykonfiguráció eltávolítása   |

---

## Környezeti változók

| Változó               | Alapértelmezett érték | Leírás                                                                                          |
| --------------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`                | A SOCKS5-proxy támogatásának engedélyezése (alapértelmezetten `true` az `.env.example` fájlban) |

---

## Hibaelhárítás

### „A SOCKS5-proxy le van tiltva”

Állítsa be az `ENABLE_SOCKS5_PROXY=true` értéket az `.env` fájlban, majd indítsa újra a szolgáltatást.

### „socket hang up” hibák proxyn keresztül

Ez megszokott az olyan olcsó proxyknál, amelyek megszakítják az inaktív kapcsolatokat. Az OmniRoute ezt már kezeli a következő módokon:

- Letiltja a keep-alive használatát a proxykapcsolatoknál (`keepAliveTimeout: 1`)
- Letiltja a pipeline-kezelést (`pipelining: 0`)
- Gyorsítótárazza a diszpécsereket az ismételt kézfogások elkerülése érdekében

Ha a probléma továbbra is fennáll, próbáljon ki egy másik proxyt, vagy használja az 1proxy rotációs funkcióját.

### „unsupported_country_region_territory” az OAuth során

Győződjön meg róla, hogy a proxy **az OAuth-folyamat elindítása előtt** van konfigurálva. Az OmniRoute az OAuth-tokenek cseréjét a konfigurált proxyn keresztül irányítja. Először állítson be egy globális vagy szolgáltatói szintű proxyt, majd csatlakozzon.

### A proxy nincs használatban

Ellenőrizze a feloldási sorrendet:

1. Ellenőrizze a `GET /api/settings/proxy?resolve=your-connection-id` végponttal
2. Ellenőrizze, hogy a proxy `status` értéke `active` legyen (ne `inactive`)
3. Győződjön meg arról, hogy a proxy-hozzárendelés hatóköre megfelel a kapcsolatának

### Sikertelen 1proxy-szinkronizálás

Ellenőrizze a szinkronizálás állapotát:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Ha a `consecutiveFailures >= 5`, az áramkör-megszakító aktiválódott. Az alaphelyzetbe állításhoz indítsa újra a kiszolgálót, vagy várjon a kézi alaphelyzetbe állításra.

---

## Adatbázisséma

### `proxy_registry` tábla

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' vagy 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (csak 1proxy)
  latency_ms INTEGER,                        -- ezredmásodperc (csak 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- hozzáférhet a Google-höz? (1proxy)
  last_validated TEXT,                       -- ISO-időbélyeg (1proxy)
  country_code TEXT,                         -- kétbetűs ISO-kód (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` tábla

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- szolgáltatói azonosító, kapcsolatazonosító vagy kombinációazonosító
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Proxyk állapotellenőrzése (v3.8.16+)

Az OmniRoute **proxy gyors hibafelismerési** mechanizmusa (`src/lib/proxyHealth.ts`) egy gyors TCP-kapcsolat-ellenőrzéssel kevesebb mint 2 másodperc alatt észleli a nem működő proxykat, majd **gyorsítótárazza az eredményt**, hogy elkerülje a kérésenkénti többletterhelést.

### Működése

```
Kérés ──▶ ProxyHealthCache.get(url)
           │
           ├─ Gyorsítótár-találat + friss?  ──▶ gyorsítótárazott állapot visszaadása
           │
           └─ Nincs találat / elavult?       ──▶ TCP-kapcsolódás ehhez: host:port
                                                  (időtúllépés: FAST_FAIL_TIMEOUT_MS)
                                                  ──▶ gyorsítótárazás HEALTH_CACHE_TTL_MS ideig
                                                  ──▶ eredmény visszaadása
```

Enélkül egy nem működő proxy minden kérést a teljes `PROXY_TIMEOUT_MS` időtartamára (alapértelmezetten 30 másodpercig) blokkolna, mielőtt hibával leállna.

### Hangolható környezeti változók

| Változó                      | Alapértelmezett érték | Rendeltetés                                        |
| ---------------------------- | --------------------- | -------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`                | TCP-kapcsolat időtúllépése állapotellenőrzésenként |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`               | Az állapoteredmény gyorsítótárazásának időtartama  |

**Ajánlott értékek:**

| Forgatókönyv                              | Gyors hibafelismerés időtúllépése | Gyorsítótár TTL-je | Indoklás                                                                                |
| ----------------------------------------- | --------------------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| Nagy áteresztőképességű API-átjáró        | 1500ms                            | 60000ms            | Agresszív gyors hibafelismerés, hosszabb gyorsítótárazás az ellenőrzések csökkentéséhez |
| Földrajzilag elosztott csomópontok        | 3000ms                            | 15000ms            | A lassabb hálózatoknak több idő kell; rövidebb gyorsítótár a gyors átálláshoz           |
| Fejlesztés / tesztelés                    | 1000ms                            | 10000ms            | Gyors iteráció helyi proxykkal                                                          |
| Rejtett működés / észlelés elleni védelem | 2500ms                            | 45000ms            | Az adatforgalmi korlátokat aktiváló gyakori ellenőrzések elkerülése                     |

### A proxy állapotának vizsgálata

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Egy adott proxy újbóli ellenőrzésének kikényszerítése
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

A `stale` jelző értéke `true`, ha a gyorsítótár-bejegyzés túllépte a `HEALTH_CACHE_TTL_MS` időtartamot, és a következő kérés új ellenőrzést indít.

### Proxytípusonkénti alapértelmezett értékek

Az állapotellenőrzés az URL-séma alapján megfelelő alapértelmezett értékeket használ:

| Séma                       | Alapértelmezett port |
| -------------------------- | -------------------- |
| `http://`                  | 8080                 |
| `https://`                 | 443                  |
| `socks5://` / `socks5h://` | 1080                 |

Az URL-ben megadott egyéni portok (`http://host:9999`) mindig elsőbbséget élveznek a séma alapértelmezett értékével szemben.

---

## Proxyanalitika és megfigyelhetőség

Az OmniRoute proxynként követi a használatot, hogy segítsen az üzemeltetőknek az útválasztási minták, a késleltetési kiugrások és az ismétlődő hibák diagnosztizálásában.

### Nyomon követett adatok

Az OmniRoute minden, beállított proxyn keresztül érkező kérésnél a következőket rögzíti:

| Mérőszám     | Leírás                                                            |
| ------------ | ----------------------------------------------------------------- |
| `proxy_url`  | Teljes proxy-URL (kitakart hitelesítési adatokkal)                |
| `provider`   | A felsőbb szintű szolgáltató azonosítója (openai, anthropic stb.) |
| `latency_ms` | Teljes oda-vissza idő, beleértve a proxykézfogást                 |
| `connect_ms` | Csak a TCP-kapcsolódás ideje                                      |
| `status`     | A felsőbb szintű szolgáltatótól kapott HTTP-állapotkód            |
| `error`      | Hiba esetén a hiba osztálya                                       |
| `timestamp`  | ISO 8601 UTC                                                      |

### Az adatok elérése

```bash
# Legutóbbi proxyesemények
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

A tényleges végpont a `/api/usage/proxy-logs` (lásd: `src/app/api/usage/proxy-logs/route.ts`). Ez a végpont a következőket támogatja:

- `GET /api/usage/proxy-logs` — proxynaplók lekérése
- `DELETE /api/usage/proxy-logs` — az összes proxynapló törlése

Szükség esetén az összesített statisztikák közvetlenül lekérdezhetők SQL használatával a `proxy_logs` táblából. Az irányítópult felhasználói felülete összesített nézeteket is kínálhat.

### Gyakori minták

**Instabil proxy észlelése** (felváltva sikeres és sikertelen):

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

**Lassú proxyk keresése** (p95 késleltetés > 2 s):

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

## Forgatási stratégia döntési fája

Ha egy hatókörhöz több proxy van hozzárendelve, az OmniRoute egy **forgatási stratégiával** választja ki, hogy melyiket használja az egyes kérésekhez. A stratégia a hatókör szintjén állítható be (globálisan, szolgáltatónként, fiókonként vagy kombinációnként).

### Elérhető stratégiák

| Stratégia                   | Mikor használja                               | Kompromisszum                                                                                  |
| --------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `quality` (alapértelmezett) | Éles környezetben, eltérő minőségű proxykkal  | Előnyben részesíti a magas értékelésű proxykat; az alacsony értékelésűek háttérbe szorulhatnak |
| `random`                    | Terheléselosztáshoz, adatvédelemhez           | Egyenletes elosztás; figyelmen kívül hagyja a minőségi jelzéseket                              |
| `sequential`                | Hibakereséshez, determinisztikus teszteléshez | Sorrendben halad végig a proxykon; könnyen átlátható                                           |

### Döntési fa

```
                    Rendelkezik minőségi pontszámokkal a proxykhoz?
                    │
        ┌───────────┴───────────┐
        │                       │
      IGEN                     NEM
        │                       │
   Minden proxy                │
   megközelítőleg              │
   azonos minőségű?            │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
 IGEN       NEM              Használja a
   │         │              `random`
   │         │              stratégiát
   │         │              (az egyenletes
   │         │              elosztás idővel
   │         │              minőségi adatokat gyűjt)
   │         │
   │    Használja a `quality`
   │    stratégiát (eltérő
   │    minőség esetén
   │    ez a legjobb)
   │
Használja a `random`
stratégiát (egyenletes
terheléselosztás)
```

## Saját proxyk automatikus kizárása meghibásodás esetén

A 1proxy piactéri készlete már önállóan is automatikusan alacsonyabb prioritást ad a meghibásodott proxyknak (lásd:
[Proxyk minőségi pontszámai](#proxy-quality-scores)). A rendszerleíró adatbázishoz **Ön** által hozzáadott
proxyk esetén a háttérben futó állapotfigyelő ütemező
(`src/lib/proxyHealth/scheduler.ts`) ugyanazt az „elérhetetlen tag automatikus kizárása
a láncból” viselkedést biztosítja, bármi törlése nélkül:

```bash
# .env — proxy ideiglenes letiltása 3 egymást követő sikertelen ellenőrzés után,
# majd automatikus újbóli engedélyezése, amint ismét válaszol az ellenőrzésekre.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Így illeszkedik egy több proxyból álló láncba:

1. Az ütemező minden regisztrált proxyt ellenőriz `PROXY_HEALTH_INTERVAL_MS`
   időközönként (alapértelmezés szerint 10 percenként; legalább 1 percenként).
2. `PROXY_AUTO_REMOVE_AFTER` egymást követő **egyértelmű** hiba (valós
   kapcsolódási hiba — az időtúllépés vagy az ellenőrzési cél saját 5xx hibája soha nem számít bele, lásd:
   [Proxyk állapotának ellenőrzése](#proxy-health-checking-v3816)) után a proxy `status` mezője
   `dead` értékre lesz állítva.
3. A `dead` azon állapotok egyike, amelyeket a készlet/rotáció
   feloldásakor használt aktívállapot-szűrő kizár, így az adott hatókör rotációja (ciklikus / véletlenszerű / rögzített /
   késleltetésalapú — lásd: [Rotációs stratégia döntési fája](#rotation-strategy-decision-tree))
   azonnal leállítja az adott proxy hozzárendelését az új kérésekhez. A
   készlet többi proxyját ez nem érinti, és a teljes készlet soha nem tér át észrevétlenül közvetlen
   kapcsolatra — lásd a [Négyszintű proxyrendszer](#4-level-proxy-system) hibánál záró
   védelmét.
4. Az ütemező továbbra is ugyanilyen időközönként ellenőrzi a `dead` állapotú proxykat. A következő
   sikeres ellenőrzés visszaállítja a `status` mezőt `active` értékre, és a proxy visszakerül a rotációba —
   nincs szükség kézi újbóli hozzáadásra.

Ez szándékosan **külön engedélyezendő és adatvesztésmentes**: alapértelmezés szerint az ütemező csak
számolja és naplózza a hibákat (lásd a C szabályzatot a `decision.ts` fájlban), a `PROXY_AUTO_DISABLE`
pedig soha nem töröl sort — erre szolgál a különálló, agresszívebb
`PROXY_AUTO_REMOVE` kapcsoló. Ha mindkettő `true` értékre van állítva, a `PROXY_AUTO_REMOVE`
élvez elsőbbséget (egy törlés előtt álló proxyt nincs értelme közben ideiglenesen letiltani). A változók
teljes listáját a [Környezeti konfiguráció](../reference/ENVIRONMENT.md) referenciadokumentációban
találja.

---

> 📖 **Kapcsolódó dokumentáció:**
>
> - [Felhasználói útmutató](../guides/USER_GUIDE.md) — Általános telepítés és konfiguráció
> - [API-referencia](../reference/API_REFERENCE.md) — Teljes API-dokumentáció
> - [Környezeti konfiguráció](../reference/ENVIRONMENT.md) — Az összes környezeti változó
