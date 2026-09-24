# CLI Machine-ID Token (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Overzicht

OmniRoute CLI-opdrachten verifiëren zich bij de lokale beheer-API met een
`HMAC-SHA256(machine-id, salt)`-token dat via de requestheader
`x-omniroute-cli-token` wordt verzonden.

Hierdoor kunnen CLI-subopdrachten (`omniroute status`, `omniroute providers`, enz.)
beheereindpunten aanroepen zonder dat de gebruiker bij elke uitvoering een JWT of
wachtwoord hoeft op te geven.

## Hoe het werkt

1. `getMachineTokenSync()` leest de hardwarematige machine-ID via `node-machine-id`
   (bij een fout wordt teruggevallen op een lege tekenreeks, waardoor CLI-authenticatie wordt uitgeschakeld).
2. De functie berekent `HMAC-SHA256(machine_id, salt)` en retourneert de volledige
   hexadecimale digest van 64 tekens — een deterministisch, niet-omkeerbaar token dat aan deze machine is gekoppeld.
3. De CLI verzendt het token alleen als `x-omniroute-cli-token` wanneer de bepaalde
   bestemming een expliciete loopback-URL is (`localhost`, `127.0.0.0/8` of
   loopback-IPv6). Requests met het token gebruiken `redirect: error`, zodat een lokale
   omleiding het niet naar een andere origin kan doorsturen. Externe contexten gebruiken in plaats daarvan
   toegangstokens met een beperkt bereik. Als het token niet kan worden afgeleid, laat de CLI de header weg
   en rapporteert `omniroute doctor` de fout, in plaats van een leeg token
   als geldig te behandelen.
4. De server (`src/server/authz/policies/management.ts`) berekent het
   verwachte token opnieuw met dezelfde salt en vergelijkt dit via `timingSafeEqual` om
   extractie via timingaanvallen te voorkomen.

## Beveiligingseigenschappen

| Eigenschap                                  | Details                                                                                                                                                                                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alleen loopback**                         | Wordt alleen geaccepteerd wanneer de door de server vertrouwde peer-localiteitsmarkering (afgeleid van het werkelijke TCP-peeradres) loopback aangeeft. De door de client beheerde `Host`-header wordt nooit vertrouwd om de localiteit te bepalen. |
| **Vergelijking in constante tijd**          | `crypto.timingSafeEqual` voorkomt timingaanvallen.                                                                                                                                                                                                  |
| **Niet-omkeerbaar**                         | De machine-ID kan niet uit de HMAC-uitvoer worden achterhaald.                                                                                                                                                                                      |
| **Geen omzeiling van `always`-beveiliging** | `isAlwaysProtectedPath()` wordt vóór de controle van het CLI-token geëvalueerd. `/api/shutdown` en `/api/settings/database` vereisen altijd een JWT.                                                                                                |
| **Niet-exporteerbaar**                      | Het token wordt nooit naar schijf geschreven of gelogd.                                                                                                                                                                                             |

## Standaardsalt (willekeurig per installatie)

Wanneer `OMNIROUTE_CLI_SALT` niet is ingesteld, is de salt een willekeurige hexadecimale tekenreeks
van 64 tekens die eenmaal wordt gegenereerd en wordt opgeslagen in `<DATA_DIR>/cli-token-salt.json` (modus `0600`) —
niet de ingecheckte letterlijke waarde `omniroute-cli-auth-v1`. Zowel `getActiveSalt()` in
`src/lib/machineToken.ts` als de tegenhanger ervan in `bin/cli/utils/cliToken.mjs` lezen hetzelfde
bestand, zodat de server en elke CLI-aanroep binnen deze installatie op dezelfde
waarde uitkomen; de ingecheckte letterlijke waarde wordt alleen als laatste redmiddel gebruikt wanneer er nog geen
opgeslagen salt of salt uit een omgevingsvariabele beschikbaar is (bijvoorbeeld bij een nieuwe installatie met alleen de CLI
voordat de server ooit is uitgevoerd). Dit verhelpt een zwakte van de oude vaste letterlijke
standaardwaarde: `/etc/machine-id` is doorgaans voor iedereen leesbaar, waardoor elke lokale gebruiker
anders hetzelfde token zou kunnen afleiden voor elke installatie waarin
`OMNIROUTE_CLI_SALT` nooit is ingesteld.

## Saltrotatie

Stel `OMNIROUTE_CLI_SALT` in om het afgeleide token te roteren zonder codewijzigingen — deze waarde heeft altijd voorrang op de opgeslagen salt per installatie. Na de rotatie gebruiken alle CLI-processen op deze machine automatisch het nieuwe token. Dit is nuttig na een lek via de proceslijst waardoor de vorige afgeleide waarde mogelijk is blootgesteld.

```bash
# Permanente rotatie (toevoegen aan het shellprofiel)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Controleren of het nieuwe token wordt gebruikt
omniroute status
```

## Verouderde indeling (SHA-256, 32 tekens) — wordt nog steeds geaccepteerd

Vóór de bovenstaande HMAC-indeling leidde de CLI het token af als
`SHA-256(machineId + salt).hex[0..32]` (een voorvoegsel van 32 tekens) in
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` in `src/lib/machineToken.ts`).

Voor achterwaartse compatibiliteit accepteert de server **beide** indelingen: de verificatie bouwt
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` op en vergelijkt de
binnenkomende header met elk token via `timingSafeEqual`
(`src/server/authz/policies/management.ts` en `src/lib/middleware/cliTokenAuth.ts`).
Een token is dus geldig als het overeenkomt met **ofwel** de HMAC-digest van 64 tekens, **ofwel** het
verouderde SHA-256-voorvoegsel van 32 tekens.

**Uitschakelen:** stel `OMNIROUTE_DISABLE_CLI_TOKEN=true` in (via de omgeving of `.env`) om het CLI-tokenmechanisme volledig uit te schakelen; voor alle toegang is dan een expliciete API-sleutel vereist. Op hosts met meerdere gebruikers wordt dit aanbevolen, omdat `machine-id` per apparaat geldt (niet per gebruiker) en een andere gebruiker op dezelfde host hetzelfde token zou kunnen berekenen.

## Bestanden

| Bestand                                   | Doel                                          |
| ----------------------------------------- | --------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tokenafleiding (`getMachineTokenSync`)        |
| `bin/cli/utils/cliToken.mjs`              | CLI-tegenhanger van dezelfde afleiding        |
| `<DATA_DIR>/cli-token-salt.json`          | Opgeslagen willekeurige salt per installatie  |
| `src/server/authz/headers.ts`             | Constante `CLI_TOKEN_HEADER`                  |
| `src/server/authz/policies/management.ts` | Verificatie aan serverzijde                   |
| `src/server/authz/routeGuard.ts`          | Controle van loopback-host (`isLoopbackHost`) |

## Zie ook

- `docs/security/ROUTE_GUARD_TIERS.md` — niveaus van routebeveiliging
- `docs/architecture/AUTHZ_GUIDE.md` — volledige autorisatiepijplijn
