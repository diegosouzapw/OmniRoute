# FLY_IO_DEPLOYMENT_GUIDE (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "Gwida għat-Tħaddim ta' OmniRoute fuq Fly.io"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Gwida għat-Tħaddim ta' OmniRoute fuq Fly.io

Dan id-dokument jiddeskrivi l-proċess attwali ta' tħaddim ta' OmniRoute fuq Fly.io, ikopri żewġ xenarji:

- It-tħaddim tal-proġett attwali fuq Fly.io għall-ewwel darba
- It-tħaddim ta' ġdid tal-kodici wara dan
- Proġetti ġodda li jsegwew l-istess xogħol ta' tħaddim

Din il-gwida hija bbażata fuq konfigurazzjoni verifikata ta' ħidma għall-proġett attwali. L-isem tal-applikazzjoni huwa `omniroute`.

---

## 1. Għanijiet tat-Tħaddim

- Pjattaforma: Fly.io
- Metodu tat-tħaddim: Tħaddim dirett lokali permezz ta' `flyctl`
- Ħin ta' eżekuzzjoni: Użu tal-`Dockerfile` u `fly.toml` eżistenti fil-repożitorju
- Perżistenza ta' dati: Volum Fly immontat fuq `/data`
- URL ta' aċċess: `https://omniroute.fly.dev/`

---

## 2. Konfigurazzjoni Ċavetta tal-Proġett Attwali

Il-`fly.toml` fil-repożitorju attwali ġie kkonfermat li fih iċ-ċavetti li ġejjin:

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

Noti:

- `app = 'omniroute'` jiddetermina liema applikazzjoni Fly il-ħaddim jimmira lejha
- `destination = '/data'` jiddetermina d-direttorju tal-montar tal-volum perżistenti
- Dan il-proġett irid jissettja `DATA_DIR=/data`, mod ieħor id-database uċ-ċavetti se jinkitbu fit-temporanea tal-kontenitur

---

## 3. Rekwiżiti

### 3.1 Tinstallar tal-CLI Fly

PowerShell għal Windows:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Jekk is-skript ta' tinstallar falli fl-ambjent tiegħek, tista' wkoll tniżżel manwalment il-binaries tal-`flyctl` u żżidhom mal-`PATH` tiegħek.

### 3.2 Login fil-Kont Fly Tiegħek

```powershell
flyctl auth login
```

### 3.3 Verifika tal-Stat tal-Login

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Tħaddim għall-Ewwel Darba tal-Proġett Attwali

### 4.1 Cloni tal-Kodici u Dħul fid-Direttorju

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Konferma tal-Isem tal-Applikazzjoni

Agħtax sifta tal-`fly.toml` u ivverifika l-linja li ġejja:

```toml
app = 'omniroute'
```

Jekk qed tħaddem applikazzjoni ġdida propja tiegħek, tista' tbiddelha f'isem uniku globalment, pereżempju:

```toml
app = 'omniroute-ismek'
```

Nota:

- Liżgur li l-applikazzjoni li tara fil-konsol tikkorrispondi mal-valur ta' `app` fil-`fly.toml`
- Jekk inti qatt użajt isem differenti, bħal `oroute`, tagħmilx konfuż ma' `omniroute`

### 4.3 Ħolqien tal-Applikazzjoni

Jekk l-applikazzjoni għadha ma teżistix:

```powershell
flyctl apps create omniroute
```

Jekk tbdelt l-isem tal-applikazzjoni, sostitwixxi `omniroute` bl-isem li għżilt.

### 4.4 Tħaddim għall-Ewwel Darba

```powershell
flyctl deploy
```

---

## 5. Parametri Meħtieġa

Dan il-proġett jirrakkomanda li tista' tikkonfigura mill-inqas il-parametri li ġejjin fuq Fly.io.

### 5.1 Parametri Verifikati

Dawn il-parametri intużaw fil-ħaddim attwali fuq l-applikazzjoni attwali `omniroute`:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (meħtieġ fil-produzzjoni — jintuża għall-awtentikazzjoni tal-pont WebSocket)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 Dwar `INITIAL_PASSWORD`

Il-proġett attwali ma jissettjax `INITIAL_PASSWORD` għaliex dan it-tħaddim ma jeħtiġiex.

Jekk ma jkunx issettjat:

- Il-log tal-ħuħ se jindika li l-password default hija `CHANGEME`
- Għandek ibiddel il-password tal-login fis-settings tas-sistema malajr kemm jista' wara t-tħaddim

Jekk trid tibda l-password backend mingħajr assistenza, tista' iżżidha wara:

- `INITIAL_PASSWORD`

## 6. Parametri Rakkomandati

### 6.1 Kfigurazzjoni tas-Sigrieti

L-varjabeli li ġejjin huma rakkomandati għal Fly Secrets:

| Varjabbli                     | Rakkomandazzjoni         | Deskrizzjoni                                                       |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------ |
| `API_KEY_SECRET`              | Meħtieġa                 | Użata għall-ġenerazzjoni u l-validazzjoni tal-API Key              |
| `JWT_SECRET`                  | Meħtieġa                 | Użata għas-sessjonijiet tal-login u l-iffirmar JWT                 |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Meħtieġa fil-produzzjoni | Sigriet tal-awtentikazzjoni tal-pont WebSocket                     |
| `STORAGE_ENCRYPTION_KEY`      | B'saħħitha rakkomandata  | Tiddaħħal informazzjoni sensittiva ta' konnessjoni fuq il-mistrieħ |
| `MACHINE_ID_SALT`             | Rakkomandata             | Tġenera identifikatur tal-maġina stabbil                           |
| `INITIAL_PASSWORD`            | Opzjonali                | Tistabbilixxi l-password inizjali tal-backend fid-dħul ewlieni     |
| OAuth/API private credentials | Kif meħtieġ              | Kfigurazzjoni tal-awtentikazzjoni tal-pjattaformi esterni          |

### 6.2 Valuri Rakkomandati għall-Proġett Kurrenti

| Varjabbli              | Valur Rakkomandat           |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Noti:

- `DATA_DIR=/data` huwa kritiku u għandu jkun fil-punt tal-montar tal-Volum ta' Fly
- `NEXT_PUBLIC_BASE_URL` huwa użat mill-iskedulatur, callbacks tal-quddiem, u xenarji simili

### 6.3 Kfigurazzjoni tal-URL Callback OAuth

Jekk trid tippermetti lill-fornituri bbażati fuq OAuth (pereż. Antigravity, Gemini, Cursor) fuq l-immunità ta' Fly.io, kun żgur li turi dawn iż-żewġ punti:

1. **Ibbażat `NEXT_PUBLIC_BASE_URL` għad-dominju pubbliku HTTPS tiegħek**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Jekk qed tuża dominju personalizzat, substitwixxiha mal-dominju korrispondenti (pereż. `https://omniroute.yourdomain.com`).

2. **Ibbażat l-URL callback mal-konsolu tal-fornitur**

   Il-fornituri kollha tal-qsim shader il-wisa' wieħed ta' callback `/callback` — HEBIEX hemm triq ta' callback separata għal kull fornitur:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Pereż., irrispettivament minn Gemini, Antigravity, Cursor, jew GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Jekk `NEXT_PUBLIC_BASE_URL` ma jkunx jikkorrispondi mal-URL callback reġistrat mal-fornitur, il-fluss tal-OAuth se falli fil-pass tar-ritorn tal-browser.

---

## 7. Waħda-kmand għas-Setup tas-Sigrieti

Il-kmandi li ġejjin jġeneraw valuri sikuri b'mod aleatorju u jiktbu l-parametri kollha meħtieġa għall-proġett kurrenti għal Fly Secrets f'mossa waħda.

Noti:

- Ma jinkludix `INITIAL_PASSWORD`
- Intenzjonat għall-proġett kurrenti `omniroute`

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

Fuq Linux / macOS, tista' tuża wkoll `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Noti:

- `OMNIROUTE_WS_BRIDGE_SECRET` hija meħtieġa fil-produzzjoni; in-nuqqas tagħha se tfixkel il-qabda tal-pont WebSocket

Jekk trid tistabbilixxi wkoll password inizjali:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Jar l-Parametri Attwali

```powershell
flyctl secrets list -a omniroute
```

Jekk il-paġna tal-`Secrets` fil-konsol ma tax l-variabli mistennija, iċċekkja:

- Li qed tar l-applikazzjoni `omniroute`
- Li l-valur tal-`app` fil-`fly.toml` jaqbel mal-applikazzjoni fil-konsol

---

## 9. Aġġornamenti u Ħruġ Sussegwenti

Wara l-aġġornamenti tal-kodċi, il-proċess tal-ħruġ huwa sempliċi:

```powershell
git pull
flyctl deploy
```

Jekk għandek biss bżonn taġġorna l-parametri mingħajr ma tbiddel il-kodċi:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly se twettaq awtomatikament aġġornament ta' rotta tal-magni.

### 9.1 Traċċar tal-Aġġornamenti tal-Repositorju ta' Linn fuq il-Linja, filwaqt li Jippreserva l-`fly.toml` tal-Fork Tiegħek

Jekk ir-repositorju attwali huwa fork u trid tissinkronizza aġġornamenti mir-repositorju ta' linn fuq il-linja `https://github.com/diegosouzapw/OmniRoute`, segwi l-workflow hawn taħt.

L-ewwel, ivverifika r-remotes tiegħek:

```powershell
git remote -v
```

Għandek tara tal-inqas:

- `origin` li jindika l-fork tiegħek stess
- `upstream` li jindika r-repositorju oriġinali

Jekk `upstream` ma huwiex konkfigurat, żidu:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Qabel tissinkronizza mal-upstream, ġib l-aħħar commits u tags:

```powershell
git fetch upstream --tags
```

Iċċekkja l-verżjoni attwali u t-tags upstream:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Nota: Il-verżjoni tal-proġett attwali hija `v3.8.0`. Ir-riferenzi għal `v3.4.7` hawn taħt huma miżmuma biss bħala eżempji storiċi. Għall-ħruġ attwali, uża `:latest` jew it-tag tal-verżjoni attwali (pereżempju `:v3.8.0`).

Jekk trid tassimila l-aħħar `main` tal-upstream filwaqt li tżomm b'saħħtu l-`fly.toml` tal-fork tiegħek, segwi dan il-workflow:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Noti:

- `git merge upstream/main` tissinkronizza l-aħħar kodċi mir-repositorju oriġinali
- `git checkout HEAD~1 -- fly.toml` tistad l-`fly.toml` speċifiku tal-fork tiegħek mill-bidu tal-merge
- Jekk l-upstream ma bediex jibdel l-`fly.toml`, din il-passa ma ġġib l-ebda differenzi
- Jekk l-upstream beda jibdel l-`fly.toml`, din il-passa tiżgura li l-isem tal-applikazzjoni Fly tiegħek, il-montar tal-volum, ir-reġjun, u l-konfigurazzjoni oħra ta' deployment speċifika għal fork ma jiġux imwarrba

Jekk trid tissinkronizza ma' tag ta' ħruġ speċifiku (pereżempju `v3.4.7`), l-ewwel ivverifika li l-tag diġà huwa inkluż f'`upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Ritorn b'suċċess ifisser li `upstream/main` diġà fih dik il-verżjoni; tista' sempliċement tagħmel merge ta' `upstream/main`.

### 9.2 Segwenza tal-Ħruġ Standard Wara s-Sinkronizzazzjoni mal-Upstream

Wara s-sinkronizzazzjoni mal-repositorju oriġinali, segwi l-ordni rakkomandata tal-ħruġ:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Irrestawra l-`fly.toml` tal-fork
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Dan huwa l-workflow attwali użat meta tiġi upgraded il-verżjoni attwali tal-proġett għal `v3.4.7` (l-eżempju jirreferi għal verżjoni storika; il-verżjoni attwali reali hija `v3.8.0`).

---

## 10. Verifika Wara l-Ħruġ Fil-Produzzjoni

### 10.1 Iċċekkjia l-Istat tal-Applikazzjoni

```powershell
flyctl status -a omniroute
```

### 10.2 Raw il-Logħob tal-Bidu

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Verifika l-Aċċessibbiltà tas-Sit

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

Valur ta' ritorn ta' `200` jindika li l-sit qed jirrispondi normalment.

---

## 11. Indikaturi ta' Suċċess

Wara ħruġ fil-produzzjoni mill-ġdid, il-logħob għandhom juri kontenut bħal:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Dawn iż-żewġ punti huma kritiċi:

- `/data/server.env` jikkonferma li s-sigrieti tal-ħin tal-kunsinna huma miktubin fil-volum permanenti
- `/data/storage.sqlite` jikkonferma li l-bażi tad-dejta hija miktuba fil-volum permanenti

Jekk tara `/app/data/...` minflok, `DATA_DIR` ġie kkunfigurat ħażin u għandu jiġi korrett mill-ewwel.

---

## 12. Problemi Komuni

### 12.1 Il-Paġna ta' `Secrets` Huwa Vojt

Normalment hemm żewġ raġunijiet:

- Għadek ma għamiltx `flyctl secrets set`
- Qiegħed tara applikazzjoni differenti (eż. `oroute` minflok `omniroute`)

### 12.2 `flyctl deploy` Jirrappurta `app not found`

Oħloq l-applikazzjoni l-ewwel:

```powershell
flyctl apps create omniroute
```

### 12.3 Il-Parsing ta' `fly.toml` Falla

Iċċekkja l-li ġejjin:

- Jekk hemm karattri maqbuqa fil-kummenti
- Jekk il-qaws u l-in缜entazzjoni tal-TOML huma korretti

### 12.4 Id-Dejta Mhijiex persistenti

Verifika t-tnejn li ġejjin:

- `fly.toml` fih `destination = '/data'`
- `DATA_DIR` huwaisset għal `/data`

### 12.5 Tista' Taħdem Mingħajr `INITIAL_PASSWORD`?

Iva, tista' taħdem. Se tirrikorri għall-password preferuta `CHANGEME`. Huwa rakkomandat li tibdel il-password tal-backend kemm jista' jkun malajr fil-produzzjoni.

---

## 12. Ġīda minn ġdid għal Proġetti Ġodda

Jekk qed tagħmel ħruġ fil-produzzjoni ta' proġett ġdid skont dan id-dokument, għandek biss bżonn tibdil dawn l-oġġetti:

1. Ibdel il-valur ta' `app` f'`fly.toml`
2. Ibdel `NEXT_PUBLIC_BASE_URL`
3. Żomm `DATA_DIR=/data`
4. Ġeddid `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT`, u `STORAGE_ENCRYPTION_KEY`
5. Wara l-ewwel ħruġ fil-produzzjoni, verifika li l-logħob qed jinżammu f'`/data`

Taqtax mill-ġdid l-għażliet minn proġett qadim.

---

## 13. Lista tal-Verifika Minima għall-Proġett Attwali

Il-kmandi l-aktar użati għal ħruġ fil-produzzjoni ulterjuri huma:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Għal ħruġ fil-produzzjoni normali, il-kmand bażiku huwa sempliċement:

```powershell
flyctl deploy
```

Għal ħruġ fil-produzzjoni l-ewwel darba f'ambjent ġdid, il-passi bażiċi huma:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
