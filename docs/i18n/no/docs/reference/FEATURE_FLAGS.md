# Feature Flags (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> Kjøretidsbrytere som endrer OmniRoutes oppførsel **uten ny utrulling**.
> Alle flaggene som er oppført her, er definert i
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — den eneste autoritative kilden. Både kontrollpanelet og REST-API-et leser fra
> denne filen, så tabellen nedenfor er generert for å samsvare 1:1 med den.

---

## Hva funksjonsflagg er

Et funksjonsflagg er en navngitt bryter (boolsk verdi eller enum) som kan endres
under kjøring og lagres i databasen, uten at prosessen må rulles ut på nytt. Hvert
flagg beskrives av en `FeatureFlagDefinition` med en `key`, `label`,
`description`, `category`, `defaultValue`, `type` og et `requiresRestart`-hint.

### Rekkefølge for verdioppslag

Den **gjeldende verdien** til et flagg fastsettes av
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) med denne
prioritetsrekkefølgen (høyeste prioritet vinner):

1. **Databaseoverstyring** — en verdi lagret i `key_value`-tabellen under
   navnerommet `feature_flags` (angitt via kontrollpanelet eller REST-API-et).
2. **Miljøvariabel** — `process.env[<KEY>]`, hvis den er angitt og ikke er tom.
3. **Definisjonens standardverdi** — `defaultValue` fra `featureFlagDefinitions.ts`.

Et boolsk flagg anses som **aktivert** når den gjeldende verdien er `"true"`,
`"1"` eller `"yes"` (se `isFeatureFlagEnabled()`).

> [!NOTE]
> De fleste flagg har også en tilsvarende miljøvariabel med **samme navn**,
> dokumentert i [`ENVIRONMENT.md`](./ENVIRONMENT.md). Flaggverdien fra databasen
> har prioritet over denne miljøvariabelen. Et flagg med
> `requiresRestart: true` lagres umiddelbart, men leses først på nytt ved
> prosessoppstart — når det endres, vises et **«Start serveren på nytt»**-banner i kontrollpanelet.

---

## Flaggkatalog

72 flagg fordelt på 6 kategorier. **Standardverdi** er definisjonens standardverdi
— verdien som brukes når verken en databaseoverstyring eller en miljøvariabel finnes.

### Sikkerhet (10)

| Nøkkel                                  | Type   | Standardverdi | Beskrivelse                                                                                                                                                                                                                                                                                               |
| --------------------------------------- | ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolsk | `false`       | Krev en API-nøkkel for alle innkommende forespørsler.                                                                                                                                                                                                                                                     |
| `INPUT_SANITIZER_ENABLED`               | boolsk | `true`        | Aktiver rensing av inndata for alle forespørsler.                                                                                                                                                                                                                                                         |
| `INJECTION_GUARD_MODE`                  | enum   | `off`         | Modus for beskyttelse mot promptinjeksjon. Verdier: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                                                     |
| `PII_REDACTION_ENABLED`                 | boolsk | `false`       | Sladd PII fra forespørsler (uavhengig av `INPUT_SANITIZER_MODE`).                                                                                                                                                                                                                                         |
| `PII_RESPONSE_SANITIZATION`             | boolsk | `false`       | Rens PII fra leverandørsvar.                                                                                                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum   | `redact`      | Modus for rensing av PII i svar. Verdier: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                                                               |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolsk | `true`        | Blokker utgående forespørsler til private/interne IP-områder.                                                                                                                                                                                                                                             |
| `ALLOW_API_KEY_REVEAL`                  | boolsk | `false`       | Tillat autentiserte kontrollpanelbrukere å vise lagrede API-nøkler i stedet for bare å se maskerte verdier.                                                                                                                                                                                               |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolsk | `false`       | Inkluder kontoprefikset i AUTH-logglinjer (f.eks. «Bruker <provider>-konto: abc12345...»). Deaktivert som standard slik at kontoidentifikatorer sladdes fra delte prosesslogger og logger i miljøer med flere leietakere. Uavhengig av feilsøkingsmodus; aktivering av feilsøkingsmodus viser ikke dette. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolsk | `false`       | Når OIDC er aktivert, deaktiver passordinnlogging slik at brukere bare kan autentisere seg via OIDC-enkeltpålogging. Når dette er deaktivert (standard), er både passordinnlogging og OIDC tilgjengelig.                                                                                                  |

### Nettverk (15)

| Nøkkel                                          | Type    | Standardverdi | Omstart | Beskrivelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------- | ------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`       | ✓       | Aktiver skjult modus for TLS-fingeravtrykk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`       |         | Tillat at rutene /v1/audio/* bruker OpenAI-kompatible leverandørnoder som driftes utenfor localhost. Deaktivert som standard — ruting av lyd til en ekstern vert endrer utgående identitet og må være en uttrykkelig operatørbeslutning. Tilbakekoblingsnoder er alltid tillatt og påvirkes ikke.                                                                                                                                                                                                                                                                        |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`       |         | Når ingen proxy er tilordnet en tilkobling, velges den første fungerende proxyen fra registeret automatisk. Deaktivert som standard (ellers blir enhver proxy i registeret en global reserveløsning — #3332).                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`       |         | Tillat at OAuth- og leverandørvalideringsflyter omgår en fastlåst proxy og kobler til direkte når forhåndskontroller av proxyens tilgjengelighet mislykkes. Deaktivert som standard fordi dette kan endre utgående IP-adresse.                                                                                                                                                                                                                                                                                                                                           |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`        |         | Ved et nettverksavvik (tidsavbrudd, tilkobling avvist/tilbakestilt) for en rotasjonsutfører med flere kontoer, når kontoen som feiler ikke har en dedikert proxy, brukes en kort nedkjølingsperiode, og andre kontoer uten proxy hoppes over for resten av forespørselen i stedet for å prøve hver av dem på nytt. Aktivert som standard (trygt: ingen endring av utgående IP-adresse, reduserer bare risikoen for ventetid/nedkjøling for kontoer med delt utgående trafikk). Deaktiver for å gjenopprette umiddelbar videresending ved det første unntaket uten proxy. |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false`       |         | Proxyutvalg og opencodes rotasjon per konto slutter å velge en proxy på nytt rett etter at den har feilet (avvist TCP-sonde eller en 429 mottatt via den), i en prosesslokal periode som dobles for hver gjentakelse, opptil en maksimumsgrense. Ingen proxystatus skrives; når alle kandidater er satt til side, forblir valget uendret. Deaktivert som standard.                                                                                                                                                                                                       |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`       |         | Vis under et proxyutvalg i kontrollpanelet hvor mange observerte utgående IP-adresser som betjente medlemmene de siste 24 timene, og hvor mange tilkoblinger som brukte dem. Skrivebeskyttet, beregnet fra proxyloggen og aldri brukt til ruting. Deaktivert som standard.                                                                                                                                                                                                                                                                                               |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`       |         | For OpenCode-utføreren overvåkes den første databyten i et strømmet Responses-svar (vindu: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, standardverdi `15000`). En 2xx Responses-strøm som forblir stille etter at vinduet er utløpt, behandles som fastlåst: Kontoen settes i nedkjøling, og forespørselen roteres én gang til neste konto; en ny fastlåsing feiler umiddelbart. Deaktivert som standard: Fastlåste strømmer beholder dagens ventetid frem til tidsavbruddet for strømberedskap.                                                                                  |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`       |         | OpenCode-utfører: Ved en 403/451 med et `user_blocked`-avslag (ikke geografisk og ikke en Cloudflare-avvisning av fingeravtrykk) settes den avviste kontoen i nedkjøling, og det roteres til neste konto maksimalt én gang per forespørsel. Et nytt avslag returneres uendret, uten å registreres som vellykket. Deaktivert som standard: Ruting rundt en oppstrøms brukerblokkering kan fremstå som omgåelse og spre markeringen på tvers av kontogruppen.                                                                                                              |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`       |         | OpenCode-rotasjon: Etter to påfølgende midlertidige oppstrømsfeil (5xx eller en tom 400) settes det inn en pause før neste konto — 1,5 s, doblet for hver ytterligere feil, begrenset til 6 s per pause og 10 s per forespørsel, og hoppet over hvis klienten kobler fra. Den mislykkede responsdelen frigis før ventingen. Av som standard: failover skjer fortsatt umiddelbart.                                                                                                                                                                                        |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`       |         | OpenCode-rotasjon: Stopp kontorunden ved den første 429-responsen som klassifiseres som en reell hastighetsbegrensning (en tolkbar `Retry-After` eller en responsdel som nevner en hastighets- eller bruksgrense), og returner denne oppstrøms 429-responsen uendret. Uklassifiserte 429-responser fortsetter rotasjonen. Av som standard: Gratisnivået er begrenset per utgående IP-adresse (#9611), så hver 429-respons utløser rotasjon, og en uttømt runde returnerer den siste oppstrøms 429-responsen.                                                             |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`       | ✓       | Deaktiver verifisering av TLS-sertifikater for MITM-proxyen. **Farlig.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`       |         | Tillat leverandør-URL-er som peker til private/interne nettverk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`        |         | Tillat å legge til/validere leverandører på lokale/private adresser (127.0.0.1, localhost, LAN). På som standard (lokalt først); deaktiver for streng blokkering som bare tillater offentlige adresser. Metadata for skytjenester forblir blokkert.                                                                                                                                                                                                                                                                                                                      |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`       | ✓       | Aktiver leverandørmodus som er kompatibel med Claude Code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Retningslinjer (5)

| Nøkkel                          | Type    | Standard   | Beskrivelse                                                                                                                                                                                                                                                   |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | Modus for håndheving av retningslinjer for verktøybruk. Verdier: `disabled`, `warn`, `block`.                                                                                                                                                                 |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | Aktiver automatisk hastighetsbegrensning basert på bruksmønstre.                                                                                                                                                                                              |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | Hopp over OmniRoutes lokale kontroll av kontekstvindu/maksimalt antall inndatatokener for direkte forespørsler til én enkelt modell. Oppstrømsgrenser gjelder fortsatt.                                                                                       |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | Avvis forespørsler før videresending når målmodellen mangler nødvendige funksjoner (bildeanalyse, verktøy, strukturert utdata, kontekstvindu). Beskytter direkte forespørsler til én enkelt leverandør som omgår kompatibilitetsfilteret i kombinasjonslaget. |
| `RADAR_ENABLED`                 | boolean | `false`    | Aktiver OmniRoute Radar-modulen (katalogfeedskjermer og synkronisering). Av som standard; aktivering låser bare opp brukergrensesnittet — datasynkronisering krever fortsatt separat tilvalg.                                                                 |

### Kjøretid (32)

| Nøkkel                                      | Type    | Standardverdi | Omstart | Beskrivelse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`        |         | Generer og legg inn samtalesammendrag når kombinasjonsruting bytter modell. Deaktiver for å behandle modellbytter uavhengig og forhindre bakgrunnsforespørsler om overføring for alle eksisterende og fremtidige kombinasjoner.                                                                                                                                                                                                                                                                                                                                             |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`        |         | Fjern interne utdataelementer fra kommentarfasen i Responses API-gjennomstrømminger før de videresendes til klienter. Deaktiver for å motta rå kommentarer fra oppstrømskilden.                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`        |         | Håndhev omfangsbegrensninger for tilgang til MCP-verktøy.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false`       |         | Komprimer beskrivelser av MCP-verktøy for å redusere bruken av tokener.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false`       |         | Aktiver behandling av bakgrunnsoppgaver under kjøring.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false`       | ✓       | Deaktiver alle bakgrunnstjenester (oppdatering av kvoter, synkronisering osv.).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`       |         | Stol på RTK-filtre på prosjektnivå uten validering.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`        | ✓       | Start WebSocket-serveren for sanntidsdashbordet ved import (port 20132 som standard).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`        |         | Tillat Codex å bruke Responses-over-WebSocket-transporten. Når dette er slått av, faller Codex tilbake til HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`        |         | Tillat Codex å bruke den lokale app-server WebSocket JSON-RPC-transporten (codexTransport=app-server). Når dette er slått av, faller tilkoblinger som er satt opp til å bruke app-server, tilbake til Codex' andre transporter.                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`        |         | Rut forespørsler med oppbrukt budsjett til leverandøren/modellen for kostnadsfri nødreserve. (Se [Nødreserve ved oppbrukt budsjett](#emergency-budget-fallback) nedenfor.)                                                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`       |         | Aktiver transparent, tidlig nytt forsøk for avkortede oppstrøms SSE-strømmer før noen responsbyte når klienten.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`       |         | Tillat strømgjenoppretting å sende forespørselen på nytt og skjøte sammen en respons etter at byte allerede har nådd klienten.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`       |         | Gjør fortsettelse midt i strømmen trygg for verktøykall: Gjenoppta aldri en avbrutt strøm etter at et verktøykall er sendt ut (pågående eller allerede fullført med finish_reason tool_calls), og lukk etter én tom fortsettelse i stedet for å bruke opp hele budsjettet. Av: standardoppførsel.                                                                                                                                                                                                                                                                           |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`       |         | Bytt én gang til en parallell tilkobling når en SSE-strøm lukkes før den sender ut en nyttig ramme, og det begrensede nye forsøket på samme tilkobling er brukt opp. Hvis ingen brukbar parallell tilkobling finnes, returneres den opprinnelige 502-feilen `STREAM_EARLY_EOF`. Av som standard: Tidlig EOF forblir endelig etter det nye forsøket på samme tilkobling.                                                                                                                                                                                                     |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`        |         | Inkluder visningsvennlige navnefelt i svar fra `/v1/models`. Deaktiver dette for klienter som bare forventer modell-ID-er.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`        |         | Styrer hvordan modell-ID-er prefikses i /v1/models. 'dual' (standard) sender ut både aliasprefikset og det kanoniske leverandør-ID-prefikset for bakoverkompatibilitet. 'alias' sender bare ut det korte aliasprefikset (f.eks. ds-web/model, ikke deepseek-web/model). 'canonical' sender bare ut det fullstendige leverandør-ID-prefikset. Verdier: `dual`, `alias`, `canonical`.                                                                                                                                                                                         |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`        |         | Aktiver periodisk synkronisering av ELO-rangeringen fra Arena AI-resultatlisten for rangering av modellers intelligens.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`       |         | Annonser speil-ID-er av typen `claude/<provider>/<model>` på `/v1/models`, slik at modelloppdagelsen i Claude Code-gatewayen viser modeller som ikke er Claude-modeller. Globalt nivå i tretrinnskontrollen (miljøvariabelen overstyrer innstillingen i kontrollpanelet). Se [Claude Code-konfigurasjon](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                          |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`        |         | Hovedbryter for gatewayaliasene no-think/<provider>/<model>. På (standard): /v1/models annonserer en variant uten tenkning for hver kvalifiserte Claude-modell med støtte for tenkning, og en no-think/-ID som sendes i en forespørsel, løses tilbake til den faktiske modellen med resonnering deaktivert. Av: Ingen varianter annonseres, og en no-think/-ID behandles som enhver annen ukjent modell-ID. På-/av-innstillingen ModelSpec.noThinkingAlias per modell gjelder fortsatt når dette er slått på.                                                               |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`       |         | Deaktiver generering av varianter for tenkenivå (f.eks. -low, -medium, -high) i /v1/models-katalogen.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`       | ✓       | Aktiver adaptive, virtuelle tilgangsbaner per leietaker for videresending til leverandører (#9654): En trafikktopp fra én leietaker fører ikke lenger til 503-feil for en annen. Miljøvariabelen OMNIROUTE_CHAT_VIRTUAL_LANES overstyrer denne innstillingen i kontrollpanelet. Endringer trer i kraft når serveren startes på nytt.                                                                                                                                                                                                                                        |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`       |         | Annonser speil-ID-er av typen <gateway-alias>/<model> på /v1/models for modeller der den kanoniske eieren ikke har aktiv legitimasjon, men en passthrough-gateway med aktiv legitimasjon ruter dem. Advarsel: Legger til katalogoppføringer for alle klienter når dette er aktivert globalt.                                                                                                                                                                                                                                                                                |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`       |         | Aktiver saldodeteksjon for aggregator-kompatible noder av typen New-API / One-API / Sub2API. Når dette er aktivert, rapporterer kompatible noder der aggregatorflagget er satt, saldoen sin i kontrollpanelet og ved rutingens forhåndskontroll av kvoten.                                                                                                                                                                                                                                                                                                                  |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`       |         | Fortsett ikke-strømmende, serverstyrte verktøykall til modellen returnerer et svar som klienten kan bruke.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`       |         | Søkestatistikk og nylige søk teller bare leverandører som fortsatt har en aktiv tilkobling (nøkkelfrie leverandører som duckduckgo-free telles alltid). Når dette er av, beholdes alle lagrede søkerader med en leverandør-ID.                                                                                                                                                                                                                                                                                                                                              |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`       |         | Leverandørsider i kontrollpanelet: Vis Gratis-merket bare ved signaler som leverandøren respekterer — dette fjerner heuristikken for visningsnavn, ikke-boolske gratisfelt og :free-suffikser for registrerte leverandører uten et dokumentert gratisnivå. Når dette er av, beholdes den tidligere regelen for merket.                                                                                                                                                                                                                                                      |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`       |         | Ved aggregerte 429/503-svar om utilgjengelighet utelates `Retry-After` når ingen konkret fremtidig tid for nytt forsøk er kjent (i stedet for syntetiske 1s). Legg til `error.retry_after_provenance` (`signal` \| `none`), og la dreneringsflyter for kombinasjoner lese tekstlige hint om nye forsøk fra JSON og ren tekst i oppstrømssvar. Feltet vises bare i svar som bygges av `unavailableResponse()`; andre 429/503-svartekster forblir uendret.                                                                                                                    |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`       |         | Når et `priority`-kombinasjonsmål merket som reserve kun ved kvoteoverskridelse stopper kombinasjonen av en årsak som beviselig ikke skyldes kvoten (leverandørens effektbryter er åpen, prediktiv latens fører til at det hoppes over), svar med 502 i stedet for den kvotelignende 503-feilen. Stopp på grunn av sperring, nedkjøling, utilgjengelighet, uttømming og samtidighetsgrense beholder 503.                                                                                                                                                                    |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`       |         | En enkel Mistral 401 (`{"detail":"Unauthorized"}`, uten eksplisitt autentiseringssignal) er identisk for en tilbakekalt nøkkel og for en oppbrukt kvote. Når dette er på, kjøles tilkoblingen ned i stedet for å parkeres som `expired`, maksimalt 3 ganger per time per tilkobling. Den neste parkerer den, slik at en tilbakekalt nøkkel fortsatt ender i riktig tilstand. Av som standard: Hver enkel Mistral 401 parkerer tilkoblingen som før.                                                                                                                         |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`       |         | Hent den aktive xAI-modellkatalogen for `xai-oauth`-tilkoblinger fra `https://api.x.ai/v1/models` ved hjelp av OAuth-bærertokenet, i stedet for den fastlåste statiske grunnlisten. Av som standard: `xai-oauth` fortsetter å levere den statiske grunnlisten uendret. Ved enhver oppslagsfeil faller modelloppdagelsen tilbake til grunnlisten (det er ikke verifisert om x.ai godtar et OAuth-bærertoken på dette endepunktet).                                                                                                                                           |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`       |         | La den automatiske oppryddingen slette avsluttede (fullførte/mislykkede/avbrutte/utløpte) Batch API-jobber som er eldre enn `OMNIROUTE_BATCH_RETENTION_DAYS`, sammen med kontrollpunktene deres per linje, og tømme BLOB-innholdet i opplastede filer etter deres egen `expires_at`. Av som standard: Alle eksisterende installasjoner beholder disse dataene nøyaktig som før, frem til en operatør aktivt slår dette på. Den operatørutløste ruten `DELETE /api/v1/batches/delete-completed` påvirkes ikke uansett — den er en separat, ubetinget offentlig API-kontrakt. |

### CLI (5)

| Nøkkel                                | Type    | Standard | Omstart | Beskrivelse                                                                                                                                                                                                                                 |
| ------------------------------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false`  | ✓       | Aktiver kompatibilitetsmodus for alle CLI-klienter.                                                                                                                                                                                         |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`  |         | Aktiver kompatibilitetslaget for modellaliaser.                                                                                                                                                                                             |
| `PRICING_SYNC_ENABLED`                | boolean | `false`  |         | Aktiver automatisk synkronisering av prisdata (krever også miljøvariabelen `PRICING_SYNC_ENABLED`).                                                                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`  |         | Etter en synkronisering av leverandørmodeller skal profilfilene ~/.codex/*.config.toml automatisk (om)skrives fra den aktive katalogen. Endrer aldri den aktive/standard Codex-konfigurasjonen. Av som standard.                            |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`  |         | Etter en synkronisering av leverandørmodeller skal Claude Code-profilene ~/.claude/profiles/<name>/settings.json automatisk (om)skrives fra den aktive katalogen. Endrer aldri den aktive/standard Claude-konfigurasjonen. Av som standard. |

### Helse (5)

| Nøkkel                                    | Type   | Standardverdi | Beskrivelse                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolsk | `false`       | Deaktiver endepunktet for helsesjekk av den lokale instansen.                                                                                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolsk | `false`       | Deaktiver helsesjekken for tokenvalidering.                                                                                                                                                                                                                                                        |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolsk | `false`       | Aktiver nettverkstilgang i sandkassemiljøet for ferdigheter.                                                                                                                                                                                                                                       |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolsk | `false`       | I helsesjekken for proxyer nullstiller en forespørsel som målet avviste (401/403/429), proxyens rekke av sammenhengende feil. Deaktivert som standard: En avvisning forblir nøytral (#10654). En 5xx forblir uavklart uansett; en avvisning fjerner, deaktiverer eller reaktiverer aldri en proxy. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolsk | `false`       | Kjør integritets-/helsesjekken av databasen ved oppstart etter at serveren begynner å godta forespørsler (via `setImmediate`), i stedet for å blokkere oppstarten til den er fullført (#13717). Deaktivert som standard: Oppstarten blokkeres nøyaktig som før denne PR-en.                        |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` og det eldre aliaset
> `INJECTION_GUARD_BLOCK_THRESHOLD` finjusterer `block`-modusen til
> `INJECTION_GUARD_MODE`, men de er vanlige miljøvariabler som leses av
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts),
> ikke funksjonsflagg: De kan ikke overstyres i databasen og har ingen bryter i kontrollpanelet. Se
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> Kolonnen `Restart` markerer flagg med `requiresRestart: true` — verdien
> lagres umiddelbart, men trer først i kraft etter at prosessen er lastet inn på nytt. Enum-
> flagg avviser alle verdier utenfor det tillatte settet (validert på serversiden i
> både `setFeatureFlagOverride()` og REST-`PUT`-håndtereren).

---

## Veksling av flagg

### Kontrollpanel

Gå til **Kontrollpanel → Innstillinger → Funksjonsflagg**
(`/dashboard/settings/feature-flags`). Rutenettet
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
støtter:

- **Søk** etter nøkkel eller beskrivelse, og **filtrering** etter kategori (pluss en syntetisk
  **Krever omstart**-visning).
- En **vekslebryter** for boolske flagg og en **nedtrekksliste** for enum-flagg
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- Et **kildemerke** per flagg — `DB`, `ENV` eller `DEF` — som viser hvor den
  gjeldende verdien kom fra.
- En **Tilbakestill**-knapp (vises bare for flagg med `DB` som kilde) for å fjerne overstyringen,
  og en **Tilbakestill alle overstyringer**-knapp nederst.
- Et **Start serveren på nytt**-banner når et flagg med `requiresRestart` endres.

### REST-API

Alle operasjoner går gjennom én enkelt rute:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
Hver metode krever en autentisert kontrollpaneløkt (`401` ellers).

#### `GET /api/settings/feature-flags`

Returnerer hvert flagg med gjeldende verdi, kilde og et sammendrag.

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... alle 72 flagg
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

Angi eller fjern én enkelt overstyring. Brødtekst: `{ key: string; value?: string }`.
Hvis `value` utelates, fjernes overstyringen (slik at env-/standardverdien gjenopprettes).

```bash
# Angi en DB-overstyring
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# Fjern overstyringen (ingen "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

Responsen gjengir den nye `effectiveValue`/`source`, `previousValue`/
`previousSource` og `requiresRestart`. Ukjente nøkler og enum-verdier utenfor det
gyldige området avvises med `400`.

#### `DELETE /api/settings/feature-flags`

Fjerner **alle** DB-overstyringer samtidig og gjenoppretter env-/standardverdien
for hvert flagg. Returnerer `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> Flagg med `requiresRestart: true` trer først i kraft etter at prosessen er lastet inn på nytt.
> Omstartsflyten i kontrollpanelet kaller `POST /api/restart` og spør deretter
> `GET /api/health/ping` gjentatte ganger til serveren er oppe igjen.

---

## Reserveløsning ved overskredet nødbudsjett

`OMNIROUTE_EMERGENCY_FALLBACK` (kategori `runtime`, standardverdi `true`) styrer
den kostnadsfrie reserveløsningen for nødsituasjoner i
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
Når den er aktivert, rutes forespørsler som har brukt opp budsjettet, til en gratis
reserveleverandør/-modell i stedet for å feile helt. Sett den til `false` (eller `0`) — via
vekslebryteren i kontrollpanelet, en DB-overstyring eller miljøvariabelen
`OMNIROUTE_EMERGENCY_FALLBACK` — for å deaktivere virkemåten og la forespørsler
som har brukt opp budsjettet, feile. (Gjort tilgjengelig som en vekslebryter i kontrollpanelet i PR-ene #3741 / #3752.)

---

## Se også

- [Referanse for miljøvariabler](./ENVIRONMENT.md) — de fleste flagg har en
  miljøvariabel med samme navn som er dokumentert der (DB-overstyringen har
  prioritet over den).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — fasiten for alle flagg.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — evalueringslogikk (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — lagring av
  DB-overstyringer i navnerommet `feature_flags` i tabellen `key_value`.
