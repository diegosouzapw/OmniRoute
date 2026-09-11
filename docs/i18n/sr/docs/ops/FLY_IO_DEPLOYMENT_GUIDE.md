# FLY_IO_DEPLOYMENT_GUIDE (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute Fly.io водич за деплојмент"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Fly.io водич за деплојмент

Овај документ описује стварни процес деплојмента OmniRoute-а на Fly.io, покривајући два сценарија:

- Деплојмент тренутног пројекта на Fly.io по први пут
- Објављивање наредних ажурирања кода
- Нови пројекти који прате исти ток деплојмента

Овај водич је заснован на верифицираној, функционалној конфигурацији за тренутни пројекат. Назив апликације је `omniroute`.

---

## 1. Циљеви деплојмента

- Платформа: Fly.io
- Метод деплојмента: Локално директно објављивање путем `flyctl`
- Runtime: Коришћење постојећег `Dockerfile` и `fly.toml` из репозиторијума
- Перзистенција података: Fly Volume монтиран на `/data`
- URL за приступ: `https://omniroute.fly.dev/`

---

## 2. Кључна конфигурација тренутног пројекта

Потврђено је да `fly.toml` у тренутном репозиторијуму садржи следеће кључне ставке:

```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
  source = 'data'
  destination = '/data'

[processes]
  app = 'node run-standalone.mjs'

[http_service]
  internal_port = 20128

[env]
  TZ = "Asia/Shanghai"
  HOST = "0.0.0.0"
  HOSTNAME = "0.0.0.0"
  BIND = "0.0.0.0"
```

Напомене:

- `app = 'omniroute'` одређује за коју Fly апликацију се врши деплојмент
- `destination = '/data'` одређује директоријум за монтирање перзистентног волумена
- Овај пројекат мора имати подешено `DATA_DIR=/data`, у супротном ће база података и кључеви бити уписивани у привремени директоријум контејнера

---

## 3. Предуслови

### 3.1 Инсталирање Fly CLI-а

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Ако инсталационa скрипта не успе у вашем окружењу, можете и ручно преузети `flyctl` извршну датотеку и додати је у `PATH`.

### 3.2 Пријава на ваш Fly налог

```powershell
flyctl auth login
```

### 3.3 Верификација статуса пријаве

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Прво деплојовање тренутног пројекта

### 4.1 Клонирање кода и улазак у директоријум

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Потврда назива апликације

Отворите `fly.toml` и потврдите следећу линију:

```toml
app = 'omniroute'
```

Ако вршите деплојмент на своју нову апликацију, можете га променити у глобално уникатан назив, на пример:

```toml
app = 'omniroute-yourname'
```

Напомена:

- Уверите се да апликација коју видите у консоли одговара вредности `app` у `fly.toml`
- Ако сте претходно користили другачији назив, на пример `oroute`, не мешајте га са `omniroute`

### 4.3 Креирање апликације

Ако апликација још не постоји:

```powershell
flyctl apps create omniroute
```

Ако сте променили назив апликације, замените `omniroute` својим избраним називом.

### 4.4 Прво деплојовање

```powershell
flyctl deploy
```

---

## 5. Обавезни параметри

Овај пројекат препоручује конфигурисање бар следећих параметара на Fly.io.

### 5.1 Верификовани параметри

Ови параметри су коришћени у стварним деплојментима на тренутној `omniroute` апликацији:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (обавезан у продукцији — користи се за аутентикацију WebSocket bridge-а)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 О `INITIAL_PASSWORD`

Тренутни пројекат не поставља `INITIAL_PASSWORD` јер овај деплојмент то не захтева.

Ако није постављен:

- Лог покретања ће назначити да је подразумевана лозинка `CHANGEME`
- Требало би што пре након деплојмента да промените лозинку за пријаву у системским подешавањима

Ако желите да иницијализујете backend лозинку без интеракције, можете је накнадно додати:

- `INITIAL_PASSWORD`

---

## 6. Preporučeni parametri

### 6.1 Konfiguracija tajni (Secrets)

Sledeće promenljive se preporučuju za Fly Secrets:

| Promenljiva                   | Preporuka             | Opis                                                         |
| ----------------------------- | --------------------- | ------------------------------------------------------------ |
| `API_KEY_SECRET`              | Obavezno              | Koristi se za generisanje i validaciju API Key-a             |
| `JWT_SECRET`                  | Obavezno              | Koristi se za sesije prijave i JWT potpisivanje              |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Obavezno u produkciji | Tajni ključ za autentifikaciju WebSocket mosta               |
| `STORAGE_ENCRYPTION_KEY`      | Snažno preporučeno    | Šifruje osetljive informacije o konekciji u stanju mirovanja |
| `MACHINE_ID_SALT`             | Preporučeno           | Generiše stabilan identifikator mašine                       |
| `INITIAL_PASSWORD`            | Opciono               | Postavlja početnu lozinku za backend prilikom prvog deploja  |
| OAuth/API privatni akreditivi | Po potrebi            | Konfiguracija autentifikacije eksterne platforme             |

### 6.2 Preporučene vrednosti za trenutni projekat

| Promenljiva            | Preporučena vrednost        |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Napomene:

- `DATA_DIR=/data` je kritično i mora se poklapati sa tačkom montiranja Fly Volume-a
- `NEXT_PUBLIC_BASE_URL` se koristi za scheduler, frontend callback-ove i slične scenarije

### 6.3 Konfiguracija OAuth Callback URL-a

Ako je potrebno omogućiti OAuth-bazirane provajdere (npr. Antigravity, Gemini, Cursor) na Fly.io deploju, obavezno vodite računa o sledeća dva stvari:

1. **Postavite `NEXT_PUBLIC_BASE_URL` na vaš javni HTTPS domen**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Ako koristite prilagođeni domen, zamenite ga odgovarajućim domenom (npr. `https://omniroute.yourdomain.com`).

2. **Konfigurišite callback URL na konzoli provajdera**

   Svi OAuth provajderi dele jednu zajedničku callback putanju `/callback` — NE postoji zasebna callback ruta po provajderu:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Na primer, bez obzira da li je Gemini, Antigravity, Cursor ili GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Ako se `NEXT_PUBLIC_BASE_URL` ne poklapa sa callback URL-om registrovanim kod provajdera, OAuth proces će propasti u koraku preusmeravanja pregledača.

---

## 7. Podešavanje tajni jednom komandom

Sledeće komande generišu sigurne nasumične vrednosti i u jednom koraku upisuju sve potrebne parametre za trenutni projekat u Fly Secrets.

Napomene:

- Ne uključuje `INITIAL_PASSWORD`
- Namenjeno za trenutni projekat `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$wsBridgeSecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  OMNIROUTE_WS_BRIDGE_SECRET=$wsBridgeSecret `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

Na Linux / macOS sistemima, možete koristiti i `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Napomene:

- `OMNIROUTE_WS_BRIDGE_SECRET` je obavezno u produkciji; njegovo izostavljanje će poremetiti handshake WebSocket mosta

Ako želite da postavite i početnu lozinku:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Прегледање тренутних параметара

```powershell
flyctl secrets list -a omniroute
```

Ако страница `Secrets` у конзоли не приказује очекиване променљиве, провери:

- Да гледаш апликацију `omniroute`
- Да вредност `app` у `fly.toml` одговара апликацији у конзоли

---

## 9. Наредна ажурирања и издања

Након ажурирања кода, процес издавања је једноставан:

```powershell
git pull
flyctl deploy
```

Ако треба само да ажурираш параметре без промене кода:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly ће аутоматски извршити тзв. rolling update машина.

### 9.1 Праћење ажурирања из upstream репозиторијума уз задржавање `fly.toml` из твог форка

Ако је тренутни репозиторијум форк и желиш да синхронизујеш ажурирања из upstream репозиторијума `https://github.com/diegosouzapw/OmniRoute`, следи ток рада испод.

Прво, провери своје remote-ове:

```powershell
git remote -v
```

Требало би да видиш бар:

- `origin` који показује на твој сопствени форк
- `upstream` који показује на оригинални репозиторијум

Ако `upstream` није подешен, додај га:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Пре синхронизације са upstream, преузми најновије commit-ове и тагове:

```powershell
git fetch upstream --tags
```

Провери тренутну верзију и upstream тагове:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Напомена: Тренутна верзија пројекта је `v3.8.0`. Референце на `v3.4.7` испод су задржане само као историјски пример. За стварна издања, користи `:latest` или ознаку тренутне верзије (нпр. `:v3.8.0`).

Ако желиш да спојиш најновији upstream `main`, а истовремено принудно задржиш `fly.toml` из твог форка, следи овај ток рада:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Напомене:

- `git merge upstream/main` синхронизује најновији код из оригиналног репозиторијума
- `git checkout HEAD~1 -- fly.toml` враћа сопствени `fly.toml` из твог форка од пре спајања
- Ако upstream није изменио `fly.toml`, овај корак неће донети никакве разлике
- Ако je upstream изменио `fly.toml`, овај корак осигурава да назив твоје Fly апликације, монтирање volume-а, регион и остала подешавања специфична за твој форк не буду прегажена

Ако желиш да усагласиш са одређеним release тагом (нпр. `v3.4.7`), прво провери да ли је тај таг већ укључен у `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Успешан повратак значи да `upstream/main` већ садржи ту верзију; тада можеш једноставно спојити `upstream/main`.

### 9.2 Стандардни редослед издавања након синхронизације са upstream

Након синхронизације са оригиналним репозиторијумом, следи овај препоручени редослед издавања:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Врати `fly.toml` из форка
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Ово је стварни ток рада који је коришћен приликом надоградње тренутног пројекта на `v3.4.7` (пример се односи на историјску верзију; тренутна стварна верзија је `v3.8.0`).

---

## 10. Провере после деплоја

### 10.1 Провера статуса апликације

```powershell
flyctl status -a omniroute
```

### 10.2 Преглед логова покретања

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Провера доступности сајта

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

Повратна вредност `200` указује да сајт нормално одговара.

---

## 11. Индикатори успеха

Након успешног деплоја, логови би требало да прикажу садржај сличан овом:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Ове две тачке су кључне:

- `/data/server.env` потврђује да су runtime тајне записане на трајни volume
- `/data/storage.sqlite` потврђује да је база података записана на трајни volume

Ако уместо тога видите `/app/data/...`, то значи да `DATA_DIR` није правилно подешен и мора се одмах исправити.

---

## 12. Честе грешке

### 12.1 Страница `Secrets` је празна

Обично постоје два разлога:

- Још нисте покренули `flyctl secrets set`
- Гледате другу апликацију (нпр. `oroute` уместо `omniroute`)

### 12.2 `flyctl deploy` пријављује `app not found`

Прво креирајте апликацију:

```powershell
flyctl apps create omniroute
```

### 12.3 Парсирање `fly.toml` не успева

Провери следеће:

- Да ли постоје неисправни знакови у коментарима
- Да ли су TOML наводници и увлачење исправни

### 12.4 Подаци се не задржавају

Провери оба следећа услова:

- `fly.toml` садржи `destination = '/data'`
- `DATA_DIR` је подешен на `/data`

### 12.5 Да ли може да ради без `INITIAL_PASSWORD`?

Да, може да ради. Пребацује се на подразумевану лозинку `CHANGEME`. Препоручује се да што пре промените backend лозинку у продукцији.

---

## 13. Поновна употреба за нове пројекте

Ако постављате нови пројекат пратећи овај документ, потребно је да промените само ове ставке:

1. Промените вредност `app` у `fly.toml`
2. Промените `NEXT_PUBLIC_BASE_URL`
3. Задржите `DATA_DIR=/data`
4. Поново генеришите `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` и `STORAGE_ENCRYPTION_KEY`
5. Након првог деплоја, проверите да се логови записују у `/data`

Не користите поново кључеве из претходног пројекта.

---

## 14. Минималиста листа за проверу пре објављивања за тренутни пројекат

Најчешће коришћене команде за наредна издавања су:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

За обично издавање, основна команда је једноставно:

```powershell
flyctl deploy
```

За прво постављање у новом окружењу, основни кораци су:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
