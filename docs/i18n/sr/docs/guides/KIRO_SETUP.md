# Kiro Setup Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇧🇦 [bs](../../../bs/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Овај водич објашњава како да додате Kiro налоге (AI помоћник за програмирање који хостује AWS) у OmniRoute,
са нагласком на истовремено коришћење више налога без сукоба сесија.

---

## Позадина: Зашто може доћи до сукоба Kiro налога

Kiro позадински систем користи регистрације AWS SSO OIDC клијената за праћење активних сесија.
Кључно ограничење је: **свака регистрација OIDC клијента подржава само једну активну
сесију истовремено**. Када се други уређај или корисник аутентификује помоћу истог
регистрованог клијента, позадински систем поништава токен за освежавање првог налога.

То је исти механизам који изазива проблеме када се `kiro-cli login` покрене на
рачунару на којем је већ пријављен други Kiro налог — нова пријава опозива
токен првог налога.

---

## Како OmniRoute решава овај проблем (v3.8.0+)

Почев од v3.8.0, OmniRoute позива `registerClient()` (AWS SSO OIDC) приликом сваког
увоза Kiro везе. На тај начин свака OmniRoute веза добија сопствену наменску регистрацију
OIDC клијента. Пошто је свака регистрација клијента независна, освежавање или
поновна аутентификација једног налога не утиче на токен за освежавање било ког другог налога.

Изолација се примењује на методе увоза токена за освежавање, док аутентификација API кључем
у потпуности избегава OIDC сесије за освежавање:

| Метод увоза                                          | Статус изолације                                                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Ток кода уређаја за AWS Builder ID / IDC             | Изолован од увођења тока кода уређаја                                                              |
| **Увоз токена** (ручно уношење токена за освежавање) | Изолован од v3.8.0                                                                                 |
| **Пријава преко Google / GitHub налога**             | Изолована од v3.8.0                                                                                |
| **Аутоматски увоз** (kiro-cli SQLite)                | Изолован од v3.8.0 (SQLite путања је већ била изолована; резервни SSO кеш је сада такође изолован) |
| **API кључ** (дуготрајни CodeWhisperer кључ)         | Нема сесије за освежавање; кључ се проверава и чува као акредитив за приступ типа bearer           |

---

## Напомена о миграцији за везе направљене пре v3.8.0

Везе увезене пре v3.8.0 немају наменску регистрацију OIDC клијента
сачувану у `providerSpecificData`. Ове везе настављају да раде, али користе дељену
крајњу тачку за освежавање друштвене аутентификације, што значи да две такве везе и даље могу међусобно да пониште
токене.

**Да бисте добили изолацију:** избришите стару везу преко **Контролна табла → Провајдери** и
поново је увезите користећи било који од подржаних токова увоза. Све новонаправљене везе ће
аутоматски добити сопствену регистрацију клијента.

---

## Додавање два Kiro налога једног поред другог

### Предуслови

- OmniRoute v3.8.0 или новији.
- Активан Kiro налог (имејл адреса + лозинка или пријава преко Google или GitHub налога).
- Опционално, други Kiro налог.

### Корак 1: Увезите први налог

1. Отворите **Контролна табла → Провајдери → Додај провајдера → Kiro**.
2. Изаберите једну од следећих опција:
   - **Увоз токена** — налепите токен за освежавање који почиње са `aorAAAAAG`.
   - **API кључ** — налепите дуготрајни Kiro / CodeWhisperer API кључ.
   - **Пријава преко Google / GitHub налога** — довршите OAuth ток у прегледачу.
   - **Аутоматски увоз** — кликните на дугме; OmniRoute чита акредитиве из
     локалне kiro-cli базе података или `~/.aws/sso/cache`.
3. Веза се чува. Токови са токеном за освежавање аутоматски региструју наменски
   OIDC клијент. Токови са API кључем проверавају кључ преко AWS-а и не чувају токен за освежавање.

### Корак 2: Увезите други налог

Поновите корак 1 за други налог. Пошто сваки увоз креира засебну регистрацију OIDC
клијента, две везе су потпуно изоловане.

### Корак 3: Проверите да ли су обе везе активне

1. **Контролна табла → Провајдери** — обе Kiro везе треба да приказују статус **Активно**.
2. **Контролна табла → Стање система** — обе везе треба успешно да прођу проверу исправности токена.

### Корак 4: Користите комбинацију за усмеравање између налога

Направите комбинацију са обе везе као одредиштима да бисте распоређивали оптерећење или прелазили на резервну везу:

```
kiro/kiro-dev → kiro/kiro-pro
```

Погледајте [FEATURES.md](./FEATURES.md) и документацију о усмеравању за подешавање комбинације.

---

## Корисници Enterprise / IDC налога

За AWS IAM Identity Center (IDC) налоге користите ток **AWS Builder ID / IDC кода уређаја**
у одељку **Контролна табла → Добављачи → Kiro → Код уређаја**. Ток кода уређаја је
одувек био потпуно изолован. За ове везе није потребан поновни увоз.

Enterprise корисници који раде у AWS региону који није подразумевани могу да наведу регион
при увозу преко Import Token API-ја:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Ако је изостављено, поље `region` подразумевано има вредност `us-east-1`.

---

## Ток увоза API кључа

Аутентификација API кључем намењена је дуготрајним Kiro / AWS CodeWhisperer bearer акредитивима. Она
не користи OAuth освежавање и тиме избегава поништавање дељене OIDC сесије.

### Контролна табла

1. Отворите **Контролна табла -> Добављачи -> Kiro**.
2. Изаберите **API кључ**.
3. Налепите API кључ и опционални AWS регион (подразумевано је `us-east-1`).
4. OmniRoute проверава кључ и чува везу.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Интерни уговор

API рута проверава кључ позивањем `KiroService.validateApiKey()`, који
користи `ListAvailableProfiles` у односу на CodeWhisperer/Amazon Q
крајњу тачку која одговара региону и разрешава `profileArn`.

Сачувана веза користи:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Током извршавања, `KiroExecutor.buildHeaders()` шаље кључ као
`Authorization: Bearer <key>` и додаје `tokentype: API_KEY`. Позиви за квоту/профил
користе исту ознаку како би AWS третирао bearer као дуготрајни API кључ, а не
као OIDC или токен за приступ преко друштвених налога.

---

## Истек OIDC клијента

AWS SSO OIDC јавни клијенти обично истичу након 90 дана
(`clientSecretExpiresAt`). OmniRoute чува ову временску ознаку у `providerSpecificData`
ради опсервабилности. Ако веза престане да се освежава након приближно 90 дана, поново
увезите везу да бисте добили нову регистрацију OIDC клијента. Аутоматска поновна регистрација
по истеку планирана је као будуће унапређење.

Везе са API кључем немају истек OIDC клијента зато што се не освежавају
преко AWS SSO OIDC-а.

---

## Решавање проблема

### Други налог се стално одјављује

- Проверите обе везе у одељку **Контролна табла → Добављачи** и потврдите да свака приказује вредност
  `clientId` која није null у свом необрађеном JSON-у (видљивом преко иконе за информације). Ако било којој вези недостаје
  `clientId`, увезена је пре v3.8.0 — поново је увезите.

### Увоз не успева уз поруку „Token validation failed“

- Уверите се да токен за освежавање почиње са `aorAAAAAG`.
- Уверите се да OmniRoute може да приступи адреси `https://oidc.us-east-1.amazonaws.com` (или подешеном
  региону). Ако сте иза корпоративног проксија, подесите прокси на нивоу добављача у
  одељку **Контролна табла → Подешавања → Проксији**.

### Увоз API кључа не успева

- Потврдите да је кључ Kiro / CodeWhisperer API кључ, а не токен за освежавање.
- Потврдите да AWS регион одговара кључу/налогу. `us-east-1` је подразумевана вредност.
- Кључ мора бити у могућности да позове `ListAvailableProfiles`; у супротном OmniRoute не може
  да разреши потребни `profileArn`.

За друге проблеме погледајте главни документ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
