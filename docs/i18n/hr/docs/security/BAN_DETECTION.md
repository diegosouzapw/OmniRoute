# Account-Ban / Banned-Keyword Detection (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute pretražuje odgovore o pogreškama uzvodnih pružatelja radi signala koji upućuju na to da je **račun pružatelja trajno neaktivan** (suspendiran / deaktiviran / zabranjen zbog kršenja Uvjeta pružanja usluge) i, kada pronađe podudaranje, premješta tu vezu u **terminalno stanje `banned`** kako se više ne bi odabirala za zahtjeve. To se konfigurira na kartici postavki **Sigurnost → Zabranjene ključne riječi** ("Dodatne ključne riječi koje pokreću otkrivanje trajne zabrane računa. Ugrađene ključne riječi uvijek se primjenjuju.").

Ova stranica dokumentira ugrađeni popis, tijek otkrivanja, njegov opseg, sigurno dodavanje prilagođenih ključnih riječi i način oporavka označene veze. Samo terminalno stanje dio je modela otpornosti — pogledajte
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Terminalna stanja").

**Izvor istine:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Ugrađene ključne riječi

Ovih 8 podnizova uvijek se primjenjuje (bez obzira na velika i mala slova), neovisno o bilo kojem prilagođenom popisu:

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

> Ovaj se popis razvija kako pružatelji mijenjaju formulacije svojih zabrana. Mjerodavna
> kopija je `ACCOUNT_DEACTIVATED_SIGNALS` u `open-sse/services/accountFallback.ts`;
> blok iznad smatrajte snimkom trenutačnog stanja.

Dvije susjedne, **odvojene** tablice signala nalaze se u istoj datoteci i _nisu_ dio otkrivanja zabranjenih ključnih riječi:

- `CREDITS_EXHAUSTED_SIGNALS` — potrošena sredstva/kvota (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminalno stanje `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nije terminalno**; osvježavanje tokena može omogućiti oporavak.

Napomena: uobičajene prolazne fraze poput **`rate limit`** / `429` obrađuju se putem mehanizma ograničenja brzine / razdoblja čekanja veze i **nisu** signali zabrane.

## Tijek otkrivanja

```
odgovor o pogrešci uzvodnog pružatelja
  → tijelo pretvoreno u niz znakova + pretvoreno u mala slova
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [podudaranje podniza]
  → podudaranje?
      → testStatus veze = "banned"      (trajno — razdoblje čekanja od 1 godine, bez automatskog oporavka)
      → ako je postavka `autoDisableBannedAccounts` uključena i `autoDisableBannedScope`
        obuhvaća ovu vezu (`all` ili `subscription` za OAuth/kolačić/sesiju)
        → također isActive = false. Unaprijed plaćeni API ključevi ostaju aktivni kada je opseg
        `subscription`.
      → veza se preskače tijekom odabira računa (kombinirani statusi QUOTA_BLOCKING)
```

- Podudaranje je pretraživanje **podniza bez obzira na velika i mala slova** u **tijelu** odgovora
  (`isAccountDeactivated`, `accountFallback.ts`).
- Trajno postavljanje stanja `banned` pokreće se kada tijelo sadrži signal zabrane pri **bilo kojem
  HTTP statusu** (putem `markAccountUnavailable` → `checkFallbackError`). Uža
  oznaka **`deactivated`** (`isActive=false` kada veza nema rezervnih API ključeva)
  zapisuje se putem ugrađenog puta `chatCore.ts` za **HTTP 401 / 403**
  (klasificirano putem `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Imajte na umu da
  put `markAccountUnavailable()` zapisuje _drugačiji_ terminalni status —
  **`expired`** — za isti signal `ACCOUNT_DEACTIVATED` (putem
  `resolveTerminalConnectionStatus`), pa se ista zabrana može prikazati kao
  `deactivated` ili `expired`, ovisno o tome koji je put obradio odgovor. (Stariji
  komentar u kodu navodi "kada tijelo odgovora 401 sadrži ove nizove" — što
  ne opisuje u potpunosti trenutačno ponašanje.)
- Veza sa statusom `banned` isključena je iz odabira svugdje gdje se filtriraju terminalni statusi
  (`isTerminalConnectionStatus`, kombinirani `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Opseg — koji se pružatelji skeniraju

**Svi pružatelji.** Provjera se izvodi u generičkom toku obrade pogrešaka kroz
koji prolazi svaki neuspjeli zahtjev prema vanjskom servisu — **nije** ograničena
na OAuth/pretplatničke scrapere. Rezultirajuće terminalno stanje odnosi se na
pojedinu **vezu**, a ne na pružatelja.

Ipak, ugrađeni su _nizovi_ usmjereni na pretplatničke/OAuth pružatelje kod kojih
postoji stvaran rizik od zabrane (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Pružatelj koji koristi API ključ aktivirat će detektor samo ako tijelo
njegove pogreške doslovno sadrži jedan od podnizova.

`autoDisableBannedScope` (`all` | `subscription`, zadano `all`) određuje hoće li
podudaranje također postaviti `isActive=false`. `subscription` označava korisnička
mjesta s prijavom (plaćene pretplate i besplatni računi, uključujući sesije s web
kolačićima). Za unaprijed plaćene API ključeve i dalje bilježi `testStatus=banned`,
ali ih ostavlja u skupu za usmjeravanje. Dugoročno rješenje jest nadjačavanje po
pružatelju i računu; globalna enumeracija početna je implementacija.

## Prilagođene ključne riječi za zabranu

Dodajte ili uklonite ključne riječi u odjeljku **Sigurnost → Ključne riječi za zabranu**
(pohranjuju se kao globalna postavka `customBannedSignals` putem
`PATCH /api/settings`). One se **dodaju** ugrađenom popisu — nikada ga ne
zamjenjuju — i ponovno se učitavaju bez ponovnog pokretanja nakon spremanja
(i pri pokretanju) putem `setCustomBannedSignals()`. Svaka ključna riječ ograničena
je na 200 znakova; nema ograničenja duljine polja.

**⚠ Rizik od lažno pozitivnih rezultata — birajte specifične izraze.** Detekcija
se temelji na neobrađenom podudaranju podniza u cijelom tijelu odgovora, a
podudaranje je **trajno** (razdoblje čekanja od 1 godine, ručni oporavak).
Preopćenita ključna riječ može zabraniti potpuno ispravnu vezu:

- **Loše:** `quota`, `limit`, `error`, `denied` — pojavljuju se u mnogim
  prolaznim pogreškama.
- **Dobro:** pune rečenice o zabrani, npr. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Odaberite najdulji nedvosmislen izraz koji pružatelj vraća pri stvarnoj zabrani.
Ako niste sigurni, najprije pratite `lastError` veze, a zatim dodajte točan tekst.

## Oporavak označene veze

Terminalna stanja `banned` / `deactivated` **nikada se ne oporavljaju automatski**
(isključena su iz ciklusa proaktivnog oporavka — samo se razdoblja čekanja za
`unavailable` oporavljaju sama). Operator ih mora izričito ukloniti:

1. **Ponovno testirajte vezu** — radnja **Test** na nadzornoj ploči
   (`POST /api/providers/{id}/test`); uspješna provjera vraća `testStatus` na
   `active` i briše polja pogreške.
2. **Ponovno se autentificirajte / uredite vjerodajnice** — za OAuth pružatelje
   ponovno pokrenite tok prijave / osvježavanja; rute za stvaranje/uvoz
   pružatelja postavljaju `isActive = true`.
3. **Ponovno omogućite vezu** — ako je automatsko onemogućavanje postavilo
   `isActive = false` (opseg `all` ili `subscription` za OAuth/kolačić/sesijsku
   vezu), ponovno je uključite nakon ispravljanja računa.

Ne postoji zaseban gumb „ukloni oznaku zabrane” — oporavak se obavlja ponovnim
testiranjem, ponovnom autentifikacijom ili ponovnim omogućavanjem, u skladu s
općim pravilom terminalnog stanja u dokumentu
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolacija provjere (testiranje svih modela)

**Neuspjeh nastao u provjeri** (testiranje svih modela / slanja provjere stanja
izvršena unutar `runAsProbe`) nikada ne uklanja vezu iz skupa (#9817): on se
**bilježi radi vidljivosti** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), ali preskače **svaku** promjenu usmjeravanja — razdoblja čekanja,
terminalno stanje (`banned` / `deactivated` / `credits_exhausted`), zaključavanja
po modelu, prekidač strujnog kruga pružatelja, 5-minutnu predmemoriju kvote,
osvježavanje OAuth tokena i automatsko onemogućavanje. Deaktivira se samo nakon
neuspjeha na putu stvarnog zahtjeva. Zabilježena pogreška čini označeni račun
vidljivim na nadzornoj ploči dok on nastavlja posluživati promet.

Jedinstvena točka odlučivanja jest `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), koju provjerava **svako** mjesto koje bi
moglo promijeniti stanje usmjeravanja zbog neuspjeha nastalog u provjeri:

- `markAccountUnavailable` (`auth.ts`) — samo bilježenje (`lastError` kao
  neobrađeni tekst, `lastErrorType`, `errorCode`, `lastErrorAt`; namjerno
  **bez** `backoffLevel`, koji bi pokrenuo automatsko smanjivanje tijekom
  odabira i izbrisao zapis)
- `maybeAutoDisableBannedAccount` — bez automatskog onemogućavanja
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (samo bilježenje,
  bez terminalnog stanja `credits_exhausted`), GEO_BLOCKED (bez isključivanja
  na 24 sata), MODEL_NOT_FOUND (bez `lockModel`), prebacivanje na drugi račun
  za codex 429 (bez `markCodexScopeRateLimited`, bez trajno pohranjenog
  `rate_limited_until`, bez brisanja afiniteta sesije), `persistCodexQuotaState`
  (bez zapisivanja stanja kvote, bez poništavanja predmemorije),
  `recordKeyHealthStatus` (rotator stanja ključeva ostaje netaknut)
- Osvježavanje OAuth-a — i proaktivno osvježavanje u osnovi izvršitelja
  (`base.ts` `execute()`, bez utrošene rotacije tokena za osvježavanje) i
  reaktivna putanja 401/403 u `chatCore` (bez deaktivacije `expired`)
- `chat.ts` — prekidač strujnog kruga pružatelja i 5-minutna predmemorija kvote
  (`markAccountExhaustedFrom429`) nikada se ne degradiraju

Zabilježena pogreška čini označeni račun vidljivim na nadzornoj ploči dok on
nastavlja posluživati promet. Napomena: zapis provjere pohranjuje **neobrađeni**
(neodrezani) tekst pogreške, za razliku od skraćivanja na stvarnoj putanji putem
`slice(0,100)`.

Operatori koji testiranje svih modela koriste kao alat za održavanje mogu vratiti
prijašnje ponašanje (provjera se računa kao stvarno generiranje) na jedan od
sljedećih načina:

- postavkom `probeCanDisable` (`POST /api/settings` s
  `{"probeCanDisable": true}` ili izravnim uređivanjem baze podataka `key_value`), ili
- zastavicom značajke **`PROBE_CAN_DISABLE=true`** (nadjačavanje putem okruženja ili
  baze podataka; ima prednost pred postavkom).

Sigurnosno ponašanje: ako dohvaćanje zastavice ili postavki izazove pogrešku,
izolacija ostaje UKLJUČENA.

## Izvorne datoteke

| Područje                                                  | Datoteka                                                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tablice signala + podudaranje                             | `open-sse/services/accountFallback.ts`                                                                        |
| Terminalizacija / trajna pohrana                          | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Opseg automatskog onemogućavanja                          | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Ugrađena klasifikacija                                    | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Isključivanje oporavka terminalnog stanja                 | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Učitavanje prilagođenih ključnih riječi tijekom izvođenja | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Korisničko sučelje postavki                               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
