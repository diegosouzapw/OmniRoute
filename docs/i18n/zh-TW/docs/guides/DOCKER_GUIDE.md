# 🐳 Docker Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md)

---

> 完整的 Docker 部署參考。如需快速開始，請參閱 [README Docker 章節](../README.md#-docker)。

## 目錄

- [快速執行](#quick-run)
- [使用環境變數檔案](#with-environment-file)
- [Docker Compose](#docker-compose)
- [可用的設定檔](#available-profiles)
- [當 OmniRoute 在 Docker 中執行時設定主機 CLI 工具](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [正式環境 Compose](#production-compose)
- [Dockerfile 階段](#dockerfile-stages)
- [關鍵環境變數](#critical-environment-variables)
- [搭配 Caddy（HTTPS）的 Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [映像標籤](#image-tags)
- [可用性：預設 SQLite 僅支援單一副本](#availability-default-sqlite-is-single-replica)
- [重要注意事項](#important-notes)

---

## 快速執行

> **想用一個指令自行託管嗎？** 請參閱
> [自行託管指南](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d`（已發布的映像檔 +
> Redis、僅限迴路位址、不需選擇設定檔）。下方的快速執行方式是
> 供已在其他位置執行 Redis 的使用者採用的單一容器方案。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 搭配環境變數檔案

```bash
# 請先複製並編輯 .env
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
# 基礎設定檔（不含 CLI 工具）
docker compose --profile base up -d

# CLI 設定檔（內建 Claude Code、Codex、OpenClaw）
docker compose --profile cli up -d

# 主機設定檔（以 Linux 為優先；以唯讀方式掛載主機的 CLI 二進位檔）
docker compose --profile host up -d

# Web 設定檔（供 Web 工作階段提供者使用的 Chromium/Playwright）
docker compose --profile web up -d

# 結合 CLI 與 CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## 可用的設定檔

OmniRoute 為主要部署形式提供 Compose 設定檔。請選擇符合您環境的設定檔。

| 設定檔         | 服務             | 適用情境                                                                                                                      | 指令                                         |
| -------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`（預設） | `omniroute-base` | 無介面伺服器／最小執行環境，不包含提供者 CLI                                                                                  | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | 會呼叫 `omniroute providers/setup/doctor` 及隨附 CLI（Codex、Claude Code、Droid、OpenClaw）的代理式工作流程                   | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | 希望透過以唯讀方式掛載 `~/.local/bin`、`~/.codex`、`~/.claude` 等目錄，取得類似 `network_mode` 存取主機 CLI 能力的 Linux 主機 | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | 在連接埠 `8317` 上執行 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) Sidecar，以進行上游 CLI Proxy              | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | 需要瀏覽器的 Web 工作階段提供者：`gemini-web`、`claude-web`、`claude-turnstile`（建置 `runner-web`，內含 Chromium）           | `docker compose --profile web up -d`         |

> 可以組合多個設定檔：`docker compose --profile cli --profile cliproxyapi up -d`。

## 在 Docker 中執行 OmniRoute 時設定主機 CLI 工具

`omniroute setup-codex`、`setup-claude`、`config set <tool>`，以及儀表板的
**儲存設定**按鈕都會寫入類似 `~/.codex/*.config.toml` 的檔案。這些路徑
只在 CLI 實際執行的機器上有意義。若在容器內執行這些命令，檔案會寫入
容器本身的家目錄（`/home/node`——該映像以 `USER node` 執行），主機上的
CLI 永遠不會讀取該位置，而且容器一旦重新建立，這些檔案就會被捨棄。

OmniRoute 會偵測此情況，並拒絕寫入且提供操作說明，而不會回報無法使用的
成功結果：CLI 會以 `2` 結束，而 API 則回應 `422`，並包含
`containerEphemeralTarget: true`。

### 建議：在主機上執行 CLI，在 Docker 中執行 OmniRoute

容器提供 API；CLI 則設定您的主機工具。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # 將 CLI 指向容器
omniroute setup-codex                      # 寫入主機上真正的 ~/.codex
```

當 Codex、Claude Code、Cursor 或類似工具在您的筆記型電腦上執行時，這是
正確的選擇——而這也是一般的設定方式。

### 替代方案：繫結掛載主機設定目錄（`host` 設定檔）

如果您希望容器本身寫入主機設定，請掛載這些目錄，並將
`CLI_CONFIG_HOME` 指向掛載根目錄。`host` 設定檔已經完成此設定：

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

繫結掛載可讓此路徑受到信任：OmniRoute 會讀取
`/proc/self/mountinfo`，並允許寫入已掛載的路徑（以及其子目錄為掛載點的
目錄，這正是上述 `/host-home` 的結構），同時仍會拒絕寫入未掛載的路徑。

### 備用方式：設定容器本身的 CLI（請謹慎使用）

當 CLI 確實位於容器內時（`cli` 設定檔），這類寫入就是刻意的。請將
`--allow-container-write` 傳給任何 `setup-*` 命令，或為伺服器設定
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`。寫入將會繼續進行，但會
顯示警告，指出資料在容器消失後將無法保留。

> **安全性警告——`cli` 設定檔 + `docker.sock` 掛載。**
> `cli` 設定檔會繫結掛載 `/var/run/docker.sock`，讓容器內的
> 自動更新程式可以透過主機常駐程式重新建立堆疊
> （`src/lib/system/autoUpdate.ts` 會探測該 socket，若不存在則略過
> Docker 路徑）。該 socket 是**主機 root 權限的信任邊界**：任何能夠
> 存取它的項目，都能以 root 身分控制主機的 Docker 常駐程式——它可以
> 建立、檢查、停止及移除主機上的任何容器。這代表：
>
> 1. **絕對不要將 `cli` 設定檔的連接埠暴露至網路。**請將其發布於
>    `127.0.0.1`（`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`）
>    ——若 `cli` 設定檔可從區域網路存取，任何儀表板層級的 RCE 都會
>    造成主機遭到全面入侵。
> 2. **不要將任何額外的主機目錄繫結至 `cli` 設定檔。**
>    Docker socket 加上任何其他掛載，都會讓容器對您的檔案系統和
>    主機設定擁有完整的讀寫權限。如果工具需要存取某個專案，請使用
>    CLI 二進位檔在本機執行它——不要將專案掛載至 `cli` 容器。
>
> 如果您不需要容器內自動更新，請不要啟用 `cli` 設定檔
> （`COMPOSE_PROFILES=core,redis` 或更精簡的設定）。其他設定檔不會
> 掛載 Docker socket。
>
> 如需了解 MITM 的相關威脅模型，請參閱 `docs/security/MITM-TPROXY-DECRYPT.md`（位於 git 中；不會編譯至 `/docs`）；
> 如需了解 `codex`/`claude-code`/`droid`/`openclaw` 二進位檔的來源鏈，
> 請參閱 `docs/security/SUPPLY_CHAIN.md`。

## Redis 側車

OmniRoute 依賴 Redis 來支援分散式速率限制器與共用快取。`redis` 服務在 `docker-compose.yml` 中**一律會定義**（不受任何 profile 限制），並會與任何其他 profile 一同啟動。

| 詳細資訊             | 值                                      |
| -------------------- | --------------------------------------- |
| 映像                 | `redis:7-alpine`                        |
| 容器名稱             | `omniroute-redis`                       |
| 內部連接埠           | `6379`                                  |
| 主機連接埠（可覆寫） | `REDIS_PORT`（預設為 `6379`）           |
| 主機繫結（可覆寫）   | `REDIS_BIND_HOST`（預設為 `127.0.0.1`） |
| 磁碟區               | `omniroute-redis-data` → `/data`        |
| 健康檢查             | `redis-cli ping`（間隔 10 秒）          |

相關環境變數：

- `REDIS_URL` — 注入應用程式的連線字串（預設為 `redis://redis:6379`）。
- `REDIS_PORT` — Redis 容器的主機端連接埠對應。
- `REDIS_BIND_HOST` — 用於發布連接埠的主機介面。預設為 `127.0.0.1`。

> **為何預設使用迴路位址：**此側車執行時未設定 `requirepass`，而應用程式
> 容器會透過 compose 網路（`redis:6379`）存取它——發布的連接埠僅供
> 主機端工具使用（`redis-cli`、本機 `npm run dev`）。若發布於
> `0.0.0.0`，會將未經驗證的 Redis 暴露給區域網路中的每台主機。若設定
> `REDIS_BIND_HOST=0.0.0.0`，也請將 `--requirepass` 加入服務的 `command:`。

**不建議停用 Redis**（速率限制器將降級為記憶體內備援）。若確有需要，可移除或註解 `docker-compose.yml` 中的 `redis:` 服務區塊，或將其縮放為零：

```bash
docker compose up -d --scale redis=0
```

## 正式環境 Compose

若要讓隔離的正式環境快照與開發環境並行執行，請使用 `docker-compose.prod.yml`。

| 詳細資訊         | 值                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------- |
| 檔案             | `docker-compose.prod.yml`                                                          |
| 預設儀表板連接埠 | `PROD_DASHBOARD_PORT=20130`（對應至內部 `${DASHBOARD_PORT:-20128}`）               |
| 預設 API 連接埠  | `PROD_API_PORT=20131`                                                              |
| 映像             | `omniroute:prod`（由 `runner-cli` target 建置）                                    |
| Redis 容器       | `omniroute-redis-prod`（`redis:8.6.2`，使用專用的 `redis-prod-data` 磁碟區）       |
| 資料磁碟區       | `omniroute-prod-data`（具名磁碟區，重建後仍會保留）                                |
| 健康檢查         | `node healthcheck.mjs` + `redis-cli ping`，且 `depends_on` 以 Redis 健康狀態為條件 |

使用方式：

```bash
# 建置並啟動正式環境堆疊
docker compose -f docker-compose.prod.yml up -d --build

# 串流顯示日誌
docker compose -f docker-compose.prod.yml logs -f

# 關閉並移除堆疊（保留磁碟區）
docker compose -f docker-compose.prod.yml down
```

正式環境堆疊會與開發環境 compose 並行執行（使用不同的容器名稱、連接埠與磁碟區），因此在正式環境持續運作時，您仍可繼續在本機進行迭代開發。

## Dockerfile 階段

此儲存庫提供多階段 Dockerfile（`Dockerfile`）。共有四個公開階段；請依據您的使用情境選擇正確的 `target`。

| 階段          | 基礎映像檔            | 用途                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 安裝相依套件（`npm ci --legacy-peer-deps`）並執行 `npm run build`（預設使用 Turbopack——請參閱下方的建置階段資源）                                                                                                                                     |
| `runner-base` | `node:26-trixie-slim` | 包含 Next.js 獨立輸出的正式環境執行階段。**不包含任何提供者 CLI。**                                                                                                                                                                                   |
| `runner-cli`  | `runner-base`         | 加入 `git`、`docker.io`、`docker-compose`，以及全域 CLI：`@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw`。**代理式工作流程請選擇此階段。**                                                                                          |
| `runner-web`  | `runner-base`         | 加入 Playwright 與 Chromium 瀏覽器（`--with-deps`），供網頁工作階段提供者使用：`gemini-web`、`claude-web`、`claude-turnstile`。**使用這些提供者時請選擇此階段**——一般映像檔若未包含這些元件，會在請求時失敗（請參閱發行通道下方關於 `-web` 的說明）。 |

手動建置特定目標：

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### 建置階段資源

三個建置引數會控制 `builder` 階段的資源成本。它們僅在建置階段生效——
`OMNIROUTE_MEMORY_MB`（如下）則是另一個獨立的執行階段調整參數。

| 建置引數                    | 預設值 | 效果                                                                            |
| --------------------------- | ------ | ------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | 設為 `0` 時改用 webpack 建置。尖峰記憶體較低，但速度較慢。                      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | 所啟動之 `next build` 的 V8 堆積上限（`--max-old-space-size`）。                |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | 提供 `CIRCLE_NODE_TOTAL`；Next 會據此推導 `workers = N - 1`，用於收集頁面資料。 |

`OMNIROUTE_BUILD_WORKERS` 是在大型建置主機上應提高的參數，也是受限環境中的建置在
`✓ Compiled successfully` **之後**失敗時應優先懷疑的參數。每個
頁面資料工作程序都是獨立程序，父層 `next build` 本身亦然；
在實際 VPS 上重現（議題 #7518）時，測得每個程序的尖峰 RSS
約為 4.5 GB，且不受 `NODE_OPTIONS` 堆積旗標影響（Turbopack 會在
V8 堆積之外使用原生/Rust 記憶體進行編譯）。預設值 `2`（→ 1 個工作程序，共 2 個
程序）是依據發布管線所使用的 16 GB / 4 vCPU GitHub 託管執行器
而設定。設為 `8`（→ 7 個工作程序）時，該執行器會耗盡記憶體，
buildkit 並以 `ResourceExhausted: ... cannot allocate memory`
使該步驟失敗；在直接測量每個程序的 RSS 而非透過推斷得出後，
`3`（→ 2 個工作程序）仍然無法容納。`tests/unit/docker-build-memory-budget.test.ts`
會根據測量值進行計算，若任一參數超出執行器的承受範圍，測試便會失敗。

Turbopack 會使用位於 V8 堆積**之外**的原生 Rust 記憶體進行編譯，因此
`OMNIROUTE_BUILD_MEMORY_MB` 無法限制該記憶體。在設有記憶體上限的主機上，
建置程序會被 OOM 終止器以 SIGKILL 終止，且完全不會顯示錯誤文字——它只會
在 `Creating an optimized production build` 進行到一半時停止，看起來像是
當機，而非記憶體不足。若建置主機資源受限，請切換打包工具：

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` 已啟用，因此 `next build` 會執行一個父程序**以及**一個工作
程序，且兩者會分別遵循 `OMNIROUTE_BUILD_MEMORY_MB`。容器上限應設為大約該值的
兩倍以上，而非一倍。

在此程式碼樹上測量（`--target runner-base`、`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| 打包工具  | 容器上限       | 結果                            |
| --------- | -------------- | ------------------------------- |
| Turbopack | 8 GiB / 16 GiB | 兩者皆被 OOM 終止，且無任何訊息 |
| webpack   | 8 GiB          | 建置工作程序被 SIGKILL 終止     |
| webpack   | 12 GiB         | 成功，尖峰值為 11.1 GiB         |

### 執行階段預設值

`runner-base` 匯出的預設值：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker 中的記憶體行為：

- 映像檔會設定 `OMNIROUTE_MEMORY_MB=1024`，並由此衍生出 `NODE_OPTIONS=--max-old-space-size=1024`。
- 實際的伺服器程序由獨立啟動器啟動；該啟動器會讀取 `OMNIROUTE_MEMORY_MB`，並附加 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`。
- Node 會採用最後一個重複的 `--max-old-space-size` 值，因此設定 `OMNIROUTE_MEMORY_MB` 即可控制 Docker 的實際堆積記憶體上限。
- 由於映像檔一律會設定此值，因此在 Docker 下，啟動器本身依 RAM 校準的備援值永遠不會生效。請根據工作負載明確提高此值（見下表）。對程式設計代理的 `/v1/responses` 而言，`2048` 仍然太小。

### 程式設計代理的執行階段 RAM

Docker 預設的 1 GiB 僅是儀表板／輕量聊天的最低需求，並非正式環境的配置。較長的 `POST /v1/responses` 主體（數百則訊息、數十個工具）在壓縮期間會保留多個記憶體內圖形結構。兩個重疊的約 3 MiB／約 75 萬 token 請求，曾在 **12 GiB** 舊生代空間下導致 V8 中止（`FATAL ERROR: Reached heap limit`），也曾觸發 16 GiB cgroup OOM。請參閱 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。

請將 **cgroup `--memory` 設定得高於堆積記憶體**——原生緩衝區、SQLite 與壓縮過程的中間資料都位於 V8 之外。

| 工作負載                              | `OMNIROUTE_MEMORY_MB`  | 容器／cgroup     | 備註                                                                               |
| ------------------------------------- | ---------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| 儀表板、單一輕量聊天                  | `1024`（映像檔預設值） | ≥2 GiB           |                                                                                    |
| 單一程式設計代理（Claude/Codex/Grok） | `8192`                 | ≥10 GiB          | 一般單一工作階段的 `/v1/responses`                                                 |
| 兩個並行的長篇 `/v1/responses`        | `10240`–`12288`        | ≥12–16 GiB       | 實測在約 12 GiB 堆積記憶體時發生 V8 中止                                           |
| 三個以上並行的長上下文                | 請勿在單一程序上執行   | 序列化／更多 RAM | 預設重量級准入限制為 1 個進行中請求；在未增加 RAM 的情況下提高限制，會再次導致中止 |

當 `OMNIROUTE_MEMORY_MB` **未設定**時，裸機上的 `omniroute serve` 會校準為約 35% 的 RAM（限制在 `[512, 4096]` 範圍內）。Docker 一律設定為 `1024`，因此官方映像檔永遠不會執行該校準。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 關鍵環境變數

除了 [ENVIRONMENT.md](../reference/ENVIRONMENT.md) 中記載的預設值外，在 Docker 下執行時，以下變數最為重要：

| 變數                          | 用途                                                                                                                                                                                                                  | 預設值                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket 橋接器的共享密鑰。**在正式環境中為必要設定** — 請將其設為高強度的隨機字串。                                                                                                                                 | 未設定（必須提供）     |
| `REDIS_URL`                   | 速率限制器／快取後端的連線字串                                                                                                                                                                                        | `redis://redis:6379`   |
| `REDIS_PORT`                  | 內建 Redis 容器的主機端連接埠                                                                                                                                                                                         | `6379`                 |
| `REDIS_BIND_HOST`             | 發布內建 Redis 連接埠的主機介面（除非加入 AUTH，否則使用迴送介面）                                                                                                                                                    | `127.0.0.1`            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 掛載至 `cli` 設定檔中 `/workspace/omniroute` 的主機路徑，用於自我更新工作流程                                                                                                                                         | `.`（目前目錄）        |
| `OMNIROUTE_MEMORY_MB`         | Docker 獨立伺服器執行階段的 Node 堆積上限；會覆寫上述映像檔預設值。程式設計代理：`8192`+（請參閱[執行階段 RAM](#runtime-ram-for-coding-agents)）。                                                                    | `1024`                 |
| `DASHBOARD_PORT` / `API_PORT` | 覆寫儀表板（20128）與 API（20129）對外開放的連接埠                                                                                                                                                                    | `20128` / `20129`      |
| `APP_BIND_HOST`               | docker-compose 發布儀表板／API／即時 WS 連接埠的主機介面。當 `REQUIRE_API_KEY=false`（預設值）時，`0.0.0.0` 會將匿名 `/v1` Proxy 開放給區域網路 — 僅應在 `REQUIRE_API_KEY=true` 或前方設有反向 Proxy 時擴大存取範圍。 | `127.0.0.1`            |
| `CLIPROXY_BIND_HOST`          | docker-compose 發布 `cliproxyapi` Sidecar 的主機介面 — 其資料磁碟區存有提供者憑證。                                                                                                                                   | `127.0.0.1`            |
| `OMNIROUTE_PLUGINS_DIR`       | 執行階段外掛掃描器讀取及安裝外掛的目錄。當外掛透過繫結掛載時，請設定此變數：其預設值會依循 `HOME`，但映像檔不一定會匯出該變數。                                                                                       | `~/.omniroute/plugins` |
| `OMNIROUTE_BASE_PATH`         | 應用程式發布於反向 Proxy 後方時所使用的 URL 子路徑（例如 `/omniroute`）                                                                                                                                               | _（空白 = 根路徑）_    |
| `NEXT_PUBLIC_BASE_URL`        | 包含子路徑的公開瀏覽器來源（例如 `https://host/omniroute`）                                                                                                                                                           | 未設定                 |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` 的主機端儀表板連接埠                                                                                                                                                                        | `20130`                |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` Sidecar 的主機端連接埠                                                                                                                                                                                  | `8317`                 |

## 子路徑上的反向代理（Traefik / nginx）

Next.js `basePath` 會被編譯至獨立套件中。OmniRoute 會將建置時寫入的值記錄在應用程式根目錄的標記檔案中（於 `npm run build` 期間寫入；由 `scripts/docker/ensure-docker-base-path.mjs` 讀取），並在容器啟動時將其與 `OMNIROUTE_BASE_PATH` 比較。當兩者不同，且映像檔是針對網域根目錄建置時，進入點會在 `node dev/run-standalone.mjs` 執行前，改寫獨立套件的資訊清單、內嵌的 `basePath`/`assetPrefix` 常值（Next 16 僅從 `assetPrefix` 產生 SSR 資產 URL——修補程式會將子路徑同步至其中）、建置時寫入的 `/_next/static` 資產 URL（用戶端參照資訊清單、媒體匯入、預先算繪的錯誤頁面），以及用戶端的 `process.env` shim。

### Compose 建置（建議）

在 `.env` 中設定這兩個變數，然後重新建置，使映像檔與執行階段的設定一致：

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` 會將 `OMNIROUTE_BASE_PATH` 同時作為 Docker 建置引數及執行階段環境變數傳遞。

### 預先建置的根目錄映像檔 + 執行階段子路徑

已發布的 `diegosouzapw/omniroute:*` 映像檔是針對網域根目錄建置的。您仍可在執行階段設定 `OMNIROUTE_BASE_PATH`；容器會在啟動時修補一次套件。請搭配相符的公開來源：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

設定反向代理以轉送**完整的**外部路徑（請勿移除前綴）。Traefik 應將 `PathPrefix(`/omniroute`)` 路由至容器，且不使用 `StripPrefix`，如此 Next.js 才會收到 `/omniroute/...`，並從 `/omniroute/_next/...` 提供資產。

Docker 健康檢查會探測輕量級的 `/healthz` 生命週期端點，並加上目前生效的 `OMNIROUTE_BASE_PATH` 前綴。`/api/monitoring/health` 仍可供人員或儀表板進行診斷；若要讓容器的 HEALTHCHECK 改回指向該端點（例如用於強制執行深度健康檢查），請設定 `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`。該路徑是**深度**檢查（資料庫 + 監控摘要）——若您選擇重新啟用，這適合 Docker 低頻率的 `HEALTHCHECK`，但**不適合** Kubernetes `livenessProbe` 的執行間隔。

針對協調器（Kubernetes、Nomad 等）：

| 探針       | 建議使用                                                          | 避免                                         |
| ---------- | ----------------------------------------------------------------- | -------------------------------------------- |
| 存活性     | HTTP `GET /livez`，或主要連接埠上的 TCP（`PORT`，預設為 `20128`） | 將 `/api/monitoring/health` 用作存活性檢查   |
| 就緒性     | HTTP `GET /healthz`                                               | 使用會將事件迴圈忙碌視為已停止的嚴格逾時設定 |
| 深度／黑箱 | `/api/monitoring/health`                                          | —                                            |

`/healthz` 會回報程序生命週期（`ok` / `starting` / `stopping`）。`/livez` 僅回報程序是否存活（只要處理常式可以執行便回傳 200；它不會等待程序就緒）。兩者仍與請求處理在相同的 Node 事件迴圈上執行，因此受 CPU 限制的目錄或壓縮工作可能會延遲回應——忙碌 ≠ 已停止。若 HTTP 探針逾時，建議使用 TCP 存活性檢查。完整的探針指引：
[監控指南——Kubernetes 探針建議](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## 搭配 Caddy 的 Docker Compose（HTTPS 自動 TLS）

OmniRoute 可透過 Caddy 的自動 SSL 佈建功能安全地公開。請確保您網域的 DNS A 記錄指向伺服器的 IP。

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
      # 用於 OAuth 回呼、儀表板連結及產生公開 URL 的瀏覽器端來源。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # 用於排程工作／自行擷取的內部伺服器對伺服器 URL。
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

Caddy 會為上游容器設定標準轉送標頭。OmniRoute 使用
`NEXT_PUBLIC_BASE_URL` 作為 OAuth 回呼和所產生公開連結的標準公開來源；
經過驗證的儀表板寫入操作會使用同源請求以及繫結至工作階段的 CSRF
保護。僅在進階部署中啟用 `OMNIROUTE_TRUST_PROXY`，也就是您有意讓
OmniRoute 從受信任的轉送標頭推導公開來源，而不是使用明確設定時。

## Cloudflare 快速通道

Docker 部署的儀表板支援在 `Dashboard → Endpoints` 中一鍵啟用 **Cloudflare Quick Tunnel**。首次啟用時，僅會在需要時下載 `cloudflared`、啟動一條通往目前 `/v1` 端點的暫時通道，並直接在一般公開 URL 下方顯示產生的 `https://*.trycloudflare.com/v1` URL。

您可以從 `Settings → Appearance` 顯示或隱藏端點通道面板（Cloudflare、Tailscale、ngrok），而不會變更作用中通道的狀態。

### 通道注意事項

- 快速通道 URL 是暫時性的，每次重新啟動後都會變更。
- OmniRoute 或容器重新啟動後，快速通道不會自動還原。需要時請從儀表板重新啟用。
- 受管理的安裝目前支援 Linux、macOS，以及採用 `x64`／`arm64` 的 Windows。
- 受管理的快速通道預設使用 HTTP/2 傳輸，以避免在資源受限的容器環境中出現大量 QUIC UDP 緩衝區警告。若要使用不同的傳輸方式，請將 `CLOUDFLARED_PROTOCOL` 設為 `quic` 或 `auto`。
- Docker 映像檔內含系統 CA 根憑證，並將其傳遞給受管理的 `cloudflared`，以避免通道在容器內啟動時發生 TLS 信任失敗。
- 若要讓 OmniRoute 使用現有的二進位檔而非下載新檔案，請設定 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`。

## 映像標籤

| 映像                     | 標籤     | 大小   | 說明                                           |
| ------------------------ | -------- | ------ | ---------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 已**發布**的最高穩定 SemVer（不是 git `main`） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps 應固定使用此類標籤                      |

多平台資訊清單：原生支援 `linux/amd64` + `linux/arm64`（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker 會自動選擇相符的架構；若需要在 ARM 主機上強制使用 AMD64 模擬，請傳入 `--platform linux/amd64`。

### 發布通道

OmniRoute 針對穩定版本、作用中發布分支測試及開發組建，發布不同的 Docker 通道。

| 通道                            | 來源                         | 可變性               | 建議用途                                                                                       |
| ------------------------------- | ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | 已簽署／版本化的發布版本     | 不可變               | 固定使用確切發布版本的正式環境部署                                                             |
| `:latest` / `:latest-web`       | 已**發布**的最高穩定 SemVer  | 可變的穩定版本指標   | 在 SemVer 發布工作完成**之後**跟隨穩定版本——**不會**追蹤 `main` 或尚未發布的 `release/v*` 提交 |
| `:next` / `:next-web`           | 目前預設的 `release/v*` 分支 | 可變的預發布版本指標 | 測試已進入作用中發布分支、但尚未包含於穩定版本中的修正                                         |
| `:main` / `:main-web`           | `main` 分支                  | 可變的開發版本指標   | 僅供開發與整合測試使用                                                                         |

#### Web 工作階段提供者：`-web` 映像

上述每個通道都有對應的 `-web` 標籤（`:latest-web`、`:<version>-web`、`:next-web`、`:main-web`），由 `runner-web` 階段組建而成——它是相同的映像，另外包含 Playwright 和 Chromium 瀏覽器。一般映像**不含** Chromium；`gemini-web`、`claude-web` 和 `claude-turnstile` 需要它。

錯誤會延後到請求時發生，而不是在啟動時發生：這些提供者會列出其模型，並在儀表板中顯示為已連線，只有第一次請求會失敗並顯示

```
[500]: 無法載入外部模組 playwright：錯誤：找不到模組
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

如果使用這些提供者，請拉取目前所在通道的 `-web` 標籤——其他部分無須變更。若透過 npm/CLI 安裝（未使用 Docker 映像），對應的缺少項目是瀏覽器二進位檔：請在主機上執行 `npx playwright install chromium`。

#### 使用預發布通道

每當推送至目前預設的 `release/v*` 分支時，都會重新組建 `next` 通道，並同時針對 AMD64 與 ARM64 發布。較舊的維護分支無法覆寫它。此通道為已合併至作用中發布分支、但下一個穩定標籤尚未建立的修正提供可拉取的映像。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

若使用 Docker Compose，請覆寫所選設定檔使用的映像標籤，然後拉取映像並重新建立服務：

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 安全性與復原

`next` 是浮動的預發布通道。作用中發布分支每次有推送時，它都可能改變，而且**不支援用於正式環境**。評估特定組建時，請固定映像摘要：

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

測試前，請備份 OmniRoute 資料磁碟區或繫結掛載的資料目錄。若要復原，請還原先前使用的穩定版本或摘要，並重新建立容器：

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

發布分支組建絕不會移動 `latest`；只有符合資格的穩定語意版本才能更新此穩定版本指標。`next` 映像仍會保留發布映像檢查及 CRITICAL 漏洞阻擋閘門。

**`latest` 不保證包含 git 的最新內容。** 合併至 `main` 或作用中 `release/v*` 分支的修正，在穩定 SemVer 映像發布且發布工作將 `:latest` 更新至該版本之前，**不會**包含於 `:latest` 中（其摘要與該 SemVer 相同）。如果 GitHub 已顯示修正，但 `latest` 看似停滯不動，請拉取 `:next` 以測試發布分支，或等待 SemVer 標籤。

| 您的需求                                           | 使用方式                        |
| -------------------------------------------------- | ------------------------------- |
| 不得發生版本漂移的 GitOps／正式環境                | 固定使用 `:X.Y.Z`（或映像摘要） |
| 跟隨已發布的穩定版本，並接受每次發布時重新建立容器 | `:latest`                       |
| 測試尚未發布的 `release/v*` 提交                   | `:next`（非正式環境）           |
| 測試 `main`                                        | `:main`（非正式環境）           |

## 可用性：預設 SQLite 僅支援單一副本

標準 Docker / Kubernetes OmniRoute 是**一個 Node 程序 + 一個 SQLite 寫入器**。此拓撲**不支援**高可用性。

| 限制                                   | 後果                                                                                                                                                                                                                                           |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 單一寫入器                             | **請勿**讓多個副本使用同一個 SQLite 檔案。這會損毀資料庫。                                                                                                                                                                                     |
| 重建 / 重新啟動 / HEALTHCHECK 終止程序 | 進行中的 SSE、儀表板工作階段及記憶體內狀態會**完全中斷**。所有已連線的用戶端都會斷線。在沒有端點可用的期間，新請求會收到反向代理的 **`502 Bad Gateway: Unknown error`**，而不是 OmniRoute JSON——用戶端無法將其與提供者故障區分開來（#11015）。 |
| 與 `/healthz` 使用相同事件迴圈         | 繁忙的目錄或壓縮週期可能會延遲探測；過短的逾時隨後會導致**唯一的**副本重新啟動。                                                                                                                                                               |

**探測矩陣**（另請參閱 [Kubernetes 探測建議](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)）：

| 探測類型            | 目標                                                                   | 請勿使用                                   |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------ |
| 存活探測            | 對 `PORT`（預設為 `20128`）進行 TCP 探測，或使用寬鬆的 HTTP `/healthz` | `/api/monitoring/health`                   |
| 就緒探測            | HTTP `GET /healthz`                                                    | 將事件迴圈繁忙視為程序已停止的嚴格逾時設定 |
| 深度檢查 / 人工檢查 | `/api/monitoring/health`                                               | 自動化 kubelet 存活探測                    |

**升級：**應預期每個工作階段都會中斷。若可行，請先排空用戶端；預設 SQLite 不支援滾動更新。Compose 的 `restart: unless-stopped` 搭配 Docker `HEALTHCHECK`，也會在容器處於 Unhealthy 狀態時取代唯一的程序——影響範圍相同。

適用於**單一副本**的 Kubernetes 片段（必須使用 Recreate；請勿針對同一個 SQLite 檔案增加 `replicas`）：

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

`preStop` 的休眠讓 kube 能在 SIGTERM 之前移除 Service 端點，使**新的**流量不再抵達即將終止的程序。進行中的 `/v1/responses` SSE 會透過重量級准入租約，在最多 `SHUTDOWN_TIMEOUT_MS`（預設為 30 秒）的時間內排空（#11015）。仍然抵達程序的新請求會收到 `503` + `Retry-After: 5`。在替代程序達到 Ready 狀態之前，Recreate 所造成的無端點空窗期仍會導致完全中斷——這是 SQLite 拓撲的限制，而非探測設定錯誤。

外部 Postgres / 多寫入器 HA **並非**已有文件記載的標準支援路徑。若需要 HA，請維持單一副本，或執行專案已另行測試並記載於文件中的拓撲。Postgres/MySQL 相關工作記錄於 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。在該功能發布之前，要擴充**大型** `/v1/responses` 容量，唯一受支援的方式是使用 N 個彼此獨立的程序（下一節），而不是在同一個磁碟區上設定 `replicas > 1`。

## 橫向擴展：N 個獨立程序

一個 Node 程序就是**一個 V8 堆積**。兩個重疊執行、約 3 MiB／約 750k token 的程式設計代理 `POST /v1/responses`（RTK + Caveman），會在堆積達到約 12 Gi 時中止（`FATAL ERROR: Reached heap limit`），也可能使 16 Gi 的 cgroup 發生 OOM。請參閱 [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)。這項測量是**記憶體預算**警告，而不是產品將並行長時間 `/v1/responses` 硬性限制為兩個。重量級聊天的准入會受到自動推導的擷取位元組預算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`、`src/shared/middleware/admissionBudget.ts`）控管；該預算依據相同的 V8/cgroup 上限設定——若在已完成容量規劃的程序上向上覆寫此值（或設定舊版的 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` 請求數量上限），將再次導致程序中止。小型聊天、`/healthz`、`/v1/models` 與 MCP **不受**此上限限制。

### 單一程序：超過兩個長時間 `/v1/responses`

**健康的**程序（堆積低於 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`，預設為 `0.75`）在全程序的傳輸中位元組預算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）仍有餘裕時，**可以**並行執行超過兩個長時間的 `POST /v1/responses`。大小達到或超過 `OMNIROUTE_CHAT_LARGE_BODY_BYTES`（預設為 256 KiB）的主體，會取得與結構複雜請求相同的重量級租約，並使用相同的 [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` 逸出機制（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）。數十個並行的長時間 SSE 用戶端（營運人員通常需要 40–50 個）屬於**記憶體預算**問題——應調整堆積、主要／餘裕槽位及 `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` 的容量——而非產品硬性的「最多 2 個」限制。堆積面臨壓力時，仍會以可重試的 `503` 卸載請求，避免 #7849 再次發生。

若要在**目前**將堆積數量倍增（獨立的 V8 old-space）：

| 應該做                                                                                                          | 不應該做                                        |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 執行 **N 個容器／Pod**，每個都使用**自己的** `DATA_DIR`／磁碟區                                                 | 對同一個 SQLite 檔案設定 `replicas > 1`         |
| 根據堆積／傳輸中位元組預算調整重量級傳輸中請求及健康餘裕的容量；1–2 是針對 #7849 的保守預設值，不是產品硬性上限 | 為單一程序提供 8 倍 RAM，並設定無上限的數量限制 |
| 選用：透過 `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` 使用**共用配額計數器**                          | 將 Redis 視為共用 SQLite——它並不是              |
| 將提供者密鑰複製到每個執行個體（或接受各自獨立的儀表板）                                                        | 預期所有執行個體共用一個儀表板／呼叫日誌        |
| 前端可使用任何負載平衡器；依 API 金鑰或工作階段進行黏著式路由即可                                               | 要求提供者特定且可感知大小的中介軟體            |

硬體方面：每個執行個體可並行處理多少個長時間 `/v1/responses`，屬於**記憶體預算**問題（堆積 + 傳輸中位元組／#10110）。即使使用獨立的 `DATA_DIR`，`N` 個執行個體仍會使堆積數量倍增：主機 RAM 必須足以容納 `N × cgroup`，而不是「一個 16 Gi Pod 搭配 N=8」。絕不可讓同一個 SQLite 檔案使用 `replicas > 1`。

Compose 範例（兩個堆積、兩個磁碟區——不是 `deploy.replicas: 2`）：

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

程序內密度（將壓縮移出 HTTP isolate）請參閱 [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)。在共用持久狀態上建立單一邏輯叢集請參閱 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)。

## 重要注意事項

- **SQLite WAL 模式：** 應允許 `docker stop` 完成，以便 OmniRoute 將最新變更檢查點寫回 `storage.sqlite`。隨附的 Compose 檔案已設定 40 秒的停止寬限期。如果直接執行映像檔，請保留 `--stop-timeout 40`。
- **`DISABLE_SQLITE_AUTO_BACKUP`：** 如果例行／寫入前備份由外部管理，請設為 `true`。現有資料庫的移轉仍需要其自身的持久安全快照與大量移轉防護機制。
- **資料持久化：** 請一律將磁碟區掛載至 `/app/data`，以便在容器重新啟動後保留資料庫、金鑰與設定。
- **連接埠設定：** 覆寫 `PORT` 環境變數即可變更預設的 `20128` 連接埠。

## 另請參閱

- [VM 部署指南](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare 設定
- [Fly.io 部署指南](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — 部署至 Fly.io
- [環境設定](../reference/ENVIRONMENT.md) — 完整的 `.env` 參考資料
