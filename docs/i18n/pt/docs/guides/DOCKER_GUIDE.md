# 🐳 Docker Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referência completa para a implementação com Docker. Para um início rápido, consulte a [secção sobre Docker no README](../README.md#-docker).

## Índice

- [Execução rápida](#quick-run)
- [Com ficheiro de ambiente](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Perfis disponíveis](#available-profiles)
- [Configurar ferramentas CLI do anfitrião quando o OmniRoute é executado no Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar Redis](#redis-sidecar)
- [Compose para produção](#production-compose)
- [Fases do Dockerfile](#dockerfile-stages)
- [Variáveis de ambiente críticas](#critical-environment-variables)
- [Docker Compose com Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Túnel rápido do Cloudflare](#cloudflare-quick-tunnel)
- [Etiquetas de imagem](#image-tags)
- [Disponibilidade: o SQLite predefinido suporta uma única réplica](#availability-default-sqlite-is-single-replica)
- [Notas importantes](#important-notes)

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

## Com ficheiro de ambiente

```bash
# Primeiro, copie e edite o ficheiro .env
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

# Perfil do anfitrião (orientado para Linux; monta os binários CLI do anfitrião em modo só de leitura)
docker compose --profile host up -d

# Combinar CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfis disponíveis

O OmniRoute inclui quatro perfis do Compose. Escolha o que corresponde ao seu ambiente.

| Perfil               | Serviço          | Quando utilizar                                                                                                                                                      | Comando                                      |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinido) | `omniroute-base` | Servidor sem interface gráfica / ambiente de execução mínimo, sem CLIs de fornecedores incluídas                                                                     | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Fluxos de trabalho com agentes que invocam `omniroute providers/setup/doctor` e as CLIs incluídas (Codex, Claude Code, Droid, OpenClaw)                              | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Anfitriões Linux que pretendam acesso semelhante a `network_mode` às CLIs do anfitrião, montando `~/.local/bin`, `~/.codex`, `~/.claude`, etc. em modo só de leitura | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Executar o sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porta `8317` para encaminhamento através de proxy para CLIs a montante             | `docker compose --profile cliproxyapi up -d` |

> É possível combinar vários perfis: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurar ferramentas CLI do anfitrião quando o OmniRoute é executado no Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e o botão
**Guardar configuração** do painel escrevem ficheiros como `~/.codex/*.config.toml`. Esses caminhos
só têm significado na máquina onde a CLI é efetivamente executada. Se os executar dentro
do contentor, a escrita é feita no diretório pessoal do próprio contentor (`/home/node` —
a imagem é executada com `USER node`), onde nenhuma CLI do anfitrião irá alguma vez lê-la e onde é
descartada assim que o contentor é recriado.

O OmniRoute deteta esta situação e recusa a escrita, apresentando instruções em vez de
comunicar um sucesso que não pode utilizar: a CLI termina com `2` e a API responde com `422`
e `containerEphemeralTarget: true`.

### Recomendado: executar a CLI no anfitrião e o OmniRoute no Docker

O contentor disponibiliza a API; a CLI configura as ferramentas do anfitrião.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # apontar a CLI para o contentor
omniroute setup-codex                      # escreve no verdadeiro ~/.codex do anfitrião
```

Esta é a escolha certa quando o Codex, Claude Code, Cursor ou ferramentas semelhantes são executados no seu
portátil — que é a configuração habitual.

### Alternativa: montar os diretórios de configuração do anfitrião através de bind mount (perfil `host`)

Se pretender que o próprio contentor escreva na configuração do anfitrião, monte os
diretórios no contentor e aponte `CLI_CONFIG_HOME` para a raiz da montagem. O perfil `host`
já faz isto:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

É o bind mount que torna o caminho fiável: o OmniRoute lê
`/proc/self/mountinfo` e permite escritas em caminhos montados (e em diretórios
cujos filhos são pontos de montagem, que corresponde exatamente à estrutura de `/host-home` acima), continuando
a recusar caminhos não montados.

### Alternativa de recurso: configurar as próprias CLIs do contentor (utilizar com moderação)

Quando as CLIs residem efetivamente dentro do contentor (o perfil `cli`), a escrita
é intencional. Passe `--allow-container-write` a qualquer comando `setup-*` ou defina
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para o servidor. A escrita é efetuada
com um aviso de que não persistirá após o fim do contentor.

> **Aviso de segurança — perfil `cli` + montagem de `docker.sock`.**
> O perfil `cli` monta `/var/run/docker.sock` através de bind mount para que o atualizador
> automático dentro do contentor possa recriar a stack através do daemon do anfitrião
> (`src/lib/system/autoUpdate.ts` verifica a existência desse socket e ignora o
> caminho do Docker quando este não está presente). Esse socket constitui **uma fronteira de
> confiança com acesso root ao anfitrião**: qualquer entidade que consiga aceder-lhe controla o daemon Docker do anfitrião como
> root — pode criar, inspecionar, parar e remover qualquer contentor no anfitrião.
> Implicações:
>
> 1. **Nunca exponha a porta do perfil `cli` à rede.** Publique-a
>    em `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — um perfil `cli` acessível pela LAN transforma qualquer RCE ao nível do painel
>    num comprometimento total do anfitrião.
> 2. **Não monte quaisquer diretórios adicionais do anfitrião no perfil `cli`.**
>    O socket do Docker, juntamente com qualquer montagem adicional, concede ao contentor acesso total de
>    leitura/escrita ao seu sistema de ficheiros e à configuração do anfitrião. Se precisar que uma ferramenta
>    aceda a um projeto, execute-a localmente com o binário da CLI — não o monte
>    no contentor `cli`.
>
> Se não precisar da atualização automática dentro do contentor, mantenha o perfil `cli` desativado
> (`COMPOSE_PROFILES=core,redis` ou uma variante mais curta). Os outros perfis não
> montam o socket do Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) para ver o modelo de ameaças relacionado
> com MITM e `docs/security/SUPPLY_CHAIN.md` para consultar a cadeia de proveniência dos binários
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

O OmniRoute utiliza o Redis como suporte para o limitador de taxa distribuído e para a cache partilhada. O serviço `redis` está **sempre definido** em `docker-compose.yml` (não está condicionado por nenhum perfil) e é iniciado juntamente com qualquer outro perfil.

| Detalhe                              | Valor                                         |
| ------------------------------------ | --------------------------------------------- |
| Imagem                               | `redis:7-alpine`                              |
| Nome do contentor                    | `omniroute-redis`                             |
| Porta interna                        | `6379`                                        |
| Porta do anfitrião (substituição)    | `REDIS_PORT` (predefinição: `6379`)           |
| Endereço do anfitrião (substituição) | `REDIS_BIND_HOST` (predefinição: `127.0.0.1`) |
| Volume                               | `omniroute-redis-data` → `/data`              |
| Verificação de estado                | `redis-cli ping` (intervalo de 10 s)          |

Variáveis de ambiente relacionadas:

- `REDIS_URL` — cadeia de ligação injetada na aplicação (`redis://redis:6379` por predefinição).
- `REDIS_PORT` — mapeamento da porta do anfitrião para o contentor Redis.
- `REDIS_BIND_HOST` — interface do anfitrião na qual a porta é publicada. A predefinição é `127.0.0.1`.

> **Porquê a interface de loopback por predefinição:** o sidecar é executado sem `requirepass`, e os contentores
> da aplicação acedem ao mesmo através da rede do Compose (`redis:6379`) — a porta publicada existe
> apenas para ferramentas no anfitrião (`redis-cli`, um `npm run dev` local). A publicação em
> `0.0.0.0` exporia um Redis sem autenticação a todos os anfitriões da sua LAN. Se definir
> `REDIS_BIND_HOST=0.0.0.0`, adicione também `--requirepass` ao `command:` do serviço.

**Desativar o Redis** não é recomendado (o limitador de taxa passará a utilizar o mecanismo de contingência em memória). Se for necessário, remova/comente o bloco do serviço `redis:` em `docker-compose.yml` ou reduza a respetiva escala para zero:

```bash
docker compose up -d --scale redis=0
```

## Compose de produção

Para obter um snapshot de produção isolado executado em paralelo com o ambiente de desenvolvimento, utilize `docker-compose.prod.yml`.

| Detalhe                     | Valor                                                                                         |
| --------------------------- | --------------------------------------------------------------------------------------------- |
| Ficheiro                    | `docker-compose.prod.yml`                                                                     |
| Porta predefinida do painel | `PROD_DASHBOARD_PORT=20130` (mapeada para a porta interna `${DASHBOARD_PORT:-20128}`)         |
| Porta predefinida da API    | `PROD_API_PORT=20131`                                                                         |
| Imagem                      | `omniroute:prod` (criada a partir do alvo `runner-cli`)                                       |
| Contentor Redis             | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicado `redis-prod-data`)                     |
| Volume de dados             | `omniroute-prod-data` (com nome, persistente entre reconstruções)                             |
| Verificações de estado      | `node healthcheck.mjs` + `redis-cli ping`, com `depends_on` condicionado pelo estado do Redis |

Como utilizar:

```bash
# Criar e iniciar a pilha de produção
docker compose -f docker-compose.prod.yml up -d --build

# Acompanhar os registos em tempo real
docker compose -f docker-compose.prod.yml logs -f

# Desativar a pilha (manter os volumes)
docker compose -f docker-compose.prod.yml down
```

A pilha de produção é executada em paralelo com o Compose de desenvolvimento (nomes de contentores, portas e volumes diferentes), pelo que pode continuar a iterar localmente enquanto a produção permanece em execução.

## Fases do Dockerfile

O repositório inclui um Dockerfile de várias fases (`Dockerfile`). São disponibilizadas três fases; escolha o `target` adequado ao seu caso de utilização.

| Fase          | Imagem base           | Finalidade                                                                                                                                                                                      |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala as dependências (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por predefinição — consulte Recursos de compilação abaixo)                                           |
| `runner-base` | `node:26-trixie-slim` | Ambiente de execução de produção com a saída autónoma do Next.js. **Não inclui CLIs de fornecedores.**                                                                                          |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e as CLIs globais: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Escolha esta opção para fluxos de trabalho com agentes.** |

Compile manualmente um `target` específico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Recursos de compilação

Três argumentos de compilação controlam os recursos utilizados pela fase `builder`. Aplicam-se apenas durante a compilação —
`OMNIROUTE_MEMORY_MB` (abaixo) é uma opção separada para o ambiente de execução.

| Argumento de compilação     | Predefinição | Efeito                                                                                                        |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`          | `0` efetua a compilação com webpack. Menor pico de memória, mas mais lento.                                   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Limite máximo da heap do V8 (`--max-old-space-size`) para o `next build` iniciado.                            |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Fornece o valor de `CIRCLE_NODE_TOTAL`; o Next deriva `workers = N - 1` para a recolha dos dados das páginas. |

`OMNIROUTE_BUILD_WORKERS` é o valor a aumentar num sistema de compilação de grande capacidade e o primeiro
a considerar quando uma compilação com recursos limitados termina **após** `✓ Compiled successfully`. Cada
worker de dados de páginas é um processo separado, tal como o próprio processo principal `next build`;
uma reprodução num VPS real (problema #7518) mediu o pico de RSS de cada processo em
~4,5 GB, independentemente da opção de heap `NODE_OPTIONS` (o Turbopack compila utilizando
memória nativa/Rust fora da heap do V8). A predefinição de `2` (→ 1 worker, 2
processos no total) foi dimensionada para os runners alojados no GitHub com 16 GB/4 vCPU que o
pipeline de publicação utiliza. Com `8` (→ 7 workers), esse runner ficou sem memória e
o buildkit fez com que a etapa falhasse com `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) continuou a não caber depois de o RSS por processo ter sido medido
diretamente em vez de inferido. `tests/unit/docker-build-memory-budget.test.ts`
efetua os cálculos com base no valor medido e falha se qualquer uma das opções
ultrapassar a capacidade do runner.

O Turbopack compila utilizando memória nativa do Rust que reside **fora** da heap do V8, pelo que
`OMNIROUTE_BUILD_MEMORY_MB` não a limita. Num anfitrião com um limite de memória, a
compilação é então terminada por SIGKILL pelo OOM killer sem qualquer texto de erro — simplesmente
para a meio de `Creating an optimized production build`, o que aparenta ser um bloqueio em vez
de falta de memória. Se o anfitrião de compilação tiver recursos limitados, mude de bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` está ativado, pelo que `next build` executa um processo principal **e** um
processo worker, sendo que cada um respeita `OMNIROUTE_BUILD_MEMORY_MB` separadamente. Defina o limite
do contentor para um valor superior a aproximadamente o dobro desse valor, não apenas uma vez esse valor.

Medições nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Limite do contentor | Resultado                                      |
| --------- | ------------------- | ---------------------------------------------- |
| Turbopack | 8 GiB/16 GiB        | Terminado por OOM em ambos, sem qualquer aviso |
| webpack   | 8 GiB               | Worker de compilação terminado por SIGKILL     |
| webpack   | 12 GiB              | Bem-sucedido, com um pico de 11,1 GiB          |

### Predefinições do ambiente de execução

Predefinições exportadas por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória no Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` a partir desse valor.
- O processo real do servidor é iniciado pelo launcher autónomo, que lê `OMNIROUTE_MEMORY_MB` e acrescenta `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O Node utiliza o último valor repetido de `--max-old-space-size`, pelo que a definição de `OMNIROUTE_MEMORY_MB` controla o limite efetivo da heap no Docker.
- Uma vez que a imagem define sempre este valor, a alternativa do próprio launcher, calibrada de acordo com a RAM, nunca é aplicada no Docker. Aumente-o explicitamente para a carga de trabalho (tabela abaixo). `2048` continua a ser insuficiente para `/v1/responses` de agentes de programação.

### RAM do ambiente de execução para agentes de programação

A predefinição de 1 GiB do Docker é um valor mínimo para o painel/conversações ligeiras, não uma configuração de produção. Corpos extensos de pedidos `POST /v1/responses` (centenas de mensagens, dezenas de ferramentas) mantêm vários grafos na memória durante a compressão. Dois pedidos sobrepostos de ~3 MiB/~750 mil tokens fizeram o V8 abortar com um old-space de **12 GiB** (`FATAL ERROR: Reached heap limit`) e também atingiram um OOM de cgroup de 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Defina a **`--memory` do cgroup acima da heap** — os buffers nativos, o SQLite e os elementos intermédios da compressão residem fora do V8.

| Carga de trabalho                            | `OMNIROUTE_MEMORY_MB`           | Contentor / cgroup    | Notas                                                                                                                            |
| -------------------------------------------- | ------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard, um chat ligeiro                   | `1024` (predefinição da imagem) | ≥2 GiB                |                                                                                                                                  |
| Um agente de programação (Claude/Codex/Grok) | `8192`                          | ≥10 GiB               | Sessão única típica de `/v1/responses`                                                                                           |
| Duas `/v1/responses` longas em simultâneo    | `10240`–`12288`                 | ≥12–16 GiB            | Interrupção do V8 observada com um heap de ~12 GiB                                                                               |
| Três ou mais contextos longos em simultâneo  | não executar num único processo | serializar / mais RAM | Por predefinição, a admissão de cargas pesadas permite 1 pedido em curso; aumentá-la sem mais RAM volta a provocar a interrupção |

Quando `OMNIROUTE_MEMORY_MB` **não está definida**, `omniroute serve` em hardware físico calibra ~35% da RAM (limitado a `[512, 4096]`). O Docker define sempre `1024`, pelo que essa calibração nunca é executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variáveis de Ambiente Críticas

Para além dos valores predefinidos documentados em [ENVIRONMENT.md](../reference/ENVIRONMENT.md), as seguintes variáveis são as mais importantes ao executar em Docker:

| Variável                      | Finalidade                                                                                                                                                                                                                                                                         | Predefinição                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segredo partilhado para a ponte WebSocket. **Obrigatório em produção** — defina uma cadeia aleatória forte.                                                                                                                                                                        | não definido (tem de ser fornecido) |
| `REDIS_URL`                   | Cadeia de ligação para o limitador de taxa/backend de cache                                                                                                                                                                                                                        | `redis://redis:6379`                |
| `REDIS_PORT`                  | Porta do anfitrião para o contentor Redis incluído                                                                                                                                                                                                                                 | `6379`                              |
| `REDIS_BIND_HOST`             | Interface do anfitrião na qual é publicada a porta do Redis incluído (loopback, a menos que adicione AUTH)                                                                                                                                                                         | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Caminho do anfitrião montado no perfil `cli` em `/workspace/omniroute` para fluxos de trabalho de autoatualização                                                                                                                                                                  | `.` (diretório atual)               |
| `OMNIROUTE_MEMORY_MB`         | Limite máximo da heap do Node em tempo de execução para o servidor Docker autónomo; substitui a predefinição da imagem acima. Agentes de programação: `8192`+ (consulte [RAM em tempo de execução](#runtime-ram-for-coding-agents)).                                               | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Substitui as portas expostas do painel (20128) e da API (20129)                                                                                                                                                                                                                    | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interface do anfitrião na qual o docker-compose publica as portas do painel/API/WS em tempo real. Com `REQUIRE_API_KEY=false` (a predefinição), `0.0.0.0` expõe o proxy `/v1` anónimo à LAN — alargue o acesso apenas com `REQUIRE_API_KEY=true` ou com um proxy inverso à frente. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interface do anfitrião na qual o docker-compose publica o contentor auxiliar `cliproxyapi` — o respetivo volume de dados contém as credenciais dos fornecedores.                                                                                                                   | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Diretório que o analisador de plugins em tempo de execução lê e no qual instala. Defina-o quando os plugins forem montados por associação: a predefinição segue `HOME`, que uma imagem poderá não exportar.                                                                        | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Subcaminho do URL quando a aplicação é publicada atrás de um proxy inverso (por exemplo, `/omniroute`)                                                                                                                                                                             | _(vazio = raiz)_                    |
| `NEXT_PUBLIC_BASE_URL`        | Origem pública do navegador, incluindo o subcaminho (por exemplo, `https://host/omniroute`)                                                                                                                                                                                        | não definido                        |
| `PROD_DASHBOARD_PORT`         | Porta do painel no anfitrião para `docker-compose.prod.yml`                                                                                                                                                                                                                        | `20130`                             |
| `CLIPROXYAPI_PORT`            | Porta do anfitrião para o contentor auxiliar `cliproxyapi`                                                                                                                                                                                                                         | `8317`                              |

## Proxy inverso num subcaminho (Traefik / nginx)

O `basePath` do Next.js é compilado no bundle autónomo. O OmniRoute regista o valor
incorporado num ficheiro sentinela na raiz da aplicação (escrito durante `npm run build`;
lido por `scripts/docker/ensure-docker-base-path.mjs`) e compara-o com
`OMNIROUTE_BASE_PATH` quando o contentor é iniciado. Quando são diferentes e a imagem
foi criada para a raiz do domínio, o entrypoint reescreve os manifestos autónomos, os
literais `basePath`/`assetPrefix` incorporados (o Next 16 renderiza os URLs dos recursos
SSR apenas a partir de `assetPrefix` — o patcher replica o subcaminho nesse valor), os
URLs dos recursos `/_next/static` incorporados (manifestos de referências do cliente,
importações de multimédia, páginas de erro pré-renderizadas) e o shim de
`process.env` do cliente antes de `node dev/run-standalone.mjs` ser executado.

### Compilação com o Compose (recomendado)

Defina ambas as variáveis em `.env` e, em seguida, volte a compilar para que a imagem e
o ambiente de execução fiquem em conformidade:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

O `docker-compose.yml` encaminha `OMNIROUTE_BASE_PATH` como argumento de compilação do
Docker e como variável de ambiente em tempo de execução.

### Imagem de raiz pré-compilada + subcaminho em tempo de execução

As imagens publicadas `diegosouzapw/omniroute:*` são compiladas para a raiz do domínio.
Ainda assim, pode definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contentor aplica
o patch ao bundle uma vez durante o arranque. Combine-o com a origem pública
correspondente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure o proxy inverso para encaminhar o caminho externo **completo** (não remova o
prefixo). O Traefik deve encaminhar `PathPrefix(`/omniroute`)` para o contentor sem
`StripPrefix`, para que o Next.js receba `/omniroute/...` e sirva os recursos a partir de
`/omniroute/_next/...`.

O healthcheck do Docker consulta o endpoint de ciclo de vida simplificado `/healthz`,
prefixado com o `OMNIROUTE_BASE_PATH` ativo. `/api/monitoring/health` continua disponível
para diagnósticos realizados por pessoas ou dashboards; para voltar a direcionar o
HEALTHCHECK do contentor para esse endpoint (por exemplo, para impor uma verificação
aprofundada do estado), defina
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho é uma verificação
**aprofundada** (BD + resumo da monitorização) — adequada para o `HEALTHCHECK` pouco
frequente do Docker caso opte por voltar a utilizá-la, mas **não** para os intervalos de
`livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad, etc.):

| Sonda                 | Preferir                                                                   | Evitar                                                             |
| --------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Atividade             | HTTP `GET /livez` ou TCP na porta principal (`PORT`, predefinição `20128`) | `/api/monitoring/health` como verificação de atividade             |
| Disponibilidade       | HTTP `GET /healthz`                                                        | Timeouts curtos que interpretem um event loop ocupado como inativo |
| Aprofundada / externa | `/api/monitoring/health`                                                   | —                                                                  |

`/healthz` comunica o ciclo de vida do processo (`ok` / `starting` / `stopping`).
`/livez` verifica apenas se o processo está ativo (200 sempre que o handler consegue
ser executado; não aguarda que esteja disponível). Ambos continuam a ser executados no
mesmo event loop do Node que processa os pedidos, pelo que operações de catálogo ou
compressão dependentes da CPU podem atrasá-los — ocupado ≠ inativo. Prefira uma
verificação de atividade por TCP se as sondas HTTP atingirem o tempo limite. Orientações
completas sobre sondas:
[Guia de monitorização — recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose com Caddy (HTTPS Auto-TLS)

O OmniRoute pode ser disponibilizado de forma segura através do aprovisionamento automático de SSL do Caddy. Certifique-se de que o registo A de DNS do seu domínio aponta para o endereço IP do seu servidor.

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
      # Origem apresentada ao navegador para callbacks OAuth, ligações do painel e URLs públicas geradas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna entre servidores para tarefas agendadas / pedidos a si próprio.
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

O Caddy define os cabeçalhos de reencaminhamento padrão para o contentor a montante. O OmniRoute utiliza
`NEXT_PUBLIC_BASE_URL` como origem pública canónica para callbacks OAuth e ligações públicas
geradas; as escritas autenticadas no painel utilizam pedidos da mesma origem e proteção CSRF
associada à sessão. Ative `OMNIROUTE_TRUST_PROXY` apenas em implementações avançadas nas quais pretenda
que o OmniRoute determine a origem pública a partir de cabeçalhos reencaminhados fidedignos, em vez de uma
configuração explícita.

## Cloudflare Quick Tunnel

O suporte do painel para implementações Docker inclui um **Cloudflare Quick Tunnel** de ativação com um clique em `Dashboard → Endpoints`. Na primeira ativação, transfere o `cloudflared` apenas quando necessário, inicia um túnel temporário para o seu endpoint `/v1` atual e apresenta o URL `https://*.trycloudflare.com/v1` gerado diretamente abaixo do seu URL público normal.

Os painéis de túneis de endpoints (Cloudflare, Tailscale, ngrok) podem ser apresentados ou ocultados em `Settings → Appearance` sem alterar o estado ativo dos túneis.

### Notas sobre túneis

- Os URLs do Quick Tunnel são temporários e mudam após cada reinício.
- Os Quick Tunnels não são restaurados automaticamente após um reinício do OmniRoute ou do contentor. Reative-os a partir do painel quando necessário.
- A instalação gerida suporta atualmente Linux, macOS e Windows em `x64` / `arm64`.
- Por predefinição, os Quick Tunnels geridos utilizam o transporte HTTP/2 para evitar avisos ruidosos relativos ao buffer UDP do QUIC em ambientes de contentores com recursos limitados. Defina `CLOUDFLARED_PROTOCOL=quic` ou `auto` se pretender um transporte diferente.
- As imagens Docker incluem certificados de raiz de AC do sistema e disponibilizam-nos ao `cloudflared` gerido, evitando falhas de confiança TLS quando o túnel é inicializado dentro do contentor.
- Defina `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` se pretender que o OmniRoute utilize um binário existente em vez de transferir um.

## Etiquetas de imagem

| Imagem                   | Etiqueta | Tamanho | Descrição                                                  |
| ------------------------ | -------- | ------- | ---------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | SemVer estável **publicada** mais elevada (não git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fixe esta classe de etiqueta para GitOps                   |

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). O Docker seleciona automaticamente a arquitetura correspondente; especifique `--platform linux/amd64` se precisar de forçar a emulação AMD64 em anfitriões ARM.

### Canais de lançamento

O OmniRoute publica canais Docker separados para versões estáveis, testes do ramo de lançamento ativo e compilações de desenvolvimento.

| Canal                           | Origem                                    | Mutabilidade                        | Utilização recomendada                                                                                                                 |
| ------------------------------- | ----------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versão assinada/com controlo de versão    | Imutável                            | Implementações de produção que fixam uma versão exata                                                                                  |
| `:latest` / `:latest-web`       | SemVer estável **publicada** mais elevada | Ponteiro estável mutável            | Acompanha versões estáveis **após** uma tarefa de publicação SemVer — **não** acompanha `main` nem commits `release/v*` não publicados |
| `:next` / `:next-web`           | Ramo `release/v*` predefinido atual       | Ponteiro de pré-lançamento mutável  | Testar correções que chegaram ao ramo de lançamento ativo, mas que ainda não estão numa versão estável                                 |
| `:main` / `:main-web`           | Ramo `main`                               | Ponteiro de desenvolvimento mutável | Apenas para desenvolvimento e testes de integração                                                                                     |

#### Utilizar o canal de pré-lançamento

O canal `next` é recompilado em cada push para o ramo `release/v*` predefinido atual e é publicado para AMD64 e ARM64. Os ramos de manutenção mais antigos não podem substituí-lo. O canal disponibiliza uma imagem que pode ser obtida para correções integradas no ramo de lançamento ativo antes da criação da próxima etiqueta estável.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para o Docker Compose, substitua a etiqueta da imagem utilizada pelo perfil selecionado e, em seguida, obtenha novamente a imagem e recrie o serviço:

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

`next` é um canal de pré-lançamento variável. Pode mudar com qualquer push para o ramo de lançamento ativo e **não é suportado para utilização em produção**. Fixe o digest da imagem ao avaliar uma compilação específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça uma cópia de segurança do volume de dados do OmniRoute ou do diretório de dados montado através de bind mount. Para reverter, restaure a versão estável ou o digest anteriormente utilizado e recrie o contentor:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Uma compilação de um ramo de lançamento nunca pode atualizar `latest`; apenas uma versão semântica estável elegível pode promover o apontador estável. As imagens `next` mantêm a inspeção da imagem de lançamento e o mecanismo de bloqueio perante vulnerabilidades CRITICAL.

**`latest` não constitui uma garantia de atualidade em relação ao git.** As correções integradas em `main` ou no ramo `release/v*` ativo **não** estão em `:latest` até que seja publicada uma imagem SemVer estável e a tarefa de publicação promova `:latest` (com o mesmo digest dessa versão SemVer). Se `latest` parecer não ter sido atualizado, embora o GitHub já apresente a correção, obtenha `:next` para testar o ramo de lançamento ou aguarde pela etiqueta SemVer.

| O que pretende                                                                    | Utilize                               |
| --------------------------------------------------------------------------------- | ------------------------------------- |
| GitOps/produção que não pode divergir                                             | Fixe `:X.Y.Z` (ou o digest da imagem) |
| Acompanhar versões estáveis publicadas e aceitar uma recriação em cada lançamento | `:latest`                             |
| Testar commits não lançados de `release/v*`                                       | `:next` (não utilizar em produção)    |
| Testar `main`                                                                     | `:main` (não utilizar em produção)    |

## Disponibilidade: o SQLite predefinido tem uma única réplica

A configuração padrão do OmniRoute em Docker / Kubernetes consiste em **um processo Node + um escritor SQLite**. A elevada disponibilidade **não é suportada** nesta topologia.

| Restrição                                          | Consequência                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escritor único                                     | **Não** execute várias réplicas sobre o mesmo ficheiro SQLite. Isso corrompe a base de dados.                                                                                                                                                                                                                                                                   |
| Recriação / reinício / interrupção por HEALTHCHECK | **Indisponibilidade total** de ligações SSE em curso, sessões do painel e estado em memória. Todos os clientes ligados são desligados. Os novos pedidos durante o período sem endpoints recebem do proxy inverso **`502 Bad Gateway: Unknown error`**, e não JSON do OmniRoute — os clientes não conseguem distinguir isto de uma falha do fornecedor (#11015). |
| Mesmo ciclo de eventos que `/healthz`              | Uma operação ocupada do catálogo ou de compressão pode atrasar as sondas; um tempo limite curto reinicia então a **única** réplica.                                                                                                                                                                                                                             |

**Matriz de sondas** (consulte também [recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda             | Alvo                                                                    | Não utilizar                                                                    |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Atividade         | TCP em `PORT` (predefinição: `20128`) ou HTTP não estrito em `/healthz` | `/api/monitoring/health`                                                        |
| Disponibilidade   | HTTP `GET /healthz`                                                     | Tempos limite apertados que considerem um ciclo de eventos ocupado como inativo |
| Profunda / humana | `/api/monitoring/health`                                                | Verificação automatizada de atividade pelo kubelet                              |

**Atualizações:** conte com a interrupção de todas as sessões. Drene os clientes, se possível; não existe atualização gradual com o SQLite predefinido. A combinação de `restart: unless-stopped` do Compose com o `HEALTHCHECK` do Docker também substituirá o único processo quando o contentor estiver com o estado Unhealthy — com o mesmo impacto.

Exemplo de Kubernetes para uma **única réplica** (Recreate é obrigatório; não aumente `replicas` sobre um único ficheiro SQLite):

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

A pausa `preStop` permite que o kube remova os endpoints do Service antes do SIGTERM, para que o tráfego **novo** deixe de chegar ao processo que está a terminar. As ligações SSE `/v1/responses` em curso são drenadas durante até `SHUTDOWN_TIMEOUT_MS` (30 s por predefinição) através de concessões pesadas de admissão (#11015). Os novos pedidos que ainda cheguem ao processo recebem `503` + `Retry-After: 5`. O intervalo do Recreate sem endpoints, até a substituição estar Ready, continua a representar uma indisponibilidade total — isto deve-se à topologia SQLite, não a uma configuração incorreta das sondas.

O Postgres externo / HA com vários escritores **não** é uma opção padrão documentada. Se precisar de HA, mantenha uma única réplica ou utilize uma topologia que o projeto tenha testado e documentado separadamente. O trabalho relativo a Postgres/MySQL encontra-se em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Até essa funcionalidade ser disponibilizada, a única forma suportada de multiplicar a capacidade de `/v1/responses` **grandes** consiste em utilizar N processos independentes (secção seguinte), e não `replicas > 1` num único volume.

## Escalabilidade horizontal: N processos independentes

Um processo Node corresponde a **uma heap V8**. Dois pedidos de agente de programação `POST /v1/responses` (RTK + Caveman) sobrepostos, com ~3 MiB / ~750 mil tokens, provocam o encerramento dessa heap perto dos ~12 Gi (`FATAL ERROR: Reached heap limit`) e podem causar OOM num cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Esta medição é um aviso relativo ao **orçamento de memória**, não um máximo absoluto do produto de dois pedidos `/v1/responses` longos em simultâneo. A admissão de conversas pesadas é controlada por um orçamento de bytes de entrada derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionado com base nesse mesmo limite do V8/cgroup — aumentá-lo manualmente (ou definir o limite antigo de contagem de pedidos `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) num processo já dimensionado volta a introduzir o encerramento. Conversas pequenas, `/healthz`, `/v1/models` e MCP **não** estão incluídos nesse limite.

### Um processo: mais de dois `/v1/responses` longos

Um processo **saudável** (heap abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predefinição `0.75`) **pode** executar mais de dois pedidos `POST /v1/responses` longos em simultâneo quando o orçamento de bytes em curso ao nível do processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ainda tiver capacidade. Corpos com tamanho igual ou superior a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (predefinição de 256 KiB) obtêm a mesma reserva para cargas pesadas que os pedidos com estruturas complexas e utilizam o mesmo mecanismo de escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos em simultâneo (os operadores necessitam frequentemente de 40–50) são uma questão de **orçamento de memória** — dimensione a heap + os lugares primários/de margem disponível + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — e não um limite absoluto do produto de “máximo de 2”. Uma heap sob pressão continua a rejeitar carga com um `503` repetível, para evitar que o problema de #7849 regresse.

Para **multiplicar heaps** (old-spaces V8 independentes) **atualmente**:

| Faça                                                                                                                                                                                                   | Não faça                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Execute **N contentores/pods**, cada um com o seu **próprio** `DATA_DIR` / volume                                                                                                                      | Definir `replicas > 1` sobre um único ficheiro SQLite                       |
| Dimensione os pedidos pesados em curso + a margem disponível saudável a partir da heap / do orçamento de bytes em curso; 1–2 é a predefinição conservadora de #7849, não um máximo absoluto do produto | Atribuir a um processo 8× mais RAM e um limite de contagem ilimitado        |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para **contadores de quotas partilhados**                                                                                               | Tratar o Redis como SQLite partilhado — não o é                             |
| Duplique os segredos dos fornecedores em cada instância (ou aceite painéis separados)                                                                                                                  | Esperar um único painel / um único registo de chamadas entre instâncias     |
| Coloque qualquer balanceador de carga à frente; a afinidade por chave de API ou sessão é suficiente                                                                                                    | Exigir middleware específico de um fornecedor com reconhecimento de tamanho |

Hardware: os pedidos `/v1/responses` longos em simultâneo por instância são uma questão de **orçamento de memória** (heap + bytes em curso / #10110). `N` diretórios `DATA_DIR` independentes continuam a multiplicar as heaps: a RAM do anfitrião tem de suportar `N × cgroup`, e não “um pod de 16 Gi com N=8”. Nunca utilize `replicas > 1` sobre um único ficheiro SQLite.

Exemplo de Compose (duas heaps, dois volumes — não `deploy.replicas: 2`):

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

A densidade dentro do processo (compressão fora do isolate HTTP) é abordada em [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico sobre estado durável partilhado é abordado em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Notas Importantes

- **Modo WAL do SQLite:** deve permitir-se que `docker stop` termine, para que o OmniRoute possa consolidar as alterações mais recentes em `storage.sqlite`. Os ficheiros Compose incluídos já definem um período de tolerância de 40s para a paragem. Se executar a imagem diretamente, mantenha `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** defina como `true` se as cópias de segurança de rotina/anteriores à escrita forem geridas externamente. As migrações de bases de dados existentes continuam a exigir um snapshot de segurança duradouro próprio e uma proteção contra migrações em massa.
- **Persistência de Dados:** monte sempre um volume em `/app/data` para preservar a base de dados, as chaves e as configurações entre reinícios do contentor.
- **Configuração da Porta:** substitua a variável de ambiente `PORT` para alterar a porta predefinida `20128`.

## Consulte Também

- [Guia de Implementação em VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuração de VM + nginx + Cloudflare
- [Guia de Implementação no Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementar no Fly.io
- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Referência completa de `.env`
