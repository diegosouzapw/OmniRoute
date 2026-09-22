# Tunnels Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute හට tunnel backend තුනක් හරහා එහි දේශීය server එක (`http://localhost:20128`) පොදු
අන්තර්ජාලයට නිරාවරණය කළ හැක. මෙය පහත අවස්ථා සඳහා ප්රයෝජනවත් වේ:

- පොදුවේ ප්රවේශ විය හැකි redirect URL එකක් අවශ්ය වන cloud provider (Antigravity, Gemini, Cursor) වෙතින් ලැබෙන
  OAuth callback.
- VM එකක් deploy නොකර ඔබගේ දේශීය instance එක කණ්ඩායම් සාමාජිකයන් සමඟ බෙදා ගැනීම.
- ජංගම, දුරස්ථ, හෝ ජාල අතර පරීක්ෂණ.

backend තුනම process එක තුළම කළමනාකරණය කෙරේ — OmniRoute විසින් dashboard එකෙන් හෝ REST API එකෙන් අදාළ
binary එක හෝ SDK එක ආරම්භ/නවත්වයි. reverse-proxy හෝ systemd සැකසුමක්
අවශ්ය නොවේ.

## backend පිළිබඳ කෙටි සාරාංශයක්

| Backend                     | ස්ථායිතාව                                                          | පිරිවැය                 | සැකසුම                                               |
| --------------------------- | ------------------------------------------------------------------ | ----------------------- | ---------------------------------------------------- |
| **Cloudflare Quick Tunnel** | තාවකාලිකයි (සෑම නැවත ආරම්භ කිරීමකදීම URL එක වෙනස් වේ)              | නොමිලේ                  | කිසිවක් නැත — `cloudflared` ස්වයංක්රීයව ස්ථාපනය කරයි |
| **ngrok**                   | ගෙවුම් සැලැස්මක් හෝ ස්ථිර domain එකක් වින්යාස කර ඇති විට ස්ථායී වේ | නොමිලේ මට්ටම + ගෙවුම්   | ngrok ගිණුමක් + authtoken අවශ්ය වේ                   |
| **Tailscale Funnel**        | ඔබගේ tailnet එක තුළ node එකකට ස්ථායී වේ                            | පුද්ගලික භාවිතයට නොමිලේ | Tailscale ස්ථාපනය + login + Funnel ACL අවශ්ය වේ      |

ක්රියාත්මක කිරීම් `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, සහ `src/lib/tailscaleTunnel.ts` තුළ ඇත. dashboard එකට ඒවා ඒකාකාරව render කළ හැකි වන පරිදි, තුනම `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl`, සහ `lastError` field සහිත පොදු ආකෘතියකින් යුත්
`status` object එකක් ආපසු ලබා දෙයි.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` විසින් `cloudflared` child process එකක් ලෙස ධාවනය කරයි. named-tunnel config එකක් සපයා තිබේද යන්න මත තෝරාගන්නා
ආකාර දෙකකට එය සහාය දක්වයි:

- **Quick tunnel (පෙරනිමි).** `cloudflared tunnel --url
http://localhost:<apiPort>` ධාවනය කර stdout වෙතින් පවරන ලද `*.trycloudflare.com` URL එක parse කරයි.
  URL තාවකාලික වන අතර සෑම නැවත ආරම්භ කිරීමකදීම වෙනස් වේ.
- **Named tunnel (විකල්පයෙන් සක්රිය කළ හැක).** `CLOUDFLARED_CONFIG` දේශීයව කළමනාකරණය කරන
  cloudflared `config.yml` එකක් වෙත යොමු වන විට, OmniRoute විසින් `cloudflared tunnel --no-autoupdate
--config <path> run` ධාවනය කරමින් ඔබට **ස්ථායී, නම් කළ hostname එකක්** ලබා දෙයි. config එක විසින් tunnel UUID, `credentials-file`, සහ `ingress` routing සපයන බැවින්,
  `--url` ලබා නොදෙන අතර Zero Trust dashboard token එකක්ද අවශ්ය නොවේ. `run` විසින්
  config එකේ absolute `credentials-file` path එකෙන් credentials කියවයි — `cert.pem`
  අවශ්ය නොවේ (එය භාවිත කරන්නේ tunnel lifecycle කළමනාකරණය සඳහා පමණි).

ප්රධාන හැසිරීම්:

- **ස්වයංක්රීය ස්ථාපනය.** පළමු භාවිතයේදී, OmniRoute විසින් නිල GitHub releases වෙතින් නවතම `cloudflared`
  binary එක බාගනී (කළමනාකරණය කරන ස්ථාපනය
  `DATA_DIR/cloudflared/` යටතේ පවතී). ක්රියාත්මක කිරීමට පෙර බාගත් asset එකේ SHA256 අගය
  release manifest එක සමඟ සත්යාපනය කෙරේ.
- **Process අධීක්ෂණය.** reload කිරීම් අතරතුර dashboard එකට status එක නැවත ලබාගත හැකි වන පරිදි cloudflared PID එක සහ resolve කළ URL එක
  `quick-tunnel-state.json` තුළ සුරැකේ.

### Named tunnel සැකසුම (ස්ථායී hostname)

1. cloudflared CLI එක භාවිතයෙන් දේශීයව කළමනාකරණය කරන tunnel එකක් සාදන්න (එක් වරක් පමණි):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. ඔබගේ hostname එක OmniRoute හි දේශීය
   API port එකට (පෙරනිමියෙන් 20128) route කරන `~/.cloudflared/config.yml` එකක් ලියන්න:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute config එක වෙත යොමු කර tunnel එක (නැවත) ආරම්භ කරන්න:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # විකල්පයි — OmniRoute වාර්තා කරන hostname එක ප්රතිස්ථාපනය කරයි; එසේ නොමැතිනම් එය
   # config එකේ පළමු ingress rule එකෙන් කියවනු ලැබේ:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   quick tunnel එකක් සක්රිය කරන ආකාරයටම tunnel එක සක්රිය කරන්න (පහත REST / dashboard / CLI
   බලන්න). named tunnel එකක් ලබාගැනීමට public URL එකක් නිකුත් නොකරන බැවින්, cloudflared හි ලියාපදිංචි edge connection එකෙන් සූදානම් තත්ත්වය හඳුනාගන්නා අතර `publicUrl`/`apiUrl`
   `CLOUDFLARED_HOSTNAME` වෙතින් (හෝ config එකේ පළමු ingress hostname එකෙන්) වාර්තා කෙරේ.

### REST හරහා සක්රිය / අක්රිය කිරීම

endpoint එක වෙන වෙනම `start`/`stop` path වෙනුවට `{action: "enable" | "disable"}` body එකක් භාවිත කරයි.
කළමනාකරණ authentication (admin session එකක් හෝ admin API key එකක්)
අවශ්ය වේ.

```bash
# සක්රිය කරන්න
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# තත්ත්වය
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# අක්රිය කරන්න
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

නැතහොත් dashboard එක හරහා: **Settings → Tunnels → Cloudflare**.

### විකල්ප env vars

| විචල්යය                                              | අරමුණ                                                                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | ද්විමය ගොනුවේ මාර්ගය අභිබවා සකසයි. මෙය සකසා වලංගු නම්, බාගත කිරීම වෙනුවට OmniRoute එය භාවිත කරයි.                                                                                  |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ප්රවාහන ප්රොටෝකෝලය (පෙරනිමිය `http2`; `quic`, `auto` ද සහාය දක්වයි).                                                                                                               |
| `CLOUDFLARED_CONFIG`                                 | දේශීයව කළමනාකරණය කරන cloudflared `config.yml` වෙත මාර්ගය. මෙය සකසා ඇති විට, ඉක්මන් උමඟක් වෙනුවට OmniRoute විසින් **නම් කළ/ස්ථිර** උමඟක් (`tunnel --config <path> run`) ධාවනය කරයි. |
| `CLOUDFLARED_HOSTNAME`                               | නම් කළ උමඟ විසින් වාර්තා කරන පොදු සත්කාරක නාමය අභිබවා සකසයි (උදා. `ai.example.com`). මෙය සකසා නොමැති විට, වින්යාසයේ පළමු `ingress` සත්කාරක නාමයෙන් කියවයි.                         |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** භාවිත කරයි (ක්රියාවලිය තුළම, CLI
උපක්රියාවලියක් නොමැතිව). පෙර-සම්පාදිත ද්විමය ගොනු නොමැති වේදිකාවල යෙදුම ආරම්භයේදී
බිඳ වැටීම වැළැක්වීම සඳහා, ස්වදේශීය මොඩියුලය පළමු ආරම්භයේදී අවශ්ය වූ විට පමණක් ආයාත කෙරේ.

### පූර්ව අවශ්යතා

1. <https://ngrok.com> හි ලියාපදිංචි වන්න.
2. ngrok උපකරණ පුවරුවෙන් ඔබගේ authtoken පිටපත් කරගන්න.
3. පහත ක්රමවලින් එකක් හරහා එය සපයන්න:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, හෝ
   - උපකරණ පුවරුව: **Settings → Tunnels → ngrok**, හෝ
   - REST body (එක් වරක් පමණක්): `{"action":"enable","authToken":"<token>"}`.

මේ කිසිවක් වින්යාස කර නොමැති නම්, තත්ත්වය `phase: "needs_auth"` ලෙස ලැබේ.

### REST හරහා සබල / අබල කිරීම

```bash
# සබල කරන්න (env වෙතින් NGROK_AUTHTOKEN භාවිත කරයි)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# පේළිය තුළ දක්වන ටෝකනය සමඟ සබල කරන්න
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# තත්ත්වය
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# අබල කරන්න
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

ප්රතිචාරයට පවරන ලද `publicUrl` ඇතුළත් වේ (උදා.
`https://abcd-1234.ngrok-free.app`). අභිරුචි වසම්, කලාප සහ ප්රතිපත්ති රීති
ngrok උපකරණ පුවරුව තුළ වින්යාස කළ යුතුය — OmniRoute මඟින්ම සිදු කරන්නේ දේශීය
ඉලක්ක URL එක SDK වෙත යොමු කිරීම පමණි.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts`, **Funnel** (සේවා සැපයීම සඳහා වන Tailscale හි පොදු-අන්තර්ජාල
පිටතට යැවීම) හරහා දේශීය API පෝට් එක නිරාවරණය කිරීම සඳහා පද්ධතියේ `tailscale` CLI
සම්බන්ධීකරණය කරයි. එය සම්පූර්ණ ජීවන චක්රයට සහාය දක්වයි: ස්ථාපනය, පිවිසීම, daemon
ආරම්භ කිරීම, සබල කිරීම සහ අබල කිරීම.

ක්රියාත්මක කිරීම `tailscale funnel --bg <port>` (පසුබිම් ප්රකාරය) කැඳවයි. පොදු URL
එකේ හැඩය `https://<machine>.<tailnet>.ts.net/` වේ.

### පූර්ව අවශ්යතා

1. Tailscale ස්ථාපනය කරන්න (නැතහොත් OmniRoute හට එය කිරීමට ඉඩ දෙන්න — පහත `install` අන්ත ලක්ෂ්යය බලන්න).
2. පිවිසෙන්න (`tailscale login` හෝ OmniRoute හි `login` අන්ත ලක්ෂ්යය හරහා).
3. Tailscale පරිපාලක කොන්සෝලය තුළ ඔබගේ tailnet සඳහා Funnel සබල කරන්න:
   <https://login.tailscale.com/admin/settings/features>.

Linux සහ macOS මත daemon එක (`tailscaled`) පාලනය කිරීමට `sudo` අවශ්ය වේ.
POST අන්ත ලක්ෂ්ය, කැඳවීමේ කාලය තුළ OmniRoute හි MITM මුරපද හැඹිලිය
(`getCachedPassword` / `setCachedPassword`) වෙත යොමු කෙරෙන විකල්ප `sudoPassword`
ක්ෂේත්රයක් පිළිගනී. Windows පෙරනිමි සේවා ස්ථාපනය
`C:\Program Files\Tailscale\tailscale.exe` හි භාවිත කරයි.

### REST අන්ත ලක්ෂ්ය

ස්ථාපනය, පිවිසීම, daemon සහ උමඟ වෙන වෙනම සැලකිල්ලට ගන්නා කරුණු බැවින්,
Tailscale අනෙකුත් පසුඅන්තවලට වඩා පුළුල් ක්රියාකාරී පරාසයක් සපයයි.

| අන්ත ලක්ෂ්යය                          | ක්රමය  | අරමුණ                                                                        |
| ------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | සමස්ත උමං තත්ත්වය (`phase`, `tunnelUrl`, `apiUrl`, ආදිය)                     |
| `/api/tunnels/tailscale/check`        | `GET`  | පහළ-මට්ටමේ පරීක්ෂාව: ස්ථාපිතද? පිවිසී තිබේද? daemon ක්රියාත්මකද?             |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale ස්ථාපනය කරන්න (SSE හරහා ප්රවාහනය වන ප්රගති සිදුවීම්) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS මත `tailscaled` ආරම්භ කරන්න                                      |
| `/api/tunnels/tailscale/login`        | `POST` | පිවිසුම් ප්රවාහය අරඹන්න; බ්රවුසරයක විවෘත කිරීමට `authUrl` ලබා දෙයි           |
| `/api/tunnels/tailscale/enable`       | `POST` | API පෝට් එක සඳහා Funnel ආරම්භ කරන්න                                          |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel නවත්වන්න                                                              |

සියලුම Tailscale අන්ත ලක්ෂ්ය සඳහා කළමනාකරණ සත්යාපනය අවශ්ය වේ (`routeUtils.ts ::
requireTailscaleAuth` බලන්න).

සබල කිරීමේ උදාහරණය:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

පරිපාලක කොන්සෝලය තුළ Funnel සබල කර නොමැති නම්, ප්රතිචාරයට
`funnelNotEnabled: true` සහ බ්රවුසරයක විවෘත කිරීම සඳහා `enableUrl` එකක් ඇතුළත් වේ.

### විකල්ප env විචල්ය

| විචල්යය         | අරමුණ                                               |
| --------------- | --------------------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` ද්විමය ගොනුවේ මාර්ගය ප්රතිස්ථාපනය කරන්න |

## අන්ත ලක්ෂ්ය සාරාංශය

| අන්ත ලක්ෂ්යය                          | ක්රමය  | ඉල්ලීම් අන්තර්ගතය                   | සත්යාපනය   |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management |

මධ්යගත `/api/settings/tunnels` අන්ත ලක්ෂ්යයක් නොමැත — සෑම පසුඅන්තයක්ම
ස්වාධීන වේ.

## OAuth ආපසු-ඇමතුම් සලකා බැලීම්

ඔබ උමඟක් හරහා OmniRoute නිරාවරණය කරන විට, උපකරණ පුවරුව සහ OAuth ප්රවාහ
ආපසු-ඇමතුම් URL ගොඩනැගිය යුත්තේ `localhost` නොව **පොදු** සත්කාරක නාමය භාවිත කරමිනි.
එසේ නොමැති නම්, OAuth සපයන්නා තම සේවාදායකවලට ළඟා විය නොහැකි URL එකක් වෙත
පරිශීලකයා යළි යොමු කරන අතර, සම්බන්ධතා ක්රියාවලිය අසාර්ථක වේ.

උපකරණ පුවරුවේ සංස්කරණ සහ සැකසුම් සුරැකීම් සඳහා උමං සත්කාරක නාමය
`NEXT_PUBLIC_BASE_URL` තුළ ස්ථිර කිරීම අවශ්ය නොවේ. සත්යාපිත උපකරණ පුවරුව,
සැසියට බැඳුණු CSRF ටෝකනයක් සමඟ එකම මූලයට අනාරක්ෂිත ඉල්ලීම් යවන බැවින්,
පුරනය වීමෙන් පසු සාමාන්ය UI කළමනාකරණය සඳහා තාවකාලික Cloudflare Quick Tunnel
සත්කාරක තවමත් භාවිත කළ හැක.

මෙය සකසන්න:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ඉන්පසු OAuth ආරම්භ කිරීමට පෙර OmniRoute නැවත ආරම්භ කරන්න. තාවකාලික Cloudflare Quick
Tunnels සඳහා සෑම නැවත ආරම්භයකින්ම URL එක වෙනස් වන බැවින්, නිෂ්පාදන OAuth භාවිතය සඳහා
වෙන් කළ ඩොමේනයක් සහිත ngrok හෝ Tailscale Funnel වඩාත් සුදුසුය.

## සෞඛ්ය තත්ත්වය සහ අධීක්ෂණය

උපකරණ පුවරුව **Settings → Tunnels** යටතේ උමං තත්ත්වය පෙන්වයි:

- සක්රිය පසුඅන්ත(ය) සහ වත්මන් `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- වත්මන් පොදු URL එක සහ එයින් ව්යුත්පන්න කළ API URL එක (`<publicUrl>/v1`).
- උමඟ විසින් ඉදිරියට යොමු කරන දේශීය ඉලක්ක URL එක.
- අවසන් දෝෂ පණිවිඩය, තිබේ නම්.

ක්රමලේඛනමය අධීක්ෂණය සඳහා, එක් එක් පසුඅන්තයට අදාළ `GET` අන්ත ලක්ෂ්ය නියමිත
කාල පරාසවලදී විමසන්න. එකවර පසුඅන්ත එකකට වඩා ධාවනය කිරීමට අවසර ඇත;
OmniRoute ඒ සෑම එකක්ම ස්වාධීනව නිරීක්ෂණය කරනු ඇත.

## දෝෂ නිරාකරණය

### "cloudflared ද්විමය ගොනුව හමු නොවීය"

OmniRoute පළමු භාවිතයේදී ස්වයංක්රීයව ස්ථාපනය කිරීමට උත්සාහ කරයි. ස්ථාපනය
අවහිර වී ඇත්නම් (සීමා කළ ජාලයක්, GitHub ප්රවේශය නොමැති වීම), `cloudflared`
<https://github.com/cloudflare/cloudflared/releases> වෙතින් අතින් බාගත කර
`CLOUDFLARED_BIN=/path/to/cloudflared` සකසන්න.

### "ngrok: authtoken අවශ්යයි"

`phase: "needs_auth"` යන්නෙන් අදහස් වන්නේ authtoken එකක් හමු නොවූ බවයි.
`.env` තුළ `NGROK_AUTHTOKEN` සකසන්න, උපකරණ පුවරුව හරහා එය වින්යාස කරන්න,
හෝ සක්රීය කිරීමේ POST ඉල්ලීම් අන්තර්ගතය තුළ `authToken` යවන්න.

### "tailscale: funnel සක්රීය කර නැත"

සක්රීය කිරීමේ ප්රතිචාරයට `funnelNotEnabled: true` ඇතුළත් වූ විට, ඔබගේ
tailnet සඳහා Funnel අක්රීය කර ඇත. ආපසු ලබාදුන් `enableUrl` එක (හෝ පරිපාලක
කොන්සෝලයේ විශේෂාංග පිටුව) විවෘත කර Funnel සක්රීය කරන්න.

### උමං URL වෙනස්කම් OAuth බිඳ දමයි

වෙන් කළ ඩොමේනයක් සහිත ngrok හෝ Tailscale Funnel භාවිත කරන්න (දෙකම එක් එක්
නෝඩය සඳහා ස්ථාවර වේ). Cloudflare Quick Tunnels සැලසුමෙන්ම තාවකාලික වන අතර,
දිගුකාලීන OAuth ආපසු-ඇමතුම් සඳහා නිර්දේශ නොකෙරේ.

### Tailscale සඳහා Linux/macOS මත අවසර ප්රතික්ෂේප වීම

`tailscaled` සඳහා root අවසර අවශ්ය වේ. අදාළ POST අන්ත ලක්ෂ්යයට
`sudoPassword` ලබා දෙන්න, නැතහොත් daemon එක ඔබම ධාවනය කරන්න
(`sudo systemctl start tailscaled`).

## මෙයද බලන්න

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — පිටතට යන ගමනාගමනය සඳහා outbound proxy (1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` ඇතුළු පරිසර විචල්යයන්ගේ සම්පූර්ණ ලැයිස්තුව.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — ස්ථාවර පොදු සත්කාරකත්වය සඳහා tunneling වෙනුවට භාවිත කළ හැකි විකල්ප.
- මූලාශ්රය: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
