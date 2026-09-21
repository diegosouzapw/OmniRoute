# Account-Ban / Banned-Keyword Detection (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute söker igenom felsvar från uppströmsleverantörer efter signaler som indikerar att ett leverantörs-
**konto är permanent obrukbart** (avstängt / inaktiverat / blockerat för brott mot användarvillkoren) och
flyttar, när en matchning hittas, anslutningen till ett **slutgiltigt `banned`-tillstånd** så att den inte
längre väljs för förfrågningar. Detta är vad inställningskortet **Säkerhet → Förbjudna nyckelord**
konfigurerar ("Ytterligare nyckelord som utlöser identifiering av permanent kontoblockering.
Inbyggda nyckelord gäller alltid.").

Den här sidan dokumenterar den inbyggda listan, detekteringsflödet, dess omfattning, hur man lägger till
anpassade nyckelord på ett säkert sätt och hur man återställer en flaggad anslutning. Det slutgiltiga
tillståndet är i sig en del av resiliensmodellen — se
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Slutgiltiga tillstånd").

**Sanningskälla:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Inbyggda nyckelord

Dessa 8 delsträngar gäller alltid (skiftlägesokänsligt), oavsett eventuell anpassad lista:

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

> Den här listan utvecklas i takt med att leverantörerna ändrar formuleringarna i sina blockeringsmeddelanden. Den auktoritativa
> kopian är `ACCOUNT_DEACTIVATED_SIGNALS` i `open-sse/services/accountFallback.ts`;
> betrakta blocket ovan som en ögonblicksbild.

Två intilliggande, **separata** signaltabeller finns i samma fil och ingår _inte_ i
detekteringen av förbjudna nyckelord:

- `CREDITS_EXHAUSTED_SIGNALS` — fakturering/kvot förbrukad (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → slutgiltigt `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **inte slutgiltigt**; en tokenuppdatering kan återställa funktionen.

Obs! Vanliga tillfälliga fraser som **`rate limit`** / `429` hanteras av
flödet för hastighetsbegränsning/anslutningens nedkylningsperiod och är **inte** blockeringssignaler.

## Detekteringsflöde

```
felsvar från uppströmsleverantör
  → brödtexten konverteras till en sträng + gemener
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [delsträngsmatchning]
  → matchning?
      → anslutningens testStatus = "banned"      (permanent — 1 års nedkylningsperiod, återställs aldrig automatiskt)
      → om inställningen `autoDisableBannedAccounts` är aktiverad och `autoDisableBannedScope`
        inkluderar den här anslutningen (`all`, eller `subscription` för OAuth/cookie/session)
        → sätts även isActive = false. Förbetalda API-nycklar förblir aktiva när omfattningen är
        `subscription`.
      → anslutningen hoppas över vid val av konto (kombinerade QUOTA_BLOCKING-statusar)
```

- Matchningen är en **skiftlägesokänslig delsträngssökning** i svarets **brödtext**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Den permanenta terminaliseringen till `banned` utlöses av en brödtext med blockeringssignal vid **alla
  HTTP-statusar** (via `markAccountUnavailable` → `checkFallbackError`). Den
  snävare etiketten **`deactivated`** (`isActive=false` när anslutningen inte har några
  extra API-nycklar) skrivs av den infogade `chatCore.ts`-sökvägen vid **HTTP 401 / 403**
  (klassificerat via `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Observera att
  sökvägen `markAccountUnavailable()` skriver en _annan_ slutgiltig status —
  **`expired`** — för samma `ACCOUNT_DEACTIVATED`-signal (via
  `resolveTerminalConnectionStatus`), så samma blockering kan visas som antingen
  `deactivated` eller `expired` beroende på vilken sökväg som hanterade svaret. (Den
  äldre kodkommentaren säger "när brödtexten i ett 401-svar innehåller dessa strängar" — det
  beskriver inte det nuvarande beteendet fullständigt.)
- En `banned`-anslutning utesluts från val överallt där slutgiltiga statusar
  filtreras (`isTerminalConnectionStatus`, kombinerade `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Omfattning — vilka leverantörer som genomsöks

**Alla leverantörer.** Kontrollen körs i den generella felhanteringspipeline som
alla misslyckade uppströmsförfrågningar passerar — den är **inte** begränsad till
OAuth-/prenumerationsskrapor. Det resulterande terminaltillståndet gäller per
**anslutning**, inte per leverantör.

De inbyggda _strängarna_ är dock inriktade på prenumerations-/OAuth-leverantörer
med faktisk risk för avstängning (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). En API-nyckelleverantör utlöser endast detektorn om dess felsvar
bokstavligen innehåller någon av delsträngarna.

`autoDisableBannedScope` (`all` | `subscription`, standardvärde `all`) styr om
en matchning även sätter `isActive=false`. `subscription` avser platser med
inloggning (betalda prenumerationer och kostnadsfria konton, inklusive sessioner
med webbkakor). Den registrerar fortfarande `testStatus=banned` för förbetalda
API-nycklar men lämnar dem kvar i routningspoolen. Den långsiktiga lösningen är
en åsidosättning per leverantör och per konto; den globala uppräkningen är den
första versionen.

## Anpassade nyckelord för avstängning

Lägg till eller ta bort nyckelord under **Säkerhet → Nyckelord för avstängning**
(lagras som den globala inställningen `customBannedSignals` via
`PATCH /api/settings`). De **läggs till i** den inbyggda listan — de ersätter den
aldrig — och läses in dynamiskt när de sparas (samt vid uppstart) via
`setCustomBannedSignals()`. Varje nyckelord är begränsat till 200 tecken; det
finns ingen gräns för antal element i matrisen.

**⚠ Risk för falska positiva resultat — välj specifika fraser.** Detekteringen är
en enkel delsträngsmatchning mot hela svarskroppen, och en matchning är
**permanent** (ett års spärrtid, manuell återställning). Ett alltför generellt
nyckelord kan stänga av en fullt fungerande anslutning:

- **Dåligt:** `quota`, `limit`, `error`, `denied` — förekommer i många tillfälliga fel.
- **Bra:** fullständiga avstängningsmeddelanden, t.ex. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Föredra den längsta entydiga fras som leverantören returnerar vid en faktisk
avstängning. Om du är osäker bör du först övervaka anslutningens `lastError` och
därefter lägga till den exakta formuleringen.

## Återställa en flaggad anslutning

Terminaltillstånden `banned` / `deactivated` **återställs aldrig automatiskt**
(de är undantagna från den proaktiva återställningscykeln — endast spärrtider för
`unavailable` återställs automatiskt). En operatör måste återställa dem explicit:

1. **Testa anslutningen igen** — åtgärden **Testa** på kontrollpanelen
   (`POST /api/providers/{id}/test`); en lyckad kontroll återställer `testStatus`
   till `active` och rensar felfälten.
2. **Autentisera på nytt/redigera autentiseringsuppgifter** — kör inloggnings-/
   uppdateringsflödet igen för OAuth-leverantörer; rutter för att skapa/importera
   leverantörer sätter `isActive = true`.
3. **Aktivera anslutningen igen** — om den automatiska inaktiveringen satte
   `isActive = false` (omfattning `all`, eller `subscription` för en anslutning
   med OAuth/kakor/session) aktiverar du den igen efter att kontot har åtgärdats.

Det finns ingen separat knapp för att ”rensa avstängningsflaggan” — återställning
sker genom att testa på nytt, autentisera på nytt eller återaktivera, i enlighet
med den allmänna regeln för terminaltillstånd i
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolering av kontrollanrop (test-all för modeller)

Ett **fel med ursprung i ett kontrollanrop** (test-all för modeller/
hälsokontrollanrop som körs inuti `runAsProbe`) tar aldrig bort en anslutning
från poolen (#9817): det **registreras för synlighet** (`last_error`,
`last_error_type`, `error_code`, `last_error_at`) men hoppar över **varje**
ändring av routningstillståndet — spärrtider, terminalstatus (`banned` /
`deactivated` / `credits_exhausted`), låsningar per modell, leverantörens
kretsbrytare, kvotcachen på fem minuter, uppdatering av OAuth-token och
automatisk inaktivering. Endast ett fel i den verkliga sökvägen för förfrågningar
leder till inaktivering. Det registrerade felet gör ett flaggat konto synligt på
kontrollpanelen samtidigt som det fortsätter att hantera trafik.

Den enda beslutspunkten är `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), som används av **varje** plats som skulle
kunna ändra routningstillståndet till följd av ett fel med ursprung i ett
kontrollanrop:

- `markAccountUnavailable` (`auth.ts`) — endast registrering (`lastError` med
  obearbetad text, `lastErrorType`, `errorCode`, `lastErrorAt`; avsiktligt
  **ingen** `backoffLevel`, eftersom det skulle utlösa automatisk nedtrappning
  vid val och radera posten)
- `maybeAutoDisableBannedAccount` — ingen automatisk inaktivering
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (endast
  registrering, inget terminalt `credits_exhausted`), GEO_BLOCKED (ingen
  uteslutning i 24 timmar), MODEL_NOT_FOUND (inget `lockModel`), redundansväxling
  genom kontorotation vid codex 429 (inget `markCodexScopeRateLimited`, inget
  beständigt `rate_limited_until`, ingen rensning av sessionsaffinitet),
  `persistCodexQuotaState` (ingen skrivning av kvottillstånd, ingen
  cacheinvalidering), `recordKeyHealthStatus` (rotatorn för nyckelhälsa
  påverkas inte)
- OAuth-uppdatering — både den proaktiva uppdateringen i exekverarens basklass
  (`base.ts` `execute()`, ingen rotation av uppdateringstoken förbrukas) och den
  reaktiva 401/403-sökvägen i `chatCore` (ingen `expired`-inaktivering)
- `chat.ts` — leverantörens kretsbrytare och kvotcachen på fem minuter
  (`markAccountExhaustedFrom429`) försämras aldrig

Det registrerade felet gör ett flaggat konto synligt på kontrollpanelen
samtidigt som det fortsätter att hantera trafik. Observera: kontrollposten lagrar
den **obearbetade** (oförkortade) feltexten, till skillnad från den verkliga
sökvägens trunkering med `slice(0,100)`.

Operatörer som använder test-all som ett underhållsverktyg kan återställa det
tidigare beteendet (kontrollanropet räknas som en verklig generering) på något av
följande sätt:

- inställningen `probeCanDisable` (`POST /api/settings` med
  `{"probeCanDisable": true}`, eller en direkt redigering av `key_value` i
  databasen), eller
- funktionsflaggan **`PROBE_CAN_DISABLE=true`** (åsidosättning via miljö eller
  databas; har företräde framför inställningen).

Felsäkerhet: om uppslagningen av flaggan eller inställningarna genererar ett
undantag förblir isoleringen PÅ.

## Källfiler

| Område                                           | Fil                                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Signaltabeller + matchning                       | `open-sse/services/accountFallback.ts`                                                                        |
| Terminalisering / persistens                     | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Omfattning för automatisk inaktivering           | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Inbäddad klassificering                          | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Undantag från återställning av terminaltillstånd | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Inläsning av anpassade nyckelord vid körning     | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Inställningsgränssnitt                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
