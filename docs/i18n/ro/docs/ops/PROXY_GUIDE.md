# 🌐 OmniRoute Proxy Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Ocoliți blocările geografice, protejați-vă identitatea și direcționați traficul AI prin orice proxy — fără nicio complexitate de configurare.**

OmniRoute include un sistem complet de gestionare a proxy-urilor, care vă permite să direcționați traficul către furnizorii AI din amonte prin proxy-uri HTTP, HTTPS sau SOCKS5. Indiferent dacă vă aflați într-o regiune blocată, aveți nevoie de rotația adreselor IP sau doriți o amprentare discretă — acest ghid acoperă totul.

---

## Cuprins

- [De ce să utilizați proxy-uri?](#why-use-proxies)
- [Prezentare generală a arhitecturii](#architecture-overview)
- [Sistem proxy pe 4 niveluri](#4-level-proxy-system)
- [Registru de proxy-uri (CRUD)](#proxy-registry-crud)
- [Piața gratuită 1proxy](#1proxy-free-proxy-marketplace)
- [Rotația proxy-urilor](#proxy-rotation)
- [Evitarea detectării și operarea discretă](#anti-detection--stealth)
- [Moduri pentru proxy-ul din amonte](#upstream-proxy-modes)
- [Interfața tabloului de bord](#dashboard-ui)
- [Referință API](#api-reference)
- [Variabile de mediu](#environment-variables)
- [Depanare](#troubleshooting)

---

## De ce să utilizați proxy-uri?

Mulți furnizori AI restricționează accesul în funcție de regiunea geografică. Dezvoltatorii din **Rusia, China, Iran, Cuba, Turcia** și din alte țări întâmpină erori precum:

```
unsupported_country_region_territory
```

Chiar și în afara regiunilor blocate, proxy-urile sunt utile pentru:

| Caz de utilizare         | Descriere                                                                   |
| ------------------------ | --------------------------------------------------------------------------- |
| **Ocolire geografică**   | Accesați OpenAI, Anthropic, Codex și Copilot din țările blocate             |
| **Rotația adreselor IP** | Distribuiți solicitările între mai multe adrese IP pentru a evita limitarea |
| **Confidențialitate**    | Ascundeți adresa IP reală față de furnizorii din amonte                     |
| **Conformitate**         | Direcționați traficul prin jurisdicții specifice                            |
| **Testare**              | Simulați solicitări din regiuni diferite                                    |

---

## Prezentare generală a arhitecturii

```
┌───────────────────────────────────────────────────────────────┐
│                       Server OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registru de │    │ Dispecer de  │    │ Fetch (undici)   │  │
│  │ proxy-uri   │───▶│ proxy-uri    │───▶│                  │  │
│  │ (SQLite)    │    │ (în cache)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sincronizare│                        │ API-ul furnizoru-│  │
│  │ 1proxy      │                        │ lui din amonte   │  │
│  │ (fond grat.)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Componente principale

| Componentă                | Fișier                                       | Rol                                                                        |
| ------------------------- | -------------------------------------------- | -------------------------------------------------------------------------- |
| **Registru de proxy-uri** | `src/lib/db/proxies.ts`                      | Operații CRUD pentru intrările proxy și atribuirile domeniului de aplicare |
| **Dispecer de proxy-uri** | `open-sse/utils/proxyDispatcher.ts`          | Creează dispeceri ProxyAgent/SOCKS pentru `undici`, cu memorare în cache   |
| **Fetch prin proxy**      | `open-sse/utils/proxyFetch.ts`               | Încapsulează `fetch()` și injectează dispecerul proxy                      |
| **Rută de setări**        | `src/app/api/settings/proxy/route.ts`        | API moștenit pentru configurarea proxy-ului (GET/PUT/DELETE)               |
| **Rută de administrare**  | `src/app/api/v1/management/proxies/route.ts` | API CRUD pentru registru (GET/POST/PATCH/DELETE)                           |
| **Bază de date 1proxy**   | `src/lib/db/oneproxy.ts`                     | Persistență pentru piața de proxy-uri gratuite                             |

---

## Sistem proxy pe 4 niveluri

OmniRoute acceptă configurarea proxy-urilor în **patru domenii independente**, evaluate în ordinea priorității:

```
Ordinea de evaluare a priorității (de la cea mai mare → la cea mai mică):

  1. 🔵 Proxy de cont/conexiune  →  per cheie API / conexiune OAuth
  2. 🟡 Proxy de furnizor        →  per furnizor (de ex., tot traficul OpenAI)
  3. 🟠 Proxy de combinație      →  per combinație/configurație de rutare
  4. 🟢 Proxy global             →  tot traficul, toți furnizorii
```

### Cum funcționează evaluarea

Când OmniRoute trimite o solicitare către un furnizor din amonte, apelează `resolveProxyForConnectionFromRegistry()`, care verifică fiecare nivel în ordine:

1. **La nivel de cont** — Există un proxy atribuit acestui ID de conexiune?
2. **La nivel de furnizor** — Există un proxy atribuit acestui furnizor (de ex., `openai`)?
3. **La nivel global** — Există un proxy global configurat?
4. **Fără proxy** — Conexiune directă la furnizor.

Prima potrivire are prioritate. Aceasta înseamnă că puteți configura un proxy global ca soluție de rezervă, dar îl puteți suprascrie pentru anumiți furnizori sau anumite conexiuni.

### Ce trafic este direcționat prin proxy

| Tip de trafic             | Prin proxy? | Observații                                      |
| ------------------------- | ----------- | ----------------------------------------------- |
| Completări de chat        | ✅          | Toate solicitările `/v1/chat/completions`       |
| Înglobări                 | ✅          | `/v1/embeddings`                                |
| Generare de imagini       | ✅          | `/v1/images/generations`                        |
| Audio (TTS/STT)           | ✅          | `/v1/audio/*`                                   |
| Schimb de token OAuth     | ✅          | Rezolvă `unsupported_country_region_territory`  |
| Teste de conexiune        | ✅          | Butonul „Testare conexiune” utilizează proxy-ul |
| Reîmprospătarea tokenului | ✅          | Reînnoire OAuth în fundal                       |
| Sincronizarea modelelor   | ✅          | Listarea și descoperirea modelelor              |

---

## Registrul de proxy-uri (CRUD)

Registrul de proxy-uri este un tabel SQLite (`proxy_registry`) care stochează toate proxy-urile dvs. Fiecare proxy are:

| Câmp       | Tip          | Descriere                                                     |
| ---------- | ------------ | ------------------------------------------------------------- |
| `id`       | UUID         | Identificator unic                                            |
| `name`     | Șir          | Etichetă ușor de citit                                        |
| `type`     | Șir          | Protocol: `http`, `https`, `socks5`                           |
| `host`     | Șir          | Numele de gazdă sau IP-ul proxy-ului                          |
| `port`     | Număr întreg | Numărul portului                                              |
| `username` | Șir          | Numele de utilizator pentru autentificare (criptat în repaus) |
| `password` | Șir          | Parola pentru autentificare (criptată în repaus)              |
| `region`   | Șir          | Eticheta regiunii geografice                                  |
| `notes`    | Șir          | Note în format liber                                          |
| `status`   | Șir          | `active` sau `inactive`                                       |
| `source`   | Șir          | `manual` sau `oneproxy`                                       |

### Crearea unui proxy

**Prin panoul de control:**

1. Accesați **Setări → Proxy**
2. Faceți clic pe **Adăugare proxy**
3. Completați tipul, gazda, portul și, opțional, acreditările de autentificare
4. Salvați

**Prin API:**

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

### Actualizarea unui proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Notă:** Acreditările sunt păstrate dacă nu trimiteți în mod explicit valori de înlocuire care nu sunt goale. Trimiterea unor șiruri goale pentru `username`/`password` va păstra valorile stocate.

### Ștergerea unui proxy

```bash
# Eșuează dacă proxy-ul este atribuit oricărui domeniu
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Ștergere forțată (elimină și atribuirile)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Listarea proxy-urilor

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Atribuirea proxy-urilor domeniilor

```bash
# Atribuire domeniului global
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Atribuire unui anumit furnizor
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Atribuire unei anumite conexiuni/chei
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Determinarea proxy-ului efectiv

Verificați ce proxy ar fi utilizat pentru o anumită conexiune:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Returnează proxy-ul determinat împreună cu nivelul său (`account`, `provider` sau `global`) și sursa.

### Atribuire în bloc

Atribuiți simultan un proxy mai multor furnizori sau conexiuni:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/Export

Proxy-urile sunt incluse în sistemul de **Copiere de rezervă/Restaurare**. Când exportați configurația OmniRoute:

1. Accesați **Panou de control → Setări → Copie de rezervă**
2. Faceți clic pe **Export** — registrul de proxy-uri și atribuirile sunt incluse
3. Pentru restaurare, faceți clic pe **Import** și încărcați fișierul copiei de rezervă

Registrul de proxy-uri acceptă și operațiunea **upsert după gazdă+port** — dacă importați un proxy care există deja (aceeași gazdă și același port), acesta este actualizat în loc să fie creat un duplicat.

### Migrare din versiunea anterioară

Dacă ați configurat proxy-uri într-o versiune mai veche (anterioară registrului), OmniRoute le migrează automat:

```
Stocare key_value moștenită → proxy_registry + proxy_assignments
```

Acest lucru se întâmplă o singură dată, la prima pornire după actualizare. Utilizați `migrateLegacyProxyConfigToRegistry({ force: true })` pentru a rula din nou migrarea.

---

## Piața de proxy-uri gratuite 1proxy

> 🆕 **Contribuție de la [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Problemă [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute se integrează cu platforma comunitară **[1proxy](https://1proxy-api.aitradepulse.com)** pentru a oferi acces la **sute de proxy-uri gratuite și validate** din întreaga lume. Această opțiune este ideală pentru utilizatorii care nu dispun de propria infrastructură de proxy-uri.

### Cum funcționează

```
┌─────────────┐  Sincronizare  ┌─────────────────┐    Rotație    ┌──────────┐
│ API 1proxy  │ ─────────────▶ │  proxy_registry  │ ────────────▶ │ Furnizor │
│  (extern)   │ până la 500 de │  source=oneproxy │ după calitate │   API    │
└─────────────┘   proxy-uri    └─────────────────┘               └──────────┘
```

1. **Sincronizare** — OmniRoute preia proxy-uri validate din API-ul 1proxy
2. **Stocare** — Proxy-urile sunt salvate în același tabel `proxy_registry`, cu `source = 'oneproxy'`
3. **Filtrare** — Filtrați după protocol, țară și scor de calitate
4. **Rotație** — Selectați cel mai bun proxy folosind strategii bazate pe calitate, selecție aleatorie sau secvențială
5. **Degradare automată** — Proxy-urilor care eșuează li se reduce scorul de calitate; sub prag → sunt marcate ca inactive

### Sincronizarea proxy-urilor

**Prin panoul de control:**

1. Accesați fila **Setări → 1proxy**
2. Faceți clic pe **„Sincronizați acum”**
3. Vizualizați statisticile: numărul total de proxy-uri, numărul celor active, calitatea medie și distribuția pe țări

**Prin API:**

```bash
# Declanșează sincronizarea
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Răspuns:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrarea proxy-urilor

```bash
# Filtrează după protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtrează după țară
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtrează după scorul minim de calitate
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combină filtrele
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Scorurile de calitate ale proxy-urilor

Fiecare proxy 1proxy include metadate:

| Câmp            | Descriere                                              |
| --------------- | ------------------------------------------------------ |
| `qualityScore`  | Evaluare între 0 și 100 rezultată din validarea 1proxy |
| `latencyMs`     | Latența de rețea măsurată                              |
| `anonymity`     | `transparent`, `anonymous` sau `elite`                 |
| `googleAccess`  | Indică dacă proxy-ul poate accesa serviciile Google    |
| `countryCode`   | Codul ISO al țării, format din două litere             |
| `lastValidated` | Marcajul temporal al ultimei validări                  |

Scorurile de calitate sunt ajustate dinamic:

- **Solicitările eșuate** reduc scorul cu 10 puncte
- **Scorul scade la ≤10** → proxy-ul este marcat ca `inactive`
- Proxy-urile inactive sunt excluse din rotație

### Strategii de rotație

```bash
# Rotație după calitate (mai întâi cel mai bun proxy) — implicit
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rotație aleatorie
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Secvențială (mai întâi cel validat cel mai demult)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Întrerupător de circuit

Sincronizarea 1proxy dispune de un întrerupător de circuit încorporat:

- După **5 eșecuri consecutive de sincronizare**, încercările ulterioare de sincronizare sunt blocate
- Resetați-l cu: `resetOneproxyCircuitBreaker()` sau reporniți serverul
- Starea sincronizării este disponibilă la `GET /api/settings/oneproxy?action=status`

### Ștergerea proxy-urilor 1proxy

```bash
# Șterge un singur proxy 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Șterge TOATE proxy-urile 1proxy (proxy-urile manuale nu sunt afectate)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-Detectare și Discreție

OmniRoute nu doar direcționează traficul printr-un proxy — face traficul să pară legitim:

### Falsificarea amprentei TLS

Folosește `wreq-js` pentru a genera amprente TLS similare celor ale browserelor, evitând sistemele de detectare a boților care semnalează negocierile TLS ce nu provin de la browsere.

### Potrivirea amprentei CLI

**Comutatorul pentru amprenta CLI** (`Settings → Security`) reordonează anteturile HTTP și câmpurile din corpul JSON pentru a se potrivi exact cu semnătura binarelor CLI native (Claude Code, Codex etc.). Acesta funcționează **suplimentar față de** proxy:

```
IP-ul dvs. (blocat) → IP proxy (SUA) → API-ul furnizorului
                       + falsificare TLS
                       + amprentă CLI
```

Obțineți simultan atât **mascarea adresei IP**, cât și **autenticitatea solicitării**.

### Păstrarea IP-ului proxy

Insignele codificate prin culori din panoul de control arată ce nivel de proxy este activ:

| Insignă | Nivel     | Semnificație                                         |
| ------- | --------- | ---------------------------------------------------- |
| 🟢      | Global    | Întregul trafic trece prin acest proxy               |
| 🟡      | Furnizor  | Doar traficul acestui furnizor trece prin proxy      |
| 🔵      | Conexiune | Această cheie/acest cont specific folosește proxy-ul |

Insigna afișează și adresa IP rezolvată a proxy-ului, pentru verificare.

---

## Moduri proxy în amonte

Pentru furnizorii care folosesc modelul CLIProxyAPI, OmniRoute acceptă trei moduri proxy în amonte:

| Mod           | Descriere                                                   |
| ------------- | ----------------------------------------------------------- |
| `native`      | OmniRoute gestionează direct rutarea prin proxy (implicit)  |
| `cliproxyapi` | Delegă către o instanță CLIProxyAPI externă                 |
| `fallback`    | Încearcă mai întâi modul nativ, apoi recurge la CLIProxyAPI |

Configurați separat pentru fiecare furnizor:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interfața panoului de control

### Setări → Fila Proxy

- Configurarea **proxy-ului global** (se configurează o singură dată pentru întregul trafic)
- Suprascrieri ale proxy-ului **pentru fiecare furnizor**
- Atribuiri de proxy **pentru fiecare conexiune**
- **Testarea conexiunii** prin proxy-ul configurat
- **Insigne codificate prin culori** care indică nivelul activ al proxy-ului

### Setări → Fila 1proxy

- Butonul **Sincronizează acum** pentru preluarea proxy-urilor gratuite
- **Carduri cu statistici**: Total, Active, Calitate medie, Ultima sincronizare
- **Filtre**: Protocol, Codul țării, Calitate minimă
- **Tabel de proxy-uri** cu gazda, protocolul, țara, scorul de calitate, latența, anonimatul și accesul la Google
- Panou pentru **starea sincronizării**, cu monitorizarea reușitelor/eșecurilor și numărul de eșecuri consecutive
- **Șterge tot** pentru eliminarea tuturor intrărilor 1proxy

---

## Referință API

### API-ul setărilor proxy

| Metodă   | Punct final                                    | Descriere                                 |
| -------- | ---------------------------------------------- | ----------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Obține configurația proxy completă        |
| `GET`    | `/api/settings/proxy?level=global`             | Obține proxy-ul global                    |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Obține proxy-ul furnizorului              |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Determină proxy-ul efectiv                |
| `PUT`    | `/api/settings/proxy`                          | Actualizează configurația proxy           |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Elimină proxy-ul de la nivelul specificat |

### API-ul registrului de proxy-uri

| Metodă   | Punct final                                       | Descriere                              |
| -------- | ------------------------------------------------- | -------------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Listează toate proxy-urile             |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Obține proxy-ul după ID                |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Obține atribuirile proxy-ului          |
| `POST`   | `/api/v1/management/proxies`                      | Creează un proxy                       |
| `PATCH`  | `/api/v1/management/proxies`                      | Actualizează un proxy                  |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Șterge un proxy                        |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Forțează ștergerea                     |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Atribuie în bloc                       |
| `GET`    | `/api/v1/management/proxies/assignments`          | Listează atribuirile                   |
| `GET`    | `/api/v1/management/proxies/health`               | Statistici privind starea proxy-urilor |

### API-ul tunelurilor

Pentru a expune instanța OmniRoute la internetul public (Cloudflare/ngrok/Tailscale), în loc să direcționați traficul de ieșire printr-un proxy, consultați [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). API-ul REST pentru tuneluri se află sub `/api/tunnels/{cloudflared,ngrok,tailscale}/*` și este independent de lanțul proxy de ieșire documentat mai sus.

### API-ul 1proxy

| Metodă   | Punct final                            | Descriere                                  |
| -------- | -------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | Listează proxy-urile 1proxy                |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Obține statisticile + starea sincronizării |
| `GET`    | `/api/settings/oneproxy?action=status` | Obține doar starea sincronizării           |
| `POST`   | `/api/settings/oneproxy`               | Declanșează sincronizarea                  |
| `POST`   | `/api/settings/oneproxy/rotate`        | Comută la următorul proxy                  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Șterge un proxy                            |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Șterge toate proxy-urile                   |

### API-ul proxy-ului în amonte

| Metodă   | Punct final                       | Descriere                                 |
| -------- | --------------------------------- | ----------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Obține configurația proxy-ului în amonte  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Setează modul proxy-ului în amonte        |
| `DELETE` | `/api/upstream-proxy/:providerId` | Elimină configurația proxy-ului în amonte |

---

## Variabile de mediu

| Variabilă             | Valoare implicită | Descriere                                                                  |
| --------------------- | ----------------- | -------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`            | Activează suportul pentru proxy SOCKS5 (implicit `true` în `.env.example`) |

---

## Depanare

### „Proxy-ul SOCKS5 este dezactivat”

Setați `ENABLE_SOCKS5_PROXY=true` în fișierul `.env` și reporniți.

### Erori „socket hang up” prin proxy

Acest lucru este normal în cazul proxy-urilor ieftine care închid conexiunile inactive. OmniRoute gestionează deja această situație prin:

- Dezactivarea keep-alive pentru conexiunile proxy (`keepAliveTimeout: 1`)
- Dezactivarea pipelining-ului (`pipelining: 0`)
- Memorarea în cache a dispecerilor pentru a evita repetarea handshake-urilor

Dacă problema persistă, încercați un alt proxy sau utilizați funcția de rotație 1proxy.

### „unsupported_country_region_territory” în timpul OAuth

Asigurați-vă că proxy-ul este configurat **înainte** de a începe fluxul OAuth. OmniRoute direcționează schimbul de tokenuri OAuth prin proxy-ul configurat. Setați mai întâi un proxy global sau la nivel de furnizor, apoi conectați-vă.

### Proxy-ul nu este utilizat

Verificați ordinea de rezoluție:

1. Verificați cu `GET /api/settings/proxy?resolve=your-connection-id`
2. Verificați dacă `status` al proxy-ului este `active` (nu `inactive`)
3. Asigurați-vă că domeniul de atribuire al proxy-ului corespunde conexiunii dvs.

### Sincronizarea 1proxy eșuează

Verificați starea sincronizării:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Dacă `consecutiveFailures >= 5`, disjunctorul a fost declanșat. Reporniți serverul pentru resetare sau așteptați resetarea manuală.

---

## Schema bazei de date

### Tabelul `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' sau 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (doar pentru 1proxy)
  latency_ms INTEGER,                        -- milisecunde (doar pentru 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- poate accesa Google? (1proxy)
  last_validated TEXT,                       -- marcaj temporal ISO (1proxy)
  country_code TEXT,                         -- cod ISO din 2 litere (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabelul `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID-ul furnizorului, ID-ul conexiunii sau ID-ul combinației
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Verificarea stării proxy-ului (v3.8.16+)

Mecanismul **proxy fast-fail** al OmniRoute (`src/lib/proxyHealth.ts`) detectează proxy-urile nefuncționale în <2s printr-o verificare rapidă a conexiunii TCP, apoi **memorează rezultatul în cache** pentru a evita costul suplimentar pentru fiecare solicitare.

### Cum funcționează

```
Solicitare ──▶ ProxyHealthCache.get(url)
                │
                ├─ Cache găsit + recent?  ──▶ returnează starea din cache
                │
                └─ Cache negăsit / expirat?  ──▶ conexiune TCP la host:port
                                                  (expirare: FAST_FAIL_TIMEOUT_MS)
                                                  ──▶ memorare în cache pentru HEALTH_CACHE_TTL_MS
                                                  ──▶ returnează rezultatul
```

Fără acest mecanism, un proxy nefuncțional ar bloca fiecare solicitare pe întreaga durată `PROXY_TIMEOUT_MS` (implicit 30s) înainte de a eșua.

### Variabile de mediu ajustabile

| Variabilă                    | Valoare implicită | Scop                                                                    |
| ---------------------------- | ----------------- | ----------------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`            | Timpul de expirare al conexiunii TCP pentru fiecare verificare de stare |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`           | Durata memorării în cache a rezultatului verificării de stare           |

**Valori recomandate:**

| Scenariu                     | Timp de expirare fast-fail | TTL cache | Motivație                                                                                              |
| ---------------------------- | -------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| Gateway API cu trafic intens | 1500ms                     | 60000ms   | Eșec rapid agresiv, cache mai lung pentru reducerea verificărilor                                      |
| Noduri distribuite geografic | 3000ms                     | 15000ms   | Rețelele mai lente necesită mai mult timp; cache mai scurt pentru comutare rapidă în caz de defecțiune |
| Dezvoltare / testare         | 1000ms                     | 10000ms   | Iterare rapidă pe proxy-urile locale                                                                   |
| Mod discret / anti-detectare | 2500ms                     | 45000ms   | Evită sondarea rapidă care ar putea declanșa limitele de rată                                          |

### Inspectarea stării proxy-urilor

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Forțează reverificarea unui anumit proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Indicatorul `stale` este `true` atunci când intrarea din cache a depășit `HEALTH_CACHE_TTL_MS`, iar următoarea solicitare va declanșa o nouă verificare.

### Valori implicite pentru fiecare tip de proxy

Verificarea stării utilizează valori implicite adecvate în funcție de schema URL:

| Schemă                     | Port implicit |
| -------------------------- | ------------- |
| `http://`                  | 8080          |
| `https://`                 | 443           |
| `socks5://` / `socks5h://` | 1080          |

Porturile personalizate din URL (`http://host:9999`) au întotdeauna prioritate față de valoarea implicită a schemei.

---

## Analiza și observabilitatea proxy-urilor

OmniRoute urmărește utilizarea fiecărui proxy pentru a ajuta operatorii să diagnosticheze tiparele de rutare, creșterile bruște ale latenței și erorile recurente.

### Ce se urmărește

Pentru fiecare solicitare efectuată printr-un proxy configurat, OmniRoute înregistrează:

| Metrică      | Descriere                                                           |
| ------------ | ------------------------------------------------------------------- |
| `proxy_url`  | URL-ul complet al proxy-ului (datele de autentificare sunt mascate) |
| `provider`   | ID-ul furnizorului upstream (openai, anthropic etc.)                |
| `latency_ms` | Durata totală dus-întors, inclusiv negocierea cu proxy-ul           |
| `connect_ms` | Doar durata conexiunii TCP                                          |
| `status`     | Codul de stare HTTP primit de la upstream                           |
| `error`      | Clasa erorii, dacă solicitarea a eșuat                              |
| `timestamp`  | ISO 8601 UTC                                                        |

### Accesarea datelor

```bash
# Evenimente proxy recente
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Endpointul real este `/api/usage/proxy-logs` (consultați `src/app/api/usage/proxy-logs/route.ts`). Acest endpoint acceptă:

- `GET /api/usage/proxy-logs` — preia jurnalele proxy
- `DELETE /api/usage/proxy-logs` — șterge toate jurnalele proxy

Dacă este necesar, statisticile agregate pot fi interogate direct din tabelul `proxy_logs` prin SQL. Interfața tabloului de bord poate oferi vizualizări agregate.

### Tipare uzuale

**Detectarea unui proxy instabil** (alternează între succes și eșec):

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

**Identificarea proxy-urilor lente** (latență p95 > 2s):

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

## Arbore decizional pentru strategia de rotație

Atunci când mai multe proxy-uri sunt atribuite unui domeniu de aplicare, OmniRoute utilizează o **strategie de rotație** pentru a alege proxy-ul folosit pentru fiecare solicitare. Strategia este configurată la nivelul domeniului de aplicare (global, per furnizor, per cont, per combinație).

### Strategii disponibile

| Strategie             | Când se utilizează                           | Compromis                                                                                |
| --------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `quality` (implicită) | Producție cu proxy-uri de calitate variabilă | Favorizează proxy-urile bine evaluate; le poate defavoriza excesiv pe cele slab evaluate |
| `random`              | Distribuirea sarcinii, confidențialitate     | Distribuție uniformă; ignoră indicatorii de calitate                                     |
| `sequential`          | Depanare, testare deterministă               | Parcurge proxy-urile în ordine; comportament ușor de înțeles                             |

### Arbore decizional

```
                    Aveți scoruri de calitate pentru proxy-uri?
                    │
        ┌───────────┴───────────┐
        │                       │
       DA                      NU
        │                       │
   Sunt toate proxy-urile       │
   aproximativ egale            │
   calitativ?                   │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  DA        NU              Utilizați
   │         │              `random`
   │         │              (distribuirea
   │         │              uniformă generează
   │         │              în timp date
   │         │              despre calitate)
   │         │
   │    Utilizați `quality`
   │    (cea mai bună pentru
   │    calitate variabilă)
   │
Utilizați `random`
(distribuiți sarcina
uniform)
```

## Excluderea automată a propriilor proxy-uri în caz de eroare

Pool-ul marketplace 1proxy retrogradează deja automat proxy-urile care eșuează (consultați
[Scorurile de calitate ale proxy-urilor](#proxy-quality-scores)). Pentru
proxy-urile adăugate de **dumneavoastră** în registru, planificatorul de verificări ale stării din fundal
(`src/lib/proxyHealth/scheduler.ts`) oferă același comportament de „excludere automată
din lanț a unui membru nefuncțional”, fără a șterge nimic:

```bash
# .env — dezactivează temporar un proxy după 3 verificări eșuate consecutiv și îl reactivează
# automat atunci când începe să răspundă din nou la verificări.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Cum se integrează într-un lanț cu mai multe proxy-uri:

1. Planificatorul verifică fiecare proxy înregistrat la fiecare `PROXY_HEALTH_INTERVAL_MS`
   (implicit 10 min; minimum 1 min).
2. După `PROXY_AUTO_REMOVE_AFTER` eșecuri **concludente** consecutive (un eșec real
   de conexiune — un timeout sau o eroare 5xx a țintei de verificare nu este luată niciodată în calcul; consultați
   [Verificarea stării proxy-urilor](#proxy-health-checking-v3816)), valoarea `status` a proxy-ului este
   setată la `dead`.
3. `dead` este una dintre stările excluse de filtrul pentru stări active utilizat la rezolvarea
   pool-ului/rotației, astfel încât rotația unui domeniu de aplicare (round-robin / aleatorie / persistentă /
   după latență — consultați [Arborele decizional al strategiei de rotație](#rotation-strategy-decision-tree))
   încetează imediat să aloce acel proxy solicitărilor noi. Niciun alt proxy din
   pool nu este afectat, iar întregul pool nu revine niciodată în mod silențios la o conexiune
   directă — consultați mecanismul de protecție fail-closed din [Sistemul de proxy pe 4 niveluri](#4-level-proxy-system).
4. Planificatorul continuă să verifice proxy-urile `dead` la același interval. Următoarea
   verificare reușită schimbă `status` înapoi la `active`, iar proxy-ul reintră în rotație —
   fără a fi necesară readăugarea manuală.

Această funcționalitate este în mod deliberat **opțională și nedistructivă**: în mod implicit, planificatorul doar
contorizează și înregistrează eșecurile (consultați politica C din `decision.ts`), iar `PROXY_AUTO_DISABLE`
nu șterge niciodată un rând — pentru aceasta există opțiunea separată și mai agresivă
`PROXY_AUTO_REMOVE`. Dacă ambele sunt setate la `true`, `PROXY_AUTO_REMOVE`
are prioritate (un proxy care urmează să fie șters nu are nevoie de o dezactivare temporară între timp). Consultați
referința [Configurarea mediului](../reference/ENVIRONMENT.md) pentru lista completă
de variabile.

---

> 📖 **Documentație asociată:**
>
> - [Ghidul utilizatorului](../guides/USER_GUIDE.md) — Configurare generală
> - [Referința API](../reference/API_REFERENCE.md) — Documentația API completă
> - [Configurarea mediului](../reference/ENVIRONMENT.md) — Toate variabilele de mediu
