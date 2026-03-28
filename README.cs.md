# 🚀 OmniRoute — bezplatná brána umělé inteligence

### Nikdy nepřestávejte kódovat. Chytré směrování na **BEZPLATNÉ a levné modely s umělou inteligencí** s automatickým zálohováním.

_Váš univerzální API proxy – jeden koncový bod, 67+ poskytovatelů, nulové prostoje. Nyní s orchestrací agentů **MCP & A2A**._

**Dokončení chatu • Vložení • Generování obrázků • Video • Hudba • Zvuk • Změna pořadí • **Vyhledávání na webu** • Server MCP • Protokol A2A • 100% TypeScript**

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

🌐 **Dostupné v:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Co je nového ve verzi 3.0.0

> **Upgrade z verze 2.9.5?** — Všechny změny najdete v [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main).

| Oblast                                  | Změnit                                                                                                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🔒 **Zabezpečení CodeQL**               | Opraveno 10+ upozornění CodeQL: polynomial-redos, nejistá náhodnost, náprava shell-injection                                                                                                                 |
| ✅ **Ověření trasy**                    | Všech 176 tras API je nyní ověřeno pomocí schémat Zod + `validateBody()` – průkazy CI `check:route-validation:t06`                                                                                           |
| 🐛 **omniModel Tag Leak**               | Interní značky `<omniModel>` již neunikají klientům v odpovědích streamování SSE (#585)                                                                                                                      |
| 🔑 **Registered Keys API**              | Klíče API pro automatické poskytování prostřednictvím `POST /api/v1/registered-keys` s vynucováním kvót pro jednotlivé poskytovatele/účty, idempotence, úložiště SHA-256 a volitelné hlášení problémů GitHub |
| 🎨 **Ikony poskytovatelů**              | Více než 130 log poskytovatelů prostřednictvím `@lobehub/icons` (SVG) s PNG → obecný záložní řetězec                                                                                                         |
| 🔄 **Automatická synchronizace modelu** | 24h plánovač a ruční přepínání uživatelského rozhraní pro synchronizaci seznamů modelů pro vestavěné a vlastní poskytovatele kompatibilní s OpenAI                                                           |
| 🌐 **OpenCode Zen/Go**                  | Dva noví poskytovatelé od @kang-heewon prostřednictvím PR #530: úroveň zdarma + úroveň předplatného přes `OpencodeExecutor`                                                                                  |
| 🐛 **Gemini CLI OAuth**                 | Akční chyba, když v Dockeru chybí `GEMINI_OAUTH_CLIENT_SECRET` (byla záhadná chyba Google)                                                                                                                   |
| 🐛 **Konfigurace OpenCode**             | `saveOpenCodeConfig()` nyní správně zapisuje TOML do `XDG_CONFIG_HOME`                                                                                                                                       |
| 🐛 **Přepsání připnutého modelu**       | `body.model` správně nastaveno na `pinnedModel` při ochraně kontextové mezipaměti                                                                                                                            |
| 🐛 **Codex/Claude loop**                | `tool_result` bloky nyní převedeny na text pro zastavení nekonečných smyček                                                                                                                                  |
| 🐛 **Přesměrování přihlášení**          | Přihlášení již nezamrzá po přeskočení nastavení hesla                                                                                                                                                        |
| 🐛 **Cesty systému Windows**            | Cesty MSYS2/Git-Bash (`/c/...`) automaticky normalizovány na `C:\...`                                                                                                                                        |

---

## 🖼️ Hlavní panel

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Náhled řídicího panelu

<details>
<summary><b>Kliknutím zobrazíte snímky obrazovky řídicího panelu</b></summary>

| Strana                | Snímek obrazovky                                  |
| --------------------- | ------------------------------------------------- |
| **Poskytovatelé**     | ![Providers](docs/screenshots/01-providers.png)   |
| **Komba**             | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytika**         | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Zdraví**            | ![Health](docs/screenshots/04-health.png)         |
| **Překladatel**       | ![Translator](docs/screenshots/05-translator.png) |
| **Nastavení**         | ![Settings](docs/screenshots/06-settings.png)     |
| **Nástroje CLI**      | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Protokoly použití** | ![Usage](docs/screenshots/08-usage.png)           |
| **Koncové body**      | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Bezplatný poskytovatel AI pro vaše oblíbené kódovací agenty

_Připojte jakýkoli nástroj IDE nebo CLI s umělou inteligencí prostřednictvím OmniRoute – bezplatné brány API pro neomezené kódování._

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

<sub>📡 Všichni agenti se připojují přes <code>http://localhost:20128/v1</code> nebo <code>http://cloud.omniroute_ONline_CSNI_TOK one/v6 modely a kvóta</sub>

---

## 🤔 Proč OmniRoute?

**Přestaňte plýtvat penězi a narážet na limity:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Kvóta předplatného vyprší nevyužita každý měsíc
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Sazbové limity vás zastaví uprostřed kódování
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> drahá rozhraní API (20–50 USD měsíčně na poskytovatele)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Ruční přepínání mezi poskytovateli

**OmniRoute to řeší:**

- ✅ **Maximalizujte odběry** - Sledujte kvótu, před resetováním použijte každý bit
- ✅ **Automatická záloha** - Předplatné → Klíč API → Levné → Zdarma, nulové prostoje
- ✅ **Více účtů** - Round-robin mezi účty na poskytovatele
- ✅ **Universal** - Funguje s Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, jakýmkoliv nástrojem CLI

---

## 📧 Podpora

> 💬 **Připojte se k naší komunitě!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Získejte pomoc, sdílejte tipy a buďte informováni.

- **Web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problémy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Přispívání**: Podívejte se na [CONTRIBUTING.md](CONTRIBUTING.md), otevřete PR nebo si vyberte `good first issue`
- **Původní projekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Nahlásit chybu?

Při otevírání problému spusťte příkaz system-info a připojte vygenerovaný soubor:

```bash
npm run system-info
```

Tím se vygeneruje `system-info.txt` s vaší verzí Node.js, verzí OmniRoute, podrobnostmi OS, nainstalovanými nástroji CLI (iflow, gemini, claude, codex, antigravity, droid atd.), stavem Docker/PM2 a systémovými balíčky – vše, co potřebujeme k rychlé reprodukci vašeho problému. Připojte soubor přímo k vašemu problému na GitHubu.

---

## 🔄 Jak to funguje

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

## 🎯 Co řeší OmniRoute — 30 bodů skutečné bolesti a případy použití

> **Každý vývojář používající nástroje AI čelí těmto problémům denně.** OmniRoute byl vytvořen tak, aby je vyřešil všechny – od překročení nákladů po regionální bloky, od přerušených toků OAuth po operace protokolů a podniková pozorovatelnost.

<details>
<summary><b>💸 1. „Platím za drahé předplatné, ale stále mě vyrušují limity“</b></summary>

Vývojáři platí 20–200 $ měsíčně za Claude Pro, Codex Pro nebo GitHub Copilot. I při placení má kvóta strop – 5 hodin používání, týdenní limity nebo limity sazby za minutu. Uprostřed relace kódování poskytovatel přestane reagovat a vývojář ztrácí tok a produktivitu.

**Jak to řeší OmniRoute:**

- **Chytrý 4-úrovňový záložní zdroj** – Pokud dojde k vyčerpání kvóty předplatného, automaticky se přesměruje na klíč API → Levné → Zdarma s nulovým ručním zásahem
- **Sledování kvóty v reálném čase** – Zobrazuje spotřebu tokenů v reálném čase s resetovaným odpočítáváním (5 hodin, denně, týdně)
  – **Podpora více účtů** – Více účtů na poskytovatele s automatickým opakováním – když jeden dojde, přepne se na další
- **Vlastní komba** — Přizpůsobitelné záložní řetězce se 6 strategiemi vyvažování (nejprve naplnit, opakovaně používat, P2C, náhodné, nejméně používané, nákladově optimalizované)
- **Codex Business Quotas** — Sledování kvót Business/Tým pracovního prostoru přímo na řídicím panelu

</details>

<details>
<summary><b>🔌 2. "Potřebuji používat více poskytovatelů, ale každý má jiné API"</b></summary>

OpenAI používá jeden formát, Claude (Anthropic) jiný a Gemini ještě jiný. Pokud chce vývojář testovat modely od různých poskytovatelů nebo mezi nimi couvnout, musí překonfigurovat sady SDK, změnit koncové body, vypořádat se s nekompatibilními formáty. Vlastní poskytovatelé (FriendLI, NIM) mají nestandardní koncové body modelu.

**Jak to řeší OmniRoute:**

- **Unified Endpoint** – Jediný `http://localhost:20128/v1` slouží jako proxy pro všech 67+ poskytovatelů
- **Formátový překlad** — Automatický a transparentní: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
  – **Reakce Sanitization** – Odstraňuje nestandardní pole (`x_groq`, `usage_breakdown`, `service_tier`), která porušují OpenAI SDK v1.83+
- **Normalizace rolí** – Převádí `developer` → `system` pro poskytovatele mimo OpenAI; `system` → `user` pro GLM/ERNIE
- **Think Tag Extraction** – Extrahuje `<think>` bloky z modelů jako DeepSeek R1 do standardizovaných `reasoning_content`
- **Strukturovaný výstup pro Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatický převod
  – **`stream` výchozí nastavení na `false`** – Vyhovuje specifikaci OpenAI a zabraňuje neočekávanému SSE v sadách Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. „Můj poskytovatel umělé inteligence blokuje můj region/zemi“</b></summary>

Poskytovatelé jako OpenAI/Codex blokují přístup z určitých geografických oblastí. Během připojení OAuth a API se uživatelům zobrazují chyby jako `unsupported_country_region_territory`. To je frustrující zejména pro vývojáře z rozvojových zemí.

**Jak to řeší OmniRoute:**

– **3úrovňová konfigurace proxy** – konfigurovatelný proxy na 3 úrovních: globální (veškerý provoz), podle poskytovatele (pouze jeden poskytovatel) a podle připojení/klíče

- **Barevně kódované odznaky proxy** — Vizuální indikátory: 🢢 globální proxy, 🟡 proxy poskytovatele, 🔵 proxy připojení, vždy zobrazující IP
- **Výměna tokenů OAuth přes proxy** – tok OAuth prochází také přes proxy, čímž se řeší `unsupported_country_region_territory`
- **Testy připojení přes proxy** — Testy připojení používají nakonfigurovaný proxy (už žádné přímé obcházení)
- **Podpora SOCKS5** — Plná podpora proxy SOCKS5 pro odchozí směrování
- **TLS Fingerprint Spoofing** – TLS otisk prstu podobný prohlížeči přes `wreq-js` k obejití detekce botů
- **🔏 CLI Fingerprint Matching** – Změní pořadí záhlaví a polí těla tak, aby odpovídaly nativním binárním podpisům CLI, čímž se drasticky sníží riziko označení účtu. IP proxy serveru je zachována – získáte současně maskování IP maskování ** a** utajení

</details>

<details>
<summary><b>🆓 4. "Chci používat AI pro kódování, ale nemám peníze"</b></summary>

Ne každý může platit 20–200 $ měsíčně za předplatné AI. Studenti, vývojáři z rozvíjejících se zemí, fandové a nezávislí pracovníci potřebují přístup ke kvalitním modelům za nulové náklady.

**Jak to řeší OmniRoute:**

- **Vestavění poskytovatelé bezplatných úrovní** — Nativní podpora pro 100% bezplatné poskytovatele: iFlow (5 neomezených modelů přes OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 neomezené modely: qwen3-qwender-lash, qwen3-qwender-lash qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID zdarma), Gemini CLI (180 000 tokenů/měsíc zdarma)
- **Ollama Cloud** – modely Ollama hostované v cloudu na `api.ollama.com` s bezplatnou úrovní „Light use“; použijte předponu `ollamacloud/<model>`
- **Pouze bezplatná komba** — Řetězec `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 $/měsíc s nulovými prostoji
- **Volný přístup NVIDIA NIM** — ~40 RPM pro vývojáře - navždy bezplatný přístup k více než 70 modelům na build.nvidia.com (přechod z kreditů na limity čisté sazby)
- **Cost Optimized Strategy** – Strategie směrování, která automaticky vybírá nejlevnějšího dostupného poskytovatele

</details>

<details>
<summary><b>🔒 5. „Potřebuji chránit svou bránu AI před neoprávněným přístupem“</b></summary>

Při vystavení brány AI do sítě (LAN, VPS, Docker) může kdokoli s adresou spotřebovat tokeny/kvótu vývojáře. Bez ochrany jsou rozhraní API zranitelná vůči zneužití, rychlému vložení a zneužití.

**Jak to řeší OmniRoute:**

– **Správa klíčů API** – Generování, rotace a rozsah podle poskytovatele s vyhrazenou stránkou `/dashboard/api-manager`

- **Oprávnění na úrovni modelu** – Omezte klíče API na konkrétní modely (`openai/*`, vzory zástupných znaků) pomocí přepínače Povolit vše/Omezit
  – **API Endpoint Protection** – Vyžadovat klíč pro `/v1/models` a blokovat konkrétní poskytovatele v seznamu
- **Auth Guard + ochrana CSRF** – Všechny trasy řídicího panelu chráněny middlewarem `withAuth` + tokeny CSRF
- **Rate Limiter** — omezení rychlosti na IP pomocí konfigurovatelných oken
- **IP Filtering** — Seznam povolených/blokovaných pro řízení přístupu
- **Prompt Injection Guard** – Dezinfekce proti škodlivým vzorům výzev
- **Šifrování AES-256-GCM** — Přihlašovací údaje jsou v klidu zašifrovány

</details>

<details>
<summary><b>🛑 6. „Můj poskytovatel selhal a ztratil jsem tok kódování“</b></summary>

Poskytovatelé umělé inteligence se mohou stát nestabilními, vracet chyby 5xx nebo narazit na dočasné limity sazeb. Pokud vývojář závisí na jediném poskytovateli, je přerušen. Bez jističů mohou opakované pokusy způsobit selhání aplikace.

**Jak to řeší OmniRoute:**

- **Jistič pro každý model** — Automatické otevírání/zavírání s konfigurovatelnými prahy a ochlazením (zavřeno/otevřeno/polootevřeno), s rozsahem pro každý model, aby se zabránilo kaskádovým blokům
- **Exponential Backoff** — Progresivní zpoždění opakování
- **Anti-Thundering Herd** — Mutex + semaforová ochrana proti souběžným opakovaným bouřím
- **Combo Fallback Chains** — Pokud primární poskytovatel selže, automaticky projde řetězcem bez zásahu
- **Combo Circuit Breaker** – Automaticky deaktivuje selhávající poskytovatele v rámci kombinovaného řetězce
  – **Health Dashboard** – Monitorování provozuschopnosti, stavy jističů, uzamčení, statistiky mezipaměti, latence p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Konfigurace každého nástroje umělé inteligence je únavná a opakující se“</b></summary>

Vývojáři používají Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Každý nástroj potřebuje jinou konfiguraci (API endpoint, klíč, model). Překonfigurování při změně poskytovatele nebo modelu je ztráta času.

**Jak to řeší OmniRoute:**

- **CLI Tools Dashboard** – Vyhrazená stránka s nastavením jedním kliknutím pro Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
  – **GitHub Copilot Config Generator** – Generuje `chatLanguageModels.json` pro kód VS s hromadným výběrem modelu
- **Průvodce přihlášením** – Průvodce nastavením ve 4 krocích pro začínající uživatele
  – **Jeden koncový bod, všechny modely** – Nakonfigurujte `http://localhost:20128/v1` jednou, získáte přístup k více než 67 poskytovatelům

</details>

<details>
<summary><b>🔑 8. „Správa tokenů OAuth od více poskytovatelů je peklo“</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – všechny používají OAuth 2.0 s končícími tokeny. Vývojáři se musí neustále znovu autentizovat, řešit problémy `client_secret is missing`, `redirect_uri_mismatch` a selhání na vzdálených serverech. Zvláště problematické je OAuth na LAN/VPS.

**Jak to řeší OmniRoute:**

- **Automatické obnovení tokenu** – Tokeny OAuth se před vypršením platnosti obnovují na pozadí
- **Vestavěný OAuth 2.0 (PKCE)** — Automatický tok pro Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
  – **Multi-Account OAuth** – Více účtů na poskytovatele prostřednictvím extrakce tokenů JWT/ID
- **OAuth LAN/Remote Fix** — Detekce privátní IP adresy pro `redirect_uri` + ruční režim URL pro vzdálené servery
- **OAuth Behind Nginx** - Používá `window.location.origin` pro reverzní kompatibilitu proxy
  – **Průvodce vzdáleným OAuth** – Podrobný průvodce pro přihlašovací údaje Google Cloud na VPS/Docker

</details>

<details>
<summary><b>📊 9. "Nevím, kolik utrácím nebo kde"</b></summary>

Vývojáři využívají více placených poskytovatelů, ale nemají jednotný pohled na výdaje. Každý poskytovatel má svůj vlastní panel fakturace, ale neexistuje žádné konsolidované zobrazení. Neočekávané náklady se mohou nahromadit.

**Jak to řeší OmniRoute:**

- **Cost Analytics Dashboard** – Sledování nákladů na token a správa rozpočtu na poskytovatele
- **Rozpočtové limity na úroveň** – Strop útraty na úroveň, který spouští automatickou rezervu
- **Konfigurace cen za model** – Konfigurovatelné ceny za model
- **Statistika využití na klíč API** — Počet požadavků a naposledy použité časové razítko na klíč
  – **Panel Analytics** – Statistické karty, graf využití modelu, tabulka poskytovatelů s mírou úspěšnosti a latencí

</details>

<details>
<summary><b>🐛 10. „Nemohu diagnostikovat chyby a problémy ve voláních AI“</b></summary>

Když se volání nezdaří, vývojář neví, zda to byl limit sazby, vypršela platnost tokenu, nesprávný formát nebo chyba poskytovatele. Fragmentované protokoly napříč různými terminály. Bez pozorovatelnosti je ladění metodou pokus-omyl.

**Jak to řeší OmniRoute:**

- **Sjednocený panel protokolů** – 4 karty: Protokoly požadavků, Protokoly proxy, Protokoly auditu, Konzole
- **Console Log Viewer** — Prohlížeč ve stylu terminálu v reálném čase s barevně odlišenými úrovněmi, automatickým posouváním, vyhledáváním, filtrem
- **Protokoly SQLite Proxy** — Trvalé protokoly, které vydrží restartování serveru
- **Translator Playground** — 4 režimy ladění: Playground (překlad formátu), Tester chatu (zpáteční), Test Bench (dávka), Live Monitor (v reálném čase)
  – **Požadavek na telemetrii** – latence p50/p95/p99 + sledování X-Request-Id
  – **Protokolování založené na souborech s rotací** – Konzolový interceptor zaznamenává vše do protokolu JSON s rotací podle velikosti
- **System Info Report** – `npm run system-info` generuje `system-info.txt` s vaším úplným prostředím (verze uzlu, verze OmniRoute, OS, nástroje CLI, stav Docker/PM2). Připojte jej při hlášení problémů pro okamžité třídění.

</details>

<details>
<summary><b>🏗️ 11. „Nasazení a údržba brány je složitá“</b></summary>

Instalace, konfigurace a údržba AI proxy v různých prostředích (místní, VPS, Docker, cloud) je náročná na práci. Problémy jako pevně zakódované cesty, `EACCES` v adresářích, konflikty portů a sestavení napříč platformami zvyšují tření.

**Jak to řeší OmniRoute:**

- **Globální instalace npm** — `npm install -g omniroute && omniroute` — hotovo
- **Docker Multi-Platform** – nativní AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profily Docker Compose** — `base` (žádné nástroje CLI) a `cli` (s Claude Code, Codex, OpenClaw)
- **Electron Desktop App** – nativní aplikace pro Windows/macOS/Linux se systémovou lištou, automatickým spuštěním, offline režimem
- **Split-Port Mode** – API a Dashboard na samostatných portech pro pokročilé scénáře (reverzní proxy, kontejnerová síť)
- **Cloud Sync** — Konfigurace synchronizace mezi zařízeními pomocí Cloudflare Workers
- **DB Backups** — Automatické zálohování, obnova, export a import všech nastavení

</details>

<details>
<summary><b>🌍 12. "Rozhraní je pouze v angličtině a můj tým nemluví anglicky"</b></summary>

Týmy v neanglicky mluvících zemích, zejména v Latinské Americe, Asii a Evropě, se potýkají s rozhraním pouze v angličtině. Jazykové bariéry snižují přijetí a zvyšují chyby konfigurace.

**Jak to řeší OmniRoute:**

- **Dashboard i18n — 30 jazyků** — Všech 500+ kláves přeloženo včetně arabštiny, bulharštiny, dánštiny, němčiny, španělštiny, finštiny, francouzštiny, hebrejštiny, hindštiny, maďarštiny, indonéštiny, italštiny, japonštiny, korejštiny, malajštiny, holandštiny, norštiny, polštiny, portugalštiny (PT/BR), rumunštiny, ruštiny, slovenštiny, švédštiny, thajštiny, filipínštiny, vietnamštiny, angličtiny
- **Podpora RTL** — Podpora zprava doleva pro arabštinu a hebrejštinu
- **Vícejazyčné README** — 30 kompletních překladů dokumentace
- **Language Selector** — Ikona zeměkoule v záhlaví pro přepínání v reálném čase

</details>

<details>
<summary><b>🔄 13. „Potřebuji víc než chat – potřebuji vložení, obrázky, zvuk“</b></summary>

AI není jen dokončení chatu. Vývojáři potřebují generovat obrázky, přepisovat zvuk, vytvářet vložení pro RAG, měnit hodnocení dokumentů a moderovat obsah. Každé API má jiný koncový bod a formát.

**Jak to řeší OmniRoute:**

- **Vložení** — `/v1/embeddings` se 6 poskytovateli a více než 9 modely
- **Generování obrázků** — `/v1/images/generations` s 10 poskytovateli a 20+ modely (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) a SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Audio Transscription** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + stávající poskytovatelé
- **Moderování** — `/v1/moderations` — Kontroly bezpečnosti obsahu
- **Změna pořadí** — `/v1/rerank` — Změna relevance dokumentu
- **Responses API** – plná podpora `/v1/responses` pro Codex

</details>

<details>
<summary><b>🧪 14. „Nemám způsob, jak testovat a porovnávat kvalitu různých modelů“</b></summary>

Vývojáři chtějí vědět, který model je pro jejich případ použití nejlepší – kód, překlad, uvažování – ale ruční porovnávání je pomalé. Neexistují žádné integrované nástroje eval.

**Jak to řeší OmniRoute:**

- **Hodnocení LLM** – Testování zlaté sady s 10 předem nahranými případy zahrnujícími pozdravy, matematiku, geografii, generování kódu, soulad s JSON, překlad, markdown, bezpečnostní odmítnutí
- **4 strategie shody** — `exact`, `contains`, `regex`, `custom` (funkce JS)
- **Testovací stolice pro překladatelské hřiště** – Dávkové testování s více vstupy a očekávanými výstupy, porovnání mezi poskytovateli
- **Chat Tester** – Kompletní zpáteční cesta s vykreslováním vizuální odezvy
- **Live Monitor** — Tok všech požadavků procházejících přes proxy v reálném čase

</details>

<details>
<summary><b>📈 15. „Potřebuji škálovat bez ztráty výkonu“</b></summary>

Jak roste objem požadavků, bez ukládání stejných otázek do mezipaměti vznikají duplicitní náklady. Bez idempotence duplikát požaduje zpracování odpadu. Musí být dodrženy limity sazeb na poskytovatele.

**Jak to řeší OmniRoute:**

- **Sémantická mezipaměť** – Dvouvrstvá mezipaměť (podpis + sémantická) snižuje náklady a latenci
- **Idempotency požadavku** — 5s deduplikační okno pro identické požadavky
  – **Detekce limitu rychlosti** – RPM na poskytovatele, minimální mezera a maximální souběžné sledování
- **Upravitelné limity rychlosti** – Konfigurovatelné výchozí hodnoty v Nastavení → Odolnost s perzistencí
- **API Key Validation Cache** — 3vrstvá mezipaměť pro produkční výkon
  – **Health Dashboard s telemetrií** – latence p50/p95/p99, statistiky mezipaměti, doba provozu

</details>

<details>
<summary><b>🤖 16. „Chci globálně ovládat chování modelu“</b></summary>

Vývojáři, kteří chtějí všechny odpovědi v konkrétním jazyce, s konkrétním tónem nebo chtějí omezit tokeny uvažování. Konfigurace tohoto v každém nástroji/požadavku je nepraktická.

**Jak to řeší OmniRoute:**

- **System Prompt Injection** – Globální výzva aplikovaná na všechny požadavky
- **Thinking Budget Validation** — Řízení alokace tokenů na základě požadavku (průchozí, automatické, vlastní, adaptivní)
- **6 směrovacích strategií** — Globální strategie, které určují způsob distribuce požadavků
  – **Wildcard Router** – `provider/*` vzory dynamicky směrují k libovolnému poskytovateli
- **Povolit/zakázat přepínání komba** — Přepínejte komba přímo z řídicího panelu
- **Přepnutí poskytovatele** — Povolí/zakáže všechna připojení pro poskytovatele jedním kliknutím
  – **Blokovaní poskytovatelé** – vyloučení konkrétních poskytovatelů ze seznamu `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Potřebuji nástroje MCP jako prvotřídní schopnosti produktu"</b></summary>

Mnoho bran AI odhaluje MCP pouze jako skrytý detail implementace. Týmy potřebují viditelnou a spravovatelnou provozní vrstvu.

**Jak to řeší OmniRoute:**

- MCP se objeví v navigačním panelu a kartě protokolu koncového bodu
- Vyhrazená stránka správy MCP s procesem, nástroji, rozsahy a auditem
- Vestavěný rychlý start pro `omniroute --mcp` a registraci klienta

</details>

<details>
<summary><b>🧠 18. "Potřebuji orchestraci A2A s cestami synchronizace + streamování"</b></summary>

Pracovní postupy agentů vyžadují jak přímé odpovědi, tak dlouhotrvající streamované spouštění s řízením životního cyklu.

**Jak to řeší OmniRoute:**

– Koncový bod A2A JSON-RPC (`POST /a2a`) s `message/send` a `message/stream`

- SSE streamování s šířením koncového stavu
  – Rozhraní API životního cyklu úloh pro `tasks/get` a `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Potřebuji skutečné zdraví procesu MCP, nikoli odhadovaný stav“</b></summary>

Operační týmy potřebují vědět, zda je MCP skutečně naživu, nejen zda je API dosažitelné.

**Jak to řeší OmniRoute:**

- Soubor srdečního tepu za běhu s PID, časovými razítky, transportem, počtem nástrojů a režimem rozsahu
- Stavové API MCP kombinující srdeční tep + nedávnou aktivitu
- Stavové karty uživatelského rozhraní pro aktuálnost procesu / provozuschopnosti / srdečního tepu

</details>

<details>
<summary><b>📋 20. „Potřebuji provádění auditovatelného nástroje MCP“</b></summary>

Když nástroje mutují konfiguraci nebo spouštějí operace operací, týmy potřebují forenzní sledovatelnost.

**Jak to řeší OmniRoute:**

- Protokolování auditu podporované SQLite pro volání nástrojů MCP
- Filtry podle nástroje, úspěchu/neúspěchu, klíče API a stránkování
- Tabulka auditu řídicího panelu + statistiky koncových bodů pro automatizaci

</details>

<details>
<summary><b>🔐 21. „Potřebuji omezená oprávnění MCP na integraci“</b></summary>

Různí klienti by měli mít nejméně privilegovaný přístup ke kategoriím nástrojů.

**Jak to řeší OmniRoute:**

- 9 granulárních rozsahů MCP pro řízený přístup k nástrojům
- Vynucení rozsahu a viditelnost v uživatelském rozhraní správy MCP
- Bezpečná výchozí poloha pro provozní nástroje

</details>

<details>
<summary><b>⚙️ 22. „Potřebuji provozní kontroly bez přerozdělování“</b></summary>

Týmy potřebují rychlé změny běhového prostředí během incidentů nebo nákladových událostí.

**Jak to řeší OmniRoute:**

- Aktivace kombinace přepínačů přímo z řídicího panelu MCP
- Použijte profily odolnosti z předdefinovaných balíčků zásad
- Resetujte stav jističe ze stejného ovládacího panelu

</details>

<details>
<summary><b>🔄 23. „Potřebuji živou viditelnost životního cyklu úkolu A2A a zrušení“</b></summary>

Bez viditelnosti životního cyklu je obtížné třídit incidenty úkolů.

**Jak to řeší OmniRoute:**

- Seznam úkolů / filtrování podle stavu / dovedností se stránkováním
- Podrobnější informace o metadatech úkolů, událostech a artefaktech
- Koncový bod zrušení úlohy a akce uživatelského rozhraní s potvrzením

</details>

<details>
<summary><b>🌊 24. „Potřebuji aktivní metriky streamu pro načtení A2A“</b></summary>

Streamovací pracovní postupy vyžadují provozní přehled o souběžných a živých připojeních.

**Jak to řeší OmniRoute:**

- Aktivní čítače toku integrované do stavu A2A
- Časové razítko posledního úkolu a počty za stav
- Karty palubní desky A2A pro monitorování operací v reálném čase

</details>

<details>
<summary><b>🪪 25. "Potřebuji standardní zjišťování agentů pro klienty"</b></summary>

Externí klienti a orchestrátoři potřebují strojově čitelná metadata pro integraci.

**Jak to řeší OmniRoute:**

– Karta agenta vystavena na `/.well-known/agent.json`

- Schopnosti a dovednosti zobrazené v uživatelském rozhraní pro správu
- A2A status API obsahuje metadata zjišťování pro automatizaci

</details>

<details>
<summary><b>🧭 26. "Potřebuji zjistitelnost protokolu v uživatelském rozhraní produktu"</b></summary>

Pokud uživatelé nemohou objevit protokolové povrchy, kvalita přijetí a podpory klesá.

**Jak to řeší OmniRoute:**

– Konsolidovaná stránka **Koncové body** s kartami pro koncové body proxy, MCP, A2A a API

- Přepínání stavu inline služby (Online/Offline) pro MCP a A2A
- Odkazy z přehledu na vyhrazené karty správy

</details>

<details>
<summary><b>🧪 27. "Potřebuji komplexní ověření protokolu se skutečnými klienty"</b></summary>

Falešné testy nestačí k ověření kompatibility protokolu před vydáním.

**Jak to řeší OmniRoute:**

- Sada E2E, která spouští aplikaci a používá skutečný přenos klienta MCP SDK
- Klient A2A testuje toky zjišťování, odesílání, streamování, získávání a rušení
- Křížová kontrola tvrzení proti auditu MCP a API úloh A2A

</details>

<details>
<summary><b>📡 28. „Potřebuji jednotnou pozorovatelnost napříč všemi rozhraními“</b></summary>

Rozdělení pozorovatelnosti protokolem vytváří slepá místa a delší MTTR.

**Jak to řeší OmniRoute:**

- Sjednocené dashboardy/logy/analýzy v jednom produktu
- Zdraví + audit + telemetrie požadavků napříč vrstvami OpenAI, MCP a A2A
- Provozní API pro stav a automatizaci

</details>

<details>
<summary><b>💼 29. "Potřebuji jeden runtime pro proxy + nástroje + orchestraci agenta"</b></summary>

Provozování mnoha samostatných služeb zvyšuje provozní náklady a způsoby selhání.

**Jak to řeší OmniRoute:**

- Proxy, MCP server a A2A server v jednom zásobníku kompatibilní s OpenAI
- Sdílená autentizace, odolnost, úložiště dat a pozorovatelnost
- Konzistentní model politiky na všech interakčních plochách

</details>

<details>
<summary><b>🚀 30. „Potřebuji odeslat agentské pracovní postupy bez roztahování kódu lepidla“</b></summary>

Týmy ztrácejí rychlost při spojování více ad-hoc služeb a skriptů.

**Jak to řeší OmniRoute:**

- Jednotná strategie koncových bodů pro klienty a agenty
- Vestavěná uživatelská rozhraní pro správu protokolů a cesty ověřování kouře
- Základy připravené na výrobu (zabezpečení, protokolování, odolnost, zálohování)

</details>

### Vzorové příručky (integrované případy použití)

**Příručka A: Maximalizujte placené předplatné + levné zálohování**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Příručka B: Sada kódování s nulovými náklady**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Příručka C: 24/7 vždy zapnutý záložní řetězec**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Příručka D: Operace agenta s MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Začněte zdarma — nulové náklady na konfiguraci

> Nastavení kódování AI během několika minut za **$0/měsíc**. Propojte tyto bezplatné účty a použijte vestavěnou kombinaci **Free Stack**.

| Krok | Akce                                                 | Poskytovatelé odemčeni                                               |
| ---- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| 1    | Connect **Kiro** (AWS Builder ID OAuth)              | Claude Sonnet 4.5, Haiku 4.5 — **neomezeno**                         |
| 2    | Připojte **iFlow** (Google OAuth)                    | kimi-k2-thinking, qwen3-coder-plus, deepseek-r1... — **bez omezení** |
| 3    | Připojte **Qwen** (kód zařízení)                     | qwen3-coder-plus, qwen3-coder-flash... — **bez omezení**             |
| 4    | Připojte **Gemini CLI** (Google OAuth)               | gemini-3-flash, gemini-2.5-pro — **180 000/měsíc zdarma**            |
| 5    | `/dashboard/combos` → Šablona **Stack zdarma (0 $)** | Round-robin všechny bezplatné poskytovatele automaticky              |

**Nasměrujte libovolné IDE/CLI na:** `http://localhost:20128/v1` · Klíč API: `any-string` · Hotovo.

> **Volitelné dodatečné pokrytí (také zdarma):** Klíč Groq API (30 RPM zdarma), NVIDIA NIM (40 RPM zdarma, 70+ modelů), Cerebras (1 M token/den), LongCat API klíč (50 M tokenů/den!), Cloudflare Workers AI (10 000 neuronů/den, 50+ modelů).

## ⚡ Rychlý start

### 1) Nainstalujte a spusťte

```bash
npm install -g omniroute
omniroute
```

> **Uživatelé pnpm:** Po instalaci spusťte `pnpm approve-builds -g`, abyste povolili nativní skripty sestavení vyžadované `better-sqlite3` a `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Dashboard se otevře na `http://localhost:20128` a základní adresa URL rozhraní API je `http://localhost:20128/v1`.

| Příkaz                  | Popis                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| `omniroute`             | Spustit server (`PORT=20128`, API a řídicí panel na stejném portu) |
| `omniroute --port 3000` | Nastavte kanonický/API port na 3000                                |
| `omniroute --mcp`       | Spustit MCP server (stdio transport)                               |
| `omniroute --no-open`   | Neotevírat automaticky prohlížeč                                   |
| `omniroute --help`      | Zobrazit nápovědu                                                  |

Volitelný režim rozděleného portu:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Připojte poskytovatele a vytvořte si klíč API

1. Otevřete Dashboard → `Providers` a připojte alespoň jednoho poskytovatele (OAuth nebo klíč API).
2. Otevřete Dashboard → `Endpoints` a vytvořte klíč API.
3. (Volitelné) Otevřete Dashboard → `Combos` a nastavte svůj záložní řetězec.

### 3) Nasměrujte svůj kódovací nástroj na OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Pracuje s Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode a SDK kompatibilní s OpenAI.

### 4) Povolte a ověřte protokoly (v2.0)

**MCP (pro operace řízené nástrojem):**

```bash
omniroute --mcp
```

Poté připojte svého MCP klienta přes `stdio` a otestujte nástroje jako:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (pro pracovní postupy mezi agenty):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Ověřte vše od začátku do konce (doporučeno)

```bash
npm run test:protocols:e2e
```

Tato sada ověřuje skutečné klientské toky MCP a A2A proti běžící aplikaci.

### Alternativa: spustit ze zdroje

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute je k dispozici jako veřejný obrázek Dockeru na [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Rychlý běh:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Se souborem prostředí:**

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

**Použití Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Obrázek                  | Štítek   | Velikost | Popis                   |
| ------------------------ | -------- | -------- | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB  | Poslední stabilní verze |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB  | Aktuální verze          |

---

## 🖥️ Desktopová aplikace — offline a vždy zapnutá

> 🆕 **NOVINKA!** OmniRoute je nyní k dispozici jako **nativní desktopová aplikace** pro Windows, macOS a Linux.

Spusťte OmniRoute jako samostatnou desktopovou aplikaci – pro místní modely není potřeba žádný terminál, žádný prohlížeč ani internet. Aplikace založená na Electronu zahrnuje:

- 🖥️ **Nativní okno** — Vyhrazené okno aplikace s integrací na systémové liště
- 🔄 **Auto-Start** – Spusťte OmniRoute při přihlášení do systému
- 🔔 **Nativní oznámení** – Získejte upozornění na vyčerpání kvóty nebo problémy s poskytovatelem
- ⚡ **Instalace jedním kliknutím** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Režim offline** – Funguje plně offline s přibaleným serverem

### Rychlý start

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systémová lišta

Když je minimalizován, OmniRoute žije v systémové liště s rychlými akcemi:

- Otevřete palubní desku
- Změňte port serveru
- Ukončete aplikaci

📖 Úplná dokumentace: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Přehled cen

| Úroveň            | Poskytovatel                | Cena                             | Obnovení kvóty              | Nejlepší pro                               |
| ----------------- | --------------------------- | -------------------------------- | --------------------------- | ------------------------------------------ |
| **💳 PŘEDPLATNÉ** | Claude Code (Pro)           | 20 $/měsíc                       | 5h + týdně                  | Již přihlášeno                             |
|                   | Codex (Plus/Pro)            | 20–200 USD/měsíc                 | 5h + týdně                  | Uživatelé OpenAI                           |
|                   | Gemini CLI                  | **ZDARMA**                       | 180 tis./měsíc + 1 tis./den | Každý!                                     |
|                   | GitHub Copilot              | 10–19 USD/měsíc                  | Měsíčně                     | Uživatelé GitHubu                          |
| **🔑 API KEY**    | NVIDIA NIM                  | **ZDARMA** (dev forever)         | ~40 RPM                     | 70+ otevřených modelů                      |
|                   | Cerebras                    | **ZDARMA** (1 milion toku/den)   | 60 000 TPM / 30 RPM         | Nejrychlejší na světě                      |
|                   | Groq                        | **ZDARMA** (30 RPM)              | 14,4K RPD                   | Ultra rychlá lama/gemma                    |
|                   | DeepSeek V3.2               | 0,27 $ / 1,10 $ za 1 milion      | Žádné                       | Nejlepší zdůvodnění cena/kvalita           |
|                   | xAI Grok-4 Fast             | **0,20 $/0,50 $ za 1M** 🆕       | Žádné                       | Nejrychlejší + volání nástroje, ultranízké |
|                   | xAI Grok-4 (standardní)     | 0,20 $/1,50 $ za 1M 🆕           | Žádné                       | Reasoning vlajková loď od xAI              |
|                   | Mistral                     | Vyzkoušení zdarma + placené      | Omezená sazba               | Evropská umělá inteligence                 |
|                   | OpenRouter                  | Platba za použití                | Žádné                       | 100+ modelů agr.                           |
| **💰 LEVNĚ**      | GLM-5 (přes Z.AI) 🆕        | 0,5 $/1 mil.                     | Denně 10:00                 | 128K výstup, nejnovější vlajková loď       |
|                   | GLM-4.7                     | 0,6 $/1 mil.                     | Denně 10:00                 | Záloha rozpočtu                            |
|                   | MiniMax M2,5 🆕             | Vstup 0,3 $/1 milion             | 5hodinové válcování         | Úvahy + agentské úkoly                     |
|                   | MiniMax M2.1                | 0,2 $/1 mil.                     | 5hodinové válcování         | Nejlevnější varianta                       |
|                   | Kimi K2.5 (Moonshot API) 🆕 | Platba za použití                | Žádné                       | Přímý přístup Moonshot API                 |
|                   | Kimi K2                     | 9 $/měsíc byt                    | 10 milionů tokenů/měsíc     | Předvídatelné náklady                      |
| **🆓 ZDARMA**     | iFlow                       | **$0**                           | Neomezené                   | 5 modelů neomezeně                         |
|                   | Qwen                        | **$0**                           | Neomezené                   | 4 modely neomezeně                         |
|                   | Kiro                        | **$0**                           | Neomezené                   | Claude Sonnet/Haiku (stavitel AWS)         |
|                   | LongCat Flash-Lite 🆕       | **$0** (50 milionů toku/den 🔥)  | 1 RPS                       | Největší bezplatná kvóta na Zemi           |
|                   | Opylování AI 🆕             | **$0** (není potřeba žádný klíč) | 1 požadavek/15s             | GPT-5, Claude, DeepSeek, Llama 4           |
|                   | Cloudflare Workers AI 🆕    | **$0** (10 000 neuronů/den)      | ~150 resp./den              | 50+ modelů, globální náskok                |
|                   | Scaleway AI 🆕              | **$0** (celkem 1 milion tokenů)  | Omezená sazba               | EU/GDPR, Qwen3 235B, Lama 70B              |

> 🆕 **Přidané nové modely (březen 2026):** Rodina Grok-4 Fast za 0,20 $/0,50 $/M (porovnávací rychlost 1143 ms – o 30 % rychlejší než Gemini 2.5 Flash), GLM-5 přes Z.AI s výstupem 128K, aktualizovaná cena MiniMax M2.5 V5, Kimishot K2 API přímo.

**💡 Combo Stack 0 $ — Kompletní bezplatné nastavení:**

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

**Nulové náklady. Nikdy nepřestane kódovat.** Nakonfigurujte si to jako jednu kombinaci OmniRoute a všechna nouzová řešení se stanou automaticky – žádné ruční přepínání.

---

---

## 🆓 Modely zdarma — to, co skutečně získáte

> Všechny níže uvedené modely jsou **100% zdarma bez nutnosti použití kreditní karty**. OmniRoute mezi nimi automaticky přesměrovává, když vyčerpá jedna kvóta – zkombinujte je všechny a získáte nerozbitnou kombinaci 0 $.

### 🔵 CLAUDE MODELS (přes Kiro — AWS Builder ID)

| Model               | Předpona | Limit         | Limit sazby               |
| ------------------- | -------- | ------------- | ------------------------- |
| `claude-sonnet-4.5` | `kr/`    | **Neomezeno** | Žádný hlášený denní limit |
| `claude-haiku-4.5`  | `kr/`    | **Neomezeno** | Žádný hlášený denní limit |
| `claude-opus-4.6`   | `kr/`    | **Neomezeno** | Nejnovější Opus přes Kiro |

### 🢢 MODELY IFLOW (bezplatný protokol OAuth – žádná kreditní karta)

| Model              | Předpona | Limit         | Limit sazby           |
| ------------------ | -------- | ------------- | --------------------- |
| `kimi-k2-thinking` | `if/`    | **Neomezeno** | Žádný nahlášený strop |
| `qwen3-coder-plus` | `if/`    | **Neomezeno** | Žádný nahlášený strop |
| `deepseek-r1`      | `if/`    | **Neomezeno** | Žádný nahlášený strop |
| `minimax-m2.1`     | `if/`    | **Neomezeno** | Žádný nahlášený strop |
| `kimi-k2`          | `if/`    | **Neomezeno** | Žádný nahlášený strop |

### 🡡 QWEN MODELS (Auth Code Auth)

| Model               | Předpona | Limit         | Limit sazby            |
| ------------------- | -------- | ------------- | ---------------------- |
| `qwen3-coder-plus`  | `qw/`    | **Neomezeno** | Žádný nahlášený strop  |
| `qwen3-coder-flash` | `qw/`    | **Neomezeno** | Žádný nahlášený strop  |
| `qwen3-coder-next`  | `qw/`    | **Neomezeno** | Žádný nahlášený strop  |
| `vision-model`      | `qw/`    | **Neomezeno** | Multimodální (obrázky) |

### 🟣 GEMINI CLI (Google OAuth)

| Model                    | Předpona | Limit                           | Limit sazby    |
| ------------------------ | -------- | ------------------------------- | -------------- |
| `gemini-3-flash-preview` | `gc/`    | **180 tis./měsíc** + 1 tis./den | Měsíční reset  |
| `gemini-2.5-pro`         | `gc/`    | 180 tis./měsíc (sdílený bazén)  | Vysoká kvalita |

### ⚫ NVIDIA NIM (bezplatný klíč API — build.nvidia.com)

| Úroveň       | Denní limit     | Limit sazby | Poznámky                                                       |
| ------------ | --------------- | ----------- | -------------------------------------------------------------- |
| Zdarma (Dev) | Žádný token cap | **~40 RPM** | 70+ modelů; přechod na limity čisté sazby v polovině roku 2025 |

Oblíbené bezplatné modely: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`\_, \_6_18

### ⚪ CEREBRAS (Free API Key — inference.cerebras.ai)

| Úroveň | Denní limit           | Limit sazby         | Poznámky                                          |
| ------ | --------------------- | ------------------- | ------------------------------------------------- |
| Zdarma | **1 mil. tokenů/den** | 60 000 TPM / 30 RPM | Světově nejrychlejší odvození LLM; resetuje denně |

Dostupné zdarma: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (Free API Key — console.groq.com)

| Úroveň | Denní limit   | Limit sazby         | Poznámky                                        |
| ------ | ------------- | ------------------- | ----------------------------------------------- |
| Zdarma | **14,4K RPD** | 30 ot./min na model | Žádná kreditní karta; 429 na limit, neúčtuje se |

Dostupné zdarma: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (bezplatný klíč API — longcat.chat) 🆕

| Model                         | Předpona | Denní kvóta zdarma       | Poznámky                           |
| ----------------------------- | -------- | ------------------------ | ---------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`    | **50 milionů žetonů** 💥 | Největší bezplatná kvóta všech dob |
| `LongCat-Flash-Chat`          | `lc/`    | 500 000 tokenů           | Víceotáčkový chat                  |
| `LongCat-Flash-Thinking`      | `lc/`    | 500 000 tokenů           | Zdůvodnění / CoT                   |
| `LongCat-Flash-Thinking-2601` | `lc/`    | 500 000 tokenů           | Verze z ledna 2026                 |
| `LongCat-Flash-Omni-2603`     | `lc/`    | 500 000 tokenů           | Multimodální                       |

> 100% zdarma ve veřejné beta verzi. Zaregistrujte se na [longcat.chat](https://longcat.chat) pomocí e-mailu nebo telefonu. Resetuje se denně v 00:00 UTC.

### 🢢 POLLINATIONS AI (nevyžaduje se žádný klíč API) 🆕

| Model      | Předpona | Limit sazby     | Poskytovatel za    |
| ---------- | -------- | --------------- | ------------------ |
| `openai`   | `pol/`   | 1 požadavek/15s | GPT-5              |
| `claude`   | `pol/`   | 1 požadavek/15s | Antropický Claude  |
| `gemini`   | `pol/`   | 1 požadavek/15s | Google Gemini      |
| `deepseek` | `pol/`   | 1 požadavek/15s | DeepSeek V3        |
| `llama`    | `pol/`   | 1 požadavek/15s | Meta Llama 4 Scout |
| `mistral`  | `pol/`   | 1 požadavek/15s | Mistral AI         |

> ✨ **Nulové tření:** Žádná registrace, žádný klíč API. Přidejte poskytovatele Pollinations s prázdným polem klíče a funguje to okamžitě.

### 🟠 CLOUDFLARE WORKERS AI (Free API Key — cloudflare.com) 🆕

| Úroveň | Denní neurony | Ekvivalentní použití                     | Poznámky                |
| ------ | ------------- | ---------------------------------------- | ----------------------- |
| Zdarma | **10 000**    | ~150 LLM resp / 500s audio / 15K vložení | Global edge, 50+ modelů |

Oblíbené bezplatné modely: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (zvuk zdarma!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Vyžaduje API Token + ID účtu z [dash.cloudflare.com](https://dash.cloudflare.com). Uložte ID účtu v nastavení poskytovatele.

### 🟣 SCALEWAY AI (1 milion bezplatných tokenů — scaleway.com) 🆕

| Úroveň | Kvóta zdarma        | Umístění     | Poznámky                                         |
| ------ | ------------------- | ------------ | ------------------------------------------------ |
| Zdarma | **1 milion tokenů** | 🇫🇷 Paříž, EU | V rámci limitů není potřeba žádná kreditní karta |

Dostupné zdarma: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> V souladu s EU/GDPR. Získejte API klíč na [console.scaleway.com](https://console.scaleway.com).

> **💡 The Ultimate Free Stack (11 poskytovatelů, 0 $ navždy):**
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

## 🎙️ Kombinace bezplatných přepisů

> Přepis jakéhokoli zvuku/videa za **$0** — Deepgram vede s 200 $ zdarma, AssemblyAI 50 $ nouzové zálohy, Groq Whisper jako neomezené nouzové zálohování.

| Poskytovatel       | Kredity zdarma                | Nejlepší modelka                                 | Limit sazby                          |
| ------------------ | ----------------------------- | ------------------------------------------------ | ------------------------------------ |
| 🢢 **Deepgram**     | **200 $ zdarma** (registrace) | `nova-3` — nejvyšší přesnost, více než 30 jazyků | Žádný limit RPM na bezplatné kredity |
| 🔵 **SestaveníAI** | **50 $ zdarma** (registrace)  | `universal-3-pro` — kapitoly, sentiment, PII     | Žádný limit RPM na bezplatné kredity |
| 🔴 **Groq**        | **Navždy zdarma**             | `whisper-large-v3` — OpenAI Whisper              | 30 RPM (rychlost omezená)            |

**Doporučená kombinace v `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Poté na `/dashboard/media` → karta **Přepis**: nahrajte jakýkoli zvukový nebo video soubor → vyberte svůj kombinovaný koncový bod → získejte přepis v podporovaných formátech.

## 💡 Klíčové vlastnosti

OmniRoute v2.0 je postaven jako operační platforma, nikoli pouze jako přenosová proxy.

### 🆕 Novinka — Vylepšení inspirovaná ClawRouterem (březen 2026)

| Funkce                                    | Co to dělá                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**                 | xAI modely za 0,20 $/0,50 $/M – srovnávací 1143 ms (o 30 % rychlejší než Gemini 2.5 Flash)                                      |
| 🧠 **GLM-5 přes Z.AI**                    | 128 000 výstupní kontext, 0,5 $/1 milion – nejnovější vlajková loď z rodiny GLM                                                 |
| 🔮 **MiniMax M2.5**                       | Úvahy + agentní úkoly za 0,30 $/1 milion – významný upgrade z M2,1                                                              |
| 🎯 **toolCalling Flag na model**          | Pro model `toolCalling: true/false` v registru – AutoCombo přeskočí modely, které nepodporují nástroje                          |
| 🌍 **Multilingual Intent Detection**      | Klíčová slova PT/ZH/ES/AR v hodnocení AutoCombo – lepší výběr modelu pro neanglický obsah                                       |
| 📊 **Zástupy založené na benchmarku**     | Skutečná latence p95 z kombinovaného bodování zdrojů živých požadavků – AutoCombo se učí ze skutečných dat                      |
| 🔁 **Požádat o deduplikaci**              | Okno pro odstranění duplicitního obsahu založené na hašování obsahu – bezpečné pro více agentů, zabraňuje duplicitním poplatkům |
| 🔌 **Strategie připojitelného směrovače** | Rozšiřitelné rozhraní `RouterStrategy` – přidat vlastní logiku směrování jako zásuvné moduly                                    |

### 🚀 Předchozí v2.0.9+ — Hřiště, CLI Fingerprints & ACP

| Funkce                                       | Co to dělá                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Modelové hřiště**                       | Stránka řídicího panelu pro přímé testování jakéhokoli modelu — voliče poskytovatele/modelu/koncového bodu, editor Monaco, streamování, přerušení, načasování                                                                                                                                |
| 🔏 **CLI Fingerprint Matching**              | Uspořádání záhlaví/těla podle poskytovatele tak, aby odpovídalo nativním signaturám CLI – přepněte podle poskytovatele v Nastavení > Zabezpečení. **Vaše IP adresa proxy je zachována**                                                                                                      |
| 🤝 **Podpora ACP (Protokol klienta agenta)** | Zjišťování agentů CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 dalších), zpracovatel procesů, koncový bod `/api/acp/agents`                                                                                                                                                           |
| 🤖 **Hlavní panel agentů AKT**               | Debug › Stránka Agenti — mřížka 14 agentů se stavem instalace, verzí, uživatelským formulářem agenta pro libovolný nástroj CLI. Uživatelé **OpenCode** získají tlačítko „Stáhnout opencode.json“, které automaticky vygeneruje konfiguraci připravenou k použití se všemi dostupnými modely. |
| 🔧 **Vlastní model `apiFormat` Směrování**   | Vlastní modely s `apiFormat: "responses"` nyní správně směrují do překladače Responses API                                                                                                                                                                                                   |
| 🏢 **Codex Workspace Isolation**             | Více pracovních prostorů Codex na e-mail — OAuth správně odděluje připojení podle ID pracovního prostoru                                                                                                                                                                                     |
| 🔄 **Elektronová automatická aktualizace**   | Desktopová aplikace kontroluje aktualizace + automatická instalace při restartu                                                                                                                                                                                                              |

### 🤖 Operace agentů a protokolů (v2.0)

| Funkce                                        | Co to dělá                                                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP Server (16 nástrojů)**               | Nástroje IDE/agenta prostřednictvím 3 přenosů: stdio, SSE (`/api/mcp/sse`), Streamable HTTP (`/api/mcp/stream`) |
| 🤝 **Server A2A (JSON-RPC + SSE)**            | Provádění úlohy agent-agent se synchronizací a streamováním                                                     |
| 🧭 **Stránka konsolidovaných koncových bodů** | Stránka správy s kartami s kartami Endpoint Proxy, MCP, A2A a API Endpoints                                     |
| 🎚️ **Přepínače aktivace/deaktivace služby**   | Spínače ON/OFF pro MCP a A2A s trvalým nastavením (výchozí: OFF)                                                |
| 🛰️ **MCP Runtime Heartbeat**                  | Skutečný stav procesu (pid, doba provozu, doba srdečního tepu, transport, režim rozsahu)                        |
| 📋 **MCP Audit Trail**                        | Filtrovatelné protokoly auditu s úspěchem/neúspěchem a přiřazením klíče                                         |
| 🔐 **Vymáhání rozsahu MCP**                   | 9 podrobných oprávnění rozsahu pro řízený přístup k nástroji                                                    |
| 📡 **A2A Task Lifecycle Management**          | Vypsat/filtrovat úlohy, zkontrolovat události/artefakty, zrušit běžící úlohy                                    |
| 📋 **Zjištění karty agenta**                  | `/.well-known/agent.json` pro automatické zjišťování klienta                                                    |
| 🧪 **Protokol E2E Test Harness**              | Skutečné toky MCP SDK + A2A klient v `test:protocols:e2e`                                                       |
| ⚙️ **Provozní ovládací prvky**                | Kombinace přepínačů, použití profilů odolnosti, resetování jističů z jedné ovládací plochy                      |

### 🧠 Směrování a inteligence

| Funkce                                           | Co to dělá                                                                  |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| 🎯 **Chytrý 4úrovňový záložní zdroj**            | Automatická trasa: Předplatné → Klíč API → Levné → Zdarma                   |
| 📊 **Sledování kvót v reálném čase**             | Živý počet tokenů + reset odpočítávání na poskytovatele                     |
| 🔄 **Formátový překlad**                         | OpenAI ↔ Claude ↔ Gemini ↔ Odpovědi s převody bezpečnými pro schéma         |
| 👥 **Podpora více účtů**                         | Více účtů na poskytovatele s inteligentním výběrem                          |
| 🔄 **Automatické obnovení tokenu**               | Tokeny OAuth se automaticky obnovují s opakováním                           |
| 🎨 **Vlastní kombinace**                         | 6 vyvažovacích strategií + řízení záložního řetězce                         |
| 🌐 **Wildcard Router**                           | `provider/*` dynamické směrování                                            |
| 🧠 **Přemýšlení o kontrolách rozpočtu**          | Limity průchozího, automatického, vlastního a adaptivního uvažování         |
| 🔀 **Aliasy modelů**                             | Vestavěný + vlastní model aliasing a bezpečnost migrace                     |
| ⚡ **Degradace pozadí**                          | Směrujte úlohy s nízkou prioritou na pozadí na levnější modely              |
| 🧪 **Inteligentní směrování s ohledem na úkoly** | Automatický výběr modelu podle typu obsahu (kódování/vize/analýza/souhrn)   |
| 💬 **System Prompt Injection**                   | Globální ovládací prvky chování používané konzistentně                      |
| 📄 **Kompatibilita rozhraní Responses API**      | Plná podpora `/v1/responses` pro Codex a pokročilé agentní pracovní postupy |

### 🎵 Multimodální API

| Funkce                        | Co to dělá                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generování obrázků**     | `/v1/images/generations` s cloudem a místními backendy                                                                                                                            |
| 📐 **Vložení**                | `/v1/embeddings` pro vyhledávací a RAG potrubí                                                                                                                                    |
| 🎤 **Přepis zvuku**           | `/v1/audio/transcriptions` — 7 poskytovatelů (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatická detekce jazyka, podpora MP4/MP3/WAV |
| 🔊 **Převod textu na řeč**    | `/v1/audio/speech` — 10 poskytovatelů (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) se správnými chybovými zprávami         |
| 🎬 **Generace videa**         | `/v1/videos/generations` (pracovní postupy ComfyUI + SD WebUI)                                                                                                                    |
| 🎵 **Music Generation**       | `/v1/music/generations` (pracovní postupy ComfyUI)                                                                                                                                |
| 🛡️ **Moderování**             | `/v1/moderations` bezpečnostní kontroly                                                                                                                                           |
| 🔀 **Reranking**              | `/v1/rerank` pro hodnocení relevance                                                                                                                                              |
| 🔍 **Vyhledávání na webu** 🆕 | `/v1/search` — 5 poskytovatelů (Serper, Brave, Perplexity, Exa, Tavily), 6 500+ zdarma/měsíc, auto-failover, cache                                                                |

### 🛡️ Odolnost, bezpečnost a správa

| Funkce                                  | Co to dělá                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| 🔌 **Jističe**                          | Vypnutí/obnovení pro každý model s ovládáním prahu                                          |
| 🎯 **modely s důrazem na koncové body** | Vlastní modely deklarují podporované koncové body + formát API                              |
| 🛡️ **Stádo proti hromům**               | Mutex + semaforové ochrany při opakování/rychlosti událostí                                 |
| 🧠 **Sémantická + mezipaměť podpisů**   | Snížení nákladů/latence se dvěma vrstvami mezipaměti                                        |
| ⚡ **Žádost o idempotenci**             | Duplicitní ochranné okno                                                                    |
| 🔒 **TLS Fingerprint Spoofing**         | Otisk TLS jako v prohlížeči — **snižuje detekci robotů a nahlašování účtu**                 |
| 🔏 **CLI Fingerprint Matching**         | Odpovídá nativním podpisům požadavku CLI — **snižuje riziko zákazu při zachování proxy IP** |
| 🌐 **Filtrování IP**                    | Kontrola seznamu povolených/blokovaných pro vystavená nasazení                              |
| 📊 **Upravitelné limity sazeb**         | Konfigurovatelné globální limity/limity na úrovni poskytovatele s perzistencí               |
| 🔑 **Správa klíčů API + rozsah**        | Bezpečné vydávání/otočení klíčů a ovládání modelu/poskytovatele                             |
| 🛡️ **Chráněno `/models`**               | Volitelné ověřování a skrytí poskytovatele pro katalog modelů                               |

### 📊 Pozorovatelnost a analytika

| Funkce                                 | Co to dělá                                                             |
| -------------------------------------- | ---------------------------------------------------------------------- |
| 📝 **Požadavek + protokolování proxy** | Úplný požadavek/odpověď a protokolování proxy                          |
| 📋 **Sjednocený panel protokolů**      | Požadavek, proxy, audit a zobrazení konzoly na jedné stránce           |
| 🔍 **Požádejte o telemetrii**          | p50/p95/p99 latence a trasování požadavků                              |
| 🏥 **Health Dashboard**                | Doba provozuschopnosti, stavy jističe, uzamčení, statistiky mezipaměti |
| 💰 **Sledování nákladů**               | Kontroly rozpočtu a viditelnost cen podle modelu                       |
| 📈 **Analytické vizualizace**          | Statistiky využití modelu/poskytovatele a zobrazení trendů             |
| 🧪 **Rámec hodnocení**                 | Testování zlaté sady s konfigurovatelnými strategiemi shody            |

### ☁️ Nasazení a platforma

| Funkce                        | Co to dělá                                                              |
| ----------------------------- | ----------------------------------------------------------------------- |
| 🌐 **Nasadit kdekoli**        | Localhost, VPS, Docker, cloudová prostředí                              |
| 💾 **Cloud Sync**             | Synchronizace konfigurace přes cloud worker                             |
| 🔄 **Zálohování/Obnova**      | Export/import a toky obnovy po havárii                                  |
| 🧙 **Průvodce onboardingem**  | První spuštění průvodce nastavením                                      |
| 🔧 **CLI Tools Dashboard**    | Nastavení jedním kliknutím pro oblíbené kódovací nástroje               |
| 🎮 **Modelové hřiště**        | Otestujte libovolného poskytovatele/model/koncový bod z řídicího panelu |
| 🔏 **CLI Fingerprint Toggle** | Shoda otisků prstů jednotlivých poskytovatelů v Nastavení > Zabezpečení |
| 🌐 **i18n (30 jazyků)**       | Plná podpora řídicího panelu + docs s pokrytím RTL                      |
| 🧹 **Vymazat všechny modely** | Vymazání seznamu modelů jedním kliknutím v detailech poskytovatele      |
| 📋 **Šablony vydání**         | Standardizované šablony GitHub pro chyby a funkce                       |
| 📂 **Custom Data Directory**  | `DATA_DIR` přepsání umístění úložiště                                   |

### Funkce Deep Dive

#### Chytrá záloha s praktickou kontrolou nákladů

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Když kvóta, rychlost nebo stav selžou, OmniRoute automaticky přejde na dalšího kandidáta bez ručního přepínání.

#### Správa protokolu, která je viditelná a ovladatelná

- MCP + A2A jsou zjistitelné v uživatelském rozhraní a dokumentech (nejsou skryté)
  – Rozhraní API stavu protokolu zpřístupňují živá provozní data (`/api/mcp/*`, `/api/a2a/*`)
- Panely obsahují akce pro operace 2. dne (přepínání kombinací, resetování jističe, zrušení úkolu)

#### Pracovní postup překladatele + ověřování

Oblast překladatele zahrnuje:

- **Hřiště**: Vyžádejte si kontroly transformace
- **Chat Tester**: kompletní zpáteční cesta na žádost/odpověď
- **Testovací stolice**: více případů v jednom běhu
- **Live Monitor**: zobrazení dopravy v reálném čase

Plus ověření protokolu se skutečnými klienty prostřednictvím `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Reference nástrojů, konfigurace IDE a příklady klientů
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Dovednosti, metody JSON-RPC, streamování a životní cyklus úkolů

## 🧪 Hodnocení (Evals)

OmniRoute obsahuje vestavěný hodnotící rámec pro testování kvality odezvy LLM oproti zlaté sadě. Přistupte k němu přes **Analytics → Evals** na hlavním panelu.

### Vestavěná zlatá sada

Předinstalovaná sada „OmniRoute Golden Set“ obsahuje testovací případy pro:

- Pozdravy, matematika, zeměpis, generování kódu
- Kompatibilita formátu JSON, překlad, generování markdown
- Bezpečnostní odmítnutí (škodlivý obsah), počítání, booleovská logika

### Strategie hodnocení

| Strategie  | Popis                                                                  | Příklad                          |
| ---------- | ---------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Výstup se musí přesně shodovat                                         | `"4"`                            |
| `contains` | Výstup musí obsahovat podřetězec (nerozlišují se malá a velká písmena) | `"Paris"`                        |
| `regex`    | Výstup musí odpovídat vzoru regulárního výrazu                         | `"1.*2.*3"`                      |
| `custom`   | Vlastní funkce JS vrací true/false                                     | `(output) => output.length > 10` |

---

## 📖 Průvodce nastavením

### Nastavení protokolu (MCP + A2A)

<details>
<summary><b>🧩 Nastavení MCP (Model Context Protocol)</b></summary>

Spusťte přenos MCP v režimu stdio:

```bash
omniroute --mcp
```

Doporučený postup ověření:

1. Připojte svého MCP klienta přes stdio.
2. Spusťte `omniroute_get_health`.
3. Spusťte `omniroute_list_combos`.
4. Otevřete `/dashboard/mcp` a potvrďte tep, aktivitu a audit.

Užitečná rozhraní API pro automatizaci:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Nastavení A2A (Agent2Agent)</b></summary>

Objevte agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Pošlete úkol:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Správa životního cyklu:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Provozní uživatelské rozhraní:

- `/dashboard/a2a` pro pozorování úkolu/stavu/streamu a kouřové akce

</details>

<details>
<summary><b>🧪 End-to-end ověření protokolu</b></summary>

Ověřte oba protokoly se skutečnými klienty:

```bash
npm run test:protocols:e2e
```

Tím se ověřuje:

- Připojení/seznam/volání klienta MCP SDK
- A2A objev/odeslat/streamovat/získat/zrušit
- Křížová kontrola dat v MCP auditu a API pro správu úloh A2A

</details>

<details>
<summary><b>💳 Poskytovatelé předplatného</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Tip pro profesionály:** Používejte Opus pro složité úkoly, Sonnet pro rychlost. OmniRoute sleduje kvótu na model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Správa limitu účtu Codex (5 hodin + týdně)

Každý účet Codexu má nyní přepínače zásad v `Dashboard -> Providers`:

- `5h` (ZAP/VYP): vynutit zásadu prahu 5hodinového okna.
- `Weekly` (ZAP/VYP): vynutit zásadu týdenního prahu okna.
- Prahové chování: když povolené okno dosáhne využití >=90 %, daný účet je přeskočen.
- Rotační chování: OmniRoute automaticky směruje na další způsobilý účet Codex.
- Resetovat chování: když poskytovatel `resetAt` uplyne čas, účet se automaticky znovu stane způsobilým.

Scénáře:

- `5h ON` + `Weekly ON`: účet je přeskočen, když kterékoli okno dosáhne prahové hodnoty.
- `5h OFF` + `Weekly ON`: účet může zablokovat pouze týdenní používání.
- `5h ON` + `Weekly OFF`: pouze 5hodinové používání může zablokovat účet.
- `resetAt` prošlo: účet automaticky znovu zadá rotaci (žádné ruční opětovné povolení).

### Gemini CLI (ZDARMA 180 000/měsíc!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nejlepší hodnota:** Obrovská bezplatná úroveň! Použijte to před placenými úrovněmi.

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
<summary><b>🔑 Klíčoví poskytovatelé API</b></summary>

### NVIDIA NIM (BEZPLATNÝ přístup pro vývojáře — 70+ modelů)

1. Zaregistrujte se: [build.nvidia.com](https://build.nvidia.com)
2. Získejte bezplatný klíč API (včetně 1000 kreditů pro odvození)
3. Ovládací panel → Přidat poskytovatele → NVIDIA NIM:
   - Klíč API: `nvapi-your-key`

**Modely:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` a 50+ dalších

**Tip pro profesionály:** API kompatibilní s OpenAI – bezproblémově funguje s překladem formátu OmniRoute!

### DeepSeek

1. Zaregistrujte se: [platform.deepseek.com](https://platform.deepseek.com)
2. Získejte API klíč
3. Ovládací panel → Přidat poskytovatele → DeepSeek

**Modely:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (dostupná bezplatná úroveň!)

1. Zaregistrujte se: [console.groq.com](https://console.groq.com)
2. Získejte klíč API (včetně bezplatné úrovně)
3. Ovládací panel → Přidat poskytovatele → Groq

**Modely:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Tip pro profesionály:** Ultra rychlé vyvozování – nejlepší pro kódování v reálném čase!

### OpenRouter (100+ modelů)

1. Zaregistrujte se: [openrouter.ai](https://openrouter.ai)
2. Získejte API klíč
3. Ovládací panel → Přidat poskytovatele → OpenRouter

**Modely:** Získejte přístup k více než 100 modelům od všech hlavních poskytovatelů prostřednictvím jediného klíče API.

</details>

<details>
<summary><b>💰 Levní poskytovatelé (záložní)</b></summary>

### GLM-4,7 (denní reset, 0,6 $/1 milion)

1. Zaregistrujte se: [Zhipu AI](https://open.bigmodel.cn/)
2. Získejte API klíč z Coding Plan
3. Ovládací panel → Přidat klíč API:
   – Poskytovatel: `glm`
   - Klíč API: `your-key`

**Použití:** `glm/glm-4.7`

**Tip pro profesionály:** Kódovací plán nabízí 3× kvótu za 1/7 cenu! Resetovat denně v 10:00.

### MiniMax M2.1 (5h reset, $0.20/1M)

1. Zaregistrujte se: [MiniMax](https://www.minimax.io/)
2. Získejte API klíč
3. Ovládací panel → Přidat klíč API

**Použití:** `minimax/MiniMax-M2.1`

**Tip pro profesionály:** Nejlevnější možnost pro dlouhý kontext (1 milion tokenů)!

### Kimi K2 (9 $ měsíčně byt)

1. Přihlásit se k odběru: [Moonshot AI](https://platform.moonshot.ai/)
2. Získejte API klíč
3. Ovládací panel → Přidat klíč API

**Použití:** `kimi/kimi-latest`

**Tip pro profesionály:** Pevná cena 9 $ měsíčně za 10 milionů tokenů = 0,90 $ / 1 milion efektivních nákladů!

</details>

<details>
<summary><b>🆓 ZDARMA poskytovatelé (nouzová záloha)</b></summary>

### iFlow (5 ZDARMA modelů přes OAuth)

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

### Qwen (4 ZDARMA modely prostřednictvím kódu zařízení)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude FREE)

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
<summary><b>🎨 Vytvořit komba</b></summary>

### Příklad 1: Maximalizujte předplatné → Levné zálohování

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Příklad 2: Pouze zdarma (nulové náklady)

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
<summary><b>🔧 Integrace rozhraní CLI</b></summary>

### IDE kurzoru

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claudeův kód

Použijte stránku **CLI Tools** na řídicím panelu pro konfiguraci jedním kliknutím nebo upravte `~/.claude/settings.json` ručně.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Možnost 1 – Hlavní panel (doporučeno):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Možnost 2 — Ručně:** Upravit `~/.openclaw/openclaw.json`:

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

> **Poznámka:** OpenClaw funguje pouze s místní OmniRoute. Použijte `127.0.0.1` místo `localhost`, abyste se vyhnuli problémům s rozlišením IPv6.

### Cline / Pokračovat / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Krok 1:** Přidejte OmniRoute jako vlastního poskytovatele:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Krok 2:** Vytvořte/upravte `opencode.json` v kořenovém adresáři projektu:

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

**Krok 3:** Vyberte model v OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tip:** Přidejte jakýkoli model dostupný ve vašem koncovém bodu OmniRoute `/v1/models` do sekce `models`. Použijte formát `provider/model-id` z řídicího panelu OmniRoute.

</details>

---

## 🐛 Odstraňování problémů

<details>
<summary><b>Kliknutím rozbalíte průvodce odstraňováním problémů</b></summary>

**"Jazykový model neposkytoval zprávy"**

- Kvóta poskytovatele je vyčerpána → Zkontrolujte sledování kvót na řídicím panelu
- Řešení: Použijte nouzovou kombinaci nebo přejděte na levnější úroveň

**Omezení sazby**

- Vyčerpaná kvóta předplatného → Záložní režim GLM/MiniMax
- Přidat kombinaci: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Platnost tokenu OAuth vypršela**

- Automaticky obnoveno OmniRoute
- Pokud problémy přetrvávají: Řídicí panel → Poskytovatel → Znovu připojit

**Vysoké náklady**

- Zkontrolujte statistiky využití v Dashboard → Náklady
- Přepněte primární model na GLM/MiniMax
- Používejte bezplatnou vrstvu (Gemini CLI, iFlow) pro nekritické úkoly

**Porty řídicího panelu/API jsou chybné**

- `PORT` je kanonický základní port (a port API ve výchozím nastavení)
- `API_PORT` přepíše pouze posluchač API kompatibilní s OpenAI
- `DASHBOARD_PORT` přepíše pouze řídicí panel/posluchač Next.js
  – Nastavte `NEXT_PUBLIC_BASE_URL` na svůj řídicí panel/veřejnou adresu URL (pro zpětná volání OAuth)

**Chyby synchronizace cloudu**

- Ověřte `BASE_URL` bodů na vaši spuštěnou instanci
- Ověřte `CLOUD_URL` bodů k očekávanému koncovému bodu cloudu
- Udržujte hodnoty `NEXT_PUBLIC_*` zarovnané s hodnotami na straně serveru

**První přihlášení nefunguje**

- Zkontrolujte `INITIAL_PASSWORD` v `.env`
  – Pokud není nastaveno, záložní heslo je `123456`

**Žádné protokoly požadavků**

- Nastavit `ENABLE_REQUEST_LOGS=true` v `.env`

**Test připojení ukazuje „Neplatné“ pro poskytovatele kompatibilní s OpenAI**

– Mnoho poskytovatelů nevystavuje koncový bod `/models`

- OmniRoute v1.0.6+ zahrnuje nouzové ověření prostřednictvím dokončení chatu
  – Zajistěte, aby základní adresa URL obsahovala příponu `/v1`

### 🔐 OAuth na vzdáleném serveru

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Důležité pro uživatele používající OmniRoute na VPS, Dockeru nebo jakémkoli vzdáleném serveru**

#### Proč selže Antigravity / Gemini CLI OAuth na vzdálených serverech?

Poskytovatelé **Antigravity** a **Gemini CLI** používají **Google OAuth 2.0**. Google vyžaduje, aby `redirect_uri` v toku OAuth přesně odpovídal jednomu z předem registrovaných URI v Google Cloud Console aplikace.

Přihlašovací údaje OAuth dodávané v OmniRoute jsou registrovány **pouze pro `localhost`**. Když přistupujete k OmniRoute na vzdáleném serveru (např. `https://omniroute.myserver.com`), Google odmítne ověření pomocí:

```
Error 400: redirect_uri_mismatch
```

#### Řešení: Nakonfigurujte si vlastní přihlašovací údaje OAuth

Ve službě Google Cloud Console musíte vytvořit **OAuth 2.0 Client ID** s identifikátorem URI vašeho serveru.

#### Krok za krokem

**1. Otevřít Google Cloud Console**

Přejít na: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Vytvořit nové ID klienta OAuth 2.0**

– Klikněte na **"+ Vytvořit přihlašovací údaje"** → **"ID klienta OAuth"**

- Typ aplikace: **"Webová aplikace"**
  – Jméno: cokoliv se vám líbí (např. `OmniRoute Remote`)

**3. Přidat identifikátory URI autorizovaného přesměrování**

Do pole **"URI autorizovaného přesměrování"** přidejte:

```
https://your-server.com/callback
```

> Nahraďte `your-server.com` doménou nebo IP vašeho serveru (v případě potřeby uveďte port, např. `http://45.33.32.156:20128/callback`).

**4. Uložte a zkopírujte přihlašovací údaje**

Po vytvoření Google zobrazí **Client ID** a **Client Secret**.

**5. Nastavit proměnné prostředí**

Ve vašem `.env` (nebo proměnných prostředí Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Restartujte OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Zkuste se připojit znovu**

Ovládací panel → Poskytovatelé → Antigravitace (nebo Gemini CLI) → OAuth

Google nyní správně přesměruje na `https://your-server.com/callback`.

---

#### Dočasné řešení (bez vlastních přihlašovacích údajů)

Pokud si nyní nechcete nastavovat vlastní přihlašovací údaje, můžete stále použít **ruční postup URL**:

1. OmniRoute otevře autorizační URL Google
2. Po autorizaci se Google pokusí přesměrovat na `localhost` (který selže na vzdáleném serveru)
3. **Zkopírujte celou adresu URL** z adresního řádku prohlížeče (i když se stránka nenačte)
4. Vložte tuto adresu URL do pole zobrazeného v modálu připojení OmniRoute
5. Klikněte na **"Připojit"**

> Funguje to, protože autorizační kód v adrese URL je platný bez ohledu na to, zda se stránka přesměrování načetla.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Od OAuth do Antigravity / Gemini CLI falha em servidores remotos?

Osvedčuje **Antigravity** a **Gemini CLI** používáme **Google OAuth 2.0** pro autenticitu. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pre-cadastradas no Google Cloud Console to use.

Jako credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor remote (ex: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Řešení: Nakonfigurujte proprias pověření OAuth

Você precisa criar um **OAuth 2.0 Client ID** no Google Cloud Console com a URI do seu server.

#### Passo a passo

**1. Přístup ke službě Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Klikněte na **"+ Vytvořit přihlašovací údaje"** → **"ID klienta OAuth"**
- Tipo de aplicativo: **"Webová aplikace"**
  – Nome: escolha qualquer nome (např.: `OmniRoute Remote`)

**3. Adicione jako Authorized Redirect URI**

Žádné pole **"URI autorizovaného přesměrování"**, adicione:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (inclua a porta se necessário, ex: `http://45.33.32.156:20128/callback`).

**4. Uložit a zkopírovat jako credenciais**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Konfigurovat jako variáveis de ambiente**

No seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie nebo OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Dashboard → Poskytovatelé → Antigravitace (nebo Gemini CLI) → OAuth

Agora nebo Google redirecionará corretamente para `https://seu-servidor.com/callback` a autenticação funcionará.

---

#### Temporário řešení (sem configurar credenciais próprias)

Zjistěte, jaké jsou údaje o vaší kreditní kartě, a je možné, že použijete fluxo **příručku URL**:

1. O OmniRoute abrirá a URL autorização Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Zkopírujte úplnou adresu URL** da barra de endereço do seu browser (mesmo que a pagina não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Klikněte na **"Připojit"**

> Toto řešení funguje pomocí autorizačního kódu na URL a nezávislého přesměrování.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Kliknutím rozbalíte podrobnosti o technickém zásobníku</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ není **podporován** — `better-sqlite3` nativní binární soubory jsou nekompatibilní)
- **Jazyk**: TypeScript 5.9 — **100% TypeScript** napříč `src/` a `open-sse/` (nula `any` v základních modulech od verze 2.0)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Databáze**: LowDB (JSON) + SQLite (stav domény + protokoly proxy + audit MCP + rozhodnutí o směrování)
- **Schémata**: Zod (ověření I/O nástroje MCP, smlouvy API)
- **Protokoly**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streamování**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API klíče + MCP Scoped Authorization
- **Testování**: Testovací program Node.js + Vitest (více než 900 testů včetně jednotky, integrace, E2E)
- **CI/CD**: Akce GitHub (automatické publikování npm + Docker Hub při vydání)
- **Web**: [omniroute.online](https://omniroute.online)
- **Balík**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Odolnost**: Jistič, exponenciální ústup, stádo proti hromům, TLS spoofing, auto-kombo samoléčení

</details>

---

## 📖 Dokumentace

| Dokument                                       | Popis                                                       |
| ---------------------------------------------- | ----------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Poskytovatelé, komba, integrace CLI, nasazení               |
| [API Reference](docs/API_REFERENCE.md)         | Všechny koncové body s příklady                             |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP nástroje, konfigurace IDE, klienti Python/TS/Go      |
| [A2A Server](src/lib/a2a/README.md)            | Protokol JSON-RPC 2.0, dovednosti, streamování, správa úloh |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6faktorové bodování, balíčky režimů, samoléčení             |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Běžné problémy a řešení                                     |
| [Architecture](docs/ARCHITECTURE.md)           | Architektura systému a vnitřní části                        |
| [Contributing](CONTRIBUTING.md)                | Vývojové nastavení a pokyny                                 |
| [OpenAPI Spec](docs/openapi.yaml)              | Specifikace OpenAPI 3.0                                     |
| [Security Policy](SECURITY.md)                 | Hlášení zranitelnosti a bezpečnostní postupy                |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Kompletní průvodce: Nastavení VM + nginx + Cloudflare       |
| [Features Gallery](docs/FEATURES.md)           | Vizuální prohlídka řídicího panelu se snímky obrazovky      |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Kroky ověření před vydáním                                  |

---

## 🗺️ Cestovní mapa

OmniRoute má naplánováno **210+ funkcí** v několika fázích vývoje. Zde jsou klíčové oblasti:

| Kategorie                                | Plánované funkce | Hlavní body                                                                                             |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| 🧠 **Směrování a inteligence**           | 25+              | Směrování s nejnižší latencí, směrování založené na značkách, předběžná kontrola kvót, výběr účtu P2C   |
| 🔒 **Zabezpečení a dodržování předpisů** | 20+              | Zpevnění SSRF, maskování pověření, rychlostní limit na koncový bod, stanovení rozsahu klíče managementu |
| 📊 **Pozorovatelnost**                   | 15+              | Integrace OpenTelemetry, sledování kvót v reálném čase, sledování nákladů na model                      |
| 🔄 **Integrace poskytovatelů**           | 20+              | Registr dynamického modelu, cooldowny poskytovatelů, kodex pro více účtů, analýza kvót Copilota         |
| ⚡ **Výkon**                             | 15+              | Dual cache layer, prompt cache, response cache, streaming keepalive, batch API                          |
| 🌐 **Ekosystém**                         | 10+              | WebSocket API, konfigurace hot-reload, distribuované úložiště konfigurace, komerční režim               |

### 🔜 Již brzy

- 🔗 **Integrace OpenCode** – Podpora nativního poskytovatele pro IDE kódování OpenCode AI
- 🔗 ** Integrace TRAE** — Plná podpora pro vývojový rámec TRAE AI
- 📦 **Batch API** — Asynchronní dávkové zpracování pro hromadné požadavky
- 🎯 **Směrování založené na značkách** – Směrování požadavků na základě vlastních značek a metadat
- 💰 **Strategie nejnižších nákladů** — Automaticky vyberte nejlevnějšího dostupného poskytovatele

> 📝 Kompletní specifikace funkcí k dispozici v [**OMNI_TOKEN_342**](docs/new-features/) (217 podrobných specifikací)

---

## 👥 Přispěvatelé

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Jak přispět

1. Fork úložiště
2. Vytvořte si větev funkcí (`git checkout -b feature/amazing-feature`)
3. Potvrďte změny (`git commit -m 'Add amazing feature'`)
4. Zatlačte na pobočku (`git push origin feature/amazing-feature`)
5. Otevřete požadavek na stažení

Podrobné pokyny viz [CONTRIBUTING.md](CONTRIBUTING.md).

### Vydání nové verze

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Hvězdná historie

## Hvězdáři v průběhu času

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Poděkování

Zvláštní poděkování patří **[9router](https://github.com/decolua/9router)** od **[decolua](https://github.com/decolua)** – původnímu projektu, který inspiroval tuto vidlici. OmniRoute staví na tomto neuvěřitelném základu s dalšími funkcemi, multimodálními API a úplným přepsáním TypeScriptu.

Zvláštní poděkování patří **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** – původní implementaci Go, která inspirovala tento port JavaScriptu.

---

## 📄 Licence

Licence MIT – podrobnosti viz [LICENSE](LICENSE).

---

<div align="center">
  <sub>Vytvořeno pomocí ❤️ pro vývojáře, kteří kódují 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- Diskuse na GitHubu povoleny pro otázky a odpovědi komunity -->
