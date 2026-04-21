# Guia Completo: Cloudflare Tunnel & Zero Trust (Split-Port) (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Este guia documenta o padrão ouro de infraestrutura de rede para proteger o **OmniRoute** e expor sua aplicação de forma segura para a internet, **sem abrir nenhuma porta (Zero Inbound)**.

## O que foi feito na sua VM?

Nós ativamos o OmniRoute em modo **Split-Port** através do PM2:

- **Porta `20128`:** Roda **apenas a API** `/v1`.
- **Porta `20129`:** Roda **apenas o Dashboard** Administrativo visual.

Além disso, o serviço interno exige `REQUIRE_API_KEY=true`, o que significa que nenhum agente pode consumir os endpoints da API sem enviar um "Bearer Token" legítimo gerado na aba API Keys do Painel.

Isso nos permite criar duas regras completamente independentes na rede. É aqui que entra o **Cloudflare Tunnel (cloudflared)**.

---

## 1. Como Criar o Túnel na Cloudflare

O utilitário `cloudflared` já está instalado na sua máquina. Siga os passos na nuvem:

1. Acesse seu painel **Cloudflare Zero Trust** (One.dash.cloudflare.com).
2. No menu à esquerda, vá em **Networks > Tunnels**.
3. Clique em **Add a Tunnel**, escolha **Cloudflared** e dê o nome `OmniRoute-VM`.
4. Ele vai gerar um comando na tela chamado "Install and run a connector". **Você só precisa copiar o Token (a string longa após `--token`)**.
5. Logue via SSH na sua máquina virtual (ou Terminal do Proxmox) e execute:
   ```bash
   # Inicia e amarra o túnel permanentemente à sua conta
   cloudflared service install SEU_TOKEN_GIGANTE_AQUI
   ```

---

## 2. Configurando o Roteamento (Public Hostnames)

Ainda na tela do Tunnel recém-criado, vá para a aba **Public Hostnames** e adicione as **duas** rotas, aproveitando a separação que fizemos:

### Rota 1: API Segura (Limitada)

- **Subdomain:** `api`
- **Domain:** `seuglobal.com.br` (escolha seu domínio real)
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20128` _(Porta interna da API)_

### Rota 2: Painel Zero Trust (Fechado)

- **Subdomain:** `omniroute` ou `painel`
- **Domain:** `seuglobal.com.br`
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20129` _(Porta interna do App/Visual)_

Neste momento, a conectividade "Física" está resolvida. Agora vamos blindar de verdade.

---

## 3. Blindando o Painel com Zero Trust (Access)

Nenhuma senha local protege melhor o seu painel do que remover totalmente o acesso a ele da internet aberta.

1. No painel Zero Trust, vá em **Access > Applications > Add an application**.
2. Selecione **Self-hosted**.
3. Em **Application name**, coloque `Painel OmniRoute`.
4. Em **Application domain**, coloque `omniroute.seuglobal.com.br` (O mesmo que você fez na "Rota 2").
5. Clique em **Next**.
6. Em **Rule action**, escolha `Allow`. Em nome da Rule coloque `Admin Apenas`.
7. Em **Include**, no seletor de "Selector" escolha `Emails` e digite o seu email, por exemplo `admin@spgeo.com.br`.
8. Salve (`Add application`).

> **O que isso fez:** Se você tentar abrir `omniroute.seuglobal.com.br`, não cai mais na sua aplicação OmniRoute! Cai numa tela elegante da Cloudflare pedindo para digitar seu email. Somente se você (ou o email que você botou) for digitado lá, ele recebe no Outlook/Gmail um código de 6 dígitos temporário que libera o túnel até a porta `20129`.

---

## 4. Limitando e Protegendo a API com Rate Limit (WAF)

O Dashboard do Zero Trust não se aplica à rota da API (`api.seuglobal.com.br`), porque é um acesso programático via ferramentas automatizadas (agentes) sem navegador. Para ele, usaremos o Firewall principal (WAF) da Cloudflare.

1. Acesse o **Painel Normal** da Cloudflare (dash.cloudflare.com) e entre no seu Domínio.
2. No menu esquerdo, vá em **Security > WAF > Rate limiting rules**.
3. Clique em **Create rule**.
4. **Name:** `Anti-Abuso OmniRoute API`
5. **If incoming requests match...**
   - Escolha em Field: `Hostname`
   - Operator: `equals`
   - Value: `api.seuglobal.com.br`
6. Em **With the same characteristics:** Mantenha `IP`.
7. Nos limites (Limit):
   - **When requests exceed:** `50`
   - **Period:** `1 minute`
8. No final, em **Action**: `Block` (Bloquear) e decida se o bloqueio dura por 1 minuto ou 1 hora.
9. **Deploy**.

> **O que isso fez:** Ninguém pode mandar mais de 50 requisições num período de 60 segundos na sua URL de API. Como você roda vários agentes e os consumos por trás já batem rate limit e já rastreiam tokens, isso é apenas uma medida na Borda da Internet (Edge Layer) que protege sua Instância On-Premises de cair por estresse térmico antes mesmo do tráfego descer pelo túnel.

---

## Finalização

1. A sua VM **não possui nenhuma porta exposta** em `/etc/ufw`.
2. O OmniRoute só conversa HTTPS saindo (`cloudflared`) e não recebendo TCP direto do mundo.
3. Seus requets pro OpenAI são ofuscados porque configuramos eles globalmente pra passar em um Proxy SOCKS5 (A nuvem não liga pro SOCKS5 porque ela vem Inbound).
4. Seu painel web tem 2-Factor com Email.
5. Sua API está ratelimitada na borda pela Cloudflare e só trafega Bearer Tokens.
