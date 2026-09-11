# FLY_IO_DEPLOYMENT_GUIDE (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute diegimo Fly.io vadovas"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute diegimo Fly.io vadovas

Šiame dokumente aprašomas faktinis „OmniRoute“ diegimo procesas Fly.io platformoje, apimantis šiuos scenarijus:

- Dabartinio projekto diegimas Fly.io platformoje pirmą kartą
- Vėlesnių kodo naujinimų publikavimas
- Nauji projektai, kuriuose naudojama tokia pati diegimo eiga

Šis vadovas parengtas remiantis patikrinta ir veikiančia dabartinio projekto konfigūracija. Programos pavadinimas yra `omniroute`.

---

## 1. Diegimo tikslai

- Platforma: Fly.io
- Diegimo būdas: tiesioginis publikavimas naudojant vietinį `flyctl`
- Vykdymo aplinka: naudojami saugykloje esantys `Dockerfile` ir `fly.toml`
- Duomenų išsaugojimas: „Fly Volume“ tomas prijungiamas prie `/data`
- Prieigos URL: `https://omniroute.fly.dev/`

---

## 2. Pagrindinė dabartinio projekto konfigūracija

Patvirtinta, kad dabartinės saugyklos faile `fly.toml` yra šie pagrindiniai elementai:

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

Pastabos:

- `app = 'omniroute'` nustato, kuriai „Fly“ programai skirtas diegimas
- `destination = '/data'` nustato nuolatinio tomo prijungimo katalogą
- Šiame projekte būtina nustatyti `DATA_DIR=/data`, antraip duomenų bazė ir raktai bus įrašyti į laikinąjį konteinerio katalogą

---

## 3. Būtinosios sąlygos

### 3.1 „Fly CLI“ diegimas

„Windows PowerShell“:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Jei diegimo scenarijus jūsų aplinkoje neveikia, taip pat galite rankiniu būdu atsisiųsti `flyctl` dvejetainį failą ir įtraukti jį į savo `PATH`.

### 3.2 Prisijungimas prie „Fly“ paskyros

```powershell
flyctl auth login
```

### 3.3 Prisijungimo būsenos tikrinimas

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Pirmasis dabartinio projekto diegimas

### 4.1 Klonuokite kodą ir pereikite į katalogą

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Patvirtinkite programos pavadinimą

Atidarykite `fly.toml` ir patikrinkite šią eilutę:

```toml
app = 'omniroute'
```

Jei diegiate savo naują programą, galite pakeisti pavadinimą į visuotinai unikalų, pavyzdžiui:

```toml
app = 'omniroute-yourname'
```

Pastaba:

- Įsitikinkite, kad valdymo pulte rodomos programos pavadinimas sutampa su `app` reikšme faile `fly.toml`
- Jei anksčiau naudojote kitą pavadinimą, pavyzdžiui, `oroute`, nepainiokite jo su `omniroute`

### 4.3 Sukurkite programą

Jei programa dar neegzistuoja:

```powershell
flyctl apps create omniroute
```

Jei pakeitėte programos pavadinimą, pakeiskite `omniroute` savo pasirinktu pavadinimu.

### 4.4 Pirmasis diegimas

```powershell
flyctl deploy
```

---

## 5. Privalomi parametrai

Šiame projekte rekomenduojama Fly.io platformoje sukonfigūruoti bent šiuos parametrus.

### 5.1 Patikrinti parametrai

Šie parametrai buvo naudojami faktiškai diegiant dabartinę `omniroute` programą:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (privalomas produkcinėje aplinkoje — naudojamas „WebSocket“ tilto autentifikavimui)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 Apie `INITIAL_PASSWORD`

Dabartiniame projekte `INITIAL_PASSWORD` nenustatytas, nes šiam diegimui jis nereikalingas.

Jei jis nenustatytas:

- Paleidimo žurnale bus nurodyta, kad numatytasis slaptažodis yra `CHANGEME`
- Po diegimo turėtumėte kuo greičiau pakeisti prisijungimo slaptažodį sistemos nustatymuose

Jei norite automatiškai inicijuoti serverio slaptažodį, vėliau galite pridėti:

- `INITIAL_PASSWORD`

---

## 6. Rekomenduojami parametrai

### 6.1 Paslapčių konfigūracija

„Fly Secrets“ rekomenduojami šie kintamieji:

| Kintamasis                            | Rekomendacija               | Aprašymas                                                |
| ------------------------------------- | --------------------------- | -------------------------------------------------------- |
| `API_KEY_SECRET`                      | Privalomas                  | Naudojamas API raktams generuoti ir tikrinti             |
| `JWT_SECRET`                          | Privalomas                  | Naudojamas prisijungimo seansams ir JWT pasirašyti       |
| `OMNIROUTE_WS_BRIDGE_SECRET`          | Privalomas produkcijoje     | WebSocket tilto autentifikavimo paslaptis                |
| `STORAGE_ENCRYPTION_KEY`              | Primygtinai rekomenduojamas | Užšifruoja neskelbtiną ryšio informaciją saugojimo metu  |
| `MACHINE_ID_SALT`                     | Rekomenduojamas             | Sugeneruoja stabilų įrenginio identifikatorių            |
| `INITIAL_PASSWORD`                    | Neprivalomas                | Nustato pradinį serverio slaptažodį pirmojo diegimo metu |
| Privačios OAuth/API prieigos reikšmės | Pagal poreikį               | Išorinės platformos autentifikavimo konfigūracija        |

### 6.2 Rekomenduojamos dabartinio projekto reikšmės

| Kintamasis             | Rekomenduojama reikšmė      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Pastabos:

- `DATA_DIR=/data` yra būtinas ir turi sutapti su „Fly Volume“ prijungimo tašku
- `NEXT_PUBLIC_BASE_URL` naudojamas planuoklio, sąsajos atgalinių iškvietimų ir panašiais atvejais

### 6.3 OAuth atgalinio iškvietimo URL konfigūracija

Jei „Fly.io“ dieginyje reikia įjungti OAuth pagrindu veikiančius teikėjus (pvz., Antigravity, Gemini, Cursor), įsitikinkite šiais dviem dalykais:

1. **Nustatykite `NEXT_PUBLIC_BASE_URL` į savo viešą HTTPS domeną**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Jei naudojate pasirinktinį domeną, pakeiskite jį atitinkamu domenu (pvz., `https://omniroute.yourdomain.com`).

2. **Sukonfigūruokite atgalinio iškvietimo URL teikėjo valdymo pulte**

   Visi OAuth teikėjai naudoja vieną bendrą atgalinio iškvietimo kelią `/callback` — kiekvienam teikėjui atskiro atgalinio iškvietimo maršruto NĖRA:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Pavyzdžiui, nesvarbu, ar naudojate Gemini, Antigravity, Cursor, ar GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Jei `NEXT_PUBLIC_BASE_URL` nesutampa su teikėjo sistemoje užregistruotu atgalinio iškvietimo URL, OAuth eiga nutrūks naršyklės peradresavimo etape.

---

## 7. Paslapčių nustatymas viena komanda

Toliau pateiktos komandos sugeneruoja saugias atsitiktines reikšmes ir vienu veiksmu įrašo visus dabartiniam projektui reikalingus parametrus į „Fly Secrets“.

Pastabos:

- `INITIAL_PASSWORD` neįtrauktas
- Skirta dabartiniam projektui `omniroute`

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

Linux / macOS sistemose taip pat galite naudoti `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Pastabos:

- `OMNIROUTE_WS_BRIDGE_SECRET` yra privalomas produkcijoje; jei jo nebus, WebSocket tilto ryšio užmezgimas neveiks

Jei taip pat norite nustatyti pradinį slaptažodį:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Dabartinių parametrų peržiūra

```powershell
flyctl secrets list -a omniroute
```

Jei konsolės puslapyje `Secrets` nerodomi numatyti kintamieji, patikrinkite:

- Ar peržiūrite programą `omniroute`
- Ar `app` reikšmė faile `fly.toml` atitinka konsolėje esančią programą

---

## 9. Tolesni naujinimai ir leidimai

Atnaujinus kodą, leidimo procesas yra paprastas:

```powershell
git pull
flyctl deploy
```

Jei reikia tik atnaujinti parametrus nekeičiant kodo:

```powershell
flyctl secrets set KEY=value -a omniroute
```

„Fly“ automatiškai atliks laipsnišką mašinų naujinimą.

### 9.1 Pagrindinės saugyklos naujinimų sekimas išsaugant jūsų atšakos `fly.toml`

Jei dabartinė saugykla yra atšaka ir norite sinchronizuoti naujinimus iš pagrindinės saugyklos `https://github.com/diegosouzapw/OmniRoute`, atlikite toliau nurodytus veiksmus.

Pirmiausia patikrinkite nuotolines saugyklas:

```powershell
git remote -v
```

Turėtumėte matyti bent:

- `origin`, nukreiptą į jūsų pačių atšaką
- `upstream`, nukreiptą į pradinę saugyklą

Jei `upstream` nesukonfigūruota, pridėkite ją:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Prieš sinchronizuodami su pagrindine saugykla, gaukite naujausius pakeitimus ir žymas:

```powershell
git fetch upstream --tags
```

Patikrinkite dabartinę versiją ir pagrindinės saugyklos žymas:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Pastaba: dabartinė projekto versija yra `v3.8.0`. Toliau pateiktos nuorodos į `v3.4.7` paliktos tik kaip istoriniai pavyzdžiai. Faktiniams leidimams naudokite `:latest` arba dabartinės versijos žymą (pvz., `:v3.8.0`).

Jei norite sujungti naujausią pagrindinės saugyklos `main` šaką ir priverstinai išsaugoti savo atšakos `fly.toml`, atlikite toliau nurodytus veiksmus:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Pastabos:

- `git merge upstream/main` sinchronizuoja naujausią kodą iš pradinės saugyklos
- `git checkout HEAD~1 -- fly.toml` atkuria jūsų atšakos `fly.toml`, buvusį prieš sujungimą
- Jei pagrindinėje saugykloje `fly.toml` nebuvo pakeistas, šis veiksmas nesukurs jokių skirtumų
- Jei pagrindinėje saugykloje `fly.toml` buvo pakeistas, šis veiksmas užtikrins, kad jūsų „Fly“ programos pavadinimas, tomo prijungimo taškas, regionas ir kita jūsų atšakai būdinga diegimo konfigūracija nebus perrašyti

Jei norite suderinti su konkretaus leidimo žyma (pvz., `v3.4.7`), pirmiausia patikrinkite, ar ši žyma jau įtraukta į `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Sėkmingas rezultatas reiškia, kad `upstream/main` jau yra ši versija; galite tiesiog sujungti `upstream/main`.

### 9.2 Standartinė leidimo seka po sinchronizavimo su pagrindine saugykla

Sinchronizavę su pradine saugykla, laikykitės šios rekomenduojamos leidimo veiksmų sekos:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Atkurkite atšakos `fly.toml`
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Tai yra faktinė darbo eiga, naudota naujinant dabartinį projektą į `v3.4.7` (pavyzdyje nurodyta istorinė versija; dabartinė faktinė versija yra `v3.8.0`).

---

## 10. Patikros po diegimo

### 10.1 Patikrinkite programos būseną

```powershell
flyctl status -a omniroute
```

### 10.2 Peržiūrėkite paleidimo žurnalus

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Patikrinkite svetainės pasiekiamumą

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

Grąžinta reikšmė `200` nurodo, kad svetainė veikia tinkamai.

---

## 11. Sėkmingo diegimo požymiai

Sėkmingai įdiegus, žurnaluose turėtų būti rodomas panašus turinys:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Šie du punktai yra itin svarbūs:

- `/data/server.env` patvirtina, kad vykdymo aplinkos slaptieji duomenys įrašyti į nuolatinį tomą
- `/data/storage.sqlite` patvirtina, kad duomenų bazė įrašyta į nuolatinį tomą

Jei vietoje to matote `/app/data/...`, `DATA_DIR` sukonfigūruotas netinkamai ir turi būti nedelsiant pataisytas.

---

## 12. Dažniausios problemos

### 12.1 Puslapis `Secrets` yra tuščias

Paprastai tam yra dvi priežastys:

- Dar nepaleidote `flyctl secrets set`
- Peržiūrite kitą programą (pvz., `oroute`, o ne `omniroute`)

### 12.2 `flyctl deploy` praneša `app not found`

Pirmiausia sukurkite programą:

```powershell
flyctl apps create omniroute
```

### 12.3 Nepavyksta išanalizuoti `fly.toml`

Patikrinkite:

- Ar komentaruose nėra iškraipytų simbolių
- Ar TOML kabutės ir įtraukos yra teisingos

### 12.4 Duomenys neišsaugomi

Patikrinkite abu šiuos dalykus:

- Faile `fly.toml` yra `destination = '/data'`
- `DATA_DIR` nustatytas į `/data`

### 12.5 Ar programa gali veikti be `INITIAL_PASSWORD`?

Taip, gali. Bus naudojamas numatytasis slaptažodis `CHANGEME`. Gamybinėje aplinkoje rekomenduojama kuo greičiau pakeisti vidinės sistemos slaptažodį.

---

## 13. Pakartotinis naudojimas naujiems projektams

Jei pagal šį dokumentą diegiate naują projektą, reikia pakeisti tik šiuos elementus:

1. Pakeiskite `app` reikšmę faile `fly.toml`
2. Pakeiskite `NEXT_PUBLIC_BASE_URL`
3. Palikite `DATA_DIR=/data`
4. Iš naujo sugeneruokite `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` ir `STORAGE_ENCRYPTION_KEY`
5. Po pirmojo diegimo patikrinkite, ar žurnalai įrašomi į `/data`

Pakartotinai nenaudokite ankstesnio projekto raktų.

---

## 14. Minimalus dabartinio projekto leidimo kontrolinis sąrašas

Vėlesniems leidimams dažniausiai naudojamos šios komandos:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Įprastam leidimui pagrindinė komanda yra tiesiog:

```powershell
flyctl deploy
```

Pirmą kartą diegiant naujoje aplinkoje, pagrindiniai veiksmai yra šie:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
