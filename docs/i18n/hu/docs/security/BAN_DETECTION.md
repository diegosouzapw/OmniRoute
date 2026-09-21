# Account-Ban / Banned-Keyword Detection (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

Az OmniRoute jeleket keres a felsőbb szintű szolgáltatók hibaválaszaiban, amelyek arra utalnak, hogy egy szolgáltatói
**fiók véglegesen használhatatlanná vált** (felfüggesztették / deaktiválták / az ÁSZF megsértése miatt letiltották), és egyezés
esetén a kapcsolatot egy **végleges `banned` állapotba** helyezi, így az a
továbbiakban nem lesz kiválasztva a kérésekhez. Ezt konfigurálja a **Security → Banned Keywords**
beállítási kártya („További kulcsszavak, amelyek kiváltják a végleges fiókletiltás
észlelését. A beépített kulcsszavak mindig érvényesek.”).

Ez az oldal dokumentálja a beépített listát, az észlelési folyamatot, annak hatókörét, az
egyéni kulcsszavak biztonságos hozzáadásának módját, valamint a megjelölt kapcsolat helyreállítását. Maga a végleges
állapot a hibatűrési modell része — lásd:
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Végleges állapotok”).

**Hiteles forrás:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Beépített kulcsszavak

Ez a 8 karakterláncrészlet mindig érvényes (kis- és nagybetűktől függetlenül), az egyéni listától függetlenül:

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

> Ez a lista a szolgáltatók letiltási szövegezésének változásával együtt fejlődik. A hiteles
> példány az `ACCOUNT_DEACTIVATED_SIGNALS` az `open-sse/services/accountFallback.ts` fájlban;
> a fenti blokkot pillanatfelvételként kell kezelni.

Ugyanebben a fájlban két szomszédos, **különálló** jelzéstábla található, amelyek _nem_ részei
a tiltott kulcsszavak észlelésének:

- `CREDITS_EXHAUSTED_SIGNALS` — a számlázási keret/kvóta kimerült (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → végleges `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nem végleges**; a token frissítése helyreállíthatja.

Megjegyzés: az olyan gyakori átmeneti kifejezéseket, mint a **`rate limit`** / `429`, a
sebességkorlátozási / kapcsolat-várakoztatási folyamat kezeli, és ezek **nem** letiltási jelzések.

## Észlelési folyamat

```
felsőbb szintű szolgáltató hibaválasza
  → törzs karakterlánccá alakítása + kisbetűssé alakítása
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [karakterláncrészlet-egyezés]
  → van egyezés?
      → kapcsolat testStatus = "banned"      (végleges — 1 éves várakozási idő, nincs automatikus helyreállítás)
      → ha az `autoDisableBannedAccounts` beállítás be van kapcsolva, és az `autoDisableBannedScope`
        tartalmazza ezt a kapcsolatot (`all`, vagy OAuth/cookie/munkamenet esetén `subscription`)
        → az isActive értéke is false lesz. Az előre fizetett API-kulcsok aktívak maradnak, amikor a hatókör
        `subscription`.
      → a kapcsolat kimarad a fiókkiválasztásból (kombinált QUOTA_BLOCKING állapotok)
```

- Az egyezéskeresés egy **kis- és nagybetűktől független karakterláncrészlet-keresés** a válasz **törzsében**
  (`isAccountDeactivated`, `accountFallback.ts`).
- A végleges `banned` állapotba helyezés tiltási jelzést tartalmazó törzs esetén **bármely
  HTTP-állapotnál** megtörténik (a `markAccountUnavailable` → `checkFallbackError` útvonalon keresztül). A
  szűkebb **`deactivated`** címkét (`isActive=false`, ha a kapcsolathoz nem tartoznak
  tartalék API-kulcsok) a `chatCore.ts` beágyazott útvonala írja **HTTP 401 / 403**
  esetén (besorolás: `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Fontos, hogy a
  `markAccountUnavailable()` útvonal egy _másik_ végleges állapotot —
  **`expired`** — ír ugyanahhoz az `ACCOUNT_DEACTIVATED` jelzéshez (a
  `resolveTerminalConnectionStatus` útján), így ugyanaz a letiltás `deactivated` vagy
  `expired` állapotként is megjelenhet attól függően, hogy melyik útvonal kezelte a választ. (A
  régebbi kódmegjegyzés szerint „amikor egy 401-es válasz törzse tartalmazza ezeket a karakterláncokat” — ez
  szűkebben fogalmaz a jelenlegi működésnél.)
- A `banned` kapcsolat mindenhol ki van zárva a kiválasztásból, ahol a végleges állapotokat
  kiszűrik (`isTerminalConnectionStatus`, kombinált `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Hatókör — mely szolgáltatók kerülnek ellenőrzésre

**Minden szolgáltató.** Az ellenőrzés abban az általános hibakezelési folyamatban
fut, amelyen minden sikertelen upstream kérés áthalad — **nem** korlátozódik az
OAuth-/előfizetés-alapú scraperekre. Az eredményül kapott terminális állapot
**kapcsolatonként**, nem pedig szolgáltatónként értendő.

Ennek ellenére a beépített _karakterláncok_ a valós kitiltási kockázattal járó
előfizetéses/OAuth-szolgáltatókra vannak szabva (ChatGPT Web Codex, Claude Web,
Codex, Muse Spark, Antigravity). Egy API-kulcsos szolgáltató csak akkor aktiválja
az érzékelőt, ha a hibatörzse szó szerint tartalmazza valamelyik részkarakterláncot.

Az `autoDisableBannedScope` (`all` | `subscription`, alapértelmezett: `all`)
szabályozza, hogy egy találat az `isActive=false` értéket is beállítsa-e. A
`subscription` bejelentkezésalapú hozzáférési helyeket jelent (fizetős
előfizetéseket és ingyenes fiókokat, beleértve a webes cookie-munkameneteket).
Az előre fizetett API-kulcsoknál továbbra is rögzíti a `testStatus=banned`
állapotot, de a kulcsokat az útválasztási készletben hagyja. A tartós megoldás
egy szolgáltatónkénti és fiókonkénti felülbírálás; a globális enum az első
megvalósítás.

## Egyéni kitiltási kulcsszavak

Kulcsszavakat a **Biztonság → Kitiltási kulcsszavak** részen adhat hozzá vagy
távolíthat el (a globális `customBannedSignals` beállításként tárolva a
`PATCH /api/settings` útvonalon keresztül). Ezek **hozzáadódnak** a beépített
listához — soha nem helyettesítik azt —, és mentéskor (valamint indításkor)
azonnal újratöltődnek a `setCustomBannedSignals()` használatával. Minden kulcsszó
legfeljebb 200 karakter hosszú lehet; a tömb hosszára nincs korlátozás.

**⚠ Téves pozitív találat kockázata — válasszon konkrét kifejezéseket.** Az
észlelés a teljes választörzsön végzett nyers részkarakterlánc-egyezésen alapul,
és a találat **végleges** (1 éves várakozási idő, kézi helyreállítás). Egy túl
általános kulcsszó teljesen megfelelően működő kapcsolatot is kitilthat:

- **Rossz:** `quota`, `limit`, `error`, `denied` — számos átmeneti hibában előfordulnak.
- **Jó:** teljes kitiltási mondatok, például `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Lehetőleg a szolgáltató által valós kitiltáskor visszaadott leghosszabb,
egyértelmű kifejezést használja. Ha bizonytalan, először figyelje meg a kapcsolat
`lastError` értékét, majd adja hozzá a pontos megfogalmazást.

## Megjelölt kapcsolat helyreállítása

A terminális `banned` / `deactivated` állapotokból a rendszer **soha nem áll
helyre automatikusan** (ezek ki vannak zárva a proaktív helyreállítási ciklusból
— csak az `unavailable` várakozási idők állnak helyre önmaguktól). Az
üzemeltetőnek kifejezetten törölnie kell ezeket:

1. **Tesztelje újra a kapcsolatot** — az irányítópult **Teszt** műveletével
   (`POST /api/providers/{id}/test`); egy sikeres próba visszaállítja a
   `testStatus` értékét `active` állapotra, és törli a hibamezőket.
2. **Hitelesítse újra / szerkessze a hitelesítő adatokat** — OAuth-szolgáltatók
   esetén futtassa újra a bejelentkezési / frissítési folyamatot; a szolgáltatók
   létrehozási/importálási útvonalai az `isActive = true` értéket állítják be.
3. **Engedélyezze újra a kapcsolatot** — ha az automatikus letiltás
   `isActive = false` értéket állított be (`all` hatókör, illetve OAuth-/cookie-/
   munkamenet-kapcsolat esetén `subscription`), a fiók javítása után kapcsolja
   vissza.

Nincs külön „kitiltási jelző törlése” gomb — a helyreállítás újrateszteléssel,
újrahitelesítéssel vagy újbóli engedélyezéssel történik, összhangban a
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) általános,
terminális állapotokra vonatkozó szabályával.

## Próbaelkülönítés (összes modell tesztelése)

A **próbaeredetű hiba** (a `runAsProbe` belsejében végrehajtott, összes modellre
kiterjedő tesztelési / állapot-ellenőrzési küldések) soha nem távolít el
kapcsolatot a készletből (#9817): a rendszer **láthatósági célból rögzíti**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), de **minden**
útválasztási módosítást kihagy — a várakozási időket, a terminális állapotot
(`banned` / `deactivated` / `credits_exhausted`), a modellenkénti kizárásokat,
a szolgáltató áramkör-megszakítóját, az 5 perces kvótagyorsítótárat, az OAuth-token
frissítését és az automatikus letiltást. Csak a valódi kérési útvonalon fellépő
hiba deaktivál. A rögzített hiba teszi láthatóvá a megjelölt fiókot az
irányítópulton, miközben az továbbra is kiszolgálja a forgalmat.

Az egyetlen döntési pont a `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), amelyet **minden** olyan hely ellenőriz,
ahol egy próbaeredetű hiba módosíthatná az útválasztási állapotot:

- `markAccountUnavailable` (`auth.ts`) — csak rögzítés (`lastError` nyers szöveg,
  `lastErrorType`, `errorCode`, `lastErrorAt`; szándékosan **nincs**
  `backoffLevel`, mert az kiváltaná a kiválasztáskori automatikus elévülést,
  és törölné a rekordot)
- `maybeAutoDisableBannedAccount` — nincs automatikus letiltás
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (csak rögzítés,
  nincs terminális `credits_exhausted`), GEO_BLOCKED (nincs 24 órás kizárás),
  MODEL_NOT_FOUND (nincs `lockModel`), a codex 429 fiókrotációs feladatátadás
  (nincs `markCodexScopeRateLimited`, nincs tartós `rate_limited_until`, nincs
  munkamenet-affinitás törlése), `persistCodexQuotaState` (nincs kvótaállapot-
  írás, nincs gyorsítótár-érvénytelenítés), `recordKeyHealthStatus` (a kulcsok
  állapotán alapuló rotáció érintetlen marad)
- OAuth-frissítés — mind a végrehajtó alaposztályában végzett proaktív frissítés
  (`base.ts` `execute()`, nem használ el refresh tokent a rotációhoz), mind a
  `chatCore` reaktív 401/403 útvonala (nincs `expired` deaktiválás)
- `chat.ts` — a szolgáltató áramkör-megszakítója és az 5 perces kvótagyorsítótár
  (`markAccountExhaustedFrom429`) állapota soha nem romlik

A rögzített hiba teszi láthatóvá a megjelölt fiókot az irányítópulton, miközben
az továbbra is kiszolgálja a forgalmat. Megjegyzés: a próbarekord a **nyers**
(nem csonkolt) hibaszöveget tárolja, ellentétben a valódi útvonal
`slice(0,100)` szerinti csonkolásával.

Azok az üzemeltetők, akik az összes modell tesztelését karbantartási eszközként
használják, az alábbi módszerek egyikével visszaállíthatják a korábbi működést
(a próba valódi generálásnak számít):

- a `probeCanDisable` beállítás (`POST /api/settings` a
  `{"probeCanDisable": true}` törzzsel, vagy a `key_value` adatbázis közvetlen
  szerkesztésével), vagy
- a **`PROBE_CAN_DISABLE=true`** funkciójelző (környezeti változóból vagy
  adatbázis-felülbírálásból; elsőbbséget élvez a beállítással szemben).

Biztonságos alapértelmezés: ha a jelző vagy a beállítás lekérdezése hibát dob,
az elkülönítés bekapcsolva marad.

## Forrásfájlok

| Témakör                                         | Fájl                                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Szignáltáblák + egyezés                         | `open-sse/services/accountFallback.ts`                                                                        |
| Véglegesítés / perzisztencia                    | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Automatikus letiltás hatóköre                   | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Beágyazott osztályozás                          | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Végleges állapot helyreállításból való kizárása | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Egyéni kulcsszavak futásidejű betöltése         | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Beállítások felhasználói felülete               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
