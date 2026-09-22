# Resilience Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

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

- Kättesaamatuks märkimine: `src/sse/services/auth.ts::markAccountUnavailable()`
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
- API-võtme 429: eelistab ülesvoolu `Retry-After`-/lähtestamispäiseid või sõelutavat lähtestamisteksti
- Taganemine: `baseCooldownMs * 2 ** failureIndex`

**Päringutulva vastane kaitse:** takistab samaaegsetel tõrgetel ooteaega liigselt pikendada või `backoffLevel`-it topelt suurendada.

**Lõppolekud (EI OLE ooteajad):**

- `banned` — määratakse keelatud märksõna / konto blokeerimise tuvastamisel (vt [BAN_DETECTION](../security/BAN_DETECTION.md)) ning kolme järjestikuse ülesvoolu päringupõhise keeldumise korral (`request_rejected`, nt Anthropic OAuth 403 „Request not allowed” — `open-sse/services/requestRejectedStreak.ts`); üksik keeldumine paneb ühenduse ainult ooteajale
- `expired` (läheb pärast piiratud arvu korduskatseid lõppolekusse — `EXPIRED_RETRY_MAX = 3` koos eksponentsiaalse taganemisega — et ajutised OAuthi vead saaksid enne konto püsivat inaktiveerimist ise laheneda)
- `credits_exhausted`

Need olekud püsivad, kuni autentimisandmeid muudetakse või operaator need lähtestab. Ärge kirjutage lõppolekuid ajutise ooteaja olekuga üle.

**Laisk taastumine:** kui `rateLimitedUntil` on möödunud, muutub ühendus jälle sobivaks. Eduka kasutuse korral eemaldab `clearAccountError()` kõik veaväljad.

### Claude OAuthi kasutuspiir: madalama prioriteediga rada + seansipiirangu lähtestamine

**Ulatus:** üks Claude'i tellimuse (OAuth) ühendus. Mõlemad funktsioonid on **iga
ühenduse puhul valikulised** (Ühenduse muutmine → Claude'i jaotis → `lowPriorityMode` /
`autoLimitReset` väljal `providerSpecificData`, mõlemad vaikimisi välja lülitatud) ning
jäljendavad Claude Code'i käske `/low-priority` ja `/limit-reset` (sideprotokoll jäädvustatud
Claude Code 2.1.263 põhjal).

**Teostus:**

- Olekumasin + vastuse liigitamine: `open-sse/services/claudeLowPriority.ts`
- Lähtestamisoleku/-nõude klient: `open-sse/services/claudeLimitReset.ts`
- Täituri haak (päise lisamine + korduskatse sama kontoga): `open-sse/executors/base.ts::execute()`
- Valiku püsimällu salvestamine: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Käivitaja:** 5-tunnine kasutuspiir — `429`, mille päised sisaldavad
`anthropic-ratelimit-unified-status: rejected` ja konto sobivuse korral
`anthropic-ratelimit-unified-slow-offer: treatment`. Enne esimest kasutuspiiri vastust
429 ei saadeta midagi; ühtsete päisteta 429-puhang läbib tavapärase ooteaja tee.

**Madalama prioriteediga rada** (`lowPriorityMode`):

- Kasutuspiiri vastuse 429 korral võtab täitur pakkumise vastu ja proovib kohe uuesti **sama**
  kontoga, lisades `anthropic-usage-limit: slow`; rada jääb aktiivseks kuni väljakuulutatud
  ajani `anthropic-ratelimit-unified-reset` (+60 s varuaega) ning iga selle ajavahemiku
  päring sisaldab seda päist. Vahele püütud 429 ei jõua kunagi funktsioonini `handleChatCore`,
  seega ühendust **ei** panda ooteajale ega vahetata välja.
- `anthropic-ratelimit-unified-slow-status` hilisemates vastustes: `active` / `not_needed`
  säilitavad raja; `slot_busy` (429) või `529` ootavad serveri määratud
  `anthropic-ratelimit-unified-slow-retry-after` aja (vaikimisi 20 s, piiratud vahemikku
  5–600 s, ±30% juhuslik hälve) ja proovivad uuesti kuni väärtusega
  `anthropic-ratelimit-unified-slow-max-wait` määratud piirini (vaikimisi 20 min, piiratud
  vahemikku 1 min–6 h) — pärast seda rada lõpetatakse ja 10-minutiline paus takistab pakkumise
  uuesti vastuvõtmist. Ooteaega piirab lisaks päringu enda ülesvoolu käivitamise ajalõpu
  (`resolveFetchStartTimeout`, vaikimisi 10 min) järelejäänud aeg, millest lahutatakse 5 s:
  selle piiranguta kestaks vaikimisi 20-minutiline maksimaalne ooteaeg päringust kauem ning
  ootamine katkestataks poole pealt, tuues sujuva `max_wait` lõpetamise ja pausi asemel
  nähtavale `TimeoutError`-i.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 h akna uuenemine või
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (mis lõpetab raja mis tahes
  oleku korral olekuga `extra_usage`, sest tasuline ülekasutus katab nüüd kasutuspiiri)
  lõpetavad raja; seejärel liigub vastus tavapärasele ooteaja teele. `budget_exhausted`
  jäetakse meelde kuni väljakuulutatud eelarve lähtestamiseni (≤ 8 päeva).
- Kasutuspiiri kontroll tehakse pärast täituri enda 400-põhiseid katse siseseid korduskatseid
  (konteksti muutmine, mõtlemise/pingutuse piiramine, parameetrite automaatõpe), seega püütakse
  ainult mõnel sellisel korduskatsel ilmnev kasutuspiiri vastus 429 ikkagi kinni, mitte ei
  lasta sellel ooteaja teele jõuda.
- Olek asub iga ühenduse kohta mälus (taaskäivitamine põhjustab pakkumise uuesti vastuvõtmiseks
  ühe täiendava kasutuspiiri vastuse 429).

**Seansipiirangu lähtestamine** (`autoLimitReset`, kui mõlemad on sisse lülitatud, proovitakse enne rada):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  plokk; kui `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` koos
  sisuga `{ "program": "juniper_tide" }` (organisatsiooni UUID pärineb väljast
  `providerSpecificData.organizationUUID`, varuvariandina algväärtustamine).
- `result: reset|not_limited` → päringut proovitakse uuesti täiskiirusel (ilma aeglase raja
  päiseta). `already_used` / `not_offered` jätavad `next_available_at` väärtuse meelde
  (vaikimisi üks nädal); mis tahes tõrge põhjustab 15-minutilise taganemise. Lähtestamine
  on võimalik kord nädalas ja arvestatakse endiselt nädalase piirangu sisse.

Regressioonikaitsed: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seansi afiinsus (#7274)

**Ulatus:** üks kliendiseanss (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` päis), mis on seotud ühe ühendusega **mis tahes** teenusepakkuja puhul.

**Eesmärk:** hoida mitmevoorulist agenti (Claude Code, aider, kohandatud agendid) päringute vahel samal kontol, vähendades konto vahetamisest tingitud konteksti kadu ja korduvaid külmkäivitusest põhjustatud 429-vigu teenusepakkujatel, kelle seansi olek on kontopõhine.

**Teostus:**

- TTL-i lahendamine: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Kinnituse valimine/loomine: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Päise eraldamine (üldine, iga teenusepakkuja jaoks): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Püsiv kinnituste tabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Säte: `sessionAffinityTtlMs` (globaalne TTL millisekundites, `0` keelab) — `src/lib/db/settings.ts`. See nimetati ainult Codexile mõeldud sättest `codexSessionAffinityTtlMs` ümber migratsiooniga `124_generic_session_affinity_ttl.sql`, mis kannab kõik varem seadistatud Codexi TTL-i väärtused üle uueks vaikeväärtuseks.

Enne #7274 lõpetas `resolveSessionAffinityTtlMs()` kohe töö ja tagastas `0` iga teenusepakkuja puhul peale `codex`-i, mistõttu TTL-i säte (ja seansipäised) ei avaldanud mujal mõju, kuigi kinnitamise mehhanism ja päiste eraldamine olid juba teenusepakkujast sõltumatud. Parandus eemaldas selle varajase tagastuse; kui globaalne väärtus on määratud suuremaks kui `0`, rakendub TTL nüüd ühtlaselt kõigile teenusepakkujatele.

Kolme seansisidususe päist ei edastata kunagi ülesvoolu — täiturid koostavad oma ülesvoolupäised nullist, mitte ei edasta kliendi päiseid, seega jääb see ainult sisemiseks korrelatsiooniidentifikaatoriks.

### Hallatava seansi ühenduste eksklusiivsed liisingud

**Ulatus:** üks aktiivne hallatav HTTP-klient/seanss omab ühte sobivat OmniRoute'i ühendust.

**Eesmärk:** pakkuda püsivat eksklusiivset ühenduse omandiõigust klientidele, kes vajavad päringute vahel ranget marsruutimiskaitset. See erineb seansisidususest, mis on nõrk järjepidevuseelistus: eksklusiivne liising säilitab elutsükli oleku SQLite'is, jõustab aktiivse omaniku ja aktiivse ühenduse globaalse unikaalsuse ning lükkab aegunud põlvkonna enne teenusepakkujale edastamist tagasi.

Funktsioon lubatakse iga API-võtme jaoks eraldi. Hallataval võtmel peab olema ulatus `lease:exclusive` ja selgesõnaline mittetühi loend `allowedConnections`. Elutsükli lõpp-punkti saab kasutada iga HTTP-klient; kliendi nime, kasutajaagenti, teenusepakkujat, OAuthi meetodit ega mudelit ei nõuta. Liising omab ühendust, mitte mudelit, seega säilib mudeli vahetamisel seotus seni, kuni ühendus jääb tavapäraste reeglite järgi sobivaks. Tavapärased mudeli-, kvoodi-, seisundi-, ooteaja- ja lubatud loendi reeglid jäävad määravaks ning võivad viia sama põlvkonna üle teisele vabale sobivale ühendusele.

Elutsükkel kasutab `POST /api/v1/session-leases` päringut JSON-toimingutega `acquire`, `renew` ja `release`. Hallatavad inferentsipäringud esitavad läbipaistmatu `X-OmniRoute-Lease-Owner` väärtuse ja täpse `X-OmniRoute-Lease-Generation` väärtuse. Omanik koosneb prefiksist `vlo_`, millele järgneb 43 base64url-märki; salvestatakse ainult selle SHA-256 räsi. Iga lõplik edastustõke seob ka autenditud API-võtme ID ja aktiivse ühenduse ID. Liisingu juhtpäised eemaldatakse logidest, säilitatavatest päringutõmmistest ja ülesvoolu täituri päistest.

Kui tavapärase marsruutimise jaoks leidub sobivaid hallatavaid kandidaate, kuid kõik vabad kandidaadid on hõivatud võõra aktiivse liisinguga, tagastab OmniRoute HTTP `429`, koodi lease-capacity-unavailable, oleku waiting-for-capacity ja piiratud `Retry-After` väärtuse, mis tuletatakse varaseimast asjakohasest aegumisajast. Tavapärane sobivate kandidaatide puudumine ei ole liisingukonkurents ning säilitab olemasoleva marsruutimisvea semantika.

Seotud mehhanismid jäävad eraldiseisvaks:

- OAuthi seansihõivatus on protsessisisene nõrk jaotus OAuthi kontode jaoks.
- Konto semaforid annavad päringute samaaegsuse lubasid ja lõpevad päringu valmimisel.
- Hallatava seansi eksklusiivsed liisingud pakuvad püsivat elutsüklipõhist omandiõigust koos põlvkonnatõkkega.

---

## 3. Mudeli lukustus

**Ulatus:** pakkuja + ühendus + mudel kolmik.

**Võtme ulatus oleku järgi:** nurjunud olek määrab, millisele võtmele lukustus
kirjutatakse (`resolveLockoutScope()` failis `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvoodi- või kasutusõiguse signaal — lukustab **kvoodipere**:
  codexi puhul kogu `codex` / `spark` ulatuse (ühenduse iga `gpt-5*` mudeli),
  teiste pakkujate puhul `getQuotaScopedModelForProvider()`.
- `404` lukustab üksnes mudeli (`getModelLockKey()` kitsendab olekut `not_found`).
- Mis tahes muu olek — `5xx` transpordi-/serveritõrked ja OmniRoute'i enda
  kvaliteedikontrolli loodud `502` — lukustab ainult **täpse**
  pakkuja/ühenduse/mudeli kolmiku. Ühe mudeli vigane voog ei tõenda midagi
  konto kvoodi kohta; enne seda reeglit eemaldas üks tühi vastus mudelilt
  `codex/gpt-5.6-luna` marsruutimisest 2–30 minutiks (eskaleeruvalt) kõik selle
  ühenduse `gpt-5*` mudelid, kuigi selle kvoot jäi puutumata.
- Kutsuja sõnaselge suvand `scope` on alati ülimuslik (Antigravity edastab `"exact"`).

**Eesmärk:** vältida terve ühenduse keelamist, kui saadaval pole või kvoodipiiranguga on ainult üks mudel.

**Näited:**

- Mudelipõhise kvoodiga pakkujad, kes tagastavad 429
- Kohalikud pakkujad, kes tagastavad ühe puuduva mudeli puhul 404
- Pakkujapõhised režiimi-/mudeliloa tõrked (nt Groki režiimid)

**Teostus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mudelite jahtumiste töölaud (v3.8.0)

Kasutajaliides: Seaded → Mudelite jahtumised (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Loetleb aktiivsed lukustused koos järgmiste andmetega: pakkuja, ühendus, mudel, põhjus, aegumisaeg. Operaatorid saavad kaardilt mudeli käsitsi uuesti lubada.

**REST API:**

- `GET /api/resilience/model-cooldowns` — loetleb aktiivsed lukustused
- `DELETE /api/resilience/model-cooldowns` — käsitsi uuesti lubamine. Keha: `{provider, connection, model}`. Autentimine: haldus.

### Lukustusseadete kasutajaliides + eduka töö põhine taastumine (v3.8.23)

Mudeli lukustus muutus alati aktiivsest püsikodeeritud käitumisest täielikult seadistatavaks,
eraldi lubatavaks funktsiooniks, millel on oma seadete kaart ja isetaastuv taastetee.

**Seadete kaart:** Seaded → Mudeli lukustus
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
See **erineb** ülaltoodud kirjutuskaitstud kaardist `ModelCooldownsCard` (mis ainult
_loetleb_ aktiivseid lukustusi) — uus kaart _seadistab parameetreid_. Vaikeväärtused
asuvad muutujas `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Seadistus               | Vaikeväärtus                     | Tähendus                                                        |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | Pealüliti — mudeli lukustus on **vaikimisi välja lülitatud**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ülesvoolu olekud, mida loetakse mudelipõhiseks tõrkeks.         |
| `baseCooldownMs`        | `120_000` (120 s)                | Esimese tõrke esialgne lukustuse kestus.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskaleeritud jahtumisaja ülempiir.                              |
| `maxBackoffSteps`       | `10`                             | Eksponentsiaalse taganemise eskalatsioonisammude maksimumarv.   |
| `useExponentialBackoff` | `true`                           | Kas korduvad tõrked pikendavad jahtumisaega eksponentsiaalselt. |

Seaded säilitatakse tavapärases seadete hoidlas ja valideeritakse
töökindlusseadete skeemi kaudu; kaart piirab väärtusi `baseCooldownMs`/`maxCooldownMs`
(kus `maxCooldownMs ≥ baseCooldownMs`) ja `maxBackoffSteps`.

**Eduka töö põhine taastumine:** taastumine **ei** põhine üksnes taimeri aegumisel. Korras
vastus vähendab mudeli tõrkearvu, nii et taastusperioodi keskel taastunud mudeli
eskalatsioon peatub (ja lukustus eemaldatakse) enne taimeri aegumist. Kombineeritud
sihtmärgi eduka vastuse korral kutsub `open-sse/services/combo.ts` funktsiooni `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), mis **poolitab** salvestatud
`failureCount` väärtuse (`Math.floor(failureCount / 2)`); kui see jõuab väärtuseni `0`, kustutatakse lukustuskirje
täielikult. Vastandfunktsioon `recordModelLockoutFailure()`
suurendab eskalatsiooniakna jooksul tekkinud tõrgete korral loendurit (ja pikendab jahtumisaega).
See eduka töö põhine taastumine täiendab tavalist taimeri aegumist —
mudeli võib uuesti lubada kumbki tee.

**Olek:** lukustusi hoitakse **mälus** (protsessipõhistes `Map`-ides, mis sisaldavad
`ModelLockoutEntry` kirjeid võtmega `provider:connectionId:model`; täpse ulatusega lukustuste võtmed on
`provider:connectionId:exact:model`), neid ei säilitata
andmebaasis — taaskäivitamisel lähevad need kaotsi. _Seaded_ säilitatakse; aktiivne
lukustuse _olek_ on ajutine.

---

## 4. Kvoodijagamise samaaegsuse juhtimine (v3.8.36)

Tellimuskontod (GLM, MiniMax jne) aktsepteerivad sageli ainult ~1–3 samaaegset
päringut; selle piiri ületamine põhjustab 429-vastuseid ja ooteperioode. See probleem on eriti terav
**kvoodijagamise** (`qtSd/…`) kombinatsioonide korral, kus mitu API-võtit jagavad ühte ülesvoolu
kontot. Kolm kihti takistavad jagatud konto päringutega ülekoormamist.

### Ühendusepõhine samaaegsuse piirang (`max_concurrent`)

Iga teenusepakkuja ühendus saab määrata `max_concurrent` ülempiiri
(`provider_connections.max_concurrent`, seadistatav ühenduse modaalaknas / API-s / andmebaasis).
Piirangu puudumiseks jätke see tühjaks. See on ainus parameeter, mis juhib allpool kirjeldatud
serialiseerimiskihti — määrake selle väärtuseks konto tegelik samaaegsuse piir (nt GLM ~1, MiniMax ~2).

### Kvoodijagamise päringute serialiseerimine

Kui kvoodijagamise kaudu suunatakse päring ühendusele, millel on määratud positiivne
`max_concurrent`, serialiseeritakse sellele **kontole** tehtavad samaaegsed päringud
ühendusepõhise semafori kaudu (võti `qsconn:<connectionId>`): üleliigsed päringud **ootavad
järjekorras**, selle asemel et kontot üle koormata. Süsteem on **tõrke korral avatud** — täitunud
järjekorra või ajalõpu korral jätkatakse ilma kohata, selle asemel et suunamiskõlblik
päring kunagi tagasi lükata. Lüliti asub jaotises **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, vaikimisi
sees). Ilma `max_concurrent` piiranguta käitumine ei muutu.

> Kvoodijagamise suunamislüüs (`selectQuotaShareTarget`, DRR + P2C) on ka ise
> tõrke korral avatud ning ainult _vähendab prioriteeti_ piiri saavutanud ühendusel —
> ühe ühendusega kogumis ei saa see ranget piirangut rakendada, seega just see semafor
> hoiab päringutulva kontrolli all.

### Kombinatsiooni ooteperioodi arvestav korduskatse

Iga kombinatsioonistrateegia puhul (kui see on lubatud) ootab päring, mis muidu
muudaks LÜHIKESE ajutise ooteperioodi 429-vastuseks, ooteperioodi lõpuni ja suunatakse
429-vastuse tagastamise asemel uuesti — see hõlmab Gemini-klassi TPM/RPM-i ajavahemikke
(~60 s `retry-after`) mitme mudeliga kombinatsioonides, näiteks kui 2 mudeliga kombinatsiooni
mõlemad sihtmärgid jõuavad mudelipõhise kiirusepiiranguni. Seda piirab
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) jaotises
**Settings → Resilience**. Süsteem ei oota kunagi põhjuse `quota_exhausted`
(keskööni lukustatud) ega autentimis-/puudumisvigade korral.

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
