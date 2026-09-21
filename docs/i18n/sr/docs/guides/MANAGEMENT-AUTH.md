# Management Authentication (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute има **четири породице акредитива** које могу да ауторизују руте за управљање.
Оне нису међусобно заменљиве. Кључеви API-ја за инференцију (`sk-…`) **не** управљају
сервером осим ако им изричито није додељен опсег `manage` или `admin`.

Канонска имплементација: `src/lib/api/requireManagementAuth.ts`.

| Акредитив                  | Типичан облик                         | Где се креира                                             | Намењена употреба               | Могућности управљања                                                                                   |
| -------------------------- | ------------------------------------- | --------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Dashboard JWT сесија       | `auth_token` колачић                  | Пријављивање на контролну таблу                           | Кориснички интерфејс прегледача | Потпуно управљање преко контролне табле, уз поштовање правила за CSRF, локалност и увек заштићене руте |
| CLI machine-id токен       | интерни / локални                     | Покретање CLI-ја (`omniroute` на истом рачунару)          | Локални CLI                     | Само локално управљање                                                                                 |
| Приступни токен са опсегом | `oma_live_…`                          | **Подешавања → Приступни токени** или `omniroute connect` | Удаљени CLI и API за управљање  | Мора да задовољи опсег `read`, `write` или `admin` који рута захтева                                   |
| Кључ API-ја за инференцију | `sk-…` (и други префикси API кључева) | **Менаџер API-ја / API кључеви**                          | `/v1/*` инференција             | **Нема** осим ако метаподаци кључа садрже `manage` или `admin`                                         |

`oma_` акредитиви су акредитиви за управљање/CLI. Они **нису** кључеви API-ја за инференцију.

Ако је аутентификација пријављивањем/API кључем онемогућена на серверу, неке руте за управљање могу
да прихватају неаутентификоване позиве. Руте које су само локалне и увек заштићене и даље примењују
сопствена правила. Стога навођење једног од ових акредитива није увек
обавезно, а поседовање акредитива није увек довољно без потребног
опсега и одговарајуће локалности руте.

Повезано: [Удаљени режим](./REMOTE-MODE.md) (како се `oma_live_…` издаје за удаљени CLI).

---

## Матрице опсега

Ова два речника опсега су **различита**. Немојте их мешати.

### Опсези приступних токена (`oma_live_…`)

| Опсег   | Типичне операције                                                                            |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | GET захтеви за листе/статусе које токен сме да види                                          |
| `write` | Измене (креирање/ажурирање/брисање) испод администраторског нивоа                            |
| `admin` | Потпуни удаљени CLI / токен за повезивање (подразумевано при иницијализацији помоћу лозинке) |

Токен са опсегом `read` не може да позове руту са опсегом `write`. Облик поруке током извршавања:
`Опсег приступног токена '<have>' није довољан; потребан је '<need>'.`

### Опсези API кључева за управљање

| Опсег    | Значење                                                                            |
| -------- | ---------------------------------------------------------------------------------- |
| (нема)   | Само инференција. Руте за управљање враћају 403.                                   |
| `manage` | API за управљање (иста провера као грана API кључа у `requireManagementAuth`)      |
| `admin`  | Такође задовољава `hasManageScope` (третира се као опсег који омогућава управљање) |

Омогућите `manage` за кључ у корисничком интерфејсу API кључева / Менаџера API-ја. Немојте поново користити
кључ клијента за ћаскање за аутоматизацију осим ако сте му намерно доделили тај опсег.

---

## Како креирати и опозвати

### Dashboard JWT сесија

1. Отворите `/login` и пријавите се лозинком за управљање (`INITIAL_PASSWORD` при првом покретању).
2. Колачић `auth_token` је HttpOnly. Контролна табла у прегледачу га аутоматски користи.
3. Одјавите се путем `/api/auth/logout`. Не постоји дуготрајна тајна коју треба копирати.

### CLI machine-id токен

1. Покрените `omniroute` на **истом хосту** као сервер (loopback).
2. CLI иницијализује machine-id токен у `~/.omniroute/` (chmod 600).
3. Ово **не** функционише са другог рачунара. За удаљени CLI користите приступни токен.

### Приступни токен са опсегом (`oma_live_…`)

1. Контролна табла: **Подешавања → Приступни токени** → креирајте токен (назив + опсег). **Тајна се приказује само једном.**
2. Или CLI: `omniroute connect <host>` (лозинка → токен). Погледајте [Удаљени режим](./REMOTE-MODE.md).
3. Заглавље: `Authorization: Bearer oma_live_…`
4. Опозовите га на истој страници Приступни токени (или избришите CLI контекст).
5. Сервер чува само хеш. Са отвореним текстом поступајте као са лозинком.

### API кључ са опсегом `manage`

1. Контролна табла: **Менаџер API-ја / API кључеви** → креирајте или измените кључ → омогућите `manage` (или `admin`).
2. Заглавље: `Authorization: Bearer sk-…` (стварни префикс кључа).
3. Опозовите кључ или уклоните `manage` у истом корисничком интерфејсу.
4. За аутоматизацију која не користи CLI примените начело најмањих привилегија: за послове који користе само GET захтеве изаберите приступни токен са опсегом `read`; користите `manage` на API кључу само када позивалац мора да комуницира и са `/v1` и са интерфејсом за управљање.

---

## Формат заглавља

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Немојте стављати акредитиве за управљање у путању URL-а или у параметре упита. Аутентификација за управљање дозвољена је само путем заглавља/колачића.

---

## Примери за копирање и лепљење

Само за читање (листа провајдера). Користите приступни токен са опсегом `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Измена (креирање везе са провајдером). Користите приступни токен са опсегом `write`/`admin` или API кључ са опсегом `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Инференција (није управљање). Обичан API кључ; `manage` није потребан:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Тренутне грешке током извршавања (не приказујте тајне)

| Ситуација                                     | Типичан статус | Порука (санитизована)                                                |
| --------------------------------------------- | -------------- | -------------------------------------------------------------------- |
| Нема акредитива                               | 401            | `Authentication required`                                            |
| Неважећи/истекли `oma_live_…`                 | 401            | `Invalid or expired access token`                                    |
| Важећи API кључ без опсега `manage`/`admin`   | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Неважећи обичан API кључ на рути за управљање | 403            | `Invalid management token`                                           |
| Опсег приступног токена је недовољан          | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ значи да токен носиоца **није** прихваћен као акредитив за управљање. Ова порука вам **не** говори коју врсту акредитива треба да генеришете. Користите горњу табелу: кључевима за инференцију потребан је опсег `manage`; удаљеном CLI-ју је потребан `oma_live_…`; контролна табла користи колачић сесије.

---

## Препоручени избор са најмањим привилегијама

| Позивалац                                           | Користите                                           |
| --------------------------------------------------- | --------------------------------------------------- |
| Прегледач                                           | Сесију контролне табле                              |
| CLI на хосту сервера                                | Машински токен                                      |
| CLI на лаптопу који комуницира са удаљеним сервером | `oma_live_…` из `omniroute connect`                 |
| CI / скрипте (само за управљање)                    | `oma_live_…` са најмањим опсегом који функционише   |
| CI који мора да позива и `/v1` и `/api`             | API кључ са опсегом `manage` **или** два акредитива |
