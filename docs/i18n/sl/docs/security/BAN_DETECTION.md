# Account-Ban / Banned-Keyword Detection (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute pregleduje odzive napak nadrejenih ponudnikov in išče znake, ki kažejo, da je **račun ponudnika trajno neuporaben** (začasno onemogočen / deaktiviran / blokiran zaradi kršitve pogojev uporabe), ter ob ujemanju premakne to povezavo v **končno stanje `banned`**, tako da ni več izbrana za zahteve. To nastavlja kartica z nastavitvami **Security → Banned Keywords** (»Dodatne ključne besede, ki sprožijo zaznavanje trajne blokade računa. Vgrajene ključne besede se vedno upoštevajo.«).

Ta stran dokumentira vgrajeni seznam, potek zaznavanja, njegov obseg, varno dodajanje ključnih besed po meri in obnovitev označene povezave. Končno stanje je del modela odpornosti — glejte
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) (»Končna stanja«).

**Avtoritativni vir:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Vgrajene ključne besede

Teh 8 podnizov se vedno upošteva (ne glede na velikost črk), neodvisno od morebitnega seznama po meri:

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

> Ta seznam se spreminja, ko ponudniki spreminjajo besedilo obvestil o blokadi. Avtoritativna
> kopija je `ACCOUNT_DEACTIVATED_SIGNALS` v `open-sse/services/accountFallback.ts`;
> zgornji blok obravnavajte kot posnetek trenutnega stanja.

V isti datoteki sta dve sosednji, **ločeni** tabeli signalov, ki _nista_ del zaznavanja ključnih besed za blokado:

- `CREDITS_EXHAUSTED_SIGNALS` — izčrpana sredstva/kvota (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → končno stanje `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ni končno stanje**; stanje je mogoče obnoviti z osvežitvijo žetona.

Opomba: pogoste prehodne besedne zveze, kot sta **`rate limit`** / `429`, obravnava pot omejevanja hitrosti / ohlajanja povezave in **niso** signali blokade.

## Potek zaznavanja

```
odziv napake nadrejenega ponudnika
  → telo pretvorjeno v niz + pretvorjeno v male črke
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [ujemanje podniza]
  → ujemanje?
      → testStatus povezave = "banned"      (trajno — 1-letno ohlajanje, brez samodejne obnovitve)
      → če je nastavitev `autoDisableBannedAccounts` vklopljena in `autoDisableBannedScope`
        vključuje to povezavo (`all` ali `subscription` za OAuth/piškotek/sejo)
        → tudi isActive = false. Predplačniški ključi API ostanejo aktivni, ko je obseg
        `subscription`.
      → povezava se med izbiro računa preskoči (kombinirana stanja QUOTA_BLOCKING)
```

- Ujemanje je iskanje **podniza brez razlikovanja med velikimi in malimi črkami** v **telesu** odziva
  (`isAccountDeactivated`, `accountFallback.ts`).
- Trajna nastavitev stanja `banned` se ob telesu s signalom blokade sproži pri **kateri koli
  kodi stanja HTTP** (prek `markAccountUnavailable` → `checkFallbackError`). Ožja oznaka
  **`deactivated`** (`isActive=false`, ko povezava nima rezervnih ključev API) se zapiše prek neposredne poti `chatCore.ts` pri **HTTP 401 / 403**
  (razvrščeno prek `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Upoštevajte, da
  pot `markAccountUnavailable()` za isti signal `ACCOUNT_DEACTIVATED` zapiše _drugačno_ končno stanje —
  **`expired`** — (prek `resolveTerminalConnectionStatus`), zato se lahko ista blokada prikaže kot
  `deactivated` ali `expired`, odvisno od tega, katera pot je obravnavala odziv. (Starejši
  komentar v kodi pravi »ko telo odziva 401 vsebuje te nize« — to ne zajema celotnega trenutnega vedenja.)
- Povezava s stanjem `banned` je izključena iz izbire povsod, kjer se filtrirajo končna stanja
  (`isTerminalConnectionStatus`, kombinirani `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Obseg — kateri ponudniki se pregledujejo

**Vsi ponudniki.** Preverjanje se izvaja v splošnem cevovodu za obravnavo napak,
skozi katerega gredo vse neuspešne zahteve do ponudnikov v zaledju — **ni** omejeno
na zbiralnike OAuth/naročnin. Končno stanje velja za posamezno **povezavo**,
ne za posameznega ponudnika.

Kljub temu so vgrajeni _nizi_ usmerjeni v ponudnike naročnin/OAuth z dejanskim
tveganjem blokade (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Ponudnik s ključem API bo sprožil zaznavanje samo, če telo njegove
napake dobesedno vsebuje enega od podnizov.

`autoDisableBannedScope` (`all` | `subscription`, privzeto `all`) določa, ali
ujemanje nastavi tudi `isActive=false`. `subscription` pomeni uporabniška mesta
s prijavo (plačljive naročnine in brezplačni računi, vključno s sejami prek
spletnih piškotkov). Za predplačniške ključe API še vedno zabeleži
`testStatus=banned`, vendar jih pusti v usmerjevalnem naboru. Trajna zasnova
predvideva preglasitev za posameznega ponudnika in posamezen račun; globalna
naštevna vrednost je prva izvedba.

## Ključne besede za blokade po meri

Ključne besede dodajte ali odstranite v razdelku **Security → Banned Keywords**
(shranjene kot globalna nastavitev `customBannedSignals` prek
`PATCH /api/settings`). Ključne besede se **dodajo** vgrajenemu seznamu — nikoli
ga ne nadomestijo — in se ob shranjevanju (ter ob zagonu) sproti ponovno naložijo
prek `setCustomBannedSignals()`. Vsaka ključna beseda je omejena na 200 znakov;
dolžina polja ni omejena.

**⚠ Nevarnost lažno pozitivnih zaznav — izberite natančne besedne zveze.**
Zaznavanje temelji na surovem ujemanju podniza v celotnem telesu odgovora,
ujemanje pa je **trajno** (1-letno obdobje mirovanja, ročna obnovitev). Preširoka
ključna beseda lahko blokira povsem delujočo povezavo:

- **Slabo:** `quota`, `limit`, `error`, `denied` — pojavljajo se v številnih
  prehodnih napakah.
- **Dobro:** celotni stavki o blokadi, npr. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Izberite najdaljšo nedvoumno besedno zvezo, ki jo ponudnik vrne ob dejanski
blokadi. Če ste v dvomih, najprej spremljajte `lastError` povezave in nato dodajte
točno uporabljeno besedilo.

## Obnovitev označene povezave

Končni stanji `banned` / `deactivated` se **nikoli ne obnovita samodejno**
(izključeni sta iz proaktivnega cikla obnovitve — samodejno se obnovijo samo
obdobja mirovanja `unavailable`). Upravljavec ju mora izrecno ponastaviti:

1. **Ponovno preizkusite povezavo** — dejanje **Test** na nadzorni plošči
   (`POST /api/providers/{id}/test`); uspešno preverjanje ponastavi `testStatus`
   na `active` in počisti polja z napakami.
2. **Ponovno opravite preverjanje pristnosti / uredite poverilnice** — pri
   ponudnikih OAuth znova izvedite prijavo oziroma postopek osvežitve; poti za
   ustvarjanje/uvoz ponudnika nastavijo `isActive = true`.
3. **Znova omogočite povezavo** — če je samodejno onemogočanje nastavilo
   `isActive = false` (obseg `all` oziroma `subscription` za povezavo
   OAuth/piškotek/seja), jo po odpravi težave z računom znova vklopite.

Ločenega gumba »počisti oznako blokade« ni — obnovitev se izvede s ponovnim
preizkusom, ponovnim preverjanjem pristnosti ali ponovnim omogočanjem, skladno
s splošnim pravilom za končna stanja v dokumentu
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolacija preizkusov (preizkus vseh modelov)

**Napaka, ki izvira iz preizkusa** (pošiljanja za preizkus vseh modelov /
preverjanje stanja, izvedena znotraj `runAsProbe`), nikoli ne odstrani povezave
iz nabora (#9817): napaka se **zabeleži zaradi vidnosti** (`last_error`,
`last_error_type`, `error_code`, `last_error_at`), vendar se preskočijo
**vse** spremembe usmerjanja — obdobja mirovanja, končno stanje (`banned` /
`deactivated` / `credits_exhausted`), zaklepi posameznih modelov, odklopnik
ponudnika, 5-minutni predpomnilnik kvote, osvežitev žetona OAuth in samodejno
onemogočanje. Deaktivacijo povzroči samo napaka na poti dejanske zahteve.
Zabeležena napaka omogoča, da je označen račun viden na nadzorni plošči,
medtem ko še naprej obdeluje promet.

Enotna točka odločanja je `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), ki jo preveri **vsako** mesto, ki bi lahko
zaradi napake, izvirajoče iz preizkusa, spremenilo stanje usmerjanja:

- `markAccountUnavailable` (`auth.ts`) — samo beleženje (neobdelano besedilo
  `lastError`, `lastErrorType`, `errorCode`, `lastErrorAt`; namenoma **brez**
  `backoffLevel`, ki bi sprožil samodejno zmanjševanje ob izbiranju in izbrisal
  zapis)
- `maybeAutoDisableBannedAccount` — brez samodejnega onemogočanja
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (samo beleženje,
  brez končnega stanja `credits_exhausted`), GEO_BLOCKED (brez 24-urne
  izključitve), MODEL_NOT_FOUND (brez `lockModel`), preklop na drug račun ob
  napaki codex 429 (brez `markCodexScopeRateLimited`, brez trajno shranjenega
  `rate_limited_until`, brez brisanja afinitete seje), `persistCodexQuotaState`
  (brez zapisovanja stanja kvote, brez razveljavitve predpomnilnika),
  `recordKeyHealthStatus` (izbirnik ključev glede na stanje ostane nedotaknjen)
- Osvežitev OAuth — tako proaktivna osvežitev v osnovi izvajalnika
  (`base.ts` `execute()`, brez porabe rotacije osvežitvenega žetona) kot
  reaktivna pot 401/403 v `chatCore` (brez deaktivacije `expired`)
- `chat.ts` — odklopnik ponudnika in 5-minutni predpomnilnik kvote
  (`markAccountExhaustedFrom429`) se nikoli ne poslabšata

Zabeležena napaka omogoča, da je označen račun viden na nadzorni plošči, medtem
ko še naprej obdeluje promet. Opomba: zapis preizkusa shrani **neobdelano**
(neskrajšano) besedilo napake, za razliko od krajšanja na dejanski poti z
`slice(0,100)`.

Upravljavci, ki preizkus vseh modelov uporabljajo kot vzdrževalno orodje, lahko
obnovijo preteklo vedenje (preizkus se šteje kot dejansko ustvarjanje) na enega
od naslednjih načinov:

- z nastavitvijo `probeCanDisable` (`POST /api/settings` z
  `{"probeCanDisable": true}` ali z neposrednim urejanjem zbirke podatkov
  `key_value`) ali
- z zastavico funkcije **`PROBE_CAN_DISABLE=true`** (preglasitev prek okolja ali
  zbirke podatkov; ima prednost pred nastavitvijo).

Varno privzeto vedenje: če preverjanje zastavice ali nastavitve sproži napako,
izolacija ostane VKLOPLJENA.

## Izvorne datoteke

| Področje                                        | Datoteka                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabele signalov + ujemanje                      | `open-sse/services/accountFallback.ts`                                                                        |
| Zaključevanje / trajno shranjevanje             | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Obseg samodejnega onemogočanja                  | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Sprotno razvrščanje                             | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Izključitev obnovitve končnega stanja           | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Nalaganje ključnih besed po meri med izvajanjem | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Uporabniški vmesnik nastavitev                  | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
