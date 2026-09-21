# Devin Claude Bridge (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` lader den rigtige Claude Code-runtime bruge OmniRoutes lokale Anthropic
Messages-slutpunkt, mens den officielle Devin CLI leverer modelsvar via ACP stdio. Den
ændrer ikke de eksisterende Anthropic-, Claude OAuth-, Claude Web- eller `devin-cli`-udbydere.

> **Aktuel status: fastlåst til Claude Code `2.1.258`; offline- og livevalidering blev senest registreret
> på `2.1.220`.** Fastlåsningen til `2.1.220` gennemførte tre isolerede scenarier via Devin CLI
> `3000.2.17` og modellen `swe-1-7-lightning`; den afsluttende livekørsel dokumenterede klientejede `Read`-,
> `Edit`- og `Bash`-handlinger, vellykkede `npm test`-resultater, registrering af projektkommandoer og
> færdigheder, routing udelukkende gennem Devin samt ingen udgående trafik til Claude. Fastlåsningen blev derefter hævet til `2.1.258`
> (den CLI-generation, som OmniRoutes Claude-identitet efterligner, og den første linje, der leverer
> Fable 5.1-niveauet direkte). Med den nye fastlåsning blev installationslaget og `claude --version`
> verificeret på det fastlåste basisimage, og broens enhedstestsuite, `compose config` samt det
> statiske isolationsbevis består — men det offline mock-scenarie og livepakken med tre scenarier
> er endnu ikke blevet kørt igen. Kør dem igen (se "Opdatering af fastlåste værktøjer"), før du benytter
> broen med denne fastlåsning.

## Arkitektur

```text
Claude Code 2.1.258 (isoleret Linux-container uden root-rettigheder)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (Claude-format, udbyder uden godkendelse)
  -> devin acp --agent-type summarizer (officiel ACP stdio, ingen Devin-værktøjer)
  -> Devin-konto i den dedikerede devin-auth-diskenhed
```

Den officielle CLI's standard-ACP-agent kan køre sine egne værktøjer, så denne bro bruger
den ikke. Den starter den faste `summarizer`-ACP-agent, hvis officielle CLI-tilstand ikke har nogen værktøjer, og
indrammer den serialiserede Anthropic-anmodning som et eksekveringsspor. Når der kræves
endnu en Claude-ejet handling, skal svaret indeholde præcis én klientværktøjskonvolut. Ethvert ACP-
`tool_call` eller `tool_call_update` afvises, før et svar kan rapporteres som
vellykket.

Serialisatoren i `open-sse/executors/devin-agentic/serializer.ts` bevarer `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` og de
værktøjer, som Claude Code leverer. Billeder og ukendte blokke medfører en eksplicit fejl. Store værktøjsresultater
bruger en synlig afkortningsmarkør.

Parseren accepterer én selvstændig `<tool>{...}</tool>`-konvolut pr. modelhandling. Den kontrollerer
navnet mod anmodningens værktøjsliste, validerer argumenter mod det pågældende værktøjs JSON
Schema, afviser blandet narrativ/handlinger og tillader ét afgrænset reparationsforsøg. Claude Code
udfører derefter den resulterende Anthropic-`tool_use` lokalt og sender `tool_result` tilbage via
OmniRoute.

## Isolation og trusselsmodel

Værtens Claude-installation, -konto og -konfiguration er uden for anvendelsesområdet og behandles som
forbudte. Compose-tjenesterne:

- kører som UID/GID `10001:10001` med et skrivebeskyttet rodfilsystem, fjernede kapabiliteter og
  `no-new-privileges`;
- bruger en privat `/home/bridge`, en dedikeret Claude-konfigurationsdiskenhed, isolerede OmniRoute-data
  og en separat `devin-auth`-diskenhed;
- monterer kun midlertidige `.sandbox`-arbejdsområder/-beviser;
- monterer ikke værtens hjemmemappe, Keychain, SSH, cloud-legitimationsoplysninger eller Docker-socket;
- konstruerer eksplicitte miljøer og fjerner Anthropic API-/OAuth-/routingvariabler;
- dirigerer kun Claude Code-inferens til `http://omniroute:20128` med en udelukkende lokal nøgle.

Offlineprofilen bruger et internt netværk. I liveprofilen når OmniRoute kun de
officielle Devin-slutpunkter gennem `network-guard`; ikke-relaterede destinationer afvises.
Claude Code har en separat udgående trafikvagt, der afviser alt, og kan kun nå den lokale OmniRoute-
tjeneste gennem `NO_PROXY`. Vagtens revisionsfiler monteres kun af deres respektive vagtprocesser.
Scripts kontrollerer filejerskab, tilstand, antal links og enhver beslutning, før
tokenfrit bevis eksporteres.

Kør isolationsbeviset separat:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Det validerer topologi, navngivne monteringer, indstillinger uden root og med skrivebeskyttelse, eksplicit lokal routing,
fravær af følsomme miljøvariabler, fravær af Docker-socket, blokeret adgang til
`api.anthropic.com` og `claude.ai`, udbydervalg udelukkende gennem Devin samt eksplicit fejl, når
ACP-backenden ikke er tilgængelig.

## Førstegangsopsætning og normal brug

Byg det fastlåste image:

```bash
./scripts/devin-bridge/build
```

Godkend kun den isolerede Devin-volume:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Loginkommandoen bruger det officielle manuelle tokenflow, der er beregnet til fjern-/container-
miljøer. Værdien indtastes direkte i CLI-prompten; den overføres ikke som et
procesargument, skrives til Git eller kopieres fra værten.

Start det isolerede Claude Code-runtime-miljø:

```bash
./scripts/devin-bridge/launch
```

`launch` kontrollerer isolation, Devin-godkendelse og modelregistrering igen, før det
containeriserede Claude Code startes. Det kører aldrig værtens eksekverbare Claude-fil. Modelaliasser kan
angives i `.env.devin-bridge`; hver konfigureret værdi skal beholde
præfikset `devin-cli-agentic/`.

## Valideringskommandoer

Den reproducerbare offlinefremgangsmåde kræver ingen Devin-konto og har ingen internetadgang under kørsel:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Den godkendte, aktivt tilvalgte livefremgangsmåde er:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Livekørslen venter mellem scenarierne for at undgå at åbne ACP-sessioner i en serie og
validerer strukturerede Claude-streamhændelser i stedet for at stole på tekstpåstande. De tre
scenarier beviser:

1. direkte læsning af projektet og fejlanalyse;
2. en reel `Edit`, en klientejet `Bash`-`npm test` og et terminalresultat;
3. `/bridge-check` samt registrering af `bridge-proof`, læsning af projektet, endnu en vellykket
   klientejet `npm test` og fuldførelse uden afventende arbejde.

Den afsluttende kontrol kontrollerer også Devins netværksrevision og kræver, at Claudes udgående
trafikrevision forbliver tom.

## Opdatering af fastlåste værktøjer

Imaget fastlåser Node, Claude Code og Devin CLI i
`docker/devin-bridge/Dockerfile`. Sådan opdateres de:

1. rediger de eksplicitte versioner;
2. erstat begge arkitekturspecifikke kontrolsummer for Devin-arkivet med værdier for den officielle
   artefakt;
3. byg igen, og kør alle offlinevalideringskommandoer;
4. bekræft versionerne i imaget;
5. kør den godkendte livepakke med tre scenarier igen.

Installer ikke nogen af CLI'erne globalt på værten, og erstat ikke kontrolsumverificering med en
uverificeret download.

## Diagnosticering og oprydning

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  viser lokal routing og rensede eksekveringsfejl.
- `.sandbox/evidence/mock-acp.jsonl` registrerer deterministiske simulerede ACP-handlinger.
- `.sandbox/evidence/claude-stream.jsonl` registrerer den reelle offlinekørsel af Claude Code.
- `.sandbox/evidence/live-*.jsonl` registrerer de tre validerede livestreams.
- `.sandbox/evidence/egress.jsonl` og `.sandbox/evidence/claude-egress.jsonl` er validerede,
  tokenfri kopier af kontrolrevisionerne.

Stop ejede containere og netværk, mens login-/konfigurationsvolumener bevares:

```bash
./scripts/devin-bridge/clean
```

Fjern hele det broejede miljø, herunder navngivne volumener:

```bash
./scripts/devin-bridge/clean --all
```

## Begrænsninger

- Broen er afhængig af den faste `summarizer`-rolle uden værktøjer, fordi Devin CLI `3000.2.17`
  ikke stiller en neutral ACP-agent uden værktøjer til rådighed. Adapteren kompenserer for
  opsummeringsformede mellemliggende svar, men én afgrænset reparation kan stadig fejle eksplicit.
- Direkte ACP-kald kan returnere midlertidige `502`/`504`-svar. Testsystemet fordeler scenarierne;
  vedvarende fejl håndteres fortsat efter fail-closed-princippet, og der vælges aldrig en anden udbyder.
- ACP-konteksten rekonstrueres ud fra hver Anthropic-anmodning; der er ingen proces-/sessionstilknytning.
- Ét værktøjskald understøttes pr. modelsvar; parallelle kald afvises.
- Billeder understøttes eksplicit ikke. Billedforståelse, ræsonneringsoutput, indsatsstyring og et
  kontekstvindue på 1M annonceres ikke.
- SSE bruger gyldige Anthropic-livscyklushændelser, men udsendes først, efter at den afgrænsede
  ACP-runde er indsamlet; ACP-segmenter videresendes ikke løbende.
