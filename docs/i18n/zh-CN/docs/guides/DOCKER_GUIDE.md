# 🐳 Docker Guide — OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> 完整的 Docker 部署参考。如需快速开始，请参阅 [README 的 Docker 部分](../README.md#-docker)。

## 目录

- [快速运行](#quick-run)
- [使用环境文件](#with-environment-file)
- [Docker Compose](#docker-compose)
- [可用配置文件](#available-profiles)
- [当 OmniRoute 在 Docker 中运行时配置主机 CLI 工具](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [生产环境 Compose](#production-compose)
- [Dockerfile 阶段](#dockerfile-stages)
- [关键环境变量](#critical-environment-variables)
- [使用 Caddy（HTTPS）的 Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare 快速隧道](#cloudflare-quick-tunnel)
- [镜像标签](#image-tags)
- [可用性：默认 SQLite 仅支持单副本](#availability-default-sqlite-is-single-replica)
- [Docker 内部的 Gemini 区域错误](#gemini-regional-errors-inside-docker)
- [重要说明](#important-notes)

---

## 快速运行

> **想用一条命令完成自托管？** 请参阅
> [自托管指南](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d`（已发布的镜像 +
> Redis、仅监听环回地址、无需选择配置文件）。下面的快速运行方式适用于
> 已在其他位置运行 Redis 的用户，以单容器方式启动。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 使用环境文件

```bash
# 首先复制并编辑 .env
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
# 基础配置文件（无 CLI 工具）
docker compose --profile base up -d

# CLI 配置文件（内置 Claude Code、Codex、OpenClaw）
docker compose --profile cli up -d

# 主机配置文件（优先支持 Linux；以只读方式挂载主机 CLI 二进制文件）
docker compose --profile host up -d

# Web 配置文件（为 Web 会话提供者提供 Chromium/Playwright）
docker compose --profile web up -d

# 组合使用 CLI 与 CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## 可用配置文件

OmniRoute 为主要部署形式提供了 Compose 配置文件。请选择与您的环境相匹配的配置文件。

| 配置文件       | 服务             | 适用场景                                                                                                                        | 命令                                         |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`（默认） | `omniroute-base` | 无头服务器/最小化运行环境，不捆绑提供者 CLI                                                                                     | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | 调用 `omniroute providers/setup/doctor` 和捆绑 CLI（Codex、Claude Code、Droid、OpenClaw）的代理式工作流                         | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | 希望通过以只读方式挂载 `~/.local/bin`、`~/.codex`、`~/.claude` 等目录，使主机 CLI 获得类似 `network_mode` 访问能力的 Linux 主机 | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | 在端口 `8317` 上运行 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar，以代理上游 CLI                        | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | 需要浏览器的 Web 会话提供者：`gemini-web`、`claude-web`、`claude-turnstile`（构建 `runner-web`，包含 Chromium）                 | `docker compose --profile web up -d`         |

> 可以组合使用多个配置文件：`docker compose --profile cli --profile cliproxyapi up -d`。

## OmniRoute 在 Docker 中运行时配置主机 CLI 工具

`omniroute setup-codex`、`setup-claude`、`config set <tool>` 以及仪表板上的
**保存配置**按钮都会写入类似 `~/.codex/*.config.toml` 的文件。这些路径
仅在实际运行 CLI 的机器上有意义。如果在容器内运行这些命令，文件将写入
容器自身的主目录（`/home/node`——该镜像以 `USER node` 运行），主机上的 CLI
永远不会读取这里的文件，而且容器一旦重新创建，这些文件就会被丢弃。

OmniRoute 会检测这种情况并拒绝写入，同时提供操作说明，而不是报告一次
实际无法使用的成功操作：CLI 会以状态码 `2` 退出，API 则返回 `422`，
并附带 `containerEphemeralTarget: true`。

### 推荐方式：在主机上运行 CLI，在 Docker 中运行 OmniRoute

容器负责提供 API；CLI 负责配置主机上的工具。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # 将 CLI 指向容器
omniroute setup-codex                      # 写入主机上真正的 ~/.codex
```

当 Codex、Claude Code、Cursor 或类似工具运行在笔记本电脑上时，这是正确的选择——
这也是最常见的配置方式。

### 备选方式：绑定挂载主机配置目录（`host` 配置文件）

如果希望由容器本身写入主机配置，请挂载相应目录，并将
`CLI_CONFIG_HOME` 指向挂载根目录。`host` 配置文件已经完成了此项设置：

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

绑定挂载使该路径变得可信：OmniRoute 会读取
`/proc/self/mountinfo`，并允许写入已挂载的路径（以及其子目录为挂载点的目录，
这正是上述 `/host-home` 的结构），同时仍会拒绝写入未挂载的路径。

### 应急方式：配置容器自身的 CLI（请谨慎使用）

当 CLI 确实位于容器内部（即 `cli` 配置文件）时，这类写入是有意进行的。
向任何 `setup-*` 命令传递 `--allow-container-write`，或为服务器设置
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`。写入将继续进行，但系统会警告
相关内容无法在容器重新创建后保留。

> **安全警告——`cli` 配置文件与 `docker.sock` 挂载。**
> `cli` 配置文件会绑定挂载 `/var/run/docker.sock`，以便容器内的
> 自动更新程序能够通过主机守护进程重新创建整个服务栈
> （`src/lib/system/autoUpdate.ts` 会探测该套接字，并在它不存在时跳过
> Docker 路径）。该套接字是**主机 root 权限的信任边界**：
> 任何能够访问它的程序都能以 root 身份操控主机 Docker 守护进程——
> 它可以创建、检查、停止和删除主机上的任意容器。具体影响如下：
>
> 1. **切勿将 `cli` 配置文件的端口暴露到网络。**请将其发布到
>    `127.0.0.1`（`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`）
>    ——如果局域网能够访问 `cli` 配置文件，任何仪表板级别的 RCE
>    都会演变为主机完全失陷。
> 2. **不要将任何额外的主机目录绑定到 `cli` 配置文件中。**
>    Docker 套接字与任何额外挂载相结合，都会使容器能够完整读写
>    你的文件系统和主机配置。如果需要让工具访问某个项目，请使用
>    CLI 二进制文件在本地运行该工具——不要将项目挂载到 `cli` 容器中。
>
> 如果不需要容器内自动更新，请不要启用 `cli` 配置文件
> （使用 `COMPOSE_PROFILES=core,redis` 或更简短的设置）。其他配置文件
> 不会挂载 Docker 套接字。
>
> 有关 MITM 的相关威胁模型，请参阅 `docs/security/MITM-TPROXY-DECRYPT.md`
> （位于 git 中；未编译到 `/docs`）；有关
> `codex`/`claude-code`/`droid`/`openclaw` 二进制文件的来源链，
> 请参阅 `docs/security/SUPPLY_CHAIN.md`。

## Redis 边车服务

OmniRoute 依赖 Redis 为分布式速率限制器和共享缓存提供支持。`redis` 服务在 `docker-compose.yml` 中**始终有定义**（不受任何 profile 限制），并会与其他任意 profile 一同启动。

| 详细信息           | 值                                      |
| ------------------ | --------------------------------------- |
| 镜像               | `redis:7-alpine`                        |
| 容器名称           | `omniroute-redis`                       |
| 内部端口           | `6379`                                  |
| 主机端口（可覆盖） | `REDIS_PORT`（默认为 `6379`）           |
| 主机绑定（可覆盖） | `REDIS_BIND_HOST`（默认为 `127.0.0.1`） |
| 数据卷             | `omniroute-redis-data` → `/data`        |
| 健康检查           | `redis-cli ping`（间隔 10 秒）          |

相关环境变量：

- `REDIS_URL` — 注入应用的连接字符串（默认为 `redis://redis:6379`）。
- `REDIS_PORT` — Redis 容器的主机端端口映射。
- `REDIS_BIND_HOST` — 发布端口所绑定的主机网络接口。默认为 `127.0.0.1`。

> **为何默认绑定到环回地址：**该边车服务运行时未配置 `requirepass`，而应用
> 容器通过 compose 网络（`redis:6379`）访问它——发布端口仅供主机端工具使用
> （例如 `redis-cli`、本地运行的 `npm run dev`）。发布到 `0.0.0.0`
> 会将未经身份验证的 Redis 暴露给局域网中的所有主机。如果设置
> `REDIS_BIND_HOST=0.0.0.0`，还应在该服务的 `command:` 中添加 `--requirepass`。

不建议**禁用 Redis**（速率限制器将降级为内存回退实现）。如确有需要，可以删除或注释掉 `docker-compose.yml` 中的 `redis:` 服务块，或者将其扩缩容为零：

```bash
docker compose up -d --scale redis=0
```

## 生产环境 Compose

如需运行一个与开发环境并存、相互隔离的生产环境快照，请使用 `docker-compose.prod.yml`。

| 详细信息       | 值                                                                                 |
| -------------- | ---------------------------------------------------------------------------------- |
| 文件           | `docker-compose.prod.yml`                                                          |
| 默认仪表板端口 | `PROD_DASHBOARD_PORT=20130`（映射到内部 `${DASHBOARD_PORT:-20128}`）               |
| 默认 API 端口  | `PROD_API_PORT=20131`                                                              |
| 镜像           | `omniroute:prod`（从 `runner-cli` 目标构建）                                       |
| Redis 容器     | `omniroute-redis-prod`（`redis:8.6.2`，使用专用的 `redis-prod-data` 数据卷）       |
| 数据卷         | `omniroute-prod-data`（命名数据卷，重新构建后仍会保留）                            |
| 健康检查       | `node healthcheck.mjs` + `redis-cli ping`，并通过 `depends_on` 等待 Redis 健康就绪 |

使用方法：

```bash
# 构建并启动生产环境栈
docker compose -f docker-compose.prod.yml up -d --build

# 实时查看日志
docker compose -f docker-compose.prod.yml logs -f

# 停止并移除栈（保留数据卷）
docker compose -f docker-compose.prod.yml down
```

生产环境栈可以与开发环境 compose 并行运行（使用不同的容器名称、端口和数据卷），因此你可以在生产环境持续运行的同时，继续在本地进行迭代开发。

## Dockerfile 阶段

该仓库提供了一个多阶段 Dockerfile（`Dockerfile`）。其中公开了四个阶段；请根据你的使用场景选择合适的 `target`。

| 阶段          | 基础镜像              | 用途                                                                                                                                                                                                                                       |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | 安装依赖（`npm ci --legacy-peer-deps`）并运行 `npm run build`（默认使用 Turbopack——参见下方的构建时资源）                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | 包含 Next.js 独立输出的生产运行时。**不捆绑任何提供者 CLI。**                                                                                                                                                                              |
| `runner-cli`  | `runner-base`         | 添加 `git`、`docker.io`、`docker-compose` 以及全局 CLI：`@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw`。**智能体工作流请选择此阶段。**                                                                                  |
| `runner-web`  | `runner-base`         | 添加 Playwright 和 Chromium 浏览器（`--with-deps`），用于以下 Web 会话提供者：`gemini-web`、`claude-web`、`claude-turnstile`。**使用这些提供者时请选择此阶段**——普通镜像缺少这些组件时会在请求时失败（参见发布渠道下有关 `-web` 的说明）。 |

手动构建特定目标：

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### 构建时资源

有三个构建参数控制 `builder` 阶段的资源开销。它们仅在构建时生效——
`OMNIROUTE_MEMORY_MB`（见下文）是一个独立的运行时调节参数。

| 构建参数                    | 默认值 | 作用                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` 使用 webpack 构建：内存峰值较低，但速度较慢。`1` 则启用 Turbopack。       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | 为生成的 `next build` 设置 V8 堆上限（`--max-old-space-size`）。              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | 传递给 `CIRCLE_NODE_TOTAL`；Next 据此为页面数据收集推导出 `workers = N - 1`。 |

在配置较高的构建器上，`OMNIROUTE_BUILD_WORKERS` 是应当调高的参数；而当资源受限的构建在
`✓ Compiled successfully` **之后**失败时，也应优先怀疑此参数。每个
页面数据 worker 都是一个独立进程，父级 `next build` 本身也是如此；
一次真实的 VPS 复现（issue #7518）测得，每个进程的 RSS 峰值约为
4.5 GB，且不受 `NODE_OPTIONS` 堆标志影响（Turbopack 在
V8 堆之外的原生/Rust 内存中进行编译）。默认值 `2`（→ 1 个 worker，共 2 个
进程）是根据发布流水线所使用的 16 GB / 4 vCPU GitHub 托管运行器来设定的。
设为 `8`（→ 7 个 worker）时，该运行器耗尽了内存，buildkit 以
`ResourceExhausted: ... cannot allocate memory` 终止了该步骤；
在直接测量而非推算每个进程的 RSS 后，发现 `3`（→ 2 个 worker）仍然无法容纳。
`tests/unit/docker-build-memory-budget.test.ts`
会根据实测数据进行计算；如果任一参数超出运行器的承受范围，测试就会失败。

Turbopack 在位于 V8 堆**之外**的原生 Rust 内存中进行编译，因此
`OMNIROUTE_BUILD_MEMORY_MB` 无法限制其内存使用量。在设置了内存上限的主机上，
构建随后会被 OOM killer 通过 SIGKILL 终止，并且完全不会显示错误文本——它只会
在 `Creating an optimized production build` 过程中停止，因此看起来更像是卡住，
而不是内存不足。这就是为什么 `Dockerfile` 默认使用 webpack
（`OMNIROUTE_USE_TURBOPACK=0`），这与 `npm run dev` / `npm run build` 不同；
对于后两者，代码默认使用 Turbopack：不带任何构建参数的普通 `docker build .`
（Railway 和其他一键式托管平台采用的方式）不应在有内存限制的构建器上无声失败。
已发布的镜像已经在 `docker-publish.yml` 中显式传递了
`OMNIROUTE_USE_TURBOPACK=0`。在拥有充足 RAM 的构建器上，可以启用
Turbopack 以加快构建速度：

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` 已启用，因此 `next build` 会运行一个父进程**以及**一个 worker
进程，且每个进程都会单独遵循 `OMNIROUTE_BUILD_MEMORY_MB`。容器内存上限应设置为
该值的大约两倍以上，而不是仅设置为该值。

在此代码树上测得（`--target runner-base`，`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| 打包器    | 容器内存上限   | 结果                        |
| --------- | -------------- | --------------------------- |
| Turbopack | 8 GiB / 16 GiB | 两种情况下均被 OOM 无声终止 |
| webpack   | 8 GiB          | 构建 worker 被 SIGKILL 终止 |
| webpack   | 12 GiB         | 成功，峰值为 11.1 GiB       |

### 运行时默认值

`runner-base` 导出的默认值：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker 中的内存行为：

- 该镜像设置了 `OMNIROUTE_MEMORY_MB=1024`，并由此派生出 `NODE_OPTIONS=--max-old-space-size=1024`。
- 实际的服务器进程由独立启动器启动；该启动器读取 `OMNIROUTE_MEMORY_MB`，并追加 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`。
- Node 会使用最后一个重复的 `--max-old-space-size` 值，因此设置 `OMNIROUTE_MEMORY_MB` 即可控制 Docker 中实际生效的堆限制。
- 由于镜像始终会设置该值，因此在 Docker 下，启动器自身根据 RAM 校准的回退机制永远不会生效。请根据工作负载显式提高该值（见下表）。对于编码智能体的 `/v1/responses`，`2048` 仍然太小。

### 编码智能体的运行时 RAM

Docker 默认的 1 GiB 只是仪表板/轻量聊天场景的最低配置，并不适用于生产环境。较长的 `POST /v1/responses` 请求体（数百条消息、数十个工具）会在压缩期间将多个内存图保留在内存中。两个重叠的约 3 MiB / 约 750k-token 请求曾在 **12 GiB** 老生代空间下导致 V8 中止（`FATAL ERROR: Reached heap limit`），也曾触发 16 GiB cgroup OOM。参见 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。

请将 **cgroup `--memory` 设置为高于堆大小**——原生缓冲区、SQLite 和压缩中间数据位于 V8 堆之外。

| 工作负载                            | `OMNIROUTE_MEMORY_MB` | 容器 / cgroup       | 备注                                                                               |
| ----------------------------------- | --------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| 仪表板、一个轻量聊天会话            | `1024`（镜像默认值）  | ≥2 GiB              |                                                                                    |
| 一个编码智能体（Claude/Codex/Grok） | `8192`                | ≥10 GiB             | 典型的单会话 `/v1/responses`                                                       |
| 两个并发的长 `/v1/responses`        | `10240`–`12288`       | ≥12–16 GiB          | 实测在约 12 GiB 堆大小时 V8 中止                                                   |
| 三个或更多并发长上下文              | 不要在单进程中运行    | 串行处理 / 更多 RAM | 默认重量级准入限制为 1 个进行中请求；在没有更多 RAM 的情况下提高该值会再次导致中止 |

当 `OMNIROUTE_MEMORY_MB` **未设置**时，裸机上的 `omniroute serve` 会校准为 RAM 的约 35%（限制在 `[512, 4096]` 范围内）。Docker 始终将其设置为 `1024`，因此官方镜像中永远不会执行该校准。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 关键环境变量

除了 [ENVIRONMENT.md](../reference/ENVIRONMENT.md) 中记录的默认值之外，在 Docker 下运行时，以下变量最为重要：

| 变量                          | 用途                                                                                                                                                                                                          | 默认值                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket 桥接器的共享密钥。**生产环境中必需**——请将其设置为高强度随机字符串。                                                                                                                                | 未设置（必须提供）     |
| `REDIS_URL`                   | 速率限制器/缓存后端的连接字符串                                                                                                                                                                               | `redis://redis:6379`   |
| `REDIS_PORT`                  | 捆绑的 Redis 容器所使用的主机端口                                                                                                                                                                             | `6379`                 |
| `REDIS_BIND_HOST`             | 发布捆绑 Redis 端口的主机接口（除非添加 AUTH，否则应使用环回接口）                                                                                                                                            | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 挂载到 `cli` 配置文件中 `/workspace/omniroute` 路径的主机目录，用于自更新工作流                                                                                                                               | `.`（当前目录）        |
| `OMNIROUTE_MEMORY_MB`         | Docker 独立服务器运行时的 Node 堆内存上限；会覆盖上文所述的镜像默认值。编码智能体：`8192`+（参见[运行时 RAM](#runtime-ram-for-coding-agents)）。                                                              | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | 覆盖仪表板（20128）和 API（20129）的对外暴露端口                                                                                                                                                              | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose 用于发布仪表板/API/实时 WS 端口的主机接口。当 `REQUIRE_API_KEY=false`（默认值）时，`0.0.0.0` 会将匿名 `/v1` 代理暴露到局域网——仅应在设置 `REQUIRE_API_KEY=true` 或前置反向代理时扩大监听范围。 | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose 用于发布 `cliproxyapi` 边车服务的主机接口——其数据卷中存储着提供者凭据。                                                                                                                        | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | 运行时插件扫描器读取插件并将其安装到其中的目录。通过绑定挂载插件时应设置此变量：默认值取决于 `HOME`，而镜像不一定会导出该变量。                                                                               | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | 应用发布在反向代理后方时所使用的 URL 子路径（例如 `/omniroute`）                                                                                                                                              | _（空值 = 根路径）_    |
| `NEXT_PUBLIC_BASE_URL`        | 包含子路径的公共浏览器源地址（例如 `https://host/omniroute`）                                                                                                                                                 | 未设置                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` 的主机端仪表板端口                                                                                                                                                                  | `20130`                |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` 边车服务的主机端口                                                                                                                                                                              | `8317`                 |

## 子路径上的反向代理（Traefik / nginx）

Next.js 的 `basePath` 会被编译到独立包中。OmniRoute 会将构建时写入的值记录在应用根目录的哨兵文件中（在 `npm run build` 期间写入；由 `scripts/docker/ensure-docker-base-path.mjs` 读取），并在容器启动时将其与 `OMNIROUTE_BASE_PATH` 进行比较。当两者不一致且镜像是为域名根路径构建时，入口点会在 `node dev/run-standalone.mjs` 运行之前重写独立包清单、嵌入的 `basePath`/`assetPrefix` 字面值（Next 16 仅根据 `assetPrefix` 渲染 SSR 资源 URL——修补程序会将子路径同步到其中）、构建时写入的 `/_next/static` 资源 URL（客户端引用清单、媒体导入、预渲染错误页面）以及客户端 `process.env` shim。

### Compose 构建（推荐）

在 `.env` 中设置这两个变量，然后重新构建，使镜像与运行时配置保持一致：

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` 会将 `OMNIROUTE_BASE_PATH` 同时作为 Docker 构建参数和运行时环境变量进行传递。

### 预构建的根路径镜像 + 运行时子路径

已发布的 `diegosouzapw/omniroute:*` 镜像是为域名根路径构建的。你仍然可以在运行时设置 `OMNIROUTE_BASE_PATH`；容器会在启动时对独立包进行一次修补。请同时配置匹配的公共源地址：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

配置反向代理以转发**完整的**外部路径（不要移除前缀）。Traefik 应将 `PathPrefix(`/omniroute`)` 路由到容器，并且不使用 `StripPrefix`，这样 Next.js 就会接收到 `/omniroute/...`，并从 `/omniroute/_next/...` 提供资源。

Docker 健康检查会探测带有当前 `OMNIROUTE_BASE_PATH` 前缀的轻量级 `/healthz` 生命周期端点。`/api/monitoring/health` 仍可用于人工或仪表板诊断；若要让容器的 HEALTHCHECK 重新指向该端点（例如用于强制执行深度健康检查），请设置 `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`。该路径执行的是**深度**检查（数据库 + 监控摘要）——如果你选择重新启用，它适用于 Docker 低频率的 `HEALTHCHECK`，但**不适合** Kubernetes `livenessProbe` 的探测间隔。

对于编排器（Kubernetes、Nomad 等）：

| 探针            | 推荐                                                          | 避免                                               |
| --------------- | ------------------------------------------------------------- | -------------------------------------------------- |
| 存活探针        | HTTP `GET /livez`，或主端口上的 TCP（`PORT`，默认为 `20128`） | 将 `/api/monitoring/health` 用作存活探针           |
| 就绪探针        | HTTP `GET /healthz`                                           | 使用过短的超时时间，将事件循环繁忙误判为进程已停止 |
| 深度 / 黑盒探针 | `/api/monitoring/health`                                      | —                                                  |

`/healthz` 报告进程生命周期状态（`ok` / `starting` / `stopping`）。`/livez` 仅检查进程是否存活（只要处理程序能够运行便返回 200；它不会等待就绪状态）。二者仍与请求处理运行在同一个 Node 事件循环中，因此受 CPU 限制的目录处理或压缩工作可能会延迟其响应——繁忙 ≠ 已停止。如果 HTTP 探针超时，请优先使用 TCP 存活探针。完整的探针指南：
[监控指南——Kubernetes 探针建议](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## 使用 Caddy 的 Docker Compose（HTTPS 自动 TLS）

可使用 Caddy 的自动 SSL 配置功能安全地公开 OmniRoute。请确保域名的 DNS A 记录指向服务器的 IP。

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
      # 面向浏览器的源站，用于 OAuth 回调、仪表板链接和生成的公共 URL。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # 用于计划任务和内部请求的服务器间内部 URL。
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

Caddy 会为上游容器设置标准的转发标头。OmniRoute 将
`NEXT_PUBLIC_BASE_URL` 用作 OAuth 回调和生成公共链接的规范公共源站；
经过身份验证的仪表板写入请求使用同源请求以及与会话绑定的 CSRF
保护。只有在高级部署中，确实希望 OmniRoute 从受信任的转发标头而非显式
配置中推导公共源站时，才应启用 `OMNIROUTE_TRUST_PROXY`。

## Cloudflare 快速隧道

Docker 部署的仪表板支持在 `Dashboard → Endpoints` 中一键启用 **Cloudflare 快速隧道**。首次启用时，仅在需要时下载 `cloudflared`，启动一条指向当前 `/v1` 端点的临时隧道，并在常规公共 URL 正下方显示生成的 `https://*.trycloudflare.com/v1` URL。

可在 `Settings → Appearance` 中显示或隐藏端点隧道面板（Cloudflare、Tailscale、ngrok），而不会改变隧道的活动状态。

### 隧道说明

- 快速隧道 URL 是临时的，每次重启后都会更改。
- OmniRoute 或容器重启后，不会自动恢复快速隧道。需要时请在仪表板中重新启用。
- 托管安装目前支持 Linux、macOS 和 Windows 上的 `x64` / `arm64`。
- 托管快速隧道默认使用 HTTP/2 传输，以避免在资源受限的容器环境中出现大量 QUIC UDP 缓冲区警告。如果需要其他传输方式，请将 `CLOUDFLARED_PROTOCOL` 设置为 `quic` 或 `auto`。
- Docker 镜像捆绑了系统 CA 根证书，并将其传递给托管的 `cloudflared`，从而避免隧道在容器内启动时发生 TLS 信任失败。
- 如果希望 OmniRoute 使用现有二进制文件而不是下载文件，请设置 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`。

## 镜像标签

| 镜像                     | 标签     | 大小   | 描述                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 已**发布**的最高稳定 SemVer（而非 git `main`） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | 对于 GitOps，请固定使用此类标签                |

多平台清单：原生支持 `linux/amd64` + `linux/arm64`（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker 会自动选择匹配的架构；如果需要在 ARM 主机上强制使用 AMD64 模拟，请传递 `--platform linux/amd64`。

### 发布渠道

OmniRoute 为稳定版本、活跃发布分支测试和开发构建发布不同的 Docker 渠道。

| 渠道                            | 来源                         | 可变性             | 推荐用途                                                                                   |
| ------------------------------- | ---------------------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | 已签名/带版本号的发布版本    | 不可变             | 固定使用确切发布版本的生产部署                                                             |
| `:latest` / `:latest-web`       | 已**发布**的最高稳定 SemVer  | 可变的稳定版指针   | 在 SemVer 发布任务完成**后**跟随稳定版本——**不会**跟踪 `main` 或未发布的 `release/v*` 提交 |
| `:next` / `:next-web`           | 当前默认的 `release/v*` 分支 | 可变的预发布版指针 | 测试已合并到活跃发布分支、但尚未包含在稳定版本中的修复                                     |
| `:main` / `:main-web`           | `main` 分支                  | 可变的开发版指针   | 仅用于开发和集成测试                                                                       |

#### Web 会话提供者：`-web` 镜像

上述每个渠道都对应一个 `-web` 标签（`:latest-web`、`:<version>-web`、`:next-web`、`:main-web`），这些标签基于 `runner-web` 阶段构建——即相同镜像外加 Playwright 和 Chromium 浏览器。普通镜像**不包含** Chromium；`gemini-web`、`claude-web` 和 `claude-turnstile` 需要它。

故障会延迟到请求时发生，而非启动时：这些提供者会列出其模型，并在仪表板中显示为已连接，只有首次请求会失败并显示：

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

如果使用这些提供者，请拉取当前所用渠道的 `-web` 标签——其他内容无需更改。对于 npm/CLI 安装（不使用 Docker 镜像），缺少的对应组件是浏览器二进制文件：请在主机上运行 `npx playwright install chromium`。

#### 使用预发布渠道

`next` 渠道会在每次推送到当前默认的 `release/v*` 分支时重新构建，并同时发布 AMD64 和 ARM64 镜像。较旧的维护分支无法覆盖它。该渠道提供可拉取的镜像，其中包含已合并到活跃发布分支、但尚未包含在下一个稳定标签中的修复。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

对于 Docker Compose，请覆盖所选配置文件使用的镜像标签，然后拉取并重新创建服务：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 安全性与回滚

`next` 是一个浮动的预发布渠道。活跃发布分支上的任何推送都可能使其发生变化，并且**不支持用于生产环境**。在评估特定构建时，请固定镜像摘要：

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

测试前，请备份 OmniRoute 数据卷或以绑定方式挂载的数据目录。若要回滚，请恢复到先前使用的稳定版本或摘要，并重新创建容器：

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

发布分支构建绝不会更新 `latest`；只有符合条件的稳定语义化版本才能推进稳定版本指针。`next` 镜像仍会进行发布镜像检查，并通过用于阻止存在 CRITICAL 级别漏洞的门禁。

**`latest` 并不保证与 git 保持同步。** 合并到 `main` 或活跃 `release/v*` 分支中的修复，在稳定的 SemVer 镜像发布且发布作业推进 `:latest`（其摘要与该 SemVer 相同）之前，**不会**出现在 `:latest` 中。如果 GitHub 已显示该修复，但 `latest` 看起来仍未更新，请拉取 `:next` 以测试发布分支，或等待 SemVer 标签发布。

| 您的需求                                           | 使用方式                      |
| -------------------------------------------------- | ----------------------------- |
| 不允许发生漂移的 GitOps / 生产环境                 | 固定为 `:X.Y.Z`（或镜像摘要） |
| 跟随已发布的稳定版本，并接受每次发布时重新创建容器 | `:latest`                     |
| 测试尚未发布的 `release/v*` 提交                   | `:next`（非生产环境）         |
| 测试 `main`                                        | `:main`（非生产环境）         |

## 可用性：默认 SQLite 仅支持单副本

标准 Docker / Kubernetes OmniRoute 拓扑为 **一个 Node 进程 + 一个 SQLite 写入器**。此拓扑**不支持**高可用性。

| 约束                               | 后果                                                                                                                                                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 单写入器                           | **不要**让多个副本使用同一个 SQLite 文件。这会损坏数据库。                                                                                                                                                                               |
| 重新创建 / 重启 / HEALTHCHECK 终止 | 正在进行的 SSE、仪表板会话和内存状态将**完全中断**。所有已连接的客户端都会断开。在无可用端点期间，新请求会收到反向代理返回的 **`502 Bad Gateway: Unknown error`**，而不是 OmniRoute JSON——客户端无法将其与提供者故障区分开来（#11015）。 |
| 与 `/healthz` 使用同一事件循环     | 繁忙的目录或压缩周期可能会延迟探测；较短的超时时间随后会导致**唯一的**副本重启。                                                                                                                                                         |

**探测矩阵**（另请参阅 [Kubernetes 探测建议](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)）：

| 探测                | 目标                                                                             | 请勿使用                                   |
| ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------ |
| 存活探测            | 对 `PORT`（默认值为 `20128`）执行 TCP 探测，或对 `/healthz` 执行宽松的 HTTP 探测 | `/api/monitoring/health`                   |
| 就绪探测            | HTTP `GET /healthz`                                                              | 将事件循环繁忙视为进程已终止的严格超时设置 |
| 深度检查 / 人工检查 | `/api/monitoring/health`                                                         | 自动化 kubelet 存活探测                    |

**升级：**预计所有会话都会断开。如果可以，请先排空客户端；默认 SQLite 不支持滚动更新。Compose `restart: unless-stopped` 与 Docker `HEALTHCHECK` 结合使用时，也会在容器处于不健康状态时替换唯一的进程——影响范围相同。

适用于**单副本**的 Kubernetes 片段（必须使用 Recreate；不要针对同一个 SQLite 文件增加 `replicas`）：

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

`preStop` 休眠使 kube 能够在 SIGTERM 之前移除 Service 端点，从而让**新**流量停止进入即将终止的进程。正在进行的 `/v1/responses` SSE 会通过重量级准入租约（#11015），在最长 `SHUTDOWN_TIMEOUT_MS`（默认 30 秒）的时间内进行排空。仍然到达该进程的新请求会收到 `503` + `Retry-After: 5`。在替代副本进入 Ready 状态之前，Recreate 造成的无可用端点间隙仍然属于硬中断——这是 SQLite 拓扑的固有限制，而不是探测配置错误。

外部 Postgres / 多写入器 HA **并非**有文档说明的标准路径。如果需要 HA，请保持单副本，或运行项目已单独测试并记录的拓扑。Postgres/MySQL 相关工作位于 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。在该功能发布之前，扩展**大型** `/v1/responses` 容量的唯一受支持方式是运行 N 个独立进程（见下一节），而不是在一个卷上设置 `replicas > 1`。

## 横向扩展：N 个独立进程

一个 Node 进程就是**一个 V8 堆**。两个重叠执行、约 3 MiB / 约 75 万 token 的编码智能体 `POST /v1/responses` 请求（RTK + Caveman），会在堆达到约 12 Gi 时将其中止（`FATAL ERROR: Reached heap limit`），并可能导致 16 Gi cgroup 发生 OOM。请参阅 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。该测量结果是一个**内存预算**警告，并不表示产品对并发长时 `/v1/responses` 请求设有两个的硬性上限。重量级聊天准入由自动推导的入口字节预算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`，`src/shared/middleware/admissionBudget.ts`）进行限制，该预算根据同一 V8/cgroup 上限确定——在已完成容量规划的进程上将其向上覆盖（或设置旧版 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 请求数上限）会再次导致进程中止。小型聊天、`/healthz`、`/v1/models` 和 MCP **不**受该上限约束。

### 单进程：超过两个长时 `/v1/responses`

一个**健康的**进程（堆使用率低于 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`，默认值为 `0.75`），在进程级在途字节预算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）仍有余量时，**可以**并发运行两个以上的长时 `POST /v1/responses` 请求。大小达到或超过 `OMNIROUTE_CHAT_LARGE_BODY_BYTES`（默认值为 256 KiB）的请求体，会与结构复杂的请求获取相同的重量级租约，并使用同一个 [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` 逃生通道（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）。数十个并发长时 SSE 客户端（运维人员通常需要 40–50 个）属于**内存预算**问题——需要规划堆 + 主槽位/余量槽位 + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`——而不是产品存在“最多 2 个”的硬性限制。堆面临压力时，系统仍会通过可重试的 `503` 拒绝请求，以避免 #7849 再次出现。

若要在**当前**实现中**增加多个堆**（相互独立的 V8 老生代空间）：

| 应该做                                                                                                  | 不应该做                                         |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 运行 **N 个容器/pod**，每个容器/pod 使用其**自己的** `DATA_DIR` / 卷                                    | 针对同一个 SQLite 文件设置 `replicas > 1`        |
| 根据堆 / 在途字节预算确定重量级在途请求数 + 健康余量；1–2 是针对 #7849 的保守默认值，而不是产品硬性上限 | 为一个进程分配 8 倍 RAM 并设置无上限的请求数限制 |
| 可选：使用 `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` 实现**共享配额计数器**                  | 将 Redis 视为共享 SQLite——它并不是               |
| 将提供者密钥复制到每个实例中（或接受彼此分离的仪表板）                                                  | 期望所有实例共用一个仪表板 / 一份调用日志        |
| 在前端使用任意负载均衡器；按 API 密钥或会话保持粘性即可                                                 | 要求使用特定供应商提供的、可感知请求大小的中间件 |

硬件方面：每个实例可并发处理多少个长时 `/v1/responses` 是一个**内存预算**问题（堆 + 在途字节 / #10110）。使用独立 `DATA_DIR` 的 `N` 个实例仍会产生多个堆：主机 RAM 必须能够容纳 `N × cgroup`，而不是“一个 16 Gi pod，且 N=8”。切勿让多个 `replicas > 1` 实例使用同一个 SQLite 文件。

Compose 示例（两个堆、两个卷——不要使用 `deploy.replicas: 2`）：

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

进程内密度（将压缩工作移出 HTTP isolate）请参阅 [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)。在共享持久化状态上构建单一逻辑集群请参阅 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。

## Docker 内的 Gemini 区域错误

Google AI Studio / Gemini API 可能返回 HTTP 400、FAILED_PRECONDITION 以及
`User location is not supported for the API use.`。主机上的请求成功
并不能证明容器使用相同的出站路由。DNS 排序、
IPv4/IPv6 连接、VPN 路由和已配置的代理都可能不同。请检查
[Google 支持的区域](https://ai.google.dev/gemini-api/docs/available-regions)
以及实际的连接路由；仅凭此错误无法认定 API 密钥有问题。

### 优先使用连接专用代理

为受影响的 Gemini 连接使用 OmniRoute 的[按连接配置代理](../ops/PROXY_GUIDE.md#4-level-proxy-system)，
然后使用相同模型再次执行 **Test Connection** 和一个小型请求。
这样可将路由变更限制在该连接范围内。请确认容器可以访问代理，
并且该连接确实选择了它。更改路由并不能保证上游区域符合使用条件。

### 比较主机与容器的网络

比较经过身份验证的结果时，请保持密钥、模型和请求完全相同；切勿
在问题报告中粘贴凭据、代理密码或完整的授权标头。
首先检查操作系统解析器提供哪些地址族，并在主机和容器内使用相同的命令：

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

将 `omniroute` 替换为您运行的服务（例如 `omniroute-web`）。这些
命令会输出地址族，而不会显示凭据或 IP 地址。返回 `6`
仅表示存在 IPv6 DNS 结果：它**不能**证明 IPv6 路由可用或能够访问 API。
如果安装了 `curl`，请在两个环境中比较
`curl -4 -I https://generativelanguage.googleapis.com` 与
`curl -6 -I https://generativelanguage.googleapis.com`。
HTTP 响应能够证明该探测请求的连接正常，即使它是未经身份验证的错误；
只有经过身份验证的模型请求才能测试 Gemini 的使用资格。

### 主机级替代方案：可用的 IPv6 和解析器策略

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) 的报告者通过启用容器 IPv6
并更改 glibc 地址选择，在其环境中恢复了访问。请将此视为特定于环境的替代方案。
在调整解析器首选项之前，请确认主机 IPv6 正常工作、容器出站连接/路由正常，
并检查防火墙规则。仅有私有 ULA 地址并不能证明具备公共 IPv6 连接能力。

对于已经连接到 Compose 默认网络的服务，以下片段可在该网络上启用
IPv6；请保留服务的其余设置、端口、卷和配置：

```yaml
networks:
  default:
    enable_ipv6: true
```

对于命名网络，请在服务实际加入的网络上启用该功能。Docker 可以
分配 ULA 子网；仅当您的网络需要时，才选择一个明确且不重叠的子网。
请参阅 [Docker IPv6 网络](https://docs.docker.com/engine/daemon/ipv6/)
和 [Compose 网络选项](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6)。

在**基于 glibc 的镜像**中，`/etc/gai.conf` 可以更改地址选择策略。当前
仓库的 Dockerfile 使用 Debian；自定义的基于 musl 的镜像并不采用此机制。
报告中的调整将 ULA 标签从 `label fc00::/7 6` 更改为
`label fc00::/7 1`。请以镜像的完整策略表为基础，并保留其中的其他
条目：添加 `label` 或 `precedence` 条目会替换该默认表，因此文件
仅包含更改后的行是不够的。
[glibc 配置参考](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
记录了这些语义。请以只读方式将审查过的文件绑定挂载到 `/etc/gai.conf`，
并重新创建服务以应用该文件。

这会更改该容器中**所有出站流量**的操作系统地址选择策略。
它并不会强制每个应用程序都选择 IPv6：Node 的 DNS 顺序和连接
选择也会产生影响。尤其需要注意，`--dns-result-order=ipv4first` 会优先选择 IPv4，
并不能解决仅通过 IPv4 连接时的故障。请参阅 [Node DNS 排序](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder)。

在进行任何主机级更改后，请重新测试 Gemini 和其他提供者。若要回滚，
请移除自定义 `gai.conf` 挂载，恢复之前的网络配置，并
在维护窗口期间重新创建受影响的服务/网络。重新创建网络
可能会中断连接到该网络的其他容器；请勿删除持久化数据卷。

## 重要说明

- **SQLite WAL 模式：** 应允许 `docker stop` 完成，以便 OmniRoute 将最新更改检查点回写到 `storage.sqlite`。随附的 Compose 文件已设置 40 秒的停止宽限期。如果直接运行镜像，请保留 `--stop-timeout 40`。
- **`DISABLE_SQLITE_AUTO_BACKUP`：** 如果例行备份/写入前备份由外部管理，请将其设置为 `true`。现有数据库的迁移仍然需要各自的持久安全快照和批量迁移保护措施。
- **数据持久化：** 始终将卷挂载到 `/app/data`，以便在容器重启后保留数据库、密钥和配置。
- **端口配置：** 覆盖 `PORT` 环境变量以更改默认的 `20128` 端口。

## 另请参阅

- [VM 部署指南](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare 设置
- [Fly.io 部署指南](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — 部署到 Fly.io
- [环境配置](../reference/ENVIRONMENT.md) — 完整的 `.env` 参考文档
