# Tunnels Guide (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Fonte da verdade:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute pode expor seu servidor local (`http://localhost:20128`) à internet
pública por meio de três backends de túnel. Isso é útil para:

- Callbacks de OAuth de provedores de nuvem (Antigravity, Gemini, Cursor) que precisam de uma
  URL de redirecionamento acessível publicamente.
- Compartilhar sua instância local com colegas de equipe sem implantar uma VM.
- Testes em dispositivos móveis, remotos ou entre redes.

Todos os três backends são gerenciados no próprio processo — o OmniRoute inicia/interrompe o
binário ou SDK subjacente pelo painel ou pela API REST. Nenhuma configuração de
proxy reverso ou systemd é necessária.

## Visão geral dos backends

| Backend                     | Persistência                                                       | Custo                     | Configuração                                           |
| --------------------------- | ------------------------------------------------------------------ | ------------------------- | ------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Efêmero (a URL muda a cada reinicialização)                        | Gratuito                  | Nenhuma — instala automaticamente o `cloudflared`      |
| **ngrok**                   | Estável enquanto um plano pago ou domínio fixo estiver configurado | Plano gratuito + pago     | Requer conta do ngrok + authtoken                      |
| **Tailscale Funnel**        | Estável por nó dentro da sua tailnet                               | Gratuito para uso pessoal | Requer instalação do Tailscale + login + ACL do Funnel |

As implementações ficam em `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` e `src/lib/tailscaleTunnel.ts`. Todas as três retornam um
objeto `status` com o mesmo formato e com os campos `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` e `lastError`, permitindo que o painel as renderize de maneira uniforme.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` executa o `cloudflared` como um processo filho. Ele oferece
suporte a dois modos, selecionados conforme uma configuração de túnel nomeado seja fornecida ou não:

- **Túnel rápido (padrão).** Executa `cloudflared tunnel --url
http://localhost:<apiPort>` e extrai a URL `*.trycloudflare.com` atribuída
  da saída padrão. As URLs são efêmeras e mudam a cada reinicialização.
- **Túnel nomeado (opcional).** Quando `CLOUDFLARED_CONFIG` aponta para um
  `config.yml` do cloudflared gerenciado localmente, o OmniRoute executa `cloudflared tunnel --no-autoupdate
--config <path> run`, fornecendo um **hostname estável e nomeado**. A configuração
  fornece o UUID do túnel, o `credentials-file` e o roteamento de `ingress`; portanto, nenhum
  `--url` é passado e nenhum token do painel do Zero Trust é necessário. `run` lê
  as credenciais do caminho absoluto de `credentials-file` presente na configuração — nenhum `cert.pem`
  é necessário (ele é usado apenas para o gerenciamento do ciclo de vida do túnel).

Principais comportamentos:

- **Instalação automática.** No primeiro uso, o OmniRoute baixa o binário
  `cloudflared` mais recente das versões oficiais do GitHub (a instalação gerenciada fica em
  `DATA_DIR/cloudflared/`). O SHA256 do artefato baixado é verificado em relação ao
  manifesto da versão antes da execução.
- **Supervisão do processo.** O PID do cloudflared e a URL resolvida são persistidos em
  `quick-tunnel-state.json` para que o painel possa retomar o status após recarregamentos.

### Configuração de túnel nomeado (hostname estável)

1. Crie um túnel gerenciado localmente com a CLI do cloudflared (uma única vez):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Crie um `~/.cloudflared/config.yml` que direcione seu hostname para a porta
   local da API do OmniRoute (20128 por padrão):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Aponte o OmniRoute para a configuração e (re)inicie o túnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opcional — substitui o hostname informado pelo OmniRoute; caso contrário, ele é lido da
   # primeira regra de ingress da configuração:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Ative o túnel da mesma maneira que um túnel rápido (REST / painel / CLI
   abaixo). Um túnel nomeado não emite uma URL pública para extração; portanto, a prontidão é detectada
   pela conexão de edge registrada do cloudflared, e `publicUrl`/`apiUrl` são
   informados a partir de `CLOUDFLARED_HOSTNAME` (ou do primeiro hostname de ingress da configuração).

### Ativar / desativar via REST

O endpoint usa um corpo `{action: "enable" | "disable"}`, e não caminhos
`start`/`stop` separados. É necessária autenticação de gerenciamento (sessão de administrador ou chave de API de administrador).

```bash
# Ativar
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Desativar
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ou pelo painel: **Configurações → Túneis → Cloudflare**.

### Variáveis de ambiente opcionais

| Variável                                             | Finalidade                                                                                                                                                                                         |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Substitui o caminho do binário. Se estiver definida e for válida, o OmniRoute a utiliza em vez de fazer o download.                                                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protocolo de transporte (padrão: `http2`; também aceita `quic` e `auto`).                                                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | Caminho para um `config.yml` do cloudflared gerenciado localmente. Quando definida, o OmniRoute executa um túnel **nomeado/persistente** (`tunnel --config <path> run`) em vez de um túnel rápido. |
| `CLOUDFLARED_HOSTNAME`                               | Substitui o hostname público informado pelo túnel nomeado (por exemplo, `ai.example.com`). Quando não definida, ele é obtido do primeiro hostname de `ingress` da configuração.                    |

## 2. ngrok

`src/lib/ngrokTunnel.ts` usa o **SDK `@ngrok/ngrok`** (no processo, sem subprocesso de CLI). O módulo nativo é importado de forma tardia na primeira inicialização, para que plataformas sem binários pré-compilados não interrompam o aplicativo durante a inicialização.

### Pré-requisitos

1. Cadastre-se em <https://ngrok.com>.
2. Copie seu authtoken no painel do ngrok.
3. Forneça-o por uma destas opções:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ou
   - Painel: **Configurações → Túneis → ngrok**, ou
   - Corpo REST (uso único): `{"action":"enable","authToken":"<token>"}`.

Se nenhum deles estiver configurado, o status retornará `phase: "needs_auth"`.

### Ativar / desativar via REST

```bash
# Ativar (usa NGROK_AUTHTOKEN do ambiente)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Ativar com token em linha
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Desativar
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

A resposta inclui a `publicUrl` atribuída (por exemplo, `https://abcd-1234.ngrok-free.app`). Domínios personalizados, regiões e regras de política devem ser configurados no painel do ngrok — o próprio OmniRoute apenas encaminha a URL do destino local para o SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orquestra a CLI `tailscale` do sistema para expor a porta da API local por meio do **Funnel** (a saída do Tailscale para a internet pública para o serve). Ele oferece suporte ao ciclo de vida completo: instalação, login, inicialização do daemon, ativação e desativação.

A implementação invoca `tailscale funnel --bg <port>` (modo em segundo plano). A URL pública tem o formato `https://<machine>.<tailnet>.ts.net/`.

### Pré-requisitos

1. Instale o Tailscale (ou deixe que o OmniRoute faça isso — consulte o endpoint `install` abaixo).
2. Faça login (`tailscale login` ou por meio do endpoint `login` do OmniRoute).
3. Ative o Funnel para sua tailnet no console de administração do Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

No Linux e no macOS, o daemon (`tailscaled`) requer `sudo` para ser controlado. Os endpoints POST aceitam um campo opcional `sudoPassword`, que é encaminhado ao cache de senhas MITM do OmniRoute (`getCachedPassword` / `setCachedPassword`) durante a chamada. O Windows usa a instalação de serviço padrão em `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoints REST

O Tailscale possui uma superfície mais abrangente do que os outros backends, pois instalação, login, daemon e túnel são aspectos separados.

| Endpoint                              | Método | Finalidade                                                                 |
| ------------------------------------- | ------ | -------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Status agregado do túnel (`phase`, `tunnelUrl`, `apiUrl` etc.)             |
| `/api/tunnels/tailscale/check`        | `GET`  | Verificação de baixo nível: instalado? login efetuado? daemon em execução? |
| `/api/tunnels/tailscale/install`      | `POST` | Instalar o Tailscale (eventos de progresso via SSE) — Linux/macOS          |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Iniciar o `tailscaled` no Linux/macOS                                      |
| `/api/tunnels/tailscale/login`        | `POST` | Iniciar o fluxo de login; retorna a `authUrl` para abrir em um navegador   |
| `/api/tunnels/tailscale/enable`       | `POST` | Iniciar o Funnel para a porta da API                                       |
| `/api/tunnels/tailscale/disable`      | `POST` | Parar o Funnel                                                             |

Todos os endpoints do Tailscale exigem autenticação de gerenciamento (consulte `routeUtils.ts :: requireTailscaleAuth`).

Exemplo de ativação:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Se o Funnel não estiver ativado no console de administração, a resposta incluirá `funnelNotEnabled: true`, além de uma `enableUrl` para abrir em um navegador.

### Variáveis de ambiente opcionais

| Variável        | Finalidade                                  |
| --------------- | ------------------------------------------- |
| `TAILSCALE_BIN` | Substituir o caminho do binário `tailscale` |

## Resumo dos endpoints

| Endpoint                              | Método | Corpo                               | Autenticação |
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

Não há um endpoint central `/api/settings/tunnels` — cada backend é
independente.

## Considerações sobre o callback do OAuth

Quando você expõe o OmniRoute por meio de um túnel, o painel e os fluxos do OAuth devem
criar URLs de callback usando o nome de host **público**, e não `localhost`. Caso contrário,
o provedor OAuth redirecionará o usuário de volta para uma URL que os servidores dele não conseguem acessar,
e o handshake falhará.

As edições no painel e o salvamento das configurações não exigem fixar o nome de host do túnel em
`NEXT_PUBLIC_BASE_URL`. O painel autenticado envia solicitações não seguras para a mesma origem
com um token CSRF vinculado à sessão, portanto, hosts efêmeros do Cloudflare Quick Tunnel
ainda podem ser usados para o gerenciamento normal da interface após o login.

Defina:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

e reinicie o OmniRoute antes de iniciar o OAuth. Nos Cloudflare Quick
Tunnels efêmeros, a URL muda após cada reinicialização; portanto, para uso do OAuth em produção,
prefira o ngrok com um domínio reservado ou o Tailscale Funnel.

## Integridade e monitoramento

O painel exibe o estado dos túneis em **Configurações → Túneis**:

- Backend(s) ativo(s) e a `phase` atual (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- A URL pública atual e a URL da API derivada (`<publicUrl>/v1`).
- A URL de destino local para a qual o túnel está encaminhando.
- A última mensagem de erro, se houver.

Para monitoramento programático, consulte periodicamente os endpoints `GET` de cada backend. É permitido executar
mais de um backend simultaneamente; o OmniRoute acompanhará cada um
de forma independente.

## Solução de problemas

### "cloudflared binary not found"

O OmniRoute tenta fazer a instalação automática no primeiro uso. Se a instalação for bloqueada
(rede restrita, sem acesso ao GitHub), baixe o `cloudflared` manualmente em
<https://github.com/cloudflare/cloudflared/releases> e defina
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken required"

`phase: "needs_auth"` significa que nenhum authtoken foi encontrado. Defina `NGROK_AUTHTOKEN` no
`.env`, configure-o pelo painel ou passe `authToken` no corpo da solicitação POST
de habilitação.

### "tailscale: funnel not enabled"

Quando a resposta de habilitação incluir `funnelNotEnabled: true`, o Funnel estará desabilitado
para a sua tailnet. Abra o `enableUrl` retornado (ou a página do recurso no console de administração)
e ative o Funnel.

### Alterações na URL do túnel interrompem o OAuth

Use o ngrok com um domínio reservado ou o Tailscale Funnel (ambos são estáveis por nó).
Os Cloudflare Quick Tunnels são efêmeros por design e não são recomendados para
callbacks de OAuth de longa duração.

### Permissão negada no Linux/macOS para o Tailscale

O `tailscaled` precisa de acesso root. Forneça `sudoPassword` ao endpoint POST relevante
ou execute o daemon por conta própria (`sudo systemctl start tailscaled`).

## Veja também

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy de saída (1proxy, SOCKS5, HTTP) para
  tráfego de saída.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — lista completa de variáveis de ambiente, incluindo
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativas ao tunelamento para hospedagem
  pública estável.
- Código-fonte: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
