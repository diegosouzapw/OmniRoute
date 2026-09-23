# Account-Ban / Banned-Keyword Detection (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute kontroluje chybové odpovede upstreamu a hľadá signály, ktoré naznačujú, že účet
poskytovateľa je **natrvalo nefunkčný** (pozastavený / deaktivovaný / zablokovaný za porušenie podmienok používania), a keď
nájde zhodu, presunie dané pripojenie do **koncového stavu `banned`**, aby už
nebolo vyberané pre požiadavky. Toto konfiguruje karta nastavení **Security → Banned Keywords**
(„Ďalšie kľúčové slová, ktoré spustia detekciu trvalého zablokovania účtu.
Vstavané kľúčové slová sa použijú vždy.“).

Táto stránka dokumentuje vstavaný zoznam, priebeh detekcie, jej rozsah, bezpečný spôsob pridávania
vlastných kľúčových slov a obnovenie označeného pripojenia. Samotný koncový
stav je súčasťou modelu odolnosti — pozrite si
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Koncové stavy“).

**Zdroj pravdy:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Vstavané kľúčové slová

Týchto 8 podreťazcov sa použije vždy (bez rozlišovania veľkosti písmen), bez ohľadu na vlastný zoznam:

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

> Tento zoznam sa vyvíja podľa toho, ako poskytovatelia menia znenie správ o zablokovaní. Autoritatívna
> kópia je `ACCOUNT_DEACTIVATED_SIGNALS` v `open-sse/services/accountFallback.ts`;
> blok vyššie považujte za snímku aktuálneho stavu.

V tom istom súbore sa nachádzajú dve susediace, **samostatné** tabuľky signálov, ktoré _nie sú_ súčasťou
detekcie zakázaných kľúčových slov:

- `CREDITS_EXHAUSTED_SIGNALS` — vyčerpaná fakturácia/kvóta (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → koncový stav `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nekoncový stav**; obnovením tokenu je možné stav napraviť.

Poznámka: bežné dočasné frázy ako **`rate limit`** / `429` spracúva mechanizmus
obmedzenia frekvencie / časového pozastavenia pripojenia a **nie sú** signálmi zablokovania.

## Priebeh detekcie

```
chybová odpoveď upstreamu
  → telo prevedené na reťazec + malé písmená
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [zhoda podreťazca]
  → zhoda?
      → testStatus pripojenia = "banned"      (trvalé — 1-ročné pozastavenie, nikdy sa automaticky neobnoví)
      → ak je nastavenie `autoDisableBannedAccounts` zapnuté a `autoDisableBannedScope`
        zahŕňa toto pripojenie (`all` alebo `subscription` pre OAuth/cookie/session)
        → zároveň isActive = false. Predplatené kľúče API zostanú aktívne, keď je rozsah
        nastavený na `subscription`.
      → pripojenie sa pri výbere účtu preskočí (kombinované stavy QUOTA_BLOCKING)
```

- Zhoda sa vyhľadáva ako **podreťazec bez rozlišovania veľkosti písmen** v **tele**
  odpovede (`isAccountDeactivated`, `accountFallback.ts`).
- Trvalý prechod do koncového stavu `banned` sa pri tele obsahujúcom signál zablokovania spustí pri **akomkoľvek
  stave HTTP** (prostredníctvom `markAccountUnavailable` → `checkFallbackError`). Užšie označenie
  **`deactivated`** (`isActive=false`, keď pripojenie nemá žiadne
  náhradné kľúče API) zapisuje vnorená vetva v `chatCore.ts` pri **HTTP 401 / 403**
  (klasifikované prostredníctvom `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Upozorňujeme, že
  vetva `markAccountUnavailable()` zapisuje pre rovnaký signál `ACCOUNT_DEACTIVATED` _odlišný_
  koncový stav — **`expired`** — (prostredníctvom
  `resolveTerminalConnectionStatus`), takže rovnaké zablokovanie sa môže prejaviť buď ako
  `deactivated`, alebo `expired` podľa toho, ktorá vetva odpoveď spracovala. (Starší
  komentár v kóde uvádza „keď telo odpovede 401 obsahuje tieto reťazce“ — to
  nevystihuje úplne súčasné správanie.)
- Pripojenie v stave `banned` je vylúčené z výberu všade, kde sa filtrujú koncové stavy
  (`isTerminalConnectionStatus`, kombinované `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Rozsah — ktorí poskytovatelia sa kontrolujú

**Všetci poskytovatelia.** Kontrola prebieha vo všeobecnom mechanizme spracovania
chýb, ktorým prechádza každá neúspešná požiadavka na upstream — **nie je**
obmedzená na scrapery OAuth/predplatného. Výsledný koncový stav sa vzťahuje na
**pripojenie**, nie na poskytovateľa.

Vstavané _reťazce_ sú však zamerané na poskytovateľov predplatného/OAuth, pri
ktorých existuje reálne riziko zablokovania (ChatGPT Web Codex, Claude Web, Codex,
Muse Spark, Antigravity). Poskytovateľ s API kľúčom aktivuje detektor iba vtedy,
ak telo jeho chyby doslova obsahuje jeden z podreťazcov.

`autoDisableBannedScope` (`all` | `subscription`, predvolené `all`) určuje, či
zhoda zároveň nastaví `isActive=false`. `subscription` znamená prístupy založené
na prihlásení (platené predplatné a bezplatné účty vrátane relácií s webovými
cookies). Pre predplatené API kľúče sa naďalej zaznamená `testStatus=banned`, ale
zostanú v smerovacom poole. Trvalým riešením je prepis na úrovni jednotlivých
poskytovateľov a účtov; globálny enum je prvá verzia.

## Vlastné kľúčové slová zablokovania

Kľúčové slová môžete pridávať alebo odstraňovať v časti **Zabezpečenie → Kľúčové
slová zablokovania** (ukladajú sa ako globálne nastavenie `customBannedSignals`
prostredníctvom `PATCH /api/settings`). **Pridávajú sa k** vstavanému zoznamu —
nikdy ho nenahrádzajú — a po uložení (aj pri spustení) sa načítajú bez
reštartovania prostredníctvom `setCustomBannedSignals()`. Každé kľúčové slovo je
obmedzené na 200 znakov; počet prvkov v poli nie je obmedzený.

**⚠ Riziko falošne pozitívnych výsledkov — vyberajte konkrétne frázy.** Detekcia
používa jednoduché vyhľadávanie podreťazca v celom tele odpovede a zhoda je
**trvalá** (ročná lehota obnovenia, manuálne obnovenie). Príliš všeobecné kľúčové
slovo môže zablokovať úplne funkčné pripojenie:

- **Zlé:** `quota`, `limit`, `error`, `denied` — vyskytujú sa v mnohých dočasných chybách.
- **Dobré:** celé vety oznamujúce zablokovanie, napr. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Uprednostnite najdlhšiu jednoznačnú frázu, ktorú poskytovateľ vracia pri skutočnom
zablokovaní. Ak si nie ste istí, najprv sledujte `lastError` pripojenia a potom
pridajte presné znenie.

## Obnovenie označeného pripojenia

Koncové stavy `banned` / `deactivated` sa **nikdy automaticky neobnovia** (sú
vylúčené z cyklu proaktívneho obnovenia — samostatne sa obnovia iba lehoty
ochladenia stavu `unavailable`). Operátor ich musí explicitne vymazať:

1. **Znova otestujte pripojenie** — akcia **Test** na ovládacom paneli
   (`POST /api/providers/{id}/test`); úspešná kontrola nastaví `testStatus` späť
   na `active` a vymaže chybové polia.
2. **Znova sa autentifikujte/upravte prihlasovacie údaje** — pri poskytovateľoch
   OAuth zopakujte proces prihlásenia/obnovenia; trasy na vytvorenie/import
   poskytovateľa nastavia `isActive = true`.
3. **Znova povoľte pripojenie** — ak automatické zakázanie nastavilo
   `isActive = false` (rozsah `all` alebo `subscription` pri pripojení typu
   OAuth/cookie/session), po oprave účtu ho znova zapnite.

Samostatné tlačidlo „vymazať príznak zablokovania“ neexistuje — obnovenie sa
vykonáva opätovným testovaním, autentifikáciou alebo povolením, v súlade so
všeobecným pravidlom koncového stavu v dokumente
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolácia kontrol (test všetkých modelov)

**Zlyhanie pochádzajúce z kontroly** (test všetkých modelov / kontroly stavu
vykonané v rámci `runAsProbe`) nikdy neodstráni pripojenie z poolu (#9817): je
**zaznamenané na zabezpečenie viditeľnosti** (`last_error`, `last_error_type`,
`error_code`, `last_error_at`), ale preskočí **každú** zmenu smerovania — lehoty
ochladenia, koncový stav (`banned` / `deactivated` / `credits_exhausted`),
uzamknutia jednotlivých modelov, istič poskytovateľa, 5-minútovú vyrovnávaciu
pamäť kvóty, obnovenie tokenu OAuth aj automatické zakázanie. Deaktiváciu spôsobí
iba zlyhanie na ceste skutočnej požiadavky. Zaznamenaná chyba zviditeľní označený
účet na ovládacom paneli, pričom naďalej obsluhuje prevádzku.

Jediným rozhodovacím bodom je `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), ktorý používa **každé** miesto schopné
zmeniť stav smerovania na základe zlyhania pochádzajúceho z kontroly:

- `markAccountUnavailable` (`auth.ts`) — iba zaznamenanie (neskrátený text
  `lastError`, `lastErrorType`, `errorCode`, `lastErrorAt`; zámerne **bez**
  `backoffLevel`, ktorý by spustil automatický úbytok pri výbere a záznam
  vymazal)
- `maybeAutoDisableBannedAccount` — žiadne automatické zakázanie
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (iba
  zaznamenanie, bez koncového stavu `credits_exhausted`), GEO_BLOCKED (bez
  vylúčenia na 24 hodín), MODEL_NOT_FOUND (bez `lockModel`), prepnutie účtu pri
  zlyhaní codex 429 (bez `markCodexScopeRateLimited`, bez uloženia
  `rate_limited_until`, bez vymazania afinity relácie), `persistCodexQuotaState`
  (bez zápisu stavu kvóty a bez zneplatnenia vyrovnávacej pamäte),
  `recordKeyHealthStatus` (rotátor stavu kľúčov zostáva nedotknutý)
- Obnovenie OAuth — proaktívne obnovenie v základnej triede executora
  (`base.ts` `execute()`, bez spotrebovania rotácie obnovovacieho tokenu) aj
  reaktívna cesta 401/403 v `chatCore` (bez deaktivácie `expired`)
- `chat.ts` — istič poskytovateľa ani 5-minútová vyrovnávacia pamäť kvóty
  (`markAccountExhaustedFrom429`) sa nikdy nezhoršia

Zaznamenaná chyba zviditeľní označený účet na ovládacom paneli, pričom naďalej
obsluhuje prevádzku. Poznámka: záznam kontroly ukladá **neskrátený** text chyby,
na rozdiel od skrátenia `slice(0,100)` na ceste skutočnej požiadavky.

Operátori, ktorí používajú test všetkých modelov ako nástroj údržby, môžu obnoviť
pôvodné správanie (kontrola sa počíta ako skutočné generovanie) jedným z týchto
spôsobov:

- nastavením `probeCanDisable` (`POST /api/settings` s
  `{"probeCanDisable": true}` alebo priamou úpravou databázovej položky
  `key_value`), alebo
- príznakom funkcie **`PROBE_CAN_DISABLE=true`** (prepísanie cez prostredie alebo
  databázu; má prednosť pred nastavením).

Bezpečné zlyhanie: ak načítanie príznaku alebo nastavení vyvolá výnimku, izolácia
zostane ZAPNUTÁ.

## Zdrojové súbory

| Oblasť                                     | Súbor                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Tabuľky signálov + zhoda                   | `open-sse/services/accountFallback.ts`                                                                        |
| Ukončenie / perzistencia                   | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Rozsah automatického deaktivovania         | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Klasifikácia priamo v kóde                 | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Vylúčenie obnovy koncového stavu           | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Načítanie vlastných kľúčových slov za behu | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Používateľské rozhranie nastavení          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
