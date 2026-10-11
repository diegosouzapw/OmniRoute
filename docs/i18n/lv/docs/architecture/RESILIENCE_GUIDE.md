# Resilience Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ir trīs atšķirīgi, bet savstarpēji saistīti noturības mehānismi. Katram no tiem ir atšķirīgs tvērums un mērķis. Atkodojot maršrutēšanas darbību, nošķiriet tos.

![Trīs līmeņu noturības modelis](../diagrams/exported/resilience-3layers.svg)

> Avots: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Pakalpojumu sniedzēja ķēdes pārtraucējs

**Tvērums:** viss pakalpojumu sniedzējs (piemēram, `glm`, `openai`, `anthropic`).

**Mērķis:** pārtraukt datplūsmas sūtīšanu pakalpojumu sniedzējam, kuram atkārtoti rodas kļūmes augšupējā sistēmā vai pakalpojuma līmenī.

**Implementācija:**

- Pamatklase: `src/shared/utils/circuitBreaker.ts`
- Savienojumi: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Statusa API: `GET /api/monitoring/health`
- Atiestatīšanas API: `POST /api/resilience/reset`
- Ietvari: `open-sse/services/accountFallback.ts`
- DB tabula: `domain_circuit_breakers`

**Stāvokļi:**

- `CLOSED` — atļauta normāla datplūsma
- `DEGRADED` — datplūsma joprojām ir atļauta, bet tiek uzskaitītas biežākas pakalpojumu sniedzēja kļūmes
- `OPEN` — pakalpojumu sniedzējs ir īslaicīgi bloķēts; kombinētā maršrutēšana to izlaiž
- `HALF_OPEN` — atiestatīšanas noildze ir beigusies; atļauts pārbaudes pieprasījums

**Konfigurējamās noklusējuma vērtības (`open-sse/config/constants.ts`, pieejamas sadaļā Dashboard → Settings → Resilience):**

| Klase       | Degradēts pēc | Atveras pēc | Atiestatīšanas noildze |
| ----------- | ------------- | ----------- | ---------------------- |
| OAuth       | 5 kļūmēm      | 8 kļūmēm    | 60s                    |
| API atslēga | 7 kļūmēm      | 12 kļūmēm   | 30s                    |
| Lokāls      | atvasināts    | 2 kļūmēm    | 15s                    |

`degradationThreshold` nosaka, kad pakalpojumu sniedzējs pāriet stāvoklī `DEGRADED`; `failureThreshold` nosaka, kad ķēde tiek atvērta un pakalpojumu sniedzējs tiek izlaists. Lokālo pakalpojumu sniedzēju profili vēl nav pieejami noturības iestatījumu lapā.

**Aktivizēšanas kodi:** tikai pakalpojumu sniedzēja līmeņa statusi `[408, 500, 502, 503, 504]`. NEAKTIVIZĒJIET konta līmeņa kļūdu dēļ (vairums 401/403/429 — tās attiecas uz nogaidīšanas periodu vai bloķēšanu).

**Pasīva atkopšana:** kad beidzas `OPEN` termiņš, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atjaunina stāvokli uz `HALF_OPEN`. Fona taimeris nav nepieciešams.

---

### Izvēles globālais pakalpojumu sniedzēja nogaidīšanas periods (laika loga vārteja)

Ceturtais, **pēc izvēles aktivizējams** slānis (`PROVIDER_COOLDOWN_ENABLED`, pēc noklusējuma **izslēgts**) uztur
atmiņu starp pieprasījumiem par pakalpojumu sniedzējiem, kuriem rodas kļūmes,
failā `open-sse/services/providerCooldownTracker.ts`; kombinēto mērķu
noteikšana izmanto šo informāciju, lai secīgi kombinētie pieprasījumi atkārtoti nepārbaudītu pakalpojumu sniedzēju, kuram tikko
radās kļūme. Pakalpojumu sniedzēja līmeņa ieraksti ievēro `PROVIDER_PROFILES` laika loga vārteju:

| Profils     | aktivizējas pēc (`providerFailureThreshold`) | periodā (`providerFailureWindowMs`) | nogaida (`providerCooldownMs`) |
| ----------- | -------------------------------------------: | ----------------------------------: | -----------------------------: |
| OAuth       |                                         `10` |                             `15min` |                         `5min` |
| API atslēga |                                         `15` |                             `30min` |                        `10min` |

Kamēr slieksnis nav sasniegts, pakalpojumu sniedzējs **netiek** uzskatīts par nogaidīšanas stāvoklī esošu; veiksmīgs
pieprasījums notīra logu. Savienojuma līmeņa ierakstiem (`provider:connectionId`) joprojām tiek izmantota
eksponenciālā `minRetryCooldownMs → maxRetryCooldownMs` atkāpšanās. Pārrakstīšanas:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresijas aizsardzība: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Savienojuma nogaidīšanas periods

**Tvērums:** viens pakalpojumu sniedzēja savienojums/konts/atslēga.

**Mērķis:** izlaist vienu nederīgu atslēgu, kamēr citi tā paša pakalpojumu sniedzēja savienojumi turpina apkalpot pieprasījumus.

**Implementācija:**

- Atzīmēšana par nepieejamu: `src/sse/services/auth.ts::markAccountUnavailable()`
- Atlase: `getProviderCredentials*` tajā pašā failā
- Nogaidīšanas perioda aprēķins: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Iestatījumi: `src/lib/resilience/settings.ts`

**Lauki katram savienojumam:**

- `rateLimitedUntil` — laikspiedols, līdz kuram ir spēkā nogaidīšanas periods
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponenciālās atkāpšanās skaitītājs

**Noklusējuma nogaidīšanas periodi:**

- OAuth bāzes periods: 5 s
- API atslēgas bāzes periods: 3 s
- API atslēgas 429: priekšroka tiek dota augšupstraumes `Retry-After`/atiestatīšanas galvenēm/parsējamam atiestatīšanas tekstam
- Atkāpšanās: `baseCooldownMs * 2 ** failureIndex`

**Aizsardzība pret vienlaicīgu pieprasījumu lavīnu:** novērš to, ka vienlaicīgas kļūmes pārmērīgi pagarina nogaidīšanas periodu vai divreiz palielina `backoffLevel`.

**Straumes satura apstāšanās neaktivizē konta nogaidīšanas periodu.** Kad satura apstāšanās uzraugs
(`open-sse/utils/streamHandler.ts`) pārtrauc straumi, kas noteiktajā laikā nav nosūtījusi
modeļa izvadi, `markAccountUnavailable()` reģistrē kļūdu savienojumam, bet neiestata
nogaidīšanas periodu: apstāšanās attiecas uz konkrēto pieprasījumu un visbiežāk ir ilgs spriešanas posms, kurā
vēl nav izvades. Operatori var to atkal iespējot ar `resilienceSettings.streamStallCooldown.enabled`
(noklusējums `false`).

**Spriešanas kadri atsāk satura apstāšanās laika budžetu.** Spriešanas modelis var domāt
vairākas minūtes pirms pirmās redzamās tekstvienības: Claude straumē `thinking_delta` kadrus, kuru
domāšanas teksts var būt tukšs, bet Responses API vienu pēc otra straumē spriešanas vienumus.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) atpazīst
šos kadrus, un uzraugs pēc katra no tiem atsāk savu laika budžetu, nevis atceļ
izpildi. Tie joprojām nav modeļa izvade, tāpēc izpilde, kas beidzas tikai ar spriešanu, joprojām tiek
ziņota kā tukša, savukārt izpilde, kas pārtrauc spriešanu un turpina sūtīt tikai darbības signālus, joprojām aktivizē
uzraugu.

Kiro binārie `reasoningContentEvent` kadri ar netukšu parakstu saglabā šo
spriešanas aktivitāti izpildītājā kā tukšu `reasoning_content` izmaiņu. Paraksts netiek
pārsūtīts. Metadati, nepilnīgi kadri un tukši paraksti neatsāk
satura laika budžetu; neatkarīgais aktīvās straumes taimauts un klienta atcelšana joprojām
ir spēkā (`open-sse/executors/kiro/reasoning.ts`).

**Terminālie stāvokļi (NAV nogaidīšanas periodi):**

- `banned` — iestata aizliegta atslēgvārda/konta aizlieguma noteikšana (skatiet [AIZLIEGUMA NOTEIKŠANA](../security/BAN_DETECTION.md)), kā arī trīs secīgi augšupstraumes atteikumi atsevišķiem pieprasījumiem (`request_rejected`, piem., Anthropic OAuth 403 "Pieprasījums nav atļauts" — `open-sse/services/requestRejectedStreak.ts`); viens atteikums tikai aktivizē savienojuma nogaidīšanas periodu
- `expired` (pēc ierobežota atkārtotu mēģinājumu skaita pāriet terminālā stāvoklī — `EXPIRED_RETRY_MAX = 3` ar eksponenciālu atkāpšanos — lai pārejošas OAuth kļūdas varētu izzust pašas, pirms konts tiek neatgriezeniski deaktivizēts)
- `credits_exhausted`

Šie stāvokļi saglabājas, līdz tiek mainīti akreditācijas dati vai operators tos atiestata. Nepārrakstiet terminālos stāvokļus ar pārejošu nogaidīšanas perioda stāvokli.

**Atliktā atkopšana:** kad `rateLimitedUntil` ir pagājis, savienojums atkal kļūst piemērots izmantošanai. Pēc veiksmīgas izmantošanas `clearAccountError()` notīra visus kļūdu laukus.

### Claude OAuth lietojuma slieksnis: zemākas prioritātes kanāls + sesijas ierobežojuma atiestatīšana

**Tvērums:** viens Claude abonementa (OAuth) savienojums. Abas funkcijas ir **atsevišķi
iespējojamas katram savienojumam** (Rediģēt savienojumu → Claude sadaļa → `lowPriorityMode` / `autoLimitReset` laukā
`providerSpecificData`; abas pēc noklusējuma ir izslēgtas) un atbilst Claude Code komandām `/low-priority` un
`/limit-reset` (sakaru protokols fiksēts no Claude Code 2.1.263).

**Implementācija:**

- Stāvokļu automāts + atbildes klasifikācija: `open-sse/services/claudeLowPriority.ts`
- Atiestatīšanas statusa/pretenzijas klients: `open-sse/services/claudeLimitReset.ts`
- Izpildītāja āķis (galvenes ievietošana + atkārtots mēģinājums ar to pašu kontu): `open-sse/executors/base.ts::execute()`
- Iespējošanas iestatījuma saglabāšana: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Aktivizētājs:** 5 stundu lietojuma slieksnis — `429`, kura galvenēs ir
`anthropic-ratelimit-unified-status: rejected` un, ja konts ir piemērots,
`anthropic-ratelimit-unified-slow-offer: treatment`. Pirms pirmās sliekšņa
429 atbildes nekas netiek sūtīts; īslaicīga 429 atbilžu sērija bez vienotajām galvenēm tiek apstrādāta pa parasto nogaidīšanas perioda ceļu.

**Zemākas prioritātes kanāls** (`lowPriorityMode`):

- Pie sienas 429 izpildītājs pieņem piedāvājumu un nekavējoties atkārtoti mēģina ar **to pašu**
  kontu, izmantojot `anthropic-usage-limit: slow`; josla paliek aktīva līdz paziņotajam
  `anthropic-ratelimit-unified-reset` (+60 s pielaide), un katrs pieprasījums šajā logā ietver
  šo galveni. Pārtvertais 429 nekad nesasniedz `handleChatCore`, tāpēc savienojumam
  **netiek** piemērots atdzišanas periods un tas netiek nomainīts rotācijas ceļā.
- `anthropic-ratelimit-unified-slow-status` turpmākajās atbildēs: `active` / `not_needed`
  saglabā joslu; `slot_busy` (429) vai `529` nogaida servera norādīto
  `anthropic-ratelimit-unified-slow-retry-after` (pēc noklusējuma 20 s, ierobežojums 5–600 s, ±30% nejauša nobīde)
  un mēģina vēlreiz, ievērojot `anthropic-ratelimit-unified-slow-max-wait` (pēc noklusējuma 20 min, ierobežojums
  1 min–6 h) — pēc tā pārsniegšanas josla beidzas, un 10 minūšu atdzišanas periods bloķē atkārtotu pieņemšanu. Turklāt
  gaidīšanas laiku ierobežo paša pieprasījuma atlikušais augšupstraumes sākšanas taimauts
  (`resolveFetchStartTimeout`, pēc noklusējuma 10 min), atņemot 5 s rezervi: bez šī ierobežojuma
  noklusējuma 20 minūšu maksimālais gaidīšanas laiks pārsniegtu pieprasījuma dzīves ilgumu, un gaidīšana tiktu pārtraukta
  tās laikā, parādot `TimeoutError`, nevis korektu `max_wait` izbeigšanu un atdzišanas periodu.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 h loga pārslēgšanās vai
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (kas to pabeidz kā
  `extra_usage` pie jebkura statusa, jo maksas pārtēriņš tagad sedz sienu) izbeidz joslu; pēc tam
  atbilde nonāk parastajā atdzišanas apstrādes ceļā. `budget_exhausted` tiek atcerēts līdz
  paziņotajai budžeta atiestatīšanai (≤ 8 dienas).
- Sienas pārbaude tiek veikta pēc paša izpildītāja 400 izraisītajiem atkārtotajiem mēģinājumiem viena mēģinājuma ietvaros (konteksta
  rediģēšana, domāšanas/piepūles ierobežošana, parametru automātiskā apguve), tāpēc sienas 429, kas parādās tikai
  kādā no šiem atkārtotajiem mēģinājumiem, joprojām tiek pārtverts, nevis nonāk atdzišanas apstrādes ceļā.
- Stāvoklis katram savienojumam tiek glabāts atmiņā (restartēšana prasa vienu papildu sienas 429, lai to atkārtoti pieņemtu).

**Sesijas ierobežojuma atiestatīšana** (`autoLimitReset`, tiek mēģināta pirms joslas, ja abi ir ieslēgti):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloks; ja `arm: "reset"` un `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ar
  `{ "program": "juniper_tide" }` (organizācijas UUID no
  `providerSpecificData.organizationUUID`, rezerves variants no sāknēšanas datiem).
- `result: reset|not_limited` → pieprasījums tiek atkārtots pilnā ātrumā (bez lēnās darbības galvenes).
  `already_used` / `not_offered` saglabā atmiņā `next_available_at` (pēc noklusējuma viena nedēļa); jebkuras
  kļūmes gadījumā tiek piemērota 15 minūšu nogaidīšana. Atiestatīšana ir pieejama reizi nedēļā un joprojām tiek ieskaitīta
  nedēļas ierobežojumā.

Regresiju aizsargi: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sesijas piesaiste (#7274)

**Tvērums:** viena klienta sesija (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` galvene), kas piesaistīta vienam savienojumam **jebkuram** nodrošinātājam.

**Mērķis:** saglabāt vairāku secīgu pieprasījumu aģentu (Claude Code, aider, pielāgoti aģenti) tajā pašā kontā starp pieprasījumiem, samazinot konteksta zudumu starp kontiem un atkārtotus aukstās palaišanas 429 nodrošinātājiem ar konta līmeņa sesijas stāvokli.

**Implementācija:**

- TTL noteikšana: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Piesaistes atlase/izveide: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Galvenes izgūšana (vispārīga, jebkuram nodrošinātājam): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Pastāvīgi glabāta piesaistes tabula: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Iestatījums: `sessionAffinityTtlMs` (globālais TTL milisekundēs, `0` atspējo) — `src/lib/db/settings.ts`. Pārdēvēts no tikai Codex paredzētā `codexSessionAffinityTtlMs` ar migrāciju `124_generic_session_affinity_ttl.sql`, kas jebkuru iepriekš konfigurēto Codex TTL pārnes kā jauno noklusējuma vērtību.

Pirms #7274 `resolveSessionAffinityTtlMs()` nekavējoties atgrieza `0` katram nodrošinātājam, izņemot `codex`, tāpēc TTL iestatījums (un sesijas galvenes) neietekmēja nevienu citu nodrošinātāju, lai gan piesaistes mehānisms un galveņu izgūšana jau bija no nodrošinātāja neatkarīgi. Labojumā šī agrīnā atgriešana tika noņemta; tagad TTL tiek vienādi piemērots katram nodrošinātājam, tiklīdz tā globālā vērtība ir iestatīta virs `0`.

Trīs sesijas piesaistes galvenes nekad netiek pārsūtītas augšupstraumei — izpildītāji izveido savas augšupstraumes galvenes no nulles, nevis pārsūta klienta galvenes, tāpēc tās paliek tikai iekšēji korelācijas identifikatori.

### Ekskluzīvas pārvaldīto sesiju savienojumu nomas

**Tvērums:** vienam aktīvam pārvaldītam HTTP klientam/sesijai pieder viens prasībām atbilstošs OmniRoute savienojums.

**Mērķis:** nodrošināt noturīgas ekskluzīvas savienojuma īpašumtiesības klientiem, kuriem starp pieprasījumiem nepieciešama stingra maršrutēšanas
robeža. Tas atšķiras no sesijas piesaistes, kas ir nesaistoša nepārtrauktības preference:
ekskluzīva noma saglabā dzīves cikla stāvokli SQLite, nodrošina aktīvā īpašnieka un
aktīvā savienojuma globālo unikalitāti un noraida novecojušu paaudzi pirms nosūtīšanas nodrošinātājam.

Funkcija katrai API atslēgai ir jāiespējo atsevišķi. Pārvaldītai atslēgai jābūt tvērumam `lease:exclusive` un
skaidri norādītam netukšam `allowedConnections` sarakstam. Dzīves cikla galapunktu var izmantot jebkurš HTTP klients; nav
nepieciešams klienta nosaukums, lietotāja aģents, nodrošinātājs, OAuth metode vai modelis. Noma attiecas uz savienojumu,
nevis modeli, tāpēc modeļa maiņa saglabā piesaisti, kamēr savienojums joprojām ir parastā kārtībā
piemērots. Parastie modeļa, kvotas, darbspējas, atdzišanas un atļauto savienojumu saraksta noteikumi joprojām ir noteicošie un var
pārvirzīt to pašu paaudzi uz citu brīvu, prasībām atbilstošu savienojumu.

Dzīves cikls tiek pārvaldīts, izmantojot `POST /api/v1/session-leases` ar JSON darbībām `acquire`, `renew` un `release`.
Pārvaldītie inferenču pieprasījumi ietver necaurredzamo `X-OmniRoute-Lease-Owner` vērtību un precīzu
`X-OmniRoute-Lease-Generation`. Īpašnieka vērtība sākas ar `vlo_`, kam seko 43 base64url rakstzīmes; tiek
glabāts tikai tās SHA-256 jaucējkods. Katra galīgās nosūtīšanas barjera tiek piesaistīta arī autentificētās API atslēgas ID un
aktīvā savienojuma ID. Nomas vadības galvenes tiek noņemtas no žurnāliem, saglabātajiem pieprasījumu momentuzņēmumiem un
augšupstraumes izpildītāja galvenēm.

Ja parastajai maršrutēšanai ir piemēroti pārvaldītie kandidāti, taču katru brīvo kandidātu aizņem
aktīva ārēja noma, OmniRoute atgriež HTTP `429`, kodu lease-capacity-unavailable,
stāvokli waiting-for-capacity un ierobežotu `Retry-After` vērtību, kas atvasināta no agrākā attiecīgā termiņa beigām.
Ja parastajā gadījumā nav neviena piemērota kandidāta, tā nav nomas konkurence, un tiek saglabāta esošā maršrutēšanas kļūdu semantika.

Saistītie mehānismi joprojām ir nodalīti:

- OAuth sesiju aizņemtība ir procesa līmeņa elastīga sadale OAuth kontiem.
- Kontu semafori piešķir pieprasījumu paralēlās izpildes atļaujas, kuru darbība beidzas, kad pieprasījums ir pabeigts.
- Ekskluzīvas pārvaldīto sesiju nomas nodrošina noturīgas dzīves cikla īpašumtiesības ar paaudzes barjeru.

---

## 3. Modeļa bloķēšana

**Tvērums:** nodrošinātāja + savienojuma + modeļa trijnieks.

**Atslēgas tvērums pēc statusa:** kļūmes statuss nosaka, kurā atslēgā tiek ierakstīta bloķēšana
(`resolveLockoutScope()` failā `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvotas vai piekļuves tiesību signāls — bloķē **kvotas saimi**:
  codex gadījumā visu `codex` / `spark` tvērumu (katru savienojuma `gpt-5*` modeli),
  bet citiem nodrošinātājiem — `getQuotaScopedModelForProvider()`.
- `404` bloķē konkrēto modeli (`getModelLockKey()` sašaurina `not_found`).
- Jebkurš cits statuss — `5xx` transporta/servera kļūmes un OmniRoute kvalitātes
  validācijas ģenerētais `502` — bloķē tikai **precīzo**
  nodrošinātāja/savienojuma/modeļa trijnieku. Kļūdaina viena modeļa straume nav
  pierādījums par konta kvotu; pirms šī noteikuma viena tukša atbilde no
  `codex/gpt-5.6-luna` uz 2–30 minūtēm (ar pieaugošu ilgumu) izņēma no
  maršrutēšanas visus attiecīgā savienojuma `gpt-5*` modeļus, lai gan tā kvota
  nebija skarta.
- Izsaucēja nepārprotami norādītajai `scope` opcijai vienmēr ir prioritāte (Antigravity nodod `"exact"`).

**Mērķis:** nepieļaut visa savienojuma atspējošanu, ja nav pieejams vai kvotas ierobežojumu ir sasniedzis tikai viens modelis.

**Piemēri:**

- Nodrošinātāji ar kvotām katram modelim, kas atgriež 429
- Lokālie nodrošinātāji, kas atgriež 404 vienam trūkstošam modelim
- Konkrētam nodrošinātājam raksturīgas režīma/modeļa atļauju kļūmes (piemēram, Grok režīmi)

**Implementācija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modeļu atdzišanas periodu informācijas panelis (v3.8.0)

UI: Iestatījumi → Modeļu atdzišanas periodi (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Uzskaita aktīvās bloķēšanas ar šādu informāciju: nodrošinātājs, savienojums, modelis, iemesls, expiresAt. Operatori kartītē var manuāli atkārtoti iespējot modeli.

**REST API:**

- `GET /api/resilience/model-cooldowns` — uzskaitīt aktīvās bloķēšanas
- `DELETE /api/resilience/model-cooldowns` — manuāla atkārtota iespējošana. Pamatteksts: `{provider, connection, model}`. Autorizācija: pārvaldības.

### Atdzišanas periodu pārvaldnieks

UI: Uzraudzība → Atdzišanas periodu pārvaldnieks (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Viena lapa katram savienojumam, kas īslaicīga iemesla dēļ ir izņemts no maršrutēšanas, tā vietā, lai
atvērtu katra nodrošinātāja lapu. Tajā tiek uzskaitīti savienojumu atdzišanas periodi, modeļu bloķēšanas un terminālie
stāvokļi, un tos var notīrīt katram savienojumam, atlasītai kopai vai visiem nodrošinātāja savienojumiem,
kā arī var rediģēt visbiežāk pielāgotos atdzišanas periodu noteikumus: `streamStallCooldown.enabled` un OAuth / API atslēgas
`connectionCooldown` bāzes atdzišanas periodu un maksimālo atkāpšanās soļu skaitu (saglabājot ar
`PATCH /api/resilience`). Terminālie stāvokļi (`banned`, `expired`, `credits_exhausted`) tiek
uzskaitīti, bet šeit nekad netiek notīrīti.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autorizācija: pārvaldības):

- `GET /api/resilience/cooldowns[?provider=]` — savienojumi ar statusu, atlikušo atdzišanas periodu,
  atkāpšanās līmeni, pēdējās kļūdas tipu un modeļu bloķēšanām (bez akreditācijas datiem)
- `POST /api/resilience/cooldowns` — pamatteksts `{connectionIds: string[]}` vai
  `{all: true, provider?}`; atgriež `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Bloķēšanas iestatījumu UI + atkopšana ar samazinājumu pēc sekmīga pieprasījuma (v3.8.23)

Modeļa bloķēšana no vienmēr ieslēgtas, kodā fiksētas darbības tika pārveidota par pilnībā konfigurējamu,
pēc izvēles iespējojamu funkciju ar savu iestatījumu kartīti un pašatjaunojošu atkopšanas mehānismu.

**Iestatījumu kartīte:** Iestatījumi → Modeļa bloķēšana
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tā ir **atšķirīga** no iepriekš minētās tikai lasāmās `ModelCooldownsCard` (kas tikai
_uzskaita_ aktīvās bloķēšanas) — jaunajā kartītē tiek _konfigurēti parametri_. Noklusējuma
vērtības atrodas `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Iestatījums             | Noklusējums                      | Nozīme                                                                |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `enabled`               | `false`                          | Galvenais slēdzis — modeļa bloķēšana pēc noklusējuma ir **izslēgta**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Augšupstraumes statusi, kas tiek uzskatīti par modeļa līmeņa kļūmi.   |
| `baseCooldownMs`        | `120_000` (120 s)                | Sākotnējais bloķēšanas ilgums pirmajai kļūmei.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskalētā atdzišanas perioda maksimālā robeža.                         |
| `maxBackoffSteps`       | `10`                             | Maksimālais eksponenciālās atkāpšanās eskalācijas soļu skaits.        |
| `useExponentialBackoff` | `true`                           | Vai atkārtotas kļūmes eksponenciāli pagarina atdzišanas periodu.      |

Iestatījumi tiek saglabāti parastajā iestatījumu krātuvē un validēti, izmantojot
noturības iestatījumu shēmu; kartīte ierobežo `baseCooldownMs`/`maxCooldownMs`
(ar `maxCooldownMs ≥ baseCooldownMs`) un `maxBackoffSteps`.

**Atkopšana ar samazinājumu pēc sekmīga pieprasījuma:** atkopšana **nav** balstīta tikai uz taimera termiņa beigām. Sekmīga
atbilde pakāpeniski samazina modeļa kļūmju skaitu, lai modelim, kas atkopies
perioda vidū, eskalācija tiktu pārtraukta (un bloķēšana noņemta), pirms būtu beidzies tā taimeris. Ja kombinācijas
mērķis ir sekmīgs, `open-sse/services/combo.ts` izsauc `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), kas **uz pusi samazina** saglabāto
`failureCount` (`Math.floor(failureCount / 2)`); kad tas sasniedz `0`, bloķēšanas
ieraksts tiek pilnībā dzēsts. Atbilstošā funkcija `recordModelLockoutFailure()`
palielina skaitu (un pagarina atdzišanas periodu), ja kļūmes notiek
eskalācijas logā. Šī samazināšana pēc sekmīga pieprasījuma papildina vienkāršu taimera termiņa beigšanos —
jebkurš no šiem ceļiem var atkārtoti iespējot modeli.

**Stāvoklis:** bloķēšanas tiek glabātas **atmiņā** (katram procesam atsevišķās `Map`
struktūrās ar `ModelLockoutEntry`, kuru atslēga ir `provider:connectionId:model`, bet precīza tvēruma bloķēšanām —
`provider:connectionId:exact:model`), un netiek saglabātas
DB — restartēšanas laikā tās tiek zaudētas. _Iestatījumi_ tiek saglabāti; aktīvais
bloķēšanas _stāvoklis_ ir īslaicīgs.

---

## 4. Kvotas koplietošanas vienlaicīguma kontrole (v3.8.36)

Abonementu konti (GLM, MiniMax u.c.) bieži pieņem tikai ~1–3 vienlaicīgus
pieprasījumus; šī skaita pārsniegšana izraisa 429 atbildes un atdzišanas periodus. Tas ir īpaši aktuāli
**kvotas koplietošanas** (`qtSd/…`) kombinācijās, kur vairākas API atslēgas koplieto vienu augšupstraumes
kontu. Trīs slāņi novērš koplietota konta pārpludināšanu.

### Vienlaicīguma ierobežojums katram savienojumam (`max_concurrent`)

Katram nodrošinātāja savienojumam var norādīt `max_concurrent` augšējo robežu
(`provider_connections.max_concurrent`, iestatāma savienojuma modālajā logā / API / DB).
Atstājiet to tukšu, lai nepiemērotu ierobežojumu. Šis ir vienīgais iestatījums, kas vada tālāk aprakstīto serializācijas
slāni — iestatiet to atbilstoši konta faktiskajam vienlaicīgumam (piem., GLM ~1, MiniMax ~2).

### Vienlaicīguma ierobežojumi katram modelim (`modelConcurrency`)

Savienojumam tā `rateLimitOverrides` kartē var papildus norādīt precīzus vienlaicīguma
ierobežojumus katram modelim:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Iestatiet tos savienojuma modālajā logā (**Ātruma ierobežojumu pārrakstīšana → Vienlaicīguma
ierobežojumi katram modelim**, pa vienam `model=cap` katrā rindā) vai izmantojot
`PATCH /api/providers/[id]` ar tādu pašu JSON struktūru. Atslēgu semantika:

- **Visam savienojumam un konkrētam modelim:** `maxConcurrent` joprojām ir koplietotā
  augšējā robeža visam savienojumam. Ja piemērojami abi ierobežojumi, abas piekļuves atļaujas tiek iegūtas
  atomāri tajā pašā saliktajā vārtejā
  (`global → provider → account → model`); faktisko darbību nosaka
  stingrākais piemērojamais ierobežojums.
- **Precīza modeļa atslēgas atbilstība:** atslēga ir modeļa virkne, kas pēc maršrutēšanas atrisināšanas tiek nodota
  izpildītājam — parasti tas ir vienkāršs augšupstraumes modeļa ID
  (`glm-5`), nevis klienta puses `provider/model` aizstājvārds (`zai/glm-5`
  neatbilst `glm-5`). Vērtības ir pozitīvi veseli vienlaicīgo pieprasījumu ierobežojumi.
- **Lokāla rindošana, bez noteikšanas:** pārsnieguma pieprasījumi tiek ievietoti lokālā rindā, izmantojot
  esošo rindas/noildzes semantiku (tipizētas `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` uzņemšanas kļūdas). OmniRoute nenosaka un
  neizsecina augšupstraumes politiku — tas piemēro tieši tos ierobežojumus, kurus
  konfigurējis operators. Piesātināta modeļa vārteja nekad neatspējo nodrošinātāju un nekad
  neizraisa pastāvīgu modeļa bloķēšanu; augšupstraumes 429/atdzišanas/atkāpšanās darbība
  joprojām kalpo kā kļūdu rezerves mehānisms.
- **Katram savienojumam, katram procesam:** ierobežojumi attiecas uz katru datubāzes savienojumu
  un tiek glabāti atmiņā, tāpēc divi savienojumi, kas atkārtoti izmanto vienu un to pašu augšupstraumes API atslēgu,
  savstarpēji nekoordinējas.
- **Nekonfigurēts nozīmē nemainīts:** kartes izlaišana (vai informācijas paneļa
  lauka atstāšana tukša) nepievieno modeļa vārteju. Konfigurācijas piemērs,
  neapgalvojot nekādu universālu nodrošinātāja ierobežojumu:

```text
glm-5=1
glm-4.7=3
```

### Kvotas koplietošanas pieprasījumu serializācija

Ja kvotas koplietošanas nosūtīšana ir vērsta uz savienojumu, kuram norādīts pozitīvs
`max_concurrent`, vienlaicīgie pieprasījumi šim **kontam** tiek serializēti, izmantojot
katra savienojuma semaforu (atslēga `qsconn:<connectionId>`): pārsnieguma pieprasījumi **gaida
rindā**, nevis pārpludina kontu. Tas darbojas **kļūmes gadījumā atvērti** — piesātināta
rinda vai noildze turpina izpildi bez vietas iegūšanas, nevis noraida nosūtāmu
pieprasījumu. Pārslēdziet to sadaļā **Iestatījumi → Noturība → Kvotas koplietošanas vienlaicīgums
katram savienojumam** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, pēc noklusējuma
ieslēgts). Bez `max_concurrent` ierobežojuma darbība nemainās.

> Kvotas koplietošanas maršrutēšanas vārteja (`selectQuotaShareTarget`, DRR + P2C) pati darbojas
> kļūmes gadījumā atvērti un tikai _samazina prioritāti_ savienojumam, kas sasniedzis ierobežojumu — ja
> pūlā ir tikai viens savienojums, tā nevar piemērot stingru ierobežojumu, tāpēc tieši šis semafors faktiski
> ierobežo pieprasījumu plūsmu.

### Atkārtots mēģinājums, ņemot vērā kombinācijas atdzišanu

Katrai kombinācijas stratēģijai (ja tā ir iespējota) pieprasījums, kas ĪSAS pārejošas atdzišanas dēļ
izraisītu galīgu 429 atbildi, nogaida tās beigas un tiek nosūtīts atkārtoti,
nevis atgriež 429 — tas aptver Gemini klases TPM/RPM logus (~60 s `retry-after`)
vairāku modeļu kombinācijās, piem., ja abi divu modeļu kombinācijas mērķi sasniedz katram modelim noteikto
ātruma ierobežojumu. To ierobežo `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) sadaļā **Iestatījumi → Noturība**. Tas nekad negaida `quota_exhausted`
(galīgi bloķēts līdz pusnaktij) vai autentifikācijas/neatrašanas iemeslu gadījumā.

---

## 5. Pieprasījumu rindas uzņemšanas kontrole (v3.8.49 · problēma #6593)

**Tvērums**: lokālā katram pakalpojumu sniedzējam un savienojumam paredzētā ātruma ierobežošanas rinda (`open-sse/services/rateLimitManager.ts`,
kuras pamatā ir Bottleneck), vienu līmeni zem trim iepriekš minētajiem mehānismiem.

**`maxWaitMs` ierobežo gaidīšanu rindā; `executionMaxWaitMs` ierobežo izpildi.**
Šie divi ierobežojumi ir apzināti nodalīti, un neviens no tiem neietekmē otru.

`resilienceSettings.requestQueue.maxWaitMs` ir **rindas gaidīšanas budžets**: tas
aptver pakalpojumu sniedzēja slota gaidīšanu un pēc tam atrašanos stāvoklī QUEUED, un tā taimeris
tiek notīrīts brīdī, kad uzdevums atstāj stāvokli QUEUED un sāk izpildi
(`rateLimitManager.ts`, `wrappedFn`). Pieprasījums, kas pārsniedz šo ierobežojumu, nekad
nesasniedz augšupējo pakalpojumu. Noklusējuma vērtība ir 30000ms, to nodrošina `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
failā `src/lib/resilience/settings.ts` un fiksē
`tests/unit/ratelimit-admission-control-6593.test.ts`, tādēļ izmaiņas padara
šo testu nesekmīgu, nevis ļauj šai rindkopai nemanāmi novecot.

`resilienceSettings.requestQueue.executionMaxWaitMs` ir vērtība, ko Bottleneck
saņem kā uzdevuma `expiration`; tās taimeris sāk darboties tikai pēc nosūtīšanas izpildei. Tas ir
rezerves drošības mehānisms izpildītājiem, kuriem nav sava augšupējā pieprasījuma taimauta, un tas
tiek palielināts līdz paša izpildītāja datu izgūšanas sākšanas taimautam, ja tas ir ilgāks, lai tas
nevarētu pārtraukt normāli noritošu atbildes saņemšanu. Noklusējuma vērtība ir 600000ms (10 min).

Rindas budžeta nodošana parametram `expiration` iepriekš pārtrauca neinkrementālās
vārtejas izpildes laikā — tās pamatoti darbojas vairākas minūtes, pirms tiek saņemti pirmie baiti —
un tādēļ termiņa izbeigšanās tiek parādīta kā `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), savukārt rindas budžetam ir
rindas taimauta kods. Jebkuru no tiem var pārrakstīt, izmantojot `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (vides mainīgos) vai informācijas paneli
(**Iestatījumi → Noturība**). Normalizēšanas laikā abu vērtības tiek ierobežotas diapazonā no 1ms līdz 24h.

**Prioritāte abiem:** vides mainīgais nodrošina tikai _noklusējuma_ vērtību. Vērtībai,
kas saglabāta laukā `resilienceSettings.requestQueue` (izmantojot informācijas paneli/API labojumu un glabāta
`key_value`), ir augstāka prioritāte, bet katra savienojuma
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` vērtībai ir vēl augstāka prioritāte. Tādēļ,
iestatot vides mainīgo izvietojumā, kurā jau ir saglabāta vērtība,
nekas nemainās — tā vietā notīriet vai atjauniniet saglabāto iestatījumu.

Atrašanās laiku rindā ierobežo `maxWaitMs`; tālāk aprakstītais `maxQueueDepth` ierobežo,
cik daudz izsaucēju vienlaikus drīkst gaidīt rindā.

**`maxQueueDepth` — izvēles uzņemšanas ierobežojums (jauns).** `resilienceSettings.requestQueue.maxQueueDepth`
ierobežo to pieprasījumu skaitu, kuri vienlaikus var gaidīt rindā (vēl nav nosūtīti izpildei) vienam
pakalpojumu sniedzējam un savienojumam. Ja rindā jau ir `maxQueueDepth`
pieprasījumi, jauns pieprasījums tiek nekavējoties noraidīts ar tipizētu
`code: "RATE_LIMIT_QUEUE_FULL"` kļūdu, **pirms** tas jebkad sasniedz `limiter.schedule()`
— tādēļ noraidīšana ir resursu ziņā lēta un notiek pirms jebkādas šī pieprasījuma turpmākas
uzvednes saspiešanas/tulkošanas. Noklusējuma vērtība `0` =
atspējots, saglabājot esošo neierobežotās rindas darbību; diapazons ir 0–100000.
Pārrakstiet, izmantojot `RATE_LIMIT_MAX_QUEUE_DEPTH` (vides mainīgo) vai
`resilienceSettings.requestQueue.maxQueueDepth` (informācijas paneļa/API labojumu).

Pati uzņemšanas pārbaude ir tīra funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), tādēļ
to var testēt ar vienībtestiem bez īsta Bottleneck ierobežotāja.

> RFC, ar kuru tika atvērta problēma #6593, piedāvāja arī karogu `bypassCompressionOnRateLimit`.
> Šī repozitorija `open-sse/services/compression/` konveijers veic
> uzvednes/konteksta saspiešanu izejošajam LLM pieprasījumam (`chatCore.ts`,
> ap `resolveCompressionSettings`/`selectCompressionStrategy` bloku),
> nevis HTTP atbildes saspiešanu ģenerētajiem 429 atbilžu ķermeņiem — burtiskam apiešanas karogam
> nav atbilstoša koda izpildes ceļa. Šis uzvednes saspiešanas solis
> pašlaik pieprasījumu konveijerā tiek izpildīts arī _pirms_ `withRateLimit()`, tādēļ
> secības maiņa, lai to izlaistu rindas pārpildes izraisīta noraidījuma gadījumā, ir atsevišķa un apjomīgāka
> izmaiņa par šīs problēmas tvērumu; tā šeit apzināti **netika** ieviesta
> un ir atstāta turpmākam darbam, ja CPU resursu ietaupījums atsver
> secības maiņas risku.

---

## 6. Lēnas straumes caurlaidspējas uzraugs (#9709)

Neobligātais `resilienceSettings.streamRecovery.throughputWatchdog` aizsargmehānisms nosaka
augšupstraumes avotu, kas joprojām sūta fragmentus, bet ģenerē asistenta izvadi ar ātrumu,
kas ir zemāks par konfigurēto lietderīgās izvades ātrumu. Tas ir apzināti nodalīts no
dīkstāves taimauta: sirdspuksti un metadati neatiestata nevienu taimeri un netiek uzskatīti
par progresu. Tas atšķiras arī no mēģinājuma stingrā termiņa (#9153), kas neatkarīgi no
izvades kvalitātes joprojām ir absolūta drošības robeža.

Pirms uzraugs var pārtraukt darbību, tam ir nepieciešams iesildīšanās periods, kam seko
pilns slīdošais logs. Tas uzskaita teksta izmaiņas no Chat Completions un Responses API
izvades notikumiem (izmantojot konservatīvu UTF-8 baitu tuvinājumu), ignorē notikumus, kuros
ir tikai lietojuma dati, un tukšus notikumus, kā arī aptur izvērtēšanu, kamēr tiek apstrādāti
rīku izsaukumu vai spriešanas notikumi. Pēc noklusējuma tas ir atspējots, un to var iespējot
ar `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; logu, iesildīšanos, minimālo ātrumu un minimālo
izmērāmo izvadi ierobežo standarta noturības iestatījumu normalizācijas slānis.

Kad tas ir iespējots, uzrauga izraisīta pārtraukšana tiek piemērota tikai aktīvajam
augšupstraumes mēģinājumam. Pirms klientam redzamu baitu nosūtīšanas esošais tās pašas
konta agrīnās atkopšanas ceļš var atkārtoti atvērt mēģinājumu. Pēc apstiprināšanas straume
nekad netiek akli atskaņota atkārtoti; sufiksu var pievienot tikai esošais drošās
straumes turpināšanas līgums. Pabeigšana joprojām notiek tikai vienu reizi, tādēļ lietojuma
uzskaite un semafora atbrīvošana netiek dublēta.

---

## 7. Augšupstraumes statusa pārformulēšana (nepareizi norādītas kvotas kļūdas)

**Tvērums:** viena augšupstraumes vārteja, kas ziņo par īslaicīgu kvotas izsmelšanu ar nepareizu HTTP statusu.

**Mērķis:** izlabot maldinošu statusu PIRMS klasifikācijas, lai lejupstraumes patērētāji (atkāpšanās mehānisms, kombināciju apkopošana, klientam paredzētā atbilde) redzētu kļūmes patieso atkārtojamo raksturu.

Dažas vārtejas signalizē par ĪSLAICĪGU kvotas izsmelšanu ar neatkārtojamu HTTP
statusu. `agentrouter.org` atgriež `403` (dažreiz `400`) ar tekstu ķīniešu valodā
(`用户额度不足` / `额度不足`), nevis standarta `429`. Tādi klienti kā Claude
Code uzskata `403` par pastāvīgu kļūdu un pārtrauc sesiju, un bez korekcijas
atkāpšanās mehānisms to klasificētu kā `AUTH_ERROR`, nevis kā kvotas
notikumu.

**Īstenošana:**

- Reģistrs un atbilstības pārbaudītājs: `open-sse/config/upstreamStatusRestatement.ts` — katram
  nodrošinātājam paredzēts kārtulu saraksts (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), kura atbilstība tiek pārbaudīta ar `applyStatusRestatement()`.
- Izsaukuma vieta: `providerFailure:` bloks failā `open-sse/handlers/chatCore.ts`
  (aptuveni 3654. rindā), uzreiz pēc tam, kad `parseUpstreamError()` parsē augšupstraumes
  atbildi ar kļūdas HTTP statusu (`!providerResponse.ok`), un pirms jebkādas
  klasifikācijas izpildes, lai katrs lejupstraumes patērētājs redzētu izlaboto
  statusu. Kļūdas, kas iegultas `200` SSE straumē, tiek apstrādātas atsevišķā,
  vēlākā straumes parsēšanas ceļā, un šis āķis tās pašlaik **neaptver** — tas ir
  zināms ierobežojums, kas agentrouter nepareizajam statusam vēl nav būtisks (jo
  tas tiek parādīts kā kļūdas HTTP statuss).
- Atkārtošanas piemērotība: `429` ir ietverts `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), tāpēc pārformulētai kļūdai
  ir reāls atkārtošanas logs, nevis tā tiek parādīta kā bezperspektīvs `403`.
- Sintētiskais `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ir tikai tas, ko pārformulētā atbilde norāda **klientam**; tas pats par sevi
  nav savienojuma iekšējās atdzišanas/bloķēšanas ilgums — to atsevišķi nosaka
  mehānisms, kas faktiski apstrādā pārformulēto kļūdu (Connection Cooldown
  pieaugošā atkāpšanās, §2, ar bāzes `3s` API atslēgu nodrošinātājiem; vai
  Model Lockout, §3, nodrošinātājiem ar kvotu katram modelim, piemēram,
  agentrouter). Maršrutētājs var kļūt piemērots iekšējam atkārtojumam agrāk
  par klientam norādīto 60s logu — tā ir apzināta rezerve, nevis kļūda.

Pastāvīgās kļūdas (agentrouter `无权访问模型` — nav piekļuves šim modelim)
NEKAD netiek pārformulētas: `excludeMarkers` noraida kārtulu pat tad, ja
`textMarkers` atbilst, tāpēc kļūda saglabā sākotnējo statusu un nekas nemēģina
to bezgalīgi atkārtot. Atbilstošā nodrošinātāja klasifikācijas kārtula
(`agentrouter-model-access-denied` failā `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarēta bāzes atdzišana `6h`) tiek
izmantota funkcijā `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_pirms_ vispārīgās apikey kategorijas `FORBIDDEN` agrīnās atgriešanas, un to
ierobežo `honorsRuleLockScope(provider)` (#10334 — pašlaik tikai agentrouter,
izmantojot `HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto vērtību sarakstu failā
`providerErrorRules.ts`). Kārtulā deklarētā 6h atdzišana tiek nodota tālāk kā
`fallbackResult.baseCooldownMs`, tomēr tā joprojām nonāk iepriekš pastāvošajā
katra modeļa kvotas bloķēšanas ceļā (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, ko #10334 nav mainījis, izņemot atdzišanas
avotu): tā tiek samazināta līdz operatora `mlSettings.maxCooldownMs`
(noklusējums `1_800_000ms` / 30min), tāpat kā ikviena cita modeļa bloķēšana, un
_saglabātais bloķēšanas iemesls_ paliek iepriekš pastāvošā, kodā tieši norādītā
vērtība `"forbidden"`, nevis kārtulas `"auth_error"` — pilnībā tiek ievērots
tikai atdzišanas ilgums, nevis iemesla virkne. Pats savienojums paliek aktīvs;
citi modeļi tajā pašā savienojumā netiek ietekmēti.

Pārformulētās kvotas kļūdas (`额度不足`) produkcijā atbilst nodrošinātāja kārtulai
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, nav deklarēts savs atdzišanas periods — tiek izmantots
persistences slāņa mērogotās atkāpšanās noklusējums). Kopš #10334 lauks
`scope` objektā `ProviderErrorRuleMatch` TIEK izmantots visā apstrādes ķēdē,
bet **tikai** nodrošinātājiem, kuri ir `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
atļauto sarakstā (`providerErrorRules.ts` — pašlaik tikai `"agentrouter"`,
ierobežots ar `honorsRuleLockScope()`). Visiem pārējiem nodrošinātājiem
`scope` joprojām ir tikai informatīvs, tieši tāpat kā pirms #10334.
`checkFallbackError` atgriež atbilstošās kārtulas tvērumu kā
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ir koplietotā aizsargpārbaude, kas apstiprina,
ka `ruleScope` tiešām ir droši ievērot kā savienojuma mēroga, pašatjaunojošu
signālu (tvērums `"connection"`, iemesls `quota_exhausted`, nekad
`permanent`, nekad `creditsExhausted` — aizsardzība pret iespējamu nākotnes
kārtulu, kas tvērumu `"connection"` sasaistītu ar pastāvīgu konta stāvokli).
To izsauc divi patērētāji:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  tā vietā, lai nonāktu caurlaides nodrošinātāja **katra modeļa** bloķēšanas
  atzarā (`agentrouter` izmanto `passthroughModels: true` →
  `hasPerModelQuota()` atgriež `true`), tiek piemērots **īslaicīgs savienojuma
  atdzišanas periods** — `testStatus: "unavailable"` + `rateLimitedUntil`,
  nekad termināls statuss (`credits_exhausted`/`banned`/`expired`) — tādēļ
  savienojums pēc atdzišanas perioda beigām atjaunojas pats, nevis pieprasa
  manuālu akreditācijas datu atiestatīšanu. Tas tiek izlaists savienojumiem
  ar `disableCooling: true` (#2997): šī atteikšanās tā vietā pāriet uz katra
  modeļa bloķēšanu (dokumentēts kompromiss — skatiet koda komentāru virs
  atzara).
- **Tā paša pieprasījuma kombinētā maršrutēšana**
  (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): tā pati aizsargpārbaude
  pievieno savienojumu atmiņā esošajai kopai `exhaustedConnections`, izmantojot
  atslēgu `${provider}:${connectionId}`. Tas izlaiž tikai atlikušo TĀ PAŠA
  PIEPRASĪJUMA mērķi, kuram _paša mērķa objektā jau ir tieši šis
  `connectionId`_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` pirms `exhaustedConnections` uzmeklēšanas) — vienkārša modeļu
  saraksta kombinācija, kuras blakus mērķiem nav sava piesaistīta
  `connectionId` un tas katrai nosūtīšanai tiek noteikts tikai no atbildes
  galvenes `X-OmniRoute-Selected-Connection-Id`, nekad neatbilst šai atslēgai.
  Šajā izplatītajā gadījumā patieso aizsardzību pret to, ka atlikušais posms
  atkārtoti izmantotu tikko izsmelto kontu, NENODROŠINA šī kopa — to
  nodrošina iepriekš aprakstītais persistences slānis (savienojuma
  `rateLimitedUntil` tagad ir nākotnē) kopā ar to, ka šī pati aizsargpārbaude
  kļūmei nomāc `transientRateLimitedProviders` (skatiet sadaļu
  "Divpakāpju dizains" un koda komentāru par
  `isAgentrouterConnectionQuotaScope` atzaru failā `targetExhaustion.ts`):
  tā kā šī kopa paliek nemarķēta, `combo.ts` funkcija
  `allowRateLimitedConnection`, kas piespiedu kārtā atļauj savienojumu
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`), NETIEK aktivizēta
  pārējiem nodrošinātāja posmiem, tādēļ akreditācijas datu atlases
  `rateLimitedUntil` filtrs (`src/sse/services/auth.ts:1238`) tiek ievērots
  kā parasti un atlikušais posms vai nu izvēlas citu, joprojām piemērotu
  `agentrouter` savienojumu, vai arī neizdodas, jo nav pieejamu akreditācijas
  datu — tas neuzspiež atkārtotu izmantošanu savienojumam, kuram šis atzars
  tikko piemēroja atdzišanas periodu.

### Divpakāpju dizains: statusa pārformulēšana, pēc tam klasificēšana

Statusa pārformulēšana (`upstreamStatusRestatement.ts`) un nodrošinātāja
klasifikācijas kārtulas (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ir atsevišķi reģistri, kuri abi izmanto nodrošinātāja
identifikatoru un teksta marķierus, taču tie tiek izpildīti dažādās vietās un
kalpo atšķirīgiem mērķiem: pārformulēšana agrīni pārraksta HTTP statusu failā
`chatCore.ts`; klasifikācijas kārtulas funkcijā `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) izvēlas atkāpšanās `reason` un
bloķēšanas `scope` (`model` / `provider` / `connection`).

Klasifikācijas kārtulas redz pilnu kļūdas **tekstu** (kas nepieciešams, lai
atrastu pamatteksta marķierus, piemēram, `额度不足`) tikai nodrošinātājiem,
kuri ir `FULL_TEXT_RULE_PROVIDERS` atļauto sarakstā failā
`providerErrorRules.ts` — pašlaik tikai `"agentrouter"`. Katram citam
**iebūvētā kataloga** nodrošinātājam `checkFallbackError` nodod
`getProviderErrorRuleMatch` tikai strukturēto kļūdu (`{code, type}`), ar ko
pietiek galvenes/statusa/koda kārtulām, bet kas neredz pamatteksta marķierus.
Palīgfunkcija `resolveRuleMatchBody()` veic šo atlasi: pilns kļūdas teksts
atļauto sarakstā esošajiem nodrošinātājiem, bet pārējiem — strukturētā kļūda.
**Iebūvēta** nodrošinātāja pievienošana `FULL_TEXT_RULE_PROVIDERS` ir
nepārprotama katra nodrošinātāja izvēle — tā pastāv, lai noklusējuma ceļš
katram nodrošinātājam, kurš nav sarakstā, paliktu nemainīts baitu līmenī.

Kārtulas `scope` (`model` / `provider` / `connection`) ir atsevišķa izvēle
no `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` to tikai atgriež kā
`fallbackResult.ruleScope`, un pakārtotie patērētāji to ievēro kā kaut ko
vairāk par informatīvu etiķeti tikai nodrošinātājiem, kuri ir tā paša faila
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` atļauto sarakstā (`ierobežots ar
honorsRuleLockScope()` — pašlaik tikai `"agentrouter"`). Informāciju par to,
ko `scope: "connection"` atbilstība faktiski dara pēc nodrošinātāja
pievienošanas šim atļauto sarakstam, skatiet iepriekš sadaļā "Pārformulētās
kvotas kļūdas".

**#11104 — operatora deklarētie noteikumi apiet abus atļauto sarakstus.** Operators izpildlaikā var
deklarēt katram pakalpojumu sniedzējam atsevišķu noteikumu, izmantojot `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
nerediģējot šo failu. Operatora noteikuma pakļaušana
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — atļauto sarakstu,
kas paredzēti iebūvētā kataloga noteikumu **noklusējuma** darbības aizsardzībai, — ierobežojumam
padarītu iestatījumu mehānismu neaktīvu visiem pakalpojumu sniedzējiem, izņemot tos, kas jau
ir norādīti šajos sarakstos, jo noteikuma deklarēšana jau ir operatora nepārprotama
piekrišana. Gan `resolveRuleMatchBody()`, gan `honorsRuleLockScope()` vispirms pārbauda
`hasOperatorRuleForProvider()`: pakalpojumu sniedzējs ar operatora noteikumu saņem
neapstrādāto kļūdas tekstu, un tā deklarētais `scope` tiek ievērots neatkarīgi no tā,
vai tas ir iekļauts arī kādā no atļauto sarakstiem.

**Zināmais trūkums — `providerRuleRegistry` nekad netiek izmantots HTTP 400 gadījumā.**
`checkFallbackError` atzars `BAD_REQUEST` pilnībā klasificē statusu 400,
izmantojot savus paraugu masīvus (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` u.c. failā `accountFallback.ts`), un atgriež rezultātu, pirms
tiek sasniegts augstāk esošais `configuredRule`/`getProviderErrorRuleMatch` atzars.
Iebūvētā kataloga noteikums (vai operatora noteikums) ar `status: 400` ir
sintaktiski derīgs, taču tas nekad netiks aktivizēts. Pašlaik neviens esošais noteikums nav paredzēts statusam 400,
tāpēc ražošanas vidē nekas netiek ietekmēts, taču nākotnē, pievienojot noteikumu statusam 400, vispirms
būs jāmaina šis atzars. Tās ir lielākas izmaiņas nekā viena noteikuma pievienošana (tās
pārklasificē statusu 400 visiem pakalpojumu sniedzējiem, kuri jau paļaujas uz
paraugu masīvu darbību), un tas neietilpst viena pakalpojumu sniedzēja noteikuma pievienošanas tvērumā.

### Jaunas vārtejas, kas nepareizi norāda kvotu, pievienošana

1. Reģistrējiet vienu noteikumu masīvu reģistrā `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Saglabājiet `textMarkers`
   specifiskus konkrētajam pakalpojumu sniedzējam; nekad atkārtoti neizmantojiet vispārīgas frāzes angļu valodā, kas konfliktē ar
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Pēc izvēles reģistrējiet klasifikācijas noteikumus failā
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), lai izvēlētos
   pareizo bloķēšanas tvērumu (`connection` konta līmeņa kvotai, `model`
   katra modeļa kļūdām). Ražošanas vidē šī darbība ietekmē tikai tos
   pakalpojumu sniedzējus, kuru noteikumiem nepieciešams pilns kļūdas teksts (ķermeņa marķieri): pievienojiet
   pakalpojumu sniedzēja identifikatoru `FULL_TEXT_RULE_PROVIDERS` tajā pašā failā — pretējā gadījumā
   `checkFallbackError` noteikumam nodod tikai strukturēto
   `{code, type}` kļūdu, un noteikums, kas izmanto ķermeņa tekstu, nekad neatbildīs reālajai datplūsmai.
   Noteikumiem, kas atbilst tikai pēc `status`/`headers` (piemēram, Opencode vai
   Minimax noteikumi), šī nepārprotamā piekrišana nav nepieciešama. Atsevišķi, ja noteikums deklarē
   `scope: "connection"` un ir paredzēta faktiska visas savienojuma darbības apturēšana
   kopā ar kombinācijas izlaišanu tajā pašā pieprasījumā (nevis tikai informatīva etiķete), pievienojiet
   pakalpojumu sniedzēja identifikatoru `HONORS_RULE_LOCK_SCOPE_PROVIDERS` tajā pašā failā — tas
   kontrolē `isAgentrouterConnectionQuotaScope()` veida izmantošanu funkcijā
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) un
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez tā `scope`
   joprojām tiek nodots caur `fallbackResult.ruleScope`, taču nekas uz to nereaģē.
3. Pievienojiet vienībtestus pēc `tests/unit/upstream-status-restatement.test.ts`
   un `tests/unit/agentrouter-error-rules.test.ts` parauga (iekļaujot
   not-permanent / not-creditsExhausted aizsargpārbaudes un — ja pakalpojumu sniedzējam nepieciešams
   atļauto saraksts — testu, kas apliecina, ka `resolveRuleMatchBody()` atgriež
   pilno tekstu tikai šim pakalpojumu sniedzējam).

Nav nepieciešamas izmaiņas failā `chatCore.ts`, funkcijā `classifyError` vai kombināciju apstrādē.

#### Pēc izejošās datplūsmas grupēta bloķēšana (#10880)

Pakalpojumu sniedzēji `EGRESS_BUCKETED_LOCK_PROVIDERS` sarakstā (opencode saime) tiek uzskatīti
par augšupstraumes pakalpojumiem, kas grupēti pēc IP (opencode bezmaksas līmenis tiek grupēts pēc IP, nevis
konta — skatiet #9611): statuss 429, kas klasificēts kā `quota_exhausted`
**vai** `rate_limit_exceeded`, aptur visus atļauto sarakstā iekļautās saimes savienojumus,
kuru pēdējā zināmā izejošā IP adrese atbilst kļūmi saņēmušā savienojuma adresei, pirms
rotācija var tos izmēģināt
— tādējādi izvairoties no N-1 garantēti neveiksmīgiem augšupstraumes izsaukumiem (tāda pati struktūra kā #10460/#10525).
`rate_limit_exceeded` ir iekļauts apzināti: `markAccountUnavailable`
ceļā opencode specifiskie noteikumi nekad neatbilst (funkcijai
`checkFallbackError` netiek nodotas galvenes/ķermenis, un opencode nav iekļauts `FULL_TEXT_RULE_PROVIDERS`), tāpēc 429,
kura ķermenī ir abonementa kvotas teksts ("monthly usage limit
reached"), tiek klasificēts kā `quota_exhausted`, izmantojot kvotas teksta atkāpšanās mehānismu
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 h darbības apturēšana), pirms
vispār tiek sasniegts noteikums `status_429` — savukārt 429 bez kvotas teksta (parasts
ātruma ierobežojums) ar noteikumu `status_429` tiek klasificēts kā `rate_limit_exceeded`
un joprojām aptur IP saimes darbību. Atļauto sarakstā iekļautam pakalpojumu sniedzējam pēc IP grupēts
ātruma ierobežojums ir tāds pats signāls kā izsmelta kvota. Faktiskie ierobežojumi:

- **Labāko centienu princips**: bloķēšana nosaka savienojuma pēdējo zināmo `egress_ip`
  no `proxy_logs` (24 h logs, sinhroni, bez kešatmiņas). Auksta kešatmiņa (izejošā
  IP nekad nav pārbaudīta) vai ieraksta neesamība → neveiksmīgajam savienojumam
  šis zars joprojām piemēro atdzišanas periodu (reģistrējot tāpat kā pašlaik),
  tikai neviens saistītais savienojums netiek bloķēts.
- **Nekad nav termināls**: atdzišanas periods ir atjaunojams kvotas logs
  (`testStatus: "unavailable"`); no IP līmeņa signāla nekad netiek atvasināts
  pastāvīgs stāvoklis. Savienojumi ar `disableCooling` šo zaru pilnībā izlaiž.
- **Atļauto pakalpojumu sniedzēju saimei mainās bloķēšanas granularitāte**: tās ir tvēruma
  izmaiņas, nevis tikai saistīto savienojumu optimizācija. opencode ir `passthroughModels`
  pakalpojumu sniedzējs, tāpēc pirms šī zara 429 izraisīja bloķēšanu katram MODELIM atsevišķi; tagad tas
  izraisa savienojuma atdzišanas periodu — arī operatoram, kurš izmanto tikai vienu
  savienojumu bez jebkāda saistītā savienojuma. Šī ir granularitāte, ko opencode noteikumu
  tabula jau deklarē kā pareizu (`scope: "connection"`,
  `providerErrorRules.ts`), taču līdz šim tā nekad netika ievērota, jo opencode nav iekļauts
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Zars pats ieraksta neveiksmīgā
  savienojuma atdzišanas periodu + `backoffLevel`, atspoguļojot
  savienojuma tvēruma agentrouter zaru, un atgriežas — bloķēšana katram modelim un
  tālāk esošais vispārīgais ceļš nekad netiek sasniegts.
- **Iekļauti kombinētie izsaukumi**: tāpat kā agentrouter zars, šis tvērums apzināti
  ignorē `persistUnavailableState`/`isCombo` pazemināšanu, ko kombinēta izsaukuma veicējs
  piemēro 429 kļūdai. Bloķēšana katram modelim nav vājāka šī tvēruma forma, tā
  ir nepareizā vienība: tā neko nepasaka par izsmelto IP, tāpēc kombinētā
  rotācija turpinātu izšķiest vienu garantēti neveiksmīgu izsaukumu katram saistītajam savienojumam.
- **Saistīto savienojumu drošība**: saistītais savienojums, kas jau ir terminālā stāvoklī (banned/credits_exhausted)
  vai kam jau ir ilgāks atdzišanas periods, nekad netiek pārrakstīts.
- **Ekskluzīvs atļauto saraksts**: `EGRESS_BUCKETED_LOCK_PROVIDERS` paplašināšana ir
  nepārprotams īpašnieka lēmums; nav vispārīgas sasaistes (modelis #10334/#10419).
  Saistīto savienojumu vaicājums piesaista to pašu atļauto sarakstu, nevis atkārto to kā SQL
  literāli, tāpēc tā paplašināšana joprojām ir vienas rindas izmaiņa.
- **Izejošās IP rotācija abos virzienos**: uzmeklēšanas logs (24 h) ir daudz
  plašāks par izejošās IP kešatmiņas TTL (5 min), tāpēc „pēdējā zināmā IP” ir vēsturisks,
  nevis pašreizējais stāvoklis. Ja savienojuma starpniekserveris loga laikā ir mainījies,
  bloķēšana var **neaptvert** faktiski koplietotu IP (reģistrētā IP ir jaunā,
  neizsmeltā IP) — un simetriski tā var **piemērot atdzišanas periodu saistītam savienojumam, kas kopš tā laika
  ir pārgājis** no izsmeltās IP. Otrajā gadījumā šis saistītais savienojums zaudē vienu
  atdzišanas logu; abi gadījumi tiek pieņemti kā uz vēsturi balstītas
  uzmeklēšanas labāko centienu ierobežojumi.
- **Izmaksas**: divas ierobežotas `proxy_logs` skenēšanas (logs filtrēts, izmantojot
  `idx_pl_timestamp`), tikai ar 429 biežumu. Nav jauna indeksa (migrācijai 134
  YAGNI). Mērīts vidēja izmēra reālas datplūsmas DB kopijā;
  augstas caurlaidspējas instance tajā pašā logā satur proporcionāli vairāk rindu.

---

## Citi noturības līdzekļi

- **19 maršrutēšanas stratēģijas** (prioritāra, svērta, cikliska, konteksta pārsūtīšana, vispirms aizpildīt, p2c, nejauša, vismazāk izmantotā, izmaksu ziņā optimizēta, atiestates laiku ņemoša vērā, atiestates logs, brīvā kapacitāte, stingri nejauša, automātiska, lkgp, kontekstam optimizēta, kešatmiņai optimizēta, sapludināšana, konveijers) — skatiet [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Atiestates laiku ņemoša vērā maršrutēšana** (v3.8.0) — prioritizē savienojumus pēc kvotas atiestates laika.
- **Fona režīma degradācija** — Responses API `background: true` tiek degradēts uz sinhrono režīmu ar brīdinājumu.
- **Dinamiska rīku ierobežojuma noteikšana** — pārslēdzas uz zemākas prioritātes nodrošinātājiem, kad sasniegts rīku skaita ierobežojums.
- **Ārkārtas atkāpšanās mehānisms** — to kontrolē `OMNIROUTE_EMERGENCY_FALLBACK`; operatori to var ignorēt līdzekļu karodziņu lapā bez restartēšanas.

---

## Atkļūdošana

- Svērtā kombinācija atbild ar `503 all_targets_cooling_down` (ir iestatīts `Retry-After`, un `diagnostics.excluded` uzskaita katru mērķi ar `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pūls ir konfigurēts un savienots, taču katru mērķi izslēdz noturības taimeris; brīdinājums `[COMBO] Weighted selection: every target excluded before dispatch — …` norāda iemeslus un atlikušās sekundes. Tās pašas kombinācijas atbilde `404 no_executable_targets` nozīmē, ka netika iesaistīts neviens noturības taimeris (nav nekā izpildāma vai katram kontam neizdevās pieejamības pārbaude). Izveidots `open-sse/services/combo/pinRecovery.ts`, izmantojot `targetResolution.ts` apkopotos izslēgšanas datus.
- Visas pakalpojumu sniedzēja atslēgas tiek izlaistas → pārbaudiet gan ķēdes pārtraucēja stāvokli, GAN katra savienojuma `rateLimitedUntil`/`testStatus`.
- Pakalpojumu sniedzējs pēc atiestatīšanas loga tiek neatgriezeniski izslēgts → kods nolasa neapstrādāto `state`, nevis izmanto `getStatus()`/`canExecute()`.
- Viena atslēga nedarbojas, bet pārējām būtu jādarbojas → dodiet priekšroku savienojuma atdzišanas periodam, nevis ķēdes pārtraucējam.
- Nedarbojas tikai viens modelis → dodiet priekšroku modeļa bloķēšanai, nevis savienojuma atdzišanas periodam.
- Stāvoklim būtu automātiski jāatjaunojas, taču tas nenotiek → pārbaudiet, vai nav nākotnes laikspiedola un vai nolasīšanas ceļš atsvaidzina stāvokli, kura derīguma termiņš ir beidzies. Pastāvīgiem statusiem nepieciešamas manuālas izmaiņas.

---

## TLS digitālo nospiedumu noteikšana un maskēšanās

Nodrošinātājiem specifiskā maskēšanās (JA3/JA4, CCH, obfuskācija) ir dokumentēta atsevišķi — skatiet `docs/security/STEALTH_GUIDE.md` (git; nav kompilēts mapē `/docs`).

---

## Noturības testēšana (8. posms · C bloks)

Papildus noturības loģikas vienībtestiem trīs testi pārbauda izpildlaika vidi
reālos stresa/kļūmju apstākļos (tie visi ir integrācijas/iknakts testi — neviens nebloķē PR):

| Tests                      | Kas                                                                                                                                                                                                           | Palaišana                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Haoss                      | Viltus augšupstraumes mezgls ievada reālu latentumu/atiestati/noildzi/503; pārbauda, vai ķēdes pārtraucējs atveras/atjaunojas un `checkFallbackError` klasificē 503 kā atkopties spējīgu atkāpšanās gadījumu. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Atmiņas kaudzes pieaugums  | ~500 straumes katram `createSSEStream` ar `--expose-gc`; tests neizdodas, ja atmiņas kaudze pārsniedz robežu (OOM aizsargs #3069).                                                                            | `npm run test:heap`                       |
| k6 ilgstošas slodzes tests | Ilgstoša slodze pret `/api/monitoring/health`; p95/kļūdu sliekšņi.                                                                                                                                            | `k6 run tests/load/k6-soak.js` (ik nakti) |

To koordinē `.github/workflows/nightly-resilience.yml` (cron + dispatch). Noklusējuma
`test:integration` režīmā haosa un atmiņas kaudzes testi automātiski tiek izlaisti (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Skatiet arī

- [Arhitektūras rokasgrāmata](./ARCHITECTURE.md) — Sistēmas arhitektūra un iekšējā uzbūve
- [Lietotāja rokasgrāmata](../guides/USER_GUIDE.md) — Pakalpojumu sniedzēji, kombinācijas, CLI integrācija
- [Automātisko kombināciju dzinis](../routing/AUTO-COMBO.md) — 16 faktoru vērtēšana, režīmu pakotnes
