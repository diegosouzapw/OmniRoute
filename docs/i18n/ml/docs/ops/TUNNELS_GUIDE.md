# Tunnels Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **ആധികാരിക ഉറവിടം:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:** 2026-06-28 — v3.8.40

മൂന്ന് ടണൽ ബാക്കെൻഡുകൾ വഴി OmniRoute-ന് അതിന്റെ ലോക്കൽ സെർവർ (`http://localhost:20128`) പൊതു
ഇന്റർനെറ്റിലേക്ക് ലഭ്യമാക്കാനാകും. ഇത് ഇനിപ്പറയുന്നവയ്ക്ക് ഉപകാരപ്രദമാണ്:

- പൊതുവായി ആക്സസ് ചെയ്യാവുന്ന ഒരു റീഡയറക്ട് URL ആവശ്യമായ ക്ലൗഡ് ദാതാക്കളിൽ നിന്നുള്ള (Antigravity, Gemini, Cursor)
  OAuth കോൾബാക്കുകൾ.
- VM വിന്യസിക്കാതെ നിങ്ങളുടെ ലോക്കൽ ഇൻസ്റ്റൻസ് സഹപ്രവർത്തകരുമായി പങ്കിടൽ.
- മൊബൈൽ, റിമോട്ട്, അല്ലെങ്കിൽ വ്യത്യസ്ത നെറ്റ്വർക്കുകൾക്കിടയിലെ പരിശോധന.

മൂന്ന് ബാക്കെൻഡുകളും പ്രോസസ്സിനുള്ളിൽത്തന്നെ നിയന്ത്രിക്കപ്പെടുന്നു — ഡാഷ്ബോർഡിൽ നിന്നോ REST API-യിൽ നിന്നോ
OmniRoute അടിസ്ഥാനത്തിലുള്ള ബൈനറി അല്ലെങ്കിൽ SDK ആരംഭിക്കുകയും നിർത്തുകയും ചെയ്യുന്നു. റിവേഴ്സ്-പ്രോക്സിയോ systemd സജ്ജീകരണമോ
ആവശ്യമില്ല.

## ബാക്കെൻഡുകൾ ഒറ്റനോട്ടത്തിൽ

| ബാക്കെൻഡ്                   | സ്ഥിരത                                                         | ചെലവ്                         | സജ്ജീകരണം                                               |
| --------------------------- | -------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | താൽക്കാലികം (ഓരോ റീസ്റ്റാർട്ടിലും URL മാറുന്നു)                | സൗജന്യം                       | ഒന്നുമില്ല — `cloudflared` സ്വയമേവ ഇൻസ്റ്റാൾ ചെയ്യുന്നു |
| **ngrok**                   | പണമടച്ച പ്ലാനോ സ്ഥിര ഡൊമെയ്നോ കോൺഫിഗർ ചെയ്തിരിക്കുമ്പോൾ സ്ഥിരം | സൗജന്യ ടയർ + പണമടച്ചത്        | ngrok അക്കൗണ്ടും authtoken-ഉം ആവശ്യമാണ്                 |
| **Tailscale Funnel**        | നിങ്ങളുടെ tailnet-നുള്ളിലെ ഓരോ നോഡിനും സ്ഥിരം                  | വ്യക്തിഗത ഉപയോഗത്തിന് സൗജന്യം | Tailscale ഇൻസ്റ്റാളും ലോഗിനും Funnel ACL-ഉം ആവശ്യമാണ്   |

ഇംപ്ലിമെന്റേഷനുകൾ `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, `src/lib/tailscaleTunnel.ts` എന്നിവയിലാണ്. മൂന്നും `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl`, `lastError` എന്നീ ഫീൽഡുകളുള്ള ഒരേ ഘടനയിലെ `status` ഒബ്ജക്റ്റ് തിരികെ നൽകുന്നതിനാൽ ഡാഷ്ബോർഡിന് അവയെ
ഒരേ രീതിയിൽ റെൻഡർ ചെയ്യാനാകും.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`, `cloudflared`-നെ ഒരു ചൈൽഡ് പ്രോസസ്സായി പ്രവർത്തിപ്പിക്കുന്നു. പേരിട്ട ടണൽ കോൺഫിഗ്
നൽകിയിട്ടുണ്ടോ എന്നതനുസരിച്ച് തിരഞ്ഞെടുക്കപ്പെടുന്ന രണ്ട് മോഡുകൾ ഇതിന് പിന്തുണയുണ്ട്:

- **Quick tunnel (ഡിഫോൾട്ട്).** `cloudflared tunnel --url
http://localhost:<apiPort>` പ്രവർത്തിപ്പിക്കുകയും stdout-ൽ നിന്ന് അനുവദിച്ച `*.trycloudflare.com` URL പാർസ് ചെയ്യുകയും
  ചെയ്യുന്നു. URL-കൾ താൽക്കാലികമാണ്; ഓരോ റീസ്റ്റാർട്ടിലും അവ മാറും.
- **Named tunnel (ഐച്ഛികം).** `CLOUDFLARED_CONFIG`, ലോക്കലായി നിയന്ത്രിക്കപ്പെടുന്ന
  cloudflared `config.yml`-ലേക്ക് ചൂണ്ടുമ്പോൾ OmniRoute, `cloudflared tunnel --no-autoupdate
--config <path> run` പ്രവർത്തിപ്പിക്കുന്നു; ഇതിലൂടെ നിങ്ങൾക്ക് **സ്ഥിരമായ, പേരിട്ട ഹോസ്റ്റ്നെയിം** ലഭിക്കുന്നു. കോൺഫിഗ്
  ടണൽ UUID, `credentials-file`, `ingress` റൂട്ടിംഗ് എന്നിവ നൽകുന്നതിനാൽ
  `--url` കൈമാറുന്നില്ല, Zero Trust ഡാഷ്ബോർഡ് ടോക്കണും ആവശ്യമില്ല. `run`,
  കോൺഫിഗിലെ അബ്സല്യൂട്ട് `credentials-file` പാതയിൽ നിന്ന് ക്രെഡൻഷ്യലുകൾ വായിക്കുന്നു — `cert.pem`
  ആവശ്യമില്ല (അത് ടണൽ ലൈഫ്സൈക്കിൾ മാനേജ്മെന്റിന് മാത്രമാണ് ഉപയോഗിക്കുന്നത്).

പ്രധാന പ്രവർത്തനരീതികൾ:

- **സ്വയമേവ ഇൻസ്റ്റാൾ ചെയ്യൽ.** ആദ്യ ഉപയോഗത്തിൽ, ഔദ്യോഗിക GitHub റിലീസുകളിൽ നിന്ന് ഏറ്റവും പുതിയ `cloudflared`
  ബൈനറി OmniRoute ഡൗൺലോഡ് ചെയ്യുന്നു (നിയന്ത്രിത ഇൻസ്റ്റാൾ
  `DATA_DIR/cloudflared/`-ന് കീഴിലാണ്). ഡൗൺലോഡ് ചെയ്ത അസറ്റിന്റെ SHA256, പ്രവർത്തിപ്പിക്കുന്നതിന് മുമ്പ്
  റിലീസ് മാനിഫെസ്റ്റുമായി താരതമ്യം ചെയ്ത് സ്ഥിരീകരിക്കുന്നു.
- **പ്രോസസ് മേൽനോട്ടം.** റീലോഡുകൾക്കിടയിലും ഡാഷ്ബോർഡിന് സ്റ്റാറ്റസ് പുനരാരംഭിക്കാനായി cloudflared PID-യും കണ്ടെത്തിയ URL-ഉം
  `quick-tunnel-state.json`-ൽ നിലനിർത്തുന്നു.

### പേരിട്ട ടണൽ സജ്ജീകരണം (സ്ഥിര ഹോസ്റ്റ്നെയിം)

1. cloudflared CLI ഉപയോഗിച്ച് ലോക്കലായി നിയന്ത്രിക്കപ്പെടുന്ന ഒരു ടണൽ സൃഷ്ടിക്കുക (ഒറ്റത്തവണ):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. നിങ്ങളുടെ ഹോസ്റ്റ്നെയിമിനെ OmniRoute-ന്റെ ലോക്കൽ
   API പോർട്ടിലേക്ക് (ഡിഫോൾട്ട് 20128) റൂട്ട് ചെയ്യുന്ന `~/.cloudflared/config.yml` എഴുതുക:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. കോൺഫിഗിലേക്ക് OmniRoute-നെ ചൂണ്ടിച്ച ശേഷം ടണൽ (വീണ്ടും) ആരംഭിക്കുക:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ഐച്ഛികം — OmniRoute റിപ്പോർട്ട് ചെയ്യുന്ന ഹോസ്റ്റ്നെയിം മാറ്റിസ്ഥാപിക്കുന്നു; അല്ലെങ്കിൽ
   # കോൺഫിഗിലെ ആദ്യ ingress റൂളിൽ നിന്ന് വായിക്കും:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   quick tunnel-ന്റെ അതേ രീതിയിൽ ടണൽ പ്രവർത്തനക്ഷമമാക്കുക (REST / ഡാഷ്ബോർഡ് / CLI
   താഴെ). പേരിട്ട ടണൽ ശേഖരിക്കാൻ ഒരു പൊതു URL പുറപ്പെടുവിക്കാത്തതിനാൽ,
   cloudflared-ന്റെ രജിസ്റ്റർ ചെയ്ത edge connection-ൽ നിന്ന് സന്നദ്ധത കണ്ടെത്തുന്നു; `publicUrl`/`apiUrl` എന്നിവ
   `CLOUDFLARED_HOSTNAME`-ൽ നിന്ന് (അല്ലെങ്കിൽ കോൺഫിഗിലെ ആദ്യ ingress ഹോസ്റ്റ്നെയിമിൽ നിന്ന്) റിപ്പോർട്ട് ചെയ്യുന്നു.

### REST വഴി പ്രവർത്തനക്ഷമമാക്കൽ / പ്രവർത്തനരഹിതമാക്കൽ

വേറിട്ട `start`/`stop` പാതകളല്ല, `{action: "enable" | "disable"}` ബോഡിയാണ് എൻഡ്പോയിന്റ് ഉപയോഗിക്കുന്നത്.
മാനേജ്മെന്റ് ഓതന്റിക്കേഷൻ (അഡ്മിൻ സെഷൻ അല്ലെങ്കിൽ അഡ്മിൻ API കീ)
ആവശ്യമാണ്.

```bash
# പ്രവർത്തനക്ഷമമാക്കുക
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# സ്റ്റാറ്റസ്
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# പ്രവർത്തനരഹിതമാക്കുക
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

അല്ലെങ്കിൽ ഡാഷ്ബോർഡ് വഴി: **Settings → Tunnels → Cloudflare**.

### ഐച്ഛിക env vars

| വേരിയബിൾ                                             | ഉദ്ദേശ്യം                                                                                                                                                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | ബൈനറി പാത്ത് അസാധുവാക്കുന്നു. ഇത് സജ്ജീകരിച്ചിട്ടുണ്ടെന്നും സാധുവാണെന്നും ആണെങ്കിൽ, ഡൗൺലോഡ് ചെയ്യുന്നതിനുപകരം OmniRoute ഇത് ഉപയോഗിക്കുന്നു.                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ട്രാൻസ്പോർട്ട് പ്രോട്ടോക്കോൾ (സ്ഥിരസ്ഥിതി `http2`; `quic`, `auto` എന്നിവയും ലഭ്യമാണ്).                                                                                                                                     |
| `CLOUDFLARED_CONFIG`                                 | പ്രാദേശികമായി കൈകാര്യം ചെയ്യുന്ന cloudflared `config.yml`-ലേക്കുള്ള പാത്ത്. ഇത് സജ്ജീകരിച്ചിരിക്കുമ്പോൾ, ക്വിക്ക് ടണലിന് പകരം OmniRoute ഒരു **പേരുള്ള/സ്ഥിരമായ** ടണൽ (`tunnel --config <path> run`) പ്രവർത്തിപ്പിക്കുന്നു. |
| `CLOUDFLARED_HOSTNAME`                               | പേരുള്ള ടണൽ റിപ്പോർട്ട് ചെയ്യുന്ന പബ്ലിക് ഹോസ്റ്റ്നെയിം അസാധുവാക്കുന്നു (ഉദാ. `ai.example.com`). ഇത് സജ്ജീകരിച്ചിട്ടില്ലെങ്കിൽ, കോൺഫിഗിലെ ആദ്യത്തെ `ingress` ഹോസ്റ്റ്നെയിമിൽ നിന്ന് വായിക്കുന്നു.                          |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** ഉപയോഗിക്കുന്നു (അതേ പ്രോസസ്സിനുള്ളിൽ, CLI
ഉപപ്രോസസ്സ് ഇല്ലാതെ). മുൻകൂട്ടി ബിൽഡ് ചെയ്ത ബൈനറികളില്ലാത്ത പ്ലാറ്റ്ഫോമുകളിൽ
ആപ്പ് ബൂട്ട് ചെയ്യുമ്പോൾ തകരാതിരിക്കാൻ, ആദ്യമായി ആരംഭിക്കുമ്പോൾ മാത്രമാണ് നേറ്റീവ് മൊഡ്യൂൾ ഇംപോർട്ട് ചെയ്യുന്നത്.

### മുൻവ്യവസ്ഥകൾ

1. <https://ngrok.com>-ൽ സൈൻ അപ്പ് ചെയ്യുക.
2. ngrok ഡാഷ്ബോർഡിൽ നിന്ന് നിങ്ങളുടെ authtoken പകർത്തുക.
3. ഇനിപ്പറയുന്ന ഏതെങ്കിലും മാർഗത്തിലൂടെ അത് നൽകുക:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, അല്ലെങ്കിൽ
   - ഡാഷ്ബോർഡ്: **Settings → Tunnels → ngrok**, അല്ലെങ്കിൽ
   - REST ബോഡി (ഒറ്റത്തവണ): `{"action":"enable","authToken":"<token>"}`.

ഇവയിലൊന്നും കോൺഫിഗർ ചെയ്തിട്ടില്ലെങ്കിൽ, സ്റ്റാറ്റസ് `phase: "needs_auth"` മടക്കിനൽകും.

### REST വഴി പ്രവർത്തനക്ഷമമാക്കുക / പ്രവർത്തനരഹിതമാക്കുക

```bash
# പ്രവർത്തനക്ഷമമാക്കുക (env-ൽ നിന്നുള്ള NGROK_AUTHTOKEN ഉപയോഗിക്കുന്നു)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ഇൻലൈൻ ടോക്കൺ ഉപയോഗിച്ച് പ്രവർത്തനക്ഷമമാക്കുക
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# സ്റ്റാറ്റസ്
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# പ്രവർത്തനരഹിതമാക്കുക
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

പ്രതികരണത്തിൽ അനുവദിച്ച `publicUrl` ഉൾപ്പെടുന്നു (ഉദാ.
`https://abcd-1234.ngrok-free.app`). ഇഷ്ടാനുസൃത ഡൊമെയ്നുകൾ, റീജിയനുകൾ, പോളിസി നിയമങ്ങൾ
എന്നിവ ngrok ഡാഷ്ബോർഡിൽ കോൺഫിഗർ ചെയ്യണം — OmniRoute പ്രാദേശിക ടാർഗറ്റ് URL
SDK-യിലേക്ക് ഫോർവേഡ് ചെയ്യുക മാത്രമാണ് ചെയ്യുന്നത്.

## 3. Tailscale Funnel

**Funnel** (serve-നുള്ള Tailscale-ന്റെ പൊതു-ഇന്റർനെറ്റ് എഗ്രസ്) വഴി പ്രാദേശിക API
പോർട്ട് ലഭ്യമാക്കാൻ `src/lib/tailscaleTunnel.ts` സിസ്റ്റത്തിലെ `tailscale` CLI-യെ ഏകോപിപ്പിക്കുന്നു.
ഇൻസ്റ്റാൾ, ലോഗിൻ, ഡീമൺ ആരംഭിക്കൽ, പ്രവർത്തനക്ഷമമാക്കൽ, പ്രവർത്തനരഹിതമാക്കൽ എന്നിവയുൾപ്പെടെയുള്ള
സമ്പൂർണ്ണ ലൈഫ്സൈക്കിൾ ഇത് പിന്തുണയ്ക്കുന്നു.

ഇംപ്ലിമെന്റേഷൻ `tailscale funnel --bg <port>` (പശ്ചാത്തല മോഡ്) പ്രവർത്തിപ്പിക്കുന്നു.
പൊതു URL-ന്റെ രൂപം `https://<machine>.<tailnet>.ts.net/` എന്നാണ്.

### മുൻവ്യവസ്ഥകൾ

1. Tailscale ഇൻസ്റ്റാൾ ചെയ്യുക (അല്ലെങ്കിൽ OmniRoute-നെ അതുചെയ്യാൻ അനുവദിക്കുക — ചുവടെയുള്ള `install` എൻഡ്പോയിന്റ് കാണുക).
2. സൈൻ ഇൻ ചെയ്യുക (`tailscale login` അല്ലെങ്കിൽ OmniRoute-ന്റെ `login` എൻഡ്പോയിന്റ് വഴി).
3. Tailscale അഡ്മിൻ കൺസോളിൽ നിങ്ങളുടെ tailnet-നായി Funnel പ്രവർത്തനക്ഷമമാക്കുക:
   <https://login.tailscale.com/admin/settings/features>.

Linux-ലും macOS-ലും ഡീമൺ (`tailscaled`) നിയന്ത്രിക്കാൻ `sudo` ആവശ്യമാണ്.
POST എൻഡ്പോയിന്റുകൾ ഐച്ഛികമായ `sudoPassword` ഫീൽഡ് സ്വീകരിക്കുന്നു; കോളിന്റെ
ദൈർഘ്യത്തിൽ അത് OmniRoute-ന്റെ MITM പാസ്വേഡ് കാഷിലേക്ക് (`getCachedPassword` / `setCachedPassword`)
ഫോർവേഡ് ചെയ്യപ്പെടുന്നു. Windows ഡിഫോൾട്ട് സർവീസ് ഇൻസ്റ്റാളായ
`C:\Program Files\Tailscale\tailscale.exe` ഉപയോഗിക്കുന്നു.

### REST എൻഡ്പോയിന്റുകൾ

ഇൻസ്റ്റാളേഷൻ, ലോഗിൻ, ഡീമൺ, ടണൽ എന്നിവ വ്യത്യസ്ത വിഷയങ്ങളായതിനാൽ മറ്റ് ബാക്ക്എൻഡുകളേക്കാൾ
വിപുലമായ ഇന്റർഫേസാണ് Tailscale-നുള്ളത്.

| എൻഡ്പോയിന്റ്                          | മെത്തഡ് | ഉദ്ദേശ്യം                                                                                                |
| ------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | സംയോജിത ടണൽ സ്റ്റാറ്റസ് (`phase`, `tunnelUrl`, `apiUrl` മുതലായവ)                                         |
| `/api/tunnels/tailscale/check`        | `GET`   | താഴ്ന്ന തലത്തിലുള്ള പരിശോധന: ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ടോ? ലോഗിൻ ചെയ്തിട്ടുണ്ടോ? ഡീമൺ പ്രവർത്തിക്കുന്നുണ്ടോ? |
| `/api/tunnels/tailscale/install`      | `POST`  | Tailscale ഇൻസ്റ്റാൾ ചെയ്യുക (SSE വഴി സ്ട്രീം ചെയ്യുന്ന പുരോഗതി ഇവന്റുകൾ) — Linux/macOS                   |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | Linux/macOS-ൽ `tailscaled` ആരംഭിക്കുക                                                                    |
| `/api/tunnels/tailscale/login`        | `POST`  | ലോഗിൻ ഫ്ലോ ആരംഭിക്കുക; ബ്രൗസറിൽ തുറക്കാനുള്ള `authUrl` മടക്കിനൽകുന്നു                                    |
| `/api/tunnels/tailscale/enable`       | `POST`  | API പോർട്ടിനായി Funnel ആരംഭിക്കുക                                                                        |
| `/api/tunnels/tailscale/disable`      | `POST`  | Funnel നിർത്തുക                                                                                          |

എല്ലാ Tailscale എൻഡ്പോയിന്റുകൾക്കും മാനേജ്മെന്റ് ഓതന്റിക്കേഷൻ ആവശ്യമാണ് (`routeUtils.ts ::
requireTailscaleAuth` കാണുക).

പ്രവർത്തനക്ഷമമാക്കുന്നതിനുള്ള ഉദാഹരണം:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

അഡ്മിൻ കൺസോളിൽ Funnel പ്രവർത്തനക്ഷമമാക്കിയിട്ടില്ലെങ്കിൽ, പ്രതികരണത്തിൽ
`funnelNotEnabled: true` എന്നതോടൊപ്പം ബ്രൗസറിൽ തുറക്കാനുള്ള `enableUrl`-ഉം ഉൾപ്പെടും.

### ഐച്ഛിക env വേരിയബിളുകൾ

| വേരിയബിൾ        | ഉദ്ദേശ്യം                                |
| --------------- | ---------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` ബൈനറി പാത്ത് ഓവർറൈഡ് ചെയ്യുക |

## എൻഡ്പോയിന്റ് സംഗ്രഹം

| എൻഡ്പോയിന്റ്                          | രീതി   | ബോഡി                                | പ്രാമാണീകരണം |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management   |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management   |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management   |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management   |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management   |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management   |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management   |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management   |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management   |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management   |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management   |

കേന്ദ്രീകൃതമായ `/api/settings/tunnels` എൻഡ്പോയിന്റ് ഇല്ല — ഓരോ ബാക്ക്എൻഡും
സ്വതന്ത്രമാണ്.

## OAuth കോൾബാക്ക് പരിഗണനകൾ

ഒരു ടണൽ വഴി OmniRoute ലഭ്യമാക്കുമ്പോൾ, ഡാഷ്ബോർഡും OAuth ഫ്ലോകളും കോൾബാക്ക്
URL-കൾ `localhost`-ന് എതിരെയല്ല, **പബ്ലിക്** ഹോസ്റ്റ്നെയിമിന് എതിരെയാണ്
നിർമ്മിക്കേണ്ടത്. അല്ലെങ്കിൽ OAuth പ്രൊവൈഡർ ഉപയോക്താവിനെ അതിന്റെ സെർവറുകൾക്ക്
എത്തിച്ചേരാനാകാത്ത ഒരു URL-ലേക്ക് തിരിച്ചുവിടുകയും ഹാൻഡ്ഷേക്ക് പരാജയപ്പെടുകയും ചെയ്യും.

ഡാഷ്ബോർഡ് തിരുത്തലുകൾക്കും ക്രമീകരണങ്ങൾ സംരക്ഷിക്കുന്നതിനും ടണൽ ഹോസ്റ്റ്നെയിം
`NEXT_PUBLIC_BASE_URL`-ൽ സ്ഥിരപ്പെടുത്തേണ്ടതില്ല. പ്രാമാണീകരിച്ച ഡാഷ്ബോർഡ്,
സെഷനുമായി ബന്ധിപ്പിച്ച CSRF ടോക്കൺ ഉപയോഗിച്ച് ഒരേ ഒറിജിനിലേക്കുള്ള സുരക്ഷിതമല്ലാത്ത
അഭ്യർത്ഥനകൾ അയയ്ക്കുന്നതിനാൽ, ലോഗിൻ ചെയ്തശേഷമുള്ള സാധാരണ UI മാനേജ്മെന്റിന്
താൽക്കാലിക Cloudflare Quick Tunnel ഹോസ്റ്റുകൾ തുടർന്നും ഉപയോഗിക്കാം.

ഇങ്ങനെ സജ്ജമാക്കുക:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

OAuth ആരംഭിക്കുന്നതിനുമുമ്പ് OmniRoute പുനരാരംഭിക്കുക. താൽക്കാലിക Cloudflare Quick
Tunnels-ൽ ഓരോ പുനരാരംഭത്തിനുശേഷവും URL മാറുന്നതിനാൽ, പ്രൊഡക്ഷൻ OAuth
ഉപയോഗത്തിനായി റിസർവ് ചെയ്ത ഡൊമെയ്നുള്ള ngrok അല്ലെങ്കിൽ Tailscale Funnel
തിരഞ്ഞെടുക്കുന്നതാണ് ഉചിതം.

## ആരോഗ്യം, നിരീക്ഷണം

ഡാഷ്ബോർഡ് **Settings → Tunnels** എന്നതിന് കീഴിൽ ടണലിന്റെ നില കാണിക്കുന്നു:

- സജീവമായ ബാക്ക്എൻഡ്(കൾ), നിലവിലെ `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- നിലവിലെ പബ്ലിക് URL, അതിൽനിന്ന് ലഭിക്കുന്ന API URL (`<publicUrl>/v1`).
- ടണൽ ഫോർവേഡ് ചെയ്യുന്ന ലോക്കൽ ടാർഗറ്റ് URL.
- എന്തെങ്കിലും ഉണ്ടെങ്കിൽ, അവസാനത്തെ പിശക് സന്ദേശം.

പ്രോഗ്രാമാറ്റിക് നിരീക്ഷണത്തിനായി ഓരോ ബാക്ക്എൻഡിന്റെയും `GET` എൻഡ്പോയിന്റുകൾ
പോൾ ചെയ്യുക. ഒരേസമയം ഒന്നിലധികം ബാക്ക്എൻഡുകൾ പ്രവർത്തിപ്പിക്കാൻ അനുമതിയുണ്ട്;
OmniRoute ഓരോന്നിനെയും സ്വതന്ത്രമായി ട്രാക്ക് ചെയ്യും.

## പ്രശ്നപരിഹാരം

### "cloudflared ബൈനറി കണ്ടെത്തിയില്ല"

ആദ്യ ഉപയോഗത്തിൽ സ്വയമേവ ഇൻസ്റ്റാൾ ചെയ്യാൻ OmniRoute ശ്രമിക്കുന്നു. ഇൻസ്റ്റാളേഷൻ
തടയപ്പെട്ടാൽ (നിയന്ത്രിത നെറ്റ്വർക്ക്, GitHub ആക്സസ് ഇല്ല), `cloudflared`
<https://github.com/cloudflare/cloudflared/releases> എന്നതിൽനിന്ന് മാനുവലായി
ഡൗൺലോഡ് ചെയ്ത് `CLOUDFLARED_BIN=/path/to/cloudflared` സജ്ജമാക്കുക.

### "ngrok: authtoken ആവശ്യമാണ്"

`phase: "needs_auth"` എന്നത് authtoken കണ്ടെത്തിയില്ല എന്നാണ് അർത്ഥമാക്കുന്നത്.
`.env`-ൽ `NGROK_AUTHTOKEN` സജ്ജമാക്കുക, ഡാഷ്ബോർഡ് വഴി അത് കോൺഫിഗർ ചെയ്യുക,
അല്ലെങ്കിൽ enable POST ബോഡിയിൽ `authToken` നൽകുക.

### "tailscale: funnel പ്രവർത്തനക്ഷമമാക്കിയിട്ടില്ല"

enable പ്രതികരണത്തിൽ `funnelNotEnabled: true` ഉൾപ്പെടുമ്പോൾ, നിങ്ങളുടെ tailnet-ൽ
Funnel പ്രവർത്തനരഹിതമാണ്. തിരികെ ലഭിച്ച `enableUrl` (അല്ലെങ്കിൽ അഡ്മിൻ
കൺസോളിലെ ഫീച്ചർ പേജ്) തുറന്ന് Funnel ഓൺ ചെയ്യുക.

### ടണൽ URL-ലെ മാറ്റങ്ങൾ OAuth തകരാറിലാക്കുന്നു

റിസർവ് ചെയ്ത ഡൊമെയ്നുള്ള ngrok അല്ലെങ്കിൽ Tailscale Funnel ഉപയോഗിക്കുക (രണ്ടും
ഓരോ നോഡിലും സ്ഥിരതയുള്ളവയാണ്). Cloudflare Quick Tunnels രൂപകൽപ്പനപ്രകാരം
താൽക്കാലികമാണ്; ദീർഘകാല OAuth കോൾബാക്കുകൾക്ക് അവ ശുപാർശ ചെയ്യുന്നില്ല.

### Tailscale-ന് Linux/macOS-ൽ അനുമതി നിഷേധിച്ചു

`tailscaled`-ന് root ആവശ്യമാണ്. പ്രസക്തമായ POST എൻഡ്പോയിന്റിന്
`sudoPassword` നൽകുക, അല്ലെങ്കിൽ ഡീമൺ സ്വയം പ്രവർത്തിപ്പിക്കുക
(`sudo systemctl start tailscaled`).

## ഇതും കാണുക

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ഔട്ട്ഗോയിംഗ് ട്രാഫിക്കിനായുള്ള ഔട്ട്ബൗണ്ട് പ്രോക്സി (1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` ഉൾപ്പെടെയുള്ള പരിസ്ഥിതി വേരിയബിളുകളുടെ പൂർണ്ണ പട്ടിക.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — സ്ഥിരതയുള്ള പൊതു ഹോസ്റ്റിംഗിനായി ടണലിംഗിനുള്ള ബദൽ മാർഗങ്ങൾ.
- ഉറവിടം: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
