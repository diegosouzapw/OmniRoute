# ACP registry and registered CLI launchers (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute skiller mellom **CLI-oppdagelse**, **opprinnelig Agent Client Protocol** og
**eldre stdio-adaptere**. Det å finne en installert binærfil beviser ikke at den
er autentisert, kompatibel med modellen eller klar til å håndtere en ledetekst.

Dashbordet bruker `GET /api/acp/agents` og `POST /api/acp/agents` for inventar
og registrering av egendefinerte agenter. Dette er administrasjonsruter som kun
er lokale, ikke et offentlig API for å starte prosesser eller sende inn ledetekster.
Den interne `AcpManager` blir ikke automatisk en HTTP-reserveløsning for leverandører.

## Registrerte kontrakter

`config/cli-tools-manifest.json` er fasiten for innebygde binærfiler,
argumenter og backend-moduser for oppstart. Registeret utleder definisjonene
sine fra dette manifestet. Oppdagelse mellomlagres i 60 sekunder.

- `acp`: Gemini-kontrakten starter `gemini --experimental-acp` og kommuniserer
  med linjeskilt ACP JSON-RPC gjennom den offisielle TypeScript SDK-en.
- `stdio-adapter`: andre registrerte kontrakter beholder den eldre adapteren
  med linjebasert inndata og utdata til stdout. En periode på to sekunder uten
  utdata avslutter responsen. Denne adapteren bekrefter **ikke** opprinnelig
  ACP-støtte for disse CLI-ene.

Gemini dokumenterer oppstartsflagget i sin [CLI-referanse](https://geminicli.com/docs/cli/cli-reference/).
Klienten bruker den [offisielle ACP SDK-en](https://github.com/agentclientprotocol/typescript-sdk)
til initialisering, opprettelse av økter, ledetekstforespørsler, varsler og avbryting.

Definisjoner for egendefinerte agenter forblir administratorkontrollerte
oppstartskontrakter. Registrering av en binærfil og argumenter gir prosessen
serverbrukerens lokale kjørerettigheter; registrering er ikke en sandkasse.
Versjonskontroller godtar bare den registrerte kjørbare filen og et gjenkjent
versjonsflagg.

## Internt oppstarts-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Send bare leverandørvariablene som uttrykkelig er tilordnet denne agenten.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Bruk responsen i applikasjonen som kaller.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` finner den kjørbare filen og argumentene fra den
registrerte definisjonen. De eneste alternativene for kalleren er `cwd` og
`env`; den gamle signaturen `spawn(agentId, binary, args, env)` og overstyringer
av kjørbare filer avvises. HTTP-oppstartskontrakter støttes ikke av denne
behandleren.

Underprosessen arver de samme tillatelseslistene for operativsystem, terminal,
lokalitet og sertifikater som CLI-starterne. Server- og leverandørhemmeligheter
kopieres ikke fra det overordnede miljøet. Påloggingsopplysninger som kreves av
den valgte CLI-en, må sendes eksplisitt eller oppgis gjennom CLI-ens egen lokale
autentisering. Underprosessen har fortsatt den lokale brukerens
filsystemtillatelser og kan lese sin egen konfigurasjon.

## Opprinnelig livssyklus og begrensninger

1. Start den registrerte binærfilen, initialiser ACP og opprett en økt med den
   valgte arbeidskatalogen som rot. Initialisering har en grense på ti sekunder.
2. Send inn en ledetekst og samle inn tekstvarsler bare for den aktuelle økten.
   Fullføring bestemmes av RPC-responsen på ledeteksten, ikke av en periode uten
   utdata til stdout.
3. Bruk én tidsfrist for ledeteksten, inkludert eventuell ufullført
   initialisering; standardverdien er 120 sekunder. Samtidige ledetekster i
   samme prosess avvises.
4. Ved et opprinnelig tidsavbrudd forsøkes `session/cancel`, før prosessen
   avsluttes. Et avgrenset vindu på 100 ms lar varsler tømmes før avslutning.
5. Lukk transporttilstanden og fjern økten når initialiseringen mislykkes,
   tilkoblingen lukkes, prosessen avsluttes eller kalleren avslutter den.

Forespørsler om verktøytillatelser avvises. Ingen klientfunksjoner for filsystem
eller terminal annonseres. Disse begrensningene plasserer ikke selve
underprosessen i en sandkasse og erstatter heller ikke CLI-ens egne
autorisasjonsinnstillinger.

Både opprinnelig tekst og eldre stdout/stderr beholder maksimalt 1 MiB med tegn,
der de nyeste utdataene beholdes sammen med et varsel om avkorting. En
individuell opprinnelig ramme på ledningen er begrenset til 2 MiB med byte før
SDK-parsing. Buffere tilbakestilles for hver ledetekst.

`kill(sessionId)` sender SIGTERM og deretter SIGKILL etter fem sekunder dersom
prosessen ikke er avsluttet. Tidsavbrudd for eldre ledetekster frigjør lyttere
og tidtakere, men lar økten være tilgjengelig for en ny ledetekst. Kallere er
fortsatt ansvarlige for å bruke `kill()` eller `killAll()` når de er ferdige.

## Hendelser og inspeksjon

Behandleren sender hendelsene `stdout`, `stderr` og `exit`, hver med `sessionId`.
`sessionError` rapporterer en renset transportfeil. Kompatibilitetshendelsen
`error` sendes bare når den har en abonnent, slik at en manglende binærfil ikke
kan forårsake en ubehandlet EventEmitter-feil.

- `getSession(sessionId)` returnerer en administrert økt eller `undefined`.
- `getActiveSessions()` utelater økter som er stoppet eller er i ferd med å
  stoppe.
- `sendInput(sessionId, input)` er bare tilgjengelig for en aktiv eldre adapter;
  opprinnelig ACP avviser rå inndata for å beskytte JSON-RPC-strømmen.
- `killAll()` avslutter alle økter som administreres av den aktuelle instansen.

## Valideringsgrenser

Deterministiske testoppsett dekker den opprinnelige håndtrykkprosessen,
tekstutdata, avviste tillatelser, avbryting, samtidige ledetekster, mislykket
initialisering, prosessavslutning, utdatabegrensninger og isolering av
hemmeligheter. Eksisterende regresjoner for eldre buffere og lyttere er fortsatt
dekket. Disse testene demonstrerer ikke en aktiv Gemini-pålogging eller vellykket
slutning hos leverandøren; dette krever en separat autorisert røyktest i
målmiljøet.

## Relatert dokumentasjon

- [Agentprotokoller](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-oppstartskontrakter](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-verktøy](../reference/CLI-TOOLS.md)
- [A2A-server](./A2A-SERVER.md)
- [Skyagenter](./CLOUD_AGENT.md)
