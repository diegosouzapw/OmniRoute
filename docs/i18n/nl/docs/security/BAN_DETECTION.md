# Account-Ban / Banned-Keyword Detection (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute scant foutreacties van upstreamproviders op signalen die aangeven dat een
**account permanent onbruikbaar is** (opgeschort / gedeactiveerd / verbannen wegens
schending van de gebruiksvoorwaarden) en zet die verbinding bij een overeenkomst
in een **terminale status `banned`**, zodat deze niet langer voor verzoeken wordt
geselecteerd. Dit wordt geconfigureerd via de instellingenkaart **Beveiliging →
Verbannen trefwoorden** ("Aanvullende trefwoorden die detectie van een permanente
accountban activeren. Ingebouwde trefwoorden zijn altijd van toepassing.").

Deze pagina documenteert de ingebouwde lijst, de detectiestroom, het bereik
ervan, hoe u veilig aangepaste trefwoorden toevoegt en hoe u een gemarkeerde
verbinding herstelt. De terminale status zelf maakt deel uit van het
weerbaarheidsmodel — zie
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminale statussen").

**Gezaghebbende bron:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Ingebouwde trefwoorden

Deze 8 subtekenreeksen zijn altijd van toepassing (niet-hoofdlettergevoelig),
ongeacht een eventuele aangepaste lijst:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Deze lijst evolueert wanneer providers de formulering van hun bans wijzigen.
> De gezaghebbende versie is `ACCOUNT_DEACTIVATED_SIGNALS` in
> `open-sse/services/accountFallback.ts`; beschouw het bovenstaande blok als een
> momentopname.

In hetzelfde bestand staan twee aangrenzende, **afzonderlijke** signaaltabellen
die _geen_ deel uitmaken van de detectie van verbannen trefwoorden:

- `CREDITS_EXHAUSTED_SIGNALS` — facturerings-/quotumtegoed opgebruikt
  (`insufficient_quota`, `credit_balance_too_low`, `payment required`, …) →
  terminale status `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **niet-terminaal**; vernieuwen van het token kan
  herstel mogelijk maken.

Opmerking: veelvoorkomende tijdelijke termen zoals **`rate limit`** / `429`
worden afgehandeld via het pad voor snelheidsbeperking / afkoeling van
verbindingen en zijn **geen** bansignalen.

## Detectiestroom

```
foutreactie van upstreamprovider
  → body omgezet naar tekenreeks + omgezet naar kleine letters
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [overeenkomst van subtekenreeks]
  → overeenkomst?
      → testStatus van verbinding = "banned"      (permanent — afkoelperiode van 1 jaar, nooit automatisch herstel)
      → als de instelling `autoDisableBannedAccounts` is ingeschakeld en `autoDisableBannedScope`
        deze verbinding omvat (`all`, of `subscription` voor OAuth/cookie/sessie)
        → dan ook isActive = false. Voorafbetaalde API-sleutels blijven actief wanneer het bereik
        `subscription` is.
      → verbinding wordt overgeslagen tijdens accountselectie (gecombineerde QUOTA_BLOCKING-statussen)
```

- De overeenkomst is een **niet-hoofdlettergevoelige zoekopdracht naar een
  subtekenreeks** in de **body** van de reactie (`isAccountDeactivated`,
  `accountFallback.ts`).
- De permanente terminalisatie als `banned` vindt bij een body met een bansignaal
  plaats bij **elke HTTP-status** (via `markAccountUnavailable` →
  `checkFallbackError`). Het specifiekere label **`deactivated`**
  (`isActive=false` wanneer de verbinding geen extra API-sleutels heeft) wordt
  door het inlinepad in `chatCore.ts` geschreven bij **HTTP 401 / 403**
  (geclassificeerd via `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Merk op
  dat het pad `markAccountUnavailable()` voor hetzelfde
  `ACCOUNT_DEACTIVATED`-signaal (via `resolveTerminalConnectionStatus`) een
  _andere_ terminale status schrijft — **`expired`** — waardoor dezelfde ban als
  `deactivated` of als `expired` kan verschijnen, afhankelijk van welk pad de
  reactie heeft afgehandeld. (Het oudere codecommentaar vermeldt "wanneer een
  401-body deze tekenreeksen bevat" — dat geeft het huidige gedrag te beperkt
  weer.)
- Een verbinding met de status `banned` wordt overal van selectie uitgesloten
  waar terminale statussen worden gefilterd (`isTerminalConnectionStatus`,
  gecombineerde `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Bereik — welke providers worden gescand

**Alle providers.** De controle wordt uitgevoerd in de generieke pijplijn voor foutafhandeling waar
elk mislukt upstreamverzoek doorheen gaat — deze is **niet** beperkt tot
OAuth-/abonnementsscrapers. De resulterende terminale status geldt per **verbinding**,
niet per provider.

De ingebouwde _tekenreeksen_ zijn echter gericht op abonnements-/OAuth-
providers met een reëel risico op blokkering (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Een provider met API-sleutels activeert de detector alleen als de fouttekst
letterlijk een van de subtekenreeksen bevat.

`autoDisableBannedScope` (`all` | `subscription`, standaard `all`) bepaalt of
een overeenkomst ook `isActive=false` instelt. `subscription` verwijst naar login-gebaseerde accounts
(betaalde abonnementen en gratis accounts, inclusief sessies met webcookies). Voor voorafbetaalde
API-sleutels wordt nog steeds `testStatus=banned` vastgelegd, maar ze blijven in de routeringspool.
Het duurzame ontwerp is een overschrijving per provider en per account; de globale
enum is de eerste versie.

## Aangepaste blokkeringszoekwoorden

Voeg zoekwoorden toe of verwijder ze via **Beveiliging → Blokkeringszoekwoorden** (opgeslagen als de globale
instelling `customBannedSignals` via `PATCH /api/settings`). Ze worden **toegevoegd aan**
de ingebouwde lijst — ze vervangen deze nooit — en worden bij het opslaan (en bij het opstarten)
direct opnieuw geladen via `setCustomBannedSignals()`. Elk zoekwoord is beperkt tot 200 tekens; er geldt
geen limiet voor de lengte van de array.

**⚠ Risico op foutpositieven — kies specifieke zinnen.** Detectie gebeurt via een onbewerkte
zoekactie naar subtekenreeksen in de volledige responstekst en een overeenkomst is **permanent** (afkoelperiode
van 1 jaar, handmatig herstel). Een algemeen zoekwoord kan een volledig gezonde verbinding blokkeren:

- **Slecht:** `quota`, `limit`, `error`, `denied` — komen voor in veel tijdelijke fouten.
- **Goed:** volledige blokkeringszinnen, bijvoorbeeld `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Gebruik bij voorkeur de langste ondubbelzinnige zin die de provider bij een echte blokkering retourneert. Bekijk
bij twijfel eerst de `lastError` van de verbinding en voeg vervolgens de exacte formulering toe.

## Een gemarkeerde verbinding herstellen

Terminale statussen `banned` / `deactivated` worden **nooit automatisch hersteld** (ze worden uitgesloten
van de proactieve herstelcyclus — alleen afkoelperiodes voor `unavailable` herstellen
vanzelf). Een beheerder moet ze expliciet wissen:

1. **Test de verbinding opnieuw** — de actie **Testen** op het dashboard
   (`POST /api/providers/{id}/test`); een geslaagde controle zet `testStatus` terug naar
   `active` en wist de foutvelden.
2. **Authenticeer opnieuw / bewerk de inloggegevens** — voer voor OAuth-providers de login-
   / vernieuwingsstroom opnieuw uit; routes voor het aanmaken/importeren van providers stellen `isActive = true` in.
3. **Schakel de verbinding opnieuw in** — als automatisch uitschakelen `isActive = false` heeft ingesteld
   (bereik `all`, of `subscription` voor een OAuth-/cookie-/sessieverbinding),
   schakel deze dan weer in nadat het account is hersteld.

Er is geen afzonderlijke knop om de blokkeringsmarkering te wissen — herstel gebeurt door opnieuw te testen, opnieuw te authenticeren of
opnieuw in te schakelen, overeenkomstig de algemene regel voor terminale statussen in
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolatie van controles (test-all voor modellen)

Een **fout die afkomstig is van een controle** (test-all voor modellen / statuscontroledispatches die
binnen `runAsProbe` worden uitgevoerd) verwijdert nooit een verbinding uit de pool (#9817): de fout wordt
**vastgelegd voor zichtbaarheid** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), maar **elke** routeringswijziging wordt overgeslagen — afkoelperiodes, terminale
status (`banned` / `deactivated` / `credits_exhausted`), blokkeringen per model,
de circuitonderbreker van de provider, de quota-cache van 5 minuten, het vernieuwen van OAuth-tokens
en automatisch uitschakelen. Alleen een fout in een echt verzoekpad deactiveert de verbinding. De vastgelegde
fout zorgt ervoor dat een gemarkeerd account zichtbaar is op het dashboard terwijl het
verkeer blijft verwerken.

Het centrale beslispunt is `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), dat wordt geraadpleegd door **elke** locatie die
de routeringsstatus zou kunnen wijzigen vanwege een fout die afkomstig is van een controle:

- `markAccountUnavailable` (`auth.ts`) — alleen vastleggen (`lastError` met onbewerkte tekst,
  `lastErrorType`, `errorCode`, `lastErrorAt`; bewust **geen**
  `backoffLevel`, omdat dit het automatisch vervallen tijdens de selectie zou activeren en de
  registratie zou wissen)
- `maybeAutoDisableBannedAccount` — niet automatisch uitschakelen
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (alleen vastleggen,
  geen terminale status `credits_exhausted`), GEO_BLOCKED (geen uitsluiting van 24 uur),
  MODEL_NOT_FOUND (geen `lockModel`), de codex 429-failover voor accountrotatie
  (geen `markCodexScopeRateLimited`, geen opgeslagen `rate_limited_until`, geen
  wissen van sessieaffiniteit), `persistCodexQuotaState` (geen schrijfactie voor quotastatus,
  geen cache-invalidatie), `recordKeyHealthStatus` (rotator voor sleutelstatus
  blijft onaangetast)
- OAuth-vernieuwing — zowel de proactieve vernieuwing in de executorbasis
  (`base.ts` `execute()`, geen vernieuwingstokenrotatie verbruikt) als het
  reactieve 401/403-pad in `chatCore` (geen `expired`-deactivatie)
- `chat.ts` — de circuitonderbreker van de provider en de quota-cache van 5 minuten
  (`markAccountExhaustedFrom429`) worden nooit verslechterd

De vastgelegde fout zorgt ervoor dat een gemarkeerd account zichtbaar is op het dashboard
terwijl het verkeer blijft verwerken. Let op: de controleregistratie slaat de **onbewerkte**
(niet-ingekorte) fouttekst op, in tegenstelling tot de inkorting via `slice(0,100)` in het echte pad.

Beheerders die test-all als onderhoudshulpmiddel gebruiken, kunnen het historische
gedrag herstellen (een controle telt als een echte generatie) via een van de volgende opties:

- de instelling `probeCanDisable` (`POST /api/settings` met
  `{"probeCanDisable": true}`, of een rechtstreekse bewerking van `key_value` in de database), of
- featureflag **`PROBE_CAN_DISABLE=true`** (omgeving of databaseoverschrijving; heeft voorrang op de
  instelling).

Fail-safe: als het opzoeken van de vlag of instellingen een fout veroorzaakt, blijft isolatie INGESCHAKELD.

## Bronbestanden

| Onderwerp                                      | Bestand                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signaaltabellen + overeenkomst                 | `open-sse/services/accountFallback.ts`                                                                        |
| Definitief maken / persistentie                | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Bereik van automatisch uitschakelen            | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Inlineclassificatie                            | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Uitsluiting van herstel van definitieve status | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Runtime laden van aangepaste trefwoorden       | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Instellingen-UI                                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
