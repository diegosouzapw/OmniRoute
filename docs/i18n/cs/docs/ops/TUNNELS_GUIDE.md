# Tunnels Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Zdroj pravdy:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute může zpřístupnit svůj místní server (`http://localhost:20128`) veřejnému
internetu prostřednictvím tří tunelových backendů. To je užitečné pro:

- Zpětná volání OAuth od cloudových poskytovatelů (Antigravity, Gemini, Cursor), která potřebují
  veřejně dostupnou adresu URL pro přesměrování.
- Sdílení místní instance s kolegy bez nasazování virtuálního počítače.
- Testování z mobilních zařízení, na dálku nebo napříč sítěmi.

Všechny tři backendy jsou spravovány v rámci procesu — OmniRoute spouští a zastavuje příslušný
binární soubor nebo SDK z řídicího panelu či REST API. Není nutné nastavovat reverzní proxy ani
systemd.

## Přehled backendů

| Backend                     | Perzistence                                               | Cena                               | Nastavení                                                  |
| --------------------------- | --------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Dočasná (URL se mění při každém restartu)                 | Zdarma                             | Žádné — automaticky nainstaluje `cloudflared`              |
| **ngrok**                   | Stabilní při nastavení placeného tarifu nebo pevné domény | Bezplatný tarif + placené možnosti | Vyžaduje účet ngrok + authtoken                            |
| **Tailscale Funnel**        | Stabilní pro každý uzel v rámci vašeho tailnetu           | Zdarma pro osobní použití          | Vyžaduje instalaci Tailscale + přihlášení + ACL pro Funnel |

Implementace se nacházejí v `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` a `src/lib/tailscaleTunnel.ts`. Všechny tři vracejí
objekt `status` se společnou strukturou a poli `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` a `lastError`, takže je řídicí panel může zobrazovat jednotně.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` spouští `cloudflared` jako podřízený proces. Podporuje
dva režimy, které se vybírají podle toho, zda je poskytnuta konfigurace pojmenovaného tunelu:

- **Rychlý tunel (výchozí).** Spustí `cloudflared tunnel --url
http://localhost:<apiPort>` a zpracuje přidělenou adresu URL `*.trycloudflare.com`
  ze standardního výstupu. Adresy URL jsou dočasné a při každém restartu se mění.
- **Pojmenovaný tunel (volitelný).** Když `CLOUDFLARED_CONFIG` odkazuje na místně spravovaný
  soubor `config.yml` nástroje cloudflared, OmniRoute spustí `cloudflared tunnel --no-autoupdate
--config <path> run`, čímž získáte **stabilní pojmenovaný název hostitele**. Konfigurace
  poskytuje UUID tunelu, `credentials-file` a směrování `ingress`, takže se
  nepředává `--url` a není vyžadován žádný token z řídicího panelu Zero Trust. Příkaz `run` načítá
  přihlašovací údaje z absolutní cesty `credentials-file` uvedené v konfiguraci — soubor `cert.pem`
  není potřeba (používá se pouze ke správě životního cyklu tunelu).

Klíčové chování:

- **Automatická instalace.** Při prvním použití OmniRoute stáhne nejnovější binární soubor
  `cloudflared` z oficiálních vydání na GitHubu (spravovaná instalace se nachází v
  `DATA_DIR/cloudflared/`). Kontrolní součet SHA256 staženého artefaktu je před spuštěním ověřen podle
  manifestu vydání.
- **Dohled nad procesem.** PID procesu cloudflared a zjištěná adresa URL se ukládají do
  `quick-tunnel-state.json`, aby řídicí panel mohl obnovit stav po opětovném načtení.

### Nastavení pojmenovaného tunelu (stabilní název hostitele)

1. Vytvořte místně spravovaný tunel pomocí CLI cloudflared (jednorázově):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Vytvořte soubor `~/.cloudflared/config.yml`, který směruje váš název hostitele na místní
   port API OmniRoute (výchozí je 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Nastavte OmniRoute tak, aby používal tuto konfiguraci, a (znovu) spusťte tunel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # volitelné — přepíše název hostitele hlášený OmniRoute; jinak se načte z prvního
   # pravidla ingress v konfiguraci:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Povolte tunel stejným způsobem jako rychlý tunel (REST / řídicí panel / CLI
   níže). Pojmenovaný tunel nevypisuje žádnou veřejnou adresu URL, kterou by bylo možné získat, takže připravenost je zjišťována
   z registrovaného připojení cloudflared k edge síti a hodnoty `publicUrl`/`apiUrl` jsou
   hlášeny z `CLOUDFLARED_HOSTNAME` (nebo z prvního názvu hostitele `ingress` v konfiguraci).

### Povolení / zakázání přes REST

Koncový bod používá tělo `{action: "enable" | "disable"}`, nikoli samostatné
cesty `start`/`stop`. Je vyžadováno ověření pro správu (relace správce nebo klíč API správce).

```bash
# Povolit
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stav
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Zakázat
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Nebo prostřednictvím řídicího panelu: **Nastavení → Tunely → Cloudflare**.

### Volitelné proměnné prostředí

| Proměnná                                             | Účel                                                                                                                                                                                           |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Přepíše cestu k binárnímu souboru. Pokud je nastavena a platná, OmniRoute ji použije namísto stahování.                                                                                        |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transportní protokol (výchozí `http2`; podporovány jsou také `quic` a `auto`).                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | Cesta k lokálně spravovanému souboru `config.yml` nástroje cloudflared. Je-li nastavena, OmniRoute spustí **pojmenovaný/trvalý** tunel (`tunnel --config <path> run`) namísto rychlého tunelu. |
| `CLOUDFLARED_HOSTNAME`                               | Přepíše veřejný název hostitele hlášený pojmenovaným tunelem (např. `ai.example.com`). Není-li nastavena, načte se z prvního názvu hostitele `ingress` v konfiguraci.                          |

## 2. ngrok

`src/lib/ngrokTunnel.ts` používá **SDK `@ngrok/ngrok`** (v rámci procesu, bez
podprocesu CLI). Nativní modul se při prvním spuštění importuje líně, aby na
platformách bez předkompilovaných binárních souborů nedošlo k selhání aplikace při startu.

### Předpoklady

1. Zaregistrujte se na <https://ngrok.com>.
2. Zkopírujte svůj authtoken z řídicího panelu ngrok.
3. Zadejte ho jedním z následujících způsobů:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, nebo
   - řídicí panel: **Nastavení → Tunely → ngrok**, nebo
   - tělo požadavku REST (jednorázově): `{"action":"enable","authToken":"<token>"}`.

Pokud není nakonfigurována žádná z těchto možností, stav vrátí `phase: "needs_auth"`.

### Povolení / zakázání přes REST

```bash
# Povolení (použije NGROK_AUTHTOKEN z prostředí)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Povolení s tokenem zadaným přímo
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stav
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Zakázání
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odpověď obsahuje přiřazenou adresu `publicUrl` (např.
`https://abcd-1234.ngrok-free.app`). Vlastní domény, regiony a pravidla zásad
je nutné nakonfigurovat v řídicím panelu ngrok — samotný OmniRoute pouze předává
adresu URL místního cíle sadě SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` řídí systémové CLI `tailscale`, aby zpřístupnilo
místní port API prostřednictvím služby **Funnel** (veřejný internetový výstup Tailscale pro serve).
Podporuje celý životní cyklus: instalaci, přihlášení, spuštění démona, povolení a zakázání.

Implementace spouští `tailscale funnel --bg <port>` (režim na pozadí). Veřejná
adresa URL má tvar `https://<machine>.<tailnet>.ts.net/`.

### Předpoklady

1. Nainstalujte Tailscale (nebo to nechte provést OmniRoute — viz koncový bod `install` níže).
2. Přihlaste se (`tailscale login` nebo prostřednictvím koncového bodu `login` služby OmniRoute).
3. Povolte Funnel pro svůj tailnet v konzoli pro správu Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

V systémech Linux a macOS vyžaduje ovládání démona (`tailscaled`) příkaz `sudo`.
Koncové body POST přijímají volitelné pole `sudoPassword`, které je po dobu
volání předáno do mezipaměti hesel MITM služby OmniRoute (`getCachedPassword` / `setCachedPassword`).
Systém Windows používá výchozí instalaci služby v umístění
`C:\Program Files\Tailscale\tailscale.exe`.

### Koncové body REST

Tailscale nabízí bohatší rozhraní než ostatní backendy, protože instalace,
přihlášení, démon a tunel představují samostatné oblasti.

| Koncový bod                           | Metoda | Účel                                                                      |
| ------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Souhrnný stav tunelu (`phase`, `tunnelUrl`, `apiUrl` atd.)                |
| `/api/tunnels/tailscale/check`        | `GET`  | Kontrola nižší úrovně: nainstalováno? přihlášeno? démon spuštěn?          |
| `/api/tunnels/tailscale/install`      | `POST` | Instalace Tailscale (události průběhu streamované přes SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Spuštění `tailscaled` v systému Linux/macOS                               |
| `/api/tunnels/tailscale/login`        | `POST` | Zahájení přihlášení; vrátí `authUrl` k otevření v prohlížeči              |
| `/api/tunnels/tailscale/enable`       | `POST` | Spuštění služby Funnel pro port API                                       |
| `/api/tunnels/tailscale/disable`      | `POST` | Zastavení služby Funnel                                                   |

Všechny koncové body Tailscale vyžadují autentizaci pro správu (viz `routeUtils.ts ::
requireTailscaleAuth`).

Příklad povolení:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Pokud služba Funnel není povolena v konzoli pro správu, odpověď obsahuje
`funnelNotEnabled: true` a také adresu `enableUrl`, kterou lze otevřít v prohlížeči.

### Volitelné proměnné prostředí

| Proměnná        | Účel                                           |
| --------------- | ---------------------------------------------- |
| `TAILSCALE_BIN` | Přepsání cesty k binárnímu souboru `tailscale` |

## Přehled endpointů

| Endpoint                              | Metoda | Tělo                                | Autorizace |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | správa     |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | správa     |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | správa     |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | správa     |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | správa     |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | správa     |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | správa     |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | správa     |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | správa     |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | správa     |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | správa     |

Centrální endpoint `/api/settings/tunnels` neexistuje — každý backend je
nezávislý.

## Důležité informace o zpětném volání OAuth

Pokud OmniRoute zpřístupníte prostřednictvím tunelu, řídicí panel a procesy OAuth
musí vytvářet adresy URL zpětného volání s použitím **veřejného** názvu hostitele,
nikoli `localhost`. Jinak poskytovatel OAuth přesměruje uživatele zpět na adresu
URL, ke které se jeho servery nemohou připojit, a navázání spojení selže.

Úpravy na řídicím panelu a ukládání nastavení nevyžadují nastavení názvu hostitele
tunelu v `NEXT_PUBLIC_BASE_URL`. Ověřený řídicí panel odesílá požadavky měnící
stav v rámci stejného zdroje s tokenem CSRF vázaným na relaci, takže dočasné
hostitele Cloudflare Quick Tunnel lze po přihlášení nadále používat k běžné
správě uživatelského rozhraní.

Nastavte:

```bash
NEXT_PUBLIC_BASE_URL=https://<váš-hostitel-tunelu>
```

a před zahájením OAuth restartujte OmniRoute. U dočasných tunelů Cloudflare Quick
Tunnel se adresa URL po každém restartu změní, proto pro produkční použití OAuth
upřednostněte ngrok s rezervovanou doménou nebo Tailscale Funnel.

## Stav a monitorování

Řídicí panel zobrazuje stav tunelu v části **Nastavení → Tunely**:

- Aktivní backendy a aktuální `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Aktuální veřejnou adresu URL a odvozenou adresu URL rozhraní API
  (`<publicUrl>/v1`).
- Místní cílovou adresu URL, na kterou tunel přesměrovává provoz.
- Poslední chybovou zprávu, pokud existuje.

Pro programové monitorování se pravidelně dotazujte jednotlivých endpointů `GET`
pro každý backend. Souběžný provoz více backendů je povolen; OmniRoute bude každý
z nich sledovat nezávisle.

## Řešení problémů

### „Binární soubor cloudflared nebyl nalezen“

OmniRoute se při prvním použití pokusí o automatickou instalaci. Pokud je instalace
zablokována (omezená síť, chybějící přístup ke GitHubu), stáhněte `cloudflared`
ručně z <https://github.com/cloudflare/cloudflared/releases> a nastavte
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: je vyžadován authtoken“

`phase: "needs_auth"` znamená, že nebyl nalezen žádný authtoken. Nastavte
`NGROK_AUTHTOKEN` v souboru `.env`, nakonfigurujte jej prostřednictvím řídicího
panelu nebo předejte `authToken` v těle požadavku POST pro povolení.

### „tailscale: funnel není povolen“

Pokud odpověď na povolení obsahuje `funnelNotEnabled: true`, je Funnel pro váš
tailnet zakázán. Otevřete vrácenou adresu `enableUrl` (nebo stránku funkce v
konzoli pro správu) a Funnel zapněte.

### Změny adresy URL tunelu narušují OAuth

Použijte ngrok s rezervovanou doménou nebo Tailscale Funnel (obě možnosti jsou
stabilní pro každý uzel). Tunely Cloudflare Quick Tunnel jsou z principu dočasné
a pro dlouhodobá zpětná volání OAuth se nedoporučují.

### Oprávnění odepřeno v systémech Linux/macOS pro Tailscale

`tailscaled` vyžaduje oprávnění uživatele root. Předejte `sudoPassword`
příslušnému endpointu POST nebo spusťte démona sami
(`sudo systemctl start tailscaled`).

## Viz také

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — odchozí proxy (1proxy, SOCKS5, HTTP) pro
  odchozí provoz.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — úplný seznam proměnných prostředí včetně
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativy k tunelování pro stabilní
  veřejný hosting.
- Zdroj: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
