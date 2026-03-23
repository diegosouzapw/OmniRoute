<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — Gateway-ul gratuit AI

### Nu opriți niciodată codificarea. Dirijare inteligentă către **modele AI GRATUITE și cu costuri reduse** cu rezervă automată.

_Proxy-ul dvs. universal API - un punct final, peste 36 de furnizori, zero timpi de nefuncționare._

**Finalizări de chat • Încorporare • Generare de imagini • Audio • Reclasificare • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Furnizor AI gratuit pentru agenții tăi preferați de codare

_Conectați orice instrument IDE sau CLI alimentat de AI prin OmniRoute — gateway API gratuit pentru codare nelimitată._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Toți agenții se conectează prin <code>http://localhost:20128/v1</code> sau <code>http://cloud.omniroute.online.online/v1 modele și cotă nelimitate</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 De ce OmniRoute?

**Nu mai risipi banii și nu mai atingeți limitele:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Cota de abonament expiră neutilizată în fiecare lună
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Limitele ratelor te opresc la mijloc de codare
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> API-uri scumpe (20-50 USD/lună per furnizor)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Comutare manuală între furnizori

**OmniRoute rezolvă asta:**

- ✅ **Maximizați abonamentele** - Urmăriți cota, utilizați fiecare bit înainte de resetare
- ✅ **Auto de rezervă** - Abonament → Cheie API → Ieftin → Gratuit, timp de nefuncționare zero
- ✅ **Multi-cont** - Round-robin între conturi pentru fiecare furnizor
- ✅ **Universal** - Funcționează cu Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, orice instrument CLI

---

## 📧 Suport

> 💬 **Alăturați-vă comunității noastre!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Obțineți ajutor, împărtășiți sfaturi și fiți la curent.

- **Site web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Proiect original**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Cum funcționează

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 Ce rezolvă OmniRoute — 30 de puncte reale de durere și cazuri de utilizare

> **Fiecare dezvoltator care folosește instrumente AI se confruntă zilnic cu aceste probleme.** OmniRoute a fost creat pentru a le rezolva pe toate - de la depășiri de costuri la blocaje regionale, de la fluxuri OAuth întrerupte la operațiuni de protocol și observabilitate a întreprinderii.

<details>
<summary><b>💸 1. „Plătesc pentru un abonament scump, dar tot sunt întrerupt de limite”</b></summary>

Dezvoltatorii plătesc 20–200 USD/lună pentru Claude Pro, Codex Pro sau GitHub Copilot. Chiar și plătind, cota are un plafon - 5 ore de utilizare, limite săptămânale sau limite de tarif pe minut. La mijlocul sesiunii de codare, furnizorul nu mai răspunde și dezvoltatorul își pierde fluxul și productivitatea.

**Cum o rezolvă OmniRoute:**

- **Smart 4-Tier Fallback** — Dacă cota de abonament se epuizează, redirecționează automat la cheia API → Ieftin → Gratuit fără intervenție manuală
- **Urmărirea cotelor în timp real** — Afișează consumul de simboluri în timp real cu numărătoarea inversă de resetare (5 ore, zilnic, săptămânal)
- **Asistență pentru mai multe conturi** — Conturi multiple per furnizor cu turneu automat automat — când unul se epuizează, trece la următorul
- **Combinații personalizate** — Lanțuri de rezervă personalizabile cu 6 strategii de echilibrare (fill-first, round-robin, P2C, aleatoriu, cel mai puțin utilizat, optimizat din punct de vedere al costurilor)
- **Cote de afaceri Codex** — Monitorizarea cotelor de spațiu de lucru pentru afaceri/echipe direct în tabloul de bord

</details>

<details>
<summary><b>🔌 2. „Trebuie să folosesc mai mulți furnizori, dar fiecare are un API diferit”</b></summary>

OpenAI folosește un format, Claude (Anthropic) folosește altul, Gemini încă altul. Dacă un dezvoltator dorește să testeze modele de la diferiți furnizori sau să se retragă între aceștia, trebuie să reconfigureze SDK-urile, să schimbe punctele finale, să se ocupe de formate incompatibile. Furnizorii personalizați (FriendLI, NIM) au puncte finale de model non-standard.

**Cum o rezolvă OmniRoute:**

- **Unified Endpoint** — Un singur `http://localhost:20128/v1` servește drept proxy pentru toți cei 36 de furnizori și mai sus
- **Traducerea formatului** — Automată și transparentă: OpenAI ↔ Claude ↔ Gemeni ↔ Responses API
- **Response Sanitization** — Elimina câmpurile nestandard (`x_groq`, `usage_breakdown`, `service_tier`) care încalcă OpenAI SDK v1.83+
- **Normalizarea rolurilor** — Convertește `developer` → `system` pentru furnizorii non-OpenAI; `system` → `user` pentru GLM/ERNIE
- **Think Tag Extraction** — Extrage blocurile `<think>` de la modele precum DeepSeek R1 în `reasoning_content` standardizat
- **Ieșire structurată pentru Gemeni** — `json_schema` → `responseMimeType`/`responseSchema` conversie automată
- **`stream` este implicit `false`** — Se aliniază cu specificațiile OpenAI, evitând SSE neașteptat în SDK-urile Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. „Furnizorul meu AI îmi blochează regiunea/țara”</b></summary>

Furnizori precum OpenAI/Codex blochează accesul din anumite regiuni geografice. Utilizatorii primesc erori precum `unsupported_country_region_territory` în timpul conexiunilor OAuth și API. Acest lucru este frustrant în special pentru dezvoltatorii din țările în curs de dezvoltare.

**Cum o rezolvă OmniRoute:**

- **3-Level Proxy Config** — Proxy configurabil la 3 niveluri: global (tot traficul), per furnizor (doar un singur furnizor) și per conexiune/cheie
- **Insigne de proxy cu coduri de culoare** — Indicatori vizuali: 🟢 proxy global, 🟡 proxy furnizor, 🔵 proxy de conexiune, indicând întotdeauna IP-ul
- **Schimb de jetoane OAuth prin proxy** — fluxul OAuth trece și prin proxy, rezolvând `unsupported_country_region_territory`
- **Teste de conexiune prin proxy** — Testele de conexiune folosesc proxy-ul configurat (nu mai este ocolire directă)
- **Support SOCKS5** — Suport complet SOCKS5 proxy pentru rutarea de ieșire
- **TLS Fingerprint Spoofing** — Amprenta TLS asemănătoare unui browser prin `wreq-js` pentru a ocoli detectarea botului

</details>

<details>
<summary><b>🆓 4. „Vreau să folosesc AI pentru codare, dar nu am bani”</b></summary>

Nu toată lumea poate plăti 20–200 USD/lună pentru abonamentele AI. Studenții, dezvoltatorii din țările emergente, pasionații și freelancerii au nevoie de acces la modele de calitate la cost zero.

**Cum o rezolvă OmniRoute:**

- **Free Tier Providers Built-in** — Suport nativ pentru furnizori 100% gratuiti: iFlow (8 modele nelimitate), Qwen (3 modele nelimitate), Kiro (Claude gratuit), Gemini CLI (180K/lună gratuit)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combinații numai gratuite** — Lanțul `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD/lună fără timp de nefuncționare
- **Credite gratuite NVIDIA NIM** — 1000 de credite gratuite integrate
- **Cost Optimized Strategy** — Strategie de rutare care alege automat cel mai ieftin furnizor disponibil

</details>

<details>
<summary><b>🔒 5. „Trebuie să-mi protejez poarta AI de accesul neautorizat”</b></summary>

Când expuneți un gateway AI în rețea (LAN, VPS, Docker), oricine are adresa poate consuma jetoanele/cota dezvoltatorului. Fără protecție, API-urile sunt vulnerabile la utilizare greșită, injectare promptă și abuz.

**Cum o rezolvă OmniRoute:**

- **Gestionarea cheilor API** — Generare, rotație și definire pentru fiecare furnizor cu o pagină dedicată `/dashboard/api-manager`
- **Permisiuni la nivel de model** — Restricționați cheile API la anumite modele (`openai/*`, modele cu caractere metalice), cu comutatorul Permite toate/Restricționați
- **API Endpoint Protection** — Solicitați o cheie pentru `/v1/models` și blocați anumiți furnizori din listă
- **Auth Guard + CSRF Protection** — Toate rutele tabloului de bord sunt protejate cu middleware `withAuth` + jetoane CSRF
- **Rate Limiter** — Limitarea ratei per-IP cu ferestre configurabile
- **Filtrare IP** — Lista permisă/lista blocată pentru controlul accesului
- **Prompt Injection Guard** — Igienizare împotriva tiparelor de prompte rău intenționate
- **Criptare AES-256-GCM** — Acreditări criptate în repaus

</details>

<details>
<summary><b>🛑 6. „Furnizorul meu a căzut și mi-am pierdut fluxul de codare”</b></summary>

Furnizorii de AI pot deveni instabili, pot returna erori 5xx sau pot atinge limitele temporare ale ratei. Dacă un dezvoltator depinde de un singur furnizor, acesta este întrerupt. Fără întreruptoare, reîncercări repetate pot bloca aplicația.

**Cum o rezolvă OmniRoute:**

- **Circuit Breaker per furnizor** - Deschidere/închidere automată cu praguri configurabile și răcire (Închis/Deschis/Pe jumătate deschis)
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Backoff exponențial** — Întârzieri progresive ale reîncercării
- **Anti-Thundering Herd** — Mutex + protecție semafor împotriva furtunilor concurente de reîncercare
- **Combo Fallback Chains** — Dacă furnizorul principal eșuează, trece automat prin lanț fără nicio intervenție
- **Combo Circuit Breaker** — Dezactivează automat furnizorii care eșuează dintr-un lanț combinat
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Tabloul de bord pentru sănătate** — Monitorizare timp de funcționare, stări întrerupătoare de circuit, blocări, statistici cache, latență p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Configurarea fiecărui instrument AI este plictisitoare și repetitivă”</b></summary>

Dezvoltatorii folosesc Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Fiecare instrument are nevoie de o configurație diferită (punct final API, cheie, model). Reconfigurarea la schimbarea de furnizor sau de model este o pierdere de timp.

**Cum o rezolvă OmniRoute:**

- **CLI Tools Dashboard** — pagină dedicată cu setare cu un singur clic pentru Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — generează `chatLanguageModels.json` pentru VS Code cu selecția în bloc a modelului
- **Onboarding Wizard** — Configurare ghidată în 4 pași pentru utilizatorii debutanți
- **Un punct final, toate modelele** — Configurați `http://localhost:20128/v1` o dată, accesați peste 36 de furnizori

</details>

<details>
<summary><b>🔑 8. „Gestionarea jetoanelor OAuth de la mai mulți furnizori este un iad” </b></summary>

Claude Code, Codex, Gemini CLI, Copilot - toate folosesc OAuth 2.0 cu token-uri care expiră. Dezvoltatorii trebuie să se reautentifice în mod constant, să se ocupe de `client_secret is missing`, `redirect_uri_mismatch` și defecțiunile de pe serverele de la distanță. OAuth pe LAN/VPS este deosebit de problematică.

**Cum o rezolvă OmniRoute:**

- **Reîmprospătare automată a simbolurilor** — jetoanele OAuth se reîmprospătează în fundal înainte de expirare
- **OAuth 2.0 (PKCE) încorporat** — Flux automat pentru Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth cu mai multe conturi** — Conturi multiple per furnizor prin extragerea jetonului JWT/ID
- **OAuth LAN/Remediere la distanță** — Detectare IP privată pentru `redirect_uri` + modul URL manual pentru servere la distanță
- **OAuth în spatele Nginx** — Utilizează `window.location.origin` pentru compatibilitatea cu proxy invers
- **Ghid OAuth la distanță** — Ghid pas cu pas pentru acreditările Google Cloud pe VPS/Docker

</details>

<details>
<summary><b>📊 9. „Nu știu cât cheltuiesc sau unde”</b></summary>

Dezvoltatorii folosesc mai mulți furnizori plătiți, dar nu au o viziune unificată asupra cheltuielilor. Fiecare furnizor are propriul tablou de bord de facturare, dar nu există o vizualizare consolidată. Costurile neașteptate se pot acumula.

**Cum o rezolvă OmniRoute:**

- **Tabloul de bord pentru analiza costurilor** — Urmărirea costurilor pe token și gestionarea bugetului per furnizor
- **Limite bugetare pe nivel** — Plafonul de cheltuieli pe nivel care declanșează o rezervă automată
- **Configurație de preț pe model** — Prețuri configurabile pe model
- **Statistici de utilizare per cheie API** — Numărul de solicitări și marcajul temporal al ultimei utilizări per cheie
- **Tabloul de bord de analiză** — Carduri cu statistici, diagramă de utilizare a modelului, tabel cu furnizori cu rate de succes și latență

</details>

<details>
<summary><b>🐛 10. „Nu pot diagnostica erorile și problemele în apelurile AI”</b></summary>

Când un apel eșuează, dezvoltatorul nu știe dacă a fost o limită de rată, un simbol expirat, un format greșit sau o eroare a furnizorului. Jurnalele fragmentate pe diferite terminale. Fără observabilitate, depanarea este o încercare și eroare.

**Cum o rezolvă OmniRoute:**

- **Tabloul de bord pentru jurnalele unificate** — 4 file: jurnalele de solicitare, jurnalele proxy, jurnalele de audit, consolă
- **Console Log Viewer** — Vizualizator în timp real în stil terminal cu niveluri codificate în culori, defilare automată, căutare, filtru
- **SQLite Proxy Logs** — Jurnale persistente care supraviețuiesc repornirilor serverului
- **Translator Playground** — 4 moduri de depanare: Playground (traducere format), Chat Tester (dus-întors), Test Bench (lot), Live Monitor (în timp real)
- **Solicitare telemetrie** — latență p50/p95/p99 + urmărire X-Request-Id
- **Înregistrare bazată pe fișiere cu rotație** — Interceptor de consolă captează totul în jurnalul JSON cu rotație bazată pe dimensiune

</details>

<details>
<summary><b>🏗️ 11. „Implementarea și întreținerea gateway-ului este complexă”</b></summary>

Instalarea, configurarea și menținerea unui proxy AI în diferite medii (local, VPS, Docker, cloud) necesită multă muncă. Probleme precum căile codificate hard, `EACCES` pe directoare, conflictele de porturi și versiunile pe mai multe platforme adaugă fricțiuni.

**Cum o rezolvă OmniRoute:**

- **npm global install** — `npm install -g omniroute && omniroute` — finalizat
- **Docker Multi-Platform** - AMD64 + ARM64 nativ (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (fără instrumente CLI) și `cli` (cu Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — aplicație nativă pentru Windows/macOS/Linux cu bară de sistem, pornire automată, mod offline
- **Split-Port Mode** — API și tablou de bord pe porturi separate pentru scenarii avansate (reverse proxy, rețea container)
- **Cloud Sync** — Configurați sincronizarea între dispozitive prin Cloudflare Workers
- **Backups DB** — Backup automat, restaurare, export și import al tuturor setărilor

</details>

<details>
<summary><b>🌍 12. „Interfața este doar în limba engleză și echipa mea nu vorbește engleză” </b></summary>

Echipele din țările care nu vorbesc engleza, în special din America Latină, Asia și Europa, se luptă cu interfețele doar în limba engleză. Barierele lingvistice reduc adoptarea și cresc erorile de configurare.

**Cum o rezolvă OmniRoute:**

- **Tabloul de bord i18n — 30 de limbi** — Toate cele peste 500 de taste traduse, inclusiv arabă, bulgară, daneză, germană, spaniolă, finlandeză, franceză, ebraică, hindi, maghiară, indoneziană, italiană, japoneză, coreeană, malay, olandeză, norvegiană, poloneză, portugheză (PT/BR), română, rusă, slovacă, suedeză, thailandeză, ucraineană, filipineză, engleză, chineză, vietnameză,
- ** Suport RTL** — Suport de la dreapta la stânga pentru arabă și ebraică
- **ReadME-uri în mai multe limbi** — 30 de traduceri complete de documentație
- **Selector de limbă** — Pictograma glob în antet pentru comutare în timp real

</details>

<details>
<summary><b>🔄 13. „Am nevoie de mai mult decât de chat — am nevoie de încorporare, imagini, audio” </b></summary>

AI nu este doar finalizarea chatului. Dezvoltatorii trebuie să genereze imagini, să transcrie sunetul, să creeze înglobări pentru RAG, să reclasifice documentele și să modereze conținutul. Fiecare API are un punct final și un format diferit.

**Cum o rezolvă OmniRoute:**

- **Embeddings** — `/v1/embeddings` cu 6 furnizori și peste 9 modele
- **Generarea imaginii** — `/v1/images/generations` cu 10 furnizori și peste 20 de modele (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) și SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Transcriere audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + furnizori existenți
- **Moderări** — `/v1/moderations` — Verificări de siguranță a conținutului
- **Reclasificare** — `/v1/rerank` — Reclasificarea relevanței documentului
- **Responses API** — Suport complet `/v1/responses` pentru Codex

</details>

<details>
<summary><b>🧪 14. „Nu am cum să testez și să compar calitatea între modele” </b></summary>

Dezvoltatorii vor să știe care model este cel mai bun pentru cazul lor de utilizare - cod, traducere, raționament - dar compararea manuală este lentă. Nu există instrumente de evaluare integrate.

**Cum o rezolvă OmniRoute:**

- **Evaluări LLM** — Testarea setului de aur cu 10 cazuri preîncărcate care acoperă salutări, matematică, geografie, generare de cod, conformitate cu JSON, traducere, reducere, refuz de siguranță
- **4 strategii de potrivire** — `exact`, `contains`, `regex`, `custom` (funcția JS)
- **Translator Playground Test Bench** — Testare în loturi cu mai multe intrări și rezultate așteptate, comparație între furnizori
- **Tester de chat** — Tur complet dus-întors cu randare vizuală a răspunsului
- **Live Monitor** — Flux în timp real al tuturor solicitărilor care circulă prin proxy

</details>

<details>
<summary><b>📈 15. „Trebuie să mă scalez fără a pierde performanța”</b></summary>

Pe măsură ce volumul cererilor crește, fără memorarea în cache aceleași întrebări generează costuri duplicate. Fara idempotenta, cererile duplicate procesarea deseurilor. Limitele de tarife pentru fiecare furnizor trebuie respectate.

**Cum o rezolvă OmniRoute:**

- **Cache semantic** — Cache-ul pe două niveluri (semnătură + semantică) reduce costurile și latența
- **Request Idempotency** — fereastră de deduplicare 5s pentru cereri identice
- **Rate Limit Detection** — RPM per furnizor, interval minim și urmărire simultană maximă
- **Limite de rată editabile** — Valori implicite configurabile în Setări → Reziliență cu persistență
- **API Key Validation Cache** — cache pe 3 niveluri pentru performanța producției
- **Tabloul de bord pentru sănătate cu telemetrie** — latență p50/p95/p99, statistici cache, timp de funcționare

</details>

<details>
<summary><b>🤖 16. „Vreau să controlez comportamentul modelului la nivel global”</b></summary>

Dezvoltatori care doresc toate răspunsurile într-o anumită limbă, cu un anumit ton sau care doresc să limiteze simbolurile de raționament. Configurarea acestui lucru în fiecare instrument/cerere nu este practică.

**Cum o rezolvă OmniRoute:**

- **System Prompt Injection** — Prompt global aplicat tuturor solicitărilor
- **Thinking Budget Validation** — Controlul raționării alocării token-ului per cerere (transmis, automat, personalizat, adaptiv)
- **6 Strategii de rutare** — Strategii globale care determină modul în care sunt distribuite cererile
- **Wildcard Router** — modelele `provider/*` sunt direcționate dinamic către orice furnizor
- **Combo Activare/Dezactivare Comutare** — Comută combo direct din tabloul de bord
- **Comutare furnizor** — Activați/dezactivați toate conexiunile pentru un furnizor cu un singur clic
- **Furnizori blocați** — Excludeți anumiți furnizori din lista `/v1/models`

</details>

<details>
<summary><b>🧰 17. „Am nevoie de instrumente MCP ca capabilități de produs de primă clasă”</b></summary>

Multe gateway-uri AI expun MCP doar ca un detaliu ascuns de implementare. Echipele au nevoie de un nivel de operare vizibil și ușor de gestionat.

**Cum o rezolvă OmniRoute:**

- MCP apare în panoul de bord de navigare și fila de protocol final
- Pagina de management MCP dedicată cu proces, instrumente, domenii și audit
- Pornire rapidă încorporată pentru `omniroute --mcp` și integrarea clientului

</details>

<details>
<summary><b>🧠 18. „Am nevoie de orchestrare A2A cu sincronizare + căi de activități de flux” </b></summary>

Fluxurile de lucru ale agenților necesită atât răspunsuri directe, cât și execuție în flux de lungă durată, cu control ciclului de viață.

**Cum o rezolvă OmniRoute:**

- Punct final A2A JSON-RPC (`POST /a2a`) cu `message/send` și `message/stream`
- Streaming SSE cu propagare a stării terminale
- API-uri pentru ciclul de viață al sarcinilor pentru `tasks/get` și `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Am nevoie de sănătate reală a procesului MCP, nu de stare ghicită” </b></summary>

Echipele operaționale trebuie să știe dacă MCP este de fapt în viață, nu doar dacă un API este accesibil.

**Cum o rezolvă OmniRoute:**

- Fișier runtime heartbeat cu PID, marcaje de timp, transport, număr de instrumente și modul de aplicare
- API de stare MCP care combină bătăile inimii + activitatea recentă
- Carduri de stare a interfeței de utilizare pentru prospețimea procesului/uptime/inima

</details>

<details>
<summary><b>📋 20. „Am nevoie de o execuție auditabilă a instrumentului MCP” </b></summary>

Când instrumentele modifică configurația sau declanșează acțiuni operaționale, echipele au nevoie de trasabilitate criminalistică.

**Cum o rezolvă OmniRoute:**

- Înregistrare de audit susținută de SQLite pentru apelurile instrumentelor MCP
- Filtrează după instrument, succes/eșec, cheie API și paginare
- Tabelul de audit al tabloului de bord + punctele finale de statistici pentru automatizare

</details>

<details>
<summary><b>🔐 21. „Am nevoie de permisiuni MCP pentru fiecare integrare” </b></summary>

Clienții diferiți ar trebui să aibă cel mai mic privilegiu de acces la categoriile de instrumente.

**Cum o rezolvă OmniRoute:**

- 9 lunete MCP granulare pentru acces controlat la instrumente
- Aplicarea domeniului de aplicare și vizibilitatea în interfața de utilizare a managementului MCP
- Poziție implicită sigură pentru instrumentele operaționale

</details>

<details>
<summary><b>⚙️ 22. „Am nevoie de controale operaționale fără redistribuire”</b></summary>

Echipele au nevoie de modificări rapide ale timpului de rulare în timpul incidentelor sau evenimentelor de cost.

**Cum o rezolvă OmniRoute:**

- Comutați activarea comboi direct din tabloul de bord MCP
- Aplicați profiluri de rezistență din pachetele de politici predefinite
- Resetați starea întreruptorului de la același panou de operare

</details>

<details>
<summary><b>🔄 23. „Am nevoie de vizibilitate și anulare a ciclului de viață a sarcinii A2A live”</b></summary>

Fără vizibilitatea ciclului de viață, incidentele sarcinilor devin greu de triat.

**Cum o rezolvă OmniRoute:**

- Listarea sarcinilor/filtrarea după stare/abilitate cu paginare
- Detaliați metadatele sarcinii, evenimentele și artefactele
- Punct final de anulare a sarcinii și acțiune UI cu confirmare

</details>

<details>
<summary><b>🌊 24. „Am nevoie de valori de flux active pentru încărcarea A2A”</b></summary>

Fluxurile de lucru în flux necesită o perspectivă operațională privind concurența și conexiunile live.

**Cum o rezolvă OmniRoute:**

- Contoare active de flux integrate în starea A2A
- Marcaj de timp pentru ultima sarcină și numărătoare pentru fiecare stat
- Carduri de bord A2A pentru monitorizarea operațiunilor în timp real

</details>

<details>
<summary><b>🪪 25. „Am nevoie de descoperire de agenți standard pentru clienți”</b></summary>

Clienții externi și orchestratorii au nevoie de metadate care pot fi citite de mașină pentru integrare.

**Cum o rezolvă OmniRoute:**

- Card de agent expus la `/.well-known/agent.json`
- Capacități și abilități afișate în UI de management
- API-ul de stare A2A include metadate de descoperire pentru automatizare

</details>

<details>
<summary><b>🧭 26. „Am nevoie de descoperirea protocolului în produsul UX”</b></summary>

Dacă utilizatorii nu pot descoperi suprafețele de protocol, calitatea adoptării și a suportului scade.

**Cum o rezolvă OmniRoute:**

- Intrări din bara laterală pentru MCP și A2A
- Pagina Endpoint Fila Protocoale cu pornire rapidă și stare
- Link-uri de la prezentare generală la tablouri de bord dedicate de management

</details>

<details>
<summary><b>🧪 27. „Am nevoie de validarea protocolului end-to-end cu clienți reali”</b></summary>

Testele simulate nu sunt suficiente pentru a valida compatibilitatea protocolului înainte de lansare.

**Cum o rezolvă OmniRoute:**

- Suita E2E care pornește aplicația și utilizează transportul clientului MCP SDK real
- Testele client A2A pentru descoperirea, trimiterea, transmiterea în flux, obținerea și anularea fluxurilor
- Verificați încrucișați afirmațiile cu auditul MCP și API-urile pentru sarcini A2A

</details>

<details>
<summary><b>📡 28. „Am nevoie de observabilitate unificată pe toate interfețele”</b></summary>

Împărțirea observabilității în funcție de protocol creează puncte oarbe și MTTR mai lung.

**Cum o rezolvă OmniRoute:**

- Tablouri de bord/jurnale/analitice unificate într-un singur produs
- Sănătate + audit + solicitare de telemetrie în straturi OpenAI, MCP și A2A
- API-uri operaționale pentru stare și automatizare

</details>

<details>
<summary><b>💼 29. „Am nevoie de un timp de rulare pentru proxy + instrumente + orchestrare agent”</b></summary>

Rularea multor servicii separate crește costurile operaționale și modurile de eșec.

**Cum o rezolvă OmniRoute:**

- Proxy compatibil OpenAI, server MCP și server A2A într-o singură stivă
- Autentificare partajată, rezistență, stocare de date și observabilitate
- Model de politică consistent pe toate suprafețele de interacțiune

</details>

<details>
<summary><b>🚀 30. „Trebuie să trimit fluxuri de lucru agentice fără extinderea codului lipici”</b></summary>

Echipele își pierd din viteza atunci când realizează mai multe servicii și scripturi ad-hoc.

**Cum o rezolvă OmniRoute:**

- Strategie unificată pentru clienți și agenți
- Interfețe de utilizare a protocolului încorporate și căi de validare a fumului
- Baze pregătite pentru producție (securitate, logare, rezistență, backup)

</details>

### Exemple de manuale (cazuri de utilizare integrate)

**Playbook A: Maximizați abonamentul plătit + backup ieftin**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: teanc de codare cu costuri zero**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: lanț alternativ permanent activ 24/7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Agentul operează cu MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Pornire rapidă

**1. Instalați la nivel global:**

```bash
npm install -g omniroute
omniroute
```

🎉 Tabloul de bord se deschide la `http://localhost:20128`

| Comanda                 | Descriere                                |
| ----------------------- | ---------------------------------------- |
| `omniroute`             | Porniți serverul (portul implicit 20128) |
| `omniroute --port 3000` | Utilizați portul personalizat            |
| `omniroute --no-open`   | Nu deschideți automat browserul          |
| `omniroute --help`      | Arată ajutor                             |

**2. Conectați un furnizor GRATUIT:**

Tabloul de bord → Furnizori → Conectare **Claude Code** sau **Antigravity** → Conectare OAuth → Gata!

**3. Utilizați în instrumentul dvs. CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Asta este!** Începeți să codați cu modele AI GRATUITE.

**Alternativă - rulează de la sursă:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute este disponibil ca imagine publică Docker pe [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Alergare rapidă:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Cu fișierul de mediu:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Utilizarea Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Imagine                  | Etichetă | Dimensiune | Descriere               |
| ------------------------ | -------- | ---------- | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | Ultima versiune stabilă |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB     | Versiunea curentă       |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Prețurile dintr-o privire

| Nivelul          | Furnizor          | Cost                         | Resetare cotă               | Cel mai bun pentru        |
| ---------------- | ----------------- | ---------------------------- | --------------------------- | ------------------------- |
| **💳 ABONARE**   | Claude Code (Pro) | 20 USD/lună                  | 5h + săptămânal             | Deja abonat               |
|                  | Codex (Plus/Pro)  | 20-200 USD/lună              | 5h + săptămânal             | Utilizatori OpenAI        |
|                  | Gemeni CLI        | **GRATIS**                   | 180K/lună + 1K/zi           | Toată lumea!              |
|                  | GitHub Copilot    | 10-19 USD/lună               | Lunar                       | utilizatorii GitHub       |
| **🔑 CHEIA API** | NVIDIA NIM        | **GRATIS** (1000 de credite) | O singură dată              | Testare gratuită la nivel |
|                  | DeepSeek          | Plată-pe-utilizare           | Niciuna                     | Cel mai bun preț/calitate |
|                  | Groq              | Nivel gratuit + plătit       | Tarif limitat               | Inferență ultra-rapidă    |
|                  | xAI (Grok)        | Plată-pe-utilizare           | Niciuna                     | Modele Grok               |
|                  | Mistral           | Nivel gratuit + plătit       | Tarif limitat               | IA europeană              |
|                  | OpenRouter        | Plată-pe-utilizare           | Niciuna                     | 100+ modele               |
| **💰 IEFTIN**    | GLM-4.7           | 0,6 USD/1 milion             | Zilnic 10:00                | Backup buget              |
|                  | MiniMax M2.1      | 0,2 USD/1 milion             | rulare de 5 ore             | Cea mai ieftină opțiune   |
|                  | Kimi K2           | 9 USD/lună plat              | 10 milioane de jetoane/lună | Cost previzibil           |
| **🆓 GRATUIT**   | iFlow             | $0                           | Nelimitat                   | 8 modele gratuite         |
|                  | Qwen              | $0                           | Nelimitat                   | 3 modele gratuite         |
|                  | Kiro              | $0                           | Nelimitat                   | Claude liber              |

**💡 Sfat profesionist:** Începeți cu Gemini CLI (180K gratuit/lună) + iFlow (gratuit nelimitat) combo = cost 0 USD!

---

## 💡 Caracteristici cheie

### 🧠 Core Routing & Intelligence

| Caracteristica                              | Ce face                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 🎯 **Backback inteligent pe 4 niveluri**    | Rută automată: Abonament → Cheie API → Ieftin → Gratuit                                                                   |
| 📊 **Urmărirea cotelor în timp real**       | Numărătoare de jetoane live + numărătoare inversă de resetare per furnizor                                                |
| 🔄 **Traducerea formatului**                | OpenAI ↔ Claude ↔ Gemeni ↔ Cursor ↔ Kiro fără întreruperi + dezinfectare răspuns                                          |
| 👥 **Asistență pentru mai multe conturi**   | Conturi multiple per furnizor cu selecție inteligentă                                                                     |
| 🔄 **Reîmprospătare automată a simbolului** | Tokenurile OAuth se reîmprospătează automat cu reîncercarea                                                               |
| 🎨 **Combinații personalizate**             | 6 strategii: fill-first, round-robin, p2c, aleatoriu, cel mai puțin utilizat, optimizat din punct de vedere al costurilor |
| 🧩 **Modele personalizate**                 | Adăugați orice ID de model oricărui furnizor                                                                              |
| 🌐 **Wildcard Router**                      | Dirijați dinamic modelele `provider/*` către orice furnizor                                                               |
| 🧠 **Buget de gândire**                     | Moduri de trecere, automat, personalizat și adaptiv pentru modelele de raționament                                        |
| 🔀 **Model Aliases**                        | Auto-forward deprecated model IDs to current replacements (built-in + custom)                                             |
| ⚡ **Background Degradation**               | Auto-route background tasks (titles, summaries) to cheaper models                                                         |
| 💬 **System Prompt Injection**              | Prompt de sistem global aplicat pentru toate solicitările                                                                 |
| 📄 **Responses API**                        | Compatibilitate completă cu OpenAI Responses API (`/v1/responses`) pentru Codex                                           |

### 🎵 API-uri multimodale

| Caracteristica            | Ce face                                                                                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generarea imaginii** | `/v1/images/generations` — 4 furnizori, peste 9 modele                                                                                                                     |
| 📐 **Inglobări**          | `/v1/embeddings` — 6 furnizori, peste 9 modele                                                                                                                             |
| 🎤 **Transcriere audio**  | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Text-to-speech**     | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderații**          | `/v1/moderations` — Verificări de siguranță a conținutului                                                                                                                 |
| 🔀 **Reclasificare**      | `/v1/rerank` — Reclasificarea relevanței documentului                                                                                                                      |

### 🛡️ Reziliență și securitate

| Caracteristica                         | Ce face                                                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Disjunctor**                      | Deschidere/închidere automată pentru fiecare furnizor cu praguri configurabile         |
| 🛡️ **Turmă Anti-Tunete**               | Limită de rată Mutex + semafor pentru furnizorii de chei API                           |
| 🧠 **Cache semantic**                  | Cache-ul pe două niveluri (semnătură + semantică) reduce costurile și latența          |
| ⚡ **Solicita Idempotenta**            | Fereastra de dedup 5s pentru cereri duplicate                                          |
| 🔒 **TLS Fingerprint Spoofing**        | Ocoliți detectarea botului bazată pe TLS prin wreq-js                                  |
| 🔏 **CLI Fingerprint Matching**        | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **Filtrare IP**                     | Lista permisă/lista blocată pentru controlul accesului API                             |
| 📊 **Limite de rată editabile**        | RPM configurabil, interval minim și concurență maximă la nivel de sistem               |
| 💾 **Rate Limit Persistence**          | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness           |
| 🔄 **Token Refresh Resilience**        | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                 |
| 🛡 **Protecție API Endpoint**          | Autentificare + blocare furnizor pentru punctul final `/models`                        |
| 🔒 **Vizibilitatea proxy**             | Ecusoane cu coduri de culoare: 🟢 global, 🟡 furnizor, 🔵 per conexiune cu afișaj IP   |
| 🌐 **Configurare proxy pe 3 niveluri** | Configurați proxy-uri la nivel global, per furnizor sau per conexiune                  |

### 📊 Observabilitate și analiză

| Caracteristica                         | Ce face                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 📝 **Solicitare înregistrare**         | Modul de depanare cu jurnalele complete de cereri/răspuns                                         |
| 💾 **Jurnale proxy SQLite**            | Jurnalele proxy persistente supraviețuiesc repornirilor de server                                 |
| 📊 **Tabloul de bord de analiză**      | Recharts-powered: carduri cu statistici, diagramă de utilizare a modelului, tabel furnizor        |
| 📈 **Urmărirea progresului**           | Înscrieți-vă evenimentele de progres SSE pentru streaming                                         |
| 🧪 **Evaluări LLM**                    | Testarea setului de aur cu 4 strategii de meci                                                    |
| 🔍 **Solicitare telemetrie**           | agregare latență p50/p95/p99 + urmărire X-Request-Id                                              |
| 📋 **Tabloul de bord jurnal**          | Pagina unificată cu 4 file: Jurnalele de solicitări, Jurnalele proxy, Jurnalele de audit, Consolă |
| 🖥️ **Console Log Viewer**              | Vizualizator în timp real în stil terminal cu filtru de nivel, căutare, defilare automată         |
| 📑 **Înregistrare pe bază de fișiere** | Interceptor de consolă captează toate ieșirile în fișierul jurnal JSON cu rotație                 |
| 🏥 **Tabloul de bord pentru sănătate** | Timp de funcționare a sistemului, stări întrerupătoare, blocări, statistici cache                 |
| 💰 **Urmărirea costurilor**            | Gestionarea bugetului + configurarea prețurilor pe model                                          |

### ☁️ Implementare și sincronizare

| Caracteristica                        | Ce face                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                     | Sincronizați configurația între dispozitive prin Cloudflare Workers             |
| 🌐 **Implementează oriunde**          | Localhost, VPS, Docker, lucrători Cloudflare                                    |
| 🔑 **Administrarea cheilor API**      | Generați, rotiți și stabiliți cheile API pentru fiecare furnizor                |
| 🧙 **Onboarding Wizard**              | Configurare ghidată în 4 pași pentru utilizatorii debutanți                     |
| 🔧 **Tabloul de bord CLI Tools**      | Configurați cu un singur clic Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **Backup-uri DB**                  | Backup automat, restaurare, export și import pentru toate setările              |
| 🌐 **Internaționalizare**             | I18n complet cu next-intl — suport engleză + portugheză (Brazilia)              |
| 🌍 **Selector de limbă**              | Pictograma glob în antet pentru schimbarea limbii în timp real (🇺🇸/🇧🇷)          |
| 📂 **Director de date personalizate** | `DATA_DIR` env var pentru a înlocui calea de stocare implicită `~/.omniroute`   |

<details>
<summary><b>📖 Detalii caracteristică</b></summary>

### 🎯 Smart 4-Tier Fallback

Creați combinații cu rezervă automată:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Urmărirea cotelor în timp real

- Consumul de token per furnizor
- Resetați numărătoarea inversă (5 ore, zilnic, săptămânal)
- Estimarea costurilor pentru nivelurile plătite
- Rapoarte lunare de cheltuieli

### 🔄 Format traducere

Traducere fără întreruperi între formate:

- **OpenAI** ↔ **Claude** ↔ **Gemeni** ↔ **Răspunsuri OpenAI**
- Instrumentul dvs. CLI trimite formatul OpenAI → OmniRoute traduce → Furnizorul primește formatul nativ
- Funcționează cu orice instrument care acceptă puncte finale personalizate OpenAI
- **Sanitizarea răspunsului** — Elimina câmpurile nestandard pentru compatibilitate strictă cu OpenAI SDK
- **Normalizarea rolurilor** — `developer` → `system` pentru non-OpenAI; `system` → `user` pentru modelele GLM/ERNIE
- **Think tag extraction** — blocuri `<think>` → `reasoning_content` pentru modele de gândire
- **Ieșire structurată** — `json_schema` → `responseMimeType`/`responseSchema` a lui Gemeni

### 👥 Suport pentru mai multe conturi

- Adăugați mai multe conturi pentru fiecare furnizor
- Auto round-robin sau rutare bazată pe prioritate
- Revenire la următorul cont când cineva atinge cota

### 🔄 Reîmprospătare automată a simbolului

- Tokenurile OAuth se reîmprospătează automat înainte de expirare
- Nu este nevoie de re-autentificare manuală
- Experiență perfectă pentru toți furnizorii

### 🎨 Combo personalizate

- Creați combinații de modele nelimitate
- 6 strategii: umplere întâi, round-robin, putere cu două alegeri, aleatoriu, cel mai puțin utilizat, optimizat din punct de vedere al costurilor
- Partajați combo-uri pe dispozitive cu Cloud Sync

### 🏥 Tabloul de bord pentru sănătate

- Starea sistemului (timp de funcționare, versiune, utilizare a memoriei)
- Stări întrerupătoarelor de circuit pentru fiecare furnizor (Închis/Deschis/Pe jumătate deschis)
- Starea limitei ratei și blocajele active
- Statistici de cache pentru semnături
- Telemetrie latență (p50/p95/p99) + cache prompt
- Resetați starea de sănătate cu un singur clic

### 🔧 Translator Playground

OmniRoute include un puternic Translator Playground încorporat cu **4 moduri** pentru depanare, testare și monitorizare a traducerilor API:

| Modul                  | Descriere                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **💻 Loc de joacă**    | Traducere directă a formatului — inserați orice corp de solicitare API și vedeți instantaneu cum îl traduce OmniRoute între formatele de furnizor (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Include exemple de șabloane și detecție automată a formatului. |
| **💬 Tester de chat**  | Trimiteți cereri reale de chat prin OmniRoute și vedeți întregul drum dus-întors: intrarea dvs., solicitarea tradusă, răspunsul furnizorului și răspunsul tradus înapoi. Neprețuit pentru validarea rutei combinate.                                         |
| **🧪 Banc de testare** | Mod de testare în loturi — definiți mai multe cazuri de testare cu diferite intrări și rezultate așteptate, rulați-le pe toate simultan și comparați rezultatele între furnizori și modele.                                                                  |
| **📱 Monitor live**    | Monitorizare în timp real a cererilor — urmăriți cererile primite în timp ce acestea trec prin OmniRoute, vedeți traducerile formatului care au loc în direct și identificați problemele instantaneu.                                                        |

**Acces:** Tabloul de bord → Traducător (bara laterală)

### 💾 Cloud Sync

- Sincronizați furnizorii, combo-urile și setările pe dispozitive
- Sincronizare automată în fundal
- Stocare securizată criptată

</details>

## 🧪 Evaluări (Evaluări)

OmniRoute include un cadru de evaluare încorporat pentru a testa calitatea răspunsului LLM față de un set de aur. Accesați-l prin **Analitice → Evaluări** în tabloul de bord.

### Set de aur încorporat

„Setul de Aur OmniRoute” preîncărcat conține 10 cazuri de testare care acoperă:

- Salutări, matematică, geografie, generare de cod
- Conformitatea formatului JSON, traducere, reducere
- Refuz de siguranță (conținut dăunător), numărare, logică booleană

### Strategii de evaluare

| Strategie  | Descriere                                                                 | Exemplu                          |
| ---------- | ------------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Ieșirea trebuie să se potrivească exact cu                                | `"4"`                            |
| `contains` | Ieșirea trebuie să conțină subșir (indiferență de majuscule și minuscule) | `"Paris"`                        |
| `regex`    | Ieșirea trebuie să se potrivească cu modelul regex                        | `"1.*2.*3"`                      |
| `custom`   | Funcția JS personalizată returnează adevărat/fals                         | `(output) => output.length > 10` |

---

## 📖 Ghid de configurare

<details>
<summary><b>💳 Furnizori de abonament</b></summary>

### Cod Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Sfat profesionist:** Folosiți Opus pentru sarcini complexe, Sonnet pentru viteză. OmniRoute urmărește cota per model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (GRATIS 180K/lună!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Cea mai bună valoare:** Nivel gratuit imens! Utilizați acest lucru înainte de nivelurile plătite.

### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Furnizori de chei API</b></summary>

### NVIDIA NIM (1000 de credite GRATUITE!)

1. Înscrieți-vă: [build.nvidia.com](https://build.nvidia.com)
2. Obțineți cheia API gratuită (1000 de credite de inferență incluse)
3. Tabloul de bord → Adăugați furnizor → NVIDIA NIM:
   - Cheie API: `nvapi-your-key`

**Modele:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` și peste 50 de altele

**Sfat profesional:** API compatibil cu OpenAI - funcționează perfect cu traducerea formatului OmniRoute!

### DeepSeek

1. Înscrieți-vă: [platform.deepseek.com](https://platform.deepseek.com)
2. Obțineți cheia API
3. Tabloul de bord → Adăugați furnizor → DeepSeek

**Modele:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (nivel gratuit disponibil!)

1. Înscrieți-vă: [console.groq.com](https://console.groq.com)
2. Obțineți cheia API (nivel gratuit inclus)
3. Tabloul de bord → Adăugați furnizor → Groq

**Modele:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Sfat profesionist:** Inferență ultra-rapidă - cel mai bun pentru codare în timp real!

### OpenRouter (100+ modele)

1. Înscrieți-vă: [openrouter.ai](https://openrouter.ai)
2. Obțineți cheia API
3. Tabloul de bord → Adăugare furnizor → OpenRouter

**Modele:** Accesați peste 100 de modele de la toți furnizorii importanți printr-o singură cheie API.

</details>

<details>
<summary><b>💰 Furnizori ieftini (backup)</b></summary>

### GLM-4.7 (Resetare zilnică, 0,6 USD/1 milion)

1. Înscrieți-vă: [Zhipu AI](https://open.bigmodel.cn/)
2. Obțineți cheia API din Coding Plan
3. Tabloul de bord → Adăugați cheia API:
   - Furnizor: `glm`
   - Cheie API: `your-key`

**Utilizați:** `glm/glm-4.7`

**Sfat profesionist:** Planul de codare oferă cotă de 3 ori la 1/7 cost! Resetați zilnic la 10:00.

### MiniMax M2.1 (resetare 5 ore, 0,20 USD/1 milion)

1. Înscrieți-vă: [MiniMax](https://www.minimax.io/)
2. Obțineți cheia API
3. Tabloul de bord → Adăugați cheia API

**Utilizați:** `minimax/MiniMax-M2.1`

**Sfat pro:** Cea mai ieftină opțiune pentru context lung (1 milion de jetoane)!

### Kimi K2 (9 USD/lună fix)

1. Abonați-vă: [Moonshot AI](https://platform.moonshot.ai/)
2. Obțineți cheia API
3. Tabloul de bord → Adăugați cheia API

**Utilizați:** `kimi/kimi-latest`

**Sfat profesionist:** Fix 9 USD/lună pentru 10 milioane de jetoane = 0,90 USD/cost efectiv de 1 milion!

</details>

<details>
<summary><b>🆓 Furnizori GRATUITI (Backup de urgență)</b></summary>

### iFlow (8 modele GRATUITE)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 modele GRATUITE)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATUIT)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Creați combinații</b></summary>

### Exemplul 1: Maximizați abonamentul → Backup ieftin

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Exemplul 2: Numai gratuit (cost zero)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 Integrare CLI</b></summary>

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Cod

Utilizați pagina **Instrumente CLI** din tabloul de bord pentru configurarea cu un singur clic sau editați manual `~/.claude/settings.json`.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Opțiunea 1 — Tabloul de bord (recomandat):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Opțiunea 2 — Manual:** Editați `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Notă:** OpenClaw funcționează numai cu OmniRoute local. Utilizați `127.0.0.1` în loc de `localhost` pentru a evita problemele de rezoluție IPv6.

### Cline / Continuare / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Depanare

<details>
<summary><b>Faceți clic pentru a extinde ghidul de depanare</b></summary>

**„Modelul de limbă nu a furnizat mesaje”**

- Cota de furnizor epuizată → Verificați instrumentul de urmărire a cotei din tabloul de bord
- Soluție: utilizați alternativă combinată sau treceți la un nivel mai ieftin

**Limitarea ratei**

- Scăderea cotei de abonament → Fallback la GLM/MiniMax
- Adăugați combo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Tokenul OAuth a expirat**

- Reîmprospătat automat de OmniRoute
- Dacă problemele persistă: Dashboard → Provider → Reconnect

**Costuri mari**

- Verificați statisticile de utilizare în Tabloul de bord → Costuri
- Comutați modelul principal la GLM/MiniMax
- Utilizați nivelul gratuit (Gemini CLI, iFlow) pentru sarcini necritice

**Tabloul de bord se deschide pe portul greșit**

- Setați `PORT=20128` și `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Erori de sincronizare în cloud**

- Verificați `BASE_URL` puncte către instanța dvs. care rulează
- Verificați `CLOUD_URL` puncte către punctul final din cloud așteptat
- Păstrați valorile `NEXT_PUBLIC_*` aliniate cu valorile de pe partea serverului

**Prima conectare nu funcționează**

- Verificați `INITIAL_PASSWORD` în `.env`
- Dacă nu este setată, parola de rezervă este `123456`

**Fără jurnal de solicitare**

- Setați `ENABLE_REQUEST_LOGS=true` în `.env`

**Testul de conectare arată „Invalid” pentru furnizorii compatibili cu OpenAI**

- Mulți furnizori nu expun un punct final `/models`
- OmniRoute v1.0.6+ include validarea de rezervă prin finalizarea chatului
- Asigurați-vă că adresa URL de bază include sufixul `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ IMPORTANT pentru utilizatorii cu OmniRoute în VPS/Docker/servidor remoto**

#### OAuth

Pentru autentificare, **Antigravity** și **Gemini CLI** folosesc **Google OAuth 2.0**. O Google exige que a `redirect_uri` utilizat nu fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console do aplicative.

As credenciais OAuth embutidas no OmniRoute esteo cadastradas **apenas for `localhost`**. Când accesați OmniRoute într-un server la distanță (ex: `https://omniroute.meuservidor.com`), sau Google respinge autentificarea com:

```
Error 400: redirect_uri_mismatch
```

### Soluție: Configurați propriile acreditări OAuth

Você necesita criar um **OAuth 2.0 Client ID** nu Google Cloud Console ca URI pentru server.

#### Passo a passo

**1. Acces sau Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Plângeți nou OAuth 2.0 Client ID**

- Faceți clic pe **"+ Create Credentials"** → **"OAuth client ID"**
- Tip de aplicație: **"Aplicație web"**
- Nume: scolha qualquer nome (ex: `OmniRoute Remote`)

**3. Adăugați ca URI de redirecționare autorizate**

No campo **„URI-uri de redirecționare autorizate”**, adiție:

```
https://seu-servidor.com/callback
```

> Substitue `seu-servidor.com` pelo domínio sau IP do seu servidor (inclua a porta se necessário, ex: `http://45.33.32.156:20128/callback`).

**4. Salve și copie ca credenciais**

Após criar, o Google afișează o **Client ID** e o **Client Secret**.

**5. Configurați ca variabile de mediu**

Nu ai `.env` (ai variat de ambient do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente connect novamente**

Tabloul de bord → Furnizori → Antigravity (sau Gemini CLI) → OAuth

Agora sau Google redirecționează corect pentru `https://seu-servidor.com/callback` și funcționează autenticação.

---

### Soluție temporară (sem configurar credenciais proprias)

Nu vă rugăm să vă convingeți acum, dar este posibil să utilizați sau să fluxați **manual de URL**:

1. OmniRoute deschide o adresă URL de autorizare Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no server remote)
3. **Copiați o adresă URL completă** da bara de accesare a browserului (mesmo que a page não carregue)
4. Cole essa URL nu există câmpuri care nu apar modal de conexão pentru OmniRoute
5. Faceți clic pe **„Conectați-vă”**

> Această soluție de soluționare funcționează deoarece codul de autorizare a URL-ului este valabil independent de redirecționare pentru a încărca sau nu.

</details>

---

## 🛠️

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ este **nu este acceptat** - `better-sqlite3` binarele native sunt incompatibile)
- **Limba**: TypeScript 5.9 — **100% TypeScript** în `src/` și `open-sse/` (v1.0.6)
- **Cadru**: Next.js 16 + React 19 + Tailwind CSS 4
- **Bază de date**: LowDB (JSON) + SQLite (starea domeniului + jurnalele proxy)
- **Streaming**: evenimente trimise de server (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + chei API
- **Testare**: Runner de testare Node.js (368+ teste unitare)
- **CI/CD**: GitHub Actions (publicare automată npm + Docker Hub la lansare)
- **Site web**: [omniroute.online](https://omniroute.online)
- **Pachet**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Reziliență**: întrerupător de circuit, backoff exponențial, turmă anti-tunet, falsificare TLS

---

## 📖 Documentație

| Document                                     | Descriere                                                 |
| -------------------------------------------- | --------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Furnizori, combo-uri, integrare CLI, implementare         |
| [API Reference](docs/API_REFERENCE.md)       | Toate punctele finale cu exemple                          |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Probleme și soluții comune                                |
| [Architecture](docs/ARCHITECTURE.md)         | Arhitectura sistemului și elementele interne              |
| [Contributing](CONTRIBUTING.md)              | Configurare și linii directoare de dezvoltare             |
| [OpenAPI Spec](docs/openapi.yaml)            | Specificație OpenAPI 3.0                                  |
| [Security Policy](SECURITY.md)               | Raportarea vulnerabilităților și practicile de securitate |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Ghid complet: VM + nginx + configurare Cloudflare         |
| [Features Gallery](docs/FEATURES.md)         | Tur vizual al tabloului de bord cu capturi de ecran       |

### 📸 Previzualizarea tabloului de bord

<details>
<summary><b>Faceți clic pentru a vedea capturile de ecran de pe tabloul de bord</b></summary>

| Pagina                   | Captură de ecran                                  |
| ------------------------ | ------------------------------------------------- |
| **Furnizori**            | ![Providers](docs/screenshots/01-providers.png)   |
| **Combo**                | ![Combos](docs/screenshots/02-combos.png)         |
| **Analitice**            | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Sănătate**             | ![Health](docs/screenshots/04-health.png)         |
| **Translator**           | ![Translator](docs/screenshots/05-translator.png) |
| **Setări**               | ![Settings](docs/screenshots/06-settings.png)     |
| **Instrumente CLI**      | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Jurnale de utilizare** | ![Usage](docs/screenshots/08-usage.png)           |
| **Punctul final**        | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute are **210+ funcții planificate** în mai multe faze de dezvoltare. Iată domeniile cheie:

| Categoria                         | Caracteristici planificate | Repere                                                                                                                       |
| --------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Routing & Intelligence**     | 25+                        | Rutare cu cea mai mică latență, rutare bazată pe etichete, verificare preliminară a cotei, selecție contului P2C             |
| 🔒 **Securitate și conformitate** | 20+                        | Întărirea SSRF, acoperirea acreditărilor, limita de rată per punct final, domeniul de aplicare al cheii de management        |
| 📊 **Observabilitate**            | 15+                        | Integrarea OpenTelemetry, monitorizarea cotelor în timp real, urmărirea costurilor per model                                 |
| 🔄 **Integrări furnizori**        | 20+                        | Registrul modelului dinamic, perioadele de încărcare ale furnizorului, Codexul cu mai multe conturi, analiza cotelor Copilot |
| ⚡ **Performanță**                | 15+                        | Strat cache dublu, cache prompt, cache de răspuns, streaming keepalive, API batch                                            |
| 🌐 **Ecosistem**                  | 10+                        | WebSocket API, config hot-reload, magazin de configurare distribuit, mod comercial                                           |

### 🔜 În curând

- 🔗 **Integrare OpenCode** — Suport furnizor nativ pentru IDE-ul de codare OpenCode AI
- 🔗 **Integrare TRAE** — Suport complet pentru cadrul de dezvoltare TRAE AI
- 📦 **Batch API** — Procesare asincronă în lot pentru solicitări în bloc
- 🎯 **Rutare bazată pe etichete** — Solicitări de rutare bazate pe etichete și metadate personalizate
- 💰 **Strategia cu cel mai mic cost** — Selectați automat cel mai ieftin furnizor disponibil

> 📝 Specificații complete ale caracteristicilor disponibile în [link](docs/new-features/) (217 specificații detaliate)

---

## 👥 Colaboratori

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Cum să contribui

1. Bifurcați depozitul
2. Creați-vă ramura caracteristică (`git checkout -b feature/amazing-feature`)
3. Afișează modificările (`git commit -m 'Add amazing feature'`)
4. Apăsați la ramură (`git push origin feature/amazing-feature`)
5. Deschideți o cerere de tragere

Consultați [CONTRIBUTING.md](CONTRIBUTING.md) pentru instrucțiuni detaliate.

### Lansarea unei noi versiuni

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Istoria stelelor

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Mulțumiri

Mulțumiri speciale pentru **[9router](https://github.com/decolua/9router)** de **[decolua](https://github.com/decolua)** — proiectul original care a inspirat această furcă. OmniRoute se bazează pe această bază incredibilă cu funcții suplimentare, API-uri multimodale și o rescrie completă TypeScript.

Mulțumiri speciale pentru **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — implementarea Go originală care a inspirat acest port JavaScript.

---

## 📄 Licență

Licență MIT - consultați [LICENSE](LICENSE) pentru detalii.

---

<div align="center">
  <sub>Construit cu ❤️ pentru dezvoltatorii care codifică 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
