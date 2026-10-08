# 🌐 OmniRoute Proxy Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Apeikite geografinius apribojimus, apsaugokite savo tapatybę ir nukreipkite DI srautą per bet kurį tarpinį serverį — be jokio sudėtingo konfigūravimo.**

OmniRoute turi visavertę tarpinių serverių valdymo sistemą, leidžiančią nukreipti srautą į išorinius DI paslaugų teikėjus per HTTP, HTTPS arba SOCKS5 tarpinius serverius. Nesvarbu, ar esate regione, kuriame prieiga užblokuota, ar jums reikia IP adresų rotacijos, ar norite paslėpti skaitmeninį pėdsaką — šiame vadove aprašyta viskas.

---

## Turinys

- [Kodėl verta naudoti tarpinius serverius?](#why-use-proxies)
- [Architektūros apžvalga](#architecture-overview)
- [4 lygių tarpinių serverių sistema](#4-level-proxy-system)
- [Tarpinių serverių registras (CRUD)](#proxy-registry-crud)
- [Nemokama „1proxy“ prekyvietė](#1proxy-free-proxy-marketplace)
- [Tarpinių serverių rotacija](#proxy-rotation)
- [Apsauga nuo aptikimo ir maskavimas](#anti-detection--stealth)
- [Išorinių tarpinių serverių režimai](#upstream-proxy-modes)
- [Valdymo skydelio sąsaja](#dashboard-ui)
- [API žinynas](#api-reference)
- [Aplinkos kintamieji](#environment-variables)
- [Trikčių šalinimas](#troubleshooting)

---

## Kodėl verta naudoti tarpinius serverius?

Daugelis DI paslaugų teikėjų riboja prieigą pagal geografinį regioną. Kūrėjai **Rusijoje, Kinijoje, Irane, Kuboje, Turkijoje** ir kitose šalyse susiduria su tokiomis klaidomis:

```
unsupported_country_region_territory
```

Net ir užblokuotiems regionams nepriklausančiose vietovėse tarpiniai serveriai naudingi dėl šių priežasčių:

| Naudojimo atvejis              | Aprašymas                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| **Geografinių blokų apėjimas** | Pasiekite OpenAI, Anthropic, Codex ir Copilot iš šalių, kuriose prieiga užblokuota |
| **IP adresų rotacija**         | Paskirstykite užklausas keliems IP adresams, kad išvengtumėte dažnio ribojimo      |
| **Privatumas**                 | Paslėpkite savo tikrąjį IP adresą nuo išorinių paslaugų teikėjų                    |
| **Atitiktis**                  | Nukreipkite srautą per konkrečias jurisdikcijas                                    |
| **Testavimas**                 | Imituokite užklausas iš skirtingų regionų                                          |

---

## Architektūros apžvalga

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute serveris                      │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Tarpinių    │    │ Tarpinių     │    │ Tarpinio serverio│  │
│  │ serverių    │───▶│ serverių     │───▶│ užklausa (undici)│  │
│  │ registras   │    │ dispečeris   │    │                  │  │
│  │ (SQLite)    │    │ (talpykla)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy      │                        │ Išorinio         │  │
│  │ sinchroniz. │                        │ teikėjo API      │  │
│  │ (nemokamas) │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Pagrindiniai komponentai

| Komponentas                      | Failas                                       | Paskirtis                                                               |
| -------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| **Tarpinių serverių registras**  | `src/lib/db/proxies.ts`                      | Tarpinių serverių įrašų CRUD ir taikymo sričių priskyrimas              |
| **Tarpinių serverių dispečeris** | `open-sse/utils/proxyDispatcher.ts`          | Kuria `undici` ProxyAgent/SOCKS dispečerius ir naudoja podėlį           |
| **Tarpinio serverio užklausa**   | `open-sse/utils/proxyFetch.ts`               | Papildo `fetch()` tarpinio serverio dispečerio įterpimu                 |
| **Nustatymų maršrutas**          | `src/app/api/settings/proxy/route.ts`        | Ankstesnės kartos tarpinio serverio konfigūracijos API (GET/PUT/DELETE) |
| **Valdymo maršrutas**            | `src/app/api/v1/management/proxies/route.ts` | Registro CRUD API (GET/POST/PATCH/DELETE)                               |
| **1proxy DB**                    | `src/lib/db/oneproxy.ts`                     | Nemokamos tarpinių serverių prekyvietės duomenų ilgalaikis saugojimas   |

---

## 4 lygių tarpinių serverių sistema

OmniRoute palaiko tarpinių serverių konfigūraciją **keturiose nepriklausomose srityse**, kurios tikrinamos prioriteto tvarka:

```
Prioritetų nustatymo tvarka (nuo aukščiausio → iki žemiausio):

  1. 🔵 Paskyros / ryšio tarpinis serveris  →  kiekvienam API raktui / OAuth ryšiui
  2. 🟡 Teikėjo tarpinis serveris           →  kiekvienam teikėjui (pvz., visam OpenAI srautui)
  3. 🟠 Derinio tarpinis serveris           →  kiekvienam deriniui / maršruto parinkimo konfigūracijai
  4. 🟢 Visuotinis tarpinis serveris        →  visam srautui, visiems teikėjams
```

### Kaip nustatomas tarpinis serveris

Kai OmniRoute siunčia užklausą išoriniam teikėjui, iškviečiama `resolveProxyForConnectionFromRegistry()` funkcija, kuri paeiliui patikrina kiekvieną lygį:

1. **Paskyros lygis** — ar šiam konkrečiam ryšio ID priskirtas tarpinis serveris?
2. **Teikėjo lygis** — ar šiam teikėjui (pvz., `openai`) priskirtas tarpinis serveris?
3. **Visuotinis lygis** — ar sukonfigūruotas visuotinis tarpinis serveris?
4. **Be tarpinio serverio** — tiesioginis ryšys su teikėju.

Naudojama pirmoji atitiktis. Tai reiškia, kad galite nustatyti visuotinį tarpinį serverį kaip atsarginį variantą, bet konkretiems teikėjams ar ryšiams jį pakeisti kitu.

### Koks srautas perduodamas per tarpinį serverį

| Srauto tipas                      | Per tarpinį serverį? | Pastabos                                           |
| --------------------------------- | -------------------- | -------------------------------------------------- |
| Pokalbių užbaigimai               | ✅                   | Visos `/v1/chat/completions` užklausos             |
| Įterpiniai                        | ✅                   | `/v1/embeddings`                                   |
| Vaizdų generavimas                | ✅                   | `/v1/images/generations`                           |
| Garsas (TTS/STT)                  | ✅                   | `/v1/audio/*`                                      |
| OAuth prieigos rakto apsikeitimas | ✅                   | Išsprendžia `unsupported_country_region_territory` |
| Ryšio bandymai                    | ✅                   | Mygtukas „Tikrinti ryšį“ naudoja tarpinį serverį   |
| Prieigos rakto atnaujinimas       | ✅                   | Foninis OAuth atnaujinimas                         |
| Modelių sinchronizavimas          | ✅                   | Modelių sąrašo gavimas ir aptikimas                |

---

## Tarpinių serverių registras (CRUD)

Tarpinių serverių registras yra SQLite lentelė (`proxy_registry`), kurioje saugomi visi jūsų tarpiniai serveriai. Kiekvienas tarpinis serveris turi:

| Laukas     | Tipas              | Aprašymas                                                 |
| ---------- | ------------------ | --------------------------------------------------------- |
| `id`       | UUID               | Unikalus identifikatorius                                 |
| `name`     | Eilutė             | Žmogui suprantama žyma                                    |
| `type`     | Eilutė             | Protokolas: `http`, `https`, `socks5`                     |
| `host`     | Eilutė             | Tarpinio serverio pagrindinio kompiuterio vardas arba IP  |
| `port`     | Sveikasis skaičius | Prievado numeris                                          |
| `username` | Eilutė             | Autentifikavimo naudotojo vardas (saugykloje užšifruotas) |
| `password` | Eilutė             | Autentifikavimo slaptažodis (saugykloje užšifruotas)      |
| `region`   | Eilutė             | Geografinio regiono žyma                                  |
| `notes`    | Eilutė             | Laisvos formos pastabos                                   |
| `status`   | Eilutė             | `active` arba `inactive`                                  |
| `source`   | Eilutė             | `manual` arba `oneproxy`                                  |

### Tarpinio serverio kūrimas

**Naudojant valdymo skydelį:**

1. Eikite į **Nustatymai → Tarpinis serveris**
2. Spustelėkite **Pridėti tarpinį serverį**
3. Įveskite tipą, pagrindinio kompiuterio adresą, prievadą ir pasirinktinius autentifikavimo duomenis
4. Išsaugokite

**Naudojant API:**

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

### Tarpinio serverio atnaujinimas

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Pastaba:** prisijungimo duomenys išsaugomi, nebent aiškiai išsiunčiate netuščias pakaitines reikšmes. Išsiuntus tuščias `username` / `password` eilutes, išsaugotos reikšmės nebus pakeistos.

### Tarpinio serverio ištrynimas

```bash
# Nepavyksta, jei tarpinis serveris priskirtas kuriai nors sričiai
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Priverstinis ištrynimas (taip pat pašalinami priskyrimai)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Tarpinių serverių sąrašo gavimas

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Tarpinių serverių priskyrimas sritims

```bash
# Priskirti visuotinei sričiai
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Priskirti konkrečiam teikėjui
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Priskirti konkrečiam ryšiui / raktui
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Efektyviojo tarpinio serverio nustatymas

Patikrinkite, kuris tarpinis serveris būtų naudojamas konkrečiam ryšiui:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Grąžinamas nustatytas tarpinis serveris, jo lygis (`account`, `provider` arba `global`) ir šaltinis.

### Masinis priskyrimas

Priskirkite vieną tarpinį serverį keliems teikėjams ar ryšiams vienu metu:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importavimas / eksportavimas

Tarpiniai serveriai įtraukiami į **atsarginių kopijų kūrimo / atkūrimo** sistemą. Eksportuojant OmniRoute konfigūraciją:

1. Eikite į **Valdymo skydelis → Nustatymai → Atsarginė kopija**
2. Spustelėkite **Eksportuoti** — bus įtrauktas tarpinių serverių registras ir priskyrimai
3. Norėdami atkurti, spustelėkite **Importuoti** ir įkelkite atsarginės kopijos failą

Tarpinių serverių registras taip pat palaiko **įterpimą arba atnaujinimą pagal pagrindinį kompiuterį ir prievadą** — jei importuojate jau egzistuojantį tarpinį serverį (sutampa pagrindinis kompiuteris ir prievadas), jis atnaujinamas, užuot sukūrus dublikatą.

### Senesnės konfigūracijos perkėlimas

Jei tarpinius serverius sukonfigūravote senesnėje versijoje (iki registro), „OmniRoute“ juos automatiškai perkelia:

```
Senoji key_value saugykla → proxy_registry + proxy_assignments
```

Tai atliekama vieną kartą, pirmą kartą paleidus po atnaujinimo. Norėdami pakartoti perkėlimą, naudokite `migrateLegacyProxyConfigToRegistry({ force: true })`.

---

## 1proxy nemokamų tarpinių serverių prekyvietė

> 🆕 **Pridėjo [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (problema [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute integruojama su **[1proxy](https://1proxy-api.aitradepulse.com)** bendruomenės platforma ir suteikia prieigą prie **šimtų nemokamų, patikrintų tarpinių serverių** iš viso pasaulio. Tai puikiai tinka naudotojams, neturintiems nuosavos tarpinių serverių infrastruktūros.

### Kaip tai veikia

```
┌─────────────┐  Sinchronizuoti  ┌─────────────────┐   Keisti     ┌────────────┐
│  1proxy API │ ───────────────▶ │  proxy_registry  │ ───────────▶ │ Teikėjo API│
│  (išorinė)  │    iki 500       │  source=oneproxy │  pagal kokybę│            │
└─────────────┘ tarpinių serverių└─────────────────┘               └────────────┘
```

1. **Sinchronizavimas** — OmniRoute gauna patikrintus tarpinius serverius iš 1proxy API
2. **Saugojimas** — tarpiniai serveriai išsaugomi toje pačioje `proxy_registry` lentelėje su `source = 'oneproxy'`
3. **Filtravimas** — filtruokite pagal protokolą, šalį ir kokybės balą
4. **Keitimas** — pasirinkite geriausią tarpinį serverį naudodami kokybe pagrįstą, atsitiktinę arba nuoseklią strategiją
5. **Automatinis kokybės mažinimas** — nesėkmingai veikusio tarpinio serverio kokybės balas sumažinamas; nukritus žemiau ribos → jis pažymimas kaip neaktyvus

### Tarpinių serverių sinchronizavimas

**Per valdymo skydelį:**

1. Eikite į skirtuką **Settings → 1proxy**
2. Spustelėkite **„Sync Now“**
3. Peržiūrėkite statistiką: bendrą tarpinių serverių skaičių, aktyvių serverių skaičių, vidutinę kokybę ir suskirstymą pagal šalis

**Per API:**

```bash
# Pradėti sinchronizavimą
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Atsakymas:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Tarpinių serverių filtravimas

```bash
# Filtruoti pagal protokolą
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtruoti pagal šalį
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtruoti pagal mažiausią kokybės balą
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Sujungti filtrus
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Tarpinių serverių kokybės balai

Kiekvienas 1proxy tarpinis serveris turi metaduomenis:

| Laukas          | Aprašymas                                           |
| --------------- | --------------------------------------------------- |
| `qualityScore`  | 1proxy patvirtinimo įvertinimas nuo 0 iki 100       |
| `latencyMs`     | Išmatuota tinklo delsa                              |
| `anonymity`     | `transparent`, `anonymous` arba `elite`             |
| `googleAccess`  | Ar tarpinis serveris gali pasiekti Google paslaugas |
| `countryCode`   | Dviejų raidžių ISO šalies kodas                     |
| `lastValidated` | Paskutinio patvirtinimo laiko žyma                  |

Kokybės balai koreguojami dinamiškai:

- **Nesėkmingos užklausos** sumažina balą 10 taškų
- **Balui nukritus iki ≤10** → tarpinis serveris pažymimas kaip `inactive`
- Neaktyvūs tarpiniai serveriai neįtraukiami į keitimą

### Keitimo strategijos

```bash
# Keisti pagal kokybę (pirmiausia geriausias tarpinis serveris) — numatytoji strategija
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Atsitiktinis keitimas
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Nuoseklus keitimas (pirmiausia seniausiai patikrintas)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Grandinės pertraukiklis

1proxy sinchronizavimas turi integruotą grandinės pertraukiklį:

- Po **5 iš eilės nepavykusių sinchronizavimų** tolesni sinchronizavimo bandymai blokuojami
- Nustatykite iš naujo naudodami `resetOneproxyCircuitBreaker()` arba paleiskite serverį iš naujo
- Sinchronizavimo būsena pasiekiama adresu `GET /api/settings/oneproxy?action=status`

### 1proxy tarpinių serverių išvalymas

```bash
# Ištrinti vieną 1proxy tarpinį serverį
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Išvalyti VISUS 1proxy tarpinius serverius (rankiniu būdu pridėti tarpiniai serveriai nekeičiami)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Apsauga nuo aptikimo ir maskavimas

OmniRoute ne tik nukreipia srautą per tarpinį serverį — jis užtikrina, kad srautas atrodytų teisėtas:

### TLS kontrolinio atspaudo klastojimas

Naudoja `wreq-js`, kad sugeneruotų naršyklėms būdingus TLS kontrolinius atspaudus ir apeitų robotų aptikimo sistemas, kurios pažymi ne naršyklių TLS rankos paspaudimus.

### CLI kontrolinio atspaudo atitikimas

**CLI kontrolinio atspaudo jungiklis** (`Nustatymai → Saugumas`) pertvarko HTTP antraštes ir JSON turinio laukus, kad jie tiksliai atitiktų vietinių CLI vykdomųjų failų (Claude Code, Codex ir kt.) parašą. Tai veikia **kartu su** tarpiniu serveriu:

```
Jūsų IP (užblokuotas) → Tarpinio serverio IP (JAV) → Teikėjo API
                         + TLS klastojimas
                         + CLI kontrolinis atspaudas
```

Vienu metu gaunate ir **IP maskavimą**, ir **užklausų autentiškumą**.

### Tarpinio serverio IP išsaugojimas

Spalvomis pažymėti ženkleliai valdymo skydelyje rodo, kuris tarpinio serverio lygis yra aktyvus:

| Ženklelis | Lygis      | Reikšmė                                                   |
| --------- | ---------- | --------------------------------------------------------- |
| 🟢        | Visuotinis | Visas srautas siunčiamas per šį tarpinį serverį           |
| 🟡        | Teikėjo    | Per tarpinį serverį siunčiamas tik šio teikėjo srautas    |
| 🔵        | Ryšio      | Šis konkretus raktas / paskyra naudoja šį tarpinį serverį |

Ženklelyje taip pat rodomas nustatytas tarpinio serverio IP, kad būtų galima jį patikrinti.

---

## Išorinio tarpinio serverio režimai

Teikėjams, naudojantiems CLIProxyAPI modelį, OmniRoute palaiko tris išorinio tarpinio serverio režimus:

| Režimas       | Aprašymas                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| `native`      | OmniRoute tiesiogiai tvarko maršrutizavimą per tarpinį serverį (numatytasis) |
| `cliproxyapi` | Perduoda užduotį išoriniam CLIProxyAPI egzemplioriui                         |
| `fallback`    | Pirmiausia bando savąjį režimą, tada pereina prie CLIProxyAPI                |

Konfigūruokite kiekvienam teikėjui atskirai:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Valdymo skydelio naudotojo sąsaja

### Nustatymai → Tarpinio serverio kortelė

- **Visuotinio tarpinio serverio** konfigūracija (nustatoma vieną kartą visam srautui)
- **Atskirų teikėjų tarpinio serverio** perrašos
- **Atskirų ryšių tarpinio serverio** priskyrimai
- **Ryšio testas** per sukonfigūruotą tarpinį serverį
- **Spalvomis pažymėti ženkleliai**, rodantys aktyvų tarpinio serverio lygį

### Nustatymai → 1proxy kortelė

- Mygtukas **Sinchronizuoti dabar**, skirtas nemokamiems tarpiniams serveriams gauti
- **Statistikos kortelės**: iš viso, aktyvūs, vidutinė kokybė, paskutinis sinchronizavimas
- **Filtrai**: protokolas, šalies kodas, minimali kokybė
- **Tarpinių serverių lentelė** su pagrindiniu kompiuteriu, protokolu, šalimi, kokybės įverčiu, delsa, anonimiškumu ir prieiga prie Google
- **Sinchronizavimo būsenos** skydelis su sėkmingų / nesėkmingų bandymų stebėjimu ir iš eilės įvykusių nesėkmių skaičiumi
- **Išvalyti viską**, kad būtų pašalinti visi 1proxy įrašai

---

## API žinynas

### Tarpinio serverio nustatymų API

| Metodas  | Galinis taškas                                 | Aprašymas                                  |
| -------- | ---------------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/proxy`                          | Gauti visą tarpinio serverio konfigūraciją |
| `GET`    | `/api/settings/proxy?level=global`             | Gauti visuotinį tarpinį serverį            |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Gauti teikėjo tarpinį serverį              |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Nustatyti galiojantį tarpinį serverį       |
| `PUT`    | `/api/settings/proxy`                          | Atnaujinti tarpinio serverio konfigūraciją |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Pašalinti nurodyto lygio tarpinį serverį   |

### Tarpinių serverių registro API

| Metodas  | Galinis taškas                                    | Aprašymas                              |
| -------- | ------------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Pateikti visų tarpinių serverių sąrašą |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Gauti tarpinį serverį pagal ID         |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Gauti tarpinio serverio priskyrimus    |
| `POST`   | `/api/v1/management/proxies`                      | Sukurti tarpinį serverį                |
| `PATCH`  | `/api/v1/management/proxies`                      | Atnaujinti tarpinį serverį             |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Ištrinti tarpinį serverį               |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Priverstinai ištrinti                  |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Priskirti masiškai                     |
| `GET`    | `/api/v1/management/proxies/assignments`          | Pateikti priskyrimų sąrašą             |
| `GET`    | `/api/v1/management/proxies/health`               | Tarpinių serverių būklės statistika    |

### Tunelių API

Informacijos apie OmniRoute egzemplioriaus paskelbimą viešajame internete (naudojant Cloudflare/ngrok/Tailscale), užuot nukreipus išeinantį srautą per tarpinį serverį, rasite [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). Tunelių REST API yra pasiekiama adresu `/api/tunnels/{cloudflared,ngrok,tailscale}/*` ir nepriklauso nuo pirmiau aprašytos išeinančių tarpinių serverių grandinės.

### 1proxy API

| Metodas  | Galinis taškas                         | Aprašymas                                  |
| -------- | -------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | Pateikti 1proxy tarpinių serverių sąrašą   |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Gauti statistiką ir sinchronizavimo būseną |
| `GET`    | `/api/settings/oneproxy?action=status` | Gauti tik sinchronizavimo būseną           |
| `POST`   | `/api/settings/oneproxy`               | Suaktyvinti sinchronizavimą                |
| `POST`   | `/api/settings/oneproxy/rotate`        | Pereiti prie kito tarpinio serverio        |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Ištrinti vieną                             |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Išvalyti viską                             |

### Išorinio tarpinio serverio API

| Metodas  | Galinis taškas                    | Aprašymas                                          |
| -------- | --------------------------------- | -------------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Gauti išorinio tarpinio serverio konfigūraciją     |
| `PUT`    | `/api/upstream-proxy/:providerId` | Nustatyti išorinio tarpinio serverio režimą        |
| `DELETE` | `/api/upstream-proxy/:providerId` | Pašalinti išorinio tarpinio serverio konfigūraciją |

---

## Aplinkos kintamieji

| Kintamasis            | Numatytoji reikšmė | Aprašymas                                                                                       |
| --------------------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`             | Įjungti SOCKS5 tarpinio serverio palaikymą (numatytoji reikšmė `.env.example` faile yra `true`) |

---

## Trikčių šalinimas

### „SOCKS5 proxy is disabled“

`.env` faile nustatykite `ENABLE_SOCKS5_PROXY=true` ir paleiskite iš naujo.

### „socket hang up“ klaidos naudojant tarpinį serverį

Tai įprasta naudojant pigius tarpinius serverius, kurie nutraukia neaktyvius ryšius. OmniRoute tai jau apdoroja:

- Išjungia nuolatinį ryšį su tarpiniais serveriais (`keepAliveTimeout: 1`)
- Išjungia konvejerinį užklausų siuntimą (`pipelining: 0`)
- Kaupia dispečerines podėlyje, kad būtų išvengta pakartotinių ryšio užmezgimų

Jei problema išlieka, išbandykite kitą tarpinį serverį arba naudokite 1proxy rotacijos funkciją.

### „unsupported_country_region_territory“ OAuth metu

Įsitikinkite, kad tarpinis serveris sukonfigūruotas **prieš** pradedant OAuth eigą. OmniRoute nukreipia OAuth prieigos raktų apsikeitimą per sukonfigūruotą tarpinį serverį. Pirmiausia nustatykite visuotinį arba teikėjo lygmens tarpinį serverį, tada prisijunkite.

### Tarpinis serveris nenaudojamas

Patikrinkite parinkimo tvarką:

1. Patikrinkite naudodami `GET /api/settings/proxy?resolve=your-connection-id`
2. Patikrinkite, ar tarpinio serverio `status` yra `active` (o ne `inactive`)
3. Įsitikinkite, kad tarpinio serverio priskyrimo aprėptis atitinka jūsų ryšį

### Nepavyksta sinchronizuoti 1proxy

Patikrinkite sinchronizavimo būseną:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Jei `consecutiveFailures >= 5`, suveikė grandinės pertraukiklis. Paleiskite serverį iš naujo, kad nustatytumėte būseną iš naujo, arba palaukite rankinio nustatymo iš naujo.

---

## Duomenų bazės schema

### Lentelė `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' arba 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (tik 1proxy)
  latency_ms INTEGER,                        -- milisekundės (tik 1proxy)
  anonymity TEXT,                            -- skaidrus / anoniminis / elitinis
  google_access INTEGER DEFAULT 0,           -- ar gali pasiekti Google? (1proxy)
  last_validated TEXT,                       -- ISO laiko žyma (1proxy)
  country_code TEXT,                         -- ISO 2 raidžių kodas (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Lentelė `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- teikėjo ID, ryšio ID arba kombinacijos ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Tarpinių serverių būklės tikrinimas (v3.8.16+)

OmniRoute **greito tarpinio serverio gedimo aptikimo** mechanizmas (`src/lib/proxyHealth.ts`) greitai patikrindamas TCP ryšį aptinka neveikiančius tarpinius serverius per <2 s, tada **išsaugo rezultatą podėlyje**, kad būtų išvengta kiekvienos užklausos papildomų sąnaudų.

### Kaip tai veikia

```
Užklausa ──▶ ProxyHealthCache.get(url)
             │
             ├─ Podėlio įrašas rastas ir šviežias?  ──▶ grąžinti podėlyje saugomą būseną
             │
             └─ Podėlio įrašo nėra / jis pasenęs?  ──▶ TCP ryšys su host:port
                                          (skirtasis laikas: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ saugoti podėlyje HEALTH_CACHE_TTL_MS laiką
                                          ──▶ grąžinti rezultatą
```

Be šio mechanizmo neveikiantis tarpinis serveris blokuotų kiekvieną užklausą visą `PROXY_TIMEOUT_MS` laiką (numatytoji reikšmė – 30 s), kol galiausiai įvyktų klaida.

### Reguliuojami aplinkos kintamieji

| Kintamasis                   | Numatytoji reikšmė | Paskirtis                                             |
| ---------------------------- | ------------------ | ----------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`             | TCP ryšio skirtasis laikas kiekvienai būklės patikrai |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`            | Kiek laiko būklės rezultatas saugomas podėlyje        |

**Rekomenduojamos reikšmės:**

| Scenarijus                             | Greito gedimo aptikimo skirtasis laikas | Podėlio TTL | Pagrindimas                                                                                                   |
| -------------------------------------- | --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| Didelio pralaidumo API tinklų sietuvas | 1500ms                                  | 60000ms     | Agresyvus greitas gedimo aptikimas, ilgesnis saugojimas podėlyje patikrų skaičiui sumažinti                   |
| Geografiškai paskirstyti mazgai        | 3000ms                                  | 15000ms     | Lėtesniems tinklams reikia daugiau laiko; trumpesnis saugojimas podėlyje greitam perjungimui sutrikimo atveju |
| Kūrimas / testavimas                   | 1000ms                                  | 10000ms     | Greita iteracija naudojant vietinius tarpinius serverius                                                      |
| Slaptumas / aptikimo vengimas          | 2500ms                                  | 45000ms     | Vengiama dažno tikrinimo, galinčio suaktyvinti dažnio apribojimus                                             |

### Tarpinio serverio būklės tikrinimas

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Priverstinai iš naujo patikrinti konkretų tarpinį serverį
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Žyma `stale` yra `true`, kai podėlio įrašas galioja ilgiau nei `HEALTH_CACHE_TTL_MS`, todėl kita užklausa inicijuos naują patikrą.

### Numatytosios reikšmės pagal tarpinio serverio tipą

Būklės patikra naudoja tinkamas numatytąsias reikšmes pagal URL schemą:

| Schema                     | Numatytasis prievadas |
| -------------------------- | --------------------- |
| `http://`                  | 8080                  |
| `https://`                 | 443                   |
| `socks5://` / `socks5h://` | 1080                  |

URL nurodyti pasirinktiniai prievadai (`http://host:9999`) visada turi pirmenybę prieš numatytąjį schemos prievadą.

---

## Tarpinių serverių analizė ir stebimumas

OmniRoute seka kiekvieno tarpinio serverio naudojimą, kad operatoriai galėtų diagnozuoti maršruto parinkimo dėsningumus, delsos šuolius ir pasikartojančias triktis.

### Kas stebima

Kiekvienai užklausai, siunčiamai per sukonfigūruotą tarpinį serverį, OmniRoute registruoja:

| Metrika      | Aprašymas                                                                     |
| ------------ | ----------------------------------------------------------------------------- |
| `proxy_url`  | Visas tarpinio serverio URL (autentifikavimo duomenys paslėpti)               |
| `provider`   | Išorinio paslaugų teikėjo ID (openai, anthropic ir kt.)                       |
| `latency_ms` | Bendra pirmyn ir atgal trukmė, įskaitant ryšio su tarpiniu serveriu užmezgimą |
| `connect_ms` | Tik TCP ryšio užmezgimo trukmė                                                |
| `status`     | Išorinio serverio grąžintas HTTP būsenos kodas                                |
| `error`      | Klaidos klasė, jei užklausa nepavyko                                          |
| `timestamp`  | ISO 8601 UTC                                                                  |

### Prieiga prie duomenų

```bash
# Naujausi tarpinių serverių įvykiai
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Tikrasis galinis taškas yra `/api/usage/proxy-logs` (žr. `src/app/api/usage/proxy-logs/route.ts`). Šis galinis taškas palaiko:

- `GET /api/usage/proxy-logs` — gauti tarpinių serverių žurnalus
- `DELETE /api/usage/proxy-logs` — išvalyti visus tarpinių serverių žurnalus

Jei reikia, agreguotą statistiką galima gauti tiesiogiai iš `proxy_logs` lentelės naudojant SQL. Valdymo skydelio naudotojo sąsajoje gali būti pateikiami agreguoti rodiniai.

### Dažniausi scenarijai

**Aptikti nestabilų tarpinį serverį** (pakaitomis veikia ir neveikia):

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

**Rasti lėtus tarpinius serverius** (p95 delsa > 2 s):

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

## Rotacijos strategijos sprendimų medis

Kai vienai taikymo sričiai priskirti keli tarpiniai serveriai, OmniRoute naudoja **rotacijos strategiją**, kad parinktų, kurį iš jų naudoti kiekvienai užklausai. Strategija konfigūruojama taikymo srities lygmeniu (visuotiniu, kiekvieno paslaugų teikėjo, kiekvienos paskyros arba kiekvieno derinio).

### Galimos strategijos

| Strategija             | Kada naudoti                                                       | Kompromisas                                                                                                  |
| ---------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `quality` (numatytoji) | Produkcinėje aplinkoje su skirtingos kokybės tarpiniais serveriais | Pirmenybė teikiama gerai įvertintiems tarpiniams serveriams; prasčiau įvertinti gali būti beveik nenaudojami |
| `random`               | Apkrovai paskirstyti, privatumui užtikrinti                        | Tolygus paskirstymas; nepaisoma kokybės signalų                                                              |
| `sequential`           | Derinimui, deterministiniam testavimui                             | Tarpiniai serveriai cikliškai naudojami iš eilės; veikimą lengva suprasti                                    |

### Sprendimų medis

```
                    Ar turite savo tarpinių serverių kokybės įverčius?
                    │
        ┌───────────┴───────────┐
        │                       │
       TAIP                    NE
        │                       │
   Ar visų tarpinių            │
   serverių kokybė             │
   yra apytiksliai vienoda?     │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  TAIP      NE              Naudokite
   │         │              `random`
   │         │              (tolygus paskirstymas
   │         │              laikui bėgant sukaupia
   │         │              kokybės duomenų)
   │         │
   │    Naudokite `quality`
   │    (geriausiai tinka
   │    skirtingai kokybei)
   │
Naudokite `random`
(paskirstykite apkrovą
tolygiai)
```

## Automatinis neveikiančių jūsų pačių tarpinių serverių pašalinimas

„1proxy“ prekyvietės telkinys jau pats automatiškai sumažina neveikiančių tarpinių serverių prioritetą (žr.
[Tarpinių serverių kokybės įverčiai](#proxy-quality-scores)). Jūsų į registrą įtrauktiems
tarpiniams serveriams foninė būklės planavimo priemonė
(`src/lib/proxyHealth/scheduler.ts`) suteikia tokią pačią galimybę „automatiškai pašalinti
neveikiantį narį iš grandinės“, nieko neištrinant:

```bash
# .env — laikinai išjungti tarpinį serverį po 3 iš eilės nesėkmingų patikrų ir
# automatiškai vėl jį įjungti, kai tik jis vėl pradeda atsakyti į patikras.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Kaip tai veikia kelių tarpinių serverių grandinėje:

1. Planavimo priemonė tikrina kiekvieną užregistruotą tarpinį serverį kas `PROXY_HEALTH_INTERVAL_MS`
   (numatytoji reikšmė – 10 min.; mažiausia – 1 min.).
2. Po `PROXY_AUTO_REMOVE_AFTER` iš eilės įvykusių **vienareikšmių** nesėkmių (tikro
   ryšio sutrikimo – skirtasis laikas arba pačios patikros paskirties vietos 5xx atsakas niekada neįskaičiuojamas, žr.
   [Tarpinių serverių būklės tikrinimas](#proxy-health-checking-v3816)) tarpinio serverio `status`
   nustatoma į `dead`.
3. `dead` yra viena iš būsenų, kurias atmeta telkinio / rotacijos parinkimo naudojamas
   veikiančių būsenų filtras, todėl srities rotacija (ciklinė / atsitiktinė / susietoji /
   pagal delsą – žr. [Rotacijos strategijos sprendimų medis](#rotation-strategy-decision-tree))
   iš karto nustoja priskirti tą tarpinį serverį naujoms užklausoms. Tai neturi įtakos jokiems kitiems
   telkinio tarpiniams serveriams, o visas telkinys niekada nepastebimai nepersijungia į tiesioginį
   ryšį – žr. [4 lygių tarpinių serverių sistema](#4-level-proxy-system) saugaus blokavimo
   apsaugą.
4. Planavimo priemonė ir toliau tuo pačiu intervalu tikrina `dead` būsenos tarpinius serverius. Kita
   sėkminga patikra pakeičia `status` atgal į `active`, ir tarpinis serveris vėl įtraukiamas į rotaciją –
   jo nereikia iš naujo pridėti rankiniu būdu.

Tai sąmoningai yra **pasirenkama ir neardomoji** funkcija: pagal numatytąsias nuostatas planavimo priemonė tik
skaičiuoja ir registruoja nesėkmes žurnale (žr. politiką C faile `decision.ts`), o `PROXY_AUTO_DISABLE`
niekada neištrina eilutės – tam skirtas atskiras, agresyvesnis
`PROXY_AUTO_REMOVE` parametras. Jei abiejų reikšmė nustatyta į `true`, pirmenybę
turi `PROXY_AUTO_REMOVE` (tarpinio serverio, kuris netrukus bus ištrintas, nėra prasmės prieš tai laikinai išjungti). Visą
kintamųjų sąrašą rasite [Aplinkos konfigūracijos](../reference/ENVIRONMENT.md)
žinyne.

---

> 📖 **Susijusi dokumentacija:**
>
> - [Naudotojo vadovas](../guides/USER_GUIDE.md) — Bendroji sąranka ir konfigūracija
> - [API žinynas](../reference/API_REFERENCE.md) — Išsami API dokumentacija
> - [Aplinkos konfigūracija](../reference/ENVIRONMENT.md) — Visi aplinkos kintamieji
