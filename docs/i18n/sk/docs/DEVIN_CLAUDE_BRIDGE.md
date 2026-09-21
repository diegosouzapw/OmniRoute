# Devin Claude Bridge (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` umožňuje skutočnému runtime Claude Code používať lokálny koncový bod Anthropic
Messages služby OmniRoute, zatiaľ čo oficiálne Devin CLI poskytuje odpovede modelu cez ACP stdio.
Nemení existujúce poskytovatele Anthropic, Claude OAuth, Claude Web ani `devin-cli`.

> **Aktuálny stav: pripnutý Claude Code `2.1.258`; offline a živé overenie bolo naposledy
> zaznamenané vo verzii `2.1.220`.** Pripnutá verzia `2.1.220` úspešne dokončila tri izolované scenáre prostredníctvom Devin CLI
> `3000.2.17` a modelu `swe-1-7-lightning`; tento záverečný živý beh preukázal klientom riadené kroky `Read`,
> `Edit` a `Bash`, úspešné výsledky `npm test`, rozpoznanie projektových príkazov a zručností,
> smerovanie výlučne cez Devin a nulovú odchádzajúcu komunikáciu s Claude. Pripnutá verzia bola následne zvýšená na `2.1.258`
> (generáciu CLI, za ktorú sa vydáva identita Claude služby OmniRoute, a prvú vetvu, ktorá natívne obsahuje
> úroveň Fable 5.1). Pri novej pripnutej verzii bola na pripnutom základnom obraze overená
> inštalačná vrstva aj `claude --version` a prechádza sada jednotkových testov mosta, `compose config` aj
> statický dôkaz izolácie — offline simulovaný scenár ani živá sada troch scenárov však
> zatiaľ neboli spustené znova. Pred použitím mosta s touto pripnutou verziou ich spustite znova
> (pozrite si časť „Aktualizácia pripnutých nástrojov“).

## Architektúra

```text
Claude Code 2.1.258 (izolovaný linuxový kontajner bez oprávnení root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (poskytovateľ vo formáte Claude, bez autentifikácie)
  -> devin acp --agent-type summarizer (oficiálne ACP stdio, bez nástrojov Devin)
  -> účet Devin vo vyhradenom zväzku devin-auth
```

Predvolený agent ACP oficiálneho CLI môže spúšťať vlastné nástroje, preto ho tento most
nepoužíva. Spúšťa pevne nastaveného agenta ACP `summarizer`, ktorého režim oficiálneho CLI
nemá žiadne nástroje, a serializovanú požiadavku Anthropic rámcuje ako záznam vykonávania.
Ak je potrebná ďalšia akcia riadená Claude, odpoveď musí obsahovať presne jednu obálku
klientskeho nástroja. Každý `tool_call` alebo `tool_call_update` ACP je odmietnutý skôr, než
možno odpoveď označiť za úspešnú.

Serializátor v `open-sse/executors/devin-agentic/serializer.ts` zachováva `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` a nástroje
poskytnuté službou Claude Code. Obrázky a neznáme bloky explicitne zlyhajú. Veľké výsledky
nástrojov používajú viditeľnú značku skrátenia.

Parser prijíma jednu samostatnú obálku `<tool>{...}</tool>` pre každý krok modelu. Overuje
názov voči zoznamu nástrojov požiadavky, validuje argumenty podľa schémy JSON daného
nástroja, odmieta kombináciu opisného textu a akcií a povoľuje jednu ohraničenú opravu.
Claude Code následne lokálne vykoná výsledný Anthropic `tool_use` a odošle `tool_result`
späť cez OmniRoute.

## Izolácia a model hrozieb

Inštalácia, účet a konfigurácia Claude na hostiteľovi sú mimo rozsahu a považujú sa za
zakázané. Služby Compose:

- bežia s UID/GID `10001:10001`, koreňovým súborovým systémom iba na čítanie, odobratými
  oprávneniami a nastavením `no-new-privileges`;
- používajú súkromný adresár `/home/bridge`, vyhradený zväzok konfigurácie Claude, izolované
  údaje OmniRoute a samostatný zväzok `devin-auth`;
- pripájajú iba jednorazové pracovné priestory/dôkazy `.sandbox`;
- nepripájajú domovský adresár hostiteľa, Keychain, SSH, cloudové prihlasovacie údaje ani
  soket Docker;
- vytvárajú explicitné prostredia a odstraňujú premenné API/OAuth/smerovania služby Anthropic;
- smerujú inferenciu Claude Code iba na `http://omniroute:20128` pomocou kľúča určeného len
  na lokálne použitie.

Offline profil používa internú sieť. V živom profile OmniRoute pristupuje k oficiálnym
koncovým bodom Devin iba prostredníctvom `network-guard`; nesúvisiace cieľové adresy sú
odmietnuté. Claude Code má samostatnú ochranu blokujúcu všetku odchádzajúcu komunikáciu a
cez `NO_PROXY` môže pristupovať iba k lokálnej službe OmniRoute. Súbory auditu ochranných
procesov pripája iba príslušný ochranný proces. Skripty pred exportom dôkazov bez tokenov
overujú vlastníctvo súborov, režim, počet odkazov a každé rozhodnutie.

Dôkaz izolácie spustite nezávisle:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Overuje topológiu, pomenované pripojenia, nastavenia bez oprávnení root/iba na čítanie,
explicitné lokálne smerovanie, neprítomnosť citlivých premenných prostredia, neprítomnosť
soketu Docker, zablokovaný prístup k `api.anthropic.com` a `claude.ai`, výber poskytovateľa
výlučne Devin a explicitné zlyhanie pri nedostupnosti backendu ACP.

## Prvé nastavenie a bežné používanie

Zostavte pripnutý obraz:

```bash
./scripts/devin-bridge/build
```

Autentifikujte iba izolovaný zväzok Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Prihlasovací príkaz používa oficiálny postup s manuálnym tokenom určený pre vzdialené/kontajnerové
prostredia. Hodnota sa zadáva priamo do výzvy CLI; neodovzdáva sa ako
argument procesu, nezapisuje sa do systému Git ani sa nekopíruje z hostiteľského systému.

Spustite izolované runtime prostredie Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` pred spustením kontajnerizovaného Claude Code opätovne skontroluje izoláciu, autentifikáciu Devin
a zisťovanie modelov. Nikdy nespúšťa spustiteľný súbor Claude hostiteľského systému. Aliasy modelov možno
nastaviť v `.env.devin-bridge`; každá nakonfigurovaná hodnota musí zachovať
prefix `devin-cli-agentic/`.

## Validačné príkazy

Reprodukovateľný offline postup nevyžaduje účet Devin a počas behu nepotrebuje internet:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Voliteľný autentifikovaný postup v živom prostredí je:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Nástroj na spustenie živých testov čaká medzi scenármi, aby sa relácie ACP neotvárali nárazovo,
a namiesto spoliehania sa na textové tvrdenia overuje štruktúrované udalosti prúdu Claude. Jeho tri
scenáre preukazujú:

1. priame čítanie projektu a analýzu chýb;
2. skutočnú operáciu `Edit`, klientom riadený príkaz `Bash` `npm test` a konečný výsledok;
3. zisťovanie `/bridge-check` spolu s `bridge-proof`, čítanie projektu, ďalší úspešný
   klientom riadený príkaz `npm test` a dokončenie bez čakajúcej práce.

Záverečná kontrola overuje aj audit siete Devin a vyžaduje, aby audit odchádzajúcej komunikácie Claude
zostal prázdny.

## Aktualizácia pripnutých nástrojov

Obraz pripína Node, Claude Code a Devin CLI v súbore
`docker/devin-bridge/Dockerfile`. Postup aktualizácie:

1. zmeňte explicitné verzie;
2. nahraďte kontrolné súčty archívu Devin pre obe konkrétne architektúry hodnotami pre oficiálny
   artefakt;
3. znova zostavte obraz a spustite každý offline validačný príkaz;
4. potvrďte verzie v obraze;
5. znova spustite autentifikovaný živý balík troch scenárov.

Neinštalujte žiadne z týchto CLI globálne v hostiteľskom systéme ani nenahrádzajte overovanie kontrolných súčtov
neovereným sťahovaním.

## Diagnostika a čistenie

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  zobrazuje lokálne smerovanie a sanitizované chyby vykonávacieho modulu.
- `.sandbox/evidence/mock-acp.jsonl` zaznamenáva deterministické simulované akcie ACP.
- `.sandbox/evidence/claude-stream.jsonl` zaznamenáva skutočný offline beh Claude Code.
- `.sandbox/evidence/live-*.jsonl` zaznamenáva tri overené živé prúdy.
- `.sandbox/evidence/egress.jsonl` a `.sandbox/evidence/claude-egress.jsonl` sú overené
  kópie auditov ochranných mechanizmov bez tokenov.

Zastavte vlastnené kontajnery a siete, pričom zachováte prihlasovacie/konfiguračné zväzky:

```bash
./scripts/devin-bridge/clean
```

Odstráňte celé prostredie vlastnené mostom vrátane pomenovaných zväzkov:

```bash
./scripts/devin-bridge/clean --all
```

## Obmedzenia

- Most sa spolieha na pevnú rolu `summarizer` bez nástrojov, pretože Devin CLI `3000.2.17`
  neposkytuje neutrálneho agenta ACP bez nástrojov. Adaptér kompenzuje priebežné odpovede
  vo forme súhrnu, ale jedna obmedzená oprava môže aj tak explicitne zlyhať.
- Živé volania ACP môžu vracať prechodné odpovede `502`/`504`. Testovací nástroj rozdeľuje
  scenáre v čase; pretrvávajúce zlyhanie zostáva v režime fail-closed a nikdy nevyberie
  iného poskytovateľa.
- Kontext ACP sa rekonštruuje z každej požiadavky Anthropic; neexistuje afinita
  k procesu/relácii.
- Pre každú odpoveď modelu je podporované jedno volanie nástroja; paralelné volania sú
  odmietnuté.
- Obrázky explicitne nie sú podporované. Schopnosti videnia, výstup uvažovania, ovládanie
  úsilia a kontextové okno s veľkosťou 1M sa neinzerujú.
- SSE používa platné udalosti životného cyklu Anthropic, ale odosiela sa až po zhromaždení
  obmedzeného ťahu ACP; časti ACP sa nepreposielajú priebežne.
