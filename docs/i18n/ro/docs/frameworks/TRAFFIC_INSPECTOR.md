# Traffic Inspector (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector este depanatorul de trafic HTTPS încorporat în OmniRoute — un instrument similar cu Charles Proxy / mitmweb / HTTP Toolkit, care este **conștient de LLM-uri** și **conștient de agenți**. Se află la `/dashboard/tools/traffic-inspector` și primește trafic în timp real de la până la 5 surse de captură simultane.

**Locație în dashboard:** `/dashboard/tools/traffic-inspector`
**Grup în bara laterală:** Instrumente (după AgentBridge)
**Consultați și:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge este modul de captură 1.

---

## §1 Prezentare generală

### Ce face ca Traffic Inspector să fie unic

| Funcționalitate                                                                                 | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| ----------------------------------------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----------------------------: |
| Bazat pe web                                                                                    |    ✓    |    ✗    |    ✗    |                ✓                |
| Cu sursă deschisă                                                                               |    ✓    |    ✗    | parțial |                ✓                |
| **Conștient de agenți** (știe dacă solicitarea provine de la Antigravity/Copilot/etc.)          |    ✗    |    ✗    |    ✗    |                ✓                |
| **Conștient de LLM-uri** (analizează structura OpenAI/Anthropic/Gemini, tokenurile și modelul)  |    ✗    |    ✗    |    ✗    |                ✓                |
| **Maparea modelelor este vizibilă** (gemini-3-flash → claude-sonnet-4.7)                        |    ✗    |    ✗    |    ✗    |                ✓                |
| **Separarea latenței proxy-ului și a serviciului upstream**                                     | parțial |    ✗    |    ✗    |                ✓                |
| **Integrat cu rutarea, mecanismul de rezervă și costurile OmniRoute**                           |    ✗    |    ✗    |    ✗    |                ✓                |
| **Depanare proxy la nivelul întregului sistem** (orice aplicație de pe dispozitiv)              |    ✓    |    ✓    |    ✓    |                ✓                |
| **Captură pentru gazde personalizate** (redirecționare DNS pentru fiecare gazdă)                |    ✓    |    ✓    |    ✓    |                ✓                |
| **Mod prin variabila de mediu HTTP_PROXY**                                                      |    ✓    |    ✓    |    ✓    |                ✓                |
| **Vizualizare conversație** (bule pentru interacțiuni în mai multe etape, tool_use/tool_result) |    ✗    |    ✗    |    ✗    |                ✓                |
| **Îmbinarea fluxurilor SSE** (reconstruire din evenimente delta)                                |    ✗    |    ✗    |    ✗    |                ✓                |
| **Înregistrarea sesiunilor** (cu nume, exportabilă ca .har/.jsonl)                              |    ✗    |    ✓    |    ✓    |                ✓                |

### Arhitectura într-un singur paragraf

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) este un buffer circular partajat în memorie (implicit 1000 de intrări, configurabil prin `INSPECTOR_BUFFER_SIZE`). Toate sursele de captură scriu în acesta prin `push()`. Clasa buffer clasifică fiecare intrare folosind `kindDetector.ts` (determină dacă este o solicitare LLM), calculează un `contextKey` (amprenta SHA-256 a promptului de sistem) și transmite către toți abonații WebSocket prin `globalTrafficBuffer.subscribe()`. Dashboardul se conectează prin `GET /api/tools/traffic-inspector/ws` și primește un instantaneu la conectare, urmat de evenimentele `new`/`update`/`clear`.

---

## §2 Moduri de capturare

Traffic Inspector acceptă **5 surse de capturare simultane**. Fiecare poate fi activată sau dezactivată independent. Câmpul `source` din fiecare `InterceptedRequest` (`src/mitm/inspector/types.ts`) are una dintre valorile `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` sau `"tproxy"`.

### Modul 1 — AgentBridge (implicit, activ permanent)

**Sursă:** Handlerele AgentBridge (`src/mitm/handlers/base.ts`)
**Mecanism:** Fiecare apel `intercept()` din `MitmHandlerBase` apelează `hookBufferStart()` înainte de redirecționare și `hookBufferUpdate()` la finalizare. Nu necesită nicio configurare suplimentară — funcționează imediat ce AgentBridge rulează.
**Acoperire:** Cei 9 agenți IDE configurați în AgentBridge
**Notă:** Câmpul `source` din `InterceptedRequest` = `"agent-bridge"`

### Modul 2 — Gazde personalizate (redirecționare DNS)

**Sursă:** Lista de gazde definită de utilizator (tabelul `inspector_custom_hosts`)
**Mecanism:** Adăugarea unei gazde prin interfața cu utilizatorul adaugă `127.0.0.1 <host>` în `/etc/hosts` (necesită sudo). Serverul MITM AgentBridge existent (portul 443) generează dinamic un certificat SNI pentru noua gazdă.
**Acoperire:** Orice aplicație care utilizează gazda adăugată — nu este necesară modificarea configurației aplicației
**Notă:** `source` = `"custom-host"`

Exemple de utilizare:

- Monitorizarea `api.openai.com` din scripturi Python
- Depanarea `my-internal-llm.company.com`
- Capturarea traficului de la dispozitive mobile din aceeași rețea (prin falsificare ARP — avansat)

### Modul 3 — Listener HTTP_PROXY (portul 8080)

**Sursă:** Aplicații care utilizează variabilele de mediu `HTTP_PROXY`/`HTTPS_PROXY`
**Mecanism:** Listener secundar pe portul 8080 (`src/mitm/inspector/httpProxyServer.ts`), care funcționează ca un proxy explicit HTTP/HTTPS standard. Acceptă tuneluri `CONNECT` (HTTPS) și cereri HTTP directe.
**Acoperire:** Orice aplicație care respectă variabila de mediu `HTTP_PROXY` — fără modificări DNS, fără sudo
**Notă:** `source` = `"http-proxy"`

```bash
# Capturare rapidă pentru o singură comandă:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Capturare persistentă într-o sesiune shell:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Limitare TLS:** Tunelurile HTTPS `CONNECT` sunt capturate doar ca metadate (gazdă, port, temporizare) — conținutul TLS nu este decriptat în mod implicit. Activați opțiunea „Decriptare HTTPS în modul proxy” (opțională, necesită ca certificatul AgentBridge să fie considerat de încredere) pentru inspectarea completă a conținutului.

**Conflict de port:** Dacă portul 8080 este utilizat, AgentBridge returnează un răspuns 409 cu o eroare structurată. Schimbați portul prin variabila de mediu `INSPECTOR_HTTP_PROXY_PORT`.

### Modul 4 — Proxy la nivel de sistem (avansat, opțional)

**Sursă:** Setările proxy la nivelul sistemului de operare (se aplică tuturor aplicațiilor de pe dispozitiv)
**Mecanism:** Utilizează API-urile sistemului de operare pentru a redirecționa tot traficul HTTP/HTTPS prin listenerul HTTP_PROXY:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Acoperire:** Fiecare aplicație de pe dispozitiv care respectă setările proxy ale sistemului
  **Notă:** `source` = `"system-proxy"`

**Mecanisme de siguranță:**

- Temporizator pentru dezactivare automată (implicit 30 de minute, configurabil prin `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Starea anterioară a proxy-ului de sistem este salvată în baza de date și restaurată la revenire
- Panoul de control afișează mesajul „Se restabilește proxy-ul de sistem” dacă utilizatorul părăsește pagina cât timp acesta este activ
- Interfața cu utilizatorul afișează insigna `⚠ Avansat` + o casetă de selectare pentru confirmare explicită

### Modul 5 — Decriptare transparentă TPROXY (Linux, root, opțională)

**Sursă:** TPROXY din nucleu + rutare bazată pe politici (`src/mitm/tproxy/`)
**Mecanism:** Marchează în `mangle OUTPUT` noile conexiuni TCP locale de ieșire către un port țintă (implicit `443`), o regulă `ip rule` redirecționează pachetele marcate către livrarea locală, iar ținta `TPROXY` din `mangle PREROUTING` le transmite unui listener transparent (**IP_TRANSPARENT**) (port implicit `8443`). Listenerul termină TLS folosind un certificat final emis **la cerere, pentru fiecare nume de gazdă SNI**, de către o CA dinamică, capturează schimbul de date decriptat și redirecționează cererea, recriptată, către destinația inițială.
**Acoperire:** Gazde de destinație **arbitrare** de pe portul țintă — fără falsificarea `/etc/hosts`, fără variabila de mediu `HTTP_PROXY`, fără modificarea proxy-ului la nivel de sistem. Procesul interceptat nu necesită modificări de configurare, dar trebuie să acorde încredere CA-ului dinamic.
**Notă:** `source` = `"tproxy"`

**Cerințe:** Exclusiv Linux (**IP_TRANSPARENT** este disponibil numai pe Linux), capabilitatea **CAP_NET_ADMIN** (root) și un addon N-API nativ care trebuie compilat cu un lanț de instrumente C (`npm run build:native:tproxy`). Când acestea nu sunt disponibile, comutatorul din panoul de control este dezactivat și afișează indicația „Decriptarea TPROXY necesită Linux + root + addonul nativ”. Regulile firewall sunt aplicate/restabilite tranzacțional (o oprire neașteptată nu lasă niciodată în urmă o regulă `mangle`) și sunt eliminate la repornire. Un mecanism anti-buclă bazat pe SO_MARK împiedică reinterceptarea traficului redirecționat și recriptat de proxy.

Acesta este un subsistem complex, cu propriul ghid dedicat operatorului — consultați `docs/security/MITM-TPROXY-DECRYPT.md` (git; neinclus în versiunea compilată din `/docs`) pentru rețeta firewall completă, CA-ul dinamic per SNI + programul de instalare în depozitul de încredere, ruta exclusiv locală, detaliile mecanismului anti-buclă și schema de configurare. Comutatorul este controlat prin `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (notă: ruta se află sub prefixul AgentBridge, nu sub prefixul Traffic Inspector).

### Comparația modurilor de capturare

| Mod                   | Configurare                     |           Sudo?           | Acoperire                                    | Note                                                                                                                                 |
| --------------------- | ------------------------------- | :-----------------------: | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1. AgentBridge        | Automată                        | O dată (certificat+hosts) | 9 agenți IDE                                 | Activat implicit                                                                                                                     |
| 2. Custom Hosts       | Introducere pentru fiecare host |    Da (fișierul hosts)    | Orice aplicație care utilizează acel host    | Persistat în baza de date                                                                                                            |
| 3. HTTP_PROXY         | `export HTTPS_PROXY=...`        |            Nu             | Aplicații care respectă variabilele de mediu | Portul 8080, fără decriptare TLS în mod implicit                                                                                     |
| 4. La nivel de sistem | Comutare + confirmare           |            Da             | Toate aplicațiile de pe sistem               | Dezactivare automată în 30 de minute                                                                                                 |
| 5. Decriptare TPROXY  | Comutare (Linux + addon nativ)  | Da (root + instalare CA)  | Orice host de pe portul țintă                | Decriptează hosturi arbitrare; dezactivată implicit — consultați `docs/security/MITM-TPROXY-DECRYPT.md` (git; necompilat în `/docs`) |

---

## §3 Interfață

### 3.1 Aspect

```
┌─ Inspector de trafic ──────────────────────────────────────────────────┐
│ ┌─ Bara surselor de captură ───────────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Gazde personalizate (3)]  [○ HTTP_PROXY]     │   │
│ │ [○ Sistem]                                                    │   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Bara de filtrare/control ───────────────────────────────────────┐   │
│ │ Profil: (●) Doar LLM  (○) Personalizat  (○) Toate                │   │
│ │ [⎉ Pauză] [🗑 Șterge] [⬇ .har] [● ÎNREG. sesiune] ● live 482/1k│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ LISTĂ CERERI (redimensionabilă)  ║ PANOU DE DETALII                    ▲ │
│ ────────────────────────────── │ ║ [Conversație][Antete][Cerere]       │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Răspuns][Temporizare][LLM][Statistici]│ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 personalizat ║                                 │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Lista de cereri (panoul din stânga)

- **Virtualizată** (`useVirtualList` + `ResizeObserver`): gestionează 1000 de elemente fără să se blocheze
- **Derulare automată**, cu opțiune de întrerupere în timpul inspectării
- **Stare codificată prin culori**: verde (2xx), galben (3xx), roșu (4xx/5xx), gri (în curs)
- **Emoji pentru agent**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 gazdă personalizată
- **Bară colorată pentru context**: bordură stângă de 1px, colorată în funcție de `contextKey` (SHA-256 al promptului de sistem) — grupează vizual conversațiile asociate
- **Corp încărcat la cerere**: numai corpul cererii selectate este materializat în filele de detalii (evită randarea a 1000 × 1MB de corpuri)

### 3.3 Panoul de detalii — 7 file

| Filă            | Conținut                                                                                                               | Note                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Conversație** | Bule de chat pentru mai multe replici (system/user/assistant + tool_use/tool_result)                                   | Normalizate din formatul oricărui furnizor; afișate numai pentru `detectedKind === "llm"`               |
| **Antete**      | Tabele cu antetele cererii și răspunsului                                                                              | Antetele sensibile (Authorization, Cookie, api-key) sunt mascate implicit; opțiune „Afișează secretele” |
| **Cerere**      | Corp brut, vizualizare JSON arborescentă, insignă pentru câmpul modelului                                              | JSON formatat lizibil sau text brut                                                                     |
| **Răspuns**     | Corp brut sau listă de evenimente SSE; comutator „Brut ↔ Combinat”                                                     | Componenta de combinare SSE reconstruiește mesajul final din evenimentele delta                         |
| **Temporizare** | Diagramă în cascadă: costul suplimentar al proxy-ului comparativ cu latența serviciului din amonte                     | Total, TTFB și dimensiune                                                                               |
| **Detalii LLM** | Furnizor, model, număr de mesaje, tokenuri de intrare/ieșire, cost estimat, destinație mapată                          | Afișate numai pentru cererile LLM                                                                       |
| **Statistici**  | Recharts: cronologia latenței, diagramă cu bare pentru tokenuri, diagramă de dispersie pentru apelurile instrumentelor | Afișate numai când este încărcată o sesiune înregistrată                                                |

### 3.4 Comenzile barei de instrumente

| Comandă                  | Acțiune                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------- |
| ⎉ Pauză                  | Oprește randarea cererilor noi; se acumulează o insignă „X noi”                       |
| 🗑 Șterge                 | Șterge lista din interfață (memoria tampon a serverului nu este afectată)             |
| ⬇ Exportă .har           | Descarcă lista filtrată curentă ca fișier HAR                                         |
| ● Înregistrează sesiunea | Începe o sesiune de înregistrare denumită                                             |
| Selector de profil       | Doar LLM / Gazde personalizate / Toate                                                |
| Filtru de gazdă          | Potrivire de subșir pentru câmpul `host`                                              |
| Filtru de agent          | Listă derulantă: Toți / per agent                                                     |
| Filtru de stare          | Toate / 2xx / 3xx / 4xx / 5xx / eroare                                                |
| Filtru de sursă          | Toate / agent-bridge / custom-host / http-proxy / system-proxy / tproxy               |
| Filtru **Live**          | Afișează numai cererile în curs (deschise) — comutatorul `liveOnly` (consultați §4.6) |

### 3.5 Panouri redimensionabile

- Lista și panoul de detalii sunt separate printr-un mâner de tragere
- Lățimea listei: minimum 280px, maximum 720px, păstrată în `localStorage` (`inspector.listWidth`)
- Se poate restrânge la o bară de 48px (numai pictograme); faceți clic pe un rând din bară pentru extindere

---

## §4 Funcționalități adaptate pentru LLM

### 4.1 Detector de tip (`src/mitm/inspector/kindDetector.ts`)

Clasifică fiecare solicitare drept `"llm"`, `"app"` sau `"unknown"` folosind 4 semnale:

1. **Registrul gazdelor** — aproximativ 18 nume de gazdă cunoscute pentru API-uri LLM (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot etc.)
2. **Modele de cale** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses` etc.
3. **Structura corpului** — detectează câmpurile `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt`, `input`
4. **Indicii din user-agent** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` în șirul UA

Gazdele personalizate adăugate prin Modul 2 își moștenesc valoarea `kind` din formular (valoarea implicită este `"custom"`).

### 4.2 Combinator SSE (`src/mitm/inspector/sseMerger.ts`)

**Implementare independentă, de tip clean-room.** Parsarea evenimentelor urmează
[algoritmul WHATWG pentru evenimente trimise de server](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
iar reconstrucția urmează schemele publice de streaming pentru [OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) și
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent).

Reconstruiește mesajul final al asistentului din evenimentele delta SSE brute:

- **Anthropic**: acumulează `content_block_delta` după index; gestionează `text_delta`, `input_json_delta` (apeluri de instrumente), `thinking_delta`
- **OpenAI**: acumulează opțiunile/apelurile de instrumente Chat Completions și elementele de ieșire Responses API
  după index
- **Gemini**: acumulează `candidates[i].content.parts`
- **Necunoscut**: returnează evenimentele brute fără modificări

Fila Răspuns afișează un comutator: **„Evenimente brute ↔ Combinate”**.

### 4.3 Normalizator de conversații (`src/mitm/inspector/conversationNormalizer.ts`)

**Implementare independentă, de tip clean-room.** Normalizarea este definită prin contracte
black-box locale și schemele publice de mesaje OpenAI, Anthropic și Gemini; nu este utilizat
niciun cod-sursă din implementarea din amonte.

Convertește formatele de mesaje OpenAI, Anthropic și Gemini într-un singur `NormalizedConversation` înainte de randare:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // mesaje / conținuturi / prompt din corpul solicitării
  response: NormalizedTurn[]; // răspunsul asistentului (combinat prin sseMerger)
  contextKey: string | null; // amprenta SHA-256 a promptului de sistem
}
```

Tipuri de blocuri: `text`, `tool_use`, `tool_result`. Fila Conversație utilizează această structură indiferent de furnizor.

### 4.4 Colorizarea cheii de context (`src/mitm/inspector/contextKey.ts`)

- Calculează `SHA-256` pentru promptul de sistem (primul mesaj `role:system`, câmpul `system` sau `systemInstruction` din Gemini)
- Returnează un prefix hexazecimal de 12 caractere (`"a3f9c2..."`)
- Interfața mapează cheia la o culoare HSL deterministă pentru bara de pe marginea stângă
- **Filtrul „același context”**: un clic pe eticheta `ctx #a3f` adaugă un filtru pentru a afișa numai solicitările cu aceeași amprentă

Astfel, diferitele „personaje” sau sarcini care rulează în aceeași sesiune a agentului pot fi distinse vizual cu ușurință.

### 4.5 Extragerea metadatelor LLM

Pentru solicitările LLM, fila Detalii LLM extrage:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // din corpul solicitării sau din răspuns
  messages: number; // numărul de replici
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true dacă răspunsul este SSE
  mappedTo: string | null; // antetul x-omniroute-mapped
  costEstimateUsd: number | null; // cost estimat pe baza tarifelor OmniRoute
}
```

### 4.6 Filtru în timp real pentru solicitările în curs

Câmpul `status` al solicitării este `number | "in-flight" | "error"` — o intrare este
adăugată ca `"in-flight"` în momentul în care solicitarea începe și este **actualizată pe loc**
când sosește răspunsul (sau eroarea). Comutatorul **„În timp real”** din bara de instrumente
(`liveOnly`, cheia i18n `trafficInspector.liveOnly`) restricționează lista la intrările
al căror `status === "in-flight"`, permițându-vă să urmăriți conexiunile deschise în timp real.

Filtrul este un predicat pur, executat în partea de client, în
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Starea comutatorului se află în `useTrafficFilters` (hook-urile tabloului de bord al inspectorului) și
se combină cu celelalte filtre (profil, gazdă, agent, sursă, stare, context).

### 4.7 Atribuirea procesului (Linux)

Pe Linux, fiecare solicitare interceptată poate fi atribuită **procesului local
de origine**. Două câmpuri opționale sunt adăugate în `InterceptedRequest`:

```ts
pid?: number;          // ID-ul procesului de origine (numai Linux)
processName?: string;  // numele procesului de origine (numai Linux)
```

`src/mitm/inspector/processAttribution.ts` mapează portul efemer al _clientului_
conexiunii la un PID și un nume prin:

1. Citirea `/proc/net/tcp` și `/proc/net/tcp6` pentru a găsi inode-ul socketului asociat
   portului (`parseProcNetTcpForInode`, un parser pur, testabil cu fixture-uri).
2. Scanarea `/proc/<pid>/fd/` pentru o legătură simbolică spre `socket:[<inode>]`.
3. Citirea numelui procesului din `/proc/<pid>/comm`.

Un cache TTL de 1 secundă limitează costul scanării procfs în condiții de încărcare. Atribuirea se face
pe baza **celui mai bun efort** — orice eșec se rezolvă la `null` și nu blochează niciodată capturarea. Pe
macOS/Windows, funcția returnează `null` (stub; suportul pentru `lsof`/`GetExtendedTcpTable`
va fi adăugat ulterior).

---

## §5 Sesiuni

### 5.1 Înregistrarea unei sesiuni

1. Faceți clic pe **„● Înregistrați sesiunea”** în bara de instrumente → introduceți un nume (opțional)
2. Fluxul în timp real continuă în mod normal; un indicator roșu pulsatoriu afișează `◉ ÎNREG. · <nume> · 00:42 · 23 cereri`
3. Faceți clic pe **„⏹ Oprire”** → instantaneul sesiunii este salvat în `inspector_sessions` + `inspector_session_requests`

### 5.2 Vizualizarea unei sesiuni înregistrate

Lista derulantă **Sesiuni** din bara de instrumente afișează sesiunile salvate. Selectarea uneia:

- Încarcă instantaneul sesiunii (stare înghețată)
- Un banner afișează: `Se vizualizează sesiunea înregistrată „<nume>” — [Înapoi la fluxul în timp real]`
- Fila Statistici devine disponibilă, cu agregări Recharts

### 5.3 Formate de export

Fiecare sesiune poate fi exportată astfel:

| Format                     | Utilizare                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **HAR** (HTTP Archive 1.2) | Compatibil cu Chrome DevTools, Charles, Fiddler — importați-l pentru analiză offline |
| **JSONL**                  | Câte un `InterceptedRequest` pe linie — compatibil cu formatul `llm-interceptor`     |

Exportați prin `GET /api/tools/traffic-inspector/sessions/{id}/export.har` sau folosind butonul ⬇ din lista derulantă Sesiuni.

---

## §6 Securitate

Traffic Inspector afișează **tot traficul HTTPS interceptat**, inclusiv antetele de autorizare și corpurile cererilor. Sunt implementate următoarele măsuri de control:

| Măsură de control                  | Detalii                                                                                                                                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**                     | Toate rutele și endpointul WebSocket sunt accesibile numai prin interfața loopback (restricție aplicată în `routeGuard.ts` înainte de autentificare)                                                                       |
| **Mascarea secretelor**            | Scanerul liniar `maskSecret()` maschează datele de autentificare Bearer RFC 6750, cheile cu prefix de furnizor și tokenurile opace lungi înainte de `TrafficBuffer.push()`                                                 |
| **Limitarea dimensiunii corpului** | Corpurile > `INSPECTOR_MAX_BODY_KB` (implicit 1024 KB) sunt trunchiate și primesc notificarea `„(trunchiat pentru performanță)”`                                                                                           |
| **Igienizarea antetelor**          | Numele sunt convertite la litere mici; antetele de încadrare/hop-by-hop și de autentificare proxy sunt eliminate; cookie-urile sunt mascate integral; valorile datelor de autentificare sunt delegate către `maskSecret()` |
| **CSP**                            | O politică strictă de securitate a conținutului pe paginile Traffic Inspector pentru a preveni atacurile XSS prin corpuri de răspuns injectate                                                                             |
| **Fără persistență implicită**     | `TrafficBuffer` este păstrat în memorie și se pierde la repornirea serverului. Sesiunile sunt păstrate numai atunci când sunt înregistrate în mod explicit                                                                 |

### Reguli stricte aplicate

| Regulă                            | Aplicare                                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Toate răspunsurile de eroare HTTP de la rutele Traffic Inspector sunt igienizate                    |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` este LOCAL_ONLY + SPAWN_CAPABLE (comenzi pentru proxy-ul de sistem) |

### Limitări cunoscute

- **Modul proxy la nivel de sistem** afectează toate aplicațiile de pe dispozitiv, inclusiv clienții VPN și SSO. Utilizați-l întotdeauna cu temporizatorul de dezactivare automată. Nu îl utilizați pe dispozitive partajate.
- **Tunel HTTPS CONNECT**: Modul 3 (HTTP_PROXY) capturează numai metadatele tunelului pentru destinațiile HTTPS, cu excepția cazului în care interceptarea TLS este activată. Acest lucru este intenționat — capturarea transparentă fără ca certificatul AgentBridge să fie considerat de încredere ar întrerupe verificarea TLS pentru aplicațiile respective.
- **Șiruri codificate direct în unele componente**: Unele componente UI (F7/F8) conțin un număr mic de șiruri codificate direct, care nu sunt încă acoperite de cheile i18n. Acestea sunt documentate ca limitare cunoscută în raportul privind lacunele i18n; vor fi migrate într-o etapă ulterioară. Șirurile afectate sunt etichete decorative ale interfeței, care nu necesită traducere pentru utilizarea funcțională.

---

## §7 Depanarea problemelor

### Deconectarea WebSocket

Dacă fluxul live afișează „Deconectat”:

1. Verificați dacă serverul încă rulează: `GET /api/tools/traffic-inspector/capture-modes`
2. Reîncărcați pagina — WebSocket se reconectează și primește un instantaneu nou
3. Dacă serverul a fost repornit, memoria tampon din memorie a fost golită — intrările vechi s-au pierdut, cu excepția cazului în care a fost înregistrată o sesiune

### Conflict la portul 8080

Dacă modul HTTP_PROXY nu pornește:

```bash
lsof -i :8080    # găsiți procesul
```

Schimbați portul:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Proxy-ul de sistem nu a fost dezactivat

Dacă OmniRoute se închide neașteptat în timp ce modul proxy la nivel de sistem este activ:

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

La următoarea încărcare, tabloul de bord va oferi și opțiunea „Dezactivează proxy-ul de sistem” dacă detectează că starea din baza de date indică faptul că proxy-ul era activ.

### Memorie tampon plină

Când memoria tampon atinge `INSPECTOR_BUFFER_SIZE` (valoare implicită: 1000), intrările noi le elimină pe cele mai vechi. Dacă se pierd cereri importante:

- Măriți `INSPECTOR_BUFFER_SIZE` (de exemplu, la 5000) — se utilizează mai multă memorie pentru o păstrare mai îndelungată
- Înregistrați o sesiune pentru a stoca permanent în baza de date intervalul relevant

---

## §8 Referință API

Toate rutele sunt `LOCAL_ONLY` (exclusiv prin loopback) și `SPAWN_CAPABLE` (comenzi pentru proxy-ul de sistem). Consultați `src/server/authz/routeGuard.ts`.

Cale de bază: `/api/tools/traffic-inspector/`

### Gestionarea cererilor

| Metodă | Cale                        | Descriere                                                                              |
| ------ | --------------------------- | -------------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Listează cererile (filtrabile: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Detaliile unei singure cereri                                                          |
| DELETE | `/requests`                 | Golește memoria tampon din memorie                                                     |
| POST   | `/requests/{id}/replay`     | Execută din nou aceeași cerere prin routerul OmniRoute                                 |
| PUT    | `/requests/{id}/annotation` | Salvează sau actualizează o notă asociată unei cereri                                  |

### WebSocket

| Metodă | Cale  | Descriere                                                                                    |
| ------ | ----- | -------------------------------------------------------------------------------------------- |
| GET    | `/ws` | Flux WebSocket live. Trimite `snapshot` la conectare, apoi evenimente `new`/`update`/`clear` |

### Export

| Metodă | Cale          | Descriere                                        |
| ------ | ------------- | ------------------------------------------------ |
| GET    | `/export.har` | Exportă lista filtrată curentă în format HAR 1.2 |

### Gazde personalizate

| Metodă | Cale            | Descriere                                      |
| ------ | --------------- | ---------------------------------------------- |
| GET    | `/hosts`        | Listează gazdele personalizate                 |
| POST   | `/hosts`        | Adaugă o gazdă (editează automat `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Elimină gazda                                  |
| PATCH  | `/hosts/{host}` | Comută `enabled`                               |

### Moduri de capturare

| Metodă | Cale                           | Descriere                                                                                                       |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/capture-modes`               | Starea modurilor AgentBridge / gazde personalizate / HTTP_PROXY / proxy de sistem + comutatorul `tls-intercept` |
| POST   | `/capture-modes/http-proxy`    | Pornește/oprește ascultătorul HTTP_PROXY (`{action: "start"\|"stop"}`)                                          |
| POST   | `/capture-modes/system-proxy`  | Aplică/dezactivează proxy-ul la nivel de sistem (`{action: "apply"\|"revert"}`)                                 |
| POST   | `/capture-modes/tls-intercept` | Comută decriptarea corpului HTTPS în modul proxy (`{enabled: boolean}`)                                         |

> **Decriptarea TPROXY** (modul de capturare 5) este controlată printr-o rută
> **separată**, aflată sub prefixul AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — nu
> sub `/api/tools/traffic-inspector/`. Consultați
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; neinclus în versiunea compilată din `/docs`).

### Sesiuni

| Metodă | Cale                        | Descriere                                                             |
| ------ | --------------------------- | --------------------------------------------------------------------- |
| POST   | `/sessions`                 | Pornește înregistrarea (`{name?: string}`)                            |
| PATCH  | `/sessions/{id}`            | Oprește sau redenumește (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Listează toate sesiunile salvate                                      |
| GET    | `/sessions/{id}`            | Instantaneul sesiunii (toate cererile)                                |
| DELETE | `/sessions/{id}`            | Șterge sesiunea                                                       |
| GET    | `/sessions/{id}/export.har` | Exportă sesiunea în format HAR 1.2                                    |

### Ingerare internă (alternativă D4)

| Metodă | Cale               | Descriere                                                                                                                  |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/internal/ingest` | Acceptă cererea interceptată din calea de trecere directă `server.cjs`; necesită antetul `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Scheme OpenAPI complete: `docs/openapi.yaml` → eticheta `Traffic Inspector`.
