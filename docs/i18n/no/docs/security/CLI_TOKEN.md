# CLI Machine-ID Token (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Oversikt

OmniRoute CLI-kommandoer autentiseres mot det lokale administrasjons-API-et ved hjelp av et
`HMAC-SHA256(machine-id, salt)`-token som sendes via forespørselshodet
`x-omniroute-cli-token`.

Dette gjør at CLI-underkommandoer (`omniroute status`, `omniroute providers` osv.)
kan kalle administrasjonsendepunkter uten at brukeren må oppgi et JWT eller
passord ved hver kjøring.

## Slik fungerer det

1. `getMachineTokenSync()` leser maskinens maskinvare-ID via `node-machine-id`
   (går tilbake til en tom streng ved feil, noe som deaktiverer CLI-autentisering).
2. Den beregner `HMAC-SHA256(machine_id, salt)` og returnerer hele den 64 tegn lange
   heksadesimale kontrollsummen – et deterministisk, ikke-reversibelt token knyttet til denne maskinen.
3. CLI-et sender tokenet som `x-omniroute-cli-token` bare når det fastsatte
   målet er en eksplisitt loopback-URL (`localhost`, `127.0.0.0/8` eller
   loopback-IPv6). Forespørsler som inneholder tokenet, bruker `redirect: error`, slik at en lokal
   omdirigering ikke kan videresende det til en annen opprinnelse. Eksterne kontekster bruker avgrensede
   tilgangstokener i stedet. Hvis avledningen ikke er tilgjengelig, utelater CLI-et hodet,
   og `omniroute doctor` rapporterer feilen i stedet for å behandle et tomt token
   som gyldig.
4. Serveren (`src/server/authz/policies/management.ts`) beregner det
   forventede tokenet på nytt med samme salt og sammenligner ved hjelp av `timingSafeEqual` for å
   forhindre tidsbasert uthenting.

## Sikkerhetsegenskaper

| Egenskap                                   | Detalj                                                                                                                                                                                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bare loopback**                          | Godtas bare når serverens klarerte stempel for motpartens lokalitet (utledet fra den faktiske TCP-adressen til motparten) angir loopback. Det klientkontrollerte `Host`-hodet brukes aldri som grunnlag for lokalitet. |
| **Sammenligning med konstant kjøretid**    | `crypto.timingSafeEqual` forhindrer tidsangrep.                                                                                                                                                                        |
| **Ikke-reversibelt**                       | Maskin-ID-en kan ikke utledes fra HMAC-resultatet.                                                                                                                                                                     |
| **Ingen omgåelse av `always`-beskyttelse** | `isAlwaysProtectedPath()` evalueres før CLI-tokenkontrollen. `/api/shutdown` og `/api/settings/database` krever alltid JWT.                                                                                            |
| **Ikke-eksporterbart**                     | Tokenet skrives aldri til disk eller logges.                                                                                                                                                                           |

## Standardsalt (tilfeldig per installasjon)

Når `OMNIROUTE_CLI_SALT` ikke er angitt, er saltet en tilfeldig heksadesimal streng på 64 tegn
som genereres én gang og lagres i `<DATA_DIR>/cli-token-salt.json` (modus `0600`) –
ikke den innsjekkede literalen `omniroute-cli-auth-v1`. Både `getActiveSalt()` i
`src/lib/machineToken.ts` og speilimplementasjonen i `bin/cli/utils/cliToken.mjs` leser den
samme filen, slik at serveren og hver CLI-kjøring i denne installasjonen ender opp med den
samme verdien. Den innsjekkede literalen brukes bare som en siste utvei når verken et
lagret salt eller et salt fra miljøet ennå kan etableres (for eksempel i en ny installasjon med bare CLI-et
før serveren noen gang har kjørt). Dette lukker en svakhet ved den gamle, faste standardliteralen:
`/etc/machine-id` er vanligvis lesbar for alle, slik at enhver lokal bruker ellers kunne
utlede det samme tokenet for hver installasjon der `OMNIROUTE_CLI_SALT` aldri ble angitt.

## Saltrotasjon

Angi `OMNIROUTE_CLI_SALT` for å rotere det avledede tokenet uten kodeendringer — den
har alltid prioritet over det lagrede saltet per installasjon. Etter rotasjon vil alle CLI-
prosesser på denne maskinen automatisk bruke det nye tokenet. Nyttig etter en lekkasje
av prosesslisten som kan ha eksponert den forrige avledede verdien.

```bash
# Vedvarende rotasjon (legg til i skallprofilen)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Kontroller at det nye tokenet er i bruk
omniroute status
```

## Eldre format (SHA-256, 32 tegn) — godtas fortsatt

Før HMAC-formatet ovenfor avledet CLI-en tokenet som
`SHA-256(machineId + salt).hex[0..32]` (et prefiks på 32 tegn) i
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` i `src/lib/machineToken.ts`).

For bakoverkompatibilitet godtar serveren **begge** formatene: Verifikatoren bygger
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` og sammenligner
den innkommende headeren med hvert av dem ved hjelp av `timingSafeEqual`
(`src/server/authz/policies/management.ts` og `src/lib/middleware/cliTokenAuth.ts`).
Et token er derfor gyldig hvis det samsvarer med **enten** HMAC-digesten på 64 tegn
eller det eldre SHA-256-prefikset på 32 tegn.

**Deaktivering:** Angi `OMNIROUTE_DISABLE_CLI_TOKEN=true` (miljøvariabel eller `.env`) for å deaktivere CLI-
tokenmekanismen fullstendig. All tilgang krever da en eksplisitt API-nøkkel. På flerbruker-
verter anbefales dette, siden `machine-id` gjelder per enhet (ikke per bruker), og en annen
bruker på samme vert kan beregne det samme tokenet.

## Filer

| Fil                                       | Formål                                       |
| ----------------------------------------- | -------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tokenavledning (`getMachineTokenSync`)       |
| `bin/cli/utils/cliToken.mjs`              | CLI-kopi av den samme avledningen            |
| `<DATA_DIR>/cli-token-salt.json`          | Lagret tilfeldig salt per installasjon       |
| `src/server/authz/headers.ts`             | Konstanten `CLI_TOKEN_HEADER`                |
| `src/server/authz/policies/management.ts` | Verifisering på serversiden                  |
| `src/server/authz/routeGuard.ts`          | Kontroll av loopback-vert (`isLoopbackHost`) |

## Se også

- `docs/security/ROUTE_GUARD_TIERS.md` — nivåer for rutebeskyttelse
- `docs/architecture/AUTHZ_GUIDE.md` — fullstendig autorisasjonsflyt
