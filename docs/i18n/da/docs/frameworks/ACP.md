# ACP registry and registered CLI launchers (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute adskiller **CLI-registrering**, **oprindelig Agent Client Protocol** og
**ældre stdio-adaptere**. At finde en installeret binær fil beviser ikke dens
godkendelse, modelkompatibilitet eller parathed til at håndtere en prompt.

Dashboardet bruger `GET /api/acp/agents` og `POST /api/acp/agents` til oversigten
og registrering af brugerdefinerede agenter. Disse er administrationsruter, der
kun er lokale, og ikke en offentlig API til at starte processer eller indsende
prompter. Den interne `AcpManager` bliver ikke automatisk en reserveudbyder for
HTTP.

## Registrerede kontrakter

`config/cli-tools-manifest.json` er den autoritative kilde til indbyggede
startbinære filer, argumenter og backendtilstande. Registret udleder sine
definitioner fra dette manifest. Registreringen caches i 60 sekunder.

- `acp`: Gemini-kontrakten starter `gemini --experimental-acp` og kommunikerer
  med linjeafgrænset ACP JSON-RPC via det officielle TypeScript SDK.
- `stdio-adapter`: andre registrerede kontrakter bevarer den ældre adapter med
  linjebaseret input og stdout-output. En periode på to sekunder uden output
  afslutter dens svar. Denne adapter certificerer **ikke** oprindelig
  ACP-understøttelse for disse CLI'er.

Gemini dokumenterer startflaget i sin [CLI-reference](https://geminicli.com/docs/cli/cli-reference/).
Klienten bruger det [officielle ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
til initialisering, sessionsoprettelse, promptanmodninger, notifikationer og annullering.

Definitioner af brugerdefinerede agenter forbliver administratorstyrede
startkontrakter. Registrering af en binær fil og argumenter giver den pågældende
proces serverbrugerens lokale kørselsrettigheder; registrering er ikke en
sandbox. Versionskontroller accepterer kun den registrerede eksekverbare fil og
et genkendt versionsflag.

## Intern start-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Videregiv kun de udbydervariabler, der bevidst er tildelt denne agent.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Forklar dette projekt", 120_000);
  // Behandl svaret i den kaldende applikation.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` finder den eksekverbare fil og argumenterne fra den
registrerede definition. De eneste indstillinger for kaldende kode er `cwd` og
`env`; den gamle signatur `spawn(agentId, binary, args, env)` og tilsidesættelser
af den eksekverbare fil afvises. HTTP-startkontrakter understøttes ikke af denne
manager.

Underprocessen arver de samme tilladelseslister for operativsystem, terminal,
landestandard og certifikater som CLI-starterne. Server-/udbyderhemmeligheder
kopieres ikke fra den overordnede proces' miljø. Legitimationsoplysninger, der
kræves af den valgte CLI, skal videregives eksplicit eller leveres via den
pågældende CLI's egen lokale godkendelse. Underprocessen har stadig den lokale
brugers filsystemrettigheder og kan læse sin egen konfiguration.

## Oprindelig livscyklus og begrænsninger

1. Start den registrerede binære fil, initialiser ACP, og opret en session med
   den valgte arbejdsmappe som rod. Initialiseringen har en grænse på ti sekunder.
2. Indsend en prompt, og indhent kun tekstnotifikationer for den pågældende
   session. Fuldførelse er svaret fra prompt-RPC'en, ikke en periode uden output
   på stdout.
3. Brug én promptfrist, inklusive eventuel uafsluttet initialisering;
   standardværdien er 120 sekunder. Samtidige prompter i samme proces afvises.
4. Ved oprindelig timeout forsøges `session/cancel`, hvorefter processen
   afsluttes. Et begrænset vindue på 100 ms giver notifikationen mulighed for at
   blive sendt før afslutning.
5. Luk transporttilstanden, og fjern sessionen, når initialiseringen mislykkes,
   forbindelsen lukkes, processen afsluttes, eller den kaldende kode afslutter den.

Anmodninger om værktøjstilladelser afvises. Der annonceres ingen klientfunktioner
for filsystem eller terminal. Disse begrænsninger placerer ikke selve
underprocessens binære fil i en sandbox og erstatter ikke en CLI's egne
godkendelsesindstillinger.

Både oprindelig tekst og ældre stdout/stderr beholder højst 1 MiB tegn og
bevarer det nyeste output med en besked om afkortning. En individuel oprindelig
wire-frame er begrænset til 2 MiB bytes før SDK-fortolkning. Buffere nulstilles
for hver prompt.

`kill(sessionId)` sender SIGTERM og derefter SIGKILL efter fem sekunder, hvis
processen ikke er afsluttet. Timeout for ældre prompter frigiver lyttere og
timere, men lader sessionen være tilgængelig for en ny prompt; den kaldende kode
er fortsat ansvarlig for `kill()` eller `killAll()`, når den er færdig.

## Hændelser og inspektion

Manageren udsender `stdout`, `stderr` og `exit`, hver med `sessionId`.
`sessionError` rapporterer en renset transportfejl. Kompatibilitetshændelsen
`error` udsendes kun, når den har en abonnent, så en manglende binær fil ikke kan
forårsage en uhåndteret EventEmitter-fejl.

- `getSession(sessionId)` returnerer en administreret session eller `undefined`.
- `getActiveSessions()` udelukker stoppede sessioner eller sessioner under stop.
- `sendInput(sessionId, input)` er kun tilgængelig for en aktiv ældre adapter;
  oprindelig ACP afviser råt input for at beskytte sin JSON-RPC-strøm.
- `killAll()` afslutter alle sessioner, der administreres af den pågældende instans.

## Valideringsgrænser

Deterministiske test-fixtures dækker den oprindelige handshake, tekstoutput,
afviste tilladelser, annullering, samtidige prompter, mislykket initialisering,
procesafslutning, outputgrænser og isolering af hemmeligheder. Eksisterende
regressioner for ældre buffere/lyttere er fortsat dækket. Disse tests påviser
ikke et aktivt Gemini-login eller en vellykket udbyderinferens; det kræver en
separat godkendt smoke-test i målmiljøet.

## Relateret dokumentation

- [Agentprotokoller](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-startkontrakter](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-værktøjer](../reference/CLI-TOOLS.md)
- [A2A-server](./A2A-SERVER.md)
- [Cloud-agenter](./CLOUD_AGENT.md)
