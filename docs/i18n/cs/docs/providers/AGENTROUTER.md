# AgentRouter Setup Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) je přenosová služba kompatibilní s Anthropic, která dále prodává
Claude a další modely, často za nižší ceny než přímé API Anthropic. Je
navržena jako přímá náhrada `ANTHROPIC_BASE_URL` pro oficiálního klienta Claude Code,
takže přijímá pouze provoz odpovídající komunikačnímu formátu Claude Code (konkrétní
User-Agent, příznaky `anthropic-beta`, hlavičky SDK Stainless atd.).

## Rychlý start — použijte nativního poskytovatele `agentrouter` (doporučeno)

Pro většinu uživatelů **není potřeba žádné speciální nastavení**. OmniRoute obsahuje vestavěného
poskytovatele `agentrouter`, který již zahrnuje úplný komunikační formát Claude Code (viz
`open-sse/config/providerRegistry.ts` → `agentrouter`). Chcete-li jej použít:

1. Otevřete **Řídicí panel → Poskytovatelé → Přidat poskytovatele**.
2. Ze seznamu vyberte **AgentRouter**.
3. Vložte svůj API klíč `sk-...` a uložte jej.

To je vše — žádné proměnné prostředí ani vlastní typ poskytovatele. Mezi vestavěné modely
patří `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` a
`deepseek-v3.2`.

Zbytek této příručky popisuje **pokročilý postup**: použití typu poskytovatele
`anthropic-compatible-cc-*`. Použijte jej, pokud potřebujete mít větší kontrolu
nad komunikačním formátem — například při připojování k jiným přenosovým službám ve stylu AgentRouter,
které dosud nejsou v nativním registru poskytovatelů, nebo při přepisování
základní adresy URL, cesty pro chat či sady hlaviček.

---

## Pokročilé: připojení prostřednictvím typu poskytovatele kompatibilního s Claude Code

OmniRoute podporuje AgentRouter (a podobné přenosové služby) také prostřednictvím typu poskytovatele
**kompatibilního s Claude Code** (`anthropic-compatible-cc-*`), který komunikuje pomocí
Anthropic Messages API se správným komunikačním formátem. Obecný poskytovatel
`openai-compatible-chat` odkazující na `https://agentrouter.org`
**nebude** fungovat — upstreamový WAF odmítá požadavky, které nevypadají jako požadavky klienta Claude
Code.

---

## Předpoklady

- Účet AgentRouter a API klíč. Noví uživatelé získají bezplatné kredity prostřednictvím partnerského
  odkazu v souboru [README](../README.md) projektu.
- Spuštěný OmniRoute s povoleným příznakem funkce `ENABLE_CC_COMPATIBLE_PROVIDER`
  (viz níže).

## 1. Povolte typ poskytovatele kompatibilní s CC

Typ poskytovatele kompatibilní s Claude Code je chráněn příznakem funkce, protože
odesílá provoz, který přesně napodobuje oficiálního klienta Claude Code. Povolte jej
nastavením proměnné prostředí před spuštěním OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Příklad pro Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Po restartování se na řídicím panelu vedle stávajících postupů kompatibilních s OpenAI
a Anthropic zobrazí možnost **Přidat kompatibilního s Claude Code**.

## 2. Vytvořte poskytovatele na řídicím panelu

1. Otevřete **Řídicí panel → Poskytovatelé → Přidat poskytovatele**.
2. Zvolte **Přidat kompatibilního s Claude Code** (zobrazí se pouze tehdy, když je nastaven výše uvedený příznak).
3. Vyplňte pole:

| Pole           | Hodnota                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------- |
| Název          | `AgentRouter` (nebo libovolný popisek)                                                    |
| Prefix         | `agentrouter` (uživatelsky přívětivý alias zobrazovaný v protokolech a na řídicím panelu) |
| Základní URL   | `https://agentrouter.org`                                                                 |
| Cesta pro chat | `/v1/messages?beta=true` (výchozí — ponechte beze změny)                                  |

> Kanonický identifikátor modelu stále používá úplné ID uzlu poskytovatele
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefix** je pouze zobrazovaný
> alias, který `src/lib/usage/callLogs.ts` převádí na přívětivější výstup protokolu.

4. (Volitelné) Vložte svůj API klíč do pole **Ověřit** a kliknutím na **Zkontrolovat**
   před uložením ověřte připojení.
5. Klikněte na **Přidat**.

Po vytvoření otevřete poskytovatele a přidejte **Připojení** se svým API klíčem
AgentRouter (`sk-...`). Hodnota `test_status` připojení by se měla změnit na `active`.

## 3. Použití prostřednictvím komba nebo přímo

Odkazujte na model pomocí prefixu svého poskytovatele jako jmenného prostoru:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Funguje také kanonické ID modelu `anthropic-compatible-cc-{uuid}/claude-opus-4-6`,
které se zobrazuje v databázi a konfiguraci komba.

Případně jej můžete přidat do komba pro směrování, záložní zpracování a správu kvót
stejně jako jakéhokoli jiného poskytovatele.

---

## Podrobnosti o podobě požadavků na síťové úrovni

Pro informaci: most kompatibilní s cc odesílá v každém upstreamovém požadavku
následující údaje (viz `open-sse/services/claudeCodeCompatible.ts`):

| Hlavička                                                     | Hodnota                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `Authorization`                                              | `Bearer <api-key>`                                                                                                 |
| `User-Agent`                                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                                           |
| `anthropic-version`                                          | `2023-06-01`                                                                                                       |
| `anthropic-beta`                                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                           |
| Přepínač beta verze redact-thinking pro jednotlivá připojení | Přidá `redact-thinking-2026-02-12` pro upstreamy, které výslovně vyžadují streamy s redigovaným uvažováním         |
| Přepínač souhrnného uvažování pro jednotlivá připojení       | Přidá `display: "summarized"` k požadavkům CC Compatible na uvažování, které ještě nemají nastaven režim zobrazení |
| `anthropic-dangerous-direct-browser-access`                  | `true`                                                                                                             |
| `x-app`                                                      | `cli`                                                                                                              |
| `X-Stainless-*`                                              | Různé hlavičky sady Stainless SDK (jazyk, verze balíčku, OS, architektura atd.)                                    |

Díky tomu mohou požadavky projít upstreamovým WAF / seznamem povolených klientů.

---

## Řešení problémů

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Váš požadavek
neodpovídal podobě požadavků Claude Code na síťové úrovni. K tomu dochází, když je
poskytovatel nakonfigurován jako `openai-compatible-chat` namísto
`anthropic-compatible-cc` nebo když při spuštění nebyl nastaven příznak
`ENABLE_CC_COMPATIBLE_PROVIDER=true`.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Neplatný token“. Podoba požadavku na síťové úrovni je správná, ale klíč API byl
odmítnut. Vygenerujte nový klíč na řídicím panelu AgentRouter a aktualizujte
připojení.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Moderovací mechanismus AgentRouter odmítl obsah požadavku nebo tarif
daného klíče nepovoluje požadovaný model. Zkuste jiný prompt nebo model; pokud je
nezávadný prompt opakovaně blokován, kontaktujte podporu AgentRouter.

**`[400]: content-blocked` pouze u konkrétních modelů** — Většina tarifů AgentRouter
povoluje pouze podmnožinu modelů (např. `claude-opus-4-6`). Jiná ID modelů vracejí
`unauthorized_client_error`, přestože je klíč platný. Na řídicím panelu AgentRouter
zkontrolujte, které modely váš tarif zahrnuje.

**`Invalid JSON response from provider (reset after Ns)` v protokolech omniroute** —
Upstream vrátil tělo, které není ve formátu JSON (obvykle chybovou stránku HTML z
WAF). Zpravidla to znamená, že požadavek vůbec nedorazil do backendu AgentRouter —
znovu zkontrolujte, zda ID poskytovatele začíná na `anthropic-compatible-cc-`
(všimněte si koncové pomlčky — viz `CLAUDE_CODE_COMPATIBLE_PREFIX` v
`open-sse/services/claudeCodeCompatible.ts`) a zda je funkční příznak povolen.

**`unauthorized client detected` / chybová stránka HTML, přestože poskytovatel
AgentRouter již existuje** — pravděpodobně máte **více než jednoho** poskytovatele
AgentRouter a váš požadavek je směrován na nesprávného. Pokud byl s prefixem
`agentrouter` vytvořen zbylý ručně nastavený poskytovatel
`anthropic-compatible-*` (bez `cc`) nebo `openai-compatible-chat-*`, může převzít
ID modelů `agentrouter/<model>` (a komba na něj mohou odkazovat pomocí ID uzlu),
takže je provoz směrován k tomuto poskytovateli — který odesílá obecný User-Agent
a je odmítnut — namísto vestavěného poskytovatele `agentrouter`, jenž již odesílá
správnou podobu požadavků na síťové úrovni. V protokolech omniroute zkontrolujte,
na co se model skutečně překládá (značka `ROUTING` zobrazuje
`agentrouter/<model> → <providerId>/<model>`); pokud `<providerId>` není
`agentrouter`, sjednoťte konfiguraci na nativním poskytovateli: nasměrujte komba na
`agentrouter/<model>` (providerId `agentrouter`) a odstraňte duplicitní kompatibilní
poskytovatele. Nativní poskytovatel nevyžaduje žádnou konfiguraci podoby požadavků
na síťové úrovni ani `customUserAgent`.

---

## Viz také

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Poznámky k integraci poskytovatele Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog poskytovatelů
  s bezplatnou úrovní
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementace přenosu obrázků
