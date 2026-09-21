# Traffic Inspector (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector je vstavaný nástroj OmniRoute na ladenie prenosov HTTPS — nástroj podobný Charles Proxy / mitmweb / HTTP Toolkit, ktorý **rozpoznáva LLM** a **rozpoznáva agentov**. Nachádza sa na adrese `/dashboard/tools/traffic-inspector` a prijíma živé prenosy až z 5 súbežných zdrojov zachytávania.

**Umiestnenie v ovládacom paneli:** `/dashboard/tools/traffic-inspector`
**Skupina na bočnom paneli:** Nástroje (za AgentBridge)
**Pozri tiež:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge je režim zachytávania 1.

---

## §1 Prehľad

### Čím je Traffic Inspector jedinečný

| Funkcia                                                                            |  mitmweb  | Charles |  Fiddler  | **OmniRoute Traffic Inspector** |
| ---------------------------------------------------------------------------------- | :-------: | :-----: | :-------: | :-----------------------------: |
| Webové rozhranie                                                                   |     ✓     |    ✗    |     ✗     |                ✓                |
| Otvorený zdrojový kód                                                              |     ✓     |    ✗    | čiastočne |                ✓                |
| **Rozpoznávanie agentov** (vie, či požiadavka pochádza z Antigravity/Copilot/atď.) |     ✗     |    ✗    |     ✗     |                ✓                |
| **Rozpoznávanie LLM** (analyzuje formát OpenAI/Anthropic/Gemini, tokeny, model)    |     ✗     |    ✗    |     ✗     |                ✓                |
| **Viditeľné mapovanie modelov** (gemini-3-flash → claude-sonnet-4.7)               |     ✗     |    ✗    |     ✗     |                ✓                |
| **Rozdelenie latencie proxy/servera upstream**                                     | čiastočne |    ✗    |     ✗     |                ✓                |
| **Integrácia s OmniRoute** – smerovanie, záložné mechanizmy, náklady               |     ✗     |    ✗    |     ✗     |                ✓                |
| **Ladenie systémového proxy** (ľubovoľná aplikácia v zariadení)                    |     ✓     |    ✓    |     ✓     |                ✓                |
| **Zachytávanie vlastných hostiteľov** (presmerovanie DNS podľa hostiteľa)          |     ✓     |    ✓    |     ✓     |                ✓                |
| **Režim premennej prostredia HTTP_PROXY**                                          |     ✓     |    ✓    |     ✓     |                ✓                |
| **Zobrazenie konverzácie** (viackolové bubliny, tool_use/tool_result)              |     ✗     |    ✗    |     ✗     |                ✓                |
| **Zlučovanie prúdu SSE** (rekonštrukcia z udalostí delta)                          |     ✗     |    ✗    |     ✗     |                ✓                |
| **Nahrávanie relácií** (pomenované, exportovateľné vo formáte .har/.jsonl)         |     ✗     |    ✓    |     ✓     |                ✓                |

### Architektúra v jednom odseku

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) je zdieľaná kruhová vyrovnávacia pamäť v operačnej pamäti (predvolene 1000 záznamov, konfigurovateľná prostredníctvom `INSPECTOR_BUFFER_SIZE`). Všetky zdroje zachytávania do nej zapisujú prostredníctvom `push()`. Trieda vyrovnávacej pamäte klasifikuje každý záznam pomocou `kindDetector.ts` (určuje, či ide o požiadavku LLM), vypočíta `contextKey` (odtlačok systémovej výzvy SHA-256) a vysiela údaje všetkým odberateľom WebSocket prostredníctvom `globalTrafficBuffer.subscribe()`. Ovládací panel sa pripája prostredníctvom `GET /api/tools/traffic-inspector/ws` a po pripojení dostane snímku, po ktorej nasledujú udalosti `new`/`update`/`clear`.

---

## §2 Režimy zachytávania

Traffic Inspector podporuje **5 súčasných zdrojov zachytávania**. Každý možno nezávisle zapnúť alebo vypnúť. Pole `source` v každom objekte `InterceptedRequest` (`src/mitm/inspector/types.ts`) má jednu z hodnôt `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` alebo `"tproxy"`.

### Režim 1 — AgentBridge (predvolený, vždy zapnutý)

**Zdroj:** Obslužné rutiny AgentBridge (`src/mitm/handlers/base.ts`)
**Mechanizmus:** Každé volanie `intercept()` v `MitmHandlerBase` zavolá pred preposlaním `hookBufferStart()` a po dokončení `hookBufferUpdate()`. Nie je potrebná žiadna dodatočná konfigurácia — funguje ihneď po spustení AgentBridge.
**Dosah:** 9 agentov IDE nakonfigurovaných v AgentBridge
**Poznámka:** Pole `source` v `InterceptedRequest` = `"agent-bridge"`

### Režim 2 — Vlastné hostiteľské názvy (presmerovanie DNS)

**Zdroj:** Používateľom definovaný zoznam hostiteľských názvov (tabuľka `inspector_custom_hosts`)
**Mechanizmus:** Pridaním hostiteľského názvu cez používateľské rozhranie sa do `/etc/hosts` pridá `127.0.0.1 <host>` (vyžaduje sudo). Existujúci server MITM služby AgentBridge (port 443) dynamicky vygeneruje certifikát SNI pre nový hostiteľský názov.
**Dosah:** Ľubovoľná aplikácia používajúca pridaný hostiteľský názov — bez potreby zmeny konfigurácie aplikácie
**Poznámka:** `source` = `"custom-host"`

Príklady použitia:

- Monitorovanie `api.openai.com` zo skriptov Pythonu
- Ladenie `my-internal-llm.company.com`
- Zachytávanie prevádzky z mobilných zariadení v rovnakej sieti (pomocou podvrhnutia ARP — pokročilé)

### Režim 3 — Poslucháč HTTP_PROXY (port 8080)

**Zdroj:** Aplikácie používajúce premenné prostredia `HTTP_PROXY`/`HTTPS_PROXY`
**Mechanizmus:** Sekundárny poslucháč na porte 8080 (`src/mitm/inspector/httpProxyServer.ts`), ktorý funguje ako štandardný explicitný HTTP/HTTPS proxy server. Prijíma tunely `CONNECT` (HTTPS) aj priame požiadavky HTTP.
**Dosah:** Ľubovoľná aplikácia, ktorá rešpektuje premennú prostredia `HTTP_PROXY` — bez zmeny DNS a bez sudo
**Poznámka:** `source` = `"http-proxy"`

```bash
# Rýchle zachytávanie pre jeden príkaz:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Trvalé zachytávanie v relácii shellu:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Obmedzenie TLS:** Tunely HTTPS `CONNECT` sa predvolene zachytávajú iba ako metadáta (hostiteľský názov, port, časovanie) — telo TLS sa nedešifruje. Ak chcete kontrolovať celé telo, zapnite prepínač „Dešifrovať HTTPS v režime proxy“ (voliteľné, vyžaduje, aby bol certifikát AgentBridge dôveryhodný).

**Konflikt portov:** Ak sa port 8080 používa, AgentBridge vráti stav 409 so štruktúrovanou chybou. Port zmeňte prostredníctvom premennej prostredia `INSPECTOR_HTTP_PROXY_PORT`.

### Režim 4 — Celosystémový proxy server (pokročilé, voliteľné)

**Zdroj:** Nastavenia proxy servera na úrovni operačného systému (vzťahujú sa na všetky aplikácie v počítači)
**Mechanizmus:** Pomocou rozhraní API operačného systému presmeruje všetku prevádzku HTTP/HTTPS cez poslucháč HTTP_PROXY:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Dosah:** Každá aplikácia v počítači, ktorá rešpektuje systémové nastavenia proxy servera
  **Poznámka:** `source` = `"system-proxy"`

**Bezpečnostné mechanizmy:**

- Časovač automatického vypnutia (predvolene 30 minút, konfigurovateľný pomocou `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Predchádzajúci stav systémového proxy servera sa uloží do databázy a pri návrate sa obnoví
- Ak používateľ počas aktívneho režimu prejde preč, ovládací panel zobrazí výzvu „Obnovuje sa systémový proxy server“
- Používateľské rozhranie zobrazuje odznak `⚠ Pokročilé` + explicitné začiarkavacie políčko na potvrdenie

### Režim 5 — Transparentné dešifrovanie TPROXY (Linux, root, voliteľné)

**Zdroj:** TPROXY jadra + smerovanie na základe politík (`src/mitm/tproxy/`)
**Mechanizmus:** Označí nové lokálne odchádzajúce pripojenia TCP smerujúce na cieľový port (predvolene `443`) v reťazci `mangle OUTPUT`, pravidlo `ip rule` presmeruje označené pakety na lokálne doručenie a cieľ `TPROXY` v reťazci `mangle PREROUTING` ich odovzdá transparentnému poslucháču (**IP_TRANSPARENT**) (predvolený port `8443`). Poslucháč ukončí TLS pomocou koncového certifikátu, ktorý dynamická certifikačná autorita vydá **na požiadanie pre každý hostiteľský názov SNI**, zachytí dešifrovanú komunikáciu a požiadavku preposiela opätovne zašifrovanú do pôvodného cieľa.
**Dosah:** **Ľubovoľné** cieľové hostiteľské názvy na cieľovom porte — bez podvrhnutia `/etc/hosts`, bez premennej prostredia `HTTP_PROXY` a bez zmeny celosystémového proxy servera. Zachytávaný proces nevyžaduje žiadnu zmenu konfigurácie, musí však dôverovať dynamickej certifikačnej autorite.
**Poznámka:** `source` = `"tproxy"`

**Požiadavky:** Iba Linux (**IP_TRANSPARENT** je dostupné iba v Linuxe), oprávnenie **CAP_NET_ADMIN** (root) a natívny doplnok N-API, ktorý sa musí zostaviť pomocou nástrojového reťazca jazyka C (`npm run build:native:tproxy`). Ak táto funkcia nie je dostupná, prepínač na ovládacom paneli je deaktivovaný a zobrazí sa popis „Dešifrovanie TPROXY vyžaduje Linux + root + natívny doplnok“. Pravidlá firewallu sa aplikujú a vracajú späť transakčne (zlyhanie nikdy nezanechá pravidlo `mangle`) a pri reštarte sa vymažú. Mechanizmus proti slučkám založený na SO_MARK zabraňuje opätovnému zachyteniu vlastného, znova zašifrovaného preposielania proxy servera.

Ide o rozsiahly podsystém s vlastnou samostatnou príručkou pre operátorov — úplný postup konfigurácie firewallu, dynamickú certifikačnú autoritu pre jednotlivé SNI + inštalátor dôveryhodného úložiska, iba lokálnu trasu, podrobnosti o mechanizme proti slučkám a konfiguračnú schému nájdete v `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiluje sa do `/docs`). Prepínač je ovládaný prostredníctvom `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (poznámka: trasa sa nachádza pod prefixom AgentBridge, nie pod prefixom Traffic Inspector).

### Porovnanie režimov zachytávania

| Režim                  | Nastavenie                         |           Sudo?            | Dosah                                     | Poznámky                                                                                                                           |
| ---------------------- | ---------------------------------- | :------------------------: | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge         | Automatické                        |   Raz (certifikát+hosts)   | 9 agentov IDE                             | Predvolene zapnuté                                                                                                                 |
| 2. Vlastné hosty       | Zadanie pre každý host             |     Áno (súbor hosts)      | Akákoľvek aplikácia používajúca daný host | Uložené v DB                                                                                                                       |
| 3. HTTP_PROXY          | `export HTTPS_PROXY=...`           |            Nie             | Aplikácie rešpektujúce prostredie         | Port 8080, predvolene bez dešifrovania TLS                                                                                         |
| 4. Celý systém         | Prepínač + potvrdenie              |            Áno             | Všetky aplikácie v počítači               | Automatické vypnutie po 30 minútach                                                                                                |
| 5. Dešifrovanie TPROXY | Prepínač (Linux + natívny doplnok) | Áno (root + inštalácia CA) | Akýkoľvek host na cieľovom porte          | Dešifruje ľubovoľné hosty; predvolene vypnuté — pozrite si `docs/security/MITM-TPROXY-DECRYPT.md` (git; nekompiluje sa do `/docs`) |

---

## §3 Používateľské rozhranie

### 3.1 Rozloženie

```
┌─ Inšpektor prevádzky ──────────────────────────────────────────────────┐
│ ┌─ Panel nástrojov zdrojov zachytávania ───────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Vlastné hosty (3)] [○ HTTP_PROXY] [○ Systém]│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Panel filtrov a ovládania ──────────────────────────────────────┐   │
│ │ Profil: (●) Len LLM  (○) Vlastné  (○) Všetky                     │   │
│ │ [⎉ Pozastaviť] [🗑 Vymazať] [⬇ .har] [● RELÁCIA REC] ● živé 482/1k│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ ZOZNAM POŽIADAVIEK (meniteľný)   ║ PANEL PODROBNOSTÍ                   ▲ │
│ ────────────────────────────── │ ║ [Konverzácia][Hlavičky][Požiadavka] │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Odpoveď][Časovanie][LLM][Štatistiky]│ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 vlastné║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Zoznam požiadaviek (ľavý panel)

- **Virtualizovaný** (`useVirtualList` + `ResizeObserver`): zvládne 1000 položiek bez zamrznutia
- **Automatické posúvanie** s prepínačom na pozastavenie počas kontroly
- **Farebne odlíšený stav**: zelená (2xx), žltá (3xx), červená (4xx/5xx), sivá (prebiehajúce)
- **Emoji agenta**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 vlastný host
- **Farebný pruh kontextu**: 1px ľavý okraj zafarbený podľa `contextKey` (SHA-256 systémovej výzvy) — vizuálne zoskupuje súvisiace konverzácie
- **Oneskorené načítanie tela**: v kartách podrobností sa sprístupní iba telo vybratej požiadavky (zabraňuje vykresľovaniu 1000 × 1MB tiel)

### 3.3 Panel podrobností — 7 kariet

| Karta               | Obsah                                                                                    | Poznámky                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Konverzácia**     | Viackolové četové bubliny (systém/používateľ/asistent + tool_use/tool_result)            | Normalizované z ľubovoľného formátu poskytovateľa; zobrazuje sa iba pre `detectedKind === "llm"`           |
| **Hlavičky**        | Tabuľky hlavičiek požiadavky a odpovede                                                  | Citlivé hlavičky (Authorization, Cookie, api-key) sú predvolene maskované; prepínač „Zobraziť tajné údaje“ |
| **Požiadavka**      | Nespracované telo, stromové zobrazenie JSON, odznak poľa modelu                          | Formátovaný JSON alebo nespracovaný text                                                                   |
| **Odpoveď**         | Nespracované telo alebo zoznam udalostí SSE; prepínač „Nespracované ↔ Zlúčené“           | Zlučovač SSE rekonštruuje konečnú správu z rozdielových udalostí                                           |
| **Časovanie**       | Časový priebeh: réžia proxy oproti latencii upstreamu                                    | Celkový čas, TTFB a veľkosť                                                                                |
| **Podrobnosti LLM** | Poskytovateľ, model, počet správ, vstupné/výstupné tokeny, odhad nákladov, mapovaný cieľ | Zobrazuje sa iba pre požiadavky LLM                                                                        |
| **Štatistiky**      | Recharts: časová os latencie, stĺpcový graf tokenov, bodový graf volaní nástrojov        | Zobrazuje sa iba vtedy, keď je načítaná zaznamenaná relácia                                                |

### 3.4 Ovládacie prvky panela nástrojov

| Ovládací prvok       | Akcia                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| ⎉ Pozastaviť         | Zastaví vykresľovanie nových požiadaviek; odznak „X nových“ sa zvyšuje                  |
| 🗑 Vymazať            | Vymaže zoznam v používateľskom rozhraní (vyrovnávacia pamäť servera zostane nedotknutá) |
| ⬇ Exportovať .har    | Stiahne aktuálny filtrovaný zoznam ako súbor HAR                                        |
| ● Zaznamenať reláciu | Spustí pomenovanú reláciu zaznamenávania                                                |
| Výber profilu        | Len LLM / Vlastné hosty / Všetky                                                        |
| Filter hosta         | Zhoda podreťazca v poli `host`                                                          |
| Filter agenta        | Rozbaľovací zoznam: Všetci / podľa agenta                                               |
| Filter stavu         | Všetky / 2xx / 3xx / 4xx / 5xx / chyba                                                  |
| Filter zdroja        | Všetky / agent-bridge / custom-host / http-proxy / system-proxy / tproxy                |
| Filter **Naživo**    | Zobrazí iba prebiehajúce (otvorené) požiadavky — prepínač `liveOnly` (pozri §4.6)       |

### 3.5 Panely s meniteľnou veľkosťou

- Zoznam a panel podrobností sú oddelené rukoväťou na ťahanie
- Šírka zoznamu: min. 280px, max. 720px, uložená v `localStorage` (`inspector.listWidth`)
- Možno ho zbaliť na 48px lištu (iba ikony); kliknutím na riadok v lište sa rozbalí

---

## §4 Funkcie zohľadňujúce LLM

### 4.1 Detektor druhu (`src/mitm/inspector/kindDetector.ts`)

Klasifikuje každú požiadavku ako `"llm"`, `"app"` alebo `"unknown"` pomocou 4 signálov:

1. **Register hostiteľov** — približne 18 známych názvov hostiteľov LLM API (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot atď.)
2. **Vzory ciest** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses` atď.
3. **Štruktúra tela** — zisťuje polia `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt`, `input`
4. **Indície používateľského agenta** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` v reťazci UA

Vlastní hostitelia pridaní prostredníctvom režimu 2 zdedia svoju hodnotu `kind` zo vstupu formulára (predvolená hodnota je `"custom"`).

### 4.2 Zlučovač SSE (`src/mitm/inspector/sseMerger.ts`)

**Nezávislá implementácia vytvorená metódou clean-room.** Analýza udalostí sa riadi
[algoritmom serverom odosielaných udalostí WHATWG](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
zatiaľ čo rekonštrukcia sa riadi verejnými schémami streamovania služieb [OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) a
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent).

Rekonštruuje výslednú správu asistenta zo surových udalostí SSE delta:

- **Anthropic**: akumuluje `content_block_delta` podľa indexu; spracúva `text_delta`, `input_json_delta` (volania nástrojov), `thinking_delta`
- **OpenAI**: akumuluje voľby/volania nástrojov Chat Completions a výstupné položky Responses API
  podľa indexu
- **Gemini**: akumuluje `candidates[i].content.parts`
- **Neznámy poskytovateľ**: vracia surové udalosti bez zmeny

Karta Response zobrazuje prepínač: **"Raw events ↔ Merged"**.

### 4.3 Normalizátor konverzácie (`src/mitm/inspector/conversationNormalizer.ts`)

**Nezávislá implementácia vytvorená metódou clean-room.** Normalizácia je definovaná lokálnymi black-box
kontraktmi a verejnými schémami správ OpenAI, Anthropic a Gemini; nepoužíva sa žiadny zdrojový
kód pôvodnej implementácie.

Pred vykreslením konvertuje formáty správ OpenAI, Anthropic a Gemini na jednotný `NormalizedConversation`:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // správy / obsah / prompt z tela požiadavky
  response: NormalizedTurn[]; // odpoveď asistenta (zlúčená prostredníctvom sseMerger)
  contextKey: string | null; // odtlačok systémového promptu SHA-256
}
```

Typy blokov: `text`, `tool_use`, `tool_result`. Karta Conversation používa túto štruktúru bez ohľadu na poskytovateľa.

### 4.4 Farebné rozlíšenie kontextového kľúča (`src/mitm/inspector/contextKey.ts`)

- Vypočíta `SHA-256` systémového promptu (prvá správa `role:system`, pole `system` alebo `systemInstruction` služby Gemini)
- Vráti 12-znakový hexadecimálny prefix (`"a3f9c2..."`)
- Frontend mapuje kľúč na deterministickú farbu HSL pre ľavý okrajový pruh
- **Filter „rovnaký kontext“**: kliknutím na štítok `ctx #a3f` sa pridá filter, ktorý zobrazí iba požiadavky s rovnakým odtlačkom

Vďaka tomu možno jednoducho vizuálne odlíšiť rôzne „persony“ alebo úlohy spustené v rovnakej relácii agenta.

### 4.5 Extrakcia metadát LLM

Pre požiadavky LLM karta LLM Details extrahuje:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // z tela požiadavky alebo odpovede
  messages: number; // počet kôl
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true, ak ide o odpoveď SSE
  mappedTo: string | null; // hlavička x-omniroute-mapped
  costEstimateUsd: number | null; // odhadované náklady podľa cien OmniRoute
}
```

### 4.6 Živý filter prebiehajúcich požiadaviek

Pole `status` požiadavky má typ `number | "in-flight" | "error"` — záznam sa
pridá ako `"in-flight"` v okamihu začatia požiadavky a **aktualizuje sa na mieste**,
keď dorazí odpoveď (alebo chyba). Prepínač **"Live"** na paneli nástrojov
(`liveOnly`, kľúč i18n `trafficInspector.liveOnly`) obmedzuje zoznam na záznamy,
ktorých `status === "in-flight"`, čo umožňuje sledovať otvorené spojenia v reálnom čase.

Filter je čistý predikát na strane klienta v
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Stav prepínača sa uchováva v `useTrafficFilters` (hooky ovládacieho panela inšpektora) a
kombinuje sa s ostatnými filtrami (profil, hostiteľ, agent, zdroj, stav, kontext).

### 4.7 Priradenie procesov (Linux)

V systéme Linux možno každú zachytenú požiadavku priradiť k **pôvodnému lokálnemu
procesu**. Do `InterceptedRequest` sa pridávajú dve voliteľné polia:

```ts
pid?: number;          // ID pôvodného procesu (iba Linux)
processName?: string;  // názov pôvodného procesu (iba Linux)
```

`src/mitm/inspector/processAttribution.ts` mapuje dočasný port _klienta_
spojenia na PID + názov takto:

1. Prečíta `/proc/net/tcp` a `/proc/net/tcp6`, aby našiel inode socketu pre daný
   port (`parseProcNetTcpForInode`, čistý parser testovateľný pomocou fixtures).
2. Prehľadá `/proc/<pid>/fd/` a nájde symbolický odkaz na `socket:[<inode>]`.
3. Prečíta názov procesu z `/proc/<pid>/comm`.

Vyrovnávacia pamäť s TTL 1 sekunda obmedzuje náklady na prehľadávanie procfs pri zaťažení. Priradenie funguje
na základe **best-effort** — akékoľvek zlyhanie sa vyhodnotí ako `null` a nikdy neblokuje zachytávanie. V systémoch
macOS/Windows funkcia vracia `null` (stub; podpora `lsof`/`GetExtendedTcpTable`
bude doplnená neskôr).

---

## §5 Relácie

### 5.1 Nahrávanie relácie

1. Kliknite na **„● Nahrať reláciu“** na paneli nástrojov → zadajte názov (voliteľné)
2. Živý výpis pokračuje normálne; červený pulzujúci indikátor zobrazuje `◉ NAHRÁVANIE · <názov> · 00:42 · 23 požiadaviek`
3. Kliknite na **„⏹ Zastaviť“** → snímka relácie sa uloží do `inspector_sessions` + `inspector_session_requests`

### 5.2 Zobrazenie nahranej relácie

Rozbaľovacia ponuka **Relácie** na paneli nástrojov obsahuje uložené relácie. Výberom relácie:

- Sa načíta snímka relácie (zmrazený stav)
- Zobrazí sa banner: `Zobrazuje sa nahraná relácia „<názov>“ — [Späť na živé zobrazenie]`
- Sprístupní sa karta Štatistiky s agregáciami Recharts

### 5.3 Formáty exportu

Každú reláciu možno exportovať v týchto formátoch:

| Formát                     | Použitie                                                                         |
| -------------------------- | -------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Kompatibilný s Chrome DevTools, Charles a Fiddler — import na offline analýzu    |
| **JSONL**                  | Jeden `InterceptedRequest` na riadok — kompatibilný s formátom `llm-interceptor` |

Exportujte prostredníctvom `GET /api/tools/traffic-inspector/sessions/{id}/export.har` alebo pomocou tlačidla ⬇ v rozbaľovacej ponuke Relácie.

---

## §6 Zabezpečenie

Traffic Inspector zobrazuje **všetku zachytenú komunikáciu HTTPS** vrátane autorizačných hlavičiek a tiel požiadaviek. Zavedené sú nasledujúce ochranné opatrenia:

| Opatrenie                       | Podrobnosti                                                                                                                                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**                  | Všetky trasy a koncový bod WebSocket sú dostupné iba cez loopback (vynucuje sa v `routeGuard.ts` pred autentifikáciou)                                                                                    |
| **Maskovanie tajných údajov**   | Lineárny skener `maskSecret()` pred volaním `TrafficBuffer.push()` odstráni prihlasovacie údaje Bearer podľa RFC 6750, kľúče s prefixom poskytovateľa a dlhé nepriehľadné tokeny                          |
| **Limit veľkosti tela**         | Telá väčšie ako `INSPECTOR_MAX_BODY_KB` (predvolene 1024 KB) sa skrátia s upozornením `„(skrátené z dôvodu výkonu)“`                                                                                      |
| **Sanitizácia hlavičiek**       | Názvy sa prevedú na malé písmená; hlavičky rámcovania/hop-by-hop a autentifikácie proxy sa odstránia; súbory cookie sa úplne začiernia; hodnoty prihlasovacích údajov sa odovzdajú funkcii `maskSecret()` |
| **CSP**                         | Striktné zásady Content Security Policy na stránkach Traffic Inspector zabraňujú útokom XSS prostredníctvom vložených tiel odpovedí                                                                       |
| **Predvolene bez perzistencie** | `TrafficBuffer` sa uchováva v pamäti a pri reštartovaní servera sa stratí. Relácie sa ukladajú trvalo iba vtedy, keď sa explicitne nahrávajú                                                              |

### Uplatnené pevné pravidlá

| Pravidlo                          | Použitie                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Všetky chybové odpovede HTTP z trás Traffic Inspector sa sanitizujú                               |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` je LOCAL_ONLY + SPAWN_CAPABLE (príkazy systémového proxy servera) |

### Známe obmedzenia

- **Režim celosystémového proxy servera** ovplyvňuje všetky aplikácie v zariadení vrátane klientov VPN a SSO. Vždy ho používajte s časovačom automatického vypnutia. Nepoužívajte ho na zdieľaných zariadeniach.
- **HTTPS cez tunel CONNECT**: Režim 3 (HTTP_PROXY) zachytáva iba metadáta tunela pre cieľové servery HTTPS, pokiaľ nie je povolené zachytávanie TLS. Je to zámerné — transparentné zachytávanie bez dôveryhodného certifikátu AgentBridge by v týchto aplikáciách narušilo overovanie TLS.
- **Reťazce napevno zadané v niektorých komponentoch**: Niektoré komponenty používateľského rozhrania (F7/F8) obsahujú malý počet reťazcov zadaných napevno, ktoré zatiaľ nie sú pokryté kľúčmi i18n. V správe o nedostatkoch i18n sú zdokumentované ako známe obmedzenie; migrované budú v nasledujúcej fáze. Dotknuté reťazce sú dekoratívne označenia používateľského rozhrania, ktoré na funkčné používanie nevyžadujú preklad.

---

## §7 Riešenie problémov

### Odpojenie WebSocketu

Ak živý výpis zobrazuje „Odpojené“:

1. Skontrolujte, či server stále beží: `GET /api/tools/traffic-inspector/capture-modes`
2. Znova načítajte stránku — WebSocket sa znovu pripojí a prijme aktuálnu snímku
3. Ak bol server reštartovaný, vyrovnávacia pamäť v pamäti bola vymazaná — staré záznamy už nie sú dostupné, pokiaľ nebola relácia zaznamenaná

### Konflikt na porte 8080

Ak sa režim HTTP_PROXY nespustí:

```bash
lsof -i :8080    # vyhľadajte proces
```

Zmeňte port:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Systémový proxy server nebol obnovený

Ak OmniRoute zlyhá, kým je aktívny režim systémového proxy servera:

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

Ak riadiaci panel pri ďalšom načítaní zistí, že stav v DB uvádza aktívny proxy server, ponúkne aj možnosť „Obnoviť systémový proxy server“.

### Plná vyrovnávacia pamäť

Keď vyrovnávacia pamäť dosiahne veľkosť `INSPECTOR_BUFFER_SIZE` (predvolene 1000), nové záznamy postupne nahrádzajú najstaršie. Ak dochádza k strate dôležitých požiadaviek:

- Zvýšte `INSPECTOR_BUFFER_SIZE` (napr. na 5000) — vyššia spotreba pamäte výmenou za dlhšie uchovávanie
- Zaznamenajte reláciu, aby sa príslušný časový úsek uložil do DB

---

## §8 Referenčná príručka API

Všetky trasy sú `LOCAL_ONLY` (dostupné iba cez loopback) a `SPAWN_CAPABLE` (príkazy systémového proxy servera). Pozrite si `src/server/authz/routeGuard.ts`.

Základná cesta: `/api/tools/traffic-inspector/`

### Správa požiadaviek

| Metóda | Cesta                       | Popis                                                                                    |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Zoznam požiadaviek (filtrovanie: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Podrobnosti jednej požiadavky                                                            |
| DELETE | `/requests`                 | Vymazanie vyrovnávacej pamäte v pamäti                                                   |
| POST   | `/requests/{id}/replay`     | Opätovné vykonanie rovnakej požiadavky prostredníctvom smerovača OmniRoute               |
| PUT    | `/requests/{id}/annotation` | Uloženie alebo aktualizácia poznámky k požiadavke                                        |

### WebSocket

| Metóda | Cesta | Popis                                                                                          |
| ------ | ----- | ---------------------------------------------------------------------------------------------- |
| GET    | `/ws` | Živý stream WebSocketu. Pri pripojení odošle `snapshot`, potom udalosti `new`/`update`/`clear` |

### Export

| Metóda | Cesta         | Popis                                              |
| ------ | ------------- | -------------------------------------------------- |
| GET    | `/export.har` | Export aktuálneho filtrovaného zoznamu ako HAR 1.2 |

### Vlastní hostitelia

| Metóda | Cesta           | Popis                                                |
| ------ | --------------- | ---------------------------------------------------- |
| GET    | `/hosts`        | Zoznam vlastných hostiteľov                          |
| POST   | `/hosts`        | Pridanie hostiteľa (automaticky upraví `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Odstránenie hostiteľa                                |
| PATCH  | `/hosts/{host}` | Prepnutie `enabled`                                  |

### Režimy zachytávania

| Metóda | Cesta                          | Popis                                                                                                               |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| GET    | `/capture-modes`               | Stav režimov AgentBridge / vlastných hostiteľov / HTTP_PROXY / systémového proxy servera + prepínač `tls-intercept` |
| POST   | `/capture-modes/http-proxy`    | Spustenie/zastavenie poslucháča HTTP_PROXY (`{action: "start"\|"stop"}`)                                            |
| POST   | `/capture-modes/system-proxy`  | Použitie/obnovenie systémového proxy servera (`{action: "apply"\|"revert"}`)                                        |
| POST   | `/capture-modes/tls-intercept` | Prepnutie dešifrovania tela HTTPS v režime proxy servera (`{enabled: boolean}`)                                     |

> **Dešifrovanie TPROXY** (režim zachytávania 5) sa ovláda prostredníctvom **samostatnej** trasy pod
> predponou AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — nie
> pod `/api/tools/traffic-inspector/`. Pozrite si
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; nie je skompilované do `/docs`).

### Relácie

| Metóda | Cesta                       | Popis                                                                       |
| ------ | --------------------------- | --------------------------------------------------------------------------- |
| POST   | `/sessions`                 | Spustenie zaznamenávania (`{name?: string}`)                                |
| PATCH  | `/sessions/{id}`            | Zastavenie alebo premenovanie (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Zoznam všetkých uložených relácií                                           |
| GET    | `/sessions/{id}`            | Snímka relácie (všetky požiadavky)                                          |
| DELETE | `/sessions/{id}`            | Odstránenie relácie                                                         |
| GET    | `/sessions/{id}/export.har` | Export relácie ako HAR 1.2                                                  |

### Interný príjem (záložné riešenie D4)

| Metóda | Cesta              | Popis                                                                                                              |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| POST   | `/internal/ingest` | Prijíma zachytenú požiadavku z priechodnej cesty `server.cjs`; vyžaduje hlavičku `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Úplné schémy OpenAPI: `docs/openapi.yaml` → značka `Traffic Inspector`.
