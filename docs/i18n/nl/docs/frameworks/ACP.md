# ACP registry and registered CLI launchers (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute maakt onderscheid tussen **CLI-detectie**, het **native Agent Client Protocol** en
**verouderde stdio-adapters**. Het vinden van een geïnstalleerd binair bestand bewijst niet dat
de authenticatie is geslaagd, dat modellen compatibel zijn of dat het gereed is om een prompt te verwerken.

Het dashboard gebruikt `GET /api/acp/agents` en `POST /api/acp/agents` voor inventarisatie
en registratie van aangepaste agents. Dit zijn uitsluitend lokale beheerroutes, geen
openbare API voor het starten van processen of indienen van prompts. De interne
`AcpManager` wordt niet automatisch een fallback voor HTTP-providers.

## Geregistreerde contracten

`config/cli-tools-manifest.json` is de gezaghebbende bron voor ingebouwde uitvoerbare
bestanden, argumenten en backendmodi. Het register leidt zijn definities af
uit dat manifest. Detectie wordt 60 seconden gecachet.

- `acp`: het Gemini-contract start `gemini --experimental-acp` en communiceert
  via door nieuwe regels gescheiden ACP JSON-RPC met behulp van de officiële TypeScript-SDK.
- `stdio-adapter`: andere geregistreerde contracten behouden de verouderde adapter met invoer
  per regel en uitvoer via stdout. Een inactiviteitsperiode van twee seconden voor de uitvoer beëindigt de respons.
  Deze adapter bevestigt **geen** native ACP-ondersteuning voor die CLI's.

Gemini documenteert de startvlag in de [CLI-referentie](https://geminicli.com/docs/cli/cli-reference/).
De client gebruikt de [officiële ACP-SDK](https://github.com/agentclientprotocol/typescript-sdk)
voor initialisatie, het aanmaken van sessies, promptaanvragen, meldingen en annulering.

Definities van aangepaste agents blijven door de beheerder gecontroleerde startcontracten.
Het registreren van een binair bestand en argumenten geeft dat proces de lokale
uitvoeringsrechten van de servergebruiker; registratie vormt geen sandbox. Versiecontroles accepteren
alleen het geregistreerde uitvoerbare bestand en een herkende versievlag.

## Interne start-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Geef alleen de providervariabelen door die bewust aan deze agent zijn toegewezen.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Leg dit project uit", 120_000);
  // Verwerk de respons in de aanroepende toepassing.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` bepaalt het uitvoerbare bestand en de argumenten aan de hand van de
geregistreerde definitie. De enige opties voor de aanroeper zijn `cwd` en `env`; de oude
signatuur `spawn(agentId, binary, args, env)` en overschrijvingen van het uitvoerbare bestand worden
geweigerd. HTTP-startcontracten worden niet door deze manager ondersteund.

Het childproces erft dezelfde toestemmingslijst voor het besturingssysteem, de terminal, de landinstelling en certificaten
als de CLI-launchers. Server-/providergeheimen worden niet vanuit de
bovenliggende omgeving gekopieerd. Referenties die de gekozen CLI nodig heeft, moeten
expliciet worden doorgegeven of via de eigen lokale authenticatie van die CLI worden verstrekt. Het childproces
behoudt de bestandssysteemrechten van de lokale gebruiker en kan zijn eigen configuratie lezen.

## Native levenscyclus en limieten

1. Start het geregistreerde uitvoerbare bestand, initialiseer ACP en maak een sessie aan met
   de geselecteerde werkmap als hoofdmap. Initialisatie heeft een limiet van tien seconden.
2. Dien een prompt in en verzamel uitsluitend tekstmeldingen voor die sessie.
   Voltooiing wordt bepaald door de RPC-respons op de prompt, niet door een periode zonder stdout-uitvoer.
3. Gebruik één deadline voor de prompt, inclusief eventuele onvoltooide initialisatie; de standaardwaarde
   is 120 seconden. Gelijktijdige prompts binnen hetzelfde proces worden geweigerd.
4. Probeer bij een native time-out `session/cancel` uit te voeren en beëindig het proces. Een
   begrensd venster van 100 ms laat de melding leegstromen voordat het proces wordt beëindigd.
5. Sluit de transportstatus en verwijder de sessie wanneer initialisatie mislukt, de
   verbinding wordt gesloten, het proces stopt of de aanroeper het beëindigt.

Aanvragen voor toolrechten worden geweigerd. Er worden geen clientmogelijkheden voor het
bestandssysteem of de terminal geadverteerd. Deze beperkingen plaatsen het binaire childproces
zelf niet in een sandbox en vervangen evenmin de eigen autorisatie-instellingen van een CLI.

Zowel native tekst als verouderde stdout/stderr behouden maximaal 1 MiB aan tekens,
waarbij de nieuwste uitvoer samen met een afkappingsmelding wordt bewaard. Een afzonderlijk native
wireframe is vóór verwerking door de SDK beperkt tot 2 MiB aan bytes. Buffers worden per prompt opnieuw ingesteld.

`kill(sessionId)` verzendt SIGTERM en vervolgens na vijf seconden SIGKILL als het proces
nog niet is gestopt. Time-outs van verouderde prompts geven listeners en timers vrij, maar laten
de sessie beschikbaar voor een volgende prompt; aanroepers blijven verantwoordelijk voor
`kill()` of `killAll()` wanneer ze klaar zijn.

## Gebeurtenissen en inspectie

De manager emitteert `stdout`, `stderr` en `exit`, elk met `sessionId`.
`sessionError` rapporteert een opgeschoonde transportfout. De compatibiliteitsgebeurtenis `error`
wordt alleen geëmitteerd wanneer deze een abonnee heeft, zodat een ontbrekend binair bestand
geen onverwerkte EventEmitter-fout kan veroorzaken.

- `getSession(sessionId)` retourneert een beheerde sessie of `undefined`.
- `getActiveSessions()` sluit gestopte of stoppende sessies uit.
- `sendInput(sessionId, input)` is alleen beschikbaar voor een actieve verouderde adapter;
  native ACP weigert onbewerkte invoer om de JSON-RPC-stream te beschermen.
- `killAll()` beëindigt elke sessie die door die instantie wordt beheerd.

## Validatiegrenzen

Deterministische fixtures dekken de native handshake, tekstuitvoer, geweigerde
rechten, annulering, gelijktijdige prompts, mislukte initialisatie, procesbeëindiging,
uitvoerlimieten en geheimisolatie. Bestaande regressies voor verouderde buffers/listeners
blijven gedekt. Deze tests tonen geen actieve Gemini-aanmelding of geslaagde
providerinferentie aan; daarvoor is een afzonderlijk geautoriseerde smoketest
in de doelomgeving vereist.

## Gerelateerde documentatie

- [Agentprotocollen](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-startcontracten](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-tools](../reference/CLI-TOOLS.md)
- [A2A-server](./A2A-SERVER.md)
- [Cloudagents](./CLOUD_AGENT.md)
