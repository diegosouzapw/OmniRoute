# CLI Machine-ID Token (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Oversigt

OmniRoute CLI-kommandoer godkendes mod den lokale administrations-API ved hjælp af et
`HMAC-SHA256(machine-id, salt)`-token, der sendes via request-headeren
`x-omniroute-cli-token`.

Dette gør det muligt for CLI-underkommandoer (`omniroute status`, `omniroute providers` osv.)
at kalde administrationsendpoints, uden at brugeren skal angive et JWT eller en
adgangskode ved hver kørsel.

## Sådan fungerer det

1. `getMachineTokenSync()` læser maskinens hardware-id via `node-machine-id`
   (falder tilbage til en tom streng ved fejl, hvilket deaktiverer CLI-godkendelse).
2. Funktionen beregner `HMAC-SHA256(machine_id, salt)` og returnerer det fulde
   hex-digest på 64 tegn — et deterministisk, ikke-reversibelt token, der er knyttet til denne maskine.
3. CLI'en sender kun tokenet som `x-omniroute-cli-token`, når den fastlagte
   destination er en eksplicit loopback-URL (`localhost`, `127.0.0.0/8` eller
   loopback-IPv6). Requests, der indeholder tokenet, bruger `redirect: error`, så en lokal
   omdirigering ikke kan videresende det til en anden origin. Fjernkontekster bruger i stedet
   adgangstokens med begrænset anvendelsesområde. Hvis afledningen ikke er tilgængelig, udelader CLI'en headeren,
   og `omniroute doctor` rapporterer fejlen i stedet for at behandle et tomt token
   som gyldigt.
4. Serveren (`src/server/authz/policies/management.ts`) genberegner det
   forventede token med det samme salt og sammenligner via `timingSafeEqual` for at
   forhindre tidsbaseret udtrækning.

## Sikkerhedsegenskaber

| Egenskab                                   | Detalje                                                                                                                                                                                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Kun loopback**                           | Accepteres kun, når serverens pålidelige lokalitetsstempel for peer'en (afledt af den faktiske TCP-peeradresse) angiver loopback. Den klientkontrollerede `Host`-header betragtes aldrig som pålidelig til bestemmelse af lokalitet. |
| **Sammenligning i konstant tid**           | `crypto.timingSafeEqual` forhindrer timingangreb.                                                                                                                                                                                    |
| **Ikke-reversibel**                        | HMAC-outputtet kan ikke bruges til at gendanne maskin-id'et.                                                                                                                                                                         |
| **Ingen omgåelse af `always`-beskyttelse** | `isAlwaysProtectedPath()` evalueres før kontrollen af CLI-tokenet. `/api/shutdown` og `/api/settings/database` kræver altid JWT.                                                                                                     |
| **Kan ikke eksporteres**                   | Tokenet skrives aldrig til disken eller logges.                                                                                                                                                                                      |

## Standardsalt (tilfældigt pr. installation)

Når `OMNIROUTE_CLI_SALT` ikke er angivet, er saltet en tilfældig hex-streng på 64 tegn,
som genereres én gang og gemmes i `<DATA_DIR>/cli-token-salt.json` (tilstand `0600`) —
ikke den literal, der er checket ind, `omniroute-cli-auth-v1`. Både `getActiveSalt()` i
`src/lib/machineToken.ts` og dens tilsvarende implementering i `bin/cli/utils/cliToken.mjs` læser den
samme fil, så serveren og hver CLI-kørsel i denne installation ender med at bruge den
samme værdi. Den indcheckede literal bruges kun som en sidste reserve, når der endnu ikke
kan etableres et gemt salt eller et salt fra miljøet (for eksempel i en ny installation, der kun
indeholder CLI'en, før serveren nogensinde er blevet kørt). Dette lukker en svaghed ved den gamle faste
standardliteral: `/etc/machine-id` kan almindeligvis læses af alle, så enhver lokal bruger kunne
ellers aflede det samme token for hver installation, hvor
`OMNIROUTE_CLI_SALT` aldrig blev angivet.

## Rotation af salt

Angiv `OMNIROUTE_CLI_SALT` for at rotere det afledte token uden kodeændringer — det
har altid prioritet over det gemte installationsspecifikke salt. Efter rotationen vil alle CLI-
processer på denne maskine automatisk bruge det nye token. Nyttigt efter en lækage af
proceslisten, som kan have afsløret den tidligere afledte værdi.

```bash
# Permanent rotation (føj til shell-profilen)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Kontrollér, at det nye token er i brug
omniroute status
```

## Ældre format (SHA-256, 32 tegn) — accepteres stadig

Før HMAC-formatet ovenfor afledte CLI'en sit token som
`SHA-256(machineId + salt).hex[0..32]` (et præfiks på 32 tegn) i
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` i `src/lib/machineToken.ts`).

Af hensyn til bagudkompatibilitet accepterer serveren **begge** formater: Verifikatoren opbygger
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` og sammenligner den
indgående header med hver af dem ved hjælp af `timingSafeEqual`
(`src/server/authz/policies/management.ts` og `src/lib/middleware/cliTokenAuth.ts`).
Et token er således gyldigt, hvis det matcher **enten** HMAC-digesten på 64 tegn eller det ældre
SHA-256-præfiks på 32 tegn.

**Fravalg:** Angiv `OMNIROUTE_DISABLE_CLI_TOKEN=true` (miljøvariabel eller `.env`) for at deaktivere CLI-
tokenmekanismen fuldstændigt. Al adgang kræver derefter en eksplicit API-nøgle. På værter med flere brugere
anbefales dette, da `machine-id` gælder pr. enhed (ikke pr. bruger), og en anden
bruger på samme vært derfor kan beregne det samme token.

## Filer

| Fil                                       | Formål                                      |
| ----------------------------------------- | ------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tokenafledning (`getMachineTokenSync`)      |
| `bin/cli/utils/cliToken.mjs`              | CLI-sideækvivalent af samme afledning       |
| `<DATA_DIR>/cli-token-salt.json`          | Gemt tilfældigt installationsspecifikt salt |
| `src/server/authz/headers.ts`             | Konstanten `CLI_TOKEN_HEADER`               |
| `src/server/authz/policies/management.ts` | Verifikation på serversiden                 |
| `src/server/authz/routeGuard.ts`          | Kontrol af loopback-vært (`isLoopbackHost`) |

## Se også

- `docs/security/ROUTE_GUARD_TIERS.md` — niveauer for rutebeskyttelse
- `docs/architecture/AUTHZ_GUIDE.md` — komplet autorisationspipeline
