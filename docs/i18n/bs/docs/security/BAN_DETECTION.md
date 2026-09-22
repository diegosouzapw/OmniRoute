# Account-Ban / Banned-Keyword Detection (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

# Zabrana naloga / Detekcija zabranjenih ključnih riječi

OmniRoute skenira odgovore o greškama uzvodnih provajdera (upstream) u potrazi za signalima koji ukazuju na to da je **nalog provajdera trajno mrtav** (suspendovan / deaktiviran / zabranjen zbog kršenja Uslova korišćenja) i, kada se podudari, prebacuje tu konekciju u **terminalno `banned` stanje** tako da se više ne bira za zahteve. Ovo je ono što konfiguriše kartica podešavanja **Security → Banned Keywords** ("Dodatne ključne riječi koje pokreću detekciju trajne zabrane naloga. Ugrađene ključne riječi se uvijek primjenjuju.").

Ova stranica dokumentuje ugrađenu listu, tok detekcije, njen obim, kako bezbjedno dodati prilagođene ključne riječi i kako oporaviti označenu konekciju. Samo terminalno stanje je dio modela otpornosti — pogledajte [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminalna stanja").

**Izvor istine:** `open-sse/services/accountFallback.ts` (`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Ugrađene ključne riječi

Ovih 8 podnizova se uvijek primjenjuje (ne razlikuju velika i mala slova), bez obzira na bilo koju prilagođenu listu:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud kod)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Ova lista se razvija kako provajderi mijenjaju tekst svojih zabrana. Mjerodavna kopija je `ACCOUNT_DEACTIVATED_SIGNALS` u `open-sse/services/accountFallback.ts`; tretirajte gornji blok kao snimak stanja.

Dvije susjedne, **odvojene** tabele signala nalaze se u istoj datoteci i _nisu_ dio detekcije zabranjenih ključnih riječi:

- `CREDITS_EXHAUSTED_SIGNALS` — naplata/kvota iscrpljena (`insufficient_quota`, `credit_balance_too_low`, `payment required`, …) → terminalno `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nije terminalno**; osvježavanje tokena može oporaviti stanje.

Napomena: uobičajene prolazne fraze kao što su **`rate limit`** / `429` se obrađuju putem putanje za ograničenje brzine (rate-limit) / hlađenje konekcije (connection-cooldown) i **nisu** signali zabrane.

## Tok detekcije

```
upstream error response
  → body stringified + lowercased
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [podudaranje podniza]
  → match?
      → connection testStatus = "banned"      (trajno — 1-godišnje hlađenje, nikada se ne oporavlja automatski)
      → if setting `autoDisableBannedAccounts` is on and `autoDisableBannedScope`
        includes this connection (`all`, or `subscription` for OAuth/cookie/session)
        → also isActive = false. Prepaid API keys stay active when scope is
        `subscription`.
      → connection is skipped during account selection (combo QUOTA_BLOCKING statuses)
```

- Podudaranje je pretraga **podniza bez razlikovanja velikih i malih slova** u **tijelu** odgovora (`isAccountDeactivated`, `accountFallback.ts`).
- Trajna terminalizacija `banned` se aktivira na tijelu sa signalom zabrane pri **bilo kom HTTP statusu** (putem `markAccountUnavailable` → `checkFallbackError`). Uža oznaka **`deactivated`** (`isActive=false` kada konekcija nema rezervnih API ključeva) se upisuje putem inline putanje `chatCore.ts` na **HTTP 401 / 403** (klasifikovano putem `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Napomena: putanja `markAccountUnavailable()` upisuje _drugačiji_ terminalni status — **`expired`** — za isti `ACCOUNT_DEACTIVATED` signal (putem `resolveTerminalConnectionStatus`), tako da se ista zabrana može pojaviti kao `deactivated` ili `expired` u zavisnosti od toga koja putanja je obradila odgovor. (Stariji komentar u kodu kaže "kada 401 tijelo sadrži ove nizove" — to umanjuje trenutno ponašanje.)
- `banned` konekcija je isključena iz odabira svuda gdje se terminalni statusi filtriraju (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Opseg — koji provajderi se skeniraju

**Svi provajderi.** Provjera se pokreće u generičkom cjevovodu za rukovanje greškama kroz koji prolazi svaki neuspjeli uzvodni zahtjev — ona **nije** ograničena na OAuth/subscription scrapere. Rezultirajuće terminalno stanje je po **konekciji**, a ne po provajderu.

Ipak, ugrađeni _stringovi_ su orijentisani ka subscription/OAuth provajderima sa stvarnim rizikom od zabrane (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity). Provajder sa API ključem će aktivirati detektor samo ako tijelo njegove greške doslovno sadrži jedan od podstringova.

`autoDisableBannedScope` (`all` | `subscription`, zadano `all`) kontroliše da li podudaranje takođe mijenja `isActive=false`. `subscription` znači mjesta u stilu prijave (plaćene pretplate i besplatni nalozi, uključujući web-cookie sesije). I dalje bilježi `testStatus=banned` za prepaid API ključeve, ali ih ostavlja u routing pool-u. Trajni dizajn je nadjačavanje po provajderu i po nalogu; globalni enum je prvi korak.

## Prilagođene zabranjene ključne riječi

Dodajte ili uklonite ključne riječi u **Security → Banned Keywords** (sačuvano kao globalna `customBannedSignals` postavka putem `PATCH /api/settings`). One se **dodaju** na ugrađenu listu — nikada kao zamjena — i hot-reloaduju se prilikom čuvanja (i pri pokretanju) putem `setCustomBannedSignals()`. Svaka ključna riječ je ograničena na 200 karaktera; ne postoji ograničenje dužine niza.

**⚠ Rizik od lažno pozitivnih rezultata — odaberite specifične fraze.** Detekcija je sirovo podudaranje podstringa na cijelom tijelu odgovora, a podudaranje je **trajno** (1-godišnji cooldown, ručni oporavak). Široka ključna riječ može zabraniti savršeno zdravu konekciju:

- **Loše:** `quota`, `limit`, `error`, `denied` — pojavljuju se u mnogim prolaznim greškama.
- **Dobro:** pune rečenice o zabrani, npr. `your account has been suspended for`, `account permanently banned`, `violation of our terms`.

Preferirajte najdužu nedvosmislenu frazu koju provajder vraća pri stvarnoj zabrani. Kada ste u nedoumici, prvo pratite `lastError` konekcije, a zatim dodajte tačnu formulaciju.

## Oporavak označene konekcije

Terminalna `banned` / `deactivated` stanja se **nikada ne oporavljaju automatski** (isključena su iz proaktivnog tick-a za oporavak — samo se `unavailable` cooldown-ovi oporavljaju sami). Operator ih mora eksplicitno očistiti:

1. **Ponovo testirajte konekciju** — dashboard **Test** akcija (`POST /api/providers/{id}/test`); uspješna provjera resetuje `testStatus` na `active` i briše polja greške.
2. **Ponovo se autentifikujte / uredite akreditive** — za OAuth provajdere, ponovo pokrenite tok prijave / osvježavanja; rute za kreiranje/uvoz provajdera postavljaju `isActive = true`.
3. **Ponovo omogućite konekciju** — ako je auto-disable postavio `isActive = false` (opseg `all`, ili `subscription` za OAuth/cookie/session konekciju), uključite je ponovo nakon popravke naloga.

Ne postoji posebno dugme "ukloni oznaku zabrane" — oporavak je ponovno testiranje, ponovna autentifikacija ili ponovno omogućavanje, što odgovara opštem pravilu terminalnog stanja u [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolacija probe (model test-all)

**Neuspjeh porijeklom iz probe** (model test-all / dispečiranje provjere ispravnosti izvršeno unutar `runAsProbe`) nikada ne uklanja konekciju iz pool-a (#9817): on je **zabilježen radi vidljivosti** (`last_error`, `last_error_type`, `error_code`, `last_error_at`), ali preskače **svaku** mutaciju rutiranja — periode hlađenja, terminalni status (`banned` / `deactivated` / `credits_exhausted`), zaključavanja po modelu, circuit breaker provajdera, 5-minutni keš kvote, osvježavanje OAuth tokena i automatsko onemogućavanje. Samo neuspjeh na stvarnoj putanji zahtjeva deaktivira. Zabilježena greška je ono što čini označeni nalog vidljivim na kontrolnoj tabli dok on nastavlja opsluživati saobraćaj.

Jedina tačka odlučivanja je `shouldIsolateProbeFailures()` (`src/shared/utils/probeOrigin.ts`), koju konsultuje **svako** mjesto koje bi moglo mutirati stanje rutiranja uslijed neuspjeha porijeklom iz probe:

- `markAccountUnavailable` (`auth.ts`) — samo zapisivanje (`lastError` sirovi tekst, `lastErrorType`, `errorCode`, `lastErrorAt`; namjerno **bez** `backoffLevel`, što bi pokrenulo automatsko opadanje u vrijeme odabira i obrisalo zapis)
- `maybeAutoDisableBannedAccount` — bez automatskog onemogućavanja
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (samo zapisivanje, bez terminalnog `credits_exhausted`), GEO_BLOCKED (bez 24-satnog isključenja), MODEL_NOT_FOUND (bez `lockModel`), failover rotacije naloga za codex 429 (bez `markCodexScopeRateLimited`, bez trajnog `rate_limited_until`, bez brisanja afiniteta sesije), `persistCodexQuotaState` (bez upisa stanja kvote, bez invalidacije keša), `recordKeyHealthStatus` (rotator zdravlja ključa netaknut)
- OAuth osvježavanje — i proaktivno osvježavanje u bazi izvršioca (`base.ts` `execute()`, bez potrošnje rotacije refresh-tokena) i reaktivna 401/403 putanja u `chatCore` (bez `expired` deaktivacije)
- `chat.ts` — circuit breaker provajdera i 5-minutni keš kvote (`markAccountExhaustedFrom429`) nikada nisu degradirani

Zabilježena greška je ono što čini označeni nalog vidljivim na kontrolnoj tabli dok on nastavlja opsluživati saobraćaj. Napomena: zapis probe pohranjuje **sirovi** (nesječeni) tekst greške, za razliku od `slice(0,100)` skraćivanja na stvarnoj putanji.

Operateri koji koriste test-all kao alat za održavanje mogu vratiti historijsko ponašanje (probe se računa kao stvarna generacija) putem:

- postavke `probeCanDisable` (`POST /api/settings` sa `{"probeCanDisable": true}`, ili direktna izmjena `key_value` u bazi podataka), ili
- feature flag-a **`PROBE_CAN_DISABLE=true`** (env ili DB override; ima prednost nad postavkom).

Fail-safe: ako flag ili pretraga postavki baci izuzetak, izolacija ostaje UKLJUČENA.

## Izvorne datoteke

| Oblast                                          | Datoteka                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabele signala + podudaranje                    | `open-sse/services/accountFallback.ts`                                                                        |
| Terminalizacija / trajnost                      | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Opseg automatskog onemogućavanja                | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Inline klasifikacija                            | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Izuzetak oporavka terminalnog stanja            | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Runtime učitavanje prilagođenih ključnih riječi | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI postavki                                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
