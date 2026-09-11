# FLY_IO_DEPLOYMENT_GUIDE (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "OmniRoute Fly.io Vodič za Postavljanje"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Fly.io Vodič za Postavljanje

Ovaj dokument opisuje stvarni proces postavljanja OmniRoute aplikacije na Fly.io, pokrivajući dva scenarija:

- Prvo postavljanje trenutnog projekta na Fly.io
- Objavljivanje naknadnih ažuriranja koda
- Novi projekti koji slijede isti tijek rada za postavljanje

Ovaj vodič temelji se na provjerenoj radnoj konfiguraciji za trenutni projekt. Naziv aplikacije je `omniroute`.

---

## 1. Ciljevi Postavljanja

- Platforma: Fly.io
- Metoda postavljanja: Lokalno izravno objavljivanje putem `flyctl`
- Okruženje izvođenja: Koristi postojeći `Dockerfile` i `fly.toml` iz repozitorija
- Trajnost podataka: Fly Volume montiran na `/data`
- URL pristupa: `https://omniroute.fly.dev/`

---

## 2. Ključna Konfiguracija Trenutnog Projekta

Potvrđeno je da `fly.toml` u trenutnom repozitoriju sadrži sljedeće ključne stavke:

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

Napomene:

- `app = 'omniroute'` određuje na koju Fly aplikaciju je postavljanje usmjereno
- `destination = '/data'` određuje direktorij za montiranje trajnog volumena
- Ovaj projekt mora postaviti `DATA_DIR=/data`, inače će baza podataka i ključevi biti zapisani u privremeni direktorij kontejnera

---

## 3. Preduvjeti

### 3.1 Instalacija Fly CLI

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Ako instalacijska skripta ne uspije u vašem okruženju, možete i ručno preuzeti `flyctl` binarnu datoteku i dodati je u vaš `PATH`.

### 3.2 Prijava na Vaš Fly Račun

```powershell
flyctl auth login
```

### 3.3 Provjera Statusa Prijave

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Prvo Postavljanje Trenutnog Projekta

### 4.1 Kloniranje Koda i Ulazak u Direktorij

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Potvrda Naziva Aplikacije

Otvorite `fly.toml` i provjerite sljedeći redak:

```toml
app = 'omniroute'
```

Ako postavljate svoju vlastitu novu aplikaciju, možete ga promijeniti u globalno jedinstven naziv, na primjer:

```toml
app = 'omniroute-vasename'
```

Napomena:

- Provjerite odgovara li aplikacija koju vidite u konzoli vrijednosti `app` u `fly.toml`
- Ako ste prethodno koristili drugi naziv, poput `oroute`, nemojte ga zamijeniti s `omniroute`

### 4.3 Kreiranje Aplikacije

Ako aplikacija još ne postoji:

```powershell
flyctl apps create omniroute
```

Ako ste promijenili naziv aplikacije, zamijenite `omniroute` s odabranim nazivom.

### 4.4 Prvo Postavljanje

```powershell
flyctl deploy
```

---

## 5. Obavezni Parametri

Ovaj projekt preporučuje konfiguriranje barem sljedećih parametara na Fly.io.

### 5.1 Provjereni Parametri

Ovi parametri korišteni su u stvarnim postavljanjima na trenutnoj `omniroute` aplikaciji:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (obavezno u produkciji — koristi se za autentifikaciju WebSocket mosta)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 O `INITIAL_PASSWORD`

Trenutni projekt ne postavlja `INITIAL_PASSWORD` jer ovo postavljanje to ne zahtijeva.

Ako nije postavljeno:

- Startup zapisnik će naznačiti da je zadana lozinka `CHANGEME`
- Trebate promijeniti lozinku za prijavu u postavkama sustava što je prije moguće nakon postavljanja

Ako želite inicijalizirati lozinku pozadinskog sustava bez nadzora, možete ga dodati kasnije:

- `INITIAL_PASSWORD`

---

## 6. Preporučeni parametri

### 6.1 Konfiguracija tajnih vrijednosti

Sljedeće varijable preporučuju se za Fly Secrets:

| Varijabla                    | Preporuka             | Opis                                                    |
| ---------------------------- | --------------------- | ------------------------------------------------------- |
| `API_KEY_SECRET`             | Obavezno              | Koristi se za generiranje i validaciju API ključeva     |
| `JWT_SECRET`                 | Obavezno              | Koristi se za sesije prijave i potpisivanje JWT-a       |
| `OMNIROUTE_WS_BRIDGE_SECRET` | Obavezno u produkciji | Tajna vrijednost za autentikaciju WebSocket mosta       |
| `STORAGE_ENCRYPTION_KEY`     | Jako preporučeno      | Šifrira osjetljive podatke o vezama u mirovanju         |
| `MACHINE_ID_SALT`            | Preporučeno           | Generira stabilan identifikator uređaja                 |
| `INITIAL_PASSWORD`           | Neobavezno            | Postavlja početnu lozinku backenda pri prvom pokretanju |
| OAuth/API privatni podaci    | Po potrebi            | Konfiguracija autentikacije za vanjske platforme        |

### 6.2 Preporučene vrijednosti za trenutni projekt

| Varijabla              | Preporučena vrijednost      |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Napomene:

- `DATA_DIR=/data` je kritično i mora odgovarati točki montiranja Fly volumena
- `NEXT_PUBLIC_BASE_URL` koriste planer, povratni pozivi sučelja i slični scenariji

### 6.3 Konfiguracija URL-a OAuth povratnog poziva

Ako trebate omogućiti pružatelje usluga temeljene na OAuth-u (npr. Antigravity, Gemini, Cursor) na Fly.io implementaciji, provjerite sljedeće dvije točke:

1. **Postavite `NEXT_PUBLIC_BASE_URL` na vašu javnu HTTPS domenu**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Ako koristite prilagođenu domenu, zamijenite je odgovarajućom domenom (npr. `https://omniroute.yourdomain.com`).

2. **Konfigurirajte URL povratnog poziva na konzoli pružatelja usluge**

   Svi OAuth pružatelji dijele jedinstvenu putanju povratnog poziva `/callback` — ne postoji zasebna putanja po pružatelju:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Na primjer, bez obzira radi li se o Geminiju, Antigravityju, Cursoru ili GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Ako se `NEXT_PUBLIC_BASE_URL` ne podudara s URL-om povratnog poziva registriranim kod pružatelja, OAuth tok će zakazati pri koraku preusmjeravanja preglednika.

---

## 7. Jednokratno postavljanje tajnih vrijednosti

Sljedeće naredbe generiraju sigurne slučajne vrijednosti i u jednom koraku zapisuju sve potrebne parametre za trenutni projekt u Fly Secrets.

Napomene:

- Ne uključuje `INITIAL_PASSWORD`
- Namijenjeno trenutnom projektu `omniroute`

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

Na Linuxu / macOS-u možete koristiti i `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Napomene:

- `OMNIROUTE_WS_BRIDGE_SECRET` je obavezno u produkciji; njegovo izostavljanje će prekinuti rukovanje WebSocket mosta

Ako također želite postaviti početnu lozinku:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Pregled trenutnih parametara

```powershell
flyctl secrets list -a omniroute
```

Ako stranica `Secrets` u konzoli ne prikazuje očekivane varijable, provjerite:

- Da pregledavate aplikaciju `omniroute`
- Da vrijednost `app` u `fly.toml` odgovara aplikaciji u konzoli

---

## 9. Naknadna ažuriranja i objave

Nakon ažuriranja koda, proces objave je jednostavan:

```powershell
git pull
flyctl deploy
```

Ako trebate samo ažurirati parametre bez promjene koda:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly će automatski izvršiti postupno ažuriranje strojeva.

### 9.1 Praćenje ažuriranja uzvodnog repozitorija uz čuvanje `fly.toml` vašeg forka

Ako je trenutni repozitorij fork i želite sinkronizirati ažuriranja iz uzvodnog `https://github.com/diegosouzapw/OmniRoute`, slijedite sljedeći tijek rada.

Prvo provjerite svoje remote veze:

```powershell
git remote -v
```

Trebali biste vidjeti najmanje:

- `origin` koji upućuje na vaš vlastiti fork
- `upstream` koji upućuje na izvorni repozitorij

Ako `upstream` nije konfiguriran, dodajte ga:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Prije sinkronizacije s uzvodom, dohvatite najnovije commitove i oznake:

```powershell
git fetch upstream --tags
```

Provjerite trenutnu verziju i uzvodne oznake:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Napomena: Trenutna verzija projekta je `v3.8.0`. Reference na `v3.4.7` u nastavku zadržane su samo kao povijesni primjeri. Za stvarne objave koristite `:latest` ili oznaku trenutne verzije (npr. `:v3.8.0`).

Ako želite spojiti najnoviji uzvodni `main` uz prisilno zadržavanje `fly.toml` vašeg forka, slijedite ovaj tijek rada:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Napomene:

- `git merge upstream/main` sinkronizira najnoviji kod iz izvornog repozitorija
- `git checkout HEAD~1 -- fly.toml` vraća vlastiti `fly.toml` vašeg forka iz stanja prije spajanja
- Ako uzvodni repozitorij nije izmijenio `fly.toml`, ovaj korak neće uvesti nikakve razlike
- Ako je uzvodni repozitorij izmijenio `fly.toml`, ovaj korak osigurava da naziv vaše Fly aplikacije, montiranje volumena, regija i ostale konfiguracije implementacije specifične za fork neće biti prepisane

Ako se želite uskladiti s određenom oznakom izdanja (npr. `v3.4.7`), prvo provjerite je li ta oznaka već uključena u `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Uspješan povrat znači da `upstream/main` već sadrži tu verziju; možete jednostavno spojiti `upstream/main`.

### 9.2 Standardni redoslijed objave nakon sinkronizacije s uzvodom

Nakon sinkronizacije s izvornim repozitorijem, slijedite ovaj preporučeni redoslijed objave:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Obnovite `fly.toml` forka
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Ovo je stvarni tijek rada korišten pri nadogradnji trenutnog projekta na `v3.4.7` (primjer se odnosi na povijesnu verziju; stvarna trenutna verzija je `v3.8.0`).

---

## 10. Provjere nakon postavljanja

### 10.1 Provjera statusa aplikacije

```powershell
flyctl status -a omniroute
```

### 10.2 Pregled zapisnika pokretanja

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Provjera dostupnosti stranice

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

Povratna vrijednost `200` označava da stranica odgovara normalno.

---

## 11. Pokazatelji uspješnosti

Nakon uspješnog postavljanja, zapisnici bi trebali prikazivati sadržaj sličan sljedećem:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Ove dvije točke su ključne:

- `/data/server.env` potvrđuje da su tajni podaci za izvođenje zapisani na trajni volumen
- `/data/storage.sqlite` potvrđuje da je baza podataka zapisana na trajni volumen

Ako umjesto toga vidite `/app/data/...`, `DATA_DIR` je pogrešno konfiguriran i mora se odmah ispraviti.

---

## 12. Uobičajeni problemi

### 12.1 Stranica `Secrets` je prazna

Obično postoje dva razloga:

- Još niste pokrenuli `flyctl secrets set`
- Pregledavate drugu aplikaciju (npr. `oroute` umjesto `omniroute`)

### 12.2 `flyctl deploy` prijavljuje `app not found`

Prvo stvorite aplikaciju:

```powershell
flyctl apps create omniroute
```

### 12.3 Parsiranje `fly.toml` ne uspijeva

Provjerite sljedeće:

- Postoje li iskrivljeni znakovi u komentarima
- Jesu li TOML navodnici i uvlačenje ispravni

### 12.4 Podaci se ne zadržavaju

Provjerite oboje od sljedećeg:

- `fly.toml` sadrži `destination = '/data'`
- `DATA_DIR` je postavljen na `/data`

### 12.5 Može li se pokrenuti bez `INITIAL_PASSWORD`?

Da, može se pokrenuti. Koristit će zadanu lozinku `CHANGEME`. Preporučuje se što prije promijeniti lozinku pozadinskog sustava u produkciji.

---

## 13. Ponovna upotreba za nove projekte

Ako postavljate novi projekt prema ovom dokumentu, trebate promijeniti samo sljedeće stavke:

1. Promijenite vrijednost `app` u `fly.toml`
2. Promijenite `NEXT_PUBLIC_BASE_URL`
3. Zadržite `DATA_DIR=/data`
4. Regenerirajte `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` i `STORAGE_ENCRYPTION_KEY`
5. Nakon prvog postavljanja, provjerite da su zapisnici zapisani u `/data`

Nemojte ponovno koristiti ključeve iz prethodnog projekta.

---

## 14. Minimalni popis provjera za objavu trenutnog projekta

Najčešće korištene naredbe za naknadne objave su:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Za normalnu objavu, osnovna naredba je jednostavno:

```powershell
flyctl deploy
```

Za prvo postavljanje u novom okruženju, osnovni koraci su:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
