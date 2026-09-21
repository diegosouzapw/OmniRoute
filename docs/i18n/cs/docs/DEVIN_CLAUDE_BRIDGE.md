# Devin Claude Bridge (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` umožňuje skutečnému běhovému prostředí Claude Code používat místní endpoint
Anthropic Messages od OmniRoute, zatímco oficiální Devin CLI poskytuje odpovědi modelu přes ACP stdio.
Nemění stávající poskytovatele Anthropic, Claude OAuth, Claude Web ani `devin-cli`.

> **Aktuální stav: připnuto na Claude Code `2.1.258`; offline a živá validace byla naposledy
> zaznamenána pro verzi `2.1.220`.** Připnutá verze `2.1.220` dokončila tři izolované scénáře prostřednictvím Devin CLI
> `3000.2.17` a modelu `swe-1-7-lightning`; tento závěrečný živý běh ověřil tahy `Read`,
> `Edit` a `Bash` řízené klientem, úspěšné výsledky `npm test`, vyhledávání projektových příkazů a dovedností,
> směrování výhradně přes Devin a nulový odchozí provoz ke službě Claude. Připnutá verze byla poté zvýšena na `2.1.258`
> (generaci CLI, za kterou se vydává identita Claude v OmniRoute, a první řadu, která nativně dodává
> úroveň Fable 5.1). U nové připnuté verze byly na připnutém základním obrazu
> ověřeny instalační vrstva a `claude --version` a sada jednotkových testů bridge, `compose config` i
> statický důkaz izolace procházejí — offline scénář s mockem a živá sada tří scénářů
> však zatím nebyly znovu spuštěny. Než se na bridge s touto připnutou verzí spolehnete, spusťte je znovu
> (viz „Aktualizace připnutých nástrojů“).

## Architektura

```text
Claude Code 2.1.258 (izolovaný linuxový kontejner bez oprávnění root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (poskytovatel ve formátu Claude, bez autentizace)
  -> devin acp --agent-type summarizer (oficiální ACP stdio, bez nástrojů Devin)
  -> účet Devin ve vyhrazeném svazku devin-auth
```

Výchozí agent ACP oficiálního CLI může spouštět vlastní nástroje, takže jej tento bridge
nepoužívá. Spouští pevně nastaveného agenta ACP `summarizer`, jehož režim oficiálního CLI nemá žádné nástroje,
a rámuje serializovaný požadavek Anthropic jako trasování provádění. Pokud je potřeba další
akce řízená Claudem, odpověď musí obsahovat přesně jednu obálku klientského nástroje. Jakýkoli ACP
`tool_call` nebo `tool_call_update` je odmítnut dříve, než lze odpověď označit za
úspěšnou.

Serializátor v `open-sse/executors/devin-agentic/serializer.ts` zachovává `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` a
nástroje poskytnuté službou Claude Code. Obrázky a neznámé bloky způsobí explicitní selhání. Velké výsledky nástrojů
používají viditelnou značku zkrácení.

Parser přijímá jednu samostatnou obálku `<tool>{...}</tool>` na jeden tah modelu. Kontroluje
název vůči seznamu nástrojů v požadavku, validuje argumenty podle JSON Schema daného nástroje,
odmítá kombinaci vyprávění a akcí a umožňuje jednu omezenou opravu. Claude Code poté
lokálně provede výsledný Anthropic `tool_use` a odešle `tool_result` zpět přes
OmniRoute.

## Izolace a model hrozeb

Instalace, účet a konfigurace Claude na hostiteli jsou mimo rozsah a považují se za
zakázané. Služby Compose:

- běží jako UID/GID `10001:10001`, se souborovým systémem root pouze pro čtení, odebranými oprávněními a
  `no-new-privileges`;
- používají soukromý adresář `/home/bridge`, vyhrazený svazek konfigurace Claude, izolovaná data OmniRoute
  a samostatný svazek `devin-auth`;
- připojují pouze pracovní prostory a důkazy z jednorázového adresáře `.sandbox`;
- nepřipojují domovský adresář hostitele, Keychain, SSH, přihlašovací údaje ke cloudovým službám ani socket Dockeru;
- sestavují explicitní prostředí a odstraňují proměnné API/OAuth/směrování Anthropic;
- směrují inferenci Claude Code pouze na `http://omniroute:20128` pomocí klíče určeného pouze pro místní použití.

Offline profil používá interní síť. V živém profilu přistupuje OmniRoute k
oficiálním endpointům Devin pouze prostřednictvím `network-guard`; nesouvisející cíle jsou zamítnuty.
Claude Code má samostatný ochranný mechanismus blokující veškerý odchozí provoz a může přistupovat pouze k místní službě OmniRoute
prostřednictvím `NO_PROXY`. Auditní soubory ochranných mechanismů jsou připojeny pouze procesem příslušného ochranného mechanismu.
Skripty před exportem důkazů bez tokenů ověřují vlastnictví souborů, režim, počet odkazů
a každé rozhodnutí.

Spusťte důkaz izolace nezávisle:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Validuje topologii, pojmenovaná připojení, nastavení běhu bez oprávnění root a pouze pro čtení, explicitní místní směrování,
nepřítomnost citlivých proměnných prostředí, nepřítomnost socketu Dockeru, blokovaný přístup k
`api.anthropic.com` a `claude.ai`, výběr poskytovatele výhradně přes Devin a explicitní selhání při
nedostupnosti backendu ACP.

## První nastavení a běžné použití

Sestavte připnutý image:

```bash
./scripts/devin-bridge/build
```

Ověřte se pouze v izolovaném svazku Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Přihlašovací příkaz používá oficiální postup s ručním tokenem určený pro vzdálená/kontejnerová prostředí. Hodnota se zadává přímo do výzvy CLI; nepředává se jako argument procesu, nezapisuje se do Gitu ani se nekopíruje z hostitele.

Spusťte izolované běhové prostředí Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` před spuštěním kontejnerizovaného Claude Code znovu ověří izolaci, autentizaci Devin a zjištění modelu. Nikdy nespouští spustitelný soubor Claude z hostitele. Aliasy modelů lze nastavit v `.env.devin-bridge`; každá nakonfigurovaná hodnota musí zachovat předponu `devin-cli-agentic/`.

## Ověřovací příkazy

Reprodukovatelný offline postup nevyžaduje účet Devin a za běhu nemá přístup k internetu:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Volitelný autentizovaný online postup je:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Online runner mezi scénáři čeká, aby neotevíral relace ACP nárazově, a místo spoléhání na textová tvrzení ověřuje strukturované události streamu Claude. Jeho tři scénáře dokazují:

1. přímé čtení projektu a analýzu vad;
2. skutečnou operaci `Edit`, klientem řízený příkaz `Bash` `npm test` a koncový výsledek;
3. zjištění `/bridge-check` a `bridge-proof`, čtení projektu, další úspěšný klientem řízený příkaz `npm test` a dokončení bez nevyřízené práce.

Závěrečná kontrola ověřuje také audit sítě Devin a vyžaduje, aby audit odchozího provozu Claude zůstal prázdný.

## Aktualizace připnutých nástrojů

Image připíná verze Node, Claude Code a Devin CLI v souboru `docker/devin-bridge/Dockerfile`. Postup aktualizace:

1. změňte explicitní verze;
2. nahraďte kontrolní součty archivů Devin specifické pro obě architektury hodnotami pro oficiální artefakt;
3. znovu sestavte image a spusťte všechny offline ověřovací příkazy;
4. potvrďte verze uvnitř image;
5. znovu spusťte autentizovanou online sadu tří scénářů.

Neinstalujte žádné z těchto CLI globálně na hostiteli ani nenahrazujte ověřování kontrolních součtů neověřeným stažením.

## Diagnostika a úklid

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  zobrazuje místní směrování a sanitizované chyby vykonavatele.
- `.sandbox/evidence/mock-acp.jsonl` zaznamenává deterministické mockované akce ACP.
- `.sandbox/evidence/claude-stream.jsonl` zaznamenává skutečný offline běh Claude Code.
- `.sandbox/evidence/live-*.jsonl` zaznamenává tři ověřené online streamy.
- `.sandbox/evidence/egress.jsonl` a `.sandbox/evidence/claude-egress.jsonl` jsou ověřené kopie auditů ochranných mechanismů bez tokenů.

Zastavte vlastněné kontejnery a sítě, ale zachovejte přihlašovací/konfigurační svazky:

```bash
./scripts/devin-bridge/clean
```

Odstraňte celé prostředí vlastněné bridgem, včetně pojmenovaných svazků:

```bash
./scripts/devin-bridge/clean --all
```

## Omezení

- Most spoléhá na pevně danou roli `summarizer` bez nástrojů, protože Devin CLI `3000.2.17`
  neposkytuje neutrálního agenta ACP bez nástrojů. Adaptér kompenzuje mezilehlé odpovědi
  ve formě shrnutí, ale i tak může jeden omezený pokus o opravu explicitně selhat.
- Živá volání ACP mohou vracet přechodné odpovědi `502`/`504`. Testovací systém rozkládá scénáře
  v čase; přetrvávající selhání zůstává v režimu fail-closed a nikdy nevybere jiného poskytovatele.
- Kontext ACP se rekonstruuje z každého požadavku Anthropic; neexistuje žádná afinita
  k procesu ani relaci.
- Pro každou odpověď modelu je podporováno jedno volání nástroje; paralelní volání jsou odmítnuta.
- Obrázky nejsou explicitně podporovány. Funkce zpracování obrazu, výstup procesu přemýšlení, řízení úsilí
  ani kontextové okno o velikosti 1M nejsou deklarovány.
- SSE používá platné události životního cyklu Anthropic, ale jsou odeslány až po shromáždění
  omezeného tahu ACP; části odpovědi ACP nejsou předávány průběžně.
