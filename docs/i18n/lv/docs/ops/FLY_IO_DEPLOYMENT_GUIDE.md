# FLY_IO_DEPLOYMENT_GUIDE (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute Fly.io izvietošanas rokasgrāmata"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Fly.io izvietošanas rokasgrāmata

Šis dokuments apraksta faktisko OmniRoute izvietošanas procesu Fly.io, aptverot divus scenārijus:

- Pašreizējā projekta pirmā reize izvietošana Fly.io
- Turpmāko kodu atjauninājumu publicēšana
- Jauni projekti, kas seko tam pašam izvietošanas darbam

Šī rokasgrāmata ir balstīta uz pašreizējam projektam verificētu darba konfigurāciju. Lietotnes nosaukums ir `omniroute`.

---

## 1. Izvietošanas mērķi

- Platforma: Fly.io
- Izvietošanas metode: Lokālais `flyctl` tiešais publicēšanas
- Izpildlaids: Esošo `Dockerfile` un `fly.toml` izmantošana repozitorijā
- Datu noturība: Fly Volume montēts uz `/data`
- Piekļuves URL: `https://omniroute.fly.dev/`

---

## 2. Pašreizējā projekta galvenā konfigurācija

Pašreizējā repozitorija `fly.toml` ir apstiprināts, ka satur šādus galvenos elementus:

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

Piezīmes:

- `app = 'omniroute'` nosaka, uz kuru Fly lietotni izvietošana ir vērsta
- `destination = '/data'` nosaka noturīgā sējuma montēšanas direktoriju
- Šim projektam jāiestata `DATA_DIR=/data`, pretējā gadījumā datubāze un atslēgas tiks rakstītas konteinera pagaidu direktorijā

---

## 3. Priekšnosacījumi

### 3.1 Fly CLI instalēšana

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Ja instalēšanas skripts jūsu vidē neizdodas, varat arī lejupielādēt `flyctl` bināro failu un pievienot to savai `PATH`.

### 3.2 Piesakieties savā Fly kontā

```powershell
flyctl auth login
```

### 3.3 Pārbaudiet pierakstīšanās statusu

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Pašreizējā projekta pirmā izvietošana

### 4.1 Klonējiet kodu un ieejiet direktorijā

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Apstipriniet lietotnes nosaukumu

Atveriet `fly.toml` un pārbaudiet šādu rindu:

```toml
app = 'omniroute'
```

Ja izvietojat savā jaunajā lietotnī, varat to mainīt uz globāli unikālu nosaukumu, piemēram:

```toml
app = 'omniroute-yourname'
```

Piezīme:

- Pārliecinieties, ka konsolē redzamā lietotne atbilst `fly.toml` esošajai `app` vērtībai
- Ja iepriekš esat izmantojis citu nosaukumu, piemēram, `oroute`, nesajauciet to ar `omniroute`

### 4.3 Izveidojiet lietotni

Ja lietotne vēl nepastāv:

```powershell
flyctl apps create omniroute
```

Ja mainījāt lietotnes nosaukumu, aizstājiet `omniroute` ar izvēlēto nosaukumu.

### 4.4 Pirmā izvietošana

```powershell
flyctl deploy
```

---

## 5. Nepieciešamie parametri

Šis projekts iesaka konfigurēt vismaz šādus parametrus Fly.io.

### 5.1 Verificēti parametri

Šie parametri ir izmantoti faktiskajās izvietošanās pašreizējā `omniroute` lietotnē:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (nepieciešams ražošanā — tiek izmantots WebSocket tilta autentifikācijai)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 Par `INITIAL_PASSWORD`

Pašreizējais projekts neiestata `INITIAL_PASSWORD`, jo šai izvietošanai tas nav nepieciešams.

Ja tas nav iestatīts:

- Sākuma žurnālā tiks norādīts, ka noklusējuma parole ir `CHANGEME`
- Pēc izvietošanas pēc iespējas ātrāk jāmaina pierakstīšanās parole sistēmas iestatījumos

Ja vēlaties inicializēt aizmugures parole bez uzraudzības, varat to pievēlāk:

- `INITIAL_PASSWORD`

## 6. Ieteiktie parametri

### 6.1 Noslēpumu konfigurācija

Šādas mainīgās vērtības ir ieteiktas Fly noslēpumiem:

| Mainīgais                             | Ieteikums         | Apraksts                                                    |
| ------------------------------------- | ----------------- | ----------------------------------------------------------- |
| `API_KEY_SECRET`                      | Obligāti          | Tiek izmantota API atslēgas ģenerēšanai un validācijai      |
| `JWT_SECRET`                          | Obligāti          | Tiek izmantota pieteikšanās sesijām un JWT parakstīšanai    |
| `OMNIROUTE_WS_BRIDGE_SECRET`          | Obligāti ražošanā | WebSocket tilta autentifikācijas noslēpums                  |
| `STORAGE_ENCRYPTION_KEY`              | Stingri ieteicams | Šifrē sensitīvu savienojuma informāciju miera stāvoklī      |
| `MACHINE_ID_SALT`                     | Ieteicams         | Ģenerē stabilu mašīnas identifikatoru                       |
| `INITIAL_PASSWORD`                    | Pēc izvēles       | Iestata sākotnējo aizmugures paroli pirmreizējā deplojēšanā |
| OAuth/API privātie akreditācijas dati | Pēc vajadzības    | Ārējās platformas autentifikācijas konfigurācija            |

### 6.2 Pašreizējam projektam ieteicamās vērtības

| Mainīgais              | Ieteicamā vērtība           |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Piezīmes:

- `DATA_DIR=/data` ir kritiski svarīgs, un tam jāatbilst Fly Volume montēšanas punktam
- `NEXT_PUBLIC_BASE_URL` tiek izmantots plānotājam, priekšpuses atzvanīšanām un līdzīgām situācijām

### 6.3 OAuth atzvanīšanas URL konfigurācija

Ja jums ir jāaktivē OAuth balstīti pakalpojumu sniedzēji (piemēram, Antigravity, Gemini, Cursor) Fly.io deplojēšanā, pārliecinieties par šiem diviem punktiem:

1. **Iestatiet `NEXT_PUBLIC_BASE_URL` uz savu publisko HTTPS domēnu**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Ja izmantojat pielāgotu domēnu, aizstājiet to ar atbilstošo domēnu (piemēram, `https://omniroute.yourdomain.com`).

2. **Konfigurējiet atzvanīšanas URL pakalpojumu sniedzāja konsolē**

   Visi OAuth pakalpojumu sniedzēji izmanto vienu atzvanīšanas ceļu `/callback` — nav nekāda atsevišķa atzvanīšanas maršruta katram pakalpojumu sniedzējam:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Piemēram, neatkarīgi no Gemini, Antigravity, Cursor vai GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Ja `NEXT_PUBLIC_BASE_URL` neatbilst pakalpojumu sniedzājam reģistrētajam atzvanīšanas URL, OAuth plūsma neizdosies pārlūka novirzīšanas solī.

---

## 7. Noslēpumu iestatīšana ar vienu komandu

Šādas komandas ģenerē drošas nejaušas vērtības un vienā solī ieraksta visus obligātos parametrus pašreizējam projektam Fly noslēpumos.

Piezīmes:

- Neietver `INITIAL_PASSWORD`
- Domāts pašreizējam projektam `omniroute`

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

Linux/macOS vidē varat arī izmantot `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Piezīmes:

- `OMNIROUTE_WS_BRIDGE_SECRET` ir obligāti ražošanā; tā trūkums pārtrauks WebSocket tilta rokasspiedienu

Ja vēlaties arī iestatīt sākotnējo paroli:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Pašreizējo parametru skatīšana

```powershell
flyctl secrets list -a omniroute
```

Ja konsoles lapā `Secrets` nav redzami gaidītie mainīgie, pārbaudiet:

- Vai skatāt lietojumprogrammu `omniroute`
- Vai `app` vērtība `fly.toml` failā atbilst konsolei redzamajai lietojumprogrammai

---

## 9. Turpmākie atjauninājumi un laidieni

Pēc koda atjaunināšanas laidiena process ir vienkāršs:

```powershell
git pull
flyctl deploy
```

Ja nepieciešams atjaunināt tikai parametrus, nemainot kodu:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly automātiski veiks mašīnu rotācijas atjaunināšanu.

### 9.1 Upstream repozitorija atjauninājumu izsekošana, saglabājot jūsu dakšas `fly.toml`

Ja pašreizējais repozijs ir dakša un vēlaties sinhronizēt atjauninājumus no upstream `https://github.com/diegosouzapw/OmniRoute`, sekojiet zemāk aprakstītajai darbplūsmai.

Vispirms pārbaudiet savus attālinātos repozitorijus:

```powershell
git remote -v
```

Jums vajadzētu redzēt vismaz:

- `origin`, kas norāda uz jūsu paša dakšu
- `upstream`, kas norāda uz sākotnējo repozitoriju

Ja `upstream` nav konfigurēts, pievienojiet to:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Pirms sinhronizēšanas ar upstream, izvelciet jaunākos kommitus un tagus:

```powershell
git fetch upstream --tags
```

Pārbaudiet pašreizējo versiju un upstream tagus:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Piezīme: Pašreizējā projekta versija ir `v3.8.0`. Tālāk minētie `v3.4.7` piemēri tiek saglabāti tikai kā vēsturiski piemēmi. Faktiskiem laidieniem izmantojiet `:latest` vai pašreizējās versijas tagu (piemēram, `:v3.8.0`).

Ja vēlaties apvienot jaunāko upstream `main`, bet arī piespiedu kārtā saglabāt savas dakšas `fly.toml`, sekojiet šai darbplūsmai:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Piezīmes:

- `git merge upstream/main` sinhronizē jaunāko kodu no sākotnējā repozitorija
- `git checkout HEAD~1 -- fly.toml` atjauno jūsu dakšas pašu `fly.toml` no pirms apvienošanas
- Ja upstream nemainīja `fly.toml`, šis solis neieviesīs nekādas atšķirības
- Ja upstream mainīja `fly.toml`, šis solis nodrošina, ka jūsu Fly lietojumprogrammas nosaukums, sējuma montēšanas vieta, reģions un citas dakšai specifiskās deplojuma konfigurācijas netiek pārrakstītas

Ja vēlaties pieskaņoties konkrētam laidiena tagam (piemēram, `v3.4.7`), vispirms pārbaudiet, vai tags jau ir iekļauts `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Veiksmīga atgriezeniskā vērtība nozīmē, ka `upstream/main` jau satur šo versiju; varat vienkārši apvienot `upstream/main`.

### 9.2 Standarta laidiena secība pēc upstream sinhronizēšanas

Pēc sinhronizēšanas ar sākotnējo repozitoriju, sekojiet šim ieteicamajam laidiena secībai:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Atjaunojiet dakšas `fly.toml`
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Šī ir faktiskā darbplūsma, ko izmantoja, atjauninot pašreizējo projektu līdz `v3.4.7` (piemērs attiecas uz vēsturisku versiju; pašreizējā faktiskā versija ir `v3.8.0`).

---

## 10. Pārbaudes Pēc Ieviešanas

### 10.1 Pārbaudīt Lietojumprogrammas Statusu

```powershell
flyctl status -a omniroute
```

### 10.2 Skatīt Startēšanas Žurnālus

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Pārbaudīt Vietnes Pieejamību

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

Atgrieztā vērtība `200` norāda, ka vietne atbild normāli.

---

## 11. Panākumu Rādītāji

Pēc veiksmīgas ieviešanas žurnālā jāparādās līdzīgam saturam:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Šie divi punkti ir kritiski:

- `/data/server.env` apstiprina, ka izpildlaika noslēpumi ir ierakstīti pastāvīgajā sējumā
- `/data/storage.sqlite` apstiprina, ka datubāze ir ierakstīta pastāvīgajā sējumā

Ja redzat `/app/data/...` vietā, `DATA_DIR` ir nepareizi konfigurēts, un tas nekavējoties jāizlabo.

---

## 12. Biežākās Problemas

### 12.1 `Secrets` lapā ir tukšs

Parasti ir divi iemesli:

- Vēl neesat izpildījis `flyctl secrets set`
- Skatāties citu lietojumprogrammu (piem., `oroute` vietā `omniroute`)

### 12.2 `flyctl deploy` ziņo `app not found`

Vispirms izveidojiet lietojumprogrammu:

```powershell
flyctl apps create omniroute
```

### 12.3 `fly.toml` parsēšana neizdodas

Pārbaudiet šādus punktus:

- Vai komentāros ir garlaicīgas rakstzīmes
- Vai TOML citēšana un atkāpes ir pareizas

### 12.4 Dati netiek saglabāti

Pārbaudiet abus šos punktus:

- `fly.toml` satur `destination = '/data'`
- `DATA_DIR` ir iestatīts uz `/data`

### 12.5 Vai tas var darboties bez `INITIAL_PASSWORD`?

Jā, tas var darboties. Tas atkāpsies uz noklusējuma paroli `CHANGEME`. Ražošanas vidē ieteicams pēc iespējas ātrāk mainīt aizmugures servera paroli.

---

## 13. Atkārtota Izmantošana Jauniem Projektiem

Ja ieviešat jaunu projektu, sekojot šim dokumentam, jums jāmaina tikai šādi vienumi:

1. Mainiet `app` vērtību `fly.toml`
2. Mainiet `NEXT_PUBLIC_BASE_URL`
3. Saglabājiet `DATA_DIR=/data`
4. Wgenērējiet `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` un `STORAGE_ENCRYPTION_KEY` no jauna
5. Pēc pirmās ieviešanas pārbaudiet, vai žurnāli tiek rakstīti `/data`

Neizmantojiet atkārtoti atslēgas no iepriekšējā projekta.

---

## 14. Minimālais Izlaižu Kontroles Saraksts Pašreizējam Projektam

Visbiežāk izmantotās komandas turpmākām izlaidēm ir:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Parastai izlaidumai galvenā komanda ir vienkārši:

```powershell
flyctl deploy
```

Pirmajai ieviešanai jaunā vidē galvenie soļi ir:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
