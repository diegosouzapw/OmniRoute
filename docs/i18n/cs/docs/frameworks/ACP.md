# ACP registry and registered CLI launchers (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute odděluje **zjišťování CLI**, **nativní Agent Client Protocol** a
**starší adaptéry stdio**. Nalezení nainstalovaného binárního souboru nepotvrzuje
jeho autentizaci, kompatibilitu modelu ani připravenost zpracovat prompt.

Řídicí panel používá `GET /api/acp/agents` a `POST /api/acp/agents` pro inventář
a registraci vlastních agentů. Jedná se o místní trasy pro správu, nikoli o
veřejné API pro spouštění procesů nebo odesílání promptů. Interní
`AcpManager` se automaticky nestává záložním poskytovatelem HTTP.

## Registrované kontrakty

`config/cli-tools-manifest.json` je zdrojem pravdy pro integrované spouštěcí
binární soubory, argumenty a režimy backendu. Registr odvozuje své definice
z tohoto manifestu. Výsledky detekce se ukládají do mezipaměti na 60 sekund.

- `acp`: kontrakt Gemini spouští `gemini --experimental-acp` a komunikuje
  pomocí ACP JSON-RPC odděleného novými řádky prostřednictvím oficiální sady TypeScript SDK.
- `stdio-adapter`: ostatní registrované kontrakty zachovávají starší adaptér se
  vstupem odděleným novými řádky a výstupem na stdout. Dvousekundová nečinnost
  výstupu ukončí jeho odpověď. Tento adaptér **nepotvrzuje** nativní podporu ACP
  u těchto CLI.

Gemini dokumentuje spouštěcí příznak ve své [referenční příručce CLI](https://geminicli.com/docs/cli/cli-reference/).
Klient používá [oficiální sadu ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
pro inicializaci, vytváření relací, požadavky promptů, oznámení a rušení.

Definice vlastních agentů zůstávají spouštěcími kontrakty řízenými správcem.
Registrace binárního souboru a argumentů uděluje danému procesu místní oprávnění
uživatele serveru ke spouštění; registrace nepředstavuje sandbox. Kontroly verzí
přijímají pouze registrovaný spustitelný soubor a rozpoznaný příznak verze.

## Interní API pro spouštění

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Předejte pouze proměnné poskytovatele záměrně přiřazené tomuto agentovi.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Zpracujte odpověď ve volající aplikaci.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` určuje spustitelný soubor a argumenty z registrované
definice. Jedinými možnostmi volajícího jsou `cwd` a `env`; stará signatura
`spawn(agentId, binary, args, env)` a přepsání spustitelného souboru jsou
odmítnuty. Tento správce nepodporuje kontrakty spouštění přes HTTP.

Podřízený proces dědí stejný operační systém, terminál, národní prostředí a
seznam povolených certifikátů jako spouštěče CLI. Tajné údaje serveru nebo
poskytovatele se z prostředí nadřazeného procesu nekopírují. Přihlašovací údaje
vyžadované zvoleným CLI musí být předány explicitně nebo poskytnuty
prostřednictvím vlastního místního ověřování daného CLI. Podřízený proces má
nadále oprávnění místního uživatele k souborovému systému a může číst svou
vlastní konfiguraci.

## Nativní životní cyklus a omezení

1. Spusťte registrovaný binární soubor, inicializujte ACP a vytvořte relaci
   zakořeněnou ve zvoleném pracovním adresáři. Inicializace má limit deset sekund.
2. Odešlete prompt a shromažďujte textová oznámení pouze pro danou relaci.
   Dokončení určuje odpověď RPC na prompt, nikoli období nečinnosti stdout.
3. Použijte jeden časový limit promptu, který zahrnuje i případnou nedokončenou
   inicializaci; výchozí hodnota je 120 sekund. Souběžné prompty ve stejném
   procesu jsou odmítnuty.
4. Při nativním vypršení časového limitu se pokuste o `session/cancel` a proces
   ukončete. Omezené okno 100 ms umožňuje před ukončením vyprázdnit oznámení.
5. Uzavřete stav transportu a odstraňte relaci, když se inicializace nezdaří,
   spojení se uzavře, proces skončí nebo jej volající ukončí.

Požadavky na oprávnění nástrojů jsou odmítnuty. Nejsou inzerovány žádné
klientské schopnosti pro souborový systém ani terminál. Tato omezení nevytvářejí
sandbox pro samotný podřízený binární soubor ani nenahrazují vlastní nastavení
autorizace CLI.

Nativní text i starší stdout/stderr uchovávají nejvýše 1 MiB znaků, přičemž
zachovávají nejnovější výstup s upozorněním na zkrácení. Jednotlivý nativní
rámec přenosu je před zpracováním sadou SDK omezen na 2 MiB bajtů. Vyrovnávací
paměti se resetují pro každý prompt.

`kill(sessionId)` odešle SIGTERM a poté po pěti sekundách SIGKILL, pokud proces
neskončil. Vypršení časového limitu staršího promptu uvolní posluchače a časovače,
ale ponechá relaci dostupnou pro další prompt; volající jsou i nadále odpovědní
za volání `kill()` nebo `killAll()` po dokončení.

## Události a kontrola

Správce emituje `stdout`, `stderr` a `exit`, přičemž každá událost obsahuje
`sessionId`. `sessionError` hlásí sanitizovanou chybu transportu. Událost
`error` pro zpětnou kompatibilitu je emitována pouze tehdy, když má odběratele,
takže chybějící binární soubor nemůže způsobit nezpracovanou chybu EventEmitteru.

- `getSession(sessionId)` vrátí spravovanou relaci nebo `undefined`.
- `getActiveSessions()` vyloučí zastavené nebo zastavované relace.
- `sendInput(sessionId, input)` je k dispozici pouze pro aktivní starší adaptér;
  nativní ACP odmítá nezpracovaný vstup, aby chránil svůj stream JSON-RPC.
- `killAll()` ukončí všechny relace spravované danou instancí.

## Hranice validace

Deterministické testovací přípravky pokrývají nativní navázání komunikace,
textový výstup, odmítnutá oprávnění, rušení, souběžné prompty, neúspěšnou
inicializaci, ukončení procesu, limity výstupu a izolaci tajných údajů.
Stávající regrese vyrovnávacích pamětí a posluchačů staršího adaptéru zůstávají
pokryty. Tyto testy neprokazují funkční přihlášení ke Gemini ani úspěšnou
inference poskytovatele; ty vyžadují samostatně autorizovaný základní test
v cílovém prostředí.

## Související dokumentace

- [Protokoly agentů](./AGENT_PROTOCOLS_GUIDE.md)
- [Kontrakty spouštění CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Nástroje CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Cloudoví agenti](./CLOUD_AGENT.md)
