# 🐳 Docker Guide — OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> 전체 Docker 배포 참조 문서입니다. 빠르게 시작하려면 [README의 Docker 섹션](../README.md#-docker)을 참조하세요.

## 목차

- [빠른 실행](#quick-run)
- [환경 파일 사용](#with-environment-file)
- [Docker Compose](#docker-compose)
- [사용 가능한 프로필](#available-profiles)
- [OmniRoute가 Docker에서 실행될 때 호스트 CLI 도구 구성](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis 사이드카](#redis-sidecar)
- [프로덕션 Compose](#production-compose)
- [Dockerfile 스테이지](#dockerfile-stages)
- [중요 환경 변수](#critical-environment-variables)
- [Caddy를 사용하는 Docker Compose (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [이미지 태그](#image-tags)
- [가용성: 기본 SQLite는 단일 복제본](#availability-default-sqlite-is-single-replica)
- [중요 참고 사항](#important-notes)

---

## 빠른 실행

> **명령어 하나로 셀프 호스팅하시겠습니까?**  
> [셀프 호스팅 가이드](../getting-started/SELF_HOST_GUIDE.md)를 참조하세요 —
> `docker compose -f docker-compose.selfhost.yml up -d`(게시된 이미지 +
> Redis, 루프백 전용, 프로필 선택 없음). 아래의 빠른 실행은 이미 다른 곳에서
> Redis를 실행 중인 사용자를 위한 단일 컨테이너 방식입니다.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 환경 파일 사용

```bash
# 먼저 .env를 복사하고 편집합니다
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
# 기본 프로필(CLI 도구 없음)
docker compose --profile base up -d

# CLI 프로필(Claude Code, Codex, OpenClaw 내장)
docker compose --profile cli up -d

# 호스트 프로필(Linux 우선, 호스트 CLI 바이너리를 읽기 전용으로 마운트)
docker compose --profile host up -d

# CLI + CLIProxyAPI 사이드카 결합
docker compose --profile cli --profile cliproxyapi up -d
```

## 사용 가능한 프로필

OmniRoute는 네 가지 Compose 프로필을 제공합니다. 환경에 맞는 프로필을 선택하세요.

| 프로필          | 서비스           | 사용 시점                                                                                                                            | 명령어                                       |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (기본값) | `omniroute-base` | 헤드리스 서버 / 최소 런타임이며, 공급자 CLI가 포함되지 않음                                                                          | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | `omniroute providers/setup/doctor` 및 내장 CLI(Codex, Claude Code, Droid, OpenClaw)를 호출하는 에이전트형 워크플로                   | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | `~/.local/bin`, `~/.codex`, `~/.claude` 등을 읽기 전용으로 마운트하여 호스트 CLI에 `network_mode`와 유사하게 접근하려는 Linux 호스트 | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | 업스트림 CLI 프록시를 위해 포트 `8317`에서 [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 사이드카 실행                 | `docker compose --profile cliproxyapi up -d` |

> 여러 프로필을 함께 사용할 수 있습니다: `docker compose --profile cli --profile cliproxyapi up -d`.

## OmniRoute가 Docker에서 실행될 때 호스트 CLI 도구 구성하기

`omniroute setup-codex`, `setup-claude`, `config set <tool>` 및 대시보드의
**구성 저장** 버튼은 모두 `~/.codex/*.config.toml`과 같은 파일을 작성합니다. 이러한 경로는
CLI가 실제로 실행되는 머신에서만 의미가 있습니다. 컨테이너 내부에서 실행하면
컨테이너 자체의 홈 디렉터리(`/home/node` — 이미지는 `USER node`로 실행됨)에 파일이 작성되므로,
호스트 CLI가 이를 읽을 수 없으며 컨테이너가 재생성되는 즉시 삭제됩니다.

OmniRoute는 이를 감지하여 사용할 수 없는 성공 결과를 보고하는 대신
안내와 함께 쓰기를 거부합니다. CLI는 `2`로 종료되고 API는
`containerEphemeralTarget: true`와 함께 `422`로 응답합니다.

### 권장: CLI는 호스트에서, OmniRoute는 Docker에서 실행

컨테이너는 API를 제공하고, CLI는 호스트 도구를 구성합니다.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI가 컨테이너를 가리키도록 설정
omniroute setup-codex                      # 호스트의 실제 ~/.codex에 작성
```

이는 Codex, Claude Code, Cursor 또는 유사한 도구를 노트북에서 실행할 때
적합한 선택이며, 가장 일반적인 설정입니다.

### 대안: 호스트 구성 디렉터리를 바인드 마운트(`host` 프로필)

컨테이너 자체에서 호스트 구성을 작성하도록 하려면 해당 디렉터리를
마운트하고 `CLI_CONFIG_HOME`이 마운트 루트를 가리키도록 설정합니다. `host` 프로필에는
이미 다음과 같이 설정되어 있습니다.

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

바인드 마운트는 경로를 신뢰할 수 있게 해 줍니다. OmniRoute는
`/proc/self/mountinfo`를 읽고 마운트된 경로뿐 아니라 하위 항목이 마운트된
디렉터리(위의 `/host-home` 구조가 정확히 이에 해당함)에 대한 쓰기도 허용하는 한편,
마운트되지 않은 경로에 대한 쓰기는 계속 거부합니다.

### 예외 처리: 컨테이너 자체의 CLI 구성(신중하게 사용)

CLI가 실제로 컨테이너 내부에 있는 경우(`cli` 프로필)에는 쓰기가 의도된 동작입니다.
모든 `setup-*` 명령에 `--allow-container-write`를 전달하거나 서버에
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`를 설정합니다. 그러면 해당 쓰기 내용이
컨테이너 종료 후 유지되지 않는다는 경고와 함께 쓰기가 진행됩니다.

> **보안 경고 — `cli` 프로필 + `docker.sock` 마운트.**
> `cli` 프로필은 컨테이너 내 자동 업데이터가 호스트 데몬을 통해 스택을
> 재생성할 수 있도록 `/var/run/docker.sock`을 바인드 마운트합니다.
> (`src/lib/system/autoUpdate.ts`는 해당 소켓을 탐지하고, 소켓이 없으면
> Docker 경로를 건너뜁니다.) 이 소켓은 **호스트 root 권한에 대한 신뢰
> 경계**입니다. 이 소켓에 접근할 수 있는 모든 것은 호스트 Docker 데몬을
> root 권한으로 제어하므로 호스트의 모든 컨테이너를 생성, 검사, 중지 및 제거할 수 있습니다.
> 이로 인한 주의 사항은 다음과 같습니다.
>
> 1. **`cli` 프로필의 포트를 네트워크에 절대로 노출하지 마세요.**
>    `127.0.0.1`에 게시하세요(`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`).
>    LAN에서 접근 가능한 `cli` 프로필은 대시보드 수준의 모든 RCE를
>    호스트 전체 침해로 확대합니다.
> 2. **추가 호스트 디렉터리를 `cli` 프로필에 바인드하지 마세요.**
>    Docker 소켓과 추가 마운트가 함께 있으면 컨테이너가 파일 시스템과
>    호스트 구성에 대한 완전한 읽기/쓰기 권한을 갖게 됩니다. 도구가 프로젝트를
>    확인해야 한다면 CLI 바이너리를 사용해 로컬에서 실행하고, 프로젝트를
>    `cli` 컨테이너에 마운트하지 마세요.
>
> 컨테이너 내부 자동 업데이트가 필요하지 않다면 `cli` 프로필을 비활성화하세요
> (`COMPOSE_PROFILES=core,redis` 또는 더 짧게 설정). 다른 프로필은
> Docker 소켓을 마운트하지 않습니다.
>
> MITM 관련 위협 모델은 `docs/security/MITM-TPROXY-DECRYPT.md`(git에 있으며 `/docs`에는 컴파일되지 않음)를,
> `codex`/`claude-code`/`droid`/`openclaw` 바이너리 출처 체인은
> `docs/security/SUPPLY_CHAIN.md`를 참조하세요.

## Redis 사이드카

OmniRoute는 분산 속도 제한기와 공유 캐시를 지원하기 위해 Redis를 사용합니다. `redis` 서비스는 `docker-compose.yml`에 **항상 정의되어 있으며**(프로필 제한 없음), 다른 어떤 프로필과도 함께 시작됩니다.

| 세부 정보             | 값                                      |
| --------------------- | --------------------------------------- |
| 이미지                | `redis:7-alpine`                        |
| 컨테이너 이름         | `omniroute-redis`                       |
| 내부 포트             | `6379`                                  |
| 호스트 포트(재정의)   | `REDIS_PORT` (기본값: `6379`)           |
| 호스트 바인딩(재정의) | `REDIS_BIND_HOST` (기본값: `127.0.0.1`) |
| 볼륨                  | `omniroute-redis-data` → `/data`        |
| 상태 확인             | `redis-cli ping` (10초 간격)            |

관련 환경 변수:

- `REDIS_URL` — 앱에 주입되는 연결 문자열(기본값: `redis://redis:6379`).
- `REDIS_PORT` — Redis 컨테이너의 호스트 측 포트 매핑.
- `REDIS_BIND_HOST` — 포트가 게시되는 호스트 인터페이스. 기본값은 `127.0.0.1`입니다.

> **기본적으로 루프백을 사용하는 이유:** 사이드카는 `requirepass` 없이 실행되며, 앱
> 컨테이너는 compose 네트워크(`redis:6379`)를 통해 사이드카에 연결합니다. 게시된 포트는
> 호스트 측 도구(`redis-cli`, 로컬 `npm run dev`)에서만 사용됩니다. `0.0.0.0`에 게시하면
> 인증되지 않은 Redis가 LAN의 모든 호스트에 노출됩니다. `REDIS_BIND_HOST=0.0.0.0`으로
> 설정하는 경우 서비스의 `command:`에도 `--requirepass`를 추가하세요.

**Redis 비활성화**는 권장하지 않습니다(속도 제한기가 메모리 내 폴백으로 성능 저하됨). 반드시 비활성화해야 한다면 `docker-compose.yml`에서 `redis:` 서비스 블록을 제거하거나 주석 처리하거나, 다음과 같이 인스턴스 수를 0으로 조정하세요.

```bash
docker compose up -d --scale redis=0
```

## 프로덕션 Compose

개발 환경과 함께 실행되는 격리된 프로덕션 스냅샷에는 `docker-compose.prod.yml`을 사용하세요.

| 세부 정보          | 값                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------ |
| 파일               | `docker-compose.prod.yml`                                                            |
| 기본 대시보드 포트 | `PROD_DASHBOARD_PORT=20130` (내부 `${DASHBOARD_PORT:-20128}`에 매핑)                 |
| 기본 API 포트      | `PROD_API_PORT=20131`                                                                |
| 이미지             | `omniroute:prod` (`runner-cli` 대상에서 빌드)                                        |
| Redis 컨테이너     | `omniroute-redis-prod` (`redis:8.6.2`, 전용 `redis-prod-data` 볼륨)                  |
| 데이터 볼륨        | `omniroute-prod-data` (명명된 볼륨, 재빌드 후에도 유지됨)                            |
| 상태 확인          | `node healthcheck.mjs` + `redis-cli ping`, Redis 상태를 기준으로 제한된 `depends_on` |

사용 방법:

```bash
# 프로덕션 스택 빌드 및 시작
docker compose -f docker-compose.prod.yml up -d --build

# 로그 스트리밍
docker compose -f docker-compose.prod.yml logs -f

# 종료(볼륨 유지)
docker compose -f docker-compose.prod.yml down
```

프로덕션 스택은 개발용 compose와 서로 다른 컨테이너 이름, 포트 및 볼륨을 사용하여 병렬로 실행되므로, 프로덕션을 계속 실행하면서 로컬에서 개발을 이어갈 수 있습니다.

## Dockerfile 스테이지

이 저장소는 멀티 스테이지 Dockerfile(`Dockerfile`)을 제공합니다. 세 개의 스테이지가 노출되어 있으므로 사용 사례에 적합한 `target`을 선택하세요.

| 스테이지      | 베이스 이미지         | 용도                                                                                                                                                                              |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 종속성을 설치하고(`npm ci --legacy-peer-deps`) `npm run build`를 실행합니다(기본값은 Turbopack — 아래의 빌드 시점 리소스 참조).                                                   |
| `runner-base` | `node:26-trixie-slim` | Next.js standalone 출력을 사용하는 프로덕션 런타임입니다. **프로바이더 CLI는 포함되지 않습니다.**                                                                                 |
| `runner-cli`  | `runner-base`         | `git`, `docker.io`, `docker-compose` 및 전역 CLI인 `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`을 추가합니다. **에이전트형 워크플로에는 이것을 선택하세요.** |

특정 타깃을 수동으로 빌드하려면 다음을 실행하세요.

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### 빌드 시점 리소스

세 가지 빌드 인수가 `builder` 스테이지의 리소스 사용량을 제어합니다. 이들은 빌드 시점에만 적용됩니다.
아래의 `OMNIROUTE_MEMORY_MB`는 별도의 런타임 설정입니다.

| 빌드 인수                   | 기본값 | 효과                                                                                          |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0`이면 대신 webpack으로 빌드합니다. 최대 메모리 사용량은 낮지만 더 느립니다.                 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | 생성된 `next build`에 대한 V8 힙 상한(`--max-old-space-size`)입니다.                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | `CIRCLE_NODE_TOTAL`에 전달됩니다. Next는 페이지 데이터 수집에 `workers = N - 1`을 사용합니다. |

`OMNIROUTE_BUILD_WORKERS`는 대규모 빌더에서는 늘려야 하고, 리소스가 제한된 빌드가 `✓ Compiled successfully` **이후** 실패할 때는 원인으로 의심해야 하는 설정입니다. 각 페이지 데이터 워커는 별도의 프로세스이며, 상위 `next build` 자체도 별도의 프로세스입니다. 실제 VPS에서 재현한 결과(issue #7518), 각 프로세스의 최대 RSS는 `NODE_OPTIONS` 힙 플래그와 무관하게 약 4.5 GB로 측정되었습니다(Turbopack은 V8 힙 외부의 네이티브/Rust 메모리에서 컴파일합니다). 기본값 `2`(→ 워커 1개, 총 프로세스 2개)는 게시 파이프라인에서 사용하는 16 GB / 4 vCPU GitHub 호스팅 러너에 맞춰져 있습니다. `8`(→ 워커 7개)에서는 해당 러너의 메모리가 고갈되었고 buildkit이 `ResourceExhausted: ... cannot allocate memory`와 함께 단계를 실패 처리했습니다. 프로세스별 RSS를 추론하지 않고 직접 측정한 결과, `3`(→ 워커 2개)도 여전히 메모리 한도 내에 들어오지 않았습니다. `tests/unit/docker-build-memory-budget.test.ts`는 측정값을 기준으로 계산하며, 어느 설정이든 러너의 용량을 초과하면 실패합니다.

Turbopack은 V8 힙 **외부**에 있는 네이티브 Rust 메모리에서 컴파일하므로 `OMNIROUTE_BUILD_MEMORY_MB`로는 이를 제한할 수 없습니다. 메모리 상한이 있는 호스트에서는 OOM 킬러가 아무런 오류 메시지 없이 빌드를 SIGKILL합니다. 즉, `Creating an optimized production build` 도중에 멈출 뿐이어서 메모리 부족이 아니라 중단된 것처럼 보입니다. 빌드 호스트의 리소스가 제한된 경우 번들러를 전환하세요.

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker`가 활성화되어 있으므로 `next build`는 상위 프로세스와 워커 프로세스를 실행하며, 각 프로세스는 `OMNIROUTE_BUILD_MEMORY_MB`를 별도로 적용합니다. 컨테이너 상한은 해당 값의 한 배가 아니라 대략 두 배보다 높게 설정하세요.

이 트리에서 측정한 결과(`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`)는 다음과 같습니다.

| 번들러    | 컨테이너 상한  | 결과                              |
| --------- | -------------- | --------------------------------- |
| Turbopack | 8 GiB / 16 GiB | 둘 다 아무 메시지 없이 OOM 종료됨 |
| webpack   | 8 GiB          | 빌드 워커가 SIGKILL됨             |
| webpack   | 12 GiB         | 성공, 최대 11.1 GiB 사용          |

### 런타임 기본값

`runner-base`가 내보내는 기본값은 `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`입니다.

Docker에서의 메모리 동작:

- 이미지는 `OMNIROUTE_MEMORY_MB=1024`를 설정하고, 이를 바탕으로 `NODE_OPTIONS=--max-old-space-size=1024`를 구성합니다.
- 실제 서버 프로세스는 standalone 런처가 시작하며, 이 런처는 `OMNIROUTE_MEMORY_MB`를 읽고 `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`를 추가합니다.
- Node는 반복 지정된 `--max-old-space-size` 값 중 마지막 값을 사용하므로, `OMNIROUTE_MEMORY_MB`를 설정하면 Docker의 실질적인 힙 한도를 제어할 수 있습니다.
- 이미지가 이 값을 항상 설정하므로, 런처 자체의 RAM 기반 보정 대체값은 Docker에서 적용되지 않습니다. 워크로드에 맞게 명시적으로 늘리세요(아래 표 참조). 코딩 에이전트의 `/v1/responses`에는 `2048`도 여전히 너무 작습니다.

### 코딩 에이전트의 런타임 RAM

Docker 기본값인 1 GiB는 대시보드/가벼운 채팅을 위한 최소값이며, 프로덕션 규모가 아닙니다. 긴 `POST /v1/responses` 본문(수백 개의 메시지와 수십 개의 도구)은 압축 중 여러 인메모리 그래프를 유지합니다. 서로 겹치는 약 3 MiB / 약 750k 토큰 요청 두 건은 **12 GiB** old-space에서 V8을 중단시켰으며(`FATAL ERROR: Reached heap limit`), 16 GiB cgroup OOM에도 도달했습니다. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)를 참조하세요.

cgroup `--memory`는 **힙보다 크게** 설정하세요. 네이티브 버퍼, SQLite 및 압축 중간 데이터는 V8 외부에 존재합니다.

| 워크로드                                 | `OMNIROUTE_MEMORY_MB`            | 컨테이너 / cgroup | 참고                                                                                        |
| ---------------------------------------- | -------------------------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| 대시보드, 가벼운 채팅 하나               | `1024` (이미지 기본값)           | ≥2 GiB            |                                                                                             |
| 코딩 에이전트 하나(Claude/Codex/Grok)    | `8192`                           | ≥10 GiB           | 일반적인 단일 세션 `/v1/responses`                                                          |
| 동시에 실행되는 긴 `/v1/responses` 두 개 | `10240`–`12288`                  | ≥12–16 GiB        | 힙이 약 12 GiB일 때 V8 중단이 측정됨                                                        |
| 동시에 실행되는 긴 컨텍스트 세 개 이상   | 단일 프로세스에서 실행하지 말 것 | 직렬화 / RAM 추가 | 기본 고부하 작업 허용량은 진행 중 1개이며, RAM을 늘리지 않고 이를 높이면 중단이 다시 발생함 |

베어 메탈에서 `omniroute serve`는 `OMNIROUTE_MEMORY_MB`가 **설정되지 않은** 경우 RAM의 약 35%로 보정합니다(`[512, 4096]` 범위로 제한). Docker는 항상 `1024`로 설정하므로 공식 이미지에서는 이 보정이 실행되지 않습니다.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 필수 환경 변수

[ENVIRONMENT.md](../reference/ENVIRONMENT.md)에 문서화된 기본값 외에도 Docker에서 실행할 때는 다음 변수가 가장 중요합니다.

| 변수                          | 용도                                                                                                                                                                                                                                                        | 기본값                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket 브리지의 공유 비밀 값입니다. **프로덕션 환경에서 필수** — 강력한 무작위 문자열로 설정하세요.                                                                                                                                                      | 설정되지 않음(필수 제공) |
| `REDIS_URL`                   | 속도 제한기/캐시 백엔드의 연결 문자열입니다.                                                                                                                                                                                                                | `redis://redis:6379`     |
| `REDIS_PORT`                  | 번들 Redis 컨테이너의 호스트 측 포트입니다.                                                                                                                                                                                                                 | `6379`                   |
| `REDIS_BIND_HOST`             | 번들 Redis 포트가 게시되는 호스트 인터페이스입니다(AUTH를 추가하지 않는 한 루프백).                                                                                                                                                                         | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 자체 업데이트 워크플로를 위해 `cli` 프로필의 `/workspace/omniroute`에 마운트되는 호스트 경로입니다.                                                                                                                                                         | `.` (현재 디렉터리)      |
| `OMNIROUTE_MEMORY_MB`         | Docker 독립 실행형 서버의 런타임 Node 힙 상한입니다. 위의 이미지 기본값보다 우선합니다. 코딩 에이전트: `8192` 이상([런타임 RAM](#runtime-ram-for-coding-agents) 참조).                                                                                      | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | 대시보드(20128) 및 API(20129)의 노출 포트를 재정의합니다.                                                                                                                                                                                                   | `20128` / `20129`        |
| `APP_BIND_HOST`               | docker-compose가 대시보드/API/라이브 WS 포트를 게시하는 호스트 인터페이스입니다. `REQUIRE_API_KEY=false`(기본값)이면 `0.0.0.0`은 익명 `/v1` 프록시를 LAN에 노출합니다. `REQUIRE_API_KEY=true`이거나 앞단에 역방향 프록시가 있는 경우에만 범위를 확장하세요. | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | docker-compose가 `cliproxyapi` 사이드카를 게시하는 호스트 인터페이스입니다. 해당 데이터 볼륨에는 공급자 자격 증명이 저장됩니다.                                                                                                                             | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | 런타임 플러그인 스캐너가 읽고 설치하는 디렉터리입니다. 플러그인이 바인드 마운트된 경우 설정하세요. 기본값은 `HOME`을 따르지만 이미지에서 이를 내보내지 않을 수 있습니다.                                                                                    | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | 앱이 역방향 프록시 뒤에 게시될 때 사용하는 URL 하위 경로입니다(예: `/omniroute`).                                                                                                                                                                           | _(비어 있음 = 루트)_     |
| `NEXT_PUBLIC_BASE_URL`        | 하위 경로를 포함하는 공개 브라우저 오리진입니다(예: `https://host/omniroute`).                                                                                                                                                                              | 설정되지 않음            |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml`의 호스트 측 대시보드 포트입니다.                                                                                                                                                                                                  | `20130`                  |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` 사이드카의 호스트 측 포트입니다.                                                                                                                                                                                                              | `8317`                   |

## 하위 경로의 리버스 프록시 (Traefik / nginx)

Next.js `basePath`는 standalone 번들에 컴파일됩니다. OmniRoute는 앱 루트의 센티널 파일에 빌드 시 적용된 값을 기록하고(`npm run build` 실행 중 작성되며 `scripts/docker/ensure-docker-base-path.mjs`에서 읽음), 컨테이너가 시작될 때 해당 값을 `OMNIROUTE_BASE_PATH`와 비교합니다. 값이 서로 다르고 이미지가 도메인 루트용으로 빌드된 경우, 엔트리포인트는 `node dev/run-standalone.mjs`가 실행되기 전에 standalone 매니페스트, 포함된 `basePath`/`assetPrefix` 리터럴(Next 16은 `assetPrefix`만 사용하여 SSR 애셋 URL을 렌더링하므로 패처가 하위 경로를 해당 값에도 반영함), 빌드 시 포함된 `/_next/static` 애셋 URL(클라이언트 참조 매니페스트, 미디어 가져오기, 사전 렌더링된 오류 페이지) 및 클라이언트 `process.env` 심을 다시 작성합니다.

### Compose 빌드(권장)

이미지와 런타임의 설정이 일치하도록 `.env`에 두 변수를 모두 설정한 후 다시 빌드합니다.

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml`은 `OMNIROUTE_BASE_PATH`를 Docker 빌드 인수와 런타임 환경 변수로 전달합니다.

### 사전 빌드된 루트 이미지 + 런타임 하위 경로

게시된 `diegosouzapw/omniroute:*` 이미지는 도메인 루트용으로 빌드됩니다. 런타임에 `OMNIROUTE_BASE_PATH`를 설정할 수도 있으며, 컨테이너는 시작 시 번들을 한 번 패치합니다. 이에 대응하는 공개 오리진도 함께 설정하십시오.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

리버스 프록시가 외부 경로 **전체**를 전달하도록 설정하십시오(접두사를 제거하지 마십시오). Traefik은 `StripPrefix` 없이 `PathPrefix(`/omniroute`)`를 컨테이너로 라우팅해야 합니다. 그러면 Next.js가 `/omniroute/...`를 수신하고 `/omniroute/_next/...`에서 애셋을 제공합니다.

Docker 헬스 체크는 활성 `OMNIROUTE_BASE_PATH`가 접두사로 추가된 경량 `/healthz` 수명 주기 엔드포인트를 검사합니다. `/api/monitoring/health`는 사용자/대시보드 진단용으로 계속 사용할 수 있습니다. 컨테이너 HEALTHCHECK가 이 엔드포인트를 다시 사용하도록 하려면(예: 심층 상태 검사를 강제하려는 경우) `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`를 설정하십시오. 이 경로는 **심층** 검사(DB + 모니터링 요약)입니다. 다시 사용하도록 설정할 경우 Docker의 낮은 빈도로 실행되는 `HEALTHCHECK`에는 적합하지만, Kubernetes `livenessProbe` 주기에는 **적합하지 않습니다**.

오케스트레이터(Kubernetes, Nomad 등)의 경우:

| 프로브          | 권장                                                           | 지양                                                               |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| 라이브니스      | HTTP `GET /livez` 또는 기본 포트(`PORT`, 기본값 `20128`)의 TCP | 라이브니스에 `/api/monitoring/health` 사용                         |
| 레디니스        | HTTP `GET /healthz`                                            | 이벤트 루프가 바쁜 상태를 프로세스 중단으로 간주하는 짧은 타임아웃 |
| 심층 / 블랙박스 | `/api/monitoring/health`                                       | —                                                                  |

`/healthz`는 프로세스 수명 주기 상태(`ok` / `starting` / `stopping`)를 보고합니다. `/livez`는 프로세스의 생존 여부만 확인합니다(핸들러가 실행될 수 있으면 항상 200을 반환하며 레디니스 상태를 기다리지 않음). 두 엔드포인트 모두 요청 처리와 동일한 Node 이벤트 루프에서 실행되므로 CPU 집약적인 카탈로그 또는 압축 작업으로 인해 응답이 지연될 수 있습니다. 즉, 바쁨 ≠ 중단입니다. HTTP 프로브가 시간 초과되면 TCP 라이브니스를 사용하는 것이 좋습니다. 전체 프로브 지침:
[모니터링 가이드 — Kubernetes 프로브 권장 사항](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Caddy를 사용한 Docker Compose (HTTPS 자동 TLS)

Caddy의 자동 SSL 프로비저닝을 사용하여 OmniRoute를 안전하게 외부에 공개할 수 있습니다. 도메인의 DNS A 레코드가 서버의 IP를 가리키는지 확인하세요.

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
      # OAuth 콜백, 대시보드 링크 및 생성된 공개 URL을 위한 브라우저 대상 오리진입니다.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # 예약 작업/자체 요청을 위한 내부 서버 간 URL입니다.
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

Caddy는 업스트림 컨테이너에 표준 전달 헤더를 설정합니다. OmniRoute는
OAuth 콜백 및 생성된 공개 링크의 정식 공개 오리진으로 `NEXT_PUBLIC_BASE_URL`을
사용합니다. 인증된 대시보드 쓰기 작업에는 동일 출처 요청과 세션에 바인딩된 CSRF
보호가 적용됩니다. 명시적 구성 대신 신뢰할 수 있는 전달 헤더에서 공개 오리진을
파생하도록 OmniRoute를 의도적으로 설정하는 고급 배포에서만 `OMNIROUTE_TRUST_PROXY`를 활성화하세요.

## Cloudflare Quick Tunnel

Docker 배포용 대시보드는 `Dashboard → Endpoints`에서 클릭 한 번으로 사용할 수 있는 **Cloudflare Quick Tunnel**을 지원합니다. 처음 활성화하면 필요한 경우에만 `cloudflared`를 다운로드하고, 현재 `/v1` 엔드포인트로 임시 터널을 시작한 다음, 생성된 `https://*.trycloudflare.com/v1` URL을 일반 공개 URL 바로 아래에 표시합니다.

엔드포인트 터널 패널(Cloudflare, Tailscale, ngrok)은 활성 터널 상태를 변경하지 않고 `Settings → Appearance`에서 표시하거나 숨길 수 있습니다.

### 터널 참고 사항

- Quick Tunnel URL은 임시이며 다시 시작할 때마다 변경됩니다.
- OmniRoute 또는 컨테이너를 다시 시작한 후에는 Quick Tunnel이 자동으로 복원되지 않습니다. 필요한 경우 대시보드에서 다시 활성화하세요.
- 관리형 설치는 현재 `x64` / `arm64` 기반 Linux, macOS 및 Windows를 지원합니다.
- 관리형 Quick Tunnel은 제약이 있는 컨테이너 환경에서 과도한 QUIC UDP 버퍼 경고를 방지하기 위해 기본적으로 HTTP/2 전송을 사용합니다. 다른 전송 방식을 사용하려면 `CLOUDFLARED_PROTOCOL=quic` 또는 `auto`로 설정하세요.
- Docker 이미지는 시스템 CA 루트를 포함하고 이를 관리형 `cloudflared`에 전달하므로, 컨테이너 내부에서 터널이 부트스트랩될 때 발생하는 TLS 신뢰 오류를 방지할 수 있습니다.
- OmniRoute가 바이너리를 다운로드하는 대신 기존 바이너리를 사용하도록 하려면 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`로 설정하세요.

## 이미지 태그

| 이미지                   | 태그     | 크기   | 설명                                                      |
| ------------------------ | -------- | ------ | --------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | **게시된** 안정 SemVer 중 가장 높은 버전(git `main` 아님) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps에서는 이 유형의 태그로 고정하세요                  |

멀티 플랫폼 매니페스트: `linux/amd64` + `linux/arm64` 네이티브(Apple Silicon, AWS Graviton, Raspberry Pi). Docker는 일치하는 아키텍처를 자동으로 선택합니다. ARM 호스트에서 AMD64 에뮬레이션을 강제해야 하는 경우 `--platform linux/amd64`를 전달하세요.

### 릴리스 채널

OmniRoute는 안정 릴리스, 활성 릴리스 브랜치 테스트 및 개발 빌드를 위한 별도의 Docker 채널을 게시합니다.

| 채널                            | 소스                                | 변경 가능성                    | 권장 용도                                                                                               |
| ------------------------------- | ----------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | 서명되고 버전이 지정된 릴리스       | 변경 불가                      | 정확한 릴리스로 고정하는 프로덕션 배포                                                                  |
| `:latest` / `:latest-web`       | **게시된** 안정 SemVer 중 최고 버전 | 변경 가능한 안정 포인터        | SemVer 게시 작업 **후** 안정 릴리스를 따름 — `main` 또는 미릴리스 `release/v*` 커밋을 추적하지 **않음** |
| `:next` / `:next-web`           | 현재 기본 `release/v*` 브랜치       | 변경 가능한 사전 릴리스 포인터 | 활성 릴리스 브랜치에 반영되었지만 아직 안정 릴리스에는 포함되지 않은 수정 사항 테스트                   |
| `:main` / `:main-web`           | `main` 브랜치                       | 변경 가능한 개발 포인터        | 개발 및 통합 테스트 전용                                                                                |

#### 사전 릴리스 채널 사용

`next` 채널은 현재 기본 `release/v*` 브랜치에 푸시될 때마다 다시 빌드되며 AMD64와 ARM64용으로 모두 게시됩니다. 이전 유지보수 브랜치는 이 채널을 덮어쓸 수 없습니다. 이 채널은 다음 안정 태그가 생성되기 전에 활성 릴리스 브랜치에 병합된 수정 사항을 가져올 수 있는 이미지를 제공합니다.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose에서는 선택한 프로필에서 사용하는 이미지 태그를 재정의한 다음, 서비스를 가져와 다시 생성하세요.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 안전성 및 롤백

`next`는 유동적인 사전 릴리스 채널입니다. 활성 릴리스 브랜치에 푸시할 때마다 변경될 수 있으며 **프로덕션 용도로 지원되지 않습니다**. 특정 빌드를 평가하는 동안에는 이미지 다이제스트로 고정하세요.

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

테스트하기 전에 OmniRoute 데이터 볼륨 또는 바인드 마운트된 데이터 디렉터리를 백업하세요. 롤백하려면 이전에 사용한 안정 버전 또는 다이제스트를 복원하고 컨테이너를 다시 생성하세요.

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

릴리스 브랜치 빌드는 절대로 `latest`를 변경할 수 없습니다. 적격한 안정 시맨틱 버전만 안정 버전 포인터를 승격할 수 있습니다. `next` 이미지는 릴리스 이미지 검사와 CRITICAL 취약점을 차단하는 게이트를 유지합니다.

**`latest`는 git의 최신 상태를 보장하지 않습니다.** `main` 또는 활성 `release/v*` 브랜치에 병합된 수정 사항은 안정적인 SemVer 이미지가 게시되고 게시 작업이 `:latest`를 승격할 때까지 **`:latest`에 포함되지 않습니다**(해당 SemVer와 동일한 다이제스트). GitHub에 수정 사항이 이미 표시되는데도 `latest`가 고정된 것처럼 보인다면 `:next`를 풀하여 릴리스 브랜치를 테스트하거나 SemVer 태그가 게시될 때까지 기다리세요.

| 원하는 사항                                           | 사용 대상                               |
| ----------------------------------------------------- | --------------------------------------- |
| 변경되어서는 안 되는 GitOps / 프로덕션                | `:X.Y.Z`(또는 이미지 다이제스트)로 고정 |
| 게시된 안정 버전을 따르고 각 릴리스에서 재생성을 허용 | `:latest`                               |
| 미릴리스 `release/v*` 커밋 테스트                     | `:next`(프로덕션용 아님)                |
| `main` 테스트                                         | `:main`(프로덕션용 아님)                |

## 가용성: 기본 SQLite는 단일 레플리카 구성

기본 Docker / Kubernetes OmniRoute는 **하나의 Node 프로세스 + 하나의 SQLite writer**로 구성됩니다. 이 토폴로지에서는 고가용성을 **지원하지 않습니다**.

| 제약 사항                          | 결과                                                                                                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 단일 writer                        | 동일한 SQLite 파일에 대해 여러 레플리카를 실행하지 **마세요**. DB가 손상됩니다.                                                                                                                                                                                                                              |
| 재생성 / 재시작 / HEALTHCHECK 종료 | 진행 중인 SSE, 대시보드 세션 및 인메모리 상태가 **완전히 중단**됩니다. 연결된 모든 클라이언트의 연결이 끊어집니다. 엔드포인트가 비어 있는 동안의 새 요청은 OmniRoute JSON이 아닌 리버스 프록시의 **`502 Bad Gateway: Unknown error`**를 받으므로 클라이언트가 이를 제공자 장애와 구분할 수 없습니다(#11015). |
| `/healthz`와 동일한 이벤트 루프    | 사용량이 많은 catalog 또는 compression tick으로 인해 probe가 지연될 수 있으며, timeout이 짧으면 **유일한** 레플리카가 재시작됩니다.                                                                                                                                                                          |

**Probe 매트릭스**([Kubernetes probe 권장 사항](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)도 참조):

| Probe              | 대상                                                          | 사용하지 말아야 할 항목                                     |
| ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Liveness           | `PORT`(기본값 `20128`)에 대한 TCP 또는 완화된 HTTP `/healthz` | `/api/monitoring/health`                                    |
| Readiness          | HTTP `GET /healthz`                                           | 이벤트 루프가 사용 중인 상태를 장애로 취급하는 짧은 timeout |
| 심층 점검 / 사용자 | `/api/monitoring/health`                                      | 자동화된 kubelet liveness                                   |

**업그레이드:** 모든 세션의 연결이 끊어질 것으로 예상해야 합니다. 가능하면 클라이언트를 drain하세요. 기본 SQLite에서는 rolling update가 불가능합니다. Compose의 `restart: unless-stopped`와 Docker `HEALTHCHECK`를 함께 사용하면 컨테이너가 Unhealthy 상태일 때 유일한 프로세스도 교체되므로 영향 범위가 동일합니다.

**단일 레플리카**용 Kubernetes 예시(SQLite 파일 하나에 대해 `replicas`를 늘리지 마세요. Recreate가 필수입니다):

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

`preStop` sleep을 사용하면 SIGTERM 전에 kube가 Service 엔드포인트를 제거할 수 있으므로 **새로운** 트래픽이 종료 중인 프로세스로 전달되지 않습니다. 진행 중인 `/v1/responses` SSE는 heavyweight admission lease를 통해 `SHUTDOWN_TIMEOUT_MS`(기본값 30초)까지 drain됩니다(#11015). 여전히 프로세스에 도달하는 새 요청은 `503` + `Retry-After: 5`를 받습니다. 대체 프로세스가 Ready 상태가 될 때까지 발생하는 Recreate의 빈 엔드포인트 구간은 여전히 완전한 서비스 중단입니다. 이는 probe 설정 오류가 아니라 SQLite 토폴로지의 특성입니다.

외부 Postgres / multi-writer HA는 문서화된 기본 지원 경로가 **아닙니다**. HA가 필요하다면 단일 레플리카를 유지하거나 프로젝트에서 별도로 테스트하고 문서화한 토폴로지를 사용하세요. Postgres/MySQL 관련 작업은 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)에서 진행되고 있습니다. 해당 기능이 출시되기 전까지 **대규모** `/v1/responses` 용량을 확장하는 유일하게 지원되는 방법은 하나의 볼륨에서 `replicas > 1`을 사용하는 것이 아니라 N개의 독립 프로세스를 실행하는 것입니다(다음 섹션 참조).

## 스케일 아웃: N개의 독립 프로세스

하나의 Node 프로세스는 **하나의 V8 힙**입니다. 서로 겹치는 약 3 MiB / 약 750k-token 규모의 코딩 에이전트 `POST /v1/responses` 요청 두 개(RTK + Caveman)는 약 12 Gi에서 해당 힙을 중단시키며(`FATAL ERROR: Reached heap limit`), 16 Gi cgroup에서 OOM을 일으킬 수 있습니다. [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)를 참조하세요. 이 측정값은 **메모리 예산**에 대한 경고이지, 동시에 실행되는 긴 `/v1/responses` 요청을 두 개로 제한하는 제품의 하드 최대값이 아닙니다. 고부하 채팅의 수락 여부는 동일한 V8/cgroup 상한을 기반으로 자동 산출되는 수신 바이트 예산(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`)에 의해 제어됩니다. 이미 크기가 조정된 프로세스에서 이를 더 높은 값으로 재정의하거나 레거시 요청 수 제한인 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`를 설정하면 중단 문제가 다시 발생합니다. 작은 채팅, `/healthz`, `/v1/models`, MCP는 이 제한에 **포함되지 않습니다**.

### 단일 프로세스: 두 개를 초과하는 긴 `/v1/responses`

**정상 상태인** 프로세스(힙이 `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, 기본값 `0.75` 미만)는 프로세스 전체의 처리 중 바이트 예산(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)에 여유가 있는 경우, 동시에 두 개를 초과하는 긴 `POST /v1/responses` 요청을 실행할 **수 있습니다**. `OMNIROUTE_CHAT_LARGE_BODY_BYTES` 이상(기본값 256 KiB)인 본문은 구조가 복잡한 요청과 동일한 고부하 리스를 획득하며, 동일한 [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` 우회 경로(`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`)를 사용합니다. 동시에 수십 개의 긴 SSE 클라이언트 연결을 처리하는 것(운영자는 대개 40–50개가 필요함)은 **메모리 예산**의 문제입니다. 즉, 힙 + 기본/헤드룸 슬롯 + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`의 크기를 조정해야 하며, 제품에 하드코딩된 “최대 2개” 제한의 문제가 아닙니다. 압박을 받는 힙은 재시도 가능한 `503`으로 계속 요청을 차단하므로 #7849 문제가 재발하지 않습니다.

**힙 수를 늘리려면**(독립적인 V8 old-space) **현재는** 다음과 같이 하세요.

| 해야 할 것                                                                                                                                             | 하지 말아야 할 것                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| 각각 **자체** `DATA_DIR` / 볼륨을 사용하는 **N개의 컨테이너/파드** 실행                                                                                | 하나의 SQLite 파일을 대상으로 `replicas > 1` 설정            |
| 힙 / 처리 중 바이트 예산을 기준으로 고부하 처리 중 요청 수 + 정상 상태 헤드룸 크기 조정. 1–2개는 보수적인 #7849 기본값일 뿐, 제품의 하드 최대값이 아님 | 프로세스 하나에 8배의 RAM과 무제한 요청 수 상한 할당         |
| 선택 사항: **공유 할당량 카운터**를 위해 `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` 사용                                                     | Redis를 공유 SQLite로 취급 — Redis는 공유 SQLite가 아님      |
| 각 인스턴스에 공급자 시크릿 복제(또는 분리된 대시보드 수용)                                                                                            | 인스턴스 전체에 걸쳐 하나의 대시보드 / 하나의 호출 로그 기대 |
| 임의의 로드 밸런서를 앞단에 배치. API 키 또는 세션 기준 스티키 라우팅이면 충분                                                                         | 공급업체별 크기 인식 미들웨어가 필요하다고 간주              |

하드웨어 측면에서 인스턴스당 동시에 실행되는 긴 `/v1/responses` 요청 수는 **메모리 예산**의 문제입니다(힙 + 처리 중 바이트 / #10110). 독립적인 `DATA_DIR` N개는 여전히 힙 수를 늘립니다. 호스트 RAM은 “N=8인 하나의 16 Gi 파드”가 아니라 `N × cgroup`을 감당해야 합니다. 하나의 SQLite 파일에서 절대로 `replicas > 1`을 사용하지 마세요.

Compose 예시(힙 두 개, 볼륨 두 개 — `deploy.replicas: 2`가 아님):

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

프로세스 내 밀도 향상(HTTP isolate 외부에서의 압축)은 [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023)에서 다룹니다. 공유 영구 상태를 사용하는 하나의 논리적 클러스터는 [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)에서 다룹니다.

## 중요 참고 사항

- **SQLite WAL 모드:** OmniRoute가 최신 변경 사항을 `storage.sqlite`에 체크포인트로 기록할 수 있도록 `docker stop`이 완료될 때까지 기다려야 합니다. 번들로 제공되는 Compose 파일에는 이미 40초의 종료 유예 기간이 설정되어 있습니다. 이미지를 직접 실행하는 경우 `--stop-timeout 40`을 유지하세요.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** 정기/쓰기 전 백업을 외부에서 관리하는 경우 `true`로 설정하세요. 기존 데이터베이스 마이그레이션에는 여전히 별도의 내구성 있는 안전 스냅샷과 대규모 마이그레이션 보호 장치가 필요합니다.
- **데이터 영속성:** 컨테이너가 다시 시작되어도 데이터베이스, 키 및 구성을 유지하려면 항상 `/app/data`에 볼륨을 마운트하세요.
- **포트 구성:** 기본 포트 `20128`을 변경하려면 `PORT` 환경 변수를 재정의하세요.

## 함께 보기

- [VM 배포 가이드](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare 설정
- [Fly.io 배포 가이드](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io에 배포
- [환경 구성](../reference/ENVIRONMENT.md) — 전체 `.env` 참조
