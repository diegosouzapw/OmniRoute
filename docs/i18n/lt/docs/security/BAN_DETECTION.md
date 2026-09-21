# Account-Ban / Banned-Keyword Detection (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

„OmniRoute“ tikrina aukštesniojo lygio paslaugų teikėjo klaidų atsakymus, ieškodama požymių, rodančių, kad paslaugų teikėjo
**paskyra yra visam laikui nebeveikianti** (sustabdyta / deaktyvinta / užblokuota dėl paslaugų teikimo sąlygų pažeidimo), ir, aptikusi
atitiktį, perkelia tą ryšį į **galutinę būseną `banned`**, kad jis
nebebūtų pasirenkamas užklausoms. Būtent tai konfigūruojama nustatymų kortelėje **Sauga → Uždrausti raktažodžiai**
(„Papildomi raktažodžiai, suaktyvinantys nuolatinio paskyros užblokavimo
aptikimą. Integruotieji raktažodžiai taikomi visada.“).

Šiame puslapyje aprašomas integruotasis sąrašas, aptikimo eiga, jo taikymo sritis, kaip saugiai pridėti
pasirinktinių raktažodžių ir kaip atkurti pažymėtą ryšį. Pati galutinė
būsena yra atsparumo modelio dalis — žr.
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Galutinės būsenos“).

**Pirminis tiesos šaltinis:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Integruotieji raktažodžiai

Šios 8 poeilutės taikomos visada (neatsižvelgiant į raidžių dydį), nepaisant pasirinktinio sąrašo:

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

> Šis sąrašas kinta paslaugų teikėjams keičiant blokavimo pranešimų formuluotes. Autoritetinga
> kopija yra `ACCOUNT_DEACTIVATED_SIGNALS`, esanti `open-sse/services/accountFallback.ts`;
> pirmiau pateiktą bloką laikykite momentine kopija.

Tame pačiame faile yra dvi gretimos, **atskiros** signalų lentelės, kurios _nėra_
uždraustų raktažodžių aptikimo dalis:

- `CREDITS_EXHAUSTED_SIGNALS` — išnaudotas atsiskaitymo / kvotos limitas (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → galutinė būsena `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ne galutinė būsena**; atnaujinus prieigos raktą veikimą galima atkurti.

Pastaba: dažnos laikinos frazės, pvz., **`rate limit`** / `429`, apdorojamos
užklausų dažnio ribojimo / ryšio atvėsimo mechanizmo ir **nėra** blokavimo signalai.

## Aptikimo eiga

```
aukštesniojo lygio paslaugų teikėjo klaidos atsakymas
  → turinys konvertuojamas į eilutę ir mažąsias raides
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [poeilutės atitiktis]
  → atitiktis?
      → ryšio testStatus = "banned"      (visam laikui — 1 metų atvėsimo laikotarpis, automatiškai niekada neatkuriamas)
      → jei nustatymas `autoDisableBannedAccounts` įjungtas, o `autoDisableBannedScope`
        apima šį ryšį (`all` arba `subscription`, kai naudojamas OAuth / slapukas / sesija)
        → taip pat isActive = false. Iš anksto apmokėti API raktai lieka aktyvūs, kai taikymo sritis yra
        `subscription`.
      → renkant paskyrą ryšys praleidžiamas (bendrosios QUOTA_BLOCKING būsenos)
```

- Atitiktis nustatoma atliekant **poeilutės paiešką neatsižvelgiant į raidžių dydį** atsakymo **turinyje**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Nuolatinė galutinė būsena `banned` nustatoma aptikus blokavimo signalą atsakymo turinyje esant **bet kokiai
  HTTP būsenai** (per `markAccountUnavailable` → `checkFallbackError`). Siauresnė
  žyma **`deactivated`** (`isActive=false`, kai ryšys neturi
  atsarginių API raktų) įrašoma vidiniame `chatCore.ts` kelyje, kai gaunama **HTTP 401 / 403**
  (klasifikuojama per `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Atkreipkite dėmesį, kad
  `markAccountUnavailable()` kelias tam pačiam `ACCOUNT_DEACTIVATED` signalui įrašo _kitą_
  galutinę būseną — **`expired`** — (per
  `resolveTerminalConnectionStatus`), todėl tas pats blokavimas gali būti pateikiamas kaip
  `deactivated` arba `expired`, priklausomai nuo to, kuris kelias apdorojo atsakymą. (Senesniame
  kodo komentare sakoma „kai 401 atsakymo turinyje yra šios eilutės“ — tai
  nevisiškai atspindi dabartinę elgseną.)
- Ryšys, kurio būsena yra `banned`, neįtraukiamas į pasirinkimą visur, kur filtruojamos galutinės būsenos
  (`isTerminalConnectionStatus`, bendrosios `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Taikymo sritis — kurie teikėjai tikrinami

**Visi teikėjai.** Patikra vykdoma bendrame klaidų apdorojimo procese, per kurį
pereina kiekviena nepavykusi išorinė užklausa — ji **neapsiriboja**
OAuth / prenumeratų duomenų rinktuvais. Gauta galutinė būsena taikoma kiekvienam
**ryšiui**, o ne kiekvienam teikėjui.

Vis dėlto integruotosios _eilutės_ yra orientuotos į prenumeratos / OAuth
teikėjus, kuriems iš tikrųjų kyla užblokavimo rizika (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). API rakto teikėjo detektorius suveiks tik tada, jei jo klaidos tekste
pažodžiui bus viena iš nurodytų poilučių.

`autoDisableBannedScope` (`all` | `subscription`, numatytoji reikšmė `all`) valdo, ar
aptikus atitiktį taip pat nustatoma `isActive=false`. `subscription` reiškia prisijungimu pagrįstas vietas
(mokamas prenumeratas ir nemokamas paskyras, įskaitant žiniatinklio slapukų seansus). Išankstinio
mokėjimo API raktams vis tiek įrašoma `testStatus=banned`, tačiau jie paliekami užklausų nukreipimo
telkinyje. Ilgalaikis sprendimas yra kiekvieno teikėjo ir kiekvienos paskyros atskiras perrašymas; visuotinis
enum yra pirmasis sprendimo variantas.

## Pasirinktiniai blokavimo raktažodžiai

Pridėkite arba pašalinkite raktažodžius skiltyje **Security → Banned Keywords** (jie išsaugomi kaip visuotinis
`customBannedSignals` nustatymas per `PATCH /api/settings`). Jie yra **pridedami prie**
integruotojo sąrašo — niekada jo nepakeičia — ir įrašius pakeitimus (taip pat paleidžiant)
įkeliami iš naujo naudojant `setCustomBannedSignals()`. Kiekvienas raktažodis gali būti ne ilgesnis kaip 200 simbolių;
masyvo ilgiui apribojimų nėra.

**⚠ Klaidingai teigiamų rezultatų rizika — rinkitės konkrečias frazes.** Aptikimas atliekamas ieškant neapdorotos
poilutės visame atsakymo tekste, o atitiktis yra **nuolatinė** (1 metų atvėsimo laikotarpis,
atkūrimas rankiniu būdu). Dėl pernelyg bendro raktažodžio gali būti užblokuotas visiškai tinkamai veikiantis ryšys:

- **Blogai:** `quota`, `limit`, `error`, `denied` — pasitaiko daugelyje laikinų klaidų.
- **Gerai:** išsamūs blokavimo sakiniai, pvz., `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Pirmenybę teikite ilgiausiai nedviprasmiškai frazei, kurią teikėjas grąžina tikro blokavimo atveju. Jei
abejojate, pirmiausia stebėkite ryšio `lastError`, tada pridėkite tikslią formuluotę.

## Pažymėto ryšio atkūrimas

Galutinės `banned` / `deactivated` būsenos **niekada automatiškai neatkuriamos** (jos neįtraukiamos
į aktyviojo atkūrimo ciklą — savaime atkuriami tik `unavailable` atvėsimo laikotarpiai).
Operatorius turi jas pašalinti aiškiai nurodydamas:

1. **Pakartotinai išbandyti ryšį** — valdymo skydelio veiksmas **Test**
   (`POST /api/providers/{id}/test`); sėkminga patikros užklausa atkuria `testStatus` į
   `active` ir išvalo klaidų laukus.
2. **Pakartotinai autentifikuoti / redaguoti prisijungimo duomenis** — OAuth teikėjams iš naujo vykdykite prisijungimo
   / atnaujinimo procesą; teikėjo kūrimo / importavimo maršrutai nustato `isActive = true`.
3. **Iš naujo įjungti ryšį** — jei automatinis išjungimas nustatė `isActive = false`
   (taikymo sritis `all` arba `subscription`, skirta OAuth / slapuko / seanso ryšiui),
   sutvarkę paskyrą vėl jį įjunkite.

Atskiro mygtuko „išvalyti blokavimo žymę“ nėra — atkūrimas atliekamas pakartotiniu bandymu, pakartotine autentifikacija arba
pakartotiniu įjungimu, laikantis bendrosios galutinės būsenos taisyklės, aprašytos
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Patikros užklausų izoliavimas (visų modelių testavimas)

**Patikros užklausos sukelta klaida** (visų modelių testavimo / būklės patikros iškvietimai, vykdomi
`runAsProbe` viduje) niekada nepašalina ryšio iš telkinio (#9817): ji yra
**įrašoma matomumo tikslais** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), tačiau praleidžiamas **kiekvienas** užklausų nukreipimo pakeitimas — atvėsimo laikotarpiai, galutinė
būsena (`banned` / `deactivated` / `credits_exhausted`), konkretaus modelio blokavimai,
teikėjo grandinės pertraukiklis, 5 minučių kvotos podėlis, OAuth prieigos rakto atnaujinimas
ir automatinis išjungimas. Deaktyvinama tik dėl klaidos tikros užklausos kelyje. Įrašyta
klaida leidžia pažymėtą paskyrą matyti valdymo skydelyje, nors ji ir toliau
aptarnauja srautą.

Vienintelis sprendimo priėmimo taškas yra `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), kurį tikrina **kiekviena** vieta, galinti
pakeisti užklausų nukreipimo būseną dėl patikros užklausos sukeltos klaidos:

- `markAccountUnavailable` (`auth.ts`) — tik įrašymas (`lastError` neapdorotas tekstas,
  `lastErrorType`, `errorCode`, `lastErrorAt`; sąmoningai **be**
  `backoffLevel`, nes jis paleistų automatinį slopinimą pasirinkimo metu ir ištrintų
  įrašą)
- `maybeAutoDisableBannedAccount` — automatiškai neišjungiama
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (tik įrašymas,
  be galutinės `credits_exhausted` būsenos), GEO_BLOCKED (be 24 val. išskyrimo),
  MODEL_NOT_FOUND (be `lockModel`), codex 429 paskyros perjungimo mechanizmas
  (be `markCodexScopeRateLimited`, be išsaugomo `rate_limited_until`, neišvalant
  seanso susiejimo), `persistCodexQuotaState` (neįrašant kvotos būsenos,
  neatšaukiant podėlio galiojimo), `recordKeyHealthStatus` (rakto būklės keitiklis
  neliečiamas)
- OAuth atnaujinimas — tiek aktyvusis atnaujinimas vykdytojo bazėje
  (`base.ts` `execute()`, nesunaudojant atnaujinimo prieigos rakto rotacijos), tiek
  reaktyvusis 401/403 kelias `chatCore` viduje (be `expired` deaktyvinimo)
- `chat.ts` — teikėjo grandinės pertraukiklio ir 5 minučių kvotos podėlio
  (`markAccountExhaustedFrom429`) būsena niekada nepabloginama

Įrašyta klaida leidžia pažymėtą paskyrą matyti valdymo skydelyje,
nors ji ir toliau aptarnauja srautą. Pastaba: patikros įraše saugomas **neapdorotas**
(nesutrumpintas) klaidos tekstas, kitaip nei tikrame kelyje, kuriame jis sutrumpinamas naudojant `slice(0,100)`.

Operatoriai, naudojantys visų modelių testavimą kaip priežiūros įrankį, gali atkurti ankstesnę
elgseną (patikros užklausa laikoma tikru generavimu) vienu iš šių būdų:

- nustatymu `probeCanDisable` (`POST /api/settings` su
  `{"probeCanDisable": true}` arba tiesiogiai redaguojant `key_value` duomenų bazėje), arba
- funkcijos žyma **`PROBE_CAN_DISABLE=true`** (aplinkos kintamasis arba DB perrašymas; turi viršenybę prieš
  nustatymą).

Apsauga nuo gedimų: jei žymos arba nustatymų paieška sukelia klaidą, izoliavimas lieka ĮJUNGTAS.

## Šaltinio failai

| Sritis                                          | Failas                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signalų lentelės + atitiktis                    | `open-sse/services/accountFallback.ts`                                                                        |
| Užbaigimas / išsaugojimas                       | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Automatinio išjungimo aprėptis                  | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Įterptinis klasifikavimas                       | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Galutinės būsenos atkūrimo išimtis              | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Pasirinktinių raktažodžių įkėlimas vykdymo metu | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Nustatymų naudotojo sąsaja                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
