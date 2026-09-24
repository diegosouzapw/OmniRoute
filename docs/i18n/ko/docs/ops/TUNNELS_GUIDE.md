# Tunnels Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **신뢰할 수 있는 원본:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 세 가지 터널 백엔드를 통해 로컬 서버(`http://localhost:20128`)를 공용
인터넷에 노출할 수 있습니다. 다음과 같은 경우에 유용합니다.

- 공개적으로 접근 가능한 리디렉션 URL이 필요한 클라우드 제공업체(Antigravity, Gemini, Cursor)의
  OAuth 콜백.
- VM을 배포하지 않고 팀원과 로컬 인스턴스 공유.
- 모바일, 원격 또는 네트워크 간 테스트.

세 백엔드는 모두 프로세스 내에서 관리됩니다. OmniRoute는 대시보드 또는 REST API를 통해
기본 바이너리나 SDK를 시작/중지합니다. 리버스 프록시나 systemd 설정은
필요하지 않습니다.

## 백엔드 한눈에 보기

| 백엔드                      | 지속성                                          | 비용             | 설정                                      |
| --------------------------- | ----------------------------------------------- | ---------------- | ----------------------------------------- |
| **Cloudflare Quick Tunnel** | 일시적(재시작할 때마다 URL 변경)                | 무료             | 불필요 — `cloudflared` 자동 설치          |
| **ngrok**                   | 유료 플랜 또는 고정 도메인이 구성된 동안 안정적 | 무료 티어 + 유료 | ngrok 계정 + authtoken 필요               |
| **Tailscale Funnel**        | tailnet 내에서 노드별로 안정적                  | 개인용 무료      | Tailscale 설치 + 로그인 + Funnel ACL 필요 |

구현은 `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, `src/lib/tailscaleTunnel.ts`에 있습니다. 세 구현 모두
`phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl`, `lastError` 필드가 포함된 공통 형식의 `status` 객체를 반환하므로 대시보드에서 동일한 방식으로 렌더링할 수 있습니다.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`는 `cloudflared`를 자식 프로세스로 실행합니다. 명명된 터널 구성이 제공되었는지 여부에 따라
선택되는 두 가지 모드를 지원합니다.

- **빠른 터널(기본값).** `cloudflared tunnel --url
http://localhost:<apiPort>`를 실행하고 stdout에서 할당된 `*.trycloudflare.com` URL을
  파싱합니다. URL은 일시적이며 재시작할 때마다 변경됩니다.
- **명명된 터널(선택 사항).** `CLOUDFLARED_CONFIG`가 로컬에서 관리되는
  cloudflared `config.yml`을 가리키면 OmniRoute는 `cloudflared tunnel --no-autoupdate
--config <path> run`을 실행하여 **안정적인 명명된 호스트 이름**을 제공합니다. 구성에서
  터널 UUID, `credentials-file`, `ingress` 라우팅을 제공하므로
  `--url`은 전달되지 않으며 Zero Trust 대시보드 토큰도 필요하지 않습니다. `run`은
  구성의 절대 `credentials-file` 경로에서 자격 증명을 읽습니다. `cert.pem`은
  필요하지 않습니다(이는 터널 수명 주기 관리에만 사용됩니다).

주요 동작:

- **자동 설치.** 처음 사용할 때 OmniRoute는 공식 GitHub 릴리스에서 최신 `cloudflared`
  바이너리를 다운로드합니다(관리형 설치 파일은
  `DATA_DIR/cloudflared/` 아래에 저장됨). 다운로드된 자산의 SHA256은 실행 전에
  릴리스 매니페스트와 대조하여 검증됩니다.
- **프로세스 감독.** cloudflared PID와 확인된 URL은
  `quick-tunnel-state.json`에 저장되므로 대시보드가 다시 로드된 후에도 상태를 복원할 수 있습니다.

### 명명된 터널 설정(안정적인 호스트 이름)

1. cloudflared CLI를 사용하여 로컬에서 관리되는 터널을 생성합니다(최초 한 번만 수행).

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. 호스트 이름을 OmniRoute의 로컬
   API 포트(기본값 20128)로 라우팅하는 `~/.cloudflared/config.yml`을 작성합니다.

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute가 해당 구성을 가리키도록 설정한 후 터널을 (재)시작합니다.

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # 선택 사항 — OmniRoute가 보고하는 호스트 이름을 재정의합니다. 설정하지 않으면
   # 구성의 첫 번째 ingress 규칙에서 읽습니다.
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   아래의 빠른 터널과 동일한 방식(REST / 대시보드 / CLI)으로 터널을
   활성화합니다. 명명된 터널은 추출할 공개 URL을 출력하지 않으므로 cloudflared에 등록된
   에지 연결을 통해 준비 상태를 감지하며, `publicUrl`/`apiUrl`은
   `CLOUDFLARED_HOSTNAME`(또는 구성의 첫 번째 ingress 호스트 이름)을 기준으로 보고됩니다.

### REST를 통해 활성화 / 비활성화

엔드포인트는 별도의 `start`/`stop` 경로가 아니라
`{action: "enable" | "disable"}` 본문을 사용합니다. 관리 인증(관리자 세션 또는 관리자 API 키)이
필요합니다.

```bash
# 활성화
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# 상태
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# 비활성화
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

또는 대시보드에서 **Settings → Tunnels → Cloudflare**로 이동합니다.

### 선택적 환경 변수

| 변수                                                 | 용도                                                                                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | 바이너리 경로를 재정의합니다. 설정되어 있고 유효하면 OmniRoute는 다운로드하는 대신 해당 바이너리를 사용합니다.                                                |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | 전송 프로토콜입니다(기본값 `http2`, 그 외 `quic`, `auto` 지원).                                                                                               |
| `CLOUDFLARED_CONFIG`                                 | 로컬에서 관리하는 cloudflared `config.yml`의 경로입니다. 설정하면 OmniRoute는 빠른 터널 대신 **명명된/영구** 터널(`tunnel --config <path> run`)을 실행합니다. |
| `CLOUDFLARED_HOSTNAME`                               | 명명된 터널에서 보고하는 공개 호스트 이름을 재정의합니다(예: `ai.example.com`). 설정하지 않으면 구성의 첫 번째 `ingress` 호스트 이름에서 읽습니다.            |

## 2. ngrok

`src/lib/ngrokTunnel.ts`는 **`@ngrok/ngrok` SDK**를 사용합니다(프로세스 내에서 실행되며 CLI 하위 프로세스를 사용하지 않음). 사전 빌드된 바이너리가 없는 플랫폼에서도 앱이 부팅 중 중단되지 않도록, 네이티브 모듈은 처음 시작할 때 지연 임포트됩니다.

### 사전 요구 사항

1. <https://ngrok.com>에서 가입합니다.
2. ngrok 대시보드에서 authtoken을 복사합니다.
3. 다음 방법 중 하나로 제공합니다.
   - `.env`: `NGROK_AUTHTOKEN=<token>`, 또는
   - 대시보드: **Settings → Tunnels → ngrok**, 또는
   - REST 본문(일회성): `{"action":"enable","authToken":"<token>"}`.

어느 쪽도 구성되지 않은 경우 상태 응답은 `phase: "needs_auth"`를 반환합니다.

### REST를 통한 활성화/비활성화

```bash
# 활성화(env의 NGROK_AUTHTOKEN 사용)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# 인라인 토큰으로 활성화
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# 상태
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# 비활성화
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

응답에는 할당된 `publicUrl`(예:
`https://abcd-1234.ngrok-free.app`)이 포함됩니다. 사용자 지정 도메인, 리전 및 정책 규칙은 ngrok 대시보드에서 구성해야 합니다. OmniRoute 자체는 로컬 대상 URL을 SDK에 전달하기만 합니다.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts`는 시스템 `tailscale` CLI를 조정하여 **Funnel**(serve를 위한 Tailscale의 공용 인터넷 송신 기능)을 통해 로컬 API 포트를 노출합니다. 설치, 로그인, 데몬 시작, 활성화 및 비활성화를 포함한 전체 수명 주기를 지원합니다.

구현에서는 `tailscale funnel --bg <port>`(백그라운드 모드)를 호출합니다. 공개 URL의 형식은 `https://<machine>.<tailnet>.ts.net/`입니다.

### 사전 요구 사항

1. Tailscale을 설치합니다(또는 OmniRoute가 설치하도록 합니다. 아래의 `install` 엔드포인트 참조).
2. 로그인합니다(`tailscale login` 또는 OmniRoute의 `login` 엔드포인트 사용).
3. Tailscale 관리 콘솔에서 tailnet에 대해 Funnel을 활성화합니다.
   <https://login.tailscale.com/admin/settings/features>.

Linux와 macOS에서 데몬(`tailscaled`)을 제어하려면 `sudo`가 필요합니다. POST 엔드포인트는 선택적 `sudoPassword` 필드를 허용하며, 이 필드는 호출이 지속되는 동안 OmniRoute의 MITM 비밀번호 캐시(`getCachedPassword` / `setCachedPassword`)로 전달됩니다. Windows에서는 `C:\Program Files\Tailscale\tailscale.exe`에 설치된 기본 서비스를 사용합니다.

### REST 엔드포인트

Tailscale에서는 설치, 로그인, 데몬 및 터널이 서로 별개의 요소이므로 다른 백엔드보다 더 다양한 인터페이스를 제공합니다.

| 엔드포인트                            | 메서드 | 용도                                                         |
| ------------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | 통합 터널 상태(`phase`, `tunnelUrl`, `apiUrl` 등)            |
| `/api/tunnels/tailscale/check`        | `GET`  | 하위 수준 검사: 설치됨? 로그인됨? 데몬 실행 중?              |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale 설치(SSE로 스트리밍되는 진행 이벤트) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS에서 `tailscaled` 시작                            |
| `/api/tunnels/tailscale/login`        | `POST` | 로그인 흐름 시작. 브라우저에서 열 `authUrl` 반환             |
| `/api/tunnels/tailscale/enable`       | `POST` | API 포트에 대한 Funnel 시작                                  |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel 중지                                                  |

모든 Tailscale 엔드포인트에는 관리 인증이 필요합니다(`routeUtils.ts ::
requireTailscaleAuth` 참조).

활성화 예시:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

관리 콘솔에서 Funnel이 활성화되어 있지 않으면 응답에 `funnelNotEnabled: true`와 함께 브라우저에서 열 수 있는 `enableUrl`이 포함됩니다.

### 선택적 환경 변수

| 변수            | 용도                             |
| --------------- | -------------------------------- |
| `TAILSCALE_BIN` | `tailscale` 바이너리 경로 재정의 |

## 엔드포인트 요약

| 엔드포인트                            | 메서드 | 본문                                | 인증 |
| ------------------------------------- | ------ | ----------------------------------- | ---- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | 관리 |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | 관리 |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | 관리 |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | 관리 |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | 관리 |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | 관리 |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | 관리 |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | 관리 |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | 관리 |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | 관리 |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | 관리 |

중앙화된 `/api/settings/tunnels` 엔드포인트는 없으며, 각 백엔드는
독립적으로 작동합니다.

## OAuth 콜백 고려 사항

터널을 통해 OmniRoute를 노출할 때 대시보드와 OAuth 흐름은 `localhost`가
아닌 **공개** 호스트 이름을 기준으로 콜백 URL을 구성해야 합니다. 그렇지
않으면 OAuth 공급자가 해당 서버에서 접근할 수 없는 URL로 사용자를 다시
리디렉션하여 핸드셰이크가 실패합니다.

대시보드 편집 및 설정 저장을 위해 터널 호스트 이름을
`NEXT_PUBLIC_BASE_URL`에 고정할 필요는 없습니다. 인증된 대시보드는
세션에 바인딩된 CSRF 토큰을 사용하여 동일 출처의 안전하지 않은 요청을
전송하므로, 로그인 후에는 임시 Cloudflare Quick Tunnel 호스트도 일반적인
UI 관리에 계속 사용할 수 있습니다.

다음과 같이 설정합니다.

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

그런 다음 OAuth를 시작하기 전에 OmniRoute를 다시 시작합니다. 임시
Cloudflare Quick Tunnel의 URL은 다시 시작할 때마다 변경되므로, 프로덕션
OAuth 용도로는 예약 도메인이 있는 ngrok 또는 Tailscale Funnel을 사용하는
것이 좋습니다.

## 상태 확인 및 모니터링

대시보드는 **설정 → 터널** 아래에 터널 상태를 표시합니다.

- 활성 백엔드와 현재 `phase`(`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- 현재 공개 URL과 여기서 파생된 API URL(`<publicUrl>/v1`).
- 터널이 전달하는 로컬 대상 URL.
- 마지막 오류 메시지(있는 경우).

프로그래밍 방식으로 모니터링하려면 백엔드별 `GET` 엔드포인트를
폴링합니다. 둘 이상의 백엔드를 동시에 실행할 수 있으며, OmniRoute는
각 백엔드를 독립적으로 추적합니다.

## 문제 해결

### "cloudflared 바이너리를 찾을 수 없음"

OmniRoute는 처음 사용할 때 자동 설치를 시도합니다. 설치가 차단된 경우
(제한된 네트워크, GitHub 접근 불가)에는
<https://github.com/cloudflare/cloudflared/releases>에서 `cloudflared`를
수동으로 다운로드하고 `CLOUDFLARED_BIN=/path/to/cloudflared`로
설정합니다.

### "ngrok: authtoken 필요"

`phase: "needs_auth"`는 authtoken을 찾을 수 없음을 의미합니다. `.env`에
`NGROK_AUTHTOKEN`을 설정하거나, 대시보드를 통해 구성하거나, 활성화
POST 본문에 `authToken`을 전달합니다.

### "tailscale: funnel이 활성화되지 않음"

활성화 응답에 `funnelNotEnabled: true`가 포함되어 있으면 해당
tailnet에서 Funnel이 비활성화된 상태입니다. 반환된 `enableUrl`(또는 관리
콘솔 기능 페이지)을 열고 Funnel을 활성화합니다.

### 터널 URL 변경으로 인해 OAuth가 중단됨

예약 도메인이 있는 ngrok 또는 Tailscale Funnel을 사용합니다(둘 다
노드별로 안정적인 URL을 제공). Cloudflare Quick Tunnel은 설계상
일시적이므로 장기간 유지되는 OAuth 콜백에는 권장되지 않습니다.

### Linux/macOS에서 Tailscale 권한 거부

`tailscaled`에는 루트 권한이 필요합니다. 관련 POST 엔드포인트에
`sudoPassword`를 제공하거나 데몬을 직접 실행합니다
(`sudo systemctl start tailscaled`).

## 참고 항목

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 외부로 나가는 트래픽을 위한 아웃바운드 프록시(1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL`을 포함한 전체 환경 변수 목록.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — 안정적인 공개 호스팅을 위한 터널링의 대안.
- 소스: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
