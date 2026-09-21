# Traffic Inspector (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector je v OmniRoute vgrajeni razhroščevalnik prometa HTTPS — orodje, podobno Charles Proxy / mitmweb / HTTP Toolkit, ki **razume LLM-je** in **agente**. Nahaja se na `/dashboard/tools/traffic-inspector` in prejema promet v živo iz največ 5 sočasnih virov zajema.

**Lokacija na nadzorni plošči:** `/dashboard/tools/traffic-inspector`
**Skupina v stranski vrstici:** Orodja (za AgentBridge)
**Glejte tudi:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge je način zajema 1.

---

## §1 Pregled

### Po čem je Traffic Inspector edinstven

| Funkcija                                                                                         | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| ------------------------------------------------------------------------------------------------ | :-----: | :-----: | :-----: | :-----------------------------: |
| Spletni vmesnik                                                                                  |    ✓    |    ✗    |    ✗    |                ✓                |
| Odprtokoden                                                                                      |    ✓    |    ✗    |  delno  |                ✓                |
| **Razume agente** (ve, ali zahteva prihaja iz Antigravity/Copilot/itd.)                          |    ✗    |    ✗    |    ✗    |                ✓                |
| **Razume LLM-je** (razčleni obliko OpenAI/Anthropic/Gemini, žetone in model)                     |    ✗    |    ✗    |    ✗    |                ✓                |
| **Vidna preslikava modelov** (gemini-3-flash → claude-sonnet-4.7)                                |    ✗    |    ✗    |    ✗    |                ✓                |
| **Ločena zakasnitev posredniškega in nadrejenega strežnika**                                     |  delno  |    ✗    |    ✗    |                ✓                |
| **Integracija z usmerjanjem, nadomestnimi možnostmi in stroški OmniRoute**                       |    ✗    |    ✗    |    ✗    |                ✓                |
| **Sistemsko razhroščevanje prek posredniškega strežnika** (katera koli aplikacija v računalniku) |    ✓    |    ✓    |    ✓    |                ✓                |
| **Zajem gostiteljev po meri** (preusmeritev DNS za posameznega gostitelja)                       |    ✓    |    ✓    |    ✓    |                ✓                |
| **Način okoljske spremenljivke HTTP_PROXY**                                                      |    ✓    |    ✓    |    ✓    |                ✓                |
| **Pogled pogovora** (večizmenični oblački, tool_use/tool_result)                                 |    ✗    |    ✗    |    ✗    |                ✓                |
| **Združevalnik toka SSE** (rekonstrukcija iz dogodkov delta)                                     |    ✗    |    ✗    |    ✗    |                ✓                |
| **Snemanje sej** (poimenovane seje, izvozljive v .har/.jsonl)                                    |    ✗    |    ✓    |    ✓    |                ✓                |

### Arhitektura v enem odstavku

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) je skupni krožni medpomnilnik v pomnilniku (privzeto 1000 vnosov, nastavljivo prek `INSPECTOR_BUFFER_SIZE`). Vsi viri zajema vanj zapisujejo prek `push()`. Razred medpomnilnika razvrsti vsak vnos z uporabo `kindDetector.ts` (ugotovi, ali gre za zahtevo LLM), izračuna `contextKey` (prstni odtis sistemskega poziva SHA-256) in podatke prek `globalTrafficBuffer.subscribe()` oddaja vsem naročnikom WebSocket. Nadzorna plošča se poveže prek `GET /api/tools/traffic-inspector/ws` ter ob povezavi prejme posnetek stanja, nato pa dogodke `new`/`update`/`clear`.

---

## §2 Načini zajema

Traffic Inspector podpira **5 sočasnih virov zajema**. Vsakega je mogoče neodvisno vklopiti ali izklopiti. Polje `source` pri vsakem objektu `InterceptedRequest` (`src/mitm/inspector/types.ts`) ima eno od vrednosti `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` ali `"tproxy"`.

### Način 1 — AgentBridge (privzeto, vedno vklopljen)

**Vir:** Obdelovalniki AgentBridge (`src/mitm/handlers/base.ts`)
**Mehanizem:** Vsak klic `intercept()` v `MitmHandlerBase` pred posredovanjem pokliče `hookBufferStart()`, ob zaključku pa `hookBufferUpdate()`. Dodatna konfiguracija ni potrebna — deluje takoj, ko se AgentBridge izvaja.
**Doseg:** 9 agentov IDE, konfiguriranih v AgentBridge
**Opomba:** Polje `source` v `InterceptedRequest` = `"agent-bridge"`

### Način 2 — Gostitelji po meri (preusmeritev DNS)

**Vir:** Uporabniško določen seznam gostiteljev (tabela `inspector_custom_hosts`)
**Mehanizem:** Dodajanje gostitelja prek uporabniškega vmesnika doda `127.0.0.1 <host>` v `/etc/hosts` (zahteva sudo). Obstoječi strežnik MITM AgentBridge (vrata 443) dinamično ustvari potrdilo SNI za novega gostitelja.
**Doseg:** Katera koli aplikacija, ki uporablja dodanega gostitelja — sprememba konfiguracije aplikacije ni potrebna
**Opomba:** `source` = `"custom-host"`

Primeri uporabe:

- Spremljanje `api.openai.com` iz skriptov Python
- Odpravljanje napak za `my-internal-llm.company.com`
- Zajem prometa iz mobilnih naprav v istem omrežju (prek ponarejanja ARP — napredno)

### Način 3 — Poslušalnik HTTP_PROXY (vrata 8080)

**Vir:** Aplikacije, ki uporabljajo okoljski spremenljivki `HTTP_PROXY`/`HTTPS_PROXY`
**Mehanizem:** Sekundarni poslušalnik na vratih 8080 (`src/mitm/inspector/httpProxyServer.ts`), ki deluje kot standardni eksplicitni posredniški strežnik HTTP/HTTPS. Sprejema tunele `CONNECT` (HTTPS) in neposredne zahteve HTTP.
**Doseg:** Katera koli aplikacija, ki upošteva okoljsko spremenljivko `HTTP_PROXY` — brez spremembe DNS in brez sudo
**Opomba:** `source` = `"http-proxy"`

```bash
# Hiter zajem za en sam ukaz:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Trajni zajem v seji lupine:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Omejitev TLS:** Tuneli HTTPS `CONNECT` se privzeto zajemajo samo kot metapodatki (gostitelj, vrata, časovni podatki) — vsebina TLS ni dešifrirana. Za popoln pregled vsebine omogočite stikalo »Dešifriraj HTTPS v načinu posredniškega strežnika« (izbirno, zahteva, da je potrdilo AgentBridge zaupanja vredno).

**Spor vrat:** Če so vrata 8080 v uporabi, AgentBridge vrne stanje 409 s strukturirano napako. Vrata spremenite prek okoljske spremenljivke `INSPECTOR_HTTP_PROXY_PORT`.

### Način 4 — Sistemski posredniški strežnik (napredno, izbirno)

**Vir:** Nastavitve posredniškega strežnika na ravni operacijskega sistema (veljajo za vse aplikacije v napravi)
**Mehanizem:** Za preusmeritev celotnega prometa HTTP/HTTPS skozi poslušalnik HTTP_PROXY uporablja API-je operacijskega sistema:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Doseg:** Vsaka aplikacija v napravi, ki upošteva sistemske nastavitve posredniškega strežnika
  **Opomba:** `source` = `"system-proxy"`

**Varnostni mehanizmi:**

- Časovnik za samodejni izklop (privzeto 30 min, nastavljivo prek `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Prejšnje stanje sistemskega posredniškega strežnika se shrani v podatkovno zbirko in obnovi ob povrnitvi
- Če uporabnik zapusti stran, ko je funkcija aktivna, nadzorna plošča prikaže poziv »Povrnitev sistemskega posredniškega strežnika«
- Uporabniški vmesnik prikaže značko `⚠ Napredno` in izrecno potrditveno polje

### Način 5 — Transparentno dešifriranje TPROXY (Linux, root, izbirno)

**Vir:** Jedrni TPROXY + usmerjanje na podlagi pravil (`src/mitm/tproxy/`)
**Mehanizem:** Nove lokalne odhodne povezave TCP do ciljnih vrat (privzeto `443`) označi v `mangle OUTPUT`, pravilo `ip rule` označene pakete preusmeri v lokalno dostavo, cilj `TPROXY` v `mangle PREROUTING` pa jih preda transparentnemu poslušalniku (**IP_TRANSPARENT**) (privzeta vrata `8443`). Poslušalnik zaključi TLS z listnim potrdilom, ki ga dinamični overitelj potrdil izda **na zahtevo za vsako ime gostitelja SNI posebej**, zajame dešifrirano izmenjavo in zahtevo znova šifrirano posreduje prvotnemu cilju.
**Doseg:** **Poljubni** ciljni gostitelji na ciljnih vratih — brez ponarejanja `/etc/hosts`, brez okoljske spremenljivke `HTTP_PROXY` in brez spreminjanja sistemskega posredniškega strežnika. Prestrezani proces ne potrebuje spremembe konfiguracije, vendar mora zaupati dinamičnemu overitelju potrdil.
**Opomba:** `source` = `"tproxy"`

**Zahteve:** Samo Linux (**IP_TRANSPARENT** je na voljo samo v Linuxu), zmožnost **CAP_NET_ADMIN** (root) in izvorni dodatek N-API, ki ga je treba prevesti z orodno verigo C (`npm run build:native:tproxy`). Kadar ni na voljo, je stikalo na nadzorni plošči onemogočeno z opisom orodja »Dešifriranje TPROXY zahteva Linux + root + izvorni dodatek«. Pravila požarnega zidu se uveljavijo/povrnejo transakcijsko (sesutje nikoli ne pusti pravila `mangle`) in se ob ponovnem zagonu odstranijo. Mehanizem proti zanki, ki temelji na SO_MARK, preprečuje, da bi bilo znova šifrirano posredovanje samega posredniškega strežnika ponovno prestreženo.

To je obsežen podsistem z lastnim namenskim vodnikom za upravljavce — za celoten recept požarnega zidu, dinamičnega overitelja potrdil za posamezni SNI z namestitvenim programom za shrambo zaupanja, samo lokalno pot, podrobnosti mehanizma proti zanki in konfiguracijsko shemo glejte `docs/security/MITM-TPROXY-DECRYPT.md` (git; ni prevedeno v `/docs`). Stikalo upravljajo `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (opomba: pot je pod predpono AgentBridge in ne pod predpono Traffic Inspector).

### Primerjava načinov zajema

| Način                  | Nastavitev                        |           Sudo?           | Doseg                                                | Opombe                                                                                                                            |
| ---------------------- | --------------------------------- | :-----------------------: | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge         | Samodejno                         |  Enkrat (potrdilo+hosts)  | 9 agentov IDE                                        | Privzeto vklopljeno                                                                                                               |
| 2. Gostitelji po meri  | Vnos za posameznega gostitelja    |    Da (datoteka hosts)    | Katera koli aplikacija, ki uporablja tega gostitelja | Shranjeno v podatkovni zbirki                                                                                                     |
| 3. HTTP_PROXY          | `export HTTPS_PROXY=...`          |            Ne             | Aplikacije, ki upoštevajo okoljske spremenljivke     | Vrata 8080, privzeto brez dešifriranja TLS                                                                                        |
| 4. Sistemsko           | Preklop + potrditev               |            Da             | Vse aplikacije v računalniku                         | Samodejni izklop po 30 minutah                                                                                                    |
| 5. Dešifriranje TPROXY | Preklop (Linux + izvorni dodatek) | Da (root + namestitev CA) | Kateri koli gostitelj na ciljnih vratih              | Dešifrira poljubne gostitelje; privzeto izklopljeno — glejte `docs/security/MITM-TPROXY-DECRYPT.md` (git; ni vključeno v `/docs`) |

---

## §3 Uporabniški vmesnik

### 3.1 Postavitev

```
┌─ Nadzornik prometa ──────────────────────────────────────────────────┐
│ ┌─ Orodna vrstica virov zajema ──────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Gostitelji po meri (3)] [○ HTTP_PROXY] [○ Sistem]│
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Vrstica filtrov in kontrolnikov ──────────────────────────────┐   │
│ │ Profil: (●) Samo LLM  (○) Po meri  (○) Vse                      │   │
│ │ [⎉ Premor] [🗑 Počisti] [⬇ .har] [● SNEM. seja]  ● v živo 482/1k│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ SEZNAM ZAHTEV (spremenljiva širina)║ PODOKNO S PODROBNOSTMI            ▲ │
│ ────────────────────────────── │ ║ [Pogovor][Glave][Zahteva]           │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Odgovor][Čas][LLM][Statistika]      │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 po meri║                                       │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Seznam zahtev (levo podokno)

- **Virtualiziran** (`useVirtualList` + `ResizeObserver`): obravnava 1000 elementov brez zamrznitve
- **Samodejno pomikanje** s preklopnim gumbom za začasno ustavitev med pregledovanjem
- **Barvno označeno stanje**: zelena (2xx), rumena (3xx), rdeča (4xx/5xx), siva (v teku)
- **Emodži agenta**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 gostitelj po meri
- **Barvna vrstica konteksta**: 1px levi rob, obarvan glede na `contextKey` (SHA-256 sistemskega poziva) — vizualno združuje povezane pogovore
- **Leno nalaganje telesa**: v zavihkih s podrobnostmi se materializira samo telo izbrane zahteve (preprečuje upodabljanje 1000 × 1 MB velikih teles)

### 3.3 Podokno s podrobnostmi — 7 zavihkov

| Zavihek             | Vsebina                                                                                               | Opombe                                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Pogovor**         | Večizmenični pogovorni oblački (system/user/assistant + tool_use/tool_result)                         | Normalizirano iz oblike katerega koli ponudnika; prikazano samo za `detectedKind === "llm"`         |
| **Glave**           | Tabeli glav zahteve in odgovora                                                                       | Občutljive glave (Authorization, Cookie, api-key) so privzeto prikrite; preklop »Pokaži skrivnosti« |
| **Zahteva**         | Neobdelano telo, drevesni pogled JSON, značka polja modela                                            | Lepo oblikovan JSON ali neobdelano besedilo                                                         |
| **Odgovor**         | Neobdelano telo ali seznam dogodkov SSE; preklop »Neobdelano ↔ Združeno«                              | Združevalnik SSE iz dogodkov delta rekonstruira končno sporočilo                                    |
| **Čas**             | Časovni potek: režijski čas posredniškega strežnika v primerjavi z zakasnitvijo nadrejenega strežnika | Skupni čas, TTFB in velikost                                                                        |
| **Podrobnosti LLM** | Ponudnik, model, število sporočil, vhodni/izhodni žetoni, ocena stroškov, preslikani cilj             | Prikazano samo za zahteve LLM                                                                       |
| **Statistika**      | Recharts: časovnica zakasnitev, stolpčni grafikon žetonov, raztreseni diagram klicev orodij           | Prikazano samo, ko je naložena posneta seja                                                         |

### 3.4 Kontrolniki orodne vrstice

| Kontrolnik        | Dejanje                                                                             |
| ----------------- | ----------------------------------------------------------------------------------- |
| ⎉ Premor          | Ustavi upodabljanje novih zahtev; značka »X novih« se povečuje                      |
| 🗑 Počisti         | Počisti seznam v uporabniškem vmesniku (medpomnilnik strežnika ostane nespremenjen) |
| ⬇ Izvozi .har     | Prenese trenutno filtrirani seznam kot datoteko HAR                                 |
| ● Posnemi sejo    | Začne poimenovano sejo snemanja                                                     |
| Izbirnik profila  | Samo LLM / Gostitelji po meri / Vse                                                 |
| Filter gostitelja | Ujemanje podniza v polju `host`                                                     |
| Filter agenta     | Spustni seznam: Vsi / po agentu                                                     |
| Filter stanja     | Vse / 2xx / 3xx / 4xx / 5xx / napaka                                                |
| Filter vira       | Vse / agent-bridge / custom-host / http-proxy / system-proxy / tproxy               |
| Filter **V živo** | Prikaže samo zahteve v teku (odprte) — preklop `liveOnly` (glejte §4.6)             |

### 3.5 Podokna s spremenljivo velikostjo

- Seznam in podokno s podrobnostmi ločuje ročica za vlečenje
- Širina seznama: najmanj 280px, največ 720px, shranjeno v `localStorage` (`inspector.listWidth`)
- Mogoče ga je strniti v 48px široko vrstico (samo ikone); klik vrstice v strnjeni vrstici jo razširi

---

## §4 Funkcije, prilagojene LLM-jem

### 4.1 Zaznavalnik vrste (`src/mitm/inspector/kindDetector.ts`)

Vsako zahtevo razvrsti kot `"llm"`, `"app"` ali `"unknown"` z uporabo 4 signalov:

1. **Register gostiteljev** — približno 18 znanih imen gostiteljev API-jev LLM (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot itd.)
2. **Vzorci poti** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses` itd.
3. **Struktura telesa** — zazna polja `messages[]` (OpenAI/Claude), `contents[]` (Gemini), `prompt`, `input`
4. **Namigi uporabniškega agenta** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` v nizu UA

Gostitelji po meri, dodani prek načina 2, podedujejo svojo vrednost `kind` iz vnosa v obrazcu (privzeto `"custom"`).

### 4.2 Združevalnik SSE (`src/mitm/inspector/sseMerger.ts`)

**Neodvisna implementacija, razvita od začetka.** Razčlenjevanje dogodkov sledi
[algoritmu WHATWG za dogodke, ki jih pošilja strežnik](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
rekonstrukcija pa javnim pretočnim shemam za [OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) in
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent).

Iz neobdelanih dogodkov razlik SSE rekonstruira končno sporočilo pomočnika:

- **Anthropic**: zbira `content_block_delta` po indeksu; obravnava `text_delta`, `input_json_delta` (klice orodij), `thinking_delta`
- **OpenAI**: zbira izbire in klice orodij Chat Completions ter izhodne elemente Responses API
  po indeksu
- **Gemini**: zbira `candidates[i].content.parts`
- **Neznano**: vrne neobdelane dogodke brez sprememb

Zavihek Response prikazuje preklopnik: **»Neobdelani dogodki ↔ Združeno«**.

### 4.3 Normalizator pogovora (`src/mitm/inspector/conversationNormalizer.ts`)

**Neodvisna implementacija, razvita od začetka.** Normalizacija je opredeljena z lokalnimi pogodbami
črne skrinjice in javnimi shemami sporočil OpenAI, Anthropic in Gemini; uporabljena ni nobena
izvorna koda nadrejene implementacije.

Oblike sporočil OpenAI, Anthropic in Gemini pred izrisom pretvori v enoten `NormalizedConversation`:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // sporočila/vsebina/poziv iz telesa zahteve
  response: NormalizedTurn[]; // odgovor pomočnika (združen prek sseMerger)
  contextKey: string | null; // prstni odtis sistemskega poziva SHA-256
}
```

Vrste blokov: `text`, `tool_use`, `tool_result`. Zavihek Conversation uporablja to strukturo ne glede na ponudnika.

### 4.4 Barvno označevanje ključa konteksta (`src/mitm/inspector/contextKey.ts`)

- Izračuna `SHA-256` sistemskega poziva (prvo sporočilo `role:system`, polje `system` ali Gemini `systemInstruction`)
- Vrne 12-mestno šestnajstiško predpono (`"a3f9c2..."`)
- Uporabniški vmesnik ključ preslika v deterministično barvo HSL za črto levega roba
- **Filter »isti kontekst«**: klik na oznako `ctx #a3f` doda filter, ki prikaže samo zahteve z enakim prstnim odtisom

To omogoča preprosto vizualno razlikovanje različnih »osebnosti« ali opravil, ki se izvajajo v isti seji agenta.

### 4.5 Pridobivanje metapodatkov LLM

Za zahteve LLM zavihek LLM Details pridobi:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // iz telesa zahteve ali odgovora
  messages: number; // število izmenjav
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true, če gre za odgovor SSE
  mappedTo: string | null; // glava x-omniroute-mapped
  costEstimateUsd: number | null; // ocenjeni strošek na podlagi cen OmniRoute
}
```

### 4.6 Filter aktivnih zahtev v živo

Polje `status` zahteve je `number | "in-flight" | "error"` — vnos je
dodan kot `"in-flight"` takoj ob začetku zahteve in **posodobljen na mestu**,
ko prispe odgovor (ali napaka). Preklopnik **»V živo«** v orodni vrstici
(`liveOnly`, ključ i18n `trafficInspector.liveOnly`) omeji seznam na vnose,
pri katerih je `status === "in-flight"`, kar omogoča spremljanje odprtih povezav v realnem času.

Filter je čisti predikat na strani odjemalca v
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Stanje preklopnika se hrani v `useTrafficFilters` (programski priključki nadzorne plošče pregledovalnika) in
se združuje z drugimi filtri (profil, gostitelj, agent, vir, stanje, kontekst).

### 4.7 Pripisovanje procesa (Linux)

V sistemu Linux je mogoče vsako prestreženo zahtevo pripisati **izvornemu lokalnemu
procesu**. V `InterceptedRequest` sta dodani dve izbirni polji:

```ts
pid?: number;          // ID izvornega procesa (samo Linux)
processName?: string;  // ime izvornega procesa (samo Linux)
```

`src/mitm/inspector/processAttribution.ts` preslika efemerna vrata _odjemalca_
povezave v PID in ime tako, da:

1. Prebere `/proc/net/tcp` in `/proc/net/tcp6`, da poišče inode vtičnice za
   vrata (`parseProcNetTcpForInode`, čisti razčlenjevalnik, ki ga je mogoče preizkušati s testnimi podatki).
2. Pregleda `/proc/<pid>/fd/` in poišče simbolno povezavo do `socket:[<inode>]`.
3. Prebere ime procesa iz `/proc/<pid>/comm`.

Predpomnilnik s TTL 1 sekunde omejuje strošek pregledovanja procfs pod obremenitvijo. Pripisovanje je
izvedeno **po najboljših močeh** — vsaka napaka se razreši v `null` in nikoli ne blokira zajema. V
sistemih macOS/Windows funkcija vrne `null` (nadomestna implementacija; podpora za `lsof`/`GetExtendedTcpTable`
je predvidena v nadaljnjem razvoju).

---

## §5 Seje

### 5.1 Snemanje seje

1. V orodni vrstici kliknite **"● Snemaj sejo"** → vnesite ime (izbirno)
2. Sprotni prikaz se nadaljuje kot običajno; rdeč utripajoči indikator prikazuje `◉ SNEM · <ime> · 00:42 · 23 zahtev`
3. Kliknite **"⏹ Ustavi"** → posnetek seje se shrani v `inspector_sessions` + `inspector_session_requests`

### 5.2 Ogled posnete seje

Spustni meni **Seje** v orodni vrstici prikazuje shranjene seje. Ko izberete eno:

- Naloži se posnetek seje (zamrznjeno stanje)
- Prikaže se pasica: `Ogled posnete seje "<ime>" — [Nazaj na prikaz v živo]`
- Zavihek Statistika postane na voljo z agregati Recharts

### 5.3 Oblike izvoza

Vsako sejo je mogoče izvoziti kot:

| Oblika                     | Uporaba                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Združljivo z orodji Chrome DevTools, Charles in Fiddler — uvoz za analizo brez povezave |
| **JSONL**                  | En `InterceptedRequest` na vrstico — združljivo z obliko `llm-interceptor`              |

Izvozite prek `GET /api/tools/traffic-inspector/sessions/{id}/export.har` ali z gumbom ⬇ v spustnem meniju Seje.

---

## §6 Varnost

Traffic Inspector prikazuje **ves prestreženi promet HTTPS**, vključno z glavami za avtorizacijo in telesi zahtev. Vzpostavljeni so naslednji nadzorni mehanizmi:

| Nadzorni mehanizem                      | Podrobnosti                                                                                                                                                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **LOCAL_ONLY**                          | Vse poti in končna točka WebSocket so omejene na povratno zanko (uveljavljeno v `routeGuard.ts` pred preverjanjem pristnosti)                                                                                                  |
| **Maskiranje skrivnosti**               | Linearni pregledovalnik `maskSecret()` prekrije poverilnice Bearer po RFC 6750, ključe s predponami ponudnikov in dolge neprosojne žetone pred `TrafficBuffer.push()`                                                          |
| **Omejitev velikosti telesa**           | Telesa, večja od `INSPECTOR_MAX_BODY_KB` (privzeto 1024 KB), so skrajšana z obvestilom `"(skrajšano zaradi zmogljivosti)"`                                                                                                     |
| **Čiščenje glav**                       | Imena so pretvorjena v male črke; glave za uokvirjanje/medposredniške skoke in preverjanje pristnosti posredniškega strežnika so odstranjene; piškotki so v celoti prekriti; vrednosti poverilnic se obdelajo z `maskSecret()` |
| **CSP**                                 | Stroga politika Content Security Policy na straneh Traffic Inspector preprečuje XSS prek vstavljenih teles odgovorov                                                                                                           |
| **Privzeto brez trajnega shranjevanja** | `TrafficBuffer` je v pomnilniku in se ob ponovnem zagonu strežnika izgubi. Seje se trajno shranijo samo, ko je snemanje izrecno omogočeno                                                                                      |

### Uveljavljena stroga pravila

| Pravilo                           | Uporaba                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Vsi odgovori z napakami HTTP s poti Traffic Inspector so očiščeni                                         |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` je LOCAL_ONLY + SPAWN_CAPABLE (ukazi sistemskega posredniškega strežnika) |

### Znane omejitve

- **Način sistemskega posredniškega strežnika** vpliva na vse aplikacije v napravi, vključno z odjemalci VPN in SSO. Vedno ga uporabljajte s časovnikom za samodejni izklop. Ne uporabljajte ga v napravah v skupni rabi.
- **HTTPS prek tunela CONNECT**: Način 3 (HTTP_PROXY) za cilje HTTPS zajame samo metapodatke tunela, razen če je omogočeno prestrezanje TLS. To je načrtovano vedenje — pregledno zajemanje brez zaupanja certifikatu AgentBridge bi v teh aplikacijah povzročilo neuspešno preverjanje TLS.
- **Trdo kodirani nizi v nekaterih komponentah**: Nekatere komponente uporabniškega vmesnika (F7/F8) vsebujejo manjše število trdo kodiranih nizov, ki še niso zajeti s ključi i18n. Ti so v poročilu o vrzelih i18n dokumentirani kot znana omejitev; preneseni bodo v naslednjem koraku. Zadevni nizi so okrasne oznake uporabniškega vmesnika, ki jih za funkcionalno uporabo ni treba prevesti.

---

## §7 Odpravljanje težav

### Prekinitev povezave WebSocket

Če sprotni prikaz pokaže »Povezava prekinjena«:

1. Preverite, ali strežnik še vedno deluje: `GET /api/tools/traffic-inspector/capture-modes`
2. Znova naložite stran — WebSocket se znova poveže in prejme nov posnetek stanja
3. Če je bil strežnik znova zagnan, je bil medpomnilnik v pomnilniku izbrisan — stari vnosi niso več na voljo, razen če je bila seja posneta

### Spor vrat 8080

Če se način HTTP_PROXY ne zažene:

```bash
lsof -i :8080    # poiščite proces
```

Spremenite vrata:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Sistemski posredniški strežnik ni bil povrnjen

Če se OmniRoute zruši, ko je aktiven način sistemskega posredniškega strežnika:

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

Nadzorna plošča bo ob naslednjem nalaganju ponudila tudi možnost »Povrni sistemski posredniški strežnik«, če zazna, da stanje v podatkovni zbirki kaže, da je bil posredniški strežnik aktiven.

### Poln medpomnilnik

Ko medpomnilnik doseže `INSPECTOR_BUFFER_SIZE` (privzeto 1000), novi vnosi izrinejo najstarejše. Če se pomembne zahteve izgubljajo:

- Povečajte `INSPECTOR_BUFFER_SIZE` (npr. na 5000) — večja poraba pomnilnika v zameno za daljše hranjenje
- Posnemite sejo, da se ustrezno časovno okno trajno shrani v podatkovno zbirko

---

## §8 Referenca API-ja

Vse poti so `LOCAL_ONLY` (samo za povratno zanko) in `SPAWN_CAPABLE` (ukazi sistemskega posredniškega strežnika). Glejte `src/server/authz/routeGuard.ts`.

Osnovna pot: `/api/tools/traffic-inspector/`

### Upravljanje zahtev

| Metoda | Pot                         | Opis                                                                                            |
| ------ | --------------------------- | ----------------------------------------------------------------------------------------------- |
| GET    | `/requests`                 | Seznam zahtev (z možnostjo filtriranja: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET    | `/requests/{id}`            | Podrobnosti posamezne zahteve                                                                   |
| DELETE | `/requests`                 | Izprazni medpomnilnik v pomnilniku                                                              |
| POST   | `/requests/{id}/replay`     | Znova izvede isto zahtevo prek usmerjevalnika OmniRoute                                         |
| PUT    | `/requests/{id}/annotation` | Shrani ali posodobi opombo pri zahtevi                                                          |

### WebSocket

| Metoda | Pot   | Opis                                                                                      |
| ------ | ----- | ----------------------------------------------------------------------------------------- |
| GET    | `/ws` | Sprotni tok WebSocket. Ob povezavi pošlje `snapshot`, nato dogodke `new`/`update`/`clear` |

### Izvoz

| Metoda | Pot           | Opis                                          |
| ------ | ------------- | --------------------------------------------- |
| GET    | `/export.har` | Izvozi trenutni filtrirani seznam kot HAR 1.2 |

### Gostitelji po meri

| Metoda | Pot             | Opis                                           |
| ------ | --------------- | ---------------------------------------------- |
| GET    | `/hosts`        | Prikaže seznam gostiteljev po meri             |
| POST   | `/hosts`        | Doda gostitelja (samodejno uredi `/etc/hosts`) |
| DELETE | `/hosts/{host}` | Odstrani gostitelja                            |
| PATCH  | `/hosts/{host}` | Preklopi `enabled`                             |

### Načini zajemanja

| Metoda | Pot                            | Opis                                                                                                                               |
| ------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/capture-modes`               | Stanje načinov AgentBridge / gostiteljev po meri / HTTP_PROXY / sistemskega posredniškega strežnika in preklopnika `tls-intercept` |
| POST   | `/capture-modes/http-proxy`    | Zažene/ustavi poslušalnik HTTP_PROXY (`{action: "start"\|"stop"}`)                                                                 |
| POST   | `/capture-modes/system-proxy`  | Uveljavi/povrne sistemski posredniški strežnik (`{action: "apply"\|"revert"}`)                                                     |
| POST   | `/capture-modes/tls-intercept` | Preklopi dešifriranje telesa HTTPS v načinu posredniškega strežnika (`{enabled: boolean}`)                                         |

> **Dešifriranje TPROXY** (način zajemanja 5) se upravlja prek **ločene** poti pod
> predpono AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — in ne
> pod `/api/tools/traffic-inspector/`. Glejte
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; ni prevedeno v `/docs`).

### Seje

| Metoda | Pot                         | Opis                                                                |
| ------ | --------------------------- | ------------------------------------------------------------------- |
| POST   | `/sessions`                 | Začne snemanje (`{name?: string}`)                                  |
| PATCH  | `/sessions/{id}`            | Ustavi ali preimenuje (`{action: "stop"\|"rename", name?: string}`) |
| GET    | `/sessions`                 | Prikaže vse shranjene seje                                          |
| GET    | `/sessions/{id}`            | Posnetek seje (vse zahteve)                                         |
| DELETE | `/sessions/{id}`            | Izbriše sejo                                                        |
| GET    | `/sessions/{id}/export.har` | Izvozi sejo kot HAR 1.2                                             |

### Notranji vnos (rezervna možnost D4)

| Metoda | Pot                | Opis                                                                                                      |
| ------ | ------------------ | --------------------------------------------------------------------------------------------------------- |
| POST   | `/internal/ingest` | Sprejme prestreženo zahtevo s prehodne poti `server.cjs`; zahteva glavo `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Celotne sheme OpenAPI: `docs/openapi.yaml` → oznaka `Traffic Inspector`.
