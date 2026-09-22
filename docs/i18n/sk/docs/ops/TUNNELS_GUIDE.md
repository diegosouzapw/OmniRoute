# Tunnels Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Zdroj pravdy:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute môže sprístupniť svoj lokálny server (`http://localhost:20128`) verejnému
internetu prostredníctvom troch tunelovacích backendov. Je to užitočné na:

- spätné volania OAuth od cloudových poskytovateľov (Antigravity, Gemini, Cursor), ktoré potrebujú
  verejne dostupnú URL adresu presmerovania;
- zdieľanie lokálnej inštancie s kolegami bez nasadenia virtuálneho počítača;
- testovanie z mobilných zariadení, na diaľku alebo medzi rôznymi sieťami.

Všetky tri backendy sa spravujú priamo v procese — OmniRoute spúšťa a zastavuje príslušný
binárny súbor alebo SDK z ovládacieho panela alebo cez REST API. Nie je potrebné nastavovať
reverzný proxy server ani systemd.

## Prehľad backendov

| Backend                     | Trvácnosť                                                        | Cena                         | Nastavenie                                                   |
| --------------------------- | ---------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Dočasný (URL sa mení pri každom reštarte)                        | Bezplatné                    | Žiadne — automaticky nainštaluje `cloudflared`               |
| **ngrok**                   | Stabilný pri nakonfigurovanom platenom pláne alebo pevnej doméne | Bezplatná úroveň + platené   | Vyžaduje účet ngrok + authtoken                              |
| **Tailscale Funnel**        | Stabilný pre každý uzol v rámci vašej siete tailnet              | Bezplatné na osobné použitie | Vyžaduje inštaláciu Tailscale + prihlásenie + ACL pre Funnel |

Implementácie sa nachádzajú v `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` a `src/lib/tailscaleTunnel.ts`. Všetky tri vracajú
objekt `status` s rovnakou štruktúrou a poľami `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` a `lastError`, takže ich ovládací panel môže zobrazovať jednotne.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` spúšťa `cloudflared` ako podradený proces. Podporuje
dva režimy, pričom výber závisí od toho, či je poskytnutá konfigurácia pomenovaného tunela:

- **Rýchly tunel (predvolené).** Spustí `cloudflared tunnel --url
http://localhost:<apiPort>` a z výstupu stdout načíta pridelenú URL adresu `*.trycloudflare.com`.
  URL adresy sú dočasné a menia sa pri každom reštarte.
- **Pomenovaný tunel (voliteľné).** Keď `CLOUDFLARED_CONFIG` odkazuje na lokálne spravovaný
  súbor `config.yml` nástroja cloudflared, OmniRoute spustí `cloudflared tunnel --no-autoupdate
--config <path> run`, čím získate **stabilný pomenovaný názov hostiteľa**. Konfigurácia
  obsahuje UUID tunela, `credentials-file` a smerovanie `ingress`, takže sa
  neposiela `--url` a nie je potrebný token ovládacieho panela Zero Trust. Príkaz `run` načíta
  prihlasovacie údaje z absolútnej cesty `credentials-file` v konfigurácii — súbor `cert.pem`
  nie je potrebný (používa sa iba na správu životného cyklu tunela).

Kľúčové správanie:

- **Automatická inštalácia.** Pri prvom použití OmniRoute stiahne najnovší binárny súbor
  `cloudflared` z oficiálnych vydaní na GitHube (spravovaná inštalácia sa nachádza v
  `DATA_DIR/cloudflared/`). Kontrolný súčet SHA256 stiahnutého súboru sa pred spustením
  overí podľa manifestu vydania.
- **Dohľad nad procesom.** PID procesu cloudflared a zistená URL adresa sa ukladajú do
  `quick-tunnel-state.json`, aby ovládací panel mohol obnoviť stav po opätovnom načítaní.

### Nastavenie pomenovaného tunela (stabilný názov hostiteľa)

1. Pomocou CLI nástroja cloudflared vytvorte lokálne spravovaný tunel (jednorazovo):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Vytvorte súbor `~/.cloudflared/config.yml`, ktorý bude smerovať váš názov hostiteľa na lokálny
   port API služby OmniRoute (predvolene 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Nastavte v OmniRoute cestu ku konfigurácii a (znova) spustite tunel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # voliteľné — prepíše názov hostiteľa, ktorý hlási OmniRoute; inak sa načíta z
   # prvého pravidla ingress v konfigurácii:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Tunel povoľte rovnakým spôsobom ako rýchly tunel (REST / ovládací panel / CLI
   nižšie). Pomenovaný tunel neposkytuje vo výstupe verejnú URL adresu, ktorú by bolo možné načítať,
   takže pripravenosť sa zisťuje z registrovaného pripojenia cloudflared k okrajovej sieti a hodnoty
   `publicUrl`/`apiUrl` sa získavajú z `CLOUDFLARED_HOSTNAME` (alebo z prvého názvu hostiteľa
   `ingress` v konfigurácii).

### Povolenie / zakázanie cez REST

Koncový bod používa telo `{action: "enable" | "disable"}`, nie samostatné cesty
`start`/`stop`. Vyžaduje sa autentifikácia na správu (relácia správcu alebo kľúč API správcu).

```bash
# Povolenie
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stav
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Zakázanie
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Alebo prostredníctvom ovládacieho panela: **Nastavenia → Tunely → Cloudflare**.

### Voliteľné premenné prostredia

| Premenná                                             | Účel                                                                                                                                                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Prepíše cestu k binárnemu súboru. Ak je nastavená a platná, OmniRoute ju použije namiesto sťahovania.                                                                                    |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportný protokol (predvolene `http2`; podporované sú aj `quic`, `auto`).                                                                                                             |
| `CLOUDFLARED_CONFIG`                                 | Cesta k lokálne spravovanému súboru `config.yml` pre cloudflared. Ak je nastavená, OmniRoute spustí **pomenovaný/trvalý** tunel (`tunnel --config <path> run`) namiesto rýchleho tunela. |
| `CLOUDFLARED_HOSTNAME`                               | Prepíše hlásený verejný názov hostiteľa pomenovaného tunela (napr. `ai.example.com`). Ak nie je nastavená, načíta sa z prvého názvu hostiteľa `ingress` v konfigurácii.                  |

## 2. ngrok

`src/lib/ngrokTunnel.ts` používa **SDK `@ngrok/ngrok`** (priamo v procese, bez podprocesu CLI). Natívny modul sa importuje lenivo pri prvom spustení, takže platformy bez vopred zostavených binárnych súborov nespôsobia zlyhanie aplikácie pri spúšťaní.

### Predpoklady

1. Zaregistrujte sa na <https://ngrok.com>.
2. Skopírujte svoj autentifikačný token z ovládacieho panela ngrok.
3. Poskytnite ho jedným z nasledujúcich spôsobov:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, alebo
   - ovládací panel: **Settings → Tunnels → ngrok**, alebo
   - telo požiadavky REST (jednorazovo): `{"action":"enable","authToken":"<token>"}`.

Ak nie je nakonfigurovaná žiadna z týchto možností, stav vráti `phase: "needs_auth"`.

### Povolenie/zákaz cez REST

```bash
# Povolenie (použije NGROK_AUTHTOKEN z prostredia)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Povolenie s tokenom uvedeným priamo
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stav
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Zákaz
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odpoveď obsahuje pridelenú adresu `publicUrl` (napr.
`https://abcd-1234.ngrok-free.app`). Vlastné domény, regióny a pravidlá politík musia byť nakonfigurované v ovládacom paneli ngrok — samotný OmniRoute iba odovzdáva lokálnu cieľovú URL adresu súprave SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` riadi systémové CLI `tailscale`, aby prostredníctvom služby **Funnel** (verejný internetový výstup Tailscale pre funkciu serve) sprístupnil lokálny port API. Podporuje celý životný cyklus: inštaláciu, prihlásenie, spustenie démona, povolenie a zákaz.

Implementácia spúšťa `tailscale funnel --bg <port>` (režim na pozadí). Verejná URL adresa má tvar `https://<machine>.<tailnet>.ts.net/`.

### Predpoklady

1. Nainštalujte Tailscale (alebo to nechajte urobiť OmniRoute — pozrite si koncový bod `install` nižšie).
2. Prihláste sa (`tailscale login` alebo prostredníctvom koncového bodu `login` systému OmniRoute).
3. Povoľte Funnel pre svoju sieť tailnet v konzole správcu Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

V systémoch Linux a macOS vyžaduje ovládanie démona (`tailscaled`) príkaz `sudo`. Koncové body POST prijímajú voliteľné pole `sudoPassword`, ktoré sa počas trvania volania odovzdá do vyrovnávacej pamäte hesiel MITM systému OmniRoute (`getCachedPassword` / `setCachedPassword`). Windows používa predvolenú inštaláciu služby v umiestnení `C:\Program Files\Tailscale\tailscale.exe`.

### Koncové body REST

Tailscale poskytuje bohatšie rozhranie než ostatné backendy, pretože inštalácia, prihlásenie, démon a tunel predstavujú samostatné oblasti.

| Koncový bod                           | Metóda | Účel                                                                                   |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Súhrnný stav tunela (`phase`, `tunnelUrl`, `apiUrl` atď.)                              |
| `/api/tunnels/tailscale/check`        | `GET`  | Kontrola nižšej úrovne: je nainštalovaný? Je používateľ prihlásený? Je démon spustený? |
| `/api/tunnels/tailscale/install`      | `POST` | Inštalácia Tailscale (udalosti priebehu streamované cez SSE) — Linux/macOS             |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Spustenie `tailscaled` v systéme Linux/macOS                                           |
| `/api/tunnels/tailscale/login`        | `POST` | Spustenie prihlasovania; vráti `authUrl`, ktorú treba otvoriť v prehliadači            |
| `/api/tunnels/tailscale/enable`       | `POST` | Spustenie služby Funnel pre port API                                                   |
| `/api/tunnels/tailscale/disable`      | `POST` | Zastavenie služby Funnel                                                               |

Všetky koncové body Tailscale vyžadujú autentifikáciu na správu (pozrite si `routeUtils.ts ::
requireTailscaleAuth`).

Príklad povolenia:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Ak služba Funnel nie je povolená v konzole správcu, odpoveď obsahuje `funnelNotEnabled: true` spolu s adresou `enableUrl`, ktorú treba otvoriť v prehliadači.

### Voliteľné premenné prostredia

| Premenná        | Účel                                            |
| --------------- | ----------------------------------------------- |
| `TAILSCALE_BIN` | Prepísanie cesty k binárnemu súboru `tailscale` |

## Súhrn endpointov

| Endpoint                              | Metóda | Telo                                | Autorizácia |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management  |

Neexistuje žiadny centrálny endpoint `/api/settings/tunnels` — každý backend je
nezávislý.

## Aspekty spätného volania OAuth

Keď sprístupníte OmniRoute prostredníctvom tunela, ovládací panel a toky OAuth
musia vytvárať adresy URL spätného volania voči **verejnému** názvu hostiteľa,
nie voči `localhost`. V opačnom prípade poskytovateľ OAuth presmeruje používateľa
späť na adresu URL, ku ktorej sa jeho servery nedokážu pripojiť, a nadviazanie
spojenia zlyhá.

Úpravy na ovládacom paneli a ukladanie nastavení nevyžadujú nastavenie názvu
hostiteľa tunela v `NEXT_PUBLIC_BASE_URL`. Autentifikovaný ovládací panel odosiela
požiadavky meniace stav v rámci rovnakého pôvodu s tokenom CSRF viazaným na
reláciu, takže dočasných hostiteľov Cloudflare Quick Tunnel možno aj po prihlásení
naďalej používať na bežnú správu prostredníctvom používateľského rozhrania.

Nastavte:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

a pred spustením OAuth reštartujte OmniRoute. V prípade dočasných tunelov
Cloudflare Quick Tunnel sa adresa URL zmení po každom reštarte, preto pri
produkčnom používaní OAuth uprednostnite ngrok s rezervovanou doménou alebo
Tailscale Funnel.

## Stav a monitorovanie

Ovládací panel zobrazuje stav tunelov v časti **Nastavenia → Tunely**:

- Aktívne backendy a aktuálnu hodnotu `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Aktuálnu verejnú adresu URL a odvodenú adresu URL rozhrania API
  (`<publicUrl>/v1`).
- Lokálnu cieľovú adresu URL, na ktorú tunel presmerúva.
- Posledné chybové hlásenie, ak existuje.

Na programové monitorovanie pravidelne kontrolujte endpointy `GET` jednotlivých
backendov. Súbežné spustenie viacerých backendov je povolené; OmniRoute bude
každý z nich sledovať nezávisle.

## Riešenie problémov

### „Binárny súbor cloudflared sa nenašiel“

OmniRoute sa ho pri prvom použití pokúsi automaticky nainštalovať. Ak je
inštalácia zablokovaná (obmedzená sieť, bez prístupu ku GitHubu), stiahnite
`cloudflared` manuálne z adresy
<https://github.com/cloudflare/cloudflared/releases> a nastavte
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: vyžaduje sa authtoken“

`phase: "needs_auth"` znamená, že sa nenašiel žiadny authtoken. Nastavte
`NGROK_AUTHTOKEN` v súbore `.env`, nakonfigurujte ho prostredníctvom ovládacieho
panela alebo odovzdajte `authToken` v tele požiadavky POST na aktiváciu.

### „tailscale: funnel nie je povolený“

Keď odpoveď na aktiváciu obsahuje `funnelNotEnabled: true`, Funnel je pre váš
tailnet zakázaný. Otvorte vrátenú adresu `enableUrl` (alebo stránku funkcie
v konzole správcu) a zapnite Funnel.

### Zmeny adresy URL tunela narušia OAuth

Použite ngrok s rezervovanou doménou alebo Tailscale Funnel (obe možnosti sú
stabilné pre každý uzol). Tunely Cloudflare Quick Tunnel sú z princípu dočasné
a neodporúčajú sa pre dlhodobo používané spätné volania OAuth.

### Odmietnutie prístupu v systémoch Linux/macOS pre Tailscale

`tailscaled` vyžaduje oprávnenia používateľa root. Odovzdajte `sudoPassword`
príslušnému endpointu POST alebo spustite démona sami
(`sudo systemctl start tailscaled`).

## Pozrite tiež

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — odchádzajúci proxy server (1proxy, SOCKS5, HTTP) pre
  odchádzajúcu komunikáciu.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — úplný zoznam premenných prostredia vrátane
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatívy k tunelovaniu na stabilný
  verejný hosting.
- Zdroj: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
