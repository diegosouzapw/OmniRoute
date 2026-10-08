# Resilience Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

„OmniRoute“ turi tris skirtingus, bet susijusius atsparumo mechanizmus. Kiekvieno jų aprėptis ir paskirtis skiriasi. Derindami maršruto parinkimo veikimą, vertinkite juos atskirai.

![3 sluoksnių atsparumo modelis](../diagrams/exported/resilience-3layers.svg)

> Šaltinis: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Teikėjo grandinės pertraukiklis

**Aprėptis:** visas teikėjas (pvz., `glm`, `openai`, `anthropic`).

**Paskirtis:** nebesiųsti srauto teikėjui, kurio aukštesniojo lygmens ar paslaugos užklausos nuolat patiria klaidų.

**Įgyvendinimas:**

- Pagrindinė klasė: `src/shared/utils/circuitBreaker.ts`
- Susiejimas: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Būsenos API: `GET /api/monitoring/health`
- Nustatymo iš naujo API: `POST /api/resilience/reset`
- Apgaubiamieji komponentai: `open-sse/services/accountFallback.ts`
- DB lentelė: `domain_circuit_breakers`

**Būsenos:**

- `CLOSED` — leidžiamas įprastas srautas
- `DEGRADED` — srautas vis dar leidžiamas, tačiau stebimas padidėjęs teikėjo klaidų skaičius
- `OPEN` — teikėjas laikinai blokuojamas; kombinuotasis maršruto parinkimas jį praleidžia
- `HALF_OPEN` — baigėsi nustatymo iš naujo skirtasis laikas; leidžiama bandomoji užklausa

**Konfigūruojamos numatytosios reikšmės (`open-sse/config/constants.ts`, pasiekiamos skiltyje „Dashboard“ → „Settings“ → „Resilience“):**

| Klasė      | Pablogėja po | Atidaroma po | Nustatymo iš naujo skirtasis laikas |
| ---------- | ------------ | ------------ | ----------------------------------- |
| OAuth      | 5 klaidų     | 8 klaidų     | 60s                                 |
| API raktas | 7 klaidų     | 12 klaidų    | 30s                                 |
| Vietinis   | išvedama     | 2 klaidų     | 15s                                 |

`degradationThreshold` nustato, kada teikėjo būsena tampa `DEGRADED`; `failureThreshold` nustato, kada grandinė atidaroma ir teikėjas praleidžiamas. Vietinių teikėjų profiliai kol kas nerodomi atsparumo nustatymų puslapyje.

**Suveikimo kodai:** tik teikėjo lygmens būsenos `[408, 500, 502, 503, 504]`. NESUAKTYVINKITE dėl paskyros lygmens klaidų (daugumos 401/403/429 — jas turi apdoroti atvėsimo arba blokavimo mechanizmas).

**Atidėtasis atkūrimas:** pasibaigus `OPEN` galiojimo laikui, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atnaujina būseną į `HALF_OPEN`. Foninis laikmatis nereikalingas.

---

### Pasirinktinis visuotinis teikėjo atvėsimas (laiko lango užkarda)

Ketvirtasis, **pasirinktinis** sluoksnis (`PROVIDER_COOLDOWN_ENABLED`, pagal numatytuosius nustatymus **išjungtas**) išsaugo
tarp užklausų bendrinamą informaciją apie klaidų patiriančius teikėjus faile
`open-sse/services/providerCooldownTracker.ts`; kombinuotųjų paskirties taškų
nustatymas ją tikrina, kad viena po kitos siunčiamos kombinuotosios užklausos nebandytų iš naujo pereiti per ką tik
klaidą patyrusį teikėją. Teikėjo lygmens įrašams taikoma `PROVIDER_PROFILES` laiko lango užkarda:

| Profilis   | suveikia po (`providerFailureThreshold`) | per (`providerFailureWindowMs`) | atvėsta per (`providerCooldownMs`) |
| ---------- | ---------------------------------------: | ------------------------------: | ---------------------------------: |
| OAuth      |                                     `10` |                         `15min` |                             `5min` |
| API raktas |                                     `15` |                         `30min` |                            `10min` |

Kol slenkstis nepasiektas, teikėjas **nelaikomas** atvėstančiu; sėkminga užklausa išvalo
lango duomenis. Ryšio lygmens įrašams (`provider:connectionId`) ir toliau taikomas
eksponentinis `minRetryCooldownMs → maxRetryCooldownMs` delsos didinimas. Perrašos:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresijos patikra: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ryšio atvėsimo laikotarpis

**Apimtis:** vienas teikėjo ryšys / paskyra / raktas.

**Paskirtis:** praleisti vieną netinkamą raktą, kol kiti to paties teikėjo ryšiai toliau aptarnauja užklausas.

**Įgyvendinimas:**

- Pažymėjimas kaip nepasiekiamo: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pasirinkimas: `getProviderCredentials*` tame pačiame faile
- Atvėsimo laikotarpio skaičiavimas: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nustatymai: `src/lib/resilience/settings.ts`

**Kiekvieno ryšio laukai:**

- `rateLimitedUntil` — laiko žyma, iki kurios galioja atvėsimo laikotarpis
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentinio delsos didinimo skaitiklis

**Numatytieji atvėsimo laikotarpiai:**

- OAuth bazinis: 5 s
- API rakto bazinis: 3 s
- API rakto 429: pirmenybė teikiama aukštesniojo serverio `Retry-After` / atkūrimo antraštėms / išanalizuojamam atkūrimo tekstui
- Delsos didinimas: `baseCooldownMs * 2 ** failureIndex`

**Apsauga nuo vienalaikių užklausų antplūdžio:** neleidžia lygiagrečioms triktims pernelyg pratęsti atvėsimo laikotarpio ar dukart padidinti `backoffLevel`.

**Galutinės būsenos (NE atvėsimo laikotarpiai):**

- `banned` — nustatoma aptikus uždraustą raktažodį / paskyros blokavimą (žr. [BAN_DETECTION](../security/BAN_DETECTION.md)), taip pat po trijų iš eilės aukštesniojo serverio atsisakymų vykdyti atskiras užklausas (`request_rejected`, pvz., Anthropic OAuth 403 „Request not allowed“ — `open-sse/services/requestRejectedStreak.ts`); po vieno atsisakymo ryšiui tik pritaikomas atvėsimo laikotarpis
- `expired` (po riboto pakartotinių bandymų skaičiaus pereinama į galutinę būseną — `EXPIRED_RETRY_MAX = 3` su eksponentiniu delsos didinimu — todėl laikinos OAuth klaidos gali išnykti savaime prieš visam laikui išaktyvinant paskyrą)
- `credits_exhausted`

Šios būsenos išlieka, kol pakeičiami prisijungimo duomenys arba operatorius jas nustato iš naujo. Neperrašykite galutinių būsenų laikina atvėsimo būsena.

**Atidėtasis atkūrimas:** kai `rateLimitedUntil` laikas praeina, ryšys vėl tampa tinkamas naudoti. Sėkmingai jį panaudojus, `clearAccountError()` išvalo visus klaidos laukus.

### Claude OAuth naudojimo riba: žemesnio prioriteto kanalas + seanso ribos nustatymas iš naujo

**Apimtis:** vienas Claude prenumeratos (OAuth) ryšys. Abi funkcijos **pasirenkamos atskirai kiekvienam
ryšiui** (Redaguoti ryšį → Claude skiltis → `lowPriorityMode` / `autoLimitReset`, esančios
`providerSpecificData`; abi pagal numatytuosius nustatymus išjungtos) ir atitinka Claude Code komandas `/low-priority` bei
`/limit-reset` (ryšio protokolas užfiksuotas pagal Claude Code 2.1.263).

**Įgyvendinimas:**

- Būsenų automatas + atsakymų klasifikavimas: `open-sse/services/claudeLowPriority.ts`
- Atkūrimo būsenos / rezervavimo klientas: `open-sse/services/claudeLimitReset.ts`
- Vykdyklės integravimo taškas (antraštės įterpimas + pakartotinis bandymas su ta pačia paskyra): `open-sse/executors/base.ts::execute()`
- Pasirinkimo išsaugojimas: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Aktyviklis:** 5 valandų naudojimo riba — `429`, kurio antraštėse yra
`anthropic-ratelimit-unified-status: rejected` ir, kai paskyra yra tinkama,
`anthropic-ratelimit-unified-slow-offer: treatment`. Iki pirmojo ribą žyminčio
429 niekas nesiunčiama; staigus 429 be suvienodintų antraščių apdorojamas įprastu atvėsimo mechanizmu.

**Žemesnio prioriteto kanalas** (`lowPriorityMode`):

- Gavusi ribą žymintį 429 vykdyklė priima pasiūlymą ir nedelsdama pakartoja užklausą su **ta pačia**
  paskyra bei `anthropic-usage-limit: slow`; kanalas lieka aktyvus iki paskelbto
  `anthropic-ratelimit-unified-reset` (+60 s atsargos), o kiekvienoje per tą laikotarpį siunčiamoje užklausoje yra
  ši antraštė. Perimtas 429 nepasiekia `handleChatCore`, todėl ryšiui
  **netaikomas** atvėsimo laikotarpis ir jis nepakeičiamas kitu.
- `anthropic-ratelimit-unified-slow-status` vėlesniuose atsakymuose: `active` / `not_needed`
  išlaiko kanalą; `slot_busy` (429) arba `529` atveju laukiama serverio nurodyto
  `anthropic-ratelimit-unified-slow-retry-after` (numatyta 20 s, ribojama iki 5–600 s, ±30 % atsitiktinis nuokrypis)
  ir bandoma dar kartą, neviršijant `anthropic-ratelimit-unified-slow-max-wait` (numatyta 20 min., ribojama
  iki 1 min.–6 val.) — viršijus šį laiką kanalas uždaromas, o 10 minučių atvėsimo laikotarpis neleidžia jo priimti iš naujo. Be to,
  laukimo trukmę riboja likęs pačios užklausos aukštesniojo serverio paleidimo skirtasis laikas
  (`resolveFetchStartTimeout`, pagal numatytuosius nustatymus 10 min.) atėmus 5 s atsargą: be šio apribojimo
  numatytasis 20 minučių maksimalus laukimas truktų ilgiau nei užklausa, o miego režimas būtų nutrauktas
  laukimo metu, todėl vietoj tvarkingo `max_wait` užbaigimo ir atvėsimo būtų pateikta `TimeoutError`.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 val. lango pasikeitimas arba
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (tai užbaigia kanalą kaip
  `extra_usage` esant bet kokiai būsenai, nes mokamas limito viršijimas dabar padengia ribą) uždaro kanalą; tuomet
  atsakymas perduodamas įprastam atvėsimo mechanizmui. `budget_exhausted` įsimenama iki
  paskelbto biudžeto atkūrimo (≤ 8 dienos).
- Ribos patikra vykdoma po pačios vykdyklės vidinių bandymo pakartojimų, kuriuos sukelia 400 (konteksto
  redagavimas, mąstymo / pastangų ribojimas, automatinis parametrų mokymasis), todėl tik per
  vieną iš šių pakartojimų pasirodęs ribą žymintis 429 vis tiek perimamas ir nepatenka į atvėsimo mechanizmą.
- Būsena saugoma atmintyje kiekvienam ryšiui atskirai (paleidus iš naujo, pasiūlymui priimti prireikia vieno papildomo ribą žyminčio 429).

**Seanso ribos nustatymas iš naujo** (`autoLimitReset`, išbandomas prieš kanalą, kai įjungtos abi funkcijos):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  blokas; kai `arm: "reset"` ir `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` su
  `{ "program": "juniper_tide" }` (organizacijos UUID iš
  `providerSpecificData.organizationUUID`, pradinis atsarginis variantas).
- `result: reset|not_limited` → užklausa pakartojama visu greičiu (be lėtojo režimo antraštės).
  `already_used` / `not_offered` įsimena `next_available_at` (pagal numatytuosius nustatymus viena savaitė); po bet kokios
  trikties taikoma 15 minučių delsa. Atkūrimą galima atlikti kartą per savaitę ir jis vis tiek įskaičiuojamas į
  savaitės ribą.

Apsaugos nuo regresijų: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seanso prieraišumas (#7274)

**Apimtis:** vienas kliento seansas (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` antraštė), priskirtas vienam ryšiui, **bet kuriam** teikėjui.

**Paskirtis:** išlaikyti kelių užklausų agentą (Claude Code, aider, pasirinktinius agentus) toje pačioje paskyroje tarp užklausų, taip sumažinant konteksto praradimą keičiant paskyras ir pasikartojančias šaltojo paleidimo 429 klaidas teikėjų sistemose, kuriose seanso būsena saugoma atskirai kiekvienai paskyrai.

**Įgyvendinimas:**

- TTL nustatymas: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Susiejimo pasirinkimas / sukūrimas: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Antraštės išskyrimas (bendrasis, bet kuriam teikėjui): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Išliekamoji susiejimų lentelė: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nustatymas: `sessionAffinityTtlMs` (visuotinis TTL milisekundėmis, `0` išjungia) — `src/lib/db/settings.ts`. Per migraciją `124_generic_session_affinity_ttl.sql` pervadintas iš tik Codex skirto `codexSessionAffinityTtlMs`; bet kokia anksčiau sukonfigūruota Codex TTL reikšmė perkeliama kaip naujoji numatytoji reikšmė.

Iki #7274 `resolveSessionAffinityTtlMs()` visiems teikėjams, išskyrus `codex`, iš karto grąžindavo `0`, todėl TTL nustatymas (ir seanso antraštės) niekur kitur neturėjo poveikio, nors susiejimo mechanizmas ir antraščių išskyrimas jau nepriklausė nuo konkretaus teikėjo. Pataisoje šis ankstyvas grąžinimas pašalintas; dabar TTL vienodai taikomas kiekvienam teikėjui, kai visuotinai nustatoma didesnė nei `0` reikšmė.

Trys seanso susiejimo antraštės niekada nepersiunčiamos aukštyn — vykdyklės savo aukštesniojo lygmens antraštes kuria nuo nulio, užuot persiuntusios kliento antraštes, todėl tai lieka tik vidiniu koreliacijos identifikatoriumi.

### Išskirtinės valdomų seansų ryšio nuomos

**Taikymo sritis:** vienam aktyviam valdomam HTTP klientui / seansui priklauso vienas tinkamas OmniRoute ryšys.

**Paskirtis:** suteikti ilgalaikę išskirtinę ryšio nuosavybę klientams, kuriems tarp užklausų reikalingas griežtas maršruto parinkimo
barjeras. Tai skiriasi nuo seanso susiejimo, kuris yra neprivaloma tęstinumo pirmenybė:
išskirtinė nuoma išsaugo gyvavimo ciklo būseną SQLite, užtikrina visuotinį aktyvaus savininko ir
aktyvaus ryšio unikalumą bei atmeta pasenusią kartą prieš perduodant užklausą teikėjui.

Funkcija pasirenkama atskirai kiekvienam API raktui. Valdomas raktas turi turėti `lease:exclusive` aprėptį ir
aiškiai nurodytą netuščią `allowedConnections` sąrašą. Gyvavimo ciklo galinį tašką gali naudoti bet kuris HTTP klientas; nereikia
nei kliento pavadinimo, nei naudotojo agento, nei teikėjo, nei OAuth metodo, nei modelio. Nuomai priklauso ryšys,
o ne modelis, todėl pakeitus modelį susiejimas išlieka, kol ryšys tebėra įprastai
tinkamas. Įprastos modelio, kvotos, būklės, atvėsimo laikotarpio ir leidžiamųjų sąrašų taisyklės išlieka viršesnės ir gali
perkelti tą pačią kartą į kitą laisvą tinkamą ryšį.

Gyvavimo ciklas valdomas per `POST /api/v1/session-leases`, naudojant JSON veiksmus `acquire`, `renew` ir `release`.
Valdomos išvedimo užklausos pateikia neskaidrią `X-OmniRoute-Lease-Owner` reikšmę ir tikslią
`X-OmniRoute-Lease-Generation` reikšmę. Savininko reikšmę sudaro `vlo_` ir po jo einantys 43 base64url simboliai; saugoma tik
jos SHA-256 maiša. Kiekvienas galutinis perdavimo barjeras taip pat susiejamas su autentifikuoto API rakto ID ir
aktyvaus ryšio ID. Nuomos valdymo antraštės pašalinamos iš žurnalų, išsaugomų užklausų momentinių kopijų ir
aukštesniojo lygmens vykdyklių antraščių.

Jei įprasto maršruto parinkimo metu yra tinkamų valdomų kandidatų, tačiau kiekvieną laisvą kandidatą užima
svetima aktyvi nuoma, OmniRoute grąžina HTTP `429`, kodą, nurodantį, kad nuomos pajėgumai nepasiekiami,
laukimo, kol atsiras pajėgumų, būseną ir apribotą `Retry-After` reikšmę, apskaičiuotą pagal anksčiausiai pasibaigsiančią susijusią nuomą.
Įprastas tinkamų kandidatų nebuvimas nėra nuomos konfliktas, todėl jam išlieka esama maršruto parinkimo klaidų semantika.

Susiję mechanizmai išlieka atskirti:

- OAuth seansų užimtumas yra procesui lokalus neprivalomas OAuth paskyrų paskirstymas.
- Paskyrų semaforai suteikia užklausų lygiagretumo leidimus, kurie nustoja galioti užklausai pasibaigus.
- Išskirtinės valdomų seansų nuomos yra ilgalaikė gyvavimo ciklo nuosavybė su kartos barjeru.

---

## 3. Modelio blokavimas

**Aprėptis:** teikėjo, ryšio ir modelio trejetas.

**Rakto aprėptis pagal būseną:** nesėkmės būsena nulemia, kuriam raktui įrašomas blokavimas
(`resolveLockoutScope()` faile `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvotos arba prieigos teisių signalas — blokuojama **kvotos šeima**:
  „codex“ atveju visa `codex` / `spark` aprėptis (kiekvienas ryšio `gpt-5*`
  modelis), kitų teikėjų atveju – `getQuotaScopedModelForProvider()`.
- `404` blokuoja tik patį modelį (`getModelLockKey()` susiaurina `not_found`).
- Bet kuri kita būsena — `5xx` perdavimo / serverio klaidos ir pačios „OmniRoute“
  sugeneruota `502` būsena po kokybės patikros — blokuoja tik **tikslų**
  teikėjo / ryšio / modelio trejetą. Netinkamas vieno modelio srautas nėra įrodymas
  apie paskyros kvotą; iki šios taisyklės vienas tuščias
  `codex/gpt-5.6-luna` atsakas pašalindavo visus to ryšio `gpt-5*` modelius iš
  maršruto parinkimo 2–30 min. (laikui ilgėjant), nors jo kvota likdavo nepaliesta.
- Iškvietėjo aiškiai nurodyta `scope` parinktis visada turi pirmenybę („Antigravity“ perduoda `"exact"`).

**Paskirtis:** neleisti išjungti viso ryšio, kai nepasiekiamas arba kvotos apribotas tik vienas modelis.

**Pavyzdžiai:**

- Teikėjai, taikantys atskirų modelių kvotas ir grąžinantys 429
- Vietiniai teikėjai, grąžinantys 404 dėl vieno trūkstamo modelio
- Konkrečiam teikėjui būdingos režimo / modelio leidimų klaidos (pvz., „Grok“ režimai)

**Įgyvendinimas:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modelių atvėsimo laikotarpių suvestinė (v3.8.0)

Naudotojo sąsaja: Nustatymai → Modelių atvėsimo laikotarpiai (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Pateikiami aktyvūs blokavimai su šiais laukais: teikėjas, ryšys, modelis, priežastis, expiresAt. Operatoriai kortelėje gali rankiniu būdu iš naujo įjungti modelį.

**REST API:**

- `GET /api/resilience/model-cooldowns` — pateikti aktyvių blokavimų sąrašą
- `DELETE /api/resilience/model-cooldowns` — rankiniu būdu įjungti iš naujo. Turinys: `{provider, connection, model}`. Autentifikavimas: valdymo.

### Blokavimo nustatymų naudotojo sąsaja ir atkūrimas mažinant skaitiklį po sėkmės (v3.8.23)

Modelio blokavimas iš visada įjungto, programiniame kode fiksuoto veikimo tapo visiškai konfigūruojama,
pasirenkama funkcija su atskira nustatymų kortele ir savaime atsikuriančiu atkūrimo mechanizmu.

**Nustatymų kortelė:** Nustatymai → Modelio blokavimas
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ji **skiriasi** nuo anksčiau nurodytos tik skaitomos `ModelCooldownsCard` (kuri tik
_pateikia_ aktyvių blokavimų sąrašą) — naujoji kortelė _konfigūruoja parametrus_. Numatytosios
reikšmės apibrėžtos `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nustatymas              | Numatytoji reikšmė               | Reikšmė                                                                                      |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Pagrindinis jungiklis — pagal numatytuosius nustatymus modelių blokavimas yra **išjungtas**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Aukštesnio lygmens paslaugos būsenos, laikomos su modeliu susijusia triktimi.                |
| `baseCooldownMs`        | `120_000` (120 s)                | Pradinė pirmosios trikties blokavimo trukmė.                                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Didėjančio atvėsimo laikotarpio viršutinė riba.                                              |
| `maxBackoffSteps`       | `10`                             | Didžiausias eksponentinio delsos didinimo žingsnių skaičius.                                 |
| `useExponentialBackoff` | `true`                           | Ar pasikartojančios triktys eksponentiškai ilgina atvėsimo laikotarpį.                       |

Nustatymai išsaugomi įprastoje nustatymų saugykloje ir tikrinami pagal
atsparumo nustatymų schemą; kortelė apriboja `baseCooldownMs` / `maxCooldownMs`
(kai `maxCooldownMs ≥ baseCooldownMs`) ir `maxBackoffSteps`.

**Atkūrimas mažinant skaitiklį po sėkmės:** atkūrimas grindžiamas **ne vien** laikmačio galiojimo pabaiga. Tinkamas
atsakas sumažina modelio trikčių skaičių, todėl per esamą laikotarpį atsikūręs modelis
nustoja ilginti blokavimo laiką (ir blokavimas pašalinamas) dar nepasibaigus laikmačiui. Kai kombinuotas
tikslas sėkmingai atsako, `open-sse/services/combo.ts` iškviečia `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), kuri **perpus sumažina** išsaugotą
`failureCount` (`Math.floor(failureCount / 2)`); kai reikšmė pasiekia `0`, blokavimo
įrašas visiškai pašalinamas. Atitinkama funkcija `recordModelLockoutFailure()`
padidina skaitiklį (ir pailgina atvėsimo laikotarpį), kai per ilginimo
laikotarpį įvyksta trikčių. Šis mažinimas po sėkmės papildo įprastą laikmačio galiojimo pabaigą —
modelį iš naujo gali įjungti bet kuris iš šių mechanizmų.

**Būsena:** blokavimai laikomi **atmintyje** (kiekvieno proceso `Map` objektuose su
`ModelLockoutEntry` reikšmėmis, indeksuojamomis pagal `provider:connectionId:model`, o tikslios aprėpties blokavimai —
pagal `provider:connectionId:exact:model`), o DB jie
neišsaugomi — paleidus iš naujo jie prarandami. _Nustatymai_ išsaugomi, tačiau aktyvi
blokavimo _būsena_ yra laikina.

---

## 4. Kvotos bendrinimo lygiagretumo valdymas (v3.8.36)

Prenumeratos paskyros (GLM, MiniMax ir kt.) dažnai vienu metu priima tik ~1–3
užklausas; viršijus šią ribą gaunami 429 atsakymai ir taikomi atvėsimo laikotarpiai. Tai ypač aktualu naudojant
**kvotos bendrinimo** (`qtSd/…`) derinius, kai keli API raktai bendrai naudoja vieną išorinę
paskyrą. Trys lygmenys apsaugo bendrinamą paskyrą nuo užtvindymo.

### Vieno ryšio lygiagretumo riba (`max_concurrent`)

Kiekvienam teikėjo ryšiui galima nurodyti `max_concurrent` ribą
(`provider_connections.max_concurrent`, nustatoma ryšio modaliniame lange / API / DB).
Jei apribojimas nereikalingas, palikite lauką tuščią. Tai vienintelis parametras, valdantis toliau aprašytą
nuoseklaus vykdymo lygmenį — nustatykite jį pagal faktinį paskyros lygiagretumą (pvz., GLM ~1, MiniMax ~2).

### Kvotos bendrinimo užklausų vykdymas nuosekliai

Kai kvotos bendrinimo persiuntimas nukreipiamas į ryšį, kuriam nustatyta teigiama
`max_concurrent` reikšmė, lygiagrečios užklausos tai **paskyrai** vykdomos nuosekliai naudojant
atskirą kiekvieno ryšio semaforą (raktas `qsconn:<connectionId>`): perteklinės užklausos **laukia
eilėje**, užuot užtvindžiusios paskyrą. Taikomas **fail-open** principas — jei eilė perpildyta
arba baigiasi skirtasis laikas, vykdymas tęsiamas negavus vietos, užuot atmetus persiųsti tinkamą
užklausą. Įjunkite arba išjunkite skiltyje **Nustatymai → Atsparumas → Kvotos bendrinimo lygiagretumas
vienam ryšiui** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, pagal numatytuosius nustatymus
įjungta). Nenustačius `max_concurrent` ribos, veikimas nesikeičia.

> Pats kvotos bendrinimo maršruto parinkimo mechanizmas (`selectQuotaShareTarget`, DRR + P2C)
> veikia pagal fail-open principą ir tik suteikia _mažesnį prioritetą_ ribą pasiekusiam ryšiui — kai
> telkinyje yra tik vienas ryšys, jis negali nustatyti griežtos ribos, todėl būtent šis semaforas
> faktiškai suvaldo užklausų srautą.

### Atvėsimo laikotarpius įvertinantis pakartotinis derinių vykdymas

Naudojant bet kurią derinių strategiją (kai ji įjungta), užklausa, dėl kurios galutinai būtų gautas 429
atsakymas dėl TRUMPO laikino atvėsimo laikotarpio, jo pabaigos palaukia ir yra persiunčiama iš naujo,
užuot grąžinus 429 — tai apima Gemini klasės TPM/RPM langus (~60 s `retry-after`)
kelių modelių deriniuose, pvz., kai abu dviejų modelių derinio tikslai pasiekia konkretaus modelio
užklausų dažnio ribą. Ribas nustato `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) skiltyje **Nustatymai → Atsparumas**. Niekada nelaukiama esant `quota_exhausted`
(užrakinta iki vidurnakčio) arba autentifikavimo / nerasto ištekliaus priežastims.

---

## 5. Užklausų eilės priėmimo valdymas (v3.8.49 · problema #6593)

**Taikymo sritis**: vietinė kiekvieno teikėjo ir ryšio spartos ribojimo eilė (`open-sse/services/rateLimitManager.ts`,
pagrįsta Bottleneck), esanti vienu lygmeniu žemiau trijų pirmiau aprašytų mechanizmų.

**`maxWaitMs` riboja laukimą eilėje; `executionMaxWaitMs` riboja vykdymą.**
Šios dvi ribos sąmoningai atskirtos ir nė viena neturi įtakos kitai.

`resilienceSettings.requestQueue.maxWaitMs` yra **laukimo eilėje laiko limitas**:
jis apima laukimą, kol atsilaisvins teikėjo vieta, ir paskesnį buvimą būsenoje QUEUED, o jo laikmatis
išvalomas iškart, kai užduotis palieka būseną QUEUED ir pradedama vykdyti
(`rateLimitManager.ts`, `wrappedFn`). Šį limitą viršijusi užklausa niekada
nepasiekia išorinio teikėjo. Numatytoji reikšmė yra 30000ms, ją pateikia
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`, esantis `src/lib/resilience/settings.ts`, ir įtvirtina
`tests/unit/ratelimit-admission-control-6593.test.ts`, todėl ją pakeitus
šis testas nepraeis, užuot leidęs šiai pastraipai nepastebimai pasenti.

`resilienceSettings.requestQueue.executionMaxWaitMs` yra reikšmė, kurią Bottleneck
gauna kaip užduoties `expiration`; jos laikmatis paleidžiamas tik po užduoties perdavimo vykdyti. Tai yra
apsauginė riba vykdyklėms, kurios neturi savo išorinio teikėjo skirtojo laiko, ir ji
padidinama iki vykdyklės užklausos pradžios skirtojo laiko, kai šis yra ilgesnis, todėl
ji negali nutraukti tinkamai vykdomo atsakymo. Numatytoji reikšmė yra 600000ms (10 min.).

Eilės laiko limito perdavimas į `expiration` anksčiau nutraukdavo neinkrementinius
tinklų sietuvus vykdymo metu — iki pirmųjų baitų jie pagrįstai gali veikti kelias minutes —
todėl galiojimo laiko pabaiga pateikiama kaip `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), o eilės laiko limitui naudojamas
eilės skirtojo laiko kodas. Bet kurią reikšmę galima pakeisti naudojant `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (aplinkos kintamuosius) arba valdymo skydelį
(**Nustatymai → Atsparumas**). Normalizuojant abi reikšmės apribojamos intervalu nuo 1ms iki 24h.

**Abiejų reikšmių pirmumas:** aplinkos kintamasis pateikia tik _numatytąją_ reikšmę. Reikšmė,
išsaugota `resilienceSettings.requestQueue` (naudojant valdymo skydelį / API dalinį naujinimą ir saugoma
`key_value`), turi pirmumą prieš ją, o konkretaus ryšio
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` turi pirmumą prieš pastarąją. Todėl
aplinkos kintamojo nustatymas dieginyje, kuriame jau yra išsaugota reikšmė,
nieko nepakeis — vietoje to išvalykite arba atnaujinkite išsaugotą nustatymą.

Buvimo eilėje trukmę riboja `maxWaitMs`; toliau aprašytas `maxQueueDepth` riboja,
kiek užklausų vienu metu gali būti eilėje.

**`maxQueueDepth` — pasirinktinis priėmimo limitas (nauja funkcija).** `resilienceSettings.requestQueue.maxQueueDepth`
riboja, kiek vieno teikėjo ir ryšio užklausų vienu metu gali laukti eilėje (dar nebūti perduotos vykdyti).
Kai eilėje jau yra `maxQueueDepth` užklausų, nauja užklausa iškart atmetama pateikiant tipizuotą
`code: "RATE_LIMIT_QUEUE_FULL"` klaidą **prieš** jai pasiekiant `limiter.schedule()`
— todėl atmetimas nereikalauja daug išteklių ir įvyksta prieš bet kokį tolesnį
tos užklausos raginimo glaudinimą / vertimą. Numatytoji reikšmė `0` =
išjungta, todėl išlaikoma esama neribotos eilės elgsena; leistinas intervalas 0–100000.
Reikšmę galima pakeisti naudojant `RATE_LIMIT_MAX_QUEUE_DEPTH` (aplinkos kintamąjį) arba
`resilienceSettings.requestQueue.maxQueueDepth` (valdymo skydelio / API dalinį naujinimą).

Pati priėmimo patikra yra grynoji funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), todėl
ją galima testuoti modulių testais be tikro Bottleneck ribotuvo.

> RFC, kuriuo buvo pradėta #6593 problema, taip pat pasiūlė
> `bypassCompressionOnRateLimit` žymą. Šios saugyklos
> `open-sse/services/compression/` konvejeris glaudina išoriniam LLM siunčiamos užklausos
> raginimą / kontekstą (`chatCore.ts`, maždaug ties
> `resolveCompressionSettings`/`selectCompressionStrategy` bloku), o ne glaudina HTTP atsakymus
> sintetintuose 429 atsakymų turiniuose — pažodinei apėjimo žymai nėra
> atitinkamo kodo kelio. Be to, šis raginimo glaudinimo veiksmas šiuo metu vykdomas
> _prieš_ `withRateLimit()` užklausų konvejeryje, todėl veiksmų tvarkos pakeitimas, siekiant
> jį praleisti, kai užklausa atmetama dėl pilnos eilės, yra atskiras ir didesnis
> pakeitimas, nei numatyta šios problemos taikymo srityje; jis čia sąmoningai
> **nebuvo** įgyvendintas ir paliktas vėlesniam etapui, jei procesoriaus išteklių taupymo nauda
> bus verta veiksmų tvarkos keitimo rizikos.

---

## 6. Lėto srauto pralaidumo stebėjimo mechanizmas (#9709)

Pasirinktinis `resilienceSettings.streamRecovery.throughputWatchdog` saugiklis aptinka
aukščiau grandinėje esantį šaltinį, kuris vis dar siunčia fragmentus, tačiau generuoja
asistento išvestį mažesniu nei sukonfigūruotas naudingojo išvedimo dažniu. Jis sąmoningai
atskirtas nuo neveiklumo skirtojo laiko: kontroliniai signalai ir metaduomenys neatstato
nė vieno laikmačio ir nelaikomi pažanga. Jis taip pat skiriasi nuo griežto bandymo
termino (#9153), kuris išlieka absoliučia saugos riba, neatsižvelgiant į išvesties kokybę.

Kad stebėjimo mechanizmas galėtų nutraukti vykdymą, turi praeiti įšilimo laikotarpis,
o po jo — visas slankusis langas. Jis skaičiuoja teksto pokyčius iš Chat Completions ir
Responses API išvesties įvykių (naudodamas konservatyvų UTF-8 baitų pakaitinį matą),
nepaiso tik naudojimo duomenis turinčių ir tuščių įvykių bei pristabdo vertinimą, kol
vykdomi įrankių iškvietimo arba samprotavimo įvykiai. Pagal numatytuosius nustatymus jis
yra išjungtas ir gali būti įjungtas naudojant `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
langą, įšilimo laikotarpį, mažiausią dažnį ir mažiausią išmatuojamą išvestį apriboja
įprastas atsparumo nustatymų normalizavimo sluoksnis.

Kai šis mechanizmas įjungtas, jo inicijuotas nutraukimas taikomas tik aktyviam bandymui
aukščiau grandinėje. Kol klientui dar neišsiųstas nė vienas baitas, esamas ankstyvojo
atkūrimo su ta pačia paskyra kelias gali iš naujo pradėti bandymą. Po patvirtinimo srautas
niekada aklai neatkuriamas; priesagą gali prijungti tik esama saugaus tęsimo srauto viduryje
sutartis. Užbaigimas ir toliau atliekamas tik vieną kartą, todėl naudojimo apskaita ir
semaforo atlaisvinimas nedubliuojami.

---

## 7. Aukščiau grandinėje gautos būsenos pakartotinis nustatymas (klaidingai nurodytos kvotos klaidos)

**Taikymo sritis:** vienas aukščiau grandinėje esantis šliuzas, kuris apie laikiną kvotos išnaudojimą praneša naudodamas netinkamą HTTP būseną.

**Paskirtis:** pataisyti klaidinančią būseną PRIEŠ klasifikavimą, kad žemiau grandinėje esantys vartotojai (atsarginio perjungimo variklis, kombinacijų agregavimas, klientui skirtas atsakas) matytų tikrąjį pakartotinai bandytinos trikties pobūdį.

Kai kurie šliuzai apie LAIKINĄ kvotos išnaudojimą praneša naudodami HTTP būseną,
su kuria pakartotinis bandymas neatliekamas. `agentrouter.org` grąžina `403` (kartais
`400`) su tekstu kinų kalba (`用户额度不足` / `额度不足`), o ne standartinę būseną
`429`. Tokie klientai kaip Claude Code būseną `403` laiko nuolatine klaida ir nutraukia
seansą, o neatlikus pataisymo atsarginio perjungimo variklis ją klasifikuotų kaip
`AUTH_ERROR`, o ne kaip kvotos įvykį.

**Įgyvendinimas:**

- Registras ir atitikties tikrintuvas: `open-sse/config/upstreamStatusRestatement.ts` —
  kiekvienam teikėjui skirtas taisyklių sąrašas (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), kurio atitikmenys nustatomi naudojant `applyStatusRestatement()`.
- Iškvietimo vieta: `providerFailure:` blokas faile `open-sse/handlers/chatCore.ts`
  (maždaug ties 3654 eilute), iškart po to, kai `parseUpstreamError()` išanalizuoja
  aukščiau grandinėje gautą atsaką su klaidos HTTP būsena (`!providerResponse.ok`), ir
  prieš atliekant bet kokį klasifikavimą, kad kiekvienas žemiau grandinėje esantis
  vartotojas matytų pataisytą būseną. Klaidos, įterptos į `200` SSE srautą, apdorojamos
  atskiru vėlesniu srauto analizavimo keliu ir šiandien šiuo perėmimo mechanizmu
  **neapimamos** — tai žinomas apribojimas, kurio kol kas nereikia agentrouter klaidingai
  būsenai (ji pateikiama kaip klaidos HTTP būsena).
- Pakartotinio bandymo tinkamumas: `429` yra įtraukta į `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), todėl klaida su pakartotinai
  nustatyta būsena turi tikrą pakartotinio bandymo langą, užuot pateikiama kaip
  neveiksni `403`.
- Sintetinė `60s` reikšmė `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yra
  tik tai, ką atsakas su pakartotinai nustatyta būsena nurodo **klientui**; ji savaime
  nėra vidinė ryšio atvėsimo / blokavimo trukmė — ją atskirai valdo mechanizmas, kuris
  faktiškai apdoroja klaidą su pakartotinai nustatyta būsena (Connection Cooldown
  didėjanti atidėjimo trukmė, §2, bazinė `3s` API rakto teikėjams; arba Model Lockout,
  §3, teikėjams, turintiems atskiras modelių kvotas, pvz., agentrouter). Maršruto
  parinktuvas gali tapti tinkamas vidiniam pakartotiniam bandymui anksčiau nei baigiasi
  klientui nurodytas 60s langas — tai sąmoningai palikta atsarga, o ne klaida.

Nuolatinėms klaidoms (agentrouter `无权访问模型` — nėra prieigos prie šio modelio)
būsena NIEKADA nenustatoma pakartotinai: `excludeMarkers` atmeta taisyklę net ir
sutapus `textMarkers`, todėl klaida išsaugo savo pradinę būseną ir niekas nebando
jos kartoti amžinai. Atitinkamą teikėjo klasifikavimo taisyklę
(`agentrouter-model-access-denied` faile `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklaruotas bazinis `6h` atvėsimo laikotarpis)
`checkFallbackError` (`open-sse/services/accountFallback.ts`) patikrina
_prieš_ bendrąjį apikey kategorijos `FORBIDDEN` ankstyvąjį grįžimą, jei tai leidžia
`honorsRuleLockScope(provider)` (#10334 — šiuo metu taikoma tik agentrouter per
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` leidžiamųjų sąrašą faile
`providerErrorRules.ts`). Taisyklėje deklaruotas 6h atvėsimo laikotarpis perduodamas kaip
`fallbackResult.baseCooldownMs`, tačiau jis vis tiek patenka į jau egzistuojantį
atskiros modelio kvotos blokavimo kelią (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, kurio #10334 nepakeitė, išskyrus atvėsimo laikotarpio
šaltinį): kaip ir kiekvieno kito modelio blokavimo atveju, jis sumažinamas iki
operatoriaus `mlSettings.maxCooldownMs` (numatytoji reikšmė `1_800_000ms` / 30min), o
_išsaugota blokavimo priežastis_ lieka jau egzistuojanti, kode tiesiogiai įrašyta
`"forbidden"`, o ne taisyklės `"auth_error"` — nuo pradžios iki galo paisoma tik
atvėsimo trukmės, bet ne priežasties eilutės. Pats ryšys lieka aktyvus; kiti to paties
ryšio modeliai nepaveikiami.

Perfrazuotos kvotos klaidos (`额度不足`) gamybinėje aplinkoje atitinka teikėjo taisyklę
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, nėra deklaruoto nuosavo atvėsimo laikotarpio — taikoma išlaikymo sluoksnio
numatytoji laipsniškai didinama kartotinių bandymų delsa). Nuo #10334,
`ProviderErrorRuleMatch` laukas `scope` YRA naudojamas visoje grandinėje, tačiau **tik**
teikėjams, esantiems `HONORS_RULE_LOCK_SCOPE_PROVIDERS` leidžiamųjų sąraše
(`providerErrorRules.ts` — šiuo metu tik `"agentrouter"`, valdoma per
`honorsRuleLockScope()`). Visų kitų teikėjų atveju `scope` tebėra tik
informacinis, lygiai kaip iki #10334. `checkFallbackError` pateikia atitikusios
taisyklės apimtį kaip `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) yra bendroji
patikra, patvirtinanti, kad `ruleScope` tikrai saugu laikyti visam ryšiui
taikomu, savaime atsistatančiu signalu (`scope` yra `"connection"`, priežastis
yra `quota_exhausted`, niekada ne `permanent`, niekada ne `creditsExhausted` —
apsauga nuo būsimos taisyklės, susiejančios apimtį `"connection"` su nuolatine
paskyros būsena). Ją iškviečia du naudotojai:

- **Išlaikymas** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  užuot patekus į tiesioginio perdavimo teikėjo **kiekvienam modeliui atskirai**
  taikomą blokavimo šaką (`agentrouter` turi `passthroughModels: true` →
  `hasPerModelQuota()` grąžina `true`), pritaikomas **laikinas ryšio atvėsimo
  laikotarpis** — `testStatus: "unavailable"` + `rateLimitedUntil`, niekada
  galutinė būsena (`credits_exhausted`/`banned`/`expired`) — todėl ryšys
  savaime atkuriamas pasibaigus atvėsimo laikotarpiui ir nereikia rankiniu būdu
  iš naujo nustatyti prisijungimo duomenų. Praleidžiama ryšiams, kuriuose
  `disableCooling: true` (#2997): pasirinkus šią išimtį, vietoj to pereinama į
  kiekvienam modeliui taikomą blokavimą (tai dokumentuotas kompromisas —
  žr. kodo komentarą virš šios šakos).
- **Kombinuotas maršruto parinkimas toje pačioje užklausoje**
  (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ta pati patikra įtraukia
  ryšį į atmintyje laikomą `exhaustedConnections` rinkinį, kurio raktas yra
  `${provider}:${connectionId}`. Taip praleidžiamas tik likęs TOS PAČIOS
  UŽKLAUSOS tikslas, kuris _savo tiksliniame objekte jau turi būtent tą patį
  `connectionId`_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prieš `exhaustedConnections` paiešką) — paprastas modelių
  sąrašo derinys, kuriame lygiaverčiai tikslai neturi savo prisegto
  `connectionId`, o jis kiekvienam išsiuntimui nustatomas tik iš atsakymo
  antraštės `X-OmniRoute-Selected-Connection-Id`, niekada neatitinka šio rakto.
  Šiuo įprastu atveju tikroji apsauga nuo to, kad likusi šaka pakartotinai
  panaudotų ką tik išnaudotą paskyrą, yra NE šis rinkinys — ją užtikrina pirmiau
  aprašytas išlaikymo sluoksnis (ryšio `rateLimitedUntil` dabar nurodo laiką
  ateityje) kartu su tuo, kad ta pati patikra šiai nesėkmei neleidžia įtraukti
  teikėjo į `transientRateLimitedProviders` (žr. „Dviejų etapų struktūra“ ir
  kodo komentarą ties `isAgentrouterConnectionQuotaScope` šaka faile
  `targetExhaustion.ts`): kadangi tas rinkinys lieka nepažymėtas, likusioms
  teikėjo šakoms NEĮSIJUNGIA `combo.ts` priverstinis leidimas
  `allowRateLimitedConnection` (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`), todėl prisijungimo duomenų parinkimo filtras
  `rateLimitedUntil` (`src/sse/services/auth.ts:1238`) taikomas įprastai, o
  likusi šaka arba pasirenka kitą, vis dar tinkamą `agentrouter` ryšį, arba
  nepavyksta, nes nėra prieinamų prisijungimo duomenų — ji nepriverčia sistemos
  grįžti prie ryšio, kuriam ši šaka ką tik pritaikė atvėsimo laikotarpį.

### Dviejų etapų struktūra: būsenos perfrazavimas, tada klasifikavimas

Būsenos perfrazavimo (`upstreamStatusRestatement.ts`) ir teikėjo
klasifikavimo taisyklės (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) yra atskiri registrai, kurie abu naudoja teikėjo ID ir
teksto žymenis kaip raktus, tačiau vykdomi skirtingose vietose ir atlieka
skirtingas funkcijas: perfrazavimas anksti perrašo HTTP būseną faile
`chatCore.ts`; klasifikavimo taisyklės parenka atsarginio maršruto `reason` ir
užrakto `scope` (`model` / `provider` / `connection`) funkcijoje
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Klasifikavimo taisyklės visą klaidos **tekstą** (būtiną norint aptikti tokius
atsako turinio žymenis kaip `额度不足`) mato tik teikėjams, įtrauktiems į
`FULL_TEXT_RULE_PROVIDERS` leidžiamųjų sąrašą faile `providerErrorRules.ts` —
šiuo metu tai tik `"agentrouter"`. Kiekvieno kito **integruoto katalogo**
teikėjo atveju `checkFallbackError` perduoda `getProviderErrorRuleMatch` tik
struktūrizuotą klaidą (`{code, type}`), kurios pakanka antraštėmis, būsena ar
kodu grindžiamoms taisyklėms, tačiau ji nemato atsako turinio teksto žymenų.
Pagalbinė funkcija `resolveRuleMatchBody()` atlieka šį parinkimą: visą klaidos
tekstą leidžiamųjų sąraše esantiems teikėjams, o kitiems — struktūrizuotą
klaidą. **Integruoto** teikėjo įtraukimas į `FULL_TEXT_RULE_PROVIDERS` yra
aiškus konkretaus teikėjo įjungimas — jis egzistuoja tam, kad numatytasis
kelias kiekvienam sąraše nesančiam teikėjui išliktų identiškas baitas į baitą.

Taisyklės `scope` (`model` / `provider` / `connection`) yra atskirai įjungiama
nuostata, nepriklausoma nuo `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError`
tik pateikia ją kaip `fallbackResult.ruleScope`, o tolesni naudotojai ją laiko
ne vien informacine žyma tik teikėjams, įtrauktiems į tame pačiame faile
esantį `HONORS_RULE_LOCK_SCOPE_PROVIDERS` leidžiamųjų sąrašą (valdoma per
`honorsRuleLockScope()` — šiuo metu tik `"agentrouter"`). Žr. pirmiau pateiktą
skiltį „Perfrazuotos kvotos klaidos“, kur aprašyta, ką iš tikrųjų daro
`scope: "connection"` atitiktis, kai teikėjas yra tame leidžiamųjų sąraše.

**#11104 — operatoriaus deklaruotos taisyklės apeina abu leidžiamuosius sąrašus.** Operatorius gali
vykdymo metu deklaruoti konkrečiam teikėjui skirtą taisyklę per `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
neredaguodamas šio failo. Jei operatoriaus taisyklės taikymas būtų apribotas
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — leidžiamaisiais
sąrašais, skirtais apsaugoti įtaisytųjų katalogo taisyklių **numatytąją** elgseną, —
nustatymų mechanizmas neveiktų nė vienam teikėjui, išskyrus jau įtrauktus į
tuos sąrašus, nes taisyklės deklaravimas jau yra aiškus operatoriaus
sutikimas ją taikyti. `resolveRuleMatchBody()` ir `honorsRuleLockScope()` pirmiausia
patikrina `hasOperatorRuleForProvider()`: teikėjas, turintis operatoriaus taisyklę,
gauna neapdorotą klaidos tekstą, o jo deklaruota `scope` yra paisoma,
neatsižvelgiant į tai, ar jis taip pat yra kuriame nors leidžiamajame sąraše.

**Žinoma spraga — `providerRuleRegistry` niekada netikrinamas HTTP 400 atveju.**
`checkFallbackError` šaka `BAD_REQUEST` būseną 400 klasifikuoja tik
pagal savo šablonų masyvus (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` ir kt. faile `accountFallback.ts`) ir grąžina rezultatą
dar nepasiekusi aukščiau esančios `configuredRule`/`getProviderErrorRuleMatch`
šakos. Įtaisytoji katalogo taisyklė (arba operatoriaus taisyklė) su `status: 400`
sintaksiškai galioja, tačiau niekada nebus suaktyvinta. Šiuo metu jokia esama
taisyklė nėra skirta 400 būsenai, todėl tai neturi įtakos produkcinei aplinkai,
tačiau prieš pridedant būsimą 400 taisyklę pirmiausia reikės pakeisti šią
šaką. Tai didesnis pakeitimas nei vien taisyklės pridėjimas (jis iš naujo
klasifikuoja 400 būseną kiekvienam teikėjui, kuris jau remiasi šablonų masyvų
elgsena), todėl nepatenka į vienam teikėjui skirtos taisyklės pridėjimo apimtį.

### Naujo klaidingai kvotą nurodančio šliuzo pridėjimas

1. Užregistruokite vieną taisyklių masyvą registre `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` turi būti
   būdingi konkrečiam teikėjui; niekada pakartotinai nenaudokite bendrinių
   angliškų frazių, kurios sutampa su `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Pasirinktinai užregistruokite klasifikavimo taisykles faile
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), kad būtų
   pasirinkta tinkama užrakto aprėptis (`connection` visos paskyros kvotai,
   `model` konkretaus modelio klaidoms). Produkcinėje aplinkoje šis veiksmas
   turi poveikį tik teikėjams, kurių taisyklėms reikia viso klaidos teksto
   (turinio žymeklių): įtraukite teikėjo id į `FULL_TEXT_RULE_PROVIDERS` tame
   pačiame faile — kitu atveju `checkFallbackError` taisyklei perduoda tik
   struktūrizuotą `{code, type}` klaidą, todėl turinio tekstu pagrįsta taisyklė
   niekada neatitiks realaus srauto. Taisyklėms, kurios tikrina tik
   `status`/`headers` (pvz., Opencode arba Minimax taisyklės), šio aiškaus
   įjungimo nereikia. Atskirai, jei taisyklė deklaruoja `scope: "connection"`
   ir siekiama tikro visam ryšiui taikomo atvėsimo laikotarpio bei kombinuoto
   taikinio praleidimo toje pačioje užklausoje (o ne vien informacinės žymos),
   įtraukite teikėjo id į `HONORS_RULE_LOCK_SCOPE_PROVIDERS` tame pačiame
   faile — būtent tai valdo `isAgentrouterConnectionQuotaScope()` pobūdžio
   reikšmės panaudojimą funkcijoje `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) ir `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); be to `scope` vis tiek
   perduodama per `fallbackResult.ruleScope`, tačiau niekas pagal ją neveikia.
3. Pridėkite vienetinius testus pagal `tests/unit/upstream-status-restatement.test.ts`
   ir `tests/unit/agentrouter-error-rules.test.ts` pavyzdį (įskaitant
   apsaugas nuo permanentinio / `creditsExhausted` klasifikavimo ir, jei
   teikėjui reikia leidžiamojo sąrašo, testą, patvirtinantį, kad
   `resolveRuleMatchBody()` grąžina visą tekstą tik tam teikėjui).

Nereikia keisti `chatCore.ts`, `classifyError` ar combo.

#### Pagal išeigos IP grupuojamas užraktas (#10880)

Teikėjai iš `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode šeima) laikomi
aukštesnio lygmens paslaugomis, grupuojamomis pagal IP (nemokamas opencode
lygis grupuojamas pagal IP, o ne pagal paskyrą — žr. #9611): būsena 429,
suklasifikuota kaip `quota_exhausted` **arba** `rate_limit_exceeded`, nustato
atvėsimo laikotarpį kiekvienam leidžiamajame šeimos sąraše esančiam ryšiui,
kurio paskutinis žinomas išeigos IP sutampa su klaidą gavusio ryšio IP, dar
prieš rotacijai bandant juos
— taip išvengiama N-1 garantuotai nesėkmingų aukštesnio lygmens paslaugos
iškvietimų (tokia pati schema kaip #10460/#10525).
`rate_limit_exceeded` įtrauktas sąmoningai: `markAccountUnavailable` kelyje
opencode skirtos taisyklės niekada neatitinka (į `checkFallbackError`
neperduodamos antraštės ar turinys, o opencode nėra įtrauktas į
`FULL_TEXT_RULE_PROVIDERS`), todėl 429 klaida, kurios turinyje yra prenumeratos
kvotos tekstas („monthly usage limit reached“), klasifikuojama kaip
`quota_exhausted` pagal atsarginę kvotos teksto logiką
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 val. atvėsimo
laikotarpis) dar nepasiekus `status_429` taisyklės, o 429 be kvotos teksto
(paprastas dažnio ribojimas) pagal `status_429` taisyklę klasifikuojama kaip
`rate_limit_exceeded` ir vis tiek nustato atvėsimo laikotarpį visai IP šeimai.
Į leidžiamąjį sąrašą įtrauktam teikėjui pagal IP grupuojamas dažnio ribojimas
yra toks pat signalas kaip išnaudota kvota. Sąžiningai nurodomi apribojimai:

- **Geriausios pastangos principas**: blokavimas nustato paskutinį žinomą ryšio `egress_ip`
  iš `proxy_logs` (24 val. laikotarpis, sinchroniškai, be podėlio). Jei podėlis
  tuščias (išėjimo IP niekada netikrintas) arba nėra eilutės → klaidą patyrusiam
  ryšiui šaka vis tiek pritaiko atvėsimo laikotarpį (jis registruojamas kaip ir
  dabar), tačiau neblokuojamas joks susijęs ryšys.
- **Niekada nėra galutinė būsena**: atvėsimo laikotarpis yra atnaujinamas kvotos
  langas (`testStatus: "unavailable"`); nuolatinė būsena niekada nenustatoma
  pagal IP lygmens signalą. Ryšiams su `disableCooling` ši šaka visiškai
  netaikoma.
- **Į leidžiamųjų sąrašą įtrauktai šeimai keičiamas blokavimo detalumo lygis**:
  tai yra aprėpties pakeitimas, o ne vien susijusių ryšių optimizavimas.
  opencode yra `passthroughModels` teikėjas, todėl iki šios šakos 429 klaida
  sukeldavo blokavimą konkrečiam MODELIUI; dabar ji sukelia ryšio atvėsimo
  laikotarpį — net jei operatorius naudoja tik vieną ryšį ir nėra jokių
  susijusių ryšių. Būtent šis detalumo lygis opencode taisyklių lentelėje jau
  nurodytas kaip teisingas (`scope: "connection"`,
  `providerErrorRules.ts`), tačiau iki šiol jo niekada nebuvo laikomasi, nes
  opencode nėra įtrauktas į `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Pati šaka
  įrašo klaidą patyrusio ryšio atvėsimo laikotarpį ir `backoffLevel`,
  atkartodama ryšio aprėptį naudojančią agentrouter šaką, ir grįžta — toliau
  esantys konkretaus modelio blokas ir bendrasis kelias niekada nepasiekiami.
- **Įtrauktas „combo“ atvejis**: kaip ir agentrouter šaka, ši aprėptis sąmoningai
  nepaiso `persistUnavailableState`/`isCombo` pažeminimo, kurį „combo“
  kvietėjas pritaiko 429 klaidai. Konkretaus modelio blokavimas nėra silpnesnė
  šios aprėpties forma — tai netinkamas vienetas: jis nieko nepasako apie
  išeikvotą IP, todėl „combo“ rotacija ir toliau atliktų po vieną garantuotai
  nesėkmingą užklausą kiekvienam susijusiam ryšiui.
- **Susijusių ryšių saugumas**: susijęs ryšys, kuris jau yra galutinės būsenos
  (užblokuotas / kreditai išeikvoti) arba kuriam jau taikomas ilgesnis atvėsimo
  laikotarpis, niekada neperrašomas.
- **Išskirtinis leidžiamųjų sąrašas**: `EGRESS_BUCKETED_LOCK_PROVIDERS`
  išplėtimas yra aiškus savininko sprendimas; nėra jokio bendrojo susiejimo
  (šablonas #10334/#10419). Susijusių ryšių užklausa susiejama su tuo pačiu
  leidžiamųjų sąrašu, užuot pakartojus jį kaip SQL literalą, todėl jo
  išplėtimas lieka vienos eilutės pakeitimas.
- **Išėjimo IP rotacija abiem kryptimis**: paieškos langas (24 val.) yra gerokai
  platesnis už išėjimo IP podėlio TTL (5 min.), todėl „paskutinis žinomas IP“
  yra istorinis įrašas, o ne dabartinė būsena. Jei ryšio tarpinio serverio IP
  per šį laikotarpį pasikeitė, blokavimas gali **neaptikti** iš tiesų bendro IP
  (įrašytas IP yra naujas, dar neišeikvotas) — ir, atvirkščiai, gali **pritaikyti
  atvėsimo laikotarpį susijusiam ryšiui, kurio IP nuo to laiko pasikeitė** ir
  nebėra išeikvotas. Antruoju atveju susijęs ryšys praranda vieną atvėsimo
  laikotarpį; abu atvejai laikomi priimtinais istorija pagrįstos geriausių
  pastangų paieškos apribojimais.
- **Sąnaudos**: du riboti `proxy_logs` nuskaitymai (pagal laikotarpį filtruojami
  naudojant `idx_pl_timestamp`), atliekami tik 429 klaidų dažniu. Naujo indekso
  nėra (migracijai 134 taikomas YAGNI). Išmatuota naudojant vidutinio dydžio
  realaus srauto DB kopiją; didelio pralaidumo egzemplioriuje per tą patį
  laikotarpį eilučių skaičius bus proporcingai didesnis.

---

## Kitos atsparumo funkcijos

- **19 maršruto parinkimo strategijų** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — žr. [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Į atkūrimą atsižvelgiantis maršruto parinkimas** (v3.8.0) — ryšiams teikiama pirmenybė pagal kvotos atkūrimo laiką.
- **Foninio režimo supaprastinimas** — Responses API `background: true` režimas pakeičiamas sinchroniniu, pateikiant įspėjimą.
- **Dinaminis įrankių limito aptikimas** — pasiekus įrankių skaičiaus limitą, paslaugų teikėjų apkrova sumažinama.
- **Avarinis atsarginis variantas** — valdomas naudojant `OMNIROUTE_EMERGENCY_FALLBACK`; operatoriai gali pakeisti jo nuostatą funkcijų žymų puslapyje nepaleisdami sistemos iš naujo.

---

## Derinimas

- Svertinis derinys grąžina `503 all_targets_cooling_down` (nustatyta `Retry-After`, o `diagnostics.excluded` pateikia kiekvieną paskirties elementą su `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → telkinys sukonfigūruotas ir prijungtas, tačiau kiekvienas paskirties elementas yra atmestas dėl atsparumo laikmačio; įspėjime `[COMBO] Weighted selection: every target excluded before dispatch — …` nurodomos priežastys ir likusios sekundės. To paties derinio grąžinamas `404 no_executable_targets` reiškia, kad nebuvo įtrauktas joks atsparumo laikmatis (nėra ką vykdyti arba nė viena paskyra nepraėjo pasiekiamumo patikros). Sukuriama `open-sse/services/combo/pinRecovery.ts`, naudojant iš `targetResolution.ts` surinktus atmetimus.
- Praleisti visi teikėjo raktai → patikrinkite ir grandinės pertraukiklio būseną, IR kiekvieno ryšio `rateLimitedUntil` / `testStatus`.
- Teikėjas visam laikui atmetamas pasibaigus nustatymo iš naujo laikotarpiui → kodas skaito neapdorotą `state`, užuot naudojęs `getStatus()` / `canExecute()`.
- Vienas raktas neveikia, o kiti turėtų veikti → pirmenybę teikite ryšio atvėsimo laikotarpiui, o ne grandinės pertraukikliui.
- Neveikia tik vienas modelis → pirmenybę teikite modelio blokavimui, o ne ryšio atvėsimo laikotarpiui.
- Būsena turėtų atsikurti savaime, bet neatsikuria → patikrinkite, ar yra būsima laiko žyma ir ar nuskaitymo kelias atnaujina nebegaliojančią būseną. Nuolatinėms būsenoms būtini rankiniai pakeitimai.

---

## TLS pirštų atspaudai ir maskavimas

Konkretiems paslaugų teikėjams skirtas maskavimas (JA3/JA4, CCH, obfuscation) dokumentuojamas atskirai — žr. `docs/security/STEALTH_GUIDE.md` (git; nekompiliuojama į `/docs`).

---

## Atsparumo testavimas (8 etapas · C blokas)

Be atsparumo logikos vienetų testų, trys testai tikrina vykdymo aplinką
realiomis apkrovos ir gedimų sąlygomis (visi yra integraciniai / naktiniai — nė vienas neblokuoja PR):

| Testas                 | Kas tikrinama                                                                                                                                                                                                               | Paleidimas                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaoso                 | Netikras išorinis mazgas įterpia tikrą delsą / atkūrimą / skirtąjį laiką / 503; patikrinama, ar grandinės pertraukiklis atsidaro / atsikuria ir ar `checkFallbackError` klasifikuoja 503 kaip atkuriamą atsarginį variantą. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Krūvos augimo          | ~500 srautų kiekvienam `createSSEStream`, naudojant `--expose-gc`; testas nepavyksta, jei krūva viršija ribą (OOM apsauga #3069).                                                                                           | `npm run test:heap`                       |
| k6 ilgalaikės apkrovos | Nuolatinė `/api/monitoring/health` apkrova; p95 / klaidų ribinės vertės.                                                                                                                                                    | `k6 run tests/load/k6-soak.js` (naktinis) |

Koordinuojama naudojant `.github/workflows/nightly-resilience.yml` (cron + rankinis paleidimas). Numatytajame
`test:integration` chaoso ir krūvos testai automatiškai praleidžiami (be `RUN_CHAOS_INT`/`--expose-gc`).

---

## Taip pat žr.

- [Architektūros vadovas](./ARCHITECTURE.md) — Sistemos architektūra ir vidinė sandara
- [Naudotojo vadovas](../guides/USER_GUIDE.md) — Teikėjai, kombinacijos, CLI integracija
- [Automatinių kombinacijų variklis](../routing/AUTO-COMBO.md) — 16 veiksnių vertinimas, režimų paketai
