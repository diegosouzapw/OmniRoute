# 🌐 OmniRoute Proxy Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Obíďte geografické blokovania, chráňte svoju identitu a smerujte komunikáciu s AI cez ľubovoľný proxy server — bez akejkoľvek zložitosti konfigurácie.**

OmniRoute obsahuje plnohodnotný systém správy proxy serverov, ktorý umožňuje smerovať komunikáciu s nadradenými poskytovateľmi AI cez proxy servery HTTP, HTTPS alebo SOCKS5. Či už sa nachádzate v blokovanom regióne, potrebujete rotáciu IP adries alebo chcete maskovať digitálny odtlačok — táto príručka obsahuje všetko potrebné.

---

## Obsah

- [Prečo používať proxy servery?](#why-use-proxies)
- [Prehľad architektúry](#architecture-overview)
- [4-úrovňový systém proxy serverov](#4-level-proxy-system)
- [Register proxy serverov (CRUD)](#proxy-registry-crud)
- [Bezplatné trhovisko 1proxy](#1proxy-free-proxy-marketplace)
- [Rotácia proxy serverov](#proxy-rotation)
- [Ochrana pred detekciou a maskovanie](#anti-detection--stealth)
- [Režimy nadradeného proxy servera](#upstream-proxy-modes)
- [Používateľské rozhranie ovládacieho panela](#dashboard-ui)
- [Referenčná príručka API](#api-reference)
- [Premenné prostredia](#environment-variables)
- [Riešenie problémov](#troubleshooting)

---

## Prečo používať proxy servery?

Mnohí poskytovatelia AI obmedzujú prístup podľa geografického regiónu. Vývojári v **Rusku, Číne, Iráne, na Kube, v Turecku** a ďalších krajinách sa stretávajú s chybami, ako je:

```
unsupported_country_region_territory
```

Proxy servery sú užitočné aj mimo blokovaných regiónov:

| Prípad použitia                      | Opis                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| **Obídenie geografických obmedzení** | Prístup k OpenAI, Anthropic, Codex a Copilot z blokovaných krajín                       |
| **Rotácia IP adries**                | Rozdelenie požiadaviek medzi viacero IP adries s cieľom vyhnúť sa obmedzeniu frekvencie |
| **Súkromie**                         | Skrytie vašej skutočnej IP adresy pred nadradenými poskytovateľmi                       |
| **Súlad s predpismi**                | Smerovanie komunikácie cez konkrétne jurisdikcie                                        |
| **Testovanie**                       | Simulácia požiadaviek z rôznych regiónov                                                |

---

## Prehľad architektúry

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Register    │    │ Dispečer     │    │ Načítanie        │  │
│  │ proxy       │───▶│ proxy        │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (s cache)    │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Synchroniz. │                        │ API nadradeného  │  │
│  │ 1proxy      │                        │ poskytovateľa    │  │
│  │ (bezpl. fond)│                       │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Kľúčové komponenty

| Komponent                   | Súbor                                        | Úloha                                                                          |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| **Register proxy serverov** | `src/lib/db/proxies.ts`                      | Operácie CRUD pre záznamy proxy serverov a priradenia rozsahov                 |
| **Dispečer proxy serverov** | `open-sse/utils/proxyDispatcher.ts`          | Vytvára dispečery `undici` ProxyAgent/SOCKS s ukladaním do vyrovnávacej pamäte |
| **Načítanie cez proxy**     | `open-sse/utils/proxyFetch.ts`               | Obaľuje `fetch()` vložením dispečera proxy servera                             |
| **Trasa nastavení**         | `src/app/api/settings/proxy/route.ts`        | Staršie API konfigurácie proxy servera (GET/PUT/DELETE)                        |
| **Trasa správy**            | `src/app/api/v1/management/proxies/route.ts` | API registra pre operácie CRUD (GET/POST/PATCH/DELETE)                         |
| **Databáza 1proxy**         | `src/lib/db/oneproxy.ts`                     | Trvalé ukladanie údajov bezplatného trhoviska proxy serverov                   |

---

## 4-úrovňový systém proxy

OmniRoute podporuje konfiguráciu proxy na **štyroch nezávislých úrovniach**, ktoré sa vyhodnocujú podľa priority:

```
Poradie vyhodnocovania priorít (od najvyššej → po najnižšiu):

  1. 🔵 Proxy účtu/pripojenia  →  pre každý API kľúč/pripojenie OAuth
  2. 🟡 Proxy poskytovateľa    →  pre každého poskytovateľa (napr. všetka komunikácia OpenAI)
  3. 🟠 Proxy kombinácie       →  pre každú kombináciu/konfiguráciu smerovania
  4. 🟢 Globálna proxy         →  všetka komunikácia, všetci poskytovatelia
```

### Ako funguje vyhodnocovanie

Keď OmniRoute odosiela požiadavku nadradenému poskytovateľovi, zavolá `resolveProxyForConnectionFromRegistry()`, ktorá postupne skontroluje jednotlivé úrovne:

1. **Úroveň účtu** — Je k tomuto konkrétnemu ID pripojenia priradená proxy?
2. **Úroveň poskytovateľa** — Je k tomuto poskytovateľovi (napr. `openai`) priradená proxy?
3. **Globálna úroveň** — Je nakonfigurovaná globálna proxy?
4. **Bez proxy** — Priame pripojenie k poskytovateľovi.

Použije sa prvá zhoda. To znamená, že môžete nastaviť globálnu proxy ako záložnú možnosť, no pre konkrétnych poskytovateľov alebo pripojenia ju prepísať.

### Čo sa smeruje cez proxy

| Typ komunikácie         | Cez proxy? | Poznámky                                     |
| ----------------------- | ---------- | -------------------------------------------- |
| Dokončovanie chatu      | ✅         | Všetky požiadavky `/v1/chat/completions`     |
| Vektorové reprezentácie | ✅         | `/v1/embeddings`                             |
| Generovanie obrázkov    | ✅         | `/v1/images/generations`                     |
| Zvuk (TTS/STT)          | ✅         | `/v1/audio/*`                                |
| Výmena tokenov OAuth    | ✅         | Rieši `unsupported_country_region_territory` |
| Testy pripojenia        | ✅         | Tlačidlo „Testovať pripojenie“ používa proxy |
| Obnovenie tokenov       | ✅         | Obnovenie OAuth na pozadí                    |
| Synchronizácia modelov  | ✅         | Výpis a zisťovanie modelov                   |

---

## Register proxy (CRUD)

Register proxy je tabuľka SQLite (`proxy_registry`), ktorá uchováva všetky vaše proxy. Každá proxy obsahuje:

| Pole       | Typ        | Popis                                                       |
| ---------- | ---------- | ----------------------------------------------------------- |
| `id`       | UUID       | Jedinečný identifikátor                                     |
| `name`     | Reťazec    | Zrozumiteľný názov                                          |
| `type`     | Reťazec    | Protokol: `http`, `https`, `socks5`                         |
| `host`     | Reťazec    | Názov hostiteľa alebo IP adresa proxy                       |
| `port`     | Celé číslo | Číslo portu                                                 |
| `username` | Reťazec    | Používateľské meno na autentifikáciu (v úložisku šifrované) |
| `password` | Reťazec    | Heslo na autentifikáciu (v úložisku šifrované)              |
| `region`   | Reťazec    | Označenie geografickej oblasti                              |
| `notes`    | Reťazec    | Voľné textové poznámky                                      |
| `status`   | Reťazec    | `active` alebo `inactive`                                   |
| `source`   | Reťazec    | `manual` alebo `oneproxy`                                   |

### Vytvorenie proxy

**Cez ovládací panel:**

1. Prejdite na **Nastavenia → Proxy**
2. Kliknite na **Pridať proxy**
3. Vyplňte typ, hostiteľa, port a voliteľné autentifikačné údaje
4. Uložte zmeny

**Cez API:**

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

### Aktualizácia proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Poznámka:** Prihlasovacie údaje sa zachovajú, pokiaľ výslovne neodošlete neprázdne náhradné hodnoty. Odoslaním prázdnych reťazcov pre `username`/`password` sa uložené hodnoty zachovajú.

### Odstránenie proxy

```bash
# Zlyhá, ak je proxy priradená k ľubovoľnej úrovni
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Vynútené odstránenie (odstráni aj priradenia)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Výpis proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Priraďovanie proxy k úrovniam

```bash
# Priradenie ku globálnej úrovni
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Priradenie ku konkrétnemu poskytovateľovi
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Priradenie ku konkrétnemu pripojeniu/kľúču
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Určenie výslednej proxy

Skontrolujte, ktorá proxy by sa použila pre dané pripojenie:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Vráti určenú proxy spolu s jej úrovňou (`account`, `provider` alebo `global`) a zdrojom.

### Hromadné priradenie

Priraďte jednu proxy k viacerým poskytovateľom alebo pripojeniam naraz:

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

Proxy sú súčasťou systému **Zálohovanie/obnovenie**. Pri exporte konfigurácie OmniRoute:

1. Prejdite na **Ovládací panel → Nastavenia → Záloha**
2. Kliknite na **Exportovať** — register proxy a priradenia sú zahrnuté
3. Ak chcete konfiguráciu obnoviť, kliknite na **Importovať** a nahrajte súbor zálohy

Register proxy podporuje aj operáciu **upsert podľa hostiteľa+portu** — ak importujete proxy, ktorá už existuje (rovnaký hostiteľ a port), aktualizuje sa namiesto vytvorenia duplikátu.

### Migrácia staršej verzie

Ak ste nakonfigurovali proxy servery v staršej verzii (pred zavedením registra), OmniRoute ich automaticky migruje:

```
Staršie úložisko key_value → proxy_registry + proxy_assignments
```

Táto migrácia sa vykoná raz pri prvom spustení po inovácii. Ak ju chcete spustiť znova, použite `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## 1proxy – bezplatné trhovisko proxy serverov

> 🆕 **Prispel [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (problém [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute sa integruje s komunitnou platformou **[1proxy](https://1proxy-api.aitradepulse.com)** a poskytuje prístup k **stovkám bezplatných, overených proxy serverov** z celého sveta. Je to ideálne pre používateľov, ktorí nemajú vlastnú proxy infraštruktúru.

### Ako to funguje

```
┌─────────────┐  Synchronizácia  ┌─────────────────┐    Rotácia    ┌──────────────────┐
│  1proxy API │ ────────────────▶ │  proxy_registry  │ ────────────▶ │ API poskytovateľa│
│  (externé)  │   až 500 proxy    │  source=oneproxy │  podľa kvality│                  │
└─────────────┘     serverov      └─────────────────┘               └──────────────────┘
```

1. **Synchronizácia** — OmniRoute načíta overené proxy servery z rozhrania 1proxy API
2. **Uloženie** — Proxy servery sa uložia do rovnakej tabuľky `proxy_registry` s hodnotou `source = 'oneproxy'`
3. **Filtrovanie** — Filtrovanie podľa protokolu, krajiny a skóre kvality
4. **Rotácia** — Výber najlepšieho proxy servera pomocou stratégie podľa kvality, náhodnej alebo sekvenčnej stratégie
5. **Automatické znižovanie hodnotenia** — Neúspešným proxy serverom sa zníži skóre kvality; pod prahovou hodnotou → označia sa ako neaktívne

### Synchronizácia proxy serverov

**Prostredníctvom ovládacieho panela:**

1. Prejdite na kartu **Nastavenia → 1proxy**
2. Kliknite na **„Synchronizovať teraz“**
3. Zobrazte štatistiky: celkový počet proxy serverov, počet aktívnych, priemernú kvalitu a rozdelenie podľa krajín

**Prostredníctvom API:**

```bash
# Spustenie synchronizácie
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Odpoveď:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrovanie proxy serverov

```bash
# Filtrovanie podľa protokolu
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtrovanie podľa krajiny
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtrovanie podľa minimálneho skóre kvality
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Kombinovanie filtrov
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Skóre kvality proxy serverov

Každý proxy server 1proxy obsahuje metadáta:

| Pole            | Popis                                       |
| --------------- | ------------------------------------------- |
| `qualityScore`  | Hodnotenie 0-100 z overovania 1proxy        |
| `latencyMs`     | Nameraná latencia siete                     |
| `anonymity`     | `transparent`, `anonymous` alebo `elite`    |
| `googleAccess`  | Či má proxy server prístup k službám Google |
| `countryCode`   | Dvojpísmenový kód krajiny podľa normy ISO   |
| `lastValidated` | Časová pečiatka posledného overenia         |

Skóre kvality sa upravuje dynamicky:

- **Neúspešné požiadavky** znižujú skóre o 10 bodov
- **Skóre klesne na ≤10** → proxy server sa označí ako `inactive`
- Neaktívne proxy servery sú vylúčené z rotácie

### Stratégie rotácie

```bash
# Rotácia podľa kvality (najlepší proxy server ako prvý) — predvolené
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Náhodná rotácia
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sekvenčná rotácia (najskôr proxy server, ktorý bol overený najdávnejšie)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Istič

Synchronizácia 1proxy má zabudovaný istič:

- Po **5 po sebe nasledujúcich zlyhaniach synchronizácie** sa ďalšie pokusy o synchronizáciu zablokujú
- Resetujte ho pomocou: `resetOneproxyCircuitBreaker()` alebo reštartujte server
- Stav synchronizácie je dostupný na adrese `GET /api/settings/oneproxy?action=status`

### Vymazanie proxy serverov 1proxy

```bash
# Odstránenie jedného proxy servera 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Vymazanie VŠETKÝCH proxy serverov 1proxy (manuálne proxy servery zostanú nedotknuté)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Ochrana pred detekciou a utajenie

OmniRoute nesmeruje prenos iba cez proxy — zabezpečuje tiež, aby prenos vyzeral legitímne:

### Napodobňovanie odtlačku TLS

Používa `wreq-js` na generovanie odtlačkov TLS podobných prehliadačom, čím obchádza systémy na detekciu botov, ktoré označujú handshaky TLS nepochádzajúce z prehliadačov.

### Zhoda s odtlačkom CLI

**Prepínač odtlačku CLI** (`Nastavenia → Zabezpečenie`) mení poradie hlavičiek HTTP a polí tela JSON tak, aby zodpovedali presnej signatúre natívnych binárnych súborov CLI (Claude Code, Codex atď.). Funguje to **nad rámec** proxy:

```
Vaša IP (blokovaná) → IP proxy (USA) → API poskytovateľa
                      + napodobnenie TLS
                      + odtlačok CLI
```

Získate tak súčasne **maskovanie IP adresy** aj **autentickosť požiadaviek**.

### Zachovanie IP adresy proxy

Farebne odlíšené odznaky na ovládacom paneli zobrazujú, ktorá úroveň proxy je aktívna:

| Odznak | Úroveň       | Význam                                             |
| ------ | ------------ | -------------------------------------------------- |
| 🟢     | Globálna     | Všetok prenos prechádza cez túto proxy             |
| 🟡     | Poskytovateľ | Cez proxy prechádza iba prenos tohto poskytovateľa |
| 🔵     | Pripojenie   | Tento konkrétny kľúč/účet používa túto proxy       |

Odznak tiež zobrazuje rozpoznanú IP adresu proxy na účely overenia.

---

## Režimy nadradenej proxy

Pre poskytovateľov, ktorí používajú vzor CLIProxyAPI, podporuje OmniRoute tri režimy nadradenej proxy:

| Režim         | Popis                                                     |
| ------------- | --------------------------------------------------------- |
| `native`      | OmniRoute spracováva smerovanie proxy priamo (predvolené) |
| `cliproxyapi` | Deleguje spracovanie externej inštancii CLIProxyAPI       |
| `fallback`    | Najprv vyskúša natívny režim, potom prejde na CLIProxyAPI |

Konfigurácia pre jednotlivých poskytovateľov:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Používateľské rozhranie ovládacieho panela

### Nastavenia → Karta Proxy

- Konfigurácia **globálnej proxy** (nastavuje sa raz pre všetok prenos)
- Nastavenia proxy pre **jednotlivých poskytovateľov**
- Priradenia proxy pre **jednotlivé pripojenia**
- **Test pripojenia** prostredníctvom nakonfigurovanej proxy
- **Farebne odlíšené odznaky** zobrazujúce aktívnu úroveň proxy

### Nastavenia → Karta 1proxy

- Tlačidlo **Synchronizovať teraz** na načítanie bezplatných proxy
- **Karty štatistík**: Celkom, Aktívne, Priemerná kvalita, Posledná synchronizácia
- **Filtre**: Protokol, Kód krajiny, Minimálna kvalita
- **Tabuľka proxy** s hostiteľom, protokolom, krajinou, skóre kvality, latenciou, anonymitou a prístupom ku Google
- Panel **stavu synchronizácie** so sledovaním úspešných/neúspešných pokusov a počtom po sebe nasledujúcich zlyhaní
- **Vymazať všetko** na odstránenie všetkých záznamov 1proxy

---

## Referenčná príručka API

### API nastavení proxy

| Metóda   | Koncový bod                                    | Popis                           |
| -------- | ---------------------------------------------- | ------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Získať úplnú konfiguráciu proxy |
| `GET`    | `/api/settings/proxy?level=global`             | Získať globálnu proxy           |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Získať proxy poskytovateľa      |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Určiť efektívnu proxy           |
| `PUT`    | `/api/settings/proxy`                          | Aktualizovať konfiguráciu proxy |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Odstrániť proxy na danej úrovni |

### API registra proxy

| Metóda   | Koncový bod                                       | Popis                   |
| -------- | ------------------------------------------------- | ----------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Zobraziť všetky proxy   |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Získať proxy podľa ID   |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Získať priradenia proxy |
| `POST`   | `/api/v1/management/proxies`                      | Vytvoriť proxy          |
| `PATCH`  | `/api/v1/management/proxies`                      | Aktualizovať proxy      |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Odstrániť proxy         |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Vynútiť odstránenie     |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Hromadne priradiť       |
| `GET`    | `/api/v1/management/proxies/assignments`          | Zobraziť priradenia     |
| `GET`    | `/api/v1/management/proxies/health`               | Štatistiky stavu proxy  |

### API tunelov

Informácie o sprístupnení vašej inštancie OmniRoute verejnému internetu (Cloudflare/ngrok/Tailscale) namiesto smerovania odchádzajúceho prenosu cez proxy nájdete v dokumente [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API tunelov sa nachádza pod `/api/tunnels/{cloudflared,ngrok,tailscale}/*` a je nezávislé od reťazca odchádzajúcich proxy zdokumentovaného vyššie.

### API 1proxy

| Metóda   | Koncový bod                            | Popis                                   |
| -------- | -------------------------------------- | --------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Zobraziť proxy 1proxy                   |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Získať štatistiky a stav synchronizácie |
| `GET`    | `/api/settings/oneproxy?action=status` | Získať iba stav synchronizácie          |
| `POST`   | `/api/settings/oneproxy`               | Spustiť synchronizáciu                  |
| `POST`   | `/api/settings/oneproxy/rotate`        | Prepnúť na ďalšiu proxy                 |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Odstrániť jednu                         |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Vymazať všetky                          |

### API nadradenej proxy

| Metóda   | Koncový bod                       | Popis                                   |
| -------- | --------------------------------- | --------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Získať konfiguráciu nadradenej proxy    |
| `PUT`    | `/api/upstream-proxy/:providerId` | Nastaviť režim nadradenej proxy         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Odstrániť konfiguráciu nadradenej proxy |

---

## Premenné prostredia

| Premenná              | Predvolená hodnota | Popis                                                                     |
| --------------------- | ------------------ | ------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`             | Povoliť podporu proxy SOCKS5 (predvolená hodnota `true` v `.env.example`) |

---

## Riešenie problémov

### „Proxy SOCKS5 je zakázané“

Nastavte `ENABLE_SOCKS5_PROXY=true` v súbore `.env` a reštartujte aplikáciu.

### Chyby „socket hang up“ pri použití proxy

Je to bežné pri lacných proxy, ktoré prerušujú neaktívne pripojenia. OmniRoute to už rieši nasledujúcimi spôsobmi:

- Zakázaním keep-alive pri pripojeniach cez proxy (`keepAliveTimeout: 1`)
- Zakázaním pipeliningu (`pipelining: 0`)
- Ukladaním dispečerov do vyrovnávacej pamäte, aby sa predišlo opakovaným handshakeom

Ak problém pretrváva, skúste inú proxy alebo použite funkciu rotácie 1proxy.

### „unsupported_country_region_territory“ počas OAuth

Uistite sa, že je proxy nakonfigurované **pred** spustením procesu OAuth. OmniRoute smeruje výmenu tokenov OAuth cez nakonfigurované proxy. Najskôr nastavte globálne proxy alebo proxy na úrovni poskytovateľa a potom sa pripojte.

### Proxy sa nepoužíva

Skontrolujte poradie vyhodnocovania:

1. Overte ho pomocou `GET /api/settings/proxy?resolve=your-connection-id`
2. Skontrolujte, či má proxy `status` nastavený na `active` (nie `inactive`)
3. Uistite sa, že rozsah priradenia proxy zodpovedá vášmu pripojeniu

### Synchronizácia 1proxy zlyháva

Skontrolujte stav synchronizácie:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Ak `consecutiveFailures >= 5`, aktivoval sa istič. Reštartujte server, aby sa resetoval, alebo počkajte na manuálny reset.

---

## Schéma databázy

### Tabuľka `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' alebo 'oneproxy'
  quality_score INTEGER,                     -- 0 – 100 (iba 1proxy)
  latency_ms INTEGER,                        -- milisekundy (iba 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- má prístup k službe Google? (1proxy)
  last_validated TEXT,                       -- časová značka ISO (1proxy)
  country_code TEXT,                         -- dvojpísmenový kód ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabuľka `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID poskytovateľa, ID pripojenia alebo ID kombinácie
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Kontrola stavu proxy (v3.8.16+)

Mechanizmus **rýchleho zlyhania proxy** v OmniRoute (`src/lib/proxyHealth.ts`) rozpozná nefunkčné proxy za <2s pomocou rýchlej kontroly pripojenia TCP a následne **uloží výsledok do vyrovnávacej pamäte**, aby sa predišlo réžii pri každej požiadavke.

### Ako to funguje

```
Požiadavka ──▶ ProxyHealthCache.get(url)
                │
                ├─ Nájdené v cache + aktuálne?  ──▶ vrátiť stav z cache
                │
                └─ Nenájdené v cache / neaktuálne?  ──▶ TCP pripojenie k host:port
                                                          (časový limit: FAST_FAIL_TIMEOUT_MS)
                                                          ──▶ uložiť do cache na HEALTH_CACHE_TTL_MS
                                                          ──▶ vrátiť výsledok
```

Bez tohto mechanizmu by nefunkčné proxy blokovalo každú požiadavku počas celej hodnoty `PROXY_TIMEOUT_MS` (predvolene 30s), kým by zlyhala.

### Nastaviteľné premenné prostredia

| Premenná                     | Predvolená hodnota | Účel                                                                |
| ---------------------------- | ------------------ | ------------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`             | Časový limit pripojenia TCP pre každú kontrolu stavu                |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`            | Ako dlho sa výsledok kontroly stavu uchováva vo vyrovnávacej pamäti |

**Odporúčané hodnoty:**

| Scenár                          | Časový limit rýchleho zlyhania | TTL cache | Odôvodnenie                                                                       |
| ------------------------------- | ------------------------------ | --------- | --------------------------------------------------------------------------------- |
| Brána API s vysokou záťažou     | 1500ms                         | 60000ms   | Agresívne rýchle zlyhanie a dlhšia cache na zníženie počtu kontrol                |
| Geograficky distribuované uzly  | 3000ms                         | 15000ms   | Pomalšie siete potrebujú viac času; kratšia cache na rýchle prepnutie pri zlyhaní |
| Vývoj/testovanie                | 1000ms                         | 10000ms   | Rýchle iterácie pri lokálnych proxy                                               |
| Utajenie/ochrana pred detekciou | 2500ms                         | 45000ms   | Predchádza rýchlemu sondovaniu, ktoré by mohlo aktivovať obmedzenia frekvencie    |

### Kontrola stavu proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Vynútiť opätovnú kontrolu konkrétneho proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Príznak `stale` má hodnotu `true`, keď položka vo vyrovnávacej pamäti prekročila `HEALTH_CACHE_TTL_MS` a nasledujúca požiadavka spustí novú kontrolu.

### Predvolené hodnoty podľa typu proxy

Kontrola stavu používa rozumné predvolené hodnoty založené na schéme URL:

| Schéma                     | Predvolený port |
| -------------------------- | --------------- |
| `http://`                  | 8080            |
| `https://`                 | 443             |
| `socks5://` / `socks5h://` | 1080            |

Vlastné porty v URL (`http://host:9999`) majú vždy prednosť pred predvolenou hodnotou schémy.

---

## Analytika a pozorovateľnosť proxy serverov

OmniRoute sleduje využitie jednotlivých proxy serverov, aby operátorom pomohol diagnostikovať vzory smerovania, nárasty latencie a opakujúce sa zlyhania.

### Čo sa sleduje

Pre každú požiadavku odoslanú cez nakonfigurovaný proxy server zaznamenáva OmniRoute:

| Metrika      | Popis                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| `proxy_url`  | Úplná URL adresa proxy servera (prihlasovacie údaje sú maskované)            |
| `provider`   | ID nadradeného poskytovateľa (openai, anthropic atď.)                        |
| `latency_ms` | Celkový čas prenosu tam a späť vrátane nadviazania spojenia s proxy serverom |
| `connect_ms` | Iba čas nadviazania TCP spojenia                                             |
| `status`     | Stavový kód HTTP od nadradeného servera                                      |
| `error`      | Trieda chyby, ak požiadavka zlyhala                                          |
| `timestamp`  | ISO 8601 UTC                                                                 |

### Prístup k údajom

```bash
# Nedávne udalosti proxy serverov
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Skutočný koncový bod je `/api/usage/proxy-logs` (pozrite si `src/app/api/usage/proxy-logs/route.ts`). Tento koncový bod podporuje:

- `GET /api/usage/proxy-logs` — načítanie protokolov proxy serverov
- `DELETE /api/usage/proxy-logs` — vymazanie všetkých protokolov proxy serverov

V prípade potreby možno agregované štatistiky zisťovať priamo z tabuľky `proxy_logs` pomocou SQL. Používateľské rozhranie ovládacieho panela môže ponúkať agregované zobrazenia.

### Bežné vzory

**Zistenie nestabilného proxy servera** (striedavo funguje a zlyháva):

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

**Vyhľadanie pomalých proxy serverov** (latencia p95 > 2 s):

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

## Rozhodovací strom stratégie rotácie

Keď je k rozsahu priradených viacero proxy serverov, OmniRoute používa **stratégiu rotácie** na výber proxy servera pre každú požiadavku. Stratégia sa konfiguruje na úrovni rozsahu (globálne, pre jednotlivých poskytovateľov, pre jednotlivé účty alebo pre jednotlivé kombinácie).

### Dostupné stratégie

| Stratégia              | Kedy ju použiť                                       | Kompromis                                                                        |
| ---------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------- |
| `quality` (predvolená) | Produkčné prostredie s proxy servermi rôznej kvality | Uprednostňuje vysoko hodnotené proxy servery; nízko hodnotené môže zanedbávať    |
| `random`               | Rozloženie záťaže, ochrana súkromia                  | Rovnomerné rozloženie; ignoruje signály kvality                                  |
| `sequential`           | Ladenie, deterministické testovanie                  | Cyklicky prechádza proxy servery v danom poradí; správanie je ľahko pochopiteľné |

### Rozhodovací strom

```
                    Máte pre svoje proxy servery skóre kvality?
                    │
        ┌───────────┴───────────┐
        │                       │
       ÁNO                     NIE
        │                       │
   Majú všetky proxy           │
   servery približne           │
   rovnakú kvalitu?            │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  ÁNO       NIE              Použite
   │         │              `random`
   │         │              (rovnomerné
   │         │              rozloženie časom
   │         │              vytvorí údaje
   │         │              o kvalite)
   │         │
   │    Použite `quality`
   │    (najlepšie pre
   │    rôznu kvalitu)
   │
Použite `random`
(rovnomerne
rozloží záťaž)
```

## Automatické vylúčenie zlyhania pre vaše vlastné proxy

Fond trhoviska 1proxy už automaticky znižuje hodnotenie zlyhaných proxy (pozrite si
[Skóre kvality proxy](#proxy-quality-scores)). Pre proxy, ktoré ste do registra pridali
**vy**, poskytuje plánovač kontroly stavu na pozadí
(`src/lib/proxyHealth/scheduler.ts`) rovnakú funkciu „automatického vylúčenia nefunkčného
člena z reťazca“ bez toho, aby sa čokoľvek odstránilo:

```bash
# .env — po 3 po sebe nasledujúcich neúspešných kontrolách dočasne deaktivujte proxy
# a automaticky ju znova aktivujte, keď začne opäť odpovedať na kontroly.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Ako to funguje v reťazci viacerých proxy:

1. Plánovač kontroluje každú zaregistrovanú proxy v každom intervale `PROXY_HEALTH_INTERVAL_MS`
   (predvolene 10 min; minimálne 1 min).
2. Po `PROXY_AUTO_REMOVE_AFTER` po sebe nasledujúcich **jednoznačných** zlyhaniach (skutočné
   zlyhanie pripojenia — časový limit ani vlastná odpoveď 5xx cieľa kontroly sa nikdy
   nezapočítavajú, pozrite si [Kontrolu stavu proxy](#proxy-health-checking-v3816)) sa
   `status` proxy nastaví na `dead`.
3. `dead` je jeden zo stavov, ktoré filter aktívnych stavov používaný pri vyhodnocovaní
   fondu/rotácie vylučuje, takže rotácia rozsahu (round-robin / náhodná / sticky /
   podľa latencie — pozrite si [Rozhodovací strom stratégie rotácie](#rotation-strategy-decision-tree))
   okamžite prestane prideľovať túto proxy novým požiadavkám. Ostatné proxy vo fonde
   nie sú ovplyvnené a celý fond nikdy potichu neprejde späť na priame pripojenie —
   pozrite si ochranu typu fail-closed v rámci
   [4-úrovňového systému proxy](#4-level-proxy-system).
4. Plánovač naďalej kontroluje proxy so stavom `dead` v rovnakom intervale. Nasledujúca
   úspešná kontrola zmení `status` späť na `active` a proxy sa znova zaradí do rotácie —
   bez potreby manuálneho opätovného pridania.

Táto funkcia je zámerne **voliteľná a nedeštruktívna**: plánovač predvolene zlyhania
iba počíta a zaznamenáva (pozrite si politiku C v `decision.ts`) a
`PROXY_AUTO_DISABLE` nikdy neodstráni riadok — na to slúži samostatný, agresívnejší
príznak `PROXY_AUTO_REMOVE`. Ak sú oba nastavené na `true`, prednosť má
`PROXY_AUTO_REMOVE` (pri proxy, ktorá sa má odstrániť, nemá dočasná deaktivácia
medzitým význam). Úplný zoznam premenných nájdete v referenčnej príručke
[Konfigurácia prostredia](../reference/ENVIRONMENT.md).

---

> 📖 **Súvisiaca dokumentácia:**
>
> - [Používateľská príručka](../guides/USER_GUIDE.md) — Všeobecné nastavenie a konfigurácia
> - [Referencia API](../reference/API_REFERENCE.md) — Úplná dokumentácia API
> - [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Všetky premenné prostredia
