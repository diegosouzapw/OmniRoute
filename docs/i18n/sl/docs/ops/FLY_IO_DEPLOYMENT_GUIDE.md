# FLY_IO_DEPLOYMENT_GUIDE (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "Vodnik za uvedbo OmniRoute na Fly.io"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Vodnik za uvedbo OmniRoute na Fly.io

Ta dokument opisuje dejanski postopek uvedbe OmniRoute na Fly.io in zajema naslednje scenarije:

- Prva uvedba trenutnega projekta na Fly.io
- Objavljanje nadaljnjih posodobitev kode
- Novi projekti, ki uporabljajo enak potek uvedbe

Ta vodnik temelji na preverjeni delujoči konfiguraciji trenutnega projekta. Ime aplikacije je `omniroute`.

---

## 1. Cilji uvedbe

- Platforma: Fly.io
- Način uvedbe: Neposredna lokalna objava z `flyctl`
- Izvajalno okolje: Uporaba obstoječih datotek `Dockerfile` in `fly.toml` v repozitoriju
- Trajnost podatkov: Nosilec Fly, priklopljen na `/data`
- URL za dostop: `https://omniroute.fly.dev/`

---

## 2. Ključna konfiguracija trenutnega projekta

Potrjeno je bilo, da datoteka `fly.toml` v trenutnem repozitoriju vsebuje naslednje ključne elemente:

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

Opombe:

- `app = 'omniroute'` določa, na katero aplikacijo Fly je usmerjena uvedba
- `destination = '/data'` določa imenik za priklop trajnega nosilca
- Za ta projekt morate nastaviti `DATA_DIR=/data`, sicer bodo podatkovna zbirka in ključi zapisani v začasni imenik vsebnika

---

## 3. Predpogoji

### 3.1 Namestitev vmesnika Fly CLI

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Če namestitveni skript v vašem okolju ne uspe, lahko tudi ročno prenesete binarno datoteko `flyctl` in jo dodate v svoj `PATH`.

### 3.2 Prijava v račun Fly

```powershell
flyctl auth login
```

### 3.3 Preverjanje stanja prijave

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Prva uvedba trenutnega projekta

### 4.1 Kloniranje kode in premik v imenik

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Potrditev imena aplikacije

Odprite `fly.toml` in preverite naslednjo vrstico:

```toml
app = 'omniroute'
```

Če izvajate uvedbo v lastno novo aplikacijo, lahko ime spremenite v globalno enolično ime, na primer:

```toml
app = 'omniroute-yourname'
```

Opomba:

- Prepričajte se, da se aplikacija, ki jo vidite v nadzorni plošči, ujema z vrednostjo `app` v datoteki `fly.toml`
- Če ste prej uporabljali drugo ime, na primer `oroute`, ga ne zamenjujte z `omniroute`

### 4.3 Ustvarjanje aplikacije

Če aplikacija še ne obstaja:

```powershell
flyctl apps create omniroute
```

Če ste spremenili ime aplikacije, zamenjajte `omniroute` z izbranim imenom.

### 4.4 Prva uvedba

```powershell
flyctl deploy
```

---

## 5. Zahtevani parametri

Za ta projekt je priporočljivo, da na Fly.io nastavite vsaj naslednje parametre.

### 5.1 Preverjeni parametri

Ti parametri so bili uporabljeni pri dejanskih uvedbah trenutne aplikacije `omniroute`:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (zahtevano v produkciji — uporablja se za preverjanje pristnosti mostu WebSocket)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 O parametru `INITIAL_PASSWORD`

Trenutni projekt ne nastavlja parametra `INITIAL_PASSWORD`, ker ga ta uvedba ne zahteva.

Če ni nastavljen:

- Dnevnik ob zagonu bo navedel, da je privzeto geslo `CHANGEME`
- Geslo za prijavo morate čim prej po uvedbi spremeniti v sistemskih nastavitvah

Če želite začetno geslo zalednega sistema nastaviti brez posredovanja, ga lahko dodate pozneje:

- `INITIAL_PASSWORD`

---

## 6. Priporočeni parametri

### 6.1 Konfiguracija skrivnosti

Za Fly Secrets priporočamo naslednje spremenljivke:

| Spremenljivka                 | Priporočilo          | Opis                                                      |
| ----------------------------- | -------------------- | --------------------------------------------------------- |
| `API_KEY_SECRET`              | Obvezno              | Uporablja se za ustvarjanje in preverjanje ključev API    |
| `JWT_SECRET`                  | Obvezno              | Uporablja se za prijavne seje in podpisovanje žetonov JWT |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Obvezno v produkciji | Skrivnost za preverjanje pristnosti mostu WebSocket       |
| `STORAGE_ENCRYPTION_KEY`      | Zelo priporočljivo   | Šifrira občutljive podatke o povezavah v mirovanju        |
| `MACHINE_ID_SALT`             | Priporočljivo        | Ustvari stabilen identifikator naprave                    |
| `INITIAL_PASSWORD`            | Izbirno              | Nastavi začetno geslo zaledja ob prvi uvedbi              |
| Zasebne poverilnice OAuth/API | Po potrebi           | Konfiguracija preverjanja pristnosti zunanje platforme    |

### 6.2 Priporočene vrednosti za trenutni projekt

| Spremenljivka          | Priporočena vrednost        |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Opombe:

- `DATA_DIR=/data` je ključnega pomena in se mora ujemati s točko priklopa nosilca Fly Volume
- `NEXT_PUBLIC_BASE_URL` uporabljajo razporejevalnik, povratni klici uporabniškega vmesnika in podobni scenariji

### 6.3 Konfiguracija URL-ja povratnega klica OAuth

Če želite pri uvedbi na Fly.io omogočiti ponudnike, ki temeljijo na OAuth (npr. Antigravity, Gemini, Cursor), poskrbite za naslednji dve točki:

1. **Nastavite `NEXT_PUBLIC_BASE_URL` na svojo javno domeno HTTPS**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Če uporabljate domeno po meri, jo zamenjajte z ustrezno domeno (npr. `https://omniroute.yourdomain.com`).

2. **Konfigurirajte URL povratnega klica v konzoli ponudnika**

   Vsi ponudniki OAuth uporabljajo enotno pot povratnega klica `/callback` — za posamezne ponudnike NI ločenih poti povratnega klica:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Na primer, ne glede na to, ali gre za Gemini, Antigravity, Cursor ali GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Če se `NEXT_PUBLIC_BASE_URL` ne ujema z URL-jem povratnega klica, registriranim pri ponudniku, postopek OAuth ne bo uspel pri koraku preusmeritve v brskalniku.

---

## 7. Nastavitev skrivnosti z enim ukazom

Naslednji ukazi ustvarijo varne naključne vrednosti in v enem koraku zapišejo vse zahtevane parametre za trenutni projekt v Fly Secrets.

Opombe:

- Ne vključuje `INITIAL_PASSWORD`
- Namenjeno trenutnemu projektu `omniroute`

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

V sistemih Linux/macOS lahko uporabite tudi `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Opombe:

- `OMNIROUTE_WS_BRIDGE_SECRET` je obvezna v produkciji; če manjka, rokovanje mostu WebSocket ne bo delovalo

Če želite nastaviti tudi začetno geslo:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Ogled trenutnih parametrov

```powershell
flyctl secrets list -a omniroute
```

Če stran `Secrets` v konzoli ne prikazuje pričakovanih spremenljivk, preverite:

- Ali si ogledujete aplikacijo `omniroute`
- Ali se vrednost `app` v datoteki `fly.toml` ujema z aplikacijo v konzoli

---

## 9. Nadaljnje posodobitve in izdaje

Po posodobitvah kode je postopek izdaje preprost:

```powershell
git pull
flyctl deploy
```

Če morate posodobiti samo parametre brez spreminjanja kode:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly bo samodejno izvedel postopno posodobitev računalnikov.

### 9.1 Spremljanje posodobitev izvornega repozitorija ob ohranitvi datoteke `fly.toml` vaše razvejane kopije

Če je trenutni repozitorij razvejana kopija in želite sinhronizirati posodobitve iz izvornega repozitorija `https://github.com/diegosouzapw/OmniRoute`, sledite spodnjemu postopku.

Najprej preverite oddaljene repozitorije:

```powershell
git remote -v
```

Videti bi morali vsaj:

- `origin`, ki kaže na vašo razvejano kopijo
- `upstream`, ki kaže na izvirni repozitorij

Če `upstream` ni konfiguriran, ga dodajte:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Pred sinhronizacijo z izvornim repozitorijem pridobite najnovejše potrditve in oznake:

```powershell
git fetch upstream --tags
```

Preverite trenutno različico in oznake izvornega repozitorija:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Opomba: Trenutna različica projekta je `v3.8.0`. Spodnje omembe različice `v3.4.7` so ohranjene samo kot zgodovinski primeri. Za dejanske izdaje uporabite `:latest` ali oznako trenutne različice (npr. `:v3.8.0`).

Če želite združiti najnovejšo vejo `main` izvornega repozitorija in pri tem prisilno ohraniti datoteko `fly.toml` svoje razvejane kopije, sledite temu postopku:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Opombe:

- `git merge upstream/main` sinhronizira najnovejšo kodo iz izvirnega repozitorija
- `git checkout HEAD~1 -- fly.toml` obnovi datoteko `fly.toml` vaše razvejane kopije iz stanja pred združitvijo
- Če izvorni repozitorij ni spremenil datoteke `fly.toml`, ta korak ne bo povzročil nobenih razlik
- Če je izvorni repozitorij spremenil datoteko `fly.toml`, ta korak zagotovi, da ime vaše aplikacije Fly, priklop nosilca, regija in druge nastavitve uvajanja, specifične za razvejano kopijo, ne bodo prepisane

Če se želite uskladiti z določeno oznako izdaje (npr. `v3.4.7`), najprej preverite, ali je oznaka že vključena v `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Uspešen rezultat pomeni, da `upstream/main` že vsebuje to različico; v tem primeru lahko preprosto združite `upstream/main`.

### 9.2 Standardno zaporedje izdaje po sinhronizaciji z izvornim repozitorijem

Po sinhronizaciji z izvirnim repozitorijem upoštevajte ta priporočeni vrstni red izdaje:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Obnovite datoteko `fly.toml` razvejane kopije
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

To je dejanski postopek, uporabljen pri nadgradnji trenutnega projekta na `v3.4.7` (primer se nanaša na zgodovinsko različico; trenutna dejanska različica je `v3.8.0`).

---

## 10. Preverjanja po uvedbi

### 10.1 Preverjanje stanja aplikacije

```powershell
flyctl status -a omniroute
```

### 10.2 Ogled dnevnikov zagona

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Preverjanje dostopnosti spletnega mesta

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

Vrnjena vrednost `200` pomeni, da se spletno mesto odziva običajno.

---

## 11. Kazalniki uspešnosti

Po uspešni uvedbi bi morala biti v dnevnikih prikazana vsebina, podobna tej:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Ti dve točki sta ključni:

- `/data/server.env` potrjuje, da so skrivnosti izvajalnega okolja zapisane na trajni nosilec
- `/data/storage.sqlite` potrjuje, da je podatkovna zbirka zapisana na trajni nosilec

Če namesto tega vidite `/app/data/...`, je `DATA_DIR` napačno konfiguriran in ga morate nemudoma popraviti.

---

## 12. Pogoste težave

### 12.1 Stran `Secrets` je prazna

Običajno obstajata dva razloga:

- Ukaza `flyctl secrets set` še niste zagnali
- Ogledujete si drugo aplikacijo (npr. `oroute` namesto `omniroute`)

### 12.2 `flyctl deploy` sporoči `app not found`

Najprej ustvarite aplikacijo:

```powershell
flyctl apps create omniroute
```

### 12.3 Razčlenjevanje datoteke `fly.toml` ne uspe

Preverite naslednje:

- Ali so v komentarjih popačeni znaki
- Ali so narekovaji in zamiki TOML pravilni

### 12.4 Podatki se ne ohranjajo

Preverite oboje:

- `fly.toml` vsebuje `destination = '/data'`
- `DATA_DIR` je nastavljen na `/data`

### 12.5 Ali se lahko izvaja brez `INITIAL_PASSWORD`?

Da, lahko se izvaja. Uporabljeno bo privzeto geslo `CHANGEME`. Priporočamo, da v produkcijskem okolju čim prej spremenite geslo zalednega sistema.

---

## 13. Ponovna uporaba za nove projekte

Če po navodilih v tem dokumentu uvajate nov projekt, morate spremeniti samo te elemente:

1. Spremenite vrednost `app` v datoteki `fly.toml`
2. Spremenite `NEXT_PUBLIC_BASE_URL`
3. Ohranite `DATA_DIR=/data`
4. Znova ustvarite `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` in `STORAGE_ENCRYPTION_KEY`
5. Po prvi uvedbi preverite, ali se dnevniki zapisujejo v `/data`

Ne uporabljajte znova ključev iz prejšnjega projekta.

---

## 14. Minimalni kontrolni seznam za izdajo trenutnega projekta

Najpogosteje uporabljeni ukazi za nadaljnje izdaje so:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Za običajno izdajo je ključni ukaz preprosto:

```powershell
flyctl deploy
```

Za prvo uvedbo v novem okolju so ključni koraki:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
