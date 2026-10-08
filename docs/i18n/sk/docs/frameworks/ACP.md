# ACP registry and registered CLI launchers (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute oddeľuje **zisťovanie CLI**, **natívny Agent Client Protocol** a
**staršie adaptéry stdio**. Nájdenie nainštalovaného binárneho súboru nepotvrdzuje jeho
autentifikáciu, kompatibilitu modelu ani pripravenosť spracovať prompt.

Dashboard používa `GET /api/acp/agents` a `POST /api/acp/agents` na inventarizáciu
a registráciu vlastných agentov. Ide o lokálne správcovské trasy, nie o
verejné API na spúšťanie procesov alebo odosielanie promptov. Interný
`AcpManager` sa automaticky nestáva záložným poskytovateľom HTTP.

## Registrované kontrakty

`config/cli-tools-manifest.json` je zdrojom pravdy pre vstavané spúšťacie
binárne súbory, argumenty a režimy backendu. Register odvodzuje svoje definície
z tohto manifestu. Výsledky zisťovania sa ukladajú do vyrovnávacej pamäte na 60 sekúnd.

- `acp`: kontrakt Gemini spúšťa `gemini --experimental-acp` a komunikuje
  prostredníctvom ACP JSON-RPC oddeleného novými riadkami cez oficiálne TypeScript SDK.
- `stdio-adapter`: ostatné registrované kontrakty si zachovávajú starší adaptér
  so vstupom oddeleným novými riadkami a výstupom na stdout. Dvojsekundová nečinnosť
  výstupu ukončí jeho odpoveď. Tento adaptér **nepotvrdzuje** natívnu podporu ACP
  pre tieto CLI.

Gemini dokumentuje spúšťací príznak vo svojej [referencii CLI](https://geminicli.com/docs/cli/cli-reference/).
Klient používa [oficiálne ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
na inicializáciu, vytváranie relácií, požiadavky s promptmi, oznámenia a rušenie.

Definície vlastných agentov zostávajú spúšťacími kontraktmi riadenými správcom.
Registrácia binárneho súboru a argumentov udeľuje danému procesu lokálne
oprávnenia na vykonávanie používateľa servera; registrácia nie je sandbox.
Kontroly verzie akceptujú iba registrovaný spustiteľný súbor a rozpoznaný príznak verzie.

## Interné spúšťacie API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Odovzdajte iba premenné poskytovateľa zámerne priradené tomuto agentovi.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Spracujte odpoveď vo volajúcej aplikácii.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` vyhľadá spustiteľný súbor a argumenty z
registrovanej definície. Jediné možnosti volajúceho sú `cwd` a `env`; starý
podpis `spawn(agentId, binary, args, env)` a prepisovanie spustiteľného súboru
sú odmietnuté. Tento správca nepodporuje spúšťacie kontrakty HTTP.

Podradený proces zdedí rovnaký zoznam povolených položiek operačného systému,
terminálu, miestnych nastavení a certifikátov ako spúšťače CLI. Tajné údaje
servera alebo poskytovateľa sa z prostredia rodiča nekopírujú. Prihlasovacie
údaje vyžadované zvoleným CLI sa musia odovzdať explicitne alebo poskytnúť
prostredníctvom vlastnej lokálnej autentifikácie daného CLI. Podradený proces
má naďalej oprávnenia lokálneho používateľa k súborovému systému a môže čítať
svoju vlastnú konfiguráciu.

## Natívny životný cyklus a limity

1. Spustite registrovaný binárny súbor, inicializujte ACP a vytvorte reláciu
   ukotvenú vo vybratom pracovnom adresári. Inicializácia má limit desať sekúnd.
2. Odošlite prompt a zhromažďujte textové oznámenia iba pre danú reláciu.
   Dokončenie určuje odpoveď RPC na prompt, nie obdobie ticha na stdout.
3. Použite jeden časový limit promptu zahŕňajúci aj akúkoľvek nedokončenú
   inicializáciu; predvolená hodnota je 120 sekúnd. Súbežné prompty v rovnakom
   procese sú odmietnuté.
4. Pri prekročení natívneho časového limitu sa pokúste o `session/cancel`
   a ukončite proces. Ohraničené okno 100 ms umožní pred ukončením vyprázdniť
   oznámenia.
5. Zatvorte stav prenosu a odstráňte reláciu, keď inicializácia zlyhá, spojenie
   sa zatvorí, proces sa ukončí alebo ho volajúci ukončí.

Požiadavky na oprávnenie nástrojov sú zamietnuté. Neinzerujú sa žiadne klientske
funkcie súborového systému ani terminálu. Tieto obmedzenia neizolujú samotný
podradený binárny súbor v sandboxe ani nenahrádzajú vlastné nastavenia autorizácie CLI.

Natívny text aj staršie stdout/stderr uchovávajú najviac 1 MiB znakov, pričom
zachovávajú najnovší výstup s upozornením na skrátenie. Jednotlivý natívny rámec
na prenosovej vrstve je pred spracovaním SDK obmedzený na 2 MiB bajtov. Vyrovnávacie
pamäte sa pri každom prompte vynulujú.

`kill(sessionId)` odošle SIGTERM a potom po piatich sekundách SIGKILL, ak sa proces
neukončil. Časové limity starších promptov uvoľnia poslucháče a časovače, ale
ponechajú reláciu dostupnú pre ďalší prompt; volajúci sú po dokončení naďalej
zodpovední za volanie `kill()` alebo `killAll()`.

## Udalosti a kontrola

Správca emituje udalosti `stdout`, `stderr` a `exit`, každú s `sessionId`.
`sessionError` hlási sanitizovanú chybu prenosu. Kompatibilná udalosť `error`
sa emituje iba vtedy, keď má odberateľa, takže chýbajúci binárny súbor nemôže
spôsobiť neošetrenú chybu EventEmitter.

- `getSession(sessionId)` vráti spravovanú reláciu alebo `undefined`.
- `getActiveSessions()` vylúči zastavené alebo zastavujúce sa relácie.
- `sendInput(sessionId, input)` je dostupné iba pre aktívny starší adaptér;
  natívne ACP odmieta nespracovaný vstup, aby chránilo svoj prúd JSON-RPC.
- `killAll()` ukončí každú reláciu spravovanú danou inštanciou.

## Hranice overovania

Deterministické testovacie prípravky pokrývajú natívne nadviazanie spojenia,
textový výstup, zamietnuté oprávnenia, zrušenie, súbežné prompty, neúspešnú
inicializáciu, ukončenie procesu, limity výstupu a izoláciu tajných údajov.
Existujúce regresie vyrovnávacej pamäte a poslucháčov staršieho adaptéra zostávajú
pokryté. Tieto testy nepreukazujú funkčné prihlásenie do Gemini ani úspešnú inferenciu
poskytovateľa; tie vyžadujú samostatne autorizovaný základný test v cieľovom prostredí.

## Súvisiaca dokumentácia

- [Protokoly agentov](./AGENT_PROTOCOLS_GUIDE.md)
- [Spúšťacie kontrakty CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Nástroje CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Cloudoví agenti](./CLOUD_AGENT.md)
