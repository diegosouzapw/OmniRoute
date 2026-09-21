# 🐳 Docker Guide — OmniRoute (Português (Brasil))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referência completa de implantação com Docker. Para um início rápido, consulte a [seção sobre Docker no README](../README.md#-docker).

## Sumário

- [Execução rápida](#quick-run)
- [Com arquivo de ambiente](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Perfis disponíveis](#available-profiles)
- [Como configurar ferramentas CLI do host quando o OmniRoute é executado no Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar do Redis](#redis-sidecar)
- [Compose para produção](#production-compose)
- [Estágios do Dockerfile](#dockerfile-stages)
- [Variáveis de ambiente essenciais](#critical-environment-variables)
- [Docker Compose com Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Túnel rápido do Cloudflare](#cloudflare-quick-tunnel)
- [Tags de imagem](#image-tags)
- [Disponibilidade: o SQLite padrão é de réplica única](#availability-default-sqlite-is-single-replica)
- [Observações importantes](#important-notes)

---

## Execução rápida

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Com arquivo de ambiente

```bash
# Primeiro, copie e edite o arquivo .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Perfil base (sem ferramentas CLI)
docker compose --profile base up -d

# Perfil CLI (Claude Code, Codex e OpenClaw integrados)
docker compose --profile cli up -d

# Perfil do host (prioriza Linux; monta os binários CLI do host como somente leitura)
docker compose --profile host up -d

# Combine CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfis disponíveis

O OmniRoute inclui quatro perfis do Compose. Escolha aquele que corresponde ao seu ambiente.

| Perfil          | Serviço          | Quando usar                                                                                                                                           | Comando                                      |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (padrão) | `omniroute-base` | Servidor sem interface gráfica / ambiente de execução mínimo, sem CLIs de provedores incluídas                                                        | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Fluxos de trabalho agênticos que chamam `omniroute providers/setup/doctor` e CLIs incluídas (Codex, Claude Code, Droid, OpenClaw)                     | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Hosts Linux que desejam acesso semelhante a `network_mode` às CLIs do host montando `~/.local/bin`, `~/.codex`, `~/.claude` etc. como somente leitura | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Execute o sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porta `8317` para o proxy upstream de CLIs                           | `docker compose --profile cliproxyapi up -d` |

> Vários perfis podem ser combinados: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurando ferramentas de CLI do host quando o OmniRoute é executado no Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e o botão
**Salvar configuração** do painel gravam arquivos como `~/.codex/*.config.toml`. Esses caminhos
só têm significado na máquina em que a CLI realmente é executada. Execute-os dentro
do contêiner e a gravação será feita no diretório pessoal do próprio contêiner (`/home/node` —
a imagem é executada com `USER node`), onde nenhuma CLI do host jamais fará a leitura e de onde os arquivos serão
descartados assim que o contêiner for recriado.

O OmniRoute detecta isso e recusa a gravação, fornecendo instruções em vez de
informar um sucesso que você não pode aproveitar: a CLI é encerrada com o código `2`, e a API responde com `422`
e `containerEphemeralTarget: true`.

### Recomendado: execute a CLI no host e o OmniRoute no Docker

O contêiner disponibiliza a API; a CLI configura as ferramentas do host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # aponte a CLI para o contêiner
omniroute setup-codex                      # grava o ~/.codex real no host
```

Essa é a escolha correta quando Codex, Claude Code, Cursor ou ferramentas semelhantes são executados no seu
laptop — que é a configuração mais comum.

### Alternativa: faça bind mount dos diretórios de configuração do host (perfil `host`)

Se quiser que o próprio contêiner grave a configuração do host, monte os
diretórios e aponte `CLI_CONFIG_HOME` para a raiz da montagem. O perfil `host`
já faz isso:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Um bind mount é o que torna o caminho confiável: o OmniRoute lê
`/proc/self/mountinfo` e permite gravações em caminhos montados (e em diretórios
cujos filhos são montagens, que é exatamente a estrutura de `/host-home` acima), enquanto
continua recusando caminhos não montados.

### Alternativa de escape: configure as próprias CLIs do contêiner (use com moderação)

Quando as CLIs realmente residem dentro do contêiner (o perfil `cli`), a gravação
é intencional. Passe `--allow-container-write` para qualquer comando `setup-*` ou defina
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para o servidor. A gravação prossegue
com um aviso de que ela não sobreviverá ao contêiner.

> **Aviso de segurança — perfil `cli` + montagem de `docker.sock`.**
> O perfil `cli` faz bind mount de `/var/run/docker.sock` para que o
> atualizador automático dentro do contêiner possa recriar a stack por meio do daemon do host
> (`src/lib/system/autoUpdate.ts` verifica a presença desse socket e ignora o
> caminho do Docker quando ele está ausente). Esse socket é **um limite de confiança com
> acesso root ao host**: qualquer coisa que consiga acessá-lo controla o daemon do Docker do host como
> root — podendo criar, inspecionar, interromper e remover qualquer contêiner no host.
> Implicações:
>
> 1. **Nunca exponha a porta do perfil `cli` à rede.** Publique-a
>    em `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — um perfil `cli` acessível pela LAN transforma qualquer RCE no nível do painel em
>    comprometimento total do host.
> 2. **Não faça bind mount de nenhum diretório adicional do host no perfil `cli`.**
>    O socket do Docker, combinado com qualquer montagem adicional, concede ao contêiner acesso total de
>    leitura/gravação ao sistema de arquivos e às configurações do host. Se precisar que uma ferramenta
>    acesse um projeto, execute-a localmente com o binário da CLI — não o monte
>    no contêiner `cli`.
>
> Se não precisar da atualização automática dentro do contêiner, deixe o perfil `cli` desativado
> (`COMPOSE_PROFILES=core,redis` ou uma configuração mais curta). Os outros perfis não
> montam o socket do Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) para ver o modelo de ameaças relacionado
> a MITM e `docs/security/SUPPLY_CHAIN.md` para consultar a
> cadeia de proveniência dos binários `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar do Redis

O OmniRoute depende do Redis para dar suporte ao limitador de taxa distribuído e ao cache compartilhado. O serviço `redis` é **sempre definido** no `docker-compose.yml` (ele não é condicionado por nenhum perfil) e é iniciado junto com qualquer outro perfil.

| Detalhe                      | Valor                                   |
| ---------------------------- | --------------------------------------- |
| Imagem                       | `redis:7-alpine`                        |
| Nome do contêiner            | `omniroute-redis`                       |
| Porta interna                | `6379`                                  |
| Porta do host (substituível) | `REDIS_PORT` (padrão: `6379`)           |
| Bind do host (substituível)  | `REDIS_BIND_HOST` (padrão: `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`        |
| Verificação de integridade   | `redis-cli ping` (intervalo de 10s)     |

Variáveis de ambiente relacionadas:

- `REDIS_URL` — string de conexão injetada na aplicação (`redis://redis:6379` por padrão).
- `REDIS_PORT` — mapeamento da porta do host para o contêiner do Redis.
- `REDIS_BIND_HOST` — interface do host na qual a porta é publicada. O padrão é `127.0.0.1`.

> **Por que usar loopback por padrão:** o sidecar é executado sem `requirepass`, e os
> contêineres da aplicação o acessam pela rede do compose (`redis:6379`) — a porta publicada
> existe apenas para ferramentas executadas no host (`redis-cli`, um `npm run dev` local). Publicá-la em
> `0.0.0.0` exporia um Redis sem autenticação a todos os hosts da sua LAN. Se você definir
> `REDIS_BIND_HOST=0.0.0.0`, adicione também `--requirepass` ao `command:` do serviço.

**Desabilitar o Redis** não é recomendado (o limitador de taxa usará o fallback em memória, com funcionalidade reduzida). Se for necessário, remova/comente o bloco do serviço `redis:` no `docker-compose.yml` ou reduza sua escala para zero:

```bash
docker compose up -d --scale redis=0
```

## Compose de produção

Para executar um snapshot isolado de produção em paralelo com o ambiente de desenvolvimento, use `docker-compose.prod.yml`.

| Detalhe                     | Valor                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| Arquivo                     | `docker-compose.prod.yml`                                                                       |
| Porta padrão do dashboard   | `PROD_DASHBOARD_PORT=20130` (mapeada para a porta interna `${DASHBOARD_PORT:-20128}`)           |
| Porta padrão da API         | `PROD_API_PORT=20131`                                                                           |
| Imagem                      | `omniroute:prod` (criada a partir do target `runner-cli`)                                       |
| Contêiner do Redis          | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicado `redis-prod-data`)                       |
| Volume de dados             | `omniroute-prod-data` (nomeado e persistente entre reconstruções)                               |
| Verificações de integridade | `node healthcheck.mjs` + `redis-cli ping`, com `depends_on` condicionado à integridade do Redis |

Como usar:

```bash
# Crie e inicie a stack de produção
docker compose -f docker-compose.prod.yml up -d --build

# Acompanhe os logs em tempo real
docker compose -f docker-compose.prod.yml logs -f

# Encerre a stack (mantendo os volumes)
docker compose -f docker-compose.prod.yml down
```

A stack de produção é executada em paralelo com o compose de desenvolvimento (com nomes de contêineres, portas e volumes diferentes), portanto, você pode continuar trabalhando localmente enquanto a produção permanece em execução.

## Estágios do Dockerfile

O repositório inclui um Dockerfile multiestágio (`Dockerfile`). Três estágios são disponibilizados; escolha o `target` adequado para seu caso de uso.

| Estágio       | Imagem base           | Finalidade                                                                                                                                                                              |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala as dependências (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por padrão — consulte Recursos de build abaixo)                                              |
| `runner-base` | `node:26-trixie-slim` | Ambiente de execução de produção com a saída standalone do Next.js. **Nenhuma CLI de provedor incluída.**                                                                               |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e as CLIs globais: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Escolha este para fluxos de trabalho agênticos.** |

Faça o build de um target específico manualmente:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Recursos de build

Três argumentos de build controlam o custo do estágio `builder`. Eles se aplicam somente ao build —
`OMNIROUTE_MEMORY_MB` (abaixo) é um controle separado para o ambiente de execução.

| Argumento de build          | Padrão | Efeito                                                                                            |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` faz o build com webpack. Menor pico de memória, porém mais lento.                             |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Limite de heap do V8 (`--max-old-space-size`) para o `next build` iniciado.                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Alimenta `CIRCLE_NODE_TOTAL`; o Next deriva `workers = N - 1` para a coleta de dados das páginas. |

`OMNIROUTE_BUILD_WORKERS` é o valor que deve ser aumentado em um builder de grande porte e o que deve
ser investigado quando um build com recursos limitados falha **depois de** `✓ Compiled successfully`. Cada
worker de dados de páginas é um processo próprio, assim como o próprio processo pai `next build`;
uma reprodução em uma VPS ativa (issue #7518) mediu o pico de RSS de cada processo em
~4,5 GB, independentemente da flag de heap `NODE_OPTIONS` (o Turbopack compila usando
memória nativa/Rust fora do heap do V8). O padrão de `2` (→ 1 worker, 2
processos no total) foi dimensionado para os runners hospedados pelo GitHub com 16 GB / 4 vCPUs que o
pipeline de publicação utiliza. Com `8` (→ 7 workers), esse runner ficou sem memória, e o
buildkit falhou na etapa com `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) ainda não coube depois que o RSS por processo foi medido
diretamente, em vez de inferido. `tests/unit/docker-build-memory-budget.test.ts`
faz os cálculos usando o valor medido e falha se qualquer um dos controles
exceder a capacidade do runner.

O Turbopack compila usando memória nativa do Rust que fica **fora** do heap do V8, portanto
`OMNIROUTE_BUILD_MEMORY_MB` não a limita. Em um host com limite de memória, o
build é então encerrado com SIGKILL pelo OOM killer sem qualquer texto de erro — ele simplesmente
para no meio de `Creating an optimized production build`, o que parece ser um travamento, e não
falta de memória. Se o host de build tiver recursos limitados, troque o bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` está habilitado, portanto `next build` executa um processo pai **e** um processo
worker, e cada um respeita `OMNIROUTE_BUILD_MEMORY_MB` separadamente. Dimensione o limite do contêiner
para aproximadamente mais que o dobro desse valor, não apenas uma vez.

Medições nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limite do contêiner | Resultado                             |
| --------- | ------------------- | ------------------------------------- |
| Turbopack | 8 GiB / 16 GiB      | Encerrado por OOM em ambos, sem aviso |
| webpack   | 8 GiB               | Worker de build encerrado com SIGKILL |
| webpack   | 12 GiB              | Bem-sucedido, com pico de 11,1 GiB    |

### Padrões do ambiente de execução

Valores padrão exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória no Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` desse valor.
- O processo real do servidor é iniciado pelo launcher standalone, que lê `OMNIROUTE_MEMORY_MB` e acrescenta `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O Node usa o último valor repetido de `--max-old-space-size`; portanto, definir `OMNIROUTE_MEMORY_MB` controla o limite efetivo do heap no Docker.
- Como a imagem sempre o define, o fallback do próprio launcher, calibrado com base na RAM, nunca é aplicado no Docker. Aumente-o explicitamente para a carga de trabalho (tabela abaixo). `2048` ainda é insuficiente para `/v1/responses` de agentes de programação.

### RAM em tempo de execução para agentes de programação

O padrão de 1 GiB no Docker é o mínimo para o dashboard ou chats leves, não uma configuração de produção. Corpos longos de `POST /v1/responses` (centenas de mensagens, dezenas de ferramentas) mantêm vários grafos na memória durante a compactação. Duas solicitações simultâneas de ~3 MiB / ~750 mil tokens fizeram o V8 abortar com um old-space de **12 GiB** (`FATAL ERROR: Reached heap limit`) e também atingiram o OOM de um cgroup de 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensione o **`--memory` do cgroup acima do heap** — buffers nativos, SQLite e dados intermediários de compactação ficam fora do V8.

| Carga de trabalho                            | `OMNIROUTE_MEMORY_MB`        | Contêiner / cgroup    | Observações                                                                                             |
| -------------------------------------------- | ---------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| Painel, um chat leve                         | `1024` (padrão da imagem)    | ≥2 GiB                |                                                                                                         |
| Um agente de programação (Claude/Codex/Grok) | `8192`                       | ≥10 GiB               | Sessão única típica de `/v1/responses`                                                                  |
| Duas `/v1/responses` longas simultâneas      | `10240`–`12288`              | ≥12–16 GiB            | Encerramento do V8 observado com heap de ~12 GiB                                                        |
| Três ou mais contextos longos simultâneos    | não use em um único processo | serializar / mais RAM | A admissão padrão para cargas pesadas é de 1 em andamento; aumentá-la sem RAM reintroduz o encerramento |

Quando `OMNIROUTE_MEMORY_MB` **não está definida**, o `omniroute serve` em bare metal calibra aproximadamente 35% da RAM (limitado a `[512, 4096]`). O Docker sempre define `1024`, portanto essa calibração nunca é executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variáveis de Ambiente Críticas

Além dos valores padrão documentados em [ENVIRONMENT.md](../reference/ENVIRONMENT.md), as seguintes variáveis são as mais importantes ao executar no Docker:

| Variável                      | Finalidade                                                                                                                                                                                                                                                    | Padrão                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segredo compartilhado para a ponte WebSocket. **Obrigatório em produção** — defina-o como uma string aleatória forte.                                                                                                                                         | não definido (deve ser fornecido) |
| `REDIS_URL`                   | String de conexão para o backend do limitador de taxa/cache                                                                                                                                                                                                   | `redis://redis:6379`              |
| `REDIS_PORT`                  | Porta no host para o contêiner Redis incluído                                                                                                                                                                                                                 | `6379`                            |
| `REDIS_BIND_HOST`             | Interface do host na qual a porta do Redis incluído é publicada (loopback, a menos que você adicione AUTH)                                                                                                                                                    | `127.0.0.1`                       |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Caminho no host montado no perfil `cli` em `/workspace/omniroute` para fluxos de trabalho de atualização automática                                                                                                                                           | `.` (diretório atual)             |
| `OMNIROUTE_MEMORY_MB`         | Limite de heap do Node em tempo de execução para o servidor Docker autônomo; substitui o padrão da imagem mencionado acima. Agentes de programação: `8192`+ (consulte [RAM em tempo de execução](#runtime-ram-for-coding-agents)).                            | `1024`                            |
| `DASHBOARD_PORT` / `API_PORT` | Sobrescreve as portas expostas do painel (20128) e da API (20129)                                                                                                                                                                                             | `20128` / `20129`                 |
| `APP_BIND_HOST`               | Interface do host na qual o docker-compose publica as portas do painel/API/WS ao vivo. Com `REQUIRE_API_KEY=false` (o padrão), `0.0.0.0` expõe o proxy `/v1` anônimo à LAN — amplie o acesso somente com `REQUIRE_API_KEY=true` ou um proxy reverso à frente. | `127.0.0.1`                       |
| `CLIPROXY_BIND_HOST`          | Interface do host na qual o docker-compose publica o sidecar `cliproxyapi` — seu volume de dados armazena as credenciais dos provedores.                                                                                                                      | `127.0.0.1`                       |
| `OMNIROUTE_PLUGINS_DIR`       | Diretório que o scanner de plugins em tempo de execução lê e no qual instala. Defina-o quando os plugins forem montados via bind mount: o padrão segue `HOME`, que uma imagem não precisa exportar.                                                           | `~/.omniroute/plugins`            |
| `OMNIROUTE_BASE_PATH`         | Subcaminho da URL quando o aplicativo é publicado atrás de um proxy reverso (por exemplo, `/omniroute`)                                                                                                                                                       | _(vazio = raiz)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Origem pública do navegador incluindo o subcaminho (por exemplo, `https://host/omniroute`)                                                                                                                                                                    | não definido                      |
| `PROD_DASHBOARD_PORT`         | Porta do painel no host para `docker-compose.prod.yml`                                                                                                                                                                                                        | `20130`                           |
| `CLIPROXYAPI_PORT`            | Porta no host para o sidecar `cliproxyapi`                                                                                                                                                                                                                    | `8317`                            |

## Proxy reverso em um subcaminho (Traefik / nginx)

O `basePath` do Next.js é compilado no bundle standalone. O OmniRoute registra o valor
incorporado em um arquivo sentinela na raiz do aplicativo (gravado durante `npm run build`;
lido por `scripts/docker/ensure-docker-base-path.mjs`) e o compara com
`OMNIROUTE_BASE_PATH` quando o contêiner é iniciado. Quando eles são diferentes e a imagem
foi criada para a raiz do domínio, o entrypoint reescreve os manifestos standalone, os
literais `basePath`/`assetPrefix` incorporados (o Next 16 renderiza URLs de assets SSR
apenas a partir de `assetPrefix` — o patcher replica o subcaminho nele), as URLs de assets
`/_next/static` incorporadas (manifestos de referência do cliente, importações de mídia,
páginas de erro pré-renderizadas) e o shim de `process.env` do cliente antes da execução de
`node dev/run-standalone.mjs`.

### Build com Compose (recomendado)

Defina ambas as variáveis em `.env` e, em seguida, refaça o build para que a imagem e o
ambiente de execução estejam de acordo:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` encaminha `OMNIROUTE_BASE_PATH` como argumento de build do Docker e
como variável de ambiente em tempo de execução.

### Imagem raiz pré-compilada + subcaminho em tempo de execução

As imagens publicadas `diegosouzapw/omniroute:*` são compiladas para a raiz do domínio.
Ainda é possível definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contêiner aplica
o patch ao bundle uma vez durante a inicialização. Use-o com a origem pública
correspondente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure o proxy reverso para encaminhar o caminho externo **completo** (não remova o
prefixo). O Traefik deve rotear `PathPrefix(`/omniroute`)` para o contêiner sem
`StripPrefix`, para que o Next.js receba `/omniroute/...` e forneça assets a partir de
`/omniroute/_next/...`.

O healthcheck do Docker consulta o endpoint leve de ciclo de vida `/healthz`, prefixado
com o `OMNIROUTE_BASE_PATH` ativo. `/api/monitoring/health` continua disponível para
diagnósticos feitos por pessoas ou dashboards; para fazer o HEALTHCHECK do contêiner
voltar a usá-lo (por exemplo, para uma verificação aprofundada de integridade), defina
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho executa uma verificação
**aprofundada** (banco de dados + resumo do monitoramento) — apropriada para o
`HEALTHCHECK` pouco frequente do Docker, caso você opte por reativá-la, mas **não** para
intervalos de `livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad etc.):

| Sonda                  | Prefira                                                              | Evite                                                         |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- |
| Vivacidade             | HTTP `GET /livez` ou TCP na porta principal (`PORT`, padrão `20128`) | `/api/monitoring/health` como verificação de vivacidade       |
| Prontidão              | HTTP `GET /healthz`                                                  | Timeouts curtos que tratem um event loop ocupado como inativo |
| Aprofundada / blackbox | `/api/monitoring/health`                                             | —                                                             |

`/healthz` informa o ciclo de vida do processo (`ok` / `starting` / `stopping`). `/livez`
verifica apenas se o processo está ativo (200 sempre que o handler puder ser executado;
ele não aguarda a prontidão). Ambos ainda são executados no mesmo event loop do Node
usado para processar requisições, portanto, trabalhos de catálogo ou compactação que
consomem muita CPU podem atrasá-los — ocupado ≠ inativo. Prefira a verificação de
vivacidade via TCP se as sondas HTTP atingirem o timeout. Orientações completas sobre
sondas:
[Guia de monitoramento — recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose com Caddy (HTTPS Auto-TLS)

O OmniRoute pode ser exposto com segurança usando o provisionamento automático de SSL do Caddy. Certifique-se de que o registro A de DNS do seu domínio aponte para o IP do seu servidor.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origem voltada ao navegador para callbacks OAuth, links do painel e URLs públicas geradas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna de servidor para servidor para tarefas agendadas / autorrequisições.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

O Caddy define os cabeçalhos de encaminhamento padrão para o contêiner upstream. O OmniRoute usa
`NEXT_PUBLIC_BASE_URL` como a origem pública canônica para callbacks OAuth e links públicos
gerados; as gravações autenticadas do painel usam requisições da mesma origem juntamente com proteção CSRF
vinculada à sessão. Habilite `OMNIROUTE_TRUST_PROXY` apenas em implantações avançadas nas quais você deseja intencionalmente
que o OmniRoute derive a origem pública de cabeçalhos encaminhados confiáveis em vez de uma configuração
explícita.

## Cloudflare Quick Tunnel

O suporte do painel para implantações com Docker inclui um **Cloudflare Quick Tunnel** de um clique em `Dashboard → Endpoints`. Na primeira ativação, o `cloudflared` é baixado somente quando necessário, um túnel temporário é iniciado para o endpoint `/v1` atual e a URL `https://*.trycloudflare.com/v1` gerada é exibida diretamente abaixo da sua URL pública normal.

Os painéis de túneis de endpoint (Cloudflare, Tailscale, ngrok) podem ser exibidos ou ocultados em `Settings → Appearance` sem alterar o estado do túnel ativo.

### Observações sobre túneis

- As URLs do Quick Tunnel são temporárias e mudam após cada reinicialização.
- Os Quick Tunnels não são restaurados automaticamente após a reinicialização do OmniRoute ou do contêiner. Reative-os no painel quando necessário.
- Atualmente, a instalação gerenciada é compatível com Linux, macOS e Windows em `x64` / `arm64`.
- Por padrão, os Quick Tunnels gerenciados usam transporte HTTP/2 para evitar avisos ruidosos sobre o buffer UDP do QUIC em ambientes de contêiner com recursos limitados. Defina `CLOUDFLARED_PROTOCOL=quic` ou `auto` caso queira usar outro transporte.
- As imagens Docker incluem raízes de CA do sistema e as fornecem ao `cloudflared` gerenciado, o que evita falhas de confiança TLS quando o túnel é inicializado dentro do contêiner.
- Defina `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` caso queira que o OmniRoute use um binário existente em vez de baixar um.

## Tags de imagem

| Imagem                   | Tag      | Tamanho | Descrição                                                |
| ------------------------ | -------- | ------- | -------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Maior SemVer estável **publicada** (não o `main` do git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fixe esta categoria de tag para GitOps                   |

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). O Docker seleciona automaticamente a arquitetura correspondente; passe `--platform linux/amd64` caso precise forçar a emulação de AMD64 em hosts ARM.

### Canais de lançamento

O OmniRoute publica canais Docker separados para versões estáveis, testes da ramificação de lançamento ativa e compilações de desenvolvimento.

| Canal                           | Origem                                | Mutabilidade                        | Uso recomendado                                                                                                                      |
| ------------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Versão assinada/versionada            | Imutável                            | Implantações em produção que fixam uma versão exata                                                                                  |
| `:latest` / `:latest-web`       | Maior SemVer estável **publicada**    | Ponteiro estável mutável            | Acompanha versões estáveis **após** uma tarefa de publicação SemVer — **não** acompanha `main` nem commits `release/v*` não lançados |
| `:next` / `:next-web`           | Ramificação `release/v*` padrão atual | Ponteiro de pré-lançamento mutável  | Teste de correções que chegaram à ramificação de lançamento ativa, mas que ainda não estão em uma versão estável                     |
| `:main` / `:main-web`           | Ramificação `main`                    | Ponteiro de desenvolvimento mutável | Apenas desenvolvimento e testes de integração                                                                                        |

#### Como usar o canal de pré-lançamento

O canal `next` é recompilado a cada push para a ramificação `release/v*` padrão atual e é publicado para AMD64 e ARM64. Ramificações de manutenção mais antigas não podem sobrescrevê-lo. O canal fornece uma imagem que pode ser baixada com pull contendo correções que foram integradas à ramificação de lançamento ativa antes da criação da próxima tag estável.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

No Docker Compose, substitua a tag da imagem usada pelo perfil selecionado e, em seguida, baixe e recrie o serviço:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Segurança e reversão

`next` é um canal de pré-lançamento flutuante. Ele pode mudar a cada push para a ramificação de lançamento ativa e **não é compatível com uso em produção**. Fixe o digest da imagem ao avaliar uma compilação específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça backup do volume de dados do OmniRoute ou do diretório de dados montado por bind. Para reverter, restaure a versão estável ou o digest usado anteriormente e recrie o contêiner:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Uma compilação de uma branch de release nunca pode mover `latest`; somente uma versão semântica estável elegível pode promover o ponteiro estável. As imagens `next` mantêm a inspeção da imagem de release e o bloqueio em caso de vulnerabilidades CRITICAL.

**`latest` não é uma garantia de atualidade em relação ao git.** Correções mescladas em `main` ou na branch `release/v*` ativa **não** estão em `:latest` até que uma imagem SemVer estável seja publicada e o job de publicação promova `:latest` (com o mesmo digest dessa SemVer). Se `latest` parecer congelada enquanto o GitHub já mostra a correção, baixe `:next` para testar a branch de release ou aguarde a tag SemVer.

| O que você deseja                                                             | Use                                   |
| ----------------------------------------------------------------------------- | ------------------------------------- |
| GitOps / produção que não pode sofrer alterações inesperadas                  | Fixe `:X.Y.Z` (ou o digest da imagem) |
| Acompanhar versões estáveis publicadas e aceitar uma recriação a cada release | `:latest`                             |
| Testar commits não lançados de `release/v*`                                   | `:next` (não usar em produção)        |
| Testar `main`                                                                 | `:main` (não usar em produção)        |

## Disponibilidade: o SQLite padrão tem uma única réplica

A implantação padrão do OmniRoute em Docker / Kubernetes consiste em **um processo Node + um gravador SQLite**. Alta disponibilidade **não é suportada** nessa topologia.

| Restrição                                                   | Consequência                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gravador único                                              | **Não** execute várias réplicas usando o mesmo arquivo SQLite. Isso corrompe o banco de dados.                                                                                                                                                                                                                                                                                |
| Recriação / reinicialização / encerramento pelo HEALTHCHECK | **Indisponibilidade total** de conexões SSE em andamento, sessões do painel e estado em memória. Todos os clientes conectados são desconectados. Novas solicitações durante o período sem endpoints recebem do proxy reverso **`502 Bad Gateway: Unknown error`**, e não um JSON do OmniRoute — os clientes não conseguem diferenciar isso de uma falha do provedor (#11015). |
| Mesmo loop de eventos que `/healthz`                        | Um ciclo intenso de catálogo ou compactação pode atrasar as sondagens; um timeout curto reinicia então a **única** réplica.                                                                                                                                                                                                                                                   |

**Matriz de sondagens** (consulte também [recomendações de sondagens do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sondagem           | Destino                                                       | Não use                                                            |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| Atividade          | TCP em `PORT` (padrão `20128`) ou HTTP flexível em `/healthz` | `/api/monitoring/health`                                           |
| Prontidão          | HTTP `GET /healthz`                                           | Timeouts curtos que tratam um loop de eventos ocupado como inativo |
| Profunda / humanos | `/api/monitoring/health`                                      | Sondagem de atividade automatizada do kubelet                      |

**Atualizações:** espere que todas as sessões sejam desconectadas. Drene os clientes se puder; não há atualização contínua com o SQLite padrão. O `restart: unless-stopped` do Compose combinado com o `HEALTHCHECK` do Docker também substituirá o único processo quando o contêiner estiver não saudável — com o mesmo raio de impacto.

Trecho do Kubernetes para uma **única réplica** (Recreate é obrigatório; não aumente `replicas` usando um único arquivo SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

A espera de `preStop` permite que o kube remova os endpoints do Service antes do SIGTERM, para que o tráfego **novo** deixe de atingir o processo que está sendo encerrado. O SSE de `/v1/responses` em andamento é drenado por até `SHUTDOWN_TIMEOUT_MS` (30s por padrão) por meio de leases de admissão de alto custo (#11015). Novas solicitações que ainda chegam ao processo recebem `503` + `Retry-After: 5`. O intervalo do Recreate sem endpoints até que a substituição esteja pronta continua sendo uma indisponibilidade total — isso é consequência da topologia SQLite, não de uma configuração incorreta das sondagens.

Postgres externo / HA com vários gravadores **não** é um caminho padrão documentado. Se você precisar de HA, mantenha uma única réplica ou execute uma topologia que o projeto tenha testado e documentado separadamente. O trabalho relacionado a Postgres/MySQL está em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Até que isso seja disponibilizado, a única maneira suportada de multiplicar a capacidade de `/v1/responses` **grandes** é usar N processos independentes (próxima seção), e não `replicas > 1` em um único volume.

## Escala horizontal: N processos independentes

Um processo Node corresponde a **um heap V8**. Duas solicitações simultâneas de agente de codificação `POST /v1/responses` (RTK + Caveman), cada uma com ~3 MiB / ~750 mil tokens, fazem esse heap abortar em ~12 Gi (`FATAL ERROR: Reached heap limit`) e podem causar OOM em um cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Essa medição é um alerta de **orçamento de memória**, não um limite máximo do produto de duas solicitações longas `/v1/responses` simultâneas. A admissão de chats pesados é controlada por um orçamento de bytes de entrada derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionado a partir desse mesmo limite do V8/cgroup — aumentá-lo manualmente (ou definir o limite legado por contagem de solicitações `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) em um processo já dimensionado reintroduz o aborto. Chats pequenos, `/healthz`, `/v1/models` e MCP **não** estão incluídos nesse limite.

### Um processo: mais de duas solicitações longas `/v1/responses`

Um processo **saudável** (heap abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, padrão `0.75`) **pode** executar mais de duas solicitações longas `POST /v1/responses` simultâneas quando ainda houver espaço no orçamento de bytes em trânsito de todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Corpos com tamanho igual ou superior a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (padrão de 256 KiB) adquirem a mesma concessão de recursos pesados que solicitações com estruturas complexas e usam o mesmo escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos simultâneos (os operadores frequentemente precisam de 40–50) são uma questão de **orçamento de memória** — dimensione o heap + slots primários/de margem saudável + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — e não um limite rígido do produto de “no máximo 2”. Um heap sob pressão ainda rejeita solicitações com um erro `503` que permite nova tentativa, evitando a recorrência de #7849.

Para **multiplicar os heaps** (old-spaces V8 independentes) **hoje**:

| Faça                                                                                                                                                                                       | Não faça                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Execute **N contêineres/pods**, cada um com seu **próprio** `DATA_DIR` / volume                                                                                                            | Defina `replicas > 1` apontando para um único arquivo SQLite         |
| Dimensione as solicitações pesadas em trânsito + a margem saudável com base no heap / orçamento de bytes em trânsito; 1–2 é o padrão conservador de #7849, não um limite rígido do produto | Forneça 8× mais RAM a um processo e um limite de contagem irrestrito |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para **contadores de cota compartilhados**                                                                                  | Trate o Redis como SQLite compartilhado — ele não é isso             |
| Duplique os segredos dos provedores em cada instância (ou aceite painéis particionados)                                                                                                    | Espere um único painel / registro de chamadas entre as instâncias    |
| Use qualquer balanceador de carga na frente; afinidade por chave de API ou sessão é suficiente                                                                                             | Exija um middleware específico de fornecedor sensível ao tamanho     |

Hardware: as solicitações longas `/v1/responses` simultâneas por instância são uma questão de **orçamento de memória** (heap + bytes em trânsito / #10110). `N` `DATA_DIR`s independentes ainda multiplicam os heaps: a RAM do host deve comportar `N × cgroup`, e não “um pod de 16 Gi com N=8”. Nunca use `replicas > 1` com um único arquivo SQLite.

Exemplo de Compose (dois heaps, dois volumes — não `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

A densidade dentro do processo (compressão fora do isolate HTTP) está em [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico em estado durável compartilhado está em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Observações Importantes

- **Modo WAL do SQLite:** Deve-se permitir que `docker stop` seja concluído para que o OmniRoute possa realizar o checkpoint das alterações mais recentes de volta para `storage.sqlite`. Os arquivos do Compose incluídos já definem um período de tolerância de 40s para a parada. Se você executar a imagem diretamente, mantenha `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Defina como `true` se os backups rotineiros/antes de gravações forem gerenciados externamente. As migrações de bancos de dados existentes ainda exigem um snapshot de segurança durável próprio e uma proteção contra migrações em massa.
- **Persistência de Dados:** Sempre monte um volume em `/app/data` para manter seu banco de dados, suas chaves e configurações entre reinicializações do contêiner.
- **Configuração de Porta:** Sobrescreva a variável de ambiente `PORT` para alterar a porta padrão `20128`.

## Veja Também

- [Guia de Implantação em VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuração de VM + nginx + Cloudflare
- [Guia de Implantação no Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implante no Fly.io
- [Configuração de Ambiente](../reference/ENVIRONMENT.md) — Referência completa do `.env`
