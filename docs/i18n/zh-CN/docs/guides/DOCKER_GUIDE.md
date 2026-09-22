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
- [Redis 边车](#redis-sidecar)
- [生产环境 Compose](#production-compose)
- [Dockerfile 阶段](#dockerfile-stages)
- [关键环境变量](#critical-environment-variables)
- [使用 Caddy（HTTPS）的 Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare 快速隧道](#cloudflare-quick-tunnel)
- [镜像标签](#image-tags)
- [可用性：默认 SQLite 仅支持单副本](#availability-default-sqlite-is-single-replica)
- [重要说明](#important-notes)

---

## 快速运行

> **想用一条命令自行托管？** 请参阅
> [自行托管指南](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d`（已发布的镜像 +
> Redis、仅限环回地址、无需选择配置文件）。下面的快速运行方式适用于
> 已在其他位置运行 Redis 的用户，是单容器运行方案。

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
# 基础配置文件（不含 CLI 工具）
docker compose --profile base up -d

# CLI 配置文件（内置 Claude Code、Codex、OpenClaw）
docker compose --profile cli up -d

# 主机配置文件（优先支持 Linux；以只读方式挂载主机 CLI 二进制文件）
docker compose --profile host up -d

# 组合使用 CLI 与 CLIProxyAPI 边车
docker compose --profile cli --profile cliproxyapi up -d
```

## 可用配置文件

OmniRoute 提供四个 Compose 配置文件。请选择与您的环境匹配的配置文件。

| 配置文件       | 服务             | 适用场景                                                                                                                    | 命令                                         |
| -------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`（默认） | `omniroute-base` | 无头服务器/最小运行时，不捆绑提供者 CLI                                                                                     | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | 调用 `omniroute providers/setup/doctor` 和捆绑 CLI（Codex、Claude Code、Droid、OpenClaw）的智能体工作流                     | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | 希望通过以只读方式挂载 `~/.local/bin`、`~/.codex`、`~/.claude` 等来获得类似 `network_mode` 的主机 CLI 访问能力的 Linux 主机 | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | 在端口 `8317` 上运行 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 边车，以进行上游 CLI 代理                  | `docker compose --profile cliproxyapi up -d` |

> 可以组合使用多个配置文件：`docker compose --profile cli --profile cliproxyapi up -d`。

## 当 OmniRoute 在 Docker 中运行时配置主机 CLI 工具

`omniroute setup-codex`、`setup-claude`、`config set <tool>` 以及仪表板中的
**保存配置**按钮都会写入类似 `~/.codex/*.config.toml` 的文件。这些路径
仅对 CLI 实际运行所在的机器有意义。如果在容器内运行这些命令，文件将被
写入容器自己的主目录（`/home/node`——该镜像以 `USER node` 运行），
主机上的 CLI 永远不会读取这些文件，而且容器一旦重新创建，它们就会被丢弃。

OmniRoute 会检测这种情况并拒绝写入，同时给出操作说明，而不会报告一个
实际无法使用的成功结果：CLI 将以状态码 `2` 退出，API 则会返回 `422`，
并包含 `containerEphemeralTarget: true`。

### 推荐方式：在主机上运行 CLI，在 Docker 中运行 OmniRoute

容器提供 API；CLI 则负责配置主机上的工具。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # 将 CLI 指向容器
omniroute setup-codex                      # 写入主机上真正的 ~/.codex
```

当 Codex、Claude Code、Cursor 或类似工具运行在笔记本电脑上时，这是正确的选择——
这也是最常见的配置方式。

### 替代方式：绑定挂载主机配置目录（`host` 配置文件）

如果希望容器本身写入主机配置，请挂载这些目录，并将 `CLI_CONFIG_HOME`
指向挂载根目录。`host` 配置文件已经完成了这些设置：

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

绑定挂载可确保路径可信：OmniRoute 会读取 `/proc/self/mountinfo`，
并允许写入已挂载的路径（以及子目录为挂载点的目录，这正是上述
`/host-home` 的结构），同时仍会拒绝写入未挂载的路径。

### 应急方案：配置容器自身的 CLI（谨慎使用）

当 CLI 确实位于容器内部（`cli` 配置文件）时，写入就是有意为之。
向任意 `setup-*` 命令传递 `--allow-container-write`，或为服务器设置
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`。写入将继续执行，
同时显示警告，说明这些内容无法在容器重建后保留。

> **安全警告——`cli` 配置文件与 `docker.sock` 挂载。**
> `cli` 配置文件会绑定挂载 `/var/run/docker.sock`，以便容器内的
> 自动更新程序通过主机守护进程重新创建该技术栈
> （`src/lib/system/autoUpdate.ts` 会探测该套接字，并在套接字不存在时
> 跳过 Docker 路径）。该套接字是**主机 root 权限的信任边界**：
> 任何能够访问它的程序都可以以 root 身份控制主机 Docker 守护进程——
> 它可以创建、检查、停止和删除主机上的任何容器。
> 这意味着：
>
> 1. **切勿将 `cli` 配置文件的端口暴露到网络。**请将其发布到
>    `127.0.0.1`（`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`）——
>    可从局域网访问的 `cli` 配置文件会让任何仪表板级别的 RCE
>    演变为主机被完全攻陷。
> 2. **不要将任何额外的主机目录绑定到 `cli` 配置文件中。**
>    Docker 套接字与任何额外挂载相结合，都会让容器对文件系统和主机配置
>    拥有完整的读写权限。如果需要让某个工具访问项目，请通过 CLI 二进制文件
>    在本地运行该工具——不要将项目挂载到 `cli` 容器中。
>
> 如果不需要容器内自动更新，请不要启用 `cli` 配置文件
> （使用 `COMPOSE_PROFILES=core,redis` 或更精简的设置）。其他配置文件
> 不会挂载 Docker 套接字。
>
> 有关 MITM 的相关威胁模型，请参阅 `docs/security/MITM-TPROXY-DECRYPT.md`
> （位于 git 中；未编译到 `/docs`）；有关
> `codex`/`claude-code`/`droid`/`openclaw` 二进制文件的来源链，
> 请参阅 `docs/security/SUPPLY_CHAIN.md`。

## Redis Sidecar

OmniRoute 依赖 Redis 来支持分布式速率限制器和共享缓存。`redis` 服务在 `docker-compose.yml` 中**始终有定义**（没有 profile 限制），并会与任何其他 profile 一同启动。

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
- `REDIS_PORT` — Redis 容器的主机侧端口映射。
- `REDIS_BIND_HOST` — 发布该端口的主机接口。默认为 `127.0.0.1`。

> **为何默认使用回环地址：** sidecar 运行时未设置 `requirepass`，而应用
> 容器通过 compose 网络（`redis:6379`）访问它——发布端口仅用于
> 主机侧工具（`redis-cli`、本地 `npm run dev`）。发布到
> `0.0.0.0` 会将未经身份验证的 Redis 暴露给局域网上的所有主机。如果设置
> `REDIS_BIND_HOST=0.0.0.0`，还应将 `--requirepass` 添加到该服务的 `command:` 中。

不建议**禁用 Redis**（速率限制器将降级为内存回退方案）。如确有需要，可以移除或注释掉 `docker-compose.yml` 中的 `redis:` 服务块，或将其扩缩容到零：

```bash
docker compose up -d --scale redis=0
```

## 生产环境 Compose

如需运行一个与开发环境并行且相互隔离的生产快照，请使用 `docker-compose.prod.yml`。

| 详细信息       | 值                                                                                 |
| -------------- | ---------------------------------------------------------------------------------- |
| 文件           | `docker-compose.prod.yml`                                                          |
| 默认仪表板端口 | `PROD_DASHBOARD_PORT=20130`（映射到内部 `${DASHBOARD_PORT:-20128}`）               |
| 默认 API 端口  | `PROD_API_PORT=20131`                                                              |
| 镜像           | `omniroute:prod`（从 `runner-cli` 目标构建）                                       |
| Redis 容器     | `omniroute-redis-prod`（`redis:8.6.2`，使用专用的 `redis-prod-data` 数据卷）       |
| 数据卷         | `omniroute-prod-data`（命名数据卷，在重新构建后仍会保留）                          |
| 健康检查       | `node healthcheck.mjs` + `redis-cli ping`，且 `depends_on` 以 Redis 健康状态为条件 |

使用方法：

```bash
# 构建并启动生产环境栈
docker compose -f docker-compose.prod.yml up -d --build

# 实时查看日志
docker compose -f docker-compose.prod.yml logs -f

# 停止并移除服务（保留数据卷）
docker compose -f docker-compose.prod.yml down
```

生产环境栈可与开发环境 compose 并行运行（使用不同的容器名称、端口和数据卷），因此生产环境保持运行时，你仍可继续在本地迭代开发。

## Dockerfile 阶段

仓库提供了一个多阶段 Dockerfile（`Dockerfile`）。其中公开了三个阶段；请根据你的使用场景选择正确的 `target`。

| 阶段          | 基础镜像              | 用途                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 安装依赖（`npm ci --legacy-peer-deps`）并运行 `npm run build`（默认使用 Turbopack——请参阅下面的构建时资源）                                               |
| `runner-base` | `node:26-trixie-slim` | 包含 Next.js standalone 输出的生产运行时。**不捆绑任何提供者 CLI。**                                                                                      |
| `runner-cli`  | `runner-base`         | 添加 `git`、`docker.io`、`docker-compose` 以及全局 CLI：`@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw`。**代理式工作流请选择此阶段。** |

手动构建特定目标：

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### 构建时资源

三个构建参数控制 `builder` 阶段的资源开销。它们仅在构建时生效——
`OMNIROUTE_MEMORY_MB`（见下文）是一个独立的运行时调节参数。

| 构建参数                    | 默认值 | 作用                                                                          |
| --------------------------- | ------ | ----------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | 设为 `0` 时改用 webpack 构建。峰值内存更低，但速度更慢。                      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | 为派生的 `next build` 设置 V8 堆上限（`--max-old-space-size`）。              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | 传给 `CIRCLE_NODE_TOTAL`；Next 据此推导用于页面数据收集的 `workers = N - 1`。 |

在配置较高的构建器上，应调高 `OMNIROUTE_BUILD_WORKERS`；而当受限环境中的构建在
`✓ Compiled successfully` **之后**失败时，也应首先怀疑这个参数。每个
页面数据 worker 都是独立进程，父级 `next build` 本身也是如此；
一次真实 VPS 复现（issue #7518）测得，每个进程的峰值 RSS
约为 4.5 GB，且不受 `NODE_OPTIONS` 堆标志影响（Turbopack 使用
V8 堆外的原生/Rust 内存进行编译）。默认值 `2`（→ 1 个 worker，共 2 个
进程）是根据发布流水线所使用的 16 GB / 4 vCPU GitHub 托管 runner
设定的。当值为 `8`（→ 7 个 worker）时，该 runner 内存耗尽，
buildkit 以 `ResourceExhausted: ... cannot allocate memory`
终止该步骤；在直接测量而非推断每个进程的 RSS 后发现，
`3`（→ 2 个 worker）仍然无法容纳。`tests/unit/docker-build-memory-budget.test.ts`
会根据实测数据进行计算，如果任一参数超出 runner 的承载能力，
测试就会失败。

Turbopack 使用位于 V8 堆**之外**的原生 Rust 内存进行编译，因此
`OMNIROUTE_BUILD_MEMORY_MB` 无法限制它。在有内存上限的主机上，
构建随后会被 OOM killer 通过 SIGKILL 终止，而且完全没有错误文本——它只会
在 `Creating an optimized production build` 过程中停止，因此看起来像是构建卡住，
而不是内存不足。如果构建主机资源受限，请切换打包器：

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

由于启用了 `webpackBuildWorker`，`next build` 会运行一个父
进程**以及**一个 worker 进程，并且每个进程都会分别遵循
`OMNIROUTE_BUILD_MEMORY_MB`。容器内存上限应设置为该值的约两倍以上，
而不是一倍。

在此代码树上测得（`--target runner-base`，`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| 打包器    | 容器内存上限   | 结果                              |
| --------- | -------------- | --------------------------------- |
| Turbopack | 8 GiB / 16 GiB | 两种上限下均被 OOM 终止，且无提示 |
| webpack   | 8 GiB          | 构建 worker 被 SIGKILL 终止       |
| webpack   | 12 GiB         | 成功，峰值为 11.1 GiB             |

### 运行时默认值

`runner-base` 导出的默认值：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker 中的内存行为：

- 镜像设置 `OMNIROUTE_MEMORY_MB=1024`，并由此派生出 `NODE_OPTIONS=--max-old-space-size=1024`。
- 实际服务器进程由 standalone 启动器启动，该启动器读取 `OMNIROUTE_MEMORY_MB` 并追加 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`。
- Node 使用最后一个重复的 `--max-old-space-size` 值，因此设置 `OMNIROUTE_MEMORY_MB` 即可控制 Docker 中实际生效的堆限制。
- 由于镜像始终会设置该值，启动器自身根据 RAM 校准的回退机制在 Docker 下永远不会生效。请根据工作负载显式提高该值（见下表）。对于编码代理的 `/v1/responses`，`2048` 仍然太小。

### 编码代理的运行时 RAM

Docker 默认的 1 GiB 只是仪表板/轻量聊天场景的最低配置，并非生产环境配置。较长的 `POST /v1/responses` 请求体（数百条消息、数十个工具）在压缩期间会在内存中保留多个数据图。两个重叠的约 3 MiB / 约 750k-token 请求曾在 **12 GiB** old-space 下导致 V8 中止（`FATAL ERROR: Reached heap limit`），并且还触发了 16 GiB cgroup OOM。请参阅 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。

请将 **cgroup `--memory` 设置得高于堆大小**——原生缓冲区、SQLite 和压缩中间数据都位于 V8 之外。

| 工作负载                          | `OMNIROUTE_MEMORY_MB` | 容器 / cgroup       | 备注                                                                                |
| --------------------------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------- |
| 仪表板、一个轻量聊天              | `1024`（镜像默认值）  | ≥2 GiB              |                                                                                     |
| 一个编码代理（Claude/Codex/Grok） | `8192`                | ≥10 GiB             | 典型的单会话 `/v1/responses`                                                        |
| 两个并发的长时 `/v1/responses`    | `10240`–`12288`       | ≥12–16 GiB          | 实测 V8 在堆内存约为 12 GiB 时中止                                                  |
| 三个及以上并发长上下文            | 不要在单个进程上运行  | 串行处理 / 更多内存 | 默认重量级准入限制为 1 个进行中的请求；在不增加内存的情况下提高该限制会再次导致中止 |

当 `OMNIROUTE_MEMORY_MB` **未设置**时，裸机上的 `omniroute serve` 会校准为 RAM 的约 35%（限制在 `[512, 4096]` 范围内）。Docker 始终将其设置为 `1024`，因此官方镜像中从不会执行该校准。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 关键环境变量

除了 [ENVIRONMENT.md](../reference/ENVIRONMENT.md) 中记录的默认值之外，在 Docker 下运行时，以下变量最为重要：

| 变量                          | 用途                                                                                                                                                                                                     | 默认值                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket 桥接器的共享密钥。**生产环境中必需** — 请将其设置为高强度随机字符串。                                                                                                                          | 未设置（必须提供）     |
| `REDIS_URL`                   | 限流器/缓存后端的连接字符串                                                                                                                                                                              | `redis://redis:6379`   |
| `REDIS_PORT`                  | 内置 Redis 容器的主机端口                                                                                                                                                                                | `6379`                 |
| `REDIS_BIND_HOST`             | 发布内置 Redis 端口的主机接口（除非添加 AUTH，否则使用环回接口）                                                                                                                                         | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 挂载到 `cli` 配置文件中 `/workspace/omniroute` 的主机路径，用于自更新工作流                                                                                                                              | `.`（当前目录）        |
| `OMNIROUTE_MEMORY_MB`         | Docker 独立服务器运行时的 Node 堆内存上限；会覆盖上文所述的镜像默认值。编码代理：`8192`+（参见[运行时 RAM](#runtime-ram-for-coding-agents)）。                                                           | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | 覆盖仪表板（20128）和 API（20129）的公开端口                                                                                                                                                             | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose 用于发布仪表板/API/实时 WS 端口的主机接口。当 `REQUIRE_API_KEY=false`（默认值）时，`0.0.0.0` 会将匿名 `/v1` 代理暴露给局域网 — 仅在 `REQUIRE_API_KEY=true` 或前置反向代理时扩大监听范围。 | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose 用于发布 `cliproxyapi` 边车的主机接口 — 其数据卷中保存着提供者凭据。                                                                                                                      | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | 运行时插件扫描器读取插件并安装插件的目录。以绑定挂载方式提供插件时需设置此变量：默认值取决于 `HOME`，而镜像不一定会导出该变量。                                                                          | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | 应用发布在反向代理之后时使用的 URL 子路径（例如 `/omniroute`）                                                                                                                                           | _（空 = 根路径）_      |
| `NEXT_PUBLIC_BASE_URL`        | 包含子路径的浏览器公共源地址（例如 `https://host/omniroute`）                                                                                                                                            | 未设置                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` 的主机端仪表板端口                                                                                                                                                             | `20130`                |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` 边车的主机端口                                                                                                                                                                             | `8317`                 |

## 子路径上的反向代理（Traefik / nginx）

Next.js `basePath` 会被编译到独立运行包中。OmniRoute 会将构建时写入的值记录在应用根目录的哨兵文件中（在 `npm run build` 期间写入；由 `scripts/docker/ensure-docker-base-path.mjs` 读取），并在容器启动时将其与 `OMNIROUTE_BASE_PATH` 进行比较。当两者不一致且镜像是针对域名根路径构建时，入口点会重写独立运行清单、嵌入的 `basePath`/`assetPrefix` 字面量（Next 16 仅根据 `assetPrefix` 渲染 SSR 资源 URL——补丁程序会将子路径同步到其中）、构建时写入的 `/_next/static` 资源 URL（客户端引用清单、媒体导入、预渲染错误页面），以及客户端的 `process.env` 垫片，然后再运行 `node dev/run-standalone.mjs`。

### Compose 构建（推荐）

在 `.env` 中设置这两个变量，然后重新构建，以确保镜像与运行时配置一致：

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

发布的 `diegosouzapw/omniroute:*` 镜像是针对域名根路径构建的。你仍然可以在运行时设置 `OMNIROUTE_BASE_PATH`；容器会在启动时对运行包进行一次修补。请同时设置与之匹配的公开源地址：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

配置反向代理以转发**完整的**外部路径（不要移除前缀）。Traefik 应将 `PathPrefix(`/omniroute`)` 路由到容器，且不使用 `StripPrefix`，这样 Next.js 就会接收到 `/omniroute/...`，并从 `/omniroute/_next/...` 提供资源。

Docker 健康检查会探测带有当前 `OMNIROUTE_BASE_PATH` 前缀的轻量级 `/healthz` 生命周期端点。`/api/monitoring/health` 仍可用于人工或仪表板诊断；若要让容器的 HEALTHCHECK 改回使用该端点（例如执行深度健康状态检查），请设置 `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`。该路径执行的是**深度**检查（数据库 + 监控摘要）——如果你选择启用，它适合用于 Docker 低频率的 `HEALTHCHECK`，但**不适合**用于 Kubernetes `livenessProbe` 的探测间隔。

对于编排器（Kubernetes、Nomad 等）：

| 探针           | 推荐                                                          | 避免                                             |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| 存活探针       | HTTP `GET /livez`，或主端口上的 TCP（`PORT`，默认为 `20128`） | 将 `/api/monitoring/health` 用作存活探针         |
| 就绪探针       | HTTP `GET /healthz`                                           | 使用会将事件循环繁忙判定为进程死亡的严格超时时间 |
| 深度／黑盒检查 | `/api/monitoring/health`                                      | —                                                |

`/healthz` 报告进程生命周期状态（`ok` / `starting` / `stopping`）。`/livez` 仅检查进程是否存活（只要处理程序能够运行就返回 200；它不会等待就绪状态）。二者仍与请求处理运行在同一个 Node 事件循环中，因此 CPU 密集型目录或压缩任务可能会延迟响应——繁忙 ≠ 死亡。如果 HTTP 探针超时，请优先使用 TCP 存活探针。完整的探针指南：
[监控指南——Kubernetes 探针建议](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## 使用 Caddy 的 Docker Compose（HTTPS 自动 TLS）

可使用 Caddy 的自动 SSL 配置功能安全地公开 OmniRoute。请确保您域名的 DNS A 记录指向服务器的 IP。

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
      # 面向浏览器的源地址，用于 OAuth 回调、仪表板链接和生成的公共 URL。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # 用于计划任务和自获取请求的内部服务器间 URL。
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

Caddy 会为上游容器设置标准转发标头。OmniRoute 使用
`NEXT_PUBLIC_BASE_URL` 作为 OAuth 回调和生成的公共链接的规范公共源地址；
经过身份验证的仪表板写入操作使用同源请求以及与会话绑定的 CSRF
保护。仅应在高级部署中启用 `OMNIROUTE_TRUST_PROXY`，即您有意让
OmniRoute 从可信的转发标头中推导公共源地址，而不是使用显式
配置。

## Cloudflare 快速隧道

Docker 部署的仪表板支持在 `Dashboard → Endpoints` 上一键启用 **Cloudflare Quick Tunnel**。首次启用时，仅在需要时下载 `cloudflared`，启动一条指向当前 `/v1` 端点的临时隧道，并在常规公共 URL 的正下方显示生成的 `https://*.trycloudflare.com/v1` URL。

可以在 `Settings → Appearance` 中显示或隐藏端点隧道面板（Cloudflare、Tailscale、ngrok），而不会改变活动隧道的状态。

### 隧道注意事项

- 快速隧道 URL 是临时的，每次重启后都会更改。
- OmniRoute 或容器重启后，快速隧道不会自动恢复。需要时，请从仪表板重新启用。
- 托管安装目前支持 Linux、macOS 和 Windows 上的 `x64` / `arm64`。
- 托管快速隧道默认使用 HTTP/2 传输，以避免在受限容器环境中产生冗杂的 QUIC UDP 缓冲区警告。如果需要其他传输方式，请将 `CLOUDFLARED_PROTOCOL` 设置为 `quic` 或 `auto`。
- Docker 镜像内置系统 CA 根证书，并将其传递给托管的 `cloudflared`，从而避免隧道在容器内引导启动时出现 TLS 信任失败。
- 如果希望 OmniRoute 使用现有二进制文件而不是下载新文件，请设置 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`。

## 镜像标签

| 镜像                     | 标签     | 大小   | 说明                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 已**发布**的最高稳定 SemVer（而非 git `main`） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | 对于 GitOps，请固定使用此类标签                |

多平台清单：原生支持 `linux/amd64` + `linux/arm64`（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker 会自动选择匹配的架构；如果需要在 ARM 主机上强制使用 AMD64 模拟，请传递 `--platform linux/amd64`。

### 发布渠道

OmniRoute 为稳定版本、活动发布分支测试以及开发构建分别发布不同的 Docker 渠道。

| 渠道                            | 来源                         | 可变性           | 推荐用途                                                                                   |
| ------------------------------- | ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | 已签名/带版本号的发布版本    | 不可变           | 固定到确切发布版本的生产部署                                                               |
| `:latest` / `:latest-web`       | 已**发布**的最高稳定 SemVer  | 可变的稳定指针   | 在 SemVer 发布作业完成**后**跟随稳定版本——**不会**跟踪 `main` 或未发布的 `release/v*` 提交 |
| `:next` / `:next-web`           | 当前默认的 `release/v*` 分支 | 可变的预发布指针 | 测试已进入活动发布分支但尚未包含在稳定版本中的修复                                         |
| `:main` / `:main-web`           | `main` 分支                  | 可变的开发指针   | 仅用于开发和集成测试                                                                       |

#### 使用预发布渠道

每次推送到当前默认的 `release/v*` 分支时，都会重新构建 `next` 渠道，并同时为 AMD64 和 ARM64 发布。较旧的维护分支无法覆盖该渠道。此渠道提供可拉取的镜像，其中包含已合并到活动发布分支、但尚未创建下一个稳定标签的修复。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

对于 Docker Compose，请覆盖所选配置文件使用的镜像标签，然后拉取镜像并重新创建服务：

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

`next` 是一个浮动的预发布渠道。每次推送到活动发布分支时，它都可能发生变化，并且**不支持用于生产环境**。评估特定构建时，请固定镜像摘要：

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

测试前，请备份 OmniRoute 数据卷或绑定挂载的数据目录。若要回滚，请恢复之前使用的稳定版本或摘要，并重新创建容器：

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

发布分支构建绝不会更新 `latest`；只有符合条件的稳定语义化版本才能推进稳定版指针。`next` 镜像仍会执行发布镜像检查，并通过阻止存在 CRITICAL 级别漏洞的门禁。

**`latest` 并不保证与 git 保持同步。** 合并到 `main` 或当前活跃的 `release/v*` 分支中的修复，在稳定 SemVer 镜像发布且发布任务将 `:latest` 推进到该版本之前，**不会**包含在 `:latest` 中（其摘要与该 SemVer 镜像相同）。如果 GitHub 已显示相关修复，而 `latest` 看起来仍未更新，请拉取 `:next` 来测试发布分支，或等待 SemVer 标签发布。

| 您的需求                                           | 使用方式                      |
| -------------------------------------------------- | ----------------------------- |
| 不允许发生漂移的 GitOps / 生产环境                 | 固定为 `:X.Y.Z`（或镜像摘要） |
| 跟随已发布的稳定版本，并接受每次发布时重新创建容器 | `:latest`                     |
| 测试尚未发布的 `release/v*` 提交                   | `:next`（不可用于生产环境）   |
| 测试 `main`                                        | `:main`（不可用于生产环境）   |

## 可用性：默认 SQLite 仅支持单副本

标准 Docker / Kubernetes OmniRoute 架构是**一个 Node 进程 + 一个 SQLite 写入进程**。该拓扑**不支持**高可用性。

| 限制                               | 后果                                                                                                                                                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 单写入进程                         | **不要**让多个副本访问同一个 SQLite 文件。这会损坏数据库。                                                                                                                                                                                       |
| 重新创建 / 重启 / HEALTHCHECK 终止 | 正在进行的 SSE、仪表板会话和内存中状态将**完全中断**。所有已连接的客户端都会断开。在没有可用端点的时间窗口内，新请求会从反向代理收到 **`502 Bad Gateway: Unknown error`**，而不是 OmniRoute JSON——客户端无法将其与提供者故障区分开来（#11015）。 |
| 与 `/healthz` 共用同一事件循环     | 繁忙的目录或压缩周期可能延迟探针响应；较短的超时时间会导致**唯一的**副本重启。                                                                                                                                                                   |

**探针矩阵**（另请参阅 [Kubernetes 探针建议](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)）：

| 探针                | 目标                                                                     | 不要使用                                 |
| ------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| 存活性              | 对 `PORT`（默认值为 `20128`）执行 TCP 探测，或使用宽松的 HTTP `/healthz` | `/api/monitoring/health`                 |
| 就绪性              | HTTP `GET /healthz`                                                      | 将事件循环繁忙视为进程已死的严格超时时间 |
| 深度检查 / 人工检查 | `/api/monitoring/health`                                                 | 自动化 kubelet 存活性探测                |

**升级：**预计所有会话都会断开。如果可以，请先排空客户端；默认 SQLite 不支持滚动更新。Compose 的 `restart: unless-stopped` 与 Docker `HEALTHCHECK` 结合使用时，也会在容器处于不健康状态时替换唯一的进程——影响范围相同。

用于**单副本**的 Kubernetes 片段（必须使用 Recreate；不要针对一个 SQLite 文件增加 `replicas`）：

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

`preStop` 的休眠会让 kube 在发送 SIGTERM 之前先移除 Service 端点，从而使**新**流量不再进入即将终止的进程。正在进行的 `/v1/responses` SSE 会通过重量级准入租约（#11015），最多排空至 `SHUTDOWN_TIMEOUT_MS`（默认 30 秒）。仍然到达该进程的新请求会收到 `503` + `Retry-After: 5`。在替代副本就绪之前，Recreate 导致的无可用端点间隙仍然是一次硬中断——这是 SQLite 拓扑所致，而不是探针配置错误。

外部 Postgres / 多写入进程高可用性**不是**已有文档说明的标准方案。如果需要高可用性，请保持单副本，或运行项目已单独测试并记录在文档中的拓扑。Postgres/MySQL 相关工作记录在 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) 中。在该功能发布之前，扩展**大型** `/v1/responses` 容量的唯一受支持方式是使用 N 个相互独立的进程（见下一节），而不是在一个卷上设置 `replicas > 1`。

## 横向扩展：N 个独立进程

一个 Node 进程就是**一个 V8 堆**。两个相互重叠、大小约为 3 MiB / 约 75 万 token 的编码代理 `POST /v1/responses` 请求（RTK + Caveman），会在堆达到约 12 Gi 时导致该堆中止（`FATAL ERROR: Reached heap limit`），并可能使 16 Gi cgroup 发生 OOM。参见 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。这一测量结果是一项**内存预算**警告，而不是产品将并发长时 `/v1/responses` 硬性限制为两个。重量级聊天请求的准入由自动推导的摄取字节预算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`、`src/shared/middleware/admissionBudget.ts`）控制，该预算基于相同的 V8/cgroup 上限确定——在已完成容量规划的进程上向上覆盖该值（或设置旧版 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 请求数上限），会重新引发中止。小型聊天、`/healthz`、`/v1/models` 和 MCP **不受**该上限约束。

### 单进程：超过两个长时 `/v1/responses`

当进程处于**健康**状态（堆使用率低于 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`，默认为 `0.75`），并且进程级在途字节预算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）仍有余量时，**可以**同时运行两个以上的长时 `POST /v1/responses` 请求。请求体大小达到或超过 `OMNIROUTE_CHAT_LARGE_BODY_BYTES`（默认为 256 KiB）的请求，与结构复杂的请求获取相同的重量级租约，并使用同一个 [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` 逃生机制（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）。数十个并发的长时 SSE 客户端（运维人员通常需要 40–50 个）属于**内存预算**问题——需要合理配置堆、主槽位/健康余量槽位以及 `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`——而不是产品存在“最多 2 个”的硬性限制。堆承压时仍会通过可重试的 `503` 拒绝请求，从而避免 #7849 再次出现。

若要在**当前**实现中增加堆的数量（独立的 V8 老生代空间）：

| 应该做                                                                                                   | 不应该做                                       |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 运行 **N 个容器/pod**，每个容器/pod 使用其**自己的** `DATA_DIR` / 卷                                     | 针对同一个 SQLite 文件设置 `replicas > 1`      |
| 根据堆 / 在途字节预算设置重量级在途请求数和健康余量；1–2 是针对 #7849 的保守默认值，而不是产品的硬性上限 | 为单个进程提供 8 倍 RAM 并设置无界的请求数上限 |
| 可选：使用 `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` 来实现**共享配额计数器**                 | 将 Redis 当作共享 SQLite 使用——它并不是        |
| 将提供者密钥复制到每个实例中（或者接受各自独立的仪表板）                                                 | 期望各实例共用一个仪表板 / 一份调用日志        |
| 前置任意负载均衡器；按 API 密钥或会话进行粘性路由即可                                                    | 要求使用特定供应商的大小感知中间件             |

硬件方面：每个实例可并发处理多少个长时 `/v1/responses`，属于**内存预算**问题（堆 + 在途字节 / #10110）。具有独立 `DATA_DIR` 的 `N` 个实例仍会使堆的数量增加到 N 倍：主机 RAM 必须能够容纳 `N × cgroup`，而不是“一个 16 Gi pod，且 N=8”。切勿让 `replicas > 1` 的实例共用同一个 SQLite 文件。

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

进程内密度（将压缩移出 HTTP isolate）见 [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)。在共享持久化状态上构建单一逻辑集群见 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。

## 重要说明

- **SQLite WAL 模式：** 应允许 `docker stop` 完成，以便 OmniRoute 将最新更改检查点写回 `storage.sqlite`。随附的 Compose 文件已设置 40 秒的停止宽限期。如果直接运行镜像，请保留 `--stop-timeout 40`。
- **`DISABLE_SQLITE_AUTO_BACKUP`：** 如果常规备份/写入前备份由外部管理，请将其设置为 `true`。现有数据库的迁移仍需要其自身的持久安全快照和大规模迁移防护机制。
- **数据持久化：** 始终将卷挂载到 `/app/data`，以便在容器重启后保留数据库、密钥和配置。
- **端口配置：** 覆盖 `PORT` 环境变量以更改默认端口 `20128`。

## 另请参阅

- [虚拟机部署指南](../ops/VM_DEPLOYMENT_GUIDE.md) — 虚拟机 + nginx + Cloudflare 配置
- [Fly.io 部署指南](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — 部署到 Fly.io
- [环境配置](../reference/ENVIRONMENT.md) — 完整的 `.env` 参考文档
