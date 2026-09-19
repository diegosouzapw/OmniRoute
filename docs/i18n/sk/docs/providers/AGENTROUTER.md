# AgentRouter Setup Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) je relay kompatibilný so službou Anthropic, ktorý ďalej predáva
Claude a ďalšie modely, často za nižšie ceny než priame API Anthropic. Je
navrhnutý ako priama náhrada `ANTHROPIC_BASE_URL` pre oficiálneho klienta Claude Code,
takže prijíma iba komunikáciu, ktorá zodpovedá sieťovému obrazu Claude Code (konkrétny
User-Agent, príznaky `anthropic-beta`, hlavičky SDK Stainless atď.).

## Rýchly začiatok — použite natívneho poskytovateľa `agentrouter` (odporúčané)

Pre väčšinu používateľov **nie je potrebné žiadne špeciálne nastavenie**. OmniRoute sa dodáva so vstavaným
poskytovateľom `agentrouter`, ktorý už obsahuje úplný sieťový obraz Claude Code (pozrite
`open-sse/config/providerRegistry.ts` → `agentrouter`). Ak ho chcete použiť:

1. Otvorte **Dashboard → Providers → Add Provider**.
2. Zo zoznamu vyberte **AgentRouter**.
3. Vložte svoj API kľúč `sk-...` a uložte ho.

To je všetko — žiadne premenné prostredia ani vlastný typ poskytovateľa. Medzi vstavané modely
patria `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` a
`deepseek-v3.2`.

Zvyšok tejto príručky sa venuje **pokročilému postupu**: používaniu typu poskytovateľa
`anthropic-compatible-cc-*`. Použite ho, keď potrebujete väčšiu kontrolu
nad sieťovým obrazom — napríklad pri pripájaní k iným relay službám typu AgentRouter,
ktoré ešte nie sú v natívnom registri poskytovateľov, alebo pri prepísaní
základnej URL adresy, cesty pre čet či súboru hlavičiek.

---

## Pokročilé: pripojenie prostredníctvom typu poskytovateľa kompatibilného s Claude Code

OmniRoute podporuje AgentRouter (a podobné relay služby) aj prostredníctvom typu poskytovateľa
**kompatibilného s Claude Code** (`anthropic-compatible-cc-*`), ktorý komunikuje
pomocou Anthropic Messages API so správnym sieťovým obrazom. Všeobecný poskytovateľ
`openai-compatible-chat` smerujúci na `https://agentrouter.org`
**nebude** fungovať — nadradený WAF odmietne požiadavky, ktoré nevyzerajú ako požiadavky klienta Claude
Code.

---

## Predpoklady

- Účet AgentRouter a API kľúč. Noví používatelia získajú bezplatné kredity prostredníctvom partnerského
  odkazu v súbore projektu [README](../README.md).
- Spustený OmniRoute so zapnutým príznakom funkcie `ENABLE_CC_COMPATIBLE_PROVIDER`
  (pozrite nižšie).

## 1. Povoľte typ poskytovateľa kompatibilný s CC

Typ poskytovateľa kompatibilný s Claude Code je chránený príznakom funkcie, pretože
odosiela komunikáciu, ktorá verne napodobňuje oficiálneho klienta Claude Code. Povoľte ho
nastavením premennej prostredia pred spustením OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Príklad pre Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Po reštartovaní sa na ovládacom paneli okrem existujúcich postupov kompatibilných s OpenAI a Anthropic zobrazí aj možnosť
**Add Claude Code Compatible**.

## 2. Vytvorte poskytovateľa na ovládacom paneli

1. Otvorte **Dashboard → Providers → Add Provider**.
2. Vyberte **Add Claude Code Compatible** (viditeľné iba vtedy, keď je nastavený vyššie uvedený príznak).
3. Vyplňte polia:

| Pole         | Hodnota                                                                          |
| ------------ | -------------------------------------------------------------------------------- |
| Názov        | `AgentRouter` (alebo ľubovoľný názov)                                            |
| Predpona     | `agentrouter` (zrozumiteľný alias zobrazený v protokoloch a na ovládacom paneli) |
| Základná URL | `https://agentrouter.org`                                                        |
| Cesta četu   | `/v1/messages?beta=true` (predvolená — ponechajte ju nezmenenú)                  |

> Kanonický identifikátor modelu naďalej používa úplné ID uzla poskytovateľa
> (`anthropic-compatible-cc-{uuid}/{model}`). **Predpona** je iba zobrazovaný
> alias, ktorý súbor `src/lib/usage/callLogs.ts` prekladá na čitateľnejší výstup protokolu.

4. (Voliteľné) Vložte svoj API kľúč do poľa **Validate** a kliknutím na **Check**
   overte pripojenie pred uložením.
5. Kliknite na **Add**.

Po vytvorení otvorte poskytovateľa a pridajte **Connection** s vaším API kľúčom
AgentRouter (`sk-...`). Hodnota `test_status` pripojenia by sa mala zmeniť na `active`.

## 3. Použitie prostredníctvom komba alebo priamo

Odkazujte na model pomocou prefixu poskytovateľa ako menného priestoru:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Funguje aj kanonické ID modelu `anthropic-compatible-cc-{uuid}/claude-opus-4-6`,
ktoré sa zobrazuje v databáze a konfigurácii komba.

Prípadne ho pridajte do komba na smerovanie, záložné spracovanie a správu kvót
rovnako ako ktoréhokoľvek iného poskytovateľa.

---

## Podrobnosti sieťového profilu

Pre porovnanie, most kompatibilný s cc odosiela pri každej nadradenej požiadavke
nasledujúce údaje (pozrite si `open-sse/services/claudeCodeCompatible.ts`):

| Hlavička                                             | Hodnota                                                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                      | `Bearer <api-key>`                                                                                                      |
| `User-Agent`                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                |
| `anthropic-version`                                  | `2023-06-01`                                                                                                            |
| `anthropic-beta`                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                |
| Prepínač beta funkcie redact-thinking pre pripojenie | Pridáva `redact-thinking-2026-02-12` pre nadradené služby, ktoré výslovne vyžadujú streamy s redigovaným uvažovaním     |
| Prepínač súhrnného uvažovania pre pripojenie         | Pridáva `display: "summarized"` k požiadavkám CC Compatible na uvažovanie, ktoré ešte nemajú nastavený režim zobrazenia |
| `anthropic-dangerous-direct-browser-access`          | `true`                                                                                                                  |
| `x-app`                                              | `cli`                                                                                                                   |
| `X-Stainless-*`                                      | Rôzne hlavičky súpravy Stainless SDK (jazyk, verzia balíka, OS, architektúra atď.)                                      |

Vďaka tomu môžu požiadavky prejsť cez nadradený WAF / zoznam povolených klientov.

---

## Riešenie problémov

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Vaša požiadavka
nezodpovedala sieťovému profilu Claude Code. Stáva sa to, keď je poskytovateľ
nakonfigurovaný ako `openai-compatible-chat` namiesto `anthropic-compatible-cc`
alebo keď pri spustení nebol nastavený príznak `ENABLE_CC_COMPATIBLE_PROVIDER=true`.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Neplatný token“. Sieťový profil je správny, ale kľúč API bol odmietnutý. Vygenerujte
nový kľúč na ovládacom paneli AgentRouter a aktualizujte pripojenie.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Moderovací mechanizmus AgentRouter odmietol obsah požiadavky alebo
plán kľúča nepovoľuje požadovaný model. Skúste inú výzvu alebo model; ak je
neškodná výzva opakovane blokovaná, kontaktujte podporu AgentRouter.

**`[400]: content-blocked` iba pri konkrétnych modeloch** — Väčšina plánov AgentRouter
povoľuje iba podmnožinu modelov (napr. `claude-opus-4-6`). Ostatné ID modelov
vracajú `unauthorized_client_error`, aj keď je kľúč platný. Na ovládacom paneli
AgentRouter skontrolujte, ktoré modely váš plán zahŕňa.

**`Invalid JSON response from provider (reset after Ns)` v protokoloch omniroute** —
Nadradená služba vrátila telo, ktoré nie je vo formáte JSON (zvyčajne chybovú
stránku HTML z WAF). To obyčajne znamená, že požiadavka sa nikdy nedostala do
backendu AgentRouter — znova skontrolujte, či ID poskytovateľa začína reťazcom
`anthropic-compatible-cc-` (všimnite si koncovú pomlčku — pozrite si
`CLAUDE_CODE_COMPATIBLE_PREFIX` v `open-sse/services/claudeCodeCompatible.ts`)
a či je príznak funkcie povolený.

**`unauthorized client detected` / chybová stránka HTML, hoci poskytovateľ
AgentRouter už existuje** — pravdepodobne máte **viac než jedného** poskytovateľa
AgentRouter a vaša požiadavka smeruje k nesprávnemu. Ak bol s prefixom
`agentrouter` vytvorený zvyšný ručne vytvorený poskytovateľ
`anthropic-compatible-*` (bez `cc`) alebo `openai-compatible-chat-*`, môže
vlastniť ID modelov `agentrouter/<model>` (a kombá naň môžu odkazovať podľa ID
uzla), takže prevádzka smeruje k tomuto poskytovateľovi — ktorý odosiela všeobecný
User-Agent a je odmietnutý — namiesto vstavaného poskytovateľa `agentrouter`,
ktorý už obsahuje správny sieťový profil. V protokoloch omniroute skontrolujte,
na čo sa model skutočne prekladá (značka `ROUTING` zobrazuje
`agentrouter/<model> → <providerId>/<model>`); ak `<providerId>` nie je
`agentrouter`, zjednoťte konfiguráciu na natívnom poskytovateľovi: nasmerujte kombá
na `agentrouter/<model>` (providerId `agentrouter`) a odstráňte duplicitných
kompatibilných poskytovateľov. Natívny poskytovateľ nepotrebuje žiadnu konfiguráciu
sieťového profilu ani `customUserAgent`.

---

## Pozri tiež

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Poznámky k integrácii poskytovateľa Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalóg poskytovateľov
  s bezplatnou úrovňou
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementácia prenosu obrázkov
