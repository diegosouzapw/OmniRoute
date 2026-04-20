# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (עברית)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

This guide documents the gold standard of network infrastructure to protect **OmniRoute** and securely expose your application to the internet, **without opening any ports (Zero Inbound)**.

## What was done on your VM?

We enabled OmniRoute in **Split-Port** mode via PM2:

- **Port `20128`:** Runs **only the API** `/v1`.
- **Port `20129`:** Runs **only the Administrative Dashboard**.

Furthermore, the internal service requires `REQUIRE_API_KEY=true`, which means no agent can consume the API endpoints without sending a legitimate "Bearer Token" generated in the Dashboard's API Keys tab.

This allows us to create two completely independent network rules. This is where the **Cloudflare Tunnel (cloudflared)** comes in.

---

## 1. How to Create the Tunnel in Cloudflare

The `cloudflared` utility is already installed on your machine. Follow these steps in the cloud:

1. Access your **Cloudflare Zero Trust** dashboard (one.dash.cloudflare.com).
2. In the left menu, go to **Networks > Tunnels**.
3. Click on **Add a Tunnel**, choose **Cloudflared**, and name it `OmniRoute-VM`.
4. It will generate a command on the screen called "Install and run a connector". **You only need to copy the Token (the long string after `--token`)**.
5. Log in via SSH to your virtual machine (or Proxmox Terminal) and execute:
   ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

---

## 2. Configuring Routing (Public Hostnames)

Still on the newly created Tunnel screen, go to the **Public Hostnames** tab and add the **two** routes, taking advantage of the separation we made:

### Route 1: Secure API (Limited)

- **Subdomain:** `api`
- **Domain:** `yourglobal.com` (choose your real domain)
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20128` _(Internal API port)_

### Route 2: Zero Trust Dashboard (Closed)

- **Subdomain:** `omniroute` or `panel`
- **Domain:** `yourglobal.com`
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20129` _(Internal App/Visual port)_

At this point, the "Physical" connectivity is resolved. Now let's truly shield it.

---

## 3. Shielding the Dashboard with Zero Trust (Access)

No local password protects your dashboard better than completely removing access to it from the open internet.

1. In the Zero Trust dashboard, go to **Access > Applications > Add an application**.
2. Select **Self-hosted**.
3. In **Application name**, enter `OmniRoute Panel`.
4. In **Application domain**, enter `omniroute.yourglobal.com` (The same one you used in "Route 2").
5. Click **Next**.
6. In **Rule action**, choose `Allow`. For the Rule name, enter `Admin Only`.
7. In **Include**, under the "Selector" dropdown, choose `Emails` and type your email, for example `admin@spgeo.com.br`.
8. Save (`Add application`).

> **What this did:** If you try to open `omniroute.yourglobal.com`, it no longer lands on your OmniRoute application! It lands on an elegant Cloudflare screen asking you to enter your email. Only if you (or the email you entered) is typed there, you will receive a temporary 6-digit code in Outlook/Gmail that unlocks the tunnel to port `20129`.

---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

The Zero Trust Dashboard does not apply to the API route (`api.yourglobal.com`), because it is a programmatic access via automated tools (agents) without a browser. For this, we will use Cloudflare's main Firewall (WAF).

1. Access the **Normal Cloudflare Dashboard** (dash.cloudflare.com) and go to your Domain.
2. In the left menu, go to **Security > WAF > Rate limiting rules**.
3. Click on **Create rule**.
4. **Name:** `OmniRoute API Anti-Abuse`
5. **If incoming requests match...**
   - Choose Field: `Hostname`
   - Operator: `equals`
   - Value: `api.yourglobal.com`
6. Under **With the same characteristics:** Keep `IP`.
7. For the limits (Limit):
   - **When requests exceed:** `50`
   - **Period:** `1 minute`
8. At the end, under **Action**: `Block` and decide if the block lasts for 1 minute or 1 hour.
9. **Deploy**.

> **What this did:** No one can send more than 50 requests in a 60-second period to your API URL. Since you run multiple agents and the consumption behind them already hits rate limits and tracks tokens, this is just a measure at the Internet Edge Layer that protects your On-Premises Instance from going down due to thermal stress before the traffic even goes down the tunnel.

---

## Finalization

1. Your VM **has no exposed ports** in `/etc/ufw`.
2. OmniRoute only talks HTTPS outbound (`cloudflared`) and does not receive direct TCP from the world.
3. Your requests to OpenAI are obfuscated because we globally configured them to pass through a SOCKS5 Proxy (The cloud doesn't care about SOCKS5 because it comes Inbound).
4. Your web dashboard has 2-Factor authentication with Email.
5. Your API is rate-limited at the edge by Cloudflare and only traffics Bearer Tokens.
