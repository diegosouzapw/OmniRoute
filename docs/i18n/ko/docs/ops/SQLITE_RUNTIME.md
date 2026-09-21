# SQLite Runtime Resolution (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute는 시작 시 5단계 폴백 체인을 통해 SQLite 드라이버를 결정합니다.

1. **번들된 `better-sqlite3`** (`package.json`의 `dependencies`를 통해)
   — 가장 빠르며 네이티브 바이너리를 사용합니다. 빌드 도구가 있으면 `npm install`을 통해 설치됩니다.

2. **런타임에 설치된 `better-sqlite3`** (`~/.omniroute/runtime/`에 설치)
   — 최초 실행 시 지연 설치되거나 **또는** `scripts/build/postinstall.mjs → scripts/postinstall.mjs`에 의해 설치됩니다.
   손상되었거나 플랫폼이 맞지 않는 바이너리가 로드되지 않도록 로드 전에
   네이티브 `.node` 매직 바이트(ELF / Mach-O / PE)를 검증합니다.

3. **`node:sqlite`** (Node ≥22.5 표준 라이브러리) — 네이티브 빌드가 필요하지 않으며
   두 better-sqlite3 경로가 모두 실패할 때 사용됩니다. 기능이 제한적입니다.

4. **`sql.js`** (WASM) — 최종 폴백입니다. 모든 환경에서 작동하지만 속도가 더 느리고
   데이터를 동기식이 아닌 일정 주기로 기록합니다.

## 왜 이렇게 복잡한가요?

- **Windows EBUSY**: 실행 중인 프로세스가 이전 버전의 `better_sqlite3.node`를
  잠그고 있으면 `npm install -g omniroute@latest`가 실패할 수 있습니다. `~/.omniroute/runtime/`의
  런타임 설치는 전역 npm 캐시를 우회합니다.
- **빌드 도구 없음**: 일부 환경(VS Build Tools가 없는 기업용 Windows,
  최소 Docker 이미지)에서는 `better-sqlite3`를 컴파일할 수 없습니다. 런타임
  설치 프로그램은 npm 레지스트리에서 사전 빌드된 바이너리를 가져오며, 이 작업이
  실패하더라도 폴백 드라이버를 통해 OmniRoute가 계속 시작될 수 있습니다.
- **에어갭 시스템**: npm 레지스트리에 접근할 수 없는 경우에도 `node:sqlite`
  또는 `sql.js`가 기본 기능을 보장합니다.

## 매직 바이트 검증

런타임에 설치된 `.node` 파일을 로드하기 전에 OmniRoute는 처음 8바이트를 읽고
알려진 플랫폼 매직과 대조합니다.

| 플랫폼              | 바이트(16진수) | 레이블      |
| ------------------- | -------------- | ----------- |
| Linux               | `7F 45 4C 46`  | `elf`       |
| macOS 64비트 BE     | `FE ED FA CF`  | `macho`     |
| macOS 64비트 LE     | `CF FA ED FE`  | `macho-le`  |
| macOS fat(유니버설) | `CA FE BA BE`  | `macho-fat` |
| Windows             | `4D 5A` (MZ)   | `pe`        |

매직이 일치하지 않으면 해당 파일은 무시되고 폴백이 다음 단계로 계속됩니다.

## 활성 드라이버 확인

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## 수동 제어

```bash
# 빠른 CI 설치를 위해 postinstall 워밍업 건너뛰기
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# 런타임 better-sqlite3 강제 재설치
rm -rf ~/.omniroute/runtime
omniroute  # 다음 시작 시 재설치됨

# 활성 드라이버 확인
omniroute config db-info  # (CLI 명령이 존재하는 경우)
```

## 참고 자료

구현:

- `bin/cli/runtime/magicBytes.mjs` — 바이너리 매직 바이트 검증 헬퍼
- `bin/cli/runtime/sqliteRuntime.mjs` — 5단계 런타임 리졸버 + 지연 설치 프로그램
- `bin/cli/runtime/index.mjs` — 시작 오케스트레이터(`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm 설치 후 훅(실패해도 치명적이지 않은 워밍업)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` 내보내기

## 단일 작성자 토폴로지(HA 미지원)

위의 드라이버 폴백 체인은 여전히 **하나의 프로세스**에서 실행됩니다. 기본 SQLite
OmniRoute는 **단일 작성자**입니다.

- 두 OmniRoute 복제본을 동일한 `storage.sqlite` 파일에 연결하지 마세요.
- 컨테이너 재시작, Recreate 배포, OOM 종료 또는 HEALTHCHECK 재시작이 발생하면
  진행 중인 모든 SSE 세션이 끊어집니다. 기본 경로에는 세션 드레이닝이 없습니다.
- 느린 `/healthz`를 장애로 간주하는 오케스트레이터 라이브니스 검사는 유일한
  복제본을 종료합니다. TCP 라이브니스 + HTTP `/healthz` 레디니스를 권장합니다. 자세한 내용은
  [Docker 가이드 — 가용성](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  및 [Kubernetes 프로브 권장 사항](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)을 참조하세요.
