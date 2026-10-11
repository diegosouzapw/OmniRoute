# Resilience Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute'il on kolm eraldiseisvat, kuid omavahel seotud töökindlusmehhanismi. Igal neist on erinev ulatus ja eesmärk. Marsruutimise käitumise silumisel käsitlege neid eraldi.

![3-kihiline töökindlusmudel](../diagrams/exported/resilience-3layers.svg)

> Allikas: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Teenusepakkuja kaitselüliti

**Ulatus:** kogu teenusepakkuja (nt `glm`, `openai`, `anthropic`).

**Eesmärk:** lõpetada liikluse saatmine teenusepakkujale, millel esineb ülesvoolu-/teenusetasandil korduvalt tõrkeid.

**Teostus:**

- Põhiklass: `src/shared/utils/circuitBreaker.ts`
- Ühendamine: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Oleku API: `GET /api/monitoring/health`
- Lähtestamise API: `POST /api/resilience/reset`
- Mähised: `open-sse/services/accountFallback.ts`
- Andmebaasitabel: `domain_circuit_breakers`

**Olekud:**

- `CLOSED` — tavaliiklus on lubatud
- `DEGRADED` — liiklus on endiselt lubatud, kuid teenusepakkuja sagenenud tõrkeid jälgitakse
- `OPEN` — teenusepakkuja on ajutiselt blokeeritud; kombinatsioonmarsruutimine jätab selle vahele
- `HALF_OPEN` — lähtestamise ooteaeg on möödunud; proovipäring on lubatud

**Seadistatavad vaikeväärtused (`open-sse/config/constants.ts`, saadaval jaotises Dashboard → Settings → Resilience):**

| Klass    | Halveneb pärast | Avaneb pärast | Lähtestamise ooteaeg |
| -------- | --------------- | ------------- | -------------------- |
| OAuth    | 5 tõrget        | 8 tõrget      | 60s                  |
| API-võti | 7 tõrget        | 12 tõrget     | 30s                  |
| Kohalik  | tuletatud       | 2 tõrget      | 15s                  |

`degradationThreshold` määrab, millal teenusepakkuja läheb olekusse `DEGRADED`; `failureThreshold` määrab, millal kaitselüliti avaneb ja teenusepakkuja vahele jäetakse. Kohaliku teenusepakkuja profiile ei kuvata veel töökindluse seadete lehel.

**Rakendumiskoodid:** ainult teenusepakkuja taseme olekukoodid `[408, 500, 502, 503, 504]`. ÄRGE rakendage kaitselülitit kontotaseme tõrgete korral (enamik 401/403/429 tõrkeid — need kuuluvad jahutusaja või lukustuse alla).

**Laisk taastumine:** kui `OPEN` aegub, värskendavad `getStatus()`, `canExecute()`, `getRetryAfterMs()` oleku väärtuseks `HALF_OPEN`. Taustataimerit pole vaja.

---

### Valikuline globaalne teenusepakkuja jahutusaeg (aknavärav)

Neljas, **valikuline** kiht (`PROVIDER_COOLDOWN_ENABLED`, vaikimisi **väljas**) säilitab
päringuteüleselt tõrkuvate teenusepakkujate teavet failis
`open-sse/services/providerCooldownTracker.ts`; kombinatsiooni sihtkoha
lahendamine arvestab seda, et järjestikused kombinatsioonipäringud ei prooviks
uuesti läbi teenusepakkujat, millel äsja tõrge tekkis. Teenusepakkuja taseme kirjed
järgivad `PROVIDER_PROFILES`-i aknaväravat:

| Profiil  | rakendub pärast (`providerFailureThreshold`) | aja jooksul (`providerFailureWindowMs`) | jahtub (`providerCooldownMs`) |
| -------- | -------------------------------------------: | --------------------------------------: | ----------------------------: |
| OAuth    |                                         `10` |                                 `15min` |                        `5min` |
| API-võti |                                         `15` |                                 `30min` |                       `10min` |

Alla läve ei loeta teenusepakkujat **jahutusel olevaks**; edukas päring tühjendab
akna. Ühenduse taseme kirjed (`provider:connectionId`) kasutavad selle asemel
eksponentsiaalset `minRetryCooldownMs → maxRetryCooldownMs` taganemist. Ülekirjutused:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressioonikaitse: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ühenduse ooteaeg

**Ulatus:** üks teenusepakkuja ühendus/konto/võti.

**Eesmärk:** jätta üks vigane võti vahele, samal ajal kui sama teenusepakkuja teised ühendused jätkavad päringute teenindamist.

**Teostus:**

- Mittekättesaadavaks märkimine: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valimine: `getProviderCredentials*` samas failis
- Ooteaja arvutamine: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Seaded: `src/lib/resilience/settings.ts`

**Väljad ühenduse kohta:**

- `rateLimitedUntil` — ajatempel, milleni ooteaeg kestab
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentsiaalse taganemise loendur

**Vaikimisi ooteajad:**

- OAuthi baasaeg: 5 s
- API-võtme baasaeg: 3 s
- API-võtme 429: eelistab ülesvoolu `Retry-After`/lähtestuspäiseid/parsitavat lähtestusteksti
- Taganemine: `baseCooldownMs * 2 ** failureIndex`

**Päringutulva vastane kaitse:** takistab samaaegsetel tõrgetel ooteaega liigselt pikendada või `backoffLevel` väärtust kahekordselt suurendada.

**Voo sisu seiskumine ei rakenda kontole ooteaega.** Kui sisu seiskumise valve
(`open-sse/utils/streamHandler.ts`) loobub voost, mis ei saatnud mudeli väljundit
õigel ajal, salvestab `markAccountUnavailable()` ühendusele vea, kuid ei määra
ooteaega: seiskumine kuulub sellele päringule ja enamasti on tegu pika arutlusetapiga, millest
pole veel väljundit. Operaatorid saavad selle uuesti lubada sättega `resilienceSettings.streamStallCooldown.enabled`
(vaikimisi `false`).

**Arutluskaadrid käivitavad sisu seiskumise ajavaru uuesti.** Arutlusmudel võib mõelda
minuteid enne esimest nähtavat sõnet: Claude voogedastab `thinking_delta` kaadreid, mille
mõtlemistekst võib olla tühi, ning Responses API voogedastab ühe arutluselemendi
teise järel. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tuvastab
need kaadrid ning valve käivitab iga kaadri puhul oma ajavaru uuesti, selle asemel et
voor tühistada. Need ei ole siiski mudeli väljund, seega ainult arutlusega lõppevast voorust
teatatakse endiselt kui tühjast ning voor, mis lõpetab arutlemise ja saadab seejärel ainult
südamelööke, käivitab ikkagi valve.

Kiro binaarsed mittetühja allkirjaga `reasoningContentEvent` kaadrid säilitavad selle
arutlustegevuse täituri kaudu tühja `reasoning_content` deltana. Allkirja
edasi ei saadeta. Metaandmed, mittetäielikud kaadrid ja tühjad allkirjad ei käivita
sisu ajavaru uuesti; sõltumatu aktiivse voo ajalõpp ja kliendipoolne tühistamine kehtivad
endiselt (`open-sse/executors/kiro/reasoning.ts`).

**Lõppolekud (EI OLE ooteajad):**

- `banned` — määratakse keelatud märksõna / konto blokeerimise tuvastamisel (vt [BAN_DETECTION](../security/BAN_DETECTION.md)) ning pärast kolme järjestikust ülesvoolu päringupõhist keeldumist (`request_rejected`, nt Anthropic OAuth 403 „Request not allowed“ — `open-sse/services/requestRejectedStreak.ts`); üks keeldumine rakendab ühendusele ainult ooteaja
- `expired` (läheb pärast piiratud arvu korduskatseid lõppolekusse — `EXPIRED_RETRY_MAX = 3` eksponentsiaalse taganemisega — nii saavad ajutised OAuthi vead enne konto jäädavat inaktiveerimist ise laheneda)
- `credits_exhausted`

Need püsivad seni, kuni identimisteave muutub või operaator need lähtestab. Ärge kirjutage lõppolekuid ajutise ooteolekuga üle.

**Laisk taastumine:** kui `rateLimitedUntil` on möödunud, muutub ühendus uuesti kasutatavaks. Eduka kasutamise korral eemaldab `clearAccountError()` kõik veaväljad.

### Claude OAuthi kasutuspiir: madalama prioriteediga rada + seansipiirangu lähtestamine

**Ulatus:** üks Claude'i tellimuse (OAuth) ühendus. Mõlemad funktsioonid tuleb **iga
ühenduse puhul eraldi lubada** (Muuda ühendust → Claude'i jaotis → `lowPriorityMode` /
`autoLimitReset` väljal `providerSpecificData`, mõlemad vaikimisi välja lülitatud) ning need
jäljendavad Claude Code'i käske `/low-priority` ja `/limit-reset` (sideprotokoll jäädvustatud
Claude Code 2.1.263-st).

**Teostus:**

- Olekumasin + vastuse liigitamine: `open-sse/services/claudeLowPriority.ts`
- Lähtestusoleku/nõude klient: `open-sse/services/claudeLimitReset.ts`
- Täituri haak (päise lisamine + sama konto korduskatse): `open-sse/executors/base.ts::execute()`
- Lubamise püsiv salvestamine: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Käivitaja:** 5-tunnine kasutuspiir — `429`, mille päised sisaldavad
`anthropic-ratelimit-unified-status: rejected` ja, kui konto on sobilik,
`anthropic-ratelimit-unified-slow-offer: treatment`. Enne esimest kasutuspiiri
429 vastust ei saadeta midagi; ühtsete päisteta 429-puhang läbib tavapärase ooteaja tee.

**Madalama prioriteediga rada** (`lowPriorityMode`):

- Seina-429 korral võtab täitja pakkumise vastu ja proovib kohe uuesti **sama**
  kontot päisega `anthropic-usage-limit: slow`; rada jääb aktiivseks kuni väljakuulutatud
  `anthropic-ratelimit-unified-reset` ajani (+60 s varuaeg) ning iga selle ajavahemiku päring sisaldab
  seda päist. Vahele püütud 429 ei jõua kunagi funktsioonini `handleChatCore`, seega ühendust
  **ei** panda ooteajale ega vahetata välja.
- `anthropic-ratelimit-unified-slow-status` hilisemates vastustes: `active` / `not_needed`
  säilitavad raja; `slot_busy` (429) või `529` ootavad serveri määratud
  `anthropic-ratelimit-unified-slow-retry-after` aja (vaikimisi 20 s, piiratud vahemikku 5–600 s, ±30% juhuslik nihe)
  ja proovivad uuesti, järgides `anthropic-ratelimit-unified-slow-max-wait` ülempiiri (vaikimisi 20 min, piiratud
  vahemikku 1 min–6 h) — selle ületamisel rada lõpetatakse ja 10-minutiline jahtumisperiood blokeerib uuesti vastuvõtmise. Lisaks
  piiratakse ooteaega päringu enda ülesvoolupäringu alustamise ajalõpu järelejäänud ajaga
  (`resolveFetchStartTimeout`, vaikimisi 10 min), millest lahutatakse 5 s varu: ilma selle piiranguta
  ületaks vaikimisi 20-minutiline maksimaalne ooteaeg päringu eluea ning ootamine katkestataks
  poole pealt, tuues sujuva `max_wait` lõpetamise ja jahtumisperioodi asemel esile `TimeoutError` vea.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-tunnise akna vahetumine või
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (mis lõpetab selle
  mis tahes oleku korral põhjusel `extra_usage`, kuna tasuline ülekasutus katab nüüd piirangu) lõpetavad raja;
  seejärel liigub vastus tavapärasele ooteaja rakendamise teele. `budget_exhausted` jäetakse meelde kuni
  väljakuulutatud eelarve lähtestamiseni (≤ 8 päeva).
- Piirangu kontroll käivitub pärast täitja enda 400-koodist põhjustatud sama katse siseseid korduskatseid (konteksti
  redigeerimine, mõtlemise/pingutuse piiramine, parameetrite automaatõpe), seega püütakse kinni ka piirangu-429, mis ilmub
  alles ühe sellise korduskatse ajal, selle asemel et lasta sellel jõuda ooteaja rakendamise teele.
- Olekut hoitakse iga ühenduse kohta mälus (taaskäivitamine põhjustab uuesti vastuvõtmiseks ühe täiendava piirangu-429).

**Seansipiirangu lähtestamine** (`autoLimitReset`, proovitakse enne rada, kui mõlemad on sisse lülitatud):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  plokk; kui `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` koos kehaga
  `{ "program": "juniper_tide" }` (organisatsiooni UUID pärineb väljast
  `providerSpecificData.organizationUUID`, varuvariandina algväärtustamisest).
- `result: reset|not_limited` → päringut proovitakse uuesti täiskiirusel (ilma aeglustamispäiseta).
  `already_used` / `not_offered` jätavad `next_available_at` väärtuse meelde (vaikimisi üks nädal); iga
  tõrge rakendab 15-minutilise taganemisaja. Lähtestada saab kord nädalas ja see läheb endiselt
  nädalapiirangu arvestusse.

Regressioonikaitsed: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seansisidus (#7274)

**Ulatus:** üks kliendiseanss (päis `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) kinnistatakse ühe ühenduse külge **mis tahes** teenusepakkuja puhul.

**Eesmärk:** hoida mitme suhtlusvooruga agenti (Claude Code, aider, kohandatud agendid) päringute vahel samal kontol, vähendades kontodevahelist kontekstikadu ja korduvaid külmkäivituse 429-vigu teenusepakkujatel, kelle seansiolek on kontopõhine.

**Teostus:**

- TTL-i lahendamine: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Kinnistuse valimine/loomine: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Päise eraldamine (üldine, mis tahes teenusepakkuja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Püsiv kinnistuste tabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Seade: `sessionAffinityTtlMs` (globaalne TTL millisekundites, `0` keelab) — `src/lib/db/settings.ts`. Nimi muudeti ainult Codexile mõeldud nimest `codexSessionAffinityTtlMs` migratsiooniga `124_generic_session_affinity_ttl.sql`, mis kannab varem seadistatud Codexi TTL-i üle uueks vaikeväärtuseks.

Enne muudatust #7274 lõpetas `resolveSessionAffinityTtlMs()` kohe väärtusega `0` iga teenusepakkuja puhul peale `codex`-i, mistõttu TTL-i seade (ja seansipäised) ei avaldanud mujal mingit mõju, kuigi kinnistusmehhanism ja päiste eraldamine olid juba teenusepakkujast sõltumatud. Parandus eemaldas selle varajase lõpetamise; kui globaalne TTL on seatud suuremaks kui `0`, rakendub see nüüd ühtlaselt igale teenusepakkujale.

Kolme seansisidususe päist ei edastata kunagi ülesvoolu — täitjad koostavad oma ülesvoolupäised nullist, mitte ei edasta kliendipäiseid, seega jääb see üksnes sisemiseks korrelatsiooni-ID-ks.

### Eksklusiivsed hallatud seansi ühendusrendid

**Ulatus:** üks aktiivne hallatud HTTP-klient/seanss omab üht sobivat OmniRoute’i ühendust.

**Eesmärk:** tagada püsiv eksklusiivne ühenduse omandiõigus klientidele, kes vajavad päringute vahel ranget marsruutimispiiret. See erineb seansisidusest, mis on pehme järjepidevuseelistus:
eksklusiivne rent talletab elutsükli oleku SQLite’is, jõustab aktiivse omaniku ja
aktiivse ühenduse globaalse unikaalsuse ning lükkab aegunud põlvkonna tagasi enne teenusepakkujale edastamist.

Funktsioon on iga API-võtme puhul vabatahtlik. Hallatud võtmel peab olema ulatus `lease:exclusive` ja
selgesõnaline mittetühi loend `allowedConnections`. Elutsükli lõpp-punkti saab kasutada iga HTTP-klient; kliendi
nime, kasutajaagenti, teenusepakkujat, OAuthi meetodit ega mudelit pole vaja. Rent omab ühendust,
mitte mudelit, seega säilitab mudeli vahetamine seose seni, kuni ühendus on tavapäraselt
sobiv. Tavapärased mudeli-, kvoodi-, tervise-, ooteaja- ja lubatud loendi reeglid jäävad ülimuslikuks ning võivad
sama põlvkonna teisele vabale sobivale ühendusele üle viia.

Elutsükkel on `POST /api/v1/session-leases` koos JSON-toimingutega `acquire`, `renew` ja `release`.
Hallatud inferentsipäringud esitavad läbipaistmatu väärtuse `X-OmniRoute-Lease-Owner` ja täpse
`X-OmniRoute-Lease-Generation` väärtuse. Omanik kasutab eesliidet `vlo_`, millele järgneb 43 base64url-märki; talletatakse ainult
selle SHA-256 räsi. Iga lõplik väljasaatmistõke seob ka autenditud API-võtme ID ja
aktiivse ühenduse ID. Rendilepingu juhtpäised eemaldatakse logidest, säilitatavatest päringutõmmistest ja
ülesvoolu täituri päistest.

Kui tavalisel marsruutimisel on sobivaid hallatud kandidaate, kuid iga vaba kandidaat on hõivatud
võõra aktiivse rendilepinguga, tagastab OmniRoute HTTP `429`, koodi lease-capacity-unavailable,
võimsuse ootamise oleku ja piiratud `Retry-After` väärtuse, mis tuletatakse varaseimast asjakohasest aegumisajast.
Tavapärane sobivate kandidaatide puudumine ei ole rendilepingu pärast konkureerimine ja säilitab olemasoleva marsruutimisvea semantika.

Seotud mehhanismid jäävad eraldiseisvaks:

- OAuth-seansi hõivatus on protsessikohalik pehme jaotus OAuth-kontode jaoks.
- Kontosemaforid annavad päringute samaaegsuse lube ja lõpevad päringu täitmisel.
- Eksklusiivsed hallatud seansirendilepingud on püsiv elutsükli omandiõigus koos põlvkonnatõkkega.

---

## 3. Mudeli lukustus

**Ulatus:** teenusepakkuja + ühenduse + mudeli kolmik.

**Võtme ulatus oleku järgi:** tõrkeolek määrab, millisele võtmele lukustus
kirjutatakse (`resolveLockoutScope()` failis `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvoodi- või kasutusõiguse signaal — lukustab **kvoodipere**:
  codexi puhul kogu `codex` / `spark` ulatuse (ühenduse iga `gpt-5*` mudeli),
  teiste teenusepakkujate puhul `getQuotaScopedModelForProvider()`.
- `404` lukustab ainult mudeli (`getModelLockKey()` kitsendab olekut `not_found`).
- Mis tahes muu olek — `5xx` transpordi-/serveritõrked ja OmniRoute'i enda
  kvaliteedikontrollist sünteesitud `502` — lukustab ainult **täpse**
  teenusepakkuja/ühenduse/mudeli kolmiku. Ühe mudeli vigane voog ei tõenda midagi
  konto kvoodi kohta; enne seda reeglit eemaldas üks tühi vastus mudelilt
  `codex/gpt-5.6-luna` marsruutimisest 2–30 minutiks (eskaleeruvalt) kõik selle
  ühenduse `gpt-5*` mudelid, kuigi kvoot jäi puutumata.
- Kutsuja sõnaselgelt määratud suvand `scope` on alati ülimuslik (Antigravity edastab `"exact"`).

**Eesmärk:** vältida terve ühenduse keelamist, kui saadaval pole või kvoodipiiranguga on ainult üks mudel.

**Näited:**

- Mudelipõhise kvoodiga teenusepakkujad, kes tagastavad 429
- Kohalikud teenusepakkujad, kes tagastavad ühe puuduva mudeli puhul 404
- Teenusepakkujapõhised režiimi-/mudelilubade tõrked (nt Groki režiimid)

**Teostus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mudelite jahtumisperioodide töölaud (v3.8.0)

Kasutajaliides: Seaded → Mudelite jahtumisperioodid (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Loetleb aktiivsed lukustused koos järgmiste andmetega: teenusepakkuja, ühendus, mudel, põhjus, expiresAt. Operaatorid saavad mudeli kaardilt käsitsi uuesti lubada.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktiivsete lukustuste loend
- `DELETE /api/resilience/model-cooldowns` — käsitsi uuesti lubamine. Keha: `{provider, connection, model}`. Autentimine: haldus.

### Jahtumisperioodide haldur

Kasutajaliides: Seire → Jahtumisperioodide haldur (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Üks leht iga ühenduse jaoks, mis on ajutisel põhjusel marsruutimisest väljas, selle asemel et
avada iga teenusepakkuja leht eraldi. Seal loetletakse ühenduste jahtumisperioodid, mudelite lukustused ja lõppolekud,
neid saab kustutada ühenduse, valiku või teenusepakkuja kõigi ühenduste kaupa
ning muuta enim häälestatavaid jahtumisperioodi reegleid: `streamStallCooldown.enabled` ja OAuthi / API-võtme
`connectionCooldown` baastaseme jahtumisperioodi ning maksimaalset tagasitaandumissammude arvu (salvestatakse päringuga
`PATCH /api/resilience`). Lõppolekud (`banned`, `expired`, `credits_exhausted`) on
loetletud, kuid neid ei kustutata siin kunagi.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentimine: haldus):

- `GET /api/resilience/cooldowns[?provider=]` — ühendused koos oleku, allesjäänud jahtumisperioodi,
  tagasitaandumistaseme, viimase tõrketüübi ja mudelilukustustega (ilma identimisteabeta)
- `POST /api/resilience/cooldowns` — keha `{connectionIds: string[]}` või
  `{all: true, provider?}`; tagastab `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lukustuse seadete kasutajaliides + eduka kasutuse põhine hääbumistaaste (v3.8.23)

Mudeli lukustus muutus alati sisse lülitatud jäigalt kodeeritud käitumisest täielikult seadistatavaks,
sisselülitamist nõudvaks funktsiooniks, millel on oma seadete kaart ja isetaastuv taasteviis.

**Seadete kaart:** Seaded → Mudeli lukustus
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
See **erineb** ülaltoodud kirjutuskaitstud kaardist `ModelCooldownsCard` (mis ainult
_loetleb_ aktiivseid lukustusi) — uus kaart _seadistab parameetreid_. Vaikeväärtused
asuvad konstandis `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Seade                   | Vaikeväärtus                     | Tähendus                                                              |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `enabled`               | `false`                          | Pealüliti — mudeli lukustus on **vaikimisi välja lülitatud**.         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ülesvoolu olekukoodid, mida loetakse mudelipõhiseks tõrkeks.          |
| `baseCooldownMs`        | `120_000` (120 s)                | Esimese tõrke lukustuse algne kestus.                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskaleeritud jahtumisperioodi ülempiir.                               |
| `maxBackoffSteps`       | `10`                             | Eksponentsiaalse tagasitaandumise eskaleerimise maksimumsammud.       |
| `useExponentialBackoff` | `true`                           | Kas korduvad tõrked eskaleerivad jahtumisperioodi eksponentsiaalselt. |

Seaded säilitatakse tavapärases seadete hoidlas ja valideeritakse
töökindluse seadete skeemi kaudu; kaart piirab väärtusi `baseCooldownMs`/`maxCooldownMs`
(kus `maxCooldownMs ≥ baseCooldownMs`) ja `maxBackoffSteps`.

**Eduka kasutuse põhine hääbumistaaste:** taastamine **ei** põhine üksnes taimeri aegumisel. Korras
vastus vähendab järk-järgult mudeli tõrkeloendurit, et keset ajavahemikku taastunud
mudeli tõrked ei eskaleeruks edasi (ja lukustus eemaldataks) enne taimeri aegumist. Kombineeritud sihtmärgi
eduka vastuse korral kutsub `open-sse/services/combo.ts` funktsiooni `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), mis **poolitab** salvestatud
`failureCount` väärtuse (`Math.floor(failureCount / 2)`); kui see jõuab väärtuseni `0`, kustutatakse lukustuskirje
täielikult. Paarisfunktsioon `recordModelLockoutFailure()`
suurendab eskaleerimisakna jooksul ilmnevate tõrgete korral loendurit (ja eskaleerib jahtumisperioodi).
See eduka kasutuse põhine hääbumine täiendab tavalist taimeri aegumist —
kumbki viis võib mudeli uuesti lubada.

**Olek:** lukustusi hoitakse **mälus** (protsessipõhised `Map`-id
kirjetest `ModelLockoutEntry`, mille võtmeks on `provider:connectionId:model`, täpse ulatusega lukustuste võtmeks
`provider:connectionId:exact:model`), neid ei salvestata
andmebaasi — taaskäivitamisel lähevad need kaotsi. _Seaded_ salvestatakse püsivalt; aktiivne
lukustuse _olek_ on ajutine.

---

## 4. Quota-share'i samaaegsuse juhtimine (v3.8.36)

Tellimuskontod (GLM, MiniMax jne) lubavad sageli ainult ~1–3 samaaegset päringut; selle piiri ületamine põhjustab 429 vastuseid ja ooteaegu. See probleem on eriti terav **quota-share'i** (`qtSd/…`) kombinatsioonide puhul, kus mitu API-võtit jagavad üht ülesvoolukontot. Kolm kihti takistavad jagatud konto päringutega ülekoormamist.

### Ühendusepõhine samaaegsuse ülempiir (`max_concurrent`)

Iga teenusepakkuja ühendus saab määrata `max_concurrent` ülempiiri (`provider_connections.max_concurrent`, seadistatav ühenduse dialoogis / API-s / andmebaasis). Piirangu puudumiseks jätke see tühjaks. See on ainus seadistus, mis juhib allpool kirjeldatud jadastamiskihti — määrake selle väärtuseks konto tegelik samaaegsuse piir (nt GLM ~1, MiniMax ~2).

### Mudelipõhised samaaegsuse ülempiirid (`modelConcurrency`)

Ühendus saab oma `rateLimitOverrides` vastenduses lisaks määrata täpsed mudelipõhised samaaegsuse ülempiirid:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Seadistage see ühenduse dialoogis (**Kiiruspiirangu alistused → Mudelipõhised samaaegsuse ülempiirid**, üks `model=cap` rea kohta) või päringuga `PATCH /api/providers/[id]`, kasutades sama JSON-struktuuri. Võtmete semantika:

- **Ühenduseülene vs mudelipõhine:** `maxConcurrent` jääb jagatud ühenduseüleseks ülempiiriks. Kui rakenduvad mõlemad, hõivatakse mõlemad tõkked atomaarselt samas liittõkkes (`global → provider → account → model`); tegeliku käitumise määrab rangem rakenduv piirang.
- **Täpne mudelivõtme vaste:** võti on mudelistring, mis edastatakse täiturile pärast marsruutimise lahendamist — tavaliselt ülesvoolu mudeli lihtidentifikaator (`glm-5`), mitte kliendipoolne `provider/model` alias (`zai/glm-5` ei vasta väärtusele `glm-5`). Väärtused on positiivsed täisarvulised samaaegsete päringute ülempiirid.
- **Kohalik järjekord, tuvastamist ei toimu:** üleliigsed päringud jäävad olemasolevate järjekorra- ja ajalõpusemantikate alusel kohalikku järjekorda (tüübitud vastuvõtuvead `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ei tuvasta ega tuleta ülesvoolu reegleid — see jõustab täpselt operaatori seadistatud ülempiirid. Täitunud mudelitõke ei keela kunagi teenusepakkujat ega tekita püsivat mudelilukustust; ülesvoolu 429/ooteaja/varuvariandi käitumine jääb vigade viimaseks kaitsekihiks.
- **Ühenduse- ja protsessipõhine ulatus:** ülempiirid kehtivad iga andmebaasiühenduse kohta ning neid hoitakse mälus, mistõttu kaks sama ülesvoolu API-võtit kasutavat ühendust ei koordineeri omavahel.
- **Seadistamata tähendab muutusteta:** vastenduse väljajätmine (või juhtpaneeli välja tühjaks jätmine) ei lisa mudelitõket. Näidiskonfiguratsioon ilma universaalset teenusepakkuja piirangut eeldamata:

```text
glm-5=1
glm-4.7=3
```

### Quota-share'i päringute jadastamine

Kui quota-share'i edastus sihib ühendust, mis määrab positiivse `max_concurrent` väärtuse, jadastatakse selle **konto** samaaegsed päringud ühendusepõhise semafori kaudu (võti `qsconn:<connectionId>`): üleliigsed päringud **ootavad järjekorras**, selle asemel et kontot üle koormata. See on **fail-open**-põhimõttega — täitunud järjekorra või ajalõpu korral jätkatakse ilma pesata, selle asemel et edastamiseks sobiv päring tagasi lükata. Lüliti asub jaotises **Seaded → Vastupidavus → Quota-share'i ühendusepõhine samaaegsuse piirang** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, vaikimisi sisse lülitatud). Ilma `max_concurrent` ülempiirita jääb käitumine muutumatuks.

> Quota-share'i marsruutimistõke (`selectQuotaShareTarget`, DRR + P2C) toimib ise
> fail-open-põhimõttel ja ainult _vähendab_ ülempiirini jõudnud ühenduse prioriteeti —
> ühe ühendusega kogumi puhul ei saa see ranget piirangut kehtestada, seega ohjeldab
> tegelikku päringutulva just see semafor.

### Kombinatsiooni ooteajateadlik korduskatse

Iga kombinatsioonistrateegia puhul (kui see on lubatud) ootab päring, mis muidu kinnistaks 429 vastuse LÜHIKESE ajutise ooteaja tõttu, ooteaja lõpuni ja edastatakse uuesti, selle asemel et 429 tagastada — see hõlmab Gemini-klassi TPM/RPM-i aknaid (~60 s `retry-after`) mitme mudeliga kombinatsioonides, näiteks kui kahe mudeliga kombinatsiooni mõlemad sihtmärgid jõuavad mudelipõhise kiiruspiiranguni. Piirangud määrab `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) jaotises **Seaded → Vastupidavus**. See ei oota kunagi põhjuse `quota_exhausted` (lukustatud keskööni) ega autentimis- või mitteleidmise põhjuste korral.

---

## 5. Päringujärjekorra vastuvõtukontroll (v3.8.49 · probleem #6593)

**Ulatus**: kohalik teenusepakkuja+ühenduse põhine kiiruspiirangu järjekord (`open-sse/services/rateLimitManager.ts`,
mida toetab Bottleneck), üks kiht ülaltoodud kolmest mehhanismist allpool.

**`maxWaitMs` piirab järjekorras ootamist; `executionMaxWaitMs` piirab täitmist.**
Need kaks on teadlikult eraldatud ning kumbki ei mõjuta teist.

`resilienceSettings.requestQueue.maxWaitMs` on **järjekorras ootamise eelarve**:
see hõlmab teenusepakkuja vaba koha ootamist ja seejärel olekus QUEUED viibimist
ning selle taimer tühistatakse hetkel, mil töö lahkub olekust QUEUED ja alustab
täitmist (`rateLimitManager.ts`, `wrappedFn`). Seda piiri ületav päring ei jõua
kunagi ülesvooluteenusesse. Vaikeväärtus on 30000ms, mille määrab
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` failis `src/lib/resilience/settings.ts` ja
mille fikseerib `tests/unit/ratelimit-admission-control-6593.test.ts`, nii et
selle muutmine muudab testi punaseks ega lase sellel lõigul märkamatult
aeguneda.

`resilienceSettings.requestQueue.executionMaxWaitMs` on väärtus, mille
Bottleneck saab töö `expiration`-ina ja mille taimer käivitub alles pärast töö
väljasaatmist. See on varumeede täituritele, millel puudub oma ülesvoolu
ajalõpp, ning seda suurendatakse täituri enda päringu alustamise ajalõpuni, kui
see on pikem, et see ei saaks katkestada korrektselt töötavat pooleliolevat
vastust. Vaikeväärtus on 600000ms (10 min).

Järjekorra eelarve edastamine parameetrisse `expiration` põhjustas varem
mitteinkrementaalsete lüüside katkestamise töö keskel — neil võib esimeste
baitide saabumiseni õigustatult kuluda minuteid — ning seetõttu esitatakse
aegumine kujul `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), samas kui
järjekorra eelarve kasutab järjekorra ajalõpu koodi. Kumbagi saab muuta
keskkonnamuutuja `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` kaudu või juhtpaneelil
(**Seaded → Tõrkekindlus**). Normaliseerimisel piiratakse mõlemad vahemikku
1ms–24h.

**Prioriteetsus mõlema puhul:** keskkonnamuutuja määrab ainult _vaikeväärtuse_.
Väärtus, mis on püsivalt salvestatud asukohas
`resilienceSettings.requestQueue` (juhtpaneeli / API paiga kaudu, salvestatud
andmekogusse `key_value`), on sellest ülimuslik ning ühendusepõhine
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` on omakorda sellest
ülimuslik. Keskkonnamuutuja määramine juurutuses, kus püsivalt salvestatud
väärtus on juba olemas, ei muuda seega midagi — selle asemel tühjendage või
värskendage püsivalt salvestatud seadistust.

Järjekorras viibimise aega piirab `maxWaitMs`; allpool kirjeldatud
`maxQueueDepth` piirab korraga järjekorras olla võivate kutsujate arvu.

**`maxQueueDepth` — valikuline vastuvõtupiirang (uus).** `resilienceSettings.requestQueue.maxQueueDepth`
piirab, mitu päringut võib ühe teenusepakkuja+ühenduse kohta korraga järjekorras
olla (ilma et neid oleks veel välja saadetud). Kui järjekorras on juba
`maxQueueDepth` päringut, lükatakse uus päring kiiresti tagasi tüübitud veaga
`code: "RATE_LIMIT_QUEUE_FULL"` **enne**, kui see üldse jõuab funktsioonini
`limiter.schedule()` — seega on tagasilükkamine odav ja toimub enne selle
päringu mis tahes allavoolu viiba tihendamise / tõlkimise tööd. Vaikeväärtus
`0` = keelatud, säilitades senise piiranguta järjekorra käitumise; lubatud
vahemik on 0–100000. Muutke seda keskkonnamuutuja
`RATE_LIMIT_MAX_QUEUE_DEPTH` kaudu või väljal
`resilienceSettings.requestQueue.maxQueueDepth` (juhtpaneeli/API paik).

Vastuvõtukontroll ise on puhasfunktsioon
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), mistõttu
saab seda ühiktestida ilma tegeliku Bottlenecki piirajata.

> #6593 algatanud RFC pakkus välja ka lipu `bypassCompressionOnRateLimit`.
> Selle repo konveier `open-sse/services/compression/` tegeleb väljamineva
> LLM-päringu viiba/konteksti tihendamisega (`chatCore.ts`, ploki
> `resolveCompressionSettings`/`selectCompressionStrategy` ümbruses), mitte
> sünteesitud 429-vastuste HTTP-tihendamisega — otsesele möödaviigulipule
> vastavat kooditeed pole olemas. See viiba tihendamise etapp käivitatakse
> praegu päringukonveieris ka _enne_ funktsiooni `withRateLimit()`, mistõttu
> selle järjekorra täitumisest tingitud tagasilükkamise korral vahelejätmiseks
> vajalik ümberjärjestamine on eraldiseisev ja suurem muudatus kui selle
> probleemi ulatus; seda **ei** rakendatud siin tahtlikult ning see jäeti
> järeltööks juhuks, kui protsessoriressursi sääst õigustab ümberjärjestamisega
> seotud riski.

---

## 6. Aeglase voo läbilaskevõime valve (#9709)

Valikuline kaitse `resilienceSettings.streamRecovery.throughputWatchdog` tuvastab
ülesvooluteenuse, mis saadab endiselt andmeplokke, kuid toodab assistendi väljundit
seadistatud kasuliku väljundi määrast aeglasemalt. See erineb sihilikult jõudeoleku
aegumisest: südamelöögid ja metaandmed ei lähtesta kumbagi taimerit ega lähe edenemisena
arvesse. See erineb ka katse rangest tähtajast (#9153), mis jääb väljundi kvaliteedist
olenemata absoluutseks ohutuspiiriks.

Enne katkestamist nõuab valve soojendusperioodi, millele järgneb täielik jooksev aken.
See loendab Chat Completionsi ja Responses API väljundisündmuste tekstimuudatusi
(konservatiivse UTF-8 baitide lähendina), eirab ainult kasutusandmeid sisaldavaid ja
tühje sündmusi ning peatab hindamise tööriistakutse- või arutlussündmuste töötlemise
ajaks. Vaikimisi on see keelatud ja selle saab lubada muutujaga
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; akent, soojendusperioodi, minimaalset määra
ja minimaalset mõõdetavat väljundit piirab tavapärane töökindlusseadete
normaliseerimiskiht.

Kui valve on lubatud, rakendatakse selle katkestust ainult aktiivsele ülesvoolukatsele.
Enne kliendile nähtavate baitide saatmist võib olemasolev sama konto varajase taastamise
tee katse uuesti avada. Pärast kinnitamist ei taasesitata voogu kunagi pimesi; järelliite
saab ühendada ainult olemasoleva turvalise voo keskel jätkamise lepingu kaudu.
Lõpetamine toimub endiselt ainult ühe korra, mistõttu kasutuse arvestust ega semafori
vabastamist ei dubleerita.

---

## 7. Ülesvoolu oleku ümbermääramine (valesti määratud kvoodivead)

**Ulatus:** üks ülesvoolulüüs, mis teatab ajutisest kvoodi ammendumisest vale HTTP-olekuga.

**Eesmärk:** parandada eksitav olek ENNE klassifitseerimist, et allavoolu tarbijad (varumootor, kombineeritud koondamine ja kliendile suunatud vastus) näeksid tõrke tegelikku, uuesti proovitavat olemust.

Mõned lüüsid annavad AJUTISEST kvoodi ammendumisest märku HTTP-olekuga, mille korral
uuesti ei proovita. `agentrouter.org` tagastab standardse `429` asemel `403`
(mõnikord `400`) koos hiinakeelse kehaga (`用户额度不足` / `额度不足`). Sellised kliendid
nagu Claude Code käsitlevad olekut `403` püsiva veana ja katkestavad seansi ning ilma
paranduseta klassifitseeriks varumootor selle kvoodisündmuse asemel väärtuseks
`AUTH_ERROR`.

**Teostus:**

- Register + vastendaja: `open-sse/config/upstreamStatusRestatement.ts` — teenusepakkuja
  kaupa reeglite loend (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), mida vastendatakse funktsiooniga `applyStatusRestatement()`.
- Väljakutsekoht: plokk `providerFailure:` failis `open-sse/handlers/chatCore.ts`
  (umbes real 3654), kohe pärast seda, kui `parseUpstreamError()` on parsinud
  vea HTTP-olekuga ülesvooluvastuse (`!providerResponse.ok`), ja enne mis tahes
  klassifitseerimist, et iga allavoolu tarbija näeks parandatud olekut.
  `200` SSE-voogu manustatud vead läbivad eraldi, hilisema voo parsimise tee ja
  see konks neid praegu **ei** hõlma — see on teadaolev piirang, mida agentrouteri
  vale oleku puhul veel vaja ei ole (sest see ilmneb vea HTTP-olekuna).
- Uuesti proovimise sobivus: `429` sisaldub loendis `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), mistõttu on ümbermääratud veal
  surnud `403`-na avaldumise asemel tegelik uuesti proovimise aken.
- Sünteetiline `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  näitab üksnes seda, mida ümbermääratud vastus ütleb **kliendile**; see ei ole
  ühenduse sisemise jahtumis- ega lukustusperioodi kestus — seda juhib eraldi
  mehhanism, mis ümbermääratud viga tegelikult töötleb (ühenduse jahtumise kasvav
  taganemisaeg, §2, API-võtme pakkujate baasväärtusega `3s`; või mudeli lukustus,
  §3, mudelipõhise kvoodiga pakkujate, nagu agentrouter, korral). Ruuter võib muutuda
  sisemiseks uuesti proovimiseks sobivaks varem kui kliendile teatatud 60s akna järel
  — see on tahtlik varu, mitte viga.

Püsivaid vigu (agentrouteri `无权访问模型` — sellele mudelile puudub juurdepääs) EI
määrata KUNAGI ümber: `excludeMarkers` tühistab reegli isegi siis, kui
`textMarkers` vastab, mistõttu säilitab viga oma algse oleku ja miski ei proovi seda
lõputult uuesti. Vastava teenusepakkuja klassifitseerimisreeglit
(`agentrouter-model-access-denied` failis `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklareeritud baasjahtumisega `6h`)
kontrollib `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_enne_ üldist apikey-kategooria `FORBIDDEN` varajast tagastust, tingimusel et
`honorsRuleLockScope(provider)` seda lubab (#10334 — praegu ainult agentrouterile
loendi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` kaudu failis
`providerErrorRules.ts`). Reeglis deklareeritud 6h jahtumine liigub edasi väärtusena
`fallbackResult.baseCooldownMs`, kuid suunatakse siiski olemasolevasse
mudelipõhise kvoodi lukustamise teesse (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, mida #10334 ei muutnud peale jahtumise allika):
see kärbitakse operaatori väärtuseni `mlSettings.maxCooldownMs`
(vaikimisi `1_800_000ms` / 30min), nagu iga muu mudelilukustus, ning
_salvestatud lukustuse põhjus_ jääb olemasolevaks püsikodeeritud väärtuseks
`"forbidden"`, mitte reegli väärtuseks `"auth_error"` — läbivalt arvestatakse
ainult jahtumise kestust, mitte põhjuse stringi. Ühendus ise jääb aktiivseks;
sama ühenduse sõsarmudeleid see ei mõjuta.

Ümbersõnastatud kvoodivead (`额度不足`) jõuavad tootmiskeskkonnas teenusepakkuja reeglini
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, eraldi ooteaega pole määratud — rakendub püsivuskihi
skaleeritud eksponentsiaalse viivituse vaikeväärtus). Alates #10334-st kasutatakse
`ProviderErrorRuleMatch`-i välja `scope` läbivalt kogu töötlusahelas, kuid **ainult**
teenusepakkujate puhul, kes on `HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubatud loendis
(`providerErrorRules.ts` — praegu ainult `"agentrouter"`, rakendamist piirab
`honorsRuleLockScope()`). Kõigi teiste teenusepakkujate puhul jääb `scope`
endiselt üksnes informatiivseks, täpselt nagu enne #10334.
`checkFallbackError` väljastab sobitunud reegli skoobi väljana
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) on ühine kaitsekontroll, mis kinnitab, et
`ruleScope`-i saab tõepoolest ohutult käsitleda ühenduseülese, isetaastuva
signaalina (`scope` `"connection"`, põhjus `quota_exhausted`, mitte kunagi
`permanent`, mitte kunagi `creditsExhausted` — kaitse tulevase reegli vastu,
mis võiks siduda skoobi `"connection"` konto püsiva olekuga). Seda kutsuvad
kaks tarbijat:

- **Püsivuskiht** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  selle asemel, et sattuda läbipääsuteenusepakkuja **mudelipõhise**
  lukustamise harusse (agentrouter kasutab `passthroughModels: true` →
  `hasPerModelQuota()` tagastab `true`), rakendab see **ajutise ühenduse
  ooteaja** — `testStatus: "unavailable"` + `rateLimitedUntil`, mitte kunagi
  lõplikku olekut (`credits_exhausted`/`banned`/`expired`) —, nii et ühendus
  taastub pärast ooteaja möödumist ise ega nõua mandaadi käsitsi lähtestamist.
  Seda ei tehta ühenduste puhul, millel on `disableCooling: true` (#2997):
  selline loobumine suunatakse selle asemel mudelipõhisesse lukustusse
  (dokumenteeritud kompromiss — vt haru kohal olevat koodikommentaari).
- **Sama päringu kombineeritud marsruutimine** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama kaitsekontroll lisab
  ühenduse mälus olevasse `exhaustedConnections` hulka võtmega
  `${provider}:${connectionId}`. See jätab vahele ainult allesjäänud SAMA PÄRINGU
  sihtmärgi, mille enda sihtmärgiobjektil on juba täpselt sama `connectionId`
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` enne `exhaustedConnections` otsingut) — lihtsa
  mudeliloendi kombinatsiooni puhul, kus kõrvalsihid ei kanna oma kinnistatud
  `connectionId`-d ja see lahendatakse iga väljasaatmise ajal alles vastuse
  `X-OmniRoute-Selected-Connection-Id` päisest, ei leita kunagi sellele võtmele
  vastet. Selle tavalise juhu puhul EI paku tegelikku kaitset selle eest, et
  allesjäänud etapp kasutaks uuesti äsja ammendunud kontot, mitte see hulk,
  vaid ülaltoodud püsivuskiht (ühenduse `rateLimitedUntil` on nüüd tulevikus)
  koos sama kaitsekontrolliga, mis väldib tõrke puhul teenusepakkuja lisamist
  hulka `transientRateLimitedProviders` (vt „Kaheetapiline disain” ja
  `targetExhaustion.ts`-i haru `isAgentrouterConnectionQuotaScope`
  koodikommentaari): kuna seda hulka ei märgita, EI rakendu teenusepakkuja
  ülejäänud etappidele `combo.ts`-i sundlubamine `allowRateLimitedConnection`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`), mistõttu järgitakse
  mandaadi valimisel tavapäraselt `rateLimitedUntil` filtrit
  (`src/sse/services/auth.ts:1238`) ning allesjäänud etapp kas valib mõne muu,
  endiselt sobiva agentrouteri ühenduse või nurjub, sest mandaate pole
  saadaval — see ei sunni end tagasi ühendusele, millele see haru just
  ooteaja määras.

### Kaheetapiline disain: oleku ümbersõnastamine, seejärel klassifitseerimine

Oleku ümbersõnastamine (`upstreamStatusRestatement.ts`) ja teenusepakkuja
klassifitseerimisreeglid (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) on eraldi registrid, mis mõlemad kasutavad võtmetena
teenusepakkuja ID-d ja tekstimarkereid, kuid neid käitatakse eri kohtades ning
neil on erinevad eesmärgid: ümbersõnastamine kirjutab HTTP oleku varakult
failis `chatCore.ts` ümber; klassifitseerimisreeglid valivad varuvariandi
`reason`-i ja lukustuse `scope`-i (`model` / `provider` / `connection`)
funktsioonis `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifitseerimisreeglid näevad täielikku vea **teksti** (mida on vaja selliste
vastusekeha markerite nagu `额度不足` sobitamiseks) ainult nende teenusepakkujate
puhul, kes on faili `providerErrorRules.ts` lubatud loendis
`FULL_TEXT_RULE_PROVIDERS` — praegu ainult `"agentrouter"`. Iga teise
**sisseehitatud kataloogi** teenusepakkuja puhul edastab `checkFallbackError`
funktsioonile `getProviderErrorRuleMatch` ainult struktureeritud vea
(`{code, type}`), millest piisab päise-/oleku-/koodipõhiste reeglite jaoks,
kuid mis ei näe vastusekeha tekstimarkereid. Abifunktsioon
`resolveRuleMatchBody()` teeb selle valiku: lubatud loendis olevate
teenusepakkujate puhul vea täielik tekst, muudel juhtudel struktureeritud
viga. **Sisseehitatud** teenusepakkuja lisamine loendisse
`FULL_TEXT_RULE_PROVIDERS` on selgesõnaline teenusepakkujapõhine nõustumine —
see on olemas selleks, et vaikimisi töötlustee jääks kõigi loendist puuduvate
teenusepakkujate puhul bait-baidi haaval muutumatuks.

Reegli `scope` (`model` / `provider` / `connection`) on
`FULL_TEXT_RULE_PROVIDERS`-ist eraldiseisev nõustumine:
`checkFallbackError` väljastab selle ainult väljana
`fallbackResult.ruleScope` ning allavoolu tarbijad käsitlevad seda muu kui
informatiivse sildina üksnes nende teenusepakkujate puhul, kes on sama faili
lubatud loendis `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`rakendamist piirab
honorsRuleLockScope()` — praegu ainult `"agentrouter"`). Selle kohta, mida
vaste `scope: "connection"` tegelikult teeb pärast teenusepakkuja lisamist
sellesse lubatud loendisse, vt eespool jaotist „Ümbersõnastatud kvoodivead”.

**#11104 — operaatori deklareeritud reeglid mööduvad mõlemast lubatud loendist.** Operaator saab
käitusajal deklareerida teenusepakkujapõhise reegli sätte `settings.providerErrorRules`
kaudu (`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ilma seda faili muutmata. Operaatori reegli piiramine loenditega
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — lubatud loendid,
mis on mõeldud sisseehitatud kataloogireeglite **vaikekäitumise** kaitsmiseks —
muudaks sätete mehhanismi kasutuks kõigi teenusepakkujate jaoks peale nende,
kes on seal juba loetletud, sest reegli deklareerimine on juba operaatori
selgesõnaline nõusolek. `resolveRuleMatchBody()` ja `honorsRuleLockScope()`
kontrollivad mõlemad esmalt funktsiooni `hasOperatorRuleForProvider()`:
operaatori reegliga teenusepakkuja saab töötlemata veateksti ning tema
deklareeritud `scope`-i järgitakse olenemata sellest, kas ta esineb ka
kummaski lubatud loendis.

**Teadaolev puudujääk — HTTP 400 puhul ei kasutata kunagi registrit `providerRuleRegistry`.**
Funktsiooni `checkFallbackError` haru `BAD_REQUEST` liigitab oleku 400 täielikult
oma mustrimassiivide kaudu (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` jne failis `accountFallback.ts`) ja tagastab
tulemuse enne, kui jõutakse selle kohal oleva haruni
`configuredRule`/`getProviderErrorRuleMatch`. Sisseehitatud kataloogireegel
(või operaatori reegel), millel on `status: 400`, on süntaktiliselt kehtiv,
kuid seda ei rakendata kunagi. Praegu ei sihi ükski olemasolev reegel olekut
400, seega ei mõjuta see tootmiskeskkonnas midagi — kuid tulevase 400 reegli
jaoks tuleb kõigepealt seda haru muuta. See on suurem muudatus kui ühe reegli
lisamine (see liigitab oleku 400 ümber iga teenusepakkuja jaoks, kes juba
tugineb mustrimassiivide käitumisele) ning jääb ühe teenusepakkuja reegli
lisamise käsitlusalast välja.

### Uue kvooti valesti esitava lüüsi lisamine

1. Registreerige üks reeglimassiiv registris `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Hoidke `textMarkers`
   teenusepakkujapõhisena; ärge kunagi taaskasutage üldisi ingliskeelseid
   fraase, mis kattuvad väärtusega `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Soovi korral registreerige liigitamisreeglid failis
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), et valida
   õige lukustusulatus (`connection` kontopõhise kvoodi ja `model`
   mudelipõhiste vigade jaoks). See samm rakendub tootmiskeskkonnas ainult
   nende teenusepakkujate puhul, kelle reeglid vajavad täielikku veateksti
   (kehamarkereid): lisage teenusepakkuja ID samas failis loendisse
   `FULL_TEXT_RULE_PROVIDERS` — vastasel juhul edastab `checkFallbackError`
   reeglile alati ainult struktureeritud vea `{code, type}` ja kehatekstil
   põhinev reegel ei ühti kunagi tegeliku liiklusega. Reeglid, mis ühtivad
   ainult `status`-e/`headers`-te põhjal (nagu Opencode'i või Minimax'i omad),
   ei vaja seda lubamist. Kui reegel deklareerib eraldi
   `scope: "connection"` ja eesmärk on tegelik ühenduseülene ooteaeg koos
   sama päringu kombinatsiooni vahelejätmisega (mitte lihtsalt informatiivne
   silt), lisage teenusepakkuja ID samas failis loendisse
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` — see juhib funktsiooni
   `isAgentrouterConnectionQuotaScope()` laadse tarbimise lubamist
   funktsioonis `markAccountUnavailable()` (`src/sse/services/auth.ts`) ja
   funktsioonis `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ilma selleta liigub
   `scope` endiselt läbi `fallbackResult.ruleScope`-i, kuid miski ei rakenda
   seda.
3. Lisage ühiktestid, järgides failide
   `tests/unit/upstream-status-restatement.test.ts` ja
   `tests/unit/agentrouter-error-rules.test.ts` eeskuju (sealhulgas kaitsed
   not-permanent / not-creditsExhausted ning — kui teenusepakkuja vajab
   lubatud loendit — test, mis kinnitab, et `resolveRuleMatchBody()` tagastab
   täieliku teksti ainult selle teenusepakkuja puhul).

Faile `chatCore.ts`, funktsiooni `classifyError` ega kombinatsiooniloogikat pole vaja muuta.

#### Väljuva liikluse põhiste rühmadega lukustus (#10880)

Loendis `EGRESS_BUCKETED_LOCK_PROVIDERS` olevate teenusepakkujate (opencode'i
perekond) puhul käsitletakse ülesvoolu teenust IP-põhiselt rühmitatuna
(opencode'i tasuta pakett on IP-põhiselt, mitte kontopõhiselt rühmitatud —
vt #9611): olek 429, mis on liigitatud kui `quota_exhausted`
**või** `rate_limit_exceeded`, määrab enne roteerimist ooteaja kõigile lubatud
perekonna ühendustele, mille viimati teadaolev väljuv IP ühtib tõrkunud
ühenduse omaga
— vältides N-1 garanteeritult nurjuvat ülesvoolu päringut (sama ülesehitus nagu
#10460/#10525). `rate_limit_exceeded` on lisatud teadlikult: teel
`markAccountUnavailable` ei ühti opencode'ile omased reeglid kunagi
(funktsioonile `checkFallbackError` ei edastata päiseid/keha ning opencode
pole loendis `FULL_TEXT_RULE_PROVIDERS`), seega liigitatakse 429, mille keha
sisaldab tellimuskvoodi teksti ("monthly usage limit reached"), kvooditeksti
varuvariandi kaudu `quota_exhausted`-iks (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 h ooteaeg) enne, kui reeglini `status_429` üldse
jõutakse — samas kui kvooditekstita 429 (tavaline päringusageduse piiramine)
liigitatakse reegli `status_429` kaudu kui `rate_limit_exceeded` ja see määrab
siiski IP-perekonnale ooteaja. Lubatud loendis oleva teenusepakkuja puhul on
IP-põhine päringusageduse piirang sama signaal kui ammendunud kvoot. Tegelikud piirangud:

- **Parima pingutuse põhimõte**: lukustus tuvastab ühenduse viimati teadaoleva `egress_ip`
  väärtuse tabelist `proxy_logs` (24 h aken, sünkroonne, vahemäluta). Tühja
  vahemälu korral (väljuvat IP-d pole kunagi kontrollitud) või rea puudumisel →
  tõrkunud ühendusele rakendatakse selles harus siiski ooteaeg (salvestatakse
  nagu praegu), kuid ühtegi sõsarühendust ei lukustata.
- **Mitte kunagi lõplik**: ooteaeg on uuenev kvoodiaken
  (`testStatus: "unavailable"`); IP-taseme signaalist ei tuletata kunagi
  püsivat olekut. `disableCooling` ühendused jätavad selle haru täielikult vahele.
- **Lubatud loendi perekonna lukustuse detailsus muutub**: see on ulatuse
  muutus, mitte ainult sõsarühenduste optimeerimine. opencode on
  `passthroughModels` pakkuja, mistõttu enne seda haru põhjustas 429
  mudelipõhise lukustuse; nüüd põhjustab see ühenduse ooteaja — sealhulgas
  operaatorile, kes käitab ainult üht ühendust ilma ühegi sõsarühenduseta.
  Just selle detailsuse kuulutab opencode'i reeglitabel juba õigeks
  (`scope: "connection"`, `providerErrorRules.ts`), kuid seda pole seni järgitud,
  sest opencode ei kuulu loendisse `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Haru
  kirjutab tõrkunud ühenduse ooteaja + `backoffLevel` ise, järgides
  ühendusepõhise agentrouteri haru eeskuju, ning naaseb — allpool oleva
  mudelipõhise blokeeringu ja üldise rajani ei jõuta kunagi.
- **Kombinatsioon kaasatud**: nagu agentrouteri haru puhul, eirab ulatus
  tahtlikult `persistUnavailableState`/`isCombo` alandamist, mida
  kombinatsioonikutse tegija rakendab 429-le. Mudelipõhine lukustus ei ole selle
  ulatuse nõrgem vorm, vaid vale üksus: see ei ütle ammendunud IP kohta midagi,
  mistõttu põletaks kombinatsiooni roteerimine jätkuvalt ühe garanteeritult
  ebaõnnestuva kutse iga sõsarühenduse kohta.
- **Sõsarühenduste ohutus**: sõsarühendust, mis on juba lõplikus olekus
  (banned/credits_exhausted) või millele on juba määratud pikem ooteaeg, ei
  kirjutata kunagi üle.
- **Eksklusiivne lubatud loend**: loendi `EGRESS_BUCKETED_LOCK_PROVIDERS`
  laiendamine on omaniku selgesõnaline otsus; üldist ühendamist ei tehta
  (muster #10334/#10419). Sõsarühenduste päring seob sama lubatud loendi,
  selle asemel et seda SQL-literaalina korrata, seega jääb laiendamine
  üherealiseks muudatuseks.
- **Väljuva IP roteerimine mõlemas suunas**: otsinguaken (24 h) on palju
  laiem kui väljuva IP vahemälu TTL (5 min), seega on „viimati teadaolev IP”
  ajalugu, mitte praegune olek. Kui ühenduse puhverserver roteerus selle akna
  jooksul, võib lukustus tõeliselt jagatud IP **vahele jätta** (salvestatud IP
  on uus ja ammendamata) — ning vastupidi võib see **rakendada ooteaja
  sõsarühendusele, mis on vahepeal ammendunud IP-st eemaldunud**. Teine juhtum
  maksab sellele sõsarühendusele ühe ooteajaakna; mõlemad on aktsepteeritud kui
  ajaloopõhise otsingu parima pingutuse piirangud.
- **Kulu**: kaks piiratud skannimist tabelis `proxy_logs` (akna järgi filtreeritud
  indeksi `idx_pl_timestamp` kaudu), ainult 429 esinemissagedusel. Uut indeksit
  pole vaja (migratsioon 134 YAGNI). Mõõdetud mõõduka suurusega tegeliku
  liiklusega andmebaasi koopial; suure läbilaskevõimega eksemplar sisaldab sama
  akna jooksul proportsionaalselt rohkem ridu.

---

## Muud töökindlusfunktsioonid

- **19 marsruutimisstrateegiat** (prioriteetne, kaalutud, tsükliline, kontekstiedastusega, esmalt täitev, p2c, juhuslik, vähim kasutatud, kuludele optimeeritud, lähtestust arvestav, lähtestusaknaga, varuruumipõhine, rangelt juhuslik, automaatne, lkgp, kontekstile optimeeritud, vahemälule optimeeritud, fusion, pipeline) — vt [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Lähtestust arvestav marsruutimine** (v3.8.0) — seab ühendused prioriteedijärjekorda kvoodi lähtestamisaja alusel.
- **Taustarežiimi degradeerimine** — Responses API `background: true` degradeeritakse hoiatusega sünkroonrežiimiks.
- **Tööriistalimiidi dünaamiline tuvastamine** — vähendab teenusepakkujate kasutamist tööriistade arvu limiidi saavutamisel.
- **Hädaolukorra varuvariant** — seda juhib `OMNIROUTE_EMERGENCY_FALLBACK`; operaatorid saavad selle funktsioonilippude lehel ilma taaskäivituseta alistada.

---

## Silumine

- Kaalutud kombinatsioon vastab veaga `503 all_targets_cooling_down` (`Retry-After` on määratud ja `diagnostics.excluded` loetleb kõik sihtmärgid koos põhjustega `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → kogum on seadistatud ja ühendatud, kuid iga sihtmärk on töökindlustaimeri tõttu välistatud; hoiatus `[COMBO] Weighted selection: every target excluded before dispatch — …` nimetab põhjused ja järelejäänud sekundid. Sama kombinatsiooni vastus `404 no_executable_targets` tähendab, et töökindlustaimer ei olnud kaasatud (käivitada pole midagi või kõik kontod ei läbinud saadavuskontrolli). See on failis `open-sse/services/combo/pinRecovery.ts` üles ehitatud failis `targetResolution.ts` kogutud välistuste põhjal.
- Kõik teenusepakkuja võtmed jäetakse vahele → kontrollige nii kaitselüliti olekut KUI KA iga ühenduse väärtusi `rateLimitedUntil`/`testStatus`.
- Teenusepakkuja jääb pärast lähtestusakent püsivalt välistatuks → kood loeb töötlemata väärtust `state`, selle asemel et kasutada `getStatus()`/`canExecute()`.
- Üks võti ebaõnnestub, kuid teised peaksid töötama → eelistage ühenduse jahtumisperioodi kaitselülitile.
- Ainult üks mudel ebaõnnestub → eelistage mudelilukustust ühenduse jahtumisperioodile.
- Olek peaks ise taastuma, kuid ei taastu → kontrollige tulevikku osutavat ajatemplit ja lugemisteed, mis aegunud olekut värskendab. Püsivad olekud nõuavad käsitsi tehtavaid muudatusi.

---

## TLS-sõrmejäljestamine ja varjatus

Teenusepakkujapõhine varjatus (JA3/JA4, CCH, hägustamine) on dokumenteeritud eraldi — vt `docs/security/STEALTH_GUIDE.md` (git; pole kompileeritud asukohta `/docs`).

---

## Töökindluse testimine (8. etapp · plokk C)

Lisaks töökindlusloogika ühiktestidele kontrollivad kolm testi käitusaegset toimimist
tegelikes koormus- ja tõrkeoludes (kõik on integratsiooni-/öised testid — ükski ei blokeeri PR-e):

| Test           | Mida                                                                                                                                                                                 | Käivitamine                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| Kaosetest      | Võlts-ülesvoolusõlm tekitab tegeliku latentsuse/lähtestuse/ajalõpu/503; kontrollib, et kaitselüliti avaneb/taastub ja `checkFallbackError` liigitab 503 taastatavaks varuvariandiks. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Kuhjamälu kasv | ~500 voogu iga `createSSEStream` kohta parameetriga `--expose-gc`; ebaõnnestub, kui kuhjamälu kasvab üle piirmäära (OOM-kaitse #3069).                                               | `npm run test:heap`                     |
| k6 kestustest  | Püsikoormus lõpp-punktile `/api/monitoring/health`; p95/veamäärade lävendid.                                                                                                         | `k6 run tests/load/k6-soak.js` (öösiti) |

Seda orkestreerib `.github/workflows/nightly-resilience.yml` (cron + dispatch). Vaikimisi
`test:integration` korral jätavad kaose- ja kuhjamälutest end ise vahele (ilma `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vaata ka

- [Arhitektuurijuhend](./ARCHITECTURE.md) — Süsteemi arhitektuur ja sisemine toimimine
- [Kasutusjuhend](../guides/USER_GUIDE.md) — Teenusepakkujad, kombinatsioonid, CLI integratsioon
- [Automaatse kombineerimise mootor](../routing/AUTO-COMBO.md) — 16 teguriga hindamine, režiimipaketid
