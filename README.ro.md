# 🚀 OmniRoute — Gateway-ul gratuit AI

### Nu opriți niciodată codificarea. Dirijare inteligentă către **modele AI GRATUITE și cu costuri reduse** cu rezervă automată.

_Proxy-ul dvs. universal API — un punct final, peste 67 de furnizori, zero timpi de nefuncționare. Acum, cu orchestrarea agentului **MCP și A2A**._

**Finalizări de chat • Încorporare • Generare de imagini • Video • Muzică • Audio • Reclasificare • **Căutare Web** • Server MCP • Protocol A2A • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Disponibil în:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Ce este nou în v3.0.0

> **Faceți upgrade de la v2.9.5?** — Consultați [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) pentru toate modificările.

| Zona                                     | Schimbare                                                                                                                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL Security**                   | S-au remediat peste 10 alerte CodeQL: polinom-redouri, nesigure-aleatorie, remediere prin injecție shell                                                                                       |
| ✅ **Validare traseu**                   | Toate cele 176 de rute API validate acum cu scheme Zod + treceri `validateBody()` — CI `check:route-validation:t06`                                                                            |
| 🐛 **OmniModel Tag Leak**                | Etichetele interne `<omniModel>` nu mai curg către clienți în răspunsurile în flux SSE (#585)                                                                                                  |
| 🔑 **Registered Keys API**               | Furnizarea automată a cheilor API prin `POST /api/v1/registered-keys` cu aplicarea cotei pentru fiecare furnizor/cont, idempotity, stocare SHA-256 și raportare opțională a problemelor GitHub |
| 🎨 **Icoane furnizor**                   | Peste 130 de sigle ale furnizorului prin `@lobehub/icons` (SVG) cu PNG → lanț de rezervă generic                                                                                               |
| 🔄 **Sincronizare automată a modelului** | Programator 24 de ore și comutare manuală a interfeței de utilizare pentru a sincroniza listele de modele pentru furnizorii încorporați și personalizați compatibili cu OpenAI                 |
| 🌐 **OpenCode Zen/Go**                   | Doi furnizori noi de la @kang-heewon prin PR #530: nivel gratuit + nivel de abonament prin `OpencodeExecutor`                                                                                  |
| 🐛 **Gemini CLI OAuth**                  | Eroare acționabilă când `GEMINI_OAUTH_CLIENT_SECRET` lipsește în Docker (era o eroare Google criptică)                                                                                         |
| 🐛 **Configurare OpenCode**              | `saveOpenCodeConfig()` acum scrie corect TOML în `XDG_CONFIG_HOME`                                                                                                                             |
| 🐛 **Anulare model fixat**               | `body.model` setat corect la `pinnedModel` pentru protecția context-cache                                                                                                                      |
| 🐛 **Bucla Codex/Claude**                | `tool_result` blocuri convertite acum în text pentru a opri buclele infinite                                                                                                                   |
| 🐛 **Redirecționare autentificare**      | Conectarea nu se mai blochează după ce ați sărit peste configurarea parolei                                                                                                                    |
| 🐛 **Căi Windows**                       | Căile MSYS2/Git-Bash (`/c/...`) normalizate la `C:\...` automat                                                                                                                                |

---

## 🖼️ Tabloul de bord principal

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Previzualizarea tabloului de bord

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
| **Punctele finale**      | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Furnizor AI gratuit pentru agenții tăi preferați de codare

_Conectați orice instrument IDE sau CLI alimentat de AI prin OmniRoute — gateway API gratuit pentru codare nelimitată._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
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

<sub>📡 Toți agenții se conectează prin <code>http://localhost:20128/v1</code> sau <code>http://cloud.omniroute.online.online/v1__OMNI6_TOKEN__EN modele și cotă nelimitate</sub>

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
- **Contribuie**: vezi [CONTRIBUTING.md](CONTRIBUTING.md), deschide un PR sau alege un `good first issue`
- **Proiect original**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Raportați o eroare?

Când deschideți o problemă, rulați comanda system-info și atașați fișierul generat:

```bash
npm run system-info
```

Aceasta generează un `system-info.txt` cu versiunea dvs. Node.js, versiunea OmniRoute, detaliile sistemului de operare, instrumentele CLI instalate (iflow, gemini, claude, codex, antigravity, droid etc.), starea Docker/PM2 și pachetele de sistem - tot ce avem nevoie pentru a reproduce problema rapid. Atașați fișierul direct la problema dvs. GitHub.

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

- **Unified Endpoint** — Un singur `http://localhost:20128/v1` servește ca proxy pentru toți cei 67 de furnizori și peste
- **Traducerea formatului** — Automată și transparentă: OpenAI ↔ Claude ↔ Gemeni ↔ Responses API
- **Response Sanitization** — Elimina câmpurile nestandard (`x_groq`, `usage_breakdown`, `service_tier`) care încalcă OpenAI SDK v1.83+
- **Normalizarea rolurilor** — Convertește `developer` → `system` pentru furnizorii non-OpenAI; `system` → `user` pentru GLM/ERNIE
- **Think Tag Extraction** — Extrage blocurile `<think>` din modele precum DeepSeek R1 în `reasoning_content` standardizate
- **Ieșire structurată pentru Gemini** — `json_schema` → `responseMimeType`/`responseSchema` conversie automată
- **`stream` este implicit `false`** — Se aliniază cu specificațiile OpenAI, evitând SSE neașteptat în SDK-urile Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. „Furnizorul meu de AI îmi blochează regiunea/țara”</b></summary>

Furnizori precum OpenAI/Codex blochează accesul din anumite regiuni geografice. Utilizatorii primesc erori precum `unsupported_country_region_territory` în timpul conexiunilor OAuth și API. Acest lucru este frustrant în special pentru dezvoltatorii din țările în curs de dezvoltare.

**Cum o rezolvă OmniRoute:**

- **3-Level Proxy Config** — Proxy configurabil la 3 niveluri: global (tot traficul), per furnizor (doar un singur furnizor) și per conexiune/cheie
- **Insigne de proxy cu coduri de culoare** — Indicatori vizuali: 🟢 proxy global, 🟡 proxy furnizor, 🔵 proxy de conexiune, indicând întotdeauna IP-ul
- **Schimb de jetoane OAuth prin proxy** — fluxul OAuth trece și prin proxy, rezolvând `unsupported_country_region_territory`
- **Teste de conexiune prin proxy** — Testele de conexiune folosesc proxy-ul configurat (nu mai este ocolire directă)
- **Support SOCKS5** — Suport complet SOCKS5 proxy pentru rutarea de ieșire
- **TLS Fingerprint Spoofing** — Amprenta TLS asemănătoare unui browser prin `wreq-js` pentru a ocoli detectarea botului
- **🔏 CLI Fingerprint Matching** — Reordonează anteturile și câmpurile de corp pentru a se potrivi cu semnăturile binare CLI native, reducând drastic riscul de semnalare a contului. IP-ul proxy este păstrat - obțineți simultan mascarea IP stealth ** și**

</details>

<details>
<summary><b>🆓 4. „Vreau să folosesc AI pentru codare, dar nu am bani”</b></summary>

Nu toată lumea poate plăti 20–200 USD/lună pentru abonamentele AI. Studenții, dezvoltatorii din țările emergente, pasionații și freelancerii au nevoie de acces la modele de calitate la cost zero.

**Cum o rezolvă OmniRoute:**

- **Free Tier Providers Built-in** — Suport nativ pentru furnizori 100% gratuiti: iFlow (5 modele nelimitate prin OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 modele nelimitate: q-coder-3-fwen: qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratuit), Gemini CLI (180.000 de jetoane/lună gratuit)
- **Ollama Cloud** — Modele Ollama găzduite în cloud la `api.ollama.com` cu nivelul gratuit „Utilizare ușoară”; utilizați prefixul `ollamacloud/<model>`
- **Combo-uri numai gratuite** — Lanț `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD/lună fără timp de nefuncționare
- **NVIDIA NIM Free Access** — ~40 RPM dev-forever acces gratuit la peste 70 de modele la build.nvidia.com (tranziție de la credite la limitele de rate pur)
- **Cost Optimized Strategy** — Strategie de rutare care alege automat cel mai ieftin furnizor disponibil

</details>

<details>
<summary><b>🔒 5. „Trebuie să-mi protejez poarta AI de accesul neautorizat”</b></summary>

Când expuneți un gateway AI în rețea (LAN, VPS, Docker), oricine are adresa poate consuma jetoanele/cota dezvoltatorului. Fără protecție, API-urile sunt vulnerabile la utilizare greșită, injectare promptă și abuz.

**Cum o rezolvă OmniRoute:**

- **Gestionarea cheilor API** — Generare, rotație și stabilire a domeniului pentru fiecare furnizor cu o pagină dedicată `/dashboard/api-manager`
- **Permisiuni la nivel de model** — Restricționați cheile API la anumite modele (`openai/*`, modele cu caractere metalice), cu comutarea Permite tot/Restricționați
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

- **Circuit Breaker per-model** - Deschidere/închidere automată cu praguri configurabile și răcire (Închis/Deschis/Pe jumătate deschis), pentru fiecare model pentru a evita blocurile în cascadă
- **Backoff exponențial** — Întârzieri progresive ale reîncercării
- **Anti-Thundering Herd** — Mutex + protecție semafor împotriva furtunilor concurente de reîncercare
- **Combo Fallback Chains** — Dacă furnizorul principal eșuează, trece automat prin lanț fără nicio intervenție
- **Combo Circuit Breaker** — Dezactivează automat furnizorii care eșuează dintr-un lanț combinat
- **Tabloul de bord pentru sănătate** — Monitorizare timp de funcționare, stări întrerupătoare de circuit, blocări, statistici cache, latență p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Configurarea fiecărui instrument AI este plictisitoare și repetitivă”</b></summary>

Dezvoltatorii folosesc Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Fiecare instrument are nevoie de o configurație diferită (punct final API, cheie, model). Reconfigurarea la schimbarea de furnizor sau de model este o pierdere de timp.

**Cum o rezolvă OmniRoute:**

- **CLI Tools Dashboard** — pagină dedicată cu setare cu un singur clic pentru Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — generează `chatLanguageModels.json` pentru VS Code cu selecția în bloc a modelului
- **Onboarding Wizard** — Configurare ghidată în 4 pași pentru utilizatorii debutanți
- **Un punct final, toate modelele** — Configurați `http://localhost:20128/v1` o dată, accesați peste 67 de furnizori

</details>

<details>
<summary><b>🔑 8. „Gestionarea jetoanelor OAuth de la mai mulți furnizori este un iad”</b></summary>

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
- **System Info Report** — `npm run system-info` generează `system-info.txt` cu mediul dumneavoastră complet (versiunea Node, versiunea OmniRoute, OS, instrumente CLI, starea Docker/PM2). Atașați-l când raportați probleme pentru triaj instantaneu.

</details>

<details>
<summary><b>🏗️ 11. „Implementarea și întreținerea gateway-ului este complexă”</b></summary>

Instalarea, configurarea și menținerea unui proxy AI în diferite medii (local, VPS, Docker, cloud) necesită multă muncă. Probleme precum căile codificate, `EACCES` pe directoare, conflictele de porturi și versiunile multiplatforme adaugă fricțiuni.

**Cum o rezolvă OmniRoute:**

- **npm global install** — `npm install -g omniroute && omniroute` — gata
- **Docker Multi-Platform** - AMD64 + ARM64 nativ (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (fără instrumente CLI) și `cli` (cu Claude Code, Codex, OpenClaw)
- **Electron Desktop App** — aplicație nativă pentru Windows/macOS/Linux cu bară de sistem, pornire automată, mod offline
- **Split-Port Mode** — API și tablou de bord pe porturi separate pentru scenarii avansate (reverse proxy, rețea container)
- **Cloud Sync** — Configurați sincronizarea între dispozitive prin Cloudflare Workers
- **Backups DB** — Backup automat, restaurare, export și import al tuturor setărilor

</details>

<details>
<summary><b>🌍 12. „Interfața este doar în limba engleză și echipa mea nu vorbește engleză”</b></summary>

Echipele din țările care nu vorbesc engleza, în special din America Latină, Asia și Europa, se luptă cu interfețele doar în limba engleză. Barierele lingvistice reduc adoptarea și cresc erorile de configurare.

**Cum o rezolvă OmniRoute:**

- **Tabloul de bord i18n — 30 de limbi** — Toate cele peste 500 de taste traduse, inclusiv arabă, bulgară, daneză, germană, spaniolă, finlandeză, franceză, ebraică, hindi, maghiară, indoneziană, italiană, japoneză, coreeană, malay, olandeză, norvegiană, poloneză, portugheză (PT/BR), română, rusă, slovacă, suedeză, thailandeză, ucraineană, filipineză, engleză, chineză, vietnameză,
- ** Suport RTL** — Suport de la dreapta la stânga pentru arabă și ebraică
- **ReadME-uri în mai multe limbi** — 30 de traduceri complete de documentație
- **Selector de limbă** — Pictograma glob în antet pentru comutare în timp real

</details>

<details>
<summary><b>🔄 13. „Am nevoie de mai mult decât de chat — am nevoie de încorporare, imagini, audio”</b></summary>

AI nu este doar finalizarea chatului. Dezvoltatorii trebuie să genereze imagini, să transcrie sunetul, să creeze înglobări pentru RAG, să reclasifice documentele și să modereze conținutul. Fiecare API are un punct final și un format diferit.

**Cum o rezolvă OmniRoute:**

- **Embeddings** — `/v1/embeddings` cu 6 furnizori și peste 9 modele
- **Image Generation** — `/v1/images/generations` cu 10 furnizori și peste 20 de modele (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) și SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Transcriere audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + furnizori existenți
- **Moderări** — `/v1/moderations` — Verificări privind siguranța conținutului
- **Reclasificare** — `/v1/rerank` — Reclasificarea relevanței documentului
- **Responses API** — Suport complet `/v1/responses` pentru Codex

</details>

<details>
<summary><b>🧪 14. „Nu am cum să testez și să compar calitatea între modele”</b></summary>

Dezvoltatorii vor să știe care model este cel mai bun pentru cazul lor de utilizare - cod, traducere, raționament - dar compararea manuală este lentă. Nu există instrumente de evaluare integrate.

**Cum o rezolvă OmniRoute:**

- **Evaluări LLM** — Testarea setului de aur cu 10 cazuri preîncărcate care acoperă salutări, matematică, geografie, generare de cod, conformitate cu JSON, traducere, reducere, refuz de siguranță
- **4 strategii de potrivire** — `exact`, `contains`, `regex`, `custom` (funcția JS)
- **Translator Playground Test Bench** — Testare în loturi cu mai multe intrări și rezultate așteptate, comparație între furnizori
- **Tester de chat** — Tur complet dus-întors cu randare vizuală a răspunsului
- **Live Monitor** — Flux în timp real al tuturor solicitărilor care circulă prin proxy

</details>

<details>
<summary><b>📈 15. „Trebuie să mă extind fără a pierde performanța”</b></summary>

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
<summary><b>🧠 18. „Am nevoie de orchestrare A2A cu sincronizare + căi de activități de flux”</b></summary>

Fluxurile de lucru ale agenților necesită atât răspunsuri directe, cât și execuție în flux de lungă durată, cu control ciclului de viață.

**Cum o rezolvă OmniRoute:**

- Punct final JSON-RPC A2A (`POST /a2a`) cu `message/send` și `message/stream`
- Streaming SSE cu propagare a stării terminale
- API-uri pentru ciclul de viață al sarcinilor pentru `tasks/get` și `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Am nevoie de sănătate reală a procesului MCP, nu de stare ghicită”</b></summary>

Echipele operaționale trebuie să știe dacă MCP este de fapt în viață, nu doar dacă un API este accesibil.

**Cum o rezolvă OmniRoute:**

- Fișier runtime heartbeat cu PID, marcaje de timp, transport, număr de instrumente și modul de aplicare
- API de stare MCP care combină bătăile inimii + activitatea recentă
- Carduri de stare a interfeței de utilizare pentru prospețimea procesului/uptime/inima

</details>

<details>
<summary><b>📋 20. „Am nevoie de execuție auditabilă a instrumentului MCP”</b></summary>

Când instrumentele modifică configurația sau declanșează acțiuni operaționale, echipele au nevoie de trasabilitate criminalistică.

**Cum o rezolvă OmniRoute:**

- Înregistrare de audit susținută de SQLite pentru apelurile instrumentelor MCP
- Filtrează după instrument, succes/eșec, cheie API și paginare
- Tabelul de audit al tabloului de bord + punctele finale de statistici pentru automatizare

</details>

<details>
<summary><b>🔐 21. „Am nevoie de permisiuni MCP pentru fiecare integrare”</b></summary>

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
<summary><b>🔄 23. „Am nevoie de vizibilitate și anulare live a ciclului de viață al sarcinii A2A”</b></summary>

Fără vizibilitatea ciclului de viață, incidentele sarcinilor devin greu de triat.

**Cum o rezolvă OmniRoute:**

- Listarea sarcinilor/filtrarea după stare/abilitate cu paginare
- Detaliați metadatele sarcinii, evenimentele și artefactele
- Punct final de anulare a sarcinii și acțiune UI cu confirmare

</details>

<details>
<summary><b>🌊 24. „Am nevoie de valori active de flux pentru încărcarea A2A”</b></summary>

Fluxurile de lucru în flux necesită o perspectivă operațională privind concurența și conexiunile live.

**Cum o rezolvă OmniRoute:**

- Contoare active de flux integrate în starea A2A
- Marcaj de timp pentru ultima sarcină și numărătoare pentru fiecare stat
- Carduri de bord A2A pentru monitorizarea operațiunilor în timp real

</details>

<details>
<summary><b>🪪 25. „Am nevoie de descoperire de agent standard pentru clienți”</b></summary>

Clienții externi și orchestratorii au nevoie de metadate care pot fi citite de mașină pentru integrare.

**Cum o rezolvă OmniRoute:**

- Card de agent expus la `/.well-known/agent.json`
- Capabilități și abilități afișate în UI de management
- API-ul de stare A2A include metadate de descoperire pentru automatizare

</details>

<details>
<summary><b>🧭 26. „Am nevoie de descoperirea protocolului în UX-ul produsului”</b></summary>

Dacă utilizatorii nu pot descoperi suprafețele de protocol, calitatea adoptării și a suportului scade.

**Cum o rezolvă OmniRoute:**

- Pagina consolidată **Puncte finale** cu file pentru punctele finale Proxy, MCP, A2A și API
- Comută starea serviciului în linie (Online/Offline) pentru MCP și A2A
- Link-uri de la prezentare generală la file dedicate de gestionare

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
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Începe gratuit — Cost de configurare zero

> Configurați codarea AI în minute la **$0/lună**. Conectați aceste conturi gratuite și utilizați combinația încorporată **Free Stack**.

| Pasul | Acțiune                                              | Furnizori deblocați                                                |
| ----- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| 1     | Conectați **Kiro** (AWS Builder ID OAuth)            | Claude Sonnet 4.5, Haiku 4.5 — **nelimitat**                       |
| 2     | Conectați **iFlow** (Google OAuth)                   | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **nelimitat** |
| 3     | Conectați **Qwen** (Codul dispozitivului)            | qwen3-coder-plus, qwen3-coder-flash... — **nelimitat**             |
| 4     | Conectați **Gemini CLI** (Google OAuth)              | gemini-3-flash, gemini-2.5-pro — **180K/lună gratuit**             |
| 5     | `/dashboard/combos` → șablon **Stiva gratuită ($0)** | Round-robin toți furnizorii gratuiti în mod automat                |

** Indicați orice IDE/CLI către:** `http://localhost:20128/v1` · Cheie API: `any-string` · Terminat.

> **Acoperire suplimentară opțională (de asemenea gratuită):** Cheie Groq API (30 RPM gratuit), NVIDIA NIM (40 RPM fără, peste 70 de modele), Cerebras (1M tok/zi), LongCat API key (50M tokens/zi!), Cloudflare Workers AI (10K Neurons/zi, 50+ modele).

## ⚡ Pornire rapidă

### 1) Instalați și rulați

```bash
npm install -g omniroute
omniroute
```

> **Utilizatori pnpm:** Rulați `pnpm approve-builds -g` după instalare pentru a activa scripturile de compilare native cerute de `better-sqlite3` și `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Tabloul de bord se deschide la `http://localhost:20128` și adresa URL de bază a API este `http://localhost:20128/v1`.

| Comanda                 | Descriere                                                               |
| ----------------------- | ----------------------------------------------------------------------- |
| `omniroute`             | Porniți serverul (`PORT=20128`, API și tabloul de bord pe același port) |
| `omniroute --port 3000` | Setați portul canonic/API la 3000                                       |
| `omniroute --mcp`       | Porniți serverul MCP (transport stdio)                                  |
| `omniroute --no-open`   | Nu deschideți automat browserul                                         |
| `omniroute --help`      | Arată ajutor                                                            |

Opțional modul split-port:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Conectați furnizorii și creați-vă cheia API

1. Deschideți Dashboard → `Providers` și conectați cel puțin un furnizor (OAuth sau cheie API).
2. Deschideți Dashboard → `Endpoints` și creați o cheie API.
3. (Opțional) Deschideți Dashboard → `Combos` și setați lanțul de rezervă.

### 3) Îndreptați instrumentul de codare către OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Funcționează cu Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode și SDK-uri compatibile cu OpenAI.

### 4) Activați și validați protocoalele (v2.0)

**MCP (pentru operațiuni cu scule):**

```bash
omniroute --mcp
```

Apoi conectați-vă clientul MCP prin `stdio` și testați instrumente precum:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (pentru fluxuri de lucru de la agent la agent):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Validați totul de la capăt la capăt (recomandat)

```bash
npm run test:protocols:e2e
```

Această suită validează fluxurile reale de clienți MCP și A2A împotriva unei aplicații care rulează.

### Alternativă: rulează de la sursă

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
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

**Cu fișier de mediu:**

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

## 🖥️ Aplicație desktop — Offline și mereu activată

> 🆕 **NOU!** OmniRoute este acum disponibil ca **aplicație desktop nativă** pentru Windows, macOS și Linux.

Rulați OmniRoute ca o aplicație desktop autonomă - fără terminal, fără browser, fără internet necesar pentru modelele locale. Aplicația bazată pe electroni include:

- 🖥️ **Fereastra nativă** — Fereastra aplicației dedicată cu integrare în tava de sistem
- 🔄 **Auto-Start** — Lansați OmniRoute la autentificarea sistemului
- 🔔 **Notificări native** — Primiți alerte pentru epuizarea cotelor sau probleme legate de furnizor
- ⚡ **Instalare cu un singur clic** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Mod offline** — Funcționează complet offline cu serverul inclus

### Pornire rapidă

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Tava de sistem

Când este minimizat, OmniRoute se află în bara de sistem cu acțiuni rapide:

- Deschide tabloul de bord
- Schimbați portul serverului
- Închideți aplicația

📖 Documentație completă: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Prețurile dintr-o privire

| Nivelul          | Furnizor                    | Cost                                  | Resetare cotă               | Cel mai bun pentru                            |
| ---------------- | --------------------------- | ------------------------------------- | --------------------------- | --------------------------------------------- |
| **💳 ABONAMENT** | Claude Code (Pro)           | 20 USD/lună                           | 5h + săptămânal             | Deja abonat                                   |
|                  | Codex (Plus/Pro)            | 20-200 USD/lună                       | 5h + săptămânal             | Utilizatori OpenAI                            |
|                  | Gemeni CLI                  | **GRATIS**                            | 180K/lună + 1K/zi           | Toată lumea!                                  |
|                  | GitHub Copilot              | 10-19 USD/lună                        | Lunar                       | utilizatorii GitHub                           |
| **🔑 CHEIA API** | NVIDIA NIM                  | **GRATIS** (dev forever)              | ~40 RPM                     | 70+ modele deschise                           |
|                  | Cerebre                     | **GRATIS** (1M tok/zi)                | 60K TPM / 30 RPM            | Cel mai rapid din lume                        |
|                  | Groq                        | **GRATIS** (30 RPM)                   | 14,4K RPD                   | Llama/Gemma ultra-rapidă                      |
|                  | DeepSeek V3.2               | 0,27 USD/1,10 USD per 1 milion        | Niciuna                     | Cel mai bun raționament preț/calitate         |
|                  | xAI Grok-4 Fast             | **0,20 USD/0,50 USD pe 1M** 🆕        | Niciuna                     | Cea mai rapidă + apelare instrument, ultralow |
|                  | xAI Grok-4 (standard)       | 0,20 USD/1,50 USD per 1 milion 🆕     | Niciuna                     | Raționamentul emblematic de la xAI            |
|                  | Mistral                     | Probă gratuită + plătit               | Tarif limitat               | IA europeană                                  |
|                  | OpenRouter                  | Plată-pe-utilizare                    | Niciuna                     | 100+ modele agr.                              |
| **💰 IEFTIN**    | GLM-5 (prin Z.AI) 🆕        | 0,5 USD/1 milion                      | Zilnic 10:00                | Ieșire 128K, cel mai nou flagship             |
|                  | GLM-4.7                     | 0,6 USD/1 milion                      | Zilnic 10:00                | Backup buget                                  |
|                  | MiniMax M2.5 🆕             | Intrare de 0,3 USD/1 milion           | rulare de 5 ore             | Raționament + sarcini agentice                |
|                  | MiniMax M2.1                | 0,2 USD/1 milion                      | rulare de 5 ore             | Cea mai ieftină opțiune                       |
|                  | Kimi K2.5 (API Moonshot) 🆕 | Plată-pe-utilizare                    | Niciuna                     | Acces direct API Moonshot                     |
|                  | Kimi K2                     | 9 USD/lună plat                       | 10 milioane de jetoane/lună | Cost previzibil                               |
| **🆓 GRATUIT**   | iFlow                       | **$0**                                | Nelimitat                   | 5 modele nelimitat                            |
|                  | Qwen                        | **$0**                                | Nelimitat                   | 4 modele nelimitat                            |
|                  | Kiro                        | **$0**                                | Nelimitat                   | Claude Sonnet/Haiku (AWS Builder)             |
|                  | LongCat Flash-Lite 🆕       | **$0** (50 M tok/zi 🔥)               | 1 RPS                       | Cea mai mare cotă gratuită de pe Pământ       |
|                  | Polenizări AI 🆕            | **$0** (nu este nevoie de cheie)      | 1 solicitat/15s             | GPT-5, Claude, DeepSeek, Llama 4              |
|                  | Cloudflare Workers AI 🆕    | **$0** (10K Neuroni/zi)               | ~150 resp/zi                | 50+ modele, avantaj global                    |
|                  | Scaleway AI 🆕              | **$0** (1 milion de jetoane în total) | Tarif limitat               | UE/GDPR, Qwen3 235B, Llama 70B                |

> 🆕 **Modele noi adăugate (mar 2026):** Familia Grok-4 Fast la 0,20 USD/0,50 USD/M (evaluat la 1143 ms — cu 30% mai rapid decât Gemini 2.5 Flash), GLM-5 prin Z.AI cu ieșire de 128K, Raționament MiniMax M2.5, Raționamentul KimiSeek 5, actualizare Deep2.5. API direct Moonshot.

**💡 Stivă combinată de 0 USD — Configurare completă gratuită:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

** Cost zero. Nu se oprește niciodată codificarea.** Configurați acest lucru ca un combo OmniRoute și toate alternativele au loc automat - fără comutare manuală vreodată.

---

---

## 🆓 Modele gratuite — Ce obțineți de fapt

> Toate modelele de mai jos sunt **100% gratuite, fără card de credit necesar**. OmniRoute face trasee automate între ele când se epuizează o cotă - combină-le pe toate pentru o combinație de 0 USD de neîntrerupt.

### 🔵 MODELE CLAUDE (prin Kiro — AWS Builder ID)

| Model               | Prefix | Limită        | Limită de rată                |
| ------------------- | ------ | ------------- | ----------------------------- |
| `claude-sonnet-4.5` | `kr/`  | **Nelimitat** | Niciun plafon zilnic raportat |
| `claude-haiku-4.5`  | `kr/`  | **Nelimitat** | Niciun plafon zilnic raportat |
| `claude-opus-4.6`   | `kr/`  | **Nelimitat** | Ultimul Opus prin Kiro        |

### 🟢 MODELE IFLOW (OAuth gratuit — fără card de credit)

| Model              | Prefix | Limită        | Limită de rată         |
| ------------------ | ------ | ------------- | ---------------------- |
| `kimi-k2-thinking` | `if/`  | **Nelimitat** | Nicio limită raportată |
| `qwen3-coder-plus` | `if/`  | **Nelimitat** | Nicio limită raportată |
| `deepseek-r1`      | `if/`  | **Nelimitat** | Nicio limită raportată |
| `minimax-m2.1`     | `if/`  | **Nelimitat** | Nicio limită raportată |
| `kimi-k2`          | `if/`  | **Nelimitat** | Nicio limită raportată |

### 🟡 MODELE QWEN (Autentificare cod dispozitiv)

| Model               | Prefix | Limită        | Limită de rată         |
| ------------------- | ------ | ------------- | ---------------------- |
| `qwen3-coder-plus`  | `qw/`  | **Nelimitat** | Nicio limită raportată |
| `qwen3-coder-flash` | `qw/`  | **Nelimitat** | Nicio limită raportată |
| `qwen3-coder-next`  | `qw/`  | **Nelimitat** | Nicio limită raportată |
| `vision-model`      | `qw/`  | **Nelimitat** | Multimodal (imagini)   |

### 🟣 GEMINI CLI (Google OAuth)

| Model                    | Prefix | Limită                     | Limită de rată  |
| ------------------------ | ------ | -------------------------- | --------------- |
| `gemini-3-flash-preview` | `gc/`  | **180K tok/lună** + 1K/zi  | Resetare lunară |
| `gemini-2.5-pro`         | `gc/`  | 180K/lună (piscina comună) | Calitate înaltă |

### ⚫ NVIDIA NIM (Cheie API gratuită — build.nvidia.com)

| Nivelul       | Limită zilnică       | Limită de rată | Note                                                                |
| ------------- | -------------------- | -------------- | ------------------------------------------------------------------- |
| Gratuit (Dev) | Fără capac de simbol | **~40 RPM**    | 70+ modele; trecerea la limitele ratei pure la mijlocul anului 2025 |

Modele gratuite populare: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, **OMNI18**EN

### ⚪ CEREBRAS (Cheie API gratuită — inference.cerebras.ai)

| Nivelul | Limită zilnică             | Limită de rată   | Note                                                    |
| ------- | -------------------------- | ---------------- | ------------------------------------------------------- |
| Gratuit | **1 milion de jetoane/zi** | 60K TPM / 30 RPM | Cea mai rapidă inferență LLM din lume; resetează zilnic |

Disponibil gratuit: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (Cheie API gratuită — console.groq.com)

| Nivelul | Limită zilnică | Limită de rată   | Note                                        |
| ------- | -------------- | ---------------- | ------------------------------------------- |
| Gratuit | **14,4K RPD**  | 30 RPM per model | Fără card de credit; 429 în limită, netaxat |

Disponibil gratuit: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (Cheie API gratuită — longcat.chat) 🆕

| Model                         | Prefix | Cotă zilnică gratuită | Note                                |
| ----------------------------- | ------ | --------------------- | ----------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **50M de jetoane** 💥 | Cea mai mare cotă gratuită vreodată |
| `LongCat-Flash-Chat`          | `lc/`  | 500K jetoane          | Chat în mai multe rânduri           |
| `LongCat-Flash-Thinking`      | `lc/`  | 500K jetoane          | Raționament / CoT                   |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 500K jetoane          | Versiunea ianuarie 2026             |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 500K jetoane          | Multimodal                          |

> 100% gratuit în timpul beta public. Înscrieți-vă la [longcat.chat](https://longcat.chat) cu e-mail sau telefon. Se resetează zilnic la 00:00 UTC.

### 🟢 POLLINATIONS AI (Nu este necesară nicio cheie API) 🆕

| Model      | Prefix | Limită de rată  | Furnizor în spatele |
| ---------- | ------ | --------------- | ------------------- |
| `openai`   | `pol/` | 1 solicitat/15s | GPT-5               |
| `claude`   | `pol/` | 1 solicitat/15s | Claude antropic     |
| `gemini`   | `pol/` | 1 solicitat/15s | Google Gemeni       |
| `deepseek` | `pol/` | 1 solicitat/15s | DeepSeek V3         |
| `llama`    | `pol/` | 1 solicitat/15s | Meta Llama 4 Scout  |
| `mistral`  | `pol/` | 1 solicitat/15s | Mistral AI          |

> ✨ **Zero frecare:** Fără înscriere, fără cheie API. Adăugați furnizorul de polenizări cu un câmp cheie gol și funcționează imediat.

### 🟠 CLOUDFLARE WORKERS AI (Cheie API gratuită — cloudflare.com) 🆕

| Nivelul | Neuroni zilnici | Utilizare echivalentă                        | Note                               |
| ------- | --------------- | -------------------------------------------- | ---------------------------------- |
| Gratuit | **10.000**      | ~150 LLM resp / 500s audio / 15K încorporare | Avantaj global, peste 50 de modele |

Modele gratuite populare: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (audio gratuit!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Necesită API Token + ID cont de la [dash.cloudflare.com](https://dash.cloudflare.com). Stocați ID-ul contului în setările furnizorului.

### 🟣 SCALEWAY AI (1 milion de jetoane gratuite — scaleway.com) 🆕

| Nivelul | Cotă gratuită           | Localizare   | Note                                       |
| ------- | ----------------------- | ------------ | ------------------------------------------ |
| Gratuit | **1 milion de jetoane** | 🇫🇷 Paris, UE | Nu este nevoie de card de credit în limite |

Disponibil gratuit: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> Conform UE/GDPR. Obțineți cheia API la [console.scaleway.com](https://console.scaleway.com).

> **💡 Ultima stivă gratuită (11 furnizori, 0 USD pentru totdeauna):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Combo de transcriere gratuită

> Transcrie orice audio/video pentru **$0** — Deepgram conduce cu 200 USD gratuit, AssemblyAI 50 USD alternativ, Groq Whisper ca rezervă nelimitată de urgență.

| Furnizor           | Credite gratuite                | Cel mai bun model                                    | Limită de rată                            |
| ------------------ | ------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| 🟢 **Deepgram**    | **200 USD gratuit** (înscriere) | `nova-3` — cea mai bună acuratețe, peste 30 de limbi | Fără limită RPM pentru creditele gratuite |
| 🔵 **AsamblareAI** | **50 USD gratuit** (înscriere)  | `universal-3-pro` — capitole, sentiment, PII         | Fără limită RPM pentru creditele gratuite |
| 🔴 **Groq**        | **Gratuit pentru totdeauna**    | `whisper-large-v3` — OpenAI Whisper                  | 30 RPM (rată limitată)                    |

**Combinație sugerată în `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Apoi, în `/dashboard/media` → fila **Transcriere**: încărcați orice fișier audio sau video → selectați punctul final combo → obțineți transcrierea în formatele acceptate.

## 💡 Caracteristici cheie

OmniRoute v2.0 este construit ca o platformă operațională, nu doar un proxy-releu.

### 🆕 Nou — Îmbunătățiri inspirate de ClawRouter (martie 2026)

| Caracteristica                          | Ce face                                                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**               | Modele xAI la 0,20 USD/0,50 USD/M — etalon de 1143 ms (30% mai rapid decât Gemini 2.5 Flash)                                  |
| 🧠 **GLM-5 prin Z.AI**                  | Context de ieșire de 128.000, 0,5 USD/1 milion — cel mai nou flagship din familia GLM                                         |
| 🔮 **MiniMax M2.5**                     | Raționament + sarcini agentice la 0,30 USD/1 milion – upgrade semnificativ de la M2.1                                         |
| 🎯 **toolCalling Flag per model**       | Per-model `toolCalling: true/false` în registru — AutoCombo omite modelele care nu sunt compatibile cu instrumente            |
| 🌍 **Detecția intenției multilingve**   | Cuvinte cheie PT/ZH/ES/AR în scorul AutoCombo — o selecție mai bună a modelului pentru conținut care nu este în limba engleză |
| 📊 **Backmark-uri bazate pe benchmark** | Latența reală p95 de la solicitările live alimentează scorul combinat — AutoCombo învață din datele reale                     |
| 🔁 **Solicitare deduplicare**           | Fereastra de deduplicare bazată pe hash de conținut — sigură pentru mai mulți agenți, previne taxele duplicate                |
| 🔌 **Pluggable RouterStrategy**         | Interfață extensibilă `RouterStrategy` — adăugați logica de rutare personalizată ca pluginuri                                 |

### 🚀 V2.0.9+ anterioară — Playground, CLI Fingerprints și ACP

| Caracteristica                               | Ce face                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Teren de joacă model**                  | Pagina tabloului de bord pentru a testa orice model direct — selectoare furnizor/model/punct final, Editor Monaco, streaming, anulare, sincronizare                                                                                                                                                       |
| 🔏 **Potrivirea amprentei CLI**              | Ordinea antetului/corpului pentru fiecare furnizor pentru a se potrivi cu semnăturile CLI native - comutați pentru fiecare furnizor în Setări > Securitate. **IP-ul dvs. proxy este păstrat**                                                                                                             |
| 🤝 **Suport ACP (Agent Client Protocol)**    | Descoperirea agentului CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + încă 9), generator de proces, punct final `/api/acp/agents`                                                                                                                                                                      |
| 🤖 **Tabloul de bord pentru agenții ACP**    | Depanare › Pagina Agenți — grilă de 14 agenți cu starea instalării, versiunea, formularul de agent personalizat pentru orice instrument CLI. Utilizatorii **OpenCode** primesc un buton „Descărcați opencode.json” care generează automat o configurație gata de utilizare cu toate modelele disponibile. |
| 🔧 **Model personalizat `apiFormat` Rutare** | Modelele personalizate cu `apiFormat: "responses"` sunt acum direcționate corect către traducătorul API de răspunsuri                                                                                                                                                                                     |
| 🏢 **Izolarea spațiului de lucru Codex**     | Spații de lucru Codex multiple per e-mail — OAuth separă corect conexiunile după ID-ul spațiului de lucru                                                                                                                                                                                                 |
| 🔄 **Actualizare automată Electron**         | Aplicația desktop verifică actualizările + instalare automată la repornire                                                                                                                                                                                                                                |

### 🤖 Operații cu agenți și protocol (v2.0)

| Caracteristica                                | Ce face                                                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 🔧 **Server MCP (16 instrumente)**            | Instrumente IDE/agent prin 3 transporturi: stdio, SSE (`/api/mcp/sse`), HTTP Streamable (`/api/mcp/stream`) |
| 🤝 **Server A2A (JSON-RPC + SSE)**            | Execuția sarcinilor de la agent la agent cu fluxuri de sincronizare și streaming                            |
| 🧭 **Pagină de puncte finale consolidate**    | Pagina de gestionare cu file cu file Endpoint Proxy, MCP, A2A și API Endpoints                              |
| 🎚️ **Servicii Activare/Dezactivare Comutări** | Comutatoare ON/OFF pentru MCP și A2A cu persistența setărilor (implicit: OFF)                               |
| 🛰️ **MCP Runtime Heartbeat**                  | Starea reală a procesului (pid, uptime, vârsta bătăilor inimii, transport, mod scope)                       |
| 📋 **MCP Audit Trail**                        | Jurnale de audit filtrabile cu succes/eșec și atribuire cheie                                               |
| 🔐 **MCP Scope Enforcement**                  | 9 permisiuni granulare pentru acces controlat la instrumente                                                |
| 📡 **A2A Task Lifecycle Management**          | Listați/filtrați sarcinile, inspectați evenimentele/artefactele, anulați activitățile care rulează          |
| 📋 **Descoperire card de agent**              | `/.well-known/agent.json` pentru descoperirea automată a clientului                                         |
| 🧪 **Protocol E2E Test Harness**              | Real MCP SDK + A2A client flux în `test:protocols:e2e`                                                      |
| ⚙️ **Controale operaționale**                 | Combo de comutare, aplicați profile de rezistență, resetați întrerupătoarele de pe o suprafață de control   |

### 🧠 Rutare și inteligență

| Caracteristica                                  | Ce face                                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 🎯 **Backback inteligent pe 4 niveluri**        | Rută automată: Abonament → Cheie API → Ieftin → Gratuit                                   |
| 📊 **Urmărirea cotelor în timp real**           | Numărătoare de jetoane live + numărătoare inversă de resetare per furnizor                |
| 🔄 **Traducerea formatului**                    | OpenAI ↔ Claude ↔ Gemeni ↔ Răspunsuri cu conversii sigure pentru schema                   |
| 👥 **Asistență pentru mai multe conturi**       | Conturi multiple per furnizor cu selecție inteligentă                                     |
| 🔄 **Reîmprospătare automată a simbolului**     | Tokenurile OAuth se reîmprospătează automat cu reîncercarea                               |
| 🎨 **Combinații personalizate**                 | 6 strategii de echilibrare + controlul lanțului de rezervă                                |
| 🌐 **Wildcard Router**                          | `provider/*` rutare dinamică                                                              |
| 🧠 **Gândirea controalelor bugetare**           | Limite de raționament de trecere, automate, personalizate și adaptive                     |
| 🔀 ** Aliasuri de model **                      | Aliasarea modelului încorporat + personalizat și siguranța migrării                       |
| ⚡ **Degradarea fundalului**                    | Direcționați sarcinile de fundal cu prioritate redusă către modele mai ieftine            |
| 🧪 **Rutare inteligentă în funcție de sarcini** | Se selectează automat modelul după tipul de conținut (codificare/viziune/analiza/rezumat) |
| 💬 **System Prompt Injection**                  | Controalele globale ale comportamentului aplicate în mod consecvent                       |
| 📄 **Responses API Compatibility**              | Suport complet `/v1/responses` pentru Codex și fluxuri de lucru agentice avansate         |

### 🎵 API-uri multimodale

| Caracteristica            | Ce face                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🖼️ **Generarea imaginii** | `/v1/images/generations` cu cloud și backend locale                                                                                                                            |
| 📐 **Inglobări**          | `/v1/embeddings` pentru conducte de căutare și RAG                                                                                                                             |
| 🎤 **Transcriere audio**  | `/v1/audio/transcriptions` — 7 furnizori (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), detectarea automată a limbii, suport MP4/MP3/WAV |
| 🔊 **Text-to-speech**     | `/v1/audio/speech` — 10 furnizori (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) cu mesaje de eroare corecte              |
| 🎬 **Generație video**    | `/v1/videos/generations` (fluxuri de lucru ComfyUI + SD WebUI)                                                                                                                 |
| 🎵 **Generație muzicală** | `/v1/music/generations` (fluxuri de lucru ComfyUI)                                                                                                                             |
| 🛡️ **Moderații**          | `/v1/moderations` verificări de siguranță                                                                                                                                      |
| 🔀 **Reclasificare**      | `/v1/rerank` pentru notarea relevanței                                                                                                                                         |
| 🔍 **Căutare pe web** 🆕  | `/v1/search` — 5 furnizori (Serper, Brave, Perplexity, Exa, Tavily), peste 6.500 gratuit/lună, auto-failover, cache                                                            |

### 🛡️ Reziliență, securitate și guvernanță

| Caracteristica                               | Ce face                                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🔌 **Întrerupătoare**                        | Deplasare/recuperare per model cu controale de prag                                                        |
| 🎯 **Modele compatibile cu punctele finale** | Modelele personalizate declară puncte finale acceptate + format API                                        |
| 🛡️ **Turmă Anti-Tunete**                     | Protecții Mutex + semafor la evenimentele de reîncercare/evaluare                                          |
| 🧠 **Semantică + Cache de semnătură**        | Reducerea costului/latenței cu două straturi de cache                                                      |
| ⚡ **Solicita Idempotenta**                  | Fereastra de protecție duplicată                                                                           |
| 🔒 **TLS Fingerprint Spoofing**              | Amprenta digitală TLS asemănătoare unui browser — **reduce detectarea botului și semnalizarea contului**   |
| 🔏 **Potrivirea amprentei CLI**              | Se potrivește cu semnăturile cererilor CLI native — **reduce riscul de interzicere, păstrând IP-ul proxy** |
| 🌐 **Filtrare IP**                           | Controlul listei de permise/liste de blocare pentru implementările expuse                                  |
| 📊 **Limite de rată editabile**              | Limite configurabile globale/la nivel de furnizor cu persistență                                           |
| 🔑 **Administrarea cheilor API + Scoping**   | Emiterea/rotarea cheilor securizate și controale model/furnizor                                            |
| 🛡️ **Protejat `/models`**                    | Autentificare opțională și ascunderea furnizorului pentru catalogul de modele                              |

### 📊 Observabilitate și analiză

| Caracteristica                                    | Ce face                                                                            |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 📝 **Solicitare + Înregistrare proxy**            | Cerere/răspuns complet și înregistrare proxy                                       |
| 📋 **Tabloul de bord pentru jurnalele unificate** | Vizualizări de solicitare, proxy, audit și consolă într-o singură pagină           |
| 🔍 **Solicitare telemetrie**                      | latența p50/p95/p99 și urmărirea solicitărilor                                     |
| 🏥 **Tabloul de bord pentru sănătate**            | Uptime, stări de întrerupere, blocări, statistici cache                            |
| 💰 **Urmărirea costurilor**                       | Controalele bugetare și vizibilitatea prețurilor pe model                          |
| 📈 **Vizualizări de analiză**                     | Informații despre utilizarea modelului/furnizorului și vizualizări ale tendințelor |
| 🧪 **Cadru de evaluare**                          | Testarea setului de aur cu strategii de meci configurabile                         |

### ☁️ Implementare și platformă

| Caracteristica                        | Ce face                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| 🌐 **Implementează oriunde**          | Localhost, VPS, Docker, medii cloud                                            |
| 💾 **Cloud Sync**                     | Sincronizarea configurației prin cloud worker                                  |
| 🔄 **Backup/Restaurare**              | Export/import și fluxuri de recuperare în caz de dezastru                      |
| 🧙 **Onboarding Wizard**              | Configurare ghidată pentru prima rulare                                        |
| 🔧 **Tabloul de bord CLI Tools**      | Configurare cu un singur clic pentru instrumentele populare de codare          |
| 🎮 **Teren de joacă model**           | Testați orice furnizor/model/punct final din tabloul de bord                   |
| 🔏 **CLI Fingerprint Toggle**         | Potrivirea amprentelor pentru fiecare furnizor în Setări > Securitate          |
| 🌐 **i18n (30 de limbi)**             | Tabloul de bord complet + suport pentru limbajul documentelor cu acoperire RTL |
| 🧹 **Șterge toate modelele**          | Ștergerea listei de modele cu un singur clic în detaliile furnizorului         |
| 📋 **Șabloane de probleme**           | Șabloane GitHub standardizate pentru erori și caracteristici                   |
| 📂 **Director de date personalizate** | `DATA_DIR` anulează pentru locația de stocare                                  |

### Caracteristică Deep Dive

#### Alternativ inteligent cu control practic al costurilor

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Când cota, rata sau starea de sănătate eșuează, OmniRoute trece automat la următorul candidat fără comutare manuală.

#### Managementul protocolului care este vizibil și operabil

- MCP + A2A pot fi descoperite în UI și în documente (nu sunt ascunse)
- API-urile privind starea protocolului expun date operaționale live (`/api/mcp/*`, `/api/a2a/*`)
- Tablourile de bord includ acțiuni pentru operațiunile din a doua zi (comutații combo, resetări întrerupătoare, anularea sarcinilor)

#### Traducător + flux de lucru de validare

Zona Translator include:

- **Teren de joacă**: solicitați verificări de transformare
- **Tester de chat**: cerere/răspuns complet dus-întors
- **Bancul de testare**: mai multe cazuri într-o singură cursă
- **Live Monitor**: vizualizare în timp real a traficului

Plus validarea protocolului cu clienți reali prin `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Referință pentru instrumente, configurații IDE și exemple de clienți
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Abilități, metode JSON-RPC, streaming și ciclul de viață al sarcinilor

## 🧪 Evaluări (Evaluări)

OmniRoute include un cadru de evaluare încorporat pentru a testa calitatea răspunsului LLM față de un set de aur. Accesați-l prin **Analitice → Evaluări** în tabloul de bord.

### Set de aur încorporat

„Setul de aur OmniRoute” preîncărcat conține cazuri de testare pentru:

- Salutări, matematică, geografie, generare de cod
- Conformitatea formatului JSON, traducere, generare de reduceri
- Refuz de siguranță (conținut nociv), numărare, logică booleană

### Strategii de evaluare

| Strategie  | Descriere                                                                 | Exemplu                          |
| ---------- | ------------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Ieșirea trebuie să se potrivească exact cu                                | `"4"`                            |
| `contains` | Ieșirea trebuie să conțină subșir (indiferență de majuscule și minuscule) | `"Paris"`                        |
| `regex`    | Ieșirea trebuie să se potrivească cu modelul regex                        | `"1.*2.*3"`                      |
| `custom`   | Funcția JS personalizată returnează adevărat/fals                         | `(output) => output.length > 10` |

---

## 📖 Ghid de configurare

### Configurare protocol (MCP + A2A)

<details>
<summary><b>🧩 Configurare MCP (Model Context Protocol)</b></summary>

Porniți transportul MCP în modul stdio:

```bash
omniroute --mcp
```

Flux de validare recomandat:

1. Conectați clientul MCP prin stdio.
2. Rulați `omniroute_get_health`.
3. Rulați `omniroute_list_combos`.
4. Deschideți `/dashboard/mcp` pentru a confirma bătăile inimii, activitatea și auditul.

API-uri utile pentru automatizare:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Configurare A2A (Agent2Agent)</b></summary>

Descoperiți agentul:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Trimiteți o sarcină:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Gestionați ciclul de viață:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Interfața de utilizare operațională:

- `/dashboard/a2a` pentru observabilitate sarcini/stare/flux și acțiuni de fum

</details>

<details>
<summary><b>🧪 Validarea protocolului end-to-end</b></summary>

Validați ambele protocoale cu clienți reali:

```bash
npm run test:protocols:e2e
```

Aceasta verifică:

- Conectare/lista/apelare client MCP SDK
- A2A descoperire/trimitere/stream/obține/anulează
- Verificați încrucișați datele în auditul MCP și API-urile de gestionare a sarcinilor A2A

</details>

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

#### Managementul limitelor contului Codex (5 ore + săptămânal)

Fiecare cont Codex are acum comutări de politică în `Dashboard -> Providers`:

- `5h` (ON/OFF): aplicați politica privind pragul ferestrei de 5 ore.
- `Weekly` (ON/OFF): aplicați politica săptămânală privind pragul ferestrei.
- Comportamentul de prag: când o fereastră activată atinge >=90% utilizare, acel cont este omis.
- Comportament de rotație: OmniRoute direcționează automat către următorul cont Codex eligibil.
- Resetare comportament: când furnizorul `resetAt` trece timpul, contul devine din nou eligibil automat.

Scenarii:

- `5h ON` + `Weekly ON`: contul este omis atunci când oricare dintre ferestre atinge pragul.
- `5h OFF` + `Weekly ON`: numai utilizarea săptămânală poate bloca contul.
- `5h ON` + `Weekly OFF`: doar utilizarea de 5 ore poate bloca contul.
- `resetAt` trecut: contul reintră automat în rotație (fără reactivare manuală).

### Gemini CLI (GRATIS 180K/lună!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Cea mai bună valoare:** Nivel gratuit imens! Folosiți-l înainte de nivelurile plătite.

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

### NVIDIA NIM (acces GRATUIT pentru dezvoltatori — peste 70 de modele)

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

### MiniMax M2.1 (resetare în 5 ore, 0,20 USD/1 milion)

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

### iFlow (5 modele GRATUITE prin OAuth)

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

### Qwen (4 modele GRATUITE prin codul dispozitivului)

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

### OpenCode

**Pasul 1:** Adăugați OmniRoute ca furnizor personalizat:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Pasul 2:** Creați/editați `opencode.json` în rădăcina proiectului dvs.:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Pasul 3:** Selectați modelul în OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Sfat:** Adăugați orice model disponibil în punctul final OmniRoute `/v1/models` la secțiunea `models`. Utilizați formatul `provider/model-id` din tabloul de bord OmniRoute.

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

**Tabloul de bord/porturile API sunt greșite**

- `PORT` este portul de bază canonic (și portul API în mod implicit)
- `API_PORT` suprascrie numai ascultatorul API compatibil cu OpenAI
- `DASHBOARD_PORT` anulează numai tabloul de bord/ascultătorul Next.js
- Setați `NEXT_PUBLIC_BASE_URL` la tabloul de bord/adresa URL publică (pentru apelurile inverse OAuth)

**Erori de sincronizare în cloud**

- Verificați `BASE_URL` puncte către instanța dvs. care rulează
- Verificați `CLOUD_URL` puncte către punctul final din cloud așteptat
- Păstrați valorile `NEXT_PUBLIC_*` aliniate cu valorile de pe server

**Prima conectare nu funcționează**

- Verificați `INITIAL_PASSWORD` în `.env`
- Dacă nu este setată, parola de rezervă este `123456`

**Fără jurnal de solicitare**

- Setați `ENABLE_REQUEST_LOGS=true` în `.env`

**Testul de conectare arată „Invalid” pentru furnizorii compatibili cu OpenAI**

- Mulți furnizori nu expun un punct final `/models`
- OmniRoute v1.0.6+ include validarea de rezervă prin finalizarea chatului
- Asigurați-vă că adresa URL de bază include sufixul `/v1`

### 🔐 OAuth pe un server la distanță

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Important pentru utilizatorii care rulează OmniRoute pe un VPS, Docker sau orice server la distanță**

#### De ce eșuează Antigravity / Gemini CLI OAuth pe serverele de la distanță?

Furnizorii de **Antigravity** și **Gemini CLI** folosesc **Google OAuth 2.0**. Google necesită `redirect_uri` din fluxul OAuth pentru a se potrivi exact cu unul dintre URI-urile preînregistrate în Google Cloud Console a aplicației.

Acreditările OAuth incluse în OmniRoute sunt înregistrate **doar pentru `localhost`**. Când accesați OmniRoute pe un server la distanță (de exemplu, `https://omniroute.myserver.com`), Google respinge autentificarea cu:

```
Error 400: redirect_uri_mismatch
```

#### Soluție: Configurați propriile acreditări OAuth

Trebuie să creați un **OAuth 2.0 Client ID** în Google Cloud Console cu URI-ul serverului dvs.

#### Pas cu pas

**1. Deschide Google Cloud Console**

Accesați: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Creați un nou ID de client OAuth 2.0**

- Faceți clic pe **"+ Creați acreditări"** → **"ID client OAuth"**
- Tip aplicație: **"Aplicație web"**
- Nume: orice vă place (de exemplu, `OmniRoute Remote`)

**3. Adăugați URI de redirecționare autorizate**

În câmpul **„URI-uri de redirecționare autorizate”**, adăugați:

```
https://your-server.com/callback
```

> Înlocuiți `your-server.com` cu domeniul sau IP-ul serverului dvs. (includeți portul dacă este necesar, de exemplu, `http://45.33.32.156:20128/callback`).

**4. Salvați și copiați acreditările**

După creare, Google va afișa **Client ID** și **Client Secret**.

**5. Setați variabile de mediu**

În `.env` (sau variabilele de mediu Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Reporniți OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Încercați să vă conectați din nou**

Tabloul de bord → Furnizori → Antigravity (sau Gemini CLI) → OAuth

Google va redirecționa acum corect către `https://your-server.com/callback`.

---

#### Soluție temporară (fără acreditări personalizate)

Dacă nu doriți să vă configurați propriile acreditări chiar acum, puteți utiliza în continuare **fluxul manual de adrese URL**:

1. OmniRoute deschide adresa URL de autorizare Google
2. După autorizare, Google încearcă să redirecționeze către `localhost` (care nu reușește pe serverul de la distanță)
3. **Copiați adresa URL completă** din bara de adrese a browserului dvs. (chiar dacă pagina nu se încarcă)
4. Lipiți acea adresă URL în câmpul afișat în modalul de conexiune OmniRoute
5. Faceți clic pe **"Conectați"**

> Acest lucru funcționează deoarece codul de autorizare din URL este valid, indiferent dacă pagina de redirecționare a fost încărcată.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Por que o OAuth do Antigravity / Gemini CLI falha em serveres remotes?

Pentru autentificare, **Antigravity** și **Gemini CLI** folosesc **Google OAuth 2.0**. O Google exige que a `redirect_uri` utilizat nu fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console do aplicative.

As credenciais OAuth embutidas no OmniRoute esteão cadastradas **apenas for `localhost`**. Când accesați OmniRoute într-un server la distanță (ex: `https://omniroute.meuservidor.com`), sau Google respinge autentificarea com:

```
Error 400: redirect_uri_mismatch
```

#### Soluție: Configurați propriile acreditări OAuth

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

> Substitue `seu-servidor.com` pelo domínio sau IP do seu server (inclua a porta se necessário, ex: `http://45.33.32.156:20128/callback`).

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

#### Soluție temporară (sem configura credenciais proprias)

Nu vă rugăm să vă convingeți acum, dar este posibil să utilizați sau să fluxați **manual de URL**:

1. OmniRoute deschide o adresă URL de autorizare Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no server remote)
3. **Copiați o adresă URL completă** da bara de accesare a browserului (mesmo que a page não carregue)
4. Cole essa URL nu există câmpuri care nu apar modal de conexão pentru OmniRoute
5. Faceți clic pe **„Conectați-vă”**

> Această soluție de soluționare funcționează deoarece codul de autorizare a URL-ului este valabil independent de redirecționare pentru a încărca sau nu.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Faceți clic pentru a extinde detaliile tehnologice</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ este **nu este acceptat** - `better-sqlite3` binarele native sunt incompatibile)
- **Limba**: TypeScript 5.9 — **100% TypeScript** în `src/` și `open-sse/` (zero `any` în modulele de bază începând cu v2.0)
- **Cadru**: Next.js 16 + React 19 + Tailwind CSS 4
- **Bază de date**: LowDB (JSON) + SQLite (starea domeniului + jurnalele proxy + audit MCP + decizii de rutare)
- **Scheme**: Zod (validare I/O instrument MCP, contracte API)
- **Protocoale**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: evenimente trimise de server (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + Chei API + Autorizare MCP
- **Testare**: Runner de testare Node.js + Vitest (900+ teste inclusiv unitate, integrare, E2E)
- **CI/CD**: GitHub Actions (publicare automată npm + Docker Hub la lansare)
- **Site web**: [omniroute.online](https://omniroute.online)
- **Pachet**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Reziliență**: întrerupător de circuit, backoff exponențial, turmă anti-tunet, falsificare TLS, auto-vindecare combo

</details>

---

## 📖 Documentație

| Document                                       | Descriere                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Furnizori, combo-uri, integrare CLI, implementare                   |
| [API Reference](docs/API_REFERENCE.md)         | Toate punctele finale cu exemple                                    |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 instrumente MCP, configurații IDE, clienți Python/TS/Go          |
| [A2A Server](src/lib/a2a/README.md)            | Protocol JSON-RPC 2.0, abilități, streaming, gestionarea sarcinilor |
| [Auto-Combo Engine](docs/auto-combo.md)        | Scor în 6 factori, pachete de moduri, auto-vindecare                |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Probleme și soluții comune                                          |
| [Architecture](docs/ARCHITECTURE.md)           | Arhitectura sistemului și elementele interne                        |
| [Contributing](CONTRIBUTING.md)                | Configurare și linii directoare de dezvoltare                       |
| [OpenAPI Spec](docs/openapi.yaml)              | Specificație OpenAPI 3.0                                            |
| [Security Policy](SECURITY.md)                 | Raportarea vulnerabilităților și practicile de securitate           |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Ghid complet: VM + nginx + configurare Cloudflare                   |
| [Features Gallery](docs/FEATURES.md)           | Tur vizual al tabloului de bord cu capturi de ecran                 |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Pașii de validare înainte de lansare                                |

---

## 🗺️ Foaia de parcurs

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

> 📝 Specificații complete ale caracteristicilor disponibile în [**OMNI_TOKEN_342**](docs/new-features/) (217 specificații detaliate)

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
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Istoria stelelor

## Observatorii stelelor de-a lungul timpului

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
<!-- Discuții GitHub activate pentru întrebări și răspunsuri ale comunității -->
