# FLY_IO_DEPLOYMENT_GUIDE (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute'i Fly.io juurutamise juhend"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute'i Fly.io juurutamise juhend

Käesolev dokument kirjeldab OmniRoute'i tegelikku juurutamisprotsessi Fly.io platvormil, hõlmates kahte stsenaariumit:

- praeguse projekti esmakordne juurutamine Fly.io-le
- järgnevate koodiuuenduste avaldamine
- uued projektid, mis järgivad sama juurutamise töövoogu

Käesolev juhend põhineb praeguse projekti kontrollitud toimival konfiguratsioonil. Rakenduse nimi on `omniroute`.

---

## 1. Juurutamise eesmärgid

- Platvorm: Fly.io
- Juurutamise meetod: kohalik `flyctl` otseavaldamine
- Käitusaeg: kasutatakse hoidlas olevat olemasolevat `Dockerfile` ja `fly.toml`
- Andmete püsivus: Fly Volume, mis on ühendatud kataloogiga `/data`
- Juurdepääsu URL: `https://omniroute.fly.dev/`

---

## 2. Praeguse projekti põhikonfiguratsioon

On kinnitatud, et praeguse hoidla failis `fly.toml` on järgmised põhielemendid:

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

Märkused:

- `app = 'omniroute'` määrab, millisele Fly rakendusele juurutamine suunatakse
- `destination = '/data'` määrab püsiva köite ühenduskataloogi
- Selles projektis tuleb kindlasti määrata `DATA_DIR=/data`, vastasel juhul kirjutatakse andmebaas ja võtmed konteineri ajutisse kataloogi

---

## 3. Eeltingimused

### 3.1 Fly CLI paigaldamine

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Kui paigaldusskript teie keskkonnas ebaõnnestub, saate `flyctl` binaarfaili alla laadida ka käsitsi ja lisada see oma `PATH` muutujasse.

### 3.2 Fly kontole sisselogimine

```powershell
flyctl auth login
```

### 3.3 Sisselogimise oleku kontrollimine

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Praeguse projekti esmakordne juurutamine

### 4.1 Kloonige kood ja liikuge kataloogi

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Kinnitage rakenduse nimi

Avage `fly.toml` ja kontrollige järgmist rida:

```toml
app = 'omniroute'
```

Kui juurutate seda oma uude rakendusse, võite selle muuta globaalselt kordumatuks nimeks, näiteks:

```toml
app = 'omniroute-yourname'
```

Märkus:

- Veenduge, et konsoolis kuvatav rakendus vastab `fly.toml` failis olevale `app` väärtusele
- Kui olete varem kasutanud teistsugust nime, näiteks `oroute`, ärge ajage seda segamini nimega `omniroute`

### 4.3 Rakenduse loomine

Kui rakendust veel ei eksisteeri:

```powershell
flyctl apps create omniroute
```

Kui olete rakenduse nime muutnud, asendage `omniroute` valitud nimega.

### 4.4 Esmakordne juurutamine

```powershell
flyctl deploy
```

---

## 5. Vajalikud parameetrid

Käesolev projekt soovitab konfigureerida Fly.io-l vähemalt järgmised parameetrid.

### 5.1 Kontrollitud parameetrid

Neid parameetreid on kasutatud praeguse `omniroute` rakenduse tegelikes juurutamistes:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (vajalik tootmiskeskkonnas — kasutatakse WebSocket-i vahendaja autentimiseks)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 `INITIAL_PASSWORD` kohta

Praeguses projektis ei ole `INITIAL_PASSWORD` määratud, kuna see juurutamine seda ei vaja.

Kui see ei ole määratud:

- käivituslogi näitab, et vaikeparool on `CHANGEME`
- peaksite pärast juurutamist võimalikult kiiresti sisselogimisparooli süsteemi seadetes muutma

Kui soovite tagavälise (unattended) taustaprotsessina algatada süsteemi parooli, saate seda hiljem lisada:

- `INITIAL_PASSWORD`

---

## 6. Soovitatud parameetrid

### 6.1 Saladuste (Secrets) konfiguratsioon

Fly Secrets jaoks soovitatakse kasutada järgmisi muutujaid:

| Muutuja                      | Soovitus              | Kirjeldus                                                      |
| ---------------------------- | --------------------- | -------------------------------------------------------------- |
| `API_KEY_SECRET`             | Kohustuslik           | Kasutatakse API võtme genereerimiseks ja valideerimiseks       |
| `JWT_SECRET`                 | Kohustuslik           | Kasutatakse sisselogimisseansside ja JWT allkirjastamise jaoks |
| `OMNIROUTE_WS_BRIDGE_SECRET` | Kohustuslik toodangus | WebSocket bridge autentimissaladus                             |
| `STORAGE_ENCRYPTION_KEY`     | Tugevalt soovitatav   | Krüpteerib tundliku ühenduse teabe salvestuse ajal             |
| `MACHINE_ID_SALT`            | Soovitatav            | Genereerib stabiilse masina identifikaatori                    |
| `INITIAL_PASSWORD`           | Valikuline            | Määrab esimese kasutuselevõtu ajal taustaprogrammi algparooli  |
| OAuth/API privaatvolitused   | Vajaduse korral       | Väliste platvormide autentimise konfiguratsioon                |

### 6.2 Soovitatud väärtused praeguse projekti jaoks

| Muutuja                | Soovitatud väärtus          |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Märkused:

- `DATA_DIR=/data` on kriitiline ja peab ühtima Fly Volume mount-punktiga
- `NEXT_PUBLIC_BASE_URL` kasutatakse ajastaja, esiotsa tagasikutsete ja sarnaste stsenaariumide jaoks

### 6.3 OAuth tagasikutse URL-i konfiguratsioon

Kui soovid Fly.io kasutuselevõtul lubada OAuth-põhiseid teenusepakkujaid (nt Antigravity, Gemini, Cursor), veendu järgmises kahes punktis:

1. **Määra `NEXT_PUBLIC_BASE_URL` oma avalikuks HTTPS domeeniks**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Kui kasutad kohandatud domeeni, asenda see vastava domeeniga (nt `https://omniroute.yourdomain.com`).

2. **Konfigureeri tagasikutse URL teenusepakkuja konsoolis**

   Kõik OAuth teenusepakkujad jagavad ühte tagasikutse teed `/callback` — teenusepakkuja-põhist tagasikutse marsruuti EI ole:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Näiteks, sõltumata sellest, kas kasutad Geminit, Antigravityt, Cursorit või GitLab Duo'd:
   - `https://omniroute.fly.dev/callback`

   Kui `NEXT_PUBLIC_BASE_URL` ei ühti teenusepakkuja juures registreeritud tagasikutse URL-iga, ebaõnnestub OAuth voog brauseri suunamise etapis.

---

## 7. Ühe käsuga saladuste seadistamine

Järgmised käsud genereerivad turvalisi juhuslikke väärtusi ja kirjutavad ühe sammuga kõik praeguse projekti jaoks vajalikud parameetrid Fly Secrets'i.

Märkused:

- Ei sisalda `INITIAL_PASSWORD` väärtust
- Mõeldud praeguse projekti `omniroute` jaoks

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

Linuxis / macOS-is saab kasutada ka `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Märkused:

- `OMNIROUTE_WS_BRIDGE_SECRET` on toodangus kohustuslik; selle puudumine rikub WebSocket bridge käepigistuse (handshake)

Kui soovid ka algparooli määrata:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Praeguste parameetrite vaatamine

```powershell
flyctl secrets list -a omniroute
```

Kui konsooli lehel `Secrets` ei kuvata oodatud muutujaid, kontrolli:

- Et vaatad rakendust `omniroute`
- Et `fly.toml` failis olev `app` väärtus vastab konsoolis olevale rakendusele

---

## 9. Järgnevad uuendused ja väljalasked

Pärast koodi uuendamist on väljalaskeprotsess lihtne:

```powershell
git pull
flyctl deploy
```

Kui soovid uuendada ainult parameetreid koodi muutmata:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly teeb masinatele automaatselt astmelise (rolling) uuenduse.

### 9.1 Ülempoolse hoidla (upstream) uuenduste jälgimine, säilitades samal ajal oma forgi `fly.toml` faili

Kui praegune hoidla on fork ja soovid sünkroonida uuendusi ülempoolsest hoidlast `https://github.com/diegosouzapw/OmniRoute`, järgi allolevat töövoogu.

Kõigepealt kontrolli oma remote'e:

```powershell
git remote -v
```

Peaksid näha vähemalt:

- `origin`, mis viitab sinu enda forgile
- `upstream`, mis viitab algsele hoidlale

Kui `upstream` ei ole konfigureeritud, lisa see:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Enne ülempoolse hoidlaga sünkroonimist tõmba (fetch) uusimad commit'id ja tagid:

```powershell
git fetch upstream --tags
```

Kontrolli praegust versiooni ja ülempoolse hoidla tagisid:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Märkus: Praeguse projekti versioon on `v3.8.0`. Allpool esinevad viited `v3.4.7`-le on säilitatud ainult ajaloolise näitena. Tegelike väljalaskete puhul kasuta `:latest` või praegust versioonitagi (nt `:v3.8.0`).

Kui soovid liita ülempoolse hoidla uusima `main` haru, säilitades jõuga oma forgi `fly.toml` faili, järgi seda töövoogu:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Märkused:

- `git merge upstream/main` sünkroonib algsest hoidlast uusima koodi
- `git checkout HEAD~1 -- fly.toml` taastab sinu forgi enda `fly.toml` faili sellisel, nagu see oli enne liitmist
- Kui ülempoolne hoidla ei muutnud `fly.toml` faili, ei tekita see samm mingeid erinevusi
- Kui ülempoolne hoidla muutis `fly.toml` faili, tagab see samm, et sinu Fly rakenduse nimi, mahu (volume) ühendus, regioon ja teised forgile omased juurutuskonfiguratsioonid ei saa üle kirjutatud

Kui soovid joonduda konkreetse väljalaske tagiga (nt `v3.4.7`), kontrolli esmalt, et see tag on juba kaasatud `upstream/main` harus:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Edukas tagastus tähendab, et `upstream/main` sisaldab juba seda versiooni; seega võid lihtsalt liita `upstream/main`.

### 9.2 Standardne väljalaske järjekord pärast ülempoolse hoidlaga sünkroonimist

Pärast algse hoidlaga sünkroonimist järgi seda soovitatud väljalaske järjekorda:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Taasta forgi `fly.toml`
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

See on tegelik töövoog, mida kasutati praeguse projekti uuendamisel versioonile `v3.4.7` (näide viitab ajaloolisele versioonile; praegune tegelik versioon on `v3.8.0`).

---

## 10. Kasutuselevõtu järgsed kontrollid

### 10.1 Rakenduse oleku kontrollimine

```powershell
flyctl status -a omniroute
```

### 10.2 Käivituslogide vaatamine

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Saidi ligipääsetavuse kontrollimine

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

Tagastusväärtus `200` näitab, et sait vastab normaalselt.

---

## 11. Õnnestumise näitajad

Pärast edukat kasutuselevõttu peaksid logid näitama sisu, mis on sarnane järgnevaga:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Need kaks punkti on kriitilised:

- `/data/server.env` kinnitab, et käitusaja saladused on kirjutatud püsivale kettale (persistent volume)
- `/data/storage.sqlite` kinnitab, et andmebaas on kirjutatud püsivale kettale (persistent volume)

Kui näete selle asemel `/app/data/...`, on `DATA_DIR` valesti konfigureeritud ja seda tuleb koheselt parandada.

---

## 12. Levinud probleemid

### 12.1 `Secrets` leht on tühi

Selleks on üldjuhul kaks põhjust:

- Te ei ole veel käivitanud `flyctl secrets set`
- Te vaatate teist rakendust (nt `oroute` mitte `omniroute`)

### 12.2 `flyctl deploy` teatab `app not found`

Looge rakendus esmalt:

```powershell
flyctl apps create omniroute
```

### 12.3 `fly.toml` parsimine ebaõnnestub

Kontrollige järgmist:

- Kas kommentaarides on moonutatud tähemärke
- Kas TOML-i jutumärgid ja treppimine on õiged

### 12.4 Andmed ei püsi

Kontrollige mõlemat järgmist punkti:

- `fly.toml` sisaldab `destination = '/data'`
- `DATA_DIR` on määratud väärtusega `/data`

### 12.5 Kas rakendus saab töötada ilma `INITIAL_PASSWORD`-ita?

Jah, saab töötada. Sel juhul lähtub see vaikeparoolist `CHANGEME`. Tootmiskeskkonnas on soovitatav taustaprogrammi parool võimalikult kiiresti muuta.

---

## 13. Taaskasutamine uute projektide jaoks

Kui võtate seda dokumenti järgides kasutusele uue projekti, tuleb muuta ainult järgmist:

1. Muutke `app` väärtust failis `fly.toml`
2. Muutke `NEXT_PUBLIC_BASE_URL`
3. Jätke alles `DATA_DIR=/data`
4. Genereerige uuesti `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` ja `STORAGE_ENCRYPTION_KEY`
5. Pärast esimest kasutuselevõttu kontrollige, et logid kirjutatakse asukohta `/data`

Ärge kasutage taaskord eelmise projekti võtmeid.

---

## 14. Minimaalne väljalaske kontrollnimekiri praeguse projekti jaoks

Kõige sagedamini kasutatavad käsud järgnevate väljalasete jaoks on:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Tavapärase väljalaske puhul on põhikäsk lihtsalt:

```powershell
flyctl deploy
```

Uues keskkonnas esmakordse kasutuselevõtu põhietapid on:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
