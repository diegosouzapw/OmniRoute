# ACP registry and registered CLI launchers (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute separerar **CLI-identifiering**, **inbyggt Agent Client Protocol** och
**äldre stdio-adaptrar**. Att hitta en installerad binärfil bevisar inte dess
autentisering, modellkompatibilitet eller beredskap att hantera en prompt.

Instrumentpanelen använder `GET /api/acp/agents` och `POST /api/acp/agents` för inventering
och registrering av anpassade agenter. Dessa är lokala hanteringsrutter, inte ett
offentligt API för att starta processer eller skicka prompter. Den interna
`AcpManager` blir inte automatiskt en HTTP-reservlösning för leverantörer.

## Registrerade kontrakt

`config/cli-tools-manifest.json` är den auktoritativa källan för inbyggda
startbinärfiler, argument och backend-lägen. Registret härleder sina definitioner
från detta manifest. Identifieringen cachelagras i 60 sekunder.

- `acp`: Gemini-kontraktet startar `gemini --experimental-acp` och kommunicerar
  nyradsavgränsad ACP JSON-RPC via det officiella TypeScript-SDK:t.
- `stdio-adapter`: andra registrerade kontrakt behåller den äldre adaptern med
  nyradsindata och stdout-utdata. En två sekunder lång inaktiv period för utdata
  avslutar dess svar. Den här adaptern intygar **inte** inbyggt ACP-stöd för dessa CLI:er.

Gemini dokumenterar startflaggan i sin [CLI-referens](https://geminicli.com/docs/cli/cli-reference/).
Klienten använder [officiella ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
för initiering, skapande av sessioner, promptförfrågningar, aviseringar och avbrytning.

Definitioner av anpassade agenter förblir administratörsstyrda startkontrakt.
Registrering av en binärfil och argument ger processen serveranvändarens lokala
körningsbehörigheter; registrering är inte en sandlåda. Versionskontroller accepterar
endast den registrerade körbara filen och en identifierad versionsflagga.

## Internt start-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Skicka endast de leverantörsvariabler som avsiktligt har tilldelats den här agenten.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Använd svaret i det anropande programmet.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` hämtar den körbara filen och argumenten från den
registrerade definitionen. De enda alternativen för anroparen är `cwd` och `env`; den gamla
signaturen `spawn(agentId, binary, args, env)` och åsidosättningar av körbara filer
avvisas. HTTP-startkontrakt stöds inte av den här hanteraren.

Den underordnade processen ärver samma tillåtelselista för operativsystem, terminal,
språkinställningar och certifikat som CLI-startprogrammen. Server-/leverantörshemligheter
kopieras inte från den överordnade miljön. Autentiseringsuppgifter som behövs av vald
CLI måste skickas uttryckligen eller tillhandahållas genom CLI:ns egen lokala autentisering.
Den underordnade processen har fortfarande den lokala användarens filsystembehörigheter
och kan läsa sin egen konfiguration.

## Inbyggd livscykel och begränsningar

1. Starta den registrerade binärfilen, initiera ACP och skapa en session med
   den valda arbetskatalogen som rot. Initieringen har en gräns på tio sekunder.
2. Skicka en prompt och samla in textaviseringar endast för den sessionen.
   Slutförandet utgörs av promptens RPC-svar, inte av en period utan stdout-utdata.
3. Använd en tidsgräns för prompten som även omfattar eventuell oavslutad initiering;
   standardvärdet är 120 sekunder. Samtidiga prompter i samma process avvisas.
4. Vid en inbyggd timeout görs ett försök med `session/cancel`, varefter processen
   avslutas. Ett begränsat fönster på 100 ms låter aviseringen tömmas före avslutning.
5. Stäng transporttillståndet och ta bort sessionen när initieringen misslyckas,
   anslutningen stängs, processen avslutas eller anroparen avslutar den.

Förfrågningar om verktygsbehörighet nekas. Inga klientfunktioner för filsystem
eller terminal annonseras. Dessa begränsningar placerar inte själva den underordnade
binärfilen i en sandlåda och ersätter inte en CLI:s egna auktoriseringsinställningar.

Både inbyggd text och äldre stdout/stderr behåller högst 1 MiB tecken,
med den senaste utdatan och ett meddelande om trunkering. En enskild inbyggd
protokollram är begränsad till 2 MiB byte före SDK-tolkning. Buffertar
återställs för varje prompt.

`kill(sessionId)` skickar SIGTERM och därefter SIGKILL efter fem sekunder om processen
inte har avslutats. Tidsgränser för äldre prompter frigör lyssnare och tidtagare men lämnar
sessionen tillgänglig för ytterligare en prompt; anroparna ansvarar fortfarande för
`kill()` eller `killAll()` när de är klara.

## Händelser och inspektion

Hanteraren genererar `stdout`, `stderr` och `exit`, var och en med `sessionId`.
`sessionError` rapporterar ett sanerat transportfel. Kompatibilitetshändelsen `error`
genereras endast när den har en prenumerant, så en saknad binärfil kan inte
orsaka ett ohanterat EventEmitter-fel.

- `getSession(sessionId)` returnerar en hanterad session eller `undefined`.
- `getActiveSessions()` utesluter stoppade sessioner och sessioner som håller på att stoppas.
- `sendInput(sessionId, input)` är endast tillgänglig för en aktiv äldre adapter;
  inbyggt ACP avvisar rå indata för att skydda dess JSON-RPC-ström.
- `killAll()` avslutar alla sessioner som hanteras av den instansen.

## Valideringsgränser

Deterministiska fixturer täcker den inbyggda handskakningen, textutdata, nekade
behörigheter, avbrytning, samtidiga prompter, misslyckad initiering, processavslut,
utdatagränser och isolering av hemligheter. Befintliga regressioner för äldre buffertar/lyssnare
täcks fortfarande. Dessa tester påvisar inte en aktiv Gemini-inloggning eller en
lyckad leverantörsinferens; dessa kräver ett separat auktoriserat röktest i målmiljön.

## Relaterad dokumentation

- [Agentprotokoll](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-startkontrakt](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-verktyg](../reference/CLI-TOOLS.md)
- [A2A-server](./A2A-SERVER.md)
- [Molnagenter](./CLOUD_AGENT.md)
