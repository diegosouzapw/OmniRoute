# Account-Ban / Banned-Keyword Detection (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute scanner upstream-fejlsvar for signaler, der indikerer, at en udbyderkonto
**er permanent ubrugelig** (suspenderet / deaktiveret / udelukket pga. brud på servicevilkårene), og flytter ved
et match den pågældende forbindelse til en **terminal `banned`-tilstand**, så den ikke
længere vælges til anmodninger. Det er dette, som indstillingskortet **Security → Banned Keywords**
konfigurerer ("Yderligere nøgleord, der udløser registrering af permanent kontoudelukkelse.
Indbyggede nøgleord anvendes altid.").

Denne side dokumenterer den indbyggede liste, registreringsforløbet, dets omfang, hvordan
brugerdefinerede nøgleord tilføjes sikkert, og hvordan en markeret forbindelse gendannes. Selve den terminale
tilstand er en del af robusthedsmodellen — se
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminaltilstande").

**Autoritativ kilde:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Indbyggede nøgleord

Disse 8 delstrenge anvendes altid (uafhængigt af store og små bogstaver), uanset eventuelle brugerdefinerede lister:

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

> Denne liste udvikler sig, efterhånden som udbyderne ændrer formuleringerne i deres udelukkelsesmeddelelser. Den autoritative
> kopi er `ACCOUNT_DEACTIVATED_SIGNALS` i `open-sse/services/accountFallback.ts`;
> betragt blokken ovenfor som et øjebliksbillede.

To tilstødende, **separate** signaltabeller findes i den samme fil og er _ikke_ en del
af registreringen af udelukkelsesnøgleord:

- `CREDITS_EXHAUSTED_SIGNALS` — fakturering/kvote opbrugt (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ikke-terminal**; en tokenopdatering kan genoprette forbindelsen.

Bemærk: almindelige midlertidige formuleringer som **`rate limit`** / `429` håndteres af
stien for hastighedsbegrænsning / forbindelsespause og er **ikke** udelukkelsessignaler.

## Registreringsforløb

```
upstream-fejlsvar
  → body konverteres til en streng + til små bogstaver
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [match af delstreng]
  → match?
      → forbindelsens testStatus = "banned"      (permanent — 1 års pause, genoprettes aldrig automatisk)
      → hvis indstillingen `autoDisableBannedAccounts` er slået til, og `autoDisableBannedScope`
        omfatter denne forbindelse (`all` eller `subscription` for OAuth/cookie/session)
        → sættes isActive = false også. Forudbetalte API-nøgler forbliver aktive, når omfanget er
        `subscription`.
      → forbindelsen springes over under valg af konto (kombinerede QUOTA_BLOCKING-statusser)
```

- Matchet er en **søgning efter en delstreng uden hensyn til store og små bogstaver** i svarets **body**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Den permanente terminalisering som `banned` udløses af en body med et udelukkelsessignal ved **enhver
  HTTP-status** (via `markAccountUnavailable` → `checkFallbackError`). Den
  mere specifikke etiket **`deactivated`** (`isActive=false`, når forbindelsen ikke har
  ekstra API-nøgler) skrives af den integrerede `chatCore.ts`-sti ved **HTTP 401 / 403**
  (klassificeret via `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Bemærk, at
  `markAccountUnavailable()`-stien skriver en _anden_ terminal status —
  **`expired`** — for det samme `ACCOUNT_DEACTIVATED`-signal (via
  `resolveTerminalConnectionStatus`), så den samme udelukkelse kan fremstå som enten
  `deactivated` eller `expired`, afhængigt af hvilken sti der håndterede svaret. (Den
  ældre kodekommentar siger "når en 401-body indeholder disse strenge" — det
  undervurderer den nuværende adfærd.)
- En `banned`-forbindelse udelukkes fra valg alle steder, hvor terminale statusser
  filtreres (`isTerminalConnectionStatus`, kombinerede `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Omfang — hvilke udbydere scannes

**Alle udbydere.** Kontrollen kører i den generiske fejlhåndteringspipeline, som
alle mislykkede upstream-anmodninger passerer gennem — den er **ikke** begrænset til
OAuth-/abonnementsscrapere. Den resulterende terminaltilstand gælder pr. **forbindelse**,
ikke pr. udbyder.

Når det er sagt, er de indbyggede _strenge_ rettet mod abonnements-/OAuth-udbydere
med reel risiko for udelukkelse (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). En API-nøgleudbyder udløser kun detektoren, hvis dens fejltekst
bogstaveligt indeholder en af delstrengene.

`autoDisableBannedScope` (`all` | `subscription`, standardværdi `all`) styrer, om
et match også sætter `isActive=false`. `subscription` betyder loginbaserede pladser
(betalte abonnementer og gratis konti, herunder web-cookie-sessioner). Den
registrerer stadig `testStatus=banned` for forudbetalte API-nøgler, men lader dem
forblive i routingpuljen. Det robuste design er en tilsidesættelse pr. udbyder og
pr. konto; den globale enum er første version.

## Tilpassede nøgleord for udelukkelse

Tilføj eller fjern nøgleord under **Sikkerhed → Nøgleord for udelukkelse**
(gemmes som den globale indstilling `customBannedSignals` via
`PATCH /api/settings`). De **føjes til** den indbyggede liste — de erstatter den
aldrig — og genindlæses dynamisk ved lagring (og ved opstart) via
`setCustomBannedSignals()`. Hvert nøgleord er begrænset til 200 tegn; der er ingen
grænse for arrayets længde.

**⚠ Risiko for falske positiver — vælg specifikke fraser.** Detekteringen er et
direkte delstrengsmatch i hele svarteksten, og et match er **permanent**
(1 års nedkølingsperiode, manuel gendannelse). Et bredt nøgleord kan udelukke en
fuldt funktionsdygtig forbindelse:

- **Dårligt:** `quota`, `limit`, `error`, `denied` — forekommer i mange
  midlertidige fejl.
- **Godt:** fulde sætninger om udelukkelse, f.eks.
  `your account has been suspended for`, `account permanently banned`,
  `violation of our terms`.

Foretræk den længste entydige frase, som udbyderen returnerer ved en reel
udelukkelse. Hvis du er i tvivl, skal du først overvåge forbindelsens `lastError`
og derefter tilføje den nøjagtige formulering.

## Gendannelse af en markeret forbindelse

De terminale tilstande `banned` / `deactivated` **gendannes aldrig automatisk**
(de er udelukket fra det proaktive gendannelsestjek — kun nedkølingsperioder med
`unavailable` gendannes automatisk). En operatør skal rydde dem eksplicit:

1. **Test forbindelsen igen** — dashboardets handling **Test**
   (`POST /api/providers/{id}/test`); en vellykket kontrol nulstiller
   `testStatus` til `active` og rydder fejlfelterne.
2. **Godkend igen/rediger legitimationsoplysninger** — for OAuth-udbydere skal
   login-/opdateringsflowet køres igen; udbydernes oprettelses-/importruter
   sætter `isActive = true`.
3. **Genaktivér forbindelsen** — hvis automatisk deaktivering satte
   `isActive = false` (omfanget `all`, eller `subscription` for en
   OAuth-/cookie-/sessionsforbindelse), skal den slås til igen, efter at kontoen
   er blevet rettet.

Der findes ingen separat knap til at "rydde udelukkelsesflaget" — gendannelse
sker via ny test, ny godkendelse eller genaktivering i overensstemmelse med den
generelle regel for terminaltilstande i
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolering af kontrolkørsler (test af alle modeller)

En **fejl, der stammer fra en kontrolkørsel** (test af alle modeller /
sundhedstjek-dispatches udført i `runAsProbe`), fjerner aldrig en forbindelse fra
puljen (#9817): Den **registreres af hensyn til synlighed** (`last_error`,
`last_error_type`, `error_code`, `last_error_at`), men springer **alle**
routingændringer over — nedkølingsperioder, terminalstatus (`banned` /
`deactivated` / `credits_exhausted`), modelbaserede spærringer,
udbyderens kredsløbsafbryder, 5-minutters kvotecache, opdatering af OAuth-token
og automatisk deaktivering. Kun en fejl fra den reelle anmodningssti deaktiverer.
Den registrerede fejl gør en markeret konto synlig i dashboardet, mens den fortsat
betjener trafik.

Det centrale beslutningspunkt er `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), som konsulteres af **alle** steder, der kan
ændre routingtilstanden som følge af en fejl fra en kontrolkørsel:

- `markAccountUnavailable` (`auth.ts`) — kun registrering (`lastError` med rå
  tekst, `lastErrorType`, `errorCode`, `lastErrorAt`; bevidst **ingen**
  `backoffLevel`, da det ville udløse automatisk nedtrapning på
  udvælgelsestidspunktet og slette registreringen)
- `maybeAutoDisableBannedAccount` — ingen automatisk deaktivering
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (kun
  registrering, ingen terminal `credits_exhausted`), GEO_BLOCKED (ingen
  udelukkelse i 24 timer), MODEL_NOT_FOUND (ingen `lockModel`), Codex'
  kontorotations-failover ved 429 (ingen `markCodexScopeRateLimited`, ingen
  permanent lagret `rate_limited_until`, ingen rydning af sessionstilknytning),
  `persistCodexQuotaState` (ingen skrivning af kvotetilstand, ingen
  cacheinvalidering), `recordKeyHealthStatus` (nøglesundhedsrotatoren forbliver
  uberørt)
- OAuth-opdatering — både den proaktive opdatering i executor-basen
  (`base.ts` `execute()`, ingen rotation af opdateringstoken forbruges) og den
  reaktive 401/403-sti i `chatCore` (ingen `expired`-deaktivering)
- `chat.ts` — udbyderens kredsløbsafbryder og 5-minutters kvotecachen
  (`markAccountExhaustedFrom429`) forringes aldrig

Den registrerede fejl gør en markeret konto synlig i dashboardet, mens den
fortsat betjener trafik. Bemærk: Kontrolregistreringen gemmer den **rå**
(uforkortede) fejltekst i modsætning til den reelle stis afkortning med
`slice(0,100)`.

Operatører, der bruger test af alle modeller som vedligeholdelsesværktøj, kan
gendanne den historiske adfærd (kontrolkørslen tæller som en reel generering) på
en af følgende måder:

- indstillingen `probeCanDisable` (`POST /api/settings` med
  `{"probeCanDisable": true}` eller en direkte redigering af `key_value` i
  databasen), eller
- funktionsflaget **`PROBE_CAN_DISABLE=true`** (miljø- eller
  databasetilsidesættelse; har forrang for indstillingen).

Fejlsikkerhed: Hvis opslaget af flaget eller indstillingerne udløser en fejl,
forbliver isoleringen slået TIL.

## Kildefiler

| Område                                               | Fil                                                                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signaltabeller + matchning                           | `open-sse/services/accountFallback.ts`                                                                        |
| Terminalisering / persistens                         | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Omfang for automatisk deaktivering                   | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Indlejret klassificering                             | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Udelukkelse fra gendannelse af terminaltilstand      | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Indlæsning af brugerdefinerede nøgleord under kørsel | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Brugerflade til indstillinger                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
