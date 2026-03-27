# 🚀 OmniRoute — Bezplatná brána umělé inteligence

### Nikdy nepřestávejte s kódováním. Chytré směrování k **BEZPLATNÝM a levným modelům AI** s automatickým přepínáním mezi záložními systémy.

_Váš univerzální API proxy – jeden endpoint, více než 44 poskytovatelů, nulové výpadky. Nyní s orchestrací agentů **MCP a A2A** ._

**Dokončení chatu • Vkládání • Generování obrázků • Video • Hudba • Audio • Změna pořadí • **Vyhledávání na webu** • MCP server • A2A protokol • 100% TypeScript**

---

<div align="center">
</div>
<p data-md-type="paragraph"><a href="https://www.npmjs.com/package/omniroute" data-md-type="link"></a><img src="https://img.shields.io/npm/v/omniroute?color=cb3837&amp;logo=npm" alt="verze npm" data-md-type="image"><a href="https://hub.docker.com/r/diegosouzapw/omniroute" data-md-type="link"></a><img src="https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&amp;logo=docker&amp;color=2496ED" alt="Docker Hub" data-md-type="image"><a href="https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE" data-md-type="link"></a><img src="https://img.shields.io/github/license/diegosouzapw/OmniRoute" alt="Licence" data-md-type="image"><a href="https://omniroute.online" data-md-type="link"></a><img src="https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&amp;logoColor=white" alt="Webové stránky" data-md-type="image"><a href="https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t" data-md-type="link"></a><img src="https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&amp;logoColor=white" alt="WhatsApp" data-md-type="image"></p>
<p data-md-type="paragraph"><a href="https://omniroute.online" data-md-type="link">🌐 Webové stránky</a> • <a href="#-quick-start" data-md-type="link">🚀 Rychlý start</a> • <a href="#-key-features" data-md-type="link">💡 Funkce</a> • <a href="#-documentation" data-md-type="link">📖 Dokumentace</a> • <a href="#-pricing-at-a-glance" data-md-type="link">💰 Ceník</a> • <a href="https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t" data-md-type="link">💬 WhatsApp</a></p>
<div data-md-type="block_html"></div>

🌐 **Dostupné v:** 🇺🇸 [Angličtina](README.md) | 🇧🇷 [Português (Brazílie)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳[中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵[日本語](docs/i18n/ja/README.md)| 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dánsko](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [maďarština](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonésie](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nizozemsko](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugalsko)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipínec](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

### 🆕 What's New in v3.0.0

| Area                       | Change                                                                            |
| -------------------------- | --------------------------------------------------------------------------------- |
| 🔒 **CodeQL Security**     | Fixed 10+ CodeQL alerts: polynomial-redos, insecure-randomness, shell-injection   |
| ✅ **Route Validation**    | All 176 API routes validated with Zod schemas + `validateBody()`                  |
| 🐛 **omniModel Tag Leak**  | Internal `<omniModel>` tags no longer leak to clients in SSE streams (#585)       |
| 🔑 **Registered Keys API** | Auto-provision API keys via `POST /api/v1/registered-keys` with quota enforcement |
| 🎨 **Provider Icons**      | 130+ provider logos via `@lobehub/icons` (SVG) with PNG fallback                  |
| 🔄 **Model Auto-Sync**     | 24h scheduler refreshes model lists for 16 providers                              |
| 🌐 **OpenCode Zen/Go**     | Two new providers: free tier + subscription tier                                  |
| 🔧 **926 Tests**           | Full test suite passes with 0 failures                                            |

### 🆕 What's New in v3.0.0

| Area                       | Change                                                                            |
| -------------------------- | --------------------------------------------------------------------------------- |
| 🔒 **CodeQL Security**     | Fixed 10+ CodeQL alerts: polynomial-redos, insecure-randomness, shell-injection   |
| ✅ **Route Validation**    | All 176 API routes validated with Zod schemas + `validateBody()`                  |
| 🐛 **omniModel Tag Leak**  | Internal `<omniModel>` tags no longer leak to clients in SSE streams (#585)       |
| 🔑 **Registered Keys API** | Auto-provision API keys via `POST /api/v1/registered-keys` with quota enforcement |
| 🎨 **Provider Icons**      | 130+ provider logos via `@lobehub/icons` (SVG) with PNG fallback                  |
| 🔄 **Model Auto-Sync**     | 24h scheduler refreshes model lists for 16 providers                              |
| 🌐 **OpenCode Zen/Go**     | Two new providers: free tier + subscription tier                                  |
| 🔧 **926 Tests**           | Full test suite passes with 0 failures                                            |

---

## 🖼️ Hlavní ovládací panel

<div align="center">   <img src="./docs/screenshots/MainOmniRoute.png" alt="Řídicí panel OmniRoute" width="800"> </div>

---

## 📸 Náhled řídicího panelu

<details>
<summary><b>Kliknutím zobrazíte snímky obrazovky z řídicího panelu</b></summary>
</details>

| Strana                  | Snímek obrazovky                                    |
| ----------------------- | --------------------------------------------------- |
| **Poskytovatelé**       | ![Poskytovatelé](docs/screenshots/01-providers.png) |
| **Kombinace**           | ![Kombinace](docs/screenshots/02-combos.png)        |
| **Analytika**           | ![Analytika](docs/screenshots/03-analytics.png)     |
| **Zdraví**              | ![Zdraví](docs/screenshots/04-health.png)           |
| **Překladatel**         | ![Překladatel](docs/screenshots/05-translator.png)  |
| **Nastavení**           | ![Nastavení](docs/screenshots/06-settings.png)      |
| **Nástroje CLI**        | ![Nástroje CLI](docs/screenshots/07-cli-tools.png)  |
| **Protokoly používání** | ![Používání](docs/screenshots/08-usage.png)         |
| **Koncové body**        | ![Koncové body](docs/screenshots/09-endpoint.png)   |

---

### 🤖 Bezplatný poskytovatel umělé inteligence pro vaše oblíbené programátory

_Připojte libovolný nástroj IDE nebo CLI s umělou inteligencí přes OmniRoute — bezplatnou API bránu pro neomezené kódování._

  <table>
    <tr>
      <td align="center" width="110">         <a href="https://github.com/openclaw/openclaw"><img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"><br><b>OpenClaw</b></a><br> <sub>⭐ 205 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/HKUDS/nanobot"><img src="./public/providers/nanobot.png" alt="NanoBot" width="48"><br><b>NanoBot</b></a><br> <sub>⭐ 20,9 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/sipeed/picoclaw"><img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"><br><b>PicoClaw</b></a><br> <sub>⭐ 14,6 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/zeroclaw-labs/zeroclaw"><img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"><br><b>ZeroClaw</b></a><br> <sub>⭐ 9,9 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/nearai/ironclaw"><img src="./public/providers/ironclaw.png" alt="Železný dráp" width="48"><br><b>Železný dráp</b></a><br> <sub>⭐ 2,1 tisíce</sub>       </td>
    </tr>
    <tr>
      <td align="center" width="110">         <a href="https://github.com/anomalyco/opencode"><img src="./public/providers/opencode.svg" alt="OpenCode" width="48"><br><b>OpenCode</b></a><br> <sub>⭐ 106 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/openai/codex"><img src="./public/providers/codex.png" alt="Codex CLI" width="48"><br><b>Codex CLI</b></a><br> <sub>⭐ 60,8 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/anthropics/claude-code"><img src="./public/providers/claude.png" alt="Claude Code" width="48"><br><b>Claude Code</b></a><br> <sub>⭐ 67,3 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/google-gemini/gemini-cli"><img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"><br> <b>Gemini CLI</b></a><br> <sub>⭐ 94,7 tisíc</sub>       </td>
      <td align="center" width="110">         <a href="https://github.com/Kilo-Org/kilocode"><img src="./public/providers/kilocode.png" alt="Kilo kód" width="48"><br><b>Kilo kód</b></a><br> <sub>⭐ 15,5 tisíc</sub>       </td>
    </tr>
  </table>

<sub>📡 Všichni agenti se připojují přes <code>http://localhost:20128/v1</code> nebo <code>http://cloud.omniroute.online/v1</code> — jedna konfigurace, neomezené modely a kvóty</sub>

---

## 🤔 Proč OmniRoute?

**Přestaňte plýtvat penězi a narážet na limity:**

- <img src="https://img.shields.io/badge/%E2%9C%97-e74c3c?style=flat-square" height="16"> Kvóta předplatného vyprší každý měsíc
- <img src="https://img.shields.io/badge/%E2%9C%97-e74c3c?style=flat-square" height="16"> Limity rychlosti vám zabrání v kódování
- <img src="https://img.shields.io/badge/%E2%9C%97-e74c3c?style=flat-square" height="16"> Drahá API (20–50 USD/měsíc na poskytovatele)
- <img src="https://img.shields.io/badge/%E2%9C%97-e74c3c?style=flat-square" height="16"> Ruční přepínání mezi poskytovateli

**OmniRoute to řeší:**

- ✅ **Maximalizujte předplatné** – Sledujte kvótu, využijte každou částku před resetováním
- ✅ **Automatické záložní** – Předplatné → API klíč → Levné → Zdarma, žádné výpadky
- ✅ **Více účtů** – Round-robin mezi účty u jednotlivých poskytovatelů
- ✅ **Univerzální** - Funguje s Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw a jakýmkoli nástrojem CLI

---

## 📧 Podpora

> 💬 **Přidejte se k naší komunitě!** [Skupina WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Získejte pomoc, sdílejte tipy a buďte v obraze.

- **Webová stránka** : [omniroute.online](https://omniroute.online)
- **GitHub** : [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problémy** : [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp** : [Komunitní skupina](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Přispívání** : Viz [CONTRIBUTING.md](CONTRIBUTING.md) , otevřete žádost o příspěvek nebo si vyberte `good first issue`
- **Původní projekt** : [9router od decolua](https://github.com/decolua/9router)

### 🐛 Hlásíte chybu?

Při otevírání problému spusťte příkaz system-info a přiložte vygenerovaný soubor:

```bash
npm run system-info
```

Tím se vygeneruje soubor `system-info.txt` s verzí Node.js, verzí OmniRoute, podrobnostmi o operačním systému, nainstalovanými nástroji CLI (iflow, gemini, claude, codex, antigravity, droid atd.), stavem Dockeru/PM2 a systémovými balíčky – vše, co potřebujeme k rychlé reprodukci vašeho problému. Soubor přiložte přímo k vašemu problému na GitHubu.

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

## 🎯 Co řeší OmniRoute — 30 skutečných problémů a případů použití

> **Každý vývojář používající nástroje umělé inteligence se s těmito problémy setkává denně.** OmniRoute byl vytvořen tak, aby je všechny vyřešil – od překročení nákladů po regionální bloky, od nefunkčních toků OAuth až po operace s protokoly a sledovatelnost v podniku.

<details>
<summary><b>💸 1. „Platím si drahé předplatné, ale stále mě ruší limity“</b></summary>
</details>

Vývojáři platí za Claude Pro, Codex Pro nebo GitHub Copilot 20–200 dolarů měsíčně. I při platbě má kvóta strop – 5 hodin používání, týdenní limity nebo limity rychlosti za minutu. Uprostřed kódovací relace poskytovatel přestane reagovat a vývojář ztrácí plynulost a produktivitu.

**Jak to OmniRoute řeší:**

- **Inteligentní čtyřúrovňová záložní služba** – Pokud dojde kvóta předplatného, ​​automaticky se přesměruje na API klíč → Levné → Zdarma bez manuálního zásahu
- **Sledování kvót v reálném čase** – Zobrazuje spotřebu tokenů v reálném čase s odpočítáváním resetování (5 hodin, denně, týdně)
- **Podpora více účtů** – Více účtů u jednoho poskytovatele s automatickým přepínáním – když jeden dojde, přepne se na další
- **Vlastní kombinace** — Přizpůsobitelné záložní řetězce se 6 strategiemi vyvažování (fill-first, round robin, P2C, náhodné, nejméně používané, nákladově optimalizované)
- **Codex Business Quotas** — Sledování kvót pracovního prostoru firmy/týmu přímo v dashboardu

<details>
<summary><b>🔌 2. „Potřebuji použít více poskytovatelů, ale každý má jiné API“</b></summary>
</details>

OpenAI používá jeden formát, Claude (Anthropic) jiný a Gemini ještě třetí. Pokud chce vývojář testovat modely od různých poskytovatelů nebo mezi nimi přecházet, musí překonfigurovat SDK, změnit koncové body a vypořádat se s nekompatibilními formáty. Vlastní poskytovatelé (FriendLI, NIM) mají nestandardní koncové body modelů.

**Jak to OmniRoute řeší:**

- **Sjednocený koncový bod** — Jeden `http://localhost:20128/v1` slouží jako proxy pro všech 67+ poskytovatelů.
- **Překlad formátu** — Automatický a transparentní: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Sanitizace odpovědí** — Odstraňuje nestandardní pole ( `x_groq` , `usage_breakdown` , `service_tier` ), která porušují OpenAI SDK v1.83+
- **Normalizace rolí** — Převádí `developer` → `system` pro poskytovatele bez OpenAI; `system` → `user` pro GLM/ERNIE
- **Extrakce tagů Think** — Extrahuje bloky `<think>` z modelů, jako je DeepSeek R1, do standardizovaného `reasoning_content`
- **Strukturovaný výstup pro Gemini** — `json_schema` → automatická konverze `responseMimeType` / `responseSchema`
- **Výchozí hodnota `stream` je `false`** – Odpovídá specifikaci OpenAI, čímž se zabrání neočekávanému SSE v Python/Rust/Go SDK.

<details>
<summary><b>🌐 3. „Můj poskytovatel AI blokuje můj region/zemi“</b></summary>
</details>

Poskytovatelé jako OpenAI/Codex blokují přístup z určitých geografických oblastí. Uživatelé se během připojení OAuth a API dostávají k chybám jako `unsupported_country_region_territory` . To je obzvláště frustrující pro vývojáře z rozvojových zemí.

**Jak to OmniRoute řeší:**

- **3úrovňová konfigurace proxy** – Konfigurovatelná proxy na 3 úrovních: globální (veškerý provoz), pro jednotlivé poskytovatele (pouze jeden poskytovatel) a pro jednotlivé připojení/klíč
- **Barevně kódované odznaky proxy** – Vizuální indikátory: 🟢 globální proxy, 🟡 proxy poskytovatele, 🔵 proxy připojení, vždy zobrazující IP adresu
- **Výměna tokenů OAuth prostřednictvím proxy** – tok OAuth také prochází přes proxy, čímž se řeší `unsupported_country_region_territory`
- **Testy připojení přes proxy** – Testy připojení používají nakonfigurovaný proxy (již žádné přímé obcházení)
- **Podpora SOCKS5** — Plná podpora proxy SOCKS5 pro odchozí směrování
- **TLS Fingerprint Spoofing** — Otisk prstu TLS podobný prohlížeči pomocí `wreq-js` pro obcházení detekce botů
- **🔏 Porovnávání otisků prstů v CLI** — Změní pořadí záhlaví a polí v těle serveru tak, aby odpovídala nativním binárním podpisům v CLI, čímž drasticky snižuje riziko nahlašování účtu. IP adresa proxy je zachována — získáte současně stealth **i** maskování IP adresy.

<details>
<summary><b>🆓 4. „Chci používat umělou inteligenci pro kódování, ale nemám peníze“</b></summary>
</details>

Ne každý si může dovolit zaplatit 20–200 dolarů měsíčně za předplatné AI. Studenti, vývojáři z rozvíjejících se zemí, amatéři a freelanceři potřebují přístup ke kvalitním modelům za nulovou cenu.

**Jak to OmniRoute řeší:**

- **Vestavění poskytovatelé bezplatné úrovně** — Nativní podpora pro 100% bezplatné poskytovatele: iFlow (5 neomezených modelů přes OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 neomezené modely: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID zdarma), Gemini CLI (180 tisíc tokenů/měsíc zdarma)
- **Ollama Cloud** — Cloudově hostované modely Ollama na `api.ollama.com` s bezplatnou úrovní „Light usage“; použijte prefix `ollamacloud/<model>`
- **Kombinace pouze zdarma** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 $/měsíc s nulovými prostoji
- **NVIDIA NIM Free Access** — ~40 RPM developerský přístup k více než 70 modelům na build.nvidia.com (přechod z kreditů na čisté limity rychlosti)
- **Strategie optimalizace nákladů** – Strategie směrování, která automaticky vybere nejlevnějšího dostupného poskytovatele

<details>
<summary><b>🔒 5. „Potřebuji chránit svou bránu umělé inteligence před neoprávněným přístupem“</b></summary>
</details>

Při zpřístupnění brány umělé inteligence síti (LAN, VPS, Docker) může kdokoli s adresou spotřebovat tokeny/kvótu vývojáře. Bez ochrany jsou API zranitelná vůči zneužití, prompt injection a dalšímu zneužití.

**Jak to OmniRoute řeší:**

- **Správa klíčů API** – generování, rotace a vymezování rozsahu pro každého poskytovatele s vyhrazenou stránkou `/dashboard/api-manager`
- **Oprávnění na úrovni modelu** – Omezení klíčů API na konkrétní modely ( `openai/*` , zástupné znaky) pomocí přepínače Povolit vše/Omezit
- **Ochrana koncových bodů API** – Vyžaduje klíč pro `/v1/models` a blokuje konkrétní poskytovatele ze seznamu
- **Auth Guard + CSRF Protection** — Všechny trasy dashboardu chráněné middlewarem `withAuth` + tokeny CSRF
- **Omezovač rychlosti** — Omezování rychlosti na IP s konfigurovatelnými okny
- **Filtrování IP adres** — Seznam povolených/blokovaných adres pro řízení přístupu
- **Ochrana proti vkládání výzev** – Sanitizace proti škodlivým vzorcům výzev
- **Šifrování AES-256-GCM** – přihlašovací údaje jsou v klidovém stavu šifrovány

<details>
<summary><b>🛑 6. „Můj poskytovatel selhal a já ztratil/a programovací tok“</b></summary>
</details>

Poskytovatelé umělé inteligence se mohou stát nestabilními, vracet chyby 5xx nebo dosáhnout dočasných limitů rychlosti. Pokud je vývojář závislý na jediném poskytovateli, je jeho práce přerušena. Bez jističů může opakované pokusy vést k pádu aplikace.

**Jak to OmniRoute řeší:**

- **Jistič pro každý model** – Automatické otevírání/zavírání s konfigurovatelnými prahovými hodnotami a dobou ochlazování (Zavřeno/Otevřeno/Poloviční otevření), rozsah definovaný pro každý model, aby se zabránilo kaskádování bloků
- **Exponenciální odklad** — Progresivní zpoždění opakování
- **Anti-Thundering Herd** — ochrana Mutex + semafor proti souběžným bouřím s opakovanými pokusy
- **Kombinované záložní řetězce** – Pokud primární poskytovatel selže, automaticky se propadne řetězcem bez zásahu.
- **Kombinovaný jistič** – Automaticky deaktivuje selhávajícího poskytovatele v rámci kombinovaného řetězce
- **Dashboard stavu** — Monitorování provozuschopnosti, stavy jističů, uzamčení, statistiky mezipaměti, latence p50/p95/p99

<details>
<summary><b>🔧 7. „Konfigurace každého nástroje umělé inteligence je zdlouhavá a opakující se“</b></summary>
</details>

Vývojáři používají Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Každý nástroj potřebuje jinou konfiguraci (API endpoint, klíč, model). Překonfigurování při změně poskytovatele nebo modelu je ztráta času.

**Jak to OmniRoute řeší:**

- **Panel nástrojů CLI** — Vyhrazená stránka s nastavením jedním kliknutím pro Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity a Cline
- **Generátor konfigurace GitHub Copilot** – Generuje `chatLanguageModels.json` pro VS Code s hromadným výběrem modelu
- **Průvodce zaváděním** – 4krokové nastavení pro začínající uživatele
- **Jeden koncový bod, všechny modely** – jednou nakonfigurujte `http://localhost:20128/v1` a získejte přístup k více než 44 poskytovatelům

<details>
<summary><b>🔑 8. „Správa OAuth tokenů od více poskytovatelů je peklo“</b></summary>
</details>

Claude Code, Codex, Gemini CLI, Copilot – všechny používají OAuth 2.0 s tokeny s vypršením platnosti. Vývojáři se musí neustále znovu autentizovat, řešit chyby `client_secret is missing` , `redirect_uri_mismatch` a chyby na vzdálených serverech. Obzvláště problematický je OAuth v LAN/VPS.

**Jak to OmniRoute řeší:**

- **Automatická aktualizace tokenů** – Tokeny OAuth se obnovují na pozadí před vypršením platnosti.
- **Vestavěný OAuth 2.0 (PKCE)** – Automatický tok pro Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **Multi-Account OAuth** — Více účtů na poskytovatele prostřednictvím extrakce tokenů JWT/ID
- **OAuth LAN/Remote Fix** — Detekce privátní IP adresy pro `redirect_uri` + manuální režim URL pro vzdálené servery
- **OAuth Behind Nginx** — Používá `window.location.origin` pro kompatibilitu s reverzní proxy
- **Průvodce vzdáleným OAuth** – Podrobný návod k přihlašovacím údajům Google Cloud na VPS/Dockeru

<details>
<summary><b>📊 9. „Nevím, kolik utrácím ani kde“</b></summary>
</details>

Vývojáři používají více placených poskytovatelů, ale nemají jednotný přehled o výdajích. Každý poskytovatel má svůj vlastní fakturační panel, ale neexistuje žádný konsolidovaný přehled. Mohou se hromadit neočekávané náklady.

**Jak to OmniRoute řeší:**

- **Dashboard pro analýzu nákladů** – Sledování nákladů na token a správa rozpočtu pro každého poskytovatele
- **Rozpočtové limity na úroveň** – Strop výdajů na úroveň, který spouští automatický záložní režim
- **Konfigurace cen podle modelu** – Konfigurovatelné ceny podle modelu
- **Statistiky použití pro každý klíč API** — Počet požadavků a časové razítko posledního použití pro každý klíč
- **Analytický panel** – Statistické karty, graf využití modelu, tabulka poskytovatelů s mírou úspěšnosti a latencí

<details>
<summary><b>🐛 10. „Nedokážu diagnostikovat chyby a problémy ve volání umělé inteligence.“</b></summary>
</details>

Když volání selže, vývojář neví, zda se jednalo o limit rychlosti, vypršelý token, špatný formát nebo chybu poskytovatele. Fragmentované protokoly napříč různými terminály. Bez sledovatelnosti je ladění metodou pokus-omyl.

**Jak to OmniRoute řeší:**

- **Panel jednotných protokolů** – 4 karty: Protokoly požadavků, Protokoly proxy, Protokoly auditu, Konzole
- **Prohlížeč protokolů konzole** — Prohlížeč protokolů v reálném čase ve stylu terminálu s barevně kódovanými úrovněmi, automatickým posouváním, vyhledáváním a filtrováním
- **Protokoly proxy SQLite** – trvalé protokoly, které přežijí restart serveru
- **Překladačské hřiště** — 4 režimy ladění: Hřiště (překlad formátu), Tester chatu (okružní), Testovací stůl (dávkový), Živý monitor (v reálném čase)
- **Telemetrie požadavků** — latence p50/p95/p99 + trasování X-Request-Id
- **Souborové protokolování s rotací** – Konzolový interceptor zachycuje vše do protokolu JSON s rotací na základě velikosti
- **Zpráva o systémových informacích** — příkaz `npm run system-info` vygeneruje `system-info.txt` s kompletním popisem vašeho prostředí (verze uzlu, verze OmniRoute, operační systém, nástroje CLI, stav Dockeru/PM2). Přiložte jej při hlášení problémů pro okamžité třídění.

<details>
<summary><b>🏗️ 11. „Nasazení a údržba brány je složitá“</b></summary>
</details>

Instalace, konfigurace a údržba AI proxy v různých prostředích (lokální, VPS, Docker, cloud) je pracná. Problémy, jako jsou pevně zakódované cesty, `EACCES` u adresářů, konflikty portů a multiplatformní sestavení, přispívají k obtížím.

**Jak to OmniRoute řeší:**

- **npm globální instalace** — `npm install -g omniroute && omniroute` — hotovo
- **Docker Multi-Platform** — AMD64 + nativní ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profily Docker Compose** — `base` (bez nástrojů CLI) a `cli` (s Claude Code, Codex, OpenClaw)
- **Desktopová aplikace Electron** — Nativní aplikace pro Windows/macOS/Linux se systémovou lištou, automatickým spuštěním a offline režimem
- **Režim rozdělených portů** – API a řídicí panel na samostatných portech pro pokročilé scénáře (reverzní proxy, síťování kontejnerů)
- **Cloud Sync** – Konfigurace synchronizace mezi zařízeními pomocí Cloudflare Workers
- **Zálohy databází** — Automatické zálohování, obnovení, export a import všech nastavení

<details>
<summary><b>🌍 12. „Rozhraní je pouze v angličtině a můj tým nemluví anglicky“</b></summary>
</details>

Týmy v neanglicky mluvících zemích, zejména v Latinské Americe, Asii a Evropě, se potýkají s rozhraními pouze v angličtině. Jazykové bariéry snižují míru přijetí a zvyšují chyby v konfiguraci.

**Jak to OmniRoute řeší:**

- **Dashboard i18n — 30 jazyků** — Všech 500+ kláves je přeloženo včetně arabštiny, bulharštiny, dánštiny, němčiny, španělštiny, finštiny, francouzštiny, hebrejštiny, hindštiny, maďarštiny, indonéštiny, italštiny, japonštiny, korejštiny, malajštiny, holandštiny, norštiny, polštiny, portugalštiny (PT/BR), rumunštiny, ruštiny, slovenštiny, švédštiny, thajštiny, ukrajinštiny, vietnamštiny, čínštiny, filipínštiny a angličtiny
- **Podpora RTL** – Podpora psaní zprava doleva pro arabštinu a hebrejštinu
- **Vícejazyčné soubory README** — 30 kompletních překladů dokumentace
- **Výběr jazyka** — Ikona glóbu v záhlaví pro přepínání v reálném čase

<details>
<summary><b>🔄 13. „Potřebuji víc než jen chat – potřebuji vložené soubory, obrázky, zvuk.“</b></summary>
</details>

Umělá inteligence není jen dokončování chatu. Vývojáři potřebují generovat obrázky, přepisovat zvuk, vytvářet embeddedy pro RAG, měnit pořadí dokumentů a moderovat obsah. Každé API má jiný koncový bod a formát.

**Jak to OmniRoute řeší:**

- **Vkládání** — `/v1/embeddings` s 6 poskytovateli a 9+ modely
- **Generování obrázků** — `/v1/images/generations` s 10 poskytovateli a více než 20 modely (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Převod textu na video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) a SD WebUI
- **Převod textu na hudbu** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Přepis zvuku** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Převod textu na řeč** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld** , **Cartesia** , **PlayHT** a další stávající poskytovatelé
- **Moderování** — `/v1/moderations` — Kontroly bezpečnosti obsahu
- **Změna pořadí** — `/v1/rerank` — Změna pořadí relevance dokumentu
- **Responses API** — Plná podpora `/v1/responses` pro Codex

<details>
<summary><b>🧪 14. „Nemám způsob, jak testovat a porovnávat kvalitu napříč modely.“</b></summary>
</details>

Vývojáři chtějí vědět, který model je pro jejich případ použití nejlepší – kód, překlad, uvažování – ale ruční porovnávání je pomalé. Neexistují žádné integrované nástroje pro vyhodnocování.

**Jak to OmniRoute řeší:**

- **Hodnocení LLM** — Testování Golden setu s 10 předinstalovanými případy zahrnujícími pozdravy, matematiku, geografii, generování kódu, dodržování JSON, překlad, markdown, odmítnutí bezpečnostních požadavků
- **4 strategie shody** — `exact` , `contains` , `regex` , `custom` (JS funkce)
- **Testovací lavice pro překladatelské hřiště** — Dávkové testování s více vstupy a očekávanými výstupy, porovnání napříč poskytovateli
- **Tester chatu** — Kompletní okružní cesta s vizuálním vykreslováním odpovědí
- **Živý monitor** — Stream všech požadavků procházejících proxy serverem v reálném čase

<details>
<summary><b>📈 15. „Potřebuji škálovat bez ztráty výkonu“</b></summary>
</details>

S rostoucím objemem požadavků generují stejné otázky bez ukládání do mezipaměti duplicitní náklady. Bez idempotence duplicitní požadavky plýtvají zpracováním. Je nutné dodržovat limity rychlosti na poskytovatele.

**Jak to OmniRoute řeší:**

- **Sémantická mezipaměť** — Dvouvrstvá mezipaměť (signatura + sémantika) snižuje náklady a latenci
- **Idempotence požadavku** — 5s deduplikační okno pro identické požadavky
- **Detekce limitu rychlosti** – sledování otáček za minutu (RPM), minimální mezera a maximální souběžné sledování pro každého poskytovatele
- **Upravitelné limity rychlosti** — Konfigurovatelné výchozí hodnoty v Nastavení → Odolnost s perzistencí
- **Mezipaměť pro ověření klíčů API** — třívrstvá mezipaměť pro výkon produkčního prostředí
- **Dashboard s telemetrií** – latence p50/p95/p99, statistiky mezipaměti, dostupnost

<details>
<summary><b>🤖 16. „Chci mít chování modelů globálně pod kontrolou“</b></summary>
</details>

Vývojáři, kteří chtějí všechny odpovědi v určitém jazyce, se specifickým tónem nebo chtějí omezit tokeny pro uvažování. Konfigurace této funkce v každém nástroji/požadavku je nepraktická.

**Jak to OmniRoute řeší:**

- **Vložení systémového prompt** – Globální prompt aplikovaný na všechny požadavky
- **Validace rozpočtu Thinking** — Řízení alokace tokenů na požadavek (průchozí, automatické, vlastní, adaptivní)
- **6 strategií směrování** – Globální strategie, které určují, jak jsou požadavky distribuovány
- **Směrovač se zástupnými znaky** — vzory `provider/*` dynamicky směrují k libovolnému poskytovateli
- **Přepínání povolení/zakázání kombinací** – Přepínání kombinací přímo z řídicího panelu
- **Přepínání poskytovatele** – Povolení/zakázání všech připojení pro poskytovatele jedním kliknutím
- **Blokovaní poskytovatelé** – Vyloučení konkrétních poskytovatelů ze seznamu `/v1/models`

<details>
<summary><b>🧰 17. „Potřebuji nástroje MCP jako prvotřídní produktové funkce.“</b></summary>
</details>

Mnoho bran umělé inteligence odhaluje MCP pouze jako skrytý implementační detail. Týmy potřebují viditelnou a spravovatelnou operační vrstvu.

**Jak to OmniRoute řeší:**

- MCP se zobrazuje v navigaci na řídicím panelu a na kartě protokolu koncového bodu.
- Vyhrazená stránka pro správu MCP s procesy, nástroji, rozsahy a auditem
- Vestavěný rychlý start pro `omniroute --mcp` a onboarding klienta

<details>
<summary><b>🧠 18. „Potřebuji orchestraci A2A se synchronizací a cestami úloh streamu.“</b></summary>
</details>

Pracovní postupy agentů vyžadují jak přímé odpovědi, tak dlouhodobé streamované provádění s kontrolou životního cyklu.

**Jak to OmniRoute řeší:**

- Koncový bod A2A JSON-RPC ( `POST /a2a` ) s `message/send` `message/stream`
- Streamování SSE s šířením stavu terminálu
- Rozhraní API životního cyklu úloh pro `tasks/get` a `tasks/cancel`

<details>
<summary><b>🛰️ 19. „Potřebuji skutečný stav procesu MCP, ne odhadovaný stav.“</b></summary>
</details>

Provozní týmy potřebují vědět, zda je MCP skutečně aktivní, nejen zda je API dosažitelné.

**Jak to OmniRoute řeší:**

- Soubor běhového heartbeatu s PID, časovými razítky, transportem, počtem nástrojů a režimem rozsahu
- API stavu MCP kombinující prezenční signál a nedávnou aktivitu
- Karty stavu uživatelského rozhraní pro zobrazení aktuálnosti procesů/provozuschopnosti/prezenčního signálu

<details>
<summary><b>📋 20. „Potřebuji auditovatelné provedení nástroje MCP“</b></summary>
</details>

Když nástroje mění konfiguraci nebo spouštějí operační akce, týmy potřebují forenzní sledovatelnost.

**Jak to OmniRoute řeší:**

- Protokolování auditu pro volání nástrojů MCP s podporou SQLite
- Filtruje podle nástroje, úspěchu/neúspěchu, klíče API a stránkování
- Tabulka auditu dashboardu + koncové body statistik pro automatizaci

<details>
<summary><b>🔐 21. „Potřebuji omezená oprávnění MCP pro každou integraci.“</b></summary>
</details>

Různí klienti by měli mít přístup ke kategoriím nástrojů s nejnižšími oprávněními.

**Jak to OmniRoute řeší:**

- 9 detailních MCP sond pro kontrolovaný přístup k nástrojům
- Vynucení rozsahu a viditelnost v uživatelském rozhraní správy MCP
- Bezpečná výchozí poloha pro provozní nástroje

<details>
<summary><b>⚙️ 22. „Potřebuji provozní kontroly bez nutnosti přesouvání“</b></summary>
</details>

Týmy potřebují rychlé změny v běhovém prostředí během incidentů nebo nákladových událostí.

**Jak to OmniRoute řeší:**

- Přepněte aktivaci komba přímo z řídicího panelu MCP
- Používejte profily odolnosti z předdefinovaných balíčků zásad
- Resetujte stav jističe ze stejného ovládacího panelu

<details>
<summary><b>🔄 23. „Potřebuji živý přehled o životním cyklu úkolů A2A a jejich zrušení.“</b></summary>
</details>

Bez přehledu o životním cyklu je obtížné třídit incidenty úkolů.

**Jak to OmniRoute řeší:**

- Výpis/filtrování úkolů podle státu/dovednosti s stránkováním
- Podrobný přehled metadat úloh, událostí a artefaktů
- Koncový bod zrušení úlohy a akce uživatelského rozhraní s potvrzením

<details>
<summary><b>🌊 24. „Potřebuji metriky aktivního streamu pro A2A zátěž“</b></summary>
</details>

Streamovací pracovní postupy vyžadují provozní přehled o souběžnosti a živých připojeních.

**Jak to OmniRoute řeší:**

- Čítače aktivních streamů integrované do stavu A2A
- Časové razítko posledního úkolu a počty pro jednotlivé stavy
- Karty A2A dashboardu pro monitorování provozu v reálném čase

<details>
<summary><b>🪪 25. „Potřebuji standardní vyhledávání agentů pro klienty“</b></summary>
</details>

Externí klienti a orchestratoři potřebují pro onboarding strojově čitelná metadata.

**Jak to OmniRoute řeší:**

- Karta agenta je k dispozici v souboru `/.well-known/agent.json`
- Schopnosti a dovednosti zobrazené v uživatelském rozhraní pro správu
- API pro stav A2A zahrnuje metadata pro zjišťování pro automatizaci

<details>
<summary><b>🧭 26. „Potřebuji v uživatelském rozhraní produktu zjistitelnost protokolu.“</b></summary>
</details>

Pokud uživatelé nemohou objevit protokolové povrchy, kvalita přijetí a podpory klesá.

**Jak to OmniRoute řeší:**

- Stránka Konsolidované **koncové body** s kartami pro koncové body Proxy, MCP, A2A a API
- Přepínání stavu inline služby (Online/Offline) pro MCP a A2A
- Odkazy z přehledu na vyhrazené karty pro správu

<details>
<summary><b>🧪 27. „Potřebuji komplexní ověření protokolu se skutečnými klienty.“</b></summary>
</details>

Simulované testy nestačí k ověření kompatibility protokolu před vydáním.

**Jak to OmniRoute řeší:**

- Sada E2E, která spouští aplikaci a používá skutečný transport klienta MCP SDK.
- Klientské testy A2A pro toky zjišťování, odesílání, streamování, načítání a zrušení
- Křížová kontrola tvrzení oproti API pro audit MCP a úkoly A2A

<details>
<summary><b>📡 28. „Potřebuji jednotnou pozorovatelnost napříč všemi rozhraními“</b></summary>
</details>

Rozdělení pozorovatelnosti podle protokolu vytváří slepá místa a delší MTTR.

**Jak to OmniRoute řeší:**

- Sjednocené dashboardy/logy/analytiky v jednom produktu
- Stav + audit + telemetrie požadavků napříč vrstvami OpenAI, MCP a A2A
- Provozní API pro stav a automatizaci

<details>
<summary><b>💼 29. „Potřebuji jeden runtime pro proxy + nástroje + orchestraci agentů“</b></summary>
</details>

Spouštění mnoha samostatných služeb zvyšuje provozní náklady a počet poruch.

**Jak to OmniRoute řeší:**

- Proxy, MCP server a A2A server kompatibilní s OpenAI v jednom balíčku
- Sdílené ověřování, odolnost, úložiště dat a pozorovatelnost
- Konzistentní model politik napříč všemi interakčními plochami

<details>
<summary><b>🚀 30. „Potřebuji agentské pracovní postupy bez slepení kódu.“</b></summary>
</details>

Týmy ztrácejí rychlost při spojování více ad-hoc služeb a skriptů.

**Jak to OmniRoute řeší:**

- Sjednocená strategie koncových bodů pro klienty a agenty
- Vestavěná uživatelská rozhraní pro správu protokolů a cesty pro ověřování kouře
- Základy připravené pro produkční prostředí (zabezpečení, protokolování, odolnost, zálohování)

### Příklady herních plánů (integrované případy užití)

**Příručka A: Maximalizace placeného předplatného + levné zálohování**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Příručka B: Kódovací stack s nulovými náklady**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Příručka C: Nonstop záložní řetězec**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Příručka D: Operace agentů s MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Začněte zdarma — Nulové náklady na konfiguraci

> Nastavte si kódování s umělou inteligencí během několika minut za **0 $/měsíc** . Propojte tyto bezplatné účty a využijte vestavěnou kombinaci **Free Stack** .

| Krok | Akce                                                           | Poskytovatelé odemčeni                                            |
| ---- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1    | Připojení **Kiro** (AWS Builder ID OAuth)                      | Claude Sonnet 4.5, Haiku 4.5 – **neomezeně**                      |
| 2    | Připojení k **iFlow** (Google OAuth)                           | kimi-k2-myšlení, qwen3-coder-plus, deepseek-r1... — **neomezeně** |
| 3    | Připojení **Qwen** (kód zařízení)                              | qwen3-coder-plus, qwen3-coder-flash... — **neomezeně**            |
| 4    | Připojení **rozhraní příkazového řádku Gemini** (Google OAuth) | gemini-3-flash, gemini-2.5-pro — **180 000 GBP/měsíc zdarma**     |
| 5    | `/dashboard/combos` → Šablona **Free Stack (0 $)**             | Automatické zařazení všech bezplatných poskytovatelů do routingu  |

**V libovolném IDE/CLI naveďte:** `http://localhost:20128/v1` · Klíč API: `any-string` · Hotovo.

> **Volitelné doplňkové krytí (také zdarma):** Groq API klíč (30 RPM zdarma), NVIDIA NIM (40 RPM zdarma, 70+ modelů), Cerebras (1 milion tok/den).

## ⚡ Rychlý start

### 1) Nainstalujte a spusťte

```bash
npm install -g omniroute
omniroute
```

> **Uživatelé pnpm:** Po instalaci spusťte `pnpm approve-builds -g` , abyste povolili nativní skripty pro sestavení vyžadované programy `better-sqlite3` a `@swc/core` :
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Dashboard se otevírá na `http://localhost:20128` a základní URL API je `http://localhost:20128/v1` .

| Příkaz                  | Popis                                                               |
| ----------------------- | ------------------------------------------------------------------- |
| `omniroute`             | Spuštění serveru ( `PORT=20128` , API a dashboard na stejném portu) |
| `omniroute --port 3000` | Nastavte kanonický/API port na 3000                                 |
| `omniroute --mcp`       | Spuštění MCP serveru (transport stdio)                              |
| `omniroute --no-open`   | Neotevírat prohlížeč automaticky                                    |
| `omniroute --help`      | Zobrazit nápovědu                                                   |

Volitelný režim s rozděleným portem:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Připojte poskytovatele a vytvořte si klíč API

1. Otevřete Dashboard → `Providers` a připojte alespoň jednoho poskytovatele (klíč OAuth nebo API).
2. Otevřete Dashboard → `Endpoints` a vytvořte API klíč.
3. (Volitelné) Otevřete Dashboard → `Combos` a nastavte záložní řetězec.

### 3) Nasměrujte svůj kódovací nástroj na OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Funguje s Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode a SDK kompatibilními s OpenAI.

### 4) Povolení a ověření protokolů (v2.0)

**MCP (pro operace řízené nástroji):**

```bash
omniroute --mcp
```

Pak připojte svého MCP klienta přes `stdio` a otestujte nástroje jako:

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

Tato sada ověřuje skutečné toky klientů MCP a A2A v porovnání se spuštěnou aplikací.

### Alternativa: spustit ze zdroje

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute je k dispozici jako veřejný obraz Dockeru na [Docker Hubu](https://hub.docker.com/r/diegosouzapw/omniroute) .

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

**Používání Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Obraz                    | Štítek   | Velikost | Popis                     |
| ------------------------ | -------- | -------- | ------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB  | Nejnovější stabilní verze |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB  | Aktuální verze            |

---

## 🖥️ Desktopová aplikace – offline a vždy zapnutá

> 🆕 **NOVINKA!** OmniRoute je nyní k dispozici jako **nativní desktopová aplikace** pro Windows, macOS a Linux.

Spusťte OmniRoute jako samostatnou desktopovou aplikaci – pro lokální modely není potřeba žádný terminál, prohlížeč ani internet. Aplikace založená na platformě Electron obsahuje:

- 🖥️ **Nativní okno** — Vyhrazené okno aplikace s integrací do systémové lišty
- 🔄 **Automatické spuštění** — Spuštění OmniRoute po přihlášení do systému
- 🔔 **Nativní oznámení** – Získejte upozornění na vyčerpání kvóty nebo problémy s poskytovateli
- ⚡ **Instalace jedním kliknutím** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline režim** — Funguje plně offline s přiloženým serverem

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

### Systémový zásobník

Po minimalizaci se OmniRoute nachází v systémové liště a nabízí rychlé akce:

- Otevřít řídicí panel
- Změnit port serveru
- Ukončit aplikaci

📖 Úplná dokumentace: [`electron/README.md`](electron/README.md)

---

## 💰 Přehled cen

| Úroveň                      | Poskytovatel                     | Náklady                              | Obnovení kvóty                             | Nejlepší pro                                              |
| --------------------------- | -------------------------------- | ------------------------------------ | ------------------------------------------ | --------------------------------------------------------- |
| **💳 PŘEDPLATNÉ**           | Claude Code (profesionál)        | 20 dolarů měsíčně                    | 5 hodin + týdně                            | Již přihlášen/a k odběru                                  |
| Kodex (Plus/Pro)            | 20–200 USD/měsíc                 | 5 hodin + týdně                      | Uživatelé OpenAI                           |
| Gemini CLI                  | **UVOLNIT**                      | 180 tisíc měsíčně + 1 tisíc denně    | Každý!                                     |
| GitHub Copilot              | 10–19 USD/měsíc                  | Měsíční                              | Uživatelé GitHubu                          |
| **🔑 KLÍČ API**             | NVIDIA NIM                       | **ZDARMA** (vývoj navždy)            | ~40 ot./min                                | 70+ otevřených modelů                                     |
| Mozky                       | **ZDARMA** (1 milion tok/den)    | 60 000 otáček za minutu / 30 ot./min | Nejrychlejší na světě                      |
| Groq                        | **ZDARMA** (30 ot./min.)         | 14,4 tisíc otáček za minutu          | Ultrarychlá lama/gema                      |
| DeepSeek V3.2               | 0,27/1,10 USD za 1 milion        | Žádný                                | Nejlepší zdůvodnění ceny a kvality         |
| xAI Grok-4 Rychlý           | **0,20/0,50 USD za 1 milion** 🆕 | Žádný                                | Nejrychlejší + volání nástroje, ultranízké |
| xAI Grok-4 (standardní)     | 0,20/1,50 USD za 1 milion 🆕     | Žádný                                | Vlajková loď Reasoning od xAI              |
| Mistral                     | Zkušební verze zdarma + placené  | Omezená sazba                        | Evropská umělá inteligence                 |
| OpenRouter                  | Platba za použití                | Žádný                                | Více než 100 modelů agregováno.            |
| **💰 LEVNÉ**                | GLM-5 (přes Z.AI) 🆕             | 0,5 USD/1 milion                     | Denně v 10:00                              | Výstup 128 tisíc obrazových bodů, nejnovější vlajková loď |
| GLM-4.7                     | 0,6 USD/1 milion                 | Denně v 10:00                        | Záloha rozpočtu                            |
| MiniMax M2.5 🆕             | Vstup 0,3 USD/1 milion           | 5hodinové válcování                  | Úvaha + agentní úkoly                      |
| MiniMax M2.1                | 0,2 USD/1 milion                 | 5hodinové válcování                  | Nejlevnější varianta                       |
| Kimi K2.5 (Moonshot API) 🆕 | Platba za použití                | Žádný                                | Přímý přístup k Moonshot API               |
| Kimi K2                     | 9 dolarů měsíčně bez závazků     | 10 milionů tokenů/měsíc              | Předvídatelné náklady                      |
| **🆓 ZDARMA**               | iFlow                            | **0 dolarů**                         | Neomezený                                  | 5 modelů neomezeně                                        |
| Qwen                        | **0 dolarů**                     | Neomezený                            | 4 modely neomezeně                         |
| Kiro                        | **0 dolarů**                     | Neomezený                            | Claude Sonnet/Haiku (tvorce AWS)           |

> 🆕 **Přidány nové modely (březen 2026):** řada Grok-4 Fast za 0,20 USD/0,50 USD/M (benchmarkováno na 1143 ms – o 30 % rychlejší než Gemini 2.5 Flash), GLM-5 přes Z.AI s výstupem 128K, uvažování MiniMax M2.5, aktualizované ceny DeepSeek V3.2, Kimi K2.5 přes Moonshot Direct API.

**💡 Kombinovaný balík za 0 $ — Kompletní bezplatná instalace:**

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

**Nulové náklady. Nikdy nepřestávejte s kódováním.** Nakonfigurujte si to jako jednu kombinaci OmniRoute a všechny záložní režimy se provede automaticky – žádné ruční přepínání.

---

---

## 🆓 Bezplatné modely – Co skutečně získáte

> Všechny níže uvedené modely jsou **100% zdarma a nevyžadují žádnou kreditní kartu** . OmniRoute mezi nimi automaticky propojí trasy, když dojde jedna kvóta – zkombinujte je všechny a získejte tak nerozlučnou kombinaci za 0 dolarů.

### 🔵 CLAUDE MODELS (přes Kiro — AWS Builder ID)

| Model               | Předpona | Omezit        | Limit rychlosti           |
| ------------------- | -------- | ------------- | ------------------------- |
| `claude-sonnet-4.5` | `kr/`    | **Neomezený** | Žádný hlášený denní limit |
| `claude-haiku-4.5`  | `kr/`    | **Neomezený** | Žádný hlášený denní limit |
| `claude-opus-4.6`   | `kr/`    | **Neomezený** | Nejnovější opus od Kira   |

### 🟢 MODELY IFLOW (Bezplatné OAuth — bez nutnosti platit kreditní kartou)

| Model              | Předpona | Omezit        | Limit rychlosti     |
| ------------------ | -------- | ------------- | ------------------- |
| `kimi-k2-thinking` | `if/`    | **Neomezený** | Žádný hlášený strop |
| `qwen3-coder-plus` | `if/`    | **Neomezený** | Žádný hlášený strop |
| `deepseek-r1`      | `if/`    | **Neomezený** | Žádný hlášený strop |
| `minimax-m2.1`     | `if/`    | **Neomezený** | Žádný hlášený strop |
| `kimi-k2`          | `if/`    | **Neomezený** | Žádný hlášený strop |

### 🟡 MODELY QWEN (Ověření kódu zařízení)

| Model               | Předpona | Omezit        | Limit rychlosti        |
| ------------------- | -------- | ------------- | ---------------------- |
| `qwen3-coder-plus`  | `qw/`    | **Neomezený** | Žádný hlášený strop    |
| `qwen3-coder-flash` | `qw/`    | **Neomezený** | Žádný hlášený strop    |
| `qwen3-coder-next`  | `qw/`    | **Neomezený** | Žádný hlášený strop    |
| `vision-model`      | `qw/`    | **Neomezený** | Multimodální (obrázky) |

### 🟣 Rozhraní GEMINI CLI (Google OAuth)

| Model                    | Předpona | Omezit                                | Limit rychlosti |
| ------------------------ | -------- | ------------------------------------- | --------------- |
| `gemini-3-flash-preview` | `gc/`    | **180 tisíc tok/měsíc** + 1 tisíc/den | Měsíční reset   |
| `gemini-2.5-pro`         | `gc/`    | 180 tisíc měsíčně (sdílený bazén)     | Vysoká kvalita  |

### ⚫ NVIDIA NIM (Bezplatný klíč API — build.nvidia.com)

| Úroveň           | Denní limit        | Limit rychlosti | Poznámky                                                               |
| ---------------- | ------------------ | --------------- | ---------------------------------------------------------------------- |
| Zdarma (vývojář) | Žádný limit tokenů | **~40 ot./min** | Více než 70 modelů; přechod na čisté limity sazeb v polovině roku 2025 |

Oblíbené bezplatné modely: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct` , `deepseek/deepseek-r1`

### ⚪ CEREBRAS (Bezplatný klíč API — inference.cerebras.ai)

| Úroveň  | Denní limit             | Limit rychlosti                      | Poznámky                                               |
| ------- | ----------------------- | ------------------------------------ | ------------------------------------------------------ |
| Uvolnit | **1 milion tokenů/den** | 60 000 otáček za minutu / 30 ot./min | Nejrychlejší inference LLM na světě; denně se resetuje |

Dostupné zdarma: `llama-3.3-70b` , `llama-3.1-8b` , `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (Bezplatný API klíč — console.groq.com)

| Úroveň  | Denní limit                     | Limit rychlosti     | Poznámky                                    |
| ------- | ------------------------------- | ------------------- | ------------------------------------------- |
| Uvolnit | **14,4 tisíc otáček za minutu** | 30 ot./min na model | Žádná kreditní karta; limit 429, neúčtováno |

K dispozici zdarma: `llama-3.3-70b-versatile` , `gemma2-9b-it` , `mixtral-8x7b` , `whisper-large-v3`

> **💡 Ultimátní bezplatný zásobník:**
>
> ```
> Kiro (Claude, unlimited)
>  → iFlow (5 models, unlimited)
>  → Qwen (4 models, unlimited)
>  → Gemini CLI (180K/mo)
>  → Cerebras (1M tok/day)
>  → Groq (14.4K req/day)
>  → NVIDIA NIM (40 RPM, 70+ models)
> ```
>
> Nakonfigurujte si to jako kombinaci OmniRoute a už nikdy nebudete platit za umělou inteligenci.

## 🎙️ Kombinovaná transkripce zdarma

> Přepisujte libovolné audio/video za **0 $** – Deepgram leady za 200 $ zdarma, AssemblyAI za 50 $ jako záložní nástroj, Groq Whisper jako neomezená nouzová záloha.

| Poskytovatel      | Bezplatné kredity                  | Nejlepší model                                        | Limit rychlosti                    |
| ----------------- | ---------------------------------- | ----------------------------------------------------- | ---------------------------------- |
| 🟢 **Deepgram**   | **200 dolarů zdarma** (registrace) | `nova-3` — nejvyšší přesnost, více než 30 jazyků      | Žádný limit RPM pro kredity zdarma |
| 🔵 **AssemblyAI** | **50 dolarů zdarma** (registrace)  | `universal-3-pro` — kapitoly, sentiment, osobní údaje | Žádný limit RPM pro kredity zdarma |
| 🔴 **Groq**       | **Navždy zdarma**                  | `whisper-large-v3` — OpenAI Šepot                     | 30 ot./min (omezená rychlost)      |

**Navrhovaná kombinace v `/dashboard/combos` :**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Pak v `/dashboard/media` → záložka **Přepis** : nahrajte libovolný zvukový nebo video soubor → vyberte kombinovaný koncový bod → získejte přepis v podporovaných formátech.

## 💡 Klíčové vlastnosti

OmniRoute v2.0 je navržen jako operační platforma, nikoli pouze jako proxy pro relé.

### 🤖 Operace s agenty a protokoly (v2.0)

| Funkce                                        | Co to dělá                                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP Server (16 nástrojů)**               | Nástroje IDE/agent prostřednictvím 3 transportů: stdio, SSE ( `/api/mcp/sse` ), Streamovatelný HTTP ( `/api/mcp/stream` ) |
| 🤝 **A2A server (JSON-RPC + SSE)**            | Spouštění úloh mezi agenty se synchronizací a streamováním                                                                |
| 🧭 **Konsolidovaná stránka koncových bodů**   | Stránka pro správu s kartami Endpoint Proxy, MCP, A2A a API Endpoints                                                     |
| 🎚️ **Přepínače pro povolení/zakázání služby** | Přepínače ZAP/VYP pro MCP a A2A s trvalým nastavením (výchozí: VYP)                                                       |
| 🛰️ **Srdeční tep za běhu MCP**                | Skutečný stav procesu (pid, doba provozuschopnosti, stáří heartbeatu, transport, režim rozsahu)                           |
| 📋 **Auditní záznam MCP**                     | Filtrovatelné protokoly auditu s hodnocením úspěchu/neúspěchu a klíčovým přiřazením                                       |
| 🔐 **Vynucování rozsahu MCP**                 | 9 podrobných oprávnění pro řízený přístup k nástrojům                                                                     |
| 📡 **Správa životního cyklu úkolů A2A**       | Seznam/filtrování úloh, kontrola událostí/artefaktů, zrušení spuštěných úloh                                              |
| 📋 **Objevení karty agenta**                  | `/.well-known/agent.json` pro automatické vyhledávání klientů                                                             |
| 🧪 **Testovací postroj Protocol E2E**         | Skutečné MCP SDK + toky klientů A2A v `test:protocols:e2e`                                                                |
| ⚙️ **Provozní kontroly**                      | Kombinace přepínačů, použití profilů odolnosti, resetování jističů z jednoho ovládacího panelu                            |

### 🧠 Směrování a inteligence

| Funkce                                          | Co to dělá                                                                    |
| ----------------------------------------------- | ----------------------------------------------------------------------------- |
| 🎯 **Inteligentní čtyřúrovňový záložní systém** | Automatická trasa: Předplatné → API klíč → Levné → Zdarma                     |
| 📊 **Sledování kvót v reálném čase**            | Počet tokenů v reálném čase + odpočet resetování pro každého poskytovatele    |
| 🔄 **Překlad formátu**                          | OpenAI ↔ Claude ↔ Gemini ↔ Odpovědi s konverzemi bezpečnými pro schéma        |
| 👥 **Podpora více účtů**                        | Více účtů na poskytovatele s inteligentním výběrem                            |
| 🔄 **Automatická aktualizace tokenů**           | Tokeny OAuth se automaticky obnovují při opakovaném pokusu.                   |
| 🎨 **Vlastní kombinace**                        | 6 vyvažovacích strategií + řízení záložního řetězce                           |
| 🌐 **Směrovač se zástupnými znaky**             | dynamické směrování `provider/*`                                              |
| 🧠 **Přemýšlení o rozpočtových kontrolách**     | Limity pro průchozí, automatické, vlastní a adaptivní uvažování               |
| 🔀 **Aliasy modelů**                            | Vestavěné + vlastní aliasování modelů a bezpečnost migrace                    |
| ⚡ **Degradace pozadí**                         | Směrujte úlohy na pozadí s nízkou prioritou na levnější modely                |
| 🧪 **Chytré směrování s ohledem na úkoly**      | Automatický výběr modelu podle typu obsahu (kódování/vize/analýza/sumarizace) |
| 💬 **Vstřikování do systému**                   | Globální kontroly chování uplatňované konzistentně                            |
| 📄 **Kompatibilita API pro odpovědi**           | Plná podpora `/v1/responses` pro Codex a pokročilé agentické pracovní postupy |

### 🎵 Multimodální API

| Funkce                        | Co to dělá                                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generování obrázků**     | `/v1/images/generations` s cloudovým a lokálním backendem                                                                                               |
| 📐 **Vložení**                | `/v1/embeddings` pro vyhledávání a RAG pipelines                                                                                                        |
| 🎤 **Přepis zvuku**           | `/v1/audio/transcriptions` (Whisper a další poskytovatelé)                                                                                              |
| 🔊 **Převod textu na řeč**    | `/v1/audio/speech` (více enginů/poskytovatelů)                                                                                                          |
| 🎬 **Generování videa**       | `/v1/videos/generations` (pracovní postupy ComfyUI + SD WebUI)                                                                                          |
| 🎵 **Hudební generace**       | `/v1/music/generations` (pracovní postupy ComfyUI)                                                                                                      |
| 🛡️ **Moderování**             | Bezpečnostní kontroly `/v1/moderations`                                                                                                                 |
| 🔀 **Změna pořadí**           | `/v1/rerank` pro hodnocení relevance                                                                                                                    |
| 🔍 **Vyhledávání na webu** 🆕 | `/v1/search` — 5 poskytovatelů (Serper, Brave, Perplexity, Exa, Tavily), více než 6 500 zdarma/měsíc, automatické přepnutí na záložní systém, mezipaměť |

### 🛡️ Odolnost, bezpečnost a správa věcí veřejných

| Funkce                                      | Co to dělá                                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 🔌 **Jističe**                              | Vypnutí/obnovení pro každý model s ovládáním prahových hodnot                                                     |
| 🎯 **Modely s ohledem na koncové body**     | Vlastní modely deklarují podporované koncové body + formát API                                                    |
| 🛡️ **Stádo proti hromům**                   | Ochrana mutexu a semaforu při událostech opakování/rychlosti                                                      |
| 🧠 **Sémantická + podpisová mezipaměť**     | Snížení nákladů/latence díky dvěma vrstvám mezipaměti                                                             |
| ⚡ **Žádost o idempotenci**                 | Okno ochrany proti duplikacím                                                                                     |
| 🔒 **Falšování otisků prstů pomocí TLS**    | Otisk TLS podobný prohlížeči – **snižuje detekci botů a nahlašování účtů**                                        |
| 🔏 **Porovnávání otisků prstů v CLI**       | Shoduje se s nativními podpisy požadavků CLI – **snižuje riziko zablokování a zároveň zachovává IP adresu proxy** |
| 🌐 **Filtrování IP adres**                  | Ovládání seznamu povolených/blokovaných položek pro odhalená nasazení                                             |
| 📊 **Upravitelné limity rychlosti**         | Konfigurovatelné globální/na úrovni poskytovatele limity s perzistencí                                            |
| 🔑 **Správa klíčů API a stanovení rozsahu** | Bezpečné vydávání/rotace klíčů a kontroly modelu/poskytovatele                                                    |
| 🛡️ **Chráněné `/models`**                   | Volitelné ověřování a skrytí poskytovatele pro katalog modelů                                                     |

### 📊 Pozorovatelnost a analytika

| Funkce                              | Co to dělá                                                             |
| ----------------------------------- | ---------------------------------------------------------------------- |
| 📝 **Žádost + protokolování proxy** | Úplné protokolování požadavků/odpovědí a proxy                         |
| 📋 **Sjednocený panel protokolů**   | Zobrazení požadavků, proxy, auditu a konzole na jedné stránce          |
| 🔍 **Vyžádat si telemetrii**        | Latence p50/p95/p99 a trasování požadavků                              |
| 🏥 **Panel zdraví**                 | Doba provozuschopnosti, stavy jističů, uzamčení, statistiky mezipaměti |
| 💰 **Sledování nákladů**            | Kontrola rozpočtu a přehled o cenách pro jednotlivé modely             |
| 📈 **Analytické vizualizace**       | Přehledy využití modelů/poskytovatelů a zobrazení trendů               |
| 🧪 **Rámec hodnocení**              | Testování zlaté sady s konfigurovatelnými strategiemi shody            |

### ☁️ Nasazení a platforma

| Funkce                                          | Co to dělá                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| 🌐 **Nasazení kdekoli**                         | Localhost, VPS, Docker, cloudová prostředí                                |
| 💾 **Synchronizace s cloudem**                  | Synchronizace konfigurace přes cloud worker                               |
| 🔄 **Zálohování/Obnovení**                      | Toky exportu/importu a obnovy po havárii                                  |
| 🧙 **Průvodce nástupem**                        | Průvodce prvním spuštěním                                                 |
| 🔧 **Panel nástrojů CLI**                       | Nastavení oblíbených kódovacích nástrojů jedním kliknutím                 |
| 🎮 **Modelové hřiště**                          | Otestujte libovolného poskytovatele/model/koncový bod z řídicího panelu   |
| 🔏 **Přepínač otisků prstů v příkazovém řádku** | Porovnávání otisků prstů podle poskytovatele v Nastavení &gt; Zabezpečení |
| 🌐 **i18n (30 jazyků)**                         | Plná jazyková podpora dashboardu a dokumentace s psaním zprava doleva     |
| 🧹 **Clear All Models**                         | One-click model list clearing in provider details                         |
| 📋 **Issue Templates**                          | Standardized GitHub templates for bugs and features                       |
| 📂 **Adresář vlastních dat**                    | Přepsání `DATA_DIR` pro umístění úložiště                                 |

### Hluboký pohled na funkce

#### Chytrá záložní funkce s praktickou kontrolou nákladů

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Když selže kvóta, rychlost nebo stav, OmniRoute automaticky přejde k dalšímu kandidátovi bez nutnosti ručního přepínání.

#### Správa protokolů, která je viditelná a ovladatelná

- MCP + A2A jsou viditelné v uživatelském rozhraní a dokumentaci (nejsou skryté)
- API pro stav protokolu zpřístupňují živá provozní data ( `/api/mcp/*` , `/api/a2a/*` )
- Dashboardy zahrnují akce pro operace 2. dne (přepínání kombinací, resetování jističů, zrušení úkolů)

#### Pracovní postup překladatele + validace

Oblast překladatele zahrnuje:

- **Hřiště** : kontroly transformace požadavků
- **Tester chatu** : kompletní okružní cesta požadavku/odpovědi
- **Testovací stolice** : více případů v jednom běhu
- **Živý monitor** : zobrazení provozu v reálném čase

Plus validace protokolu se skutečnými klienty pomocí `npm run test:protocols:e2e` .

> 📖 **[Soubor README pro MCP Server](open-sse/mcp-server/README.md)** — Referenční informace o nástrojích, konfigurace IDE a příklady klientů
>
> 📖 **[Soubor README pro A2A Server](src/lib/a2a/README.md)** — Dovednosti, metody JSON-RPC, streamování a životní cyklus úloh

## 🧪 Hodnocení (Evals)

OmniRoute obsahuje vestavěný hodnotící rámec pro testování kvality odpovědí LLM v porovnání se zlatou sadou. Přístup k němu je možný přes **Analýzy → Hodnocení** v dashboardu.

### Vestavěná zlatá sada

Předinstalovaná sada „OmniRoute Golden Set“ obsahuje testovací případy pro:

- Zdravím, matematika, zeměpis, generování kódu
- Shoda s formátem JSON, překlad, generování markdownů
- Bezpečnostní odmítnutí (škodlivý obsah), počítání, booleovská logika

### Strategie hodnocení

| Strategie  | Popis                                                                    | Příklad                          |
| ---------- | ------------------------------------------------------------------------ | -------------------------------- |
| `exact`    | Výstup se musí přesně shodovat                                           | `"4"`                            |
| `contains` | Výstup musí obsahovat podřetězec (bez rozlišení velkých a malých písmen) | `"Paris"`                        |
| `regex`    | Výstup musí odpovídat vzoru regulárních výrazů                           | `"1.*2.*3"`                      |
| `custom`   | Vlastní JS funkce vrací true/false                                       | `(output) => output.length > 10` |

---

## 📖 Průvodce nastavením

### Nastavení protokolu (MCP + A2A)

<details>
<summary><b>🧩 Nastavení MCP (Model Context Protocol)</b></summary>
</details>

Spuštění MCP transportu v režimu stdio:

```bash
omniroute --mcp
```

Doporučený postup ověření:

1. Připojte svého MCP klienta přes stdio.
2. Spusťte `omniroute_get_health` .
3. Spusťte `omniroute_list_combos` .
4. Otevřete `/dashboard/mcp` pro ověření prezenčního signálu, aktivity a auditu.

Užitečná API pro automatizaci:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

<details>
<summary><b>🤝 Nastavení A2A (Agent2Agent)</b></summary>
</details>

Objevte agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Odeslat úkol:

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

- `/dashboard/a2a` pro pozorovatelnost úloh/stavů/streamů a akce kouření

<details>
<summary><b>🧪 Komplexní validace protokolu</b></summary>
</details>

Ověřte oba protokoly se skutečnými klienty:

```bash
npm run test:protocols:e2e
```

Tím se ověřuje:

- Připojení/seznam/volání klienta MCP SDK
- A2A objevování/odesílání/streamování/získávání/zrušení
- Křížová kontrola dat v auditu MCP a API pro správu úloh A2A

<details>
<summary><b>💳 Poskytovatelé předplatného</b></summary>
</details>

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

**Tip pro profesionály:** Pro složité úkoly používejte Opus, pro rychlost Sonnet. OmniRoute sleduje kvótu pro každý model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Správa limitů účtu Codex (5h + týdně)

Každý účet Codex má nyní přepínače zásad v `Dashboard -> Providers` :

- `5h` (ZAP/VYP): vynutit politiku 5hodinového prahu okna.
- `Weekly` (ZAP/VYP): vynutit zásadu týdenního prahu okna.
- Prahové chování: když povolené okno dosáhne využití &gt;=90 %, je daný účet přeskočen.
- Chování rotace: OmniRoute automaticky přesměruje na další způsobilý účet Codex.
- Chování při resetování: Po `resetAt` určité doby se účet automaticky opět stane způsobilým.

Scénáře:

- `5h ON` + `Weekly ON` : účet je přeskočen, když kterékoli z oken dosáhne prahové hodnoty.
- `5h OFF` + `Weekly ON` : účet může být zablokován pouze týdenním používáním.
- `5h ON` + `Weekly OFF` : účet může být zablokován pouze při 5hodinovém používání.
- `resetAt` passed: účet se automaticky znovu zapne (bez ručního opětovného povolení).

### Gemini CLI (ZDARMA 180 000/měsíc!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nejlepší hodnota:** Obrovská bezplatná úroveň! Použijte ji před placenými úrovněmi.

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

<details>
<summary><b>🔑 Poskytovatelé klíčů API</b></summary>
</details>

### NVIDIA NIM (BEZPLATNÝ přístup pro vývojáře — více než 70 modelů)

1. Registrace: [build.nvidia.com](https://build.nvidia.com)
2. Získejte zdarma klíč API (včetně 1000 inferenčních kreditů)
3. Ovládací panel → Přidat poskytovatele → NVIDIA NIM:
   - Klíč API: `nvapi-your-key`

**Modely:** `nvidia/llama-3.3-70b-instruct` , `nvidia/mistral-7b-instruct` a více než 50 dalších

**Tip pro profesionály:** API kompatibilní s OpenAI – funguje bez problémů s překladem formátů OmniRoute!

### Hluboké vyhledávání

1. Registrace: [platform.deepseek.com](https://platform.deepseek.com)
2. Získat klíč API
3. Ovládací panel → Přidat poskytovatele → DeepSeek

**Modely:** `deepseek/deepseek-chat` , `deepseek/deepseek-coder`

### Groq (k dispozici je bezplatná úroveň!)

1. Registrace: [console.groq.com](https://console.groq.com)
2. Získejte klíč API (včetně bezplatné úrovně)
3. Ovládací panel → Přidat poskytovatele → Groq

**Modely:** `groq/llama-3.3-70b` , `groq/mixtral-8x7b`

**Tip pro profesionály:** Ultrarychlá inference – nejlepší pro kódování v reálném čase!

### OpenRouter (100+ modelů)

1. Registrace: [openrouter.ai](https://openrouter.ai)
2. Získat klíč API
3. Ovládací panel → Přidat poskytovatele → OpenRouter

**Modely:** Získejte přístup k více než 100 modelům od všech hlavních poskytovatelů prostřednictvím jediného klíče API.

<details>
<summary><b>💰 Levní poskytovatelé (záložní)</b></summary>
</details>

### GLM-4.7 (Denní reset, 0,6 USD/1 milion)

1. Registrace: [Zhipu AI](https://open.bigmodel.cn/)
2. Získejte klíč API z kódovacího plánu
3. Nástěnka → Přidat klíč API:
   - Poskytovatel: `glm`
   - Klíč API: `your-key`

**Použití:** `glm/glm-4.7`

**Tip pro profesionály:** Programovací plán nabízí 3× kvótu za cenu 1/7! Obnovuje se denně v 10:00.

### MiniMax M2.1 (5h reset, 0,20 $/1 milion)

1. Registrace: [MiniMax](https://www.minimax.io/)
2. Získat klíč API
3. Nástěnka → Přidat klíč API

**Použití:** `minimax/MiniMax-M2.1`

**Tip pro profesionály:** Nejlevnější varianta pro dlouhý kontext (1 milion tokenů)!

### Kimi K2 (paušální poplatek 9 dolarů měsíčně)

1. Odebírat: [Moonshot AI](https://platform.moonshot.ai/)
2. Získat klíč API
3. Nástěnka → Přidat klíč API

**Použití:** `kimi/kimi-latest`

**Tip pro profesionály:** Fixních 9 $/měsíc za 10 milionů tokenů = efektivní náklady 0,90 $/1 milion!

<details>
<summary><b>🆓 BEZPLATNÍ poskytovatelé (nouzové zálohování)</b></summary>
</details>

### iFlow (5 BEZPLATNÝCH modelů přes OAuth)

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

### Qwen (4 modely ZDARMA s kódem zařízení)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude ZDARMA)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

<details>
<summary><b>🎨 Vytvořte kombinace</b></summary>
</details>

### Příklad 1: Maximalizace předplatného → Levné zálohování

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

<details>
<summary><b>🔧 Integrace s rozhraním příkazového řádku</b></summary>
</details>

### IDE kurzoru

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Pro konfiguraci jedním kliknutím použijte stránku **Nástroje CLI** na řídicím panelu nebo ručně upravte soubor `~/.claude/settings.json` .

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Možnost 1 – Dashboard (doporučeno):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Možnost 2 – Manuální úprava:** Úprava `~/.openclaw/openclaw.json` :

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

> **Poznámka:** OpenClaw funguje pouze s lokálním OmniRoute. Místo `localhost` použijte `127.0.0.1` , abyste se vyhnuli problémům s rozlišením IPv6.

### Cline / Pokračovat / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Krok 1:** Přidání OmniRoute jako vlastního poskytovatele:

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

> **Tip:** Do sekce `models` přidejte jakýkoli model dostupný ve vašem koncovém bodu OmniRoute `/v1/models` . Použijte formát `provider/model-id` z vašeho dashboardu OmniRoute.

---

## 🐛 Řešení problémů

<details>
<summary><b>Kliknutím rozbalíte průvodce řešením problémů</b></summary>
</details>

**"Jazykový model neposkytoval zprávy"**

- Kvóta poskytovatele vyčerpána → Zkontrolujte sledování kvót na řídicím panelu
- Řešení: Použijte záložní kombinovanou variantu nebo přejděte na levnější úroveň

**Omezení rychlosti**

- Kvóta předplatného vyčerpána → Přechod na GLM/MiniMax
- Přidat kombo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Platnost tokenu OAuth vypršela**

- Automaticky aktualizováno službou OmniRoute
- Pokud problémy přetrvávají: Ovládací panel → Poskytovatel → Znovu připojit

**Vysoké náklady**

- Zkontrolujte statistiky využití v sekci Nástěnka → Náklady
- Přepnout primární model na GLM/MiniMax
- Pro nekritické úlohy použijte bezplatnou úroveň (Gemini CLI, iFlow).

**Porty řídicího panelu/API jsou nesprávné**

- `PORT` je kanonický základní port (a standardně port API)
- `API_PORT` přepisuje pouze posluchač API kompatibilní s OpenAI.
- `DASHBOARD_PORT` přepisuje pouze posluchač dashboard/Next.js
- Nastavte `NEXT_PUBLIC_BASE_URL` na vaši veřejnou URL adresu řídicího panelu (pro zpětná volání OAuth)

**Chyby synchronizace s cloudem**

- Ověřte, zda `BASE_URL` odkazuje na vaši spuštěnou instanci.
- Ověřte, zda `CLOUD_URL` odkazuje na váš očekávaný cloudový koncový bod.
- Udržujte hodnoty `NEXT_PUBLIC_*` v souladu s hodnotami na straně serveru.

**První přihlášení nefunguje**

- Zkontrolujte `INITIAL_PASSWORD` v souboru `.env`
- Pokud není nastaveno, záložní heslo je `123456`

**Žádné protokoly požadavků**

- Nastavte `ENABLE_REQUEST_LOGS=true` v `.env`

**Test připojení ukazuje „Neplatné“ pro poskytovatele kompatibilní s OpenAI**

- Mnoho poskytovatelů nezpřístupňuje koncový bod `/models`
- OmniRoute v1.0.6+ zahrnuje záložní ověření pomocí dokončení chatu
- Zajistěte, aby základní URL adresa obsahovala příponu `/v1`

### 🔐 OAuth na vzdáleném serveru

<a name="oauth-on-a-remote-server"></a>

> **⚠️ Důležité pro uživatele, kteří provozují OmniRoute na VPS, Dockeru nebo jakémkoli vzdáleném serveru**

#### Proč selhává OAuth v rozhraní CLI Antigravity / Gemini na vzdálených serverech?

Poskytovatelé rozhraní CLI **Antigravity** a **Gemini** používají **Google OAuth 2.0** . Google vyžaduje, aby se `redirect_uri` v toku OAuth přesně shodoval s jedním z předregistrovaných URI v konzoli Google Cloud Console aplikace.

Přihlašovací údaje OAuth, které jsou součástí OmniRoute, jsou registrovány **pouze pro `localhost`** . Když přistupujete k OmniRoute na vzdáleném serveru (např. `https://omniroute.myserver.com` ), Google odmítne ověření pomocí:

```
Error 400: redirect_uri_mismatch
```

#### Řešení: Nakonfigurujte si vlastní přihlašovací údaje OAuth

V Google Cloud Console je potřeba vytvořit **ID klienta OAuth 2.0** s URI vašeho serveru.

#### Krok za krokem

**1. Otevřete konzoli Google Cloud**

Přejděte na: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Vytvořte nové ID klienta OAuth 2.0**

- Klikněte na **„+ Vytvořit přihlašovací údaje“** → **„ID klienta OAuth“**
- Typ aplikace: **„Webová aplikace“**
- Název: cokoli chcete (např. `OmniRoute Remote` )

**3. Přidejte autorizované URI pro přesměrování**

Do pole **„Autorizované identifikátory URI pro přesměrování“** přidejte:

```
https://your-server.com/callback
```

> Nahraďte `your-server.com` doménou nebo IP adresou vašeho serveru (v případě potřeby uveďte i port, např. `http://45.33.32.156:20128/callback` ).

**4. Uložte a zkopírujte přihlašovací údaje**

Po vytvoření Google zobrazí **ID klienta** a **tajný kód klienta** .

**5. Nastavení proměnných prostředí**

Ve vašem souboru `.env` (nebo proměnných prostředí Docker):

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

**7. Zkuste se znovu připojit**

Řídicí panel → Poskytovatelé → Antigravity (nebo Gemini CLI) → OAuth

Google nyní bude správně přesměrovávat na `https://your-server.com/callback` .

---

#### Dočasné řešení (bez vlastních přihlašovacích údajů)

Pokud si teď nechcete nastavovat vlastní přihlašovací údaje, můžete stále použít **ruční postup pro URL** :

1. OmniRoute otevírá autorizační URL od Googlu
2. Po autorizaci se Google pokusí přesměrovat na `localhost` (což selže na vzdáleném serveru).
3. **Zkopírujte celou URL adresu** z adresního řádku prohlížeče (i když se stránka nenačte)
4. Vložte tuto URL adresu do pole zobrazeného v modálním okně připojení OmniRoute.
5. Klikněte na **„Připojit“**

> To funguje, protože autorizační kód v URL adrese je platný bez ohledu na to, zda se načetla přesměrovací stránka.

---

#### Dočasné řešení (bez vlastních přihlašovacích údajů)

Chcete-li získat přístup k přihlašovacím údajům bez vlastní konfigurace, můžete použít následující postup:

1. OmniRoute otevře URL autorizace Google
2. Po autorizaci se Google pokusí přesměrovat na `localhost` (což selže na vzdáleném serveru)
3. **Zkopírujte celou URL adresu** z adresního řádku prohlížeče
4. Vložte tuto URL adresu do pole zobrazeného v modálním okně připojení OmniRoute
5. Klikněte na **„Připojit"**

> Toto řešení funguje, protože autorizační kód v URL adrese je platný bez ohledu na načtení přesměrovací stránky.

---

## 🛠️ Technologický stack

<details>
<summary><b>Kliknutím rozbalíte podrobnosti o technologickém stacku</b></summary>
</details>

- **Runtime** : Node.js 18–22 LTS (⚠️ Node.js 24+ **není podporován** — nativní binární soubory `better-sqlite3` jsou nekompatibilní)
- **Jazyk** : TypeScript 5.9 — **100% TypeScript** napříč `src/` a `open-sse/` ( `any` v základních modulech od verze 2.0)
- **Framework** : Next.js 16 + React 19 + Tailwind CSS 4
- **Databáze** : LowDB (JSON) + SQLite (stav domény + protokoly proxy + audit MCP + rozhodnutí o směrování)
- **Schémata** : Zod (validace I/O nástrojů MCP, API smlouvy)
- **Protokoly** : MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streamování** : Události odeslané serverem (SSE)
- **Autorizace** : OAuth 2.0 (PKCE) + JWT + API klíče + autorizace s rozsahem MCP
- **Testování** : Node.js test runner + Vitest (900+ testů včetně unit, integračních, E2E)
- **CI/CD** : Akce GitHubu (automatické publikování v npm + Docker Hub při vydání)
- **Webová stránka** : [omniroute.online](https://omniroute.online)
- **Balíček** : [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker** : [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Odolnost** : Jistič, exponenciální odstavení, ochrana proti hromům, falešné TLS, automatické kombinované samoopravování

---

## 📖 Dokumentace

| Dokument                                                     | Popis                                                                   |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| [Uživatelská příručka](docs/USER_GUIDE.md)                   | Poskytovatelé, kombinace, integrace CLI, nasazení                       |
| [Referenční informace k API](docs/API_REFERENCE.md)          | Všechny koncové body s příklady                                         |
| [MCP server](open-sse/mcp-server/README.md)                  | 16 nástrojů MCP, konfigurace IDE, klienti Python/TS/Go                  |
| [Server A2A](src/lib/a2a/README.md)                          | Protokol JSON-RPC 2.0, dovednosti, streamování, správa úloh             |
| [Auto-Combo Engine](docs/auto-combo.md)                      | 6faktorové bodování, balíčky režimů, samoléčba                          |
| [Odstraňování problémů](docs/TROUBLESHOOTING.md)             | Běžné problémy a jejich řešení                                          |
| [Architektura](docs/ARCHITECTURE.md)                         | Architektura a interní prvky systému                                    |
| [Přispívání](CONTRIBUTING.md)                                | Nastavení a pokyny pro vývoj                                            |
| [Specifikace OpenAPI](docs/openapi.yaml)                     | Specifikace OpenAPI 3.0                                                 |
| [Bezpečnostní zásady](SECURITY.md)                           | Hlášení zranitelností a bezpečnostní postupy                            |
| [Nasazení virtuálního počítače](docs/VM_DEPLOYMENT_GUIDE.md) | Kompletní průvodce: Nastavení virtuálního počítače + nginx + Cloudflare |
| [Galerie funkcí](docs/FEATURES.md)                           | Vizuální prohlídka řídicího panelu se snímky obrazovky                  |
| [Kontrolní seznam vydání](docs/RELEASE_CHECKLIST.md)         | Kroky ověření před vydáním                                              |

---

## 🗺️ Plán

OmniRoute má **v plánu více než 210 funkcí** v několika fázích vývoje. Zde jsou klíčové oblasti:

| Kategorie                                | Plánované funkce | Hlavní body                                                                                                              |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 🧠 **Směrování a inteligence**           | 25+              | Směrování s nejnižší latencí, směrování založené na tagech, kontrola kvót před výstupem, výběr účtu P2C                  |
| 🔒 **Zabezpečení a dodržování předpisů** | 20+              | Zpevnění SSRF, maskování přihlašovacích údajů, limit rychlosti pro každý koncový bod, stanovení rozsahu klíčů pro správu |
| 📊 **Pozorovatelnost**                   | 15+              | Integrace OpenTelemetry, sledování kvót v reálném čase, sledování nákladů podle modelu                                   |
| 🔄 **Integrace poskytovatelů**           | 20+              | Dynamický registr modelů, doba zchlazení poskytovatelů, Codex pro více účtů, analýza kvót Copilota                       |
| ⚡ **Výkon**                             | 15+              | Dvojitá vrstva mezipaměti, mezipaměť výzev, mezipaměť odpovědí, udržování streamování, dávkové API                       |
| 🌐 **Ekosystém**                         | 10+              | WebSocket API, horké opětovné načítání konfigurace, distribuované úložiště konfigurace, komerční režim                   |

### 🔜 Již brzy

- 🔗 **Integrace OpenCode** — Nativní podpora poskytovatelů pro IDE kódování s AI v OpenCode
- 🔗 **Integrace TRAE** — Plná podpora vývojového rámce TRAE pro umělou inteligenci
- 📦 **Dávkové API** — Asynchronní dávkové zpracování hromadných požadavků
- 🎯 **Směrování na základě tagů** — Směrování požadavků na základě vlastních tagů a metadat
- 💰 **Strategie nejnižších nákladů** – Automaticky vybere nejlevnějšího dostupného poskytovatele

> 📝 Úplné specifikace funkcí jsou k dispozici v [`docs/new-features/`](docs/new-features/) (217 podrobných specifikací)

---

## 👥 Přispěvatelé

[](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)![Přispěvatelé](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)

### Jak přispět

1. Vytvoření forku repozitáře
2. Vytvořte si vlastní větev feature ( `git checkout -b feature/amazing-feature` )
3. Potvrďte změny ( `git commit -m 'Add amazing feature'` )
4. Odeslat do větve ( `git push origin feature/amazing-feature` )
5. Otevřít žádost o změny (pull request)

Podrobné pokyny naleznete na [CONTRIBUTING.md](CONTRIBUTING.md) .

### Vydání nové verze

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Hvězdná historie

## Hvězdáři v průběhu času

## [](https://starchart.cc/diegosouzapw/OmniRoute)![Hvězdáři v průběhu času](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)

## 🙏 Poděkování

Zvláštní poděkování patří **[9routeru](https://github.com/decolua/9router)** od **[decolua](https://github.com/decolua)** – původnímu projektu, který inspiroval tento fork. OmniRoute staví na tomto neuvěřitelném základu s dalšími funkcemi, multimodálními API a kompletním přepsáním TypeScriptu.

Zvláštní poděkování patří **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** – původní implementaci Go, která inspirovala tento JavaScriptový port.

---

## 📄 Licence

Licence MIT - podrobnosti viz [LICENCE](LICENSE) .

---

<div align="center">
  <sub>Vytvořeno s ❤️ pro vývojáře, kteří programují 24 hodin denně, 7 dní v týdnu</sub>
  <br>
  <sub><p data-md-type="paragraph"><a href="https://omniroute.online">omniroute.online</a></p></sub>
</div>
<!-- GitHub Discussions enabled for community Q&A -->
