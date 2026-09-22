# 🌐 OmniRoute Proxy Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Zaobiđite geografske blokade, zaštitite svoj identitet i usmjerite AI promet kroz bilo koji proxy — bez složene konfiguracije.**

OmniRoute uključuje potpuno opremljen sustav za upravljanje proxy poslužiteljima koji omogućuje usmjeravanje prometa prema vanjskim pružateljima AI usluga kroz HTTP, HTTPS ili SOCKS5 proxy poslužitelje. Bez obzira na to nalazite li se u blokiranoj regiji, trebate rotaciju IP adresa ili želite prikrivanje digitalnog otiska — ovaj vodič obuhvaća sve.

---

## Sadržaj

- [Zašto koristiti proxy poslužitelje?](#why-use-proxies)
- [Pregled arhitekture](#architecture-overview)
- [Sustav proxy poslužitelja s 4 razine](#4-level-proxy-system)
- [Registar proxy poslužitelja (CRUD)](#proxy-registry-crud)
- [Besplatna platforma 1proxy](#1proxy-free-proxy-marketplace)
- [Rotacija proxy poslužitelja](#proxy-rotation)
- [Zaštita od otkrivanja i prikrivanje](#anti-detection--stealth)
- [Načini rada izlaznog proxy poslužitelja](#upstream-proxy-modes)
- [Korisničko sučelje nadzorne ploče](#dashboard-ui)
- [API referenca](#api-reference)
- [Varijable okruženja](#environment-variables)
- [Rješavanje problema](#troubleshooting)

---

## Zašto koristiti proxy poslužitelje?

Mnogi pružatelji AI usluga ograničavaju pristup prema geografskoj regiji. Programeri u **Rusiji, Kini, Iranu, Kubi, Turskoj** i drugim državama nailaze na pogreške poput:

```
unsupported_country_region_territory
```

Čak i izvan blokiranih regija proxy poslužitelji korisni su za:

| Slučaj upotrebe          | Opis                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **Zaobilaženje blokada** | Pristupite uslugama OpenAI, Anthropic, Codex i Copilot iz blokiranih zemalja              |
| **Rotacija IP adresa**   | Raspodijelite zahtjeve među više IP adresa kako biste izbjegli ograničenje broja zahtjeva |
| **Privatnost**           | Sakrijte svoju stvarnu IP adresu od vanjskih pružatelja usluga                            |
| **Usklađenost**          | Usmjerite promet kroz određene jurisdikcije                                               |
| **Testiranje**           | Simulirajte zahtjeve iz različitih regija                                                 |

---

## Pregled arhitekture

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute poslužitelj                   │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registar    │    │ Dispečer     │    │ Dohvaćanje       │  │
│  │ proxyja     │───▶│ proxyja      │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (predmemor.) │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sinkroniz.  │                        │ API vanjskog     │  │
│  │ s 1proxyjem │                        │ pružatelja       │  │
│  │ (bespl. skup)│                       │ usluga           │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Ključne komponente

| Komponenta                   | Datoteka                                     | Uloga                                                         |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| **Registar proxyja**         | `src/lib/db/proxies.ts`                      | CRUD za unose proxyja i dodjeljivanje opsega                  |
| **Dispečer proxyja**         | `open-sse/utils/proxyDispatcher.ts`          | Stvara `undici` ProxyAgent/SOCKS dispečere s predmemoriranjem |
| **Dohvaćanje preko proxyja** | `open-sse/utils/proxyFetch.ts`               | Omotava `fetch()` uz umetanje dispečera proxyja               |
| **Ruta postavki**            | `src/app/api/settings/proxy/route.ts`        | API za naslijeđenu konfiguraciju proxyja (GET/PUT/DELETE)     |
| **Ruta za upravljanje**      | `src/app/api/v1/management/proxies/route.ts` | CRUD API registra (GET/POST/PATCH/DELETE)                     |
| **Baza podataka 1proxy**     | `src/lib/db/oneproxy.ts`                     | Trajna pohrana besplatne platforme proxy poslužitelja         |

---

## Sustav proxyja s 4 razine

OmniRoute podržava konfiguraciju proxyja na **četiri neovisne razine**, koje se razrješavaju prema redoslijedu prioriteta:

```
Redoslijed razrješavanja prioriteta (od najvišeg → najnižem):

  1. 🔵 Proxy računa/veze         →  po API ključu / OAuth vezi
  2. 🟡 Proxy pružatelja          →  po pružatelju (npr. sav OpenAI promet)
  3. 🟠 Proxy kombinacije         →  po kombinaciji/konfiguraciji usmjeravanja
  4. 🟢 Globalni proxy            →  sav promet, svi pružatelji
```

### Kako funkcionira razrješavanje

Kada OmniRoute šalje zahtjev nadređenom pružatelju, poziva `resolveProxyForConnectionFromRegistry()`, koji redom provjerava svaku razinu:

1. **Razina računa** — Je li proxy dodijeljen ovom konkretnom ID-u veze?
2. **Razina pružatelja** — Je li proxy dodijeljen ovom pružatelju (npr. `openai`)?
3. **Globalna razina** — Je li konfiguriran globalni proxy?
4. **Bez proxyja** — Izravna veza s pružateljem.

Primjenjuje se prvo podudaranje. To znači da globalni proxy možete postaviti kao pričuvnu opciju, ali ga nadjačati za određene pružatelje ili veze.

### Koji se promet usmjerava kroz proxy

| Vrsta prometa         | Kroz proxy? | Napomene                                       |
| --------------------- | ----------- | ---------------------------------------------- |
| Dovršavanja razgovora | ✅          | Svi zahtjevi `/v1/chat/completions`            |
| Ugrađivanja           | ✅          | `/v1/embeddings`                               |
| Generiranje slika     | ✅          | `/v1/images/generations`                       |
| Zvuk (TTS/STT)        | ✅          | `/v1/audio/*`                                  |
| Razmjena OAuth tokena | ✅          | Rješava `unsupported_country_region_territory` |
| Testovi veze          | ✅          | Gumb "Testiraj vezu" koristi proxy             |
| Osvježavanje tokena   | ✅          | Pozadinska obnova OAuth-a                      |
| Sinkronizacija modela | ✅          | Popisivanje i otkrivanje modela                |

---

## Registar proxyja (CRUD)

Registar proxyja SQLite je tablica (`proxy_registry`) koja pohranjuje sve vaše proxyje. Svaki proxy ima:

| Polje      | Vrsta       | Opis                                                    |
| ---------- | ----------- | ------------------------------------------------------- |
| `id`       | UUID        | Jedinstveni identifikator                               |
| `name`     | Niz         | Oznaka čitljiva korisnicima                             |
| `type`     | Niz         | Protokol: `http`, `https`, `socks5`                     |
| `host`     | Niz         | Naziv proxy poslužitelja ili IP adresa                  |
| `port`     | Cijeli broj | Broj priključka                                         |
| `username` | Niz         | Korisničko ime za autentifikaciju (šifrirano u pohrani) |
| `password` | Niz         | Lozinka za autentifikaciju (šifrirana u pohrani)        |
| `region`   | Niz         | Oznaka geografske regije                                |
| `notes`    | Niz         | Bilješke u slobodnom tekstu                             |
| `status`   | Niz         | `active` ili `inactive`                                 |
| `source`   | Niz         | `manual` ili `oneproxy`                                 |

### Izrada proxyja

**Putem nadzorne ploče:**

1. Idite na **Postavke → Proxy**
2. Kliknite **Dodaj proxy**
3. Unesite vrstu, poslužitelja, priključak i neobavezne vjerodajnice za autentifikaciju
4. Spremite

**Putem API-ja:**

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

### Ažuriranje proxyja

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Napomena:** Vjerodajnice se zadržavaju osim ako izričito ne pošaljete zamjenske vrijednosti koje nisu prazne. Slanjem praznih nizova za `username`/`password` zadržat će se pohranjene vrijednosti.

### Brisanje proxyja

```bash
# Ne uspijeva ako je proxy dodijeljen bilo kojoj razini
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Prisilno brisanje (uklanja i dodjele)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Popis proxyja

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Dodjeljivanje proxyja razinama

```bash
# Dodijeli globalnoj razini
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Dodijeli određenom pružatelju
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Dodijeli određenoj vezi/ključu
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Razrješavanje efektivnog proxyja

Provjerite koji bi se proxy koristio za zadanu vezu:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Vraća razriješeni proxy s njegovom razinom (`account`, `provider` ili `global`) i izvorom.

### Skupna dodjela

Dodijelite jedan proxy većem broju pružatelja ili veza odjednom:

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

Proxyji su uključeni u sustav **sigurnosnog kopiranja/vraćanja**. Kada izvezete konfiguraciju OmniRoutea:

1. Idite na **Nadzorna ploča → Postavke → Sigurnosna kopija**
2. Kliknite **Izvezi** — uključeni su registar proxyja i dodjele
3. Za vraćanje kliknite **Uvezi** i prenesite datoteku sigurnosne kopije

Registar proxyja također podržava **upsert prema host+port** — ako uvezete proxy koji već postoji (isti poslužitelj i priključak), ažurirat će ga umjesto stvaranja duplikata.

### Migracija naslijeđenih podataka

Ako ste konfigurirali proxy poslužitelje u starijoj verziji (prije registra), OmniRoute ih automatski migrira:

```
Naslijeđena pohrana key_value → proxy_registry + proxy_assignments
```

To se događa jednom, pri prvom pokretanju nakon nadogradnje. Upotrijebite `migrateLegacyProxyConfigToRegistry({ force: true })` za ponovno pokretanje migracije.

---

## Tržište besplatnih proxy poslužitelja 1proxy

> 🆕 **Doprinos korisnika [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (problem [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute se integrira s platformom zajednice **[1proxy](https://1proxy-api.aitradepulse.com)** kako bi omogućio pristup **stotinama besplatnih, provjerenih proxy poslužitelja** iz cijelog svijeta. To je idealno za korisnike koji nemaju vlastitu proxy infrastrukturu.

### Kako funkcionira

```
┌─────────────┐  Sinkronizacija  ┌─────────────────┐   Rotacija    ┌────────────┐
│  1proxy API │ ────────────────▶ │  proxy_registry │ ────────────▶ │ API davatelja │
│  (vanjski)  │     do 500        │  source=oneproxy │  po kvaliteti │    usluge    │
└─────────────┘ proxy poslužitelja └─────────────────┘               └────────────┘
```

1. **Sinkronizacija** — OmniRoute dohvaća provjerene proxy poslužitelje iz API-ja 1proxy
2. **Pohrana** — Proxy poslužitelji spremaju se u istu tablicu `proxy_registry` s vrijednošću `source = 'oneproxy'`
3. **Filtriranje** — Filtriranje prema protokolu, državi i ocjeni kvalitete
4. **Rotacija** — Odabir najboljeg proxy poslužitelja pomoću strategije kvalitete, nasumične ili slijedne strategije
5. **Automatsko smanjenje kvalitete** — Neuspješnim proxy poslužiteljima smanjuje se ocjena kvalitete; ispod praga → označavaju se kao neaktivni

### Sinkronizacija proxy poslužitelja

**Putem nadzorne ploče:**

1. Idite na karticu **Postavke → 1proxy**
2. Kliknite **„Sinkroniziraj sada”**
3. Pregledajte statistiku: ukupan broj proxy poslužitelja, broj aktivnih, prosječnu kvalitetu i raspodjelu prema državama

**Putem API-ja:**

```bash
# Pokreni sinkronizaciju
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Odgovor:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtriranje proxy poslužitelja

```bash
# Filtriraj prema protokolu
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtriraj prema državi
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtriraj prema minimalnoj ocjeni kvalitete
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Kombiniraj filtre
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Ocjene kvalitete proxy poslužitelja

Svaki proxy poslužitelj 1proxy sadrži metapodatke:

| Polje           | Opis                                          |
| --------------- | --------------------------------------------- |
| `qualityScore`  | Ocjena od 0 do 100 na temelju provjere 1proxy |
| `latencyMs`     | Izmjerena mrežna latencija                    |
| `anonymity`     | `transparent`, `anonymous` ili `elite`        |
| `googleAccess`  | Može li proxy pristupiti Googleovim uslugama  |
| `countryCode`   | Dvoslovna ISO oznaka države                   |
| `lastValidated` | Vremenska oznaka posljednje provjere          |

Ocjene kvalitete dinamički se prilagođavaju:

- **Neuspješni zahtjevi** smanjuju ocjenu za 10 bodova
- **Ocjena padne na ≤10** → proxy se označava kao `inactive`
- Neaktivni proxy poslužitelji isključeni su iz rotacije

### Strategije rotacije

```bash
# Rotacija prema kvaliteti (najbolji proxy prvi) — zadano
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Nasumična rotacija
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Slijedno (prvo onaj koji je najdavnije provjeren)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Prekidač strujnog kruga

Sinkronizacija s platformom 1proxy ima ugrađeni prekidač strujnog kruga:

- Nakon **5 uzastopnih neuspješnih sinkronizacija** blokiraju se daljnji pokušaji sinkronizacije
- Ponovno postavite pomoću: `resetOneproxyCircuitBreaker()` ili ponovno pokrenite poslužitelj
- Status sinkronizacije dostupan je na `GET /api/settings/oneproxy?action=status`

### Brisanje proxy poslužitelja 1proxy

```bash
# Izbriši jedan proxy poslužitelj 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Izbriši SVE proxy poslužitelje 1proxy (ručni proxy poslužitelji ostaju nepromijenjeni)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Zaobilaženje detekcije i prikrivanje

OmniRoute ne usmjerava promet samo kroz proxy — čini da promet izgleda legitimno:

### Lažiranje TLS otiska

Koristi `wreq-js` za generiranje TLS otisaka nalik onima iz preglednika, čime zaobilazi sustave za otkrivanje botova koji označavaju TLS rukovanja koja ne potječu iz preglednika.

### Usklađivanje CLI otiska

**Prekidač CLI otiska** (`Postavke → Sigurnost`) mijenja redoslijed HTTP zaglavlja i polja JSON tijela kako bi odgovarali točnom potpisu izvornih CLI izvršnih datoteka (Claude Code, Codex itd.). Ovo funkcionira **povrh** proxyja:

```
Vaš IP (blokiran) → IP proxyja (SAD) → API pružatelja
                    + lažiranje TLS-a
                    + CLI otisak
```

Istodobno dobivate i **maskiranje IP adrese** i **autentičnost zahtjeva**.

### Očuvanje IP adrese proxyja

Oznake označene bojama na nadzornoj ploči prikazuju koja je razina proxyja aktivna:

| Oznaka | Razina    | Značenje                                       |
| ------ | --------- | ---------------------------------------------- |
| 🟢     | Globalna  | Sav promet prolazi kroz ovaj proxy             |
| 🟡     | Pružatelj | Samo promet ovog pružatelja prolazi kroz proxy |
| 🔵     | Veza      | Ovaj konkretni ključ/račun koristi ovaj proxy  |

Oznaka također prikazuje razriješenu IP adresu proxyja radi provjere.

---

## Načini rada nadređenog proxyja

Za pružatelje koji koriste obrazac CLIProxyAPI, OmniRoute podržava tri načina rada nadređenog proxyja:

| Način rada    | Opis                                                      |
| ------------- | --------------------------------------------------------- |
| `native`      | OmniRoute izravno upravlja usmjeravanjem proxyja (zadano) |
| `cliproxyapi` | Delegira vanjskoj instanci CLIProxyAPI-ja                 |
| `fallback`    | Prvo pokušava izvorni način, zatim prelazi na CLIProxyAPI |

Konfigurirajte za svakog pružatelja:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Korisničko sučelje nadzorne ploče

### Postavke → Kartica Proxy

- Konfiguracija **globalnog proxyja** (postavlja se jednom za sav promet)
- Zamjenske postavke proxyja **po pružatelju**
- Dodjele proxyja **po vezi**
- **Test veze** kroz konfigurirani proxy
- **Oznake označene bojama** koje prikazuju aktivnu razinu proxyja

### Postavke → Kartica 1proxy

- Gumb **Sinkroniziraj sada** za dohvaćanje besplatnih proxyja
- **Kartice sa statistikom**: Ukupno, Aktivni, Prosječna kvaliteta, Posljednja sinkronizacija
- **Filtri**: Protokol, Kôd države, Minimalna kvaliteta
- **Tablica proxyja** s poslužiteljem, protokolom, državom, ocjenom kvalitete, latencijom, anonimnošću i pristupom Googleu
- Ploča **statusa sinkronizacije** s praćenjem uspjeha/neuspjeha i brojem uzastopnih neuspjeha
- **Očisti sve** za uklanjanje svih unosa iz 1proxyja

---

## Referenca API-ja

### API postavki proxyja

| Metoda   | Krajnja točka                                  | Opis                               |
| -------- | ---------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Dohvati punu konfiguraciju proxyja |
| `GET`    | `/api/settings/proxy?level=global`             | Dohvati globalni proxy             |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Dohvati proxy pružatelja           |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Razriješi efektivni proxy          |
| `PUT`    | `/api/settings/proxy`                          | Ažuriraj konfiguraciju proxyja     |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Ukloni proxy na određenoj razini   |

### API registra proxyja

| Metoda   | Krajnja točka                                     | Opis                      |
| -------- | ------------------------------------------------- | ------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Navedi sve proxyje        |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Dohvati proxy prema ID-u  |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Dohvati dodjele proxyja   |
| `POST`   | `/api/v1/management/proxies`                      | Stvori proxy              |
| `PATCH`  | `/api/v1/management/proxies`                      | Ažuriraj proxy            |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Izbriši proxy             |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Prisilno izbriši          |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Skupno dodijeli           |
| `GET`    | `/api/v1/management/proxies/assignments`          | Navedi dodjele            |
| `GET`    | `/api/v1/management/proxies/health`               | Statistika stanja proxyja |

### API tunela

Za izlaganje vaše instance OmniRoutea javnom internetu (Cloudflare/ngrok/Tailscale) umjesto usmjeravanja izlaznog prometa kroz proxy, pogledajte [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). REST API tunela nalazi se pod `/api/tunnels/{cloudflared,ngrok,tailscale}/*` i neovisan je o gore dokumentiranom lancu izlaznih proxyja.

### API za 1proxy

| Metoda   | Krajnja točka                          | Opis                                       |
| -------- | -------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | Navedi proxyje iz 1proxyja                 |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Dohvati statistiku i status sinkronizacije |
| `GET`    | `/api/settings/oneproxy?action=status` | Dohvati samo status sinkronizacije         |
| `POST`   | `/api/settings/oneproxy`               | Pokreni sinkronizaciju                     |
| `POST`   | `/api/settings/oneproxy/rotate`        | Prijeđi na sljedeći proxy                  |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Izbriši jedan                              |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Očisti sve                                 |

### API nadređenog proxyja

| Metoda   | Krajnja točka                     | Opis                                     |
| -------- | --------------------------------- | ---------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Dohvati konfiguraciju nadređenog proxyja |
| `PUT`    | `/api/upstream-proxy/:providerId` | Postavi način rada nadređenog proxyja    |
| `DELETE` | `/api/upstream-proxy/:providerId` | Ukloni konfiguraciju nadređenog proxyja  |

---

## Varijable okruženja

| Varijabla             | Zadana vrijednost | Opis                                                             |
| --------------------- | ----------------- | ---------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`            | Omogući podršku za SOCKS5 proxy (zadano `true` u `.env.example`) |

---

## Rješavanje problema

### "SOCKS5 proxy je onemogućen"

Postavite `ENABLE_SOCKS5_PROXY=true` u svojoj `.env` datoteci i ponovno pokrenite aplikaciju.

### Pogreške "socket hang up" pri korištenju proxyja

To je uobičajeno kod jeftinih proxyja koji prekidaju neaktivne veze. OmniRoute to već rješava na sljedeće načine:

- Onemogućuje održavanje veza aktivnima za proxy veze (`keepAliveTimeout: 1`)
- Onemogućuje ulančavanje zahtjeva (`pipelining: 0`)
- Predmemorira dispečere kako bi izbjegao ponovljena uspostavljanja veze

Ako se problem nastavi pojavljivati, pokušajte s drugim proxyjem ili upotrijebite značajku rotacije usluge 1proxy.

### "unsupported_country_region_territory" tijekom OAutha

Provjerite je li proxy konfiguriran **prije** pokretanja OAuth procesa. OmniRoute usmjerava razmjenu OAuth tokena putem konfiguriranog proxyja. Najprije postavite globalni proxy ili proxy na razini pružatelja usluge, a zatim se povežite.

### Proxy se ne upotrebljava

Provjerite redoslijed razrješavanja:

1. Provjerite pomoću `GET /api/settings/proxy?resolve=your-connection-id`
2. Provjerite je li `status` proxyja postavljen na `active` (a ne na `inactive`)
3. Provjerite podudara li se opseg dodjele proxyja s vašom vezom

### Sinkronizacija s uslugom 1proxy ne uspijeva

Provjerite status sinkronizacije:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Ako je `consecutiveFailures >= 5`, aktivirao se osigurač. Ponovno pokrenite poslužitelj kako biste ga vratili na početno stanje ili pričekajte ručno vraćanje.

---

## Shema baze podataka

### Tablica `proxy_registry`

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
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' ili 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (samo 1proxy)
  latency_ms INTEGER,                        -- milisekunde (samo 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- može li pristupiti Googleu? (1proxy)
  last_validated TEXT,                       -- ISO vremenska oznaka (1proxy)
  country_code TEXT,                         -- ISO dvoslovni kôd (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tablica `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID pružatelja usluge, ID veze ili ID kombinacije
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Provjera ispravnosti proxyja (v3.8.16+)

OmniRouteov mehanizam **brzog prekida za proxyje** (`src/lib/proxyHealth.ts`) otkriva neaktivne proxyje za manje od 2 s pomoću brze provjere TCP veze, a zatim **predmemorira rezultat** kako bi izbjegao dodatno opterećenje pri svakom zahtjevu.

### Kako funkcionira

```
Zahtjev ──▶ ProxyHealthCache.get(url)
             │
             ├─ Pogodak u predmemoriji + svježe?  ──▶ vrati predmemorirani status
             │
             └─ Promašaj u predmemoriji / zastarjelo?  ──▶ TCP povezivanje s host:port
                                                            (istek vremena: FAST_FAIL_TIMEOUT_MS)
                                                            ──▶ predmemoriraj tijekom HEALTH_CACHE_TTL_MS
                                                            ──▶ vrati rezultat
```

Bez toga bi neaktivni proxy blokirao svaki zahtjev tijekom cijelog razdoblja `PROXY_TIMEOUT_MS` (zadano 30 s) prije nego što bi došlo do neuspjeha.

### Prilagodljive varijable okruženja

| Varijabla                    | Zadana vrijednost | Namjena                                      |
| ---------------------------- | ----------------- | -------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`            | Istek TCP veze za svaku provjeru ispravnosti |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`           | Trajanje predmemoriranja rezultata provjere  |

**Preporučene vrijednosti:**

| Scenarij                                 | Istek brzog prekida | TTL predmemorije | Obrazloženje                                                                   |
| ---------------------------------------- | ------------------- | ---------------- | ------------------------------------------------------------------------------ |
| API pristupnik velike propusnosti        | 1500ms              | 60000ms          | Agresivan brzi prekid, dulje predmemoriranje radi smanjenja provjera           |
| Geografski distribuirani čvorovi         | 3000ms              | 15000ms          | Sporijim mrežama treba više vremena; kraća predmemorija za brzo prebacivanje   |
| Razvoj / testiranje                      | 1000ms              | 10000ms          | Brzo iteriranje na lokalnim proxyjima                                          |
| Prikriveni rad / izbjegavanje otkrivanja | 2500ms              | 45000ms          | Izbjegavanje učestalog ispitivanja koje bi moglo aktivirati ograničenja brzine |

### Pregled ispravnosti proxyja

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Prisilno ponovno provjeri određeni proxy
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Oznaka `stale` ima vrijednost `true` kada je zapis u predmemoriji prekoračio `HEALTH_CACHE_TTL_MS`, pa će sljedeći zahtjev pokrenuti novu provjeru.

### Zadane vrijednosti prema vrsti proxyja

Provjera ispravnosti upotrebljava razumne zadane vrijednosti na temelju URL sheme:

| Shema                      | Zadani priključak |
| -------------------------- | ----------------- |
| `http://`                  | 8080              |
| `https://`                 | 443               |
| `socks5://` / `socks5h://` | 1080              |

Prilagođeni priključci u URL-u (`http://host:9999`) uvijek imaju prednost pred zadanom vrijednošću sheme.

---

## Analitika i opservabilnost proxyja

OmniRoute prati upotrebu svakog proxyja kako bi operaterima pomogao dijagnosticirati obrasce usmjeravanja, nagle skokove latencije i ponavljajuće pogreške.

### Što se prati

Za svaki zahtjev koji prolazi kroz konfigurirani proxy, OmniRoute bilježi:

| Metrika      | Opis                                                                 |
| ------------ | -------------------------------------------------------------------- |
| `proxy_url`  | Puni URL proxyja (uz skrivene pristupne podatke)                     |
| `provider`   | ID nadređenog pružatelja (openai, anthropic itd.)                    |
| `latency_ms` | Ukupno vrijeme povratnog puta, uključujući uspostavu veze s proxyjem |
| `connect_ms` | Samo vrijeme uspostave TCP veze                                      |
| `status`     | HTTP statusni kod nadređenog poslužitelja                            |
| `error`      | Klasa pogreške ako zahtjev nije uspio                                |
| `timestamp`  | ISO 8601 UTC                                                         |

### Pristup podacima

```bash
# Nedavni događaji proxyja
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Stvarna krajnja točka je `/api/usage/proxy-logs` (pogledajte `src/app/api/usage/proxy-logs/route.ts`). Ova krajnja točka podržava:

- `GET /api/usage/proxy-logs` — dohvaćanje zapisnika proxyja
- `DELETE /api/usage/proxy-logs` — brisanje svih zapisnika proxyja

Ako je potrebno, zbirna statistika može se izravno dohvatiti SQL upitom iz tablice `proxy_logs`. Korisničko sučelje nadzorne ploče može nuditi zbirne prikaze.

### Uobičajeni obrasci

**Otkrivanje nestabilnog proxyja** (naizmjenično uspijeva i ne uspijeva):

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

**Pronalaženje sporih proxyja** (p95 latencija > 2 s):

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

## Stablo odluke za strategiju rotacije

Kada je opsegu dodijeljeno više proxyja, OmniRoute upotrebljava **strategiju rotacije** kako bi odabrao koji će se proxy upotrijebiti za svaki zahtjev. Strategija se konfigurira na razini opsega (globalno, po pružatelju, po računu, po kombinaciji).

### Dostupne strategije

| Strategija         | Kada je upotrijebiti                              | Kompromis                                                                                   |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `quality` (zadano) | Produkcija s proxyjima različite kvalitete        | Daje prednost visoko ocijenjenim proxyjima; oni s niskim ocjenama mogu ostati neiskorišteni |
| `random`           | Raspodjela opterećenja, privatnost                | Ravnomjerna raspodjela; zanemaruje signale kvalitete                                        |
| `sequential`       | Otklanjanje pogrešaka, determinističko testiranje | Redom kruži kroz proxyje; lako je razumjeti ponašanje                                       |

### Stablo odluke

```
                    Imate li ocjene kvalitete svojih proxyja?
                    │
        ┌───────────┴───────────┐
        │                       │
       DA                      NE
        │                       │
   Jesu li svi proxyji          │
   približno jednake            │
   kvalitete?                   │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  DA        NE             Upotrijebite
   │         │              `random`
   │         │              (ravnomjerna
   │         │              raspodjela s
   │         │              vremenom stvara
   │         │              podatke o kvaliteti)
   │         │
   │    Upotrijebite `quality`
   │    (najbolje za
   │    različitu kvalitetu)
   │
Upotrijebite `random`
(ravnomjerno
rasporedite
opterećenje)
```

## Automatsko isključivanje neispravnih vlastitih proxyja

Skup na tržištu 1proxy već automatski smanjuje prioritet neispravnih proxyja (pogledajte
[Ocjene kvalitete proxyja](#proxy-quality-scores)). Za
prox yje koje ste **vi** dodali u registar, pozadinski planer provjere stanja
(`src/lib/proxyHealth/scheduler.ts`) pruža isto ponašanje „automatskog isključivanja
neispravnog člana iz lanca”, bez brisanja bilo čega:

```bash
# .env — privremeno onemogućite proxy nakon 3 uzastopne neuspjele provjere i ponovno ga omogućite
# automatski čim ponovno počne odgovarati na provjere.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Kako se to uklapa u lanac s više proxyja:

1. Planer provjerava svaki registrirani proxy svakih `PROXY_HEALTH_INTERVAL_MS`
   (zadano 10 min; najmanje 1 min).
2. Nakon `PROXY_AUTO_REMOVE_AFTER` uzastopnih **zaključnih** neuspjeha (stvarni
   neuspjeh povezivanja — prekoračenje vremena ili vlastiti odgovor 5xx cilja provjere
   nikada se ne računaju; pogledajte
   [Provjeru stanja proxyja](#proxy-health-checking-v3816)), `status` proxyja
   postavlja se na `dead`.
3. `dead` je jedan od statusa koje filtar aktivnih statusa, korišten pri određivanju
   skupa/rotacije, isključuje, pa rotacija opsega (kružno / nasumično / ljepljivo /
   prema latenciji — pogledajte
   [Stablo odluke o strategiji rotacije](#rotation-strategy-decision-tree))
   odmah prestaje dodjeljivati taj proxy novim zahtjevima. To ne utječe ni na jedan
   drugi proxy u skupu, a cijeli se skup nikada ne prebacuje neprimjetno na izravnu
   vezu — pogledajte zaštitu zatvaranjem pri pogrešci u
   [Proxy sustavu s 4 razine](#4-level-proxy-system).
4. Planer nastavlja provjeravati `dead` proxyje u istom intervalu. Sljedeća
   uspješna provjera vraća `status` na `active` i proxy ponovno ulazi u rotaciju —
   nije ga potrebno ručno ponovno dodavati.

Ova je funkcionalnost namjerno **neobavezna i nedestruktivna**: planer prema zadanim
postavkama samo broji i bilježi neuspjehe (pogledajte pravilo C u `decision.ts`), a
`PROXY_AUTO_DISABLE` nikada ne briše redak — tome služi zasebna, agresivnija
zastavica `PROXY_AUTO_REMOVE`. Ako su obje postavljene na `true`, prednost ima
`PROXY_AUTO_REMOVE` (proxy koji će biti izbrisan nema koristi od privremenog
onemogućivanja prije toga). Potpuni popis varijabli potražite u referentnom
dokumentu [Konfiguracija okruženja](../reference/ENVIRONMENT.md).

---

> 📖 **Povezana dokumentacija:**
>
> - [Korisnički vodič](../guides/USER_GUIDE.md) — Opće postavljanje i konfiguracija
> - [Referenca API-ja](../reference/API_REFERENCE.md) — Potpuna dokumentacija API-ja
> - [Konfiguracija okruženja](../reference/ENVIRONMENT.md) — Sve varijable okruženja
