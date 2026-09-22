# Kiro Setup Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

이 가이드에서는 OmniRoute에 Kiro(AWS에서 호스팅되는 AI 코딩 어시스턴트) 계정을 추가하는 방법을 설명하며,
세션 충돌 없이 여러 계정을 동시에 실행하는 데 중점을 둡니다.

---

## 배경: Kiro 계정이 충돌할 수 있는 이유

Kiro의 백엔드는 AWS SSO OIDC 클라이언트 등록을 사용하여 활성 세션을 추적합니다.
핵심 제약 사항은 **각 OIDC 클라이언트 등록이 한 번에 하나의 활성 세션만
지원한다는 것**입니다. 두 번째 기기나 사용자가 동일한 등록 클라이언트를 사용하여
인증하면 백엔드는 첫 번째 계정의 새로 고침 토큰을 무효화합니다.

이는 다른 Kiro 계정이 이미 로그인된 시스템에서 `kiro-cli login`을 실행할 때
문제가 발생하는 것과 동일한 메커니즘입니다. 새 로그인으로 인해 첫 번째 계정의
토큰이 취소됩니다.

---

## OmniRoute의 해결 방법(v3.8.0+)

v3.8.0부터 OmniRoute는 모든 Kiro 연결을 가져올 때 `registerClient()`(AWS SSO OIDC)를
호출합니다. 이를 통해 각 OmniRoute 연결에는 전용 OIDC 클라이언트 등록이 할당됩니다.
각 클라이언트 등록은 서로 독립적이므로 한 계정을 새로 고치거나 재인증해도 다른
계정의 새로 고침 토큰에는 영향을 주지 않습니다.

이러한 격리는 새로 고침 토큰 가져오기 방식에 적용되며, API 키 인증은 OIDC 새로 고침
세션을 전혀 사용하지 않습니다.

| 가져오기 방식                                   | 격리 상태                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC 기기 코드 흐름             | 기기 코드 흐름이 도입된 이후부터 격리됨                                                   |
| **토큰 가져오기**(새로 고침 토큰 수동 붙여넣기) | v3.8.0부터 격리됨                                                                         |
| **Google / GitHub 소셜 로그인**                 | v3.8.0부터 격리됨                                                                         |
| **자동 가져오기**(kiro-cli SQLite)              | v3.8.0부터 격리됨(SQLite 경로는 이미 격리되어 있었으며, 이제 SSO 캐시 대체 경로도 격리됨) |
| **API 키**(수명이 긴 CodeWhisperer 키)          | 새로 고침 세션 없음. 키를 검증한 후 전달자 자격 증명으로 저장함                           |

---

## v3.8.0 이전에 생성된 연결에 대한 마이그레이션 참고 사항

v3.8.0 이전에 가져온 연결에는 `providerSpecificData`에 저장된 전용 OIDC 클라이언트
등록이 없습니다. 이러한 연결은 계속 작동하지만 공유 소셜 인증 새로 고침 엔드포인트를
사용하므로, 두 연결이 여전히 서로의 토큰을 무효화할 수 있습니다.

**격리를 적용하려면:** **대시보드 → 공급자**에서 기존 연결을 삭제하고 지원되는
가져오기 흐름 중 하나를 사용하여 다시 가져오십시오. 새로 생성되는 모든 연결에는
전용 클라이언트 등록이 자동으로 할당됩니다.

---

## 두 개의 Kiro 계정을 나란히 추가하기

### 사전 요구 사항

- OmniRoute v3.8.0 이상.
- 정상적으로 작동하는 Kiro 계정(이메일 + 비밀번호, Google 또는 GitHub 로그인).
- 선택적으로 사용할 두 번째 Kiro 계정.

### 1단계: 첫 번째 계정 가져오기

1. **대시보드 → 공급자 → 공급자 추가 → Kiro**를 엽니다.
2. 다음 중 하나를 선택합니다.
   - **토큰 가져오기** — `aorAAAAAG`로 시작하는 새로 고침 토큰을 붙여넣습니다.
   - **API 키** — 수명이 긴 Kiro / CodeWhisperer API 키를 붙여넣습니다.
   - **Google / GitHub 로그인** — 브라우저에서 OAuth 흐름을 완료합니다.
   - **자동 가져오기** — 버튼을 클릭합니다. OmniRoute가 로컬 kiro-cli 데이터베이스
     또는 `~/.aws/sso/cache`에서 자격 증명을 읽습니다.
3. 연결이 저장됩니다. 새로 고침 토큰 흐름은 전용 OIDC 클라이언트를 자동으로
   등록합니다. API 키 흐름은 AWS를 통해 키를 검증하며 새로 고침 토큰을 저장하지 않습니다.

### 2단계: 두 번째 계정 가져오기

두 번째 계정에 대해 1단계를 반복합니다. 가져오기마다 별도의 OIDC 클라이언트
등록이 생성되므로 두 연결은 완전히 격리됩니다.

### 3단계: 두 연결이 모두 활성 상태인지 확인하기

1. **대시보드 → 공급자** — 두 Kiro 연결 모두 **활성** 상태로 표시되어야 합니다.
2. **대시보드 → 상태** — 두 연결 모두 토큰 상태 검사를 통과해야 합니다.

### 4단계: 콤보를 사용하여 계정 간 라우팅하기

두 연결을 대상으로 지정하는 콤보를 생성하여 두 계정 간에 부하를 분산하거나 장애 조치를 수행합니다.

```
kiro/kiro-dev → kiro/kiro-pro
```

콤보 구성에 대해서는 [FEATURES.md](./FEATURES.md) 및 라우팅 설명서를 참조하십시오.

---

## 엔터프라이즈 / IDC 사용자

AWS IAM Identity Center (IDC) 계정의 경우 **Dashboard → Providers → Kiro → Device Code**에서 **AWS Builder ID / IDC 디바이스 코드** 흐름을 사용하세요. 디바이스 코드 흐름은 항상 완전히 격리되어 있습니다. 이러한 연결은 다시 가져올 필요가 없습니다.

기본값이 아닌 AWS 리전에서 운영하는 엔터프라이즈 사용자는 Import Token API를 통해 가져올 때 리전을 지정할 수 있습니다.

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

`region` 필드를 생략하면 기본값은 `us-east-1`입니다.

---

## API 키 가져오기 흐름

API 키 인증은 수명이 긴 Kiro / AWS CodeWhisperer Bearer 자격 증명에 사용됩니다. OAuth 갱신을 사용하지 않으므로 공유 OIDC 세션이 무효화되는 것을 방지합니다.

### 대시보드

1. **Dashboard -> Providers -> Kiro**를 엽니다.
2. **API Key**를 선택합니다.
3. API 키와 선택 사항인 AWS 리전(기본값은 `us-east-1`)을 붙여넣습니다.
4. OmniRoute가 키를 검증하고 연결을 저장합니다.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### 내부 계약

API 경로는 `KiroService.validateApiKey()`를 호출하여 키를 검증합니다. 이 메서드는 리전과 일치하는 CodeWhisperer/Amazon Q 엔드포인트에 대해 `ListAvailableProfiles`를 사용하고 `profileArn`을 확인합니다.

저장된 연결은 다음을 사용합니다.

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

런타임에 `KiroExecutor.buildHeaders()`는 키를 `Authorization: Bearer <key>` 형식으로 전송하고 `tokentype: API_KEY`를 추가합니다. 할당량/프로필 호출도 동일한 마커를 사용하므로 AWS는 이 Bearer를 OIDC 또는 소셜 액세스 토큰이 아닌 수명이 긴 API 키로 처리합니다.

---

## OIDC 클라이언트 만료

AWS SSO OIDC 공개 클라이언트는 일반적으로 90일 후에 만료됩니다(`clientSecretExpiresAt`). OmniRoute는 관찰 가능성을 위해 이 타임스탬프를 `providerSpecificData`에 저장합니다. 약 90일 후 연결의 갱신이 중단되면 연결을 다시 가져와 새로운 OIDC 클라이언트 등록을 받으세요. 만료 시 자동 재등록 기능은 향후 개선 사항으로 추적되고 있습니다.

API 키 연결은 AWS SSO OIDC를 통해 갱신되지 않으므로 OIDC 클라이언트 만료가 없습니다.

---

## 문제 해결

### 두 번째 계정이 계속 로그아웃되는 경우

- **Dashboard → Providers**에서 두 연결을 모두 확인하고, 각각의 원시 JSON(정보 아이콘을 통해 확인 가능)에 null이 아닌 `clientId`가 표시되는지 확인하세요. 어느 연결이든 `clientId`가 없다면 v3.8.0 이전에 가져온 것이므로 다시 가져오세요.

### "Token validation failed" 오류로 가져오기에 실패하는 경우

- 갱신 토큰이 `aorAAAAAG`로 시작하는지 확인하세요.
- OmniRoute가 `https://oidc.us-east-1.amazonaws.com`(또는 구성된 리전)에 연결할 수 있는지 확인하세요. 기업 프록시 뒤에 있는 경우 **Dashboard → Settings → Proxies**에서 제공자 수준 프록시를 설정하세요.

### API 키 가져오기에 실패하는 경우

- 키가 갱신 토큰이 아니라 Kiro / CodeWhisperer API 키인지 확인하세요.
- AWS 리전이 키/계정과 일치하는지 확인하세요. 기본값은 `us-east-1`입니다.
- 키로 `ListAvailableProfiles`를 호출할 수 있어야 합니다. 그렇지 않으면 OmniRoute가 필요한 `profileArn`을 확인할 수 없습니다.

기타 문제는 기본 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)를 참조하세요.
