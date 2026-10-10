# CLI Machine-ID Token (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Přehled

Příkazy OmniRoute CLI se vůči místnímu rozhraní API pro správu ověřují pomocí
tokenu `HMAC-SHA256(machine-id, salt)` odesílaného v hlavičce požadavku
`x-omniroute-cli-token`.

Díky tomu mohou podpříkazy CLI (`omniroute status`, `omniroute providers` atd.)
volat koncové body pro správu, aniž by uživatel musel při každém spuštění zadávat
JWT nebo heslo.

## Jak to funguje

1. `getMachineTokenSync()` načte hardwarové ID počítače prostřednictvím
   `node-machine-id` (při selhání použije prázdný řetězec, čímž ověřování CLI
   zakáže).
2. Vypočítá `HMAC-SHA256(machine_id, salt)` a vrátí celý 64znakový hexadecimální
   otisk — deterministický, nevratný token svázaný s tímto počítačem.
3. CLI odešle token jako `x-omniroute-cli-token` pouze tehdy, když je výsledným
   cílem explicitní adresa URL zpětné smyčky (`localhost`, `127.0.0.0/8` nebo
   IPv6 zpětné smyčky). Požadavky obsahující token používají `redirect: error`,
   takže místní přesměrování jej nemůže předat jinému zdroji. Vzdálené kontexty
   místo něj používají přístupové tokeny s omezeným rozsahem. Pokud token nelze
   odvodit, CLI hlavičku vynechá a `omniroute doctor` nahlásí selhání namísto
   toho, aby prázdný token považoval za platný.
4. Server (`src/server/authz/policies/management.ts`) znovu vypočítá očekávaný
   token se stejnou solí a porovná jej pomocí `timingSafeEqual`, aby zabránil
   jeho získání na základě časování.

## Bezpečnostní vlastnosti

| Vlastnost                        | Podrobnosti                                                                                                                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pouze zpětná smyčka**          | Přijímá se pouze tehdy, když důvěryhodný serverový příznak lokality protistrany (odvozený ze skutečné adresy protistrany TCP) označuje zpětnou smyčku. Klientem řízené hlavičce `Host` se při určování lokality nikdy nedůvěřuje. |
| **Porovnání v konstantním čase** | `crypto.timingSafeEqual` zabraňuje útokům založeným na časování.                                                                                                                                                                  |
| **Nevratnost**                   | Z výstupu HMAC nelze zpětně získat ID počítače.                                                                                                                                                                                   |
| **Bez obejití ochrany `always`** | `isAlwaysProtectedPath()` se vyhodnocuje před kontrolou tokenu CLI. `/api/shutdown` a `/api/settings/database` vždy vyžadují JWT.                                                                                                 |
| **Neexportovatelnost**           | Token se nikdy nezapisuje na disk ani do protokolů.                                                                                                                                                                               |

## Výchozí sůl (náhodná pro každou instalaci)

Pokud není nastavena proměnná `OMNIROUTE_CLI_SALT`, použije se jako sůl náhodný hexadecimální řetězec o 64 znacích, který je jednorázově vygenerován a uložen do souboru `<DATA_DIR>/cli-token-salt.json` (režim `0600`) — nikoli literál `omniroute-cli-auth-v1` uložený v repozitáři. Funkce `getActiveSalt()` v souboru `src/lib/machineToken.ts` i její protějšek v `bin/cli/utils/cliToken.mjs` čtou stejný soubor, takže server a každé spuštění CLI v této instalaci používají stejnou hodnotu. Literál uložený v repozitáři se používá pouze jako záložní řešení v krajním případě, kdy dosud nelze získat uloženou sůl ani sůl z proměnné prostředí (například u nové instalace obsahující pouze CLI, ve které server ještě nikdy nebyl spuštěn). Tím se odstraňuje slabina dřívějšího výchozího pevného literálu: soubor `/etc/machine-id` je běžně čitelný všemi uživateli, takže kterýkoli místní uživatel by jinak mohl odvodit stejný token pro každou instalaci, ve které nebyla nikdy nastavena proměnná `OMNIROUTE_CLI_SALT`.

Pokud sůl nelze načíst ani vytvořit, server i CLI vydají před použitím tohoto záložního řešení pro zajištění kompatibility jedno varování za každý proces. Varování neobsahuje sůl, token, cestu v souborovém systému ani nezpracovanou chybu. Obnovte přístup k `DATA_DIR` nebo nastavte `OMNIROUTE_CLI_SALT` a poté restartujte dotčený proces. Varování problém zviditelní; nezajistí však soukromí veřejné záložní soli ani nevypne ověřování CLI. Stávající platné uložené soli a explicitní hodnoty z proměnných prostředí si zachovávají své předchozí hodnoty tokenů.

## Rotace soli

Nastavením `OMNIROUTE_CLI_SALT` můžete změnit odvozený token bez úprav kódu — tato hodnota má vždy přednost před uloženou solí specifickou pro danou instalaci. Po rotaci budou všechny procesy CLI na tomto počítači automaticky používat nový token. To je užitečné po úniku seznamu procesů, který mohl odhalit předchozí odvozenou hodnotu.

```bash
# Trvalá rotace (přidejte do profilu shellu)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Ověření, že se používá nový token
omniroute status
```

## Starší formát (SHA-256, 32 znaků) — stále podporován

Před zavedením výše uvedeného formátu HMAC odvozovalo CLI svůj token jako
`SHA-256(machineId + salt).hex[0..32]` (32znakový prefix) v
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` v `src/lib/machineToken.ts`).

Kvůli zpětné kompatibilitě server přijímá **oba** formáty: ověřovací mechanismus sestaví
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` a porovná
příchozí hlavičku s každým z nich pomocí `timingSafeEqual`
(`src/server/authz/policies/management.ts` a `src/lib/middleware/cliTokenAuth.ts`).
Token je tedy platný, pokud odpovídá **buď** 64znakovému otisku HMAC, nebo 32znakovému
prefixu staršího formátu SHA-256.

**Vypnutí:** nastavením `OMNIROUTE_DISABLE_CLI_TOKEN=true` (v prostředí nebo souboru `.env`) mechanismus tokenů CLI zcela vypnete; veškerý přístup pak vyžaduje explicitní klíč API. Na hostitelích s více uživateli se toto nastavení doporučuje, protože `machine-id` je specifický pro zařízení (nikoli pro uživatele) a jiný uživatel na stejném hostiteli by mohl vypočítat stejný token.

## Soubory

| Soubor                                    | Účel                                           |
| ----------------------------------------- | ---------------------------------------------- |
| `src/lib/machineToken.ts`                 | Odvození tokenu (`getMachineTokenSync`)        |
| `bin/cli/utils/cliToken.mjs`              | Implementace stejného odvození na straně CLI   |
| `<DATA_DIR>/cli-token-salt.json`          | Uložená náhodná sůl specifická pro instalaci   |
| `src/server/authz/headers.ts`             | Konstanta `CLI_TOKEN_HEADER`                   |
| `src/server/authz/policies/management.ts` | Ověření na straně serveru                      |
| `src/server/authz/routeGuard.ts`          | Kontrola hostitele loopback (`isLoopbackHost`) |

## Viz také

- `docs/security/ROUTE_GUARD_TIERS.md` — úrovně ochrany tras
- `docs/architecture/AUTHZ_GUIDE.md` — kompletní proces autorizace
