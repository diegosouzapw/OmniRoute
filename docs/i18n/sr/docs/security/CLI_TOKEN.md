# CLI Machine-ID Token (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Преглед

OmniRoute CLI команде се аутентификују на локалном API-ју за управљање помоћу
токена `HMAC-SHA256(machine-id, salt)` који се шаље преко заглавља захтева
`x-omniroute-cli-token`.

Ово омогућава CLI поткомандама (`omniroute status`, `omniroute providers` итд.)
да позивају крајње тачке за управљање без потребе да корисник при сваком позиву
наводи JWT или лозинку.

## Како функционише

1. `getMachineTokenSync()` чита хардверски ID машине преко пакета `node-machine-id`
   (у случају неуспеха користи празан стринг, чиме се онемогућава CLI аутентификација).
2. Израчунава `HMAC-SHA256(machine_id, salt)` и враћа комплетан хексадецимални
   сажетак од 64 знака — детерминистички, неповратни токен везан за ову машину.
3. CLI шаље токен као `x-omniroute-cli-token` само када је разрешено одредиште
   експлицитна URL адреса повратне петље (`localhost`, `127.0.0.0/8` или IPv6
   повратне петље). Захтеви који садрже токен користе `redirect: error`, тако да
   локално преусмеравање не може да га проследи другом извору. Удаљени контексти
   уместо тога користе приступне токене ограниченог опсега. Ако извођење токена
   није доступно, CLI изоставља заглавље, а `omniroute doctor` пријављује грешку
   уместо да празан токен сматра важећим.
4. Сервер (`src/server/authz/policies/management.ts`) поново израчунава
   очекивани токен са истом сољу и пореди га помоћу `timingSafeEqual` како би
   спречио издвајање засновано на временским разликама.

## Безбедносна својства

| Својство                                            | Детаљ                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Само повратна петља**                             | Прихвата се само када серверска поуздана ознака локалности равноправног чвора (изведена из стварне TCP адресе равноправног чвора) указује на повратну петљу. Клијентски контролисано заглавље `Host` никада се не сматра поузданим за утврђивање локалности. |
| **Поређење у константном времену**                  | `crypto.timingSafeEqual` спречава временске нападе.                                                                                                                                                                                                          |
| **Неповратно**                                      | Из HMAC излаза није могуће повратити ID машине.                                                                                                                                                                                                              |
| **Без заобилажења за путање заштићене са `always`** | `isAlwaysProtectedPath()` се проверава пре провере CLI токена. `/api/shutdown` и `/api/settings/database` увек захтевају JWT.                                                                                                                                |
| **Не може се извести**                              | Токен се никада не уписује на диск нити бележи у евиденцију.                                                                                                                                                                                                 |

## Подразумевана со (насумична за сваку инсталацију)

Када `OMNIROUTE_CLI_SALT` није постављен, со је насумични хексадецимални стринг
од 64 знака који се генерише једном и трајно чува у
`<DATA_DIR>/cli-token-salt.json` (режим `0600`) — а не литерал
`omniroute-cli-auth-v1` који се налази у изворном коду. И `getActiveSalt()` у
`src/lib/machineToken.ts` и његов пандан у `bin/cli/utils/cliToken.mjs` читају
исту датотеку, тако да сервер и свако CLI покретање у оквиру ове инсталације
користе исту вредност; литерал који се налази у изворном коду користи се само као
крајња резервна вредност када још није могуће успоставити трајно сачувану со или
со из окружења (на пример, код свеже инсталације која садржи само CLI, пре него
што је сервер икада покренут). Овим се отклања слабост старе фиксне подразумеване
вредности: `/etc/machine-id` је обично доступан за читање свим корисницима, па би
у супротном сваки локални корисник могао да изведе исти токен за сваку инсталацију
у којој `OMNIROUTE_CLI_SALT` никада није био постављен.

## Ротација соли

Подесите `OMNIROUTE_CLI_SALT` да бисте ротирали изведени токен без измена кода — он
увек има приоритет над сачуваном соли по инсталацији. Након ротације, сви CLI
процеси на овом рачунару аутоматски ће користити нови токен. Корисно након
цурења листе процеса које је можда открило претходну изведену вредност.

```bash
# Трајна ротација (додајте у профил љуске)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Проверите да ли се користи нови токен
omniroute status
```

## Застарели формат (SHA-256, 32 знака) — и даље је прихваћен

Пре горенаведеног HMAC формата, CLI је изводио свој токен као
`SHA-256(machineId + salt).hex[0..32]` (префикс од 32 знака) у
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` у `src/lib/machineToken.ts`).

Ради компатибилности уназад, сервер прихвата **оба** формата: верификатор формира
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` и пореди
долазно заглавље са сваким помоћу `timingSafeEqual`
(`src/server/authz/policies/management.ts` и `src/lib/middleware/cliTokenAuth.ts`).
Дакле, токен је важећи ако се подудара **или** са HMAC сажетком од 64 знака или са
застарелим SHA-256 префиксом од 32 знака.

**Онемогућавање:** подесите `OMNIROUTE_DISABLE_CLI_TOKEN=true` (у окружењу или `.env`) да бисте потпуно
онемогућили механизам CLI токена; тада је за сваки приступ потребан експлицитан API кључ. На хостовима
са више корисника ово се препоручује, јер је `machine-id` везан за уређај (не за корисника), па би други
корисник на истом хосту могао да израчуна исти токен.

## Датотеке

| Датотека                                  | Намена                                    |
| ----------------------------------------- | ----------------------------------------- |
| `src/lib/machineToken.ts`                 | Извођење токена (`getMachineTokenSync`)   |
| `bin/cli/utils/cliToken.mjs`              | CLI копија истог поступка извођења        |
| `<DATA_DIR>/cli-token-salt.json`          | Сачувана насумична со по инсталацији      |
| `src/server/authz/headers.ts`             | Константа `CLI_TOKEN_HEADER`              |
| `src/server/authz/policies/management.ts` | Верификација на страни сервера            |
| `src/server/authz/routeGuard.ts`          | Провера loopback хоста (`isLoopbackHost`) |

## Погледајте и

- `docs/security/ROUTE_GUARD_TIERS.md` — нивои заштите рута
- `docs/architecture/AUTHZ_GUIDE.md` — комплетан ток ауторизације
