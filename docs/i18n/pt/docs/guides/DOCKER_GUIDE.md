# 🐳 Docker Guide — OmniRoute (Português (Portugal))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referência completa para implementação com Docker. Para um início rápido, consulte a [secção Docker do README](../README.md#-docker).

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
- [Erros regionais do Gemini no Docker](#gemini-regional-errors-inside-docker)
- [Notas importantes](#important-notes)

---

## Execução rápida

> **Alojamento próprio com um único comando?** Consulte o
> [Guia de alojamento próprio](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagem publicada +
> Redis, apenas na interface de loopback, sem escolha de perfil). A execução rápida abaixo é o
> método de contentor único para utilizadores que já executam o Redis noutro local.

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
# Copie e edite primeiro o ficheiro .env
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

# Perfil CLI (Claude Code, Codex e OpenClaw incorporados)
docker compose --profile cli up -d

# Perfil de anfitrião (concebido principalmente para Linux; monta os binários CLI do anfitrião em modo só de leitura)
docker compose --profile host up -d

# Perfil Web (Chromium/Playwright para fornecedores de sessões Web)
docker compose --profile web up -d

# Combinar CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfis disponíveis

O OmniRoute inclui perfis do Compose para os principais modelos de implementação. Escolha o que corresponde ao seu ambiente.

| Perfil               | Serviço          | Quando utilizar                                                                                                                                                      | Comando                                      |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predefinido) | `omniroute-base` | Servidor sem interface gráfica/ambiente de execução mínimo, sem CLIs de fornecedores incluídas                                                                       | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | Fluxos de trabalho de agentes que executam `omniroute providers/setup/doctor` e CLIs incluídas (Codex, Claude Code, Droid, OpenClaw)                                 | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | Anfitriões Linux que pretendam acesso semelhante a `network_mode` às CLIs do anfitrião, montando `~/.local/bin`, `~/.codex`, `~/.claude`, etc. em modo só de leitura | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | Executar o sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porta `8317` para encaminhamento através de um proxy CLI a montante                | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | Fornecedores de sessões Web que necessitam de um navegador: `gemini-web`, `claude-web`, `claude-turnstile` (compila `runner-web`, com Chromium incluído)             | `docker compose --profile web up -d`         |

> É possível combinar vários perfis: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configurar ferramentas CLI do anfitrião quando o OmniRoute é executado no Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` e o botão
**Guardar configuração** do painel escrevem ficheiros como `~/.codex/*.config.toml`. Esses caminhos
só têm significado na máquina onde a CLI é efetivamente executada. Se os executar dentro
do contentor, a escrita será feita no diretório pessoal do próprio contentor (`/home/node` —
a imagem é executada com `USER node`), onde nenhuma CLI do anfitrião os irá ler e onde serão
eliminados assim que o contentor for recriado.

O OmniRoute deteta esta situação e recusa a escrita, apresentando instruções em vez de
comunicar um êxito que não pode utilizar: a CLI termina com `2` e a API responde com `422`
e `containerEphemeralTarget: true`.

### Recomendado: executar a CLI no anfitrião e o OmniRoute no Docker

O contentor disponibiliza a API; a CLI configura as ferramentas do anfitrião.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # direcionar a CLI para o contentor
omniroute setup-codex                      # escreve no verdadeiro ~/.codex do anfitrião
```

Esta é a opção adequada quando o Codex, Claude Code, Cursor ou ferramentas semelhantes são executados no seu
portátil — que é a configuração habitual.

### Alternativa: montar os diretórios de configuração do anfitrião através de bind mounts (perfil `host`)

Se pretende que o próprio contentor escreva na configuração do anfitrião, monte os
diretórios e faça `CLI_CONFIG_HOME` apontar para a raiz da montagem. O perfil `host`
já o faz:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

É o bind mount que torna o caminho fidedigno: o OmniRoute lê
`/proc/self/mountinfo` e permite escritas em caminhos montados (e em diretórios
cujos subdiretórios são pontos de montagem, que corresponde exatamente à estrutura de `/host-home` acima), continuando
a recusar escritas nos caminhos não montados.

### Alternativa de recurso: configurar as próprias CLIs do contentor (utilizar com moderação)

Quando as CLIs residem efetivamente dentro do contentor (o perfil `cli`), a escrita
é intencional. Passe `--allow-container-write` a qualquer comando `setup-*` ou defina
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` no servidor. A escrita prossegue
com um aviso de que não sobreviverá ao contentor.

> **Aviso de segurança — perfil `cli` + montagem de `docker.sock`.**
> O perfil `cli` monta `/var/run/docker.sock` através de um bind mount para que o atualizador
> automático dentro do contentor possa recriar a pilha através do daemon do anfitrião
> (`src/lib/system/autoUpdate.ts` verifica a existência desse socket e ignora o
> caminho do Docker quando este está ausente). Esse socket é **uma fronteira de confiança
> equivalente a root no anfitrião**: tudo o que lhe consiga aceder controla o daemon do Docker
> do anfitrião como root — pode criar, inspecionar, parar e remover qualquer contentor no anfitrião.
> Implicações:
>
> 1. **Nunca exponha a porta do perfil `cli` à rede.** Publique-a
>    em `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — um perfil `cli` acessível pela LAN transforma qualquer RCE ao nível do painel
>    num comprometimento total do anfitrião.
> 2. **Não monte diretórios adicionais do anfitrião no perfil `cli`.**
>    O socket do Docker, em conjunto com qualquer montagem adicional, concede ao contentor
>    acesso total de leitura/escrita ao sistema de ficheiros e à configuração do anfitrião. Se precisar que uma ferramenta
>    tenha acesso a um projeto, execute-a localmente com o binário da CLI — não o monte
>    no contentor `cli`.
>
> Se não precisar de atualizações automáticas dentro do contentor, não ative o perfil `cli`
> (`COMPOSE_PROFILES=core,redis` ou uma opção mais curta). Os outros perfis não
> montam o socket do Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; não compilado em `/docs`) para conhecer o modelo de ameaças relacionado
> com MITM e `docs/security/SUPPLY_CHAIN.md` para conhecer a cadeia de proveniência
> dos binários `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

O OmniRoute depende do Redis para suportar o limitador de taxa distribuído e a cache partilhada. O serviço `redis` está **sempre definido** em `docker-compose.yml` (não está condicionado por nenhum perfil) e inicia juntamente com qualquer outro perfil.

| Detalhe                         | Valor                                         |
| ------------------------------- | --------------------------------------------- |
| Imagem                          | `redis:7-alpine`                              |
| Nome do contentor               | `omniroute-redis`                             |
| Porta interna                   | `6379`                                        |
| Porta do anfitrião (ajuste)     | `REDIS_PORT` (predefinição: `6379`)           |
| Interface do anfitrião (ajuste) | `REDIS_BIND_HOST` (predefinição: `127.0.0.1`) |
| Volume                          | `omniroute-redis-data` → `/data`              |
| Verificação de estado           | `redis-cli ping` (intervalo de 10s)           |

Variáveis de ambiente relacionadas:

- `REDIS_URL` — cadeia de ligação injetada na aplicação (`redis://redis:6379` por predefinição).
- `REDIS_PORT` — mapeamento da porta do contentor Redis no anfitrião.
- `REDIS_BIND_HOST` — interface do anfitrião na qual a porta é publicada. A predefinição é `127.0.0.1`.

> **Porquê a interface de loopback por predefinição:** o sidecar é executado sem `requirepass`, e os contentores
> da aplicação acedem-lhe através da rede do compose (`redis:6379`) — a porta publicada existe
> apenas para ferramentas executadas no anfitrião (`redis-cli`, um `npm run dev` local). Publicar em
> `0.0.0.0` exporia um Redis sem autenticação a todos os anfitriões na sua LAN. Se definir
> `REDIS_BIND_HOST=0.0.0.0`, adicione também `--requirepass` ao `command:` do serviço.

**Não é recomendável desativar o Redis** (o limitador de taxa passará a usar o modo alternativo em memória). Se for necessário, remova/comente o bloco do serviço `redis:` em `docker-compose.yml` ou reduza a respetiva escala para zero:

```bash
docker compose up -d --scale redis=0
```

## Compose de produção

Para obter um snapshot de produção isolado, executado em paralelo com o ambiente de desenvolvimento, utilize `docker-compose.prod.yml`.

| Detalhe                        | Valor                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| Ficheiro                       | `docker-compose.prod.yml`                                                                     |
| Porta predefinida do dashboard | `PROD_DASHBOARD_PORT=20130` (mapeada para a porta interna `${DASHBOARD_PORT:-20128}`)         |
| Porta predefinida da API       | `PROD_API_PORT=20131`                                                                         |
| Imagem                         | `omniroute:prod` (criada a partir do destino `runner-cli`)                                    |
| Contentor Redis                | `omniroute-redis-prod` (`redis:8.6.2`, volume dedicado `redis-prod-data`)                     |
| Volume de dados                | `omniroute-prod-data` (com nome, persistente entre reconstruções)                             |
| Verificações de estado         | `node healthcheck.mjs` + `redis-cli ping`, com `depends_on` condicionado pelo estado do Redis |

Como utilizar:

```bash
# Compilar e iniciar a stack de produção
docker compose -f docker-compose.prod.yml up -d --build

# Acompanhar os registos
docker compose -f docker-compose.prod.yml logs -f

# Encerrar (manter os volumes)
docker compose -f docker-compose.prod.yml down
```

A stack de produção é executada em paralelo com o compose de desenvolvimento (nomes de contentores, portas e volumes diferentes), pelo que pode continuar a efetuar alterações localmente enquanto a produção permanece em execução.

## Fases do Dockerfile

O repositório inclui um Dockerfile multifase (`Dockerfile`). Estão disponíveis quatro fases; escolha o `target` adequado ao seu caso de utilização.

| Fase          | Imagem base           | Finalidade                                                                                                                                                                                                                                                                                                                            |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instala as dependências (`npm ci --legacy-peer-deps`) e executa `npm run build` (Turbopack por predefinição — consulte Recursos de compilação abaixo)                                                                                                                                                                                 |
| `runner-base` | `node:26-trixie-slim` | Ambiente de execução de produção com a saída autónoma do Next.js. **Não inclui CLIs de fornecedores.**                                                                                                                                                                                                                                |
| `runner-cli`  | `runner-base`         | Adiciona `git`, `docker.io`, `docker-compose` e CLIs globais: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Escolha esta opção para fluxos de trabalho agênticos.**                                                                                                                                            |
| `runner-web`  | `runner-base`         | Adiciona o Playwright e um navegador Chromium (`--with-deps`) para fornecedores de sessões Web: `gemini-web`, `claude-web`, `claude-turnstile`. **Escolha esta opção quando utilizar esses fornecedores** — a imagem simples falha no momento do pedido sem estes componentes (consulte a nota sobre `-web` em Canais de lançamento). |

Compile manualmente um `target` específico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos de compilação

Três argumentos de compilação controlam os recursos consumidos pela fase `builder`. Aplicam-se apenas durante a compilação —
`OMNIROUTE_MEMORY_MB` (abaixo) é um controlo separado para o ambiente de execução.

| Argumento de compilação     | Predefinição | Efeito                                                                                             |
| --------------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`          | `0` compila com webpack: menor pico de memória, mais lento. `1` ativa o Turbopack.                 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`       | Limite da heap do V8 (`--max-old-space-size`) para o `next build` iniciado.                        |
| `OMNIROUTE_BUILD_WORKERS`   | `2`          | Alimenta `CIRCLE_NODE_TOTAL`; o Next deriva `workers = N - 1` para a recolha de dados das páginas. |

`OMNIROUTE_BUILD_WORKERS` é o valor a aumentar num sistema de compilação potente e aquele de que
deve suspeitar quando uma compilação com recursos limitados termina **depois de** `✓ Compiled successfully`. Cada
worker de dados das páginas é um processo independente, tal como o próprio processo principal `next build`;
uma reprodução num VPS real (problema #7518) mediu o pico de RSS de cada processo em
~4,5 GB, independentemente da opção de heap `NODE_OPTIONS` (o Turbopack compila utilizando
memória nativa/Rust fora da heap do V8). A predefinição de `2` (→ 1 worker, 2
processos no total) foi dimensionada para os executores alojados no GitHub com 16 GB / 4 vCPU que o
pipeline de publicação utiliza. Com `8` (→ 7 workers), esse executor ficou sem memória e
o buildkit terminou a fase com `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) continuou a não caber depois de o RSS por processo ter sido medido
diretamente, em vez de inferido. `tests/unit/docker-build-memory-budget.test.ts`
faz os cálculos com base no valor medido e falha se qualquer um dos controlos
exceder a capacidade do executor.

O Turbopack compila utilizando memória nativa Rust que reside **fora** da heap do V8, pelo que
`OMNIROUTE_BUILD_MEMORY_MB` não a limita. Num anfitrião com um limite de memória, a
compilação é então terminada com SIGKILL pelo OOM killer sem qualquer texto de erro — simplesmente
para a meio de `Creating an optimized production build`, o que parece um bloqueio em vez
de falta de memória. É por isso que o `Dockerfile` utiliza webpack por predefinição
(`OMNIROUTE_USE_TURBOPACK=0`), ao contrário de `npm run dev` / `npm run build`, em que
o Turbopack é a predefinição no código: um simples `docker build .` sem argumentos de compilação (o que
o Railway e outros serviços de implementação com um clique executam) não pode terminar silenciosamente num
sistema de compilação com memória limitada. As imagens publicadas já passam
`OMNIROUTE_USE_TURBOPACK=0` explicitamente em `docker-publish.yml`. Num sistema de compilação com bastante RAM, ative
o Turbopack para obter uma compilação mais rápida:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está ativado, pelo que `next build` executa um processo principal **e** um processo
worker, e cada um respeita `OMNIROUTE_BUILD_MEMORY_MB` separadamente. Defina o limite do contentor
para um valor superior a aproximadamente o dobro desse valor, e não apenas uma vez.

Medido nesta árvore (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Empacotador | Limite do contentor | Resultado                                   |
| ----------- | ------------------- | ------------------------------------------- |
| Turbopack   | 8 GiB / 16 GiB      | Terminado por OOM em ambos, silenciosamente |
| webpack     | 8 GiB               | Worker de compilação terminado com SIGKILL  |
| webpack     | 12 GiB              | Bem-sucedido, com um pico de 11,1 GiB       |

### Predefinições do ambiente de execução

Predefinições exportadas por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamento da memória no Docker:

- A imagem define `OMNIROUTE_MEMORY_MB=1024` e deriva `NODE_OPTIONS=--max-old-space-size=1024` a partir dessa variável.
- O processo real do servidor é iniciado pelo lançador autónomo, que lê `OMNIROUTE_MEMORY_MB` e acrescenta `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- O Node utiliza o último valor repetido de `--max-old-space-size`, pelo que definir `OMNIROUTE_MEMORY_MB` controla o limite efetivo de heap no Docker.
- Como a imagem define sempre esta variável, o mecanismo de contingência do lançador, calibrado com base na RAM, nunca é aplicado no Docker. Aumente-a explicitamente para a carga de trabalho (tabela abaixo). `2048` continua a ser demasiado baixo para `/v1/responses` de agentes de programação.

### RAM em tempo de execução para agentes de programação

A predefinição de 1 GiB do Docker é um valor mínimo para o painel/conversas ligeiras, não uma dimensão adequada para produção. Corpos extensos de pedidos `POST /v1/responses` (centenas de mensagens, dezenas de ferramentas) mantêm vários grafos em memória durante a compressão. Dois pedidos sobrepostos de aproximadamente 3 MiB/750 mil tokens fizeram o V8 abortar com um old-space de **12 GiB** (`FATAL ERROR: Reached heap limit`) e também atingiram um OOM de cgroup com 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensione a **`--memory` do cgroup acima do heap** — os buffers nativos, o SQLite e os dados intermédios da compressão ficam fora do V8.

| Carga de trabalho                            | `OMNIROUTE_MEMORY_MB`           | Contentor/cgroup    | Notas                                                                                                                                |
| -------------------------------------------- | ------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Painel, uma conversa ligeira                 | `1024` (predefinição da imagem) | ≥2 GiB              |                                                                                                                                      |
| Um agente de programação (Claude/Codex/Grok) | `8192`                          | ≥10 GiB             | `/v1/responses` típico de uma única sessão                                                                                           |
| Dois `/v1/responses` longos em simultâneo    | `10240`–`12288`                 | ≥12–16 GiB          | Aborto do V8 medido com um heap de aproximadamente 12 GiB                                                                            |
| Três ou mais contextos longos em simultâneo  | não usar num único processo     | serializar/mais RAM | Por predefinição, a admissão de cargas pesadas limita-se a 1 pedido em curso; aumentar este limite sem RAM volta a provocar o aborto |

`omniroute serve` em ambiente bare metal calibra aproximadamente 35% da RAM (limitado ao intervalo `[512, 4096]`) quando `OMNIROUTE_MEMORY_MB` **não está definida**. O Docker define sempre `1024`, pelo que essa calibração nunca é executada na imagem oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variáveis de Ambiente Críticas

Para além dos valores predefinidos documentados em [ENVIRONMENT.md](../reference/ENVIRONMENT.md), as seguintes variáveis são as mais importantes ao executar em Docker:

| Variável                      | Finalidade                                                                                                                                                                                                                                                             | Valor predefinido                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Segredo partilhado para a ponte WebSocket. **Obrigatório em produção** — defina uma cadeia aleatória forte.                                                                                                                                                            | não definido (tem de ser fornecido) |
| `REDIS_URL`                   | Cadeia de ligação para o limitador de taxa / backend de cache                                                                                                                                                                                                          | `redis://redis:6379`                |
| `REDIS_PORT`                  | Porta do anfitrião para o contentor Redis incluído                                                                                                                                                                                                                     | `6379`                              |
| `REDIS_BIND_HOST`             | Interface do anfitrião na qual a porta do Redis incluído é publicada (loopback, a menos que adicione AUTH)                                                                                                                                                             | `127.0.0.1`                         |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Caminho do anfitrião montado no perfil `cli` em `/workspace/omniroute` para fluxos de trabalho de atualização automática                                                                                                                                               | `.` (diretório atual)               |
| `OMNIROUTE_MEMORY_MB`         | Limite da heap do Node em tempo de execução para o servidor Docker autónomo; substitui o valor predefinido da imagem acima. Agentes de programação: `8192`+ (consulte [RAM em tempo de execução](#runtime-ram-for-coding-agents)).                                     | `1024`                              |
| `DASHBOARD_PORT` / `API_PORT` | Substitui as portas expostas do painel (20128) e da API (20129)                                                                                                                                                                                                        | `20128` / `20129`                   |
| `APP_BIND_HOST`               | Interface do anfitrião na qual o docker-compose publica as portas do painel/API/WS em direto. Com `REQUIRE_API_KEY=false` (a predefinição), `0.0.0.0` expõe o proxy `/v1` anónimo à LAN — só alargue o acesso com `REQUIRE_API_KEY=true` ou um proxy inverso à frente. | `127.0.0.1`                         |
| `CLIPROXY_BIND_HOST`          | Interface do anfitrião na qual o docker-compose publica o sidecar `cliproxyapi` — o respetivo volume de dados contém as credenciais do fornecedor.                                                                                                                     | `127.0.0.1`                         |
| `OMNIROUTE_PLUGINS_DIR`       | Diretório que o analisador de plugins em tempo de execução lê e no qual instala. Defina-o quando os plugins forem montados com bind mount: a predefinição segue `HOME`, que uma imagem pode não exportar.                                                              | `~/.omniroute/plugins`              |
| `OMNIROUTE_BASE_PATH`         | Subcaminho do URL quando a aplicação é publicada através de um proxy inverso (por exemplo, `/omniroute`)                                                                                                                                                               | _(vazio = raiz)_                    |
| `NEXT_PUBLIC_BASE_URL`        | Origem pública do navegador, incluindo o subcaminho (por exemplo, `https://host/omniroute`)                                                                                                                                                                            | não definido                        |
| `PROD_DASHBOARD_PORT`         | Porta do anfitrião para o painel em `docker-compose.prod.yml`                                                                                                                                                                                                          | `20130`                             |
| `CLIPROXYAPI_PORT`            | Porta do anfitrião para o sidecar `cliproxyapi`                                                                                                                                                                                                                        | `8317`                              |

## Proxy inverso num subcaminho (Traefik / nginx)

O `basePath` do Next.js é compilado no bundle autónomo. O OmniRoute regista o valor
incorporado num ficheiro sentinela na raiz da aplicação (escrito durante `npm run build`;
lido por `scripts/docker/ensure-docker-base-path.mjs`) e compara-o com
`OMNIROUTE_BASE_PATH` quando o contentor é iniciado. Quando são diferentes e a imagem
foi criada para a raiz do domínio, o entrypoint reescreve os manifestos autónomos, os
literais `basePath`/`assetPrefix` incorporados (o Next 16 gera os URLs de recursos SSR
apenas a partir de `assetPrefix` — o patcher replica o subcaminho neste), os URLs de
recursos `/_next/static` incorporados (manifestos de referências do cliente, importações
de multimédia, páginas de erro pré-renderizadas) e o shim de `process.env` do cliente
antes da execução de `node dev/run-standalone.mjs`.

### Compilação com o Compose (recomendado)

Defina ambas as variáveis em `.env` e, em seguida, volte a compilar para que a imagem e
o ambiente de execução estejam em conformidade:

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

As imagens `diegosouzapw/omniroute:*` publicadas são compiladas para a raiz do domínio.
Ainda pode definir `OMNIROUTE_BASE_PATH` em tempo de execução; o contentor aplica uma
correção ao bundle uma vez durante o arranque. Combine-o com a origem pública
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
`StripPrefix`, para que o Next.js receba `/omniroute/...` e disponibilize os recursos a
partir de `/omniroute/_next/...`.

O healthcheck do Docker verifica o endpoint de ciclo de vida leve `/healthz`, prefixado
com o `OMNIROUTE_BASE_PATH` ativo. `/api/monitoring/health` continua disponível para
diagnósticos humanos/em dashboards; para fazer com que o HEALTHCHECK do contentor volte
a utilizá-lo (por exemplo, para impor uma verificação de integridade aprofundada),
defina `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esse caminho é uma
verificação **aprofundada** (BD + resumo da monitorização) — adequada para o
`HEALTHCHECK` pouco frequente do Docker, caso opte por voltar a utilizá-la, mas **não**
para os intervalos de `livenessProbe` do Kubernetes.

Para orquestradores (Kubernetes, Nomad, etc.):

| Sonda                  | Preferir                                                                   | Evitar                                                              |
| ---------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Atividade              | HTTP `GET /livez` ou TCP na porta principal (`PORT`, predefinição `20128`) | `/api/monitoring/health` como verificação de atividade              |
| Disponibilidade        | HTTP `GET /healthz`                                                        | Timeouts curtos que tratem um ciclo de eventos ocupado como inativo |
| Aprofundada / blackbox | `/api/monitoring/health`                                                   | —                                                                   |

`/healthz` comunica o ciclo de vida do processo (`ok` / `starting` / `stopping`).
`/livez` verifica apenas se o processo está ativo (200 sempre que o handler consegue
ser executado; não aguarda pela disponibilidade). Ambos continuam a ser executados no
mesmo ciclo de eventos do Node que processa os pedidos, pelo que o trabalho intensivo
de CPU no catálogo ou na compressão pode atrasá-los — ocupado ≠ inativo. Prefira uma
verificação de atividade TCP se as sondas HTTP atingirem o timeout. Orientações
completas sobre sondas:
[Guia de monitorização — recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose com Caddy (HTTPS Auto-TLS)

O OmniRoute pode ser exposto de forma segura utilizando o aprovisionamento SSL automático do Caddy. Certifique-se de que o registo DNS A do seu domínio aponta para o IP do seu servidor.

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
      # Origem visível para o navegador utilizada em callbacks OAuth, ligações do painel e URLs públicas geradas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna entre servidores para tarefas agendadas / pedidos ao próprio serviço.
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

O Caddy define os cabeçalhos de encaminhamento padrão para o contentor a montante. O OmniRoute utiliza
`NEXT_PUBLIC_BASE_URL` como a origem pública canónica para callbacks OAuth e ligações públicas
geradas; as operações de escrita autenticadas do painel utilizam pedidos da mesma origem e proteção
CSRF associada à sessão. Ative `OMNIROUTE_TRUST_PROXY` apenas em implementações avançadas nas quais pretenda
deliberadamente que o OmniRoute determine a origem pública a partir de cabeçalhos encaminhados fidedignos, em vez de uma
configuração explícita.

## Cloudflare Quick Tunnel

O suporte do painel para implementações Docker inclui um **Cloudflare Quick Tunnel** de um só clique em `Dashboard → Endpoints`. A primeira ativação transfere o `cloudflared` apenas quando necessário, inicia um túnel temporário para o seu endpoint `/v1` atual e apresenta o URL `https://*.trycloudflare.com/v1` gerado diretamente abaixo do seu URL público normal.

Os painéis de túneis de endpoints (Cloudflare, Tailscale, ngrok) podem ser apresentados ou ocultados em `Settings → Appearance` sem alterar o estado do túnel ativo.

### Notas sobre túneis

- Os URLs de Quick Tunnel são temporários e mudam após cada reinício.
- Os Quick Tunnels não são restaurados automaticamente após o reinício do OmniRoute ou do contentor. Volte a ativá-los no painel quando necessário.
- Atualmente, a instalação gerida suporta Linux, macOS e Windows em `x64` / `arm64`.
- Por predefinição, os Quick Tunnels geridos utilizam o transporte HTTP/2 para evitar avisos ruidosos sobre a memória intermédia UDP do QUIC em ambientes de contentores com recursos limitados. Defina `CLOUDFLARED_PROTOCOL=quic` ou `auto` se pretender um transporte diferente.
- As imagens Docker incluem certificados de AC raiz do sistema e fornecem-nos ao `cloudflared` gerido, o que evita falhas de confiança TLS quando o túnel é inicializado dentro do contentor.
- Defina `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` se pretender que o OmniRoute utilize um binário existente em vez de transferir um.

## Tags de imagens

| Imagem                   | Tag      | Tamanho | Descrição                                                    |
| ------------------------ | -------- | ------- | ------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | SemVer estável **publicada** mais elevada (não o `main` git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Fixe esta classe de tag para GitOps                          |

Manifesto multiplataforma: `linux/amd64` + `linux/arm64` nativo (Apple Silicon, AWS Graviton, Raspberry Pi). O Docker seleciona automaticamente a arquitetura correspondente; especifique `--platform linux/amd64` se precisar de forçar a emulação AMD64 em anfitriões ARM.

### Canais de lançamento

O OmniRoute publica canais Docker distintos para versões estáveis, testes do ramo de lançamento ativo e compilações de desenvolvimento.

| Canal                           | Origem                                    | Mutabilidade                        | Utilização recomendada                                                                                                                            |
| ------------------------------- | ----------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versão assinada/com controlo de versão    | Imutável                            | Implementações de produção que fixam uma versão exata                                                                                             |
| `:latest` / `:latest-web`       | SemVer estável **publicada** mais elevada | Ponteiro estável mutável            | Acompanha versões estáveis **após** uma tarefa de publicação SemVer — **não** acompanha o `main` nem commits de `release/v*` ainda não publicados |
| `:next` / `:next-web`           | Ramo `release/v*` predefinido atual       | Ponteiro de pré-lançamento mutável  | Teste de correções integradas no ramo de lançamento ativo, mas que ainda não constam de uma versão estável                                        |
| `:main` / `:main-web`           | Ramo `main`                               | Ponteiro de desenvolvimento mutável | Apenas para testes de desenvolvimento e integração                                                                                                |

#### Fornecedores de sessões Web: as imagens `-web`

Cada canal acima também está disponível como uma tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), compilada a partir da fase `runner-web` — a mesma imagem, acrescida do Playwright e de um navegador Chromium. A imagem normal é fornecida **sem** o Chromium; `gemini-web`, `claude-web` e `claude-turnstile` necessitam dele.

A falha é adiada e não ocorre durante o arranque: esses fornecedores apresentam os respetivos modelos e surgem como ligados no painel, sendo que apenas o primeiro pedido falha com

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Se utilizar esses fornecedores, obtenha a tag `-web` do canal que já está a utilizar — nada mais muda. Numa instalação npm/CLI (sem imagem Docker), o elemento em falta equivalente é o binário do navegador: execute `npx playwright install chromium` no anfitrião.

#### Utilizar o canal de pré-lançamento

O canal `next` é reconstruído em cada push para o branch `release/v*` predefinido atual e é publicado para AMD64 e ARM64. Os branches de manutenção mais antigos não podem sobrescrevê-lo. O canal disponibiliza uma imagem que pode ser obtida por pull para correções que tenham sido integradas no branch de release ativo antes da criação da próxima tag estável.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para o Docker Compose, substitua a tag da imagem utilizada pelo perfil selecionado e, em seguida, obtenha a imagem e recrie o serviço:

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

`next` é um canal de pré-lançamento flutuante. Pode mudar com qualquer push para o branch de release ativo e **não é suportado para utilização em produção**. Fixe o digest da imagem ao avaliar uma build específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de testar, faça uma cópia de segurança do volume de dados do OmniRoute ou do diretório de dados montado através de bind mount. Para reverter, restaure a versão estável ou o digest anteriormente utilizado e recrie o contentor:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Uma build de um branch de release nunca pode alterar `latest`; apenas uma versão semântica estável elegível pode promover a referência estável. As imagens `next` mantêm a inspeção da imagem de release e o mecanismo de bloqueio para vulnerabilidades CRITICAL.

**`latest` não é uma garantia de atualidade relativamente ao git.** As correções integradas em `main` ou no branch `release/v*` ativo **não** estão em `:latest` até que seja publicada uma imagem SemVer estável e o job de publicação promova `:latest` (com o mesmo digest que essa versão SemVer). Se `latest` parecer estagnada enquanto o GitHub já apresenta a correção, obtenha `:next` para testar o branch de release ou aguarde pela tag SemVer.

| O que pretende                                                                 | Utilize                               |
| ------------------------------------------------------------------------------ | ------------------------------------- |
| GitOps / produção que não pode sofrer desvios                                  | Fixe `:X.Y.Z` (ou o digest da imagem) |
| Acompanhar versões estáveis publicadas e aceitar uma recriação em cada release | `:latest`                             |
| Testar commits de `release/v*` ainda não publicados                            | `:next` (não para produção)           |
| Testar `main`                                                                  | `:main` (não para produção)           |

## Disponibilidade: o SQLite predefinido tem uma única réplica

A configuração padrão do OmniRoute em Docker / Kubernetes consiste em **um processo Node + um escritor SQLite**. A alta disponibilidade **não é suportada** nesta topologia.

| Restrição                                          | Consequência                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escritor único                                     | **Não** execute várias réplicas com o mesmo ficheiro SQLite. Isso corrompe a BD.                                                                                                                                                                                                                                                                                 |
| Recriação / reinício / interrupção por HEALTHCHECK | **Indisponibilidade total** das ligações SSE em curso, sessões do painel e estado em memória. Todos os clientes ligados são desligados. Os novos pedidos durante o período sem endpoints recebem do proxy inverso **`502 Bad Gateway: Unknown error`**, e não JSON do OmniRoute — os clientes não conseguem distinguir isto de uma falha do fornecedor (#11015). |
| Mesmo ciclo de eventos que `/healthz`              | Uma operação de catálogo ou compressão com muita atividade pode atrasar as sondas; um tempo limite curto reinicia então a **única** réplica.                                                                                                                                                                                                                     |

**Matriz de sondas** (consulte também [recomendações de sondas do Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda              | Destino                                                                 | Não utilizar                                                             |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Vivacidade         | TCP em `PORT` (predefinição: `20128`) ou HTTP não estrito em `/healthz` | `/api/monitoring/health`                                                 |
| Prontidão          | HTTP `GET /healthz`                                                     | Tempos limite curtos que tratam um ciclo de eventos ocupado como inativo |
| Profunda / humanos | `/api/monitoring/health`                                                | Vivacidade automatizada do kubelet                                       |

**Atualizações:** espere que todas as sessões sejam desligadas. Drene os clientes, se possível; não existe atualização contínua com o SQLite predefinido. A combinação de `restart: unless-stopped` do Compose com o `HEALTHCHECK` do Docker também substituirá o único processo quando o contentor estiver no estado Unhealthy — com o mesmo impacto.

Excerto do Kubernetes para uma **única réplica** (Recreate é obrigatório; não aumente `replicas` com um único ficheiro SQLite):

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

A espera de `preStop` permite que o Kubernetes remova os endpoints do Service antes de SIGTERM, para que o tráfego **novo** deixe de chegar ao processo que está a terminar. As ligações SSE de `/v1/responses` em curso têm até `SHUTDOWN_TIMEOUT_MS` (30 s por predefinição) para serem drenadas através de concessões pesadas de admissão (#11015). Os novos pedidos que ainda chegam ao processo recebem `503` + `Retry-After: 5`. O intervalo sem endpoints causado por Recreate, até a substituição ficar Ready, continua a representar uma indisponibilidade total — isso deve-se à topologia SQLite, não a uma má configuração das sondas.

A alta disponibilidade com Postgres externo / vários escritores **não** é um caminho padrão documentado. Se precisar de alta disponibilidade, mantenha uma única réplica ou utilize uma topologia que o projeto tenha testado e documentado separadamente. O trabalho relativo a Postgres/MySQL encontra-se em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Até isso ser disponibilizado, a única forma suportada de multiplicar a capacidade para pedidos **grandes** de `/v1/responses` consiste em N processos independentes (secção seguinte), e não em `replicas > 1` num único volume.

## Escalabilidade horizontal: N processos independentes

Um processo Node corresponde a **um heap V8**. Dois pedidos `POST /v1/responses` de agentes de programação (RTK + Caveman), sobrepostos, com ~3 MiB / ~750 mil tokens, fazem esse heap abortar quando atinge ~12 Gi (`FATAL ERROR: Reached heap limit`) e podem provocar OOM num cgroup de 16 Gi. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Essa medição é um aviso relativo ao **orçamento de memória**, não um máximo rígido do produto de dois pedidos `/v1/responses` longos em simultâneo. A admissão de chats pesados é controlada por um orçamento de bytes de ingestão derivado automaticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionado a partir desse mesmo limite do V8/cgroup — aumentá-lo manualmente (ou definir o limite antigo de contagem de pedidos `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) num processo já dimensionado volta a introduzir o aborto. Os chats pequenos, `/healthz`, `/v1/models` e MCP **não** estão incluídos nesse limite.

### Um processo: mais de dois `/v1/responses` longos

Um processo **saudável** (heap abaixo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, predefinição `0.75`) **pode** executar mais de dois pedidos `POST /v1/responses` longos em simultâneo quando o orçamento de bytes em curso de todo o processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ainda tiver capacidade. Os corpos com tamanho igual ou superior a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (predefinição de 256 KiB) obtêm a mesma reserva de recursos pesados que os pedidos estruturalmente complexos e utilizam a mesma via de escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dezenas de clientes SSE longos em simultâneo (os operadores necessitam frequentemente de 40–50) são uma questão de **orçamento de memória** — dimensione o heap, as vagas primárias/de margem e `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — e não um limite rígido do produto de «máximo de 2». Um heap sob pressão continua a rejeitar pedidos com um `503` passível de nova tentativa, para que o problema #7849 não regresse.

Para **multiplicar heaps** (old-spaces V8 independentes) **atualmente**:

| Fazer                                                                                                                                                                                 | Não fazer                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Executar **N contentores/pods**, cada um com o seu **próprio** `DATA_DIR` / volume                                                                                                    | Definir `replicas > 1` para um único ficheiro SQLite                 |
| Dimensionar os pedidos pesados em curso e a margem saudável com base no orçamento de heap/bytes em curso; 1–2 é a predefinição conservadora de #7849, não um máximo rígido do produto | Atribuir 8× mais RAM a um processo e um limite de contagem ilimitado |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para **contadores de quota partilhados**                                                                               | Tratar o Redis como SQLite partilhado — não o é                      |
| Duplicar os segredos dos fornecedores em cada instância (ou aceitar painéis separados)                                                                                                | Esperar um único painel / registo de chamadas entre instâncias       |
| Colocar qualquer balanceador de carga à frente; a afinidade por chave de API ou sessão é suficiente                                                                                   | Exigir middleware específico de um fornecedor e sensível ao tamanho  |

Hardware: o número de pedidos `/v1/responses` longos simultâneos por instância é uma questão de **orçamento de memória** (heap + bytes em curso / #10110). `N` `DATA_DIR`s independentes continuam a multiplicar os heaps: a RAM do anfitrião tem de suportar `N × cgroup`, e não «um pod de 16 Gi com N=8». Nunca utilize `replicas > 1` num único ficheiro SQLite.

Esboço de Compose (dois heaps, dois volumes — não `deploy.replicas: 2`):

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

A densidade dentro do processo (compressão fora do isolate HTTP) está em [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Um cluster lógico em estado duradouro partilhado está em [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Erros regionais do Gemini dentro do Docker

O Google AI Studio / Gemini API pode devolver HTTP 400 com FAILED_PRECONDITION e
`User location is not supported for the API use.` Um pedido bem-sucedido no anfitrião
não comprova que o contentor utiliza a mesma rota de saída. A ordenação do DNS,
a conectividade IPv4/IPv6, o encaminhamento da VPN e os proxies configurados podem diferir. Consulte
[as regiões suportadas pela Google](https://ai.google.dev/gemini-api/docs/available-regions),
bem como a rota de ligação efetiva; este erro, por si só, não identifica uma chave de API inválida.

### Prefira um proxy específico da ligação

Utilize a [configuração de proxy por ligação](../ops/PROXY_GUIDE.md#4-level-proxy-system)
do OmniRoute para a ligação Gemini afetada e, em seguida, repita **Testar ligação** e um pequeno pedido
com o mesmo modelo. Isto mantém a alteração de encaminhamento limitada a essa ligação. Confirme
que o proxy está acessível a partir do contentor e que a ligação o seleciona efetivamente.
Alterar a rota não garante a elegibilidade regional no serviço a montante.

### Compare a rede do anfitrião e do contentor

Mantenha a chave, o modelo e o pedido idênticos ao comparar resultados autenticados; nunca
inclua credenciais, palavras-passe de proxy ou cabeçalhos de autorização completos numa ocorrência.
Comece por verificar que famílias de endereços são disponibilizadas pelo resolvedor do sistema operativo, utilizando o mesmo comando
no anfitrião e dentro do contentor:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Substitua `omniroute` pelo serviço que executa (por exemplo, `omniroute-web`). Estes
comandos apresentam as famílias de endereços sem credenciais nem endereços IP. Um valor `6`
devolvido apenas indica um resultado DNS IPv6: **não** comprova a existência de uma rota IPv6 utilizável nem de acesso à API.
Quando o `curl` estiver instalado, compare `curl -4 -I https://generativelanguage.googleapis.com`
com `curl -6 -I https://generativelanguage.googleapis.com` em ambos os ambientes.
Uma resposta HTTP comprova a conectividade para esse teste, mesmo que seja um erro
sem autenticação; apenas o pedido autenticado ao modelo testa a elegibilidade do Gemini.

### Alternativa ao nível do anfitrião: IPv6 funcional e política do resolvedor

O autor da ocorrência [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) restaurou
o acesso no seu ambiente ao ativar o IPv6 do contentor e alterar a seleção de endereços
da glibc. Considere esta opção como uma alternativa específica do ambiente. Confirme o funcionamento do IPv6
no anfitrião, o encaminhamento/tráfego de saída do contentor e as regras da firewall antes de ajustar as preferências do resolvedor.
Um endereço ULA privado, por si só, não estabelece conectividade IPv6 pública.

Para serviços já ligados à rede predefinida do Compose, este fragmento ativa
o IPv6 nessa rede; mantenha o restante serviço, portas, volumes e configuração:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para uma rede com nome, ative-o na rede à qual o serviço está efetivamente ligado. O Docker pode
atribuir uma sub-rede ULA; selecione uma sub-rede explícita e sem sobreposições apenas quando a sua rede
assim o exigir. Consulte [Redes IPv6 do Docker](https://docs.docker.com/engine/daemon/ipv6/)
e [Opções de rede do Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Numa **imagem baseada em glibc**, `/etc/gai.conf` pode alterar a seleção de endereços. O Dockerfile atual
do repositório utiliza Debian; as imagens personalizadas baseadas em musl não utilizam este mecanismo.
O ajuste comunicado altera a etiqueta ULA de `label fc00::/7 6` para
`label fc00::/7 1`. Comece pela tabela de políticas completa da imagem e preserve as outras
entradas: adicionar uma entrada `label` ou `precedence` substitui essa tabela predefinida, pelo que um ficheiro
que contenha apenas a linha alterada é insuficiente. A
[referência de configuração da glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenta esta semântica. Monte o ficheiro revisto como um bind mount só de leitura em `/etc/gai.conf`
e recrie o serviço para aplicar a alteração.

Isto altera a seleção de endereços do sistema operativo para **todo o tráfego de saída desse contentor**.
Não obriga todas as aplicações a escolher IPv6: a ordem DNS e a seleção de ligações
do Node também são relevantes. Em particular, `--dns-result-order=ipv4first` dá preferência ao IPv4 e
não resolve uma falha exclusiva do IPv4. Consulte [Ordenação DNS do Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Volte a testar o Gemini e os outros fornecedores após qualquer alteração ao nível do anfitrião. Para reverter,
remova o bind mount personalizado de `gai.conf`, restaure a configuração de rede anterior e
recrie o serviço/rede afetado durante uma janela de manutenção. Recriar uma rede
pode interromper outros contentores ligados à mesma; não elimine o volume de dados persistente.

## Notas Importantes

- **Modo WAL do SQLite:** deve permitir que `docker stop` termine, para que o OmniRoute possa efetuar um checkpoint das alterações mais recentes em `storage.sqlite`. Os ficheiros Compose incluídos já definem um período de tolerância de 40s para a paragem. Se executar a imagem diretamente, mantenha `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** defina como `true` se as cópias de segurança regulares/anteriores à escrita forem geridas externamente. As migrações de bases de dados existentes continuam a exigir um snapshot de segurança duradouro e um mecanismo de proteção para migrações em massa.
- **Persistência de Dados:** monte sempre um volume em `/app/data` para manter a base de dados, as chaves e as configurações entre reinícios do contentor.
- **Configuração da Porta:** substitua a variável de ambiente `PORT` para alterar a porta predefinida `20128`.

## Consulte Também

- [Guia de Implementação em VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuração de VM + nginx + Cloudflare
- [Guia de Implementação no Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Implementar no Fly.io
- [Configuração do Ambiente](../reference/ENVIRONMENT.md) — Referência completa do `.env`
