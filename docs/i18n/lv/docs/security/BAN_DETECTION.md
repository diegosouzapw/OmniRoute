# Account-Ban / Banned-Keyword Detection (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute pārbauda augšējo pakalpojumu sniedzēju kļūdu atbildes, meklējot pazīmes, kas norāda, ka pakalpojumu sniedzēja
**konts ir neatgriezeniski nederīgs** (apturēts / deaktivizēts / bloķēts pakalpojumu sniegšanas noteikumu pārkāpuma dēļ), un, ja
tiek atrasta atbilstība, pārvieto šo savienojumu **terminālā `banned` stāvoklī**, lai tas vairs
netiktu atlasīts pieprasījumiem. To konfigurē iestatījumu kartīte **Drošība → Bloķētie atslēgvārdi**
("Papildu atslēgvārdi, kas aktivizē neatgriezeniskas konta bloķēšanas
noteikšanu. Iebūvētie atslēgvārdi tiek lietoti vienmēr.").

Šajā lapā ir dokumentēts iebūvētais saraksts, noteikšanas process, tā tvērums, veids, kā droši pievienot
pielāgotus atslēgvārdus, un veids, kā atjaunot atzīmētu savienojumu. Pats terminālais
stāvoklis ir daļa no noturības modeļa — skatiet
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminālie stāvokļi").

**Patiesās informācijas avots:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Iebūvētie atslēgvārdi

Šīs 8 apakšvirknes tiek lietotas vienmēr (neņemot vērā reģistru) neatkarīgi no pielāgotā saraksta:

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

> Šis saraksts mainās, pakalpojumu sniedzējiem mainot bloķēšanas paziņojumu formulējumus. Autoritatīvā
> kopija ir `ACCOUNT_DEACTIVATED_SIGNALS` failā `open-sse/services/accountFallback.ts`;
> uzskatiet iepriekš redzamo bloku par momentuzņēmumu.

Tajā pašā failā atrodas divas blakus esošas, **atsevišķas** signālu tabulas, kas _nav_ daļa
no bloķēto atslēgvārdu noteikšanas:

- `CREDITS_EXHAUSTED_SIGNALS` — iztērēti norēķinu līdzekļi/kvota (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminālais `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nav termināls**; pilnvaras atsvaidzināšana var atjaunot darbību.

Piezīme: bieži sastopamas pārejošu kļūdu frāzes, piemēram, **`rate limit`** / `429`, apstrādā
pieprasījumu biežuma ierobežojuma / savienojuma nogaidīšanas mehānisms, un tās **nav** bloķēšanas signāli.

## Noteikšanas process

```
augšējā pakalpojumu sniedzēja kļūdas atbilde
  → pamatteksts pārveidots par virkni un mazajiem burtiem
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [apakšvirknes atbilstība]
  → atbilstība?
      → savienojuma testStatus = "banned"      (neatgriezenisks — 1 gada nogaidīšanas periods, nekad automātiski neatjaunojas)
      → ja iestatījums `autoDisableBannedAccounts` ir ieslēgts un `autoDisableBannedScope`
        ietver šo savienojumu (`all` vai `subscription` OAuth/sīkfailu/sesiju gadījumā)
        → arī isActive = false. Priekšapmaksas API atslēgas paliek aktīvas, ja tvērums ir
        `subscription`.
      → savienojums tiek izlaists konta atlases laikā (kombinētie QUOTA_BLOCKING statusi)
```

- Atbilstības pārbaude ir **reģistrnejutīga apakšvirknes** meklēšana atbildes **pamattekstā**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Neatgriezeniska terminālā stāvokļa `banned` iestatīšana notiek, ja pamattekstā ir bloķēšanas signāls, pie **jebkura
  HTTP statusa** (izmantojot `markAccountUnavailable` → `checkFallbackError`). Šaurākais
  apzīmējums **`deactivated`** (`isActive=false`, ja savienojumam nav
  rezerves API atslēgu) tiek ierakstīts iekļautajā `chatCore.ts` ceļā pie **HTTP 401 / 403**
  (klasificēts, izmantojot `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Ņemiet vērā, ka
  `markAccountUnavailable()` ceļš tam pašam `ACCOUNT_DEACTIVATED` signālam ieraksta _atšķirīgu_ terminālo statusu —
  **`expired`** — (izmantojot
  `resolveTerminalConnectionStatus`), tādēļ viena un tā pati bloķēšana var parādīties kā
  `deactivated` vai `expired` atkarībā no tā, kurš ceļš apstrādāja atbildi. (Vecākā
  koda komentārā teikts "kad 401 pamattekstā ir šīs virknes" — tas
  nepilnīgi raksturo pašreizējo darbību.)
- `banned` savienojums tiek izslēgts no atlases visur, kur tiek filtrēti terminālie statusi
  (`isTerminalConnectionStatus`, kombinētie `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Tvērums — kuri nodrošinātāji tiek skenēti

**Visi nodrošinātāji.** Pārbaude tiek izpildīta vispārīgajā kļūdu apstrādes konveijerā,
caur kuru plūst katrs neveiksmīgs augšupstraumes pieprasījums — tā **nav** ierobežota
tikai ar OAuth/abonementu izgūšanas mehānismiem. Iegūtais terminālais stāvoklis attiecas uz
katru **savienojumu**, nevis nodrošinātāju.

Tomēr iebūvētās _virknes_ ir paredzētas abonementu/OAuth
nodrošinātājiem ar reālu bloķēšanas risku (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). API atslēgas nodrošinātājs aktivizēs detektoru tikai tad, ja tā kļūdas ķermenis
burtiski saturēs kādu no apakšvirknēm.

`autoDisableBannedScope` (`all` | `subscription`, noklusējums `all`) nosaka, vai
atbilstības gadījumā tiek arī iestatīts `isActive=false`. `subscription` nozīmē pieteikšanās tipa vietas
(maksas abonementus un bezmaksas kontus, tostarp tīmekļa sīkfailu sesijas). Tas joprojām
reģistrē `testStatus=banned` priekšapmaksas API atslēgām, taču atstāj tās maršrutēšanas
kopā. Ilgtermiņa risinājums ir katram nodrošinātājam un kontam atsevišķs pārrakstījums; globālais
uzskaitījums ir sākotnējā versija.

## Pielāgoti bloķēšanas atslēgvārdi

Pievienojiet vai noņemiet atslēgvārdus sadaļā **Drošība → Bloķēšanas atslēgvārdi** (tie tiek saglabāti kā globālais
`customBannedSignals` iestatījums, izmantojot `PATCH /api/settings`). Tie tiek **pievienoti**
iebūvētajam sarakstam — tie nekad to neaizstāj — un tiek dinamiski pārlādēti saglabāšanas brīdī (un palaišanas laikā),
izmantojot `setCustomBannedSignals()`. Katra atslēgvārda garums ir ierobežots līdz 200 rakstzīmēm; masīva
garumam ierobežojuma nav.

**⚠ Kļūdaini pozitīva rezultāta risks — izvēlieties specifiskas frāzes.** Noteikšana izmanto neapstrādātu apakšvirknes
atbilstību visā atbildes ķermenī, un atbilstība ir **pastāvīga** (1 gada atdzišanas periods,
manuāla atjaunošana). Pārāk vispārīgs atslēgvārds var bloķēt pilnībā funkcionējošu savienojumu:

- **Slikti:** `quota`, `limit`, `error`, `denied` — tie parādās daudzās pārejošās kļūdās.
- **Labi:** pilni bloķēšanas teikumi, piemēram, `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Dodiet priekšroku garākajai nepārprotamajai frāzei, ko nodrošinātājs atgriež reālas bloķēšanas gadījumā. Ja
neesat pārliecināts, vispirms pārbaudiet savienojuma `lastError`, pēc tam pievienojiet precīzo formulējumu.

## Atzīmēta savienojuma atjaunošana

Terminālie `banned` / `deactivated` stāvokļi **nekad netiek automātiski atjaunoti** (tie ir izslēgti
no proaktīvās atjaunošanas cikla — tikai `unavailable` atdzišanas periodi atjaunojas
automātiski). Operatoram tie ir nepārprotami jānotīra:

1. **Atkārtoti testējiet savienojumu** — informācijas paneļa darbība **Testēt**
   (`POST /api/providers/{id}/test`); veiksmīga pārbaude atiestata `testStatus` uz
   `active` un notīra kļūdas laukus.
2. **Atkārtoti autentificējieties / rediģējiet akreditācijas datus** — OAuth nodrošinātājiem atkārtoti izpildiet pieteikšanās
   / atsvaidzināšanas plūsmu; nodrošinātāju izveides/importēšanas maršruti iestata `isActive = true`.
3. **Atkārtoti iespējojiet savienojumu** — ja automātiskā atspējošana iestatīja `isActive = false`
   (tvērums `all` vai `subscription` OAuth/sīkfailu/sesijas savienojumam),
   pēc konta salabošanas atkal to ieslēdziet.

Nav atsevišķas pogas „notīrīt bloķēšanas karodziņu” — atjaunošana notiek ar atkārtotu testēšanu, atkārtotu autentificēšanos vai
atkārtotu iespējošanu atbilstoši vispārīgajam terminālo stāvokļu noteikumam dokumentā
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Pārbaudes izolācija (modeļu visu vienumu testēšana)

**Pārbaudes izraisīta kļūme** (modeļu visu vienumu testēšanas / darbspējas pārbaudes nosūtījumi, kas izpildīti
`runAsProbe` iekšienē) nekad neizņem savienojumu no kopas (#9817): tā tiek
**reģistrēta pārskatāmībai** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), taču izlaiž **katru** maršrutēšanas izmaiņu — atdzišanas periodus, terminālo
statusu (`banned` / `deactivated` / `credits_exhausted`), katra modeļa bloķēšanu,
nodrošinātāja ķēdes pārtraucēju, 5 minūšu kvotu kešatmiņu, OAuth pilnvaras atsvaidzināšanu
un automātisko atspējošanu. Deaktivizēšanu izraisa tikai kļūme reāla pieprasījuma ceļā. Reģistrētā
kļūda padara atzīmēto kontu redzamu informācijas panelī, kamēr tas turpina
apkalpot datplūsmu.

Vienīgais lēmuma punkts ir `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), ko izmanto **katrā** vietā, kura varētu
mainīt maršrutēšanas stāvokli pārbaudes izraisītas kļūmes dēļ:

- `markAccountUnavailable` (`auth.ts`) — tikai reģistrēšana (`lastError` neapstrādātais teksts,
  `lastErrorType`, `errorCode`, `lastErrorAt`; apzināti **bez**
  `backoffLevel`, kas aktivizētu automātisko mazināšanu atlases laikā un dzēstu
  ierakstu)
- `maybeAutoDisableBannedAccount` — bez automātiskas atspējošanas
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (tikai reģistrēšana,
  bez terminālā `credits_exhausted`), GEO_BLOCKED (bez 24 stundu izslēgšanas),
  MODEL_NOT_FOUND (bez `lockModel`), Codex 429 kontu rotācijas kļūmjpārlēce
  (bez `markCodexScopeRateLimited`, bez saglabāta `rate_limited_until`, bez
  sesijas piesaistes notīrīšanas), `persistCodexQuotaState` (bez kvotas stāvokļa ierakstīšanas,
  bez kešatmiņas nederīguma iestatīšanas), `recordKeyHealthStatus` (atslēgu darbspējas rotators
  netiek skarts)
- OAuth atsvaidzināšana — gan proaktīvā atsvaidzināšana izpildītāja bāzē
  (`base.ts` `execute()`, netiek patērēta atsvaidzināšanas pilnvaras rotācija), gan
  reaktīvais 401/403 ceļš `chatCore` (bez `expired` deaktivizēšanas)
- `chat.ts` — nodrošinātāja ķēdes pārtraucējs un 5 minūšu kvotu kešatmiņa
  (`markAccountExhaustedFrom429`) nekad netiek pasliktināti

Reģistrētā kļūda padara atzīmēto kontu redzamu informācijas panelī,
kamēr tas turpina apkalpot datplūsmu. Piezīme: pārbaudes ierakstā tiek glabāts **neapstrādāts**
(nesaīsināts) kļūdas teksts atšķirībā no reālā ceļa `slice(0,100)` saīsinājuma.

Operatori, kuri izmanto visu vienumu testēšanu kā uzturēšanas rīku, var atjaunot vēsturisko
darbību (pārbaude tiek uzskatīta par reālu ģenerēšanu), izmantojot kādu no tālāk norādītajām iespējām:

- iestatījums `probeCanDisable` (`POST /api/settings` ar
  `{"probeCanDisable": true}` vai tieša `key_value` datubāzes rediģēšana), vai
- funkcionalitātes karodziņš **`PROBE_CAN_DISABLE=true`** (vides mainīgais vai datubāzes pārrakstījums; tam ir prioritāte pār
  iestatījumu).

Kļūmdrošība: ja karodziņa vai iestatījumu uzmeklēšana izraisa kļūdu, izolācija paliek IESLĒGTA.

## Avota faili

| Aspekts                                  | Fails                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signālu tabulas + atbilstības noteikšana | `open-sse/services/accountFallback.ts`                                                                        |
| Terminālizēšana / saglabāšana            | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Automātiskās atspējošanas tvērums        | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Iekļautā klasifikācija                   | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Termināļa stāvokļa atkopšanas izņēmums   | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Pielāgoto atslēgvārdu ielāde izpildlaikā | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Iestatījumu lietotāja saskarne           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
