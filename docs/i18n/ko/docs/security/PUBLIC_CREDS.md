# Public Credentials Handling (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **신뢰할 수 있는 원본:** `open-sse/utils/publicCreds.ts`
> **테스트:** `tests/unit/publicCreds.test.ts`
> **최종 업데이트:** 2026-08-07 — v3.8.50
> **대상 독자:** 공개 CLI에서 공용 OAuth client_id / client_secret / Firebase Web API 키를 제공하는 프로바이더를 통합하는 엔지니어.
> **상태:** 업스트림 식별자를 포함하는 모든 신규 코드에 **필수**

## 이 기능이 존재하는 이유

- [네이티브 앱용 OAuth 2.0(PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — 설치형 앱의 OAuth client_id / client_secret은 공개 정보이며, 실제 보안은 PKCE가 제공합니다.
- [Firebase API 키](https://firebase.google.com/docs/projects/api-keys) — 웹 클라이언트 식별자는 설계상 공개 정보입니다.

OmniRoute는 `.env`를 구성하지 않은 사용자도 별도 설정 없이 정상적으로 작동하는 OAuth 흐름을 사용할 수 있도록 이러한 값을 포함해야 합니다. 내장된 대체 값이 없으면 "그냥 클론하고 실행"하는 경로를 따르는 모든 사용자에게 Gemini / Antigravity 프로바이더가 작동하지 않습니다.

하지만 `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` 같은 리터럴 값은 **GitHub Secret Scanning**, **Semgrep** 및 유사한 패턴 스캐너에 탐지됩니다. 릴리스할 때마다 오탐 알림이 쏟아지고, 푸시 보호 기능이 정상적인 커밋을 차단하며, 운영자는 알림 피드를 신뢰하지 않게 됩니다.

`open-sse/utils/publicCreds.ts` 헬퍼는 두 가지 제약을 동시에 해결합니다.

- 공개 식별자를 **XOR 마스킹된 바이트 시퀀스**로 포함합니다(소스에 스캐너 패턴이 나타나지 않음).
- 런타임에 `decodePublicCred` / `resolvePublicCred`를 통해 디코딩합니다.
- 잘 알려진 접두사(`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`)를 이미 따르는 원시 값을 감지해 변경 없이 그대로 전달하므로, 기존 `.env`에 원시 값을 사용하는 사용자는 **마이그레이션 없이** 계속 사용할 수 있습니다.

이는 **난독화이지 암호화가 아닙니다.** 소스를 읽는 사람이라면 누구나 값을 복구할 수 있습니다. 이 값은 설계상 공개 정보이므로 문제가 되지 않습니다. 유일한 목적은 스캐너의 정규식 패턴과 일치하지 않도록 하는 것입니다.

## 필수 패턴

### 1. 새로운 공개 자격 증명 추가

다음 조건에 해당하는 업스트림 제공 값을 새로 포함해야 하는 경우:

- 공개 CLI / 데스크톱 앱 / 브라우저 번들에서 가져온 값이고, **그리고**
- 업스트림 프로바이더가 이를 공개 클라이언트 식별자로 문서화했거나 그렇게 취급하며, **그리고**
- 그렇지 않으면 패턴 스캐너가 탐지할 값인 경우(`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` 등),

…다음 체크리스트를 따르세요.

1. 마스킹된 바이트 시퀀스를 생성합니다.

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`의 `EMBEDDED_DEFAULTS`에 **중립적인 키 이름**(`<provider>_id`, `<provider>_alt`, `<provider>_fb` 등)으로 새 항목을 추가합니다. 헬퍼에서 `client_secret`이나 `api_key` 같은 이름을 사용하지 **마세요**. 이러한 단어는 Semgrep의 일반 시크릿 규칙을 트리거합니다.

3. 공개 타입 유니온에 `keyof typeof EMBEDDED_DEFAULTS`를 추가합니다(자동으로 추론됩니다).

4. 소비자 코드에서 하드코딩된 리터럴을 다음과 같이 교체합니다.

   ```ts
   // 단일 환경 변수 재정의
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // 여러 환경 변수 별칭(비어 있지 않은 첫 번째 값이 우선)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // 환경 변수 재정의 없음(항상 내장된 기본값 사용)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example`에서 리터럴을 제거합니다(독자가 이 문서를 참조하도록 안내하는 주석 전용 문서로 교체).

   ```dotenv
   # ── 프로바이더(Google / Firebase / 기타) ──
   # 공개 OAuth 자격 증명은 open-sse/utils/publicCreds.ts를 통해
   # 코드에 내장됩니다. 자체 값을 사용하려는 경우에만 이 변수를 설정하세요.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. 새 키에 대한 형태 어설션을 추가하도록 `tests/unit/publicCreds.test.ts`를 업데이트합니다(리터럴 값이 아닌 형식을 검증하세요. 패턴은 기존 테스트를 참고하세요).

7. 테스트 파일에 `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` 리터럴을 **절대로** 추가하지 마세요. `.join("")` 조각으로 구성된 `FAKE_*` 상수를 사용하세요(기존 테스트 참고).

### 2. 소비자

- **`resolvePublicCred()` / `resolvePublicCredMulti()`를 통해서만 읽으세요.** 헬퍼 외부에서 `decodePublicCredBytes()`를 직접 호출하지 마세요.
- 헬퍼는 의도적으로 비용이 적게 들도록 구현되었으며(선형 바이트 XOR), 모듈 로드 시점에 안전하게 호출할 수 있습니다. 기본값은 한 번만 계산됩니다.
- 환경 변수 재정의가 항상 우선합니다. 사용자가 `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`을 설정하면 헬퍼는 해당 원시 값을 그대로 전달합니다.

### 3. 금지된 패턴

❌ 프로덕션 코드(`src/`, `open-sse/`, `electron/`, `bin/`)에서 다음과 같은 작업을 **절대로** 하지 마세요.

```ts
// 잘못된 예: 리터럴 값이 Secret Scanning 및 Semgrep을 트리거함
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// 잘못된 예: 리터럴의 base64 — GitHub는 2025년 2월부터 여전히 이를 탐지함
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// 잘못된 예: 런타임에 패턴을 다시 조합하는 문자열 연결
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// 잘못된 예: hex/ROT13 인코딩 — 난독화 방식만 다를 뿐 탐지 위험은 동일함
clientSecret: hexDecode("474f4353..."),
```

이러한 방식은 모두 결국 스캐너에 탐지됩니다. `resolvePublicCred()`를 사용하세요.

❌ `.env.example`에 리터럴 자격 증명을 **절대로** 추가하지 마세요. 실제 업스트림 값이 필요한 사용자는 공개 CLI에서 직접 추출하거나 자체 OAuth 등록 정보를 사용할 수 있습니다.

❌ 자격 증명을 이 헬퍼로 이동해야 하는지 먼저 확인하지 않은 상태에서 새로운 시크릿 스캐닝 알림을 **절대로** 무시하지 마세요.

## 관련 제어 사항

- `publicCreds.ts`의 `RAW_VALUE_PATTERN`은 그대로 전달되는 접두사들을 열거합니다(하위 호환성 유지). 문서화된 공개 자격 증명 형식에 대해서만 확장하고, 독점적인 비밀 정보에는 절대 사용하지 마세요.
- `.env.example`은 CI의 `check-env-doc-sync` 스크립트에서 사용됩니다. 여기서 변수를 제거할 때는 문서도 일치하도록 수정하세요.
- `npm run test:vitest` 및 `node --import tsx/esm --test tests/unit/publicCreds.test.ts` 테스트 스위트는 모두 계속 통과해야 합니다.

## 이 헬퍼를 사용하면 안 되는 경우

이 헬퍼는 다음 조건을 충족하는 자격 증명에만 사용해야 합니다.

1. 업스트림 제공자가 공개적으로 배포하는 자격 증명(CLI 바이너리, 브라우저 번들, 공식 문서).
2. 기밀이 아닌 것으로 문서화되었거나 그렇게 강하게 추정되는 자격 증명(PKCE로 보호됨, Firebase Web 키 등).

그 밖의 모든 항목 — 운영자가 발급한 토큰, 테넌트별 비밀 정보, 자체 OAuth 앱의 client_secret, 암호화 키, JWT 비밀 정보, 데이터베이스 비밀번호 — 에는 **환경 변수만** 사용하세요(`process.env.FOO`, `||`를 사용해 빈 값으로 폴백하거나 명시적 오류 발생). 이러한 항목은 소스가 아니라 `.env`와 [암호화된 자격 증명 저장소](./COMPLIANCE.md)에 보관해야 합니다.

## 참고 자료

- [Google: 네이티브 앱용 OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: 클라이언트 식별용 API 키](https://firebase.google.com/docs/projects/api-keys)
- [GitHub 비밀 정보 스캔에서 지원하는 비밀 정보](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: 토큰의 base64 인코딩 탐지(2025년 2월)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- 이 헬퍼를 도입한 커밋: `1a39c31f` — _fix(security): 공개 업스트림 자격 증명 마스킹 및 오류 정제 중앙화_
