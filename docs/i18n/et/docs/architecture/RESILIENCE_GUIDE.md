# Resilience Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute'il on kolm eristatavat, kuid omavahel seotud vastupidavuse mehhanismi. Igal neist on erinev ulatus ja eesmärk. Hoidke need marsruuti käitumise silumisel eraldi.

![3-kihiline vastupidavuse mudel](../diagrams/exported/resilience-3layers.svg)

> Allikas: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Pakkuja katkestaja

**Ulatus:** kogu teenusepakkuja (nt `glm`, `openai`, `anthropic`).

**Eesmärk:** lõpetada liikluse saatmine teenusepakkujale, kes ülaloleva teenuse tasemel korduvalt ebaõnnestub.

**Implementatsioon:**

- Tuumklass: `src/shared/utils/circuitBreaker.ts`
- Ühendused: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Seisundi API: `GET /api/monitoring/health`
- Taastamise API: `POST /api/resilience/reset`
- Mpakid: `open-sse/services/accountFallback.ts`
- Andmebaasi tabel: `domain_circuit_breakers`

**Seisundid:**

- `CLOSED` — normaalne liiklus lubatud
- `DEGRADED` — liiklus lubatud, kuid jätkuvaid teenusepakkuja ebaõnnestumisi jälgitakse; seisund taastub `CLOSED`-ks piisavate õnnestumiste, kehtiva ühendustesti või viimase tüüpi ebaõnnestumise kõige pikema `OPEN` hoidmise järel (kasutatud väärtus `cooldownByKind`, muidu `resetTimeout` × `maxBackoffMultiplier`, vähemalt üks jahutuse periood) ilma uue ebaõnnestumiseta
- `OPEN` — teenusepakkuja ajutiselt blokeeritud; kombineeritud marsruutimine jätab selle vahele
- `HALF_OPEN` — taastamise aeg möödunud; proovipäring lubatud

**Konfigureeritavad vaikeväärtused (`open-sse/config/constants.ts`, nähtavad Dashboard → Settings → Resilience) :**

| Klass   | Degradeerub pärast |   Avatakse pärast | Taastamise aeg |
| ------- | -----------------: | ----------------: | -------------: |
| OAuth   |   5 ebaõnnestumist |  8 ebaõnnestumist |            60s |
| API-key |   7 ebaõnnestumist | 12 ebaõnnestumist |            30s |
| Local   |          tuletatud |  2 ebaõnnestumist |            15s |

`degradationThreshold` määrab, millal teenusepakkuja läheb seisundisse `DEGRADED`; `failureThreshold` määrab, millal see avaneb ja vahele jäetakse. Kohalikud teenusepakkuja profiilid ei ole veel Resilience'i sätete lehel nähtavad.

**Trip-koodid:** ainult teenusepakkuja tasemel olevaid staatusi `[408, 500, 502, 503, 504]`. Ärge käivitage trip'i konto tasemel esinevate vigade korral (enamasti 401/403/429 — need kuuluvad jahutuse või lukustuse alla).

**Lais taastumine:** kui `OPEN` aeg möödub, siis `getStatus()`, `canExecute()`, `getRetryAfterMs()` värskendavad seisundit `HALF_OPEN`-ks. Sama lugemine (ja järgmine ebaõnnestumine) vähendab vananenud `DEGRADED` seisundi tagasi `CLOSED`-ks. Taustatimerit pole vaja.

---

### Valikuline globaalne teenusepakkuja jahutamine (akna lukk)

Neljandaks kihiks on valikulise osalemise kiht (`PROVIDER_COOLDOWN_ENABLED`, vaikeväärtus **off**), mis säilitab päringute vahel mälu ebaõnnestuvate teenusepakkujate kohta faili `open-sse/services/providerCooldownTracker.ts` sees. Seda kasutatakse kombineeritud sihtmärgi määramisel, et järjestikused kombineeritud päringud lõpetaksid äsja ebaõnnestunud teenusepakkuja uuesti läbimarsimise. Teenusepakkuja tasemel kirjed järgivad `PROVIDER_PROFILES` akna luku sätteid:

| Profiil | Lülitab pärast (`providerFailureThreshold`) | Akna sees (`providerFailureWindowMs`) | Jahutub ajaks (`providerCooldownMs`) |
| ------- | ------------------------------------------: | ------------------------------------: | -----------------------------------: |
| OAuth   |                                        `10` |                               `15min` |                               `5min` |
| API key |                                        `15` |                               `30min` |                              `10min` |

Alates sellest künnist ei peeta teenusepakkujat jahutavas olekus; edukas päring tühistab akna. Ühenduse tasemel kirjed (`provider:connectionId`) kasutavad eksponentsiaalset tagasilükkamist `minRetryCooldownMs → maxRetryCooldownMs`. Ülekirjutused: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regresseerimise kontroll: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ühenduse jaheaeg

**Ulatus:** üks teenusepakkuja ühendus/konto/võti.

**Eesmärk:** jätta üks vigane võti vahele, samal ajal kui teised sama teenusepakkuja ühendused teenindavad edasi.

**Implementatsioon:**

- Märgi kättesaamatuks: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valik: `getProviderCredentials*` samas failis
- Jaeaja arvutus: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Seaded: `src/lib/resilience/settings.ts`

**Väljad ühenduse kohta:**

- `rateLimitedUntil` — ajatempel, millani jaheaeg kestab
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentsiaalse taganemise loendur

**Vaikimisi jaheajad:**

- OAuth-i baas: 5 s
- API-võtme baas: 3 s
- API-võtme 429: eelistab ülesvoo `Retry-After`/lähtestamispäiseid/parsitavat lähtestamisteksti
- Taganemine: `baseCooldownMs * 2 ** failureIndex`

**Thundering-herd'i vastane kaitse:** hoiab ära, et samaaegsed tõrked jaheaega ülemäära pikendaksid või `backoffLevel`'it topelt suurendaksid.

**Paralleelsuslimiidi 429-vastused ei roni taganemise redelil.** `429`, mille keha teavitab
paralleelsuslimiidist ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), tähendab, et konto on terve, kuid hõivatud.
`checkFallbackError()` tagastab põhjuse `concurrency_limited`: lülitu kohe üle järgmisele
ühendusele, jahuta seda ühte fikseeritud `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) või
ülesvoo kordusvihje järgi, hoia `backoffLevel` muutumatuna ja määra `skipProviderBreaker`.
Sõnaselge kvooditeade kehas võidab endiselt, seega keha, mis vastab ka kvoodimustrile,
jääb kvoodiotsuseks. Tuvastus: `looksLikeConcurrencyLimit()` failis
`src/shared/utils/classify429.ts`; otsus: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()` (kaitselüliti `FailureKind`) on muutumatu ja loeb nende kehade puhul
endiselt väärtust `rate_limit`.

**Voo sisu seiskumised ei jahuta kontot.** Kui sisuseiskumise watchdog
(`open-sse/utils/streamHandler.ts`) loobub voost, mis ei saatnud õigel ajal mudeli
väljundit, salvestab `markAccountUnavailable()` vea ühendusele, kuid ei määra
jaheaega: seiskumine kuulub sellele konkreetsele päringule — enamasti on tegu pika
arutlusringiga, mille väljundit pole veel tekkinud. Operaatorid saavad selle käitumise
tagasi sisse lülitada sättega `resilienceSettings.streamStallCooldown.enabled`
(vaikimisi `false`).

**Arutluskaadrid taaskäivitavad sisuseiskumise eelarve.** Arutlusmudel võib enne oma
esimest nähtavat tokenit mõelda minuteid: Claude voogesitab `thinking_delta`-kaadreid,
mille mõtlemistekst võib olla tühi, ja Responses API voogesitab üht arutlusüksust
teise järel. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tunneb
need kaadrid ära ja watchdog taaskäivitab oma eelarve iga kaadri peal, selle asemel et
ring tühistada. Need ei ole siiski mudeli väljund, seega ring, mis lõpeb ainult
arutlusega, raporteeritakse endiselt tühjana, ja ring, mis lõpetab arutlemise ja saadab
ainult heartbeat'e, käivitab ikkagi watchdog'i.

Kiro binaarsed `reasoningContentEvent`-kaadrid mittetühja allkirjaga säilitavad selle
arutlusaktiivsuse läbi eksekuutori tühja `reasoning_content`-deltana. Allkirja edasi ei
edastata. Metaandmed, puudulikud kaadrid ja tühjad allkirjad ei taaskäivita
sisueelarvet; sõltumatu aktiivse voo ajalõpp ja kliendipoolne tühistus kehtivad
endiselt (`open-sse/executors/kiro/reasoning.ts`).

**Lõppolekud (MITTE jaheajad):**

- `banned` — määravad keelatud märksõnade / konto-keelu tuvastus (vt [BAN_DETECTION](../security/BAN_DETECTION.md)) ning kolm järjestikust ülesvoo päringupõhist keeldumist (`request_rejected`, nt Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); üksik keeldumine vaid jahutab ühendust
- `expired` (liigub lõppolekusse piiratud arvu korduskatsete järel — `EXPIRED_RETRY_MAX = 3` koos eksponentsiaalse taganemisega — nii et mööduvad OAuth-i vead jõuavad ise paraneda enne, kui konto jäädavalt deaktiveeritakse)
- `credits_exhausted`

Need püsivad, kuni mandaadid muutuvad või operaator need lähtestab. Ärge kirjutage lõppolekuid mööduva jaeaja olekuga üle.

**Laisk taastumine:** kui `rateLimitedUntil` on möödunud, muutub ühendus taas valikukõlbulikuks. Eduka kasutuse korral tühjendab `clearAccountError()` kõik veaväljad.

### Claude'i OAuth-i kasutussein: madalama prioriteediga rada + seansilimiidi lähtestus

**Ulatus:** üks Claude'i tellimuse (OAuth) ühendus. Mõlemad funktsioonid on **ühenduse
kaupa sisse lülitatavad** (Muuda ühendust → Claude'i jaotis → `lowPriorityMode` /
`autoLimitReset` väljal `providerSpecificData`, mõlemad vaikimisi välja lülitatud) ning
peegeldavad Claude Code'i käske `/low-priority` ja `/limit-reset` (protokollileping
jäädvustatud Claude Code 2.1.263-st).

**Implementatsioon:**

- Olekumasin + vastuste klassifitseerimine: `open-sse/services/claudeLowPriority.ts`
- Lähtestamise oleku/nõude klient: `open-sse/services/claudeLimitReset.ts`
- Eksekuutori hook (päiste süstimine + sama konto korduskatse): `open-sse/executors/base.ts::execute()`
- Sisselülituse püsisalvestus: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Päästik:** 5-tunnine kasutussein — `429`, mille päised kannavad väärtust
`anthropic-ratelimit-unified-status: rejected` ja — kui konto on selleks õigustatud —
`anthropic-ratelimit-unified-slow-offer: treatment`. Enne seda esimest seina-429't ei
saadeta midagi; pursk-429 ilma unified-päisteta läbib tavapärase jaheaja tee.

**Madalama prioriteediga rada** (`lowPriorityMode`):

- Seina 429 korral võtab täitja pakkumise vastu ja proovib kohe uuesti **sama**
  kontoga, kasutades `anthropic-usage-limit: slow`; rada jääb aktiivseks kuni väljakuulutatud
  `anthropic-ratelimit-unified-reset` ajani (+60 s varuaega) ning iga selle ajavahemiku päring sisaldab
  seda päist. Vahele püütud 429 ei jõua kunagi funktsioonini `handleChatCore`, seega ühendust
  **ei** panda ooteajale ega vahetata välja.
- `anthropic-ratelimit-unified-slow-status` hilisemates vastustes: `active` / `not_needed`
  säilitavad raja; `slot_busy` (429) või `529` ootavad serveri määratud
  `anthropic-ratelimit-unified-slow-retry-after` aja (vaikimisi 20 s, piiratud vahemikku 5–600 s, ±30% juhuslik nihe)
  ja proovivad uuesti, piirdudes väärtusega `anthropic-ratelimit-unified-slow-max-wait` (vaikimisi 20 min, piiratud
  vahemikku 1 min–6 h) — selle ületamisel rada lõpetatakse ja 10-minutiline ooteaeg takistab uuesti vastuvõtmist. Lisaks
  piiratakse ooteaega päringu enda ülesvoolu käivitamise ajalõpu
  (`resolveFetchStartTimeout`, vaikimisi 10 min) järelejäänud ajaga, millest lahutatakse 5 s varu: ilma selle piiranguta kestaks
  vaikimisi 20-minutiline maksimaalne ooteaeg päringust kauem ja ooteprotsess katkestataks
  ootamise ajal, tagastades sujuva `max_wait`-lõpu ja ooteaja asemel vea `TimeoutError`.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-tunnise akna vahetumine või
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (mis lõpetab selle mis tahes oleku korral
  kui `extra_usage`, sest tasuline ülekasutus katab nüüd seina) lõpetavad raja;
  seejärel liigub vastus tavapärasesse ooteaja töötlusse. `budget_exhausted` jäetakse meelde kuni
  väljakuulutatud eelarve lähtestamiseni (≤ 8 päeva).
- Seina kontroll käivitatakse pärast täitja enda 400-st tingitud katse-siseseid korduskatseid (konteksti
  muutmine, mõtlemise/pingutuse piiramine, parameetrite automaatõpe), seega püütakse ainult
  ühel neist korduskatsetest ilmnev seina 429 siiski vahele, selle asemel et lasta sellel jõuda ooteaja töötlusse.
- Olekut hoitakse mälus ühenduse kohta (taaskäivitamine põhjustab uuesti vastuvõtmiseks ühe täiendava seina 429).

**Seansipiirangu lähtestamine** (`autoLimitReset`, proovitakse enne rada, kui mõlemad on sisse lülitatud):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → plokk `juniper_tide`;
  kui `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` koos
  väärtusega `{ "program": "juniper_tide" }` (organisatsiooni UUID väljast
  `providerSpecificData.organizationUUID`, alglaadimise varuvariant).
- `result: reset|not_limited` → päringut korratakse täiskiirusel (aeglast päist ei lisata).
  `already_used` / `not_offered` jätavad väärtuse `next_available_at` meelde (vaikimisi üks nädal); iga
  tõrke järel oodatakse 15 minutit. Lähtestamist saab teha kord nädalas ja see arvestatakse endiselt
  nädalase piirangu hulka.

Regressioonikaitsed: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seansisidusus (#7274)

**Ulatus:** üks kliendiseanss (päis `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) kinnitatakse ühe ühenduse külge **mis tahes** pakkuja puhul.

**Eesmärk:** hoida mitme vooruga agent (Claude Code, aider, kohandatud agendid) päringute vahel samal kontol, vähendades kontodevahelist kontekstikadu ja korduvaid külmkäivituse 429 vastuseid pakkujate puhul, kelle seansiolek on kontopõhine.

**Teostus:**

- TTL-i tuvastamine: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Kinnituse valimine/loomine: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Päise eraldamine (üldine, mis tahes pakkuja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Püsiv kinnitustabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Seadistus: `sessionAffinityTtlMs` (globaalne TTL millisekundites, `0` keelab funktsiooni) — `src/lib/db/settings.ts`. Migratsioon `124_generic_session_affinity_ttl.sql` nimetas selle ümber ainult Codexile mõeldud seadistusest `codexSessionAffinityTtlMs` ning võtab uueks vaikeväärtuseks üle mis tahes varem seadistatud Codexi TTL-i.

Enne muudatust #7274 tagastas `resolveSessionAffinityTtlMs()` iga muu pakkuja kui `codex` puhul kohe `0`, mistõttu TTL-i seadistus (ja seansipäised) ei mõjunud mujal, kuigi kinnitusmehhanism ja päiste eraldamine olid juba pakkujast sõltumatud. Parandus eemaldas selle varajase tagastuse; kui globaalne väärtus on määratud suuremaks kui `0`, rakendub TTL nüüd ühtlaselt kõigile pakkujatele.

Kolme seansisidususe päist ei edastata kunagi ülesvoolu — täitjad koostavad oma ülesvoolupäised nullist, selle asemel et kliendi päiseid edasi anda, mistõttu jääb see ainult sisemiseks korrelatsiooni-ID-ks.

### Hallatud seansiühenduste eksklusiivsed rendid

**Ulatus:** üks aktiivne hallatud HTTP-klient/seanss omab üht sobivat OmniRoute’i ühendust.

**Eesmärk:** pakkuda püsivat eksklusiivset ühenduse omandiõigust klientidele, kes vajavad päringute vahel ranget marsruutimispiiri. See erineb seansisidususest, mis on nõrk järjepidevuseelistus:
eksklusiivne rent talletab elutsükli oleku SQLite’is, jõustab aktiivse omaniku ja
aktiivse ühenduse globaalse unikaalsuse ning lükkab aegunud põlvkonna enne pakkujale edastamist tagasi.

Funktsioon on iga API-võtme puhul valikuline. Hallatud võtmel peab olema ulatus `lease:exclusive` ja
selgesõnaline mittetühi loend `allowedConnections`. Elutsükli lõpp-punkti saab kasutada iga HTTP-klient; selleks pole vaja
kliendi nime, kasutajaagenti, pakkujat, OAuthi meetodit ega mudelit. Rent omab ühendust,
mitte mudelit, seega säilitab mudeli vahetamine seose seni, kuni ühendus on tavapäraselt
sobiv. Tavapärased mudeli-, kvoodi-, seisundi-, ooteaja- ja lubatud loendi reeglid jäävad määravaks ning võivad
sama põlvkonna üle viia teisele vabale sobivale ühendusele.

Elutsükkel on `POST /api/v1/session-leases` koos JSON-toimingutega `acquire`, `renew` ja `release`.
Hallatud inferentsipäringud esitavad läbipaistmatu `X-OmniRoute-Lease-Owner` väärtuse ja täpse
`X-OmniRoute-Lease-Generation` väärtuse. Omanik kasutab eesliidet `vlo_`, millele järgneb 43 base64url-märki; salvestatakse ainult
selle SHA-256 räsi. Iga lõplik saatmistõke seob ka autenditud API-võtme ID ja
aktiivse ühenduse ID. Rendi juhtpäised eemaldatakse logidest, säilitatud päringute hetktõmmistest ja
ülesvoo täituri päistest.

Kui tavalisel marsruutimisel on sobivaid hallatud kandidaate, kuid kõik vabad kandidaadid on hõivatud
võõra aktiivse rendi poolt, tagastab OmniRoute HTTP `429`, koodi lease-capacity-unavailable,
oleku waiting-for-capacity ja piiratud `Retry-After` väärtuse, mis on tuletatud varaseimast asjakohasest aegumisajast.
Tavaline tühi sobivus ei ole rendikonflikt ning säilitab oma senise marsruutimisvea semantika.

Seotud mehhanismid püsivad eraldi:

- OAuthi seansi hõivatus on OAuthi kontode protsessisisene pehme jaotus.
- Konto semaforid annavad päringute rööpsuse load ja lõpevad, kui päring on lõpetatud.
- Eksklusiivsed hallatud seansirendid on püsiv elutsükli omand koos generatsioonitõkkega.

---

## 3. Mudeli lukustus

**Ulatus:** teenusepakkuja + ühendus + mudel kolmik.

**Võtme ulatus staatuse järgi:** ebaõnnestunud staatus otsustab, millise võtme alla lukustus kirjutatakse (`resolveLockoutScope()` failis `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvoodi- või õigustesignaal — lukusta **kvoodipere**:
  codexi puhul kogu `codex` / `spark` ulatus (kõik ühenduse `gpt-5*` mudelid),
  teiste teenusepakkujate puhul `getQuotaScopedModelForProvider()`.
- `404` lukustab üksiku mudeli ennast (`getModelLockKey()` kitsendab `not_found` staatuse).
- Iga muu staatus — `5xx` transpordi-/serverivead ja OmniRoute'i enda
  kvaliteedivalideerimisest sünteesitud `502` — lukustab ainult **täpse**
  teenusepakkuja/ühenduse/mudeli kolmiku. Katkine voog ühel mudelil ei ole tõend
  konto kvoodi kohta; enne seda reeglit eemaldas üks tühi vastus mudelil
  `codex/gpt-5.6-luna` kõik selle ühenduse `gpt-5*` mudelid marsruutimisest
  2–30 minutiks (eskleeruvalt), kuigi kvoot oli puutumata.
- Kutsuja selgesõnaline `scope` valik võidab alati (Antigravity edastab `"exact"`).

**Eesmärk:** vältida kogu ühenduse keelamist, kui ainult üks mudel pole saadaval või on kvoodipiiratud.

**Näited:**

- Mudelipõhise kvoodiga teenusepakkujad, mis tagastavad 429
- Kohalikud teenusepakkujad, mis tagastavad ühe puuduva mudeli jaoks 404
- Pakkujapõhised režiimi/mudeli õiguste vead (nt Groki režiimid)

**Implementatsioon:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mudeli jahutuste töölaud (v3.8.0)

Kasutajaliides: Seaded → Mudeli jahutused (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Loetleb aktiivsed lukustused koos: teenusepakkuja, ühendus, mudel, põhjus, expiresAt. Operaatorid saavad mudeli kaardilt käsitsi uuesti lubada.

**REST API:**

- `GET /api/resilience/model-cooldowns` — loetleb aktiivsed lukustused
- `DELETE /api/resilience/model-cooldowns` — käsitsi uuesti lubamine. Keha: `{provider, connection, model}`. Autentimine: management.

### Jahutuste haldur

Kasutajaliides: Jälgimine → Jahutuste haldur (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Üks leht kõigi ühenduste jaoks, mis on ajutisel põhjusel marsruutimisest väljas,
selle asemel et avada iga teenusepakkuja leht eraldi. See loetleb ühenduste
jahutused, mudeli lukustused ja lõppolekud, tühjendab neid ühenduse kaupa, valiku
või teenusepakkuja kõigi ühenduste jaoks ning võimaldab redigeerida kõige
sagedamini häälestatud jahutusreegleid: `streamStallCooldown.enabled` ning OAuth /
API-võtme `connectionCooldown` põhijahutust ja maksimaalseid backoff'i samme
(salvestatakse läbi `PATCH /api/resilience`). Lõppolekud (`banned`, `expired`,
`credits_exhausted`) on loetletud, kuid neid ei tühjendata siin kunagi.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentimine: management):

- `GET /api/resilience/cooldowns[?provider=]` — ühendused koos staatuse, järelejäänud
  jahutuse, backoff'i taseme, viimase veatüübi ja mudeli lukustustega (ilma mandaatideta)
- `POST /api/resilience/cooldowns` — keha `{connectionIds: string[]}` või
  `{all: true, provider?}`; tagastab `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lukustuse seadete kasutajaliides + õnnestumistega vähenev taastumine (v3.8.23)

Mudeli lukustus muutus alati sees olevast kõvakodeeritud käitumisest täielikult
seadistatavaks, vabatahtlikult sisselülitatavaks funktsiooniks, millel on oma
seadete kaart ja iseparanev taastumistee.

**Seadete kaart:** Seaded → Mudeli lukustus
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
See **erineb** ülalolevast kirjutuskaitstud `ModelCooldownsCard`-ist (mis ainult
_loetleb_ aktiivseid lukustusi) — uus kaart _seadistab parameetreid_.
Vaikeväärtused asuvad `DEFAULT_MODEL_LOCKOUT_SETTINGS`-is
(`src/lib/resilience/modelLockoutSettings.ts`):

| Seade                   | Vaikimisi                        | Tähendus                                                        |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | Pealüliti — mudeli lukustus on **vaikimisi väljas**.            |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ülesvoolu staatused, mida loetakse mudeliulatuslikuks veaks.    |
| `baseCooldownMs`        | `120_000` (120 s)                | Esialgne lukustuse kestus esimese vea korral.                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskaleeritud jahutuse ülempiir.                                 |
| `maxBackoffSteps`       | `10`                             | Maksimaalne eksponentsiaalse backoff'i eskaleerimissammude arv. |
| `useExponentialBackoff` | `true`                           | Kas korduvad vead eskaleerivad jahutust eksponentsiaalselt.     |

Seaded salvestuvad tavalisse seadete hoidlasse ja valideeritakse vastupidavuse
seadete skeemiga; kaart piirab `baseCooldownMs`/`maxCooldownMs`
(kus `maxCooldownMs ≥ baseCooldownMs`) ja `maxBackoffSteps` väärtusi.

**Õnnestumistega vähenev taastumine:** taastumine **ei ole** pelgalt taimeri
aegumine. Terve vastus vähendab mudeli vealoendit tagasi, nii et akna keskel
taastunud mudel lõpetab eskaleerumise (ja tühjendatakse) enne, kui selle taimer
aeguks. Eduka combo-sihi korral kutsub `open-sse/services/combo.ts` funktsiooni
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), mis
**poolitab** salvestatud `failureCount` väärtuse (`Math.floor(failureCount / 2)`);
kui see jõuab `0`-ni, kustutatakse lukustuse kirje täielikult. Kolbbfunktsioon
`recordModelLockoutFailure()` suurendab loendit (ja eskaleerib jahutust)
eskaleerimisakna sees toimunud vigade korral. See õnnestumistel põhinev
vähenemine on lisaks tavalisele taimeri aegumisele — kumbki tee võib mudeli
uuesti lubada.

**Olek:** lukustusi hoitakse **mälus** (protsessipõhised `Map`-id
`ModelLockoutEntry`-dega, võtmeks `provider:connectionId:model`, täpse ulatuse
lukkudel `provider:connectionId:exact:model`), neid ei salvestata
andmebaasi — need kaovad taaskäivitusel. _Seaded_ salvestatakse; aktiivne
lukustuse _olek_ on efemeerne.

---

## 4. Kvoodijagamise samaaegsuse kontroll (v3.8.36)

Tellimuskontod (GLM, MiniMax jne) aktsepteerivad sageli vaid ~1–3 samaaegset päringut; selle ületamine käivitab 429-vead ja jahtumisperioodid. See on eriti terav **kvoodijagamise** (`qtSd/…`) kombinatsioonide puhul, kus mitu API-võtit jagavad ühte ülesvoolu kontot. Kolm kihti hoiavad jagatud konto üleujutamise eest.

### Ühendusepõhine samaaegsuse piirang (`max_concurrent`)

Iga pakkuja ühendus saab deklareerida `max_concurrent` ülempiiri (`provider_connections.max_concurrent`, määratud ühenduse modaalis / API-s / andmebaasis). Jätke see tühjaks, kui piirangut pole. See on ainus nupp, mis juhib allolevat serialiseerimiskihit – seadke see konto tegelikule samaaegsusele (nt GLM ~1, MiniMax ~2).

### Mudelipõhised samaaegsuse piirangud (`modelConcurrency`)

Ühendus saab lisaks deklareerida täpsed mudelipõhised samaaegsuse ülempiirid oma `rateLimitOverrides` kaardis:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Määrake see ühenduse modaalis (**Rate limit overrides → Per-model concurrency caps**, üks `model=cap` rea kohta) või `PATCH /api/providers/[id]` kaudu sama JSON-kujuga. Võtme semantika:

- **Ühenduseülene vs mudelispetsiifiline:** `maxConcurrent` jääb jagatud ühenduseüleseks ülempiiriks. Kui mõlemad kehtivad, omandatakse mõlemad väravad aatomiliselt samas liitväravas (`global → provider → account → model`); tegelik käitumine on rangem kohaldatav piirang.
- **Täpne mudelivõtme vaste:** võti on mudeli string, mis edastatakse täitjale pärast marsruutimise lahendamist – tavaliselt paljas ülesvoolu mudeli ID (`glm-5`), mitte kliendipoolne `provider/model` alias (`zai/glm-5` ei vasta `glm-5`). Väärtused on positiivsed täisarvulised samaaegsete päringute ülempiirid.
- **Kohalik järjekord, puudub avastamine:** liigsed päringud järjekorda kohapeal olemasoleva järjekorra/ajalõpu semantikaga (tüübitud `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` vastuvõtuvead). OmniRoute ei avasta ega järelda ülesvoolu poliitikat – see jõustab täpsed piirangud, mille operaator on konfigureerinud. Küllastunud mudelivärav ei lülita kunagi pakkujat välja ega loo püsivat mudeli lukustust; ülesvoolu 429/jahtumis-/tagavaramehhanismi käitumine jääb veapiiriks.
- **Ühendusepõhine, protsessipõhine ulatus:** piirangud on andmebaasi ühendusepõhised ja hoitakse mälus, nii et kaks ühendust, mis kasutavad sama ülesvoolu API-võtit, ei koordineeri omavahel.
- **Konfigureerimata tähendab muutumatut:** kaardi väljajätmine (või armatuurlaua välja tühjaks jätmine) ei lisa mudeliväravat. Näide konfiguratsioonist ilma universaalset pakkuja piirangut kehtestamata:

```text
glm-5=1
glm-4.7=3
```

### Kvoodijagamise päringute serialiseerimine

Kui kvoodijagamise dispetšer suunab päringu ühendusele, mis deklareerib positiivse `max_concurrent`, serialiseeritakse samaaegsed päringud sellele **kontole** ühendusepõhise semafori kaudu (võti `qsconn:<connectionId>`): liigsed päringud **ootavad järjekorras** konto üleujutamise asemel. See on **fail-open** – küllastunud järjekord või ajalõpp jätkub ilma pesata, selle asemel et kunagi dispetšeeritavat päringut tagasi lükata. Lülitage sisse **Settings → Resilience → Quota-share per-connection concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, vaikimisi sisse lülitatud). Ilma `max_concurrent` piiranguta jääb käitumine muutumatuks.

> Kvoodijagamise marsruutimisvärav (`selectQuotaShareTarget`, DRR + P2C) on iseenesest fail-open ja ainult _deprioriseerib_ piirini jõudnud ühenduse – ühe ühenduse puhul ei saa see kõvasti piirata, seega see semafor on see, mis tegelikult üleujutust ohjeldab.

### Kombineeritud jahtumisperioodi teadlik korduskatse

Iga kombineeritud strateegia puhul (kui see on lubatud) ootab päring, mis kristalliseeriks 429-vea LÜHIKESE mööduva jahtumisperioodi jaoks, selle ära ja saadab uuesti, selle asemel et tagastada 429 – see hõlmab Gemini-klassi TPM/RPM aknaid (~60s retry-after) mitme mudeli kombinatsioonide puhul, nt mõlemad 2-mudeli kombinatsiooni sihtmärgid jõuavad mudelipõhise piirini. Piiratud `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) seadetes **Settings → Resilience**. See ei oota kunagi `quota_exhausted` (lukustatud südaööni) ega autentimis-/mitteleidmise põhjuste puhul.

Sama värav katab eeldispetšerimise juhtumi (#16319): kui iga kombinatsiooni sihtmärk jäetakse vahele enne mis tahes katse tegemist, kuna selle mudel on lühiajalises mööduvas lukustuses, ootab nullkatse tee luku ära samade piirangute all ja dispetšeerib uuesti, selle asemel et vastata vihjeta `503 ALL_TARGETS_SKIPPED`. Kui ootamine pole lubatud (piirang, katse või eelarve on ammendatud või funktsioon on välja lülitatud), uuendatakse lõplik vastus `429 rate_limit_error`-ks, mis sisaldab `retry_after` / `reset_at` varaseimast mööduvast luku aegumisest; kvoodi-, autentimis- ja mitteleidmise lukud säilitavad vihjeta 503.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Päringujärjekorra vastuvõtukontroll (v3.8.49 · issue #6593)

**Ulatus**: kohalik pakkujapõhine+ühendusepõhine päringusageduse piirangu järjekord (`open-sse/services/rateLimitManager.ts`, mille aluseks on Bottleneck), üks kiht allpool kolmest eespool kirjeldatud mehhanismist.

**`maxWaitMs` piirab järjekorra-ootamist; `executionMaxWaitMs` piirab täitmist.**
Need kaks on teadlikult eraldatud ega toida teineteist.

`resilienceSettings.requestQueue.maxWaitMs` on **järjekorra-ootamise eelarve**: see hõlmab pakkujakoha ootamist ja seejärel olekus QUEUED viibimist ning selle taimer tühistatakse hetkel, kui töö lahkub olekust QUEUED ja alustab täitmist (`rateLimitManager.ts`, `wrappedFn`). Seda ületav päring ei jõua kunagi ülesvooluni. Vaikimisi 30000ms, mille määrab `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` failis `src/lib/resilience/settings.ts` ja mille kinnitab `tests/unit/ratelimit-admission-control-6593.test.ts`, nii et selle muutmine muudab selle testi punaseks, selle asemel et jätta see lõik vaikselt aegunuks.

`resilienceSettings.requestQueue.executionMaxWaitMs` on see, mida Bottleneck saab töö `expiration`-väärtusena ja mille taimer käivitub alles pärast väljasaatmist. See on varukaitse täitjatele, millel pole oma ülesvoolu ajalõppu, ja see tõstetakse täitja enda fetch'i-alustamise ajalõpuni, kui see on pikem, nii et see ei saa katkestada tervet käimasolevat vastust. Vaikimisi 600000ms (10 min).

Järjekorraeelarve suunamine `expiration`-väärtusse on see, mis varem tappis mitteinkrementaalsed lüüsid keset teekonda — need töötavad õiguspäraselt minuteid enne esimesi baite — ja seetõttu kuvatakse aegumine kujul `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), samas kui järjekorraeelarve kannab järjekorra-ajalõpu koodi. Kumbagi saab alistada keskkonnamuutujate `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) või juhtpaneeli kaudu
(**Seaded → Vastupidavus**). Normaliseerimisel piiratakse mõlemad vahemikku 1ms–24h.

**Ülimuslikkus mõlema puhul:** keskkonnamuutuja määrab ainult _vaikimisi väärtuse_. `resilienceSettings.requestQueue`-s püsisalvestatud väärtus (juhtpaneel / API-patch, salvestatud `key_value`-sse) on sellest ülimuslikum ja ühendusepõhine `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` on omakorda sellest ülimuslikum. Keskkonnamuutuja seadmine juurutusel, kus püsisalvestatud väärtus on juba olemas, ei muuda seega midagi — selle asemel tühjendage või värskendage püsisalvestatud seadet.

Järjekorras viibimist piirab `maxWaitMs`; allolev `maxQueueDepth` piirab seda, kui palju kutsujaid võib korraga järjekorras olla.

**Kehas teatatud korduskatsed: tempo pidamine vs lukustus.** 429-keha võib nimetada oma ooteaja (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), mille loeb `updateFromResponseBody`. Ühenduse `maxWaitMs`-i sisse mahtuv ootus on tempo pidamine: piiraja tühjendab selleks ajaks oma reservuaari ja järjekorras olevad kutsed saadetakse välja, kui see taas täitub. `maxWaitMs`-ist pikemat ootust ei suuda järjekord ära istuda — Gemini vastab ammendunud päevakvoodile `retryDelay: "86399s"`. Ümberehitatud 429 peal edastatud `Retry-After` (#16528) paneb reservmehhanismi mudeli selleks aknaks juba lukku, kuid ka piiraja peatamine selle pärast peataks ikkagi iga kutse, mis jõuab võtmeni liiga vara (näiteks pärast vastupidavuse lähtestamist), kogu `maxWaitMs`-i vältel. Kui selline ootus pärineb tüübitud Google'i `RetryInfo`-detailist (päritoluga `google_rpc_retry_info`) ja võtme piiraja on juba mudelile piiritletud (vt `getLimiterKey`), muutub 429 selle asemel mudeli lukustuseks sellel ühendusel (`lockModelForLongBodyRetry` failis
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, ülempiiriga 24h) ning piirajat ei peatata. Kontovalik jätab selle luku tõttu mudeli vahele `isModelLocked()` kaudu ning samamoodi teeb seda kombo väljasaatuse-eelne värav ühendusele kinnitatud sihtmärkide puhul. Antigravity puhul, mille piiraja on kvoodiperekonna kohta, kehtib lukustus täpsele mudelile, nagu ka tema muud kvoodilukud. Ka kliendi küsitud nimi lukustatakse, kui alias lahendas selle sellele mudelile, sest need kontrollid kasutavad küsitud nime; see lukustatakse täpselt (`lockExactModel`), nii et alias, mis ületab antigravity kvoodiperekonda või codex'i ulatuse, ei lukusta kunagi iseennast. Proosavihje, tüüpimata `retryDelay` või kogu ühenduse jagatud piiraja jätab pausi alles. Kui piiraja, mille 429-tee just üles ehitas, siiski peatub, tõrjutakse kutsuja, kelle järelejäänud järjekorraaeg lõpeb enne pausi, kohe järjekorra-ajalõpu koodiga (`checkLimiterPause`), selle asemel et seda aega ära oodata; salvestatud lõpp ankurdatakse enne piiraja koostamist, kus Bottleneck käivitab oma värskenduskella, ja iga hilisem reservuaari muudatus unustab selle. Seda katavad
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` ja
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — sisselülitatav vastuvõtu ülempiir (uus).** `resilienceSettings.requestQueue.maxQueueDepth`
piirab seda, kui palju päringuid võib ühe pakkuj+ühenduse kohta korraga järjekorras oodata (ilma et neid oleks veel välja saadetud). Kui järjekorras on juba `maxQueueDepth` päringut, tõrjutakse uus päring kiiresti tüübitud
`code: "RATE_LIMIT_QUEUE_FULL"` veaga **enne**, kui see üldse jõuab `limiter.schedule()`-ni
— nii on tõrjumine odav ja toimub enne igasugust allavoolu prompt'i tihendamise / tõlkimise tööd selle päringu jaoks. Vaikimisi `0` =
keelatud, mis säilitab olemasoleva piiramata järjekorra käitumise; piiratud vahemikku 0–100000.
Alistamine `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) või
`resilienceSettings.requestQueue.maxQueueDepth` (juhtpaneel / API-patch) kaudu.

Vastuvõtukontroll ise on puhas funktsioon
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), nii
et seda saab ühiktestida ilma tõelise Bottleneck'i piirajata.

> RFC, mis avas #6593, pakkus välja ka lipu `bypassCompressionOnRateLimit`.
> Selle repositooriumi toruliin `open-sse/services/compression/` on
> viiba/konteksti pakkimine väljuvas LLM-päringus (`chatCore.ts`,
> ploki `resolveCompressionSettings`/`selectCompressionStrategy` ümbruses),
> mitte HTTP-vastuse pakkimine sünteesitud 429-kehade puhul — sõnaselge
> möödaviigu lipu jaoks pole vastavat kooditeed olemas. See viibapakkimise
> samm käib päringu toruliinis praegu samuti _enne_ funktsiooni
> `withRateLimit()`, nii et ümberjärjestamine, et jätta see järjekorra
> täitumise tagasilükkamisel vahele, on eraldi ja suurem muudatus kui selle
> issue ulatus; seda **ei** juurutatud siin tahtlikult ja see jäetakse
> jätkutööks, juhul kui CPU kokkuhoiu võit kaalub üles ümberjärjestamise
> riski.

### Kiirusepiirangu automaatse lubamise turvavõrk ja ühenduse kaitse (`rateLimitProtection`)

**Automaatse lubamise turvavõrk** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, vaikeväärtus `true`):
Vaikimisi lubab OmniRoute automaatselt kiirusepiirangu järjekorrakaitse kõigil aktiivsetel API-võtme pakkujaühendustel (`getProviderCategory(provider) === "apikey"`). See tagab, et sissetulevad päringud kiirustundlikele ülesvoo API-võtmetele pannakse järjekorda ja neid piiratakse Bottleneck'i kaudu, selle asemel et need purskkuksid ülesvoo 429-vigadena. Turvavõrku saab alistada keskkonnamuutujaga `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` keelab, `true`/`1`/`on` sunnib sisse), mis läheb ette salvestatud armatuurlaua seadele (**Seaded → Vastupidavus** / `PATCH /api/resilience`).

**Ühendusepõhise `rateLimitProtection` semantika:**
Ühendusepõhist kiirusepiirangu kaitset jälgitakse pakkujaühenduste tõeväärtusväljaga `rateLimitProtection` (SQLite'is salvestatud kui `rate_limit_protection`):

- **Selgesõnaliselt sees (`rateLimitProtection === true`)**: Kiirusepiirangu kaitse on selle ühenduse jaoks selgesõnaliselt lubatud, olenemata pakkuja kategooriast või sellest, kas automaatse lubamise turvavõrk on sisse lülitatud.
- **Selgesõnaliselt väljas (`rateLimitProtection === false`)**: Keelab selgesõnalise kaitse, kuid **ei** jäta aktiivset API-võtme ühendust globaalsest automaatse lubamise turvavõrgust välja. Funktsioonis `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) on `false` ja `undefined` võrdväärsed: ainult väärtust `rateLimitProtection === true` käsitletakse selgesõnalise alistamisena. Kui `rateLimitProtection` on `false` (või määramata), vastab aktiivne API-võtme ühendus ikkagi automaatse lubamise tingimusele ja jääb kiirusepiirangu kaitse alla.
- **Ühendusepõhist loobumist pole**: Operaator ei saa praegu väljendada "see üksik aktiivne API-võtme ühendus peab töötama ilma kiirusepiirangu järjekorrakaitseta", säilitades samal ajal automaatse lubamise teistele aktiivsena. Et API-võtme ühendused töötaksid täielikult ilma kiirusepiirangu järjekordadeta, tuleb turvavõrk globaalselt välja lülitada (`RATE_LIMIT_AUTO_ENABLE=false` või `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Toetatud kirjutamisteed:**

- **`POST /api/rate-limits`**: Toetatud halduse kirjutamistee ühenduse `rateLimitProtection` lülitamiseks (`{ connectionId: string, enabled: boolean }`). Kutsumine väärtusega `enabled: true` lülitab selgesõnalise kaitse sisse; kutsumine väärtusega `enabled: false` eemaldab selgesõnalise kaitse (kuigi aktiivsed API-võtme ühendused jäävad globaalse turvavõrgu alla, kui automaatne lubamine on sees).
- **`PUT /api/providers/[id]`**: Tahtlikult **ei** võta vastu ega pööra väärtust `rateLimitProtection` (#11278). Pakkujaühenduse metaandmete uuendamine tee `PUT /api/providers/[id]` kaudu ei muuda kunagi salvestatud kiirusepiirangu kaitse olekut.

---

## 6. Aeglase voo läbilaskevõime watchdog (#9709)

Valikuline `resilienceSettings.streamRecovery.throughputWatchdog`-kaitse tuvastab
ülesvoo, mis endiselt saadab tükke, kuid toodab assistendi väljundit alla
konfigureeritud kasuliku väljundi määra. See on tahtlikult erinev tegevusetuse
ajalõpust: heartbeat-signaalid ega metaandmed ei lähtesta kumbagi taimerit ega
loeta edusammuks. Samuti erineb see jäigast katse tähtajast (#9153), mis jääb
absoluutseks turvalagiks olenemata väljundi kvaliteedist.

Watchdog vajab enne katkestamist soojenemisperioodi, millele järgneb täielik
liuvaken. See loeb tekstideltaid Chat Completionsi ja Responses API
väljundsündmustest (konservatiivne UTF-8 baidipõhine asendusmõõt), ignoreerib
ainult kasutusandmeid sisaldavaid ja tühje sündmusi ning peatab hinnangu, kuni
tööriistakõne või arutlussündmused on pooleli. See on vaikimisi välja lülitatud
ja selle saab sisse lülitada sättega `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
akent, soojenemist, minimummäära ja minimaalset mõõdetavat väljundit piirab
tavaline resilience-sätete normaliseerimiskiht.

Kui watchdog on lubatud, rakendub selle katkestus ainult aktiivsele ülesvoo
katsele. Enne mis tahes kliendile nähtavaid baite võib olemasolev sama konto
varajase taastumise tee katse uuesti avada. Pärast commitimist ei korrata voogu
kunagi pimesi; sufiksi saab kokku õmmelda ainult olemasolev turvaline voo keskel
jätkamise leping. Lõpuleviimine jääb ühekäiguliseks, nii et kasutuse arvestust
ja semafori vabastust ei dubleerita.

---

## 7. Ülesvoolu staatuse ümbertõlgendamine (valestaatusega kvoodivead)

**Ulatus:** üks ülesvoolu lüüs, mis teatab ajutisest kvoodi ammendumisest vale HTTP staatusega.

**Eesmärk:** korrigeerida eksitav staatus ENNE klassifitseerimist, et allavoolu tarbijad (fallback-mootor, combo-agregatsioon, kliendile suunatud vastus) näeksid tõrke tegelikku kordatavat olemust.

Mõned lüüsid signaliseerivad AJUTIST kvoodi ammendumist mitte-kordatava HTTP
staatusega. `agentrouter.org` tagastab `403` (mõnikord `400`) hiinakeelse
kehaga (`用户额度不足` / `额度不足`) standardse `429` asemel. Kliendid nagu
Claude Code käsitlevad `403` kui püsid viga ja katkestavad seansi, ning ilma
korrigeerimiseta klassifitseeriks fallback-mootor selle kui `AUTH_ERROR`,
mitte kvoodisündmusena.

**Teostus:**

- Register + sobitaja: `open-sse/config/upstreamStatusRestatement.ts` —
  teenusepakkujapõhine reeglite loend (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), mida sobitatakse `applyStatusRestatement()` kaudu.
- Väljakutsekoht: `providerFailure:` plokk failis `open-sse/handlers/chatCore.ts`
  (umbes real 3654), vahetult pärast seda, kui `parseUpstreamError()` parsib
  vea-HTTP-staatusega ülesvoolu vastuse (`!providerResponse.ok`), ja enne mis
  tahes klassifitseerimise käivitamist, et iga allavoolu tarbija näeks
  korrigeeritud staatust. `200` SSE-voo sisse manustatud vead läbivad eraldi,
  hilisema vooparsimise tee ja see hook neid täna **ei** kata — teadaolev
  piirang, mida agentrouteri valestaatuse jaoks (mis avaldub
  vea-HTTP-staatusena) pole veel vaja.
- Korduskelmidus: `429` kuulub `RETRY_AFTER_ELIGIBLE_STATUSES` hulka
  (`open-sse/services/combo/unavailableRetryGate.ts`), seega kannab
  ümbertõlgendatud viga reaalset kordusakent, selle asemel et avalduda
  surnud `403`-na.
- Sünteetiline `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  on ainult see, mida ümbertõlgendatud vastus **kliendile** ütleb; see ise ei
  ole ühenduse sisemine cooldowni/lockouti kestus — seda määrab eraldi see
  mehhanism, mis ümbertõlgendatud viga tegelikult käsitleb (Connection
  Cooldowni eskaleeruv backoff, §2, alus `3s` API-võtme pakkujatele; või
  Model Lockout, §3, mudelikohtse kvoodi pakkujatele nagu agentrouter).
  Ruuter võib sisemiselt korduskõlbulikuks muutuda varem kui 60s aken, mida
  ta kliendile kuulutab — taotluslik varu, mitte viga.

Püsid vigu (agentrouteri `无权访问模型` — sellele mudelile pole juurdepääsu)
EI tõlgendata KUNAGI ümber: `excludeMarkers` paneb reeglile veto isegi siis,
kui `textMarkers` tabab, nii et viga säilitab oma algse staatuse ja miski ei
korda seda lõputult. Vastava teenusepakkuja klassifitseerimisreegliga
(`agentrouter-model-access-denied` failis `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklareeritud alus-cooldown `6h`)
konsulteerib `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_enne_ üldise apikey-kategooria `FORBIDDEN` varajast tagastust, piiritletuna
`honorsRuleLockScope(provider)` tingimusega (#10334 — praegu ainult
agentrouteri jaoks `HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubaloendi kaudu failis
`providerErrorRules.ts`). Reegli deklareeritud 6h cooldown voolab edasi kui
`fallbackResult.baseCooldownMs`, kuid see söödab endiselt olemasolevat
mudelikohtse kvoodi lockouti teed (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, mida #10334 ei muutnud peale cooldowni
allika): see kärbitakse operaatori `mlSettings.maxCooldownMs` piirini
(vaikeväärtus `1_800_000ms` / 30min), nagu iga teinegi mudeli lockout, ja
_püsistatud lockouti põhjus_ jääb olemasolevaks kõvakodeeritud
`"forbidden"`-iks, mitte reegli `"auth_error"`-ks — otsast lõpuni austatakse
ainult cooldowni kestust, mitte põhjuse sõnet. Ühendus ise jääb aktiivseks;
sama ühenduse sõsarmudelid jäävad puutumata.

Ümbertõlgendatud kvoodivead (`额度不足`) jõuavad tootmises teenusepakkuja
reeglini (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, oma deklareeritud cooldownita — kehtib püsivuskihi
skaleeritud backoffi vaikeväärtus). Alates #10334 TARBITAKSE `scope` välja
`ProviderErrorRuleMatch`-il otsast lõpuni, kuid **ainult** teenusepakkujate
puhul, kes kuuluvad `HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubaloendisse
(`providerErrorRules.ts` — täna ainult `"agentrouter"`, piiritletuna
`honorsRuleLockScope()` kaudu). Kõigi teiste teenusepakkujate puhul jääb
`scope` informatiivseks, täpselt nagu enne #10334. `checkFallbackError` toob
sobitatud reegli scope'i pinnale kui `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) on
jagatud valvur, mis kinnitab, et `ruleScope` on tõeliselt ohutu austada
ühenduseülase, iseterveneva signaalina (scope `"connection"`, põhjus
`quota_exhausted`, kunagi `permanent`, kunagi `creditsExhausted` — kaitse
tulevase reegli vastu, mis seoks scope'i `"connection"` püsi
kontoseisundiga). Seda kutsuvad kaks tarbijat:

- **Püsivus** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  selle asemel, et langeda läbilaskepakkuja **mudelikohtase** lukustuse
  harusse (agentrouter on `passthroughModels: true` → `hasPerModelQuota()`
  tagastab `true`), rakendab see **ajutist ühenduse jahutusaega** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, mitte kunagi lõplikku
  olekut (`credits_exhausted`/`banned`/`expired`) — nii et ühendus taastub
  iseenesest, kui jahutusaeg möödub, selle asemel et nõuda mandaadi käsitsi
  lähtestamist. Jäetakse vahele ühenduste puhul, millel on
  `disableCooling: true` (#2997): see loobumine läheb hoopis üle
  mudelikohtasesse lukustusse (dokumenteeritud kompromiss — vt haru kohal
  olevat koodikommentaari).
- **Sama päringu kombo suunamine** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama kaitse märgib
  ühenduse mälus olevasse `exhaustedConnections` hulka, võtmena
  `${provider}:${connectionId}`. See jätab vahele ainult SAMA PÄRINGU
  allesjäänud eesmärgi, mis _ise juba kannab täpselt seda `connectionId`'d_
  oma eesmärgiobjektil (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` enne `exhaustedConnections` otsingut) — tavaline
  mudeliloendi kombo, kus sõsareesmärgid ei kanna oma kinnitatud
  `connectionId`'d ja üks neist lahendatakse alles iga saatmise korral
  vastuse `X-OmniRoute-Selected-Connection-Id` päise põhjal, ei taba kunagi
  seda võtmekattuvust. Selle levinud juhu puhul EI OLE tegelik kaitse
  allesjäänud haru vastu, mis taaskasutaks just ammendatud kontot, see hulk
  — see on eespool kirjeldatud püsikiht (ühenduse `rateLimitedUntil` on nüüd
  tulevikus) koos sama kaitsega, mis surub alla
  `transientRateLimitedProviders` selle tõrke jaoks (vt jaotist
  "Kaheastmeline disain" ja koodikommentaari
  `isAgentrouterConnectionQuotaScope` haru kohta failis
  `targetExhaustion.ts`): kui see hulk jäetakse märgistamata, siis `combo.ts`
  `allowRateLimitedConnection` sunnitud lubamine
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) EI rakendu pakkuja
  allesjäänud harude jaoks, nii et mandaadivaliku `rateLimitedUntil` filtrit
  (`src/sse/services/auth.ts:1238`) järgitakse tavapäraselt ja allesjäänud
  haru kas valib teise, endiselt sobiva agentrouteri ühenduse või
  ebaõnnestub, kuna mandaate pole saadaval — see ei suru end jõuga tagasi
  ühendusele, mille see haru just jahutas.

### Kaheastmeline disain: staatuse ümbersõnastamine, seejärel klassifitseerimine

Staatuse ümbersõnastamine (`upstreamStatusRestatement.ts`) ja pakkuja
klassifitseerimisreeglid (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) on eraldi registrid, mis mõlemad kasutavad
võtmetena pakkuja id'd ja tekstimarkereid, kuid nad käivituvad erinevates
kohtades ja teenivad erinevaid eesmärke: ümbersõnastamine kirjutab HTTP
staatuse ümber varajases etapis failis `chatCore.ts`;
klassifitseerimisreeglid valivad varumehhanismi `reason` ja lukustavad
`scope` (`model` / `provider` / `connection`) funktsiooni
`checkFallbackError()` sees (`open-sse/services/accountFallback.ts`).

Klassifitseerimisreeglid näevad täielikku vea**teksti** (vajalik
kehatekksti markerite nagu `额度不足` sobitamiseks) ainult nende pakkujate
puhul, kes on loetletud `FULL_TEXT_RULE_PROVIDERS` lubatud loendis failis
`providerErrorRules.ts` — praegu ainult `"agentrouter"`. Iga teise
**sisseehitatud kataloogi** pakkuja puhul annab `checkFallbackError`
funktsioonile `getProviderErrorRuleMatch` ainult struktureeritud vea
(`{code, type}`), mis on piisav päise-/staatuse-/koodipõhiste reeglite
jaoks, kuid pime kehatekksti markerite suhtes. Abifunktsioon
`resolveRuleMatchBody()` teeb selle valiku: täielik veatekkst lubatud
loendis olevatele pakkujatele, struktureeritud viga ülejäänutele.
**Sisseehitatud** pakkuja lisamine `FULL_TEXT_RULE_PROVIDERS` nimekirja on
selgesõnaline pakkujakohtane nõusolek — see on olemas selleks, et iga
nimekirjas mitteoleva pakkuja vaikimisi tee jääks baidi-haaval muutumatuks.

Reegli `scope` (`model` / `provider` / `connection`) on
`FULL_TEXT_RULE_PROVIDERS` nimekirjast eraldi nõusolek: `checkFallbackError`
toob selle esile ainult kui `fallbackResult.ruleScope`, ja allavoolu
tarbijad austavad seda millegi muuna kui informatiivse sildina ainult
nende pakkujate puhul, kes on `HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubatud
loendis samas failis (juhitav läbi `honorsRuleLockScope()` — täna ainult
`"agentrouter"`). Vaata eespool jaotist "Ümbersõnastatud kvoodivead", et
näha, mida `scope: "connection"` kattuvus tegelikult teeb, kui pakkuja on
selles lubatud loendis.

**#11104 — operaatori deklareeritud reeglid mööduvad mõlemast lubatud
loendist.** Operaator saab deklareerida pakkujakohtase reegli käitusajal
läbi `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
ilma seda faili muutmata. Operaatori reegli paigutamine
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubatud
loendite taha — loendite taha, mis on mõeldud kaitsma sisseehitatud
kataloogireeglite **vaikimisi** käitumist — muudaks seadistuste mehhanismi
toimetuks iga pakkuja jaoks peale nende, kes on seal juba loetletud, kuna
reegli deklareerimine on juba operaatori selgesõnaline nõusolek.
`resolveRuleMatchBody()` ja `honorsRuleLockScope()` kontrollivad mõlemad
kõigepealt `hasOperatorRuleForProvider()`: pakkuja, kellel on operaatori
reegel, saab toore veatekksti ja tema deklareeritud `scope`'i austatakse,
sõltumata sellest, kas ta esineb ka kummaski lubatud loendis.

**Teadaolev puudujääk — `providerRuleRegistry` poole ei pöörduta kunagi
HTTP 400 puhul.** `checkFallbackError` funktsiooni `BAD_REQUEST` haru
klassifitseerib staatuse 400 täielikult omaenda mustrimassiivide kaudu
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` jne failis
`accountFallback.ts`) ja tagastab enne, kui jõutakse selle kohal olevasse
`configuredRule`/`getProviderErrorRuleMatch` harusse. Sisseehitatud
kataloogireegel (või operaatori reegel) väärtusega `status: 400` on
süntaktiliselt kehtiv, kuid ei käivitu kunagi. Ükski olemasolev reegel ei
sihi täna staatust 400, seega ei mõjuta see midagi tootmiskeskkonnas —
kuid tulevane 400 reegel nõuab, et seda haru kõigepealt muudetaks, mis on
suurem muudatus kui reegli lisamine (see klassifitseerib 400 ümber iga
pakkuja jaoks, kes juba tugineb mustrimassiivi käitumisele) ja jääb
väljapoole ühe pakkuja reegli lisamise ulatust.

### Uue kvooti valesti esitava värava lisamine

1. Registreeri üks reeglimassiiv registris `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hoia `textMarkers`
   pakkujapõhisena; ära kunagi taaskasuta üldiseid ingliskeelseid fraase,
   mis kattuvad `CREDITS_EXHAUSTED_SIGNALS`-iga
   (`open-sse/services/accountFallback.ts`).
2. Soovi korral registreeri klassifitseerimisreeglid failis
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), et
   valida õige lukustuse ulatus (`connection` kontoülese kvoodi jaoks,
   `model` mudelipõhiste vigade jaoks). See samm jõustub tootmises ainult
   nende pakkujate puhul, kelle reeglid vajavad täielikku veateksti (keha
   märgendid): lisa pakkuja id samas failis `FULL_TEXT_RULE_PROVIDERS`-sse —
   vastasel juhul annab `checkFallbackError` reeglile alati vaid
   struktureeritud `{code, type}` vea ja kehatekstipõhine reegel ei sobi
   kunagi tegeliku liiklusega. Reeglid, mis sobivad puhtalt
   `status`/`headers` põhjal (nagu Opencode'i või Minimaxi omad), ei vaja
   seda sisselülitust. Eraldi: kui reegel deklareerib
   `scope: "connection"` ja eesmärk on tegelik ühenduseülene jahtumine koos
   sama päringu kombo vahelejätmisega (mitte lihtsalt informatiivne silt),
   lisa pakkuja id samas failis `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sse —
   just see juhib `isAgentrouterConnectionQuotaScope()`-laadset tarbimist
   `markAccountUnavailable()`-s (`src/sse/services/auth.ts`) ja
   `applyComboTargetExhaustion()`-s
   (`open-sse/services/combo/targetExhaustion.ts`); ilma selleta liigub
   `scope` endiselt läbi `fallbackResult.ruleScope`, kuid miski ei reageeri
   sellele.
3. Lisa ühiktestid, mis peegeldavad
   `tests/unit/upstream-status-restatement.test.ts` ja
   `tests/unit/agentrouter-error-rules.test.ts` (sealhulgas
   mitte-permanent- ja mitte-creditsExhausted-kaitsekontrollid ning — kui
   pakkuja vajab lubanimekirja — test, mis kinnitab, et
   `resolveRuleMatchBody()` tagastab täisteksti ainult selle pakkuja
   jaoks).

Muudatusi `chatCore.ts`-s, `classifyError`-s ega kombos pole vaja.

#### Väljuv-IP-põhine lukustus (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-s olevaid pakkujaid (opencode'i perekond)
käsitletakse IP-põhise ülesvooluna (opencode'i tasuta tase on IP-põhine,
mitte kontopõhine — vt #9611): olekukoodiga 429 klassifitseeritud
`quota_exhausted` **või** `rate_limit_exceeded` jahutab maha kõik
lubanimekirjas oleva perekonna ühendused, mille viimati teada olev
väljuv-IP ühtib ebaõnnestunud ühenduse omaga, enne kui rotatsioon saab neid
proovida
— vältides N-1 garanteeritult ebaõnnestuvat ülesvoolukutset (sama muster
nagu #10460/#10525). `rate_limit_exceeded` on kaasatud teadlikult:
`markAccountUnavailable` teel ei sobi opencode'i-spetsiifilised reeglid
kunagi (`checkFallbackError`-le ei anta päiseid ega keha, opencode pole
`FULL_TEXT_RULE_PROVIDERS`-s), seega klassifitseeritakse 429, mille keha
kannab tellimuse kvoodi teksti ("monthly usage limit reached"),
kvooditeksti tagavaralahenduse (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1h jahtumine) poolt kui `quota_exhausted`, enne kui
`status_429` reeglini üldse jõutakse — samas kui kvooditekstita 429
(tavaline kiiruspiirang) klassifitseeritakse `status_429` reegli kaudu kui
`rate_limit_exceeded` ja jahutab ikkagi IP-perekonna maha. Lubanimekirjas
oleva pakkuja jaoks on IP-põhine kiiruspiirang sama signaal kui ammendunud
kvoot. Tegelikud piirangud:

- **Parima pingutuse põhimõte (best-effort)**: lukk lahendab ühenduse viimati teadaoleva `egress_ip` tabelist `proxy_logs` (24 h aken, sünkroonne, ilma vahemäluta). Külma vahemälu korral (egress-IP-d pole kunagi sondeeritud) või kui rida puudub → haru jahutab ebaõnnestunud ühenduse ikkagi (salvestatakse nagu praegu), lihtsalt ühtegi kaasühendust ei lukustata.
- **Mitte kunagi lõplik**: jahutus on uuenev kvoodiaken (`testStatus: "unavailable"`); IP-tasandi signaalist ei tuletata kunagi püsivat olekut. `disableCooling`-ühendused jätavad haru täielikult vahele.
- **Luku granulaarsus muutub lubatud loendis oleva perekonna jaoks**: tegemist on skoobi muudatusega, mitte ainult kaasühenduse optimeerimisega. opencode on `passthroughModels`-pakkuja, seega tekitas 429 enne seda haru mudelipõhise (per-MODEL) blokeeringu; nüüd tekitab see ühenduse jahutuse — kaasa arvatud operaatori puhul, kes kasutab ainult ühte ühendust ilma ühegi kaasühenduseta. Täpselt sellise granulaarsuse deklareerib opencode'i reeglitabel juba õigena (`scope: "connection"`, `providerErrorRules.ts`), mida siiani pole täidetud, sest opencode ei kuulu hulka `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Haru kirjutab ebaõnnestunud ühenduse jahutuse + `backoffLevel`-i ise, peegeldades ühenduse-skoobiga agentrouteri haru, ja tagastab — mudelipõhise blokini ja alloleva üldise teeni ei jõuta kunagi.
- **Combo kaasa arvatud**: nagu agentrouteri haru, ignoreerib see skoop teadlikult `persistUnavailableState`/`isCombo` alandust, mida combo-kutsuja 429-le rakendab. Mudelipõhine blokeering pole selle skoobi nõrgem vorm, vaid vale ühik: see ei ütle midagi ammendunud IP kohta, seega combo-rotatsioon jätkaks ühe garanteeritult ebaõnnestuva päringu põletamist iga kaasühenduse kohta.
- **Kaasühenduse ohutus**: kaasühendust, mis on juba lõplikus olekus (banned/credits_exhausted) või juba pikemas jahutuses, ei kirjutata kunagi üle.
- **Eksklusiivne lubatud loend**: `EGRESS_BUCKETED_LOCK_PROVIDERS` laiendamine on omaniku selgesõnaline otsus; üldist ühendamist pole (muster #10334/#10419). Kaasühenduse päring seob sama lubatud loendi, selle asemel et seda SQL-literaalina korrata, nii et selle laiendamine jääb üherealiseks muudatuseks.
- **Egress-IP rotatsioon, mõlemas suunas**: otsinguaken (24 h) on palju laiem kui egress-IP vahemälu TTL (5 min), seega "viimati teadaolev IP" on ajalugu, mitte praegune olek. Kui ühenduse proksi on akna sees roteerunud, võib lukk **mööda minna** tõeliselt jagatud IP-st (salvestatud IP on uus, ammendamata) — ja sümmeetriliselt võib see **jahutada kaasühendust, mis on vahepeal ammendunud IP-st eemale roteerunud**. Teine juhtum maksab sellele kaasühendusele ühe jahutusakna; mõlemad on ajaloopõhise otsingu aktsepteeritud parima-pingutuse piirangud.
- **Kulu**: kaks piiratud läbivaatust tabelis `proxy_logs` (akna järgi filtreeritud indeksi `idx_pl_timestamp` kaudu), ainult 429 sagedusel. Uut indeksit pole (migratsioon 134 YAGNI). Mõõdetud keskmise suurusega tegeliku liiklusega andmebaasi koopia peal; suure läbilaskevõimega instants hoiab samas aknas proportsionaalselt rohkem ridu.

---

## Muud tõrkekindluse funktsioonid

- **21 marsruutimisstrateegiat** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — vt [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Lähtestamisest teadlik marsruutimine** (v3.8.0) — seab ühendused prioriteeti kvoodi lähtestamise aja järgi.
- **Taustarežiimi degraderumine** — Responses API `background: true` alandatakse hoiatusega sünkroonseks.
- **Tööriistapiirangute dünaamiline tuvastus** — taganeb pakkujatest, kui tööriistade arvu piirangud täituvad.
- **Avariiline varumehhanism** — juhitav muutuja `OMNIROUTE_EMERGENCY_FALLBACK` kaudu; operaatorid saavad selle funktsioonilippude lehel ilma taaskäivituseta alistada.

---

## Silumine

- Kaalutud combo vastab `503 all_targets_cooling_down` (`Retry-After` on määratud, `diagnostics.excluded` loetleb kõik sihtmärgid koos `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool on seadistatud ja ühendatud, iga sihtmärk on lihtsalt tõrkekindlustaimeri poolt välistatud; hoiatus `[COMBO] Weighted selection: every target excluded before dispatch — …` nimetab põhjused ja järelejäänud sekundid. Sama combo `404 no_executable_targets` tähendab, et ükski tõrkekindlustaimer polnud kaasatud (pole midagi käivitada või iga konto ei läbinud saadavuse kontrolli). Ehitatud failis `open-sse/services/combo/pinRecovery.ts` failis `targetResolution.ts` kogutud välistamiste põhjal.
- Kõik pakkuja võtmed jäetakse vahele → kontrolli nii kaitselüliti olekut KUI ka iga ühenduse välju `rateLimitedUntil`/`testStatus`.
- Pakkuja jääb pärast lähtestamisakent jäädavalt välistatuks → kood loeb otse `state`-väärtust meetodite `getStatus()`/`canExecute()` asemel.
- Üks võti ebaõnnestub, teised peaksid töötama → eelista ühenduse jahutust, mitte kaitselülitit.
- Ainult üks mudel ebaõnnestub → eelista mudeli lukustust, mitte ühenduse jahutust.
- Olek peaks ise taastuma, kuid ei taastu → kontrolli tulevikku osutavat ajatemplit ja lugemisteed, mis värskendaks aegunud olekut. Püsivad olekud nõuavad käsitsi muutmist.

---

## Käitusaja olek — agendi kiirviide

> Tõsteti sõna-sõnalt üle failist `AGENTS.md` → jaotis "Resilience Runtime State" (PR #12743), et agendi
> juhend jääks alla 40k kontekstieelarve. Tegemist on ülaltoodud jaotiste tihendatud, agendile
> suunatud vaatega; nummerdatud jaotised jäävad täielikuks viiteks.

OmniRoute'il on kolm omavahel seotud, kuid eristatavat ajutiste tõrgete mehhanismi. Hoia nende
ulatused marsruutimiskäitumise silumisel selgelt eraldi. Kiirülevaate saamiseks vaata
[3-kihilist tõrkekindluse diagrammi](../diagrams/exported/resilience-3layers.svg)
(lähtefail: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Pakkuja kaitselüliti

**Ulatus**: terve pakkuja, nt `glm`, `openai`, `anthropic`.

**Eesmärk**: lõpetada liikluse saatmine pakkujale, mis ülesvoolu/teenuse tasemel korduvalt
ebaõnnestub, et üks ebatervislik pakkuja ei aeglustaks iga päringut.

**Teostus**:

- Põhiklass: `src/shared/utils/circuitBreaker.ts`
- Vestluse värava ja täitmise sidumine: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Käitusaja oleku API: `src/app/api/monitoring/health/route.ts`
- Jagatud ümbrisefunktsioonid: `open-sse/services/accountFallback.ts`
- Püsistatud oleku tabel: `domain_circuit_breakers`

**Olekud** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: tavaliiklus on lubatud.
- `DEGRADED`: varajase hoiatuse tsoon — tõrked ületasid degraderumise läve, kuid mitte veel
  kaitselüliti läve; liiklus voolab endiselt ja töölauad kuvavad hoiatust. Kehtiv ühenduse test
  või vaikne periood ilma uute tõrgeteta viib oleku tagasi `CLOSED`-olekusse
  (aken on kirjeldatud failis `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: pakkuja on ajutiselt blokeeritud; kutsujad saavad provider-circuit-open vastuse
  või combo-marsruutimine lülitub teisele sihtmärgile.
- `HALF_OPEN`: lähtestamise ajalõpp on möödunud; lubatakse katsepäring. Edu sulgeb
  kaitselüliti, ebaõnnestumine avab selle uuesti.

**Vaikeväärtused** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, mida tarbitakse
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` kaudu failis `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` failis `src/sse/handlers/chatHelpers.ts`). Kogu pakkuja
katkestav kaitselüliti töötab parameetritel `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profiil  | degradeerub | avaneb (`circuitBreakerThreshold`) | lähtestus (`circuitBreakerReset`) |
| -------- | ----------: | ---------------------------------: | --------------------------------: |
| OAuth    |         `5` |                                `8` |                             `60s` |
| API-võti |         `7` |                               `12` |                             `30s` |
| Kohalik  | (tuletatud) |                                `2` |                             `15s` |

`PROVIDER_PROFILES` määratleb ka `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) ja `providerCooldownMs` (5/10/1 min): need juhivad
**valikulise, sisselülitatava globaalse pakkuja jahutuse (Provider Cooldown) aknaväravat**
(`PROVIDER_COOLDOWN_ENABLED`, vaikimisi välja lülitatud) — pakkujataseme kirjet failis
`open-sse/services/providerCooldownTracker.ts` loetakse jahutavaks alles pärast
`providerFailureThreshold` tõrget ajavahemiku `providerFailureWindowMs` jooksul ning seejärel
jahutub see `providerCooldownMs` aja vältel. Need EI OLE aktiivse kaitselüliti läved — ära
hääleta neid eelduses, et need mõjutaksid kaitselüliti käitumist. Iga vaikeväärtust saab
alistada keskkonnamuutujatega `OMNIROUTE_PROVIDER_BREAKER_*` ja
`OMNIROUTE_CIRCUIT_BREAKER_*`; käitusajal täpne viitetabel asub failis
`docs/architecture/RESILIENCE_GUIDE.md`.

Pakkuja kaitselüliti peaksid käivitama ainult pakkujataseme tõrkekoodid:

```ts
(408, 500, 502, 503, 504);
```

Ära käivita kogu pakkuja kaitselülitit tavaliste konto-, võtme- või mudelivigade puhul,
nagu enamik `401`-, `403`- või `429`-juhtumeid. Need kuuluvad tavaliselt ühenduse jahutuse
või mudeli lukustuse valdkonda. Tavaline API-võtme pakkuja `403` peaks olema taastatav,
välja arvatud juhul, kui see liigitatakse lõplikuks pakkuja- või kontoveaks.

Katkesti kasutab laiska taastumist, mitte taustataimerit. Kui olek `OPEN` aegub,
värskendavad lugemistoimingud nagu `getStatus()`, `canExecute()` ja
`getRetryAfterMs()` oleku väärtuseks `HALF_OPEN`, nii et armatuurlauad ja
kombo-kandidaatide koostajad ei välista aegunud pakkujat igavesti.

### Ühenduse jahutusaeg

**Ulatus**: üks pakkuja ühendus/konto/võti.

**Eesmärk**: üks vigane võti/konto ajutiselt vahele jätta, lastes samal ajal sama
pakkuja teistel ühendustel päringuid edasi teenindada.

**Teostus**:

- Kirjutamis-/uuendamistee: `src/sse/services/auth.ts::markAccountUnavailable()`
- Konto valik/filtreerimine: `src/sse/services/auth.ts::getProviderCredentials...`
- Jahutusaja arvutamine: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Seaded: `src/lib/resilience/settings.ts`

Olulised väljad pakkuja ühendustel:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Konto valimisel jäetakse ühendus vahele, kui:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Jahutusajad on samuti laisad: kui `rateLimitedUntil` jääb minevikku, muutub ühendus
taas kasutuskõlblikuks. Edukal kasutamisel puhastab `clearAccountError()` väljad
`testStatus`, `rateLimitedUntil`, veaväljad ja `backoffLevel`.

Ühenduse jahutusaja vaikekäitumine:

- OAuth põhijahutusaeg: `5s`.
- API-võtme põhijahutusaeg: `3s`.
- API-võtme `429` korral tuleks võimalusel eelistada päritud serveri korduskatsevihjeid
  (`Retry-After`, lähtestamispäised või parsitav lähtestamistekst).
- Korduvad taastatavad tõrked kasutavad eksponentsiaalset taganemist:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herd-probleemi ennetav kaitse takistab sama ühenduse samaaegsetel tõrgetel
jahutusaega korduvalt pikendada või `backoffLevel`-it topelt suurendada.

Lõppolekud ei ole jahutusajad. `banned`, `expired` (mis muutub lõppolekuks alles
pärast N piiratud arvu korduskatseid läbi `EXPIRED_RETRY_MAX`) ja
`credits_exhausted` on mõeldud jääma kättesaamatuks, kuni mandaati/seadeid muudetakse
või operaator need lähtestab. Ärge kirjutage lõppolekuid üle ajutise jahutusolekuga.

### Mudeli blokeerimine

**Ulatus**: pakkuja + ühendus + mudel.

**Eesmärk**: vältida kogu ühenduse keelamist juhul, kui ainult üks mudel on selle
ühenduse jaoks kättesaamatu või kvoodipiiratud.

Näited:

- Mudelipõhise kvoodiga pakkujad, kes tagastavad `429`.
- Kohalikud pakkujad, kes tagastavad ühe puuduva mudeli korral `404`.
- Pakkujapõhised režiimi/mudeli õigustega seotud tõrked, näiteks valitud Groki režiimid.

Mudeli blokeerimise loogika asub failis `open-sse/services/accountFallback.ts` ja
võimaldab samal ühendusel teisi mudeleid edasi teenindada.

### Silumisjuhised

- Kui kõik pakkuja võtmed jäetakse vahele, uurige nii pakkuja katkesti olekut kui ka
  iga ühenduse `rateLimitedUntil`/`testStatus` väärtusi.
- Kui pakkuja tundub pärast lähtestamise akent jäädavalt välistatud, kontrollige, kas
  kood loeb töötlemata `state` väärtust selle asemel, et kasutada
  `getStatus()`/`canExecute()`.
- Kui üks pakkuja võti ebaõnnestub, kuid teised peaksid töötama, eelistage ühenduse
  jahutusaega pakkuja katkestile.
- Kui ebaõnnestub ainult üks mudel, eelistage mudeli blokeerimist ühenduse
  jahutusajale.
- Kui olek peaks iseenest taastuma, peaks sellel olema tulevane
  ajatempel/lähtestamise ajalõpp ja lugemistee, mis aegunud olekut värskendab.
  Püsivad olekud nõuavad mandaadi või konfiguratsiooni käsitsi muutmist.

---

## TLS-i sõrmejäljed ja varjatus

Tarnijapõhine varjatus (JA3/JA4, CCH, obfuskeerimine) on dokumenteeritud eraldi — vt `docs/security/STEALTH_GUIDE.md` (git; ei kompileerita kataloogi `/docs`).

---

## Vastupidavuse testimine (faas 8 · plokk C)

Lisaks vastupidavusloogika ühiktestidele koormavad kolm testi käituskeskkonda tegelikes stressi- ja tõrkeolukordades (kõik on integratsiooni-/öötestid — ükski ei blokeeri PR-sid):

| Test        | Kirjeldus                                                                                                                                                                                                            | Käivitamine                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Võltsitud ülesvoolu sõlm süstib tegelikku latentsust, lähtestamisi, ajalõppe ja 503-vigu; kontrollib, et kaitselüliti (circuit breaker) avaneb/taastub ja et `checkFallbackError` liigitab 503 taastatava varuveana. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 voogu iga `createSSEStream` kohta `--expose-gc` all; ebaõnnestub, kui hunnik (heap) kasvab üle ülempiiri (OOM-kaitse #3069).                                                                                    | `npm run test:heap`                    |
| k6 soak     | Pidev koormus `/api/monitoring/health` vastu; p95- ja veakünnised.                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (öösel) |

Teste orkestreerib `.github/workflows/nightly-resilience.yml` (cron + käsitsi käivitamine). Vaikimisi `test:integration` käigus jätavad kaaose- ja hunniku testid end ise vahele (ilma `RUN_CHAOS_INT`/`--expose-gc`-ta).

---

## Vaata ka

- [Arhitektuurijuhend](./ARCHITECTURE.md) — Süsteemi arhitektuur ja sisemised mehhanismid
- [Kasutusjuhend](../guides/USER_GUIDE.md) — Tarnijad, kombod, CLI-integratsioon
- [Auto-Combo mootor](../routing/AUTO-COMBO.md) — 16-faktoriline skoorimine, režiimipaketid
