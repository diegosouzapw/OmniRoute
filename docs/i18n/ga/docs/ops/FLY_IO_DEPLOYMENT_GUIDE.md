# FLY_IO_DEPLOYMENT_GUIDE (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "Treoir Imscartha OmniRoute ar Fly.io"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Treoir Imscartha OmniRoute ar Fly.io

Tugann an doc seo cur síos ar phróiseas iarbhír imscartha OmniRoute ar Fly.io, ag clúdach dhá chás:

- Imscartha an tionscadal reatha go Fly.go den chéad uair
- Foilsiú nuashonruithe cód ina dhiaidh sin
- Tionscadail nua ag leanúint an tsaothair imscartha chéanna

Bunaithe ar chumraíocht oibre cruthaithe don tionscadal reatha é an treoir seo. Ainm an fheidhmchláir is ea `omniroute`.

---

## 1. Spriocanna Imscartha

- Ardán: Fly.io
- Modh imscartha: Foilsiú díreach `flyctl` logánta
- Am rite: Ag baint úsáide as an `Dockerfile` agus `fly.toml` atá sa stór
- Leanúnachas sonraí: Imleabhar Fly curtha ar fáil ag `/data`
- Seoladh rochtana: `https://omniroute.fly.dev/`

---

## 2. Cumraíocht Sháchail an Tionscadail Reatha

Tá an `fly.toml` sa stór reatha cruthaithe leis na míreanna tábhachtacha seo a leanas:

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

Nótaí:

- Socraíonn `app = 'omniroute'` cén feidhmchlár Fly a bhfuil díriú air an t-imscaradh
- Socraíonn `destination = '/data'` an chomhadlann ina gcuirtear an imleabhar leanúnach ar fáil
- Ní mór don tionscadal seo `DATA_DIR=/data` a shocrú, murach sin, scríobhfar an bunachar sonraí agus na heochracha go comhadlann shealadach an choimeádáin

---

## 3. Réamhriachtanais

### 3.1 Suiteáil an CLI Fly

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Má theipeann ar an script suiteála i do thimpeallacht, is féidir leat an comhad den scála `flyctl` a íoslódáil de láimh agus é a chur le do `PATH`.

### 3.2 Logáil Isteach i do Chuntas Fly

```powershell
flyctl auth login
```

### 3.3 Fíoraigh Stádas Logála Isteach

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Imscartha an Chéad Uair don Tionscadal Reatha

### 4.1 Clónáil an Cód agus Déan Seiceáil ar an Eolaire

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Deimhnigh Ainm an Fheidhmchláir

Oscail `fly.toml` agus seiceáil an líne seo a leanas:

```toml
app = 'omniroute'
```

Má tá tú ag imscartha chuig feidhmchlár nua pearsanta, is féidir leat é a athrú go hainm uathúil domhanda, mar shampla:

```toml
app = 'omniroute-yourname'
```

Nóta:

- Cinntigh go bhfuil an feidhmchlár atá le feiceáil sa chonsól ag teacht le luach an `app` i `fly.toml`
- Má d'úsáid tú ainm éigin eile roimhe seo, cosúil le `oroute, ná déan é a mheascadh le `omniroute`

### 4.3 Cruthaigh an Feidhmchlár

Más rud é nach bhfuil an feidhmchlár ann fós:

```powershell
flyctl apps create omniroute
```

Mhí athraigh tú ainm an fheidhmchláir, cuir `omniroute` ina ionad leis an ainm a roghnaigh tú.

### 4.4 Imscartha den Chéad Uair

```powershell
flyctl deploy
```

---

## 5. Paraiméadair Riachtanacha

Moltar don tionscadal seo na paraiméadair seo a leanas a chur ar bun ar Fly.io.

### 5.1 Paraiméadair Cruthaithe

Úsáíodh na paraiméadair seo in imscarthaí iarbhír ar an bhfeidhmchlár reatha `omniroute`:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (riachtanach sa táirge — úsáidte le haghaidh fíordheimhniú droichid WebSocket)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 Maidir le `INITIAL_PASSWORD`

Ní shocraíonn an tionscadal reatha `INITIAL_PASSWORD` toisc nach gá é don imscaradh seo.

Más rud é nach bhfuil sé socraithe:

- Taispeánfaidh an logáil túsaimhsearach go bhfuil an pasfhocal réamhshocraithe ina `CHANGEME`
- Ba cheart duit pasfhocal logála a athrú i socruithe an chórais chomh luath agus is féidir tar éis an imscartha

Más mian leat pasfhocal an chúlra a thúsú gan teagmháil, is féidir leat é a chur leis ina dhiaidh sin:

- `INITIAL_PASSWORD`

## 6. Paraiméar molta

### 6. 1. Cumraíocht na Solaíochta

Moltar na hathróg seo a leanas do Sholaíochtaí Fly:

| Athróg                               | Moladh                   | Cur síos                                                      |
| ------------------------------------ | ------------------------ | ------------------------------------------------------------- |
| `API_KEY_SECRET`                     | Riachtanach              | Úsáidte le haghaidh ghiniúint agus bhailíochtú Eochracha API  |
| `JWT_SECRET`                         | Riachtanach              | Úsáidte le haghaidh seisiún logála isteach agus sínithe JWT   |
| `OMNIROUTE_WS_BRIDGE_SECRET`         | Riachtanach sa táirgeadh | Rúndacht fíordheimhnithe droichid WebSocket                   |
| `STORAGE_ENCRYPTION_KEY`             | Molta go láidir          | Criptíonn faisnéis ceangail íogair ag stóráil                 |
| `MACHINE_ID_SALT`                    | Molta                    | Gineann aitheantas meaisín cobhsaí                            |
| `INITIAL_PASSWORD`                   | Roghnach                 | Socraíonn pasfhocal tionscadail tosaigh ag an chéad imscaradh |
| Dintiúracha príobháideacha OAuth/API | De réir mar is gá        | Cumraíocht fíordheimhnithe ardáin seachtracha                 |

### 6. 2. Luachanna molta don tionscadal reatha

| Athróg                 | Luach Molta                 |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Nótaí:

- Tá `DATA_DIR=/data` criticiúil agus caithfidh sé a bheith ag teacht le pointe feistimh an Imleabhair Fly
- Úsáidtear `NEXT_PUBLIC_BASE_URL` ag an sceidealóir, ag aiseagcallanna an chomhéadain, agus i gcásanna cosúla leis

### 6. 3. Cumraíocht URL Aiseagcalla OAuth

Más gá duit soláthraithe atá bunaithe ar OAuth a chumasú (m.sh. Antigravity, Gemini, Cursor) ar imscaradh Fly.io, déan cinnte de na dhá phointe seo a leanas:

1. **Socraigh `NEXT_PUBLIC_BASE_URL` le do thionscnamh HTTPS poiblí**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Má tá fearann saincheaptha á úsáid agat, cuir an fearann comhfhreagrach ina ionad (m.sh. `https://omniroute.yourdomain.com`).

2. **Cumraigh an URL aiseagcalla ar an deasc soláthraí**

   Roinneann gach soláthraí an t-aon chosán aiseagcalla amháin `/callback` — NÍL aon bhóthar aiseagcalla in aghaidh an soláthraí ann:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Mar shampla, beag beann ar Gemini, Antigravity, Cursor, nó GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Mura bhfuil `NEXT_PUBLIC_BASE_URL` ag teacht leis an URL aiseagcalla atá cláraithe leis an soláthraí, theipfidh an sruthúadh ócáid ag an chéim atreorú an bhrabhsálaí.

---

## 7. Socrú Solaíochta le hAon Ordú

Gineann na horduithe seo a leanas luachanna randamach sábháilte agus scríobhann siad gach paraiméar riachtanach don tionscadal reatha chuig Soláithreachtaí Fly i n-aon chéim amháin.

Nótaí:

- Níl `INITIAL_PASSWORD` san áireamh
- Tá sé beartaithe don tionscadal reatha `omniroute`

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

Ar Linux / macOS, is féidir leat `openssl rand -hex 32` a úsáid freisin:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Nótaí:

- Tá `OMNIROUTE_WS_BRIDGE_SECRET` riachtanach sa táirgeadh; má dhéanann tú dearmad air, brisfidh sé handshaking na droichid WebSocket

Más mian leat pasfhocal tosaigh a shocrú freisin:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Ag amharc ar pharaiméirí reatha

```powershell
flyctl secrets list -a omniroute
```

Má thaispeáin leathanach na `Rúndiamhracha` sa chonsól na hathróga a bhfuiltear ag súil leo, seiceáil:

- Go bhfuil tú ag amharc ar an bhfeidhmchlár `omniroute`
- Go bhfuil an luach `app` i `fly.toml` ag teacht leis an bhfeidhmchlár sa chonsól

---

## 9. Nuashonruithe agus Scaoileadh ina dhiaidh sin

Tar éis nuashonruithe cóid, is simplí an próiseas scaoiladh:

```powershell
git pull
flyctl deploy
```

Má theastaíonn uait paraiméirí a nuashonrú gan cód a athrú:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Déanfaidh Fly uasghrádú rollaigh ar na meaisíní go huathoibríoch.

### 9.1 Ag Rianú Nuashonruithe stór上游 Ag Coinneáil `fly.toml` do Fhorc

Má tá an stór reatha ina fhorc agus más mian leat nuashonruithe a shioncronú ón stór上游 `https://github.com/diegosouzapw/OmniRoute`, lean an sreabhadh oibre seo a leanas.

Ar dtús, dearbhaigh do remotes:

```powershell
git remote -v
```

Ba cheart duit a fheiceáil ar a laghad:

- `origin` ag cur in iúl do do fhorc féin
- `upstream` ag cur in iúl don bhunstór

Má `upstream` gan cumrú, cuir é leis:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git`

```

Sula sioncrónú leis an stór上游, faigh na tiomantaí is déanaí agus na clibeanna:

```powershell
git fetch upstream --tags
```

Seiceáil an leagan reatha agus na clibeanna upstream:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Nóta: Is é leagan reatha an tionscadail ná `v3.8.0`. Coinnítear na tagairtí `v3.4.7` thíos mar shamlanna stairiúla amháin. Le haghaidh scaoilteanna fíor, úsáid `:latest` nó an clib leagan reatha (m.sh. `:v3.8.0`).

Más mian leat an príomhchuid is déanaí upstream a chumasc agus `fly.toml` do fhorc a choinneáil go forlúiteach, lean an sreabhadh oibre seo:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Nótaí:

- Sioncrónóidh `git merge upstream/main` an chód is déanaí ón bhunstór
- Athshlánóidh `git checkout HEAD~1 -- fly.toml` `fly.toml` do fhorc féin ó roimh an chumasc
- Muna ndearna an stór上游 aon athrú ar `fly.toml`, ní thabharfaidh an chéim seo aon difríochtaí isteach
- Mura ndearna an stór上游 aon athrú ar `fly.toml`, cinnteoidh an chéim seo nach ndéanfar ainm d'fheidhmchlár Fly, mount an vol, réigiún, agus cumraíocht scaoilte eile atá ar leith le do fhorc ascríobh

Más mian leat ailíniú le clib scaoilte ar leith (m.sh. `v3.4.7`), dearbhaigh ar dtús go bhfuil an chlib san áireamh cheana féin i `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Is éard is comhartha rathúil ann ná go bhfuil an leagan sin san áireamh cheana féin ag `upstream/main`; is féidir leat simplí `upstream/main` a chumasc.

### 9. 2 Seqencing scaoilte chaighdeánach tar éis sioncrónú leis an stór上游

Tar éis sioncrónú leis an bhunstór, lean an t-ord scaoilte molta seo:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Athshlán `fly.toml` na forca
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Is é seo an sreabhadh oibre fíor a úsáideadh agus an tionscadal reatha á uasghrádú go `v3.4.7` (dtagraíonn an sampla do leagan stairiúil; is é an leagan reatha fíor ná `v3.8.0`).

---

## 10. Seiceanna Iar-phoibliúcháin

### 10.1 Seiceáil Stádas an Fheidhmchláir

```powershell
flyctl status -a omniroute
```

### 10.2 Féach Logaí Túslodra

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Fíoraigh Inrochtaineacht an Láithreáin

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

Léiríonn luach filleadh de `200` go bhfuil an suíomh ag freagairt go gnáth.

---

## 11. Táscairí Ratha

I ndiaidh rathúil poibliúcháin, ba cheart go dtaispéinfí inneachar cosúil le seo sna logaí:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Tá an dá phointe seo ríthábhachtach:

- Deimhníonn `/data/server.env` go bhfuil na rúndachtaí reáchtaeilte curtha ar an imleabhar buan
- Deimhníonn `/data/storage.sqlite` go bhfuil an bunachar sonraí curtha ar an imleabhar buan

Mais amharcann tú `/app/data/...` ina ionad, tá `DATA_DIR` cumraithe go mícheart agus ní mór é a cheartú láithreach.

---

## 12. Saincheisteanna Coitianta

### 12.1 Tá an Leathanach `Secrets` Folamh

De ghnáth, tá dhá chúis:

- Níl tú tar éis `flyctl secrets set` a rith fós
- Tá tú ag breathnú ar fheidhmchlár difriúil (m.sh. `oroute` seachas `omniroute`)

### 12.2 Tuairiscíonn `flyctl deploy` `app not found`

Cruthaigh an feidhmchlár ar dtús:

```powershell
flyctl apps create omniroute
```

### 12.3 Theipeann ar Pharsáil `fly.toml`

Seiceáil an méid seo a leanas:

- An bhfuil carachtair mhíthuiscinte sna nótaí
- An bhfuil athfhriotal agus eangú TOML ceart

### 12.4 Níl an Sonraí á Sábháil

Fíoraigh an dá rud seo a leanas:

- Go bhfuil `destination = '/data'` san `fly.toml`
- Go bhfuil `DATA_DIR` socraithe go `/data`

### 12.5 An Féidir Leis Seimhneadh gan `INITIAL_PASSWORD`?

Is féidir, sí. Rithfidh sé leis an pasfhocal réamhshocraithe `CHAGNAIGHME`. Moladh pasfhocal an chúlra a athrú chomh luath agus is féidir i dtáirgeadh.

---

## 13. Athúsáid do Thionscadail Nua

Más tú ag poibliú tionscadal nua ag leanúint an cháipéis seo, ní gá duit ach na míreanna seo a leanas a athrú:

1. Athrú an luach `app` san `fly.toml`
2. Athrú `NEXT_PUBLIC_BASE_URL`
3. Coinneáil `DATA_DIR=/data`
4. Athghin `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT`, agus `STORAGE_ENCRYPTION_KEY`
5. I ndiaidh an chéad phoibliúcháin, fíoraigh go bhfuil na logaí á scríobh go `/data`

Ná athúsáid eochracha ó thionscadal roimhe seo.

---

## 14. Seiceáil Líomhain Athlasbhaint don Tionscadal Reatha

Na horduithe is úsáidí do sheachadtaí subsequent:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Le haghaidh seachadta gnáth, is é an príomhordú simplí:

```powershell
flyctl deploy
```

Le haghaidh chéad phoibliúcháin i timpeallacht nua, is iad na príomhchéimeanna:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
