# Account-Ban / Banned-Keyword Detection (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute skanner feilsvar fra oppstrømstjenester etter signaler som indikerer at en leverandørkonto
**er permanent utilgjengelig** (suspendert / deaktivert / utestengt på grunn av bruksvilkårene), og flytter
den aktuelle tilkoblingen til en **terminal `banned`-tilstand** når det finnes et samsvar, slik at den ikke
lenger velges for forespørsler. Dette er hva innstillingskortet **Security → Banned Keywords**
konfigurerer («Ytterligere nøkkelord som utløser registrering av permanent kontoutestengelse.
Innebygde nøkkelord gjelder alltid.»).

Denne siden dokumenterer den innebygde listen, deteksjonsflyten, omfanget, hvordan du trygt legger til
egendefinerte nøkkelord, og hvordan du gjenoppretter en flagget tilkobling. Selve terminaltilstanden
er en del av robusthetsmodellen — se
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) («Terminaltilstander»).

**Autoritativ kilde:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Innebygde nøkkelord

Disse 8 delstrengene gjelder alltid (uavhengig av store og små bokstaver), uansett eventuell egendefinert liste:

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

> Denne listen utvikler seg etter hvert som leverandørene endrer ordlyden i meldingene om utestengelse. Den autoritative
> kopien er `ACCOUNT_DEACTIVATED_SIGNALS` i `open-sse/services/accountFallback.ts`;
> behandle blokken ovenfor som et øyeblikksbilde.

To tilstøtende, **separate** signaltabeller finnes i samme fil og er _ikke_ en del
av deteksjonen av nøkkelord for utestengelse:

- `CREDITS_EXHAUSTED_SIGNALS` — fakturering/kvote oppbrukt (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminaltilstanden `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ikke-terminal**; en tokenoppdatering kan gjenopprette tilstanden.

Merk: Vanlige forbigående uttrykk som **`rate limit`** / `429` håndteres av
flyten for hastighetsbegrensning / nedkjøling av tilkoblinger og er **ikke** utestengelsessignaler.

## Deteksjonsflyt

```
feilsvar fra oppstrømstjenesten
  → brødteksten konverteres til en streng og til små bokstaver
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [delstrengssamsvar]
  → samsvar?
      → tilkoblingens testStatus = "banned"      (permanent — 1 års nedkjøling, gjenopprettes aldri automatisk)
      → hvis innstillingen `autoDisableBannedAccounts` er på og `autoDisableBannedScope`
        inkluderer denne tilkoblingen (`all`, eller `subscription` for OAuth/informasjonskapsel/økt)
        → settes også isActive = false. Forhåndsbetalte API-nøkler forblir aktive når omfanget er
        `subscription`.
      → tilkoblingen hoppes over under kontovalg (kombinerte QUOTA_BLOCKING-statuser)
```

- Samsvaret er et **søk etter delstrenger uavhengig av store og små bokstaver** i responsens **brødtekst**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Den permanente terminaliseringen som `banned` utløses av en brødtekst med et utestengelsessignal ved **enhver
  HTTP-status** (via `markAccountUnavailable` → `checkFallbackError`). Den
  snevrere etiketten **`deactivated`** (`isActive=false` når tilkoblingen ikke har
  ekstra API-nøkler) skrives av den innebygde `chatCore.ts`-flyten ved **HTTP 401 / 403**
  (klassifisert via `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Merk at
  `markAccountUnavailable()`-flyten skriver en _annen_ terminalstatus —
  **`expired`** — for det samme `ACCOUNT_DEACTIVATED`-signalet (via
  `resolveTerminalConnectionStatus`), så den samme utestengelsen kan vises som enten
  `deactivated` eller `expired`, avhengig av hvilken flyt som håndterte responsen. (Den
  eldre kodekommentaren sier «når en 401-brødtekst inneholder disse strengene» — dette
  underdriver den nåværende virkemåten.)
- En `banned`-tilkobling utelukkes fra utvalget alle steder der terminalstatuser
  filtreres (`isTerminalConnectionStatus`, kombinert `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Omfang — hvilke leverandører som skannes

**Alle leverandører.** Kontrollen kjører i den generelle feilhåndteringsprosessen
som alle mislykkede oppstrømsforespørsler går gjennom — den er **ikke** begrenset
til OAuth-/abonnementsintegrasjoner. Den resulterende terminaltilstanden gjelder
per **tilkobling**, ikke per leverandør.

Når det er sagt, er de innebygde _strengene_ rettet mot abonnements-/OAuth-
leverandører med reell risiko for utestengelse (ChatGPT Web Codex, Claude Web,
Codex, Muse Spark, Antigravity). En leverandør som bruker API-nøkler, vil bare
utløse detektoren hvis feilteksten bokstavelig talt inneholder en av delstrengene.

`autoDisableBannedScope` (`all` | `subscription`, standardverdi `all`) styrer om
et treff også setter `isActive=false`. `subscription` betyr innloggingsbaserte
brukerplasser (betalte abonnementer og gratiskontoer, inkludert økter med
nettleserinformasjonskapsler). Den registrerer fortsatt `testStatus=banned` for
forhåndsbetalte API-nøkler, men lar dem forbli i rutingsutvalget. Den langsiktige
løsningen er en overstyring per leverandør og per konto; den globale enum-verdien
er første versjon.

## Egendefinerte nøkkelord for utestengelse

Legg til eller fjern nøkkelord under **Sikkerhet → Nøkkelord for utestengelse**
(lagret som den globale innstillingen `customBannedSignals` via
`PATCH /api/settings`). De **legges til** den innebygde listen — de erstatter den
aldri — og lastes inn på nytt ved lagring (og ved oppstart) via
`setCustomBannedSignals()`. Hvert nøkkelord er begrenset til 200 tegn; det finnes
ingen grense for antall elementer i listen.

**⚠ Risiko for falske positiver — velg spesifikke formuleringer.** Deteksjonen
bruker et direkte delstrengsøk i hele svarteksten, og et treff er **permanent**
(1 års nedkjølingsperiode, manuell gjenoppretting). Et generelt nøkkelord kan
utestenge en helt frisk tilkobling:

- **Dårlig:** `quota`, `limit`, `error`, `denied` — forekommer i mange
  midlertidige feil.
- **Bra:** fullstendige setninger om utestengelse, f.eks.
  `your account has been suspended for`, `account permanently banned`,
  `violation of our terms`.

Foretrekk den lengste entydige formuleringen leverandøren returnerer ved en reell
utestengelse. Hvis du er i tvil, bør du først overvåke tilkoblingens `lastError`
og deretter legge til den nøyaktige ordlyden.

## Gjenopprette en flagget tilkobling

Terminaltilstandene `banned` / `deactivated` **gjenopprettes aldri automatisk**
(de er utelatt fra den proaktive gjenopprettingssyklusen — bare
`unavailable`-nedkjølingsperioder gjenopprettes av seg selv). En operatør må
eksplisitt fjerne dem:

1. **Test tilkoblingen på nytt** — handlingen **Test** i kontrollpanelet
   (`POST /api/providers/{id}/test`); en vellykket kontroll nullstiller
   `testStatus` til `active` og tømmer feilfeltene.
2. **Autentiser på nytt / rediger legitimasjonen** — kjør innloggings-/
   oppdateringsflyten på nytt for OAuth-leverandører; rutene for oppretting og
   import av leverandører setter `isActive = true`.
3. **Aktiver tilkoblingen på nytt** — hvis automatisk deaktivering satte
   `isActive = false` (omfang `all`, eller `subscription` for en OAuth-/
   informasjonskapsel-/økttilkobling), slår du den på igjen etter at kontoen er
   rettet.

Det finnes ingen egen knapp for å «fjerne utestengelsesflagget» — gjenoppretting
skjer ved ny test, ny autentisering eller ny aktivering, i samsvar med den
generelle regelen for terminaltilstander i
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolering av kontroller (test alle modeller)

En **feil som stammer fra en kontroll** (test alle modeller /
tilstandskontroll-dispatcher utført i `runAsProbe`) fjerner aldri en tilkobling
fra utvalget (#9817): Den **registreres for synlighet** (`last_error`,
`last_error_type`, `error_code`, `last_error_at`), men hopper over **alle**
endringer av ruting — nedkjølingsperioder, terminalstatus (`banned` /
`deactivated` / `credits_exhausted`), modellspesifikke utestengelser,
leverandørens kretsbryter, den 5 minutter lange kvotebufferen, oppdatering av
OAuth-token og automatisk deaktivering. Bare en feil i en reell forespørselsflyt
deaktiverer. Den registrerte feilen gjør en flagget konto synlig i
kontrollpanelet mens den fortsetter å betjene trafikk.

Det eneste beslutningspunktet er `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), som konsulteres av **alle** steder som kan
endre rutingstilstanden som følge av en feil fra en kontroll:

- `markAccountUnavailable` (`auth.ts`) — bare registrering (`lastError` som
  råtekst, `lastErrorType`, `errorCode`, `lastErrorAt`; med hensikt **ingen**
  `backoffLevel`, som ville utløst automatisk nedtrapping under valg og slettet
  registreringen)
- `maybeAutoDisableBannedAccount` — ingen automatisk deaktivering
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (bare
  registrering, ingen terminaltilstand `credits_exhausted`), GEO_BLOCKED (ingen
  24-timers ekskludering), MODEL_NOT_FOUND (ingen `lockModel`), Codex 429-
  failover med kontorotasjon (ingen `markCodexScopeRateLimited`, ingen lagret
  `rate_limited_until`, ingen tømming av økttilknytning),
  `persistCodexQuotaState` (ingen skriving av kvotetilstand, ingen ugyldiggjøring
  av buffer), `recordKeyHealthStatus` (nøkkeltilstandsrotatoren forblir urørt)
- OAuth-oppdatering — både den proaktive oppdateringen i eksekveringsbasen
  (`base.ts` `execute()`, ingen rotasjon av oppdateringstoken brukes opp) og den
  reaktive 401/403-flyten i `chatCore` (ingen `expired`-deaktivering)
- `chat.ts` — leverandørens kretsbryter og den 5 minutter lange kvotebufferen
  (`markAccountExhaustedFrom429`) forringes aldri

Den registrerte feilen gjør en flagget konto synlig i kontrollpanelet mens den
fortsetter å betjene trafikk. Merk: Kontrollregistreringen lagrer den **rå**
(uforkortede) feilteksten, i motsetning til den reelle flytens avkorting med
`slice(0,100)`.

Operatører som bruker «test alle» som et vedlikeholdsverktøy, kan gjenopprette
den tidligere virkemåten (kontrollen regnes som en reell generering) på én av
følgende måter:

- innstillingen `probeCanDisable` (`POST /api/settings` med
  `{"probeCanDisable": true}`, eller en direkte redigering av `key_value` i
  databasen), eller
- funksjonsflagget **`PROBE_CAN_DISABLE=true`** (miljø- eller
  databaseoverstyring; har forrang over innstillingen).

Feilsikkerhet: Hvis oppslaget av flagget eller innstillingene utløser en feil,
forblir isoleringen PÅ.

## Kildefiler

| Område                                             | Fil                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signaltabeller + samsvar                           | `open-sse/services/accountFallback.ts`                                                                        |
| Avslutning / persistens                            | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Omfang for automatisk deaktivering                 | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Innebygd klassifisering                            | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Utelukkelse fra gjenoppretting av terminaltilstand | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Kjøretidslasting av egendefinerte nøkkelord        | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Brukergrensesnitt for innstillinger                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
