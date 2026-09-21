# Tunnels Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Hiteles forrás:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Legutóbb frissítve:** 2026-06-28 — v3.8.40

Az OmniRoute három alagút-háttérrendszeren keresztül teheti elérhetővé a helyi
kiszolgálóját (`http://localhost:20128`) a nyilvános interneten. Ez a következőkhöz
hasznos:

- Olyan felhőszolgáltatók OAuth-visszahívásaihoz (Antigravity, Gemini, Cursor),
  amelyeknek nyilvánosan elérhető átirányítási URL-re van szükségük.
- A helyi példány megosztásához a csapattársakkal virtuális gép üzembe helyezése nélkül.
- Mobilos, távoli vagy hálózatok közötti teszteléshez.

Mindhárom háttérrendszer folyamaton belül kezelhető — az OmniRoute az irányítópultról
vagy a REST API-n keresztül indítja el és állítja le az alapul szolgáló bináris
állományt vagy SDK-t. Nincs szükség fordított proxy vagy systemd beállítására.

## A háttérrendszerek áttekintése

| Háttérrendszer              | Állandóság                                                      | Költség                        | Beállítás                                                  |
| --------------------------- | --------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Ideiglenes (az URL minden újraindításkor megváltozik)           | Ingyenes                       | Nincs — automatikusan telepíti a `cloudflared` programot   |
| **ngrok**                   | Stabil, amíg fizetős csomag vagy rögzített domain van beállítva | Ingyenes szint + fizetős       | ngrok-fiók és authtoken szükséges                          |
| **Tailscale Funnel**        | Csomópontonként stabil a tailneten belül                        | Személyes használatra ingyenes | Tailscale-telepítés, bejelentkezés és Funnel ACL szükséges |

A megvalósítások a `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` és `src/lib/tailscaleTunnel.ts` fájlokban találhatók.
Mindhárom azonos szerkezetű `status` objektumot ad vissza `phase`, `running`,
`publicUrl`, `apiUrl`, `targetUrl` és `lastError` mezőkkel, így az irányítópult
egységesen jelenítheti meg őket.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

A `src/lib/cloudflaredTunnel.ts` gyermekfolyamatként futtatja a `cloudflared`
programot. Két módot támogat, amelyek közül az elnevezett alagút konfigurációjának
megléte alapján választ:

- **Gyors alagút (alapértelmezett).** Futtatja a `cloudflared tunnel --url
http://localhost:<apiPort>` parancsot, és a szabványos kimenetből kinyeri a
  hozzárendelt `*.trycloudflare.com` URL-t. Az URL-ek ideiglenesek, és minden
  újraindításkor megváltoznak.
- **Elnevezett alagút (külön engedélyezhető).** Amikor a `CLOUDFLARED_CONFIG` egy
  helyileg kezelt cloudflared `config.yml` fájlra mutat, az OmniRoute a
  `cloudflared tunnel --no-autoupdate --config <path> run` parancsot futtatja,
  így **stabil, elnevezett állomásnevet** biztosít. A konfiguráció adja meg az
  alagút UUID-jét, a `credentials-file` értékét és az `ingress` útválasztását,
  ezért a rendszer nem ad át `--url` kapcsolót, és nincs szükség Zero Trust
  irányítópulttokenre. A `run` a konfigurációban szereplő abszolút
  `credentials-file` elérési útról olvassa be a hitelesítő adatokat — nincs
  szükség `cert.pem` fájlra (az csak az alagút életciklusának kezeléséhez használatos).

Főbb működési jellemzők:

- **Automatikus telepítés.** Az első használatkor az OmniRoute letölti a legújabb
  `cloudflared` bináris állományt a hivatalos GitHub-kiadásokból (a kezelt
  telepítés a `DATA_DIR/cloudflared/` alatt található). A letöltött csomag SHA256
  ellenőrzőösszegét a rendszer végrehajtás előtt összeveti a kiadási jegyzékkel.
- **Folyamatfelügyelet.** A cloudflared PID-je és a feloldott URL a
  `quick-tunnel-state.json` fájlban marad meg, így az irányítópult újratöltések
  után is folytathatja az állapot megjelenítését.

### Elnevezett alagút beállítása (stabil állomásnév)

1. Hozzon létre egy helyileg kezelt alagutat a cloudflared CLI használatával
   (egyszeri művelet):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Hozzon létre egy `~/.cloudflared/config.yml` fájlt, amely az állomásnevet az
   OmniRoute helyi API-portjára irányítja (alapértelmezés szerint 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Állítsa be, hogy az OmniRoute a konfigurációt használja, majd indítsa el vagy
   indítsa újra az alagutat:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opcionális — felülírja az OmniRoute által jelentett állomásnevet; ellenkező esetben
   # a konfiguráció első ingress szabályából olvassa be:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Az alagutat ugyanúgy engedélyezheti, mint egy gyors alagutat (REST /
   irányítópult / az alábbi CLI). Az elnevezett alagút nem bocsát ki kinyerhető
   nyilvános URL-t, ezért a készenléti állapotot a cloudflared regisztrált
   peremhálózati kapcsolata alapján észleli a rendszer, a `publicUrl`/`apiUrl`
   értékét pedig a `CLOUDFLARED_HOSTNAME` (vagy a konfiguráció első ingress
   állomásneve) alapján jelenti.

### Engedélyezés / letiltás REST használatával

A végpont különálló `start`/`stop` útvonalak helyett
`{action: "enable" | "disable"}` törzset használ. Kezelői hitelesítés
(rendszergazdai munkamenet vagy rendszergazdai API-kulcs) szükséges.

```bash
# Engedélyezés
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Állapot
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Letiltás
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Vagy az irányítópulton keresztül: **Beállítások → Alagutak → Cloudflare**.

### Opcionális környezeti változók

| Változó                                              | Cél                                                                                                                                                                                     |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Felülírja a bináris fájl elérési útját. Ha be van állítva és érvényes, az OmniRoute ezt használja a letöltés helyett.                                                                   |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Átviteli protokoll (alapértelmezett: `http2`; további lehetőségek: `quic`, `auto`).                                                                                                     |
| `CLOUDFLARED_CONFIG`                                 | A helyileg kezelt cloudflared `config.yml` elérési útja. Ha be van állítva, az OmniRoute egy **elnevezett/állandó** alagutat (`tunnel --config <path> run`) futtat gyorsalagút helyett. |
| `CLOUDFLARED_HOSTNAME`                               | Felülírja az elnevezett alagút által jelentett nyilvános állomásnevet (pl. `ai.example.com`). Ha nincs beállítva, a konfiguráció első `ingress` állomásnevéből olvassa ki.              |

## 2. ngrok

A `src/lib/ngrokTunnel.ts` az **`@ngrok/ngrok` SDK-t** használja (folyamaton belül, CLI-alfolyamat nélkül). A natív modul lusta betöltéssel, az első indításkor kerül importálásra, így az előre lefordított binárisokkal nem rendelkező platformokon az alkalmazás nem hibásodik meg rendszerindításkor.

### Előfeltételek

1. Regisztráljon a <https://ngrok.com> oldalon.
2. Másolja ki az authtokent az ngrok vezérlőpultjáról.
3. Adja meg az alábbi módok egyikén:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, vagy
   - Vezérlőpult: **Beállítások → Alagutak → ngrok**, vagy
   - REST-törzs (egyszeri): `{"action":"enable","authToken":"<token>"}`.

Ha egyik sincs beállítva, az állapot `phase: "needs_auth"` értéket ad vissza.

### Engedélyezés / letiltás REST-en keresztül

```bash
# Engedélyezés (a környezetből származó NGROK_AUTHTOKEN használatával)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Engedélyezés közvetlenül megadott tokennel
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Állapot
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Letiltás
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

A válasz tartalmazza a hozzárendelt `publicUrl` értéket (például:
`https://abcd-1234.ngrok-free.app`). Az egyéni tartományokat, régiókat és házirendszabályokat az ngrok vezérlőpultján kell konfigurálni — maga az OmniRoute csak a helyi cél-URL-t továbbítja az SDK-nak.

## 3. Tailscale Funnel

A `src/lib/tailscaleTunnel.ts` a rendszer `tailscale` CLI-jét vezérli, hogy a helyi API-portot a **Funnel** segítségével tegye elérhetővé (a Tailscale nyilvános internetes kimenete a serve számára). A teljes életciklust támogatja: telepítés, bejelentkezés, démonindítás, engedélyezés és letiltás.

A megvalósítás a `tailscale funnel --bg <port>` parancsot hívja meg (háttérmód). A nyilvános URL formátuma: `https://<machine>.<tailnet>.ts.net/`.

### Előfeltételek

1. Telepítse a Tailscale-t (vagy bízza ezt az OmniRoute-ra — lásd alább az `install` végpontot).
2. Jelentkezzen be (`tailscale login`, vagy az OmniRoute `login` végpontján keresztül).
3. Engedélyezze a Funnelt a tailnethez a Tailscale adminisztrációs konzolján:
   <https://login.tailscale.com/admin/settings/features>.

Linuxon és macOS-en a démon (`tailscaled`) vezérléséhez `sudo` szükséges. A POST-végpontok elfogadnak egy opcionális `sudoPassword` mezőt, amelyet a hívás időtartamára továbbítanak az OmniRoute MITM-jelszógyorsítótárának (`getCachedPassword` / `setCachedPassword`). A Windows az alapértelmezett szolgáltatástelepítést használja a `C:\Program Files\Tailscale\tailscale.exe` útvonalon.

### REST-végpontok

A Tailscale a többi háttérrendszernél gazdagabb felületet kínál, mivel a telepítés, a bejelentkezés, a démon és az alagút különálló funkciók.

| Végpont                               | Metódus | Cél                                                                                           |
| ------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | Összesített alagútállapot (`phase`, `tunnelUrl`, `apiUrl` stb.)                               |
| `/api/tunnels/tailscale/check`        | `GET`   | Alacsonyabb szintű ellenőrzés: telepítve van? be van jelentkezve? fut a démon?                |
| `/api/tunnels/tailscale/install`      | `POST`  | A Tailscale telepítése (SSE-n közvetített folyamatesemények) — Linux/macOS                    |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | A `tailscaled` elindítása Linuxon/macOS-en                                                    |
| `/api/tunnels/tailscale/login`        | `POST`  | A bejelentkezési folyamat elindítása; egy böngészőben megnyitható `authUrl` értéket ad vissza |
| `/api/tunnels/tailscale/enable`       | `POST`  | A Funnel elindítása az API-porthoz                                                            |
| `/api/tunnels/tailscale/disable`      | `POST`  | A Funnel leállítása                                                                           |

Minden Tailscale-végpont kezelési hitelesítést igényel (lásd: `routeUtils.ts ::
requireTailscaleAuth`).

Példa az engedélyezésre:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ha a Funnel nincs engedélyezve az adminisztrációs konzolon, a válasz tartalmazza a `funnelNotEnabled: true` értéket, valamint egy böngészőben megnyitható `enableUrl` értéket.

### Opcionális környezeti változók

| Változó         | Cél                                             |
| --------------- | ----------------------------------------------- |
| `TAILSCALE_BIN` | A `tailscale` bináris útvonalának felülbírálása |

## Végpontok összefoglalása

| Végpont                               | Metódus | Törzs                               | Hitelesítés |
| ------------------------------------- | ------- | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`   | —                                   | felügyeleti |
| `/api/tunnels/cloudflared`            | `POST`  | `{action: "enable" \| "disable"}`   | felügyeleti |
| `/api/tunnels/ngrok`                  | `GET`   | —                                   | felügyeleti |
| `/api/tunnels/ngrok`                  | `POST`  | `{action, authToken?}`              | felügyeleti |
| `/api/tunnels/tailscale`              | `GET`   | —                                   | felügyeleti |
| `/api/tunnels/tailscale/check`        | `GET`   | —                                   | felügyeleti |
| `/api/tunnels/tailscale/install`      | `POST`  | `{sudoPassword?}` (SSE)             | felügyeleti |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `{sudoPassword?}`                   | felügyeleti |
| `/api/tunnels/tailscale/login`        | `POST`  | `{hostname?}`                       | felügyeleti |
| `/api/tunnels/tailscale/enable`       | `POST`  | `{sudoPassword?, hostname?, port?}` | felügyeleti |
| `/api/tunnels/tailscale/disable`      | `POST`  | `{sudoPassword?}`                   | felügyeleti |

Nincs központi `/api/settings/tunnels` végpont — minden háttérrendszer
független.

## Az OAuth-visszahívás szempontjai

Amikor alagúton keresztül teszi elérhetővé az OmniRoute-ot, az irányítópultnak és az OAuth-folyamatoknak
a **nyilvános** állomásnév alapján kell összeállítaniuk a visszahívási URL-eket, nem a `localhost` alapján. Ellenkező esetben
az OAuth-szolgáltató egy olyan URL-re irányítja vissza a felhasználót, amelyet a kiszolgálói nem tudnak elérni,
és a kézfogás meghiúsul.

Az irányítópulton végzett módosításokhoz és a beállítások mentéséhez nem szükséges rögzíteni az alagút állomásnevét a
`NEXT_PUBLIC_BASE_URL` változóban. A hitelesített irányítópult azonos eredetű, nem biztonságos
kéréseket küld egy munkamenethez kötött CSRF-tokennel, így az ideiglenes Cloudflare Quick Tunnel
állomásnevek a bejelentkezés után továbbra is használhatók a normál felületi kezeléshez.

Állítsa be:

```bash
NEXT_PUBLIC_BASE_URL=https://<az-alagút-állomásneve>
```

majd az OAuth elindítása előtt indítsa újra az OmniRoute-ot. Az ideiglenes Cloudflare Quick
Tunnelek URL-je minden újraindítás után megváltozik, ezért éles OAuth-használathoz részesítse előnyben a fenntartott
domainnel rendelkező ngrokot vagy a Tailscale Funnelt.

## Állapot és monitorozás

Az irányítópult az alagutak állapotát a **Beállítások → Alagutak** alatt jeleníti meg:

- Az aktív háttérrendszer(ek) és az aktuális `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Az aktuális nyilvános URL és az abból származtatott API-URL (`<publicUrl>/v1`).
- Az a helyi cél-URL, amelyre az alagút továbbít.
- Az utolsó hibaüzenet, ha van.

Programozott monitorozáshoz rendszeresen kérdezze le a háttérrendszerenkénti `GET` végpontokat. Egynél
több háttérrendszer egyidejű futtatása engedélyezett; az OmniRoute mindegyiket
függetlenül követi nyomon.

## Hibaelhárítás

### „A cloudflared bináris nem található”

Az OmniRoute az első használatkor megpróbálja automatikusan telepíteni. Ha a telepítés blokkolva van
(korlátozott hálózat, nincs GitHub-hozzáférés), töltse le manuálisan a `cloudflared` fájlt innen:
<https://github.com/cloudflare/cloudflared/releases>, majd állítsa be a
`CLOUDFLARED_BIN=/path/to/cloudflared` értéket.

### „ngrok: authtoken szükséges”

A `phase: "needs_auth"` azt jelenti, hogy nem található authtoken. Állítsa be az `NGROK_AUTHTOKEN` változót az
`.env` fájlban, konfigurálja az irányítópulton keresztül, vagy adja át az `authToken` értéket az engedélyező POST-kérés
törzsében.

### „tailscale: a funnel nincs engedélyezve”

Ha az engedélyezési válasz tartalmazza a `funnelNotEnabled: true` értéket, akkor a Funnel le van tiltva
a tailnethez. Nyissa meg a visszaadott `enableUrl` címet (vagy a felügyeleti konzol funkcióoldalát),
és kapcsolja be a Funnelt.

### Az alagút URL-jének változásai megszakítják az OAuth-ot

Használjon fenntartott domainnel rendelkező ngrokot vagy Tailscale Funnelt (mindkettő csomópontonként stabil).
A Cloudflare Quick Tunnelek jellegükből adódóan ideiglenesek, ezért hosszú távú
OAuth-visszahívásokhoz nem ajánlottak.

### Engedély megtagadva Linux/macOS rendszeren a Tailscale használatakor

A `tailscaled` root jogosultságot igényel. Adja meg a `sudoPassword` értéket a megfelelő POST-végpontnak,
vagy futtassa saját maga a démont (`sudo systemctl start tailscaled`).

## Lásd még

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — kimenő proxy (1proxy, SOCKS5, HTTP) a kimenő
  forgalomhoz.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — a környezeti változók teljes listája,
  beleértve a `NEXT_PUBLIC_BASE_URL` változót.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — az alagútkezelés alternatívái stabil,
  nyilvános üzemeltetéshez.
- Forrás: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
