# Account-Ban / Banned-Keyword Detection (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute otsib ülesvoolu veavastustest signaale, mis viitavad sellele, et teenusepakkuja
**konto on jäädavalt kasutuskõlbmatu** (peatatud / inaktiveeritud / kasutustingimuste rikkumise tõttu blokeeritud), ning vaste
leidmisel viib selle ühenduse **terminaalsesse olekusse `banned`**, mistõttu seda
ei valita enam päringute jaoks. Seda seadistatakse kaardil **Security → Banned Keywords**
(„Täiendavad märksõnad, mis käivitavad konto jäädava blokeerimise tuvastamise.
Sisseehitatud märksõnad kehtivad alati.“).

Sellel lehel kirjeldatakse sisseehitatud loendit, tuvastusvoogu, selle ulatust,
kohandatud märksõnade turvalist lisamist ja märgistatud ühenduse taastamist. Terminaalne
olek ise on osa vastupidavusmudelist — vt
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Terminaalsed olekud“).

**Tõeallikas:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Sisseehitatud märksõnad

Need 8 alamstringi kehtivad alati (tõstutundetult), olenemata kohandatud loendist:

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

> See loend muutub sedamööda, kuidas teenusepakkujad oma blokeerimiste sõnastust muudavad. Autoriteetne
> koopia on `ACCOUNT_DEACTIVATED_SIGNALS` failis `open-sse/services/accountFallback.ts`;
> käsitlege ülaltoodud plokki hetkeseisuna.

Samas failis asuvad kaks kõrvutist, **eraldi** signaalitabelit, mis _ei kuulu_
blokeeritud märksõnade tuvastuse hulka:

- `CREDITS_EXHAUSTED_SIGNALS` — arvelduslimiit/kvoot on ammendatud (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminaalne `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **mitteterminaalne**; loa värskendamine võib ühenduse taastada.

Märkus: levinud ajutisi fraase, nagu **`rate limit`** / `429`, käsitleb
päringulimiidi / ühenduse jahtumisaja mehhanism ning need **ei ole** blokeerimissignaalid.

## Tuvastusvoog

```
ülesvoolu veavastus
  → keha teisendatakse stringiks + väiketähtedeks
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [alamstringi vaste]
  → vaste?
      → ühenduse testStatus = "banned"      (jäädav — 1-aastane jahtumisaeg, ei taastu kunagi automaatselt)
      → kui seadistus `autoDisableBannedAccounts` on sisse lülitatud ja `autoDisableBannedScope`
        hõlmab seda ühendust (`all` või `subscription` OAuthi/küpsise/seansi korral)
        → määratakse ka isActive = false. Ettemakstud API-võtmed jäävad aktiivseks, kui ulatus on
        `subscription`.
      → ühendus jäetakse konto valimisel vahele (kombineeritud QUOTA_BLOCKING olekud)
```

- Vaste tuvastatakse **tõstutundetu alamstringi** otsinguga vastuse **kehast**
  (`isAccountDeactivated`, `accountFallback.ts`).
- Jääv terminaalsesse olekusse `banned` viimine käivitub blokeerimissignaali sisaldava keha korral **mis tahes
  HTTP-olekukoodiga** (`markAccountUnavailable` → `checkFallbackError` kaudu). Kitsam
  silt **`deactivated`** (`isActive=false`, kui ühendusel pole
  API-lisavõtmeid) kirjutatakse `chatCore.ts` tekstisisese voo kaudu **HTTP 401 / 403**
  korral (klassifitseerimine: `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Pange tähele, et
  `markAccountUnavailable()` voog kirjutab sama `ACCOUNT_DEACTIVATED` signaali puhul
  _teistsuguse_ terminaalse oleku — **`expired`** —
  (`resolveTerminalConnectionStatus` kaudu), mistõttu sama blokeering võib avalduda kas
  olekuna `deactivated` või `expired`, olenevalt sellest, milline voog vastust töötles. (Vanem
  koodikommentaar ütleb „kui 401 vastuse keha sisaldab neid stringe“ — see
  kirjeldab praegust käitumist liiga kitsalt.)
- Ühendus olekuga `banned` jäetakse valikust välja kõikjal, kus terminaalseid olekuid
  filtreeritakse (`isTerminalConnectionStatus`, kombineeritud `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Ulatus — milliseid pakkujaid kontrollitakse

**Kõiki pakkujaid.** Kontroll käivitatakse üldises veatöötluskonveieris, mida
läbivad kõik nurjunud päringud ülesvoolu teenustele — see **ei ole** piiratud
OAuthi/tellimuste kraapijatega. Tulemuseks olev lõppolek kehtib iga **ühenduse**,
mitte iga pakkuja kohta.

Samas on sisseehitatud _stringid_ suunatud tellimuse-/OAuth-pakkujatele, kelle
puhul on tegelik blokeerimisoht (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). API-võtme pakkuja käivitab tuvastaja ainult siis, kui tema veakeha
sisaldab sõna-sõnalt üht alamstringidest.

`autoDisableBannedScope` (`all` | `subscription`, vaikimisi `all`) määrab, kas
vaste korral seatakse ka `isActive=false`. `subscription` tähendab
sisselogimispõhiseid kasutajakohti (tasulised tellimused ja tasuta kontod,
sealhulgas veebiküpsistega seansid). Ettemakstud API-võtmete puhul salvestatakse
endiselt `testStatus=banned`, kuid need jäetakse marsruutimiskogumisse. Püsiv
lahendus on pakkuja- ja kontopõhine ülekirjutus; globaalne enum on esimene
versioon.

## Kohandatud blokeerimise märksõnad

Lisage või eemaldage märksõnu jaotises **Turvalisus → Blokeerimise märksõnad**
(salvestatakse globaalse sättena `customBannedSignals` päringu
`PATCH /api/settings` kaudu). Need **lisatakse** sisseehitatud loendile ega
asenda seda kunagi ning laaditakse salvestamisel (ja käivitamisel) dünaamiliselt
uuesti funktsiooni `setCustomBannedSignals()` kaudu. Iga märksõna pikkus on
piiratud 200 märgiga; massiivi pikkusele piirangut ei ole.

**⚠ Valepositiivsete vastete oht — valige konkreetsed fraasid.** Tuvastamine
põhineb töötlemata alamstringi vastel kogu vastusekehas ja vaste on **püsiv**
(1-aastane jahtumisperiood, käsitsi taastamine). Liiga üldine märksõna võib
blokeerida täiesti töökorras ühenduse:

- **Halb:** `quota`, `limit`, `error`, `denied` — esinevad paljudes ajutistes vigades.
- **Hea:** täielikud blokeerimisteated, nt `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Eelistage pikimat üheselt mõistetavat fraasi, mille pakkuja tegeliku blokeeringu
korral tagastab. Kahtluse korral jälgige esmalt ühenduse välja `lastError` ja
lisage seejärel täpne sõnastus.

## Märgistatud ühenduse taastamine

Lõppolekutest `banned` / `deactivated` **ei taastuta kunagi automaatselt** (need
jäetakse ennetava taastamise tsüklist välja — iseseisvalt taastuvad ainult
oleku `unavailable` jahtumisperioodid). Operaator peab need selgesõnaliselt
tühistama:

1. **Testige ühendust uuesti** — juhtpaneeli toiming **Testi**
   (`POST /api/providers/{id}/test`); edukas kontroll lähtestab välja
   `testStatus` väärtusele `active` ja tühjendab veaväljad.
2. **Autentige uuesti / muutke pääsuandmeid** — OAuth-pakkujate puhul käivitage
   sisselogimis-/värskendusvoog uuesti; pakkuja loomise/impordi marsruudid
   seavad `isActive = true`.
3. **Lubage ühendus uuesti** — kui automaatne keelamine seadis
   `isActive = false` (ulatus `all` või `subscription` OAuthi-/küpsise-/
   seansiühenduse puhul), lülitage see pärast konto parandamist uuesti sisse.

Eraldi nuppu „tühista blokeerimismärge” ei ole — taastamine toimub uuesti
testimise, autentimise või lubamise kaudu, järgides üldist lõppolekute reeglit
dokumendis [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Kontrollpäringute isoleerimine (kõigi mudelite testimine)

**Kontrollpäringust pärinev tõrge** (mudelite kõigi testimine /
seisundikontrolli väljasaatmised, mis käivitatakse `runAsProbe` sees) ei eemalda
ühendust kunagi kogumist (#9817): see **salvestatakse nähtavuse tagamiseks**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), kuid jätab
vahele **kõik** marsruutimise muudatused — jahtumisperioodid, lõppolekud
(`banned` / `deactivated` / `credits_exhausted`), mudelipõhised lukustused,
pakkuja kaitselüliti, 5-minutilise kvoodivahemälu, OAuthi loa värskendamise ja
automaatse keelamise. Ühenduse inaktiveerib ainult tegeliku päringutee tõrge.
Salvestatud viga muudab märgistatud konto juhtpaneelil nähtavaks, samal ajal kui
see jätkab liikluse teenindamist.

Ainus otsustuskoht on `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), mida kasutavad **kõik** kohad, mis võiksid
kontrollpäringust pärineva tõrke tõttu marsruutimise olekut muuta:

- `markAccountUnavailable` (`auth.ts`) — ainult salvestamine (`lastError`
  töötlemata tekstina, `lastErrorType`, `errorCode`, `lastErrorAt`; teadlikult
  **ilma** väljata `backoffLevel`, mis käivitaks valimisaegse automaatse
  hääbumise ja kustutaks kirje)
- `maybeAutoDisableBannedAccount` — automaatset keelamist ei toimu
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (ainult
  salvestamine, lõppolekut `credits_exhausted` ei määrata), GEO_BLOCKED
  (24-tunnist välistamist ei toimu), MODEL_NOT_FOUND (`lockModel` ei kutsuta),
  codexi 429 konto rotatsiooni tõrkesiire (`markCodexScopeRateLimited` ei
  kutsuta, püsivat `rate_limited_until` väärtust ei määrata, seansisidusust ei
  tühjendata), `persistCodexQuotaState` (kvoodiolekut ei kirjutata,
  vahemälu ei kehtetustata), `recordKeyHealthStatus` (võtme seisundi rotaator
  jääb puutumata)
- OAuthi värskendamine — nii ennetav värskendamine täituri baasklassis
  (`base.ts` `execute()`, värskendusloa rotatsiooni ei kulutata) kui ka
  reaktiivne 401/403 tee moodulis `chatCore` (olekuga `expired` inaktiveerimist
  ei toimu)
- `chat.ts` — pakkuja kaitselülitit ega 5-minutilist kvoodivahemälu
  (`markAccountExhaustedFrom429`) ei halvendata kunagi

Salvestatud viga muudab märgistatud konto juhtpaneelil nähtavaks, samal ajal kui
see jätkab liikluse teenindamist. Märkus: kontrollpäringu kirje talletab
**töötlemata** (lühendamata) veateksti, erinevalt tegeliku tee
`slice(0,100)` kärpimisest.

Operaatorid, kes kasutavad kõigi testimist hooldustööriistana, saavad taastada
ajaloolise käitumise (kontrollpäringut käsitletakse tegeliku genereerimisena)
ühel järgmistest viisidest:

- säte `probeCanDisable` (`POST /api/settings` kehaga
  `{"probeCanDisable": true}` või otse `key_value` andmebaasikirjet muutes) või
- funktsioonilipp **`PROBE_CAN_DISABLE=true`** (keskkonna- või andmebaasi
  ülekirjutus; sellel on sätte ees prioriteet).

Tõrkekindlus: kui lipu või sätte otsing tekitab erandi, jääb isoleerimine SISSE.

## Lähtefailid

| Valdkond                                    | Fail                                                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Signaalitabelid + vaste                     | `open-sse/services/accountFallback.ts`                                                                        |
| Lõpetamine / püsimällu salvestamine         | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Automaatse keelamise ulatus                 | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Tekstisisene klassifitseerimine             | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Lõppolekust taastamise välistamine          | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Kohandatud märksõnade käitusaegne laadimine | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Seadete kasutajaliides                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
