# TRAFFIC_INSPECTOR (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

# Traffic Inspector

Traffic Inspector je OmniRoute-ov ugrađeni HTTPS debugger saobraćaja — alat sličan Charles Proxy / mitmweb / HTTP Toolkit koji je **svjestan LLM-a** (LLM-aware) i **svjestan agenata** (agent-aware). Nalazi se na `/dashboard/tools/traffic-inspector` i prima saobraćaj uživo sa do 5 istovremenih izvora snimanja.

**Lokacija kontrolne table:** `/dashboard/tools/traffic-inspector`
**Grupa na bočnoj traci:** Tools (nakon AgentBridge)
**Pogledajte i:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge je režim snimanja 1.

---

## §1 Pregled

### Šta Traffic Inspector čini jedinstvenim

| Funkcionalnost                                                              |  mitmweb   | Charles |  Fiddler   | **OmniRoute Traffic Inspector** |
| --------------------------------------------------------------------------- | :--------: | :-----: | :--------: | :-----------------------------: |
| Web-bazirano                                                                |     ✓      |    ✗    |     ✗      |                ✓                |
| Otvorenog koda                                                              |     ✓      |    ✗    | djelimično |                ✓                |
| **Svjestan agenata** (zna da li je zahtjev od Antigravity/Copilot/itd.)     |     ✗      |    ✗    |     ✗      |                ✓                |
| **Svjestan LLM-a** (analizira OpenAI/Anthropic/Gemini oblik, tokene, model) |     ✗      |    ✗    |     ✗      |                ✓                |
| **Vidljivo mapiranje modela** (gemini-3-flash → claude-sonnet-4.7)          |     ✗      |    ✗    |     ✗      |                ✓                |
| **Razdvajanje proxy/upstream latencije**                                    | djelimično |    ✗    |     ✗      |                ✓                |
| **Integrisano sa OmniRoute** rutiranjem, fallback-om, troškovima            |     ✗      |    ✗    |     ✗      |                ✓                |
| **Sistemski proxy debug** (bilo koja aplikacija na mašini)                  |     ✓      |    ✓    |     ✓      |                ✓                |
| **Prilagođeno snimanje hosta** (DNS preusmjeravanje po hostu)               |     ✓      |    ✓    |     ✓      |                ✓                |
| **HTTP_PROXY env režim**                                                    |     ✓      |    ✓    |     ✓      |                ✓                |
| **Prikaz razgovora** (baloni sa više razmjena, tool_use/tool_result)        |     ✗      |    ✗    |     ✗      |                ✓                |
| **SSE spajanje strimova** (rekonstrukcija iz delta događaja)                |     ✗      |    ✗    |     ✗      |                ✓                |
| **Snimanje sesije** (imenovano, izvozivo .har/.jsonl)                       |     ✗      |    ✓    |     ✓      |                ✓                |

### Arhitektura u jednom pasusu

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) je dijeljeni in-memory kružni bafer (podrazumijevano 1000 unosa, konfigurisabilno putem `INSPECTOR_BUFFER_SIZE`). Svi izvori snimanja pišu u njega putem `push()`. Bafer klasifikuje svaki unos koristeći `kindDetector.ts` (određuje da li je u pitanju LLM zahtjev), izračunava `contextKey` (SHA-256 otisak sistemskog prompta) i emituje svim WebSocket pretplatnicima putem `globalTrafficBuffer.subscribe()`. Kontrolna tabla se povezuje putem `GET /api/tools/traffic-inspector/ws` i prima snimak pri povezivanju, nakon čega slijede `new`/`update`/`clear` događaji.

---

## §2 Načini snimanja

Traffic Inspector podržava **5 istovremenih izvora snimanja**. Svaki se može nezavisno uključiti/isključiti. Polje `source` u svakom `InterceptedRequest` (`src/mitm/inspector/types.ts`) je jedno od `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` ili `"tproxy"`.

### Način 1 — AgentBridge (podrazumevano, uvek uključeno)

**Izvor:** AgentBridge rukovaoci (`src/mitm/handlers/base.ts`)
**Mehanizam:** Svaki `intercept()` poziv u `MitmHandlerBase` poziva `hookBufferStart()` pre prosleđivanja i `hookBufferUpdate()` po završetku. Nije potrebna dodatna konfiguracija — radi čim se AgentBridge pokrene.
**Doseg:** 9 IDE agenata konfigurisanih u AgentBridge-u
**Napomena:** polje `source` u `InterceptedRequest` = `"agent-bridge"`

### Način 2 — Prilagođeni hostovi (DNS preusmeravanje)

**Izvor:** Lista hostova definisana od strane korisnika (`inspector_custom_hosts` tabela)
**Mehanizam:** Dodavanje hosta putem korisničkog interfejsa dodaje `127.0.0.1 <host>` u `/etc/hosts` (zahteva sudo). Postojeći AgentBridge MITM server (port 443) dinamički generiše SNI sertifikat za novi host.
**Doseg:** Bilo koja aplikacija koja koristi dodati host — nije potrebna promena konfiguracije aplikacije
**Napomena:** `source` = `"custom-host"`

Primeri upotrebe:

- Nadgledanje `api.openai.com` iz Python skripti
- Otklanjanje grešaka (debug) za `my-internal-llm.company.com`
- Snimanje saobraćaja sa mobilnih uređaja na istoj mreži (putem ARP spoofinga — napredno)

### Način 3 — HTTP_PROXY slušač (port 8080)

**Izvor:** Aplikacije koje koriste `HTTP_PROXY`/`HTTPS_PROXY` varijable okruženja
**Mehanizam:** Sekundarni slušač na portu 8080 (`src/mitm/inspector/httpProxyServer.ts`) koji deluje kao standardni eksplicitni HTTP/HTTPS proxy. Prihvata `CONNECT` tunele (HTTPS) i direktne HTTP zahteve.
**Doseg:** Bilo koja aplikacija koja poštuje `HTTP_PROXY` varijablu okruženja — bez promene DNS-a, bez sudo-a
**Napomena:** `source` = `"http-proxy"`

```bash
# Brzo snimanje za jednu komandu:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Trajno snimanje u shell sesiji:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**TLS ograničenje:** HTTPS `CONNECT` tuneli se snimaju samo kao metapodaci (host, port, vreme) — TLS telo se podrazumevano ne dekriptuje. Omogućite "Decrypt HTTPS in proxy mode" prekidač (opciono, zahteva da AgentBridge sertifikat bude poverljiv) za potpunu inspekciju tela.

**Konflikt portova:** Ako je port 8080 u upotrebi, AgentBridge vraća 409 sa strukturiranom greškom. Promenite port putem `INSPECTOR_HTTP_PROXY_PORT` varijable okruženja.

### Način 4 — Sistemski proxy (napredno, opciono)

**Izvor:** Proxy postavke na nivou operativnog sistema (primenjuje se na sve aplikacije na mašini)
**Mehanizam:** Koristi OS API-je za preusmeravanje celokupnog HTTP/HTTPS saobraćaja kroz HTTP_PROXY slušač:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Doseg:** Svaka aplikacija na mašini koja poštuje sistemske proxy postavke
  **Napomena:** `source` = `"system-proxy"`

**Sigurnosni mehanizmi:**

- Tajmer za automatsko isključivanje (podrazumevano 30 min, podesivo putem `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Prethodno stanje sistemskog proxy-ja se čuva u bazi podataka i vraća prilikom poništavanja
- Kontrolna tabla prikazuje "Reverting system proxy" upit ako korisnik ode sa stranice dok je aktivan
- Korisnički interfejs prikazuje `⚠ Advanced` oznaku + polje za potvrdu

### Način 5 — TPROXY transparentna dekripcija (Linux, root, opciono)

**Izvor:** Kernel TPROXY + usmeravanje politika (`src/mitm/tproxy/`)
**Mehanizam:** Označava nove lokalne odlazne TCP konekcije ka ciljnom portu (podrazumevano `443`) u `mangle OUTPUT`, `ip rule` preusmerava označene pakete na lokalnu isporuku, a `mangle PREROUTING` `TPROXY` cilj ih predaje transparentnom (**IP_TRANSPARENT**) slušaču (podrazumevani port `8443`). Slušač prekida TLS sa list sertifikatom izdatim **po SNI nazivu hosta na zahtev** od strane dinamičkog CA, snima dekriptovanu razmenu i prosleđuje zahtev ponovo enkriptovan na originalno odredište.
**Doseg:** **Proizvoljni** odredišni hostovi na ciljnom portu — bez `/etc/hosts` spoofinga, bez `HTTP_PROXY` varijable okruženja, bez mutacije sistemskog proxy-ja. Presretnuti proces ne zahteva promenu konfiguracije, ali mora verovati dinamičkom CA.
**Napomena:** `source` = `"tproxy"`

**Zahtevi:** Samo Linux (**IP_TRANSPARENT** je samo za Linux), **CAP_NET_ADMIN** privilegija (root) i izvorni N-API dodatak koji se mora izgraditi pomoću C alata (`npm run build:native:tproxy`). Kada nije dostupan, prekidač na kontrolnoj tabli je onemogućen sa opisom "TPROXY decrypt requires Linux + root + the native addon". Firewall pravila se primenjuju/poništavaju transakciono (pad sistema nikada ne ostavlja `mangle` pravilo) i brišu se pri ponovnom pokretanju. Anti-loop mehanizam zasnovan na SO_MARK sprečava da se proxy-jevo sopstveno ponovno enkriptovano prosleđivanje ponovo presretne.

Ovo je značajan podsistem sa sopstvenim namenskim vodičem za operatera — pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije kompajlirano u `/docs`) za kompletan recept za firewall, instalater za per-SNI dinamički CA + trust-store, rutu samo za lokalni saobraćaj, detalje o anti-loop mehanizmu i konfiguracionu šemu. Prekidač se pokreće putem `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (napomena: ruta se nalazi pod AgentBridge prefiksom, a ne pod Traffic Inspector prefiksom).

### Poređenje načina snimanja

| Način rada             | Postavljanje                       |           Sudo?            | Doseg                                      | Napomene                                                                                                                                               |
| ---------------------- | ---------------------------------- | :------------------------: | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. AgentBridge         | Automatski                         |    Jednom (cert+hosts)     | 9 IDE agenata                              | Uključeno po zadanim postavkama                                                                                                                        |
| 2. Prilagođeni hostovi | Unos po hostu                      |    Da (hosts datoteka)     | Bilo koja aplikacija koja koristi taj host | Trajno pohranjeno u bazi podataka                                                                                                                      |
| 3. HTTP_PROXY          | `export HTTPS_PROXY=...`           |             Ne             | Aplikacije koje poštuju env                | Port 8080, bez TLS dešifriranja po zadanim postavkama                                                                                                  |
| 4. Na razini sistema   | Prekidač + potvrda                 |             Da             | Sve aplikacije na mašini                   | Automatsko isključivanje za 30 min                                                                                                                     |
| 5. TPROXY dešifriranje | Prekidač (Linux + izvorni dodatak) | Da (root + CA instalacija) | Bilo koji host na ciljnom portu            | Dešifrira proizvoljne hostove; isključeno po zadanim postavkama — pogledajte `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije kompajlirano u `/docs`) |

---

## §3 UI

### 3.1 Raspored

```
┌─ Traffic Inspector ─────────────────────────────────────────────────────┐
│ ┌─ Traka sa alatkama za izvore snimanja ────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Custom hosts (3)]  [○ HTTP_PROXY]  [○ System]│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Traka za filtere/kontrole ───────────────────────────────────────┐   │
│ │ Profil: (●) Samo LLM  (○) Prilagođeno  (○) Sve                    │   │
│ │ [⎉ Pauziraj] [🗑 Očisti] [⬇ .har] [● Snimi sesiju]    ● uživo 482/1k  │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ LISTA ZAHTJEVA (promjenjive veličine) ║ OKNO SA DETALJIMA                   ▲ │
│ ────────────────────────────── │ ║ [Razgovor][Zaglavlja][Zahtjev]      │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Odgovor][Vrijeme][LLM][Statistika] │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 custom ║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Lista zahtjeva (lijevo okno)

- **Virtuelizovano** (`useVirtualList` + `ResizeObserver`): podržava 1000 stavki bez zamrzavanja
- **Automatsko pomjeranje** sa prekidačem za pauziranje tokom pregleda
- **Status označen bojama**: zelena (2xx), žuta (3xx), crvena (4xx/5xx), siva (u toku)
- **Agent emoji**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 custom host
- **Traka boje konteksta**: lijeva ivica od 1px obojena prema `contextKey` (SHA-256 sistemskog upita) — vizuelno grupiše povezane razgovore
- **Lijeno učitavanje tijela**: samo tijelo odabranog zahtjeva se materijalizuje u karticama sa detaljima (izbjegava renderovanje 1000 × 1MB tijela)

### 3.3 Okno sa detaljima — 7 kartica

| Kartica         | Sadržaj                                                                                            | Napomene                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Razgovor**    | Balončići za razgovor sa više okreta (sistem/korisnik/asistent + tool_use/tool_result)             | Normalizovano iz formata bilo kojeg provajdera; prikazuje se samo za `detectedKind === "llm"`                |
| **Zaglavlja**   | Tabele zaglavlja zahtjeva + odgovora                                                               | Osjetljiva zaglavlja (Authorization, Cookie, api-key) su podrazumijevano maskirana; prekidač "Prikaži tajne" |
| **Zahtjev**     | Neobrađeno tijelo, JSON prikaz stabla, značka polja modela                                         | Lijepo formatiran JSON ili neobrađeni tekst                                                                  |
| **Odgovor**     | Neobrađeno tijelo ili lista SSE događaja; prekidač "Neobrađeno ↔ Spojeno"                          | SSE spajač rekonstruiše konačnu poruku iz delta događaja                                                     |
| **Vrijeme**     | Vodopad (Waterfall): režijski troškovi proksija naspram latencije uzvodno                          | Ukupno, TTFB i veličina                                                                                      |
| **LLM detalji** | Provajder, model, broj poruka, tokeni ulaz/izlaz, procjena troškova, mapirani cilj                 | Prikazuje se samo za LLM zahtjeve                                                                            |
| **Statistika**  | Recharts: vremenska linija latencije, trakasti grafikon tokena, dijagram raspršenosti poziva alata | Prikazuje se samo kada je učitana snimljena sesija                                                           |

### 3.4 Kontrole trake sa alatkama

| Kontrola        | Radnja                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| ⎉ Pauziraj      | Zaustavlja renderovanje novih zahtjeva; značka "X novih" se akumulira     |
| 🗑 Očisti        | Briše UI listu (serverski bafer nije pogođen)                             |
| ⬇ Izvezi .har   | Preuzima trenutnu filtriranu listu kao HAR datoteku                       |
| ● Snimi sesiju  | Pokreće imenovanu sesiju snimanja                                         |
| Birač profila   | Samo LLM / Prilagođeni hostovi / Sve                                      |
| Filter hosta    | Podudaranje podstringa u polju `host`                                     |
| Filter agenta   | Padajući meni: Sve / po agentu                                            |
| Filter statusa  | Sve / 2xx / 3xx / 4xx / 5xx / greška                                      |
| Filter izvora   | Sve / agent-bridge / custom-host / http-proxy / system-proxy / tproxy     |
| **Live** filter | Prikaži samo zahtjeve u toku (otvorene) — `liveOnly` prekidač (vidi §4.6) |

### 3.5 Paneli promjenjive veličine

- Lista i okno sa detaljima razdvojeni ručicom za prevlačenje
- Širina liste: min 280px, maks 720px, sačuvano u `localStorage` (`inspector.listWidth`)
- Sklapajuće na šinu od 48px (samo ikone); kliknite na red u šini da proširite

---

## §4 Funkcije svjesne LLM-a

### 4.1 Detektor vrste (`src/mitm/inspector/kindDetector.ts`)

Klasifikuje svaki zahtjev kao `"llm"`, `"app"` ili `"unknown"` koristeći 4 signala:

1. **Registar hostova** — ~18 poznatih LLM API hostova (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot, itd.)
2. **Obrasci putanja** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses`, itd.
3. **Oblik tijela (body)** — detektuje `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt`, `input` polja
4. **Nagovještaji User-agent-a** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` u UA stringu

Prilagođeni hostovi dodati putem Mode 2 nasljeđuju svoj `kind` iz unosa u formi (podrazumijevano `"custom"`).

### 4.2 SSE spajač (`src/mitm/inspector/sseMerger.ts`)

**Nezavisna clean-room implementacija.** Parsiranje događaja prati
[WHATWG server-sent events algoritam](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
dok rekonstrukcija prati javne [OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) i
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent)
streaming šeme.

Rekonstruiše konačnu poruku asistenta iz sirovih SSE delta događaja:

- **Anthropic**: akumulira `content_block_delta` po indeksu; obrađuje `text_delta`, `input_json_delta` (pozivi alata), `thinking_delta`
- **OpenAI**: akumulira izbore Chat Completions/pozive alata i stavke izlaza Responses API-ja
  po indeksu
- **Gemini**: akumulira `candidates[i].content.parts`
- **Unknown**: vraća sirove događaje kakvi jesu

Kartica Response prikazuje prekidač: **"Raw events ↔ Merged"**.

### 4.3 Normalizator razgovora (`src/mitm/inspector/conversationNormalizer.ts`)

**Nezavisna clean-room implementacija.** Normalizacija je definisana lokalnim black-box
ugovorima i javnim OpenAI, Anthropic i Gemini šemama poruka; ne koristi se izvorni kod implementacije uzvodno (upstream).

Pretvara OpenAI, Anthropic i Gemini formate poruka u jedinstvenu `NormalizedConversation` prije renderovanja:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // messages / contents / prompt from request body
  response: NormalizedTurn[]; // assistant response (merged via sseMerger)
  contextKey: string | null; // SHA-256 system-prompt fingerprint
}
```

Tipovi blokova: `text`, `tool_use`, `tool_result`. Kartica Conversation koristi ovaj oblik bez obzira na provajdera.

### 4.4 Bojenje ključa konteksta (`src/mitm/inspector/contextKey.ts`)

- Izračunava `SHA-256` sistemskog upita (prva `role:system` poruka, ili `system` polje, ili Gemini `systemInstruction`)
- Vraća heksadecimalni prefiks od 12 karaktera (`"a3f9c2..."`)
- Frontend mapira ključ u determinističku HSL boju za traku lijeve ivice
- **Filter "same context"**: klikom na `ctx #a3f` čip dodaje se filter za prikaz samo zahtjeva sa istim otiskom

Ovo olakšava vizuelno razlikovanje različitih "persona" ili zadataka koji se izvršavaju u istoj sesiji agenta.

### 4.5 Ekstrakcija LLM metapodataka

Za LLM zahtjeve, kartica LLM Details ekstrahuje:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // from request body or response
  messages: number; // turn count
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true if SSE response
  mappedTo: string | null; // x-omniroute-mapped header
  costEstimateUsd: number | null; // estimated cost based on OmniRoute pricing
}
```

### 4.6 Filter zahtjeva uživo (in-flight)

Polje `status` zahtjeva je `number | "in-flight" | "error"` — unos se dodaje kao
`"in-flight"` u trenutku kada zahtjev počne i **ažurira se na licu mjesta**
kada stigne odgovor (ili greška). **"Live"** prekidač na traci sa alatima
(`liveOnly`, i18n ključ `trafficInspector.liveOnly`) ograničava listu na unose
čiji je `status === "in-flight"`, omogućavajući vam da pratite otvorene konekcije u realnom vremenu.

Filter je čisti predikat na strani klijenta u
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Stanje prekidača živi u `useTrafficFilters` (hook-ovi inspektorske kontrolne table) i
kombinuje se sa ostalim filterima (profil, host, agent, izvor, status, kontekst).

### 4.7 Atribucija procesa (Linux)

Na Linuxu, svaki presretnuti zahtjev se može pripisati **izvornom lokalnom
procesu**. Dva opciona polja su dodata u `InterceptedRequest`:

```ts
pid?: number;          // originating process id (Linux only)
processName?: string;  // originating process name (Linux only)
```

`src/mitm/inspector/processAttribution.ts` mapira efemerni port _klijenta_
konekcije na PID + ime tako što:

1. Čita `/proc/net/tcp` i `/proc/net/tcp6` da pronađe socket inode za
   port (`parseProcNetTcpForInode`, čisti parser koji se može testirati putem fixture-a).
2. Skenira `/proc/<pid>/fd/` za simbolički link ka `socket:[<inode>]`.
3. Čita ime procesa iz `/proc/<pid>/comm`.

TTL keš od 1 sekunde ograničava trošak procfs skeniranja pod opterećenjem. Atribucija je
**najbolji napor (best-effort)** — bilo kakav neuspjeh se razrješava na `null` i nikada ne blokira snimanje. Na macOS/Windows sistemima funkcija vraća `null` (stub; podrška za `lsof`/`GetExtendedTcpTable` je planirana za kasnije).

---

## §5 Sesije

### 5.1 Snimanje sesije

1. Kliknite na **"● Record session"** na traci sa alatkama → unesite naziv (opciono)
2. Praćenje uživo (Live tail) se nastavlja normalno; crveni pulsirajući indikator prikazuje `◉ REC · <name> · 00:42 · 23 reqs`
3. Kliknite na **"⏹ Stop"** → snimak sesije se čuva u `inspector_sessions` + `inspector_session_requests`

### 5.2 Pregled snimljene sesije

Padajući meni **Sessions** na traci sa alatkama prikazuje sačuvane sesije. Odabirom jedne:

- Učitava se snimak sesije (zamrznuto stanje)
- Prikazuje se baner: `Viewing recorded session "<name>" — [Back to live]`
- Kartica Stats postaje dostupna sa Recharts agregatima

### 5.3 Formati za izvoz

Svaka sesija se može izvesti kao:

| Format                     | Upotreba                                                                        |
| -------------------------- | ------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Kompatibilan sa Chrome DevTools, Charles, Fiddler — uvoz za offline analizu     |
| **JSONL**                  | Jedan `InterceptedRequest` po liniji — kompatibilan sa `llm-interceptor` format |

Izvezite putem `GET /api/tools/traffic-inspector/sessions/{id}/export.har` ili dugmeta ⬇ u padajućem meniju Sessions.

---

## §6 Sigurnost

Traffic Inspector prikazuje **sav presretnuti HTTPS saobraćaj**, uključujući autorizacijska zaglavlja i tijela zahtjeva. Na snazi su sljedeće kontrole:

| Kontrola                            | Detalji                                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **LOCAL_ONLY**                      | Sve rute i WebSocket krajnja tačka su samo za loopback (primijenjeno u `routeGuard.ts` prije autorizacije)                                                                           |
| **Maskiranje tajni**                | Linearni `maskSecret()` skener rediguje RFC 6750 Bearer akreditive, ključeve sa prefiksom provajdera i dugačke neprozirne tokene prije `TrafficBuffer.push()`                        |
| **Ograničenje veličine tijela**     | Tijela > `INSPECTOR_MAX_BODY_KB` (podrazumijevano 1024 KB) se skraćuju uz obavještenje `"(truncated for performance)"`                                                               |
| **Sanitizacija zaglavlja**          | Imena su pretvorena u mala slova; framing/hop-by-hop i proxy-auth zaglavlja su odbačena; kolačići su u potpunosti redigovani; vrijednosti akreditiva se delegiraju na `maskSecret()` |
| **CSP**                             | Stroga politika sigurnosti sadržaja (Content Security Policy) na Traffic Inspector stranicama radi sprječavanja XSS-a putem umetnutih tijela odgovora                                |
| **Bez trajnog čuvanja po defaultu** | `TrafficBuffer` je u memoriji i gubi se pri ponovnom pokretanju servera. Sesije se trajno čuvaju samo kada se eksplicitno snime                                                      |

### Primijenjena stroga pravila

| Pravilo                           | Primjena                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Svi HTTP odgovori o grešci sa Traffic Inspector ruta su sanitizovani                    |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` je LOCAL_ONLY + SPAWN_CAPABLE (sistemske proxy komande) |

### Poznata ograničenja

- **System-wide proxy mode**: utiče na sve aplikacije na mašini, uključujući VPN klijente i SSO. Uvijek koristite sa tajmerom za automatsko isključivanje. Ne koristite na dijeljenim mašinama.
- **CONNECT tunnel HTTPS**: Režim 3 (HTTP_PROXY) hvata samo metapodatke tunela za HTTPS odredišta osim ako nije omogućeno TLS presretanje. Ovo je namjerno — transparentno hvatanje bez povjerenja u AgentBridge certifikat bi prekinulo TLS verifikaciju za te aplikacije.
- **Hardkodirani stringovi u nekim komponentama**: Neke UI komponente (F7/F8) imaju mali broj hardkodiranih stringova koji još nisu pokriveni i18n ključevima. Oni su dokumentovani kao poznato ograničenje u izvještaju o i18n nedostacima; biće migrirani u naknadnom prolazu. Pogođeni stringovi su dekorativne UI oznake koje ne zahtijevaju prevod za funkcionalnu upotrebu.

---

## §7 Rješavanje problema

### Prekid WebSocket veze

Ako "live tail" prikazuje "Disconnected":

1. Provjerite da li server još uvijek radi: `GET /api/tools/traffic-inspector/capture-modes`
2. Osvježite stranicu — WebSocket se ponovo povezuje i prima svježi snimak (snapshot)
3. Ako je server ponovo pokrenut, memorijski bafer je očišćen — stari unosi su nestali osim ako sesija nije snimljena

### Konflikt porta 8080

Ako se HTTP_PROXY režim ne pokrene:

```bash
lsof -i :8080    # pronađite proces
```

Promijenite port:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Sistemski proxy nije vraćen

Ako se OmniRoute sruši dok je aktivan sistemski proxy režim:

**macOS:**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux (GNOME):**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows:**

```cmd
netsh winhttp reset proxy
```

Kontrolna tabla će također ponuditi "Revert system proxy" pri sljedećem učitavanju ako detektuje da stanje baze podataka ukazuje na to da je proxy bio aktivan.

### Bafer pun

Kada bafer dostigne `INSPECTOR_BUFFER_SIZE` (podrazumijevano 1000), novi unosi zamjenjuju najstarije. Ako se važni zahtjevi gube:

- Povećajte `INSPECTOR_BUFFER_SIZE` (npr. 5000) — mijenja memoriju za zadržavanje
- Snimite sesiju da biste sačuvali relevantni prozor u bazu podataka

---

## §8 API referenca

Sve rute su `LOCAL_ONLY` (samo loopback) i `SPAWN_CAPABLE` (komande sistemskog proxyja). Pogledajte `src/server/authz/routeGuard.ts`.

Osnovna putanja: `/api/tools/traffic-inspector/`

### Upravljanje zahtjevima

| Metoda | Putanja                     | Opis                                                                                           |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Izlistaj zahtjeve (moguće filtriranje: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Detalji pojedinačnog zahtjeva                                                                  |
| DELETE | `/requests`                 | Očisti memorijski bafer                                                                        |
| POST   | `/requests/{id}/replay`     | Ponovo izvrši isti zahtjev kroz OmniRoute ruter                                                |
| PUT    | `/requests/{id}/annotation` | Sačuvaj ili ažuriraj bilješku o zahtjevu                                                       |

### WebSocket

| Metoda | Putanja | Opis                                                                                            |
| ------ | ------- | ----------------------------------------------------------------------------------------------- |
| GET    | `/ws`   | WebSocket stream uživo. Šalje `snapshot` pri povezivanju, zatim `new`/`update`/`clear` događaje |

### Izvoz

| Metoda | Putanja       | Opis                                         |
| ------ | ------------- | -------------------------------------------- |
| GET    | `/export.har` | Izvezi trenutnu filtriranu listu kao HAR 1.2 |

### Prilagođeni hostovi

| Metoda | Putanja         | Opis                                         |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/hosts`        | Izlistaj prilagođene hostove                 |
| POST   | `/hosts`        | Dodaj host (automatski uređuje `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Ukloni host                                  |
| PATCH  | `/hosts/{host}` | Prebaci status `enabled`                     |

### Režimi snimanja (Capture modes)

| Metoda | Putanja                        | Opis                                                                                            |
| ------ | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| GET    | `/capture-modes`               | Stanje AgentBridge / custom-hosts / HTTP_PROXY / system-proxy režima + `tls-intercept` prekidač |
| POST   | `/capture-modes/http-proxy`    | Pokreni/zaustavi HTTP_PROXY osluškivač (`{action: "start"\|"stop"}`)                            |
| POST   | `/capture-modes/system-proxy`  | Primijeni/vrati sistemski proxy (`{action: "apply"\|"revert"}`)                                 |
| POST   | `/capture-modes/tls-intercept` | Uključi/isključi dekripciju HTTPS tijela u proxy režimu (`{enabled: boolean}`)                  |

> **TPROXY dekripcija** (capture mode 5) se pokreće putem zasebne rute pod
> AgentBridge prefiksom — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — ne
> pod `/api/tools/traffic-inspector/`. Pogledajte
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; nije kompajlirano u `/docs`).

### Sesije

| Metoda | Putanja                     | Opis                                                                 |
| ------ | --------------------------- | -------------------------------------------------------------------- |
| POST   | `/sessions`                 | Započni snimanje (`{name?: string}`)                                 |
| PATCH  | `/sessions/{id}`            | Zaustavi ili preimenuj (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Izlistaj sve sačuvane sesije                                         |
| GET    | `/sessions/{id}`            | Snimak sesije (svi zahtjevi)                                         |
| DELETE | `/sessions/{id}`            | Obriši sesiju                                                        |
| GET    | `/sessions/{id}/export.har` | Izvezi sesiju kao HAR 1.2                                            |

### Interni unos (D4 fallback)

| Metoda | Putanja            | Opis                                                                                                                 |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| POST   | `/internal/ingest` | Prihvata presretnuti zahtjev sa `server.cjs` prolazne putanje; zahtijeva `INSPECTOR_INTERNAL_INGEST_TOKEN` zaglavlje |

Kompletne OpenAPI šeme: `docs/openapi.yaml` → tag `Traffic Inspector`.
