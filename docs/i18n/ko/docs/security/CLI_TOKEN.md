# CLI Machine-ID Token (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## 개요

OmniRoute CLI 명령은 `x-omniroute-cli-token` 요청 헤더를 통해 전송되는
`HMAC-SHA256(machine-id, salt)` 토큰을 사용하여 로컬 관리 API에 인증합니다.

이를 통해 CLI 하위 명령(`omniroute status`, `omniroute providers` 등)은
사용자가 호출할 때마다 JWT 또는 비밀번호를 제공하지 않아도 관리 엔드포인트를
호출할 수 있습니다.

## 작동 방식

1. `getMachineTokenSync()`는 `node-machine-id`를 통해 하드웨어 머신 ID를
   읽습니다(실패 시 빈 문자열로 대체하여 CLI 인증을 비활성화함).
2. `HMAC-SHA256(machine_id, salt)`를 계산하고 전체 64자 16진수 다이제스트를
   반환합니다. 이는 이 머신에 연결된 결정론적이며 역변환할 수 없는 토큰입니다.
3. CLI는 확인된 대상이 명시적인 루프백 URL(`localhost`, `127.0.0.0/8` 또는
   루프백 IPv6)인 경우에만 토큰을 `x-omniroute-cli-token`으로 전송합니다.
   토큰이 포함된 요청은 `redirect: error`를 사용하므로 로컬 리디렉션이 토큰을
   다른 오리진으로 전달할 수 없습니다. 원격 컨텍스트에서는 대신 범위가 지정된
   액세스 토큰을 사용합니다. 토큰을 파생할 수 없는 경우 CLI는 헤더를 생략하며,
   빈 토큰을 유효한 것으로 처리하는 대신 `omniroute doctor`에서 실패를
   보고합니다.
4. 서버(`src/server/authz/policies/management.ts`)는 동일한 salt를 사용하여
   예상 토큰을 다시 계산하고 `timingSafeEqual`로 비교함으로써 타이밍 기반
   추출을 방지합니다.

## 보안 속성

| 속성                        | 세부 정보                                                                                                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **루프백 전용**             | 서버의 신뢰할 수 있는 피어 로컬리티 표식(실제 TCP 피어 주소에서 파생됨)이 루프백을 나타내는 경우에만 허용됩니다. 클라이언트가 제어하는 `Host` 헤더는 로컬리티 판단에 절대 신뢰되지 않습니다. |
| **상수 시간 비교**          | `crypto.timingSafeEqual`은 타이밍 공격을 방지합니다.                                                                                                                                         |
| **역변환 불가**             | HMAC 출력으로는 machine-id를 복구할 수 없습니다.                                                                                                                                             |
| **`always` 보호 우회 불가** | CLI 토큰 검사 전에 `isAlwaysProtectedPath()`가 평가됩니다. `/api/shutdown` 및 `/api/settings/database`에는 항상 JWT가 필요합니다.                                                            |
| **내보내기 불가**           | 토큰은 디스크에 기록되거나 로그에 남지 않습니다.                                                                                                                                             |

## 기본 salt(설치마다 무작위)

`OMNIROUTE_CLI_SALT`가 설정되지 않은 경우 salt는 한 번 생성되어
`<DATA_DIR>/cli-token-salt.json`에 유지되는 무작위 64자 16진수 문자열이며
(모드 `0600`), 체크인된 리터럴 `omniroute-cli-auth-v1`이 아닙니다.
`src/lib/machineToken.ts`의 `getActiveSalt()`와
`bin/cli/utils/cliToken.mjs`의 미러 구현은 모두 동일한 파일을 읽으므로 서버와
이 설치 환경에서 실행되는 모든 CLI 호출은 동일한 값으로 수렴합니다. 체크인된
리터럴은 유지된 salt 또는 환경 변수 salt를 아직 설정할 수 없는 경우(예: 서버가
실행된 적이 없는 새로운 CLI 전용 설치)에만 최후의 대체 값으로 사용됩니다.
이는 이전의 고정 리터럴 기본값이 가진 취약점을 해결합니다. `/etc/machine-id`는
일반적으로 누구나 읽을 수 있으므로, 그렇지 않으면 로컬 사용자가
`OMNIROUTE_CLI_SALT`를 설정하지 않은 모든 설치 환경에서 동일한 토큰을 파생할
수 있습니다.

## 솔트 교체

코드를 변경하지 않고 파생 토큰을 교체하려면 `OMNIROUTE_CLI_SALT`를 설정하세요. 이 값은
항상 설치별로 저장된 솔트보다 우선합니다. 교체 후에는 이 머신의 모든 CLI
프로세스가 자동으로 새 토큰을 사용합니다. 이전에 파생된 값이 노출되었을 수 있는
프로세스 목록 유출 이후에 유용합니다.

```bash
# 영구 교체(셸 프로필에 추가)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# 새 토큰이 사용 중인지 확인
omniroute status
```

## 레거시 형식(SHA-256, 32자) — 여전히 허용됨

위의 HMAC 형식 이전에는 CLI가
`bin/cli/utils/cliToken.mjs`에서 토큰을 `SHA-256(machineId + salt).hex[0..32]`
(32자 접두사)로 파생했습니다(`src/lib/machineToken.ts`의
`getLegacyCliTokenSync`).

하위 호환성을 위해 서버는 **두** 형식을 모두 허용합니다. 검증기는
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`를 구성하고
수신 헤더를 각각의 값과 `timingSafeEqual`로 비교합니다
(`src/server/authz/policies/management.ts` 및 `src/lib/middleware/cliTokenAuth.ts`).
따라서 토큰이 64자 HMAC 다이제스트 또는 32자 레거시 SHA-256 접두사 중
**어느 하나**와 일치하면 유효합니다.

**비활성화:** CLI 토큰 메커니즘을 완전히 비활성화하려면 `OMNIROUTE_DISABLE_CLI_TOKEN=true`를
(env 또는 `.env`) 설정하세요. 그러면 모든 접근에 명시적인 API 키가 필요합니다. 다중 사용자
호스트에서는 `machine-id`가 사용자별이 아닌 장치별이며 동일한 호스트의 다른 사용자가
같은 토큰을 계산할 수 있으므로 이 설정을 권장합니다.

## 파일

| 파일                                      | 용도                                 |
| ----------------------------------------- | ------------------------------------ |
| `src/lib/machineToken.ts`                 | 토큰 파생(`getMachineTokenSync`)     |
| `bin/cli/utils/cliToken.mjs`              | 동일한 파생 로직의 CLI 측 구현       |
| `<DATA_DIR>/cli-token-salt.json`          | 저장된 설치별 무작위 솔트            |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` 상수              |
| `src/server/authz/policies/management.ts` | 서버 측 검증                         |
| `src/server/authz/routeGuard.ts`          | 루프백 호스트 확인(`isLoopbackHost`) |

## 함께 보기

- `docs/security/ROUTE_GUARD_TIERS.md` — 라우트 보호 계층
- `docs/architecture/AUTHZ_GUIDE.md` — 전체 권한 부여 파이프라인
