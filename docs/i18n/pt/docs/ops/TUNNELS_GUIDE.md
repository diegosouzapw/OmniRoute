# Tunnels Guide (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Fonte de verdade:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Última atualização:** 2026-06-28 — v3.8.40

O OmniRoute pode expor o seu servidor local (`http://localhost:20128`) à Internet
pública através de três backends de túnel. Isto é útil para:

- Callbacks OAuth de fornecedores de cloud (Antigravity, Gemini, Cursor) que necessitem de um
  URL de redirecionamento acessível publicamente.
- Partilhar a sua instância local com colegas de equipa sem implementar uma VM.
- Testes em dispositivos móveis, remotos ou entre redes.

Os três backends são geridos no próprio processo — o OmniRoute inicia/para o binário
ou SDK subjacente a partir do painel ou da API REST. Não é necessária qualquer configuração
de proxy inverso ou systemd.

## Resumo dos backends

| Backend                     | Persistência                                                  | Custo                     | Configuração                                                      |
| --------------------------- | ------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Efémero (o URL muda a cada reinício)                          | Gratuito                  | Nenhuma — instala automaticamente o `cloudflared`                 |
| **ngrok**                   | Estável quando está configurado um plano pago ou domínio fixo | Nível gratuito + pago     | Requer conta ngrok + authtoken                                    |
| **Tailscale Funnel**        | Estável por nó dentro da sua tailnet                          | Gratuito para uso pessoal | Requer instalação do Tailscale + início de sessão + ACL do Funnel |

As implementações encontram-se em `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` e `src/lib/tailscaleTunnel.ts`. As três devolvem um
objeto `status` com uma estrutura comum e os campos `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` e `lastError`, para que o painel as possa apresentar de forma uniforme.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` executa o `cloudflared` como um processo subordinado. Suporta
dois modos, selecionados consoante seja ou não fornecida uma configuração de túnel nomeado:

- **Túnel rápido (predefinição).** Executa `cloudflared tunnel --url
http://localhost:<apiPort>` e extrai do stdout o URL `*.trycloudflare.com`
  atribuído. Os URLs são efémeros e mudam a cada reinício.
- **Túnel nomeado (opcional).** Quando `CLOUDFLARED_CONFIG` aponta para um
  `config.yml` do cloudflared gerido localmente, o OmniRoute executa `cloudflared tunnel --no-autoupdate
--config <path> run`, fornecendo-lhe um **nome de anfitrião estável e nomeado**. A configuração
  fornece o UUID do túnel, `credentials-file` e o encaminhamento `ingress`, pelo que não é
  passado nenhum `--url` nem é necessário qualquer token do painel Zero Trust. `run` lê
  as credenciais a partir do caminho absoluto de `credentials-file` na configuração — não é necessário
  nenhum `cert.pem` (este apenas é utilizado para a gestão do ciclo de vida do túnel).

Comportamentos principais:

- **Instalação automática.** Na primeira utilização, o OmniRoute transfere o binário `cloudflared`
  mais recente a partir das versões oficiais do GitHub (a instalação gerida fica em
  `DATA_DIR/cloudflared/`). O SHA256 do recurso transferido é verificado em relação ao
  manifesto da versão antes da execução.
- **Supervisão do processo.** O PID do cloudflared e o URL resolvido são guardados em
  `quick-tunnel-state.json`, para que o painel possa retomar o estado após recarregamentos.

### Configuração de um túnel nomeado (nome de anfitrião estável)

1. Crie um túnel gerido localmente com a CLI do cloudflared (uma única vez):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Crie um `~/.cloudflared/config.yml` que encaminhe o seu nome de anfitrião para a porta
   local da API do OmniRoute (predefinição: 20128):

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
   # opcional — substitui o nome de anfitrião comunicado pelo OmniRoute; caso contrário, é lido a partir da
   # primeira regra de ingress da configuração:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Ative o túnel da mesma forma que um túnel rápido (REST / painel / CLI
   abaixo). Um túnel nomeado não emite nenhum URL público para extrair, pelo que a disponibilidade é detetada
   através da ligação edge registada do cloudflared, e `publicUrl`/`apiUrl` são
   comunicados a partir de `CLOUDFLARED_HOSTNAME` (ou do primeiro nome de anfitrião de ingress da configuração).

### Ativar/desativar através de REST

O endpoint utiliza um corpo `{action: "enable" | "disable"}`, e não caminhos
`start`/`stop` separados. É necessária autenticação de gestão (sessão de administrador ou chave de API de administrador).

```bash
# Ativar
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Estado
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Desativar
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ou através do painel: **Definições → Túneis → Cloudflare**.

### Variáveis de ambiente opcionais

| Variável                                             | Finalidade                                                                                                                                                                                          |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Substitui o caminho do binário. Se estiver definido e for válido, o OmniRoute utiliza-o em vez de efetuar a transferência.                                                                          |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protocolo de transporte (predefinição: `http2`; também `quic`, `auto`).                                                                                                                             |
| `CLOUDFLARED_CONFIG`                                 | Caminho para um `config.yml` do cloudflared gerido localmente. Quando definido, o OmniRoute executa um túnel **com nome/persistente** (`tunnel --config <path> run`) em vez de um túnel rápido.     |
| `CLOUDFLARED_HOSTNAME`                               | Substitui o nome de anfitrião público comunicado pelo túnel com nome (por exemplo, `ai.example.com`). Quando não definido, é lido a partir do primeiro nome de anfitrião `ingress` da configuração. |

## 2. ngrok

`src/lib/ngrokTunnel.ts` utiliza o **SDK `@ngrok/ngrok`** (no processo, sem
subprocesso da CLI). O módulo nativo é importado de forma diferida no primeiro
arranque, para que as plataformas sem binários pré-compilados não provoquem uma
falha da aplicação durante o arranque.

### Pré-requisitos

1. Registe-se em <https://ngrok.com>.
2. Copie o seu authtoken a partir do painel do ngrok.
3. Forneça-o através de uma das seguintes opções:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ou
   - Painel: **Settings → Tunnels → ngrok**, ou
   - Corpo REST (utilização única): `{"action":"enable","authToken":"<token>"}`.

Se nenhum estiver configurado, o estado devolve `phase: "needs_auth"`.

### Ativar/desativar através de REST

```bash
# Ativar (utiliza NGROK_AUTHTOKEN do ambiente)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Ativar com token inline
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Estado
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Desativar
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

A resposta inclui o `publicUrl` atribuído (por exemplo,
`https://abcd-1234.ngrok-free.app`). Os domínios personalizados, as regiões e
as regras de políticas têm de ser configurados no painel do ngrok — o OmniRoute
apenas encaminha o URL de destino local para o SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orquestra a CLI de sistema `tailscale` para expor
a porta da API local através do **Funnel** (a saída do Tailscale para a Internet
pública para o serve). Suporta todo o ciclo de vida: instalação, início de
sessão, arranque do daemon, ativação e desativação.

A implementação invoca `tailscale funnel --bg <port>` (modo em segundo plano).
O URL público tem o formato `https://<machine>.<tailnet>.ts.net/`.

### Pré-requisitos

1. Instale o Tailscale (ou permita que o OmniRoute o faça — consulte o endpoint
   `install` abaixo).
2. Inicie sessão (`tailscale login` ou através do endpoint `login` do OmniRoute).
3. Ative o Funnel para a sua tailnet na consola de administração do Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

No Linux e no macOS, o daemon (`tailscaled`) requer `sudo` para ser controlado.
Os endpoints POST aceitam um campo opcional `sudoPassword`, que é encaminhado
para a cache de palavras-passe MITM do OmniRoute (`getCachedPassword` /
`setCachedPassword`) durante a chamada. O Windows utiliza a instalação
predefinida do serviço em `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoints REST

O Tailscale tem uma interface mais abrangente do que os outros backends, uma
vez que a instalação, o início de sessão, o daemon e o túnel são aspetos
independentes.

| Endpoint                              | Método | Finalidade                                                                        |
| ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Estado agregado do túnel (`phase`, `tunnelUrl`, `apiUrl`, etc.)                   |
| `/api/tunnels/tailscale/check`        | `GET`  | Verificação de baixo nível: instalado? com sessão iniciada? daemon ativo?         |
| `/api/tunnels/tailscale/install`      | `POST` | Instalar o Tailscale (eventos de progresso transmitidos por SSE) — Linux/macOS    |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Iniciar o `tailscaled` no Linux/macOS                                             |
| `/api/tunnels/tailscale/login`        | `POST` | Iniciar o fluxo de início de sessão; devolve o `authUrl` para abrir num navegador |
| `/api/tunnels/tailscale/enable`       | `POST` | Iniciar o Funnel para a porta da API                                              |
| `/api/tunnels/tailscale/disable`      | `POST` | Parar o Funnel                                                                    |

Todos os endpoints do Tailscale requerem autenticação de gestão (consulte
`routeUtils.ts :: requireTailscaleAuth`).

Exemplo de ativação:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Se o Funnel não estiver ativado na consola de administração, a resposta inclui
`funnelNotEnabled: true`, bem como um `enableUrl` para abrir num navegador.

### Variáveis de ambiente opcionais

| Variável        | Finalidade                                  |
| --------------- | ------------------------------------------- |
| `TAILSCALE_BIN` | Substituir o caminho do binário `tailscale` |

## Resumo dos endpoints

| Endpoint                              | Método | Corpo                               | Autenticação |
| ------------------------------------- | ------ | ----------------------------------- | ------------ |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | gestão       |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | gestão       |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | gestão       |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | gestão       |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | gestão       |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | gestão       |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | gestão       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | gestão       |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | gestão       |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | gestão       |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | gestão       |

Não existe um endpoint central `/api/settings/tunnels` — cada backend é
independente.

## Considerações sobre callbacks OAuth

Quando expõe o OmniRoute através de um túnel, o painel e os fluxos OAuth têm de
criar URLs de callback com base no nome de anfitrião **público**, e não em
`localhost`. Caso contrário, o fornecedor OAuth redireciona o utilizador para um
URL ao qual os respetivos servidores não conseguem aceder, e o processo de
autenticação falha.

As edições no painel e as gravações de definições não exigem que o nome de
anfitrião do túnel seja fixado em `NEXT_PUBLIC_BASE_URL`. O painel autenticado
envia pedidos não seguros para a mesma origem com um token CSRF associado à
sessão, pelo que os anfitriões efémeros do Cloudflare Quick Tunnel podem
continuar a ser utilizados para a gestão normal da interface após o início de
sessão.

Defina:

```bash
NEXT_PUBLIC_BASE_URL=https://<seu-anfitriao-do-tunel>
```

e reinicie o OmniRoute antes de iniciar o OAuth. Nos Cloudflare Quick Tunnels
efémeros, o URL muda após cada reinício; por isso, para utilizar OAuth em
produção, dê preferência ao ngrok com um domínio reservado ou ao Tailscale
Funnel.

## Estado e monitorização

O painel apresenta o estado do túnel em **Definições → Túneis**:

- Backend(s) ativos e a `phase` atual (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- O URL público atual e o URL da API derivado (`<publicUrl>/v1`).
- O URL de destino local para o qual o túnel está a reencaminhar.
- A última mensagem de erro, se existir.

Para monitorização programática, consulte periodicamente os endpoints `GET` de
cada backend. É permitido executar mais do que um backend em simultâneo; o
OmniRoute acompanhará cada um de forma independente.

## Resolução de problemas

### "binário cloudflared não encontrado"

O OmniRoute tenta efetuar a instalação automática na primeira utilização. Se a
instalação estiver bloqueada (rede restrita, sem acesso ao GitHub), transfira
manualmente o `cloudflared` a partir de
<https://github.com/cloudflare/cloudflared/releases> e defina
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken obrigatório"

`phase: "needs_auth"` significa que não foi encontrado nenhum authtoken. Defina
`NGROK_AUTHTOKEN` em `.env`, configure-o através do painel ou passe `authToken`
no corpo do pedido POST de ativação.

### "tailscale: funnel não ativado"

Quando a resposta de ativação inclui `funnelNotEnabled: true`, o Funnel está
desativado para a sua tailnet. Abra o `enableUrl` devolvido (ou a página da
funcionalidade na consola de administração) e ative o Funnel.

### As alterações ao URL do túnel impedem o funcionamento do OAuth

Utilize o ngrok com um domínio reservado ou o Tailscale Funnel (ambos estáveis
por nó). Os Cloudflare Quick Tunnels são efémeros por conceção e não são
recomendados para callbacks OAuth de longa duração.

### Permissão negada no Linux/macOS para o Tailscale

O `tailscaled` necessita de privilégios de root. Forneça `sudoPassword` ao
endpoint POST relevante ou execute o daemon diretamente (`sudo systemctl start tailscaled`).

## Consulte também

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy de saída (1proxy, SOCKS5, HTTP) para
  tráfego de saída.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — lista completa de variáveis de ambiente, incluindo
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativas ao tunneling para alojamento
  público estável.
- Código-fonte: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
