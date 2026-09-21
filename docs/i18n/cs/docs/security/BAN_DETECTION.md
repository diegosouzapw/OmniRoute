# Account-Ban / Banned-Keyword Detection (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute prohledává chybové odpovědi nadřazených služeb a hledá signály, které naznačují, že je **účet poskytovatele trvale nefunkční** (pozastavený / deaktivovaný / zablokovaný kvůli porušení smluvních podmínek), a při
nalezení shody převede dané připojení do **koncového stavu `banned`**, takže již
nebude vybíráno pro požadavky. Toto chování konfiguruje karta nastavení **Zabezpečení → Zakázaná klíčová slova**
(„Další klíčová slova, která spustí detekci trvalého zablokování účtu.
Vestavěná klíčová slova se použijí vždy.“).

Tato stránka popisuje vestavěný seznam, průběh detekce, její rozsah, bezpečné
přidávání vlastních klíčových slov a obnovení označeného připojení. Samotný koncový
stav je součástí modelu odolnosti — viz
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („Koncové stavy“).

**Zdroj pravdy:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Vestavěná klíčová slova

Těchto 8 podřetězců se použije vždy (bez rozlišení velikosti písmen), bez ohledu na vlastní seznam:

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

> Tento seznam se vyvíjí podle toho, jak poskytovatelé mění znění zpráv o zablokování. Směrodatná
> kopie je `ACCOUNT_DEACTIVATED_SIGNALS` v `open-sse/services/accountFallback.ts`;
> výše uvedený blok považujte za snímek.

Ve stejném souboru se nacházejí dvě sousední, **samostatné** tabulky signálů, které
_nejsou_ součástí detekce zakázaných klíčových slov:

- `CREDITS_EXHAUSTED_SIGNALS` — vyčerpané prostředky/kvóta (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → koncový stav `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nekoncový stav**; obnovení tokenu může připojení obnovit.

Poznámka: běžné dočasné fráze jako **`rate limit`** / `429` zpracovává
mechanismus omezení rychlosti / dočasného blokování připojení a **nejde** o signály zablokování.

## Průběh detekce

```
chybová odpověď nadřazené služby
  → tělo převedeno na řetězec + malá písmena
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [shoda podřetězce]
  → shoda?
      → connection testStatus = "banned"      (trvalé — roční doba blokování, nikdy se automaticky neobnoví)
      → pokud je zapnuté nastavení `autoDisableBannedAccounts` a `autoDisableBannedScope`
        zahrnuje toto připojení (`all` nebo `subscription` pro OAuth/cookie/session)
        → také isActive = false. Předplacené klíče API zůstávají aktivní, pokud je rozsah
        `subscription`.
      → připojení je při výběru účtu přeskočeno (kombinované stavy QUOTA_BLOCKING)
```

- Shoda se hledá jako **podřetězec bez rozlišení velikosti písmen** v **těle**
  odpovědi (`isAccountDeactivated`, `accountFallback.ts`).
- Trvalý přechod do stavu `banned` se při výskytu signálu zablokování v těle aktivuje při **jakémkoli
  stavu HTTP** (prostřednictvím `markAccountUnavailable` → `checkFallbackError`). Užší
  označení **`deactivated`** (`isActive=false`, pokud připojení nemá žádné
  náhradní klíče API) zapisuje vložená větev v `chatCore.ts` při **HTTP 401 / 403**
  (klasifikováno prostřednictvím `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Upozorňujeme, že
  větev `markAccountUnavailable()` zapisuje pro stejný signál `ACCOUNT_DEACTIVATED`
  (prostřednictvím `resolveTerminalConnectionStatus`) _jiný_ koncový stav —
  **`expired`** — takže se stejné zablokování může projevit buď jako
  `deactivated`, nebo jako `expired` podle toho, která větev odpověď zpracovala. (Starší
  komentář v kódu uvádí „když tělo odpovědi 401 obsahuje tyto řetězce“ — to
  nepopisuje současné chování v plném rozsahu.)
- Připojení ve stavu `banned` je vyloučeno z výběru všude, kde jsou filtrovány koncové stavy
  (`isTerminalConnectionStatus`, kombinované `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Rozsah — kteří poskytovatelé jsou kontrolováni

**Všichni poskytovatelé.** Kontrola probíhá v obecném procesu zpracování chyb,
kterým prochází každý neúspěšný požadavek na upstream — **není** omezena pouze
na scrapery OAuth/předplatného. Výsledný terminální stav se vztahuje na
**připojení**, nikoli na poskytovatele.

Vestavěné _řetězce_ jsou však zaměřeny na poskytovatele předplatného/OAuth,
u kterých reálně hrozí zablokování (ChatGPT Web Codex, Claude Web, Codex, Muse
Spark, Antigravity). Poskytovatel s API klíčem spustí detektor pouze v případě,
že tělo jeho chyby doslova obsahuje jeden z těchto podřetězců.

`autoDisableBannedScope` (`all` | `subscription`, výchozí `all`) určuje, zda
shoda také přepne `isActive=false`. `subscription` znamená účty přihlašovaného
typu (placená předplatná a bezplatné účty včetně relací založených na webových
cookies). U předplacených API klíčů se stále zaznamená `testStatus=banned`, ale
zůstanou ve fondu směrování. Trvalým řešením je možnost přepsání nastavení pro
jednotlivé poskytovatele a účty; globální výčet je první iterací.

## Vlastní klíčová slova označující zablokování

Klíčová slova můžete přidávat nebo odebírat v části **Zabezpečení → Klíčová slova označující zablokování**
(ukládají se jako globální nastavení `customBannedSignals` prostřednictvím
`PATCH /api/settings`). Jsou **přidávána k** vestavěnému seznamu — nikdy jej
nenahrazují — a po uložení (i při spuštění) se načtou za běhu prostřednictvím
`setCustomBannedSignals()`. Každé klíčové slovo je omezeno na 200 znaků; počet
prvků v poli není omezen.

**⚠ Riziko falešně pozitivních výsledků — volte konkrétní fráze.** Detekce
používá prostou shodu podřetězce v celém těle odpovědi a shoda je **trvalá**
(roční prodleva, ruční obnovení). Příliš obecné klíčové slovo může zablokovat
zcela funkční připojení:

- **Nevhodné:** `quota`, `limit`, `error`, `denied` — objevují se v mnoha
  přechodných chybách.
- **Vhodné:** celé věty o zablokování, např. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Upřednostněte nejdelší jednoznačnou frázi, kterou poskytovatel vrací při
skutečném zablokování. Pokud si nejste jisti, nejprve sledujte `lastError`
připojení a poté přidejte přesné znění.

## Obnovení označeného připojení

Terminální stavy `banned` / `deactivated` se **nikdy automaticky neobnoví**
(jsou vyloučeny z proaktivního cyklu obnovy — samostatně se obnovují pouze
prodlevy stavu `unavailable`). Operátor je musí explicitně vymazat:

1. **Znovu otestujte připojení** — akce **Test** na řídicím panelu
   (`POST /api/providers/{id}/test`); úspěšná sonda nastaví `testStatus` zpět
   na `active` a vymaže chybová pole.
2. **Znovu se přihlaste / upravte přihlašovací údaje** — u poskytovatelů OAuth
   znovu spusťte proces přihlášení / obnovení; trasy pro vytvoření/import
   poskytovatele nastaví `isActive = true`.
3. **Znovu povolte připojení** — pokud automatická deaktivace nastavila
   `isActive = false` (rozsah `all`, případně `subscription` pro připojení
   OAuth/cookie/session), po opravě účtu jej znovu zapněte.

Samostatné tlačítko „vymazat příznak zablokování“ neexistuje — obnovení probíhá
opětovným testem, přihlášením nebo povolením, v souladu s obecným pravidlem pro
terminální stavy v dokumentu
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Izolace sond (test všech modelů)

**Selhání pocházející ze sondy** (test všech modelů / kontroly stavu spuštěné
uvnitř `runAsProbe`) nikdy neodebere připojení z fondu (#9817): je
**zaznamenáno kvůli viditelnosti** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), ale přeskočí **všechny** změny směrování — prodlevy,
terminální stav (`banned` / `deactivated` / `credits_exhausted`), blokování
jednotlivých modelů, jistič poskytovatele, pětiminutovou mezipaměť kvóty,
obnovení tokenu OAuth a automatickou deaktivaci. K deaktivaci vede pouze selhání
na skutečné cestě požadavku. Zaznamenaná chyba zajišťuje, že označený účet je
viditelný na řídicím panelu, zatímco nadále obsluhuje provoz.

Jediným rozhodovacím bodem je `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), který využívá **každé** místo, jež by mohlo
na základě selhání pocházejícího ze sondy změnit stav směrování:

- `markAccountUnavailable` (`auth.ts`) — pouze záznam (`lastError` jako nezměněný
  text, `lastErrorType`, `errorCode`, `lastErrorAt`; záměrně **bez**
  `backoffLevel`, který by při výběru spustil automatický pokles a záznam
  vymazal)
- `maybeAutoDisableBannedAccount` — bez automatické deaktivace
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (pouze záznam,
  bez terminálního stavu `credits_exhausted`), GEO_BLOCKED (bez 24hodinového
  vyloučení), MODEL_NOT_FOUND (bez `lockModel`), převzetí při selhání rotace
  účtů Codex po chybě 429 (bez `markCodexScopeRateLimited`, bez uloženého
  `rate_limited_until`, bez vymazání afinity relace), `persistCodexQuotaState`
  (bez zápisu stavu kvóty a bez zneplatnění mezipaměti),
  `recordKeyHealthStatus` (rotátor stavu klíčů zůstává nedotčen)
- Obnovení OAuth — jak proaktivní obnovení v základně exekutoru
  (`base.ts` `execute()`, bez spotřebování rotace obnovovacího tokenu), tak
  reaktivní cesta 401/403 v `chatCore` (bez deaktivace `expired`)
- `chat.ts` — jistič poskytovatele ani pětiminutová mezipaměť kvóty
  (`markAccountExhaustedFrom429`) se nikdy nezhorší

Zaznamenaná chyba zajišťuje, že označený účet je viditelný na řídicím panelu,
zatímco nadále obsluhuje provoz. Poznámka: záznam sondy ukládá **nezměněný**
(nezkrácený) text chyby, na rozdíl od zkrácení pomocí `slice(0,100)` na skutečné
cestě.

Operátoři, kteří používají test všech modelů jako nástroj údržby, mohou obnovit
historické chování (sonda se počítá jako skutečné generování) jedním z těchto
způsobů:

- nastavením `probeCanDisable` (`POST /api/settings` s
  `{"probeCanDisable": true}` nebo přímou úpravou `key_value` v DB), nebo
- příznakem funkce **`PROBE_CAN_DISABLE=true`** (proměnná prostředí nebo přepsání
  v DB; má přednost před nastavením).

Bezpečné chování při selhání: pokud načtení příznaku nebo nastavení vyvolá
výjimku, izolace zůstane ZAPNUTÁ.

## Zdrojové soubory

| Oblast                                    | Soubor                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabulky signálů + shoda                   | `open-sse/services/accountFallback.ts`                                                                        |
| Ukončení / perzistence                    | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Rozsah automatického zakázání             | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Klasifikace přímo v kódu                  | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Vyloučení obnovy koncového stavu          | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Načítání vlastních klíčových slov za běhu | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Uživatelské rozhraní nastavení            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
